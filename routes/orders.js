var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
/* GET users listing. */
router.post('/create', function(req, res, next) {
   var payloadData = req.body;
   console.log(url, 'urllllllllllllll');
    MongoClient.connect(url/'mydb', function (err, client) {
      if (err) throw err
      var db = client.db('mydb')
      db.collection("orders").insertMany(payloadData, function(err, result) {
        if (err) throw err
        console.log(result)
        res.send('data inserted successfully ' + result)
      })
    })
});

router.put('/update/:id', function(req, res, next) {
  MongoClient.connect('mongodb://localhost:27017/mydb', function (err, client) {
    if (err) throw err
    var db = client.db('mydb')
    var myquery = { order_id: req.params.id };
    var newvalues = { $set: {delivery_date: req.body.delivery_date } };
    db.collection("orders").updateOne(myquery, newvalues, function(err, result) {
      if (err) throw err;
      console.log(JSON.stringify(result));
      res.send(JSON.stringify(result));
    });
  });
});

router.get('/search/:id', function(req, res, next) {
  MongoClient.connect('mongodb://localhost:27017/mydb', function (err, client) {
    if (err) throw err
    var db = client.db('mydb')
    db.collection("orders").findOne({order_id: req.params.id}, function(err, result) {
      if (err) throw err;
      console.log(result);
      res.send(JSON.stringify(result));
    });
  });
});

router.post('/list', function(req, res, next) {
  MongoClient.connect('mongodb://localhost:27017/mydb', function (err, client) {
    if (err) throw err
    var db = client.db('mydb')
    var delivery_date = req.body.delivery_date;
    console.log(typeof delivery_date)
    db.collection('orders').find({delivery_date: delivery_date}).toArray(function (err, result) {
      if (err) throw err;
      console.log(result);
      res.send(JSON.stringify(result));
    });
  });
});

router.delete('/delete/:id', function(req, res, next) {
  MongoClient.connect('mongodb://localhost:27017/mydb', function (err, client) {
    if (err) throw err
    var db = client.db('mydb')
    db.collection("orders").deleteOne({order_id: req.params.id}, function(err, result) {
      if (err) throw err
      console.log(result)
      res.send('deleted successfully ' + result)
    })
  });
});

module.exports = router;
