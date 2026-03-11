---
title: 《C语言程序设计-现代方法》-课后习题-第十二章
published: 2023-02-11
description: ''
image: ''
tags: []
category: '程序设计'
draft: false 
lang: ''
---

## 第十二章 指针和数组

### 练习题

12.1 节

1. 假设下列声明是有效的：

   ```C
   int a[] = {5, 15, 34, 54, 14, 2, 52, 72}; 
   int *p = &a[1], *q = &a[5];
   ```

   ```
   (a) *(p + 3)的值是多少？
   (b) *(q - 3)的值是多少？
   (c) q - p 的值是多少？
   (d) p < q 的结果是真还是假？
   (e) *p < *q 的结果是真还是假？
   ```

   ```
   (a) *(p + 3)的值是多少？相当于a[1 + 3]的值也就是a[4]的值即54
   (b) *(q - 3)的值是多少？相当于a[5 - 2]的值也就是a[3]的值即34
   (c) q - p 的值是多少？相当于数组a第六个元素和第一个元素的距离，结果为4，需要注意的是p - q为-4
   (d) p < q 的结果是真还是假？p和q在同一个数组中，p所指向的元素在q的前面，因此表达式的值为0
   (e) *p < *q 的结果是真还是假？相当于a[1] < a[5]，5 < 14，结果为1
   ```

   

2. *假设 `high`、`low` 和 `middle` 是具有相同类型的指针变量，并且 `low` 和 `high` 指向数组元素。下面的语句为什么是不合法的，如何修改它？

```C
middle = (low + high) / 2;
```

```
因为指针变量指针进行三种形式的运算，指针加上整数、指针减去整数、两个指针相减。
因此这个表达式不仅涉及指针的相加，也存在对指针类型做除法，但从表达式的目的来说是为了得到指向low和high指向元素中间的元素指针，因此可以先用指针相减得到两者之间的距离，然后再加上middle就行。
```

```C
#include <stdio.h>

int a[] = {5, 15, 34, 54, 14, 2, 52, 72}; 
int *low = &a[1], *high = &a[5], *middle;

int main(void)
{
    middle = low + (high - low) / 2;

    return 0;
}
```

**注意：**在 C 语言中，`middle = low + (high - low) / 2;` 是合法且语义正确的写法，用于获取两个指针之间的中间位置。`low` 和 `high` 是指向同一个数组的 `int *` 类型指针，`high - low` 的结果是一个整数（类型为 `ptrdiff_t`），表示它们之间相差多少个元素，因此可以对这个结果除以 2，再加回 `low`，得到指向中间元素的指针。虽然指针本身不能参与加法（两个指针相加）或除法运算，但两个指针相减合法，结果是整数，所以整个表达式本质上是“指针 + 整数”，是允许的。不需要进行任何强制类型转换。

12.2 节

3. 下列语句执行后，数组 `a` 的内容是什么？

```C
#define N 10
int a[N] = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10};
int *p = &a[0], *q = &a[N - 1], temp;
while (p < q)
{
    temp = *p;
    *p++ = *q;
    *q-- = temp;
}
```

```C
#include <stdio.h>

#define N 10

int main(void)
{
    int a[N] = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10};
    int *p = &a[0], *q = &a[N - 1], temp;

    for(int i = 0;i < N;i ++)
        printf("%d ", a[i]);
    printf("\n");

    while (p < q)
    {
        temp = *p;
        *p++ = *q;
        *q-- = temp;
    }

    for(int i = 0;i < N;i ++)
        printf("%d ", a[i]);
    printf("\n");

    return 0;
}
```

**OUT：**

```
alancong@AlanCongdeMacBook-Air chapter_12 % ./a.out 
1 2 3 4 5 6 7 8 9 10 
10 9 8 7 6 5 4 3 2 1 
```

4. 用指针变量 `top_ptr` 代替整型变量 `top` 来重新编写 10.2 节的函数 `make_empty`、`is_empty` 和 `is_full`。

```C
#include <stdbool.h> /* C99 only */
#include <stdio.h>
#include <stdlib.h>

#define STACK_SIZE 100

/* external variables */
int contents[STACK_SIZE];
int top = 0;

int *top_ptr = contents;

void make_empty(void);
bool is_empty(void);
bool is_full(void);
void push(int i);
int pop(void);

int stack_overflow(void);
int stack_underflow(void);

int main(void)
{
    for(int i = 0;i < STACK_SIZE;i ++)
        push(i);
    for(int i = 0;i < STACK_SIZE;i ++)
        printf("%d ", pop());
    printf("\n");

    return 0;
}

void make_empty(void)
{
    top_ptr = contents;
}

bool is_empty(void)
{
    return top_ptr == contents;
}

bool is_full(void)
{
    return top_ptr == contents + STACK_SIZE;
}

void push(int i)
{
    if (is_full())
        stack_overflow();
    else
        *top_ptr++ = i;
}

int pop(void)
{
    if (is_empty())
    {
        stack_underflow();
        return 0;
    }
    else
        return *--top_ptr;
}

int stack_overflow(void)
{
    printf("The stack is overflowed!\n");
    exit(1);
}

int stack_underflow(void)
{
    printf("The stack is underflowed!\n");
    exit(1);
}
```

