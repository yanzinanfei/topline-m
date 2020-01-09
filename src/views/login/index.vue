<template>
  <div class="login-container">
    <!-- 导航栏开始 -->
    <van-nav-bar title="登录" />
    <!-- 导航栏结束 -->
    <!-- 登录表单开始 -->
    <van-cell-group>
      <van-field v-model="user.mobile" class="iconfont icon-shouji" clearable placeholder="请输入手机号" />
      <van-field v-model="user.code" class="iconfont icon-iconfontmima1" placeholder="请输入验证码">
        <van-button slot="button" size="small" type="primary" round>发送验证码</van-button>
      </van-field>
    </van-cell-group>
    <!-- 登录表单结束 -->
    <!-- 登录按钮 -->
    <div class="login-btn-wrap">
      <van-button type="info" @click="onLogin">登录</van-button>
    </div>
    <!-- 登录按钮 -->
  </div>
</template>

<script>
import request from '@/utils/request'
export default {
  name: 'LoginPage',
  data () {
    return {
      user: {
        mobile: '', // 手机号
        code: '' // 验证码
      }
    }
  },
  methods: {
    async onLogin () {
      // 1.获取表单数据
      const user = this.user
      // 2.表单验证

      // 开启登录中 loading
      this.$toast.loading({
        duration: 0, // 持续展示 toast
        forbidClick: true,
        message: '登录中....' // 是否禁止北京点击
      })

      // 3.请求登录
      try {
        const res = await request({
          method: 'POST',
          url: '/app/v1_0/authorizations',
          // headers: {}, // 请求头参数
          // params: {}, // Query 查询参数
          data: user // body 请求体参数
        })
        console.log(res)
        // 提示成功
        this.$toast.success('登录成功')
      } catch (err) {
        console.log('登录失败', err)
        this.$toast.fail('登录失败')
      }
    } // 4.根据后端返回结果执行后续业务处理
  }
}
</script>

<style lang='less' scoped>
.login-container {
  .login-btn-wrap {
    padding: 27px 16px;
    .van-button {
      width: 100%;
      background-color: #6db4fb;
    }
  }
}
</style>
