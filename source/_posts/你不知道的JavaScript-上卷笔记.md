---
title: 你不知道的JavaScript-上卷笔记
date: 2019-12-04 10:39:22
tags: [JavaScript]
categories: [读书笔记]
---

> 《你不知道的JavaScript-上卷》读书笔记

<!-- more -->

## 一、作用域和闭包

### 1. 作用域

作用域是一套规则，用于确定在何处以及如何查找变量（标识符）。如果查找的目的是对 变量进行赋值，那么就会使用 LHS 查询；如果目的是获取变量的值，就会使用 RHS 查询。

#### 1.1 编译原理

传统编译语言的**编译**步骤：

- 分词/词法分析(Tokenizing/Lexing)
  将由字符组成的字符串分解成有意义的代码块，即**词法单元**(token)
- 解析/语法分析(Parsing)
  将词法单元流(数组)转换成一个由元素逐级嵌套所组成的代表了程序语法结构的树，即**抽象语法树**(Abstract Syntax Tree, AST)
- 代码生成
  将 AST 转换为可执行代码

> 分词(Tokenizing)和词法分析(Lexing)的区别：
> 两者主要差异在于词法单元的识别是通过有状态还是无状态的方式进行的。简单的说，如果词法单元生成器在判断字符是一个独立的词法单元还是其他词法单元的一部分时，调用的是有状态的解析规则，则这个过程为**词法分析**。

JavaScript 的编译大部分情况下发生在代码执行前的几微秒的时间内，JavaScript 引擎会用尽办法来保证性能最佳。简单地说，**任何 JavaScript 代码片段在执行前都要进行编译（通常在执行前）**。

#### 1.2 理解作用域

- 引擎
  负责整个 JavaScript 程序的编译及执行过程
- 编译器
  负责语法分析及代码生成等
- 作用域
  负责收集并维护由所有声明的标识符（变量）组成的一系列查询，并实施一套非常严格的规则，确定当前执行的代码对这些标识符的访问权限。
- LHS
  JavaScript 引擎的查找类型，查找负值操作的目标
- RHS
  JavaScript 引擎的查找类型，查找负值操作的源头

#### 1.3 作用域嵌套

遍历嵌套作用域链的规则：引擎从当前的执行作用域开始查找变量，如果找不到， 就向上一级继续查找。当抵达最外层的全局作用域时，无论找到还是没找到，查找过程都 会停止。

#### 1.4 异常

如果 RHS 查询在所有嵌套的作用域中遍寻不到所需的变量，引擎就会抛出 ReferenceError 异常。当引擎执行 LHS 查询时，如果在顶层（全局作用域）中也无法找到目标变量， 全局作用域中就会创建一个具有该名称的变量，并将其返还给引擎，前提是程序运行在非 “严格模式”下。

### 2. 词法作用域

作用域共有两种主要的工作模型：词法作用域和动态作用域。
**词法作用域就是定义在词法阶段的作用域。**无论函数在哪里被调用，也无论它如何被调用，它的词法作用域都只由函数被声明时所处的位置决定。

#### 2.1 欺骗词法

- `eval()`
  可以接受一个字符串为参数，在程序中生成代码并运行。
  在严格模式的程序中，`eval()`在运行时有其自己的词法作用域，意味着其中的声明无法修改所在的作用域。
- `with`
  通常被当做重复引用同一个对象的多个属性的快捷方式，可以不需要重复引用对象本身。

  ```javascript
  var obj = {
      a: 1,
      b: 2
  }
  obj.a = 2
  obj.b = 3
  // 简写为
  with(obj) {
      a = 2,
      b = 3
  }
  ```

> `eval()` 函数如果接受了含有一个或多个声明的代码，就会修改其所处的词法作用域，而 `with` 声明实际上是根据你传递给它的对象凭空创建了一个全新的词法作用域。

#### 2.2 性能

JavaScript 引擎会在编译阶段进行数项的性能优化。其中有些优化依赖于能够根据代码的词法进行静态分析，并预先确定所有变量和函数的定义位置，才能在执行过程中快速找到标识符。如果引擎在代码中发现 `eval()` 和 `with`，引擎无法在编译时对作用域查找进行优化。

### 3. 函数作用域和块作用域

#### 3.1 函数中的作用域

函数作用域的含义是指，属于这个函数的全部变量都可以在整个函数的范围内使用及复用。

#### 3.2 隐藏代码实现

