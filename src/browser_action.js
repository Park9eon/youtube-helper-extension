'use strict';

// Mask
const checkbox1 = document.getElementById("checkbox1");
// Cat
const checkbox2 = document.getElementById("checkbox2");
const button = document.getElementById("button");

chrome.storage.local.get(['visibility', 'cat'], ({visibility, cat}) => {
    checkbox1.checked = visibility;
    checkbox2.cheched = cat;
});
checkbox1.addEventListener("change", () => {
    const visibility = checkbox1.checked;
    chrome.storage.local.set({visibility});
});
checkbox2.addEventListener("change", () => {
    const cat = checkbox2.checked;
    chrome.storage.local.set({cat});
});
button.addEventListener("click", () => {
    chrome.tabs.executeScript({file: 'script.js', allFrames: true});
});
