---
title: Vue组件间通信方式
date: 2019-10-24 10:06:45
tags: [Vue]
categories: [学习笔记]
---

> 组件是可以复用的 Vue 实例。 — [Vue 官方文档](https://cn.vuejs.org/v2/guide/components.html)

组件是 Vue 最强大的功能之一，而组件实例的作用域是相互独立的，这意味着不同组件之间的数据相互是不可见的。组件之间关系大致分为父子关系、兄弟关系以及隔代关系。针对不同场景，选择合适的通信方式在实际开发中至关重要。本文是一篇学习笔记，总结了 Vue 组件通信的几种方式，方便自己日后查阅。

<!-- more -->

## props

Vue 中最基本的通信方式，父组件通过 props 向子组件传值。

```vue
// 子组件
<template>
  <div>
    <ul>
      <li v-for="book in books">{{book}}</li>//遍历传递过来的值，然后呈现到页面
    </ul>
  </div>
</template>
<script>
export default {
  name: 'BookList',
  props:{
    books:{
      type: Array,
      required: true
    }
  }
}
</script>
```

```vue
// 父组件
<template>
  <div id="app">
    <BookList :books="books"></BookList>
  </div>
</template>
<script>
import BookList from "./components/Books"
export default {
  name: 'App',
  data(){
    return{
      books: ["JavaScript高程", "ES6 入门", "锋利的jquery"]
    }
  },
  components:{
    BookList
  }
}
</script>
```

## $emit

子组件通过 \$emit 触发当前实例上的事件，向父组件传值。
> \$on 可以监听 \$emit 派发的事件，\$off 则用来取消事件监听。

```vue
// 子组件
<template>
  <header>
    <h1 @click="changeTitle">{{title}}</h1>
  </header>
</template>
<script>
export default {
  name: 'app-header',
  data() {
    return {
      title:"Vue.js Demo"
    }
  },
  methods:{
    changeTitle() {
      this.$emit("titleChanged","子向父组件传值");
    }
  }
}
</script>
```

```vue
// 父组件
<template>
  <div id="app">
    <app-header @titleChanged="updateTitle" ></app-header>
    <h2>{{title}}</h2>
  </div>
</template>
<script>
import Header from "./components/Header"
export default {
  name: 'App',
  data(){
    return{
      title:"传递的是一个值"
    }
  },
  methods:{
    updateTitle(e){
      this.title = e;
    }
  },
  components:{
   "app-header":Header,
  }
}
</script>
```

## EventBus

在项目规模不大的情况下，完全可以使用中央事件总线 EventBus 的方式实现组件之间的通信。

1. 创建事件总线

```vue
// eventBus.js
import Vue from 'vue'
export const EventBus = new Vue()
```

2. 加载

```vue
import EventBus from 'eventBus.js'; 

methods： {
  doSomething() {
    EventBus.$emit("getTarget", 22);
    console.log("向getTarget方法传参22");
  }
}
```

```vue
import EventBus from 'eventBus.js';
create(){
  EventBus.$on('getTarget', this.getTarget);
},
beforeDestroy() {
  // 组件销毁前需要解绑事件
  EventBus.$off('getTarget', this.getTarget);
},
methods: {
  getTarget(param) {
    // todo
  }
}
```

## vuex

Vuex 是一个专为 Vue.js 应用程序开发的状态管理模式。它采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化。 ——[Vuex](https://vuex.vuejs.org/zh/)

## $attrs



> 一般组件通信更考虑上面的实现方式。在模块之间通信利用eventBus，然后在模块内部，利用vuex通信，维护数据，会在逻辑上比较清晰。

## 参考文献

[Vue 组件通信方式全面详解](https://juejin.im/post/5c77c4ae518825407505e262#heading-2)
[Vue 组件间通信六种方式（完整版）](https://juejin.im/post/5cde0b43f265da03867e78d3#heading-1)
[【2019 前端进阶之路】Vue 组件间通信方式完整版](https://juejin.im/post/5c776ee4f265da2da53edfad#heading-10)