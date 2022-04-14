const cheerio = require('cheerio');
const axios = require('axios');
const fs = require('fs')
var json = {'table': []};
let arrlinks = [];
async function doStuff(stringlink)
{


//https://stackoverflow.com/questions/36093042/how-do-i-add-to-an-existing-json-file-in-node-js
await axios.get(stringlink).then(function(response) {
console.log(response.status);
  if(!stringlink.includes("jpg")&&!stringlink.includes("jpeg")&&!stringlink.includes("gif")&&!stringlink.includes("png"))
  {
  let link = {
    url: stringlink,
    content: response.data,
    date: Date()
};
json.table.push(link);
  }
    
  
 

    return response.data;





 })
 .then(function(resdata) {
    
    return getLinks(resdata);


 })
 .then(function(finalres) {

  if(json.table.length==1)
  {
    fs.writeFile ("scrapedata.json", JSON.stringify(json), function(error) {
      if (error) return response.data;
      console.log('complete');
      });
  
  return;
  }
    arrlinks = arrlinks.concat(finalres);
   arrlinks = [...new Set(arrlinks)];
   try {
    fs.writeFileSync('./links.txt', JSON.stringify(arrlinks), 'utf-8');
    //file written successfully
  } catch (err) {
    console.error(err)
  }
    console.log(arrlinks);
   doStuff(arrlinks.shift());




 }).catch(function(error) {
   doStuff(arrlinks.shift());
 });
}

 function getLinks(htmlweb)
 {

   return htmlweb.match(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g);


 }
 try {
  fs.writeFileSync('./links.txt', "", 'utf-8');
  //file written successfully
} catch (err) {
  console.error(err)
}
try {
  fs.writeFileSync('./scrapedata.json', "", 'utf-8');
  //file written successfully
} catch (err) {
  console.error(err)
}

   doStuff("https://www.reuters.com/article/us-usa-treasury-liquidity-explainer/explainer-u-s-treasurys-cash-drawdown-and-why-markets-care-idUSKBN2AM26A");

 console.log("hi");
 
