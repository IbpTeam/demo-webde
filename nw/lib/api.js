// API lib.
console.log("head of api.js.");
var WDC;
try {
  WDC = require('demo-rio');
  WDC.requireAPI(['data'], function(data){
    var dataApi = data;
    process.on('uncaughtException',function(err){
      var msgBox = MessageBox.create('errorDlg',{
        title: 'Error:uncaughtException',
        width: 350,
        height: 200,
        close: true,
        buttons: [{
          text: '确  定',
          clkaction: function() {
            location.reload(true);
            msgBox.close();
          }
        }, {
          text: '取  消',
          clkaction: function() {
            msgBox.close();
          }
        }]
      });
      dataApi.setSysLog(function(err,result){
        if(err){
          console.log(err);
          return ;
        }
        msgBox.post("Do you want to reload?");
      },err.message+err.stack);
    });
  });
} catch(e) {
  console.log("error:", e.stack);
  console.log(e, "Error: Can not load nodewebkit modules, so we can not use the WDC api.");
}

console.log("end of api.js.");
