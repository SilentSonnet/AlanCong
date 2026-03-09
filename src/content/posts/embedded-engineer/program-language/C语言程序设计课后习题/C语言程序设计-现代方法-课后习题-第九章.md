---
title: 《C语言程序设计-现代方法》-课后习题-第九章
published: 2026-03-09
description: ''
image: ''
tags: []
category: '程序设计'
draft: false 
lang: ''
---




## 第九章 函数

### 练习题

9.1 节

1. 下列计算三角形面积的函数有两处错误，找出这些错误，并且说明修改它们的方法。（提示：公式中没有错误。）


```c
double triangle_area(double base, height) 
double product;  
{   
    product = base * height;   
    return product / 2;  
}
```

```
这道题可能稍微有点异议吧，起码我是不太清楚少个分号和形参书写错误都是不是算一个错误，但即使根据不同的理解，也可以按照现代C语言和经典C语言的标准来改正这个函数。

错误 1：形参列表里把两种风格混在一起
double triangle_area(double base, height)
这里 base 带了类型 double，但 height 没有类型。
在现代原型风格（prototype）的函数定义中，每个参数都必须写类型；如果要用老式 K&R 风格（先给标识符列表，再在下一行给类型），那就所有参数都不写类型，并在下一行统一声明。

错误 2：把局部变量声明放在函数头和花括号之间
在函数头与 { 之间的那一段，只允许老式 K&R “参数类型声明”，不能用来声明普通局部变量。你这里的 double product; 放错了位置，应放进函数体的大括号里（或直接不用该临时变量）。
```

```C
// K&R
double triangle_area(base, height)
double base, height;
{
    double product = base * height;
    return product / 2.0;
}
```

```C
// 现代C语言
double triangle_area(double base, double height) 
{
    double product = base * height;
    return product / 2.0;
}
```

```C
#include <stdio.h>

double triangle_area(double base, double height)
{
    double product = base * height;
    return product / 2;
}

int main(void)
{
    double base = 2.0, height = 1.0;

    printf("The base is %.lf and the height is %.lf\n", base, height);
    printf("the product is %.lf\n", triangle_area(base, height));

    return 0;
}
```

```
alancong@AlanCongdeMacBook-Air chapter_9 % ./a.out 
The base is 2 and the height is 1
the product is 1
```

2. 编写函数 `check(x, y, n)`：如果 `x` 和 `y` 都落在 0~n-1 的闭区间内，那么函数返回 1；否则函数应该返回 0。假设 `x`、`y` 和 `n` 都是 `int` 类型。

```C
#include<stdio.h>
#include<stdbool.h>

bool check(int x, int y, int n);

int main(void)
{
    int x, y, n;
    printf("Enter the x and y: ");
    scanf("%d%d", &x, &y);
    printf("Enter the range of n: ");
    scanf("%d", &n);

    if(check(x, y, n))
        printf("X and Y is in the range of n!\n");
    else 
        printf("X and Y is not in the range of n!\n");

    return 0;
}

bool check(int x, int y, int n)
{
    if((0 <= x && x <= n - 1) && (0 <= y && y <= n - 1))
        return true;
    else 
        return false;
}
```

```
alancong@AlanCongdeMacBook-Air chapter_9 % ./a.out 
Enter the x and y: 1 2
Enter the range of n: 6
X and Y is in the range of n!
alancong@AlanCongdeMacBook-Air chapter_9 % ./a.out
Enter the x and y: 5 6
Enter the range of n: 2
X and Y is not in the range of n!
```

3. 编写函数 `gcd(m, n)` 来计算整数 `m` 和 `n` 的最大公约数。（第6章的编程题2描述了计算最大公约数的 Euclid 算法。）

```C
#include<stdio.h>

int gcd(int m, int n);

int main(void)
{
    int m, n, temp;
    printf("Enter two integers: ");
    scanf("%d %d", &m, &n);

    printf("Greatest common divisor: %d\n", gcd(m, n));
    return 0;
}

int gcd(int m, int n)
{
    int temp;
    while(n != 0)
    {
        temp = n;
        n = m % n;
        m = temp;
    }
    return m;
}
```

```
alancong@AlanCongdeMacBook-Air chapter_9 % ./a.out 
Enter two integers: 6 3
Greatest common divisor: 3
alancong@AlanCongdeMacBook-Air chapter_9 % ./a.out
Enter two integers: 35 37
Greatest common divisor: 1
```

4. 编写函数 `day_of_year(month, day, year)`，使得函数返回由这三个参数确定的那一天是一年中的第几天（1~366范围内的整数）。

```C
// 这段 switch 的写法参考了网上一份小米扫地机器人相关代码，使用了 switch 的贯穿特性（fall-through）来处理边界判断。
// 相比多个 if-else，switch 在某些编译器或连续 case 的场景下可能更高效，但具体性能依赖于编译器和上下文优化。

#include <stdio.h>

int day_of_year(int month, int day, int year);

int main(void)
{
    int month, day, year;
    printf("Enter the month/day/year: ");
    scanf("%d / %d / %d", &month, &day, &year);

    printf("The sum of the day before is : %d\n", day_of_year(month, day, year));
    return 0;
}

int day_of_year(int month, int day, int year)
{
    // 1 3 5 7 8 10 12 - 31
    int sum = 0;
    switch (month)
    {
    case 12:
    case 11:
        sum += 31;
    case 10:
        sum += 31;
    case 9:
        sum += 31;
    case 8:
        sum += 31;
    case 7:
        sum += 30;
    case 6:
        sum += 31;
    case 5:
        sum += 30;
    case 4:
        sum += 31;
    case 3:
        if(((year % 4 == 0) && (year % 100 != 0)) || year % 400 == 0 )
            sum += 29;
        else 
            sum += 28;
    case 2:
        sum += 31;
    case 1:
        break;
    }

    sum += day;

    return sum;
}
```

