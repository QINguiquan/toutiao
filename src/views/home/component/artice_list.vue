<template>
  <div class="article_list">
    <van-pull-refresh
      v-model="isLoading"
      @refresh="onRefresh"
      :success-text="successtext"
      success-duration="1000"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
        @load="onLoad"
      >     
        <ArcticleItem v-for="(article,index) in list" :key="index" :article="article"></ArcticleItem> 

      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticles } from "@/api/articelist";
import ArcticleItem from "@/components/ArticleItem.vue";

export default {
  name: "ArticeList",
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      timestamp: 1556789000001,
      error: false,
      isLoading: false,
      successtext: "",
    };
  },
  props: {
    channel: {
      type: Object,
      required: true,
    },
  },
  methods: {
    // onLoad() {
    // // 异步更新数据
    // // setTimeout 仅做示例，真实场景中一般为 ajax 请求
    // setTimeout(() => {
    //   for (let i = 0; i < 10; i++) {
    //     this.list.push(this.list.length + 1);
    //   }

    //   // 加载状态结束
    //   this.loading = false;

    //   // 数据全部加载完成
    //   if (this.list.length >= 40) {
    //     this.finished = true;
    //   }
    // }, 1000);
    // },
    async onLoad() {
      try {
        const { data } = await getArticles({
          channel_id: this.channel.id,
          timestamp: this.timestamp,
          with_top: 1,
        });
        // console.log(data);
        // if (Math.random() > 0.5) {
        //   JSON.parse("ASDIFLSDQ");
        // }

        const { results } = data.data;
        this.list.push(...results);
        this.loading = false;
        if (results.length) {
          this.timestamp = data.data.pre_timestamp;
        } else {
          this.finished = true;
        }
      } catch (error) {
        this.error = true;
        this.loading = false;
        // console.log("文章列表请求失败",error);
      }
    },
    async onRefresh() {
      try {
        const { data } = await getArticles({
          channel_id: this.channel.id,
          timestamp: (this.timestamp = this.timestamp + 1), //data用不了  手动+1
          with_top: 1,
        });
        //

        // console.log(data);
        const { results } = data.data;
        this.list.unshift(...results);
        this.isLoading = false;
        this.successtext = `更新了${results.length}条数据`;
      } catch (error) {
        this.isLoading = false;
        this.successtext = "更新失败，请重试";
      }
    },
  },
  components: {
    ArcticleItem,
  },
};
</script>

<style lang="less" scoped>
.article_list {
  height: 79vh;
  overflow-y: auto;
}
</style>