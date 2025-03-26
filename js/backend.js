// chrome.runtime.onInstalled.addListener(() => {
//   chrome.contextMenus.create({
//     id: "option1",
//     title: "单行翻译",
//     contexts: ["all"]
//   });
//   chrome.contextMenus.create({
//     id: "option2",
//     title: "全文翻译",
//     contexts: ["all"]
//   });
//   chrome.contextMenus.create({
//     id: "option3",
//     title: "清空翻译",
//     contexts: ["all"]
//   });
//   chrome.contextMenus.create({
//     id: "option4",
//     title: "导出正文",
//     contexts: ["all"]
//   });
// });


// chrome.contextMenus.onClicked.addListener(function (info, tab) {
//   if (info.menuItemId === "option1") {
//     chrome.tabs.sendMessage(tab.id, { action: "singleLineTranslation" });
//   }
//   if (info.menuItemId === "option2") {
//     chrome.tabs.sendMessage(tab.id, { action: "allTranslation" });
//   }
//   if (info.menuItemId === "option3") {
//     chrome.tabs.sendMessage(tab.id, { action: "clearTranslation" });
//   }
//   if (info.menuItemId === "option4") {
//     chrome.tabs.sendMessage(tab.id, { action: "importContent" });
//     //chrome.action.openPopup();
//   }
// });



//接收content.js发送的内容
// let mainContent = "";
// chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
//   if (request.action === "mainContent") {
//     mainContent = request.text;
//     chrome.action.openPopup();
//   }
//   if (request.action === "getMainContent") {
//     sendResponse({ mainContent: mainContent });
//   }
//   if (request.action === "clearText") {
//     mainContent = '';
//   }
//   return true;
// });




