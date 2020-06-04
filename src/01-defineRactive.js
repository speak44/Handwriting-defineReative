 //数据响应
 // 首先定义一个方法
 function defineReactive(obj,key,val){
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
      }
    }
  })
 }

 const obj ={}
 defineReactive(obj, 'foo', 'foo') 
 obj.foo  // 相当于进行了一次get方法的执行
 obj.foo ='fooooooooooooooo' // set方法的执行