import React, { Component } from "react";
import isEmpty from "../../validation/is-empty";
import Moment from "react-moment";

class ProfileCreds extends Component {
  render() {
    const { expArray, infosArray } = this.props;
    // the exp_id is given frpm the database as default

    const experiences = expArray.map(exp => (
      <li key={exp._id} className="list-group-item">
        <h4>{exp.title}</h4>
        <p>
          {isEmpty(exp.from) ? null : (
            <Moment format="DD/MM/YY">{exp.from}</Moment>
          )}
          {exp.current ? <span>current</span> : null}
          {!isEmpty(exp.to) && !exp.current ? (
            <Moment format="DD/MM/YY">{exp.to}</Moment>
          ) : null}
        </p>
        {isEmpty(exp.location) ? null : <span> {exp.location} </span>}
        {isEmpty(exp.description) ? null : <span> {exp.description} </span>}
        {isEmpty(exp.environment) ? null : <span> {exp.environment} </span>}
      </li>
    ));

    const infos = infosArray.map(info => (
      <li key={info._id} className="list-group-item">
        <h4>{info.field}</h4>
        <p>
          {isEmpty(info.from) ? null : (
            <Moment format="DD/MM/YY">{info.from}</Moment>
          )}
          {" - "}
          {info.current ? <span>current</span> : null}
          {!isEmpty(info.to) && !info.current ? (
            <Moment format="DD/MM/YY">{info.to}</Moment>
          ) : null}
        </p>
        <span> {info.description} </span>
        {isEmpty(info.certificates) ? null : <span> {info.certificates} </span>}
        {isEmpty(info.school) ? null : <span> {info.school} </span>}
      </li>
    ));

    return (
      <div class="row">
        <ul className="col-md-6">
          {isEmpty(experiences) ? null : (
            <h3 className="text-center">some Experiences...</h3>
          )}
          {experiences}
        </ul>

        <ul className="col-md-6">
          {isEmpty(infos) ? null : (
            <h3 className="text-center">some othe infos</h3>
          )}
          {infos}
        </ul>
      </div>
    );
  }
}

export default ProfileCreds;
