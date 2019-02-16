export const state = () => ({
  list: []
});

export const mutations = {
  setDishes(state, dish) {
    state.list.push(dish);
  },
  emptyList(state) {
    state.list = [];
  }
};

export const getters = {
  list: state => state.list
};
