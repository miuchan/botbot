module.exports = {
  redis: {
    port: 6379,
    host: '127.0.0.1',
    password: undefined,
    db: 0,
    keyPrefix: "duotai:",
  },
  listen: {
    port: Number(process.env.PORT) || 3000,
    host: process.env.HOST || "127.0.0.1",
  },
  hashid: {
    salt: "shuzhaishudoidnwqi3289dh9fwc23",
  },
  cookie: {
    prefix: 'shuzhai_',
  },
  mail: {
    apiKey: 'louI294ttImHYJhL',
    apiUser: 'miuchan_test_rIK8Y3',
  },
}
