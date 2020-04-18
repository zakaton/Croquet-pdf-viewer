class PDFViewerApplicationView extends Croquet.View {
    constructor(model) {
        super(model);
        this.model = model;

        //PDFViewerApplication.eventBus.on('pagechanging', this.onPageChanging.bind(this));
        PDFViewerApplication.eventBus.on('pagenumberchanged', this.onPageNumberChanged.bind(this));
        PDFViewerApplication.eventBus.on('nextpage', this.onNextPage.bind(this));
        PDFViewerApplication.eventBus.on('previouspage', this.onPreviousPage.bind(this));
        this.subscribe('pageNumber', 'update', this.onUpdatePageNumber);

        PDFViewerApplication.eventBus.on('scalechanging', this.onScaleChanging.bind(this));
        this.subscribe('scale', 'update', this.onUpdateScale);

        PDFViewerApplication.eventBus.on('rotationchanging', this.onRotationChanging.bind(this));
        this.subscribe('rotation', 'update', this.onUpdateRotation);

        //PDFViewerApplication.eventBus.on('sidebarviewchanged', this.onSidebarChanged.bind(this));
        //this.subscribe('sidebar', 'update', this.onUpdateSidebar);

        PDFViewerApplication.eventBus.on('presentationmodechanged', this.onPresentationModeChanged.bind(this));
        this.subscribe('presentationMode', 'update', this.onUpdatePresentationMode);

        PDFViewerApplication.eventBus.on('scrollmodechanged', this.onScrollModeChanged.bind(this));
        this.subscribe('scrollMode', 'update', this.onUpdateScrollMode);

        PDFViewerApplication.eventBus.on('spreadmodechanged', this.onSpreadModeChanged.bind(this));
        this.subscribe('spreadMode', 'update', this.onUpdateSpreadMode);

        PDFViewerApplication.eventBus.on('fileinputchange', this.onFileInputChange.bind(this));
        this.subscribe('magnetURI', 'update', this.onUpdateMagnetURI);

        this.reset();
    }

    // PAGE NUMBER
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
    onPageNumberChanged(event) {
        const {value} = event;
        const pageNumber = Number(value);
        const {viewId} = this;

        this.publish('throttle', 'publish', {
            scope : 'pageNumber',
            event : 'set',
            data : {viewId, pageNumber},
            minimumDelay : 20,
        });
    }
    onNextPage(event) {
        const {pageNumber} = event.source;
        const {viewId} = this;
        this.publish('throttle', 'publish', {
            scope : 'pageNumber',
            event : 'set',
            data : {viewId, pageNumber},
            minimumDelay : 20,
        });
    }
    onPreviousPage(event) {
        const {pageNumber} = event.source;
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

    // SCALE
    onScaleChanging(event) {
        if(this._ignoreScale) return;

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
            this._ignoreScale = true;
            PDFViewerApplication.pdfViewer.currentScale = this.model.scale;
            this._ignoreScale = false;

            this._updateScale = false;
        }
    }

    // ROTATION
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

    // SIDEBAR
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
            this._updateSidebar = false;
        }
    }

    // PRESENTATION MODE
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

    // SCROLL MODE
    onScrollModeChanged(event) {
        if(this._ignoreScrollMode) return;

        const {mode} = event;
        const {viewId} = this;
        this.publish('throttle', 'publish', {
            scope : 'scrollMode',
            event : 'set',
            data : {viewId, mode},
            minimumDelay : 20,
        });
    }
    onUpdateScrollMode(viewId) {
        if(this.viewId !== viewId)
            this._updateScrollMode = true;
    }
    updateScrollMode() {
        if(this._updateScrollMode) {
            this._ignoreScrollMode = true;
            PDFViewerApplication.pdfViewer.scrollMode = this.model.scrollMode;
            this._ignoreScrollMode = false;

            this._updateScrollMode = false;
        }
    }

    // SPREAD MODE
    onSpreadModeChanged(event) {
        if(this._ignoreSpreadMode) return;

        const {mode} = event;
        const {viewId} = this;
        this.publish('throttle', 'publish', {
            scope : 'spreadMode',
            event : 'set',
            data : {viewId, mode},
            minimumDelay : 20,
        });

    }
    onUpdateSpreadMode(viewId) {
        if(this.viewId !== viewId)
            this._updateSpreadMode = true;
    }
    updateSpreadMode() {
        if(this._updateSpreadMode) {
            this._ignoreSpreadMode = true;
            PDFViewerApplication.pdfViewer.spreadMode = this.model.spreadMode;
            this._ignoreSpreadMode = false;

            this._updateSpreadMode = false;
        }
    }

    // FILE INPUT
    onFileInputChange(event) {
        if(this._ignoreMagnetURI) return;

        const {files} = event.fileInput;
        console.log(files);
        this.publish('torrent', 'seed', {
            files,
            callback : torrent => {
                const {viewId} = this;
                const {magnetURI} = torrent;
                this.publish('magnetURI', 'set', {magnetURI, viewId});
            },
        });
    }

    onUpdateMagnetURI(viewId) {
        if(this.viewId !== viewId)
            this._updateMagnetURI = true;
    }
    updateMagnetURI() {
        if(this._updateMagnetURI) {
            if(!this.model.magnetURI) return;

            this._ignoreMagnetURI = true;

            this.publish('torrent', 'add', {
                torrentId : this.model.magnetURI,
                callback : torrent => {
                    const {files} = torrent;
                    const file = files[0];
                    file.getBlobURL((error, url) => {
                        if(error)
                            console.error(error);
                        else {
                            PDFViewerApplication.open({
                                url,
                                originalUrl : file.name
                            });
                        }
                    });
                },
            });
            this._ignoreMagnetURI = false;

            this._updateMagnetURI = false;
        }
    }


    update() {
        this.updatePageNumber();
        this.updateScale();
        this.updateRotation();
        this.updateSidebar();
        this.updatePresentationMode();
        this.updateScrollMode();
        this.updateSpreadMode();
        this.updateMagnetURI();
    }

    reset() {
        this._updatePageNumber = true;
        this._updateRotation = true;
        this._updateScale = true;
        this._updateSidebar = true;
        this._updatePresentaionMode = true;
        this._updateScrollMode = true;
        this._updateSpreadMode = true;
        this._updateMangetURI = true;
    }

    detach() {
        super.detach();
    }
}

export default PDFViewerApplicationView;