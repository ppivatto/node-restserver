require('./config/config');

const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.get('/', function (req, res) {
    res.json('Hello World')
})

app.get('/usuario', function (req, res) {
    res.json('get User')
})

app.get('/usuario/:id', function (req, res) {
    let id = req.params.id;
    res.json({
        id
    })
})

app.post('/usuario', function (req, res) {
    let { body } = req;
    
    if (!body.nombre) {
        res.status(400).json({
            ok: false,
            mensaje: 'El nombre es necesario'
        })
    } else {
        res.json({
            persona: body
        })
    }
})

app.put('/usuario', function (req, res) {
    res.json('put usuario')
})

app.delete('/usuario', function (req, res) {
    res.json('delete usuario')
})

app.listen(process.env.PORT, () => {
    console.log('Escuchando el puerto:', process.env.PORT)
})