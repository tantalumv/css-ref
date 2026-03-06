import type { CSSProperty } from "../types";

export const animation: CSSProperty[] = [
  {
    n: "transition",
    c: "Animation",
    d: "Shorthand to animate changes between property values when an element changes state.",
    s: { ch: 1, ff: 1, sf: 1, ed: 1 },
    i: "wide",
    x: "transition: color 0.2s ease, transform 0.3s ease-out 0.1s",
    m: "transition",
    demo: `<style>.t-demo{transition:transform .4s cubic-bezier(.5,1.25,.75,1.25),background .4s;animation:demo-pulse 2s ease-in-out infinite}</style><div style="padding:10px;text-align:center"><div class="t-demo" style="display:inline-block;background:#f59e0b;color:#fff;padding:10px 20px;border-radius:8px;font-size:11px;font-weight:700">Animating…</div><p style="font-size:9px;color:#888;font-weight:700;margin-top:6px">transition: transform .4s ease</p></div>`,
  },

  {
    n: "animation",
    c: "Animation",
    d: "Shorthand for all animation sub-properties — references @keyframes by name.",
    s: { ch: 1, ff: 1, sf: 1, ed: 1 },
    i: "wide",
    x: "animation: spin 1s linear infinite",
    m: "animation",
    demo: `<div style="display:flex;gap:16px;align-items:center;padding:10px"><div style="width:36px;height:36px;background:linear-gradient(135deg,#f59e0b,#ec4899);border-radius:6px;animation:demo-spin 2s linear infinite"></div><div style="width:36px;height:36px;background:#f59e0b;border-radius:50%;animation:demo-bounce 1s ease-in-out infinite"></div><div style="width:36px;height:36px;background:linear-gradient(135deg,#6366f1,#f97316);border-radius:6px;animation:demo-color 3s linear infinite"></div></div>`,
  },

  {
    n: "animation-timeline",
    c: "Animation",
    d: "Specifies the timeline controlling a CSS animation — enables scroll and view progress animations.",
    s: { ch: 1, ff: 0, sf: 0, ed: 1 },
    i: "ltd",
    x: "animation-timeline: scroll() | view() | --my-timeline",
    m: "animation-timeline",
    demo: `<div style="padding:10px;width:100%"><div style="background:#fef3c7;border-radius:5px;height:18px;width:100%;overflow:hidden;border:2px solid #f59e0b"><div style="height:100%;width:70%;background:linear-gradient(90deg,#f59e0b,#ec4899);border-radius:3px;animation:demo-width 3s ease-in-out infinite"></div></div><p style="font-size:9px;color:#888;font-weight:700;margin-top:6px">Scroll-driven progress bar</p></div>`,
  },

  {
    n: "view-transition-name",
    c: "Animation",
    d: "Names an element for the View Transitions API, enabling cross-page morphing animations.",
    s: { ch: 1, ff: 1, sf: 1, ed: 1 },
    i: "b2024",
    x: "view-transition-name: hero-image | none",
    m: "view-transition-name",
    demo: `<div style="display:flex;align-items:center;gap:12px;padding:10px"><div style="width:40px;height:40px;background:linear-gradient(135deg,#f59e0b,#ec4899);border-radius:6px;animation:demo-pulse 2s ease infinite"></div><div style="font-size:18px">→</div><div style="width:60px;height:60px;background:linear-gradient(135deg,#f59e0b,#ec4899);border-radius:12px;animation:demo-pulse 2s ease infinite;animation-delay:.1s"></div><p style="font-size:9px;color:#888;font-weight:700">Morphing between pages</p></div>`,
  },

  {
    n: "offset-path",
    c: "Animation",
    d: "Defines a path along which an element moves via CSS Motion Path.",
    s: { ch: 1, ff: 1, sf: 1, ed: 1 },
    i: "b2022",
    x: 'offset-path: path("M 0,0 C 50,100 150,100 200,0")',
    m: "offset-path",
    demo: `<style>.op-dot{width:14px;height:14px;background:#f59e0b;border-radius:50%;offset-path:path("M 10,40 C 40,5 100,5 130,40 S 220,75 150,40");animation:demo-path 2s linear infinite}</style><svg style="position:absolute;opacity:.2" width="200" height="72" viewBox="0 0 200 72"><path d="M 10,40 C 40,5 100,5 130,40 S 220,75 150,40" stroke="#f59e0b" fill="none" stroke-width="2" stroke-dasharray="4"/></svg><div class="op-dot"></div>`,
  },

  {
    n: "will-change",
    c: "Animation",
    d: "Hints to the browser which properties will change, letting it optimise rendering ahead of time.",
    s: { ch: 1, ff: 1, sf: 1, ed: 1 },
    i: "wide",
    x: "will-change: transform | opacity | auto",
    m: "will-change",
    demo: `<div style="display:flex;gap:10px;padding:10px;align-items:center"><div style="will-change:transform;background:#f59e0b;color:#fff;padding:10px 14px;border-radius:6px;font-size:10px;font-weight:700;animation:demo-bounce 1.5s ease-in-out infinite">promoted</div><div style="font-size:9px;color:#888;font-weight:700">GPU layer hint<br>via will-change</div></div>`,
  },

  {
    n: "transition-duration",
    c: "Animation",
    d: "Sets how long a transition takes from start to end.",
    s: { ch: 1, ff: 1, sf: 1, ed: 1 },
    i: "wide",
    x: "transition-duration: 150ms | 0.6s",
    m: "transition-duration",
    demo: `<style>.td-wrap{display:flex;gap:8px}.td-chip{padding:8px 10px;border-radius:6px;color:#fff;font-size:10px;font-weight:700;cursor:pointer}.td-fast{background:#6366f1;transition-property:transform;transition-duration:120ms}.td-slow{background:#ec4899;transition-property:transform;transition-duration:900ms}.td-chip:hover{transform:translateY(-4px)}</style><div class="td-wrap" style="padding:10px"><div class="td-chip td-fast">120ms</div><div class="td-chip td-slow">900ms</div></div>`,
    v: [
      { value: "0s", label: "Zero (0s)", description: "The transition is instant with no animation. This is the default." },
      { value: "seconds", label: "Seconds (e.g., 0.3s, 1s)", description: "The transition takes the specified seconds. Common values range from 0.2s to 0.5s for UI interactions." },
      { value: "milliseconds", label: "Milliseconds (e.g., 200ms)", description: "The transition duration in milliseconds. 200-300ms feels responsive for hover states." }
    ],
  },

  {
    n: "animation-duration",
    c: "Animation",
    d: "Sets the length of time one animation cycle takes.",
    s: { ch: 1, ff: 1, sf: 1, ed: 1 },
    i: "wide",
    x: "animation-duration: 500ms | 2s",
    m: "animation-duration",
    demo: `<style>@keyframes ad-pulse{0%,100%{transform:scale(1)}50%{transform:scale(1.18)}}.ad{width:32px;height:32px;border-radius:6px;background:#f59e0b;animation-name:ad-pulse;animation-iteration-count:infinite}.ad-fast{animation-duration:.6s}.ad-slow{animation-duration:2s;background:#6366f1}</style><div style="display:flex;gap:14px;align-items:center;padding:10px"><div class="ad ad-fast"></div><div class="ad ad-slow"></div><p style="font-size:9px;color:#888;font-weight:700">fast vs slow duration</p></div>`,
    v: [
      { value: "0s", label: "Zero (0s)", description: "The animation takes no time and won't play. This is the default." },
      { value: "seconds", label: "Seconds (e.g., 1s, 2.5s)", description: "The animation duration in seconds. You can use decimal values like 1.5s for more precision." },
      { value: "milliseconds", label: "Milliseconds (e.g., 500ms)", description: "The animation duration in milliseconds. 1000ms equals 1 second. Useful for short animations." }
    ],
  },

  {
    n: "animation-composition",
    c: "Animation",
    d: "Controls how multiple animations on the same property combine — replace (default), add (sum values), or accumulate (combine transforms).",
    s: { ch: 1, ff: 1, sf: 1, ed: 1 },
    i: "ltd",
    x: "animation-composition: replace | add | accumulate",
    m: "animation-composition",
    demo: `<div style="padding:10px"><div style="animation-name:demo-scale,demo-rotate;animation-duration:2s;animation-iteration-count:infinite;animation-composition:add;background:#6366f1;width:40px;height:40px;border-radius:5px;display:flex;align-items:center;justify-content:center;font-size:8px;font-weight:700;color:#fff">add</div></div>`,
  },

  {
    n: "animation-delay",
    c: "Animation",
    d: "Sets the delay before an animation starts — can be negative to begin partway through.",
    s: { ch: 1, ff: 1, sf: 1, ed: 1 },
    i: "wide",
    x: "animation-delay: 200ms | 1s",
    m: "animation-delay",
    demo: `<div style="padding:10px"><div style="animation-name:demo-pulse;animation-duration:1.4s;animation-iteration-count:infinite;animation-delay:.5s;background:#eef2ff;border:2px solid #6366f1;border-radius:5px;padding:8px;font-size:9px;font-weight:700;color:#4338ca">animation-delay</div></div>`,
    v: [
      { value: "0s", label: "No Delay (0s)", description: "The animation starts immediately without waiting. This is the default." },
      { value: "positive", label: "Positive Value (e.g., 1s, 2s)", description: "The animation waits for the specified time before starting. Useful for staggering multiple animations." },
      { value: "negative", label: "Negative Value (e.g., -500ms)", description: "The animation starts as if it had already been playing for that duration. The animation begins partway through its cycle." }
    ],
  },

  {
    n: "animation-direction",
    c: "Animation",
    d: "Controls whether the animation plays forwards, backwards, or alternates each cycle.",
    s: { ch: 1, ff: 1, sf: 1, ed: 1 },
    i: "wide",
    x: "animation-direction: normal | reverse | alternate",
    m: "animation-direction",
    demo: `<div style="padding:10px"><div style="animation-name:demo-path;animation-duration:2s;animation-iteration-count:infinite;animation-direction:alternate;background:#eef2ff;border:2px solid #6366f1;border-radius:5px;padding:8px;font-size:9px;font-weight:700;color:#4338ca">animation-direction</div></div>`,
    v: [
      { value: "normal", label: "Normal", description: "The animation plays forwards from 0% to 100%. When it reaches the end, it restarts from the beginning. This is the default." },
      { value: "reverse", label: "Reverse", description: "The animation plays backwards from 100% to 0%. It starts at the last keyframe and ends at the first." },
      { value: "alternate", label: "Alternate", description: "The animation plays forwards first, then backwards. It alternates direction on each iteration." },
      { value: "alternate-reverse", label: "Alternate Reverse", description: "The animation plays backwards first, then forwards. It starts from the end and alternates on each iteration." }
    ],
  },

  {
    n: "animation-fill-mode",
    c: "Animation",
    d: "Controls how styles apply before/after animation — forwards keeps end state, backwards applies start state before delay.",
    s: { ch: 1, ff: 1, sf: 1, ed: 1 },
    i: "wide",
    x: "animation-fill-mode: none | forwards | both",
    m: "animation-fill-mode",
    demo: `<div style="padding:10px"><div style="animation-name:demo-width;animation-duration:1.2s;animation-fill-mode:forwards;background:#eef2ff;border:2px solid #6366f1;border-radius:5px;padding:8px;font-size:9px;font-weight:700;color:#4338ca">animation-fill-mode</div></div>`,
    v: [
      { value: "none", label: "None", description: "The animation styles don't affect the default state. Before the animation starts, the element uses its normal styles. After it ends, it returns to normal styles." },
      { value: "forwards", label: "Forwards", description: "After the animation completes, the final keyframe styles are retained. The element keeps the appearance of the last frame." },
      { value: "backwards", label: "Backwards", description: "Before the animation starts (during the delay period), the initial keyframe styles are applied. Useful with animation-delay." },
      { value: "both", label: "Both", description: "The animation applies the start styles before the animation begins and retains the end styles after it completes." }
    ],
  },

  {
    n: "animation-iteration-count",
    c: "Animation",
    d: "Sets how many times the animation plays — number or infinite for endless loop.",
    s: { ch: 1, ff: 1, sf: 1, ed: 1 },
    i: "wide",
    x: "animation-iteration-count: 1 | 2 | infinite",
    m: "animation-iteration-count",
    demo: `<div style="padding:10px"><div style="animation-name:demo-spin;animation-duration:1.2s;animation-iteration-count:3;background:#eef2ff;border:2px solid #6366f1;border-radius:5px;padding:8px;font-size:9px;font-weight:700;color:#4338ca">animation-iteration-count</div></div>`,
    v: [
      { value: "1", label: "Once (1)", description: "The animation plays through exactly one time. This is the default." },
      { value: "number", label: "Number (e.g., 2, 3)", description: "The animation plays the specified number of times. Use any positive number for precise control." },
      { value: "infinite", label: "Infinite", description: "The animation repeats forever without stopping. Commonly used for loading spinners and pulsing effects." }
    ],
  },

  {
    n: "animation-name",
    c: "Animation",
    d: "Specifies which @keyframes rule to use for the animation.",
    s: { ch: 1, ff: 1, sf: 1, ed: 1 },
    i: "wide",
    x: "animation-name: fade-in | slide-up",
    m: "animation-name",
    demo: `<div style="padding:10px"><div style="animation-name: demo-spin;animation-duration:1.5s;animation-iteration-count:infinite;display:inline-block;background:#eef2ff;border:2px solid #6366f1;border-radius:5px;padding:8px;font-size:9px;font-weight:700;color:#4338ca">animation-name</div></div>`,
    v: [
      { value: "none", label: "None", description: "No animation is played. This disables any animation on the element." },
      { value: "custom", label: "Custom Name (e.g., fadeIn, slideUp)", description: "References a @keyframes rule with the matching name. The browser looks for @keyframes fadeIn when you specify animation-name: fadeIn." }
    ],
  },

  {
    n: "animation-play-state",
    c: "Animation",
    d: "Controls whether the animation is running or paused — can be toggled to pause/resume.",
    s: { ch: 1, ff: 1, sf: 1, ed: 1 },
    i: "wide",
    x: "animation-play-state: running | paused",
    m: "animation-play-state",
    demo: `<div style="padding:10px"><div style="animation-name:demo-bounce;animation-duration:1.2s;animation-iteration-count:infinite;animation-play-state:paused;background:#eef2ff;border:2px solid #6366f1;border-radius:5px;padding:8px;font-size:9px;font-weight:700;color:#4338ca">animation-play-state</div></div>`,
    v: [
      { value: "running", label: "Running", description: "The animation is actively playing. This is the default and the animation proceeds through its cycles." },
      { value: "paused", label: "Paused", description: "The animation is temporarily stopped. It freezes at its current state and resumes from where it left off when set back to running." }
    ],
  },

  {
    n: "animation-timing-function",
    c: "Animation",
    d: "Controls the speed curve of the animation — ease, linear, ease-in, ease-out, or custom cubic-bezier.",
    s: { ch: 1, ff: 1, sf: 1, ed: 1 },
    i: "wide",
    x: "animation-timing-function: ease | linear | cubic-bezier(0.4,0,0.2,1)",
    m: "animation-timing-function",
    demo: `<div style="padding:10px"><div style="animation-name:demo-bounce;animation-duration:1.4s;animation-iteration-count:infinite;animation-timing-function:linear;background:#eef2ff;border:2px solid #6366f1;border-radius:5px;padding:8px;font-size:9px;font-weight:700;color:#4338ca">animation-timing-function</div></div>`,
    v: [
      { value: "ease", label: "Ease", description: "Starts slowly, accelerates in the middle, then slows down at the end. The most natural-looking timing function." },
      { value: "ease-in", label: "Ease In", description: "Starts slowly and accelerates gradually until reaching the end. Good for elements that move out of view." },
      { value: "ease-out", label: "Ease Out", description: "Starts quickly and decelerates gradually at the end. Good for elements that come into view." },
      { value: "ease-in-out", label: "Ease In Out", description: "Like ease but with more pronounced acceleration and deceleration. Good for elements that move in and out." },
      { value: "linear", label: "Linear", description: "The animation maintains a constant speed from start to end. No acceleration or deceleration." },
      { value: "step-start", label: "Step Start", description: "Jumps instantly to the final state at the beginning of the animation. Like a sudden change." },
      { value: "step-end", label: "Step End", description: "Stays in the initial state until the very end, then jumps instantly to the final state." },
      { value: "steps()", label: "Steps (e.g., steps(4, end))", description: "Breaks the animation into equal steps. The state jumps between steps rather than transitioning smoothly." }
    ],
  },

  {
    n: "transition-behavior",
    c: "Animation",
    d: "Allows transitions on discrete properties like display — use allow-discrete to enable display:none transitions.",
    s: { ch: 1, ff: 1, sf: 1, ed: 1 },
    i: "b2024",
    x: "transition-behavior: normal | allow-discrete",
    m: "transition-behavior",
    demo: `<style>.tb-demo{transition:display .3s,height .3s;transition-behavior:allow-discrete;overflow:hidden;height:40px}.tb-demo.hidden{display:none;height:0}</style><div style="padding:10px"><div class="tb-demo" id="tbBox" style="background:#6366f1;border-radius:5px;display:flex;align-items:center;justify-content:center;font-size:9px;font-weight:700;color:#fff"><span>display transition</span></div><button onclick="document.getElementById('tbBox').classList.toggle('hidden')" style="margin-top:6px;font-size:9px;padding:2px 8px;border-radius:3px;border:1px solid #6366f1;background:#fff;color:#6366f1;cursor:pointer">Toggle</button></div>`,
  },

  {
    n: "transition-property",
    c: "Animation",
    d: "Specifies which CSS properties should transition when their values change.",
    s: { ch: 1, ff: 1, sf: 1, ed: 1 },
    i: "wide",
    x: "transition-property: opacity | transform | all",
    m: "transition-property",
    demo: `<style>.tp-demo{transition-duration:.4s;padding:8px;background:#6366f1;color:#fff;border-radius:5px;font-size:9px;font-weight:700}.tp-demo:hover{transform:scale(1.1);opacity:.7}</style><div style="padding:10px"><div class="tp-demo" style="transition-property:transform">transform only</div><div class="tp-demo" style="transition-property:opacity;margin-top:6px">opacity only</div></div>`,
    v: [
      { value: "all", label: "All", description: "Every animatable property transitions when changed. This is the default but can impact performance." },
      { value: "none", label: "None", description: "No properties transition. Changes happen instantly without animation." },
      { value: "specific", label: "Specific Property (e.g., opacity, transform)", description: "Only the specified property animates. Best for performance—only transition what you need." }
    ],
  },

  {
    n: "transition-timing-function",
    c: "Animation",
    d: "Controls the acceleration curve of the transition — defines how intermediate values are calculated.",
    s: { ch: 1, ff: 1, sf: 1, ed: 1 },
    i: "wide",
    x: "transition-timing-function: ease-in-out | linear",
    m: "transition-timing-function",
    demo: `<style>.ttf-box{transition:transform .6s;padding:6px 10px;background:#6366f1;color:#fff;border-radius:4px;font-size:9px;font-weight:700;margin-bottom:6px}.ttf-linear{transition-timing-function:linear}.ttf-ease{transition-timing-function:ease-in-out}</style><div style="padding:10px" onmouseenter="this.querySelectorAll('.ttf-box').forEach(b=>b.style.transform='translateX(80px)')" onmouseleave="this.querySelectorAll('.ttf-box').forEach(b=>b.style.transform='translateX(0)')"><div class="ttf-box ttf-linear">linear</div><div class="ttf-box ttf-ease">ease-in-out</div></div>`,
    v: [
      { value: "ease", label: "Ease", description: "Starts slowly, accelerates in the middle, then slows down at the end. The most natural-looking timing function." },
      { value: "ease-in", label: "Ease In", description: "Starts slowly and accelerates gradually until reaching the end. Good for elements that move out of view." },
      { value: "ease-out", label: "Ease Out", description: "Starts quickly and decelerates gradually at the end. Good for elements that come into view." },
      { value: "ease-in-out", label: "Ease In Out", description: "Like ease but with more pronounced acceleration and deceleration. Good for elements that move in and out." },
      { value: "linear", label: "Linear", description: "The animation maintains a constant speed from start to end. No acceleration or deceleration." },
      { value: "step-start", label: "Step Start", description: "Jumps instantly to the final state at the beginning of the animation. Like a sudden change." },
      { value: "step-end", label: "Step End", description: "Stays in the initial state until the very end, then jumps instantly to the final state." },
      { value: "steps()", label: "Steps (e.g., steps(4, end))", description: "Breaks the animation into equal steps. The state jumps between steps rather than transitioning smoothly." }
    ],
  },
];
