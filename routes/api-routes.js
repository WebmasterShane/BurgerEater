var db = require("../models");
// Routes =============================================================
module.exports = function(app) {
  app.get("/api/burgers", function(req, res) {
    db.burgers.findAll({}).then(function(dbBurg) {
      console.log(dbBurg)
      var burgObj = {burgers: dbBurg};
      res.render("index", burgObj)

      res.json(dbBurg);
    });
  });
  // POST route for saving a new todo
  app.post("/api/burgers", function(req, res) {

    db.burgers.create({
      burgerName: req.body.burgerName,
      }).then(function(dbBurg) {

      res.redirect("/");
    });
  });


  app.post("/:id", function(req,res){
    var burgerId = req.params.id;
    db.burgers.update(
      {
        devoured:true,
      },
      {
        where:{
          id: burgerId
        }
      }).then(function(dbBurg){
        res.redirect("/")
      })
  })
}