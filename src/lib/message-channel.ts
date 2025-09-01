const channelId = 'bce-msg-channel'

export const enum Message {
	NEW_SW_INSTALLED,
	CONFIRM_UPDATE,
	RELOAD,
}

export const getChannel = () => {
	const channel = new BroadcastChannel(channelId)
	return {
		postMessage: (msg: Message) => channel.postMessage(msg),
		onMessage: (callback: (msg: Message) => void) =>
			channel.addEventListener('message', ({ data }) => callback(data)),
	}
}
