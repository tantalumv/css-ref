import type { CSSProperty } from '../types';

export const cssVariables: CSSProperty[] = [
  {n:'Custom Properties',c:'CSS Variables',d:'User-defined CSS variables (--my-var: value) reusable anywhere via var(). The foundation of design token systems.',s:{ch:1,ff:1,sf:1,ed:1},i:'wide',x:'--brand: #6366f1;\n--space: clamp(1rem, 2vw, 2rem);\ncolor: var(--brand, black);',m:'Using_CSS_custom_properties',
   demo:`<div style="--brand:#6366f1;--accent:#ec4899;--space:12px;padding:var(--space);display:flex;flex-direction:column;gap:6px"><div style="background:var(--brand);color:#fff;padding:5px 10px;border-radius:4px;font-size:10px;font-weight:700;font-family:monospace">background: var(--brand)</div><div style="background:var(--accent);color:#fff;padding:5px 10px;border-radius:4px;font-size:10px;font-weight:700;font-family:monospace">background: var(--accent)</div></div>`},

  {n:'@property',c:'CSS Variables',d:'Registers a custom property with a type, initial value, and inheritance — enables animation of custom properties.',s:{ch:1,ff:1,sf:1,ed:1},i:'b2024',x:'@property --angle {\n  syntax: "<angle>";\n  inherits: false;\n  initial-value: 0deg;\n}',m:'@property',
   demo:`<style>@property --hue{syntax:"<number>";inherits:false;initial-value:0}@keyframes hue-spin{to{--hue:360}}.prop-demo{animation:hue-spin 3s linear infinite;background:hsl(var(--hue) 80% 60%)}</style><div style="display:flex;align-items:center;gap:12px;padding:10px"><div class="prop-demo" style="width:52px;height:52px;border-radius:50%"></div><p style="font-size:10px;font-weight:700;color:#3b82f6;font-family:monospace">@property --hue<br>animates hue 0→360</p></div>`},

  {n:'env()',c:'CSS Variables',d:'Inserts a user-agent environment variable such as safe-area-inset for notched devices.',s:{ch:1,ff:1,sf:1,ed:1},i:'wide',x:'padding-top: env(safe-area-inset-top)',m:'env',
   demo:`<div style="padding:10px;display:flex;flex-direction:column;gap:6px"><div style="background:#dbeafe;border:2px solid #3b82f6;border-radius:5px;padding:6px"><p style="font-size:10px;font-weight:700;color:#1d4ed8;font-family:monospace">padding-top:</p><p style="font-size:10px;font-weight:700;color:#1d4ed8;font-family:monospace">env(safe-area-inset-top)</p></div><p style="font-size:9px;color:#888;font-weight:700">Respects device notch/island</p></div>`},
];
