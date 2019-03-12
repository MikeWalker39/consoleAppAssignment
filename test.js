const assert = require('assert');
const app = require('./app');

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




