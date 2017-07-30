<style scoped lang="stylus">
.main {
   border: 1px solid #dfe6ec;
   background-color:#fff;
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
      .isShow {
         display: none;
      }
   }
   .cur {
      //border: 1px solid #58B7FF;
      border-radius: 10px;
      // box-shadow: 0 0 10px 1px #58B7FF;
      //animation: shanshan 1s ease 0s infinity alternate;
      animation: shanshan 0.6s linear 0s infinite alternate;
      @keyframes shanshan {
         from {
            // background-color:red;
            box-shadow: 0 0 1px 1px #58B7FF;
         }
         to {
            // background-color:green;
            box-shadow: 0 0 10px 1px #1D8CE0;
         }
      }
   }
}
</style>
<template>
   <div class="main">
      <div :class="{cur:getOnEidtBoxId == -1,formtitle:true}">
         <div :class="{operate:true,isShow:getOnEidtBoxId == -1,select:true}">
            <el-button type="primary" icon="edit" size="mini" @click="showBoxId(-1)"></el-button>
         </div>
         <h2>{{this.$store.state.data.form.title}}</h2>
         <p v-html="this.$store.state.data.form.description"></p>
      </div>
      <div class="content" v-for="(item , index) in getAllType" :class="{cur:index == getOnEidtBoxId}">
         <div :class="{operate:true,isShow:index != getOnEidtBoxId}">
            <el-button type="danger" icon="minus" size="mini" @click="delQuestion(index)"></el-button>
            <el-button type="success" icon="plus" size="mini" @click="addQuestion(index)"></el-button>
         </div>
         <div :class="{operate:true,isShow:index == getOnEidtBoxId,select:true}">
            <el-button type="primary" icon="edit" size="mini" @click="showBoxId(index)"></el-button>
         </div>
         <Radiot v-if="item.type == 'radiot' " :item="item" :index="index" :key="index"></Radiot>
         <Checkboxt v-if="item.type == 'checkboxt' " :item="item" :index="index" :key="index"></Checkboxt>
         <Textareat v-if="item.type == 'textareat' " :item="item" :index="index" :key="index"></Textareat>
         <Selectt v-if="item.type == 'selectt' " :item="item" :index="index" :key="index"></Selectt>
         <Datet v-if="item.type == 'datet' " :item="item" :index="index" :key="index"></Datet>
         <Slidert v-if="item.type == 'slidert' " :item="item" :index="index" :key="index"></Slidert>
         <Ratet v-if="item.type == 'ratet' " :item="item" :index="index" :key="index"></Ratet>
      </div>
   </div>
</template>
<script>
import Radiot from "./typeComponents/radiot.vue";
import Checkboxt from "./typeComponents/checkboxt.vue";
import Textareat from './typeComponents/textareat.vue';
import Selectt from './typeComponents/selectt.vue';
import Datet from './typeComponents/datet.vue';
import Slidert from './typeComponents/slidert.vue';
import Ratet from './typeComponents/ratet.vue';
export default {

   data() {
         return {

         };

      },
      mounted() {
         let self = this;
         $(".main").delegate('.select', 'click', function(event) {

            $(this).parent().siblings().removeClass('cur');

         });


      },
      methods: {
         showBoxId(idx) {

            this.$store.commit("BOXID", idx);
         },
         delQuestion(idx) {
            this.$store.commit("DELQUESTION", idx);
         },
         addQuestion(idx) {
            this.$store.commit("ADDQUESTION", idx);
         }

      },
      computed: {
         getAllType() {

            return this.$store.state.data.typelist;
         },
         getOnEidtBoxId() {
            return this.$store.getters.onEditBoxId;
         }
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
