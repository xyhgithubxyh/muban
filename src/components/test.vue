<template>
  <div class="container">

    <div  style="width:100px;height:100px;overflow:auto;background:red">
      <div style="width:200px;height:100px;">

      </div>
    </div>
    <div v-for="item in list" :key="item+1"></div>
    <div class="out" @click="outclick">
      <div class="in" @click.stop="inclick"></div>
    </div>
    <el-input v-model="value" placeholder="请输入内容"></el-input>
    <div @click="go">{{ 1000 | fmtMoney }}</div>
    <!--
      <input onkeyup="value=value.replace(/[^a-zA-Z]/g,'')" v-model="value" />
    -->
    <input id="input1" type="email" v-model="valuePass" />
    <img :src="true?require('../assets/logo.png'):''" alt="">
    <ul>
      <li
        class="list-item"
        v-for="(item, index) in list"
        data-type="0"
        :key="index"
      >
        <div
          class="list-box"
          @touchstart.capture="touchStart"
          @touchend.capture="touchEnd"
          @click="skip"
        >
          <img class="list-img" :src="item.imgUrl" alt="" />
          <div class="list-content">
            <p class="title">{{ item.title }}</p>
            <p class="tips">{{ item.tips }}</p>
            <p class="time">{{ item.time }}</p>
          </div>
        </div>
        <div class="delete" @click="deleteItem" :data-index="index">删除</div>
      </li>
    </ul>
  </div>
</template>

<script>
import fun from '@/mixin/mixin.js'
export default {
  mixins: [fun],
  props: {
    list: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      value: '',
      startX: 0,
      oldVal: '',
      endX: 0,
      list1: [1, 222],
      list2: [2132,2],
      obj: { a: 2, b: 3 },
      valuePass:'',
      value1:'',
      value2:'',
      value3:'',
    }
  },
  computed:{

  },
  watch: {
    value(val) {
      this.valuePass=val.replace(/./g,'*')
      console.log( this.valuePass)
    }
  },
  mounted() {
  let obj={
    a:1, arr: [2,3] 
  }
 let copyObj= this.deepClone({
     a:1, arr: [2,3] ,
     b:{
       a:undefined,
       b:333
     }
  })
  console.log(copyObj,1111)

  let obj2={}
  Object.keys(obj).forEach(e=>{
    obj2[e]=obj[e]
  })
  console.log(obj2)

  obj.a='dfs'

  console.log(obj)


    const input1 = document.getElementById('input1')
    input1.addEventListener(
      'keyup',
      this.debounce(() => {
        console.log(this.value)
      }, 1000)
    )
  Object.keys({key:123,dsd:'232'}).forEach(e=>{
    console.log({key:123,dsd:'232'}[e])
  })
  
    // this.$store.commit({ attr: "" });
    // this.go(3);
  },
  // watch: {
  //   value(val) {
  //     if (val > 500) {
  //       this.value = 500;
  //     }
  //   },
  // },
  methods: {
    deepClone(target) {
    // 定义一个变量
    let result;
    // 如果当前需要深拷贝的是一个对象的话
    if (typeof target === 'object') {
    // 如果是一个数组的话
        if (Array.isArray(target)) {
            result = []; // 将result赋值为一个数组，并且执行遍历
            for (let i in target) {
                // 递归克隆数组中的每一项
                result.push(this.deepClone(target[i]))
            }
         // 判断如果当前的值是null的话；直接赋值为null
        } else if(target===null) {
            result = null;
         // 判断如果当前的值是一个RegExp对象的话，直接赋值    
        } else if(target.constructor===RegExp){
            result = target;
        }else {
         // 否则是普通对象，直接for in循环，递归赋值对象的所有值
            result = {};
            for (let i in target) {
                result[i] = this.deepClone(target[i]);
            }
        }
     // 如果不是对象的话，就是基本数据类型，那么直接赋值
    } else {
        result = target;
    }
     // 返回最终结果
    return result;
},
    debounce(fn, t) {
      let delay = t || 300
      let timer
      return function() {
        let args = arguments
        if (timer) {
          clearTimeout(timer)
        }

        let callNow = !timer

        timer = setTimeout(() => {
          timer = null
        }, delay)

        if (callNow) fn.apply(this, args)
      }
    },

    outclick() {
      console.log('out')
    },
    inclick() {
      console.log('in')
    },
    go(x = 1, y) {
      this.list1 = [4, 5, 6]
      console.log(this.list1)
      console.log(this.list2)
    },
    // 跳转
    skip() {
      if (this.checkSlide()) {
        this.restSlide()
      } else {
        this.$router.push({
          path: '/detail'
        })
      }
    },
    // 滑动开始
    touchStart(e) {
      // 记录初始位置
      this.startX = e.touches[0].clientX
    },
    // 滑动结束
    touchEnd(e) {
      // 当前滑动的父级元素
      let parentElement = e.currentTarget.parentElement
      // 记录结束位置
      this.endX = e.changedTouches[0].clientX
      // 左滑
      if (parentElement.dataset.type == 0 && this.startX - this.endX > 30) {
        this.restSlide()
        parentElement.dataset.type = 1
      }
      // 右滑
      if (parentElement.dataset.type == 1 && this.startX - this.endX < -30) {
        this.restSlide()
        parentElement.dataset.type = 0
      }
      this.startX = 0
      this.endX = 0
    },
    // 判断当前是否有滑块处于滑动状态
    checkSlide() {
      let listItems = document.querySelectorAll('.list-item')
      for (let i = 0; i < listItems.length; i++) {
        if (listItems[i].dataset.type == 1) {
          return true
        }
      }
      return false
    },
    // 复位滑动状态
    restSlide() {
      let listItems = document.querySelectorAll('.list-item')
      // 复位
      for (let i = 0; i < listItems.length; i++) {
        listItems[i].dataset.type = 0
      }
    },
    // 删除
    deleteItem(e) {
      // 当前索引
      let index = e.currentTarget.dataset.index
      // 复位
      this.restSlide()
      // 删除
      this.list.splice(index, 1)
    }
  }
}
</script>
<style scoped lang="less">
 .container /deep/ .el-input__inner{
  height: 80px;
  color: #ff4949;
}

