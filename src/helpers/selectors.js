export function getAppointmentsForDay(state, day) {
  let finalObj = [];

  if (state.days.length === 0) {
    return finalObj;
  }

  if (state.days.find(obj => obj.name === day)) {
    let foundDay = state.days.find(obj => obj.name === day)
    let appointmentList = foundDay.appointments

    appointmentList.map((id) => {
      finalObj.push(state.appointments[id]);
    });

    return finalObj;
  } else {

    return finalObj
  }
}