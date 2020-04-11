import { RECIVER_PARTICIPANTS, SEARCH_PERSON, SEARCH_PROSCPECT } from "../actions/participants";

export const initialState = {list:[],search:""};

export default function participants(state = initialState, action) {
  switch (action.type) {
    case RECIVER_PARTICIPANTS:
      return { ...state, list: action.participants };
    case SEARCH_PERSON:
      return {
        ...state,
        search: action.search
      };
    case SEARCH_PROSCPECT:
        return {
          ...state,
          searchProspect: action.search
        };  
    default:
      return state;
  }
}
