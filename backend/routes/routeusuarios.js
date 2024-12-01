import express from "express";
import usuariosControllers from "../controllers/usuarioscontrollers.js";
import { verificarToken } from "../helpers/autentication.js";
const routeUsuarios = express.Router();

routeUsuarios.get("/", usuariosControllers.getUsuarios);
routeUsuarios.get("/:id", usuariosControllers.getUsuario);
// routeUsuarios.get("/validar-ext", usuariosControllers.validarExtension);
// routeUsuarios.get("/validar-email", usuariosControllers.validarEmail);
routeUsuarios.post("/", usuariosControllers.createUsuarios);
routeUsuarios.post("/register", verificarToken, usuariosControllers.register);
routeUsuarios.post("/logout", usuariosControllers.logout);
routeUsuarios.put("/:id", usuariosControllers.updateUsuarios);
routeUsuarios.delete("/:id", usuariosControllers.deleteUsuarios);

export default routeUsuarios;
