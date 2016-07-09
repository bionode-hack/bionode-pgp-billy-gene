var trumpet = require('trumpet');
var through2 = require('through2');
var cheerio = require('cheerio');

var request = require('request');
var htmlparser = require("htmlparser2");


var baseUrl = 'https://my.pgp-hms.org'

var requestStream = request(`${baseUrl}/public_genetic_data?utf8=%E2%9C%93&data_type=biometric+data+-+CSV+or+similar&commit=Search'`);


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
    }
    callback()
}))
.pipe(process.stdout)

var counter = 0;

function parseTableRow(str) {
  counter = counter + 1;
  var $ = cheerio.load(str);

  var date = $('td[data-summarize-as="list-distinct"]').eq(0).text();
  var dataType = $('td[data-summarize-as="list-distinct"]').eq(1).text();
  var fileSource = $('td[data-summarize-as="file-source"]').text();
  var name = $('td[data-summarize-as="name"]').text();

  var participant = $( '[data-summarize-as="participant"] a' ).text().split( ', ' )
  var download = $('td[data-summarize-as="size"] a').attr( 'href' );


  var resObj = {
    id: counter,
    name: name,
    fileSource : fileSource,
    dataType: dataType,
    date: date.trim(),
    participant : participant,
    url: baseUrl + '/profile/' + participant[0],
    download: baseUrl + download
  }

  return JSON.stringify(resObj) + '\n';
}
