import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import uno from "../tonos/1.mp3";
import Reproduccion from "./Reproduccion";
import CustomAlert from "./Alert";
import Pantalla from "./Pantalla";
import axios from "axios";

const Teclado = ({ usuario, onSwitch, onUpdate }) => {
  const [audio, setAudio] = useState(null);

  const [idinputs, setIdInputs] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [user, setUser] = useState(usuario);
  const [status, setStatus] = useState("Offline");
  const [callStatus, setCallStatus] = useState("");
  const [isRegister, setRegister] = useState(true);
  const [showAlert, setShowAlert] = useState(false);
  const [alertConfig, setAlertConfig] = useState({
    type: "",
    title: "",
    message: "",
  });
  const navigate = useNavigate();

  const handleShowAlert = (type, title, message) => {
    setAlertConfig({ type, title, message });
    setShowAlert(true);
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  const apiUrl = import.meta.env.VITE_BK_URL || "http://localhost:9001";

  const reproducirAudio = (id) => {
    const audioElement = document.getElementById(`audio${id}`);
    if (audioElement) {
      audioElement.play();
    }
  };

  const opc = (e) => {
    const opcion = e.target.id;

    // Usar la función de actualización para obtener el valor más reciente de `inputValue`
    setInputValue((prevValue) => {
      const newValue = prevValue + opcion; // Concatenar el valor nuevo
      setIdInputs(newValue); // Llamar a `setIdInputs` con el valor actualizado
      setCallStatus(newValue); // Llamar a `setCallStatus` con el valor actualizado
      return newValue; // Devolver el nuevo valor para actualizar `inputValue`
    });
  };

  const handlecolgarllamar = async (sw) => {
    try {
      if (sw === "reg") {
        const response = await axios.post(
          `${apiUrl}/api/usuarios/register`,
          {},
          {
            withCredentials: true,
          }
        );
        if (response.status === 200) {
          setRegister(false);
          setStatus("Online");
          handleShowAlert("success", "OK!", "Extension Registrada!");
        }
      } else if (sw === "call") {
        const response = await axios.post(
          `${apiUrl}/api/call`,
          {},
          {
            withCredentials: true,
          }
        );
        if (response.status === 200) {
          setCallStatus("Conectando...");

          setTimeout(() => {
            setAudio("5");
            setCallStatus("Conectado!");
          }, 2000);

          setTimeout(() => {
            setAudio(" ");
            setCallStatus("Llamada Finalizada!");
          }, 16000);

          setTimeout(() => {
            setCallStatus(" ");
          }, 18000);
        } else if (response.status === 401) {
          handleShowAlert("info", "ERROR", "Registre la extension!");
        }
      }
    } catch (error) {
      handleShowAlert("error", "ERROR", "No se puede Registrar!");
    }
  };

  const handleLogout = async () => {
    try {
      const response = await axios.post(
        `${apiUrl}/api/usuarios/logout`,
        {},
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        handleShowAlert("success", "OK", "Sesión Cerrada!");
        //navigate("/"); // Redirige a la página de login
        onSwitch("lg");
        setCallStatus(" ");
        setUser(" ");
      }
    } catch (error) {
      handleShowAlert("success", "OK", "Sesión Cerrada!");
    }
  };

  const handleUpdate = () => {
    onUpdate();
  };
  return (
    <div className="teclado-smartphone ">
      <Pantalla entrada={user} estado={status} estadollamada={callStatus} />
      <Reproduccion audio={audio} />
      <div className="absolute top-0 right-20 mt-4 mr-4">
        {showAlert && (
          <CustomAlert
            type={alertConfig.type}
            title={alertConfig.title}
            message={alertConfig.message}
            duration={2500}
            onClose={handleCloseAlert}
          />
        )}
      </div>
      <div id="botones" className="botones">
        <button
          id="1"
          className="tecla"
          onClick={(e) => {
            reproducirAudio(1);
            opc(e);
          }}
        >
          <audio id="audio1" src={uno}></audio>1
        </button>
        <button
          id="2"
          className="tecla"
          onClick={(e) => {
            reproducirAudio(2);
            opc(e);
          }}
        >
          <audio id="audio2" src={uno}></audio>2
        </button>
        <button
          id="3"
          className="tecla"
          onClick={(e) => {
            reproducirAudio(3);
            opc(e);
          }}
        >
          <audio id="audio3" src={uno}></audio>3
        </button>
        <button
          id="4"
          className="tecla"
          onClick={(e) => {
            reproducirAudio(3);
            opc(e);
          }}
        >
          <audio id="audio4" src={uno}></audio>4
        </button>
        <button
          id="5"
          className="tecla"
          onClick={(e) => {
            reproducirAudio(3);
            opc(e);
          }}
        >
          <audio id="audio5" src={uno}></audio>5
        </button>
        <button
          id="6"
          className="tecla"
          onClick={(e) => {
            reproducirAudio(3);
            opc(e);
          }}
        >
          <audio id="audio6" src={uno}></audio>6
        </button>
        <button
          id="7"
          className="tecla"
          onClick={(e) => {
            reproducirAudio(3);
            opc(e);
          }}
        >
          <audio id="audio7" src={uno}></audio>7
        </button>
        <button
          id="8"
          className="tecla"
          onClick={(e) => {
            reproducirAudio(3);
            opc(e);
          }}
        >
          <audio id="audio8" src={uno}></audio>8
        </button>
        <button
          id="9"
          className="tecla"
          onClick={(e) => {
            reproducirAudio(3);
            opc(e);
          }}
        >
          <audio id="audio9" src={uno}></audio>9
        </button>
        <button
          id="asterisco"
          className="tecla"
          onClick={(e) => {
            reproducirAudio(3);
            opc(e);
          }}
        >
          <audio id="*" src={uno}></audio>*
        </button>
        <button
          id="*"
          className="tecla"
          onClick={(e) => {
            reproducirAudio(3);
            opc(e);
          }}
        >
          <audio id="audio0" src={uno}></audio>0
        </button>
        <button
          id="#"
          className="tecla"
          onClick={(e) => {
            reproducirAudio(3);
            opc(e);
          }}
        >
          <audio id="#" src={uno}></audio>#
        </button>
      </div>

      <div className="contenedor-colgar mb-3">
        <button
          id="colgar"
          className={`${isRegister ? "tecla-registrar" : "tecla-colgar"}`}
          onClick={
            isRegister
              ? () => handlecolgarllamar("reg")
              : () => handlecolgarllamar("call")
          }
        >
          <audio id="colgar" src={uno}></audio>
          {isRegister ? "Registrar" : "Llamar"}
        </button>

        {!isRegister ? (
          <button onClick={() => handleLogout()} className="tecla-logout">
            Logout
          </button>
        ) : (
          false
        )}
      </div>

      <span className="text-registrar" onClick={() => handleUpdate()}>
        Actualizar Cuenta
      </span>
    </div>
  );
};

export default Teclado;
