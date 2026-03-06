import type { CSSProperty } from "../types";

export const uiComponents: CSSProperty[] = [
  {
    n: "popover",
    c: "UI Components",
    d: "Native popover API attribute — creates a popover that can be shown/hidden via invoker buttons.",
    s: { ch: 1, ff: 0, sf: 0, ed: 1 },
    i: "ltd",
    x: '<div popover id="menu">...</div>\n<button popovertarget="menu">Toggle</button>',
    m: "popover",
    demo: `<div style="padding:10px"><button popovertarget="demo-popover-1" style="padding:8px 16px;background:#6366f1;color:#fff;border:none;border-radius:6px;font-size:11px;font-weight:700">Toggle Popover</button><div id="demo-popover-1" popover style="padding:10px 12px;border:2px solid #6366f1;border-radius:6px;font-size:10px;font-weight:700;color:#4338ca">Popover content</div></div>`,
  },

  {
    n: "popovertarget",
    c: "UI Components",
    d: "Button attribute that controls which popover to show/hide — references the popover element by ID.",
    s: { ch: 1, ff: 0, sf: 0, ed: 1 },
    i: "ltd",
    x: '<button popovertarget="menu">Open</button>\n<button popovertarget="menu" popovertargetaction="hide">Close</button>',
    m: "popovertarget",
    demo: `<div style="padding:10px;display:flex;flex-direction:column;gap:8px"><div style="display:flex;gap:8px"><button popovertarget="demo-popover-2" popovertargetaction="show" style="padding:6px 12px;background:#10b981;color:#fff;border:none;border-radius:4px;font-size:10px;font-weight:700">Open</button><button popovertarget="demo-popover-2" popovertargetaction="hide" style="padding:6px 12px;background:#ef4444;color:#fff;border:none;border-radius:4px;font-size:10px;font-weight:700">Close</button></div><div id="demo-popover-2" popover style="padding:8px 10px;border:2px solid #10b981;border-radius:6px;font-size:10px;font-weight:700;color:#065f46">Controlled by popovertarget</div></div>`,
  },

  {
    n: "command",
    c: "UI Components",
    d: "Invoker command attribute — declarative way for buttons to invoke built-in or custom commands on elements.",
    s: { ch: 1, ff: 0, sf: 0, ed: 0 },
    i: "exp",
    x: '<button command="show-modal" commandfor="dialog">Open</button>',
    m: "command",
    demo: `<div style="padding:10px"><div style="background:#f0f9ff;border:2px solid #0ea5e9;border-radius:6px;padding:10px"><p style="font-size:10px;font-weight:700;color:#0284c7;margin:0">Experimental</p><p style="font-size:9px;color:#0ea5e9;margin:4px 0 0;font-family:monospace">command="show-modal"</p></div><p style="font-size:8px;color:#888;margin-top:6px;font-weight:700">Invoker Commands API</p></div>`,
  },

  {
    n: "commandfor",
    c: "UI Components",
    d: "Specifies the target element ID for a command invocation — links button to the element it controls.",
    s: { ch: 1, ff: 0, sf: 0, ed: 0 },
    i: "exp",
    x: '<button command="hide-popover" commandfor="tooltip">Dismiss</button>',
    m: "commandfor",
    demo: `<div style="padding:10px"><div style="background:#f0f9ff;border:2px solid #0ea5e9;border-radius:6px;padding:10px"><p style="font-size:10px;font-weight:700;color:#0284c7;margin:0">Target Element</p><p style="font-size:9px;color:#0ea5e9;margin:4px 0 0;font-family:monospace">commandfor="dialog-id"</p></div><p style="font-size:8px;color:#888;margin-top:6px;font-weight:700">Links command to element</p></div>`,
  },

  {
    n: "appearance",
    c: "UI Components",
    d: "Controls the platform-native styling of form elements — use none to fully customize with CSS.",
    s: { ch: 1, ff: 1, sf: 1, ed: 1 },
    i: "wide",
    x: "appearance: auto | none",
    m: "appearance",
    demo: `<div style="padding:10px;display:flex;gap:10px;align-items:center"><input type="checkbox" style="appearance:none;width:24px;height:24px;border:2px solid #6366f1;border-radius:4px;background:#fff;position:relative"><input type="checkbox" checked style="appearance:none;width:24px;height:24px;border:2px solid #6366f1;border-radius:4px;background:#6366f1;position:relative"><span style="font-size:9px;font-weight:700;color:#4338ca">appearance: none</span></div>`,
  },
];