```C
// 这个版本就是很常规的数组的写法，代码还可以进行简化，只不过需要用到指针，
#include <stdio.h>

int day_of_year(int month, int day, int year);

int main(void)
{
    int month, day, year;

    printf("Enter the month/day/year: ");
    scanf("%d / %d / %d", &month, &day, &year);

    printf("The sum of the day before is : %d\n", day_of_year(month, day, year));
    return 0;
}

int day_of_year(int month, int day, int year)
{

    int days_in_months[] = {31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31};
    int days_in_months_leap[] = {31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31};
    int sum = 0;

    if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0)
    {
        for (int i = 0; i < month - 1; i++)
        {
            sum += days_in_months_leap[i];
        }
    }
    else
    {
        for (int i = 0; i < month - 1; i++)
        {
            sum += days_in_months[i];
        }
    }

    sum += day;

    return sum;
}

```

```C
#include <stdio.h>

int day_of_year(int month, int day, int year);

int main(void)
{
    int month, day, year;
    printf("Enter the month/day/year: ");
    scanf("%d / %d / %d", &month, &day, &year);

    printf("The sum of the day before is : %d\n", day_of_year(month, day, year));
    return 0;
}

int day_of_year(int month, int day, int year)
{
    int normal[] = {31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31};
    int leap[]   = {31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31};

    int *days_in_months;

    // 判断是否为闰年
    if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0)
        days_in_months = leap;
    else
        days_in_months = normal;

    int sum = 0;
    for (int i = 0; i < month - 1; i++)
        sum += days_in_months[i];

    sum += day;
    return sum;
}
```

```
alancong@AlanCongdeMacBook-Air chapter_9 % ./a.out 
Enter the month/day/year: 12/31/2016
The sum of the day before is : 366
```

5. 编写函数 `num_digits(n)`，使得函数返回正整数 `n` 中数字的个数。提示：为了确定 `n` 中数字的个数，把这个数反复除以10，当 `n` 达到0时，除法运算的次数表明了 `n` 最初拥有的数字的个数。

```C
// 虽然题目规定的输入是正整数n，但是我加入了零和负数的判断
#include<stdio.h>

int num_digits(int number);

int main(void)
{
    int number;
    printf("Enter a number : ");
    scanf("%d", &number);

    printf("The digits of number is : %d\n", num_digits(number));

    return 0;
}

int num_digits(int number)
{
    int sum = 0;

    // zero is also an one digit number!
    if(number == 0)
        return 1;
    
    if(number < 0)
        number = -number;

    while(number > 0)
    {
        sum ++;
        number  /= 10;
    }

    return sum;
}
```

```
alancong@AlanCongdeMacBook-Air chapter_9 % ./a.out 
Enter a number : 123
The digits of number is : 3
alancong@AlanCongdeMacBook-Air chapter_9 % ./a.out 
Enter a number : 0
The digits of number is : 1
alancong@AlanCongdeMacBook-Air chapter_9 % ./a.out 
Enter a number : -123
The digits of number is : 3
```

6. 编写函数 `digit(n, k)`，使得函数返回正整数 `n` 中的第 `k` 位数字（从右边算起）。例如，`digit(829, 1)` 返回 9，`digit(829, 2)` 返回 2，`digit(829, 3)` 返回 8。如果 `k` 大于 `n` 所含有的数字个数，那么函数返回 0。

```C
#include<stdio.h>

int digit(int number, int k);

int main(void)
{
    int number, k, flag;
    printf("Enter a number : ");
    scanf("%d %d", &number, &k);

    if(digit(number, k) != -1)
        printf("The digit at position %d from the right is: %d\n", k, digit(number, k));
    else 
        printf("The number doesn't have %d digits.\n", k);

    return 0;
}

int digit(int number, int k)
{
    if(number == 0)
        return (k == 1) ? 0 : -1;
    
    if(number < 0)
        number = -number;

    for(int i = 1;i < k;i ++)
        number /= 10;
    if(number == 0)
        return -1;
    
    return number % 10;
}
```

```
alancong@AlanCongdeMacBook-Air chapter_9 % ./a.out 
Enter a number : 829 1
The digit at position 1 from the right is: 9
alancong@AlanCongdeMacBook-Air chapter_9 % ./a.out
Enter a number : 829 2
The digit at position 2 from the right is: 2
alancong@AlanCongdeMacBook-Air chapter_9 % ./a.out
Enter a number : 829 3
The digit at position 3 from the right is: 8
```

7. 假设函数 `f` 有如下定义：

```c
int f(int a, int b) { ... }
```

那么下面哪些语句是合法的？（假设 `i` 的类型为 `int` 而 `x` 的类型为 `double`。）

```C
(a) i = f(83, 12);
(b) x = f(83, 12);
(c) i = f(3.15, 9.28);
(d) x = f(3.15, 9.28);
(e) f(83, 12);
```

```
(a) i = f(83, 12); 合法，完全匹配
(b) x = f(83, 12); 合法，但是存在返回值的隐式类型转换 int→double
(c) i = f(3.15, 9.28); 合法，但是存在形式参数的隐式类型转换 double→int，因此存在精度损失
(d) x = f(3.15, 9.28); 合法，但是存在返回值和形式参数的隐式类型转换 double→int，因此存在精度损失
(e) f(83, 12); 合法，虽然没有使用函数的返回值，但这是合法的
```

```
#include <stdio.h>

int f(int a, int b);

int main(void)
{
    int i;
    double x;

    i = f(83, 12);
    x = f(83, 12);
    i = f(3.15, 9.28);
    x = f(3.15, 9.28);
    f(83, 12);
    
    return 0;
}

int f(int a, int b)
{
    return a + b;
}
```

