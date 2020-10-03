---
layout: default
title: OA研发中心技术栈
---

### OA研发中心技术栈

框架 | 描述
- | -
[Java9新特性](https://www.ibm.com/developerworks/cn/java/the-new-features-of-Java-9/index.html)|
[Jhipster](https://www.jhipster.tech/)|开源JAVA微服务项目生成工具，同类：[CUBA](https://www.cuba-platform.com/)
[Pinpoint](https://skyao.io/learning-pinpoint/)|APM,JAVA开发的免费开源性能监控工具,[对接文档](http://192.168.1.122:3000/architecture/Wiki/src/master/pinpoint-user-guide.md),[pinpoint@git](https://github.com/naver/pinpoint),竞品:[zipkin](https://github.com/openzipkin/zipkin),[对比](http://www.tangrui.net/2016/zipkin-vs-pinpoint.html),[Google Dapper论文](http://bigbully.github.io/Dapper-translation/),[openapm](https://openapm.io/)
[kotlin](http://kotlinlang.org/)| 编码比JAVA语言要高效，语法糖比较多，[kotlin中文](http://www.kotlindoc.cn/),[Android示例项目](https://github.com/antoniolg/Kotlin-for-Android-Developers)
[Spring Boot](http://projects.spring.io/spring-boot/)|从配置中解脱的Spring框架，ASP.NET跨界神器
[Spring Cloud](http://projects.spring.io/spring-cloud)|【无K8S环境才用此方案】微服务框架，服务注册，发现，配置，网关，断路器，负载均衡，restful RPC等
[Mybatis](https://github.com/mybatis/mybatis-3)|轻量灵活的ORM,[文档](http://www.mybatis.org/mybatis-3/zh/getting-started.html)
[Vert.X](http://vertx.io/)|JVM版的NodeJS，事件驱动架构(EDA)，Erlang/Akka之后的新选择，JSON消息支持多语言,竞品:[Spring Reactor](http://projectreactor.io/)
[Mockito](http://site.mockito.org/)|Mock库，基础组件或者其它随时间变动很小的代码需增加单元测试！[文档](https://www.tutorialspoint.com/mockito/index.htm)
[RxJava](https://github.com/ReactiveX/RxJava)|[RX系列](http://reactivex.io/)的JAVA版本,通过使用可观察序列来编写异步和基于事件的库
[Netty](https://netty.io/)|【JBoss】异步、事件驱动的网络应用程序框架和工具,响应式编程主流框架
[StateMachine](https://projects.spring.io/spring-statemachine/)| 视觉编程（游戏、前端）主流思想，有限状态自动机(FSM)，少写if/else，多抽象状态，科学编码
[Spring-webflow](https://projects.spring.io/spring-webflow/)|【部分场景】经典WEB页面状态框架，XML灵活配置，典型场景如：购物车
[Guava](https://github.com/google/guava)|Google 核心的 Java 常用库,集合操作推荐Java 8 Stream
[Apache Commons](https://commons.apache.org/)|很多通用库都在这里找得到,比如对象池
[Gravitee网关](https://gravitee.io/)|[Github](https://github.com/gravitee-io) / [文档](https://docs.gravitee.io/) ，API网关，认证，数据转换，统计分析，订阅计划，负载均衡等
[Mycat](https://github.com/MyCATApache/Mycat-Server)|分表分库数据库中间件
[TiDB](https://www.pingcap.com/)|国产开源分布式数据库，MySQL兼容
[Greenplum](https://github.com/greenplum-db/gpdb)| 基于PostgreSQL经典分布式数据库，主要用于OLAP
[Druid](https://github.com/alibaba/druid/)|（阿里）为监控而生的数据库连接池！
[mesos](http://mesos.apache.org/)|抽象数据中心硬件资源，用于构建弹性分布式系统 [文档](http://mesos.mydoc.io/),[DCOS(数据中心OS)](https://dcos.io/)
[thrift](http://thrift.apache.org/docs/idl)|（Facebook）高性能RPC框架,[Dubbo](https://dubbo.incubator.apache.org/)，部分场景使用dubbo
[RabbitMQ](http://www.rabbitmq.com/documentation.html)|功能强大，高性能，分布式消息队列
[Kafka](http://kafka.apache.org/)|高吞吐分布式消息队列
[Pulsar](https://pulsar.apache.org/)|【雅虎】带有轻量级流计算的MQ，[文档](https://pulsar.apache.org/docs/en/standalone/)
[Zookeeper](http://zookeeper.apache.org/)|集群管理，选举，配置，名称服务，分布式锁等
[CAS](https://github.com/apereo/cas)|著名单点登录（SSO）产品，广泛用于大学、医院、政府、企业,[案例搜索](https://www.baidu.com/s?wd=inurl%3Acas%2Flogin)，竞品：[lemonldap](https://lemonldap-ng.org/documentation/2.0/start),[shibboleth](https://www.shibboleth.net/),[keycloak](https://www.keycloak.org/)
[Shiro](https://github.com/apache/shiro)|认证授权框架
[Akka](http://akka.io/)|JVM版Erlang，Actors模型，基于消息传递的高并发/计算密集处理框架,现推荐使用[Vert.X](http://vertx.io/)
[Swagger](https://github.com/swagger-api/swagger-ui)|Restful接口文档，[codegen](https://github.com/swagger-api/swagger-codegen)能自动生成客户端代理
[RAP](https://github.com/thx/RAP)|（阿里）前后端分离模拟数据生成神器，mockjs
[Docker](https://github.com/docker/docker)|轻量“虚拟机”，应用容器，开发测试部署一致体验,[文档](http://wiki.jikexueyuan.com/project/docker-technology-and-combat/)
[Harbor](http://vmware.github.io/harbor/)|企业级Docker私服，可选[Distribution](https://github.com/docker/distribution)
[Kubernetes](https://github.com/kubernetes/kubernetes)|容器编排，docker管理工具，[中文文档](http://docs.kubernetes.org.cn/),[Rancher](https://www.cnrancher.com/rancher/),[Rancher文档](https://rancher.com/docs/rancher/v2.x/en/)
[Fabric8](https://fabric8.io/)|Jenkins+K8S+微服务开源集成开发平台,国产竞品:[Choerodon猪齿鱼(汉得开源)](http://choerodon.io)、[Rainbond(云帮)](https://www.rainbond.com/)、[Argo](https://argoproj.github.io/argo)
[Otter](https://github.com/alibaba/otter)|（阿里）【异地多活】mysql/oracle多主同步中间件
[OpenResty](https://openresty.org/cn/getting-started.html)|通过 Lua 扩展 NGINX 实现的可伸缩的 Web 平台
[Tengine](https://github.com/alibaba/tengine)|[推荐OpenResty] [阿里]比nginx多了些功能，高性能web服务器[文档](http://tengine.taobao.org/book/)
[Ignite](https://ignite.apache.org/)|分布式数据库缓存，不仅有KV存储，而且有SQL，计算功能,[中文文档](https://www.zybuluo.com/liyuj/note/230739)
[ELK](https://www.elastic.co/webinars/introduction-elk-stack)|日志分析平台，[Elasticsearch](https://github.com/elastic/elasticsearch)，[Logstash](https://github.com/elastic/logstash)，[Kibana](https://github.com/elastic/kibana),gork正则,[搭建](https://my.oschina.net/itblog/blog/547250)
[Quartz](http://www.quartz-scheduler.org/)|任务计划，crontab表达式,推荐用国产XXL-JOB
[Activiti](https://www.activiti.org/)|工作流引擎
[Camel](http://camel.apache.org/)|功能强大的开源集成框架,基于企业集成模式（EIP）,竞品:[Apache ServiceMix](http://servicemix.apache.org/),[Spring Integration](),[Mule ESB](https://www.mulesoft.com/cn/platform/soa/mule-esb-open-source-esb),[WSO2 ESB](https://wso2.com/products/enterprise-service-bus/)
[Drools](http://www.drools.org/)|规则引擎 [文档](https://nheron.gitbooks.io/droolsonboarding/content/)，[官方文档](https://www.drools.org/learn/documentation.html)
[Service Mesh(服务网格)](https://zhuanlan.zhihu.com/p/28794062)|[istio](https://github.com/istio/istio)/[istio官网](https://istio.io/) / [istio文档](https://preliminary.istio.io/zh/) / [linkerd](https://github.com/linkerd/linkerd)
[Kettle](https://community.hitachivantara.com/docs/DOC-1009855)|Pentaho经典ETL工具
[Prometheus](https://prometheus.io/)|监控平台+可视化，[Grafana](https://grafana.com/)
[Ambari](https://ambari.apache.org/)| 【推荐】大数据栈快速搭建工具  [hortonworks发行版](https://zh.hortonworks.com/apache/ambari/)，[文章](http://www.infoq.com/cn/articles/ambari-hadoop-game-data-cluster-practice)
[Apache Druid](http://druid.io/docs/latest/design/)|[文档](http://druid.io/docs/latest/design/)存储，查询和分析大型事件流,[Superset](https://github.com/apache/incubator-superset)|
[Azkaban](https://azkaban.github.io/)|Linkedin开源的工作流调度系统，同类：[Oozie](http://oozie.apache.org/) , [Airbnb Airflow](https://airflow.apache.org/concepts.html)
[Huginn](https://github.com/huginn/huginn)|IFTTT,竞品：[zapier](https://zapier.com/),[Microsoft Flow](https://flow.microsoft.com/),[更多...](https://alternativeto.net/software/zapier/)
iPaaS|集成平台即服务,[cenit](https://github.com/cenit-io/cenit),[cenit官网](https://www.cenitsaas.com/),[skyvia](https://app.skyvia.com/),[panoply](https://platform.panoply.io),[workato](https://www.workato.com/)

未完待续，持续更新