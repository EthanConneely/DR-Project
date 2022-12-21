const app = express()
const bodyParser = require('body-parser')
const cors = require('cors');
const express = require('express')
const mongoose = require('mongoose');
const path = require("path");
const port = 4000

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(cors());
app.use(function (req, res, next)
{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(express.static(path.join(__dirname, "../build/")))
app.use("static", express.static(path.join(__dirname, "../build/static/")))

//mongodb+srv://admin:<password>@cluster0.8taek.mongodb.net/?retryWrites=true&w=majority
// getting-started.js
main().catch(err => console.log(err));
async function main()
{
    await mongoose.connect('mongodb+srv://admin:admin@cluster0.8taek.mongodb.net/?retryWrites=true&w=majority');
}

const bookSchema = new mongoose.Schema({
    title: String,
    cover: String,
    author: String
});

const bookModel = mongoose.model('asdsdgergae', bookSchema);

app.post('/api/books', (req, res) =>
{
    console.log(req.body);

    bookModel.create({
        title: req.body.title,
        cover: req.body.cover,
        author: req.body.author
    })

    res.send('Data Recieved');
})

app.get('/api/books', (req, res) =>
{
    bookModel.find((error, data) =>
    {
        res.json(data);
    })
})

// Delete the book
app.delete('/api/book/:id', (req, res) =>
{
    console.log(req.params.id);

    bookModel.findByIdAndDelete(req.params.id, (err, data) =>
    {
        if (err)
        {
            res.json(err);
        }
        else
        {
            res.json(data);
        }
    })
})

app.get('/api/book/:id', (req, res) =>
{
    console.log(req.params.id);
    bookModel.findById(req.params.id, (error, data) =>
    {
        res.json(data);
    })
})

app.put('/api/book/:id', (req, res) =>
{
    console.log("Update: " + req.params.id);

    bookModel.findByIdAndUpdate(req.params.id, req.body, { new: true },
        (error, data) =>
        {
            res.send(data);
        })
})

app.get('*', (req, res) =>
{
    bookModel.find((error, data) =>
    {
        res.sendFile(path.join(__dirname, "/../build/index.html"))
    })
})

app.listen(port, () =>
{
    console.log(`Example app listening on port ${port}`)
})
