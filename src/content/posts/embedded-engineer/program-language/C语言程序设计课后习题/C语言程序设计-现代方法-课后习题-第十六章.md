---
title: 《C语言程序设计-现代方法》-课后习题-第十六章
published: 2023-02-15
description: ''
image: ''
tags: []
category: '程序设计'
draft: false 
lang: ''
---

## 第十六章 结构、联合和枚举

### 练习题

16.1 节  

1. 在下列声明中，结构x和结构y都拥有名为x和y的成员：

   ```C
   struct { int x,  y; } x;
   struct { int x,  y; } y; 
   ```

   单独出现时，这两个声明是否合法？两个声明是否可以同时出现在程序中呢？验证你的答案。  

   ```
   两个声明单独存在时都是合法的。它们分别定义了匿名结构体类型并创建变量 x 和 y，每个结构体包含名为 x 和 y 的成员。即使两个声明同时出现，它们也是合法的，因为成员名在结构体作用域内互不冲突，访问成员时通过结构体变量限定。
   ```

   ```C
   #include <stdio.h>
   
   int main(void)
   {
       struct { int x,  y; } x;
       struct { int x,  y; } y; 
   
       x.x = 1;
       x.y = 2;
   
       y.x = 3;
       y.y = 4;
       
       printf("x: %d %d\n", x.x, x.y);
       printf("y: %d %d\n", y.x, y.y);
   
       return 0;
   }
   ```

   ```
   alancong@AlanCongdeMacBook-Air chapter_16 % ./a.out 
   x: 1 2
   y: 3 4
   ```

   

2. (a) 声明名为 c1、c2 和c3 的结构变量，每个结构变量都拥有double类型的成员real和imaginary。  
   (b) 修改(a)中的声明，使c1的成员初始值为0.0和1.0，c2的成员初始值为1.0和0.0。（c3不初始化。）  
   (c) 编写语句把c2的成员复制给c1。这项操作可以在一条语句中完成，还是必须要两条语句？  
   (d) 编写语句把c1和c2的对应成员相加，并且把结果存储在c3中。  

   ```C
   (a)
   
   struct {
     double real, imaginary;
   } c1, c2, c3;
   (b)
   
   struct {
     double real, imaginary;
   } c1 = {0.0, 1.0}, c2 = {1.0, 0.0}, c3;
   (c) Only one statement is necessary:
   
   c1 = c2;
   (d)
   
   c3.real = c1.real + c2.real;
   c3.imaginary = c1.imaginary + c2.imaginary;
   ```

   ```C
   #include <stdio.h>
   
   int main(void)
   {
       struct {double real, imaginary} c1 = {0.0, 0.1}, c2 = {1.0, 0.0}, c3;
   
       printf("c1: real is : %.2f, imaginary is : %.2f\n", c1.real, c1.imaginary);
       printf("c2: real is : %.2f, imaginary is : %.2f\n", c2.real, c2.imaginary);
       
       c1 = c2;
   
       c3.real = c1.real + c2.real;
       c3.imaginary = c1.imaginary + c2.imaginary;
   
       printf("c3: real is : %.2f, imaginary is : %.2f\n", c3.real, c3.imaginary);
   
       return 0;
   }
   ```

   ```
   alancong@AlanCongdeMacBook-Air chapter_16 % ./a.out 
   c1: real is : 0.00, imaginary is : 0.10
   c2: real is : 1.00, imaginary is : 0.00
   c3: real is : 2.00, imaginary is : 0.00
   ```

   

16.2 节  

3. (a) 说明如何为具有double 类型的成员real和imaginary 的结构声明名为complex的标记。  
   (b) 利用标记complex 来声明名为c1、c2和c3的变量。  
   (c) 编写名为 make_complex 的函数，此函数用来把两个实际参数（类型都是 double 类型）存储在 complex 结构中，然后返回此结构。  
   (d) 编写名为add_complex 的函数，此函数用来把两个实际参数（都是complex结构）的对应成员相加，然后返回结果（另一个complex结构）。  

   ```C
   (a) 
   	struct complex {double real, imaginary;};
   (b)
   	struct complex c1, c2, c3;
   (c)
   	struct complex make_complex(double real, double imaginary)
     {
       struct complex c;
       
       c.real = real;
       c.imaginary = imaginary;
       
       return c;
     }
   (d)
   	struct complex add_complex(struct complex c1, struct complex c2)
     {
      	struct complex c;
       c.real = c1.real + c2.real;
       c.imaginary = c1.imaginary + c2.imaginary;
       
       return c;
     }
   ```

   ```C
   #include <stdio.h>
   
   struct complex
   {
       double real, imaginary;
   };
   
   struct complex c1, c2, c3;
   
   struct complex make_complex(double real, double imaginary)
   {
       struct complex c;
   
       c.real = real;
       c.imaginary = imaginary;
   
       return c;
   }
   
   struct complex add_complex(struct complex c1, struct complex c2)
   {
       struct complex c;
       c.real = c1.real + c2.real;
       c.imaginary = c1.imaginary + c2.imaginary;
   
       return c;
   }
   
   int main(void)
   {
       c1.real = 1.0, c1.imaginary = 2.0;
       c2.real = 3.0, c2.imaginary = 4.0;
   
       printf("c1: real is : %.2f, imaginary is : %.2f\n", c1.real, c1.imaginary);
       printf("c2: real is : %.2f, imaginary is : %.2f\n", c2.real, c2.imaginary);
   
       printf("Plus c1 and c2.\n");
       c3 = add_complex(c1, c2);
   
       printf("c3: real is : %.2f, imaginary is : %.2f\n", c3.real, c3.imaginary);
   
       printf("Plus c1 and c2.\n");
       c1 = make_complex(5.0, 6.0);
       
       printf("c1: real is : %.2f, imaginary is : %.2f\n", c1.real, c1.imaginary);
       printf("c2: real is : %.2f, imaginary is : %.2f\n", c2.real, c2.imaginary);
       printf("c3: real is : %.2f, imaginary is : %.2f\n", c3.real, c3.imaginary);
   
       return 0;
   }
   ```

   ```
   alancong@AlanCongdeMacBook-Air chapter_16 % ./a.out 
   c1: real is : 1.00, imaginary is : 2.00
   c2: real is : 3.00, imaginary is : 4.00
   c3: real is : 4.00, imaginary is : 6.00
   c1: real is : 5.00, imaginary is : 6.00
   c2: real is : 3.00, imaginary is : 4.00
   c3: real is : 4.00, imaginary is : 6.00
   ```

4. 重做练习题3，这次要求使用名为Complex的类型。  

   ```C
   (a)
   	typedef struct {
       double real, imaginary;
     } Complex;
   (b) Complex c1, c2, c3;
   (c)
   	Complex make_complex(double real, double imaginary)
     {
       Complex c;
       
       c.real = real;
       c.imaginary = imaginary;
       
       return c;
     }
   (d)
   	Complex add_complex(Complex c1, Complex c2)
     {
       Complex c3;
       
       c3.real = c1.real + c2.real;
       c3.imaginary = c1.imaginary + c2.imaginary;
       
       return c3;
     }
   ```

   ```C
   #include <stdio.h>
   
   typedef struct
   {
       double real, imaginary;
   } Complex;
   
   Complex make_complex(double real, double imaginary)
   {
       Complex c;
   
       c.real = real;
       c.imaginary = imaginary;
   
       return c;
   }
   
   Complex add_complex(Complex c1, Complex c2)
   {
       Complex c3;
   
       c3.real = c1.real + c2.real;
       c3.imaginary = c1.imaginary + c2.imaginary;
   
       return c3;
   }
   
   int main(void)
   {
       Complex c1, c2, c3;
   
       c1 = make_complex(1.0, 2.0);
       c2 = make_complex(3.0, 4.0);
   
       c3 = add_complex(c1, c2);
       printf("Now c3 is : %.2f, %.2f\n", c3.real, c3.imaginary);
   
       return 0;
   }
   ```

   ```
   alancong@AlanCongdeMacBook-Air chapter_16 % ./a.out 
   Now c3 is : 4.00, 6.00
   ```

5. 编写下列函数，假定date结构包含三个成员：month、day和year（都是int类型）。  
   (a) int day_of_year(struct date d);  
   返回d是一年中的第多少天（1~366范围内的整数）。  
   (b) int compare_dates(struct date d1, struct date d2);  
   如果日期d1在d2之前，返回-1；如果d1在d2之后，返回+1；如果d1和d2相等，返回0。 

   ```C
   #include <stdio.h>
   
   struct date {
       int year, month, day;
   };
   
   int days_in_months_common_year[13] = {0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31};
   int days_in_months_leap_year[13] = {0, 31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31};
   
   int day_of_year(struct date d);
   int compare_dates(struct date d1, struct date d2);
   
   int main(void)
   {
       struct date d1 = {2024, 12, 2}, d2 = {2023, 12, 3};
       printf("The day of year %d is %d\n", d1.year, day_of_year(d1));
   
       printf("The res is :%d\n", compare_dates(d1, d2));
   
       return 0;
   }
   
   int day_of_year(struct date d)
   {
       int day = 0;
       int *days = ((d.year % 4 == 0 && d.year % 100 != 0) || d.year % 400 == 0) ?
                       days_in_months_leap_year : days_in_months_common_year;
   
       for(int i = 1;i < d.month;i ++)
           day += days[i];
   
       return (day + d.day);
   }
   
   int compare_dates(struct date d1, struct date d2)
   {
       if(d1.year != d2.year)
       {
           if(d1.year > d2.year)
               return 1;
           else
               return -1;
       }
   
       int day_1 = day_of_year(d1);
       int day_2 = day_of_year(d2);
   
       if((day_1 - day_2) == 0)
           return 0;
       else if((day_1 - day_2) > 0)
           return 1;
       else
           return -1;
   }
   ```

   ```
   alancong@AlanCongdeMacBook-Air chapter_16 % ./a.out 
   The day of year 2024 is 337
   The res is :1
   ```

