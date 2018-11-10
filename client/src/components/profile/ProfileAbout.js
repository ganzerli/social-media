import React, { Component } from "react";
import isEmpty from "../../validation/is-empty";

class ProfileAbout extends Component {
  render() {
    const { profile } = this.props;

    //take the full name split in n parts when a space is and taking the first section
    const firstName = profile.user.name;

    //array of skills and font awesome icon
    const skills = profile.skills.map((skill, index) => (
      <div key={index} style={{ width: "25%" }}>
        <i className="fa fa-check" />
        {skill}
      </div>
    ));

    return (
      <div className="row">
        <div className="col-md-12">
          <div className="card card-body bg-light mb-3">
            <h3 className="text-center text-info">
              {" "}
              {isEmpty(profile.bio) ? " " : firstName + "s Bio"}
            </h3>
            <p className="lead">{!isEmpty(profile.bio) ? profile.bio : null}</p>
            <hr />

            <h3 className="text-center text-info">Interests..</h3>
            <div className="row text-center">{skills}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProfileAbout;
