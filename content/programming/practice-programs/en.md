---
description: Practice programs in C and Python - sum, product and average, leap year, prime number, odd or even, GCD and LCM, reversing an array, Fibonacci series, roots of a quadratic equation, largest and smallest of three numbers, areas, sums of series, factorial, bitwise AND/OR/XOR, and positive or negative numbers.
updated: 2026-11-04
---

Every program below is written in both **C** and **Python**: click the **C** or **Python** tab above a program to switch between the two versions. Both versions read the same input and print the same output, shown under **Sample run** (the text typed by the user is shown after each prompt).

**How to run the programs:**

1. **C:** save the program as `program.c`, compile it with `gcc program.c -o program` (add `-lm` for programs that use `math.h`), and run it with `./program`.
2. **Python:** save the program as `program.py` and run it with `python3 program.py`.

## 1. Sum of Two Numbers {#sum-of-two-numbers}

The program reads two integers and prints their sum.

**Logic:**

1. Read two numbers `a` and `b`.
2. Calculate `sum = a + b`.
3. Print the sum.

```c tab
#include <stdio.h>

int main(void)
{
    int a, b, sum;

    printf("Enter two numbers: ");
    scanf("%d %d", &a, &b);

    sum = a + b;
    printf("Sum = %d\n", sum);
    return 0;
}
```

```python tab
a, b = map(int, input("Enter two numbers: ").split())

total = a + b
print("Sum =", total)
```

**Sample run:**

```text
Enter two numbers: 12 8
Sum = 20
```

## 2. Multiplication of Two Numbers {#multiplication-of-two-numbers}

The program reads two integers and prints their product.

**Logic:**

1. Read two numbers `a` and `b`.
2. Calculate `product = a * b`.
3. Print the product.

```c tab
#include <stdio.h>

int main(void)
{
    int a, b, product;

    printf("Enter two numbers: ");
    scanf("%d %d", &a, &b);

    product = a * b;
    printf("Product = %d\n", product);
    return 0;
}
```

```python tab
a, b = map(int, input("Enter two numbers: ").split())

product = a * b
print("Product =", product)
```

**Sample run:**

```text
Enter two numbers: 6 7
Product = 42
```

## 3. Sum and Average of Three Numbers {#sum-and-average-of-three-numbers}

The program reads three numbers and prints their sum and their average (arithmetic mean).

**Formula:**

> **Average = (a + b + c) ÷ 3**

**Example:** for 10, 20 and 25, sum = 10 + 20 + 25 = 55, and average = 55 ÷ 3 = **18.33**.

The numbers are read as real numbers (`float`), so that the average keeps its fractional part; with integers, `55 / 3` would give 18 in C.

```c tab
#include <stdio.h>

int main(void)
{
    float a, b, c, sum, average;

    printf("Enter three numbers: ");
    scanf("%f %f %f", &a, &b, &c);

    sum = a + b + c;
    average = sum / 3;
    printf("Sum = %.2f\n", sum);
    printf("Average = %.2f\n", average);
    return 0;
}
```

```python tab
a, b, c = map(float, input("Enter three numbers: ").split())

total = a + b + c
average = total / 3
print(f"Sum = {total:.2f}")
print(f"Average = {average:.2f}")
```

**Sample run:**

```text
Enter three numbers: 10 20 25
Sum = 55.00
Average = 18.33
```

## 4. Leap Year {#leap-year}

A leap year is a year that has 366 days, with 29 days in February.

**Rule:** a year is a leap year if it is **divisible by 4 but not by 100**, or if it is **divisible by 400**.

1. 2024 is divisible by 4 and not by 100, so it is a leap year.
2. 1900 is divisible by 100 but not by 400, so it is **not** a leap year.
3. 2000 is divisible by 400, so it is a leap year.

In code: `(year % 4 == 0 && year % 100 != 0) || year % 400 == 0`.

