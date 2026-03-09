---
title: 《C语言程序设计-现代方法》-课后习题-第十三章
published: 2026-03-09
description: ''
image: ''
tags: []
category: '程序设计'
draft: false 
lang: ''
---

## 第十三章 字符串

### 练习题

**13.3节**

1. 下面的函数调用应该只输出一个换行符，但是其中有一些是错误的。请指出哪些调用是错误的，并说明理由。

   ```
   (a) printf("%c", '\n');
   (b) printf("%c", "\n");
   (c) printf("%s", '\n');
   (d) printf("%s", "\n");
   (e) printf('\n');
   (f) printf("\n");
   (g) putchar('\n');
   (h) putchar("\n");
   (i) puts('\n');
   (j) puts("\n");
   (k) puts("");
   ```

   ```
   (a) printf("%c", '\n'); //正确，%c是字符格式说明符，'\n'是字符常量(char)，类型匹配
   (b) printf("%c", "\n"); //错误，%c是字符格式说明符，"\n"是字符串常量(char *)，类型不匹配
   (c) printf("%s", '\n'); //错误，%s是字符串格式说明符，'\n'是字符常量(char)，类型不匹配
   (d) printf("%s", "\n"); //正确，%s是字符串格式说明符，"\n"是字符串常量(char *)，类型匹配
   (e) printf('\n'); //错误，printf第一个参数必须是格式字符串，'\n'是字符常量(char)，类型不匹配
   (f) printf("\n"); //正确，printf第一个参数必须是格式字符串，"\n"是字符串常量(char *)，类型不匹配
   (g) putchar('\n'); // 正确，putchar函数接收的是字符参数，'\n'是字符常量(char)，类型匹配
   (h) putchar("\n"); // 错误，putchar函数接收的是字符参数，"\n"是字符串常量(char *)，类型不匹配
   (i) puts('\n'); // 错误，puts函数接收的时字符串常量，'\n'是字符常量(char)，类型不匹配
   (j) puts("\n"); // 正确，puts函数接收的时字符串常量，"\n"是字符串常量(char *)，类型匹配
   (k) puts(""); // 正确，puts函数接收的是字符串常量，" "是字符串常量(char *)，类型匹配
   ```

   

2. 假设 `p` 的声明如下：
   `char *p = "abc";`
   下列哪些函数调用是合法的？请说明每个合法的函数调用的输出，并解释为什么其他的是非法的。

   ```
   (a) putchar(p);
   (b) putchar(*p);
   (c) puts(p);
   (d) puts(*p);
   ```

   ```
   (a) putchar(p); //不合法，putchar函数接收的是字符参数，p是指向字符串常量的指针，类型不匹配
   (b) putchar(*p); //合法，putchar函数接收的是字符参数，*p代表的是'a'也就是p[0]，类型匹配
   (c) puts(p); // 合法，puts接收的参数是字符串常量(char *)，p是指向字符串常量的指针，类型匹配
   (d) puts(*p); // 不合法，putsputs接收的参数是字符串常量(char *)，*p是字符串常量的第一个字符，类型不匹配
   ```

   

3. 假设按如下方式调用 `scanf` 函数：
   `scanf("%d%s%d", &i, s, &j);`
   如果用户输入 `12abc34 56def78`，那么调用后 `i`、`s` 和 `j` 的值分别是多少？（假设 `i` 和 `j` 是 `int` 类型变量，`s` 是字符数组。）

   ```
   因为第一个格式符为%d，scanf函数会从输入流中读取整数12，并将其存入变量i中。此时输入流的当前位置指向字符'a'，%s会从当前位置开始读取连续的非空白符，直到遇到空白字符为止。因此scanf函数会将"abc34"读入字符数组s，并在末尾自动添加字符串结束符'\0'。紧接着是格式符%d，scanf函数会继续从剩余的输入" 56def78"中读取下一个整数56，并将其存入变量j中，多余的"def78"没有对应格式说明符处理，因此仍保留在输入缓冲区中。
   ```

   ```C
   #include<stdio.h>
   
   #define SIZE 100
   
   int main(void)
   {
       char s[SIZE];
       int i, j;
       printf("Enter something : ");
       
       scanf("%d%s%d", &i, s, &j);
   
       printf("i is : %d\n", i);
       printf("s is : %s\n", s);
       printf("j is : %d\n", j);
   
       return 0;
   }
   ```

   ```
   alancong@AlanCongdeMacBook-Air chapter_13 % ./a.out
   Enter something : 12abc34 56def78
   i is : 12
   s is : abc34
   j is : 56
   ```

   


4. 按照下述要求分别修改 `read_line` 函数。

   ```
   (a) 在开始存储输入字符前跳过空白字符。
   (b) 在遇到第一个空白字符时停止读入。提示：调用 isspace 函数（23.5节）来检查字符是否为空白字符。
   (c) 在遇到第一个换行符时停止读入，然后把换行符存储到字符串中。
   (d) 把没有空间存储的字符留下以备后用。
   ```

   ```C
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
   // a
   int read_line(char str[], int n)
   {
       int ch, i = 0;
       while ((ch = getchar()) != '\n')
       {
           if(i == 0 && isspace(ch))
               continue;
           if (i < n)
               str[i++] = ch;
       }
       str[i] = '\0';
       return i;
   }
   ```

   ```
   alancong@AlanCongdeMacBook-Air chapter_13 % ./a.out 
   Enter a string :     1234
   The string is : 1234
   ```

   ```C
   // b
   int read_line(char str[], int n)
   {
       int ch, i = 0;
       while ((ch = getchar()) != '\n' && !isspace(ch))
           if (i < n)
               str[i++] = ch;
       str[i] = '\0';
       return i;
   }
   ```

   ```
   alancong@AlanCongdeMacBook-Air chapter_13 % ./a.out 
   Enter a string : 12 34
   The string is : 12
   ```

   ```C
   // c
   int read_line(char str[], int n)
   {
       int ch, i = 0;
       do
       {
           ch = getchar();
           if (i < n)
               str[i++] = ch;
       } while (ch != '\n');
   
       str[i] = '\0';
       return i;
   }
   ```

   ```
   alancong@AlanCongdeMacBook-Air chapter_13 % ./a.out 
   Enter a string : 1234 
   The string is : 1234
   
   ```

   ```
   // d
   int read_line(char str[], int n)
   {
       int ch, i = 0;
       while ((i < n) && (ch = getchar()) != '\n')
           str[i++] = ch;
       str[i] = '\0';
       return i;
   }
   ```

   ```C
   // d 
   // The STD ans is better than me, use for loop for counting loop
   int read_line(char str[], int n)
   {
       int ch, i;
   
       for (i = 0; i < n; i++)
       {
           ch = getchar();
           if (ch == '\n')
               break;
           str[i] = ch;
       }
       str[i] = '\0';
       return i;
   }
   ```

   ```
   alancong@AlanCongdeMacBook-Air chapter_13 % ./a.out 
   Enter a string : 123456789123456789
   The string is : 1234567891
   The string is : 23456789
   ```

   

