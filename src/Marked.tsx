import { Mark, State } from './usePersistence';

interface MarkedProps {
  state: State;
  mark: Mark;
}

export default function Marked({ state, mark }: MarkedProps) {
  const items = state.themes
    .map((theme, themeIndex) =>
      theme.experiences.map((experience, index) => {
        if (!experience.marked) {
          return null;
        }

        return (
          <li key={experience.name}>
            <input
              type="checkbox"
              name={`check-${index}`}
              checked={true}
              onChange={() => mark(themeIndex, index, false)}
              aria-label="Verwijderen"
            />
            {experience.name}
          </li>
        );
      })
    )
    .flat()
    .filter((item) => item !== null);

  if (items.length === 0) {
    return <p>Nog geen gemarkeerde ervaringen</p>;
  }

  return <ul>{items}</ul>;
}
