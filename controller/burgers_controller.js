var express = require("express");

var router = express.Router();


var burger = require("../models/burger")


router.get("/", function(req,res){
    burger.selectAll(function(data){
        var hbsObject = {
            burgers: data
        };
        console.log(hbsObject);
        res.render("index",hbsObject)
    });
});

router.post("/", function(req, res){
    burger.insertOne("burgerName",
    req.body.name, function(){
        res.redirect("/");
    });
});

router.put("/:id", function(req, res){
    var condition = "id = "+req.params.id;

    burger.updateOne({
        devoured: true
    }, {id: req.params.id}, function(){
        res.redirect("/");
    });
});

module.exports = router;