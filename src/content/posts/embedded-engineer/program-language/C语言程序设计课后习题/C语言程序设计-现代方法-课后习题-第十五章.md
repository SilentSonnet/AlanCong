---
title: 《C语言程序设计-现代方法》-课后习题-第十五章
published: 2026-03-09
description: ''
image: ''
tags: []
category: '程序设计'
draft: false 
lang: ''
---

## 第十五章 编写大型程序

### 练习题

15.1节  

1. 15.1节列出了把程序分割成多个源程序的几个优点。  

   ```
   (a) 请描述几个其他的优点。   
   (b) 请描述一些缺点。  
   ```

   ```
   (a) 请描述几个其他的优点。 
   1. 更快的编译速度
   修改单个源文件只会导致该文件重新编译，而不是整个程序。这在大型项目中尤为重要，可以显著减少编译时间。
   
   2. 支持代码重用
   将通用功能（如工具函数、数据结构）放入独立源文件中后，可以在多个项目中重用，避免复制粘贴。
   
   3. 促进模块化设计
   拆分源文件鼓励开发者将功能划分成逻辑独立的模块，从而提高程序结构的清晰度，也便于后期扩展。
   
   4. 便于单元测试
   将逻辑函数隔离在不同文件中后，可以更容易地针对某一模块单独编写测试程序。
   
   5. 减少命名冲突
   不同源文件可以有自己的局部静态函数和变量，降低命名冲突的风险。
   ```

   ```
   (b) 请描述一些缺点。  
   1. 增加管理复杂度
   需要手动维护多个文件，增加组织和导航的难度，尤其是在没有良好文档或工具支持时。
   
   2. 链接错误更常见
   如果声明和定义不一致，容易出现链接错误（比如函数在头文件中声明但没有定义或命名拼写错误）。
   
   3. 过度拆分影响理解
   如果拆分得过细，开发者理解程序整体逻辑时可能会频繁跳转文件，增加阅读负担。
   
   4. 文件依赖问题
   错误地使用全局变量、宏定义或头文件可能导致重复定义或隐藏的依赖关系，造成维护困难。
   
   5. 初学者不易掌握
   对刚学 C 的人来说，多个文件和头文件的引入可能造成理解障碍。
   ```

   

15.2节   

2. 下面哪个不应该放置在头文件中？为什么？   

   ```
   (a) 函数原型。   
   (b) 函数定义。  
   (c) 宏定义。   
   (d) 类型定义。  
   ```

   **ANS：**

   ```
   (b). Function definitions should not be put in a header file. If a function definition appears in a header file that is included by two (or more) source files, the program can't be linked, since the linker will see two copies of the function.
   ```

   

3. 我们已经知道，如果文件是我们自己编写的，那么用#include <文件>代替#include "文件"可能无法工作。如果文件是系统头，那么用#include "文件"代替#include <文件>是否有什么问题？  

   ```
   区别
   #include <file> 只搜索系统头文件路径 通常用于标准库头文件 如 stdio.h math.h 等
   #include "file" 会先搜索当前源文件所在目录 找不到才去系统路径 通常用于用户自定义头文件 如 "my_utils.h"
   
   系统头文件使用 "..." 的潜在问题
   虽然使用双引号包含标准头文件在技术上通常不会报错 但存在以下隐患
   如果当前目录下有个同名文件 会被优先包含 可能造成隐藏 bug
   语义不清 容易误认为是自定义头文件
   构建系统或跨平台差异可能造成不可预测行为
   降低代码可读性 可维护性与可移植性
   ```

   

