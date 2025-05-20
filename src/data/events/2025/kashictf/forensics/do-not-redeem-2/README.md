---
title: "Do Not Redeem #2"
category: Forensics
tags: 
draft: false
completedDuringEvent: true
submitted: true
flag: KashiCTF{com.google.calendar.android}
---
> Kitler says he didn't request that OTP, neither did he read or share it. So it must be the scammer at play. Can you figure out the package name of the application that the suspected scammer used to infiltrate Kitler? Wrap your answer within `KashiCTF{` and `}`.

Flag format: `KashiCTF{com.example.pacage.name}`

Download `kitler's-phone.tar.gz` : Use the same file as in the challenge description of [forensics/Do Not Redeem #1](https://kashictf.iitbhucybersec.in/challenges#Do%20Not%20Redeem%20#1-28)

by `savsch`

---

Since we already had the OTP timestamp from **Do Not Redeem #1** (`1740251865569`), we searched for files modified around that time.

```sh
$ find . -type f -newermt '2025-02-23 03:13:00 +08' ! -newermt '2025-02-23 03:14:00 +08' -ls
2814749767397922      8 -rwxrwxrwx   1 ztz      ztz          5067 Feb 23 03:13 ./data/data/com.google.android.apps.messaging/cache/image_manager_disk_cache/85b688c1ee5638219d67340e8e5741781c29c85ec2943a8379748fca219be0d7.0
2814749767397921     12 -rwxrwxrwx   1 ztz      ztz          9095 Feb 23 03:13 ./data/data/com.google.android.apps.messaging/cache/image_manager_disk_cache/dd76d270a52ddf07e3a4d062dab37a141a045b63cb2b4af19c8ef38cbc0400da.0
2814749767397920     12 -rwxrwxrwx   1 ztz      ztz          9095 Feb 23 03:13 ./data/data/com.google.android.apps.messaging/cache/image_manager_disk_cache/e6e2689908af53b2b282c76df41fe10b12a8c0895e3e3c39d1b4513c8fe756c9.0
3096224744108828      4 -rwxrwxrwx   1 ztz      ztz          4096 Feb 23 03:13 ./data/data/com.google.android.apps.messaging/databases/gnp_fcm_database
2814749767397965      0 -rwxrwxrwx   1 ztz      ztz            99 Feb 23 03:13 ./data/data/com.google.android.apps.messaging/files/AccountData.pb
2814749767398035      0 -rwxrwxrwx   1 ztz      ztz            39 Feb 23 03:13 ./data/data/com.google.android.apps.messaging/files/DefaultAccountData.pb
3940649674232136      0 -rwxrwxrwx   1 ztz      ztz           230 Feb 23 03:13 ./data/system/appops/discrete/1740251606675tl
3377699720810545      4 -rwxrwxrwx   1 ztz      ztz          1257 Feb 23 03:13 ./data/system/dropbox/data_app_crash@1740251613989.txt
3377699720811639      8 -rwxrwxrwx   1 ztz      ztz          6467 Feb 23 03:13 ./data/system_ce/0/shortcut_service/bitmaps/com.google.android.apps.messaging/1740251633185.png
6473924464629415      8 -rwxrwxrwx   1 ztz      ztz          5067 Feb 23 03:13 ./data/user/0/com.google.android.apps.messaging/cache/image_manager_disk_cache/85b688c1ee5638219d67340e8e5741781c29c85ec2943a8379748fca219be0d7.0
2814749767390886     12 -rwxrwxrwx   1 ztz      ztz          9095 Feb 23 03:13 ./data/user/0/com.google.android.apps.messaging/cache/image_manager_disk_cache/dd76d270a52ddf07e3a4d062dab37a141a045b63cb2b4af19c8ef38cbc0400da.0
2814749767390885     12 -rwxrwxrwx   1 ztz      ztz          9095 Feb 23 03:13 ./data/user/0/com.google.android.apps.messaging/cache/image_manager_disk_cache/e6e2689908af53b2b282c76df41fe10b12a8c0895e3e3c39d1b4513c8fe756c9.0
2814749767391026      4 -rwxrwxrwx   1 ztz      ztz          4096 Feb 23 03:13 ./data/user/0/com.google.android.apps.messaging/databases/gnp_fcm_database
2814749767390912      0 -rwxrwxrwx   1 ztz      ztz            99 Feb 23 03:13 ./data/user/0/com.google.android.apps.messaging/files/AccountData.pb
2814749767390950      0 -rwxrwxrwx   1 ztz      ztz            39 Feb 23 03:13 ./data/user/0/com.google.android.apps.messaging/files/DefaultAccountData.pb
2814749767397022      4 -rwxrwxrwx   1 ztz      ztz         32768 Feb 23 03:13 ./data/user_de/0/com.android.providers.blockednumber/databases/blockednumbers.db
3096224744107679      0 -rwxrwxrwx   1 ztz      ztz             0 Feb 23 03:13 ./data/user_de/0/com.android.providers.blockednumber/databases/blockednumbers.db-journal
3940649674246673      8 -rwxrwxrwx   1 ztz      ztz          5067 Feb 23 03:13 ./data_mirror/data_ce/null/0/com.google.android.apps.messaging/cache/image_manager_disk_cache/85b688c1ee5638219d67340e8e5741781c29c85ec2943a8379748fca219be0d7.0
1970324837272080     12 -rwxrwxrwx   1 ztz      ztz          9095 Feb 23 03:13 ./data_mirror/data_ce/null/0/com.google.android.apps.messaging/cache/image_manager_disk_cache/dd76d270a52ddf07e3a4d062dab37a141a045b63cb2b4af19c8ef38cbc0400da.0
3940649674246671     12 -rwxrwxrwx   1 ztz      ztz          9095 Feb 23 03:13 ./data_mirror/data_ce/null/0/com.google.android.apps.messaging/cache/image_manager_disk_cache/e6e2689908af53b2b282c76df41fe10b12a8c0895e3e3c39d1b4513c8fe756c9.0
2814749767404188      4 -rwxrwxrwx   1 ztz      ztz          4096 Feb 23 03:13 ./data_mirror/data_ce/null/0/com.google.android.apps.messaging/databases/gnp_fcm_database
1970324837272106      0 -rwxrwxrwx   1 ztz      ztz            99 Feb 23 03:13 ./data_mirror/data_ce/null/0/com.google.android.apps.messaging/files/AccountData.pb
2814749767404112      0 -rwxrwxrwx   1 ztz      ztz            39 Feb 23 03:13 ./data_mirror/data_ce/null/0/com.google.android.apps.messaging/files/DefaultAccountData.pb
4503599627675440      4 -rwxrwxrwx   1 ztz      ztz         32768 Feb 23 03:13 ./data_mirror/data_de/null/0/com.android.providers.blockednumber/databases/blockednumbers.db
4222124650964785      0 -rwxrwxrwx   1 ztz      ztz             0 Feb 23 03:13 ./data_mirror/data_de/null/0/com.android.providers.blockednumber/databases/blockednumbers.db-journal
```

This revealed files related to:

- Google Messages (`com.google.android.apps.messaging`)
- Blocked Numbers Provider (`com.android.providers.blockednumber`)
- Dropbox Logs (`data/system/dropbox/`)

Among these, we found an **app crash log** at:

```
./data/system/dropbox/data_app_crash@1740251613989.txt
```

Upon inspecting it:

```sh
cat ./data/system/dropbox/data_app_crash@1740251613989.txt
SystemUptimeMs: 2856014
Process: com.google.calendar.android
PID: 8520
UID: 10211
Frozen: false
Flags: 0x28c8be44
Package: com.google.calendar.android v1 (1.0)
Foreground: No
Process-Runtime: 2263
Timestamp: 2025-02-23 00:43:33.942+0530
Build: google/sdk_gphone64_x86_64/emu64xa:15/AE3A.240806.005/12228598:userdebug/dev-keys
Crash-Handler: com.android.internal.os.RuntimeInit$KillApplicationHandler
Loading-Progress: 1.0
Dropped-Count: 0

java.lang.SecurityException: Writable dex file '/data/user/0/com.google.calendar.android/files/misc_config.dex' is not allowed.
        at dalvik.system.DexFile.openDexFileNative(Native Method)
        at dalvik.system.DexFile.openDexFile(DexFile.java:406)
        at dalvik.system.DexFile.<init>(DexFile.java:128)
        at dalvik.system.DexFile.<init>(DexFile.java:101)
        at dalvik.system.DexPathList.loadDexFile(DexPathList.java:438)
        at dalvik.system.DexPathList.makeDexElements(DexPathList.java:387)
        at dalvik.system.DexPathList.<init>(DexPathList.java:166)
        at dalvik.system.BaseDexClassLoader.<init>(BaseDexClassLoader.java:160)
        at dalvik.system.BaseDexClassLoader.<init>(BaseDexClassLoader.java:105)
        at dalvik.system.DexClassLoader.<init>(DexClassLoader.java:55)
        at f2.i.run(SourceFile:57)
        at java.lang.Thread.run(Thread.java:1012)
```

This shows that `com.google.calendar.android` attempted to execute a dex file, which is often used in malware to load additional code dynamically—this is suspicious behavior.
