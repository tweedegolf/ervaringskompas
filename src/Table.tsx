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
          <th colSpan={2} style={{ border: 'none' }}></th>
          {state.levels.map((level, levelIndex) => (
            <th key={level}>{levelIndex + 1}</th>
          ))}
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
