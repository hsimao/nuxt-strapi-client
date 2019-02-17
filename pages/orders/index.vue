<template>
  <div class="orders">
    <el-row type="flex" justify="center">
      <el-col :xs="24" :md="18">
        <el-table stripe :data="orders" style="width: 100%"
          height="70vh" :default-sort="{prop: 'date', order: 'descending'}">
          <el-table-column prop="createdAt" label="成立時間"
            :formatter="timeFormat" fixed
            sortable width="160">
          </el-table-column>
          <el-table-column prop="_id" label="訂單id"
            width="150">
          </el-table-column>
          <el-table-column sortable prop="amount"
            label="金額" width="100">
          </el-table-column>
          <el-table-column prop="postalCode"
            label="郵遞區號" width="80">
          </el-table-column>
          <el-table-column prop="city" label="城市"
            width="80">
          </el-table-column>
          <el-table-column prop="address" label="地址"
            width="250">
          </el-table-column>

        </el-table>
      </el-col>
    </el-row>

  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "orders",
  computed: {
    ...mapGetters({
      orders: "orders/items"
    })
  },

  methods: {
    timeFormat(row, column) {
      let time = new Date(row.createdAt);
      let year = time.getFullYear();
      let month = ("0" + (time.getMonth() + 1)).substr(-2);
      let date = ("0" + time.getDate()).substr(-2);
      let min = ("0" + time.getMinutes()).substr(-2);
      let sec = ("0" + time.getSeconds()).substr(-2);
      return `${year}/${month}/${date} ${min}:${sec}`;
    }
  },
  created() {
    this.$store.dispatch("orders/loadOrders");
  }
};
</script>

<style lang="sass" src="./style.sass" scoped></style>
