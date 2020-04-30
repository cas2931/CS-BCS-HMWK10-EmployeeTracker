DROP DATABASE IF EXISTS employeeTracker_db;
CREATE DATABASE employeeTracker_db; 
USE employeeTracker_db; 

CREATE TABLE department(
id  INT(25) AUTO_INCREMENT NOT NULL,
name VARCHAR(30), 
PRIMARY KEY (id)
);  

CREATE TABLE role( 
id INT(25) AUTO_INCREMENT NOT NULL, 
title VARCHAR (30),
salary decimal (6,4), 
dept_id int(25),
PRIMARY KEY (id),
FOREIGN KEY (dept_id) REFERENCES department(id)
);

CREATE TABLE  employee(  
id INT(25) AUTO_INCREMENT NOT NULL,
first_name VARCHAR (30),
last_name VARCHAR (30),
role_id int(25),
PRIMARY KEY (id),
FOREIGN KEY (role_id) REFERENCES role(id)
);