---
layout: default
title: 常用代码片段
---

###　将大数据kylin类csv数据转换为json数组

```javascript
function csv2jsonArr(items,headers){
    return _.map(items,function(item){
        var o={};
        _.each(headers,function(header,index){
            o[header]=item[index];
        });
        return o;
    });
}
//测试
var data={"isFile":0,"columnInfos":[{"label":"统计日期","name":"STATDATE","columnTypeName":"VARCHAR"},{"label":"处理中心ID","name":"PROCESSCENTERID","columnTypeName":"INTEGER"},{"label":"产品ID","name":"PRODUCTID","columnTypeName":"INTEGER"},{"label":"产品名称","name":"PRODUCTNAME","columnTypeName":"VARCHAR"},{"label":"产品属性ID","name":"PROPERTYID","columnTypeName":"INTEGER"},{"label":"是否在国内","name":"ISCHINA","columnTypeName":"INTEGER"},{"label":"开发经理id","name":"MANAGERID","columnTypeName":"INTEGER"},{"label":"开发经理/品项","name":"USERNAME","columnTypeName":"VARCHAR"},{"label":"品牌名称","name":"BRANDNAME","columnTypeName":"VARCHAR"},{"label":"品牌类型名称","name":"BRANDTYPENAME","columnTypeName":"VARCHAR"},{"label":"平台名称","name":"PLATFORMNAME","columnTypeName":"VARCHAR"},{"label":"库存数量","name":"库存数量","columnTypeName":"BIGINT"},{"label":"库存金额","name":"库存金额","columnTypeName":"DECIMAL"},{"label":"20天滞销数量","name":"20天滞销数量","columnTypeName":"BIGINT"},{"label":"20天滞销金额","name":"20天滞销金额","columnTypeName":"DECIMAL"},{"label":"30天滞销数量","name":"30天滞销数量","columnTypeName":"BIGINT"},{"label":"30天滞销金额","name":"30天滞销金额","columnTypeName":"DECIMAL"},{"label":"45天滞销数量","name":"45天滞销数量","columnTypeName":"BIGINT"},{"label":"45天滞销金额","name":"45天滞销金额","columnTypeName":"DECIMAL"},{"label":"60天滞销数量","name":"60天滞销数量","columnTypeName":"BIGINT"},{"label":"60天滞销金额","name":"60天滞销金额","columnTypeName":"DECIMAL"},{"label":"75天滞销数量","name":"75天滞销数量","columnTypeName":"BIGINT"},{"label":"75天滞销金额","name":"75天滞销金额","columnTypeName":"DECIMAL"},{"label":"90天滞销数量","name":"90天滞销数量","columnTypeName":"BIGINT"},{"label":"90天滞销金额","name":"90天滞销金额","columnTypeName":"DECIMAL"},{"label":"120天滞销数量","name":"120天滞销数量","columnTypeName":"BIGINT"},{"label":"120天滞销金额","name":"120天滞销金额","columnTypeName":"DECIMAL"},{"label":"150天滞销数量","name":"150天滞销数量","columnTypeName":"BIGINT"},{"label":"150天滞销金额","name":"150天滞销金额","columnTypeName":"DECIMAL"},{"label":"180天滞销数量","name":"180天滞销数量","columnTypeName":"BIGINT"},{"label":"180天滞销金额","name":"180天滞销金额","columnTypeName":"DECIMAL"},{"label":"270天滞销数量","name":"270天滞销数量","columnTypeName":"BIGINT"},{"label":"270天滞销金额","name":"270天滞销金额","columnTypeName":"DECIMAL"},{"label":"365天滞销数量","name":"365天滞销数量","columnTypeName":"BIGINT"},{"label":"365天滞销金额","name":"365天滞销金额","columnTypeName":"DECIMAL"}],"results":[["2017-08-19","7","335159","侵权  双层 星尘网状 水晶磁扣手链手镯","389686","1","553","王世杰",null,null,"Ebay","1","1.94","1","1.94","1","1.94","1","1.94","1","1.94","1","1.94","1","1.94","1","1.94","1","1.94","1","1.94","0","0","0","0"],["2017-08-18","7","1043286","新款皇冠PU三角巾宠物狗狗围巾围脖宠物领巾口水巾狗项圈厂家直销","2116064","1","19572","古艳",null,null,"网站","10","45","10","45","10","45","10","45","0","0","10","45","0","0","0","0","0","0","0","0","0","0","0","0"],["2017-08-19","7","208211","宠物 新豹纹 LED项圈","188496","1","19572","古艳",null,null,"网站","2","13.6","2","13.6","2","13.6","2","13.6","2","13.6","2","13.6","2","13.6","2","13.6","2","13.6","2","13.6","2","13.6","2","13.6"]]};
//将csv风格数据转换成对象数组
var arr= csv2jsonArr(data.results,_.pluck(data.columnInfos,"name"));

```
### 求笛卡尔积（SKU数组相乘）

```
//需要引入underscore
function cartesianProductOf() {
    return _.reduce(arguments, function (a, b) {
        return _.flatten(_.map(a, function (x) {
            return _.map(b, function (y) {
                return x.concat([y]);
            });
        }), true);
    }, [[]]);
}
cartesianProductOf.call(null,[{size:'s'},{size:'m'}],[{color:'red'},{color:'green'}]);
输出：
[[{"size":"s"},{"color":"red"}],[{"size":"s"},{"color":"green"}],[{"size":"m"},{"color":"red"}],[{"size":"m"},{"color":"green"}]]
```