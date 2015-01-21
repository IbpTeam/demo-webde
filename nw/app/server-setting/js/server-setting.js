/* app for setting  http-server
 */
var _data, _im;
WDC.requireAPI(['data', 'IM'], function(data, im) {
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

function startServer() {
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
}

function closeServer() {
  _deviceList.release();
  _global.get('ws').close();
  //close http server
  _data.closeServer(function(done) {
    console.log(done ? 'close sever 8888 and wsSever ok !' : 'close sever 8888 and wsSever failed !');
  });
  //close IM server
  _im.closeIMService(function(done) {
    console.log(done ? 'close sever 7777 ok !' : 'close sever 7777 failed !');
  }, false);
}
