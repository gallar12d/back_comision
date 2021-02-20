
module.exports = (mongoose) => {
  var Schema = mongoose.Schema(
    {
      titulo: {
        type: String,
        required: false,
      },
      claves: {
        type: String,
        required: false,
      },
      descripcion: {
        type: String,
        required: false,
      },
      fuente: {
        type: String,
        required: false,
      },
      tipo_recurso: {
        type: String,
        required: false,
      },
      cobertura: { type: mongoose.Schema.Types.ObjectId, ref: "Cobertura", required:false },
    },
    { timestamps: true }
  );

  Schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Recurso = mongoose.model("Recurso", Schema);
  return Recurso;
};
