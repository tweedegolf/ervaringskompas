import Theme from './Theme';

interface TableProps {
  themes: [string, { color: string; items: string[] }][];
  levels: string[];
}

export default function Table({ levels, themes }: TableProps): JSX.Element {
  return (
      <table>
        <thead>
          <tr>
            <th colSpan={2} style={{ border: 'none' }}></th>
            {levels.map((level, levelIndex) => (
              <th key={level}>{levelIndex + 1}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {themes
            .map(([name, { color, items }], index) => ({ name, color, items, index }))
            .map((theme) => (
              <Theme key={theme.name} theme={theme} levels={levels} />
            ))}
        </tbody>
      </table>
  );
}
