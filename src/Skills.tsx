import SkillMarked from './SkillMarked';
import SkillTable from './SkillTable';
import { State } from './usePersistence';
import { copyLink, saveStateLocal } from './util';
import voha from './voha.jpg';

interface SkillsProps {
  state: State;
  navigate: (skillMode: boolean) => void;
  selectSkill: (index: number, value: boolean|null) => void;
  markSkill: (index: number, marked: boolean) => void;
  noteSkill: (content: string) => void;
}

export default function Skills({ state, selectSkill, markSkill, navigate, noteSkill }: SkillsProps) {
  return (
    <>
      <header>
        <div>
          <h1>Vaardighedenkompas</h1>
          <p>
            Overzicht vaardigheden per ICPC-categorie
          </p>
        </div>
        <div>
          <img src={voha} alt="Vervolgopleiding tot huisarts" />
        </div>
      </header>

      <div className="legenda">
        <h2>Legenda</h2>
        <p>
          <code>O</code> = Onvoldoende ervaring<br />
          <code>V</code> = Voldoende ervaring
        </p>
        <p>
          <code>B</code> = Basisvaardigheid<br />
          <code>F</code> = Facultatieve vaardigheid
        </p>
        <p>
          <code>*</code> = Ten tijde van de inventarisatie om het huidige overzicht in te delen,
          ontbrak het onderdeel 'palliatieve en terminale zorg' in dit overzicht en is dus
          niet meegenomen in de indeling. In 2024 vindt een herijking van deze lijst plaats,
          dan zal het onderdeel 'palliatieve en terminale zorg' meegenomen worden. 
        </p>
      </div>

      <p className="actions">
        <button onClick={() => navigate(false)}>
        Ervaringskompas
        </button>
      </p>

      <SkillTable state={state} select={selectSkill} mark={markSkill} />

      <h2>Gemarkeerde ervaringen</h2>

      <SkillMarked state={state} mark={markSkill} />

      <hr />

      <h2>Notities</h2>
      <textarea
        value={state.skillNotes}
        onChange={(event) => noteSkill((event.target as HTMLTextAreaElement).value)}
        aria-label="Notities"
        rows={state.skillNotes.split(/\r\n|\r|\n/).length}
      />
      <div className="print-notes">
        {state.skillNotes.split('\n').map((item, key) => (
          <p key={key}>
            {item}
          </p>
        ))}
      </div>

      <div className="save-section">
        <hr />
        <h2>Opslaan</h2>
        <p>
          Om je ingevulde gegevens te bewaren heb je drie opties.
          Als je op een persoonlijk apparaat werkt kun je de huidige toestand opslaan in je browser.
          Je kunt ook een link kopiëren en deze ergens veilige bewaren,
          of een bestand downloaden en deze op een veilige plek opslaan.
        </p>
        <p className="actions">
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
