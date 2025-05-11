import express from "express";
const router = express.Router();

router.get("/fetchAllTasks", (req, res) => {
  res.send();
});

router.get("/", (req, res) => {
  res.send("hi from server and subscriber");
});

router.post("/", (req, res) => {
  console.log(req.body);
  res.send({ msg: "ok" });
});

export { router };
