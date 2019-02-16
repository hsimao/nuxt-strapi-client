<template>
  <div class="signup">
    <el-form status-icon :rules="rules" ref="ruleForm"
      label-position="top" label-width="80px"
      :model="form" class="hi">
      <el-form-item label="姓名" prop="username">
        <el-input v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item label="信箱" prop="email">
        <el-input v-model="form.email"></el-input>
      </el-form-item>
      <el-form-item label="密碼" prop="password">
        <el-input type="password" v-model="form.password"></el-input>
      </el-form-item>
      <el-form-item label="密碼" prop="passwordCheck">
        <el-input type="password" v-model="form.passwordCheck"></el-input>
      </el-form-item>

      <el-button :disabled="loading" type="primary"
        @click="submitForm">註冊</el-button>
      <!-- <el-button @click="resetForm('ruleForm')">重置</el-button> -->
    </el-form>
  </div>
</template>

<script>
export default {
  name: "signup",
  data() {
    return {
      loading: false,
      form: {
        username: "",
        email: "",
        password: "",
        passwordCheck: ""
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
        ],
        passwordCheck: [
          {
            validator: this.checkPasswordFn,
            trigger: "change"
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
            username: this.form.username,
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
    // 驗證第二次輸入密碼是否相同
    checkPasswordFn(rule, val, callback) {
      if (val === "") {
        callback(new Error("請再次輸入密碼"));
      } else if (val !== this.form.password) {
        callback(new Error("兩次密碼輸入不一致"));
      } else {
        callback();
      }
    }
  }
};
</script>

<style lang="sass" src="./style.sass" scoped></style>
