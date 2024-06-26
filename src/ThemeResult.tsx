import { MAX_LEVEL, State } from './usePersistence';

export default function ThemeResult({ state }: { state: State }) {
  let totalScore = 0;
  let totalMax = 0;

  const results = state.themes.map((theme) => {
    const max = theme.experiences.length * MAX_LEVEL;
    const score = theme.experiences.reduce(
      (acc, exp) => acc + Math.max(exp.level - 1, 0),
      0
    );

    totalScore += score;
    totalMax += max;

    return {
      theme: theme.name,
      color: theme.color,
      percentage: Math.round((score / max) * 100),
    };
  });

  const totalPercentage = Math.round((totalScore / totalMax) * 100);

  return (
    <table className="result">
      <tbody>
        {results.map(({ theme, color, percentage }) => (
          <tr key={theme}>
            <th>{theme}</th>
            <td>{percentage}%</td>
            <td className="progress">
              <div
                className="bar"
                style={{
                  backgroundColor: color,
                  width: `calc(${percentage}% - 0.5rem)`,
                }}
              ></div>
            </td>
          </tr>
        ))}
        <tr>
          <th>Totaal</th>
          <td>{totalPercentage}%</td>
          <td className="progress">
            <div
              className="bar"
              style={{
                width: `calc(${totalPercentage}% - 0.5rem)`,
              }}
            ></div>
          </td>
        </tr>
      </tbody>
    </table>
  );
}
