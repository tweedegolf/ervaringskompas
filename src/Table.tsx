import ThemeSection from './ThemeSection';
import { Mark, Select, State } from './usePersistence';

interface TableProps {
  state: State;
  mark: Mark;
  select: Select;
}

export default function Table({
  state,
  select,
  mark,
}: TableProps): JSX.Element {
  return (
    <table className="form">
      <thead>
        <tr>
          <th style={{ border: 'none' }}></th>
          {state.levels.map((level, levelIndex) => (
            <th key={level} data-tooltip={level}>
              {levelIndex + 1}
            </th>
          ))}
          <th data-tooltip="markeren">
            <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
              <path d="M451.47 125.404l-70.904-70.902a13.11 13.11 0 00-17.746-.733L164.999 221.372l119.603 119.602 167.6-197.822a13.11 13.11 0 00-.733-17.748zM116.153 267.658l29.002-29.001 122.16 122.16-29.001 29.002zM94.552 363.73l47.69 47.69c18.523-11.008 40.65-15.58 63.161-17.391l-93.46-93.46c-1.811 22.511-6.383 44.638-17.39 63.162zm-35.938 39.898a6.574 6.574 0 00-1.273 7.501l22.375 46.487a6.575 6.575 0 0010.572 1.796l31.411-31.41-43.728-43.73z" />
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
