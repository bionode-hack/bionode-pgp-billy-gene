var trumpet = require('trumpet');
var through2 = require('through2');

var request = require('request');
var htmlparser = require("htmlparser2");

var urlString = 'https://my.pgp-hms.org/public_genetic_data?utf8=%E2%9C%93&data_type=biometric+data+-+CSV+or+similar&commit=Search'

var requestStream = request(urlString);


var t = trumpet({objectMode:true});

t.selectAll('tr', function (tableRow) {
    // var trumpet2 = trumpet();
    // trumpet2.selectAll('td', function (cell) {
    //   console.log('CELL', cell);
    // });

    var str = '';
    var finished = false;

    console.log(arguments);

    tableRow.createReadStream()
      .pipe(process.stdout)
      .pipe(
        through2.obj(
        function (chunk, enc, cb) {
          // console.log('-----------------');
          // console.log(chunk);
          // this.push("{asdfasdf:'asdf'}")

          str += chunk.toString();
          cb()
          if (finished) {
            this.push(str);
            console.log('-------------');
            console.log(str);
          }
        }
      ))
      .on('end', function () {
        // this.push(str);
        finished = true;
      })
      .pipe(process.stdout);
});

requestStream
.pipe(t)
.pipe(through2.obj(
  function (chunk, enc, cb) {
    // console.log(chunk)
    cb();
  })
);


