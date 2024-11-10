import express from "express";
import usuariosControllers from "../controllers/usuarioscontrollers.js";
import { verificarToken } from "../helpers/autentication.js";
const routeUsuarios = express.Router();

routeUsuarios.get("/", usuariosControllers.getUsuarios);
routeUsuarios.get("/:id", usuariosControllers.getUsuario);
routeUsuarios.post("/", usuariosControllers.createUsuarios);
routeUsuarios.post("/register", verificarToken, usuariosControllers.register);
routeUsuarios.put("/:id", usuariosControllers.updateUsuarios);
routeUsuarios.delete("/:id", usuariosControllers.deleteUsuarios);

export default routeUsuarios;
