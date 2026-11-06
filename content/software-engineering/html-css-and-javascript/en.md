---
description: HTML, CSS and JavaScript - the three core web technologies - HTML document structure, elements, tags, attributes, lists, tables, forms and HTML5; CSS syntax, ways of adding CSS, selectors and the box model; and JavaScript features, variables, data types, operators, functions, the DOM and events.
updated: 2026-11-04
---

### The Three Core Web Technologies

A web page is built with three languages, each with its own job:

1. **HTML (HyperText Markup Language)** — defines the **structure and content** of the page (headings, paragraphs, images, links, tables, forms).
2. **CSS (Cascading Style Sheets)** — defines the **presentation (appearance)** of the page (colours, fonts, spacing, layout).
3. **JavaScript** — defines the **behaviour (interactivity)** of the page (responding to clicks, validating forms, changing content without reloading).

A browser downloads the three files from a web server, builds the page from the HTML, styles it with the CSS and runs the JavaScript.

### HTML

#### Definition of HTML

HTML (HyperText Markup Language) is the standard **markup language** used to create and structure web pages.

It describes the content of a page with **elements**, marked by **tags**, which tell the browser how to display the content. HTML is not a programming language: it has no logic, variables or loops.

1. **HyperText** — text that contains links (hyperlinks) to other pages.
2. **Markup language** — a language that marks up (annotates) text with tags to give it structure.

HTML was created by **Tim Berners-Lee** at CERN in **1991**. Its versions have been standardized by the **W3C** (World Wide Web Consortium); **HTML5** became a W3C Recommendation in **2014**, and HTML is now maintained as a "living standard" by the **WHATWG**.

#### Basic Structure of an HTML Document

```html
<!DOCTYPE html>
<html>
<head>
    <title>My First Page</title>
</head>
<body>
    <h1>Welcome</h1>
    <p>This is my first web page.</p>
</body>
</html>
```

1. **`<!DOCTYPE html>`** — declares that the document is an HTML5 document (it is a declaration, not a tag).
2. **`<html>`** — the **root element** that contains the whole page.
3. **`<head>`** — contains information about the page (metadata) that is not displayed: the title, character set, links to CSS files and scripts.
4. **`<title>`** — the title shown in the browser tab.
5. **`<body>`** — contains all the **visible content** of the page.

#### Tags, Elements and Attributes

1. **Tag** — a keyword in angle brackets, such as `<p>`. Most tags come in pairs: an **opening tag** `<p>` and a **closing tag** `</p>`.
2. **Element** — the opening tag, the content and the closing tag together: `<p>Hello</p>`.
3. **Attribute** — extra information about an element, written in the opening tag as a **name="value"** pair: `<a href="https://example.com">`. Common attributes are `id` (a unique name), `class` (a group name for styling), `style` (inline CSS), `title` (a tooltip), `src`, `href`, `alt`, `width` and `height`.

Tags are of two kinds:

1. **Paired (container) tags** — have an opening and a closing tag and contain content: `<p>…</p>`, `<h1>…</h1>`, `<a>…</a>`.
2. **Empty (void, unpaired) tags** — have no content and no closing tag: `<br>` (line break), `<hr>` (horizontal rule), `<img>` (image), `<input>`, `<meta>`, `<link>`.

HTML tags are **not case-sensitive**, but lowercase is recommended. A **comment** is written as `<!-- comment -->` and is not displayed.

#### Common HTML Elements

| Element | Purpose | Example |
| --- | --- | --- |
| `<h1>` to `<h6>` | Headings, from the most important (`h1`) to the least (`h6`) | `<h1>Title</h1>` |
| `<p>` | Paragraph | `<p>Text</p>` |
| `<br>` | Line break | `Line 1<br>Line 2` |
| `<hr>` | Horizontal line | `<hr>` |
| `<b>`, `<strong>` | Bold text (`strong` = important) | `<strong>Note</strong>` |
| `<i>`, `<em>` | Italic text (`em` = emphasis) | `<em>word</em>` |
| `<u>` | Underlined text | `<u>text</u>` |
| `<sup>`, `<sub>` | Superscript, subscript | `x<sup>2</sup>`, `H<sub>2</sub>O` |
| `<a>` | Hyperlink | `<a href="page.html">Go</a>` |
| `<img>` | Image | `<img src="photo.jpg" alt="Photo">` |
| `<div>` | Block-level container | `<div>…</div>` |
| `<span>` | Inline container | `<span>…</span>` |