**13.4节**

5. (a) 编写名为 `capitalize` 的函数，把参数中的字母都改为大写字母。参数是空字符结尾的字符串，且此字符串可以包含任意字符而不仅是字母。使用数组取下标操作访问字符串中的字符。提示：使用 `toupper` 函数（23.5节）把每个字符转换成大写。
   (b) 重写 `capitalize` 函数，这次使用指针算术运算来访问字符串中的字符。

   ```C
   // a
   #include<stdio.h>
   #include<string.h>
   #include<ctype.h>
   
   #define SIZE 100
   
   void capitalize(char *a, int n);
   
   int main(void)
   {
       char arr[SIZE] = "aBCdeFGHIJK!@#$";
   
       capitalize(arr, strlen(arr));
   
       printf("The output is : %s\n", arr);
   
       return 0;
   }
   
   void capitalize(char *a, int n)
   {
       for(int i = 0;i < n;i ++)
           if('a' <= a[i] && a[i] <= 'z')
               a[i] = toupper(a[i]);
   }
   ```

   ```
   alancong@AlanCongdeMacBook-Air chapter_13 % ./a.out 
   The output is : ABCDEFGHIJK!@#$
   ```

   ```C
   #include<stdio.h>
   #include<string.h>
   #include<ctype.h>
   
   #define SIZE 100
   
   void capitalize(char *a, int n);
   
   int main(void)
   {
       char arr[SIZE] = "aBCdeFGHIJK!@#$";
   
       capitalize(arr, strlen(arr));
   
       printf("The output is : %s\n", arr);
   
       return 0;
   }
   
   void capitalize(char *a, int n)
   {
       for(char *p = a;p < a + n;p ++)
           if('a' <= *p && *p <= 'z')
               *p = toupper(*p);
   }
   ```

   ```
   alancong@AlanCongdeMacBook-Air chapter_13 % ./a.out 
   The output is : ABCDEFGHIJK!@#$
   ```

   

6. 编写名为 `censor` 的函数，把字符串中出现的每一处 `foo` 替换为 `xxx`。例如，字符串 `"food fool"` 会变为 `"xxxd xxxl"`。在不失清晰性的前提下程序越短越好。

   ```c
   #include <stdio.h>
   #include <string.h>
   
   #define SIZE 100
   
   void censor(char s[]);
   
   int main(void)
   {
       char arr[SIZE] = "abcdefoofofoo&&fffoo";
   
       printf("The string is : %s\n", arr);
   
       censor(arr);
   
       printf("The string is : %s\n", arr);
   
       return 0;
   }
   
   void censor(char s[])
   {
       for(int i = 0;s[i] != '\0';i ++)
           if(s[i] == 'f' && s[i + 1] == 'o' && s[i + 2] == 'o')
               s[i] = s[i + 1] = s[i + 2] = 'x';
   }
   ```

   ```
   The string is : abcdefoofofoo&&fffoo
   The string is : abcdexxxfoxxx&&ffxxx
   ```

**13.5节**

7. 假设 `str` 是字符数组，下面哪条语句与其他 3 条语句不等价？

   ```
   (a) *str = 0;
   (b) str[0] = '\0';
   (c) strcpy(str, "");
   (d) strcat(str, "");
   ```

   ```
   (a) *str = 0; // 将字符串第一个字符赋值为数值 0，相当于 str[0] = '\0'，表示空字符串。
   (b) str[0] = '\0'; // 显式将字符串第一个字符设为字符串结束符，等价于清空字符串。
   (c) strcpy(str, ""); // 将空字符串复制到 str 中，效果是 str[0] = '\0'，也表示空字符串。
   (d) strcat(str, ""); 
   // 将空字符串拼接到已有的字符串后。行为依赖于 str 原始内容必须是以 '\0' 结尾的有效字符串。若 str 本身未被初始化为有效字符串（例如你仅仅设置了 str[0] = 'X'; 而没有终止符），那么该调用会引发未定义行为。因此它与前面三句不等价。
   ```

8. 在执行下列语句后，字符串 `str` 的值是什么？

   ```
   strcpy(str, "tire-bouchon");
   strcpy(&str[4], "d-or-wi");
   strcat(str, "red?");
   ```

   ```
   假设str当前没有存储任何字符串，也就是""，那么strcpy(str, "tire-bouchon");会将str的值修改为"tire-bouchon"，strcpy(&str[4], "d-or-wi");会将str数组从第五个元素开始的值修改为"d-or-wi"，因此目前str的值为"tired-or-wi"，strcat(str, "red?");会在当前字符串的末尾附上"red?"，因此现在字符串的值为"tired-or-wired?"
   ```

   ```c
   #include <stdio.h>
   #include <string.h>
   
   #define SIZE 100
   
   int main(void)
   {
       char str[SIZE];
   
       strcpy(str, "tire-bouchon");
       strcpy(&str[4], "d-or-wi");
       strcat(str, "red?");
   
       printf("The string is : %s\n", str);
   
       return 0;
   }
   ```

   ```
   alancong@AlanCongdeMacBook-Air chapter_13 % ./a.out 
   The string is : tired-or-wired?
   ```

   

