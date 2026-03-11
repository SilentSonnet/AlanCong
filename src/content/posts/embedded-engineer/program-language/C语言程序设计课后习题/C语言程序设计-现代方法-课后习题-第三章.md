---
title: 《C语言程序设计-现代方法》-课后习题-第三章
published: 2023-02-02
description: ''
image: ''
tags: []
category: '程序设计'
draft: false 
lang: ''
---

## 第三章 格式化输入/输出

### 练习题

1. 下面的 printf 函数调用产生的输出分别是什么？

   ```
   (a) printf("%6d,%4d", 86, 1040);
   (b) printf("%12.5e", 30.253);
   (c) printf("%.4f", 83.162);
   (d) printf("%-6.2g", .0000009979);
   ```

   ```C
   #include<stdio.h>
   int main(void)
   {
   	printf("%6d,%4d\n", 86, 1040);
   	printf("%12.5e\n", 30.253);
   	printf("%.4f\n", 83.162);
   	printf("%-6.2g\n", .0000009979);
     
     return 0;
   }
   ```

   输出为：

   ```
       86,1040
    3.02530e+01
   83.1620
   1e-06
   ```

   

2. 编写 printf 函数调用，以下列格式显示 float 型变量 x。

   ```
   (a) 指数表示形式，栏宽 8，左对齐，小数点后保留 1 位数字。
   (b) 指数表示形式，栏宽 10，右对齐，小数点后保留 6 位数字。
   (c) 定点十进制表示形式，栏宽 8，左对齐，小数点后保留 3 位数字。
   (d) 定点十进制表示形式，栏宽 6，右对齐，小数点后无数字。
   ```

   ```C
   (a)printf("%-8.1e",x);
   (b)printf("%10.6e",x);
   (c)printf("%-8.3f",x);
   (d)printf("%6.f",x);
   ```

   默认情况下printf的输出是右对齐的，%m.pX的的m就是栏宽，也就是输出的总字符数。

3. 说明下列每对 scanf 格式串是否等价？如果不等价，请指出它们的差异。

   ```
   (a) "%d"与" %d"。
   (b) "%d-%d-%d"与"%d -%d -%d"。
   (c) "%f"与"%f "。
   (d) "%f,%f"与"%f, %f"。
   ```

   ```
   (a)等价。scanf在搜索整数的时候会忽略掉前面一个或多个的空格，所以对于任意的输入，二者等价。
   (b)不等价。根据普通字符'-'左右是否有空格一共可分为四种类型的输入：
      1. 1·-·2·-·3
      2. 1·-2·-3
      3. 1-·2-·3
      4. 1-2-3
      对于格式串"%d-%d-%d"来说只有3、4可以接收，但是对于格式串"%d -%d -%d"来说四种类型都可以接收，因此二者并不是对于任意输入都有相同的输出结果，二者并不等价。
   (c)等价。对于任意的输入不影响接收到的float类型数据，但是需要注意转换说明后的空格会导致scanf一直在等待下一个非空的字符而一直等待不退出。
   (d)等价。道理同(b)，二者都是能够接收3、4类型的输入。
   ```

   

4. 假设 scanf 函数调用的格式如下：`scanf("%d%f%d", &i, &x, &j);` 如果用户输入3 5 6 调用执行后，变量 i、x 和 j 的值分别是多少？（假设变量 i 和变量 j 都是 int 型，变量 x 是 float型。）

   ```C
   #include<stdio.h>
   int main(void)
   {
     int i, j;
     float x;
   	printf("Enter three number: ");
   	scanf("%d%f%d", &i, &x, &j);
   	printf("%d\n%f\n%d\n", i, x, j);
     
     return 0;
   }
   ```

   输出：

   ```
   Enter three number: 3 5 6
   3
   5.000000
   6
   ```

   

5. 假设 scanf 函数调用的格式如下：`scanf("%f%d%f", &x, &i, &y);` 如果用户输入3 45.6 789 调用执行后，变量 x、i 和 y 的值分别是多少？（假设变量 x 和变量 y 都是 float 型，变量 i 是 int型。）

   ```C
   #include<stdio.h>
   int main(void)
   {
     int i;
     float x, y;
   	printf("Enter three number: ");
   	scanf("%f%d%f", &x, &i, &y);
   	printf("%f\n%i\n%f\n", x, i, y);
     
     return 0;
   }
   ```

   输出：

   ```
   Enter three number: 3 45.6 789
   3.000000
   45
   0.600000
   ```

   

