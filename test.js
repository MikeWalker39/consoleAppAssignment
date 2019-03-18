const assert = require('assert');
const app = require('./app.js');
const fs = require('fs');
const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const server = require('./index.js');
const should = require('should');

describe('FormatDate', function () {
  it('should return a date formatted as M/D/YYYY (e.g. March 7th, 1979 would be 3/7/1979)',
    function () {
      // reformat an array with a date in MM/DD/YY format
      let entry = [{
        'first_name': 'LAURA',
        'last_name': 'MITCHELL',
        'gender': 'FEMALE',
        'fav_color': 'BLUE',
        'dob': '04-15-1969'
      }];

      let test = app.formatDateForConsole(entry);
      // get the modified date string
      let modifiedDate = test[0].dob;
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


      describe('length of outer array', function () {
        it("returns an array with the same length as the data file", function () {
          // compile data into array
          // array should have same length as file
          assert.equal(totalLinesInFile, testArray.length);
        });
      });

      describe('length of object values', function () {
        it("returns objects with five object values", function () {
          // make sure each array has 5 items
          testArray.forEach(el => {
            assert.equal(5, Object.values(el).length);
          });
        });
      });
    });
});

describe('test', function () {
  before(function () {
    chai.request(server)
      .post('/records')
      .send({
        records: 'CAMPBELL PHIL MALE ORANGE 03-23-1961\nPARKER ALEX MALE PINK 06-17-1967\nMITCHELL LAURA FEMALE BLUE 04-15-1969\nPEREZ KATHERINE FEMALE ORANGE 09-30-1973'
      })

      .end((err, res) => { done() });
  });

  it('should get records from /records/gender', function (done) {
    chai.request(server)
      .get('/records/gender')
      .end(function (err, res) {
        should.exist(res.body);
        res.body.should.have.property('results');

        done();
      });
  });

  it('should get records from /records/name', function (done) {
    chai.request(server)
      .get('/records/name')
      .end(function (err, res) {
        should.exist(res.body);
        res.body.should.have.property('results');

        done();
      });
  });

  it('should get records from /records/nameDescending', function (done) {
    chai.request(server)
      .get('/records/nameDescending')
      .end(function (err, res) {
        should.exist(res.body);
        res.body.should.have.property('results');

        done();
      });
  });
})