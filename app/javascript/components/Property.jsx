import React, { Component } from "react";
import { Link } from "react-router-dom";

class Property extends Component {
  constructor(props) {
    super(props);
    this.state = { property: { units: "" } };

    this.addHtmlEntities = this.addHtmlEntities.bind(this);
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

  addHtmlEntities(str) {
    return String(str)
      .replace(/&lt;/g, "v")
      .replace(/&gt;/g, ">");
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
              <button type="button" className="btn btn-danger">
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
