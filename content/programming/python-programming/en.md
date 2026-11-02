---
description: Python programming - features and history, variables, data types and operators, input and output, conditional statements and loops, functions and lambda expressions, strings, lists, tuples, sets and dictionaries, modules and packages, file handling, exception handling and object-oriented programming.
updated: 2026-11-01
---

## Introduction and Features of Python {#introduction-and-features-of-python}

**Python** is a **high-level, interpreted, general-purpose programming language** known for its **simple, readable syntax**. It supports procedural, object-oriented and functional programming.

**History:**

1. Python was created by **Guido van Rossum**; work began in the **late 1980s** at **CWI** (Centrum Wiskunde & Informatica) in the **Netherlands**, as a successor to the ABC language.
2. The first version (0.9.0) was released in **1991**.
3. The name comes from the British comedy series **"Monty Python's Flying Circus"**, not from the snake.
4. **Python 2.0** was released in **2000** and **Python 3.0** in **2008** (Python 3 is not fully backward-compatible with Python 2). Python 2 reached its end of life in **2020**.

**Features of Python:**

1. **Simple and easy to learn:** English-like keywords and few syntax rules.
2. **Interpreted:** code is executed line by line by the interpreter, with no separate compilation step by the programmer.
3. **Interactive:** statements can be typed and run directly at the Python prompt (`>>>`).
4. **Dynamically typed:** the type of a variable is decided at run time from its value; variables are not declared with types.
5. **Indentation defines blocks:** blocks of code are marked by **indentation** (spaces), not by braces `{ }`.
6. **Object-oriented** (everything in Python is an object), and also supports procedural and functional styles.
7. **Free and open source**, and **cross-platform** (Windows, Linux, macOS).
8. **"Batteries included":** a large **standard library**, and many third-party packages.
9. **Automatic memory management** (garbage collection).

**Applications:** web development (Django, Flask), data science and data analysis, machine learning and artificial intelligence, scientific computing, automation and scripting, desktop applications and games, and education.

**First Python program:**

```python
print("Hello, World!")
```

Output: `Hello, World!`. A Python program is saved in a `.py` file and run with the command `python3 file.py`.

**Comments:** `#` starts a single-line comment; a string in triple quotes (`"""…"""`) is often used for multi-line comments and documentation (docstrings).

## Variables, Data Types and Operators {#variables-data-types-and-operators}

### Variables

A **variable** is a **name that refers to a value** stored in memory. It is created when a value is **assigned** to it with `=`; no type declaration is needed, and the same variable can later refer to a value of another type.

```python
x = 10            # int
name = "Rahim"    # str
x = 3.5           # now x refers to a float (dynamic typing)
a, b, c = 1, 2, 3 # multiple assignment
a, b = b, a       # swapping without a temporary variable
print(a, b)       # 2 1
```

**Naming rules:** names may contain letters, digits and `_`; must not begin with a digit; must not be a keyword (`if`, `for`, `class` …); and are **case-sensitive**.

### Data Types

| Category | Type | Example |
| --- | --- | --- |
| Numeric | `int` (integers of any size) | `25`, `-7` |
| | `float` (real numbers) | `3.14`, `2.5e3` |
| | `complex` | `3 + 4j` |
| Boolean | `bool` | `True`, `False` |
| Text | `str` (string) | `"Dhaka"`, `'A'` |
| Sequence | `list` (mutable), `tuple` (immutable), `range` | `[1, 2]`, `(1, 2)`, `range(5)` |
| Set | `set` | `{1, 2, 3}` |
| Mapping | `dict` (dictionary) | `{"roll": 1}` |
| None | `NoneType` | `None` (no value) |

`type(x)` gives the type of a value: `type(3.5)` is `<class 'float'>`.

**Mutable and immutable types:** **mutable** objects can be changed after creation (`list`, `dict`, `set`); **immutable** objects cannot (`int`, `float`, `str`, `tuple`, `bool`).

**Type conversion (casting):** `int("25")` → 25, `float(3)` → 3.0, `str(10)` → `"10"`, `int(3.9)` → 3, `list("abc")` → `['a', 'b', 'c']`.

### Operators

**1. Arithmetic operators** (with `a = 17`, `b = 5`):

| Operator | Meaning | Example | Result |
| --- | --- | --- | --- |
| `+` | Addition | `a + b` | 22 |
| `-` | Subtraction | `a - b` | 12 |
| `*` | Multiplication | `a * b` | 85 |
| `/` | Division (always gives a float) | `a / b` | 3.4 |
| `//` | Floor (integer) division | `a // b` | 3 |
| `%` | Modulus (remainder) | `a % b` | 2 |
| `**` | Exponent (power) | `2 ** 10` | 1024 |

