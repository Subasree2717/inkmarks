# 📚 Book Notes App

This is a personal book notes app inspired by [Derek Sivers' book list](https://sive.rs/book). It allows you to record, view, and manage notes for non-fiction books you've read. Built with Node.js, Express, PostgreSQL, and EJS.

## 🚀 Features

- Add, update, and delete books
- Store notes, rating, author, read date, and Open Library cover ID
- View covers using Open Library Covers API
- Sort by title, rating, or date read

## 🛠 Tech Stack

- Node.js + Express.js
- PostgreSQL
- EJS templating
- HTML/CSS/JavaScript (vanilla)
- Axios (optional for future API requests)

## 📦 Installation

1. Clone the repo:

```bash
git clone https://github.com/your-username/book-notes-app.git
cd book-notes-app
```

2. Install dependencies:

```bash
npm install
```

3. Create the database:

In psql:

```sql
CREATE DATABASE world;
\c world
-- Then run the contents of queries.sql to set up the books table and seed data
```

Or use:

```bash
psql -U postgres -d world -f queries.sql
```

4. Start the server:

```bash
nodemon index.js
```

Then go to [http://localhost:3000](http://localhost:3000)

## 📁 File Structure

- `index.js` – Express server
- `queries.sql` – SQL schema & seed data
- `views/index.ejs` – Main template
- `public/css/styles.css` – Styles

## 📸 Screenshot

![screenshot](docs/screenshot.png) _(optional)_

## 🙌 Credits

Inspired by Derek Sivers' site: https://sive.rs/book  
Built as a capstone project idea from a web development course.