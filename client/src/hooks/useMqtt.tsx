import React, { useEffect, useState } from "react";
import { brokerUrl, initialConnectionOptions } from "../mqtt.config";
import mqtt from "mqtt";
import useNotes from "./useNotes";

const useMqtt = () => {
  const { refetch } = useNotes();
  const [client, setClient] = useState<null | any>(null);
  const [payload, setPayload] = useState<null | any>(null);
  const [connectStatus, setConnectStatus] = useState<string>("Connect.");

  // @ts-ignore
  const mqttConnect = (host, mqttOption) => {
    setConnectStatus("Connecting...");
    setClient(mqtt.connect(host, mqttOption));
  };
  const subscribeRecord = {
    topic: "/add",
    qos: 0,
  };
  const publishRecord = {
    topic: "/add",
    qos: 0,
    payload: "",
  };
  // @ts-ignore
  const mqttPublish = (context) => {
    if (client) {
      const { topic, qos, payload } = context;
      // @ts-ignore
      client.publish(topic, payload, { qos }, (error) => {
        if (error) {
          console.log("Publish error: ", error);
        }
      });
    }
  };

  // disconnect
  // https://github.com/mqttjs/MQTT.js#mqttclientendforce-options-callback
  const mqttDisconnect = () => {
    if (client) {
      try {
        client.end(false, () => {
          setConnectStatus("Connect");
          console.log("disconnected successfully");
        });
      } catch (error) {
        console.log("disconnect error:", error);
      }
    }
  };
  // @ts-ignore
  const mqttSub = (subscription) => {
    if (client) {
      // topic & QoS for MQTT subscribing
      const { topic, qos } = subscription;
      // subscribe topic
      // https://github.com/mqttjs/MQTT.js#mqttclientsubscribetopictopic-arraytopic-object-options-callback
      // @ts-ignore
      client.subscribe(topic, { qos }, (error) => {
        if (error) {
          console.log("Subscribe to topics error", error);
          return;
        }
        console.log(`Subscribe to topics: ${topic}`);
        // setIsSub(true);
      });
    }
  };

  // unsubscribe topic
  // https://github.com/mqttjs/MQTT.js#mqttclientunsubscribetopictopic-array-options-callback
  // @ts-ignore
  const mqttUnSub = (subscription) => {
    if (client) {
      const { topic, qos } = subscription;
      // @ts-ignore
      client.unsubscribe(topic, { qos }, (error) => {
        if (error) {
          console.log("Unsubscribe error", error);
          return;
        }
        console.log(`unsubscribed topic: ${topic}`);
        // setIsSub(false);
      });
    }
  };

  const handlePublish = async () => {
    const data: HTMLInputElement | null = document.getElementById(
      "form-input"
    ) as HTMLInputElement;
    // console.log(data?.value);

    // send the message to the broker
    publishRecord.payload = data.value;
    mqttPublish(publishRecord);

    //              DEV POST TEST CODE
    // const responseData = JSON.stringify({ data: data.value });
    // const response = await fetch("http://localhost:3000", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: responseData,
    // });
    // console.log(await response.json());
  };

  // listeners for mqtt client
  useEffect(() => {
    if (client) {
      // console.log(client);
      client.on("connect", () => {
        setConnectStatus("Connected.");
      });
      // @ts-ignore
      client.on("error", (err) => {
        console.error("Connection error: ", err);
        client.end();
      });
      client.on("reconnect", () => {
        setConnectStatus("Reconnecting...");
      });
      // @ts-ignore
      client.on("message", (topic, message) => {
        // a new todo has been added, trigger update of list
        refetch();
      });
    } else {
      mqttConnect(brokerUrl, initialConnectionOptions);
    }

    mqttSub(subscribeRecord);
    return () => {
      mqttUnSub(subscribeRecord);
      mqttDisconnect();
    };
  }, [client]);

  return { handlePublish };
};

export default useMqtt;
