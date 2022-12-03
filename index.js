// https://blog.pagesd.info/2019/10/08/crud-with-express-sqlite-10-steps/#crud3
// https://docs.aws.amazon.com/fr_fr/cloudhsm/latest/userguide/ssl-offload-overview.html
// https://www.smashingmagazine.com/2017/06/guide-switching-http-https/

console.log("on lance le serveur sqlite pour DD")

const express = require("express"); //The first line references / imports the Express module.
const sqlite3 = require("sqlite3"); //Declare the SQlite3 module
const cors = require('cors') 

//the code to connect to the database
const db_name = ("./data/apptest.db");
const db = new sqlite3.Database(db_name, err => {  // create the database "apptest" if it doesn't already exist
  if (err) {
    return console.error(err.message);
  }
  console.log("Successful connection to the database 'apptest.db'");
});

// the sql instruction to create character table
const sql_create = `CREATE TABLE IF NOT EXISTS character (  
    char_id INTEGER PRIMARY KEY AUTOINCREMENT,
    nom  VARCHAR(100),
    niveau  INTEGER,
    xp  INTEGER,
    current_pv  INTEGER,
    current_mana  INTEGER, 
    force  INTEGER,
    dexterite  INTEGER, 
    intelligence  INTEGER, 
    constitution  INTEGER, 
    puissance  INTEGER, 
    charisme  INTEGER, 
    arme1  VARCHAR(100), 
    arme2  VARCHAR(100), 
    arme3  VARCHAR(100), 
    armure_torse  VARCHAR(100), 
    armure_jambe  VARCHAR(100), 
    casque  VARCHAR(100), 
    brassard  VARCHAR(100), 
    botte  VARCHAR(100), 
    anneau1  VARCHAR(100), 
    anneau2  VARCHAR(100), 
    amulette  VARCHAR(100), 
    competence1  VARCHAR(100), 
    competence2  VARCHAR(100), 
    competence3  VARCHAR(100), 
    competence4  VARCHAR(100), 
    competence5  VARCHAR(100), 
    passif1  VARCHAR(100), 
    passif2  VARCHAR(100), 
    passif3  VARCHAR(100), 
    passif4  VARCHAR(100), 
    competence_vol  INTEGER, 
    competence_pistage  INTEGER, 
    competence_crochetage  INTEGER, 
    competence_perception  INTEGER, 
    competence_dissimulation  INTEGER, 
    competence_alchimie  INTEGER, 
    competence_fabrication  INTEGER, 
    connaissance_nature  INTEGER, 
    connaissance_magie  INTEGER, 
    connaissance_demologie  INTEGER
  );`;

// We then enter this sql instruction into the database to create the character table
db.run(sql_create, err => {
    if (err) {
      return console.error(err.message);
    }
    console.log("Successful creation of the 'character table");
});


db.run("SELECT * FROM character", (err,rows) => {
  if (err) {
    return console.error(err.message);
  }
  console.log(rows);
});

const app = express();  //This line is used to instantiate an Express server.

app.use(cors()) //
app.use(require("body-parser").json());  // To make sure your server is able to parse a json format

app.listen(3001, () =>  {      
    console.log("Server started (http://localhost:3001/) !");
  });


app.get("/character", (req, res) => {
    const sql = "SELECT * FROM character "
    db.all(sql, [], (err, rows) => {
      if (err) {
        return console.error(err.message);
      }
        console.log("test serveur sur /character");
        res.send(rows);
    });
});

app.get("/character/:id", (req, res) => {
  const id = req.params.id;
  const sql = ("SELECT * FROM character WHERE char_id = "+ id +";")
  db.all(sql, [], (err, rows) => {
    if (err) {
      return console.error(err.message);
    }
      console.log("test serveur  sur /character/9");
      res.send(rows);
  });
});

app.get("/inventory", (req, res) => {
  const sql = "SELECT * FROM inventory"
  db.all(sql, [], (err, rows) => {
    if (err) {
      return console.error(err.message);
    }
      console.log("test serveur  sur /character/10");
      res.send(rows);
  });
});

app.get(("/inventory/:id"), (req, res) => {
  const id = req.params.id;
  const sql = ("SELECT * FROM inventory WHERE char_id = "+ id +";")
  db.all(sql, [], (err, rows) => {
    if (err) {
      return console.error(err.message);
    }
      console.log("test serveur  sur /inventory/7");
      res.send(rows);
  });
});

app.post("/", (req, res) => {

    console.log("on recoit un post")

    const sql = req.body.instruction;


    db.all(sql, [], (err, rows) => {
      if (err) {
        return console.error(err.message);
      }
    console.log("on rentre la commande " + sql);
    res.send(true);
    });
});



