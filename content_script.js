var button = document.createElement("button");
button.id = "ytp-cover-button";
button.className = "ytp-cover-button ytp-button";
button.title = "cover";
button.style.verticalAlign = "top";
button.style.width = "45px";

function onload() {
    if ('/watch' === location.pathname || location.pathname.startsWith("/embed")) {
        var videoContainer = document.getElementsByClassName("html5-video-container")[0];
        var controls = document.getElementsByClassName("ytp-right-controls")[0];
        controls.appendChild(button);
        button.initOpacity = function() {
            var opacity = videoContainer.style.opacity;
            videoContainer.style.opacity = opacity > 0 ? 0 : 1;
        };
        button.initText = function() {
            var opacity = videoContainer.style.opacity;
            button.innerText = opacity > 0 ? "가리기" : "임시보기";
        };
        button.initText();
        button.onclick = function() {
            button.initOpacity();
            button.initText();
        };
    }
}
(document.body || document.documentElement).addEventListener('transitionend',
    function(event) {
        if (event.propertyName === 'width' && event.target.id === 'progress') {
            onload();
        }
}, true);
onload();