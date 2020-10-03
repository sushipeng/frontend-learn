# 网关API调用说明（前端&后端）

### 一、进入网关

- 使用棒谷单点登录进入网关（[正式环境网关](http://gateway.sellercube.com/)，[测试环境网关](http://gateway.dev.sellercube.com/)）：

![](images/gravitee/01.png)

- 主界面：“Applications”选项卡显示订阅API的应用列表。一个Application可以订阅多个API。

![](images/gravitee/03.png)

### 二、订阅API

- 在Applications列表中添加一个自己的Application，用于订阅API，名称不要随意填写，需要符合规范。

![](images/gravitee/23.png)

- 订阅API，在网关前台的“API库”列表中，找到需要订阅的API，用刚刚添加的Application订阅。

![](images/gravitee/24.png)

- 等待验证，请找自己的高级开发经理。

![](images/gravitee/25.png)

- 验证通过后，可在添加的Application的左侧“Subscriptions”选项卡中，显示已订阅的API列表。点击“Plan”下面的下拉三角形即显示申请到的`X-Gravitee-Api-Key`。

![](images/gravitee/26.png)

### 三、调用网关API所需参数说明（以人事系统接口为例）

人事系统没接入网关之前，人事系统接口是公开的，不利于信息安全。而接入网关之后，人事系统访问的URL变成了： https://api.banggood.cn/pps/hms/ ，原有人事系统接口（ https://erpapi.banggood.cn/HMSService ）也将逐步停用。此时，调用人事系统的URL将需要传两个Header：`X-Gravitee-Api-Key`和`Authorization`，没有这两个参数则返回`401 Unauthorized` 错误。

| Header Name        | Header Value        | 说明                           |
| ------------------ | ------------------- | ---------------------------- |
| X-Gravitee-Api-Key | 通过订阅API获得           | 一次订阅产生一个X-Gravitee-Api-Key   |
| Authorization      | Bearer $AccessToken | AccessToken 前端与后端的获取方式不同，见下文 |

- 没传递两个Header将返回错误：

![](images/gravitee/28.png)

- 只传递一个Header也将返回错误：

![](images/gravitee/29.png)

- 传递两个Header正常返回结果：

![](images/gravitee/30.png)

Q：X-Gravitee-Api-Key 是固定值的吗？

A：一次订阅产生一个X-Gravitee-Api-Key，因此，订阅不同的API，X-Gravitee-Api-Key也是不同的。除此之外，[正式环境网关](http://gateway.sellercube.com/)和[测试环境网关](http://gateway.dev.sellercube.com/)也是不同的，请注意区分环境。

Q：X-Gravitee-Api-Key 有效期有多长？

A：无期限。

Q：AccessToken 有效期有多长？

A：8小时。

Q：调用正式环境网关API与测试环境网关API能不能用同一个AccessToken？

A：不能，AccessToken不能混用，请注意区分环境。

### 四、前端获取AccessToken

***注意：前端读取到`Authorization`cookie之后，需要把双引号去掉，然后把该值设置为请求网关API需要的`Authorization`Header***

| 系统                                    | Cookie Name   | 适用        | 自动刷新 |
| ------------------------------------- | ------------- | --------- | ---- |
| OA系统（<https://erpv2.banggood.cn>）正式环境 | Authorization | 正式环境网关API | 1小时  |
| 协同系统（<https://xt.banggood.cn>）正式环境    | XT_AUTH       | 正式环境网关API | 1小时  |
| 协同系统开发、测试环境                           | XT_AUTH_DEV   | 测试环境网关API | 1小时  |

- OA系统（https://erpv2.banggood.cn）正式环境，前端可读取`banggood.cn`域下的`Authorization`cookie获取到AccessToken。此AccessToken仅用于正式环境网关API。

![](images/gravitee/31.png)

- 协同系统（https://xt.banggood.cn）正式环境，前端可读取`banggood.cn`域下的`XT_AUTH`cookie获取到AccessToken。此AccessToken仅用于正式环境网关API。

![](images/gravitee/32.png)

Q：AccessToken 过期了怎么处理？

A：OA系统和协同系统都保持一小时刷新一次AccessToken，如果AccessToken过期，调用网关API会失败（返回502错误），此时前端需要提示用户去重新登录。

### 五、后端获取AccessToken

- 客户端模式获取AccessToken

> 正式环境的client secret将不定时修改，如遇到client secret失效，请及时找张朝煌联系。正式上线之前，应找张朝煌申请一个client id和client secret。

| 环境   | CAS地址                       | client id    | client secret                    |
| ---- | --------------------------- | ------------ | -------------------------------- |
| 正式环境 | https://cas2.banggood.cn    | banggoodtest | owwQrZcbRsj9q8LUeNot80WTQKCQVhdY |
| 测试环境 | https://castest.banggood.cn | 123456       | 123456                           |

请求地址：

CAS地址 + /cas/oauth2.0/accessToken?grant_type=client_credentials&client_id={0}&client_secret={1}

请求头：

Header Name: service

Header Value: CAS地址

示例：

![](images/gravitee/33.png)

- 授权码模式、简化模式获取AccessToken

参考架构组[文档](http://192.168.1.122:3000/architecture/cas/src/master/springboot-security-oauth-cas-client)

### 六、前后端调用网关API代码示例

- 前端Vue.js代码参考

> 统一在请求网关API时自动添加请求头

```javascript
import axios from 'axios'

export function getCookie (name) {
  let arr
  let reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)')
  arr = document.cookie.match(reg)
  if (arr) { return decodeURIComponent(arr[2]) } else { return null }
}

/**
 * 返回设置的头
 * @returns {Promise.<{}>}
 */
export function autoSetHeader () {
  let obj = {}
  if (process.env.HAS_AUTHORIZATION) {
    let aut = process.env.CONF_ENV === 'deploy' ? getCookie('XT_AUTH') : getCookie('XT_AUTH_DEV')
    if (/^"/.test(aut)) {
      aut = aut.substring(1, aut.length - 1)
    }
    obj['Authorization'] = aut
  }
  if (process.env.HAS_X_GRAVITEE_API_KEY) {
    obj['X-Gravitee-Api-Key'] = process.env.X_GRAVITEE_API_KEY
  }
  return obj
}

export default function apiFetcher (config) {
  const service = axios.create({
    timeout: 20000,
    withCredentials: true,
    ...config
  })

  /**
   * 请求全局拦截，每一个接口都需要覆盖提交的信息（如登录 token 等）可在此注入。
   * @param  {Object} config axios config
   * @return {Object}        axios config
   */
  service.interceptors.request.use(config => {
    config.headers = {
      ...config.headers,
      ...autoSetHeader()
    }
    return config
  }, error => {
    Promise.reject(error)
  })

  /**
   * 响应全局拦截，根据接口规范对相应状态作处理，
   * 全局异常状态码及提示内容可在这里配置。
   *
   * @param  {Object} response axios 响应对象
   */
  service.interceptors.response.use(response => {
    const res = response.data

    if (res.success === true) {
      return res
    } else {
      let message = ''

      if (Array.isArray(res.errorInfos) && res.errorInfos[0]) {
        const {code, msg} = res.errorInfos[0]
        message = `(${code}) ${msg}`
      } else if (res.message) {
        message = res.message
      } else {
        message = '未知错误。'
      }
      console.log(`[Error] 请求失败。url: ${response.request.responseURL}, message: ${message}`) // eslint-disable-line no-console

      return Promise.reject(res.errorInfos)
    }
  }, error => {
    let message = error.message

    if (message.match(/timeout of (\d*)ms exceeded/)) {
      message = '接口调用超时。'
    }

    console.log(`[Error] ${message}`) // eslint-disable-line no-console

    return Promise.reject(error)
  })

  return service
}
```

- 后端Java代码参考

> 调用不同的网关API，使用不同的GatewayComponent

[pps-gateway-utils调用网关API封装](http://192.168.1.122:3000/SKB_PPS/pps-gateway-utils)

```java
    /**
     * 棒谷网关人事接口调用
     */
    @Autowired
    private HMSGatewayComponent hmsGatewayComponent;

    @Value("${banggood.gateway.hms.url}")
    private String hmsUrl;

    public void test1() {
        String url = hmsUrl + "/GetUsers";
        hmsGatewayComponent.getForList(url, Object.class);
    }

    /**
     * 棒谷网关站点容器组织架构接口调用
     */
    @Autowired
    private HMSUserGatewayComponenet hmsUserGatewayComponenet;

    @Value("${banggood.gateway.hms-user.url}")
    private String hmsUserUrl;

    public void test2() {
        String url = hmsUserUrl + "/GetAAA";
        hmsUserGatewayComponenet.getForList(url, Object.class);
    }

    /**
     * 棒谷网关行政办公接口调用
     */
    @Autowired
    private HMSOfficeGatewayComponenet hmsOfficeGatewayComponenet;

    @Value("${banggood.gateway.hms-office.url}")
    private String hmsOfficeUrl;

    public void test3() {
        String url = hmsOfficeUrl + "/GetBBB";
        hmsOfficeGatewayComponenet.getForList(url, Object.class);
    }
```