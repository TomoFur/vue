#vue基础第五天----组件

## 创建公有组件

### 方法1----借助Vue.extend()方法

```php+HTML
<div id='#app'>
    <my-com></my-com>
</div>


<script>
    //1.借助Vue.extend()方法生成一个组件模板对象
    var tmp = Vue.extend({
        template:'<h1>这是组件里的h1标签</h1>'
    })
    //2.使用Vue.component('组件名称',组件模板对象名称)方法将这个组件注册为全局组件
    Vue.component('myCom',tmp);
    
    var app = new Vue({
        el:'#app',
        data:{},
        methods:{}
    })
</script>
```

**注意**

+ 如果在使用Vue.component('组件名称',组件模板对象名称)这种方式注册为全局组件时候，组价名称使用了驼峰命名规则，则在使用该组件的时候，需要将每个大写字母变为小写字母，并在两个单词中间加上-，如上例中注册时候组件名为‘myCom’,在调用的时候，标签为`<my-com></my-com>`

###方法2----直接使用使用Vue.component('组件名称',组件模板对象名称)方法

```php+HTML
<div id='#app'>
    <my-com></my-com>
</div>


<script>
    //1.使用Vue.component('组件名称',组件模板对象名称)方法将这个组件注册为全局组件
    Vue.component('myCom',{
        template:'<h1>这是组件里的h1标签</h1>'
    });
    
    var app = new Vue({
        el:'#app',
        data:{},
        methods:{}
    })
</script>
```

**注意**

+ 这种方式相当于是将第一种方式的两步合并为1步使用Vue.component()方法第二个参数直接传入一个组件对象

### 方法3-----使用`<template><template>`

```php+HTML
<div id='#app'>
    <my-com></my-com>
</div>

<template id='tmp'>
    <div>
        <h1>
            这是组件里的h1标签
        </h1>
    </div>
</template>
<script>
    //1.使用Vue.component('组件名称',组件模板对象名称)方法将这个组件注册为全局组件
    Vue.component('myCom',{
        template:'#tmp'
    });
    
    var app = new Vue({
        el:'#app',
        data:{},
        methods:{}
    })
</script>
```

**注意**

+ 使用这种方式的时候，要注意`<template><template>`里只能有一个根元素，所以，建议`<template><template>`里面的所有元素最外层用一个div标签包裹起来

## 创建私有组件

```php+HTML
<div id='#app'>
    <my-com></my-com>
</div>

<template id='tmp'>
    <div>
        <h1>
            这是组件里的h1标签
        </h1>
    </div>
</template>


<script>
    var app = new Vue({
        el:'#app',
        data:{},
        methods:{},
        components:{
            myCom:{
                template:'#tmp'
            }
        }
    })
</script>
```

**注意**

+ 通过在vue实例对象上绑定**components**属性来注册只适用于这个vue实例的私有组件
+ 私有组件只能在绑定的vue实例对象控制的区域使用，而全局生命的公有组件可以在当前页面上任意一个vue实例对象控制的区域使用。

## 组件间切换

### v-if/v-else实现组件间切换

```php+HTML
<div id='app'>
   	<a href='#' @click='flag=true'>登录</a>
    <a href='#' @click='flag=false'>注册</a>
    <login v-if='flag'></login>
    <register v-else='flag'></register>
</div>

<template id='login'>
    <div>
        <h1>
           这是登录组件
        </h1>
    </div>
</template>
<template id='register'>
    <div>
        <h1>
           这是注册组件
        </h1>
    </div>
</template>

<script>
    Vue.component('login',{
        template:'#login'
    })
    Vue.component('register',{
        template:'#register'
    })
    
    var app = new Vue({
        el:'#app',
        data:{
            flag:true
        }
    });
</script>
```

**注意**

+ 使用v-if/v-else进行组件间切换时候，v-if是当后面变量为true时该组件显示，v-else是当后边变量为false时组件显示。

### 使用component标签实现组件间切换

```php+HTML
<div id='app'>
   	<a href='#' @click='componentName="login"'>登录</a> 
    <a href='#' @click='componentName="register"'>注册</a> 
    <component :is='componentName'></component>
</div>

<template id='login'>
    <div>
        <h1>
           这是登录组件
        </h1>
    </div>
</template>
<template id='register'>
    <div>
        <h1>
           这是注册组件
        </h1>
    </div>
</template>

<script>
    Vue.component('login',{
        template:'#login'
    })
    Vue.component('register',{
        template:'#register'
    })
    
    var app = new Vue({
        el:'#app',
        data:{
           componentName:'login'
        }
    });
</script>
```

**注意**

