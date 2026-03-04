import type { CSSProperty } from '../types';

export const spacing: CSSProperty[] = [
  {n:'margin',c:'Spacing',d:'Sets outer spacing on all four sides. Use margin-top/right/bottom/left for individual sides, or margin-inline/margin-block for logical directions.',s:{ch:1,ff:1,sf:1,ed:1},i:'wide',x:'margin: auto | 1rem 2rem | 0 auto',m:'margin',
   demo:`<div style="padding:6px;background:#f7fee7;border:2px dashed #84cc16;border-radius:6px;width:190px"><div style="background:#84cc16;color:#fff;padding:6px;border-radius:3px;margin:10px 16px;font-size:10px;font-weight:700;text-align:center">margin: 10px 16px</div></div>`},

  {n:'padding',c:'Spacing',d:'Sets inner spacing on all four sides. Use padding-top/right/bottom/left for individual sides, or padding-inline/padding-block for logical directions.',s:{ch:1,ff:1,sf:1,ed:1},i:'wide',x:'padding: 1rem | 0.5rem 1rem 1.5rem',m:'padding',
   demo:`<div style="background:#f7fee7;border:3px solid #84cc16;border-radius:6px;padding:16px;width:180px;display:flex;align-items:center;justify-content:center"><div style="background:#84cc16;color:#fff;padding:6px 12px;border-radius:3px;font-size:10px;font-weight:700">content</div></div>`},

  {n:'margin-inline',c:'Spacing',d:'Logical shorthand for margin-inline-start and margin-inline-end — adapts to writing direction (horizontal in LTR, vertical in vertical writing modes).',s:{ch:1,ff:1,sf:1,ed:1},i:'wide',x:'margin-inline: auto | 1rem | 2rem 4rem',m:'margin-inline',
   demo:`<div style="background:#f7fee7;border:2px dashed #84cc16;border-radius:6px;padding:8px;width:190px"><div style="background:#84cc16;color:#fff;padding:6px;border-radius:3px;margin-inline:auto;width:fit-content;font-size:10px;font-weight:700">margin-inline: auto</div></div>`},

  {n:'padding-block',c:'Spacing',d:'Logical shorthand for padding-block-start and padding-block-end — adapts to writing direction (vertical in LTR, horizontal in vertical writing modes).',s:{ch:1,ff:1,sf:1,ed:1},i:'wide',x:'padding-block: 1rem | 0.5rem 2rem',m:'padding-block',
   demo:`<div style="background:#f7fee7;border:3px solid #84cc16;border-radius:6px;padding-block:20px;padding-inline:10px;width:170px;display:flex;align-items:center;justify-content:center;flex-direction:column;gap:2px"><div style="background:#84cc16;color:#fff;padding:5px 12px;border-radius:3px;font-size:10px;font-weight:700">content</div><p style="font-size:8px;color:#84cc16;font-weight:700">padding-block: 20px</p></div>`},

  {n:'margin-block',c:'Spacing',d:'Logical shorthand for margin-block-start and margin-block-end — adapts to writing direction (vertical in LTR, horizontal in vertical writing modes).',s:{ch:1,ff:1,sf:1,ed:1},i:'wide',x:'margin-block: auto | 1rem | 2rem 1rem',m:'margin-block',
   demo:`<div style="background:#f7fee7;border:2px dashed #84cc16;border-radius:6px;padding:8px;width:190px"><div style="background:#84cc16;color:#fff;padding:6px;border-radius:3px;margin-block:12px;font-size:10px;font-weight:700;text-align:center">margin-block: 12px</div></div>`},

  {n:'padding-inline',c:'Spacing',d:'Logical shorthand for padding-inline-start and padding-inline-end — adapts to writing direction (horizontal in LTR, vertical in vertical writing modes).',s:{ch:1,ff:1,sf:1,ed:1},i:'wide',x:'padding-inline: 1rem | 0.5rem 2rem',m:'padding-inline',
   demo:`<div style="background:#f7fee7;border:3px solid #84cc16;border-radius:6px;padding-inline:24px;padding-block:10px;width:fit-content;display:flex;align-items:center;justify-content:center"><div style="background:#84cc16;color:#fff;padding:5px 12px;border-radius:3px;font-size:10px;font-weight:700">content</div></div>`},
];
