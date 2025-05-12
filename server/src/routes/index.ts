import express from "express";
import { redisClient } from "../redisClient.js";
import { Task } from "../mongoClient.js";
const router = express.Router();

router.get("/fetchAllTasks", async (req, res) => {
  // @ts-ignore
  let mongoTasks,
    allTasks,
    redisTasks,
    redisData = undefined;

  try {
    // redis data
    redisData = await (await redisClient).get("FULLSTACK_TASK_RAUNAK");
    redisTasks = redisData ? JSON.parse(redisData) : [];
  } catch (err) {
    redisTasks = [];
    console.error(err);
  }

  try {
    mongoTasks = await Task.find().lean();
  } catch (err) {
    mongoTasks = [];
    console.error(err);
  }
  // @ts-ignore
  allTasks = [...redisTasks, ...mongoTasks.map((doc) => doc.task)];
  res.json({ tasks: allTasks });
});

router.get("/deleteAllTasks", async (req, res) => {
  await (await redisClient).flushDb();
  res.send("done");
});

export { router };
