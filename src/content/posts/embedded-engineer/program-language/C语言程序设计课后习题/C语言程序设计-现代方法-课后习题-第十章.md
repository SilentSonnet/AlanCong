---
title: 《C语言程序设计-现代方法》-课后习题-第十章
published: 2026-03-09
description: ''
image: ''
tags: []
category: '程序设计'
draft: false 
lang: ''
---

## 第十章 程序结构

### 练习题

10.4 节

1. 下面的程序框架只显示了函数定义和变量声明。


```C
int a;
void f(int b) {
    int c;
}
void g(void) {
    int d;
    {
        int e;
    }
}
int main(void) {
    int f;
}
```

列出下面每种作用域内所有变量的名字和形式参数的名字。

```
(a) f 函数。
(b) g 函数。
(c) 声明 e 的程序块。
(d) main 函数。
```

```
(a) f 函数。 在f函数的作用域内有全局变量int a，形式参数int b，局部变量int c。
(b) g 函数。 在g函数的作用域内有全局变量int a，局部变量int d，更小的花括号作用域中有int e。
(c) 声明 e 的程序块。 程序块作用域中的变量有全局变量int a，局部变量int e。
(d) main 函数。 在main函数中有全局变量int a，局部变量int f。
```

2. 下面的程序框架只显示了函数定义和变量声明。

```C
int b, c;
void f(void) {
    int b, d;
}
void g(int a) {
    int c;
    {
        int a, d;
    }
}
int main(void) {
    int c, d;
}
```

列出下面每种作用域内所有变量的名字和形式参数的名字。如果有多个同名的变量或形式参数，指明具体是哪一个。

```
(a) f 函数。
(b) g 函数。
(c) 声明 a 和 d 的程序块。
(d) main 函数。
```

```
(a) f 函数。 f函数的作用域中有全局变量int c，局部变量int b和int d，全局变量int b被局部变量int b隐藏。
(b) g 函数。 g函数的作用域中有全局变量int b，局部变量int c，最内层的程序块中有局部变量int a和int d，全局变量int c被局部变量int c隐藏。
(c) 声明 a 和 d 的程序块。 最内层的程序块中有局部变量int a和int d以及前面声明的局部变量int c，全局变量int c被局部变量int c隐藏。
(d) main 函数。 main函数的作用域中有全局变量int b，局部变量int c，int d，全局变量int c被局部变量int c隐藏。
```



*3. 如果程序只有一个函数（main），那么它最多可以包含多少个名为 i 的不同变量？

```
程序虽然只有一个main函数，但是经过不同的程序块的嵌套就可以有无穷多名为i的不同变量。
```



### 编程题

1. 改10.2节的栈示例使它存储字符而不是整数。接下来，增加main函数，用来要求用户输入一串圆括号或花括号，然后指出它们之间的嵌套是否正确：


```
Enter parenteses and/or braces: ((){}{()})
Parenteses/braces are nested properly
```

提示：读入左圆括号或左花括号时，把它们像字符一样压入栈中。当读入右圆括号或右花括号时，把栈顶的项弹出，并且检查弹出项是否是匹配的圆括号或花括号。（如果不是，那么圆括号或花括号嵌套不正确。）当程序读入换行符时，检查栈是否为空。如果为空，那么圆括号或花括号匹配；如果栈不为空（或者如果曾经调用过stack_underflow函数），那么圆括号或花括号不匹配。如果调用stack_overflow函数，程序显示信息Stack overflow，并且立刻终止。

```C
#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h> /* C99 only */

#define STACK_SIZE 100
/* external variables */

char contents[STACK_SIZE];
int top = 0;

void stack_overflow()
{
    printf("The stack is overflowed!\n");
    printf("Parenteses/braces are not nested properly\n");

    exit(1);
}

void stack_underflow()
{
    printf("The stack is underflowed!\n");
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

void push(int i)
{
    if (is_full())
        stack_overflow();
    else
        contents[top++] = i;
}

char pop(void)
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
    char ch;
    printf("Enter parenteses and/or braces: ");
    while ((ch = getchar()) != '\n')
    {
        if (ch == '(' || ch == '{')
            if (!is_full())
                push(ch);
            else
                stack_overflow();
        else if (ch == ')' || ch == '}')
        {
            char stack_top;
            stack_top = pop();
            if ((stack_top == '(' && ch == ')') || (stack_top == '{' && ch == '}'))
                ;
            else
                push(stack_top);
        }
        else
            printf("False input, ingored.\n");
    }

    if (is_empty())
        printf("Parenteses/braces are nested properly\n");
    else
        printf("Parenteses/braces are not nested properly\n");

    return 0;
}
```

