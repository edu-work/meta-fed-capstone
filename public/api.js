/*
    Loading a copy of the capstone script because it is generating an error.
    
    https://raw.githubusercontent.com/courseraap/capstone/main/api.js

    Cross-Origin Read Blocking (CORB) issues occur when a browser blocks a cross-origin request for resources 
    that are not of the expected MIME type, such as JavaScript or CSS files being returned as text/html. This is 
    typically due to incorrect Content-Type headers in the responses. 

    The browser is expecting applicaiton/javascript and get text/plan instead.
    You can check the content type by running curl.  
    curl -I https://raw.githubusercontent.com/courseraap/capstone/main/api.js
  */


const seededRandom = function (seed) {
  var m = 2 ** 35 - 31;
  var a = 185852;
  var s = seed % m;
  return function () {
    return (s = s * a % m) / m;
  };
}

const fetchAPI = function (date) {
  let result = [];
  let random = seededRandom(date.getDate());

  for (let i = 17; i <= 23; i++) {
    if (random() < 0.5) {
      result.push(i + ':00');
    }
    if (random() < 0.5) {
      result.push(i + ':30');
    }
  }
  return result;
};

const submitAPI = function (formData) {
  return true;
};