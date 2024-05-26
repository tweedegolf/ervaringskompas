import ThemeSection from './ThemeSection';
import { PersistenceState } from './usePersistence';

export default function Table({ state, select }: PersistenceState): JSX.Element {
  return (
      <table>
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
            />
          ))}
        </tbody>
      </table>
  );
}
