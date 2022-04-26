
var express = require('express'),
    fs = require('fs'),
    url = require('url');
var cors = require('cors')

var app = express();
app.use(cors())

var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()



app.use('/public', express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/public'));


app.post('/export', jsonParser, function (req, res) {
    console.log(req.body);
    data = req.body
    data.forEach(e => {
        fs.appendFile('data.txt', "type: " + e.type + " name: " + e.name + "\n" + e.code + "\n ___________________________ \n", function (err) {
            if (err) return console.log(err);
            console.log('Wrote to file');
        });
    });



    res.send({ response: "Feature exported" })

});

app.get('/', function (request, respond) {
    return respond.send("sut mig")
})

app.listen(8000);