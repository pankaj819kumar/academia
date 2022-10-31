import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { fetchSubjects } from '../actions/subjects';
import { Subjects } from './index';

class Home extends Component {
  componentDidMount() {
    this.props.dispatch(fetchSubjects());
  }
  render() {
    const { auth } = this.props;
    if (!auth.isLoggedin) {
      return <Navigate to='/login' replace/>
    }
    return (
      <div>
        <Subjects />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}

// App.propTypes = {
//   posts: PropTypes.array.isRequired,
// };

export default connect(mapStateToProps)(Home);