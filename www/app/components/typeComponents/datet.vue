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
      <el-date-picker v-model="value1" type="date" placeholder="选择日期" :picker-options="pickerOptions" @change="handl">
      </el-date-picker>
   </div>
</template>
<script>
export default {
   props: ["item", "index", "datas"],
   data() {
      var self = this;
      return {
         value1: "",
         pickerOptions: {

            disabledDate(time) {

               if (self.item.start == "" && self.item.end == "") {
                  return false;
               } else if (self.item.start == "" && self.item.end != "") {
                  return time.getTime() > self.item.end;
               } else if (self.item.start != "" && self.item.end == "") {
                  return time.getTime() < self.item.start;
               } else {
                  return time.getTime() < self.item.start || time.getTime() > self.item.end;
               }
               //return time.getTime() < Date.now() - 8.64e7;
            }
         }
      };

   },
   methods: {
      handl(value) {
         if (this.datas) {
            var obj = {};
            obj.num = this.index + 1; //题号
            obj.required = this.item.required; //是否必填
            obj.title = this.item.title; //题目
            obj.option = value; //选项内容
            //obj.optionNum = this.radio2; //选项序号
            obj.type = "datet";
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
