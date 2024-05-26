interface ExperienceRowProps {
  name: string;
  themeIndex: number,
  index: number;
  color: string;
  levels: string[];
  selected: number;
  onSelect: (level: number) => void;
}

export default function ExperienceRow({ name, themeIndex, index, color, levels, selected, onSelect }: ExperienceRowProps): JSX.Element {
  return (
    <tr className="selectable">
      <td style={{ borderBottomColor: color, borderLeftColor: color }}>
        <label htmlFor={`check-${themeIndex}-${index}`} title="markeren">
          <input
            type="checkbox"
            id={`check-${themeIndex}-${index}`}
            name={`check-${themeIndex}-${index}`}
          />
        </label>
      </td>
      <th scope="row" style={{ borderBottomColor: color }}>
        {name}
      </th>
      {levels
        .map((level, levelIndex) => ({
          level,
          key: `option-${themeIndex}-${index}-${levelIndex}`,
        }))
        .map(({ level, key }, levelIndex) => (
          <td
            key={level}
            style={{
              borderBottomColor: color,
              borderRightColor: levelIndex === levels.length - 1 ? color : undefined
            }}>
            <label htmlFor={key} title={level}>
              <input
                type="radio"
                name={`option-${themeIndex}-${index}`}
                id={key}
                value={levelIndex + 1}
                onChange={() => onSelect(levelIndex + 1)}
                checked={levelIndex + 1 === selected}
              />
            </label>
          </td>
        ))}
    </tr>
  );
}
