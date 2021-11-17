const express = require('express')
const app = express()
const cors = require('cors');
const port = 4000

app.use(cors());
const resultsRoutes = require('./controllers/router')
app.use('/results', resultsRoutes);

app.get('/', (req, res) => res.send('Server Homepage'))

app.listen(port, ()=>{
    console.log(`Express departing from http://localhost:${port}`)
})
