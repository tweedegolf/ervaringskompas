interface ExperienceRowProps {
  name: string;
  themeIndex: number;
  index: number;
  color: string;
  levels: string[];
  selected: number;
  marked: boolean;
  last: boolean;
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
  last,
  selected,
  onMark,
  onSelect,
}: ExperienceRowProps) {
  const border = `1px solid ${color}`;
  const style = { borderBottom: last ? border : undefined };

  return (
    <tr className={`selectable ${marked ? 'marked' : ''}`}>
      <th
        scope="row"
        style={{
          ...style,
          borderLeft: border,
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
          <td key={level} style={style}>
            <label htmlFor={key} data-tooltip={level}>
              <input
                type="radio"
                name={`option-${themeIndex}-${index}`}
                id={key}
                value={levelIndex + 1}
                onChange={() => onSelect(levelIndex + 1)}
                checked={levelIndex + 1 === selected}
                aria-label={level}
              />
            </label>
          </td>
        ))}
      <td
        style={{
          ...style,
          borderRight: border,
        }}
      >
        <label htmlFor={`check-${themeIndex}-${index}`} data-tooltip="markeren">
          <input
            type="checkbox"
            id={`check-${themeIndex}-${index}`}
            name={`check-${themeIndex}-${index}`}
            checked={marked}
            onChange={(e) => onMark((e.target as HTMLInputElement).checked)}
            aria-label="markeren"
          />
        </label>
      </td>
    </tr>
  );
}
