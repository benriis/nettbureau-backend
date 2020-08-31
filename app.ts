import express from "express";
import bodyParser from 'body-parser';
const app = express();
const PORT = 8000;

import formRouter from './routes/form';
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json());

app.use("/form", formRouter)
app.get("/", (req, res) => res.send("Express and Typescript :)"))

app.listen(PORT, () => console.log(`server running at https://localhost:${PORT}`))