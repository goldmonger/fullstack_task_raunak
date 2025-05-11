import express from "express";
import { redisClient } from "../redisClient.js";
import { Task } from "../mongoClient.js";
const router = express.Router();

router.get("/fetchAllTasks", async (req, res) => {
  const redisData = await (await redisClient).get("FULLSTACK_TASK_RAUNAK");
  const redisTasks = redisData ? JSON.parse(redisData) : [];
  const mongoTasks = await Task.find().lean();
  const allTasks = [...redisTasks, ...mongoTasks.map((doc) => doc.task)];
  res.json({ tasks: allTasks });
});

export { router };
