import type { CSSProperty } from '../types';

export const animation: CSSProperty[] = [
  {n:'transition',c:'Animation',d:'Shorthand to animate changes between property values when an element changes state.',s:{ch:1,ff:1,sf:1,ed:1},i:'wide',x:'transition: color 0.2s ease, transform 0.3s ease-out 0.1s',m:'transition',
   demo:`<style>.t-demo{transition:transform .4s cubic-bezier(.5,1.25,.75,1.25),background .4s;animation:demo-pulse 2s ease-in-out infinite}</style><div style="padding:10px;text-align:center"><div class="t-demo" style="display:inline-block;background:#f59e0b;color:#fff;padding:10px 20px;border-radius:8px;font-size:11px;font-weight:700">Animating…</div><p style="font-size:9px;color:#888;font-weight:700;margin-top:6px">transition: transform .4s ease</p></div>`},

  {n:'animation',c:'Animation',d:'Shorthand for all animation sub-properties — references @keyframes by name.',s:{ch:1,ff:1,sf:1,ed:1},i:'wide',x:'animation: spin 1s linear infinite',m:'animation',
   demo:`<div style="display:flex;gap:16px;align-items:center;padding:10px"><div style="width:36px;height:36px;background:linear-gradient(135deg,#f59e0b,#ec4899);border-radius:6px;animation:demo-spin 2s linear infinite"></div><div style="width:36px;height:36px;background:#f59e0b;border-radius:50%;animation:demo-bounce 1s ease-in-out infinite"></div><div style="width:36px;height:36px;background:linear-gradient(135deg,#6366f1,#f97316);border-radius:6px;animation:demo-color 3s linear infinite"></div></div>`},

  {n:'animation-timeline',c:'Animation',d:'Specifies the timeline controlling a CSS animation — enables scroll and view progress animations.',s:{ch:1,ff:0,sf:0,ed:1},i:'ltd',x:'animation-timeline: scroll() | view() | --my-timeline',m:'animation-timeline',
   demo:`<div style="padding:10px;width:100%"><div style="background:#fef3c7;border-radius:5px;height:18px;width:100%;overflow:hidden;border:2px solid #f59e0b"><div style="height:100%;width:70%;background:linear-gradient(90deg,#f59e0b,#ec4899);border-radius:3px;animation:demo-width 3s ease-in-out infinite"></div></div><p style="font-size:9px;color:#888;font-weight:700;margin-top:6px">Scroll-driven progress bar</p></div>`},

  {n:'view-transition-name',c:'Animation',d:'Names an element for the View Transitions API, enabling cross-page morphing animations.',s:{ch:1,ff:1,sf:1,ed:1},i:'b2024',x:'view-transition-name: hero-image | none',m:'view-transition-name',
   demo:`<div style="display:flex;align-items:center;gap:12px;padding:10px"><div style="width:40px;height:40px;background:linear-gradient(135deg,#f59e0b,#ec4899);border-radius:6px;animation:demo-pulse 2s ease infinite"></div><div style="font-size:18px">→</div><div style="width:60px;height:60px;background:linear-gradient(135deg,#f59e0b,#ec4899);border-radius:12px;animation:demo-pulse 2s ease infinite;animation-delay:.1s"></div><p style="font-size:9px;color:#888;font-weight:700">Morphing between pages</p></div>`},

  {n:'offset-path',c:'Animation',d:'Defines a path along which an element moves via CSS Motion Path.',s:{ch:1,ff:1,sf:1,ed:1},i:'b2022',x:'offset-path: path("M 0,0 C 50,100 150,100 200,0")',m:'offset-path',
   demo:`<style>.op-dot{width:14px;height:14px;background:#f59e0b;border-radius:50%;offset-path:path("M 10,40 C 40,5 100,5 130,40 S 220,75 150,40");animation:demo-path 2s linear infinite}</style><svg style="position:absolute;opacity:.2" width="200" height="72" viewBox="0 0 200 72"><path d="M 10,40 C 40,5 100,5 130,40 S 220,75 150,40" stroke="#f59e0b" fill="none" stroke-width="2" stroke-dasharray="4"/></svg><div class="op-dot"></div>`},

  {n:'will-change',c:'Animation',d:'Hints to the browser which properties will change, letting it optimise rendering ahead of time.',s:{ch:1,ff:1,sf:1,ed:1},i:'wide',x:'will-change: transform | opacity | auto',m:'will-change',
   demo:`<div style="display:flex;gap:10px;padding:10px;align-items:center"><div style="will-change:transform;background:#f59e0b;color:#fff;padding:10px 14px;border-radius:6px;font-size:10px;font-weight:700;animation:demo-bounce 1.5s ease-in-out infinite">promoted</div><div style="font-size:9px;color:#888;font-weight:700">GPU layer hint<br>via will-change</div></div>`},
];
