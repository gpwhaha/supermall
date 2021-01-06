<template>
  <div>
    <detail-nav-bar/>
    <detail-swiper :top-images="topImages"/>
    <div>{{$store.state.cartList}}</div>
    <div class="shop" @click="addShop">添加购物车</div>
  </div>
</template>

<script>
import DetailNavBar from "@/views/detail/childComps/DetailNavBar";
import DetailSwiper from "@/views/detail/childComps/DetailSwiper";
import {getDetail} from "@/network/detail";

export default {
  name: "Detail",
  data() {
    return {
      id: null,
      topImages: [],
      topInfo:{}
    }
  },
  components: {
    DetailSwiper,
    DetailNavBar
  },
  methods:{
    addShop(){
      //1.获取购物车需要展示的商品信息
      let {id,num,src1,title} = this.topInfo
      const product = {};
      product.title = title;
      product.id = id;
      product.num = num;
      product.src = src1;
      //2.将商品添加到购物车里
      //mutations
      // this.$store.commit('addCart',product);
      //actions
      this.$store.dispatch('addCart',product)
    }
  },
  created() {
    this.id = this.$route.params.id;
    getDetail(this.id).then(res => {
      this.topImages = res.topImage;
      this.topInfo = res.data;
      console.log(this.topInfo);
    })
  }
}
</script>

<style scoped>
.shop{
  width: 100px;
  height: 50px;
  background-color: var(--color-high-text);
  color: #fff;
  font-size: 15px;
  text-align: center;
  line-height: 50px;
}
</style>