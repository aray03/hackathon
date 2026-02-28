// Utility functions for generating random values

// Returns a JSON object with random float p_recyclable and type (organic waste or recyclable)
export function getRandomFloat() {
    return {
        p_recyclable: Math.random(),
        type: Math.random() > 0.5 ? "recyclable" : "organic waste"
    };
}
