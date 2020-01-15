<template>
  <div class="channel-edit">
    <van-cell title="我的频道" :border="false">
      <van-button size="mini" round type="danger">编辑</van-button>
    </van-cell>
    <van-grid :gutter="10">
      <van-grid-item v-for="channel in userChannels" :key="channel.id" :text="channel.name" />
    </van-grid>
    <van-cell title="推荐频道" :border="false"></van-cell>
    <van-grid :gutter="10">
      <van-grid-item v-for="channel in remainingChannels" :key="channel.id" :text="channel.name" />
    </van-grid>
  </div>
</template>

<script>
import { getAllChannels } from '@/api/channel'
export default {
  name: 'ChannelEdit',
  components: {},
  props: {
    userChannels: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      allChannels: [] // 所有频道
    }
  },
  watch: {},
  computed: {
    remainingChannels () {
      const channels = []
      const { allChannels, userChannels } = this
      this.allChannels.forEach(item => {
        // 当前的遍历项是否属于我的频道，如果不是，那就收集到channles
        // userChannels 是否包含 item
        // find 会遍历数组，它会对每个元素执行 c.id === item.id 条件判定
        // 如果 true，则返回该元素，如果直到遍历结束都没有符合条件的元素，则返回 undefined
        if (!userChannels.find(c => c.id === item.id)) {
          channels.push(item)
        }
      })
      return channels
    }
  },
  created () {
    this.loadAllChannels()
  },
  mounted () {},

  methods: {
    async loadAllChannels () {
      const { data } = await getAllChannels()
      this.allChannels = data.data.channels
    }
  }
}
</script>
<style lang="less" scoped>
.channel-edit {
  padding-top: 40px;
  // font-size: 16px;
  /deep/ .van-grid-item__content {
    background-color: #f4f5f6;
  }
}
</style>