**2. Comparison operators:** `==`, `!=`, `>`, `<`, `>=`, `<=` (give `True` or `False`). Comparisons can be chained: `1 < x < 10`.

**3. Logical operators:** `and`, `or`, `not`.

**4. Assignment operators:** `=`, `+=`, `-=`, `*=`, `/=`, `//=`, `%=`, `**=`. (Python has **no `++` or `--`** operators; use `x += 1`.)

**5. Bitwise operators:** `&`, `|`, `^`, `~`, `<<`, `>>`.

**6. Membership operators:** `in`, `not in`: test whether a value is in a sequence: `'a' in 'cat'` is `True`.

**7. Identity operators:** `is`, `is not`: test whether two names refer to the **same object** (not just equal values).

```python
a, b = 17, 5
print(a / b, a // b, a % b, 2 ** 10)    # 3.4 3 2 1024
print(10 > 5 and 3 > 4)                  # False
print('a' in 'cat', 5 not in [1, 2, 3])  # True True
x = [1, 2]
y = x
z = [1, 2]
print(x == z, x is z, x is y)            # True False True
```

## Input and Output {#input-and-output}

**Output with `print()`:**

```python
name, gpa = "Rahim", 4.5
print("Name:", name, "GPA:", gpa)          # items separated by a space
print("A", "B", "C", sep="-")              # A-B-C (sep changes the separator)
print("No newline", end=" | ")             # end changes the line ending
print("next")
print(f"{name} got {gpa:.2f}")             # f-string: Rahim got 4.50
print("{} is {} years old".format("Karim", 20))
```

Output:

```text
Name: Rahim GPA: 4.5
A-B-C
No newline | next
Rahim got 4.50
Karim is 20 years old
```

**Input with `input()`:** `input()` reads a line from the keyboard and **always returns a string**, so numbers must be converted with `int()` or `float()`.

```python
name = input("Enter your name: ")
age = int(input("Enter your age: "))        # convert the string to int
a, b = map(int, input("Two numbers: ").split())   # read two numbers on one line
print(f"{name} is {age}; sum = {a + b}")
```

For the inputs `Rahim`, `20` and `3 4`, the program prints `Rahim is 20; sum = 7`.

## Control Flow: Conditional Statements and Loops {#control-flow-conditional-statements-and-loops}

Python uses a **colon (`:`)** after the condition and **indentation** (normally 4 spaces) to mark the block.

### Conditional Statements

```python
marks = 72
if marks >= 80:
    grade = "A+"
elif marks >= 70:          # elif = else if
    grade = "A"
elif marks >= 33:
    grade = "Pass"
else:
    grade = "F"
print(grade)               # A

n = 7
result = "even" if n % 2 == 0 else "odd"   # conditional expression
print(result)              # odd
```

(Python 3.10 and later also has a `match` statement for selecting among many patterns.)

### Loops

**1. `while` loop:** repeats while a condition is true.

```python
i, total = 1, 0
while i <= 10:
    total += i
    i += 1
print(total)               # 55
```

**2. `for` loop:** goes through the items of a sequence (list, string, `range` …).

```python
for ch in "abc":
    print(ch, end=" ")     # a b c
print()
for i in range(1, 6):      # range(start, stop): 1, 2, 3, 4, 5 (stop is excluded)
    print(i * i, end=" ")  # 1 4 9 16 25
print()
print(list(range(10, 0, -3)))   # [10, 7, 4, 1]  (step -3)
```

`range(n)` gives 0 to n − 1; `range(a, b)` gives a to b − 1; `range(a, b, step)` uses the given step.

**3. Loop control:** `break` ends the loop; `continue` skips to the next repetition; `pass` is an empty statement (a placeholder). A loop can have an **`else`** block, which runs only if the loop ends **without** `break`.

```python
for n in range(2, 20):
    for d in range(2, n):
        if n % d == 0:
            break                 # n has a divisor: not prime
    else:
        print(n, end=" ")         # runs only when no break happened
print()                           # 2 3 5 7 11 13 17 19
```

## Functions and Lambda Expressions {#functions-and-lambda-expressions}

### Functions

A **function** is defined with the keyword **`def`**, and returns a value with **`return`** (a function without `return` returns `None`).

