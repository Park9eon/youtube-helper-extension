(() => {
    const videoCheckbox = document.getElementById("videoCheckbox");
    const progressCheckbox = document.getElementById("progressCheckbox");
    const pipButton = document.getElementById("pipButton");
    const checkboxListener = (e) => {
        chrome.storage.local.set({[e.target.name]: e.target.checked});
    };
    chrome.storage.local.get(['video', 'progress'], ({video, progress} = {}) => {
        videoCheckbox.checked = video;
        progressCheckbox.checked = progress;
    });
    videoCheckbox.addEventListener("change", checkboxListener);
    progressCheckbox.addEventListener("change", checkboxListener);
    pipButton.addEventListener("click", () => {
        chrome.tabs.executeScript({file: 'pip.js', allFrames: true});
    });
})();
