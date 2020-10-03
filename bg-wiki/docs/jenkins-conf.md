---
layout: default
title: Jenkins CI for .NET
---

##  Jenkins持续集成说明    

Jenkins服务必须以管理员身份运行，在`服务`中，修改`登录身份`为管理员账号。

### windows jenkins乱码问题

在windows中jenkins默认使用的`GBK`编码,可通过`<jenkinsUrl>/systemInfo`，`sun.jnu.encoding`确认当前编码。

在`C:\Program Files (x86)\Jenkins\jenkins.xml`文件中，加入`JAVA_TOOL_OPTIONS`环境变量
```xml
<env name="JAVA_TOOL_OPTIONS" value="-Dsun.jnu.encoding=UTF-8 -Dfile.encoding=UTF-8"/>
```
### jenkins CAS单点登录配置

1. 进入`插件管理`：`<jenkinsUrl>/pluginManager/`
2. 搜索`CAS Plugin`并安装
3. 进入`Configure Global Security` 地址：`<jenkinsUrl>/configureSecurity/`
4. `访问控制`选择CAS

		CAS Server URL：https://cas2.banggood.cn/cas/
		CAS Protocol：CAS 3.0
		//下面的选项都不要勾

5. 进入jenkins安装目录 `config.xml`,配置`fullNameAttribute`,`emailAttribute`

```xml
<securityRealm class="org.jenkinsci.plugins.cas.CasSecurityRealm" plugin="cas-plugin@1.4.0">
    <casServerUrl>https://cas2.banggood.cn/cas/</casServerUrl>
    <casProtocol class="org.jenkinsci.plugins.cas.protocols.Cas30Protocol">
      <authoritiesAttribute>groups,roles</authoritiesAttribute>
      <fullNameAttribute>CnName1</fullNameAttribute>
      <emailAttribute>Email</emailAttribute>
      <proxyEnabled>false</proxyEnabled>
      <proxyAllowAny>false</proxyAllowAny>
      <proxyAllowList></proxyAllowList>
    </casProtocol>
    <forceRenewal>false</forceRenewal>
    <enableSingleSignOut>false</enableSingleSignOut>
    <enableRestApi>false</enableRestApi>
  </securityRealm>
```


### gitblit自动通知jenkins
`E:\gitblit-1.7.1\data\groovy\jenkins.groovy`
```groovy
def jenkinsUrl = gitblit.getString('groovy.jenkinsServer', 'http://112.74.132.152:8080')

// define the trigger url
//def triggerUrl = jenkinsUrl + "/git/notifyCommit?url=${url}/r/${repository.name}"
def triggerUrl = "http://localhost:8080/job/b2b2c/build?token=build&cause=post-receive"

def gitbookTriggerUrl = "http://localhost:8080/job/gitbook/build?token=gitbook&cause=post-receive"

def mobileTriggerUrl = "http://localhost:8080/job/mobile/build?token=mobile&cause=post-receive"

// trigger the build
new URL(triggerUrl).getContent()

new URL(gitbookTriggerUrl).getContent()

new URL(mobileTriggerUrl).getContent()
```
### 动态修改IIS网站物理路径    

由于构建的时候会动态产生一个Jenkins工作目录，因此需要将IIS网站物理路径修改为该目录，该工作目录也应该添加IIS_IUSRS,IUSR的完全控制权限   

### IIS权限授予

```cmd
ICACLS src\com.demo.Web /grant IUSR:F /grant IIS_IUSRS:F /T /C /Q
```

### IIS网站映射  

```cmd
cd %windir%\system32\inetsrv & appcmd set site /site.name: B2B2C  /[path='/'].[path='/'].physicalPath:%cd%\src\com.demo.Web
```



### 打包资源    

```cmd
cd /d "src\com.demo.Web" & build-assets-without-watch.cmd
```


### 配置MSBUILD 编译sln解决方案

    安装msbuild插件，以及最新版的msbuild以支持C#6.0

	
### 执行EF迁移    

```cmd
cd /d "src\com.demo.Web" & migrate.cmd
```
[migrate.exe文档](https://msdn.microsoft.com/zh-cn/data/jj618307.aspx)    

### (可选)发布到IIS    

```cmd
xcopy /Y /E "src\com.demo.Web" "E:\b2b2c_iis\web" /EXCLUDE:xcopy_uncopy.txt
```

### MSBUILD部署参数
```cmd
/p:DeployOnBuild=true /p:PublishProfile=zs_server /P:AllowUntrustedCertificate=true /P:CreatePackageOnPublish=True /P:UserName=administrator /P:Password=xxxx  /p:Configuration=Release /m:1 /fl2 /flp2:"verbosity=diagnostic"
```

	Set the "MSBuild arguments" property to the following: /m:1 /fl2 /flp2:"verbosity=diagnostic" The "/m:1" tells MSBuild not to build in parallel which can make the log easier to read. The other two parameters tell MSBuild to log to a file.
	
	<a href="https://msdn.microsoft.com/zh-cn/library/ms164311.aspx">MSBuild 命令行参考</a>

### msdeploy.exe 发布说明
`C:\Program Files\IIS\Microsoft Web Deploy V3\msdeploy.exe`    
<a href="https://technet.microsoft.com/en-us/library/dd568996(WS.10).aspx">Web Deployment Tool</a>
```cmd
"C:\Program Files\IIS\Microsoft Web Deploy V3\msdeploy.exe" -allowUntrusted -verbose -verb:sync -source:contentPath="%~dp0" -dest:auto,wmsvc="www.wwgoto.com:8172/msdeploy.axd?site=shop",userName='administrator',password='xxx' -skip:objectName=dirPath,absolutePath="node_modules"
```
