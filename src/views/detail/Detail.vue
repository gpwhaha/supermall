<template>
  <detail-nav-bar/>
</template>

<script>
import DetailNavBar from "@/views/detail/childComps/DetailNavBar";
export default {
  name: "Detail",
  data(){
    return{
      id:null
    }
  },
  components:{
    DetailNavBar
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