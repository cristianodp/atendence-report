import { showLoading, hideLoading } from "react-redux-loading";

import { createErrorMessage } from "./errors";

const COLLECTION_NAME = "attendances";

export const handleUpdateAttendance = Attendance => {
  return (dispatch, _getState, { getFirestore }) => {
    dispatch(showLoading);

    const ref = getFirestore().collection(COLLECTION_NAME);
    const newAttendance = { ...Attendance };

    newAttendance.id = newAttendance.id ? newAttendance.id : ref.doc().id;

    const promisse = ref.doc(newAttendance.id).set(newAttendance);

    promisse
      .then(() => dispatch(hideLoading))
      .catch(error => {
        dispatch(createErrorMessage(error));
        dispatch(hideLoading);
      });
  };
};

export const handleGetAttendanceList = scheduleId => {
  return (dispatch, _getState, { getFirestore }) => {
    dispatch(showLoading);
    extractAttendanceListFromFirestore(getFirestore().ordered, scheduleId);
    dispatch(hideLoading);
  };
};

export const extractAttendanceListFromFirestore = (
  { attendances, persons },
  scheduleId
) => {
  if (!(attendances && persons)) {
    return [];
  }

  const list = persons.map(it => {
    const filtered = attendances.filter(
      filter => filter.personId === it.id && filter.scheduleId === scheduleId
    );

    const { id = null, quorum = null, sacramental = null } =
      filtered.length > 0 ? filtered[0] : {};
    return {
      ...it,
      attendance: {
        id,
        quorum,
        sacramental,
        isPend: quorum === null || sacramental === null,
        personId: it.id,
        scheduleId
      }
    };
  });

  return list;
};
