<template>
  <div class="home-container">
    <!-- 导航栏 -->
    <van-nav-bar title="首页" fixed />
    <!-- /导航栏 -->

    <!-- 频道列表 -->
    <van-tabs v-model="active">
      <!--  通过插槽把图标放进去 -->
      <van-icon class="wap-nav" slot="nav-right" name="wap-nav" @click="isChannelEditShow = true" />
      <van-tab :title="channel.name" v-for="channel in userChannels" :key="channel.id">
        <!-- 文章列表 -->
        <article-list :channel="channel" />
        <!-- /文章列表 -->
      </van-tab>
    </van-tabs>
    <!-- /频道列表 -->

    <!-- 编辑频道 -->
    <van-popup
      v-model="isChannelEditShow"
      position="bottom"
      :style="{ height: '94%' }"
      round
      closeable
      close-icon-position="top-left"
    >
      <channel-edit :user-channels="userChannels" :active="active" @seitch="onChannelSwitch" />
    </van-popup>
    <!--/ 编辑频道 -->
  </div>
</template>

<script>
import { getUserChannels } from '@/api/channel'
import ArticleList from './components/article-list'
import ChannelEdit from './components/channel-edit'
import { getItem } from '@/utils/storage'
export default {
  name: 'HomePage',
  components: {
    ArticleList,
    ChannelEdit
  },
  props: {},
  data () {
    return {
      active: 0, // 控制激活的标签页
      userChannels: [], // 用户频道列表
      isChannelEditShow: false
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadUserChannels()
  },
  mounted () {},
  methods: {
    async loadUserChannels () {
      // 如果有本地的优先使用本地的，如果没有则请求获取接口的
      try {
        // 1. 声明变量存储频道数据
        let channels = []
        // 2. 获取本地存储的频道列表
        const localUserChannels = getItem('user-channels')
        // 3. 如果有本地存储的则使用本地存储逇
        if (localUserChannels) {
          channels = localUserChannels
        // 4. 如果没有本地存储的，则使用接口的
        } else {
          const { data } = await getUserChannels()
          // console.log(data)
          channels = data.data.channels
        }
        // 5. 将数据赋值给当前组件数据
        this.userChannels = channels
      } catch (err) {
        console.log(err)
        this.$toast('获取频道数据失败')
      }
    },
    onChannelSwitch (index) {
      this.active = index // 切换激活频道
      this.isChannelEditShow = false // 关闭弹层
    }
  }
}
</script>

<style scoped lang='less'>
.home-container {
  padding-top: 90px;
  padding-bottom: 50px;
}
.wap-nav {
  position: fixed;
  font-size: 18px;
  right: 0;
  line-height: 44px;
  background: #fff;
  opacity: 0.7;
}
/deep/ .van-tabs__wrap {
  position: fixed;
  top: 46px;
  left: 0;
  right: 0;
  z-index: 1;
}
</style>
