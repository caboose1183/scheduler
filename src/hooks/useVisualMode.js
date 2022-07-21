import { useState } from 'react';

//modes used for transitioning the different cards (confirm/error/form/etc)

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(mode, replace = false) {
    if (replace === false) {
      setHistory([...history, mode])

      setMode(mode);
    }

    if (replace === true) {
      setMode(mode);
    }
  };

  function back() {
    if (history.length > 1) {
      let newList = [...history]
      newList.pop()

      setHistory(newList)

      setMode(history[history.length - 2])
      //setMode(history.at(-2));
    }
  };


  return {
    mode,
    transition,
    back
  }
};