```
alancong@AlanCongdeMacBook-Air chapter_9 % cc 9_7.c 
9_7.c:12:17: warning: implicit conversion from 'double' to 'int' changes value from 9.279999999999999 to 9 [-Wliteral-conversion]
   12 |     i = f(3.15, 9.28);
      |         ~       ^~~~
9_7.c:12:11: warning: implicit conversion from 'double' to 'int' changes value from 3.15 to 3 [-Wliteral-conversion]
   12 |     i = f(3.15, 9.28);
      |         ~ ^~~~
9_7.c:13:17: warning: implicit conversion from 'double' to 'int' changes value from 9.279999999999999 to 9 [-Wliteral-conversion]
   13 |     x = f(3.15, 9.28);
      |         ~       ^~~~
9_7.c:13:11: warning: implicit conversion from 'double' to 'int' changes value from 3.15 to 3 [-Wliteral-conversion]
   13 |     x = f(3.15, 9.28);
      |         ~ ^~~~
4 warnings generated.
```

9.2 节

8. 对于不返回值且有一个 `double` 类型形式参数的函数，下列哪些函数原型是有效的？

```
(a) void f(double x);
(b) void f(double);
(c) void f(x);
(d) f(double x);
```

```
(a) void f(double x); 合法，这个就是标准的函数声明
(b) void f(double); 合法，函数声明的时候可以省略掉形式参数的名字
(c) void f(x); 不合法，可以省略形式参数的名字但是无法省略类型名
(d) f(double x); 不合法，没有返回值
```

```C
#include<stdio.h>

void f(double x);
void f(double);
void f(x);
f(double x);

int main(void)
{
    return 0;
}

void f(double x)
{
    
}
```

```
alancong@AlanCongdeMacBook-Air chapter_9 % cc 9_8.c
9_8.c:5:8: error: a parameter list without types is only allowed in a function definition
    5 | void f(x);
      |        ^
9_8.c:6:1: error: type specifier missing, defaults to 'int'; ISO C99 and later do not support implicit int [-Wimplicit-int]
    6 | f(double x);
      | ^
      | int
9_8.c:6:1: error: conflicting types for 'f'
9_8.c:4:6: note: previous declaration is here
    4 | void f(double);
      |      ^
3 errors generated.
```

9.3 节

9. 下列程序的输出是什么？

```c
#include 
void swap(int a, int b);
int main(void) {
    int i = 1, j = 2;
    swap(i, j);
    printf("i = %d, j = %d\n", i, j);
    return 0;
}
void swap(int a, int b) {
    int temp = a;
    a = b;
    b = temp;
}
```

```
alancong@AlanCongdeMacBook-Air chapter_9 % ./a.out 
i = 1, j = 2
```

```
这个程序是用来交换输入参数的值，但是最终的输出并没有任何的副作用，这是因为形式参数相当于实际参数的备份，对形式参数的修改并不会导致实际参数的变化，很容易想到的思路就是”直接传入“需要交换的变量本身，这个就是指针。
```

10. 编写函数，使得函数返回下列值。（假设 `a` 和 `n` 是形式参数，其中 `a` 是 `int` 类型数组，`n` 是数组的长度。）

```
(a) 数组 a 中最大的元素。
(b) 数组 a 中所有元素的平均值。
(c) 数组 a 中正数元素的数量。
```

```C
#include<stdio.h>

int max(int a[], int n);
double ave(int a[], int n);
int count(int a[], int n);

int main(void)
{
    int test[10] = {0, 1, 2, 3, 4, 5, 6, 7, 8, 9};
    printf("The max of array Test is : %d\n", max(test, 10));
    printf("The ave of array Test is : %.1lf\n", ave(test, 10));
    printf("The count of array Test is : %d\n", count(test, 10));
    return 0;
}

int max(int a[], int n)
{
    int max = a[0];
    for(int i = 1;i < n;i ++)
        if(max < a[i])
            max = a[i];

    return 0;
}

double ave(int a[], int n)
{
    double sum = 0;
    for(int i = 0;i < n;i ++)
        sum += a[i];

    return sum / n;
}

int count(int a[], int n)
{
    int count = 0;
    for(int i = 0;i < n;i ++)
        if(a[i] > 0)
            count ++;

    return count;
}
```

```
The max of array Test is : 0
The ave of array Test is : 4.5
The count of array Test is : 9
```

11. 编写下面的函数：

```c
float compute_GPA(char grades[], int n);
```

其中 `grades` 数组包含字母等级（A、B、C、D 或 F，大小写皆可），`n` 是数组的长度。函数应返回等级的平均值（假定 A=4，B=3，C=2，D=1，F=0）。

```C
#include <stdio.h>
#include <ctype.h>

float compute_GPA(char grades[], int n);

int main(void)
{
    char grade[] = {'A', 'B', 'C', 'D', 'F'};

    printf("The GPA is : %.1lf\n", compute_GPA(grade, 5));

    return 0;
}

float compute_GPA(char grades[], int n)
{
    float ave = 0;
    for(int i = 0;i < n;i ++)
    {
        if('A' <= toupper(grades[i]) && toupper(grades[i]) <= 'D')
            ave += 1 - (toupper(grades[i]) - 'D');
    }

    return ave / n;
}
```

```
alancong@AlanCongdeMacBook-Air chapter_9 % ./a.out 
The GPA is : 2.0
```

12. 编写下面的函数：

```c
double inner_product(double a[], double b[], int n);
```

函数应返回 `a[0] * b[0] + a[1] * b[1] + ... + a[n-1] * b[n-1]`。

```C
#include <stdio.h>

double inner_product(double a[], double b[], int n);

int main(void)
{
    double a[] = {-1.5, 0.0, 2.5, 3.0};
    double b[] = {4.0, -2.0, 1.0, 0.5};

    printf("The inner product is : %.1lf\n", inner_product(a, b, 4));
    return 0;
}

double inner_product(double a[], double b[], int n)
{
    double sum = 0;
    for (int i = 0; i < n; i++)
        sum += a[i] * b[i];

    return sum;
}
```

```
alancong@AlanCongdeMacBook-Air chapter_9 % ./a.out 
The inner product is : -2.0
```

13. 编写下面的函数，对棋盘位置求值：

```c
int evaluate_position(char board[8][8]);
```

