const express = require('express')
const fs = require('fs')
const app = express()
const port = 3001
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
      fs.readFile('scrapedata.json', function (err, data) {
        var json = JSON.parse(data);
        
        for (let i of json["table"]) {
          
          
          try{
          if(i["content"].includes(s))
          {
           var scorexD =score.scoreHTML(i["content"], s);
             if(scorexD>0 )
             {
              respo["numres"] = respo["numres"]+1;
              try
              {
                var title2 = i["content"].match(/\<[tT]itle>([^()]*)\<\/[tT]itle>/)[1];
              }
              catch(error)
              {
                var title2 = "none";
              }
              let link = {
                
                title: title2,
                url: i["url"],
                score: scorexD
            };
            console.log(link);
              respo["results"].push(link);
              console.log("hi");
              console.log(respo);
             }
             
           
           
         
           
          }
        }
        catch(error)
        {

        }
          
        
          }
          respo.results.splice(count);
          respo.numres = respo.results.length;
          
          res.status(200).send(respo); 
    });


  
 


    }
 
    
});
app.get('/:key/:s', (req, res) => {
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
    fs.readFile('scrapedata.json', function (err, data) {
      var json = JSON.parse(data);
      
      for (let i of json["table"]) {
        
        
        try{
        if(i["content"].includes(s))
        {
         var scorexD =score.scoreHTML(i["content"], s);
           if(scorexD>0 )
           {
            respo["numres"] = respo["numres"]+1;
            try
            {
              var title2 = i["content"].match(/\<[tT]itle>([^()]*)\<\/[tT]itle>/)[1];
            }
            catch(error)
            {
              var title2 = "none";
            }
            let link = {
              
              title: title2,
              url: i["url"],
              score: scorexD
          };
          console.log(link);
            respo["results"].push(link);
            console.log("hi");
            console.log(respo);
           }
           
         
         
       
         
        }
      }
      catch(error)
      {

      }
        
      
        }
        
        res.status(200).send(respo); 
  });






  }

  
});


  


