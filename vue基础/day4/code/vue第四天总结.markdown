

#vue基础第四天

## vue动画

### 使用过渡类名实现实现动画

```php+HTML
<style>
    .v-enter,.v-leave-to{
        opacity:0;
        transform:translateX(150px);
    }
    .v-ennter-active,.v-leave-active{
        transition:all 1s ease; 
    }
</style>



<transition>
    想要有动画效果的元素
</transition>
```

**注意**

+ <transition></transition>这个元素是vue提供给我们的用于实现动画的元素。
+ v-enter和v-leave-to是这个元素动画入场之前和结束之后的状态，表示着两个时间点
+ v-enter-active和v-leave-active是入场动画和出场动画的执行时间段

### 借助animate.css来实现动画

```php+HTML
1.引入相关文件
<link rel="stylesheet" href='./lib/anmiate.css'>


<transition
  enter-active-class='animated tada'
  leave-active-class='animated bounceOutRight'
  :duration="{enter:200，leave：400}">
    想要有动画效果的元素
</transition>
```

**注意**

+ enter-active-class和leave-active-class这两个类都要添加animated这个基类。
+ ：duration用来定义入场动画和出场动画的时间，单位为毫秒

### 利用钩子函数实现半场动画

```php+HTML
<input type='button' value='toggle' @click='toggle'>
<transition
            @before-enter='beforeEnter'
            @enter='enter'
            @after-enter='afterEnter'>
    <h1 v-if='flag'>
        这是一个h1标签
    </h1>
</transition>

<script>
    var app = new Vue({
        el:'#app',
        data:{
            flag:true
        },
        methods:{
            toggle:function(){
                this.flag = !this.flag;
            },
            beforeEnter(el){
                el.style.transform='translate(0,0)';
            },
           enter(el,done){
                el.offsetWidth;
                el.style.transform='translate(150px,200px)';
                el.style.transition='all 1s ease';
                done();
            },
            afterEnter:function(){
                this.flag = !this.flag;
            }
        }
    });
</script>
```

**注意**

+ beforeEnter，enter,afterEnter这三个钩子函数的都需要在<transition><transition>标签里绑定一下，然后再methods属性中声明。
+ 上述三个钩子函数的第一个形参el是一个原生DOM对象。
+ enter中的el.offsetWidth必须要加，不然不会出现动画效果。enter钩子函数的第二个参数done是一个回调函数，实际上是afterEnter钩子函数的一个引用。

### 列表动画实现

```php+HTML
<style>

    .v-enter,.v-leave-to{}

    .v-enter-active,.v-leave-active{}

    .v-move{

        transition:all 1s ease;

    }

    .v-leave-active{

        position:absolute;

    }

</style>

<transition-group appear tag='ul'>

    <li v-for='item in list' :key='item.id'>{{item.name}}</li>

</transition-group>

```

**注意**

+ 在实现列表过渡的时候，如果需要过渡的元素是通过与v-for循环生成的，需要使用<transition-group></transition>来包裹
+ 使用v-for生成的每一个循环生成的元素的key值必须绑定
+ 在<transition-group></transition>中设置appaer属性，可以实现页面刚展现出来的动画效果。
+ tag值用来生命<transition-group></transition>这个标签最后在页面中实际会被渲染成什么标签，如果不声明，则会默认渲染为<span></span>标签。
+ 最后定义的v-move和v-leave-active两个类是固定写法，用来实现后续列表渐渐飘上来的效果。





