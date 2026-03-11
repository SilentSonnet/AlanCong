---
title: 《C语言程序设计-现代方法》-课后习题-第七章
published: 2023-02-06
description: ''
image: ''
tags: []
category: '程序设计'
draft: false 
lang: ''
---

## 第七章 基本类型

### 练习题

7.1 节

1. 给出下列整型常量的十进制值。

```
(a) 077 
(b) 0x77
(c) 0XABC
```

```
(a) 7 x 8 + 7 = 63 
(b) 7 x 16 + 7 = 119 
(c) 10 x 16 x 16 + 11 x 16 + 12 = 2560 + 176 + 12 = 2748  
```

```C
#include<stdio.h>
int main(void)
{
    int a, b, c;
    
    a = 077;
    b = 0x77;
    c = 0xABC;

    printf("%d %d %d", a, b, c);

    return 0;
}
```

7.2 节

2. 下列哪些常量在 C 语言中不是合法的？区分每一个合法的常量是整数还是浮点数。

```
(a) 010E2
(b) 32.1E+5
(c) 0790
(d) 100_000
(e) 3.978e-2
```

```
(a) 合法，八进制整数
(b)	合法，浮点数
(c)	合法，八进制整数(写错了，八进制数中不可能有9存在)
(d) 非法，不能有下划线
(e) 合法，浮点数
```

3. 下列哪些类型在 C 语言中不是合法的？

```
(a) short unsigned int
(b) short float
(c) long double
(d) unsigned long
```

```
(a) short unsigned int （合法）
(b) short float （不合法）
(c) long double （C99合法）
(d) unsigned long （合法）
```

```C
#include <stdio.h>
int main(void)
{
    short unsigned int i;
    // 编译不通过
    short float j;
    long double k;
    unsigned long l;

    return 0;
}
```

```
alancong@AlanCongdeMacBook-Air chapter_7 % cc 7_3.c 
7_3.c:5:5: error: 'short float' is invalid
    5 |     short float j;
      |     ^
1 error generated.
```

7.3 节

4. 如果变量 c 是 char 类型，那么下列哪条语句是非法的？

```
(a) i += c; /* i has type int */ 
(b) c = 2 * c – 1; 
(c) putchar(c); 
(d) printf(c); 
```

```
(a) 合法的
(b) 合法的
(c) 合法的
(d) 非法的，不符合printf的使用规则；
```

```
alancong@AlanCongdeMacBook-Air chapter_7 % cc 7_4.c
7_4.c:9:12: error: incompatible integer to pointer conversion passing 'char' to parameter of type 'const char *'; take the address with & [-Wint-conversion]
    9 |     printf(c);
      |            ^
      |            &
/Library/Developer/CommandLineTools/SDKs/MacOSX.sdk/usr/include/_printf.h:34:36: note: passing argument to parameter here
   34 | int      printf(const char * __restrict, ...) __printflike(1, 2);
      |                                        ^
7_4.c:9:12: warning: format string is not a string literal (potentially insecure) [-Wformat-security]
    9 |     printf(c);
      |            ^
7_4.c:9:12: note: treat the string as an argument to avoid this
    9 |     printf(c);
      |            ^
      |            "%s", 
1 warning and 1 error generated.
```

5. 下列哪条不是书写数 65 的合法方式？（假设字符集是 ASCII。）

```
(a) 'A' 
(b) 0b1000001 
(c) 0101 
(d) 0x41 
```

全部都是合法的表示方式。

6. 对于下面的数据项，指明 char、short、int、long 类型中哪种类型是足以存储数据的最小类型。

```
(a) 一个月的天数
(b) 一年的天数
(c) 一天的分钟数
(d) 一天的秒数
```

```
(a) 一个月的天数：char
(b) 一年的天数：short int
(c) 一天的分钟数：short int
(d) 一天的秒数：int
```

```C
#include<stdio.h>
int main(void)
{
    char a;
    short int b, c;
    int d;

    a = 31;
    b = 365;
    c = 60 * 24;
    d = 60 * 60 * 24;

  	// 编译器没有给出转换的警告。
    printf("%d\n%d\n%d\n%d\n", a, b, c, d);

    return 0;
}
```

7. 对于下面的字符转义，给出等价的八进制转义。（假定字符集是 ASCII。）可以参考附录 E，其中列出了 ASCII 字符的数值码。

```
(a) \b 
(b) \n 
(c) \r 
(d) \t
```

```
(a) \b == \10
(b) \n == \12
(c) \r == \15
(d) \t == \11
```

```C
#include<stdio.h>
int main(void)
{
    printf("\10 \12 \15 \11");

    return 0;
}
```

八进制的时候不能写成\07这样的形式，因为\0在C语言中标志字符串的中止，会停止字符串的输出。

8. 重复练习题 7，给出等价的十六进制转义。

```C
#include<stdio.h>
int main(void)
{
    printf("\x07 \x0a \x0d \x09");

    return 0;
}
```

