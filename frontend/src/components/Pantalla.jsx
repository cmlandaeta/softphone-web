import React from "react";

const Pantalla = ({ entrada, estado, estadollamada }) => (
  <div className="pantalla">
    <div className="text-pantalla">
      <div className="">Nombre: {entrada.nombre}</div>
      <div className="">
        Exten: <span className="text-yellow-400">{entrada.exten}</span>
      </div>
    </div>
    <div className="text-pantalla">
      <div className="">
        Status:{" "}
        <span
          className={`${
            estado === "Online"
              ? "text-green-600"
              : estado === "Offline"
              ? " text-red-600"
              : false
          }`}
        >
          {estado}
        </span>
      </div>
      <div className="text-center">
        <p
          className={`${
            estadollamada === "Conectado!"
              ? "text-green-600 "
              : estadollamada === "Llamada Finalizada!"
              ? "text-red-600"
              : "text-yellow-600 "
          }`}
        >
          {estadollamada}
        </p>
      </div>
    </div>
  </div>
);

export default Pantalla;
