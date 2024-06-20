import { State } from './usePersistence';

const ENCODE_VERSION = 'e1';

export function encode(state: State): string {
  const data = state.themes.reduce((acc, theme) => {
    const exps = theme.experiences.reduce((acc, exp) => {
      return `${acc}${exp.level}${exp.marked ? 'm' : ''}`;
    }, '');

    return `${acc}s${exps}`;
  }, ENCODE_VERSION);

  return `${data}n${base64URLencode(state.notes)}`;
}

export function decode(data: State, input: string): State {
  const populated = {
    ...data,
    notes: '',
    themes: data.themes.map((theme) => ({
      ...theme,
      experiences: theme.experiences.map((experience) => ({
        ...experience,
        level: 0,
        marked: false,
      })),
    })),
  };

  if (input.slice(0, 2) !== ENCODE_VERSION) {
    return populated;
  }

  let pos = 2;

  for (const theme of populated.themes) {
    if (input[pos] !== 's') {
      break;
    }
    pos += 1;

    for (const experience of theme.experiences) {
      experience.level = parseInt(input[pos], 10);
      pos += 1;

      if (input[pos] === 'm') {
        experience.marked = true;
        pos += 1;
      }
    }
  }

  if (input[pos] !== 'n') {
    return populated;
  }
  pos += 1;

  populated.notes = base64URLdecode(input.slice(pos));

  return populated;
}

export function base64URLencode(str: string): string {
  return btoa(str).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

export function base64URLdecode(str: string): string {
  const base64Encoded = str.replace(/-/g, '+').replace(/_/g, '/');
  const padding = str.length % 4 === 0 ? '' : '='.repeat(4 - (str.length % 4));
  const base64WithPadding = base64Encoded + padding;

  return atob(base64WithPadding);
}

export function saveStateLocal(state: State) {
  window.localStorage.setItem('persistence', encode(state));

  window.alert('De huidige staat is opgeslagen in de browser.');
}

export async function copyLink(state: State) {
  window.location.hash = `#${encode(state)}`;
  await navigator.clipboard.writeText(window.location.href);

  window.alert(
    'Er is een link naar de huidige staat gekopieerd naar het klembord.'
  );
}

export function downloadFile(state: State) {
  const link = document.createElement('a');
  link.setAttribute('download', 'ervaringskompas.txt');
  const blob = new Blob([encode(state)], { type: 'text/plain' });
  link.href = window.URL.createObjectURL(blob);
  document.body.appendChild(link);
  link.click();
  link.remove();
}

export function hexToRgbA(color: string, opacity: number){
  const c = color.substring(1).split('');
  const n = parseInt('0x' + c.join(''), 16);

  return `rgba(${[(n>>16)&255, (n>>8)&255, n&255].join(',')},${opacity})`;
}
