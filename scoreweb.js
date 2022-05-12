const axios = require('axios');


module.exports.scoreHTML = (st, keyword) => {
    var score = 0;
    var re = new RegExp("<[pP]>.*"+keyword+".*<\/[pP]>");
    if (re.test(st))
    {
        score = score+1;
    }
    re = new RegExp("<[aA]\s+href=.*>.*"+keyword+".*<\/[aA]>");
    if(re.test(st))
    {
        score = score+2;
    }
    re = new RegExp("<[bB]>.*"+keyword+".*<\/[bB]>");
    if(re.test(st))
    {
        score = score+2;
    }
    re = new RegExp("<[sS]trong>.*"+keyword+".*<\/[sS]trong>");
    if(re.test(st))
    {
        score = score+2;
    }
    re = new RegExp("<[iI]>.*"+keyword+".*<\/[iI]>");
    if(re.test(st))
    {
        score = score+2;
    }
    re = new RegExp("<em>.*"+keyword+".*<\/em>");
    if(re.test(st))
    {
        score = score+2;
    }
    re = new RegExp("<[hH][345]>.*"+keyword+".*<\/[hH][345]>");
    if(re.test(st))
    {
        score = score+3;
    }
    
    re = new RegExp("<[hH]2>.*"+keyword+".*<\/[hH]]2>");
    if(re.test(st))
    {
        score = score+4;
    }
    re = new RegExp("<[hH]1>.*"+keyword+".*<\/[hH]1>");
    if(re.test(st))
    {
        score = score+5;
    }
    re = new RegExp("<[tT]itle>.*"+keyword+".*<\/[tT]itle>");
    if(re.test(st))
    {
        score = score+10;
    }
    return score;
    }; 


module.exports.scoreRemote = async (st, kw) => {
     await axios.get(st).then(function(response) {
        return response.data;





     })
     .then(function(resdata) {
        
        return module.exports.scoreHTML(resdata, kw);


     })
     .then(function(finalres) {


        console.log(finalres)


     });
   }; 