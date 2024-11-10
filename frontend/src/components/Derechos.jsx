import React, { useEffect, useState } from "react";
import "../styles/style.css";

const Derechos = () => {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  const handleClick = (pn) => {
    switch (pn) {
      case 1:
        window.open(
          "https://portafolio-4z71.onrender.com",
          "_blank",
          "noopener,noreferrer"
        );
        break;

      default:
        break;
    }
  };

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);
  return (
    <footer>
      <p className="derechos">
        <span className="autor"> &copy; </span>
        {currentYear} Creado por{" "}
        <span className="autor"> Carlos Landaeta.</span> Todos los derechos
        reservados.
      </p>
      <p className="autor text-center">
        Contáctame:{" "}
        <span className="autor">
          <a className="cursor-pointer text-red-600" href={handleClick(1)}>
            Visita Mi Perfil, +584242211795
          </a>
        </span>
      </p>
    </footer>
  );
};

export default Derechos;
