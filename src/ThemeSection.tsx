import { Fragment } from 'react';
import { Theme } from './usePersistence';
import ExperienceRow from './ExperienceRow';

interface ThemeProps {
  theme: Theme;
  index: number,
  levels: string[],
  select: (theme: number, item: number, level: number) => void;
}

export default function ThemeSection({
  theme: { name, color, experiences },
  index: themeIndex,
  levels,
  select,
}: ThemeProps): JSX.Element {
  return (
    <Fragment>
      <tr>
        <th
          style={{
            borderBottomColor: color,
          }}
          colSpan={7}
          className="theme"
        >
          <h3>
            <span style={{ background: color }}>{themeIndex + 1}</span>
            {name}
          </h3>
        </th>
      </tr>
      {experiences.map((experience, index) => (
        <ExperienceRow
          key={experience.name}
          name={experience.name}
          themeIndex={themeIndex}
          index={index}
          levels={levels}
          color={color}
          selected={experience.level}
          onSelect={(level: number) => select(themeIndex, index, level)}
        />
      ))}
    </Fragment>
  );
}