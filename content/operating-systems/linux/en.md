---
description: Linux - introduction and history, distributions, architecture (kernel, shell, utilities), the file system hierarchy, basic commands, file permissions and ownership, users and groups, process management commands, package management and shell scripting basics.
updated: 2026-11-03
---

## Introduction and History of Linux {#introduction-and-history-of-linux}

### Definition

> **Linux is a free and open-source, UNIX-like operating system based on the Linux kernel, which was created by Linus Torvalds in 1991.**

Strictly, **Linux** is the name of the **kernel**. A complete operating system is formed by combining the Linux kernel with the system libraries and tools of the **GNU project** — so it is also called **GNU/Linux**.

### History

| Year | Event |
| --- | --- |
| 1969 | **UNIX** is developed at AT&T **Bell Labs** by Ken Thompson and Dennis Ritchie |
| 1983 | **Richard Stallman** announces the **GNU project** to create a free UNIX-like operating system (the Free Software Foundation follows in 1985) |
| 1987 | **Andrew S. Tanenbaum** writes **MINIX**, a small UNIX-like teaching OS with a microkernel |
| 1991 | **Linus Torvalds**, a student at the **University of Helsinki** (Finland), writes a new kernel, inspired by UNIX and MINIX, and releases it on **17 September 1991** |

More facts:

1. Torvalds first wanted to call it **Freax**; the name **Linux** (Linus + UNIX) was chosen instead.
2. The Linux kernel is released under the **GNU General Public License (GPL) version 2**.
3. The Linux mascot is a penguin named **Tux** (created by Larry Ewing).
4. The Linux kernel is a **monolithic** kernel (with loadable modules).
5. Linus Torvalds still leads the development of the kernel.

### Features of Linux

1. **Free and open source:** the source code is freely available and can be modified and redistributed.
2. **Portable:** runs on many hardware platforms (PCs, servers, phones, embedded devices, supercomputers).
3. **Multi-user:** several users can use the system at the same time.
4. **Multitasking (multiprogramming):** many programs run at the same time.
5. **Hierarchical file system** with a single root `/`.
6. **Shell:** a powerful command interpreter, plus graphical desktops.
7. **Security:** user authentication, file permissions and encryption.

### Uses of Linux

