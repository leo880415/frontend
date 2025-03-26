//单行翻译方法
// function singleLineTranslation() {
//     const selection = window.getSelection();
//     const range = selection.getRangeAt(0);
//     const selectedTextNode = range.startContainer;
//     const selectedTextParent = selectedTextNode.parentNode;
//     asyncTranlateApi(selection.toString().trim()).then(data => {
//         const insertedTextElement = document.createElement('div');
//         insertedTextElement.className = 'inserted-text';
//         insertedTextElement.textContent = data;
//         const insertedText = selectedTextParent.querySelectorAll('.inserted-text');
//         if (insertedText.length === 0) {
//             selectedTextParent.insertBefore(insertedTextElement, range.endContainer.nextSibling);
//         }
//     }).catch(error => {
//         console.error('async tranlate:', error);
//     });
// }

//全文翻译方法
// function allTranslation() {
//     chrome.storage.local.get(['timeValue'], (result) => {
//         const timeValue = result.timeValue || 3000;
//         const bodyElements = document.body;
//         const nodeList = getTextContent(bodyElements);
//         for (let i = 0; i < nodeList.length; i++) {
//             setTimeout(() => {
//                 delayedFunction(nodeList[i]);
//             }, i * timeValue);
//         }
//     });
// }
// function delayedFunction(node) {
//     asyncTranlateApi(node.textContent.trim()).then(data => {
//         node.innerHTML += "<br><span class='inserted-text'>" + data + "</span>";
//     }).catch(error => {
//         console.error('async tranlate:', error);
//     });
// }
// function idHoldText(node) {
//     let flag = false;
//     for (const child of node.childNodes) {
//         if (child.nodeType === 3 && child.textContent.trim().replace(/\s+/g, '').length > 0) {
//             flag = true;
//             break;
//         }
//     }
//     return flag
// }


// function getStorageValue(key) {
//     return new Promise((resolve) => {
//         chrome.storage.local.get([key], (result) => {
//             resolve(result[key]);
//         });
//     });
// }

// async function asyncTranlateApi(text) {
//     const apiKey = await getStorageValue('keyValue');
//     const model = await getStorageValue('modelValue');
//     let apiUrl;
//     if (model === 'deepseek-v3-241226') {
//         apiUrl = 'https://ark.cn-beijing.volces.com/api/v3/chat/completions';
//     }
//     //const apiUrl = 'https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions';
//     //const apiKey = 'sk-8f9e8921fcfc4fcdbd1b1a9c6a1171d8';
//     //const model = 'qwen-max-2025-01-25';

//     let requestBody = {
//         model: model,
//         messages: [
//             {
//                 role: "system",
//                 content: "Please accurately translate the user's content into Chinese"
//             },
//             {
//                 role: "user",
//                 content: text
//             }
//         ]
//     };
//     try {
//         const response = await fetch(apiUrl, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Authorization': `Bearer ${apiKey}`
//             },
//             body: JSON.stringify(requestBody)
//         });

//         if (!response.ok) {
//             throw new Error(`HTTP error! status: ${response.status}`);
//         }
//         const data = await response.json();
//         return data.choices[0].message.content;
//     } catch (error) {
//         console.error('调用翻译接口出错:', error);
//     }
// }



//触发的单行或多行翻译或清空翻译
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "importContent") {
        const documentClone = document.cloneNode(true);
        const reader = new Readability(documentClone);
        const article = reader.parse();
        let title = article.title;
        let targetElement = document.getElementsByTagName('h1')[0];
        console.log(targetElement);
        if (targetElement && targetElement !== null && targetElement.childNodes[1]) {
            title = title + '<br>' + targetElement.childNodes[1].textContent;
        } else {
            targetElement = findElementByTextWithTreeWalker(title);
            if (targetElement && targetElement !== null && targetElement.childNodes[1]) {
                if (targetElement.childNodes[1].textContent !== title) {
                    title = title + '<br>' + targetElement.childNodes[1].textContent;
                }
            }
        }
        const content = article.content;
        sendResponse({ status: title + '\n' + content });
    }
    if (message.action === "pageUrl") {
        sendResponse({ status: window.location.href });
    }
});


function findElementByTextWithTreeWalker(targetText) {
    //只显示文本节点
    let treeWalker = document.createTreeWalker(
        document.body, // 从 body 元素开始遍历
        NodeFilter.SHOW_TEXT, // 只关注文本节点
        {
            acceptNode: function (node) {
                // 自定义过滤器，检查文本节点是否包含目标文本
                if (node.nodeValue.includes(targetText)) {
                    return NodeFilter.FILTER_ACCEPT; // 接受该节点
                }
                return NodeFilter.FILTER_REJECT; // 拒绝该节点
            }
        },
        false
    );
    while (treeWalker.nextNode()) {
        //返回包含文本节点的父元素
        return treeWalker.currentNode.parentNode; // 返回包含文本节点的父元素
    }
    return null; // 如果没有找到，返回 null
}



// document.addEventListener('keydown', function(event) {
//     if (event.key === 'q') {
//         const bodyElements = document.body;
//         const nodeList = getTextContent(bodyElements);
//         for (let i = 0; i < nodeList.length; i++) {
//             console.log(nodeList[i].textContent)
//         }
//     }
// });
// function getTextContent(node, list = []) {
//     let needRecursion = true;
//     if (node.nodeName === 'H1' || node.nodeName === 'P' || node.nodeName === 'DIV') {
//         if (idHoldText(node)) {
//             if (node.textContent.trim().replace(/\s+/g, ' ').length > 50) {
//                 list.push(node);
//                 needRecursion = false;
//             }
//         }
//     }
//     if (needRecursion) {
//         node.childNodes.forEach(child => {
//             getTextContent(child, list);
//         });
//     }
//     return list;
// }
// function idHoldText(node) {
//     let flag = false;
//     for (const child of node.childNodes) {
//         if (child.nodeType === 3 && child.textContent.trim().replace(/\s+/g, '').length > 0) {
//             flag = true;
//             break;
//         }
//     }
//     return flag
// }






// function tranlateTitleAndSendMessage(article) {
//     asyncTranlateApi(article.title).then(data => {
//         const title = article.title;
//         const content = article.content;
//         chrome.runtime.sendMessage({ action: "mainContent", text: title + '<br>' + data + '\n' + content });
//     }).catch(error => {
//         console.error('Error in async function:', error);
//     });
// }


// document.addEventListener('keydown', function (event) {
//     if ((event.ctrlKey || event.metaKey) && event.key === 'q') {
//         const documentClone = document.cloneNode(true);
//         const reader = new Readability(documentClone);
//         const article = reader.parse();
//         const title = article.title;
//         const content = article.content;
//         chrome.runtime.sendMessage({ action: "mainContent", text: title + '\n' + content });
//         // 例如，阻止默认行为
//         event.preventDefault();
//     }
// });


