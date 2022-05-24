<template>
  <!-- 列表编辑按钮页面 -->
  <div class="chennel-edit">
    <!-- 我的频道 -->
    <van-cell :border="false">
      <div slot="title" class="title-text">我的频道</div>
      <van-button type="danger" plain round size="mini" class="edit-btn"
      @click="isedit=!isedit"
        >{{isedit?'完成':"编辑"}}</van-button
      >
    </van-cell>
    <van-grid :gutter="10" class="my-grid">
      <van-grid-item
        class="grid-item"
        v-for="(mychennel, index) in chennel"
        :key="index"
        @click="onmychanelfn(mychennel,index)"
      >
        <van-icon slot="icon" name="clear" v-show="isedit&&!fileid.includes(mychennel.id)"></van-icon>
        <span class="text" slot="text" :class="{ active: active === index }">{{
          mychennel.name
        }}</span>
      </van-grid-item>
    </van-grid>

    <!-- 推荐频道 -->
    <van-cell :border="false">
      <div slot="title">推荐频道</div>
    </van-cell>
    <van-grid class="recommed-grid" :gutter="10">
      <van-grid-item
        class="grid-item"
        v-for="(channel, index) in recommendChannel"
        :key="index"
        icon="plus"
        :text="channel.name"
        @click="onChannel(channel)"
      />
    </van-grid>
  </div>
</template>

<script>
import { getAllChennels } from "@/api/chennel";
import { Toast } from "vant";
export default {
  name: "ChennelEdit",
  data() {
    return {
      AllChennels: [],
      isedit:false,
      fileid:[0],
    };
  },
  props: {
    chennel: {
      type: Array,
      required: true,
    },
    active: {
      type: Number,
      required: true,
    },
  },
  created() {
    this.getAllChennelsfn();
  },
  methods: {
    async getAllChennelsfn() {
      try {
        const { data } = await getAllChennels();
        this.AllChennels = data.data.channels;
        console.log(this.AllChennels);
      } catch (error) {
        Toast("所有列表请求失败");
      }
    },
    onChannel(chennel) {
      // 添加到我的频道中会重新走computed 推荐列表就没有了
      this.chennel.push(chennel);
    },
    onmychanelfn(chennel, index){
        if(this.isedit){
            if(this.fileid.includes(chennel.id)){
                return 
            }
           if(index <= this.active){
            this.$emit('updata-active',this.active-1, true)
           }
           this.chennel.splice(index,1)
           
        }
        else{
            this.$emit('updata-active',index,false )            
        }
    },
  },
  computed: {
    recommendChannel() {
      const chennels = [];
      this.AllChennels.forEach((Allobj) => {
        const res = this.chennel.find((obj) => {
          return obj.id === Allobj.id;
        });
        if (!res) {
          chennels.push(Allobj);
        }
      });

      return chennels;
    },
  },
};
</script>

<style lang="less" scoped>
.chennel-edit {
  padding: 85px 0;
  .title-text {
    font-size: 32px;
    color: #333333;
  }
  .edit-btn {
    width: 104px;
    height: 48px;
    font-size: 26px;
    color: #f85959;
    border: 1px solid #f85959;
  }
  /deep/.grid-item {
    width: 160px;
    height: 86px;
    .van-grid-item__content {
      white-space: nowrap;
      background-color: #f4f5f6;
      .van-grid-item__text,
      .text {
        font-size: 28px;
        color: #222;
        margin-top: 0;
      }
      .active {
        color: red;
      }
      .van-grid-item__icon-wrapper {
        position: unset;
      }
    }
  }
  /deep/.my-grid {
    .grid-item {
      .van-icon-clear {
        position: absolute;
        right: -10px;
        top: -10px;
        font-size: 30px;
        color: #cacaca;
        z-index: 2;
      }
    }
  }
  /deep/ .recommed-grid {
    .grid-item {
      .van-grid-item__content {
        flex-direction: row;
        .van-icon-plus {
          font-size: 28px;
          margin-right: 6px;
        }
      }
    }
  }
}
</style> 