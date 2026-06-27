#include <iostream>
#include <cstdio>
#include <cstdlib>
#include <cstring>
#include <cstdint>

extern "C" {

    // Struct representing exactly the layout we want in memory
    // 4 bytes for index, 96 bytes for the 12-dimensional vector of doubles
    // We force 1-byte alignment to avoid padding discrepancies if needed, 
    // but default alignment is fine for C/Python struct parity as long as we match.
    // Python struct 'i12d' = 4 byte int + 4 byte pad + 12*8 bytes = 104 bytes.
    #pragma pack(push, 1)
    struct Record {
        int32_t id;
        double vector[12];
    };
    #pragma pack(pop)

    // Opens or creates the raw binary mapping file
    FILE* init_db(const char* filename, int max_records) {
        FILE* fp = fopen(filename, "r+b");
        if (!fp) {
            fp = fopen(filename, "w+b");
            if (fp) {
                // Preallocate file size
                size_t record_size = sizeof(Record);
                size_t total_size = max_records * record_size;
                void* zero_buf = calloc(max_records, record_size);
                fwrite(zero_buf, record_size, max_records, fp);
                free(zero_buf);
                fflush(fp);
            }
        }
        return fp;
    }

    // Direct write bypassing high-level serialization
    int write_vector(FILE* fp, int index, const double* vec) {
        if (!fp) return -1;
        
        Record rec;
        rec.id = index;
        std::memcpy(rec.vector, vec, 12 * sizeof(double));
        
        long offset = index * sizeof(Record);
        fseek(fp, offset, SEEK_SET);
        size_t written = fwrite(&rec, sizeof(Record), 1, fp);
        fflush(fp);
        
        return written == 1 ? 0 : -1;
    }

    // Direct read to populate an array
    int read_vector(FILE* fp, int index, double* out_vec) {
        if (!fp) return -1;
        
        Record rec;
        long offset = index * sizeof(Record);
        fseek(fp, offset, SEEK_SET);
        size_t read_items = fread(&rec, sizeof(Record), 1, fp);
        
        if (read_items == 1 && rec.id == index) {
            std::memcpy(out_vec, rec.vector, 12 * sizeof(double));
            return 0;
        }
        return -1;
    }

    void close_db(FILE* fp) {
        if (fp) {
            fclose(fp);
        }
    }
}