6. 编写下列函数，假定time结构包含三个成员：hours、minutes和seconds（都是int类型）。  
   struct time split_time(long total_seconds);  
   total_seconds 是从午夜开始的秒数。
   函数返回一个包含等价时间的结构，等价的时间用小时 （0~23）、分钟（0~59）和秒（0~59）表示。  

   ```C
   #include <stdio.h>
   
   struct time {
       int hours, minutes, seconds;
   };
   
   struct time split_time(long total_seconds);
   
   int main(void)
   {
       long total_seconds;
       struct time t;
   
       printf("Enter the seconds : ");
       scanf("%ld", &total_seconds);
   
       t = split_time(total_seconds);
       printf("%02d:%02d:%02d\n", t.hours, t.minutes, t.seconds);
   
       return 0;
   }
   
   struct time split_time(long total_seconds)
   {
       struct time t;
   
       total_seconds %= 24 * 60 * 60;
   
       t.seconds = total_seconds % 60;
       total_seconds /= 60;
   
       t.minutes = total_seconds % 60;
       total_seconds /= 60;
   
       t.hours = total_seconds;
   
       return t;
   }
   ```

   ```
   alancong@AlanCongdeMacBook-Air chapter_16 % ./a.out 
   Enter the seconds : 3600
   01:00:00
   ```

7. 假定fraction结构包含两个成员：numerator和denominator（都是int类型）。
   编写函数完成下 列分数运算。  
   (a) 把分数 f 化为最简形式。提示：为了把分数化为最简形式，首先计算分子和分母的最大公约数 （GCD），然后把分子和分母都除以该最大公约数。  
   (b) 把分数f1 和f2相加。  
   (c) 从分数f1 中减去分数f2。  
   (d) 把分数f1 和f2相乘。  
   (e) 用分数f1 除以分数f2。  
   分数f、f1和f2都是struct fraction类型的参数。每个函数返回一个struct fraction类型的值。(b)~(e)中函数返回的分式应为最简形式。提示：可以使用(a)中的函数辅助编写(b)~(e)中的函数。  

   ```C
   #include <stdio.h>
   #include <stdlib.h>
   
   #define REDUCE 1
   #define ADD 2
   #define SUBTRACT 3
   #define MULTIPLY 4
   #define DIVIDE 5
   
   struct fraction
   {
       int numerator, denominator;
   };
   
   int cal_gcd(int a, int b)
   {
       int temp;
   
       a = abs(a);
       b = abs(b);
   
       while (b != 0)
       {
           temp = b;
           b = a % b;
           a = temp;
       }
   
       return a;
   }
   
   struct fraction reduce_fraction(struct fraction f)
   {
       int gcd;
       gcd = cal_gcd(f.numerator, f.denominator);
   
       f.numerator /= gcd;
       f.denominator /= gcd;
   
       if (f.denominator < 0)
       {
           f.denominator = -f.denominator;
           f.numerator = -f.numerator;
       }
   
       return f;
   }
   
   struct fraction add_fraction(struct fraction f1, struct fraction f2)
   {
       struct fraction f;
       f.numerator = f1.numerator * f2.denominator + f2.numerator * f1.denominator;
       f.denominator = f1.denominator * f2.denominator;
   
       return reduce_fraction(f);
   }
   
   struct fraction subtract_fraction(struct fraction f1, struct fraction f2)
   {
       struct fraction f;
       f.numerator = f1.numerator * f2.denominator - f2.numerator * f1.denominator;
       f.denominator = f1.denominator * f2.denominator;
   
       return reduce_fraction(f);
   }
   
   struct fraction multiply_fraction(struct fraction f1, struct fraction f2)
   {
       struct fraction f;
       f.numerator = f1.numerator * f2.numerator;
       f.denominator = f1.denominator * f2.denominator;
   
       return reduce_fraction(f);
   }
   
   struct fraction divide_fraction(struct fraction f1, struct fraction f2)
   {
       struct fraction f;
       f.numerator = f1.numerator * f2.denominator;
       f.denominator = f1.denominator * f2.numerator;
   
       return reduce_fraction(f);
   }
   
   int main(void)
   {
       struct fraction f, f1, f2;
   
       for (;;)
       {
           int op;
           printf("Enter the fraction : (a/b)");
           scanf("%d/%d", &f1.numerator, &f1.denominator);
   
           if (f1.numerator == 0 && f1.denominator == 0)
           {
               printf("Exiting program...\n");
               return 0;
           }
   
           if (f1.denominator == 0)
           {
               printf("Error: denominator cannot be zero.\n");
               printf("Invalid input. Please try again.\n");
               continue;
           }
   
           printf("Choose an operation:\n");
           printf("1. Reduce a fraction\n");
           printf("2. Add two fractions\n");
           printf("3. Subtract two fractions\n");
           printf("4. Multiply two fractions\n");
           printf("5. Divide two fractions\n");
           printf("Enter your choice: ");
   
           scanf("%d", &op);
   
           if (op > 1)
           {
               printf("Enter the second fraction (c/d): ");
               scanf("%d/%d", &f2.numerator, &f2.denominator);
   
               if (f2.denominator == 0)
               {
                   printf("Error: denominator cannot be zero.\n");
                   printf("Invalid input. Please try again.\n");
                   continue;
               }
           }
   
           switch (op)
           {
           case REDUCE:
               f = reduce_fraction(f1);
               break;
           case ADD:
               f = add_fraction(f1, f2);
               break;
           case SUBTRACT:
               f = subtract_fraction(f1, f2);
               break;
           case MULTIPLY:
               f = multiply_fraction(f1, f2);
               break;
           case DIVIDE:
               if (f2.numerator == 0)
               {
                   printf("Error: cannot divide by a fraction whose numerator is 0.\n");
                   continue;
               }
               f = divide_fraction(f1, f2);
               break;
           default:
               printf("Invalid choice.\n");
               continue;
           }
           printf("The fraction in simplest form is: %d/%d\n", f.numerator, f.denominator);
       }
       return 0;
   }
   ```

   ```
   alancong@AlanCongdeMacBook-Air chapter_16 % ./a.out
   Enter the fraction : (a/b)1/2
   Choose an operation:
   1. Reduce a fraction
   2. Add two fractions
   3. Subtract two fractions
   4. Multiply two fractions
   5. Divide two fractions
   Enter your choice: 4
   Enter the second fraction (c/d): 1/4
   The fraction in simplest form is: 1/8
   Enter the fraction : (a/b)0/0
   Exiting program...
   ```

8. 设 color 是如下的结构：  

   ```C
   struct color {  
     int red;  
     int green;  
     int blue;  
   };  
   ```

   (a) 为 struct color 类型的 const 变量MAGENTA 编写声明，成员的值分别为255、0和255。
   (b)重复上题，但是使用指示器。要求不指定green的值，使其默认为0。  

   ```C
   (a)
   const struct color MAGENTA = {255, 0, 255};
   ```

   ```
   (b)
   const struct color MAGENTA = {.red = 255, .blue = 255};
   ```

   ```C
   #include <stdio.h>
   
   struct color {  
     int red;  
     int green;  
     int blue;  
   };  
   
   int main(void)
   {
       // const struct color MAGENTA = {255, 0, 255};
       const struct color MAGENTA = {.red = 255, .blue = 255};
   
       printf("red:%d, green:%d, blue:%d\n", MAGENTA.red, MAGENTA.green, MAGENTA.blue);
       return 0;
   }
   ```

