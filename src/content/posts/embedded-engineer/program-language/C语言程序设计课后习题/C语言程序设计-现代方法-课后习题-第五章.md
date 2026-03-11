---
title: 《C语言程序设计-现代方法》-课后习题-第五章
published: 2023-02-04
description: ''
image: ''
tags: []
category: '程序设计'
draft: false 
lang: ''
---

## 第五章 选择语句

### 练习题

1. 下列代码片段给出了关系运算符和判等运算符的示例。假设 i、j 和 k 都是 int 型变量，请给出每道题的输出结果。

   ```
   (a) i = 2; 
   		j = 3; 
   		k = i * j == 6; 
   		printf("%d", k); 
   (b) i = 5; 
   		j = 10; 
   		k = 1; 
   		printf("%d", k > i < j); 
   (c) i = 3; 
   		j = 2; 
   		k = 1; 
   		printf("%d", i < j == j < k); 
   (d) i = 3; 
   		j = 4; 
   		k = 5; 
   		printf("%d", i % j + i < k); 
   ```

   ```C
   #include<stdio.h>
   int main(void)
   {
       int i, j, k;
       i = 2; 
       j = 3; 
       k = i * j == 6; 
       printf("%d\n", k); 
       i = 5; 
       j = 10; 
       k = 1; 
       printf("%d\n", k > i < j); 
       i = 3; 
       j = 2; 
       k = 1; 
       printf("%d\n", i < j == j < k); 
       i = 3; 
       j = 4; 
       k = 5; 
       printf("%d\n", i % j + i < k); 
   
       return 0;
   }
   ```

   ```
   1
   1
   1
   0
   ```

   

2. 下列代码片段给出了逻辑运算符的示例。假设 i、j 和 k 都是 int 型变量，请给出每道题的输出结果。

   ```C
   (a) i = 10; 
   		j = 5; 
   		printf("%d", !i < j); 
   (b) i = 2; 
   		j = 1; 
   		printf("%d", !!i + !j); 
   (c) i = 5; 
   		j = 0; 
   		k = -5; 
   		printf("%d", i && j || k); 
   (d) i = 1;
   		j = 2; 
   		k = 3; 
   		printf("%d", i < j || k); 
   ```

   ```C
   #include<stdio.h>
   int main(void)
   {
       int i, j, k;
       i = 10; 
       j = 5; 
       printf("%d\n", !i < j); 
       i = 2; 
       j = 1; 
       printf("%d\n", !!i + !j); 
       i = 5; 
       j = 0; 
       k = -5; 
       printf("%d\n", i && j || k); 
       i = 1;
       j = 2; 
       k = 3; 
       printf("%d\n", i < j || k);
   
       return 0;
   }
   ```

   ```
   1
   1
   1
   1
   ```

   

3. 下列代码片段给出了逻辑表达式的短路行为的示例。假设 i、j 和 k 都是 int 型变量，请给出每道题的输出结果。

   ```C
   (a) i = 3; 
   		j = 4; 
   		k = 5; 
   		printf("%d", i < j || ++j < k); 
   		printf("%d %d %d", i, j, k);
   (b) i = 7; 
   		j = 8; 
   		k = 9; 
   		printf("%d", i – 7 && j++ < k); 
   		printf("%d %d %d", i, j, k); 
   (c) i = 7; 
   		j = 8; 
   		k = 9; 
   		printf("%d", (i = j) || (j = k)); 
   		printf("%d %d %d", i, j, k); 
   (d) i = 1; 
   		j = 1; 
   		k = 1; 
   		printf("%d", ++i || ++j && ++k); 
   		printf("%d %d %d", i, j, k); 
   ```

   ```C
   #include<stdio.h>
   int main(void)
   {
       int i, j, k; 
       i = 3; 
       j = 4; 
       k = 5; 
       printf("%d\n", i < j || ++j < k); 
       printf("%d %d %d\n", i, j, k);
       i = 7; 
       j = 8; 
       k = 9; 
       printf("%d\n", i - 7 && j++ < k); 
       printf("%d %d %d\n", i, j, k); 
       i = 7; 
       j = 8; 
       k = 9; 
       printf("%d\n", (i = j) || (j = k)); 
       printf("%d %d %d\n", i, j, k); 
       i = 1; 
       j = 1; 
       k = 1; 
       printf("%d\n", ++i || ++j && ++k); 
       printf("%d %d %d\n", i, j, k); 
   
       return 0;
   }
   ```

   ```
   1
   3 4 5
   0
   7 8 9
   1
   8 8 9
   1
   2 1 1
   ```

   

