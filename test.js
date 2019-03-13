const assert = require('assert');
const app = require('./app.js');
const fs = require('fs');

describe('Array', function () {
  describe('#indexOf()', function () {
    it('should return -1 when the value is not present', function () {
      assert.equal(-1, [1, 2, 3].indexOf(4));
    });
  });
});

describe('FormatDate', function () {
  it('should return a date formatted as M/D/YYYY (e.g. March 7th, 1979 would be 3/7/1979)',
    function () {
      // reformat an array with a date in MM/DD/YY format
      let testEntry = app.formatDateForConsole([['MITCHELL', 'LAURA', 'FEMALE', 'BLUE', '04-15-1969']]);
      // get the modified date string
      let modifiedDate = testEntry[0].pop();
      // check if it is not in proper format - M/D/YYYY
      assert.equal('4/15/1969', modifiedDate);
    });
});

describe('Read file, return array without delimiters', function () {
  it("should take data from a file, remove commas, hyphens and pipes" +
    "and return arrays - containing a last name, first name, gender, " +
    "favorite color and a birthdate - within an array",
    function () {
      // get data from pipe delimited file
      let data = fs.readFileSync('./consoleAppPipeDelim', 'utf8');
      // get the number of data rows in the file
      let totalLinesInFile = data.toString().split('\n').length;
      let testArray = app.compileArray(data);
      ;

      describe('length of outer array', function () {
        it("returns an array with the same length as the data file", function () {
          // compile data into array
          // array should have same length as file
          assert.equal(totalLinesInFile, testArray.length);
        });
      });

      describe('length of inner array', function () {
        it("returns arrays with five items in it", function () {
          // make sure each array has 5 items
          testArray.forEach(el => {
            assert.equal(5, el.length);
          });
        });
      });
    });
});