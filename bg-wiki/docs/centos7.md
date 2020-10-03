---
layout: default
title: Centos7 常用操作
---

##### Centos7 常用操作

#### 防火墙

打开端口

	firewall-cmd --zone=public --add-port=8883/tcp --permanent
	firewall-cmd --reload   //重启防火墙

命令含义：
 
--zone #作用域
 
--add-port=80/tcp  #添加端口，格式为：端口/通讯协议
 
--permanent   #永久生效，没有此参数重启后失效

列出所有信息

	firewall-cmd --list-all

[防火墙相关文档](http://www.cnblogs.com/moxiaoan/p/5683743.html)

[系统信息](http://www.cnblogs.com/lhj588/archive/2012/05/15/2501007.html)


#### 列出用户


用户列表文件：/etc/passwd
用户组列表文件：/etc/group
查看系统中有哪些用户：cut -d : -f 1 /etc/passwd
查看可以登录系统的用户：cat /etc/passwd | grep -v /sbin/nologin | cut -d : -f 1
查看用户操作：w命令(需要root权限)
查看某一用户：w 用户名
查看登录用户：who
查看用户登录历史记录：last


