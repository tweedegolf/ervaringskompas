import { Mark, Select, Theme } from './usePersistence';
import ExperienceRow from './ExperienceRow';

interface ThemeProps {
  theme: Theme;
  index: number;
  levels: string[];
  select: Select;
  mark: Mark;
}

export default function ThemeSection({
  theme: { name, color, experiences },
  index: themeIndex,
  levels,
  select,
  mark,
}: ThemeProps) {
  return (
    <>
      <tr>
        <td colSpan={7} className="white"></td>
      </tr>
      <tr>
        <th
          style={{
            borderColor: color,
            backgroundColor: color,
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
          last={index === experiences.length - 1}
          selected={experience.level}
          marked={experience.marked}
          onMark={(marked: boolean) => mark(themeIndex, index, marked)}
          onSelect={(level: number) => select(themeIndex, index, level)}
        />
      ))}
    </>
  );
}
