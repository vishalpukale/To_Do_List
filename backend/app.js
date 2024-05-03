const express = require('express');
const app = express();
const cors = require('cors');

const port = 1000;
require('./connection/conn')
const auth = require('./routes/auth');
const list = require('./routes/list');

app.use(express.json())
app.use(cors())

app.get('/', (req, res)=>{
    res.send("Hello")
})

app.use('/api/v1', auth);
app.use('/api/v2', list);

app.listen(port, () => {
    console.log(`Server is Listening on port ${port}`);
})