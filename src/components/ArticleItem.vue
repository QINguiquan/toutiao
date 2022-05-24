<template>
  <van-cell class="article-item">
    <!-- 标题 -->
    <div class="title van-multi-ellipsis--l2" slot="title">{{ article.title }}</div>

    <!-- 文章详情和图片 -->
    <div slot="label">
      <div v-if="article.cover.type === 3" class="cover-wrap">
        <div class="cover-item" v-for="(img, index) in article.cover.images"
            :key="index">
          <van-image
            class="cover-item-img"
            fit="cover"           
            :src="img"
          />
        </div>
      </div>
      <div class="label-info-wrap">
        <span>{{ article.aut_name }}</span>
        <span>{{ article.comm_count }}</span>
        <span>{{ article.pubdate | relativeTime}}</span>
      </div>
    </div>

    <!-- 右侧图片 -->
    <van-image
      slot="default"
      class="right-cover"
      fit="cover" 
      v-if="article.cover.type === 1"
      :src="article.cover.images[0]"
    />
  </van-cell>
</template>

<script>
export default {
  name: "ArcticleItem",
  data() {
    return {};
  },

  props: {
    article: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="less" scoped>
.article-item {
  .title {
    font-size: 32px;
    color: #3a3a3a;
  }
  .van-call__value {
    flex: unset;
    width: 232px;
    height: 146px;
    padding-left: 25px;
  }
  .right-cover {
    width: 232px;
    height: 146px;
  }
  .label-info-wrap span{
      font-size: 22px;
      color: #b4b4b4;
      margin-right: 25px;

  }
  .cover-wrap{
      padding: 30px 0;
      display: flex;
    .cover-item{
    flex: 1;
    height: 146px;
    &:not(:last-child){
        padding-right: 4px;
    }
    .cover-item-img{
        width: 100%;
        height: 146px;
    }
    }
  }
}
</style>