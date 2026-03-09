---
title: 《C语言程序设计-现代方法》-课后习题-第十七章
published: 2026-03-09
description: ''
image: ''
tags: []
category: '程序设计'
draft: false 
lang: ''
---

## 第十七章 指针的高级应用

### 练习题

17.1 节  

1. 每次调用时都检查函数 malloc（或其他任何内存分配函数）的返回值是件很烦人的事情。请编写一 个名为my_malloc 的函数作为malloc 函数的“包装器”。当调用函数my_malloc 并且要求分配n 字节时，它会调用malloc 函数，判断malloc 函数确实没有返回空指针，然后返回来自malloc 的指针。如果malloc返回空指针，那么函数my_malloc显示出错消息并且终止程序。  

   ```C
   #include <stdio.h>
   #include <stdlib.h>
   
   void *my_malloc(size_t n);
   
   int main(void)
   {
       void *p = my_malloc(1);
   
       printf("Malloc successed in concat.\n");
   
       free(p);
   
       return 0;
   }
   
   void *my_malloc(size_t n)
   {
       void *p = malloc(n);
   
       if (p == NULL)
       {
           printf("Error: malloc failed in concat\n");
           exit(EXIT_FAILURE);
       }
   
       return p;
   }
   ```

   ```
   alancong@AlanCongdeMacBook-Air chapter_17 % ./a.out 
   Malloc successed in concat.
   ```

   

17.2 节  

2. 编写名为duplicate 的函数，此函数使用动态存储分配来创建字符串的副本。例如，调用

   ```
   p = duplicate(str);  
   ```

   将为和str 长度相同的字符串分配内存空间，并且把字符串str的内容复制到新字符串，然后返回指向新字符串的指针。如果分配内存失败，那么函数duplicate返回空指针。 

   ```C
   #include <stdio.h>
   #include <string.h>
   #include <stdlib.h>
   
   void *duplicate(const char *s);
   
   int main(void)
   {
       char *s = "Hello World!";
       char *p = duplicate(s);
   
       printf("The string is :%s\n", p);
   
       free(p);
   
       return 0;
   }
   
   void *duplicate(const char *s)
   {
       void * p = malloc(strlen(s));
       if(p == NULL)
       {
           printf("Error: malloc failed in concat\n");
           return NULL;
       }
       strcpy(p, s);
   
       return p;
   }
   ```

   ```
   alancong@AlanCongdeMacBook-Air chapter_17 % ./a.out 
   The string is :Hello World!
   ```

   

17.3 节  

3. 编写下列函数：  

   ```
   int *create_array(int n, int initial_value);
   ```

   函数应返回一个指向动态分配的 n 元 int 型数组的指针，数组的每个成员都初始化为 initial_  value。如果内存分配失败，返回值为NULL。

   ```C
   #include <stdio.h>
   #include <stdlib.h>
   
   int *create_array(int n, int initial_value);
   
   int main(void)
   {
       int number, initial_value, *p;
       printf("Enter the number an initial value of an array:");
       scanf("%d%d", &number, &initial_value);
       
       p = create_array(number, initial_value);
       if(p == NULL)
       {
           printf("Error: malloc failed in concat\n");
           exit(EXIT_FAILURE);
       }
   
       for(int i = 0;i < number;i ++)
           printf("%d ", p[i]);
       printf("\n");
   
       free(p);
   
       return 0;
   }
   
   int *create_array(int n, int initial_value)
   {
       int *p = malloc(n * sizeof(int));
       if (p == NULL)
           return NULL;
       
       for(int i = 0;i < n;i ++)
           p[i] = initial_value;
   
       return p;
   }
   ```

   ```
   alancong@AlanCongdeMacBook-Air chapter_17 % ./a.out
   Enter the number an initial value of an array:10 1
   1 1 1 1 1 1 1 1 1 1 
   ```

     

17.5 节  

4. 假设下列声明有效：  

   ```C
   struct point { int x, y; };
   struct rectangle { struct point upper_left, lower_right; };  
   struct rectangle *p; 
   ```

   假设希望p指向一个rectangle结构，此结构的左上角位于(10, 25)的位置上，而右下角位于(20, 15) 的位置上。请编写一系列语句用来分配这样一个结构，并且像说明的那样进行初始化。  

   ```C
   #include <stdio.h>
   #include <stdlib.h>
   
   struct point
   {
       int x, y;
   };
   struct rectangle
   {
       struct point upper_left, lower_right;
   };
   
   struct rectangle *p;
   
   int main(void)
   {
       p = malloc(sizeof(struct rectangle));
       if(p == NULL)
       {
           printf("Error: malloc failed in concat\n");
           exit(EXIT_FAILURE);
       }
   
       p->upper_left = (struct point){10, 25};
       p->lower_right = (struct point){20, 15};
   
       printf("The upper left point is :(%d, %d)\n", p->upper_left.x, p->upper_left.y);
       printf("The lower right point is :(%d, %d)\n", p->lower_right.x, p->lower_right.y);
   
       free(p);
   
       return 0;
   }
   ```

   ```
   alancong@AlanCongdeMacBook-Air chapter_17 % ./a.out 
   The upper left point is :(10, 25)
   The lower right point is :(20, 15)
   ```

   

5. 假设f和p的声明如下所示：  

   ```C
   struct
   {
       union
       {
           char a, b;
           int c;
       } d;
       int e[5];
   } f, *p = &f;
   ```

   那么下列哪些语句是合法的？  

   ```C
   (a) p->b = ' ';  
   (b) p->e[3] = 10;  
   (c)(*p).d.a = '*';  
   (d) p->d->c = 20;  
   ```

   **ANS：**

   ```
   (b) and (c) are legal. (a) is illegal because it tries to reference a member of d without mentioning d. (d) is illegal because it uses -> instead of . to reference the c member of d.
   ```

   ```
   联合体d并不是匿名联合体，因此不能直接访问联合体d的成员b。
   访问联合体d的成员c需要用访问成员运算符.来实现。
   ```

   ```C
   #include <stdio.h>
   
   struct
   {
       union
       {
           char a, b;
           int c;
       } d;
       int e[5];
   } f, *p = &f;
   
   int main(void)
   {
       p->d.b = ' ';
       p->e[3] = 10;
       (*p).d.a = '*';
       p->d.c = 20;
   
       return 0;
   }
   ```

   

