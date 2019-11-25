---
title: this和super
date: 2019-11-25 15:19:45
tags: [JavaScript]
categories: [学习笔记]
---

## this

this关键字总是指向函数所在的当前对象

## super

super关键字指向当前对象的原型对象
super关键字表示原型对象时，只能用在对象的方法之中，用在其他地方都会报错。

```javascript
// 报错
const obj = {
  foo: super.foo
}

// 报错
const obj = {
  foo: () => super.foo
}

// 报错
const obj = {
  foo: function () {
    return super.foo
  }
}

// 正确用法
const proto = {
  x: 'hello',
  foo() {
    console.log(this.x);
  },
};

const obj = {
  x: 'world',
  foo() {
    super.foo();
  }
}

Object.setPrototypeOf(obj, proto);

obj.foo() // "world"
```
