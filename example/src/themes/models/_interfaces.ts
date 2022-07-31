export interface LazyStyle {
  use: () => void;
  unUse: () => void;
}

export interface Theme {
  id: string;
  displayName: string;
  filename: string;
  component: string;
}