6. 请修改函数delete_from_list 使它使用一个指针变量而不是两个（即cur和prev）。  

   ```C
   struct node *delete_from_list(struct node *list, int n)
   {
       struct node *cur, *to_delete;
   
       /* If the list is empty, return the list */
       if(list == NULL)
           return list;
   
       /* If the first node is the one to delete */
       if(list->value == n)
       {
           to_delete = list;
           list = list->next;
           free(to_delete);
           return list;
       }
   
       /* search for the node to delete (starting after the first) */
       for(cur = list;
           cur->next != NULL && cur->next->value != n;
           cur = cur->next)
           ;
       
       /* Did not find the node */
       if(cur->next == NULL)
           return list;
   
       /* Found the node to delete */
       to_delete = cur->next;
       cur->next = to_delete->next;
       free(to_delete);
   
       return list;
   }
   ```

   ```c
   #include <stdio.h>
   #include <stdlib.h>
   
   struct node
   {
       int value;
       struct node *next;
   };
   
   struct node *add_to_list(struct node *list, int n);
   struct node *delete_from_list(struct node *list, int n);
   struct node *read_numbers(void);
   struct node *search_list(struct node *list, int n);
   void print_list(struct node *list);
   void free_list(struct node **list);
   
   int main(void)
   {
       struct node *list = NULL;
       struct node *found;
       int n;
   
       list = read_numbers();
       print_list(list);
   
       printf("Enter a number to delete:");
       scanf("%d", &n);
       list = delete_from_list(list, n);
       print_list(list);
   
       printf("Enter a number to search:");
       scanf("%d", &n);
       found = search_list(list, n);
       if(found != NULL)
           printf("%d is found at node %p\n", found->value, (void *)found);
       else
           printf("%d not found in the list.\n", n);
   
       free_list(&list);
       print_list(list);
   
       return 0;
   }
   
   struct node *add_to_list(struct node *list, int n)
   {
       struct node *new_node;
       new_node = malloc(sizeof(struct node));
       if(new_node == NULL)
       {
           printf("Error: malloc failed in add_to_list.\n");
           exit(EXIT_FAILURE);
       }
       new_node->value = n;
       new_node->next = list;
   
       return new_node;
   }
   
   struct node *delete_from_list(struct node *list, int n)
   {
       struct node *cur, *to_delete;
   
       /* If the list is empty, return the list */
       if(list == NULL)
           return list;
   
       /* If the first node is the one to delete */
       if(list->value == n)
       {
           to_delete = list;
           list = list->next;
           free(to_delete);
           return list;
       }
   
       /* search for the node to delete (starting after the first) */
       for(cur = list;
           cur->next != NULL && cur->next->value != n;
           cur = cur->next)
           ;
       
       /* Did not find the node */
       if(cur->next == NULL)
           return list;
   
       /* Found the node to delete */
       to_delete = cur->next;
       cur->next = to_delete->next;
       free(to_delete);
   
       return list;
   }
   
   struct node *read_numbers(void)
   {
       struct node *list = NULL;
       int n;
       printf("Enter a series of integers (0 to terminate): ");
       for(;;)
       {
           scanf("%d", &n);
           if(n == 0)
               return list;
           list = add_to_list(list, n);
       }
   }
   
   struct node *search_list(struct node *list, int n)
   {
       for(;list != NULL;list = list->next)
           if(list->value == n)
               return list;
       return NULL;
   }
   
   void print_list(struct node *list)
   {
       printf("List :");
       for(;list != NULL;list = list->next)
           printf("%d -> ", list->value);
       printf("NULL\n");
   }
   
   void free_list(struct node **list)
   {
       struct node *to_delete;
       while(*list != NULL)
       {
           to_delete = *list;
           *list = (*list)->next;
           free(to_delete);
       }
   }
   ```

   ```
   alancong@AlanCongdeMacBook-Air chapter_17 % ./a.out
   Enter a series of integers (0 to terminate): 1 2 3 4 5 6 7 8 9 0
   List :9 -> 8 -> 7 -> 6 -> 5 -> 4 -> 3 -> 2 -> 1 -> NULL
   Enter a number to delete:2
   List :9 -> 8 -> 7 -> 6 -> 5 -> 4 -> 3 -> 1 -> NULL
   Enter a number to search:3
   3 is found at node 0x1027e1b20
   List :NULL
   ```

7. 下列循环希望删除链表中的全部结点，并且释放它们占用的内存。但是，此循环有错误。请解释错误是什么并且说明如何修正错误。  

   ```C
   for (p = first; p != NULL; p = p->next)   
     free(p); 
   ```

   **ANS:**

   ```
   The first call of free will release the space for the first node in the list, making p a dangling pointer. Executing p = p->next to advance to the next node will have an undefined effect. Here's a correct way to write the loop, using a temporary pointer that points to the node being deleted:
   
   struct node *temp;
   
   p = first;
   while (p != NULL) {
     temp = p;
     p = p->next;
     free(temp);
   }
   ```

   

8. 15.2 节描述的文件 stack.c 提供了在栈中存储整数的函数。在那一节中，栈是用数组实现的。请修改程序stack.c从而使栈现在作为链表来存储。使用单独一个指向链表首结点的指针变量（栈“顶”）来替换变量contents和变量top。在stack.c中编写的函数要使用此指针。删除函数is_full，用返回 true（如果创建的结点可以获得内存）或false（如果创建的结点无法获得内存）的函数push来代替。  
   **ANS:**

   ```C
   #include <stdbool.h> /* C99 only */
   #include <stdio.h>
   #include <stdlib.h>
   // #include "stack.h"
   
   struct node
   {
       int value;
       struct node *next;
   };
   
   struct node *top = NULL;
   
   void make_empty(void)
   {
       struct node *temp;
   
       while (top != NULL)
       {
           temp = top;
           top = top->next;
           free(temp);
       }
   }
   
   bool is_empty(void)
   {
       return top == NULL;
   }
   
   bool push(int i)
   {
       struct node *new_node;
   
       new_node = malloc(sizeof(struct node));
       if (new_node == NULL)
           return false;
   
       new_node->value = i;
       new_node->next = top;
       top = new_node;
   
       return true;
   }
   
   int pop(void)
   {
       struct node *temp;
       int i;
   
       if (is_empty())
       {
           printf("*** Stack underflow; program terminated. ***\n");
           exit(EXIT_FAILURE);
       }
   
       i = top->value;
       temp = top;
       top = top->next;
       free(temp);
   
       return i;
   }
   ```

   ```C
   // myself
   #include <stdio.h>
   #include <stdlib.h>
   #include <stdbool.h>
   
   struct node
   {
       int value;
       struct node *next;
   };
   
   struct node *top = NULL;
   
   void make_empty(void)
   {
       struct node *to_delete;
       while (top != NULL)
       {
           to_delete = top;
           top = top->next;
           free(to_delete);
       }
   }
   
   bool is_empty(void)
   {
       return top == NULL;
   }
   
   bool push(int n)
   {
       struct node *new_node;
       new_node = malloc(sizeof(struct node));
       if (new_node == NULL)
           return false;
   
       new_node->value = n;
       new_node->next = top;
       top = new_node;
       return true;
   }
   
   int pop(void)
   {
       struct node *to_delete;
       int temp;
   
       if(is_empty())
       {
           printf("*** Stack underflow. program terminated. ***\n");
           exit(EXIT_FAILURE);
       }
       temp = top->value;
       to_delete = top;
       top = top->next;
       free(to_delete);
   
       return temp;
   }
   
   void read_number(void)
   {
       int n;
   
       printf("Enter a series of numbers to restore: ");
       while(scanf("%d", &n) == 1 && n != 0)
           if(!push(n))
               break;
   }
   
   void print_stack(void)
   {
       struct node *cur = top;
   
       printf("List :");
       while(cur != NULL)
       {
           printf(" %d -> ", cur->value);
           cur = cur->next;
       }
       printf("NULL\n");
   }
   
   int main(void)
   {
       int n;
   
       read_number();
       print_stack();
   
       printf("Pop the first element.\n");
       printf("Popped value :%d\n", pop());
   
       print_stack();
   
       make_empty();
       if(is_empty())
           printf("The stack is already empty.\n");
   
       return 0;
   }
   ```

   ```
   alancong@AlanCongdeMacBook-Air chapter_17 % ./a.out 
   Enter a series of numbers to restore: 1 2 3 4 5 6 7 8 9 0
   List : 9 ->  8 ->  7 ->  6 ->  5 ->  4 ->  3 ->  2 ->  1 -> NULL
   Pop the first element.
   Popped value :9
   List : 8 ->  7 ->  6 ->  5 ->  4 ->  3 ->  2 ->  1 -> NULL
   The stack is already empty.
   ```

