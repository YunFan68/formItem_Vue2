<style scoped lang="stylus">
.main {
   border: 1px solid #dfe6ec;
   background-color: #fff;
   .formtitle {
      padding: 20px 5px 20px 15px;
      box-sizing: border-box;
      background-color: #f9f9f9;
      position: relative;
      .operate {
         position: absolute;
         top: 10px;
         right: 10px;
      }
      .isShow {
         display: none;
      }
      h2 {
         font-size: 24px;
         font-weight: 400;
         margin-bottom: 10px;
      }
      p {
         font-size: 14px;
         font-weight: 400;
      }
   }
   .content {
      //cursor: pointer;
      padding: 15px 15px;
      box-sizing: border-box;
      position: relative;
      .operate {
         position: absolute;
         top: 10px;
         right: 10px;
      }
   }
}
</style>
<template>
   <div class="main">
      <div :class="{formtitle:true}">
         <h2>{{this.$store.state.data.form.title}}</h2>
         <p v-html="this.$store.state.data.form.description"></p>
      </div>
      <div class="content" v-for="(item , index) in getAllType">
         <Radiot v-if="item.type == 'radiot' " :item="item" :index="index" :key="index" :datas="result"></Radiot>
         <Checkboxt v-if="item.type == 'checkboxt' " :item="item" :index="index" :key="index" :datas="result"></Checkboxt>
         <Textareat v-if="item.type == 'textareat' " :item="item" :index="index" :key="index" :datas="result"></Textareat>
         <Selectt v-if="item.type == 'selectt' " :item="item" :index="index" :key="index" :datas="result"></Selectt>
         <Datet v-if="item.type == 'datet' " :item="item" :index="index" :key="index" :datas="result"></Datet>
         <Slidert v-if="item.type == 'slidert' " :item="item" :index="index" :key="index" :datas="result"></Slidert>
         <Ratet v-if="item.type == 'ratet' " :item="item" :index="index" :key="index" :datas="result"></Ratet>
      </div>
      <button @click="print">显示</button>
   </div>
</template>
<script>
import Radiot from "../components/typeComponents/radiot.vue";
import Checkboxt from "../components/typeComponents/checkboxt.vue";
import Textareat from '../components/typeComponents/textareat.vue';
import Selectt from '../components/typeComponents/selectt.vue';
import Datet from '../components/typeComponents/datet.vue';
import Slidert from '../components/typeComponents/slidert.vue';
import Ratet from '../components/typeComponents/ratet.vue';
export default {

   data() {
         return {
            result: []
         };

      },
      methods: {
         print() {
            console.log(this.result)
               // result = getAllType.map(function(index, elem) {
               //    return null;
               // })
         }

      },
      computed: {
         getAllType() {
            //console.log(this.$store.state.data.typelist)
            return this.$store.state.data.typelist;
         }

      },
      created() {
         this.result = (this.$store.state.data.typelist).map(function(index, elem) {
            return null;
         });
         
      },
   components: {
      Radiot,
      Checkboxt,
      Textareat,
      Selectt,
      Datet,
      Slidert,
      Ratet

   }
}
</script>
