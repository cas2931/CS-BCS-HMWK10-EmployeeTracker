var mysql = require("mysql");
var inquirer = require("inquirer");  
var cTable = require('console.table');

require('dotenv').config();

var connection = mysql.createConnection({
    host: process.env.HOST,
  
    port: process.env.PORT,
  
    user: process.env.USER,
  
    password: process.env.SQL_PW,
    database: "employeeTracker_db"
  }); 

  connection.connect(function(err) {
    if (err) throw err;
    // run the start function after the connection is made to prompt the user
     home();
  }); 
function home() {
    inquirer
    .prompt({
      name: "home",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "View all departments",
        "View all roles", 
        "View all employees",
        "Add department",
        "Add role",
        "Add employee", 
        "Update employee role", 
        "eXit"
      ]
    }) 
    .then(function(answer) {
        switch (answer.home) {
        case "View all departments":
          viewDepts();
          break;
  
        case "View all roles":
          viewRoles();
          break;
  
        case "View all employees":
          viewEmployees();
          break;
  
        case "Add department":
          addDept();
          break;
  
        case "Add role":
          addRole();
          break;

        case "Add employee":
         addEmployee();
         break; 

        case "Update employee role":
         UpdateEmplRole();
         break; 

        case "eXit":
        connection.end();
        break;
        }
      });
  }
  function viewDepts(){} 
  function viewRoles(){} 
  function viewEmployees(){} 
  function addDept(){} 
  function addRole(){} 
  function addEmployee(){} 
  function UpdateEmplRole(){}