```
alancong@AlanCongdeMacBook-Air chapter_10 % ./a.out 
Enter parenteses and/or braces: ((){}{()})
Parenteses/braces are nested properly
```

2. 修改10.5节的poker.c程序，把数组num_in_rank和数组num_in_suit移到main函数中。main函数将把这两个数组作为实际参数传递给read_cards函数和analyze_hand函数。

```C
/*********************************************************
 * From C PROGRAMMING: A MODERN APPROACH, Second Edition *
 * By K. N. King                                         *
 * Copyright (c) 2008, 1996 W. W. Norton & Company, Inc. *
 * All rights reserved.                                  *
 * This program may be freely distributed for class use, *
 * provided that this copyright notice is retained.      *
 *********************************************************/

/* poker.c (Chapter 10, page 233) */
/* Classifies a poker hand */

#include <stdbool.h> /* C99 only */
#include <stdio.h>
#include <stdlib.h>

#define NUM_RANKS 13
#define NUM_SUITS 4
#define NUM_CARDS 5

/* external variables */
bool straight, flush, four, three;
int pairs; /* can be 0, 1, or 2 */

/* prototypes */
void read_cards(int num_in_rank[], int num_in_suit[]);
void analyze_hand(int num_in_rank[], int num_in_suit[]);
void print_result(void);

/**********************************************************
 * main: Calls read_cards, analyze_hand, and print_result *
 *       repeatedly.                                      *
 **********************************************************/
int main(void)
{
    int num_in_rank[NUM_RANKS];
    int num_in_suit[NUM_SUITS];

    for (;;)
    {
        read_cards(num_in_rank, num_in_suit);
        analyze_hand(num_in_rank, num_in_suit);
        print_result();
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
        case '2':           hand[cards_read][0] = 0; break;
        case '3':           hand[cards_read][0] = 1; break;
        case '4':           hand[cards_read][0] = 2; break;
        case '5':           hand[cards_read][0] = 3; break;
        case '6':           hand[cards_read][0] = 4; break;
        case '7':           hand[cards_read][0] = 5; break;
        case '8':           hand[cards_read][0] = 6; break;
        case '9':           hand[cards_read][0] = 7; break;
        case 't': case 'T': hand[cards_read][0] = 8; break;
        case 'j': case 'J': hand[cards_read][0] = 9; break;
        case 'q': case 'Q': hand[cards_read][0] = 10; break;
        case 'k': case 'K': hand[cards_read][0] = 11; break;
        case 'a': case 'A': hand[cards_read][0] = 12; break;
        default:            bad_card = true;
        }

        suit_ch = getchar();
        switch (suit_ch) {
        case 'c': case 'C': hand[cards_read][1] = 0; break;
        case 'd': case 'D': hand[cards_read][1] = 1; break;
        case 'h': case 'H': hand[cards_read][1] = 2; break;
        case 's': case 'S': hand[cards_read][1] = 3; break;
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
void analyze_hand(int num_in_rank[], int num_in_suit[])
{
    int num_consec = 0;
    int rank, suit;

    straight = false;
    flush = false;
    four = false;
    three = false;
    pairs = 0;

    /* check for flush */
    for (suit = 0; suit < NUM_SUITS; suit++)
        if (num_in_suit[suit] == NUM_CARDS)
            flush = true;

    /* check for straight */
    rank = 0;
    while (num_in_rank[rank] == 0)
        rank++;
    for (; rank < NUM_RANKS && num_in_rank[rank] > 0; rank++)
        num_consec++;
    if (num_consec == NUM_CARDS)
    {
        straight = true;
        return;
    }

    /* check for 4-of-a-kind, 3-of-a-kind, and pairs */
    for (rank = 0; rank < NUM_RANKS; rank++)
    {
        if (num_in_rank[rank] == 4)
            four = true;
        if (num_in_rank[rank] == 3)
            three = true;
        if (num_in_rank[rank] == 2)
            pairs++;
    }
}

/**********************************************************
 * print_result: Prints the classification of the hand,   *
 *               based on the values of the external      *
 *               variables straight, flush, four, three,  *
 *               and pairs.                               *
 **********************************************************/
void print_result(void)
{
    if (straight && flush)
        printf("Straight flush");
    else if (four)
        printf("Four of a kind");
    else if (three &&
             pairs == 1)
        printf("Full house");
    else if (flush)
        printf("Flush");
    else if (straight)
        printf("Straight");
    else if (three)
        printf("Three of a kind");
    else if (pairs == 2)
        printf("Two pairs");
    else if (pairs == 1)
        printf("Pair");
    else
        printf("High card");

    printf("\n\n");
}

```

