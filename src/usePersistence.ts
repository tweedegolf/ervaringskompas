import { createContext, useEffect, useReducer } from 'react';

type Action = { type: 'select'; theme: number; item: number; level: number };

type State = { [key: string]: number };

function reducer(state: State, action: Action) {
  switch (action.type) {
    case 'select':
      return { ...state, [`${action.theme}-${action.item}`]: action.level };
    default:
      throw new Error();
  }
}

interface PersistenceState {
  getLevel: (theme: number, item: number) => number;
  select: (theme: number, item: number, level: number) => void;
}

function initialState(): State {
  const localState = window.localStorage.getItem('persistence');

  return localState ? JSON.parse(localState) : {};
}

export const PersistenceContext = createContext<PersistenceState>({
  getLevel: () => 0,
  select: () => {},
});

export default function usePersistence(): PersistenceState {
  const [state, dispatch] = useReducer(reducer, [], initialState);

  useEffect(() => {
    window.localStorage.setItem('persistence', JSON.stringify(state));
  }, [state]);

  return {
    getLevel: (theme: number, item: number) => state[`${theme}-${item}`],
    select: (theme: number, item: number, level: number) =>
      dispatch({ type: 'select', theme, item, level }),
  };
}