```
alancong@AlanCongdeMacBook-Air chapter_12 % ./a.out 
99 98 97 96 95 94 93 92 91 90 89 88 87 86 85 84 83 82 81 80 79 78 77 76 75 74 73 72 71 70 69 68 67 66 65 64 63 62 61 60 59 58 57 56 55 54 53 52 51 50 49 48 47 46 45 44 43 42 41 40 39 38 37 36 35 34 33 32 31 30 29 28 27 26 25 24 23 22 21 20 19 18 17 16 15 14 13 12 11 10 9 8 7 6 5 4 3 2 1 0 
```

```
需要注意边界值的判断问题，return top_ptr == contents + STACK_SIZE;
如果写成了return top_ptr == contents + STACK_SIZE - 1;的话就会导致a[99]这个元素始终无法写入，因为这个只是对地址的值进行关系判断，所以不涉及对地址进行间接寻址操作，因此是合法的。
```

12.3 节

5. 假设 `a` 是一维数组而 `p` 是指针变量。如果刚执行了赋值操作 `p = a`，下列哪些表达式会因为类型不匹配而不合法？其他的表达式中哪些为真（有非零值）？

```C
(a) p == a[0]
(b) p == &a[0]
(c) *p == a[0]
(d) p[0] == a[0]
```

```
(a) p == a[0] 不合法，相当于将地址变量与地址p中的值进行比较。
	这道题写错了！
(b) p == &a[0] 合法，相当于将地址变量与数组a第一个元素的地址进行比较，本质上p和&a[0]的值是相等的。
(c) *p == a[0] 合法，相当于将p地址中的值与数组a第一个元素进行比较，本质上就是第一个元素和第一个元素进行比较，表达式的值为真。
(d) p[0] == a[0] 合法，在编译器看来，这两者是*p == *a，又因为p == a，所以表达式的值为真。
```

```C
#include <stdio.h>

int *p, a[5] = {0};

int main(void)
{
    p = a;
    
    printf("%d\n", p == a[0]);
    printf("%d\n", p == &a[0]);
    printf("%d\n", *p == a[0]);
    printf("%d\n", p[0] == a[0]);

    return 0;
}
```

**OUT:**

```
alancong@AlanCongdeMacBook-Air chapter_12 % ./a.out 
0
1
1
1

实际上都是合法的，但是第一个会报错，因为将地址变量和一个int类型的变量进行了比较

alancong@AlanCongdeMacBook-Air chapter_12 % cc 12_5.c
12_5.c:9:22: warning: comparison between pointer and integer ('int *' and 'int') [-Wpointer-integer-compare]
    9 |     printf("%d\n", p == a[0]);
      |                    ~ ^  ~~~~
1 warning generated.
```



6. 用指针算术运算代替数组取下标来重新编写下面的函数。（换句话说，消除变量 `i` 和所有用 `[]` 运算符的地方。）要求改动尽可能少。

```C
int sum_array(const int a[], int n)  
{  
    int i, sum;  
    sum = 0;  
    for (i = 0; i < n; i++)  
        sum += a[i];  
    return sum;  
}
```

```C
#include <stdio.h>

int sum_array(const int *a, int n);

int main(void)
{
    int a[10] = {0, 1, 2, 3, 4, 5, 6, 7, 8, 9};

    printf("%d\n", sum_array(a, 10));

    return 0;
}

int sum_array(const int *a, int n)  
{  
    const int *p;  
    int sum = 0;  
    for (p = a; p < a + n;p ++)  
        sum += *p;  
    return sum;  
}
```

```
alancong@AlanCongdeMacBook-Air chapter_12 % ./a.out 
45
```

```
const int *p 表示指向常量的指针，指针 p 本身可以改变，也就是说可以指向别的地址，但不能通过 *p 去修改它指向的值。
int const *p 和上面是完全等价的，也是指向常量的指针，const 修饰的是指向的值，不能通过 *p 修改值，但指针可以指向其他变量。等价的原因就是int const修饰符和unsigned一样可以互换。
int * const p 是常量指针，指针本身不能改，必须在定义时初始化，也就是说 p 的地址不能再指向别的变量了，但可以通过 *p 修改其指向的值。
const int * const p 表示指向常量的常量指针，既不能通过 *p 修改值，也不能让 p 指向别的变量，指针和值都不可变。
```



7. 编写下列函数：

```
bool search(const int a[], int n, int key);
```

`a` 是待搜索的数组，`n` 是数组中元素的数量，`key` 是搜索键。如果 `key` 与数组 `a` 的某个元素匹配了，那么 `search` 函数返回 `true`；否则返回 `false`。要求使用指针算术运算而不是取下标来访问数组元素。

