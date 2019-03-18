const express = require('express');
const server = express();
const bodyParser = require('body-parser');
const methods = require('./app.js');

server.use(bodyParser.json());

server.post("/records", (req, res) => {
    // convert data into array without delimiters
    let compiledArray = methods.compileArray(req.body.records);
    // convert dates from MM-DD-YYYY to requested format M/D/YYYY
    let formattedRecords = methods.formatDateForConsole(compiledArray);

    if (!server.locals.records) server.locals.records = [];      
    
    // set local records
    server.locals.records.push(...formattedRecords);

    // log to console
    console.log("ALL RECORDS", server.locals.records);
});

server.get('/records/birthdate', (req, res) => {
    // sort records by date
    let sortedArray = methods.sortByDate(server.locals.records);
    res.json({
        "results": sortedArray
    });
});

server.get("/records/gender", (req, res) => {
    // sort records
    let sortedArray = methods.sortByGenderThenLastName(server.locals.records);
    res.json({
        "results": sortedArray
    });
});

server.get("/records/name", (req, res) => {
    // sort records by last name a -> z
    let sortedArray = methods.sortByLastNameAscending(server.locals.records);
    res.json({
        "results": sortedArray
    });
});

server.get("/records/nameDescending", (req, res) => {
    // sort records by last name z -> a
    let sortedArray = methods.sortByLastNameDescending(server.locals.records);
    res.json({
        "results": sortedArray
    });
});

server.listen(3000, () => {
    console.log("Server running on port 3000");
});

module.exports = server;
