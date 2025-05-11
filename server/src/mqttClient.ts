import mqtt from "mqtt";
import { redisClient } from "./redisClient";
import { Task } from "./mongoClient";

// mqtt config
const clientId = `mqtt_${Math.random().toString(16).slice(3)}`;
const topic = "/add";
const connectUrl = `${process.env.MQTT_PROTOCOL}://${process.env.MQTT_HOST}:${process.env.MQTT_PORT}`;

const client = mqtt.connect(connectUrl, {
  clientId,
  clean: true,
  connectTimeout: 4000,
  username: process.env.MQTT_USERNAME,
  password: process.env.MQTT_PASSWORD,
  reconnectPeriod: 1000,
});

client.on("connect", () => {
  console.log("Connected to mqtt broker...");
  client.subscribe([topic], () => {
    console.log(`Subscribe to topic '${topic}'`);
  });
});
// @ts-ignore
client.on("error", (error) => {
  console.error("connection failed", error);
});
// @ts-ignore
client.on("reconnect", (error) => {
  console.error("reconnect failed", error);
});
// @ts-ignore
client.on("message", async (topic, payload) => {
  console.log("Received Message:", topic, payload.toString());

  if (topic === "/add") {
    const task = payload.toString();
    const data = await (await redisClient).get("FULLSTACK_TASK_RAUNAK");
    const taskList = data ? JSON.parse(data) : [];
    taskList.push(task);

    if (taskList.length > 50) {
      // Move to MongoDB and clear Redis
      await Task.insertMany(taskList.map((task: string) => ({ task })));
      await (await redisClient).del("FULLSTACK_TASK_RAUNAK");
      console.log("Moved to MongoDB and cleared cache");
    } else {
      await (
        await redisClient
      ).set("FULLSTACK_TASK_RAUNAK", JSON.stringify(taskList));
    }
  }
});
