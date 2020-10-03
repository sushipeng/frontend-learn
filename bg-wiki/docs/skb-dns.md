---
layout: default
title: OA研发中心DNS说明
---

### OA研发中心DNS说明

##### 请开发人员将自己电脑上的dns配置为： 192.168.1.53

站点 | 域名| IP/Port | 描述
- | -
[文档中心](http://dev.sellercube.com)| dev.sellercube.com| 192.168.1.172:38080 | OA研发中心开发文档中心
[Git仓库](http://git.dev.sellercube.com)| git.dev.sellercube.com | 192.168.1.122:3000 | Gogs代码仓库
[Nexus](http://nexus.dev.sellercube.com/)| nexus.dev.sellercube.com| 192.168.1.73:8081 | maven,nuget私服
[Jenkins](http://jenkins.dev.sellercube.com/)| jenkins.dev.sellercube.com| 192.168.1.172:58080 | 持续集成工具
[CAS](http://cas.dev.sellercube.com/)| cas.dev.sellercube.com| 192.168.1.172:28080 | cas统一认证中心（sso）
[RabbitMQ](http://rabbitmq.dev.sellercube.com:15672/)| rabbitmq.dev.sellercube.com| 192.168.1.116 | RabbitMQ
[Harbor](http://harbor.dev.sellercube.com/)| harbor.dev.sellercube.com| 192.168.1.116:50080 | 内部开发Docker镜像仓库
[Fabric8](http://fabric8.default.f8.banggood.cn)| *.default.f8.banggood.cn| 192.168.1.151 | 微服务集成开发平台

#### 未标明端口号的请直接使用DNS解析到IP地址，不使用反向代理！！
未完待续