```
alancong@AlanCongdeMacBook-Air chapter_10 % ./a.out
Enter a card: 2c
Enter a card: 3c
Enter a card: 4c
Enter a card: 5c
Enter a card: 6c
Straight flush

Enter a card: 0
```

3. 把数组`num_in_rank`、`num_in_suit`和`card_exists`从10.5节的poker.c程序中去掉。程序改用5×2的数组来存储牌。数组的每一行表示一张牌。例如，如果数组名为hand，则`hand[0][0]`存储第一张牌的点数，`hand[0][1]`存储第一张牌的花色。

```C
#include <stdbool.h> /* C99 only */
#include <stdio.h>
#include <stdlib.h>

#define NUM_CARDS 5
#define RANK 0
#define SUIT 1

/* external variables */
int hand[NUM_CARDS][2];
/*    0    1
    ____ ____
 0 |____|____|
 1 |____|____|
 2 |____|____|
 3 |____|____|
 4 |____|____|
    rank suit
*/

bool straight, flush, four, three;
int pairs; /* can be 0, 1, or 2 */

/* prototypes */
void read_cards(void);
void analyze_hand(void);
void print_result(void);

/**********************************************************
 * main: Calls read_cards, analyze_hand, and print_result *
 *       repeatedly.                                      *
 **********************************************************/
int main(void)
{
    for (;;)
    {
        read_cards();
        analyze_hand();
        print_result();
    }
}

/**********************************************************
 * read_cards: Reads the cards into the external variable *
 *             hand; checks for bad cards and duplicate   *
 *             cards.                                     *
 **********************************************************/
void read_cards(void)
{
    char ch, rank_ch, suit_ch;
    int i, rank, suit;
    bool bad_card, duplicate_card;
    int cards_read = 0;

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
        {
            printf("Bad card; ignored.\n");
            continue;
        }

        duplicate_card = false;
        for (i = 0; i < cards_read; i++)
            if (hand[i][RANK] == rank && hand[i][SUIT] == suit)
            {
                printf("Duplicate card; ignored.\n");
                duplicate_card = true;
                break;
            }

        if (!duplicate_card)
        {
            hand[cards_read][RANK] = rank;
            hand[cards_read][SUIT] = suit;
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
void analyze_hand(void)
{
    int rank, suit, card, pass, run;

    straight = true;
    flush = true;
    four = false;
    three = false;
    pairs = 0;

    /* sort cards by rank */
    for (pass = 1; pass < NUM_CARDS; pass++)
        for (card = 0; card < NUM_CARDS - pass; card++)
        {
            rank = hand[card][RANK];
            suit = hand[card][SUIT];
            if (hand[card + 1][RANK] < rank)
            {
                hand[card][RANK] = hand[card + 1][RANK];
                hand[card][SUIT] = hand[card + 1][SUIT];
                hand[card + 1][RANK] = rank;
                hand[card + 1][SUIT] = suit;
            }
        }

    /* check for flush */
    suit = hand[0][SUIT];
    for (card = 1; card < NUM_CARDS; card++)
        if (hand[card][SUIT] != suit)
            flush = false;

    /* check for straight */
    for (card = 0; card < NUM_CARDS - 1; card++)
        if (hand[card][RANK] + 1 != hand[card + 1][RANK])
            straight = false;

    /* check for 4-of-a-kind, 3-of-a-kind, and pairs by
       looking for "runs" of cards with identical ranks */
    card = 0;
    while (card < NUM_CARDS)
    {
        rank = hand[card][RANK];
        run = 0;
        do
        {
            run++;
            card++;
        } while (card < NUM_CARDS && hand[card][RANK] == rank);
        switch (run)
        {
        case 2: pairs++; break;
        case 3: three = true; break;
        case 4: four = true; break;
        }
    }
}

/**********************************************************
 * print_result: Prints the classification of the hand,   *
 *               based on the values of the external      *
 *               variables straight, flush, four, three,  *
 *               and pairs.                               *
 **********************************************************/
void print_result(void)
{
    if (straight && flush)
        printf("Straight flush");
    else if (four)
        printf("Four of a kind");
    else if (three &&
             pairs == 1)
        printf("Full house");
    else if (flush)
        printf("Flush");
    else if (straight)
        printf("Straight");
    else if (three)
        printf("Three of a kind");
    else if (pairs == 2)
        printf("Two pairs");
    else if (pairs == 1)
        printf("Pair");
    else
        printf("High card");

    printf("\n\n");
}
```

