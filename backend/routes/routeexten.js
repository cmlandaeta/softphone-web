import express from "express";
import Crtl from "../controllers/usuarioscontrollers.js";

const routeExten = express.Router();

routeExten.get("/validar-ext", Crtl.validarExtension);

export default routeExten;
