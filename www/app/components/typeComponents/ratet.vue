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
      <p><span><i v-if = "item.required" >*</i>{{index + 1}} . {{item.title}}</span></p>
      <el-rate v-model="value3" show-text :texts="item.texts" :max="item.texts.length" @change="handl">
      </el-rate>
   </div>
</template>
<script>
export default {
   props: ["item", "index", "datas"],
   data() {
      return {
         value3: null

      };

   },
   methods: {
      handl(value) {
         if (this.datas && value) {

            var obj = {};
            obj.num = this.index + 1; //题号
            obj.required = this.item.required; //是否必填
            obj.title = this.item.title; //题目
            obj.option = this.item.texts[value]; //选项内容
            //obj.optionNum = this.radio2; //选项序号
            obj.type = "ratet";
            //console.log(this.radio2)
            //console.log(typeof this.datas)
            //this.datas.push(obj);
            this.datas.splice(obj.num - 1, 1, obj)
         }
      }
   },
   created() {
      if(!this.datas) return;
      var obj = {};
      obj.required = this.item.required;
      this.datas.splice(this.index - 1, 1, obj);
   }
}
</script>
