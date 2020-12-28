<template>
  <div class="wrapper ">
    <ul class="content">
      <button class="btn">按钮</button>
      <li>分类1</li>
      <li>分类2</li>
      <li>分类3</li>
      <li>分类4</li>
      <li>分类5</li>
      <li>分类6</li>
      <li>分类7</li>
      <li>分类8</li>
      <li>分类9</li>
      <li>分类10</li>
      <li>分类11</li>
      <li>分类12</li>
      <li>分类13</li>
      <li>分类14</li>
      <li>分类15</li>
      <li>分类16</li>
      <li>分类17</li>
      <li>分类18</li>
      <li>分类19</li>
      <li>分类20</li>
      <li>分类21</li>
      <li>分类22</li>
      <li>分类23</li>
      <li>分类24</li>
      <li>分类25</li>
      <li>分类26</li>
      <li>分类27</li>
      <li>分类28</li>
      <li>分类29</li>
      <li>分类30</li>
      <li>分类31</li>
      <li>分类32</li>
      <li>分类33</li>
      <li>分类34</li>
      <li>分类35</li>
      <li>分类36</li>
      <li>分类37</li>
      <li>分类38</li>
      <li>分类39</li>
      <li>分类40</li>
      <li>分类41</li>
      <li>分类42</li>
      <li>分类43</li>
      <li>分类44</li>
      <li>分类45</li>
      <li>分类46</li>
      <li>分类47</li>
      <li>分类48</li>
      <li>分类49</li>
      <li>分类50</li>
      <li>分类51</li>
      <li>分类52</li>
      <li>分类53</li>
      <li>分类54</li>
      <li>分类55</li>
      <li>分类56</li>
      <li>分类57</li>
      <li>分类58</li>
      <li>分类59</li>
      <li>分类60</li>
      <li>分类61</li>
      <li>分类62</li>
      <li>分类63</li>
      <li>分类64</li>
      <li>分类65</li>
      <li>分类66</li>
      <li>分类67</li>
      <li>分类68</li>
      <li>分类69</li>
      <li>分类70</li>
      <li>分类71</li>
      <li>分类72</li>
      <li>分类73</li>
      <li>分类74</li>
      <li>分类75</li>
      <li>分类76</li>
      <li>分类77</li>
      <li>分类78</li>
      <li>分类79</li>
      <li>分类80</li>
      <li>分类81</li>
      <li>分类82</li>
      <li>分类83</li>
      <li>分类84</li>
      <li>分类85</li>
      <li>分类86</li>
      <li>分类87</li>
      <li>分类88</li>
      <li>分类89</li>
      <li>分类90</li>
      <li>分类91</li>
      <li>分类92</li>
      <li>分类93</li>
      <li>分类94</li>
      <li>分类95</li>
      <li>分类96</li>
      <li>分类97</li>
      <li>分类98</li>
      <li>分类99</li>
      <li>分类100</li>
    </ul>
  </div>
</template>

<script>
//滚动
import BScroll from 'better-scroll'

export default {
  name: "Category",
  data() {
    return {
      scroll: null
    }
  },
  created() {
    // new BScroll('.wrapper')
  },
  mounted() {
    /**
     * 默认情况下BSscroll是不可以实时监听滚动位置
     * probeType 侦测
     * 0,1都是不侦测实时位置
     * 2：在手指滚动的过程中侦测，离开时的惯性不侦测
     * 3：只要是滚动，都侦测
     * click: true 开启可以监听滚动区域内点击事件
     * pullUpLoad: true 滚动到底部时触发
     * @type {BScroll | (BScrollConstructor & UnionToIntersection<ExtractAPI<{probeType: number}>>)}
     */
    this.scroll = new BScroll('.wrapper', {
      probeType: 3,
      click: true,
      pullUpLoad: true
    })
    //监听滚动位置
    this.scroll.on('scroll', (options) => {
      // console.log(options);
    })
    //监听触底
    this.scroll.on('pullingUp', () => {
      console.log('上拉加载更多');

      setTimeout(()=>{
        this.scroll.finishPullUp()
      },2000)
    })
    document.querySelector('.btn').addEventListener('click', function () {
      console.log('----');
    })
  },
  methods: {}
}
</script>

<style scoped>
.wrapper {
  height: 150px;
  background: #ff8198;
  overflow: hidden;
  /*overflow: auto;*/
}
</style>