9. 编写下列函数。（color结构的定义见练习题8。） 
   (a) struct color make_color(int red, int green, int blue);  函数返回一个包含指定的red、green和blue值的color结构。如果参数小于0，把结构的对应成员置为0。如果参数大于255，把结构的对应成员置为255。 
   (b) int getRed(struct color c);  函数返回c的red成员的值。 
   (c) bool equal_color(struct color color1, struct color color2);  如果color1 和color2 的对应成员相等，函数返回true。 
   (d) struct color brighter(struct color c);  函数返回一个表示颜色c的更亮版本的color 结构。该结构等同于c，但每个成员都除以了0.7 （把结果截断为整数）。但是，有３种特殊情形：

   ```
   (1) 如果c的所有成员都为0，函数返回一个所有成员的值都为3的颜色；
   (2) 如果c的任意成员比0大且比3小，那么在除以0.7之前将其置为 3；
   (3) 如果除以0.7之后得到了超过255的成员，将其置为255。  
   ```

   (e) struct color darker(struct color c);  函数返回一个表示颜色c的更暗版本的color 结构。该结构等同于c，但每个成员都乘以了0.7 （把结果截断为整数）。  

   ```C
   #include <stdio.h>
   #include <stdbool.h>
   
   struct color make_color(int red, int green, int blue);
   int getRed(struct color c);
   bool equal_color(struct color color1, struct color color2);
   struct color brighter(struct color c);
   struct color darker(struct color c);
   
   struct color
   {
       int red;
       int green;
       int blue;
   };
   
   int main(void)
   {
       // const struct color MAGENTA = {255, 0, 255};
       const struct color MAGENTA = {.red = 255, .blue = 255};
       struct color c;
   
       int color_red;
   
       printf("red:%d, green:%d, blue:%d\n", MAGENTA.red, MAGENTA.green, MAGENTA.blue);
   
       c = make_color(255, 255, 255);
       printf("red:%d, green:%d, blue:%d\n", c.red, c.green, c.blue);
       color_red = getRed(c);
       printf("The red color is : %d\n", color_red);
       if (equal_color(MAGENTA, c))
           printf("The two color vertor is equal!\n");
       else
           printf("The two color vertor is not equal!\n");
   
       c = brighter(c);
       printf("red:%d, green:%d, blue:%d\n", c.red, c.green, c.blue);
   
       c = darker(c);
       printf("red:%d, green:%d, blue:%d\n", c.red, c.green, c.blue);
   
       return 0;
   }
   
   struct color make_color(int red, int green, int blue)
   {
       struct color c;
   
       c.red = red > 255 ? 255 : (red < 0 ? 0 : red);
       c.green = green > 255 ? 255 : (green < 0 ? 0 : green);
       c.blue = blue > 255 ? 255 : (blue < 0 ? 0 : blue);
   
       return c;
   }
   
   int getRed(struct color c)
   {
       return c.red;
   }
   
   bool equal_color(struct color color1, struct color color2)
   {
       return ((color1.red == color2.red) &&
               (color1.green == color2.green) &&
               (color1.blue == color2.blue));
   }
   
   struct color brighter(struct color c)
   {
       if (c.red == 0 && c.green == 0 && c.blue == 0)
           c.red = c.green = c.blue = 3;
   
       if (0 < c.red && c.red < 3)
           c.red = 3;
       if (0 < c.green && c.green < 3)
           c.green = 3;
       if (0 < c.blue && c.blue < 3)
           c.blue = 3;
   
       c.red = (int)(c.red / 0.7);
       c.green = (int)(c.green / 0.7);
       c.blue = (int)(c.blue / 0.7);
   
       if (c.red > 255)
           c.red = 255;
       if (c.green > 255)
           c.green = 255;
       if (c.blue > 255)
           c.blue = 255;
   
       return c;
   }
   
   struct color darker(struct color c)
   {
       c.red = (int)(c.red * 0.7);
       c.green = (int)(c.green * 0.7);
       c.blue = (int)(c.blue * 0.7);
   
       return c;
   }
   ```

   ```
   alancong@AlanCongdeMacBook-Air chapter_16 % ./a.out 
   red:255, green:0, blue:255
   red:255, green:255, blue:255
   The red color is : 255
   The two color vertor is not equal!
   red:255, green:255, blue:255
   red:178, green:178, blue:178
   ```

   

16.3 节  

10. 下列结构用来存储图形屏幕上的对象信息。 
    `struct point { int x,  y; };` 
    `struct rectangle { struct point upper_left, lower_right; };` 
    结构point 用来存储屏幕上点的x和y坐标，结构rectangle用来存储矩形的左上和右下坐标点。 编写函数，要求可以在rectangle结构变量r上执行下列操作，且r作为实际参数传递。 
    (a) 计算 r的面积。 
    (b) 计算r的中心，并且把此中心作为point值返回。如果中心的x或y坐标不是整数，在point结 构中存储截断后的值。 
    (c) 将 r 沿x轴方向移动x个单位，沿 y 轴移动y个单位，返回r修改后的内容。（x和y是函数的另 外两个实际参数。） 
    (d) 确定点p是否位于r内，返回true或者false。（p是struct point类型的另外一个实际参数。）  

    ```C
    #include <stdio.h>
    #include <stdlib.h>
    #include <stdbool.h>
    
    struct point { int x,  y; };
    struct rectangle { struct point upper_left, lower_right; };
    
    int calculate_area(struct rectangle r);
    struct point calculate_center(struct rectangle r);
    bool isInPoint(struct rectangle r, struct point p);
    void move(struct rectangle *r, int x, int y);
    
    char *string;
    
    int main(void)
    {
        bool isInside = false;
        struct point p;
        struct rectangle r;
    
        printf("Enter upper-left coordinates :");
        scanf("%d%d", &r.upper_left.x, &r.upper_left.y);
        printf("Enter lower_right coordinates :");
        scanf("%d%d", &r.lower_right.x, &r.lower_right.y);
    
        printf("The area is: %d\n", calculate_area(r));
    
        p = calculate_center(r);
        printf("The center point is: (%d, %d)\n", p.x, p.y);
    
        printf("The rectangle before moving is:(%d, %d), (%d, %d)\n", r.upper_left.x, r.upper_left.y, r.lower_right.x, r.lower_right.y);
        move(&r, 1, 1);
        printf("The rectangle after moving is:(%d, %d), (%d, %d)\n", r.upper_left.x, r.upper_left.y, r.lower_right.x, r.lower_right.y);
    
    
        printf("Enter the point :");
        scanf("%d%d", &p.x, &p.y);
        string = isInPoint(r, p) ? "" : " NOT" ;
        printf("The point is%s inside the rectangle.\n", string);
    
        return 0;
    }
    
    int calculate_area(struct rectangle r)
    {
        return abs((r.upper_left.x - r.lower_right.x) * (r.upper_left.y - r.lower_right.y));
    }
    
    struct point calculate_center(struct rectangle r)
    {
        struct point p;
    
        p.x = (r.upper_left.x + r.lower_right.x) / 2;
        p.y = (r.upper_left.y + r.lower_right.y) / 2;
    
        return p;
    }
    
    void move(struct rectangle *r, int x, int y)
    {
        (*r).upper_left.x += x;
        (*r).lower_right.x += x;
    
        (*r).upper_left.y += y;
        (*r).lower_right.y += y;
    }
    
    bool isInPoint(struct rectangle r, struct point p)
    {
        return ((r.lower_right.x <= p.x && p.x <= r.upper_left.x && r.upper_left.y <= p.y && p.y <= r.lower_right.y));
    }
    ```

    ```
    alancong@AlanCongdeMacBook-Air chapter_16 % ./a.out 
    Enter upper-left coordinates :12 0
    Enter lower_right coordinates : 0 12
    The area is: 144
    The center point is: (6, 6)
    The rectangle before moving is:(12, 0), (0, 12)
    The rectangle after moving is:(13, 1), (1, 13)
    Enter the point :12 12 
    The point is inside the rectangle.
    ```

    

16.4 节  

11. 假设s是如下结构：  

    ```C
    struct {   
      double a;   
      union {     
        char b[4];     
        double c;     
        int d;   
      } e;   
      char f[4];  
    } s; 
    ```

    如果char类型值占1字节，int类型值占4字节，double类型值占8字节，那么C编译器将为s分配多大的内存空间？（假设编译器没有在成员之间留“空洞”。）  

    ```
    结构体 s 的内存大小由其各成员顺序累加（题目已说明不考虑任何对齐或填充字节）：
    
    1. 成员 a 的类型是 double，占 8 字节。
    2. 成员 e 是一个 union，其中包含：
          - char b[4] → 4 字节
          - double c → 8 字节
          - int d → 4 字节
       联合体的大小等于最大成员的大小，因此 e 占 8 字节。
    3. 成员 f 的类型是 char[4]，占 4 字节。
    
    因此整个结构体的大小为：
    8（a）+ 8（e）+ 4（f）= 20 字节。
    ```


​    

12. 假设u是如下联合：

    ```C
    union
    {
        double a;
        struct
        {
            char b[4];
            double c;
            int d;
        } e;
        char f[4];
    } u;
    ```

    如果char类型值占1字节，int类型值占4字节，double类型值占8字节，那么C编译器将为u分配多大的内存空间？（假设编译器没有在成员之间留“空洞”。）  

    ```
    联合 u 的大小等于其最大成员的大小（题目已说明不考虑对齐填充）。
    
    1. 成员 a 的类型为 double，占 8 字节。
    2. 成员 e 是一个结构体，包含：
           • char b[4] → 4 字节
           • double c  → 8 字节
           • int d     → 4 字节
       结构体大小为成员大小之和，因此 e 占 4 + 8 + 4 = 16 字节。
    3. 成员 f 的类型为 char[4]，占 4 字节。
    
    因此联合 u 的大小为：
    max(8, 16, 4) = 16 字节。
    ```

13. 假设s是如下结构（point是在练习题10中声明的结构标记）：

    ```C
    struct point { int x,  y; };
    struct rectangle { struct point upper_left, lower_right; }; 
    ```

    ```C
    struct shape
    {
        int shape_kind;      /* RECTANGLE or CIRCLE */
        struct point center; /* coordinates of center */
        union
        {
            struct
            {
                int height, width;
            } rectangle;
            struct
            {
                int radius;
            } circle;
        } u;
    } s;
    ```

    如果 shape_kind 的值为 RECTANGLE，那么 height 和 width 成员分别存储矩形的两维。如果 shape_kind的值为CIRCLE，那么radius成员存储圆形的半径。请指出下列哪些语句是合法的，并 说明如何修改不合法的语句。  

    ```
    (a) s.shape_kind = RECTANGLE;  
    (b) s.center.x = 10;  
    (c) s.height = 25;  
    (d) s.u.rectangle.width = 8;  
    (e) s.u.circle = 5;  
    (f) s.u.radius = 5;  
    ```

    ```C
    (a) s.shape_kind = RECTANGLE;
    // 合法：shape_kind 是 struct shape 的 int 成员，假设 RECTANGLE 已定义
    
    (b) s.center.x = 10;
    // 合法：center 是 struct point，x 是它的成员
    
    (c) s.height = 25;
    // 非法：struct shape 中没有名为 height 的直接成员
    // 正确写法：s.u.rectangle.height = 25;
    
    (d) s.u.rectangle.width = 8;
    // 合法：u 是 union，rectangle 是其中一个 struct 成员，width 是该 struct 的字段
    
    (e) s.u.circle = 5;
    // 非法：s.u.circle 是一个 struct，不能用 int 直接赋值
    // 正确写法：s.u.circle.radius = 5;
    
    (f) s.u.radius = 5;
    // 非法：union u 里没有名为 radius 的直接成员
    // 正确写法：s.u.circle.radius = 5;
    ```

