---
title: 《C语言程序设计-现代方法》-课后习题-第八章
published: 2023-02-07
description: ''
image: ''
tags: []
category: '程序设计'
draft: false 
lang: ''
---




## 第八章 数组

### 练习题

8.1 节

1. 前面讨论过，可以用表达式 sizeof(a) / sizeof(a[0])计算数组元素个数。表达式 sizeof(a) /sizeof(*t*)也可以完成同样的工作，其中 *t* 表示数组 a 中元素的类型，但我们认为这是一种较差的方法。这是为什么呢？

```
sizeof(a) / sizeof(a[0])在变换数组元素的类型的时候并不会影响数组元素个数的计算，但是sizeof(a) /sizeof(t)在数组元素的类型发生变换的时候会影响到元素个数的计算，例如将int类型的数组转换为double类型的数组。
```

```C
#include<stdio.h>
int main(void)
{
    int a[10];
    // 模拟数组a的元素类型发生了变化
    double b[10];
    printf("%lu\n", sizeof(a) / sizeof(a[0]));
    printf("%lu\n", sizeof(b) / sizeof(int));

    return 0;
}
```

2. “问与答”部分介绍了使用字母作为数组下标的方法。请描述一下如何使用（字符格式的）数字作为数组的下标。

```
其实就是利用ASCII码表的字母和数字式连续分步的特征来计算出数组的偏移量，例如'9' - '0' = 9
那么letter_num['9'-'0']就等价于letter_num[9]。
```

```c
#include<stdio.h>
int main(void)
{
    int a[10] = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10};

    printf("%d ", a['0' - '0']);
    printf("%d ", a['1' - '0']);
    printf("%d ", a['2' - '0']);
    printf("%d ", a['3' - '0']);
    printf("%d ", a['4' - '0']);
    printf("%d ", a['5' - '0']);
    printf("%d ", a['6' - '0']);
    printf("%d ", a['7' - '0']);
    printf("%d ", a['8' - '0']);
    printf("%d\n", a['9' - '0']);

    return 0;
}
```

3. 声明一个名为 weekend 的数组，其中包含 7 个 bool 值。要求用一个初始化器把第一个值和最后一个值置为 true，其他值都置为 false。

```C
#include<stdio.h>
#include<stdbool.h>
int main(void)
{
	bool weekend[7] = {true, false, false, false, false, false, true};
    for(int i = 0;i < 7;i ++)
    {
        printf("%d ", weekend[i]);
    }
    printf("\n");

    return 0;
}
```

4. 重复练习题 3，但这次用指示器。要求初始化器尽可能地简短。

```C
#include<stdio.h>
#include<stdbool.h>
int main(void)
{
	bool weekend[7] = {[0] = true, [6] = true};
    for(int i = 0;i < 7;i ++)
    {
        printf("%d ", weekend[i]);
    }
    printf("\n");

    return 0;
}
```

5. 斐波那契数为 0, 1, 1, 2, 3, 5, 8, 13, …，其中从第三个数开始，每个数是其前面两个数的和。编写一个程序片段，声明一个名为 fib_number 的长度为 40 的数组，并填入前 40 个斐波那契数。提示：先填入前两个数，然后用循环计算其余的数。

```C
#include<stdio.h>
int main(void)
{
    int a[40] = {0, 1};
    printf("%d\n%d\n", a[0], a[1]);

    for(int i = 2;i < 40;i ++)
    {
        a[i] = a[i - 1] + a[i - 2];
        printf("%d\n", a[i]);
    }

    return 0;
}
```

```
alancong@AlanCongdeMacBook-Air chapter_8 % ./a.out 
0
1
1
2
3
5
8
13
21
34
55
89
144
233
377
610
987
1597
2584
4181
6765
10946
17711
28657
46368
75025
121393
196418
317811
514229
832040
1346269
2178309
3524578
5702887
9227465
14930352
24157817
39088169
63245986
```

8.2 节

6. 计算器、电子手表和其他电子设备经常依靠七段显示器进行数值的输出。为了组成数字，这类设备需要“打开”7 个显示段中的某些部分，同时“关闭”其他部分：

![image-20251107090339256](/Users/alancong/Documents/GitHub/C-Linux/Embedded-C-notes/C_Programming_A_Modern_Approach/assets/image-20251107090339256.png)

假设需要设置一个数组来记住显示每个数字时需要“打开”的显示段。各显示段的编号如下所示：

![image-20251107090456614](/Users/alancong/Documents/GitHub/C-Linux/Embedded-C-notes/C_Programming_A_Modern_Approach/assets/image-20251107090456614.png)

下面是数组的可能形式，每一行表示一个数字：

```C
const int segments[10][7] = {{1, 1, 1, 1, 1, 1, 0}, ...}; 
```

 上面已经给出了初始化器的第一行，请填充余下的部分。

```c
#include <stdio.h>
int main(void)
{
    const int segments[10][7] = {
        {1, 1, 1, 1, 1, 1, 0}, // 0
        {0, 1, 1, 0, 0, 0, 0}, // 1
        {1, 1, 0, 1, 1, 0, 1}, // 2
        {1, 1, 1, 1, 0, 0, 1}, // 3
        {0, 1, 1, 0, 0, 1, 1}, // 4
        {1, 0, 1, 1, 0, 1, 1}, // 5
        {1, 0, 1, 1, 1, 1, 1}, // 6
        {1, 1, 1, 0, 0, 0, 0}, // 7
        {1, 1, 1, 1, 1, 1, 1}, // 8
        {1, 1, 1, 1, 0, 1, 1}, // 9
    };
    return 0;
}
```

