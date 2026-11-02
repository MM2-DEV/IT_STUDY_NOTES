---
description: Graphics programming in C with the graphics.h (BGI) library - text and graphics modes, the screen coordinate system, initgraph and closegraph, drawing functions for points, lines, rectangles, circles, arcs and ellipses, colours and fill functions, text output, and simple drawing and animation programs.
updated: 2026-11-01
---

### Graphics Programming in C

**Graphics programming** means writing programs that **draw pictures** (points, lines, shapes, text and animations) on the screen. Standard C has no graphics functions; graphics in C is traditionally done with the **`graphics.h`** library, the **Borland Graphics Interface (BGI)** supplied with the **Turbo C/C++** compiler.

**Important:** `graphics.h` is **not part of standard C** and is **not supported by the GCC compiler** by default. It is used with Turbo C, or on modern systems through compatible libraries (for example, *WinBGIm* on Windows or *libgraph*, an implementation of the Turbo C graphics API using SDL, on Linux).

### Text Mode and Graphics Mode

1. **Text mode:** the screen shows only **characters**, in rows and columns (for example, 80 columns × 25 rows). This is the normal mode of a C program.
2. **Graphics mode:** the screen is treated as a grid of **pixels** (picture elements), and any pixel can be set to a colour, so shapes and pictures can be drawn.

A graphics program **switches from text mode to graphics mode** with `initgraph()` and **returns to text mode** with `closegraph()`.

### Screen Coordinate System

1. The screen is a grid of pixels. Each pixel is identified by its coordinates **(x, y)**.
2. The **origin (0, 0) is the upper-left corner** of the screen.
3. **x increases to the right** and **y increases downwards** (unlike the y-axis of mathematics).
4. The lower-right corner is **(getmaxx(), getmaxy())**. In a 640 × 480 mode, x runs from 0 to 639 and y from 0 to 479.

```text
 (0,0) ──────────────► x
   │
   │       • (x, y)
   ▼
   y              (getmaxx(), getmaxy())
```

### Initializing and Closing the Graphics Mode

```c
void initgraph(int *graphdriver, int *graphmode, char *pathtodriver);
void closegraph(void);
```

1. **`graphdriver`:** the graphics driver to use. Setting it to **`DETECT`** (a macro defined in `graphics.h`) makes the system **detect the hardware automatically** and choose the best driver and mode.
2. **`graphmode`:** the graphics mode (resolution); chosen automatically with `DETECT`.
3. **`pathtodriver`:** the folder where the BGI driver files are stored (in Turbo C, for example, `"C:\\TURBOC3\\BGI"`); `""` means the current folder.
4. **`initgraph()`** loads the driver and puts the system into graphics mode. **`closegraph()`** frees the memory used by the graphics system and returns the screen to text mode.

**Structure of a graphics program:**

```c
#include <graphics.h>
#include <conio.h>

int main(void)
{
    int gd = DETECT, gm;                 /* graphics driver and mode */

    initgraph(&gd, &gm, "");             /* 1. switch to graphics mode */

    /* 2. drawing statements go here */
    circle(320, 240, 100);

    getch();                             /* 3. wait for a key press */
    closegraph();                        /* 4. return to text mode */
    return 0;
}
```

(`getch()` from `conio.h` keeps the picture on the screen until a key is pressed.)

### Drawing Functions

| Function | Purpose |
| --- | --- |
| `putpixel(x, y, color)` | Draws **one pixel** at (x, y) in the given colour |
| `getpixel(x, y)` | Returns the colour of the pixel at (x, y) |
| `line(x1, y1, x2, y2)` | Draws a **line** from (x1, y1) to (x2, y2) |
| `rectangle(left, top, right, bottom)` | Draws a **rectangle**, given its upper-left and lower-right corners |
| `bar(left, top, right, bottom)` | Draws a **filled rectangle** (using the current fill style) |
| `circle(x, y, radius)` | Draws a **circle** with centre (x, y) |
| `arc(x, y, stangle, endangle, radius)` | Draws an **arc** of a circle from the start angle to the end angle (in degrees) |
| `ellipse(x, y, stangle, endangle, xradius, yradius)` | Draws an **ellipse** (or an elliptical arc) with centre (x, y) and horizontal and vertical radii; angles 0 to 360 give a full ellipse |
| `outtextxy(x, y, "text")` | Writes **text** starting at (x, y) |
| `cleardevice()` | **Clears** the whole graphics screen |
| `getmaxx()`, `getmaxy()` | Return the **largest x and y** coordinates of the current mode |

Angles are measured **anticlockwise from the 3 o'clock direction**: 0° is to the right, 90° straight up, 180° to the left and 270° straight down.

