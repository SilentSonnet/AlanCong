---
title: 《C语言程序设计-现代方法》-课后习题-第六章
published: 2023-02-05
description: ''
image: ''
tags: []
category: '程序设计'
draft: false 
lang: ''
---

## 第六章 循环

### 练习题

6.1 节  

1. 下列程序片段的输出是什么？

```c
i = 1;
while (i <= 128) {
    printf("%d ", i);
    i *= 2;
}
```

```C
// 从1 一直输出到 2^128，每个都是2的幂
#include <stdio.h>
int main(void)
{
    int i = 1;
    while (i <= 128)
    {
        printf("%d ", i);
        i *= 2;
    }

    printf("\n");
    return 0;
}
```

```
1 2 4 8 16 32 64 128 
```

6.2 节

2. 下列程序片段的输出是什么？

```c
i = 9384;
do {
    printf("%d ", i);
    i /= 10;
} while (i > 0);
```

```C
#include <stdio.h>
int main(void)
{
    int i = 9384;
    do
    {
        printf("%d ", i);
        i /= 10;
    } while (i > 0);
    printf("\n");
    return 0;
}
```

```
9384 938 93 9 
```

6.3 节

3. 下面这条 for 语句的输出是什么？

```c
for (i = 5, j = i - 1; i > 0, j > 0; --i, j = i - 1)
    printf("%d ", i);
```

```
// 输出5 4 3 2
#include<stdio.h>
int main(void)
{
    for (int i = 5, j = i - 1; i > 0, j > 0; --i, j = i - 1)
    printf("%d ", i);

    printf("\n");
    return  0;
}
```

```
5 4 3 2 
```

4. 下列哪条语句和其他两条语句不等价（假设循环体都是一样的）？

```c
(a)for (i = 0; i < 10; i++) ...
(b)for (i = 0; i < 10; ++i) ...
(c)for (i = 0; i++ < 10; ) ...
```

```C
#include<stdio.h>
int main(void)
{
    for (int i = 0; i < 10; i++) {
        printf("%d ", i);
    }
    printf("\n");
    for (int i = 0; i < 10; ++i) {
        printf("%d ", i);
    }
    printf("\n");
    for (int i = 0; i++ < 10; ) {
        printf("%d ", i);
    }
    printf("\n");
    return 0;
}
```

```
0 1 2 3 4 5 6 7 8 9 
0 1 2 3 4 5 6 7 8 9 
1 2 3 4 5 6 7 8 9 10 
```

5. 下列哪条语句和其他两条语句不等价（假设循环体都是一样的）？

```C
(a) while (i < 10) {...}
(b) for (; i < 10;) {...}
(c) do {...} while (i < 10);
```

```c
// i为0的时候两者其实没有什么区别，但是当i为10的时候，前两个循环不输出但第三个循环仍会输出数据
#include<stdio.h>
int main(void)
{
    int i = 10;
    while (i < 10) {
        printf("%d ", i++);
    }
    printf("\n");
    i = 10;
    for (; i < 10;) {
        printf("%d ", i++);
    }
    printf("\n");
    i = 10;
    do {
        printf("%d ", i++);
    } while (i < 10);
    printf("\n");

    return 0;
}
```

```

10 
```

6. 把练习题 1 中的程序片段改写为一条 for 语句。

```C
#include<stdio.h>
int main(void)
{
    for(int i = 1;i <= 128;i *= 2)
        printf("%d ", i);
    printf("\n");

    return 0;
}
```

```
1 2 4 8 16 32 64 128 
```

7. 把练习题 2 中的程序片段改写为一条 for 语句。

```C
#include<stdio.h>
int main(void)
{
    for(int i = 9384;i > 0;i /= 10)
        printf("%d ", i);
    printf("\n");

    return 0;
}
```

```
9384 938 93 9 
```

8. 下面这条 for 语句的输出是什么？

```c
for (i = 10; i >= 1; i /= 2)
    printf("%d ", i++);
```

```C
// 输出是10 5 3 2 1 1 1 ...
#include<stdio.h>
int main(void)
{
    for (int i = 10; i >= 1; i /= 2)
        printf("%d ", i++);
    printf("\n");

    return 0;
}
```

```
10 5 3 2 1 1 1 1 1 1 1 1 1 ... 
```

9. 把练习题 8 中的 for 语句改写为一条等价的 while 语句。除了 while 循环本身之外，还需要一条语句。

```c
// 输出是10 5 3 2 1 1 1 ...
#include<stdio.h>
int main(void)
{
    int i = 10;
    while(i >= 1)
    {
        printf("%d ", i++);
        i /= 2;
    }
    printf("\n");

    return 0;
}
```

