<template>
  <div>
    <no-ssr>
      <el-container>
        <el-header>
          <Header />
        </el-header>
        <el-main>
          <nuxt />
        </el-main>
      </el-container>
    </no-ssr>
  </div>
</template>

<script>
import Header from "~/components/Header";
export default {
  name: "defaultLayout",
  components: {
    Header
  }
};
</script>

<!-- 覆蓋 element-ui 樣式 -->
<style lang="sass" src="@/assets/style/element-main.sass" scoped></style>
