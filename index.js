import express from "express";
import { engine } from 'express-handlebars';
import multer from 'multer'; 
import { callTrashDetector } from "./middleware/callData.js";

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
app.post('/upload', upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: "No image provided" });
    }
    
    console.log("File saved to:", req.file.path);
    //call the output handler and use it to render a handlebars
    
    
    res.render('home', { renderResult: true, result: { isRecyclable: false, confidence: 90 } });
});

app.get('/call', async (req, res) => {
   res.send('Called the trash detector! ' + await callTrashDetector());
});


app.listen(3000, () => {
  console.log(`Server is running!!! It's on port 3000`);
});