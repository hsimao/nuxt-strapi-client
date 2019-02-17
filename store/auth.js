import Cookies from "js-cookie";
import strapi from "~/plugins/strapi";

export const state = () => {
  user: null;
};

export const mutations = {
  setUser(state, user) {
    state.user = user;
    Cookies.set("user", user);
    this.$router.push("/");
  },
  logout(state) {
    state.user = null;
    Cookies.set("user", null);
    this.$router.replace("/");
  }
};

export const actions = {
  async register({ commit, dispatch }, { username, email, password }) {
    try {
      const res = await strapi.register(username, email, password);
      commit("setUser", res.user);
      dispatch("updateLoading", false, { root: true });
    } catch (err) {
      dispatch("updateLoading", false, { root: true });
      alert(err.message || "An error occurred.");
    }
  },

  // 判斷是否有設置 forwardRoute, 有的話登入完後將轉跳到特定頁面
  async login({ commit, dispatch, rootGetters }, { email, password }) {
    let nextRoute = "/";
    try {
      const res = await strapi.login(email, password);
      // 使用 rootGetters 獲取 store/index.js 內的 getters
      const forwardRoute = rootGetters.forwardRoute;
      if (forwardRoute !== null) {
        nextRoute = forwardRoute;
        commit("setForwardRoute", null, { root: true });
      }
      commit("setUser", res.user);
      dispatch("updateLoading", false, { root: true });
      this.$router.replace(nextRoute);
    } catch (err) {
      dispatch("updateLoading", false, { root: true });
      alert(err.message || "An error occurred.");
    }
  }
};

export const getters = {
  username: state => state.user && state.user.username,
  user: state => state.user
};