9. 判断：如果x是一个结构而a是该结构的成员，那么(&x)->a与x.a是一样的。验证你的答案。

   ```C
   #include <stdio.h>
   
   struct node
   {
       int a;
       struct node *next;
   };
   
   int main(void)
   {
       struct node x = {1};
   
       printf("The value of struct x is %d.\n", x.a);
       printf("The value of struct x is %d.\n", (&x)->a);
   
       return 0;
   }
   ```

   ```
   alancong@AlanCongdeMacBook-Air chapter_17 % ./a.out 
   The value of struct x is 1.
   The value of struct x is 1.
   ```

10. 修改 16.2节的print_part 函数，使得它的形式参数是一个指向part 结构的指针。请使用->运算符。 

    ```C
    #include <stdio.h>
    
    #define NAME_LEN 20
    
    struct part
    {
        int number;
        char name[NAME_LEN + 1];
        int on_hand;
    };
    
    void print_part(struct part *p)
    {
        printf("Part number: %d\n", p->number);
        printf("Part name: %s\n", p->name);
        printf("Quantity on hand: %d\n", p->on_hand);
    }
    
    int main(void)
    {
        struct part part1 = {528, "Disk drive", 10};
        print_part(&part1);
    
        return 0;
    }
    ```

    ```
    alancong@AlanCongdeMacBook-Air chapter_17 % ./a.out 
    Part number: 528
    Part name: Disk drive
    Quantity on hand: 10
    ```

    

11. 编写下列函数：  

    ```C
    int count_occurrences(struct node *list, int n);  
    ```

    其中形式参数list指向一个链表。函数应返回n在该链表中出现的次数。node结构的定义见17.5节。  

    ```C
    int count_occurrences(struct node *list, int n)
    {
        int count = 0;
    
        while(list != NULL)
        {
            if(list->value == n)
                count ++;
            list = list->next;
        }
        return count;
    }
    ```

    ```C
    #include <stdio.h>
    #include <stdlib.h>
    
    struct node
    {
        int value;
        struct node *next;
    };
    
    struct node *add_to_list(struct node *list, int n);
    struct node *delete_from_list(struct node *list, int n);
    struct node *read_numbers(void);
    struct node *search_list(struct node *list, int n);
    int count_occurrences(struct node *list, int n);  
    void print_list(struct node *list);
    void free_list(struct node **list);
    
    int main(void)
    {
        struct node *list = NULL;
        struct node *found;
        int n, number;
    
        list = read_numbers();
        print_list(list);
    
        printf("Enter a number to delete:");
        scanf("%d", &n);
        list = delete_from_list(list, n);
        print_list(list);
    
        printf("Enter a number to search:");
        scanf("%d", &n);
        found = search_list(list, n);
        if(found != NULL)
            printf("%d is found at node %p\n", found->value, (void *)found);
        else
            printf("%d not found in the list.\n", n);
    
        printf("Enter the number to count: ");
        scanf("%d", &number);
        printf("%d occurs %d times.\n", number, count_occurrences(list, number));
    
        free_list(&list);
        print_list(list);
    
        return 0;
    }
    
    struct node *add_to_list(struct node *list, int n)
    {
        struct node *new_node;
        new_node = malloc(sizeof(struct node));
        if(new_node == NULL)
        {
            printf("Error: malloc failed in add_to_list.\n");
            exit(EXIT_FAILURE);
        }
        new_node->value = n;
        new_node->next = list;
    
        return new_node;
    }
    
    struct node *delete_from_list(struct node *list, int n)
    {
        struct node *cur, *to_delete;
    
        /* If the list is empty, return the list */
        if(list == NULL)
            return list;
    
        /* If the first node is the one to delete */
        if(list->value == n)
        {
            to_delete = list;
            list = list->next;
            free(to_delete);
            return list;
        }
    
        /* search for the node to delete (starting after the first) */
        for(cur = list;
            cur->next != NULL && cur->next->value != n;
            cur = cur->next)
            ;
        
        /* Did not find the node */
        if(cur->next == NULL)
            return list;
    
        /* Found the node to delete */
        to_delete = cur->next;
        cur->next = to_delete->next;
        free(to_delete);
    
        return list;
    }
    
    struct node *read_numbers(void)
    {
        struct node *list = NULL;
        int n;
        printf("Enter a series of integers (0 to terminate): ");
        for(;;)
        {
            scanf("%d", &n);
            if(n == 0)
                return list;
            list = add_to_list(list, n);
        }
    }
    
    struct node *search_list(struct node *list, int n)
    {
        for(;list != NULL;list = list->next)
            if(list->value == n)
                return list;
        return NULL;
    }
    
    int count_occurrences(struct node *list, int n)
    {
        int count = 0;
    
        while(list != NULL)
        {
            if(list->value == n)
                count ++;
            list = list->next;
        }
        return count;
    }
    
    void print_list(struct node *list)
    {
        printf("List :");
        for(;list != NULL;list = list->next)
            printf("%d -> ", list->value);
        printf("NULL\n");
    }
    
    void free_list(struct node **list)
    {
        struct node *to_delete;
        while(*list != NULL)
        {
            to_delete = *list;
            *list = (*list)->next;
            free(to_delete);
        }
    }
    ```

    ```
    alancong@AlanCongdeMacBook-Air chapter_17 % ./a.out 
    Enter a series of integers (0 to terminate): 1 2 2 2 2 3 0
    List :3 -> 2 -> 2 -> 2 -> 2 -> 1 -> NULL
    Enter a number to delete:3
    List :2 -> 2 -> 2 -> 2 -> 1 -> NULL
    Enter a number to search:2
    2 is found at node 0x101511b60
    Enter the number to count: 2
    2 occurs 4 times.
    List :NULL
    ```

