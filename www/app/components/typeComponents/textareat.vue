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
      <el-input type="textarea" :autosize="{ minRows: 3, maxRows: 4}" resize="none" :maxlength="item.size" @change="isBeyond($event , item.size)" v-model="content">
      </el-input>
   </div>
</template>
<script>
export default {
   props: ["item", "index", "datas"],
   data() {
      return {
         content: ""
      };

   },
   methods: {
      isBeyond(event, length) {

         if (event.length > length) {
            this.$message({
               message: `该文本内容字数大于最大字数！字数不得超过 ${length}`,
               type: 'warning'
            });
            return;
         }

         if (this.datas) {
            //console.log("执行2")

            var obj = {};
            obj.num = this.index + 1; //题号
            obj.required = this.item.required; //是否必填
            obj.title = this.item.title; //题目
            obj.option = this.content //选项内容
               //obj.optionNum = this.radio2; //选项序号
            obj.type = "textareat";
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
