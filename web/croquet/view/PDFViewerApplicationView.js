class PDFViewerApplicationView extends Croquet.View {
    constructor(model) {
        super(model);
        this.model = model;

        PDFViewerApplication.eventBus.on('pagechanging', this.onPageChanging.bind(this));
        this.subscribe('pageNumber', 'update', this.onUpdatePageNumber);

        PDFViewerApplication.eventBus.on('scalechanging', this.onScaleChanging.bind(this));
        this.subscribe('scale', 'update', this.onUpdateScale);

        PDFViewerApplication.eventBus.on('rotationchanging', this.onRotationChanging.bind(this));
        this.subscribe('rotation', 'update', this.onUpdateRotation);

        //PDFViewerApplication.eventBus.on('sidebarviewchanged', this.onSidebarChanged.bind(this));
        //this.subscribe('sidebar', 'update', this.onUpdateSidebar);

        PDFViewerApplication.eventBus.on('presentationmodechanged', this.onPresentationModeChanged.bind(this));
        this.subscribe('presentationMode', 'update', this.onUpdatePresentationMode);

        PDFViewerApplication.eventBus.on('spreadmodechanged', this.onSpreadModeChanged.bind(this));
        this.subscribe('spreadMode', 'update', this.onUpdateSpreadMode);

        PDFViewerApplication.eventBus.on('fileinputchange', this.onFileInputChange.bind(this));
        this.subscribe('file', 'update', this.onUpdateFile);

        PDFViewerApplication.eventBus.on('scrollmodechanged', this.onScrollModeChanged.bind(this));
        this.subscribe('scrollMode', 'update', this.onUpdateScrollMode);
        
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
        if(this._ignoreSidebar) return;

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
            this._ignoreSidebar = true;
            
            if(this.model.sidebar.view)
                PDFViewerApplication.pdfSidebar.open();
            else
                PDFViewerApplication.pdfSidebar.close();
            
            this._ignoreSidebar = false;
            this._updateSidebarView = false;
        }
    }

    onPresentationModeChanged(event) {
        if(this._ignorePresentationMode) return;

        const {active} = event;
        const {viewId} = this;
        this.publish('throttle', 'publish', {
            scope : 'presentationMode',
            event : 'set',
            data : {viewId, active},
            minimumDelay : 20,
        });
    }
    onUpdatePresentationMode(viewId) {
        if(this.viewId !== viewId)
            this._updatePresentaionMode = true;
    }
    updatePresentationMode() {
        if(this._updatePresentaionMode) {
            this._ignorePresentationMode = true;

            if(this.model.presentationMode)
                PDFViewerApplication.pdfPresentationMode.request();
            else
                if(document.fullscreen)
                    document.exitFullscreen();

            this._ignorePresentationMode = false;
            this._updatePresentaionMode = false;
        }
    }



    onScrollModeChanged(event) {
        console.log(event);
    }
    onUpdateScrollMode(viewId) {
        if(this.viewId !== viewId)
            this._updateScrollMode = true;
    }
    updateScrollMode() {
        if(this._updateScrollMode) {
            // FILL
            this._updateScrollMode = false;
        }
    }

    onSpreadModeChanged(event) {
        console.log(event);
    }
    onUpdateSpreadMode(viewId) {
        if(this.viewId !== viewId)
            this._updateSpreadMode = true;
    }
    updateSpreadMode() {
        if(this._updateSpreadMode) {
            // FILL
            this._updateSpreadMode = false;
        }
    }

    onFileInputChange(event) {
        console.log(event);
    }
    onUpdateFile(viewId) {
        if(this.viewId !== viewId)
            this._updateFile = true;
    }
    _updateFile() {
        if(this._updateFile) {
            // FILL
            this._updateFile = false;
        }
    }


    update() {
        this.updatePageNumber();
        this.updateScale();
        this.updateRotation();
        this.updateSidebar();
        this.updatePresentationMode();
    }

    reset() {
        this._updatePageNumber = true;
        this._updateRotation = true;
        this._updateScale = true;
        this._updateSidebar = true;
        this._updatePresentaionMode = true;
    }

    detach() {
        super.detach();
    }
}

export default PDFViewerApplicationView;