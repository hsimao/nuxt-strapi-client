<template>
  <div class="header">

    <el-menu :default-active="activeIndex" class="el-menu-demo"
      mode="horizontal" @select="handleSelect">
      <el-menu-item index="1">
        <nuxt-link to="/">首頁</nuxt-link>
      </el-menu-item>
      <el-submenu index="2">
        <template slot="title">餐廳</template>
        <el-menu-item index="2-1">選項1</el-menu-item>
        <el-menu-item index="2-2">選項2</el-menu-item>
        <el-menu-item index="2-3">選項3</el-menu-item>
      </el-submenu>
      <el-menu-item index="4"><a href="/">訂單管理</a></el-menu-item>
    </el-menu>

  </div>
</template>

<script>
export default {
  name: "App-header",
  data() {
    return {
      activeIndex: "1"
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>

<style lang="sass" src="./style.sass" scoped></style>