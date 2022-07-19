import { useState, useEffect } from 'react';
import axios from 'axios';

export default function useVisualMode(initial) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => setState(prev => ({ ...prev, day }));
  const setDays = days => setState(prev => ({ ...prev, days }));



  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    


    

    return axios.put(`/api/appointments/${id}`, { interview })
      .then((response) => {

        //setState({ ...state, appointments })

        const newState = updateSpots({ ...state, appointments })

        setState (newState)

      })
  }




  function cancelInterview(id, interview) {
    const appointments = {
      ...state.appointments,
      [id]: { ...state.appointments[id], interview: null }
    };



    return axios.delete(`/api/appointments/${id}`)
      .then((response) => {
        //setState({ ...state, appointments })

        const newState = updateSpots({ ...state, appointments })

        setState (newState)
      })
  }

  function getSpots(state) {
    const selectedDay = state.days.find((day) => state.day === day.name)

    const appointmentList = selectedDay.appointments

    const spots = appointmentList.filter((appointment) => !state.appointments[appointment].interview).length;

    return spots
  }


  function updateSpots(state) {
    const selectedDay = state.days.find((day) => state.day === day.name)
    const currentDayIndex = state.days.findIndex((day) => state.day === day.name)

    const updatedDayObj = { ...selectedDay }
    updatedDayObj.spots = getSpots(state)

    const updatedDaysArray = [...state.days]
    updatedDaysArray[currentDayIndex] = updatedDayObj

    const updatedState = { ...state }
    updatedState.days = updatedDaysArray

    return updatedState
  }


  useEffect(() => {
    //axios.get("/api/days").then(response => setDays(response.data));
    Promise.all([
      axios.get("/api/days"),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ]).then((all) => {
      setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }))
    })
  }, [])


  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  }
}
