export default function (duration: number) {
	let timeoutId: ReturnType<typeof setTimeout> | undefined
	let flag = $state(false)

	return {
		get flag() {
			return flag
		},

		callback: (newFlag: boolean) => {
			if (!newFlag) {
				return
			}
			flag = newFlag
			clearTimeout(timeoutId)
			timeoutId = setTimeout(() => (flag = false), duration)
		},
	}
}