7. 利用 8.2 节的简化方法，尽可能地缩短（练习题 6 中）数组 segments 的初始化器。

```C
#include <stdio.h>
int main(void)
{
    const int segments[10][7] = {
        {1, 1, 1, 1, 1, 1},          // 0
        {[1] = 1, [2] = 1},          // 1
        {1, 1, [3] = 1, 1, [6] = 1}, // 2
        {1, 1, 1, 1, [6] = 1},       // 3
        {[1] = 1, 1, [5] = 1, 1},    // 4
        {1, [2] = 1, 1, [5] = 1, 1}, // 5
        {1, [2] = 1, 1, 1, 1, 1},    // 6
        {1, 1, 1},                   // 7
        {1, 1, 1, 1, 1, 1, 1},       // 8
        {1, 1, 1, [4] = 1, 1, 1},    // 9
    };
    return 0;
}
```

8. 为一个名为 temperature_readings 的二维数组编写声明。该数组存储一个月中每小时的温度读数。（简单起见，假定每个月有 30 天。）数组的每一行对应一个月中的每一天，每一列对应一天中的小时数。

```C
#include<stdio.h>
int main(void)
{
    double temperature_readings[30][24];

    return 0;
}
```

9. 利用练习题8中的数组，编写一段程序计算一个月的平均温度（对每月中的每天和每天中的每小时取平均）。

```C
#include <stdio.h>
#include <stdlib.h>
#include <time.h>

int main(void)
{
    double temperature_readings[30][24], sum = 0.0;

    srand(time(NULL));

    for (int i = 0; i < 30; i++)
    {
        for (int j = 0; j < 24; j++)
        {
            temperature_readings[i][j] = (rand() % 51) - 10;
            sum += temperature_readings[i][j];
        }
    }

    printf("Sum of all temperature readings: %.2f°C\n", sum / (30 * 24));

    return 0;
}
```

```
alancong@AlanCongdeMacBook-Air chapter_8 % ./a.out 
Sum of all temperature readings: 15.39°C
```

10. 为一个 8×8 的字符数组编写声明，数组名为 chess_board。用一个初始化器把下列数据放入数组（每个字符对应一个数组元素）：

<img src="/Users/alancong/Documents/GitHub/C-Linux/Embedded-C-notes/C_Programming_A_Modern_Approach/assets/image-20251107091009337.png" alt="image-20251107091009337" style="zoom:33%;" />

```c
#include<stdio.h>
int main(void)
{
    char chess_board[8][8] = {
        {'r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'},
        {'p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'},
        {' ', '.', ' ', '.', ' ', '.', ' ', '.'},
        {'.', ' ', '.', ' ', '.', ' ', '.', ' '},
        {' ', '.', ' ', '.', ' ', '.', ' ', '.'},
        {'.', ' ', '.', ' ', '.', ' ', '.', ' '},
        {'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'},
        {'R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R'}
    };

    for(int i = 0;i < 8;i ++)
    {
        for(int j = 0;j < 8;j ++)
            printf("%c ", chess_board[i][j]);
        printf("\n");
    }
    
    return 0;
}
```

```
alancong@AlanCongdeMacBook-Air chapter_8 % ./a.out  
r n b q k b n r 
p p p p p p p p 
  .   .   .   . 
.   .   .   .   
  .   .   .   . 
.   .   .   .   
P P P P P P P P 
R N B Q K B N R 
```

11. 为一个 8×8 的字符数组编写声明，数组名为 checker_board。然后用一个循环把下列数据写入数组（每个字符对应一个数组元素）：

<img src="/Users/alancong/Documents/GitHub/C-Linux/Embedded-C-notes/C_Programming_A_Modern_Approach/assets/image-20251107114654859.png" alt="image-20251107114654859" style="zoom:33%;" />

提示：如果 *i* + *j* 为偶数，则 *i* 行 *j* 列的元素为 B。

```c
#include<stdio.h>
int main(void)
{
    for(int i = 0;i < 8;i ++)
    {
        for(int j = 0;j < 8;j ++)
        {
            if((i + j) % 2 == 0)
                printf("B ");
            else 
                printf("R ");
        }
        printf("\n");
    }

    return 0;
}
```

```
alancong@AlanCongdeMacBook-Air chapter_8 % ./a.out 
B R B R B R B R 
R B R B R B R B 
B R B R B R B R 
R B R B R B R B 
B R B R B R B R 
R B R B R B R B 
B R B R B R B R 
R B R B R B R B 
```

### 编程题

1. 修改8.1节的程序 `repdigit.c`，使其可以显示出哪些数字有重复（如果有的话）：


```
Enter a number: 939577
Repeated digit(s): 7 9
```

```c
#include <stdbool.h> /* C99 only */
#include <stdio.h>

int main(void)
{
    bool digit_seen[10] = {false}, digit_rep[10] = {false}, isrepeated = false;
    int digit;
    long n;

    printf("Enter a number: ");
    scanf("%ld", &n);

    while (n > 0)
    {
        digit = n % 10;
        if (!digit_seen[digit])
        {
            digit_seen[digit] = true;
        }
        else if (digit_seen[digit])
        {
            digit_rep[digit] = true;
            isrepeated = true;
        }
        n /= 10;
    }

    if (isrepeated)
    {
        printf("Repeated digit: ");
        for (int i = 0; i < 10; i++)
        {
            if (digit_rep[i])
                printf("%d ", i);
        }
        printf("\n");
    }
    else
        printf("No repeated digit\n");

    return 0;
}
```

