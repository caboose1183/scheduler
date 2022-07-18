import { useState } from 'react';

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(mode, replace = false) {
    if (replace === false) {
      setHistory([...history, mode])

      // setHistory(history.concat(mode))
      // console.log ('from transition', history)

      // history.push(mode);
      setMode(mode);
    }

    if (replace === true) {
      setMode(mode);
    }
  };

  function back() {
    if (history.length > 1) {

      let newList = [...history]
      // console.log('history', history)
      // console.log('before', newList)
      newList.pop()
      // console.log('after', newList)

      setHistory(newList)

      // history.pop();
      // setMode(history[history.length - 1]);
      setMode(history.at(-2));

      // console.log('history', history)
    }
  };


  return {
    mode,
    transition,
    back
  }
}

