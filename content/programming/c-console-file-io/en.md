---
description: C console input and output (standard streams, printf and scanf with format specifiers, getchar, putchar, fgets and puts) and file input and output (FILE pointer, fopen modes, fclose, character, string, formatted and binary file functions, random access with fseek, ftell and rewind).
updated: 2026-11-01
---

## Console I/O {#console-i-o}

**Console I/O** means reading input from the **keyboard** and writing output to the **screen (monitor)**.

C has no input/output statements of its own; all I/O is done with **library functions** declared in **`stdio.h`**.

### Standard Streams

C treats every device as a **file** (a stream of bytes). Three streams are opened automatically when a program starts:

| Stream | Meaning | Default device |
| --- | --- | --- |
| `stdin` | Standard input | Keyboard |
| `stdout` | Standard output | Screen |
| `stderr` | Standard error (error messages) | Screen |

### Types of Console I/O Functions

Console I/O functions are of two types:

1. **Formatted I/O:** read or write data in a specified format: `printf()`, `scanf()`.
2. **Unformatted I/O:** read or write characters or strings without format: `getchar()`, `putchar()`, `fgets()`, `puts()`.

### printf(): Formatted Output

```text
 printf("format string", argument1, argument2, ...);
```

The format string contains ordinary text, **escape sequences** (`\n`, `\t`) and **format specifiers** (`%d`, `%f` …), one for each argument.

**Field width and precision:** `%w.pf`, where **w** is the minimum field width and **p** is the number of digits after the decimal point. A **minus sign** left-aligns the value.

```c
#include <stdio.h>

int main(void)
{
    int roll = 7;
    float gpa = 4.5;
    char grade = 'A';

    printf("Roll: %d, GPA: %.2f, Grade: %c\n", roll, gpa, grade);
    printf("[%5d]\n", roll);       /* width 5, right-aligned */
    printf("[%-5d]\n", roll);      /* width 5, left-aligned  */
    printf("[%8.3f]\n", 3.14159);  /* width 8, 3 decimals    */
    printf("[%s]\n", "Dhaka");
    return 0;
}
```

Output:

```text
Roll: 7, GPA: 4.50, Grade: A
[    7]
[7    ]
[   3.142]
[Dhaka]
```

`printf()` returns the **number of characters printed**.

### scanf(): Formatted Input

```text
 scanf("format string", &variable1, &variable2, ...);
```

1. The **address operator `&`** must be placed before each variable (except arrays and strings, whose names are already addresses).
2. `scanf("%s", s)` reads only **one word**: it stops at a space, tab or newline.
3. `scanf()` returns the **number of values successfully read and assigned**, or **`EOF`** if input fails before anything is read; checking this value detects wrong input.

```c
#include <stdio.h>

int main(void)
{
    int a, b;

    printf("Enter two numbers: ");
    if (scanf("%d %d", &a, &b) == 2)
        printf("Sum = %d\n", a + b);
    else
        printf("Invalid input\n");
    return 0;
}
```

For the input `12 30`, the output is `Sum = 42`.

### Unformatted Console I/O Functions

| Function | Purpose |
| --- | --- |
| `getchar()` | Reads **one character** from the keyboard; returns it as an `int` (or `EOF`) |
| `putchar(c)` | Writes **one character** to the screen |
| `fgets(s, n, stdin)` | Reads a **line** (with spaces), at most n − 1 characters, safely |
| `puts(s)` | Writes a **string** followed by a newline |
| `gets(s)` | Reads a line with no size limit; **unsafe, removed in C11**; use `fgets()` instead |

`getch()` and `getche()` (read a key without waiting for Enter, without or with echo) come from the non-standard `conio.h` header of old DOS/Windows compilers such as Turbo C; they are not part of standard C.

```c
#include <stdio.h>
#include <ctype.h>

int main(void)
{
    int c;

    printf("Type a word: ");
    while ((c = getchar()) != '\n' && c != EOF)
        putchar(toupper(c));       /* echo each character in capitals */
    putchar('\n');
    return 0;
}
```

For the input `dhaka`, the output is `DHAKA`.

### Formatted vs Unformatted I/O

