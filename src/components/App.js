import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from 'react-router-dom';
import { authenticateUser } from '../actions/auth';
import { getAuthTokenFromLocalStorage } from '../helpers/utils';
import {
  Navbar,
  Home,
  Login,
  Signup,
  Settings,
  Page404,
  Resources,
  Upload,
} from './index';

const PrivateRoute = ({ isLoggedin, children }) => {
  const navigate = useNavigate();
  // console.log('login status', isLoggedin);
  return isLoggedin ? children : navigate('/login');
};

class App extends Component {
  componentDidMount() {
    const token = getAuthTokenFromLocalStorage();
    if (token) {
      const user = JSON.parse(token);
      // console.log('user after parsing local storage token: ', user);
      this.props.dispatch(
        authenticateUser({
          email: user.email,
          uid: user.uid,
          displayName: user.displayName,
        })
      );
    }
  }
  render() {
    const { auth, subjects } = this.props;
    return (
      <Router>
        <div>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            {subjects.map((subject) => {
              return (
                <Route
                  path={encodeURIComponent(subject.subject_name)}
                  element={<Resources resources={subject.resources} />}
                />
              );
            })}
            <Route path="/upload" element={<Upload />} />
            <Route
              path="/settings"
              element={
                <PrivateRoute isLoggedin={auth.isLoggedin}>
                  <Settings />
                </PrivateRoute>
              }
            />
            <Route path="*" element={<Page404 />} />
          </Routes>
        </div>
      </Router>
    );
  }
}

// specify the things we want to pass as props to App component
function mapStateToProps(state) {
  return {
    auth: state.auth,
    subjects: state.subjects,
  };
}

// App.propTypes = {
//   posts: PropTypes.array.isRequired,
// };

export default connect(mapStateToProps)(App);
