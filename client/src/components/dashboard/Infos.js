import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Moment from "react-moment";
import { deleteInfo } from "../../actions/profileActions";

class Infos extends Component {
  onDeleteClick(id) {
    this.props.deleteInfo(id);
  }

  render() {
    const infos = this.props.infoArray.map((
      info // mapping every.. [0]._id [0].title .... see status tree
    ) => (
      <tr key={info._id}>
        <td>{info.field}</td>
        <td>{info.description}</td>
        <td>
          {info.from ? <Moment format="YY/MM/DD">{info.from}</Moment> : " "}{" "}
          {info.current ? (
            "..current"
          ) : (
            <Moment format="YY/MM/DD">{info.to}</Moment>
          )}
        </td>
        <td>
          <button
            className="btn btn-danger"
            onClick={this.onDeleteClick.bind(this, info._id)}
          >
            Delete
          </button>
        </td>
      </tr>
    ));

    return (
      <div>
        <h4 className="mb-4">Other general infos..</h4>
        <table className="table">
          <thead>
            <tr>
              <th>Field</th>
              <th>Description</th>
              <th>Time</th>
              <th />
            </tr>
            {infos}
          </thead>
        </table>
      </div>
    );
  }
}
Infos.propTypes = {
  deleteInfo: PropTypes.func.isRequired
};

export default connect(
  null,
  { deleteInfo }
)(Infos);
