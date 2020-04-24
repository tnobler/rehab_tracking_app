import React from "react";
import { Link } from "react-router-dom";

class Properties extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      properties: []
    };
  }

  componentDidMount() {
    const url = "/api/v1/properties/index";
    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(response => this.setState({ properties: response }))
      .catch(() => this.props.history.push("/"));
  }

  render() {
    const { properties } = this.state;
    const allProperties = properties.map((property, index) => (
      <div key={index} className="col-md-6 col-lg-4">
        <div className="card mb-4">
          <img
            src={property.image}
            className="card-img-top"
            alt={`${property.name} image`}
          />
          <div className="card-body">
            <h5 className="card-title">{property.name}</h5>
            <Link to={`/property/${property.id}`} className="btn cusom-button">
              View Property
            </Link>
          </div>
        </div>
      </div>
    ));
    const noProperty = (
      <div className="vw-100 vh-50 d-flex align-items-center justify-content-center">
        <h4>
          No properties yet. Why not <Link to="/new_property">create one</Link>
        </h4>
      </div>
    );

    return (
      <>
        <section className="jumbotron jumbotron-fluid text-center">
          <div className="container py-5">
            <h1 className="display-4">All Properties</h1>
            <p>Here are all of the properties</p>
          </div>
        </section>
        <div className="py-5">
          <main className="container">
            <div className="text-right mb-3">
              <Link to="/property" className="btn custom-button">
                Create New Property
              </Link>
            </div>
            <div className="row">
              {properties.length > 0 ? allProperties : noProperty}
            </div>
            <Link to="/" className="btn btn-link">
              Home
            </Link>
          </main>
        </div>
      </>
    );
  }
}

export default Properties;
