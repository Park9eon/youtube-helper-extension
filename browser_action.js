(function(){
	var checkbox = document.getElementById('checkbox');
	chrome.storage.sync.get(function(data) {
		checkbox.checked = data.visibility;
	});
	checkbox.addEventListener("change", function() {
        chrome.storage.sync.set({visibility: checkbox.checked});
	});
})();
