import { Fragment } from 'react/jsx-runtime';
import rawData from './data.json';

const data = rawData as unknown as {
  [theme: string]: {
    color: string;
    items: string[];
  };
};

const levels = [
  'nog geen ervaring',
  'meegekeken',
  'een beetje ervaring',
  'zelfstandig uitgevoerd',
  'meermaals zelfstandig uitgevoerd',
];

function App() {
  return (
    <div>
      <h1>Ervaringskompas</h1>
      <p>
        Welke ervaring heb je opgedaan met deze beroepsactiviteit in de praktijk
        (in een huisartsgeneekundige setting)?
      </p>
      <div className="legenda">
        <h2>Legenda</h2>
        <ol>
          {levels.map((level) => (
            <li key={level}>{level}</li>
          ))}
        </ol>
      </div>
      <table>
        <thead>
          <tr>
            <th colSpan={2}></th>
            {levels.map((level, levelIndex) => (
              <th key={level}>{levelIndex + 1}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Object.entries(data).map(([theme, { color, items }], themeIndex) => (
            <Fragment key={theme}>
              <tr key={theme}>
                <td style={{ borderBottomColor: color }}></td>
                <th style={{ borderBottomColor: color }} colSpan={6}>
                  <h3 style={{ borderColor: color }}>
                    <span style={{ background: color }}>{themeIndex + 1}</span>
                    {theme}
                  </h3>
                </th>
              </tr>
              {items.map((item, index) => (
                <tr key={item} className="selectable">
                  <td style={{ borderBottomColor: color }}>
                    <label htmlFor={`check-${index}`} title="markeren">
                      <input
                        type="checkbox"
                        id={`check-${index}`}
                        name={`check-${index}`}
                      />
                    </label>
                  </td>
                  <th scope="row" style={{ borderBottomColor: color }}>
                    {item}
                  </th>
                  {levels
                    .map((level, levelIndex) => ({
                      level,
                      key: `option-${index}-${levelIndex}`,
                    }))
                    .map(({ level, key }, levelIndex) => (
                      <td key={level} style={{ borderBottomColor: color }}>
                        <label htmlFor={key} title={level}>
                          <input
                            type="radio"
                            name={`option-${index}`}
                            id={key}
                            value={levelIndex}
                          />
                        </label>
                      </td>
                    ))}
                </tr>
              ))}
            </Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
