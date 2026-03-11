---
title: 《C语言程序设计-现代方法》-课后习题-第二十一章
published: 2023-02-20
description: ''
image: ''
tags: []
category: '程序设计'
draft: false 
lang: ''
---

## 第二十一章 标准库

### 练习题

21.1 节  

1. 在你的系统中找到存放头文件的位置。找出那些非标准头，并指明每一个的用途。  

2. 在存放头文件的目录中（见练习题1）找出一个使用宏隐藏函数的标准头。  

3. 当使用宏隐藏函数时，在头文件中，宏定义和函数原型哪一个必须放在前面？验证你的结论。  

4. 列出C99标准的“future library directions”部分的所有保留标识符。有的标识符只在具体的头文件被包含时才被保留，有的标识符被保留用作外部名字。请对这两种标识符加以区分。  

5. <ctype.h>中的 islower 函数用于测试字符是否为小写字母。下面的宏版本为什么不符合 C标准？ （假定字符集是ASCII。）  

   ```
   #define islower(c) ((c) >= 'a' && (c) <= 'z')  
   ```

6. <ctype.h>头通常把它的函数也定义为宏。这些宏依赖于一个在中声明但在另一个文件中定义的静态数组。下面给出了常见的<ctype.h>头的一部分。使用这个例子回答下列问题。  
   (a) 为什么“位”宏（例如\_UPPER）和\_ctype数组用下划线开头？  
   (b) 解释_ctype 数组包含什么内容。假设字符集是ASCII，给出位置9（水平制表符）、位置32（空 格符）、位置65（字母A）、位置94（字符^）处的数组元素的值。关于每个宏返回什么值的描述见23.5节。  
   (c) 使用数组实现下面这些宏有什么好处？  

   ```C
   #define _UPPER 0x01   /* upper-case letter */
   #define _LOWER 0x02   /* lower-case letter */
   #define _DIGIT 0x04   /* decimal digit */
   #define _CONTROL 0x08 /* control character */
   #define _PUNCT 0x10   /* punctuation character */
   #define _SPACE 0x20   /* white-space character */
   #define _HEX 0x40     /* hexadecimal digit */
   #define _BLANK 0x80   /* space character */
   
   #define isalnum(c) (_ctype[c] & (_UPPER | _LOWER | _DIGIT))
   #define isalpha(c) (_ctype[c] & (_UPPER | _LOWER))
   #define iscntrl(c) (_ctype[c] & _CONTROL)
   #define isdigit(c) (_ctype[c] & _DIGIT)
   #define isgraph(c) (_ctype[c] & (_PUNCT | _UPPER | _LOWER | _DIGIT))
   
   #define islower(c) (_ctype[c] & _LOWER)
   #define isprint(c) (_ctype[c] & (_BLANK | _PUNCT | _UPPER | _LOWER | _DIGIT))
   #define ispunct(c) (_ctype[c] & _PUNCT)
   #define isspace(c) (_ctype[c] & _SPACE)
   #define isupper(c) (_ctype[c] & _UPPER)
   #define isxdigit(c) (_ctype[c] & (_DIGIT | _HEX))
   ```

   

21.2 节  

7. 在哪个标准头中可以找到下面描述的函数或宏？ 

   ```
   (a) 判断当前是星期几的函数。 
   (b) 判断字符是否是数字的函数。  
   (c) 给出最大的unsigned int 类型值的宏。  
   (d) 对浮点数向上舍入的函数。  
   (e) 指定一个字符包含多少位的宏。  
   (f) 指定 double 类型值有效位个数的宏。  
   (g) 在字符串中查找特定字符的函数。  
   (h) 以读方式打开文件的函数。
   ```

   

### 编程题

1. 编写一个程序声明结构s（见21.4节），并显示成员a、b、c的大小和偏移量。（使用sizeof得到大小，使用offsetof 得到偏移量。）同时使程序显示整个结构的大小。根据这些信息，判断结构中是否包含空洞。如果包含空洞，指出每一个空洞的位置和大小。
