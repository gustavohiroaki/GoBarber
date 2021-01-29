export default {
  jwt: {
    secret: process.env.APP_SECRET || "temporarysecret",
    expiresIn: "1d",
  },
};
