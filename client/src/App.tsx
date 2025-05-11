import React, { useEffect } from "react";
import { useState } from "react";
import mqtt from "mqtt";
import { brokerUrl, initialConnectionOptions } from "./mqtt.config";

// import './App.css'

function App() {
  const [notes, setNotes] = useState([]);
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

    // send the message to the broker and the server together
    publishRecord.payload = data.value;
    mqttPublish(publishRecord);

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
        console.log("trigger update");
        const payload = { topic, message: message.toString() };
        console.log(payload);
        setPayload(payload);
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

  return (
    <div className="flex items-center justify-center h-screen w-full">
      <div className="border border-[#D3D4D9] font-inter font-semibold rounded-lg shadow 3xl:px-6">
        <p className="text-emerald-500 text-xl">{connectStatus}</p>
        <div className="pt-5 pb-1 rounded-t-lg flex items-center">
          <div className="h-16 w-16 rounded-lg relative">
            <img src="/logo.png" className="absolute -top-0.5 -left-2.5" />
          </div>
          <div className="lg:text-[32px] 3xl:text-[48px]">Note App</div>
        </div>
        <div className="pt-2 pb-2 3xl:pb-5">
          <div className=" flex gap-5 w-full">
            <input
              type="text"
              placeholder="New Note..."
              id="form-input"
              className="w-3/4 border border-[#D3D4D9] rounded-xl shadow 3xl:text-[30px] px-4 py-2 placeholder:font-normal placeholder:text-2xl"
            />
            <button
              className="border lg:text-[24px] 3xl:text-[28px] rounded-xl w-1/4 flex items-center justify-center gap-3 bg-[#92400E] text-white"
              onClick={handlePublish}
            >
              <div className="rounded-full w-7 h-7 bg-white flex items-center justify-center">
                <div className="relative w-4 h-0.5">
                  <div className="w-4 h-0.5 bg-[#92400E] absolute top-0 left-0"></div>
                  <div className="w-4 h-0.5 bg-[#92400E] absolute top-0 left-0 rotate-90"></div>
                </div>
              </div>
              Add
            </button>
          </div>
        </div>
        <div className="3xl:text-[30px] lg:text-[22px] 3xl:pt-3">
          <h1 className="font-bold border-b border-[#C5CAD3]">Notes</h1>
          <div className="font-normal max-h-[24vh] overflow-scroll">
            {notes && notes.length > 0 ? (
              notes.map((el, idx) => {
                return (
                  <div key={idx} className="border-b border-[#C5CAD3] py-3">
                    {/* @ts-ignore */}
                    {el.content}
                  </div>
                );
              })
            ) : (
              <p>No Notes Yet..</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
