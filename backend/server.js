const bodyParser = require('body-parser')
const cors = require('cors');
const express = require('express')
const mongoose = require('mongoose');
const path = require("path");

const app = express()
const port = 4000

// Get rid of annoying warning
mongoose.set('strictQuery', true);

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// For cors when develiping
app.use(cors());
app.use(function (req, res, next)
{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Mongo connection url
const mongoUsername = "Ethan"
const mongoPass = "ghjk"
const mongodbUri = `mongodb+srv://${mongoUsername}:${mongoPass}@cluster0.n4grbrf.mongodb.net/?retryWrites=true&w=majority`;

const db = mongoose.createConnection(mongodbUri);

const notesDB = db.useDb("notesDB")

const noteSchema = new mongoose.Schema({
    title: String,
    emoji: String,
    banner: String,
    lines: String,
});

const noteModel = notesDB.model('pages', noteSchema);

// Start listening for connections
app.listen(port, () =>
{
    console.log(`Notes app listening on port ${port}`)
})

// Get all the notes stored in a database
app.get('/api/notes', (req, res) =>
{
    noteModel.find((error, data) =>
    {
        res.json(data);
    })
})

// Get a single note page from an id
app.get('/api/note/:id', (req, res) =>
{
    noteModel.findById(req.params.id, (error, data) =>
    {
        res.json(data);
    })
})

// Update a note page with an id
app.put('/api/note/:id', (req, res) =>
{
    console.log("update", req.body);
    noteModel.findByIdAndUpdate(req.params.id, req.body, { new: true },
        (error, data) =>
        {
            res.send(data);
        })
})

// Create new note page
app.post('/api/notes', async (req, res) =>
{
    // Pick a random default emoji
    const emojis = ["📒", "🎨", "🎮", "🏠"]
    let t = await noteModel.create({
        title: "New Note",
        emoji: emojis[Math.floor(Math.random() * emojis.length)],
        banner: "https://wallpapercave.com/wp/KPZGQrc.jpg",
        lines: "✨ Enter notes here! ✨"
    })

    res.send(t.toJSON());
})

// For serving the build files
app.use(express.static(path.join(__dirname, "../frontend/build/")))
app.use("static", express.static(path.join(__dirname, "../frontend/build/static/")))
app.get('*', (req, res) =>
{
    noteModel.find((error, data) =>
    {
        res.sendFile(path.join(__dirname, "/../frontend/build/index.html"))
    })
})

app.delete('/api/note/:id', (req, res) =>
{
    console.log(req.params.id);

    noteModel.findByIdAndDelete(req.params.id, (err, data) =>
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
