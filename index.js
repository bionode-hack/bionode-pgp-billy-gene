//
// const request = require( 'request' )
const url = 'https://my.pgp-hms.org/public_genetic_data'
//
const cheerio = require('cheerio')
//
//
// request( url, ( err, res ) => {
//   err && console.log( 'Error: ', + err )
//   res && scrape( res )
//   // res && console.log( res )
// })
//


const fs = require( 'fs' )
const path = require( 'path-resolve' )
const mockData = '<td style="width:20px" class="collection-column"></td>    <td style="width:auto" data-summarize-as="participant"><a href="/profile/hu816A0B">hu816A0B</a></td>    <td style="width:auto;white-space:nowrap" data-summarize-as="list-distinct">        2016-06-29     </td>    <td style="width:auto" data-summarize-as="list-distinct">health records - PDF or text</td>    <td style="width:auto" data-summarize-as="file-source">Participant</td>    <td data-summarize-as="name">medications</td>    <td data-summarize-as="size">    <a href="/user_file/download/2014" rel="nofollow">Download</a>    <br>(291 Bytes) </td>    <td data-summarize-as="none"> </td>';

/* fs.readFile( './page-source.html', 'utf-8', function(err, data) {
  err && console.log(err)
  data && scrape( data )
}) */

function scrape( res ) {
  $ = cheerio.load( res )
  const rows = $('td[data-file-row]');
  const anchors = $('td[data-summarize-as="participant"] a');
  const dates = $('td[data-summarize-as="list-distinct"]');
  var resArr = [];
  anchors.map(( i, anchor ) => {
    resArr.push(
      {
       "url": url + anchor.attribs.href,
       "participant" : anchor.children[0].data
      }
    );
  })
  console.log(resArr);
}

function parseIndexData( data ){
  $ = cheerio.load( data);



  const date = $('td[data-summarize-as="list-distinct"]').eq(0).text();
  const dataType = $('td[data-summarize-as="list-distinct"]').eq(1).text();
  const fileSource = $('td[data-summarize-as="file-source"]').text();
  const name = $('td[data-summarize-as="name"]').text();

  const participant = $('td[data-summarize-as="participant"] a');
  const rawData = $('td[data-summarize-as="size"]');

  var resObj = {
  "name": name,
  "fileSource" : fileSource,
  "dataType": dataType,
  "date": date.trim(),
  "participant" : partData(participant) // still hanging
  };

  
  function partData( selector ){
    return {
      "name": selector.children[0],
      "profileUrl": selector.attribs.href
    };
  }
  console.log("result object: " + JSON.stringify(resObj));
  return resObj;
}

console.log(parseIndexData(mockData));

