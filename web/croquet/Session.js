import Model from "./model/Model.js";
import View from "./view/View.js";

const startSession = () => {
    Croquet.App.root = false;
    Croquet.startSession("croquet-pdf-viewer-4", Model, View)
        .then(_ => {
            const {view, model} = _;
            window.view = view;
        });
}

if(window.PDFViewerApplication) {
    startSession();
}
else {
    document.addEventListener('webviewerloaded', event => {
        startSession();
    });
}