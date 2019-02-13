<template>
  <div class="restaurant">
    <div class="cards">
      <el-card class="cards" v-for="item in dishes"
        :key="item._id" shadow="hover"
        :body-style="{ padding: '0px' }">
        <img :src="item.images[0].url" class="image">
        <div style="padding: 14px;">
          <span>{{item.name}}</span>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
// 引入strapi sdk
import Strapi from "strapi-sdk-javascript/build/main";
const apiUrl = process.env.API_URL || "http://localhost:1337";
const strapi = new Strapi(apiUrl);

export default {
  name: "restaurant",
  mounted() {
    console.log(this.dishes);
  },
  computed: {
    id() {
      return this.$route.params.id;
    },
    dishes() {
      return this.$store.getters["dishes/list"];
    }
  },
  async fetch({ store, params }) {
    store.commit("dishes/emptyList");
    const response = await strapi.request("post", "/graphql", {
      data: {
        query: `query {
          restaurant(id: "5c641132f883a30e73f676a7") {
            _id
            name
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
    response.data.restaurant.dishes.forEach(dish => {
      dish.images.forEach(imageItem => {
        imageItem.url = `${apiUrl}${imageItem.url}`;
      });
      store.commit("dishes/add", dish);
    });
  }
};
</script>

<style lang="sass" src="./style.sass" scoped></style>