9. 假设变量 i 和变量 j 都是 int 类型，那么表达式 i / j + 'a' 是什么类型？

```C
i / j的运算结果仍然是int类型，加上'a'的时候因为char类型比int类型要窄，所以整体仍然是int类型。
```

10. 假设变量 i 是 int 类型，变量 j 是 long int 类型，并且变量 k 是 unsigned int 类型，那么表达式 i + (int)j * k 是什么类型？


```C
根据运算优先级i + (int)j * k先计算(int)j * k因为int类型和unsigned int类型长度相同，因此表达式的类型被转换为unsigned int类型，最后加上i的时候也是因为转换规则整体表达式为unsigned int类型。
```

11. 假设变量 i 是 int 类型，变量 f 是 float 类型，变量 d 是 double 类型，那么表达式 i * f / d 是什么类型？

```
根据运算的优先级先计算i * f，因为int类型比float类型要窄，所以表达式被隐式转换为float类型，又因为d是double类型，所以又会被隐式转换为double类型，所以最终表达式就是double类型的。 
```

12. 假设变量 i 是 int 类型，变量 f 是 float 类型，变量 d 是 double 类型，请解释在执行下列语句时发生了什么转换？d = i + f;

```
按照运算优先级先看i + f因为i是int类型，f是float类型，int类型比float类型要窄，所以表达式被隐式转换为了float类型，又因为d为double类型，所以在赋值前表达式i + f需要被隐式转换为double类型，所以最终表达式就是double类型的。
```

13. 假设程序包含下列声明：

```
char c = '\1';
short s = 2;
int i = -3;
long m = 5;
float f = 6.5f;
double d = 7.5;
```

给出下列每个表达式的值和类型。

```
(a) c * i
(b) s + m
(c) f / c
(d) d / s
(e) f – d
(f) (int) f
```

```
(a) c * i (int) -3
(b) s + m (long) 7
(c) f / c (float) 6.5
(d) d / s (double) 3.75
(e) f – d (double) -1
(f) (int) f (int) 6
```

```C
#include <stdio.h>
int main(void)
{
    char c = '\1';
    short s = 2;
    int i = -3;
    long m = 5;
    float f = 6.5f;
    double d = 7.5;

    printf("%d\n", c * i);
    printf("%ld\n", s + m);
    printf("%f\n", f / c);
    printf("%f\n", d / s);
    printf("%f\n", f - d);
    printf("%d\n", (int)f);

    return 0;
}
```

14. 下列语句是否总是可以正确地计算出 f 的小数部分（假设 f 和 frac_part 都是 float 类型的变量）？

`frac_part = f – (int) f;`如果不是，那么出了什么问题？

```
因为int是比float类型要窄的一种类型，所以当float表示的数值在int类型以下的时候，这样子是没有问题的，但是当float表示的数值在int表示的范围之外，那么使用强制类型转换就会导致数值被截取，产生错误的结果。
```

15. 使用 typedef 创建名为 Int8、Int16 和 Int32 的类型。定义这些类型，使它们可以在你的机器上分别表示 8 位、16 位和 32 位的整数。

```C
#include<stdio.h>
#include<stdint.h>
typedef int8_t Int8;
typedef int16_t Int16;
typedef int32_t Int32;
int main(void)
{
    Int8 a = -128;  
    Int16 b = 32767; 
    Int32 c = 2147483647; 


    printf("Int8: %d\n", a);
    printf("Int16: %d\n", b);
    printf("Int32: %d\n", c);

    return 0;
}
```

### 编程题

1. 如果 $ i \times i $ 超出了 `int` 类型的最大取值，那么 6.3 节的程序 `square2.c` 将失败（通常会显示奇怪的答案）。运行该程序，并确定导致失败的 $n$ 的最小值。尝试把变量 `i` 的类型改成 `short` 并再次运行该程序。（不要忘记更新 `printf` 函数调用中的转换说明！）然后尝试将其改成 `long`。从这些实验中，你能总结出在你的机器上用于存储整数类型的位数是多少吗？


```C
#include <stdio.h>
int main(void)
{
    for (short i = 1; i < 32767; i++)
    {
        // printf("%10d%10d\n", i, i * i);
        if ((i * i) < 0)
        {
            printf("%d\n", i);
            break;
        }
        short res = (i * i);
        if (res < 0)
        {
            printf("%d\n", i);
            break;
        }
    }

    for (int i = 1; i < 2147483647; i++)
    {
        // printf("%10d%10d\n", i, i * i);
        if ((i * i) < 0)
        {
            printf("%d\n", i);
            break;
        }
    }

    for (long i = 1; i < 9223372036854775807; i++)
    {
        // printf("%10d%10d\n", i, i * i);
        if ((i * i) < 0)
        {
            printf("%ld\n", i);
            break;
        }
    }

    return 0;
}
```

```C
alancong@AlanCongdeMacBook-Air chapter_7 % ./a.out 
182
46341
3037000500
```

