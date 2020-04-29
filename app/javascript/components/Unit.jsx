import React, { Component } from "react";
import { Link } from "react-router-dom";

class Unit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      unit: {
        number: "",
        floor_plan: "",
        square_footage: "",
        budgeted_rehab_amount: "",
        rehab_status: ""
      }
    };

    this.addHtmlEntities = this.addHtmlEntities.bind(this);
    this.deleteUnit = this.deleteUnit.bind(this);
  }

  componentDidMount() {
    const {
      match: {
        params: { id }
      }
    } = this.props;

    const url = `/api/v1/show/${id}`;

    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(response => this.setState({ unit: response }))
      .catch(() => this.props.history.push("/units"));
  }

  addHtmlEntities(str) {
    return String(str)
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">");
  }

  deleteUnit() {
    const confirmation = confirm("Are you sure?");
    const {
      match: {
        params: { id }
      }
    } = this.props;
    const url = `/api/v1/destroy/${id}`;
    const token = document.querySelector('meta[name="csrf-token"]').content;
    if (confirmation) {
      fetch(url, {
        method: "DELETE",
        headers: {
          "X-CSRF-Token": token,
          "Content-Type": "application/json"
        }
      })
        .then(response => {
          if (response.ok) {
            return response.json();
          }
          throw new Error("Network response was not ok.");
        })
        .then(() => this.props.history.push("/units"))
        .catch(error => console.log(error.message));
    }
  }

  render() {
    const { unit } = this.state;
    let productList = "No rehab products available";

    return (
      <>
        <section className="page-header text-center">
          <div className="container py-5">
            <h1 className="display-4">{unit.number}</h1>
            <small className="lead text-muted">
              This is a listing of all the rehab products for {unit.number}.
            </small>
          </div>
        </section>
        <div className="py-5">
          <main className="container">
            <div className="text-right mb-3">
              {/* <Link to="/units" className="btn custom-button">
                Create New Product
              </Link> */}
              Link to Create New Product
            </div>
            {/* <div>{allProducts}</div> */}
            <div>
              <table className="table table-hover table-striped table-condensed">
                <thead>
                  <tr>
                    <th>Product ID</th>
                    <th>Product Name</th>
                    <th>Product Description</th>
                    <th>Product Vendor</th>
                    <th>Product Unit Cost</th>
                    <th>Total Cost</th>
                  </tr>
                </thead>
                <tbody>
                  {/* {units.map((unit, index) => {
                    return (
                      <tr key={index}>
                        <td>{unit.number}</td>
                        <td>{unit.floor_plan}</td>
                        <td>{unit.square_footage}</td>
                        <td>{unit.budgeted_rehab_amount}</td>
                        <td>{unit.rehab_status}</td>
                      </tr>
                    );
                  })} */}
                  <tr>
                    <td>A000001</td>
                    <td>Pewter Fan</td>
                    <td>52" 5-BLADE PEWTER FAN W/ALAB GLASS CF52831-53</td>
                    <td>HD SUPPLY</td>
                    <td>1</td>
                    <td>90.75</td>
                    <td>90.75</td>
                  </tr>
                  <tr>
                    <td>A000002</td>
                    <td>16" LIGHT</td>
                    <td>16" S/NKL SEMI-FLUSH FIX 2 BULB 16"W X 10"H</td>
                    <td>HD SUPPLY</td>
                    <td>1</td>
                    <td>40.29</td>
                    <td>40.29</td>
                  </tr>
                  <tr>
                    <td>A000003</td>
                    <td>6" Globe</td>
                    <td>6" FROST GLOBE FIXT SN WITH PULL CHAIN (CLOSET)</td>
                    <td>HD SUPPLY</td>
                    <td>1</td>
                    <td>7.99</td>
                    <td>7.99</td>
                  </tr>
                </tbody>
              </table>
              <div className="col-sm-12 col-lg-2">
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={this.deleteUnit}
                >
                  Delete Unit
                </button>
              </div>
            </div>

            <Link to="/units" className="btn btn-link">
              Back to units
            </Link>
          </main>
        </div>
      </>
    );
  }
}

export default Unit;