12. 编写下列函数：  

    ```C
    struct node *find_last(struct node *list, int n); 
    ```

     其中形式参数list指向一个链表。函数应返回一个指针，该指针指向最后一个包含n的结点，如果 n 不存在则返回NULL。node结构的定义见17.5节。  

    ```C
    struct node *find_last(struct node *list, int n)
    {
        struct node *cur, *last;
        for (cur = list, last = NULL; cur != NULL; cur = cur->next)
        {
            if (cur->value == n)
                last = cur;
        }
        return last;
    }
    ```

    ```C
    #include <stdio.h>
    #include <stdlib.h>
    
    struct node
    {
        int value;
        struct node *next;
    };
    
    struct node *add_to_list(struct node *list, int n);
    struct node *delete_from_list(struct node *list, int n);
    struct node *read_numbers(void);
    struct node *search_list(struct node *list, int n);
    struct node *find_last(struct node *list, int n);
    int count_occurrences(struct node *list, int n);
    void print_list(struct node *list);
    void free_list(struct node **list);
    
    int main(void)
    {
        struct node *list = NULL;
        struct node *found;
        int n, number, m;
    
        list = read_numbers();
        print_list(list);
    
        printf("Enter a number to delete:");
        scanf("%d", &n);
        list = delete_from_list(list, n);
        print_list(list);
    
        printf("Enter a number to search:");
        scanf("%d", &n);
        found = search_list(list, n);
        if (found != NULL)
            printf("%d is found at node %p\n", found->value, (void *)found);
        else
            printf("%d not found in the list.\n", n);
    
        printf("Enter the number to count: ");
        scanf("%d", &number);
        printf("%d occurs %d times.\n", number, count_occurrences(list, number));
    
        printf("Enter the number to find the last node: ");
        scanf("%d", &m);
        printf("The last %d is at %p.\n", m, find_last(list, m));
    
        free_list(&list);
        print_list(list);
    
        return 0;
    }
    
    struct node *add_to_list(struct node *list, int n)
    {
        struct node *new_node;
        new_node = malloc(sizeof(struct node));
        if (new_node == NULL)
        {
            printf("Error: malloc failed in add_to_list.\n");
            exit(EXIT_FAILURE);
        }
        new_node->value = n;
        new_node->next = list;
    
        return new_node;
    }
    
    struct node *delete_from_list(struct node *list, int n)
    {
        struct node *cur, *to_delete;
    
        /* If the list is empty, return the list */
        if (list == NULL)
            return list;
    
        /* If the first node is the one to delete */
        if (list->value == n)
        {
            to_delete = list;
            list = list->next;
            free(to_delete);
            return list;
        }
    
        /* search for the node to delete (starting after the first) */
        for (cur = list;
             cur->next != NULL && cur->next->value != n;
             cur = cur->next)
            ;
    
        /* Did not find the node */
        if (cur->next == NULL)
            return list;
    
        /* Found the node to delete */
        to_delete = cur->next;
        cur->next = to_delete->next;
        free(to_delete);
    
        return list;
    }
    
    struct node *read_numbers(void)
    {
        struct node *list = NULL;
        int n;
        printf("Enter a series of integers (0 to terminate): ");
        for (;;)
        {
            scanf("%d", &n);
            if (n == 0)
                return list;
            list = add_to_list(list, n);
        }
    }
    
    struct node *search_list(struct node *list, int n)
    {
        for (; list != NULL; list = list->next)
            if (list->value == n)
                return list;
        return NULL;
    }
    
    struct node *find_last(struct node *list, int n)
    {
        struct node *cur, *last;
        for (cur = list, last = NULL; cur != NULL; cur = cur->next)
        {
            if (cur->value == n)
                last = cur;
        }
        return last;
    }
    
    int count_occurrences(struct node *list, int n)
    {
        int count = 0;
    
        while (list != NULL)
        {
            if (list->value == n)
                count++;
            list = list->next;
        }
        return count;
    }
    
    void print_list(struct node *list)
    {
        printf("List :");
        for (; list != NULL; list = list->next)
            printf("%d -> ", list->value);
        printf("NULL\n");
    }
    
    void free_list(struct node **list)
    {
        struct node *to_delete;
        while (*list != NULL)
        {
            to_delete = *list;
            *list = (*list)->next;
            free(to_delete);
        }
    }
    ```

    ```
    alancong@AlanCongdeMacBook-Air chapter_17 % ./a.out 
    Enter a series of integers (0 to terminate): 1 2 3 4 2 3 4 2 2 2 0
    List :2 -> 2 -> 2 -> 4 -> 3 -> 2 -> 4 -> 3 -> 2 -> 1 -> NULL
    Enter a number to delete:1
    List :2 -> 2 -> 2 -> 4 -> 3 -> 2 -> 4 -> 3 -> 2 -> NULL
    Enter a number to search:2
    2 is found at node 0x100db1ad0
    Enter the number to count: 2
    2 occurs 5 times.
    Enter the number to find the last node: 2
    The last 2 is at 0x100db1c90.
    List :NULL
    ```

13. 下面的函数希望在有序链表的适当位置插入一个新结点，并返回指向新链表首结点的指针。但是， 函数无法做到在所有的情况下都正确。解释问题所在，并说明如何修正。node结构的定义见17.5节。  

    ```C
    struct node *insert_into_ordered_list(struct node *list, struct node *new_node)
    {
        struct node *cur = list, *prev = NULL;
        while (cur->value <= new_node->value)
        {
            prev = cur;
            cur = cur->next;
        }
        prev->next = new_node;
        new_node->next = cur;
        return list;
    }
    ```

    ```
    函数出现的问题是
    ```

    ```C
    struct node *insert_into_ordered_list(struct node *list, struct node *new_node)
    {
        struct node *cur = list, *prev = NULL;
    
        if(list == NULL)
        {
            new_node->next = list;
            list = new_node;
            return list;
        }
    
        /* insert before the first node */
        if(new_node->value <= list->value)
        {
            new_node->next = list;
            return new_node;
        }
    
        while (cur != NULL && cur->value <= new_node->value)
        {
            prev = cur;
            cur = cur->next;
        }
    
        prev->next = new_node;
        new_node->next = cur;
        return list;
    }
    ```

    **进阶版本的写法：**

    ```C
    struct node *insert_into_ordered_list(struct node *list,
                                          struct node *new_node)
    {
        struct node **pp = &list;
    
        while (*pp != NULL && (*pp)->value <= new_node->value)
            pp = &(*pp)->next;
    
        new_node->next = *pp;
        *pp = new_node;
    
        return list;
    }
    ```

    

17.6 节  

14. 修改函数delete_from_list（17.5节），使函数的第一个形式参数是struct node **类型（即指向链表首结点的指针的指针），并且返回类型是void。在删除了期望的结点后，函数delete_from_list 必须修改第一个实际参数，使其指向该链表。  

    ```C
    void delete_from_list(struct node **list, int n)
    {
        struct node *cur, *prev;
        for (cur = *list, prev = NULL;
             cur != NULL && cur->value != n;
             prev = cur, cur = cur->next)
            ;
        if (cur == NULL)
            return ; /* n was not found */
        if (prev == NULL)
            *list = (*list)->next; /* n is in the first node */
        else
            prev->next = cur->next; /* n is in some other node */
        free(cur);
    }
    ```

    **ANS：**

    ```C
    void delete_from_list(struct node **list, int n)
    {
        struct node **pp = list;
        struct node *to_delete;
    
        while (*pp != NULL && (*pp)->value != n) {
            pp = &(*pp)->next;
        }
    
        if (*pp == NULL)
            return;   /* n was not found */
    
        to_delete = *pp;
        *pp = to_delete->next;
        free(to_delete);
    }
    
    ```

    

