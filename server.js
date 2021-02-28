const express = require('express');
const app = express();
const path = require('path');

const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

let tables = [];
let waitlist = [];

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, "home.html"));
})

app.get('/tables', function(req, res) {
    res.sendFile(path.join(__dirname, "tables.html"));
})

app.get('/reserve', function(req, res) {
    res.sendFile(path.join(__dirname, "reserve.html"));
})

/////////////arrays/////////////////////////
app.get('/api/tables', function(req, res) {
    res.json(tables);
})

app.get('/api/waitlist', function(req, res) {
    res.json(waitlist);
})

///////////////save info////////////////////
app.post('/api/tables', function(req, res) {
    if (tables.length < 5) {
        tables.push(req.body);
        res.send("tables");
    } else {
        waitlist.push(req.body)
        res.send("waitlist");
    }
});

app.listen(PORT, () => console.log(`Server is listening on PORT: ${PORT}`));