4. 编写一个表达式，要求这个表达式根据 i 小于、等于、大于 j 这 3 种情况，分别取值为-1、0、+1。

   ```C
   #include<stdio.h>
   int main(void)
   {
       int i, j;
       printf("Please enter i:\n");
       scanf("%d %d", &i, &j);
   
     	// 一共想到了两种写法，一种就是简单的级联。
       (i < j)? (-1) : (i == j ? 0: 1);
     	// 另一种就是通过对非零值取反再取反会得到1或者0的特性。
       i >= j? !!(i - j) : -1;
   
       return 0;
   }
   ```

   ```C
   参考答案：
   i > j ? 1 : ( i < j ? - 1 : 0)
   ```

   

5. 下面的 if 语句在 C 语言中是否合法？

   ```
   if (n >= 1 <= 10) 
   printf("n is between 1 and 10\n"); 
   ```

   如果合法，那么当 n 等于 0 时会发生什么？

   ```C
   // 程序是合法的但不是合理的，无法得到字面的程序期望。
   // 如果为了表示取值在1~10之间，可以使用表达式n>=0 && n<=10的形式。
   #include<stdio.h>
   int main(void)
   {
       int n = 0;
       if(n >= 1 <= 10)
       printf("n is between 1 and 10\n");
   
       return 0;
   }
   ```

   ```
   n is between 1 and 10
   ```

   

6. 下面的 if 语句在 C 语言中是否合法？

   ```C
   if (n == 1 - 10) 
   printf("n is between 1 and 10\n"); 
   ```

   如果合法，那么当 n 等于 5 时会发生什么？

   ```C
   // 程序是合法的但不是合理的，无法得到字面的程序期望。
   #include<stdio.h>
   int main(void)
   {
       int n = 5;
       if (n == 1 - 10) 
           printf("n is between 1 and 10\n"); 
   
       return 0;
   }
   ```

   **没有任何的输出**

   

7. 如果 i 的值为 17，下面的语句显示的结果是什么？如果 i 的值为-17，下面的语句显示的结果又是什么？`printf("%d\n", i >= 0 ? i : -i);` 

   ```C
   #include<stdio.h>
   int main(void)
   {
       int i = 17;
       printf("%d\n", i >= 0 ? i : -i);
       i = -17;
       printf("%d\n", i >= 0 ? i : -i);
   
       return 0;
   }
   ```

   ```
   17
   17
   ```

   

8. 下面的 if 语句不需要这么复杂，请尽可能地加以简化。

   ```C
   if (age >= 13) 
     if (age <= 19) 
       teenager = true; 
   	else 
     	teenager = false; 
   else if (age < 13) 
     teenager = false; 
   ```

   ```C
   #include<stdio.h>
   int main(void)
   {
       if (13 <= age && age <= 19) 
           teenager = true; 
   		else 
     	    teenager = false; 
   
       return 0;
   }
   ```

   

9. 下面两个 if 语句是否等价？如果不等价，为什么？

   ```C
   if (score >= 90) 					
   	printf("A");  
   else if (score >= 80) 
   	printf("B");  
   else if (score >= 70)
   	printf("C"); 
   else if (score >= 60) 
   	printf("D"); 
   else 
     printf("F"); 
   ```

   ```C
   if (score < 60) 
     printf("F");
   else if (score < 70) 
     printf("D"); 
   else if (score < 80) 
     printf("C"); 
   else if (score < 90) 
     printf("B"); 
   else printf("A");
   ```

   这两个是等价的
   **答案解析：**
   两条if级联语句的输出结果相同，但是不能认为它们是等价的，因为两者的逻辑判断顺序和结构不同，只是一种算法的两种实现。

   ```
   #include <stdio.h>
   int main(void)
   {
       int score;
       if (score >= 90)
           printf("A");
       else if (score >= 80)
           printf("B");
       else if (score >= 70)
           printf("C");
       else if (score >= 60)
           printf("D");
       else
           printf("F");
   
       if (score < 60)
           printf("F");
       else if (score < 70)
           printf("D");
       else if (score < 80)
           printf("C");
       else if (score < 90)
           printf("B");
       else
           printf("A");
           
       return 0;
   }
   ```

   

