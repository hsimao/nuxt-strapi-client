import strapi from "~/plugins/strapi";

export const state = () => ({
  items: []
});

export const mutations = {
  setOrders(state, orders) {
    state.items = orders;
  },
  emptyOrders(state) {
    state.items = [];
  }
};

export const actions = {
  async loadOrders({ commit, rootGetters }) {
    commit("emptyOrders");
    const res = await strapi.request("post", "/graphql", {
      data: {
        query: `query {
          orders {
            _id
            address
            postalCode
            city
            amount
            userId,
            createdAt
          }
        }
        `
      }
    });
    // 過濾，只取出自己的訂單資料
    const myOrder = res.data.orders.filter(item => {
      if (item.userId !== null) {
        return item.userId === rootGetters["auth/user"]._id;
      }
    });
    commit("setOrders", myOrder);
  }
};

export const getters = {
  items: state => state.items
};
