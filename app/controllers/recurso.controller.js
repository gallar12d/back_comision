const db = require("../models");
const Recurso = db.recursos;
const Cobertura = db.coberturas;

// Create and Save a new Tutorial
exports.create = async (req, res) => {
  // Validate request
  if (!req.body.titulo) {
    res.status(400).send({ message: "No puede ser vacío!" });
    return;
  }
  // console.log(req.body)
  // return false;

  const coberturas = new Cobertura({
    fecha_inicial: req.body.fecha_inicial,
    fecha_final: req.body.fecha_final,
    longitud: req.body.longitud,
    latitud: req.body.latitud,
    departamento: req.body.departamento,
    ciudad: req.body.ciudad,
  });

  try {
    let new_cobertura = await coberturas.save();
    const recurso = new Recurso({
      titulo: req.body.titulo,
      claves: req.body.claves,
      tipo_recurso: req.body.tipo_recurso,
      descripcion: req.body.descripcion,
      fuente: req.body.fuente,
      cobertura: new_cobertura,
    });
    let new_recurso = await recurso.save();

    res.send(new_recurso);
  } catch (error) {
    console.log(error);
    // return handleError(error);
  }
};

// Retrieve all Tutorials from the database.
exports.findAll = async (req, res) => {
  const title = req.query.title;
  var condition = title
    ? { title: { $regex: new RegExp(title), $options: "i" } }
    : {};

  try {
    let response = await Recurso.find(condition).populate("cobertura");
    // let ResponseCobertura = await Recurso.find(condition);
    res.send(response);
  } catch (error) {
    res.send(error);
  }
};

// Find a single Tutorial with an id
exports.findOne = async (req, res) => {
  const id = req.params.id;
  try {
    const data = await Recurso.findById(id).populate("cobertura");
    if (!data)
      res.status(404).send({ message: "Not found Tutorial with id " + id });
    else res.send(data);
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error retrieving Tutorial with id=" + id });
  }
};

// Update a Tutorial by the id in the request
exports.update = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  const id = req.params.id;
  const recurso = await Recurso.findById(id);
  if (!recurso) {
    res.status(404).send({
      message: `No se ha podido encontrar el recurso solicitado con id=${id}. `,
    });
    return false;
  }

  const cober = Cobertura.findById(recurso.cobertura);

  try {
    const data = await Cobertura.findByIdAndUpdate(
      recurso.cobertura,
      {
        fecha_inicial: req.body.fecha_inicial,
        fecha_final: req.body.fecha_final,
        longitud: req.body.longitud,
        latitud: req.body.latitud,
        departamento: req.body.departamento,
        ciudad: req.body.ciudad,
      },
      { useFindAndModify: false }
    );
    const data2 = await Recurso.findByIdAndUpdate(
      id,
      {
        titulo: req.body.titulo,
        claves: req.body.claves,
        tipo_recurso: req.body.tipo_recurso,
        descripcion: req.body.descripcion,
        fuente: req.body.fuente,
      },
      { useFindAndModify: false }
    );
    if (!data2) {
      res.status(404).send({
        message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found!`,
      });
    } else res.send(data2);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Delete a Tutorial with the specified id in the request
exports.delete = async (req, res) => {
  const id = req.params.id;
  try {
    const recurso_delete = await Recurso.findByIdAndRemove(id, {
      useFindAndModify: false,
    });
    const cobertura_delete = await Cobertura.findByIdAndRemove(recurso_delete.cobertura, {
      useFindAndModify: false,
    });
    
    
    res.send(recurso_delete);
  } catch (error) {
    res.status(500).send(error);
  }
};
