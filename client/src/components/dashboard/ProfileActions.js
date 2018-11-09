import React from "react";
import { Link } from "react-router-dom";

const ProfileActions = () => {
  return (
    <div>
      <div className="btn-group mb-4" role="group">
        <Link to="/edit-profile" className="btn btn-light">
          <i className="fas fa-user-circle text-info mr-1" /> Edit Profile
        </Link>
        <Link to="/add-experiences" className="btn btn-light">
          <i className="fas fa-plane mr-1 text-info" />
          Add something yours
        </Link>
        <Link to="/add-infos" className="btn btn-light">
          <i className="fas fa-info text-info mr-1" />
          Your general infos
        </Link>
      </div>
    </div>
  );
};
export default ProfileActions;