```
问题的关键在于，(i * i) 结果会自动转换为 int 类型进行计算，因为 C 语言中的算术运算会首先提升到 int 类型，这使得溢出的值不会立即在计算时被检测出来，而是会存储为一个溢出的负值（因为溢出会导致符号位改变）。
因此short类型的溢出用寻常的方式无法检测到，但是通过使用赋值语句就可以强制将已经提升为int类型的数值转化为short，就可以检测到类型的溢出。
```

2. 修改 6.3 节的程序 `square2.c`，每 24 次平方运算后暂停，并显示下列信息：

```
Press Enter to continue...
```

显示完上述消息后，程序应该使用 `getchar` 函数读入一个字符。`getchar` 函数读到用户输入的回车键才允许程序继续。

```C
#include <stdio.h>

int main(void)
{
    int i, n;

    printf("This program prints a table of squares.\n");
    printf("Enter number of entries in table: ");
    scanf("%d", &n);

    for (i = 1; i <= n; i++)
    {
        printf("%10d%10d\n", i, i * i);
        if(i % 24 == 0)
        {
            printf("Press Enter to continue...\n");
            while(getchar() != '\n');
        }
    }

    return 0;
}
```

```
alancong@AlanCongdeMacBook-Air chapter_7 % ./a.out 
This program prints a table of squares.
Enter number of entries in table: 90
         1         1
         2         4
         3         9
         4        16
         5        25
         6        36
         7        49
         8        64
         9        81
        10       100
        11       121
        12       144
        13       169
        14       196
        15       225
        16       256
        17       289
        18       324
        19       361
        20       400
        21       441
        22       484
        23       529
        24       576
Press Enter to continue...
        25       625
        26       676
        27       729
        28       784
        29       841
        30       900
        31       961
        32      1024
        33      1089
        34      1156
        35      1225
        36      1296
        37      1369
        38      1444
        39      1521
        40      1600
        41      1681
        42      1764
        43      1849
        44      1936
        45      2025
        46      2116
        47      2209
        48      2304
Press Enter to continue...

        49      2401
        50      2500
        51      2601
        52      2704
        53      2809
        54      2916
        55      3025
        56      3136
        57      3249
        58      3364
        59      3481
        60      3600
        61      3721
        62      3844
        63      3969
        64      4096
        65      4225
        66      4356
        67      4489
        68      4624
        69      4761
        70      4900
        71      5041
        72      5184
Press Enter to continue...

        73      5329
        74      5476
        75      5625
        76      5776
        77      5929
        78      6084
        79      6241
        80      6400
        81      6561
        82      6724
        83      6889
        84      7056
        85      7225
        86      7396
        87      7569
        88      7744
        89      7921
        90      8100
```

3. 修改 7.1 节的程序 `sum2.c`，对 `double` 型值组成的数列求和。

```C
#include <stdio.h>

int main(void)
{
    double n, sum = 0.0;

    printf("This program sums a series of integers.\n");
    printf("Enter doubles (0 to terminate): ");

    scanf("%lf", &n);
    while (n != 0)
    {
        sum += n;
        scanf("%lf", &n);
    }
    printf("The sum is: %f\n", sum);

    return 0;
}
```

```
This program sums a series of integers.
Enter doubles (0 to terminate): 1.1 1.2 1.3 1.4 1.5 1.6 1.7 1.8 1.9 0
The sum is: 13.500000
```

4. 编写可以把字母格式的电话号码翻译成数值格式的程序：

```
Enter phone number: CALLATT
2255288
```

（如果没有电话在身边，参考这里给出的字母在键盘上的对应关系：2=ABC、3=DEF、4=GHI、5=JKL、 6=MNO、7=PQRS、8=TUV、9=WXYZ。）原始电话号码中的非字母字符（例如数字或标点符号）保持不变：

```
Enter phone number: 1-800-COL-LECT
1-800-265-5328
```

可以假设任何用户输入的字母都是大写字母。

