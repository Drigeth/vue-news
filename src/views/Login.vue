<template>
  <Center>
    <form action class="login-container" @submit.prevent="handleSubmit">
      <div class="form-item">
        <div class="input">
          <label for>账号:</label>
          <input type="text" v-model="userInfo.loginId" @input="validataEmpty('loginId', '账号不能为空')" />
        </div>
        <FormError :msg="error.loginId" />
      </div>
      <div class="form-item">
        <div class="input">
          <label for>密码:</label>
          <input
            type="password"
            v-model="userInfo.loginPwd"
            @input="validataEmpty('loginPwd', '密码不能为空')"
          />
        </div>
        <FormError :msg="error.loginPwd" />
      </div>
      <div class="form-item">
        <div class="input">
          <label for></label>
          <button>{{$store.state.loginUser.isLoading ? "isloading..":"登录"}}</button>
        </div>
        <FormError :isCenter="true" :msg="error.server" />
      </div>
    </form>
  </Center>
</template>

<script>
import Center from "../components/Center/Center";
import FormError from "../components/FormError/FormError";
import { reg } from "../services/userService";
export default {
  components: {
    Center,
    FormError,
  },
  data() {
    return {
      userInfo: {
        loginId: "",
        loginPwd: "",
      },
      error: {
        loginId: "",
        loginPwd: "",
        server: "",
      },
    };
  },
  methods: {
    validataEmpty(fidld, msg) {
      if (this.userInfo[fidld]) {
        this.error[fidld] = "";
        return true;
      } else {
        this.error[fidld] = msg;
        return false;
      }
    },
    async handleSubmit() {
      if (this.$store.state.loginUser.isLoading) {
        return;
      }
      if (
        this.validataEmpty("loginId", "账号不能为空") &
        this.validataEmpty("loginPwd", "密码不能为空")
      ) {
        let resp = await this.$store.dispatch("loginUser/login", this.userInfo);
        if (resp) {
          this.$router.push({ name: "home" });
        } else {
          this.error.server = "密码不正确";
        }
      }
    },
  },
};
</script>

<style scoped>
.login-container {
  width: 400px;
}
.form-item .input {
  display: flex;
}
.form-item label {
  width: 100px;
  display: inline-block;
  text-align: right;
  line-height: 41px;
  margin-right: 15px;
}
.form-item input,
.form-item button {
  flex-grow: 1;
}
</style>