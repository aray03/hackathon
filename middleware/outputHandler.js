
//Handles the output from the Python script and formats it for the frontend


//TODO this will not be done until I actually get the outputj
export function handleTrashOutput(nnOutput) {
    try {
        
        // Single confidence value (0-1)
        const confidence = parseFloat(nnOutput.p_recyclable);
        const type = nnOutput.type; // "recyclable" or "trash"
        const confidenceThreshold = 0.5; 
        
        if (confidence < confidenceThreshold) {
            return {
                type: "Unknown",
                message: "Unable to classify this item with confidence.",
                color: "#f57c00",
                confidence: confidence
            };
        }
        else {
            if (type === "recyclable") {
            return {
                type: "recyclable",
                message: `This item can be recycled! (${(confidence * 100).toFixed(1)}% confidence).`,
                color: "#388e3c",
                confidence: confidence
            };
            }
            else {
            return {
                type: "organic waste",
                message: `This item is organic waste (${(1 - confidence * 100).toFixed(1)}% confidence).`,
                color: "#d32f2f",
                confidence: 1 - confidence
            };
            } 
        }
    } catch (error) {
        console.error("Error parsing JSON output:", error);
        return {
            type: "Error",
            message: "An error occurred while processing the image.",
            color: "#d32f2f"
        };
    }
}