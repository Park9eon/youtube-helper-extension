'use strict';

const checkbox = document.getElementById("checkbox");
const button = document.getElementById("button");

chrome.storage.local.get(['visibility'], ({visibility}) => {
    checkbox.checked = visibility;
});
checkbox.addEventListener("change", () => {
    const visibility = checkbox.checked;
    chrome.storage.local.set({visibility});
});
button.addEventListener("click", () => {
    chrome.tabs.executeScript({ file: 'script.js', allFrames: true });
});