```C
alancong@AlanCongdeMacBook-Air chapter_8 % ./a.out 
Enter a number: 939577
Repeated digit: 7 9 
```

2. 修改8.1节的程序 `repdigit.c`，使其打印出一份列表，显示出每个数字在数中出现的次数：

```
Enter a number: 41271092
Digit:        0  1  2  3  4  5  6  7  8  9
Occurrences:  1  2  2  0  1  0  0  1  0  1
```

```c
#include <stdbool.h> /* C99 only */
#include <stdio.h>

int main(void)
{
    int digit_count[10] = {0};
    int digit;
    long n;

    printf("Enter a number: ");
    scanf("%ld", &n);

    while (n > 0)
    {
        digit = n % 10;
        digit_count[digit] ++;
        n /= 10;
    }

    printf("Digit:       ");

    for(int i = 0;i < 10;i ++)
    {
        printf("%d ", i);
    }
    printf("\n");

     
    printf("Occurrences: "); 
    for(int i = 0;i < 10;i ++)
    {
        printf("%d ", digit_count[i]);
    }
    printf("\n");

    return 0;
}
```

```
alancong@AlanCongdeMacBook-Air chapter_8 % ./a.out 
Enter a number: 41271092
Digit:       0 1 2 3 4 5 6 7 8 9 
Occurrences: 1 2 2 0 1 0 0 1 0 1 
```

3. 修改8.1节的程序 `repdigit.c`，使得用户可以输入多个数进行重复数字的判断。当用户输入的数小于或等于0时，程序终止。

```c
#include <stdbool.h> /* C99 only */
#include <stdio.h>

int main(void)
{
    int digit_count[10] = {0};
    int digit;
    long n;

    printf("Enter a number: ");
    while (1)
    {
        scanf("%ld", &n);
        if (n <= 0)
            break;

        while (n > 0)
        {
            digit = n % 10;
            digit_count[digit]++;
            n /= 10;
        }
    }

    printf("Digit:       ");

    for (int i = 0; i < 10; i++)
    {
        printf("%d ", i);
    }
    printf("\n");

    printf("Occurrences: ");
    for (int i = 0; i < 10; i++)
    {
        printf("%d ", digit_count[i]);
    }
    printf("\n");

    return 0;
}
```

```
alancong@AlanCongdeMacBook-Air chapter_8 % ./a.out
Enter a number: 1234 5678 9 1234 5678 9 0  
Digit:       0 1 2 3 4 5 6 7 8 9 
Occurrences: 0 2 2 2 2 2 2 2 2 2 
```

4. 修改8.1节的程序 `reverse.c`，利用表达式 `(int)(sizeof(a) / sizeof(a[0]))`（或者具有相同值的宏）来计算数组的长度。

```C
#include <stdio.h>

#define N 10

int main(void)
{
    int a[N], i;

    printf("Enter %d numbers: ", N);
    for (i = 0; i < (int)(sizeof(a) / sizeof(a[0])); i++)
        scanf("%d", &a[i]);

    printf("In reverse order:");
    for (i = (int)(sizeof(a) / sizeof(a[0])) - 1; i >= 0; i--)
        printf(" %d", a[i]);
    printf("\n");

    return 0;
}
```

```
alancong@AlanCongdeMacBook-Air chapter_8 % ./a.out 
Enter 10 numbers: 1 9 8 7 6 5 4 3 2 0
In reverse order: 0 2 3 4 5 6 7 8 9 1
```

5. 修改8.1节的程序 `interest.c`，使得修改后的程序可以每月整合一次利息，而不是每年整合一次利息。不要改变程序的输出格式，余额仍按每年一次的时间间隔显示。

```C
#include <stdio.h>

#define NUM_RATES ((int)(sizeof(value) / sizeof(value[0])))
#define INITIAL_BALANCE 100.00

int main(void)
{
    int i, low_rate, num_years, year;
    double value[5];

    printf("Enter interest rate: ");
    scanf("%d", &low_rate);
    printf("Enter number of years: ");
    scanf("%d", &num_years);

    printf("\nYears");
    for (i = 0; i < NUM_RATES; i++)
    {
        printf("%6d%%", low_rate + i);
        value[i] = INITIAL_BALANCE;
    }
    printf("\n");

    for (year = 1; year <= num_years; year++)
    {
        printf("%3d    ", year);
        for (i = 0; i < NUM_RATES; i++)
        {
            for (int month = 0; month < 12; month++)
                value[i] += (low_rate + i) / 12.0 / 100.0 * value[i];
            printf("%7.2f", value[i]);
        }
        printf("\n");
    }

    return 0;
}
```

```
alancong@AlanCongdeMacBook-Air chapter_8 % ./a.out      
Enter interest rate: 6
Enter number of years: 5
Years     6%     7%     8%     9%    10%
  1     106.17 107.23 108.30 109.38 110.47
  2     112.72 114.98 117.29 119.64 122.04
  3     119.67 123.29 127.02 130.86 134.82
  4     127.05 132.21 137.57 143.14 148.94
  5     134.89 141.76 148.98 156.57 164.53
```

6. 有一个名叫 B1FF 的人，是典型的网络新手，他有一种独特的编写消息的方式。下面是一条常见的 B1FF公告：

```
H3Y DUD3, C 15 R1LLY C00L!!!!!!!!!!
```

编写一个“B1FF过滤器”，它可以读取用户输入的消息并把此消息翻译成B1FF的表达风格：

