---
title: 《C语言程序设计-现代方法》-课后习题-第十四章
published: 2023-02-13
description: ''
image: ''
tags: []
category: '程序设计'
draft: false 
lang: ''
---

## 第十四章 预处理器

### 练习题

14.3 节  

1. 编写宏来计算下面的值。  

   ```
   (a) x 的立方。  
   (b) n 除以 4的余数。  
   (c) 如果 x与y的乘积小于100则值为1，否则值为0。   
   ```

   你写的宏始终正常工作吗？如果不是，哪些参数会导致失败呢？

   ```C
   #include <stdio.h>
   
   #define CUBE(x) ((x) * (x) * (x))
   #define REMAINDER_FOUR(x) ((x) %= 4)
   #define JUDGE(x, y) (((x) * (y)) < 100 ? 1 : 0)
   
   
   int main(void)
   {
       int x = 2, y = 3;
   
       printf("The square is %d\n", CUBE(x));
       printf("The remainder is %d\n", REMAINDER_FOUR(x));
       
       if(JUDGE(x, y))
           printf("The res is 1\n");
       else
           printf("The res is 0\n");
   
       return 0;
   }
   ```

   **ANS:**

   ```C
   // 宏定义及说明：
   
   // (a) x 的立方
   #define CUBE(x) ((x) * (x) * (x))
   // 示例：CUBE(2 + 1) 展开为 ((2 + 1) * (2 + 1) * (2 + 1))，结果为 27
   // 注意：必须用括号包裹参数和整个宏表达式，以防止运算优先级错误
   
   // (b) n 除以 4 的余数
   #define REMAINDER_FOUR(n) ((n) % 4)
   // 示例：REMAINDER_FOUR(10) -> (10 % 4) -> 2
   // 注意：不要写成 n %= 4，因为这会修改实参变量，副作用明显，不推荐
   
   // (c) 如果 x 与 y 的乘积小于 100，则值为 1，否则值为 0
   #define JUDGE(x, y) (((x) * (y)) < 100 ? 1 : 0)
   // 示例：JUDGE(5, 10) -> ((5 * 10) < 100 ? 1 : 0) -> 1
   // 注意：宏中包含重复求值，应避免使用具有副作用的实参，如 JUDGE(a++, b++)
   ```

2. 编写一个宏`NELEMS(a)`来计算一维数组a中元素的个数。提示：见8.1节中有关sizeof运算符的讨论。  

   ```C
   #include <stdio.h>
   
   #define SIZE 10
   #define COUNT(x) (sizeof(x) / sizeof(x[0]))
   
   int number[SIZE] = {0};
   
   int main(void)
   {
       printf("%lu\n", COUNT(number));
       return 0;
   }
   ```

   ```
   alancong@AlanCongdeMacBook-Air chapter_14 % ./a.out 
   The number of the array is : 10
   ```

3. 假定DOUBLE 是如下宏：  

   ```
   #define DOUBLE(x) 2*x  
   (a) DOUBLE(1+2)的值是多少？  
   (b) 4/DOUBLE(2)的值是多少？  
   (c) 改正 DOUBLE 的定义。 
   ```

   ```C
   #include<stdio.h>
   
   #define DOUBLE(x) 2*x  
   
   int main(void)
   {
       printf("The result of DOUBLE(1+2) is : %d\n", DOUBLE(1 + 2));
       printf("The result of 4/DOUBLE(2) is : %d\n", 4/DOUBLE(2));
   #undef DOUBLE
   #define DOUBLE(x) (2 * (x)) 
       printf("The result of DOUBLE(1+2) is : %d\n", DOUBLE(1 + 2));
       printf("The result of 4/DOUBLE(2) is : %d\n", 4/DOUBLE(2));
   
       return 0;
   }
   ```

   ```
   alancong@AlanCongdeMacBook-Air chapter_14 % ./a.out 
   The result of DOUBLE(1+2) is : 4
   The result of 4/DOUBLE(2) is : 4
   The result of DOUBLE(1+2) is : 6
   The result of 4/DOUBLE(2) is : 1
   ```

