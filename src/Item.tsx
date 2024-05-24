interface ItemProps {
  name: string;
  index: number;
  color: string;
  levels: string[];
  selected: number;
  onSelect: (level: number) => void;
}

export default function Item({ name, index, color, levels, selected, onSelect }: ItemProps): JSX.Element {
  return (
    <tr className="selectable">
      <td style={{ borderBottomColor: color, borderLeftColor: color }}>
        <label htmlFor={`check-${index}`} title="markeren">
          <input
            type="checkbox"
            id={`check-${index}`}
            name={`check-${index}`}
          />
        </label>
      </td>
      <th scope="row" style={{ borderBottomColor: color }}>
        {name}
      </th>
      {levels
        .map((level, levelIndex) => ({
          level,
          key: `option-${index}-${levelIndex}`,
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
                name={`option-${index}`}
                id={key}
                value={levelIndex}
                onChange={() => onSelect(levelIndex)}
                checked={levelIndex === selected}
              />
            </label>
          </td>
        ))}
    </tr>
  );
}
