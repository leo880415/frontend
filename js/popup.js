// $('#import').click(function () {
//     chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
//         chrome.tabs.sendMessage(tabs[0].id, { action: "importContent" }, function (response) {
//             document.querySelector('#translateText').innerHTML = response.status;
//             document.querySelector('#copy').style.backgroundColor = '#4a90e2';
//             document.querySelector('#word').style.backgroundColor = '#4a90e2';
//         });
//     });
// });
$('#copy').click(function () {
    const content = document.querySelector('#translateText').innerText;
    if (content.length === 0 || content === '此处为网页正文及翻译内容展示区域') {
        return;
    }
    navigator.clipboard.writeText(content).then(function () {
        document.querySelector('#translateText').classList.add("gray-text");
    }).catch(function (error) {
        alert('复制失败')
    });
});


$('#word').click(function () {
    // 获取文本内容
    const content = document.querySelector('#translateText').innerHTML;
    if (content.length === 0 || content === '此处为网页正文及翻译内容展示区域') {
        return;
    }
    //获取网页链接
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { action: "pageUrl" }, function (response) {
            const pageUrl = "原文链接：" + response.status;
            const htmlContent = `
                <html>
                    <head>
                        <meta charset="UTF-8">
                    </head>
                    <body>
                        ${pageUrl}
                        <br>
                        <br>
                        <br>
                        ${content}
                    </body>
                </html>
            `;
            // 使用docx库创建文档
            const { Document, Packer, Paragraph, TextRun } = docx;

            const convertedBlob = htmlDocx.asBlob(htmlContent);

            const link = document.createElement('a');
            link.href = URL.createObjectURL(convertedBlob);
            var wordTitle = "page-content";
            var wrappedText = "<p>" + content.replace(/\n+/g, '</p><p>');
            var startIndex = wrappedText.indexOf('</p>');
            if (startIndex !== -1) {
                wordTitle = wrappedText.substring(3, startIndex);
            }
            link.download = wordTitle + '.docx';
            link.click();
            URL.revokeObjectURL(link.href);
        });
    });
});


// $('#word').click(function () {
//     // 获取文本内容
//     const content = document.querySelector('#translateText').innerHTML;
//     if (content.length === 0 || content === '此处为网页正文及翻译内容展示区域') {
//         return;
//     }
//     //获取网页链接
//     chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
//         chrome.tabs.sendMessage(tabs[0].id, { action: "pageUrl" }, function (response) {
//             const pageUrl = "原文链接：" + response.status;
//             const htmlContent = `
//                 <html>
//                     <head>
//                         <meta charset="UTF-8">
//                     </head>
//                     <body>
//                         ${pageUrl}
//                         <br>
//                         <br>
//                         <br>
//                         ${content}
//                     </body>
//                 </html>
//             `;
//             // 创建 Blob 对象
//             const blob = new Blob([htmlContent], {
//                 type: 'application/msword'
//             });
//             // 创建下载链接
//             const url = URL.createObjectURL(blob);
//             // 创建 <a> 标签并触发下载
//             const a = document.createElement('a');
//             a.href = url;
//             var wordTitle = "page-content";
//             var wrappedText = "<p>" + content.replace(/\n+/g, '</p><p>');
//             var startIndex = wrappedText.indexOf('</p>');
//             if (startIndex !== -1) {
//                 wordTitle = wrappedText.substring(3, startIndex);
//             } 
//             a.download = wordTitle+'.doc';
//             document.body.appendChild(a);
//             a.click();
//             // 清理
//             document.body.removeChild(a);
//             URL.revokeObjectURL(url);
//         });
//     });
// });

// 监听输入事件并实时保存
// document.querySelector('#key').addEventListener('input', (e) => {
//     chrome.storage.local.set({ keyValue: e.target.value });
// });
// document.querySelector('#model').addEventListener('input', (e) => {
//     chrome.storage.local.set({ modelValue: e.target.value });
// });
// document.querySelector('#time').addEventListener('input', (e) => {
//     chrome.storage.local.set({ timeValue: e.target.value });
// });


//向后台脚本发送请求获取翻译后的正文内容
document.addEventListener('DOMContentLoaded', function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { action: "importContent" }, function (response) {
            document.querySelector('#translateText').innerHTML = response.status;
        });
    });
    // const translateText = document.querySelector('#translateText').innerText;
    // if (translateText.length === 0 || translateText === '此处为网页正文及翻译内容展示区域') {
    //     document.querySelector('#copy').style.backgroundColor = '#808080';
    //     document.querySelector('#word').style.backgroundColor = '#808080';
    // }
});