4. 针对下面每一个宏，举例说明宏的问题，并提出修改方法。  

   ```
   (a) #define AVG(x,y)  (x+y)/2  
   (b) #define AREA(x,y) (x)*(y) 
   ```

   **ANS:**

   ```C
   (a) One problem stems from the lack of parentheses around the replacement list. For example, the statement
   
   a = 1/AVG(b, c);
   will be replaced by
   
   a = 1/(b+c)/2;
   Even if we add the missing parentheses, though, the macro still has problems, because it needs parentheses around x and y in the replacement list. The preprocessor will turn the statement
   
   a = AVG(b<c, c>d);
   into
   
   a = ((b<c+c>d)/2);
   which is equivalent to
   
   a = ((b<(c+c)>d)/2);
   Here's the final (corrected) version of the macro:
   
   #define AVG(x,y) (((x)+(y))/2)
   (b) The problem is the lack of parentheses around the replacement list. For example,
   
   a = 1/AREA(b, c);
   becomes
   
   a = 1/(b)*(c);
   Here's the corrected macro:
   
   #define AREA(x,y) ((x)*(y))
   ```

    

5. *假定 TOUPPER 定义成下面的宏：  
   `#define TOUPPER(c) ('a'<=(c)&&(c)<='z'?(c)-'a'+'A':(c))`  
   假设s是一个字符串，i是一个int类型变量。给出下面每个代码段产生的输出。  

   ```C
   (a) strcpy(s, "abcd");    
   		i = 0;     
       putchar(TOUPPER(s[++i]));  
   (b) strcpy(s, "0123");    
   		i = 0;    
   		putchar(TOUPPER(s[++i]));  
   ```

   ```
   (a) The call of putchar expands into the following statement:
   
   
   putchar(('a'<=(s[++i])&&(s[++i])<='z'?(s[++i])-'a'+'A':(s[++i])));
   The character a is less than or equal to s[1] (which is b), yielding a true condition. The character s[2] (which is c) is less than or equal to z, which is also true. The value printed is s[3]-'a'+'A', which is D (assuming that the character set is ASCII).
   
   (b) The character a is not less than or equal to s[1] (which is 1) so the test condition is false. The value printed is s[2], which is 2.
   ```

   ```C
   #include <stdio.h>
   #include <string.h>
   
   #define SIZE 100
   #define TOUPPER(c) ('a' <= (c) && (c) <= 'z' ? (c) - 'a' + 'A' : (c))
   
   int main(void)
   {
       char s[SIZE];
       int i;
   
       strcpy(s, "abcd");
       i = 0;
       putchar(TOUPPER(s[++i]));
   
       strcpy(s, "0123");
       i = 0;
       putchar(TOUPPER(s[++i]));
   
       return 0;
   }
   ```

   **OUTS:**

   ```
   alancong@AlanCongdeMacBook-Air chapter_14 % ./a.out 
   D2% 
   ```

   

6. (a) 编写宏 DISP(f,x)，使其扩展为printf 函数的调用，显示函数f在参数为x时的值。
   例如：`DISP(sqrt, 3.0);` 
   应该扩展为  `printf("sqrt(%g) = %g\n", 3.0, sqrt(3.0));`  
   (b) 编写宏`DISP2(f,x,y)`，类似DISP 但应用于有两个参数的函数。  

   ```C
   // a
   #include<stdio.h>
   #include<math.h>
   
   #define DISP(f, x) printf("%s" "(%g) = %g\n", #f, x, f(x))
   
   int main(void)
   {
       DISP(sqrt, 3.0);
       return 0;
   }
   ```

   **OUTS**

   ```
   alancong@AlanCongdeMacBook-Air chapter_14 % ./a.out 
   fabs(3) = 3
   ```

   

   ```C
   // b
   #include<stdio.h>
   #include<math.h>
   
   #define DISP(f, x) printf("%s" "(%g) = %g\n", #f, x, f(x))
   #define DISP2(f, x, y) printf("%s" "(%g, %g) = %g\n", #f, x, y, f(x, y))
   
   int main(void)
   {
       DISP(sqrt, 3.0);
       DISP2(pow, 2.0, 2.0);
       return 0;
   }
   ```

   **OUTS**

   ```
   alancong@AlanCongdeMacBook-Air chapter_14 % ./a.out 
   sqrt(3) = 1.73205
   pow(2, 2) = 4
   ```

   

