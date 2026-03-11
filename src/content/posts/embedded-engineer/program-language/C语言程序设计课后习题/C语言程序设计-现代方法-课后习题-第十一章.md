---
title: 《C语言程序设计-现代方法》-课后习题-第十一章
published: 2023-02-10
description: ''
image: ''
tags: []
category: '程序设计'
draft: false 
lang: ''
---

## 第十一章 指针

### 练习题

11.2节

1. 如果i是变量，且p指向i，那么下列哪些表达式是i的别名？

```C
(a) *p
(b) &p
(c) *&p
(d) &*p
(e) *i
(f) &i
(g) *&i
(h) &*i
```

```
(a) *p *间接寻址p所指向的变量，因此*p是i的别名。
(b) &p &取地址运算符是取的指针变量p的地址，所以是p的地址或者说指向p的指针，并不是i的别名。
(c) *&p 按照左结合，相当于先取指针变量p的地址然后再间接寻址指针p的地址，因此这个表达式是p的别名而不是i。
(d) &*p 按照左结合，相当于先间接寻址指针p，相当于直接访问变量i然后再取地址，也即是&i，所以并不是i的别名。
(e) *i 这个相当于将i变量中存储的值当做地址进行间接寻址，会发生未定义的行为。
(f) &i 取变量i的地址，并不是i的别名。
(g) *&i 先取变量i的地址，再进行间接寻址，*和&互为逆操作，因此表达式是i的别名。
(h) &*i 先将变量i的值作为地址进行间接寻址访问该地址存储的数据，然后再对这个数据进行取地址操作，*和&互为逆操作，因此表达式是i的别名。
```

11.3节

2. 如果i是int类型变量，且p和q是指向int的指针，那么下列哪些赋值是合法的？

```C
(a) p = i;
(b) *p = &i;
(c) &p = q;
(d) p = &q;
(e) p = *&q;
(f) p = q;
(g) *p = q;
(h) *p = *q;
```

```
(a) p = i; 合法，i赋值给指向int对象的指针的时候，会进行隐式的变量转换，但该转换是合法的。
(b) *p = &i; 不合法，表达式相当于i = &i，也就是将指向int对象的指针变量赋值给int类型变量，类型不匹配。
(c) &p = q; 不合法，&p是指针p的地址，不能直接赋值给指针q。
(d) p = &q; 合法，相当于将指针变量q的地址赋值给指针变量p。
(e) p = *&q; 合法，表达式相当于p = q，也就是将指针变量q的值赋值给指针变量p。
(f) p = q; 合法，就是将指针变量q的值赋值给指针变量p。
(g) *p = q; 不合法，假设p是指向int类型的指针，q是int类型的变量，*p是p指向的值，应赋给int类型，而q是int类型，无法直接赋值给*p。
(h) *p = *q; 合法，相当于变量i本身赋值给自己，i = i。
```

11.4节

3. 假设下列函数用来计算数组a中元素的和以及平均值，且数组a长度为n。avg和sum指向函数需要修改的变量。但是，这个函数有几个错误，请找出这些错误并修改。

```
void avg_sum(double a[], int n, double *avg, double *sum) {  
    int i;  
    sum = 0.0;  
    for (i = 0; i < n; i++)  
        sum += a[i];  
    avg = sum / n;  
}
```

```c
#include<stdio.h>

#define MAX 10

void avg_sum(double a[], int n, double *avg, double *sum);

int main(void)
{
    double number[10] = {0.0, 1.0, 2.0, 3.0, 4.0, 5.0, 6.0, 7.0, 8.0, 9.0}, avg, sum;
    avg_sum(number, MAX, &avg, &sum);

    printf("Avg is : %.1f, Sum is : %.1f\n", avg, sum);

    return 0;
}

void avg_sum(double a[], int n, double *avg, double *sum)
{
    int i;
    *sum = 0.0;
    for (i = 0; i < n; i++)
        *sum += a[i];
    *avg = *sum / n;
}
```

```
alancong@AlanCongdeMacBook-Air chapter_11 % ./a.out 
Avg is : 4.5, Sum is : 45.0
```

```
错误就是sum和avg的使用方式不对，这两个变量中存储的是变量，需要使用*sum和*avg才能访问传入指针所指向的变量
```

4. 编写下列函数：

```
void swap(int *p, int *q);  
```

当传递两个变量的地址时，swap函数应该交换两个变量的值：

```
swap(&i, &j);  /* exchange values of i and j */
```

