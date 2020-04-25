import React, { Component } from "react";
import { Link } from "react-router-dom";

class NewProperty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      units: "",
      Description: ""
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
    const url = "/api/v1/properties/create";
    const { name, units, description } = this.state;

    if (name.length == 0 || units.length == 0 || description.length == 0)
      return;

    const body = {
      name,
      units,
      description: description.replace(/\n/g, "<br> <br>")
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
      .then(response => this.props.history.push(`/property/${response.id}`))
      .catch(error => console.log(error.message));
  }

  render() {
    return (
      <div className="container mt-5">
        <div className="row">
          <div className="col-sm-12 col-lg-6 offset-lg-3">
            <h1 className="font-weight-normal mb-5">Add a new Property.</h1>
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <label htmlFor="propertyName">Property Name</label>
                <input
                  type="text"
                  name="name"
                  id="propertyName"
                  className="form-control"
                  required
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="propertyUnits">Units</label>
                <input
                  type="text"
                  name="units"
                  id="propertyUnits"
                  className="form-control"
                  required
                  onChange={this.onChange}
                />
                <small id="unitsHelp" className="form-text text-muted">
                  Separate each unit with a comma.
                </small>
              </div>
              <label htmlFor="description">Property Description</label>
              <textarea
                className="form-control"
                id="description"
                name="description"
                rows="5"
                required
                onChange={this.onChange}
              />
              <button type="submit" className="btn custom-button mt-3">
                Create Property
              </button>
              <Link to="/properties" className="btn btn-link mt-3">
                Back to Properties
              </Link>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default NewProperty;
