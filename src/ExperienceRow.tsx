interface ExperienceRowProps {
  name: string;
  themeIndex: number;
  index: number;
  color: string;
  levels: string[];
  selected: number;
  marked: boolean;
  onMark: (marked: boolean) => void;
  onSelect: (level: number) => void;
}

export default function ExperienceRow({
  name,
  themeIndex,
  index,
  color,
  levels,
  marked,
  selected,
  onMark,
  onSelect,
}: ExperienceRowProps) {
  return (
    <tr className={`selectable ${marked ? 'marked' : ''}`}>
      <th
        scope="row"
        style={{
          borderBottomColor: color,
          borderLeftColor: color,
        }}
      >
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
            }}
          >
            <label htmlFor={key} data-tooltip={level}>
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
      <td
        style={{
          borderBottomColor: color,
          borderRightColor: color,
        }}
      >
        <label htmlFor={`check-${themeIndex}-${index}`} data-tooltip="markeren">
          <input
            type="checkbox"
            id={`check-${themeIndex}-${index}`}
            name={`check-${themeIndex}-${index}`}
            checked={marked}
            onChange={(e) => onMark((e.target as HTMLInputElement).checked)}
          />
        </label>
      </td>
    </tr>
  );
}
