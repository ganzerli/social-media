import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addInfos } from "../../actions/profileActions";

class AddInfos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      certificates: "",
      school: "",
      field: "",
      from: "",
      to: "",
      current: false,
      description: "",
      errors: {},
      disabled: false
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onCheck = this.onCheck.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onCheck(e) {
    this.setState({
      disabled: !this.state.disabled,
      current: !this.state.current
    });
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  onSubmit(e) {
    e.preventDefault();
    const infosData = {
      // filleng the object with the datas of the state
      school: this.state.school,
      certificates: this.state.certificates,
      field: this.state.field,
      description: this.state.description,
      from: this.state.from,
      to: this.state.to,
      current: this.state.current
    };

    this.props.addInfos(infosData, this.props.history);
  }

  render() {
    const { errors } = this.state;

    return (
      <>
        <div className="add-infos">
          <div className="container">
            {/* push everything in the middle */}
            <div className="row">
              <div className="col-md-8 m-auto">
                <Link className="btn btn-light" to="/dashboard">
                  Go Back
                </Link>
                <h1 className="display-4 text-center">Add Infos</h1>
                <p className="lead text-center">
                  <small>Write some your general informations..</small>
                </p>
                <small className="d-block pb-3 glow">
                  <b>*</b> = Required Fields
                </small>

                <form onSubmit={this.onSubmit}>
                  <TextFieldGroup
                    type="text"
                    placeholder="school"
                    name="school"
                    value={this.state.school}
                    onChange={this.onChange}
                    info="What type of school"
                  />
                  <TextFieldGroup
                    type="text"
                    placeholder="certificates"
                    name="certificates"
                    value={this.state.certificates}
                    onChange={this.onChange}
                    info="Did you get some badge, paper, somehing concluding that?"
                  />
                  <TextFieldGroup
                    type="text"
                    placeholder="* in which field"
                    name="field"
                    error={errors.field}
                    value={this.state.field}
                    onChange={this.onChange}
                    info="in which field"
                  />
                  <TextAreaFieldGroup
                    type="text"
                    placeholder="* description"
                    name="description"
                    error={errors.description}
                    value={this.state.description}
                    onChange={this.onChange}
                    info="Tell about that.."
                  />
                  <h6>From Date</h6>
                  <TextFieldGroup
                    type="date"
                    name="from"
                    value={this.state.from}
                    onChange={this.onChange}
                  />
                  <h6>To Date</h6>
                  <TextFieldGroup
                    type="date"
                    name="to"
                    value={this.state.to}
                    onChange={this.onChange}
                    disabled={this.state.disabled ? "disabled" : ""} //next checkbox update this part of state
                  />
                  <div className="form-check mb-4">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      name="current"
                      value={this.state.current}
                      checked={this.state.current}
                      onChange={this.onCheck}
                      id="current"
                    />
                    <label htmlFor="current" className="form-check-label">
                      is current?
                    </label>
                  </div>
                  <input
                    type="submit"
                    value="submit"
                    className="btn btn-info btn-block mt-4"
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
AddInfos.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  addInfos: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { addInfos }
)(withRouter(AddInfos));
