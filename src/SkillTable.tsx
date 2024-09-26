import { Fragment } from 'preact/jsx-runtime';
import { State } from './usePersistence';

interface SkillTableProps {
  state: State;
  select: (index: number, value: boolean|null) => void;
  mark: (index: number, marked: boolean) => void;
}

export default function SkillTable({ state, select, mark }: SkillTableProps) {
  return (
    <table className="form skills">
      <thead>
        <tr>
          <th colSpan={3} style={{ border: 'none' }}></th>
          <th>
            <label data-tooltip="onvoldoende ervaring">O</label>
          </th>
          <th>
            <label data-tooltip="voldoende ervaring">V</label>
          </th>
          <th data-tooltip="markeren" role="columnheader">
            <svg>
              <use xlinkHref="#icon-marker" />
            </svg>
          </th>
        </tr>
      </thead>
      <tbody>
        {state.skills.map((category) => (
          <Fragment key={category.name}>
            <tr>
              <td colSpan={6} className="white"></td>
            </tr>
            <tr>
              <th
                colSpan={6}
                className={`theme ${category.name.toLowerCase()}`}
              >
                <h3>Lijst vaardigheden: {category.name}</h3>
              </th>
            </tr>
            {category.groups.map((group) => (
              <Fragment key={group.name}>
                <tr>
                  <th className="skillGroup"
                  colSpan={6}>{group.name}</th>
                </tr>
                {group.items.map((item, index) => (
                    <tr className={`selectable ${item.basic ? 'basic' : ''}`} key={item.name}>
                      <th scope="row">{index + 1}</th>
                      <td className="skill-grade">
                        <label data-tooltip={item.basic === null ? '*' : (item.basic ? 'Basisvaardigheid' : 'Facultatieve vaardigheid')}>
                          {item.basic === null ? '*' : (item.basic ? 'B' : 'F')}
                        </label>
                      </td>
                      <td className="skill-name">{item.name}</td>
                      <td>
                        <label data-tooltip="onvoldoende ervaring">
                          <input
                            type="radio"
                            name={`skill-option-${item.index}`}
                            id={`skill-option-${item.index}-0`}
                            checked={item.value === false}
                            onChange={() => select(item.index, false)}
                            aria-label={"onvoldoende ervaring"}
                          />
                        </label>
                      </td>
                      <td>
                        <label data-tooltip="voldoende ervaring">
                          <input
                            type="radio"
                            name={`skill-option-${item.index}`}
                            id={`skill-option-${item.index}-1`}
                            checked={item.value === true}
                            onChange={() => select(item.index, true)}
                            aria-label={"voldoende ervaring"}
                          />
                        </label>
                      </td>
                      <td data-tooltip="markeren" role="columnheader">
                        <label htmlFor={`check-${item.index}`} data-tooltip="markeren">
                          <input
                            type="checkbox"
                            id={`check-${item.index}`}
                            name={`check-${item.index}`}
                            onChange={(e) => mark(item.index, (e.target as HTMLInputElement).checked)}
                            checked={item.marked}
                            aria-label="markeren"
                          />
                        </label>
                      </td>
                    </tr>
                  )
                )}
              </Fragment>
            ))}
          </Fragment>
        ))}
      </tbody>
    </table>
  );
}
