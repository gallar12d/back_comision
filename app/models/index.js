const db_conf = require("../config/db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = db_conf.url;
db.recursos = require("./recurso.model.js")(mongoose);
db.coberturas = require("./cobertura.model.js")(mongoose);
db.user = require("./user.model");

module.exports = db;
