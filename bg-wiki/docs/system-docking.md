---
layout: default
title: 接入UPMS步骤指引
---

#  新系统接入UPMS步骤指引
------
注意：系统拥有一个或多个模块，一个模块拥有一个或多个权限；
## Step 1, 准备系统权限元数据接口
新系统开发者要接入upms需要提供系统元数据接口（metaUrl），在下一步新增系统的时候，upms会根据系统提供的metaUrl去获取系统权限数据并导入upms。
所以，新接入的系统需要按照upms提供的数据结构。
主要分为三个层级，第一层是系统的基本信息，第二module层，第三层是权限数据层permission
**解释：** upms解析一下json之后，会根据系统code找到对应的系统，然后把权限数据保存到数据库中。
数据库中权限表的必须字段有：systemId（根据传入的systemCode自动获取），moduleName（模块名称），moduleCode（模块编码），code（权限编码），name（权限名称），uri（资源定位符），requestMethod（请求方法，默认为GET），status（状态默认为1/激活）
```json
{
	"result": {
		"code": "Sellercube.Finance",
		"name": "财务系统",
		"modules": [{
			"code": "Sellercube.Finance.UserController",
			"name": "用户模块",
			"permissionVos": [{
				"code": "Sellercube.Finance.UserController.add",
				"name": "财务系统-用户模块-新增",
				"requestMethod": "POST",
				"uri": "/user/add",
				"status": "ACTIVE"
			},
			{
				"code": "Sellercube.Finance.UserController.update",
				"name": "财务系统-用户模块-修改",
				"requestMethod": "POST",
				"uri": "/user/update",
				"status": "ACTIVE"
			}]
		},
		{
			"code": "Sellercube.Finance.RevenueController",
			"name": "营收模块",
			"permissionVos": [{
				"code": "Sellercube.Finance.RevenueController.add",
				"name": "财务系统-营收模块-新增",
				"requestMethod": "POST",
				"uri": "/user/add",
				"status": "ACTIVE"
			},
			{
				"code": "Sellercube.Finance.RevenueController.update",
				"name": "财务系统-营收模块-修改",
				"requestMethod": "POST",
				"uri": "/user/update",
				"status": "ACTIVE"
			}]
		}]
	}
}
```

## Step 2, 新增系统
在upms前端页面的系统模块中点击新增系统,或者调用/sys/add接口，系统名称，系统编码以及系统的元数据接口地址是必填项。

**Notes:** 
添加系统，upms会根据系统提供的接口获取系统的权限数据；
更新权限数据，如果元数据接口有变化，只需要更新系统的元数据接口（metaUrl）/sys/update，然后点击同步按钮/sys/refresh-meta。