14. 假设shape 是练习题13中声明的结构标记。编写函数在shape类型结构变量s上完成下列操作，并且s作为实际参数传递给函数。 
    (a) 计算 s 的面积。 
    (b) 将 s 沿x轴方向移动x个单位，沿 y 轴移动y个单位，返回s修改后的内容。（x和y是函数的另外 两个实际参数。） 
    (c) 把 s 缩放c倍（c是double 类型的值），返回 s修改后的内容。（c是函数的另外一个实际参数。）  

    ```C
    #include <stdio.h>
    
    #define RECTANGLE 1
    #define CIRCLE 2
    #define PI 3.1415926
    
    struct shape
    {
        int shape_kind; /* RECTANGLE or CIRCLE */
        struct point
        {
            int x, y;
        } center; /* coordinates of center */
        union
        {
            struct
            {
                int height, width;
            } rectangle;
            struct
            {
                int radius;
            } circle;
        } u;
    } s;
    
    double calculate_area(struct shape s);
    void move(struct shape *s, int x, int y);
    void scale(struct shape *s, double scale);
    
    int main(void)
    {
        struct shape s1 = {
            .shape_kind = RECTANGLE,
            .center = {0, 0},
            .u.rectangle = {5, 10} // height = 5, width = 10
        };
        struct shape s2 = {
            .shape_kind = CIRCLE,
            .center = {0, 0},
            .u.circle = {7} // radius = 7
        };
        struct shape s3 = {
            .shape_kind = RECTANGLE,
            .center = {1, 2},
            .u.rectangle = {3, 4} // height = 3, width = 4
        };
        struct shape s4 = {
            .shape_kind = CIRCLE,
            .center = {3, 4},
            .u.circle = {10} // radius = 10
        };
    
        printf("The area is :%.2f\n", calculate_area(s1));
        printf("The area is :%.2f\n", calculate_area(s2));
    
        printf("The center coordinate before moving is: (%d,%d)\n", s4.center.x, s4.center.y);
        move(&s4, 1, 2);
        printf("The center coordinate after moving is: (%d,%d)\n", s4.center.x, s4.center.y);
    
        printf("The size before scaling is: (%d,%d)\n", s3.u.rectangle.width, s3.u.rectangle.height);
        scale(&s3, 1.5);
        printf("The size after scaling is: (%d,%d)\n", s3.u.rectangle.width, s3.u.rectangle.height);
    
        return 0;
    }
    
    double calculate_area(struct shape s)
    {
        double area;
    
        switch (s.shape_kind)
        {
        case RECTANGLE:
            area = s.u.rectangle.width * s.u.rectangle.height;
            break;
        case CIRCLE:
            area = s.u.circle.radius * s.u.circle.radius * PI;
            break;
        default:
            printf("False input!\n");
            area = 0.0;
            break;
        }
    
        return area;
    }
    
    void move(struct shape *s, int x, int y)
    {
        (*s).center.x += x;
        (*s).center.y += y;
    }
    
    void scale(struct shape *s, double scale)
    {
        switch ((*s).shape_kind)
        {
        case RECTANGLE:
            (*s).u.rectangle.width *= scale;
            (*s).u.rectangle.height *= scale;
            break;
        case CIRCLE:
            (*s).u.circle.radius *= scale;
            break;
        default:
            printf("False input!\n");
            break;
        }
    }
    ```

    ```
    alancong@AlanCongdeMacBook-Air chapter_16 % ./a.out 
    The area is :50.00
    The area is :153.94
    The center coordinate before moving is: (3,4)
    The center coordinate after moving is: (4,6)
    The size before scaling is: (4,3)
    The size after scaling is: (6,4)
    ```

    

16.5 节  

15. (a) 为枚举声明标记，此枚举的值表示一周中的7天。 
    (b) 用 typedef 定义(a)中枚举的名字。  

    ```C
    (a) 
    enum WEEK
    {
        MON = 1,
        TUE,
        WED,
        THU,
        FRI,
        SAT,
        SUN,
    };
    (b) 
    typedef enum WEEK Week;
    ```

    ```C
    #include <stdio.h>
    
    enum WEEK
    {
        MON = 1,
        TUE,
        WED,
        THU,
        FRI,
        SAT,
        SUN,
    };
    
    typedef enum WEEK Week;
    
    int main(void)
    {
        enum WEEK week_1 = MON;
        Week week_2 = TUE;
    
        printf("week_1: %d, week_2: %d\n", week_1, week_2); 
    
        return 0;
    }
    ```

    

16. 下列关于枚举常量的叙述，哪些是正确的？ 
    (a) 枚举常量可以表示程序员指定的任何整数。 
    (b) 枚举常量具有的性质和用#define创建的常量的性质完全一样。 
    (c) 枚举常量的默认值为0, 1, 2, …。 
    (d) 枚举中的所有常量必须具有不同的值。 
    (e) 枚举常量在表达式中可以作为整数使用。  

    ```
    (a) 错误：枚举常量的值会受到具体实现int类型整数范围的限制，不能表示任意整数，且可能溢出。
    (b) 部分正确：枚举常量与#define常量有相似之处，但枚举常量有类型且支持类型检查，#define并不支持。
    (c) 正确：默认值为 0, 1, 2, …，除非显式指定。
    (d) 正确：枚举常量的值必须唯一，不能重复。
    (e) 正确：枚举常量在表达式中可以作为整数使用。
    ```

    

17. 假设b和i以如下形式声明：   

    ```
    enum {FALSE, TRUE} b;  
    int i;  
    ```

    下列哪些语句是合法的？哪些是“安全的”（始终产生有意义的结果）？   

    ```
    (a) b = FALSE;  
    (b) b = i;    
    (c) b++;   
    (d) i = b;    
    (e) i = 2 * b + 1;  
    ```

    **ANS：**

    ```
    All the statements are legal, since C allows integers and enumeration values to be mixed without restriction. Only (a), (d), and (e) are safe. (b) is not meaningful if i has a value other than 0 or 1. (c) will not yield a meaningful result if b has the value 1. 
    ```

    

