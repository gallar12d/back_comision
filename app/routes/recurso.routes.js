module.exports = (app) => {
  const recursos = require("../controllers/recurso.controller.js");
const { authJwt } = require("../middlewares");

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

  router.get("/", [authJwt.verifyToken], recursos.findAll);

  router.get("/:id", [authJwt.verifyToken], recursos.findOne);

  router.put("/:id", [authJwt.verifyToken], validate(validation, {}, {}), recursos.update);

  router.delete("/:id", [authJwt.verifyToken], recursos.delete);


  app.use("/api/recursos", router);
};