9. 在执行下列语句后，字符串 `s1` 的值是什么？

   ```C
   strcpy(s1, "computer");
   strcpy(s2, "science");
   if (strcmp(s1, s2) < 0)
       strcat(s1, s2);
   else
       strcat(s2, s1);
   s1[strlen(s1)-6] = '\0';
   ```

   ```
   假设当前字符串s1没有任何值，也就是""，那么strcpy(s1, "computer");会将s1的值修改为"computer"，strcpy(s2, "science");会将s2的值修改为"science"，因为两个字符串从第一个字符就不相等，且's'>'c'，所以strcat(s1, s2);会将字符串s2的内容附到字符串s1的后面，因此现在的值为，"computerscience"，s1[strlen(s1)-6] = '\0';相当于将现在字符串s1的内容从后往前删掉留个字符，尾零不参与计数，因此最终字符串s1的值就是"computers"。
   ```

   ```C
   #include <stdio.h>
   #include <string.h>
   
   #define SIZE 100
   
   int main(void)
   {
       char s1[SIZE], s2[SIZE];
   
       strcpy(s1, "computer");
       strcpy(s2, "science");
       if (strcmp(s1, s2) < 0)
           strcat(s1, s2);
       else
           strcat(s2, s1);
       s1[strlen(s1) - 6] = '\0';
   
       printf("The string is : %s\n", s1);
   
       return 0;
   }
   ```

   ```
   alancong@AlanCongdeMacBook-Air chapter_13 % ./a.out 
   The string is : computers
   ```

   

10. 下面的函数用于创建字符串的相同副本。请指出这个函数中的错误。

    ```
    char *duplicate(const char *p) {
        char *q;
        strcpy(q, p);
        return q;
    }
    ```

    ```C
    #include <stdio.h>
    #include <string.h>
    
    #define SIZE 100
    
    void duplicate(const char *p, char *q);
    
    int main(void)
    {
        char string[SIZE] = "string";
        char string_copy[SIZE];
        duplicate(string, string_copy);
        printf("The string is : %s\n", string_copy);
    
        return 0;
    }
    
    void duplicate(const char *p, char *q)
    {
        strcpy(q, p);
    }
    ```

    ```
    alancong@AlanCongdeMacBook-Air chapter_13 % ./a.out 
    The string is : string
    ```

    

11. 本章的“问与答”部分说明了利用数组取下标操作来编写 `strcmp` 函数的方法。请修改此函数，改用指针算术运算来编写。

    ```c
    #include<stdio.h>
    
    #define SIZE 100
    
    char my_strcmp(char *s, char *t);
    
    int main(void)
    {
        char str_1[SIZE] = "Hello world!";
        char str_2[SIZE] = "Hello world!";
    
        if(my_strcmp(str_1, str_2) == 0)
            printf("The result is equal.\n");
        else    
            printf("The result is unequal.\n");
    
        return 0;
    }
    
    char my_strcmp(char *s, char *t)
    {
        char *p = s, *q = t;
        while(*p == *q)
        {
            if(*p == '\0')
                return 0;
            p ++;
            q ++;
        }
        return *p - *q;
    }
    ```

    ```
    alancong@AlanCongdeMacBook-Air chapter_13 % ./a.out 
    The result is equal.
    ```

    

12. 编写下面的函数：

    ```
    void get_extension(const char *file_name, char *extension);
    ```

     `file_name` 指向包含文件名的字符串。函数把文件名的扩展存储在 `extension` 指向的字符串中。例如，如果文件名是 `"memo.txt"`，函数将把 `"txt"` 存储到 `extension` 指向的字符串中。如果文件名没有扩展名，函数将在 `extension` 指向的字符串中存储一个空字符串（仅由一个空字符构成）。在函数中使用 `strlen` 函数和 `strcpy` 函数，使其尽可能简单。

    ```C
    #include<stdio.h>
    #include<string.h>
    #include<stdbool.h>
    
    #define SIZE 100
    
    void get_extension(const char *file_name, char *extension);
    
    int main(void)
    {
        char file_name_1[SIZE] = "main.c";
        char file_name_2[SIZE] = "main", extension[SIZE];
    
        printf("The file name is : %s\n", file_name_1);
        get_extension(file_name_1, extension);
        printf("The extension of the file is : %s\n", extension);
    
        printf("The file name is : %s\n", file_name_2);
        get_extension(file_name_2, extension);
        printf("The extension of the file is : %s\n", extension);
    
        return 0;
    }
    
    void get_extension(const char *file_name, char *extension)
    {
        const char *p = file_name;
        bool found = false;
        while(*p != '\0')
        {
            if(*p == '.')
            {
                found = true;
                break;
            }
            p ++;
        }
        if(found && *(p + 1) != '\0')
            strcpy(extension, p + 1);
        else
            strcpy(extension, "");
    }
    ```

    ```
    alancong@AlanCongdeMacBook-Air chapter_13 % ./a.out 
    The file name is : main.c
    The extension of the file is : c
    The file name is : main
    The extension of the file is : 
    ```

    

13. 编写下面的函数：

    ```
    void build_index_url(const char *domain, char *index_url);
    ```

    `domain` 指向包含因特网域名的字符串，例如 `"knking.com"`。函数应在该字符串的前面加上 `"http://www."`，在后面加上 `"/index.html"`，并把结果存储到 `index_url` 指向的字符串中。（在这个例子中，结果为 `"http://www.knking.com/index.html"`。）可以假定 `index_url` 所指向的变量长度足以装下整个字符串。在函数中使用 `strcat` 函数和 `strcpy` 函数，使其尽可能简单。

    ```C
    #include<stdio.h>
    #include<string.h>
    #include<stdbool.h>
    
    #define SIZE 100
    
    void build_index_url(const char *domain, char *index_url);
    
    int main(void)
    {
        char domain[SIZE] = "knking.com", index_url[SIZE];
    
        build_index_url(domain, index_url);
        printf("The result is : %s\n", index_url);
    
        return 0;
    }
    
    void build_index_url(const char *domain, char *index_url)
    {
        strcpy(index_url, "http://www.");
        strcat(index_url, domain);
        strcat(index_url, "/index.html");
    }
    ```

    ```
    alancong@AlanCongdeMacBook-Air chapter_13 % ./a.out 
    The result is : http://www.knking.com/index.html
    ```

    

**13.6节**

14. 下面程序的输出是什么？

    ```C
    #include <stdio.h>
    int main(void)
    {
        char s[] = "Hsjodi", *p;
        for (p = s; *p; p++)
            --*p;
        puts(s);
        return 0;
    }
    ```

    ```
    程序是每个字符值都向前减一。
    ```

    ```
    alancong@AlanCongdeMacBook-Air chapter_13 % ./a.out 
    Grinch
    ```

    

