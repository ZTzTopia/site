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
