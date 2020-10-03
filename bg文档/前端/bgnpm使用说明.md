# bgnpm 使用说明

## Nexus

对于一些用于公司内部的，不便于发布于 npm 上的包，可以通过发布到 Nexus 平台实现包的共享和复用。

平台首页： http://192.168.1.73:8081

## 使用方法

### nrm

通过 [nrm](https://github.com/Pana/nrm) 管理 npm 源地址：

```bash
# 1. 安装 nrm
$ npm install -g nrm

# 2. 添加 bgnpm
nrm add bgnpm http://192.168.1.73:8081/repository/bg_npm/ http://192.168.1.73:8081

# 3. 应用 bgnpm
nrm use bgnpm
```

### 发布

在 `package.json` 文件中指定 `publishConfig` 属性设置发布路径为内网地址：

```js
// package.json
{
  // ...
  "publishConfig": {
    "registry": "http://192.168.1.73:8081/repository/bg-npm-hosted/"
  }
  // ...
}
```

然后按常规流程使用 `npm publish` 发布即可。

__关于发布账号，目前没有个人账号，因此如果有发布要求，可通过代码审查后由上级进行发布。__

## 包命名规范

包名称使用 `-` 作为分词分隔符，字母全部使用小写，如： `bg-xt-namecard-list` 。

公司内部使用的包名称规则以 `bg-` 为前缀作为命名空间。视具体场景，如果不是通用辅助类的，可增加系统标识符标识该包的使用范围，如： `bg-[可选:系统标识符]-[包名]` 。

例： `bg-xt-namecard-list` 为 “协同系统” 中的名片组件。
