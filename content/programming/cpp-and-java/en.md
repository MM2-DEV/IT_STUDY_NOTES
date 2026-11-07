---
description: Introductory programming in C++ and Java (history, program structure, input and output, classes, and the differences between C, C++ and Java), function and class templates, multithreading with thread life cycle, and exception handling in C++ and Java; Java platform independence (JDK, JRE and JVM) and garbage collection in Java.
updated: 2026-11-07
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
| Built-in multithreading | No (C11 added an optional `<threads.h>`; POSIX threads are commonly used) | Standard library `std::thread` (since C++11) | Yes (`Thread` class) |
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

**Definition:** a **template** is a **blueprint for creating a generic function or class** that works with **any data type**.

The data type is given as a **parameter** (a placeholder such as `T`), and the compiler creates a separate version of the function or class for each type actually used (**template instantiation**, done at **compile time**). Templates support **generic programming** in C++.

### Types of Templates

Templates are of two types:

1. **Function template**
2. **Class template**

#### 1. Function Template

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

#### 2. Class Template

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

**Thread:** a thread is the **smallest unit of execution** within a program (a "lightweight process").

A process can have **several threads** that share its memory and resources but run independently.

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
3. **Blocked:** waiting to acquire a monitor lock (to enter a `synchronized` block or method).
4. **Waiting:** waiting indefinitely for another thread to signal it (for example, through `join()` or `wait()`).
5. **Timed waiting:** waiting for a fixed time (for example, `sleep(ms)`).
6. **Terminated (dead):** `run()` has finished.

```text
 New ──start()──► Runnable ──run() ends──► Terminated
                   ▲    │
          notify / │    │ wait(), join(), sleep()
          time up  │    ▼
          Blocked / Waiting / Timed waiting
```

A thread in the **Blocked** state returns to Runnable when it gets the lock it was waiting for.

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

**Exception:** an **exception** is an **abnormal condition (a run-time error)** that occurs while a program is running and disturbs its normal flow, for example **division by zero**, an **array index out of range**, a missing file or lack of memory.

If it is not handled, the program **terminates abnormally**.

**Exception handling** is a mechanism to **detect and handle** such errors so that the program can **continue or end gracefully** with a proper message.

It separates the error-handling code from the normal code.

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

## Java Platform Independence: JDK, JRE and JVM {#java-platform-independence-jdk-jre-and-jvm}

### Platform Independence

**Platform independence** is the ability of a program to run on different operating systems and hardware without any change or recompilation.

Java follows the principle **"Write Once, Run Anywhere" (WORA)**: a Java program is compiled once into **bytecode**, and the same bytecode runs on every platform that has a Java Virtual Machine (JVM).

![Hello.java is compiled by javac into Hello.class (bytecode), which the JVMs for Windows, Linux and macOS each turn into machine code for their own CPU](/diagrams/programming/java-platform-independence.svg)

How Java achieves platform independence:

1. The programmer writes the source code in a `.java` file (for example, `Hello.java`).
2. The Java compiler **`javac`** (part of the JDK) compiles it into **bytecode** stored in a `.class` file (`Hello.class`). Bytecode is an intermediate, platform-neutral code; it is not the machine code of any CPU.
3. The same `.class` file is copied to any operating system and hardware.
4. The **JVM** built for that platform loads the class, verifies the bytecode and executes it: the **interpreter** executes it instruction by instruction, and the **JIT (just-in-time) compiler** converts frequently executed bytecode into the native machine code of that CPU.

**Important:** the **bytecode (the Java program) is platform-independent, but the JVM is platform-dependent**. There is a separate JVM (and JDK) for Windows, Linux and macOS; each one understands the same bytecode. A C or C++ program, by contrast, is compiled directly into the machine code of one operating system and processor, so it must be recompiled for each platform.

### JVM (Java Virtual Machine)

**JVM (Java Virtual Machine)** is an abstract machine that provides the runtime environment in which Java bytecode is executed.

It is called "virtual" because it does not exist physically; it is a **specification**, and different vendors provide implementations of it (for example, Oracle HotSpot and IBM J9). The JVM:

