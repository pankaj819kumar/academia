import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from 'react-router-dom';
import { Navbar, Home, Login, Signup, Settings, Page404 } from './index';

const PrivateRoute = ({ isLoggedin, children }) => {
  const navigate = useNavigate();
  console.log('login status', isLoggedin);
  return isLoggedin ? children : navigate('/login');
};

class App extends Component {

  render() {
    const { auth } = this.props;
    return (
      <Router>
          <div>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home/>} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
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
  };
}

// App.propTypes = {
//   posts: PropTypes.array.isRequired,
// };

export default connect(mapStateToProps)(App);