| Basis | Formatted I/O | Unformatted I/O |
| --- | --- | --- |
| Functions | `printf()`, `scanf()` | `getchar()`, `putchar()`, `fgets()`, `puts()` |
| Format specifiers | Used | Not used |
| Data types | All types (int, float, char, string) | Characters and strings only |
| Control of layout | Field width, precision, alignment (the user decides the format) | None |
| Ease of use | More convenient for storing and showing data | Less convenient |
| Other examples | `sprintf()`, `sscanf()` (format to and from a string) | `getch()`, `getche()` (from `conio.h`) |

## File I/O {#file-i-o}

**File:** a **named collection of data stored permanently on secondary storage** (such as a disk). Data held in variables is lost when a program ends; **files keep data permanently**, so it can be used again later and shared between programs.

**Types of files:**

1. **Text file:** stores data as **readable characters**; each line ends with a newline. Example: `.txt`, `.c`. It can be opened in a text editor.
2. **Binary file:** stores data in the **same binary form as in memory** (raw bytes). Example: `.dat`, `.exe`, `.jpg`. It is smaller and faster to read and write, but not human-readable.

### Steps of File Handling

1. **Declare a file pointer:** `FILE *fp;` (`FILE` is a structure defined in `stdio.h` that holds information about an open file).
2. **Open the file** with `fopen()`.
3. **Read from or write to** the file.
4. **Close the file** with `fclose()`.

### Opening and Closing a File

```text
 FILE *fopen(const char *filename, const char *mode);
 int fclose(FILE *fp);
```

`fopen()` returns a **file pointer**, or **`NULL` if the file cannot be opened** (for example, if a file opened for reading does not exist), so the result must always be checked. `fclose()` writes any buffered data, closes the file and returns 0 on success.

**File opening modes:**

| Mode | Meaning | If the file exists | If the file does not exist |
| --- | --- | --- | --- |
| `"r"` | Read only | Opened from the beginning | `fopen()` returns NULL |
| `"w"` | Write only | **Contents erased** (truncated) | Created |
| `"a"` | Append (write at the end) | New data added at the end | Created |
| `"r+"` | Read and write | Opened from the beginning | NULL |
| `"w+"` | Read and write | Contents erased | Created |
| `"a+"` | Read and append | Reading from the start; writing only at the end | Created |

For **binary files**, `b` is added: `"rb"`, `"wb"`, `"ab"`, `"rb+"`, `"wb+"`, `"ab+"`.

### File I/O Functions

| Type | Write | Read |
| --- | --- | --- |
| Character | `fputc(c, fp)` | `fgetc(fp)` (returns `EOF` at the end) |
| String | `fputs(s, fp)` | `fgets(s, n, fp)` (returns NULL at the end) |
| Formatted | `fprintf(fp, format, …)` | `fscanf(fp, format, …)` |
| Binary (blocks) | `fwrite(ptr, size, count, fp)` | `fread(ptr, size, count, fp)` |

**EOF** is a constant (defined in `stdio.h`) returned by the reading functions at the **end of the file** (or on an error). `feof(fp)` returns non-zero once the end of the file has been reached.

**Example 1: writing to and reading from a text file**

```c
#include <stdio.h>

int main(void)
{
    FILE *fp;
    char line[100];

    fp = fopen("students.txt", "w");          /* create / erase and write */
    if (fp == NULL)
    {
        printf("Cannot open file\n");
        return 1;
    }
    fprintf(fp, "%d %s %.1f\n", 1, "Rahim", 78.5);
    fprintf(fp, "%d %s %.1f\n", 2, "Karim", 85.0);
    fclose(fp);

    fp = fopen("students.txt", "r");          /* open again for reading */
    if (fp == NULL)
        return 1;
    while (fgets(line, sizeof line, fp) != NULL)
        printf("%s", line);
    fclose(fp);
    return 0;
}
```

Output (the contents of `students.txt`):

```text
1 Rahim 78.5
2 Karim 85.0
```

**Example 2: counting the characters of a file with fgetc()**

