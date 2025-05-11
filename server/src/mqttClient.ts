import mqtt from "mqtt";
import { redisClient } from "./redisClient";

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
