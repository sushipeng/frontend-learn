/*
1、vscode配置自动编译

    1.第一步   tsc --inti 生成tsconfig.json   改 "outDir": "./js",  


    2、第二步 任务 - 运行任务  监视tsconfig.json


2、typeScript中的数据类型

    typescript中为了使编写的代码更规范，更有利于维护，增加了类型校验，在typescript中主要给我们提供了以下数据类型


        布尔类型（boolean）
        数字类型（number）
        字符串类型(string)
        数组类型（array）
        元组类型（tuple）
        枚举类型（enum）
        
        任意类型（any）
        null 和 undefined
        void类型
        never类型

3、typeScript中的函数

    3.1、函数的定义
    3.2、可选参数
    3.3、默认参数
    3.4、剩余参数
    3.5、函数重载
    3.6、箭头函数  es6
4、typeScript中的类

    4.1 类的定义
    4.2 继承
    4.3 类里面的修饰符
    4.4 静态属性 静态方法
    4.5 抽象类 多态
5、typeScript中的接口

    5.1 属性类接口
    5.2 函数类型接口
    5.3 可索引接口
    5.4 类类型接口
    5.5 接口扩展

   
*/


/*
接口的作用：在面向对象的编程中，接口是一种规范的定义，它定义了行为和动作的规范，在程序设计里面，接口起到一种限制和规范的作用。接口定义了某一批类所需要遵守的规范，接口不关心这些类的内部状态数据，也不关心这些类里方法的实现细节，它只规定这批类里必须提供某些方法，提供这些方法的类就可以满足实际需要。 typescrip中的接口类似于java，同时还增加了更灵活的接口类型，包括属性、函数、可索引和类等。

定义标准。

*/


// 可索引接口：数组、对象的约束  （不常用）



    //ts定义数组的方式
        /*
            var arr:number[]=[2342,235325]


            var arr1:Array<string>=['111','222']
        */



        //可索引接口 对数组的约束
                // interface UserArr{
                //     [index:number]:string
                // }


                // // var arr:UserArr=['aaa','bbb'];

                // // console.log(arr[0]);



                // var arr:UserArr=[123,'bbb'];  /*错误*/

                // console.log(arr[0]);


        //可索引接口 对对象的约束




                // interface UserObj{

                //     [index:string]:string
                // }


                // var arr:UserObj={name:'张三'};






//接口扩展：接口可以继承接口   


    // interface Animal{

    //     eat():void;
    // }

    // interface Person extends Animal{

    //     work():void;
    // }

    // class Web implements Person{

    //     public name:string;
    //     constructor(name:string){
    //         this.name=name;
    //     }

    //     eat(){

    //         console.log(this.name+'喜欢吃馒头')
    //     }
    //     work(){

    //         console.log(this.name+'写代码');
    //     }
        
    // }

    // var w=new Web('小李');

    // w.eat();











    
    interface Animal{

        eat():void;
    }

    interface Person extends Animal{

        work():void;
    }


    class Programmer{

        public name:string;
        constructor(name:string){
            this.name=name;
        }
        
        coding(code:string){

            console.log(this.name+code)
        }
    }


    class Web extends Programmer implements Person{
        
        constructor(name:string){
           super(name)
        }
        eat(){

            console.log(this.name+'喜欢吃馒头')
        }
        work(){

            console.log(this.name+'写代码');
        }
        
    }

    var w=new Web('小李');

    // w.eat();

    w.coding('写ts代码');



    // =============================

    /* 

接口：定义的是一种规范和限制
在接口里声明动作和属性，并不包括实现的部分，实现交给implements来做

可选属性
函数类型
数组类型
class类型
继承接口
混合类型
*/
/* function printLabel(labelObj: {label:string}) {
    console.log(labelObj.label)
}
let myObj = {label: 'Hello'}
printLabel(myObj) */

/* interface LableValue{
    label: string,
    
}
function printLabel(labelObj: LableValue) {
    console.log(labelObj.label)
}
let myObj = {label: 'Hello'}
printLabel(myObj) */



/* interface USB{
    name: string,
    age?: number
}

function printUSB(pu:USB):void {
    console.log(pu.name)
    console.log(pu.age)
}
// let my = {name: 'ime', age: 1000}
let my = {name: 'ime'}
printUSB(my) */


