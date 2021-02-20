const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url2;
db.tutorials = require("./tutorial.model.js")(mongoose);
db.recursos = require("./recurso.model.js")(mongoose);
db.coberturas = require("./cobertura.model.js")(mongoose);



module.exports = db;
