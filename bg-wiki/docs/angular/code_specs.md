---
layout: default
title: 棒谷angular项目代码规范
---

# 棒谷angular项目代码规范

以下规范在用bang-cli生成项目的时候会将规范文档自动代入项目文档中；

如果对规范有建议，请在[bang-cli的git仓库](http://192.168.1.122:3000/erp-front-project/bang-cli)提工单，规范被采纳后，会在bang-cli的新的版本添加，并且通过update升级到各个项目；

## 开发规范

参考 [angular官方风格指南](https://angular.cn/guide/styleguide);


代码约束采用tslint来规范；配置在tslint.json；为了保证所有业务组开发采用同一套规范，不要去修改它；

另外，务必遵循以下规范：

### 文件夹命名

- 采用中划线命名方式，如文件夹`select－box`;

### 文件命名

- 文件命名分不同种类，在angular的项目中有：模块|module、服务|service、组件|component、指令|directive、管道|pipe、守卫|guard、枚举|enum;

这些种类的文件的命名，必须将它的类型作为后缀，如一个组件button,那么组件文件名应该为`ant-button.component.ts`，模板文件名：`ant-button.component.html`，样式同样如此命名，如果是scss文件：`ant-button.component.scss`

注：可以使用ng提供的生成器生成文件，如：ng component ant-button --flat=true;它将自动在你当前执行命令的目录生成组件类型的文件集；

- 组件模板最好单独写，除非很短，比如只有一行，否则都需要单独一个html文件

### 代码规范

- 引入第三方的模块时，angular模块放置于前面，后面依次是其他的依赖模块；本项目的其他依赖的引入放置于最后面；
- class 名称开头一律大写；采用驼峰式，如写一个api的服务，那么它的类名是：ApiService；一个文件只写一个类；命名要体现它是一个服务，还是一个组件，指令，或者是一个管道

- 每一个类、方法都需要写注释
- 暴露到外部的contant名称使用大写字母，使用下划线分割，如：`export const API_ROOT = environment.apiConfig;`; 在方法内使用的contant不做此要求，如`const b = 0;`；

- 组件和指令的规范，组件的selector名称前缀，默认提供四种：app|wgt|page|bgc;
	1. app整个应用的组件，在根模块使用；
	2. wgt，用于自定义布局的组件，命名如: wgt-container；
	3. page，用于页面 page-login；
	4. bgc，用于普通的业务组件  如 bgc-sail-list、bgc-sailed;
    指令必须是驼峰形式，比如: `wgtColor`
    组件必须是中划线形式，比如: `wgt-content`
    如果需要增加其他种类，可以在tslint.json的directive-selector、component-selector新增规范，但是不要太多，避免五花八门的命名导致模版很难阅读；

- 组件的输入属性和输出属性使用驼峰方式命名：`@Iutput() tabTitle`，且写在同一行内；

- 在写类的时候，初始化的属性声明、@Iutput和@Output属性必须写在constructor之前；方法写在constructor之后；生命周期的方法，放于普通的方法之前；
例如下面的服务类的顺序：

```ts
// angular依赖放置于前排
import {
  Injectable,
  Inject
} from '@angular/core';
import { HttpParams, HttpClient, HttpHeaders } from "@angular/common/http";
import {
  Http,
  Response,
  RequestOptions,
  RequestOptionsArgs,
  Headers,
  Request,
  URLSearchParams
} from '@angular/http';
// rxjs等第三方放置于angular之后，分组排放
import {
  Observable
} from 'rxjs/Observable';

// 项目内的引用放置于最后
import { CookieService } from './cookie';
import { ApiConfig, ApiUrl } from './config.api';


class ApiService {
    baseUrl = ''; //注意，如果成员属性的类型是已经确定的，不需要写类型，如：baseUrl: string = ''，是错误的
    apiUrl:ApiUrl;
    // constructor之前，声明类的成员属性
    constructor( private http: HttpClient, private cookieSer: CookieService,private apiConfig: ApiConfig ) {
        // 在constructor中不要做太复杂的初始化操作，如异步请求数据等等
        // 这里适合做一些比较简单的赋值、初始化数据；
        this.apiUrl = this.apiConfig.getApi() //此非异步操作
    }
    /* 方法放置于constructor之后*/
    setBaseUrl (url: string) {
        this.baseUrl = url;
        return this;
    }
    ...
}
```

例如下面的组件类，参考如下的顺序：

```ts
/* angular的依赖引入放置于最前排 */
import { Component, OnInit, Input, OnDestroy, HostListener, ElementRef } from '@angular/core';
/* 其他的依赖引入位于第二排 */
import { element } from 'protractor';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/debounceTime';

@Component({
  selector: 'ant-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.less']
})
export class ButtonComponent implements OnInit, OnDestroy {
    //constructor 前面的成员属性的顺序
    _size = '';
    _loading: string;
    _icon: string | boolean;
    clicking: string; // 没有赋值，所以必须写类型
    _disabled = false; // 明确的值，无须写类型
    // 种类：primary | dashed | danger | default
    @Input() public type = 'primary';
    // 按钮尺寸: large | default | small
    @Input() public size = '';
    @Input() public ghost: string;
    @Input() public shape = '';
    /**
    * value 可能的值 boolean / { delay: number }
    * @memberof ButtonComponent
    */
    @Input() public set loading(value) {
        if (!value) {
            return;
        }
        if (value && (typeof value === 'string' || value === true)) {
            this._loading = 'true'
            return;
        }
        if (value && typeof value === 'object') {
            setTimeout(() => {
            this._loading = 'true';
            }, value.delay)
        }
    };
    @Input() public set disabled(value) {
        if (value && value === 'true') {
            this._disabled = true;
        } else {
            this._disabled = false;
        }
    }
    @Input() public set icon(value) {
        if (!value) {
            this._icon = false
            return;
        }
        this._icon = 'anticon-' + value
    };
    constructor( private _element: ElementRef) {

    }
    ngOnInit() {
        Observable.fromEvent(this._element.nativeElement, 'click').debounceTime(200).subscribe(data => {
            this.changeClicking();
        });
    }
    /* 生命周期的方法，放置于普通的方法之前 */
    ngOnDestroy() {
    }
    changeClicking() {
        if (this._loading === 'true') {
            return
        }
        this.clicking = 'true';
        setTimeout(() => {
            this.clicking = 'false';
        }, 400)
    }
}
```

## 第三方模块引入规范

如果需要引入第三方模块，必须单独引入模块，杜绝整个模块的引入；

```javascript
import { NzButtonModule } from 'ng-zorro-antd'// 引入按钮模块

@NgModule({
    imports: [ NzButtonModule],//在你当前开发的模块中引入模块
    exports: [],
    declarations: [],
    providers: [],
})
```



更多内容请参考：[angular官方风格指南](https://angular.cn/guide/styleguide);
