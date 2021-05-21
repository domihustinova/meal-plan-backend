import express from "express";
import fetch from "node-fetch";
import buildUrl from "build-url";

const app = express();

const APP_ID = process.env.EDAMAM_APP_ID;
const APP_KEY = process.env.EDAMAM_APP_KEY;

const PORT = process.env.PORT || 4000;

app.get("/recipes", function (request, response) {
  response.setHeader(
    "Access-Control-Allow-Origin",
    "http://meal-pal.herokuapp.com"
  );

  const queryUrl = buildUrl("https://api.edamam.com", {
    path: "search",
    disableCSV: true,
    queryParams: {
      ...request.query,
      app_id: APP_ID,
      app_key: APP_KEY,
    },
  });

  fetch(queryUrl)
    .then((res) => res.json())
    .then((body) => response.send(body));
});

app.listen(PORT, function () {
  console.log(`Server is running on port ${PORT}`);
});
