import ThrottleView from "./ThrottleView.js";
import EventListenerView from "./EventListenerView.js"
import WebTorrentView from "./WebTorrentView.js";
import UIView from "./UIView.js";
import PDFViewerApplicationView from "./PDFViewerApplicationView.js";
import AssetManagerView from "./AssetManagerView.js";

class View extends Croquet.View {
    constructor(model) {
        super(model);
        this.model = model;

        this.throttle = new ThrottleView(model);
        this.eventListener = new EventListenerView(model);
        this.webTorrent = new WebTorrentView(model);
        this.ui = new UIView(model);
        this.pdfViewerApplication = new PDFViewerApplicationView(model);
        this.assetManager = new AssetManagerView(model);
    }

    update() {
        this.ui.update();
        this.pdfViewerApplication.update();
    }

    detach() {
        this.throttle.detach();
        this.eventListener.detach();
        this.webTorrent.detach();
        this.ui.detach();
        this.pdfViewerApplication.detach();

        super.detach();
    }
}

export default View;