17.7 节  

15. 请说明下列程序的输出结果，并解释程序的功能。  

    ```C
    #include <stdio.h>
    int f1(int (*f)(int));
    int f2(int i);
    int main(void)
    {
        printf("Answer: %d\n", f1(f2));
        return 0;
    }
    int f1(int (*f)(int))
    {
        int n = 0;
        while ((*f)(n))
            n++;
        return n;
    }
    int f2(int i)
    {
        return i * i + i - 12;
    }
    ```

    ```
    alancong@AlanCongdeMacBook-Air chapter_17 % ./a.out 
    Answer: 3
    ```

    ```
    该程序利用函数指针将f2传递给f1，f1从0开始逐个测试整数n，寻找满足f2(n) == 0的最小非负整数解，也就是解方程x^2+x-12=0的非负整数解，可以因式分解为(x + 4)(x - 3) = 0，因此程序最终的输出结果就是x = 3.
    ```

    **ANS：**

    ```
    The output of the program is
    
    Answer: 3
    The program tests the values of f2(0), f2(1), f2(2), and so on, stopping when f2 returns zero. It then prints the argument that was passed to f2 to make it return zero.
    ```

    

16. 编写下列函数。调用sum(g, i, j)应该返回g(i) + … + g(j)。  

    ```C
    int sum(int (*f)(int), int start, int end);
    ```

    ```C
    #include <stdio.h>
    
    int sum(int (*f)(int), int start, int end);
    int g(int i);
    
    int main(void)
    {
        printf("The sum is %d.\n", sum(g, 1, 10));
        return 0;
    }
    
    int sum(int (*f)(int), int start, int end)
    {
        int sum = 0;
        for(int i = start;i <= end;i ++)
            sum += (*f)(i);
        return sum;
    }
    
    int g(int i)
    {
        return i * i;
    }
    ```

    ```
    alancong@AlanCongdeMacBook-Air chapter_17 % ./a.out 
    The sum is 385.
    ```

    

17. 设a是有100个整数的数组。请编写函数qsort的调用，只对数组a中的后50个元素进行排序。（不需要编写比较函数。）  
    **ANS：**

    ```C
    Assuming that compare is the name of the comparison function, the following call of qsort will sort the last 50 elements of a:
    
    qsort(&a[50], 50, sizeof(a[0]), compare);
    ```

    ```C
    #include <stdio.h>
    #include <stdlib.h>
    
    int a[100] = {
        42, 7, 89, 15, 63, 28, 91, 3, 56, 74,
        18, 99, 34, 2, 67, 81, 45, 23, 10, 58,
        77, 6, 31, 94, 50, 12, 86, 39, 71, 20,
        65, 4, 97, 29, 52, 14, 88, 60, 25, 83,
        9, 70, 36, 92, 47, 19, 75, 1, 68, 33,
        55, 96, 21, 80, 8, 44, 90, 26, 62, 17,
        73, 5, 84, 40, 59, 11, 95, 30, 66, 22,
        49, 87, 13, 72, 35, 98, 27, 61, 16, 82,
        54, 24, 93, 41, 64, 6, 78, 32, 69, 48,
        57, 85, 37, 100, 53, 76, 43, 52, 14, 90
    };
    
    
    int compare(const void *p, const void *q)
    {
        int x = *(const int *)p;
        int y = *(const int *)q;
        return x - y;
    }
    
    int main(void)
    {
        printf("The first 50 elements :");
        for(int i = 0;i < 50;i ++)
            printf("%d ", a[i]);
        printf("\n");
        printf("The last 50 elements :");
        for(int i = 50;i < 100;i ++)
            printf("%d ", a[i]);
        printf("\n");
    
        qsort(&a[50], 50, sizeof(a[0]), compare);
    
        printf("The first 50 elements :");
        for(int i = 0;i < 50;i ++)
            printf("%d ", a[i]);
        printf("\n");
        printf("The last 50 elements :");
        for(int i = 50;i < 100;i ++)
            printf("%d ", a[i]);
        printf("\n");
    
        return 0;
    }
    ```

    ```
    alancong@AlanCongdeMacBook-Air chapter_17 % ./a.out 
    The first 50 elements :42 7 89 15 63 28 91 3 56 74 18 99 34 2 67 81 45 23 10 58 77 6 31 94 50 12 86 39 71 20 65 4 97 29 52 14 88 60 25 83 9 70 36 92 47 19 75 1 68 33 
    The last 50 elements :55 96 21 80 8 44 90 26 62 17 73 5 84 40 59 11 95 30 66 22 49 87 13 72 35 98 27 61 16 82 54 24 93 41 64 6 78 32 69 48 57 85 37 100 53 76 43 52 14 90 
    The first 50 elements :42 7 89 15 63 28 91 3 56 74 18 99 34 2 67 81 45 23 10 58 77 6 31 94 50 12 86 39 71 20 65 4 97 29 52 14 88 60 25 83 9 70 36 92 47 19 75 1 68 33 
    The last 50 elements :5 6 8 11 13 14 16 17 21 22 24 26 27 30 32 35 37 40 41 43 44 48 49 52 53 54 55 57 59 61 62 64 66 69 72 73 76 78 80 82 84 85 87 90 90 93 95 96 98 100 
    ```

    

18. 请修改函数compare_parts 使零件根据编号进行降序排列。  

    ```C
    int compare_parts(const void *p, const void *q)
    {
        if (((struct part *)p)->number <
            ((struct part *)q)->number)
            return 1;
        else if (((struct part *)p)->number ==
                 ((struct part *)q)->number)
            return 0;
        else
            return -1;
    }
    ```

    