7. *假定 GENERIC_MAX 是如下宏：  

   ```C
   #define GENERIC_MAX(type)       \  
   type type##_max(type x, type y) \  
   {                               \  
     return x > y ? x : y;         \
   }                               
   ```

   (a) 写出 GENERIC_MAX(long)被预处理器扩展后的形式。  
   (b) 解释为什么GENERIC_MAX 不能应用于unsigned long 这样的基本类型。  
   (c) 如何使GENERIC_MAX 可以用于unsigned long 这样的基本类型？提示：不要改变GENERIC_MAX 的定义。

   ```C
   // a
   #define GENERIC_MAX(type)       \
   type type##_max(type x, type y) \
   {                               \
     return x > y ? x : y;         \
   }     
   
   int main(void)
   {
       GENERIC_MAX(long)
   
       return 0;
   }
   ```

    **Attention!**

   ```
   使用的预处理器命令是cc -E 14_7.c这个是直接输出到终端的
   如果要输出到文件就是cc -E 14_7.c -o 14_7.i
   需要注意的是宏定义的反斜杠（\）后面不能紧跟空格或 tab，再换行，否则会导致编译器识别为非法的换行转义。
   ```

   **OUTS:**

   ```C
   alancong@AlanCongdeMacBook-Air chapter_14 % cc -E 14_7.c
   # 1 "14_7.c"
   # 1 "<built-in>" 1
   # 1 "<built-in>" 3
   # 466 "<built-in>" 3
   # 1 "<command line>" 1
   # 1 "<built-in>" 2
   # 1 "14_7.c" 2
   
   
   
   
   
   
   int main(void)
   {
       long long_max(long x, long y) { return x > y ? x : y; }
   
       return 0;
   }
   ```

   ```
   // b
   因为unsigned long中间有空格，在替换的时候会再函数名多一个空格，导致错误，如下所示：
   lancong@AlanCongdeMacBook-Air chapter_14 % cc -E 14_7.c
   # 1 "14_7.c"
   # 1 "<built-in>" 1
   # 1 "<built-in>" 3
   # 466 "<built-in>" 3
   # 1 "<command line>" 1
   # 1 "<built-in>" 2
   # 1 "14_7.c" 2
   
   
   
   
   
   
   int main(void)
   {
       unsigned long unsigned long_max(unsigned long x, unsigned long y) { return x > y ? x : y; }
   
       return 0;
   }
   ```

   ```
   // c
   不会！
   ```

   **ANS:**

   ```
   (a)
   
   long long_max(long x, long y)
   {
     return x > y ? x : y;
   }
   The preprocessor would actually put all the tokens on one line, but this version is more readable.
   
   (b) The problem with types such as unsigned long is that they require two words, which prevents GENERIC_MAX from creating the desired function name. For example, GENERIC_MAX(unsigned long) would expand into
   
   unsigned long unsigned long_max(unsigned long x, unsigned long y)
   {
     return x > y ? x : y;
   }
   (c) To make GENERIC_MAX work with any basic type, use a type definition to rename the type:
   
   typedef unsigned long ULONG;
   We can now write GENERIC_MAX(ULONG).
   ```

   

