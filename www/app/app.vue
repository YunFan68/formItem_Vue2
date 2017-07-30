<style scoped lang="stylus">
.header {

   background:url('../images/builderBg.png') repeat;
}
.wrapper {
   width: 1250px;
   margin: 0 auto;
   font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
}
.nav {
	margin-bottom:50px;
}
</style>
<template>
   <div>
      <div class="header">
         <div class="wrapper nav">
            <Navigation></Navigation>
         </div>
         <div class="wrapper">
            <router-view></router-view>
         </div>
      </div>
   </div>
</template>
<script>
import Navigation from './components/Nav.vue';
export default {
   data() {
         return {

         };
      },
      methods: {

      },
      components: {
         Navigation
      },
      mounted(){
         $(".header").height(window.innerHeight);
      }
}
</script>
