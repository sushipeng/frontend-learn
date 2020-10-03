---
layout: default
title: 新人手册
---

# 新人手册
## 前言
首先，欢迎新同事加入棒谷大家庭，为了快速融入大家庭，也为了迅速了解公司，下面介绍一些常用技能。

[**棒谷业务手册**](http://192.168.1.151:28082/)

### 0，准备
* ~~新同事需要准备一个QQ号（建议独立工作相关的QQ号），公司主要是使用QQ作为内部交流工具~~
* 新同事需要[下载企业微信](https://work.weixin.qq.com/),公司主要是使用`企业微信`作为内部交流工具
* 申请一个有道云笔记账号，“好记性不如烂笔头”，养成记笔记的习惯，也方便自己回顾，总结经验
* 学会使用[XMind](https://www.xmind.cn/)做思维导图，有什么好的想法可以用脑图展示给大家
* 学会使用[processon](https://www.processon.com/)在线作图
* 内网常用工具下载，用资源管理器打开`ftp://testl:123456@192.168.2.1/%B9%B2%CF%ED%B9%A4%BE%DF/`

### 1，文档编写
* 我们的文档都是以`markdown`的格式编写，`markdown`的语法是相当重要；关于语法，大家可以参考[30分钟精通markdown](http://blog.leanote.com/post/freewalk/Markdown-%E8%AF%AD%E6%B3%95%E6%89%8B%E5%86%8C)学习。
* 我们学会了`markdown`语法后，就可以采用`markdown`的语法写各种文档，这里提一下项目文档的规范，具体规范请参考[项目文档规范](dev-law.md)

### 2，代码管理
* 公司采用的git来管理代码提交的方式，关于git相关可以参考[Git](https://git-scm.com/book/zh/v1/%E8%B5%B7%E6%AD%A5-Git-%E5%9F%BA%E7%A1%80)或者廖雪峰的[Git入门](https://www.liaoxuefeng.com/wiki/0013739516305929606dd18361248578c67b8067c8c017b000/)，git相对svn最大的区别是一个是分布式的，一个是集中式。
* Git涉及到工具很多首先Git有自带的界面工具和命令行工具，同样也有小乌龟Git（tortoisegit），开发的IDE是使用IntelliJ IDEA(社区版)软件，该工具内置的工具更加方便使用，所以推荐IDEA。

### 3，技术相关
* 公司的技术栈请参考[技术文档](java-stack.md)；Java相关的学习资源请参考[这里](about-java.md)
* 了解DevOps相关概念，熟悉Jenkins([pipeline](https://jenkins.io/doc/book/pipeline/))
* JAVA项目使用Docker,Kubernetes(K8S)部署
* 前端学会[Angular](https://www.angular.cn/docs),[TypeScript](https://www.tslang.cn/docs/home.html),ngrx

### 4，项目管理
* 公司项目管理采用的是`scrum`的项目管理，大家可以去了解相关敏捷的概念，公司的项目管理软件使用的是[TAPD](https://www.tapd.cn/my_worktable/?from=left_tree_v2)，相关的账号请找导师帮忙开通。关于使用Tapd遇到问题，可以参考[Tapd常见问题处理](faq-tapd.md)

### 5. 内网包管理

技术部自己搭建了nexus包管理器，支持`npm`,`docker`,`nuget`,`maven`等主要仓库，可在局域网内存一份副本，这样任何同事通过nexus下载之后，其他需要下载该包的同事不用额外等待！！详见文档[nexus包管理说明](http://hello.banggood.cn/docs/skb-repository.html)

### 6. 部门流程规范

参见 [规范汇编](http://hello.banggood.cn/docs/dev-spec.html) ，一支有战斗力的队伍一定少不了规则！在日常工作中，我们需要共同遵守一些规范以便于提升沟通效率，保证质量。

## 个人办事

### 办理广州居住证（免费）

>1、在广州就能报名考驾照
>　　外地户口凭居住证或临时居住证，即可在广州报名考驾照，想考驾照的朋友就不用广州老家的跑来跑去了，考驾照会轻松很多。
>
>2、申请港澳通行证，不用回老家
>　　在广州市连续一年以上缴纳养老保险并持有广州居住证的外地户口就业人员(登记备案国家工作人员除外)，可以在广州申请办理普通护照、往来港澳通行证及各类签注、往来台湾通行证及各类签注(包括首次申请、换补发证件、证件失效重新申请以及证件加注)。
>
>3、子女上学与常住户口学生同等对待
>　　居住证持证人在同一居住地连续居住并依法缴纳社保满五年、有稳定职业、符合计生政策的，其子女接受学前教育、义务教育，应当与常住户口学生同等对待。
>
>4、年限够了，就能申请广州户口
>　　居住证持证人在同一居住地连续居住并依法缴纳社保满七年、有固定住所、稳定职业、符合计生政策、依法纳税并无犯罪记录的，就可申请广州常住户口。
>
>　　而且作为引进人才，要将户口迁来广州，申请材料也是需要居住证的哦，早办更方便。

[居住证福利](http://mp.weixin.qq.com/s/QhGFVsL_eHd9uR10n7AF5g)
[广州居住证办理指引](https://mp.weixin.qq.com/s/FlL0CkcpjNEu1KdcQpovMA)

流程：**居住登记** ->  **(半年后) 居住证办理**  -> **每年签注一次**

居住登记流程：

* 使用个人微信搜索 `gzlaisuiju` 广州来穗局 公众号，进入`来穗通`菜单（必须在微信中注册才可以）

* 进入`居住登记` 菜单填写表单并提交


## 棒谷发票抬头

	请使用个人微信扫描以下二维码
	
![发票抬头](/docs/imgs/bg-invoice.png)
