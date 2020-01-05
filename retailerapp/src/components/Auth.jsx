import React, { Component } from "react";
import "../css/auth.css";
import Loader from "react-loader-spinner";
import { register, login } from "../images";
import { toast } from "react-toastify";
import config from "../config";

class Auth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayRegister: false,
      authLoading: false
    };
    this.Toggler = this.Toggler.bind(this);
    this.Login = this.Login.bind(this);
    this.Register = this.Register.bind(this);
  }

  // uis
  Login() {
    return (
      <form
        className={`login-holder ${
          this.state.displayRegister ? "hide-me" : ""
        }`}
        onSubmit={e => {
          e.preventDefault();
          let element = e.target.elements;
          this.loginHandler(element.email.value, element.password.value);
        }}
      >
        <div className="responsive-master-logo">
          <b>RetailersPro</b>
        </div>
        <div className="login-header">Login</div>
        <div className="native-login-input">
          <input required placeholder="Email" name="email" type="email" />
        </div>
        <div className="native-login-input">
          <input
            required
            placeholder="Password"
            name="password"
            type="password"
          />
        </div>
        <div className="remaind-me">
          <input type="checkbox" name="rememberme" />
          Remember Me
        </div>
        <button type="submit" className="native-login-button cursor-pointer">
          Login
        </button>
        <div className="forgot-password-holder cursor-pointer">
          Forgot password?
        </div>
        <div className="responsive-link-creator">
          Yet to create a RetailersPro Account?
        </div>
        <div
          onClick={() =>
            this.setState({
              displayRegister: !this.state.displayRegister
            })
          }
          className="responsive-custom-link cursor-pointer"
        >
          Create One
        </div>
      </form>
    );
  }

  Register() {
    return (
      <form
        className={`register-holder ${
          !this.state.displayRegister ? "hide-me" : ""
        }`}
        onSubmit={e => {
          e.preventDefault();
          let element = e.target.elements;
          if (element.password.value !== element.confirmpassword.value) {
            toast("Password doesn't match!");
            element.confirmpassword.value = "";
          } else {
            this.registerHandler(
              element.name.value,
              element.email.value,
              element.password.value,
              element.mobile.value
            );
          }
        }}
      >
        <div className="responsive-master-logo">
          <b>RetailersPro</b>
        </div>
        <div className="login-header">Register</div>
        <div className="native-login-input">
          <input required placeholder="Retailer Name" type="text" name="name" />
        </div>
        <div className="native-login-input">
          <input required placeholder="Email" type="email" name="email" />
        </div>
        <div className="native-login-input">
          <input required placeholder="Mobile" type="number" name="mobile" />
        </div>
        <div className="native-login-input">
          <input
            required
            placeholder="Password"
            type="password"
            name="password"
          />
        </div>
        <div className="native-login-input">
          <input
            required
            placeholder="Confirm Password"
            type="password"
            name="confirmpassword"
          />
        </div>
        <button type="submit" className="native-login-button cursor-pointer">
          Register
        </button>
        <div className="responsive-link-creator">
          Already have a RetailersPro Accont?
        </div>
        <div
          onClick={() =>
            this.setState({
              displayRegister: !this.state.displayRegister
            })
          }
          className="responsive-custom-link cursor-pointer"
        >
          Login
        </div>
      </form>
    );
  }

  Toggler() {
    return (
      <div
        className={`toggle-slider ${
          this.state.displayRegister ? "display-register" : ""
        }`}
      >
        {this.state.displayRegister ? (
          <div className="toggle-content-holder">
            <img className="music-illustration" src={login} alt="" srcSet="" />
            <div className="toggler-content-holder">
              Already have a RetailersPro Account ?
            </div>
            <button
              onClick={() =>
                this.setState({
                  displayRegister: !this.state.displayRegister
                })
              }
              className="toggler-login-register-button cursor-pointer"
            >
              Login
            </button>
          </div>
        ) : (
          <div className="toggle-content-holder">
            <img
              className="music-illustration"
              src={register}
              alt=""
              srcSet=""
            />
            <div className="toggler-content-holder">
              Grow Your Business with <b>RetailersPro</b>'s
              <br />
              Customer Insights,
              <br /> Offers and Coupon Management service. <br />
              <br />
              <br />
              Yet to create a RetailersPro Account?
            </div>
            <button
              onClick={() =>
                this.setState({
                  displayRegister: !this.state.displayRegister
                })
              }
              className="toggler-login-register-button cursor-pointer"
            >
              Register
            </button>
          </div>
        )}
      </div>
    );
  }

  // handlers
  loginHandler(email, password) {
    this.setAuthLoader(true);
    fetch(`${config.url}/retailer/login`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email,
        password
      })
    })
      .then(async res => {
        let data = await res.json();
        if (data.status) {
          let userDetails = {
            retailerName: data.data.retailerName,
            emailId: data.data.emailId,
            _id: data.data._id
          };
          localStorage.setItem("retailerDetails", JSON.stringify(userDetails));
          this.setAuthLoader(false);
          this.props.history.push("/");
        } else {
          let err = data.data;
          toast(err.toString());
          this.setAuthLoader(false);
        }
      })
      .catch(err => {
        this.setAuthLoader(false);
        toast(
          "Internal server error!\n please try again later or\n  email to support@retailerspro.live"
        );
      });
  }

  registerHandler(name, email, password, mobile) {
    this.setAuthLoader(true);
    fetch(`${config.url}/retailer/register`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify({
        retailerName: name,
        emailId: email,
        password: password,
        mobileNo: mobile
      })
    })
      .then(async res => {
        let data = await res.json();
        if (data.status) {
          let userDetails = {
            retailerName: data.data.retailerName,
            emailId: data.data.emailId,
            _id: data.data._id
          };
          localStorage.setItem("retailerDetails", JSON.stringify(userDetails));
          this.setAuthLoader(false);
          this.props.history.push("/");
        } else {
          let err = data.data;
          toast(err.toString());
          this.setAuthLoader(false);
        }
      })
      .catch(err => {
        this.setAuthLoader(false);
        toast(
          "Internal server error!\n please try again later or\n  email to support@retailerspro.com"
        );
      });
  }

  setAuthLoader(val) {
    // store.dispatch({
    //   type: "LOADING_STATE_TOGGLER",
    //   payload: {
    //     isAuthLoading: val
    //   }
    // });
    this.setState({ isAuthLoading: val });
  }

  logoutHandler() {
    localStorage.removeItem("retailerDetails");
  }

  render() {
    return (
      <div className="auth-wrapper">
        {this.state.isAuthLoading && (
          <div className="auth-preloader">
            <Loader type="ThreeDots" color="#f2f7f4" height={80} width={80} />
          </div>
        )}
        <this.Toggler />
        <this.Register />
        <this.Login />
      </div>
    );
  }
}

export default Auth;