/* interface SearchFunc{ 
    (source:string,subString:string):boolean
}

let mySearch: SearchFunc
mySearch = function(source:string,subString:string):boolean {
    let result = source.search(subString)
    return result != -1
}
mySearch('hello world', 'world') */


/* interface StringArray{
    [index:number]: string
}

let myArray:StringArray = ['10', '10']
console.log(myArray[0]) */


/* interface ClockInterface{
    currentTime: Date;
    setTime(d:Date);
}

class Clock implements ClockInterface {
    currentTime: Date;
    setTime(d:Date) {
        this.currentTime = d
    }
    constructor(h:number,m:number) {

    }
}
 */


 interface Shape{
    color:string;
}

interface PenStroke{
   penWidth:number
}
interface Square extends Shape, PenStroke {
    sidleLength:number
}

let s = <Square>{}
s.color = 'blue'
s.sidleLength = 10
s.penWidth = 10

//  =============
/*  interface Counter {
   interval: number;
   reset():void;
   (start:number):string;
}

let c:Counter
c(10)
c.reset() */

/* 
泛型类型
泛型类
function Hello<T>(arg:T):T {
    return arg
}

let output = Hello<string>('Hellow')
*/

function Hello1<T>(num:T):T {
   //  console.log(num.length) //报错
    return num
}


function Hello2<T>(str:T[]):T[] {
    console.log(str.length) //通过
    return str
}
let list:Array<string> = Hello2<string>(['1','2','3'])

/* 泛型类型 */
function Hello<T>(arg:T):T{
   return arg
}
let myHello1:<K>(arg:K) => K = Hello
console.log(myHello1('hello'))

// 或
let myHello2:{<T>(arg:T)} = Hello
console.log(myHello2('hello'))

// ---------
let myFunc:(a:number) => string = function(a:number):string {
   return 'hello' + a
}
console.log(myFunc(2))
// ---------
interface Hello3{
   <T>(arg:T):T
}
function myHello3<T>(arg:T):T {
   return arg
}
let MH:Hello3 = myHello3
console.log(MH('hello'))
console.log(MH<string>('hello'))

// --------------
interface Hello4<T>{ // 泛型接口
   (arg:T):T
}
function myHello4<T>(arg:T):T {
   return arg
}
let mh:Hello4<number> = myHello4
console.log(mh(1212))
// -------------------
// 泛型类
class HelloNumber<T> {
   ten:T;
   add:(x:T,y:T) => T
}
let myHelloNumber = new HelloNumber<number>()
myHelloNumber.ten = 10
myHelloNumber.add = function(x,y) {
   return x+y
}
console.log(myHelloNumber.ten)
console.log(myHelloNumber.add(myHelloNumber.ten, 20))

// -----------------模块------------
/* 
javaScrip Module模块
1.模块化、可复用
2.封装变量和函数
(function() {
   // 内部代码
})()
var a;// 全局
function hello() {
   var b;// 局部
   c; //全局
}

(function($, w){

})(jQuery, window)
*/

/* interface StringValidator{
   isAcceptable(s:string): boolean;
}
let letterRegexp = /^[A-Za-z]+$/
let numberRegexp = /^[0-9]+$/

class LettersOnValidator implements StringValidator {
   isAcceptable(s:string):boolean {
       return letterRegexp.test(s)
   }
}

class ZipOnValidator implements StringValidator {
   isAcceptable(s:string):boolean {
       return numberRegexp.test(s)
   }
} */

module Validation {
   export interface StringValidator {
       isAcceptable(s:string): boolean;
   }

   let letterRegexp = /^[A-Za-z]+$/
   let numberRegexp = /^[0-9]+$/
   class LettersOnValidator implements StringValidator {
       isAcceptable(s:string):boolean {
           return letterRegexp.test(s)
       }
   }

   class ZipOnValidator implements StringValidator {
       isAcceptable(s:string):boolean {
           return numberRegexp.test(s)
       }
   } 
}

