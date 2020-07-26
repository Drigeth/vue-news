<template>
  <div>
    <div class="type-title">{{channelName}}</div>
    <Loading v-show="isLoading" />
    <NewsList v-show="!isLoading" :news="news" />
    <Pager
      :page="page"
      :limit="limit"
      :total="total"
      :panelNumber="panelNumber"
      @pageChange="handleChange"
    />
  </div>
</template>

<script>
import NewsList from "../components/NewsList/NewsList";
import Pager from "../components/Pager/Pager";
import * as newsServ from "../services/newsService";
import Loading from "../components/Loading/Loading";
export default {
  components: {
    Pager,
    NewsList,
    Loading
  },
  data() {
    return {
      limit: 15,
      total: 0,
      panelNumber: 10,
      news: [],
      isloading: true
    };
  },
  computed: {
    page() {
      return +this.$route.query.page || 1;
    },
    channelName(){
      let channels = this.$store.state.channels.data
      if(channels.length > 0){
        var channel = channels.find(item => item.channelId === this.$route.params.id)
        return channel.name
      }
      return ""
    }
  },
  methods: {
    handleChange(newPage) {
      // console.log(newPage)
      this.$router.push("?page=" + newPage);
      this.setDatas();
    },
    async setDatas() {
      this.isLoading = true;
      var resp = await newsServ.getNews(
        this.$route.params.id,
        this.page,
        this.limit
      );
      this.total = resp.allNum;
      this.news = resp.contentlist;
      this.isLoading = false;
      // console.log(resp)
    }
  },
  watch: {
    // 监控数据的变化
    "$route.params.id": {
      immediate: true,
      handler() {
        this.setDatas();
      }
    }
  }
};
</script>

<style scoped>
.type-title {
  font-size: 2em;
  color: #888;
  border-bottom: 1px solid #ccc;
  padding-bottom: 10px;
  margin-top: 20px;
}
</style>