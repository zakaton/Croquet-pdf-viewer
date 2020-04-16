import ThrottleView from "./ThrottleView.js";
import EventListenerView from "./EventListenerView.js"
import WebTorrentView from "./WebTorrentView.js";
import UIView from "./UIView.js";

class View extends Croquet.View {
    constructor(model) {
        super(model);
        this.model = model;

        this.throttle = new ThrottleView(model);
        this.eventListener = new EventListenerView(model);
        this.webTorrent = new WebTorrentView(model);
        this.ui = new UIView(model);

        PDFViewerApplication.eventBus.on('pagechanging', this.onPageChanging.bind(this));
        this.subscribe('pageNumber', 'update', this.onUpdatePageNumber);

        PDFViewerApplication.eventBus.on('scalechanging', this.onScaleChanging.bind(this));
        this.subscribe('scale', 'update', this.onUpdateScale);

        PDFViewerApplication.eventBus.on('rotationchanging', this.onRotationChanging.bind(this));
        this.subscribe('rotation', 'update', this.onUpdateRotation);

        PDFViewerApplication.eventBus.on('sidebarviewchanged', this.onSidebarChanged.bind(this));
        //this.subscribe('sidebar', 'update', this.onUpdateSidebar);

        PDFViewerApplication.eventBus.on('presentationmodechanged', this.onPresentationModeChanged.bind(this));
        PDFViewerApplication.eventBus.on('spreadmodechanged', this.onSpreadModeChanged.bind(this));
        PDFViewerApplication.eventBus.on('fileinputchange', this.onFileInputChange.bind(this));
        PDFViewerApplication.eventBus.on('scrollmodechanged', this.onScrollModeChanged.bind(this));
        
        this.reset();
    }

    onPageChanging(event) {
        const {pageNumber} = event;
        const {viewId} = this;
        this.publish('throttle', 'publish', {
            scope : 'pageNumber',
            event : 'set',
            data : {viewId, pageNumber},
            minimumDelay : 20,
        });
    }
    onUpdatePageNumber(viewId) {
        if(this.viewId !== viewId) {
            this._updatePageNumber = true;
        }
    }
    updatePageNumber() {
        if(this._updatePageNumber) {
            PDFViewerApplication.page = this.model.pageNumber;
            this._updatePageNumber = false;
        }
    }

    onScaleChanging(event) {
        const {scale} = event;
        const {viewId} = this;
        this.publish('throttle', 'publish', {
            scope : 'scale',
            event : 'set',
            data : {viewId, scale},
            minimumDelay : 20,
        });
    }
    onUpdateScale(viewId) {
        if(this.viewId !== viewId)
            this._updateScale = true;
    }
    updateScale() {
        if(this._updateScale) {
            PDFViewerApplication.pdfViewer.currentScale = this.model.scale;
            this._updateScale = false;
        }
    }


    onRotationChanging(event) {
        const {pagesRotation} = event;
        const {viewId} = this;
        this.publish('throttle', 'publish', {
            scope : 'rotation',
            event : 'set',
            data : {viewId, pagesRotation},
            minimumDelay : 20,
        });
    }
    onUpdateRotation(viewId) {
        if(this.viewId !== viewId)
            this._updateRotation = true;
    }
    updateRotation() {
        if(this._updateRotation) {
            PDFViewerApplication.pdfViewer.pagesRotation = this.model.pagesRotation;
            this._updateRotation = false;
        }
    }

    onSidebarChanged(event) {
        if(this.ignoreSidebar) return;

        const {view} = event;
        const {viewId} = this;
        this.publish('throttle', 'publish', {
            scope : 'sidebar',
            event : 'set',
            data : {viewId, view},
            minimumDelay : 20,
        });
    }
    onUpdateSidebar(viewId) {
        if(this.viewId !== viewId)
            this._updateSidebar = true;
    }
    updateSidebar() {
        if(this._updateSidebar) {
            this.ignoreSidebar = true;
            
            if(this.model.sidebar.view)
                PDFViewerApplication.pdfSidebar.open();
            else
                PDFViewerApplication.pdfSidebar.close();
            
            this.ignoreSidebar = false;
            
            this._updateSidebarView = false;
        }
    }

    onPresentationModeChanged(event) {
        const {active} = event;
        const {viewId} = this;
        this.publish('throttle', 'publish', {
            scope : 'presentationMode',
            event : 'set',
            data : {viewId, active},
            minimumDelay : 20,
        });
    }

    onScrollModeChanged(event) {
        console.log(event);
    }

    onSpreadModeChanged(event) {
        console.log(event);
    }

    onFileInputChange(event) {
        console.log(event);
    }


    update() {
        this.updatePageNumber();
        this.updateScale();
        this.updateRotation();
        this.updateSidebar();

        this.ui.update();
    }

    reset() {
        this._updatePageNumber = true;
        this._updateRotation = true;
        this._updateScale = true;
        this._updateSidebar = true;
    }

    detach() {
        this.throttle.detach();
        this.eventListener.detach();
        this.webTorrent.detach();
        this.ui.detach();

        super.detach();
    }
}

export default View;