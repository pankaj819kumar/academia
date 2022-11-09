import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import { addLink, uploadFile } from '../firebase/upload';

class Upload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      subjectName: '',
      teacher: '',
      file: null,
      link: '',
    };
  }

  componentWillUnmount() {
    // this.props.dispatch(clearAuthState());
  }

  handleInputChange = (field, value) => {
    this.setState({
      [field]: value,
    });
  };

  onFormSubmit = (e) => {
    e.preventDefault();
    let { name, subjectName, teacher, file, link } = this.state;
    subjectName = subjectName.trim().toLowerCase();
    if (name && file && subjectName && teacher) {
      uploadFile(name, subjectName, teacher, file);
    }
    else if (name && link && subjectName && teacher) {
      addLink(name, subjectName, teacher, link);
    }
    this.props.navigate("/", { replace: true });
  };
  render() {
    const { auth } = this.props;
    if (!auth.isLoggedin) {
      return <Navigate to="/login" replace />;
    }
    return (
      <form className="login-form">
        <span className="login-signup-header"> upload file</span>
        <div className="field">
          <input
            placeholder="name"
            type="text"
            required
            onChange={(e) => this.handleInputChange('name', e.target.value)}
          />
        </div>
        <div className="field">
          <input
            placeholder="subject"
            type="text"
            required
            onChange={(e) =>
              this.handleInputChange('subjectName', e.target.value)
            }
          />
        </div>
        <div className="field">
          <input
            placeholder="teacher"
            type="text"
            required
            onChange={(e) => this.handleInputChange('teacher', e.target.value)}
          />
        </div>
        <div className="field">
          <input
            placeholder="file"
            type="file"
            id='file-upload'
            onChange={(e) => this.handleInputChange('file', e.target.files[0])}
          />
        </div>
        <span>or</span>
        <div className="field">
          <input
            placeholder="link"
            type="text"
            onChange={(e) => this.handleInputChange('link', e.target.value)}
          />
        </div>
        <div className="field">
          <button onClick={this.onFormSubmit}>upload</button>
        </div>
      </form>
    );
  }
}

const withRouter = (WrappedComponent) => (props) => {
  const navigate = useNavigate();

  return <WrappedComponent {...props} navigate={navigate} />;
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default withRouter(connect(mapStateToProps)(Upload));
