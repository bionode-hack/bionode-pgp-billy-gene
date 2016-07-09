
const request = require( 'request' )
const url = 'https://my.pgp-hms.org/public_genetic_data'

const cheerio = require('cheerio')
    $ = cheerio.load('<h2 class="title">Hello world</h2>');

$('h2.title').text('Hello there!');
$('h2').addClass('welcome');

$.html();


request( url, ( err, res ) => {
  err && console.log( 'Error: ', + err )
  // res && scrape( res )
  res && console.log( res )
})

function scrape( res ) {
  $ = cheerio.load( res )
  console.log( $('[data-summarize-as="participant"]').text() )
}
