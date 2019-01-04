'use strict';

var checkbox = document.getElementById('checkbox');
console.log(123);
chrome.storage.local.get(['visibility'], function(data) {
	console.log(123);
	checkbox.checked = data.visibility;
});
checkbox.addEventListener("change", function() {
	chrome.storage.local.set({visibility: checkbox.checked});
	console.log(123);
});
