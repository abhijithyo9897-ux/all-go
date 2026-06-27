class PaninianGrammar:
    @staticmethod
    def extract_from_seed(seed):
        """Reverse-engineering extraction via Paninian rules."""
        return f"Extracted from {seed} using Paninian Grammar"

class GeometricVectorDatabase:
    def __init__(self):
        self.storage = {}

    def store_seed(self, seed_id, seed_value):
        """Storing the algorithmic potential (Seed)."""
        self.storage[seed_id] = seed_value
        print(f"Stored seed {seed_id}: {seed_value}")

    def retrieve_seed(self, seed_id):
        seed = self.storage.get(seed_id)
        if seed:
            return PaninianGrammar.extract_from_seed(seed)
        return "Seed not found."
