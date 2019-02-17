<template>
  <div class="header">

    <el-menu router :default-active="$route.path"
      class="el-menu-demo" mode="horizontal">
      <el-menu-item index="/">首頁</el-menu-item>
      <el-submenu index="2">
        <template slot="title">餐廳種類</template>
        <el-menu-item index="2-1">All</el-menu-item>
        <el-menu-item index="2-2">速食</el-menu-item>
        <el-menu-item index="2-3">中餐</el-menu-item>
        <el-menu-item index="2-4">西餐</el-menu-item>
      </el-submenu>
      <el-menu-item v-if="username" index="/orders">我的訂單</el-menu-item>
      <el-menu-item style="margin-left: auto"
        v-if="!username" index="/signup">註冊</el-menu-item>
      <el-menu-item v-if="!username" index="/signin">登入</el-menu-item>
      <el-menu-item style="margin-left: auto"
        v-if="username" index="/#" @click="logout">登出
      </el-menu-item>
      <li v-if="username">
        <p class="menu-text">Hello {{username}}</p>
      </li>
    </el-menu>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "App-header",
  computed: {
    username() {
      return this.$store.getters["auth/username"];
    }
  },

  methods: {
    logout() {
      this.$store.commit("auth/logout");
    }
  }
};
</script>

<style lang="sass" src="./style.sass" scoped></style>