<template>
  <van-popup
    close-icon-position="top-left"
    v-model="show"
    closeable
    position="left"
    :style="{ width:'85%',height: '100%' }"
  >
    <div class="b_top">
      <div class="b_title">
        <span>我的频道</span>
        <van-button color="#f97979" round plain size="mini">编辑</van-button>
      </div>
      <div class="b_body">
        <template v-for="(item, index) in pd_list">
          <van-tag type="primary" size="large" :key="index" v-if="index!=0">{{item.name}}</van-tag>
        </template>
      </div>
    </div>
    <div class="b_top">
      <div class="b_title">
        <span>频道推荐</span>
      </div>
      <div class="b_body">
        <template v-for="(item, index) in allList">
          <van-tag type="primary" size="large" :key="index" v-if="index!=0">{{item.name}}</van-tag>
        </template>
      </div>
    </div>
  </van-popup>
</template>

<script>
import { userAllChannels } from "@/api/home";
export default {
  props: {
    pd_list: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      show: false,
      allList:[]
    };
  },
  async created() {
      let res=await userAllChannels()
    //   window.console.log(res);
    this.allList=res.data.channels
      
  },
};
</script>

<style lang="less" soped>
.van-popup.van-popup--left {
  padding-left: 10px;
  padding-right: 8px;
  box-sizing: border-box;
  .b_top {
    margin-top: 60px;
    .b_title {
      display: flex;
      justify-content: space-between;
      span {
        font-size: 400;
      }
    }
    span.van-tag.van-tag--primary {
      margin-top: 10px;
      margin-right: 10px;
    }
  }
}
</style>