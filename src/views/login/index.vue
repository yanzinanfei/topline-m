<template>
  <div class="login-container">
    <!-- 导航栏开始 -->
    <van-nav-bar title="登录" />
    <!-- 导航栏结束 -->
    <!-- 登录表单开始 -->
    <van-cell-group>
      <van-field required clearable placeholder="请输入手机号" />
      <van-field placeholder="请输入验证码" required />
    </van-cell-group>
    <!-- 登录表单结束 -->
    <!-- 登录按钮 -->
    <div>
      <van-button type="info">登录</van-button>
    </div>
    <!-- 登录按钮 -->
  </div>
</template>

<script>
export default {}
</script>

<style>
</style>
