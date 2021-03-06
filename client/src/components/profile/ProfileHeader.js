import React, { Component } from "react";
import isEmpty from "../../validation/is-empty";
import { Link } from "react-router-dom";

class ProfileHeader extends Component {
  render() {
    const { profile } = this.props;

    return (
      <div className="row">
        <div className="col-md-12">
          <div className="card card-body gradient-background text-info mb-3">
            <div className="row">
              <div className="col-4 col-md-3 m-auto ">
                <img
                  className="rounded-circle"
                  src={profile.user.avatar} //gravatear source
                  alt=""
                />
              </div>
            </div>
            <div className="text-center">
              <h1 className="display-4 text-dark text-center">
                {profile.user.name /* populated object from backend */}
              </h1>
              <p className="lead text-center">
                {isEmpty(profile.social && profile.job) ? null : (
                  <span>{profile.job}</span>
                )}
              </p>
              <p>{profile.status}</p>

              <p>
                {isEmpty(profile.location) ? null : (
                  <span>{profile.location}</span>
                )}
              </p>
              <p>
                {isEmpty(profile.website) ? null : (
                  <a
                    className="text-success p-2"
                    target="_blank"
                    href={profile.website}
                  >
                    <i className="fas fa-globe fa-2x" />
                  </a>
                )}
                {isEmpty(profile.social && profile.social.twitter) ? null : (
                  <a
                    className="text-success p-2"
                    target="_blank"
                    href={profile.social.twitter}
                  >
                    <i className="fab fa-twitter fa-2x" />
                  </a>
                )}
                {isEmpty(profile.social && profile.social.facebook) ? null : (
                  <a
                    className="text-success p-2"
                    target="_blank"
                    href={profile.social.facebook}
                  >
                    <i className="fab fa-facebook fa-2x" />
                  </a>
                )}
                {isEmpty(profile.social && profile.social.linkedin) ? null : (
                  <a
                    className="text-success p-2"
                    target="_blank"
                    href={profile.social.linkedin}
                  >
                    <i className="fab fa-linkedin fa-2x" />
                  </a>
                )}
                {isEmpty(profile.social && profile.social.instagram) ? null : (
                  <a
                    className="text-success p-2"
                    target="_blank"
                    href={profile.social.instagram}
                  >
                    <i className="fab fa-instagram fa-2x" />
                  </a>
                )}
                {isEmpty(profile.social && profile.social.youtube) ? null : (
                  <a
                    className="text-success p-2"
                    target="_blank"
                    href={profile.social.youtube}
                  >
                    <i className="fab fa-youtube fa-2x" />
                  </a>
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProfileHeader;
