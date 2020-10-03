#JAVA编码规范

##一、编程规约

###(一)目录规约

```
 |——project/java
 |    |——bean
 |    |    |——vo --前端显示对象
 |    |    |——entity --数据库表对象
 |    |    |——dto --数据传输对象
 |    |    |——api --接口对象
 |    |——common 
 |    |    |——bean --公共类
 |    |    |——util --工具类
 |    |    |——cache --缓存
 |    |——config --配置文件
 |    |——controller --控制器
 |    |——core --核心公用类
 |    |——exception --统一异常处理
 |    |——filter --过滤器
 |    |——intercepter --日志记录
 |    |——mapper --mapper接口
 |    |——service --业务逻辑接口与实现类
 |    |    |——API 处理接口业务 
 |    |    |——impl 接口实现类
 |    |    |——ScheduledTask 定时任务
 |    
 |——project/resource
 |    |——mapper --mybatis xml文件
 |    |——sql --数据库对应版本sql文件
 |    |——static （前端页面）
 |    |    |——css 
 |    |    |——html
 |    |    |——img
 |    |    |——js

```

###(二)接口规约

###### 使用工具

- swagger ui

###### 文档路径
    
    http://(项目路径)//swagger-ui.html

###### 请求参数代码

```java
@Api(value = "user", description = "用户模块")
@RestController
@RequestMapping("/user")
public class UserController {
    
    @ApiOperation(value = "获得用户列表", notes = "列表信息", httpMethod = "POST", produces = MediaType.APPLICATION_JSON_VALUE)
    @ApiImplicitParams({
                @ApiImplicitParam(name = "param1", value = "参数1", required = true, dataType = "Long"),
                @ApiImplicitParam(name = "param2", value = "参数2", required = true, dataType = "String"),
        })
        @ApiResponses(value = {
                @ApiResponse(code = 200, message = "成功", response = User.class)
        })
    @RequestMapping(value = "list", method = RequestMethod.POST)
    public List<User> list(Long param1, String param2) {
        List<User> users = getUserList();
        return users;
    }
}
```
###### 响应参数代码

```java
    @ApiModel(value = "user", description = "用户对象")
    public class User {
    
        @ApiModelProperty(value = "用户名", required = true)
        private String name;
        
        @ApiModelProperty(value = "性别")
        private Integer sex;
        
    }
```

###(三)命名规约

###### 包命名

- 包命名采用全小写命名
- 通过唯一域名+组件来命名(通常为 com.banggood.***)

######  类命名

- 类命名采用Pascal命名法
- 大写字母开头，各个单词首字母大写

###### 方法命名

- 方法命名采用Camel命名法
- 小写字母开头，各个单词首字母大写
- 方法名的第一个单词应是动词
- 属性的getter和setter方法尽量使用自动生成，或者使用lombok插件

###### 变量命名

- 采用Camel命名法
- 小写字母开头，各个单词首字母大写

###### 常量命名

- 采用全大写命名法，使用下划线分隔
- 禁止所有常量存放于同一个类，必须归类进行存放

###### 静态资源文件命名

- 采用全小写命名法
- 所有的字母均小写，单词之间以下划线’_’分隔

###(四)格式规约

###### 大括号的使用约定：
描述：
```
左大括号前不换行。

左大括号后换行。

右大括号前换行。

右大括号后还有 else 等代码则不换行；表示终止右大括号后必须换行。
```
例子：
```java
public class Hello {
    
    public static void main(String args []) {
        if(args.length > 0 ) {
            System.out.println("args error!");       
        } else {
            System.out.println("args is " + args[0]);
        }
    }
    
}
```
###### 方法参数在定义和传入时，多个参数逗号后边必须加空格：
```
    method("a", "b", "c");
```
###### 任何运算符左右必须加一个空格
例子：
```
    int a = 1;
    int b = 2;
    int c = a + b;    
```
###(五)框架规范

