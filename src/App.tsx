import Results from './Results';
import Table from './Table';
import usePersistence, { upload } from './usePersistence';
import { copyLink, downloadFile, saveStateLocal } from './util';
import voha from './voha.jpg';

export default function App() {
  const { state, select, mark, note, setState } = usePersistence();

  return (
    <>
      <header>
        <div>
          <h1>Ervaringskompas</h1>
          <p>
            Als huisarts in opleiding is het de bedoeling om uiteindelijk op alle
            huisartgeneeskundige thema’s ervaring en bekwaamheid op te bouwen.
            Dit ervaringskompas is bedoeld als reflectie instrument om zelf in
            kaart te brengen welke ervaring je -in de breedte en diepte van het
            vak- hebt kunnen opdoen. Op basis daarvan kun je je leerproces in de
            praktijk verder vorm en richting te geven.
          </p>
        </div>
        <div>
          <img src={voha} alt="Vervolgopleiding tot huisarts" />
        </div>
      </header>

      <div className="legenda">
        <h2>Legenda</h2>
        <ol>
          {state.levels.map((level) => (
            <li key={level}>{level}</li>
          ))}
        </ol>
        <p>
          <strong>Markeren</strong> kan door het vakje rechts te selecteren.
          <br />
          Dit mag je gebruiken als je hier bijvoorbeeld extra aandacht aan wilt
          besteden of een vraag over hebt.
          <br />
          Onder aan de pagina verschijnt een lijst van gemarkeerde items.
        </p>
      </div>

      <Table state={state} select={select} mark={mark} />
      <hr />
      <Results state={state} mark={mark} note={note} />
      <hr />
      <h2>Opslaan</h2>
      <p className="save">
        <button onClick={() => saveStateLocal(state)}>
          Opslaan in de browser
        </button>
        <button onClick={() => copyLink(state)}>Unieke link kopiëren</button>
        <button onClick={() => downloadFile(state)}>Bestand downloaden</button>
        <label htmlFor="upload">
          <span>Bestand laden</span>
          <input
            type="file"
            id="upload"
            onChange={(e) => upload(e.target as HTMLInputElement, setState)}
          />
        </label>
      </p>
    </>
  );
}
