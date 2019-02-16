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
  },
  logout(state) {
    state.user = null;
    Cookies.set("user", null);
    this.$router.push("/");
  }
};

export const actions = {
  async setUser({ commit }, { username, email, password }) {
    try {
      const response = await strapi.register(username, email, password);
      console.log("response ", response);
      commit("setUser", response.user);
    } catch (err) {
      alert(err.message || "An error occurred.");
    }
  }
};

export const getters = {
  username: state => state.user && state.user.username
};
