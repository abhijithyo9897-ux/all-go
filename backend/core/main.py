import json
import numpy as np
from sanskrit_binary import encrypt_sanskrit, decrypt_sanskrit
from vitruvian_quantum import generate_quantum_sanskrit_ledger
from quantum_network import QuantumNetwork
from steane_error_correction import SpatialNetwork, algoplace_sanskrit_ledger
from sandhi_engine import QuantumSandhiEngine
from vector_db import GeometricVectorDatabase

def main():
    print("--- Next Big Bharat Master Codebase Demonstration ---")

    # 1. Sanskrit Binary Encryption
    text = "Bharat"
    grammar_tags = ['Dhatu', 'Sandhi']
    print(f"\n[1] Encrypting: {text}")
    encrypted = encrypt_sanskrit(text, grammar_tags)
    print(f"Encrypted Binary (with tags): {encrypted}")
    decrypted = decrypt_sanskrit(encrypted[:len(text)*8]) # Exclude tags for decryption mock
    print(f"Decrypted: {decrypted}")

    # 2. Vitruvian Quantum Ledger
    print("\n[2] Generating Quantum Sanskrit Ledger")
    quantum_state = generate_quantum_sanskrit_ledger(grammar_tags)
    print(f"Resulting Quantum State: {quantum_state}")

    # 3. Quantum Network & Routing (Steane Topology)
    print("\n[3] Network Topology & Error Correction")
    network = QuantumNetwork("saptabhagini_topology.json")
    network.route_data(encrypted)
    
    spatial_net = SpatialNetwork({"nodes": {"Prathama": 1, "Dvitiya": 2}})
    algoplace_sanskrit_ledger(spatial_net, encrypted)

    # 4. Sandhi Engine Matrix Transformations
    print("\n[4] Sandhi Junction Matrix Logic")
    engine = QuantumSandhiEngine()
    phoneme_vector = np.array([1, 0])
    transformed = engine.apply_guna_sandhi(phoneme_vector)
    print(f"Original Vector: {phoneme_vector}, Transformed (Guna Sandhi): {transformed}")

    # 5. Geometric Vector Database
    print("\n[5] Vector Database Storage & Extraction")
    db = GeometricVectorDatabase()
    db.store_seed("seed_001", "ALGO_POTENTIAL_ALPHA")
    extracted_data = db.retrieve_seed("seed_001")
    print(f"Extracted Data: {extracted_data}")

    print("\n--- Demonstration Complete ---")

if __name__ == "__main__":
    main()
