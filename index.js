import express from "express";
import { engine } from 'express-handlebars';
import multer from 'multer'; 
import { callTrashDetector } from "./middleware/callData.js";
import { handleTrashOutput } from "./middleware/outputHandler.js";

const app = express();
const upload = multer({ dest: 'uploads/' }); 

app.use(express.static('./public'));

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

app.get('/', (req, res) => {
  res.render('home', { renderResult: false });
});

// Create the upload endpoint that the React app calls
app.post('/upload', upload.single('image'), async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: "No image provided" });
    }
    
    console.log("File saved to:", req.file.path);

    const nnOutput = await callTrashDetector();
    console.log(nnOutput);
    
    //call the output handler and use it to render a handlebars
    const output = await handleTrashOutput(nnOutput);
    console.log("hello");
    console.log(output);
    res.json({ success: true, result: output });
    console.log("hello again");
    
});



app.listen(3000, () => {
  console.log(`Server is running!!! It's on port 3000`);
});