/**
 * load 후 header를 보존하기 때문에 가능!
 */
(function () {
	'use strict';
	var globalVisibility = false;
	function update(visibility) {
		globalVisibility = visibility;
		if (visibility) {
			unloadCSS();
		} else {
			loadCSS();
		}
	}
	function loadCSS() {
		var link = document.createElement("link");
		link.href = chrome.extension.getURL('css_provider.css');
		link.id = "yt-cover-css";
		link.type = "text/css";
		link.rel = "stylesheet";
		document.getElementsByTagName("head")[0].appendChild(link);
	}
	function unloadCSS() {
		var cssNode = document.getElementById("yt-cover-css");
		cssNode && cssNode.parentNode.removeChild(cssNode);
	}
	chrome.storage.sync.get(function(data) {
		update(data.visibility);
	});
	chrome.storage.onChanged.addListener(function(changes, namespace) {
		update(changes.visibility.newValue);
	});
}).call(window);


