CREATE OR ALTER PROCEDURE registerUsers(@user_id VARCHAR(100),@first_name VARCHAR(100),@last_name VARCHAR(100), @email VARCHAR(100), @hashed_pwd VARCHAR(200))
AS
BEGIN
INSERT INTO users(user_id, first_name, last_name, email, password)
VALUES(@user_id, @first_name, @last_name, @email, @hashed_pwd)
END