4. 假设debug.h是具有如下内容的头文件：   

   ```C
   #ifdef DEBUG  
   #define PRINT_DEBUG(n) 
   	printf("Value of " #n ": %d\n", n)  
   #else  
   #define PRINT_DEBUG(n)  
   #endif    
   ```

   假定源文件testdebug.c的内容如下：   

   ```C
   #include <stdio.h> 
   #define DEBUG 
   #include "debug.h" 
   int main(void) 
   { 
    int i = 1, j = 2, k = 3; 
   #ifdef DEBUG 
    printf("Output if DEBUG is defined:\n"); 
   #else 
    printf("Output if DEBUG is not defined:\n"); 
   #endif 
    PRINT_DEBUG(i); 
    PRINT_DEBUG(j); 
    PRINT_DEBUG(k); 
    PRINT_DEBUG(i + j); 
    PRINT_DEBUG(2 * i + j - k); 
    return 0; 
   }
   ```

   (a) 程序执行时的输出是什么？    
   (b) 如果从testdebug.c中删去#define指令，输出又是什么？   
   (c) 解释(a)和(b)中的输出为什么不同。   
   (d) 为了使PRINT_DEBUG能起到预期的效果，把DEBUG宏的定义放在包含debug.h的指令之前是否有必要？验证你的结论。 

   ```
   // a 使用的命令是cc 15_5.c debug.h
   alancong@AlanCongdeMacBook-Air chapter_15 % ./a.out 
   Output if DEBUG is defined:
   Value of i: 1
   Value of j: 2
   Value of k: 3
   Value of i + j: 3
   Value of 2 * i + j - k: 1
   ```

   ```
   // b
   如果在 testdebug.c 中删除了 #define DEBUG，也就是没有定义 DEBUG 宏，那么 debug.h 中的 #ifdef DEBUG 会判断为 false，从而导致 PRINT_DEBUG(n) 变成空宏。
   #ifdef DEBUG 不会定义任何输出，PRINT_DEBUG(n) 宏也会被跳过。因此，程序中的 PRINT_DEBUG(i), PRINT_DEBUG(j), PRINT_DEBUG(k), PRINT_DEBUG(i + j), 和 PRINT_DEBUG(2 * i + j - k) 不会产生任何输出。
   // 具体输出内容
   alancong@AlanCongdeMacBook-Air chapter_15 % ./a.out 
   Output if DEBUG is not defined:
   ```

   ```
   // c
   在 (a) 中，我们定义了 DEBUG 宏，因此 debug.h 中的 PRINT_DEBUG(n) 宏会被展开为 printf("Value of " #n ": %d\n", n)，这会导致输出每个变量的值。在 (b) 中，我们没有定义 DEBUG，因此 debug.h 中的 PRINT_DEBUG(n) 会被忽略（变成空宏），没有任何输出。
   ```

   ```
   // d
   在 C 语言中，宏定义是在预处理阶段进行的。当 #include "debug.h" 被执行时，预处理器会查看之前是否定义了 DEBUG。如果 #define DEBUG 在 #include "debug.h" 之前定义，那么 debug.h 中的 #ifdef DEBUG 条件会成立，PRINT_DEBUG 宏会被展开。如果 #define DEBUG 在 #include "debug.h" 之后定义，那么 debug.h 中的 #ifdef DEBUG 会判断为 false，从而 PRINT_DEBUG 宏将不会被展开。
   ```

   

15.4 节  

5. 假设程序由3个源文件构成，main.c、f1.c和f2.c，此外还包括两个头文件f1.h和f2.h。全部3个源文件都包含f1.h，但是只有f1.c和f2.c包含f2.h。为此程序编写makefile。假设使用GCC，且可执行文 件命名为demo。

   ```makefile
   main: main.o f1.o f2.o
   	cc -o main main.o f1.o f2.o
   main.o: main.c f1.h
   	cc -c main.c
   f1.o: f1.c f1.h f2.h
   	cc -c f1.c
   f2.o: f2.c f2.h
   	cc -c f2.c
   ```

    

6. 下面的问题涉及练习题5描述的程序。  
   (a) 当程序第一次构建时，需要对哪些文件进行编译？  
   (b) 如果在程序构建后对f1.c进行了修改，那么需要对哪个（些）文件进行重新编译？  
   (c) 如果在程序构建后对f1.h进行了修改，那么需要对哪个（些）文件进行重新编译？  
   (d) 如果在程序构建后对f2.h进行了修改，那么需要对哪个（些）文件进行重新编译？ 

   ```
   (a) main.c, f1.c, and f2.c.
   (b) f1.c (assuming that f1.h is not affected by the change).
   (c) main.c, f1.c, and f2.c, since all three include f1.h.
   (d) f1.c and f2.c, since both include f2.h.
   ```

   

