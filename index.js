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
  res.render('home');
});

// Create the upload endpoint that the React app calls
app.post('/upload', upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: "No image provided" });
    }
    
    console.log("File saved to:", req.file.path);
    
  //  res.json({ 
   //     message: 'File uploaded successfully!', 
    //    filename: req.file.filename 
    //});

    return res.render('home')
});

app.get('/call', async (req, res) => {
   res.send('Called the trash detector! ' + await callTrashDetector());
});


app.listen(3000, () => {
  console.log(`Server is running!!! It's on port 3000`);
});