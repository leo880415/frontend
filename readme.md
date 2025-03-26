## 领研网页助手

### 更新日志
#### [1.0.1] - 2024-03-14
- **修复**网页标题翻译抓取失败的问题


### 项目概述
领研网页助手是一个 Chrome 浏览器扩展，主要提供网页翻译、内容复制和导出正文等功能。
<font color=red>由于第三方工具的局限性，可能存在网页内容提取不完全的问题，请用户在复制/下载网页内容文档后进行必要的完整性检查。</font>

### 安装说明
1. 在 Chrome 浏览器中打开扩展管理页面 (`chrome://extensions/`)
2. 启用开发者模式
3. 选择"加载已解压的扩展程序"
4. 选择项目根目录进行安装

### 基本信息
- **名称**: 领研网页助手
- **版本**: 1.0.1
- **作者**: 刘流

### 扩展架构
1. 采用 `jquery` 的基础 JavaScript 函数库
2. 使用 `readability.js` 库来实现网页正文内容提取
3. 使用 `googleAPI` 来实现消息的发送和监听
4. 使用 [html-docx-js](https://cdn.jsdelivr.net/npm/html-docx-js/dist/html-docx.js) 将网页内容转换成 `docx` 格式
5. 使用 [docx](https://unpkg.com/docx@7.7.0/build/index.js) 下载 `docx` 文件

### 注意事项
- 扩展使用 Manifest V3 规范开发
- 后台服务使用 Service Worker 模式
- 扩展会在所有网页中注入内容脚本

如需更详细的技术文档，建议查看各个核心组件的源代码注释。