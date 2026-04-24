export type IconId = "tax" | "climate" | "treasury" | "atlas" | "elements" | "payments" | "windmill" | "solar" | "battery" | "forecasting" | "trading" | "reporting" | "bidopt";

export type IconState = {
  id: IconId;
  label: string;
  ref: React.RefObject<HTMLDivElement | null>;
  active: boolean;
};

export type Point = {
  x: number;
  y: number;
};

export type Points = {
  origin: Point;
  targets: Point[];
  // Optional per-target origin overrides. When present, beam i should emanate
  // from originsPerTarget[i] instead of `origin`. Used by the Solvyn layout
  // where icons on the left/right of the logo connect to different edges of
  // the central logo.
  originsPerTarget?: Point[];
};

export const ICON_SIZE = 48;
export const BEAM_SPEED = 0.2; // Speed of pulse animation (increased for faster movement)
export const TOUCH_THRESHOLD = 25;