19. 请编写一个函数，要求在给定字符串作为实际参数时，此函数搜索下列所示的结构数组寻找匹配的命令名，然后调用和匹配名称相关的函数：  

    ```C
    struct
    {
        char *cmd_name;
        void (*cmd_pointer)(void);
    } file_cmd[] =
        {{"new", new_cmd},
         {"open", open_cmd},
         {"close", close_cmd},
         {"close all", close_all_cmd},
         {"save", save_cmd},
         {"save as", save_as_cmd},
         {"save all", save_all_cmd},
         {"print", print_cmd},
         {"exit", exit_cmd}
    };
    ```

    ```C
    #include <stdio.h>
    #include <stdbool.h>
    #include <string.h>
    
    void new_cmd(void)
    {
        printf("new_cmd called\n");
    }
    
    void open_cmd(void)
    {
        printf("open_cmd called\n");
    }
    
    void close_cmd(void)
    {
        printf("close_cmd called\n");
    }
    
    void close_all_cmd(void)
    {
        printf("close_all_cmd called\n");
    }
    
    void save_cmd(void)
    {
        printf("save_cmd called\n");
    }
    
    void save_as_cmd(void)
    {
        printf("save_as_cmd called\n");
    }
    
    void save_all_cmd(void)
    {
        printf("save_all_cmd called\n");
    }
    
    void print_cmd(void)
    {
        printf("print_cmd called\n");
    }
    
    void exit_cmd(void)
    {
        printf("exit_cmd called\n");
    }
    
    
    struct
    {
        char *cmd_name;
        void (*cmd_pointer)(void);
    } file_cmd[] =
        {{"new", new_cmd},
         {"open", open_cmd},
         {"close", close_cmd},
         {"close all", close_all_cmd},
         {"save", save_cmd},
         {"save as", save_as_cmd},
         {"save all", save_all_cmd},
         {"print", print_cmd},
         {"exit", exit_cmd}};
    
    
    bool cmd_function(const char *cmd)
    {
        int len = sizeof(file_cmd) / sizeof(file_cmd[0]);
        for(int i = 0;i < len;i ++)
        {
            if(strcmp(file_cmd[i].cmd_name, cmd) == 0)
            {
                (*file_cmd[i].cmd_pointer)();
                return true;
            }
        }
        return false;
    }
    
    int main(void)
    {
        char *a = "save all";
        if(!cmd_function(a))
            printf("Error : false input.\n");
        return 0;
    }
    ```

    ```
    alancong@AlanCongdeMacBook-Air chapter_17 % ./a.out 
    save_all_cmd called
    ```

    

### 编程题

1. 修改 16.3节的程序 inventory.c，使其可以对数组 inventory 进行动态内存分配，并且在以后填满时重新进行内存分配。初始使用malloc为拥有10个part结构的数组分配足够的内存空间。当数组没有足够的空间给新的零件时，使用realloc 函数来使内存数量加倍。在每次数组变满时重复加倍操作步骤。
   **ANS:**

   ```C
   #include <stdio.h>
   #include <stdlib.h>
   #include "readline.h"
   
   #define NAME_LEN 25
   #define INITIAL_PARTS 10
   
   struct part {
     int number;
     char name[NAME_LEN+1];
     int on_hand;
   };
   
   struct part *inventory;
   int num_parts = 0;      /* number of parts currently stored */
   int max_parts = INITIAL_PARTS;   /* size of inventory array */
   
   int find_part(int number);
   void insert(void);
   void search(void);
   void update(void);
   void print(void);
   
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
   
     inventory = malloc(max_parts * sizeof(struct part));
     if (inventory == NULL) {
       printf("Can't allocate initial inventory space.\n");
       exit(EXIT_FAILURE);
     }
   
     for (;;) {
       printf("Enter operation code: ");
       scanf(" %c", &code);
       while (getchar() != '\n')   /* skips to end of line */
         ;
       switch (code) {
         case 'i': insert();
                   break;
         case 's': search();
                   break;
         case 'u': update();
                   break;
         case 'p': print();
                   break;
         case 'q': return 0;
         default:  printf("Illegal code\n");
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
     struct part *temp;
   
     if (num_parts == max_parts) {
       max_parts *= 2;
       temp = realloc(inventory, max_parts * sizeof(struct part));
       if (temp == NULL) {
         printf("Insufficient memory; can't add more parts.\n");
         return;
       }
       inventory = temp;
     }
   
     printf("Enter part number: ");
     scanf("%d", &part_number);
     if (find_part(part_number) >= 0) {
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
     if (i >= 0) {
       printf("Part name: %s\n", inventory[i].name);
       printf("Quantity on hand: %d\n", inventory[i].on_hand);
     } else
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
     if (i >= 0) {
       printf("Enter change in quantity on hand: ");
       scanf("%d", &change);
       inventory[i].on_hand += change;
     } else
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
   
     printf("Part Number   Part Name                  "
            "Quantity on Hand\n");
     for (i = 0; i < num_parts; i++)
       printf("%7d       %-25s%11d\n", inventory[i].number,
              inventory[i].name, inventory[i].on_hand);
   }
   ```

     **自己写的：**

   ```C
   #include <stdio.h>
   #include <stdlib.h>
   #include "readline.h"
   
   #define NAME_LEN 10
   // #define MAX_PARTS 100
   
   int max_parts = 10;
   
   struct part
   {
       int number;
       char name[NAME_LEN + 1];
       int on_hand;
   } ;
   
   int num_parts = 0; /* number of parts currently stored */
   struct part *inventory;
   
   int find_part(int number);
   void insert(void);
   void search(void);
   void update(void);
   void print(void);
   
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
       struct part *temp;
   
       if (num_parts == max_parts)
       {
           max_parts *= 2;
           temp = realloc(inventory, max_parts * sizeof(struct part));
           if(temp == NULL)
           {
               printf("Insufficient memory; can't add more parts.\n");
               return;
           }
           inventory = temp;
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
   
       printf("Part Number   Part Name                  "
              "Quantity on Hand\n");
       for (i = 0; i < num_parts; i++)
           printf("%7d       %-25s%11d\n", inventory[i].number,
                  inventory[i].name, inventory[i].on_hand);
   }
   ```

   ```C
   // 工业级别的代码
   bool ensure_capacity(struct part **inventory,
                        int *max_parts,
                        int num_parts)
   {
       struct part *new_buf;
       int new_capacity;
   
       if (num_parts < *max_parts)
           return true;   /* still have space */
   
       /* 1. 计算新容量，但不修改旧状态 */
       new_capacity = (*max_parts == 0) ? 1 : (*max_parts * 2);
   
       /* 2. 尝试扩容 */
       new_buf = realloc(*inventory,
                          new_capacity * sizeof **inventory);
   
       if (new_buf == NULL)
           return false;  /* 状态完全未改变 */
   
       /* 3. 提交状态（原子性） */
       *inventory = new_buf;
       *max_parts = new_capacity;
   
       return true;
   }
   ```

