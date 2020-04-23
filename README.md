# TikTokLike

今天开一个坑，模拟抖音实现互动功能，这篇文章会随着项目的进度更新，记录流程，遇到问题的解决方法，也有可能做完项目之后再补充。

## 新建RN项目

### 初始化一个项目就遇到问题了

用`npx react-native init TikTokLike --template react-native-template-typescript`遇到淘宝源没有typescript template的问题，原因是`react native cli`版本太低，全局卸载解决`npm uninstall -g react-native-cli`。

可以开始尝试在模拟器中运行，正常跑通👌后就init代码到github。

ref

* *[Using TypeScript with React Native · React Native](https://reactnative.dev/docs/typescript)*

### 第三方库

```json
"react": "16.11.0",
"react-native": "0.62.2",
"react-native-paper": "^3.8.0",
"react-native-vector-icons": "^6.6.0"
```

* react-native-paper
* react-native-vector-icons
* react-navigation // TODO:

yarn add @react-navigation/native
yarn add react-native-reanimated react-native-gesture-handler react-native-screens react-native-safe-area-context @react-native-community/masked-view
yarn add @react-navigation/bottom-tabs
npx pod-install ios

`Note: If you are using react-native version 0.60 or higher you don't need to link react-native-vector-icons.`
react-native-paper文档中描述不需要link react-native-vector-icons，实际上会出现`Unrecognized font family 'Material Design Icons'`的错误

在我这里面是需要`yarn react-native link`的，另外需要把XCode里面Targets > Build Phases > Copy Bundle Resources里面的.ttf文件删除，否则编译时会冲突

ref

* *[Getting Started · React Native Paper](https://reactnative.dev/docs/typescript)*

## 主页面导航

![5个tab](https://i.loli.net/2020/04/22/bpF8VXeORvkrIH9.png)

* Videos
* Friends
* New
* Messages
* Me

babel plugin 需要`yarn start --reset-cache`

## 确定视频播放方案

## 评论

## ❤️Like动画
