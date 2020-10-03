---
layout: default
title: 前端实践：rap与mock工具如何在开发中使用
---

### 前端如何使用mock数据

- 前后端约定接口
- 同步并行的去开发，调试，互相不受到影响
- 联合调试

比较推荐方式2，使用公司内部提供的转发站进行转发；

#### 方式1:
（该方式可以借鉴，各个开发小组前端负责人参照如下方式自己封装）
先看一个官方提供的实例：rap提供的jquery插件；
各个业务线采用的技术选型有所差别，我们不一定使用这样的方式，但是这个却可以提供给我们参考如何将rap的数据拦截；
各个业务组可以参考jquery.rap实现插件；

[jquery.rap插件源码](http://rap2api.taobao.org/libs/jquery.rap.js)
插件重写了jquery的ajax方法：并且将请求的地址重新指向了rap服务器的地址；
```js
//代码片段jquery.rap.js
// 将jquery的方法ajax暂存于next；
let next = jQuery.ajax
  let find = (settings) => {
    for (let repositoryId in RAP.interfaces) {
      for (let itf of RAP.interfaces[repositoryId]) {
        if (itf.method.toUpperCase() === settings.method.toUpperCase() && itf.url === settings.url) {
          return Object.assign({}, itf, { repositoryId })
        }
      }
    }
  }
  // 重写jquery的成员方法ajax，通过判断请求的url是否存在于全局的RAP对象中，来判断是否需要向rap服务器请求数据；
  // 如果判断不存在，则直接使用jquery方法请求地址，这个时候往往抛出错误；
  // 如果匹配成功，拼接新的url，设置请求方法，请求类型，然后向rap服务器发出请求；
  jQuery.ajax = function (url, settings) {
    // ajax(settings)
    if (typeof url === 'object') {
      settings = Object.assign({ method: 'GET' }, url)
    } else {
      // ajax(url) ajax(url, settings)
      settings = Object.assign({ method: 'GET' }, settings, { url })
    }

    var match = find(settings)
    if (!match) return next.call(jQuery, url, settings)

    let redirect = `${RAP.protocol}://${RAP.host}/app/mock/${match.repositoryId}/${match.method}/${match.url}`
    settings.method = 'GET'
    settings.dataType = 'jsonp'
    console.log(`jQuery ${match.method} ${match.url} => ${redirect}`)
    return next.call(jQuery, redirect, settings)
  }
```

在项目中的使用方式，在切换到其他环境的时候将这些依赖移除；

```html
<!-- 使用webpack，或者gulp，可以设置不同环境的配置的方式加载这些依赖 -->
<script src="jquery.min.js"></script>
<!-- rap自动生成的插件地址，它将会在全局生成RAP对象，包涵了地址仓库的所有的接口信息，以及mock模版，以及协同仓库的信息 -->
<script src="http://192.168.1.206:3800/app/plugin/:projectId"></script>
<script src="http://rap2api.taobao.org/libs/jquery.rap.js"></script>
<script>
$.ajax({
    url : '/example/1501049256513', // 自动拦截
    method : 'GET',
    dataType : 'JSON',
    success : function(data) {
      // 返回根据RAP文档及规则生成的mock数据
      $('#result').html(JSON.stringify(data))
    }
})
</script>
```

#### 方式2:

采用架构组提供的中间转发层转发请求；
优点：不需要加入第三方插件，或者是小组去实现中间的插件，只需要配置不同环境的地址，将测试环境的地址设置成架构组提供的转发地址就可以了；这是推荐使用的方式；

架构组提供的转发地址: http://192.168.1.206:3200/id/:id  

注：id是对应仓库的id

angular项目实例（在vue的项目或者react项目可以同理实现类似的方式；）：
```ts
// 在开发环境中设置地址
export const environment = {
  production: false,
  apiConfig: {
    testUrl: 'http://192.168.1.206:3200/id/20'
  }
};
// 请求的时候使用对应的地址进行请求，this.apiSer.ApiUrl在初始化的时候加载了地址配置，方便切换地址进行请求
this.apiSer.setBaseUrl(this.apiSer.ApiUrl.testUrl).post('/ewms-api-server/api/ewms-storage/findEWMSStoragePage',{
      pageNum: '',
      rowNumber: ''
    }).subscribe(data => {
      console.log(data)
    })
```



#### 方式3：

项目中使用拦截器的方式，angular、vue或者其他类库，均可以自定义拦截器实现，在发出请求前将地址改写；可以参考jquery.rap插件提供的方式拦截，重组地址进行请求，根据运行的环境进行拦截；但是这个方式可能会在项目产生额外代码，不是很推荐；