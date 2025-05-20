---
title: "Painfully Slow"
category: Reverse Engineering
tags: 
draft: true
completedDuringEvent: true
submitted: true
flag: KashiCTF{1t_Wa5_Ju5t_4_Tutori4l_RIP}
---
> The new security update made this app so painfully slow I had to sell my degree for a Pixel 9 to get it running. But there's another problem now: I can't restore my old backup...

by `savsch`

---

1. Decompile .apk file with JADX.
2. All string is encrypted with key and IV AES, there is decrypt code to decrypt the encrypted string.
3. Because all string encrypted, so we need to find the string related to restore/backup the .bkp file. Running the application and get the string when restoring/backuping .bkp, there is toast message we can use for searching string.
5. Encrypt the toast message and start searching the encrypted toast message.
6. The backup process is key IV AES.
7. To generate key they use android_id (different for each app, user, and device) and get the last six character then add to 0x6969… and mul with 0x6969….
8. The IV is generated use random bytes with 16 bytes length then stored in first 16 bytes of the file, the rest bytes of file is the encrypted data.
9. Then you can make script to bruteforce the android_id (hex with 6bytes length) then add to 0x6969… and mul to 0x6969…, get the IV from file and read the rest encrypted data.
10. The decrypted data is in JSON format, and the flag is splitted.

```py
from Crypto.Cipher import AES
from Crypto.Protocol.KDF import PBKDF2
from Crypto.Util.Padding import pad, unpad
import binascii

def decipher(encrypted_str):
    # Generate the key using PBKDF2
    password = "r3UKMIuOqoBGxTy6oo86FP4MXwVj1UVS".encode('utf-8')
    salt = "r3UKMIuOqoBGxTy6oo86FP4MXwVj1UVS".encode('utf-8')
    key = PBKDF2(password, salt, dkLen=32, count=128, hmac_hash_module=None)

    # Initialize the AES cipher in ECB mode
    cipher = AES.new(key, AES.MODE_ECB)

    # Convert the hex string to bytes
    encrypted_bytes = to_byte(encrypted_str)

    # Decrypt the data
    decrypted_bytes = cipher.decrypt(encrypted_bytes)

    # Unpad the decrypted data
    decrypted_str = unpad(decrypted_bytes, AES.block_size).decode('utf-8')

    return decrypted_str

def cipher(plain_text):
    # Generate the key using PBKDF2
    password = "r3UKMIuOqoBGxTy6oo86FP4MXwVj1UVS".encode('utf-8')
    salt = "r3UKMIuOqoBGxTy6oo86FP4MXwVj1UVS".encode('utf-8')
    key = PBKDF2(password, salt, dkLen=32, count=128, hmac_hash_module=None)

    # Initialize the AES cipher in ECB mode
    cipher = AES.new(key, AES.MODE_ECB)

    # Pad the plain text
    plain_text = plain_text.encode('utf-8')

    # Encrypt the data
    padded_text = pad(plain_text, AES.block_size)
    encrypted_bytes = cipher.encrypt(padded_text)

    # Convert the encrypted bytes to hex string
    encrypted_str = binascii.hexlify(encrypted_bytes).decode('utf-8')

    return encrypted_str

def decrypt_string(encrypted_str):
    try:
        return decipher(encrypted_str)
    except Exception as e:
        print(f"Error decrypting string: {e}")
        return None
    
def encrypt_string(plain_text):
    try:
        return cipher(plain_text)
    except Exception as e:
        print(f"Error encrypting string: {e}")
        return None

def decrypt_string_array(encrypted_str_array):
    decrypted_str_array = []
    for encrypted_str in encrypted_str_array:
        decrypted_str = decrypt_string(encrypted_str)
        decrypted_str_array.append(decrypted_str)
    return decrypted_str_array

def to_byte(hex_str):
    # Convert a hex string to bytes
    return binascii.unhexlify(hex_str)

# Example usage:
encrypted_str = "6033d337b852801e79f1d84c7bbc185c8357f71737f1f3e97049cce114957af1"
decrypted_str = decrypt_string(encrypted_str)
print(decrypted_str)

plain_text = "Saved to Internal-Storage/Download/secure-notes-backup.bkp"
encrypted_str = encrypt_string(plain_text)
print(encrypted_str)
```

```py
import json
import os
import struct
import binascii
import itertools
import multiprocessing
from Crypto.Cipher import AES
from Crypto.Util.Padding import unpad

# Predefined constants
VALUE_OF2 = 6969696969696969696
VALUE_OF3 = 6969696969696969696
BLOCK_SIZE = AES.block_size

def derive_key_from_android_id(android_id: str) -> bytes:
    """Derives a 16-byte AES key from the last 6 characters of the Android ID."""
    m13313787 = android_id[-6:] if len(android_id) > 6 else android_id
    value_of = int(m13313787, 16)
    add = value_of + VALUE_OF2
    key_bytes = (add * VALUE_OF3).to_bytes(32, 'big')
    return key_bytes[-16:]  # Extract last 16 bytes

def decrypt_data(encrypted_data: bytes, iv: bytes, android_id: str):
    """Attempts decryption with the given Android ID."""
    try:
        aes_key = derive_key_from_android_id(android_id)
        cipher = AES.new(aes_key, AES.MODE_CBC, iv)
        decrypted_data = unpad(cipher.decrypt(encrypted_data), BLOCK_SIZE)
        return android_id, decrypted_data
    except (ValueError, KeyError):
        return None  # Wrong key, ignore

def brute_force_worker(encrypted_data: bytes, iv: bytes, id_range: list):
    """Worker function for multiprocessing brute force."""
    for android_id in id_range:
        result = decrypt_data(encrypted_data, iv, android_id)
        if result:
            decrypted_data = result[1].decode('utf-8', errors='ignore')
            try:
                notes = json.loads(decrypted_data)
                print(f"[*] Found Android ID: {result[0]}")
                print(f"[*] Decrypted Data: {decrypted_data}")
            except json.JSONDecodeError as e:
                # print(f"Error loading JSON: {e}")
                pass
            # return result[0]
    return None

def fast_brute_force(file_path: str, num_processes: int = 8):
    """Brute-force the Android ID by checking all possible last 6 hex digits."""
    # Read encrypted data into memory
    with open(file_path, "rb") as file:
        iv = file.read(16)  # Extract IV
        encrypted_data = file.read()  # Read the rest of the file

    print(f"[*] Loaded encrypted file: {file_path}")
    print(f"[*] IV: {binascii.hexlify(iv).decode()}")

    # Generate all possible last 6-character hex combinations
    possible_ids = [f"{i:06x}" for i in range(0, 0xFFFFFF)]

    # Split into chunks for multiprocessing
    chunk_size = len(possible_ids) // num_processes
    chunks = [possible_ids[i:i + chunk_size] for i in range(0, len(possible_ids), chunk_size)]

    # Start multiprocessing
    with multiprocessing.Pool(num_processes) as pool:
        results = pool.starmap(brute_force_worker, [(encrypted_data, iv, chunk) for chunk in chunks])

    # Check results
    for result in results:
        if result:
            print(f"[!] Successful brute-force: Android ID = {result}")
            return result
    print("[X] Brute-force failed: No matching Android ID found.")

# Example Usage
if __name__ == "__main__":
    file_path = "./secure-notes-backup.bkp" # e4112c
    fast_brute_force(file_path, num_processes=8)
```
