<template>
  <div class="restaurant">
    <h1 class="title" v-if="restaurant">{{restaurant.name}}</h1>
    <div class="cards" v-if="dishes">
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
import { mapGetters } from "vuex";

export default {
  name: "restaurant",
  head() {
    return {
      title: this.restaurant.name,
      meta: [
        {
          hid: "description",
          name: "description",
          content: this.restaurant.desc
        }
      ]
    };
  },
  mounted() {
    // console.log(this.dishes);
    // console.log(this.restaurant);
  },
  computed: {
    ...mapGetters({
      restaurant: "restaurants/restaurant",
      dishes: "dishes/list"
    }),
    id() {
      return this.$route.params.id;
    }
  },
  async fetch({ store, params }) {
    // 取得餐廳餐點資訊
    await store.dispatch("restaurants/loadRestaurant", params.id);
  }
};
</script>

<style lang="sass" src="./style.sass" scoped></style>
