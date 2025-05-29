
DROP TABLE IF EXISTS books;

CREATE TABLE books (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255),
    date_read DATE,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    notes TEXT,
    cover_id INTEGER
);

-- Sample seed data
INSERT INTO books (title, author, date_read, rating, notes, cover_id)
VALUES
('Atomic Habits', 'James Clear', '2023-07-01', 5, 'Practical tips on habit formation.', 10512345),
('Deep Work', 'Cal Newport', '2023-08-10', 4, 'Focused work increases productivity.', 10293847);
