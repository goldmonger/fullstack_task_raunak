const host = {
  protocol: "ws",
  host: "broker.emqx.io",
  port: 8083,
};
export const initialConnectionOptions = {
  // ws or wss

  clientId: "emqx_react_" + Math.random().toString(16).substring(2, 8),
  // ws -> 8083; wss -> 8084

  /**
   * By default, EMQX allows clients to connect without authentication.
   * https://docs.emqx.com/en/enterprise/v4.4/advanced/auth.html#anonymous-login
   */
  username: "emqx_test",
  password: "emqx_test",
  clean: true,
  reconnectPeriod: 1000, // ms
  connectTimeout: 30 * 1000, // ms
};

export const brokerUrl = `${host.protocol}://${host.host}:${host.port}/mqtt`;