```python
def area(length, width=1):        # width has a default value
    """Return the area of a rectangle."""   # docstring
    return length * width

print(area(5, 3))                 # 15  (positional arguments)
print(area(5))                    # 5   (default width = 1)
print(area(width=2, length=4))    # 8   (keyword arguments)
```

**Kinds of arguments:**

1. **Positional arguments:** matched by position.
2. **Keyword arguments:** matched by name (`width=2`).
3. **Default arguments:** used when the argument is not given.
4. **Variable-length arguments:** `*args` collects extra positional arguments into a **tuple**; `**kwargs` collects extra keyword arguments into a **dictionary**.

```python
def total(*args):
    return sum(args)

def show(**kwargs):
    for key, value in kwargs.items():
        print(key, "=", value)

print(total(1, 2, 3, 4))          # 10
show(name="Rahim", roll=7)        # name = Rahim  /  roll = 7

def min_max(nums):
    return min(nums), max(nums)   # returns several values as a tuple

lo, hi = min_max([4, 9, 1])
print(lo, hi)                     # 1 9
```

**Scope:** a variable created inside a function is **local** to it; a variable created outside all functions is **global**. To change a global variable inside a function, declare it with **`global`**.

**Recursion:**

```python
def factorial(n):
    return 1 if n <= 1 else n * factorial(n - 1)

print(factorial(5))               # 120
```

### Lambda Expressions

A **lambda** is a **small anonymous (nameless) function** written in one expression:

```text
 lambda arguments: expression
```

It can have any number of arguments but only **one expression**, whose value is returned automatically. Lambdas are mostly used as short functions passed to other functions such as `map()`, `filter()` and `sorted()`.

```python
square = lambda x: x * x
add = lambda a, b: a + b
print(square(6), add(2, 3))                          # 36 5

nums = [5, 2, 8, 1, 6]
print(list(map(lambda x: x * 2, nums)))              # [10, 4, 16, 2, 12]
print(list(filter(lambda x: x % 2 == 0, nums)))      # [2, 8, 6]

students = [("Rahim", 72), ("Karim", 88), ("Jamal", 65)]
print(sorted(students, key=lambda s: s[1]))          # sorted by marks
```

The last line prints `[('Jamal', 65), ('Rahim', 72), ('Karim', 88)]`.

**Function vs lambda:** a `def` function has a name, can contain many statements and needs `return`; a lambda is anonymous, contains one expression and returns its value automatically.

## Strings {#strings}

A **string** (`str`) is an **immutable sequence of characters**, written in single (`'…'`), double (`"…"`) or triple (`'''…'''`, `"""…"""`, for several lines) quotes.

**Indexing and slicing:** indexes start at **0**; negative indexes count from the end (−1 is the last character). A **slice** `s[start:stop:step]` takes characters from start up to, but **not including**, stop.

```python
s = "PYTHON"
print(s[0], s[-1])          # P N
print(s[1:4])               # YTH
print(s[:2], s[2:])         # PY THON
print(s[::-1])              # NOHTYP  (reversed)
print(len(s))               # 6
print("Py" + "thon", "ab" * 3)   # Python ababab  (concatenation, repetition)
```

**Strings are immutable:** `s[0] = "J"` gives an error; a new string must be created instead: `s = "J" + s[1:]`.

**Common string methods:**

| Method | Result for `s = " Hello World "` (or as shown) |
| --- | --- |
| `s.upper()`, `s.lower()` | `" HELLO WORLD "`, `" hello world "` |
| `s.strip()` | `"Hello World"` (spaces removed from both ends) |
| `"a,b,c".split(",")` | `['a', 'b', 'c']` |
| `"-".join(["a", "b", "c"])` | `"a-b-c"` |
| `"banana".replace("a", "o")` | `"bonono"` |
| `"banana".find("n")` | 2 (first index; −1 if not found) |
| `"banana".count("a")` | 3 |
| `"hello".capitalize()`, `"hello world".title()` | `"Hello"`, `"Hello World"` |
| `"Py".startswith("P")`, `"123".isdigit()`, `"abc".isalpha()` | `True`, `True`, `True` |

```python
word = "madam"
print(word == word[::-1])                  # True: a palindrome
text = "the quick brown fox"
print(len(text.split()))                   # 4 words
print(sum(1 for c in text if c in "aeiou"))   # 5 vowels
```

## Lists, Tuples, Sets and Dictionaries {#lists-tuples-sets-and-dictionaries}

### List

A **list** is an **ordered, mutable** collection of items (of any types) in **square brackets**; duplicates are allowed, and items are accessed by index.

