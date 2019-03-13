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

/*
// below are testable chunks for json posts on postman

{
"records": "SMITH|JAMES|MALE|BLUE|12-09-1946|\nJOHNSON|JOHN|MALE|GREEN|11-04-1955|\nCARTER AMY FEMALE PURPLE 09-18-1964"
}

{
"records": "CAMPBELL PHIL MALE ORANGE 03-23-1961\nPARKER ALEX MALE PINK 06-17-1967\nMITCHELL LAURA FEMALE BLUE 04-15-1969\nPEREZ KATHERINE FEMALE ORANGE 09-30-1973"
}

{
"records": "STEWART,JIMMY,MALE,YELLOW,10-09-1958,\nSANCHEZ,GARY,MALE,PINK,07-18-1991,\nMORRIS,JANICE,FEMALE,BLUE,05-01-1983,\nROGERS,KRISSY,FEMALE,PINK,01-19-1977,"
}


*/