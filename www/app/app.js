import Vue from "vue";
import Vuex from "vuex";
import App from "./app.vue";
import createLogger from "./logger/logger.js"
/*elm*/
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-default/index.css';
/*vue-router*/
import VueRouter from 'vue-router'

/*Sortable拖拽*/
import Sortable from 'vue-sortable'

Vue.use(Sortable)
Vue.use( Vuex );
Vue.use( ElementUI );
Vue.use(VueRouter);

const router = new VueRouter({
  routes: [
    { path: '/main', component: require("./view/Main.vue").default },
    { path: '/info', component: require("./view/FormsInfo.vue").default },
    { path: '/show', component: require("./view/FormsShow.vue").default },
    { path: "*" , component : require("./view/FormsInfo.vue").default}
  ]
})


const store = new Vuex.Store( {
   state: {
      ID   : null,
      data : {
         form: { title: "请输入表单名称", description: "描述" },
         typelist: [],
         boxId: -1
      },
      uploadState: 0
   },
   mutations: {
      ADD( state, payload ) {

         switch ( payload ) {

            case "radiot":
               state.data.typelist.push( { "type": "radiot", "title": "请输入题目", "options": [ "选项1", "选项2" ], "required": false } );
               break;
            case "checkboxt":
               state.data.typelist.push( { "type": "checkboxt", "title": "请输入题目", "options": [ "选项1", "选项2" ], "required": false, "range": { "min": 0, "max": 2 } } );
               break;
            case "textareat":
               state.data.typelist.push( { "type": "textareat", "title": "请输入题目", "options": "", "required": false, "size": 999 } );
               break;
            case "selectt":
               state.data.typelist.push( { "type": "selectt", "title": "请输入题目", "options": [ "选项1", "选项2" ], "required": false } );
               break;
            case "datet":
               state.data.typelist.push( { "type": "datet", "title": "请输入题目", "options": "", "required": false, "start": "", "end": "" } );
               break;
            case "slidert":
               state.data.typelist.push( { "type": "slidert", "title": "请输入题目", "options": "", "required": false, "sliderPro": { "min": 0, "max": 100, "step": 1 } } );
               break;
            case "ratet":
               state.data.typelist.push( { "type": "ratet", "title": "请输入题目", "options": "", "required": false, "texts": [ '极差', '失望', '一般', '满意', '惊喜' ] } );
               break;
         }
         state.data.boxId = state.data.typelist.length - 1;
      },
      BOXID( state, payload ) {

         state.data.boxId = payload;
      },
      CHANGETITLE( state, payload ) {

         state.data.typelist[ state.data.boxId ].title = payload;
      },
      CHANGOPTION( state, payload ) {
         Vue.set( state.data.typelist[ state.data.boxId ].options, payload.index, payload.newValue );
         //state.data.typelist[state.data.boxId].options[payload.index] = payload.newValue;
      },
      DELOPTION( state, payload ) {

         state.data.typelist[ state.data.boxId ].options.splice( payload, 1 );
      },
      ADDOPTION( state, payload ) {

         state.data.typelist[ state.data.boxId ].options.push( "选项3" );
      },
      CHANGEREQUIRE( state ) {

         state.data.typelist[ state.data.boxId ].required = !state.data.typelist[ state.data.boxId ].required;
      },
      CHANGERANGEMIN( state, payload ) {

         state.data.typelist[ state.data.boxId ].range.min = payload;
      },
      CHANGERANGEMAX( state, payload ) {

         state.data.typelist[ state.data.boxId ].range.max = payload;
      },
      CHANGEFORMTITLE( state, payload ) {

         state.data.form.title = payload;
      },
      CHANGEDESCRIPTION( state, payload ) {

         state.data.form.description = payload;
      },
      DELQUESTION( state, payload ) {

         state.data.typelist.splice( payload, 1 );
         state.data.boxId = payload - 1;
         //console.log(state.data.boxId);
      },
      ADDQUESTION( state, payload ) {

         var newObj = {};
         $.extend( true, newObj, state.data.typelist[ payload ] );
         state.data.typelist.splice( payload, 0, newObj );
      },
      CHANGETEXTAREASIZE( state, payload ) {

         state.data.typelist[ state.data.boxId ].size = payload;
      },
      CHANGEDATESTART( state, payload ) {

         state.data.typelist[ state.data.boxId ].start = payload;
      },
      CHANGEDATEEND( state, payload ) {

         state.data.typelist[ state.data.boxId ].end = payload;
      },
      CHANGESLIDERPRO( state, payload ) {

         let _type = payload.type;
         state.data.typelist[ state.data.boxId ].sliderPro[ _type ] = payload.value;
      },
      CHANGERAREOPTIONS( state, payload ) {
         Vue.set( state.data.typelist[ state.data.boxId ].texts, payload.index, payload.newValue );
      },
      CHANGEOPTINON( state, payload ) {
         switch ( payload.type ) {
            case 'add':
               state.data.typelist[ state.data.boxId ].texts.push( '非常满意' );
               break;
            case 'del':
               state.data.typelist[ state.data.boxId ].texts.splice( payload.index, 1 );
               break;
         }
      },
      SORTOPTIONS( state, payload ) {
         //let a = state.data.typelist[state.data.boxId].options[payload.beforPosition];
         //let b = state.data.typelist[state.data.boxId].options[payload.afterPosition];
         //Vue.set(state.data.typelist[state.data.boxId].options, payload.beforPosition, b);
         //Vue.set(state.data.typelist[state.data.boxId].options, payload.afterPosition, a);
         var a = state.data.typelist[ state.data.boxId ].options[ payload.beforPosition ];
         state.data.typelist[ state.data.boxId ].options.splice( payload.beforPosition, 1 );
         state.data.typelist[ state.data.boxId ].options.splice( payload.afterPosition, 0, a );
      },
      SETUPLOADSTATE(state , payload){
         state.uploadState = payload.value;
         if(payload.ID){
            state.ID = payload.ID;
         }
      },
      CHANGEEDITBOXCONTENT(state , payload){
         state.ID = payload.ID;
         state.data = payload.data;
         payload.uploadState = payload.uploadState;
      },
      CREATEFORM(state){
         state.ID = null;
         state.data.form = { title: "请输入表单名称", description: "描述" };
         state.data.typelist = [];
         state.data.boxId = -1;
         state.uploadState = 0;
         router.push({ path: 'main' });
      }
   },
   actions: {
      /*UPLOAD( context ) {
         console.log( context.state.data );

      }*/
      UPLOAD: async function ( context ) {
         console.log(123);
         var uploadData = { ID : context.state.ID , data : context.state.data };
         console.log(uploadData);
         var result = await fetch( "/upload", {
            method: "POST",
            body: JSON.stringify( uploadData ),
            headers: { "Content-Type": "application/json" }
         } ).then( function ( res ) {
            //console.log(res.constructor)
            return res.json();
         } );
         
         if(result.type == 'success'){
            context.commit("SETUPLOADSTATE" , {"value" : 1 , "ID" : result.ID})
         }

      }
   },
   getters: {
      onEditBoxId( state ) {
         //console.log("当前的boxid" + state.data.boxId)
         return state.data.boxId;
      },
      onFormTitle( state ) {
         return state.data.form.title;
      },
      onFormDescription( state ) {
         return state.data.form.description;
      },
      onEditBox( state ) { //获取选择题目的内容
         if ( state.data.boxId != -1 ) {
            return state.data.typelist[ state.data.boxId ];
         }

         return -1;
      },
      onEditBoxType( state, getters ) { //获取当前题目的类型
         return getters.onEditBox.type;
      },
      onEditBoxTitle( state, getters ) { //题目
         return getters.onEditBox.title;
      },
      onEditBoxRequired( state, getters ) { //是否必填
         return getters.onEditBox.required;
      },
      onEditBoxOptions( state, getters ) { //选项sole
         
         return getters.onEditBox.options;
      },
      onEditBoxOptionsLength( state, getters ) { //选项长度
         return getters.onEditBoxOptions.length;
      },
      onEditBoxOptionsRange( state, getters ) { //多选可选数量范围
         return getters.onEditBox.range;
      },
   },
   strict: process.env.NODE_ENV !== 'production',
   plugins: [ createLogger() ]

} );

new Vue( {
   el: "#root",
   store,
   router,
   components: {
      App
   }
} );

router.beforeEach((to, from, next) => {
  //console.log(to);
  //console.log(from);
  next();
})
window.router = router;

