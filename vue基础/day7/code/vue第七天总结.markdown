#vue基础第7天

## watch属性

vm实例上的watch属性可以用来监视挂载在vm实例上的数据的变化，然后触发在watch中定义的处理函数，示例如下：

```php+HTML
<div id='app'>
     <input type='text' v-model='firstName'>+
     <input type='text' v-model='lastName'>=
     <input type='text' v-model='fullName'>
</div>

<script>
    var app = new Vue({
        el:'#app',
        data:{
            firstName：'',
            lastName:'',
            fullName:''
        },
        watch:{
            firstName:function(newVal,oldVal){
                this.fullName=newVal+'-'+this.lastName;
            },
            lastName:function(newVal,oldVal){
                this.fullName=this.firstName+'-'+newVal;
            }
        }
    })
</script>

```

**注意**

+ watch对象中的属性必须都是这个vm实例上挂载的数据，包括`$route`对象里的数据
+ 每一个属性的值实际上是一个函数，这个函数有两个形参，第一个形参表示这个属性改变之后的值，第二个形参表示这个属性改变之前的值。
+ 一旦挂载在watch中的属性的值发生变化，就会触发这个属性对应的函数，执行相应的操作。

## computed属性

在vm中的computed属性中，可以定义一些属性，这些属性也叫计算属性，计算属性的本质也是一个方法，只不过我们在使用这些计算属性的时候，是把他们的名称直接当做属性来使用，并不会把计算属性当做方法来调用。

```php+HTML
<div id='app'>
     <input type='text' v-model='firstName'>+
     <input type='text' v-model='lastName'>=
     <input type='text' v-model='fullName'>
</div>

<script>
    var app = new Vue({
        el:'#app',
        data:{
            firstName：'',
            lastName:'',     
        },
        computed:{
            fullName:function(){
                return this.fullName=this.firstName+'-'+this.lastName;
            },
           
        }
    })
</script>
```

**注意**

+ 计算属性如fullName在引用的时候，一定不要加括号调用，直接把它当做普通的data中的属性使用即可
+ 每一个计算属性的function内部用到的数据发生了变化，就会触发这个函数。
+ 每一个计算属性的函数都需要有一个返回值。

