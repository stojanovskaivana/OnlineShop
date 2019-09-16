const usersTable = `
CREATE TABLE IF NOT EXISTS users(
id INT(10) NOT NULL AUTO_INCREMENT,
firstName VARCHAR(45) NOT NULL,
lastName VARCHAR(45) NOT NULL,
adressa VARCHAR(45) NOT NULL,
email VARCHAR(45) NOT NULL,
phoneNumber VARCHAR(25),
username VARCHAR(45) NOT NULL,
password VARCHAR(128) NOT NULL,
created_on VARCHAR(128),
PRIMARY KEY (id)
)`;

  const product = `
 CREATE TABLE IF NOT EXISTS product(
 id INT(10) NOT NULL AUTO_INCREMENT,
 name VARCHAR(128) NOT NULL,
 description  VARCHAR(255) NOT NULL,
 price DECIMAL(10,2) NOT NULL,
 userID INT(10),
 FOREIGN KEY (userID) REFERENCES users(id),
 title VARCHAR(255) NOT NULL,
 PRIMARY KEY (id)
 )`;


const category = `
CREATE TABLE IF NOT EXISTS category(
  id INT(10) NOT NULL AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  productID INT(10) NOT NULL,
  FOREIGN KEY (productID) REFERENCES product(id),
  PRIMARY KEY (id)
 
 )`;


 const creditCard = `
 CREATE TABLE IF NOT EXISTS creditCard(
  id INT(10) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (id),
 cardNumber INT (255) NOT NULL,
 created_on VARCHAR(25)  NOT NULL,
 userID INT(10),
 FOREIGN KEY (userID) REFERENCES users(id) 
)`;

const orders = `
CREATE TABLE IF NOT EXISTS orders(
  id INT(10) NOT NULL AUTO_INCREMENT,
  dateOrdered VARCHAR(25) NOT NULL,
  PRIMARY KEY(id),
  usersID INT(10),
  FOREIGN KEY (usersID) REFERENCES users(id),
  creditCardID INT(10),
  FOREIGN KEY (creditCardID) REFERENCES creditCard(id),
  productID INT(10) NOT NULL,
  FOREIGN KEY (productID) REFERENCES product(id)
)`;

export default {
    usersTable,
    product,
    creditCard,
    category,
    orders
};