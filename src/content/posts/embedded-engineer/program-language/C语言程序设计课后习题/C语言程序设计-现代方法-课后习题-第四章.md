---
title: 《C语言程序设计-现代方法》-课后习题-第四章
published: 2023-02-03
description: ''
image: ''
tags: []
category: '程序设计'
draft: false 
lang: ''
---

## 第四章 表达式
### 练习题

1. 给出下列程序片段的输出结果。假设 i、j 和 k 都是 int 型变量。

   ```C
   (a) i = 5; 
   		j = 3; 
   		printf("%d %d", i / j, i % j); 
   (b) i = 2; 
   		j = 3; 
   		printf("%d", (i + 10) % j); 
   (c) i = 7; 
   		j = 8; 
   		k = 9; 
   		printf("%d", (i + 10) % k / j); 
   (d) i = 1; 
   		j = 2; 
   		k = 3; 
   		printf("%d", (i + 5) % (j + 2) / k); 
   ```

   ```C
   #include<stdio.h>
   int main(void)
   {
     int i, j, k;
     i = 5; 
     j = 3; 
     printf("%d %d\n", i / j, i % j);
     i = 2; 
     j = 3; 
     printf("%d\n", (i + 10) % j); 
     i = 7; 
     j = 8; 
     k = 9; 
     printf("%d\n", (i + 10) % k / j);
     i = 1; 
     j = 2; 
     k = 3; 
     printf("%d\n", (i + 5) % (j + 2) / k); 
     
     return 0;
   }
   ```

   输出：

   ```
   1 2
   0
   1
   0
   ```

   

2. 如果 i 和 j 都是正整数，(-i) / j 的值和-(i / j)的值是否总一样？验证你的答案。
   **ANS：**
   这个题我是认为出的有问题的，因为如果这两者的值是不相同的，那只能是在C89标准下不同的CPU环境中才能验证，因为C89标准之下在进行除法和取余运算的时候既可能向上舍入也可能向下舍入，但是在C99标准之下都是趋零截尾的，因此在C99标准之下都是相同的。

   ```
   cc -std=<标准> source.c -o output
   c89 / c90 : ANSI C 标准（早期版本）
   gnu89     : C89 + GNU 扩展
   c99       : ISO C99 标准
   gnu99     : C99 + GNU 扩展
   c11       : ISO C11 标准
   gnu11     : C11 + GNU 扩展
   ```

   

3. 下列表达式在 C89 中的值是多少？（如果表达式有多个可能的值，都列出来。）

   ```
   (a) 8 / 5 
   (b) -8 / 5 
   (c) 8 / -5 
   (d) -8 / -5 
   ```

   **ANS：**

   ```
   8 / 5 对于C89为1。
   -8 / 5 对于C89既可能是-1也可能是-2，需要视具体的实现。
   8 / -5 对于C89既可能是-1也可能是-2，需要视具体的实现。
   -8 / -5 对于C89既可能是-1也可能是-2，需要视具体的实现。
   纠正：最后一道题写错了，因为负号的优先级是最高的，因此这个相当于是8 / 5因此是确定性的1。
   ```

   ```C
   #include<stdio.h>
   int main(void)
   {
     printf("8 / 5 is %d\n", 8 / 5);
     printf("-8 / 5 is %d\n", -8 / 5);
     printf("8 / -5 is %d\n", 8 / -5);
     printf("-8 / -5 is %d\n", -8 / -5);
     
     return 0;
   }
   ```

   **输出：**

   ```
   使用的机器环境是MacbookAir M4
   Apple clang version 17.0.0 (clang-1700.3.19.1)
   Target: arm64-apple-darwin25.0.0
   Thread model: posix
   InstalledDir: /Library/Developer/CommandLineTools/usr/bin
   8 / 5 is 1
   -8 / 5 is -1
   8 / -5 is -1
   -8 / -5 is 1
   ```

   

