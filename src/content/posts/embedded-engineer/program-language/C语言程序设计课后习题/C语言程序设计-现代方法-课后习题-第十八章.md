---
title: 《C语言程序设计-现代方法》-课后习题-第十八章
published: 2026-03-09
description: ''
image: ''
tags: []
category: '程序设计'
draft: false 
lang: ''
---

## 第十八章 声明

### 练习题

18.1 节  

1. 请指出下列声明的存储类型、类型限定符、类型指定符、声明符和初始化器。  

   ```C
   (a) static char **lookup(int level);  
   (b) volatile unsigned long io_flags;  
   (c) extern char *file_name[MAX_FILES], path[];  
   (d) static const char token_buf[] = "";  
   ```

18.2 节  

2. 用 auto、extern、register 和 static 来回答下列问题。  

   ```
   (a)哪种存储类型主要用于表示能被几个文件共享的变量或函数？  
   (b)假设变量x需要被一个文件中的几个函数共享，但要对其他文件中的函数隐藏。那么变量x应该 被声明为哪种存储类型呢？  
   (c)哪些存储类型会影响变量的存储期？
   ```

2. 列出下列文件中每个变量和形式参数的存储期（静态/自动）、作用域（块/文件）和链接（内部/外部/无）：  

   ```C
   extern float a;  
   void f(register double b)  
   {   
     static int c;   
     auto char d;  
   }  
   ```

2. 假设f是下列函数。如果在此之前f从来没有被调用过，那么f(10)的值是多少呢？如果在此之前f 已经被调用过5次，那么f(10)的值又是多少呢？ 

   ```C
   int f(int i)  
   {   
     static int j = 0;   
     return i * j++;  
   }  
   ```

2. 指出下列语句是否正确，并验证你的答案。  

   ```
   (a) 具有静态存储期的变量都具有文件作用域。  
   (b) 在函数内部声明的变量都没有链接。  
   (c) 具有内部连接的变量都具有静态存储期。  
   (d) 每个形式参数都具有块作用域。  
   ```

2. 下面的函数希望打印一条出错消息。每条消息的前面有一个整数，表明函数已经被调用了多少次。 但是，消息前面的整数总是 1。找出错误所在，并说明如何在不对函数外部做任何修改的情况下修 正该错误。  

   ```C
   void print_error(const char *message)  
   {   
     int n = 1;   
     printf("Error %d: %s\n", n++, message);  
   }  
   ```

   

18.3 节

7. 假设声明x为const对象，那么下列关于x的陈述哪条是假的呢？

   ```
   (a) 如果 x的类型是int，那么可以把它用作switch语句中分支标号的值。  
   (b) 编译器将检查是否没有对x进行赋值。  
   (c) x 遵循和变量一样的作用域规则。  
   (d) x 可以是任意类型。  
   ```

   

18.4 节  

8. 请按下列每个声明指定的那样编写x类型的完整描述。  

   ```C
   (a) char (*x[10])(int);   
   (b) int (*x(int))[5];  
   (c) float *(*x(void))(int);   
   (d) void (*x(int, void (*y)(int)))(int);  
   ```

9. 请利用一系列的类型定义来简化练习题8中的每个声明。  

10. 请为下列变量和函数编写声明。 

    ```
    (a) p 是指向函数的指针，并且此函数以字符型指针作为实际参数，函数返回的也是字符型指针。  
    (b) f 是带有两个实际参数的函数：一个参数是指向结构的指针p，且此结构标记为t；另一参数是长 整数n。f返回指向函数的指针，且指向的函数无实际参数也无返回值。  
    (c) a 是含有 4个元素的数组，且每个元素都是指向函数的指针，而这些函数都是无实际参数且无返 回值的。a的元素初始指向的函数名分别是insert、search、update和print。  
    (d) b 是含有10个元素的数组，且每个元素都是指向函数的指针，而这些函数都有两个int型实际参 数且返回标记为t的结构。
    ```

11. 18.4 节讲过，下列声明是非法的：  

    ```C
    int f(int)[]; 			/* functions can't return arrays */ 
    int g(int)(int); 		/* functions can't return functions */ 
    int a[10](int); 		/* array elements can't be functions */
    ```

    然而，可以通过使用指针获得相似的效果：函数可以返回指向数组第一个元素的指针，也可以返回 指向函数的指针；数组的元素可以是指向函数的指针。请根据这些描述修订上述每个声明。  

12. (a) 假设函数f的声明如下，为函数f的类型编写完整的描述：  
    `int (*f(float (*)(long), char *))(double);`  
    (b)给出一个示例，说明如何调用f。  

18.5 节  

13. 下列哪些声明是合法的？（假设PI是表示3.141 59的宏。）  

    ```C
    (a) char c = 65;  
    (b) static int i = 5, j = i * i;  
    (c) double d = 2  * PI;   
    (d) double angles[] = {0, PI / 2, PI, 3 * PI / 2}; 
    ```

14. 下列哪些类型的变量不能被初始化？  

    ```
    (a) 数组变量  
    (b) 枚举变量  
    (c) 结构变量  
    (d) 联合变量  
    (e) 上述都不能  
    ```

15. 变量的哪种性质决定了它是否具有默认的初始值？ 

    ```
     (a) 存储期   
     (b) 作用域   
     (c) 链接    
     (d) 类型
    ```