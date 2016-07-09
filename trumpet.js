var trumpet = require('trumpet');
var through2 = require('through2');

var request = require('request');
var htmlparser = require("htmlparser2");

var urlString = 'https://my.pgp-hms.org/public_genetic_data?utf8=%E2%9C%93&data_type=biometric+data+-+CSV+or+similar&commit=Search'

var requestStream = request(urlString);


var t = trumpet({objectMode:true});

t.selectAll('tr', function (tableRow) {

    tableRow.createReadStream()
      .on('data', function (data) {
        str = str + data;
      })
      .on('end', function () {
        finished = true;
      });
});

var str = '';
var finished = false;

requestStream
.pipe(t)
.pipe(through2.obj(function (chunk, enc, callback) {
    if (finished) {
      this.push(parseTableRow(str));
      str = '';

      finished = false;
      console.log('-----------');
    }

    callback()
}))
.pipe(process.stdout)


var counter = 0;

function parseTableRow(str) {
  counter = counter + 1;
  return JSON.stringify({
    id: counter,
    name: 'name'
  });
}
