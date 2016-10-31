chrome.browserAction.onClicked.addListener((activeTab) => {
	var newURL = "https://hugellc.unanet.biz/hugellc/action/home";
	chrome.tabs.create({url: newURL});
});
