<template>
  <div class="home-continer">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar" fixed>
      <van-button class="search-btn" slot="title" type="info" size="small" round icon="search"
      >搜索
      </van-button>
    </van-nav-bar>

    <!-- 频道列表 -->
    <van-tabs class="channel-tabs" v-model="active" animated swipeable >
      <van-tab v-for="channels in channels" :key="channels.id" :title="channels.name" >
        
        
        <ArticeList :channel="channels" ></ArticeList>
        
      </van-tab>
      
      <div slot="nav-right" class="placeholedr"></div>
      <div slot="nav-right" class="hamburger-btn" @click="isshow=true">
        <i class="iconfont icon-gengduo"></i>
      </div>
    </van-tabs>

    <!-- 频道列表弹出层 -->
    <van-popup
      v-model="isshow"
      closeable
      position="bottom"
      close-icon-position="top-left"
      :style="{ height:'100%'}"
    >
    <ChennelEdit :chennel="channels" :active="active" @updata-active="onupdataactive"></ChennelEdit>
    </van-popup>


  </div>
</template>

<script>
import{getUserChannerls} from '@/api/login'
import { Toast } from 'vant';
import ArticeList from './component/artice_list.vue'
import ChennelEdit from './component/chenneledit.vue'
export default {
  name: "HomeIndex",
  data() {
    return {
      active:0,
      channels:[], 
      isshow:false, //编辑列表弹出层
      index:''
    }; 
  },
  methods:{      
    async fn(){
      try {
         const {data} = await getUserChannerls()
         this.channels=data.data.channels
        // console.log(data);
        
      } catch (error) {
        Toast('数据请求失败');
      }

    },
    onupdataactive(index,isshow=true){
      this.active=index
      this.isshow=isshow
    }
  },
  created(){
    this.fn()
  },
  components:{
    ArticeList,
    ChennelEdit,
  }
};
</script>

<style  lang="less" scoped>
.home-continer {
  padding-top: 174px;
  padding-bottom: 100px;
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
  /deep/.channel-tabs{
   
    .van-tabs__wrap{
      height: 82px;
      position: fixed;
      top: 92px;
      left: 0;
      right: 0;
      z-index: 1;
    }
    .van-tab{
      min-width: 200px;
      border-right: 1px solid #edeff3;
      font-size: 30px;
      color: #777777;
    }
    .van-tab--active{
      color: #333333;
    }
    .van-tabs__nav{
      padding-bottom: 0;
    }
    .van-tabs__line{
      bottom: 8px;
      width: 33px !important;
      height: 6px !important;
      background-color: #3296fa;
    }
    .hamburger-btn{
      position: fixed;
      right: 0;
      display: flex;
      justify-content: center;
      align-items:center;
      width: 66px;
      height: 82px;
      background-color: #fff;
      opacity: 0.902;
      .iconfont{
        font-size: 33px;

      }
      &:before{
        content: '';
        position: absolute;
        left: 0;
        width: 1px;
        height: 100%;
        background-image: url(../../assets/gradient-gray-line.png);
        background-size: contain;
      }
    }
    .placeholedr{
      // 不参与flex容器空间大小计算 1是参与
      flex-shrink: 0;
      width: 66px;
      height: 82px;
    }
    
 
  }
}

</style>