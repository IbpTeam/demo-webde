/* app for setting  http-server
*/
var _data,_im;
WDC.requireAPI(['data','IM'],function(data,im){
		_data = data;
		_im = im;	
	});

function startServer(){
	//start http server
	_data.startServer(function(done){
		console.log(done?'start sever 8888 and wsSever ok !':'start sever 8888 and wsSever failed !');
	});
	//start IM server
	_im.startIMService(function(done){
		console.log(done?'start sever 7777 ok !':'start sever 7777 failed !');
	},false);
	
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
	
}

function test(){
	console.log('test-----------');
}