函数声明实际的结果就是在这个代码片段的周围创建了一个作用域气泡，也就是说这段代码中的任何声明（变量或函数）都将绑定在这个新创建的包装函数的作用域中，而不是先前所在的作用域中。“隐藏”作用域中的变量和函数所带来的另一个好处，是可以避免同名标识符之间的冲突。常见实现方式：

1. 全局命名空间
    在全局作用域中声明一个名字足够独特的变量（通常是一个对象）作为命名空间。
2. 模块管理

#### 3.3 函数表达式

匿名函数表达式

```javascript
setTimeout( function() {
    // todo
}, 1000 )
```

具名函数表达式

```javascript
setTimeout( function timeoutHandler() {
    // todo
}, 1000 )
```

立即执行函数表达式（IIFE）
Immediately Invoked Function Expression

```javascript
(function IIFE( window, undefined ) {
    // todo
})( window );
```

UMD
Universal Module Definition

```javascript
(function IIFE( def ) {
    def( window )
})(function def( global ) {
    // todo
})
```

#### 3.4 块级作用域

##### 3.4.1 with

用 with 从对象中创建出的作用域仅在 with 声明中而非外部作用域中有效。

##### 3.4.2 try/catch

try/catch 的 catch 分句会创建一个块作 用域，其中声明的变量仅在 catch 内部有效。

##### 3.4.3 let

let 关键字可以将变量绑定到所在的任意作用域中。

```javascript
var ys = true
// 隐式
if(ys) {
    let label = true
}
// 显式
if(!ys) {
    { // <- 显式的块级作用域
        let label = true
    }
}
```

- 垃圾收集

  ```javascript
  function process(data) {
      // 在这里做点有趣的事情
  }
  var someReallyBigData = { ... }
  process( someReallyBigData )

  var btn = document.getElementById( "my_button" )
  btn.addEventListener( "click", function click(evt) {
      console.log("button clicked")
  }, /*capturingPhase=*/false )
  ```

  click 函数形成 了一个覆盖整个作用域的闭包,JavaScript 引擎极有可能依然保存着someReallyBigData。

  ```javascript
  function process(data) {
      // 在这里做点有趣的事情
  }
  // 在这个块中定义的内容可以销毁了！
  {
      var someReallyBigData = { ... }
      process( someReallyBigData )
  }
  var btn = document.getElementById( "my_button" )
  btn.addEventListener( "click", function click(evt) {
      console.log("button clicked")
  }, /*capturingPhase=*/false )
  ```

- let 循环
  for 循环头部的 let 不仅将 i 绑定到了 for 循环的块中，事实上它将其重新绑定到了循环 的每一个迭代中，确保使用上一个循环迭代结束时的值重新进行赋值。

  ```javascript
  for (let i=0; i<10; i++) {
      // todo something
    }
  ```

##### 3.4.3 const

用来创建块作用域变量，但其值是固定的 （常量）。

### 4. 提升

所有的声明（变量和函数）都会被“移动”到各自作用域的最顶端，这个过程被称为提升。

#### 4.1 函数优先

函数声明和变量声明都会被提升。在有多个 “重复”声明的代码中，函数会首先被提升，然后才是变量。

```javascript
foo() // b
var a = true
if (a) {
    function foo() {
        console.log("a")
    }
} else {
    function foo() {
        console.log("b")
    }
}
```

### 5. 作用域闭包

#### 5.1 什么是闭包

当函数可以记住并访问所在的词法作用域时，就产生了闭包，即使函数是在当前词法作用域之外执行。

```javascript
function foo() {
    var a = 2
    function bar() {
        console.log( a );
    }
    return bar
}
var baz = foo()
baz() // 2 -> 闭包的效果
```

无论通过何种手段将内部函数传递到所在的词法作用域以外，它都会持有对原始定义作用域的引用，无论在何处执行这个函数都会使用闭包。

#### 5.2 循环和闭包

```javascript
// 每隔一秒打印一个6
for (var i = 1; i <= 5; i++) {
    setTimeout( function timer() {
        console.log( i )
    }, i * 1000 )
}
// IIFE写法：每隔一秒，打印1~5
for (var i=1; i<=5; i++) {
    (function(j) {
        setTimeout( function timer() {
            console.log( j )
        }, j*1000 )
    })( i )
}
// ES6
for (let i = 1; i <= 5; i++) {
    setTimeout( function timer() {
        console.log( i )
    }, i * 1000 )
}
```

#### 5.3 模块

