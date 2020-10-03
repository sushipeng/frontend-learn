---
layout: default
title: K8S管理规范
---

# k8s集群Namespaces 创建管理机制和结构

为了规范k8s集群的使用，暂约定以下管理机制和结构：
1. 为便于维护，Namespaces 应由运维人员创建、删除和修改；
2. Namespaces的命名应遵循：发布环境-项目组英文简称 的方式，如公共平台的开发环境的为：dev-pps
3. 开发、测试人员在使用Namespaces时，应按照项目的实际，使用已存在的Namespaces，如现有Namespaces无法满足，需联系运维人员添加；
4. 开发、测试、运维可使用的Namespaces如下，原则上，各角色应在其对应Namespaces内操作：

## 开发


|  namespaces | 名称  | 备注  |
| ------------ | ------------ | ------------ |
|  dev-common | 公共应用开发环境   |   |
|  dev-arch-research  |  架构预研开发环境 |   |
|  dev-arch | 架构开发环境  |   |
|  dev-ad | 广告开发环境  |   |
|  dev-ewms | 仓储开发环境  |   |
|  dev-pps  |  公共平台开发环境 |   |
|  dev-sp | 销售开发环境  |   |
|  dev-scm | 供应链开发环境  |   |
|  dev-fit | 财务开发环境  |   |
|  dev-pmc  | PMC开发环境  |   |
|  dev-tms  | 物流开发环境  |   |


## 测试


|  namespaces | 名称  | 备注  |
| ------------ | ------------ | ------------ |
| test-common  | 公共应用测试环境  |   |
| test-arch-research  | 架构预研测试环境   |   |
| test-arch | 架构测试环境   |   |
| test-ad | 广告测试环境   |   |
| test-ewms  | 仓储测试环境  |   |
| test-pps  | 公共平台测试环境  |   |
| test-sp  | 销售测试环境   |   |
| test-scm  | 供应链测试环境  |   |
| test-fit |  财务测试环境 |   |
| test-pmc | PMC测试环境  |   |
| test-tms | 物流测试环境  |   |



##  运维

|  namespaces | 名称  | 备注  |
| ------------ | ------------ | ------------ |
| kube-system | 系统使用  |  业务服务不允许使用 |
| kube-public | 系统使用 | 业务服务不允许使用  |
| deafult | 系统默认  | 业务服务不允许使用  |
| beta-common | 公共应用预发布环境  |   |
| beta-arch-research   | 架构预研预发布环境   |   |
| beta-arch  | 架构预发布环境  |   |
| beta-ad  | 广告预发布环境  |   |
| beta-ewms  |  仓储预发布环境 |   |
| beta-pps   | 公共平台预发布环境    |   |
| beta-sp | 销售预发布环境  |   |
| beta-scm  |  供应链预发布环境 |   |
| beta-fit  |   财务预发布环境 |   |
| beta-pmc |  PMC预发布环境 |   |
| beta-tms |  物流预发布环境 |   |
| prod-common | 公共应用生产环境  |   |
| prod-arch-research  | 架构预研生产环境  |   |
| prod-arch  |  架构生产环境 |   |
| prod-ad | 广告生产环境  |   |
| prod-ewms | 仓储生产环境  |   |
| prod-pps  | 公共平台生产环境  |   |
| prod-sp  |  销售生产环境 |   |
| prod-scm  | 供应链生产环境  |   |
| prod-fit | 财务生产环境  |   |
| prod-pmc   |  PMC生产环境 |   |
| prod-tms   |  物流生产环境 |   |


