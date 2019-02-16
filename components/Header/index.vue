<template>
  <div class="header">

    <el-menu router :default-active="$route.path"
      class="el-menu-demo" mode="horizontal">
      <el-menu-item index="/">
        首頁
      </el-menu-item>
      <el-submenu index="2">
        <template slot="title">餐廳</template>
        <el-menu-item index="2-1">選項1</el-menu-item>
        <el-menu-item index="2-2">選項2</el-menu-item>
        <el-menu-item index="2-3">選項3</el-menu-item>
      </el-submenu>
      <el-menu-item index="#">訂單管理</el-menu-item>
      <el-menu-item v-if="!username" index="/signup">註冊</el-menu-item>
      <el-menu-item v-if="!username" index="/signin">登入</el-menu-item>
      <el-menu-item v-if="username" index="#"
        @click.prevent="logout">登出
      </el-menu-item>
      <p v-if="username">Hello {{username}}</p>
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
  },
  mounted() {
    // console.log(this.$route.name);
  }
};
</script>

<style lang="sass" src="./style.sass" scoped></style>