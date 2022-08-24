import chalk from 'chalk';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers'

let command = process.argv[2]

yargs(hideBin(process.argv))
    .command({
        command: 'add',
        describe: 'Add command',
        builder: {
            title: {
                describe: 'Note title',
                demandOption: true,
                type: 'string'
            },
            body: {
                describe: 'Note body',
                demandOption: true,
                type: 'string'                
            }
        },
        handler: function (argv) {
            console.log(`Title: ${argv.title}, body: ${argv.body}`)
        }
    })
    .command({
        command: 'remove',
        describe: 'Remove command',
        handler: function () {
            console.log('Removing a note')
        }        
    })
    .command({
        command: 'read',
        describe: 'Read command',
        handler: function () {
            console.log('Reading a note')
        }        
    })
    .command({
        command: 'list',
        describe: 'List command',
        handler: function () {
            console.log('Listing notes')
        }        
    })        
    .parse()

// console.log(yargs(hideBin(process.argv)).parse())

if (command == 'add') {
    console.log('Adding note!')
} else if (command == 'remove') {
    console.log('Removing note!')
}