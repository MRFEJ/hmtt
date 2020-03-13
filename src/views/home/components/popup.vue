<template>
  <van-popup
  @closed="close"
    close-icon-position="top-left"
    v-model="show"
    closeable
    position="left"
    :style="{ width:'85%',height: '100%' }"
  >
    <div class="b_top">
      <div class="b_title">
        <span>我的频道</span>
        <van-button color="#f97979" round plain size="mini" @click="isok=!isok">{{isok? '完成':'编辑'}}</van-button>
      </div>
      <div class="b_body">
        <template v-for="(item, index) in pd_list">
          <van-tag type="primary" size="large" :key="index" v-if="index!=0">
            {{item.name}}
            <van-icon @click="edEit(item)" v-if="isok" name="clear" color="skyblue" />
          </van-tag>
        </template>
      </div>
    </div>
    <div class="b_top">
      <div class="b_title">
        <span>频道推荐</span>
      </div>
      <div class="b_body">
        <template v-for="(item, index) in otherList">
          <van-tag @click="addName(item)" type="primary" size="large" :key="index" v-if="index!=0">
            <van-icon name="plus" />
            {{item.name}}
          </van-tag>
        </template>
      </div>
    </div>
  </van-popup>
</template>

<script>
import { userAllChannels, addChannels } from "@/api/home";
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
      allList: [],
      isok: false
    };
  },
  async created() {
    let res = await userAllChannels();
    //   window.console.log(res);
    this.allList = res.data.channels;
  },
  // 利用计算属性的特点 依赖的值改变 就会重新执行一遍 计算属性函数里面的代码
  computed: {
    otherList() {
      let ids = this.pd_list.map(item => {
        return item.id;
      });

      return this.allList.filter(item => {
        return !ids.includes(item.id);
      });
    }
  },
  methods: {
    // 关闭弹出层执行的函数
    close(){
      this.isok=false;
    },
    // 点击删除频道
    edEit(item) {
      for (let i = 0; i < this.pd_list.length; i++) {
        if (this.pd_list[i].id == item.id) {
          this.pd_list.splice(i, 1);
        }
      }

      let channels = this.pd_list.slice(1).map((item, index) => {
        return {
          id: item.id,
          seq: index + 1
        };
      });
      // 发送请求
      addChannels({ channels });
    },
    // 点击添加频道
    addName(item) {
      this.$set(item, "loading", false);
      // item.finished = false;
      this.$set(item, "finished", false);

      // item.list = [];
      this.$set(item, "list", []);

      // item.isLoading = false;
      this.$set(item, "isLoading", false);

      item.pre_data = Date.now();

      // 把传过来的频道添加到我的频道列表里面
      this.pd_list.push(item);

      // for (let i = 0; i < this.otherList.length; i++) {
      //   if (item.id == this.otherList[i].id) {
      //     this.otherList.splice(i, 1);
      //   }
      // }
      // 因为后台要的是没有推荐频道的数据 所以这里要过滤掉第一个推荐
      let channels = this.pd_list.slice(1).map((item, index) => {
        return {
          id: item.id,
          seq: index + 1
        };
      });
      // 发送请求
      addChannels({ channels });
    }
  }
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
      position: relative;
      i.van-icon.van-icon-clear {
        position: absolute;
        top: -8px;
        right: -8px;
      }
    }
  }
}
</style>