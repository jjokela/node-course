import validator from 'validator';
// const validator = require('validator')
import chalk from 'chalk';
import {getNotes} from './notes.js'
// getNotes = require('./notes')

var result = getNotes();
console.log(result);

console.log(validator.isEmail('j.jokela@foo.com'));

console.log(chalk.green('Hello There!!'));

// add = require('./utils')

// console.log(name)

// result = add(1, 2)
// console.log(result)


// const fs = require('fs')


// fs.writeFileSync('notes.txt', 'This file was created by NodeJS!')

// fs.appendFileSync('notes.txt', 'Raippatirallaa!')