`board` 表示棋盘上方格的配置，其中字母 K、Q、R、B、N、P 表示白色的方格，字母 k、q、r、b、n、p 表示黑色的方格。`evaluate_position` 应计算出白色方格的和（Q=9，R=5，B=3，N=3，P=1），并按类似的方法计算出黑色方格的和，然后返回这两个数的差。如果白子占优则返回值为正数，如果黑子占优则返回值为负数。

```C
#include <stdio.h>
#include <ctype.h>
int evaluate_position(char board[8][8]);

// （Q=9，R=5，B=3，N=3，P=1）

char midgame_board[8][8] = {
    {'r', '.', '.', '.', 'k', '.', '.', 'r'},
    {'p', 'p', 'p', 'q', '.', 'p', 'p', 'p'},
    {'.', '.', 'n', '.', '.', '.', '.', '.'},
    {'.', 'b', '.', 'p', 'P', '.', '.', '.'},
    {'.', '.', 'P', '.', 'N', 'B', '.', '.'},
    {'.', '.', '.', '.', '.', '.', '.', '.'},
    {'P', 'P', '.', 'Q', '.', 'P', 'P', 'P'},
    {'R', 'N', 'B', '.', 'K', '.', '.', 'R'}};

char endgame_board[8][8] = {
    {'.', '.', '.', '.', 'k', '.', '.', '.'},
    {'.', '.', '.', '.', '.', '.', '.', '.'},
    {'.', '.', '.', '.', '.', '.', '.', '.'},
    {'.', '.', '.', '.', 'p', '.', '.', '.'},
    {'.', '.', '.', '.', 'P', '.', '.', '.'},
    {'.', '.', '.', '.', '.', '.', '.', '.'},
    {'.', '.', '.', '.', '.', '.', '.', '.'},
    {'.', '.', '.', '.', 'K', '.', '.', 'R'}};

int main(void)
{
    if (evaluate_position(midgame_board) > 0)
        printf("White advanced!\n");
    else if (evaluate_position(midgame_board) < 0)
        printf("Black advanced!\n");
    else
        printf("Even position.\n");

    if (evaluate_position(endgame_board) > 0)
        printf("White advanced!\n");
    else if (evaluate_position(endgame_board) < 0)
        printf("Black advanced!\n");
    else
        printf("Even position.\n");

    return 0;
}

int evaluate_position(char board[8][8])
{
    int black = 0, white = 0;
    for (int i = 0; i < 8; i++)
        for (int j = 0; j < 8; j++)
        {
            switch (board[i][j])
            {
            case 'q':
                black += 9;
                break;
            case 'r':
                black += 5;
                break;
            case 'b':
                black += 3;
                break;
            case 'n':
                black += 3;
                break;
            case 'p':
                black += 1;
                break;
            case 'Q':
                white += 9;
                break;
            case 'R':
                white += 5;
                break;
            case 'B':
                white += 3;
                break;
            case 'N':
                white += 3;
                break;
            case 'P':
                white += 1;
                break;
            default:
                break;
            }
        }

    return white - black;
}

```

```
alancong@AlanCongdeMacBook-Air chapter_9 % ./a.out 
White advanced!
White advanced!
```

9.4 节

14. 如果数组 `a` 中有任一元素的值为 0，那么下列函数返回 `true`；如果数组 `a` 的所有元素都是非零的，则函数返回 `false`。可惜的是，此函数有错误。请找出错误并且说明修改它的方法。

```c
bool has_zero(int a[], int n) {
    int i;
    for (i = 0; i < n; i++)
        if (a[i] == 0)
            return true;
        else
            return false;
}
```

```C
// 假设数组第一个元素为非零值，第二个元素为零，那么在运行这个函数的时候，因为第一个元素非零就会提前返回
// 但这并非程序的预期运行结果，预期下程序应当运行到第二个元素的时候才返回。
#include <stdio.h>
#include <stdbool.h>

bool has_zero(int a[], int n);

int main(void)
{
    int a[10] = {1, 2, 3, 4, 5, 0, 6, 7, 8, 9};
    if(has_zero(a, 10))
        printf("Contains zero.\n");
    else 
        printf("Does not contain zero.\n");

    return 0;
}

bool has_zero(int a[], int n)
{
    int i;
    for (i = 0; i < n; i++)
        if (a[i] == 0)
            return true;

    return false;
}
```

```
alancong@AlanCongdeMacBook-Air chapter_9 % ./a.out 
Contains zero.
```



15. 下面这个（相当混乱的）函数找出三个数的中间数。重新编写函数，使得它只有一条 `return` 语句。

```c
double median(double x, double y, double z) {
    if (x <= y)
        if (y <= z) return y;
        else if (x <= z) return z;
        else return x;
    if (z <= y) return y;
    if (x <= z) return x;
    return z;
}
```

```C
#include <stdio.h>

double median(double x, double y, double z);

int main(void)
{
    double a[3];
    printf("Enter three number : ");
    for(int i = 0;i < 3;i ++)
        scanf("%lf", &a[i]);

    printf("The middle of %.lf %.lf %.lf is : %.lf\n", a[0], a[1], a[2], median(a[0], a[1], a[2]));

    return 0;
}

double median(double x, double y, double z)
{
    double middle;
    if((x <= y && y <= z) || (z <= y && y <= x))
        middle = y;
    else if((x <= z && z <= y) || (y <= z && z <= x))
        middle = z;
    else 
        middle = x;

    return middle;
}
```

```
alancong@AlanCongdeMacBook-Air chapter_9 % ./a.out 
Enter three number : 1 2 3
The middle of 1 2 3 is : 2
alancong@AlanCongdeMacBook-Air chapter_9 % ./a.out
Enter three number : 1 6 9
The middle of 1 6 9 is : 6
```

9.6 节

16. 请采用精简 `power` 函数的方法来简化 `fact` 函数。


