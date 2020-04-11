import { getAllSchedules } from "../../services/ChamadaAPI";
import { showLoading, hideLoading } from "react-redux-loading";

import { createErrorMessage } from "./errors";

export const COLLECTION_NAME = "schedules";

// #region CREATE_SCHEDULE
export const CREATE_SCHEDULE = "CREATE_SCHEDULE";
export function createSchedule(schedule) {
  return {
    type: CREATE_SCHEDULE,
    schedule: schedule
  };
}

export const handleCreateSchedule = schedule => {
  return (dispatch, _getState, { getFirestore, getFirebase }) => {
    return new Promise((resolve, reject) => {
      const ref = getFirestore().collection(COLLECTION_NAME);

      const newSchedule = { ...schedule };

      console.log("schedule",schedule)

      const validate = validateSchedule(schedule);
      const persist = !newSchedule.id
        ? ref.add(newSchedule)
        : ref.doc(newSchedule.id).update(newSchedule);

      dispatch(showLoading);
      Promise.all([validate, persist])
        .then(result => {
          dispatch(hideLoading);
          resolve(result);
        })
        .catch(error => {
          dispatch(createErrorMessage(error));
          dispatch(hideLoading);
          reject(error);
        });
    });
  };
};

const validateSchedule = schedule => {
  return new Promise((resolve, reject) => {
    const { date, status, createBy, createAt } = schedule;

    if (!(date && status && createBy && createAt)) {
      reject("Object invalid. Please inform 'date' and 'status' attributes.");
      return;
    }

    if (!(status === "pending" || status === "finished")) {
      reject(
        "Object invalid. 'status' attribute should be 'pending' or 'finished'."
      );
      return;
    }

    if (!(status === "pending" || status === "finished")) {
      reject(
        "Object invalid. 'status' attribute should be 'pending' or 'finished'."
      );
      return;
    }

    if (!(status === "pending" || status === "finished")) {
      reject(
        "Object invalid. 'status' attribute should be 'pending' or 'finished'."
      );
      return;
    }

    resolve(true);
  });
};

// #endregion CREATE_SCHEDULE

// #region SEARCH_SCHEDULES
export const SEARCH_SCHEDULES = "SEARCH_SCHEDULES";
export function searchSchedules(searchTerm) {
  return {
    type: SEARCH_SCHEDULES,
    search: searchTerm
  };
}

export function handleOnSearchSchedules(searchTerm) {
  return dispatch => {
    dispatch(showLoading());
    dispatch(searchSchedules(searchTerm));
    dispatch(hideLoading());
  };
}

// #endregion SEARCH_SCHEDULES

// #region RECIVER_SCHEDULES
export const RECIVER_SCHEDULES = "RECIVER_SCHEDULES";
export function reciverSchedules(dates) {
  return {
    type: RECIVER_SCHEDULES,
    dates
  };
}

export function handleReciverSchedules(callback = null) {
  return dispatch => {
    dispatch(showLoading());
    getAllSchedules()
      .then(data => {
        dispatch(reciverSchedules(data));
        callback && callback(null, data);
        dispatch(hideLoading());
      })
      .catch(e => {
        console.warn("Error in handleReciverSchedules: ", e);
        callback && callback(e, null);
        dispatch(hideLoading());
      });
  };
}

// #endregion RECIVER_SCHEDULES