```C
#include<stdio.h>
#include<stdbool.h>

#define SIZE 10

bool search(const int a[], int n, int key);

int main(void)
{
    const int a[SIZE] = {0, 1, 2, 3, 4, 5, 6, 7, 8, 9};
    int number;

    printf("Enter the number to search : ");
    scanf("%d", &number);

    if(search(a, SIZE, number))
        printf("Exist\n");
    else    
        printf("Not exits\n");

    return 0;
}

bool search(const int a[], int n, int key)
{
    const int *p;
    for(p = a;p < a + n;p ++)
        if(*p == key)
            return true;

    return false;
}
```

```
alancong@AlanCongdeMacBook-Air chapter_12 % ./a.out 
Enter the number to search : 10
Not exits
```

8. 用指针算术运算代替数组取下标来重新编写下面的函数。（换句话说，消除变量 `i` 和所有用到 `[]` 运算符的地方。）要求改动尽可能少。

```C
void store_zeros(int a[], int n)  
{  
    int i;  
    for (i = 0; i < n; i++)  
        a[i] = 0;  
}
```

```C
#include <stdio.h>

#define SIZE 10

void store_zeros(int *a, int n);

int main(void)
{
    int a[SIZE] = {0};
    for (int *p = a; p < a + SIZE; p++)
    {
        *p = p - a;
        printf("%d ", *p);
    }
    printf("\n");

    store_zeros(a, SIZE);

    for (int *p = a; p < a + SIZE; p++)
        printf("%d ", *p);
    printf("\n");

    return 0;
}

void store_zeros(int *a, int n)
{
    int *p;
    for (p = a; p < a + n; p++)
        *p = 0;
}
```

```
alancong@AlanCongdeMacBook-Air chapter_12 % ./a.out 
0 1 2 3 4 5 6 7 8 9 
0 0 0 0 0 0 0 0 0 0 
```

9. 编写下列函数：

```C
double inner_product(const double *a, const double *b, int n);
```

`a` 和 `b` 都指向长度为 `n` 的数组。函数返回 `a[0] * b[0] + a[1] * b[1] + ... + a[n-1] * b[n-1]`。要求使用指针算术运算而不是取下标来访问数组元素。

```C
#include<stdio.h>

#define SIZE 10

double a[SIZE] = {0, 1, 2, 3, 4, 5, 6, 7, 8, 9};
double b[SIZE] = {0, 1, 2, 3, 4, 5, 6, 7, 8, 9};

double inner_product(const double *a, const double *b, int n);

int main(void)
{
    printf("%.2f\n", inner_product(a, b, SIZE));

    return 0;
}

double inner_product(const double *a, const double *b, int n)
{
    const double *p, *q;
    double sum = 0;
    for(p = a, q = b;p < a + n && q < b + n;p ++, q ++)
        sum += *p * *q;

    return sum;
}
```



10. 修改 11.5 节的 `find_middle` 函数，用指针算术运算计算返回值。

```C
#include<stdio.h>

#define SIZE 10

int *find_middle(int *a, int n);

int main(void)
{
    int a[SIZE] = {0, 1, 2, 3, 4, 5, 6, 7, 8, 9};
    printf("%p\n", find_middle(a, SIZE));

    return 0;
}

int *find_middle(int *a, int n)
{
    return a + n / 2;
}
```

```
alancong@AlanCongdeMacBook-Air chapter_12 % ./a.out 
0x16f99aa24
```



11. 修改 `find_largest` 函数，用指针算术运算（而不是取下标）来访问数组元素。

```C
#include<stdio.h>

#define SIZE 100

int arr[SIZE] = {
    67, 89, 25, 11, 4, 97, 61, 68, 10, 88,
    91, 36, 33, 39, 18, 55, 49, 57, 78, 31,
    20, 28, 27, 77, 32, 99, 23, 75, 15, 37,
    92, 56, 71, 74, 30, 86, 5, 9, 94, 62,
    50, 65, 43, 87, 40, 60, 44, 3, 79, 42,
    64, 17, 83, 70, 98, 16, 73, 81, 8, 41,
    59, 13, 66, 82, 45, 76, 26, 51, 46, 21,
    53, 14, 80, 63, 52, 58, 85, 72, 22, 1,
    29, 69, 48, 24, 34, 12, 93, 38, 90, 84,
    19, 47, 2, 54, 35, 6, 0, 7, 95, 96};

int *find_largest(int *a, int n);

int main(void)
{
    int *pointer = find_largest(arr, SIZE);
    printf("The pointer is : %p\n", pointer);
    return 0;
}

int *find_largest(int *a, int n)
{
    int largest = 0, *index;
    for(int *p = a;p < a + n;p ++)
        if(largest < *p)
        {
            largest = *p;
            index = p;
        }

    printf("The largest number is : %d\n", largest);
    return index;
}
```

```
alancong@AlanCongdeMacBook-Air chapter_12 % ./a.out 
The largest number is : 99
The pointer is : 0x104a98064
```



12. 编写下面的函数：

```C
void find_two_largest(const int *a, int n, int *largest, int *second_largest);  
```

`a` 指向长度为 `n` 的数组。函数从数组中找出最大和第二大的元素，并把它们分别存储到由 `largest` 和 `second_largest` 指向的变量中。要求使用指针算术运算而不是取下标来访问数组元素。

