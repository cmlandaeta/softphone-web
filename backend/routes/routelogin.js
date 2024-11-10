import express from "express";
import Crtl from "../controllers/logincontrollers.js";
const routeLogin = express.Router();

routeLogin.post("/", Crtl.login);

export default routeLogin;
