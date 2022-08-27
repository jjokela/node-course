import express from 'express'
// ES needs this
import path from 'path';
import { fileURLToPath } from 'url';
import hbs from 'hbs'

// works only in require()
//console.log(__dirname)
//console.log(__filename)

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// now this works with ES
console.log(__dirname)
console.log(__filename)

const pathToPublic = path.join(__dirname, '../public')
console.log(`Path to public: ${pathToPublic}`)

const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

const app = express()
const port = 3000

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static('public'))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather app',
        name: 'Isi-3000'
    })
})

app.get('/weather', (req, res) => {
    
    if(!req.query.address) {
        return res.send({
            error: 'Address must be provided'
        })
    }
    
    const result = {
        address: req.query.address,
        location: 'loc',
        forecast: 'fc'
    }
    res.send(result)
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Isi-3000'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        message: 'Need elp? Got yelp!',
        name: 'Isi-3000'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: 'Page not found :('
    })
})

app.listen(port, () => {
    console.log(`Express server running on port ${port}`)
})