```C
#include<stdio.h>
// 很显然这是非常逆天的写法，但是它确实能运行
int main(void)
{
    char n1, n2, n3, n4, n5, n6, n7, n8, n9, n10, n11;
    printf("Enter phone number: ");
    scanf("%c-%c%c%c-%c%c%c-%c%c%c%c", &n1, &n2, &n3, &n4, &n5, &n6, &n7, &n8, &n9, &n10, &n11);

    // 直接根据字符区间来给数字赋值
    if ('A' <= n1 && n1 <= 'C') n1 = '2';
    else if ('D' <= n1 && n1 <= 'F') n1 = '3';
    else if ('G' <= n1 && n1 <= 'I') n1 = '4';
    else if ('J' <= n1 && n1 <= 'L') n1 = '5';
    else if ('M' <= n1 && n1 <= 'O') n1 = '6';
    else if ('P' <= n1 && n1 <= 'S') n1 = '7';
    else if ('T' <= n1 && n1 <= 'V') n1 = '8';
    else if ('W' <= n1 && n1 <= 'Z') n1 = '9';

    if ('A' <= n2 && n2 <= 'C') n2 = '2';
    else if ('D' <= n2 && n2 <= 'F') n2 = '3';
    else if ('G' <= n2 && n2 <= 'I') n2 = '4';
    else if ('J' <= n2 && n2 <= 'L') n2 = '5';
    else if ('M' <= n2 && n2 <= 'O') n2 = '6';
    else if ('P' <= n2 && n2 <= 'S') n2 = '7';
    else if ('T' <= n2 && n2 <= 'V') n2 = '8';
    else if ('W' <= n2 && n2 <= 'Z') n2 = '9';

    if ('A' <= n3 && n3 <= 'C') n3 = '2';
    else if ('D' <= n3 && n3 <= 'F') n3 = '3';
    else if ('G' <= n3 && n3 <= 'I') n3 = '4';
    else if ('J' <= n3 && n3 <= 'L') n3 = '5';
    else if ('M' <= n3 && n3 <= 'O') n3 = '6';
    else if ('P' <= n3 && n3 <= 'S') n3 = '7';
    else if ('T' <= n3 && n3 <= 'V') n3 = '8';
    else if ('W' <= n3 && n3 <= 'Z') n3 = '9';

    if ('A' <= n4 && n4 <= 'C') n4 = '2';
    else if ('D' <= n4 && n4 <= 'F') n4 = '3';
    else if ('G' <= n4 && n4 <= 'I') n4 = '4';
    else if ('J' <= n4 && n4 <= 'L') n4 = '5';
    else if ('M' <= n4 && n4 <= 'O') n4 = '6';
    else if ('P' <= n4 && n4 <= 'S') n4 = '7';
    else if ('T' <= n4 && n4 <= 'V') n4 = '8';
    else if ('W' <= n4 && n4 <= 'Z') n4 = '9';

    if ('A' <= n5 && n5 <= 'C') n5 = '2';
    else if ('D' <= n5 && n5 <= 'F') n5 = '3';
    else if ('G' <= n5 && n5 <= 'I') n5 = '4';
    else if ('J' <= n5 && n5 <= 'L') n5 = '5';
    else if ('M' <= n5 && n5 <= 'O') n5 = '6';
    else if ('P' <= n5 && n5 <= 'S') n5 = '7';
    else if ('T' <= n5 && n5 <= 'V') n5 = '8';
    else if ('W' <= n5 && n5 <= 'Z') n5 = '9';

    if ('A' <= n6 && n6 <= 'C') n6 = '2';
    else if ('D' <= n6 && n6 <= 'F') n6 = '3';
    else if ('G' <= n6 && n6 <= 'I') n6 = '4';
    else if ('J' <= n6 && n6 <= 'L') n6 = '5';
    else if ('M' <= n6 && n6 <= 'O') n6 = '6';
    else if ('P' <= n6 && n6 <= 'S') n6 = '7';
    else if ('T' <= n6 && n6 <= 'V') n6 = '8';
    else if ('W' <= n6 && n6 <= 'Z') n6 = '9';

    if ('A' <= n7 && n7 <= 'C') n7 = '2';
    else if ('D' <= n7 && n7 <= 'F') n7 = '3';
    else if ('G' <= n7 && n7 <= 'I') n7 = '4';
    else if ('J' <= n7 && n7 <= 'L') n7 = '5';
    else if ('M' <= n7 && n7 <= 'O') n7 = '6';
    else if ('P' <= n7 && n7 <= 'S') n7 = '7';
    else if ('T' <= n7 && n7 <= 'V') n7 = '8';
    else if ('W' <= n7 && n7 <= 'Z') n7 = '9';

    if ('A' <= n8 && n8 <= 'C') n8 = '2';
    else if ('D' <= n8 && n8 <= 'F') n8 = '3';
    else if ('G' <= n8 && n8 <= 'I') n8 = '4';
    else if ('J' <= n8 && n8 <= 'L') n8 = '5';
    else if ('M' <= n8 && n8 <= 'O') n8 = '6';
    else if ('P' <= n8 && n8 <= 'S') n8 = '7';
    else if ('T' <= n8 && n8 <= 'V') n8 = '8';
    else if ('W' <= n8 && n8 <= 'Z') n8 = '9';

    if ('A' <= n9 && n9 <= 'C') n9 = '2';
    else if ('D' <= n9 && n9 <= 'F') n9 = '3';
    else if ('G' <= n9 && n9 <= 'I') n9 = '4';
    else if ('J' <= n9 && n9 <= 'L') n9 = '5';
    else if ('M' <= n9 && n9 <= 'O') n9 = '6';
    else if ('P' <= n9 && n9 <= 'S') n9 = '7';
    else if ('T' <= n9 && n9 <= 'V') n9 = '8';
    else if ('W' <= n9 && n9 <= 'Z') n9 = '9';

    if ('A' <= n10 && n10 <= 'C') n10 = '2';
    else if ('D' <= n10 && n10 <= 'F') n10 = '3';
    else if ('G' <= n10 && n10 <= 'I') n10 = '4';
    else if ('J' <= n10 && n10 <= 'L') n10 = '5';
    else if ('M' <= n10 && n10 <= 'O') n10 = '6';
    else if ('P' <= n10 && n10 <= 'S') n10 = '7';
    else if ('T' <= n10 && n10 <= 'V') n10 = '8';
    else if ('W' <= n10 && n10 <= 'Z') n10 = '9';

    if ('A' <= n11 && n11 <= 'C') n11 = '2';
    else if ('D' <= n11 && n11 <= 'F') n11 = '3';
    else if ('G' <= n11 && n11 <= 'I') n11 = '4';
    else if ('J' <= n11 && n11 <= 'L') n11 = '5';
    else if ('M' <= n11 && n11 <= 'O') n11 = '6';
    else if ('P' <= n11 && n11 <= 'S') n11 = '7';
    else if ('T' <= n11 && n11 <= 'V') n11 = '8';
    else if ('W' <= n11 && n11 <= 'Z') n11 = '9';


    printf("The numeric phone number is: %c-%c%c%c-%c%c%c-%c%c%c%c\n", 
            n1, n2, n3, n4, n5, n6, n7, n8, n9, n10, n11);

    return 0;
}
```