```c
#include<stdio.h>

void swap(int *p, int *q);  
int main(void)
{
    int i = 1, j = 2;
    printf("Before swappnig i : %d and j : %d\n", i, j);

    swap(&i, &j);

    printf("After swappnig i : %d and j : %d\n", i, j);

    return 0;
}

void swap(int *p, int *q)
{
    int temp;
    temp = *p;
    *p = *q;
    *q = temp;
}
```

```
alancong@AlanCongdeMacBook-Air chapter_11 % ./a.out 
Before swappnig i : 1 and j : 2
After swappnig i : 2 and j : 1
```

5. 编写下列函数：

```
void split_time(long total_sec, int *hr, int *min, int *sec);  
```

total_sec 是以从午夜开始计算的秒数所表示的时间。hr、min 和 sec 都是指向变量的指针，这些变量在函数中将分别存储以小时（0~23）、分钟（0~59）和秒（0~59）为单位的等价时间。

```C
#include<stdio.h>

void split_time(long total_sec, int *hr, int *min, int *sec);  

int main(void)
{
    long total_sec;
    int hr, min, sec;
    printf("Enter the total seconds: ");
    scanf("%ld", &total_sec);

    if(total_sec >= 24 * 60 * 60)
        total_sec %= 24 * 60 * 60;

    split_time(total_sec, &hr, &min, &sec);
    printf("The time is %2d:%2d:%2d\n", hr, min, sec);

    return 0;
}

void split_time(long total_sec, int *hr, int *min, int *sec)
{
    *sec = total_sec % 60;
    *min = (total_sec / 60) % 60;
    *hr = (total_sec / 3600) % 60;
}
```

```
alancong@AlanCongdeMacBook-Air chapter_11 % ./a.out
Enter the total seconds: 3600
The time is  1: 0: 0
alancong@AlanCongdeMacBook-Air chapter_11 % ./a.out  
Enter the total seconds: 12300
The time is  3:25: 0
```

6. 编写下列函数：

```
void find_two_largest(int a[], int n, int *largest, int *second_largest);
```

当传递长度为n的数组a时，函数将在数组a中搜寻最大元素和第二大元素，把它们分别存储在由largest和second_largest指向的变量中。

```C
#include <stdio.h>

#define SIZE 100

int arr[100] = {
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

void find_two_largest(int a[], int n, int *largest, int *second_largest);

int main(void)
{
    int largest, second_largest;
    find_two_largest(arr, SIZE, &largest, &second_largest);

    printf("The largest is %d\nThe second largest is %d\n", largest, second_largest);
    return 0;
}

void find_two_largest(int a[], int n, int *largest, int *second_largest)
{
    *largest = *second_largest = -1;

    for (int i = 0; i < n; i++)
    {
        if (a[i] > *largest)
        {
            *second_largest = *largest;
            *largest = a[i];
        }
        else if (a[i] > *second_largest && a[i] < *largest)
        {
            *second_largest = a[i];
        }
    }
}

```

```
alancong@AlanCongdeMacBook-Air chapter_11 % ./a.out 
The largest is 99
The second largest is 98
```



7. 编写下列函数：

```
void split_date(int day_of_year, int year, int *month, int *day);
```

day_of_year 是1~366范围内的整数，表示year指定的那一年中的特定一天。month和day是指向变量的指针，相应的变量在函数中分别存储等价的月份（1~12）和该月中的日期（1~31）。

```
#include <stdio.h>
#include <stdbool.h>

int daysInMonthNonLeap[12] = {31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31}; // non-leap year
int daysInMonthLeap[12] = {31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31};    // leap year

void split_date(int day_of_year, int year, int *month, int *day);

int main(void)
{
    int day_of_year, year, month, day;
    printf("Enter the day of year : ");
    scanf("%d", &day_of_year);
    printf("Enter the year : ");
    scanf("%d", &year);

    split_date(day_of_year, year, &month, &day);
    printf("Now is %4d/%2d/%2d\n", year, month, day);

    return 0;
}

void split_date(int day_of_year, int year, int *month, int *day)
{
    bool isLeapYear = false;

    if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0)
        isLeapYear = true;

    for (int i = 0; i < 12; i++)
    {
        if ((isLeapYear) && (day_of_year > daysInMonthLeap[i]))
            day_of_year -= daysInMonthLeap[i];
        else if ((isLeapYear) && (day_of_year <= daysInMonthLeap[i]))
        {
            *month = i + 1;
            *day = day_of_year;
            break;
        }

        if ((!isLeapYear) && (day_of_year > daysInMonthNonLeap[i]))
            day_of_year -= daysInMonthNonLeap[i];
        else if ((!isLeapYear) && (day_of_year <= daysInMonthNonLeap[i]))
        {
            *month = i + 1;
            *day = day_of_year;
            break;
        }
    }
}
```

