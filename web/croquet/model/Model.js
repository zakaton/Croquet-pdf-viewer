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
        this.subscribe('sidebar', 'set', this.setSidebar)
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
}
Model.register();

export default Model;