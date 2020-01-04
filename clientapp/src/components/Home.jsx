import React, { Component } from "react";

export default class Home extends Component {
  componentDidMount() {
    fetch(
      `http://localhost:8000/retailer/getid/${this.props.match.params.name}`
    )
      .then(data => data.json())
      .then(data => {
        localStorage.setItem("retailerId", data.retailerId);
      });
  }

  render() {
    return (
      <div>
        <div>company name</div>
        <hr />
        <div>
          <b>oauth links</b>
        </div>
        <hr />
        <div>
          <a href="/"> google</a>
        </div>
        <div>
          <a href="/">facebook</a>
        </div>
      </div>
    );
  }
}
