import { Fragment, useContext } from 'react';
import Item from './Item';
import { PersistenceContext } from './usePersistence';

interface ThemeProps {
  theme: {
    name: string;
    color: string;
    items: string[];
    index: number;
  };
  levels: string[];
}

export default function Theme({
  theme: { name, color, items, index: themeIndex },
  levels,
}: ThemeProps): JSX.Element {
  const { getLevel, select } = useContext(PersistenceContext);

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
      {items.map((item, index) => (
        <Item
          key={item}
          name={item}
          index={index}
          levels={levels}
          color={color}
          selected={getLevel(themeIndex, index)}
          onSelect={(level: number) => select(themeIndex, index, level)}
        />
      ))}
    </Fragment>
  );
}
