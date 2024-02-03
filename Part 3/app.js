const express = require('express');
const path = require("path");
const app = express();
const port = 2000;
const templates = path.join(__dirname ,  '/template');

app.use(express.static(path.join(__dirname, 'public')));

app.get("/", (req, res) => {
    res.sendFile(path.join(templates ,"/index.html"));
});


app.listen(port, () => {
    console.log("Server is Running on port " + port);
});