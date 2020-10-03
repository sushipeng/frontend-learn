## OA研发中心规范汇编

#### 需求阶段

*由**黎宗耀**及**李静**补充及解释*

参考[OA研发中心图标](http://192.168.1.102:801/demo/icons/)

#### 设计阶段

参考[架构要求](http://hello.banggood.cn/docs/Arch-claim.html) , [设计模式](http://hello.banggood.cn/docs/design-pattern.html)及[DDD(领域驱动设计)](http://hello.banggood.cn/docs/ddd.html)，强调使用**领域模型**分析及描述业务

#### 开发阶段

**版本控制**

参考[分支管理说明](http://hello.banggood.cn/docs/branch-introduction.html)，每人每功能(需求)一分支，分支定义，合并流程

**文档规范**

参考[文档规范](http://hello.banggood.cn/docs/dev-law.html)，提供**readme.md**参考模板

**框架选型**

平台|选型
-|-
JAVA| 参考[JAVA技术栈](http://hello.banggood.cn/docs/java-stack.html)
.NET|.net core、.net framework 4.5+
WEB前端|Angular为主，其次Vue，参考[angular项目规范](http://hello.banggood.cn/docs/angular/)

**编码规范**

平台|规范
-|-
JAVA|参考[《阿里巴巴Java开发手册》](https://yq.aliyun.com/articles/69327) ，[IDEA插件下载](https://github.com/alibaba/p3c?spm=a2c4e.11153940.blogcont69327.9.49d74b629UnAmV)
.NET|照旧

**接口规范**

参考[消息队列与接口规范](http://hello.banggood.cn/docs/mq-field-spec.html)，主要约束了消息队列命名，接口返回格式

**安全措施**

*由安全工程师**张道圆**定义及维护*

等级|案例
-|-
A|内部系统匿名访问
B|非公开功能未授权访问
C|数据库(未限制)允许远程连接，SQL注入 ，代码泄露到开源平台
D|XSS,CSRF web相关漏洞
E|内部系统(或信息)被搜索引擎收录（robots.txt）,referrer暴露

**审计措施**

对安全(登录，查看敏感资料)、性能、使用行为(日常操作行为)三个方面审计,[详细](http://hello.banggood.cn/docs/Arch-claim.html)

#### 测试阶段

**提测**

*由**曾祯祥**补充及解释*

#### 上线阶段

**上线**

*由**钱德军**补充及解释*

####日常巡查

*由**李静**及**李凯靖**补充及解释*

1. readme巡查
2. 消息队列命名巡查


