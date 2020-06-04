 //数据响应
 // 首先定义一个方法
 function defineReactive(obj,key,val){
    // 再最开始的位置要继续递归处理，目的是：当obj里面嵌套了对象的对象时，比如 obj={d:{e:4}}
    // if 穿进来的 val 值又是一个对象，就要将对象里面的数据进行自定义属性
    observe(val)
    // console.log(val,'sdsds')

  // Object.defineProperty(obj,prop,descriptor)
  // obj:需要定义的属性的对象
  // prop:需要定义(创建)或修改的属性的名字 
  // descriptor:需要定义或修改的属性的描述符,可以是一个对象
  // 这个是js的方法，相当于自己定义一个属性，给它设置，是否可以枚举，是否可以修改，获取的时候默认调用get方法，修改调用set
  Object.defineProperty(obj,key,{
    get(){
      // 当获取obj 的 key 的时候会进来。
      console.log('get', key)
      // 这个时候返回的是传进来的行参
      return val
    },
    set(newVal){ 
      // 如果新传进来的值 与当前的值不一样，再返回
      if(newVal !==val){
        console.log('进来了吗set',val,newVal)
        val=newVal
        // 放传进来的 新的newVal 也是 对象的时候，进行下递归，将内容进行拦截处理
        observe(newVal)
      }
    }
  })
 }
// 由于新增的属性 无法被拦截 所以会使用set方法 特定的api做对应响应式拦截
function set(obj,key,val){
  defineReactive(obj,key,val)
}

//  情况一： // const obj ={}
// 情况二： 当obj 是一个对象或者数组的时候，defineReactive这个数据每次只能便利一个数据，如果执行很多遍就很累赘。需要写一个递归
const obj={foo:1,b:2,c:3,d:{e:4}}
//能把一个对象，用递归的方式 去遍历所有的属性
// 让对象的所有属性都会被拦截处理
function observe(obj){
  if(typeof obj !== 'object' || obj == null){
    return 
  }
  console.log(obj,'observe')
  Object.keys(obj).forEach((key)=>{
    defineReactive(obj,key,obj[key])
  })
}
// 有 observe(obj)这个方法，就不用每次手写，所以下面的可以注释掉
//  defineReactive(obj, 'foo', 'foo')  
observe(obj)
//  obj.foo  // 相当于进行了一次get方法的执行
//  obj.foo ='fooooooooooooooo' // set方法的执行

 // 测试，开始定义obj的时候，设置的key为b的属性，看是否可以进入到get中
//  obj.b

 // 测试，在 defineRactive里面添加递归时候可以正常运行, 当访问的是，对象里面的对象的值
//  obj.d.e 

 // 如果重新设置 obj.d.e的值，看再获取的时候能不能走get
 obj.d ={e:'3333'} //发现可以设置，但是获取的时候不能获取。
 // 是因为，在重新设置的时候，没有将数据进行拦截处理，没有让它走，get 方法。所以在设置的时候走一遍递归
 obj.d.e 

 //  给obj 的一个属性设置一个没有的值，会报错！ 所以在vue 2.0中 会有一个$set的方法；所以需要设置一个set 函数
//  obj.dong = 'ooooo'
set(obj, 'dong', 'oooooo')
obj.dong


// 上面的尝试都是对象的尝试，
// 如果是数组[]，那么就需要对数组的7的方法进行覆盖, 覆盖为可以做拦截通知的方法
