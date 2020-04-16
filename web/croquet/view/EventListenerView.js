class EventListenerView extends Croquet.View {
    constructor(model) {
        super(model);

        this.eventListeners = [];

        this.subscribe("eventListener", "add", this._addEventListener);
        this.subscribe("eventListener", "remove", this._removeEventListeners);
    }

    addEventListener(element, type, listener, options, thisArg = this) {
        listener = listener.bind(thisArg);
        this.eventListeners.push({element, type, listener});

        element.addEventListener(type, listener, options);
    }
    _addEventListener({element, type, listener, options, thisArg}) {
        this.addEventListener(element, type, listener, options, thisArg);
    }

    removeEventListeners() {
        this.eventListeners.forEach(function({element, type, listener}) {
            element.removeEventListener(type, listener);
        });
    }
    _removeEventListeners() {
        this.removeEventListeners();
    }

    detach() {
        this.removeEventListeners();
        super.detach();
    }
}

export default EventListenerView;