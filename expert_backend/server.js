
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
    data = req.body
    console.log(data)
    data.forEach(e => {
        fs.appendFile('data.txt', e.name + "\n ______________________ \n", function (err) {
            if (err) return console.log(err);
        })
        e.selected.forEach(s => {
            fs.appendFile('data.txt', "type: " + s.type + " name: " + s.name + "\n" + s.code + "\n \n", function (err) {
                if (err) return console.log(err);
                console.log('Wrote to file');
            });
        })


    });



    res.send({ response: "Feature exported" })

});

app.get('/', function (request, respond) {
    return respond.send("sut mig")
})

app.listen(8000);