```c tab
#include <stdio.h>

int main(void)
{
    int year;

    printf("Enter a year: ");
    scanf("%d", &year);

    if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0)
        printf("%d is a leap year\n", year);
    else
        printf("%d is not a leap year\n", year);
    return 0;
}
```

```python tab
year = int(input("Enter a year: "))

if (year % 4 == 0 and year % 100 != 0) or year % 400 == 0:
    print(year, "is a leap year")
else:
    print(year, "is not a leap year")
```

**Sample runs:**

```text
Enter a year: 2024
2024 is a leap year

Enter a year: 1900
1900 is not a leap year

Enter a year: 2000
2000 is a leap year
```

## 5. Prime Number {#prime-number}

A prime number is a natural number greater than 1 that has exactly two divisors: 1 and the number itself (2, 3, 5, 7, 11, 13 …). 0 and 1 are not prime.

**Logic:**

1. If n is less than 2, it is not prime.
2. Otherwise, divide n by every number i from 2 while i × i ≤ n (that is, up to √n).
3. If any i divides n exactly (`n % i == 0`), n is not prime; otherwise it is prime.

Checking only up to √n is enough, because if n = p × q, one of the two factors is at most √n. **Example:** for 91, the loop checks 2 to 9 (since 10 × 10 > 91) and finds 91 % 7 == 0 (91 = 7 × 13), so 91 is not prime.

```c tab
#include <stdio.h>

int main(void)
{
    int n, i, isPrime = 1;

    printf("Enter a number: ");
    scanf("%d", &n);

    if (n < 2)
        isPrime = 0;                    /* 0 and 1 are not prime */
    for (i = 2; i * i <= n; i++)        /* check divisors up to the square root */
    {
        if (n % i == 0)
        {
            isPrime = 0;
            break;
        }
    }

    if (isPrime)
        printf("%d is a prime number\n", n);
    else
        printf("%d is not a prime number\n", n);
    return 0;
}
```

```python tab
n = int(input("Enter a number: "))

is_prime = n >= 2                     # 0 and 1 are not prime
i = 2
while i * i <= n:                     # check divisors up to the square root
    if n % i == 0:
        is_prime = False
        break
    i += 1

if is_prime:
    print(n, "is a prime number")
else:
    print(n, "is not a prime number")
```

**Sample runs:**

```text
Enter a number: 29
29 is a prime number

Enter a number: 91
91 is not a prime number
```

## 6. Odd or Even Number {#odd-or-even-number}

An even number is an integer that is exactly divisible by 2; an odd number leaves a remainder of 1 when divided by 2.

**Logic:** if `n % 2 == 0`, the number is even; otherwise it is odd. **Example:** 17 % 2 = 1, so 17 is odd; 24 % 2 = 0, so 24 is even.

```c tab
#include <stdio.h>

int main(void)
{
    int n;

    printf("Enter a number: ");
    scanf("%d", &n);

    if (n % 2 == 0)
        printf("%d is even\n", n);
    else
        printf("%d is odd\n", n);
    return 0;
}
```

```python tab
n = int(input("Enter a number: "))

if n % 2 == 0:
    print(n, "is even")
else:
    print(n, "is odd")
```

**Sample runs:**

```text
Enter a number: 17
17 is odd

Enter a number: 24
24 is even
```

## 7. GCD (HCF) of Two Numbers {#gcd-hcf-of-two-numbers}

The GCD (greatest common divisor), also called the HCF (highest common factor), of two numbers is the largest number that divides both of them exactly.

**Euclid's algorithm:** GCD(a, b) = GCD(b, a mod b), repeated until the second number becomes 0; the first number is then the GCD.

**Example — GCD of 36 and 60:**

1. GCD(36, 60) → 36 mod 60 = 36 → GCD(60, 36)
2. 60 mod 36 = 24 → GCD(36, 24)
3. 36 mod 24 = 12 → GCD(24, 12)
4. 24 mod 12 = 0 → GCD(12, 0)
5. The second number is 0, so **GCD = 12**.

