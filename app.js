const fs = require('fs');

try {
    // get the file names
    const filenames = process.argv.splice(2);

    let masterArray = [];

    filenames.forEach(file => {
        // get the data
        const data = fs.readFileSync(file, 'utf8');
        // split the strings into an array of strings
        const arr = data.split('\n');

        // go through the strings, cut out suffixes
        const cleanArr = arr.map(function (el) {

            // for comma delimited strings
            if (el.indexOf(',') > -1) {
                el = el.split(',');
                let lastItem = el[el.length - 1];
                if (lastItem === "\\" || lastItem === "") el.pop();

                return el;
            }

            // for space delimited strings
            if (el.indexOf(' ') > -1) {
                el = el.split(' ');

                // get the last item in the array
                let lastItem = el[el.length - 1];

                // if last item is not data, pop it off
                if (lastItem === "" || lastItem === "\\") {
                    el.pop();
                }
                return el;
            }

            // for pipe delimited strings
            if (el.indexOf('|') > -1) {
                el = el.split('|');

                // get the last item in the array
                let lastItem = el[el.length - 1];

                // if the last item is not data, pop it off
                if (lastItem === "" || lastItem === "\\") {
                    el.pop();
                }
                return el;
            }
        });

        masterArray.push(cleanArr);

    });

    masterArray = masterArray.flat(1);

    sortByGenderThenLastName(masterArray);

} catch (e) {
    console.log('Error:', e.stack);
}

function sortByGenderThenLastName(inData) {
    // create empty arrays that we will add to
    const femaleArray = [];
    const maleArray = [];

    // separate the data by gender
    inData.forEach(el => {
        let currentGender = el[2];

        if (currentGender === "FEMALE") {
            femaleArray.push(el);
        } else maleArray.push(el);
    });

    // sort female array by last name
    femaleArray.sort(function (a, b) {
        let lastName1 = a[0];
        let lastName2 = b[0];

        // sort returns boolean values, so compare the names and set which one should go first
        return lastName1 > lastName2 ? 1 : -1;
    })

    // sort male array by last name
    maleArray.sort(function (a, b) {
        let lastName1 = a[0];
        let lastName2 = b[0];

        // sort returns boolean values, so compare the names and set which one should go first
        return lastName1 > lastName2 ? 1 : -1;
    });

    // concatenate male and female array, females first
    const joinedSortedArray = femaleArray.concat(maleArray);

    console.log("joined ", joinedSortedArray);
    return joinedSortedArray;
};