```
10 5 3 2 1 1 1 1 1 1 1 1 1 ... 
```

6.4 节

10. 说明如何用等价的 goto 语句替换 continue 语句。


```c
// 这里需要注意的是如果在复合语句的最末尾增加跳转标记不加分号的话会报错，因为这是C23才有的特性。
#include<stdio.h>
int main(void)
{
    for(int i = 1;i < 10;i ++)
    {
        if(i == 5)
        {
            // continue;
            goto JUMP;
        }
        printf("%d ", i);
    JUMP:;
    }
    printf("\n");
    return 0;
}
```

11. 下列程序片段的输出是什么？

```c
sum = 0;
for (i = 0; i < 10; i++) {
    if (i % 2)
        continue;
    sum += i;
}
printf("%d\n", sum);
```

```C
// 输出的就是0到9之间的全部偶数的和
#include <stdio.h>
int main(void)
{
    int sum = 0;
    for (int i = 0; i < 10; i++)
    {
        if (i % 2)
            continue;
        printf("%d ", i);
        sum += i;
    }
    printf("\n");
    printf("%d\n", sum);
} 
```

```
0 2 4 6 8 
20
```

12. 下面的“素数判定”循环作为示例出现在 6.4 节中：

```c
for (d = 2; d < n; d++)
    if (n % d == 0)
        break;
```

这个循环不是很高效。没有必要用 n 除以 2～n-1 的所有数来判断它是否为素数。事实上，只需要检查不大于 n 的平方根的除数即可。利用这一点来修改循环。提示：不要试图计算出 n 的平方根，用 d*d 和 n 进行比较。

```C
#include<stdio.h>
int main(void)
{
    int n = 100;
    int is_prime = 1;
    for (int d = 2; d * d < n; d++)
        if (n % d == 0)
            is_prime = 0;
    if (is_prime)
        printf("%d is prime\n", n);
    else
        printf("%d is not prime\n", n);
    return 0;
}
```

```
100 is not prime
```

6.5 节

*13. 重写下面的循环，使其循环体为空。

```c
for (n = 0; m > 0; n++)
    m /= 2;
```

```C
#include<stdio.h>
int main(void)
{
    int n = 0, m = 100;
    for(;;)
    {
        if(m > 0)
        {
            m /= 2;
            n ++;
            printf("%d ", m);
        }
        else
        {
            printf("\n");
            break;
        }
    }

    return 0;
}
```

```
50 25 12 6 3 1 0 
```

14. 找出下面程序片段中的错误并修正。

```c
if (n % 2 == 0);
    printf("n is even\n");
```

```
// 在if的控制语句后面多了个分号！确实很不容易察觉。
```

### 编程题

1. 编写程序，找出用户输入的一串数中的最大数。程序需要提示用户一个一个地输入数。当用户输入 0 或负数时，程序必须显示出已输入的最大非负数：

```
Enter a number: 60  
Enter a number: 38.3  
Enter a number: 4.89  
Enter a number: 100.62  
Enter a number: 75.2295  
Enter a number: 0  
The largest number entered was 100.62  
```

注意：输入的数不一定是整数。

```C
#include<stdio.h>
int main(void)
{
    float number, max = 0, sum = 0;
    int abort = 1;
    while(1)
    {
        printf("Enter a number: ");
        scanf("%f", &number);

        if(number <= 0)
            break;
        else if(number > max)
            max = number;
    }
    printf("Max: %.2f\n", max);
    return 0;   
}
```

**注意：**浮点数在计算机中是二进制近似存储的，大多数十进制小数（如0.1）无法被精确表示，因此一般不建议用`==`判断两个浮点数是否相等。不过`0.0`在IEEE 754标准下可以被精确表示，所以像`if (number == 0)`这样的判断是安全的。若要判断一个浮点数“接近0”，更稳妥的写法是使用容差，例如`if (fabs(number) < 1e-6)`。

2. 编写程序，要求用户输入两个整数，然后计算并显示这两个整数的最大公约数（GCD）：

```
Enter two integers: 12 28  
Greatest common divisor: 4  
```

提示：求最大公约数的经典算法是 Euclid 算法，方法如下。分别让变量 m 和 n 存储两个数的值。如果 n 为 0，那么停止操作，m 中的值是 GCD；否则计算 m 除以 n 的余数，把 n 保存到 m 中，并把余数保存到 n 中。然后重复上述过程，每次都先判定 n 是否为 0。

```C
#include<stdio.h>
int main(void)
{
    int m, n, temp, gcd;
    printf("Enter two integers: ");
    scanf("%d %d", &m, &n);
    while(n != 0)
    {
        temp = n;
        n = m % n;
        m = temp;
    }
    gcd = m;

    printf("Greatest common divisor: %d\n", gcd);
    return 0;
}
```

