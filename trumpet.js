var trumpet = require('trumpet');

var request = require('request');
var htmlparser = require("htmlparser2");

var urlString = 'https://my.pgp-hms.org/public_genetic_data?utf8=%E2%9C%93&data_type=biometric+data+-+CSV+or+similar&commit=Search'

var requestStream = request(urlString);


var trumpet = trumpet();

trumpet.selectAll('tr', function (span) {
    span.createReadStream().pipe(process.stdout);
});

requestStream.pipe(trumpet);