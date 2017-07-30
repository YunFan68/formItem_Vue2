<style scoped lang="stylus">
.typebox {
   border: 1px solid #dfe6ec;
   background-color: #fff;
   h3 {
      text-align: left;
      line-height: 30px;
      font-weight: 700;
      height: 40px;
      background-color: #eef1f6;
      color: #1f2d3d;
      padding: 5px;
      box-sizing: border-box;
      border-bottom: 1px solid #dfe6ec;
   }
   li {
      text-align: left;
      line-height: 30px;
      height: 40px;
      color: #1f2d3d;
      padding: 5px;
      box-sizing: border-box;
      border-bottom: 1px solid #dfe6ec;
      padding-left : 20px;
      &:hover {
         background-color: #eef1f6;
      }
   }
}
</style>
<template>
   <div class="typebox">
      <h3>通用字段</h3>
      <ul>
         <li v-for="(item , index) in getType" v-bind:data-type="item.type" v-on:click="add(item.type)"><i :class="getIcon(item.type)" class="iconfont"></i>&nbsp;{{item.name}}</li>
      </ul>
   </div>
</template>
<script>
export default {
   data() {
         return {
            typeList: []
         };
      },
      methods: {
         add(type) {
            this.$store.commit("ADD", type);
         },
         getIcon(type) {
            switch (type) {
               case 'radiot':
                  return 'icon-iconfontoptionbutton';
               case 'checkboxt':
                  return 'icon-iconfontxuanzekuangyixuan';
               case 'textareat':
                  return 'icon-wenben';
               case 'selectt':
                  return 'icon-xialakuangbiaodan';
               case 'datet':
                  return 'icon-riqi';
               case 'slidert':
                  return 'icon-huakuai';
               case 'ratet':
                  return 'icon-pingjia';


            }
         }
      },
      computed: {
         getType() {
            return this.typeList;
         }

      },
      created() { //拉取数据
         let self = this;
         $.get("/typeAll", function(data) {
            self.typeList = data.typeList;

         });
      }
}
</script>
