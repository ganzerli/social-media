import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

class ProfileGithub extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clientId: "0aa380a02b29255fe2ec",
      clientSecret: "ace7e0be30ca75008294306c1a6348b6170e8625",
      count: 5,
      sort: "created: asc",
      repos: []
    };
  }
  //request to github api
  componentDidMount() {
    const { usrName } = this.props;
    const { count, sort, clientId, clientSecret } = this.state;

    fetch(
      `https://api.github.com/users/${usrName}/repos?per_page=${count}&sort=${sort}&clientId=${clientId}&clientSecret=${clientSecret}`
    )
      .then(res => res.json())
      .then(resdotjson => {
        this.setState({ repos: resdotjson });
      })
      .catch(err => console.log(err));
  }

  render() {
    const { repos } = this.state;
    console.log(repos.length);
    let repoItems;

    if (repos.length > 0) {
      repoItems = repos.map(repo => (
        <div className="card card-body mb-2">
          <div className="row">
            <div className="col-md-6">
              <h4>
                <Link to={repo.html_url} className="text-info" target="_blank">
                  {repo.name}
                </Link>
              </h4>
              <p>{repo.decription}</p>
            </div>

            <div className="col-md-6">
              <span className="badge badge-info mr1">
                Stars:{repo.stargazers_count}
              </span>
              <span className="badge badge-secondary mr1">
                Watchers:{repo.watchers_count}
              </span>
              <span className="badge badge-success mr1">
                Forks:{repo.forks_count}
              </span>
            </div>
          </div>
        </div>
      ));
    } else {
      repoItems = <div />;
    }

    return (
      <div>
        {repos.length > 0 ? (
          <h3 className="mb-4">Latest Github Repos</h3>
        ) : null}
        {repoItems}
      </div>
    );
  }
}

ProfileGithub.PropTypes = {};

export default ProfileGithub;