```
alancong@AlanCongdeMacBook-Air chapter_7 % ./a.out 
Enter phone number: 1-800-COL-LECT
The numeric phone number is: 1-800-265-5328
```

5. 在十字拼字游戏中，玩家利用小卡片组成英文单词，每张卡片包含一个英文字母和面值。面值根据字母稀缺程度的不同而不同。（面值与字母的对应关系如下：1——AEILNORSTU；2——DG；3——BCMP；4——FHVWY；5——K；8——JX；10——QZ。）编写程序，通过对单词中字母的面值求和来计算单词的值：

```
Enter a word: pitfall
Scrabble value: 12
```

编写的程序应该允许单词中混合出现大小写字母。提示：使用 `toupper` 库函数。

```
#include<stdio.h>
#include<ctype.h>
int main(void)
{
    int sum = 0;
    char ch;
    printf("Enter a word: ");
    while((ch = getchar()) != '\n')
    {
        ch = toupper(ch);
        // AEILNORSTU
        if(ch == 'A' || ch == 'E' || ch == 'I' || ch == 'L' || ch == 'N' || ch == 'O' || ch == 'R' || ch == 'S' || ch == 'T' || ch == 'U')
        {
            sum += 1;
        }
        // DG
        if(ch == 'D' || ch == 'G')
        {
            sum += 2;
        }
        // BCMP
        if(ch == 'B' || ch == 'C' || ch == 'M' || ch == 'P')
        {
            sum += 3;
        }
        // FHVWY
        if(ch == 'F' || ch == 'H' || ch == 'V' || ch == 'W' || ch == 'Y')
        {
            sum += 4;
        }
        // K
        if(ch == 'K')
        {
            sum += 5;
        }
        // JX
        if(ch == 'J' || ch == 'X')
        {
            sum += 8;
        }
        // QZ
        if(ch == 'Q' || ch == 'Z')
        {
            sum += 10;
        }
    }

    printf("Scrabble value: %d\n", sum);
    return 0;
}
```

```
alancong@AlanCongdeMacBook-Air chapter_7 % ./a.out
Enter a word: PITTfall
Scrabble value: 12
```

6. 编写程序显示 `sizeof(int)`、`sizeof(short)`、`sizeof(long)`、`sizeof(float)`、`sizeof(double)` 和 `sizeof(long double)` 的值。

```C
#include <stdio.h>
int main(void)
{
    printf("%lu\t%lu\t%lu\t%lu\t%lu\t%lu\n", sizeof(int), sizeof(short), sizeof(long), sizeof(float), sizeof(double), sizeof(long double));

    return 0;
}
```

```
alancong@AlanCongdeMacBook-Air chapter_7 % ./a.out 
4       2       8       4       8       8
```

7. 修改第 3 章的编程题 6，使得用户可以对两个分数进行加、减、乘、除运算（在两个分数之间输入 +、 −、 * 或 / 符号）。

```C
/* Adds two fractions */
#include <stdio.h>
int main(void)
{
    char op;
    int num1, denom1, num2, denom2, result_num, result_denom;
    printf("Enter two fractions separated by a plus sign: ");
    scanf("%d/%d%c%d/%d", &num1, &denom1, &op, &num2, &denom2);

    if(op == '+')
    {
        result_num = num1 * denom2 + num2 * denom1;
    result_denom = denom1 * denom2;
    }
    else if(op == '-')
    {
        result_num = num1 * denom2 - num2 * denom1;
        result_denom = denom1 * denom2;
    }
    else if(op == '*')
    {
        result_num = num1 * num2;
        result_denom = denom1 * denom2;
    }
    else if(op == '/')
    {
        result_num = num1 * denom2;
        result_denom = denom1 * num2;
    }
    
    printf("The sum is %d/%d\n", result_num, result_denom);
    return 0;
}
```