5.3 节

10. 下面的代码片段的输出结果是什么？（假设 i 是整型变量。）

    ```C
    i = 1; 
    switch (i % 3) { 
     case 0: printf("zero"); 
     case 1: printf("one"); 
     case 2: printf("two"); 
    } 
    ```

    ```C
    #include <stdio.h>
    int main(void)
    {
        i = 1;
        switch (i % 3)
        {
        case 0:
            printf("zero");
        case 1:
            printf("one");
        case 2:
            printf("two");
        }
        return 0;
    }
    ```

    ```
    onetwo
    ```

    

11. 表 5-5 给出了美国佐治亚州的电话区号，以及每个区号所对应地区最大的城市。
    **表 5-5 美国佐治亚州电话区号及对应的主要城市**

    | 区号 | 主要城市 |
    | :--: | :------: |
    | 229  |  Albany  |
    | 404  | Atlanta  |
    | 470  | Atlanta  |
    | 478  |  Macon   |
    | 678  | Atlanta  |
    | 706  | Columbus |
    | 762  | Columbus |
    | 770  | Atlanta  |
    | 912  | Savannah |

    编写一个 switch 语句，其控制表达式是变量 area_code。如果 area_code 的值在表中，switch 语句打印出相应的城市名；否则 switch 语句显示消息“Area code not recognized”。使用 5.3 节讨论的方法，使 switch 语句尽可能地简单。

    ```C
    #include <stdio.h>
    int main(void)
    {
        int area_code;
        printf("Please enter the area code: ");
        scanf("%d", &area_code);
    
        switch (area_code)
        {
        case 229:
            printf("Albany");
            break;
        case 404:
        case 470:
        case 678:
        case 770:
            printf("Atlanta");
            break;
        case 478:
            printf("Macon");
            break;
        case 706:
        case 762:
            printf("Columbus");
            break;
        case 912:
            printf("Savannah");
            break;
        default:
            printf("Area code not recognized");
            break;
        }
        return 0;
    }
    ```

    

### 编程题

```shell
for i in {1..11}; do touch code_5_$i.c; done
```



1. 编写一个程序，确定一个数的位数：

```
Enter a number: 374
The number 374 has 3 digits
```

假设输入的数最多不超过 4 位。提示：利用 if 语句进行数的判定。例如，如果数在 0 和 9 之间，那么位数为 1；如果数在 10 和 99 之间，那么位数为 2。

```C
#include<stdio.h>
int main(void)
{
    int number;
    printf("Enter a number:");
    scanf("%d", &number);

    if(number > 999)
        printf("4\n");
    else if(number > 99)
        printf("3\n");
    else if(number > 9)
        printf("2\n");
    else
        printf("1\n");

    return 0;
}
```

2. 编写一个程序，要求用户输入 24 小时制的时间，然后显示 12 小时制的格式：

```
Enter a 24-hour time: 21:11
Equivalent 12-hour time: 9:11 PM 
```

注意不要把 12:00 显示成 0:00。

```
#include<stdio.h>
int main(void)
{
    int hour, min;
    printf("Enter a 24-hour time:");
    scanf("%d : %d" ,&hour ,&min);

    if(hour <= 12)
        printf("Equivalent 12-hour time:%d:%.2d AM\n", hour, min);
    else if(hour > 12)
        printf("Equivalent 12-hour time:%d:%.2d PM\n", hour - 12, min);

    return 0;
}
```

3. 修改 5.2 节的 broker.c 程序，做出下面两种改变。
   (a) 不再直接输入交易额，而是要求用户输入股票的数量和每股的价格。
   (b) 增加语句用来计算经纪人竞争对手的佣金（少于 2000 股时佣金为每股 33 美元+3 美分，2000 股或更多股时佣金为每股 33 美元+2美分）。在显示原有经纪人佣金的同时，也显示出竞争对手的佣金。

