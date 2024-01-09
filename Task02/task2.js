const axios = require("axios");
const handleError = require("./utils");

const getData = async (url) => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    handleError(error?.response?.status);
  }
};

const apiUrl = "https://jsonplaceholder.typicode.com/posts/1";

getData(apiUrl).then((response) => {
  console.log("Obtained Result is: ", response);
});