8. *如果需要一个宏，使它扩展后包含当前行号和文件名。换言之，我们想把  
   `const char *str = LINE_FILE;`  
   扩展为  
   `const char *str = "Line 10 of file foo.c";`  
   其中foo.c是包含程序的文件，10是调用LINE_FILE的行号。
   警告：这个练习仅针对高级程序员。尝试编写前请认真阅读“问与答”部分的内容！  

   ```C
   #include<stdio.h>
   
   #define STR(x) #x
   #define STR2(x) STR(x)
   
   #define LINE_FILE "Line " STR2(__LINE__) " of file " __FILE__
   
   #line 9 "foo.c"
   
   const char *str = LINE_FILE;
   
   int main(void)
   {
       printf("%s\n", str);
       
       return 0;
   }
   ```

   **OUTS**

   ```
   alancong@AlanCongdeMacBook-Air chapter_14 % ./a.out 
   Line 10 of file foo.c
   ```

   **Attention！**

   ```
   /* C 语言宏展开：两层宏展开技巧 */
   
   // C 语言宏在预处理阶段是分两个阶段展开的：
   // 1. 参数替换阶段
   // 2. 宏体展开阶段
   
   // 解释：为什么需要两层宏？
   // 当你使用 `#`（字符串化运算符）时，宏参数不会再被展开，而是直接转换成字面值字符串。
   
   // 举个例子：
   #define LINE_FILE "Line " #__LINE__ " of file " __FILE__
   // 你以为展开为： "Line 42 of file myfile.c"
   // 但实际上展开为： "Line __LINE__ of file myfile.c"
   // 这是因为 `#` 不会展开宏参数 `__LINE__`，它只是直接变成字面量 `"__LINE__"`。
   
   // 正确做法：使用两层宏展开
   #define STR2(x) #x                  // 第一层宏：字符串化
   #define STR(x) STR2(x)              // 第二层宏：展开宏参数后再字符串化
   #define LINE_FILE "Line " STR(__LINE__) " of file " __FILE__
   
   // 执行过程：
   // 1. STR(__LINE__) 展开为 STR2(42)
   // 2. STR2(42) 展开为 "42"
   // 结果："Line 42 of file myfile.c" ✔️
   
   // 总结：
   // - 当你需要将宏参数转化为字符串时，必须先展开它，避免直接使用 `#` 来作用在未展开的宏参数上。
   // - **两层宏展开** 是解决这一问题的有效方式。
   
   // 小贴士：
   // - 记住：在宏中使用 `##`（拼接运算符）时，也需要小心类似的展开问题。
   // - 两层宏展开常见应用：
   //     - 打印调试信息（文件名、行号）
   //     - 自动生成结构体字段
   //     - 自动命名变量（尤其在宏中）
   
   // 示例：
   #define TO_STRING(x) #x               // 把参数变成字符串
   #define TO_NAME(x) name_##x           // 拼接变量名
   #define EXPAND_AND_STRINGIFY(x) TO_STRING(x)  // 先展开，再字符串化
   ```

   

9. 编写下列带参数的宏。  
   (a) `CHECK(x,y,n)`——x 和y 都落在$0 \textasciitilde n-1$范围内（包括端点）时值为1。  
   (b) `MEDIAN(x,y,z)`——计算x、y 和z的中位数。  
   (c) `POLYNOMIAL(x)`——计算多项式$3x^5+2x^4-5x^3-x^2+7x-6$。  

   ```C
   #include<stdio.h>
   #include<math.h>
   
   #define CHECK(x,y,n)  (((0 <= (x) && (x) < n) && (0 <= (y) && (y) < n)) ? 1 : 0)
   #define MEDIAN(x,y,z)   ((((y) <= (x) && (x) <= (z)) || ((z) <= (x) && (x) <= (y))) ? x : \
                           ((((x) <= (y) && (y) <= (z)) || ((z) <= (y) && (y) <= (x))) ? y : z))
   #define POLYNOMIAL(x) (3 * pow(x, 5) + 2 * pow(x, 4) - 5 * pow(x, 3) - pow(x, 2) + 7 * (x) - 6)
   #undef POLYNOMIAL
   // 因为调用函数本身也会产生开销，例如
   #define POLYNOMIAL(x) (3 * (x)*(x)*(x)*(x)*(x) + 2 * (x)*(x)*(x)*(x) - 5 * (x)*(x)*(x) - (x)*(x) + 7 * (x) - 6)
   
   int main(void)
   {
       if(CHECK(1, 2, 3))
           printf("The x and y is in the range of 0 ~ n - 1\n");
       
       printf("The median of x:%d y:%d z:%d is %d\n", 4, 8, 2, MEDIAN(4, 8, 2));
   
       printf("the res of polynomial is %.2f\n", POLYNOMIAL(3.0));
   
       return 0;
   }
   ```

   **ANS：**

   ```
   alancong@AlanCongdeMacBook-Air chapter_14 % ./a.out 
   The x and y is in the range of 0 ~ n - 1
   The median of x:4 y:8 z:2 is 4
   the res of polynomial is 762.00
   ```

   ```
   // 为什么直接用乘法计算多项式要比调用函数计算多项式要更有利于性能的提升？
   函数调用的开销主要涉及参数传递、栈操作、控制流跳转、寄存器保存和返回值传递等方面。函数参数传递的方式（通过寄存器或栈）直接影响性能，寄存器传递较高效，而栈传递则增加了压栈和弹栈的开销。函数调用的深度和递归调用会导致更大的栈操作开销，尤其是递归时，每次调用都会占用更多的栈空间，增加系统开销。编译器优化，如内联函数，可以消除函数调用的开销，尤其适用于短小、频繁调用的函数，但过度内联可能会导致代码膨胀，影响缓存效率。不同架构对函数调用的支持也不同，例如x86-64通过寄存器传递参数，较为高效，而旧的x86则依赖栈传递。总体而言，合理避免深度递归和频繁的函数调用，特别是涉及复杂参数传递的调用，并合理使用内联函数，可以有效减少函数调用的开销，提升程序性能。
   ```

10. 函数常常（但不总是）可以写为带参数的宏。讨论函数的哪些特性会使其不适合写为宏的形式。  

    ```
    (1).副作用问题
    如果宏的参数包含副作用（如递增操作 x++ 或函数调用 func()），那么宏的展开可能会多次执行该操作，导致不期望的副作用。例如，宏 SQUARE(x) 展开为 (x) * (x)，如果传递的 x 是 a++，则会导致 a++ 被执行两次，产生不可预期的行为。函数则避免了这个问题，因为函数的参数有副作用也仅在函数体内执行一次。
    
    (2).调试困难
    宏在预处理阶段展开，因此调试时无法像普通函数那样逐行跟踪。如果在宏展开过程中出错，调试过程会变得复杂，错误消息也不容易理解。函数调用则提供了更清晰的栈跟踪和调试信息。
    
    (3).类型安全性
    宏不执行类型检查，可能会导致类型不匹配的错误。例如，宏 MAX(x, y) 不会检查 x 和 y 的类型一致性，导致意外的行为。函数则在编译时进行类型检查，避免了这种风险。
    
    (4).表达式求值顺序
    在宏中，参数会在宏展开时进行求值，这可能会导致求值顺序的不可控性。比如，MAX(x++, y++) 可能会导致 x++ 和 y++ 被多次执行，产生意料之外的结果。函数则按参数的顺序求值，并且可以通过合理控制避免此类问题。
    
    (5).代码膨胀
    宏会在每个调用点进行展开，这可能会导致代码膨胀，尤其是在宏较大或调用频繁的情况下。大量的宏展开可能使得可执行文件变得很大，影响缓存和性能。函数则只有一个定义，调用时只是跳转到该函数。
    
    (6).可维护性和可读性
    宏的代码往往不如函数的代码结构清晰，尤其是在处理复杂的逻辑时。宏可能会在预处理阶段被展开，导致程序的逻辑在源代码中不易追踪。函数则有明确的函数体和作用域，更容易维护和理解。
    
    (7).递归和复杂逻辑
    宏不适合递归和复杂逻辑的实现。由于宏只是简单的文本替换，处理递归和复杂控制流时，宏可能会导致错误的展开或逻辑问题。函数可以支持递归和更复杂的控制流，这在宏中是不容易实现的。
    ```

11. C程序员常用fprintf函数（ 22.3节）来输出出错消息：
    `fprintf(stderr, "Range error: index = %d\n", index);`  
    其中stderr流（22.1节）是C的“标准误差”流。其他参数与printf函数的参数一样，以格式串开始。编写名为ERROR的宏来生成上面的fprintf调用，宏的参数是格式串和需要显示的项：  
    `ERROR("Range error: index = %d\n", index);`   

    ```C
    // Although this code works, it does not follow the recommended approach in the problem statement.
    #include <stdio.h>
    
    #define ERROR(x, y) fprintf(stderr, x, y)
    
    int main(void)
    {
        int index = 1;
        ERROR("Range error: index = %d\n", index);
        return 0;
    }
    ```

    **ANS：**

    ```
    alancong@AlanCongdeMacBook-Air chapter_14 % ./a.out 
    Range error: index = 1
    ```

    

    ```C
    // The suggested approach uses variable arguments with __VA_ARGS__ to handle multiple parameters  more flexibly and correctly.
    #include <stdio.h>
    
    #define ERROR(fmt, ...) fprintf(stderr, fmt, __VA_ARGS__)
    
    int main(void)
    {
        int index = 1;
        ERROR("Range error: index = %d\n", index);
        return 0;
    }
    ```

    **ANS：**

    ```
    alancong@AlanCongdeMacBook-Air chapter_14 % ./a.out 
    Range error: index = 1
    ```

    

14.4节  

12. 假定宏M有如下定义： `#define M 10` 下面哪些测试会失败？   

    ```
    (a) #if M   
    (b) #ifdef M   
    (c) #ifndef M   
    (d) #if defined(M)   
    (e) #if !defined(M)  
    ```

    ```
    (c) and (e) will fail, since M is defined.
    ```

    

