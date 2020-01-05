import React, { Component } from "react";
import "../css/home.css";
import { master } from "../images";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      retailerName: null
    };
  }
  componentDidMount() {
    fetch(
      `http://192.168.15.210:2000/retailer/getid/${this.props.match.params.name}`
    )
      .then(data => data.json())
      .then(data => {
        console.log(data);

        this.setState({ retailerName: data.retailerName });
        localStorage.setItem("retailerId", data._id);
      });
  }

  render() {
    return (
      <div className="home-wrapper">
        <div className="retailer-name">{this.state.retailerName}</div>
        <div>
          <img className="master-logo" src={master} alt="" />
        </div>
        <div className="description-text">
          Welcome to <b>{this.state.retailerName}</b>! <br /> Register using one
          of the following options <br />
          to avail the offers from our store!
        </div>
        <a href="http://localhost:2000/auth/google" className="register-button">
          <i className="fab fa-google"></i> &nbsp; Google
        </a>
        <a
          href="https://api.whatsapp.com/send?phone=+14155238886&amp;text=login using whatsapp"
          className="register-button"
        >
          <i className="fab fa-whatsapp"></i> &nbsp;Whatsapp
        </a>
        <a
          href="http://localhost:2000/auth/facebook"
          className="register-button"
        >
          <i className="fab fa-facebook-f"></i> &nbsp; Facebook
        </a>
      </div>
    );
  }
}
