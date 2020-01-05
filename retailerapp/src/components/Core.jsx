import React, { Component } from "react";
import QrCode from "qrcode.react";

export default class Core extends Component {
  render() {
    return (
      <div className="container-fluid ">
        <div className="row">
          <div className="col-6 d-flex align-items-center flex-column">
            <div className="h2 text-center pb-4 font-weight-bold text-primary">
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
            <div className="h5 text-center font-weight-bold text-danger pb-3 pt-3">
              Live Subscribers
            </div>
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">First</th>
                  <th scope="col">Last</th>
                  <th scope="col">Handle</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">1</th>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                </tr>
                <tr>
                  <th scope="row">2</th>
                  <td>Jacob</td>
                  <td>Thornton</td>
                  <td>@fat</td>
                </tr>
                <tr>
                  <th scope="row">3</th>
                  <td>Larry</td>
                  <td>the Bird</td>
                  <td>@twitter</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}
