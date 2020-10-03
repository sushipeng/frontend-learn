---
layout: default
title: 专业基础知识
---

以下内容持续补充

### JAVA

概念 | 描述
- | -
[Servlet](https://zh.wikipedia.org/wiki/Java_Servlet)|JAVA Web基石，3.0添加异步支持，3.1引入非阻塞IO，4支持http2,Reactive已逐步走向[Netty](https://netty.io/)
泛型擦除|为了在字节码上保持与旧代码的兼容，编译后泛型类型会被擦除
垃圾回收机制| 引用计数，[分代垃圾回收策略](http://www.cnblogs.com/mingziday/p/4967337.html)，强引用、软引用、弱引用、虚引用
伪共享(False Sharing)|非java特有问题，假设两个线程各自修改a和b变量，本来看起来没事，但是a和b如果加载到同一缓存行里，则造成了伪共享，引发资源抢占，降低并发性。
对象池|[探索对象池技术](http://kriszhang.com/object-pool/),复杂对象创建是有成本的，最好的办法是预热一些对象放到池中，有借有还



### 操作系统 & 组成原理

概念 | 描述
- | -
层次化存储体系|寄存器，高速缓存，主存，辅存，海量存储..
局部性理论|和缓存有关，指空间局部性和时间局部性，（时）即某指令执行后再次被执行的概率大，（空）内存某地址被访问后，相邻的区域访问概率大，由于该理论支撑，才有高速缓存的存在价值
用户态/内核态|用户态即上层应用程序的活动空间,内核态即操作系统的活动空间，操作系统为了支持多应用程序，将硬件资源抽象之后提供给应用程序使用，实现应用程序间资源隔离，避免崩溃蔓延到OS，这里相关的主要是**内核对象**，**线程同步之内核对象同步**，**线程同步之用户态对象同步等**。
内存管理机制|操作系统为减小内存碎片，提高内存利用率,给物理内存做一层抽象,叫内存虚拟化，一般按段页式（段式与页式结合）管理. [操作系统内存管理](http://blog.csdn.net/hguisu/article/details/5713164)
进程/线程|进程有独立的地址空间，线程没有单独的地址空间，线程是程序执行的最小单元，多线程涉及到资源争夺，相关的有银行家算法
纤程(Fiber)/协程（coroutine）|纤程是windows中的概念，协程是linux中的概念，都是**用户态**下的轻量级类似线程的东西
内存映射文件|巧妙的利用了内存虚拟化机制实现大文件的操作，通过创建一个文件的内存视图,取消了将文件数据加载到内存、数据从内存到文件的回写以及释放内存块等步骤。

### 数据结构与算法

概念 | 描述
- | -
算法思想|[几种算法思想](http://blog.csdn.net/wcyoot/article/details/6556088), 递归，迭代，分治，回溯，贪心，动态规划等
哈夫曼编码|一种编码方式,将短编码给出现次数最多的字符,可用于无损压缩,现实中压缩多用字典压缩（LZW压缩法）
平衡二叉树（AVL树）|为了避免树退化成链（查找时只能盲扫，复杂度趋近线性），需要将树平衡处理。
平衡算法|比较常见的是红黑树算法
哈希|也称数据指纹，哈希算法将任意长度的二进制值映射为较短的固定长度的二进制值，这个小的二进制值称为哈希值，涉及到哈希碰撞处理，[一致性哈希](http://www.cnblogs.com/lpfuture/p/5796398.html)，[分布式哈希(DHT)](http://www.cnblogs.com/hapjin/p/5760463.html)

### NOSQL

概念 | 描述
- | -
倒排索引|

### 数据库原理

概念 | 描述
- | -
范式|1NF,2NF,3NF
事务隔离级别|Serializable (串行化)，Repeatable read (可重复读)，Read committed (读已提交)，Read uncommitted (读未提交)
索引|聚簇索引和非聚簇索引

### 计算机网络

概念 | 描述
- | -
TCP握手及断开|3次握手链接与4次断开握手
socket通信过程| 主要步骤：create,bind,listen,accept


### 编译原理

概念 | 描述
- | -
编译器前端|词法分析（重要知识点：正则表达式，DFA,NFA），语法分析(知识点：抽象语法树)
语言开发过程|自举，用低级语言写更高级的语言，再用高级语言写更高级的语言。
[LLVM](https://llvm.org/)|编译器框架
[Antlr](http://www.antlr.org/)|语法树分析工具,可用于自创DSL(领域定义语言) ，[g4语法库](https://github.com/antlr/grammars-v4)
其它工具|[yacc](http://dinosaur.compilertools.net/yacc/), [lex](http://dinosaur.compilertools.net/)
语法高亮|[Ace editor](https://ace.c9.io/#nav=about),[codemirror](https://codemirror.net/),[vs code语法着色](https://code.visualstudio.com/docs/extensions/themes-snippets-colorizers)
语法分析|[esprima](http://esprima.org/),[Rappid](http://resources.jointjs.com/demos/javascript-ast)

### 面向对象与设计模式

概念 | 描述
- | -
面向对象设计原则（SOLID）|单一职责，开闭原则，里式代换，依赖倒置，接口分离
