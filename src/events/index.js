export default function Emitter() {

	const _events = {};

	return {
		//event listener
		on(eventName, callback) {
			const event = _events;
			event[eventName] = event[eventName] || [];
			event[eventName].push(callback);
		},

//fire the event
		emit(eventName, ...args) {
			const event = _events;
			if (!(eventName in event)) return false;

			event[eventName].forEach(cb => cb(...args))
		}
	}


}