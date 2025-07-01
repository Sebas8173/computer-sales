const mongoose = require("mongoose");

const computerSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    marca: { type: String, required: true },
    modelo: { type: String, required: true },
    cpu: { type: String, required: true },
    ram: { type: String, required: true },
    almacenamiento: { type: String, required: true },
    precio: { type: Number, required: true },
  },
  { collection: "computers" }
);

module.exports = mongoose.model("Computer", computerSchema);