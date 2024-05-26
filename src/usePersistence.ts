import { Reducer, useEffect, useReducer } from 'react';
import rawData from './data.json';

export interface State {
  levels: string[];
  competences: string[];
  themes: Theme[];
}

export interface Theme {
  name: string;
  color: string;
  experiences: Experience[];
}

export interface Experience {
  name: string;
  competences: number[];
  level: number;
}

export interface PersistenceState {
  state: State;
  select: (theme: number, item: number, level: number) => void;
}

export interface Action {
  type: 'select';
  theme: number;
  experience: number;
  level: number;
}

const data = rawData as State;

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'select':
      return {
        ...state,
        themes: state.themes.map(
          (theme, themeIndex): Theme => ({
            ...theme,
            experiences: theme.experiences.map(
              (experience, experienceIndex): Experience => ({
                ...experience,
                level:
                  themeIndex === action.theme &&
                  experienceIndex === action.experience
                    ? action.level
                    : experience.level,
              })
            ),
          })
        ),
      };
    default:
      throw new Error();
  }
}

function initialState(): State {
  const localState = window.localStorage.getItem('persistence');
  const levels = localState ? JSON.parse(localState) : [];

  return {
    ...data,
    themes: data.themes.map((theme, themeIndex) => ({
      ...theme,
      experiences: theme.experiences.map((experience, experienceIndex) => ({
        ...experience,
        level: levels[themeIndex]
          ? levels[themeIndex][experienceIndex] || 0
          : 0,
      })),
    })),
  };
}

export default function usePersistence(): PersistenceState {
  const [state, dispatch] = useReducer<Reducer<State, Action>>(
    reducer,
    initialState()
  );

  useEffect(() => {
    window.localStorage.setItem('persistence', JSON.stringify(
      state.themes.map((theme) => theme.experiences.map((experience) => experience.level))
    ));
  }, [state]);

  return {
    state,
    select: (theme: number, experience: number, level: number) =>
      dispatch({ type: 'select', theme, experience, level }),
  };
}
