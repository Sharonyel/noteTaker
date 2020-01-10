// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on table-data, waitinglist, etc.
// ===============================================================================

 const fs = require("fs");

 var notesData = require("../db/db.json");


module.exports = function(app) {


  app.get("/api/notes", function(req, res) {
    res.json(notesData)
  })
  app.post("/api/notes", function(req, res) {
      var newNote = req.body;
      const id = notesData[notesData.length-1].id+1
      newNote.id = id
      notesData.push(newNote);

    fs.writeFile("./db/db.json", JSON.stringify(notesData),(results, err) => {
      if (err) throw err;
      res.json(results)
    });

    }
   
  );


   app.delete("/api/notes/" + id, function(req, res) {
     var delNote = res.param.id;
     console.log(delNote);
    
   });

};