```C
#include <stdio.h>

#define SIZE 100

const int arr[100] = {
    67, 89, 25, 11, 4, 97, 61, 68, 10, 88,
    91, 36, 33, 39, 18, 55, 49, 57, 78, 31,
    20, 28, 27, 77, 32, 99, 23, 75, 15, 37,
    92, 56, 71, 74, 30, 86, 5, 9, 94, 62,
    50, 65, 43, 87, 40, 60, 44, 3, 79, 42,
    64, 17, 83, 70, 98, 16, 73, 81, 8, 41,
    59, 13, 66, 82, 45, 76, 26, 51, 46, 21,
    53, 14, 80, 63, 52, 58, 85, 72, 22, 1,
    29, 69, 48, 24, 34, 12, 93, 38, 90, 84,
    19, 47, 2, 54, 35, 6, 0, 7, 95, 96};

void find_two_largest(const int *a, int n, int *largest, int *second_largest);

int main(void)
{
    int largest, second_largest;

    find_two_largest(arr, SIZE, &largest, &second_largest);

    printf("The largest number is : %d ", largest);
    printf("The second largest number is : %d\n", second_largest);

    return 0;
}

void find_two_largest(const int *a, int n, int *largest, int *second_largest)
{
    *largest = *second_largest = 0;
    for(const int *p = a;p < a + n;p ++)
    {
        if(*largest < *p)
        {
            *second_largest = *largest;
            *largest = *p;
        }
        else if(*second_largest < *p && *largest > *p)
            *second_largest = *p;
    }
}
```

```
alancong@AlanCongdeMacBook-Air chapter_12 % ./a.out 
The largest number is : 99 The second largest number is : 98
```

12.4 节

13. 8.2 节有一个代码段用两个嵌套的 `for` 循环初始化用作单位矩阵的数组 `ident`。请重新编写这段代码，采用一个指针来逐个访问数组中的元素，且每次一个元素。提示：因为不能用 `row` 和 `col` 来索引变量，所以不会很容易知道应该在哪里存储 1。但是，可以利用数组的下列事实：第一个元素必须是 1，接着的 N 个元素都必须是 0，再接下来的元素是 1，以此类推。用变量来记录已经存储的连续的 0 的数量。当计数达到 N 时，就是存储 1 的时候了。


```C
#include <stdio.h>

#define N 10

int main(void)
{
    double ident[N][N];
    int count = 0;

    for(double *p = &ident[0][0];p < ident[0] + N * N;p ++, count ++)
        if(count % (N + 1) == 0)
            *p = 1.0;
        else
            *p = 0.0;

    for (int row = 0; row < N; row++)
    {
        for (int col = 0; col < N; col++)
            printf("%.f ", ident[row][col]);
        printf("\n");
    }

    return 0;
}
```

```
alancong@AlanCongdeMacBook-Air chapter_12 % ./a.out 
1 0 0 0 0 0 0 0 0 0 
0 1 0 0 0 0 0 0 0 0 
0 0 1 0 0 0 0 0 0 0 
0 0 0 1 0 0 0 0 0 0 
0 0 0 0 1 0 0 0 0 0 
0 0 0 0 0 1 0 0 0 0 
0 0 0 0 0 0 1 0 0 0 
0 0 0 0 0 0 0 1 0 0 
0 0 0 0 0 0 0 0 1 0 
0 0 0 0 0 0 0 0 0 1 
```



14. 假设下面的数组含有一周 7 天 24 小时的温度读数，数组的每一行是某一天的读数：
    `int temperatures[7][24];`
    编写一条语句，使用 `search` 函数（见练习题 7）在整个 `temperatures` 数组中寻找值 32。

```C
#include <stdio.h>
#include<stdbool.h>

#define HOUR 24
#define WEEKDAY 7

bool search(const int a[], int n, int key);

int main(void)
{
    const int temperatures[WEEKDAY][HOUR] = {
        {12, 14, 13, 11, 10, 9, 8, 7, 10, 15, 18, 20, 23, 25, 26, 24, 22, 20, 18, 16, 14, 13, 12, 11},
        {11, 13, 12, 10, 9, 8, 7, 6, 9, 14, 17, 19, 22, 24, 25, 23, 21, 19, 17, 15, 13, 12, 11, 10},
        {10, 12, 11, 9, 8, 7, 6, 5, 8, 13, 16, 18, 21, 23, 24, 22, 20, 18, 16, 14, 12, 11, 10, 9},
        {13, 15, 14, 12, 11, 10, 9, 8, 11, 16, 19, 21, 24, 26, 27, 25, 23, 21, 19, 17, 15, 14, 13, 12},
        {9, 11, 10, 8, 7, 6, 5, 4, 7, 12, 15, 17, 20, 22, 23, 21, 19, 17, 15, 13, 11, 10, 9, 8},
        {8, 10, 9, 7, 6, 5, 4, 3, 6, 11, 14, 16, 19, 21, 22, 20, 18, 16, 14, 12, 10, 9, 8, 7},
        {7, 9, 8, 6, 5, 4, 3, 2, 5, 10, 13, 15, 18, 20, 21, 19, 17, 15, 13, 11, 9, 8, 7, 6}};

    int number;
    
    printf("Enter the number to search :");
    scanf("%d", &number);

    if(search(&temperatures[0][0], WEEKDAY * HOUR, number))
        printf("Exist\n");
    else
        printf("Not exist\n");
        
    return 0;
}

bool search(const int *a, int n, int key)
{
    for(const int *p = a;p < a + n;p ++)
        if(*p == key)
            return true;

    return false;
}

```



