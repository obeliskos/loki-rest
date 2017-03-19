var express = require('express');
var router = express.Router();

/* GET users listing. */
/*router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
*/

router.get("/listCollections", function(req, res, next) {
  var db = req.db;
  var result = db.listCollections();
  res.json(result);
});

router.get("/userlist", function(req, res, next) {
  var db = req.db;
  var users = db.getCollection('users');
  var result = users.find();
  res.json(result);
});

/**
 * Http 'POST' implementation of 'find' 
 * post params:
 * {string} "collectionName" - collection to exec query against
 * {string} "queryObject" - serialized query object
 */
function findHandler(req, res, next) {
  var postParams = req.body;
  var collectionName = postParams.collectionName;
  var queryObject = postParams.queryObject;
  var db = req.db;

  var coll = db.getCollection(collectionName);
  if (coll) {
    if (typeof queryObject === "string") {
      queryObject = JSON.parse(queryObject);
    }
    res.json(coll.find(queryObject));
  }
  else {
    res.json({err: 'missing or unspecified collection'});
  }
}

function insertHandler(req, res, next) {
  var postParams = req.body;
  var collectionName = postParams.collectionName;
  var doc = JSON.parse(postParams.document);
  var db = req.db;

  var coll = db.getCollection(collectionName);
  if (coll) {
    var obj = coll.insert(doc);
    res.json(doc);
  }
  else {
    res.json({err: 'missing or unspecified collection'});
  }
}

function updateHandler(req, res, next) {
  var postParams = req.body;
  var collectionName = postParams.collectionName;
  var doc = JSON.parse(postParams.document);
  var db = req.db;

  var coll = db.getCollection(collectionName);
  if (coll) {
    var obj = coll.update(doc);
    res.json(doc);
  }
  else {
    res.json({err: 'missing or unspecified collection'});
  }
}

function removeHandler(req, res, next) {
  var postParams = req.body;
  var collectionName = postParams.collectionName;
  var lokiId = parseInt(postParams.$loki, 10);
  var db = req.db;

  var coll = db.getCollection(collectionName);
  if (coll) {
    coll.remove(lokiId);
    res.json({success:true});
  }
  else {
    res.json({err: 'missing or unspecified collection'});
  }
}

router.post("/find", findHandler);
router.get("/find", findHandler);
router.post("/remove", removeHandler);
router.get("/remove", removeHandler);
router.post("/insert", insertHandler);
router.get("/insert", insertHandler);
router.post("/update", updateHandler);
router.get("/update", updateHandler);

module.exports = router;
