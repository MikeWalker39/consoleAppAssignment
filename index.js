const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const methods = require('./app.js');

app.use(bodyParser.json());

app.post("/records", (req, res) => {
    // convert data into array without delimiters
    let compiledArray = methods.compileArray(req.body.records);
    // convert dates from MM-DD-YYYY to requested format M/D/YYYY
    let formattedRecords = methods.formatDateForConsole(compiledArray);

    // add each record to array in memory
    for (let i = 0; i < formattedRecords.length; i++){
        methods.postmanArray.push(formattedRecords[i]);
    }

    // set local records
    app.locals.records = methods.postmanArray;

    // log to console
    console.log("ALL RECORDS", app.locals.records);
});

app.get('/records/birthdate', (req, res) => {
    // sort records by date
    let sortedArray = methods.sortByDate(app.locals.records);
    res.json({
        "results": sortedArray
    });
});

app.get("/records/gender", (req, res) => {
    // sort records
    let sortedArray = methods.sortByGenderThenLastName(app.locals.records);
    res.json({
        "results": sortedArray
    });
});

app.get("/records/name", (req, res) => {
    // sort records by last name a -> z
    let sortedArray = methods.sortByLastNameAscending(app.locals.records);
    res.json({
        "results": sortedArray
    });
});

app.get("/records/nameDescending", (req, res) => {
    // sort records by last name z -> a
    let sortedArray = methods.sortByLastNameDescending(app.locals.records);
    res.json({
        "results": sortedArray
    });
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
