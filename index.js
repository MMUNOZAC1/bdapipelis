const express = require('express')
const { getConnection } = require('./config/bd')
// require('dotenv').config()


const app = express()
const port = 5000;

getConnection();

app.use(express.json());

app.use('/director', require('./routes/director'))
app.use('/genero', require('./routes/genero'))
app.use('/media', require('./routes/media'))
app.use('/productora', require('./routes/productora'))
app.use('/tipo', require('./routes/tipo'))



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})