```c tab
#include <stdio.h>

int main(void)
{
    int a, b, x, y, r;

    printf("Enter two numbers: ");
    scanf("%d %d", &a, &b);

    x = a;
    y = b;
    while (y != 0)                      /* Euclid's algorithm */
    {
        r = x % y;
        x = y;
        y = r;
    }
    printf("GCD of %d and %d = %d\n", a, b, x);
    return 0;
}
```

```python tab
a, b = map(int, input("Enter two numbers: ").split())

x, y = a, b
while y != 0:                         # Euclid's algorithm
    x, y = y, x % y
print(f"GCD of {a} and {b} = {x}")
```

**Sample run:**

```text
Enter two numbers: 36 60
GCD of 36 and 60 = 12
```

## 8. LCM of Two Numbers {#lcm-of-two-numbers}

The LCM (least common multiple) of two numbers is the smallest positive number that is a multiple of both.

**Formula:**

> **LCM(a, b) = (a × b) ÷ GCD(a, b)**

**Example — LCM of 12 and 18:**

1. GCD(12, 18) = 6.
2. LCM = (12 × 18) ÷ 6 = 216 ÷ 6 = **36**.

The program divides before multiplying, `(a / gcd) * b`, so that the intermediate value stays small and does not overflow.

```c tab
#include <stdio.h>

int main(void)
{
    int a, b, x, y, r, gcd, lcm;

    printf("Enter two numbers: ");
    scanf("%d %d", &a, &b);

    x = a;
    y = b;
    while (y != 0)                      /* first find the GCD */
    {
        r = x % y;
        x = y;
        y = r;
    }
    gcd = x;
    lcm = (a / gcd) * b;                /* LCM = a x b / GCD */
    printf("LCM of %d and %d = %d\n", a, b, lcm);
    return 0;
}
```

```python tab
a, b = map(int, input("Enter two numbers: ").split())

x, y = a, b
while y != 0:                         # first find the GCD
    x, y = y, x % y
gcd = x
lcm = (a // gcd) * b                  # LCM = a x b / GCD
print(f"LCM of {a} and {b} = {lcm}")
```

**Sample run:**

```text
Enter two numbers: 12 18
LCM of 12 and 18 = 36
```

## 9. Reverse the Items of an Array {#reverse-the-items-of-an-array}

The program reads n numbers into an array and reverses the order of the items in the same array.

**Logic (two-pointer swap):**

1. Swap the first item with the last, the second with the second-last, and so on.
2. Stop at the middle: for n items, `n / 2` swaps are needed (an odd middle item stays in place).

**Example:** 10 20 30 40 50 → swap 10 and 50, then 20 and 40 → 50 40 30 20 10.

In Python the same result can also be obtained with `arr.reverse()` or `arr[::-1]`.

```c tab
#include <stdio.h>

int main(void)
{
    int arr[100], n, i, temp;

    printf("Enter the number of elements: ");
    scanf("%d", &n);
    printf("Enter the elements: ");
    for (i = 0; i < n; i++)
        scanf("%d", &arr[i]);

    for (i = 0; i < n / 2; i++)         /* swap the first and last, and so on */
    {
        temp = arr[i];
        arr[i] = arr[n - 1 - i];
        arr[n - 1 - i] = temp;
    }

    printf("Reversed array:");
    for (i = 0; i < n; i++)
        printf(" %d", arr[i]);
    printf("\n");
    return 0;
}
```

```python tab
n = int(input("Enter the number of elements: "))
arr = list(map(int, input("Enter the elements: ").split()))[:n]

for i in range(n // 2):               # swap the first and last, and so on
    arr[i], arr[n - 1 - i] = arr[n - 1 - i], arr[i]

print("Reversed array:", *arr)
```

**Sample run:**

```text
Enter the number of elements: 5
Enter the elements: 10 20 30 40 50
Reversed array: 50 40 30 20 10
```

