import json

def load_topology(file_path):
    with open(file_path, 'r') as f:
        return json.load(f)

class QuantumNetwork:
    def __init__(self, topology_file):
        self.topology = load_topology(topology_file)
        print(f"Network initialized with identity: {self.topology.get('network_identity')}")

    def route_data(self, data):
        nodes = self.topology.get("nodes", [])
        print(f"Routing data through nodes: {', '.join(nodes)}")
        return "Routed successfully"
