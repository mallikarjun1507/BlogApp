
Project Setup & Run Instructions – BlogApp
Tech Stack
Frontend: React (Vite)
Backend: Node.js + Express
Database: MySQL

----Create MySQL Database------------
--Open MySQL  (MySQL Workbench)----

Create a database and required tables.:

CREATE DATABASE blogdb;

USE blogdb;

CREATE TABLE posts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255),
  content TEXT,
  author VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


--Create a .env file in the backend/ directory:----=

PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=Root
DB_NAME=blogdb


 -------Clone the Repository----------
 
git clone https://github.com/mallikarjun1507/BlogApp.git
cd BlogApp
code .

--Backend Setup (/backend)--
--aInstall Dependencies--

cd backend
npm install

 -----Start the Backend Server------
node server.js

---- Frontend Setup (/client)--
---- Install Dependencies---
cd ../client
npm install

---Start the Frontend----
npm run dev