## 10. Fibonacci Series {#fibonacci-series}

The Fibonacci series is a sequence of numbers in which each number is the sum of the two numbers before it, starting with 0 and 1.

**Formula:**

> **F(0) = 0, F(1) = 1, F(n) = F(n − 1) + F(n − 2)**

**Example:** 0, 1, 1 (= 0 + 1), 2 (= 1 + 1), 3, 5, 8, 13, 21, 34 …

**Logic:** keep the last two terms in `a` and `b`; print `a`, then replace them with `b` and `a + b`, n times.

```c tab
#include <stdio.h>

int main(void)
{
    int n, i;
    long long a = 0, b = 1, next;

    printf("Enter the number of terms: ");
    scanf("%d", &n);

    printf("Fibonacci series:");
    for (i = 1; i <= n; i++)
    {
        printf(" %lld", a);
        next = a + b;                   /* each term is the sum of the previous two */
        a = b;
        b = next;
    }
    printf("\n");
    return 0;
}
```

```python tab
n = int(input("Enter the number of terms: "))

a, b = 0, 1
terms = []
for i in range(n):
    terms.append(a)
    a, b = b, a + b                   # each term is the sum of the previous two
print("Fibonacci series:", *terms)
```

**Sample run:**

```text
Enter the number of terms: 10
Fibonacci series: 0 1 1 2 3 5 8 13 21 34
```

## 11. Roots of a Quadratic Equation {#roots-of-a-quadratic-equation}

The program solves the quadratic equation **ax² + bx + c = 0** (a ≠ 0), that is, it finds the values of x (the roots).

**Formula (quadratic formula):**

> **x = (−b ± √(b² − 4ac)) ÷ 2a**

where:

- **a** = coefficient of x² (must not be 0),
- **b** = coefficient of x,
- **c** = constant term,
- **D = b² − 4ac** is the **discriminant**, which decides the nature of the roots.

**Nature of the roots:**

1. **D > 0:** two real and different roots, x₁ = (−b + √D) ÷ 2a and x₂ = (−b − √D) ÷ 2a.
2. **D = 0:** two real and equal roots, x₁ = x₂ = −b ÷ 2a.
3. **D < 0:** two complex (imaginary) roots, x = −b ÷ 2a ± i·(√(−D) ÷ 2a).

**Example 1 — x² − 5x + 6 = 0 (a = 1, b = −5, c = 6):**

1. D = (−5)² − 4 × 1 × 6 = 25 − 24 = 1 (> 0).
2. x₁ = (5 + 1) ÷ 2 = **3**, x₂ = (5 − 1) ÷ 2 = **2**.

**Example 2 — x² − 4x + 4 = 0:** D = 16 − 16 = 0, so x₁ = x₂ = 4 ÷ 2 = **2**.

**Example 3 — x² + 2x + 5 = 0:** D = 4 − 20 = −16, so x = −2 ÷ 2 ± i·(√16 ÷ 2) = **−1 ± 2i**.

In C, `sqrt()` is declared in `math.h`; on Linux, compile with `-lm` (`gcc quadratic.c -o quadratic -lm`).

```c tab
#include <stdio.h>
#include <math.h>

int main(void)
{
    double a, b, c, d, x1, x2, real, imag;

    printf("Enter a, b and c: ");
    scanf("%lf %lf %lf", &a, &b, &c);

    if (a == 0)
    {
        printf("Not a quadratic equation (a = 0)\n");
        return 0;
    }

    d = b * b - 4 * a * c;                       /* discriminant */
    if (d > 0)
    {
        x1 = (-b + sqrt(d)) / (2 * a);
        x2 = (-b - sqrt(d)) / (2 * a);
        printf("Roots are real and different\n");
        printf("x1 = %.2f, x2 = %.2f\n", x1, x2);
    }
    else if (d == 0)
    {
        x1 = -b / (2 * a);
        printf("Roots are real and equal\n");
        printf("x1 = x2 = %.2f\n", x1);
    }
    else
    {
        real = -b / (2 * a);
        imag = sqrt(-d) / (2 * a);
        printf("Roots are complex (imaginary)\n");
        printf("x1 = %.2f + %.2fi, x2 = %.2f - %.2fi\n", real, imag, real, imag);
    }
    return 0;
}
```

