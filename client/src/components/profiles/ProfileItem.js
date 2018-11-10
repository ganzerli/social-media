import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import isEmpty from "../../validation/is-empty";

class ProfileItem extends Component {
  render() {
    const { profile } = this.props;

    return (
      <div className="card gradient-background card-body mb-3">
        <div className="row">
          <div className="col-2">
            <img src={profile.user.avatar} alt="" className="rounded-circle" />
          </div>

          <div className="col-lg-6 col-md-4 col-8">
            <h3>{profile.user.name}</h3>
            <ul style={{ listStyle: "none", paddingLeft: 0 }}>
              <li>{profile.status}</li>
              {isEmpty(profile.job) ? null : <li>At: {profile.job}</li>}
              {isEmpty(profile.bio) ? null : <li> {profile.bio}</li>}
              {isEmpty(profile.website) ? null : <li> {profile.website}</li>}
              {isEmpty(profile.location) ? null : <li> {profile.location}</li>}
            </ul>

            <small>{isEmpty(profile.location) ? null : profile.location}</small>
            <p>
              <Link to={`/profile/${profile.handle}`} className="btn btn-info">
                Wiev profile
              </Link>
            </p>
          </div>

          <div className="col-md-4 d-none d-md-block">
            {/** bootstrap class col-md-4 in medium screen is 4, if below medium d-none, but medium d-md-block   medium display block */}
            <h4>Interests</h4>
            <ul className="list-group">
              {profile.skills.slice(0, 4).map((skill, index) => (
                <li key={index} className="list-group-item">
                  <i className="fa fa-puzzle-piece">
                    {" "}
                    {skill /** pr-1 is padding right 1 */}
                  </i>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

ProfileItem.PropTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileItem;
