browser.browserAction.onClicked.addListener((tab) => { //Set listener for browserAction click (broswer button
	//console.log("browserAction click");           //Debug click
	browser.tabs.sendMessage(tab.id,"hello my man"); //Message content script to let it know the button was clicked
});
