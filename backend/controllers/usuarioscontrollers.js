import Usuarios from "../models/Usuarios.js";
import { validation } from "../helpers/validation.js";
import { generarToken } from "../helpers/autentication.js";
import bcrypt from "bcrypt";

class usuariosControllers {
  constructor() {}

  async createUsuarios(req, res) {
    console.log("ENTRA AQUI");
    const {
      nombre,
      apellido,
      email,
      extensionregistro,
      extensiondestino,
      password,
    } = req.body;

    const passwordEncriptada = await bcrypt.hash(password, 10);

    const datosNuevosUsuario = {
      nombre,
      apellido,
      email,
      extensionregistro,
      extensiondestino,
      password: passwordEncriptada,
    };

    const nuevoUsuario = new Usuarios(datosNuevosUsuario);

    try {
      const usuarioscreado = await nuevoUsuario.save();

      res.status(200).json({ msg: "Usuario Creado", usuarioscreado });
    } catch (error) {
      res.status(501).json({ mensagge: "error al crear el usuarios", error });
    }
  }

  async updateUsuarios(req, res) {
    const check = validation(req.body);

    if (check) {
      return res.status(400).json({ error: "Todos los campos son requeridos" });
    }

    try {
    } catch (error) {
      res
        .status(501)
        .json({ mensagge: "error al actualizar el usuarios", error });
    }
  }

  async deleteUsuarios(req, res) {
    const { id } = req.params;
    try {
      const usuario = await Usuarios.findByIdAndDelete(id);
      res.status(200).json(usuario);
    } catch (error) {
      res.status(501).json({ mensagge: "error al buscar el usuario", error });
    }
  }

  async getUsuarios(req, res) {
    try {
      const usuarios = await Usuarios.find();

      res.status(200).json(usuarios);
    } catch (error) {
      res.status(501).json({ mensagge: "error al buscar los usuarios", error });
    }
  }

  async getUsuario(req, res) {
    const { id } = req.params;

    try {
      const usuario = await Usuarios.findById(id);

      !usuario
        ? res.status(404).json({ mensagge: "no hay usuarios" })
        : res.status(200).json(usuario);
    } catch (error) {
      res.status(501).json({ mensagge: "error al buscar el usuario", error });
    }
  }

  async register(req, res) {
    const token = req.cookies.token_login;

    //console.log(token);

    try {
      token
        ? res.json({ message: "Extension Registrada", token })
        : res.status(400).json({ message: "No autorizado" });
    } catch (error) {
      res.status(501).json({ message: " No se puede registrar la extension" });
    }
  }
}

export default new usuariosControllers();