#### Links and Images

```html
<a href="https://www.example.com" target="_blank">Visit Example</a>
<img src="logo.png" alt="Company logo" width="200" height="100">
```

1. `href` gives the address of the linked page; `target="_blank"` opens it in a new tab.
2. `src` gives the image file; `alt` gives alternative text, shown if the image cannot load and read by screen readers.

#### Lists

HTML has three types of lists:

1. **Ordered list (`<ol>`)** — numbered items.
2. **Unordered list (`<ul>`)** — bulleted items.
3. **Description (definition) list (`<dl>`)** — terms (`<dt>`) with their descriptions (`<dd>`).

```html
<ol>
    <li>Install</li>
    <li>Run</li>
</ol>
<ul>
    <li>HTML</li>
    <li>CSS</li>
</ul>
<dl>
    <dt>CPU</dt>
    <dd>Central Processing Unit</dd>
</dl>
```

#### Tables

A table is created with `<table>`; `<tr>` is a row, `<th>` a header cell and `<td>` a data cell. The attributes `colspan` and `rowspan` make a cell span several columns or rows.

```html
<table border="1">
    <tr>
        <th>Roll</th>
        <th>Name</th>
    </tr>
    <tr>
        <td>1</td>
        <td>Rahim</td>
    </tr>
</table>
```

#### Forms

A form collects input from the user and sends it to a server. The `action` attribute gives the address that receives the data, and `method` gives the HTTP method (`get` or `post`).

```html
<form action="/register" method="post">
    <label for="name">Name:</label>
    <input type="text" id="name" name="name" required>
    <input type="email" name="email" placeholder="Email">
    <input type="password" name="password">
    <input type="radio" name="gender" value="male"> Male
    <input type="checkbox" name="agree"> I agree
    <select name="city">
        <option>Dhaka</option>
        <option>Chattogram</option>
    </select>
    <textarea name="comment"></textarea>
    <input type="submit" value="Register">
</form>
```

Common `<input>` types are `text`, `password`, `email`, `number`, `date`, `radio` (one choice), `checkbox` (several choices), `file`, `submit` and `reset`; `<select>` makes a drop-down list and `<textarea>` a multi-line text box.

#### Block-Level and Inline Elements

| Basis | Block-level element | Inline element |
| --- | --- | --- |
| Starts on a new line | Yes | No; it stays in the line of text |
| Width | Takes the full available width | Takes only as much width as its content |
| Can contain | Usually block and inline elements (`<p>` can contain only inline content) | Only text and other inline elements |
| Width and height | Can be set | Cannot be set (except replaced elements such as `<img>` and `<input>`) |
| Examples | `<div>`, `<p>`, `<h1>`–`<h6>`, `<ul>`, `<ol>`, `<table>`, `<form>` | `<span>`, `<a>`, `<img>`, `<b>`, `<i>`, `<strong>`, `<input>` |

#### HTML5

HTML5 is the latest version of HTML.

Its main new features are:

1. **Semantic elements** that describe the meaning of the content: `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>`, `<figure>`.
2. **Audio and video** without plug-ins: `<audio>` and `<video>`.
3. **Graphics**: `<canvas>` (drawing with JavaScript) and SVG.
4. **New form input types**: `email`, `date`, `number`, `range`, `color`, `url`, `search`, and attributes such as `placeholder` and `required`.
5. **Web storage** (`localStorage`, `sessionStorage`), geolocation and offline support.
6. A simple doctype: `<!DOCTYPE html>`.

### CSS

#### Definition of CSS

CSS (Cascading Style Sheets) is a **style sheet language** used to describe the **presentation** of an HTML document: its colours, fonts, spacing, layout and appearance on different devices.

It separates the content (HTML) from the design (CSS), so one style sheet can control the look of many pages.

"Cascading" means that when several style rules apply to the same element, the browser chooses one according to their **importance, specificity and order**: the more specific rule wins, and of two equally specific rules, the later one wins.

