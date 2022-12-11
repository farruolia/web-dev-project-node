const express = require('express');
const app = express();

app.get('/', (req, res) =>
    res.send('Hello World!'));

app.get('/hello', (req, res) =>
    res.send('Hello World!'));

const PORT = 4000;
app.listen(PORT);
