import { Reducer, useEffect, useReducer } from 'react';
import rawData from './data.json';

export interface State {
  levels: string[];
  competences: string[];
  themes: Theme[];
  notes: string;
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
  marked: boolean;
}

export type Select = (theme: number, experience: number, level: number) => void;
export type Mark = (theme: number, experience: number, marked: boolean) => void;

export interface PersistenceState {
  state: State;
  select: Select;
  mark: Mark;
  note: (content: string) => void;
}

export type ExperienceAction =
  | {
      type: 'select';
      theme: number;
      experience: number;
      level: number;
    }
  | {
      type: 'mark';
      theme: number;
      experience: number;
      marked: boolean;
    };

export type Action =
  | ExperienceAction
  | {
      type: 'note';
      content: string;
    };

const data = rawData as State;

export const MAX_LEVEL = data.levels.length;

function updateState(
  state: State,
  action: ExperienceAction,
  object: Record<string, number | boolean>
): State {
  return {
    ...state,
    themes: state.themes.map(
      (theme, themeIndex): Theme => ({
        ...theme,
        experiences: theme.experiences.map(
          (experience, experienceIndex): Experience => {
            if (
              themeIndex === action.theme &&
              experienceIndex === action.experience
            ) {
              return { ...experience, ...object };
            }

            return experience;
          }
        ),
      })
    ),
  };
}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'select':
      return updateState(state, action, { level: action.level });
    case 'mark':
      return updateState(state, action, { marked: action.marked });
    case 'note':
      return { ...state, notes: action.content };
    default:
      throw new Error();
  }
}

function initialState(): State {
  const localState = window.localStorage.getItem('persistence');
  const defaultState = { levels: [], marked: [], notes: '' };
  let { levels, marked, notes } = localState
    ? JSON.parse(localState)
    : defaultState;

  if (!levels || !marked) {
    levels = [];
    marked = [];
    notes = '';
  }

  return {
    ...data,
    notes,
    themes: data.themes.map((theme, themeIndex) => ({
      ...theme,
      experiences: theme.experiences.map((experience, experienceIndex) => ({
        ...experience,
        level: levels[themeIndex]
          ? levels[themeIndex][experienceIndex] || 0
          : 0,
        marked: marked[themeIndex]
          ? marked[themeIndex][experienceIndex] || false
          : false,
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
    window.localStorage.setItem(
      'persistence',
      JSON.stringify({
        levels: state.themes.map((theme) =>
          theme.experiences.map((experience) => experience.level)
        ),
        marked: state.themes.map((theme) =>
          theme.experiences.map((experience) => experience.marked)
        ),
        notes: state.notes,
      })
    );
  }, [state]);

  return {
    state,
    select: (theme: number, experience: number, level: number) =>
      dispatch({ type: 'select', theme, experience, level }),
    mark: (theme: number, experience: number, marked: boolean) =>
      dispatch({ type: 'mark', theme, experience, marked }),
    note: (content: string) => dispatch({ type: 'note', content }),
  };
}
