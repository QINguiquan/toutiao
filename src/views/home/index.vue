<template>
  <div class="home-continer">
    <van-nav-bar class="page-nav-bar">
      <van-button class="search-btn" slot="title" type="info" size="small" round icon="search"
      >搜索</van-button></van-nav-bar>
  </div>
</template>

<script>
export default {
  name: "HomeIndex",
  data() {
    return {};
  },
};
</script>

<style  lang="less" scoped>
.home-continer {
  .page-nav-bar {   
    /deep/.van-nav-bar__title {
     max-width: unset;
     
    }
    .search-btn {
      width: 555px;
      height: 64px;
      background-color: #5babfb;
      border: none;
      font-size: 28px;  
      .van-icon{
        font-size: 32px;
      }
    }
  }
}
</style>