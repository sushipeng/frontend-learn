---
layout: default
title: 如何写文档
---

### 写文档说明

一个项目由多个不同的开发人员开发,他们的实现各有不同,项目到了一定年龄,会造成各种维护不畅,因此写文档
是一个好习惯,便于将来的人维护,也是给自己做笔记.

目前应用比较广泛的文档是 Markdown 语法的文档,上手极容易,只需要会简单的几个标记就能写出简洁大方的文档,
再利用gitbook工具生成各种格式的电子书,如pdf.


[Markdown极速入门](http://www.appinn.com/markdown/)   

[30分钟精通markdown](http://blog.leanote.com/post/freewalk/Markdown-%E8%AF%AD%E6%B3%95%E6%89%8B%E5%86%8C) 

[Markdown在线编辑器,实时预览](https://pandao.github.io/editor.md/examples/full.html)

[Gitbook快速入门](https://gitbook.zhangjikai.com/)

#### 添加文档

你可以在项目中的某个深层次目录里面新建一个 readme.md 的文件,注意使用UTF-8**无BOM编码**.
然后在 readme.md 里面写上内容.


#### 添加左侧章节信息

在项目最外层的 SUMMARY.md (章节文件) 添加一个导航

```txt
* [xxx使用说明](\xxx\xx\readme.md)
```

#### 生成电子书

在summary.md所有目录,打开命令行(按住`shift`键右击,打开命令行),使用 gitbook 生成电子书

```txt
//安装gitbook命令行终端
npm install -g gitbook-cli
```

```javascript
gitbook build
//需要安装nodejs环境,且安装gitbook-cli插件
```

![gitbook图示](/docs/imgs/gitbook-desc.png)