```python
a = [10, 20, 30]
a.append(40)          # [10, 20, 30, 40]
a.insert(1, 15)       # [10, 15, 20, 30, 40]
a.remove(30)          # removes the first 30: [10, 15, 20, 40]
x = a.pop()           # removes and returns the last item: x = 40
a.extend([5, 25])     # [10, 15, 20, 5, 25]
a.sort()              # [5, 10, 15, 20, 25]
a.reverse()           # [25, 20, 15, 10, 5]
print(a, x, len(a), a.index(15), a.count(5))   # [25, 20, 15, 10, 5] 40 5 2 1
print(a[1:3], sum(a), max(a), min(a))          # [20, 15] 75 25 5
```

**List comprehension:** a short way to build a list from another sequence:

```python
squares = [x * x for x in range(1, 6)]           # [1, 4, 9, 16, 25]
evens = [x for x in range(10) if x % 2 == 0]     # [0, 2, 4, 6, 8]
print(squares, evens)
```

### Tuple

A **tuple** is an **ordered, immutable** collection in **round brackets**. Once created, its items cannot be changed, added or removed. Tuples are faster than lists and can be used as dictionary keys.

```python
t = (3, 7, 7, 1)
print(t[1], len(t), t.count(7), t.index(1))   # 7 4 2 3
single = (5,)          # a one-item tuple needs a comma; (5) is just the int 5
p = 4, 9               # packing
x, y = p               # unpacking: x = 4, y = 9
print(type(single), x, y)    # <class 'tuple'> 4 9
```

### Set

A **set** is an **unordered** collection of **unique** items (no duplicates) in **curly braces**. It has no indexes. Sets support the mathematical set operations. (An empty set is written `set()`, because `{}` is an empty dictionary.)

```python
a = {1, 2, 3, 4}
b = {3, 4, 5}
print(set([1, 2, 2, 3, 3]))    # {1, 2, 3}  (duplicates removed)
print(a | b)                   # union: {1, 2, 3, 4, 5}
print(a & b)                   # intersection: {3, 4}
print(a - b)                   # difference: {1, 2}
print(a ^ b)                   # symmetric difference: {1, 2, 5}
a.add(9)
a.discard(1)
print(sorted(a), 3 in a)       # [2, 3, 4, 9] True
```

### Dictionary

A **dictionary** (`dict`) is a collection of **key: value pairs** in curly braces. **Keys must be unique and immutable** (numbers, strings, tuples); values can be anything. Values are accessed by **key**, not by position. (Dictionaries keep the order in which items were inserted.)

```python
student = {"roll": 7, "name": "Rahim", "marks": 78}
print(student["name"])               # Rahim
student["marks"] = 85                # change a value
student["dept"] = "CSE"              # add a new pair
del student["roll"]                  # remove a pair
print(student.get("roll", "N/A"))    # N/A (get() avoids a KeyError)
print(list(student.keys()))          # ['name', 'marks', 'dept']
for key, value in student.items():
    print(key, ":", value)
```

The loop prints `name : Rahim`, `marks : 85` and `dept : CSE` on separate lines.

```python
text = "apple banana apple cherry apple"
freq = {}
for w in text.split():
    freq[w] = freq.get(w, 0) + 1     # count each word
print(freq)                          # {'apple': 3, 'banana': 1, 'cherry': 1}
```

### Comparison of List, Tuple, Set and Dictionary

| Basis | List | Tuple | Set | Dictionary |
| --- | --- | --- | --- | --- |
| Brackets | `[ ]` | `( )` | `{ }` | `{key: value}` |
| Ordered | Yes | Yes | No | Yes (insertion order) |
| Mutable | Yes | **No** | Yes | Yes |
| Duplicates | Allowed | Allowed | **Not allowed** | Keys unique; values may repeat |
| Access | By index | By index | No indexing (membership only) | By key |
| Example | `[1, 2, 2]` | `(1, 2, 2)` | `{1, 2}` | `{"a": 1}` |
| Creation function | `list()` | `tuple()` | `set()` | `dict()` |
| Empty one | `[]` | `()` | `set()` | `{}` |
| Nesting | Can contain any type | Can contain any type | Items must be immutable | Keys immutable; values any type |
| Typical use | Changeable sequence of items | Fixed data, records | Unique items, set operations | Look-up by key |

**Applications:**

