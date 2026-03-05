export function bIcon(val: number, lbl: string): string {
  const browserClass = lbl === 'ch' ? 'chrome' : lbl === 'ff' ? 'firefox' : lbl === 'sf' ? 'safari' : 'edge';
  const name = lbl === 'ch' ? 'Chrome' : lbl === 'ff' ? 'Firefox' : lbl === 'sf' ? 'Safari' : 'Edge';
  const statusClass = val === 1 ? 'y' : val === 0 ? 'n' : 'p';
  return `<div class="browser-icon ${browserClass} ${statusClass}" title="${name}"></div>`;
}