```python tab
import math

a, b, c = map(float, input("Enter a, b and c: ").split())

if a == 0:
    print("Not a quadratic equation (a = 0)")
else:
    d = b * b - 4 * a * c                        # discriminant
    if d > 0:
        x1 = (-b + math.sqrt(d)) / (2 * a)
        x2 = (-b - math.sqrt(d)) / (2 * a)
        print("Roots are real and different")
        print(f"x1 = {x1:.2f}, x2 = {x2:.2f}")
    elif d == 0:
        x1 = -b / (2 * a)
        print("Roots are real and equal")
        print(f"x1 = x2 = {x1:.2f}")
    else:
        real = -b / (2 * a)
        imag = math.sqrt(-d) / (2 * a)
        print("Roots are complex (imaginary)")
        print(f"x1 = {real:.2f} + {imag:.2f}i, x2 = {real:.2f} - {imag:.2f}i")
```

**Sample runs:**

```text
Enter a, b and c: 1 -5 6
Roots are real and different
x1 = 3.00, x2 = 2.00

Enter a, b and c: 1 -4 4
Roots are real and equal
x1 = x2 = 2.00

Enter a, b and c: 1 2 5
Roots are complex (imaginary)
x1 = -1.00 + 2.00i, x2 = -1.00 - 2.00i
```

## 12. Largest of Three Numbers {#largest-of-three-numbers}

The program reads three numbers and prints the largest.

**Logic:**

1. If a is greater than or equal to both b and c, a is the largest.
2. Otherwise, if b is greater than or equal to both a and c, b is the largest.
3. Otherwise, c is the largest.

(Python also has the built-in function `max(a, b, c)`.)

```c tab
#include <stdio.h>

int main(void)
{
    int a, b, c, largest;

    printf("Enter three numbers: ");
    scanf("%d %d %d", &a, &b, &c);

    if (a >= b && a >= c)
        largest = a;
    else if (b >= a && b >= c)
        largest = b;
    else
        largest = c;
    printf("Largest = %d\n", largest);
    return 0;
}
```

```python tab
a, b, c = map(int, input("Enter three numbers: ").split())

if a >= b and a >= c:
    largest = a
elif b >= a and b >= c:
    largest = b
else:
    largest = c
print("Largest =", largest)
```

**Sample run:**

```text
Enter three numbers: 12 45 30
Largest = 45
```

## 13. Smallest of Three Numbers {#smallest-of-three-numbers}

The program reads three numbers and prints the smallest.

**Logic:**

1. If a is less than or equal to both b and c, a is the smallest.
2. Otherwise, if b is less than or equal to both a and c, b is the smallest.
3. Otherwise, c is the smallest.

(Python also has the built-in function `min(a, b, c)`.)

```c tab
#include <stdio.h>

int main(void)
{
    int a, b, c, smallest;

    printf("Enter three numbers: ");
    scanf("%d %d %d", &a, &b, &c);

    if (a <= b && a <= c)
        smallest = a;
    else if (b <= a && b <= c)
        smallest = b;
    else
        smallest = c;
    printf("Smallest = %d\n", smallest);
    return 0;
}
```

```python tab
a, b, c = map(int, input("Enter three numbers: ").split())

if a <= b and a <= c:
    smallest = a
elif b <= a and b <= c:
    smallest = b
else:
    smallest = c
print("Smallest =", smallest)
```

**Sample run:**

```text
Enter three numbers: 12 45 30
Smallest = 12
```

## 14. Area of a Triangle (Base and Height) {#area-of-a-triangle-base-and-height}

