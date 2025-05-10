const testData = require("./testData.ts");
const express = require("express");

var cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:5173",
  methods: ['GET', 'PUT', 'POST'],
  allowedHeaders: ["Content-Type"],
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(express.json());
app.use(cors(corsOptions));
const port = 3000;

app.get("/", (req, res) => {
  //  send back some notes here

  res.send({ data: testData.data });
});

app.post("/", (req, res) => {
  console.log(req.body);
  res.send({ msg: "ok" });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
