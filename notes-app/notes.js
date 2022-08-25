import fs from 'fs'
import chalk from 'chalk'

function getNotes() {
    return loadNotes()
}

function removeNote(title) {
    let notes = loadNotes()
    let notesToKeep = notes.filter(function (note) {
        return note.title !== title
    })

    if (notes.length > notesToKeep.length) {
        saveNotes(notesToKeep)
        console.log(chalk.green.inverse('Removed stuff'))
    } else {
        console.log(chalk.red.inverse('Note not found, cannot remove'))
    }
}

function addNote(title, body) {
    let notes = loadNotes()

    let duplicateNotes = notes.filter(function (note) {
        return note.title === title
    })

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

export { getNotes, addNote, removeNote };