1. Web and database **servers** (most of the Internet's servers run Linux).
2. **Android** phones (Android is built on the Linux kernel).
3. **Supercomputers**, cloud computing and embedded systems (routers, TVs).
4. Desktops and software development.

### Linux vs Windows

| Basis | Linux | Windows |
| --- | --- | --- |
| Licence | Free and open source (GPL) | Commercial, closed source |
| Kernel | Monolithic (Linux kernel) | Hybrid (Windows NT kernel) |
| Developed by | Linus Torvalds and a worldwide community | Microsoft |
| Main interface | Shell (CLI) and desktops (GNOME, KDE) | Graphical user interface |
| File system | ext4 (also XFS, Btrfs) | NTFS |
| Directory separator | `/` (forward slash) | `\` (backslash) |
| File names | Case-sensitive | Not case-sensitive |
| Security | Fewer viruses; strict permissions | Frequent target of malware |

## Linux Distributions {#linux-distributions}

### Definition

> **A Linux distribution (distro) is a complete operating system made by combining the Linux kernel with GNU tools and libraries, a package manager, other software and, often, a desktop environment.**

A distribution typically contains:

1. The **Linux kernel**.
2. **System libraries and utilities** (such as the GNU C library, glibc).
3. A **package-management system**.
4. A **user interface** — a shell and optionally a desktop environment (GNOME, KDE, Xfce).
5. **Application software** (browsers, office suites, development tools).

### Families of Distributions

| Family | Package format | Package manager | Examples |
| --- | --- | --- | --- |
| Debian-based | `.deb` | `apt` / `apt-get` (low level: `dpkg`) | Debian, Ubuntu, Linux Mint, Kali Linux |
| Red Hat-based | `.rpm` | `dnf` / `yum` (low level: `rpm`) | Red Hat Enterprise Linux (RHEL), Fedora, CentOS Stream, Rocky Linux |
| Arch-based | `.pkg.tar.zst` | `pacman` | Arch Linux, Manjaro |
| SUSE | `.rpm` | `zypper` | openSUSE, SUSE Linux Enterprise |

### Popular Distributions

| Distribution | Main use |
| --- | --- |
| Ubuntu | Beginner-friendly desktop and server |
| Debian | Stable, general-purpose; the base of Ubuntu |
| Fedora | Latest software; developers |
| RHEL | Commercial enterprise servers (with paid support) |
| CentOS Stream | Upstream development of RHEL |
| Linux Mint | Windows-like desktop for beginners |
| Kali Linux | Penetration testing and security auditing |
| Arch Linux | Advanced users; rolling release; full customization |

## Linux Architecture: Kernel, Shell, Utilities {#linux-architecture-kernel-shell-utilities}

The Linux system is organized in **layers**:

![Linux architecture as nested layers: hardware, kernel, shell, and applications and utilities](/diagrams/operating-systems/linux-architecture.svg)

1. **Hardware:** the physical devices — CPU, RAM, disks and I/O devices.
2. **Kernel:** the core of the OS; it runs in **kernel mode** and talks to the hardware directly.
3. **System libraries:** functions (such as **glibc**) through which programs request kernel services — applications do not call the kernel directly.
4. **Shell:** the interface between the user and the kernel; it reads commands, interprets them and runs programs.
5. **Utilities and applications:** programs that provide most of the system's functions (`ls`, `cp`, editors, compilers), running in **user mode**.

### Kernel

The Linux kernel is a **monolithic kernel** with **loadable kernel modules** (device drivers can be added while the system runs). Its main jobs:

1. **Process management** and CPU scheduling.
2. **Memory management** (virtual memory, paging).
3. **Device management** through device drivers.
4. **File-system management** (through the Virtual File System, VFS).
5. **Networking**, **interprocess communication** and **security**.

### Shell

> **The shell is a command interpreter: it accepts the commands typed by the user, interprets them and asks the kernel to execute them.**

| Shell | Name | Notes |
| --- | --- | --- |
| `sh` | Bourne Shell | The original UNIX shell (Stephen Bourne); used for system scripts |
| `csh` | C Shell | C-like syntax; introduced command history |
| `ksh` | Korn Shell | Combines features of the Bourne and C shells |
| `bash` | Bourne Again Shell | GNU's improved Bourne shell; **default on most Linux distributions** |
| `zsh` | Z Shell | Highly customizable; default on macOS |

The shell prompt is usually `$` for a normal user and `#` for the superuser (root).

### Utilities

**Utilities** are the programs that perform specific tasks: file management (`ls`, `cp`, `mv`), text processing (`grep`, `sort`, `wc`), system monitoring (`ps`, `top`, `df`), networking (`ping`, `ip`), user management (`useradd`, `passwd`) and editors (`vi`, `nano`).

## Linux File System Hierarchy {#linux-file-system-hierarchy}

Linux follows the **Filesystem Hierarchy Standard (FHS)**, maintained by the Linux Foundation. All files are in **one tree** starting at the **root directory `/`**; other disks are mounted inside this tree (there are no drive letters like `C:`).

![Linux file system hierarchy from the root directory](/diagrams/operating-systems/linux-fhs.svg)

| Directory | Contents |
| --- | --- |
| `/` | Root — the top of the whole file system |
| `/bin` | Essential user command binaries (`ls`, `cp`, `cat`) |
| `/sbin` | System administration binaries (`fdisk`, `reboot`) |
| `/boot` | Boot loader files and the kernel image (GRUB) |
| `/dev` | Device files (`/dev/sda` for a disk, `/dev/null`) |
| `/etc` | System-wide configuration files (`/etc/passwd`, `/etc/fstab`) |
| `/home` | Home directories of normal users (`/home/rahim`) |
| `/root` | Home directory of the root (super) user |
| `/lib` | Shared libraries and kernel modules |
| `/media` | Mount points for removable media (USB drives, CDs) |
| `/mnt` | Temporary mount point for file systems |
| `/opt` | Optional add-on application software |
| `/proc` | Virtual file system with information about processes and the kernel |
| `/tmp` | Temporary files (often cleared at reboot) |
| `/usr` | User programs and data: `/usr/bin`, `/usr/lib`, `/usr/local`, `/usr/share` |
| `/var` | Variable data: logs (`/var/log`), mail, print spool, caches |

**Linux file types** (first character of `ls -l`):

| Symbol | Type |
| --- | --- |
| `-` | Regular file |
| `d` | Directory |
| `l` | Symbolic (soft) link |
| `c` | Character device file |
| `b` | Block device file |
| `p` | Named pipe (FIFO) |
| `s` | Socket |

The default file system of most Linux distributions is **ext4** (fourth extended file system).

## Basic Linux Commands {#basic-linux-commands}

### Directory Commands

| Command | Purpose | Example |
| --- | --- | --- |
| `pwd` | Print the current (working) directory | `pwd` |
| `ls` | List directory contents | `ls -l` (long list), `ls -a` (include hidden files), `ls -al` |
| `cd` | Change directory | `cd /home`, `cd ..` (parent), `cd ~` (home) |
| `mkdir` | Make a directory | `mkdir notes`, `mkdir -p a/b/c` |
| `rmdir` | Remove an empty directory | `rmdir notes` |

### File Commands

| Command | Purpose | Example |
| --- | --- | --- |
| `touch` | Create an empty file or update its timestamp | `touch a.txt` |
| `cat` | Display (concatenate) file contents | `cat a.txt`, `cat -n a.txt` |
| `cp` | Copy files or directories | `cp a.txt b.txt`, `cp -r A P` (copy directory A into P) |
| `mv` | Move or rename | `mv old.txt new.txt` |
| `rm` | Remove files | `rm a.txt`, `rm -r dir` (recursive), `rm -i` (ask first) |
| `more`, `less` | View a file page by page | `less big.log` |
| `head` | First lines of a file (default 10) | `head -10 a.txt` |
| `tail` | Last lines of a file | `tail -5 a.txt`, `tail -f log` (follow) |
| `ln` | Create links | `ln a b` (hard link), `ln -s a b` (soft link) |

### Searching and Text Processing

| Command | Purpose | Example |
| --- | --- | --- |
| `grep` | Search for a pattern in files | `grep "error" app.log`, `grep -i` (ignore case) |
| `find` | Find files by name, size, time, etc. | `find /home -name "*.txt"` |
| `locate` | Find files by name using a database | `locate notes` |
| `wc` | Count lines, words and characters | `wc -l a.txt`, `wc -w`, `wc -m` |
| `sort` | Sort lines | `sort names.txt` |
| `echo` | Print text | `echo "Hello" > a.txt` |

**Pipes and redirection:** `|` sends the output of one command to the next (`ls | wc -l`); `>` writes output to a file (overwrites); `>>` appends; `<` reads input from a file. Example: `head -10 customers.txt | wc -mw` counts the characters and words in the first 10 lines.

### System Information Commands

| Command | Purpose |
| --- | --- |
| `date`, `cal` | Show the date and time; show a calendar |
| `uname -a` | Show system (kernel) information |
| `whoami`, `who` | Show the current user; show logged-in users |
| `df -h` | Disk space of mounted file systems |
| `du -h dir` | Disk usage of a directory |
| `free -h` | Memory usage |
| `history` | List previously typed commands |
| `man ls` | Show the manual page of a command |
| `clear` | Clear the screen |

### Archive and Network Commands

| Command | Purpose | Example |
| --- | --- | --- |
| `tar` | Create or extract archives | `tar -cvf a.tar dir` (create), `tar -xvf a.tar` (extract), `tar -czvf a.tar.gz dir` (gzip) |
| `zip`, `unzip` | Zip archives | `zip -r a.zip dir` |
| `ping` | Test network connectivity | `ping google.com` |
| `ip a` / `ifconfig` | Show network interfaces and addresses | `ip a` |
| `ssh`, `scp` | Remote login; secure copy | `ssh user@host` |
| `wget`, `curl` | Download from the web | `wget URL` |

## File Permissions and Ownership {#file-permissions-and-ownership}

### Ownership

Every file has an **owner (user)** and a **group**. Permissions are given to three classes:

1. **u — user (owner)** of the file.
2. **g — group** of the file.
3. **o — others** (everyone else).

(`a` means all three.)

### Permission Types

| Permission | Symbol | Value | On a file | On a directory |
| --- | --- | --- | --- | --- |
| Read | `r` | 4 | Read the contents | List the contents (`ls`) |
| Write | `w` | 2 | Modify the contents | Create, delete or rename files in it |
| Execute | `x` | 1 | Run it as a program | Enter it (`cd`) |

### Reading `ls -l` Output

```text
-rwxr-xr--  1  rahim  staff  1024  Nov 3 10:00  backup.sh
│└┬┘└┬┘└┬┘
│ │  │  └── others: r-- (read only)
│ │  └───── group:  r-x (read, execute)
│ └──────── owner:  rwx (read, write, execute)
└────────── file type: - (regular file)
```

### Octal (Numeric) Permissions

Each class gets one digit, the **sum** of its permission values (r = 4, w = 2, x = 1):

| Octal | Permissions | Octal | Permissions |
| --- | --- | --- | --- |
| 0 | `---` | 4 | `r--` |
| 1 | `--x` | 5 | `r-x` |
| 2 | `-w-` | 6 | `rw-` |
| 3 | `-wx` | 7 | `rwx` |

**Examples:**

1. `chmod 755 script.sh` → owner 7 (rwx), group 5 (r-x), others 5 (r-x) = `rwxr-xr-x` — full control for the owner, read and execute for everyone else.
2. `chmod 750 backup.sh` → `rwxr-x---` — owner rwx, group r-x, others no access.
3. `chmod 644 a.txt` → `rw-r--r--` — owner read/write, others read only.
4. `chmod 400 A` → `r--------` — read-only for the owner only.
5. `chmod 754 f` → 7 = 4+2+1 (rwx), 5 = 4+1 (r-x), 4 = r → `rwxr-xr--`.

### Symbolic Permissions

| Command | Effect |
| --- | --- |
| `chmod u+x file` | Add execute for the owner |
| `chmod g-w file` | Remove write from the group |
| `chmod o=r file` | Set others to read only |
| `chmod a+r file` | Add read for all |
| `chmod u=rwx,g=rx,o= file` | Same as `chmod 750 file` |
| `chmod -R 755 dir` | Apply recursively to a directory |

### Changing Ownership

| Command | Purpose |
| --- | --- |
| `chown rahim file.txt` | Change the owner |
| `chown rahim:staff file.txt` | Change the owner and the group |
| `chown -R rahim:staff dir` | Change recursively |
| `chgrp staff file.txt` | Change only the group |

Only **root** (or a user using `sudo`) can change the owner of a file. Example: `chown root:admin backup.sh` makes `root` the owner and `admin` the group.

### umask (Default Permissions)

New files start from **666** (rw-rw-rw-) and new directories from **777** (rwxrwxrwx); the **umask** bits are **removed** from these.

> **Default permission = Base permission with the umask bits turned off** (for common umasks such as 022 and 027, this equals base − umask)

**Example:** umask **022**:

1. New file: 666 − 022 = **644** (`rw-r--r--`).
2. New directory: 777 − 022 = **755** (`rwxr-xr-x`).

### Special Permissions

1. **SUID (set-user-ID, 4):** a program runs with the permissions of the **file's owner** (for example, `/usr/bin/passwd` runs as root). Shown as `s` in the owner's execute position.
2. **SGID (set-group-ID, 2):** runs with the file's group; on a directory, new files inherit the directory's group.
3. **Sticky bit (1):** on a directory (such as `/tmp`), only the owner of a file can delete or rename it. Shown as `t` in the others' execute position.

Example: `chmod 4755 prog` sets SUID; `chmod 1777 /tmp` sets the sticky bit.

## Users and Groups {#users-and-groups}

### Types of Users

1. **Root (superuser):** has complete control of the system; its **UID is 0**.
2. **System (service) users:** used by services and daemons (such as `www-data`, `daemon`); usually cannot log in.
3. **Normal (regular) users:** ordinary users with limited privileges (on most distributions their UIDs start at **1000**).

### Important Files

1. **`/etc/passwd`:** one line per user with 7 colon-separated fields:
   `username : x : UID : GID : comment : home directory : login shell`
   — for example `rahim:x:1001:1001:Rahim:/home/rahim:/bin/bash`. The `x` means the password is stored in `/etc/shadow`.
2. **`/etc/shadow`:** the **encrypted (hashed) passwords**, readable only by root.
3. **`/etc/group`:** one line per group: `group name : password : GID : member list`.
4. **`/etc/gshadow`:** secure group information (group passwords and administrators).
5. **`/etc/skel`:** default files copied into each new user's home directory.

### Groups

1. **Primary group:** each user has one primary group (its GID is in `/etc/passwd`); files the user creates belong to this group.
2. **Secondary (supplementary) groups:** a user can be a member of other groups as well, to share access to files.

### User and Group Commands

| Command | Purpose | Example |
| --- | --- | --- |
| `useradd` | Create a user | `useradd -m -s /bin/bash rahim` (`-m` creates the home directory) |
| `passwd` | Set or change a password | `passwd rahim` |
| `usermod` | Modify a user | `usermod -aG sudo rahim` (add to a group), `usermod -s /bin/zsh rahim` |
| `userdel` | Delete a user | `userdel -r rahim` (`-r` also removes the home directory) |
| `groupadd` | Create a group | `groupadd developers` |
| `groupmod` | Rename a group | `groupmod -n devs developers` |
| `groupdel` | Delete a group | `groupdel devs` |
| `gpasswd` | Administer a group | `gpasswd -a rahim devs` (add a member) |
| `groups`, `id` | Show a user's groups; show UID, GID and groups | `id rahim` |
| `su` | Switch user | `su - rahim` |
| `sudo` | Run one command as root (for users allowed in `/etc/sudoers`) | `sudo apt update` |
| `whoami` | Show the current user name | `whoami` |

In `usermod -aG`, `-G` sets the supplementary groups and `-a` (append) keeps the user's existing groups; without `-a` the user is removed from the groups not listed.

## Process Management Commands {#process-management-commands}

A **process** is a running instance of a program; each has a unique **PID** (process ID) and a **PPID** (parent's PID). The first user-space process is **init / systemd** (PID 1). (See also [Process Management](/topics/operating-systems/process-management).)

### Foreground and Background Processes

1. **Foreground process:** runs attached to the terminal; the prompt returns only when it finishes.
2. **Background process:** started with `&` at the end of the command; the user can keep working (`sleep 100 &`).
3. **Daemon:** a background system process with no controlling terminal (such as `sshd`, `cron`).

### Process Commands

| Command | Purpose | Example |
| --- | --- | --- |
| `ps` | Snapshot of processes | `ps` (current shell), `ps -ef` / `ps aux` (all processes) |
| `top` / `htop` | Live view of processes, CPU and memory | `top` |
| `kill` | Send a signal to a process (default SIGTERM, 15) | `kill 1234`, `kill -9 1234` (SIGKILL — force) |
| `killall`, `pkill` | Kill processes by name | `killall firefox`, `pkill -f script` |
| `pgrep`, `pidof` | Find the PID of a process by name | `pgrep sshd` |
| `nice` | Start a process with a priority (nice value) | `nice -n 10 ./job.sh` |
| `renice` | Change the priority of a running process | `renice 5 -p 1234` |
| `jobs` | List the jobs of the current shell | `jobs` |
| `bg`, `fg` | Resume a stopped job in the background / bring a job to the foreground | `bg %1`, `fg %1` |
| `nohup` | Keep a process running after logout | `nohup ./server.sh &` |
| `pstree` | Show the process tree | `pstree` |

**Nice values** range from **−20 (highest priority)** to **+19 (lowest priority)**; the default is 0. Only root can set negative values.

**Keyboard controls:** **Ctrl+C** sends SIGINT (terminate the foreground process); **Ctrl+Z** sends SIGTSTP (stop/suspend it — resume with `fg` or `bg`).

**Process states shown by `ps`:** R (running), S (sleeping), D (uninterruptible sleep), T (stopped), Z (zombie).

## Package Management {#package-management}

### Definitions

1. **Package:** a compressed archive that contains a program's files, metadata and a list of its **dependencies** (other packages it needs).
2. **Repository:** an online server that stores packages for a distribution.
3. **Package manager:** the tool that **installs, upgrades, configures and removes** packages, downloading them from repositories and **resolving dependencies automatically**.

### Low-Level and High-Level Tools

| Family | Low-level tool (single package file, no dependency resolution) | High-level tool (repositories, dependencies) |
| --- | --- | --- |
| Debian / Ubuntu (`.deb`) | `dpkg` | `apt`, `apt-get`, `aptitude` |
| Red Hat / Fedora (`.rpm`) | `rpm` | `dnf` (newer), `yum` (older) |
| Arch | — | `pacman` |
| openSUSE | `rpm` | `zypper` |

### Common Commands

| Task | Debian/Ubuntu (APT) | Fedora/RHEL (DNF/YUM) | Arch (pacman) |
| --- | --- | --- | --- |
| Refresh the package list | `sudo apt update` | `sudo dnf check-update` | `sudo pacman -Sy` |
| Upgrade all packages | `sudo apt upgrade` | `sudo dnf upgrade` | `sudo pacman -Syu` |
| Install a package | `sudo apt install vim` | `sudo dnf install vim` | `sudo pacman -S vim` |
| Remove a package | `sudo apt remove vim` | `sudo dnf remove vim` | `sudo pacman -R vim` |
| Search | `apt search vim` | `dnf search vim` | `pacman -Ss vim` |
| Install a local file | `sudo dpkg -i file.deb` | `sudo rpm -ivh file.rpm` | `sudo pacman -U file.pkg.tar.zst` |

Notes:

1. `apt update` only **refreshes** the list of available packages; `apt upgrade` actually **installs** the newer versions.
2. `apt remove` keeps configuration files; `apt purge` removes them too; `apt autoremove` removes unused dependencies.
3. `apt` is designed for interactive use; `apt-get` is preferred in scripts.
4. **Universal formats** such as **Snap**, **Flatpak** and **AppImage** work across distributions (for example, `sudo snap install vlc`).

## Shell Scripting Basics {#shell-scripting-basics}

### Definition

> **A shell script is a text file containing a sequence of shell commands that the shell runs like a program. It is used to automate repetitive tasks such as backups, installations and monitoring.**

### Creating and Running a Script

1. Write the script with an editor; the **first line is the shebang** `#!/bin/bash`, which tells the system which interpreter to use.
2. Make it executable: `chmod +x hello.sh`.
3. Run it: `./hello.sh` (or `bash hello.sh`).

Lines starting with `#` (after the shebang) are **comments**.

### Variables and Special Variables

```bash
#!/bin/bash
# A simple shell script
name="Rahim"
echo "Hello, $name"
echo "Script name: $0"
echo "First argument: $1"
echo "Number of arguments: $#"
```

Running `./hello.sh notes x` prints:

```text
Hello, Rahim
Script name: ./hello.sh
First argument: notes
Number of arguments: 2
```

1. A variable is assigned **without spaces** around `=` (`name="Rahim"`) and used with `$` (`$name`).
2. **Special variables:** `$0` script name, `$1`–`$9` positional arguments, `$#` number of arguments, `$@` all arguments, `$?` exit status of the last command (0 = success), `$$` PID of the shell.
3. `read var` reads input from the user; `$(command)` substitutes a command's output; `$((expression))` does integer arithmetic.

### Conditions (if Statement)

```bash
#!/bin/bash
num=$1
if [ $num -gt 0 ]; then
    echo "$num is positive"
elif [ $num -lt 0 ]; then
    echo "$num is negative"
else
    echo "$num is zero"
fi
```

`./check.sh -5` prints `-5 is negative`; `./check.sh 0` prints `0 is zero`.

**Test operators:**

| Numbers | Meaning | Strings | Files |
| --- | --- | --- | --- |
| `-eq` | equal | `=` equal | `-f file` — is a regular file |
| `-ne` | not equal | `!=` not equal | `-d dir` — is a directory |
| `-gt` / `-lt` | greater / less than | `-z str` — empty string | `-e file` — exists |
| `-ge` / `-le` | greater or equal / less or equal | `-n str` — non-empty | `-r`, `-w`, `-x` — readable, writable, executable |

The `case … esac` statement selects among several patterns.

### Loops

**for loop (list):**

```bash
#!/bin/bash
for fruit in apple mango banana
do
    echo "I like $fruit"
done
```

Output: `I like apple`, `I like mango`, `I like banana`.

**for loop (C style) — sum of 1 to n:**

```bash
#!/bin/bash
# Sum of numbers from 1 to n
n=$1
sum=0
for (( i=1; i<=n; i++ ))
do
    sum=$((sum + i))
done
echo "Sum of 1 to $n = $sum"
```

`./sum.sh 10` prints `Sum of 1 to 10 = 55` (1 + 2 + … + 10 = 10 × 11 ÷ 2 = 55).

**while loop:**

```bash
#!/bin/bash
count=1
while [ $count -le 3 ]
do
    echo "Count: $count"
    count=$((count + 1))
done
```

Output: `Count: 1`, `Count: 2`, `Count: 3`.

The **until** loop runs while its condition is false; `break` leaves a loop and `continue` skips to the next iteration.

### Functions

```bash
greet() {
    echo "Hello, $1"
}
greet "World"      # prints: Hello, World
```

## References {#references}

**TutorialsPoint**

- [Operating System - Linux](https://www.tutorialspoint.com/operating_system/os_linux.htm) — accessed 2026-11-03
- [Unix / Linux - Processes Management](https://www.tutorialspoint.com/unix/unix-processes.htm) — accessed 2026-11-03
- [Unix / Linux - What is Shells?](https://www.tutorialspoint.com/unix/unix-what-is-shell.htm), [Using Shell Variables](https://www.tutorialspoint.com/unix/unix-using-variables.htm) and [Shell Decision Making](https://www.tutorialspoint.com/unix/unix-decision-making.htm) — accessed 2026-11-03

**GeeksforGeeks**

- [Linux from the beginning - History and Evolution](https://www.geeksforgeeks.org/linux-unix/linux-from-the-beginning-history-and-evolution/) — accessed 2026-11-03 (it places the start of Stallman's GNU project in 1991–1995; GNU was announced in 1983 — see Additional sources)
- [Linux Distributions](https://www.geeksforgeeks.org/linux-unix/what-are-linux-distributions/) — accessed 2026-11-03
- [Architecture of Linux](https://www.geeksforgeeks.org/linux-unix/architecture-of-linux-operating-system/) — accessed 2026-11-03
- [Linux File Hierarchy Structure](https://www.geeksforgeeks.org/linux-unix/linux-file-hierarchy-structure/) — accessed 2026-11-03
- [Linux Permissions](https://www.geeksforgeeks.org/linux-unix/set-file-permissions-linux/) and [Umask command in Linux](https://www.geeksforgeeks.org/linux-unix/umask-command-in-linux-with-examples/) — accessed 2026-11-03 (its umask example computes 666 − 543 = 123 by decimal subtraction; umask turns bits off, giving 224 — the notes use umask 022, where both methods agree)
- [Process Management in Linux](https://www.geeksforgeeks.org/process-management-in-linux/) — accessed 2026-11-03
- [Package Management Commands in Linux](https://www.geeksforgeeks.org/linux-unix/package-management-commands-in-linux/) — accessed 2026-11-03
- [Conditional Statements in Shell Script](https://www.geeksforgeeks.org/linux-unix/conditional-statements-shell-script/) and [Looping Statements in Shell Script](https://www.geeksforgeeks.org/linux-unix/looping-statements-shell-script/) — accessed 2026-11-03

**TpointTech**

- [Linux File Permission](https://www.tpointtech.com/linux-file-permissions) — accessed 2026-11-03
- [Linux User Management](https://www.tpointtech.com/linux-user-management) — accessed 2026-11-03 (it calls `/etc/passwd` a directory; it is a file)
- [Linux Local Groups](https://www.tpointtech.com/linux-groups) — accessed 2026-11-03
- [Basic Linux Commands](https://www.tpointtech.com/basic-linux-commands) — accessed 2026-11-03

**IT Job QnS**

- [Basic Linux Command](https://it.jobqns.com/linux-command/) — accessed 2026-11-03 (`mkdir` with `chmod 400`, `cp -r`, `chown`/`chgrp`, `chmod 750` and `chmod 755`, `head -10 … | wc -mw`, `ls -al`)

**Programiz**

- Programiz has no Linux tutorial; no page was found for these subtopics (checked 2026-11-03).

**Additional sources**

- [Linux](https://en.wikipedia.org/wiki/Linux) — Wikipedia (release date 17 September 1991, the name Freax, GPL version 2, Tux, the GNU project in 1983, monolithic kernel) — accessed 2026-11-03
- All shell scripts and permission examples were run in bash on Linux; the outputs shown are the real outputs.