The program reads the base and the height of a triangle and prints its area.

**Formula:**

> **Area = ½ × base × height**

**Example:** base = 10, height = 5 → Area = ½ × 10 × 5 = **25**.

```c tab
#include <stdio.h>

int main(void)
{
    float base, height, area;

    printf("Enter base and height: ");
    scanf("%f %f", &base, &height);

    area = 0.5 * base * height;
    printf("Area of triangle = %.2f\n", area);
    return 0;
}
```

```python tab
base, height = map(float, input("Enter base and height: ").split())

area = 0.5 * base * height
print(f"Area of triangle = {area:.2f}")
```

**Sample run:**

```text
Enter base and height: 10 5
Area of triangle = 25.00
```

## 15. Area of a Triangle (Three Sides) {#area-of-a-triangle-three-sides}

The program reads the lengths of the three sides of a triangle and prints its area, using **Heron's formula**.

**Formula:**

> **s = (a + b + c) ÷ 2**
>
> **Area = √(s (s − a)(s − b)(s − c))**

where **a**, **b** and **c** are the three sides and **s** is the semi-perimeter (half the perimeter).

Three lengths form a triangle only if the sum of any two sides is greater than the third side, so the program checks this first.

**Example:** a = 3, b = 4, c = 5:

1. s = (3 + 4 + 5) ÷ 2 = 6.
2. Area = √(6 × (6 − 3) × (6 − 4) × (6 − 5)) = √(6 × 3 × 2 × 1) = √36 = **6**.

```c tab
#include <stdio.h>
#include <math.h>

int main(void)
{
    double a, b, c, s, area;

    printf("Enter the three sides: ");
    scanf("%lf %lf %lf", &a, &b, &c);

    if (a + b <= c || a + c <= b || b + c <= a)
    {
        printf("These sides cannot form a triangle\n");
        return 0;
    }
    s = (a + b + c) / 2;                          /* semi-perimeter */
    area = sqrt(s * (s - a) * (s - b) * (s - c)); /* Heron's formula */
    printf("Area of triangle = %.2f\n", area);
    return 0;
}
```

```python tab
import math

a, b, c = map(float, input("Enter the three sides: ").split())

if a + b <= c or a + c <= b or b + c <= a:
    print("These sides cannot form a triangle")
else:
    s = (a + b + c) / 2                                 # semi-perimeter
    area = math.sqrt(s * (s - a) * (s - b) * (s - c))   # Heron's formula
    print(f"Area of triangle = {area:.2f}")
```

**Sample run:**

```text
Enter the three sides: 3 4 5
Area of triangle = 6.00
```

## 16. Area of a Rectangle {#area-of-a-rectangle}

The program reads the length and the width of a rectangle and prints its area.

**Formula:**

> **Area = length × width**

**Example:** length = 12, width = 5 → Area = 12 × 5 = **60**.

```c tab
#include <stdio.h>

int main(void)
{
    float length, width, area;

    printf("Enter length and width: ");
    scanf("%f %f", &length, &width);

    area = length * width;
    printf("Area of rectangle = %.2f\n", area);
    return 0;
}
```

```python tab
length, width = map(float, input("Enter length and width: ").split())

area = length * width
print(f"Area of rectangle = {area:.2f}")
```

**Sample run:**

```text
Enter length and width: 12 5
Area of rectangle = 60.00
```

## 17. Sum of Numbers from 1 to 100 {#sum-of-numbers-from-1-to-100}

The program adds all the integers from 1 to 100 with a loop.

**Logic:** start with `sum = 0`, and add each number i from 1 to 100 to it.

**Check with the formula:** 1 + 2 + … + n = n(n + 1) ÷ 2, so for n = 100 the sum is 100 × 101 ÷ 2 = **5050**.

