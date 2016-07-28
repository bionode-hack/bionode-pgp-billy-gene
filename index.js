var trumpet = require('trumpet')
var through2 = require('through2')
var cheerio = require('cheerio')
var request = require('request')

var baseUrl = 'https://my.pgp-hms.org'
var requestStream = request(`${baseUrl}/public_genetic_data?utf8=%E2%9C%93&data_type=biometric+data+-+CSV+or+similar&commit=Search'`)

var t = trumpet()
var str = ''
var finished = false

t.selectAll('tr', function (tableRow) {
  tableRow.createReadStream()
    .on('data', data => str = str + data)
    .on('end', () => finished = true)
})

requestStream
  .pipe(t)
  .pipe(through2.obj(function (chunk, enc, callback) {
    if (finished) {
      this.push(parseTableRow(str))
      str = ''
      finished = false
    }
    callback()
  }))
  .pipe(process.stdout)

var counter = 0

function parseTableRow (str) {
  counter = counter + 1
  var $ = cheerio.load(str)
  var participant = $('[data-summarize-as="participant"] a').text().split(', ')

  return JSON.stringify({
      id: counter,
      name: $('td[data-summarize-as="name"]').text(),
      participant,
      fileSource: $('td[data-summarize-as="file-source"]').text(),
      dataType: $('td[data-summarize-as="list-distinct"]').eq(1).text(),
      date: $('td[data-summarize-as="list-distinct"]').eq(0).text().trim(),
      url: baseUrl + '/profile/' + participant[0],
      download: baseUrl + $('td[data-summarize-as="size"] a').attr('href')
    }) + '\n'
}
