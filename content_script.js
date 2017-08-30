var button = document.createElement("button");
button.id = "ytp-cover-button";
button.className = "ytp-cover-button ytp-button";
button.title = "cover";
button.style.verticalAlign = "top";
button.style.width = "45px";
button._visibility = null;

function onload(visibility) {
    if ('/watch' === location.pathname || location.pathname.startsWith("/embed")) {
        if ((visibility === null || visibility === undefined) &&
            (button._visibility === null || button._visibility === undefined)) {
            chrome.storage.sync.get(function(data) {
                onload(data.visibility);
            });
        } else {
            var videoContainer = document.getElementsByClassName("html5-video-container")[0];
            var controls = document.getElementsByClassName("ytp-right-controls")[0];
            controls.appendChild(button);
            button._visibility = visibility;
            button.initOpacity = function() {
                videoContainer.style.opacity = button._visibility ? 1 : 0;
            };
            button.initText = function() {
                button.innerText = button._visibility ? "가리기" : "임시보기";
            };
            button.initText();
            button.initOpacity();
            button.onclick = function() {
                button._visibility = !button._visibility;
                button.initOpacity();
                button.initText();
            };
        }
    }
}
(document.body || document.documentElement).addEventListener('transitionend',
    function(event) {
        if (event.propertyName === 'width' && event.target.id === 'progress') {
            onload();
        }
}, true);
chrome.storage.onChanged.addListener(function(changes, namespace) {
    onload(changes.visibility.newValue);
});
onload();
