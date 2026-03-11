---
title: 《C语言程序设计-现代方法》-课后习题-第二章
published: 2023-02-01
description: ''
image: ''
tags: []
category: '程序设计'
draft: false 
lang: ''
---

## 第二章 C语言基本概念
### 练习题

1. 建立并运行由 Kernighan 和 Ritchie 编写的著名的“hello, world”程序：

```C
#include <stdio.h> 
int main(void) 
{ 
   printf("hello, world\n"); 
} 
```

   在编译时是否有警告信息？如果有，需要如何修改呢？
   **ANS：**

   ```
   // 使用的机器型号和编译器版本如下，在编译过程中即使使用了-Wall选项之后也没有任何报错。
   // 但这个程序的“错误”很明显就是没有return或exit(0)语句。
   Apple clang version 17.0.0 (clang-1700.3.19.1)
   Target: arm64-apple-darwin25.0.0
   Thread model: posix
   InstalledDir: /Library/Developer/CommandLineTools/usr/bin
   ```

   

2. 思考下面的程序：

   ```C
   #include <stdio.h> 
   int main(void) 
   { 
     printf("Parkinson's Law:\nWork expands so as to "); 
     printf("fill the time\n"); 
     printf("available for its completion.\n"); 
     return 0; 
   } 
   ```

   (a) 请指出程序中的指令和语句。
   (b) 程序的输出是什么？
   **ANS:**

   ```
   (a)程序共有#include<stdio.h>一个指令，三条`printf`语句和一条`return`共四条语句。
   (b)程序的输出是三行字符串：
   ```

   ```
   Parkinson's Law:
   Work expands so as to fill the time
   available for its completion.
   ```

   

3. 通过下列方法缩写程序 dweight.c：

   (1) 用初始化器替换对变量 height、length 和 width 的赋值；
   (2) 去掉变量 weight，在最后的 printf 语句中计算(volume + 165)/ 166。
   **ANS：**

   ```C
   /* Computes the dimensional weight of a 12" x 10" x 8" box */ 
   #include <stdio.h> 
   int main(void) 
   { 
     int height = 8, length = 12, width = 10, volume; 
     volume = height * length * width; 
     printf("Dimensions: %dx%dx%d\n", length, width, height); 
     printf("Volume (cubic inches): %d\n", volume); 
     printf("Dimensional weight (pounds): %d\n", (volume + 165) / 166); 
     return 0; 
   }
   ```

   

4. 编写一个程序来声明几个 int 型和 float 型变量，不对这些变量进行初始化，然后显示它们的值。
   这些值是否有规律？（通常情况下没有。）
   **ANS：**

   ```C
   /*
     本程序演示了局部变量在未初始化时的行为。
   
     在 C 语言中，未显式初始化的局部变量（如函数内定义的 int 或 float 变量）
     的值是“未定义的”（undefined behavior）。也就是说，变量 a、b、c、d、e、f
     会占用内存中的某个位置，但这些位置可能包含任意残留数据。
   
     因此：
       - 这些变量不会自动被赋值为 0；
       - 它们的输出结果是不可预测的，可能在不同的编译器、运行环境下变化；
       - 程序虽然能编译通过，但输出没有规律，也不具有参考意义。
   
     结论：在使用局部变量之前必须先显式初始化，否则会导致不可预期的结果。
   */
   
   #include <stdio.h>
   int main(void)
   {
       int a, b, c;
       float d, e, f;
   
       printf("%d, %d, %d\n", a, b, c);
       printf("%f, %f, %f\n", d, e, f);
   
       return 0;
   }
   
   ```

   

5. 下列 C 语言标识符中，哪些是不合法的？

   ```
   (a) 100_bottles
   (b) _100_bottles
   (c) one_hundred_bottles _
   (d) bottles_by_the_hundred_ 
   ```

   **ANS：**

   ```
   100_bottles是数字开头的，one\_hundred_bottles _中间含有空格，这两个是不合法的。
   ```

   