18. (a) 国际象棋棋盘的每个方格中可能有一个棋子，即兵、马、象、车、皇后或国王，也可能为空。每个棋子可能是黑色的，也可能是白色的。请定义两个枚举类型：Piece用来包含7种可能的值（其中一种为“空”），Color用来表示2种颜色。 
    (b) 利用(a)中的类型，定义名为Square的结构类型，使此类型可以存储棋子的类型和颜色。 
    (c) 利用(b)中的Square类型，声明一个名为board的8×8的数组，使此数组可以用来存储棋盘上的全部内容。   (d) 给(c)中的声明添加初始化器，使board的初始值对应国际象棋比赛开始时的棋子布局。没有棋子的方格值为“空”且颜色为黑色。  

    ```C
    (a)
    enum piece {
        BLANK = 0,
        PAWN = 1,
        KNIGHT = 2,
        BISHOP = 3,
        ROOK = 4,
        QUEEN = 5,
        KING = 6,
    };
    enum color {
        WHITE = 0,
        BLACK = 1,
    };
    ```

    ```C
    (b)
    typedef struct square {
        enum piece Piece;
        enum color Color;
    } Square;
    ```

    ```C
    (c)
    Square board[SIZE][SIZE]
    ```

    ```C
    (d)
    Square board[SIZE][SIZE] = {
            { {ROOK, BLACK}, {KNIGHT, BLACK}, {BISHOP, BLACK}, {QUEEN, BLACK}, {KING, BLACK}, {BISHOP, BLACK}, {KNIGHT, BLACK}, {ROOK, BLACK} },
            { {PAWN, BLACK}, {PAWN, BLACK}, {PAWN, BLACK}, {PAWN, BLACK}, {PAWN, BLACK}, {PAWN, BLACK}, {PAWN, BLACK}, {PAWN, BLACK} },
            { {BLANK, WHITE}, {BLANK, WHITE}, {BLANK, WHITE}, {BLANK, WHITE}, {BLANK, WHITE}, {BLANK, WHITE}, {BLANK, WHITE}, {BLANK, WHITE} },
            { {BLANK, WHITE}, {BLANK, WHITE}, {BLANK, WHITE}, {BLANK, WHITE}, {BLANK, WHITE}, {BLANK, WHITE}, {BLANK, WHITE}, {BLANK, WHITE} },
            { {BLANK, WHITE}, {BLANK, WHITE}, {BLANK, WHITE}, {BLANK, WHITE}, {BLANK, WHITE}, {BLANK, WHITE}, {BLANK, WHITE}, {BLANK, WHITE} },
            { {BLANK, WHITE}, {BLANK, WHITE}, {BLANK, WHITE}, {BLANK, WHITE}, {BLANK, WHITE}, {BLANK, WHITE}, {BLANK, WHITE}, {BLANK, WHITE} },
            { {PAWN, WHITE}, {PAWN, WHITE}, {PAWN, WHITE}, {PAWN, WHITE}, {PAWN, WHITE}, {PAWN, WHITE}, {PAWN, WHITE}, {PAWN, WHITE} },
            { {ROOK, WHITE}, {KNIGHT, WHITE}, {BISHOP, WHITE}, {QUEEN, WHITE}, {KING, WHITE}, {BISHOP, WHITE}, {KNIGHT, WHITE}, {ROOK, WHITE} }
        };
    ```

    ```C
    #include <stdio.h>
    
    #define SIZE 8
    
    enum piece {
        BLANK = 0,
        PAWN = 1,
        KNIGHT = 2,
        BISHOP = 3,
        ROOK = 4,
        QUEEN = 5,
        KING = 6,
    };
    
    enum color {
        WHITE = 0,
        BLACK = 1,
    };
    
    typedef struct square {
        enum piece Piece;
        enum color Color;
    } Square;
    
    void print_board(Square board[SIZE][SIZE]);
    
    int main(void)
    {
        Square board[SIZE][SIZE] = {
            { {ROOK, BLACK}, {KNIGHT, BLACK}, {BISHOP, BLACK}, {QUEEN, BLACK}, {KING, BLACK}, {BISHOP, BLACK}, {KNIGHT, BLACK}, {ROOK, BLACK} },
            { {PAWN, BLACK}, {PAWN, BLACK}, {PAWN, BLACK}, {PAWN, BLACK}, {PAWN, BLACK}, {PAWN, BLACK}, {PAWN, BLACK}, {PAWN, BLACK} },
            { {BLANK, WHITE}, {BLANK, WHITE}, {BLANK, WHITE}, {BLANK, WHITE}, {BLANK, WHITE}, {BLANK, WHITE}, {BLANK, WHITE}, {BLANK, WHITE} },
            { {BLANK, WHITE}, {BLANK, WHITE}, {BLANK, WHITE}, {BLANK, WHITE}, {BLANK, WHITE}, {BLANK, WHITE}, {BLANK, WHITE}, {BLANK, WHITE} },
            { {BLANK, WHITE}, {BLANK, WHITE}, {BLANK, WHITE}, {BLANK, WHITE}, {BLANK, WHITE}, {BLANK, WHITE}, {BLANK, WHITE}, {BLANK, WHITE} },
            { {BLANK, WHITE}, {BLANK, WHITE}, {BLANK, WHITE}, {BLANK, WHITE}, {BLANK, WHITE}, {BLANK, WHITE}, {BLANK, WHITE}, {BLANK, WHITE} },
            { {PAWN, WHITE}, {PAWN, WHITE}, {PAWN, WHITE}, {PAWN, WHITE}, {PAWN, WHITE}, {PAWN, WHITE}, {PAWN, WHITE}, {PAWN, WHITE} },
            { {ROOK, WHITE}, {KNIGHT, WHITE}, {BISHOP, WHITE}, {QUEEN, WHITE}, {KING, WHITE}, {BISHOP, WHITE}, {KNIGHT, WHITE}, {ROOK, WHITE} }
        };
    
        print_board(board);
    
        return 0;
    }
    
    void print_board(Square board[SIZE][SIZE])
    {
        for (int i = 0; i < SIZE; i++) {
            for (int j = 0; j < SIZE; j++) {
                printf("%d ", board[i][j].Piece);  // Print the piece number (for simplicity)
            }
            printf("\n");
        }
        printf("\n");
    }
    ```

    ```
    alancong@AlanCongdeMacBook-Air chapter_16 % ./a.out 
    4 2 3 5 6 3 2 4 
    1 1 1 1 1 1 1 1 
    0 0 0 0 0 0 0 0 
    0 0 0 0 0 0 0 0 
    0 0 0 0 0 0 0 0 
    0 0 0 0 0 0 0 0 
    1 1 1 1 1 1 1 1 
    4 2 3 5 6 3 2 4 
    ```

    

19. 声明一个具有如下成员的结构，其标记为pinball_machine：   

    ```
    name，字符串，最多有40个字符；   
    year，整数，表示制造年份；   
    type，枚举类型的值，可能的取值为EM（机电式的）和SS（固态电路的）；   
    players，整数，表示玩家的最大数目。
    ```

    ```C
    #include <stdio.h>
    
    #define STRING_SIZE 40
    
    enum types
    {
        EM,
        SS,
    };
    
    struct pinball_machine
    {
        char name[STRING_SIZE + 1];
        int year;
        enum types type;
        int players;
    };
    
    char *string[2] = {"EM", "SS"};
    
    void print_pinball_machine(struct pinball_machine p);
    
    int main(void)
    {
        struct pinball_machine p = {
            .name = "Space Invaders",
            .year = 1980,
            .type = SS, 
            .players = 4
        };
    
        print_pinball_machine(p);
    
        return 0;
    }
    
    void print_pinball_machine(struct pinball_machine p)
    {
        printf("The name is :%s\n", p.name);
        printf("The year is :%d\n", p.year);
        printf("The type is :%s\n", string[p.type]);
        printf("The number of players is :%d\n", p.players);
    }
    ```

    ```
    alancong@AlanCongdeMacBook-Air chapter_16 % ./a.out 
    The name is :Space Invaders
    The year is :1980
    The type is :SS
    The number of players is :4
    ```

    

20. 假定direction变量声明如下：   

    ```C
    enum {NORTH, SOUTH, EAST, WEST} direction;
    ```

    设x和y为int类型的变量。编写switch语句测试direction的值，如果值为EAST就使x增1， 如果值为WEST就使x减1，如果值为SOUTH就使y增1，如果值为NORTH就使y减1。  

    ```C
    #include <stdio.h>
    
    enum
    {
        NORTH,
        SOUTH,
        EAST,
        WEST
    } direction;
    
    int main(void)
    {
        int x = 0, y = 0;
        char ch;
    
        printf("The starting coordinates for x and y is (%d, %d)\n", x, y);
        printf("Enter the operation:");
        for(;;)
        {
            scanf("%c", &ch);
    
            switch (ch)
            {
            case 'w':
                direction = NORTH;
                break;
            case 'a':
                direction = WEST;
                break;
            case 's':
                direction = SOUTH;
                break;
            case 'd':
                direction = EAST;
                break;
            case 'q': 
                printf("The program is exiting ...\n");
                return 0;
                break;
            case '\n':
                continue;
                break;
            default:
                printf("False input!\n");
                continue;
                break;
            }
    
            switch (direction)
            {
            case NORTH:
                y -= 1;
                break;
            case SOUTH:
                y += 1;
                break;
            case EAST:
                x += 1;
                break;
            case WEST:
                x -= 1;
                break;
            default:
                printf("False input!\n");
                break;
            }
            printf("Now the coordinates for x and y is (%d, %d)\n", x, y);
            printf("Enter the operation:");
        }
    
        return 0;
    }
    ```

    ```
    alancong@AlanCongdeMacBook-Air chapter_16 % ./a.out 
    The starting coordinates for x and y is (0, 0)
    Enter the operation:w
    Now the coordinates for x and y is (0, -1)
    Enter the operation:a
    Now the coordinates for x and y is (-1, -1)
    Enter the operation:s
    Now the coordinates for x and y is (-1, 0)
    Enter the operation:d
    Now the coordinates for x and y is (0, 0)
    Enter the operation:q
    The program is exiting ...
    ```

    

21. 下列声明中，枚举常量的整数值分别是多少？   

    ```C
    (a) enum {NUL, SOH, STX, ETX};   
    (b) enum {VT = 11, FF, CR};   
    (c) enum {SO = 14, SI, DLE, CAN = 24, EM};   
    (d) enum {ENQ = 45, ACK, BEL, LF = 37, ETB, ESC}; 
    ```

    ```C
    (a) enum {NUL, SOH, STX, ETX};  
    NUL == 0，SOU == 1, STX == 2, ETX == 3
    (b) enum {VT = 11, FF, CR};   
    VT == 11, FF == 12, CR == 13
    (c) enum {SO = 14, SI, DLE, CAN = 24, EM};   
    SO == 14, SI == 15, DLE == 16, CAN == 24, EM == 25
    (d) enum {ENQ = 45, ACK, BEL, LF = 37, ETB, ESC}; 
    ENQ == 45, ACK == 46, BEL == 47, LF == 37, ETB == 38, ESC == 39
    ```

    

22. 枚举chess_pieces声明如下： 
    `enum chess_pieces {KING, QUEEN, ROOK, BISHOP, KNIGHT, PAWN};` 
    (a) 为名为piece_value的整数常数数组编写声明（包含一个初始化器），这个数组存储数200、9、 5、3、       3和1，分别表示从国王到兵这些棋子。［国王的值实际上是无穷大，因为一旦王被擒（将死）则游戏结   束，但一些象棋软件会给国王分配一个类似200的较大值。］ 
    (b) 重复上题，但是使用指示器来初始化数组。把chess_pieces中的枚举常量作为指示器的下标使用。（提示：参考“问与答”部分的最后一个问题。）

    ```C
    (a)
    int piece_value[] = {200, 9, 5, 3, 3, 1};
    
    (b)
    enum chess_pieces
    {
        KING,
        QUEEN,
        ROOK,
        BISHOP,
        KNIGHT,
        PAWN
    };
    int piece_value[] = {[KING] = 200, [QUEEN] = 9, [ROOK] = 5, [BISHOP] = 3, [KNIGHT] = 3, [PAWN] = 1};
    ```

    

