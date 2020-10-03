---
layout: default
title: Dockerfile 构建 Spring Boot 应用
---


# Dockerfile 构建 Spring Boot 应用


## Dockerfile 部署

- 系统环境：**CentOS 7.3 x64**
- jar 名称：**skb-user-0.0.1-SNAPSHOT.jar**
- Spring Boot 应用要启用的宿主机端口：**9096**
- Dockerfile 文件和 jar 文件存放在宿主机目录：**/opt/zch**
- Dockerfile 内容如下：

``` bash
FROM java:8-jre
MAINTAINER skb-user zch <gitnavi@qq.com>

ADD skb-user-0.0.1-SNAPSHOT.jar /usr/local/skb/user/

CMD ["java", "-Xmx500m", "-jar", "/usr/local/skb/user/skb-user-0.0.1-SNAPSHOT.jar", "--spring.profiles.active=test"]

EXPOSE 9096
```

- 开始构建：
	- `cd /opt/zch`
	- `docker build . --tag="skb/user:v1.0.1"`
	- `docker run -d -p 9096:9096 -v /usr/local/logs/:/opt/ --name="skbUser1.0.0" --net=host skb/user:v1.0.1`
		- 重要参数说明：
		- `-d`：表示以“守护模式”启动
		- `-p`：表示宿主机与容器的端口映射
		- `-v：表示将宿主机目录挂载到容器中目录
	- 查看启动后容器列表：`docker ps`
	- jar 应用的日志是输出在容器的 /opt 目录下，因为我们上面用了挂载，所在在我们宿主机的 /usr/local/logs 目录下可以看到输出的日志
- 防火墙开放端口：
	- `firewall-cmd --zone=public --add-port=9096/tcp --permanent`
	- `firewall-cmd --reload`
