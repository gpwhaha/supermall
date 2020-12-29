<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll" :pull-up-load="true"
            @pullingUp="loadMore">
      <home-swiper :banners="banners"/>
      <RecommendView :recommends="recommends"/>
      <FeatureView/>
      <TabControl class="tab-control" :titles="['流行','新款','样式']" @tabClick="tabClick"/>
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
      isShowBackTop: false
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
    this.getHomeMultidata()
    // this.getHomeGoods('pop')
    // this.getMyTest(1)
    // this.getMyUser(1)
    this.getMyGoods('pop')

  },
  mounted() {
    // this.refresh()
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
    },
    backClick() {
      /**
       * 通过this.$refs.scroll可以拿到scroll组件内容
       * scrollTo(x,y,time)回到顶部
       */
      this.$refs.scroll.scrollTo(0, 0, 500)
      let msg = this.$refs.scroll.scroll.msg;
      console.log(msg);
    },
    contentScroll(options) {
      // console.log(options);
      this.isShowBackTop = Math.abs(options.y) > 200
    },
    loadMore() {
      // console.log('上拉加载更多');
      this.getMyGoods(this.currentType)
    },
    /**
     * 网络请求相关方法
     */
    getHomeMultidata() {
      getHomeMultidata().then(res => {
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
        console.log(res);
      })
    },
    getMyGoods(type) {
      const page = this.goods[type].page + 1
      getMyGoods(type, page).then(res => {
        let {pop, news, sell} = res.res
        // this.goods['pop'].list = pop
        // this.goods['news'].list = news
        // this.goods['sell'].list = sell
        this.goods[type].page += 1
        this.goods[type].list.push(...res.res[type])
        //调用scroll组件里的方法
        this.$refs.scroll.finishPullUp()
        console.log(...res.res[type]);
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
  padding-top: 44px;
  height: 100vh;
  position: relative;
}

.home-nav {
  background-color: var(--color-tint);
  color: #fff;

  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9;
}

.tab-control {
  /*到顶部44px停留不动*/
  position: -webkit-sticky;
  position: sticky;
  top: 44px;
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