### 编程题

1. 编写程序要求用户输入国际电话区号，然后在数组country_codes中查找它（见16.3节）。如果找到对应的区号，程序需要显示相应的国家（地区）名称，否则显示出错消息。  
   **ANS:**

   ```C
   #include <stdio.h>
   
   #define COUNTRY_COUNT \
     ((int) (sizeof(country_codes) / sizeof(country_codes[0])))
   
   struct dialing_code {
     char *country;
     int code;
   };
   
   const struct dialing_code country_codes[] =
     {{"Argentina",            54}, {"Bangladesh",      880},
      {"Brazil",               55}, {"Burma (Myanmar)",  95},
      {"China",                86}, {"Colombia",         57},
      {"Congo, Dem. Rep. of", 243}, {"Egypt",            20},
      {"Ethiopia",            251}, {"France",           33},
      {"Germany",              49}, {"India",            91},
      {"Indonesia",            62}, {"Iran",             98},
      {"Italy",                39}, {"Japan",            81},
      {"Mexico",               52}, {"Nigeria",         234},
      {"Pakistan",             92}, {"Philippines",      63},
      {"Poland",               48}, {"Russia",            7},
      {"South Africa",         27}, {"South Korea",      82},
      {"Spain",                34}, {"Sudan",           249},
      {"Thailand",             66}, {"Turkey",           90},
      {"Ukraine",             380}, {"United Kingdom",   44},
      {"United States",         1}, {"Vietnam",          84}};
   
   int main(void)
   {
     int code, i;
   
     printf("Enter dialing code: ");
     scanf("%d", &code);
   
     for (i = 0; i < COUNTRY_COUNT; i++)
       if (code == country_codes[i].code) {
         printf("The country with dialing code %d is %s\n",
                code, country_codes[i].country);
         return 0;
       }
   
     printf("No corresponding country found\n");
     return 0;
   }
   ```

   **Mine:**

   ```C
   #include <stdio.h>
   #include <string.h>
   
   struct dialing_code
   {
       char *country;
       int code;
   };
   
   const struct dialing_code country_codes[] =
       {{"Argentina", 54}, {"Bangladesh", 880}, {"Brazil", 55}, 
       {"Burma (Myanmar)", 95}, {"China", 86}, {"Colombia", 57}, 
       {"Congo, Dem. Rep. of", 243}, {"Egypt", 20}, {"Ethiopia", 251}, 
       {"France", 33}, {"Germany", 49}, {"India ", 91}, {"Indonesia", 62}, 
       {"Iran", 98}, {"Italy", 39}, {"Japan", 81}, 
       {"Mexico", 52}, {"Nigeria", 234}, {"Pakistan", 92}, 
       {"Philippines", 63}, {"Poland", 48}, {"Russia", 7}, 
       {"South Africa", 27}, {"Korea", 82}, {"Spain", 34}, 
       {"Sudan", 249}, {"Thailand", 66}, {"Turkey", 90}, 
       {"Ukraine", 380}, {"United Kingdom", 44}, 
       {"United States", 1}, {"Vietnam", 84}
   };
   
   int length = sizeof(country_codes) / sizeof(country_codes[0]);
   
   void search(const struct dialing_code country_codes[], int number)
   {
       for (int i = 0; i < length; i++)
           if (country_codes[i].code == number)
           {
               printf("Find %d and the country is :%s.\n", number, country_codes[i].country);
               return;
           }
       printf("NOT find.\n");
   }
   
   int main(void)
   {
       int number;
   
       for (;;)
       {
           printf("Enter the number to search :");
           if(scanf("%d", &number) != 1)
           {
               printf("Invalid input! Please enter a number.\n");
               while(getchar() != '\n');
               continue;
           }
   
           if (number == 0)
           {
               printf("Exiting the program ...\n");
               return 0;
           }
   
           search(country_codes, number);
       }
   }
   ```

   ```
   alancong@AlanCongdeMacBook-Air chapter_16 % ./a.out
   Enter the number to search :54
   Find 54 and the country is :Argentina.
   Enter the number to search :880
   Find 880 and the country is :Bangladesh.
   Enter the number to search :57
   Find 57 and the country is :Colombia.
   Enter the number to search :44
   Find 44 and the country is :United Kingdom.
   Enter the number to search :0
   Exiting the program ...
   ```

1. 修改16.3节的inventory.c程序，使p（显示）操作可以按零件编号的顺序显示零件。  

   ```C
   /* inventory.c (Chapter 16, page 391) */
   /* Maintains a parts database (array version) */
   
   #include <stdio.h>
   #include <ctype.h>
   
   #define NAME_LEN 25
   #define MAX_PARTS 100
   
   struct part
   {
       int number;
       char name[NAME_LEN + 1];
       int on_hand;
   } inventory[MAX_PARTS];
   
   int num_parts = 0; /* number of parts currently stored */
   
   int find_part(int number);
   void insert(void);
   void search(void);
   void update(void);
   void print(void);
   void sort_inventory();
   int read_line(char str[], int n);
   
   /**********************************************************
    * main: Prompts the user to enter an operation code,     *
    *       then calls a function to perform the requested   *
    *       action. Repeats until the user enters the        *
    *       command 'q'. Prints an error message if the user *
    *       enters an illegal code.                          *
    **********************************************************/
   int main(void)
   {
       char code;
   
       for (;;)
       {
           printf("Enter operation code: ");
           scanf(" %c", &code);
           while (getchar() != '\n') /* skips to end of line */
               ;
           switch (code)
           {
           case 'i':
               insert();
               break;
           case 's':
               search();
               break;
           case 'u':
               update();
               break;
           case 'p':
               print();
               break;
           case 'q':
               return 0;
           default:
               printf("Illegal code\n");
           }
           printf("\n");
       }
   }
   
   /**********************************************************
    * find_part: Looks up a part number in the inventory     *
    *            array. Returns the array index if the part  *
    *            number is found; otherwise, returns -1.     *
    **********************************************************/
   int find_part(int number)
   {
       int i;
   
       for (i = 0; i < num_parts; i++)
           if (inventory[i].number == number)
               return i;
       return -1;
   }
   
   /**********************************************************
    * insert: Prompts the user for information about a new   *
    *         part and then inserts the part into the        *
    *         database. Prints an error message and returns  *
    *         prematurely if the part already exists or the  *
    *         database is full.                              *
    **********************************************************/
   void insert(void)
   {
       int part_number;
   
       if (num_parts == MAX_PARTS)
       {
           printf("Database is full; can't add more parts.\n");
           return;
       }
   
       printf("Enter part number: ");
       scanf("%d", &part_number);
       if (find_part(part_number) >= 0)
       {
           printf("Part already exists.\n");
           return;
       }
   
       inventory[num_parts].number = part_number;
       printf("Enter part name: ");
       read_line(inventory[num_parts].name, NAME_LEN);
       printf("Enter quantity on hand: ");
       scanf("%d", &inventory[num_parts].on_hand);
       num_parts++;
   }
   
   /**********************************************************
    * search: Prompts the user to enter a part number, then  *
    *         looks up the part in the database. If the part *
    *         exists, prints the name and quantity on hand;  *
    *         if not, prints an error message.               *
    **********************************************************/
   void search(void)
   {
       int i, number;
   
       printf("Enter part number: ");
       scanf("%d", &number);
       i = find_part(number);
       if (i >= 0)
       {
           printf("Part name: %s\n", inventory[i].name);
           printf("Quantity on hand: %d\n", inventory[i].on_hand);
       }
       else
           printf("Part not found.\n");
   }
   
   /**********************************************************
    * update: Prompts the user to enter a part number.       *
    *         Prints an error message if the part doesn't    *
    *         exist; otherwise, prompts the user to enter    *
    *         change in quantity on hand and updates the     *
    *         database.                                      *
    **********************************************************/
   void update(void)
   {
       int i, number, change;
   
       printf("Enter part number: ");
       scanf("%d", &number);
       i = find_part(number);
       if (i >= 0)
       {
           printf("Enter change in quantity on hand: ");
           scanf("%d", &change);
           inventory[i].on_hand += change;
       }
       else
           printf("Part not found.\n");
   }
   
   /**********************************************************
    * print: Prints a listing of all parts in the database,  *
    *        showing the part number, part name, and         *
    *        quantity on hand. Parts are printed in the      *
    *        order in which they were entered into the       *
    *        database.                                       *
    **********************************************************/
   void print(void)
   {
       int i;
   
       sort_inventory();
   
       printf("Part Number   Part Name                  "
              "Quantity on Hand\n");
       for (i = 0; i < num_parts; i++)
           printf("%7d       %-25s%11d\n", inventory[i].number,
                  inventory[i].name, inventory[i].on_hand);
   }
   
   /**********************************************************
    * sort_inventory: Sorts the inventory array by part      *
    *                number in ascending order.              *
    **********************************************************/
   void sort_inventory(void)
   {
       struct part temp;
   
       for (int i = 0; i < num_parts - 1; i++)
       {
           for (int j = i + 1; j < num_parts; j++)
           {
               if (inventory[i].number > inventory[j].number)
               {
                   temp = inventory[j];
                   inventory[j] = inventory[i];
                   inventory[i] = temp;
               }
           }
       }
   }
   
   int read_line(char str[], int n)
   {
       int ch, i = 0;
   
       while (isspace(ch = getchar()))
           ;
       while (ch != '\n' && ch != EOF)
       {
           if (i < n)
               str[i++] = ch;
           ch = getchar();
       }
       str[i] = '\0';
       return i;
   }
   ```

   ```
   alancong@AlanCongdeMacBook-Air chapter_16 % ./a.out 
   Enter operation code: i
   Enter part number: 9
   Enter part name: test
   Enter quantity on hand: 5
   
   Enter operation code: i
   Enter part number: 2
   Enter part name: fff
   Enter quantity on hand: 3
   
   Enter operation code: p
   Part Number   Part Name                  Quantity on Hand
         2       fff                                3
         9       test                               5
   
   Enter operation code: q
   ```

