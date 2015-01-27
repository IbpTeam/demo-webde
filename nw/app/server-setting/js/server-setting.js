/* app for setting  http-server
*/
var _data,_im;
WDC.requireAPI(['data','IM'],function(data,im){
		_data = data;
		_im = im;	
	});
var _global = undefined;
var _deviceList = undefined;
try {
  _global = parent._global;
  if (_global) {
    _deviceList = _global.get('desktop').getCOMById('device-list');
  }
} catch (e) {
  console.log(e);
}

$(document).ready(function() {
	console.log("Starting Server-setting App...");
	init();
});

function init(){
	$('#close').addClass('white')
	$('#close').removeClass('disabled');
	$('#start').addClass('disabled');
	$('#start').removeClass('white');
	console.log("init() has been executed...");
}
function startServer(){
	//start http server
	_data.startServer(function(done) {
    if (done) {
      console.log('start sever 8888 and wsSever ok !');
      _global.get('ws').setConnection(function() {
        _im.startIMService(function(done) {
          if (done) {
            _deviceList.start();
            console.log('start sever 7777 ok !');
          } else {
            console.log('start sever 7777 failed !');
          }
        }, false);
      });
    } else {
      console.log('start sever 8888 and wsSever failed !');
    }
  });
	
	$('#close').addClass('white')
	$('#close').removeClass('disabled');
	$('#start').addClass('disabled');
	$('#start').removeClass('white');
	
}

function closeServer(){
	_deviceList.release();
	//close http server
	_data.closeServer(function(done){
		console.log(done?'close sever 8888 and wsSever ok !':'close sever 8888 and wsSever failed !');
	});
	//close IM server
	_im.closeIMService(function(done){
		console.log(done?'close sever 7777 ok !':'close sever 7777 failed !');
	},false);
	$('#close').removeClass('white')
	$('#close').addClass('disabled');
	$('#start').removeClass('disabled');
	$('#start').addClass('white');
}
