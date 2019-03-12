const express = require('express');
const app = express();

app.get("/url", (req, res, next) => {
    res.json(["Tony", "Lisa", "Michael", "Ginger", "Food"]);
});

app.get('/', (req, res) => {
    res.send("Hello World")

});

app.post('/records/gender', (req, res) => {
  res.send("Post request to homepage")
})

app.post("/records", (req, res) => {
    const body = req.body;
})

app.listen(3000, () => {
    console.log("Server running on port 3000");

});


