<template>
  <div class="my-continer">
    <div class="header not-login">
      <div class="login-btn" @click="$router.push('/login')">
        <img class="mobile-img" src="@/assets/mobile.png" alt="" />
        <span class="text">登录/注册</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MyIndex",
};
</script>

<style lang="less" scoped>
.my-continer {
  .header {
    height: 360px;
    background: url("@/assets/banner.png");
    // 缩放充满盒子
    background-size: cover;    
    display: flex;
    justify-content: center;
    align-content: center;
    .login-btn {
    display: flex;
    justify-content: center;
    align-content: center;
    // 子盒子上下排
    flex-direction: column;
    .mobile-img{
      width: 132px;
      height: 132px;
      margin-bottom: 15px;
    }
    .text{
      font-size: 28px;
      color: #fff;
    }
    }
  }
  
}
</style>