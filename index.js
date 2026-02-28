import express from "express";
import { engine } from 'express-handlebars';
import { callTrashDetector } from "./middleware/callData.js";

const app = express();
app.use(express.static('./public'));

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');
app.get('/', (req, res) => {
  res.render('home');
});

app.get('/call', async (req, res) => {
//  callTrashDetector();
   res.send('Called the trash detector! ' + await callTrashDetector());
});

app.listen(3000, () => {
  console.log(`Server is running!!! It's on  port 3000`);
});




