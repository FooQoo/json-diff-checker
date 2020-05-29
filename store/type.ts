export interface RootState {
  version: string;
}

export interface DiffState {
  diff: Diff;
}

export interface Diff {
  left: string;
  right: string;
  diff: string;
}