4. 对 C99 重复上题。
   **ANS：**

   ```
   8 / 5 对于C99趋向于零截尾，因此是1。
   -8 / 5 对于C99趋向于零截尾，因此是-1。
   8 / -5 对于C99趋向于零截尾，因此是-1。
   -8 / -5 对于C99趋向于零截尾，因此是1。但是注意负号的优先级是最高的，这个相当于是8 / 5。
   ```

   ```C
   #include<stdio.h>
   int main(void)
   {
     printf("8 / 5 is %d\n", 8 / 5);
     printf("-8 / 5 is %d\n", -8 / 5);
     printf("8 / -5 is %d\n", 8 / -5);
     printf("-8 / -5 is %d\n", -8 / -5);
     
     return 0;
   }
   ```

   **输出：**

   ```
   8 / 5 is 1
   -8 / 5 is -1
   8 / -5 is -1
   -8 / -5 is 1
   ```

   

5. 下列表达式在 C89 中的值是多少？（如果表达式有多个可能的值，都列出来。）

   ```
   (a) 8 % 5 
   (b) -8 % 5 
   (c) 8 % -5 
   (d) -8 % -5 
   ```

   **ANS：**

   ```
   // 答案写错完了
   8 % 5 对于C89为3。
   -8 % 5 对于C89既可能是-3也可能是3，需要视具体的实现。
   8 % -5 对于C89既可能是-3也可能是-3，需要视具体的实现。
   -8 % -5 负号的优先级是最高的，因此这个相当于是8 % 5因此对于C89是确定性的3。
   ```

   ```C
   #include<stdio.h>
   int main(void)
   {
     printf("8 %% 5 is %d\n", 8 % 5);
     printf("-8 %% 5 is %d\n", -8 % 5);
     printf("8 %% -5 is %d\n", 8 % -5);
     printf("-8 %% -5 is %d\n", -8 % -5);
     
     return 0;
   }
   ```

   **输出：**

   ```
   使用的机器环境是MacbookAir M4
   Apple clang version 17.0.0 (clang-1700.3.19.1)
   Target: arm64-apple-darwin25.0.0
   Thread model: posix
   InstalledDir: /Library/Developer/CommandLineTools/usr/bin
   8 % 5 is 3
   -8 % 5 is -3
   8 % -5 is 3
   -8 % -5 is -3
   ```

   ```
   更正
   在C89标准中，操作数是负数时的除法运算比较容易理解，而操作数是负数时的模运算容易混淆，对此我们可以通过除法进行转换计算。由于C89和C99都要确保（ a / b ）* b + a % b的结果总是等于a，因此我们可以通过除法运算推算出模运算的结果，也就是说a % b == a - （ a / b ）* b，这样更加有利于理解。例如，C89下-9/7的结果可能为-1或者-2 。因此-9%7的值可能是-2或者5。
   
   参考答案
   (a) 8 % 5 的运算结果为3，操作数为整数，结果为余数。
   (b) -8 % 5 由于在C89下（-8/5）的运算结果为-1或者-2，因此-8%5的运算结果为-3或者2 。
   (c) 8 % -5 由于在C89下（8/-5）的运算结果为-1或者-2，因此-8%5的运算结果为-3或者2 。
   (d) -8 % -5 C89下（-8/-5）的运算结果为1，因此-8%-5的运算结果为-3 。
   ```

   

6. 对 C99 重复上题。

   ```C
   #include<stdio.h>
   int main(void)
   {
     printf("8 %% 5 is %d\n", 8 % 5);
     printf("-8 %% 5 is %d\n", -8 % 5);
     printf("8 %% -5 is %d\n", 8 % -5);
     printf("-8 %% -5 is %d\n", -8 % -5);
     
     return 0;
   }
   ```

   ```
   8 % 5 is 3
   -8 % 5 is -3
   8 % -5 is 3
   -8 % -5 is -3
   ```

   ```
   在C99标准中，操作数是负数时的除法运算比较容易理解，均是向0取整。此时模运算%的运算结果和运算符和操作数左侧操作数符号相同，可以沿用 a / b ）* b + a % b的结果总是等于a的定义，推测出模运算的结果。
   (a) 8 % 5 的运算结果为3，操作数为整数，结果为余数。
   (b) -8 % 5 由于在C99下（-8 / 5）的运算结果为-1，因此-8 % 5的运算结果为-3 。
   (c) 8 % -5 由于在C99下（8 / -5）的运算结果为-1，因此-8 % 5的运算结果为3
   (d) -8 % -5 由于在C99下（-8 / -5）的运算结果为1，因此-8 % 5的运算结果为-3
   ```

   

