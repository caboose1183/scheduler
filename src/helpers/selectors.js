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
};

export function getInterview(state, interview) {
  if (interview === null) {
    return null;
  }

  let finalObj = {};

  let interviewerId = interview.interviewer;

  finalObj['student'] = interview.student;

  finalObj['interviewer'] = state.interviewers[interviewerId]

  return finalObj;
};

export function getInterviewersForDay(state, day) {
  let finalObj = [];

  if (state.days.length === 0) {
    return finalObj;
  }

  if (state.days.find(obj => obj.name === day)) {
    let foundDay = state.days.find(obj => obj.name === day)
    let interviewerList = foundDay.interviewers

    interviewerList.map((item) => {
      finalObj.push(state.interviewers[item]);
    });

    return finalObj;
  } else {

    return finalObj
  }
};