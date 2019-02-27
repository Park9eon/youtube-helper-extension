(() => {
    const videoCSSID = "yt-video-css";
    const videoCSS = "video.css";
    const progressCSSID = "yt-progress-css";
    const progressCSS = "progress.css";

    const loadCSS = (id, filename) => {
        const link = document.createElement("link");
        link.href = chrome.runtime.getURL(filename);
        link.id = id;
        link.type = "text/css";
        link.rel = "stylesheet";
        document.getElementsByTagName("head")[0].appendChild(link);
    };
    const unloadCSS = (id) => {
        const cssNode = document.getElementById(id);
        cssNode && cssNode.parentNode.removeChild(cssNode);
    };
    const load = (id, css, value) => {
        if (value !== null && value !== undefined) {
            if (value) {
                loadCSS(id, css);
            } else {
                unloadCSS(id);
            }
        }
    };
    chrome.storage.local.get(['video', 'progress'], ({video, progress} = {}) => {
        load(videoCSSID, videoCSS, video);
        load(progressCSSID, progressCSS, progress);
    });
    chrome.storage.onChanged.addListener(({video, progress} = {}) => {
        load(videoCSSID, videoCSS, video && video.newValue);
        load(progressCSSID, progressCSS, progress && progress.newValue);
    });
})();
