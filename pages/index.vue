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
      <a :href="`/restaurants/${item._id}`">
        <el-card shadow="hover" :body-style="{ padding: '0px' }">
          <img :src="item.images[0].url" class="image">
          <div style="padding: 14px;">
            <span>{{item.name}}</span>
          </div>
        </el-card>
      </a>

    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

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
    ...mapGetters({
      restaurants: "restaurants/list"
    }),
    filterList() {
      return this.restaurants.filter(restaurant => {
        return restaurant.name
          .toLowerCase()
          .includes(this.form.query.toLowerCase());
      });
    }
  },
  async fetch({ store }) {
    // 判斷當下 store 是否已經有資料，有就不用重新呼叫 api 調資料
    const hasRestaurants = await store.getters["restaurants/list"];
    if (hasRestaurants.length === 0) {
      await store.dispatch("restaurants/loadRestaurants");
    }
  }
};
</script>

<style>
.cards {
  display: flex;
}
.cards a {
  text-decoration: none;
}
.el-card {
  width: 30%;
  min-width: 270px;
}

.el-card .image {
  width: 100%;
}
</style>

