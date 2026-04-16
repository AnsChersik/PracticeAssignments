import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { connection } from "./connectDB.js";

const app = express();

app.use(cors());

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

app.post("/register", (req, res) => {
  const { login, password, full_name, phone } = req.body;
  const sql =
    "INSERT INTO user(id_role, login, password, full_name, phone) VALUES( 1, ?, ?, ?, ?)";
  const values = [login, password, full_name, phone];

  connection.query(sql, values, (err, results) => {
    res.json(results);
  });
});

app.post("/login", (req, res) => {
  const { login, password } = req.body;
  const sql = "SELECT * FROM user WHERE login = ? AND password = ?";
  const values = [login, password];

  connection.query(sql, values, (err, results) => {
    res.json(results);
  });
});

app.listen(3001, function () {
  console.log("web server listening on port 3001");
});