1. 修改16.3节的程序inventory.c，使得p命令在显示零件前调用qsort对inventory数组排序。
   **ANS:**

   ```C
   #include <stdio.h>
   #include <stdlib.h>
   #include "readline.h"
   
   #define NAME_LEN 25
   #define MAX_PARTS 100
   
   struct part {
     int number;
     char name[NAME_LEN+1];
     int on_hand;
   } inventory[MAX_PARTS];
   
   int num_parts = 0;   /* number of parts currently stored */
   
   int find_part(int number);
   void insert(void);
   void search(void);
   void update(void);
   void print(void);
   int compare_parts(const void *p, const void *q);
   
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
   
     for (;;) {
       printf("Enter operation code: ");
       scanf(" %c", &code);
       while (getchar() != '\n')   /* skips to end of line */
         ;
       switch (code) {
         case 'i': insert();
                   break;
         case 's': search();
                   break;
         case 'u': update();
                   break;
         case 'p': print();
                   break;
         case 'q': return 0;
         default:  printf("Illegal code\n");
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
   
     if (num_parts == MAX_PARTS) {
       printf("Database is full; can't add more parts.\n");
       return;
     }
   
     printf("Enter part number: ");
     scanf("%d", &part_number);
     if (find_part(part_number) >= 0) {
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
     if (i >= 0) {
       printf("Part name: %s\n", inventory[i].name);
       printf("Quantity on hand: %d\n", inventory[i].on_hand);
     } else
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
     if (i >= 0) {
       printf("Enter change in quantity on hand: ");
       scanf("%d", &change);
       inventory[i].on_hand += change;
     } else
       printf("Part not found.\n");
   }
   
   /**********************************************************
    * print: Sorts the inventory array by part number, then  *
    *        prints a listing of all parts in the database,  *
    *        showing the part number, part name, and         *
    *        quantity on hand.                               *
    **********************************************************/
   void print(void)
   {
     int i;
   
     qsort(inventory, num_parts, sizeof(struct part), compare_parts);
     printf("Part Number   Part Name                  "
            "Quantity on Hand\n");
     for (i = 0; i < num_parts; i++)
       printf("%7d       %-25s%11d\n", inventory[i].number,
              inventory[i].name, inventory[i].on_hand);
   }
   
   int compare_parts(const void *p, const void *q)
   {
     return ((struct part *) p)->number - ((struct part *) q)->number;
   }
   ```

     **自己写的：**

   ```C
   #include <stdio.h>
   #include <stdlib.h>
   #include "readline.h"
   
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
   int compare(const void *p, const void *q)
   {
       return ((struct part *)p)->number - ((struct part *)q)->number;
   }
   
   void print(void)
   {
       int i;
   
       qsort(inventory, num_parts, sizeof(struct part), compare);
       printf("Part Number   Part Name                  "
              "Quantity on Hand\n");
       for (i = 0; i < num_parts; i++)
           printf("%7d       %-25s%11d\n", inventory[i].number,
                  inventory[i].name, inventory[i].on_hand);
   }
   ```

   ```
   alancong@AlanCongdeMacBook-Air chapter_17 % ./a.out 
   Enter operation code: i
   Enter part number: 6
   Enter part name: test
   Enter quantity on hand: 9
   
   Enter operation code: i
   Enter part number: 2
   Enter part name: luck
   Enter quantity on hand: 7
   
   Enter operation code: p
   Part Number   Part Name                  Quantity on Hand
         2       luck                               7
         6       test                               9
   
   Enter operation code: q
   ```

1. 修改17.5节的程序inventory2.c，增加一个e命令（擦除）以允许用户从数据库中删除一个零件。  

   ```C
   /*********************************************************
    * From C PROGRAMMING: A MODERN APPROACH, Second Edition *
    * By K. N. King                                         *
    * Copyright (c) 2008, 1996 W. W. Norton & Company, Inc. *
    * All rights reserved.                                  *
    * This program may be freely distributed for class use, *
    * provided that this copyright notice is retained.      *
    *********************************************************/
   
   /* inventory2.c (Chapter 17, page 434) */
   /* Maintains a parts database (linked list version) */
   
   #include <stdio.h>
   #include <stdlib.h>
   #include "readline.h"
   
   #define NAME_LEN 25
   
   struct part
   {
       int number;
       char name[NAME_LEN + 1];
       int on_hand;
       struct part *next;
   };
   
   struct part *inventory = NULL; /* points to first part */
   
   struct part *find_part(int number);
   void insert(void);
   void delete(void);
   void search(void);
   void update(void);
   void print(void);
   
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
           case 'e':
               delete();
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
    *            list. Returns a pointer to the node         *
    *            containing the part number; if the part     *
    *            number is not found, returns NULL.          *
    **********************************************************/
   struct part *find_part(int number)
   {
       struct part *p;
   
       for (p = inventory;
            p != NULL && number > p->number;
            p = p->next)
           ;
       if (p != NULL && number == p->number)
           return p;
       return NULL;
   }
   
   /**********************************************************
    * insert: Prompts the user for information about a new   *
    *         part and then inserts the part into the        *
    *         inventory list; the list remains sorted by     *
    *         part number. Prints an error message and       *
    *         returns prematurely if the part already exists *
    *         or space could not be allocated for the part.  *
    **********************************************************/
   void insert(void)
   {
       struct part *cur, *prev, *new_node;
   
       new_node = malloc(sizeof(struct part));
       if (new_node == NULL)
       {
           printf("Database is full; can't add more parts.\n");
           return;
       }
   
       printf("Enter part number: ");
       scanf("%d", &new_node->number);
   
       for (cur = inventory, prev = NULL;
            cur != NULL && new_node->number > cur->number;
            prev = cur, cur = cur->next)
           ;
       if (cur != NULL && new_node->number == cur->number)
       {
           printf("Part already exists.\n");
           free(new_node);
           return;
       }
   
       printf("Enter part name: ");
       read_line(new_node->name, NAME_LEN);
       printf("Enter quantity on hand: ");
       scanf("%d", &new_node->on_hand);
   
       new_node->next = cur;
       if (prev == NULL)
           inventory = new_node;
       else
           prev->next = new_node;
   }
   
   void delete(void)
   {
       struct part *cur, *to_delete;
       int n;
   
       printf("Enter the part number to delete: ");
       scanf("%d", &n);
   
       if (inventory == NULL)
           return;
   
       if (inventory->number == n)
       {
           to_delete = inventory;
           inventory = inventory->next;
           free(to_delete);
           return;
       }
   
       for (cur = inventory; cur->next != NULL && cur->next->number != n; cur = cur->next)
           ;
   
       // did not find
       if (cur->next == NULL)
       {
           printf("Part not found.\n");
           return;
       }
   
       to_delete = cur->next;
       cur->next = to_delete->next;
       free(to_delete);
       return;
   }
   
   /**********************************************************
    * search: Prompts the user to enter a part number, then  *
    *         looks up the part in the database. If the part *
    *         exists, prints the name and quantity on hand;  *
    *         if not, prints an error message.               *
    **********************************************************/
   void search(void)
   {
       int number;
       struct part *p;
   
       printf("Enter part number: ");
       scanf("%d", &number);
       p = find_part(number);
       if (p != NULL)
       {
           printf("Part name: %s\n", p->name);
           printf("Quantity on hand: %d\n", p->on_hand);
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
       int number, change;
       struct part *p;
   
       printf("Enter part number: ");
       scanf("%d", &number);
       p = find_part(number);
       if (p != NULL)
       {
           printf("Enter change in quantity on hand: ");
           scanf("%d", &change);
           p->on_hand += change;
       }
       else
           printf("Part not found.\n");
   }
   
   /**********************************************************
    * print: Prints a listing of all parts in the database,  *
    *        showing the part number, part name, and         *
    *        quantity on hand. Part numbers will appear in   *
    *        ascending order.                                *
    **********************************************************/
   void print(void)
   {
       struct part *p;
   
       printf("Part Number   Part Name                  "
              "Quantity on Hand\n");
       for (p = inventory; p != NULL; p = p->next)
           printf("%7d       %-25s%11d\n", p->number, p->name,
                  p->on_hand);
   }
   ```

   ```
   alancong@AlanCongdeMacBook-Air chapter_17 % ./a.out 
   Enter operation code: i
   Enter part number: 1
   Enter part name: ipad 
   Enter quantity on hand: 9
   
   Enter operation code: i
   Enter part number: 2
   Enter part name: iphone
   Enter quantity on hand: 28
   
   Enter operation code: p
   Part Number   Part Name                  Quantity on Hand
         1       ipad                               9
         2       iphone                            28
   
   Enter operation code: e
   Enter the part number to delete: 2
   
   Enter operation code: e
   Enter the part number to delete: 3
   Part not found.
   
   Enter operation code: q
   ```