15. 函数 `f` 如下所示：

    ```C
    int f(char *s, char *t) {
        char *p1, *p2;
        for (p1 = s; *p1; p1++) {
            for (p2 = t; *p2; p2++)
                if (*p1 == *p2) break;
            if (*p2 == '\0') break;
        }
        return p1 - s;
    }
    ```

    ```
    (a) f("abcd", "babc") 的值是多少？
    (b) f("abcd", "bcd") 的值是多少？
    (c) 当传递两个字符串 s 和 t 时，函数 f 的返回值一般是什么？
    ```

    ```C
    // a & b
    #include <stdio.h>
    
    int f(char *s, char *t);
    
    int main(void)
    {
        printf("The result of f(\"abcd\", \"babc\") is %d\n", f("abcd", "babc")); 
        printf("The result of f(\"abcd\", \"bcd\")) is %d\n", f("abcd", "bcd"));
        return 0;
    }
    
    int f(char *s, char *t)
    {
        char *p1, *p2;
        for (p1 = s; *p1; p1++)
        {
            for (p2 = t; *p2; p2++)
                if (*p1 == *p2)
                    break;
            if (*p2 == '\0')
                break;
        }
        return p1 - s;
    }
    ```

    ```
    // c
    程序是用来判断在s序列中存在的但是在t序列中不存在的字符，并返回其在s序列中的位置。
    ```

    

16. 利用 13.6 节中的方法来精简 13.4 节的 `count_space` 函数。具体而言要用 `while` 循环替换 `for` 语句。

    ```C
    #include<stdio.h>
    
    #define SIZE 100
    
    int count_spaces(const char *s);
    
    int main(void)
    {
        char str[SIZE] = "12 34 56 78";
    
        printf("There is %d space in the string of %s\n", count_spaces(str), str);
    
        return 0;
    }
    
    int count_spaces(const char *s)
    {
        int count = 0;
        while(*s)
        {
            if(*s == ' ')
                count++;
            s ++;
        }
        return count;
    }
    ```

    ```
    alancong@AlanCongdeMacBook-Air chapter_13 % ./a.out 
    There is 3 space in the string of 12 34 56 78
    ```

    

17. 编写下面的函数：

    ```
    bool test_extension(const char *file_name, const char *extension);
    ```

     `file_name` 指向包含文件名的字符串。如果文件的扩展名与 `extension` 指向的字符串匹配（不区分大小写），函数返回 `true`。例如，函数调用 `test_extension("memo.txt", "TXT")` 将返回 `true`。要求在函数中使用“搜索字符串结尾”的惯用法。提示：在比较字符之前使用 `toupper` 函数（23.5节）把字符转换成大写形式。

    ```C
    #include<stdio.h>
    #include<string.h>
    #include<stdbool.h>
    #include<ctype.h>
    
    #define SIZE 100
    
    bool test_extension(const char *file_name, const char *extension);
    void get_extension(const char *file_name, char *extension);
    
    int main(void)
    {
        char file_name_1[SIZE] = "main.txt";
        char file_name_2[SIZE] = "main", extension[SIZE];
    
        if(test_extension(file_name_1, "TXT"))
            printf("Match!\n");
        else
            printf("Don't match!\n");
    
        return 0;
    }
    
    void get_extension(const char *file_name, char *extension)
    {
        const char *p = file_name;
        bool found = false;
        while(*p != '\0')
        {
            if(*p == '.')
            {
                found = true;
                break;
            }
            p ++;
        }
        if(found && *(p + 1) != '\0')
            strcpy(extension, p + 1);
        else
            strcpy(extension, "");
    }
    
    bool test_extension(const char *file_name, const char *extension)
    {
        char file_extension[SIZE], *p = file_extension;
    
        get_extension(file_name, file_extension);
    
        while(*p)
        {
            *p = toupper(*p);
            p ++;
        }
    
        if(strcmp(file_extension, extension) == 0)
            return true;
        else 
            return false;
    }
    ```

    ```
    alancong@AlanCongdeMacBook-Air chapter_13 % ./a.out 
    Match!
    ```

    

18. 编写下面的函数：

    ```
    void remove_filename(char *url);
    ```

    `url` 指向一个包含以文件名结尾的统一资源定位器（Uniform Resource Locator, URL）的字符串，例如 `"http://www.knking.com/index.html"`。函数应通过移除文件名和前面的斜杠来修改字符串。（在上面的例子中，结果为 `"http://www.knking.com"`。）要求在函数中使用“搜索字符串结尾”的惯用法。提示：把字符串中的最后一个斜杠替换为空字符。

    ```C
    #include<stdio.h>
    #include<ctype.h>
    #include<string.h>
    
    #define SIZE 100
    
    void remove_filename(char *url);
    
    int main(void)
    {
        char url[SIZE] = "http://www.knking.com/index.html";
    
        remove_filename(url);
    
        printf("The string is : %s\n", url);
    
        return 0;
    }
    
    void remove_filename(char *url)
    {
        char *str = url + strlen(url) - 1;
        while(*str)
        {
            if(*str == '/')
            {
                *str = '\0';
                break;
            }
            str --;
        }
    }
    ```

    ```
    alancong@AlanCongdeMacBook-Air chapter_13 % ./a.out 
    The string is : http://www.knking.com
    ```

    

### 编程题

1. 编写程序找出一组单词中“最小”单词和“最大”单词。用户输入单词后，程序根据字典顺序决定排在最前面和最后面的单词。当用户输入 4 个字母的单词时，程序停止读入。假设所有单词都不超过 20 个字母。程序会话如下：

   ```
   Enter word: dog
   Enter word: zebra
   Enter word: rabbit
   Enter word: catfish
   Enter word: walrus
   Enter word: cat
   Enter word: fish
   Smallest word: cat
   Largest word: zebra
   ```

   提示：使用两个名为 `smallest_word` 和 `largest_word` 的字符串来分别记录所有输入中的“最小”单词和“最大”单词。用户每输入一个新单词，都要用 `strcmp` 函数把它与 `smallest_word` 进行比较。如果新的单词比 `smallest_word`“小”，就用 `strcpy` 函数把新单词保存到 `smallest_word` 中。用类似的方式与 `largest_word` 进行比较。用 `strlen` 函数来判断用户是否输入了 4 个字母的单词。

   ```C
   #include <stdio.h>
   #include <string.h>
   
   #define SIZE 20
   
   int main(void)
   {
       char smallest_word[SIZE], largest_word[SIZE], word[SIZE];
   
       printf("Enter word: ");
       scanf("%s", word);
   
       if(strlen(word) == 4)
       {
           printf("Error!\n");
           return 0;
       }
   
       strcpy(smallest_word, word);
       strcpy(largest_word, word);
   
       while (1)
       {
           printf("Enter word: ");
           scanf("%s", word);
   
           if (strlen(word) == 4)
               break;
   
           if (strcmp(smallest_word, word) > 0)
               strcpy(smallest_word, word);
           if (strcmp(largest_word, word) < 0)
               strcpy(largest_word, word);
       }
   
       printf("Smallest word: %s\n", smallest_word);
       printf("Largest word: %s\n", largest_word);
   
       return 0;
   }
   ```

   ```
   alancong@AlanCongdeMacBook-Air chapter_13 % ./a.out 
   Enter word: dog
   Enter word: zebra
   Enter word: rabbit
   Enter word: catfish
   Enter word: walrus
   Enter word: cat
   Enter word: fish
   Smallest word: cat
   Largest word: zebra
   ```

   

