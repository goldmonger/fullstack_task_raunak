const host = {
  protocol: process.env.MQTT_PROTOCOL,
  // host: "broker.emqx.io",
  host: process.env.MQTT_HOST,
  // port: 8083,
  port: process.env.MQTT_PORT,
};
export const initialConnectionOptions = {
  // ws or wss

  clientId: "emqx_react_" + Math.random().toString(16).substring(2, 8),
  // ws -> 8083; wss -> 8084

  /**
   * By default, EMQX allows clients to connect without authentication.
   * https://docs.emqx.com/en/enterprise/v4.4/advanced/auth.html#anonymous-login
   */
  username: process.env.MQTT_USERNAME,
  password: process.env.MQTT_PASSWORD,
  clean: true,
  reconnectPeriod: 1000, // ms
  connectTimeout: 30 * 1000, // ms
};

export const brokerUrl = `${host.protocol}://${host.host}:${host.port}/mqtt`;