```
alancong@AlanCongdeMacBook-Air chapter_7 % ./a.out 
Enter two fractions separated by a plus sign: 1/2/1/4
The sum is 4/2
```

8. 修改第 5 章的编程题 8，要求用户输入 12 小时制的时间。输入时间的格式为时:分后跟 A、P、AM 或 PM（大小写均可）。数值时间和 AM/PM 之间允许有空白（但不强制要求有空白）。有效输入的示例如下：

```
1:15P
1:15PM
1:15p
1:15pm
1:15 P
1:15 PM
1:15 p
1:15 pm
```

可以假定输入的格式就是上述之一，不需要进行错误判定。

```
#include<stdio.h>
#include<ctype.h>
int main(void)
{
    char time;
    int hour, min, cmp;
    int flight1, flight2, flight3, flight4, flight5, flight6, flight7, flight8;
    printf("Enter a 12-hour time: ");
    scanf("%d : %d %c", &hour, &min, &time);

    time = toupper(time);
    if(time == 'A')
    {
        // 处理12:00AM的特殊情况，这个时间表示午夜
        if(hour == 12 && min == 0)
        {
            cmp = 0;
        }
        else 
        {
            cmp = hour * 60 + min;
        }
    }
    else if(time == 'P')
    {
        if(hour == 12 && min == 0)
        {
            cmp = hour * 60 + min;
        }
        else 
        {
            cmp = hour * 60 + min + 12 * 60;
        }
    }

    flight1 = 8 * 60;
    flight2 = 9 * 60 + 43;
    flight3 = 11 * 60 + 19;
    flight4 = 12 * 60 + 47;
    flight5 = 14 * 60;
    flight6 = 15 * 60 + 45;
    flight7 = 19 * 60;
    flight8 = 21 * 60 + 45;

    if(cmp < (flight1 + flight2) / 2) // 小于第一个航班，那么第一个航班就是最接近的。
        printf("Closest departure time is 8:00 a.m., arriving at 10:16 a.m.\n");
    else if(cmp < (flight2 + flight3) / 2)
         printf("Closest departure time is 9:43 a.m., arriving at 11:52 a.m.\n");
    else if(cmp < (flight3 + flight4) / 2)
         printf("Closest departure time is 11:19 a.m., arriving at 1:31 p.m.\n");
    else if(cmp < (flight4 + flight5) / 2)
         printf("Closest departure time is 12.47 p.m., arriving at 3:00 p.m.\n");
    else if(cmp < (flight5 + flight6) / 2)                  
         printf("Closest departure time is 2:00 p.m., arriving at 4:08 p.m.\n");
    else if(cmp < (flight6 + flight7) / 2)
        printf("Closest departure time is 3:45 p.m., arriving at 5:55 p.m.\n");
    else if(cmp <(flight7 + flight8) / 2)
        printf("Closest departure time is 7:00 p.m., arriving at 9:20 p.m.\n");
    else
        printf("Closest departure time is 9:45 p.m., arriving at 11:58 p.m.\n");
        
    return 0;
}
```

```
Enter a 12-hour time: 12:00Am
Closest departure time is 8:00 a.m., arriving at 10:16 a.m.
Enter a 12-hour time: 12:00PM
Closest departure time is 11:19 a.m., arriving at 1:31 p.m.
```

9. 编写程序，要求用户输入 12 小时制的时间，然后用 24 小时制显示该时间：

```
Enter a 12-hour time: 9:11 PM
Equivalent 24-hour time: 21:11
```

参考编程题 8 中关于输入格式的描述。

```C
#include <stdio.h>
#include <ctype.h>
int main(void)
{
    char time;
    int hour, min, cmp;
    int flight1, flight2, flight3, flight4, flight5, flight6, flight7, flight8;
    printf("Enter a 12-hour time: ");
    scanf("%d : %d %c", &hour, &min, &time);

    time = toupper(time);
    if (time == 'A')
    {
        // 处理12:00AM的特殊情况，这个时间表示午夜
        if (hour == 12 && min == 0)
        {
            hour = 0;
        }
    }
    else if (time == 'P')
    {
        if (hour == 12 && min == 0)
        {
            // nothing
        }
        else
        {
            hour += 12;
        }
    }

    printf("Equivalent 24-hour time: %2d:%2d\n", hour, min);
    return 0;
}
```

```
Enter a 12-hour time: 9:11PM
Equivalent 24-hour time: 21:11
```

