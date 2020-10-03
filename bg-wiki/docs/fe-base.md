---
layout: default
title: 前端基础知识
---

### 前端必备基础

概念 | 描述
- | -
Layout|float,table,grid,flex
CSS定位机制|普通流、浮动和绝对定位
盒子模型(两种区别)            |1.标准盒子，2.怪异（IE）盒子,(IE 盒子模型的 content 部分包含了 border 和 pading)，[标准盒子模型和IE盒子模型](http://blog.csdn.net/zyuzixiao/article/details/18733463)
作用域链(scope chain)|把函数自身的本地变量放在最前面,把自身的父级函数中的变量放在其次,把再高一级函数中的变量放在更后面,以此类推直至全局对象为止.当函数中需要查询一个变量的值的时候,js解释器会去作用域链去查找,从最前面的本地变量中先找,如果没有找到对应的变量,则到下一级的链上找,一旦找到了变量,则不再继续.如果找到最后也没找到需要的变量,则解释器返回undefined.
闭包(closure)|有两种解释，1.任何函数形成一个闭包. 2.嵌套函数闭包效果。,一般来说,一个函数在执行开始的时候,会给其中定义的变量划分内存空间保存,以备后面的语句所用,等到函数执行完毕返回了,这些变量就被认为是无用的了.对应的内存空间也就被回收了.下次再执行此函数的时候,所有的变量又回到最初的状态,重新赋值使用.但是如果这个函数内部又嵌套了另一个函数,而这个函数是有可能在外部被调用到的.并且这个内部函数又使用了外部函数的某些变量的话.这种内存回收机制就会出现问题.如果在外部函数返回后,又直接调用了内部函数,那么内部函数就无法读取到他所需要的外部函数中变量的值了.所以js解释器在遇到函数定义的时候,会自动把函数和他可能使用的变量(包括本地变量和父级和祖先级函数的变量(自由变量))一起保存起来.也就是构建一个闭包,这些变量将不会被内存回收器所回收,只有当内部的函数不可能被调用以后(例如被删除了,或者没有了指针),才会销毁这个闭包,而没有任何一个闭包引用的变量才会被下一次内存回收启动时所回收.[经典闭包问题](http://www.cnblogs.com/cabbage/p/4519346.html) [深入理解JS闭包](http://www.cnblogs.com/uedt/archive/2010/10/28/1863389.html)
原型链|[三张图搞懂JS的原型对象与原型链](http://www.cnblogs.com/shuiyi/p/5305435.html)，方法有prototype，对象有\__proto__,JS查找对象属性，先查找对象本身，再从原型链上查找。
构造器|function的prototype中有个constructor，函数原型的构造器等于其本身，对象的构造器等于构造函数
继承实现|[JS继承的实现方式](http://www.cnblogs.com/humin/p/4556820.html), 原型链继承,构造继承,实例继承,拷贝继承,组合继承,寄生组合继承
柯里化(Currying)|把接受多个参数的函数变换成接受一个单一参数（最初函数的第一个参数）的函数，并且返回接受余下的参数而且返回结果的新函数的技术,[浅析 JavaScript 中的 函数 currying 柯里化](http://www.cnblogs.com/zztt/p/4142891.html) , [JS中的柯里化](http://www.zhangxinxu.com/wordpress/2013/02/js-currying/)
call/apply                    |将一个函数的对象上下文从初始的上下文改变为由thisObj指定的新对象,两个方法传参形式不一样，call是参数列表，apply是参数数组，函数会被执行
bind                          |和call/apply有相同作用，不过函数不会被执行，且返回值为修改this之后的函数
eval                          |动态执行JS语块
严格模式                      |[Javascript 严格模式详解](http://www.ruanyifeng.com/blog/2013/01/javascript_strict_mode.html) ,"严格模式"体现了Javascript更合理、更安全、更严谨的发展方向.
argument.caller               |指向调用该函数的函数，如果没有则为空
argument.callee               |指向该函数
防抖/节流                          |[节流和防抖](https://segmentfault.com/a/1190000002764479)，目的是为了减少事件的频度，节约网络资源或者不必要的事件响应。
typeof                        |6种结果，"number," "string," "boolean," "object," "function," 和 "undefined."
valueOf                       |[valueOf()方法](http://www.cnblogs.com/xiaohuochai/p/5560276.html),返回原对象
响应式                        |[响应式编程，是明智的选择](http://www.cnblogs.com/android-blogs/p/5586395.html),与异步数据流交互的编程范式,RX系列
cors（xhr.withCredentials）   |新的跨域方案，默认情况下，跨源请求不提供凭据(cookie、HTTP认证及客户端SSL证明等)。通过将withCredentials属性设置为true，可以指定某个请求应该发送凭据。如果服务器接收带凭据的请求，会用下面的HTTP头部来响应。Access-Control-Allow-Credentials: true ，[使用ajax跨域withCredentials的作用](http://blog.sina.com.cn/s/blog_687e21950101gpoj.html)
xss                           |1.存储型，2.反射型，[持久型/存储型XSS漏洞](http://www.cnblogs.com/edi-kai/p/4939896.html)
csrf                          |[浅谈CSRF攻击方式](http://www.cnblogs.com/hyddd/archive/2009/04/09/1432744.html),攻击者盗用了你的身份，以你的名义发送恶意请求。可以加一个跨域不可读的随机token解决。
cmd /amd/commonjs/umd                      |[AMD, CMD, CommonJS和UMD](https://segmentfault.com/a/1190000004873947),js模块化相关规范
事件阶段（捕获 目标 冒泡）    |[事件冒泡、事件捕获和事件委托](https://www.cnblogs.com/Chen-XiaoJun/p/6210987.html)
css选择规则                   | 交集选择器，(eg:  .a.b),连着写，不要有空格
块级/行级                     |[CSS中的块级元素与行级元素](http://www.cnblogs.com/phoenix-Chen/p/5262650.html)
尾递归优化                    |[JS的递归与TCO尾调用优化](https://segmentfault.com/a/1190000004018047), [尾调用优化](http://www.ruanyifeng.com/blog/2015/04/tail-call.html), 执行尾递归时，程序无须储存之前调用栈的值，直接在最后一次递归中输出函数运算结果，这样就大大节省了内存，而这种优化逻辑就是在代码执行的时候将其转换为循环的形式
重绘/重排|[影响浏览器重绘和重排](http://www.cnblogs.com/yuri2016/p/6542625.html)
正则表达式(DFA/NFA)|[一个由正则表达式引发的血案](http://mp.weixin.qq.com/s/OtVRL37CNt_d5yEJPzzBzg)
抽象语法树(ast)|[ast查看器](http://resources.jointjs.com/demos/javascript-ast)，[Esprima框架](http://esprima.org/)，[JavaScript的语法解析与抽象语法树](http://blog.csdn.net/yulinlin_fei/article/details/46828967)高级语言在编译阶段都会产生抽象语法树,重构代码时有很大帮助
JSONP|创建一个新的script标签，引用其它域下的JS（js和css均可合法跨域，如cdn请求），JS加载到本地后立即执行，一般是执行一个预先在本地设置好的回调函数（jquery可动态生成），将想要的数据通过函数参数传递进来。
