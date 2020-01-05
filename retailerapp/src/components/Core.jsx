import React, { Component } from "react";
import QrCode from "qrcode.react";

export default class Core extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customers: []
    };
  }

  componentDidMount() {
    fetch("http://192.168.15.210:2000/customer/getall")
      .then(data => data.json())
      .then(data => {
        let customers = data.data;
        this.setState({ customers });
        console.log(data);
      });
  }
  render() {
    return (
      <div className="container-fluid ">
        <div className="row">
          <div className="col-6 d-flex align-items-center flex-column pt-4 mt-4">
            <div className="h2 text-center pb-4 font-weight-bold text-primary pt-4 mt-4">
              {this.props.retailerName}
            </div>
            <div className="text-center">{this.props.emailId}</div>
            <div className="pt-4 text-center">
              <QrCode size={300} value={this.props.shortLink} />
            </div>
            <div className="text-center pt-4 h3 font-weight-bold text-danger">
              {this.props.shortLink}
            </div>
          </div>
          <div className="col-6 d-flex align-items-center flex-column">
            <div className="h5 text-center font-weight-bold text-danger pb-1 mt-3 pt-3">
              Live Subscribers
            </div>
            <div className="w-100">
              <table class="table">
                <caption>List of Customers</caption>
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Mobile</th>
                  </tr>
                </thead>
                <tbody>

                  <tr>
                    <th scope="row">1</th>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