```
Enter two integers: 12 28
Greatest common divisor: 4
```

3. 编写程序，要求用户输入一个分数，然后将其约分为最简分式：

```
Enter a fraction: 6/12  
In lowest terms: 1/2  
```

提示：为了把分数约分为最简分式，首先计算分子和分母的最大公约数，然后分子和分母都除以最大公约数。

```C
#include<stdio.h>
int main(void)
{
    int m, n, a, b, temp, gcd;
    printf("Enter a fraction: ");
    scanf("%d / %d", &m, &n);
 
    a = m;
    b = n;
    while(n != 0)
    {
        temp = n;
        n = m % n;
        m = temp;
    }
    gcd = m;

    printf("In lowest terms: %d/%d\n", a / gcd, b / gcd);

    return 0;
}
```

```C
Enter a fraction: 4/24
In lowest terms: 1/6
```

4. 在 5.2 节的 broker.c 程序中添加循环，以便用户可以输入多笔交易，并且程序可以计算每次的佣金。程序在用户输入的交易额为 0 时终止。

```
Enter value of trade: 30000  
Commission: $166.00  
Enter value of trade: 20000  
Commission: $144.00  
Enter value of trade: 0  
```

```C
/* Calculates a broker's commission */
#include <stdio.h>
int main(void)
{
    float commission, value;

    do    
    {
        printf("Enter value of trade: ");
        scanf("%f", &value);

        if( value == 0)
            break;

        if (value < 2500.00f)
            commission = 30.00f + .017f * value;
        else if (value < 6250.00f)
            commission = 56.00f + .0066f * value;
        else if (value < 20000.00f)
            commission = 76.00f + .0034f * value;
        else if (value < 50000.00f)
            commission = 100.00f + .0022f * value;
        else if (value < 500000.00f)
            commission = 155.00f + .0011f * value;
        else
            commission = 255.00f + .0009f * value;
        if (commission < 39.00f)
            commission = 39.00f;
        printf("Commission: $%.2f\n", commission);
    }while (value != 0);

    return 0;
}
```

```
Enter value of trade: 30000
Commission: $166.00
Enter value of trade: 20000
Commission: $144.00
Enter value of trade: 0
```

5. 第 4 章的编程题 1 要求编写程序显示出两位数的逆序。设计一个更具一般性的程序，可以处理一位、两位、三位或者更多位的数。提示：使用 do 循环将输入的数重复除以 10，直到值达到 0 为止。


```C
#include <stdio.h>
int main(void)
{
    int number, m;
    printf("Enter a number:");
    scanf("%d", &number);
    printf("The reversal is: ");
    do
    {
        m = number % 10;
        number /= 10;
        printf("%d", m);
    } while (number != 0);

    printf("\n");
    return 0;
}
```

```
Enter a number:12345
The reversal is: 54321
```

6. 编写程序，提示用户输入一个数 n，然后显示出 1~n 的所有偶数平方值。例如，如果用户输入 100，那么程序应该显示出下列内容：

```
4  
16  
36  
64  
100  
```

```C
#include <stdio.h>
int main(void)
{
    int number, m = 0;
    printf("Enter a number:");
    scanf("%d", &number);

    if (number < 4)
    {
        printf("False input!");
        return 0;
    }

    int i = 1;
    while(1)
    {
        if (i % 2 == 0)
        {
            m = i * i;
            if (m <= number)
            {
                printf("%d\n", m);
            }
            else
                return 0;
        }
        i++;
    }

    return 0;
}
```

```
Enter a number:100
4
16
36
64
100
```

7. 重新安排程序 square3.c，在 for 循环中对变量 i 进行初始化、判定以及自增操作。不需要重写程序，特别是不要使用任何乘法。


```C
#include <stdio.h>

int main(void)
{
    int n;

    printf("This program prints a table of squares.\n");
    printf("Enter number of entries in table: ");
    scanf("%d", &n);

    for (int i = 1, square = 1, odd = 3; i <= n; odd += 2, ++i)
    {
        printf("%10d%10d\n", i, square);
        square += odd;
    }

    return 0;
}

```

**算法原理：**

- 该程序用于打印一个数字及其平方的表格。
- 在计算平方的过程中，利用了一个数学特性：一个整数的平方可以通过前一个平方加上一个递增的奇数来计算。举个例子：
  - 1^2 = 1
  - 2^2 = 1 + 3
  - 3^2 = 4 + 5
  - 4^2 = 9 + 7
- 因此，从1开始，每次增加的奇数是从3开始，递增2。通过这个方式，可以通过不断地加上这些奇数来得到每个整数的平方。

8. 编写程序显示单月的日历。用户指定这个月的天数和该月起始日是星期几：