6. 为什么说在标识符中使用多个相邻的下划线（如 current___balance）不太合适？
   **ANS：**

   ```C
   /*
     在 C 语言中，标识符中虽然可以使用下划线 (_)，
     但不建议在标识符中使用多个相邻的下划线（例如 current___balance），
     原因如下：
   
     1. **可读性差**  
        多个连续下划线会让标识符在视觉上难以区分，容易与其他变量混淆。
        例如：
            current_balance
            current__balance
            current___balance
        这三者看起来非常相似，不利于代码的可维护性。
   
     2. **不符合命名规范**  
        在实际编程规范（如 ISO C 标准及各大公司风格指南）中，
        推荐使用一个下划线来分隔单词，而不是多个。
        多个下划线会被认为是命名不规范的“噪声”。
   
     3. **潜在的可移植性风险**  
        尽管编译器不会报错，但在某些系统库或编译环境中，
        含有多个下划线（特别是以 `__` 开头的）标识符可能被保留用于内部实现，
        从而导致命名冲突或不可预期的行为。
   
     因此：
        建议使用清晰、规范的命名方式，例如：
            current_balance
        而避免使用：
            current___balance
   */
   
   ```

   

7. 下列哪些是 C 语言的关键字？

   ```C
   (a) for
   (b) If
   (c) main
   (d) printf
   (e) while
   ```

   **ANS:**

   ```
   在这些选项中，只有 **for** 和 **while** 是 C 语言关键字。“If” 因为大小写错误不是关键字；“main” 是函数名而非关键字；“printf” 是标准库函数而非关键字。
   ```

   

8. 下面的语句中有多少个记号？

   ```C
   answer=(3*q–p*p)/3; 
   ```

   **ANS:** 

   ```
   记号分别为 answer、=、(、3、 *、q、-、p、\*、p、)、/、3、；一共14个记号。
   ```

   

9. 在练习题 8 的记号之间插入空格，使该语句更易于阅读。

   ```C
   answer = ( 3 * q – p * p ) / 3; 
   ```

   

10. 在 dweight.c 程序（2.4 节）中，哪些空格是必不可少的？
    **ANS：**

    ```
    本程序中，只有用于分隔关键字与标识符（如 int main、return 0、int height）的空格是必不可少的；其余空格仅用于增强可读性，可以省略。
    ```

    ```C
    /* Computes the dimensional weight of a 12" x 10" x 8" box */ 
    #include<stdio.h> 
    int main(void) 
    { 
      int height, length, width, volume, weight; 
      height = 8; 
      length = 12; 
      width = 10; 
      volume = height * length * width; 
      weight = (volume + 165) / 166; 
      printf("Dimensions: %dx%dx%d\n", length, width, height); 
      printf("Volume (cubic inches): %d\n", volume); 
      printf("Dimensional weight (pounds): %d\n", weight); 
      return 0; 
    }
    ```

    

### 编程题

1. 编写一个程序，使用 printf 在屏幕上显示下面的图形：

   ```
                 *  
               *
             *
   *       *
     *   * 
       * 
   ```

   **ANS：**

   ```C
   #include<stdio.h>
   #include<stdlib.h>
   int main(void)
   {
       printf("        *\n");
       printf("       *\n");
       printf("      *\n");
       printf("     *\n");
       printf("*   *\n");
       printf(" * *\n");
       printf("  *\n");
   
       return(0);
   }
   ```

   

2. 球体的体积计算公式为 $ v = \frac{4}{3}\pi r^3 $，其中 $r$ 为球体半径。在程序中，分数部分应写成 `4.0f / 3.0f`，而不能写作 `4 / 3`，因为在 C 语言中，`4` 和 `3` 都是整型常量，`4 / 3` 会执行整数除法，结果为 `1`，从而导致计算结果偏小约三分之一。使用浮点数除法 `4.0f / 3.0f` 才能得到正确的结果（约为 1.3333）。此外，C 语言没有指数运算符，计算 $r^3$ 时应写作 `r * r * r`。
   **ANS：**

   ```C
   #include<stdio.h>
   #include<stdlib.h>
   int main(void)
   {
       float radius = 0.0f, volume = 0.0f, pi = 3.1415926f;
       printf("Please enter the radius:");
       scanf("%f", &radius);
   
       printf("The volume of the input sphere is:%.2f\n",
           4 / 3 * radius * radius * radius * pi);
   
       return 0;
   }
   ```

   

3. 修改上题中的程序，使用户可以自行输入球体的半径。
   **ANS:**

   ```C
   #include<stdio.h>
   #include<stdlib.h>
   int main(void)
   {
       float radius = 0.0f, volume = 0.0f, pi = 3.1415926f;
       printf("Please enter the radius:");
       scanf("%f", &radius);
   
       printf("The volume of the input sphere is:%.2f\n",
           4.0f / 3.0f * radius * radius * radius * pi);
   
       return 0;
   }
   ```

   

