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
  db.query(`SELECT * FROM DEPARTMENT`, (err, result) => {
    if (err) {
      console.log(err);
      questions();
    } else {
      const roleChoices = addDepartment.map((department) => department.name);
      inquirer
        .prompt([
          {
            type: "input",
            name: "newTitle",
            message: "Whats the name of the new role?",
          },
          {
            type: "input",
            name: "newSalary",
            message: "How much does the new role make?",
          },
          {
            type: "list",
            name: "placeDepartment",
            message: "Which department does the role belong to?",
            choices: "roleChoices",
          },
        ])
        .then((results) => {
          const { roleTitle, roleSalary, department } = results;
          const chosenDepartment = doccuments.find(
            (dept) => dept.name === department
          );
          const departmentId = chosenDepartment.id;

          db.query(
            `INSERT INTO role (title, salary, department.id)`,
            [roleTitle, roleSalary, departmentId],
            (err, result) => {
              if (err) {
                console.log(err);
              }
              console.log(result);
              questions();
            }
          );
        });
    }
  });
}
function addEmployee() {
  db.query(`SELECT * FROM role`, (err, result) => {
    if (err) {
      console.log(err);
      questions();
    } else {
      const roleMap = roles.map((role) => role.title);
      db.query(`SELECT * FROM employee`, (err, result) => {
        if (err) {
          console.log(err);
          questions();
        } else {
          const employeeMap = employee.map(
            (employee) => `${employee.first_name} ${employee.last_name}`
          );
          inquirer
            .prompt([
              {
                type: "input",
                name: "firstname",
                message: "Whats the new employee first name?",
              },
              {
                type: "input",
                name: "lastname",
                message: "Whats the new employee last name?",
              },
              {
                type: "list",
                name: "role",
                message: "What is their role?",
                choices: roleMap,
              },
              {
                type: "list",
                name: "manager",
                message: "Who is their manager?",
                choices: employeeMap,
              },
            ])
            .then((result) => {
              const { first_name, last_name, role, manager } = result;
              const newRole = role.find((roleData) => roleData.title === role);
              const roleId = newRole;
              const theManager = employees.find((employeeData) => {
                const name = `${employeeData.first_name} ${employeeData.last_name}`;
                return name === manager;
              });
              db.query(
                "INSERT INTO employee (first_name, last_name, role_id, manager_id)",
                [first_name, last_name, roleId, theManager],
                (err, results) => {
                  if (err) {
                    console.log(err);
                  } else {
                    console.log(result);
                    questions();
                  }
                }
              );
            });
        }
      });
      questions();
    }
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

questions();
