import Table from './Table';
import usePersistence from './usePersistence';

export default  function App(): JSX.Element {
  const { state, select } = usePersistence();

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
          {state.levels.map((level) => (
            <li key={level}>{level}</li>
          ))}
        </ol>
      </div>
      <Table state={state} select={select} />
    </div>
  );
}
