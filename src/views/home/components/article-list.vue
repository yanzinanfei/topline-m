<template>
  <div class="article-list">
    <!--  v-model="isLoading" 控制下拉刷新的 loading 状态 -->
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <!-- <h2>{{ channel.name }}的文章列表</h2> -->
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <van-cell v-for="(article, index) in list" :key="index" :title="article.title" />
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticlesByChannel } from '@/api/article'
export default {
  name: 'ArticleList',
  props: {
    channel: {
      // 参考文档 ：https://cn.vuejs.org/v2/guide/components-props.html#Prop-%E9%AA%8C%E8%AF%81
      type: Object, // 必须是对象
      required: true // 必须传递该数据
    }
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      timestamp: null, // 用于获取下一页数据的页码(时间戳)
      isLoading: false // 控制下拉刷新的 loading 状态
    }
  },
  methods: {
    async onLoad () {
      // 1. 请求获取数据
      const { data } = await getArticlesByChannel({
        channel_id: this.channel.id, // 频道Id
        timestamp: this.timestamp || Date.now(), // 时间戳，请求新的推荐数据传当前的时间戳，请求历史推荐传指定的时间戳
        with_top: 1 // 是否包含置顶，进入页面第一次请求时要包含置顶文章，1-包含置顶，0-不包含
      })
      // 2. 把请求获取到的数据添加到数组列表中
      const { results } = data.data
      this.list.push(...results)
      // 3. 加载状态结束
      this.loading = false
      // 4. 数据全部加载完成
      if (results.length) {
        this.timestamp = data.data.pre_timestamp // 更新获取下一页的时间戳
      } else {
        this.finished = true // 没有数据了，设置加载结束
      }
    },
    async onRefresh () {
      // 下拉刷新组件会自动开启 loading
      // 1.请求数据
      const { data } = await getArticlesByChannel({
        channel_id: this.channel.id, // 频道id
        timestamp: Date.now(), // 时间戳，请求新的推荐数据传当前的时间戳，请求历史推荐传指定的时间戳
        with_top: 1
      })

      // 2. 如果有最新数据，则把数据放到列表的顶部
      const { results } = data.data
      this.list.unshift(...results)

      // 3. 关闭下拉刷新的 loading 状态
      this.isLoading = false

      // 提示更新成功
      this.$toast(`更新了${results.length}条数据`)
    }
  }
}
</script>

<style>
</style>
