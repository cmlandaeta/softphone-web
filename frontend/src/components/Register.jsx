import React, { useEffect, useState, useRef } from "react";
import CustomAlert from "./Alert";
import Teclado from "./Teclado";
import Login from "./Login";
import axios from "axios";

const apiUrl = import.meta.env.VITE_BK_URL || "http://localhost:9001";

const Register = ({ usuario, onSwitch, edit }) => {
  const [isEditarModo, setIsEditarModo] = useState(edit);
  const [showModalRegister, setModalRegister] = useState(true);
  const [showModalTeclado, setModalTeclado] = useState(false);
  const [showModalLogin, setModalLogin] = useState(false);
  const [updateUser, setUpdateUser] = useState("");
  const [usuarios, setUsuarios] = useState([]);
  const isEditMode = Boolean(usuario);
  const haEntradoEnEdicion = useRef(false);

  const [error, setError] = useState("");

  useEffect(() => {
    if (edit && !haEntradoEnEdicion.current) {
      // if (edit) {
      const obtenerUsuario = async () => {
        const response = await axios.get(
          `${apiUrl}/api/usuarios/${usuario.exten}`
        );
        setUpdateUser(response.data);
      };

      obtenerUsuario();
      haEntradoEnEdicion.current = true;
    }
  }, [edit]);

  useEffect(() => {
    const ObtenerUsuarios = async () => {
      const usuarios = await axios.get(`${apiUrl}/api/usuarios`);
      setUsuarios(usuarios.data);
    };

    ObtenerUsuarios();
  }, []);

  useEffect(() => {
    setIsEditarModo(edit);
  }, [edit]);

  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    extensionregistro: "",
    extensiondestino: "",
    password: "",
  });

  const [showAlert, setShowAlert] = useState(false);
  const [alertConfig, setAlertConfig] = useState({
    type: "",
    title: "",
    message: "",
  });

  useEffect(() => {
    if (isEditarModo) {
      setFormData({
        nombre: updateUser.nombre || "",
        apellido: updateUser.apellido || "",
        email: updateUser.email || "",
        extensionregistro: updateUser.extensionregistro || "",
        extensiondestino: updateUser.extensiondestino || "",
        password: updateUser.password || "",
      });
    }
  }, [updateUser]);

  const handleShowAlert = (type, title, message) => {
    setAlertConfig({ type, title, message });
    setShowAlert(true);
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  const validarExten = async (exten) => {
    const response = await axios.get(
      `${apiUrl}/api/exten/validar-ext?exten=${exten}`
    );

    const extenDuplicado = usuarios.some(
      (usr) => usr.extensionregistro === parseInt(exten)
    );

    if (extenDuplicado || response.status === 400) {
      setError(`La extensions ${exten} ya está en uso.`);
    }
  };

  const validarEmail = async (exten) => {
    const response = await axios.get(
      `${apiUrl}/api/exten/validar-ext?exten=${exten}`
    );

    const extenDuplicado = usuarios.some(
      (usr) => usr.extensionregistro === parseInt(exten)
    );

    if (extenDuplicado || response.status === 400) {
      setError(`La extensions ${exten} ya está en uso.`);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    const extPattern = /^(100|[1-9]?[0-9])$/;

    validarExten(value);
    setError(" ");

    // if (extPattern.test(value)) {
    //   setError("");
    //   validarExten(value);
    // } else {
    //   setError("El Numero de Extension debe ser del 1 al 100.");
    // }
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditarModo) {
        const response = await axios.put(
          `${apiUrl}/api/usuarios/${usuario.exten}`,
          formData
        );
        if (response.status === 200)
          handleShowAlert("success", "OK!", "Usuario Actualizado con Éxito!");
      } else {
        const response = await axios.post(`${apiUrl}/api/usuarios`, formData);
        if (response.status === 200) {
          setModalTeclado(true);
          Object.keys(formData).forEach((key) => (formData[key] = ""));
          return handleShowAlert(
            "success",
            "OK!",
            "Extension Creada con Éxito!"
          );
        }
      }
    } catch (error) {
      //Object.keys(formData).forEach((key) => (formData[key] = ""));
      handleShowAlert("error", "Erro!", "No se pudo crear la extension!");
    }
  };

  return (
    <>
      {" "}
      {showModalRegister && (
        <div className="modal-content">
          <div>{showModalLogin && <Login />}</div>
          <div>{showModalTeclado && <Teclado />}</div>
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

          <form className="mt-8" onSubmit={handleSubmit}>
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="text"
                name="nombre"
                id="nombre"
                className="block py-2.5 px-0 w-full text-center text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                value={formData.nombre}
                onChange={handleChange}
                required
              />
              <label
                htmlFor=""
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-30 peer-focus:-translate-y-6"
              >
                Nombre
              </label>
            </div>

            <div className="relative z-0 w-full mb-5 group">
              <input
                type="text"
                name="apellido"
                id="apellido"
                className="block py-2.5 px-0 w-full text-center text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                value={formData.apellido}
                onChange={handleChange}
                required
              />
              <label
                htmlFor=""
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-30 peer-focus:-translate-y-6"
              >
                Apellido
              </label>
            </div>
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

            <div className="relative z-0 w-full mb-5 group">
              <input
                type="number"
                name="extensionregistro"
                id="extreg"
                className="block py-2.5 px-0 w-full text-center text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                value={formData.extensionregistro}
                onChange={handleChange}
                required
              />
              <label
                htmlFor=""
                className="peer-focus:font-medium absolute t text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-30 peer-focus:-translate-y-6"
              >
                Extension de Registro
              </label>

              {error && (
                <p className="text-sm font-semibold text-red-500">{error}</p>
              )}
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="number"
                name="extensiondestino"
                id="extdest"
                className="block py-2.5 px-0 w-full text-center text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                value={formData.extensiondestino}
                onChange={handleChange}
                required
              />
              <label
                htmlFor=""
                className="peer-focus:font-medium absolute t text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-30 peer-focus:-translate-y-6"
              >
                Extension de Destino
              </label>
            </div>
            <div className="grid grid-cols-2">
              <div className="flex">
                <span className="text-registrar" onClick={() => onSwitch("lg")}>
                  Acceder
                </span>
              </div>
              <div className="flex">
                <button className="btn-enviar">
                  {isEditarModo ? "Editar" : "Enviar"}
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default Register;
