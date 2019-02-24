<template>
  <div class="signup">

    <el-row :gutter="30" type="flex" justify="center">
      <el-col :xs="24" :sm="12">
        <el-form status-icon :rules="rules" ref="ruleForm"
          label-position="top" label-width="80px"
          :model="form">
          <el-form-item label="姓名" prop="username">
            <el-input @keyup.enter.native="nextInput('inputEmail')"
              v-model="form.username"></el-input>
          </el-form-item>
          <el-form-item label="信箱" prop="email">
            <el-input @keyup.enter.native="nextInput('inputPassword')"
              ref="inputEmail" v-model="form.email"></el-input>
          </el-form-item>
          <el-form-item label="密碼" prop="password">
            <el-input @keyup.enter.native="nextInput('inputPasswordCheck')"
              ref="inputPassword" type="password"
              v-model="form.password"></el-input>
          </el-form-item>
          <el-form-item label="密碼確認" prop="passwordCheck">
            <el-input @keyup.enter.native="submitForm"
              ref="inputPasswordCheck" type="password"
              v-model="form.passwordCheck"></el-input>
          </el-form-item>

          <el-button :disabled="loading" type="primary"
            @click="submitForm">註冊</el-button>
        </el-form>
      </el-col>
    </el-row>

  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "signup",
  data() {
    return {
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
            required: true,
            validator: this.checkPasswordFn,
            trigger: "change"
          }
        ]
      }
    };
  },
  computed: {
    ...mapGetters({
      loading: "loading"
    })
  },
  methods: {
    nextInput(target) {
      const next = this.$refs[target];
      if (!next || !next.focus) return;
      this.$refs[target].focus();
    },
    submitForm() {
      this.$store.dispatch("updateLoading", true, { root: true });
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          const userData = {
            username: this.form.username,
            email: this.form.email,
            password: this.form.password
          };
          this.$store.dispatch("auth/register", userData);
        } else {
          console.log("error submit!!");
          this.$store.dispatch("updateLoading", false, { root: true });
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
