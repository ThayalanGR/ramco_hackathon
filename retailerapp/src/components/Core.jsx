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
    fetch(`http://192.168.15.210:2000/customer/getbyid/${this.props.id}`)
      .then(data => data.json())
      .then(data => {
        let customers = data.data;
        this.setState({ customers });
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
            <div className="pt-4 text-center">
              <QrCode size={300} value={this.props.shortLink} />
            </div>
            <div className="text-center mt-4">{this.props.id}</div>
            <div className="text-center">{this.props.emailId}</div>
            <div className="text-center pt-4 h3 font-weight-bold text-danger">
              {this.props.shortLink}
            </div>
          </div>
          <div className="col-6 d-flex align-items-center flex-column">
            <div className="h5 text-center font-weight-bold text-danger pb-1 mt-3 pt-3">
              Live Customers
            </div>
            <div className="w-100">
              <table className="table text-center customers-table-body">
                <caption>List of Customers</caption>
                <thead className="container-fluid">
                  <tr className="row">
                    <th className="col" scope="col">
                      #
                    </th>
                    <th className="col-3" scope="col">
                      Name
                    </th>
                    <th className="col" scope="col">
                      Email
                    </th>
                    <th className="col" scope="col">
                      Mobile
                    </th>
                  </tr>
                </thead>
                <tbody className="container">
                  {this.state.customers.length > 0 &&
                    this.state.customers.map((item, key) => {
                      return (
                        <tr key={key} className="row">
                          <th className="col" scope="row">
                            {key + 1}
                          </th>
                          <td className="col-3">
                            {item.name ? item.name : "John Doe"}
                          </td>
                          <td className="col">
                            {item.email ? item.email : "johndoe@gmail.com"}
                          </td>
                          <td className="col">
                            {item.mobile ? item.mobile : "8489455901"}
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
