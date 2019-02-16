// 引入strapi sdk
import Strapi from "strapi-sdk-javascript/build/main";
const apiUrl = process.env.API_URL || "http://localhost:1337";
const strapi = new Strapi(apiUrl);

export const state = () => ({
  list: [],
  restaurant: null
});

export const mutations = {
  setRestaurants(state, restaurant) {
    state.list.push(restaurant);
  },
  emptyList(state) {
    state.list = [];
  },
  setRestaurant(state, restaurant) {
    state.restaurant = restaurant;
  },
  emptyRestaurant(state) {
    state.restaurant = null;
  }
};

export const actions = {
  async loadRestaurants({ commit }) {
    commit("emptyList");
    const res = await strapi.request("post", "/graphql", {
      data: {
        query: `query {
          restaurants {
            _id
            name
            desc
            images {
              url
            }
          }
        }
        `
      }
    });
    // if (res.data.restaurants && res.data.restaurants.length >= 1) {
    res.data.restaurants.forEach(item => {
      // 圖片加上 root 網址
      item.images.forEach(imageItem => {
        imageItem.url = `${apiUrl}${imageItem.url}`;
      });
      commit("setRestaurants", item);
    });
    // }
  },

  async loadRestaurant({ commit }, id) {
    commit("emptyRestaurant");
    commit("dishes/emptyList", true, { root: true });
    const res = await strapi.request("post", "/graphql", {
      data: {
        query: `query {
          restaurant(id: "${id}") {
            _id
            name
            desc
            dishes {
              _id
              name
              desc
              price
              images {
                url
              }
            }
          }
        }
        `
      }
    });
    if (res.data.restaurant && res.data.restaurant.dishes.length >= 1) {
      res.data.restaurant.dishes.forEach(dish => {
        dish.images.forEach(imageItem => {
          imageItem.url = `${apiUrl}${imageItem.url}`;
        });
        commit("dishes/setDishes", dish, { root: true });
      });
      commit("setRestaurant", res.data.restaurant);
    }
  }
};

export const getters = {
  list: state => state.list,
  restaurant: state => state.restaurant
};
