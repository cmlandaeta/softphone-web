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
import routeExten from "./routes/routeexten.js";
import nodemailer from "nodemailer";
const fecha = new Date();

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
//app.use(cors());
app.use(
  cors({
    origin: process.env.URL_FRONT || "http://localhost:5173",
    credentials: true,
  })
);
app.use(morgan("tiny"));

app.use("/api/usuarios", routeUsuarios);
app.use("/api/call", routeLlamadas);
app.use("/api/login", routeLogin);
app.use("/api/exten", routeExten);

(async () => {
  const PORT = process.env.PORT || 3000;
  try {
    app.listen(PORT, () => console.log("Servidor UP en el puerto: ", PORT));
  } catch (error) {
    console.log(error);
  }
})();

app.use("/ping", (req, res) => {
  res.status(200).send("OK");
});

app.use("/send-visit-data", async (req, res) => {
  const {
    ip,
    country,
    city,
    region,
    timezone,
    time,
    latitude,
    longitude,
    org,
    from,
  } = req.body;

  const mensajeHTML = `
  <!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body {
      font-family: 'Arial', sans-serif;
      line-height: 1.6;
      margin: 0;
      padding: 0;
    }

    .container {
      max-width: 600px;
      margin: 20px auto;
      border: 1px solid #ddd;
      border-radius: 8px;
      overflow: hidden;
    }

    .header {
      background-color: #007baa;
      padding: 20px;
      text-align: center;
    }

    .content {
      padding: 20px;
    }

    .footer {
      background-color: #007b;
      padding: 10px;
      text-align: center;
    }

    .button {
      display: inline-block;
      padding: 10px 20px;
      background-color: #007bff;
      color: #fff;
      text-decoration: none;
      border-radius: 5px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2>Mensaje enviado del ${from}</h2>
    </div>
    <div class="content">
      <p>¡Hola Carlos,</p>
      <p>Tienes una nueva visita a tu ${from}.</p>
      <p>Fecha de Creacion del Mensaje: ${fecha}</p>
      <p>IP: ${ip}</p>
      <p> País: ${country}</p>
      <p> Ciudad: ${city}</p>
      <p> Región: ${region}</p>
      <p> Zona Horaria: ${timezone}</p>
      <p> Hora de la visita: ${time}
      <p>Latitude / Longitude: ${latitude}, ${longitude}</p>
      <p>ISP: ${org}</p>
     
      <p>Saludos, Nova</p>
   
    </div>
    <div class="footer">
      <p>¡Asistente Virtual!.</p>
    </div>
  </div>
</body>
</html>
  
`;

  try {
    const mailOptions = {
      from: '"Reporte de Visita Softphone Web "' + process.env.EMAIL_USER,
      to: process.env.EMAIL_ME,
      subject: "Nueva visita a tu " + from,
      text: "configuracion",
      html: mensajeHTML,
    };

    // Envío del correo
    await transporter.sendMail(mailOptions);
    res.status(200).send("Correo enviado con éxito");
  } catch (error) {
    console.error("Error al enviar el correo", error);
    res.status(500).send("Error al enviar el correo");
  }
});
