import React, { useEffect, useState } from "react";
import CustomAlert from "./Alert";
import Teclado from "./Teclado";
import axios from "axios";
import Register from "./Register";
import CaptureVisit from "./Catch";
import Derechos from "./Derechos";

const apiUrl = import.meta.env.VITE_BK_URL || "http://localhost:9001";

const Login = ({}) => {
  const [showModalTeclado, setModalTeclado] = useState(false);
  const [showModalLogin, setModalLogin] = useState(true);
  const [usuario, setUsuario] = useState({});
  const [showModalRegister, setModalRegister] = useState(false);
  const [isEditModeRegister, setIsEditModeRegister] = useState("");
  const [titleModal, setTitleModal] = useState("");

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showAlert, setShowAlert] = useState(false);
  const [alertConfig, setAlertConfig] = useState({
    type: "",
    title: "",
    message: "",
  });

  const handleShowAlert = (type, title, message) => {
    setAlertConfig({ type, title, message });
    setShowAlert(true);
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSwitch = (sw) => {
    switch (sw) {
      case "rg":
        setModalRegister(true);
        setModalLogin(false);
        setTitleModal("Cree una Cuenta");
        break;
      case "lg":
        setModalLogin(true);
        setModalRegister(false);
        setModalTeclado(false);
        setTitleModal("Login");
        break;
      case "tc":
        setModalTeclado(true);
        setModalLogin(false);
        setTitleModal("Registrar Extension");
        break;

      case "ac":
        setModalTeclado(false);
        setModalRegister(true);
        setTitleModal("Editar Cuenta");
        setIsEditModeRegister(true);
        break;

      default:
        break;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${apiUrl}/api/login`, formData, {
        withCredentials: true,
      });

      if (response.status === 200)
        Object.keys(formData).forEach((key) => (formData[key] = ""));
      setUsuario(response.data);
      handleShowAlert("success", "OK!", "Bienvenido!");
      handleSwitch("tc");
    } catch (error) {
      Object.keys(formData).forEach((key) => (formData[key] = ""));
      handleShowAlert("error", "Error!", "Sin Acceso!");
    }
  };

  const hanleUpdate = () => {
    handleSwitch("ac");
  };

  useEffect(() => {
    const handleGestionLogout = () => {};
    handleGestionLogout();
  }),
    [];

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

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3 className="text-xl font-semibold">
          {/* {showModalLogin ? "Login" : "Emparejar Extension"} */}
          {titleModal}
        </h3>
        <CaptureVisit />
        <div>
          {showModalTeclado && (
            <Teclado
              usuario={usuario}
              onUpdate={() => hanleUpdate()}
              onSwitch={() => handleSwitch("lg")}
            />
          )}
        </div>
        <div>
          {showModalRegister && (
            <Register
              edit={isEditModeRegister}
              usuario={usuario}
              onSwitch={() => handleSwitch("lg")}
            />
          )}
        </div>
        <div className="absolute top-0 right-0 mt-4 mr-4">
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
        {showModalLogin && (
          <form className="mt-8" onSubmit={handleSubmit}>
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="text"
                name="email"
                id="email"
                className="block py-2.5 px-0 w-full text-center text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                value={formData.email}
                onChange={handleChange}
                required
              />
              <label
                htmlFor=""
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-30 peer-focus:-translate-y-6"
              >
                Email
              </label>
            </div>

            <div className="relative z-0 w-full mb-5 group">
              <input
                type="password"
                name="password"
                id="password"
                className="block py-2.5 px-0 w-full text-center text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                value={formData.password}
                onChange={handleChange}
                required
              />
              <label
                htmlFor=""
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-30 peer-focus:-translate-y-6"
              >
                Password
              </label>
            </div>

            <div className="grid grid-cols-2">
              <div className="flex flex-col">
                <span
                  className="text-registrar mb-2"
                  onClick={() => handleSwitch("rg")}
                >
                  Registrar Cuenta
                </span>
              </div>
              <div className="flex">
                <button className="btn-enviar">Enviar</button>
              </div>
            </div>
          </form>
        )}
        <div>
          {showModalLogin && <Derechos onPortafolio={() => handleClick(1)} />}
        </div>
      </div>
    </div>
  );
};

export default Login;