```
Enter message: Hey dude, C is rilly cool
In B1FF-speak: H3Y DUD3, C 15 R1LLY C00L!!!!!!!!!!
```

程序需要把消息转换成大写字母，用数字代替特定的字母（A→4、B→8、E→3、I→1、O→0、S→5），然后添加10个左右的感叹号。

```c
#include<stdio.h>
#include<ctype.h>

int main(void)
{
    char message[999], ch;
    int i = 0;

    printf("Enter message: ");
    while((ch = getchar()) != '\n')
    {
        ch = toupper(ch);

        // （A→4、B→8、E→3、I→1、O→0、S→5）
        if(ch == 'A')
            ch = '4';
        else if(ch == 'B')
            ch = '8';
        else if(ch == 'E')
            ch = '3';
        else if(ch == 'I')
            ch = '1';
        else if(ch == 'O')
            ch = '0';
        else if(ch == 'S')
            ch = '5';
        message[i++] = ch;
    }

    printf("In B1FF-speak: ");
    for(int j = 0;j <= i;j ++)
        putchar(message[j]);
    printf("!!!!!!!!!!\n");

    return 0;
}
```

```
alancong@AlanCongdeMacBook-Air chapter_8 % ./a.out 
Enter message: Hey dude, C is rilly cool
In B1FF-speak: H3Y DUD3, C 15 R1LLY C00L!!!!!!!!!!
```

7. 编写程序读取一个5×5的整数数组，然后显示出每行的和与每列的和：

```
Enter row 1:  8 3 9 0 10
Enter row 2:  3 5 17 1 1
Enter row 3:  2 8 6 23 1
Enter row 4:  15 7 3 2 9
Enter row 5:  6 14 2 6 0
Row totals:  30 27 40 36 28
Column totals:  34 37 37 32 21
```

```C
#include<stdio.h>
int main(void)
{
    int number[6][6] = {0};
    for(int i = 0;i < 5;i ++)
    {
        printf("Enter row %d:  ", i + 1);
        for(int j = 0;j < 5;j ++)
        {
            scanf("%d", &number[i][j]);
            number[i][5] += number[i][j];
            number[5][j] += number[i][j];
            number[5][5] += number[i][j];
        }
    }

    printf("Row totals:  ");
    for(int i = 0;i < 5;i ++)
        printf("%d ", number[i][5]);
    printf("\n");

    printf("Column totals:  ");
    for(int i = 0;i < 5;i ++)
        printf("%d ", number[5][i]);
    printf("\n");

    printf("Totals:  %d\n", number[5][5]);
        
    return 0;
}
```

```
alancong@AlanCongdeMacBook-Air chapter_8 % ./a.out 
Enter row 1:  8 3 9 0 10
Enter row 2:  3 5 17 1 1
Enter row 3:  2 8 6 23 1
Enter row 4:  15 7 3 2 9
Enter row 5:  6 14 2 6 0
Row totals:  30 27 40 36 28 
Column totals:  34 37 37 32 21 
Totals:  161
```

8. 修改编程题7，使其提示用户输入每个学生5门测验的成绩，一共有5个学生。然后计算每个学生的总分和平均分，以及每门测验的平均分、高分和低分。

```C
#include <stdio.h>
#include <stdlib.h>
#include <time.h>
int main(void)
{
    double student[5][7] = {0}, course[5][4] = {0}, max, min;
    srand(time(NULL));
    for (int i = 0; i < 5; i++)
    {
        printf("Student %d ", i + 1);
        for (int j = 0; j < 5; j++)
        {
            student[i][j] = rand() % 100;
            printf("%2.lf   ", student[i][j]);
            student[i][5] += student[i][j];
            course[j][0] += student[i][j];
        }
        
        printf("Sum: %2.f ", student[i][5]);
        printf("Ave: %2.f\n", student[i][6] = student[i][5] / 5.0);
        
    }

    printf("CourseSum ");
    for(int i = 0;i < 5;i ++)
    {
        printf("%3.f  ", course[i][0]);
    }
    printf("\n");

    printf("CourseAve ");
    for(int i = 0;i < 5;i ++)
    {
        printf("%2.f  ", course[i][0] / 5);
    }
    printf("\n");

    printf("CourseMax ");
    for(int i = 0;i < 5;i ++)
    {
        max = student[0][i];
        for(int j = 1;j < 5;j ++)
        {
            if(max < student[j][i])
                max = student[j][i];
        }
        printf("%2.f  ", max);
    }
    printf("\n");

    printf("CourseMin ");
    for(int i = 0;i < 5;i ++)
    {
        min = student[0][i];
        for(int j = 1;j < 5;j ++)
        {
            if(min > student[j][i])
                min = student[j][i];
        }
        printf("%2.f  ", min);
    }
    printf("\n");

    return 0;
}
```

```
alancong@AlanCongdeMacBook-Air chapter_8 % ./a.out 
Student 1 20   20   96   20   38   Sum: 194 Ave: 39
Student 2 71   17   72    1   95   Sum: 256 Ave: 51
Student 3 25   65   61   55   18   Sum: 224 Ave: 45
Student 4  3   30   75   23   73   Sum: 204 Ave: 41
Student 5 37   67   69   26   57   Sum: 256 Ave: 51
CourseSum 156  199  373  125  281  
CourseAve 31  40  75  25  56  
CourseMax 71  67  96  55  95  
CourseMin  3  17  61   1  18  
```

