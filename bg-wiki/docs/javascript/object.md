---
layout: default
title: javascript对象
---

## javascript对象、原型链

- object，望文生意，就是物件，物体，它用是拥有属性和方法的存在于内存中的数据；一个对象包含了对象的属性和方法，它们组成了对象

在中文的语境下对象这个词难以理解，估计很多初学编程的人就被它虐过，把它理解为一个物件或许更好理解；

在认识对象前，先来了解一下下面的内容

### javascript数据类型：基本类型／引用类型

null, undefined, boolean, number, string, object, symbol

javascript 变量是没有类型的，变量可以持有任何一种类型；值才有类型；

注意：值null的类型是object，并非null类型 `typeof null` 输出 `"object"`

这算是javascript的一个bug了，明明值是null，判断类型却是object，逗你玩呢？不过这个bug不会被修复了，未来的版本也不会修复它，因为修复它可能会导致很多系统无法运行。


一些有趣的现象：
null既然是一个对象，可是它却没有\__proto__，因为它不是任何一个构造函数构造出来的

`typeof Function` 输出 `"function"`

wtf? 基本类型没有啊，为啥还有function这个类型？

并不是这样，function是object的子对象

｀function(){} instanceof Object｀ 输出 ｀true｀

function是一个'可以调用的'对象，内部属性有\[[call]]，由于该属性的存在，它是一个可以调用的对象，所以它真正的类型应该是一个对象：object，然而，我们实际使用的时候真的只是想知道它是否为一个function

好像typeof没啥大用了，判断一个值是否属于某个类型，有两种都无法准确判断出来，你可能需要写多些一些代码才能实现你的需求，如何判断类型，大家可以自行查找资料，这里不多作展开；


学习完了基本类型的概念，那么对象是什么呢？

刚说了`一个对象包含了对象的属性和方法，它们组成了对象`，组成对象的其实也就是各种基本类型；换句话说，对象其实就是引用类型，引用类型是由基本类型组合而成，如果一个对象的属性也是引用类型，迭代的展开，它仍然会存在基本类型数据；

### 创建对象

上面说到object是一个基本的类型，我们要如何来创建一个对象呢？

```javascript
var o = new Object // 通过构造函数来创建对象
var b = {}  // 通过字面量的形式创建对象
var c = Object.creat(o)
```

它们输出一个空对象`{}`；

如果你传入参数 

`var o = new Object({a:'小红'})`

它输出带有属性的对象`{a:'小红'}`；

在javascript 的世界中，没有类的概念，但是不妨把Object看成类；Object 对象生万物；

可以通过 instanceof，检测出一个对象是哪个类的实例；

`a instanceof Object` 输出： true，表明a是Object的实例；

实例o有一个属性

- 自有属性，a: 小红
- 通过原型链继承得到的属性, \__proto__

**构造函数** 
什么是构造函数？

- 望文生义，它就是一个建造者，它描述了一个类，用这个类来进行构造对象；

看一个例子：

``` javascript
var B = function () {
    this.b = '小明'
}
var b = new B;// {b:"小明"}
```

这就是一个构造函数，并且使用new进行调用，new是javascript的一个操作符，使用它实例化一个对象

`var o = new Object({a:'小红'})`

在这个例子里，Object是存在于全局对象里的构造函数；

它是 Function 类型的实例；`Object instanceof Function`, 输出: true;

刚才不是说Object生万物吗，为何这个Object是Function的实例呢？wtf，你骗我。。。

回到这段的开头，注意这里的 Object 是一个构造函数，而所有的函数都是由全局对象里的Function所构造出来的，用Object构造函数来构造对象；


常用的内建函数：

String, Number, Boolean, Array, Object, Function, RegExp, Date, Error, Symbol

它们往往在js的引擎运行的时候就已经绑定到了全局中，你可以直接使用它们。比如，如果在浏览器中，你可以通过window对象对它们访问

以上这些全是构造函数，你可以用new来创建对应的实例对象



**new 操作符做了什么**

上面的例子都使用了new；这个new做了什么操作呢？

- 创建一个新的对象
- 将函数的 prototype 赋值给对象的 __proto__ 属性
- 将对象作为函数的 this 传进去。如果有 return 出来东西是对象的话就直接返回 return 的内容，没有的话就返回创建的这个对象

```js
function myNew(func){
    var ret = {};
    if (func.prototype !== null) {
        ret.__proto__ = func.prototype;
    }
    var ret1 = func.apply(ret, Array.prototype.slice.call(arguments, 1));
    if ((typeof ret1 === "object" || typeof ret1 === "function") && ret1 !== null)               
    {
        return ret1;
    }
    return ret;
}
```
```js
// 使用es6的版本
function instantiate(fn, ..rests) {
   var f = Object.create(fn.prototype);
	var val = fn.apply(f,rests);
	return isPrimitive(val) ? f : val;
}

function isPrimitive (b){
    var a = typeof b;
    return !!(b === undefined || b === null || a == 'boolean' || a == 'number' || a == ‘string’ );      
}
```

***基本类型和对象的区别***
- 属性可更改：属性可增删改查
- 比较传递：基本类型比较的是值，而对象比较的是引用
```js
 // 无法在几本类型中添加新的属性
var a = '121'
a.b = 'b'
a.b // 输出 undefined
```

**什么是原型链？**

- JavaScript中的每个对象，都有一个内置的_proto_属性,这个指向了构造函数的prototype
- 当一个对象需要引用一个属性时，JavaScript引擎首先会从这个对象自身的属性表中寻找这个属性标识，如果找到则进行相应读写操作，若没有在自身的属性表中找到，则在_proto_属性引用的对象的属性表中查找，如此往复，直到找到这个属性或者_proto_属性指向null为止

这个_proto_的引用链，被称作原型链。

**通过原型链实现继承**

继承的目的是什么？无非就是复用；对象的一个新类从现有的类中派生，这个过程叫做继承。然而javascript并没有真正的类，它有的只是对象。如何实现继承的呢？就是通过上面说到的原型链了，通过原型链实现共享父类的属性和方法

下面看一个实例：

```ts
var Super = function(value) {
	this.value = value || 'super';
	this.list = [1,2,3,4,5]
}

Super.prototype.getValue = function(){
	return this.value
}
Super.prototype.getIndexValue = function(index){
	return this.list[index]
}

var Sub = function(value) {
	this.level = 'sub';
	this.value = 'sub' + value;
}

Sub.prototype = new Super()
var subinstance1 = new Sub('hello world 1')
var subinstance2 = new Sub('hello world 2')
```

Sub通过修改prototype，实现了继承；可以运行一下，然后查看两个实例对象的属性，看看有什么区别；

思考一下上面的代码会出现什么问题？为何会出现这样的问题

- 引用传递，由于实例对象共享了父类的原型，如果在一个实例对象上变更了父类的原型，那么会影响所有的实例，这显然不是我们所希望的，我们想继承，但是不想被其他实例影响；
- constructor指向有问题；
- 实例化子类的时候无法向父类传递参数；

如何解决？

在下一章解决吧