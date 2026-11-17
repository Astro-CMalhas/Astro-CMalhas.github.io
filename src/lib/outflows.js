// Column names in JohnDataTransfer.csv follow "<ion>_<measure>", and each
// has a matching "<ion>_<measure>_err" column with its uncertainty.
export const IONS = [
  { key: 'O_I_1302', label: 'O I 1302' },
  { key: 'Si_II_1190', label: 'Si II 1190' },
  { key: 'Si_III_1206', label: 'Si III 1206' },
  { key: 'Si_IV_1402', label: 'Si IV 1402' },
  { key: 'C_IV', label: 'C IV' },
];

export const MEASURES = [
  { key: 'V_90', label: 'V_90', unit: 'km/s', isVelocity: true },
  { key: 'V_cen', label: 'V_cen', unit: 'km/s', isVelocity: true },
  { key: 'W', label: 'Equivalent width W', unit: 'Å', isVelocity: false },
];

const DATA_URL = `${import.meta.env.BASE_URL}data/JohnDataTransfer.csv`;

function toNumber(text) {
  const t = (text ?? '').trim();
  if (t === '') return null;
  const n = Number(t);
  return Number.isFinite(n) ? n : null;
}

export function parseCsv(text) {
  const lines = text.split(/\r?\n/).filter((line) => line.trim() !== '');
  const header = lines[0].split(',').map((h) => h.trim());
  return lines.slice(1).map((line, i) => {
    const cells = line.split(',');
    const row = { id: i, name: cells[0].trim() };
    header.forEach((col, j) => {
      if (j > 0) row[col] = toNumber(cells[j]);
    });
    return row;
  });
}

export async function loadOutflowData() {
  const res = await fetch(DATA_URL);
  if (!res.ok) throw new Error(`the data file did not load (HTTP ${res.status})`);
  const rows = parseCsv(await res.text());
  return rows.map((row) => ({
    ...row,
    logMstar: row['M*'],
    logSfr: row.SFR > 0 ? Math.log10(row.SFR) : null,
  }));
}

export function getValue(row, ion, measure) {
  return row[`${ion}_${measure}`] ?? null;
}

export function getError(row, ion, measure) {
  return row[`${ion}_${measure}_err`] ?? null;
}

export function median(values) {
  const v = values.filter((x) => x !== null && Number.isFinite(x)).sort((a, b) => a - b);
  if (v.length === 0) return null;
  const mid = Math.floor(v.length / 2);
  return v.length % 2 ? v[mid] : (v[mid - 1] + v[mid]) / 2;
}

// Slider limits: the data range, rounded outward to 0.1 in log units.
export function dataBounds(rows) {
  const round = (lo, hi) => [Math.floor(lo * 10) / 10, Math.ceil(hi * 10) / 10];
  const masses = rows.map((r) => r.logMstar).filter((x) => x !== null);
  const sfrs = rows.map((r) => r.logSfr).filter((x) => x !== null);
  return {
    mass: round(Math.min(...masses), Math.max(...masses)),
    sfr: round(Math.min(...sfrs), Math.max(...sfrs)),
  };
}

export function fmtNum(x, digits = 0) {
  if (x === null || x === undefined || Number.isNaN(x)) return '–';
  return x.toLocaleString('en-US', {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });
}
