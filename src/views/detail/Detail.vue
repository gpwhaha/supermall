<template>
  <div>详情页</div>
</template>

<script>
export default {
  name: "Detail",
  data(){
    return{
      id:null
    }
  },
  created() {
    this.id = this.$route.params.id
    console.log(this.$route.params);
    console.log(this.id);
  }
}
</script>

<style scoped>

</style>