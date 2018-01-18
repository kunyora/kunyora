export default class Emitter {

	constructor() {
		this._events = {}
	}

//event listener
	on(eventName, callback) {
		const event = this._events;
		event[eventName] = event[eventName] || [];
		event[eventName].push(callback);
	}

//fire the event
	emit(eventName, ...args) {
		const event = this._events;
		if (!(eventName in event)) return false;

		event[eventName].forEach(cb => cb(...args))
	}
}