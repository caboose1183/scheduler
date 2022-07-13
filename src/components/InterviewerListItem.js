import React from 'react';
import classNames from 'classnames';

import "components/InterviewerListItem.scss";

export default function InterviewerListItem(props) {
  const {id, name, avatar, setInterviewer, selected} = props;

  let listClass = classNames ('interviewers__item', {
    'interviewers__item--selected': selected
  })

  return (
    <li className={listClass}
    onClick={() => setInterviewer(id)}
    >
      <img
        className="interviewers__item-image"
        src={avatar}
        alt={name}
      />
      {selected && name}
    </li>
  )
}