class UIView extends Croquet.View {
    constructor(model) {
        super(model);
        this.model = model;

        this.container = PDFViewerApplication.pdfViewer.container;
        this.subscribe('scroll', 'update', this.onUpdateScroll);
        this.publish('eventListener', 'add', {
            element : this.container,
            type : 'wheel',
            listener : this.onWheel,
            thisArg : this,
        });
        this.publish('eventListener', 'add', {
            element : this.container,
            type : 'pan',
            listener : this.onPan,
            thisArg : this,
        });

        this.reset();
    }

    onWheel(event) {
        // set delay due to weird mousewheel delay
        setTimeout(() => {
            const {scrollTop, scrollLeft} = this.container;
            const {viewId} = this;
            this.publish('throttle', 'publish', {
                scope : 'scroll',
                event : 'set',
                data : {viewId, scrollTop, scrollLeft},
                delayMinimum : 50,
            });
        }, 200)
    }
    onPan(event) {
        const {scrollTop, scrollLeft} = this.container;
        const {viewId} = this;
        this.publish('throttle', 'publish', {
            scope : 'scroll',
            event : 'set',
            data : {viewId, scrollTop, scrollLeft},
            delayMinimum : 50,
        });
    }
    onUpdateScroll(viewId) {
        if(this.viewId !== viewId)
            this._updateScroll = true;
    }
    updateScroll() {
        if(this._updateScroll) {
            const {top, left} = this.model.scroll;
            this.container.scrollTo({top, left});
            this._updateScroll = false;
        }
    }

    update() {
        this.updateScroll();
    }

    reset() {
        this._updateScroll = true;
    }
}

export default UIView;