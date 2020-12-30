<template>
  <div class="goods-item" @click="itemClick">
    <img :src="goodsItem.pic" alt="" @load="imageLoad">
    <div class="goods-info">
      <p>{{ goodsItem.text }}</p>
      <span class="price">{{ goodsItem.price }}</span>
      <span class="collect">{{ goodsItem.nums }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "GoodListItem",
  props: {
    goodsItem: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  methods:{
    imageLoad(){
      // console.log('image');
      //发射事件总线 给首页能够直接监听到图片加载变化事件
      //要先在main.js中创建vue实例 挂载$bus
      this.$bus.$emit('itemImageLoad');
    },
    itemClick(){
      this.$router.push('/detail/' + this.goodsItem.id)
    }
  }
}
</script>

<style scoped>
.goods-item {
  padding-bottom: 40px;
  position: relative;
  width: 48%;
}

.goods-item img {
  width: 100%;
  /*height: 200px;*/
  border-radius: 5px;
}

.goods-info {
  font-size: 14px;
  position: absolute;
  bottom: 5px;
  left: 0;
  right: 0;
  overflow: hidden;
  text-align: center;
}

.goods-info p {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 3px;
}

.goods-info .price {
  color: var(--color-high-text);
}

.goods-info .collect {
  position: relative;
  left: 20px;
}

.goods-info .collect::before {
  content: '';
  position: absolute;
  left: -15px;
  top: 0px;
  width: 14px;
  height: 14px;
  background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
}
</style>