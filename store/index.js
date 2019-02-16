import cookieParse from "cookieparser";

export const state = () => ({
  loading: false
});

export const mutations = {
  setLoading(state, payload) {
    state.loading = payload;
  }
};

export const actions = {
  // 在伺服器端先解析用戶cookie取得user資料
  nuxtServerInit({ commit }, { req }) {
    let user = null;
    if (req && req.headers && req.headers.cookie) {
      const parsed = cookieParse.parse(req.headers.cookie);
      user = (parsed.user && JSON.parse(parsed.user)) || null;
    }

    commit("auth/setUser", user);
  },

  updateLoading({ commit }, payload) {
    commit("setLoading", payload);
  }
};

export const getters = {
  routerActive: state => state.routerActive,
  loading: state => state.loading
};
