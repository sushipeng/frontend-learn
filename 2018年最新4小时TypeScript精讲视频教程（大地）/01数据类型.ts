 

/*

枚举类型（enum）
    随着计算机的不断普及，程序不仅只用于数值计算，还更广泛地用于处理非数值的数据。
    例如：性别、月份、星期几、颜色、单位名、学历、职业等，都不是数值数据。  
    在其它程序设计语言中，一般用一个数值来代表某一状态，这种处理方法不直观，易读性差。
    如果能在程序中用自然语言中有相应含义的单词来代表某一状态，则程序就很容易阅读和理解。
    也就是说，事先考虑到某一变量可能取的值，尽量用自然语言中含义清楚的单词来表示它的每一个值，
    这种方法称为枚举方法，用这种方法定义的类型称枚举类型。
        
            enum 枚举名{ 
                标识符[=整型常数], 
                标识符[=整型常数], 
                ... 
                标识符[=整型常数], 
            }      

 */

enum Flag {success=1,error=2}
let s:Flag = Flag.success
console.log(s)

enum Flag {success=1,error=2}
let f:Flag=Flag.error
console.log(f)


   enum Color {blue,red,'orange'}
   let c:Color=Color.red
   console.log(c)   //1  如果标识符没有赋值 它的值就是下标

enum Color {blue,red=3,'orange'}
let c:Color=Color.red
console.log(c)   //3

let c:Color=Color.orange
console.log(c)   //4


enum Err {'undefined'=-1,'null'=-2,'success'=1}
let e:Err=Err.success
console.log(e)



// null 和 undefined  其他（never类型）数据类型的子类型
// let num:number
// console.log(num)  //输出：undefined   报错

// let num:undefined
// console.log(num)  //输出：undefined  // 正确


let num:number | undefined
num= 123
console.log(num)


// 定义没有赋值就是undefined
let num:number | undefined
console.log(num)


// let num:null
// num=null

//一个元素可能是 number类型 可能是null 可能是undefined
let num:number | null | undefined
num=1234
console.log(num)


// void类型 :typescript中的void表示没有任何类型，一般用于定义方法的时候方法没有返回值。
 //es5的定义方法
    // function run(){

    //     console.log('run')
    // }

    // run()


//表示方法没有返回任何类型

function func():void{
    console.log('hello')
}

//错误写法
function func(): undefined{
    console.log('hello')
}




//正确写法
       /*
       function run():number{

           return 123
        }

        run()
       */



// never类型:是其他类型 （包括 null 和 undefined）的子类型，代表从不会出现的值。
//这意味着声明never的变量只能被never类型所赋值。


   /*
    let a:undefined
    a=undefined
    let b:null
    b=null
   */



let foo:never
// foo =123 //错误写法
foo = (() => {
    throw new Error('错误')
})()

