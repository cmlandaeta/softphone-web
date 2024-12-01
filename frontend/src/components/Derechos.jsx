import React, { useEffect, useState } from "react";

const Derechos = ({ onPortafolio }) => {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);
  return (
    <>
      <p className="derechos">
        <span className="autor"> &copy; </span>
        {currentYear} Creado por{" "}
        <span className="autor"> Carlos Landaeta.</span> Todos los derechos
        reservados.
      </p>
      <p className="autor text-center">
        Contáctame:{" "}
        <span className="autor">
          <div className="cursor-pointer text-red-600" onClick={onPortafolio}>
            Visita Mi Perfil, +584242211795{" "}
          </div>
        </span>
      </p>
    </>
  );
};

export default Derechos;
