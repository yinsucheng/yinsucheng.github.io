---
title: 重温Object类型
date: 2019-10-24 09:41:46
tags: [JavaScript]
categories: [学习笔记]
---
> 基于《JavaScript高级程序设计》和《ECMAScript 6 入门》重新学习 JavaScript 的 Object 类型。
> ☆ 表示 ES6 新增

ECMAScript 中的对象其实就是一组数据和功能的集合。Object 类型是所有它的实例的基础。

<!-- more -->
## 创建方式

```javascript
// new Object构造函数
let person = new Object()
person.name = 'vue'

// 对象字面量
let person = {
    name: 'vue'
}
```

## 实例属性和方法

- constructor
  构造函数，保存着用于创建当前对象的函数。
- hasOwnProperty(propertyName)
  用于检查给定的属性在当前对象实例中是否存在。
- isPrototypeOf(Object)
  用于检查对象是否是传入对象的原型。
- peopertyIsEnumerable()
  用于检查给定的属性是否能够使用 for-in 语句来枚举。
- toLocalString()
  返回对象的字符串表示。
- toString()
  返回对象的字符串表示。
- valueOf()
  返回对象的字符串、数值或布尔值表示。通常与`toString()`方法的返回值相同。

## 属性描述对象

对象的每个属性都有一个描述对象（Descriptor），用来控制该属性的行为。
ECMAScript 中有两种属性：**数据属性**和**访问器属性**。
`Object.getOwnPropertyDescriptor()`方法可以获取该属性的描述对象。

### 数据属性

- [[Configurable]]
  1. 能否通过`delete`删除属性从而从新定义属性
  2. 能否修改属性的特性
  3. 能否把属性修改为访问器属性
- [[Enumerable]]
  能否通过`for-in`循环返回属性
- [[Writable]]
  能否修改属性的值
- [[Value]]
  包含属性的数据值

### 访问属性

- [[Configurable]]
- [[Enumerable]]
- [[Get]]
  在读取属性时调用的函数
- [[Set]]
  在写入属性时调用的函数

### 修改属性特性

- Object.defineProperty()
  参数：①属性所在对象；②属性的名字；③一个描述对象
  
  ```javascript
  let person = {
      name: 'ali'
  }
  Object.defineProperty(person, "name", {
      writable: false,
      value: "yase"
  });
  ```

- Object.defineProperties()
  同时定义多个属性
  参数：①属性所在对象；②属性及其特性一一对应组成的对象

  ```javascript
  let book = {};
  Object.defineProperties(book, {
    _year: { value: 2004 },
    edition: { value: 1 },
    year: {
      get: function(){
        return this._year;
      },
      set: function(newValue){
        if (newValue > 2004) {
          this._year = newValue;
          this.edition += newValue - 2004;
        }
      }
    }
  });
  ```

### 读取属性特性

`Object**.getOwnPropertyDescriptor()`取得给定属性的描述符，参数：①属性所在对象；②需读取描述符的属性名

```javascript
let descriptor = Object.getOwnPropertyDescriptor(book, "_year");
descriptor.value; //2004
descriptor.configurable; //false
```

## 属性的可枚举性

有四个操作会忽略enumerable为false的属性，其中`for...in`会返回继承的属性,其他三个方法都会忽略继承的属性。

- for...in
  只遍历对象自身的和继承的可枚举的属性。
- Object.keys()
  返回对象自身的所有可枚举的属性的键名。
- JSON.stringify()
  只串行化对象自身的可枚举的属性。
- ☆Object.assign()
  忽略enumerable为false的属性，只拷贝对象自身的可枚举的属性

## 属性的遍历

- for...in
  循环遍历对象自身的和继承的可枚举属性（不含 Symbol 属性）。
- Object.keys(obj)
  返回一个数组，包括对象自身的（不含继承的）所有可枚举属性（不含 Symbol 属性）的键名。
- Object.getOwnPropertyNames(obj)
  返回一个数组，包含对象自身的所有属性（不含 Symbol 属性，但是包括不可枚举属性）的键名。
- Object.getOwnPropertySymbols(obj)
  返回一个数组，包含对象自身的所有 Symbol 属性的键名。
- Reflect.ownKeys(obj)
  返回一个数组，包含对象自身的所有键名，不管键名是 Symbol 或字符串，也不管是否可枚举。

## ☆对象新增方法

- Object.is()
  
