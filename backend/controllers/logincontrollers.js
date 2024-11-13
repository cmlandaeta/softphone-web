import Usuarios from "../models/Usuarios.js";
import { validation } from "../helpers/validation.js";
import { generarToken } from "../helpers/autentication.js";
import bcrypt from "bcrypt";

const Ctrl = {};

Ctrl.login = async (req, res) => {
  const { email, password } = req.body;

  const usuario = await Usuarios.findOne({ email });
  console.log(usuario);

  if (!usuario) return res.status(400).json({ error: "Usuario no Existe" });

  const validPassword = bcrypt.compareSync(password, usuario.password);

  if (!validPassword) return res.status(400).json({ error: "Clave Invalida" });

  try {
    const token = generarToken(
      email,
      usuario.extensionregistro,
      usuario.extensiondestino
    );
    token
      ? res
          .cookie("token_login", token, {
            httpOnly: true,
            secure: process.env.NODE.ENV === "production",
            //httpOnly: false,
            //secure: false,
            sameSite: "lax",
            maxAge: 1000 * 60 * 60,
          })
          .json({
            message: "Usuario Logueado",
            nombre: usuario.nombre,
            apellido: usuario.apellido,
            exten: usuario.extensionregistro,
          })
      : res.status(400).json({ message: "No autorizado" });
  } catch (error) {
    res.status(501).json({ message: " No se puede Loguear" });
  }
};
export default Ctrl;
