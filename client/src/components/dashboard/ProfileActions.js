import React from "react";
import { Link } from "react-router-dom";

const ProfileActions = () => {
  return (
    <div>
      <div class="btn-group mb-4" role="group">
        <Link to="/edit-profile" class="btn btn-light">
          <i class="fas fa-user-circle text-info mr-1" /> Edit Profile
        </Link>
        <Link to="/add-experience" class="btn btn-light">
          <i class="fas fa-plane mr-1 text-info" />
          Add something yours
        </Link>
        <Link to="/add-education" class="btn btn-light">
          <i class="fas fa-info text-info mr-1" />
          Your general infos
        </Link>
      </div>
    </div>
  );
};
export default ProfileActions;