15. 编写一个循环来显示（练习题 14 中的）`temperatures` 数组中第 `i` 行存储的所有温度读数。利用指针来访问该行中的每个元素。

```C
#include <stdio.h>
#include<stdbool.h>

#define HOUR 24
#define WEEKDAY 7

int main(void)
{
    const int temperatures[WEEKDAY][HOUR] = {
        {12, 14, 13, 11, 10, 9, 8, 7, 10, 15, 18, 20, 23, 25, 26, 24, 22, 20, 18, 16, 14, 13, 12, 11},
        {11, 13, 12, 10, 9, 8, 7, 6, 9, 14, 17, 19, 22, 24, 25, 23, 21, 19, 17, 15, 13, 12, 11, 10},
        {10, 12, 11, 9, 8, 7, 6, 5, 8, 13, 16, 18, 21, 23, 24, 22, 20, 18, 16, 14, 12, 11, 10, 9},
        {13, 15, 14, 12, 11, 10, 9, 8, 11, 16, 19, 21, 24, 26, 27, 25, 23, 21, 19, 17, 15, 14, 13, 12},
        {9, 11, 10, 8, 7, 6, 5, 4, 7, 12, 15, 17, 20, 22, 23, 21, 19, 17, 15, 13, 11, 10, 9, 8},
        {8, 10, 9, 7, 6, 5, 4, 3, 6, 11, 14, 16, 19, 21, 22, 20, 18, 16, 14, 12, 10, 9, 8, 7},
        {7, 9, 8, 6, 5, 4, 3, 2, 5, 10, 13, 15, 18, 20, 21, 19, 17, 15, 13, 11, 9, 8, 7, 6}};

    int row;

    printf("Enter the row number to search :");
    scanf("%d", &row);

    for(const int *p = temperatures[row];p < temperatures[row] + HOUR;p ++)
        printf("%d ", *p);
    printf("\n");
        
    return 0;
}
```

```
alancong@AlanCongdeMacBook-Air chapter_12 % ./a.out 
Enter the row number to search :5
8 10 9 7 6 5 4 3 6 11 14 16 19 21 22 20 18 16 14 12 10 9 8 7 
```



16. 编写一个循环来显示（练习题 14 中的）`temperatures` 数组一星期中每一天的最高温度。循环体应该调用 `find_largest` 函数，且一次传递数组的一行。

```C
#include <stdio.h>
#include<stdbool.h>

#define HOUR 24
#define WEEKDAY 7

int *find_largest(int *a, int n);

int main(void)
{
    int temperatures[WEEKDAY][HOUR] = {
        {12, 14, 13, 11, 10, 9, 8, 7, 10, 15, 18, 20, 23, 25, 26, 24, 22, 20, 18, 16, 14, 13, 12, 11},
        {11, 13, 12, 10, 9, 8, 7, 6, 9, 14, 17, 19, 22, 24, 25, 23, 21, 19, 17, 15, 13, 12, 11, 10},
        {10, 12, 11, 9, 8, 7, 6, 5, 8, 13, 16, 18, 21, 23, 24, 22, 20, 18, 16, 14, 12, 11, 10, 9},
        {13, 15, 14, 12, 11, 10, 9, 8, 11, 16, 19, 21, 24, 26, 27, 25, 23, 21, 19, 17, 15, 14, 13, 12},
        {9, 11, 10, 8, 7, 6, 5, 4, 7, 12, 15, 17, 20, 22, 23, 21, 19, 17, 15, 13, 11, 10, 9, 8},
        {8, 10, 9, 7, 6, 5, 4, 3, 6, 11, 14, 16, 19, 21, 22, 20, 18, 16, 14, 12, 10, 9, 8, 7},
        {7, 9, 8, 6, 5, 4, 3, 2, 5, 10, 13, 15, 18, 20, 21, 19, 17, 15, 13, 11, 9, 8, 7, 6}};


    for(int day = 0;day < WEEKDAY;day ++)
    {
        printf("The largest temperature of day %d", day + 1);
        find_largest(temperatures[day], HOUR);
    }
        
    return 0;
}

int *find_largest(int *a, int n)
{
    int largest = a[0], *index = a;
    for(int *p = a;p < a + n;p ++)
        if(largest < *p)
        {
            largest = *p;
            index = p;
        }

    printf(" is : %d\n", largest);
    return index;
}
```

```
alancong@AlanCongdeMacBook-Air chapter_12 % ./a.out 
The largest temperature of day 1 is : 26
The largest temperature of day 2 is : 25
The largest temperature of day 3 is : 24
The largest temperature of day 4 is : 27
The largest temperature of day 5 is : 23
The largest temperature of day 6 is : 22
The largest temperature of day 7 is : 21
```



