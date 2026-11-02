---
description: Computational geometry - the cross product and the orientation of three points, line-segment intersection, convex hulls with Graham's scan and Jarvis's march, and the closest pair of points by divide and conquer, with examples, a C program and complexities.
updated: 2026-11-02
---

### Introduction

**Computational geometry** is the branch of computer science that studies **algorithms for solving geometric problems** — problems stated in terms of points, lines, line segments, polygons and other objects in the plane or in space.

**Applications:**

1. **Computer graphics** and **computer-aided design / manufacturing (CAD/CAM)**
2. **Robotics** (motion planning, visibility)
3. **Geographic information systems (GIS)** (location search, route planning)
4. **Integrated circuit design** (geometric design and checking of chips)
5. **Computer vision** (3-D reconstruction) and mesh generation for engineering analysis

The input is usually a set of points given by their coordinates, such as p = (x, y).

**Main problem areas of computational geometry:**

1. **Intersection** — do line segments or shapes intersect, and where?
2. **Convex hull** — the smallest convex polygon enclosing a set of points.
3. **Proximity** — closest pair of points, nearest neighbour.
4. **Point location and geometric searching** — in which region of a subdivision does a point lie?
5. **Triangulation** of polygons (and Delaunay triangulations).
6. **Voronoi diagrams** — dividing the plane into regions closest to each of a set of sites.

The basic problems below are the ones most often studied.

### 1. Cross Product and Orientation of Three Points

The **orientation** of an ordered triple of points (p₁, p₂, p₃) tells whether going from p₁ to p₂ to p₃ makes a **left turn (counterclockwise)**, a **right turn (clockwise)**, or goes **straight (collinear)**. It is found from the **cross product**, which uses only multiplication and subtraction (no division, so vertical lines cause no problem):

```text
val = (y2 − y1)(x3 − x2) − (x2 − x1)(y3 − y2)

val = 0  →  collinear
val > 0  →  clockwise (right turn)
val < 0  →  counterclockwise (left turn)
```

(This compares the slopes of p₁p₂ and p₂p₃. The equivalent cross product (p₂ − p₁) × (p₃ − p₁) = (x2 − x1)(y3 − y1) − (y2 − y1)(x3 − x1) has the **opposite sign convention**: positive means counterclockwise.)

**Examples:**

1. p₁ = (0, 0), p₂ = (4, 4), p₃ = (1, 2): val = 4 × (1 − 4) − 4 × (2 − 4) = −12 + 8 = **−4 → counterclockwise**.
2. p₁ = (0, 0), p₂ = (4, 4), p₃ = (1, 1): val = 4 × (−3) − 4 × (−3) = **0 → collinear**.

Orientation takes **O(1)** time and is the building block of segment intersection and convex-hull algorithms.

### 2. Line-Segment Intersection

**Problem:** do the segments p₁q₁ and p₂q₂ intersect?

Compute four orientations:

1. o1 = orientation(p₁, q₁, p₂), o2 = orientation(p₁, q₁, q₂)
2. o3 = orientation(p₂, q₂, p₁), o4 = orientation(p₂, q₂, q₁)

**General case:** the segments intersect if **o1 ≠ o2 and o3 ≠ o4** — that is, p₂ and q₂ lie on **opposite sides** of the line through p₁q₁, and p₁ and q₁ lie on opposite sides of the line through p₂q₂ (the segments **straddle** each other).

**Special (collinear) cases:** they also intersect if some orientation is 0 and that point **lies on the other segment** (for example, o1 = 0 and p₂ lies on p₁q₁). A collinear point q lies on segment pr if its x lies between x(p) and x(r) and its y lies between y(p) and y(r).

