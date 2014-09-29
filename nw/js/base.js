//This file includes base classes and all abstract interfaces used in this project
//

//Base Class for every class in this project
//
function Class() {}

//Use extend to realize inhrietion
//
Class.extend = function extend(props) {
	var prototype = new this();
	var _super = this.prototype;

	for(var name in props) {
		//if a function of subclass has the same name with super
		//override it, not overwrite
		//use this.callSuper to call the super's function
		//
		if(typeof props[name] == "function"
				&& typeof _super[name] == "function") {
			prototype[name] = (function(super_fn, fn) {
				return function() {
					var tmp = this.callSuper;
					this.callSuper = super_fn;
					
					var ret = fn.apply(this, arguments);

					this.callSuper = tmp;
					
					if(!this.callSuper) {
						delete this.callSuper;
					}

					return ret;
				}
			})(_super[name], props[name])
		} else {
			prototype[name] = props[name];
		}
	}

	var SubClass = function() {};

	SubClass.prototype = prototype;
	SubClass.prototype.constructor = SubClass;

	SubClass.extend = extend;
	//Use create to replace new
	//we need give our own init function to do some initialization
	//
	SubClass.create = SubClass.prototype.create = function() {
		var instance = new this();

		if(instance.init) {
			instance.init.apply(instance, arguments);
		}

		return instance;
	}

	return SubClass;
}

//Event base Class
//Inherited from Node.js' EventEmitter
//require('events').EventEmitter.prototype
var Event = Class.extend({
	init: function() {
		this._handlers = [];
	},

	on: function(event_, handler_) {
		if(typeof this._handlers[event_] === 'undefined') {
			this._handlers[event_] = [];
		}
		this._handlers[event_].push(handler_);
		return this;
	},

	off: function(event_, handler_) {
		var idx;
		for(idx = 0; idx < this._handlers[event_].length; ++idx) {
			if(handler_ == this._handlers[event_][idx]) break;
		}
		this._handlers[event_].splice(idx, 1);
		return this;
	},

	emit: function(event_) {
		if(typeof this._handlers[event_] === 'undefined') return ;
		var args = arguments.slice(1);
		for(var i = 0; i < this._handlers[event_].length; ++i) {
			this._handlers[event_][i].apply(this, args);
		}
		return this;
	}
});

//The base Class for Model classes
//
var Model = Event.extend({
	init: function(id_) {
		this._id = id_;
		// this._obList = [];
	},

	// addObserver: function(observer_) {
		// this._obList[observer_._id] = observer_;
	// },

	// removeObserver: function(observer_) {
		// delete this._obList[observer_._id];
	// },

	// notify: function(updatedObj_) {
		// for(var key in this._obList) {
			// this._obList[key].update(updatedObj_);
		// }
	/* } */
});

//The base Class for Observer classes
//
var Observer = Class.extend({
	init: function(id_) {
		this._id = id_;
	},

	registObservers: function() {}
});

//The base Class for View classes
//One kind of Observer
//
var View = Observer.extend({
	init: function(model_) {
		this.callSuper(model_._id + '-view');
		this._model = model_;
		this._controller = null; // created by subclasses
		// this._ops = []; // this array contains ops to update this view

		// this._model.addObserver(this);
	},
	
	destroy: function() {
		// this._model.removeObserver(this);
	},

	show: function() {
		this.$view.show();
	},

	hide: function() {
		this.$view.hide();
	}
});

//The base Class for Controller classes
//One kind of Observer
//
var Controller = Observer.extend({
	init: function(view_) {
		this.callSuper(view_._model._id + '-controller');
		this._model = view_._model;
		this._view = view_;

		// this._model.addObserver(this);
	},

	destroy: function() {
		// this._model.removeObserver(this);
	}
});