```
alancong@AlanCongdeMacBook-Air chapter_11 % ./a.out 
Enter the day of year : 60 
Enter the year : 2020
Now is 2020/ 2/29
alancong@AlanCongdeMacBook-Air chapter_11 % ./a.out
Enter the day of year : 60
Enter the year : 2021
Now is 2021/ 3/ 1
```

11.5节

8. 编写下列函数：

```
int *find_largest(int a[], int n);
```

当传入长度为n的数组a时，函数将返回指向数组最大元素的指针。

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

int *find_largest(int a[], int n);

int main(void)
{
    int *pointer = find_largest(arr, SIZE);
    printf("The pointer is : %p\n", pointer);
    return 0;
}

int *find_largest(int a[], int n)
{
    int largest = 0, *index;
    for(int i = 0;i < n;i ++)
        if(largest < a[i])
        {
            largest = a[i];
            index = &a[i];
        }

    printf("The largest number is : %d\n", largest);
    return index;
}
```

```
alancong@AlanCongdeMacBook-Air chapter_11 % ./a.out 
The largest number is : 99
The pointer is : 0x102258064
```



### 编程题

1. 修改第2章的编程题7，使其包含下列函数：

```
void pay_amount(int dollars, int *twenties, int *tens, int *fives, int *ones);
```

函数需要确定：为支付参数 `dollars` 表示的付款金额，所需20美元、10美元、5美元和1美元钞票的最小数目。`twenties` 参数所指向的变量存储所需20美元钞票的数目，`tens`、`fives` 和 `ones` 参数类似。

```C
#include<stdio.h>

#define TWENTY 20
#define TEN 10
#define FIVE 5
#define ONE 1

void pay_amount(int dollars, int *twenties, int *tens, int *fives, int *ones);

int main(void)
{
    int dollars, twenties = 0, tens = 0, fives = 0, ones = 0;
    printf("Enter the dollars: ");
    scanf("%d", &dollars);

    pay_amount(dollars, &twenties, &tens, &fives, &ones);
    printf("The change is %d twneny, %d ten, %d five, %d one.\n", twenties, tens, fives, ones);
    return 0;
}

void pay_amount(int dollars, int *twenties, int *tens, int *fives, int *ones)
{
    *twenties = dollars / 20;
    dollars %= 20;
    *tens = dollars / 10;
    dollars %= 10;
    *fives = dollars / 5;
    dollars %= 5;
    *ones = dollars;
}
```

```
alancong@AlanCongdeMacBook-Air chapter_11 % ./a.out 
Enter the dollars: 123456
The change is 6172 twneny, 1 ten, 1 five, 1 one.
```



2. 修改第5章的编程题8，使其包含下列函数：

```
void find_closest_flight(int desired_time, int *departure_time, int *arrival_time);
```

函数需查出起飞时间与 `desired_time`（用从午夜开始的分钟数表示）最接近的航班。该航班的起飞时间和抵达时间（也都用从午夜开始的分钟数表示）将分别存储在 `departure_time` 和 `arrival_time` 所指向的变量中。

```C
#include <stdio.h>

#define NUM_FLIGHTS 8

// departure and arrival times in minutes since midnight
int departures[NUM_FLIGHTS] = {
    8 * 60,
    9 * 60 + 43,
    11 * 60 + 19,
    12 * 60 + 47,
    14 * 60,
    15 * 60 + 45,
    19 * 60,
    21 * 60 + 45};

int arrivals[NUM_FLIGHTS] = {
    10 * 60 + 16,
    11 * 60 + 52,
    13 * 60 + 31,
    15 * 60,
    16 * 60 + 8,
    17 * 60 + 55,
    21 * 60 + 20,
    23 * 60 + 58};

void find_closest_flight(int desired_time, int *departure_time, int *arrival_time);

int main(void)
{
    int hour, min, cmp, departure_time, arrival_time;

    printf("Enter a 24-hour time: ");
    scanf("%d : %d", &hour, &min);

    cmp = hour * 60 + min;

    find_closest_flight(cmp, &departure_time, &arrival_time);

    int dep_hr = departure_time / 60;
    int dep_min = departure_time % 60;
    int arr_hr = arrival_time / 60;
    int arr_min = arrival_time % 60;

    if(dep_hr < 12)
        printf("Closest departure time is %d:%02d a.m.", dep_hr, dep_min);
    else
        printf("Closest departure time is %d:%02d p.m.", dep_hr, dep_min);
    
    if(arr_hr < 12)
        printf(", arriving at %d:%02d a.m. .\n", arr_hr, arr_min);
    else
        printf(", arriving at %d:%02d p.m. .\n", arr_hr, arr_min);
    
    return 0;
}