```C
#include <stdio.h>

int main(void)
{
    float stock, number;
    float commission, competitor_comission, value;

    printf("Enter value of trade: ");
    //scanf("%f", &value);
    scanf("%f %f", &stock, &number);
    value = stock * number;

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

    if(stock < 2000)
        competitor_comission = stock * 0.03 + 33;
    else 
        competitor_comission = stock * 0.02 + 33;
    

    printf("Commission: $%.2f\t", commission);
    printf("Competitor: $%.2f\n", competitor_comission);

    return 0;
}
```

3. 表 5-6 中展示了用于测量风力的蒲福风级的简化版本。

**表 5-7  简化的蒲福风级**

| 速度（海里 / 小时） |       描述        |
| :-----------------: | :---------------: |
|       小于 1        |   Calm（无风）    |
|        1 ~ 3        | Light air（轻风） |
|       4 ~ 27        |  Breeze（微风）   |
|       28 ~ 47       |   Gale（大风）    |
|       48 ~ 63       |   Storm（暴风）   |
|       大于 63       | Hurricane（飓风） |

编写一个程序，要求用户输入风速（海里/小时），然后显示相应的描述。

```C
#include<stdio.h>
int main(void)
{
    int speed;
    printf("Enter the speed:");
    scanf("%d", &speed);

    if(speed < 1)
        printf("Calm\n");
    else if(1 <= speed && speed <= 3)
        printf("Light Air\n");
    else if(4 <= speed && speed <= 27)
        printf("Breeze\n");
    else if(28 <= speed && speed <= 47)
        printf("Gale\n");
    else if(48 <= speed && speed <= 63)
        printf("Storm\n");
    else if(speed > 63)
        printf("Hurricane\n");

    return 0;
}
```

5. 在美国的某个州，单身居民需要缴纳表 5-7 中列出的所得税。

**表 5-7 美国某州单身居民个人所得税缴纳标准**

| 收入（美元） |             税金计算方式              |
| ------------ | :-----------------------------------: |
| 未超过 750   |               收入的 1%               |
| 750 ～ 2250  |  7.50 美元 + 超出 750 美元部分的 2%   |
| 2250 ～ 3750 | 37.50 美元 + 超出 2250 美元部分的 3%  |
| 3750 ～ 5250 | 82.50 美元 + 超出 3750 美元部分的 4%  |
| 5250 ～ 7000 | 142.50 美元 + 超出 5250 美元部分的 5% |
| 超过 7000    | 230.00 美元 + 超出 7000 美元部分的 6% |

编写一个程序，要求用户输入应纳税所得额，然后显示税金。

```C
#include<stdio.h>
int main(void)
{
    int income;
    float tax;
    printf("Enter your income:");
    scanf("%d", &income);

  
  	// 同样是犯了没有优化判断结构的问题。
    if(income < 750)
        printf("The tax is:%.2f\n", income * 0.01f);
    else if(750 <= income && income <= 2250)
        printf("The tax is:%.2f\n", (income - 750) * 0.02 + 7.5f);
    else if(2250 <= income && income <= 3750)
        printf("The tax is:%.2f\n", (income - 2250) * 0.03 + 37.5f);
    else if(3750 <= income && income <= 5250)
        printf("The tax is:%.2f\n", (income - 3750) * 0.04 + 82.5f);
    else if(5250 <= income && income <= 7000)
        printf("The tax is:%.2f\n", (income - 5250) * 0.05 + 142.5f);
    else if(income > 7000)
        printf("The tax is:%.2f\n", (income - 7000) * 0.06 + 230.0f);


    return 0;
}
```

```C
#include <stdio.h>

int main(void)
{
    int income;
    float tax;

    printf("Enter your income: ");
    scanf("%d", &income);

    if (income < 750)
        tax = income * 0.01f;
    else if (income <= 2250)
        tax = 7.50f + (income - 750) * 0.02f;
    else if (income <= 3750)
        tax = 37.50f + (income - 2250) * 0.03f;
    else if (income <= 5250)
        tax = 82.50f + (income - 3750) * 0.04f;
    else if (income <= 7000)
        tax = 142.50f + (income - 5250) * 0.05f;
    else
        tax = 230.00f + (income - 7000) * 0.06f; 

    printf("The tax is: %.2f\n", tax);

    return 0;
}

```