17. 用指针算术运算代替数组取下标来重新编写下面的函数。（换句话说，消除变量 `i`、`j` 和所有用到 `[]` 运算符的地方。）要求使用单层循环而不是嵌套循环。

```
int sum_two_dimensional_array(const int a[][LEN], int n)  
{  
    int i, j, sum = 0;  
    for (i = 0; i < n; i++)  
        for (j = 0; j < LEN; j++)  
            sum += a[i][j];  
    return sum;  
}
```

```C
#include<stdio.h>

#define LEN 10

const int array[LEN][LEN] = {
    {72, 58, 94, 12, 37, 81, 45, 63, 28, 66},
    {89, 33, 71, 47, 16, 50, 39, 95, 22, 79},
    {44, 91, 84, 60, 10, 78, 56, 35, 17, 65},
    {26, 98, 73, 49, 24, 11, 90, 31, 67, 86},
    {59, 53, 40, 93, 75, 19, 32, 29, 80, 13},
    {36, 42, 64, 88, 20, 96, 85, 70, 27, 77},
    {18, 92, 34, 55, 38, 15, 62, 25, 46, 21},
    {97, 30, 41, 23, 14, 87, 52, 69, 43, 99},
    {51, 76, 61, 54, 48, 57, 74, 68, 83, 59},
    {82, 100, 19, 58, 36, 44, 66, 12, 71, 91}
};


int sum_two_dimensional_array(const int *a, int n);

int main(void)
{
    printf("The sum of the array is : %d\n", sum_two_dimensional_array(&array[0][0], LEN * LEN));
    return 0;
}

int sum_two_dimensional_array(const int *a, int n)  
{  
    int sum = 0;
    for(const int *p = a;p < a + n;p ++)
        sum += *p;

    return sum;  
}
```

```
alancong@AlanCongdeMacBook-Air chapter_12 % ./a.out 
The sum of the array is : 5461
```



18. 编写第 9 章练习题 13 中描述的 `evaluate_position` 函数，使用指针算术运算而不是取下标来访问数组元素。要求使用单层循环而不是嵌套循环。

```C
#include <stdio.h>
#include <ctype.h>

#define WIDTH 8
#define LENGTH 8
int evaluate_position(char *board);

// （Q=9，R=5，B=3，N=3，P=1）

char midgame_board[WIDTH][LENGTH] = {
    {'r', '.', '.', '.', 'k', '.', '.', 'r'},
    {'p', 'p', 'p', 'q', '.', 'p', 'p', 'p'},
    {'.', '.', 'n', '.', '.', '.', '.', '.'},
    {'.', 'b', '.', 'p', 'P', '.', '.', '.'},
    {'.', '.', 'P', '.', 'N', 'B', '.', '.'},
    {'.', '.', '.', '.', '.', '.', '.', '.'},
    {'P', 'P', '.', 'Q', '.', 'P', 'P', 'P'},
    {'R', 'N', 'B', '.', 'K', '.', '.', 'R'}};

char endgame_board[WIDTH][LENGTH] = {
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
    if (evaluate_position(&midgame_board[0][0]) > 0)
        printf("White advanced!\n");
    else if (evaluate_position(&midgame_board[0][0]) < 0)
        printf("Black advanced!\n");
    else
        printf("Even position.\n");

    if (evaluate_position(&endgame_board[0][0]) > 0)
        printf("White advanced!\n");
    else if (evaluate_position(&endgame_board[0][0]) < 0)
        printf("Black advanced!\n");
    else
        printf("Even position.\n");

    return 0;
}

int evaluate_position(char *board)
{
    int black = 0, white = 0;
    for (char *p = board; p < board + WIDTH * LENGTH; p++)
    {
        switch (*p)
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
alancong@AlanCongdeMacBook-Air chapter_12 % ./a.out 
White advanced!
White advanced!
```



### 编程题

1. (a) 编写程序读一条消息，然后逆序打印出这条消息：

   ```
   Enter a message: Don't get mad, get even.
   Reversal is: .neve teg ,dam teg t'noD
   ```

   提示：一次读取消息中的一个字符（用 `getchar` 函数），并且把这些字符存储在数组中，当数组满了或者读到字符 `'\n'` 时停止读操作。

   (b) 修改上述程序，用指针代替整数来跟踪数组中的当前位置。

   ```C
   // (a)
   #include<stdio.h>
   #include<ctype.h>
   
   #define SIZE 100
   
   int main(void)
   {
       char ch, arr[SIZE], index = 0;
   
       printf("Enter a message: ");
       while((ch = getchar()) != '\n' && ch != EOF)
       {
           arr[index ++] = ch;
       }
   
       printf("Reversal is: ");
       while(index != 0)
       {
           printf("%c", arr[--index]);
       }
       printf("\n");
   
       return 0;
   }
   ```

   OUT

   ```
   alancong@AlanCongdeMacBook-Air chapter_12 % ./a.out 
   Enter a message: Don't get mad, get even.                  
   Reversal is: .neve teg ,dam teg t'noD
   ```

   ```C
   // (b)
   #include<stdio.h>
   #include<ctype.h>
   
   #define SIZE 100
   
   int main(void)
   {
       char ch, arr[SIZE], *p;
   
       p = &arr[0];
   
       printf("Enter a message: ");
       while((ch = getchar()) != '\n' && ch != EOF)
       {
           *p++ = ch;
       }
   
       printf("Reversal is: ");
       while(p != arr)
       {
           printf("%c", *--p);
       }
       printf("\n");
   
       return 0;
   }
   ```

   OUT

   ```
   alancong@AlanCongdeMacBook-Air chapter_12 % ./a.out 
   Enter a message: Don't get mad, get even.
   Reversal is: .neve teg ,dam teg t'noD
   ```

   