1. 修改16.3节的inventory.c程序，使inventory 和num_parts 局部于main 函数。  

   ```C
   /* inventory.c (Chapter 16, page 391) */
   /* Maintains a parts database (array version) */
   
   #include <stdio.h>
   #include <ctype.h>
   
   #define NAME_LEN 25
   #define MAX_PARTS 100
   
   struct part
   {
       int number;
       char name[NAME_LEN + 1];
       int on_hand;
   } ;
   
   
   
   int find_part(struct part inventory[], int number, int num_parts);
   void insert(struct part inventory[], int *num_parts);
   void search(struct part inventory[], int *num_parts);
   void update(struct part inventory[], int *num_parts);
   void print(struct part inventory[], int *num_parts);
   void sort_inventory(struct part inventory[], int *num_parts);
   int read_line(char str[], int n);
   
   /**********************************************************
    * main: Prompts the user to enter an operation code,     *
    *       then calls a function to perform the requested   *
    *       action. Repeats until the user enters the        *
    *       command 'q'. Prints an error message if the user *
    *       enters an illegal code.                          *
    **********************************************************/
   int main(void)
   {
       char code;
       int num_parts = 0; /* number of parts currently stored */
   
       struct part inventory[MAX_PARTS];
   
       for (;;)
       {
           printf("Enter operation code: ");
           scanf(" %c", &code);
           while (getchar() != '\n') /* skips to end of line */
               ;
           switch (code)
           {
           case 'i':
               insert(inventory, &num_parts);
               break;
           case 's':
               search(inventory, &num_parts);
               break;
           case 'u':
               update(inventory, &num_parts);
               break;
           case 'p':
               print(inventory, &num_parts);
               break;
           case 'q':
               return 0;
           default:
               printf("Illegal code\n");
           }
           printf("\n");
       }
   }
   
   /**********************************************************
    * find_part: Looks up a part number in the inventory     *
    *            array. Returns the array index if the part  *
    *            number is found; otherwise, returns -1.     *
    **********************************************************/
   int find_part(struct part inventory[], int number, int num_parts)
   {
       int i;
   
       for (i = 0; i < *num_parts; i++)
           if (inventory[i].number == number)
               return i;
       return -1;
   }
   
   /**********************************************************
    * insert: Prompts the user for information about a new   *
    *         part and then inserts the part into the        *
    *         database. Prints an error message and returns  *
    *         prematurely if the part already exists or the  *
    *         database is full.                              *
    **********************************************************/
   void insert(struct part inventory[], int *num_parts)
   {
       int part_number;
   
       if (*num_parts == MAX_PARTS)
       {
           printf("Database is full; can't add more parts.\n");
           return;
       }
   
       printf("Enter part number: ");
       scanf("%d", &part_number);
       if (find_part(inventory, part_number, num_parts) >= 0)
       {
           printf("Part already exists.\n");
           return;
       }
   
       inventory[*num_parts].number = part_number;
       printf("Enter part name: ");
       read_line(inventory[*num_parts].name, NAME_LEN);
       printf("Enter quantity on hand: ");
       scanf("%d", &inventory[*num_parts].on_hand);
       (*num_parts)++;
   }
   
   /**********************************************************
    * search: Prompts the user to enter a part number, then  *
    *         looks up the part in the database. If the part *
    *         exists, prints the name and quantity on hand;  *
    *         if not, prints an error message.               *
    **********************************************************/
   void search(struct part inventory[], int *num_parts)
   {
       int i, number;
   
       printf("Enter part number: ");
       scanf("%d", &number);
       i = find_part(inventory, number, num_parts);
       if (i >= 0)
       {
           printf("Part name: %s\n", inventory[i].name);
           printf("Quantity on hand: %d\n", inventory[i].on_hand);
       }
       else
           printf("Part not found.\n");
   }
   
   /**********************************************************
    * update: Prompts the user to enter a part number.       *
    *         Prints an error message if the part doesn't    *
    *         exist; otherwise, prompts the user to enter    *
    *         change in quantity on hand and updates the     *
    *         database.                                      *
    **********************************************************/
   void update(struct part inventory[], int *num_parts)
   {
       int i, number, change;
   
       printf("Enter part number: ");
       scanf("%d", &number);
       i = find_part(inventory, number, num_parts);
       if (i >= 0)
       {
           printf("Enter change in quantity on hand: ");
           scanf("%d", &change);
           inventory[i].on_hand += change;
       }
       else
           printf("Part not found.\n");
   }
   
   /**********************************************************
    * print: Prints a listing of all parts in the database,  *
    *        showing the part number, part name, and         *
    *        quantity on hand. Parts are printed in the      *
    *        order in which they were entered into the       *
    *        database.                                       *
    **********************************************************/
   void print(struct part inventory[], int *num_parts)
   {
       int i;
   
       sort_inventory(inventory, num_parts);
   
       printf("Part Number   Part Name                  "
              "Quantity on Hand\n");
       for (i = 0; i < *num_parts; i++)
           printf("%7d       %-25s%11d\n", inventory[i].number,
                  inventory[i].name, inventory[i].on_hand);
   }
   
   /**********************************************************
    * sort_inventory: Sorts the inventory array by part      *
    *                number in ascending order.              *
    **********************************************************/
   void sort_inventory(struct part inventory[], int *num_parts)
   {
       struct part temp;
   
       for (int i = 0; i < *num_parts - 1; i++)
       {
           for (int j = i + 1; j < *num_parts; j++)
           {
               if (inventory[i].number > inventory[j].number)
               {
                   temp = inventory[j];
                   inventory[j] = inventory[i];
                   inventory[i] = temp;
               }
           }
       }
   }
   
   /**********************************************************
    * read_line: Reads a line of input, ignoring leading     *
    *            whitespace, and stores it into the string.  *
    *            Stops at newline or EOF.                    *
    **********************************************************/
   int read_line(char str[], int n)
   {
       int ch, i = 0;
   
       while (isspace(ch = getchar()))
           ;
       while (ch != '\n' && ch != EOF)
       {
           if (i < n)
               str[i++] = ch;
           ch = getchar();
       }
       str[i] = '\0';
       return i;
   }
   ```

   ```
   alancong@AlanCongdeMacBook-Air chapter_16 % ./a.out 
   Enter operation code: i
   Enter part number: 9
   Enter part name: test
   Enter quantity on hand: 5
   
   Enter operation code: i
   Enter part number: 2
   Enter part name: fff
   Enter quantity on hand: 6
   
   Enter operation code: p
   Part Number   Part Name                  Quantity on Hand
         2       fff                                6
         9       test                               5
   
   Enter operation code: u
   Enter part number: 9
   Enter change in quantity on hand: 100
   
   Enter operation code: p
   Part Number   Part Name                  Quantity on Hand
         2       fff                                6
         9       test                             105
   
   Enter operation code: s
   Enter part number: 2
   Part name: fff
   Quantity on hand: 6
   
   Enter operation code: q
   ```

