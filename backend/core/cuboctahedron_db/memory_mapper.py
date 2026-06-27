"""
Memory Mapper (C++ Kernel Interface with Python Fallback)
Attempts a direct FFI via ctypes into the low-level C++ database kernel for maximum IO speed.
If the DLL architecture (e.g., 32-bit MinGW) mismatches the Python architecture (e.g., 64-bit),
it gracefully falls back to Python's native mmap.
"""
import ctypes
import os
import struct
import numpy as np
import mmap

class MemoryMapper:
    def __init__(self, filename="cuboctahedron.dat", vector_count=1000):
        self.filename = filename
        self.vector_count = vector_count
        self.use_cpp_kernel = False
        
        dll_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), "kernel.dll")
        
        try:
            if not os.path.exists(dll_path):
                raise FileNotFoundError("DLL not found.")
                
            self.lib = ctypes.CDLL(dll_path)
            self._init_ctypes()
            self.use_cpp_kernel = True
            print("[+] Using high-speed C++ Database Kernel (kernel.dll) for memory mapping.")
            
        except OSError as e:
            print(f"[!] Warning: C++ Kernel architecture mismatch or error ({e}).")
            print(f"[!] Falling back to Python native mmap simulation.")
            self._init_python_mmap()

    def _init_ctypes(self):
        self.lib.init_db.argtypes = [ctypes.c_char_p, ctypes.c_int]
        self.lib.init_db.restype = ctypes.c_void_p
        self.lib.write_vector.argtypes = [ctypes.c_void_p, ctypes.c_int, ctypes.POINTER(ctypes.c_double)]
        self.lib.write_vector.restype = ctypes.c_int
        self.lib.read_vector.argtypes = [ctypes.c_void_p, ctypes.c_int, ctypes.POINTER(ctypes.c_double)]
        self.lib.read_vector.restype = ctypes.c_int
        self.lib.close_db.argtypes = [ctypes.c_void_p]
        self.lib.close_db.restype = None
        
        encoded_filename = self.filename.encode('utf-8')
        self.fp = self.lib.init_db(encoded_filename, self.vector_count)
        if not self.fp:
            raise RuntimeError("Failed to initialize C++ low-level database kernel.")

    def _init_python_mmap(self):
        self.record_format = 'i12d'
        self.record_size = struct.calcsize(self.record_format)
        self.file_size = self.vector_count * self.record_size
        
        if not os.path.exists(self.filename):
            with open(self.filename, "wb") as f:
                f.write(b'\x00' * self.file_size)
                
        self.f = open(self.filename, "r+b")
        self.mm = mmap.mmap(self.f.fileno(), 0)

    def write_vector(self, index: int, vector: np.ndarray):
        if index >= self.vector_count:
            raise IndexError("Index out of bounds.")
        if len(vector) != 12:
            raise ValueError("Vector must be exactly 12 dimensions.")
            
        if self.use_cpp_kernel:
            c_array = (ctypes.c_double * 12)(*vector.tolist())
            if self.lib.write_vector(self.fp, index, c_array) != 0:
                raise IOError("C++ Kernel failed to write vector.")
        else:
            offset = index * self.record_size
            packed_data = struct.pack(self.record_format, index, *vector.tolist())
            self.mm[offset:offset+self.record_size] = packed_data
        
    def read_vector(self, index: int) -> np.ndarray:
        if index >= self.vector_count:
            raise IndexError("Index out of bounds.")
            
        if self.use_cpp_kernel:
            c_array = (ctypes.c_double * 12)()
            if self.lib.read_vector(self.fp, index, c_array) != 0:
                raise IOError(f"C++ Kernel failed to read vector at index {index}.")
            return np.array(c_array)
        else:
            offset = index * self.record_size
            raw_data = self.mm[offset:offset+self.record_size]
            unpacked = struct.unpack(self.record_format, raw_data)
            return np.array(unpacked[1:])

    def close(self):
        if self.use_cpp_kernel:
            if hasattr(self, 'fp') and self.fp:
                self.lib.close_db(self.fp)
                self.fp = None
        else:
            if hasattr(self, 'mm'):
                self.mm.close()
                self.f.close()
