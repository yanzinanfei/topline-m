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
      <van-grid-item v-for="value in 8" :key="value" text="文字" />
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
  computed: {},
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
