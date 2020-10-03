#### 站点统计

[IIS站点统计配置方法](https://docs.microsoft.com/en-us/iis/develop/runtime-extensibility/sample-web-analytics-tracking-module)

### 百度统计基础代码
```html
<script>
var _hmt = _hmt || [];
(function() {
  var hm = document.createElement("script");
  hm.src = "https://hm.baidu.com/hm.js?网站code写在这里";
  var s = document.getElementsByTagName("script")[0]; 
  s.parentNode.insertBefore(hm, s);
})();
</script>
```

**百度统计开放报告设置 **
```
其它设置 > 统计图标设置 > 开放网站统计数据给第三方查看
```

站点|提供商|code(点击查看报告)
-|-|-
ERP|百度|[4864b3454337ce3953684d162b7783ff](http://tongji.baidu.com/web/welcome/ico?s=4864b3454337ce3953684d162b7783ff)
素材库|百度|[80bc3f509719aead1ebb5389cba45fec](http://tongji.baidu.com/web/welcome/ico?s=80bc3f509719aead1ebb5389cba45fec)
协同|百度|[2cb0da9ca4de222b299d5e08961c3c02](http://tongji.baidu.com/web/welcome/ico?s=2cb0da9ca4de222b299d5e08961c3c02)
WIKI|百度|[d3a60854f45f4a9d4563464b7d8ca466](http://tongji.baidu.com/web/welcome/ico?s=d3a60854f45f4a9d4563464b7d8ca466)
棒谷业务手册|百度|[e320c7ad89a0445ae26c3f5504ba798c](http://tongji.baidu.com/web/welcome/ico?s=e320c7ad89a0445ae26c3f5504ba798c)
CAS|百度|[d3d2d19b2aa32aeb856897df117540f4](http://tongji.baidu.com/web/welcome/ico?s=d3d2d19b2aa32aeb856897df117540f4)
API网关|百度|[e9ce2b5e7793563f8808b69329dad6c8](http://tongji.baidu.com/web/welcome/ico?s=e9ce2b5e7793563f8808b69329dad6c8)
CRM|百度|?
TMS|百度|?
广告平台|百度|?
Top Sales|百度|?
EWD供应商|百度|？
PMC|百度|？

