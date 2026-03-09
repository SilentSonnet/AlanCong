---
title: 《C语言程序设计-现代方法》-课后习题-第二十四章
published: 2026-03-09
description: ''
image: ''
tags: []
category: '程序设计'
draft: false 
lang: ''
---

## 第二十四章 错误处理

### 练习题

24.1 节  

1. (a) 断言可以用来检测两种问题：第一种是如果程序正确就不应该发生的问题，第二种是超出程序控制范围的问题。请解释为什么assert更适用于第一种问题。  
   (b) 请举出三个超出程序控制范围的问题的例子。   
2. 编写assert 函数调用，当名为top的变量取值为NULL时使程序终止。  
3. 修改19.4节的stackADT2.c文件，用assert取代if语句来测试错误。（注意，不再需要terminate 函数了，可以删除它。）  

24.2 节  

4. (a) 编写一个名为try_math_fcn的“包装”函数来调用数学函数（假定有一个double类型的参数， 并返回一个double类型的值），然后检查调用是否成功。下面是使用try_math_fnc函数的例子：  
   `y = try_math_fcn(sqrt, x, "Error in call of sqrt");`
   如果调用sqrt(x)成功，try_math_fcn 返回 sqrt 函数的计算结果。如果调用失败，try_math_fcn 需要调用perror显示消息Error in call of sqrt，然后调用exit函数终止程序。  
   (b) 编写一个与try_math_fcn 具有相同效果的宏，但要求使用函数的名字来构造出错消息：  
   `y = TRY_MATH_FCN(sqrt, x);`  
   如果调用sqrt失败，显示的出错消息应该是“Error in call of sqrt”。提示：让TRY_MATH_FCN 调用try_math_fcn。  

24.3 节  

5. 在 inventory.c 程序（见 16.3节）中，main 函数用一个for 循环来提示用户输入一个操作码，然后读入码并调用insert、search、update 或print。在main 函数中加入一个setjmp 调用，要求使随后的longjmp 调用会返回到for循环。（在调用longjmp函数后，提示用户输入一个操作码，随后程序正常执行。）setjmp需要一个jmp_buf类型的变量，这个变量应该在哪儿声明呢？
