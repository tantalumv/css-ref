import type { CSSProperty } from '../types';

export const interactivity: CSSProperty[] = [
  {n:'cursor',c:'Interactivity',d:'Sets the mouse cursor icon when hovering over an element.',s:{ch:1,ff:1,sf:1,ed:1},i:'wide',x:'cursor: auto | pointer | text | grab | grabbing | not-allowed',m:'cursor',
   demo:`<div style="display:flex;flex-wrap:wrap;gap:5px;padding:8px">${[['pointer','🖱️'],['text','I'],['grab','✋'],['not-allowed','🚫']].map(([c,i])=>`<div style="cursor:${c};background:#fee2e2;border:2px solid #ef4444;border-radius:4px;padding:4px 8px;font-size:10px;font-weight:700;color:#b91c1c">${i} ${c}</div>`).join('')}</div>`},

  {n:'pointer-events',c:'Interactivity',d:'Controls whether an element can be the target of mouse and touch events.',s:{ch:1,ff:1,sf:1,ed:1},i:'wide',x:'pointer-events: auto | none',m:'pointer-events',
   demo:`<div style="display:flex;gap:10px;padding:10px"><div style="pointer-events:auto;background:#dcfce7;border:2px solid #ef4444;border-radius:5px;padding:8px;font-size:10px;font-weight:700;color:#15803d;cursor:pointer">auto ✓</div><div style="pointer-events:none;background:#fee2e2;border:2px dashed #ef4444;border-radius:5px;padding:8px;font-size:10px;font-weight:700;color:#b91c1c;cursor:not-allowed">none ✗</div></div>`},

  {n:'user-select',c:'Interactivity',d:'Controls whether and how the user can select text inside an element.',s:{ch:1,ff:1,sf:1,ed:1},i:'wide',x:'user-select: auto | text | none | all | contain',m:'user-select',
   demo:`<div style="display:flex;flex-direction:column;gap:6px;padding:10px"><p style="user-select:text;font-size:11px;font-weight:700;color:#111;background:#dcfce7;padding:4px 8px;border-radius:3px">user-select: text — select me!</p><p style="user-select:none;font-size:11px;font-weight:700;color:#888;background:#fee2e2;padding:4px 8px;border-radius:3px">user-select: none — can't select</p></div>`},

  {n:'scroll-snap-type',c:'Interactivity',d:'Enables scroll snapping on a container — mandatory or proximity snapping along an axis.',s:{ch:1,ff:1,sf:1,ed:1},i:'wide',x:'scroll-snap-type: x mandatory | y proximity | both mandatory',m:'scroll-snap-type',
   demo:`<div style="display:flex;gap:0;overflow-x:scroll;scroll-snap-type:x mandatory;width:180px;border-radius:6px;scroll-behavior:smooth">${['#6366f1','#ec4899','#f97316','#10b981'].map((c,i)=>`<div style="flex-shrink:0;width:180px;height:68px;background:${c};scroll-snap-align:start;display:flex;align-items:center;justify-content:center;color:#fff;font-size:11px;font-weight:700">Slide ${i+1}</div>`).join('')}</div>`},

  {n:'overscroll-behavior',c:'Interactivity',d:'Controls scroll chaining — prevents overflow scroll propagating to parent elements.',s:{ch:1,ff:1,sf:1,ed:1},i:'b2022',x:'overscroll-behavior: auto | contain | none',m:'overscroll-behavior',
   demo:`<div style="padding:10px;display:flex;gap:10px"><div style="overscroll-behavior:contain;height:60px;overflow-y:scroll;width:140px;background:#fff0f0;border:2px solid #ef4444;border-radius:5px;padding:6px"><p style="font-size:9px;line-height:1.8;font-weight:700;color:#b91c1c">overscroll-behavior: contain — scroll doesn't chain to parent. Extra content here to enable scroll. More text.</p></div></div>`},

  {n:'touch-action',c:'Interactivity',d:'Specifies which touch gestures are handled by the browser on a region.',s:{ch:1,ff:1,sf:1,ed:1},i:'wide',x:'touch-action: auto | none | pan-x | pan-y | manipulation',m:'touch-action',
   demo:`<div style="display:flex;gap:8px;padding:10px"><div style="touch-action:pan-x;background:#fee2e2;border:2px solid #ef4444;border-radius:5px;padding:8px;font-size:10px;font-weight:700;color:#b91c1c">pan-x only →</div><div style="touch-action:manipulation;background:#fef3c7;border:2px solid #f59e0b;border-radius:5px;padding:8px;font-size:10px;font-weight:700;color:#b45309">manipulation</div></div>`},

  {n:'scroll-behavior',c:'Interactivity',d:'Controls scrolling behavior — smooth enables animated scrolling, auto jumps instantly.',s:{ch:1,ff:1,sf:1,ed:1},i:'wide',x:'scroll-behavior: auto | smooth',m:'scroll-behavior',
   demo:`<div style="padding:10px;display:flex;flex-direction:column;gap:6px"><div style="scroll-behavior:smooth;overflow-y:scroll;height:60px;background:#fee2e2;border:2px solid #ef4444;border-radius:5px;padding:6px"><p style="font-size:9px;font-weight:700;color:#b91c1c">scroll-behavior: smooth — animated scrolling</p><p style="font-size:9px;font-weight:700;color:#ef4444;margin-top:40px">target element ↓</p></div></div>`},
];
