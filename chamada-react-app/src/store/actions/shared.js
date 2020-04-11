import { showLoading, hideLoading } from "react-redux-loading";

import { getAllParticipants,getAllSchedules } from "../../services/ChamadaAPI";
import { reciverParticipants } from "./participants";
import { reciverSchedules } from "./schedules";

export function handlerInitialData() {
  return dispatch => {
    dispatch(showLoading());
    getAllSchedules()
      .then(schedules => {
        dispatch(reciverSchedules(schedules));
        for (const schedule in schedules){
          getAllParticipants(schedule.id)
          .then(participants=>{
            dispatch(reciverParticipants(participants));
            dispatch(hideLoading());
          })
          .catch(e=>{
            console.log("getAllParticipants ", e);
            dispatch(hideLoading());
          }) 
        }
      })
      .catch(e => {
        console.log("getAllParticipants ", e);
        dispatch(hideLoading());
      });
  };
}


// export function handlerInitialData() {
//   return handleReciverSchedules((schedules)=>{
//     for(const schedule in schedules){
//       handleReciverParticipants(schedule.id);
//     }
//   })
    
// }
