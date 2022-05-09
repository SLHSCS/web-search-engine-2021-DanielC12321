const express = require('express')
const fs = require('fs')
const app = express()
const port = 3000
const score = require('./scoreweb.js');
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`app listening at http://localhost:${port}`)
  });
  app.get('/:key/:s/:count', (req, res) => {
    // Reading isbn from the URL
    
    const key = req.params.key;
    const s = req.params.s;
    const count = req.params.count;
    var respo = {
      numres: 0,
      keyword: s,
      results: []
  };
    if(key!=123)
    {
        res.status(404).send('key not found');
    }
    else{
        doStuff(respo).then(function(result)
        {
          console.log(result);
          res.status(200).send(result);
        })

    }
 
    
});

async function doStuff(respo)
{
  fs.readFile('scrapedata.json', function (err, data) {
    var json = JSON.parse(data);
    
    for (let i of json["table"]) {
      
      try{
      if(i["content"].includes(s))
      {
       score.scoreRemote(i["url"], s).then(function(result) {
         if(result>0 )
         {
          respo["numres"] = respo["results"]+1;
          let link = {
            url: i["url"],
            score: result
        };
        console.log(link);
          respo["results"].push(link);
          
         }
         console.log(result);
        console.log(i["url"]);
       
      });
       
      }
      }
      catch(error)
      {
        
      }
      }
      
});
}