1. **List:** storing and changing collections of data, stacks and queues, data processing in loops, dynamic arrays, tokenising text.
2. **Tuple:** fixed data such as coordinates and constants, dictionary keys (tuples are hashable), records of mixed data.
3. **Set:** removing duplicates, set operations (union, intersection, difference), fast membership tests, finding common items.
4. **Dictionary:** records with named fields, counting frequencies, fast look-up tables, JSON data, grouping data by key.

## Modules and Packages {#modules-and-packages}

### Modules

A **module** is a **Python file (`.py`)** that contains definitions (functions, classes, variables) and statements. The module name is the file name without `.py`. Modules let a large program be divided into files and let code be **reused**.

**Ways to import:**

```python
import math                       # import the whole module
print(math.sqrt(16), math.pi)     # 4.0 3.141592653589793

from math import factorial, gcd   # import selected names
print(factorial(5), gcd(48, 18))  # 120 6

import random as rnd              # import with an alias
print(1 <= rnd.randint(1, 6) <= 6)   # True

from datetime import date         # a class from a module
print(date(2026, 11, 1).year)     # 2026
```

(`from module import *` imports all public names, but it is discouraged because it can hide where names come from.)

**Creating a module:** save functions in a file, for example `mymath.py`:

```text
 # mymath.py
 def square(x):
     return x * x

 if __name__ == "__main__":     # runs only when the file is run directly,
     print(square(5))           # not when it is imported
```

and use it from another file in the same folder: `import mymath` and then `mymath.square(4)`.

**Some standard library modules:** `math` (mathematics), `random` (random numbers), `datetime` (dates and times), `os` (operating system), `sys` (interpreter), `statistics`, `json`, `csv`, `re` (regular expressions).

### Packages

A **package** is a **folder (directory) of modules** with a hierarchical (dotted) name. A folder becomes a regular package when it contains a file named **`__init__.py`** (which may be empty).

```text
 shapes/
     __init__.py
     circle.py
     square.py
```

```text
 import shapes.circle
 from shapes import square
 from shapes.circle import area
```

**pip** (the package installer) installs third-party packages from the Python Package Index, for example `pip install requests`.

**Module vs package:** a module is a single `.py` file; a package is a directory that groups several modules (and sub-packages).

## File Handling {#file-handling}

Files are opened with **`open(filename, mode)`**, which returns a **file object**.

| Mode | Meaning |
| --- | --- |
| `"r"` | Read (default); error if the file does not exist |
| `"w"` | Write; creates the file or **erases** an existing one |
| `"a"` | Append; adds to the end, creating the file if needed |
| `"x"` | Create; error if the file already exists |
| `"r+"` | Read and write |
| `"b"` / `"t"` | Binary / text mode (added to the others, for example `"rb"`) |

**The `with` statement** opens a file and **closes it automatically** at the end of the block, even if an error occurs. It is the recommended way to handle files.

```python
# Writing to a file
with open("notes.txt", "w") as f:
    f.write("Line 1\n")
    f.writelines(["Line 2\n", "Line 3\n"])

# Reading the whole file
with open("notes.txt", "r") as f:
    print(f.read(), end="")

# Reading line by line
with open("notes.txt") as f:
    for line in f:
        print(line.strip())

# Appending
with open("notes.txt", "a") as f:
    f.write("Line 4\n")

with open("notes.txt") as f:
    lines = f.readlines()          # a list of all lines
print(len(lines))                  # 4
```

**File methods:** `read()` (whole file as a string), `read(n)` (n characters), `readline()` (one line), `readlines()` (list of lines), `write(s)`, `writelines(list)`, `close()`, `seek(pos)` and `tell()` (move to and report the position). The `os` module can check and delete files: `os.path.exists("notes.txt")`, `os.remove("notes.txt")`.

## Exception Handling {#exception-handling}

**Errors in Python:**

1. **Syntax errors:** mistakes in the structure of the code, found **before** the program runs.
2. **Exceptions:** errors that occur **during execution**, such as `ZeroDivisionError`, `ValueError` (for example, `int("abc")`), `TypeError`, `IndexError`, `KeyError`, `NameError` and `FileNotFoundError`. If not handled, the program stops with a traceback.

**The `try` statement:**

```text
 try:
     statements that may cause an exception
 except ExceptionType:
     runs if that exception occurs
 else:
     runs only if no exception occurred
 finally:
     always runs (clean-up)
```

```python
def divide(a, b):
    try:
        result = a / b
    except ZeroDivisionError:
        print("Cannot divide by zero")
    except TypeError as e:
        print("Wrong type:", e)
    else:
        print("Result =", result)
    finally:
        print("Done")

divide(10, 4)      # Result = 2.5  /  Done
divide(10, 0)      # Cannot divide by zero  /  Done
```

