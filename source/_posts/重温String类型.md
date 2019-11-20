---
title: 重温 String 类型
date: 2019-10-22 11:10:11
tags: [JavaScript]
categories: [学习笔记]
---
> 基于《JavaScript高级程序设计》和《ECMAScript 6 入门》重新学习 JavaScript 的 String 类型。
> ☆ 表示 ES6 新增

String 类型用于表示由零或多个 16 位 Unicode 字符组成的字符序列，即字符串。ECMAScript 中的字符串是不可变的。

<!-- more -->

## ☆ 字符的 Unicode 表示

ES6 允许采用\uxxxx形式表示一个字符，只限于码点在\u0000~\uFFFF之间的字符。超出这个范围的字符，必须用两个双字节的形式表示。
ES6 采用大括号表示法，将码点放入大括号，就能正确解读该字符。

```JavaScript
"\uD842\uDFB7"
"\u{20BB7}"
// "𠮷"
```

JavaScript 中字符的六种表示方法：

```JavaScript
'\z' === 'z'  // true
'\172' === 'z' // true,8进制转义
'\x7A' === 'z' // true,16进制转义
'\u007A' === 'z' // true,Unicode 表示法
'\u{7A}' === 'z' // true,Unicode 大括号表示法
```

## ☆ 模板字符串

增强版的字符串，用反引号（`）标识。可以当作普通字符串使用，也可以用来定义多行字符串，或者在字符串中嵌入变量。

```JavaScript
let x = 1;
let y = 2;
`${x} + ${y} = ${x + y}` // "1 + 2 = 3"
```

## ☆ 标签模板

模板字符串紧跟在一个函数名后面，该函数将被调用来处理这个模板字符串。这被称为“**标签模板**”功能（tagged template）。
如果模板字符里面有变量，会将模板字符串先处理成多个参数，再调用函数。

```JavaScript
let a = 5;
let b = 10;
tag`Hello ${ a + b } world ${ a * b }`;
// 等同于
tag(['Hello ', ' world ', ''], 15, 50);
```

过滤 HTML 字符串，防止用户输入恶意内容

```JavaScript
let message =
  SaferHTML`<p>${sender} has sent you a message.</p>`;

