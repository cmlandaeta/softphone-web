import "dotenv/config";
import "./config/db.js";
const app = express();
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import morgan from "morgan";
import routeUsuarios from "./routes/routeusuarios.js";
import routeLlamadas from "./routes/routellamadas.js";
import routeLogin from "./routes/routelogin.js";

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
//app.use(cors());
app.use(
  cors({
    origin: "http://localhost:5173", // O el puerto donde se ejecuta tu frontend
    credentials: true,
  })
);
app.use(morgan("tiny"));

app.use("/api/usuarios", routeUsuarios);
//app.use("/api/register", routeUsuarios);
app.use("/api/call", routeLlamadas);
app.use("/api/login", routeLogin);
(async () => {
  const PORT = process.env.PORT || 3000;
  try {
    app.listen(PORT, () => console.log("Servidor UP en el puerto: ", PORT));
  } catch (error) {
    console.log(error);
  }
})();

// const PORT = process.env.PORT || 3000;

// try {
//   app.listen(PORT, () => console.log("Servidor UP en el puerto: ", PORT));
// } catch (error) {
//   console.log(error);
// }
