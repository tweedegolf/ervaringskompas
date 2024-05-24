import rawData from './data.json';
import Table from './Table';
import usePersistence, { PersistenceContext } from './usePersistence';

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

export default  function App(): JSX.Element {
  const persistence = usePersistence();

  return (
    <PersistenceContext.Provider value={persistence}>
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
      <Table levels={levels} themes={Object.entries(data)} />
    </PersistenceContext.Provider>
  );
}
