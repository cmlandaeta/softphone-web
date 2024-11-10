import mongoose from "mongoose";

const SchemaUsuarios = new mongoose.Schema(
  {
    nombre: { type: String, require: true, trim: true },
    apellido: { type: String, require: true, trim: true },
    email: { type: String, require: true, unique: true, trim: true },
    password: { type: String, require: true, trim: true },
    extensionregistro: { type: Number, unique: true, trim: true },
    extensiondestino: { type: Number, unique: true, trim: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Usuarios = mongoose.model("Usuarios", SchemaUsuarios);

export default Usuarios;
