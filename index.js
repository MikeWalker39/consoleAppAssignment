const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const methods = require('./app.js');

app.use(bodyParser.json());

app.post('/records/gender', (req, res) => {
  res.send("Post request to homepage")
})

app.post("/records", (req, res) => {    
    const body = req.body;
    let compiledArray = methods.compileArray(body.records);
    let formattedRecords = methods.formatDateForConsole(compiledArray);

    console.log(formattedRecords);
    app.locals.records = formattedRecords;
});

app.get("/records/gender", (req, res) => {

    let sortedArray = methods.sortByGenderThenLastName(app.locals.records);
    res.json({
        "results": sortedArray
    });

});

app.listen(3000, () => {
    console.log("Server running on port 3000");

});
