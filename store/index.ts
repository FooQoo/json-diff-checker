import { Diff } from './type';

export const state = () => ({
  diff: {},
  loading: true
});

export const mutations = {
  setDiff(state: { diff: {} }, diff: Diff) {
    state.diff = diff;
  },
  stopLoading(state: { loading: boolean }) {
    state.loading = false;
  }
};
