import { MAX_LEVEL, State } from './usePersistence';

export default function CompetenceResult({ state }: { state: State }) {
  const results = state.competences.map((competence, index) => {
    const [score, max] = state.themes.reduce(
      (acc, theme) => {
        const [score, max] = theme.experiences.reduce(
          (acc, exp) => {
            return [
              acc[0] + exp.competences[index] * Math.max(exp.level - 1, 0),
              acc[1] + exp.competences[index] * MAX_LEVEL,
            ];
          },
          [0, 0]
        );
        return [acc[0] + score, acc[1] + max];
      },
      [0, 0]
    );

    return {
      competence,
      percentage: Math.round((score / max) * 100),
    };
  });

  return (
    <table className="result">
      <tbody>
        {results.map(({ competence, percentage }) => (
          <tr key={competence}>
            <th>{competence}</th>
            <td>{percentage}%</td>
            <td className="progress">
              <div
                className="bar"
                style={{
                  width: `calc(${percentage}% - 0.5rem)`,
                }}
              ></div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
