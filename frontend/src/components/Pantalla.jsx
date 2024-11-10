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
        <span className={`${estado ? "text-green-600" : " text-red-600"}`}>
          {estado ? "Registrada" : "No Registrada"}
        </span>
      </div>
      <div className="">
        <span className="text-yellow-400">{estadollamada}</span>
      </div>
    </div>
  </div>
);

export default Pantalla;