```
alancong@AlanCongdeMacBook-Air chapter_10 % ./a.out 
Enter a card: 2c
Enter a card: 3c
Enter a card: 4c
Enter a card: 5c
Enter a card: 6c
Straight flush

Enter a card: 0
```

```
这个是书本的标准答案，自己写的程序数组越界的问题很大
```



4. 修改10.5节的poker.c程序，使其能识别牌的另一种类别——“同花大顺”（同花色的A、K、Q、J和10）。同花大顺的级别高于其他所有的类别。

```C
/*********************************************************
 * From C PROGRAMMING: A MODERN APPROACH, Second Edition *
 * By K. N. King                                         *
 * Copyright (c) 2008, 1996 W. W. Norton & Company, Inc. *
 * All rights reserved.                                  *
 * This program may be freely distributed for class use, *
 * provided that this copyright notice is retained.      *
 *********************************************************/

/* poker.c (Chapter 10, page 233) */
/* Classifies a poker hand */

#include <stdbool.h> /* C99 only */
#include <stdio.h>
#include <stdlib.h>

#define NUM_RANKS 13
#define NUM_SUITS 4
#define NUM_CARDS 5

/* external variables */
int num_in_rank[NUM_RANKS];
int num_in_suit[NUM_SUITS];
bool royal, straight, flush, four, three;
int pairs; /* can be 0, 1, or 2 */

/* prototypes */
void read_cards(void);
void analyze_hand(void);
void print_result(void);

/**********************************************************
 * main: Calls read_cards, analyze_hand, and print_result *
 *       repeatedly.                                      *
 **********************************************************/
int main(void)
{
    for (;;)
    {
        read_cards();
        analyze_hand();
        print_result();
    }
}

/**********************************************************
 * read_cards: Reads the cards into the external          *
 *             variables num_in_rank and num_in_suit;     *
 *             checks for bad cards and duplicate cards.  *
 **********************************************************/
void read_cards(void)
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
void analyze_hand(void)
{
    int num_consec = 0;
    int rank, suit;

    royal = false;
    straight = false;
    flush = false;
    four = false;
    three = false;
    pairs = 0;

    /* check for flush */
    for (suit = 0; suit < NUM_SUITS; suit++)
        if (num_in_suit[suit] == NUM_CARDS)
            flush = true;

    /* check for straight */
    rank = 0;
    while (num_in_rank[rank] == 0)
        rank++;
    for (; rank < NUM_RANKS && num_in_rank[rank] > 0; rank++)
        num_consec++;
    if (num_consec == NUM_CARDS)
    {
        straight = true;
        // return;
    }

    /* check for royal flush */
    if(flush && straight)
    {
        int max_rank = 0, min_rank = 13;
        for(int rank = 0;rank < NUM_RANKS;rank ++)
        {
            if((max_rank < rank) && (num_in_rank[rank] == 1))
                max_rank = rank;
            if((min_rank > rank) && (num_in_rank[rank] == 1))
                min_rank = rank;
        }
        // printf("max : %d min: %d\n", max_rank, min_rank);
        if(max_rank == 12 && min_rank == 8)
            royal = true;
    }

    /* check for 4-of-a-kind, 3-of-a-kind, and pairs */
    for (rank = 0; rank < NUM_RANKS; rank++)
    {
        if (num_in_rank[rank] == 4)
            four = true;
        if (num_in_rank[rank] == 3)
            three = true;
        if (num_in_rank[rank] == 2)
            pairs++;
    }
}

/**********************************************************
 * print_result: Prints the classification of the hand,   *
 *               based on the values of the external      *
 *               variables straight, flush, four, three,  *
 *               and pairs.                               *
 **********************************************************/
void print_result(void)
{
    if (royal)
        printf("Royal flush");
    else if (straight && flush)
        printf("Straight flush");
    else if (four)
        printf("Four of a kind");
    else if (three &&
             pairs == 1)
        printf("Full house");
    else if (flush)
        printf("Flush");
    else if (straight)
        printf("Straight");
    else if (three)
        printf("Three of a kind");
    else if (pairs == 2)
        printf("Two pairs");
    else if (pairs == 1)
        printf("Pair");
    else
        printf("High card");

    printf("\n\n");
}
```