```c
#include <stdio.h>

int main(void)
{
    FILE *fp = fopen("students.txt", "r");
    int c, count = 0;

    if (fp == NULL)
        return 1;
    while ((c = fgetc(fp)) != EOF)    /* read until the end of the file */
        count++;
    fclose(fp);
    printf("Characters = %d\n", count);
    return 0;
}
```

For the file written in Example 1, the output is `Characters = 26` (13 characters on each line, including the newline).

**Example 3: binary file I/O with a structure**

```c
#include <stdio.h>

struct student
{
    int   roll;
    float marks;
};

int main(void)
{
    struct student out[2] = { {1, 78.5}, {2, 85.0} }, in[2];
    FILE *fp = fopen("students.dat", "wb");

    if (fp == NULL)
        return 1;
    fwrite(out, sizeof(struct student), 2, fp);   /* write 2 records */
    fclose(fp);

    fp = fopen("students.dat", "rb");
    if (fp == NULL)
        return 1;
    fread(in, sizeof(struct student), 2, fp);     /* read them back */
    fclose(fp);

    printf("%d %.1f\n%d %.1f\n", in[0].roll, in[0].marks, in[1].roll, in[1].marks);
    return 0;
}
```

Output:

```text
1 78.5
2 85.0
```

### Random Access in Files

Normally a file is read **sequentially** (from the beginning). These functions move the **file position** so that any part of the file can be read or written directly:

| Function | Purpose |
| --- | --- |
| `fseek(fp, offset, origin)` | Moves the position by `offset` bytes from `origin`: **`SEEK_SET`** (beginning), **`SEEK_CUR`** (current position) or **`SEEK_END`** (end of the file). Returns 0 on success |
| `ftell(fp)` | Returns the **current position** (in bytes from the beginning) |
| `rewind(fp)` | Moves the position back to the **beginning** of the file |

**Example:** `fseek(fp, 0, SEEK_END); size = ftell(fp);` gives the size of a file in bytes. To read only the second record of `students.dat`: `fseek(fp, 1 * sizeof(struct student), SEEK_SET);` and then `fread(…, 1, fp);`.

**Other file functions:** `remove("name")` deletes a file, and `rename("old", "new")` renames it.

### Text File vs Binary File

| Basis | Text file | Binary file |
| --- | --- | --- |
| Storage form | Readable characters | Raw bytes, as in memory |
| Readable in an editor | Yes | No |
| Size | Usually larger (numbers stored as digits) | Usually smaller |
| Speed | Slower (conversion needed) | Faster |
| Functions | `fprintf`, `fscanf`, `fputs`, `fgets`, `fputc`, `fgetc` | `fwrite`, `fread` |
| Opening mode | `"r"`, `"w"`, `"a"` (the default) | `"rb"`, `"wb"`, `"ab"` (with the `b` flag) |
| Space for numbers | One byte per digit (a 6-digit number takes 6 bytes) | The type's own size (an `int` takes 4 bytes) |
| Newline handling | The newline may be converted (for example, to carriage return + line feed on Windows) | No conversion |
| Finding and fixing errors | Easy (contents are visible) | Hard |
| Examples | `.txt`, `.c`, `.csv` | `.dat`, `.exe`, `.jpg` |

## References {#references}

**GeeksforGeeks**

- [Formatted and Unformatted Input/Output in C](https://www.geeksforgeeks.org/c/formatted-and-unformatted-input-output-functions-in-c-with-examples/) — accessed 2026-11-01
- [Difference Between C++ Text File and Binary File](https://www.geeksforgeeks.org/cpp/difference-between-cpp-text-file-and-binary-file/) — accessed 2026-11-01

**TutorialsPoint**

- [C – Input and Output](https://www.tutorialspoint.com/cprogramming/c_input_output.htm) — accessed 2026-11-01
- [C – File I/O](https://www.tutorialspoint.com/cprogramming/c_file_io.htm) — accessed 2026-11-01

**Additional sources**

- [fseek](https://en.cppreference.com/w/c/io/fseek) — cppreference.com, accessed 2026-11-01
- [scanf, fscanf, sscanf](https://en.cppreference.com/w/c/io/fscanf) — cppreference.com, accessed 2026-11-01
- [gets, gets_s](https://en.cppreference.com/w/c/io/gets) — cppreference.com, accessed 2026-11-01
