const inquirer = require('inquirer');
const fs = require('fs');

const questions = [
    {
        type: 'input',
        message: 'Title:',
        name: 'title',
    },
    {
        type: 'input',
        message: 'Description:',
        name: 'description',
    },
    {
        type: 'input',
        message: 'Installation:',
        name: 'installation',
    },
    {
        type: 'input',
        message: 'Usage:',
        name: 'usage',
    },
    {
        type: 'list',
        message: 'License:',
        choices: ['MIT', 'ISC', 'Apache license 2.0'],
        name: 'license',
    },
    {
        type: 'input',
        message: 'How to Contribute:',
        name: 'contribute',
    },
    {
        type: 'input',
        message: 'Tests:',
        name: 'tests',
    },
    {
        type: 'input',
        message: 'Email:',
        name: 'email',
    },
    {
        type: 'input',
        message: 'Github:',
        name: 'github',
    },
];