module.exports = (app) => {
  const recursos = require("../controllers/recurso.controller.js");
  const { validate, ValidationError, Joi } = require("express-validation");

  var router = require("express").Router();
  const validation = {
    body: Joi.object({
      titulo: Joi.string().required(),
      claves: Joi.string().required(),
      descripcion: Joi.string().required(),
      tipo_recurso: Joi.string().required(),
      fuente: Joi.string().required(),
      fecha_inicial: Joi.date().required(),
      fecha_final: Joi.date().required(),
      longitud: Joi.string().required(),
      latitud: Joi.string().required(),
      departamento: Joi.number().required(),
      ciudad: Joi.number().required(),
    }),
  };

  router.post("/", validate(validation, {}, {}), recursos.create);

  router.get("/", recursos.findAll);

  // router.get("/published", recursos.findAllPublished);

  // Retrieve a single Tutorial with id
  router.get("/:id", recursos.findOne);

  // // Update a Tutorial with id
  router.put("/:id", validate(validation, {}, {}), recursos.update);

  // Delete a Tutorial with id
  router.delete("/:id", recursos.delete);

  // // Create a new Tutorial
  // router.delete("/", recursos.deleteAll);

  app.use("/api/recursos", router);
};
