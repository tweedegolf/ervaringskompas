import Results from './Results';
import Table from './Table';
import usePersistence from './usePersistence';
import { copyLink, saveStateLocal } from './util';
import voha from './voha.jpg';

export default function App() {
  const { state, select, mark, note } = usePersistence();

  return (
    <>
      <header>
        <div>
          <h1>Ervaringskompas</h1>
          <p>
            Als huisarts in opleiding is het de bedoeling om uiteindelijk op
            alle huisartgeneeskundige thema’s ervaring en bekwaamheid op te
            bouwen. Dit ervaringskompas is bedoeld als reflectie instrument om
            zelf in kaart te brengen welke ervaring je -in de breedte en diepte
            van het vak- hebt kunnen opdoen. Op basis daarvan kun je je
            leerproces in de praktijk verder vorm en richting te geven.
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
      <div className="save-section">
        <hr />
        <h2>Opslaan</h2>
        <p>
          Om je ingevulde gegevens te bewaren heb je drie opties.
          Als je op een persoonlijk apparaat werkt kun je de huidige toestand opslaan in je browser.
          Je kunt ook een link kopiëren en deze ergens veilige bewaren,
          of een bestand downloaden en deze op een veilige plek opslaan.
        </p>
        <p className="save">
          <button onClick={() => saveStateLocal(state)}>
            <svg>
              <use xlinkHref="#icon-floppy-disk" />
            </svg>
            Opslaan in de browser
          </button>
          <button onClick={() => copyLink(state)}>
            <svg>
              <use xlinkHref="#icon-link" />
            </svg>
            Unieke link kopiëren
          </button>
          <button onClick={() => window.print()}>
            <svg>
              <use xlinkHref="#icon-printer" />
            </svg>
            Printen
          </button>
        </p>
      </div>
    </>
  );
}
