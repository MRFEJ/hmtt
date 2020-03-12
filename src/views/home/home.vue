<template>
  <div class="home">
    <div class="h_top">
      <van-icon class="t_icon" name="wap-nav" @click="$refs.popup.show=true" />
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
      <van-tabs>
        <van-tab v-for="(item, index) in tabList" :key="index" :title="item.name">
          <van-pull-refresh v-model="item.isLoading" @refresh="onRefresh(item)">
            <van-list
              v-model="item.loading"
              :finished="item.finished"
              finished-text="没有更多了"
              @load="onLoad(item)"
            >
              <van-cell v-for="(it,index) in item.list" :key="index" :title="it.title" />
            </van-list>
          </van-pull-refresh>
        </van-tab>
      </van-tabs>
    </div>
    <!-- 弹出层 -->
    <popup :pd_list="tabList" ref="popup" />
  </div>
</template>

<script>
import { userChannels, userArticles } from "@/api/home.js";

// 弹出层
import popup from "./components/popup"
export default {
  components:{
    popup
  },
  data() {
    return {
      // 频道数组
      tabList: [],
      active: "",
      value: ""
    };
  },
  async created() {
    let res = await userChannels();
    // window.console.log(res);
    this.tabList = res.data.channels;
    this.tabList.forEach(item => {
      // item.loading = false;
      this.$set(item, "loading", false);
      // item.finished = false;
      this.$set(item, "finished", false);

      // item.list = [];
      this.$set(item, "list", []);

      // item.isLoading = false;
      this.$set(item, "isLoading", false);

      item.pre_data = Date.now();
    });
  },
  methods: {
    // 列表数据加载执行的函数
    async onLoad(item) {
      let res = await userArticles({
        channel_id: item.id,
        timestamp: item.pre_data,
        with_top: 0
      });

      let arr = res.data.results;
      // window.console.log(item.id,item.pre_data);

      if (arr.length == 0) {
        item.finished = true;
        // window.console.log("111");
      } else {
        item.list.push(...arr);

        window.console.log(res);
        item.pre_data = res.data.pre_timestamp;

        item.loading = false;
      }
    },

    // 下拉列表刷新的函数
    onRefresh(item) {
      item.loading = false;
      item.finished = false;
      item.list = [];
      item.pre_data = Date.now();
      this.onLoad(item);
      item.isLoading = false;
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