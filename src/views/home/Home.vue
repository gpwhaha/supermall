<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <TabControl :titles="['流行','新款','样式']"
                @tabClick="tabClick"
                ref="tabControl1"
                class="tab-control" v-show="isTabFixed"/>
    <scroll class="content" ref="scroll"
            :probe-type="3"
            @scroll="contentScroll"
            :pull-up-load="true"
            @pullingUp="loadMore">
      <!--@swiperImageLoad.once让该方法只执行一次-->
      <home-swiper :banners="banners" @swiperImageLoad.once="swiperImageLoad"/>
      <RecommendView :recommends="recommends"/>
      <FeatureView/>
      <TabControl :titles="['流行','新款','样式']"
                  @tabClick="tabClick"
                  ref="tabControl2"/>
      <good-list :goods="showGoods"/>
    </scroll>
    <!--    .native监听原生组件根元素的原生事件-->
    <back-top @click.native="backClick" v-show="isShowBackTop"/>
  </div>
</template>

<script>

import HomeSwiper from "./childComps/HomeSwiper";
import RecommendView from "@/views/home/childComps/RecommendView"
import FeatureView from "@/views/home/childComps/FeatureView";

import NavBar from 'components/common/navbar/NavBar';
import TabControl from "@/components/content/tabControl/TabControl";
import GoodList from "@/components/content/goods/GoodList";
import Scroll from "@/components/common/scroll/Scroll";
import BackTop from "@/components/content/backTop/BackTop";

import {getHomeMultidata, getHomeGoods, getMyTest, getMyGoods} from "network/home";
import {debounce} from "common/utils";//防抖函数

export default {
  name: "Home",
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        'pop': {page: 0, list: []},
        'news': {page: 0, list: []},
        'sell': {page: 0, list: []},
      },
      currentType: 'pop',
      isShowBackTop: false,
      tabOffsetTop: 0,
      isTabFixed: false,
      saveY: 0
    }
  },
  components: {
    HomeSwiper,
    RecommendView,
    FeatureView,
    NavBar,
    TabControl,
    GoodList,
    Scroll,
    BackTop
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list
    }
  },
  created() {
    //1.请求多个数据
    this.getHomeMultidata()
    // this.getHomeGoods('pop')
    // this.getMyTest(1)
    // this.getMyUser(1)
    //2.请求商品数据
    this.getMyGoods('pop')
    this.getMyGoods('news')
    this.getMyGoods('sell')


  },
  mounted() {
    //3.监听item图片中的加载
    /**
     *这里是为了解决引入better-scroll组件出现的 上拉加载更多不能立马下拉 导致图片显示不全的bug
     * 主要是有因为可能网络请求慢导致组件内计算可滑动的高度没有刷新或者错
     * 监听商品组件页面内图片加载 就触发refresh函数 重新计算高度
     *$on在Vue3中已废除
     * debounce防抖函数
     **/
    const refresh = debounce(this.$refs.scroll.refresh, 50)
    this.$bus.$on('itemImageLoad', () => {
      refresh();
    })

  },
  destroyed() {

  },
  activated() {
    // this.$refs.scroll.scrollTo(0, this.saveY, 0);
    // this.$refs.scroll.refresh();
  },
  deactivated() {
    // this.saveY = this.$refs.scroll.getScrollY()
    // console.log(Math.abs(this.$refs.scroll.getScrollY()));
  },
  methods: {
    /**
     *事件监听相关方法
     */
    tabClick(index) {
      // console.log(index);
      switch (index) {
        case 0:
          this.currentType = 'pop';
          // this.$router.push('/category');
          break
        case 1:
          this.currentType = 'news'
          break
        case 2:
          this.currentType = 'sell'
          break
      }
      //保持两个TabControl的currentIndex值是一致的
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },
    backClick() {
      /**
       * 通过this.$refs.scroll可以拿到scroll组件内容
       * scrollTo(x,y,time)回到顶部
       */
      this.$refs.scroll.scrollTo(0, 0, 500)
      // let msg = this.$refs.scroll.scroll.msg;
      // console.log(msg);
    },
    contentScroll(options) {
      //1.判断backtop是否显示，超过500出现回到顶部按钮
      this.isShowBackTop = Math.abs(options.y) > 500
      //2.决定tabcontrol是否吸顶（postion:fixed）
      this.isTabFixed = Math.abs(options.y) > this.tabOffsetTop
    },
    loadMore() {
      // console.log('上拉加载更多');
      this.getMyGoods(this.currentType)
    },
    swiperImageLoad() {
      //4.获取tabControl的offsetTop
      //所有的组件都有一个属性$el，用于获取组件中的元素
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
    },
    /**
     * 网络请求相关方法
     */
    getHomeMultidata() {
      getHomeMultidata().then(res => {
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
        // console.log(res);
      })
    },
    getMyGoods(type) {
      const page = this.goods[type].page + 1
      getMyGoods(type, page).then(res => {
        let {list} = res
        if (list.length > 0) {
          this.goods[type].page += 1
          this.goods[type].list.push(...list)
        }
        //调用scroll组件里的方法
        this.$refs.scroll.finishPullUp()
        // console.log(...list);
      })
    },

    /**
     * 测试
     * @param type
     */
    getHomeGoods(type) {
      // const page = this.goods[type].page + 1
      getHomeGoods(type, page).then(res => {
        this.goods[type].list.push(...res.data.list)
        this.goods[type].page += 1
        console.log(res);
      })
    },

    getMyTest(id) {
      getMyTest(id).then(res => {
        console.log(res);
      })
    },

    getMyUser(id) {
      this.$axios({
        method: 'post',
        url: 'api/test',
        data: this.$qs.stringify({
          id
        }),
        // params:{ id:1},
        // headers:{'Content-Type':'application/x-www-form-urlencoded'}
      }).then((response) => {          //这里使用了ES6的语法
        console.log('1111', response.data)       //请求成功返回的数据
      }).catch((error) => {
        console.log(error)       //请求失败返回的数据
      })
    },


  }
}
</script>

<style scoped>
#home {
  /*padding-top: 44px;*/
  height: 100vh;
  position: relative;
}

.home-nav {
  background-color: var(--color-tint);
  color: #fff;

  /*position: fixed;*/
  /*left: 0;*/
  /*right: 0;*/
  /*top: 0;*/
  /*z-index: 9;*/
}

.tab-control {
  /*到顶部44px停留不动*/
  /*position: sticky;*/
  position: relative;
  /*top: 44px;*/
  z-index: 9;
}

.content {
  overflow: hidden;
  /*height: calc(100% - 93px);*/
  /*margin-top: 44px;*/
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}

</style>
