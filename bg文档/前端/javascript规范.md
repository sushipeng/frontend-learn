# javascript 规范

## 编码规范

### ESlint

使用 Eslint 进行代码风格检查。

    官网： https://eslint.org/  
    中文： http://eslint.cn

使用：

- 配置： http://eslint.cn/docs/user-guide/configuring
- 命令行： http://eslint.cn/docs/user-guide/command-line-interface
- 规则一览： http://eslint.cn/docs/rules/

__原则上旧有代码若不是直接迁移至新建项目中使用，则不强制使用 ESlint ，依然沿用各自原有风格。__

### 代码风格

使用 《JavaScript Standard》 代码风格。

规范主页： https://github.com/standard/standard/blob/master/docs/README-zhcn.md

规范规则细则： https://github.com/standard/standard/blob/master/docs/RULES-zhcn.md

### .eslintrc

结合 [eslint-config-standard](https://github.com/standard/eslint-config-standard) 和 [eslint-plugin-standard](https://github.com/xjamundx/eslint-plugin-standard) 使用 `.eslintrc` 配置文件。

对于 “Standard” 风格中有需要个性化配置的可在 `.eslintrc` 内配置，但建议自定义配置项尽可能少以保证编码风格统一。

如果需要支持 ECMAScript 的新特性的 lint ，可以通过配置 [babel-eslint](https://github.com/babel/babel-eslint) 解析器，具体可查看 《[如何才能使用处于实验阶段的 javascript 特性譬如 es-next](https://github.com/standard/standard/blob/master/docs/README-zhcn.md#如何才能使用处于实验阶段的-javascript-特性譬如-es-next)》 小节。

### 其他

Vue.js 项目使用 [vue-cli](https://github.com/vuejs/vue-cli) (webpack) 初始化，并在 `lintConfig` 一项选择 `Standard` 即可。

对于 jQuery 控件开发，可使用 [bg-pps-jquery-template](http://192.168.1.122:3000/UED/bg-pps-jquery-template) 提供的样板文件，已集成相关配置。

### 建议

对于 `console` 和 `debugger` ，只在开发过程中使用，上线打包需要去掉，避免正式环境上控制台打印出开发过程的调试信息，或进入无必要的断点。

`console` 可允许使用 `error` 或 `warn` 类型，在没有前端上报异常机制下，于控制台中抛出异常信息方便排查问题。

```js
{
  'rules': {
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    // allow console during development
    'no-console': process.env.NODE_ENV === 'production' ? ['error', { allow: ['warn', 'error'] }] : 0
  }
}
```