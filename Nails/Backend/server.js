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
    res.json(results[0]);
  });
});

app.get("/masters", (req, res) => {
  connection.query("SELECT id, name FROM master", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

app.get("/statuses", (req, res) => {
  connection.query("SELECT id, code, name FROM status", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

app.get("/requests/user/:userId", (req, res) => {
  const sql = `
    SELECT r.id, r.booking_datetime, m.name as master_name, s.name as status_name
    FROM request r
    JOIN master m ON r.id_master = m.id
    JOIN status s ON r.id_status = s.id
    WHERE r.id_user = ?
    ORDER BY r.booking_datetime DESC
  `;
  connection.query(sql, [req.params.userId], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

app.get("/requests/admin", (req, res) => {
  const sql = `
    SELECT r.id, r.booking_datetime, r.id_status,
           u.full_name as user_full_name, u.phone as user_phone,
           m.name as master_name
    FROM request r
    JOIN user u ON r.id_user = u.id
    JOIN master m ON r.id_master = m.id
    ORDER BY r.booking_datetime DESC
  `;
  connection.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

app.post("/requests", (req, res) => {
  const { id_user, id_master, booking_datetime } = req.body;
  const sql =
    "INSERT INTO request (id_user, id_master, id_status, booking_datetime) VALUES (?, ?, 1, ?)";
  connection.query(
    sql,
    [id_user, id_master, booking_datetime],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ success: true, requestId: results.insertId });
    },
  );
});

app.put("/requests/:requestId/status", (req, res) => {
  const { id_status } = req.body;
  const sql = "UPDATE request SET id_status = ? WHERE id = ?";
  connection.query(sql, [id_status, req.params.requestId], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: true });
  });
});

app.listen(3001, function () {
  console.log("web server listening on port 3001");
});
