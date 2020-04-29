import React, { Component } from "react";
import { Link } from "react-router-dom";

class Property extends Component {
  constructor(props) {
    super(props);
    this.state = { property: { units: "" } };

    this.addHtmlEntities = this.addHtmlEntities.bind(this);
    this.deleteProperty = this.deleteProperty.bind(this);
  }
  addHtmlEntities(str) {
    return String(str)
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">");
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
      .then(response => this.setState({ property: response }))
      .catch(() => this.props.history.push("/properties"));
  }

  deleteProperty() {
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
        .then(() => this.props.history.push("/properties"))
        .catch(error => console.log(error.message));
    }
  }

  render() {
    const { property } = this.state;
    let unitList = "No units available";

    if (property.units.length > 0) {
      unitList = property.units.split(",").map((unit, index) => (
        <li key={index} className="list-group-item">
          {unit}
        </li>
      ));
    }
    const propertyDescription = this.addHtmlEntities(property.description);

    return (
      <div className="">
        <div className="hero position-relative d-flex align-items-center justify-content-center">
          <img
            src={property.image}
            alt={`${property.name} image`}
            className="img-fluid position-absolute"
          />
          <div className="overlay bg-dark position-absolute" />
          <h1 className="display-4 position-relative text-white">
            {property.name}
          </h1>
        </div>
        <div className="container py-5">
          <div className="row">
            <div className="col-sm-12 col-lg-3">
              <ul className="list-group">
                <h5 className="mb-2">Units</h5>
                {unitList}
              </ul>
            </div>
            <div className="col-sm-12 col-lg-7">
              <h5 className="mb-2">Description</h5>
              <div
                dangerouslySetInnerHTML={{
                  __html: `${propertyDescription}`
                }}
              />
            </div>
            <div className="col-sm-12 col-lg-2">
              <button
                type="button"
                className="btn btn-danger"
                onClick={this.deleteProperty}
              >
                Delete Property
              </button>
            </div>
          </div>
          <Link to="/properties" className="btn btn-link">
            Back to Properties
          </Link>
        </div>
      </div>
    );
  }
}

export default Property;
