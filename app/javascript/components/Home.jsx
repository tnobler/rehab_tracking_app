import React from "react";
import { Link } from "react-router-dom";

export default () => (
  <div className="vw-100 vh-100 primary-color d-flex align-items-center justify-content-center">
    <div className="jumbotron jumbotron-fluid bg-transparent">
      <div className="container secondary-color">
        <h1 className="display-4">Rehab Tracker</h1>
        <p className="lead">
          An app to track the rehab progress of Multifamily Properties.
        </p>
        <hr className="my-4" />
        <Link
          to="/properties"
          className="btn btn-lg custom-button"
          role="button"
        >
          View Properties
        </Link>
        <hr className="my-4" />
        <Link to="/units" className="btn btn-lg custom-button " role="button">
          View Units
        </Link>
      </div>
    </div>
  </div>
);