6. 修改 4.1 节的 upc.c 程序，使其可以检测 UPC 的有效性。在用户输入 UPC 后，程序将显示 VALID 或NOT VALID。


```C
#include <stdio.h>

int main(void)
{
    int d, i1, i2, i3, i4, i5, j1, j2, j3, j4, j5,
        first_sum, second_sum, total, check_number;

    printf("Enter the first (single) digit: ");
    scanf("%1d", &d);
    printf("Enter first group of five digits: ");
    scanf("%1d%1d%1d%1d%1d", &i1, &i2, &i3, &i4, &i5);
    printf("Enter second group of five digits: ");
    scanf("%1d%1d%1d%1d%1d", &j1, &j2, &j3, &j4, &j5);
    printf("Enter the check number: ");
    scanf("%1d", &check_number);

    first_sum = d + i2 + i4 + j1 + j3 + j5;
    second_sum = i1 + i3 + i5 + j2 + j4;
    total = 3 * first_sum + second_sum;

    if ((9 - ((total - 1) % 10)) == check_number)
        printf("VALID\n");
    else 
        printf("NOT VALID\n");

    printf("Check digit: %d\n", 9 - ((total - 1) % 10));

    return 0;
}
```

7. 编写一个程序，从用户输入的 4 个整数中找出最大值和最小值：

```
Enter four integers: 21 43 10 35
Largest: 43 
Smallest: 10 
```

 要求尽可能少用 if 语句。提示：4 条 if 语句就足够了。

```c
// 我以为我写的不是最优解，但是网上的更加复杂，我的想法就是单次扫描即可完成任务。
#include<stdio.h>
int main(void)
{
    int i, j, k, l, max, min;
    printf("Enter four integers:");
    scanf("%d%d%d%d", &i, &j, &k, &l);

    if(i > j)
    {
        max = i;
        min = j;
    }
    else 
    {
        max = j;
        min = i;
    }
    if(max < k)
        max = k;
    else if(min > k)
        min = k;

    if(max < l)
        max = l;
    else if(min > l)
        min = l;
    
    printf("Largest:%d\n", max);
    printf("Smallest:%d\n", min);

    return 0;
}
```

8. 表 5-8 给出了从一个城市到另一个城市的每日航班信息。

**表 5-8  每日航班信息**

|  起飞时间  |  抵达时间  |
| :--------: | :--------: |
| 8:00 a.m.  | 10:16 a.m. |
| 9:43 a.m.  | 11:52 a.m. |
| 11:19 a.m. | 1:31 p.m.  |
| 12:47 p.m. | 3:00 p.m.  |
| 2:00 p.m.  | 4:08 p.m.  |
| 3:45 p.m.  | 5:55 p.m.  |
| 7:00 p.m.  | 9:20 p.m.  |
| 9:45 p.m.  | 11:58 p.m. |

编写一个程序，要求用户输入一个时间（用 24 小时制的时分表示）。程序选择起飞时间与用户输入最接近的航班，显示出相应的起飞时间和抵达时间。

```
Enter a 24-hour time: 13:15
Closest departure time is 12:47 p.m., arriving at 3:00 p.m. 
```

提示：把输入用从午夜开始的分钟数表示。将这个时间与表格里（也用从午夜开始的分钟数表示）的起飞时间相比。例如，13:15 从午夜开始是 13×60+15 = 795 分钟，与下午 12:47（从午夜开始是767 分钟）最接近。

```c
#include<stdio.h>
int main(void)
{
    int hour, min, cmp;
    int flight1, flight2, flight3, flight4, flight5, flight6, flight7, flight8;
    printf("Enter a 24-hour time: ");
    scanf("%d : %d", &hour, &min);

    flight1 = 8 * 60;
    flight2 = 9 * 60 + 43;
    flight3 = 11 * 60 + 19;
    flight4 = 12 * 60 + 47;
    flight5 = 14 * 60;
    flight6 = 15 * 60 + 45;
    flight7 = 19 * 60;
    flight8 = 21 * 60 + 45;

    cmp = hour * 60 + min;
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
alancong@AlanCongdeMacBook-Air chapter_5 % ./a.out 
Enter a 24-hour time: 13:15
Closest departure time is 12.47 p.m., arriving at 3:00 p.m.
```

9. 编写一个程序，提示用户输入两个日期，然后显示哪一个日期更早：

