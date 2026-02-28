
//Handles the output from the Python script and formats it for the frontend


//TODO this will not be done until I actually get the outputj
export function handleTrashOutput(nnOutput) {
    console.log("Handling output:", nnOutput);
    console.log("Output type:", typeof nnOutput);
    console.log("Output length:", nnOutput?.length);
    try {
        // Clean up the output - trim whitespace and handle potential formatting issues
        let cleanOutput = nnOutput.trim();
        console.log("Cleaned output:", cleanOutput);
        
        // Replace single quotes with double quotes if needed (Python dict format)
        cleanOutput = cleanOutput.replace(/'/g, '"');
        console.log("After quote replacement:", cleanOutput);
        
        // Parse the JSON string into an object
        const data = JSON.parse(cleanOutput);
        console.log("Parsed data:", data);
        
        // Single confidence value (0-1)
        const confidence = parseFloat(data['reliability']);
        console.log("Parsed confidence:", confidence);
        const label = data['label']; // "recyclable" or "organic"
        console.log("Parsed label:", label);
        const confidenceThreshold = 0.5; 
        
        if (confidence < confidenceThreshold) {
            console.log('made it here!!!!')
            return {
                type: "Unknown",
                message: "Unable to classify this item with confidence.",
                color: "#f57c00",
                confidence: confidence
            };
        }
        else {
            if (label === "recyclable") {
            return {
                type: "recyclable",
                message: `This item can be recycled! (${(confidence * 100).toFixed(1)}% confidence).`,
                color: "#388e3c",
                confidence: confidence
            };
            }
            else {
            return {
                type: "organic",
                message: `This item is organic waste (${(confidence * 100).toFixed(1)}% confidence).`,
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