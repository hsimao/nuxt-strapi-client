<template>
  <div class="signin">
    <el-row :gutter="30" type="flex" justify="center">
      <el-col :xs="24" :sm="12">
        <el-form status-icon :rules="rules" ref="ruleForm"
          label-position="top" label-width="80px"
          :model="form">
          <el-form-item label="信箱" prop="email">
            <el-input v-model="form.email"></el-input>
          </el-form-item>
          <el-form-item label="密碼" prop="password">
            <el-input type="password" v-model="form.password"></el-input>
          </el-form-item>
          <el-button :disabled="loading" type="primary"
            @click="submitForm">登入</el-button>
          <el-button @click="updateRouter">
            尚未註冊
          </el-button>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "signin",
  data() {
    return {
      loading: false,
      form: {
        username: "",
        email: "",
        password: ""
      },
      rules: {
        username: [
          { required: true, message: "姓名為必填欄位", trigger: "blur" }
        ],
        email: [
          {
            required: true,
            message: "信箱為必填欄位"
          },
          {
            type: "email",
            message: "信箱格式不正確",
            trigger: ["blur", "change"]
          }
        ],
        password: [
          {
            required: true,
            message: "請輸入密碼"
          },
          {
            min: 6,
            max: 20,
            message: "密碼長度須為6~20的字元內",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    submitForm() {
      // this.loading = true;
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          const userData = {
            email: this.form.email,
            password: this.form.password
          };
          this.$store.dispatch("auth/setUser", userData);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    updateRouter() {
      console.log("this.route", this.$route.path);
      this.$router.push("/signup");
      this.$store.dispatch("updateRouter", "/signup");
    }
  }
};
</script>

<style lang="sass" src="./style.sass" scoped></style>