6. 指出如何修改 3.2 节中的 addfrac.c 程序，使用户可以输入在字符/的前后都有空格的分数。

   ```C
   #include <stdio.h>
   
   int main(void)
   {
     int num1, denom1, num2, denom2, result_num, result_denom;
   
     printf("Enter first fraction: ");
     scanf("%d/%d", &num1, &denom1);
   
     printf("Enter second fraction: ");
     // 在scanf的格式串中'/'的左右两边增加空格即可，其中前面的空格是必须的，后面的是可选的。
     // 因为格式串中一个空格可以匹配输入任意数量的空格，包括零个。
     // scanf("%d /%d", &i, &j);
     // scanf("%d / %d", &i, &j);
     scanf("%d/%d", &num2, &denom2);
   
     result_num = num1 * denom2 + num2 * denom1;
     result_denom = denom1 * denom2;
     printf("The sum is %d/%d\n", result_num, result_denom);
   
     return 0;
   }
   ```

   ```C
   *如果想在scanf普通字符前后都能够输入任意的空格就写成形如：
   scanf("%d /%d", &i, &j);
   scanf("%d / %d", &i, &j);
   ```

   

### 编程题

1. 编写一个程序，以月/日/年（即 *mm/dd/yy*）的格式接受用户输入的日期信息，并以年月日（即*yyyymmdd*）的格式将其显示出来：

   ```c
   Enter a date (mm/dd/yyyy): 2/17/2011
   You entered the date 20110217
   ```

   **ANS:**

   ```C
   #include<stdio.h>
   int main(void)
   {
       int day = 0, month = 0, year = 0;
       printf("Enter a date (mm/dd/yyyy):");
       scanf("%2d/%2d/%4d", &day, &month, &year);
       
       printf("You entered the date %4d%2d%.2d\n", year, month, day);
       return 0;
   }
   ```

   

2. 编写一个程序，对用户输入的产品信息进行格式化。程序会话应类似下面这样：

   ```
   Enter item number: 583
   Enter unit price: 13.5
   Enter purchase date (mm/dd/yyyy): 10/24/2010
   Item Unit Purchase 
   Price Date 
   583 $ 13.50 10/24/2010 
   ```

   其中，产品编号和日期项采用左对齐方式，单位价格采用右对齐方式，允许美元金额最大取值为9999.99。提示：各个列使用制表符控制。
   **ANS:**

   ```C
   #include<stdio.h>
   #include<stdlib.h>
   int main(void)
   {
       int number, day, month, year;
       float price;
       printf("Enter item number:");
       scanf("%d", &number);
       printf("Enter unit price:");
       scanf("%f", &price);
       printf("Enter purchase date (mm/dd/yyyy):");
       scanf("%d/%d/%d", &month, &day, &year);
   
       printf("Item\t\tUnit\t\tPurchase\n");
       printf("\t\tPrice\t\tDate\n");
       printf("%d\t\t$%7.2f\t%.2d\\%.2d\\%4d\n", number, price, month, day, year);
   
       return 0;
   }
   ```

   

3. 图书用国际标准书号（ISBN）进行标识。2007 年 1 月 1 日之后分配的 ISBN 包含 13 位数字（旧的 ISBN使用 10 位数字），分为 5 组，如 978-0-393-97950-3。第一组（GS1 前缀）目前为 978 或 979。第二组（组标识）指明语言或者原出版国及地区（如 0 和 1 用于讲英语的国家）。第三组（出版商编号）表示出版商（393 是 W. W. Norton 出版社的编号）。第四组（产品编号）是由出版商分配的用于识别具体哪一本书的编号（97950）。ISBN 的末尾是一个校验数字，用于验证前面数字的准确性。编写一个程序来分解用户输入的 ISBN 信息：

   ```
   Enter ISBN: 978-0-393-97950-3
   GS1 prefix: 978 
   Group identifier: 0 
   Publisher code: 393 
   Item number: 97950 
   Check digit: 3 
   ```

   注意：每组中数字的个数是可变的，不能认为每组的长度都与示例一样。用实际的 ISBN 值（通常放在书的封底和版权页上）测试你编写的程序。
   **ANS:**

   ```C
   #include<stdio.h>
   int main(void)
   {
       int prefix, group, code, number, digit;
       printf("Enter ISBN:");
       scanf("%d-%d-%d-%d-%d", &prefix, &group, &code, &number, &digit);
       printf("GS1 prefix: %d\n", prefix);
       printf("Group identifier: %d\n", group);
       printf("Publisher code: %d\n", code);
       printf("Item number: %d\n", number);
       printf("Check digit: %d\n", digit);
   
       return 0;
   }
   ```

   