13. (a) 指出下面的程序在预处理后的形式。因为包含了头而多出来的代码行可以忽略。   

    ```C
    #include <stdio.h>
    #define N 100
    void f(void);
    int main(void)
    {
        f();
    #ifdef N
    #undef N
    #endif
        return 0;
    }
    void f(void)
    {
    #if defined(N)
        printf("N is %d\n", N);
    #else
        printf("N is undefined\n");
    #endif
    }
    ```

      (b) 这个程序的输出是什么？  

    ```C
    // a
    void f(void);
    int main(void)
    {
        f();
    
    
    
        return 0;
    }
    void f(void)
    {
    
    
    
        printf("N is undefined\n");
    
    }
    ```

    ```
    // b 输出如下所示
    alancong@AlanCongdeMacBook-Air chapter_14 % ./a.out 
    N is undefined
    ```

    

14. 指出下面的程序在预处理后的形式。其中有几行可能会导致编译错误，请找出这些错误。   

    ```C
    #define N = 10
    #define INC(x) x + 1 
    #define SUB(x, y) x - y 
    #define SQR(x)((x) * (x)) 
    #define CUBE(x)(SQR(x) * (x)) 
    #deflne M1(x, y) x##y 
    #define M2(x, y) #x #y 
    
    int main(void)
    {
        int a[N], i, j, k, m;
    #ifdef N 
      i = j;
    #else 
      j = i;
    #endif 
      
      	i = 10 * INC(j);
        i = SUB(j, k);
        i = SQR(SQR(j));
        i = CUBE(j);
        i = M1(j, k);
        puts(M2(i, j));
      
    #undef SQR i = SQR(j);
    #define SQR i = SQR(j);
      
        return 0;
    }
    ```

    ```
    // 第六行的i写成了l
    alancong@AlanCongdeMacBook-Air chapter_14 % cc -E 14_14.c
    # 1 "14_14.c"
    # 1 "<built-in>" 1
    # 1 "<built-in>" 3
    # 466 "<built-in>" 3
    # 1 "<command line>" 1
    # 1 "<built-in>" 2
    # 1 "14_14.c" 2
    14_14.c:6:2: error: invalid preprocessing directive
        6 | #deflne M1(x, y) x##y 
          |  ^
    
    
    
    
    
    
    
    
    int main(void)
    {
        int a[= 10], i, j, k, m;
    
      i = j;
    
    
    
    
       i = 10 * j + 1;
        i = j - k;
        i = ((((j) * (j))) * (((j) * (j))));
        i = (((j) * (j)) * (j));
        i = M1(j, k);
        puts("i" "j");
    
    
        i = SQR(j);
    
        i = (j);
    
        return 0;
    }
    1 error generated.
    ```

    **ANS：**

    ```C
    Blank line
    Blank line
    Blank line
    Blank line
    Blank line
    Blank line
    Blank line
    
    int main(void)
    {
      int a[= 10], i, j, k, m;
    
    Blank line
      i = j;
    Blank line
    Blank line
    Blank line
    
      i = 10 * j+1;
      i = (x,y) x-y(j, k);
      i = ((((j)*(j)))*(((j)*(j))));
      i = (((j)*(j))*(j));
      i = jk;
      puts("i" "j");
    
    Blank line
      i = SQR(j);
    Blank line
      i = (j);
    
      return 0;
    }
    Some preprocessors delete white-space characters at the beginning of a line, so your results may vary. Three lines will cause errors when the program is compiled. Two contain syntax errors:
    
    int a[= 10], i, j, k, m;
    i = (x,y) x-y(j, k);
    The third refers to an undefined variable:
    
    i = jk;
    ```

    

