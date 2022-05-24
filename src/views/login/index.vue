<template>
  <div class="login">
    <van-nav-bar title="登录" class="page-nav-bar">
      <!-- 返回原来的地方 -->
      <van-icon slot="left" name="cross" @click="$router.back()" />
    </van-nav-bar>

    
    <van-form ref="loginForm" @submit="onSubmit">
      <van-field
        v-model="user.mobile"
        name="mobile"
        placeholder="请输入手机号码"
        :rules="userFromRules.mobile"
        type="number"
        maxlength="11"
      >
        <i slot="left-icon" class="iconfont icon-shouji"></i>
      </van-field>

      <van-field
        v-model="user.code"
        name="code"
        placeholder="请输入验证码"
        :rules="userFromRules.code"
        type="number"
        maxlength="6"
      >
        <i slot="left-icon" class="iconfont icon-yanzhengma"></i>
        <template #button>
          <van-count-down
            v-if="isShow"
            :time="60000"
            format="ss s"
            @finish="isShow = false"
          />
          <van-button
            v-else
            round
            size="small"
            type="default"
            class="send-sms-btn"
            @click="sendSmss"
            native-type="button"
            >发送验证码</van-button
          >
        </template>
      </van-field>

      <div style="margin: 16px">
        <van-button block type="info" native-type="submit">登录</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { login, sendSm } from "@/api/login.js";
import { Toast } from 'vant';
export default {
  name: "LoginIndex",
  data() {
    return {
      isShow: false,
      user: {
        mobile: "",
        code: "",
      },
      userFromRules: {
        mobile: [
          {
            requirde: true,
            message: "手机号不能为空",
          },
          {
            pattern: /^1[3|5|7|8|9]\d{9}$/,
            message: "手机格式错误",
          },
        ],
        code: [
          {
            requirde: true,
            message: "请输入验证码",
          },
          {
            pattern: /^\d{6}$/,
            message: "验证码格式错误",
          },
        ],
      },
    };
  },
  methods: {
    async onSubmit() {
      const user = this.user;
      // 请求登录
      try {
        const {data} = await login(user)
        this.$store.commit('setUser',data.data)  
        Toast.success("登录成功");
        this.$router.back()
      } catch (err) {
        if (err.response.status === 400) {
          Toast("手机号码或者验证码错误", err);
        } else {
          Toast("请稍后重试");
        }
      }
    },

    async sendSmss() {
      try {
        await this.$refs.loginForm.validate("mobile");
      } catch (error) {
        return Toast("验证失败", error);
      }
      this.isShow = true;
      try {
        let ress = sendSm(this.user.mobile);
        await ress
        // this.$toast("发送成功");
        Toast('发送成功')
        // console.log(ress);
      } catch (error) {
        this.isShow = false;
        // console.log(error.response.status);
        if (error.response.status === 429) {          
          // this.$toast("验证码发送频繁");
          Toast('验证码发送频繁')
        } else {        
          // this.$toast("验证码发送失败", error);
          Toast('验证码发送失败')
        }
      }
    },
  },
};
</script>
 
<style scoped lang='less'>
.login {
  .iconfont {
    font-size: 37px;
  }
}

.send-sms-btn {
  width: 160px;
  height: 46px;
  line-height: 46px;
  font-size: 22px;
  background-color: #ededed;
}
</style>