function SaferHTML(templateData) {
  let s = templateData[0];
  for (let i = 1; i < arguments.length; i++) {
    let arg = String(arguments[i]);
    s += arg.replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;");
    s += templateData[i];
  }
  return s;
}
```

## 继承方法

返回字符串所表示的基本字符串值

- valueOf()、toLocalString()、toString()

## 字符方法

唯一参数：一个基于0的位置

- charAt()
  返回指定位置的字符
- charCodeAt()
  返回指定位置的字符编码，不能正确处理 Unicode 码点大于0xFFFF的字符，即 4 个字节储存的字符
- ☆ codePointAt()
  返回指定位置的字符编码，正确处理 4 个字节储存的字符

  ```JavaScript
  let arr = [...'𠮷a']; // arr.length === 2
  arr.forEach(
    ch => console.log(ch.codePointAt(0).toString(16))
  );// 20bb7 61
  ```

  **检测字符由2或4字节组成**

  ```JavaScript
  function is32Bit(c) {
    return c.codePointAt(0) > 0xFFFF;
  }
  ```

## 操作方法

- concat()
  拼接一个或多个字符串，返回新字符串

  ```JavaScript
  const stringValue = "hello ";
  console.log(stringValue.concat("world", "!")); // "hello world!"
  ```

- slice()、substring()、substr()
  返回操作字符串的一个子字符串，接受一个或两个参数。
  参数1：指定子字符串开始位置，参数2：可选，表示子字符串到哪结束。
  > 若只传入一个参数，会截取到字符串末尾。

  **区别**
  1. slice()、substring() 参数2指定子字符串结束位置；substr() 参数2指定子字符串的字符个数。
  2. slice() 参数为负值，将传入负值与字符的长度相加；substring() 参数为负值，将所有负值转换为0；substr() 参数为负值，第一个参数加上字符串长度，第二个参数转换为0

  ```JavaScript
  const stringValue = "hello world";
  console.log(stringValue.slice(-3)); //"rld"
  console.log(stringValue.substring(-3)); //"hello world"
  console.log(stringValue.substr(-3)); //"rld"
  console.log(stringValue.slice(3, -4)); //"lo w"
  console.log(stringValue.substring(3, -4)); //"hel"
  console.log(stringValue.substr(3, -4)); //""（空字符串）
  ```

- ☆ repeat()
  将原字符串重复n次
- ☆ padStart()、padEnd()
  头部补全和尾部补全
  参数1：补全有效长度；参数2：可选，用来补全的字符串，默认为空格

## 位置方法

- indexOf()、lastIndexOf()
  在一个字符串中搜索指定子字符串，返回子字符串位置，没有返回 **-1**。
  参数1：为子字符串；参数2：可选，开始搜索位置

  **区别：**

  1. indexOf() 从字符串的开头向后搜索子字符串，lastIndexOf() 从字符串的末尾向前搜索子字符串。
  2. 如果参数2存在，indexOf() 从参数指定位置向后搜索，lastIndexOf() 从指定位置向前搜索。

  ```JavaScript
  const stringValue = "hello world";
  console.log(stringValue.indexOf("o")); //4
  console.log(stringValue.lastIndexOf("o")); //7
  console.log(stringValue.indexOf("o", 6)); //7
  console.log(stringValue.lastIndexOf("o", 6)); //4
  ```

- ☆ includes()、startsWith()、endsWith()
  判断一个字符串是否包含指定子字符串，返回布尔值
  参数1：子字符串；参数2：可选，开始搜索位置

  **区别**
  1. includes() 是否找到了参数字符串；startsWith() 参数字符串是否在原字符串的头部；endsWith() 参数字符串是否在原字符串的尾部。
  2. 参数2存在，includes()、startsWith() 从指定位置开始搜索；endsWith() 针对前n个字符。

  ```JavaScript
  let s = 'Hello world!';
  s.startsWith('world', 6) // true
  s.endsWith('Hello', 5) // true
  s.includes('Hello', 6) // false
  ```

## 格式化方法

- trim()
  创建字符串的一个副本，删除前置及后缀的所有空格，并返回新字符串
- ☆ trimStart()
  消除字符串头部的空格
- ☆ trimEnd()
  消除字符串尾部的空格

- toLowerCase()、toLocaleLowerCase()
  将字符串转换为小写
- toUpperCase()、toLocaleUpperCase()
  将字符串转换为大写

  ```JavaScript
  const stringValue = "hello world";
  console.log(stringValue.toLocaleUpperCase()); //"HELLO WORLD"
  console.log(stringValue.toUpperCase()); //"HELLO WORLD"
  console.log(stringValue.toLocaleLowerCase()); //"hello world"
  console.log(stringValue.toLowerCase()); //"hello world"
  ```

  > 一般来说，在不知道自己的代码将在哪种语言环境中运行的情况下，还是使用针对地区的方法更稳妥一些。

- ☆ normalize()
  Unicode 正规化
  参数：
    NFC => 标准等价合成
    NFD => 标准等价分解
    NFKC => 兼容等价合成
    NFKD => 兼容等价分解

## 模式匹配方法

- match()
  唯一参数：一个正则表达式 || 一个 RegExp 对象
  本质与 RegExp 的 exec() 方法相同
  返回包含匹配结果数组，数组的第一项是与整个模式匹配的字符串，之后的每 一项（如果有）保存着与正则表达式中的捕获组匹配的字符串。

  ```JavaScript
  var text = "cat, bat, sat, fat";
  var pattern = /.at/;
  //与 pattern.exec(text)相同
  var matches = text.match(pattern);
  console.log(matches.index); //0
  console.log(matches[0]); //"cat"
  console.log(pattern.lastIndex); //0
  ```

- ☆ matchAll()
  返回一个正则表达式在当前字符串的所有匹配

  ```JavaScript
  const string = 'test1test2test3';
  // g 修饰符加不加都可以
  const regex = /t(e)(st(\d?))/g;
  for (const match of string.matchAll(regex)) {
    console.log(match);
  }
  // ["test1", "e", "st1", "1", index: 0, input: "test1test2test3"]
  // ["test2", "e", "st2", "2", index: 5, input: "test1test2test3"]
  // ["test3", "e", "st3", "3", index: 10, input: "test1test2test3"]
  ```

- search()
  唯一参数：一个正则表达式 || 一个 RegExp 对象
  返回字符串中第一个匹配项的索引；如果没 有找到匹配项，则返回-1。
  > search()方法始终是从字符串开头向后查找模式。

  ```JavaScript
  const text = "cat, bat, sat, fat";
  const pos = text.search(/at/);
  console.log(pos); // 1
  ```

- replace()
  替换匹配的子字符串，返回替换后的新字符串
  参数1：一个字符串 || 一个 RegExp 对象
  参数2：一个字符串 || 一个函数

  ```JavaScript
  const text = "cat, bat, sat, fat";
  const result = text.replace("at", "ond");
  console.log(result); //"cond, bat, sat, fat"
  result = text.replace(/at/g, "ond");
  console.log(result); //"cond, bond, sond, fond"
  ```

  参数2使用特殊的字符序列（\$$、\$&、\$'、\$`、\$n、\$nn）

  ```JavaScript
  const text = "cat, bat, sat, fat";
  result = text.replace(/(.at)/g, "word ($1)");
  console.log(result); //word (cat), word (bat), word (sat), word (fat)
  ```

  参数2为一个函数，函数的参数：模式的匹配项、<第一个捕获组的匹配项、第一个捕获组的匹配项...>、模式的匹配项在字符串中的位置、原始字符串

  ```JavaScript
  function htmlEscape(text){
    return text.replace(/[<>"&]/g, function(match, pos, originalText){
      switch(match){
        case "<":
          return "&lt;";
        case ">":
          return "&gt;";
        case "&":
          return "&amp;";
        case "\"":
          return "&quot;";
      }
    });
  }
  alert(htmlEscape("<p class=\"greeting\">Hello world!</p>"));
  //&lt;p class=&quot;greeting&quot;&gt;Hello world!&lt;/p&gt;
  ```

