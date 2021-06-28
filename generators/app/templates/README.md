# <%- name %>

> <%- description %>


## 项目安装

### 安装依赖

```
npm install
```

### 构建 npm

### 预览
打开`微信开发者工具`导入项目预览效果


## 目录规范

### API

统一管理模块的 url 请求地址， 如：`api/xxx.js`

### 组件

统一存放在 `components` 目录下

### 页面

统一存放在 `pages` 目录下

### 状态管理

管理数据状态，如：`store/xxx.js`

### 其它

- 分包
  
  子包存放在 `packages` 目录下，独立子包存放在 `moudles` 目录下

  配置文档详见微信[分包加载](https://developers.weixin.qq.com/miniprogram/dev/framework/subpackages.html)官方文档

- 工具类

  存放在 `utils` 目录下



## 开发规范

代码格式、命名规范等，以 `ESLint Recommended` 规范为基础标准

- 字符串统一用 `''`
- 判断相等统一用 `===`

CSS 遵从 [`BEM`](https://www.jianshu.com/p/54b000099217) 规范

.块__元素--修饰符{}

- `block` 代表了更高级别的抽象或组件
- `block__element` 代表 `block` 的后代，用于形成一个完整的 `block` 的整体
- `block--modifier` 代表 `block` 的不同状态或不同版本


## 技术栈

### 基础框架

- [微信官方原生](https://developers.weixin.qq.com/miniprogram/dev/framework/)
- [computed](https://developers.weixin.qq.com/miniprogram/dev/extended/utils/computed.html)
- [mobx](https://developers.weixin.qq.com/miniprogram/dev/extended/utils/mobx.html)

### 第三方插件

- [vant-weapp](https://youzan.github.io/vant-weapp/#/intro)



## 注意事项
- rpx（responsive pixel）: 可以根据屏幕宽度进行自适应。规定屏幕宽为750rpx。如在 iPhone6 上，屏幕宽度为375px，共有750个物理像素，则750rpx = 375px = 750物理像素，1rpx = 0.5px = 1物理像素。

- 由于开启了 `eslint` 和 `stylelint`, 推荐 `vscode` 安装 `eslint` 和 `stylelint-plus` 并开启保存自动修复功能
