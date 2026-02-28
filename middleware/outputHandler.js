
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
        const confidenceThreshold = 0.1; 
        
        if (confidence < confidenceThreshold) {
            return {
                type: "Unknown",
                message: "Unable to classify this item with confidence.",
                color: "#f57c00",
                confidence: confidence
            };
        }
        else {
            if (label === "Cardboard") {
                return {
                    type: "Cardboard",
                    message: `This is cardboard! Cardboard can be recycled by being broken down, flattened, and placed in the recycling bin. In Utah cardboard can be reycled at drop-off recycling or curbside pickup. Make sure to only recycle cardboard that is clean and dry. (${(confidence * 100).toFixed(1)}% confidence).`,
                    color: "#8B4513",
                    confidence: confidence
                };
            }
            else if (label === "Food Organics") {
                return {
                    type: "Food Organics",
                    message: `This is food waste! To dispose of food waste effectively, prioritize methods that divert scraps from landfills where they produce harmful methane gas. The most sustainable approach is composting, which transforms organic matter like fruit peels and coffee grounds into nutrient-rich soil through backyard bins, indoor worm farms (vermicomposting), or fermentation kits like Bokashi. If home composting isn't feasible, many modern cities offer municipal organics collection via green bins, or you can utilize community-based apps to donate scraps to local gardens. (${(confidence * 100).toFixed(1)}% confidence).`,
                    color: "#6D4C41",
                    confidence: confidence
                };
            }
            else if (label === "Glass") {
                return {
                    type: "Glass",
                    message: `This is glass! To dispose of glass responsibly, start by rinsing containers to remove food residue. In Utah it is not required to seperate glass by color.  Glass is 100% recyclable and can be processed indefinitely without losing quality, so utilizing curbside recycling bins or local drop-off centers is the most effective way to ensure it stays out of landfills. However, it is vital to only include "container glass" (like jars and bottles) in these bins; specialty items such as mirrors, light bulbs, window panes, and Pyrex have different chemical compositions and melting points that can contaminate the recycling stream. For these non-recyclable items or broken glass, wrap them securely in heavy paper or a cardboard box and seal it with tape before placing it in the regular trash to prevent injury to sanitation workers. (${(confidence * 100).toFixed(1)}% confidence).`,
                    color: "#0277BD",
                    confidence: confidence
                };
            }
            else if (label === "Metal") {
                return {
                    type: "Metal",
                    message: `This is metal! To dispose of metal efficiently, prioritize recycling since metals like aluminum and steel can be processed indefinitely without losing their structural integrity. For household items, start by rinsing food containers like soda cans or tin jars and placing them in your curbside recycling bin; however, be sure to remove any plastic lids or paper labels if required by your local facility. In Utah, each municipality is different. Larger or specialized items—such as copper piping, old appliances, or scrap iron—should be taken to a dedicated scrap yard where they are often weighed and sometimes even purchased from you. For hazardous metal items like electronics, batteries, or pressurized aerosol cans that aren't completely empty, it is crucial to use a certified e-waste or hazardous waste drop-off to prevent chemical leaks or fires during the disposal process. (${(confidence * 100).toFixed(1)}% confidence).`,
                    color: "#424242",
                    confidence: confidence
                };
            }
            else if (label === "Miscellaneous Trash") {
                return {
                    type: "Miscellaneous Trash",
                    message: `This is miscellaneous trash! This can be disposed in a landfil or garbage bin! (${(confidence * 100).toFixed(1)}% confidence).`,
                    color: "#d32f2f",
                    confidence: confidence
                };
            }
            else if (label === "Paper") {
                return {
                    type: "Paper",
                    message: `This is paper! To dispose of paper responsibly, focus on high-quality recycling by ensuring that all items are clean, dry, and free of food contaminants like grease or oil. Paper can go directly into your curbside recycling bin if it is clean and dry. If it is contaminated, it should be placed in the regular trash. Remeber to shred sensitive documents before disposal. (${(confidence * 100).toFixed(1)}% confidence).`,
                    color: "#F57C00",
                    confidence: confidence
                };
            }
            else if (label === "Plastic") {
                return {
                    type: "Plastic",
                    message: `This is plastic! To dispose of plastic effectively, start by checking the resin identification code—the small number inside a triangle—on the bottom of the container, as curbside programms in Utah only accept #1 (PET) and #2 (HDPE) plastics like water bottles and milk jugs. Before tossing them in the bin, rinse out any food residue and remove plastic films or "shrink-wrap" labels, which can jam recycling machinery. For problematic items like plastic grocery bags, bubble wrap, or flexible packaging, do not place them in your standard recycling bin; instead, take them to a dedicated store drop-off location found at many supermarkets. (${(confidence * 100).toFixed(1)}% confidence).`,
                    color: "#FBC02D",
                    confidence: confidence
                };
            }
            else if (label === "Textile Trash") {
                return {
                    type: "Textile Trash",
                    message: `This is textile waste! To dispose of textile waste responsibly, start by sorting items based on their condition, as "textile trash" should be the last resort after donation and repair have been exhausted. For clothing or linens that are torn, stained, or otherwise unwearable, do not place them in your standard curbside recycling bin, as fabrics can tangle in sorting machinery; instead, look for dedicated textile recycling drop-offs or "clothing scrap" bins often found in parking lots or run by non-profits. Many major retailers also offer take-back programs that transform old fibers into insulation, carpet padding, or new industrial rags. For items that are truly beyond recovery—such as those contaminated with hazardous chemicals or heavy mold—check your local municipal guidelines, as these may need to be sealed in a bag and placed in the regular landfill trash to prevent cross-contamination of cleaner recycling streams.(${(confidence * 100).toFixed(1)}% confidence).`,
                    color: "#9C27B0",
                    confidence: confidence
                };
            }
            else if (label === "Vegetation") {
                return {     
                    type: "Vegetation",
                    message: `This is vegetation waste! To dispose of vegetation waste effectively, prioritize methods that return organic nutrients to the soil rather than sending bulky debris to a landfill where it takes up valuable space and generates methane. For smaller garden debris like grass clippings, "grasscycling"—leaving the clippings on the lawn to decompose—is the simplest solution, while leaves and soft prunings can be processed in a backyard compost pile to create a rich soil amendment. For larger branches, woody brush, or high volumes of yard clearing, many municipalities provide curbside green waste collection or dedicated drop-off sites where the material is industrially chipped into mulch or composted at high temperatures. (${(confidence * 100).toFixed(1)}% confidence).`,
                    color: "#558B2F",
                    confidence: confidence
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