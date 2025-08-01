const mysql = require("mysql2");
require('dotenv').config();

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT || 3306,
});

db.connect((err) => {
  if (err) {
    console.error("Database connection error:", err);
  } else {
    console.log("Database connection successful");

    const createDatabase = `
      CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME}\`
      DEFAULT CHARACTER SET utf8mb4
      COLLATE utf8mb4_0900_ai_ci;
    `;

    db.query(createDatabase, (err) => {
      if (err) {
        console.error("Error creating database:", err);
        return;
      }

      // Switch to the new database
      db.changeUser({ database: process.env.DB_NAME }, (err) => {
        if (err) {
          console.error("Error changing to database:", err);
          return;
        }

        console.log(`Using database: ${process.env.DB_NAME}`);

        const createUsersTable = `
          CREATE TABLE IF NOT EXISTS users (
            id INT AUTO_INCREMENT PRIMARY KEY,
            username VARCHAR(50) NOT NULL UNIQUE,
            email VARCHAR(100) NOT NULL UNIQUE,
            password VARCHAR(255) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
          );
        `;

        const createPostsTable = `
          CREATE TABLE IF NOT EXISTS posts (
            id INT AUTO_INCREMENT PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            content TEXT NOT NULL,
            author_id INT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (author_id) REFERENCES users(id) ON DELETE SET NULL
          );
        `;

        const createPhotosTable = `
          CREATE TABLE IF NOT EXISTS photos (
            id INT AUTO_INCREMENT PRIMARY KEY,
            title VARCHAR(255),
            description TEXT,
            imageUrl VARCHAR(255),
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
          );
        `;

        db.query(createUsersTable, (err) => {
          if (err) console.error("Error creating `users` table:", err);
          else console.log("`users` table is ready");
        });

        db.query(createPostsTable, (err) => {
          if (err) console.error("Error creating `posts` table:", err);
          else console.log("`posts` table is ready");
        });

        db.query(createPhotosTable, (err) => {
          if (err) console.error("Error creating `photos` table:", err);
          else console.log("`photos` table is ready");
        });
      });
    });
  }
});

module.exports = db;
