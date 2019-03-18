const fs = require('fs');

var postmanArray = [];

readSortLogToConsole();

function readSortLogToConsole() {
    try {
        // get the file names
        const filenames = process.argv.splice(2);

        let masterArray = [];

        // go through each file, format data so we can sort and display it
        filenames.forEach(file => {
            // get the data
            const data = fs.readFileSync(file, 'utf8');
            // split the strings into an array of strings

            let cleanArr = compileArray(data);

            // add the cleaned array to master array
            masterArray.push(cleanArr);

        });

        // flatten to arrays within one parent array
        masterArray = masterArray.flat(1);

        // format date
        formatDateForConsole(masterArray);

        // log results
        console.log("SORTED BY GENDER, THEN LAST NAME A -> Z");
        console.log(sortByGenderThenLastName(masterArray));
        console.log("       **************************************");

        console.log("SORTED BY AGE, OLDEST TO YOUNGEST");
        console.log(sortByDate(masterArray));
        console.log("       **************************************");

        console.log("SORTED BY LAST NAME, Z -> A")
        console.log(sortByLastNameDescending(masterArray));

        return masterArray;
    } catch (e) {
        console.log('Error:', e.stack);
    }
}
 
function compileArray(inData) {
    // split data into array at the end of each line
    const arr = inData.split('\n');

    // go through the strings, cut out suffixes
    const cleanArr = arr.map(function (el) {

        // create a specialChar to replace commas, pipes or spaces in each object
        let specialChar;
        specialChar = el.indexOf(',') > -1 ? "," : null;
        specialChar = el.indexOf('|') > -1 ? "|" : specialChar;
        specialChar = el.indexOf(' ') > -1 ? " " : specialChar;

        // split array by the delimiter
        el = el.split(specialChar);
        // remove non-informational values
        let lastItem = el[el.length - 1];
        if (lastItem === "\\" || lastItem === "") el.pop();

        // here, we have five pieces of info about the element, so make an object
        let entry = {
            'first_name': el[1],
            'last_name': el[0],
            'gender': el[2],
            'fav_color': el[3],
            'dob': el[4]
        }

        return entry;
    });

    return cleanArr;
}

// this method with remove zeroes in day and month of date string going from 03-07-1979 to 3/7/1979
function formatDateForConsole(inArray) {
    inArray.forEach(el => {
        // pop date string from end of array
        let date = el.dob;

        // get rid of dashes
        date = date.split('-');

        // get day, month, year
        let month = date[0];
        let day = date[1];
        let year = date[2];

        // get first digits of month and day
        let firstDigitOfMonth = month[0];
        let firstDigitOfDay = day[0];
        let secondDigitOfDay = day[1];

        // check for preceding zeroes in month and day strings.  If found, reset string to just the second digit
        //   (e.g. '07' becomes '7' for July)
        if (firstDigitOfMonth == '0') month = month[1];
        if (firstDigitOfDay == '0') day = secondDigitOfDay;

        let formattedDate = month + "/" + day + "/" + year;

        // add the new date string to the end of the array
        el.dob = formattedDate;
    });

    return inArray;
}


// this method sorts rows by gender (females first), then by last name a - z
function sortByGenderThenLastName(inArray) {
    // create empty arrays that we will add to
    let femaleArray = [];
    let maleArray = [];

    // separate the data by gender
    inArray.forEach(el => {
        let currentGender = el.gender;

        if (currentGender === "FEMALE") {
            femaleArray.push(el);
        } else maleArray.push(el);
    });

    // sort female array by last name
    femaleArray = sortByLastNameAscending(femaleArray);

    // sort male array by last name
    maleArray = sortByLastNameAscending(maleArray);

    // concatenate male and female array, females first
    const joinedSortedArray = femaleArray.concat(maleArray);
    console.log("JOINED", joinedSortedArray)

    // return
    return joinedSortedArray;
};

// this method sorts data rows by last name a -> z
function sortByLastNameAscending(inData) {
    // sort male array by last name
    inData.sort(function (a, b) {
        let lastName1 = a.last_name;
        let lastName2 = b.last_name;

        // sort returns boolean values, so compare the names and set which one should go first
        return lastName1 > lastName2 ? 1 : -1;
    });

    return inData;
}

// this method sorts data rows by last name z -> a
function sortByLastNameDescending(inData) {
    // sort male array by last name
    inData.sort(function (a, b) {
        let lastName1 = a.last_name;
        let lastName2 = b.last_name;

        // sort returns boolean values, so compare the names and set which one should go first
        return lastName1 < lastName2 ? 1 : -1;
    });

    return inData;
}

// this method sorts by data, earliest first
function sortByDate(inData) {
    inData.sort(function (a, b) {
        let firstDate = a.dob;
        let firstYear = firstDate.slice(-4);

        let secondDate = b.dob;
        let secondYear = secondDate.slice(-4);

        if (firstYear === secondYear) {
            // if here the years are the same, so check month
            let firstMonth = firstDate.slice(0, 2);
            let secondMonth = secondDate.slice(0, 2);

            if (firstMonth == secondMonth) {
                // if here, months are the same, so check day
                let firstDay = firstDate.slice(firstDate.indexOf('-') + 1, firstDate.indexOf('-') + 3);
                let secondDay = secondDate.slice(secondDate.indexOf('-') + 1, secondDate.indexOf('-') + 3);

                // if they're the same day, just return zero
                if (firstDay == secondDay) return 0;

                // return the earlier day
                return firstDay < secondDay ? 1 : -1;

            } else {
                // if here return the earlier month
                return firstMonth < secondMonth ? 1 : -1;
            }

        } else {
            // return the earlier year first
            return firstYear > secondYear ? 1 : -1;
        }
    });

    // return
    return inData;
}

var methods = module.exports = {
    formatDateForConsole,
    sortByDate,
    sortByGenderThenLastName,
    sortByLastNameAscending,
    sortByLastNameDescending,
    compileArray,
    postmanArray
};
