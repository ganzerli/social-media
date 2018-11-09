import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addExperiences } from "../../actions/profileActions";

class AddExperiences extends Component {
  constructor(props) {
    super(props);
    this.state = {
      environment: "",
      title: "",
      location: "",
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
    const experiencesData = {
      // filleng the object with the datas of the state
      title: this.state.title,
      environment: this.state.environment,
      location: this.state.location,
      current: this.state.current,
      description: this.state.description,
      current: this.state.current,
      from: this.state.from,
      to: this.state.to
    };

    this.props.addExperiences(experiencesData, this.props.history);
  }

  render() {
    const { errors } = this.state;

    return (
      <>
        <div className="add-experiences">
          <div className="container">
            {/* push everything in the middle */}
            <div className="row">
              <div className="col-md-8 m-auto">
                <Link className="btn btn-light" to="/dashboard">
                  Go Back
                </Link>
                <h1 className="display-4 text-center">..Experiences..</h1>
                <p className="lead text-center">
                  <small>
                    Add something about your experiences in the past or right
                    now, or whatever you want ot remember to, or if something
                    was funny or particular or you choose..!
                  </small>
                </p>
                <small className="d-block pb-3 glow">
                  <b>*</b> = Required Fields
                </small>

                <form onSubmit={this.onSubmit}>
                  <TextFieldGroup
                    type="text"
                    placeholder="* title"
                    name="title"
                    value={this.state.title}
                    onChange={this.onChange}
                    error={errors.errors}
                    info="What"
                  />
                  <TextFieldGroup
                    type="text"
                    placeholder="in which environment"
                    name="environment"
                    value={this.state.environment}
                    onChange={this.onChange}
                    info="How"
                  />
                  <TextFieldGroup
                    type="text"
                    placeholder="where?"
                    name="location"
                    value={this.state.location}
                    onChange={this.onChange}
                    info="Where"
                  />
                  <TextAreaFieldGroup
                    type="text"
                    placeholder="description"
                    name="description"
                    value={this.state.description}
                    onChange={this.onChange}
                    info="All you want to say.."
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
AddExperiences.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  addExperiences: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { addExperiences }
)(withRouter(AddExperiences));
