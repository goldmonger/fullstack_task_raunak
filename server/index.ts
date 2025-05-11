import "dotenv/config";
import express from "express";
import mqtt from "mqtt";
import { createClient } from "redis";
import cors from "cors";

const app = express();

var corsOptions = {
  origin: "http://localhost:5173",
  methods: ["GET", "PUT", "POST"],
  allowedHeaders: ["Content-Type"],
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(express.json());
app.use(cors(corsOptions));
const serverPort = process.env.SERVER_PORT;

// redis config
const redisClient = createClient({
  url: `redis://${process.env.REDIS_USERNAME}:${process.env.REDIS_PASSWORD}@${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
})
  // @ts-ignore
  .on("error", (err) => console.log("Redis Client Error", err))
  .connect();

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
  // redis work
  const value = await (await redisClient).get("key");
  console.log(value);
});

// @ts-ignore
app.get("/", (req, res) => {
  //  send back some notes here
  res.send("hi from server and subscriber");
  // res.send({ data: testData.data });
});
// @ts-ignore
app.post("/", (req, res) => {
  console.log(req.body);
  res.send({ msg: "ok" });
});

app.listen(serverPort, () => {
  console.log(`Server live on port ${serverPort}`);
});