1. Loads the bytecode.
2. Verifies the bytecode.
3. Executes the bytecode.
4. Provides the runtime environment: memory management (garbage collection), threads and exception handling.

#### Components of the JVM Architecture

1. **Class loader subsystem:** loads `.class` files into memory in three steps:
   1. **Loading:** finds the binary form of a class and creates its `Class` object.
   2. **Linking:** **verification** (the **bytecode verifier** checks that the bytecode is valid and safe), **preparation** (memory is allocated for static variables, with default values) and **resolution** (symbolic references are replaced by direct references).
   3. **Initialization:** static variables get their actual values and static blocks run.

   There are three built-in class loaders: the **Bootstrap** class loader (core Java classes), the **Extension** class loader (called the **Platform** class loader since Java 9) and the **Application (System)** class loader (classes on the classpath). A class loader first asks its parent to load a class (delegation).
2. **Runtime data areas** (memory areas):
   1. **Method area:** shared by all threads; stores class-level data: the runtime constant pool, field and method data, and the code of methods.
   2. **Heap:** shared by all threads; stores all objects and arrays; managed by the garbage collector.
   3. **Java stack:** one per thread; holds a frame for each method call (local variables and operand stack). A `StackOverflowError` occurs when it is full.
   4. **PC (program counter) register:** one per thread; holds the address of the instruction being executed.
   5. **Native method stack:** one per thread; used by native (C/C++) methods.
