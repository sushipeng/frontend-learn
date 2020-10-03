---
layout: default
title: 安装RabbitMQ
---

以下在`CentOS Linux release 7.3.1611 (Core)`环境下安装

#### 安装erlang

	yum install erlang


#### 安装libreadline5
	wget http://ftp.opensuse.org/distribution/13.1/repo/oss/suse/x86_64/libreadline5-5.2-131.1.2.x86_64.rpm
	yum install libreadline5-5.2-131.1.2.x86_64.rpm

#### 安装RabbitMQ
	rpm --import https://www.rabbitmq.com/rabbitmq-release-signing-key.asc
	wget https://www.rabbitmq.com/releases/rabbitmq-server/v3.6.9/rabbitmq-server-3.6.9-1.el7.noarch.rpm
	yum install rabbitmq-server-3.6.9-1.el7.noarch.rpm
	
#### 默认端口
	4369 (epmd), 25672 (Erlang distribution)
	5672, 5671 (AMQP 0-9-1 without and with TLS)
	15672 (if management plugin is enabled)
	61613, 61614 (if STOMP is enabled)
	1883, 8883 (if MQTT is enabled)