9. 编写程序，生成一种贯穿10×10字符数组（初始时全为字符 '.'）的“随机步法”。程序必须随机地从一个元素“走到”另一个元素，每次都向上、向下、向左或向右移动一个元素位置。已访问过的元素按访问顺序用字母A~Z进行标记。下面是一个输出示例：

<img src="/Users/alancong/Documents/GitHub/C-Linux/Embedded-C-notes/C_Programming_A_Modern_Approach/assets/image-20251108113550926.png" alt="image-20251108113550926" style="zoom:50%;" />

提示：利用 srand 函数和 rand 函数（见程序 deal.c）产生随机数，然后查看此数除以 4 的余数。余数一共有 4 种可能的值（0、1、2 和 3），指示下一次移动的 4 种可能方向。在执行移动操作之前，需要检查两个条件：一是不能走到数组外面，二是不能走到已有字母标记的位置。只要有一个条件不满足，就得尝试换一个方向移动。如果 4 个方向都堵住了，程序就必须终止了。下面是提前结束的一个示例：

<img src="/Users/alancong/Documents/GitHub/C-Linux/Embedded-C-notes/C_Programming_A_Modern_Approach/assets/image-20251108113618635.png" alt="image-20251108113618635" style="zoom:50%;" />

```C
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

int main(void)
{
    int row = 0, col = 0, direction_num = 0, dir;
    char snake = 'A';
    char board[ROW][COLUMN];
    bool direction[4] = {false};

    // initiate char array
    for (int i = 0; i < 10; i++)
        for (int j = 0; j < 10; j++)
            board[i][j] = '.';

    board[row][col] = snake;
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
        if (((row - 1) >= 0) && (board[row - 1][col] == '.'))
        {
            direction[UP] = true;
            direction_num++;
        }
        // check DOWN
        if (((row + 1) < 10) && (board[row + 1][col] == '.'))
        {
            direction[DOWN] = true;
            direction_num++;
        }
        // check LEFT
        if (((col - 1) >= 0) && (board[row][col - 1] == '.'))
        {
            direction[LEFT] = true;
            direction_num++;
        }
        // check RIGHT
        if (((col + 1) < 10) && (board[row][col + 1] == '.'))
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

            board[row][col] = ++snake;

            // reset the director of the direction 
            for(int i = 0;i < 4;i ++)
                direction[i] = false;
        }
        else
            break;
    }

    for (int i = 0; i < 10; i++)
    {
        for (int j = 0; j < 10; j++)
            printf("%c ", board[i][j]);
        printf("\n");
    }

    return 0;
}
```

```
alancong@AlanCongdeMacBook-Air chapter_8 % ./a.out      
A B G H . . . . . . 
. C F I . . . . . . 
. D E J . . . . . . 
N M L K . . . . . . 
O R S T . . . . . . 
P Q V U Z . . . . . 
. . W X Y . . . . . 
. . . . . . . . . . 
. . . . . . . . . . 
. . . . . . . . . . 
```

10. 修改第5章的编程题8，用一个数组存储航班起飞时间，另一个数组存储航班抵达时间。（时间用整数表示，表示从午夜开始的分钟数。）程序用一个循环搜索起飞时间数组，以找到与用户输入的时间最接近的起飞时间。

```C
// 第一次书写的程序有数组越界的问题，当i = 7的时候，i + 1会放回数组后面的元素，其结果是未定义的。
#include <stdio.h>
int main(void)
{
    int hour, min, cmp;
    int flight_start[8] = {0}, flight_arrive[8] = {0};
    printf("Enter a 24-hour time: ");
    scanf("%d : %d", &hour, &min);

    flight_start[0] = 8 * 60;
    flight_start[1] = 9 * 60 + 43;
    flight_start[2] = 11 * 60 + 19;
    flight_start[3] = 12 * 60 + 47;
    flight_start[4] = 14 * 60;
    flight_start[5] = 15 * 60 + 45;
    flight_start[6] = 19 * 60;
    flight_start[7] = 21 * 60 + 45;

    flight_arrive[0] = 10 * 60 + 16;
    flight_arrive[1] = 11 * 60 + 52;
    flight_arrive[2] = 13 * 60 + 31;
    flight_arrive[3] = 15 * 60;
    flight_arrive[4] = 16 * 60 + 8;
    flight_arrive[5] = 17 * 60 + 55;
    flight_arrive[6] = 21 * 60 + 20;
    flight_arrive[7] = 23 * 60 + 58;

    cmp = hour * 60 + min;
    for (int i = 0; i < 8; i++)
    {
        if (cmp < (flight_start[i] + flight_start[i + 1]) / 2)
        {
            printf("Closest departure time is %d:%02d",flight_start[i] / 60, flight_start[i] % 60);
            printf("a.m., arriving at %d:%02d a.m.\n", flight_arrive[i] / 60, flight_arrive[i] % 60);
            return 0;
        }
    }

    return 0;
}
```

