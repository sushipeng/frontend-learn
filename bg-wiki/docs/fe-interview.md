#### 百度搜索框，一边打字，底下一边智能提示，请问你如何实现这个需求？

>防抖、节流问题
```
clearTimeout(xxx);清除上一个，设置新的延时器
xxx=setTimeout(function(){},200);
```

#### 假设某些元素有两个class，如`<a class="left bg"></a>` ，在css里面如何选择即有left又有bg的元素集合?

>.a.b    连着写没有空格

#### JSONP原理,CORS原理

>动态创建一个script，返回是一段脚本，一般是对本地代理函数的调用，而不是JSON

#### arguments.caller 和 callee 有什么用处？

>caller指向调用函数的函数(有可能为null)，callee指向函数本身

#### 盒子模型有哪几种？区别是？

>两种，IE模型和标准模型，IE模型的content包含了border和padding

#### 在一个空白页面循环输出10个按钮，点击哪个按钮弹出哪个按钮的index?

```
function init3() {
    var pAry = document.getElementsByTagName("p");
    for (var i = 0; i < pAry.length; i++) { 
        (function(arg) {
            pAry[i].onclick = function() {
                alert(arg);
            };
        })(i); //调用时参数 
    }
}
function init5() {
    var pAry = document.getElementsByTagName("p");
    for (var i = 0; i < pAry.length; i++) {
        pAry[i].onclick = function(arg) {
            return function() { //返回一个函数 
                alert(arg);
            }
        } (i);
    }
}
```

#### 事件处理有几个阶段？，addEventListener分别有哪些参数？

>捕获（自上而下），目标，冒泡（自底而上）

#### 假设点击一个按钮弹出一个layer（层），在层外面点击任何位置，层关闭，层内点击层保持打开状态，如何实现 ？

>层元素上设置一个阻止点击事件冒泡的事件

#### 假设有个function Hello(){},怎么取 Hello的原型？var a=new Hello(),怎么获取a的原型？Hello.prototype.constructor指向谁？

####  $('p').find('.b').datatable()。 如何回到上一层操作？

>$('p').find('.b').datatable().end()

#### apply,call,bind 有何作用？有何区别？

#### typeof有几种值 ？

####  “a”||0  返回什么值？  0&&1返回什么值 ？

#### 模块化规范？

#### 变量提升，作用域链

#### 调试工具打断点，JS断点，dom断点，函数调用栈，（数据结构：函数栈）

#### 尾递归优化

#### Undersocre , jquery 常用的API 分类

#### cookie有几个属性？分别是干什么的






