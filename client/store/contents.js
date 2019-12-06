export const actions = {
  async list({ commit }) {
    try {
      await this.$axios.get('/contents/list');
      console.log(commit);
    } catch (e) {}
  },
};