+ 使用component标签实现组件间切换主要是根据component组件后面绑定的属性**is** 的取值来请确定，**is**所绑定的是要显示的组件的名称。该值为哪个组件的名称，哪个组件就在component标签里面显示。
+ 要是想要有切换动画，可以将component标签包裹在`<transition></transition>`中，transition标签中的mode属性可以用来设置切换动画的模式，取值有“out-in‘和’‘in-out”两种。

## 组件间通信

### 父子组件传递值

```php+HTML
<div id='app'>
   <son :parentsdata='msg'></son>
</div>

<template id='son'>
        <h1>
           这是子组件
        </h1>
   	 	<h2>
        	父组件传递给子组件的数据为:{{parentsdata }}
   		 </h2>
    </div>
</template>


<script>
    Vue.component('son',{
        template:'#son'，
        props：['parentsdata']
    })
   
    var app = new Vue({
        el:'#app',
        data:{
           msg:'父组件传递给子组件的数据'
        }
    });
</script>
```

**注意**

+ 父组件给子组件传值共分为2步：

  1.父组件通过**v-bind**的形式在子组件上绑定数据，格式为：**自定义变量名=’父组件data中要传递给子组件的数据‘**

  2.子组件需要将父组件绑定给自己的数据在自身**props**属性中定义一下才可以使用，形式为**props：['自定义变量名']**----->这里的自定义变量名就是父组件在子组件身上绑定变量时候的自定义变量名称

+ 子组件身上的**data**属性中的数据是子组件私有的变量，而**props**属性是专门用来接收父组件传递过来的数据的。

+ 子组件身上的**data**属性是一个方法，其返回一个对象，这个对象里面定义的就是子组件私有的变量。

### 父组件传递方法给子组件

```php+HTML
<div id='app'>
    	<h1>
            父组件自身数据为:{{ msg}}
    	</h1>
    	<h2>
        	子组件传递给父组件的数据为:{{sondata }}
   		 </h2>
    <hr>
   <son @func='change'></son>
</div>

<template id='son'>
       <div>
           <input type='button' value='click' @click='click'>
           <h1> 
           这是子组件
    	  </h1> 
       </div>
</template>


<script>
    Vue.component('son',{
        template:'#son'，
        data:function(){
        	return {
        		msg:'hello,Father'
    		}
    	}
        methods:{
        	click(){
        		this.$emit('func',this.msg)
    		}
    	}
    })
   
    var app = new Vue({
        el:'#app',
        data:{
           msg:'父组件传递给子组件的数据',
            sondata:""
        },
        methods:{
            change(data){
                this.sondata=data
            }
        }
    });
</script>
```

**注意**

+ 父组件给子组件传递方法共分为2步：

  1.父组件通过**v-on(简写为@)**的形式在子组件上绑定方法，格式为：**自定义方法名=’父组件methods中要传递给子组件的方法名‘**

  2.子组件需要将父组件绑定给自己的方法在自身methods属性中定义的方法中调用的时候，形式为**this.$emit('自定义方法名'，自定义方法需要传递的参数)**----->这里的自定义方法名就是父组件在子组件身上绑定时候的自定义方法的名称，而第二个参数是子组件通过该方法想要传递给该父组件的参数


### 使用this.$refs来获取组件或者元素

#### 使用this.$refs来获取元素

```php+HTML
<div id='app'>
    <h1 ref='myh1'>
        这是组件里的h1标签
    </h1>
    <input type='button' value='click' @click='click'>
</div>  



<script>
    var app = new Vue({
        el:'#app',
        data:{},
        methods:{
            click(){
                console.log(this.$refs.myh1.innerText);
            }
        }
    })
</script>
```

**注意**

+ 在标签上的属性是**ref**，不是**refs**，在引用的时候使用的是**this.$refs**
+ **ref**被用来给元素或者组件注册引用信息，一个vm实例的所有引用信息将会注册在这个vm组件的**this.$refs**对象中

#### 使用this.$refs来获取组件

```php+HTML
<div id='app'>
    <h1 ref="myh1">这是组件里的h1标签</h1>
    <tmp ref="mytmp"></tmp>
    <input type="button" value="click" @click="click">
</div>
<template id="tmp">
    <div>
        <h1>这是子组件里的h1</h1>
    </div>
</template>
<script>
    var tmp ={
        template:'#tmp',
        data:function () {
            return {
                msg:'这是自组件的私有数据'
            }
        },
        methods:{
            show(){
                console.log(this.msg);
            }
        }
    }
    var app = new Vue({
        el: '#app',
        data: {},
        methods: {
            click(){
                // console.log(.msg);
                this.$refs.mytmp.show();
            }
        },
        components:{
            tmp
        }
    });
</script>
```

**注意**

+ 如果给一个组件上添加了ref属性，并通过**this.$refs**的方式拿到这个组件，就可以来访问后这个组件的私有数据和方法。在访问私有数据的时候，不需要**this.$refs.com.data.msg**,只需要**this.$refs.com.msg**即可

