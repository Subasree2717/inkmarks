
import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

const app = express();
const port = 3000;

// PostgreSQL DB connection
dotenv.config();

const db = new pg.Client({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false,
});
db.connect();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// EJS setup
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Helper: get books with optional sort
const getBooks = async (sortBy = "date_read") => {
  const validSorts = ["title", "rating", "date_read"];
  const sortColumn = validSorts.includes(sortBy) ? sortBy : "date_read";
  const result = await db.query(`SELECT * FROM books ORDER BY "${sortColumn}" DESC`);
  return result.rows;
};

// Routes
app.get("/", async (req, res) => {
  try {
    const sort = req.query.sort || "date_read";
    const books = await getBooks(sort);
    res.render("index", { books, sort });
  } catch (err) {
    console.error("Error loading books:", err);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/add", async (req, res) => {
  const { title, author, date_read, rating, notes, cover_id } = req.body;
  try {
    await db.query(
      "INSERT INTO books (title, author, date_read, rating, notes, cover_id) VALUES ($1, $2, $3, $4, $5, $6)",
      [title, author, date_read, rating, notes, cover_id || null]
    );
    res.redirect("/");
  } catch (err) {
    console.error("Error adding book:", err);
    res.status(500).send("Failed to add book.");
  }
});

app.post("/edit", async (req, res) => {
  const { id, title, author, date_read, rating, notes, cover_id } = req.body;
  try {
    await db.query(
      "UPDATE books SET title=$1, author=$2, date_read=$3, rating=$4, notes=$5, cover_id=$6 WHERE id=$7",
      [title, author, date_read, rating, notes, cover_id || null, id]
    );
    res.redirect("/");
  } catch (err) {
    console.error("Error updating book:", err);
    res.status(500).send("Failed to update book.");
  }
});

app.post("/delete", async (req, res) => {
  const { id } = req.body;
  try {
    await db.query("DELETE FROM books WHERE id = $1", [id]);
    res.redirect("/");
  } catch (err) {
    console.error("Error deleting book:", err);
    res.status(500).send("Failed to delete book.");
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
