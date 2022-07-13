import React from 'react';

import "components/DayListItem.scss";
import DayListItem from './DayListItem';

export default function DayList (props) {
  const daysListing = props.days.map ((day) => {
    return (
      <DayListItem
      key={day.id}
      name={day.name}
      spots={day.spots}
      selected={props.day === day.name}
      setDay={props.setDay}
      />
    )
  })

  return (
  <ul>
    {daysListing}
  </ul>
  )
}