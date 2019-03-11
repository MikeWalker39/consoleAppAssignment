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

        // console.log(data)


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



        // console.log(masterArray)



    });

    masterArray = masterArray.flat(1);


    console.log(masterArray)

} catch (e) {
    console.log('Error:', e.stack);
}

