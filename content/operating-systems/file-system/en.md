---
description: File system - file management (file concept, attributes, operations and types), file system structure, file organization and access methods, blocking and buffering, file descriptors, file and directory structures, the directory tree, blocks and fragments, inodes, the UNIX file structure, the file control block, space allocation and free-space management, and the tree-structured file system, with worked examples.
updated: 2026-11-03
---

## File Management {#file-management}

### File

> **A file is a named collection of related information stored on secondary storage, such as a disk, tape or optical disk. It is the smallest unit of storage that a user works with: data can be saved on secondary storage only inside a file.**

A file may contain programs (source or object) or data (numeric, alphabetic, alphanumeric or binary). Its meaning is defined by its creator.

**File management** is the part of the OS (the **file system**) that creates, stores, organizes, names, protects and retrieves files, and hides the details of the storage devices from the user.

### Functions of File Management

1. Creating and deleting files and directories.
2. Providing operations to read, write and manipulate files and directories.
3. Mapping files onto secondary storage (allocating disk space).
4. Keeping track of free space.
5. Protecting files (access control) and backing them up.

### File Attributes

1. **Name:** the human-readable name.
2. **Identifier:** a unique number (tag) that identifies the file inside the file system.
3. **Type:** needed by systems that support different file types.
4. **Location:** a pointer to the device and the location of the file on it.
5. **Size:** the current size (in bytes, words or blocks), and possibly the maximum size.
6. **Protection:** access-control information — who can read, write or execute.
7. **Time, date and user identification:** for creation, last modification and last use.

Some systems add flags: read-only, hidden, system, archive, ASCII/binary, temporary and lock.

### File Operations

1. **Create:** find space for the file and make a directory entry.
2. **Write:** write data at the current write pointer.
3. **Read:** read data from the current read pointer.
4. **Reposition (seek):** move the current-file-position pointer.
5. **Delete:** release the file's space and remove its directory entry.
6. **Truncate:** erase the contents but keep the attributes.
7. **Open** and **close**, and also **append** and **rename**.

### File Types

A common technique is to include the type in the name as an **extension**:

| File type | Usual extensions | Function |
| --- | --- | --- |
| Executable | exe, com, bin | Ready-to-run machine-language program |
| Object | obj, o | Compiled, not linked |
| Source code | c, cpp, java, py | Source code in various languages |
| Batch | bat, sh | Commands for the command interpreter |
| Text | txt, doc | Textual data, documents |
| Library | lib, a, so, dll | Libraries of routines |
| Archive | zip, tar, rar | Related files grouped (and compressed) into one |
| Multimedia | mp3, mp4, jpg, avi | Audio, video or image data |

In UNIX, the file **types** are:

1. **Ordinary (regular) files:** user data, text and programs.
2. **Directory files:** lists of file names and their inode numbers.
3. **Special (device) files:** **character special** files (terminals, printers — data one character at a time) and **block special** files (disks — data in blocks).
4. Also **pipes (FIFOs)**, **sockets** and **symbolic links**.

## File System Structure {#file-system-structure}

### Layered File System

A file system is usually built in **layers**; each layer uses the services of the layer below:

1. **Application programs:** the user's programs, which request file operations.
2. **Logical file system:** manages **metadata** (all the information about a file except its data). It manages the directory structure and keeps a **File Control Block (FCB)** for each file; it also handles protection.
3. **File-organization module:** knows about files and their **logical blocks**, translates logical block addresses into **physical block addresses**, and manages **free space**.
4. **Basic file system:** issues generic commands to the device driver to read and write physical blocks (for example, "drive 1, cylinder 73, track 2, sector 10"); manages memory **buffers and caches**.
5. **I/O control:** the **device drivers** and **interrupt handlers** that transfer data between main memory and the disk.
6. **Devices:** the physical storage hardware (hard disks, SSDs).

![The six layers of a file system from application programs to devices](/diagrams/operating-systems/file-system-layers.svg)

Layering reduces duplication of code (the I/O control and basic file system can be used by several file systems), but adds overhead.

### On-Disk Structures

