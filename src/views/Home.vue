<template>
  <div>
    <Banner :banners="banners" :duration="3000" />

    <Channels @change="handleChange" />
    <Loading v-show="isLoading" />
    <NewsList v-show="!isLoading" :news="news" />
  </div>
</template>

<script>
import Banner from "../components/Bannner/Banner";
import Channels from "../components/Channels/Channels";
import NewsList from "../components/NewsList/NewsList";
import { getNews } from "../services/newsService";
import Loading from "../components/Loading/Loading";
export default {
  components: {
    Banner,
    Channels,
    NewsList,
    Loading
  },
  data() {
    return {
      banners: [
        {
          url: require("../assets/imgs/banner1.jpg"),
          link: "https://baidu.com"
        },
        {
          url: require("../assets/imgs/banner2.jpg"),
          link: "https://baidu.com"
        },
        {
          url: require("../assets/imgs/banner3.jpg"),
          link: "https://baidu.com"
        }
      ],
      news: [],
      isLoading: true
    };
  },
  methods: {
    async handleChange(channelsId) {
      this.isLoading = true
      var resp = await getNews(channelsId, 1, 10);
      this.isLoading = false
      this.news = resp.contentlist;
    }
  }
};
</script>

<style>
</style>
   