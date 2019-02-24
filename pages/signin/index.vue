<template>
  <div class="signin">
    <el-row :gutter="30" type="flex" justify="center">
      <el-col :xs="24" :sm="12">
        <el-form status-icon :rules="rules" ref="ruleForm"
          label-position="top" label-width="80px"
          :model="form">
          <el-form-item label="信箱" prop="email">
            <el-input v-model="form.email"
              @keyup.enter.native="nextToPassword"></el-input>
          </el-form-item>
          <el-form-item label="密碼" prop="password">
            <el-input ref="inputPassword" type="password"
              v-model="form.password"
              @keyup.enter.native="submitForm"></el-input>
          </el-form-item>
          <el-button :disabled="loading" type="primary"
            @click="submitForm">登入</el-button>
          <el-button>
            <nuxt-link to="/signup">尚未註冊</nuxt-link>
          </el-button>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "signin",
  data() {
    return {
      form: {
        email: "",
        password: ""
      },
      rules: {
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
  computed: {
    ...mapGetters({
      loading: "loading"
    })
  },
  methods: {
    // 將 input password 設為焦點
    nextToPassword() {
      this.$refs.inputPassword.focus();
    },
    submitForm() {
      this.$store.dispatch("updateLoading", true, { root: true });
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          const userData = {
            email: this.form.email,
            password: this.form.password
          };
          this.$store.dispatch("auth/login", userData);
        } else {
          console.log("error submit!!");
          this.$store.dispatch("updateLoading", false, { root: true });
          return false;
        }
      });
    }
  }
};
</script>

<style lang="sass" src="./style.sass" scoped></style>
