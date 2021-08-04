var __version__ = "2.4.0";

export default function updateTitle() {
    var __current__ = $("#selected-tab").text();
    if (__current__.length >= 50) {
        __current__ = `${__current__.substring(0,47)}...`;
    }

    return $("#title").text(`${__current__} - Text Editor v${__version__}`);
}

// make this a exported function, so everytime we update the #selected-tab, we can push the name into the title.