CREATE DATABASE chat;

USE chat;

CREATE TABLE messages (
  ID INT NOT NULL AUTO_INCREMENT,
  USERID INT NOT NULL,
  username VARCHAR(25) NOT NULL,
  message VARCHAR(255) NOT NULL,
  roomname VARCHAR(50),
  PRIMARY KEY(id)
  /* Describe your table here.*/
);

CREATE TABLE users (
  id INT NOT NULL AUTO_INCREMENT,
  username VARCHAR(50) NOT NULL,
  PRIMARY KEY (id)
);



/* Create other tables and define schemas for them here! */




/*  Execute this file from the command line by typing:
*  mysql -u root -p
*  use chat 
*  describe  

 *    populate database :
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/

