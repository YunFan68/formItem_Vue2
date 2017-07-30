var port = (process.env.VMC_APP_PORT || 3000);
var host = (process.env.VCAP_APP_HOST || 'localhost');
const express = require("express");
const fs = require("fs");
const formidable = require("formidable");
const app = express();

/*leanCloud 云存储*/
var AV = require('leancloud-storage'); 
var APP_ID = '8mYwA23YxPRAkp5l5z4cotMe-gzGzoHsz';
var APP_KEY = 'IIwpWJcMiVJAlPMfDDQs5lUz';

AV.init({
  appId: APP_ID,
  appKey: APP_KEY
});
var Forms = AV.Object.extend('Forms');



app.use(express.static("www"));


app.get("/typeAll", function(req, res) {
   fs.readFile("./database/db.json", function(err, data) {
      let dataObj = JSON.parse(data.toString());
      res.json({ "typeList": dataObj.typeList });
   });

});

app.get("/getAllForms" , function(req , res) {
	var query = new AV.Query('Forms');
	query.find().then(function (data){
		//console.log(data);
		res.json(data)
	})
});

app.post("/DeleteForm" , (req , res) => {
	var form = new formidable.IncomingForm();
	form.parse(req, function(err, fields, files) {
		//console.log("id:"+fields.ID);
		var formData = AV.Object.createWithoutData('Forms', fields.ID);
		formData.destroy().then(function (success) {
		  // 删除成功
		  res.json({"type" : "del" , "state" : "success"});
		}, function (error) {
		  // 删除失败
		  res.json({"type" : "del" , "state" : "failed"});
		});
	});
});
app.post("/upload" , (req , res) => {
	var form = new formidable.IncomingForm();
	form.parse(req, function(err, fields, files) {
		//console.log(fields)
		let formData;
		if(!fields.ID){

			formData = new Forms();
			formData.set("form",fields.data.form);
			formData.set("typelist",fields.data.typelist);
			formData.set("boxId",fields.data.boxId);

		}else{
			// 第一个参数是 className，第二个参数是 objectId
			formData = AV.Object.createWithoutData('Forms', fields.ID);
			// 修改属性
			formData.set("form",fields.data.form);
			formData.set("typelist",fields.data.typelist);
			formData.set("boxId",fields.data.boxId);
			// 保存到云端
		}
		formData.save().then((formData) => {
			res.json({"type" : "success" , "ID" : formData.id})
		} , (err) => {
			console.log(err.message);
		});

	});

	
});

app.listen(port, () => {
   console.log('3000');
})


