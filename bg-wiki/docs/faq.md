---
layout: default
title: 常见问题
---

### 常见问题答疑


#### webapi 接口返回500怎么办?

答:查看 com.demo.Web 下的 Logs 内的日志文件


#### 写了服务但发现没有动态生成WebApi接口怎么办？

答：检查您的服务接口是否继承了Abp.Application.Services.IApplicationService，如下所示：

    public interface IProductAttributeAppService:Abp.Application.Services.IApplicationService
	
	
#### 迁移完成后,仍然报 `No language defined!` 怎么办?

答: 重启下IIS


#### 如何快速的查找JS中对象定义所在的文件位置?

答：IE、edge下，按F12打开调试工具，选择`调试程序`，在右上角有一个不显眼的搜索框，在此搜索框中搜索JS对象名称，
	不停的点下一个，直到出现为止。    
	Chrome下(**建议**):    
	![Chrome搜索全部文件](/docs/imgs/search-all-files.png)
	
	
#### Automapper进行对象映射时,如何自定义映射?     
答: 可以使用`Flattening(压扁)`功能,如果将A映射到B,B中有一个属性为 Ids, 但A中只有 xxxConlletion,并没有id数组,因此可以在A中定义一个方法 `GetIds`,源对象的`Get`前辍方法会被
	Automapper自动调用,尝试为目标对象中的Ids赋值!