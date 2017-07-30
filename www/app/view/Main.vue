<style scoped lang="stylus">
.btn {
   position:absolute;
   right: 20px;
    top: -43px;
}
</style>
<template>
      <el-row :gutter="20">
         <el-col :span="6">
            <Type></Type>
         </el-col>
         <el-col :span="12">
            <Container></Container>
         </el-col>
         <el-col :span="6">
         <el-button 
         class="btn" 
         type="success" 
         @click="upload"
         v-loading.fullscreen.lock="this.$store.state.uploadState"><i class="el-icon-upload el-icon--right"></i>&nbsp;保存</el-button>
            <Info></Info>
         </el-col>
      </el-row>
</template>
<script>
import Type from "../components/Type.vue";
import Container from "../components/Content.vue";
import Info from "../components/Info.vue";
export default {
   data() {
         return {

         };
      },
      methods : {
         upload(){
            this.$store.dispatch("UPLOAD");
         }
      },
      computed: {

         
      },
      components : {
      	Type,Container,Info
      }
}
</script>
