### swagger文档规范

#### 前言
##### 编写目的

    该文档编写目的为统一接口文档的编写方式。

##### 预期读者

    本文档的阅读对象,负责软件设计与实现的软件开发的前后端人员、测试人员。

##### 参考资料

1. [swagger官方文档](https://swagger.io/)
1. [sosoapi接口文档](http://www.sosoapi.com/pass/apidoc/demo.htm)

#### 接口格式风格

- 请求路径、请求参数，响应参数，必须使用蛇形风格

![参数风格](http://192.168.1.122:3000/SKB_PPS/pps-doc/raw/d21786143e3fe5086af3b76b70826ce3d8bb4319/images/swagger/swagger-data-formate.png)

- @GetMapping（ GET方式请求）参考如下：

```
    @GetMapping(value = "/get_user", produces = MediaType.APPLICATION_JSON_VALUE)   
    public UserVO getUser(@RequestParam String username, String email) {
        return new UserVO();
    }
```
-  @PostMapping（POST请求方式），参考如下：

```
    @PostMapping(value = "/add_user", produces = MediaType.APPLICATION_JSON_VALUE)
    public UserVO addUser(@RequestBody UserDTO userDTO) {
        return new UserVO();
    }
```

- 响应数据格式为JSON，注解参数需配置：

```
    produces = MediaType.APPLICATION_JSON_VALUE
```

#### 请求参数

##### KV参数方式

- 用于GET方式请求（主要是查询接口）
- 格式：http://www.banggood.com/get_user?user_name=zpeng&email=linzepeng@banggood.com

```java
    @ApiOperation(value = "获取用户信息", notes = "根据用户名，获取用户获取详情，查询不到则返回空。")
    @ApiImplicitParams({
    @ApiImplicitParam(name = "user_name", value = "用户名", required = true),
    @ApiImplicitParam(name = "email", value = "邮箱") })
    @GetMapping(value = "/get_user", produces = MediaType.APPLICATION_JSON_VALUE)
    public UserVO getUser(@RequestParam String user_name, String email) {
        return null;
    }
```

- KV参数请求方式例子

![](http://192.168.1.122:3000/SKB_PPS/pps-doc/raw/635fabc3bb5b9df7fed1b5f7c1f624e5cbc460a5/images/swagger/swagger-get-request.png)


##### JSON参数方式

- 用于POST方式请求（主要是新增、编辑接口）

```java

    @ApiOperation(value = "新增用户", notes = "新增用户成功，则返回该用户信息，失败则返回空")
    @PostMapping(value = "/add_user", produces = MediaType.APPLICATION_JSON_VALUE)
    public UserVO addUser(@RequestBody UserDTO userDTO) {
        return new UserVO();
    }
```

- @ApiModelProperty(value = "字段名"，allowableValues = "字段范围" required = "是否必填")

```
@Getter
@Setter
@JsonNaming(PropertyNamingStrategy.SnakeCaseStrategy.class)
public class UserDTO {

    /**
     * 用户名（必填）
     */
    @ApiModelProperty(value = "用户名", allowableValues = "range[10, 32]", required = true)
    private String userName;

    /**
     * 用户类型（必填）
     */
    @ApiModelProperty(value = "用户类型", allowableValues = "管理员：1,普通用户：2", required = true)
    private String userType;
    
    /**
     * 邮箱（必填）
     */
    @ApiModelProperty(value = "邮箱", allowableValues = "range[10, 32]", required = true)
    private String email;

    /**
     * 部门名称
     */
    @ApiModelProperty(example = "string,部门名称")
    private String departmentName;
}
```

- JSON方式请求例子

![](http://192.168.1.122:3000/SKB_PPS/pps-doc/raw/8e2fed9709d3d5563b3201036544bdb9ce104d7e/images/swagger/swagger-post-request.png)


#### 响应参数（JSON格式）

- @ApiModelProperty(value = "字段名称") 

```
    @Getter
    @Setter
    public static class PermSearchVO {
        /***
         * 系统编码
         */
        @ApiModelProperty(value = "系统编码")
        private String code;

        /***
         * 系统描述
         */
        @ApiModelProperty(value = "系统描述")
        private String description;

        /***
         * 系统模块
         */
        @ApiModelProperty(value = "系统模块列表")
        private List<PermModuleVO> modules;
    }

    @Getter
    @Setter
    public static class PermModuleVO {
        /***
         * 模块编码
         */
        @ApiModelProperty(value = "模块编码")
        private String code;

        /***
         * 模块名称
         */
        @ApiModelProperty(value = "模块名称")
        private String name;

        /***
         * 模块权限列表
         */
        @ApiModelProperty(value = "模块权限列表")
        private List<PermissionVO> permissionVOS;
    }

    @Getter
    @Setter
    public static class PermissionVO {
        /***
         * 系统ID
         */
        @ApiModelProperty(value = "系统ID")
        private String systemId;

        /***
         * 权限ID
         */
        @ApiModelProperty(value = "权限ID")
        private String permissionId;

        /***
         * 权限名称
         */
        @ApiModelProperty(value = "权限名称")
        private String name;

        /***
         * 权限编码
         */
        @ApiModelProperty(value = "权限编码")
        private String code;

        /***
         * 是否有权限
         */
        @ApiModelProperty(value = "是否有权限")
        private Boolean isEnable = Boolean.FALSE;

    }
```

- JSON响应例子

![](http://192.168.1.122:3000/SKB_PPS/pps-doc/raw/931e793b13109bcfd445c849fc96dc18a20eb518/images/swagger/swagger-response.png)


#### 错误码

-  @ApiResponse(code = 错误码, message = "错误提示信息")

```
    @ApiResponses({ @ApiResponse(code = 601, message = "用户名已存在"), })
```

- 错误码例子

![](http://192.168.1.122:3000/SKB_PPS/pps-doc/raw/15cc41fa7c43550c2430ceed5d0b87e830e1eee4/images/swagger/swagger-error.png)


#### 生产环境禁用swagger文档

- 配置文件：application-beta.yml

```
    swagger.enable: false
```

- 版本要求：pps-common-utils-2.0.101及以上：

```
    <dependency>
        <groupId>com.banggood.pps</groupId>
        <artifactId>pps-common-utils</artifactId>
        <version>2.0.101</version>
    </dependency>
```