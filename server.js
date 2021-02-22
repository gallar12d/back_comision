const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { validate, ValidationError, Joi } = require('express-validation');

const app = express();

var corsOptions = {
  origin: ["http://localhost:8080", "http://localhost:3000", "https://gallar12d.github.io/"]
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./app/models");
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Conectado a la base de datos!");
  })
  .catch(err => {
    console.log("No se puede conectar a la base de datos!", err);
    process.exit();
  });

app.get("/", (req, res) => {
  res.json({ message: "Api para recursos" });
});

require("./app/routes/recurso.routes")(app);
require('./app/routes/auth.routes')(app);

app.use(function(err, req, res, next) {
  if (err instanceof ValidationError) {
    return res.status(err.statusCode).json(err)
  }

  return res.status(500).json(err)
})

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
