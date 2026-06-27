"""
System Integration Simulation
Demonstrates the full pipeline of the Industrial-Grade Quantum-Paninian Engine.
"""
import os
import sys

# Ensure core module can be imported
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from core.paninian_compiler.shivasutra_lexer import ShivaSutraLexer
from core.paninian_compiler.ashtadhyayi_parser import AshtadhyayiParser
from core.paninian_compiler.quantum_transpiler import QuantumTranspiler

from core.cuboctahedron_db.geometric_kernel import GeometricKernel

from core.hardware_bridge.qpu_interface import QPUInterface
from core.hardware_bridge.isomorphism_proofs import IsomorphismProver

def run_simulation():
    print("="*60)
    print(" BHARAT NEXT BIG CINEMA — INDUSTRIAL ENGINE SIMULATION ")
    print("="*60)
    
    # ---------------------------------------------------------
    # LAYER 1: The Paninian Compiler
    # ---------------------------------------------------------
    print("\n[+] LAYER 1: The Paninian Compiler")
    lexer = ShivaSutraLexer()
    parser = AshtadhyayiParser()
    transpiler = QuantumTranspiler()
    
    # Test Input: A sequence of phonemes (e.g. "a" + "i")
    input_tokens = ["a", "i"]
    print(f"    -> Input Tokens: {input_tokens}")
    
    # 1. Parsing and algebraic reduction (e.g. Guna Sandhi)
    parsed_sequence = parser.parse_sequence(input_tokens)
    print(f"    -> Ashtadhyayi Parsed Sequence: {parsed_sequence}")
    
    # 2. Translation to Abstract Quantum Logic
    abstract_q_logic = transpiler.transpile(parsed_sequence)
    print(f"    -> Abstract Quantum Instructions Generated: {len(abstract_q_logic)} ops")
    
    # ---------------------------------------------------------
    # LAYER 2: The DBMS Engine (Cuboctahedron Geometric DB)
    # ---------------------------------------------------------
    print("\n[+] LAYER 2: The Cuboctahedron DBMS Engine (Low-Level Memory Map)")
    db_kernel = GeometricKernel()
    
    # We take the state from the last preparation step in the abstract logic
    # In reality, the compiler would output the full state vector
    state_vector = transpiler.phoneme_to_state(parsed_sequence[0])
    
    seed_id = 42
    print(f"    -> Hashing state vector to 12D Cuboctahedron Geometry...")
    db_kernel.store_seed(seed_id, state_vector)
    
    retrieved_12d = db_kernel.retrieve_seed(seed_id)
    print(f"    -> Successfully retrieved 12D geometric signature from mmap:")
    print(f"       {retrieved_12d[:4]}... (truncated)")
    
    # ---------------------------------------------------------
    # LAYER 3: Hardware Bridge & Proofs
    # ---------------------------------------------------------
    print("\n[+] LAYER 3: Hardware Bridge & Mathematical Proofs")
    qpu = QPUInterface()
    prover = IsomorphismProver()
    
    # 1. Structural Validation
    print("    -> Validating Structural Isomorphism:")
    prover.verify_algebraic_mapping("Sandhi (a+i=e)", "Entanglement (CNOT)")
    
    # 2. QASM Generation for QPU execution
    print("\n    -> Generating OpenQASM 2.0 for physical QPU backend:")
    qasm_code = qpu.generate_qasm(abstract_q_logic)
    print("-" * 40)
    print(qasm_code)
    print("-" * 40)

    # Cleanup
    db_kernel.cleanup()
    print("\n[+] Simulation Complete. System shutdown.")

if __name__ == "__main__":
    run_simulation()