```C
#include <stdio.h>
int fact(int n);

int main(void)
{
    int n;
    printf("Enter a number : ");
    scanf("%d", &n);

    printf("The fact of %d is : %d\n", n, fact(n));

    return 0;
}
int fact(int n)
{
    return n <= 1 ? 1 : n * fact(n - 1);
}
```

```
alancong@AlanCongdeMacBook-Air chapter_9 % ./a.out 
Enter a number : 5
The fact of 5 is : 120
```

17. 请重新编写 `fact` 函数，使得编写后的函数不再有递归。

```C
#include <stdio.h>

int fact(int n);

int main(void)
{
    int n;
    printf("Enter a number : ");
    scanf("%d", &n);

    printf("The fact of %d is : %d\n", n, fact(n));

    return 0;
}
int fact(int n)
{
    int res = 1;
    while(n > 0)
    {
        res *= n;
        n --;
    }

    return res;
}
```

```
alancong@AlanCongdeMacBook-Air chapter_9 % ./a.out 
Enter a number : 5
The fact of 5 is : 120
```

18. 编写递归版本的 `gcd` 函数（见练习题3）。下面是用于计算 `gcd(m, n)` 的策略：如果 `n` 为 0，那么返回 `m`；否则，递归地调用 `gcd` 函数，把 `n` 作为第一个实际参数进行传递，而把 `m % n` 作为第二个实际参数进行传递。

```c
#include<stdio.h>

int gcd(int m, int n);

int main(void)
{
    int m, n, temp;
    printf("Enter two integers: ");
    scanf("%d %d", &m, &n);

    printf("Greatest common divisor: %d\n", gcd(m, n));
    return 0;
}

int gcd(int m, int n)
{
    return n == 0 ? m : gcd(n ,m % n);
}
```

```
alancong@AlanCongdeMacBook-Air chapter_9 % ./a.out 
Enter two integers: 6 3
Greatest common divisor: 3
alancong@AlanCongdeMacBook-Air chapter_9 % ./a.out
Enter two integers: 35 37
Greatest common divisor: 1
```

19. 思考下面这个“神秘”的函数：

```c
void pb(int n) {
    if (n != 0) {
        pb(n / 2);
        putchar('0' + n % 2);
    }
}
```

手动跟踪函数的执行。然后编写程序调用此函数，把用户输入的数传递给此函数。函数做了什么？

```C
#include <stdio.h>

void pb(int n);

int main(void)
{
    int n;
    printf("Enter a number : ");
    scanf("%d", &n);

    pb(n);

    printf("\n");

    return 0;
}

void pb(int n)
{
    if (n != 0)
    {
        pb(n / 2);
        putchar('0' + n % 2);
    }
}
```

```
alancong@AlanCongdeMacBook-Air chapter_9 % ./a.out
Enter a number : 1
1
alancong@AlanCongdeMacBook-Air chapter_9 % ./a.out
Enter a number : 2
10
alancong@AlanCongdeMacBook-Air chapter_9 % ./a.out
Enter a number : 15
1111
alancong@AlanCongdeMacBook-Air chapter_9 % ./a.out
Enter a number : 255
11111111
alancong@AlanCongdeMacBook-Air chapter_9 % ./a.out
Enter a number : 65535
1111111111111111
```

```
很显然这是一个将十进制数转化为二进制数的程序。
```

### 编程题

1. 编写程序，要求用户输入一串整数（把这串整数存储在数组中），然后通过调用 `selection_sort` 函数来排序这些整数。在给定 n 个元素的数组后，`selection_sort` 函数必须做下列工作：
   (a) 搜索数组找出最大的元素，然后把它移到数组的最后；
   (b) 递归地调用函数本身来对前 n-1 个数组元素进行排序。


```C
#include <stdio.h>
#include <stdbool.h>

int selection_sort(int arr[], int n);

int arr[100] = {
    37, 12, 65, 90, 21, 78, 3, 44, 29, 8,
    70, 18, 61, 49, 6, 95, 85, 1, 32, 25,
    72, 31, 87, 11, 66, 22, 76, 91, 38, 26,
    84, 59, 53, 23, 34, 4, 96, 10, 17, 92,
    40, 36, 7, 14, 73, 9, 58, 35, 41, 50,
    45, 28, 39, 79, 63, 64, 2, 55, 19, 20,
    71, 80, 86, 60, 62, 24, 16, 33, 47, 88,
    15, 30, 13, 74, 81, 48, 5, 67, 52, 97,
    68, 75, 43, 56, 46, 89, 42, 82, 27, 93,
    83, 57, 98, 94, 69, 99, 77, 51, 54, 0};

int main(void)
{
    for (int i = 0; i < 100; i++)
        printf("%2d ", arr[i]);
    printf("\n");

    selection_sort(arr, 100);

    for (int i = 0; i < 100; i++)
        printf("%2d ", arr[i]);
    printf("\n");

    return 0;
}

int selection_sort(int arr[], int n)
{
    int temp, max, index = 0;

    if (n == 1)
        return 0;
    else
    {
        max = arr[0];

        for (int i = 1; i < n; i++)
            if (max < arr[i])
            {
                max = arr[i];
                index = i;
            }

        temp = arr[n - 1];
        arr[n - 1] = max;
        arr[index] = temp;

        selection_sort(arr, n - 1);
    }

    return 0;
}
```

```
alancong@AlanCongdeMacBook-Air chapter_9 % ./a.out 
37 12 65 90 21 78  3 44 29  8 70 18 61 49  6 95 85  1 32 25 72 31 87 11 66 22 76 91 38 26 84 59 53 23 34  4 96 10 17 92 40 36  7 14 73  9 58 35 41 50 45 28 39 79 63 64  2 55 19 20 71 80 86 60 62 24 16 33 47 88 15 30 13 74 81 48  5 67 52 97 68 75 43 56 46 89 42 82 27 93 83 57 98 94 69 99 77 51 54  0 
 0  1  2  3  4  5  6  7  8  9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34 35 36 37 38 39 40 41 42 43 44 45 46 47 48 49 50 51 52 53 54 55 56 57 58 59 60 61 62 63 64 65 66 67 68 69 70 71 72 73 74 75 76 77 78 79 80 81 82 83 84 85 86 87 88 89 90 91 92 93 94 95 96 97 98 99 
```

