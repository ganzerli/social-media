import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import Spinner from "../common/Spinner";
import { getCurrentProfile, deleteAccount } from "../../actions/profileActions";
import ProfileActions from "./ProfileActions";
import Experiences from "./Experiences";
import Infos from "./Infos";

class Dashboard extends Component {
  onDeleteClick(e) {
    e.preventDefault();
    this.props.deleteAccount();
  }

  componentDidMount() {
    this.props.getCurrentProfile();
  }

  render() {
    //check if the profile is not null
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;

    let dashboardContent;
    // when GET_PROFILE is called
    if (profile === null || loading) {
      dashboardContent = <Spinner />;
    } else {
      //if the user has not created the profile has a button to crete the profile, if is not empty then the classical profile
      if (Object.keys(profile).length > 0) {
        // display the profile
        dashboardContent = (
          <>
            <p className="lead text-muted">
              <Link to={`/profile/${profile.handle}`} />
            </p>
            <ProfileActions />

            <Experiences expArray={profile.experiences} />

            {profile.infos.length > 0 ? (
              <Infos infoArray={profile.infos} />
            ) : null}

            <div style={{ margin: "0 auto" }}>
              <button
                className="btn btn-danger"
                onClick={this.onDeleteClick.bind(this)}
              >
                Delete My Account
              </button>
            </div>
          </>
        );
      } else {
        // User is logged in but has no profile
        dashboardContent = (
          <div>
            <p className="lead text-muted">WELCOME {user.name}</p>
            <p>You have not a profile yet, to create one add some infos!!</p>
            <Link to="/create-profile" className="btn btn-lg btn-info">
              Create your profile
            </Link>
          </div>
        );
      }
    }

    return (
      <div className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4"> Dashboard </h1>
              <h2 style={{ fontSize: 16, color: "grey" }}>
                WELCOME {user.name}
              </h2>
              {dashboardContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.PropTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  // all the stuff fro the state from the reducers
  auth: state.authorization,
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getCurrentProfile, deleteAccount }
)(Dashboard);
