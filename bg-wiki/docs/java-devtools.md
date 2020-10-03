---
layout: default
title: JAVA环境配置及开发工具
---

JAVA开发工具地址

	ftp://testl:123456@192.168.2.1/%B9%B2%CF%ED%B9%A4%BE%DF/Java/

原.NET开发人员统一下载 `IDEA` 开发工具！

JAVA开发人员根据自己喜好下载对应开发工具！

### IDEA破解

`Help`->`Register`->`License server` 填写地址

	http://idea.iteblog.com/key.php
	http://idea.liyang.io/ (候选)

### Java环境配置

* 安装 JDK，推荐：jdk-8u121 以上。
* Windows 上添加系统环境变量，`JAVA_HOME`=`JDK根目录`
* `PATH` 环境变量内追加：`%JAVA_HOME%\bin;%JAVA_HOME%\lib\tools.jar;`
* 打开 `cmd` ,敲`java -version`命令会有提示。

小提示：[vagrant](https://www.vagrantup.com/downloads.html) + [VirtualBox](https://www.virtualbox.org/) 快速搭建任何开发环境

### 必备IDEA插件

插件|描述
-|-
P3C(https://github.com/alibaba/p3c)|阿里开发规范插件
Lombok Plugin|日志，构造器，get/set 各种偷懒的注解,[官方文档](https://projectlombok.org/features/all)
PlantUML integration|用脚本画UML