CSS was proposed by **Håkon Wium Lie** in 1994; CSS1 became a W3C Recommendation in 1996, followed by CSS2 (1998) and CSS3, which is divided into modules.

#### CSS Syntax

A CSS rule has a **selector** and a **declaration block**:

```css
h1 {
    color: blue;
    font-size: 24px;
}
```

1. **Selector** (`h1`) — the HTML element(s) to style.
2. **Declaration block** (`{ … }`) — one or more declarations, separated by semicolons.
3. **Declaration** (`color: blue;`) — a **property** and its **value**, separated by a colon.

#### Ways of Adding CSS

CSS can be added to HTML in three ways:

1. **Inline CSS** — in the `style` attribute of one element; it affects only that element.

   ```html
   <p style="color: red;">Red text</p>
   ```

2. **Internal (embedded) CSS** — in a `<style>` element inside `<head>`; it affects that one page.

   ```html
   <style>
       p { color: green; }
   </style>
   ```

3. **External CSS** — in a separate `.css` file, linked with `<link>` in `<head>`; one file can style the whole website.

   ```html
   <link rel="stylesheet" href="style.css">
   ```

**Priority:** an inline style has the highest priority. Between internal and external style sheets, if the rules have the same specificity, the one that comes **later** in the document wins (an internal `<style>` usually comes after the `<link>`, so it usually wins). A declaration marked `!important` overrides the others.

#### CSS Selectors

The main types of CSS selectors are:

1. **Element (type) selector** — selects all elements of a type: `p { … }`.
2. **ID selector** — selects the one element with a given `id`, written with `#`: `#header { … }`.
3. **Class selector** — selects all elements with a given `class`, written with `.`: `.note { … }`.
4. **Universal selector** — selects all elements: `* { … }`.
5. **Group selector** — applies one style to several selectors, separated by commas: `h1, h2, p { … }`.
6. **Descendant selector** — selects elements inside another element: `div p { … }`.
7. **Attribute selector** — selects elements with an attribute: `input[type="text"] { … }`.
8. **Pseudo-class selector** — selects elements in a state: `a:hover { … }`, `li:first-child { … }`.

**Specificity** (from highest to lowest): inline style, ID selector, class / attribute / pseudo-class selector, element selector.

#### CSS Box Model

Every HTML element is treated as a **rectangular box** made of four parts, from the inside out:

1. **Content** — the text or image, with its `width` and `height`.
2. **Padding** — transparent space between the content and the border.
3. **Border** — a line around the padding and content.
4. **Margin** — transparent space outside the border, separating the element from other elements.

![CSS box model: content inside padding, inside the border, inside the margin](/diagrams/software-engineering/box-model.svg)

By default (`box-sizing: content-box`), `width` and `height` apply only to the content, so:

> **Total width = border-left + padding-left + width + padding-right + border-right**
>
> **Total height = border-top + padding-top + height + padding-bottom + border-bottom**

(The margin adds space around the box but is not part of its size.)

**Example:** an element has `width: 400px; height: 80px; padding: 15px; border: 10px solid;`.

1. Total width = 10 + 15 + 400 + 15 + 10 = **450 px**.
2. Total height = 10 + 15 + 80 + 15 + 10 = **130 px**.

With `box-sizing: border-box`, the `width` and `height` include the padding and border, so the box would be exactly 400 × 80 px.

#### Advantages of CSS

1. It separates content from presentation, so pages are easier to maintain.
2. One style sheet can style many pages, and a change in one place updates the whole site.
3. Pages load faster, because the style sheet is downloaded once and cached.
4. It supports responsive design for different screen sizes (media queries) and modern layouts (Flexbox and Grid).

### JavaScript

#### Definition of JavaScript

JavaScript is a lightweight, **interpreted** (just-in-time compiled), **dynamically typed** programming language that makes web pages **interactive**.

It runs mainly in the web browser (client side), and also on servers with **Node.js** (2009).

JavaScript was created by **Brendan Eich** at **Netscape** in **1995** (in about ten days); it was first called **Mocha**, then **LiveScript**, and then JavaScript. It was standardized by Ecma International as **ECMAScript** (ECMA-262) in 1997; **ES6 (ECMAScript 2015)** was a major revision. Despite the name, JavaScript is **not related to Java**.

