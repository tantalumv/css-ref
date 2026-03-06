export interface BrowserSupport {
  ch: number;
  ff: number;
  sf: number;
  ed: number;
}

export interface CSSValue {
  value: string;
  label: string;
  description: string;
  demo?: string;
}

export interface CSSProperty {
  n: string;
  c: string;
  d: string;
  s: BrowserSupport;
  i: InteropStatus;
  x: string;
  m: string;
  demo: string;
  v?: CSSValue[];
}

export type InteropStatus = "wide" | "b2024" | "b2023" | "b2022" | "ltd" | "exp";
export type ViewMode = "grid" | "list";
