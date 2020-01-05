import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import queryString from "query-string";

class Callback extends Component {
  componentDidMount() {
    const value = queryString.parse(this.props.location.search);
    const token = value.mobile;
    fetch("http://192.168.15.210:2000/customer/create", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: this.props.match.params.name,
        email: this.props.match.params.email,
        mobile: parseInt(token) || 8489455901,
        retailerId: localStorage.getItem("retailerId") || ""
      })
    })
      .then(data => data.json())
      .then(data => {
        console.log(data);
        this.props.history.push("/success");
      });
  }

  render() {
    return <div>callback</div>;
  }
}

export default withRouter(Callback);
