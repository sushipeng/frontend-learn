/*
tampermonkey 不能翻墙下载的可以在这里下载  http://down.tech.sina.com.cn/page/54854.html
 */



// ==UserScript==
// @name         New Userscript
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        http://edmp.local/*?local=*
// @include      /http:\/\/20048\.3361\.com\/\d+.*/
// @include      /http:\/\/20044\.3361\.com\/\d+.*/
// @include      /http:\/\/\d+\.vrm\.cn\/\d+.*/
// @include      /http:\/\/\d+\.ybj\.com\/\d+.*/
// @grant        none
// ==/UserScript==

 
(function() {
    'use strict';
    (function(l){var o={name:"万丈金数",mobile:b(),birthday:c(),idcard:432434188709300200};o.email=o.mobile+"@qq.com";var q=$.extend({},o,l);$("input[name=name]").val(q.name);var s=$("input[name=birthday][data-required]");s.trigger("click");var d=$("#laydate_table td").length;$("#laydate_ok").trigger("click");$(".dwb-e").trigger("click");if(!s.val()){s.val(q.birthday)}$("input[name=age]").val(q.birthday);$("input[name=email]").val(q.email);var v=parseInt(t("_fill_formIdCard"))||q.idcard;v+=1;$("input[name=idcard]").val(v);p("_fill_formIdCard",v);if($("input[name=mobileCode]").length==0){$("input[name=mobile]").val(q.mobile)}setTimeout(function(){$("input[name=mobile]").keyup()},1000);function j(){try{if(dataJson&&dataJson.length>0){var y=k(dataJson.length);var C=dataJson[y];$("input[name=userProvinceId]").val(C.value);if($("input[name=userCityId]").length>0){var z=k(dataJson[y].child.length);var B=dataJson[y].child[z];$("input[name=userCityId]").val(B.value);$("input[name=userProvinceId]").parent().children("input[type=text]").val(C.name+"-"+B.name)}else{$("input[name=userProvinceId]").parent().children("input[type=text]").val(C.name)}}else{$("input[name=userProvinceId]").val("-100000");if($("input[name=userCityId]").length>0){$("input[name=userCityId]").val("-110000");$("input[name=userProvinceId]").parent().children("其他省-其他市")}else{$("input[name=userProvinceId]").parent().children("其他省")}}}catch(A){}}j();var r=$("input[type=radio]");function f(z){var B={};z.each(function(D,E){var C=$(E).attr("name");if(B[C]){B[C]+=1}else{B[C]=1}});for(var y in B){var A=k(B[y]);$("input[type=radio][name="+y+"]").eq(A).trigger("click")}}f(r);var g=$("input[type=hidden]").filter(function(z,y){var A=$(y).attr("name");if($(y).parent()[0].tagName.toLowerCase()!="form"&&A!="userProvinceId"&&A!="userCityId"&&A!="birthday"){return true}});function e(y){y.each(function(B,D){var A=$(D).parent().find("[data-val]")[0]?$(D).parent().find("[data-val]"):$(D).parent().find("[data-value]");if(A.length==0){A=w(D)}var z=A.length;if(z>0){if(z==1){if(!$(D).val()){A.eq(0).trigger("click");if(!$(D).val()){var C=k(A.eq(0).children().length);A.eq(0).children().eq(C).trigger("click")}}}else{var C=k(z);A.eq(C).trigger("click")}}})}e(g);var n=$("input[type=checkbox]");function a(A){var B={};A.each(function(D,E){var C=$(E).attr("name");if(B[C]){B[C]+=1}else{B[C]=1}});for(var y in B){var z=k(B[y]);$("input[type=checkbox][name="+y+"]").eq(z).attr("checked",true)}}f(n);var x=$("select");function i(y){y.each(function(A,D){var B=$(D).children("option").filter(function(E){return $(this).html().indexOf("选择")==-1?true:false});var z=B.length;var C=k(z);B.eq(C).attr("selected",true)})}i(x);var h=$("input[type=hidden]");function u(y){y.each(function(z,B){var C=$(B).parent().find("li[title][data-id]").filter(function(D){return $(this).html().indexOf("选择")==-1?true:false});if(C.length>0){var A=k(C.length);C.eq(A).trigger("click")}})}u(h);function b(){var y="130"+(""+Math.random()).slice(2,10);return y}function c(){var y=$(".dwv").html();if(!/^[1-2][0-9][0-9][0-9]-[0-1]{0,1}[0-9]-[0-3]{0,1}[0-9]$/.test($(".dwv").html())){y="1990-01-01"}return y}function k(y){return Math.floor(Math.random()*y)}function t(B){var A=document.cookie;var C=A.indexOf(B+"=");if(C>-1){var z=A.indexOf(";",C)||A.length;var y=C+B.length+1;return decodeURIComponent(A.slice(y,z))}}function p(y,A,z){document.cookie=y+"="+encodeURIComponent(A)+";expires="+z}function m(z,A){var y=new Date();y.setTime(y.getTime()+30*24*60*60*1000);document.cookie=name+"="+encodeURIComponent(A)+";expires="+y.toUTMString()}function w(C){var D=$(C);var A={};var y=0;var B;D.parent().children().each(function(F,E){if(C==E){return true}if(A[E.tagName]){A[E.tagName]+=1}else{A[E.tagName]=1}});for(var z in A){if(A[z]>y){y=A[z];B=D.parent().children(z)}}return B}})({});
})();

    
// ================================================