```javascript
function CoolModule() {
    var something = "cool"
    var another = [1, 2, 3]
    function doSomething() {
        console.log( something )
    }
    function doAnother() {
        console.log( another.join( " ! " ))
    }
    return {
        doSomething: doSomething,
        doAnother: doAnother
    }
}
var foo = CoolModule()
foo.doSomething() // cool
foo.doAnother() // 1 ! 2 ! 3
```

模块模式的两大必要条件：

1. 必须有外部的封闭函数，该函数必须至少被调用一次（每次调用都会创建一个新的模块实例）。
2. 封闭函数必须返回至少一个内部函数，这样内部函数才能在私有作用域中形成闭包，并且可以访问或者修改私有的状态。

单例模式：

```javascript
var foo = (function CoolModule() {
    var something = "cool"
    var another = [1, 2, 3]
    function doSomething() {
        console.log( something )
    }
    function doAnother() {
        console.log( another.join( " ! " ) )
    }
    return {
        doSomething: doSomething,
        doAnother: doAnother
    }
})()
foo.doSomething(); // cool
foo.doAnother(); // 1 ! 2 ! 3
```

##### 5.3.1 现代的模块机制

```javascript
var MyModules = (function Manager() {
    var modules = {}
    function define(name, deps, impl) {
        for (var i=0; i<deps.length; i++) {
            deps[i] = modules[deps[i]]
        }
        modules[name] = impl.apply( impl, deps ) // 代码核心
    }
    function get(name) {
        return modules[name]
    }
    return {
        define: define,
        get: get
    }
})();
```

定义模块：

```javascript
MyModules.define( "bar", [], function() {
    function hello(who) {
        return "Let me introduce: " + who
    }
    return {
        hello: hello
    }
} )
MyModules.define( "foo", ["bar"], function(bar) {
    var hungry = "hippo"
    function awesome() {
        console.log(
            bar.hello( hungry ).toUpperCase()
        )
    }
    return {
        awesome: awesome
    }
} )
var bar = MyModules.get( "bar" )
var foo = MyModules.get( "foo" )
console.log(
    bar.hello( "hippo" )
); // Let me introduce: hippo
foo.awesome(); // LET ME INTRODUCE: HIPPO
```

"foo" 和 "bar" 模块都是通过一个返回公共 API 的函数来定义的。模块模式特点：**为函数定义引入包装函数，并保证它的返回值和模块的 API 保持一致。**

##### 5.3.2 未来的模块机制

ES6 Module 的设计思想是尽量的静态化，使得编译时就能确定模块的依赖关系，以及输入和输出的变量。模块功能主要由两个命令构成：export 和 import。

### 6. 附录

#### 6.1 动态作用域

动态作用域并不关心函数和作用域是如何声明以及在何处声明的，只关心它们从何处调用。换句话说，**作用域链是基于调用栈的**，而不是代码中的作用域嵌套。

> 词法作用域与动态作用域的主要区别：
> 词法作用域是在写代码或者说定义时确定的，而动态作用域是在运行时确定的（this 也是！）。词法作用域关注函数在何处声明，而动态作用域关注函数从何处调用。

#### 6.2 块级作用域的替代方案

```javascript
// ES6 块级作用域
{
    let a = 2
    console.log( a ) // 2
}
console.log( a ) // ReferenceError

// ES6 之前替代方案
try {
    throw 2
} catch ( a ){
    console.log( a ) // 2
}
console.log( a ) // ReferenceError
```

##### 6.2.1 Traceur

将 ES6 代码转换成兼容 ES6 之前的环境（大部分是 ES5，但不是全部）。

```javascript
{
    try {
        throw undefined
    } catch (a) {
        a = 2
        console.log( a )
    }
}
console.log( a )
```

##### 6.2.2 隐式和显示作用域

```javascript
// let 作用域 || let 声明
// 官方的 Traceur 编译器也不接受这种形式的代码。
let (a = 2) {
    console.log( a ) // 2
}
console.log( a ) // ReferenceError
```

同隐式地劫持一个已经存在的作用域不同，**let 声明会创建一个显示的作用域并与其进行绑定**。显式作用域不仅更加突出，在代码重构时也表现得更加健壮。在语法上，通过强制 性地将所有变量声明提升到块的顶部来产生更简洁的代码。这样更容易判断变量是否属于某个作用域。

> 从代码规范上の妥协

```javascript
/*let*/ { let a = 2
    console.log( a )
}
console.log( a ) // ReferenceError
```

#### 6.3 this 词法
发放技能
```javascript
var obj = {}
```