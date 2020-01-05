import React, { Component } from "react";
import { coupon } from "../images";

export default class Coupon extends Component {
  render() {
    return (
      <div className="common-wrapper flex-column text-center">
        <img src={coupon} alt="" srcset="" />
        <p>We appreciate your interest.. This feature is under development!</p>
      </div>
    );
  }
}
