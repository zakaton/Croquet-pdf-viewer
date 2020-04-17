import Model from "./model/Model.js";
import View from "./view/View.js";

Croquet.App.root = false;
Croquet.startSession("croquet-pdf-viewer-2", Model, View)
    .then(_ => {
        const {view, model} = _;
        window.view = view;
    });