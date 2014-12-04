var PlayList = Class.extend({
  init:function(options_, list_){
    this._options = {
      search: true,
      title : 'video list:',
      callback_: undefined,
      img : 'img/bulb.png'
    }
    this._firstVideo = undefined;
    if (options_) {
      for(var key in options_)
        this._options[key] = options_[key];
    };
    this._playList = {};
    if (list_) {
      this._playList = list_;
    }
    this._bkgDiv = $('<div>', {
      'class': "playList-trigger"
    });
    this._listviewContent = $('<div>',{
      'class' : 'playList'
    });
    this._bkgDiv.append(this._listviewContent);
    if (this._options.search) {
      this.addTitle('Search:');
      this._input = $('<input>',{
        'id' : 'search-play',
        'type' : 'text'
      });
      this.addTitle(this._input);
    };
    if (this._options.title) {
      this.addTitle(this._options.title);
    };
    this._listview = ListView.create('playlist');
    this._listview.attach(this._listviewContent);
    this._bottom = $('<div>',{
      'class' : 'playList-bottom'
    });
    this._listviewContent.append(this._bottom);
    $('body').append(this._bkgDiv);
  },

  addTitle:function(obj_){
    var _span = $('<span>',{
      'class' : 'playList-title'
    });
    this._listviewContent.append(_span);
    if (typeof obj_ === 'string') {
      _span.text(obj_);
    } else {
      _span.append(obj_);
    }
  },

  setList: function(list_){
        for(var key in list_)
      {
        console.log(list_[key]);
      }
    var getName = function(path_){
      var _Arr = path_.split('/');
      return _Arr[_Arr.length - 1];
    }
    if (typeof list_ === 'object') {
      for(var key in list_){
        var _name = getName(list_[key]);
        this._playList[_name] = list_[key];
        console.log(list_[key]);
        if (!this._firstVideo) {
          this._firstVideo = list_[key];
        };
      }
    };
    this.setPlayList();
  },

  setPlayList:function(){
    var _this = this;

    var selectItem = function(li_){
      if( li_ == null ) return alert("No match!");
      var _select = li_.selectValue;
      if (_this._playList[_select]) {
        _this._options.callback_(_this._playList[_select]);
      };
    };

    var _playArr = [];
    for(var key in this._playList){
      _playArr.push(key); 
      var _item = [{
        id: key,
        type: 'item',
        text: key,
        img: _this._options.img,
        clkaction: function(){
          _this._options.callback_(_this._playList[this.text]);
        }
      }]
      _this._listview.addItems(_item);
    }
    AutoComplete.create(this._input,_playArr,{
      delay:10,
      minChars:1,
      matchSubset:1,
      onItemSelect: selectItem,
      autoFill:true,
      maxItemsToShow:6,
      selectFirst: true
    });
  }
});

