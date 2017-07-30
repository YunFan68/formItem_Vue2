<style scoped lang="stylus">
.main {
   border: 1px solid #dfe6ec;
   background-color:#fff;

   h3 {
      text-align: left;
      line-height: 30px;
      height: 40px;
      background-color: #eef1f6;
      color: #1f2d3d;
      padding: 5px;
      box-sizing: border-box;
   }
   .property,
   .formTitle {
      //padding: 10px;
      box-sizing: border-box;
      .editBox {
         //margin-bottom: 20px;
         padding: 10px;
         box-sizing: border-box;
         span {
            display: block;
            font-size: 16px;
            font-weight: 700;
            margin-bottom: 10px;
         }
         .daterange {
            margin-bottom: 5px;
            font-size: 14px;
         }
         .sliderpro {
            margin-bottom: 5px;
            font-size: 14px;
         }
         .ratetpro {
            margin-bottom: 10px;
            .inputw {
               width: 55%;
               margin-right: 5px;
            }
         }
      }
      .range {
         .rangeop {
            margin-bottom: 5px;
            font-size: 14px;
         }
      }
      .options {
         li {
            margin-bottom: 10px;
            .inputw {
               width: 55%;
               margin-right: 5px;
            }
         }
      }
      .editBox:nth-child(odd) {
         background: #fffff;
      }
      .editBox:nth-child(even) {
         background: #f8f8f8;
      }

   }
}
</style>
<template>
   <div class="main">
      <h3>表单属性</h3>
      <div v-show="this.$store.state.data.boxId == -1" class="formTitle">
         <div class="editBox">
            <span>表单名称</span>
            <el-input v-model="getFormTitle"></el-input>
         </div>
         <div class="editBox">
            <span>描述</span>
            <div id="editor" style="background:#fff;"></div>
            <!-- <div id="editorBox"></div> -->
         </div>
      </div>
      <!-- 字段信息 -->
      <div v-if="this.$store.state.data.boxId != -1" class="property">
         <!-- 字段名称 -->
         <div class="title editBox">
            <span>字段名称</span>
            <el-input v-model="getEditBoxTitle"></el-input>
         </div>
         <!-- 字段名称结束 -->
         <!-- 必填选项 -->
         <div class="required editBox">
            <span>必填项</span>
            <el-switch v-model="getEditBoxOptionRequire">
            </el-switch>
         </div>
         <!-- 必填选项结束 -->
         <!-- 选项 -->
         <div class="options editBox" v-if="getEditBoxType == 'checkboxt' || getEditBoxType == 'radiot' || getEditBoxType == 'selectt'">
            <span>选项</span>
            <ul class="drapop"  id="items" v-sortable=" drapOptions " v-if="show">
               <li v-for="(item , index) in getEditBoxOptions">
                  <el-input :value="item" @change="optionChange($event,index)" size="small" class="inputw"></el-input>
                  <el-button-group>
                     <el-button type="danger" icon="delete" size="small" @click="deloption(index)"></el-button>
                     <el-button type="success" icon="plus" size="small" @click="addoption"></el-button>
                     <el-button type="info" icon="d-caret" size="small" class="handle"></el-button>
                  </el-button-group>
               </li>
            </ul>
         </div>
         <!-- 选项结束 -->
         <!-- 多选范围 -->
         <div class="range editBox" v-if="getEditBoxType == 'checkboxt'">
            <span>范围</span>
            <p class="rangeop">最少选择几项：&nbsp;
               <el-input-number :min="0" :max="getEditBoxOptions.length" size="small" v-model="getEditBoxRangeMin"></el-input-number>
            </p>
            <p class="rangeop">最多选择几项：&nbsp;
               <el-input-number :min="0" :max="getEditBoxOptions.length" size="small" v-model="getEditBoxRangeMax"></el-input-number>
            </p>
         </div>
         <!-- 多选结束 -->
         <!-- 文本域字数 -->
         <div class="editBox" v-if="getEditBoxType == 'textareat'">
            <span>最大字数</span>
            <el-input-number :min="0" size="small" v-model="getEditBoxTextareaSize"></el-input-number>
         </div>
         <!-- 文本域字数结束 -->
         <!-- 日期可选时间 -->
         <div class="editBox" v-if="getEditBoxType == 'datet'">
            <span>日期范围</span>
            <p class="daterange">起始日期：&nbsp;
               <el-date-picker v-model="getEditBoxDateStart" type="date" placeholder="选择起始日期">
               </el-date-picker>
            </p>
            <p class="daterange">结束日期：&nbsp;
               <el-date-picker v-model="getEditBoxDateEnd" type="date" placeholder="选择结束日期">
               </el-date-picker>
            </p>
         </div>
         <!-- 日期可选时间结束 -->
         <!-- 滑块属性设置 -->
         <div class="editBox" v-if="getEditBoxType == 'slidert'">
            <span>滑块属性</span>
            <p class="sliderpro">最小值：&nbsp;
               <el-input-number size="small" v-model="getEditBoxSliderMin"></el-input-number>
            </p>
            <p class="sliderpro">最大值：&nbsp;
               <el-input-number size="small" v-model="getEditBoxSliderMax"></el-input-number>
            </p>
            <p class="sliderpro">步长值：&nbsp;
               <el-input-number size="small" v-model="getEditBoxSliderStep"></el-input-number>
            </p>
         </div>
         <!-- 滑块属性设置结束 -->
         <!-- 设置评价内容 -->
         <div class="editBox" v-if="getEditBoxType == 'ratet'">
            <span>评价内容</span>
            <p class="ratetpro" v-for="(item , index) of getEditBoxRateOptions">
               <el-input size="small" class="inputw" :key="index" :value="item" v-on:change="handleRate($event , index)"></el-input>
               <el-button-group>
                  <el-button type="info" icon="plus" size="small" @click="changeOptinon(index,'add')"></el-button>
                  <el-button type="info" icon="minus" size="small" @click="changeOptinon(index,'del')"></el-button>
               </el-button-group>
            </p>
         </div>
         <!-- 设置评价内容结束 -->
      </div>
      <!-- 字段信息结束 -->
   </div>