2. (a) 编写程序读一条消息，然后检查这条消息是否是回文（消息中的字母从左往右读和从右往左读是一样的）：

   ```
   Enter a message: He lived as a devil, eh?
   Palindrome
   ```

   ```
   Enter a message: Madam, I am Adam.
   Not a palindrome
   ```

   忽略所有不是字母的字符。用整型变量来跟踪数组中的位置。
   (b) 修改上述程序，使用指针代替整数来跟踪数组中的位置。

   ```C
   // a
   #include<stdio.h>
   #include<stdbool.h>
   #include<ctype.h>
   
   #define SIZE 100
   
   int main(void)
   {
       char ch, arr[SIZE], start = 0, end = 0;
       bool isPalindrome = true;
   
       printf("Enter a message: ");
       while((ch = getchar()) != '\n' && ch != EOF)
       {
           if('a' <= tolower(ch) && tolower(ch) <= 'z')
               arr[end ++] = ch;
       }
   
       while(start < end)
       {
           if(tolower(arr[start ++]) != tolower(arr[-- end]))
           {
               isPalindrome = false;
               break;
           }
       }
   
       if(isPalindrome)
           printf("Palindrome\n");
       else    
           printf("Not a palindrome\n");
   
       return 0;
   }
   ```

   OUT:

   ```
   alancong@AlanCongdeMacBook-Air chapter_12 % ./a.out 
   Enter a message: He lived as a devil, eh?
   Palindrome
   alancong@AlanCongdeMacBook-Air chapter_12 % ./a.out
   Enter a message: Madam, I am Adam.
   Not a palindrome
   ```

   ```C
   // b
   #include<stdio.h>
   #include<stdbool.h>
   #include<ctype.h>
   
   #define SIZE 100
   
   int main(void)
   {
       char ch, arr[SIZE], *start = &arr[0], *end = &arr[0];
       bool isPalindrome = true;
   
       printf("Enter a message: ");
       while((ch = getchar()) != '\n' && ch != EOF)
       {
           if('a' <= tolower(ch) && tolower(ch) <= 'z')
               *end ++ = ch;
       }
   
       while(start < end)
       {
           if(tolower(*start ++) != tolower(* -- end))
           {
               isPalindrome = false;
               break;
           }
       }
   
       if(isPalindrome)
           printf("Palindrome\n");
       else    
           printf("Not a palindrome\n");
   
       return 0;
   }
   ```

   OUT:

   ```
   alancong@AlanCongdeMacBook-Air chapter_12 % ./a.out 
   Enter a message: He lived as a devil, eh?
   Palindrome
   alancong@AlanCongdeMacBook-Air chapter_12 % ./a.out
   Enter a message: Madam, I am Adam.
   Not a palindrome
   ```

   

3. 请利用数组名可以用作指针的事实简化编程题 1(b) 的程序。

   ```C
   #include<stdio.h>
   #include<ctype.h>
   
   #define SIZE 100
   
   int main(void)
   {
       char ch, arr[SIZE], *p;
   
       p = arr;
   
       printf("Enter a message: ");
       while((ch = getchar()) != '\n' && ch != EOF)
       {
           *p++ = ch;
       }
   
       printf("Reversal is: ");
       while(p != arr)
       {
           printf("%c", *--p);
       }
       printf("\n");
   
       return 0;
   }
   ```

   ```C
   alancong@AlanCongdeMacBook-Air chapter_12 % ./a.out 
   Enter a message: Don't get mad, get even.
   Reversal is: .neve teg ,dam teg t'noD
   ```

   

4. 请利用数组名可以用作指针的事实简化编程题 2(b) 的程序。

   ```C
   #include<stdio.h>
   #include<stdbool.h>
   #include<ctype.h>
   
   #define SIZE 100
   
   int main(void)
   {
       char ch, arr[SIZE], *start = arr, *end = arr;
       bool isPalindrome = true;
   
       printf("Enter a message: ");
       while((ch = getchar()) != '\n' && ch != EOF)
       {
           if('a' <= tolower(ch) && tolower(ch) <= 'z')
               *end ++ = ch;
       }
   
       while(start < end)
       {
           if(tolower(*start ++) != tolower(* -- end))
           {
               isPalindrome = false;
               break;
           }
       }
   
       if(isPalindrome)
           printf("Palindrome\n");
       else    
           printf("Not a palindrome\n");
   
       return 0;
   }
   ```

   ```
   alancong@AlanCongdeMacBook-Air chapter_12 % ./a.out 
   Enter a message:  He lived as a devil, eh?
   Palindrome
   alancong@AlanCongdeMacBook-Air chapter_12 % ./a.out
   Enter a message: Never odd or even.
   Palindrome
   ```

   