```C
// 优化之后的程序
#include <stdio.h>
#include <ctype.h>
int main(void)
{
    char time;
    int hour, min, cmp;
    int flight1, flight2, flight3, flight4, flight5, flight6, flight7, flight8;
    printf("Enter a 12-hour time: ");
    scanf("%d : %d %c", &hour, &min, &time);

    time = toupper(time);
    if (time == 'A')
    {
        // 处理12:00AM的特殊情况，这个时间表示午夜
        if (hour == 12 && min == 0)
        {
            hour = 0;
        }
    }
    else if (time == 'P')
    {
        if (hour == 12 && min == 0)
        {
            // nothing
        }
        else
        {
            hour += 12;
        }
    }

    printf("Equivalent 24-hour time: %2d:%2d\n", hour, min);
    return 0;
}
```

10. 编写程序统计句子中元音字母（a、e、i、o、u）的个数：

```
Enter a sentence: And that's the way it is.
Your sentence contains 6 vowels.
```

```c
#include<stdio.h>
#include<ctype.h>
int main(void)
{
    char ch;
    int sum = 0;
    printf("Enter a sentence: ");
    while((ch = getchar()) != '\n')
    {
        ch = toupper(ch);
        if(ch == 'A' || ch == 'E' || ch == 'I' || ch == 'O' || ch == 'U')
            sum ++;
    }

    printf("Your sentence contains %d vowels.\n", sum);

    return 0;
}
```

```
Enter a sentence: And that's the way it is.
Your sentence contains 6 vowels.
```

11. 编写一个程序，要求用户输入英文名和姓，并根据用户的输入先显示姓，其后跟一个逗号，然后显示名的首字母，最后加一个点：

```
Enter a first and last name: Lloyd Fosdick
Fosdick, L.
```

用户的输入中可能包含空格（名之前、名和姓之间、姓氏之后）。

```C
#include <stdio.h>
#include <ctype.h>
int main(void)
{
    int flag = 0;
    char name, ch;
    printf("Enter a first and last name: ");

    // 先跳过名字前面的空格
    while((ch = getchar()) == ' ' || ch == '\t');
    // 然后获取大写的姓名
    name = ch;

    while ((ch = getchar()) != '\n')
    {
        if (flag)
        {
            if(ch == ' ' || ch == '\t')
            {
                break;
            }
            printf("%c", ch);
        }

        // 跳过了姓氏之前的所有字母
        if ('A' <= ch && ch <= 'Z')
        {
            printf("%c", ch);
            flag = 1;
        }
    }

    printf(", %c.\n", name);

    return 0;
}
```

```
alancong@AlanCongdeMacBook-Air chapter_7 % ./a.out
Enter a first and last name:               Lloyd          Fosdick              
Fosdick, L.
```

12. 编写程序对表达式求值：

```
Enter an expression: 1+2.5*3
Value of expression: 10.5
```

表达式中的操作数是浮点数，运算符是 +、 −、 * 和 /。表达式从左向右求值（所有运算符的优先级都一样）。

```C
#include <stdio.h>
int main(void)
{
    double number, res;
    char op;
    printf("Enter an expression: ");

    // 先获取第一个数字
    scanf("%lf", &res);
    while (1)
    {
        scanf("%c", &op);
        if (op == '\n')
            break;
        scanf("%lf", &number);
        if (op == '+')
            res += number;
        else if (op == '-')
            res -= number;
        else if (op == '*')
            res *= number;
        else if (op == '/')
            res /= number;
    }
    printf("Value of expression: %.2f\n", res);

    return 0;
}
```

```
alancong@AlanCongdeMacBook-Air chapter_7 % ./a.out 
Enter an expression: 1+2.5*3
Value of expression: 10.50
```

13. 编写程序计算句子的平均词长：

```
Enter a sentence: It was deja vu all over again.
Average word length: 3.4
```

简单起见，程序中把标点符号看作其前面单词的一部分。平均词长显示一个小数位。

```C
#include <stdio.h>
int main(void)
{
    char ch;
    int w_num = 1, c_num = 0;
    double ave;
    printf("Enter a sentence: ");
    while ((ch = getchar()) != '\n')
    {
        if (ch == ' ')
            w_num++;
        else if (ch != ' ' && ch != '.')
            c_num++;
    }
    printf("%d,%d",c_num, w_num);
    printf("Average word length: %.1f\n", c_num * 1.0f / w_num);
    
    return 0;
}
```

```
alancong@AlanCongdeMacBook-Air chapter_7 % ./a.out 
Enter a sentence: It was deja vu all over again.
23,7Average word length: 3.3
```

```
最终的结果和书本上不一样的原因在于最后的句号在书本上应该是当作了一个单词的一部分，按照这种统计方法单词的字符总量是24，最终结果是3.428，但是如果这个标点符号不算的话，单词的字符总量就是23，最终结果就是3.285。总而言之，程序是没有什么问题的，只是统计口径对最终结果的产生有一定的影响。
```

14. 编写程序，用牛顿方法计算正浮点数的平方根：

```
Enter a positive number: 3
Square root: 1.73205
```

设 $x$ 是用户输入的数。牛顿方法需要先给出 $x$ 平方根的猜测值 $y$（我们使用 1）。后续的猜测值通过计算 $y$ 和 $\frac{x}{y}$ 的平均值得到。表 7-6 中给出了求解 3 的平方根的过程。