function create_all() {

  const sql_insert1 = 'INSERT INTO character (nom, niveau, xp, current_pv, current_mana, force, dexterite, intelligence, constitution, puissance, charisme, arme1, arme2, arme3, armure_torse, armure_jambe, casque, brassard, botte, anneau1, anneau2, amulette, competence1, competence2, competence3, competence4, competence5, passif1, passif2, passif3, passif4, competence_vol, competence_pistage, competence_crochetage, competence_perception, competence_dissimulation, competence_alchimie, competence_fabrication, connaissance_nature, connaissance_magie, connaissance_demologie ) VALUES ("Kokoro", 6, 13600, 0, 0, 15, 23, 12, 16, 10, 10, "arme1", "arme1", "arme20", "equip1", "equip10", "equip3", "equip39", "equip13", "equip25", "equip41", "equip7", "comp1", "comp2", "comp3", "comp0", "comp0", "pass2", "pass5", "pass24", "pass1", 0, 1, 0, 2, 1, 0, 0, 2, 1, 0) ;'
  const sql_insert2 = 'INSERT INTO character (nom, niveau, xp, current_pv, current_mana, force, dexterite, intelligence, constitution, puissance, charisme, arme1, arme2, arme3, armure_torse, armure_jambe, casque, brassard, botte, anneau1, anneau2, amulette, competence1, competence2, competence3, competence4, competence5, passif1, passif2, passif3, passif4, competence_vol, competence_pistage, competence_crochetage, competence_perception, competence_dissimulation, competence_alchimie, competence_fabrication, connaissance_nature, connaissance_magie, connaissance_demologie ) VALUES ("Nemeia", 6, 13600, 0, 0, 17, 24, 10, 15, 10, 10, "arme22", "arme22", "arme19", "equip14", "equip10", "equip3", "equip37", "equip13", "equip41", "equip6", "equip7", "comp4", "comp5", "comp7", "comp0", "comp0", "pass3", "pass12", "pass6", "pass1", 1, 1, 1, 2, 2, 0, 0, 0, 0, 0);'
  const sql_insert3 = 'INSERT INTO character (nom, niveau, xp, current_pv, current_mana, force, dexterite, intelligence, constitution, puissance, charisme, arme1, arme2, arme3, armure_torse, armure_jambe, casque, brassard, botte, anneau1, anneau2, amulette, competence1, competence2, competence3, competence4, competence5, passif1, passif2, passif3, passif4, competence_vol, competence_pistage, competence_crochetage, competence_perception, competence_dissimulation, competence_alchimie, competence_fabrication, connaissance_nature, connaissance_magie, connaissance_demologie ) VALUES ("Jean-Claude", 6, 13600, 0, 0, 10, 11, 22, 14, 19, 10, "arme31", "arme0", "arme0", "equip30", "equip2", "equip20", "equip4", "equip13", "equip42", "equip6", "equip24", "comp8", "comp9", "comp10", "comp11", "comp0", "pass4", "pass17", "pass1", "pass1", 0, 0, 0, 1, 0, 2, 0, 0, 4, 2);'
  const sql_insert4 = 'INSERT INTO character (nom, niveau, xp, current_pv, current_mana, force, dexterite, intelligence, constitution, puissance, charisme, arme1, arme2, arme3, armure_torse, armure_jambe, casque, brassard, botte, anneau1, anneau2, amulette, competence1, competence2, competence3, competence4, competence5, passif1, passif2, passif3, passif4, competence_vol, competence_pistage, competence_crochetage, competence_perception, competence_dissimulation, competence_alchimie, competence_fabrication, connaissance_nature, connaissance_magie, connaissance_demologie ) VALUES ("Azaram", 6, 13600, 0, 0, 10, 12, 14, 12, 16, 22, "arme31", "arme0", "arme0", "equip14", "equip2", "equip3", "equip40", "equip13", "equip42", "equip6", "equip7", "comp12", "comp13", "comp14", "comp15", "comp0", "pass4", "pass16", "pass1", "pass1", 2, 0, 2, 3, 0, 0, 0, 0, 2, 5);'

  db.run(sql_insert1, err => {
    if (err) {
        return console.error(err.message);
      }
      console.log("Successful creation of the character content for Kokoro");
  });

  db.run(sql_insert2, err => {
    if (err) {
        return console.error(err.message);
      }
      console.log("Successful creation of the character content for Nemeia");
  });

  db.run(sql_insert3, err => {
    if (err) {
        return console.error(err.message);
      }
      console.log("Successful creation of the character content for Jean-Claude");
  });

  db.run(sql_insert4, err => {
    if (err) {
        return console.error(err.message);
      }
      console.log("Successful creation of the character content for Azaram");
  });
  
}

function delete_all() {

  const sql_insert1 = 'DELETE FROM character WHERE NOM = "Kokoro"';
  const sql_insert2 = 'DELETE FROM character WHERE NOM = "Nemeia"';
  const sql_insert3 = 'DELETE FROM character WHERE NOM = "Jean-Claude"';
  const sql_insert4 = 'DELETE FROM character WHERE NOM = "Azaram"';

  db.run(sql_insert1, err => {
    if (err) {
        return console.error(err.message);
      }
      console.log("Successful deletion of the character content");
  });
    
  db.run(sql_insert1, err => {
      if (err) {
        return console.error(err.message);
      }
      console.log("Successful deletion of the character content");
  });

  db.run(sql_insert1, err => {
      if (err) {
          return console.error(err.message);
        }
        console.log("Successful deletion of the character content");
  });

  db.run(sql_insert1, err => {
      if (err) {
        return console.error(err.message);
      }
      console.log("Successful deletion of the character content");
  });
}