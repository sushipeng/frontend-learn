---
layout: default
title: 内网包管理私服
---

#### 搭建私有仓库的目的是为了避免同事反复从公网下载依赖的dll，jar等，速度慢且影响效率和心情


------------
#### 自2019-02-13起,启用新的包私服配置

**代理配置（仅下载）**

maven 代理

	http://192.168.1.216:8081/repository/maven-public/

nuget代理

	http://192.168.1.216:8081/repository/nuget-group/

npm代理

	http://192.168.1.216:8081/repository/npm-public/

**托管配置（包上传）**

maven hosted

	http://192.168.1.216:8081/repository/maven-releases/
	
nuget hosted

	http://192.168.1.216:8081/repository/nuget-hosted/
	
npm hosted

	http://192.168.1.216:8081/repository/bg-npm-hosted/

------------



[棒谷Nexus](http://192.168.1.73:8081/)   `admin/admin123`

### docker配置nexus私服

	--insecure-registries 192.168.1.73:18003

```
  "insecure-registries": [
    "192.168.1.73:18001",  //docker官方镜像,[可选,只能pull]
    "192.168.1.73:18002", //阿里镜像,[可选,只能pull]
    "192.168.1.73:18003",  //阿里+docker官方的group,统一用这个,[推荐用这个,只能pull]
	"192.168.1.73:18004"  //这是hosted类型(托管),支持push镜像,推荐push第三方镜像到这上面,方便其他人下载
  ]
```
	docker login 192.168.1.73:18003
	username:admin
	passwrod:admin123
	
	docker pull 192.168.1.73:18003/toby82/k8s-dns-kube-dns-amd64-1.14.5

[去私服查看已存在的docker包 ->](http://192.168.1.73:8081/#browse/browse/components:docker_group)

小技巧:

1.搜索指定tag的镜像:    谷歌搜索 `storage-provisioner v1.8.1 site:hub.docker.com`


### VS 配置Nexus私服

`工具`，`选项`，`Nuget包管理器`,`程序包源`，添加公司内部私服

	http://192.168.1.73:8081/repository/nuget.org-proxy/

### 推送Nuget包设置

	nuget setapikey 65af78aa-de01-35bb-acb6-58740992d252 -source http://192.168.1.73:8081/repository/nuget-hosted/

从其它nuget仓库中迁移
```bat
nuget setapikey 65af78aa-de01-35bb-acb6-58740992d252 -source http://192.168.1.73:8081/repository/nuget-hosted/

for /R %%s in (*.nupkg) do nuget push %%s -source http://192.168.1.73:8081/repository/nuget-hosted/

pause
```
	
	
### Idea JAVA配置Nexus私服

`File`,`Settings`,搜索 `Maven`

	C:\Users\Administrator\.m2\settings.xml  (后面勾选Override)
	C:\Users\Administrator\.m2\repository (后面勾选Override)
	
在上面默认配置的路径下：`C:\Users\Administrator\.m2\settings.xml`，创建或者修改XML为以下内容：
	
```xml
<?xml version="1.0" encoding="UTF-8"?>
<settings
    xmlns="http://maven.apache.org/POM/4.0.0"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"    
    xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/settings-1.0.0.xsd">
    <mirrors>
        <mirror>
		  <id>skb</id>
		  <name>skb maven</name>
		  <url>http://192.168.1.73:8081/repository/maven-public/</url>
		  <mirrorOf>*</mirrorOf>        
		</mirror>
    </mirrors>
</settings>
```

### 前端npm配置

设置公司内网npm镜像

```
npm config set registry http://192.168.1.73:8081/repository/bg_npm/
```

上传仓库
```
#上传前先切换到专用上传地址
npm config set registry http://192.168.1.73:8081/repository/bg-npm-hosted/
npm publish

#上传后再切换到兼容淘宝，npm官方的专用代理地址
npm config set registry http://192.168.1.73:8081/repository/bg_npm/
```

[切换繁琐推荐使用nrm，注意该方式只在本地切换，跳过nexus不能在局域网上缓存](https://github.com/Pana/nrm)


Nexus有三种类型库，group可以关联多个库（多个proxy或者hosted），proxy是专用代理的（比如代理淘宝，npm官方，cnpm源等），hosted是仓库用于存公司自己的包。
我们上传时必须用hosted，下载时可以指定为group（包含多个proxy，hosted）
