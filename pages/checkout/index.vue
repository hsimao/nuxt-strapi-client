
<template>
  <section class="container">
    <div>
      <h1 class="mt-2">Checkout</h1>
      <el-row type="flex" justify="center">
        <el-col :xs="20" :sm="14" :md="12">
          <Cart :checkoutBtn="false" />
        </el-col>
      </el-row>

      <el-row :gutter="30" type="flex" justify="center">
        <el-col :xs="24" :sm="12">
          <el-form status-icon :rules="rules" ref="ruleForm"
            label-position="top" label-width="80px"
            :model="form">
            <el-form-item label="地址" prop="address">
              <el-input v-model="form.address"></el-input>
            </el-form-item>
            <el-form-item label="郵遞區號" prop="postalCode">
              <el-input v-model="form.postalCode"></el-input>
            </el-form-item>
            <el-form-item label="城市" prop="city">
              <el-input v-model="form.city"></el-input>
            </el-form-item>
            <el-form-item label="信用卡">
              <Card class="card" stripe="pk_test_Tz75qrcLCFsFfBMLZm18eupZ" />
            </el-form-item>

            <el-button :disabled="loading" type="primary"
              @click="submitForm">結帳</el-button>
          </el-form>
        </el-col>
      </el-row>
    </div>
  </section>
</template>

<script>
import Cart from "@/components/Cart";

import { Card, createToken } from "vue-stripe-elements-plus";
import { mapMutations, mapGetters } from "vuex";

export default {
  name: "checkout",
  components: {
    Card,
    Cart
  },
  data() {
    return {
      form: {
        address: "",
        postalCode: "",
        city: ""
      },
      rules: {
        address: [
          { required: true, message: "地址為必填欄位", trigger: "blur" }
        ],
        postalCode: [{ required: true, message: "郵遞區號為必填欄位" }],
        city: [{ required: true, message: "城市為必填欄位" }]
      }
    };
  },
  computed: {
    ...mapGetters({
      loading: "loading",
      dishes: "dishes/list",
      cartItems: "cart/items",
      totalPrice: "cart/price",
      numberOfItems: "cart/numberOfItems"
    })
  },
  methods: {
    async submitForm() {
      this.$store.dispatch("updateLoading", true, { root: true });
      let token;
      try {
        const response = await createToken();
        token = response.token.id;
        const checkoutData = {
          address: this.form.address,
          postalCode: this.form.postalCode,
          city: this.form.city,
          token: token
        };
        await this.$store.dispatch("cart/checkout", checkoutData);
      } catch (err) {
        alert("An error occurred.");
        this.$store.dispatch("updateLoading", false, { root: true });
      }
    },
    ...mapMutations({
      addToCard: "card/increase",
      removeFromCard: "card/decrease",
      emptyCard: "card/emptyCart"
    })
  }
};
</script>

<style lang="sass" src="./style.sass" scoped></style>