.out {
  width: 100px;
  height: 100px;
  background: #ff4949;
}
.in {
  background: #fff;
  width: 50px;
  height: 50px;
}
.container {
  padding-bottom: 80px;
}
.page-title {
  text-align: center;
  font-size: 17px;
  padding: 10px 15px;
  position: relative;
}
.page-title:after {
  content: ' ';
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;
  height: 1px;
  border-bottom: 1px solid #ccc;
  color: #ccc;
  -webkit-transform-origin: 0 100%;
  transform-origin: 0 100%;
  -webkit-transform: scaleY(0.5);
  transform: scaleY(0.5);
  z-index: 2;
}
.list-item {
  position: relative;
  height: 1.6rem;
  -webkit-transition: all 0.2s;
  transition: all 0.2s;
}
.list-item[data-type='0'] {
  transform: translate3d(0, 0, 0);
}
.list-item[data-type='1'] {
  transform: translate3d(-2rem, 0, 0);
}
.list-item:after {
  content: ' ';
  position: absolute;
  left: 0.2rem;
  bottom: 0;
  right: 0;
  height: 1px;
  border-bottom: 1px solid #ccc;
  color: #ccc;
  -webkit-transform-origin: 0 100%;
  transform-origin: 0 100%;
  -webkit-transform: scaleY(0.5);
  transform: scaleY(0.5);
  z-index: 2;
}
.list-box {
  padding: 0.2rem;
  background: #fff;
  display: flex;
  align-items: center;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  justify-content: flex-end;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  font-size: 0;
}
.list-item .list-img {
  display: block;
  width: 1rem;
  height: 1rem;
}
.list-item .list-content {
  padding: 0.1rem 0 0.1rem 0.2rem;
  position: relative;
  flex: 1;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  overflow: hidden;
}
.list-item .title {
  display: block;
  color: #333;
  overflow: hidden;
  font-size: 15px;
  font-weight: bold;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.list-item .tips {
  display: block;
  overflow: hidden;
  font-size: 12px;
  color: #999;
  line-height: 20px;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.list-item .time {
  display: block;
  font-size: 12px;
  position: absolute;
  right: 0;
  top: 0.1rem;
  color: #666;
}
.list-item .delete {
  width: 2rem;
  height: 1.6rem;
  background: #ff4949;
  font-size: 17px;
  color: #fff;
  text-align: center;
  line-height: 1.6rem;
  position: absolute;
  top: 0;
  right: -2rem;
}
</style>
