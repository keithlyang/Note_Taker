const { json } = require("body-parser");
const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({extended: true}));
app.use(express.json())
app.use(express.static("public"))

app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'))
})

app.get('/api/notes', (req, res) => {
    fs.readFile('./db/db.json', (err, data) => {
        if(err) throw err;
        console.log(JSON.parse(data))
        res.json(JSON.parse(data))
    })
})

app.post("/api/notes", (req, res) => {
    fs.readFile('./db/db.json', (err, data) => {
        if(err) throw err;
        let dbArr = JSON.parse(data)
        req.body["id"] = Math.floor(Math.random() *12353123123)
        dbArr.push(req.body)

        fs.writeFileSync("./db/db.json", JSON.stringify(dbArr))
        res.json(dbArr)
    })
})

app.delete("/api/notes/:id", (req, res) => {
    console.log(req.params.id)
    fs.readFile('./db/db.json', (err, data) => {
        if(err) throw err;
        let dbArr = JSON.parse(data)
        
        for(i=0; i<dbArr.length; i++){
            if(dbArr[i].id == req.params.id){
                dbArr.splice(i, 1)
            }
        }

        fs.writeFileSync("./db/db.json", JSON.stringify(dbArr))
        res.json(dbArr)
    })
})

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'))
})

app.listen(PORT, ()=> {
    console.log(`API server is active on port http://localhost:${PORT}!`)
})