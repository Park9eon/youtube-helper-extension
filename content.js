(function () {
	'use strict';
	var globalVisibility = false;
	function update(visibility) {
		globalVisibility = visibility;
		if (visibility) {
			unloadCSS();
		} else {
			loadCSS('content');
		}
	}
	function loadCSS(file) {
		var link = document.createElement("link");
		link.href = chrome.extension.getURL(file + '.css');
		link.id = "yt-blind-style";
		link.type = "text/css";
		link.rel = "stylesheet";
		document.getElementsByTagName("html")[0].appendChild(link);
	}
	function unloadCSS() {
		var cssNode = document.getElementById("yt-blind-style");
		cssNode && cssNode.parentNode.removeChild(cssNode);
	}
	chrome.storage.sync.get(function(data) {
		update(data.visibility);
	});
	chrome.storage.onChanged.addListener(function(changes, namespace) {
		update(changes.visibility.newValue);
	});
}).call(window);
