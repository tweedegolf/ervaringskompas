import { useReducer } from 'preact/hooks';
import rawData from './data.json';
import { decode } from './util';

export interface StorageState {
  levels: number[][];
  marked: boolean[][];
  notes: string;
}

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
  setState: (state: State) => void;
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
    }
  | {
      type: 'state';
      state: State;
    };

const data = rawData as State;

export const MAX_LEVEL = data.levels.length - 1;

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
    case 'state':
      return action.state;
    default:
      throw new Error();
  }
}

function initialState(): State {
  const localState =
    window.location.hash.slice(1) ||
    window.localStorage.getItem('persistence') ||
    '';

  return decode(data, localState);
}

export default function usePersistence(): PersistenceState {
  const [state, dispatch] = useReducer<State, Action>(reducer, initialState());

  return {
    state,
    select: (theme: number, experience: number, level: number) =>
      dispatch({ type: 'select', theme, experience, level }),
    mark: (theme: number, experience: number, marked: boolean) =>
      dispatch({ type: 'mark', theme, experience, marked }),
    note: (content: string) => dispatch({ type: 'note', content }),
    setState: (state: State) => dispatch({ type: 'state', state: state }),
  };
}

export function upload(
  input: HTMLInputElement,
  setState: (state: State) => void
) {
  if (!input.files || !input.files[0]) {
    return;
  }

  const reader = new FileReader();
  reader.addEventListener('load', () => {
    setState(decode(data, reader.result?.toString() || ''));
    window.alert('Het bestand is succesvol geladen.');
  });
  reader.readAsText(input.files[0]);
}
