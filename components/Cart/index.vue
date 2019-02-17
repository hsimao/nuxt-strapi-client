<template>
  <div class="cart">
    <div class="cart-head">
      <h2>購物車</h2>
    </div>
    <ul class="cart-items" v-if="cartItems">
      <li class="cart-item" v-for="item in cartItems"
        :key="item._id">
        <div class="cart-item-info">
          <div v-if="item.images" class="img"
            :style="`background-image: url(${item.images[0].url})`"></div>
          <div class="text">
            <div class="name">{{item.name}}</div>
            <div class="desc">{{item.desc}}</div>
          </div>
          <div class="price">${{item.price}}</div>
        </div>
        <div class="cart-item-tool">
          <div class="btn-decrease" @click="decrease(item)">-</div>
          <div class="count">{{item.quantity}}</div>
          <div class="btn-increase" @click="increase(item)">+</div>
          <div class="btn-remove" @click="removeItem(item._id)">
            <i class="ion ion-ios-trash"></i></div>
        </div>
      </li>
    </ul>
    <div class="cart-total">
      <span>總計：</span>
      <span>${{totalPrice}}</span>
    </div>
    <div v-if="checkoutBtn" class="cart-payment"
      @click="checkout">Payment</div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "cart",
  props: {
    checkoutBtn: {
      type: Boolean,
      defalut: true
    }
  },
  computed: {
    ...mapGetters({
      cartItems: "cart/items",
      totalPrice: "cart/price",
      numberOfItems: "cart/numberOfItems"
    })
  },
  methods: {
    increase(item) {
      this.$store.commit("cart/increase", item);
    },
    decrease(item) {
      this.$store.commit("cart/decrease", item);
    },
    removeItem(id) {
      this.$store.commit("cart/removeItem", id);
    },
    // 如果尚未登入，將/checkout路由儲存，並轉跳到登入頁
    checkout() {
      const isLoaggedIn = this.$store.getters["auth/username"];
      if (!isLoaggedIn) {
        this.$store.commit("setForwardRoute", "/checkout");
        this.$router.push("/signin");
      } else {
        this.$router.push("/checkout");
      }
    }
  }
};
</script>

<style lang="sass" src="./style.sass" scoped></style>
