---
layout: default
title: AngularJS 问题解答
---

### AngularJS 常见问题解答

#### angularjs中修改了`$scope`,UI没有变化？     

答：ng之所以能检测变化是因为$scope的变化始终在ng调用链中(ng能保证在ng调用链中会watch到)，如果在修改$scope时用的是第三方组件，
	则打断了调用链，因此需要调用`ngSafeApply($scope);`
	
#### radio中传给后端的值为什么是字符串的 "true"/"false" ?     

答：radio中必须使用`ng-value="false"`来表明它的值，而不是`value`

#### select 中使用了ng-model 为什么不能默认选中？    
答：    

该问题常见于使用`option`和`ng-repeat`的方式

```html
<select ng-model="model.brandId" class="form-control inputw300">
    <option selected="selected" value="">--请选择--</option>
	<option ng-repeat="brand in brands" value="{{brand.id}}">{{brand.name}}</option>
</select>
```		
由于默认ng并不知道id为int类型，ng隐式认为`brand.id`是`string`类型，而`ng-model`是严格相等的（`===`）,因此默认选中不了
应该将id转为`number`类型，正确方式为：    	
					
```html
<select ng-model="model.brandId" class="form-control inputw300" ng-options="+(brand.id) as brand.name for brand in brands">
   <option selected="selected" value="">--请选择--</option>
</select>
```