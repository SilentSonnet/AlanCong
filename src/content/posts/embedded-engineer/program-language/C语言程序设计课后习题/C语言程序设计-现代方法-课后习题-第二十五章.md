---
title: 《C语言程序设计-现代方法》-课后习题-第二十五章
published: 2026-03-09
description: ''
image: ''
tags: []
category: '程序设计'
draft: false 
lang: ''
---

## 第二十五章 国际化特征

### 练习题

25.1 节  

1. 请确定你用的编译器支持哪些地区。  

25.2 节  

2. 用于kanji（日文中的汉字）的Shift-JIS编码要求每个字符是单字节或者是双字节的。如果字符的第一个字节位于0x81 和0x9f 之间，或者位于0xe0 和0xef 之间，那么就需要第二个字节。（把任何其他字节看成是整个字符。）第二个字节必须在0x40和0x7e之间，或者在0x80和0xfc之间。（所有的范围都包含边界值。）请指出以下面的每个字符串作为参数时，25.2节的mbcheck 函数的返回值。假定多字节字符用当前地区的Shift-JIS编码。  

   ```
   (a) "\x05\x87\x80\x36\xed\xaa"  
   (b) "\x20\xe4\x50\x88\x3f"  
   (c) "\xde\xad\xbe\xef"  
   (d) "\x8a\x60\x92\x74\x41"  
   ```

   

3. UTF-8的一个有用的性质是，多字节字符内的字节序列不可能表示其他的有效多字节字符。用于 kanji 的 Shift-JIS 编码（见练习题2）是否具有这一性质？  

4. 给出表示如下短语的C语言字面串。假设字符à、è、é、ê、î、ô、û和ü用单字节的Latin-1字符表示。 （需要查出这些字符的Latin-1码点。）例如，短语déjà vu可以用字符串`"d\xe9j\xe0 vu"`表示。  

   ```
   (a) Côte d'Azur
   (b) crème brûlée  
   (c) crème fraîche  
   (d) Fahrvergnügen  
   (e) tête-à-tête  
   ```

   

5. 重复练习题4，这次采用UTF-8多字节编码。例如，短语`déjà vu`可以用字符串`"d\xc3\xa9j\xc3\  xa0 vu"`表示。  

25.3 节  

6. 请通过尽可能多地用三联符替换字符的方法来修改下面的程序段。  

   ```C
   while ((orig_char = getchar()) != EOF) { 
     new_char = orig_char ^ KEY; 
     if (isprint(orig_char) && isprint(new_char)) 
       putchar(new_char); 
     else 
       putchar(orig_char); 
   }
   ```

   

7. 修改练习题6中的程序段，用双联符和<iso646.h>中定义的宏来替换尽可能多的记号。 

### 编程题

1. 编写一个程序，用来测试你用的编译器的""（本地）地区是否和"C"地区一样。  

2. 编写一个程序，从命令行获取地区的名字，然后显示存储在相应的 lconv 结构中的值。例如，如果地区是"fi_FI"（芬兰），程序的输出可能如下：  

   ```C
   decimal_point = "," 
   thousands_sep = " " 
   grouping = 3 
   mon_decimal_point = "," 
   mon_thousands_sep = " " 
   mon_grouping = 3 
   positive_sign = "" 
   negative_sign = "-" 
   currency_symbol = "EUR" 
   frac_digits = 2 
   p_cs_precedes = 0 
   n_cs_precedes = 0 
   p_sep_by_space = 2 
   n_sep_by_space = 2 
   p_sign_posn = 1 
   n_sign_posn = 1 
   int_curr_symbol = "EUR " 
   int_frac_digits = 2 
   int_p_cs_precedes = 0 
   int_n_cs_precedes = 0 
   int_p_sep_by_space = 2 
   int_n_sep_by_space = 2 
   int_p_sign_posn = 1 
   int_n_sign_posn = 1
   ```


   出于可读性的考虑，grouping和mon_grouping中的字符应显示为十进制数。
