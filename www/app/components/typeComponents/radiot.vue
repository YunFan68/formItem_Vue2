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
      <p><span><i v-if = "item.required">*</i>{{index + 1}} . {{item.title}}</span></p>
      <el-radio-group v-model="radio2" @change="handl">
         <el-radio v-for="(option , idx) in item.options" :key="option" class="option" :label="idx">{{option}}</el-radio>
      </el-radio-group>
   </div>
</template>
<script>
export default {
   props: ["item", "index", "datas"],
   data() {
      return {
         radio2: -1
      };

   },
   methods: {
      handl() {
         if (this.datas) {

            var obj = {};
            obj.num = this.index + 1; //题号
            obj.required = this.item.required; //是否必填
            obj.title = this.item.title; //题目
            obj.option = this.item.options[this.radio2]; //选项内容
            obj.optionNum = this.radio2; //选项序号
            obj.type = "radiot";
            //console.log(this.radio2)
            //console.log(typeof this.datas)
            //this.datas.push(obj);
            this.datas.splice(obj.num - 1, 1, obj)
         }
      }
   },
   computed: {

   },
   created() {
      if(!this.datas) return;
      var obj = {};
      obj.required = this.item.required;
      this.datas.splice(this.index - 1, 1, obj);
   }
}
</script>
