---
layout: default
title: 棒谷angular项目规范
---

# 棒谷angular项目规范

* [bang-cli构建器](./bang-cli.md)

* [angular代码规范](./code_specs.md)

* [angular学习资料](./index.md)


# angular 子目录部署 

如果要在angular app部署在子目录则需要如下配置：

```
# GET : http://127.0.0.1:28087/ab/home

location /ab {
            alias   F:\fe\angular-questionnaire\frontend\dist;
			try_files $uri $uri/ /ab/index.html;
        }
```