```
这道题在写的时候在两个地方，一是递归函数的调用有点不太熟练。二是index的初始值我没有搞清楚，其实很容易理解，一共就是两种情况，当a[0]不是最大值的时候index就会是循环中的i，如果a[0]本身就是最大值，那么交换的a[index]就应该是a[0]，但是我一开始写成了index = n - 1，这个就交换错了，所以最终的结果不对，部分有序的结果我认为是和a[0]的值为37有关，从38开始是有序的，但是当37本身是最大的数字的时候，bug就暴露出来了。
```

```
alancong@AlanCongdeMacBook-Air chapter_9 % ./a.out 
37 12 65 90 21 78  3 44 29  8 70 18 61 49  6 95 85  1 32 25 72 31 87 11 66 22 76 91 38 26 84 59 53 23 34  4 96 10 17 92 40 36  7 14 73  9 58 35 41 50 45 28 39 79 63 64  2 55 19 20 71 80 86 60 62 24 16 33 47 88 15 30 13 74 81 48  5 67 52 97 68 75 43 56 46 89 42 82 27 93 83 57 98 94 69 99 77 51 54  0 
 0  1  2  3  4  5  6  7  8  9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34 35 36 37 38 39 40 41 42 43 44 45 46 47 48 49 50 51 52 53 54 55 56 57 58 59 60 61 62 63 64 65 66 67 68 69 70 71 72 73 74 75 76 77 78 79 80 81 82 83 84 85 86 87 88 89 90 91 92 93 94 95 96 97 98 99 
```

2. 修改第5章的编程题5，用函数计算所得税的金额。在输入应纳税所得额后，函数返回税金。

```C
#include<stdio.h>

float calculate_tax(int income);

int main(void)
{
    int income;
    float tax;
    printf("Enter your income:");
    scanf("%d", &income);

    printf("The tax is:%.2f\n", calculate_tax(income));

    return 0;
}

float calculate_tax(int income)
{
    float tax;
    if(income < 750)
        tax = income * 0.01f;
    else if(750 <= income && income <= 2250)
        tax = (income - 750) * 0.02 + 7.5f;
    else if(2250 <= income && income <= 3750)
        tax = (income - 2250) * 0.03 + 37.5f;
    else if(3750 <= income && income <= 5250)
        tax = (income - 3750) * 0.04 + 82.5f;
    else if(5250 <= income && income <= 7000)
        tax = (income - 5250) * 0.05 + 142.5f;
    else if(income > 7000)
        tax = (income - 7000) * 0.06 + 230.0f;

    return tax;
}
```

```
alancong@AlanCongdeMacBook-Air chapter_9 % ./a.out 
Enter your income:256
The tax is:2.56
```

3. 修改第8章的编程题9，使其包含下列函数：

```c
void generate_random_walk(char walk[10][10]);
void print_array(char walk[10][10]);
```

main 函数首先调用 `generate_random_walk`，该函数把所有数组元素都初始化为字符 `.`，然后将其中一些字符替换为 A~Z 的字母，详见原题的描述。接着，main 函数调用 `print_array` 函数来显示数组。

```
#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>
#include <time.h>

// the index to find if the direction is reachable
#define UP 0
#define RIGHT 1
#define LEFT 2
#define DOWN 3
#define ROW 10
#define COLUMN 10

void generate_random_walk(char walk[10][10]);
void print_array(char walk[10][10]);

int main(void)
{
    char board[ROW][COLUMN];

    generate_random_walk(board);
    print_array(board);

    return 0;
}

void generate_random_walk(char walk[10][10])
{
    int row = 0, col = 0, direction_num = 0, dir;
    bool direction[4] = {false};
    char snake = 'A';
    // initiate char array
    for (int i = 0; i < 10; i++)
        for (int j = 0; j < 10; j++)
            walk[i][j] = '.';

    walk[row][col] = snake;
    // set the random seed
    srand(time(NULL));

    // until the string is finished
    while (snake < 'Z')
    {
        // check if the direction is reachable
        // the coordinate of the snake is (row, col)
        // so the up direction is (row - 1, col)

        // initiate the number of reachable number
        direction_num = 0;

        // check UP
        if (((row - 1) >= 0) && (walk[row - 1][col] == '.'))
        {
            direction[UP] = true;
            direction_num++;
        }
        // check DOWN
        if (((row + 1) < 10) && (walk[row + 1][col] == '.'))
        {
            direction[DOWN] = true;
            direction_num++;
        }
        // check LEFT
        if (((col - 1) >= 0) && (walk[row][col - 1] == '.'))
        {
            direction[LEFT] = true;
            direction_num++;
        }
        // check RIGHT
        if (((col + 1) < 10) && (walk[row][col + 1] == '.'))
        {
            direction[RIGHT] = true;
            direction_num++;
        }

        // if there is still space remain
        if (direction_num > 0)
        {
            // if the direction is unreachable, just try again.
            while (direction[(dir = rand() % 4)] != true)
                ;
            if (dir == UP)
            {
                row--;
            }
            if (dir == DOWN)
            {
                row++;
            }
            if (dir == RIGHT)
            {
                col++;
            }
            if (dir == LEFT)
            {
                col--;
            }

            walk[row][col] = ++snake;

            // reset the director of the direction
            for (int i = 0; i < 4; i++)
                direction[i] = false;
        }
        else
            break;
    }
}

void print_array(char walk[10][10])
{
    for (int i = 0; i < 10; i++)
    {
        for (int j = 0; j < 10; j++)
            printf("%c ", walk[i][j]);
        printf("\n");
    }
}
```

```
alancong@AlanCongdeMacBook-Air chapter_9 % ./a.out 
A B . . Q R S T U V 
. C . O P . . . X W 
. D . N . . . . Y . 
. E F M L . . . Z . 
. . G J K . . . . . 
. . H I . . . . . . 
. . . . . . . . . . 
. . . . . . . . . . 
. . . . . . . . . . 
. . . . . . . . . . 
```

