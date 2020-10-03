---
layout: default
title: 架构要求
---

### 关于JAVA项目的若干要求

1. 必须使用Spring Boot+Spring Cloud(可选)+Mybatis框架进行开发

2. api形式一定是restful形式，请参考[Richardson成熟度模型](http://blog.csdn.net/dm_vincent/article/details/51341037),建议在`Level 1`及以上，api必须使用Swagger文档化。

3. 数据库连接池必须为阿里巴巴的`Druid`。

4. 数据库设计时，必须考虑ER模型分片，使用`mycat`分片，要求500万行以上数据表必须分片，数据库物理节点必须2个或以上，多数情况下用哈希分片规则。

5. 数据库查询尽量考虑`去join`，前端考虑懒加载，多次查询来降低单条sql语句的复杂性。

6. 数据库主键不得使用自增，应该使用`snowflake`[算法](http://www.cnblogs.com/relucent/p/4955340.html)生成long型id。

7. 实体需使用`lombok`的`@Getter`和`@Setter`注解对get、set方法进行简化。

8. 项目需引入[silk-webapi.jar](http://192.168.1.122:3000/architecture/silk/src/master/silk-webapi)，其中提供了对[控制器校验注解](http://192.168.1.122:3000/architecture/silk/src/master/silk-webapi/docs/framework-c-valid.md)的支持，对[返回数据](http://192.168.1.122:3000/architecture/silk/src/master/silk-webapi/docs/framework-c-wrapper.md)进行自动封装。

9. 项目需接入[监控平台](http://192.168.1.122:3000/architecture/silk/src/master/silk-monitor)，方便运维人员对程序进行可视化监控。

10. 接口必须发布在[网关](http://gateway.sellercube.com)上,相关路径规范请查阅网关使用说明！

11. 系统预留使用k8s作为容器编排工具，环境变量默认使用k8s-configmap进行配置，结构大体为 `k8s-configmap-->docker-ENV-->java-spring配置` 的传递关系。

12. 所有AJAX请求必要添加`X-Requested-With:XMLHttpRequest`,用于服务端识别ajax请求，如果服务端识别为AJAX请求，则**不能**在302响应中包含`Location`头，应该用`X-Location`代替。
```
//jquery全局配置
$.ajaxSetup({beforeSend:function(xhr){xhr.setRequestHeader('X-Requested-With','XMLHttpRequest');}});
```

13. 全站https,保障传输安全,所有包含身份信息的cookie**必须标记Secure和HttpOnly**！

14. 用户密码设计三个字段，`密文`,`盐`,`算法`，哈希算法默认选择`BCrypt`算法。

15. 对ERP生态的所有系统均需要在网站根目录添加robots.txt，禁止任何搜索引擎收录。
```
User-agent: * 
Disallow: /
```
16. 前后端分离的项目，凡是系统受众在国内的，前端部署在广州，后端按需部署（如广告平台前端在广州，后端在美国）

17. 所有新项目推荐使用DDD(领域驱动设计),参考著名开源项目[Broadleaf(java)](https://github.com/BroadleafCommerce/BroadleafCommerce) / [NOP(.net)](https://github.com/nopSolutions/nopCommerce) / [ABP(.net)](https://github.com/aspnetboilerplate/aspnetboilerplate)

18. 在发送HTTPS请求时，需优先使用**TLS1.2** (JDK8默认，[.NET看此处](http://www.senra.me/problem-dotnet-application-cannot-access-website-using-tls12-only/)，.NET4.6默认tls1.2,而4.5非默认，需显示指定)

19. 从ERP跳出的URL，如果是第三方销售平台的地址，**强烈建议**在该页面上加上`<meta name="referrer" content="never"/>`,防止被平台利用referrer做关联！！(理论上是可行的，该处理只是尽量规避风险)

20. 项目版本推荐遵守[语义化版本控制规范](https://semver.org/lang/zh-CN/)

21. 简体中文的网页，html标签声明为 `<html lang="zh-cmn-Hans" ...`,否则谷歌浏览器会自动弹出翻译提示。

22. 对于全站https的网站，建议加上HSTS(HTTP Strict Transport Security)响应头，参考[这里](http://mobile.51cto.com/hot-541687.htm)

### 插件化架构设计

	容器: 一个应用程序平台,上面可以安装插件,比如里面有app store/ 插件商店 等.
	
	插件: 针对指定应用程序平台开发的,可独立分发的程序包,如jar,war,dll等
	

容器需要在各业务阶段暴露一些`领域事件`,事件中包含事件发生的`上下文对象`.

插件可以通过创建`钩子`,来监听处理来自容器的事件,决定如何处理并返回.

### 事件总线(EventBus)

**使用事件总线的场景按应用边界可分为【应用内事件总线】，【系统间事件总线】**

【应用内事件总线】单机程序使用事件总线好处:

	可以更容易的扩展业务,不至于让单机程序变得很乱,可以做插件式扩展,插件只需要设置一些勾子(hook)即可监控业务对象的生命周期 ,从而决定干什么. 
	可以做到单机程序里面放置一个 插件商店.
	
*比如：产品在新增的时候在应用内使用`EventBus.Publish(product)`发布一个消息，将来某一天，我们需要用 ES建索引，就可以`EventBus.Subscribe(product,createIndexHandler)`,实现非侵入式扩展。*

【系统间事件(消息)总线】系统之间使用事件总线好处

	系统之间耦合度比较低
	【未雨绸缪】事件生产者无法预知将来可能的业务场景,唯有默默的将自己业务实体的事件推送出去.
	【】事件消费者使用相对低的沟通成本完成对另一系统的对接.

**(应用内)事件总线分类**

类型|描述|实现原理|示例
-|-
同步总线|发布事件后，多个订阅者阻塞处理过程|在publish方法内循环订阅者列表，调用Handle方法|
异步总线|发布事件后，订阅者异步处理，不阻塞当前程序流|发布消息只是将消息持久化到某个存储（MQ，数据库...）,调度器通过定时任务方式获取消息并解析，反射去调用Handle方法|[Orchard EventBus](https://github.com/OrchardCMS/Orchard/blob/dev/src/Orchard/Events/DefaultOrchardEventBus.cs)

**关于DDD领域事件**

在DDD设计的系统中，可以发布-订阅领域事件（Domain Event）

**Spring中ApplicationEvent的使用**

[Spring 事件(Application Event)](https://www.cnblogs.com/xubiao/p/9052440.html)

```
applicationContext.publishEvent(someEvent);
```

### 关于事务

[Saga分布式事务解决方案与实践](http://servicecomb.apache.org/cn/docs/distributed-transactions-saga-implementation/)

**内刚外柔**原则：微服务内使用通过数据库事务保证强一致，微服务间最终一致

刚性事务（ACID/原子，一致，隔离，持久性）：
- 数据库事务

柔性事务(BASE/基本可用，柔性状态，最终一致)：
- 基于可靠消息的最终一致性方案
- TCC,[柔性事务 ：TCC两阶段补偿型](http://www.tianshouzhi.com/api/tutorials/distributed_transaction/388)
- Saga,[Choerodon猪齿鱼平台中的微服务数据一致性解决方案](https://mp.weixin.qq.com/s?__biz=MzU4OTQ3NTQ0OQ==&mid=2247483880&idx=1&sn=f6f94cf64f0e91f460325011f5c8f152&chksm=fdcdbafecaba33e80b22e062724a3775ad3f9349c0503fc2241ba9df5c798e207bfd2305d98f&scene=0#rd)
- [阿里Fescar](https://mp.weixin.qq.com/s/TFGRcHV6EgeLB45OEJPRXw)

### 未完待续

### HAProxy健康检查

```
#以gravitee网关作为后端举例
backend backend1
	balance     roundrobin
	option httpchk GET /
	http-check expect string No context #这里用内容匹配，只能从body开头匹配
	#http-check expect status 200 #这里用http code匹配
	#http code及body均支持正则匹配
	
	server server_1 203.88.208.19:80 check
```

### 身份设置与获取
使用Spring Security
```java
//设置用户名
SecurityContextHolder.getContext().setAuthentication(new UsernamePasswordAuthenticationToken("这个是用户名",null));

//获取用户名
String userName= SecurityContextHolder.getContext().getAuthentication().getName();

```

### JWT令牌标准(作cookie的场景)

```
HEADER:
{
  "alg": "HS256",
  "typ": "JWT"
}
PAYLOAD:
{
iat:1514560028165,   //颁发时间，unix时间戳，可用此值判断是否过期，在用户活动期间，此值应该递增
sub:"bobo",          //用户名
ip:"47.52.171.37",   //极端情况下JWT从中国拷贝到美国重放，须比对当前请求的IP，CAS包括腾讯全线产品均有此验证
ua:md5("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.108 Safari/537.36")               //浏览器User-Agent的MD5哈希值（32位）,防止cookie拷贝到另一个浏览器，CAS有此策略
}
```
**1.JWT作为cookie时，必须设置Secure和HttpOnly为true! **

[JWT在线校验](https://jwt.io/#debugger) 、[在线生成JWT](http://jwtbuilder.jamiekurtz.com/) 、[jjwt工具包](https://github.com/jwtk/jjwt)

### CSRF 防范

	必须在DOM中生成一个随机数(csrf-token)，每次表单提交时都需要传回服务器！因为跨域无法取DOM元素,杜绝了CSRF攻击，注意此值一定不能！不能！不能！设置在cookie里面！！cookie在提交的时候会自动带上，那样将毫无意义！！

### REST成熟度说明

[REST成熟度](http://blog.csdn.net/dm_vincent/article/details/51341037)

1.HTTP动词只能使用**GET/POST**，不得使用这两个之外的动词，如`PUT/DELETE`。

2.GET方式传参一律以**QueryString**方式传递，即`?key=value&key2=value2`,不得使用`/{name}/{age}`这种形式。

3.POST传参**优先使用JSON格式**

```
注意：Get请求和Post请求参数禁止混用，即Post请求禁止使用Get方式的参数——http://demo.banggood.cn/user?type=banggood
```

### 版本推荐
* JDK 1.8.x
* Docker 17.x-ce
* Mysql 5.7
* K8s 1.7

### 审计字段说明

字段 |数据库类型| 描述
- | -| -
UserId|bigint|当前请求的用户id
TenantId（暂不考虑）|bigint|租户Id（多租户场景下）
ImpersonatorUserId（暂不考虑）|bigint|模拟用户Id(在Mock测试场景下)
ImpersonatorTenantId（暂不考虑）|bigint|模拟租户Id（在Mock测试场景下）
ServiceName|varchar(256)| 服务名称 （完全类型名称，如com.banggood.orderservice）
MethodName |varchar(256)| 方法名称
Parameters |varchar(1024)| 调用方法的参数（一般为json格式）
ExecutionTime |timestamp| 调用开始时间
ExecutionDuration |int| 调用该服务所花费的时间【单位毫秒】
ClientIpAddress  |varchar(64)|客户端Ip地址
ClientName （暂不考虑）|varchar(128)| 客户端电脑名称
BrowserInfo  |varchar(256)| 浏览器UserAgent
CustomData(暂不考虑) |varchar(2000)| 自定义数据
Exception|varchar(2000)| 如果服务异常，该字段保存异常信息

以上审计日志原计划保存到大数据平台，由于大数据方暂未提供，因此需将以上信息保存到关系型数据库！
**该表是复用的，所有业务组共享一个表。**

### 安全审计
	系统重要操作（如查看供应商资料，查看员工资料）需要鉴权且记录审计日志
### 性能审计
	有可能出现性能问题的代码段（如网络请求，大SQL操作）需要前后埋点，记录执行消耗时间

### JAVA应用监控
	Spring Boot支持Http(Actuator),JMX,SSH三种手段对应用监控,但是Http只读有局限性,
	如果我们需要自定义监控,则需要用好JMX!!!
	可以通过 Spring 提供的 @ManagedResource、@ManagedAttribute 和 @ManagedOperation 注解来创建应用自己的 mbean

### 行为审计
	重要业务操作，原则上需要记录【时间】、【地点/IP】、【人物】、【行为】
### 定时任务xxl-job
	JAVA定时任务从2017.12起需统一加入到xxl-job
[广州调度中心](https://paas.banggood.cn/xxl-job-admin/)  （admin/123456）
[使用说明](http://192.168.1.122:3000/architecture/Wiki/src/master/distributed-job/xxl-job-task-simple.md)

### 数据库建表说明

按照上峰严厉指示，考虑长远应用，建表时必须考虑以下审计字段(或**同等语义**)：

字段(MSSQL)|MySQL|备注
-|-|-
CreatorUserId|creator_uid|创建人ID
CreationTime|creation_time（`DEFAULT CURRENT_TIMESTAMP`）|创建时间
LastModificationTime|last_modification_time（`DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`）|最后修改时间，可用于`乐观锁`,针对并发修改的情况，每次update时需检查版本是否和修改前版本一致
LastModifierUserId|last_modifier_uid|最后修改人ID
DeleterUserId|deleter_uid|【软删除时必选】删除人ID
DeletionTime|deletion_time|【软删除时必选】删除时间
IsDeleted|is_deleted|【软删除时必选】软删除,重要实体都需要

*ps:软删除针对的是重要实体，并不是所有表都要支持！*

##### 以下为DBA给出的示例建表语句

```SQL
CREATE TABLE `css_mail_send_attachment` (
  `mail_send_attachment_id` VARCHAR(50) NOT NULL COMMENT '发件附件主键',
  `mail_send_id` VARCHAR(50) NOT NULL COMMENT '发件箱主键',
  `attachment_name` VARCHAR(100) NOT NULL COMMENT '附件名',
  `attachment_path` VARCHAR(300) NOT NULL COMMENT '附件路径',
  `create_date` DATETIME NOT NULL  COMMENT '创建时间' DEFAULT CURRENT_TIMESTAMP,
  `create_user_id` VARCHAR(50) NOT NULL COMMENT '创建人',
  `modify_date` DATETIME NOT NULL  COMMENT '修改时间'  DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `modify_user_id` VARCHAR(50) NOT NULL COMMENT '修改人',
  `delete_date` DATETIME DEFAULT NULL COMMENT '删除时间',
  `delete_user_id` VARCHAR(50) DEFAULT '' COMMENT '删除人',
  `is_deleted` BIT(1) NOT NULL DEFAULT b'0' COMMENT '是否删除',
  PRIMARY KEY (`mail_send_attachment_id`),
  KEY `ix_mail_send_attachment_mail_send_id_is_deleted` (`mail_send_id`,`is_deleted`) ) ENGINE=INNODB DEFAULT CHARSET=utf8 COMMENT='发件附件表[订单客服—陈均华]';
```
	
## API返回结果标准化

参见[研发中心接口对接规范](http://hello.banggood.cn/docs/mq-field-spec.html) `http://hello.banggood.cn/docs/mq-field-spec.html`

### 实现

- Java实现基于架构的silk, http://192.168.1.122:3000/architecture/silk/src/master/silk-webapi/docs/framework-c-wrapper.md
- .Net需要自己实现统一方法


### Spring Boot注意事项
#### 使用Tomcat的LegacyCookieProcessor
[本项文档出处](https://docs.spring.io/spring-boot/docs/current/reference/html/howto-embedded-servlet-containers.html)
Spring Boot使用的内嵌Tomcat不能开箱即用的支持Version 0的Cookie格式，你可能会看到以下错误：

	java.lang.IllegalArgumentException: An invalid character [32] was present in the Cookie value
可以的话，你需要考虑将代码升级，只存储符合以后Cookie规范的值。如果不能改变写入的`cookie`，你可以配置Tomcat使用`LegacyCookieProcessor`。通过向`EmbeddedServletContainerCustomizer bean`添加一个`TomcatContextCustomizer`可以开启`LegacyCookieProcessor`：
```java
@Bean
public EmbeddedServletContainerCustomizer cookieProcessorCustomizer() {
    return new EmbeddedServletContainerCustomizer() {

        @Override
        public void customize(ConfigurableEmbeddedServletContainer container) {
            if (container instanceof TomcatEmbeddedServletContainerFactory) {
                ((TomcatEmbeddedServletContainerFactory) container)
                        .addContextCustomizers(new TomcatContextCustomizer() {

                    @Override
                    public void customize(Context context) {
                        context.setCookieProcessor(new LegacyCookieProcessor());
                    }

                });
            }
        }

    };
}
```