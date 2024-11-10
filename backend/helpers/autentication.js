import jwt from "jsonwebtoken";
import "dotenv/config";

export function generarToken(email, extreg, extdest) {
  return jwt.sign({ email, extdest, extreg }, process.env.JSON_WEB_TOKEN, {
    expiresIn: "1h",
  });
}

export function verificarToken(req, res, next) {
  //const token = req.header("Authorization")?.replace("Bearer ", "");

  const token = req.cookies.token_login;

  if (!token) {
    return res.status(401).json({ error: "Token Requerido" });
  }

  req.session = { usr: null, extreg: null, extdest: null };

  try {
    const dataToken = jwt.verify(token, process.env.JSON_WEB_TOKEN);
    req.session = {
      usr: dataToken.email,
      extreg: dataToken.extreg,
      extdest: dataToken.extdest,
    };
    dataToken ? next() : false;
  } catch (error) {
    res.status(401).json({ error: "Token no Valido" });
  }
}
