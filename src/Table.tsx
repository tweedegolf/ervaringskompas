import ThemeSection from './ThemeSection';
import { Mark, Select, State } from './usePersistence';

interface TableProps {
  state: State;
  mark: Mark;
  select: Select;
}

export default function Table({ state, select, mark }: TableProps) {
  return (
    <table className="form">
      <thead>
        <tr>
          <th style={{ border: 'none' }}></th>
          {state.levels.map((level, levelIndex) => (
            <th key={level} data-tooltip={level} role="columnheader">
              {levelIndex + 1}
            </th>
          ))}
          <th data-tooltip="markeren" role="columnheader">
            <svg>
              <use xlinkHref="#icon-marker" />
            </svg>
          </th>
        </tr>
      </thead>
      <tbody>
        {state.themes.map((theme, index) => (
          <ThemeSection
            key={theme.name}
            theme={theme}
            index={index}
            levels={state.levels}
            select={select}
            mark={mark}
          />
        ))}
      </tbody>
    </table>
  );
}
