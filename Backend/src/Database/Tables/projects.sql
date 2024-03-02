CREATE TABLE users(
    user_id VARCHAR(50) NOT NULL PRIMARY KEY, 
    first_name VARCHAR(50) NOT NULL, 
    last_name VARCHAR(50) NOT NULL, 
    email VARCHAR(100) NOT NULL UNIQUE, 
    password VARCHAR(250) NOT NULL,
    is_deleted BIT DEFAULT 0,
    is_welcomed BIT DEFAULT 0
);