```C
// 解决的方式就是在循环中比较输入时间和各个节点的绝对值的大小
// 再循环中当前计算出的差值小于上一次的差值，那么这个新计算的差值就作为新的差值，对应的时间也就作为最近航班
// 可以优化的点就是提前跳出循环，当上次计算的差值比当前循环中计算出来的小，就直接跳出循环即可
#include <stdio.h>
#include <stdlib.h>
int main(void)
{
    int hour, min, cmp, diff, index_flight = 0;
    int flight_start[8] = {0}, flight_arrive[8] = {0};
    printf("Enter a 24-hour time: ");
    scanf("%d : %d", &hour, &min);

    flight_start[0] = 8 * 60;
    flight_start[1] = 9 * 60 + 43;
    flight_start[2] = 11 * 60 + 19;
    flight_start[3] = 12 * 60 + 47;
    flight_start[4] = 14 * 60;
    flight_start[5] = 15 * 60 + 45;
    flight_start[6] = 19 * 60;
    flight_start[7] = 21 * 60 + 45;

    flight_arrive[0] = 10 * 60 + 16;
    flight_arrive[1] = 11 * 60 + 52;
    flight_arrive[2] = 13 * 60 + 31;
    flight_arrive[3] = 15 * 60;
    flight_arrive[4] = 16 * 60 + 8;
    flight_arrive[5] = 17 * 60 + 55;
    flight_arrive[6] = 21 * 60 + 20;
    flight_arrive[7] = 23 * 60 + 58;

    cmp = hour * 60 + min;
    diff = abs(cmp - flight_start[0]);
    for (int i = 1; i < 8; i++)
    {
        if (diff > abs(cmp - flight_start[i]))
        {
            diff = abs(cmp - flight_start[i]);
            index_flight = i;
        }
    }

    printf("Closest departure time is %d:%02d",flight_start[index_flight] / 60, flight_start[index_flight] % 60);
    printf("a.m., arriving at %d:%02d a.m.\n", flight_arrive[index_flight] / 60, flight_arrive[index_flight] % 60);

    return 0;
}
```

```
alancong@AlanCongdeMacBook-Air chapter_8 % ./a.out 
Enter a 24-hour time: 9:00
Closest departure time is 9:43a.m., arriving at 11:52 a.m.
alancong@AlanCongdeMacBook-Air chapter_8 % ./a.out       
Enter a 24-hour time: 21:00
Closest departure time is 21:45a.m., arriving at 23:58 a.m.
```

11. 修改第7章的编程题4，给输出加上标签：

```
Enter phone number: 1-800-COL-LECT
In numeric form: 1-800-265-5328
```

在显示电话号码之前，程序需要将其（以原始格式或数值格式）存储在一个字符数组中。可以假定电话号码的长度不超过15个字符。

```C
#include <stdio.h>
int main(void)
{
    int i = 0;
    char number[11], ch;
    printf("Enter phone number: ");
    while ((ch = getchar()) != '\n')
    {
        if (ch != '-')
        {
            // 直接根据字符区间来给数字赋值
            if ('A' <= ch && ch <= 'C')
                ch = '2';
            else if ('D' <= ch && ch <= 'F')
                ch = '3';
            else if ('G' <= ch && ch <= 'I')
                ch = '4';
            else if ('J' <= ch && ch <= 'L')
                ch = '5';
            else if ('M' <= ch && ch <= 'O')
                ch = '6';
            else if ('P' <= ch && ch <= 'S')
                ch = '7';
            else if ('T' <= ch && ch <= 'V')
                ch = '8';
            else if ('W' <= ch && ch <= 'Z')
                ch = '9';
            number[i++] = ch;
        }
    }

    for(int i = 0;i < 11;i ++)
    {
        printf("%c", number[i]);
        if(i == 0 || i == 3 || i == 6)
            printf("-");
    }
    printf("\n");
    
    return 0;
}
```

```
alancong@AlanCongdeMacBook-Air chapter_8 % ./a.out 
Enter phone number: 1-800-COL-LECT
1-800-265-5328
```

12. 修改第7章的编程题5，用数组存储字母的面值。数组有26个元素，对应字母表中的26个字母。例如，数组元素0存储1（因为字母A的面值为1），数组元素1存储3（因为字母B的面值为3），等等。每读取输入单词中的一个字母，程序都会利用该数组确定字符的拼字值。使用数组初始化器来建立该数组。

```C
#include <stdio.h>
#include <ctype.h>
int main(void)
{
    int sum = 0;
    int letter_values[26] = {
        1,  // A
        3,  // B
        3,  // C
        2,  // D
        1,  // E
        4,  // F
        2,  // G
        4,  // H
        1,  // I
        8,  // J
        5,  // K
        1,  // L
        3,  // M
        1,  // N
        1,  // O
        3,  // P
        10, // Q
        1,  // R
        1,  // S
        1,  // T
        1,  // U
        4,  // V
        4,  // W
        8,  // X
        4,  // Y
        10  // Z
    };
    char ch;
    printf("Enter a word: ");
    while ((ch = getchar()) != '\n')
    {
        ch = toupper(ch);
        sum += letter_values[ch - 'A'];
    }

    printf("Scrabble value: %d\n", sum);
    return 0;
}
```

```
alancong@AlanCongdeMacBook-Air chapter_8 % ./a.out 
Enter a word: pitfall
Scrabble value: 12
```

13. 修改第7章的编程题11，给输出加上标签：

```
Enter a first and last name: Lloyd Fosdick
You entered the name: Fosdick, L.
```

在显示姓（不是名）之前，程序需要将其存储在一个字符数组中。可以假定姓的长度不超过20个字符。

```C
#include <stdio.h>
#include <ctype.h>

#define MAX_NAME_LENGTH 20

int main(void)
{
    int i = 0, j = 0;
    char name[MAX_NAME_LENGTH], surname[MAX_NAME_LENGTH], ch;
    printf("Enter a first and last name: ");

    while((ch = getchar()) == ' ' || ch == '\t');
    while((ch = getchar()) != ' ')
    {
        name[i ++] = ch;
    }

    while ((ch = getchar()) != '\n')
    {
        if ('A' <= toupper(ch) && toupper(ch) <= 'Z')
        {
            surname[j ++] = ch;
        }
    }

    for(int i = 0;i < j;i ++)
    {
        printf("%c", surname[i]);
    }   
    printf(", %c.\n", toupper(name[0]));

    return 0;
}
```