1. **Boot control block** (per volume): the information needed to boot the OS from that volume — the **boot block** in UNIX, the **partition boot sector** in NTFS.
2. **Volume control block** (per volume): details of the volume, such as the number of blocks, block size, free-block count and pointers, and free-FCB count — the **superblock** in UNIX, stored in the **master file table** in NTFS.
3. **Directory structure:** organizes the files (file names with their inode numbers in UNIX).
4. **Per-file FCB:** details about each file (the **inode** in UNIX).

### In-Memory Structures

1. **Mount table:** information about each mounted volume.
2. **Directory-structure cache:** recently accessed directories.
3. **System-wide open-file table:** a copy of the FCB of every open file.
4. **Per-process open-file table:** pointers to the entries in the system-wide table, for the files opened by that process.

### Common File Systems

| File system | Used by | Notes |
| --- | --- | --- |
| FAT (FAT12, FAT16, FAT32) | MS-DOS, older Windows, USB drives | Simple; File Allocation Table; no permissions or journaling |
| NTFS | Windows | Permissions, encryption, compression, journaling |
| exFAT | Flash drives, SD cards | For large removable storage |
| ext2, ext3, ext4 | Linux | Inode-based; ext3 and ext4 have journaling |
| HFS+, APFS | macOS | APFS is optimized for SSDs |

## File Organization {#file-organization}

**File organization** is the logical arrangement of the records of a file, which determines how the records can be accessed. The main organizations are:

1. **Pile (heap):** records are stored in order of arrival, with no structure; finding a record needs an exhaustive search.
2. **Sequential file:** records have a fixed format and are stored in order of a **key** field. Efficient for processing all records in order (batch processing), but finding or inserting a single record is slow.
3. **Indexed sequential file:** a sequential file plus an **index** on the key (and an overflow area); the index gives fast access to a record, while sequential processing is still possible.
4. **Indexed file:** several indexes (on different fields), with no sequential order; used where the access pattern is unpredictable.
5. **Direct (hashed) file:** a hash function on the key gives the block address of the record directly; very fast access to a single record by key.

### File Access Methods

1. **Sequential access:** the information is processed **in order**, one record after another; a read moves the file pointer forward. The simplest and most common method (used by editors and compilers); based on the tape model.
2. **Direct (random or relative) access:** the file is a numbered sequence of fixed-length records (blocks); any record can be read or written **directly** by its number, in any order — based on the disk model; used for databases.
3. **Indexed sequential access:** an **index** holds pointers to blocks; the index is searched first, and the pointer is then used to access the file directly. Large files can have a multi-level index.

| Basis | Sequential access | Direct access | Indexed sequential access |
| --- | --- | --- | --- |
| Order of access | In order only | Any order | Through the index, or in order |
| Model | Tape | Disk | Disk |
| Speed for one record | Slow | Fast | Fast |
| Example | Compiler reading source | Database, airline reservations | Large files with a key index |

## Blocking and Buffering {#blocking-and-buffering}

### Blocking

Records are the **logical** units of a file, but the disk transfers data in **physical blocks**. **Blocking** is grouping **logical records** into **physical blocks** for I/O.

> **Blocking factor (bfr) = ⌊Block size B ÷ Record size R⌋** (records per block)
>
> **Number of blocks needed = ⌈Number of records r ÷ bfr⌉**
>
> **Unused space per block = B − bfr × R**

**Example:** block size 1,024 bytes, record size 100 bytes, 1,000 records.

1. bfr = ⌊1024 ÷ 100⌋ = **10 records per block**.
2. Unused space per block = 1024 − 10 × 100 = **24 bytes**.
3. Blocks needed = ⌈1000 ÷ 10⌉ = **100 blocks**.

#### Methods (Types) of Blocking

Blocking is of three types:

1. **Fixed blocking:** fixed-length records; an integral number of records per block; unused space at the end of each block (internal fragmentation).
2. **Variable-length spanned blocking:** variable-length records packed into blocks with no unused space; a record may **span** two blocks (continued with a pointer).
3. **Variable-length unspanned blocking:** variable-length records that do not span blocks; space is wasted when the next record does not fit.

Larger blocks mean fewer I/O operations, but more wasted space and more buffer memory.

### Buffering

> **A buffer is an area of main memory that holds data temporarily while it is transferred between two devices, or between a device and an application.**

**Reasons for buffering:**

