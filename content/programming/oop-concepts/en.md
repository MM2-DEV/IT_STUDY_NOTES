---
description: Object-oriented programming concepts - classes and objects, methods and constructors, interfaces, packages, encapsulation with access modifiers, inheritance and its types, and compile-time and run-time polymorphism, with Java examples.
updated: 2026-11-01
---

**Object-oriented programming (OOP):** OOP is a programming paradigm that organises a program around **objects**, each of which combines **data (attributes)** and the **functions that work on that data (methods)**. Objects are created from **classes**. OOP models real-world things (a student, a bank account, a car) directly, which makes large programs easier to design, reuse and maintain. (Compare with procedural programming in [Programming Paradigms](/topics/programming/programming-languages-and-paradigms#programming-paradigms).)

**Main concepts of OOP:**

1. Class and object
2. **Encapsulation** (and data hiding)
3. **Abstraction**
4. **Inheritance**
5. **Polymorphism**

Encapsulation, abstraction, inheritance and polymorphism are often called the **four pillars of OOP**.

**Abstraction:** showing only the **essential features** of an object and **hiding the implementation details**. For example, a person uses an ATM by inserting a card and choosing options without knowing how it works inside. In Java, abstraction is achieved with **abstract classes** and **interfaces** (see [Interfaces](#interfaces)).

**Advantages of OOP:**

1. **Modularity:** the program is divided into self-contained objects.
2. **Reusability:** existing classes are reused through inheritance.
3. **Data security:** data is hidden inside objects (encapsulation).
4. **Easier maintenance and extension:** new classes can be added with little change to existing code.
5. **Real-world modelling:** objects correspond to real things, so the design is natural to understand.

The examples below are in **Java**, a fully object-oriented language; C++ supports the same concepts.

## Classes and Objects {#classes-and-objects}

**Class:** a class is a **user-defined blueprint (template)** that defines the **attributes (data members, fields)** and **behaviour (methods)** common to all objects of one kind. A class is only a description; it **does not occupy memory** for data until objects are created.

**Object:** an object is an **instance of a class**: a real entity created from the class, with its **own copy of the attributes** (its **state**), that can use the class's methods (its **behaviour**). Every object also has an **identity** that distinguishes it from other objects.

**Example:** `Student` is a class; Rahim and Karim are two objects of the class `Student`, each with its own roll number and name.

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

        s1.display();                  // 1 Rahim
        s2.display();                  // 2 Karim
    }
}
```

1. **`new`** creates an object (allocates its memory) and returns a reference to it.
2. Members are accessed with the **dot operator**: `s1.name`, `s1.display()`.

### Differences Between Class and Object

| Basis | Class | Object |
| --- | --- | --- |
| Meaning | Blueprint (template) | Instance of a class |
| Nature | Logical entity | Real (physical) entity |
| Memory | No memory for data when declared | Memory is allocated when created |
| Declared / created | Declared once with `class` | Created many times with `new` |
| Example | `Student` | `s1` (Rahim), `s2` (Karim) |

## Methods {#methods}

**Definition:** a method is a **function defined inside a class** that describes the **behaviour** of its objects. It is a group of statements that performs one operation, and it is called through an object (or through the class, for `static` methods).

**Parts of a method:**

```java
public int add(int a, int b) {     // modifier, return type, name, parameters
    return a + b;                  // body
}
```

1. **Access modifier** (optional): `public`, `private`, `protected` or none.
2. **Return type**: the type of value returned, or **`void`** if nothing is returned.
3. **Method name** and **parameter list**: together they form the method's **signature**.
4. **Body**: the statements that do the work.

**Types of methods:**

1. **Instance method:** belongs to an object; called through an object (`s1.display()`), and can use the object's fields.
2. **Static (class) method:** declared with **`static`**; belongs to the class, not to any object; called through the class name (`Math.sqrt(16)`) and cannot use instance fields directly. `main()` is static.

**Method overloading:** two or more methods in the same class with the **same name but different parameter lists** (number, types or order of parameters). The correct one is chosen from the arguments (see [Polymorphism](#polymorphism)).

**Parameter passing:** Java passes arguments **by value**; for objects, the value passed is the **reference**, so a method can change the object's fields but not make the caller's variable refer to another object.

### Constructors

**Definition:** a constructor is a **special method that initializes an object** when it is created with `new`.

**Rules:**

1. Its **name is the same as the class name**.
2. It has **no return type**, not even `void`.
3. It is **called automatically** when an object is created.
4. A class can have **several constructors** with different parameters (**constructor overloading**).
5. If no constructor is written, Java supplies a **default constructor** that sets fields to default values (0, `null`, `false`); if any constructor is written, the default one is no longer supplied.

**Types:**

1. **Default constructor:** supplied automatically by the compiler.
2. **No-argument constructor:** written by the programmer, with no parameters.
3. **Parameterized constructor:** takes parameters to give each object its own initial values.

**The `this` keyword** refers to the **current object**; it is used to distinguish fields from parameters with the same name, and `this(...)` calls another constructor of the same class.

```java
class Rectangle {
    double length, width;

    Rectangle() {                          // no-argument constructor
        this(1, 1);                        // calls the other constructor
    }

    Rectangle(double length, double width) {   // parameterized constructor
        this.length = length;              // this.length is the field
        this.width = width;
    }

    double area() {                        // instance method
        return length * width;
    }
}

public class Main {
    public static void main(String[] args) {
        Rectangle r1 = new Rectangle();         // 1 x 1
        Rectangle r2 = new Rectangle(5, 3);     // 5 x 3
        System.out.println(r1.area());          // 1.0
        System.out.println(r2.area());          // 15.0
    }
}
```

### Differences Between Constructor and Method

| Basis | Constructor | Method |
| --- | --- | --- |
| Purpose | Initializes a new object | Performs an operation (behaviour) |
| Name | Same as the class | Any valid name |
| Return type | None | Must have one (or `void`) |
| Call | Automatically, when the object is created | Explicitly, through an object or class |
| Inheritance | Not inherited | Inherited by subclasses |
| Number of executions | Once for each object created | Any number of times |
| Overriding | Can be overloaded but not overridden | Can be overloaded and overridden |
| Modifiers | Cannot be `static`, `final` or `abstract` | Can be `static`, `final` or `abstract` |

## Interfaces {#interfaces}

**Definition:** an interface is a **reference type that contains abstract methods** (methods with no body) and **constants**. It specifies **what** a class must do, **not how**. A class that **implements** an interface must provide the bodies of all its methods. Interfaces are used to achieve **abstraction** and **multiple inheritance** in Java.

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
        System.out.println(s1.area());   // 3.14159
        System.out.println(s2.area());   // 16.0
    }
}
```

**Properties of an interface:**

1. Declared with the keyword **`interface`**; a class uses it with **`implements`**.
2. Its methods are **public and abstract** by default (Java 8 and later also allow **default** and **static** methods with bodies).
3. Its fields are **constants** (`public static final`).
4. An interface **cannot be instantiated** (no objects of an interface) and has **no constructors**.
5. A class can **extend only one class**, but it can **implement many interfaces**: `class C extends B implements I1, I2`. This is how Java provides **multiple inheritance** of types.
6. An interface can **extend other interfaces** (even several).
7. A class that does not implement all the interface's methods must be declared **abstract**.

### Differences Between Abstract Class and Interface

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

**Definition:** a package is a **group of related classes, interfaces and sub-packages** under one name. It works like a **folder**: it organises the classes and gives them a separate **namespace**, so classes with the same name in different packages do not conflict.

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

**Advantages of packages:**

1. **Organise** related classes and interfaces, so they are easy to find and use.
2. **Prevent name conflicts** (two classes named `Date` can exist in different packages).
3. Provide **access protection** (package-level access).
4. Make code **reusable**.

## Encapsulation {#encapsulation}

**Definition:** encapsulation is the **wrapping (binding) of data and the methods that operate on that data into a single unit (a class)**, and **restricting direct access to the data** from outside. The data is made **private** and accessed only through **public methods**, usually **getters** (to read) and **setters** (to change). Hiding the data in this way is called **data hiding**.

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
        System.out.println(acc.getBalance());   // 3000.0
        // acc.balance = 1000000;      // error: balance is private
    }
}
```

**Access modifiers** control the visibility of members:

| Modifier | Same class | Same package | Subclass in another package | Other packages |
| --- | --- | --- | --- | --- |
| `private` | Yes | No | No | No |
| default (no modifier) | Yes | Yes | No | No |
| `protected` | Yes | Yes | Yes | No |
| `public` | Yes | Yes | Yes | Yes |

**Advantages of encapsulation:**

1. **Data security:** data cannot be changed directly or wrongly from outside.
2. **Control:** setters can **check** values before accepting them (for example, rejecting a negative deposit).
3. **Flexibility:** the internal implementation can change without affecting the code that uses the class.
4. **Easier maintenance and testing.**

**Encapsulation vs abstraction:** encapsulation **hides the data** (how the data is stored and protected), while abstraction **hides the implementation complexity** (how a task is done) and shows only what is necessary.

## Inheritance {#inheritance}

**Definition:** inheritance is the mechanism by which **one class (the subclass, child or derived class) acquires the fields and methods of another class (the superclass, parent or base class)**. The subclass can **add** new members and **override** inherited methods. Inheritance represents an **"IS-A" relationship**: a `Dog` *is an* `Animal`. In Java it is written with the keyword **`extends`**.

```java
class Animal {
    String name;
    void eat() {
        System.out.println(name + " eats food");
    }
}

