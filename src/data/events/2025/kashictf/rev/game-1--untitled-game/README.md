---
title: "Game 1 - Untitled Game"
category: Reverse Engineering
tags: 
draft: false
completedDuringEvent: true
submitted: true
flag: KashiCTF{N07_1N_7H3_G4M3}
---
> We made a game.
>
> https://drive.google.com/file/d/1bf4WnxE81YIizN2e77x5PrkqGPwllgki/view?usp=drive_link

---

As usual, if you want to reverse a program, you must first know the file type. You can use the `file` command to find out the file type. And use the `strings` command to search for strings in the file.

```sh
$ strings /mnt/c/Users/zenta/Downloads/Challgame.exe | grep "KashiCTF{"
var flag = "KashiCTF{N07_1N_7H3_G4M3}"  # Get the footstep audio
```

Voila! We got the flag.
