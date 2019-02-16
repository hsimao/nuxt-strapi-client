<template>
  <div class="header">

    <el-menu :router="true" :default-active="activeIndex"
      class="el-menu-demo" mode="horizontal"
      @select="handleSelect">
      <el-menu-item index="/">
        <!-- 回首頁時spa無法正常取得資料,先強制刷新頁面 -->
        <!-- <a href="/">首頁</a> -->
        首頁
      </el-menu-item>
      <el-submenu index="2">
        <template slot="title">餐廳</template>
        <el-menu-item index="2-1">選項1</el-menu-item>
        <el-menu-item index="2-2">選項2</el-menu-item>
        <el-menu-item index="2-3">選項3</el-menu-item>
      </el-submenu>
      <el-menu-item index="#">訂單管理</el-menu-item>
      <el-menu-item v-if="!username" index="/signup">
        註冊
      </el-menu-item>
      <el-menu-item v-if="!username" index="/signup">
        登入
      </el-menu-item>
      <el-menu-item v-if="username" index="#"
        @click.prevent="logout">
        登出
      </el-menu-item>
      <p v-if="username">Hello {{username}}</p>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: "App-header",
  data() {
    return {
      activeIndex: "/"
    };
  },
  computed: {
    username() {
      return this.$store.getters["auth/username"];
    }
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    logout() {
      this.$store.commit("auth/logout");
    }
  }
};
</script>

<style lang="sass" src="./style.sass" scoped></style>