
const fs = require("fs");

var notesData = require("../db/db.json");


module.exports = function (app) {


  app.get("/api/notes", function (req, res) {
    res.json(notesData)
  })
  app.post("/api/notes", function (req, res) {
    var newNote = req.body;
    let id;

    if (notesData.length === 0) {
      id = 0;
    }
    else {
      index = notesData.length - 1;
      id = notesData[index].id + 1;

    }

    newNote.id = id
    notesData.push(newNote);

    fs.writeFile("./db/db.json", JSON.stringify(notesData), (results, err) => {
      if (err) throw err;
      res.json(results)
    });

  }

  );

  app.delete("/api/notes/:id", function (req, res) {
    var delNoteid = req.params.id;
    console.log("id... " + delNoteid)
    notesData.forEach(function (note, index) {
      if (delNoteid == note.id) {

        notesData.splice(index, 1);
      console.log(notesData);
      fs.writeFile("./db/db.json", JSON.stringify(notesData), (results, err) => {
        if (err) throw err;
        res.json(results)
      });
  
      }
    })


  });


};
