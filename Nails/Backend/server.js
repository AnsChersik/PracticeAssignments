import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { connection } from "./connectDB.js";

const app = express();

app.use(cors());

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());


app.listen(3001, function () {
  console.log("web server listening on port 3001");
});
