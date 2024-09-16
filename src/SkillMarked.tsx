import { SkillCategory, SkillGroup, State } from './usePersistence';

interface SkillMarkedProps {
  state: State;
  mark: (index: number, marked: boolean) => void;
}

export default function SkillMarked({ state, mark }: SkillMarkedProps) {
  const items = state.skills
    .map((skillCategory: SkillCategory) => skillCategory.groups
    .map((skillGroup: SkillGroup) =>
      skillGroup.items.map((item) => {
        if (!item.marked) {
          return null;
        }

        return (
          <li key={item.name}>
            <input
              type="checkbox"
              name={`check-${item.index}`}
              checked={true}
              onChange={() => mark(item.index, false)}
              aria-label="Verwijderen"
            />
            {item.name}
          </li>
        );
      })
    ))
    .flat()
    .filter((item) => item !== null);

  if (items.length === 0) {
    return <p>Nog geen gemarkeerde ervaringen</p>;
  }

  return <ul>{items}</ul>;
}