```
alancong@AlanCongdeMacBook-Air chapter_8 % ./a.out 
Lloyd FosdickEnter a first and last name: 
Fosdick, L.
```

14. 编写程序颠倒句子中单词的顺序：

```
Enter a sentence: you can cage a swallow can't you?
Reversal of sentence: you can't swallow a cage can you?
```

提示：用循环逐个读取字符，然后将它们存储在一个一维字符数组中。当遇到句号、问号或者感叹号（称为“终止字符”）时，终止循环并把终止字符存储在一个 char 类型变量中。然后再用一个循环反向搜索数组，找到最后一个单词的起始位置。显示最后一个单词，然后反向搜索倒数第二个单词。重复这一过程，直至到达数组的起始位置。最后显示出终止字符。

```c
#include <stdio.h>
int main(void)
{
    char sentence[100], ch, end_flag;
    int index[10], word = 0, length = 0, word_number;
    printf("Enter a sentence: ");

    // There are two symbols to mark the end of a word: '.' and ' '.
    while ((ch = getchar()) != '\n')
    {
        if (ch == '.' || ch == '?' || ch == '!')
        {
            end_flag = ch;
            index[word++] = length;
            break;
        }
        else
        {
            if (ch == ' ')
            {
                index[word++] = length;
            }
            sentence[length++] = ch;
        }
    }

#if 0
    printf("The number of words is: %d\n", word);
    printf("The length of the sentence is: %d\n", length);
    for(int i = 0; i < word; i++)
        printf("%d ", index[i]);
    printf("\n");

    for(int j = 0; j <= length; j++)
        printf("%c", sentence[j]);
    printf("\n");
#endif

    // you can cage a swallow can't you? (A well-known phrase used humorously)
    // The count of the words begins with 1.
    // Printing starts from the last word.
    word_number = word;
    for (int i = 0; i < word; i++)
    {
        // Set the start and the end of the word for each printed word
        int start, end;
        if ((word_number - 2) < 0)
        {
            start = 0;
            end = index[word_number - 1];
        }
        else
        {
            start = index[word_number - 2] + 1;
            end = index[word_number - 1];
        }

        // Print from the last word
        for (int j = start; j < end; j++)
        {
            printf("%c", sentence[j]);
        }
        word_number--;

        // When all the words are printed out, the value of word_number would be negative
        if(word_number > 0)
            printf(" ");
    }
    printf("%c\n", end_flag);

    return 0;
}
```

```
alancong@AlanCongdeMacBook-Air chapter_8 % ./a.out 
Enter a sentence: you can cage a swallow can't you?
you can't swallow a cage can you?
```

15. 目前已知的最古老的一种加密技术是恺撒加密（得名于 Julius Caesar）。该方法把一条消息中的每个字母用字母表中固定距离之后的那个字母来替代。（如果越过了字母 Z，则会绕回到字母表的起始位置。例如，如果每个字母都用字母表中两个位置之后的字母代替，那么Y就被替换为A，Z就被替换为 B。）编写程序用恺撒加密方法对消息进行加密。用户输入待加密的消息和移位计数（字母移动的位置数目）

    ```
    Enter message to be encrypted: Go ahead, make my day.
    Enter shift amount (1-25): 3
    Encrypted message: Jr dkhdg, pdnh pb gdb.
    ```

    注意，当用户输入 26 与移位计数的差值时，程序可以对消息进行解密：

    ```
    Enter message to be encrypted: Jr dkhdg, pdnh pb gdb.
    Enter shift amount (1-25): 23
    Encrypted message: Go ahead, make my day.
    ```

    可以假定消息的长度不超过 80 个字符。不是字母的那些字符不要改动。此外，加密时不要改变字母的大小写。提示：为了解决前面提到的绕回问题，可以用表达式((ch - 'A') + n) % 26 + 'A'计算大写字母的密码，其中 ch 存储字母，n 存储移位计数。（小写字母也需要一个类似的表达式。）

    ```C
    #include <stdio.h>
    #include <ctype.h>
    
    
    int main(void)
    {
        int length = 0, code;
        char ch, message[80];
    
        printf("Enter message to be encrypted: ");
        while ((ch = getchar()) != '\n')
        {
            message[length ++] = ch;
        }
    
        printf("Enter shift amount (1-25): ");
        scanf("%d", &code);
    
        printf("Encrypted message: ");
        for(int i = 0;i < length;i ++)
        {
            if('A' <= message[i] && message[i] <= 'Z')
                message[i] = ((message[i] - 'A') + code) % 26 + 'A';
            else if('a' <= message[i] && message[i] <= 'z')
                message[i] = ((message[i] - 'a') + code) % 26 + 'a';
            printf("%c", message[i]);
        }
        printf("\n");
    
        return 0;
    }
    ```

    ```
    alancong@AlanCongdeMacBook-Air chapter_8 % ./a.out 
    Enter message to be encrypted: Go ahead, make my day.
    Enter shift amount (1-25): 3
    Encrypted message: Jr dkhdg, pdnh pb gdb.
    alancong@AlanCongdeMacBook-Air chapter_8 % ./a.out              
    Enter message to be encrypted: Jr dkhdg, pdnh pb gdb
    Enter shift amount (1-25): 23
    Encrypted message: Go ahead, make my day
    ```

    

