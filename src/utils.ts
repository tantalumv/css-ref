export function bIcon(val: number, lbl: string): string {
  const browserClass = lbl === 'ch' ? 'chrome' : lbl === 'ff' ? 'firefox' : lbl === 'sf' ? 'safari' : 'edge';
  const supportedClass = val === 0 ? 'unsupported' : '';
  return `<div class="browser-icon ${browserClass} ${supportedClass}"></div>`;
}
