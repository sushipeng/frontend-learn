---
layout: default
title: 服务器安装WebDeploy
---

##### 以下步骤必须是在Windows Server上进行

* 安装 `\\192.168.2.1\共享文件\共享工具\IIS\WebDeploy.3.5_amd64_zh-CN.msi` (`此步骤不得跳过`)

* 安装 `\\192.168.2.1\共享文件\共享工具\IIS\WebDeploy.3.6_amd64_zh-CN.msi`

```
注意: 安装向导中功能需全部安装,不要留叉.
MSI安装失败可能原因：
https://support.asperasoft.com/hc/en-us/articles/216126168-Connect-plugin-MSI-installation-error-1720-

需要打开CMD依次执行：

cd %windir%\System32\Wbem
for %i in (*.dll) do RegSvr32 -s %i
regsvr32 -s scrcons.exe
```

* `Win`+`R`打开运行,输入`cmd`打开命令行(必须是`管理员身份`)

```
ServerManagerCmd.exe -install Web-Mgmt-Service -restart & net start WMSvc
```
以上命令会安装Web管理服务.

* 运行,`inetmgr`打开IIS,选中当前服务器节点,右侧的`管理服务`

* 点击`停止`,勾选`启用远程连接`,`仅限于Windows凭据`,再启动.

```
如验证时返回403则是因为未启用远程连接!!
```

##### 服务验证

* 运行,`services.msc`,打开`服务`

* 检查 `Web Management Service` 应该自动启动

* 检查 `Web 部署代理服务` 应该自动启动

* `Web Management Service`服务默认以`本地服务`身份运行，特别注意要给IIS网站目录的`LOCAL SERVICE`设置完全控制权限，否则发布时会失败，且未知原因！！！！！！！！

##### 浏览器验证

* 打开浏览器

* 输入 `https://127.0.0.1:8172/msdeploy.axd`

* 浏览器会弹出`身份验证对话框`(有可能被拦截,显示连接不安全,忽略`继续访问`即可)

##### 一旦验证失败(返回404)则需要卸载WebDeploy重新安装!


# 服务器设置自动备份

*以下操作仅可在安装过webdeploy的win server上执行*

[**官方文档**](https://www.iis.net/learn/publish/using-web-deploy/web-deploy-automatic-backups)

* 资源管理器打开 `%programfiles%\IIS\Microsoft Web Deploy V3\scripts\`

* 按住`shift`右击，"在此处打开命令窗口"

* 在新的命令窗口中输入`powershell`

* `set-ExecutionPolicy RemoteSigned` 并选择`Y`

*  `. .\BackupScripts.ps1` （必须加载ps脚本才能进行后续操作）

* `TurnOn-Backups -On $true` （打开备份）

* `Configure-Backups -Enabled $true`（打开全局备份行为）

* `Configure-Backups -NumberOfBackups 10` (这个10代表保留最近10个备份)

* `Configure-Backups -ContinueSyncOnBackupFailure $false` （备份失败时终止发布）

# 网站还原

在启用`webdeploy自动备份`后，每使用`webdeploy`发布后会默认在网站的同级目录产生一个`xxx_snapshots`的文件夹，该文件夹内包含了备份归档文件。

#### 恢复到最后一个备份

	%ProgramFiles%\IIS\Microsoft Web Deploy V3\msdeploy.exe -verb:sync -source:backupManager -dest:backupManager=<siteName>,useLatest=true
	
#### 恢复最后一个备份，使用Skip选项跳过App_Data覆盖
	%ProgramFiles%\IIS\Microsoft Web Deploy V3\msdeploy.exe -verb:sync -source:backupmanager -dest:backupmanager=<siteName>,uselatst=true -skip:xpath=dirPath[@path='App_Data']
	
#### 删除一个站点备份
	%ProgramFiles%\IIS\Microsoft Web Deploy V3\msdeploy.exe -verb:delete -dest:backupManager=<siteName>/<backupFileName>