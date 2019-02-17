<template>
  <div class="restaurant">
    <h1 class="title" v-if="restaurant">{{restaurant.name}}</h1>
    <el-row>
      <el-col :xs="mainWidth.xs" :sm="mainWidth.sm">
        <div class="cards" v-if="dishes">
          <el-card class="cards" v-for="item in dishes"
            :key="item._id" shadow="hover"
            :body-style="{ padding: '0px' }">
            <img :src="item.images[0].url" class="image">
            <div class="card-info">
              <h3 class="card-title">{{item.name}}</h3>
              <div class="card-desc">{{limitWordCount(item.desc,50)}}</div>
              <div class="card-info-bottom">
                <p class="price ">$
                  {{item.price}}</p>
                <el-button class="card-btn" type="primary"
                  @click="increase(item)">加入購物車</el-button>
              </div>
            </div>
          </el-card>
        </div>
      </el-col>
      <el-col :xs="24" :sm="7" :offset="1" class="cart-box"
        :class="{active: cartItems.length>0}">
        <Cart checkoutBtn />
      </el-col>
    </el-row>

  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Cart from "@/components/Cart";

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
  components: {
    Cart
  },
  computed: {
    ...mapGetters({
      restaurant: "restaurants/restaurant",
      dishes: "dishes/list",
      cartItems: "cart/items"
    }),
    id() {
      return this.$route.params.id;
    },
    mainWidth() {
      if (this.cartItems.length > 0) {
        return {
          xs: 24,
          sm: 16
        };
      } else {
        return {
          xs: 24,
          sm: 24
        };
      }
    }
  },
  async fetch({ store, params }) {
    // 取得餐廳餐點資訊
    await store.dispatch("restaurants/loadRestaurant", params.id);
    // 因此頁為 SEO 加強頁面，每次都須從 server render vuex 資料將會清空
    // 所以必須在初始當下一併取得其他 SPA 頁面所需的資料
    await store.dispatch("restaurants/loadRestaurants");
  },
  methods: {
    limitWordCount(str, count) {
      return str.slice(0, count);
    },
    increase(item) {
      this.$store.commit("cart/increase", item);
    }
  }
};
</script>

<style lang="sass" src="./style.sass" scoped></style>
