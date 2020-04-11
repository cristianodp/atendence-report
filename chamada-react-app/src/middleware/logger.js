import env from "../config/environment";

const logger = store => next => action => {
  if (!env.IS_DEV_MODE) {
    return next(action);
  }
  console.group(action.type);
  console.log("The action", action);
  const returnValue = next(action);
  console.log("The new state", store.getState());
  console.groupEnd();
  return returnValue;
};

export default logger;