```
alancong@AlanCongdeMacBook-Air chapter_10 % ./a.out 
Enter a card: ac
Enter a card: kc
Enter a card: qc
Enter a card: tc
Enter a card: jc
max : 12 min: 8
Royal flush

Enter a card: 0
```

5. 修改10.5节的poker.c程序，使其能识别“小A顺”（即A、2、3、4和5）。

```C
/*********************************************************
 * From C PROGRAMMING: A MODERN APPROACH, Second Edition *
 * By K. N. King                                         *
 * Copyright (c) 2008, 1996 W. W. Norton & Company, Inc. *
 * All rights reserved.                                  *
 * This program may be freely distributed for class use, *
 * provided that this copyright notice is retained.      *
 *********************************************************/

/* poker.c (Chapter 10, page 233) */
/* Classifies a poker hand */

#include <stdbool.h> /* C99 only */
#include <stdio.h>
#include <stdlib.h>

#define NUM_RANKS 13
#define NUM_SUITS 4
#define NUM_CARDS 5

/* external variables */
int num_in_rank[NUM_RANKS];
int num_in_suit[NUM_SUITS];
bool royal, straight, flush, four, three;
int pairs; /* can be 0, 1, or 2 */

/* prototypes */
void read_cards(void);
void analyze_hand(void);
void print_result(void);

/**********************************************************
 * main: Calls read_cards, analyze_hand, and print_result *
 *       repeatedly.                                      *
 **********************************************************/
int main(void)
{
    for (;;)
    {
        read_cards();
        analyze_hand();
        print_result();
    }
}

/**********************************************************
 * read_cards: Reads the cards into the external          *
 *             variables num_in_rank and num_in_suit;     *
 *             checks for bad cards and duplicate cards.  *
 **********************************************************/
void read_cards(void)
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
void analyze_hand(void)
{
    int num_consec = 0;
    int rank, suit;

    royal = false;
    straight = false;
    flush = false;
    four = false;
    three = false;
    pairs = 0;

    /* check for flush */
    for (suit = 0; suit < NUM_SUITS; suit++)
        if (num_in_suit[suit] == NUM_CARDS)
            flush = true;

    /* check for straight */
    rank = 0;
    while (num_in_rank[rank] == 0)
        rank++;
    for (; rank < NUM_RANKS && num_in_rank[rank] > 0; rank++)
        num_consec++;
    if (num_consec == NUM_CARDS)
    {
        straight = true;
        // return;
    }
    if(num_consec == NUM_CARDS - 1)
    {
        bool isAceFlush = true;
        for(int i = 0;i < NUM_CARDS - 1;i ++)
            if(num_in_rank[i] != 1)
                isAceFlush = false;   
        if(isAceFlush && (num_in_rank[12] == 1))
            straight = true;
    }

    /* check for royal flush */
    if(flush && straight)
    {
        int max_rank = 0, min_rank = 13;
        for(int rank = 0;rank < NUM_RANKS;rank ++)
        {
            if((max_rank < rank) && (num_in_rank[rank] == 1))
                max_rank = rank;
            if((min_rank > rank) && (num_in_rank[rank] == 1))
                min_rank = rank;
        }
        // printf("max : %d min: %d\n", max_rank, min_rank);
        if(max_rank == 12 && min_rank == 8)
            royal = true;
    }

    /* check for 4-of-a-kind, 3-of-a-kind, and pairs */
    for (rank = 0; rank < NUM_RANKS; rank++)
    {
        if (num_in_rank[rank] == 4)
            four = true;
        if (num_in_rank[rank] == 3)
            three = true;
        if (num_in_rank[rank] == 2)
            pairs++;
    }
}

/**********************************************************
 * print_result: Prints the classification of the hand,   *
 *               based on the values of the external      *
 *               variables straight, flush, four, three,  *
 *               and pairs.                               *
 **********************************************************/
void print_result(void)
{
    if (royal)
        printf("Royal flush");
    else if (straight && flush)
        printf("Straight flush");
    else if (four)
        printf("Four of a kind");
    else if (three &&
             pairs == 1)
        printf("Full house");
    else if (flush)
        printf("Flush");
    else if (straight)
        printf("Straight");
    else if (three)
        printf("Three of a kind");
    else if (pairs == 2)
        printf("Two pairs");
    else if (pairs == 1)
        printf("Pair");
    else
        printf("High card");

    printf("\n\n");
}

```

