import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import { uploadFile } from '../firebase/upload';

class Upload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      subjectName: '',
      teacher: '',
      file: null,
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
    const { name, subjectName, teacher, file } = this.state;
    // console.log('file to upload', file);
    if (name && file && subjectName && teacher) {
      // this.props.dispatch(uploadFile(name, subjectName, teacher, file));
      uploadFile(name, subjectName, teacher, file);
      this.props.navigate("/", { replace: true });
    }
  };
  render() {
    const { auth } = this.props;
    // console.log('props in withRouter', this.props);
    if (!auth.isLoggedin) {
      return <Navigate to="/login" replace />;
    }
    return (
      <form className="login-form">
        <span className="login-signup-header"> Upload File</span>
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
            required
            onChange={(e) => this.handleInputChange('file', e.target.files[0])}
          />
        </div>
        <div className="field">
          <button onClick={this.onFormSubmit}>Upload</button>
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

// export default connect(mapStateToProps)(Upload);
export default withRouter(connect(mapStateToProps)(Upload));