16. 编程测试两个单词是否为变位词（相同字母的重新排列）：

    ```
    Enter first word: smartest
    Enter second word: mattress
    The words are anagrams.
    ```

    ```
    Enter first word: dumbest
    Enter second word: stumble
    The words are not anagrams.
    ```

    用一个循环逐个字符地读取第一个单词，用一个 26 元的整数数组记录每个字母的出现次数。（例如，读取单词 smartest 之后，数组包含的值为 $10001000000010000122000000$，表明 smartest 包含一个 a、一个 e、一个 m、一个 r、两个 s 和两个 t。）用另一个循环读取第二个单词，这次每读取一个字母就把相应数组元素的值减 1。两个循环都应该忽略不是字母的那些字符，并且不区分大小写。第二个单词读取完毕后，再用一个循环来检查数组元素是否为全 0。如果是全 0，那么这两个单词就是变位词。提示：可以使用<ctype.h>中的函数，如 isalpha 和 tolower。

    ```C
    #include<stdio.h>
    #include<ctype.h>
    int main(void)
    {
        int count[26] = {0}, sum = 0;
        char ch;
    
        printf("Enter first word: ");
        while((ch = getchar()) != '\n')
        {
            count[tolower(ch) - 'a'] ++;
        }
    
        printf("Enter second word: ");
        while((ch = getchar()) != '\n')
        {
            count[tolower(ch) - 'a'] --;
        }
    
        for(int i = 0;i < 26;i ++)
            sum += count[i];
        if(sum == 0)
            printf("The words are anagrams.\n");
        else 
            printf("The words are not anagrams.\n");
    
        return 0;
    }
    ```

    ```
    alancong@AlanCongdeMacBook-Air chapter_8 % ./a.out 
    Enter first word: smartlight
    Enter second word: lightsmart
    The words are anagrams.
    ```

    

17. 编写程序打印 n×n 的幻方（$1, 2, …, n^2$的方阵排列，且每行、每列和每条对角线上的和都相等）。由用户指定 $n$ 的值：

    ```
    This program creates a magic square of a specified size. 
    The size must be an odd number between 1 and 99.
    Enter size of magic square: 5
    17  24   1   8  15
    23   5   7  14  16
     4   6  13  20  22
    10  12  19  21   3
    11  18  25   2   9
    ```

    把幻方存储在一个二维数组中。起始时把数 1 放在第 0 行的中间，剩下的数 $2, 3, …, n^2$依次向上移动一行并向右移动一列。当可能越过数组边界时需要“绕回”到数组的另一端。例如，如果需要把下一个数放到第$-1$ 行，我们就将其存储到第 $n-1$ 行（最后一行）；如果需要把下一个数放到第 $n$ 列，我们就将其存储到第 0 列。如果某个特定的数组元素已被占用，那就把该数存储在前一个数的正下方。如果你的编译器支持变长数组，则声明数组有 *n* 行 $n$ 列，否则声明数组有 99 行 99 列。

    ```C
    #include <stdio.h>
    int main(void)
    {
        int dimension, next_x, next_y, before_x, before_y, count = 0;
        printf("This program creates a magic square of a specified size.\n");
        printf("The size must be an odd number between 1 and 99.\n");
        printf("Enter size of magic square: ");
    
        scanf("%d", &dimension);
        if (dimension % 2 == 0)
        {
            printf("Negative input!");
            return 0;
        }
    
        int square[dimension][dimension];
        for (int i = 0; i < dimension; i++)
        {
            for (int j = 0; j < dimension; j++)
                square[i][j] = 0;
        }
    
        for (int i = 0; i < dimension * dimension; i++)
        {
            if (i == 0)
            {
                next_x = ((dimension + 1) / 2) - 1;
                next_y = 0;
                square[next_y][next_x] = ++count;
            }
            else
            {
                if (next_x + 1 >= dimension)
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
                    next_y = dimension - 1;
                }
                else
                {
                    before_y = next_y;
                    next_y -= 1;
                }
                    
                // check if there is already has a number
                if (square[next_y][next_x] == 0)
                    square[next_y][next_x] = ++count;
                else
                {
                    next_x = before_x;
                    next_y = before_y + 1;
                    square[next_y][next_x] = ++count;
                }
            }
        }
    
        for (int i = 0; i < dimension; i++)
        {
            for (int j = 0; j < dimension; j++)
                printf("%2d ", square[i][j]);
            printf("\n");
        }
    
        return 0;
    }
    ```

    ```
    alancong@AlanCongdeMacBook-Air chapter_8 % ./a.out
    This program creates a magic square of a specified size.
    The size must be an odd number between 1 and 99.
    Enter size of magic square: 5
    17 24  1  8 15 
    23  5  7 14 16 
     4  6 13 20 22 
    10 12 19 21  3 
    11 18 25  2  9 
    alancong@AlanCongdeMacBook-Air chapter_8 % ./a.out
    This program creates a magic square of a specified size.
    The size must be an odd number between 1 and 99.
    Enter size of magic square: 9
    47 58 69 80  1 12 23 34 45 
    57 68 79  9 11 22 33 44 46 
    67 78  8 10 21 32 43 54 56 
    77  7 18 20 31 42 53 55 66 
     6 17 19 30 41 52 63 65 76 
    16 27 29 40 51 62 64 75  5 
    26 28 39 50 61 72 74  4 15 
    36 38 49 60 71 73  3 14 25 
    37 48 59 70 81  2 13 24 35 
    ```

    
