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
          <label for>重复密码:</label>
          <input type="password" v-model="userInfo.pwsAgain" @input="validataPwdAgain()" />
        </div>
        <FormError :msg="error.pwsAgain" />
      </div>
      <div class="form-item">
        <div class="input">
          <label for>昵称:</label>
          <input
            type="text"
            v-model="userInfo.nickname"
            @input="validataEmpty('nickname', '请输入昵称')"
          />
        </div>
        <FormError :msg="error.nickname" />
      </div>
      <div class="form-item">
        <div class="input">
          <label for></label>
          <button>注册</button>
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
        pwsAgain: "",
        nickname: "",
      },
      error: {
        loginId: "",
        loginPwd: "",
        pwsAgain: "",
        nickname: "",
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
    validataPwdAgain() {
      let result = this.validataEmpty("pwsAgain", "重复密码不能为空");
      if (result) {
        if (this.userInfo.loginPwd !== this.userInfo.pwsAgain) {
          this.error.pwsAgain = "两次密码不一致";
          return false;
        }
        return true;
      }
      return false;
    },
    async handleSubmit() {
      if (
        this.validataEmpty("loginId", "账号不能为空") &
        this.validataEmpty("loginPwd", "密码不能为空") &
        this.validataPwdAgain() &
        this.validataEmpty("nickname", "请输入昵称")
      ) {
        let resp = await reg(this.userInfo);
        console.log(resp);
        if (resp.data.code == 0) {
          alert("注册成功！！");
          this.$router.push({
            name: "log",
          });
        } else {
          this.error.server = resp.data.msg;
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