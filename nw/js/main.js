//This is the main file of this project

var _global = null;
function onStart() {
  _global = Global.create(function(err_) {
    if(err_) throw err_;
    _global.addGObjects({
      'name': 'theme',
      'class': ThemeModel,
      'serialize': true
    }, {
      'name': 'utilIns',
      'class': Util,
      'serialize': false 
    }, {
      'name': 'desktop',
      'class': DesktopModel,
      'serialize': true
    }, {
      'name': 'theCP',
      'class': CommandProcessor,
      'serialize': false
    }, {
      'name': 'ctxMenu',
      'class': ContextMenu,
      'serialize': false
    });
  });
}