2. 按如下方式改进 13.5 节的 `remind.c` 程序：

   ```
   (a) 如果对应的日期为负数或大于 31，程序显示出错消息，并忽略提醒。提示：使用 continue 语句。✅
   (b) 允许用户输入日期、24 小时格式的时间和提醒。显示的提醒列表必须先按日期排序，然后再按时间排序。（原始的 remind.c 程序允许用户输入时间，但是它把时间作为提醒的一部分来处理。）✅
   (c) 程序显示一年的提醒列表。要求用户按照 月/日 的格式输入日期。✅
   ```

   ```C
   /* remind.c (Chapter 13, page 294) */
   /* Prints a one-month reminder list */
   
   #include <stdio.h>
   #include <string.h>
   
   #define MAX_REMIND 50 /* maximum number of reminders */
   #define MSG_LEN 60    /* max length of reminder message */
   
   int read_line(char str[], int n);
   
   int main(void)
   {
       char reminders[MAX_REMIND][MSG_LEN + 3];
       char day_str[10], msg_str[MSG_LEN + 1];
       int month, day, hour, i, j, num_remind = 0;
   
       for (;;)
       {
           if (num_remind == MAX_REMIND)
           {
               printf("-- No space left --\n");
               break;
           }
   
           printf("Enter date and time (MM/DD/HH) and reminder: ");
           scanf("%2d / %2d / %2d", &month, &day, &hour);
   
           // if the date is negative or greater than 31
           if(month < 0 || month > 12 || day < 0 || day > 31 || hour < 0 || hour > 24)
           {
               printf("False input.");
               continue;
           }
   
           if (day == 0)
               break;
   
           sprintf(day_str, "%2d/%2d/%2d", month, day, hour);
           read_line(msg_str, MSG_LEN);
   
           for (i = 0; i < num_remind; i++)
               if (strcmp(day_str, reminders[i]) < 0)
                   break;
   
           for (j = num_remind; j > i; j--)
               strcpy(reminders[j], reminders[j - 1]);
   
           strcpy(reminders[i], day_str);
           strcat(reminders[i], msg_str);
   
           num_remind++;
       }
   
       printf("\nDay Reminder\n");
       for (i = 0; i < num_remind; i++)
           printf(" %s\n", reminders[i]);
   
       return 0;
   }
   
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

   ```
   alancong@AlanCongdeMacBook-Air chapter_13 % ./a.out 
   Enter day and reminder: 3/14/9 Midterm exam
   Enter day and reminder: 3/2/10 Doctor appointment
   Enter day and reminder: 3/14/8 Project deadline
   Enter day and reminder: 2/28/14 Friend's birthday
   Enter day and reminder: 3/14/14 Call mom
   Enter day and reminder: 0/0/0
   
   Day Reminder
     2/28/14 Friend's birthday
     3/ 2/10 Doctor appointment
     3/14/ 8 Project deadline
     3/14/ 9 Midterm exam
     3/14/14 Call mom
   alancong@AlanCongdeM
   ```

   

3. 修改 8.2 节的 `deal.c` 程序，使它显示出牌的全名：

   ```
   Enter number of cards in hand: 5
   Your hand:
   Seven of clubs
   Two of spades
   Five of diamonds
   Ace of spades
   Two of hearts
   ```

   提示：用指向字符串的指针的数组来替换数组 `rank_code` 和数组 `suit_code`。

   ```C
   /* deal.c (Chapter 8, page 173) */
   /* Deals a random hand of cards */
   
   #include <stdbool.h> /* C99 only */
   #include <stdio.h>
   #include <stdlib.h>
   #include <time.h>
   
   #define NUM_SUITS 4
   #define NUM_RANKS 13
   
   int main(void)
   {
       bool in_hand[NUM_SUITS][NUM_RANKS] = {false};
       int num_cards, rank, suit;
   
       const char *rank_code[] = {"Two", "Three", "Four", "Five", "Six", "Seven", "Eight",
                                  "Nine", "Ten", "Jack", "Queen", "King", "Ace"};
       const char *suit_code[] = {"clubs", "diamonds", "hearts", "spades"};
   
       srand((unsigned)time(NULL));
   
       printf("Enter number of cards in hand: ");
       scanf("%d", &num_cards);
   
       printf("Your hand:");
       while (num_cards > 0)
       {
           suit = rand() % NUM_SUITS; /* picks a random suit */
           rank = rand() % NUM_RANKS; /* picks a random rank */
           if (!in_hand[suit][rank])
           {
               in_hand[suit][rank] = true;
               num_cards--;
               printf("\n%s %s", rank_code[rank], suit_code[suit]);
           }
       }
       printf("\n");
   
       return 0;
   }
   ```

   ```
   alancong@AlanCongdeMacBook-Air chapter_13 % ./a.out 
   Enter number of cards in hand: 5
   Your hand:
   Ace clubs
   King diamonds
   Four hearts
   Jack diamonds
   Queen diamonds
   ```

   

4. 编写名为 `reverse.c` 的程序，用来逆序输出命令行参数。如果输入 `reverse void and null` 运行程序，产生的输出应为：`null and void`

   ```C
   #include<stdio.h>
   
   int main(int argc, char *argv[])
   {
       for(int i = argc - 1;i > 0;i --)
           printf("%s ", argv[i]);
       printf("\n");
   
       return 0;
   }
   ```

   ```
   alancong@AlanCongdeMacBook-Air chapter_13 % ./reverse null and void
   void and null
   ```

   

5. 编写名为 `sum.c` 的程序，用来对命令行参数（假设都是整数）求和。如果输入 `sum 8 24 62` 运行程序，产生的输出应为：

   ```
   Total: 94
   ```

   提示：用 `atoi` 函数（26.2 节）把每个命令行参数从字符串格式转换为整数格式。

   ```C
   #include <stdio.h>
   #include <stdlib.h>
   
   int main(int argc, char *argv[])
   {
       int sum = 0;
       for (int i = 1; i < argc; i++)
           sum += atoi(argv[i]);
       printf("Total: %d\n", sum);
   
       return 0;
   }
   ```

   ```
   alancong@AlanCongdeMacBook-Air chapter_13 % cc code_13_5.c -o sum
   alancong@AlanCongdeMacBook-Air chapter_13 % ./sum 8 24 62        
   Total: 94
   ```

   

6. 改进 13.7 节的程序 `planet.c`，使它在对命令行参数和 `planets` 数组中的字符串进行比较时忽略大小写。

   ```c
   /* planet.c (Chapter 13, page 304) */
   /* Checks planet names */
   
   #include <stdio.h>
   #include <string.h>
   #include<ctype.h>
   #include<stdbool.h>
   
   #define NUM_PLANETS 9
   
   bool string_equal(char *s, char *t);
   
   int main(int argc, char *argv[])
   {
       char *planets[] = {"Mercury", "Venus", "Earth",
                          "Mars", "Jupiter", "Saturn",
                          "Uranus", "Neptune", "Pluto"};
       int i, j;
   
       for (i = 1; i < argc; i++)
       {
           for (j = 0; j < NUM_PLANETS; j++)
               if (string_equal(argv[i], planets[j]) == 0)
               {
                   printf("%s is planet %d\n", argv[i], j + 1);
                   break;
               }
           if (j == NUM_PLANETS)
               printf("%s is not a planet\n", argv[i]);
       }
   
       return 0;
   }
   
   bool string_equal(char *s, char *t)
   {
       while(*s && *t)
       {
           if(toupper(*s) != toupper(*t))
               return false;
           s ++;
           t ++;
       }
       return *s == *t;
   }
   ```

   ```
   alancong@AlanCongdeMacBook-Air chapter_13 % ./planet Mercury venus MARS jUpiTer banana
   Mercury is planet 2
   venus is planet 1
   MARS is planet 1
   jUpiTer is planet 1
   banana is planet 1
   ```

   

7. 修改第 5 章的编程题 11，用字符串指针数组取代 `switch` 语句。例如，现在不再用 `switch` 语句来显示第一位数字对应的单词，而把该数字用作下标，从包含 `"twenty"`、`"thirty"` 等字符串的数组中搜索。

   ```C
   #include <stdio.h>
   
   const char *teens[] = {
       "ten", "eleven", "twelve", "thirteen", "fourteen",
       "fifteen", "sixteen", "seventeen", "eighteen", "nineteen"};
   
   const char *tens_words[] = {
       "", "", "twenty", "thirty", "forty", "fifty",
       "sixty", "seventy", "eighty", "ninety"};
   
   const char *ones_words[] = {
       "", "-one", "-two", "-three", "-four", "-five",
       "-six", "-seven", "-eight", "-nine"};
   
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
           printf("%s\n", teens[number - 10]);
       else
       {
           tens = number / 10;
           ones = number % 10;
   
           printf("%s", tens_words[tens]);
           printf("%s\n", ones_words[ones]);
       }
   
       return 0;
   }
   ```

   ```
   alancong@AlanCongdeMacBook-Air chapter_13 % ./a.out 
   Enter a two-digit number: 42
   You entered the number forty-two
   ```

   

8. 修改第 7 章的编程题 5，使其包含如下函数：

   ```
   int compute_scrabble_value(const char *word);
   ```

   函数返回 `word` 所指向的字符串的拼字值。

   ```C
   #include<stdio.h>
   #include<ctype.h>
   
   #define SIZE 100
   
   int compute_scrabble_value(const char *word);
   
   int main(void)
   {
       char word[SIZE];
   
       printf("Enter a word: ");
       scanf("%s", word);
   
       printf("Scrabble value: %d\n", compute_scrabble_value(word));
       return 0;
   }
   
   int compute_scrabble_value(const char *word)
   {
       int sum = 0;
       const char *p = word;
       while(*p)
       {
           char ch = toupper(*p);
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
               sum += 3;
           }
           // K
           if(ch == 'K')
           {
               sum += 4;
           }
           // JX
           if(ch == 'J' || ch == 'X')
           {
               sum += 5;
           }
           // QZ
           if(ch == 'Q' || ch == 'Z')
           {
               sum += 5;
           }
           p ++;
       }
       return sum;
   }
   ```

   ```
   alancong@AlanCongdeMacBook-Air chapter_13 % ./a.out
   Enter a word: QUIZ
   Scrabble value: 12
   ```

   

9. 修改第 7 章的编程题 10，使其包含如下函数：

   ```
   int compute_vowel_count(const char *sentence);
   ```

   函数返回 `sentence` 所指向的字符串中元音字母的个数。

   ```C
   #include<stdio.h>
   #include<ctype.h>
   
   #define SIZE 100
   
   int compute_vowel_count(const char *sentence);
   
   int main(void)
   {
       char sentence[SIZE], ch;
       int i = 0;
   
       printf("Enter a sentence: ");
       while((ch = getchar()) != '\n')
       {
           sentence[i ++] = ch;
       }
       sentence[i] = '\0';
   
       printf("Your sentence contains %d vowels.\n", compute_vowel_count(sentence));
   
       return 0;
   }
   
   int compute_vowel_count(const char *sentence)
   {
       int sum = 0;
       const char *p = sentence;
   
       while(*p)
       {
           char ch = toupper(*p);
           if(ch == 'A' || ch == 'E' || ch == 'I' || ch == 'O' || ch == 'U')
               sum ++;
           p ++;
       }
       return sum;
   }
   ```

   ```
   alancong@AlanCongdeMacBook-Air chapter_13 % ./a.out 
   Enter a sentence: And that's the way it is.
   Your sentence contains 6 vowels.
   ```

   

10. 修改第 7 章的编程题 11，使其包含如下函数：

    ```
    void reverse_name(char *name);
    ```

    在参数 `name` 指向的字符串中，名在前、姓在后。在修改后的字符串中，姓在前，其后跟一个逗号和一个空格，然后是名的首字母，最后加一个点。原始的字符串中，名的前面、名和姓之间、姓的后面都可以有额外的空格。

    ```C
    #include <stdio.h>
    #include <ctype.h>
    #include <stdbool.h>
    
    #define SIZE 100
    
    void reverse_name(char *name);
    
    int main(void)
    {
        int i = 0;
        char name[SIZE], ch;
        printf("Enter a first and last name: ");
    
        while((ch = getchar()) != '\n')
            name[i ++] = ch;
        name[i] = '\0';
    
        reverse_name(name);
    
        return 0;
    }
    
    void reverse_name(char *name)
    {
        char *p = name, firstLetter;
        while(isspace(*p))
            p ++;
        firstLetter = *p;
    
        while(!isspace(*p))
            p ++;
    
        while(isspace(*p))
            p ++;
    
        while(*p && !isspace(*p))
            printf("%c", *p++);
        
        printf(", %c\n", firstLetter);
    }
    ```

    ```
    alancong@AlanCongdeMacBook-Air chapter_13 % ./a.out 
    Enter a first and last name:         Lloyd       Fosdick       
    Fosdick, L
    ```

    

11. 修改第 7 章的编程题 13，使其包含如下函数：

    ```
    double compute_average_word_length(const char *sentence);
    ```

    函数返回 `sentence` 所指向的字符串中单词的平均长度。

    ```C
    #include <stdio.h>
    
    #define SIZE 100
    
    double compute_average_word_length(const char *sentence);
    
    int main(void)
    {
        char sentence[SIZE], ch;
        int i = 0;
    
            printf("Enter a sentence: ");
        while((ch = getchar()) != '\n')
            sentence[i ++] = ch;
        sentence[i] = '\0';
    
        printf("Average word length: %.1f\n", compute_average_word_length(sentence));
        
        return 0;
    }
    
    double compute_average_word_length(const char *sentence)
    {
        int w_num = 1, c_num = 0;
        const char *p = sentence;
        double ave;
    
        while (*p)
        {
            if (*p == ' ')
                w_num++;
            else if (*p != ' ' && *p != '.')
                c_num++;
            p ++;
        }
        return c_num * 1.0f / w_num;
    }
    ```

    ```
    alancong@AlanCongdeMacBook-Air chapter_13 % ./a.out 
    Enter a sentence: It was deja vu all over again.
    Average word length: 3.3
    ```

    

12. 修改第 8 章的编程题 14，读取句子时把单词存储在一个二维的 `char` 类型数组中，每行存储一个单词。假定句子中的单词数不超过 30，且每个单词的长度都不超过 20 个字符。注意，要在每个单词的后面存储一个空字符，使其可以作为字符串处理。

    ```C
    #include <stdio.h>
    #include <string.h>
    #include <ctype.h>
    
    #define NUM 21
    #define LENGTH 31
    
    int main(void)
    {
        char word[NUM][LENGTH], ch, symbol;
        int number = 0, length = 0;
    
        printf("Enter a sentence: ");
    
        while ((ch = getchar()) != '\n')
        {
            if (ch == '?' || ch == '.' || ch == '!')
            {
                word[number][length] = '\0';
                symbol = ch;
                break;
            }
    
            if (!isspace(ch))
                word[number][length++] = ch;
            else
            {
                word[number][length] = '\0';
                number++;
                length = 0;
            }
        }
    
        for (int i = number; i >= 0; i--)
        {
            printf("%s", word[i]);
    
            if(i)
                printf(" ");
        }
        printf("%c\n", symbol);
    }
    ```

    ```
    alancong@AlanCongdeMacBook-Air chapter_13 % ./a.out 
    Enter a sentence: you can cage a swallow can't you?
    you can't swallow a cage can you?
    ```

    

13. 修改第 8 章的编程题 15，使其包含如下函数：

    ```
    void encrypt(char *message, int shift);
    ```

    参数 `message` 指向一个包含待加密消息的字符串，`shift` 表示消息中每个字母需要移动的位数。

    ```C
    #include <stdio.h>
    #include <ctype.h>
    
    void encrypt(char *message, int shift);
    
    int main(void)
    {
        int length = 0, shift;
        char ch, message[80];
    
        printf("Enter message to be encrypted: ");
        while ((ch = getchar()) != '\n')
            message[length ++] = ch;
        message[length] = '\0';
    
        printf("Enter shift amount (1-25): ");
        scanf("%d", &shift);
    
        encrypt(message, shift % 26);
    
        printf("Encrypted message: %s\n", message);
    
        return 0;
    }
    
    void encrypt(char *message, int shift)
    {
        char *p = message;
        while(*p)
        {
            if(isupper(*p))
                *p = ((*p - 'A') + shift) % 26 + 'A';
            else if(islower(*p))
                *p = ((*p - 'a') + shift) % 26 + 'a';
            p ++;
        }
    }
    ```

    ```
    alancong@AlanCongdeMacBook-Air chapter_13 % ./a.out 
    Enter message to be encrypted: Go ahead, make my day.
    Enter shift amount (1-25): 3
    Encrypted message: Jr dkhdg, pdnh pb gdb.
    alancong@AlanCongdeMacBook-Air chapter_13 % ./a.out
    Enter message to be encrypted: Jr dkhdg, pdnh pb gdb.
    Enter shift amount (1-25): 23
    Encrypted message: Go ahead, make my day.
    ```

    

14. 修改第 8 章的编程题 16，使其包含如下函数：

    ```
    bool are_anagrams(const char *word1, const char *word2);
    ```

    如果 `word1` 和 `word2` 指向的字符串是变位词，函数返回 `true`。

    ```C
    #include <stdio.h>
    #include <stdbool.h>
    #include <ctype.h>
    
    #define SIZE 100
    
    bool are_anagrams(const char *word1, const char *word2);
    
    int main(void)
    {
        char word1[SIZE], word2[SIZE];
    
        printf("Enter first word: ");
        scanf("%s", word1);
    
        printf("Enter second word: ");
        scanf("%s", word2);
    
        if (are_anagrams(word1, word2))
            printf("The words are anagrams.\n");
        else
            printf("The words are not anagrams.\n");
    
        return 0;
    }
    
    bool are_anagrams(const char *word1, const char *word2)
    {
        int sum = 0, count[26] = {0};
        const char *p = word1, *q = word2;
    
        while (*p)
        {
            if (isalpha(*p))
                count[tolower(*p++) - 'a']++;
            else
                p++;
        }
    
        while (*q)
        {
            if (isalpha(*q))
                count[tolower(*q++) - 'a']--;
            else
                q++;
        }
    
        for (int i = 0; i < 26; i++)
            sum += count[i];
    
        return sum == 0;
    }
    ```

    ```
    alancong@AlanCongdeMacBook-Air chapter_13 % ./a.out 
    Enter first word: smartlight
    Enter second word: lightsmart
    The words are anagrams.
    ```

    ```C
    // 笔记
    if(sum == 0)
            return true;
        else
            return false;
    // 可以优化为
    return sum == 0;
    ```

    

15. 修改第 10 章的编程题 6，使其包含如下函数：

    ```
    int evaluate_RPN_expression(const char *expression);
    ```

    函数返回 `expression` 指向的 RPN 表达式的值。

    ```C
    #include <stdio.h>
    #include <stdlib.h>
    #include <stdbool.h> /* C99 only */
    
    #define STACK_SIZE 100
    #define SIZE 100
    /* external variables */
    
    int contents[STACK_SIZE];
    int top = 0;
    
    void calculator(void);
    int evaluate_RPN_expression(const char *expression);
    
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
    
    int main(void)
    {
        while(1)
        {
            calculator();
        }
    
        return 0;
    }
    
    void calculator(void)
    {
        char ch, expression[SIZE];
        int i = 0;
    
        printf("Enter an RPN expression: ");
        while((ch = getchar()) != '\n')
            expression[i ++] = ch;
        expression[i] = '\0';
    
        printf("Value of expression: %d\n", evaluate_RPN_expression(expression));
    }
    
    int evaluate_RPN_expression(const char *expression)
    {
        const char *p = expression;
            int res, op1, op2;
    
        while(*p)
        {
            if(*p == 'q')
                exit(0);
            if(*p == '=')
            {
                res = pop();
                make_empty();
                return res;
            }
            if(*p == '+' || *p == '-' || *p == '*' || *p == '/')
            {
                op1 = pop();
                op2 = pop();
    
                switch (*p)
                {
                case '+':
                    res = op2 + op1;
                    push(res);
                    break;
                case '-':
                    res = op2 - op1;
                    push(res);
                    break;
                case '*':
                    res = op2 * op1;
                    push(res);
                    break;
                case '/':
                    res = op2 / op1;
                    push(res);
                    break;
                
                default:
                    break;
                }
            }
    
            if('0' <= *p && *p <= '9')
                push(*p - '0');
    
            p ++;
        }
        return 1;
    }
    ```

    ```
    alancong@AlanCongdeMacBook-Air chapter_13 % ./a.out 
    Enter an RPN expression: 1 2 3 * + =
    Value of expression: 7
    Enter an RPN expression: 5 8 * 4 9 - / =
    Value of expression: -8
    Enter an RPN expression: q
    ```

    

16. 修改第 12 章的编程题 1，使其包含如下函数：

    ```
    void reverse(char *message);
    ```

    函数的作用是反转 `message` 指向的字符串。提示：使用两个指针，初始时一个指向字符串的第一个字符，另一个指向最后一个字符；交换这两个字符，然后让两个指针相向移动；重复这一过程直到两个指针相遇。

    ```C
    #include <stdio.h>
    #include <string.h>
    #include <ctype.h>
    
    #define SIZE 100
    
    void reverse(char *message);
    
    int main(void)
    {
        char ch, arr[SIZE], *p;
        int i = 0;
    
        p = &arr[0];
    
        printf("Enter a message: ");
    
        while ((ch = getchar()) != '\n')
            arr[i++] = ch;
        arr[i] = '\0';
    
        reverse(arr);
    
        printf("Reversal is: %s\n", arr);
    
        return 0;
    }
    
    void reverse(char *message)
    {
        char *p = message, *q = message + strlen(message) - 1, temp;
        while (p < q)
        {
            temp = *p;
            *p = *q;
            *q = temp;
    
            p++;
            q--;
        }
    }
    ```

    ```
    alancong@AlanCongdeMacBook-Air chapter_13 % ./a.out 
    Enter a message: Don't get mad, get even.
    Reversal is: .neve teg ,dam teg t'noD
    ```

    

17. 修改第 12 章的编程题 2，使其包含如下函数：

    ```
    bool is_palindrome(const char *message);
    ```

    如果 `message` 指向的字符串是回文，函数返回 `true`。

    ```C
    #include <stdio.h>
    #include <stdbool.h>
    #include <string.h>
    #include <ctype.h>
    
    #define SIZE 100
    
    bool is_palindrome(const char *message);
    
    int main(void)
    {
        int i = 0;
        char ch, arr[SIZE];
        bool isPalindrome = true;
    
        printf("Enter a message: ");
        while ((ch = getchar()) != '\n')
            if ('a' <= tolower(ch) && tolower(ch) <= 'z')
                arr[i ++] = ch;
        arr[i] = '\0';
    
        if (is_palindrome(arr))
            printf("Palindrome\n");
        else
            printf("Not a palindrome\n");
    
        return 0;
    }
    
    bool is_palindrome(const char *message)
    {
        const char *start = message, *end;
        end = start + strlen(message) - 1;
    
        while (start < end)
        {
            if (tolower(*start ++) != tolower(*end --))
            {
                return false;
            }
        }
        return true;
    }
    ```

    ```
    alancong@AlanCongdeMacBook-Air chapter_13 % ./a.out 
    Enter a message: He lived as a devil, eh?
    Palindrome
    alancong@AlanCongdeMacBook-Air chapter_13 % ./a.out
    Enter a message: A man a plan a canal Panama
    Palindrome
    ```

    

18. 编写程序，按“月/日/年”的格式接受用户输入的日期，然后按“月 日，年”的格式显示，其中“月”用英文全名：

    ```
    Enter a date (mm/dd/yyyy): 2/17/2011
    You entered the date February 17, 2011
    ```

    用字符串指针数组存储月份的名字。

    ```C
    #include<string.h>
    #include<stdio.h>
    
    #define NUM_MONTHS 13
    
        const char *months[NUM_MONTHS] = {
            "", "January", "February", "March", "April", "May", "June", 
            "July", "August", "September", "October", "November", "December"
        };
    
    int main(void)
    {
        int year, month, day;
    
        printf("Enter a date (mm/dd/yyyy): ");
        scanf("%d/%d/%d", &month, &day, &year);
        printf("You entered the date %s %d, %d\n", months[month], day, year);
    
        return 0;
    }
    ```

    ```
    alancong@AlanCongdeMacBook-Air chapter_13 % ./a.out
    Enter a date (mm/dd/yyyy): 2/17/2011
    You entered the date February 17, 2011
    ```
