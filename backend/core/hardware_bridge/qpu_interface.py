"""
QPU Interface
Generates OpenQASM 2.0 instructions from the abstract quantum transpiler output.
This acts as the bridge to physical Quantum Processing Units (QPUs).
"""

class QPUInterface:
    def __init__(self):
        self.qasm_header = "OPENQASM 2.0;\ninclude \"qelib1.inc\";\n"
        
    def generate_qasm(self, abstract_instructions: list[dict]) -> str:
        """
        Converts the transpiler's output into QASM format.
        """
        qasm = [self.qasm_header]
        
        # Find the allocation instruction
        qubit_count = 1
        for inst in abstract_instructions:
            if inst["op"] == "ALLOCATE":
                qubit_count = inst["qubits"]
                break
                
        qasm.append(f"qreg q[{qubit_count}];")
        qasm.append(f"creg c[{qubit_count}];\n")
        
        for inst in abstract_instructions:
            if inst["op"] == "PREPARE_STATE":
                q = inst["qubit"]
                # A full compiler would map the arbitrary state vector to standard gate rotations (U3, RY, etc.)
                # Here we mock it by applying an H-gate to represent superposition creation.
                qasm.append(f"// {inst.get('annotation', '')}")
                qasm.append(f"h q[{q}];")
            elif inst["op"] == "CNOT":
                ctrl = inst["control"]
                targ = inst["target"]
                qasm.append(f"// {inst.get('annotation', '')}")
                qasm.append(f"cx q[{ctrl}], q[{targ}];")
                
        # Add measurement
        qasm.append("\n// Measurement phase")
        for i in range(qubit_count):
            qasm.append(f"measure q[{i}] -> c[{i}];")
            
        return "\n".join(qasm)

if __name__ == "__main__":
    from core.paninian_compiler.quantum_transpiler import QuantumTranspiler
    
    transpiler = QuantumTranspiler()
    instructions = transpiler.transpile(["e", "o"])
    
    qpu = QPUInterface()
    print(qpu.generate_qasm(instructions))
