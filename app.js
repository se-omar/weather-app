import express from "express";
import http from "http";
import path from "path";
import cookieParser from "cookie-parser";
import { fileURLToPath } from "url";
import sqlite3 from "sqlite3"

const sql = sqlite3.verbose();

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);
const app = express();
const port = 3000;

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

let db = new sql.Database("./db/users.db", sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
  if (err) {
    console.log(err)
  }
})


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("index");
})

app.get("/sign-in", (req, res) => {
  res.render("sign-in")
})

app.get("/sign-up", (req, res) => {
  res.render("sign-up")
})

app.set("port", port)

const server = http.createServer(app);
server.listen(port);

export default app;