1. To cope with the **speed mismatch** between the producer and the consumer of data (for example, a fast disk and a slow printer).
2. To adapt between devices with **different transfer sizes**.
3. To support **copy semantics** — the application can continue while its data is written.
4. To **overlap I/O with computation**.

#### Types of Buffering

Buffering is of three types:

1. **Single buffering:** the OS gives one system buffer for an I/O request; while the process works on one block, the next block is read into the buffer.
2. **Double buffering (buffer swapping):** two buffers — one is filled by the device while the process empties (uses) the other; then they swap.
3. **Circular buffering:** more than two buffers used in a ring, for bursts of I/O; the producer fills buffer i while the consumer empties earlier ones.

**Time per block** (T = time to read a block from the device, C = computation time per block, M = time to move a block from the system buffer to user space):

> **No buffering: T + C** · **Single buffering: max(C, T) + M** · **Double buffering: max(C, T)**

**Example:** 10 blocks, T = 10 ms, C = 8 ms, M = 1 ms.

1. No buffering: 10 × (10 + 8) = **180 ms**.
2. Single buffering: 10 × (max(8, 10) + 1) = 10 × 11 = **110 ms**.
3. Double buffering: 10 × max(8, 10) = 10 × 10 = **100 ms**.

| Type | Advantages | Disadvantages |
| --- | --- | --- |
| Single | Simple; some overlap of I/O and processing | Limited overlap; the process often waits |
| Double | I/O and processing proceed in parallel | Twice the memory; more complex |
| Circular | Handles bursts and continuous streams | Fixed size; complex pointer logic |

## File Descriptors {#file-descriptors}

### Definition

> **A file descriptor is a small non-negative integer that a process uses to identify an open file. It is returned by the `open()` system call and passed to `read()`, `write()` and `close()`.**

### Standard File Descriptors

Every UNIX process starts with three open file descriptors:

| Descriptor | Name | Default device |
| --- | --- | --- |
| **0** | Standard input (stdin) | Keyboard |
| **1** | Standard output (stdout) | Screen |
| **2** | Standard error (stderr) | Screen |

### How File Descriptors Work

1. Each process has a **file-descriptor table** (the per-process open-file table); the descriptor is an index into it.
2. Each entry points to an entry in the **system-wide open-file table**, which holds the **current file offset**, the access mode and a pointer to the file's **inode** (FCB) in memory.
3. `open()` returns the **lowest unused** descriptor (usually 3 for the first file opened).

| System call | Purpose | Return value |
| --- | --- | --- |
| `open(path, flags)` | Opens (or creates) a file | The new file descriptor, or −1 on error |
| `read(fd, buf, n)` | Reads up to n bytes | Number of bytes read; 0 at end of file; −1 on error |
| `write(fd, buf, n)` | Writes n bytes | Number of bytes written; −1 on error |
| `close(fd)` | Releases the descriptor | 0 on success; −1 on error |
| `dup(fd)` / `dup2(fd, newfd)` | Duplicates a descriptor (used for I/O redirection) | The new descriptor |

**File descriptor vs file pointer:** a file descriptor is a low-level integer used by system calls; a **file pointer** (`FILE *` in C) is a higher-level structure of the standard I/O library (`fopen()`, `fprintf()`), which contains a file descriptor and a buffer.

## File and Directory Structures {#file-and-directory-structures}

### File Structure

A file can be structured as:

1. **Byte sequence:** an unstructured sequence of bytes; the OS does not care about the contents (UNIX, Windows).
2. **Record sequence:** a sequence of fixed-length records, each with an internal structure.
3. **Tree:** a tree of records, sorted on a key field, for fast search by key.

Text files are characters organized into lines; source files are sequences of procedures and functions; object files are sequences of bytes organized into blocks that the linker and loader understand.

### Directory

> **A directory is a special file that lists the files stored under it. For each file, it keeps the file's name and either its attributes or a pointer to its FCB (inode).**

**Operations on a directory:** search for a file, create a file, delete a file, list a directory, rename a file, and traverse the file system.

### Directory Structures

**1. Single-level directory:** all files are in **one directory**, shared by all users.

![Single-level directory containing all files](/diagrams/operating-systems/directory-single-level.svg)

- **Advantage:** simple to implement; fast search for a few files.
- **Disadvantages:** all file names must be **unique** (naming problem); no grouping of files; not suitable for many users.

