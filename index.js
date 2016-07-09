//
// const request = require( 'request' )
// const url = 'https://my.pgp-hms.org/public_genetic_data'
//
// const cheerio = require('cheerio')
//
//
// request( url, ( err, res ) => {
//   err && console.log( 'Error: ', + err )
//   res && scrape( res )
//   // res && console.log( res )
// })
//
function scrape( res ) {
  $ = cheerio.load( res.body )
  console.log( $('td[data-summarize-as="participant"]') )
}


const fs = require( 'fs' )
const path = require( 'path-resolve' )
fs.readFile( './page-source.html', 'utf-8', function(err, data) {
  err && console.log(err)
  data && scrape( data )
})
