/// <reference types="@sveltejs/kit" />
/// <reference no-default-lib="true"/>
/// <reference lib="esnext" />
/// <reference lib="webworker" />

const sw = self as unknown as ServiceWorkerGlobalScope

import { prerendered, version } from '$service-worker'
import { getChannel, Message } from './lib/message-channel'

const cacheKey = `cache-${version}`
const channel = getChannel()

sw.registration.addEventListener('updatefound', () => {
	const installingWorker = sw.registration.installing

	installingWorker?.addEventListener('statechange', async () => {
		if (installingWorker.state === 'installed' && sw.registration.active) {
			await sw.skipWaiting()
			channel.postMessage(Message.NEW_SW_INSTALLED)
			channel.onMessage((msg) => {
				if (msg === Message.CONFIRM_UPDATE) {
					channel.postMessage(Message.RELOAD)
				}
			})
		}
	})
})

sw.addEventListener('install', (event) => {
	async function addFilesToCache() {
		const cache = await caches.open(cacheKey)
		await cache.addAll(prerendered)
	}

	event.waitUntil(addFilesToCache())
})

sw.addEventListener('activate', (event) => {
	async function deleteOldCaches() {
		for (const key of await caches.keys()) {
			if (key !== cacheKey) await caches.delete(key)
		}
	}

	event.waitUntil(deleteOldCaches())
})

sw.addEventListener('fetch', (event) => {
	async function fetchAndCache(url: URL, cache: Cache) {
		const response = await fetch(event.request)

		// if we're offline, fetch can return a value that is not a Response
		// instead of throwing - and we can't pass this non-Response to respondWith
		if (!(response instanceof Response)) {
			throw new Error('invalid response from fetch')
		}

		if (response.status === 200 && prerendered.includes(url.pathname)) {
			cache.put(event.request, response.clone())
		}

		return response
	}

	async function respond() {
		const url = new URL(event.request.url)
		const cache = await caches.open(cacheKey)
		const request = fetchAndCache(url, cache)
		const cachedResponse = await cache.match(event.request)
		return cachedResponse || (await request)
	}

	event.respondWith(respond())
})
