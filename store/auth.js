import Cookies from "js-cookie";
import Strapi from "strapi-sdk-javascript/build/main";
const apiUrl = process.env.API_URL || "http://localhost:1337";
const strapi = new Strapi(apiUrl);

export const state = () => {
  user: null;
};

export const mutations = {
  setUser(state, user) {
    state.user = user;
    console.log("成功", user);
    Cookies.set("user", user);
    this.$router.push("/");
  },
  logout(state) {
    state.user = null;
    Cookies.set("user", null);
    this.$router.push("/");
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

  async login({ commit, dispatch }, { email, password }) {
    try {
      const res = await strapi.login(email, password);
      console.log("login: ", res);
      commit("setUser", res.user);
      dispatch("updateLoading", false, { root: true });
    } catch (err) {
      dispatch("updateLoading", false, { root: true });
      alert(err.message || "An error occurred.");
    }
  }
};

export const getters = {
  username: state => state.user && state.user.username
};