7. 本章计算 UPC 校验位方法的最后几步是：把总的结果减去 1，相减后的结果除以 10 取余数，用 9 减去余数。换成下面的步骤也可以：总的结果除以 10 取余数，用 10 减去余数。这样做为什么可行？
   **这道题不会，看的习题解析**

   ```
   该章中的UPC校验方法可以表示为：首先把第1位、第3位、第5位、第7位、第9位和第11位数字相加；然后把第2位、第4位、第6位、第8位和第10位数字相加；接着把第一次加法的结果乘以3，再和第二次加法的结果相加；随后把上述结果减去1；相减后的结果除以10取余数；最后用9减去上一步得到的余数。
   检验过程中假设加法运算的结果为total，计算校验位的基本操作步骤可以表示为：9-((total-1)%10)。从公式化简似乎可以得到(10 - total % 10)。但是当我们考虑结果取值范围就会发现，原公式的取值范围是0~9；而化简后公式的取值范围是1~10，即当total为10的整数倍时，两者结果不同。其主要原因是不能将9-((total-1)%10)简单等价于(10 - total % 10)。原算法通过9求补数的方式保证了运算结果0的校验位是0，转换后不能保证该运算结果。
   
   也就是说，修改UPC校验算法为总的结果除以10取余数，用10减去余数的方式与原有方式所生成的校验位在实际应用中可行，但是并不能保证与原有计算方法完全一致。
   ```

   

8. 如果把表达式 `9 - ((total - 1) % 10)`改成`(10 - (total % 10)) % 10`，upc.c程序是否仍然正确？
   **这道题不会，看的习题解析**

   ```
   参考练习题7，UPC校验方法中如果将表达式替换为(10 - (total % 10)) % 10，其运算结果是正确的。先将表达式9 - ((total - 1) % 10)转换成(10 - total % 10)，再对10取模，就可以保证校验位正确地转换。再次取模的目的是按10求补数后，将0的补数转化成最终校验位0 。
   
   也就是说，UPC校验程序使用(10 - (total % 10)) % 10的计算方法可以实现与9 - ((total - 1) % 10)相同的效果，因此是正确的。
   ```

   

9. 给出下列程序片段的输出结果。假设 i、j 和 k 都是 int 型变量。

   ```
   (a) i = 7; 
   		j = 8;
   		i *= j + 1; 
   		printf("%d %d", i, j);
   (b) i = j = k = 1;  
   		i += j += k; 
   		printf("%d %d %d", i, j, k); 
   (c) i = 1; 
   		j = 2; 
   		k = 3; 
   		i -= j -= k; 
   		printf("%d %d %d", i, j, k); 
   (d) i = 2; 
   		j = 1; 
   		k = 0; 
   		i *= j *= k;  
   		printf("%d %d %d", i, j, k); 
   ```

   ```C
   #include<stdio.h>
   int main(void)
   {
     	int i, j, k;
     	i = 7; 
   		j = 8;
   		i *= j + 1; 
   		printf("%d %d\n", i, j);
   		i = j = k = 1;  
   		i += j += k; 
   		printf("%d %d %d\n", i, j, k); 
   		i = 1; 
   		j = 2; 
   		k = 3; 
   		i -= j -= k; 
   		printf("%d %d %d\n", i, j, k); 
   		i = 2; 
   		j = 1; 
   		k = 0; 
   		i *= j *= k;  
   		printf("%d %d %d\n", i, j, k); 
     
     return 0;
   }
   ```

   ```
   63 8
   3 2 1
   2 -1 3
   0 0 0
   ```

   

