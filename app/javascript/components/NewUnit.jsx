import React, { Component } from "react";
import { Link } from "react-router-dom";

class NewUnit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      number: "",
      floor_plan: "",
      square_footage: "",
      budgeted_rehab_amount: "",
      rehab_status: ""
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.stripHtmlEntities = this.stripHtmlEntities.bind(this);
  }

  stripHtmlEntities(str) {
    return String(str)
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  onSubmit(event) {
    event.preventDefault();
    const url = "/api/v1/units/create";
    const {
      number,
      floor_plan,
      square_footage,
      budgeted_rehab_amount,
      rehab_status
    } = this.state;

    if (
      number.length == 0 ||
      floor_plan.length == 0 ||
      square_footage.length == 0 ||
      square_footage.length == 0 ||
      budgeted_rehab_amount.length == 0 ||
      rehab_status.length == 0
    )
      return;

    const body = {
      number,
      floor_plan,
      square_footage,
      budgeted_rehab_amount,
      rehab_status
    };

    const token = document.querySelector('meta[name="csrf-token"]').content;
    fetch(url, {
      method: "POST",
      headers: {
        "X-CSRF-Token": token,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(response => this.props.history.push(`/unit/${response.id}`))
      .catch(error => console.log(error.message));
  }

  render() {
    return (
      <div className="container mt-5">
        <div className="row">
          <div className="col-sm-12 col-lg-6 offset-lg-3">
            <h1 className="font-weight-normal mb-5">Add a new Unit</h1>
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <label htmlFor="unitNumber">Unit number</label>
                <input
                  type="text"
                  name="number"
                  id="unitNumber"
                  className="form-control"
                  required
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="unitFloorplan">Floor Plan</label>
                <input
                  type="text"
                  name="floor_plan"
                  id="unitFloorplan"
                  className="form-control"
                  required
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="unitSquareFootage">Square Footage</label>
                <input
                  type="text"
                  name="square_footage"
                  id="unitSquareFootage"
                  className="form-control"
                  required
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="unitBudgetedRehabAmount">
                  Budget Rehab Amount
                </label>
                <input
                  type="text"
                  name="budgeted_rehab_amount"
                  id="unitBudgetedRehabAmount"
                  className="form-control"
                  required
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="unitRehabStatus">Rehab Status</label>
                <input
                  type="text"
                  name="rehab_status"
                  id="unitRehabStatus"
                  className="form-control"
                  required
                  onChange={this.onChange}
                />
              </div>
              <button type="submit" className="btn custom-button mt-3">
                Create Unit
              </button>
              <Link to="/units" className="btn btn-link mt-3">
                Back to Units
              </Link>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default NewUnit;
