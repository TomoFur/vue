# vue基础第一天总结

## 基本代码结构

```javascript
var app = new Vue({
    el:'#app',//------------------>el表示cue实例要控制的区域，对应于MVVM中的V
    data:{},//----------->在该实例控制区域中的数据，对应MVVM中的M
    methods:{}
})
//整个vue实例对应MVVM中的VM。
```

## 插值表达式，v-text，v-html

```javascript
插值表达式:{{ 变量 }}//--------->在变量替换的时候只会换掉自己的占位符。网络不好的时候存在闪烁问题
```

```html
<p v-text='变量'>
    //p标签中的原有的内容会被v-text所绑定的变量的值完全替换
</p>
```

```html
<p v-html='变量'>
    //效果和v-text但是与v-text的区别是，如果该变量的值包含有html标签，v-html会将这些标签解析后渲染成真正的标签在页面上，而v-text只会将这些标签看为普通的字符输出。
</p>
```

## v-bind

是vue中用于绑定属性的指令

```html
<p v-bind:属性名='变量或者表达式'>
    //告诉浏览器属性名后面的引号中不是字符串，而是变量，如果是表达式，会将表达式执行。
</p>
```

**注意**

```html
v-bind指令有简写形式，为：
<p :属性名='变量名或者表达式'>
    
</p>
```

## v-on

是vue中用于为标签绑定事件处理的指令

```html
<p v-on:事件名='事件处理函数名'>
    //通过v-on形式绑定的事件处理函数，要在vue实例中的methods中声明，否则会报错
</p>
```

**注意**

```html
v-on存在简写形式，为：
<P @事件名='事件响应函数名'>
    
</P>
```

## vue事件修饰符

```php+HTML
stop:阻止事件冒泡
<div @click='事件处理函数'>
    <p @click.stop='事件处理函数'>
    
	</p>
</div>
如果没有stop这个事件修饰符，在点击p标签的时候，外面的div上面绑定的点击事件也会被触发
```

```php+HTML
prevent:阻止默认事件
<a href='xxx' @click.prevent='事件处理函数'>Click</a>
html中a标签自带默认事件即点击后会自动跳转，prevent就时为了阻止这种情况的发生
```

```php+HTML
capture:将事件流从事件冒泡变为事件捕获
<div @click.capture='事件处理函数'>
    <p @click='事件处理函数'>
    
	</p>
</div>
这样，在点击p标签的时候，是外部div的点击事件先触发，内部p标签的点击事件之后触发
```

```php+HTML
self:只当事件在该元素身上触发时才会触发，不会因为事件冒泡或者事件捕获而触发
<div @click='事件处理函数'>
    <p @click.self='事件处理函数'>
    	<a href='#' @click='事件处理函数'></a>
	</p>
</div>
这样，在点击a链接时，由于存在事件冒泡，所以最外层的div的点击事件会被触发，但是p标签的点击事件不会被触发。
```

## v-model

是vue提供的，用于双向数据绑定的指令

```php+HTML
<input type='text' v-model='变量'>
1.v-model一般只用在表单元素上
2.使用v-model绑定的变量都需要在vue实例中的data中先声明才可以

```

## vue中的样式

```php+HTML
.class1{
	xxx //样式1
}
.class2{
	xxx //样式2
}

<h1 :class=['class1','class2']>
    
</h1>

1.这些需要绑定的样式都需要先在<style></style>中预先定义好
2.需要使用v-bind：class进行绑定
```

## v-for

### 循环普通数组

```php+HTML
<li v-for='item in list'>{{ item }}</li>


var app = new Vue({
	el:'#app',
	data:{
		list:[]
	}
})
```

### 循环对象数组

```php+HTML
<li v-for='item in list'>属性：{{ item.key }}----->值{{ item.value }}</li>


var app = new Vue({
	el:'#app',
	data:{
		list:[
            {
                key1:value1,
                key2:value2
            },
            {
                key1:value1,
                key2:value2
            }
		]
	}
})
```

### 循环对象

```php+HTML
<li v-for='(value,key) in obj'>属性：{{ key }}----->值{{ value }}</li>


var app = new Vue({
	el:'#app',
	data:{
		obj:{
                key1:value1,
                key2:value2
            },
	}
})
```

### 迭代数字

```
<li v-for='index in 10'>{{ index }}</li>

1.这里的index从1开始，会生成10个li
```

**注意**

+ 在哪个标签上绑定了v-for，将来就会循环生成若干个该标签

+ 建议在标签上使用v-for时，也绑定一下key,绑定key的时候，需要使用v-bind指令。

  ```html
  <li v-for='item in list' :key = 'item.id'></li>
  ```

### v-if和v-show

```php+HTML
<h1 v-if='flag'>
    xxxxx
</h1>

<h1 v-show='flag'>
    xxxxx
</h1>


var app = new Vue({
	el:'#app',
	data:{
		flag:''
	}
});

只有在flag值为true的时候，才会显示这两个标签

区别：
1.v-if会根据flag值，动态的在页面上添加或者删除一些标签
2.v-shaow不会删除标签，只会调节标签的样式中的display
3.v-if有着较大的切换性能消耗，v-show有着较大的渲染性能消耗
```



