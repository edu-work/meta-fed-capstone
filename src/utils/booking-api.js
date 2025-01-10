/*
    React Testing Library, along with other testing libraries like Jest, doesn't execute your application in a real browser environment. 
    This means it doesn't load and parse index.html or process <script> tags in the traditional way.
 */


const seededRandom = function (seed) {
  var m = 2 ** 35 - 31;
  var a = 185852;
  var s = seed % m;
  return function () {
    return (s = s * a % m) / m;
  };
}

const mockFetchAPI = (date) => {
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

const mockSubmitAPI = function (formData) {
  return true;
};


export const fetchAPI = window.fetchAPI || mockFetchAPI;
export const submitAPI = window.submitAPI || mockSubmitAPI;