```
Enter first date (mm/dd/yy): 3/6/08
Enter second date (mm/dd/yy): 5/17/07
5/17/07 is earlier than 3/6/08 
```

```C
#include<stdio.h>
int main(void)
{
    int month1, day1, year1;
    int month2, day2, year2;
    printf("Enter first date (mm/dd/yy): ");
    scanf("%d / %d / %d", &month1, &day1, &year1);
    printf("Enter second date (mm/dd/yy): ");
    scanf("%d / %d / %d", &month2, &day2, &year2);


    if((year1 * 10000 + month1 * 100 + day1) > (year2 * 10000 + month2 * 100 + day2))
        printf("%d/%d/%d is earlier than %d/%d/%d\n", month2, day2, year2, month1, day1, year1);
    else
        printf("%d/%d/%d is earlier than %d/%d/%d\n", month1, day1, year1, month2, day2, year2);

    return 0;
}
```

10. 利用 switch 语句编写一个程序，把用数字表示的成绩转换为字母表示的等级。

```
Enter numerical grade: 84
Letter grade: B 
```

使用下面的等级评定规则：A 为 90～100，B 为 80～89，C 为 70～79，D 为 60～69，F 为 0～59。如果成绩高于 100 或低于 0，则显示出错消息。提示：把成绩拆分成 2 个数字，然后使用 switch 语句判定十位上的数字。

```C
#include<stdio.h>
int main(void)
{
    int grade, number;
    printf("Enter numerical grade: ");
    scanf("%d", &grade);

    if(grade < 0 || grade > 100)
    {
        printf("Input Error\n");
        return 0;
    }

    number = grade / 10;

    printf("Letter grade: ");
    switch (number)
    {
    case 10: case 9:
        printf("A\n");
        break;
    case 8:
        printf("B\n");
        break;
    case 7:
        printf("C\n");
        break;
    case 6:
        printf("D\n");
        break;
    case 5: case 4: case 3: case 2: case 1: case 0:
        printf("F\n");
        break;
    default:
        break;
    }

    return 0;
}
```

11. 编写一个程序，要求用户输入一个两位数，然后显示该数的英文单词：

```
Enter a two-digit number: 45
You entered the number forty-five. 
```

提示：把数分解为两个数字。用一个 switch 语句显示第一位数字对应的单词（“twenty”“thirty”等），用第二个 switch 语句显示第二位数字对应的单词。不要忘记 11～19 需要特殊处理。

```c
#include <stdio.h>

int main(void)
{
    int number, ones, tens;

    printf("Enter a two-digit number: ");
    scanf("%d", &number);

    if (number < 10 || number > 99) 
    {
        printf("Error: input must be a two-digit number.\n");
        return 1;
    }

    printf("You entered the number ");

    if (number >= 10 && number < 20)
    {
        switch (number)
        {
            case 10: printf("ten\n"); break;
            case 11: printf("eleven\n"); break;
            case 12: printf("twelve\n"); break;
            case 13: printf("thirteen\n"); break;
            case 14: printf("fourteen\n"); break;
            case 15: printf("fifteen\n"); break;
            case 16: printf("sixteen\n"); break;
            case 17: printf("seventeen\n"); break;
            case 18: printf("eighteen\n"); break;
            case 19: printf("nineteen\n"); break;
        }
    }
    else
    {
        tens = number / 10;
        ones = number % 10;

        switch (tens)
        {
            case 2: printf("twenty"); break;
            case 3: printf("thirty"); break;
            case 4: printf("forty"); break;
            case 5: printf("fifty"); break;
            case 6: printf("sixty"); break;
            case 7: printf("seventy"); break;
            case 8: printf("eighty"); break;
            case 9: printf("ninety"); break;
        }

        switch (ones)
        {
            case 0: printf("\n"); break;
            case 1: printf("-one\n"); break;
            case 2: printf("-two\n"); break;
            case 3: printf("-three\n"); break;
            case 4: printf("-four\n"); break;
            case 5: printf("-five\n"); break;
            case 6: printf("-six\n"); break;
            case 7: printf("-seven\n"); break;
            case 8: printf("-eight\n"); break;
            case 9: printf("-nine\n"); break;
        }
    }

    return 0;
}
```