import sys
import os

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from fastapi.testclient import TestClient
from server import app

client = TestClient(app)

def test_compile_endpoint():
    print("="*50)
    print(" TESTING NETWORK WRAP (POST /api/engine/compile) ")
    print("="*50)
    
    payload = {
        "tokens": ["a", "i"],
        "seed_id": 99
    }
    
    print(f"[*] Sending JSON payload over ASGI network layer: {payload}")
    
    response = client.post("/api/engine/compile", json=payload)
    
    if response.status_code == 200:
        data = response.json()
        print("[+] SUCCESS (200 OK)")
        print(f"    - Input: {data['input_tokens']}")
        print(f"    - Vyakarana Output: {data['vyakarana_parsed_tokens']}")
        print(f"    - Geometric Signature (first 4 dims): {data['geometric_signature_12d'][:4]}")
        print("\n[+] OpenQASM Compilation Received:")
        print("-" * 40)
        print(data['openqasm'])
        print("-" * 40)
    else:
        print("[-] FAILED")
        print(response.text)

if __name__ == "__main__":
    test_compile_endpoint()
