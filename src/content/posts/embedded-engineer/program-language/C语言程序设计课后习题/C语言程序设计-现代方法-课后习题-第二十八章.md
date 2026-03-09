---
title: 《C语言程序设计-现代方法》-课后习题-第二十八章
published: 2026-03-09
description: ''
image: ''
tags: []
category: '程序设计'
draft: false 
lang: ''
---

## 第二十八章 C1*X* 新增的多线程和原子操作支持

### 练习题

1. 给定以下代码，主线程main中的断言有可能触发吗？  

```C
# include <stdio.h> 
# include <assert.h> 
# include <threads.h> 
# include <stdatomic.h>

atomic_int x = 0, y = 0, z = 0;
int w_x(void *arg)
{
    atomic_store_explicit(&x, 1, memory_order_relaxed);
    return 0;
}
int w_y(void *arg)
{
    atomic_store_explicit(&y, 1, memory_order_relaxed);
    return 0;
}
int if_x_wz(void *arg)
{
    while (!atomic_load_explicit(&x, memory_order_relaxed))
        ;
    if (atomic_load_explicit(&y, memory_order_relaxed))
        z = 1;
    return 0;
}
int if_y_wz(void *arg)
{
    while (!atomic_load_explicit(&y, memory_order_relaxed))
        ;
    if (atomic_load_explicit(&x, memory_order_relaxed))
        z = 1;
    return 0;
}
int main(void)
{
    thrd_t t0, t1, t2, t3;
    thrd_create(&t0, w_x, 0);
    thrd_create(&t1, w_y, 0);
    thrd_create(&t2, if_x_wz, 0);
    thrd_create(&t3, if_y_wz, 0);
    thrd_join(t0, &(int){0});
    thrd_join(t1, &(int){0});
    thrd_join(t2, &(int){0});
    thrd_join(t3, &(int){0});
    assert(z == 1);
}
```

   

2. 如果将以上程序中的memory_order_relaxed全部替换为memory_order_seq_cst，主线程main中 的断言有可能触发吗？

### 编程题

1. 用原子操作函数atomic_fetch_add和atomic_fetch_sub改写前面的atomic.c，使之同样能够避免 数据竞争。  

2. 统计$1 \textasciitilde 1 000 000 000$的所有整数中，各数位之和为奇数的有几个。要求：先用一个线程来统计并打印所用的时间，再用10个线程分段各自统计并打印总体所用的时间。 

