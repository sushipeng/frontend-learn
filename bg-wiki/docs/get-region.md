---
layout: default
title: 从国家统计局获取省市区数据
---

#### 从国家统计局获取省市区数据

[最新县及县以上行政区划代码（截止2014年10月31日）](http://www.stats.gov.cn/tjsj/tjbz/xzqhdm/201504/t20150415_712722.html)    

```javascript

(function ($) {
    var cur = { l0: 1, l1: 0, l2: 0, l3: 0 };
    var sql = "SET IDENTITY_INSERT  [Regions] ON\
\nINSERT INTO [Regions]([Id],[TenantId],[ParentId],[Name],[Code],[Depth],[CountryCode])    VALUES(1,1,0,N'中华人民共和国','86',0,'cn')";
    $('.TRS_PreAppend .MsoNormal').each(function (i, n) {
        var $n = $(n), children = $n.children('span'), span1 = children.eq(0), span2 = children.eq(1);
        var code = $.trim(span1.text()), name = span2.text();
        var id = i + 2;
        if (code == '130111') {
            code = '130111';
            name = '   栾城区';
        } else if (code.indexOf('130181') != -1) {
            code = '130181';
            name = '   辛集市';
        } else if (code.indexOf('130682') != -1) {
            code = '130682';
            name = '   定州市';
        } else if (code == '130183') {
            name = '   晋州市';
        }
        var level;
        try {
            level = name.match(/\s/g).length;
        } catch (e) {
            debugger
        }
        cur['l' + level] = id;
        name = $.trim(name);
        var pid = cur['l' + (level - 1)];
        sql += "\nINSERT INTO [Regions]([Id],[TenantId],[ParentId],[Name],[Code],[Depth],[CountryCode])\
    VALUES(" + id + ",1," + pid + ",N'" + name + "','" + code + "',"+level+",'cn')";
    });
    sql += '\nSET IDENTITY_INSERT  [Regions] OFF'
    //console.log(sql);
    copy(sql);
})(jQuery);

```