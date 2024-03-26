import React from "react";
import toast from "react-hot-toast";

const TailwindButton = () => {
  return toast("Hello Darkness!", {
    icon: "👏",
    style: {
      borderRadius: "10px",
      background: "#333",
      color: "#fff",
    },
  });
};

export default TailwindButton;
