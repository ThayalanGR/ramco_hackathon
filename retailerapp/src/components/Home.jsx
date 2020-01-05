import React, { Component } from "react";
import { withRouter, Switch, Route } from "react-router-dom";
import "../css/home.css";
import {
  LeftNav,
  Core,
  Coupon,
  Broadcast,
  Insights,
  Invoices,
  TargetedAds
} from "../components";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      retailerName: null,
      emailId: null,
      _id: null
    };
  }
  componentWillMount() {
    let isAuthenticated = localStorage.getItem("retailerDetails") || null;
    if (!isAuthenticated) {
      this.props.history.push("/auth");
    } else {
      let loc = JSON.parse(isAuthenticated);
      this.setState({
        retailerName: loc.retailerName,
        emailId: loc.emailId,
        _id: loc._id
      });
    }
  }

  componentDidMount() {
    // let loc = JSON.parse(localStorage.getItem("retailerDetails"));
  }
  logoutHandler() {
    localStorage.clear();
    this.setState({
      retailerName: null,
      emailId: null,
      _id: null
    });
    this.props.history.push("/auth");
  }

  render() {
    return (
      <div className="bg-white">
        <div className="home-header shadow-sm pl-4 pr-4  shadow-sm  d-flex align-items-center justify-content-between">
          <div className="text-left font-weight-bold text-primary h3 logo-letter-spacing">
            RetailersPro
          </div>
          <div className="cursor-pointer">
            <div className="dropdown text-right">
              <button
                className="btn btn-link-sm dropdown-toggle w-25 bg-transparent text-dark "
                type="button"
                id="dropdownMenuButton"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                {this.state.retailerName}&nbsp;
              </button>
              <div
                className="dropdown-menu w-25"
                aria-labelledby="dropdownMenuButton"
              >
                <div
                  onClick={() => {
                    this.logoutHandler();
                  }}
                  className="dropdown-item w-50"
                  href="#"
                >
                  <i className="fas fa-sign-out-alt text-danger"></i>{" "}
                  <span className="text-danger">Logout</span>
                </div>
                {/* <a className="dropdown-item" href="#">
                  Another action
                </a>
                <a className="dropdown-item" href="#">
                  Something else here
                </a> */}
              </div>
            </div>
          </div>
        </div>
        <LeftNav />
        <div className="core-render-wrapper">
          <Switch>
            <Route path="/" exact component={Core} />
            <Route path="/coupon" component={Coupon} />
            <Route path="/broadcast" component={Broadcast} />
            <Route path="/insights" component={Insights} />
            <Route path="/invoices" component={Invoices} />
            <Route path="/tads" component={TargetedAds} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default withRouter(Home);
