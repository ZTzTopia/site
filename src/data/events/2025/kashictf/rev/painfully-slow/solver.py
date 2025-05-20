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
                return result[0]
            except json.JSONDecodeError as e:
                # print(f"Error loading JSON: {e}")
                pass
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
