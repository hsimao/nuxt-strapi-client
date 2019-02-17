import cookieParse from "cookieparser";

export const state = () => ({
  loading: false,
  forwardRoute: null
});

export const mutations = {
  setLoading(state, payload) {
    state.loading = payload;
  },
  setForwardRoute(state, route) {
    state.forwardRoute = route;
  }
};

export const actions = {
  // 取得初始資料餐廳資訊
  // 在伺服器端先解析用戶 cookie 取得 user 跟購物車 cart 資料
  async nuxtServerInit({ commit, dispatch }, { req }) {
    let user = null;
    let cart = [];
    if (req && req.headers && req.headers.cookie) {
      const parsed = cookieParse.parse(req.headers.cookie);
      user = (parsed.user && JSON.parse(parsed.user)) || null;
      cart = (parsed.cart && JSON.parse(parsed.cart)) || [];
    }

    commit("auth/setUser", user);
    commit("cart/setItems", cart);
    await dispatch("restaurants/loadRestaurants");
  },

  updateLoading({ commit }, payload) {
    commit("setLoading", payload);
  }
};

export const getters = {
  loading: state => state.loading,
  forwardRoute: state => state.forwardRoute
};
