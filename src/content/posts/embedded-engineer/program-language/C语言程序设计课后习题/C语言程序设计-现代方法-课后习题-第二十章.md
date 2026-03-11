---
title: 《C语言程序设计-现代方法》-课后习题-第二十章
published: 2023-02-19
description: ''
image: ''
tags: []
category: '程序设计'
draft: false 
lang: ''
---

## 第二十章 底层程序设计

### 练习题

20.1 节  

1. 指出下面每一个代码段的输出。假定i、j和k都是unsigned short类型的变量。  

   ```C
   (a) i = 8; j = 9;  
   		printf("%d", i >> 1 + j >> 1);  
   (b) i = 1;  
   		printf("%d", i & ~i);  
   (c) i = 2; j = 1; k = 0;  
   		printf("%d", ~i & j ^ k);  
   (d) i = 7; j = 8; k = 9;  
   		printf("%d", i ^ j & k);  
   ```

   

2. 请说出如何简便地“切换”一个位（从0改为1或从1改为0）。通过编写一条语句切换变量i的第 4位来说明这种方法。  

3. 请解释下面的宏对它的实际参数起什么作用。假设参数具有相同类型。  

   ```
   #define M(x,y) ((x)^=(y),(y)^=(x),(x)^=(y)) 
   ```

4. 在计算机图形学中，颜色通常是用分别代表红、绿、蓝3种颜色的3个数存储的。假定每个数需要8 位来存储，而且我们希望将3个值一起存放在一个长整数中。请编写一个名为MK_COLOR的宏，使其包含3个参数（红、绿、蓝色的强度）。MK_COLOR 宏应该返回一个long 值，其中后3个字节分别包含红、绿和蓝色的强度（红作为最后一个字节，绿作为倒数第二个字节）。  

5. 编写名为GET_RED、GET_GREEN 和GET_BLUE 的宏，并以一个给定的颜色值作为参数（见练习题4），返回8位的红、绿、蓝色的强度。  

6. (a) 使用位运算符编写如下函数：  

   ```
   unsigned short swap_bytes(unsigned short i);
   ```

   函数swap_bytes 的返回值是将i的两个字节调换后产生的结果。（在大多数计算机中，短整数占两 个字节。）例如，假设i的值是0x1234（二进制形式为00010010 00110100），那么swap_bytes的 返回值应该为0x3412（二进制形式为00110100 00010010）。编写一个程序来测试你的函数。程序以 十六进制读入数，然后交换两个字节并显示出来：  

   ```
   Enter a hexadecimal number (up to four digits): 1234 
   Number with bytes swapped: 3412 
   ```

   提示：使用%hx转换来读入和输出十六进制数。  
   (b) 将swap_bytes 函数的函数体化简为一条语句。  

7. 编写如下函数：  

   ```
   unsigned int rotate_left(unsigned int i, int n);  
   unsigned int rotate_right(unsigned int i, int n);
   ```

   函数rotate_left 返回的值应是将i左移n位并将从左侧移出的位移入i右端而产生的结果。（例如，假定整数占32位，rotate_left(0x12345678, 4)将返回0x23456781。）函数rotate_right 也类似，只是将数字中的位向右循环移位。  

8. 假定函数f如下：  

   ```C
   unsigned int f(unsigned int i, int m, int n)  
   {    
     return (i >> (m + 1 - n)) & ~(~0 << n);   
   }
   ```


   (a) ~(~0 << n)的结果是什么？  
   (b) 函数 f的作用是什么？  

9. (a) 编写如下函数：  

   ```
   int count_ones(unsigned char ch);
   ```

   count_ones 应返回ch 中1的位数。  
   (b) 编写(a)中的函数，要求不使用循环。  

10. 编写如下函数：  
    unsigned int reverse_bits(unsigned int n);  
    reverse_bits 应返回一个无符号整数，该整数的数位与n完全相同但顺序相反。
    下面的每个宏定义了整数内部的单个位的位置：  

    ```C
    #define SHIFT_BIT  1  
    #define CTRL_BIT   2  
    #define ALT_BIT    4
    ```

    下面的语句希望测试这3个位中是否至少有一位被设置，但永远无法输出指定的消息。请解释原因，并修正该 语句。假设key_code是int类型的变量。  

    ```C
    if (key_code & (SHIFT_BIT | CTRL_BIT | ALT_BIT) == 0)   
      printf("No modifier keys pressed\n");
    ```

       

11. 下面的函数试图把两个字节组成一个无符号短整数。解释为什么函数不能工作，并给出你的修改 方案。  

    ```C
    unsigned short create_short(unsigned char high_byte,                             																	unsigned char low_byte)  
    {   
      return high_byte << 8 + low_byte;  
    }  
    ```

    

12. 如果 n 是一个unsigned int 类型的变量，下面的语句会对n中的位有什么影响？  

    ```
    n &= n – 1; 
    ```

     提示：考虑这条语句多次执行后对n的影响。  

20.2 节  

14. 当按照IEEE浮点标准存储浮点数时，一个float型的值由1个符号位（最左边的位或最高有效位）、 8个指数位以及23个小数位依次组成。请设计一个32位的结构类型，包含与符号、指数和小数相对应 的位域成员。声明位域的类型为unsigned int。请参考你所用编译器的用户手册来决定位域的顺序。  

14. (a) 假设变量 s 的声明如下：  

    ```C
    struct {   
      int flag: 1;   
    } s;
    ```

    在有些编译器下，执行下面的语句会显示1；但在另一些编译器下，输出是$-1$。请解释原因。  

    ```C
    s.flag = 1;  
    printf("%d\n", s.flag);
    ```

    (b) 如何避免这一问题？  

20.3 节  

16. 从 386处理器开始，x86的 CPU就有了32位的寄存器EAX、EBX、ECX和EDX。这些寄存器的一 半（最低有效位）分别与AX、BX、CX和DX一样。修改regs 联合，使其既包含原先的寄存器， 也包含这些寄存器。在联合中应进行相应的设置，使得修改EAX也会改动AX，修改AX也会改动 EAX 的低位部分。（其他新寄存器的工作机制也类似。）你需要在 word 和 byte 结构中增加一些 “哑”成员分别对应EAX、EBX、ECX和EDX的另一半。声明新寄存器的类型为DWORD（双字）， 该类型应定义为unsigned long。不要忘记x86体系结构是采用小端方式的。

### 编程题

1. 设计一个联合类型，使一个32位的值既可以看作一个float类型的值，也可以看作练习题14中定义的结构。写一个程序将1存储在结构的符号字段，将128存储在指数字段，0存储在小数字段，然后按float 值的形式显示存储在联合中的值。（如果你的位域设置正确的话，结果应该是$-2.0$。） 
