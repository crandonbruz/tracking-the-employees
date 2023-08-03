const inquirer = require("inquirer");
const fs = require("fs");
const mysql = require("mysql2");

const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "rootroot",
    database: "employees_db",
  },
  console.log(`Connected to the employees_db database.`)
);

const questions = () => {
  inquirer.prompt([
    {
      type: "list",
      message: "What would you like to do today?",
      name: "selectActivity",
      choices: [
        "view all departments",
        "view all roles",
        "view all employees",
        "add a department",
        "add a role",
        "add an empoyee",
        "update an employee role",
      ],
    },
  ]);
  .then((answers) => {
    const {choices} = answers;

    if (choices === "view all departments"){
        viewAllDepartments();
    }
    if (choices === "view all roles"){
        viewAllRoles();
    }
    if (choices === "view all employees"){
        viewAllEmloyees();
    }
    if (choices === "add a department"){
        addDepartment();
    }
    if (choices === "add a role"){
        addRoles();
    }
    if (choices === "add an employee"){
        addEmployee();
    }
    if (choices === "update an employee role"){
        updateEmployeeRole();
    }
  })
};

function viewAllDepartments() {
  db.query("select * from department;", function (err, data) {});
}
