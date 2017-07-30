<style scoped lang="stylus">
.btn {
   position: absolute;
   right: 10px;
   top: -43px;
}
</style>
<template>
   <div style="position:relative;">
      <el-table :data="tableData" border style="width: 100%">
         <el-table-column label="创建时间" width="250">
            <template scope="scope">
               <el-icon name="time"></el-icon>
               <span style="margin-left: 10px">{{ scope.row.createdAt }}</span>
            </template>
         </el-table-column>
         <el-table-column label="最后修改时间" width="250">
            <template scope="scope">
               <el-icon name="time"></el-icon>
               <span style="margin-left: 10px">{{ scope.row.updatedAt }}</span>
            </template>
         </el-table-column>
         <el-table-column label="表单名称" width="180">
            <template scope="scope">
               <el-popover trigger="hover" placement="top">
                  <p>简介: {{ scope.row.form.description }}</p>
                  <!-- <p>住址: {{ scope.row.address }}</p> -->
                  <div slot="reference" class="name-wrapper">
                     <el-tag>{{ scope.row.form.title }}</el-tag>
                  </div>
               </el-popover>
            </template>
         </el-table-column>
         <el-table-column label="操作">
            <template scope="scope">
               <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
               <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
               <el-button size="small" type="info" @click="handleGenerate(scope.$index, scope.row)">生成</el-button>
            </template>
         </el-table-column>
         <el-table-column label="数据">
            <template scope="scope">
               <el-button size="small" type="success">数据统计</el-button>
            </template>
         </el-table-column>
      </el-table>
      <el-button class="btn" type="success" @click="createForm"><i class="el-icon-document el-icon--right"></i>&nbsp;新建表单</el-button>
   </div>
</template>
<script>
export default {
   data() {
         return {
            tableData: []
         }
      },
      methods: {
         handleEdit(index, row) {
            //console.log(index, row);
            this.$store.commit("CHANGEEDITBOXCONTENT", {
               ID: row.objectId,
               data: {
                  form: row.form,
                  typelist: row.typelist,
                  boxId: row.boxId
               },
               uploadState: 0
            });
            router.push({
               path: 'main'
            });
         },
         handleDelete(index, row) {
            var self = this;
            this.$confirm('此操作将永久删除该表单, 是否继续?', '提示', {
               confirmButtonText: '确定',
               cancelButtonText: '取消',
               type: 'warning'
            }).then(() => {
               $.post("/DeleteForm", {
                  ID: row.objectId
               }, function(data) {
                  if (data.type == "del" && data.state == "success") {
                     $.get("/getAllForms", function(data) {
                        self.tableData = data;
                     });
                  }
               });
               this.$message({
                  type: 'success',
                  message: '删除成功!'
               });
            }).catch(() => {
               this.$message({
                  type: 'info',
                  message: '已取消删除'
               });
            });
         },
         handleGenerate(index, row){
             //console.log(index, row);
             
            this.$store.commit("CHANGEEDITBOXCONTENT", {
               ID: row.objectId,
               data: {
                  form: row.form,
                  typelist: row.typelist,
                  boxId: row.boxId
               },
               uploadState: 0
            });
            router.push({ path: 'show' })
         },
         createForm() {
            //console.log(123)
            this.$store.commit("CREATEFORM");
         }
      },
      created() {
         // console.log('我去拉数据了')
         // fetch("/getAllForms").then(function( res ){
         //     var obj = res.json();
         //     console.log(obj);
         // });
         var self = this;
         $.get("/getAllForms", function(data) {
            // data.forEach(function(element, index){
            //     console.log(new Date(element.createdAt))
            //     //element.createdAt = element.createdAt.substr(0,10);
            //     //element.updatedAt = element.updatedAt.substr(0,10);
            // });
            self.tableData = data;
         });
      }
}
</script>
