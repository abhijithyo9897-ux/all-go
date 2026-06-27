"""
Memory Mapper
Simulates low-level bypassing of block storage by directly mapping a file to memory (mmap).
This allows byte-addressable mapping of 12-dimensional vectors representing the cuboctahedron.
"""
import mmap
import os
import struct
import numpy as np

class MemoryMapper:
    def __init__(self, filename="cuboctahedron.dat", vector_count=1000):
        self.filename = filename
        self.vector_count = vector_count
        self.record_format = 'i12d'
        self.record_size = struct.calcsize(self.record_format)
        self.file_size = self.vector_count * self.record_size

        
        self._init_file()

    def _init_file(self):
        """Creates or opens the memory mapped file."""
        if not os.path.exists(self.filename):
            with open(self.filename, "wb") as f:
                f.write(b'\x00' * self.file_size)
                
        self.f = open(self.filename, "r+b")
        self.mm = mmap.mmap(self.f.fileno(), 0)
        
    def write_vector(self, index: int, vector: np.ndarray):
        """Writes a 12-D vector directly to mapped memory at the given index."""
        if index >= self.vector_count:
            raise IndexError("Index out of bounds for mapped memory.")
        if len(vector) != 12:
            raise ValueError("Vector must be exactly 12 dimensions.")
            
        offset = index * self.record_size
        
        # Pack ID and 12 floats
        # Format: i (int) + 12d (12 doubles)
        packed_data = struct.pack('i12d', index, *vector.tolist())
        
        self.mm[offset:offset+self.record_size] = packed_data
        
    def read_vector(self, index: int) -> np.ndarray:
        """Reads a 12-D vector from mapped memory."""
        if index >= self.vector_count:
            raise IndexError("Index out of bounds for mapped memory.")
            
        offset = index * self.record_size
        raw_data = self.mm[offset:offset+self.record_size]
        
        unpacked = struct.unpack('i12d', raw_data)
        
        _id = unpacked[0]
        vector = np.array(unpacked[1:])
        return vector

    def close(self):
        self.mm.close()
        self.f.close()

if __name__ == "__main__":
    mapper = MemoryMapper("test_map.dat", 10)
    test_vec = np.array([1.1, 2.2, 3.3, 4.4, 5.5, 6.6, 7.7, 8.8, 9.9, 10.0, 11.1, 12.2])
    mapper.write_vector(2, test_vec)
    print("Read from memory:", mapper.read_vector(2))
    mapper.close()
    if os.path.exists("test_map.dat"):
        os.remove("test_map.dat")