1. Only the **first matching** `except` block runs; one block can handle several types: `except (ValueError, TypeError):`.
2. `except Exception as e:` catches most exceptions and gives the exception object `e`.

**Raising exceptions:** **`raise`** throws an exception deliberately.

```python
def set_age(age):
    if age < 0:
        raise ValueError("Age cannot be negative")
    return age

try:
    set_age(-5)
except ValueError as e:
    print("Error:", e)          # Error: Age cannot be negative
```

**User-defined exceptions:** created as classes derived from `Exception`:

```python
class InsufficientBalanceError(Exception):
    pass

balance = 500
try:
    if 800 > balance:
        raise InsufficientBalanceError("Balance too low")
except InsufficientBalanceError as e:
    print(e)                    # Balance too low
```

## Object-Oriented Programming in Python {#object-oriented-programming-in-python}

Python supports all the main OOP concepts (see [OOP Concepts](/topics/programming/oop-concepts)).

**Class and object:** a class is defined with **`class`**. The **`__init__()`** method is the **constructor**, called automatically when an object is created. The first parameter of every instance method, **`self`**, refers to the current object.

```python
class Student:
    school = "City School"            # class variable (shared by all objects)

    def __init__(self, name, marks):  # constructor
        self.name = name              # instance variables
        self.marks = marks

    def grade(self):                  # instance method
        return "Pass" if self.marks >= 33 else "Fail"

    def __str__(self):                # used by print()
        return f"{self.name} ({self.marks})"

s1 = Student("Rahim", 72)
s2 = Student("Karim", 25)
print(s1, s1.grade())        # Rahim (72) Pass
print(s2, s2.grade())        # Karim (25) Fail
print(Student.school)        # City School
```

**Inheritance:** a subclass is written as `class Child(Parent):`; **`super()`** calls the parent's methods. Python supports **single, multiple, multilevel and hierarchical** inheritance.

```python
class Animal:
    def __init__(self, name):
        self.name = name
    def speak(self):
        return "makes a sound"

class Dog(Animal):                    # Dog inherits from Animal
    def speak(self):                  # overriding
        return "barks"

class Cat(Animal):
    def speak(self):
        return "meows"

for a in [Dog("Tommy"), Cat("Kitty"), Animal("Generic")]:
    print(a.name, a.speak())          # polymorphism: same call, different results
```

Output:

```text
Tommy barks
Kitty meows
Generic makes a sound
```

**Encapsulation:** Python has no `private` keyword. By convention, a name beginning with **one underscore** (`_balance`) is meant for internal use, and a name beginning with **two underscores** (`__balance`) is made harder to access from outside (**name mangling**).

```python
class Account:
    def __init__(self, balance):
        self.__balance = balance      # "private" attribute

    def deposit(self, amount):
        if amount > 0:
            self.__balance += amount

    def get_balance(self):
        return self.__balance

acc = Account(1000)
acc.deposit(500)
print(acc.get_balance())              # 1500
# print(acc.__balance)                # AttributeError: not accessible directly
```

**Polymorphism:** the same method name works for different classes (as with `speak()` above), and built-in operators and functions work on many types (`len()` on strings, lists and dictionaries; `+` adds numbers and joins strings). Operators can be defined for new classes with special methods such as `__add__`.

**Abstraction:** abstract classes are created with the **`abc`** module (`ABC` and `@abstractmethod`); a class with abstract methods cannot be instantiated.

## References {#references}

**TutorialsPoint**

- [Python – Overview](https://www.tutorialspoint.com/python/python_overview.htm) — accessed 2026-11-01

**GeeksforGeeks**

- [Differences and Applications of List, Tuple, Set and Dictionary in Python](https://www.geeksforgeeks.org/python/differences-and-applications-of-list-tuple-set-and-dictionary-in-python/) — accessed 2026-11-01

**Additional sources**

- [Python (programming language)](https://en.wikipedia.org/wiki/Python_(programming_language)) — Wikipedia, accessed 2026-11-01
- [The Python Tutorial: Data Structures](https://docs.python.org/3/tutorial/datastructures.html) — Python Software Foundation, accessed 2026-11-01
- [The Python Tutorial: Modules](https://docs.python.org/3/tutorial/modules.html) — Python Software Foundation, accessed 2026-11-01
- [The Python Tutorial: Errors and Exceptions](https://docs.python.org/3/tutorial/errors.html) — Python Software Foundation, accessed 2026-11-01
