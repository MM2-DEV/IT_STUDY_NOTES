---
description: Object-oriented programming concepts in C++, Java and Python - classes and objects, methods, constructors and destructors, interfaces and abstract classes, packages and namespaces, encapsulation and access specifiers, friend functions, inheritance and its types, and compile-time and run-time polymorphism.
updated: 2026-11-04
---

**Object-oriented programming (OOP):** object-oriented programming is a programming paradigm that organises a program around **objects**, each of which combines **data (attributes)** and the **functions that work on that data (methods)**. Objects are created from **classes**. OOP models real-world things (a student, a bank account, a car) directly, which makes large programs easier to design, reuse and maintain. (Compare with procedural and structured programming in [Programming Paradigms](/topics/programming/programming-languages-and-paradigms#programming-paradigms).)

**Main concepts of OOP:**

1. Class and object
2. **Encapsulation** (and data hiding)
3. **Abstraction**
4. **Inheritance**
5. **Polymorphism**

Encapsulation, abstraction, inheritance and polymorphism are often called the **four pillars of OOP**.

**Abstraction:** abstraction is the process of showing only the **essential features** of an object and **hiding the implementation details**. For example, a person uses an ATM by inserting a card and choosing options without knowing how it works inside. In C++ abstraction is achieved with **abstract classes** (pure virtual functions), in Java with **abstract classes and interfaces**, and in Python with **abstract base classes** of the `abc` module (see [Interfaces](#interfaces)).

**Advantages of OOP:**

1. **Modularity:** the program is divided into self-contained objects.
2. **Reusability:** existing classes are reused through inheritance.
3. **Data security:** data is hidden inside objects (encapsulation).
4. **Easier maintenance and extension:** new classes can be added with little change to existing code.
5. **Real-world modelling:** objects correspond to real things, so the design is natural to understand.

Every concept below is shown in **C++, Java and Python**. The three languages support the same ideas with different syntax:

| Feature | C++ | Java | Python |
| --- | --- | --- | --- |
| Class definition | `class X { … };` (ends with a semicolon) | `class X { … }` | `class X:` (indented body) |
| Creating an object | `X obj;` or `X *p = new X();` | `X obj = new X();` | `obj = X()` |
| Constructor | Function with the class name | Method with the class name | `__init__(self, …)` |
| Destructor | `~X()` | None (garbage collector frees memory) | `__del__(self)` (rarely needed) |
| Current object | `this` (a pointer: `this->x`) | `this` (a reference: `this.x`) | `self` (written as the first parameter) |
| Access specifiers | `public`, `private`, `protected` (class default: `private`) | `public`, `private`, `protected`, default (package) | None enforced; `_name` (protected by convention), `__name` (private by name mangling) |
| Inheritance syntax | `class D : public B` | `class D extends B` | `class D(B):` |
| Multiple inheritance of classes | Yes | No (only through interfaces) | Yes |
| Calling the parent | `B::f()`; base constructor in the initializer list | `super.f()`, `super(…)` | `super().f()` |
| Interface | Abstract class with pure virtual functions | `interface` | Abstract base class (`abc` module) |
| Method (function) overloading | Yes | Yes | No (the last definition replaces earlier ones) |
| Operator overloading | Yes (`operator+`) | No | Yes (`__add__` and other special methods) |
| Run-time polymorphism | Only through `virtual` functions | All non-static, non-final, non-private methods can be overridden | All methods can be overridden |
| Friend functions | Yes (`friend`) | No | No |
| Grouping of names | `namespace` | `package` | Module and package |
| Freeing object memory | Manual (`delete`) for objects made with `new` | Automatic (garbage collector) | Automatic (garbage collector) |

## Classes and Objects {#classes-and-objects}

**Class:** a class is a **user-defined blueprint (template)** that defines the **attributes (data members, fields)** and **behaviour (methods, member functions)** common to all objects of one kind. A class is only a description; it **does not occupy memory** for data until objects are created.

**Object:** an object is an **instance of a class**: a real entity created from the class, with its **own copy of the attributes** (its **state**), that can use the class's methods (its **behaviour**). Every object also has an **identity** that distinguishes it from other objects.

**Example:** `Student` is a class; Rahim and Karim are two objects of the class `Student`, each with its own roll number and name.

### Class and Object in C++

```cpp
#include <iostream>
#include <string>
using namespace std;

class Student {
public:
    int roll;                       // attributes (data members)
    string name;

    void display() {                // behaviour (member function)
        cout << roll << " " << name << endl;
    }
};

int main() {
    Student s1;                     // object created on the stack
    s1.roll = 1;
    s1.name = "Rahim";

    Student s2;                     // a second, separate object
    s2.roll = 2;
    s2.name = "Karim";

    s1.display();
    s2.display();
    return 0;
}
```

In C++, an object can be created directly (`Student s1;`) or with `new` (`Student *p = new Student;`, which must later be freed with `delete p;`). Members are accessed with the dot operator (`s1.name`), or with the arrow operator through a pointer (`p->name`).

### Class and Object in Java

```java
class Student {
    // attributes (fields)
    int roll;
    String name;

    // behaviour (method)
    void display() {
        System.out.println(roll + " " + name);
    }
}

public class Main {
    public static void main(String[] args) {
        Student s1 = new Student();    // create an object with new
        s1.roll = 1;
        s1.name = "Rahim";

        Student s2 = new Student();    // a second, separate object
        s2.roll = 2;
        s2.name = "Karim";

        s1.display();
        s2.display();
    }
}
```

In Java, objects are always created with **`new`**, which allocates memory on the heap and returns a reference; members are accessed with the dot operator (`s1.name`).

### Class and Object in Python

```python
class Student:
    def __init__(self, roll, name):   # constructor
        self.roll = roll              # attributes of this object
        self.name = name

    def display(self):                # method
        print(self.roll, self.name)


s1 = Student(1, "Rahim")              # create objects by calling the class
s2 = Student(2, "Karim")
s1.display()
s2.display()
```

In Python, an object is created by **calling the class** like a function; `__init__()` initializes it, and `self` refers to the object being created.

Output (the same in all three languages):

```text
1 Rahim
2 Karim
```

### Differences Between Class and Object

| Basis | Class | Object |
| --- | --- | --- |
| Meaning | Blueprint (template) from which objects are created | Instance of a class |
| Nature | Logical entity | Real (physical) entity, such as a pen, a car or a student |
| Memory | No memory for data when it is declared | Memory is allocated when it is created |
| Declared / created | Declared once with the keyword `class` | Created many times as needed (`new` in C++ and Java; by calling the class in Python) |
| Contents | Defines the attributes and methods | Holds its own values of the attributes (its state) |
| Existence | Exists in the program text (and is loaded once) | Created at run time and destroyed when no longer needed |
| Grouping | A group of similar objects | One individual member of that group |
| Example | `Student` | `s1` (Rahim), `s2` (Karim) |

## Methods {#methods}

**Definition:** a method is a **function defined inside a class** that describes the **behaviour** of its objects. It is a group of statements that performs one operation, and it is called through an object (or through the class, for static methods). In C++ a method is usually called a **member function**.

**Parts of a method:**

1. **Access modifier** (C++ and Java): `public`, `private` or `protected`.
2. **Return type** (C++ and Java): the type of the value returned, or **`void`** if nothing is returned. Python does not declare it.
3. **Method name** and **parameter list**: together they form the method's **signature**. In Python the first parameter is **`self`**, the current object.
4. **Body**: the statements that do the work.

**Types of methods:**

1. **Instance method:** belongs to an object; called through an object (`r.area()`), and can use the object's attributes.
2. **Static method:** declared with **`static`** (C++, Java) or **`@staticmethod`** (Python); belongs to the class, not to any object; called through the class name and cannot use instance attributes. `main()` in Java is static.
3. **Class method** (Python only): declared with **`@classmethod`**; receives the class (`cls`) instead of an object, and can use class attributes.

**Method overloading:** two or more methods in the same class with the **same name but different parameter lists** (number, types or order of parameters). C++ and Java support it; Python does not (see [Polymorphism](#polymorphism)).

### Constructors and Destructors

**Constructor:** a constructor is a **special method that initializes an object** automatically when the object is created.

**Rules (C++ and Java):**

1. Its **name is the same as the class name** (in Python the constructor is always named `__init__`).
2. It has **no return type**, not even `void`.
3. It is **called automatically** when an object is created.
4. A class can have **several constructors** with different parameters (**constructor overloading**); Python allows only one `__init__`, but default parameter values give the same effect.
5. If no constructor is written, the compiler supplies a **default constructor**; if any constructor is written, the default one is no longer supplied.

**Types of constructors:**

1. **Default (no-argument) constructor:** takes no parameters.
2. **Parameterized constructor:** takes parameters, so that each object gets its own initial values.
3. **Copy constructor** (C++): creates a new object as a copy of an existing object of the same class: `Rectangle(const Rectangle &r)`.

**Destructor:** a destructor is a special method that is **called automatically when an object is destroyed**, to release resources. In C++ it has the class name preceded by a tilde (`~Rectangle()`), takes no parameters and cannot be overloaded. Java has no destructors (the **garbage collector** frees unused objects automatically). Python has `__del__()`, which runs when the object's last reference is removed.

#### Methods, Constructors and Destructor in C++

```cpp
#include <iostream>
using namespace std;

class Rectangle {
    double length, width;
    static int count;                          // shared by all objects
public:
    Rectangle() : Rectangle(1, 1) {}           // default constructor
    Rectangle(double l, double w) {            // parameterized constructor
        length = l;
        width = w;
        count++;
    }
    Rectangle(const Rectangle &r) {            // copy constructor
        length = r.length;
        width = r.width;
        count++;
    }
    ~Rectangle() {                             // destructor
        cout << "Destroying " << length << " x " << width << endl;
    }
    double area() { return length * width; }   // instance method
    static int getCount() { return count; }    // static method
};

int Rectangle::count = 0;

int main() {
    Rectangle r1;                              // 1 x 1
    Rectangle r2(5, 3);                        // 5 x 3
    Rectangle r3 = r2;                         // copy of r2
    cout << r1.area() << " " << r2.area() << " " << r3.area() << endl;
    cout << "Objects: " << Rectangle::getCount() << endl;
    return 0;                                  // destructors run here
}
```

Output:

```text
1 15 15
Objects: 3
Destroying 5 x 3
Destroying 5 x 3
Destroying 1 x 1
```

The destructors run automatically when `main()` ends, in the reverse order of creation (`r3`, `r2`, then `r1`).

#### Methods and Constructors in Java

```java
class Rectangle {
    double length, width;
    static int count = 0;                      // shared by all objects

    Rectangle() {                              // no-argument constructor
        this(1, 1);                            // calls the other constructor
    }

    Rectangle(double length, double width) {   // parameterized constructor
        this.length = length;                  // this.length is the field
        this.width = width;
        count++;
    }

    double area() {                            // instance method
        return length * width;
    }

    static int getCount() {                    // static method
        return count;
    }
}

public class Main {
    public static void main(String[] args) {
        Rectangle r1 = new Rectangle();        // 1 x 1
        Rectangle r2 = new Rectangle(5, 3);    // 5 x 3
        System.out.println(r1.area() + " " + r2.area());
        System.out.println("Objects: " + Rectangle.getCount());
    }
}
```

Output:

```text
1.0 15.0
Objects: 2
```

**The `this` keyword** refers to the **current object**; it distinguishes fields from parameters with the same name, and `this(...)` calls another constructor of the same class. C++ also has `this` (a pointer, used as `this->length`).

#### Methods, Constructor and Destructor in Python

```python
class Rectangle:
    count = 0                                  # class attribute, shared by all objects

    def __init__(self, length=1, width=1):     # constructor with default values
        self.length = length
        self.width = width
        Rectangle.count += 1

    def area(self):                            # instance method
        return self.length * self.width

    @staticmethod
    def describe():                            # static method
        return "A rectangle has four right angles"

    @classmethod
    def get_count(cls):                        # class method
        return cls.count

    def __del__(self):                         # destructor
        print("Destroying", self.length, "x", self.width)


r1 = Rectangle()                               # 1 x 1
r2 = Rectangle(5, 3)                           # 5 x 3
print(r1.area(), r2.area())
print(Rectangle.describe())
print("Objects:", Rectangle.get_count())
del r1                                         # last reference removed: __del__ runs
```

Output:

```text
1 15
A rectangle has four right angles
Objects: 2
Destroying 1 x 1
Destroying 5 x 3
```

`r2` is destroyed when the program ends.

### Differences Between Constructor and Method

| Basis | Constructor | Method |
| --- | --- | --- |
| Purpose | Initializes a new object | Performs an operation (behaviour) |
| Name | Same as the class (`__init__` in Python) | Any valid name |
| Return type | None | Must have one (or `void`) in C++ and Java |
| Call | Automatically, when the object is created | Explicitly, through an object or class |
| Inheritance | Not inherited (C++, Java) | Inherited by subclasses |
| Number of executions | Once for each object created | Any number of times |
| Overriding | Can be overloaded but not overridden | Can be overloaded and overridden |
| Modifiers (Java) | Cannot be `static`, `final` or `abstract` | Can be `static`, `final` or `abstract` |

## Interfaces {#interfaces}

**Definition:** an interface is a **set of method declarations without bodies** that specifies **what** a class must do, **not how**. A class that implements an interface must provide the bodies of all its methods. Interfaces are used to achieve **abstraction**, and in Java also **multiple inheritance**. Java has an `interface` keyword; C++ and Python achieve the same with **abstract classes**.

**Abstract class:** an abstract class is a class that **cannot be instantiated** (no objects can be created from it) and is meant to be inherited. It contains at least one **abstract method** — a method declared without a body, which every concrete subclass must define.

1. **C++:** a class with at least one **pure virtual function** (`virtual double area() = 0;`) is abstract. A class whose functions are all pure virtual acts as an interface.
2. **Java:** declared with **`interface`**; a class uses it with **`implements`**. Java also has `abstract class`.
3. **Python:** a class that inherits from **`ABC`** (module `abc`) and marks methods with **`@abstractmethod`**.

### Interface in C++ (Abstract Class)

```cpp
#include <iostream>
using namespace std;

class Shape {                              // abstract class used as an interface
public:
    virtual double area() = 0;             // pure virtual function: no body
    virtual ~Shape() {}
};

class Circle : public Shape {
    double r;
public:
    Circle(double r) : r(r) {}
    double area() override { return 3.14159 * r * r; }
};

class Square : public Shape {
    double side;
public:
    Square(double s) : side(s) {}
    double area() override { return side * side; }
};

int main() {
    // Shape s;                            // error: cannot create an object of an abstract class
    Shape *s1 = new Circle(1);             // a base-class pointer can hold any derived object
    Shape *s2 = new Square(4);
    cout << s1->area() << endl;
    cout << s2->area() << endl;
    delete s1;
    delete s2;
    return 0;
}
```

### Interface in Java

```java
interface Shape {
    double PI = 3.14159;        // constant: public static final by default
    double area();              // abstract method: public abstract by default
}

class Circle implements Shape {
    double r;
    Circle(double r) { this.r = r; }
    public double area() { return PI * r * r; }     // body provided here
}

class Square implements Shape {
    double side;
    Square(double side) { this.side = side; }
    public double area() { return side * side; }
}

public class Main {
    public static void main(String[] args) {
        Shape s1 = new Circle(1);    // an interface reference can hold any implementing object
        Shape s2 = new Square(4);
        System.out.println(s1.area());
        System.out.println(s2.area());
    }
}
```

### Interface in Python (Abstract Base Class)

```python
from abc import ABC, abstractmethod


class Shape(ABC):                          # abstract base class used as an interface
    @abstractmethod
    def area(self):                        # abstract method: no body
        pass


class Circle(Shape):
    def __init__(self, r):
        self.r = r

    def area(self):
        return 3.14159 * self.r * self.r


class Square(Shape):
    def __init__(self, side):
        self.side = side

    def area(self):
        return self.side * self.side


# Shape()                                  # TypeError: cannot instantiate an abstract class
for s in (Circle(1), Square(4)):
    print(s.area())
```

Output (C++ and Python; Java prints `3.14159` and `16.0`):

```text
3.14159
16
```

**Properties of a Java interface:**

1. Declared with the keyword **`interface`**; a class uses it with **`implements`**.
2. Its methods are **public and abstract** by default (Java 8 and later also allow **default** and **static** methods with bodies).
3. Its fields are **constants** (`public static final`).
4. An interface **cannot be instantiated** and has **no constructors**.
5. A class can **extend only one class**, but it can **implement many interfaces**: `class C extends B implements I1, I2`. This is how Java provides **multiple inheritance** of types.
6. An interface can **extend other interfaces** (even several).
7. A class that does not implement all the interface's methods must be declared **abstract**.

### Differences Between Abstract Class and Interface

The table compares them as they are in Java.

| Basis | Abstract class | Interface |
| --- | --- | --- |
| Keyword | `abstract class` | `interface` |
| Methods | Abstract and non-abstract (with bodies) | Abstract (plus default and static methods from Java 8) |
| Fields | Any kind of variables | Only constants (`public static final`) |
| Constructors | Can have constructors | Cannot have constructors |
| Inheritance | A class **extends** only one abstract class | A class can **implement** many interfaces |
| Access of members | Any access modifier | Methods are public |
| Use | Common base with some shared code (closely related classes) | A contract (set of methods) for unrelated classes |
| State | Can keep state in instance variables | Cannot keep state (only constants) |
| Final methods | Allowed | Not allowed |
| Implementing class must | Override only the abstract methods | Implement all the abstract methods |
| Coupling | Tighter | Looser |

## Packages {#packages}

**Definition:** a package is a **group of related classes, interfaces and sub-packages** under one name. It works like a **folder**: it organises the code and gives it a separate **namespace**, so classes with the same name in different packages do not conflict. Java uses **packages**, C++ uses **namespaces**, and Python uses **modules and packages**.

### Packages in Java

**Types of packages:**

1. **Built-in packages:** supplied with Java, for example:
   1. `java.lang`: fundamental classes (`String`, `Math`, `System`); imported automatically
   2. `java.io`: input and output
   3. `java.util`: utility classes (`Scanner`, `ArrayList`)
   4. `java.net`: networking
2. **User-defined packages:** created by the programmer.

**Creating a package:** the **`package` statement** must be the **first statement** of the source file; the compiled class files are stored in a folder with the same name as the package.

```java
// File: shapes/Circle.java
package shapes;

public class Circle {
    public double area(double r) {
        return 3.14159 * r * r;
    }
}
```

**Using a package:** classes from another package are used with the **`import`** statement (written after `package` and before the class), or by writing the class's full (qualified) name, such as `java.util.Scanner`.

```java
// File: Main.java
import shapes.Circle;          // import one class
// import shapes.*;            // or import all public classes of the package

public class Main {
    public static void main(String[] args) {
        Circle c = new Circle();
        System.out.println(c.area(2));         // 12.56636
    }
}
```

The command `javac -d . Circle.java` compiles the class and creates the package folder automatically. Companies usually name their packages with their **reversed domain name**, for example `com.example.billing`.

### Namespaces in C++

A **namespace** groups related names (functions, classes, variables) under one name, so the same name can be used in different namespaces without conflict. The whole standard library is in the namespace **`std`**. A name is used as `namespace::name`, or all the names are brought into scope with `using namespace`.

```cpp
#include <iostream>
using namespace std;

namespace shapes {                         // user-defined namespace
    double circleArea(double r) { return 3.14159 * r * r; }
}

namespace physics {
    double circleArea(double r) { return 3.14 * r * r; }   // same name, no conflict
}

int main() {
    cout << shapes::circleArea(2) << endl; // qualified name
    using namespace shapes;                // bring the names of shapes into scope
    cout << circleArea(1) << endl;
    return 0;
}
```

Output:

```text
12.5664
3.14159
```

### Modules and Packages in Python

A **module** is a single `.py` file; a **package** is a folder of modules (traditionally containing an `__init__.py` file). They are used with **`import`**.

```python
# File: shapes/circle.py   (the folder shapes/ is a package)
def area(r):
    return 3.14159 * r * r
```

```python
# File: main.py
import math                       # built-in module
from shapes import circle         # user-defined package "shapes", module "circle"

print(math.sqrt(16))              # 4.0
print(circle.area(2))             # 12.56636
```

**Advantages of packages (and namespaces):**

1. **Organise** related classes and interfaces, so they are easy to find and use.
2. **Prevent name conflicts** (two classes named `Date` can exist in different packages).
3. Provide **access protection** (package-level access in Java).
4. Make code **reusable**.

## Encapsulation {#encapsulation}

**Definition:** encapsulation is the **wrapping (binding) of data and the methods that operate on that data into a single unit (a class)**, and **restricting direct access to the data** from outside. The data is made **private** and accessed only through **public methods**, usually **getters** (to read) and **setters** (to change). Hiding the data in this way is called **data hiding**.

### Encapsulation in C++

```cpp
#include <iostream>
using namespace std;

class BankAccount {
private:
    double balance = 0;                    // hidden: cannot be accessed from outside

public:
    double getBalance() { return balance; }    // getter

    void deposit(double amount) {              // controlled change
        if (amount > 0)
            balance += amount;
    }

    bool withdraw(double amount) {
        if (amount > 0 && amount <= balance) {
            balance -= amount;
            return true;
        }
        return false;                          // invalid withdrawal is rejected
    }
};

int main() {
    BankAccount acc;
    acc.deposit(5000);
    acc.withdraw(7000);                        // rejected: more than the balance
    acc.withdraw(2000);
    cout << acc.getBalance() << endl;
    // acc.balance = 1000000;                  // error: balance is private
    return 0;
}
```

### Encapsulation in Java

```java
class BankAccount {
    private double balance;            // hidden: cannot be accessed directly

    public double getBalance() {       // getter
        return balance;
    }

    public void deposit(double amount) {   // controlled change
        if (amount > 0)
            balance += amount;
    }

    public boolean withdraw(double amount) {
        if (amount > 0 && amount <= balance) {
            balance -= amount;
            return true;
        }
        return false;                  // invalid withdrawal is rejected
    }
}

public class Main {
    public static void main(String[] args) {
        BankAccount acc = new BankAccount();
        acc.deposit(5000);
        acc.withdraw(7000);            // rejected: more than the balance
        acc.withdraw(2000);
        System.out.println(acc.getBalance());
        // acc.balance = 1000000;      // error: balance is private
    }
}
```

### Encapsulation in Python

```python
class BankAccount:
    def __init__(self):
        self.__balance = 0                     # private: name mangled to _BankAccount__balance

    def get_balance(self):                     # getter
        return self.__balance

    def deposit(self, amount):
        if amount > 0:
            self.__balance += amount

    def withdraw(self, amount):
        if 0 < amount <= self.__balance:
            self.__balance -= amount
            return True
        return False                           # invalid withdrawal is rejected


acc = BankAccount()
acc.deposit(5000)
acc.withdraw(7000)                             # rejected: more than the balance
acc.withdraw(2000)
print(acc.get_balance())
# print(acc.__balance)                         # AttributeError: no attribute '__balance'
```

Output: `3000` in C++ and Python, and `3000.0` in Java.

### Access Specifiers (Access Modifiers)

Access specifiers control which parts of a program can use the members of a class.

**C++** has three access specifiers. Members of a `class` are **private by default** (members of a `struct` are public by default).

| Specifier | Same class | Derived class | Outside the class |
| --- | --- | --- | --- |
| `private` | Yes | No | No |
| `protected` | Yes | Yes | No |
| `public` | Yes | Yes | Yes |

(Friend functions and friend classes can also use private and protected members; see [Friend Function](#friend-function).)

**Java** has four access levels:

| Modifier | Same class | Same package | Subclass in another package | Other packages |
| --- | --- | --- | --- | --- |
| `private` | Yes | No | No | No |
| default (no modifier) | Yes | Yes | No | No |
| `protected` | Yes | Yes | Yes | No |
| `public` | Yes | Yes | Yes | Yes |

**Python** has no access keywords; every attribute is public, and naming conventions are used instead:

1. `name` — **public**.
2. `_name` (one leading underscore) — **protected by convention**: it should not be used from outside the class, but Python does not stop it.
3. `__name` (two leading underscores) — **private** through **name mangling**: Python renames it to `_ClassName__name`, so `acc.__balance` fails outside the class (it can still be reached as `acc._BankAccount__balance`).

**Advantages of encapsulation:**

1. **Data security:** data cannot be changed directly or wrongly from outside.
2. **Control:** setters can **check** values before accepting them (for example, rejecting a negative deposit).
3. **Flexibility:** the internal implementation can change without affecting the code that uses the class.
4. **Easier maintenance and testing.**

**Encapsulation vs abstraction:** encapsulation **hides the data** (how the data is stored and protected), while abstraction **hides the implementation complexity** (how a task is done) and shows only what is necessary.

### Friend Function {#friend-function}

**Definition:** a friend function is a **non-member function** that is given permission to access the **private and protected members** of a class. The class grants this permission by declaring the function inside its body with the keyword **`friend`**. Friend functions exist only in **C++**; Java and Python have no friend functions.

**Syntax:**

```cpp
class ClassName {
    // …
    friend return_type function_name(parameters);   // declaration inside the class
};

return_type function_name(parameters) { … }         // definition outside: no friend, no ClassName::
```

**Characteristics of a friend function:**

1. It is declared inside the class with the keyword `friend`, but it is **not a member** of the class.
2. It can access the class's **private and protected** members, through an object of the class.
3. It is **called like an ordinary function** (`printWidth(b)`), not through an object (`b.printWidth()` is wrong).
4. It has **no `this` pointer**, because it does not belong to any object; the object is passed to it as an argument.
5. Its definition outside the class uses **neither the `friend` keyword nor the `::` operator**.
6. The declaration can be placed in the **private, protected or public** section; this makes no difference.
7. One function can be a friend of **two or more classes**, so it can work on the private data of all of them.
8. Friendship is **granted, not taken**: only the class itself can declare its friends.
9. Friendship is **not inherited**, **not mutual** (if A is a friend of B, B is not automatically a friend of A) and **not transitive** (a friend of a friend is not a friend).

**Example 1 — a friend function of one class:**

```cpp
#include <iostream>
using namespace std;

class Box {
    double width;                              // private member
public:
    Box(double w) : width(w) {}
    friend void printWidth(const Box &b);      // declaration of a friend function
};

void printWidth(const Box &b) {                // not a member: no Box:: and no friend keyword
    cout << "Width = " << b.width << endl;     // can read the private member
}

int main() {
    Box b(10);
    printWidth(b);                             // called like an ordinary function
    return 0;
}
```

Output: `Width = 10`

**Example 2 — one friend function shared by two classes:**

```cpp
#include <iostream>
using namespace std;

class B;                                       // forward declaration

class A {
    int x = 5;
    friend int add(const A &, const B &);      // add() is a friend of A
};

class B {
    int y = 8;
    friend int add(const A &, const B &);      // add() is also a friend of B
};

int add(const A &a, const B &b) {
    return a.x + b.y;                          // uses private data of both classes
}

int main() {
    A a;
    B b;
    cout << "Sum = " << add(a, b) << endl;
    return 0;
}
```

Output: `Sum = 13`

**Friend class:** a friend class is a class whose **member functions can all access** the private and protected members of the class that declares it as a friend, with `friend class ClassName;`.

```cpp
#include <iostream>
using namespace std;

class Engine {
    int horsepower = 150;
    friend class Car;                          // every member function of Car is a friend
};

class Car {
public:
    void show(const Engine &e) {
        cout << "Horsepower = " << e.horsepower << endl;
    }
};

int main() {
    Engine e;
    Car c;
    c.show(e);
    return 0;
}
```

Output: `Horsepower = 150`

**Uses (advantages) of friend functions:**

1. To operate on the private data of **two or more classes** in one function.
2. To overload some **operators** (such as `<<` and `>>` for input and output) where the left operand is not an object of the class.
3. To give a closely related function or class access **without** making the data public or writing many getter functions.

**Disadvantages of friend functions:**

1. They **weaken encapsulation and data hiding**, because outside code can use the private data.
2. They create **tight coupling** between the class and the friend.
3. Friendship is not inherited, so derived classes must declare their own friends.

#### Differences Between Friend Function and Member Function

| Basis | Friend function | Member function |
| --- | --- | --- |
| Membership | Not a member of the class | A member of the class |
| Declaration | Inside the class with `friend` | Inside the class, without `friend` |
| Definition outside the class | `return_type f(…)` — no `ClassName::` | `return_type ClassName::f(…)` |
| Call | Like an ordinary function: `f(obj)` | Through an object: `obj.f()` |
| `this` pointer | Not available | Available |
| Access to members | Through an object passed as an argument | Directly, by name |
| Inheritance | Not inherited | Inherited by derived classes |
| Number of classes | Can be a friend of several classes | Belongs to one class |

## Inheritance {#inheritance}

**Definition:** inheritance is the mechanism by which **one class (the subclass, child or derived class) acquires the attributes and methods of another class (the superclass, parent or base class)**. The subclass can **add** new members and **override** inherited methods. Inheritance represents an **"IS-A" relationship**: a `Dog` *is an* `Animal`.

**Syntax in the three languages:**

1. **C++:** `class Dog : public Animal { … };` — the base class is written after a colon, with an access mode (`public`, `protected` or `private`).
2. **Java:** `class Dog extends Animal { … }` — with the keyword `extends`.
3. **Python:** `class Dog(Animal):` — the parent class is written in parentheses.

### Inheritance in C++

```cpp
#include <iostream>
#include <string>
using namespace std;

class Animal {                                 // base class
protected:
    string name;
public:
    Animal(string n) : name(n) {}
    void eat() { cout << name << " eats food" << endl; }
};

class Dog : public Animal {                    // derived class (public inheritance)
public:
    Dog(string n) : Animal(n) {}               // calls the base-class constructor
    void bark() { cout << name << " barks" << endl; }
};

int main() {
    Dog d("Tommy");
    d.eat();                                   // inherited
    d.bark();                                  // its own
    return 0;
}
```

In C++ the base-class constructor is called in the **initializer list** (`: Animal(n)`), and `protected` members of the base class can be used in the derived class.

**Access modes of inheritance (C++):** the access mode decides how the inherited members can be used in the derived class:

| Member in base class | `public` inheritance | `protected` inheritance | `private` inheritance |
| --- | --- | --- | --- |
| `public` | public | protected | private |
| `protected` | protected | protected | private |
| `private` | not accessible | not accessible | not accessible |

### Inheritance in Java

```java
class Animal {                                 // superclass
    protected String name;

    Animal(String name) {
        this.name = name;
    }

    void eat() {
        System.out.println(name + " eats food");
    }
}

class Dog extends Animal {                     // subclass
    Dog(String name) {
        super(name);                           // calls the superclass constructor
    }

    void bark() {
        System.out.println(name + " barks");
    }
}

public class Main {
    public static void main(String[] args) {
        Dog d = new Dog("Tommy");
        d.eat();                               // inherited
        d.bark();                              // its own
    }
}
```

**The `super` keyword** refers to the superclass: `super(...)` calls the superclass constructor (it must be the first statement of the subclass constructor), and `super.method()` calls the superclass version of an overridden method.

### Inheritance in Python

```python
class Animal:                                  # base (parent) class
    def __init__(self, name):
        self.name = name

    def eat(self):
        print(self.name, "eats food")


class Dog(Animal):                             # derived (child) class
    def __init__(self, name):
        super().__init__(name)                 # calls the parent constructor

    def bark(self):
        print(self.name, "barks")


class Camera:
    def photo(self):
        print("Taking a photo")


class Phone:
    def call(self):
        print("Making a call")


class SmartPhone(Camera, Phone):               # multiple inheritance
    pass


d = Dog("Tommy")
d.eat()                                        # inherited
d.bark()                                       # its own
s = SmartPhone()
s.photo()
s.call()
```

`super().__init__(name)` calls the parent's constructor.

Output of the `Dog` example (all three languages):

```text
Tommy eats food
Tommy barks
```

### Types of Inheritance

Inheritance is of five types:

1. **Single inheritance:** one subclass inherits from one superclass (A → B).
2. **Multilevel inheritance:** a class inherits from a subclass, forming a chain (A → B → C).
3. **Hierarchical inheritance:** several subclasses inherit from one superclass (A → B, A → C).
4. **Multiple inheritance:** one class inherits from **more than one** superclass (A, B → C).
5. **Hybrid inheritance:** a combination of two or more of the above types.

```text
 Single      Multilevel     Hierarchical       Multiple
   A             A               A            A       B
   │             │             ┌─┴─┐           └───┬───┘
   B             B             B   C               C
                 │
                 C
```

| Type | C++ | Java | Python |
| --- | --- | --- | --- |
| Single | Yes | Yes | Yes |
| Multilevel | Yes | Yes | Yes |
| Hierarchical | Yes | Yes | Yes |
| Multiple | Yes, with classes | **Not with classes**; only through interfaces (`implements I1, I2`) | Yes, with classes |
| Hybrid | Yes | Only through interfaces | Yes |

**Multiple inheritance in C++:**

```cpp
#include <iostream>
using namespace std;

class Camera { public: void photo() { cout << "Taking a photo" << endl; } };
class Phone  { public: void call()  { cout << "Making a call" << endl; } };

class SmartPhone : public Camera, public Phone {};   // multiple inheritance

int main() {
    SmartPhone s;
    s.photo();
    s.call();
    return 0;
}
```

**Multiple inheritance in Java (through interfaces):**

```java
interface Camera { void photo(); }
interface Phone  { void call(); }

class SmartPhone implements Camera, Phone {    // a class can implement many interfaces
    public void photo() { System.out.println("Taking a photo"); }
    public void call()  { System.out.println("Making a call"); }
}
```

The Python program above also shows multiple inheritance (`class SmartPhone(Camera, Phone)`). Output in each language:

```text
Taking a photo
Making a call
```

Java does not allow multiple inheritance of classes, to avoid the **diamond problem**: if two parent classes have a method with the same name, it would be unclear which one the child inherits. C++ solves it with **virtual base classes**, and Python with its **method resolution order (MRO)**.

**Advantages of inheritance:**

1. **Code reusability:** common code is written once in the superclass.
2. **Extensibility:** new classes are built from existing ones.
3. **Method overriding** makes **run-time polymorphism** possible.
4. Represents natural **hierarchies** (Animal → Dog, Cat).

## Polymorphism {#polymorphism}

**Definition:** polymorphism (Greek: "many forms") is the ability of the **same function name, method or operator to behave differently** depending on the arguments or on the object that uses it.

### Types of Polymorphism

Polymorphism is of two types:

1. **Compile-time (static) polymorphism** — achieved by **function (method) overloading** and **operator overloading**.
2. **Run-time (dynamic) polymorphism** — achieved by **method overriding** (with **virtual functions** in C++).

#### 1. Compile-Time Polymorphism

In compile-time polymorphism, the function to be called is decided by the **compiler**, from the number, types and order of the arguments. It is also called **static binding** or **early binding**.

**Function (method) overloading:** two or more functions in the same scope have the **same name but different parameter lists**. Changing only the return type is **not** overloading.

**Operator overloading:** an operator, such as `+`, is given a new meaning for objects of a user-defined class.

**C++ (function overloading and operator overloading):**

```cpp
#include <iostream>
using namespace std;

// Function overloading: same name, different parameter lists
int    add(int a, int b)          { return a + b; }
int    add(int a, int b, int c)   { return a + b + c; }
double add(double a, double b)    { return a + b; }

// Operator overloading: + is given a meaning for Complex objects
class Complex {
public:
    double re, im;
    Complex(double r, double i) : re(r), im(i) {}
    Complex operator+(const Complex &c) const {
        return Complex(re + c.re, im + c.im);
    }
};

int main() {
    cout << add(2, 3) << endl;
    cout << add(2, 3, 4) << endl;
    cout << add(2.5, 1.5) << endl;

    Complex c1(2, 3), c2(1, 4);
    Complex c3 = c1 + c2;                      // calls c1.operator+(c2)
    cout << c3.re << " + " << c3.im << "i" << endl;
    return 0;
}
```

Output:

```text
5
9
4
3 + 7i
```

**Java (method overloading):**

```java
class Calculator {
    int add(int a, int b)          { return a + b; }
    int add(int a, int b, int c)   { return a + b + c; }
    double add(double a, double b) { return a + b; }
}

public class Main {
    public static void main(String[] args) {
        Calculator c = new Calculator();
        System.out.println(c.add(2, 3));        // 5
        System.out.println(c.add(2, 3, 4));     // 9
        System.out.println(c.add(2.5, 1.5));    // 4.0
    }
}
```

Java supports method overloading but **not operator overloading** (the only built-in exception is `+`, which also joins strings).

**Python:** Python does **not** support method overloading by parameter list: if a class defines two methods with the same name, the **second definition replaces the first**. The same effect is obtained with **default arguments** or variable arguments (`*args`). Python **does** support **operator overloading** through special methods such as `__add__` (for `+`), `__sub__` (for `-`) and `__eq__` (for `==`). (Python decides everything at run time, so these Python features are grouped with compile-time polymorphism only by analogy with C++ and Java.)

```python
# Compile-time-style polymorphism in Python: operator overloading
class Complex:
    def __init__(self, re, im):
        self.re = re
        self.im = im

    def __add__(self, other):                  # gives + a meaning for Complex objects
        return Complex(self.re + other.re, self.im + other.im)

    def __str__(self):
        return f"{self.re} + {self.im}i"


# Python has no overloading by parameter list; default arguments give the same effect
def add(a, b, c=0):
    return a + b + c


print(add(2, 3), add(2, 3, 4), add(2.5, 1.5))
print(Complex(2, 3) + Complex(1, 4))
```

Output:

```text
5 9 4.0
3 + 7i
```

#### 2. Run-Time Polymorphism

In run-time polymorphism, the method to be called is decided **while the program runs**, from the **actual object**, not from the type of the reference or pointer. It is also called **dynamic binding**, **late binding** or **dynamic method dispatch**, and it needs **inheritance** and **method overriding**.

**Method overriding:** a subclass provides its **own version of a method** that is already defined in its superclass, with the **same name, parameters and return type**.

**C++ (virtual functions):** in C++ a function is overridden polymorphically only if it is declared **`virtual`** in the base class; the call is then made through a **base-class pointer or reference**.

```cpp
#include <iostream>
using namespace std;

class Shape {
public:
    virtual void draw() { cout << "Drawing a shape" << endl; }   // virtual function
    virtual ~Shape() {}
};

class Circle : public Shape {
public:
    void draw() override { cout << "Drawing a circle" << endl; }
};

class Square : public Shape {
public:
    void draw() override { cout << "Drawing a square" << endl; }
};

int main() {
    Shape *s;                                  // base-class pointer
    Circle c;
    Square q;
    s = &c;
    s->draw();                                 // decided at run time: Circle::draw()
    s = &q;
    s->draw();                                 // Square::draw()
    return 0;
}
```

Output:

```text
Drawing a circle
Drawing a square
```

Without the keyword `virtual`, the call `s->draw()` would be decided at compile time from the pointer's type, and both calls would print `Drawing a shape`.

**Virtual function:** a virtual function is a member function declared with **`virtual`** in the base class, which is meant to be **redefined in derived classes**; a call through a base-class pointer or reference runs the version of the **actual object**. A **pure virtual function** (`virtual void draw() = 0;`) has no body and makes the class abstract.

**Java (method overriding):** in Java every non-static, non-final, non-private method can be overridden, so overriding gives run-time polymorphism automatically.

```java
class Shape {
    void draw() { System.out.println("Drawing a shape"); }
}

class Circle extends Shape {
    @Override
    void draw() { System.out.println("Drawing a circle"); }
}

class Square extends Shape {
    @Override
    void draw() { System.out.println("Drawing a square"); }
}

public class Main {
    public static void main(String[] args) {
        Shape s;                 // superclass reference
        s = new Circle();
        s.draw();                // Drawing a circle
        s = new Square();
        s.draw();                // Drawing a square
    }
}
```

**Python (method overriding):** every method can be overridden; the object's own version is always used.

```python
# Run-time polymorphism: method overriding
class Shape:
    def draw(self):
        print("Drawing a shape")


class Circle(Shape):
    def draw(self):                            # overrides Shape.draw()
        print("Drawing a circle")


class Square(Shape):
    def draw(self):
        print("Drawing a square")


for s in (Shape(), Circle(), Square()):
    s.draw()                                   # the object's own draw() is called
```

Output:

```text
Drawing a shape
Drawing a circle
Drawing a square
```

### Differences Between Compile-Time and Run-Time Polymorphism

| Basis | Compile-time polymorphism | Run-time polymorphism |
| --- | --- | --- |
| Other names | Static polymorphism, early binding, static binding | Dynamic polymorphism, late binding, dynamic binding, dynamic method dispatch |
| Decided | At **compile time**, by the compiler | At **run time**, by the actual object (by the JVM in Java) |
| Achieved by | Function (method) overloading and operator overloading | Method overriding (virtual functions in C++) |
| Basis of the decision | Number, types and order of the arguments | The type of the actual object, not of the reference or pointer |
| Inheritance | Not needed | Needed |
| Method signatures | Same name, **different** parameter lists | Same name and **same** parameter list in parent and child |
| Where the methods are | Usually in the same class | In the base class and the derived class |
| Speed | Faster (no decision at run time) | Slightly slower (lookup at run time, through a virtual table in C++) |
| Flexibility | Less flexible | More flexible; new subclasses can be added without changing the calling code |
| C++ example | `add(int, int)` and `add(double, double)`; `operator+` | `virtual void draw()` overridden in `Circle` |
| Java example | Overloaded `add()` methods | Overridden `draw()` called through a `Shape` reference |

### Differences Between Overloading and Overriding

| Basis | Method overloading | Method overriding |
| --- | --- | --- |
| Type of polymorphism | Compile-time (static) | Run-time (dynamic) |
| Where | In the **same class** | In a **subclass** (needs inheritance) |
| Method name | Same | Same |
| Parameters | **Must differ** | **Must be the same** |
| Return type | Can differ | Same (or a subtype) |
| Decided at | Compile time | Run time (by the object) |
| Purpose | Same operation on different inputs | Specialised behaviour in a subclass |
| Access modifier (Java) | Any | Cannot be more restrictive than the parent method's |
| static / final methods (Java) | Can be overloaded | Cannot be overridden |
| Support | C++ and Java (not Python) | C++ (with `virtual`), Java and Python |

**Advantages of polymorphism:**

1. **Flexibility:** one interface works with many types of objects.
2. **Extensibility:** new subclasses can be added without changing the code that uses the superclass.
3. **Readable code:** the same name is used for the same kind of operation.

## References {#references}

**TutorialsPoint**

- [Java – Methods](https://www.tutorialspoint.com/java/java_methods.htm) — accessed 2026-11-01
- [Java – Constructors](https://www.tutorialspoint.com/java/java_constructors.htm) — accessed 2026-11-01
- [Java – Interfaces](https://www.tutorialspoint.com/java/java_interfaces.htm) — accessed 2026-11-01
- [Java – Packages](https://www.tutorialspoint.com/java/java_packages.htm) — accessed 2026-11-01
- [Java – Access Modifiers](https://www.tutorialspoint.com/java/java_access_modifiers.htm) — accessed 2026-11-01
- [C++ Object Oriented](https://www.tutorialspoint.com/cplusplus/cpp_object_oriented.htm) — accessed 2026-11-04
- [C++ Friend Functions](https://www.tutorialspoint.com/cplusplus/cpp_friend_functions.htm) — accessed 2026-11-04 (no `this` pointer, not inherited)
- [Python – OOP Concepts](https://www.tutorialspoint.com/python/python_oops_concepts.htm) — accessed 2026-11-04 (`__init__`, `__del__`, multiple inheritance, operator overloading; its operator-overloading example prints `Vector (7, 8)`, not `Vector(7,8)` as the page states, and its "overloading methods" table actually lists special methods that are overridden)
- [Difference between compile-time polymorphism and runtime polymorphism](https://www.tutorialspoint.com/article/difference-between-compile-time-polymorphism-and-runtime-polymorphism) — accessed 2026-11-04

**GeeksforGeeks**

- [Difference between the Constructors and Methods](https://www.geeksforgeeks.org/java/difference-between-the-constructors-and-methods/) — accessed 2026-11-01
- [Overloading vs Overriding in Java](https://www.geeksforgeeks.org/java/difference-between-method-overloading-and-method-overriding-in-java/) — accessed 2026-11-01
- [Difference Between Abstract Class and Interface in Java](https://www.geeksforgeeks.org/java/difference-between-abstract-class-and-interface-in-java/) — accessed 2026-11-01
- [Introduction of Object Oriented Programming](https://www.geeksforgeeks.org/dsa/introduction-of-object-oriented-programming/) — accessed 2026-11-01
- [Inheritance in Java](https://www.geeksforgeeks.org/java/inheritance-in-java/) — accessed 2026-11-01
- [Polymorphism in Java](https://www.geeksforgeeks.org/java/polymorphism-in-java/) — accessed 2026-11-01
- [Friend Class and Function in C++](https://www.geeksforgeeks.org/cpp/friend-class-function-cpp/) — accessed 2026-11-04 (friendship is not mutual, not inherited and not transitive; advantages and disadvantages)
- [Difference Between Compile Time and Run Time Polymorphism in C++](https://www.geeksforgeeks.org/cpp/compile-time-vs-run-time-polymorphism-difference-in-cpp/) — accessed 2026-11-04
- [Difference between Compile-time and Run-time Polymorphism in Java](https://www.geeksforgeeks.org/java/difference-between-compile-time-and-run-time-polymorphism-in-java/) — accessed 2026-11-04
- [Python OOPs Concepts](https://www.geeksforgeeks.org/python/python-oops-concepts/) — accessed 2026-11-04 (it calls a class "a collection of objects"; a class is a blueprint from which objects are created)

**TpointTech**

- [Difference between Object and Class](https://www.tpointtech.com/difference-between-object-and-class) — accessed 2026-11-04
- [C++ Friend Function](https://www.tpointtech.com/cpp-friend-function) — accessed 2026-11-04 (its friend-class explanation reverses the relationship: the class that **declares** the friend is the one that grants access)
- [C++ Polymorphism](https://www.tpointtech.com/cpp-polymorphism) — accessed 2026-11-04 (compile-time vs run-time table)
- [Python OOPs Concepts](https://www.tpointtech.com/python-oops-concepts) — accessed 2026-11-04 (name mangling, `ABC` and `@abstractmethod`; it says Python achieves polymorphism through method overloading, but Python does not support overloading by parameter list)

**Programiz**

- [Python Object Oriented Programming](https://www.programiz.com/python-programming/object-oriented-programming) — accessed 2026-11-04
- [C++ friend Function and friend Classes](https://www.programiz.com/cpp-programming/friend-function-class) — accessed 2026-11-04
- [C++ Polymorphism](https://www.programiz.com/cpp-programming/polymorphism) — accessed 2026-11-04 (it lists function overriding as run-time polymorphism even in its example called through a derived-class object, which the compiler resolves; overriding is decided at run time only for a `virtual` function called through a base-class pointer or reference)
- [C++ Access Modifiers](https://www.programiz.com/cpp-programming/access-modifiers) — accessed 2026-11-04

**IT Job QnS**

- [Previous Bank Assistant Programmer Questions](https://it.jobqns.com/previous2021-2026-bank-assistant-programmer-qns/) — accessed 2026-11-04 (definition of polymorphism with a C++ function-overloading example; run-time polymorphism through overriding); the site has no pages on friend functions or on class versus object

**Additional sources**

- All C++ examples were compiled with g++ 13 (`-std=c++17`) and all Python examples run with Python 3.12, 2026-11-04; the outputs shown are the real outputs.
