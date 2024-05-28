import CompetenceResult from './CompetenceResult';
import Marked from './Marked';
import ThemeResult from './ThemeResult';
import { Mark, State } from './usePersistence';

interface ResultProps {
  state: State;
  mark: Mark;
  note: (content: string) => void;
}

export default function Results({ state, mark, note }: ResultProps) {
  return (
    <>
      <h2>Ervaring</h2>
      <h3>Per thema/lijn</h3>
      <div className="result">
        <ThemeResult state={state} />
      </div>
      <h3>Per competentiegebied</h3>
      <div className="result">
        <CompetenceResult state={state} />
      </div>
      <p>
        De score zegt iets over hoe vaak je praktijkervaring hebt opgedaan in
        betreffende thema/lijn en competentiegebied, niet over je niveau van
        competentie.
      </p>
      <hr />
      <h2>Remarkeerde ervaringen</h2>
      <Marked state={state} mark={mark} />
      <hr />
      <h2>Notities</h2>
      <textarea
        value={state.notes}
        onChange={(event) => note((event.target as HTMLTextAreaElement).value)}
        aria-label="Notities"
      />
    </>
  );
}
