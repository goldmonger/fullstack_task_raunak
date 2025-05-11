import express from "express";
import { data } from "../testData.js";
const router = express.Router();

router.get("/fetchAllTasks", (req, res) => {
  console.log("here");
  const per_page = req.query.per_page || 10;
  const page = req.query.page || 1;

  res.send({
    data: data,
  });
});

router.get("/", (req, res) => {
  res.send("hi from server and subscriber");
});

router.post("/", (req, res) => {
  console.log(req.body);
  res.send({ msg: "ok" });
});

export { router };