#### Features of JavaScript

1. **Interpreted (just-in-time compiled)** — runs directly in the browser without a separate compilation step.
2. **Dynamically typed** — the type of a variable is decided at run time and can change.
3. **Client-side** — runs in the user's browser, so it can respond immediately without contacting the server.
4. **Event-driven** — reacts to user actions such as clicks, key presses and form submissions.
5. **Object-based (prototype-based)** — supports objects and inheritance through prototypes.
6. **Single-threaded but asynchronous** — runs one task at a time, but can wait for data (for example, from a server) without freezing the page.
7. **Platform-independent** — runs in any modern browser.

#### Ways of Adding JavaScript

1. **Internal** — inside a `<script>` element in the HTML page (in `<head>` or, usually, at the end of `<body>`).
2. **External** — in a separate `.js` file: `<script src="app.js"></script>`.
3. **Inline** — in an event attribute: `<button onclick="alert('Hi')">`.

#### Variables: var, let and const

```javascript
function test() {
    if (true) {
        var a = 1;      // function-scoped
        let b = 2;      // block-scoped
        const c = 3;    // block-scoped, cannot be reassigned
    }
    console.log(a);             // 1
    console.log(typeof b);      // undefined (b is not visible here)
}
test();
const PI = 3.14;
try { PI = 3; } catch (e) { console.log(e.name); }   // TypeError
```

| Basis | `var` | `let` | `const` |
| --- | --- | --- | --- |
| Scope | Function | Block `{ }` | Block `{ }` |
| Reassignment | Allowed | Allowed | Not allowed |
| Redeclaration in the same scope | Allowed | Not allowed | Not allowed |
| Must be initialized when declared | No | No | Yes |
| Introduced in | Original JavaScript | ES6 (2015) | ES6 (2015) |

`let` and `const` are preferred; `const` is used for values that will not be reassigned. Variable names must start with a letter, `_` or `$`, are case-sensitive and cannot be keywords.

#### Data Types

JavaScript has eight data types:

**Primitive types** (one simple value):

1. **Number** — integers and decimals: `25`, `3.14`.
2. **String** — text in quotes: `"Dhaka"`.
3. **Boolean** — `true` or `false`.
4. **Undefined** — a variable that has been declared but not given a value.
5. **Null** — an intentional "no value".
6. **BigInt** — very large integers: `10n`.
7. **Symbol** — a unique identifier.

**Non-primitive (reference) type:**

8. **Object** — a collection of key–value pairs: `{name: "Rahim", age: 20}`. Arrays and functions are kinds of objects.

```javascript
console.log(typeof "Dhaka");        // string
console.log(typeof 25);             // number
console.log(typeof true);           // boolean
console.log(typeof null);           // object (a known quirk of the language)
console.log(typeof [1, 2, 3]);      // object
console.log(typeof function () {}); // function
```

#### Operators: == and ===

1. **`==` (loose equality)** — compares values **after converting** them to the same type.
2. **`===` (strict equality)** — compares **both value and type**, without conversion.

```javascript
console.log(5 == "5");    // true  (the string is converted to a number)
console.log(5 === "5");   // false (different types)
console.log(0 == false);  // true
console.log(0 === false); // false
```

`===` (and `!==`) is recommended, to avoid unexpected results of type conversion.

#### Functions

```javascript
function add(a, b) {            // function declaration
    return a + b;
}
const square = n => n * n;      // arrow function (ES6)
console.log(add(2, 3));         // 5
console.log(square(4));         // 16
```

#### DOM and Events

The **DOM (Document Object Model)** is a tree-shaped representation of the HTML page that the browser creates; JavaScript uses it to **read and change** the content, structure and style of the page.

An **event** is an action such as a click or a key press, and an **event handler (listener)** is a function that runs when the event occurs.

```html
<p id="msg">Hello</p>
<button id="btn">Click me</button>
<script>
    document.getElementById("btn").addEventListener("click", function () {
        document.getElementById("msg").textContent = "Button clicked!";
    });
</script>
```