10. 给出下列程序片段的输出结果。假设 i 和 j 都是 int 型变量。

    ```
    (a) i = 6;  
    		j = i += i; 
    		printf("%d %d", i, j); 
    (b) i = 5; 
    		j = (i -= 2) + 1;  
    		printf("%d %d", i, j); 
    (c) i = 7; 
    		j = 6 + (i = 2.5); 
    		printf("%d %d", i, j); 
    (d) i = 2; 
    		j = 8; 
    		j = (i = 6) + (j = 3); 
    		printf("%d %d", i, j); 
    ```

    ```C
    #include<stdio.h>
    int main(void)
    {
      	int i, j;
      	i = 6;  
    		j = i += i; 
    		printf("%d %d\n", i, j); 
    		i = 5; 
    		j = (i -= 2) + 1;  
    		printf("%d %d\n", i, j); 
    		i = 7; 
    		j = 6 + (i = 2.5); 
    		printf("%d %d\n", i, j); 
    		i = 2; 
    		j = 8; 
    		j = (i = 6) + (j = 3); 
    		printf("%d %d\n", i, j); 
      
      	return 0;
    }
    ```

    ```
    12 12
    3 4
    2.5 8.5 // 这个写错了，注意输出，变量要服从格式符！所以应该是2 8
    6 9
    ```

    

11. 给出下列程序片段的输出结果。假设 i、j 和 k 都是 int 型变量。

    ```C
    (a) i = 1; 
    		printf("%d ", i++ - 1); 
    		printf("%d", i); 
    (b) i = 10; 
    		j = 5; 
    		printf("%d ", i++ - ++j); 
    		printf("%d %d", i, j); 
    (c) i = 7; 
    		j = 8; 	
    		printf("%d ", i++ - --j); 
    		printf("%d %d", i, j); 
    (d) i = 3; 
    		j = 4; 
    		k = 5; 
    		printf("%d ", i++ - j++ + --k); 
    		printf("%d %d %d", i, j, k); 
    ```

    ```C
    #include<stdio.h>
    int main(void)
    {
    		int i, j, k;
    		i = 1; 
    		printf("%d \n", i++ - 1); 
    		printf("%d\n", i); 
    		i = 10; 
    		j = 5; 
    		printf("%d \n", i++ - ++j); 
    		printf("%d %d\n", i, j); 
    		i = 7; 
    		j = 8; 	
    		printf("%d \n", i++ - --j); 
    		printf("%d %d\n", i, j); 
    		i = 3; 
    		j = 4; 
    		k = 5; 
    		printf("%d \n", i++ - j++ + --k); 
    		printf("%d %d %d\n", i, j, k); 
    		
    		return 0;
    }
    ```

    ```
    0
    2
    4
    11 6
    0
    8 7
    3
    4 5 4
    ```

    

12. 给出下列程序片段的输出结果。假设 i 和 j 都是 int 型变量。

    ```C
    (a) i = 5; 
    		j = ++i * 3 – 2; 
    		printf("%d %d", i, j); 
    (b) i = 5; 
    		j = 3 – 2 * i++; 
    		printf("%d %d", i, j);
    (c) i = 7; 
    		j = 3 * i-- + 2; 
    		printf("%d %d", i, j); 
    (d) i = 7; 
    		j = 3 + --i * 2; 
    		printf("%d %d", i, j); 
    ```

    ```C
    #include<stdio.h>
    int main(void)
    {
    	int i, j;
      i = 5; 
      j = ++i * 3 - 2; 
      printf("%d %d\n", i, j);
      i = 5; 
      j = 3 - 2 * i++; 
      printf("%d %d\n", i, j);
      i = 7; 
      j = 3 * i-- + 2; 
      printf("%d %d\n", i, j);
      i = 7; 
      j = 3 + --i * 2; 
      printf("%d %d\n", i, j);
      
      return 0;
    }
    ```

    ```
    6 16
    6 -7
    6 23
    6 15
    ```

    

