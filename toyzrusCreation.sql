DROP DATABASE IF EXISTS toyzrus;
CREATE DATABASE toyzrus;
USE toyzrus;

CREATE TABLE users (uId INT PRIMARY KEY NOT NULL,
password VARCHAR(40),
uName VARCHAR(40),
type VARCHAR(40));

CREATE TABLE items (itemId INT PRIMARY KEY NOT NULL,
itemName VARCHAR(40),
stock INT,
cost INT,
saleAmount INT);

CREATE TABLE orders (orderId INT PRIMARY KEY NOT NULL,
uId INT,
itemId INT,
status VARCHAR(20),
quantity INT);