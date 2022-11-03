import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../actions/auth';

class Navbar extends React.Component {
  logOut = () => {
    localStorage.removeItem('firebase:authUser:AIzaSyBME_duwiAFeCqxIZ2iYU6nNv46897hfR8:[DEFAULT]');
    this.props.dispatch(logout());
  };

  render() {
    const { auth } = this.props;

    return (
      <div>
        <nav className="nav">
          <div className="left-div">
            <Link to="/">
              {/* <img
                src="https://ninjasfiles.s3.amazonaws.com/0000000000003454.png"
                alt="logo"
              /> */}
            </Link>
          </div>
          {/* {auth.isLoggedin && (
            <div className="search-container">
              <img
                src="https://cdn-icons-png.flaticon.com/512/149/149852.png"
                alt="search-icon"
                className="search-icon"
              />
              <input placeholder="Search" />
              <div className="search-results">
                <ul>
                  <li className="search-results-row">
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/456/456212.png"
                      alt="user-dp"
                    />
                    <span>Pankaj Kumar</span>
                  </li>
                  <li className="search-results-row">
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/456/456212.png"
                      alt="user-dp"
                    />
                    <span>Pankaj Kumar</span>
                  </li>
                </ul>
              </div>
            </div>
          )} */}
          <div className="right-nav">
            {auth.isLoggedin && (
              <div className="user">
                {/* <Link to="/settings" style={{ textDecoration: 'none', color: 'white' }}> */}
                  {/* <img
                    src="https://cdn-icons-png.flaticon.com/512/747/747376.png"
                    alt="user-dp"
                    id="user-dp"
                  /> */}
                <span>{auth.user.displayName}</span>
                {/* </Link> */}
              </div>
            )}

            <div className="nav-links">
              <ul>
                {auth.isLoggedin && (
                  <li>
                    <Link to="/upload">Upload</Link>
                  </li>
                )}
                {!auth.isLoggedin && (
                  <li>
                    <Link to="/login">Login</Link>
                  </li>
                )}

                {auth.isLoggedin && <li onClick={this.logOut}>Logout</li>}
                {!auth.isLoggedin && (
                  <li>
                    <Link to="/signup">Register</Link>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}
export default connect(mapStateToProps)(Navbar);
