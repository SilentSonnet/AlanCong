---
title: 《C语言程序设计-现代方法》-课后习题-第二十七章
published: 2026-03-09
description: ''
image: ''
tags: []
category: '程序设计'
draft: false 
lang: ''
---

## 第二十七章 C99 对数学计算的新增支持

### 练习题

27.1 节 

1. 在你系统上安装的中，找出int$N$\_t和uint$N$\_t类型的声明。$N$可以是哪些值？  
2. 编写如下带参数的宏：INT32_C(n)、UINT32_C(n)、INT64_C(n)和UINT64_C(n)。假设 int 类型和long int 类型为32位宽，而long long int类型为64位宽。提示：使用##预处理运算符把 一个包含字符L和U的组合的后缀加到n的后面。（7.1节介绍了如何在整型常量中使用后缀L和U。）  

27.2 节  

3. 在下面的每条语句中，假设变量i的类型是原始类型。用中的宏修改每条语句，使得 i 的类型变为指定的新类型时，语句仍能正常工作。  

```
(a) printf("%d",i); 				原始类型：int 					新类型：int8_t 
(b) printf("%12.4d", i); 		原始类型：int 					新类型：int32_t 
(c) printf("%-6o", i); 			原始类型：unsigned int 新类型：uint16_t 
(d) printf("%#x", i); 			原始类型：unsigned int 新类型：uint64_t
```

  

27.5 节  

4. 假设有下列变量声明：  

   ```C
   int i;  
   float f;  
   double d;  
   long double ld;  
   float complex fc;
   double complex dc;  
   long double complex ldc; 
   ```

    下面都是<tgmath.h>中的宏的调用，请给出预处理（用<math.h>或<complex.h>中的函数替代宏）之后的形式。

   ```C
   (a) tan(i)  
   (b) fabs(f)  
   (c) asin(d)  
   (d) exp(ld) 
   (e) log(fc)  
   (f) acosh(dc)  
   (g) nexttoward(d,ld)  
   (h) remainder(f, i)  
   (i) copysign(d, ld)  
   (j) carg(i)  
   (k) cimag(f)  
   (l) conj(ldc)
   ```

   

### 编程题

1. \<C99>对27.4节的quadratic.c程序做如下修改。 
   (a) 让用户输入多项式的系数（变量a、b、c的值）。  
   (b) 让程序在显示根的值之前对判别式进行测试。如果判别式为负，按以前的方式显示根的值；如果判别式非 负，以实数（无虚部）的形式显示根的值。例如，如果二次方程为$x^2+x-2=0$，那么程序的输出为  

   ```
   root1 = 1  
   root2 = -2  
   ```

   (c) 修改程序，使得虚部为负的复数的显示形式为$a-bi$而不是$a+-bi$。例如，程序使用原始系数的输出将变为  

   ```
   root1 = -0.2 + 0.4i  
   root2 = -0.2 – 0.4i
   ```

2. 编写程序，把用笛卡儿坐标表示的复数转换为极坐标形式。用户输入a和b（复数的实部和虚部），程序显示r和θ的值。  

3. 编写程序，把用极坐标表示的复数转换为笛卡儿形式。用户输入r和θ的值，程序以$a+bi$的形式显示该数，其中  
   $a = r cosθ$
   $b = r sin θ$  

4. 编写程序，当给定正整数$n$时显示单位元素（unity，幺元）的$n$次方根。单位元素的$n$次方根由公式 $e^{2πik/n}$ 给出，其中 $k$是$0 \textasciitilde (n-1)$范围内的整数。 

