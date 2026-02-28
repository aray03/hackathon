import express from "express";
import { callTrashDetector } from "./middleware/callData.js";

const app = express();


app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/call', (req, res) => {
  callTrashDetector();
  res.send('Called the trash detector!');
});

app.listen(3000, () => {
  console.log(`Server is running!!! It's on  port 3000`);
});




