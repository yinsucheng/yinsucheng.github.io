---
title: 重温 Number 类型
date: 2019-10-23 11:47:16
tags: [JavaScript]
categories: [JavaScript]
---

> 基于《JavaScript高级程序设计》和《ECMAScript 6 入门》重新学习 JavaScript 的 Number 类型。
> ☆ 表示 ES6 新增

Number 类型使用 IEEE754 格式来表示整数和浮点数值（浮点数值在某些语言中也被称为双精度数值）。

<!-- more -->

## 进制

二进制前缀 0b（0B），数字序列 0 和 1
八进制前缀 0o（0O），数字序列 0 ~ 7
十六进制前缀 0x（0X），数字序列 0 ~ 7 及 A ~ F（a ~ f）

## 继承方法

- valueOf()
  返回对象表示的基本类型的数值
- toLocalString()
  返回字符串形式的数值
- toString()
  返回字符串形式的数值
  传递一个表示基数的参数，返回对应进制数值的字符串形式

## 格式化方法

- toFixed()
  按照指定小数位返回数值的字符串形式
- toExponential()
  以指数表示法返回该数值字符串表示形式
- toPrecision()
  以指定的精度返回该数值对象的字符串表示

  ```JavaScript
  console.log((1234.5).toFixed(2)); //1234.50
  console.log((1234.5).toExponential(2)); // "1.23e+3"
  console.log((1234.5).toPrecision(2)); // "1.2e+3"
  ```

## 静态方法

- ☆ Number.isFinite()
  用来检查一个数值是否为有限的（finite），即不是 Infinity
  如果参数类型不是数值，一律返回 false

- ☆ Number.isNaN()
  用来检查一个值是否为 NaN
  如果参数类型不是 NaN，一律返回 false

- ☆ Number.parseInt(string[, radix])
  将字符串解析为整数
- ☆ Number.parseFloat(string[, radix])
  将字符串解析为浮点数

- ☆ Number.isInteger()
  判断一个数值是否为整数
- ☆ Number.isSafeInteger()
  判断传入的参数值是否是一个“安全整数”
  **安全整数**范围为 -(2<sup>53</sup> - 1)到 2<sup>53</sup> - 1 之间的整数，包含 -(2<sup>53</sup> - 1)和 2<sup>53</sup> - 1

## 常量

- Number.MAX_VALUE
  最大数值，属性值接近于 1.79E+308
- Number.MIN_VALUE
  最小正值，约为 5e-324
- ☆ Number.NaN
  非数值，`NaN`

- Number.NEGATIVE_INFINITY
  负无穷大，`-Infinity`
- Number.POSITIVE_INFINITY
  正无穷大，`Infinity`

- ☆ Number.EPSILON
  表示 1 与大于 1 的最小浮点数之间的差，JavaScript 能够表示的最小精度

  ```JavaScript
  function withinErrorMargin (left, right) {
    return Math.abs(left - right) < Number.EPSILON * Math.pow(2, 2);
  }
  0.1 + 0.2 === 0.3 // false
  withinErrorMargin(0.1 + 0.2, 0.3) // true
  ```

- ☆ Number.MAX_SAFE_INTEGER
  最大安全整数，2<sup>53</sup> - 1
- ☆ Number.MIN_SAFE_INTEGER
  最小安全整数，-(2<sup>53</sup> - 1)