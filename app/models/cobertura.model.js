module.exports = mongoose => {
  var Schema = mongoose.Schema(
    {
      fecha_inicial: {
        type: Date,
        required: false,
      },
      fecha_final: {
        type: Date,
        required: false,
      },
      longitud: {
        type: String,
        required: false,
      },
      Latitud: {
        type: String,
        required: false,
      },
      departamento: {
        type: Number,
        required: false,
      },
      ciudad: {
        type: Number,
        required: false,
      },     
    },
    { timestamps: true }
  );

  Schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Cobertura = mongoose.model("Cobertura", Schema);
  return Cobertura;
};
