---
layout: default
title: 标识规范
---
### 适用范围
1. JAVA包名
2. Maven模块名
3. 网关Group名
4. Gogs组织名，项目名
5. RabbitMQ vhost
6. YAPI,RAP中的分组及项目
7. 其它需要分组和项目标识的情况

### 系统标识符

|  系统名称 | 标识符  |
| ------------ | ------------ |
|  仓储管理系统 | ewms  |
|  OA | oa  |
|  站点容器 | oa2  |
|  用户权限系统 | upms |
|  协同系统 | xt |
|  PMC 物料生产系统 | pmc |
|  客服CRM系统 | CRM |
|  物流TMS系统 | TMS |

### 开发组织命名

|  组织 | 代号  |
| ------------ | ------------ |
|  PMC | pmc  |
|  财务 | fit  |
|  供应链 | scm  |
|  销售系统 | sp  |
|  公共平台 | pps  |
|  仓储 | ewms  |
|  广告 | ad  |
|  架构 | arch |
|  物流 | tms |
|  客服 | crm |

### 项目类型后辍

|  类型 | 后辍  |
| ------------ | ------------ |
|  项目根 | parent  |
|  前端 | Web  |
|  后端服务 | Services/API  |
|  windows服务 | Winsvc  |
|  定时任务 | Job  |
|  脚本集 | Scripts  |
|  文档 | Doc  |
|  示例 | Samples  |
|  sdk | SDK  |
|  工具类 | Tool  |
|  桌面应用 | GUI  |
|  前端组件库/框架等 | Framework  |

比如项目代号为`Elephant`  

GIT仓库项目根：`Elephant-parent`(里面包含了`Elephant-Web`，`Elephant-API`两个[GIT子模块](https://git-scm.com/book/zh/v1/Git-%E5%B7%A5%E5%85%B7-%E5%AD%90%E6%A8%A1%E5%9D%97))

GIT仓库前端：`Elephant-Web`

GIT仓库后端：`Elephant-API`