3. **Execution engine:** executes the bytecode. It has:
   1. The **interpreter**, which reads and executes bytecode one instruction at a time (starts quickly but runs more slowly).
   2. The **JIT compiler**, which compiles frequently executed ("hot") bytecode into native machine code to make it faster.
   3. The **garbage collector**, which removes unreferenced objects from the heap (see [Garbage Collection in Java](#garbage-collection-in-java)).
4. **Java Native Interface (JNI):** the interface between Java code and native libraries written in C or C++.
5. **Native method libraries:** the C/C++ libraries needed by the execution engine.

### JRE (Java Runtime Environment)

**JRE (Java Runtime Environment)** is a software package that provides the environment needed to **run** Java programs: the JVM, the Java class libraries and other supporting files.

> **JRE = JVM + class libraries + supporting files**

The JRE does not contain development tools such as the compiler or the debugger, so it can run Java programs but cannot be used to develop them. It is used by end users who only need to run Java applications.

### JDK (Java Development Kit)

**JDK (Java Development Kit)** is a software development kit used to **develop** Java applications; it contains the JRE together with development tools.

> **JDK = JRE + development tools**

The main JDK tools are:

1. **`javac`:** the compiler; converts `.java` source files into `.class` bytecode files.
2. **`java`:** the launcher; starts the JVM and runs a class.
3. **`jdb`:** the debugger.
4. **`jar`:** the archiver; packages classes into a `.jar` file.
5. **`javadoc`:** the documentation generator.

![Nested boxes: the JVM and the class libraries inside the JRE, and the JRE and the development tools inside the JDK](/diagrams/programming/jdk-jre-jvm.svg)

The three are nested: **JDK ⊃ JRE ⊃ JVM**. A developer needs the JDK; a user who only runs Java programs needs a JRE.

Since **Java 11**, Oracle no longer offers a separate JRE download: the JDK is installed instead, or a smaller custom runtime is built with the `jlink` tool (introduced in Java 9). The JRE (JVM + libraries) still exists as part of the JDK.

### Differences Between JDK, JRE and JVM

| Basis | JDK | JRE | JVM |
| --- | --- | --- | --- |
| Full form | Java Development Kit | Java Runtime Environment | Java Virtual Machine |
| Definition | Software development kit for developing Java applications | Package that provides the environment to run Java programs | Abstract machine that executes bytecode |
| Main purpose | Develop (write, compile, debug, package) and run programs | Run programs | Execute bytecode by converting it into machine code |
| Contains | JRE + development tools | JVM + class libraries + supporting files | Class loader, runtime data areas, execution engine |
| Compiler and debugger | Included | Not included | Not included |
| Used by | Developers | End users who only run Java programs | Used inside the JRE to run every program |
| Platform-dependent? | Yes | Yes | Yes (the bytecode it runs is platform-independent) |

## Garbage Collection in Java {#garbage-collection-in-java}

### Definition

**Garbage collection (GC)** in Java is the automatic memory management performed by the JVM: it finds objects on the heap that are no longer reachable by the program and reclaims their memory.

In C, memory is released with `free()` and in C++ with `delete`; in Java the programmer never releases memory explicitly. The part of the JVM that does this work is the **garbage collector**.

An object is **garbage (eligible for garbage collection)** when no live reference can reach it.

### How Garbage Collection Works

The garbage collector decides which objects are alive by **reachability**: starting from the **GC roots** (local variables in the stacks of active threads, static variables and similar references), it follows every reference. Objects that cannot be reached are garbage. (Simple **reference counting** is not used, because it cannot free objects that refer to each other in a cycle.)

The basic **mark and sweep** algorithm works in these steps:

1. **Mark:** every object reachable from the GC roots is marked as live.
2. **Sweep:** the heap is scanned, and the memory of every unmarked (dead) object is freed.
3. **Compact:** the live objects are moved together, so that the free memory forms one block and fragmentation is removed.

While the collector works, the application threads may be paused; this is called a **stop-the-world** pause.

### Generational Heap

The heap is divided into generations, because most objects die young:

1. **Young generation:** new objects are created in **Eden**. It also has two **survivor spaces (S0 and S1)**. At each collection, the live objects of Eden and one survivor space are copied into the other (empty) survivor space, and the roles of the two survivor spaces are swapped.
2. **Old (tenured) generation:** objects that survive several young-generation collections are **promoted (tenured)** here. Moving objects from survivor space to survivor space until promotion is called **aging**.

There are two kinds of collection:

1. **Minor GC:** collects only the young generation, when Eden is full. It is frequent and fast, because few young objects are still alive.
2. **Major (full) GC:** collects the old generation (a full GC collects the whole heap) when it fills up. It takes much longer than a minor GC.

Class metadata was kept in the **Permanent Generation (PermGen)** up to Java 7; since **Java 8** it is kept in **Metaspace**, which uses native memory outside the heap. PermGen is not the same as the tenured (old) generation.

### Ways to Make an Object Eligible for Garbage Collection

1. **Nullifying the reference:**

   ```java
   Employee e = new Employee();
   e = null;            // the Employee object is now unreachable
   ```

2. **Reassigning the reference:**

   ```java
   Employee e1 = new Employee();
   Employee e2 = new Employee();
   e1 = e2;             // the object first referred to by e1 is now unreachable
   ```

3. **Object created inside a method:** when the method returns, its local reference disappears, so the object becomes unreachable (unless the method returns it and the caller keeps it).
4. **Anonymous object:** `new Employee();` creates an object without storing any reference to it, so it is eligible at once.
5. **Island of isolation:** a group of objects that refer to one another but are not referenced by any live object. The whole group is eligible for garbage collection.

### Requesting Garbage Collection

`System.gc()` and `Runtime.getRuntime().gc()` **request** the JVM to run the garbage collector. They are only requests: the JVM decides whether and when to run it, so collection is not guaranteed.

### The finalize() Method

`protected void finalize() throws Throwable` is a method of the `Object` class that the garbage collector may call on an object before reclaiming it, so that the object can release resources. It is not guaranteed to run promptly or at all, so programs must not rely on it.

`finalize()` was **deprecated in Java 9**, and finalization was **deprecated for removal in Java 18** (JEP 421). Resources such as files and connections should be released with **try-with-resources** or the `java.lang.ref.Cleaner` class instead.

### Types of Garbage Collectors

| Collector | JVM option | How it works | Version notes |
| --- | --- | --- | --- |
| Serial GC | `-XX:+UseSerialGC` | One thread does all the GC work and stops all application threads; for small heaps and single-processor machines | — |
| Parallel GC (throughput collector) | `-XX:+UseParallelGC` | Like Serial GC but uses several GC threads; aims at maximum throughput; still stops the application | Default up to Java 8 on server-class machines |
| CMS (Concurrent Mark Sweep) | `-XX:+UseConcMarkSweepGC` | Does most of its marking at the same time as the application, giving shorter pauses but using more CPU | Deprecated in Java 9; removed in Java 14 |
| G1 (Garbage-First) | `-XX:+UseG1GC` | Divides the heap into many equal-sized regions and collects the regions with the most garbage first; aims at predictable pause times on large heaps | **Default since Java 9** |
| ZGC (Z Garbage Collector) | `-XX:+UseZGC` | Does almost all its work concurrently; pauses of a few milliseconds even on very large heaps | Experimental in Java 11; production-ready in Java 15 |
| Shenandoah | `-XX:+UseShenandoahGC` | Low pause times by doing compaction concurrently with the application | Experimental in Java 12; production-ready in Java 15 |

### Advantages of Garbage Collection

1. Memory is managed automatically; the programmer does not have to free it.
2. Memory of unreachable objects is reclaimed and reused, which makes Java programs memory-efficient.
3. It prevents errors of manual memory management such as **dangling pointers** and **double free**.
4. It **reduces** memory leaks and lets programmers concentrate on program logic.

### Disadvantages of Garbage Collection

1. **Stop-the-world pauses** can affect the response time of the application.
2. The collector uses CPU time and memory of its own.
3. The programmer cannot control when it runs; `System.gc()` is only a request.
4. It cannot free objects that are still referenced but no longer needed (for example, objects kept in a static collection), so memory leaks and `OutOfMemoryError` are still possible.
5. It frees memory only; external resources such as files, sockets and database connections must be closed by the program.

## References {#references}

**TutorialsPoint**

- [C++ Templates](https://www.tutorialspoint.com/cplusplus/cpp_templates.htm) — accessed 2026-11-01
- [C++ Exceptions Handling](https://www.tutorialspoint.com/cplusplus/cpp_exceptions_handling.htm) — accessed 2026-11-01
- [Java – Multithreading](https://www.tutorialspoint.com/java/java_multithreading.htm) — accessed 2026-11-01
- [Java – Exceptions](https://www.tutorialspoint.com/java/java_exceptions.htm) — accessed 2026-11-01
- [Difference Between JDK, JRE, and JVM](https://www.tutorialspoint.com/java/java-jdk-jre-jvm.htm) — accessed 2026-11-07
- [JVM (Java Virtual Machine) Architecture](https://www.tutorialspoint.com/java/java_jvm.htm) — accessed 2026-11-07
- [Java – Garbage Collection](https://www.tutorialspoint.com/java/java_garbage_collection.htm) — accessed 2026-11-07
- [Island of Isolation in Java](https://www.tutorialspoint.com/island-of-isolation-in-java) — accessed 2026-11-07

**GeeksforGeeks**

- [Difference between C and C++](https://www.geeksforgeeks.org/cpp/difference-between-c-and-c/) — accessed 2026-11-01
- [Errors V/s Exceptions In Java](https://www.geeksforgeeks.org/java/errors-v-s-exceptions-in-java/) — accessed 2026-11-01
- [throw and throws in Java](https://www.geeksforgeeks.org/java/throw-throws-java/) — accessed 2026-11-01
- [C++ vs Java](https://www.geeksforgeeks.org/cpp/cpp-vs-java/) — accessed 2026-11-01
- [Differences Between JDK, JRE and JVM](https://www.geeksforgeeks.org/java/differences-jdk-jre-jvm/) — accessed 2026-11-07
- [How JVM Works – JVM Architecture](https://www.geeksforgeeks.org/java/how-jvm-works-jvm-architecture/) — accessed 2026-11-07
- [Garbage Collection in Java](https://www.geeksforgeeks.org/java/garbage-collection-in-java/) — accessed 2026-11-07
- [JVM Garbage Collectors](https://www.geeksforgeeks.org/java/types-of-jvm-garbage-collectors-in-java-with-implementation-details/) — accessed 2026-11-07
- [How to make object eligible for garbage collection in Java?](https://www.geeksforgeeks.org/java/how-to-make-object-eligible-for-garbage-collection/) — accessed 2026-11-07

**TpointTech**

- [Difference between JDK, JRE and JVM](https://www.tpointtech.com/difference-between-jdk-jre-and-jvm) — accessed 2026-11-07
- [JVM (Java Virtual Machine) Architecture](https://www.tpointtech.com/jvm-java-virtual-machine) — accessed 2026-11-07
- [Why is Java Platform Independent?](https://www.tpointtech.com/why-is-java-platform-independent) — accessed 2026-11-07
- [Garbage Collection in Java](https://www.tpointtech.com/Garbage-Collection) — accessed 2026-11-07
- [Types of Garbage Collector in Java](https://www.tpointtech.com/types-of-garbage-collector-in-java) — accessed 2026-11-07
- [How Garbage Collection Works in Java](https://www.tpointtech.com/how-garbage-collection-works-in-java) — accessed 2026-11-07

**Programiz**

- [Java JDK, JRE and JVM](https://www.programiz.com/java-programming/jvm-jre-jdk) — accessed 2026-11-07
- Programiz has no page on garbage collection in Java (checked 2026-11-07).

**Additional sources** (version facts that the reference websites do not give or give inconsistently)

- [Oracle JDK Migration Guide, Release 11](https://docs.oracle.com/en/java/javase/11/migrate/index.html) — Oracle, accessed 2026-11-07 (no separate JRE from JDK 11)
- [HotSpot Virtual Machine Garbage Collection Tuning Guide (Java SE 17): Garbage Collector Implementation](https://docs.oracle.com/en/java/javase/17/gctuning/garbage-collector-implementation.html) and [Available Collectors](https://docs.oracle.com/en/java/javase/17/gctuning/available-collectors.html) — Oracle, accessed 2026-11-07
- [Java SE 21 API: Class Object](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/Object.html) — Oracle, accessed 2026-11-07 (`finalize()` deprecated since 9, for removal)
- OpenJDK JEPs, accessed 2026-11-07: [JEP 248](https://openjdk.org/jeps/248) (G1 default, JDK 9), [JEP 291](https://openjdk.org/jeps/291) (CMS deprecated, JDK 9), [JEP 363](https://openjdk.org/jeps/363) (CMS removed, JDK 14), [JEP 377](https://openjdk.org/jeps/377) (ZGC production, JDK 15), [JEP 379](https://openjdk.org/jeps/379) (Shenandoah production, JDK 15), [JEP 421](https://openjdk.org/jeps/421) (finalization deprecated for removal, JDK 18)
- [C++](https://en.wikipedia.org/wiki/C%2B%2B) — Wikipedia, accessed 2026-11-01
- [Java (programming language)](https://en.wikipedia.org/wiki/Java_(programming_language)) — Wikipedia, accessed 2026-11-01
- [std::thread](https://en.cppreference.com/w/cpp/thread/thread) — cppreference.com, accessed 2026-11-01

Issues found on the reference websites and how they were resolved:

1. TutorialsPoint's JDK/JRE/JVM table calls the JVM platform-independent, which contradicts its own definition and the other websites; the JVM is platform-dependent, and the bytecode it runs is platform-independent.
2. TpointTech defines the JRE as "a set of software tools that are used for developing Java applications", which contradicts its own table; the JRE is used to run, not to develop, Java programs.
3. TutorialsPoint treats the permanent generation and the tenured generation as the same; the tenured generation is the old generation of the heap, while PermGen (replaced by Metaspace in Java 8) held class metadata.
4. TpointTech says Parallel GC is the JVM's default collector; G1 has been the default since Java 9 (JEP 248).
5. TpointTech says the garbage collector frees only objects created with `new` and that `finalize()` handles others; this was not used, because `finalize()` does not destroy objects.
6. GeeksforGeeks and TutorialsPoint give ZGC as "Java 11" and Shenandoah as "Java 12" without saying that they were experimental there; the OpenJDK JEPs show that both became production-ready in Java 15.
7. GeeksforGeeks and TpointTech say garbage collection "prevents" memory leaks; it reduces them, because objects that are still referenced are never collected.
