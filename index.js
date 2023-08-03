const inquirer = require("inquirer");
const fs = require("fs");

const questions = [
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
];
