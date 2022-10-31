export function getFormBody(params) {
  let formBody = []; //  [username=pankaj, password=123]

  for (let property in params) {
    let encodedKey = encodeURIComponent(property);
    let encodedValue = encodeURIComponent(params[property]);

    formBody.push(encodedKey + '=' + encodedValue);
  }

  return formBody.join('&'); // username=pankaj&password=123
}

export function getAuthTokenFromLocalStorage() {
  return localStorage.getItem('firebase:authUser:AIzaSyBME_duwiAFeCqxIZ2iYU6nNv46897hfR8:[DEFAULT]');
}