```
alancong@AlanCongdeMacBook-Air chapter_10 % ./a.out
Enter a card: ac
Enter a card: 2c
Enter a card: 3c
Enter a card: 4c
Enter a card: 5c
Straight flush

Enter a card: 0
```

6. 有些计算器（尤其是惠普的计算器）使用逆波兰表示法（Reverse Polish Notation，RPN）来书写数学表达式。在这一表示法中，运算符放置在操作数的后面而不是放在操作数中间。例如，在逆波兰表示法中1+2将表示为1 2 +，而1+2*3将表示为1 2 3 * +。逆波兰表达式可以很方便地用栈求值。算法从左向右读取运算符和操作数，并执行下列步骤：

```
当遇到操作数时，将其压入栈中。
当遇到运算符时，从栈中弹出它的操作数，执行运算并把结果压入栈中。
```

编写程序对逆波兰表达式求值。操作数都是个位的整数，运算符为+、-、*、/和=。遇到运算符=时，将显示栈顶项，随后清空栈并提示用户计算新的表达式。这一过程持续进行，直到用户输入一个既不是运算符也不是操作数的字符为止：

```
Enter an RPN expression: 1 2 3 * + =
Value of expression: 7
Enter an RPN expression: 5 8 * 4 9 - / =
Value of expression: -8
Enter an RPN expression: q
```

如果栈出现上溢，程序将显示消息Expression is too complex并终止。如果栈出现下溢（例如遇到表达式1 2 + +），程序将显示消息Not enough operands in expression并终止。提示：把10.2节的栈代码整合到你的程序中。使用scanf(" %c", &ch)读取运算符和操作数。

```C
#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h> /* C99 only */

#define STACK_SIZE 100
/* external variables */

int contents[STACK_SIZE];
int top = 0;

void calculator(void);

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
    char ch;
    int res, op1, op2;

    printf("Enter an RPN expression: ");
    while(1)
    {
        scanf(" %c", &ch);
        if(ch == 'q')
            exit(0);
        if(ch == '=')
        {
            printf("Value of expression: %d\n", res);
            make_empty();
            return ;
        }
        if(ch == '+' || ch == '-' || ch == '*' || ch == '/')
        {
            op1 = pop();
            op2 = pop();

            switch (ch)
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
        if('0' <= ch && ch <= '9')
            push(ch - '0');
    }
}
```

