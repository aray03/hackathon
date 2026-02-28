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


app.get('/call', (req, res) => {
  console.log('Received a request to /call');
  console.log(req);
  res.send('Call endpoint hit!');
});

app.listen(3000, () => {
  console.log(`Server is running!!! It's on  port 3000`);
});




