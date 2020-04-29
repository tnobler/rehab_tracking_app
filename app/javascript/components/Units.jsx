import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import Td from "./Td";

class Units extends Component {
  constructor(props) {
    super(props);
    this.state = {
      units: []
    };
  }

  componentDidMount() {
    const url = "/api/v1/units/index";
    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(response => this.setState({ units: response }))
      .catch(() => this.props.history.push("/"));
  }

  render() {
    const { units } = this.state;
    const allUnits = (
      <div>
        <table className="table table-hover table-striped table-condensed sortable">
          <thead>
            <tr>
              <th>Unit Number</th>
              <th>Floor Plan</th>
              <th>Square Footage</th>
              <th>Bugeted Rehab Amount</th>
              <th>Rehab Status</th>
            </tr>
          </thead>
          <tbody>
            {units.map(unit => {
              return (
                <tr key={unit.id}>
                  <Td to={`/unit/${unit.id}`}>{unit.number}</Td>
                  <td>{unit.floor_plan}</td>
                  <td>{unit.square_footage}</td>
                  <td>{unit.budgeted_rehab_amount}</td>
                  <td>{unit.rehab_status}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
    // const allAllUnits = units.map((unit, index) => (
    //   <div key={index} className="col-md-6 col-lg-4">
    //     <div className="card mb-4">
    //       <div className="card-body">
    //         <h5 className="card-title">{unit.number}</h5>
    //         <Link to={`/unit/${unit.id}`} className="btn custom-button">
    //           View Unit
    //         </Link>
    //       </div>
    //     </div>
    //   </div>
    // ));
    const noUnit = (
      <div className="vw-100 vh-50 d-flex align-items-center justify-content-center">
        <h4>
          No units yet. Why not <Link to="/new_unit">create one</Link>
        </h4>
      </div>
    );

    return (
      <>
        <section className="page-header text-center">
          <div className="container py-5">
            <h1 className="display-4">All Units</h1>
            <small className="lead text-muted">
              This is a listing of all units in the database.
            </small>
          </div>
        </section>
        <div className="py-5">
          <main className="container">
            <div className="text-right mb-3">
              <Link to="/unit" className="btn custom-button">
                Create New Unit
              </Link>
            </div>
            <div>{allUnits}</div>
            {/* <div className="row">{units.length > 0 ? allAllUnits : noUnit}</div> */}
            <Link to="/" className="btn btn-link">
              Home
            </Link>
          </main>
        </div>
      </>
    );
  }
}

export default Units;