表 7-6 用牛顿方法求解 3 的平方根：

```
x    y    x/y    y 和 x/y 的平均值
3    1    3      2
3    2    1.5    1.75
3    1.75 1.71429 1.73214
3    1.73214 1.73205 1.73205
```

注意，$y$ 的值逐渐接近 $x$ 的平方根。为了获得更高的精度，程序中应使用 `double` 类型的变量代替 `float` 类型的变量。当 $y$ 的新旧值之差的绝对值小于 0.00001 时程序终止。提示：调用 `fabs` 函数求 `double` 类型数值的绝对值。

```C
#include<stdio.h>
#include<math.h>
int main(void)
{
    double x, y_new = 0, y_old = 1.0, ave;
    printf("Enter a positive number: ");
    scanf("%lf", &x);

    while(1)
    {
        y_new = (y_old + x / y_old) / 2;

        if(fabs(y_new - y_old) < 0.00001)
            break;

        y_old = y_new;
    }

    printf("%f\n", y_new);

    return 0;
}
```

```
alancong@AlanCongdeMacBook-Air chapter_7 % ./a.out       
Enter a positive number: 3
1.732051
```

15. 😩编程计算正整数的阶乘：

```
Enter a positive integer: 6
Factorial of 6: 720
```

```
(a) 用 short 类型变量存储阶乘的值。为了正确打印出 n 的阶乘，n 的最大值是多少？
(b) 用 int 类型变量重复 (a)。
(c) 用 long 类型变量重复 (a)。
(d) 如果你的编译器支持 long long 类型，用 long long 类型变量重复 (a)。
(e) 用 float 类型变量重复 (a)。
(f) 用 double 类型变量重复 (a)。
(g) 用 long double 类型变量重复 (a)。
```

在 (e)~(g) 这几种情况下，程序会显示阶乘的近似值，不一定是准确值。

```C
// 这道题是有点难度的，因为不同的电脑数据类型是不相同的，具体细节学完整本书再回头看看
#include <stdio.h>
#include <limits.h>
#include <float.h>

int main(void)
{
    /* short */
    {
        short v = 1;
        int n = 1;
        while (v <= SHRT_MAX / (n + 1))
        {
            n++;
            v = (short)(v * n);
        }
        printf("short  : 最大 n = %d,  n! = %hd,  首次溢出阶乘 = %d!（超过 SHRT_MAX=%d）\n",
               n, v, n + 1, SHRT_MAX);
    }

    /* int */
    {
        int v = 1;
        int n = 1;
        while (v <= INT_MAX / (n + 1))
        {
            n++;
            v = v * n;
        }
        printf("int    : 最大 n = %d,  n! = %d,   首次溢出阶乘 = %d!（超过 INT_MAX=%d）\n",
               n, v, n + 1, INT_MAX);
    }

    /* long */
    {
        long v = 1;
        int n = 1;
        while (v <= LONG_MAX / (n + 1))
        {
            n++;
            v = v * (long)n;
        }
        printf("long   : 最大 n = %d,  n! = %ld,  首次溢出阶乘 = %d!（超过 LONG_MAX=%ld）\n",
               n, v, n + 1, LONG_MAX);
    }

    /* long long */
    {
        long long v = 1;
        int n = 1;
        while (v <= LLONG_MAX / (n + 1))
        {
            n++;
            v = v * (long long)n;
        }
        printf("long long: 最大 n = %d,  n! = %lld, 首次溢出阶乘 = %d!（超过 LLONG_MAX=%lld）\n",
               n, v, n + 1, LLONG_MAX);
    }

    /* float（近似） */
    {
        float v = 1.0f;
        int n = 1;
        while (v <= FLT_MAX / (float)(n + 1))
        {
            n++;
            v = v * (float)n;
        }
        printf("float  : 最大 n = %d,  n! ≈ %.0e, 首次溢出阶乘 = %d!（超过 FLT_MAX=%.0e）\n",
               n, (double)v, n + 1, (double)FLT_MAX);
    }

    /* double（近似） */
    {
        double v = 1.0;
        int n = 1;
        while (v <= DBL_MAX / (double)(n + 1))
        {
            n++;
            v = v * (double)n;
        }
        printf("double : 最大 n = %d,  n! ≈ %.0e, 首次溢出阶乘 = %d!（超过 DBL_MAX=%.0e）\n",
               n, v, n + 1, DBL_MAX);
    }

    /* long double（近似，取决于平台位宽） */
    {
        long double v = 1.0L;
        int n = 1;
        while (v <= LDBL_MAX / (long double)(n + 1))
        {
            n++;
            v = v * (long double)n;
        }
        /* 使用科学计数法，减少巨大的长数字输出 */
        printf("long double: 最大 n = %d,  n! ≈ %.0Le, 首次溢出阶乘 = %d!（超过 LDBL_MAX=%.0Le）\n",
               n, v, n + 1, LDBL_MAX);
    }

    return 0;
}

```