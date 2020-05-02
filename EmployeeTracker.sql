DROP DATABASE IF EXISTS employeeTracker_db;
CREATE DATABASE employeeTracker_db; 
USE employeeTracker_db; 

CREATE TABLE department(
id INT AUTO_INCREMENT,
name VARCHAR(30) NOT NULL, 
PRIMARY KEY (id)
);  

CREATE TABLE role( 
id INT AUTO_INCREMENT NOT NULL, 
title VARCHAR (30),
salary DECIMAL(7,2), 
dept_id INT NOT NULL,
PRIMARY KEY (id),
FOREIGN KEY (dept_id) REFERENCES department(id)
);

CREATE TABLE  employee(  
id INT(25) AUTO_INCREMENT NOT NULL,
first_name VARCHAR (30) NOT NULL,
last_name VARCHAR (30) NOT NULL,
role_id INT NOT NULL,
PRIMARY KEY (id),
FOREIGN KEY (role_id) REFERENCES role(id),
manager_id INT, 
FOREIGN KEY (manager_id) REFERENCES employee(id)
);