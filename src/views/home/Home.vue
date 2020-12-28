<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <home-swiper :banners="banners"/>
    <RecommendView :recommends="recommends"/>
    <FeatureView/>
    <TabControl class="tab-control" :titles="['流行','新款','样式']" @tabClick="tabClick"/>
    <good-list :goods="showGoods"/>
    <ul>
      <li>列表1</li>
      <li>列表2</li>
      <li>列表3</li>
      <li>列表4</li>
      <li>列表5</li>
      <li>列表6</li>
      <li>列表7</li>
      <li>列表8</li>
      <li>列表9</li>
      <li>列表10</li>
      <li>列表11</li>
      <li>列表12</li>
      <li>列表13</li>
      <li>列表14</li>
      <li>列表15</li>
      <li>列表16</li>
      <li>列表17</li>
      <li>列表18</li>
      <li>列表19</li>
      <li>列表20</li>
      <li>列表21</li>
      <li>列表22</li>
      <li>列表23</li>
      <li>列表24</li>
      <li>列表25</li>
      <li>列表26</li>
      <li>列表27</li>
      <li>列表28</li>
      <li>列表29</li>
      <li>列表30</li>
      <li>列表31</li>
      <li>列表32</li>
      <li>列表33</li>
      <li>列表34</li>
      <li>列表35</li>
      <li>列表36</li>
      <li>列表37</li>
      <li>列表38</li>
      <li>列表39</li>
      <li>列表40</li>
      <li>列表41</li>
      <li>列表42</li>
      <li>列表43</li>
      <li>列表44</li>
      <li>列表45</li>
      <li>列表46</li>
      <li>列表47</li>
      <li>列表48</li>
      <li>列表49</li>
      <li>列表50</li>
    </ul>
  </div>
</template>

<script>

import HomeSwiper from "./childComps/HomeSwiper";
import RecommendView from "@/views/home/childComps/RecommendView"
import FeatureView from "@/views/home/childComps/FeatureView";

import NavBar from 'components/common/navbar/NavBar';
import TabControl from "@/components/content/tabControl/TabControl";
import GoodList from "@/components/content/goods/GoodList";

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
      currentType: 'pop'
    }
  },
  components: {
    HomeSwiper,
    RecommendView,
    FeatureView,
    NavBar,
    TabControl,
    GoodList,
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
  methods: {
    /**
     *事件监听相关方法
     */
    tabClick(index) {
      // console.log(index);
      switch (index) {
        case 0:
          this.currentType = 'pop'
          break
        case 1:
          this.currentType = 'news'
          break
        case 2:
          this.currentType = 'sell'
          break
      }
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
      getMyGoods(type).then(res => {
        let {pop, news, sell} = res.res
        this.goods['pop'].list = pop
        this.goods['news'].list = news
        this.goods['sell'].list = sell
        console.log(res);
      })
    },

    /**
     * 测试
     * @param type
     */
    getHomeGoods(type) {
      const page = this.goods[type].page + 1
      getHomeGoods(type, page).then(res => {

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

  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}

</style>
