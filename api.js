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
    if(key!=123)
    {
        res.status(404).send('key not found');
    }
    else{
        fs.readFile('scrapedata.json', function (err, data) {
            var json = JSON.parse(data)
            for (var stuff in json) {
                console.log(stuff);
              }
            console.log(json["table"][0]);
        })

    }
    console.log(key);
    console.log(s);
    console.log(count);
});