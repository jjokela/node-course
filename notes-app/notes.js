import fs from 'fs'
import chalk from 'chalk'

function getNotes() {       
    let notes = loadNotes()

    console.log(chalk.white.inverse(`Your notes`))

    notes.forEach((note) => {
        console.log(chalk.green.inverse(`Title: ${note.title}`))
        console.log(chalk.blue.inverse(`Body: ${note.body}`))
    })
}

function removeNote(title) {
    let notes = loadNotes()
    let notesToKeep = notes.filter((note) => note.title !== title)

    if (notes.length > notesToKeep.length) {
        saveNotes(notesToKeep)
        console.log(chalk.green.inverse('Removed stuff'))
    } else {
        console.log(chalk.red.inverse('Note not found, cannot remove'))
    }
}

function addNote(title, body) {
    let notes = loadNotes()

    let duplicateNotes = notes.filter((note) => note.title === title)

    if (duplicateNotes.length === 0) {
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log('Saved note!')
    } else {
        console.log('Note title already exists')
    }
}

function saveNotes(notes) {
    let dataJson = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJson)
}

function loadNotes() {
    if (fs.existsSync('notes.json')) {
        let dataBuffer = fs.readFileSync('notes.json')
        return JSON.parse(dataBuffer.toString())
    } else {
        return []
    }
}

function readNote(title) {
    let notes = loadNotes()
    let note = notes.find((note) => note.title === title)

    if(note) {
        console.log(chalk.green.inverse(`Title: ${note.title}`))
        console.log(chalk.blue.inverse(`Body: ${note.body}`))
    } else {
        console.log(chalk.green.red.inverse('Note not found!'))
    }
}

export { readNote, getNotes, addNote, removeNote };