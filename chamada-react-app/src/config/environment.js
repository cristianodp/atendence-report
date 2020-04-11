export default {
  IS_DEV_MODE: process.env.NODE_ENV
    ? process.env.NODE_ENV === "development"
    : false
};
