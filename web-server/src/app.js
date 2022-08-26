import express from 'express'
// ES needs this
import path from 'path';
import { fileURLToPath } from 'url';

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

const app = express()
const port = 3000

app.use(express.static('public'))

app.get('/weather', (req, res) => {
    
    const result = {
        location: 'loc',
        forecast: 'fc'
    }
    
    res.send(result)
})

app.listen(port, () => {
    console.log(`Express server running on port ${port}`)
})

