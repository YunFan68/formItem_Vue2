<style scoped lang="stylus">
</style>
<template>
   <el-menu theme="dark"  class="el-menu-demo" mode="horizontal" @select="handleSelect" :router="true">
      <el-menu-item index="/main"><h1><i class="iconfont icon-biaodan">&nbsp;</i>FormMaster</h1></el-menu-item>
      <el-submenu index="2">
         <template slot="title">我的表单</template>
         <el-menu-item index="Info">所有的表单</el-menu-item>
<!--          <el-menu-item index="bar">bar</el-menu-item> -->
      </el-submenu>
      
      {{checkUploadState}}
      
   </el-menu>
</template>
<script>
export default {
   data() {
         return {

         };
      },
      methods: {
         handleSelect(key, keyPath) {
            console.log(key, keyPath);
         }
      },
      computed : {
         checkUploadState(){
            if(this.$store.state.uploadState == 1){
               this.$message({
                  message: '保存成功!',
                  type: 'success'
               });
               this.$store.commit("SETUPLOADSTATE" , {"value" : 0})
            }
         }
      }
}
</script>