1. 修改15.3节的程序justify，重新编写line.c文件使其存储链表中的当前行。链表中的每个结点存储一个单词。用一个指向包含第一个单词的结点的指针变量来替换原有的line数组，当行为空时该变量存储空指针。
   **原来的代码：**

   ```C
   #include <stdio.h>
   #include <string.h>
   #include "line.h"
   #define MAX_LINE_LEN 60
   char line[MAX_LINE_LEN + 1];
   int line_len = 0;
   int num_words = 0;
   
   void clear_line(void)
   {
       line[0] = '\0';
       line_len = 0;
       num_words = 0;
   }
   void add_word(const char *word)
   {
       if (num_words > 0)
       {
           line[line_len] = ' ';
           line[line_len + 1] = '\0';
           line_len++;
       }
       strcat(line, word);
       line_len += strlen(word);
       num_words++;
   }
   int space_remaining(void) 
   { 
       return MAX_LINE_LEN - line_len; 
   }
   void write_line(void)
   {
       int extra_spaces, spaces_to_insert, i, j;
       extra_spaces = MAX_LINE_LEN - line_len;
       for (i = 0; i < line_len; i++)
       {
           if (line[i] != ' ')
               putchar(line[i]);
           else
           {
               spaces_to_insert = extra_spaces / (num_words - 1);
               for (j = 1; j <= spaces_to_insert + 1; j++)
                   putchar(' ');
               extra_spaces -= spaces_to_insert;
               num_words--;
           }
       }
       putchar('\n');
   }
   void flush_line(void)
   {
       if (line_len > 0)
           puts(line);
   }
   ```

   **ChatGPT给的答案，问题有点难度，确实没写出来：**

   ```C
   #include <stdio.h>
   #include <stdlib.h>
   #include <string.h>
   #include "line.h"
   
   #define MAX_LINE_LEN 60
   
   /* Linked-list node: stores a single word */
   struct node
   {
       char *word;         /* dynamically allocated string for the word */
       struct node *next;
   };
   
   /* Pointer replaces the original line[] array:
      'line' points to the first word node of the current line;
      when the line is empty, line == NULL */
   static struct node *line = NULL;
   
   /* Keep the original statistics: line length and word count */
   static int line_len = 0;
   static int num_words = 0;
   
   /* Frees the entire linked list (used by clear_line) */
   static void free_line(void)
   {
       struct node *p = line;
       while (p != NULL)
       {
           struct node *next = p->next;
           free(p->word);
           free(p);
           p = next;
       }
       line = NULL;
   }
   
   void clear_line(void)
   {
       /* Original version: line[0] = '\0'
          New version: free the linked list and reset the head pointer */
       free_line();
       line_len = 0;
       num_words = 0;
   }
   
   void add_word(const char *word)
   {
       /* Original version: append characters to line[]
          New version: create a new node, copy the word into it,
          and append the node to the end of the list */
   
       struct node *new_node = malloc(sizeof(struct node));
       if (new_node == NULL)
       {
           fprintf(stderr, "malloc failed\n");
           exit(EXIT_FAILURE);
       }
   
       new_node->word = malloc(strlen(word) + 1);
       if (new_node->word == NULL)
       {
           fprintf(stderr, "malloc failed\n");
           exit(EXIT_FAILURE);
       }
       strcpy(new_node->word, word);
       new_node->next = NULL;
   
       /* Append the new node to the end of the list */
       if (line == NULL)
       {
           line = new_node;
       }
       else
       {
           struct node *p = line;
           while (p->next != NULL)
               p = p->next;
           p->next = new_node;
       }
   
       /* Maintain line_len and num_words:
          if this is not the first word, there is one space before it */
       if (num_words > 0)
           line_len += 1;     /* space between words */
   
       line_len += (int)strlen(word);
       num_words++;
   }
   
   int space_remaining(void)
   {
       return MAX_LINE_LEN - line_len;
   }
   
   /* To write a line, we traverse the list and print each word,
      inserting spaces between words.
      write_line performs full justification by distributing extra spaces.
   */
   void write_line(void)
   {
       int extra_spaces, spaces_to_insert, j;
       struct node *p;
   
       if (num_words == 0)
       {
           putchar('\n');
           return;
       }
   
       extra_spaces = MAX_LINE_LEN - line_len;
   
       /* If there is only one word, no extra spaces are needed */
       if (num_words == 1)
       {
           puts(line->word);
           return;
       }
   
       p = line;
   
       /* Print the first word */
       fputs(p->word, stdout);
       p = p->next;
   
       /* From the second word on, print spaces followed by the word */
       /* Note: unlike the original version, we do not decrement num_words
          during output; instead we track how many gaps remain */
       int gaps_left = num_words - 1;
   
       while (p != NULL)
       {
           /* Each gap gets at least one space.
              Extra spaces are evenly distributed among the remaining gaps. */
           spaces_to_insert = extra_spaces / gaps_left;
   
           /* Print 1 + spaces_to_insert spaces */
           for (j = 0; j < 1 + spaces_to_insert; j++)
               putchar(' ');
   
           extra_spaces -= spaces_to_insert;
           gaps_left--;
   
           fputs(p->word, stdout);
           p = p->next;
       }
   
       putchar('\n');
   }
   
   /* flush_line prints the line without justification,
      using a single space between words */
   void flush_line(void)
   {
       struct node *p = line;
   
       if (line_len == 0)     /* alternatively: if (line == NULL) */
           return;
   
       while (p != NULL)
       {
           fputs(p->word, stdout);
           if (p->next != NULL)
               putchar(' ');
           p = p->next;
       }
       putchar('\n');
   }
   ```

   **自己写的代码：**

   ```
   
   ```

   

1. 编写程序对用户输入的一系列单词排序：  

   ```
   Enter word: foo 
   Enter word: bar 
   Enter word: baz 
   Enter word: quux 
   Enter word:   
   In sorted order: bar baz foo quux
   ```

   假设每个单词不超过20个字符。当用户输入空单词（即敲击回车键而没有输入任何单词）时停止读取。把每个单词存储在一个动态分配的字符串中，像remind2.c程序（17.2节）那样用一个指针数组来跟踪这些字符串。读完所有的单词后对数组排序（可以使用任何排序算法），然后用一个循环按存储顺序显示这些单词。提示：像remind2.c那样，使用read_line函数读取每个单词。  

   ```
   
   ```

1. 修改编程题5，用qsort对指针数组排序。  

   ```
   
   ```

1. 修改17.2节的remind2.c程序，使得 reminders 数组中的每个元素都是指向vstring 结构（见 17.9 节）的指针，而不是指向普通字符串的指针。

   ```
   
   ```

   