### 编程题

1. 15.3 节的 justify 程序通过在单词间插入额外的空格来调整行。当前编写的函数writen_line 的工作方法是，与开始处的单词间隔相比，靠近行末尾单词的间隔略微宽一些。（例如，靠近末尾的单词彼此之间可能有 3个空格，而靠近开始的单词彼此之间可能只有 2个空格。）请修改函数 write_line 来改进此程序，要求函数能够使较大的间隔交替出现在行的末尾和行的开头。  

   ```C
   void write_line(void) {
   
       int extra_spaces, spaces_to_insert, i, j;
       more_space_toggle = !more_space_toggle;
   
       extra_spaces = MAX_LINE_LEN - line_len;
       for (i = 0; i < line_len; i++) {
           if (line[i] != ' ')
               putchar(line[i]);
           else {
               spaces_to_insert = extra_spaces / (num_words - 1);
               if (more_space_toggle && extra_spaces > 0) {
                   spaces_to_insert++;
                   more_space_toggle = !more_space_toggle;
               }
               for (j = 1; j <= spaces_to_insert + 1; j++)
                   putchar(' ');
               extra_spaces -= spaces_to_insert;
               num_words--;
           }
       }
       putchar('\n');
   }
   ```

   ```C
   // ChatGPT给出来的错误代码，在有些情况下不能很好的控制最后一个空格的输出
   void write_line(void)
   {
       int extra_spaces, spaces_to_insert, i, j;
       int alternator = 1;  // 交替插入空格的标志
   
       extra_spaces = MAX_LINE_LEN - line_len;
       for (i = 0; i < line_len; i++) {
           if (line[i] != ' ') {
               putchar(line[i]);
           } else {
               spaces_to_insert = extra_spaces / (num_words - 1);  // 计算每个间隙基础空格数
   
               // 如果交替标志是1，就插入多一个空格
               for (j = 1; j <= spaces_to_insert + alternator; j++)
                   putchar(' ');
   
               extra_spaces -= spaces_to_insert + alternator;  // 更新剩余的空格
               num_words--;  // 减少待处理的单词数
   
               alternator = -alternator;  // 交替标志切换
           }
       }
       putchar('\n');
   }
   ```

   

2. 修改15.3节的justify程序，在read_word 函数（而不是main函数）中为被截短的单词的结尾存储* 字符。  

   ```C
   void read_word(char *word, int len)
   {
       int ch, pos = 0;
   
       while ((ch = read_char()) == ' ')
           ;
       while (ch != ' ' && ch != EOF)
       {
           if (pos < len)
               word[pos++] = ch;
           ch = read_char();
       }
       word[pos] = '\0';
       if(strlen(word) > MAX_WORD_LEN)
           word[MAX_WORD_LEN] = '*';
   }
   ```

   ```
   alancong@AlanCongdeMacBook-Air code_15_2 % ./justify < quote 
   C is quirky,  flawed,  and  an  enormous  success.  Although
   accidents of history surely helped, it evidently satisfied a
   need for a system implementation language  efficient  enough
   to displace assembly language, yet sufficiently abstract and
   fluent to describe algorithms and  interactions  in  a  wide
   variety of environments. -- Dennis M. Ritchie
   ```

   

