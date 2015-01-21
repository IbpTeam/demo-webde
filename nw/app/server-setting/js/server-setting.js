/* app for setting  http-server
*/
var _data,_im;
WDC.requireAPI(['data','IM'],function(data,im){
		_data = data;
		_im = im;	
	});

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
	_data.startServer(function(done){
		console.log(done?'start sever 8888 and wsSever ok !':'start sever 8888 and wsSever failed !');
	});
	//start IM server
	_im.startIMService(function(done){
		console.log(done?'start sever 7777 ok !':'start sever 7777 failed !');
	},false);

	
	$('#close').addClass('white')
	$('#close').removeClass('disabled');
	$('#start').addClass('disabled');
	$('#start').removeClass('white');
	
}

function closeServer(){
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