1. 修改16.3节的inventory.c程序，为结构part添加成员price。insert函数应该要求用户输入新商品的价格。serach函数和print函数应该显示价格。添加一条新的命令，允许用户修改零件的价格。  

   ```C
   /* inventory.c (Chapter 16, page 391) */
   /* Maintains a parts database (array version) */
   
   #include <stdio.h>
   #include <ctype.h>
   
   #define NAME_LEN 25
   #define MAX_PARTS 100
   
   struct part
   {
       int number;
       char name[NAME_LEN + 1];
       int on_hand;
       double price;
   } ;
   
   int find_part(struct part inventory[], int number, int *num_parts);
   void insert(struct part inventory[], int *num_parts);
   void search(struct part inventory[], int *num_parts);
   void update(struct part inventory[], int *num_parts);
   void print(struct part inventory[], int *num_parts);
   void sort_inventory(struct part inventory[], int *num_parts);
   int read_line(char str[], int n);
   
   /**********************************************************
    * main: Prompts the user to enter an operation code,     *
    *       then calls a function to perform the requested   *
    *       action. Repeats until the user enters the        *
    *       command 'q'. Prints an error message if the user *
    *       enters an illegal code.                          *
    **********************************************************/
   int main(void)
   {
       char code;
       int num_parts = 0; /* number of parts currently stored */
   
       struct part inventory[MAX_PARTS];
   
       for (;;)
       {
           printf("Enter operation code: ");
           scanf(" %c", &code);
           while (getchar() != '\n') /* skips to end of line */
               ;
           switch (code)
           {
           case 'i':
               insert(inventory, &num_parts);
               break;
           case 's':
               search(inventory, &num_parts);
               break;
           case 'u':
               update(inventory, &num_parts);
               break;
           case 'p':
               print(inventory, &num_parts);
               break;
           case 'q':
               return 0;
           default:
               printf("Illegal code\n");
           }
           printf("\n");
       }
   }
   
   /**********************************************************
    * find_part: Looks up a part number in the inventory     *
    *            array. Returns the array index if the part  *
    *            number is found; otherwise, returns -1.     *
    **********************************************************/
   int find_part(struct part inventory[], int number, int *num_parts)
   {
       int i;
   
       for (i = 0; i < *num_parts; i++)
           if (inventory[i].number == number)
               return i;
       return -1;
   }
   
   /**********************************************************
    * insert: Prompts the user for information about a new   *
    *         part and then inserts the part into the        *
    *         database. Prints an error message and returns  *
    *         prematurely if the part already exists or the  *
    *         database is full.                              *
    **********************************************************/
   void insert(struct part inventory[], int *num_parts)
   {
       int part_number;
   
       if (*num_parts == MAX_PARTS)
       {
           printf("Database is full; can't add more parts.\n");
           return;
       }
   
       printf("Enter part number: ");
       scanf("%d", &part_number);
       if (find_part(inventory, part_number, num_parts) >= 0)
       {
           printf("Part already exists.\n");
           return;
       }
   
       inventory[*num_parts].number = part_number;
       printf("Enter part name: ");
       read_line(inventory[*num_parts].name, NAME_LEN);
       printf("Enter quantity on hand: ");
       scanf("%d", &inventory[*num_parts].on_hand);
       printf("Enter part price: ");
       scanf("%lf", &inventory[*num_parts].price);
       (*num_parts)++;
   }
   
   /**********************************************************
    * search: Prompts the user to enter a part number, then  *
    *         looks up the part in the database. If the part *
    *         exists, prints the name and quantity on hand;  *
    *         if not, prints an error message.               *
    **********************************************************/
   void search(struct part inventory[], int *num_parts)
   {
       int i, number;
   
       printf("Enter part number: ");
       scanf("%d", &number);
       i = find_part(inventory, number, num_parts);
       if (i >= 0)
       {
           printf("Part name: %s\n", inventory[i].name);
           printf("Quantity on hand: %d\n", inventory[i].on_hand);
           printf("Price: %.2f\n", inventory[i].price);
       }
       else
           printf("Part not found.\n");
   }
   
   /**********************************************************
    * update: Prompts the user to enter a part number.       *
    *         Prints an error message if the part doesn't    *
    *         exist; otherwise, prompts the user to enter    *
    *         change in quantity on hand and updates the     *
    *         database.                                      *
    **********************************************************/
   void update(struct part inventory[], int *num_parts)
   {
       int i, number, change;
   
       printf("Enter part number: ");
       scanf("%d", &number);
       i = find_part(inventory, number, num_parts);
       if (i >= 0)
       {
           printf("Enter change in quantity on hand: ");
           scanf("%d", &change);
           inventory[i].on_hand += change;
       }
       else
           printf("Part not found.\n");
   }
   
   /**********************************************************
    * print: Prints a listing of all parts in the database,  *
    *        showing the part number, part name, and         *
    *        quantity on hand. Parts are printed in the      *
    *        order in which they were entered into the       *
    *        database.                                       *
    **********************************************************/
   void print(struct part inventory[], int *num_parts)
   {
       int i;
   
       sort_inventory(inventory, num_parts);
   
       printf("Part Number   Part Name                  "
              "Quantity on Hand\tPrice\n");
       for (i = 0; i < *num_parts; i++)
           printf("%7d       %-25s%11d\t\t%.2f\n", inventory[i].number,
                  inventory[i].name, inventory[i].on_hand, inventory[i].price);
   }
   
   /**********************************************************
    * sort_inventory: Sorts the inventory array by part      *
    *                number in ascending order.              *
    **********************************************************/
   void sort_inventory(struct part inventory[], int *num_parts)
   {
       struct part temp;
   
       for (int i = 0; i < *num_parts - 1; i++)
       {
           for (int j = i + 1; j < *num_parts; j++)
           {
               if (inventory[i].number > inventory[j].number)
               {
                   temp = inventory[j];
                   inventory[j] = inventory[i];
                   inventory[i] = temp;
               }
           }
       }
   }
   
   /**********************************************************
    * read_line: Reads a line of input, ignoring leading     *
    *            whitespace, and stores it into the string.  *
    *            Stops at newline or EOF.                    *
    **********************************************************/
   int read_line(char str[], int n)
   {
       int ch, i = 0;
   
       while (isspace(ch = getchar()))
           ;
       while (ch != '\n' && ch != EOF)
       {
           if (i < n)
               str[i++] = ch;
           ch = getchar();
       }
       str[i] = '\0';
       return i;
   }
   ```

   ```
   alancong@AlanCongdeMacBook-Air chapter_16 % ./a.out
   Enter operation code: i
   Enter part number: 512
   Enter part name: test
   Enter quantity on hand: 5
   Enter part price: 12.5
   
   Enter operation code: p
   Part Number   Part Name                  Quantity on Hand       Price
       512       test                               5              12.50
   
   Enter operation code: q
   ```

1. 修改第5章的编程题8，以便用一个单独的数组存储时间。数组的元素都是结构，每个结构包含航班的起飞时间和抵达时间。（时间都是整数，表示从午夜开始的分钟数。）程序用一个循环从数组中搜索与用户输入的时间最接近的起飞时间。  

   ```
   #include <stdio.h>
   
   #define SIZE 8
   
   struct flight_message
   {
       int flight_start;
       int flight_arrive;
   };
   
   int main(void)
   {
       int hour, min, cmp;
   
       struct flight_message schedule[SIZE] =
           {
               {8 * 60, 10 * 60 + 16},
               {9 * 60 + 43, 11 * 60 + 52},
               {11 * 60 + 19, 13 * 60 + 31},
               {12 * 60 + 47, 15 * 60},
               {14 * 60, 16 * 60 + 8},
               {15 * 60 + 45, 17 * 60 + 55},
               {19 * 60, 21 * 60 + 20},
               {21 * 60 + 45, 23 * 60 + 58}};
   
       printf("Enter a 24-hour time: ");
       scanf("%d : %d", &hour, &min);
   
       cmp = hour * 60 + min;
   
       for (int i = 0; i < 8; i++)
       {
           if (cmp < (schedule[i].flight_start + schedule[i + 1].flight_arrive) / 2)
           {
               printf("Closest departure time is %d:%02d", schedule[i].flight_start / 60, schedule[i].flight_start % 60);
               printf("a.m., arriving at %d:%02d a.m.\n", schedule[i + 1].flight_arrive / 60, schedule[i + 1].flight_arrive % 60);
               return 0;
           }
       }
   
       return 0;
   }
   ```

1. 修改第5章的编程题9，以便用户输入的日期都存储在一个date结构（见练习题5）中。把练习题5中的compare_dates 函数集成到你的程序中。

   ```C
   #include<stdio.h>
   
   struct date {
       int year;
       int month;
       int day;
   };
   
   int days_in_months_common_year[13] = {0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31};
   int days_in_months_leap_year[13] = {0, 31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31};
   
   int day_of_year(struct date d);
   int compare_dates(struct date d1, struct date d2);
   
   int main(void)
   {
       struct date d1, d2;
       printf("Enter first date (mm/dd/yy): ");
       scanf("%d / %d / %d", &d1.month, &d1.day, &d1.year);
       printf("Enter second date (mm/dd/yy): ");
       scanf("%d / %d / %d", &d2.month, &d2.day, &d2.year);
   
   
       if(compare_dates(d1, d2) == -1)
           printf("%d/%d/%d is earlier than %d/%d/%d\n", d1.month, d1.day, d1.year, d2.month, d2.day, d2.year);
       else if(compare_dates(d1, d2) == 1)
           printf("%d/%d/%d is earlier than %d/%d/%d\n", d2.month, d2.day, d2.year, d1.month, d1.day, d1.year);
       else
           printf("The two dates are equal: %d/%d/%d\n", d1.month, d1.day, d1.year);
       return 0;
   }
   
   int day_of_year(struct date d)
   {
       int day = 0;
       int *days = ((d.year % 4 == 0 && d.year % 100 != 0) || d.year % 400 == 0) ?
                       days_in_months_leap_year : days_in_months_common_year;
   
       for(int i = 1;i < d.month;i ++)
           day += days[i];
   
       return (day + d.day);
   }
   
   int compare_dates(struct date d1, struct date d2)
   {
       if(d1.year != d2.year)
       {
           if(d1.year > d2.year)
               return 1;
           else
               return -1;
       }
   
       int day_1 = day_of_year(d1);
       int day_2 = day_of_year(d2);
   
       if((day_1 - day_2) == 0)
           return 0;
       else if((day_1 - day_2) > 0)
           return 1;
       else
           return -1;
   }
   ```

   ```
   alancong@AlanCongdeMacBook-Air chapter_16 % ./a.out 
   Enter first date (mm/dd/yy): 12/2/2016
   Enter second date (mm/dd/yy): 12/2/2025
   12/2/2016 is earlier than 12/2/2025
   alancong@AlanCongdeMacBook-Air chapter_16 % ./a.out
   Enter first date (mm/dd/yy): 12/2/2025
   Enter second date (mm/dd/yy): 12/2/2016
   12/2/2016 is earlier than 12/2/2025
   alancong@AlanCongdeMacBook-Air chapter_16 % cc code_16_6.c
   alancong@AlanCongdeMacBook-Air chapter_16 % ./a.out 
   Enter first date (mm/dd/yy): 12/2/2025
   Enter second date (mm/dd/yy): 12/2/2025
   The two dates are equal: 12/2/2025
   ```

   