// 模块应用
module Time {
   export class Test {
       element: HTMLElement;
       span:HTMLElement;
       timer:number;
       constructor(e:HTMLElement) {
           this.element = e;
           this.element.innerHTML = '时间：';
           this.span = document.createElement('span');
           this.element.appendChild(this.span);
           this.span.innerHTML = new Date().toTimeString();
       }
       start() {
          this.timer = setInterval(() => {
              return this.span.innerHTML = new Date().toTimeString();
          }) 
       }
       stop() {
           clearInterval(this.timer)
       }
   }
}

// index.ts
let div = document.createElement('div');
document.body.appendChild(div);
let obj = new Time.Test(div);

let button = document.createElement('button');
button.innerHTML = 'start';
button.onclick = function() {
   obj.start()
}
document.body.appendChild(button);

let buttons = document.createElement('button');
buttons.innerHTML = 'stop';
buttons.onclick = function() {
   obj.stop();
}
document.body.appendChild(buttons);

// ==============精讲TypeScript==================
// 接口对类规范
interface DoSomething {
   shopping(n:number):string
   eating(n:number):string
}

class Student implements DoSomething {
   shopping(n:number):string {
       return 'lisi'
   }
   eating(n:number):string {
       return 'haha'
   }
}

// 接口对函数的约定，
// 1对多个函数进行约束
interface myFunction {
   (n: string, a:number):boolean
}
let fun1:myFunction;
fun1 = function(n: string, a:number):boolean {
   return true
}
let fun3:myFunction;
fun3 = function(n: string, a:number):boolean {
   return true
}
// 2对单个函数约束
let fun2:(n: string, a:number) => string = function(n: string, a:number):string {
   return 'OK'
}


// 接口对数组约束
interface StringArr {
   [index:number]:string;
}
let arr1:StringArr
arr1 = ['111','222']

let arr11:StringArr = ['111','222']

// 接口对json约束
interface Jdata {
   name:string,
   age:number
}

function jM(n: Jdata) {
   console.log(JSON.stringify(n))
}
let jd = {name: '张三', age: 18, addr:'bj'}
jM(jd)


// -----------泛型------------
/* 
泛型函数
泛型类
泛型接口
*/
class Person<T> {

}
class UserInfo {
   name:string = '张三';
   age:number = 16;
}
let a = new Person<UserInfo>()

// --------
interface School<T> {
   add(n:T):boolean
}
class Student1 implements School<UserInfo> {
   add(n:UserInfo):boolean {
       return true
   }
}
// ------------------
interface IData<T> {
   Add(info:T):boolean;
   Delete(info:T):boolean;
   Update(info:T):T;
   Search(info:T, id:number):T;
}

// 对mySql的访问, 泛型实现泛型
class MysqlData<T> implements IData<T> {
   Add(info: T): boolean {
       return false;
   }
   Delete(info: T): boolean {
       return false;
   }
   Update(info: T): T {
       return info
   }
   Search(info:T, id: number): T {
       return info
   }
}
// 对msSql的访问, 
class MssqlData<T> implements IData<T> {
   Add(info: T): boolean {
       return false;
   }
   Delete(info: T): boolean {
       return false;
   }
   Update(info: T): T {
       return info
   }
   Search(info:T, id: number): T {
       return info
   }
}

class UserInfo1 {

}

// 调用，传入具体类型
class UserData extends MysqlData<UserInfo1> {
   public GetUserInfo(n:number):UserInfo1 {
       let info = new UserInfo1()
       return this.Search(info, n)
   }
}

let ud = new UserData()
console.log(ud.GetUserInfo(1))


// ==========命名空间和模块========
namespace Validation {
   export interface StringValidator {
       isAcceptable(s: string): boolean;
   }

   const lettersRegexp = /^[A-Za-z]+$/;
   const numberRegexp = /^[0-9]+$/;

   export class LettersOnlyValidator implements StringValidator {
       isAcceptable(s: string) {
           return lettersRegexp.test(s);
       }
   }

   export class ZipCodeValidator implements StringValidator {
       isAcceptable(s: string) {
           return s.length === 5 && numberRegexp.test(s);
       }
   }
}

// demo.ts
/// <reference path="./Validate" />
let m1 = new Validate.StringValidate()

// ===========装饰器Decorators===========


// ========使用Jasmine进行单元测试===========
