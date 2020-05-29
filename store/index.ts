import { Diff } from './type';

export const state = () => ({
  diff: {}
});

export const mutations = {
  setDiff(state: { diff: {} }, diff: Diff) {
    state.diff = diff;
  }
};
