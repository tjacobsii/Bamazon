DROP DATABASE IF EXISTS bamazonDB;

CREATE DATABASE bamazonDB;

USE bamazonDB;

CREATE TABLE products (
  id INT NOT NULL AUTO_INCREMENT,
  product VARCHAR(35) NOT NULL,
  department_name VARCHAR(35) NOT NULL,
  price decimal(6,2) NOT NULL,
  stock_quantity INTEGER(10) NOT NULL,
  
  PRIMARY KEY (id)
);

SELECT * FROM products;