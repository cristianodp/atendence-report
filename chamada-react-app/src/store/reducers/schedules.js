import {
  RECIVER_SCHEDULES,
  SEARCH_SCHEDULES,
  CREATE_SCHEDULE
} from "../actions/schedules";

export const initialState = { dates: [], search: "", searchResult: [] };

export default function Schedules(state = initialState, action) {
  switch (action.type) {
    case RECIVER_SCHEDULES:
      return {
        ...state,
        dates: action.dates,
        search: "",
        list: action.dates
      };
    case SEARCH_SCHEDULES:
      return {
        ...state,
        search: action.search
      };
    case CREATE_SCHEDULE: {
      return {
        ...state
      };
    }
    default:
      return state;
  }
}