- split()
  基于指定的分隔符将一个字符串分割成多个子字符串，并将结果放在一个数组中
  参数1：分隔符，字符串或RegExp对象；参数2：指定数组大小

  ```JavaScript
  const colorText = "red,blue,green,yellow";
  const colors1 = colorText.split(","); //["red", "blue", "green", "yellow"]
  const colors2 = colorText.split(",", 2); //["red", "blue"]
  const colors3 = colorText.split(/[^\,]+/); //["", ",", ",", ",", ""]
  const myString = 'ca,bc,a,bca,bca,bc';
  const splits = myString.split(['a','b']); // ["c", "c,", "c", "c", "c"]
  ```

## 比较方法

- localCompare()
  1. 如果字符串在字母表中应该排在字符串参数之前，则返回一个负数（-1）
  2. 如果字符串等于字符串参数，则返回 0
  3. 如果字符串在字母表中应该排在字符串参数之后，则返回一个正数（1）
  
  ```JavaScript
  function determineOrder(value1,value2) {
    var result = value1.localeCompare(value2)
    if (result < 0) {
      alert("before")
    } else if (result > 0) {
      alert("after")
    } else {
      alert("equal")
    }
  }
  ```

## 静态方法

- String.fromCharCode()
  接收一个或多个字符编码，将它们转换成一个字符串
  从 Unicode 码点返回对应字符，但是不能识别码点大于0xFFFF的字符

  ```JavaScript
  String.fromCharCode(104, 101, 108, 108, 111); //"hello"
  ```

- ☆ String.fromCharCode()
  可以识别大于0xFFFF的字符，弥补了String.fromCharCode()方法的不足

- ☆ String.raw()
  返回一个斜杠都被转义（即斜杠前面再加一个斜杠）的字符串

  1. 处理模板字符串
    将所有变量替换，而且对斜杠进行转义
  
     ```JavaScript
     String.raw`Hi\\n`; // 返回 "Hi\\\\n"
     ```

  2. 正常函数的形式
    参数1：一个具有raw属性的对象，且raw属性的值应该是一个数组；参数2：变量

     ```JavaScript
     String.raw({ raw: ['foo', 'bar'] }, 1 + 2); // "foo3bar"
     String.raw({ raw: ['foo', 'bar', 'line'] }, 1 + 2, 2 + 3); //"foo3bar5line"
     ```

  **代码实现：**

  ```JavaScript
  String.raw = function (strings, ...values) {
    let output = '';
    let index = 0;
    for (index; index < values.length; index++) {
      output += strings.raw[index] + values[index];
    }
    output += strings.raw[index]
    return output;
  }
  ```