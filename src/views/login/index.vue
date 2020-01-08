<template>
  <div class="login-container">
    <!-- 导航栏开始 -->
    <van-nav-bar title="登录" />
    <!-- 导航栏结束 -->
    <!-- 登录表单开始 -->
    <van-cell-group>
      <van-field class="iconfont icon-shouji" clearable placeholder="请输入手机号" />
      <van-field class="iconfont icon-iconfontmima1" placeholder="请输入验证码">
        <van-button slot="button" size="small" type="primary" round>发送验证码</van-button>
      </van-field>
    </van-cell-group>
    <!-- 登录表单结束 -->
    <!-- 登录按钮 -->
    <div class="login-btn-wrap">
      <van-button type="info">登录</van-button>
    </div>
    <!-- 登录按钮 -->
  </div>
</template>

<script>
export default {}
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
