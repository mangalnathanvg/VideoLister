var express = require('express');

var app = new express();
var parser = require('body-parser');

var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017';

const dbName = "videos";


const insertDocuments = function (db, callback, item) {
    // Get the documents collection
    const collection = db.collection('videolog');
    // Insert some documents
    collection.insert(
        { expression: item }
        , function (err, result) {
            console.log("Inserted documents into the collection");
            callback(result);
        });
}



app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));


app.get('/', function (req, res) {
    res.sendFile('C:/Users/MV056700/Desktop/Tutorials Platform/src/index.html');
})
    .post('/insertdata', function (req, res) {
        var newData = req.body;
        console.log(newData);
        MongoClient.connect(url, function (err, client) {

            console.log("Connected!!!");
            const db = client.db(dbName);

            insertDocuments(db, function () {
                client.close();
            }, newData);

        });

    })

    .post('/getdata', function (req, res) {
        MongoClient.connect(url, function (err, client) {
            const db = client.db(dbName);

            db.collection("videolog").find({}).toArray(function (err, result) {
                if (err) throw err;
                res.json(result);
                client.close();
            });

            
        })
    })
    .post('/removedata', function(req,res){
        MongoClient.connect(url, function(err, client){
            const db = client.db(dbName);
            var query = {};
            db.collection("historylog").remove(query, function(err,obj){
                client.close();
            });
        });
    });




app.use(express.static(__dirname + '/../dist'))
app.listen(7777);



console.log("Magic happens at port number 7777");