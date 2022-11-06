import {
  LOGIN_START,
  LOGIN_FAILED,
  LOGIN_SUCCESS,
  AUTHENTICATE_USER,
  LOG_OUT,
  SIGNUP_START,
  SIGNUP_FAILED,
  SIGNUP_SUCCESS,
  CLEAR_AUTH_STATE,
  EDIT_USER_SUCCESSFULL,
  EDIT_USER_FAILED,
} from './actionTypes';
// import { APIUrls } from '../helpers/urls';
// import { getAuthTokenFromLocalStorage, getFormBody } from '../helpers/utils';
import { auth } from '../firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth';

export function startLogin() {
  return {
    type: LOGIN_START,
  };
}
export function loginFailed(errorMessage) {
  return {
    type: LOGIN_FAILED,
    error: errorMessage,
  };
}

export function loginSuccess(user) {
  return {
    type: LOGIN_SUCCESS,
    user,
  };
}

export function login(email, password) {
  return (dispatch) => {
    dispatch(startLogin());
    // const url = APIUrls.login();
    // const url = "abcd";
    // fetch(url, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/x-www-form-urlencoded',
    //   },
    //   body: getFormBody({ email, password }),
    // })
    //   .then((response) => response.json())
    //   .then((data) => {
    //     console.log('login response data', data);
    //     if (data.success) {
    //       // dispatch action to save user
    //       localStorage.setItem('token', data.data.token);
    //       dispatch(loginSuccess(data.data.user));
    //       return;
    //     }
    //     dispatch(loginFailed(data.message));
    //   });
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // console.log('user in login action', user);
        dispatch(loginSuccess(user));
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(
          'error in login action. code: ',
          errorCode,
          'error message: ',
          errorMessage
        );
        dispatch(loginFailed(errorMessage));
      });
  };
}

export function authenticateUser(user) {
  return {
    type: AUTHENTICATE_USER,
    user,
  };
}

export function logout() {
  return (dispatch) => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        // console.log('logout successful');
        dispatch(logoutUser());
      })
      .catch((error) => {
        // An error happened.
        console.log('error in logout action', error);
      });
  };
}

export function logoutUser() {
  return {
    type: LOG_OUT,
  };
}

export function signup(email, password, confirmPassword, name) {
  return (dispatch) => {
    // const url = APIUrls.signup();
    // fetch(url, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/x-www-form-urlencoded',
    //   },
    //   body: getFormBody({
    //     email,
    //     password,
    //     confirm_password: confirmPassword,
    //     name,
    //   }),
    // })
    //   .then((response) => response.json())
    //   .then((data) => {
    //     // console.log('data', data);
    //     if (data.success) {
    //       // do something
    //       localStorage.setItem('token', data.data.token);
    //       dispatch(signupSuccessful(data.data.user));
    //       return;
    //     }
    //     dispatch(signupFailed(data.message));
    //   });
    if (password !== confirmPassword) {
      dispatch(signupFailed('password do not match'));
      return;
    }
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        // setting name
        updateProfile(auth.currentUser, {
          displayName: name,
        })
          .then(() => {
            // Profile updated!
            // ...
          })
          .catch((error) => {
            // An error occurred
            console.log('error in setting displayName', error);
          });
        const user = userCredential.user;
        // console.log('user in sign up action', user);
        dispatch(signupSuccessful(user));
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(
          'error in signup action. code: ',
          errorCode,
          'error message: ',
          errorMessage
        );
        dispatch(signupFailed(errorMessage));
        // ..
      });
  };
}

export function startSignup() {
  return {
    type: SIGNUP_START,
  };
}

export function signupFailed(error) {
  return {
    type: SIGNUP_FAILED,
    error,
  };
}

export function signupSuccessful(user) {
  return {
    type: SIGNUP_SUCCESS,
    user,
  };
}

export function clearAuthState() {
  return {
    type: CLEAR_AUTH_STATE,
  };
}

export function editUserSuccessful(user) {
  return {
    type: EDIT_USER_SUCCESSFULL,
    user,
  };
}
export function editUserFailed(error) {
  return {
    type: EDIT_USER_FAILED,
    error,
  };
}

// export function editUser(name, password, confirmPassword, userId) {
//   return (dispatch) => {
//     const url = APIUrls.editProfile();
//     fetch(url, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/x-www-form-urlencoded',
//         'Authorization': `Bearer ${getAuthTokenFromLocalStorage()}`,
//       },
//       body: getFormBody({
//         name,
//         password,
//         confirm_password: confirmPassword,
//         id: userId
//       })
//     }).then(response => response.json())
//       .then((data) => {
//         console.log('data in editUser', data);
//         if (data.success) {
//           dispatch(editUserSuccessful(data.data.user));
//         }
//         if (data.data.token) {
//           localStorage.setItem('token', data.data.token);
//           return;
//         }

//         dispatch(editUserFailed(data.message));
//       })
//   }
// }
