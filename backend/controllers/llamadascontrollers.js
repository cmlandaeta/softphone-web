import Usuarios from "../models/Usuarios.js";
import { verificarToken } from "../helpers/autentication.js";
const Crtl = {};

Crtl.call = async (req, res) => {
  const { usr, extreg, extdest } = req.session;

  try {
    // const validarToken = verificarToken(token);

    // if (!validarToken) {
    //   return res.status(400).json({ message: "Token no Existe" });
    // }
    res
      .status(200)
      .json({ message: "Haciendo Llamadas", extreg: extreg, extdest: extdest });
  } catch (error) {
    return res.status(500).json({ message: "Error al hacer la llamada" });
  }
};

export default Crtl;
