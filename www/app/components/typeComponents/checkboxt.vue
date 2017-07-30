<style scoped lang="stylus">
p {
   font-size: 16px;
   height: 20px;
   padding: 2px;
   box-sizing: border-box;
   margin-bottom: 20px;
   margin-top: 5px;
   span {
      font-size: 16px;
      display: block;
      i {
         color: red;
      }
   }
}

.option {
   margin-right: 30px;
}
</style>
<template>
   <div>
      <p><span><i v-if="item.required">*</i>{{index + 1}} . {{item.title}}</span></p>
      <el-checkbox-group v-model="checkedCities1" :min="item.range.min" :max="item.range.max" 
      @change="handl">
         <el-checkbox v-for="(option , idx) in item.options" :label="option" :key="option" class="option">{{option}}</el-checkbox>
      </el-checkbox-group>
   </div>
</template>
<script>
export default {
   props: ["item", "index" , "datas"],
   data() {
      return {
         checkedCities1: []
      };

   },
   methods: {
      handl(){
         if(this.datas){
           //console.log("执行2")
           var obj      = {};
           obj.num      = this.index + 1; //题号
           obj.required = this.item.required; //是否必填
           obj.title    = this.item.title; //题目
           obj.option   = this.checkedCities1; //选项内容
           obj.type     = "checkbot";
           //obj.optionNum = checkedCities1; //选项序号
           this.datas.splice(obj.num - 1 , 1 , obj)
         }
      }
   },
   computed : {
      
   },
   created(){
      if(!this.datas) return;
      var obj       = {};
      obj.required  = this.item.required; 
      this.datas.splice(this.index - 1 , 1 , obj);
   }
}
</script>
