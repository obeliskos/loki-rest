var express = require('express');
var router = express.Router();

/* default page */
/*router.get('/', function(req, res, next) {
  res.render('demo', { title: 'loki demo' });
});*/

router.get("/", function(req, res, next) {
  var db = req.db;
  var result = db.listCollections();
  res.render('demo', { 
    title: 'manage users collection',
    collections: db.listCollections()
  });
});


module.exports = router;