4. 编写一个程序，要求用户输入一个美元数额，然后显示出增加5%税率后的相应金额。格式如下所示：

   ```
   Enter an amount: 100.00
   With tax added: $105.00 
   ```

   **ANS:**

   ```C
   #include<stdio.h>
   #include<stdlib.h>
   int main(void)
   {
       float amount = 0.0f, tax_rate = 1.05f;
   
       printf("Enter an amount:");
       scanf("%f", &amount);
   
       printf("With tax added:%.2f$\n", amount * tax_rate);
   
       return 0;
   }
   ```

   

5. 编程要求用户输入 *x* 的值，然后显示如下多项式的值：
   多项式表达式为：
   $$
   3x^5 + 2x^4 - 5x^3 - x^2 + 7x - 6
   $$
   提示：C语言没有指数运算符，所以需要对*x*进行自乘来计算其幂。（例如，x\*x*x就是x的三次方。）
   **ANS:**

   ```C
   #include<stdio.h>
   int main(void)
   {
       float x = 0.0f;
       printf("Please enter the value of x:");
       scanf("%f", &x);
   
       printf("%.2f\n", 3 * x * x * x * x * x +
               2 * x * x * x * x - 5 * x * x * x - x * x + 7 * x - 6);
   
       return 0;
   }
   ```

   

6. 修改上题，用如下公式对多项式求值：
   $$
   ((((3x + 2)x - 5)x - 1)x + 7)x - 6
   $$
   注意，修改后的程序所需的乘法次数减少了。这种多项式求值方法即 Horner 法则。
   **ANS:**

   ```C
   #include<stdio.h>
   int main(void)
   {
       float x = 0.0f;
       printf("Please enter the value of x:");
   
       scanf("%f", &x);
   
       printf("The value of the polynomial is:%.2f\n",
               ((((3 * x + 2) * x - 5)  * x - 1) * x + 7) * x - 6 );
       return 0;
   }
   ```

   

7. 编写一个程序，要求用户输入一个美元数额，然后显示出如何用最少张数的 20 美元、10 美元、5 美元和 1 美元钞票来付款：

   ```
   Enter a dollar amount: 93
   $20 bills: 4 
   $10 bills: 1 
   $5 bills: 0 
   $1 bills: 3 
   ```

   提示：将付款金额除以 20，确定 20 美元钞票的数量，然后从付款金额中减去 20 美元的总金额。对其他面值的钞票重复这一操作。确保在程序中始终使用整数值，不要用浮点数。
   **ANS:**

   ```C
   #include<stdio.h>
   int main(void)
   {
       int amount = 0;
       printf("Please enter a dollar amount:");
       scanf("%d", &amount);
   
       printf("$20 bills:%d\n", amount / 20);
       amount -= (amount / 20) * 20;
       printf("$10 bills:%d\n", amount / 10);
       amount -= (amount / 10) * 10;
       printf("$ 5 bills:%d\n", amount / 5);
       amount -= (amount / 5) * 5;
       printf("$ 1 bills:%d\n", amount);
   
       return 0;
   }
   ```

   

8. 编程计算第一、第二、第三个月还贷后剩余的贷款金额：

   ```
   Enter amount of loan: 20000.00
   Enter interest rate: 6.0
   Enter monthly payment: 386.66
   Balance remaining after first payment: $19713.34 
   Balance remaining after second payment: $19425.25 
   Balance remaining after third payment: $19135.71 
   ```

   在显示每次还款后的余额时保留两位小数。提示：每个月的贷款余额减去还款金额后，还需要加上贷款余额与月利率的乘积。月利率的计算方法是把用户输入的利率转换成百分数再除以 12。
   **ANS:**

   ```C
   #include<stdio.h>
   int main(void)
   {
       float loan = 0.0f, rate = 0.0f, payment = 0.0f, left_payment = 0.0f;
       float first = 0.0f, second = 0.0f, third = 0.0f;
       printf("Enter amount of loan:");
       scanf("%f", &loan);
       printf("Enter interest rate:");
       scanf("%f", &rate);
       printf("Enter monthly payment:");
       scanf("%f", &payment);
   
       first = loan * (1.0 + (rate / 1200)) - payment;
       second = first * (1.0 + (rate / 1200)) - payment;
       third = second * (1.0 + (rate / 1200)) - payment;
       printf("Balance remaining after first payment:%.2f\n", first);
       printf("Balance remaining after second payment:%.2f\n", second);
       printf("Balance remaining after third payment:%.2f\n", third);
   
       return 0;
   }
   ```