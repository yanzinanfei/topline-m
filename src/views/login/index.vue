<template>
  <div class="login-container">
    <!-- 导航栏开始 -->
    <van-nav-bar title="登录" />
    <!-- 导航栏结束 -->
    <!-- 登录表单开始 -->
    <!--
      表单验证：
        1. 使用ValidationObserver 组件把需要验证的整个表单包起来
        2、使用ValidationProvider 组件把具体的表单元素包起来，例如input
    -->
    <ValidationObserver>
      <ValidationProvider name="手机号" rules="required" v-slot="{ errors }">
        <van-field
          v-model="user.mobile"
          class="iconfont icon-shouji"
          clearable
          placeholder="请输入手机号"
        />
        <span> {{ errors[0] }} </span>
      </ValidationProvider>

      <ValidationProvider>
        <van-field v-model="user.code" class="iconfont icon-iconfontmima1" placeholder="请输入验证码">
          <van-count-down
            v-if="isCountDownShow"
            slot="button"
            :time="1000 * 60"
            format="ss s"
            @finish="isCountDownShow = false"
          />
          <van-button
            v-else
            slot="button"
            size="small"
            type="primary"
            round
            @click="onSendSmsCode"
          >发送验证码</van-button>
        </van-field>
        <!-- 登录表单结束 -->
      </ValidationProvider>
    </ValidationObserver>
    <!-- 登录按钮 -->
    <div class="login-btn-wrap">
      <van-button type="info" @click="onLogin">登录</van-button>
    </div>
    <!-- 登录按钮 -->
  </div>
</template>

<script>
import { login, getSmsCode } from '@/api/user'
export default {
  name: 'LoginPage',
  data () {
    return {
      user: {
        mobile: '', // 手机号
        code: '' // 验证码
      },
      isCountDownShow: false // 是否显示倒计时
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
        const res = await login(user)
        console.log(res)
        // 提示成功
        this.$toast.success('登录成功')
      } catch (err) {
        console.log('登录失败', err)
        this.$toast.fail('登录失败')
      }
    }, // 4.根据后端返回结果执行后续业务处理
    async onSendSmsCode () {
      try {
        const { mobile } = this.user
        // 1. 验证手机号格式是否有效
        // 2. 请求发送短信验证码
        const res = await getSmsCode(mobile)
        console.log(res)
        // 3. 显示倒计时
        this.isCountDownShow = true
      } catch (err) {
        console.log(err)
        this.$toast('请勿频繁操作')
      }
    }
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
  .van-cell {
    align-items: center;
  }
}
</style>