When the button is clicked, the text of the paragraph changes to "Button clicked!", without reloading the page. Common events are `click`, `submit`, `change`, `keydown`, `mouseover` and `load`.

#### Uses of JavaScript

1. Validating form input in the browser before it is sent to the server.
2. Changing page content dynamically (menus, sliders, pop-ups).
3. Loading data from a server without reloading the page (AJAX, `fetch`).
4. Building web applications with frameworks such as React, Angular and Vue.
5. Server-side programming with Node.js, and mobile and desktop applications.

#### Java vs JavaScript

| Basis | Java | JavaScript |
| --- | --- | --- |
| Developed by | James Gosling, Sun Microsystems (1995) | Brendan Eich, Netscape (1995) |
| Type | Compiled to bytecode, run on the JVM | Interpreted (just-in-time compiled) by a JavaScript engine |
| Typing | Statically typed | Dynamically typed |
| OOP model | Class-based | Prototype-based (classes added in ES6 as syntax) |
| Runs in | JVM (desktop, server, Android) | Browser and Node.js |
| Use | General-purpose applications | Mainly web pages and web applications |

#### HTML vs CSS vs JavaScript

| Basis | HTML | CSS | JavaScript |
| --- | --- | --- | --- |
| Type | Markup language | Style sheet language | Programming (scripting) language |
| Role | Structure and content | Presentation and layout | Behaviour and interactivity |
| File extension | `.html` | `.css` | `.js` |
| Example | `<p>Hello</p>` | `p { color: red; }` | `alert("Hello");` |

## References {#references}

**TutorialsPoint**

- [HTML – Overview](https://www.tutorialspoint.com/html/html_overview.htm) — accessed 2026-11-04 (definition, document structure, tags, elements and attributes)
- [CSS – Inclusion](https://www.tutorialspoint.com/css/css_inclusion.htm) — accessed 2026-11-04 (inline, internal, external and `@import`; it gives the priority as inline, then internal, then external — strictly, between internal and external rules of equal specificity the later one wins, as explained above)
- [JavaScript – Overview](https://www.tutorialspoint.com/javascript/javascript_overview.htm) — accessed 2026-11-04 (definition, history from Mocha and LiveScript to ECMAScript, client-side JavaScript, advantages and limitations)

**GeeksforGeeks**

- [HTML Basics](https://www.geeksforgeeks.org/html/html-basics/) — accessed 2026-11-04 (document structure, paired and empty tags, comments)
- [CSS Introduction](https://www.geeksforgeeks.org/css/css-introduction/) — accessed 2026-11-04 (ways of adding CSS, selectors, cascading, advantages)
- [Introduction to JavaScript](https://www.geeksforgeeks.org/javascript/introduction-to-javascript/) — accessed 2026-11-04 (features and uses)

**TpointTech**

- [HTML Tutorial](https://www.tpointtech.com/html-tutorial) — accessed 2026-11-04 (definition, features, Tim Berners-Lee, 1991)
- [CSS Selector](https://www.tpointtech.com/css-selector) — accessed 2026-11-04 (element, id, class, universal and group selectors)
- [JavaScript Tutorial](https://www.tpointtech.com/javascript-tutorial) — accessed 2026-11-04 (the index page only; its article text could not be read)

**Programiz**

- [HTML Basics](https://www.programiz.com/html/basics) — accessed 2026-11-04 (elements, tags and attributes; the DOM tree)
- [CSS Box Model](https://www.programiz.com/css/box-model) — accessed 2026-11-04 (the box model and the 450 × 130 px example)
- [JavaScript Variables and Constants](https://www.programiz.com/javascript/variables-constants) — accessed 2026-11-04
- [JavaScript Data Types](https://www.programiz.com/javascript/data-types) — accessed 2026-11-04
- [JavaScript Comparison and Logical Operators](https://www.programiz.com/javascript/comparison-logical) — accessed 2026-11-04 (`==` and `===`)

**Additional sources**

- [MDN Web Docs](https://developer.mozilla.org/) — HTML elements, CSS cascade and specificity, JavaScript `var`, `let` and `const`
- The JavaScript examples were run with Node.js on 2026-11-04; the outputs shown are the real outputs.
