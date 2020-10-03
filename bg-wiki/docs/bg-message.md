---
layout: default
title: 消息通知组件接入说明
---

针对于平台系统，使用消息通知组件，引入js模块，让平台系统接收消息后进行弹窗提示。这里说的平台系统是指OA、站点容器、协同系统、PMC等独立系统。

### 使用消息通知组件能做什么

- 接收指定信息，并针对指定个人进行弹窗通知。
- 系统的个人可以查看个人的消息列表。

### 平台系统如何接入消息通知组件

##### 第一步 申请系统标识符

    参考[系统标识](http://hello.banggood.cn/docs/naming-spec.html)，如果是独立系统，申请一个系统标识符。
	

##### 第二步 引入消息组件js文件


引入代码
```
<script src="https://content.banggood.cn/Content/lib/messagingInstant/instantMessaging.js"></script>
```
组件支持部分配置，具体用法及配置说明请查阅UED的[《消息组件文档》](http://192.168.1.102:801/document/2017/09/18/component/messagingInstant/)。

----

针对于业务系统，使用消息组件接口，可以对指定平台指定人员进行消息推送。

### 业务系统使用消息组件能做什么

- 对指定平台人员发送消息
- 可设置消息弹窗样式
- 消息详情实时推送及未读消息数推送
- 可自定义消息弹窗样式

### 业务系统使用消息通知接口

[接口文档](http://gateway.sellercube.com/#!/apis/ec2a4bd7-2170-418e-aa4b-d72170d18ec3/pages/a8d3f4e1-6069-4a22-93f4-e16069ea2206)

若调试请联系消息组件维护人员使用测试环境接口。

##### java项目组如何快捷使用接口

###### 在pom.xml中添加依赖

```
<dependency>
    <groupId>com.banggood</groupId>
    <artifactId>bg-message-sdk</artifactId>
    <version>1.0.0</version>
</dependency>
```

###### 在配置文件中添加消息服务器地址

```
// 测试环境
message.server-host=http://ppstest.banggood.cn:8096
```

###### 注入组件服务

```
@Autowired
private SendMessageComponet sendMessageComponet;
```

###### 使用sendMessage接口进行消息推送

```
try {
    
    // 下面为几个必填值， 其他可选按照需要进行设置
    MessageDTO messageDTO = new MessageDTO();
    messageDTO.setTitle("消息标题");
    messageDTO.setSummary("消息概要");
    messageDTO.setToAll(false);
    messageDTO.setToUserIds("27146");
    messageDTO.setCreatorUserId("27144");
    messageDTO.setLinkUrl("https://www.baidu.com");
    
    // 申请到的消息类型id和key
    String messageTypeId = "1234567890";
    String messageTypeKey = "abcdefghijk";
    
    sendMessageComponet.sendMessage(messageDTO, messageTypeId, messageTypeKey);
} catch (MessageException e) {
    
    // 其中异常情况主要为消息参数不匹配， 验签失败等
    e.printStackTrace();
}


```

##### .net项目组如何快捷使用接口

###### 封装好的类及使用示例

类路径：SellerCube.Service.App_Helper.CommonMessageComponentHelper
使用示例：
```
CommonMessageComponentHelper.MessageRequestBody body = new CommonMessageComponentHelper.MessageRequestBody() {
    appointSystem = "",
    content = "",
    creatorUserId = 0, // 0表示创建人为系统
    isAppoint = false,
    isSend = true,
    isShow = true,
    linkUrl = string.Format("{0}/SystemHtml/History/dist/html/historyListMsg.html?RxamineId={1}", System.Web.HttpContext.Current.Request.Url.GetSchemeHostPort(), productPurchaseReexamineId),
    openType = 3,  // 弹出新窗口显示
    summary = string.Format("您核查的[{0}]被设置为异常", productPurchaseReexamineList["ReSupplierName"].ValueToString()),
    title = "[异常核查]您有一条异常核查请及时处理",
    toAll = false,
    toUserIds = toUserId.ToString()
};

string errorMesaage = string.Empty;
bool result = CommonMessageComponentHelper.SendRequest(typeId, typeKey, body, out errorMesaage);
    
```
MessageRequestBody中各参数的详细说明在类的注释里已有。


###### 系统配置


    使用此类需要在系统配置（菜单：系统管理->系统设置->系统配置）里配置API（当前已配置） 
    模块代码：CommonMessageComponent
    节点：apiDomain 说明：Java消息组件的API地址
    
    测试地址：http://ticket.bg.banggood.cn:8096
    正式地址：https://notification.banggood.cn
    节点：actionName 说明：发送消息api方法名，固定值为：message/send


