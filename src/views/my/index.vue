<template>
  <div class="my-continer">
    <!-- 已登录 -->
    <div class="header user-info" v-if="user">
      <div class="base-info">
        <div class="left">
          <van-image
            class="avatar"
            round
            fit="cover"
            :src="userInfo.photo"
          />
          <span class="name">{{userInfo.name}}</span>
        </div> 

        <div class="right">
          <van-button size="mini" round>编辑资料</van-button>
        </div>
      </div>
      <div class="data-stats">
        <div class="data-item">
          <span class="count">{{userInfo.art_count}}</span>
          <span class="text">头条</span>
        </div>
        <div class="data-item">
          <span class="count">{{userInfo.follow_count}}</span>
          <span class="text">关注</span>
        </div>
        <div class="data-item">
          <span class="count">{{userInfo.fans_count}}</span>
          <span class="text">粉丝</span>
        </div>
        <div class="data-item">
          <span class="count">{{userInfo.like_count}}</span>
          <span class="text">点赞</span>
        </div>
      </div>
    </div>
    <!-- 未登录 -->
    <div class="header not-login" v-else>
      <div class="login-btn" @click="$router.push('/login')">
        <img class="mobile-img" src="@/assets/mobile.png" alt="" />
        <span class="text">登录/注册</span>
      </div>
    </div>
    <!-- 宫格导航 -->
    <van-grid class="grid-nav mb-9" column-num="2" clickable>
      <van-grid-item class="grid-nav-item">
        <i slot="icon" class="iconfont icon-shoucang"></i>
        <span slot="text" class="text">收藏</span>
      </van-grid-item>
      <van-grid-item class="grid-nav-item">
        <i slot="icon" class="iconfont icon-lishi"></i>
        <span slot="text" class="text">历史</span>
      </van-grid-item>
    </van-grid>
    <van-cell title="消息通知" is-link />
    <van-cell class="mb-9" title="小智同学" is-link />
    <van-cell
      class="logout-cell"
      clickable
      title="退出登录"
      v-if="user"
      @click="onLogout"
    />
  </div>
</template>

<script>
import { mapState } from "vuex";
import {getUserInfo} from '@/api/login'
import { Toast } from 'vant';


export default {
  name: "MyIndex",
  data(){
    return {
      userInfo:{}

    }
  },
  computed: {
    ...mapState(["user"]),
  },
  created(){
    if(this.user){
       this.loadUserInfo()
    }

  },
  methods: {
    onLogout() {
      // this.$dialog.confirm  要用this.$dialog

      this.$dialog
        .confirm({
          title: "确认退出吗？",
        })
        .then(() => {
         this.$store.commit('setUser',null)
        })
        .catch(() => {
          // on cancel
          console.log("no");
        });
    },
    async loadUserInfo(){     
      try {
        const {data} =await getUserInfo()
        this.userInfo=data.data 
        console.log(this.userInfo);
      } catch (error) {
         Toast('获取数据失败，请稍后重试')
        
      } 

    }
  },
};
</script>

<style lang="less" scoped>
.my-continer {
  .header {
    height: 360px;
    background: url("@/assets/banner.png");
    // 缩放充满盒子
    background-size: cover;
  }
  .not-login {
    display: flex;
    justify-content: center;
    align-content: center;
    .login-btn {
      display: flex;
      justify-content: center;
      align-content: center;
      // 子盒子上下排
      flex-direction: column;
      .mobile-img {
        width: 132px;
        height: 132px;
        margin-bottom: 15px;
      }
      .text {
        font-size: 28px;
        color: #fff;
      }
    }
  }
  .user-info {
    .base-info {
      height: 231px;
      padding: 76px 32px 23px;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .left {
        display: flex;

        align-items: center;
        .avatar {
          width: 132px;
          height: 132px;
          margin-right: 23px;
          border: 4px solid #fff;
        }
        .name {
          font-size: 30px;
          color: #fff;
        }
      }
    }
    .data-stats {
      display: flex;
      .data-item {
        height: 130px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        flex: 1;
        color: #fff;
        .count {
          font-size: 36px;
        }
        .text {
          font-size: 23px;
        }
      }
    }
  }
  .grid-nav {
    .grid-nav-item {
      height: 140px;
      i.iconfont {
        font-size: 45px;
      }
      .icon-shoucang {
        color: #eb5253;
      }
      .icon-lishi {
        color: #ff9d1d;
      }
      span.text {
        font-size: 28px;
      }
    }
  }
  .logout-cell {
    text-align: center;
    color: #d86262;
  }
  .mb-9 {
    margin-bottom: 9px;
  }
}
</style> 