**2. Two-level directory:** a **Master File Directory (MFD)** has one entry per user, pointing to that user's **User File Directory (UFD)**.

![Two-level directory: a master file directory pointing to user file directories](/diagrams/operating-systems/directory-two-level.svg)

- **Advantages:** users can use the same file names; isolation of users; efficient search.
- **Disadvantages:** users cannot easily share files; no grouping within a user's directory.

**3. Tree-structured directory:** a tree of arbitrary height; each directory can contain files and **subdirectories** (see [Tree-Structured File System](#tree-structured-file-system)).

- **Advantages:** grouping of related files; efficient search; same names allowed in different directories.
- **Disadvantage:** files cannot be shared directly between directories.

**4. Acyclic-graph directory:** a tree that also allows a file or subdirectory to appear in **more than one directory** (shared), using **links**, but with **no cycles**.

![Acyclic-graph directory in which a file is shared by two directories](/diagrams/operating-systems/directory-acyclic.svg)

- **Advantages:** sharing of files without duplication; multiple paths to a file.
- **Disadvantages:** a file has several names (aliases); deletion is difficult — dangling pointers must be avoided (reference counts or deleting the links).

**5. General-graph directory:** links are allowed freely, so **cycles** can form.

- **Advantage:** the most flexible.
- **Disadvantages:** searching can loop forever; a garbage-collection scheme is needed to reclaim space, because reference counts may never become 0 in a cycle.

| Structure | Same file names for different users | Grouping | Sharing | Cycles |
| --- | --- | --- | --- | --- |
| Single-level | No | No | — | No |
| Two-level | Yes | No (per user only) | Difficult | No |
| Tree | Yes | Yes | No | No |
| Acyclic graph | Yes | Yes | Yes (links) | No |
| General graph | Yes | Yes | Yes | Yes |

## Directory Tree {#directory-tree}

In UNIX and Linux all files and directories form a **single directory tree** that starts at the **root directory**, written `/`. Other disks and devices are **mounted** at directories in this tree, so there are no drive letters.

![Tree-structured directory from the root with bin, home and etc](/diagrams/operating-systems/directory-tree.svg)

### Standard Directories (UNIX/Linux)

| Directory | Contents |
| --- | --- |
| `/` | The root of the whole tree |
| `/bin` | Essential user commands (`ls`, `cp`) |
| `/sbin` | System administration commands |
| `/boot` | Files needed to boot (the kernel) |
| `/dev` | Device files (disks, terminals) |
| `/etc` | System-wide configuration files |
| `/home` | Home directories of the users |
| `/root` | Home directory of the superuser |
| `/lib` | Shared libraries and kernel modules |
| `/tmp` | Temporary files |
| `/usr` | User programs, libraries and documentation (`/usr/bin`, `/usr/lib`) |
| `/var` | Variable data: logs (`/var/log`), mail, spool |
| `/mnt`, `/media` | Mount points for other file systems and removable media |
| `/proc` | A virtual file system with information about processes |

### Path Names

1. **Absolute path name:** starts from the **root** and gives the full path — for example, `/home/ali/notes/os.txt`.
2. **Relative path name:** starts from the **current (working) directory** — for example, if the current directory is `/home/ali`, then `notes/os.txt` refers to the same file.
3. Special names: `.` is the current directory, `..` is the parent directory, and `~` is the user's home directory.

In Windows, each drive has its own tree (for example, `C:\Users\Ali\Documents`), and `\` is the separator.

## Blocks and Fragments {#blocks-and-fragments}

### Block

> **A block is the unit in which disk space is allocated and data is transferred between the disk and memory. It is made up of one or more disk sectors (a sector is usually 512 bytes).**

The **block size** is a trade-off:

1. **Large blocks** → fewer blocks per file, fewer disk accesses, faster sequential transfer, smaller allocation tables — but **more internal fragmentation** (on average half a block is wasted at the end of every file).
2. **Small blocks** → less wasted space — but more blocks per file, more seeks and larger allocation tables.

### Fragments (UNIX Fast File System)

The **BSD UNIX Fast File System (FFS)** solved this trade-off with **blocks and fragments**:

1. Disk space is allocated in large **blocks** (for example, 4,096 or 8,192 bytes) for speed.
2. Each block can be divided into **2, 4 or 8 fragments**; each fragment is separately addressable. The smallest fragment is limited by the disk sector size (usually 512 bytes).
3. A file is stored as zero or more **full blocks** plus, for its last part, one or more **fragments** of a partially used block — so small files and file tails do not waste a whole block.
4. As a file grows, its fragments may be copied into a larger fragment or a full block.

**Example:** block size 4,096 bytes, fragment size 1,024 bytes, file size 18,000 bytes.

1. Full blocks: ⌊18,000 ÷ 4,096⌋ = **4 blocks** (16,384 bytes).
2. Remaining 18,000 − 16,384 = 1,616 bytes → ⌈1,616 ÷ 1,024⌉ = **2 fragments** (2,048 bytes).
3. Space used = 16,384 + 2,048 = 18,432 bytes → waste = **432 bytes**.
4. With full blocks only, the file would need 5 blocks = 20,480 bytes → waste = **2,480 bytes**.

## Inodes {#inodes}

### Definition

> **An inode (index node) is the File Control Block used by UNIX-like file systems. It stores all the information about a file except its name and its data.**

Each file has exactly one inode, identified by its **inode number**. The **directory** maps file **names** to inode numbers; the inode then gives everything else.

### Contents of an Inode

1. File **type** (regular, directory, special, link).
2. **Permissions** (read, write, execute for owner, group and others).
3. **Owner** (user ID) and **group** ID.
4. File **size** in bytes.
5. **Timestamps:** last access, last modification of the data, last change of the inode.
6. **Link count:** the number of directory entries (hard links) that refer to the inode.
7. **Pointers to the data blocks**: direct, single indirect, double indirect and triple indirect.

The inode does **not** contain the file name.

### Block Pointers in an Inode (Combined Scheme)

A typical inode (as in ext2/ext3) has **15 pointers**:

1. **12 direct pointers:** each points directly to a data block — enough for small files.
2. **1 single indirect pointer:** points to a block that contains pointers to data blocks.
3. **1 double indirect pointer:** points to a block of pointers to single-indirect blocks.
4. **1 triple indirect pointer:** points to a block of pointers to double-indirect blocks.

![Inode with 12 direct pointers and single, double and triple indirect pointers](/diagrams/operating-systems/inode.svg)

### Maximum File Size

> **Pointers per block (p) = Block size ÷ Size of a block address**
>
> **Maximum file size = (number of direct pointers + p + p² + p³) × Block size**

**Example:** block size = 4 KB, block address = 4 bytes, 12 direct pointers.

1. p = 4096 ÷ 4 = **1,024** pointers per block.
2. Direct: 12 × 4 KB = **48 KB**.
3. Single indirect: 1,024 × 4 KB = **4 MB**.
4. Double indirect: 1,024² × 4 KB = **4 GB**.
5. Triple indirect: 1,024³ × 4 KB = **4 TB**.
6. Maximum file size = 48 KB + 4 MB + 4 GB + 4 TB ≈ **4 TB**.

(With 1 KB blocks, 4-byte addresses and 10 direct pointers, p = 256 and the maximum is (10 + 256 + 256² + 256³) × 1 KB ≈ **16 GB**.)

### Inode Facts

1. The number of inodes is **fixed** when the file system is created, so a disk can run out of inodes even when it has free space.
2. A **hard link** is another directory entry for the same inode (the link count increases); a **soft (symbolic) link** is a separate file that contains the path name of the target.
3. Commands: `ls -i` shows inode numbers, `stat` shows the inode contents, and `df -i` shows inode usage.

## UNIX File Structure {#unix-file-structure}

### Layout of a UNIX File System on Disk

![UNIX disk layout: boot block, superblock, inode list and data blocks](/diagrams/operating-systems/unix-disk-layout.svg)

1. **Boot block:** the first block; contains the bootstrap code used to load the OS.
2. **Superblock:** describes the file system — its size, the number of inodes, the number of free blocks and free inodes, the free-block list and the block size. It is so important that copies are kept.
3. **Inode list (inode table):** the array of inodes, one per file.
4. **Data blocks:** the contents of files and directories (and indirect blocks).

### How UNIX Finds a File

To open `/home/ali/os.txt`:

1. Start at the **root directory's inode** (a known inode number).
2. Read the root directory's data blocks and find the entry `home` → its inode number.
3. Read the `home` directory and find `ali` → its inode number.
4. Read the `ali` directory and find `os.txt` → its inode number.
5. Read the inode of `os.txt` to get its attributes and the addresses of its data blocks.

### Features of the UNIX File System

1. **Hierarchical** (tree-structured) with a single root `/`.
2. **Everything is a file** — devices, directories, pipes and sockets are all accessed through the file interface.
3. A file is an unstructured **sequence of bytes**.
4. **Permissions** for owner, group and others (read `r`, write `w`, execute `x`) — for example `rwxr-xr--`.
5. **Mounting** of other file systems at any directory.
6. **Links** (hard and symbolic) let a file have several names.

The first character of `ls -l` shows the file type: `-` regular file, `d` directory, `c` character special file, `b` block special file, `p` named pipe, `s` socket, `l` symbolic link.

## File Control Block (FCB) {#file-control-block-fcb}

### Definition

> **A File Control Block (FCB) is a data structure that holds all the information about a file, including its attributes and the location of its data on the disk. Each file has one FCB.**

In UNIX the FCB is the **inode**; in NTFS the information is stored in the **Master File Table (MFT)**; in FAT the directory entry holds most of it.

### Contents of a Typical FCB

1. File permissions.
2. File dates (create, access, write).
3. File owner, group and access-control list (ACL).
4. File size.
5. File data blocks, or pointers to the data blocks.

### Role of the FCB

1. **Create:** the logical file system allocates a new FCB, then reads the directory, adds the new file name and FCB, and writes the directory back.
2. **Open:** `open()` searches the directory for the file name; the FCB is copied into the **system-wide open-file table** (if it is not already there), and an entry is made in the **per-process open-file table** pointing to it; the call returns a pointer (file descriptor or file handle) to that entry.
3. **Read/Write:** the file descriptor leads to the FCB, which gives the location of the data blocks.
4. **Close:** the per-process entry is removed and the open count of the system-wide entry is decreased; when it reaches 0, the updated FCB is written back to disk.

## Space Allocation {#space-allocation}

**Space (file) allocation** is the method of allocating disk blocks to files so that disk space is used effectively and files can be accessed quickly. There are three main methods: **contiguous**, **linked** and **indexed**.

### 1. Contiguous Allocation

Each file occupies a set of **contiguous blocks**. The directory entry holds the **starting block (b)** and the **length (n)**; the file occupies blocks b, b + 1, …, b + n − 1.

> **Physical block of logical block k = b + k**

**Example:** a file starts at block 14 and has 3 blocks → it occupies blocks 14, 15 and 16; its logical block 2 is in physical block 14 + 2 = 16.

![Contiguous allocation of files on a 32-block disk with the directory listing start and length](/diagrams/operating-systems/allocation-contiguous.svg)

- **Advantages:** supports both **sequential and direct access**; very fast (minimum seeks); simple.
- **Disadvantages:** **external fragmentation**; difficult to **grow** a file (the size must be known in advance); compaction may be needed.

### 2. Linked Allocation

Each file is a **linked list of disk blocks**, which may be **scattered anywhere** on the disk. The directory entry holds pointers to the **first and last** blocks; each block holds a pointer to the **next** block (the last block holds −1 / nil).

![Linked allocation: file jeep stored in blocks 9, 16, 1, 10 and 25 linked by pointers](/diagrams/operating-systems/allocation-linked.svg)

- **Advantages:** **no external fragmentation**; files can grow easily; no need to know the size in advance.
- **Disadvantages:** supports **sequential access only** — to reach block k, k blocks must be read; space is used for pointers; **reliability** — a damaged pointer loses the rest of the file.

**FAT (File Allocation Table):** a variation of linked allocation used by MS-DOS and Windows. The pointers are kept in a **table at the beginning of the volume**, with one entry per disk block; the entry for a block holds the number of the next block of the file (an end-of-file value marks the last block, and 0 marks a free block). Since the table can be cached in memory, random access is faster.

### 3. Indexed Allocation

All the pointers of a file are brought together into one **index block**. The directory entry holds the address of the index block; the **i-th entry** of the index block points to the **i-th block** of the file.

![Indexed allocation: index block 19 lists blocks 9, 16, 1, 10 and 25](/diagrams/operating-systems/allocation-indexed.svg)

- **Advantages:** supports **direct access**; **no external fragmentation**.
- **Disadvantages:** the index block is an **overhead** (wasteful for small files); the size of a file is limited by the number of pointers in one index block.

**Example:** with 512-byte blocks and 4-byte block addresses, one index block holds 512 ÷ 4 = **128 pointers**, so the largest file is 128 × 512 bytes = **64 KB**.

For large files the index can be extended by:

1. **Linked scheme:** several index blocks linked together.
2. **Multilevel index:** a first-level index block points to second-level index blocks, which point to the data blocks.
3. **Combined scheme:** direct pointers plus single, double and triple indirect pointers, as in the UNIX [inode](#inodes).

### Comparison of Allocation Methods

| Basis | Contiguous | Linked | Indexed |
| --- | --- | --- | --- |
| Directory entry holds | Start block and length | First (and last) block | Index block address |
| Sequential access | Yes, fast | Yes | Yes |
| Direct (random) access | Yes, fast | No (slow) | Yes |
| External fragmentation | Yes | No | No |
| File growth | Difficult | Easy | Easy (until the index is full) |
| Space overhead | None | One pointer per block | One index block per file |
| Example | CD-ROM file systems | FAT (with a table) | UNIX inode |

### Free-Space Management

The file system keeps a **free-space list** of all free disk blocks.

**1. Bit vector (bitmap):** one bit per block — **1 = free**, **0 = allocated** (in some systems the opposite). Example: if blocks 2, 3, 4, 5, 8, 9, 10, 11, 12, 13, 17, 18, 25, 26 and 27 are free, the bitmap begins `001111001111110001100000011100000…`

> **First free block number = (number of bits per word) × (number of 0-valued words) + offset of the first 1 bit**

**Example:** with 8-bit words and the bitmap `00000000 00000000 00100000 …`, the first two words are 0 and the first 1 bit of the third word is at offset 2, so the first free block is 8 × 2 + 2 = **18**.

> **Bitmap size (bits) = Disk size ÷ Block size**

**Example:** a 1 TB (2⁴⁰ bytes) disk with 4 KB (2¹² bytes) blocks has 2²⁸ blocks, so the bitmap needs 2²⁸ bits = 2²⁵ bytes = **32 MB**.

- **Advantages:** simple; efficient to find the first free block or n consecutive free blocks (bit-manipulation instructions).
- **Disadvantages:** the bitmap must be kept in memory to be efficient, which is costly for large disks.

**2. Linked list:** all free blocks are linked together; the first free block's address is kept in a special place, and each free block holds a pointer to the next. No extra space is needed, but traversing the list requires reading each block (slow).

**3. Grouping:** the first free block stores the addresses of **n** free blocks; the first n − 1 of these are actually free, and the last one contains the addresses of the next n free blocks, and so on. Many free blocks can be found quickly.

**4. Counting:** since contiguous blocks are often freed together, the list stores the **address of the first free block and the count** of free contiguous blocks that follow (for example, "block 3, count 4" for blocks 3–6). The list is short when free space is mostly contiguous.

## Tree-Structured File System {#tree-structured-file-system}

### Definition

> **A tree-structured file system arranges directories as a tree with a single root directory. Each directory can contain files and further subdirectories, so every file has a unique path from the root.**

It is the most common directory structure (MS-DOS, Windows, UNIX and Linux all use it, extended with links).

### Features

1. **Root directory:** the top of the tree; every file in the system has a unique **path name** from the root.
2. **Subdirectories:** a directory is just a file with a special format; one bit in each entry tells whether the entry is a file (0) or a subdirectory (1).
3. **Current (working) directory:** each process has a current directory; file names that are not absolute are searched in it, and the user can change it (for example, with `cd`).
4. **Path names:** **absolute** (from the root, for example `/spell/mail/prt/first`) or **relative** (from the current directory, for example `prt/first` when the current directory is `/spell/mail`).
5. **Grouping:** users can create their own subdirectories to organize related files; the same file name can be used in different directories.

### Operations

1. **Create a file** in the current directory.
2. **Create a new subdirectory** in the current directory (`mkdir`).
3. **Change the current directory** (`cd`).
4. **Delete a directory:** if the directory is **empty**, it is simply deleted; if it is **not empty**, either the user must first delete all its files and subdirectories (as MS-DOS requires), or the system can delete the whole subtree with one command (as UNIX `rm -r` does — convenient but dangerous).

### Advantages and Disadvantages

- **Advantages:** logical grouping of files; efficient searching (a short path to any file); same names in different directories; scalable; protection can be applied per directory; users can access other users' files through path names.
- **Disadvantages:** a file or directory cannot be **shared** by appearing in two directories (this needs an acyclic-graph structure with links); long path names; deleting a non-empty directory needs care.

## References {#references}

**TutorialsPoint**

- [File System](https://www.tutorialspoint.com/operating_system/os_file_system.htm) — accessed 2026-11-03
- [File Attributes](https://www.tutorialspoint.com/operating_system/file_attributes_in_operating_system.htm) — accessed 2026-11-03
- [Structures of Directory](https://www.tutorialspoint.com/operating_system/structures_of_directory_in_operating_system.htm) — accessed 2026-11-03
- [Indexed Allocation](https://www.tutorialspoint.com/operating_system/indexed_allocation_in_operating_system.htm) — accessed 2026-11-03
- [Free Space Management](https://www.tutorialspoint.com/operating_system/os_free_space_management.htm) — accessed 2026-11-03
- [Buffering](https://www.tutorialspoint.com/operating_system/os_buffering.htm) — accessed 2026-11-03 (its timing example — 180, about 110 and about 100 ms — agrees with the buffering formulas in these notes when M = 1 ms)

**GeeksforGeeks**

- [File Allocation Methods](https://www.geeksforgeeks.org/operating-systems/file-allocation-methods/) — accessed 2026-11-03
- [Inode in Operating System](https://www.geeksforgeeks.org/operating-systems/inode-in-operating-system/) — accessed 2026-11-03
- [Unix File System](https://www.geeksforgeeks.org/operating-systems/unix-file-system/) — accessed 2026-11-03
- [File System Implementation in Operating System](https://www.geeksforgeeks.org/operating-systems/file-system-implementation-in-operating-system/) — accessed 2026-11-03
- [I/O buffering and its Various Techniques](https://www.geeksforgeeks.org/operating-systems/i-o-buffering-and-its-various-techniques/) — accessed 2026-11-03
- [Free Space Management in Operating System](https://www.geeksforgeeks.org/free-space-management-in-operating-system/) — accessed 2026-11-03 (its bitmap uses 0 = free and then says to search for the first 1 bit; with that convention the search must look for a 0 bit)
- [Input-output system calls in C](https://www.geeksforgeeks.org/c/input-output-system-calls-c-create-open-close-read-write/) — accessed 2026-11-03

**TpointTech**

- [Allocation Methods in Operating System](https://www.tpointtech.com/os-allocation-methods) — accessed 2026-11-03
- [File System Structure in Operating System](https://www.tpointtech.com/os-file-system-structure) — accessed 2026-11-03
- [OS On Disk Data Structures](https://www.tpointtech.com/os-on-disk-data-structures) — accessed 2026-11-03
- TpointTech has no page on blocks and fragments (checked 2026-11-03).

**IT Job QnS**

- [Operating System](https://it.jobqns.com/operating-system/) — accessed 2026-11-03 (file-system fragmentation)

**Programiz**

- Programiz has no operating-system tutorial; no page was found for these subtopics (checked 2026-11-03).

**Additional sources** (used where the reference websites do not cover the point)

- M. K. McKusick, W. N. Joy, S. J. Leffler and R. S. Fabry, ["A Fast File System for UNIX"](https://carlstrom.com/stanford/quals/mirror/www-db.stanford.edu/~daswani/quals/McKusick84%20-%20A%20Fast%20File%20System%20for%20UNIX.htm), *ACM Transactions on Computer Systems*, 1984 — blocks and fragments — accessed 2026-11-03
- William Stallings, *Operating Systems: Internals and Design Principles*, "File Management" and "I/O Management" — the five file organizations, the three blocking methods, and the buffering time formulas
- Abraham Silberschatz, Peter B. Galvin and Greg Gagne, *Operating System Concepts*, "File-System Interface" and "File-System Implementation" — the file attributes and operations, FCB contents, the bit-vector formula and the free-space methods

All numerical examples in these notes were checked with a script.