3. 修改 9.6节的 qsort.c程序，把 quicksort 函数和 split 函数放在一个单独的文件quicksort.c中。 创建一个名为quicksort.h的头文件来包含这两个函数的原型，并让quicksort.c和quicksort.c都包含这个 头文件。 

   ```c
   // quicksort.c
   #include "quicksort.h"
   
   void quicksort(int a[], int low, int high)
   {
       int middle;
   
       if (low >= high)
           return;
       middle = split(a, low, high);
       quicksort(a, low, middle - 1);
       quicksort(a, middle + 1, high);
   }
   
   int split(int a[], int low, int high)
   {
       int part_element = a[low];
   
       for (;;)
       {
           while (low < high && part_element <= a[high])
               high--;
           if (low >= high)
               break;
           a[low++] = a[high];
   
           while (low < high && a[low] <= part_element)
               low++;
           if (low >= high)
               break;
           a[high--] = a[low];
       }
   
       a[high] = part_element;
       return high;
   }
   
   ```

   ```C
   // quicksort.h
   #ifndef QUICKSORT_H
   #define QUICKSORT_H
   
   #define N 10
   
   void quicksort(int a[], int low, int high);
   int split(int a[], int low, int high);
   
   #endif
   ```

   ```
   alancong@AlanCongdeMacBook-Air code_15_3 % ./qsort < test 
   Enter 10 numbers to be sorted: In sorted order: 1 2 3 4 5 6 7 8 9 10 
   ```

   

4. 修改 13.5 节的 remind.c 程序，把 read_line 函数放在一个单独的文件 readline.c中。创建一个名为 readline.h 的头文件来包含这个函数的原型，并让remind.c和readline.c都包含这个头文件。  

   ```C
   // readline.c
   #include <stdio.h>
   #include "readline.h"
   
   int read_line(char str[], int n)
   {
       int ch, i = 0;
   
       while ((ch = getchar()) != '\n')
           if (i < n)
               str[i++] = ch;
       str[i] = '\0';
       return i;
   }
   ```

   ```C
   // readline.h
   #ifndef READLINE_H
   #define READLINE_H
   
   #define MAX_REMIND 50 /* maximum number of reminders */
   #define MSG_LEN 60    /* max length of reminder message */
   
   int read_line(char str[], int n);
   
   #endif
   ```

   ```
   alancong@AlanCongdeMacBook-Air code_15_4 % ./remind 
   Enter day and reminder: 24 Susan's birthday
   Enter day and reminder: 5 6:00 - Dinner with Marge and Russ
   Enter day and reminder: 26 Movie - "Chinatown"
   Enter day and reminder: 7 10:30 - Dental appointment
   Enter day and reminder: 12 Movie - "Dazed and Confused"
   Enter day and reminder: 5 Saturday class
   Enter day and reminder: 12 Saturday class
   Enter day and reminder: 0
   
   Day Reminder
     5 Saturday class
     5 6:00 - Dinner with Marge and Russ
     7 10:30 - Dental appointment
    12 Saturday class
    12 Movie - "Dazed and Confused"
    24 Susan's birthday
    26 Movie - "Chinatown"
   ```

   

5. 修改第10章的编程题6，使其具有独立的stack.h和stack.c文件，如15.2节所述。

   ```C
   // stack.c
   #include "stack.h"
   
   int contents[STACK_SIZE];
   int top = 0;
   
   void stack_overflow()
   {
       printf("Expression is too complex\n");
       exit(1);
   }
   
   void stack_underflow()
   {
       printf("Not enough operands in expression\n");
       exit(1);
   }
   
   void make_empty(void)
   {
       top = 0;
   }
   
   bool is_empty(void)
   {
       return top == 0;
   }
   
   bool is_full(void)
   {
       return top == STACK_SIZE;
   }
   
   void push(int number)
   {
       if (is_full())
           stack_overflow();
       else
           contents[top++] = number;
   }
   
   int pop(void)
   {
       if (is_empty())
       {
           stack_underflow();
           return '\0';
       }
       else
           return contents[--top];
   }
   ```

   ```C
   // stack.h
   #ifndef STACK_H
   #define STACK_H
   
   #include <stdbool.h>
   #include <stdio.h>
   #include <stdlib.h>
   
   #define STACK_SIZE 100
   
   /* external variables */
   
   extern int contents[];
   extern int top;
   
   void stack_overflow();
   void stack_underflow();
   void make_empty(void);
   bool is_empty(void);
   bool is_full(void);
   void push(int number);
   int pop(void);
   
   #endif
   ```

   ```
   alancong@AlanCongdeMacBook-Air code_15_5 % ./main < test
   Enter an RPN expression: Value of expression: 7
   Enter an RPN expression: Value of expression: -8
   Enter an RPN expression: %  
   ```
