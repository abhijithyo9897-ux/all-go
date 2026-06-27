#include <iostream>
#include <string>
#include <vector>
#include <cstring>
#include <map>
#include <algorithm>

extern "C" {
    // A simplified representation of the Vyakarana Context (Anuvritti State)
    struct VyakaranaContext {
        char previous_rule_id[16];
        bool is_sandhi_active;
        bool is_morphology_active;
    };

    // Initialize the Vyakarana Engine state
    VyakaranaContext* init_vyakarana() {
        VyakaranaContext* ctx = new VyakaranaContext();
        std::strcpy(ctx->previous_rule_id, "START");
        ctx->is_sandhi_active = true;
        ctx->is_morphology_active = true;
        return ctx;
    }

    // Free the state
    void close_vyakarana(VyakaranaContext* ctx) {
        if (ctx) delete ctx;
    }

    // Helper to evaluate phonetic proximity (sthantaratamah)
    const char* evaluate_sandhi(const char* lhs, const char* rhs) {
        std::string l(lhs);
        std::string r(rhs);
        
        // 6.1.87 ad gunah
        if (l == "a" || l == "A") {
            if (r == "i" || r == "I") return "e";
            if (r == "u" || r == "U") return "o";
            if (r == "R" || r == "RR") return "ar";
            if (r == "L") return "al";
        }
        
        // 6.1.77 iko yan aci
        if (l == "i" || l == "I") return "y"; // Followed by dissimilar vowel (assumed)
        if (l == "u" || l == "U") return "v";
        if (l == "R" || l == "RR") return "r";
        if (l == "L") return "l";

        // 6.1.101 akah savarne dirghah (simplified)
        if ((l == "a" && r == "a") || (l == "A" && r == "a") || (l == "a" && r == "A")) return "A";
        if ((l == "i" && r == "i") || (l == "I" && r == "i") || (l == "i" && r == "I")) return "I";
        if ((l == "u" && r == "u") || (l == "U" && r == "u") || (l == "u" && r == "U")) return "U";

        return ""; // No rule matched
    }

    // The main processing function exported to Python
    // Returns 1 if a rule was applied and sequence changed, 0 otherwise.
    // It writes the new token back into `out_token` and flags if it's an ekadesha (single replacement)
    int process_tokens(VyakaranaContext* ctx, const char* t1, const char* t2, char* out_token, int* is_ekadesha) {
        if (!ctx || !ctx->is_sandhi_active) return 0;

        const char* result = evaluate_sandhi(t1, t2);
        if (std::strlen(result) > 0) {
            std::strcpy(out_token, result);
            
            // Determine if it was ekadesha (both replaced by one) or just LHS substitution
            std::string l(t1);
            if (l == "a" || l == "A" || l == t2) { // guna or dirgha
                *is_ekadesha = 1;
                std::strcpy(ctx->previous_rule_id, "6.1.87/101");
            } else { // yan
                *is_ekadesha = 0;
                std::strcpy(ctx->previous_rule_id, "6.1.77");
            }
            return 1;
        }
        
        return 0;
    }
}
