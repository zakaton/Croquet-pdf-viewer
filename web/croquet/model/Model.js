class Model extends Croquet.Model {
    init() {
        super.init();

        this.scroll = {
            top : 0,
            left : 0,
        }
        this.subscribe('scroll', 'set', this.setScroll);

        this.pageNumber = 1;
        this.subscribe('pageNumber', 'set', this.setPageNumber);

        this.scale = 1;
        this.subscribe('scale', 'set', this.setScale);

        this.pagesRotation = 0;
        this.subscribe('rotation', 'set', this.setRotation);

        this.sidebar = {
            view : 0,
        };
        this.subscribe('sidebar', 'set', this.setSidebar);

        this.presentationMode = false;
        this.subscribe('presentationMode', 'set', this.setPresentationMode);

        this.scrollMode = 0;
        this.subscribe('scrollMode', 'set', this.setScrollMode);

        this.spreadMode = 0;
        this.subscribe('spreadMode', 'set', this.setSpreadMode);

        this.magnetURI = null;
        this.subscribe('magnetURI', 'set', this.setMagnetURI);

        this.hash = null;
        this.subscribe('hash', 'set', this.setHash);
    }

    setScroll({viewId, scrollTop, scrollLeft}) {
        this.scroll.top = scrollTop;
        this.scroll.left = scrollLeft;
        this.publish('scroll', 'update', viewId);
    }

    setPageNumber({viewId, pageNumber}) {
        this.pageNumber = pageNumber;
        this.publish('pageNumber', 'update', viewId);
    }

    setScale({viewId, scale}) {
        this.scale = scale;
        this.publish('scale', 'update', viewId);
    }

    setRotation({viewId, pagesRotation}) {
        this.pagesRotation = pagesRotation;
        this.publish('rotation', 'update', viewId);
    }

    setSidebar({viewId, view}) {
        this.sidebar.view = view;
        this.publish('sidebar', 'update', viewId);
    }

    setPresentationMode({viewId, active}) {
        this.presentationMode = active;
        this.publish('presentationMode', 'update', viewId);
    }

    setScrollMode({viewId, mode}) {
        this.scrollMode = mode;
        this.publish('scrollMode', 'update', viewId);
    }

    setSpreadMode({viewId, mode}) {
        this.spreadMode = mode;
        this.publish('spreadMode', 'update', viewId);
    }

    setMagnetURI({viewId, magnetURI}) {
        this.magnetURI = magnetURI;
        this.publish('magnetURI', 'update', viewId);
    }

    setHash({viewId, hash}) {
        this.hash = hash;
        this.publish('hash', 'update', viewId);
    }
}
Model.register();

export default Model;