void find_closest_flight(int desired_time, int *departure_time, int *arrival_time)
{
    int closest = 0;
    for (int i = 1; i < NUM_FLIGHTS; i++)
    {
        int mid = (departures[i - 1] + departures[i]) / 2;
        if (desired_time < mid)
        {
            closest = i - 1;
            break;
        }
        // if not less than any mid, then closest = last flight
        closest = NUM_FLIGHTS - 1;
    }

    *departure_time = departures[closest];
    *arrival_time = arrivals[closest];
    // convert back to hour:minute format for printing


}
```

```
alancong@AlanCongdeMacBook-Air chapter_11 % ./a.out 
Enter a 24-hour time: 12:00
Closest departure time is 11:19 a.m., arriving at 11:19 a.m. .
```



3. 修改第6章的编程题3，使其包含下列函数：

```
void reduce(int numerator, 
						int denominator, 
						int *reduced_numerator, 
						int *reduced_denominator);
```

`numerator` 和 `denominator` 分别是分数的分子和分母。`reduced_numerator` 和 `reduced_denominator` 是指向变量的指针，相应变量中分别存储把分数化为最简形式后的分子和分母。

```C
#include<stdio.h>

void reduce(int numerator, int denominator, int *reduced_numerator, int *reduced_denominator);

int main(void)
{
    int numerator, denominator, reduced_numerator, reduced_denominator;
    printf("Enter a fraction: ");
    scanf("%d / %d", &numerator, &denominator);
 
    reduce(numerator, denominator, &reduced_numerator, &reduced_denominator);

    printf("In lowest terms: %d/%d\n", reduced_numerator, reduced_denominator);

    return 0;
}

void reduce(int numerator, int denominator, int *reduced_numerator, int *reduced_denominator)
{
    int temp, gcd;
    *reduced_numerator = numerator;
    *reduced_denominator = denominator;
    while(denominator != 0)
    {
        temp = denominator;
        denominator = numerator % denominator;
        numerator = temp;
    }
    gcd = numerator;

    *reduced_numerator /= gcd;
    *reduced_denominator /= gcd;
}
```

```
alancong@AlanCongdeMacBook-Air chapter_11 % ./a.out
Enter a fraction: 64/16
In lowest terms: 4/1
```

4. 修改 10.5节的 `poker.c` 程序，把所有的外部变量移到 `main` 函数中，并修改各个函数，使它们通过参数进行通信。`analyze_hand` 函数需要修改变量 `straight`、`flush`、`four`、`three` 和 `pairs`，所以它需要以指向这些变量的指针作为参数。

```C
/* poker.c (Chapter 10, page 233) */
/* Classifies a poker hand */

#include <stdbool.h> /* C99 only */
#include <stdio.h>
#include <stdlib.h>

#define NUM_RANKS 13
#define NUM_SUITS 4
#define NUM_CARDS 5

/* prototypes */
void read_cards(int num_in_rank[], int num_in_suit[]);
void analyze_hand(int num_in_rank[], int num_in_suit[], bool *strainght, bool *flush, bool *four, bool *three, int *pairs);
void print_result(bool *strainght, bool *flush, bool *four, bool *three, int *pairs);

/**********************************************************
 * main: Calls read_cards, analyze_hand, and print_result *
 *       repeatedly.                                      *
 **********************************************************/
int main(void)
{
    /* external variables */
    int num_in_rank[NUM_RANKS];
    int num_in_suit[NUM_SUITS];
    bool straight, flush, four, three;
    int pairs; /* can be 0, 1, or 2 */

    for (;;)
    {
        read_cards(num_in_rank, num_in_suit);
        analyze_hand(num_in_rank, num_in_suit, &straight, &flush, &four, &three, &pairs);
        print_result(&straight, &flush, &four, &three, &pairs);
    }
}

/**********************************************************
 * read_cards: Reads the cards into the external          *
 *             variables num_in_rank and num_in_suit;     *
 *             checks for bad cards and duplicate cards.  *
 **********************************************************/
