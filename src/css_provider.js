/**
 * load 후 header를 보존하기 때문에 가능!
 */
'use strict';

const maskCSSID = "yt-cover-css";
const maskCSS = "css_provider.css";
const catCSSID = "yt-nyan-css";
const catCSS = "nyan.css";

function updateVisible(visibility = false) {
    if (visibility) {
        unloadCSS(maskCSSID);
    } else {
        loadCSS(maskCSSID, maskCSS);
    }
}

function updateCat(cat = true) {
    console.log(cat);
    if (cat) {
        loadCSS(catCSSID, catCSS);
    } else {
        unloadCSS(catCSSID);
    }
}

function loadCSS(id, url) {
    const link = document.createElement("link");
    link.href = chrome.extension.getURL(url);
    link.id = id;
    link.type = "text/css";
    link.rel = "stylesheet";
    document.getElementsByTagName("head")[0].appendChild(link);
}

function unloadCSS(id) {
    const cssNode = document.getElementById(id);
    cssNode && cssNode.parentNode.removeChild(cssNode);
}

chrome.storage.local.get(['visibility', 'cat'], ({visibility, cat}) => {
    updateVisible(visibility);
    updateCat(cat);
});

chrome.storage.onChanged.addListener(({visibility, cat}) => {
    if (visibility !== null && visibility !== undefined) {
        updateVisible(visibility.newValue)
    }
    if (cat !== null && cat !== undefined) {
        updateCat(cat.newValue);
    }
});
