---
layout: default
title: 棒谷angular项目初始化工具
---

## 棒谷angular项目初始化工具

## 目的
 统一angular项目的开发版本、统一的配置、统一规范、统一部署流程；提供基本的应用骨架；

## 安装
首先您的系统中安装Node.js和npm 下载Node.js，然后运行下面的命令将全局安装bang-cli命令行工具。

```sh
npm install -g bang-cli
```
## 初始化项目
```sh
bang new demo # 新建项目
cd demo       # 跳转到项目目录
npm install   # 安装依赖包
```
和angular的cli产生的目录几乎一致，但是对文件更改了一些配置，新增了一些包，并且提供了基本的应用骨架；提供了封装好的http服务；

环境预设置有三个：
- environment.ts 默认环境，开发时候使用
- environment.inner.ts 测试环境，打包发布到测试环境时使用
- environment.prod.ts 生产环境，打包到正式环境中使用

## 推荐如下初始化项目

自动添加ant的angular的组件库NG-ZORRO，以及安装公司内部开发的组件库ngx-bang-ui，作为补充；添加ngx-bang-ui的依赖包;

```sh
bang new demo --ant=true --style=scss
```

[ngx-bang-ui](http://192.168.1.206:3300/home)

[NG-ZORRO](http://192.168.1.206:3300/home)

## 不要去修改的文件

默认生成的md文档、tsconfig.json，tslint.json，以及package.json里初始化的包的版本号等。会影响到代码编译，以及代码规范的文件配置，都不要去修改。因为以后统一升级的时候可能会修改到它们。这样做的目的是为了保证各个业务线开发的项目能跑在同一个环境下，或者避免出现不可预料的错误。

