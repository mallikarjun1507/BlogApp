const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Root",
  database: "blogdb", 
});

db.connect((err) => {
  if (err) {
    console.error("Database connection error:", err);
  } else {
    console.log("Database connection successful");

    
    const createUsersTable = `
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(50) NOT NULL UNIQUE,
        email VARCHAR(100) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    const createPostsTable = `
      CREATE TABLE IF NOT EXISTS posts (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        content TEXT NOT NULL,
        author_id INT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (author_id) REFERENCES users(id) ON DELETE SET NULL
      )
    `;

    db.query(createUsersTable, (err, result) => {
      if (err) {
        console.error("Error creating `users` table:", err);
      } else {
        console.log("`users` table is ready");

        // Now create `posts` table only after `users` table is ready
        db.query(createPostsTable, (err, result) => {
          if (err) {
            console.error("Error creating `posts` table:", err);
          } else {
            console.log("`posts` table is ready");
          }
        });
      }
    });
  }
});

module.exports = db;
