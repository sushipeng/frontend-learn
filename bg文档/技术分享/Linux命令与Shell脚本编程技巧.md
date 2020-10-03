## Linux命令与Shello脚本编程技巧

> 控制级别： 内部分享资料

> 制定部门： 公共平台

> 演讲人： 林泽鹏


### Linux命令

#### 文件权限

- 权限信息

```
#第1位文件类型，2-4（所有者权限），5-7（用户组权限），8-10（其它用户权限）
```

![权限信息](http://static.oschina.net/uploads/space/2013/0316/152146_wusz_939336.png)

```
# u--指定用户权限 
# g--指定用户组权限
# o--指定其它用户权限
```

- 更改所有权

```
# 递归方式更改文件的所有者和所属组
chown user:group filename -R
```

- 更改文件权限

```
# 更改某个文件的执行权限
chmod u+x filename
```

- 查看文本内容

```
# 产生从某个数到另外一个数之间的所有整数
seq 10
# 打印前10行
head file
# 打印前4行
head -n 4 file
# 打印最后10行
tail file
# 打印最后4行
tail -n 4 file
# 监视文件
tail -f filename
```

#### 搜索文本（**grep**）

- 搜索文本

```
grep pattern filename
```

- 使用正则表达式

```
grep -E "[a-z]+" filename
# 或者
egrep "[a-z]+" filename
```

- 反向匹配

```
grep -v pattern filename
```

- 统计匹配行数

```
grep -c "text" filename
```

- 搜索多个文件并找出匹配文本位于某行

```
grep -l sample.txt sample2.txt
```

- 递归搜索文件

```
grep "text" . -R -n
```

- 忽略大小写

```
grep -i "HELLO" filename
```

- 匹配多个样式


```
grep -e "hello" -e "world" filename
```

- 指定或排除文件

```
# 指定只搜索java和xml文件
grep "hello" . -r --include *.{java,xml}
# 指定搜索除了README的其它文件
grep "hello" . -r --exclude "README"
```

- 打印文本之前之后

```
# 打印结果之后3行
seq 10 | grep 5 -A 3
# 打印结果之前3行
seq 10 | grep 5 -B 3
# 打印结果前后3行
seq 10 | grep 5 -C 3
```

#### 文件查找（**find**）

- 文件名搜索

```
# 搜索当前目录所有后缀名为java的文件
find . -name "*.java"
```

- 文件路径搜索

```
# 搜索路径包含src的文件
find . -path "*/src/*"
```

- 文件类型搜索

```
# 搜索当前目录下所有文件夹
find . -type d
```

文件类型|类型参数
---|---
普通文件|f
符号链接|l
目录|d
字符设备|c
块设备|b
套接字|s
FIFO|p

- 搜索并删除文件

```
# 搜索并删除当前目录下，所有后缀名为swp的文件
find . -type f -name "*.swp" -delete
```

- and条件

```
# 搜索当前目录下所有包含hello的文件并且是普通文件
find . -name "*hello*" -type f
```

- or条件

```
# 搜索当前目录下面的所有java或txt后缀的文件
find . \( -name "*.java" -o -name "*.txt" \)
```

- not条件

```
# 搜索当前目录下非java的文件
find . ! -name "*.java"
```

- find执行命令或动作

```
# 拷贝所有java文件到某个目录
find . -name "*.java" -exec cp {} /tmp/
```

- 补充：（按照权限、大小、时间等搜索）

#### xargs

> xargs命令是给其他命令传递参数的一个过滤器，也是组合多个命令的一个工具。

- 结合find使用xargs

```
# 以\0作为定界符，删除所有txt后缀的文件
find . -type f -name "*.txt" -print0 | xargs -0 rm -rf
```

#### 排序、唯一与重复

- 一组文件进行排序

```
# 对file1.txt,file2.txt进行合并排序
sort file1.txt file2.txt file3.txt
```

- 数字排序

```
# 按照数字进行排序，并且输出到sorted.txt文件
sort -n file1.txt -o sorted.txt
```

- 逆序排序

```
# 按照数字进行逆序排序，并且输出到sorted.txt文件
sort -rn file1.txt -o sorted.txt
```

- 去重

```
#排序后去重
sort file1.txt | uniq
```

- 按照列排序
```
#按照第1列排序
sort -k 1 data.txt
```

#### 文本替换

- sed（**流编辑器**）

```
sed 's/pattern/replace_string/' file
```

### Shello脚本编程

#### 基本使用

- 创建脚本文件

```
# 感叹号指定使用哪个Shell运行脚本
#!/bin/bash
```

- 引用一个变量值需要使用美元符，赋值不需要美元符

```
myValue="hello"
echo "myValue is $hello"
```

- 命令替换(**命令输出赋值给变量**)

```
# 反引号字符
myDate=`date`
# $()格式
myDate2=$(date)
```

- 重定向输入和输出

```
# 命令输出发送到一个文件
command > outputfile
# 输入内容定向到命令
command < inputfile
```

- 管道

```
# 一个命令的输出作为另一个命令的输入
cat filename | grep 'hello'
```

#### 结构化命令

- IF结构

```
# 根据if后面的命令的退出状态码（0代表执行正常），判断是否执行then后面命令
# 分号放在待求值的命令尾部，就可以跟then语句放在同一行
if command; then
    commands
elif command; then
    commands
else
    commands
fi
```

- test命令

```
# 方式1
if test conditon; then
    commands
fi
# 方式2，第一个方括号和第二个方括号之前必须加上一个空格
if [ conditon ]; then
    commands
fi
```

> 1. 数值比较

比较|描述
---|---
n1 -eq n2| n1是否与相等n2
n1 -gt n2| n1是否与大于n2
n1 -lt n2| n1是否与小于n2

>2. 字符串比较

比较|描述
---|---
str1 = str2|str1是否和str2相同
str1 != str2|str1是否和str2不同
str1 < str2|str1是否比str2小
str1 > str2|str1是否比str2大
-n str1|str1的长度是否非0
-z str1|str1的长度是否为0

>3. 文件比较

比较|描述
---|---
-f file|存在并且是一个文件
-d file|存在并且是一个目录
-e file|是否存在


- FOR结构

```
for test in A B C D; do
    echo "hello"
done 
```

#### 命令行参数

- 参数含义

```
# $0 程序名 $1 第一个参数 $2 第二个参数
./add 10 20 
```

- 字符串作为参数传递时，引号并非数据一部分，它们只是表明数据的起止位置


```
./test.sh 'hello world'
```

- 检查参数是否存在

```
if [ -n "$1" ]; then
    echo "hello $1"
fi
```

- 特殊表里$#表示命令行参数的个数

- $*和$@可访问所有的参数


#### 参考

[seq使用](https://www.cnblogs.com/mjbjtunlp/p/5813245.html)

[命令大全](http://man.linuxde.net/xargs)