```c
#include <stdio.h>

typedef struct { int x, y; } Point;

int orientation(Point p, Point q, Point r)
{
    long val = (long)(q.y - p.y) * (r.x - q.x) - (long)(q.x - p.x) * (r.y - q.y);
    if (val == 0) return 0;              /* collinear */
    return (val > 0) ? 1 : 2;            /* 1 = clockwise, 2 = counterclockwise */
}

int onSegment(Point p, Point q, Point r)  /* q on segment pr? (p, q, r collinear) */
{
    return q.x <= (p.x > r.x ? p.x : r.x) && q.x >= (p.x < r.x ? p.x : r.x) &&
           q.y <= (p.y > r.y ? p.y : r.y) && q.y >= (p.y < r.y ? p.y : r.y);
}

int intersect(Point p1, Point q1, Point p2, Point q2)
{
    int o1 = orientation(p1, q1, p2), o2 = orientation(p1, q1, q2);
    int o3 = orientation(p2, q2, p1), o4 = orientation(p2, q2, q1);
    if (o1 != o2 && o3 != o4) return 1;                   /* general case */
    if (o1 == 0 && onSegment(p1, p2, q1)) return 1;       /* special cases */
    if (o2 == 0 && onSegment(p1, q2, q1)) return 1;
    if (o3 == 0 && onSegment(p2, p1, q2)) return 1;
    if (o4 == 0 && onSegment(p2, q1, q2)) return 1;
    return 0;
}

int main(void)
{
    Point a = {1, 1}, b = {10, 1}, c = {1, 2}, d = {10, 2};
    printf("%s\n", intersect(a, b, c, d) ? "Yes" : "No");     /* parallel: No */
    Point e = {10, 0}, f = {0, 10}, g = {0, 0}, h = {10, 10};
    printf("%s\n", intersect(e, f, g, h) ? "Yes" : "No");     /* crossing: Yes */
    return 0;
}
```

Output:

```text
No
Yes
```

The test takes **O(1)** time.

**Many segments:** testing every pair of n segments takes **O(n²)**. The **sweep-line** method moves an imaginary vertical line from left to right across the plane, keeping the segments it currently crosses in a balanced search tree and testing only neighbouring segments; it reports all k intersections in **O((n + k) log n)** time.

### 3. Convex Hull

The **convex hull** of a set of points is the **smallest convex polygon that contains all the points**. It can be imagined as a **rubber band stretched around nails** at the points: when released, it touches only the outermost points, which are the **vertices of the hull**.

#### Graham's Scan

1. Find the point with the **lowest y-coordinate** (the leftmost one if there is a tie); it is always on the hull. Call it the **anchor** p₀.
2. **Sort** the other points by their **polar angle** around p₀ (for equal angles, by distance).
3. Process the points in this order using a **stack**: push the first points; for each next point, **pop** the top of the stack **while the last two stack points and the new point do not make a left (counterclockwise) turn**; then push the new point.
4. At the end, the stack holds the hull vertices in counterclockwise order.

**Complexity:** **O(n log n)** (dominated by the sort; the stack pass is O(n), because each point is pushed and popped at most once).

#### Jarvis's March (Gift Wrapping)

1. Start from the **leftmost point**, which is on the hull.
2. From the current hull point p, choose the next point q such that **all other points are on the left of the line p → q** (check every point r with the orientation test).
3. Move to q and repeat until the starting point is reached again.

**Complexity:** **O(n × h)**, where h is the number of hull vertices; in the worst case (all points on the hull) it is **O(n²)**. It is efficient when the hull has few vertices.

**Example:** points (0, 0), (1, −4), (−1, −5), (−5, −3), (−3, −1), (−1, −3), (−2, −2), (−1, −1), (−2, −1), (−1, 1). The convex hull has the vertices **(−1, −5), (1, −4), (0, 0), (−1, 1), (−5, −3)**. The point (−3, −1) lies exactly on the hull edge from (−5, −3) to (−1, 1), so it is not a vertex.

#### Monotone Chain (Andrew's Algorithm)