```
alancong@AlanCongdeMacBook-Air chapter_10 % ./a.out 
Enter an RPN expression: 1 2 3 * + =
Value of expression: 7
Enter an RPN expression: 5 8 * 4 9 - / =
Value of expression: -8
Enter an RPN expression: q
```

```
如果使用(ch = getchar()) ！= '\n'的话，会导致留下的\n多激活一次循环。
```



7. 编写程序，提示用户输入一个数并显示该数，使用字符模拟七段显示器的效果：

```
Enter a number: 491-9014
     _     _   _
|_| |_| | |_| | | | |_|
  |  _| |  _| |_| |   |
```

非数字的字符都将被忽略。在程序中用一个名为MAX_DIGITS的宏来控制数的最大位数，MAX_DIGITS的值为10。如果数中包含的数位大于这个数，多出来的数位将被忽略。提示：使用两个外部数组，一个是segments数组（见第8章的练习题6），用于存储表示数字和段之间对应关系的数据；另一个是digits数组，这是一个3行（因为显示出来的每个数字高度都是3个字符）、MAX_DIGITS×4列（数字的宽度是3个字符，但为了可读性需要在数字之间增加一个空格）的字符数组。编写4个函数：main、clear_digits_array、process_digit和print_digits_array。下面是后3个函数的原型：

```
void clear_digits_array(void);
void process_digit(int digit, int position);
void print_digits_array(void);
```

clear_digits_array函数在digits数组的所有元素中存储空白字符。process_digit函数把digit的七段表示存储到digits数组的指定位置（位置为0~MAX_DIGITS-1）。print_digits_array函数分行显示digits数组的每一行，产生的输出如示例图所示。

```C
#include <stdio.h>

#define MAX_DIGITS 10
#define ROWS 3
#define COLS_PER_DIGIT 4

int segments[10][7] = {
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

char digits[ROWS][MAX_DIGITS * COLS_PER_DIGIT];

void clear_digits_array(void);
void process_digit(int digit, int position);
void print_digits_array(void);

int main(void)
{
    int count = 0;
    int ch;

    clear_digits_array();

    printf("Enter a number: ");
    while ((ch = getchar()) != '\n' && ch != EOF)
    {
        if (ch >= '0' && ch <= '9')
        {
            if (count < MAX_DIGITS)
            {
                process_digit(ch - '0', count);
                count++;
            }
        }
    }

    print_digits_array();
    return 0;
}

void clear_digits_array(void)
{
    int r, c;
    for (r = 0; r < ROWS; r++)
    {
        for (c = 0; c < MAX_DIGITS * COLS_PER_DIGIT; c++)
        {
            digits[r][c] = ' ';
        }
    }
}

void process_digit(int digit, int position)
{
    int off = position * COLS_PER_DIGIT;
    // 0
    if (segments[digit][0])
        digits[0][off + 1] = '_';
    // 1
    if (segments[digit][1])
        digits[1][off + 2] = '|';
    // 2
    if (segments[digit][2])
        digits[2][off + 2] = '|';
    // 3
    if (segments[digit][3])
        digits[2][off + 1] = '_';
    // 4
    if (segments[digit][4])
        digits[2][off] = '|';
    // 5
    if (segments[digit][5])
        digits[1][off] = '|';
    // 6
    if (segments[digit][6])
        digits[1][off + 1] = '_';
}

void print_digits_array(void)
{
    int r, c;
    for (r = 0; r < ROWS; r++)
    {
        for (c = 0; c < MAX_DIGITS * COLS_PER_DIGIT; c++)
        {
            putchar(digits[r][c]);
        }
        putchar('\n');
    }
}
```

```
alancong@AlanCongdeMacBook-Air chapter_10 % ./a.out
Enter a number: 19981223
     _   _   _       _   _   _          
  | |_| |_| |_|   |  _|  _|  _|         
  |  _|  _| |_|   | |_  |_   _|         
alancong@AlanCongdeMacBook-Air chapter_10 % ./a.out
Enter a number: 19991024
     _   _   _       _   _              
  | |_| |_| |_|   | | |  _| |_|         
  |  _|  _|  _|   | |_| |_    |  
```


