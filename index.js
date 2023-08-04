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
  inquirer
    .prompt([
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
          "add an employee",
          "update an employee role",
        ],
      },
    ])
    .then((result) => {
      const { selectActivity } = result;

      if (selectActivity === "view all departments") {
        viewAllDepartments();
      }
      if (selectActivity === "view all roles") {
        viewAllRoles();
      }
      if (selectActivity === "view all employees") {
        viewAllEmployees();
      }
      if (selectActivity === "add a department") {
        addDepartment();
      }
      if (selectActivity === "add a role") {
        addRoles();
      }
      if (selectActivity === "add an employee") {
        addEmployee();
      }
      if (selectActivity === "update an employee role") {
        updateEmployeeRole();
      }
    });
};

function viewAllDepartments() {
  db.query("select * from department;", (err, result) => {
    if (err) {
      console.log(err);
    }
    console.table(result);
    questions();
  });
}
function viewAllRoles() {
  db.query(
    `SELECT role.id, role.title, role.salary, department.name AS department
    FROM role
    LEFT JOIN department ON role.department_id = department.id
    `,
    (err, result) => {
      if (err) {
        console.log(err);
      }
      console.log(result);
      questions();
    }
  );
}
function viewAllEmployees() {
  db.query(
    `SELECT
    employee.id,
    employee.first_name,
    employee.last_name,
    role.title AS job.title,
    department.name AS department,
    role.salary,
    manager.last_name AS manager
    FROM employee
    LEFT JOIN role ON employee.role_id = role.id
    LEFT JOIN department ON role.department_id = department.id
    LEFT JOIN employee AS manager ON employee.manager_id = manager.id
    `,
    (err, result) => {
      if (err) {
        console.log(err);
      }
      console.log(result);
      questions();
    }
  );
}
function addDepartment() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "newDepartment",
        message: "What is the name of the new department?",
      },
    ])
    .then((result) => {
      const { newDepartment } = result;
    });
  db.query(`INSERT INTO department (name)`, [newDepartment], (err, result) => {
    if (err) {
      console.log(err);
    }
    console.log(result);
    questions();
  });
}
function addRoles() {
  db.query(`DELETE FROM course_names WHERE id = ?`, 3, (err, result) => {
    if (err) {
      console.log(err);
    }
    console.log(result);
    questions();
  });
}
function addEmployee() {
  db.query(`DELETE FROM course_names WHERE id = ?`, 3, (err, result) => {
    if (err) {
      console.log(err);
    }
    console.log(result);
    questions();
  });
}

function updateEmployeeRole() {
  db.query(`DELETE FROM course_names WHERE id = ?`, 3, (err, result) => {
    if (err) {
      console.log(err);
    }
    console.log(result);
    questions();
  });
}
