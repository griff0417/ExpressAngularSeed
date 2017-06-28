var express = require("express");
var router = express.Router();
var ObjectId = require('mongodb').ObjectID;

/*
 * Generic REST API
 */
/* GET all */
router.get("/:col", function(req, res) {
    var db = req.db;

    db.collection(req.params.col, function(err, collection) {
        collection.find().toArray(
        function(err, data) {
            if (err) throw err;

            setHeaders(res);
            res.json(data);
        });
    });
});

/* GET one */
router.get("/:col/:id", function(req, res) {
    var db = req.db;
    var postId = req.params.id;

    db.collection(req.params.col, function(err, collection) {

        collection.findOne({"_id": new ObjectId(postId)},
        function(err, data) {
            if(err) throw err;

            setHeaders(res);
            res.json(data);
        });
    });
});

/* POST a new post */
router.post("/:col", function(req, res) {
    var db = req.db;
    var reqData = req.body;

    db.collection(req.params.col, function(err, collection) {
        collection.insert(reqData,
        function(er, data) {
            setHeaders(res);
            res.json({"status": 200});
        });
    });
});

/* PUT/UPDATE a post */
router.put("/:col/:id", function(req, res) {
    var db = req.db;
    var postId = req.params.id;
    var reqData = req.body;

    // Remove the _id property. Update will fail otherwise
    if (reqData.hasOwnProperty("_id")) {
        delete reqData["_id"];
    }

    db.collection(req.params.col, function(err, collection) {
        collection.update({"_id": new ObjectId(postId)}, reqData,
        function(er, data) {
            setHeaders(res);
            res.json({"status": 200});
        });
    });
});

/* DELETE a post */
router.delete("/:col/:id", function(req, res) {
    var db = req.db;
    var postId = req.params.id;

    db.collection(req.params.col, function(err, collection) {
        collection.remove({"_id": new ObjectId(postId)},
        function(er, data) {
            setHeaders(res);
            res.json({"status": 200});
        });
    });
});

function setHeaders(res) {
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Content-Type", "application/json");
}

module.exports = router;
