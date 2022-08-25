import chalk from 'chalk';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers'
import { getNotes, addNote, removeNote } from './notes.js'

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
            addNote(argv.title, argv.body);
        }
    })
    .command({
        command: 'remove',
        describe: 'Remove command',
        builder: {
            title: {
                describe: 'Note title',
                demandOption: true,
                type: 'string'
            }
        },
        handler: function (argv) {
            removeNote(argv.title)
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
            console.log(getNotes())
        }        
    })        
    .parse()