```c tab
#include <stdio.h>

int main(void)
{
    int i, sum = 0;

    for (i = 1; i <= 100; i++)
        sum = sum + i;

    printf("Sum of numbers from 1 to 100 = %d\n", sum);
    return 0;
}
```

```python tab
total = 0
for i in range(1, 101):
    total = total + i

print("Sum of numbers from 1 to 100 =", total)
```

**Sample run:**

```text
Sum of numbers from 1 to 100 = 5050
```

## 18. Sum of Numbers from 1 to n {#sum-of-numbers-from-1-to-n}

The program reads n and adds all the integers from 1 to n, both with a loop and with the formula.

**Formula:**

> **1 + 2 + 3 + … + n = n(n + 1) ÷ 2**

where **n** is the last number of the series.

**Example:** n = 10 → 10 × 11 ÷ 2 = 110 ÷ 2 = **55** (1 + 2 + … + 10 = 55).

```c tab
#include <stdio.h>

int main(void)
{
    int n, i;
    long long sum = 0;

    printf("Enter n: ");
    scanf("%d", &n);

    for (i = 1; i <= n; i++)
        sum = sum + i;

    printf("Sum of numbers from 1 to %d = %lld\n", n, sum);
    printf("Using the formula n(n + 1)/2 = %lld\n", (long long)n * (n + 1) / 2);
    return 0;
}
```

```python tab
n = int(input("Enter n: "))

total = 0
for i in range(1, n + 1):
    total = total + i

print(f"Sum of numbers from 1 to {n} = {total}")
print("Using the formula n(n + 1)/2 =", n * (n + 1) // 2)
```

**Sample run:**

```text
Enter n: 10
Sum of numbers from 1 to 10 = 55
Using the formula n(n + 1)/2 = 55
```

## 19. Factorial of a Number {#factorial-of-a-number}

The factorial of a non-negative integer n, written **n!**, is the product of all the positive integers from 1 to n.

**Formula:**

> **n! = 1 × 2 × 3 × … × n**, and **0! = 1**

**Example:** 5! = 1 × 2 × 3 × 4 × 5 = **120**.

Factorials grow very fast, so the C program uses `unsigned long long` (64 bits), which holds factorials up to **20! = 2,432,902,008,176,640,000**; 21! is too large for it. Python integers have no fixed size, so the Python program works for any n. The factorial of a negative number does not exist.

```c tab
#include <stdio.h>

int main(void)
{
    int n, i;
    unsigned long long fact = 1;

    printf("Enter a number: ");
    scanf("%d", &n);

    if (n < 0)
    {
        printf("Factorial of a negative number does not exist\n");
        return 0;
    }
    for (i = 1; i <= n; i++)
        fact = fact * i;

    printf("%d! = %llu\n", n, fact);
    return 0;
}
```

```python tab
n = int(input("Enter a number: "))

if n < 0:
    print("Factorial of a negative number does not exist")
else:
    fact = 1
    for i in range(1, n + 1):
        fact = fact * i
    print(f"{n}! = {fact}")
```

**Sample runs:**

```text
Enter a number: 5
5! = 120

Enter a number: 20
20! = 2432902008176640000
```

## 20. AND, OR and XOR of Two Numbers {#and-or-and-xor-of-two-numbers}

The program reads two integers and applies the bitwise **AND (`&`)**, **OR (`|`)** and **XOR (`^`)** operators to them. These operators work on each pair of corresponding bits:

| A | B | A AND B | A OR B | A XOR B |
| --- | --- | --- | --- | --- |
| 0 | 0 | 0 | 0 | 0 |
| 0 | 1 | 0 | 1 | 1 |
| 1 | 0 | 0 | 1 | 1 |
| 1 | 1 | 1 | 1 | 0 |

**Example — 12 and 10:**

```text
 12        =  1100
 10        =  1010
 12 AND 10 =  1000  =  8
 12 OR 10  =  1110  = 14
 12 XOR 10 =  0110  =  6
```

With the inputs 0 and 1 only, the program prints the truth table of the AND, OR and XOR gates.

