import {useState} from 'react';

export default function useVisualMode (initial) {
  const [mode, setmode] = useState(initial);

  return {
    mode
  }
}