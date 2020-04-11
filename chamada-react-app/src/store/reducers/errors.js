import { CREATE_ERROR_MESSAGE } from "../actions/errors";

export const initialState = {errorMessage:""}

export default function participants(state = initialState, action) {
  switch (action.type) {
    case CREATE_ERROR_MESSAGE:
      return { ...state, errorMessage: action.error };
    default:
      return state;
  }
}