4. 编写一个程序，提示用户以(xxx) xxx-xxxx 的格式输入电话号码，并以 xxx.xxx.xxxx 的格式显示该号码：

   ```
   Enter phone number [(xxx) xxx-xxxx]: (404) 817-6900
   You entered 404.817.6900 
   ```

   **ANS:**

   ```C
   #include<stdio.h>
   int main(void)
   {
       int number1, number2, number3;
       printf("Enter phone number [(xxx) xxx-xxxx]:");
       scanf("(%d)%d-%d", &number1, &number2, &number3);
       printf("%d.%d.%d\n", number1, number2, number3);
   
       return 0;
   }
   ```

   

5. 编写一个程序，要求用户（按任意次序）输入 1~16 的所有整数，然后用 4×4 矩阵的形式将它们显示出来，再计算出每行、每列和每条对角线上的和：

   ```
   Enter the numbers from 1 to 16 in any order: 
   16 3 2 13 5 10 11 8 9 6 7 12 4 15 14 1
   16 3  2  13 
    5 10 11 8 
    9 6  7  12 
    4 15 14 1 
   Row sums: 34 34 34 34 
   Column sums: 34 34 34 34 
   Diagonal sums: 34 34
   ```

   如果行、列和对角线上的和都一样（如本例所示），则称这些数组成一个幻方（magic square）。这里给出的幻方出现于艺术家和数学家 Albrecht Dürer 创作于 1514 年的一幅画中。（注意，矩阵的最后一行中间的两个数给出了该画的创作年代。）
   **ANS:**

   ```C
   #include<stdio.h>
   int main(void)
   {
       int a11, a12, a13, a14;
       int a21, a22, a23, a24;
       int a31, a32, a33, a34;
       int a41, a42, a43, a44;
   
       printf("Enter the numbers from 1 to 16 in any order:");
       scanf("%d%d%d%d %d%d%d%d %d%d%d%d %d%d%d%d",
               &a11,&a12,&a13,&a14,
               &a21,&a22,&a23,&a24,
               &a31,&a32,&a33,&a34,
               &a41,&a42,&a43,&a44);
   
       printf("%d %d %d %d\n", a11, a12, a13, a14);    
       printf("%d %d %d %d\n", a21, a22, a23, a24);    
       printf("%d %d %d %d\n", a31, a32, a33, a34);    
       printf("%d %d %d %d\n", a41, a42, a43, a44);
   
       printf("Row sums:%d %d %d %d\n", a11 + a12 + a13 + a14,
                                        a21 + a22 + a23 + a24,
                                        a31 + a32 + a33 + a34,
                                        a41 + a42 + a43 + a44);
       printf("Column sums:%d %d %d %d\n", a11 + a21 + a31 + a41,
                                           a12 + a22 + a32 + a42,
                                           a13 + a23 + a33 + a43,
                                           a14 + a24 + a34 + a44);
       printf("Diagonal sums:%d %d\n", a11 + a22 + a33 + a44,
                                        a14 + a23 + a32 + a41);
       return 0;
   }
   ```

   

6. 修改 3.2 节的 addfrac.c 程序，使用户可以同时输入两个分数，中间用加号隔开：

   ```
   Enter two fractions separated by a plus sign: 5/6+3/4
   The sum is 38/24
   ```

   **ANS:**

   ```C
   /* Adds two fractions */ 
   #include <stdio.h> 
   int main(void) 
   { 
       int num1, denom1, num2, denom2, result_num, result_denom; 
       printf("Enter two fractions separated by a plus sign: "); 
       scanf("%d/%d+%d/%d", &num1, &denom1, &num2, &denom2); 
       result_num = num1 * denom2 + num2 * denom1; 
       result_denom = denom1 * denom2; 
       printf("The sum is %d/%d\n", result_num, result_denom); 
       return 0; 
   }
   ```



