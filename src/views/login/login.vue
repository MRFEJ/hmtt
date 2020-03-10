<template>
  <div class="box">
    <van-nav-bar title="登录" />
    <van-field v-model="form.mobile" type="mobile" label="手机号" :error-message="vali.mobile">
      <template slot="left-icon">
        <i class="iconfont icon-iphone"></i>
      </template>
    </van-field>
    <van-field v-model="form.code" type="code" label="验证码" :error-message="vali.code">
      <template slot="left-icon">
        <i class="iconfont icon-lock"></i>
      </template>

      <van-button round slot="button" size="small">发送验证码</van-button>
    </van-field>
    <van-button :loading="isok" loading-text="登录中..." type="info" @click="goLogin">登录</van-button>
  </div>
</template>

<script>
import { setToken } from "@/utils/token";
import { login } from "@/api/login.js";
export default {
  data() {
    return {
      isok: false,
      form: {
        mobile: "18511111111",
        code: "246810"
      },
      vali: {
        mobile: "",
        code: ""
      }
    };
  },
  methods: {
    async goLogin() {
      if (this.ok()) {
        this.isok = true;
        try {
          let res = await login(this.form);
          // window.console.log(res);
          this.$store.commit("myToken", res.data.token);
          this.$store.commit("resToken", res.data.refresh_token);
          setToken("myToken", JSON.stringify(res.data.token));
          setToken("resToken", JSON.stringify(res.data.refresh_token));
          this.$toast.success("登录成功");
          this.$router.push("/home");
        } catch (error) {
          //   window.console.log("手机号或验证码错误");
          this.$toast.fail("手机号或验证码错误");
        } finally {
          this.isok = false;
        }
      }
    },
    ok() {
      let isok = true;
      if (/0?(13|14|15|18)[0-9]{9}/.test(this.form.mobile)) {
        this.vali.mobile = "";
      } else {
        isok = false;
        this.vali.mobile = "手机号格式错误";
      }

      if (this.form.code.length != 6) {
        isok = false;
        this.vali.code = "验证码格式错误";
      } else {
        this.vali.code = "";
      }

      return isok;
    }
  }
};
</script>

<style lang="less" scoped>
.van-nav-bar.van-hairline--bottom {
  background-color: #1989fa;
  .van-nav-bar__title.van-ellipsis {
    color: #fff;
  }
}
button.van-button.van-button--default.van-button--small.van-button--round {
  background-color: #ededed;
}
button.van-button.van-button--info.van-button--normal {
  width: 90%;
  display: block;
  margin: 30px auto;
}
</style>