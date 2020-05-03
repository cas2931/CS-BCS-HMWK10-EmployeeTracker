var mysql = require("mysql");
var inquirer = require("inquirer");  
var cTable = require('console.table'); 
var chalk = require('chalk');

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
      }) 
     
  }
    
  function viewDepts(){
   connection.query("SELECT * FROM department", function (err,results) {
     if (err) throw err; 
     console.table(results); 
     home(); 
   }) 
  } 

  function viewRoles(){
    connection.query("SELECT * FROM role",function (err,results) {
      if(err) throw err;
      console.table(results); 
      home(); 
    })
  } 

  function viewEmployees(){
    connection.query("SELECT * FROM employee", function (err, results) {
      if (err) throw err;
      console.table(results); 
      home();
    })
  } 

  function addDept(){
    inquirer
      .prompt({
       name:'deptName',
       type: 'input', 
       message: 'What is the name of your new department?'
     }) 
     .then(function(answer) {
       connection.query("INSERT into department SET ?", {name: answer.deptName}, function (err) {
        if (err) throw err;
        console.log(chalk.green("Your new department was added successfully!")); 
        home();
  }) 
}) 
  } 

  function addRole(){ 
    connection.query("SELECT * FROM department", function(err, res) {
      if (err) throw err;
    inquirer
      .prompt([
        {
          name:'title',
          type: 'input', 
          message: 'What is the title of your new role?' 
        }, 
        {
          name:'salary',
          type: 'input', 
          message: 'What is the salary of your new role?' 
        },  
        {
          name:'deptSelect',
          type: 'list', 
          message: 'Which department does this role fall under',
          choices: function () {
            let deptArr = [];
            for (let i = 0; i < res.length; i++) {
              deptArr.push(res[i].name);
              }
              return deptArr;
          },
      }
      ]).then(function(answer) { 
        let deptID;
      for (let j = 0; j < res.length; j++) {
        if (res[j].name === answer.deptSelect) {
            deptID = res[j].id;
        }
    } 
  connection.query("INSERT INTO role SET ?",
    {
        title: answer.title,
        salary: answer.salary,
        dept_id: deptID
    },
    function (err) {
        if(err)throw err;
        console.log(chalk.green("Your new role was added successfully!"));
        home();
    }
)
  })
    }) 
      } 
      
 function addEmployee(){
  connection.query("SELECT * FROM role", function (err, res) {
    if (err) throw err;
    
    inquirer
        .prompt([
            {
                name: "first_name",
                type: "input", 
                message: "First name of employee:",
            },
            {
                name: "last_name",
                type: "input", 
                message: "Last name of employee:"
              },
              {
                 name: "role", 
                 type: "list", 
                 message: "Role of employee:",
                 choices: function() {
                  var roleArr = [];
                  for (let i = 0; i < res.length; i++) {
                      roleArr.push(res[i].title);
                  }
                  return roleArr;
                  },
                  message: "What is this employee's role? "
              }
              ]).then(function (answer) {
                  let roleID;
                  for (let j = 0; j < res.length; j++) {
                  if (res[j].title == answer.role) {
                      roleID = res[j].id;
                  }                  
                  }  
                  connection.query(
                  "INSERT INTO employee SET ?",
                  {
                      first_name: answer.first_name,
                      last_name: answer.last_name,
                      role_id: roleID,
                  },
                  function (err) {
                      if (err) throw err;
                      console.log(chalk.green("Your employee has been added!"));
                      home();
                  }
                  )
              })
      })
  }
  //function UpdateEmplRole(){}