5. 修改第 8 章的编程题 14，用指针而不是整数来跟踪包含该语句的数组的当前位置。

   ```C
   #include<stdio.h>
   
   #define SIZE 100
   
   int main(void)
   {
       char sentence[SIZE];
       char *word_start, *word_end = sentence, end_symbol, ch;
   
       printf("Enter a sentence: ");
   
       while((ch = getchar()) != '\n')
       {
           if(ch == '.' || ch == '?' || ch == '!')
           {
               end_symbol = ch;
               break;
           }
           *word_end ++ = ch;
       }
   
       // find the end of the sentence
       word_end -= 1;
   
       while(word_end >= sentence)
       {
           while(word_end >= sentence && *word_end == ' ')
               word_end --;
   
           // aviod out-of-bounds memory access
           if(word_end < sentence)
               break;
   
           // find the end of one word
           char *end = word_end;
           // find the begin of one word
           while(word_end >= sentence && *word_end != ' ')
               word_end --;
   
           // obviously, now *word_end is ' '
           // so we need to mins 1 to find the begin of one word
           word_start = word_end + 1;
   
           while(word_start <= end)
               putchar(*word_start ++);
   
           if(word_end > sentence)
               putchar(' ');
       }
       printf("%c\n", end_symbol);
   
       return 0;
   }
   ```

   ```
   alancong@AlanCongdeMacBook-Air chapter_12 % cc code_12_5.c
   alancong@AlanCongdeMacBook-Air chapter_12 % ./a.out 
   Enter a sentence: you can't swallow a cage can you?
   you can cage a swallow can't you?
   ```

   

6. 修改 9.6 节的 `qsort.c` 程序，使得 `low`、`high` 和 `middle` 是指向数组元素的指针而不是整数。`split` 函数应返回指针而不再是整数。

   ```C
   /* qsort.c (Chapter 9, page 207) */
   /* Sorts an array of integers using Quicksort algorithm */
   
   #include <stdio.h>
   
   #define N 10
   
   void quicksort(int *a, int *low, int *high);
   int *split(int *a, int *low, int *high);
   
   int main(void)
   {
       int a[N];
   
       printf("Enter %d numbers to be sorted: ", N);
       for (int *p = a; p < a + N; p++)
           scanf("%d", p);
   
       quicksort(a, a, a + N - 1);
   
       printf("In sorted order: ");
       for (int *p = a; p < a + N; p ++)
           printf("%d ", *p);
       printf("\n");
   
       return 0;
   }
   
   void quicksort(int *a, int *low, int *high)
   {
       int *middle;
   
       if (low >= high)
           return ;
       middle = split(a, low, high);
       quicksort(a, low, middle - 1);
       quicksort(a, middle + 1, high);
   }
   
   int *split(int *a, int *low, int *high)
   {
       int part_element = *low;
   
       for (;;)
       {
           while (low < high && part_element <= *high)
               high--;
           if (low >= high)
               break;
           *low ++ = *high;
   
           while (low < high && *low <= part_element)
               low++;
           if (low >= high)
               break;
           *high -- = *low;
       }
   
       *high = part_element;
       return high;
   }
   ```

   ```
   alancong@AlanCongdeMacBook-Air chapter_12 % ./a.out 
   Enter 10 numbers to be sorted: 3 7 0 5 9 2 6 1 8 4 
   In sorted order: 0 1 2 3 4 5 6 7 8 9 
   ```

   

7. 修改 11.4 节的 `maxmin.c` 程序，使得 `max_min` 函数使用指针而不是整数来跟踪数组中的当前位置。

   ```C
   /* maxmin.c (Chapter 11, page 250) */
   /* Finds the largest and smallest elements in an array */
   
   #include <stdio.h>
   
   #define N 10
   
   void max_min(int *a, int n, int *max, int *min);
   
   int main(void)
   {
       int b[N], big, small;
   
       printf("Enter %d numbers: ", N);
       for (int *p = b; p < b + N; p ++)
           scanf("%d", p);
   
       max_min(b, N, &big, &small);
   
       printf("Largest: %d\n", big);
       printf("Smallest: %d\n", small);
   
       return 0;
   }
   
   void max_min(int *a, int n, int *max, int *min)
   {
       *max = *min = *a;
       for (int *p = a; p < a + n; p++)
       {
           if (*p > *max)
               *max = *p;
           else if (*p < *min)
               *min = *p;
       }
   }
   ```

   ```
   alancong@AlanCongdeMacBook-Air chapter_12 % ./a.out 
   Enter 10 numbers: 3 7 0 5 9 2 6 1 8 4
   Largest: 9
   Smallest: 0
   ```
