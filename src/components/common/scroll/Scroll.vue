<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'

export default {
  name: "Scroll",
  props: {
    probeType: {
      type: Number,
      default: 0
    },
    pullUpLoad: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      scroll: null,
      msg: 'hahaha'
    }
  },
  mounted() {
    /**
     * 默认情况下BScroll是不可以实时监听滚动位置
     * probeType 侦测
     * 0,1都是不侦测实时位置
     * 2：在手指滚动的过程中侦测，离开时的惯性不侦测
     * 3：只要是滚动，都侦测
     * click: true 开启可以监听滚动区域内点击事件
     * pullUpLoad: true 滚动到底部时触发
     * observeDOM: true 作为组件使用的时候需要加入，在引用的时候才会起效
     * @type {BScroll | (BScrollConstructor & UnionToIntersection<ExtractAPI<{probeType: number}>>)}
     */
    //创建BScroll对象
    this.scroll = new BScroll(this.$refs.wrapper, {
      click: true,
      observeDOM: true,
      probeType: this.probeType,
      pullUpLoad: this.pullUpLoad
    })
    //监听滚动位置
    this.scroll.on('scroll', (options) => {
      // console.log(options);
      this.$emit('scroll', options)
    })
    //监听触底
    this.scroll.on('pullingUp', () => {
      // console.log('上拉加载更多');
      this.$emit('pullingUp')
    })
  },
  methods: {
    scrollTo(x, y, time = 300) {
      this.scroll && this.scroll.scrollTo(x, y, time)
    },
    finishPullUp() {
      this.scroll && this.scroll.finishPullUp()
    },
    refresh() {
      this.scroll && this.scroll.refresh();//dom结构发生改变需要refresh
    }
  }
}
</script>

<style scoped>

</style>