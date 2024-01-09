const axios = require("axios");

const downloadURLs = async (urls) => {
  try {
    const responses = await Promise.all(
      urls.map(async (url) => {
        const response = await axios.get(url);
        // console.log(`Downloaded content from ${url}`);   // uncomment this line to verify that resources are being downloaded asynchromously
        return response.data;
      })
    );

    return responses;
  } catch (error) {
    console.error("Error occurred:", error.message);
  }
};

const urls = [
  "https://jsonplaceholder.typicode.com/posts/1",
  "https://jsonplaceholder.typicode.com/posts/2",
  "https://jsonplaceholder.typicode.com/posts/3",
  "https://jsonplaceholder.typicode.com/posts/4",
  "https://jsonplaceholder.typicode.com/posts/5",
];

const result = downloadURLs(urls);

result.then((data) => {
  !data
    ? console.log("One or more sources failed to download, try checking URLs")
    : console.log(data);
});
