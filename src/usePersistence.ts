import { useReducer } from 'preact/hooks';
import rawData from './data.json';
import { decode } from './util';

const SKILLS_PATH = '/vaardigheden';

export interface StorageState {
  levels: number[][];
  marked: boolean[][];
  notes: string;
  skills: number[];
  markedSkills: boolean[];
  skillNotes: string;
}

export interface State {
  skillMode: boolean,
  levels: string[];
  competences: string[];
  themes: Theme[];
  notes: string;
  skillNotes: string;
  skills: SkillCategory[];
}

export interface SkillCategory {
  name: string;
  groups: SkillGroup[];
}

export interface SkillGroup {
  name: string;
  items: Skill[];
}

export interface Skill {
  index: number,
  name: string;
  basic: boolean;
  value: boolean | null;
  marked: boolean;
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
  selectSkill: (index: number, value: boolean | null) => void;
  markSkill: (index: number, marked: boolean) => void;
  noteSkill: (content: string) => void;
  setState: (state: State) => void;
  navigate: (skillMode: boolean) => void;
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

export type SkillAction =
  | {
    type: 'selectSkill';
    index: number;
    value: boolean | null;
  }
  | {
    type: 'markSkill';
    index: number;
    marked: boolean;
  };

export type Action =
  | ExperienceAction
  | SkillAction
  | {
    type: 'navigate';
    skillMode: boolean;
  }
  | {
    type: 'note';
    content: string;
  }
  | {
    type: 'noteSkill';
    content: string;
  }
  | {
    type: 'state';
    state: State;
  };

export const data = rawData as State;

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

function updateSkillState(
  state: State,
  index: number,
  object: Record<string, boolean | null>
): State {
  return {
    ...state,
    skills: state.skills.map((skillCategory: SkillCategory)  => ({
      ...skillCategory,
      groups: skillCategory.groups.map((skillGroup: SkillGroup) => ({
        ...skillGroup,
        items: skillGroup.items.map((skill: Skill) => {
          if (index === skill.index) {
            console.log('set', { ...skill, ...object });

            return { ...skill, ...object };
          }

          return skill;
        })
      })),
    })),
  };
}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'navigate':
      return { ...state, skillMode: action.skillMode };
    case 'select':
      return updateState(state, action as ExperienceAction, { level: action.level });
    case 'mark':
      return updateState(state, action as ExperienceAction, { marked: action.marked });
    case 'selectSkill':
      console.log(action);

      const newState = updateSkillState(state, action.index, { value: action.value });

      console.log(newState.skills[0].groups[0].items[0].value);

      return newState;
    case 'markSkill':
      return updateSkillState(state, action.index, { marked: action.marked });
    case 'note':
      return { ...state, notes: action.content };
    case 'noteSkill':
      return { ...state, skillNotes: action.content };
    case 'state':
      return action.state;
    default:
      throw new Error();
  }
}

function initialState(): State {
  const skillMode = window.location.pathname === SKILLS_PATH;

  const localState =
    (skillMode ? '' : window.location.hash.slice(1)) ||
    window.localStorage.getItem('persistence') ||
    '';

  const skillLocalState =
    (skillMode ? window.location.hash.slice(1) : '') ||
    window.localStorage.getItem('skill-persistence') ||
    '';

  return decode(data, localState, skillLocalState, skillMode);
}

export default function usePersistence(): PersistenceState {
  const [state, dispatch] = useReducer<State, Action>(reducer, initialState());

  return {
    state,
    navigate: (skillMode: boolean) => {
      window.location.pathname = skillMode ? SKILLS_PATH : '/';
      dispatch({ type: 'navigate', skillMode });
    },
    select: (theme: number, experience: number, level: number) =>
      dispatch({ type: 'select', theme, experience, level }),
    mark: (theme: number, experience: number, marked: boolean) =>
      dispatch({ type: 'mark', theme, experience, marked }),
    note: (content: string) => dispatch({ type: 'note', content }),
    selectSkill: (index: number, value: boolean | null) =>
      dispatch({ type: 'selectSkill', index, value }),
    markSkill: (index: number, marked: boolean) =>
      dispatch({ type: 'markSkill', index, marked }),
    noteSkill: (content: string) => dispatch({ type: 'noteSkill', content }),
    setState: (state: State) => dispatch({ type: 'state', state: state }),
  };
}