1. **Sort** the points by x-coordinate (and by y when x is equal).
2. Build the **lower hull**: scan from left to right, and **pop** the last point while the last two points and the new point do **not** make a counterclockwise (left) turn.
3. Build the **upper hull** in the same way, scanning from right to left.
4. Join the lower and upper hulls (dropping the repeated end points).

**Complexity:** **O(n log n)** (the sort), and O(n) for the two scans.

**Example:** points (0, 3), (2, 2), (1, 1), (2, 1), (3, 0), (0, 0), (3, 3) → hull **(0, 0), (3, 0), (3, 3), (0, 3)**; the points (1, 1), (2, 1) and (2, 2) are inside.

### 4. Closest Pair of Points

**Problem:** among n points in the plane, find the **two points with the smallest Euclidean distance** between them, where the distance between (x₁, y₁) and (x₂, y₂) is √((x₂ − x₁)² + (y₂ − y₁)²).

**Brute force:** compute the distance of every pair: n(n − 1)/2 pairs → **O(n²)**.

**Divide and conquer:**

1. **Sort** the points by x-coordinate.
2. **Divide** them by a vertical line into a left half and a right half.
3. **Conquer:** find the smallest distances d_L and d_R in the two halves recursively (with 2 or 3 points, use brute force). Let **d = min(d_L, d_R)**.
4. **Combine:** a closer pair can only have **one point in each half**, within distance d of the dividing line. Collect the points in this **strip of width 2d**, sort them by y-coordinate, and compare each point only with the next points whose y-difference is less than d — **at most 7** of them, because only a limited number of points at mutual distance ≥ d fit in a d × 2d rectangle.
5. The answer is the smaller of d and the best distance found in the strip.

The recurrence is **T(n) = 2T(n/2) + O(n)** (with the points kept sorted by y), which gives **O(n log n)**.

**Example:** points (2, 3), (12, 30), (40, 50), (5, 1), (12, 10), (3, 4): the closest pair is **(2, 3) and (3, 4)**, distance **√2 ≈ 1.414**.

### Summary

| Problem | Method | Time |
| --- | --- | --- |
| Orientation of three points | Cross product | O(1) |
| Do two segments intersect? | Four orientation tests | O(1) |
| Convex hull | Graham's scan | O(n log n) |
| Convex hull | Jarvis's march | O(n h), worst O(n²) |
| Convex hull | Monotone chain | O(n log n) |
| All intersections of n segments | Sweep line | O((n + k) log n) |
| Closest pair of points | Brute force | O(n²) |
| Closest pair of points | Divide and conquer | O(n log n) |

## References {#references}

**GeeksforGeeks**

- [Orientation of 3 Ordered Points](https://www.geeksforgeeks.org/dsa/orientation-3-ordered-points/) — accessed 2026-11-01
- [Check if Two Given Line Segments Intersect](https://www.geeksforgeeks.org/dsa/check-if-two-given-line-segments-intersect/) — accessed 2026-11-01
- [Convex Hull using Graham Scan](https://www.geeksforgeeks.org/dsa/convex-hull-using-graham-scan/) — accessed 2026-11-01
- [Convex Hull using Jarvis' Algorithm or Wrapping](https://www.geeksforgeeks.org/dsa/convex-hull-using-jarvis-algorithm-or-wrapping/) — accessed 2026-11-01
- [Closest Pair of Points using Divide and Conquer](https://www.geeksforgeeks.org/dsa/closest-pair-of-points-using-divide-and-conquer-algorithm/) — accessed 2026-11-01

**TutorialsPoint**

- [Convex Hull Monotone Chain Algorithm in C++](https://www.tutorialspoint.com/article/convex-hull-monotone-chain-algorithm-in-cplusplus) — accessed 2026-11-02

**TpointTech**

- [Computational Geometry](https://www.tpointtech.com/computational-geometry) — accessed 2026-11-02

**Additional sources**

- [Computational geometry](https://en.wikipedia.org/wiki/Computational_geometry) — Wikipedia (definition and application areas; not given by the reference websites) — accessed 2026-11-01
