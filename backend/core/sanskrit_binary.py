def map_to_binary(character):
    """Maps standard Sanskrit characters into 8-bit phonetic binary data."""
    # Mock implementation
    binary_val = bin(ord(character))[2:].zfill(8)
    return binary_val

def encrypt_sanskrit(text, grammar_tags=None):
    """Implementation of encrypt_sanskrit using Cryptographic Grammar Tags."""
    if grammar_tags is None:
        grammar_tags = []
    encrypted = ""
    for char in text:
        encrypted += map_to_binary(char)
    # Append mock grammar tags
    encrypted_with_tags = encrypted + "".join(grammar_tags)
    return encrypted_with_tags

def decrypt_sanskrit(binary_data):
    """Implementation of decrypt_sanskrit."""
    decrypted = ""
    for i in range(0, len(binary_data), 8):
        byte = binary_data[i:i+8]
        if len(byte) == 8:
            decrypted += chr(int(byte, 2))
    return decrypted
