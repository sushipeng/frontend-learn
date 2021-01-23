




// ts中定义方法传参
function func(name:string, age:number):string {
        return `${name} --- ${age}`
}
func('zhangsan', 20)

let func = function(name:string, age:number):string {
    return `${name} --- ${age}`
}
func('lisi', 20)







// 3.4、剩余参数
function func(a:number, b:number, c:number):number {
    return a + b + c
}
func(1, 2, 3)



    function func(...result:number[]):number{
        var func=0

        for(var i=0i<result.lengthi++){

            func+=result[i]  
        }

        return func

    }

    console.log(func(1,2,3,4,5,6)) 






    // 3.6、  es6  
    //注意：箭头函数里面的this指向上下文
    // setTimeout(function(){
    //     console.log('run')
    // },1000)

    setTimeout(()=>{
        console.log('run')
    },1000)

    // 有名函数
    function add(x:number, y:string):string {
        return '张三'
    }
    // 匿名函数
    let myAdd = function(x:number, y:string):string {
        return '张三'
    }

    // 函数类型，全函数声明
    let myAddts: (name:string, age:number) => number = function(n:string, a:number):number {
        return a
    }
    myAddts('张三', 18)
    



