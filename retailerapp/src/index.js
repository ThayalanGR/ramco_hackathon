import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { toast, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
toast.configure({
  autoClose: 3000,
  position: "bottom-center",
  transition: Zoom
});

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById("root")
);