```
Enter number of days in month: 31  
Enter starting day of the week (1=Sun, 7=Sat): 3  

       1  2  3  4  5  
 6  7  8  9 10 11 12  
13 14 15 16 17 18 19  
20 21 22 23 24 25 26  
27 28 29 30 31  
```

提示：此程序不像看上去那么难。最重要的部分是一个使用变量 i 从 1 计数到 n 的 for 语句（这里 n 是此月的天数），for 语句中需要显示 i 的每个值。在循环中，用 if 语句判定 i 是否是一个星期的最后一天，如果是，就显示一个换行符。

```C
#include<stdio.h>
int main(void)
{
    int number, start, day;
    printf("Enter number of days in month: ");
    scanf("%d", &number);
    printf("Enter starting day of the week (1=Sun, 7=Sat): ");
    scanf("%d", &start);

    for(int i = 1;i < start; i ++)
        printf("\t");

    day = start;
    for(int i = 1;i <= number;i ++, day ++)
    {
        if(day % 7 == 0)
        {
            printf("%2d\n", i);
        }
        else
        {
            printf("%2d\t", i);
        }
    }

    printf("\n");
    return 0;
}
```

9. 第 2 章的编程题 8 要求编程计算第一、第二、第三个月还贷后剩余的贷款金额。修改该程序，要求用户输入还贷的次数并显示每次还贷后剩余的贷款金额。


```C
#include<stdio.h>
int main(void)
{
    int number;
    float loan = 0.0f, rate = 0.0f, payment = 0.0f;
    printf("Enter amount of loan:");
    scanf("%f", &loan);
    printf("Enter interest rate:");
    scanf("%f", &rate);
    printf("Enter monthly payment:");
    scanf("%f", &payment);
    printf("Enter the number of month:");
    scanf("%d", &number);

    for(int i = 1;i <= number;i ++)
    {
        printf("Balance remaining after %d payment:%.2f\n", i, 
            loan * (1.0 + (rate / 1200)) - payment);
        loan = loan * (1.0 + (rate / 1200)) - payment;
    }

    return 0;
}


```

10. 第 5 章的编程题 9 要求编写程序判断哪个日期更早。泛化该程序，使用户可以输入任意个日期。用 0/0/0 指示输入结束，不再输入日期。

```
Enter a date (mm/dd/yy): 3/6/08  
Enter a date (mm/dd/yy): 5/17/07  
Enter a date (mm/dd/yy): 6/3/07  
Enter a date (mm/dd/yy): 0/0/0  
5/17/07 is the earliest date  
```

```C
#include <stdio.h>
int main(void)
{
    int month1, day1, year1;
    int month2 = 99, day2 = 99, year2 = 99;

    while(1)
    {
        printf("Enter a date (mm/dd/yy): ");
        scanf("%d / %d / %d", &month1, &day1, &year1);

        if ((month1 == 0) && (day1 == 0) && (year1 == 0))
            break;

        if ((year1 * 10000 + month1 * 100 + day1) < (year2 * 10000 + month2 * 100 + day2))
        {
            year2 = year1;
            month2 = month1;
            day2 = day1;
        }
            
    }

    printf("%2d/%2d/%.2d is the earliest date\n", month2, day2, year2);

    return 0;
}
```

11. 数学常量 e 的值可以用一个无穷级数表示：

$$
e = 1 + \frac{1}{1!} + \frac{1}{2!} + \frac{1}{3!} + \cdots
$$

编写程序，用下面的公式计算 e 的近似值：

$$
1 + \frac{1}{1!} + \frac{1}{2!} + \frac{1}{3!} + \cdots + \frac{1}{n!}
$$
这里 n 是用户输入的整数。

```C
#include<stdio.h>
int main(void)
{
    int acc;
    float sum = 1.0, temp = 1.0;
    printf("Please enter the accuracy: ");
    scanf("%d", &acc);

    for(int i = 1;i < acc;i ++)
    {
        temp *= i;
        sum += (1.0 / temp);
    }

    printf("e is: %f\n", sum);
    return 0;
}
```

12. 修改编程题 11，使得程序持续执行加法运算，直到当前项小于 ε 为止，其中 ε 是用户输入的较小的（浮点）数。

```C
#include<stdio.h>
int main(void)
{
    double sum = 1.0, temp = 1.0, acc;
    printf("Please enter the accuracy: ");
    scanf("%le", &acc);

    for(int i = 1;;i ++)
    {
        temp *= i;
        sum += (1.0 / temp);
        if((1.0 / temp) < acc)
            break;
        // 看看循环了多少次
        // printf("%d\n", i);
    }

    printf("e is: %.15lf\n", sum);
    return 0;
}
```