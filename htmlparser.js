const request = require('request');
var htmlparser = require("htmlparser2");

const urlString = 'https://my.pgp-hms.org/public_genetic_data?utf8=%E2%9C%93&data_type=biometric+data+-+CSV+or+similar&commit=Search'

var requestStream = request(urlString);

var htmlParserStream = new (htmlparser.WritableStream)({
    onopentag: function (name, attrs) {
        console.log('[HTML-PARSER] onopentag=', arguments);
    },
    onclosetag: function (name, attrs) {
        console.log('[HTML-PARSER] onclosetag=', arguments);
    },
    onerror: function (e) {
        console.log('[HTML-PARSER] onerror=', arguments);
    },
    onend: function () {
        console.log('[HTML-PARSER] onend=', arguments);
    },

    oncdataend: function () { console.log('oncdataend', arguments)},
    oncdatastart: function () { console.log('oncdatastart', arguments)},
    onclosetag: function () { console.log('onclosetag', arguments)},
    oncomment: function () { console.log('oncomment', arguments)},
    oncommentend: function () { console.log('oncommentend', arguments)},
    onerror: function () { console.log('onerror', arguments)},
    onopentag: function () { console.log('onopentag', arguments)},
    onprocessinginstruction: function () { console.log('onprocessinginstruction', arguments)},
    onreset: function () { console.log('onreset', arguments)},
    ontex: function () { console.log('ontex', arguments)}
}, {
    lowerCaseAttributeNames: false,
    decodeEntities: true,
    lowerCaseTags: false
});

requestStream
    .on('data', function (data) {
        console.log('[REQUEST-STREAM] data=', data.toString());
    })
    .pipe(htmlParserStream);