15. 假定程序需要用英语、法语或西班牙语显示消息。使用条件编译编写程序片段，根据指定的宏是否定义来显示出下列3条消息中的一条。  

    ```
    Insert Disk 1        (如果定义了ENGLISH)  
    Inserez Le Disque 1  (如果定义了FRENCH)  
    Inserte El Disco 1   (如果定义了SPANISH)  
    ```

    ```C
    #include<stdio.h>
    
    #define ENGLISH
    
    int main(void)
    {
    #if defined ENGLISH
        printf("Insert Disk 1\n");
    #elif defined FRENCH
        printf("Inserez Le Disque 1\n");
    #elif defined SPANISH
        printf("Inserte El Disco 1\n");
    #else
        printf("No language selected\n");
    #endif
        return 0;
    }
    ```

    ```C
    alancong@AlanCongdeMacBook-Air chapter_14 % ./a.out 
    Insert Disk 1
    ```

    

14.5 节  

16. 假定有下列宏定义：  

    ```
    #define IDENT(x) PRAGMA(ident #x)  
    #define PRAGMA(x) _Pragma(#x)  
    ```

    下面的代码行在宏扩展之后会变成什么样子？  

    ```
    IDENT(foo)
    ```

    ```C
    #define IDENT(x) PRAGMA(ident #x)  
    #define PRAGMA(x) _Pragma(#x)  
    
    int main(void)
    {
        IDENT(foo)
        return 0;
    }
    ```

    ```
    // the output is below
    // use the instruction cc -E 14_15.c
    
    
    
    int main(void)
    {
    #pragma ident "foo"
        return 0;
    }
    ```
