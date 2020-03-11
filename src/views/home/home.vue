<template>
  <div class="home">
    <div class="h_top">
      <van-icon class="t_icon" name="wap-nav" />
      <van-search
        class="search"
        v-model="value"
        shape="round"
        background="#3194ff"
        placeholder="请输入搜索关键词"
      />
      <van-icon class="t_icon" name="search" />
    </div>
    <div class="dabel">
      <van-tabs v-model="active">
        <van-tab v-for="(item, index) in tabList" :key="index" :title="item.name">
          <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
            <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
              <van-cell v-for="item in list" :key="item" :title="item" />
            </van-list>
          </van-pull-refresh>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import { userChannels } from "@/api/home.js";
export default {
  data() {
    return {
      // 频道数组
      tabList: [],
      // 下拉刷新
      isLoading: false,
      active: "",
      value: "",
      list: [],
      // 列表数据下拉加载数据
      loading: false,
      // 是否加载完毕
      finished: false
    };
  },
  async created() {
    let res = await userChannels();
    window.console.log(res);
    this.tabList = res.data.channels;
  },
  methods: {
    // 列表数据加载执行的函数
    onLoad() {
      let arr = [
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12,
        13,
        14,
        15,
        16,
        17,
        18,
        19,
        20
      ];
      this.list.push(...arr);
      if (this.list.length > 100) {
        this.finished = true;
      }
      this.loading = false;
    },

    // 下拉列表刷新的函数
    onRefresh() {
      window.setTimeout(() => {
        this.isLoading = false;
      }, 1000);
    }
  }
};
</script>

<style lang="less" scoped>
.home {
  .h_top {
    display: flex;
    align-items: center;
    padding-left: 10px;
    padding-right: 10px;
    background-color: #3194ff;
    position: fixed;
    top: 0;
    z-index: 99;
    width: 100%;
    box-sizing: border-box;
    .search {
      flex: 1;
    }
    .t_icon {
      font-size: 25px;
      color: #fff;
    }
  }
  /deep/.van-tabs__wrap.van-hairline--top-bottom {
    width: 100%;
    position: fixed;
    z-index: 9;
    top: 54px;
  }
  .dabel {
    margin-top: 98px;
    margin-bottom: 50px;
}
}
</style>