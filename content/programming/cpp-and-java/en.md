---
description: Introductory programming in C++ and Java (history, program structure, input and output, classes, and the differences between C, C++ and Java), function and class templates, multithreading with thread life cycle, and exception handling in C++ and Java.
updated: 2026-11-01
---

## Introductory Programming with C++/Java {#introductory-programming-with-cplusplus-java}

### C++

**History:** C++ was created by **Bjarne Stroustrup** at Bell Labs. He began work on "**C with Classes**" in **1979**; the name **C++** was adopted in **1983** (`++` is C's increment operator), and the first commercial release came in **1985**. Standards: C++98, C++03, C++11, C++14, C++17, C++20 and C++23.

**Features of C++:**

1. **Superset of C:** almost every C program is also a valid C++ program; C++ adds object-oriented features.
2. **Multi-paradigm:** supports both **procedural** and **object-oriented** programming (and generic programming with templates).
3. **Object-oriented:** classes, objects, encapsulation, inheritance (including **multiple inheritance**) and polymorphism (see [OOP Concepts](/topics/programming/oop-concepts)).
4. **Function and operator overloading.**
5. **Pointers and references**, with manual memory management through `new` and `delete`.
6. **Templates** and the **Standard Template Library (STL)**.
7. **Exception handling.**
8. Compiled to **machine code**, so it is fast; programs are platform-dependent and must be recompiled for each platform.

**First C++ program:**

```cpp
#include <iostream>
using namespace std;

int main()
{
    cout << "Hello, World!" << endl;   // output with cout and <<
    return 0;
}
```

1. `#include <iostream>` includes the input/output stream library.
2. `using namespace std;` allows `cout`, `cin` and `endl` to be used without the prefix `std::`.
3. **`cout`** with the **insertion operator `<<`** writes output; **`cin`** with the **extraction operator `>>`** reads input; `endl` ends the line.

**Example: a class in C++**

```cpp
#include <iostream>
using namespace std;

class Rectangle {
private:
    double length, width;              // data members (hidden)
public:
    Rectangle(double l, double w) {    // constructor
        length = l;
        width = w;
    }
    double area() {                    // member function
        return length * width;
    }
};

int main()
{
    Rectangle r(5, 3);                 // create an object
    cout << "Area = " << r.area() << endl;
    return 0;
}
```

Output: `Area = 15`

### Java

**History:** Java was designed by **James Gosling** at **Sun Microsystems**; the project began under the name **Oak**, and Java was first released in **1995**. Oracle acquired Sun Microsystems in 2009–10 and now maintains Java.

**How Java runs ("write once, run anywhere"):**

1. The **Java compiler (`javac`)** translates the source file (`.java`) into **bytecode** (`.class` file), not into machine code.
2. The **Java Virtual Machine (JVM)** on each computer translates the bytecode into that computer's machine language and runs it.

Because the same bytecode runs on any machine that has a JVM, Java is **platform-independent** (**WORA: Write Once, Run Anywhere**).

**Features of Java:**

1. **Object-oriented:** every function is written inside a class.
2. **Platform-independent** (bytecode and JVM).
3. **Simple:** no pointers (as in C/C++), no operator overloading, no multiple inheritance of classes.
4. **Robust and secure:** strong type checking, exception handling and **automatic garbage collection** (unused objects are freed automatically).
5. **Built-in multithreading.**
6. Large standard class library.

**First Java program** (saved as `Hello.java`):

```java
public class Hello {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}
```

1. Every Java program is written inside a **class**; the file name must match the public class name.
2. Execution starts at **`public static void main(String[] args)`**.
3. `System.out.println()` prints a line; input can be read with the `Scanner` class (`java.util.Scanner`).
4. Commands: `javac Hello.java` (compile to `Hello.class`), then `java Hello` (run on the JVM).

### Differences Between C, C++ and Java

| Basis | C | C++ | Java |
| --- | --- | --- | --- |
| Developed by | Dennis Ritchie (1972) | Bjarne Stroustrup (1979–1985) | James Gosling, Sun Microsystems (1995) |
| Paradigm | Procedural | Procedural and object-oriented | Object-oriented |
| Translation | Compiled to machine code | Compiled to machine code | Compiled to bytecode, run by the JVM |
| Platform | Dependent | Dependent | Independent (WORA) |
| Classes and objects | No | Yes | Yes |
| Pointers | Yes | Yes | No (references only) |
| Memory management | Manual (`malloc`/`free`) | Manual (`new`/`delete`) | Automatic garbage collection |
| Multiple inheritance | — | Supported | Only through interfaces |
| Operator overloading | No | Yes | No |
| Templates / generics | No | Templates | Generics |
| Exception handling | No | Yes | Yes |
| Built-in multithreading | No | Standard library `std::thread` (since C++11) | Yes (`Thread` class) |
| Input/output | `printf`, `scanf` | `cin`, `cout` | `System.in`, `System.out` |
| Structures and unions | Yes | Yes | No |
| `goto` | Yes | Yes | No (reserved word, not used) |
| Approach | Top-down | Bottom-up | Bottom-up |
| Focus | Functions and procedures | Objects and classes (and functions) | Objects and classes |
| Namespaces | No | `namespace` | Packages |
| Standard library | C Standard Library | Standard Template Library (STL) | Java class library (API) |
| File extension | `.c` | `.cpp` | `.java` (compiled to `.class`) |
| Typical uses | Operating systems, embedded systems | Applications, games, system software | Enterprise, web and Android applications |

## Template Functions and Classes {#template-functions-and-classes}

**Definition:** a **template** is a **blueprint for creating a generic function or class** that works with **any data type**. The data type is given as a **parameter** (a placeholder such as `T`), and the compiler creates a separate version of the function or class for each type actually used (**template instantiation**, done at **compile time**). Templates support **generic programming** in C++.

### Function Template

```text
 template <typename T>
 return_type function_name(parameters) { ... }
```

(`typename` and `class` can both be used to declare a type parameter.)

```cpp
#include <iostream>
#include <string>
using namespace std;

template <typename T>
T Max(T a, T b)                      // one definition for all types
{
    return (a > b) ? a : b;
}

int main()
{
    cout << Max(39, 20) << endl;                        // T = int
    cout << Max(13.5, 20.7) << endl;                    // T = double
    cout << Max(string("Hello"), string("World")) << endl;  // T = string
    return 0;
}
```

Output:

```text
39
20.7
World
```

Without a template, three separate overloaded functions (`int`, `double`, `string`) would be needed.

### Class Template

```cpp
#include <iostream>
#include <string>
using namespace std;

template <class T>
class Box {
    T value;
public:
    Box(T v) { value = v; }
    T get() { return value; }
};

template <class T>
class Stack {
    T items[10];
    int top = -1;
public:
    void push(T x) { items[++top] = x; }
    T pop()        { return items[top--]; }
    bool empty()   { return top == -1; }
};

int main()
{
    Box<int> b1(100);                 // Box of int
    Box<string> b2("Dhaka");          // Box of string
    cout << b1.get() << " " << b2.get() << endl;

    Stack<char> s;                    // stack of characters
    s.push('A'); s.push('B'); s.push('C');
    while (!s.empty())
        cout << s.pop();
    cout << endl;
    return 0;
}
```

Output:

```text
100 Dhaka
CBA
```

The type is written in angle brackets when an object is created: `Box<int>`, `Stack<char>`. The C++ **Standard Template Library (STL)** is built from templates: for example `vector<int>`, `list<string>`, `map<string, int>`, and algorithms such as `sort()`. (Java provides a similar facility called **generics**, for example `ArrayList<Integer>`.)

**Advantages of templates:**

1. **Code reuse:** one definition works for many data types.
2. **Type safety:** types are checked at compile time.
3. **Easier maintenance:** a change is made in one place.
4. **Efficiency:** the code for each type is generated at compile time, with no run-time cost.

**Disadvantages:** compiler error messages can be long and hard to read, and each instantiation adds code to the program (larger executable).

## Multithreading {#multithreading}

**Thread:** a thread is the **smallest unit of execution** within a program (a "lightweight process"). A process can have **several threads** that share its memory and resources but run independently.

**Multithreading:** running **two or more threads of the same program concurrently**, each doing a different task. On a computer with several processor cores, the threads can run truly in parallel; on one core, the operating system switches between them quickly.

**Advantages of multithreading:**

1. **Better use of the CPU** (especially with several cores) and faster programs.
2. **Responsiveness:** for example, a program can respond to the user while a long task runs in another thread.
3. Threads **share memory**, so creating and switching threads costs less than processes.

**Disadvantages:** programs are harder to design and debug; threads that use **shared data** at the same time can corrupt it (a **race condition**), so access must be **synchronised**; badly synchronised threads can **deadlock**. (Threads are also studied in [Operating Systems](/topics/operating-systems).)

### Multithreading in Java

**Ways to create a thread:**

1. **Extending the `Thread` class** and overriding its `run()` method.
2. **Implementing the `Runnable` interface** (its `run()` method) and passing the object to a `Thread`. This is preferred, because the class can still extend another class.

The thread is started with **`start()`**, which creates a new thread and calls `run()` in it (calling `run()` directly does **not** create a new thread).

```java
class Counter implements Runnable {
    private final String name;
    Counter(String name) { this.name = name; }

    public void run() {
        for (int i = 1; i <= 3; i++)
            System.out.println(name + ": " + i);
    }
}

public class Main {
    public static void main(String[] args) throws InterruptedException {
        Thread t1 = new Thread(new Counter("A"));
        Thread t2 = new Thread(new Counter("B"));
        t1.start();          // both threads now run concurrently
        t2.start();
        t1.join();           // main waits until t1 finishes
        t2.join();
        System.out.println("Both threads finished");
    }
}
```

The lines printed by A and B **interleave in an unpredictable order**, because the threads run concurrently; "Both threads finished" always comes last because of `join()`.

**Important methods of `Thread`:** `start()`, `run()`, `sleep(ms)` (pause the current thread), `join()` (wait for a thread to finish), `setPriority(p)`, `getName()`. **`synchronized`** methods or blocks allow only one thread at a time to use shared data.

**Thread priorities:** from **1 (`MIN_PRIORITY`)** to **10 (`MAX_PRIORITY`)**; the default is **5 (`NORM_PRIORITY`)**. Priorities are only hints to the scheduler.

**Life cycle of a thread (Java):**

1. **New:** the thread object is created but `start()` has not been called.
2. **Runnable:** `start()` has been called; the thread is running or ready to run.
3. **Waiting:** waiting indefinitely for another thread to signal it (for example, through `join()` or `wait()`).
4. **Timed waiting:** waiting for a fixed time (for example, `sleep(ms)`).
5. **Terminated (dead):** `run()` has finished.

```text
 New ──start()──► Runnable ──run() ends──► Terminated
                   ▲    │
          notify / │    │ wait(), join(), sleep()
          time up  │    ▼
                  Waiting / Timed waiting
```

### Multithreading in C++

Since **C++11**, the standard library provides threads through the **`std::thread`** class in the header **`<thread>`**. A thread starts running a function as soon as it is created, and **`join()`** waits for it to finish (every thread must be joined or detached).

```cpp
#include <iostream>
#include <thread>
using namespace std;

void sumRange(int from, int to, long *result)
{
    long s = 0;
    for (int i = from; i <= to; i++)
        s += i;
    *result = s;
}

int main()
{
    long s1 = 0, s2 = 0;

    thread t1(sumRange, 1, 50, &s1);      // first half in one thread
    thread t2(sumRange, 51, 100, &s2);    // second half in another
    t1.join();                            // wait for both threads
    t2.join();

    cout << "Sum 1..100 = " << s1 + s2 << endl;
    return 0;
}
```

Output: `Sum 1..100 = 5050`

## Exceptions {#exceptions}

**Exception:** an **exception** is an **abnormal condition (a run-time error)** that occurs while a program is running and disturbs its normal flow, for example **division by zero**, an **array index out of range**, a missing file or lack of memory. If it is not handled, the program **terminates abnormally**.

**Exception handling** is a mechanism to **detect and handle** such errors so that the program can **continue or end gracefully** with a proper message. It separates the error-handling code from the normal code.

### Exception Handling in C++

Three keywords are used:

1. **`try`:** a block containing code that **may cause** an exception.
2. **`throw`:** **raises (throws)** an exception when a problem is detected.
3. **`catch`:** a block that **handles** an exception of a given type. Several `catch` blocks may follow one `try`; **`catch (...)`** catches any type of exception.

```cpp
#include <iostream>
#include <stdexcept>
using namespace std;

double divide(int a, int b)
{
    if (b == 0)
        throw runtime_error("Division by zero!");   // raise an exception
    return (double) a / b;
}

int main()
{
    try {
        cout << divide(10, 4) << endl;    // 2.5
        cout << divide(5, 0) << endl;     // throws: the rest of try is skipped
        cout << "Not printed" << endl;
    }
    catch (runtime_error &e) {
        cout << "Error: " << e.what() << endl;
    }
    cout << "Program continues" << endl;
    return 0;
}
```

Output:

```text
2.5
Error: Division by zero!
Program continues
```

**Standard exceptions:** all derive from **`std::exception`**, whose method **`what()`** returns a description. Examples: `bad_alloc` (thrown by `new` when memory is not available), `out_of_range` (thrown by `at()` of `vector` and `string`), `invalid_argument`, `runtime_error`, `overflow_error`. A programmer can define new exception classes by deriving from `std::exception`.

### Exception Handling in Java

Java uses five keywords: **`try`**, **`catch`**, **`finally`**, **`throw`** and **`throws`**.

```java
public class Main {
    public static void main(String[] args) {
        int[] a = {10, 20, 30};
        try {
            int x = 10 / 0;                       // ArithmeticException
            System.out.println(a[5]);             // not reached
        } catch (ArithmeticException e) {
            System.out.println("Cannot divide by zero");
        } catch (ArrayIndexOutOfBoundsException e) {
            System.out.println("Invalid index");
        } finally {
            System.out.println("finally always runs");
        }
    }
}
```

Output:

```text
Cannot divide by zero
finally always runs
```

1. **`finally`:** a block that **always executes**, whether or not an exception occurred; used for clean-up such as closing files.
2. **`throw`:** throws an exception explicitly: `throw new IllegalArgumentException("Negative age");`.
3. **`throws`:** written in a method header to **declare** the checked exceptions the method may throw, passing the handling to the caller: `void readFile() throws IOException`.

**Exception hierarchy in Java:** the root class is **`Throwable`**, with two subclasses:

1. **`Exception`:** conditions a program can handle.
   1. **Checked exceptions:** checked by the **compiler**; they must be caught or declared with `throws`. Example: `IOException`, `FileNotFoundException`.
   2. **Unchecked exceptions (`RuntimeException` and its subclasses):** not checked at compile time; usually caused by programming errors. Examples: `ArithmeticException`, `NullPointerException`, `ArrayIndexOutOfBoundsException`.
2. **`Error`:** serious problems outside the program's control, such as `OutOfMemoryError` and `StackOverflowError`; programs normally do not handle them.

### Differences Between throw and throws (Java)

| Basis | throw | throws |
| --- | --- | --- |
| Purpose | Raises an exception | Declares exceptions a method may raise |
| Used in | Method body | Method header (signature) |
| Followed by | An exception object (`new …`) | Exception class names |
| Number | One exception at a time | Several, separated by commas |
| Effect | Transfers control immediately | Only declares; does not raise or handle anything |
| Exception types | Checked and unchecked | Mainly checked exceptions |

### Differences Between Error and Exception

| Basis | Error | Exception |
| --- | --- | --- |
| Cause | Serious problems of the system or environment | Problems in the program or its input |
| Recovery | Usually not possible | Possible by handling it |
| Type | All errors are **unchecked** | **Checked** or **unchecked** |
| Class | `java.lang.Error` | `java.lang.Exception` |
| Examples | `OutOfMemoryError`, `StackOverflowError` | Checked: `IOException`, `SQLException`; unchecked: `ArithmeticException`, `NullPointerException`, `ArrayIndexOutOfBoundsException` |

## References {#references}

**TutorialsPoint**

- [C++ Templates](https://www.tutorialspoint.com/cplusplus/cpp_templates.htm) — accessed 2026-11-01
- [C++ Exceptions Handling](https://www.tutorialspoint.com/cplusplus/cpp_exceptions_handling.htm) — accessed 2026-11-01
- [Java – Multithreading](https://www.tutorialspoint.com/java/java_multithreading.htm) — accessed 2026-11-01
- [Java – Exceptions](https://www.tutorialspoint.com/java/java_exceptions.htm) — accessed 2026-11-01

**GeeksforGeeks**

- [Difference between C and C++](https://www.geeksforgeeks.org/cpp/difference-between-c-and-c/) — accessed 2026-11-01
- [Errors V/s Exceptions In Java](https://www.geeksforgeeks.org/java/errors-v-s-exceptions-in-java/) — accessed 2026-11-01
- [throw and throws in Java](https://www.geeksforgeeks.org/java/throw-throws-java/) — accessed 2026-11-01
- [C++ vs Java](https://www.geeksforgeeks.org/cpp/cpp-vs-java/) — accessed 2026-11-01

**Additional sources**

- [C++](https://en.wikipedia.org/wiki/C%2B%2B) — Wikipedia, accessed 2026-11-01
- [Java (programming language)](https://en.wikipedia.org/wiki/Java_(programming_language)) — Wikipedia, accessed 2026-11-01
- [std::thread](https://en.cppreference.com/w/cpp/thread/thread) — cppreference.com, accessed 2026-11-01
