import yargs from 'yargs';
import { hideBin } from 'yargs/helpers'
import { readNote, getNotes, addNote, removeNote } from './notes.js'

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
        handler(argv) {
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
        handler(argv) {
            removeNote(argv.title)
        }
    })
    .command({
        command: 'list',
        describe: 'List command',
        handler() {
            console.log('Listing notes')
            getNotes()
        }
    })
    .command({
        command: 'read',
        describe: 'Read command',
        builder: {
            title: {
                describe: 'Note title',
                demandOption: true,
                type: 'string'
            }
        },        
        handler(argv) {
            console.log('Read note')
            readNote(argv.title)
        }
    })    
    .parse()

