import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Moment from "react-moment";
import { deleteExperience } from "../../actions/profileActions";

class Experiences extends Component {
  onDeleteClick(id) {
    this.props.deleteExperience(id);
  }

  render() {
    const experiences = this.props.expArray.map((
      exp // mapping every.. [0]._id [0].title .... see status tree
    ) => (
      <tr key={exp._id}>
        <td>{exp.title}</td>
        <td>
          {exp.description}
          <p>
            <b>
              {exp.from ? <Moment format="YY/MM/DD">{exp.from}</Moment> : " "}{" "}
              {exp.current ? (
                "..current"
              ) : (
                <Moment format="YY/MM/DD">{exp.to}</Moment>
              )}
            </b>
          </p>
        </td>

        <td>
          <button
            className="btn btn-danger"
            onClick={this.onDeleteClick.bind(this, exp._id)}
          >
            <i className="fas fa-times" />
          </button>
        </td>
      </tr>
    ));

    return (
      <div>
        <h4 className="mb-4">Tell Something About Your Life..</h4>
        <table className="table">
          <thead>
            <tr>
              <th>Titile</th>
              <th>Description</th>
              <th />
            </tr>
            {experiences}
          </thead>
        </table>
      </div>
    );
  }
}
Experiences.propTypes = {
  deleteExperience: PropTypes.func.isRequired
};

export default connect(
  null,
  { deleteExperience }
)(Experiences);
