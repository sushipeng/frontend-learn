### 关于DDD(领域驱动设计)

[DDD领域驱动设计基本理论知识总结](https://www.cnblogs.com/netfocus/archive/2011/10/10/2204949.html)

**分层**

层|描述
-|-
表现层（Presentation Layer)|为用户提供一个接口。使用应用程序层实现用户交互。
应用层（Application Layer)|介于表现层和核心层之间。编排业务对象以执行特定的应用程序任务。
核心层（Domain Layer)|包含业务对象及其规则。这是应用程序的核心。
基础设施层（Infrastructure Layer)|为以上三层提供支持，一般使用第三方库

**基本概念**

概念|描述
-|-
组合|人的器官组合成人体
聚合|物以类聚，人以群分，用某种关系聚在一起
聚合根(AggregateRoot)| 该对象下还有多个聚合，所以称为根，比如订单下有多个订单明细
实体(Entity)|现实中可以区分的物体，比如产品，订单都是实体，类中必须有Id（实体唯一标识符）
域事件(Domain Event)|域对象产生的行为(域事件)需要发布到事件总线上（观察者模式）
事件总线(EventBus)| 可发布订阅的总线，有同步和异步之分
域服务(Domain Service)|用于执行域操作和业务规则,有[三个特点](https://aspnetboilerplate.com/Pages/Documents/Domain-Services)
值对象(Value Object)|地址(省市区)是一个经典的值对象，对象所有值相等即为相同，而不是对象引用相等
规范(Specifications)|更多的定义实体可重用的过滤规则
仓储(Repository)|实体持久化的仓库，形象理解为对表的CRUD

**模型成熟度**

**失血模型**：模型仅仅包含数据的定义和getter/setter方法，业务逻辑和应用逻辑都放到服务层中。这种类在Java中叫POJO，在.NET中叫POCO。

**贫血模型**：贫血模型中包含了一些业务逻辑，但不包含依赖持久层的业务逻辑。这部分依赖于持久层的业务逻辑将会放到服务层中。可以看出，贫血模型中的领域对象是不依赖于持久层的。

**充血模型（推荐）**：充血模型中包含了所有的业务逻辑，包括依赖于持久层的业务逻辑。所以，使用充血模型的领域层是依赖于持久层，简单表示就是 UI层->服务层->领域层<->持久层。

**胀血模型**：胀血模型就是把和业务逻辑不想关的其他应用逻辑（如授权、事务等）都放到领域模型中。我感觉胀血模型反而是另外一种的失血模型，因为服务层消失了，领域层干了服务层的事，到头来还是什么都没变。

**DDD开源项目**

项目|描述
-|-
[Axon](http://www.axonframework.org/)|Axon Framework
[ABP](https://aspnetboilerplate.com)|开源.NET DDD脚手架
[NOP](https://github.com/nopSolutions/nopCommerce)|开源.NET商城
[magazine-website](https://github.com/thangchung/magazine-website)|【.NET Core】DDD,CQRS,微服务，docker,.netcore
[isis](https://isis.apache.org/)|【JAVA】apache 快速开发框架
[ddd-parent](http://192.168.1.122:3000/architecture/ddd-parent)|【实现领域驱动设计】书中示例项目

**DDD学习资源**

网站|描述
-|-
[解道-DDD](https://www.jdon.com/ddd.html)|
[解道-ES](https://www.jdon.com/event.html)|事件溯源Event Sourcing
[解道-CQRS](https://www.jdon.com/cqrs.html)|命令查询的责任分离Command Query Responsibility Segregation


