import Model from "./model/Model.js";
import View from "./view/View.js";

const startSession = () => {
    const {searchParams} = new URL(window.location);
    const room = searchParams.get('room') || '';
    
    Croquet.App.root = false;
    Croquet.startSession(`croquet-pdf-viewer-${room}`, Model, View)
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