/**
 * 万丈表单自动填充代码
 * @author 郭宪强
 * @param  {object} options 暂时没用
 * @return {undefined}   不返回东西
 * @description 版本2跟版本1的不同在于对radio标签的处理上，版本2会寻找radio标签种最多的子元素，然后随机点击子元素，来达到选择的目的
 */
 
//有问题页面 http://edmp.local/559?local=cignacmb-jktz-copy1
(function(options) {
    //代码只在测试线和开发线有效，避免页面上线的时候忘记删除造成不必要的损失。
    /*常见表达字段如下。
        1、name 姓名
        2、sex  性别
        3、mobile 手机号码
        4、email  邮箱
        5、birthday 生日
        6、age 生日
        7、userProvinceId  用户省份
        8、userCityId   用户所在城市
        9、insurance 赠险
    */
    
    var defaults ={
        name:"万丈金数",
        mobile:getMobile(),
        birthday:getBirthday(),
        idcard:432434188709300201
    }
    defaults.email=defaults.mobile+"@qq.com";
    var config = $.extend({},defaults,options);

    
    //1、需要直接键盘输入的字段,input type为text||tel||email||hidden||idcard 
    $("input[name=name]").val(config.name);
    $("input[name=birthday]").val(config.birthday);
    $("input[name=age]").val(config.birthday);
    $("input[name=email]").val(config.email);
    //身份证号
    var idcard = parseInt(getCookie("_formIdCard"))||config.idcard;
    idcard+=1;
    $("input[name=idcard]").val(idcard);
    setCookie("_formIdCard",idcard);

    //电话号码，有些赠险是跟电话号码关联的，所以填充完电话号码后还要触发mobile字段的keyup事件。加一段延时，不加延时发现没有效果
    $("input[name=mobile]").val(config.mobile);
    setTimeout(function(){
        $("input[name=mobile]").keyup();
    },1000)

    //当存在城市限制的时候就从城市限制中随机选择一个城市，否则填其他省其他市。
    function insertCity(){
        try{
            if(dataJson&&dataJson.length>0){
                var proIndex = getRandomInt(dataJson.length);
                var pro=dataJson[proIndex];
                $('input[name=userProvinceId]').val(pro.value);
                if($('input[name=userCityId]').length>0){
                    var cityIndex = getRandomInt(dataJson[proIndex].child.length);
                    var city= dataJson[proIndex].child[cityIndex];
                    $('input[name=userCityId]').val(city.value);
                    $('input[name=userProvinceId]').parent().children("input[type=text]").val(pro.name+"-"+city.name);
                }else{
                    $('input[name=userProvinceId]').parent().children("input[type=text]").val(pro.name);
                }
            }else{
                $('input[name=userProvinceId]').val("-100000");
                if($('input[name=userCityId]').length>0){
                    $('input[name=userCityId]').val("-110000");
                    $('input[name=userProvinceId]').parent().children("其他省-其他市");
                }else{
                    $('input[name=userProvinceId]').parent().children("其他省");
                }
                
            }
        }catch(e){
            console.log("dataJson不存在");
        }
        
    }
    insertCity();


    //2、对单选的字段进行随机选择。可能是radio标签，也可能是hidden标签。对radio标签的处理如下，查找到raido标签父元素中最多的子元素，然后随机触发该元素的click事件
    //对hidden标签的处理类似
    //测试连接：
    //2.1 http://20044.3361.com/483
    //2.2 http://20044.3361.com/525
    //2.3 http://20044.3361.com/504
	//2.4 http://edmp.local/390?local=metlife-jzyf-bl
	//http://68.vrm.cn/12
    var $radioArr = $("input[type=radio]");
    function checkRadioObj($radioArr){
        var radioObj={}
        $radioArr.each(function(index,ele){
            var name = $(ele).attr("name");
            if(radioObj[name]){
                radioObj[name]+=1;
            }else{
                radioObj[name]=1;
            }
            
        })
        for(var eleName in radioObj){
            var index = getRandomInt(radioObj[eleName]);
            $("input[type=radio][name="+eleName+"]").eq(index).attr("checked",true);
        }
    }
    checkRadioObj($radioArr);
    //type为hidden标签. 
    //1、过滤掉父元素我form的input(单选形式的input必须有父元素且不为form)
    //2、过滤已经处理的表情，userProvinceId userCityId  birthday
    var $radioArrLike = $("input[type=hidden]").filter(function(index,element){
        // console.log("element:",element);
        var $elementName=$(element).attr("name");
        if($(element).parent()[0].tagName.toLowerCase()!="form"&&$elementName!="userProvinceId"&&$elementName!="userCityId"&&$elementName!="birthday"){
            return true;
        }
    });
    function checkRadioObj2($radioArrLike){
        $radioArrLike.each(function(index,ele){
            //如果不存在含有data-val或者data-value属性的元素，则获得input的父元素中最多的子元素
            var $target=$(ele).parent().find("[data-val]")[0] ? $(ele).parent().find("[data-val]") : $(ele).parent().find("[data-value]");
            if($target.length==0){
                $target = getParentMostChildren(ele);
            }
            var len = $target.length;
            if(len>0){
                var radomIndex = getRandomInt(len);
                $target.eq(radomIndex).trigger("click");
            }
        });
    }
    checkRadioObj2($radioArrLike);



    //3、对input为checkbox的字段进行随机选择
    var $checkboxArr = $("input[type=checkbox]");
    function checkCheckboxObj($checkboxArr){
        var checkboxObj={}
        $checkboxArr.each(function(index,ele){
            var name = $(ele).attr("name");
            if(checkboxObj[name]){
                checkboxObj[name]+=1;
            }else{
                checkboxObj[name]=1;
            }
            
        })
        // console.log("radioObj",radioObj);
        for(var eleName in checkboxObj){
            var index = getRandomInt(checkboxObj[eleName]);
            $("input[type=checkbox][name="+eleName+"]").eq(index).attr("checked",true);
        }
    }
    checkRadioObj($checkboxArr);


    //4.对下拉进行处理
    var $selectArr = $("select");
    function checkSelectArr($selectArr){
        $selectArr.each(function(index,ele){
            var options=$(ele).children("option").filter(function(index){
                return $(this).html().indexOf("选择")==-1 ? true : false;
            });
            var len = options.length;
            var radomIndex = getRandomInt(len);
            options.eq(radomIndex).attr("selected",true);
        })
    }
    checkSelectArr($selectArr);

    //伪下拉
    var $selectArrLike = $("input[type=hidden]");
    function checkSelectArrLike($selectArrLike){
        $selectArrLike.each(function(index,ele){
            var $targets = $(ele).parent().find("li[title][data-id]").filter(function(index){
                return $(this).html().indexOf("选择")==-1 ? true : false;
            });
            if($targets.length>0){
                var radomIndex = getRandomInt($targets.length);
                $targets.eq(radomIndex).trigger("click");
            }
        })
    }
    checkSelectArrLike($selectArrLike);

    /*工具函数*/
    function getMobile() {
        var mobile ="130"+(""+ Math.random()).slice(2, 10);
        return mobile;
    }
    function getBirthday(){
        var defaultDate=$(".dwv").html();
        //如果页面默认日期格式错误或者不存在，日期就改成2010年1月1号。
        if(!/^[1-2][0-9][0-9][0-9]-[0-1]{0,1}[0-9]-[0-3]{0,1}[0-9]$/.test($(".dwv").html())){
            defaultDate = "1990-01-01";
        }
        return defaultDate;
    }
    //获取一个0到n-1包含n-1的随机整数
    function getRandomInt(n){
        return Math.floor(Math.random()*n);
    }
    //cookie 操作函数
    //获取cookie
    function getCookie(name){
        var cookieStr=document.cookie;
        var start =cookieStr.indexOf(name+"=");
        if(start>-1){
            var end = cookieStr.indexOf(";",start)||cookieStr.length;
            var beStart = start+name.length+1;
            return decodeURIComponent(cookieStr.slice(beStart,end));
        }
    }
    function setCookie(name,value,expires){
        document.cookie=name+"="+encodeURIComponent(value)+";expires="+expires;
    }
    //cookie 保存30天
    function setCookie30(nava,value){
        var date = new Date();
        date.setTime(date.getTime()+30*24*60*60*1000);
        document.cookie=name+"="+encodeURIComponent(value)+";expires="+date.toUTMString();
    }
    // 获取某个元素的父元素中最多的子元素
    function getParentMostChildren(ele){
        var $ele = $(ele);
        var eleNum={};
        var maxNum=0;
        var $maxNumElement;
        $ele.parent().children().each(function(index,innerEle){
            if(ele==innerEle){
                return true;
            }
            if(eleNum[innerEle.tagName]){
                eleNum[innerEle.tagName]+=1;
            }else{
                eleNum[innerEle.tagName]=1;
            }
        })
        for(var eleN in eleNum){
            if(eleNum[eleN]>maxNum){
                maxNum=eleNum[eleN];
                $maxNumElement=$ele.parent().children(eleN);
            }
        }
        return  $maxNumElement;
    }

    /*
        遗留的问题
        1、电话号码没有按地区填写的功能
     */
    
})({})