###### Service/Mapper方法命名约定
```

获取单个对象的方法用get做前缀

获取多个对象的方法用list做前缀

获取统计值的方法用count做前缀

插入的方法用save做前缀

删除的方法用remove做前缀

修改的方法用update做前缀

```
######领域模型命名规约
```

数据对象：xxxDO，xxx 即为数据表名

数据传输对象：xxxDTO，xxx 为业务领域相关的名称

展示对象：xxxVO，xxx 一般为网页名称

POJO 是 DO/DTO/BO/VO 的统称，禁止命名成 xxxPOJO

```
######接口和实现类的命名有两套规则
规则1：

```
对于 Service 和 Mapper 类，基于 SOA 的理念，暴露出来的服务一定是接口，内部的实现类用 Impl 的后缀与接口区别
正例：CacheServiceImpl 实现 CacheService 接口。
```
规则2：
```
如果是形容能力的接口名称，取对应的形容词做接口名（通常是–able 的形式）
正例：AbstractTranslator 实现 Translatable。
```

###(六)注释规约

###### 格式
统一使用中文进行注释，`严禁掺杂`使用，如下：
```java
class User { 
    
    /**
    *  中文描述
    */
    private String name;
    
    /**
    * English description
    */
    private String pwd;
    
}

```

###### 类注释

在`每个类`前面`必须`加上类注释，注释模板如下：
```

/**
*  Created by 开发者名 on 时间.
*
*  类描述信息
*/
```
###### 属性注释

在`每个属性`前面`必须`加上属性注释，注释模板如下：
```
/**
*  字段描述信息
*/
private String strMsg;
```
###### 方法注释

在`关键方法`前面`必须`加上方法注释，注释模板如下：

```
/**
* 类方法的详细使用说明
*
* @param  参数1 参数1的使用说明
* @return 返回结果的说明
* @author 作者 日期(2017/06/03)
* @throws 异常类型.错误代码 注明从此类方法中抛出异常的说明
*/
```
###### 旧代码注释（禁止）
```
    严禁对旧代码进行注释，假如怕丢失，可以选择提交到GIT；
```
 
###(七)协作规约

#### 分支的使用(GIT)

###### 分支类型:
```
master、develop、个人分支；
```
###### master分支
```
稳定分支，仅用于发布新版本，平时不能在上面干活；
```
###### develop分支
```
不稳定分支，发布版本的时，需要将代码合并到master分支；
如1.0版本发布时，把develop分支合并到master上，在master分支发布1.0版本；
```
###### develop独立子分支
```
开发独立功能，需要在develop创建自己的分支，任务结束之后，将develop子分支合并到develop分支
```
###### 生产环境版本管理
```
发布新版本，需要打新版本在TAG上面；
如v1.1.0(大版本.小版本.修复版本)
```
###### 创建分支:
```
必须使用纯小写命名新分支（防止Idea的GIT插件提交BUG）
```
###### 参考下图
![](http://www.liaoxuefeng.com/files/attachments/001384909239390d355eb07d9d64305b6322aaf4edac1e3000/0)
合并策略

`--no-ff`：不使用fast-forward方式合并，保留分支的commit历史；
`--squash`：使用squash方式合并，把多次分支commit历史压缩为一次。主要在master分支和develop分支使用

#### 提交信息格式要求(GIT)

```
<type>(<scope>): <subject>// 空一行<body>
```
###### type
```
*   Feat：新功能（feature）
*   Fix：修补bug
*   Update：功能上改动
*   Refactor：重构（即不是新增功能，也不是修改bug的代码变动）
*   Merge：增加测试
```
###### subject
```
commit 目的的简短描述，不超过50个字符。
*   以动词开头
*   结尾不加句号（`.`）
```
###### body
```
body部分是对本次 commit 的详细描述，可以分成多行。
描述参照：其是什么及为什么这么做，不用怎么做。
```

###(八)其它

- Java文件不能出现SQL语句，禁止使用SQL拼接
- 数据库链接必须使用Druid
- Java文件不能出现System.out.println语句
- 关键流程必须有日志可追踪（日志格式待整理）
- 事务规范（待整理）