import React, { Component } from "react";
import { success } from "../images";

export default class Success extends Component {
  render() {
    return (
      <div className="home-wrapper">
        <img className="success-png" src={success} alt="" srcset="" />
        <p>
          Thanks for Registering! Enjoy shopping..!
        </p>
      </div>
    );
  }
}