class Dog extends Animal {            // Dog inherits name and eat()
    void bark() {
        System.out.println(name + " barks");
    }
}

public class Main {
    public static void main(String[] args) {
        Dog d = new Dog();
        d.name = "Tommy";
        d.eat();       // inherited: Tommy eats food
        d.bark();      // own method: Tommy barks
    }
}
```

**The `super` keyword** refers to the superclass: `super(...)` calls the superclass constructor (it must be the first statement of the subclass constructor), and `super.method()` calls the superclass version of an overridden method.

### Types of Inheritance

1. **Single inheritance:** one subclass inherits from one superclass (A → B).
2. **Multilevel inheritance:** a class inherits from a subclass, forming a chain (A → B → C).
3. **Hierarchical inheritance:** several subclasses inherit from one superclass (A → B, A → C).
4. **Multiple inheritance:** one class inherits from **more than one** superclass (A, B → C). **Java does not allow this with classes** (a class can extend only one class) but supports it through **interfaces**; C++ supports it with classes.
5. **Hybrid inheritance:** a combination of two or more types (in Java, through classes and interfaces together).

```text
 Single      Multilevel     Hierarchical       Multiple
   A             A               A            A       B
   │             │             ┌─┴─┐           └───┬───┘
   B             B             B   C               C
                 │
                 C