4. 修改第8章的编程题16，使其包含下列函数：

```c
void read_word(int counts[26]);
bool equal_array(int counts1[26], int counts2[26]);
```

main 函数将调用 `read_word` 两次，每次用于读取用户输入的一个单词。读取单词时，`read_word` 用单词中的字母更新 `counts` 数组，详见原题的描述。`main` 将声明两个数组，每个数组用于一个单词。这些数组用于跟踪单词中每个字母出现的次数。接下来，main 函数调用 `equal_array` 函数， 以前面提到的两个数组作为参数。如果两个数组中的元素相同（表明这两个单词是变位词），`equal_array` 返回 `true`，否则返回 `false`。

```C
#include <stdio.h>
#include <stdbool.h>
#include <ctype.h>

void read_word(int counts[26]);
bool equal_array(int counts1[26], int counts2[26]);

int main(void)
{
    int counts1[26] = {0}, counts2[26] = {0};

    read_word(counts1);
    read_word(counts2);

    if (equal_array(counts1, counts2))
        printf("The words are anagrams.\n");
    else
        printf("The words are not anagrams.\n");

    return 0;
}

void read_word(int counts[26])
{
    char ch;

    printf("Enter a word: ");
    while ((ch = getchar()) != '\n')
    {
        counts[tolower(ch) - 'a']++;
    }
}

bool equal_array(int counts1[26], int counts2[26])
{
    for (int i = 0; i < 26; i++)
        if (counts1[i] != counts2[i])
            return false;

    return true;
}
```

```
alancong@AlanCongdeMacBook-Air chapter_9 % ./a.out 
Enter a word: smartlight
Enter a word: lightsmart
The words are anagrams.
```

```
这个函数是存在隐患的，没有判断输入的字符是不是英文字母，虽然已经完成了题目的要求，但是针对输入一定时刻都要注入合法性的判断，这是非常非常重要的。
```

5. 修改第8章的编程题17，使其包含下列函数：

```c
void create_magic_square(int n, int magic_square[n][n]);
void print_magic_square(int n, int magic_square[n][n]);
```

获得用户输入的数 `n` 之后，main 函数调用 `create_magic_square` 函数，另一个调用参数是在 `main` 内部声明的 `n×n` 的数组。`create_magic_square` 函数用 $1, 2, …, n^2$ 填充数组，如原题所述。接下来，main 函数调用 `print_magic_square`，按原题描述的格式显示数组。注意：如果你的编译器不支持变长数组，请把 `main` 中的数组声明为 99×99 而不是 n×n，并使用下面的原型：

```c
void create_magic_square(int n, int magic_square[99][99]);
void print_magic_square(int n, int magic_square[99][99]);
```

```C
#include <stdio.h>

void create_magic_square(int n, int magic_square[n][n]);
void print_magic_square(int n, int magic_square[n][n]);

int main(void)
{
    int dimension;
    printf("This program creates a magic square of a specified size.\n");
    printf("The size must be an odd number between 1 and 99.\n");
    printf("Enter size of magic square: ");

    scanf("%d", &dimension);
    if (dimension % 2 == 0)
    {
        printf("Negative input!");
        return 0;
    }

    int magic_square[dimension][dimension];

    create_magic_square(dimension, magic_square);
    print_magic_square(dimension, magic_square);

    return 0;
}

void create_magic_square(int n, int magic_square[n][n])
{
    int next_x, next_y, before_x, before_y, count = 0;;

    for (int i = 0; i < n; i++)
    {
        for (int j = 0; j < n; j++)
            magic_square[i][j] = 0;
    }

    for (int i = 0; i < n * n; i++)
    {
        if (i == 0)
        {
            next_x = ((n + 1) / 2) - 1;
            next_y = 0;
            magic_square[next_y][next_x] = ++count;
        }
        else
        {
            if (next_x + 1 >= n)
            {
                before_x = next_x;
                next_x = 0;
            }
            else
            {
                before_x = next_x;
                next_x += 1;
            }

            if (next_y - 1 < 0)
            {
                before_y = next_y;
                next_y = n - 1;
            }
            else
            {
                before_y = next_y;
                next_y -= 1;
            }

            // check if there is already has a number
            if (magic_square[next_y][next_x] == 0)
                magic_square[next_y][next_x] = ++count;
            else
            {
                next_x = before_x;
                next_y = before_y + 1;
                magic_square[next_y][next_x] = ++count;
            }
        }
    }
}
void print_magic_square(int n, int magic_square[n][n])
{
    for (int i = 0; i < n; i++)
    {
        for (int j = 0; j < n; j++)
            printf("%2d ", magic_square[i][j]);
        printf("\n");
    }
}
```

```
alancong@AlanCongdeMacBook-Air chapter_9 % ./a.out 
This program creates a magic square of a specified size.
The size must be an odd number between 1 and 99.
Enter size of magic square: 5
17 24  1  8 15 
23  5  7 14 16 
 4  6 13 20 22 
10 12 19 21  3 
11 18 25  2  9 
```

6. 编写函数计算下面多项式的值：$3x^5 + 2x^4 − 5x^3 - x^2 + 7x - 6$编写程序要求用户输入 x 的值，调用该函数计算多项式的值并显示函数返回的值。

```C
#include<stdio.h>

int calculate_polynomial(int x);
int power(int x, int n);

int main(void)
{
    int x;
    printf("Enter a number : ");
    scanf("%d", &x);

    printf("The result of the polynomial is : %d\n", calculate_polynomial(x));

    return 0;
}

int calculate_polynomial(int x)
{
    int res;
    res = 3 * power(x, 5) + 2 * power(x, 4) - 5 * power(x, 3) - power(x, 2) + 7 * x - 6;

    return res;
}

int power(int x, int n)
{
    if (n == 0)
        return 1;
    else
        return x * power(x, n - 1);
}
```

