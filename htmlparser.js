const request = require('request');
var htmlparser = require("htmlparser2");

const urlString = 'https://my.pgp-hms.org/public_genetic_data?utf8=%E2%9C%93&data_type=biometric+data+-+CSV+or+similar&commit=Search'

var requestStream = request(urlString);

var htmlParserStream = new (htmlparser.WritableStream)({
    onopentag: function (name, attrs) {
        if (name === 'td' || name === 'tr') {
          console.log('[HTML-PARSER] onopentag=', arguments);
        }
    },


    onerror: function (e) {
        console.log('[HTML-PARSER] onerror=', arguments);
    },
    onend: function () {
        console.log('[HTML-PARSER] onend=', arguments);
    }


}, {
    lowerCaseAttributeNames: false,
    decodeEntities: true,
    lowerCaseTags: false
});

var currentRecord;

requestStream
    .pipe(htmlParserStream)