```

**Advantages of inheritance:**

1. **Code reusability:** common code is written once in the superclass.
2. **Extensibility:** new classes are built from existing ones.
3. **Method overriding** makes **run-time polymorphism** possible.
4. Represents natural **hierarchies** (Animal → Dog, Cat).

## Polymorphism {#polymorphism}

**Definition:** polymorphism (Greek: "many forms") is the ability of the **same method name (or interface) to behave differently** depending on the arguments or on the object that calls it. In Java it is achieved through **method overloading** and **method overriding**.

### Types of Polymorphism

**1. Compile-time (static) polymorphism: method overloading.** Several methods in the same class have the **same name but different parameter lists**. The compiler decides which one to call from the arguments, at **compile time**.

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

(Changing only the return type is **not** overloading; the parameter lists must differ.) **Operator overloading** (giving operators new meanings for user-defined types) is another form of compile-time polymorphism; C++ supports it, but Java does not.

**2. Run-time (dynamic) polymorphism: method overriding.** A subclass provides its **own version of a method** that is already defined in its superclass, with the **same name, parameters and return type**. When the method is called through a **superclass reference**, the version that runs is decided at **run time** by the **actual object** (**dynamic method dispatch** or **dynamic binding**).

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
| Access modifier | Any | Cannot be more restrictive than the parent method's |
| static / final methods | Can be overloaded | Cannot be overridden |
| Exceptions | Any exceptions can be declared | Cannot throw broader checked exceptions than the parent method |

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

**GeeksforGeeks**

- [Difference between the Constructors and Methods](https://www.geeksforgeeks.org/java/difference-between-the-constructors-and-methods/) — accessed 2026-11-01
- [Overloading vs Overriding in Java](https://www.geeksforgeeks.org/java/difference-between-method-overloading-and-method-overriding-in-java/) — accessed 2026-11-01
- [Difference Between Abstract Class and Interface in Java](https://www.geeksforgeeks.org/java/difference-between-abstract-class-and-interface-in-java/) — accessed 2026-11-01
- [Introduction of Object Oriented Programming](https://www.geeksforgeeks.org/dsa/introduction-of-object-oriented-programming/) — accessed 2026-11-01
- [Inheritance in Java](https://www.geeksforgeeks.org/java/inheritance-in-java/) — accessed 2026-11-01
- [Polymorphism in Java](https://www.geeksforgeeks.org/java/polymorphism-in-java/) — accessed 2026-11-01
