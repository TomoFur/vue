#Vue基础第6天---路由

## 路由使用

**步骤1**:引入相关文件

```html
<script src='./lib/vue-router.js'></script>
```

**注意**

+ 在引入vue-router.js文件之前需要先引入vue.js文件

**步骤2**：定义一个路由对象

```javascript
var router = new VueRouter({
    routes:[
        {path:'/login',component:login}
    ],
    linkActiveClass:'myActive'
})
```

**注意**

+ 在引入vue-router.js文件之后，就在全局多了一个VueRouter函数，这个函数就是用来声明路由对象的。
+ 在使用VueRouter来声明路由对象的时候，需要传入一个配置对象，这个配置对象的第一个属性是routes，是一个数组，数组里的每一项都是一个对象，这个对象的结构为{path:‘/路径’，component：组件名}
+ 第二个属性是linkActiveClass，用来自定义路由被激活的时候的样式。

**步骤3**：将这个路由对象挂在在vue实例上

```javascript
var app = new Vue({
    el:'#app',
    data:{},
    mathods:{},
    router:router
})
```

**注意**

+ 在定义Vue实例的时候传入的配置对象里和data以及methods平级的属性**router**就是用来挂载第2步定义的路由对象的。

**步骤4** 使用`router-link`标签

```html
<router-link to=''></router-link>
```

**注意**

+ `router-link`这个标签会在页面中被渲染为`a`链接，如果想要自定义渲染的标签，则需要使用`tag=‘标签’`来设置。
+ `router-link`这个标签的to属性就是用来设置这个a链接的路由信息。

**步骤5** 使用`router-view`标签

```html
<router-view></router-view>
```

**注意**

+ 这个`router-view`是vue-router提供的，作用是将上面根据router-link标签的to属性的值和路由对象的routes里面相匹配的组件在页面上显示。

## 路由传参

### 方法1----使用查询字符串

```php+HTML
<router-link to='/login?user=zs&pwd=123'></router-link>

<template id='tmp'>
    <div>
        <h1>
            用户名是{{ $route.query.user}}-----密码是{{$route.query.pwd}}
        </h1>
    </div>
</template>
<script>
    var login = {
        template:'#tmp'
    }
    var router=new VueRouter({
        routes:[
            {path:'/login',component:login}
        ]
    })
</script>
```

**注意**

+ 使用这种方式传参的时候，在设置路由规则的时候，不要添加？后面的参数
+ 这种方式传递的参数保存在这个组件的$route.query这个对象里面。

### 方法2

```php+HTML
<router-link to='/login/zs/123'></router-link>

<template id='tmp'>
    <div>
        <h1>
            用户名是{{ $route.params.user}}-----密码是{{$route.params.pwd}}
        </h1>
    </div>
</template>
<script>
    var login = {
        template:'#tmp'
    }
    var router=new VueRouter({
        routes:[
            {path:'/login/:user/:pwd',component:login}
        ]
    })
</script>
```

**注意**

+ 使用这种方式传参的时候，在设置路由规则的时候。需要严格按照这种模式来
+ 这种方式传递的参数保存在这个组件的$route.params这个对象里面。

## 路由嵌套

```php+HTML
<div id='app'>
   < router-link to='/account'></router-link>
    <router-view></router-view>
</div>


<template id='account'>
    <div>
        <h1>
            这是account页面
        </h1>
       < router-link to='/account/login'>login</router-link>
        < router-link to='/account/register'>register</router-link>
        <router-view></router-view>
    </div>
</template>



<template id='login'>
    <div>
        <h1>
            这是login页面
        </h1>
       
    </div>
</template>


<template id='register'>
    <div>
        <h1>
            这是register页面
        </h1>
       
    </div>
</template>

<script>
    
    var account ={
        template:'#account'
    }
    
    var login ={
        template:'#login'
    }
    
    var register ={
        template:'#register'
    }
    
    
    var router = new VueRouter({
        routes:[
            {
                path:'/account',
                component:account,
                children:[
                    {path:'login',component:login},
                    {path:'register',component:register}
                ]
            }
        ]
    })
    
    
    var app = new Vue({
        el:'#app',
        data:{},
        router:router
    })
</script>


```

**注意**

+ 嵌套路由写在**children**属性里，每一个path最前面不需要加'/'，如果加了'/'表示从根路径开始。

## 命名视图

```php+HTML
<div id='app'>
 
    <router-view></router-view>
    <div class='container'>
        <router-view name='left'></router-view>
        <router-view name='main'></router-view>
    </div>
</div>


<template id='header'>
    <div>
        <h1>
            这是header页面
        </h1>
     
    </div>
</template>



<template id='left'>
    <div>
        <h1>
            这是left页面
        </h1>
       
    </div>
</template>


<template id='main'>
    <div>
        <h1>
            这是main页面
        </h1>
       
    </div>
</template>

<script>
    
    var header ={
        template:'#header'
    }
    
    var left ={
        template:'#left'
    }
    
    var main ={
        template:'#main'
    }
    
    
    var router = new VueRouter({
        routes:[
            {
                path:'/',
                components:{
                    default:header,
                    left：left,
                    main:main
                }
                
            }
        ]
    })
    
    
    var app = new Vue({
        el:'#app',
        data:{},
        router:router
    })
</script>
```

**注意**

+ 命名视图的组件写在**components**里面，然后在`<router-view></router-view>`里面用name属性来指定这里该显示那个组件。name的值就是**components**里面的属性，然后`<router-view></router-view>`里面就显示着与这个属性相对应的组件。