```
alancong@AlanCongdeMacBook-Air chapter_9 % ./a.out
Enter a number : 0
The result of the polynomial is : -6
alancong@AlanCongdeMacBook-Air chapter_9 % ./a.out
Enter a number : 3
The result of the polynomial is : 762
```

7. 如果换一种方法计算 $x^n$，9.6节的 `power` 函数速度可以更快。我们注意到，如果 n 是 2 的幂，则可以通过自乘的方法计算 $x^n$。例如， $x^4$ 是 $x^2$ 的平方，所以 $4^x$ 可以用两次乘法计算，而不需要三次乘法。这种方法甚至可以用于 n 不是 2 的幂的情况。如果 n 是偶数，则$x^n=(x^{n/2})^2$；如果 n 是奇数，则$x^n=x×x^{n−1}$。编写计算 $x^n$ 的递归函数（递归在 n=0 时结束，此时函数返回 1）。为了测试该函数，写一个程序要求用户输入 x 和 n 的值，调用 `power` 计算 $x^n$，然后显示函数的返回值。

```C
#include<stdio.h>

int calculate_polynomial(int x);
int power(int x, int n);
int main(void)
{
    int x;
    printf("Enter a number : ");
    scanf("%d", &x);

    printf("The result of the polynomial is : %d\n", calculate_polynomial(x));

    return 0;
}

int calculate_polynomial(int x)
{
    int res;
    res = 3 * power(x, 5) + 2 * power(x, 4) - 5 * power(x, 3) - power(x, 2) + 7 * x - 6;

    return res;
}

int power(int x, int n)
{
    if (n == 0)
        return 1;
    else if( n % 2 == 0)
    {
        int res = power(x, n / 2);
        return res * res;
    }
    else 
        return x * power(x, n -1);
}
```

```
alancong@AlanCongdeMacBook-Air chapter_9 % ./a.out 
Enter a number : 0
The result of the polynomial is : -6
alancong@AlanCongdeMacBook-Air chapter_9 % 3
zsh: command not found: 3
alancong@AlanCongdeMacBook-Air chapter_9 % ./a.out
Enter a number : 3
The result of the polynomial is : 762
```

8. 编写函数模拟掷骰子的游戏（两个骰子）。第一次掷的时候，如果点数之和为 7 或 11 则获胜；如果点数之和为 2、3 或 12 则落败；其他情况下的点数之和称为“目标”，游戏继续。在后续的投掷中，如果玩家再次掷出“目标”点数则获胜，掷出 7 则落败，其他情况都忽略，游戏继续进行。每局游戏结束时，程序询问用户是否再玩一次，如果用户输入的回答不是 y 或 Y，程序会显示胜败的次数然后终止。

```
You rolled: 8
Your point is 8
You rolled: 3
You rolled: 10
You rolled: 8
You win!
Play again? y

You rolled: 6
Your point is 6
You rolled: 5
You rolled: 12
You rolled: 3
You rolled: 7
You lose!
Play again? y

You rolled: 11
You win!
Play again? n

Wins: 2 Losses: 1
```

编写三个函数：`main`、`roll_dice` 和 `play_game`。下面给出了后两个函数的原型：

```c
int roll_dice(void);
bool play_game(void);
```

`roll_dice` 应生成两个随机数（每个都在 1~6 范围内），并返回它们的和。`play_game` 应进行一次掷骰子游戏（调用 `roll_dice` 确定每次掷的点数），如果玩家获胜则返回 `true`，如果玩家落败则返回 `false`。`play_game` 函数还要显示玩家每次掷骰子的结果。`main` 函数反复调用 `play_game` 函数，记录获胜和落败的次数，并显示“you win”和“you lose”消息。提示：使用 `rand` 函数生成随机数。关于如何调用 `rand` 和相关的 `srand` 函数，见 8.2 节 `deal.c` 程序中的例子。

```C
#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>
#include <time.h>

int roll_dice(void);
bool play_game(void);

int main(void)
{
    char ch;
    int win = 0, lose = 0;

    srand(time(NULL));

    while (1)
    {
        if (play_game())
        {
            printf("\nYou win! ");
            win++;
        }
        else
        {
            printf("\nYou lose! ");
            lose++;
        }

        printf("\nPlay again? ");
        if ((ch = getchar()) == 'N' || ch == 'n')
        {
            printf("Wins: %d Losses: %d\n", win, lose);
            return 0;
        }
        else if (ch == 'Y' || ch == 'y')
        {   
            // capture the extra \n character
            while((ch = getchar()) != '\n' && ch != EOF);
            printf("\n");
            continue;
        }
        else
            return 0;
    }
}

int roll_dice(void)
{
    int dice_1, dice_2;
    dice_1 = rand() % 6 + 1;
    dice_2 = rand() % 6 + 1;

    return dice_1 + dice_2;
}

bool play_game(void)
{
    char ch;
    bool isFirst = true;
    int res, goal;
    while (1)
    {
        if (isFirst == true || (ch = getchar()) == '\n')
        {
            res = roll_dice();
            printf("You rolled: %d", res);

            if(!isFirst)
            {
                if (res == goal)
                    return true;
                else if(res == 7)
                    return false;
            }
        }

        if (isFirst)
        {
            if (res == 7 || res == 11)
                return true;
            else if (res == 2 || res == 3 || res == 12)
                return false;
            else
            {
                goal = res;
                isFirst = false;
                printf("\nYou point is %d", res);
            }
        }
    }
}
```

```
alancong@AlanCongdeMacBook-Air chapter_9 % ./a.out
You rolled: 9
You point is 9
You rolled: 7
You lose! 
Play again? y

You rolled: 7
You win! 
Play again? y

You rolled: 7
You win! 
Play again? y

You rolled: 7
You win! 
Play again? y

You rolled: 10
You point is 10
You rolled: 9
You rolled: 7
You lose! 
Play again? n
Wins: 3 Losses: 2
```
