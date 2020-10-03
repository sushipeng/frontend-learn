---
layout: default
title: rap2安装部署
---

### rap的部署

rap2.0分成两个包，一个前端，一个后台。

从git上拉取源码：
[rap2后端：rap2-delos](https://github.com/thx/rap2-delos.git)
[rap2前端：rap2-dolores](https://github.com/fengbaozhiling/rap2-dolores)

需要配置的环境：
- node
- mysql

- 后端的配置

```js
module.exports = {
  version: '2.3',
  serve: {
    port: 4800 //服务端接口地址
  },
  keys: ['some secret hurr'], //前后端连接的
  session: {
    key: 'rap2:sess'
  },
  db: {
    dialect: 'mysql',
    host: 'localhost',
    port: '3306',
    username: 'root',
    password: '',
    database: 'RAP2_DELOS_APP',
    pool: {
      max: 5,
      min: 0,
      idle: 10000
    },
    logging: true
  }
}

```

进入rap2-dolores文件夹

- 输入命令 `npm install` 安装依赖包
- 输入命令 `npm start` 开启服务

```
----------------------------------------
DATABASE √
    HOST     192.168.1.203
    PORT     13306
    DATABASE RAP2_API_APP
----------------------------------------
Executing (default): SELECT 1+1 AS result
----------------------------------------
DATABASE √
    HOST     192.168.1.203
    PORT     13306
    DATABASE RAP2_API_APP
----------------------------------------
```

进入rap2-delos文件夹

- 输入命令 `npm install` 安装依赖包
- 输入命令 ` npm run build` 发布生产环境的包
- 可以用ngix或者其他web服务器开启服务，比如 `serve -s ./build -p 3102`，端口可改


```
   ┌───────────────────────────────────────────────────┐
   │                                                   │
   │   Serving!                                        │
   │                                                   │
   │   - Local:            http://localhost:3102       │
   │   - On Your Network:  http://192.168.1.206:3102   │
   │                                                   │
   └───────────────────────────────────────────────────┘                                               
```