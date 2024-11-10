import React, { useEffect } from "react";
import { Alert } from "flowbite-react";
import { HiInformationCircle } from "react-icons/hi";

const CustomAlert = ({ type, title, message, onClose, duration }) => {
  let color;

  switch (type) {
    case "success":
      color = "success";
      break;
    case "error":
      color = "failure";
      break;
    case "warning":
      color = "warning";
      break;
    case "info":
    default:
      color = "info";
      break;
  }

  useEffect(() => {
    if (duration) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  return (
    <Alert color={color} withBorderAccent icon={HiInformationCircle}>
      {" "}
      <span>
        {title && <span className="font-medium">{title}</span>}{" "}
        {message && <span>{message}</span>}
      </span>
    </Alert>
  );
};

export default CustomAlert;
