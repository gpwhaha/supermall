<template>
  <NavBar>
    <div slot="left" class="back" @click="backClick">
      <img src="~assets/img/common/back.svg" />
    </div>
    <div slot="center" class="nav">
      <div v-for="(item,index) in titles"
           class="nav-item"
           :class="{active: index == currentIndex}"
      @click="itemClick(index)">{{ item }}</div>
    </div>
  </NavBar>
</template>

<script>
import NavBar from "@/components/common/navbar/NavBar";

export default {
  name: "DetailNavBar",
  components: {NavBar},
  comments: {
    NavBar
  },
  data() {
    return {
      titles: ['商品', '参数', '评论', '推荐'],
      currentIndex: 0
    }
  },
  methods:{
    itemClick(index){
      this.currentIndex = index
    },
    backClick(){
      this.$router.back();
    }
  }
}
</script>

<style scoped>
.nav {
  display: flex;
  font-size: 14px;
}

.nav-item {
  flex: 1;
}
.back img{
  margin-top: 12px;
}
.active{
  color: var(--color-high-text);
}
</style>