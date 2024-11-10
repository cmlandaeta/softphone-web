import express from "express";
const routeLlamadas = express.Router();
import Crtl from "../controllers/llamadascontrollers.js";
import { verificarToken } from "../helpers/autentication.js";

routeLlamadas.post("/", verificarToken, Crtl.call);

export default routeLlamadas;
