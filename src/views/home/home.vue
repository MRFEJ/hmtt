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
              <van-cell border v-for="(it,index) in item.list" :key="index">
                <template slot="title">
                  <van-grid :border="false" :column-num="3" v-if="it.cover.type==3">
                    <div class="title">{{it.title}}</div>
                    <van-grid-item v-for="(item, index) in it.cover.images" :key="index">
                      <van-image :src="item" />
                    </van-grid-item>
                  </van-grid>

                  <div class="one" v-if="it.cover.type==1">
                    <span class="title">{{it.title}}</span>
                    <van-image :src="it.cover.images[0]" />
                  </div>

                  <div class="writer">
                    <div>
                      <span>{{it.aut_name}}</span>
                      <span>{{it.comm_count}}评论</span>
                      <span>{{it.pubdate | filterData}}</span>
                    </div>
                    <div class="icon">
                      <van-icon name="cross" />
                    </div>
                  </div>
                </template>
              </van-cell>
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
import popup from "./components/popup";
export default {
  name: "home",
  components: {
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
    // 获取用户频道
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
      window.console.log(res);

      if (arr.length == 0) {
        item.finished = true;
      } else {
        item.list.push(...arr);

        // window.console.log(res);
        item.pre_data = res.data.pre_timestamp;

        item.loading = false;
      }
    },

    // 下拉列表刷新的函数
    async onRefresh(item) {
      item.loading = false;
      item.finished = false;
      item.pre_data = Date.now();

      let res = await userArticles({
        channel_id: item.id,
        timestamp: item.pre_data,
        with_top: 0
      });

      item.list = res.data.results;

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
    .van-cell {
      .van-cell__title {
        .title {
          font-size: 16px;
          font-weight: 500;
          color: #3a3a3a;
          letter-spacing: 1px;
          font-stretch: normal;
          padding: 8px 12px;
          -ms-flex-preferred-size: 70%;
          flex-basis: 70%;
          text-align: left;
        }
        .van-image {
          height: 73px;
        }
        .one {
          display: flex;
          justify-content: space-between;
          margin-bottom: 16px;
          .van-image{
            width: 116px;
            height: 73px;
          }
        }
        .writer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          div {
            span {
              margin-right: 5px;
            }
          }
        }
        .icon {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 23px;
          height: 15px;
          border: 0.5px solid #edeff3;
        }
      }
    }
  }
}
</style>