import express from "express";
import usuariosControllers from "../controllers/usuarioscontrollers.js";

const routeExten = express.Router();

routeExten.get("/validar-ext", usuariosControllers.validarExtension);
routeExten.get("/validar-email", usuariosControllers.validarEmail);

export default routeExten;
