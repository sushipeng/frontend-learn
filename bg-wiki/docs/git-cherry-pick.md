---
layout: default
title: Git cherry pick 操作说明
---

### Git cherry pick 操作说明

GIT分支合并会将源分支中的**所有**提交合并到目标分支,这在某些情况下并不满足我们的需求,
比如我们希望将源分支中**指定**的提交合并到目标分支中.此时应该执行`cherry-pick`操作.

下面举例从`master(超前分支)`中摘取指定的提交合并到`e分支(落后分支)`中

作者本地版本库现状:

`master`分支有提交(1,2,3)

`e`分支从master 1提交中创建,为落后分支.
![切换到目标分支](/docs/imgs/cherry-pick/1.png)

#### 1.切换到目标分支(本例为e分支)
查看目标分支(`e`)的日志,可以看到只有`提交1`
![查看目标分支日志](/docs/imgs/cherry-pick/2.png)

#### 2.在目标分支的日志信息中选择要合并的源分支
![选择合并的源分支](/docs/imgs/cherry-pick/3.png)

#### 3.在源分支中多选提交并摘取
![从源分支中摘取提交](/docs/imgs/cherry-pick/4.png)

#### 5.确认摘取的提交
![确认摘取的提交](/docs/imgs/cherry-pick/5.png)

#### 6.摘取完成,查看日志
![查看摘取完成日志](/docs/imgs/cherry-pick/6.png)

#### 7.验证目标分支变更
![验证目标分支变更](/docs/imgs/cherry-pick/7.png)

# 命令行操作
1. 切换到目标分支

2. `git log`

3. `git cherry-pick #提交编号`

![命令行操作](/docs/imgs/cherry-pick/8.png)
