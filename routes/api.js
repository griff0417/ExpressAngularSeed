/*
 * API to mongo connection
 */
var express = require("express");
var router = express.Router();

/*
 * Blog Post API
 * Operations for 'post' records
 */
/* GET all posts */
router.get("/post", function(req, res) {
    var db = req.db;
    var collection = db.get("post");

    collection.find({}, {}, function(er, data) {
        setHeaders(res);
        res.json(data);
    });
});

/* GET single post by _id */
router.get("/post/:id", function(req, res) {
    var db = req.db;
    var collection = db.get("post");
    var postId = req.params.id;

    collection.find({"_id" : postId}, {}, function(er, data) {
        setHeaders(res);
        res.json(data);
    });
});

/* POST a new post */
router.post("/post", function(req, res) {
    var db = req.db;
    var collection = db.get("post");
    var reqData = req.body;

    collection.insert(reqData, {}, function(er, data) {
        setHeaders(res);
        res.json({"status" : 200});
    });
});

/* PUT/UPDATE a post */
router.put("/post/:id", function(req, res) {
    var db = req.db;
    var collection = db.get("post");
    var postId = req.params.id;
    var reqData = req.body;

    collection.update({"_id" : postId}, reqData, function(er, data) {
        setHeaders(res);
        res.json({"status" : 200});
    });
});

/* DELETE a post */
router.delete("/post/:id", function(req, res) {
    var db = req.db;
    var collection = db.get("post");
    var postId = req.params.id;

    collection.remove({"_id" : postId}, function(er, data) {
        setHeaders(res);
        res.json({"status" : 200});
    });
});

function setHeaders(res) {
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Content-Type", "application/json");
}

module.exports = router;