### Colour and Fill Functions

| Function | Purpose |
| --- | --- |
| `setcolor(color)` | Sets the **drawing colour** for lines, outlines and text |
| `setbkcolor(color)` | Sets the **background colour** |
| `setfillstyle(pattern, color)` | Sets the **fill pattern and colour** used by `bar()` and `floodfill()` (for example, `SOLID_FILL`) |
| `floodfill(x, y, border)` | **Fills** the closed area containing the point (x, y), up to the boundary drawn in the colour `border` |

**Colours** are given by numbers (0 to 15 in the standard 16-colour modes) or by named constants defined in `graphics.h`, for example `BLACK` (0), `BLUE`, `GREEN`, `RED`, `YELLOW` and `WHITE` (15).

### Example 1: Drawing Basic Shapes

```c
#include <graphics.h>
#include <conio.h>

int main(void)
{
    int gd = DETECT, gm;

    initgraph(&gd, &gm, "");

    setcolor(YELLOW);
    line(50, 50, 250, 50);                    /* a horizontal line          */
    rectangle(50, 80, 250, 180);              /* a rectangle                */
    circle(400, 130, 50);                     /* a circle of radius 50      */
    ellipse(400, 300, 0, 360, 100, 50);       /* a full ellipse             */
    arc(150, 300, 0, 180, 60);                /* upper half of a circle     */
    putpixel(320, 400, WHITE);                /* a single point             */
    outtextxy(50, 420, "Basic shapes in C graphics");

    getch();
    closegraph();
    return 0;
}
```

### Example 2: A Simple House with Filled Colours

```c
#include <graphics.h>
#include <conio.h>

int main(void)
{
    int gd = DETECT, gm;

    initgraph(&gd, &gm, "");
    setcolor(WHITE);

    line(100, 200, 200, 100);                 /* left side of the roof  */
    line(200, 100, 300, 200);                 /* right side of the roof */
    line(100, 200, 300, 200);                 /* bottom of the roof     */
    rectangle(100, 200, 300, 350);            /* walls                  */
    rectangle(180, 270, 220, 350);            /* door                   */

    setfillstyle(SOLID_FILL, RED);
    floodfill(200, 150, WHITE);               /* fill the roof red      */
    setfillstyle(SOLID_FILL, BLUE);
    floodfill(120, 300, WHITE);               /* fill the walls blue    */

    getch();
    closegraph();
    return 0;
}
```

### Example 3: Simple Animation (a Moving Circle)

**Animation** is produced by drawing a picture, **pausing** briefly, **erasing** it and drawing it again at a slightly different position; repeated quickly, this looks like motion.

```c
#include <graphics.h>
#include <conio.h>
#include <dos.h>                              /* delay() in Turbo C */

int main(void)
{
    int gd = DETECT, gm, x;

    initgraph(&gd, &gm, "");

    for (x = 50; x <= getmaxx() - 50; x += 10)
    {
        cleardevice();                        /* erase the previous frame */
        circle(x, 200, 40);                   /* draw at the new position */
        delay(100);                           /* wait 100 milliseconds    */
    }

    getch();
    closegraph();
    return 0;
}
```

### Uses of Graphics Programming in C

1. Learning the basics of **computer graphics** (drawing lines, circles and curves with algorithms such as DDA and Bresenham's)
2. Drawing **charts and diagrams**
3. Simple **games and animations**
4. Educational and visualisation programs

## References {#references}

**GeeksforGeeks**

- [How to add "graphics.h" C/C++ library to gcc compiler in Linux](https://www.geeksforgeeks.org/add-graphics-h-c-library-gcc-compiler-linux/) — accessed 2026-11-01
- [C Program to create a House using Graphics](https://www.geeksforgeeks.org/c/c-program-to-create-a-house-using-graphics/) — accessed 2026-11-01
- [Draw a moving car using computer graphics programming in C](https://www.geeksforgeeks.org/dsa/draw-a-moving-car-using-computer-graphics-programming-in-c/) — accessed 2026-11-01
- [putpixel() function in C](https://www.geeksforgeeks.org/c/putpixel-function-c/) — accessed 2026-11-01
- [getmaxx() function in C](https://www.geeksforgeeks.org/c/getmaxx-function-c/) — accessed 2026-11-01
- [Draw ellipse in C graphics](https://www.geeksforgeeks.org/c/draw-ellipse-c-graphics/) — accessed 2026-11-01

**Additional sources**

- [XBGI quick reference (BGI function signatures and coordinate system)](https://cdn.hackaday.io/files/337591444345056/xbgi-quickref.pdf) — accessed 2026-11-01