void read_cards(int num_in_rank[], int num_in_suit[])
{
    bool card_exists[NUM_RANKS][NUM_SUITS];
    char ch, rank_ch, suit_ch;
    int rank, suit;
    bool bad_card;
    int cards_read = 0;

    for (rank = 0; rank < NUM_RANKS; rank++)
    {
        num_in_rank[rank] = 0;
        for (suit = 0; suit < NUM_SUITS; suit++)
            card_exists[rank][suit] = false;
    }

    for (suit = 0; suit < NUM_SUITS; suit++)
        num_in_suit[suit] = 0;

    while (cards_read < NUM_CARDS)
    {
        bad_card = false;

        printf("Enter a card: ");

        rank_ch = getchar();
        switch (rank_ch) {
        case '0':           exit(EXIT_SUCCESS);
        case '2':           rank = 0; break;
        case '3':           rank = 1; break;
        case '4':           rank = 2; break;
        case '5':           rank = 3; break;
        case '6':           rank = 4; break;
        case '7':           rank = 5; break;
        case '8':           rank = 6; break;
        case '9':           rank = 7; break;
        case 't': case 'T': rank = 8; break;
        case 'j': case 'J': rank = 9; break;
        case 'q': case 'Q': rank = 10; break;
        case 'k': case 'K': rank = 11; break;
        case 'a': case 'A': rank = 12; break;
        default:            bad_card = true;
        }

        suit_ch = getchar();
        switch (suit_ch) {
        case 'c': case 'C': suit = 0; break;
        case 'd': case 'D': suit = 1; break;
        case 'h': case 'H': suit = 2; break;
        case 's': case 'S': suit = 3; break;
        default:            bad_card = true;
        }

        while ((ch = getchar()) != '\n')
            if (ch != ' ')
                bad_card = true;

        if (bad_card)
            printf("Bad card; ignored.\n");
        else if (card_exists[rank][suit])
            printf("Duplicate card; ignored.\n");
        else
        {
            num_in_rank[rank]++;
            num_in_suit[suit]++;
            card_exists[rank][suit] = true;
            cards_read++;
        }
    }
}

/**********************************************************
 * analyze_hand: Determines whether the hand contains a   *
 *               straight, a flush, four-of-a-kind,       *
 *               and/or three-of-a-kind; determines the   *
 *               number of pairs; stores the results into *
 *               the external variables straight, flush,  *
 *               four, three, and pairs.                  *
 **********************************************************/
void analyze_hand(int num_in_rank[], 
                int num_in_suit[], 
                bool *straight, 
                bool *flush, 
                bool *four, 
                bool *three,
                int *pairs)
{
    int num_consec = 0;
    int rank, suit;

    *straight = false;
    *flush = false;
    *four = false;
    *three = false;
    *pairs = 0;

    /* check for flush */
    for (suit = 0; suit < NUM_SUITS; suit++)
        if (num_in_suit[suit] == NUM_CARDS)
            *flush = true;

    /* check for straight */
    rank = 0;
    while (num_in_rank[rank] == 0)
        rank++;
    for (; rank < NUM_RANKS && num_in_rank[rank] > 0; rank++)
        num_consec++;
    if (num_consec == NUM_CARDS)
    {
        *straight = true;
        return;
    }

    /* check for 4-of-a-kind, 3-of-a-kind, and pairs */
    for (rank = 0; rank < NUM_RANKS; rank++)
    {
        if (num_in_rank[rank] == 4)
            *four = true;
        if (num_in_rank[rank] == 3)
            *three = true;
        if (num_in_rank[rank] == 2)
            *pairs += 1;
    }
}

/**********************************************************
 * print_result: Prints the classification of the hand,   *
 *               based on the values of the external      *
 *               variables straight, flush, four, three,  *
 *               and pairs.                               *
 **********************************************************/
void print_result(bool *straight, bool *flush, bool *four, bool *three, int *pairs)
{
    if (*straight && *flush)
        printf("Straight flush");
    else if (*four)
        printf("Four of a kind");
    else if (*three && *pairs == 1)
        printf("Full house");
    else if (*flush)
        printf("Flush");
    else if (*straight)
        printf("Straight");
    else if (*three)
        printf("Three of a kind");
    else if (*pairs == 2)
        printf("Two pairs");
    else if (*pairs == 1)
        printf("Pair");
    else
        printf("High card");

    printf("\n\n");
}

```

```
alancong@AlanCongdeMacBook-Air chapter_11 % ./a.out 
Enter a card: 2c
Enter a card: 3c
Enter a card: 4c
Enter a card: 5c
Enter a card: 6c
Straight flush

Enter a card: 0
```