13. 表达式++i 和 i++中只有一个是与表达式(i += 1)完全相同的，是哪一个呢？验证你的答案。

    ```
    // 表达式 ++i和(i += 1)的值相同，因为++i表达式的值为i+1，和(i += 1)相同，但i++表达式的值是1。
    ```

    ```C
    #include<stdio.h>
    int main(void)
    {
    	int i = 1;
      printf("++i = %d", ++i);
      i = 1;
      printf("i++ = %d", i++);
      i = 1;
      printf("(i += 1) = %d", (i += 1);
      
      return 0;
    }
    ```

    ```
    ++i = 2
    i++ = 1
    (i += 1) = 2
    ```

    

14. 添加圆括号，说明 C 语言编译器如何解释下列表达式。

    ```
    (a) a * b – c * d + e 
    (b) a / b % c / d
    (c) – a – b + c - + d
    (d) a * - b / c - d
    ```

    ```
    (a) (((a * b) – (c * d)) + e) 
    (b) (((a / b) % c) / d)
    (c) ((((– a) – b) + c) - (+ d))
    (d) (((a * (- b)) / c) - d)
    ```

    

15. 给出下列每条表达式语句执行以后 i 和 j 的值。（假设 i 的初始值为 1，j 的初始值为 2。）

    ```
    (a) i += j; 
    (b) i--;
    (c) i * j / i; 
    (d) i % ++j;
    ```

    ```C
    #include<stdio.h>
    int main(void)
    {
    	int i, j;
    	i = 1, j = 2;
      printf("i += j = %d\n", i += j);
      printf("i-- = %d\n", i--);
      printf("i * j / i = %d\n", i * j / i);
      printf("i %% ++j = %d\n", i % ++j);
      
      return 0;
    }
    ```

    ```
    3
    2 // 这个地方是一个陷阱，我写成了i的值，其实要写出表达式的值，i的值在表达式的值算出之后才会产生副作用。
    2
    2
    
    电脑程序输出结果
    i += j = 3
    i-- = 3
    i * j / i = 2
    i % ++j = 2
    ```

    

### 编程题

1. 编写一个程序，要求用户输入一个两位数，然后按数位的逆序打印出这个数。程序会话应类似下面这样：

   ```
   Enter a two-digit number: 28
   The reversal is: 82 
   ```

   用%d 读入两位数，然后分解成两个数字。提示：如果 n 是整数，那么 n % 10 是个位数，而 n / 10则是移除个位数后剩下的数。
   **ANS:**

   ```C
   #include<stdio.h>
   int main(void)
   {
       int number, first, second;
       printf("Enter a two-digit number:");
       scanf("%d", &number);
       first = number % 10;
       second = (number / 10) % 10;
   
       printf("The reversal is: %d\n", first * 10 + second);
       return 0;
   }
   ```

   

2. 扩展上题中的程序，使其可以处理 3 位数。
   **ANS:**

   ```C
   #include<stdio.h>
   int main(void)
   {
       int number, first, second, third;
       printf("Enter a two-digit number:");
       scanf("%d", &number);
       first = number % 10;
       second = (number / 10) % 10;
       third = number / 10 / 10;
   
       printf("The reversal is: %d\n", first * 100 + second * 10 + third);
       return 0;
   }
   ```

   

3. 重新编写编程题2中的程序，使新程序不需要利用算术分割就可以显示出3位数的逆序。提示：参考4.1 节的 upc.c 程序。
   **ANS:**

   ```C
   #include<stdio.h>
   int main(void)
   {
       int number, first, second, third;
       printf("Enter a two-digit number: ");
       scanf("%1d%1d%1d", &third, &second, &first);
   
       printf("The reversal is: %1d%1d%1d\n", first, second, third);
       return 0;
   }
   ```

   

