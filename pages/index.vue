<template>
  <div class="index">
    <!-- 搜尋 -->

    <el-form :inline="true" :model="form" class="demo-form-inline">
      <el-form-item label="搜尋">
        <el-input v-model="form.query"
          placeholder="搜尋"></el-input>
      </el-form-item>
    </el-form>

    <div class="cards" v-for="item in filterList"
      :key="item._id">
      <nuxt-link :to="`/restaurants/${item._id}`">
        <el-card shadow="hover" :body-style="{ padding: '0px' }">
          <img :src="item.images[0].url" class="image">
          <div style="padding: 14px;">
            <span>{{item.name}}</span>
          </div>
        </el-card>
      </nuxt-link>

    </div>
  </div>
</template>

<script>
// 引入strapi sdk
import Strapi from "strapi-sdk-javascript/build/main";
const apiUrl = process.env.API_URL || "http://localhost:1337";
const strapi = new Strapi(apiUrl);

export default {
  name: "AppIndex",
  data() {
    return {
      form: {
        query: ""
      }
    };
  },
  computed: {
    filterList() {
      return this.restaurants.filter(restaurant => {
        return restaurant.name
          .toLowerCase()
          .includes(this.form.query.toLowerCase());
      });
    },
    restaurants() {
      return this.$store.getters["restaurants/list"];
    }
  },
  async fetch({ store }) {
    // 先清空vuex餐廳資料
    store.commit("restaurants/emptyList");
    // 使用 strapi sdk 來用 Graphql 跟後端呼叫 API 取得新資料
    const response = await strapi.request("post", "/graphql", {
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
    if (response.data.restaurants.length >= 1) {
      response.data.restaurants.forEach(item => {
        // 圖片加上 root 網址
        item.images.forEach(imageItem => {
          imageItem.url = `${apiUrl}${imageItem.url}`;
        });
        store.commit("restaurants/add", item);
      });
    }
  }
};
</script>

<style>
.cards {
  display: flex;
}
.el-card {
  width: 30%;
  min-width: 270px;
}

.el-card .image {
  width: 100%;
}
</style>

