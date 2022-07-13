import React from 'react';

import InterviewerListItem from './InterviewerListItem';
import 'components/InterviewerList.scss';

export default function InterviewerList(props) {
  const interviewerListing = props.interviewers.map((interviewerPerson) => {
    return (
      <InterviewerListItem
        key={interviewerPerson.id}
        //id={interviewerPerson.id}
        name={interviewerPerson.name}
        avatar={interviewerPerson.avatar}
        setInterviewer={() => props.onChange(interviewerPerson.id)}
        selected={interviewerPerson.id === props.value}
      />
    )
  })

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {interviewerListing}
      </ul>
    </section>
  )
}