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
    console.log(req.body);
    const check = await validation(req.body);
    const exten = req.params.id;

    if (check) {
      return res.status(400).json({ error: "Todos los campos son requeridos" });
    }
    const { nombre, apellido, password } = req.body;
    const passwordEncriptada = await bcrypt.hash(password, 10);

    const datosActualizar = {
      nombre,
      apellido,
      password: passwordEncriptada,
    };
    try {
      const updateUser = await Usuarios.updateOne(
        { extensionregistro: exten },
        datosActualizar
      );
      console.log(updateUser);
      if (updateUser) res.status(200).json({ msg: "usuario actualizado" });
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
      const usuario = await Usuarios.findOne({ extensionregistro: id });

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
        ? res.status(200).json({ message: "Extension Registrada" })
        : res.status(400).json({ message: "No autorizado" });
    } catch (error) {
      res.status(501).json({ message: " No se puede registrar la extension" });
    }
  }

  async logout(req, res) {
    res
      .clearCookie("token_login")
      .status(200)
      .json({ msg: "Logout Successful" });
  }

  async validarExtension(req, res) {
    const { exten } = req.query;

    console.log(exten);

    const extenExistente = await Usuarios.findOne({
      extensionregistro: exten,
    });
    if (extenExistente) {
      return res.status(200).json({ message: "La extension ya está en uso" });
    }

    res.status(200).json({ message: "La extension está disponible" });
  }

  async validarEmail(req, res) {
    const { email } = req.query;

    const emailExistente = await Usuarios.findOne({ email });
    if (emailExistente) {
      return res.status(200).json({ message: "El Email ya está en uso" });
    }

    res.status(200).json({ message: "Email está disponible" });
  }
}

export default new usuariosControllers();
