const host = {
  protocol: import.meta.env.VITE_MQTT_PROTOCOL,
  // host: "broker.emqx.io",
  host: import.meta.env.VITE_MQTT_HOST,
  // port: 8083,
  port: import.meta.env.VITE_MQTT_PORT,
};
export const initialConnectionOptions = {
  // ws or wss

  clientId: "emqx_react_" + Math.random().toString(16).substring(2, 8),
  // ws -> 8083; wss -> 8084

  /**
   * By default, EMQX allows clients to connect without authentication.
   * https://docs.emqx.com/en/enterprise/v4.4/advanced/auth.html#anonymous-login
   */
  username: import.meta.env.VITE_MQTT_USERNAME,
  password: import.meta.env.VITE_MQTT_PASSWORD,
  clean: true,
  reconnectPeriod: 1000, // ms
  connectTimeout: 30 * 1000, // ms
};

export const brokerUrl = `${host.protocol}://${host.host}:${host.port}/mqtt`;
