import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../css/leftnav.css";

export default class LeftNav extends Component {
  render() {
    return (
      <div className="leftnav-wrapper shadow bg-primary">
        <Link to="/" className="pt-4 pb-4 h5 btn btn-outline-light">
          Home
        </Link>
        <Link to="/coupon" className="pt-4 pb-4 h5 btn btn-outline-light">
          Coupon
        </Link>
        <Link to="/broadcast" className="pt-4 pb-4 h5 btn btn-outline-light">
          Broadcast
        </Link>
        <Link to="/insights" className="pt-4 pb-4 h5 btn btn-outline-light">
          Insights
        </Link>
        <Link to="/invoices" className="pt-4 pb-4 h5 btn btn-outline-light">
          Invoices
        </Link>
        <Link to="/tads" className="pt-4 pb-4 h5 btn btn-outline-light">
          Targeted Ads
        </Link>
      </div>
    );
  }
}