</template>
<script>
import E from 'wangeditor'
export default {
      data() {
         return {
            show : true,
            drapOptions : {
                handle: '.handle' , 
                onEnd: function (/**Event*/evt) {
                        console.log("old:"+evt.oldIndex);  // element's old index within parent
                        console.log("old:"+evt.newIndex);  // element's new index within parent
                        let beforPosition = evt.oldIndex;
                        let afterPosition = evt.newIndex;
                        this.show = false;
                        let self2 = this;
                        setTimeout(function(){
                            self2.show = true;
                        }, 0);
                        this.$store.commit("SORTOPTIONS",{beforPosition , afterPosition});

                    }.bind(this),
                animation: 150,
                group: "localStorage-example"
            }
         };

      },
      methods: {
         optionChange(event, idx) {

            this.$store.commit("CHANGOPTION", {
               "index": idx,
               "newValue": event
            });
         },
         deloption(idx) {
            if (this.$store.getters.onEditBox.options.length == 1) {
               this.$notify.error({
                  title: '错误',
                  message: '选项不能少于一项！'
               });
               return;
            }
            this.$store.commit("DELOPTION", idx);
         },
         addoption() {

            this.$store.commit("ADDOPTION");
         },
         changeRange(value) {
            console.log(value);
         },
         handleRate(newValue, index) {
            this.$store.commit("CHANGERAREOPTIONS", {
               newValue,
               index
            });
         },
         changeOptinon(index, type) {
            if (type == 'del') {
               if (this.$store.getters.onEditBox.texts.length <= 5) {
                  if (this.$store.getters.onEditBox.texts.length == 1) {
                     this.$notify.error({
                        title: '错误',
                        message: '评价选项最少需要一项!'
                     });
                     return;
                  }
                  this.$notify({
                     title: '警告',
                     message: '评价选项建议不要少于5项',
                     type: 'warning'
                  });
               }
            }
            this.$store.commit("CHANGEOPTINON", {
               index,
               type
            });
         }
      },
      computed: {
         getEditBoxTitle: {
            get() {

               return this.$store.getters.onEditBoxTitle;
            },
            set(newvalue) {
               this.$store.commit("CHANGETITLE", newvalue);
            }
         },
         getEditBoxOptions() {
            //this.arr = this.$store.getters.onEditBoxOptions;
            //console.log(this.arr)

            return this.$store.getters.onEditBoxOptions;
         },
         getEditBoxOptionRequire: {
            get() {

               return this.$store.getters.onEditBoxRequired;
            },
            set(newvalue) {
               this.$store.commit("CHANGEREQUIRE");
            }
         },
         getEditBoxType() {
            //console.log(this.$store.getters.onEditBoxType);
            return this.$store.getters.onEditBoxType;
         },
         getEditBoxRangeMin: {
            get() {

               return this.$store.getters.onEditBoxOptionsRange.min;
            },
            set(newvalue) {
               this.$store.commit("CHANGERANGEMIN", newvalue);
            }
         },
         getEditBoxRangeMax: {
            get() {

               return this.$store.getters.onEditBoxOptionsRange.max;
            },
            set(newvalue) {
               this.$store.commit("CHANGERANGEMAX", newvalue);
            }
         },
         getFormTitle: {
            get() {

               return this.$store.getters.onFormTitle;
            },
            set(newvalue) {
               this.$store.commit("CHANGEFORMTITLE", newvalue);
            }
         },
         getEditBoxTextareaSize: {
            get() {
               return this.$store.getters.onEditBox.size
            },
            set(newvalue) {
               this.$store.commit("CHANGETEXTAREASIZE", newvalue);
            }
         },
         getEditBoxDateStart: {
            get() {
               return this.$store.getters.onEditBox.start
            },
            set(newvalue) {

               if (this.$store.getters.onEditBox.end == "") {
                  this.$store.commit("CHANGEDATESTART", (newvalue - 0));
               } else {
                  if (this.$store.getters.onEditBox.end > (newvalue - 0)) {
                     this.$store.commit("CHANGEDATESTART", (newvalue - 0));
                  } else {
                     this.$notify.error({
                        title: '错误',
                        message: '起始时间不能晚于结束时间！'
                     });

                  }
               }

            }
         },
         getEditBoxDateEnd: {
            get() {
               return this.$store.getters.onEditBox.end
            },
            set(newvalue) {
               if (this.$store.getters.onEditBox.start == "") {
                  this.$store.commit("CHANGEDATEEND", (newvalue - 0));
               } else {
                  if (this.$store.getters.onEditBox.start < (newvalue - 0)) {
                     this.$store.commit("CHANGEDATEEND", (newvalue - 0));
                  } else {
                     this.$notify.error({
                        title: '错误',
                        message: '结束时间不能早于起始时间！'
                     });

                  }
               }

            }
         },
         getEditBoxSliderMin: {
            get() {

               return this.$store.getters.onEditBox.sliderPro.min
            },
            set(newvalue) {
               if (this.$store.getters.onEditBox.sliderPro.max > newvalue) {
                  this.$store.commit("CHANGESLIDERPRO", {
                     "value": newvalue,
                     "type": "min"
                  });
               } else {
                  this.$notify.error({
                     title: '错误',
                     message: '最小值不能大于最大值！'
                  });

               }
            }
         },
         getEditBoxSliderMax: {
            get() {
               return this.$store.getters.onEditBox.sliderPro.max
            },
            set(newvalue) {
               if (this.$store.getters.onEditBox.sliderPro.min < newvalue) {
                  this.$store.commit("CHANGESLIDERPRO", {
                     "value": newvalue,
                     "type": "max"
                  });
               } else {
                  this.$notify.error({
                     title: '错误',
                     message: '最大值不能小于于最小值！'
                  });

               }
            }
         },
         getEditBoxSliderStep: {
            get() {
               return this.$store.getters.onEditBox.sliderPro.step
            },
            set(newvalue) {

               this.$store.commit("CHANGESLIDERPRO", {
                  "value": newvalue,
                  "type": "step"
               });
            }
         },
         getEditBoxRateOptions() {

            return this.$store.getters.onEditBox.texts;
         },
      },
      mounted() {
         // var el = document.getElementById('items');
         // var sortable = Sortable.create(el);
         let self = this;
         let editor = new E('#editor');
         editor.customConfig.menus = [
            'bold',
            'italic',
            'underline',
            'foreColor', // 文字颜色
            'backColor', // 背景颜色
            'justify', // 对齐方式
            'emoticon',
         ];
         editor.customConfig.onchange = function(html) {
            self.$store.commit("CHANGEDESCRIPTION", html);
         }
         editor.create();
         editor.txt.html(this.$store.state.data.form.description);
      },
      updated(){
/*         let self = this;
         let beforPosition , afterPosition;
         $( ".drapop" ).sortable({ 
            revert: true,
            start: function( event, ui ) {
               //console.log("start:"+$(ui.item).index());
               beforPosition = $(ui.item).index();
            },
            stop: function( event, ui ){
               //console.log("end:"+$(ui.item).index());
               afterPosition = $(ui.item).index();
               self.$store.commit("SORTOPTIONS",{beforPosition , afterPosition});
               self.show = false;
               console.log(1)
            }

          });*/

         //$( ".drapop" ).disableSelection();
      }
      

}
</script>
