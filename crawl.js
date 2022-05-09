const cheerio = require('cheerio');
const axios = require('axios');
const fs = require('fs')
const robotsParser = require('robots-txt-parser');

const robots = robotsParser(
  {
    userAgent: 'Googlebot', // The default user agent to use when looking for allow/disallow rules, if this agent isn't listed in the active robots.txt, we use *.
    allowOnNeutral: false, // The value to use when the robots.txt rule's for allow and disallow are balanced on whether a link can be crawled.
  },
);
var json = {'table': []};
let arrlinks = [];



function isBigEnough(value) {
  if(!value.includes("js")&&!value.includes("jpg")&&!value.includes("jpeg")&&!value.includes("gif")&&!value.includes("png")&&!value.includes("pdf"))
  {
    return true;
  }
  return false;
}

async function doStuff(stringlink)
{
 await robots.canCrawl('https://www.reuters.com/article/us-usa-treasury-liquidity-explainer/explainer-u-s-treasurys-cash-drawdown-and-why-markets-care-idUSKBN2AM26A')
  .then(function(response) {
      if(response==true)
      {
         axios.get(stringlink).then(function(response) {
  
          if(response.status>=200 && response.status<=299)
            if(!stringlink.includes("js")&&!stringlink.includes("jpg")&&!stringlink.includes("jpeg")&&!stringlink.includes("gif")&&!stringlink.includes("png")&&!stringlink.includes("pdf"))
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
          
            if(json.table.length==100)
            {
              fs.writeFile ("scrapedata.json", JSON.stringify(json), function(error) {
                if (error) return response.data;
                console.log('complete');
                });
            
            return;
            }
            var cool = finalres.filter(isBigEnough);
              arrlinks = arrlinks.concat(cool);
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
      else
      {
        console.log("failed link");
        doStuff(arrlinks.shift());

      }
  });

//https://stackoverflow.com/questions/36093042/how-do-i-add-to-an-existing-json-file-in-node-js

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

   doStuff("https://en.wikipedia.org/wiki/Fast_food");
   
 console.log("hilow");
 