4. 编写一个程序，读入用户输入的整数并按八进制（基数为 8）显示出来：

   ```
   Enter a number between 0 and 32767: 1953
   In octal, your number is: 03641 
   ```

   输出应为 5 位数，即便不需要这么多数位也要如此。提示：要把一个数转换成八进制，首先将其除以 8，所得的余数是八进制数的最后一位（本例中为 1）；然后把原始的数除以 8，对除法结果重复上述过程，得到倒数第二位。（如第 7 章所示，printf 可以显示八进制的数，所以这个程序实际上有更简单的写法。）
   **ANS:**

   ```C
   #include<stdio.h>
   int main(void)
   {
       int number, o1, o2, o3, o4, o5;
       printf("Enter a number between 0 and 32767: ");
       scanf("%d", &number);
   
       o5 = number % 8;
       number /= 8;
       o4 = number % 8;
       number /= 8;
       o3 = number % 8;
       number /= 8;
       o2 = number % 8;
       number /= 8;
       o1 = number % 8;
       number /= 8;
   
       printf("In octal, your number is: %1d%1d%1d%1d%1d\n", o1, o2, o3, o4, o5);
   
       return 0;
   }
   ```

   

5. 重写 4.1 节的 upc.c 程序，使用户可以一次输入 11 位数字，而不用先输入 1 位，再输入 5 位，最后再输入 5 位。

   ```
   Enter the first 11 digits of a UPC: 01380015173
   Check digit: 5 
   ```

   **ANS:**

   ```C
   #include <stdio.h>
   
   int main(void)
   {
       int d, i1, i2, i3, i4, i5, j1, j2, j3, j4, j5,
         first_sum, second_sum, total;
   
       printf("Enter the first 11 digits of a UPC: ");
       scanf("%1d%1d%1d%1d%1d%1d%1d%1d%1d%1d%1d", &d, &i1, &i2, &i3, &i4, &i5,
                                               &j1, &j2, &j3, &j4, &j5);
       first_sum = d + i2 + i4 + j1 + j3 + j5;
       second_sum = i1 + i3 + i5 + j2 + j4;
       total = 3 * first_sum + second_sum;
   
       printf("Check digit: %d\n", 9 - ((total - 1) % 10));
   
       return 0;
   }
   ```

   

6. 欧洲国家及地区不使用北美的 12 位通用产品代码（UPC），而使用 13 位的欧洲商品编码（European Article Number, EAN）。跟 UPC 一样，每个 EAN 码的最后也有一个校验位。计算校验位的方法也类似：首先把第 2位、第 4位、第 6位、第 8位、第 10位和第 12位数字相加；然后把第 1位、第 3位、第 5 位、第 7 位、第 9 位和第 11位数字相加；接着把第一次加法的结果乘以 3，再和第二次加法的结果相加；随后，再把上述结果减去 1；相减后的结果除以 10 取余数；最后用 9 减去上一步骤中得到的余数。

   以 Güllüoglu 牌土耳其软糖（开心果和椰子口味）为例，其 EAN 码为 8691484260008。第一个和为6+1+8+2+0+0=17，第二个和为 8+9+4+4+6+0=31。第一个和乘以 3 再加上第二个和得到 82，减 1 得到 81。这个结果除以 10 的余数是 1，再用 9 减去余数得到 8，与原始编码的最后一位一致。请修改
   4.1 节的 upc.c 程序以计算 EAN 的校验位。用户把 EAN 的前 12 位当作一个数输入：

   ```
   Enter the first 12 digits of an EAN: 869148426000
   Check digit: 8
   ```

   **ANS:**

   ```C
   #include <stdio.h>
   
   int main(void)
   {
       int d, i1, i2, i3, i4, i5, j1, j2, j3, j4, j5, j6,
         first_sum, second_sum, total;
   
       printf("Enter the first 11 digits of an EAN: ");
       scanf("%1d%1d%1d%1d%1d%1d%1d%1d%1d%1d%1d%1d", &d, &i1, &i2, &i3, &i4, &i5,
                                               &j1, &j2, &j3, &j4, &j5, &j6);
       first_sum = d + i2 + i4 + j1 + j3 + j5;
       second_sum = i1 + i3 + i5 + j2 + j4 + j6;
       total =first_sum + second_sum * 3;
   
       printf("Check digit: %d\n", 9 - ((total - 1) % 10));
   
       return 0;
   }
   ```