```c tab
#include <stdio.h>

int main(void)
{
    int a, b;

    printf("Enter two numbers: ");
    scanf("%d %d", &a, &b);

    printf("%d AND %d = %d\n", a, b, a & b);
    printf("%d OR %d = %d\n", a, b, a | b);
    printf("%d XOR %d = %d\n", a, b, a ^ b);
    return 0;
}
```

```python tab
a, b = map(int, input("Enter two numbers: ").split())

print(f"{a} AND {b} = {a & b}")
print(f"{a} OR {b} = {a | b}")
print(f"{a} XOR {b} = {a ^ b}")
```

**Sample run:**

```text
Enter two numbers: 12 10
12 AND 10 = 8
12 OR 10 = 14
12 XOR 10 = 6
```

## 21. Positive, Negative or Zero {#positive-negative-or-zero}

The program reads a number and tells whether it is positive (greater than 0), negative (less than 0) or zero.

**Logic:**

1. If n > 0, it is positive.
2. Otherwise, if n < 0, it is negative.
3. Otherwise, it is zero.

```c tab
#include <stdio.h>

int main(void)
{
    int n;

    printf("Enter a number: ");
    scanf("%d", &n);

    if (n > 0)
        printf("%d is positive\n", n);
    else if (n < 0)
        printf("%d is negative\n", n);
    else
        printf("The number is zero\n");
    return 0;
}
```

```python tab
n = int(input("Enter a number: "))

if n > 0:
    print(n, "is positive")
elif n < 0:
    print(n, "is negative")
else:
    print("The number is zero")
```

**Sample runs:**

```text
Enter a number: -7
-7 is negative

Enter a number: 15
15 is positive

Enter a number: 0
The number is zero
```

## References {#references}

**Programiz**

- [C Programming Examples](https://www.programiz.com/c-programming/examples) — accessed 2026-11-04 (sum and product of numbers, leap year, prime number, even or odd, GCD, LCM, Fibonacci sequence, quadratic roots, largest of three numbers, sum of natural numbers, factorial, positive or negative)
- [Python Programming Examples](https://www.programiz.com/python-programming/examples) — accessed 2026-11-04 (the same programs in Python, and the area of a triangle)
- [C Program to Check Leap Year](https://www.programiz.com/c-programming/examples/leap-year) — accessed 2026-11-04 (leap-year rule)
- [C Program to Find the Roots of a Quadratic Equation](https://www.programiz.com/c-programming/examples/quadratic-roots) — accessed 2026-11-04 (discriminant and the three kinds of roots)

**GeeksforGeeks**

- [C Programming Examples](https://www.geeksforgeeks.org/c/c-programming-examples/) — accessed 2026-11-04 (all the programs in this topic, including reversing an array and the area of a rectangle)

**TpointTech**

- [C Programs](https://www.tpointtech.com/c-programs) — accessed 2026-11-04 (leap year, prime number, even or odd, GCD and LCM, reverse an array, Fibonacci series, quadratic roots, area of a rectangle, sum of first n natural numbers, factorial)

**TutorialsPoint**

- [Learn C By Examples](https://www.tutorialspoint.com/learn_c_by_examples/learn_c_by_examples_quick_guide.htm) — accessed 2026-11-04 (leap year, prime number, Fibonacci series, LCM)
- [Leap Year Program in C](https://www.tutorialspoint.com/learn_c_by_examples/leap_year_program_in_c.htm) — accessed 2026-11-04

**IT Job QnS**

- [Programming Question](https://it.jobqns.com/programming-question/) — accessed 2026-11-04 (prime numbers from 1 to n; factorial with recursion)

**Testing**

- Every C program was compiled with GCC 13 (`-std=c11 -Wall -Wextra`, no warnings) and every Python program run with Python 3.12 on 2026-11-04; for each sample input, the C and Python outputs were compared and are identical. The sample runs above are the real outputs.
