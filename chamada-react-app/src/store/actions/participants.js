import { getAllParticipants } from "../../services/ChamadaAPI";
import { showLoading, hideLoading } from "react-redux-loading";

import { createErrorMessage } from "./errors";

export const COLLECTION_NAME = "attendances";

// #region reciverParticipants
export const RECIVER_PARTICIPANTS = "RECIVER_PARTICIPANTS";
export function reciverParticipants(data) {
    return {
        type: RECIVER_PARTICIPANTS,
        participants: data
    };
}

export function handleReciverParticipants(scheduleId, callback = null) {
    return dispatch => {
        getAllParticipants(scheduleId)
            .then(data => {
                dispatch(reciverParticipants(data));
                callback(null, data);
            })
            .catch(e => {
                console.warn("Error in handleReciverParticipants: ", e);
                callback(e, null);
            });
    };
}

// #endregion reciverParticipants

// #region updateAtendence
export const UPDATE_ATTENDANCE = "UPDATE_ATTENDANCE";
export const updateAtendence = atendence => {
    return {
        type: RECIVER_PARTICIPANTS,
        atendence
    };
};

export const handleUpdateAtendence = atendence => {
    return (dispatch, _getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();
        dispatch(showLoading);

        const ref = firestore.ref(COLLECTION_NAME);

        if (!atendence.id) {
            ref.add({
                ...atendence
            })
                .then(response => {
                    console.log("response", response);
                    dispatch(updateAtendence(atendence));
                    dispatch(hideLoading);
                })
                .catch(error => {
                    dispatch(createErrorMessage(error));
                    dispatch(hideLoading);
                });
        } else {
            ref.doc(atendence.id)
                .update({
                    ...atendence
                })
                .then(response => {
                    console.log("response", response);
                    dispatch(updateAtendence(atendence));
                    dispatch(hideLoading);
                })
                .catch(error => {
                    dispatch(createErrorMessage(error));
                    dispatch(hideLoading);
                });
        }
    };
};

// #endregion

// #region Prospect
export const SEARCH_PROSCPECT = "SEARCH_PROSCPECT";
export function searchProspect(searchTerm) {
    return {
        type: SEARCH_PROSCPECT,
        search: searchTerm
    };
}

export function handleOnSearchProspect(searchTerm) {
    return dispatch => {
        dispatch(showLoading());
        dispatch(searchProspect(searchTerm));
        dispatch(hideLoading());
    };
}

// #endregion SEARCH_SCHEDULES

// #region CREATE_PERSON

export const handleCreatePerson = person => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();
        // const profile = getState().firebase.profile;
        const authorId = getState().firebase.auth.uid;
debugger
        firestore
            .collection("persons")
            .add({
                ...person,
                fullName: `${person.firstName} ${person.lastName} `,
                office: "Elder",
                avatar:
                    "https://firebasestorage.googleapis.com/v0/b/chamda-online.appspot.com/o/avatar.png?alt=media&token=840682a4-9423-4ada-b577-21508151d4ac",
                createBy: authorId,
                createAt: new Date()
            })
            .then(response => {
                console.log("response", response);
            })
            .catch(error => {
                dispatch(createErrorMessage(error));
            });
    };
};

// #endregion

// #region UPDATE PERSON
export const handleUpdatePerson = (personId, person) => {
    return (dispatch, _getState, { getFirestore }) => {
        const firestore = getFirestore();
        dispatch(showLoading);
        const ref = firestore.collection("persons");
        ref.doc(personId)
            .update({
                ...person
            })
            .then(response => {
                console.log("response", response);
                // dispatch(updateAtendence(atendence));
                dispatch(hideLoading);
            })
            .catch(error => {
                dispatch(createErrorMessage(error));
                dispatch(hideLoading);
            });
    };
};

// #endregion

// #region SEARCH_PERSON
export const SEARCH_PERSON = "SEARCH_PERSON";
export function searchPerson(searchTerm) {
    return {
        type: SEARCH_PERSON,
        search: searchTerm ? searchTerm.toUpperCase() : ""
    };
}

export function handleOnSearchParticipants(searchTerm) {
    return dispatch => {
        dispatch(showLoading());
        dispatch(searchPerson(searchTerm));
        dispatch(hideLoading());
    };
}

// #endregion

export const loadingNewPersons = newPersons => {
    return (dispatch, _getState, { getFirestore }) => {
        const firestore = getFirestore();
        dispatch(showLoading);
        const ref = firestore.collection("prospects");

        for (const item in newPersons) {
            ref.add(newPersons[item])
                .then(response => {
                    console.log("response", response);
                    // dispatch(updateAtendence(atendence));
                    dispatch(hideLoading);
                })
                .catch(error => {
                    dispatch(createErrorMessage(error));
                    dispatch(hideLoading);
                });
        }
    };
};
