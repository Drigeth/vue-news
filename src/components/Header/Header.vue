<template>
  <div class="header">
    <div class="header-container">
      <div class="container">
        <div class="logo">
          <router-link :to="{ name: 'home'}">
            <img src="../../assets/imgs/logo.png" alt />
          </router-link>
        </div>
        <ul class="nav">
          <li>
            <router-link :to="{ name: 'home'}">首页</router-link>
          </li>
          <li v-for="item in data.slice(0, 5)" :key="item.channelId">
            <router-link
              :to="{
              name: 'channelNews',
              params:{
                id : item.channelId
              }
            }"
            >{{item.name}}</router-link>
          </li>
        </ul>
        <div class="user">
          <span v-if="isLogining">loading...</span>
          <template v-else-if="loginUser">
            <a href>{{loginUser.nickname}}</a>
            <a href @click.prevent="handleLoginOut">退出登录</a>
          </template>
          <template v-else>
            <router-link :to="{ name:'log' }">登录</router-link>
            <router-link :to="{ name:'reg' }">注册</router-link>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState("channels", ["data"], ["isLoading"]),
    ...mapState("loginUser", {
      loginUser: "data",
      isLogining: "isLoading",
    }),
  },
  methods: {
    handleLoginOut() {
      this.$store.dispatch("loginUser/loginOut");
      this.$router.push({
        name: "log",
      });
    },
  },
};
</script>

<style scoped>
.header {
  height: 60px;
}
.header-container {
  height: 60px;
  background: #000;
  color: #fff;
  line-height: 60px;
  position: fixed;
  z-index: 100;
  left: 0;
  top: 0;
  width: 100%;
  display: flex;
}
.container {
  display: flex;
}
.logo a {
  display: flex;
  align-items: center;
  height: 100%;
}
.logo img {
  width: 42px;
  height: 42px;
}
.nav {
  margin: 0 60px;
  display: flex;
  flex-grow: 1;
}
.nav a {
  display: block;
  padding: 0 30px;
}
.nav .router-link-exact-active {
  color: #fcb85f;
}
.user {
  font-size: 14px;
}
.user * {
  margin-left: 10px;
}
.header a {
  color: #fff;
}
</style>