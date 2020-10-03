---
layout: default
title: ceph使用规范
---

# ceph使用规范
## 1引言
### １.１ 文档目的
 本文制定统一ceph使用规范，规范ceph使用，以保证线上ceph环境的安全稳定
### １.２ 适用对象
本文档适用于所有开发人员、运维人员等相关技术人员使用。
## ２使用规范
### ２.１使用方式：
目前仅开放Rados gateway方式给应用调用
### ２.２存储文件类型及大小
- 大小：100M以下
- 类型：Office格式支持:XLS（xls）、XLSX（xlsx）、WPS(wps)、PPT（ppt）、PPTX（pptx）、DOC (doc)、DOCX（docx）、ET(et)、DPS(dps)
- 文本格式支持：TXT(txt)、PDF(pdf)、HTML(html)、HTM(htm)、HLP(hlp)、DLL(dll)、VSDX(vsdx)、XMIND(xmind)、MD(md)、CHM(chm)、
- 压缩格式支持：ZIP(zip)、RAR(rar)、JAR(jar)
- 图片格式支持：PSD(psd)、PNG(png)、PIC(pic)、JPG(jpg)、ICO(ico)、GIF(gif)、BMP(bmp)、EPS(eps)、JPEG(jpeg) 
- 待定：rp、vsd视频等格式
- 禁止上传可执行文件；目前禁止视频文件上传（以后是否开放视情况而定）

### ２.３业务场景
   主要应用于内部文档共享。关于产品图片有专门的线上图片服务器及原图服务器可供使用。
### ２.４预览加载方式
   延时加载。可分页文档要采用分页式延时加载，减小带宽压力。
### ２.５分项目申请ceph帐号
   目前使用ceph的项目有协同系统，后面如果有项目需要使用ceph单独申请帐号
### ２.６目录层次
  尽可能减少根目录 的文件存放数，目录层次建议不要超过3层，不使用中文目录

### ２.７需求审核
   公司未来的有关ceph使用的项目需求需要运维参与一起制定技术方案。