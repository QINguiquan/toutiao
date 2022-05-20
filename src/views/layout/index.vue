<template>
  <div class="layout-container">   
    <!-- 子路由出口 -->
    <router-view></router-view>

    <van-tabbar class="layout-tabbar" route>
      <van-tabbar-item to="/">
        <i slot="icon" class="iconfont icon-shouye"></i>
        <span class="tetx">首页</span>
      </van-tabbar-item>

      <van-tabbar-item to="/qa">
        <i slot="icon" class="iconfont icon-wenda"></i>
        <span class="tetx">问答</span>
      </van-tabbar-item>

      <van-tabbar-item  to="/video">
        <i slot="icon" class="iconfont icon-shipin"></i>
        <span class="tetx">视频</span>
      </van-tabbar-item>

      <van-tabbar-item  to="/my">
        <i slot="icon" class="iconfont icon-wode"></i>
        <span class="tetx">{{$store.state.user?'我的':'未登录'}}</span>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: "LayoutIndex",
  data() {
    return {
     
    };
  },
};
</script>

<style lang="less" scoped>
.layout-container {
  .layout-tabbar {
    i.iconfont {
      font-size: 40px;
    }
    span.tetx{
        font-size: 20px;

    }
  }
}

</style>