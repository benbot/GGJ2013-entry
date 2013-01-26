(function () { "use strict";
var $hxClasses = {},$estr = function() { return js.Boot.__string_rec(this,''); };
function $extend(from, fields) {
	function inherit() {}; inherit.prototype = from; var proto = new inherit();
	for (var name in fields) proto[name] = fields[name];
	return proto;
}
var ApplicationMain = function() { }
$hxClasses["ApplicationMain"] = ApplicationMain;
ApplicationMain.__name__ = ["ApplicationMain"];
ApplicationMain.main = function() {
	ApplicationMain.completed = 0;
	ApplicationMain.loaders = new Hash();
	ApplicationMain.urlLoaders = new Hash();
	ApplicationMain.total = 0;
	ApplicationMain.preloader = new com.haxepunk.Preloader();
	nme.Lib.get_current().addChild(ApplicationMain.preloader);
	ApplicationMain.preloader.onInit();
	var loader = new browser.display.Loader();
	ApplicationMain.loaders.set("graphics/baby.png",loader);
	ApplicationMain.total++;
	var loader1 = new browser.display.Loader();
	ApplicationMain.loaders.set("graphics/walkBabyDown.png",loader1);
	ApplicationMain.total++;
	var loader2 = new browser.display.Loader();
	ApplicationMain.loaders.set("graphics/walkBabyUp.png",loader2);
	ApplicationMain.total++;
	var loader3 = new browser.display.Loader();
	ApplicationMain.loaders.set("graphics/walkingBaby.png",loader3);
	ApplicationMain.total++;
	var loader4 = new browser.display.Loader();
	ApplicationMain.loaders.set("gfx/debug/console_debug.png",loader4);
	ApplicationMain.total++;
	var loader5 = new browser.display.Loader();
	ApplicationMain.loaders.set("gfx/debug/console_logo.png",loader5);
	ApplicationMain.total++;
	var loader6 = new browser.display.Loader();
	ApplicationMain.loaders.set("gfx/debug/console_output.png",loader6);
	ApplicationMain.total++;
	var loader7 = new browser.display.Loader();
	ApplicationMain.loaders.set("gfx/debug/console_pause.png",loader7);
	ApplicationMain.total++;
	var loader8 = new browser.display.Loader();
	ApplicationMain.loaders.set("gfx/debug/console_play.png",loader8);
	ApplicationMain.total++;
	var loader9 = new browser.display.Loader();
	ApplicationMain.loaders.set("gfx/debug/console_step.png",loader9);
	ApplicationMain.total++;
	var loader10 = new browser.display.Loader();
	ApplicationMain.loaders.set("gfx/preloader/haxepunk.png",loader10);
	ApplicationMain.total++;
	if(ApplicationMain.total == 0) ApplicationMain.begin(); else {
		var $it0 = ApplicationMain.loaders.keys();
		while( $it0.hasNext() ) {
			var path = $it0.next();
			var loader11 = ApplicationMain.loaders.get(path);
			loader11.contentLoaderInfo.addEventListener("complete",ApplicationMain.loader_onComplete);
			loader11.load(new browser.net.URLRequest(path));
		}
		var $it1 = ApplicationMain.urlLoaders.keys();
		while( $it1.hasNext() ) {
			var path = $it1.next();
			var urlLoader = ApplicationMain.urlLoaders.get(path);
			urlLoader.addEventListener("complete",ApplicationMain.loader_onComplete);
			urlLoader.load(new browser.net.URLRequest(path));
		}
	}
}
ApplicationMain.begin = function() {
	ApplicationMain.preloader.addEventListener(browser.events.Event.COMPLETE,ApplicationMain.preloader_onComplete);
	ApplicationMain.preloader.onLoaded();
}
ApplicationMain.loader_onComplete = function(event) {
	ApplicationMain.completed++;
	ApplicationMain.preloader.onUpdate(ApplicationMain.completed,ApplicationMain.total);
	if(ApplicationMain.completed == ApplicationMain.total) ApplicationMain.begin();
}
ApplicationMain.preloader_onComplete = function(event) {
	ApplicationMain.preloader.removeEventListener(browser.events.Event.COMPLETE,ApplicationMain.preloader_onComplete);
	nme.Lib.get_current().removeChild(ApplicationMain.preloader);
	ApplicationMain.preloader = null;
	if(Reflect.field(Main,"main") == null) {
		var mainDisplayObj = new Main();
		if(js.Boot.__instanceof(mainDisplayObj,browser.display.DisplayObject)) nme.Lib.get_current().addChild(mainDisplayObj);
	} else Reflect.field(Main,"main").apply(Main,[]);
}
var browser = {}
browser.text = {}
browser.text.Font = function() {
	this.nmeMetrics = [];
	this.nmeFontScale = 9.0;
	var className = Type.getClassName(Type.getClass(this));
	if(browser.text.Font.nmeFontData == null) {
		browser.text.Font.nmeFontData = [];
		browser.text.Font.nmeFontData["Bitstream_Vera_Sans"] = browser.text.Font.DEFAULT_FONT_DATA;
	}
	if(className == "browser.text.Font") this.set_fontName("Bitstream_Vera_Sans"); else this.set_fontName(className.split(".").pop());
};
$hxClasses["browser.text.Font"] = browser.text.Font;
browser.text.Font.__name__ = ["browser","text","Font"];
browser.text.Font.nmeOfResource = function(name) {
	var data = haxe.Resource.getString(name);
	if(data == null) console.log("Resource data for string '" + name + "' not found."); else browser.text.Font.nmeFontData[name] = data;
}
browser.text.Font.prototype = {
	set_fontName: function(name) {
		if(name == "_sans" || name == "_serif" || name == "_typewriter") name = "Bitstream_Vera_Sans";
		this.fontName = name;
		if(browser.text.Font.nmeFontData[this.fontName] == null) try {
			browser.text.Font.nmeOfResource(name);
		} catch( e ) {
			console.log("Glyph data for font '" + name + "' does not exist, defaulting to '" + "Bitstream_Vera_Sans" + "'.");
			this.fontName = "Bitstream_Vera_Sans";
		} else try {
			this.nmeGlyphData = haxe.Unserializer.run(browser.text.Font.nmeFontData[this.fontName]);
		} catch( e ) {
			console.log("Error decoding font '" + name + "', defaulting to '" + "Bitstream_Vera_Sans" + "'.");
			this.fontName = "Bitstream_Vera_Sans";
		}
		return name;
	}
	,nmeSetScale: function(scale) {
		this.nmeFontScale = scale / 1024;
	}
	,nmeRender: function(graphics,inChar,inX,inY,inOutline) {
		var index = 0;
		var glyph = this.nmeGlyphData.get(inChar);
		if(glyph == null) return;
		var commands = glyph.commands;
		var data = glyph.data;
		var _g = 0;
		while(_g < commands.length) {
			var c = commands[_g];
			++_g;
			switch(c) {
			case 1:
				graphics.moveTo(inX + data[index++] * this.nmeFontScale,inY + data[index++] * this.nmeFontScale);
				break;
			case 2:
				graphics.lineTo(inX + data[index++] * this.nmeFontScale,inY + data[index++] * this.nmeFontScale);
				break;
			case 3:
				graphics.curveTo(inX + data[index++] * this.nmeFontScale,inY + data[index++] * this.nmeFontScale,inX + data[index++] * this.nmeFontScale,inY + data[index++] * this.nmeFontScale);
				break;
			}
		}
	}
	,nmeGetAdvance: function(inGlyph,height) {
		var m = this.nmeMetrics[inGlyph];
		if(m == null) {
			var glyph = this.nmeGlyphData.get(inGlyph);
			if(glyph == null) return 0;
			this.nmeMetrics[inGlyph] = m = glyph._width * this.nmeFontScale | 0;
		}
		if(m == null) return 0;
		return m;
	}
	,__class__: browser.text.Font
	,__properties__: {set_fontName:"set_fontName"}
}
var NME_font_04b_03___ttf = function() {
	browser.text.Font.call(this);
};
$hxClasses["NME_font_04b_03___ttf"] = NME_font_04b_03___ttf;
NME_font_04b_03___ttf.__name__ = ["NME_font_04b_03___ttf"];
NME_font_04b_03___ttf.__super__ = browser.text.Font;
NME_font_04b_03___ttf.prototype = $extend(browser.text.Font.prototype,{
	__class__: NME_font_04b_03___ttf
});
var Assets = function() {
};
$hxClasses["Assets"] = Assets;
Assets.__name__ = ["Assets"];
Assets.prototype = {
	__class__: Assets
}
var EReg = function(r,opt) {
	opt = opt.split("u").join("");
	this.r = new RegExp(r,opt);
};
$hxClasses["EReg"] = EReg;
EReg.__name__ = ["EReg"];
EReg.prototype = {
	replace: function(s,by) {
		return s.replace(this.r,by);
	}
	,matched: function(n) {
		return this.r.m != null && n >= 0 && n < this.r.m.length?this.r.m[n]:(function($this) {
			var $r;
			throw "EReg::matched";
			return $r;
		}(this));
	}
	,match: function(s) {
		if(this.r.global) this.r.lastIndex = 0;
		this.r.m = this.r.exec(s);
		this.r.s = s;
		return this.r.m != null;
	}
	,__class__: EReg
}
var Hash = function() {
	this.h = { };
};
$hxClasses["Hash"] = Hash;
Hash.__name__ = ["Hash"];
Hash.prototype = {
	iterator: function() {
		return { ref : this.h, it : this.keys(), hasNext : function() {
			return this.it.hasNext();
		}, next : function() {
			var i = this.it.next();
			return this.ref["$" + i];
		}};
	}
	,keys: function() {
		var a = [];
		for( var key in this.h ) {
		if(this.h.hasOwnProperty(key)) a.push(key.substr(1));
		}
		return HxOverrides.iter(a);
	}
	,remove: function(key) {
		key = "$" + key;
		if(!this.h.hasOwnProperty(key)) return false;
		delete(this.h[key]);
		return true;
	}
	,exists: function(key) {
		return this.h.hasOwnProperty("$" + key);
	}
	,get: function(key) {
		return this.h["$" + key];
	}
	,set: function(key,value) {
		this.h["$" + key] = value;
	}
	,__class__: Hash
}
var HxOverrides = function() { }
$hxClasses["HxOverrides"] = HxOverrides;
HxOverrides.__name__ = ["HxOverrides"];
HxOverrides.strDate = function(s) {
	switch(s.length) {
	case 8:
		var k = s.split(":");
		var d = new Date();
		d.setTime(0);
		d.setUTCHours(k[0]);
		d.setUTCMinutes(k[1]);
		d.setUTCSeconds(k[2]);
		return d;
	case 10:
		var k = s.split("-");
		return new Date(k[0],k[1] - 1,k[2],0,0,0);
	case 19:
		var k = s.split(" ");
		var y = k[0].split("-");
		var t = k[1].split(":");
		return new Date(y[0],y[1] - 1,y[2],t[0],t[1],t[2]);
	default:
		throw "Invalid date format : " + s;
	}
}
HxOverrides.cca = function(s,index) {
	var x = s.charCodeAt(index);
	if(x != x) return undefined;
	return x;
}
HxOverrides.substr = function(s,pos,len) {
	if(pos != null && pos != 0 && len != null && len < 0) return "";
	if(len == null) len = s.length;
	if(pos < 0) {
		pos = s.length + pos;
		if(pos < 0) pos = 0;
	} else if(len < 0) len = s.length + len - pos;
	return s.substr(pos,len);
}
HxOverrides.remove = function(a,obj) {
	var i = 0;
	var l = a.length;
	while(i < l) {
		if(a[i] == obj) {
			a.splice(i,1);
			return true;
		}
		i++;
	}
	return false;
}
HxOverrides.iter = function(a) {
	return { cur : 0, arr : a, hasNext : function() {
		return this.cur < this.arr.length;
	}, next : function() {
		return this.arr[this.cur++];
	}};
}
var IntHash = function() {
	this.h = { };
};
$hxClasses["IntHash"] = IntHash;
IntHash.__name__ = ["IntHash"];
IntHash.prototype = {
	iterator: function() {
		return { ref : this.h, it : this.keys(), hasNext : function() {
			return this.it.hasNext();
		}, next : function() {
			var i = this.it.next();
			return this.ref[i];
		}};
	}
	,keys: function() {
		var a = [];
		for( var key in this.h ) {
		if(this.h.hasOwnProperty(key)) a.push(key | 0);
		}
		return HxOverrides.iter(a);
	}
	,exists: function(key) {
		return this.h.hasOwnProperty(key);
	}
	,get: function(key) {
		return this.h[key];
	}
	,set: function(key,value) {
		this.h[key] = value;
	}
	,__class__: IntHash
}
var Lambda = function() { }
$hxClasses["Lambda"] = Lambda;
Lambda.__name__ = ["Lambda"];
Lambda.indexOf = function(it,v) {
	var i = 0;
	var $it0 = $iterator(it)();
	while( $it0.hasNext() ) {
		var v2 = $it0.next();
		if(v == v2) return i;
		i++;
	}
	return -1;
}
var List = function() {
	this.length = 0;
};
$hxClasses["List"] = List;
List.__name__ = ["List"];
List.prototype = {
	iterator: function() {
		return { h : this.h, hasNext : function() {
			return this.h != null;
		}, next : function() {
			if(this.h == null) return null;
			var x = this.h[0];
			this.h = this.h[1];
			return x;
		}};
	}
	,clear: function() {
		this.h = null;
		this.q = null;
		this.length = 0;
	}
	,first: function() {
		return this.h == null?null:this.h[0];
	}
	,push: function(item) {
		var x = [item,this.h];
		this.h = x;
		if(this.q == null) this.q = x;
		this.length++;
	}
	,add: function(item) {
		var x = [item];
		if(this.h == null) this.h = x; else this.q[1] = x;
		this.q = x;
		this.length++;
	}
	,__class__: List
}
browser.events = {}
browser.events.IEventDispatcher = function() { }
$hxClasses["browser.events.IEventDispatcher"] = browser.events.IEventDispatcher;
browser.events.IEventDispatcher.__name__ = ["browser","events","IEventDispatcher"];
browser.events.IEventDispatcher.prototype = {
	__class__: browser.events.IEventDispatcher
}
browser.events.EventDispatcher = function(target) {
	if(target != null) this.nmeTarget = target; else this.nmeTarget = this;
	this.nmeEventMap = [];
};
$hxClasses["browser.events.EventDispatcher"] = browser.events.EventDispatcher;
browser.events.EventDispatcher.__name__ = ["browser","events","EventDispatcher"];
browser.events.EventDispatcher.__interfaces__ = [browser.events.IEventDispatcher];
browser.events.EventDispatcher.compareListeners = function(l1,l2) {
	return l1.mPriority == l2.mPriority?0:l1.mPriority > l2.mPriority?-1:1;
}
browser.events.EventDispatcher.prototype = {
	willTrigger: function(type) {
		return this.hasEventListener(type);
	}
	,toString: function() {
		return "[ " + this.__name__ + " ]";
	}
	,setList: function(type,list) {
		this.nmeEventMap[type] = list;
	}
	,removeEventListener: function(type,listener,inCapture) {
		if(inCapture == null) inCapture = false;
		if(!this.existList(type)) return;
		var list = this.getList(type);
		var capture = inCapture == null?false:inCapture;
		var _g1 = 0, _g = list.length;
		while(_g1 < _g) {
			var i = _g1++;
			if(list[i].Is(listener,capture)) {
				list.splice(i,1);
				return;
			}
		}
	}
	,hasEventListener: function(type) {
		return this.existList(type);
	}
	,getList: function(type) {
		return this.nmeEventMap[type];
	}
	,existList: function(type) {
		return this.nmeEventMap != null && this.nmeEventMap[type] != undefined;
	}
	,dispatchEvent: function(event) {
		if(event.target == null) event.target = this.nmeTarget;
		var capture = event.eventPhase == browser.events.EventPhase.CAPTURING_PHASE;
		if(this.existList(event.type)) {
			var list = this.getList(event.type);
			var idx = 0;
			while(idx < list.length) {
				var listener = list[idx];
				if(listener.mUseCapture == capture) {
					listener.dispatchEvent(event);
					if(event.nmeGetIsCancelledNow()) return true;
				}
				if(idx < list.length && listener != list[idx]) {
				} else idx++;
			}
			return true;
		}
		return false;
	}
	,addEventListener: function(type,inListener,useCapture,inPriority,useWeakReference) {
		if(useWeakReference == null) useWeakReference = false;
		if(inPriority == null) inPriority = 0;
		if(useCapture == null) useCapture = false;
		var capture = useCapture == null?false:useCapture;
		var priority = inPriority == null?0:inPriority;
		var list = this.getList(type);
		if(!this.existList(type)) {
			list = [];
			this.setList(type,list);
		}
		list.push(new browser.events.Listener(inListener,capture,priority));
		list.sort(browser.events.EventDispatcher.compareListeners);
	}
	,__class__: browser.events.EventDispatcher
}
browser.display = {}
browser.display.IBitmapDrawable = function() { }
$hxClasses["browser.display.IBitmapDrawable"] = browser.display.IBitmapDrawable;
browser.display.IBitmapDrawable.__name__ = ["browser","display","IBitmapDrawable"];
browser.display.IBitmapDrawable.prototype = {
	__class__: browser.display.IBitmapDrawable
}
browser.display.DisplayObject = function() {
	browser.events.EventDispatcher.call(this,null);
	this._nmeId = browser.utils.Uuid.uuid();
	this.set_parent(null);
	this.set_transform(new browser.geom.Transform(this));
	this.nmeX = 0.0;
	this.nmeY = 0.0;
	this.nmeScaleX = 1.0;
	this.nmeScaleY = 1.0;
	this.nmeRotation = 0.0;
	this.nmeWidth = 0.0;
	this.nmeHeight = 0.0;
	this.set_visible(true);
	this.alpha = 1.0;
	this.nmeFilters = new Array();
	this.nmeBoundsRect = new browser.geom.Rectangle();
	this.nmeScrollRect = null;
	this.nmeMask = null;
	this.nmeMaskingObj = null;
	this.set_nmeCombinedVisible(this.get_visible());
};
$hxClasses["browser.display.DisplayObject"] = browser.display.DisplayObject;
browser.display.DisplayObject.__name__ = ["browser","display","DisplayObject"];
browser.display.DisplayObject.__interfaces__ = [browser.display.IBitmapDrawable];
browser.display.DisplayObject.__super__ = browser.events.EventDispatcher;
browser.display.DisplayObject.prototype = $extend(browser.events.EventDispatcher.prototype,{
	set_width: function(inValue) {
		if(this.get__boundsInvalid()) this.validateBounds();
		var w = this.nmeBoundsRect.width;
		if(this.nmeScaleX * w != inValue) {
			if(w <= 0) return 0;
			this.nmeScaleX = inValue / w;
			this.nmeInvalidateMatrix(true);
			this._nmeRenderFlags |= 64;
			if(this.parent != null) this.parent._nmeRenderFlags |= 64;
		}
		return inValue;
	}
	,get_width: function() {
		if(this.get__boundsInvalid()) this.validateBounds();
		return this.nmeWidth;
	}
	,set_y: function(inValue) {
		if(this.nmeY != inValue) {
			this.nmeY = inValue;
			this.nmeInvalidateMatrix(true);
			if(this.parent != null) this.parent.nmeInvalidateBounds();
		}
		return inValue;
	}
	,get_y: function() {
		return this.nmeY;
	}
	,set_x: function(inValue) {
		if(this.nmeX != inValue) {
			this.nmeX = inValue;
			this.nmeInvalidateMatrix(true);
			if(this.parent != null) this.parent.nmeInvalidateBounds();
		}
		return inValue;
	}
	,get_x: function() {
		return this.nmeX;
	}
	,set_visible: function(inValue) {
		if(this.nmeVisible != inValue) {
			this.nmeVisible = inValue;
			this.setSurfaceVisible(inValue);
		}
		return this.nmeVisible;
	}
	,get_visible: function() {
		return this.nmeVisible;
	}
	,set_transform: function(inValue) {
		this.transform = inValue;
		this.nmeInvalidateMatrix(true);
		return inValue;
	}
	,get__topmostSurface: function() {
		var gfx = this.nmeGetGraphics();
		if(gfx != null) return gfx.nmeSurface;
		return null;
	}
	,get_stage: function() {
		var gfx = this.nmeGetGraphics();
		if(gfx != null) return browser.Lib.nmeGetStage();
		return null;
	}
	,set_scrollRect: function(inValue) {
		this.nmeScrollRect = inValue;
		return inValue;
	}
	,get_scrollRect: function() {
		if(this.nmeScrollRect == null) return null;
		return this.nmeScrollRect.clone();
	}
	,set_scaleY: function(inValue) {
		if(this.nmeScaleY != inValue) {
			this.nmeScaleY = inValue;
			this.nmeInvalidateMatrix(true);
			this._nmeRenderFlags |= 64;
			if(this.parent != null) this.parent._nmeRenderFlags |= 64;
		}
		return inValue;
	}
	,get_scaleY: function() {
		return this.nmeScaleY;
	}
	,set_scaleX: function(inValue) {
		if(this.nmeScaleX != inValue) {
			this.nmeScaleX = inValue;
			this.nmeInvalidateMatrix(true);
			this._nmeRenderFlags |= 64;
			if(this.parent != null) this.parent._nmeRenderFlags |= 64;
		}
		return inValue;
	}
	,get_scaleX: function() {
		return this.nmeScaleX;
	}
	,set_rotation: function(inValue) {
		if(this.nmeRotation != inValue) {
			this.nmeRotation = inValue;
			this.nmeInvalidateMatrix(true);
			this._nmeRenderFlags |= 64;
			if(this.parent != null) this.parent._nmeRenderFlags |= 64;
		}
		return inValue;
	}
	,get_rotation: function() {
		return this.nmeRotation;
	}
	,set_parent: function(inValue) {
		if(inValue == this.parent) return inValue;
		this.nmeInvalidateMatrix();
		if(this.parent != null) {
			HxOverrides.remove(this.parent.nmeChildren,this);
			this.parent.nmeInvalidateBounds();
		}
		if(inValue != null) {
			inValue._nmeRenderFlags |= 64;
			if(inValue.parent != null) inValue.parent._nmeRenderFlags |= 64;
		}
		if(this.parent == null && inValue != null) {
			this.parent = inValue;
			var evt = new browser.events.Event(browser.events.Event.ADDED,true,false);
			this.dispatchEvent(evt);
		} else if(this.parent != null && inValue == null) {
			this.parent = inValue;
			var evt = new browser.events.Event(browser.events.Event.REMOVED,true,false);
			this.dispatchEvent(evt);
		} else this.parent = inValue;
		return inValue;
	}
	,set_nmeCombinedVisible: function(inValue) {
		if(this.nmeCombinedVisible != inValue) {
			this.nmeCombinedVisible = inValue;
			this.setSurfaceVisible(inValue);
		}
		return this.nmeCombinedVisible;
	}
	,get_mouseY: function() {
		return this.globalToLocal(new browser.geom.Point(0,this.get_stage().get_mouseY())).y;
	}
	,get_mouseX: function() {
		return this.globalToLocal(new browser.geom.Point(this.get_stage().get_mouseX(),0)).x;
	}
	,set_mask: function(inValue) {
		if(this.nmeMask != null) this.nmeMask.nmeMaskingObj = null;
		this.nmeMask = inValue;
		if(this.nmeMask != null) this.nmeMask.nmeMaskingObj = this;
		return this.nmeMask;
	}
	,get_mask: function() {
		return this.nmeMask;
	}
	,set_height: function(inValue) {
		if(this.get__boundsInvalid()) this.validateBounds();
		var h = this.nmeBoundsRect.height;
		if(this.nmeScaleY * h != inValue) {
			if(h <= 0) return 0;
			this.nmeScaleY = inValue / h;
			this.nmeInvalidateMatrix(true);
			this._nmeRenderFlags |= 64;
			if(this.parent != null) this.parent._nmeRenderFlags |= 64;
		}
		return inValue;
	}
	,get_height: function() {
		if(this.get__boundsInvalid()) this.validateBounds();
		return this.nmeHeight;
	}
	,set_filters: function(filters) {
		var oldFilterCount = this.nmeFilters == null?0:this.nmeFilters.length;
		if(filters == null) {
			this.nmeFilters = null;
			if(oldFilterCount > 0) this.invalidateGraphics();
		} else {
			this.nmeFilters = new Array();
			var _g = 0;
			while(_g < filters.length) {
				var filter = filters[_g];
				++_g;
				this.nmeFilters.push(filter.clone());
			}
			this.invalidateGraphics();
		}
		return filters;
	}
	,get__boundsInvalid: function() {
		var gfx = this.nmeGetGraphics();
		if(gfx == null) return (this._nmeRenderFlags & 64) != 0; else return (this._nmeRenderFlags & 64) != 0 || gfx.boundsDirty;
	}
	,get_filters: function() {
		if(this.nmeFilters == null) return [];
		var result = new Array();
		var _g = 0, _g1 = this.nmeFilters;
		while(_g < _g1.length) {
			var filter = _g1[_g];
			++_g;
			result.push(filter.clone());
		}
		return result;
	}
	,get__bottommostSurface: function() {
		var gfx = this.nmeGetGraphics();
		if(gfx != null) return gfx.nmeSurface;
		return null;
	}
	,validateBounds: function() {
		if(this.get__boundsInvalid()) {
			var gfx = this.nmeGetGraphics();
			if(gfx == null) {
				this.nmeBoundsRect.x = this.get_x();
				this.nmeBoundsRect.y = this.get_y();
				this.nmeBoundsRect.width = 0;
				this.nmeBoundsRect.height = 0;
			} else {
				this.nmeBoundsRect = gfx.nmeExtent.clone();
				if(this.scale9Grid != null) {
					this.nmeBoundsRect.width *= this.nmeScaleX;
					this.nmeBoundsRect.height *= this.nmeScaleY;
					this.nmeWidth = this.nmeBoundsRect.width;
					this.nmeHeight = this.nmeBoundsRect.height;
				} else {
					this.nmeWidth = this.nmeBoundsRect.width * this.nmeScaleX;
					this.nmeHeight = this.nmeBoundsRect.height * this.nmeScaleY;
				}
				gfx.boundsDirty = false;
			}
			this._nmeRenderFlags &= -65;
		}
	}
	,toString: function() {
		return "[DisplayObject name=" + this.name + " id=" + this._nmeId + "]";
	}
	,setSurfaceVisible: function(inValue) {
		var gfx = this.nmeGetGraphics();
		if(gfx != null && gfx.nmeSurface != null) browser.Lib.nmeSetSurfaceVisible(gfx.nmeSurface,inValue);
	}
	,nmeValidateMatrix: function() {
		var parentMatrixInvalid = (this._nmeRenderFlags & 8) != 0 && this.parent != null;
		if((this._nmeRenderFlags & 4) != 0 || parentMatrixInvalid) {
			if(parentMatrixInvalid) this.parent.nmeValidateMatrix();
			var m = this.transform.get_matrix();
			if((this._nmeRenderFlags & 16) != 0) this._nmeRenderFlags &= -5;
			if((this._nmeRenderFlags & 4) != 0) {
				m.identity();
				m.scale(this.nmeScaleX,this.nmeScaleY);
				var rad = this.nmeRotation * browser.geom.Transform.DEG_TO_RAD;
				if(rad != 0.0) m.rotate(rad);
				m.translate(this.nmeX,this.nmeY);
				this.transform._matrix.copy(m);
				m;
			}
			var cm = this.transform.nmeGetFullMatrix(null);
			var fm = this.parent == null?m:this.parent.transform.nmeGetFullMatrix(m);
			this._fullScaleX = fm._sx;
			this._fullScaleY = fm._sy;
			if(cm.a != fm.a || cm.b != fm.b || cm.c != fm.c || cm.d != fm.d || cm.tx != fm.tx || cm.ty != fm.ty) {
				this.transform.nmeSetFullMatrix(fm);
				this._nmeRenderFlags |= 32;
			}
			this._nmeRenderFlags &= -29;
		}
	}
	,nmeUnifyChildrenWithDOM: function(lastMoveGfx) {
		var gfx = this.nmeGetGraphics();
		if(gfx != null && lastMoveGfx != null) browser.Lib.nmeSetSurfaceZIndexAfter(gfx.nmeSurface,lastMoveGfx.nmeSurface);
	}
	,nmeRender: function(inMask,clipRect) {
		if(!this.nmeCombinedVisible) return;
		var gfx = this.nmeGetGraphics();
		if(gfx == null) return;
		if((this._nmeRenderFlags & 4) != 0 || (this._nmeRenderFlags & 8) != 0) this.nmeValidateMatrix();
		if(gfx.nmeRender(inMask,this.nmeFilters,1,1)) {
			this._nmeRenderFlags |= 64;
			if(this.parent != null) this.parent._nmeRenderFlags |= 64;
			this.nmeApplyFilters(gfx.nmeSurface);
			this._nmeRenderFlags |= 32;
		}
		var fullAlpha = (this.parent != null?this.parent.nmeCombinedAlpha:1) * this.alpha;
		if(inMask != null) {
			var m = this.getSurfaceTransform(gfx);
			browser.Lib.nmeDrawToSurface(gfx.nmeSurface,inMask,m,fullAlpha,clipRect);
		} else {
			if((this._nmeRenderFlags & 32) != 0) {
				var m = this.getSurfaceTransform(gfx);
				browser.Lib.nmeSetSurfaceTransform(gfx.nmeSurface,m);
				this._nmeRenderFlags &= -33;
			}
			browser.Lib.nmeSetSurfaceOpacity(gfx.nmeSurface,fullAlpha);
		}
	}
	,nmeRemoveFromStage: function() {
		var gfx = this.nmeGetGraphics();
		if(gfx != null && browser.Lib.nmeIsOnStage(gfx.nmeSurface)) {
			browser.Lib.nmeRemoveSurface(gfx.nmeSurface);
			var evt = new browser.events.Event(browser.events.Event.REMOVED_FROM_STAGE,false,false);
			this.dispatchEvent(evt);
		}
	}
	,nmeMatrixOverridden: function() {
		this._nmeRenderFlags |= 16;
		this._nmeRenderFlags |= 4;
		this._nmeRenderFlags |= 64;
		if(this.parent != null) this.parent._nmeRenderFlags |= 64;
	}
	,nmeIsOnStage: function() {
		var gfx = this.nmeGetGraphics();
		if(gfx != null && browser.Lib.nmeIsOnStage(gfx.nmeSurface)) return true;
		return false;
	}
	,nmeInvalidateMatrix: function(local) {
		if(local == null) local = false;
		if(local) this._nmeRenderFlags |= 4; else this._nmeRenderFlags |= 8;
	}
	,nmeInvalidateBounds: function() {
		this._nmeRenderFlags |= 64;
		if(this.parent != null) this.parent._nmeRenderFlags |= 64;
	}
	,nmeGetObjectUnderPoint: function(point) {
		if(!this.get_visible()) return null;
		var gfx = this.nmeGetGraphics();
		if(gfx != null) {
			var extX = gfx.nmeExtent.x;
			var extY = gfx.nmeExtent.y;
			var local = this.globalToLocal(point);
			if(local.x - extX < 0 || local.y - extY < 0 || (local.x - extX) * this.get_scaleX() > this.get_width() || (local.y - extY) * this.get_scaleY() > this.get_height()) return null;
			switch( (this.get_stage().nmePointInPathMode)[1] ) {
			case 0:
				if(gfx.nmeHitTest(local.x,local.y)) return this;
				break;
			case 1:
				if(gfx.nmeHitTest(local.x * this.get_scaleX(),local.y * this.get_scaleY())) return this;
				break;
			}
		}
		return null;
	}
	,nmeGetInteractiveObjectStack: function(outStack) {
		var io = this;
		if(io != null) outStack.push(io);
		if(this.parent != null) this.parent.nmeGetInteractiveObjectStack(outStack);
	}
	,nmeGetGraphics: function() {
		return null;
	}
	,nmeFireEvent: function(event) {
		var stack = [];
		if(this.parent != null) this.parent.nmeGetInteractiveObjectStack(stack);
		var l = stack.length;
		if(l > 0) {
			event.nmeSetPhase(browser.events.EventPhase.CAPTURING_PHASE);
			stack.reverse();
			var _g = 0;
			while(_g < stack.length) {
				var obj = stack[_g];
				++_g;
				event.currentTarget = obj;
				obj.nmeDispatchEvent(event);
				if(event.nmeGetIsCancelled()) return;
			}
		}
		event.nmeSetPhase(browser.events.EventPhase.AT_TARGET);
		event.currentTarget = this;
		this.nmeDispatchEvent(event);
		if(event.nmeGetIsCancelled()) return;
		if(event.bubbles) {
			event.nmeSetPhase(browser.events.EventPhase.BUBBLING_PHASE);
			stack.reverse();
			var _g = 0;
			while(_g < stack.length) {
				var obj = stack[_g];
				++_g;
				event.currentTarget = obj;
				obj.nmeDispatchEvent(event);
				if(event.nmeGetIsCancelled()) return;
			}
		}
	}
	,nmeDispatchEvent: function(event) {
		if(event.target == null) event.target = this;
		event.currentTarget = this;
		return browser.events.EventDispatcher.prototype.dispatchEvent.call(this,event);
	}
	,nmeBroadcast: function(event) {
		this.nmeDispatchEvent(event);
	}
	,nmeApplyFilters: function(surface) {
		if(this.nmeFilters != null) {
			var _g = 0, _g1 = this.nmeFilters;
			while(_g < _g1.length) {
				var filter = _g1[_g];
				++_g;
				filter.nmeApplyFilter(surface);
			}
		}
	}
	,nmeAddToStage: function(newParent,beforeSibling) {
		var gfx = this.nmeGetGraphics();
		if(gfx == null) return;
		if(newParent.nmeGetGraphics() != null) {
			browser.Lib.nmeSetSurfaceId(gfx.nmeSurface,this._nmeId);
			if(beforeSibling != null && beforeSibling.nmeGetGraphics() != null) browser.Lib.nmeAppendSurface(gfx.nmeSurface,beforeSibling.get__bottommostSurface()); else {
				var stageChildren = [];
				var _g = 0, _g1 = newParent.nmeChildren;
				while(_g < _g1.length) {
					var child = _g1[_g];
					++_g;
					if(child.get_stage() != null) stageChildren.push(child);
				}
				if(stageChildren.length < 1) browser.Lib.nmeAppendSurface(gfx.nmeSurface,null,newParent.get__topmostSurface()); else {
					var nextSibling = stageChildren[stageChildren.length - 1];
					var container;
					while(js.Boot.__instanceof(nextSibling,browser.display.DisplayObjectContainer)) {
						container = js.Boot.__cast(nextSibling , browser.display.DisplayObjectContainer);
						if(container.nmeChildren.length > 0) nextSibling = container.nmeChildren[container.nmeChildren.length - 1]; else break;
					}
					if(nextSibling.nmeGetGraphics() != gfx) browser.Lib.nmeAppendSurface(gfx.nmeSurface,null,nextSibling.get__topmostSurface()); else browser.Lib.nmeAppendSurface(gfx.nmeSurface);
				}
			}
			browser.Lib.nmeSetSurfaceTransform(gfx.nmeSurface,this.getSurfaceTransform(gfx));
		} else if(newParent.name == "Stage") browser.Lib.nmeAppendSurface(gfx.nmeSurface);
		if(this.nmeIsOnStage()) {
			var evt = new browser.events.Event(browser.events.Event.ADDED_TO_STAGE,false,false);
			this.dispatchEvent(evt);
		}
	}
	,invalidateGraphics: function() {
		var gfx = this.nmeGetGraphics();
		if(gfx != null) {
			gfx.nmeChanged = true;
			gfx.nmeClearNextCycle = true;
		}
	}
	,globalToLocal: function(inPos) {
		if((this._nmeRenderFlags & 4) != 0 || (this._nmeRenderFlags & 8) != 0) this.nmeValidateMatrix();
		return this.transform.nmeGetFullMatrix(null).invert().transformPoint(inPos);
	}
	,getSurfaceTransform: function(gfx) {
		var extent = gfx.nmeExtentWithFilters;
		var fm = this.transform.nmeGetFullMatrix(null);
		fm.nmeTranslateTransformed(extent.get_topLeft());
		return fm;
	}
	,getBounds: function(targetCoordinateSpace) {
		if((this._nmeRenderFlags & 4) != 0 || (this._nmeRenderFlags & 8) != 0) this.nmeValidateMatrix();
		if(this.get__boundsInvalid()) this.validateBounds();
		var m = this.transform.nmeGetFullMatrix(null);
		if(targetCoordinateSpace != null) m.concat(targetCoordinateSpace.transform.nmeGetFullMatrix(null).invert());
		var rect = this.nmeBoundsRect.transform(m);
		return rect;
	}
	,drawToSurface: function(inSurface,matrix,inColorTransform,blendMode,clipRect,smoothing) {
		var oldAlpha = this.alpha;
		this.alpha = 1;
		this.nmeRender(inSurface,clipRect);
		this.alpha = oldAlpha;
	}
	,dispatchEvent: function(event) {
		var result = this.nmeDispatchEvent(event);
		if(event.nmeGetIsCancelled()) return true;
		if(event.bubbles && this.parent != null) this.parent.dispatchEvent(event);
		return result;
	}
	,__class__: browser.display.DisplayObject
	,__properties__: {set_filters:"set_filters",get_filters:"get_filters",set_height:"set_height",get_height:"get_height",get_mouseX:"get_mouseX",get_mouseY:"get_mouseY",set_nmeCombinedVisible:"set_nmeCombinedVisible",set_parent:"set_parent",set_scaleX:"set_scaleX",get_scaleX:"get_scaleX",set_scaleY:"set_scaleY",get_scaleY:"get_scaleY",get_stage:"get_stage",set_transform:"set_transform",set_visible:"set_visible",get_visible:"get_visible",set_width:"set_width",get_width:"get_width",set_x:"set_x",get_x:"get_x",set_y:"set_y",get_y:"get_y",get__bottommostSurface:"get__bottommostSurface",get__boundsInvalid:"get__boundsInvalid",get__matrixChainInvalid:"get__matrixChainInvalid",get__matrixInvalid:"get__matrixInvalid",get__topmostSurface:"get__topmostSurface"}
});
browser.display.InteractiveObject = function() {
	browser.display.DisplayObject.call(this);
	this.tabEnabled = false;
	this.mouseEnabled = true;
	this.doubleClickEnabled = true;
	this.set_tabIndex(0);
};
$hxClasses["browser.display.InteractiveObject"] = browser.display.InteractiveObject;
browser.display.InteractiveObject.__name__ = ["browser","display","InteractiveObject"];
browser.display.InteractiveObject.__super__ = browser.display.DisplayObject;
browser.display.InteractiveObject.prototype = $extend(browser.display.DisplayObject.prototype,{
	set_tabIndex: function(inIndex) {
		return this.nmeTabIndex = inIndex;
	}
	,get_tabIndex: function() {
		return this.nmeTabIndex;
	}
	,toString: function() {
		return "[InteractiveObject name=" + this.name + " id=" + this._nmeId + "]";
	}
	,nmeGetObjectUnderPoint: function(point) {
		if(!this.mouseEnabled) return null; else return browser.display.DisplayObject.prototype.nmeGetObjectUnderPoint.call(this,point);
	}
	,__class__: browser.display.InteractiveObject
	,__properties__: $extend(browser.display.DisplayObject.prototype.__properties__,{set_tabIndex:"set_tabIndex",get_tabIndex:"get_tabIndex"})
});
browser.display.DisplayObjectContainer = function() {
	this.nmeChildren = new Array();
	this.mouseChildren = true;
	this.tabChildren = true;
	browser.display.InteractiveObject.call(this);
	this.nmeCombinedAlpha = this.alpha;
};
$hxClasses["browser.display.DisplayObjectContainer"] = browser.display.DisplayObjectContainer;
browser.display.DisplayObjectContainer.__name__ = ["browser","display","DisplayObjectContainer"];
browser.display.DisplayObjectContainer.__super__ = browser.display.InteractiveObject;
browser.display.DisplayObjectContainer.prototype = $extend(browser.display.InteractiveObject.prototype,{
	set_visible: function(inVal) {
		this.set_nmeCombinedVisible(inVal);
		return browser.display.InteractiveObject.prototype.set_visible.call(this,inVal);
	}
	,set_nmeCombinedVisible: function(inVal) {
		if(inVal != this.nmeCombinedVisible) {
			var _g = 0, _g1 = this.nmeChildren;
			while(_g < _g1.length) {
				var child = _g1[_g];
				++_g;
				child.set_nmeCombinedVisible(child.get_visible() && inVal);
			}
		}
		return browser.display.InteractiveObject.prototype.set_nmeCombinedVisible.call(this,inVal);
	}
	,set_filters: function(filters) {
		browser.display.InteractiveObject.prototype.set_filters.call(this,filters);
		var _g = 0, _g1 = this.nmeChildren;
		while(_g < _g1.length) {
			var child = _g1[_g];
			++_g;
			child.set_filters(filters);
		}
		return filters;
	}
	,validateBounds: function() {
		if(this.get__boundsInvalid()) {
			browser.display.InteractiveObject.prototype.validateBounds.call(this);
			var _g = 0, _g1 = this.nmeChildren;
			while(_g < _g1.length) {
				var obj = _g1[_g];
				++_g;
				if(obj.get_visible()) {
					var r = obj.getBounds(this);
					if(r.width != 0 || r.height != 0) {
						if(this.nmeBoundsRect.width == 0 && this.nmeBoundsRect.height == 0) this.nmeBoundsRect = r.clone(); else this.nmeBoundsRect.extendBounds(r);
					}
				}
			}
			if(this.scale9Grid != null) {
				this.nmeBoundsRect.width *= this.nmeScaleX;
				this.nmeBoundsRect.height *= this.nmeScaleY;
				this.nmeWidth = this.nmeBoundsRect.width;
				this.nmeHeight = this.nmeBoundsRect.height;
			} else {
				this.nmeWidth = this.nmeBoundsRect.width * this.nmeScaleX;
				this.nmeHeight = this.nmeBoundsRect.height * this.nmeScaleY;
			}
		}
	}
	,toString: function() {
		return "[DisplayObjectContainer name=" + this.name + " id=" + this._nmeId + "]";
	}
	,swapChildren: function(child1,child2) {
		var c1 = -1;
		var c2 = -1;
		var swap;
		var _g1 = 0, _g = this.nmeChildren.length;
		while(_g1 < _g) {
			var i = _g1++;
			if(this.nmeChildren[i] == child1) c1 = i; else if(this.nmeChildren[i] == child2) c2 = i;
		}
		if(c1 != -1 && c2 != -1) {
			swap = this.nmeChildren[c1];
			this.nmeChildren[c1] = this.nmeChildren[c2];
			this.nmeChildren[c2] = swap;
			swap = null;
			this.nmeSwapSurface(c1,c2);
		}
	}
	,setChildIndex: function(child,index) {
		if(index > this.nmeChildren.length) throw "Invalid index position " + index;
		var oldIndex = this.getChildIndex(child);
		if(oldIndex < 0) {
			var msg = "setChildIndex : object " + child.name + " not found.";
			if(child.parent == this) {
				var realindex = -1;
				var _g1 = 0, _g = this.nmeChildren.length;
				while(_g1 < _g) {
					var i = _g1++;
					if(this.nmeChildren[i] == child) {
						realindex = i;
						break;
					}
				}
				if(realindex != -1) msg += "Internal error: Real child index was " + Std.string(realindex); else msg += "Internal error: Child was not in nmeChildren array!";
			}
			throw msg;
		}
		if(index < oldIndex) {
			var i = oldIndex;
			while(i > index) {
				this.swapChildren(this.nmeChildren[i],this.nmeChildren[i - 1]);
				i--;
			}
		} else if(oldIndex < index) {
			var i = oldIndex;
			while(i < index) {
				this.swapChildren(this.nmeChildren[i],this.nmeChildren[i + 1]);
				i++;
			}
		}
	}
	,removeChild: function(inChild) {
		var _g = 0, _g1 = this.nmeChildren;
		while(_g < _g1.length) {
			var child = _g1[_g];
			++_g;
			if(child == inChild) return (function($this) {
				var $r;
				child.nmeRemoveFromStage();
				child.set_parent(null);
				if($this.getChildIndex(child) >= 0) throw "Not removed properly";
				$r = child;
				return $r;
			}(this));
		}
		throw "removeChild : none found?";
	}
	,nmeUnifyChildrenWithDOM: function(lastMoveGfx) {
		var gfx1 = this.nmeGetGraphics();
		if(gfx1 != null) {
			lastMoveGfx = gfx1;
			var _g = 0, _g1 = this.nmeChildren;
			while(_g < _g1.length) {
				var child = _g1[_g];
				++_g;
				var gfx2 = child.nmeGetGraphics();
				if(gfx2 != null) {
					browser.Lib.nmeSetSurfaceZIndexAfter(gfx2.nmeSurface,lastMoveGfx.nmeSurface);
					lastMoveGfx = gfx2;
				}
				child.nmeUnifyChildrenWithDOM(lastMoveGfx);
			}
		}
	}
	,nmeSwapSurface: function(c1,c2) {
		if(this.nmeChildren[c1] == null) throw "Null element at index " + c1 + " length " + this.nmeChildren.length;
		if(this.nmeChildren[c2] == null) throw "Null element at index " + c2 + " length " + this.nmeChildren.length;
		var gfx1 = this.nmeChildren[c1].nmeGetGraphics();
		var gfx2 = this.nmeChildren[c2].nmeGetGraphics();
		if(gfx1 != null && gfx2 != null) browser.Lib.nmeSwapSurface(gfx1.nmeSurface,gfx2.nmeSurface);
	}
	,nmeRender: function(inMask,clipRect) {
		if(!this.nmeVisible) return;
		if(clipRect == null && this.nmeScrollRect != null) clipRect = this.nmeScrollRect;
		browser.display.InteractiveObject.prototype.nmeRender.call(this,inMask,clipRect);
		this.nmeCombinedAlpha = this.parent != null?this.parent.nmeCombinedAlpha * this.alpha:this.alpha;
		var _g = 0, _g1 = this.nmeChildren;
		while(_g < _g1.length) {
			var child = _g1[_g];
			++_g;
			if(child.nmeVisible) {
				if(clipRect != null) {
					if((child._nmeRenderFlags & 4) != 0 || (child._nmeRenderFlags & 8) != 0) child.nmeValidateMatrix();
				}
				child.nmeRender(inMask,clipRect);
			}
		}
	}
	,nmeRemoveFromStage: function() {
		browser.display.InteractiveObject.prototype.nmeRemoveFromStage.call(this);
		var _g = 0, _g1 = this.nmeChildren;
		while(_g < _g1.length) {
			var child = _g1[_g];
			++_g;
			child.nmeRemoveFromStage();
		}
	}
	,nmeInvalidateMatrix: function(local) {
		if(local == null) local = false;
		if(!((this._nmeRenderFlags & 8) != 0) && !((this._nmeRenderFlags & 4) != 0)) {
			var _g = 0, _g1 = this.nmeChildren;
			while(_g < _g1.length) {
				var child = _g1[_g];
				++_g;
				child.nmeInvalidateMatrix();
			}
		}
		browser.display.InteractiveObject.prototype.nmeInvalidateMatrix.call(this,local);
	}
	,nmeGetObjectUnderPoint: function(point) {
		if(!this.get_visible()) return null;
		var l = this.nmeChildren.length - 1;
		var _g1 = 0, _g = this.nmeChildren.length;
		while(_g1 < _g) {
			var i = _g1++;
			var result = null;
			if(this.mouseEnabled) result = this.nmeChildren[l - i].nmeGetObjectUnderPoint(point);
			if(result != null) return this.mouseChildren?result:this;
		}
		return browser.display.InteractiveObject.prototype.nmeGetObjectUnderPoint.call(this,point);
	}
	,nmeBroadcast: function(event) {
		var _g = 0, _g1 = this.nmeChildren;
		while(_g < _g1.length) {
			var child = _g1[_g];
			++_g;
			child.nmeBroadcast(event);
		}
		this.dispatchEvent(event);
	}
	,nmeAddToStage: function(newParent,beforeSibling) {
		browser.display.InteractiveObject.prototype.nmeAddToStage.call(this,newParent,beforeSibling);
		var _g = 0, _g1 = this.nmeChildren;
		while(_g < _g1.length) {
			var child = _g1[_g];
			++_g;
			if(child.nmeGetGraphics() == null || !child.nmeIsOnStage()) child.nmeAddToStage(this);
		}
	}
	,getChildIndex: function(inChild) {
		var _g1 = 0, _g = this.nmeChildren.length;
		while(_g1 < _g) {
			var i = _g1++;
			if(this.nmeChildren[i] == inChild) return i;
		}
		return -1;
	}
	,addChildAt: function(object,index) {
		if(index > this.nmeChildren.length || index < 0) throw "Invalid index position " + index;
		if(object.parent == this) {
			this.setChildIndex(object,index);
			return object;
		}
		if(index == this.nmeChildren.length) return this.addChild(object); else {
			if(this.nmeIsOnStage()) object.nmeAddToStage(this,this.nmeChildren[index]);
			this.nmeChildren.splice(index,0,object);
			object.set_parent(this);
		}
		return object;
	}
	,addChild: function(object) {
		if(object == null) throw "DisplayObjectContainer asked to add null child object";
		if(object == this) throw "Adding to self";
		if(object.parent == this) {
			this.setChildIndex(object,this.nmeChildren.length - 1);
			return object;
		}
		var _g = 0, _g1 = this.nmeChildren;
		while(_g < _g1.length) {
			var child = _g1[_g];
			++_g;
			if(child == object) throw "Internal error: child already existed at index " + this.getChildIndex(object);
		}
		object.set_parent(this);
		if(this.nmeIsOnStage()) object.nmeAddToStage(this);
		if(this.nmeChildren == null) this.nmeChildren = new Array();
		this.nmeChildren.push(object);
		return object;
	}
	,__class__: browser.display.DisplayObjectContainer
	,__properties__: $extend(browser.display.InteractiveObject.prototype.__properties__,{get_numChildren:"get_numChildren"})
});
browser.display.Sprite = function() {
	browser.display.DisplayObjectContainer.call(this);
	this.nmeGraphics = new browser.display.Graphics();
	this.buttonMode = false;
};
$hxClasses["browser.display.Sprite"] = browser.display.Sprite;
browser.display.Sprite.__name__ = ["browser","display","Sprite"];
browser.display.Sprite.__super__ = browser.display.DisplayObjectContainer;
browser.display.Sprite.prototype = $extend(browser.display.DisplayObjectContainer.prototype,{
	set_useHandCursor: function(cursor) {
		if(cursor == this.useHandCursor) return cursor;
		if(this.nmeCursorCallbackOver != null) this.removeEventListener(browser.events.MouseEvent.ROLL_OVER,this.nmeCursorCallbackOver);
		if(this.nmeCursorCallbackOut != null) this.removeEventListener(browser.events.MouseEvent.ROLL_OUT,this.nmeCursorCallbackOut);
		if(!cursor) browser.Lib.nmeSetCursor(browser._Lib.CursorType.Default); else {
			this.nmeCursorCallbackOver = function(_) {
				browser.Lib.nmeSetCursor(browser._Lib.CursorType.Pointer);
			};
			this.nmeCursorCallbackOut = function(_) {
				browser.Lib.nmeSetCursor(browser._Lib.CursorType.Default);
			};
			this.addEventListener(browser.events.MouseEvent.ROLL_OVER,this.nmeCursorCallbackOver);
			this.addEventListener(browser.events.MouseEvent.ROLL_OUT,this.nmeCursorCallbackOut);
		}
		this.useHandCursor = cursor;
		return cursor;
	}
	,get_graphics: function() {
		return this.nmeGraphics;
	}
	,get_dropTarget: function() {
		return this.nmeDropTarget;
	}
	,toString: function() {
		return "[Sprite name=" + this.name + " id=" + this._nmeId + "]";
	}
	,nmeGetGraphics: function() {
		return this.nmeGraphics;
	}
	,__class__: browser.display.Sprite
	,__properties__: $extend(browser.display.DisplayObjectContainer.prototype.__properties__,{get_graphics:"get_graphics",set_useHandCursor:"set_useHandCursor"})
});
var com = {}
com.haxepunk = {}
com.haxepunk.Engine = function(width,height,frameRate,fixed) {
	if(fixed == null) fixed = false;
	if(frameRate == null) frameRate = 60;
	if(height == null) height = 0;
	if(width == null) width = 0;
	browser.display.Sprite.call(this);
	com.haxepunk.HXP.bounds = new browser.geom.Rectangle(0,0,width,height);
	com.haxepunk.HXP.assignedFrameRate = frameRate;
	com.haxepunk.HXP.fixed = fixed;
	com.haxepunk.HXP.engine = this;
	com.haxepunk.HXP.screen = new com.haxepunk.Screen();
	com.haxepunk.HXP.width = width;
	com.haxepunk.HXP.height = height;
	if(com.haxepunk.HXP.randomSeed == 0) {
		com.haxepunk.HXP._seed = com.haxepunk.HXP.clamp(2147483646 * Math.random() | 0,1.0,2147483646) | 0;
		com.haxepunk.HXP.randomSeed = com.haxepunk.HXP._seed;
		com.haxepunk.HXP._seed;
	}
	com.haxepunk.HXP.entity = new com.haxepunk.Entity();
	com.haxepunk.HXP._time = browser.Lib.getTimer();
	com.haxepunk.HXP._time;
	this.paused = false;
	this.maxElapsed = 0.0333;
	this.maxFrameSkip = 5;
	this.tickRate = 4;
	this._frameList = new Array();
	this._flashTime = this._delta = this._frameListSum = 0;
	this._frameLast = 0;
	this.addEventListener(browser.events.Event.ADDED_TO_STAGE,$bind(this,this.onStage));
	nme.Lib.get_current().addChild(this);
};
$hxClasses["com.haxepunk.Engine"] = com.haxepunk.Engine;
com.haxepunk.Engine.__name__ = ["com","haxepunk","Engine"];
com.haxepunk.Engine.__super__ = browser.display.Sprite;
com.haxepunk.Engine.prototype = $extend(browser.display.Sprite.prototype,{
	checkWorld: function() {
		if(com.haxepunk.HXP._goto == null) return;
		if(com.haxepunk.HXP._world != null) {
			com.haxepunk.HXP._world.end();
			com.haxepunk.HXP._world.updateLists();
			if(com.haxepunk.HXP._world.autoClear && com.haxepunk.HXP._world.getTween()) com.haxepunk.HXP._world.clearTweens();
			{
				com.haxepunk.HXP._world = com.haxepunk.HXP._goto;
				com.haxepunk.HXP._goto = null;
			}
			com.haxepunk.HXP.camera = com.haxepunk.HXP._world.camera;
			com.haxepunk.HXP._world.updateLists();
			com.haxepunk.HXP._world.begin();
			com.haxepunk.HXP._world.updateLists();
		}
	}
	,onTimer: function() {
		this._time = browser.Lib.getTimer();
		this._delta += this._time - this._last;
		this._last = this._time;
		if(this._delta < this._rate) return;
		this._gameTime = this._time | 0;
		com.haxepunk.HXP._flashTime = this._time - this._flashTime;
		if(this._delta > this._skip) this._delta = this._skip;
		while(this._delta >= this._rate) {
			com.haxepunk.HXP.elapsed = this._rate * com.haxepunk.HXP.rate * 0.001;
			this._updateTime = this._time;
			this._delta -= this._rate;
			this._prev = this._time;
			if(!this.paused) this.update();
			if(com.haxepunk.HXP.consoleEnabled()) ((function($this) {
				var $r;
				if(com.haxepunk.HXP._console == null) com.haxepunk.HXP._console = new com.haxepunk.debug.Console();
				$r = com.haxepunk.HXP._console;
				return $r;
			}(this))).update();
			com.haxepunk.utils.Input.update();
			this._time = browser.Lib.getTimer();
			com.haxepunk.HXP._updateTime = this._time - this._updateTime;
		}
		this._renderTime = this._time;
		if(!this.paused) this.render();
		this._time = this._flashTime = browser.Lib.getTimer();
		com.haxepunk.HXP._renderTime = this._time - this._renderTime;
		com.haxepunk.HXP._gameTime = this._time - this._gameTime;
	}
	,onEnterFrame: function(e) {
		this._time = this._gameTime = browser.Lib.getTimer();
		com.haxepunk.HXP._flashTime = this._time - this._flashTime;
		this._updateTime = this._time;
		com.haxepunk.HXP.elapsed = (this._time - this._last) / 1000;
		if(com.haxepunk.HXP.elapsed > this.maxElapsed) com.haxepunk.HXP.elapsed = this.maxElapsed;
		com.haxepunk.HXP.elapsed *= com.haxepunk.HXP.rate;
		this._last = this._time;
		if(!this.paused) this.update();
		if(com.haxepunk.HXP.consoleEnabled()) ((function($this) {
			var $r;
			if(com.haxepunk.HXP._console == null) com.haxepunk.HXP._console = new com.haxepunk.debug.Console();
			$r = com.haxepunk.HXP._console;
			return $r;
		}(this))).update();
		com.haxepunk.utils.Input.update();
		this._time = this._renderTime = browser.Lib.getTimer();
		com.haxepunk.HXP._updateTime = this._time - this._updateTime;
		if(!this.paused) this.render();
		this._time = this._flashTime = browser.Lib.getTimer();
		com.haxepunk.HXP._renderTime = this._time - this._renderTime;
		com.haxepunk.HXP._gameTime = this._time - this._gameTime;
	}
	,onStage: function(e) {
		this.removeEventListener(browser.events.Event.ADDED_TO_STAGE,$bind(this,this.onStage));
		com.haxepunk.HXP.stage = this.get_stage();
		this.setStageProperties();
		com.haxepunk.utils.Input.enable();
		if(!(com.haxepunk.HXP._goto == null)) this.checkWorld();
		this.init();
		this._rate = 1000 / com.haxepunk.HXP.assignedFrameRate;
		if(com.haxepunk.HXP.fixed) {
			this._skip = this._rate * (this.maxFrameSkip + 1);
			this._last = this._prev = browser.Lib.getTimer();
			this._timer = new haxe.Timer(this.tickRate);
			this._timer.run = $bind(this,this.onTimer);
		} else {
			this._last = browser.Lib.getTimer();
			this.addEventListener(browser.events.Event.ENTER_FRAME,$bind(this,this.onEnterFrame));
		}
	}
	,resize: function() {
		if(com.haxepunk.HXP.width == 0) com.haxepunk.HXP.width = com.haxepunk.HXP.stage.get_stageWidth();
		if(com.haxepunk.HXP.height == 0) com.haxepunk.HXP.height = com.haxepunk.HXP.stage.get_stageHeight();
		com.haxepunk.HXP.screen.setScaleX(com.haxepunk.HXP.stage.get_stageWidth() / com.haxepunk.HXP.width);
		com.haxepunk.HXP.screen.setScaleY(com.haxepunk.HXP.stage.get_stageHeight() / com.haxepunk.HXP.height);
		com.haxepunk.HXP.resize(com.haxepunk.HXP.stage.get_stageWidth(),com.haxepunk.HXP.stage.get_stageHeight());
	}
	,setStageProperties: function() {
		var _g = this;
		com.haxepunk.HXP.stage.set_frameRate(com.haxepunk.HXP.assignedFrameRate);
		com.haxepunk.HXP.stage.align = browser.display.StageAlign.TOP_LEFT;
		com.haxepunk.HXP.stage.set_quality(browser.display.StageQuality.HIGH);
		com.haxepunk.HXP.stage.scaleMode = browser.display.StageScaleMode.NO_SCALE;
		com.haxepunk.HXP.stage.set_displayState(browser.display.StageDisplayState.NORMAL);
		this.resize();
		com.haxepunk.HXP.stage.addEventListener(browser.events.Event.RESIZE,function(e) {
			_g.resize();
		});
		com.haxepunk.HXP.stage.addEventListener(browser.events.Event.ACTIVATE,function(e) {
			com.haxepunk.HXP.focused = true;
			_g.focusGained();
			com.haxepunk.HXP._world.focusGained();
		});
		com.haxepunk.HXP.stage.addEventListener(browser.events.Event.DEACTIVATE,function(e) {
			com.haxepunk.HXP.focused = false;
			_g.focusLost();
			com.haxepunk.HXP._world.focusLost();
		});
	}
	,render: function() {
		var t = browser.Lib.getTimer();
		if(this._frameLast == 0) this._frameLast = t | 0;
		com.haxepunk.HXP.screen.swap();
		com.haxepunk.utils.Draw.resetTarget();
		com.haxepunk.HXP.screen.refresh();
		if(com.haxepunk.HXP._world.visible) com.haxepunk.HXP._world.render();
		com.haxepunk.HXP.screen.redraw();
		com.haxepunk.graphics.atlas.Atlas.renderAll(null);
		t = browser.Lib.getTimer();
		this._frameListSum += this._frameList[this._frameList.length] = t - this._frameLast | 0;
		if(this._frameList.length > 10) this._frameListSum -= this._frameList.shift();
		com.haxepunk.HXP.frameRate = 1000 / (this._frameListSum / this._frameList.length);
		this._frameLast = t;
	}
	,update: function() {
		if(com.haxepunk.HXP.tweener.active && com.haxepunk.HXP.tweener.getTween()) com.haxepunk.HXP.tweener.updateTweens();
		if(com.haxepunk.HXP._world.active) {
			if(com.haxepunk.HXP._world.getTween()) com.haxepunk.HXP._world.updateTweens();
			com.haxepunk.HXP._world.update();
		}
		com.haxepunk.HXP._world.updateLists();
		if(!(com.haxepunk.HXP._goto == null)) this.checkWorld();
	}
	,focusLost: function() {
	}
	,focusGained: function() {
	}
	,init: function() {
	}
	,__class__: com.haxepunk.Engine
});
var Main = function() {
	com.haxepunk.Engine.call(this,800,600,61);
	com.haxepunk.utils.Input.define("up",[87,38]);
	com.haxepunk.utils.Input.define("down",[83,40]);
	com.haxepunk.utils.Input.define("left",[65,37]);
	com.haxepunk.utils.Input.define("right",[68,39]);
};
$hxClasses["Main"] = Main;
Main.__name__ = ["Main"];
Main.__super__ = com.haxepunk.Engine;
Main.prototype = $extend(com.haxepunk.Engine.prototype,{
	init: function() {
		com.haxepunk.HXP.screen.setColor(-559038737);
		com.haxepunk.HXP.screen.setScale(1);
		com.haxepunk.HXP.setWorld(new world.TestWorld());
	}
	,__class__: Main
});
var NMEPreloader = function() {
	browser.display.Sprite.call(this);
	var backgroundColor = this.getBackgroundColor();
	var r = backgroundColor >> 16 & 255;
	var g = backgroundColor >> 8 & 255;
	var b = backgroundColor & 255;
	var perceivedLuminosity = 0.299 * r + 0.587 * g + 0.114 * b;
	var color = 0;
	if(perceivedLuminosity < 70) color = 16777215;
	var x = 30;
	var height = 9;
	var y = this.getHeight() / 2 - height / 2;
	var width = this.getWidth() - x * 2;
	var padding = 3;
	this.outline = new browser.display.Sprite();
	this.outline.get_graphics().lineStyle(1,color,0.15,true);
	this.outline.get_graphics().drawRoundRect(0,0,width,height,padding * 2,padding * 2);
	this.outline.set_x(x);
	this.outline.set_y(y);
	this.addChild(this.outline);
	this.progress = new browser.display.Sprite();
	this.progress.get_graphics().beginFill(color,0.35);
	this.progress.get_graphics().drawRect(0,0,width - padding * 2,height - padding * 2);
	this.progress.set_x(x + padding);
	this.progress.set_y(y + padding);
	this.progress.set_scaleX(0);
	this.addChild(this.progress);
};
$hxClasses["NMEPreloader"] = NMEPreloader;
NMEPreloader.__name__ = ["NMEPreloader"];
NMEPreloader.__super__ = browser.display.Sprite;
NMEPreloader.prototype = $extend(browser.display.Sprite.prototype,{
	onUpdate: function(bytesLoaded,bytesTotal) {
		var percentLoaded = bytesLoaded / bytesTotal;
		if(percentLoaded > 1) percentLoaded == 1;
		this.progress.set_scaleX(percentLoaded);
	}
	,onLoaded: function() {
		this.dispatchEvent(new browser.events.Event(browser.events.Event.COMPLETE));
	}
	,onInit: function() {
	}
	,getWidth: function() {
		var width = 800;
		if(width > 0) return width; else return nme.Lib.get_current().get_stage().get_stageWidth();
	}
	,getHeight: function() {
		var height = 480;
		if(height > 0) return height; else return nme.Lib.get_current().get_stage().get_stageHeight();
	}
	,getBackgroundColor: function() {
		return 0;
	}
	,__class__: NMEPreloader
});
var Reflect = function() { }
$hxClasses["Reflect"] = Reflect;
Reflect.__name__ = ["Reflect"];
Reflect.hasField = function(o,field) {
	return Object.prototype.hasOwnProperty.call(o,field);
}
Reflect.field = function(o,field) {
	var v = null;
	try {
		v = o[field];
	} catch( e ) {
	}
	return v;
}
Reflect.getProperty = function(o,field) {
	var tmp;
	return o == null?null:o.__properties__ && (tmp = o.__properties__["get_" + field])?o[tmp]():o[field];
}
Reflect.setProperty = function(o,field,value) {
	var tmp;
	if(o.__properties__ && (tmp = o.__properties__["set_" + field])) o[tmp](value); else o[field] = value;
}
Reflect.fields = function(o) {
	var a = [];
	if(o != null) {
		var hasOwnProperty = Object.prototype.hasOwnProperty;
		for( var f in o ) {
		if(hasOwnProperty.call(o,f)) a.push(f);
		}
	}
	return a;
}
Reflect.isFunction = function(f) {
	return typeof(f) == "function" && !(f.__name__ || f.__ename__);
}
Reflect.compareMethods = function(f1,f2) {
	if(f1 == f2) return true;
	if(!Reflect.isFunction(f1) || !Reflect.isFunction(f2)) return false;
	return f1.scope == f2.scope && f1.method == f2.method && f1.method != null;
}
Reflect.deleteField = function(o,f) {
	if(!Reflect.hasField(o,f)) return false;
	delete(o[f]);
	return true;
}
var Std = function() { }
$hxClasses["Std"] = Std;
Std.__name__ = ["Std"];
Std.string = function(s) {
	return js.Boot.__string_rec(s,"");
}
Std.parseInt = function(x) {
	var v = parseInt(x,10);
	if(v == 0 && (HxOverrides.cca(x,1) == 120 || HxOverrides.cca(x,1) == 88)) v = parseInt(x);
	if(isNaN(v)) return null;
	return v;
}
Std.parseFloat = function(x) {
	return parseFloat(x);
}
var StringBuf = function() {
	this.b = "";
};
$hxClasses["StringBuf"] = StringBuf;
StringBuf.__name__ = ["StringBuf"];
StringBuf.prototype = {
	__class__: StringBuf
}
var StringTools = function() { }
$hxClasses["StringTools"] = StringTools;
StringTools.__name__ = ["StringTools"];
StringTools.urlEncode = function(s) {
	return encodeURIComponent(s);
}
StringTools.urlDecode = function(s) {
	return decodeURIComponent(s.split("+").join(" "));
}
StringTools.startsWith = function(s,start) {
	return s.length >= start.length && HxOverrides.substr(s,0,start.length) == start;
}
StringTools.replace = function(s,sub,by) {
	return s.split(sub).join(by);
}
StringTools.hex = function(n,digits) {
	var s = "";
	var hexChars = "0123456789ABCDEF";
	do {
		s = hexChars.charAt(n & 15) + s;
		n >>>= 4;
	} while(n > 0);
	if(digits != null) while(s.length < digits) s = "0" + s;
	return s;
}
var Type = function() { }
$hxClasses["Type"] = Type;
Type.__name__ = ["Type"];
Type.getClass = function(o) {
	if(o == null) return null;
	return o.__class__;
}
Type.getClassName = function(c) {
	var a = c.__name__;
	return a.join(".");
}
Type.resolveClass = function(name) {
	var cl = $hxClasses[name];
	if(cl == null || !cl.__name__) return null;
	return cl;
}
Type.resolveEnum = function(name) {
	var e = $hxClasses[name];
	if(e == null || !e.__ename__) return null;
	return e;
}
Type.createInstance = function(cl,args) {
	switch(args.length) {
	case 0:
		return new cl();
	case 1:
		return new cl(args[0]);
	case 2:
		return new cl(args[0],args[1]);
	case 3:
		return new cl(args[0],args[1],args[2]);
	case 4:
		return new cl(args[0],args[1],args[2],args[3]);
	case 5:
		return new cl(args[0],args[1],args[2],args[3],args[4]);
	case 6:
		return new cl(args[0],args[1],args[2],args[3],args[4],args[5]);
	case 7:
		return new cl(args[0],args[1],args[2],args[3],args[4],args[5],args[6]);
	case 8:
		return new cl(args[0],args[1],args[2],args[3],args[4],args[5],args[6],args[7]);
	default:
		throw "Too many arguments";
	}
	return null;
}
Type.createEmptyInstance = function(cl) {
	function empty() {}; empty.prototype = cl.prototype;
	return new empty();
}
Type.createEnum = function(e,constr,params) {
	var f = Reflect.field(e,constr);
	if(f == null) throw "No such constructor " + constr;
	if(Reflect.isFunction(f)) {
		if(params == null) throw "Constructor " + constr + " need parameters";
		return f.apply(e,params);
	}
	if(params != null && params.length != 0) throw "Constructor " + constr + " does not need parameters";
	return f;
}
Type.getEnumConstructs = function(e) {
	var a = e.__constructs__;
	return a.slice();
}
var Xml = function() {
};
$hxClasses["Xml"] = Xml;
Xml.__name__ = ["Xml"];
Xml.prototype = {
	getParent: function() {
		return this._parent;
	}
	,setNodeValue: function(v) {
		if(this.nodeType == Xml.Element || this.nodeType == Xml.Document) throw "bad nodeType";
		return this._nodeValue = v;
	}
	,getNodeValue: function() {
		if(this.nodeType == Xml.Element || this.nodeType == Xml.Document) throw "bad nodeType";
		return this._nodeValue;
	}
	,setNodeName: function(n) {
		if(this.nodeType != Xml.Element) throw "bad nodeType";
		return this._nodeName = n;
	}
	,getNodeName: function() {
		if(this.nodeType != Xml.Element) throw "bad nodeType";
		return this._nodeName;
	}
	,__class__: Xml
}
browser.Selection = function() { }
$hxClasses["browser.Selection"] = browser.Selection;
browser.Selection.__name__ = ["browser","Selection"];
browser.Selection.prototype = {
	__class__: browser.Selection
}
browser.MessagePortArray = function() { }
$hxClasses["browser.MessagePortArray"] = browser.MessagePortArray;
browser.MessagePortArray.__name__ = ["browser","MessagePortArray"];
browser.MessagePort = function() { }
$hxClasses["browser.MessagePort"] = browser.MessagePort;
browser.MessagePort.__name__ = ["browser","MessagePort"];
browser.MessagePort.prototype = {
	__class__: browser.MessagePort
}
var haxe = {}
haxe.Timer = function(time_ms) {
	var me = this;
	this.id = window.setInterval(function() {
		me.run();
	},time_ms);
};
$hxClasses["haxe.Timer"] = haxe.Timer;
haxe.Timer.__name__ = ["haxe","Timer"];
haxe.Timer.stamp = function() {
	return new Date().getTime() / 1000;
}
haxe.Timer.prototype = {
	run: function() {
	}
	,__class__: haxe.Timer
}
browser.Lib = function(rootElement,width,height) {
	this.mKilled = false;
	this.__scr = rootElement;
	if(this.__scr == null) throw "Root element not found";
	this.__scr.style.setProperty("overflow","hidden","");
	this.__scr.style.setProperty("position","absolute","");
	if(this.__scr.style.getPropertyValue("width") != "100%") this.__scr.style.width = width + "px";
	if(this.__scr.style.getPropertyValue("height") != "100%") this.__scr.style.height = height + "px";
};
$hxClasses["browser.Lib"] = browser.Lib;
browser.Lib.__name__ = ["browser","Lib"];
browser.Lib.__properties__ = {get_window:"get_window",get_document:"get_document",get_current:"get_current"}
browser.Lib.getTimer = function() {
	return (haxe.Timer.stamp() - browser.Lib.starttime) * 1000 | 0;
}
browser.Lib.nmeAppendSurface = function(surface,before,after) {
	if(browser.Lib.mMe.__scr != null) {
		surface.style.setProperty("position","absolute","");
		surface.style.setProperty("left","0px","");
		surface.style.setProperty("top","0px","");
		surface.style.setProperty("transform-origin","0 0","");
		surface.style.setProperty("-moz-transform-origin","0 0","");
		surface.style.setProperty("-webkit-transform-origin","0 0","");
		surface.style.setProperty("-o-transform-origin","0 0","");
		surface.style.setProperty("-ms-transform-origin","0 0","");
		try {
			if(surface.localName == "canvas") surface.onmouseover = surface.onselectstart = function() {
				return false;
			};
		} catch( e ) {
		}
		var rootNode = browser.Lib.mMe.__scr;
		if(before != null) rootNode.insertBefore(surface,before); else if(after != null && after.nextSibling != null) rootNode.insertBefore(surface,after.nextSibling); else rootNode.appendChild(surface);
	}
}
browser.Lib.nmeBootstrap = function() {
	if(browser.Lib.mMe == null) {
		var target = js.Lib.document.getElementById("haxe:jeash");
		if(target == null) {
			console.log("Error: Cannot find element ID \"" + "haxe:jeash" + "\"");
			target.id; // throw error;
		}
		var agent = navigator.userAgent;
		if(agent.indexOf("BlackBerry") > -1 && target.style.height == "100%") target.style.height = screen.height + "px";
		if(agent.indexOf("Android") > -1) {
			var version = Std.parseFloat(HxOverrides.substr(agent,agent.indexOf("Android") + 8,3));
			if(version <= 2.3) browser.Lib.mForce2DTransform = true;
		}
		browser.Lib.Run(target,browser.Lib.nmeGetWidth(),browser.Lib.nmeGetHeight());
	}
}
browser.Lib.nmeCopyStyle = function(src,tgt) {
	tgt.id = src.id;
	var _g = 0, _g1 = ["left","top","transform","transform-origin","-moz-transform","-moz-transform-origin","-webkit-transform","-webkit-transform-origin","-o-transform","-o-transform-origin","opacity","display"];
	while(_g < _g1.length) {
		var prop = _g1[_g];
		++_g;
		tgt.style.setProperty(prop,src.style.getPropertyValue(prop),"");
	}
}
browser.Lib.nmeDisableFullScreen = function() {
}
browser.Lib.nmeDisableRightClick = function() {
	if(browser.Lib.mMe != null) try {
		browser.Lib.mMe.__scr.oncontextmenu = function() {
			return false;
		};
	} catch( e ) {
		browser.Lib.trace("Disable right click not supported in this browser.");
	}
}
browser.Lib.nmeDrawClippedImage = function(surface,tgtCtx,clipRect) {
	if(clipRect != null) {
		if(clipRect.x < 0) {
			clipRect.width += clipRect.x;
			clipRect.x = 0;
		}
		if(clipRect.y < 0) {
			clipRect.height += clipRect.y;
			clipRect.y = 0;
		}
		if(clipRect.width > surface.width - clipRect.x) clipRect.width = surface.width - clipRect.x;
		if(clipRect.height > surface.height - clipRect.y) clipRect.height = surface.height - clipRect.y;
		tgtCtx.drawImage(surface,clipRect.x,clipRect.y,clipRect.width,clipRect.height,clipRect.x,clipRect.y,clipRect.width,clipRect.height);
	} else tgtCtx.drawImage(surface,0,0);
}
browser.Lib.nmeDrawToSurface = function(surface,tgt,matrix,alpha,clipRect) {
	if(alpha == null) alpha = 1.0;
	var srcCtx = surface.getContext("2d");
	var tgtCtx = tgt.getContext("2d");
	if(alpha != 1.0) tgtCtx.globalAlpha = alpha;
	if(surface.width > 0 && surface.height > 0) {
		if(matrix != null) {
			tgtCtx.save();
			if(matrix.a == 1 && matrix.b == 0 && matrix.c == 0 && matrix.d == 1) tgtCtx.translate(matrix.tx,matrix.ty); else tgtCtx.setTransform(matrix.a,matrix.b,matrix.c,matrix.d,matrix.tx,matrix.ty);
			browser.Lib.nmeDrawClippedImage(surface,tgtCtx,clipRect);
			tgtCtx.restore();
		} else browser.Lib.nmeDrawClippedImage(surface,tgtCtx,clipRect);
	}
}
browser.Lib.nmeEnableFullScreen = function() {
	if(browser.Lib.mMe != null) {
		var origWidth = browser.Lib.mMe.__scr.style.getPropertyValue("width");
		var origHeight = browser.Lib.mMe.__scr.style.getPropertyValue("height");
		browser.Lib.mMe.__scr.style.setProperty("width","100%","");
		browser.Lib.mMe.__scr.style.setProperty("height","100%","");
		browser.Lib.nmeDisableFullScreen = function() {
			browser.Lib.mMe.__scr.style.setProperty("width",origWidth,"");
			browser.Lib.mMe.__scr.style.setProperty("height",origHeight,"");
		};
	}
}
browser.Lib.nmeEnableRightClick = function() {
	if(browser.Lib.mMe != null) try {
		browser.Lib.mMe.__scr.oncontextmenu = null;
	} catch( e ) {
		browser.Lib.trace("Enable right click not supported in this browser.");
	}
}
browser.Lib.nmeGetHeight = function() {
	var tgt = browser.Lib.mMe != null?browser.Lib.mMe.__scr:js.Lib.document.getElementById("haxe:jeash");
	return tgt != null && tgt.clientHeight > 0?tgt.clientHeight:500;
}
browser.Lib.nmeGetStage = function() {
	if(browser.Lib.mStage == null) {
		var width = browser.Lib.nmeGetWidth();
		var height = browser.Lib.nmeGetHeight();
		browser.Lib.mStage = new browser.display.Stage(width,height);
	}
	return browser.Lib.mStage;
}
browser.Lib.nmeGetWidth = function() {
	var tgt = browser.Lib.mMe != null?browser.Lib.mMe.__scr:js.Lib.document.getElementById("haxe:jeash");
	return tgt != null && tgt.clientWidth > 0?tgt.clientWidth:500;
}
browser.Lib.nmeIsOnStage = function(surface) {
	var success = false;
	var nodes = browser.Lib.mMe.__scr.childNodes;
	var _g1 = 0, _g = nodes.length;
	while(_g1 < _g) {
		var i = _g1++;
		if(nodes[i] == surface) {
			success = true;
			break;
		}
	}
	return success;
}
browser.Lib.nmeParseColor = function(str,cb) {
	var re = new EReg("rgb\\(([0-9]*), ?([0-9]*), ?([0-9]*)\\)","");
	var hex = new EReg("#([0-9a-zA-Z][0-9a-zA-Z])([0-9a-zA-Z][0-9a-zA-Z])([0-9a-zA-Z][0-9a-zA-Z])","");
	if(re.match(str)) {
		var col = 0;
		var _g = 1;
		while(_g < 4) {
			var pos = _g++;
			var v = Std.parseInt(re.matched(pos));
			col = cb(col,pos - 1,v);
		}
		return col;
	} else if(hex.match(str)) {
		var col = 0;
		var _g = 1;
		while(_g < 4) {
			var pos = _g++;
			var v = "0x" + hex.matched(pos) & 255;
			v = cb(col,pos - 1,v);
		}
		return col;
	} else throw "Cannot parse color '" + str + "'.";
}
browser.Lib.nmeRemoveSurface = function(surface) {
	if(browser.Lib.mMe.__scr != null) {
		var anim = surface.getAttribute("data-nme-anim");
		if(anim != null) {
			var style = js.Lib.document.getElementById(anim);
			if(style != null) browser.Lib.mMe.__scr.removeChild(style);
		}
		browser.Lib.mMe.__scr.removeChild(surface);
	}
	return surface;
}
browser.Lib.nmeSetSurfaceOpacity = function(surface,alpha) {
	surface.style.setProperty("opacity",Std.string(alpha),"");
}
browser.Lib.nmeSetSurfaceTransform = function(surface,matrix) {
	if(matrix.a == 1 && matrix.b == 0 && matrix.c == 0 && matrix.d == 1 && surface.getAttribute("data-nme-anim") == null) {
		surface.style.left = matrix.tx + "px";
		surface.style.top = matrix.ty + "px";
	} else {
		surface.style.left = "0px";
		surface.style.top = "0px";
		surface.style.setProperty("transform","matrix(" + matrix.a + ", " + matrix.b + ", " + matrix.c + ", " + matrix.d + ", " + matrix.tx + ", " + matrix.ty + ")","");
		surface.style.setProperty("-moz-transform","matrix(" + matrix.a + ", " + matrix.b + ", " + matrix.c + ", " + matrix.d + ", " + matrix.tx + "px, " + matrix.ty + "px)","");
		if(!browser.Lib.mForce2DTransform) surface.style.setProperty("-webkit-transform","matrix3d(" + matrix.a + ", " + matrix.b + ", " + "0, 0, " + matrix.c + ", " + matrix.d + ", " + "0, 0, 0, 0, 1, 0, " + matrix.tx + ", " + matrix.ty + ", " + "0, 1" + ")",""); else surface.style.setProperty("-webkit-transform","matrix(" + matrix.a + ", " + matrix.b + ", " + matrix.c + ", " + matrix.d + ", " + matrix.tx + ", " + matrix.ty + ")","");
		surface.style.setProperty("-o-transform","matrix(" + matrix.a + ", " + matrix.b + ", " + matrix.c + ", " + matrix.d + ", " + matrix.tx + ", " + matrix.ty + ")","");
		surface.style.setProperty("-ms-transform","matrix(" + matrix.a + ", " + matrix.b + ", " + matrix.c + ", " + matrix.d + ", " + matrix.tx + ", " + matrix.ty + ")","");
	}
}
browser.Lib.nmeSetSurfaceZIndexAfter = function(surface1,surface2) {
	var c1 = -1;
	var c2 = -1;
	var swap;
	var _g1 = 0, _g = browser.Lib.mMe.__scr.childNodes.length;
	while(_g1 < _g) {
		var i = _g1++;
		if(browser.Lib.mMe.__scr.childNodes[i] == surface1) c1 = i; else if(browser.Lib.mMe.__scr.childNodes[i] == surface2) c2 = i;
	}
	if(c1 != -1 && c2 != -1) {
		swap = browser.Lib.nmeRemoveSurface(browser.Lib.mMe.__scr.childNodes[c1]);
		if(c2 < browser.Lib.mMe.__scr.childNodes.length - 1) browser.Lib.mMe.__scr.insertBefore(swap,browser.Lib.mMe.__scr.childNodes[c2++]); else browser.Lib.mMe.__scr.appendChild(swap);
	}
}
browser.Lib.nmeSwapSurface = function(surface1,surface2) {
	var c1 = -1;
	var c2 = -1;
	var swap;
	var _g1 = 0, _g = browser.Lib.mMe.__scr.childNodes.length;
	while(_g1 < _g) {
		var i = _g1++;
		if(browser.Lib.mMe.__scr.childNodes[i] == surface1) c1 = i; else if(browser.Lib.mMe.__scr.childNodes[i] == surface2) c2 = i;
	}
	if(c1 != -1 && c2 != -1) {
		swap = browser.Lib.nmeRemoveSurface(browser.Lib.mMe.__scr.childNodes[c1]);
		if(c2 > c1) c2--;
		if(c2 < browser.Lib.mMe.__scr.childNodes.length - 1) browser.Lib.mMe.__scr.insertBefore(swap,browser.Lib.mMe.__scr.childNodes[c2++]); else browser.Lib.mMe.__scr.appendChild(swap);
		swap = browser.Lib.nmeRemoveSurface(browser.Lib.mMe.__scr.childNodes[c2]);
		if(c1 > c2) c1--;
		if(c1 < browser.Lib.mMe.__scr.childNodes.length - 1) browser.Lib.mMe.__scr.insertBefore(swap,browser.Lib.mMe.__scr.childNodes[c1++]); else browser.Lib.mMe.__scr.appendChild(swap);
	}
}
browser.Lib.nmeSetContentEditable = function(surface,contentEditable) {
	if(contentEditable == null) contentEditable = true;
	surface.setAttribute("contentEditable",contentEditable?"true":"false");
}
browser.Lib.nmeSetCursor = function(type) {
	if(browser.Lib.mMe != null) browser.Lib.mMe.__scr.style.cursor = (function($this) {
		var $r;
		switch( (type)[1] ) {
		case 0:
			$r = "pointer";
			break;
		case 1:
			$r = "text";
			break;
		default:
			$r = "default";
		}
		return $r;
	}(this));
}
browser.Lib.nmeSetSurfaceId = function(surface,name) {
	var regex = new EReg("[^a-zA-Z0-9\\-]","g");
	surface.id = regex.replace(name,"_");
}
browser.Lib.nmeSetSurfaceVisible = function(surface,visible) {
	if(visible) surface.style.setProperty("display","block",""); else surface.style.setProperty("display","none","");
}
browser.Lib.Run = function(tgt,width,height) {
	browser.Lib.mMe = new browser.Lib(tgt,width,height);
	var _g1 = 0, _g = tgt.attributes.length;
	while(_g1 < _g) {
		var i = _g1++;
		var attr = tgt.attributes.item(i);
		if(StringTools.startsWith(attr.name,"data-")) {
			if(attr.name == "data-" + "framerate") browser.Lib.nmeGetStage().set_frameRate(Std.parseFloat(attr.value));
		}
	}
	if(Reflect.hasField(tgt,"on" + browser.Lib.HTML_TOUCH_EVENT_TYPES[0])) {
		var _g = 0, _g1 = browser.Lib.HTML_TOUCH_EVENT_TYPES;
		while(_g < _g1.length) {
			var type = _g1[_g];
			++_g;
			tgt.addEventListener(type,($_=browser.Lib.nmeGetStage(),$bind($_,$_.nmeQueueStageEvent)),true);
		}
	}
	var _g = 0, _g1 = browser.Lib.HTML_DIV_EVENT_TYPES;
	while(_g < _g1.length) {
		var type = _g1[_g];
		++_g;
		tgt.addEventListener(type,($_=browser.Lib.nmeGetStage(),$bind($_,$_.nmeQueueStageEvent)),true);
	}
	if(Reflect.hasField(js.Lib.window,"on" + "devicemotion")) js.Lib.window.addEventListener("devicemotion",($_=browser.Lib.nmeGetStage(),$bind($_,$_.nmeQueueStageEvent)),true);
	if(Reflect.hasField(js.Lib.window,"on" + "orientationchange")) js.Lib.window.addEventListener("orientationchange",($_=browser.Lib.nmeGetStage(),$bind($_,$_.nmeQueueStageEvent)),true);
	var _g = 0, _g1 = browser.Lib.HTML_WINDOW_EVENT_TYPES;
	while(_g < _g1.length) {
		var type = _g1[_g];
		++_g;
		js.Lib.window.addEventListener(type,($_=browser.Lib.nmeGetStage(),$bind($_,$_.nmeQueueStageEvent)),false);
	}
	if(tgt.style.backgroundColor != null && tgt.style.backgroundColor != "") browser.Lib.nmeGetStage().set_backgroundColor(browser.Lib.nmeParseColor(tgt.style.backgroundColor,function(res,pos,cur) {
		return pos == 0?res | cur << 16:pos == 1?res | cur << 8:pos == 2?res | cur:(function($this) {
			var $r;
			throw "pos should be 0-2";
			return $r;
		}(this));
	})); else browser.Lib.nmeGetStage().set_backgroundColor(16777215);
	browser.Lib.get_current().get_graphics().beginFill(browser.Lib.nmeGetStage().get_backgroundColor());
	browser.Lib.get_current().get_graphics().drawRect(0,0,width,height);
	browser.Lib.nmeSetSurfaceId(browser.Lib.get_current().get_graphics().nmeSurface,"Root MovieClip");
	browser.Lib.nmeGetStage().nmeUpdateNextWake();
	try {
		var winParameters = js.Lib.window.winParameters();
		var _g = 0, _g1 = Reflect.fields(winParameters);
		while(_g < _g1.length) {
			var prop = _g1[_g];
			++_g;
			browser.Lib.get_current().loaderInfo.parameters[prop] = Reflect.field(winParameters,prop);
		}
	} catch( e ) {
	}
	return browser.Lib.mMe;
}
browser.Lib.trace = function(arg) {
	if(js.Lib.window.console != null) js.Lib.window.console.log(arg);
}
browser.Lib.get_current = function() {
	if(browser.Lib.mMainClassRoot == null) {
		browser.Lib.mMainClassRoot = new browser.display.MovieClip();
		browser.Lib.mCurrent = browser.Lib.mMainClassRoot;
		browser.Lib.nmeGetStage().addChild(browser.Lib.mCurrent);
	}
	return browser.Lib.mMainClassRoot;
}
browser.Lib.prototype = {
	__class__: browser.Lib
}
browser._Lib = {}
browser._Lib.CursorType = $hxClasses["browser._Lib.CursorType"] = { __ename__ : true, __constructs__ : ["Pointer","Text","Default"] }
browser._Lib.CursorType.Pointer = ["Pointer",0];
browser._Lib.CursorType.Pointer.toString = $estr;
browser._Lib.CursorType.Pointer.__enum__ = browser._Lib.CursorType;
browser._Lib.CursorType.Text = ["Text",1];
browser._Lib.CursorType.Text.toString = $estr;
browser._Lib.CursorType.Text.__enum__ = browser._Lib.CursorType;
browser._Lib.CursorType.Default = ["Default",2];
browser._Lib.CursorType.Default.toString = $estr;
browser._Lib.CursorType.Default.__enum__ = browser._Lib.CursorType;
browser.display.Bitmap = function(inBitmapData,inPixelSnapping,inSmoothing) {
	if(inSmoothing == null) inSmoothing = false;
	browser.display.DisplayObject.call(this);
	this.pixelSnapping = inPixelSnapping;
	this.smoothing = inSmoothing;
	this.nmeGraphics = new browser.display.Graphics();
	if(inBitmapData != null) {
		this.set_bitmapData(inBitmapData);
		this.nmeRender();
	}
};
$hxClasses["browser.display.Bitmap"] = browser.display.Bitmap;
browser.display.Bitmap.__name__ = ["browser","display","Bitmap"];
browser.display.Bitmap.__super__ = browser.display.DisplayObject;
browser.display.Bitmap.prototype = $extend(browser.display.DisplayObject.prototype,{
	set_bitmapData: function(inBitmapData) {
		this._nmeRenderFlags |= 64;
		if(this.parent != null) this.parent._nmeRenderFlags |= 64;
		this.bitmapData = inBitmapData;
		return inBitmapData;
	}
	,validateBounds: function() {
		if(this.get__boundsInvalid()) {
			browser.display.DisplayObject.prototype.validateBounds.call(this);
			if(this.bitmapData != null) {
				var r = new browser.geom.Rectangle(0,0,this.bitmapData.get_width(),this.bitmapData.get_height());
				if(r.width != 0 || r.height != 0) {
					if(this.nmeBoundsRect.width == 0 && this.nmeBoundsRect.height == 0) this.nmeBoundsRect = r.clone(); else this.nmeBoundsRect.extendBounds(r);
				}
			}
			if(this.scale9Grid != null) {
				this.nmeBoundsRect.width *= this.nmeScaleX;
				this.nmeBoundsRect.height *= this.nmeScaleY;
				this.nmeWidth = this.nmeBoundsRect.width;
				this.nmeHeight = this.nmeBoundsRect.height;
			} else {
				this.nmeWidth = this.nmeBoundsRect.width * this.nmeScaleX;
				this.nmeHeight = this.nmeBoundsRect.height * this.nmeScaleY;
			}
		}
	}
	,toString: function() {
		return "[Bitmap name=" + this.name + " id=" + this._nmeId + "]";
	}
	,nmeRender: function(inMask,clipRect) {
		if(!this.nmeCombinedVisible) return;
		if(this.bitmapData == null) return;
		if((this._nmeRenderFlags & 4) != 0 || (this._nmeRenderFlags & 8) != 0) this.nmeValidateMatrix();
		var imageDataLease = this.bitmapData.nmeLease;
		if(imageDataLease != null && (this.nmeCurrentLease == null || imageDataLease.seed != this.nmeCurrentLease.seed || imageDataLease.time != this.nmeCurrentLease.time)) {
			var srcCanvas = this.bitmapData._nmeTextureBuffer;
			this.nmeGraphics.nmeSurface.width = srcCanvas.width;
			this.nmeGraphics.nmeSurface.height = srcCanvas.height;
			this.nmeGraphics.clear();
			browser.Lib.nmeDrawToSurface(srcCanvas,this.nmeGraphics.nmeSurface);
			this.nmeCurrentLease = imageDataLease.clone();
			this._nmeRenderFlags |= 64;
			if(this.parent != null) this.parent._nmeRenderFlags |= 64;
			this.nmeApplyFilters(this.nmeGraphics.nmeSurface);
			this._nmeRenderFlags |= 32;
		}
		if(inMask != null) {
			this.nmeApplyFilters(this.nmeGraphics.nmeSurface);
			var m = this.getBitmapSurfaceTransform(this.nmeGraphics);
			browser.Lib.nmeDrawToSurface(this.nmeGraphics.nmeSurface,inMask,m,(this.parent != null?this.parent.nmeCombinedAlpha:1) * this.alpha,clipRect);
		} else {
			if((this._nmeRenderFlags & 32) != 0) {
				var m = this.getBitmapSurfaceTransform(this.nmeGraphics);
				browser.Lib.nmeSetSurfaceTransform(this.nmeGraphics.nmeSurface,m);
				this._nmeRenderFlags &= -33;
			}
			browser.Lib.nmeSetSurfaceOpacity(this.nmeGraphics.nmeSurface,(this.parent != null?this.parent.nmeCombinedAlpha:1) * this.alpha);
		}
	}
	,nmeGetObjectUnderPoint: function(point) {
		if(!this.get_visible()) return null; else if(this.bitmapData != null) {
			var local = this.globalToLocal(point);
			if(local.x < 0 || local.y < 0 || local.x > this.get_width() || local.y > this.get_height()) return null; else return this;
		} else return browser.display.DisplayObject.prototype.nmeGetObjectUnderPoint.call(this,point);
	}
	,nmeGetGraphics: function() {
		return this.nmeGraphics;
	}
	,getBitmapSurfaceTransform: function(gfx) {
		var extent = gfx.nmeExtentWithFilters;
		var fm = this.transform.nmeGetFullMatrix(null);
		fm.nmeTranslateTransformed(extent.get_topLeft());
		return fm;
	}
	,__class__: browser.display.Bitmap
	,__properties__: $extend(browser.display.DisplayObject.prototype.__properties__,{set_bitmapData:"set_bitmapData"})
});
browser.display.BitmapData = function(width,height,transparent,inFillColor) {
	if(inFillColor == null) inFillColor = -1;
	if(transparent == null) transparent = true;
	this.nmeLocked = false;
	this.nmeLeaseNum = 0;
	this.nmeLease = new browser.display.ImageDataLease();
	this.nmeLease.set(this.nmeLeaseNum++,new Date().getTime());
	this._nmeTextureBuffer = js.Lib.document.createElement("canvas");
	this._nmeTextureBuffer.width = width;
	this._nmeTextureBuffer.height = height;
	this._nmeId = browser.utils.Uuid.uuid();
	browser.Lib.nmeSetSurfaceId(this._nmeTextureBuffer,this._nmeId);
	this.nmeTransparent = transparent;
	this.rect = new browser.geom.Rectangle(0,0,width,height);
	if(this.nmeTransparent) {
		this.nmeTransparentFiller = js.Lib.document.createElement("canvas");
		this.nmeTransparentFiller.width = width;
		this.nmeTransparentFiller.height = height;
		var ctx = this.nmeTransparentFiller.getContext("2d");
		ctx.fillStyle = "rgba(0,0,0,0);";
		ctx.fill();
	}
	if(inFillColor != null && width > 0 && height > 0) {
		if(!this.nmeTransparent) inFillColor |= -16777216;
		this.nmeInitColor = inFillColor;
		this.nmeFillRect(this.rect,inFillColor);
	}
};
$hxClasses["browser.display.BitmapData"] = browser.display.BitmapData;
browser.display.BitmapData.__name__ = ["browser","display","BitmapData"];
browser.display.BitmapData.__interfaces__ = [browser.display.IBitmapDrawable];
browser.display.BitmapData.prototype = {
	get_width: function() {
		if(this._nmeTextureBuffer != null) return this._nmeTextureBuffer.width; else return 0;
	}
	,get_transparent: function() {
		return this.nmeTransparent;
	}
	,get_height: function() {
		if(this._nmeTextureBuffer != null) return this._nmeTextureBuffer.height; else return 0;
	}
	,nmeOnLoad: function(data,e) {
		var canvas = data.texture;
		var width = data.image.width;
		var height = data.image.height;
		canvas.width = width;
		canvas.height = height;
		var ctx = canvas.getContext("2d");
		ctx.drawImage(data.image,0,0,width,height);
		data.bitmapData.width = width;
		data.bitmapData.height = height;
		data.bitmapData.rect = new browser.geom.Rectangle(0,0,width,height);
		data.bitmapData.nmeBuildLease();
		if(data.inLoader != null) {
			var e1 = new browser.events.Event(browser.events.Event.COMPLETE);
			e1.target = data.inLoader;
			data.inLoader.dispatchEvent(e1);
		}
	}
	,unlock: function(changeRect) {
		this.nmeLocked = false;
		var ctx = this._nmeTextureBuffer.getContext("2d");
		if(this.nmeImageDataChanged) {
			if(changeRect != null) ctx.putImageData(this.nmeImageData,0,0,changeRect.x,changeRect.y,changeRect.width,changeRect.height); else ctx.putImageData(this.nmeImageData,0,0);
		}
		var _g = 0, _g1 = this.nmeCopyPixelList;
		while(_g < _g1.length) {
			var copyCache = _g1[_g];
			++_g;
			if(this.nmeTransparent && copyCache.transparentFiller != null) {
				var trpCtx = copyCache.transparentFiller.getContext("2d");
				var trpData = trpCtx.getImageData(copyCache.sourceX,copyCache.sourceY,copyCache.sourceWidth,copyCache.sourceHeight);
				ctx.putImageData(trpData,copyCache.destX,copyCache.destY);
			}
			ctx.drawImage(copyCache.handle,copyCache.sourceX,copyCache.sourceY,copyCache.sourceWidth,copyCache.sourceHeight,copyCache.destX,copyCache.destY,copyCache.sourceWidth,copyCache.sourceHeight);
		}
		this.nmeLease.set(this.nmeLeaseNum++,new Date().getTime());
	}
	,nmeLoadFromFile: function(inFilename,inLoader) {
		var _g = this;
		var image = js.Lib.document.createElement("img");
		if(inLoader != null) {
			var data = { image : image, texture : this._nmeTextureBuffer, inLoader : inLoader, bitmapData : this};
			image.addEventListener("load",(function(f,a1) {
				return function(e) {
					return f(a1,e);
				};
			})($bind(this,this.nmeOnLoad),data),false);
			image.addEventListener("error",function(e) {
				if(!image.complete) _g.nmeOnLoad(data,e);
			},false);
		}
		image.src = inFilename;
		if(image.complete) {
		}
	}
	,nmeFillRect: function(rect,color) {
		this.nmeLease.set(this.nmeLeaseNum++,new Date().getTime());
		var ctx = this._nmeTextureBuffer.getContext("2d");
		var r = (color & 16711680) >>> 16;
		var g = (color & 65280) >>> 8;
		var b = color & 255;
		var a = this.nmeTransparent?color >>> 24:255;
		if(!this.nmeLocked) {
			if(this.nmeTransparent) {
				var trpCtx = this.nmeTransparentFiller.getContext("2d");
				var trpData = trpCtx.getImageData(rect.x,rect.y,rect.width,rect.height);
				ctx.putImageData(trpData,rect.x,rect.y);
			}
			var style = "rgba(" + r + ", " + g + ", " + b + ", " + a / 255 + ")";
			ctx.fillStyle = style;
			ctx.fillRect(rect.x,rect.y,rect.width,rect.height);
		} else {
			var s = 4 * (Math.round(rect.x) + Math.round(rect.y) * this.nmeImageData.width);
			var offsetY;
			var offsetX;
			var _g1 = 0, _g = Math.round(rect.height);
			while(_g1 < _g) {
				var i = _g1++;
				offsetY = i * this.nmeImageData.width;
				var _g3 = 0, _g2 = Math.round(rect.width);
				while(_g3 < _g2) {
					var j = _g3++;
					offsetX = 4 * (j + offsetY);
					this.nmeImageData.data[s + offsetX] = r;
					this.nmeImageData.data[s + offsetX + 1] = g;
					this.nmeImageData.data[s + offsetX + 2] = b;
					this.nmeImageData.data[s + offsetX + 3] = a;
				}
			}
			this.nmeImageDataChanged = true;
			ctx.putImageData(this.nmeImageData,0,0,rect.x,rect.y,rect.width,rect.height);
		}
	}
	,nmeClearCanvas: function() {
		var ctx = this._nmeTextureBuffer.getContext("2d");
		ctx.clearRect(0,0,this._nmeTextureBuffer.width,this._nmeTextureBuffer.height);
	}
	,nmeBuildLease: function() {
		this.nmeLease.set(this.nmeLeaseNum++,new Date().getTime());
	}
	,lock: function() {
		this.nmeLocked = true;
		var ctx = this._nmeTextureBuffer.getContext("2d");
		this.nmeImageData = ctx.getImageData(0,0,this._nmeTextureBuffer != null?this._nmeTextureBuffer.width:0,this._nmeTextureBuffer != null?this._nmeTextureBuffer.height:0);
		this.nmeImageDataChanged = false;
		this.nmeCopyPixelList = [];
	}
	,fillRect: function(rect,color) {
		if(rect == null) return;
		if(rect.width <= 0 || rect.height <= 0) return;
		if(rect.x == 0 && rect.y == 0 && rect.width == this._nmeTextureBuffer.width && rect.height == this._nmeTextureBuffer.height) {
			if(this.nmeTransparent) {
				if(color >>> 24 == 0 || color == this.nmeInitColor) return this.nmeClearCanvas();
			} else if((color | -16777216) == (this.nmeInitColor | -16777216)) return this.nmeClearCanvas();
		}
		return this.nmeFillRect(rect,color);
	}
	,drawToSurface: function(inSurface,matrix,inColorTransform,blendMode,clipRect,smothing) {
		this.nmeLease.set(this.nmeLeaseNum++,new Date().getTime());
		var ctx = inSurface.getContext("2d");
		if(matrix != null) {
			ctx.save();
			if(matrix.a == 1 && matrix.b == 0 && matrix.c == 0 && matrix.d == 1) ctx.translate(matrix.tx,matrix.ty); else ctx.setTransform(matrix.a,matrix.b,matrix.c,matrix.d,matrix.tx,matrix.ty);
			ctx.drawImage(this._nmeTextureBuffer,0,0);
			ctx.restore();
		} else ctx.drawImage(this._nmeTextureBuffer,0,0);
		if(inColorTransform != null) this.colorTransform(new browser.geom.Rectangle(0,0,this._nmeTextureBuffer.width,this._nmeTextureBuffer.height),inColorTransform);
	}
	,draw: function(source,matrix,inColorTransform,blendMode,clipRect,smoothing) {
		if(smoothing == null) smoothing = false;
		this.nmeLease.set(this.nmeLeaseNum++,new Date().getTime());
		source.drawToSurface(this._nmeTextureBuffer,matrix,inColorTransform,blendMode,clipRect,smoothing);
		if(inColorTransform != null) {
			var rect = new browser.geom.Rectangle();
			var object = source;
			rect.x = matrix != null?matrix.tx:0;
			rect.y = matrix != null?matrix.ty:0;
			try {
				rect.width = Reflect.getProperty(source,"width");
				rect.height = Reflect.getProperty(source,"height");
			} catch( e ) {
				rect.width = this._nmeTextureBuffer.width;
				rect.height = this._nmeTextureBuffer.height;
			}
			this.colorTransform(rect,inColorTransform);
		}
	}
	,dispose: function() {
		this.nmeClearCanvas();
		this._nmeTextureBuffer = null;
		this.nmeLeaseNum = 0;
		this.nmeLease = null;
		this.nmeImageData = null;
	}
	,copyPixels: function(sourceBitmapData,sourceRect,destPoint,alphaBitmapData,alphaPoint,mergeAlpha) {
		if(mergeAlpha == null) mergeAlpha = false;
		if(sourceBitmapData._nmeTextureBuffer == null || this._nmeTextureBuffer == null || sourceBitmapData._nmeTextureBuffer.width == 0 || sourceBitmapData._nmeTextureBuffer.height == 0 || sourceRect.width <= 0 || sourceRect.height <= 0) return;
		if(sourceRect.x + sourceRect.width > sourceBitmapData._nmeTextureBuffer.width) sourceRect.width = sourceBitmapData._nmeTextureBuffer.width - sourceRect.x;
		if(sourceRect.y + sourceRect.height > sourceBitmapData._nmeTextureBuffer.height) sourceRect.height = sourceBitmapData._nmeTextureBuffer.height - sourceRect.y;
		if(!this.nmeLocked) {
			this.nmeLease.set(this.nmeLeaseNum++,new Date().getTime());
			var ctx = this._nmeTextureBuffer.getContext("2d");
			if(this.nmeTransparent && sourceBitmapData.nmeTransparent) {
				var trpCtx = sourceBitmapData.nmeTransparentFiller.getContext("2d");
				var trpData = trpCtx.getImageData(sourceRect.x,sourceRect.y,sourceRect.width,sourceRect.height);
				ctx.putImageData(trpData,destPoint.x,destPoint.y);
			}
			ctx.drawImage(sourceBitmapData._nmeTextureBuffer,sourceRect.x,sourceRect.y,sourceRect.width,sourceRect.height,destPoint.x,destPoint.y,sourceRect.width,sourceRect.height);
		} else this.nmeCopyPixelList[this.nmeCopyPixelList.length] = { handle : sourceBitmapData._nmeTextureBuffer, transparentFiller : sourceBitmapData.nmeTransparentFiller, sourceX : sourceRect.x, sourceY : sourceRect.y, sourceWidth : sourceRect.width, sourceHeight : sourceRect.height, destX : destPoint.x, destY : destPoint.y};
	}
	,colorTransform: function(rect,colorTransform) {
		if(rect == null) return;
		rect = this.clipRect(rect);
		if(!this.nmeLocked) {
			this.nmeLease.set(this.nmeLeaseNum++,new Date().getTime());
			var ctx = this._nmeTextureBuffer.getContext("2d");
			var imagedata = ctx.getImageData(rect.x,rect.y,rect.width,rect.height);
			var offsetX;
			var _g1 = 0, _g = imagedata.data.length >> 2;
			while(_g1 < _g) {
				var i = _g1++;
				offsetX = i * 4;
				imagedata.data[offsetX] = imagedata.data[offsetX] * colorTransform.redMultiplier + colorTransform.redOffset | 0;
				imagedata.data[offsetX + 1] = imagedata.data[offsetX + 1] * colorTransform.greenMultiplier + colorTransform.greenOffset | 0;
				imagedata.data[offsetX + 2] = imagedata.data[offsetX + 2] * colorTransform.blueMultiplier + colorTransform.blueOffset | 0;
				imagedata.data[offsetX + 3] = imagedata.data[offsetX + 3] * colorTransform.alphaMultiplier + colorTransform.alphaOffset | 0;
			}
			ctx.putImageData(imagedata,rect.x,rect.y);
		} else {
			var s = 4 * (Math.round(rect.x) + Math.round(rect.y) * this.nmeImageData.width);
			var offsetY;
			var offsetX;
			var _g1 = 0, _g = Math.round(rect.height);
			while(_g1 < _g) {
				var i = _g1++;
				offsetY = i * this.nmeImageData.width;
				var _g3 = 0, _g2 = Math.round(rect.width);
				while(_g3 < _g2) {
					var j = _g3++;
					offsetX = 4 * (j + offsetY);
					this.nmeImageData.data[s + offsetX] = this.nmeImageData.data[s + offsetX] * colorTransform.redMultiplier + colorTransform.redOffset | 0;
					this.nmeImageData.data[s + offsetX + 1] = this.nmeImageData.data[s + offsetX + 1] * colorTransform.greenMultiplier + colorTransform.greenOffset | 0;
					this.nmeImageData.data[s + offsetX + 2] = this.nmeImageData.data[s + offsetX + 2] * colorTransform.blueMultiplier + colorTransform.blueOffset | 0;
					this.nmeImageData.data[s + offsetX + 3] = this.nmeImageData.data[s + offsetX + 3] * colorTransform.alphaMultiplier + colorTransform.alphaOffset | 0;
				}
			}
			this.nmeImageDataChanged = true;
		}
	}
	,clipRect: function(r) {
		if(r.x < 0) {
			r.width -= -r.x;
			r.x = 0;
			if(r.x + r.width <= 0) return null;
		}
		if(r.y < 0) {
			r.height -= -r.y;
			r.y = 0;
			if(r.y + r.height <= 0) return null;
		}
		if(r.x + r.width >= (this._nmeTextureBuffer != null?this._nmeTextureBuffer.width:0)) {
			r.width -= r.x + r.width - (this._nmeTextureBuffer != null?this._nmeTextureBuffer.width:0);
			if(r.width <= 0) return null;
		}
		if(r.y + r.height >= (this._nmeTextureBuffer != null?this._nmeTextureBuffer.height:0)) {
			r.height -= r.y + r.height - (this._nmeTextureBuffer != null?this._nmeTextureBuffer.height:0);
			if(r.height <= 0) return null;
		}
		return r;
	}
	,__class__: browser.display.BitmapData
	,__properties__: {get_height:"get_height",get_width:"get_width"}
}
browser.display.ImageDataLease = function() {
};
$hxClasses["browser.display.ImageDataLease"] = browser.display.ImageDataLease;
browser.display.ImageDataLease.__name__ = ["browser","display","ImageDataLease"];
browser.display.ImageDataLease.prototype = {
	set: function(s,t) {
		this.seed = s;
		this.time = t;
	}
	,clone: function() {
		var leaseClone = new browser.display.ImageDataLease();
		leaseClone.seed = this.seed;
		leaseClone.time = this.time;
		return leaseClone;
	}
	,__class__: browser.display.ImageDataLease
}
browser.display.CapsStyle = $hxClasses["browser.display.CapsStyle"] = { __ename__ : true, __constructs__ : ["NONE","ROUND","SQUARE"] }
browser.display.CapsStyle.NONE = ["NONE",0];
browser.display.CapsStyle.NONE.toString = $estr;
browser.display.CapsStyle.NONE.__enum__ = browser.display.CapsStyle;
browser.display.CapsStyle.ROUND = ["ROUND",1];
browser.display.CapsStyle.ROUND.toString = $estr;
browser.display.CapsStyle.ROUND.__enum__ = browser.display.CapsStyle;
browser.display.CapsStyle.SQUARE = ["SQUARE",2];
browser.display.CapsStyle.SQUARE.toString = $estr;
browser.display.CapsStyle.SQUARE.__enum__ = browser.display.CapsStyle;
browser.display.Graphics = function(inSurface) {
	browser.Lib.nmeBootstrap();
	if(inSurface == null) {
		this.nmeSurface = js.Lib.document.createElement("canvas");
		this.nmeSurface.width = 0;
		this.nmeSurface.height = 0;
	} else this.nmeSurface = inSurface;
	this.mLastMoveID = 0;
	this.mPenX = 0.0;
	this.mPenY = 0.0;
	this.mDrawList = new Array();
	this.mPoints = [];
	this.mSolidGradient = null;
	this.mBitmap = null;
	this.mFilling = false;
	this.mFillColour = 0;
	this.mFillAlpha = 0.0;
	this.mLastMoveID = 0;
	this.boundsDirty = true;
	this.nmeClearLine();
	this.mLineJobs = [];
	this.nmeChanged = true;
	this.nextDrawIndex = 0;
	this.nmeExtent = new browser.geom.Rectangle();
	this.nmeExtentWithFilters = new browser.geom.Rectangle();
	this._padding = 0.0;
	this.nmeClearNextCycle = true;
};
$hxClasses["browser.display.Graphics"] = browser.display.Graphics;
browser.display.Graphics.__name__ = ["browser","display","Graphics"];
browser.display.Graphics.nmeDetectIsPointInPathMode = function() {
	var canvas = js.Lib.document.createElement("canvas");
	var ctx = canvas.getContext("2d");
	if(ctx.isPointInPath == null) return browser.display.PointInPathMode.USER_SPACE;
	ctx.save();
	ctx.translate(1,0);
	ctx.beginPath();
	ctx.rect(0,0,1,1);
	var rv = ctx.isPointInPath(0.3,0.3)?browser.display.PointInPathMode.USER_SPACE:browser.display.PointInPathMode.DEVICE_SPACE;
	ctx.restore();
	return rv;
}
browser.display.Graphics.prototype = {
	nmeRender: function(maskHandle,filters,sx,sy,clip0,clip1,clip2,clip3) {
		if(sy == null) sy = 1.0;
		if(sx == null) sx = 1.0;
		if(!this.nmeChanged) return false;
		this.closePolygon(true);
		var padding = this._padding;
		if(filters != null) {
			var _g = 0;
			while(_g < filters.length) {
				var filter = filters[_g];
				++_g;
				if(Reflect.hasField(filter,"blurX")) padding += Math.max(Reflect.field(filter,"blurX"),Reflect.field(filter,"blurY")) * 4;
			}
		}
		this.nmeExpandFilteredExtent(-(padding * sx) / 2,-(padding * sy) / 2);
		if(this.nmeClearNextCycle) {
			this.nextDrawIndex = 0;
			this.nmeClearCanvas();
			this.nmeClearNextCycle = false;
		}
		if(this.nmeExtentWithFilters.width - this.nmeExtentWithFilters.x > this.nmeSurface.width || this.nmeExtentWithFilters.height - this.nmeExtentWithFilters.y > this.nmeSurface.height) this.nmeAdjustSurface(sx,sy);
		var ctx = (function($this) {
			var $r;
			try {
				$r = $this.nmeSurface.getContext("2d");
			} catch( e ) {
				$r = null;
			}
			return $r;
		}(this));
		if(ctx == null) return false;
		if(clip0 != null) {
			ctx.beginPath();
			ctx.moveTo(clip0.x * sx,clip0.y * sy);
			ctx.lineTo(clip1.x * sx,clip1.y * sy);
			ctx.lineTo(clip2.x * sx,clip2.y * sy);
			ctx.lineTo(clip3.x * sx,clip3.y * sy);
			ctx.closePath();
			ctx.clip();
		}
		if(filters != null) {
			var _g = 0;
			while(_g < filters.length) {
				var filter = filters[_g];
				++_g;
				if(js.Boot.__instanceof(filter,browser.filters.DropShadowFilter)) filter.nmeApplyFilter(this.nmeSurface,true);
			}
		}
		var len = this.mDrawList.length;
		ctx.save();
		if(this.nmeExtentWithFilters.x != 0 || this.nmeExtentWithFilters.y != 0) ctx.translate(-this.nmeExtentWithFilters.x * sx,-this.nmeExtentWithFilters.y * sy);
		if(sx != 1 || sy != 0) ctx.scale(sx,sy);
		var doStroke = false;
		var _g = this.nextDrawIndex;
		while(_g < len) {
			var i = _g++;
			var d = this.mDrawList[len - 1 - i];
			if(d.tileJob != null) this.nmeDrawTiles(d.tileJob.sheet,d.tileJob.drawList,d.tileJob.flags); else {
				if(d.lineJobs.length > 0) {
					var _g1 = 0, _g2 = d.lineJobs;
					while(_g1 < _g2.length) {
						var lj = _g2[_g1];
						++_g1;
						ctx.lineWidth = lj.thickness;
						switch(lj.joints) {
						case 0:
							ctx.lineJoin = "round";
							break;
						case 4096:
							ctx.lineJoin = "miter";
							break;
						case 8192:
							ctx.lineJoin = "bevel";
							break;
						}
						switch(lj.caps) {
						case 256:
							ctx.lineCap = "round";
							break;
						case 512:
							ctx.lineCap = "square";
							break;
						case 0:
							ctx.lineCap = "butt";
							break;
						}
						ctx.miterLimit = lj.miter_limit;
						if(lj.grad != null) ctx.strokeStyle = this.createCanvasGradient(ctx,lj.grad); else ctx.strokeStyle = this.createCanvasColor(lj.colour,lj.alpha);
						ctx.beginPath();
						var _g4 = lj.point_idx0, _g3 = lj.point_idx1 + 1;
						while(_g4 < _g3) {
							var i1 = _g4++;
							var p = d.points[i1];
							switch(p.type) {
							case 0:
								ctx.moveTo(p.x,p.y);
								break;
							case 2:
								ctx.quadraticCurveTo(p.cx,p.cy,p.x,p.y);
								break;
							default:
								ctx.lineTo(p.x,p.y);
							}
						}
						ctx.closePath();
						doStroke = true;
					}
				} else {
					ctx.beginPath();
					var _g1 = 0, _g2 = d.points;
					while(_g1 < _g2.length) {
						var p = _g2[_g1];
						++_g1;
						switch(p.type) {
						case 0:
							ctx.moveTo(p.x,p.y);
							break;
						case 2:
							ctx.quadraticCurveTo(p.cx,p.cy,p.x,p.y);
							break;
						default:
							ctx.lineTo(p.x,p.y);
						}
					}
					ctx.closePath();
				}
				var fillColour = d.fillColour;
				var fillAlpha = d.fillAlpha;
				var g = d.solidGradient;
				if(g != null) ctx.fillStyle = this.createCanvasGradient(ctx,g); else ctx.fillStyle = this.createCanvasColor(fillColour,Math.min(1.0,Math.max(0.0,fillAlpha)));
				ctx.fill();
				if(doStroke) ctx.stroke();
				ctx.save();
				var bitmap = d.bitmap;
				if(bitmap != null) {
					var img = bitmap.texture_buffer;
					var m = bitmap.matrix;
					if(m != null) ctx.transform(m.a,m.b,m.c,m.d,m.tx,m.ty);
					ctx.drawImage(img,0,0);
				}
				ctx.restore();
			}
		}
		ctx.restore();
		this.nmeChanged = false;
		this.nextDrawIndex = len;
		this.mDrawList = [];
		return true;
	}
	,nmeHitTest: function(inX,inY) {
		var ctx = (function($this) {
			var $r;
			try {
				$r = $this.nmeSurface.getContext("2d");
			} catch( e ) {
				$r = null;
			}
			return $r;
		}(this));
		if(ctx == null) return false;
		if(ctx.isPointInPath(inX,inY)) return true; else if(this.mDrawList.length == 0 && this.nmeExtent.width > 0 && this.nmeExtent.height > 0) return true;
		return false;
	}
	,nmeExpandStandardExtent: function(x,y,thickness) {
		if(thickness == null) thickness = 0;
		if(this._padding > 0) {
			this.nmeExtent.width -= this._padding;
			this.nmeExtent.height -= this._padding;
		}
		if(thickness != null && thickness > this._padding) this._padding = thickness;
		var maxX, minX, maxY, minY;
		minX = this.nmeExtent.x;
		minY = this.nmeExtent.y;
		maxX = this.nmeExtent.width + minX;
		maxY = this.nmeExtent.height + minY;
		maxX = x > maxX?x:maxX;
		minX = x < minX?x:minX;
		maxY = y > maxY?y:maxY;
		minY = y < minY?y:minY;
		this.nmeExtent.x = minX;
		this.nmeExtent.y = minY;
		this.nmeExtent.width = maxX - minX + this._padding;
		this.nmeExtent.height = maxY - minY + this._padding;
		this.boundsDirty = true;
	}
	,nmeExpandFilteredExtent: function(x,y) {
		var maxX, minX, maxY, minY;
		minX = this.nmeExtent.x;
		minY = this.nmeExtent.y;
		maxX = this.nmeExtent.width + minX;
		maxY = this.nmeExtent.height + minY;
		maxX = x > maxX?x:maxX;
		minX = x < minX?x:minX;
		maxY = y > maxY?y:maxY;
		minY = y < minY?y:minY;
		this.nmeExtentWithFilters.x = minX;
		this.nmeExtentWithFilters.y = minY;
		this.nmeExtentWithFilters.width = maxX - minX;
		this.nmeExtentWithFilters.height = maxY - minY;
	}
	,nmeDrawTiles: function(sheet,tileData,flags) {
		if(flags == null) flags = 0;
		var useScale = (flags & 1) > 0;
		var useRotation = (flags & 2) > 0;
		var useTransform = (flags & 16) > 0;
		var useRGB = (flags & 4) > 0;
		var useAlpha = (flags & 8) > 0;
		if(useTransform) {
			useScale = false;
			useRotation = false;
		}
		var scaleIndex = 0;
		var rotationIndex = 0;
		var rgbIndex = 0;
		var alphaIndex = 0;
		var transformIndex = 0;
		var numValues = 3;
		if(useScale) {
			scaleIndex = numValues;
			numValues++;
		}
		if(useRotation) {
			rotationIndex = numValues;
			numValues++;
		}
		if(useTransform) {
			transformIndex = numValues;
			numValues += 4;
		}
		if(useRGB) {
			rgbIndex = numValues;
			numValues += 3;
		}
		if(useAlpha) {
			alphaIndex = numValues;
			numValues++;
		}
		var totalCount = tileData.length;
		var itemCount = totalCount / numValues | 0;
		var index = 0;
		var rect = null;
		var center = null;
		var previousTileID = -1;
		var surface = sheet.nmeBitmap._nmeTextureBuffer;
		var ctx = (function($this) {
			var $r;
			try {
				$r = $this.nmeSurface.getContext("2d");
			} catch( e ) {
				$r = null;
			}
			return $r;
		}(this));
		if(ctx != null) while(index < totalCount) {
			var tileID = tileData[index + 2] | 0;
			if(tileID != previousTileID) {
				rect = sheet.nmeTileRects[tileID];
				center = sheet.nmeCenterPoints[tileID];
				previousTileID = tileID;
			}
			if(rect != null && center != null) {
				ctx.save();
				ctx.translate(tileData[index],tileData[index + 1]);
				if(useRotation) ctx.rotate(-tileData[index + rotationIndex]);
				var scale = 1.0;
				if(useScale) scale = tileData[index + scaleIndex];
				if(useTransform) ctx.transform(tileData[index + transformIndex],tileData[index + transformIndex + 1],tileData[index + transformIndex + 2],tileData[index + transformIndex + 3],0,0);
				if(useAlpha) ctx.globalAlpha = tileData[index + alphaIndex];
				ctx.drawImage(surface,rect.x,rect.y,rect.width,rect.height,-center.x * scale,-center.y * scale,rect.width * scale,rect.height * scale);
				ctx.restore();
			}
			index += numValues;
		}
	}
	,nmeDrawEllipse: function(x,y,rx,ry) {
		this.moveTo(x + rx,y);
		this.curveTo(rx + x,-0.4142 * ry + y,0.7071 * rx + x,-0.7071 * ry + y);
		this.curveTo(0.4142 * rx + x,-ry + y,x,-ry + y);
		this.curveTo(-0.4142 * rx + x,-ry + y,-0.7071 * rx + x,-0.7071 * ry + y);
		this.curveTo(-rx + x,-0.4142 * ry + y,-rx + x,y);
		this.curveTo(-rx + x,0.4142 * ry + y,-0.7071 * rx + x,0.7071 * ry + y);
		this.curveTo(-0.4142 * rx + x,ry + y,x,ry + y);
		this.curveTo(0.4142 * rx + x,ry + y,0.7071 * rx + x,0.7071 * ry + y);
		this.curveTo(rx + x,0.4142 * ry + y,rx + x,y);
	}
	,nmeClearLine: function() {
		this.mCurrentLine = new browser.display.LineJob(null,-1,-1,0.0,0.0,0,1,0,256,3,3.0);
	}
	,nmeClearCanvas: function() {
		if(this.nmeSurface != null) {
			var ctx = (function($this) {
				var $r;
				try {
					$r = $this.nmeSurface.getContext("2d");
				} catch( e ) {
					$r = null;
				}
				return $r;
			}(this));
			if(ctx != null) ctx.clearRect(0,0,this.nmeSurface.width,this.nmeSurface.height);
		}
	}
	,nmeAdjustSurface: function(sx,sy) {
		if(sy == null) sy = 1.0;
		if(sx == null) sx = 1.0;
		if(Reflect.field(this.nmeSurface,"getContext") != null) {
			var width = Math.ceil((this.nmeExtentWithFilters.width - this.nmeExtentWithFilters.x) * sx);
			var height = Math.ceil((this.nmeExtentWithFilters.height - this.nmeExtentWithFilters.y) * sy);
			if(width <= 5000 && height <= 5000) {
				var dstCanvas = js.Lib.document.createElement("canvas");
				dstCanvas.width = width;
				dstCanvas.height = height;
				browser.Lib.nmeDrawToSurface(this.nmeSurface,dstCanvas);
				if(browser.Lib.nmeIsOnStage(this.nmeSurface)) {
					browser.Lib.nmeAppendSurface(dstCanvas);
					browser.Lib.nmeCopyStyle(this.nmeSurface,dstCanvas);
					browser.Lib.nmeSwapSurface(this.nmeSurface,dstCanvas);
					browser.Lib.nmeRemoveSurface(this.nmeSurface);
					if(this.nmeSurface.id != null) browser.Lib.nmeSetSurfaceId(dstCanvas,this.nmeSurface.id);
				}
				this.nmeSurface = dstCanvas;
			}
		}
	}
	,moveTo: function(inX,inY) {
		this.mPenX = inX;
		this.mPenY = inY;
		this.nmeExpandStandardExtent(inX,inY);
		if(!this.mFilling) this.closePolygon(false); else {
			this.addLineSegment();
			this.mLastMoveID = this.mPoints.length;
			this.mPoints.push(new browser.display.GfxPoint(this.mPenX,this.mPenY,0.0,0.0,0));
		}
	}
	,lineTo: function(inX,inY) {
		var pid = this.mPoints.length;
		if(pid == 0) {
			this.mPoints.push(new browser.display.GfxPoint(this.mPenX,this.mPenY,0.0,0.0,0));
			pid++;
		}
		this.mPenX = inX;
		this.mPenY = inY;
		this.nmeExpandStandardExtent(inX,inY,this.mCurrentLine.thickness);
		this.mPoints.push(new browser.display.GfxPoint(this.mPenX,this.mPenY,0.0,0.0,1));
		if(this.mCurrentLine.grad != null || this.mCurrentLine.alpha > 0) {
			if(this.mCurrentLine.point_idx0 < 0) this.mCurrentLine.point_idx0 = pid - 1;
			this.mCurrentLine.point_idx1 = pid;
		}
		if(!this.mFilling) this.closePolygon(false);
	}
	,lineStyle: function(thickness,color,alpha,pixelHinting,scaleMode,caps,joints,miterLimit) {
		this.addLineSegment();
		if(thickness == null) {
			this.nmeClearLine();
			return;
		} else {
			this.mCurrentLine.grad = null;
			this.mCurrentLine.thickness = thickness;
			this.mCurrentLine.colour = color == null?0:color;
			this.mCurrentLine.alpha = alpha == null?1.0:alpha;
			this.mCurrentLine.miter_limit = miterLimit == null?3.0:miterLimit;
			this.mCurrentLine.pixel_hinting = pixelHinting == null || !pixelHinting?0:16384;
		}
		if(caps != null) {
			switch( (caps)[1] ) {
			case 1:
				this.mCurrentLine.caps = 256;
				break;
			case 2:
				this.mCurrentLine.caps = 512;
				break;
			case 0:
				this.mCurrentLine.caps = 0;
				break;
			}
		}
		this.mCurrentLine.scale_mode = 3;
		if(scaleMode != null) {
			switch( (scaleMode)[1] ) {
			case 2:
				this.mCurrentLine.scale_mode = 3;
				break;
			case 3:
				this.mCurrentLine.scale_mode = 1;
				break;
			case 0:
				this.mCurrentLine.scale_mode = 2;
				break;
			case 1:
				this.mCurrentLine.scale_mode = 0;
				break;
			}
		}
		this.mCurrentLine.joints = 0;
		if(joints != null) {
			switch( (joints)[1] ) {
			case 1:
				this.mCurrentLine.joints = 0;
				break;
			case 0:
				this.mCurrentLine.joints = 4096;
				break;
			case 2:
				this.mCurrentLine.joints = 8192;
				break;
			}
		}
	}
	,endFill: function() {
		this.closePolygon(true);
	}
	,drawTiles: function(sheet,tileData,smooth,flags) {
		if(flags == null) flags = 0;
		if(smooth == null) smooth = false;
		this.nmeExpandStandardExtent(browser.Lib.get_current().get_stage().get_stageWidth(),browser.Lib.get_current().get_stage().get_stageHeight());
		this.addDrawable(new browser.display.Drawable(null,null,null,null,null,null,new browser.display.TileJob(sheet,tileData,flags)));
		this.nmeChanged = true;
	}
	,drawRoundRect: function(x,y,width,height,rx,ry) {
		rx *= 0.5;
		ry *= 0.5;
		var w = width * 0.5;
		x += w;
		if(rx > w) rx = w;
		var lw = w - rx;
		var w_ = lw + rx * Math.sin(Math.PI / 4);
		var cw_ = lw + rx * Math.tan(Math.PI / 8);
		var h = height * 0.5;
		y += h;
		if(ry > h) ry = h;
		var lh = h - ry;
		var h_ = lh + ry * Math.sin(Math.PI / 4);
		var ch_ = lh + ry * Math.tan(Math.PI / 8);
		this.closePolygon(false);
		this.moveTo(x + w,y + lh);
		this.curveTo(x + w,y + ch_,x + w_,y + h_);
		this.curveTo(x + cw_,y + h,x + lw,y + h);
		this.lineTo(x - lw,y + h);
		this.curveTo(x - cw_,y + h,x - w_,y + h_);
		this.curveTo(x - w,y + ch_,x - w,y + lh);
		this.lineTo(x - w,y - lh);
		this.curveTo(x - w,y - ch_,x - w_,y - h_);
		this.curveTo(x - cw_,y - h,x - lw,y - h);
		this.lineTo(x + lw,y - h);
		this.curveTo(x + cw_,y - h,x + w_,y - h_);
		this.curveTo(x + w,y - ch_,x + w,y - lh);
		this.lineTo(x + w,y + lh);
		this.closePolygon(false);
	}
	,drawRect: function(x,y,width,height) {
		this.closePolygon(false);
		this.moveTo(x,y);
		this.lineTo(x + width,y);
		this.lineTo(x + width,y + height);
		this.lineTo(x,y + height);
		this.lineTo(x,y);
		this.closePolygon(false);
	}
	,drawCircle: function(x,y,rad) {
		this.closePolygon(false);
		this.nmeDrawEllipse(x,y,rad,rad);
		this.closePolygon(false);
	}
	,curveTo: function(inCX,inCY,inX,inY) {
		var pid = this.mPoints.length;
		if(pid == 0) {
			this.mPoints.push(new browser.display.GfxPoint(this.mPenX,this.mPenY,0.0,0.0,0));
			pid++;
		}
		this.mPenX = inX;
		this.mPenY = inY;
		this.nmeExpandStandardExtent(inX,inY,this.mCurrentLine.thickness);
		this.mPoints.push(new browser.display.GfxPoint(inX,inY,inCX,inCY,2));
		if(this.mCurrentLine.grad != null || this.mCurrentLine.alpha > 0) {
			if(this.mCurrentLine.point_idx0 < 0) this.mCurrentLine.point_idx0 = pid - 1;
			this.mCurrentLine.point_idx1 = pid;
		}
	}
	,createCanvasGradient: function(ctx,g) {
		var gradient;
		var matrix = g.matrix;
		if((g.flags & 1) == 0) {
			var p1 = matrix.transformPoint(new browser.geom.Point(-819.2,0));
			var p2 = matrix.transformPoint(new browser.geom.Point(819.2,0));
			gradient = ctx.createLinearGradient(p1.x,p1.y,p2.x,p2.y);
		} else {
			var p1 = matrix.transformPoint(new browser.geom.Point(g.focal * 819.2,0));
			var p2 = matrix.transformPoint(new browser.geom.Point(0,819.2));
			gradient = ctx.createRadialGradient(p1.x,p1.y,0,p2.x,p1.y,p2.y);
		}
		var _g = 0, _g1 = g.points;
		while(_g < _g1.length) {
			var point = _g1[_g];
			++_g;
			var color = this.createCanvasColor(point.col,point.alpha);
			var pos = point.ratio / 255;
			gradient.addColorStop(pos,color);
		}
		return gradient;
	}
	,createCanvasColor: function(color,alpha) {
		var r = (16711680 & color) >> 16;
		var g = (65280 & color) >> 8;
		var b = 255 & color;
		return "rgba" + "(" + r + "," + g + "," + b + "," + alpha + ")";
	}
	,closePolygon: function(inCancelFill) {
		var l = this.mPoints.length;
		if(l > 0) {
			if(l > 1) {
				if(this.mFilling && l > 2) {
					if(this.mPoints[this.mLastMoveID].x != this.mPoints[l - 1].x || this.mPoints[this.mLastMoveID].y != this.mPoints[l - 1].y) this.lineTo(this.mPoints[this.mLastMoveID].x,this.mPoints[this.mLastMoveID].y);
				}
				this.addLineSegment();
				var drawable = new browser.display.Drawable(this.mPoints,this.mFillColour,this.mFillAlpha,this.mSolidGradient,this.mBitmap,this.mLineJobs,null);
				this.addDrawable(drawable);
			}
			this.mLineJobs = [];
			this.mPoints = [];
		}
		if(inCancelFill) {
			this.mFillAlpha = 0;
			this.mSolidGradient = null;
			this.mBitmap = null;
			this.mFilling = false;
		}
		this.nmeChanged = true;
	}
	,clear: function() {
		this.nmeClearLine();
		this.mPenX = 0.0;
		this.mPenY = 0.0;
		this.mDrawList = new Array();
		this.nextDrawIndex = 0;
		this.mPoints = [];
		this.mSolidGradient = null;
		this.mFilling = false;
		this.mFillColour = 0;
		this.mFillAlpha = 0.0;
		this.mLastMoveID = 0;
		this.nmeClearNextCycle = true;
		this.boundsDirty = true;
		this.nmeExtent.x = 0.0;
		this.nmeExtent.y = 0.0;
		this.nmeExtent.width = 0.0;
		this.nmeExtent.height = 0.0;
		this._padding = 0.0;
		this.mLineJobs = [];
	}
	,beginFill: function(color,alpha) {
		this.closePolygon(true);
		this.mFillColour = color;
		this.mFillAlpha = alpha == null?1.0:alpha;
		this.mFilling = true;
		this.mSolidGradient = null;
		this.mBitmap = null;
	}
	,addLineSegment: function() {
		if(this.mCurrentLine.point_idx1 > 0) this.mLineJobs.push(new browser.display.LineJob(this.mCurrentLine.grad,this.mCurrentLine.point_idx0,this.mCurrentLine.point_idx1,this.mCurrentLine.thickness,this.mCurrentLine.alpha,this.mCurrentLine.colour,this.mCurrentLine.pixel_hinting,this.mCurrentLine.joints,this.mCurrentLine.caps,this.mCurrentLine.scale_mode,this.mCurrentLine.miter_limit));
		this.mCurrentLine.point_idx0 = this.mCurrentLine.point_idx1 = -1;
	}
	,addDrawable: function(inDrawable) {
		if(inDrawable == null) return;
		this.mDrawList.unshift(inDrawable);
	}
	,__class__: browser.display.Graphics
}
browser.display.Drawable = function(inPoints,inFillColour,inFillAlpha,inSolidGradient,inBitmap,inLineJobs,inTileJob) {
	this.points = inPoints;
	this.fillColour = inFillColour;
	this.fillAlpha = inFillAlpha;
	this.solidGradient = inSolidGradient;
	this.bitmap = inBitmap;
	this.lineJobs = inLineJobs;
	this.tileJob = inTileJob;
};
$hxClasses["browser.display.Drawable"] = browser.display.Drawable;
browser.display.Drawable.__name__ = ["browser","display","Drawable"];
browser.display.Drawable.prototype = {
	__class__: browser.display.Drawable
}
browser.display.GfxPoint = function(inX,inY,inCX,inCY,inType) {
	this.x = inX;
	this.y = inY;
	this.cx = inCX;
	this.cy = inCY;
	this.type = inType;
};
$hxClasses["browser.display.GfxPoint"] = browser.display.GfxPoint;
browser.display.GfxPoint.__name__ = ["browser","display","GfxPoint"];
browser.display.GfxPoint.prototype = {
	__class__: browser.display.GfxPoint
}
browser.display.Grad = function() { }
$hxClasses["browser.display.Grad"] = browser.display.Grad;
browser.display.Grad.__name__ = ["browser","display","Grad"];
browser.display.Grad.prototype = {
	__class__: browser.display.Grad
}
browser.display.GradPoint = function() { }
$hxClasses["browser.display.GradPoint"] = browser.display.GradPoint;
browser.display.GradPoint.__name__ = ["browser","display","GradPoint"];
browser.display.GradPoint.prototype = {
	__class__: browser.display.GradPoint
}
browser.display.LineJob = function(inGrad,inPoint_idx0,inPoint_idx1,inThickness,inAlpha,inColour,inPixel_hinting,inJoints,inCaps,inScale_mode,inMiter_limit) {
	this.grad = inGrad;
	this.point_idx0 = inPoint_idx0;
	this.point_idx1 = inPoint_idx1;
	this.thickness = inThickness;
	this.alpha = inAlpha;
	this.colour = inColour;
	this.pixel_hinting = inPixel_hinting;
	this.joints = inJoints;
	this.caps = inCaps;
	this.scale_mode = inScale_mode;
	this.miter_limit = inMiter_limit;
};
$hxClasses["browser.display.LineJob"] = browser.display.LineJob;
browser.display.LineJob.__name__ = ["browser","display","LineJob"];
browser.display.LineJob.prototype = {
	__class__: browser.display.LineJob
}
browser.display.PointInPathMode = $hxClasses["browser.display.PointInPathMode"] = { __ename__ : true, __constructs__ : ["USER_SPACE","DEVICE_SPACE"] }
browser.display.PointInPathMode.USER_SPACE = ["USER_SPACE",0];
browser.display.PointInPathMode.USER_SPACE.toString = $estr;
browser.display.PointInPathMode.USER_SPACE.__enum__ = browser.display.PointInPathMode;
browser.display.PointInPathMode.DEVICE_SPACE = ["DEVICE_SPACE",1];
browser.display.PointInPathMode.DEVICE_SPACE.toString = $estr;
browser.display.PointInPathMode.DEVICE_SPACE.__enum__ = browser.display.PointInPathMode;
browser.display.TileJob = function(sheet,drawList,flags) {
	this.sheet = sheet;
	this.drawList = drawList;
	this.flags = flags;
};
$hxClasses["browser.display.TileJob"] = browser.display.TileJob;
browser.display.TileJob.__name__ = ["browser","display","TileJob"];
browser.display.TileJob.prototype = {
	__class__: browser.display.TileJob
}
browser.display.IGraphicsData = function() { }
$hxClasses["browser.display.IGraphicsData"] = browser.display.IGraphicsData;
browser.display.IGraphicsData.__name__ = ["browser","display","IGraphicsData"];
browser.display.IGraphicsData.prototype = {
	__class__: browser.display.IGraphicsData
}
browser.display.IGraphicsFill = function() { }
$hxClasses["browser.display.IGraphicsFill"] = browser.display.IGraphicsFill;
browser.display.IGraphicsFill.__name__ = ["browser","display","IGraphicsFill"];
browser.display.IGraphicsFill.prototype = {
	__class__: browser.display.IGraphicsFill
}
browser.display.JointStyle = $hxClasses["browser.display.JointStyle"] = { __ename__ : true, __constructs__ : ["MITER","ROUND","BEVEL"] }
browser.display.JointStyle.MITER = ["MITER",0];
browser.display.JointStyle.MITER.toString = $estr;
browser.display.JointStyle.MITER.__enum__ = browser.display.JointStyle;
browser.display.JointStyle.ROUND = ["ROUND",1];
browser.display.JointStyle.ROUND.toString = $estr;
browser.display.JointStyle.ROUND.__enum__ = browser.display.JointStyle;
browser.display.JointStyle.BEVEL = ["BEVEL",2];
browser.display.JointStyle.BEVEL.toString = $estr;
browser.display.JointStyle.BEVEL.__enum__ = browser.display.JointStyle;
browser.display.LineScaleMode = $hxClasses["browser.display.LineScaleMode"] = { __ename__ : true, __constructs__ : ["HORIZONTAL","NONE","NORMAL","VERTICAL"] }
browser.display.LineScaleMode.HORIZONTAL = ["HORIZONTAL",0];
browser.display.LineScaleMode.HORIZONTAL.toString = $estr;
browser.display.LineScaleMode.HORIZONTAL.__enum__ = browser.display.LineScaleMode;
browser.display.LineScaleMode.NONE = ["NONE",1];
browser.display.LineScaleMode.NONE.toString = $estr;
browser.display.LineScaleMode.NONE.__enum__ = browser.display.LineScaleMode;
browser.display.LineScaleMode.NORMAL = ["NORMAL",2];
browser.display.LineScaleMode.NORMAL.toString = $estr;
browser.display.LineScaleMode.NORMAL.__enum__ = browser.display.LineScaleMode;
browser.display.LineScaleMode.VERTICAL = ["VERTICAL",3];
browser.display.LineScaleMode.VERTICAL.toString = $estr;
browser.display.LineScaleMode.VERTICAL.__enum__ = browser.display.LineScaleMode;
browser.display.Loader = function() {
	browser.display.DisplayObjectContainer.call(this);
	this.contentLoaderInfo = browser.display.LoaderInfo.create(this);
};
$hxClasses["browser.display.Loader"] = browser.display.Loader;
browser.display.Loader.__name__ = ["browser","display","Loader"];
browser.display.Loader.__super__ = browser.display.DisplayObjectContainer;
browser.display.Loader.prototype = $extend(browser.display.DisplayObjectContainer.prototype,{
	handleLoad: function(e) {
		this.content.nmeInvalidateBounds();
		this.content.nmeRender(null,null);
		this.contentLoaderInfo.removeEventListener(browser.events.Event.COMPLETE,$bind(this,this.handleLoad));
	}
	,validateBounds: function() {
		if(this.get__boundsInvalid()) {
			browser.display.DisplayObjectContainer.prototype.validateBounds.call(this);
			if(this.mImage != null) {
				var r = new browser.geom.Rectangle(0,0,this.mImage.get_width(),this.mImage.get_height());
				if(r.width != 0 || r.height != 0) {
					if(this.nmeBoundsRect.width == 0 && this.nmeBoundsRect.height == 0) this.nmeBoundsRect = r.clone(); else this.nmeBoundsRect.extendBounds(r);
				}
			}
			if(this.scale9Grid != null) {
				this.nmeBoundsRect.width *= this.nmeScaleX;
				this.nmeBoundsRect.height *= this.nmeScaleY;
				this.nmeWidth = this.nmeBoundsRect.width;
				this.nmeHeight = this.nmeBoundsRect.height;
			} else {
				this.nmeWidth = this.nmeBoundsRect.width * this.nmeScaleX;
				this.nmeHeight = this.nmeBoundsRect.height * this.nmeScaleY;
			}
		}
	}
	,toString: function() {
		return "[Loader name=" + this.name + " id=" + this._nmeId + "]";
	}
	,load: function(request,context) {
		var extension = "";
		var parts = request.url.split(".");
		if(parts.length > 0) extension = parts[parts.length - 1].toLowerCase();
		var transparent = true;
		this.contentLoaderInfo.url = request.url;
		this.contentLoaderInfo.contentType = (function($this) {
			var $r;
			switch(extension) {
			case "swf":
				$r = "application/x-shockwave-flash";
				break;
			case "jpg":case "jpeg":
				$r = (function($this) {
					var $r;
					transparent = false;
					$r = "image/jpeg";
					return $r;
				}($this));
				break;
			case "png":
				$r = "image/png";
				break;
			case "gif":
				$r = "image/gif";
				break;
			default:
				$r = (function($this) {
					var $r;
					throw "Unrecognized file " + request.url;
					return $r;
				}($this));
			}
			return $r;
		}(this));
		this.mImage = new browser.display.BitmapData(0,0,transparent);
		try {
			this.contentLoaderInfo.addEventListener(browser.events.Event.COMPLETE,$bind(this,this.handleLoad),false,2147483647);
			this.mImage.nmeLoadFromFile(request.url,this.contentLoaderInfo);
			this.content = new browser.display.Bitmap(this.mImage);
			this.contentLoaderInfo.content = this.content;
			this.addChild(this.content);
		} catch( e ) {
			console.log("Error " + Std.string(e));
			var evt = new browser.events.IOErrorEvent(browser.events.IOErrorEvent.IO_ERROR);
			this.contentLoaderInfo.dispatchEvent(evt);
			return;
		}
		if(this.mShape == null) {
			this.mShape = new browser.display.Shape();
			this.addChild(this.mShape);
		}
	}
	,__class__: browser.display.Loader
});
browser.display.LoaderInfo = function() {
	browser.events.EventDispatcher.call(this);
	this.bytesLoaded = 0;
	this.bytesTotal = 0;
	this.childAllowsParent = true;
	this.parameters = { };
};
$hxClasses["browser.display.LoaderInfo"] = browser.display.LoaderInfo;
browser.display.LoaderInfo.__name__ = ["browser","display","LoaderInfo"];
browser.display.LoaderInfo.create = function(ldr) {
	var li = new browser.display.LoaderInfo();
	if(ldr != null) li.loader = ldr;
	return li;
}
browser.display.LoaderInfo.__super__ = browser.events.EventDispatcher;
browser.display.LoaderInfo.prototype = $extend(browser.events.EventDispatcher.prototype,{
	__class__: browser.display.LoaderInfo
});
browser.display.MovieClip = function() {
	browser.display.Sprite.call(this);
	this.enabled = true;
	this.mCurrentFrame = 0;
	this.mTotalFrames = 0;
	this.loaderInfo = browser.display.LoaderInfo.create(null);
};
$hxClasses["browser.display.MovieClip"] = browser.display.MovieClip;
browser.display.MovieClip.__name__ = ["browser","display","MovieClip"];
browser.display.MovieClip.__super__ = browser.display.Sprite;
browser.display.MovieClip.prototype = $extend(browser.display.Sprite.prototype,{
	get_totalFrames: function() {
		return this.mTotalFrames;
	}
	,get_framesLoaded: function() {
		return this.mTotalFrames;
	}
	,get_currentFrame: function() {
		return this.mCurrentFrame;
	}
	,toString: function() {
		return "[MovieClip name=" + this.name + " id=" + this._nmeId + "]";
	}
	,__class__: browser.display.MovieClip
});
browser.display.PixelSnapping = $hxClasses["browser.display.PixelSnapping"] = { __ename__ : true, __constructs__ : ["NEVER","AUTO","ALWAYS"] }
browser.display.PixelSnapping.NEVER = ["NEVER",0];
browser.display.PixelSnapping.NEVER.toString = $estr;
browser.display.PixelSnapping.NEVER.__enum__ = browser.display.PixelSnapping;
browser.display.PixelSnapping.AUTO = ["AUTO",1];
browser.display.PixelSnapping.AUTO.toString = $estr;
browser.display.PixelSnapping.AUTO.__enum__ = browser.display.PixelSnapping;
browser.display.PixelSnapping.ALWAYS = ["ALWAYS",2];
browser.display.PixelSnapping.ALWAYS.toString = $estr;
browser.display.PixelSnapping.ALWAYS.__enum__ = browser.display.PixelSnapping;
browser.display.Shape = function() {
	browser.display.DisplayObject.call(this);
	this.nmeGraphics = new browser.display.Graphics();
};
$hxClasses["browser.display.Shape"] = browser.display.Shape;
browser.display.Shape.__name__ = ["browser","display","Shape"];
browser.display.Shape.__super__ = browser.display.DisplayObject;
browser.display.Shape.prototype = $extend(browser.display.DisplayObject.prototype,{
	get_graphics: function() {
		return this.nmeGraphics;
	}
	,toString: function() {
		return "[Shape name=" + this.name + " id=" + this._nmeId + "]";
	}
	,nmeGetObjectUnderPoint: function(point) {
		if(this.parent == null) return null;
		if(this.parent.mouseEnabled && browser.display.DisplayObject.prototype.nmeGetObjectUnderPoint.call(this,point) == this) return this.parent; else return null;
	}
	,nmeGetGraphics: function() {
		return this.nmeGraphics;
	}
	,__class__: browser.display.Shape
});
browser.events.Event = function(inType,inBubbles,inCancelable) {
	if(inCancelable == null) inCancelable = false;
	if(inBubbles == null) inBubbles = false;
	this.type = inType;
	this.bubbles = inBubbles;
	this.cancelable = inCancelable;
	this.nmeIsCancelled = false;
	this.nmeIsCancelledNow = false;
	this.target = null;
	this.currentTarget = null;
	this.eventPhase = browser.events.EventPhase.AT_TARGET;
};
$hxClasses["browser.events.Event"] = browser.events.Event;
browser.events.Event.__name__ = ["browser","events","Event"];
browser.events.Event.prototype = {
	nmeSetPhase: function(phase) {
		this.eventPhase = phase;
	}
	,nmeGetIsCancelledNow: function() {
		return this.nmeIsCancelledNow;
	}
	,nmeGetIsCancelled: function() {
		return this.nmeIsCancelled;
	}
	,nmeCreateSimilar: function(type,related,targ) {
		var result = new browser.events.Event(type,this.bubbles,this.cancelable);
		if(targ != null) result.target = targ;
		return result;
	}
	,__class__: browser.events.Event
}
browser.events.MouseEvent = function(type,bubbles,cancelable,localX,localY,relatedObject,ctrlKey,altKey,shiftKey,buttonDown,delta,commandKey,clickCount) {
	if(clickCount == null) clickCount = 0;
	if(commandKey == null) commandKey = false;
	if(delta == null) delta = 0;
	if(buttonDown == null) buttonDown = false;
	if(shiftKey == null) shiftKey = false;
	if(altKey == null) altKey = false;
	if(ctrlKey == null) ctrlKey = false;
	if(localY == null) localY = 0;
	if(localX == null) localX = 0;
	if(cancelable == null) cancelable = false;
	if(bubbles == null) bubbles = true;
	browser.events.Event.call(this,type,bubbles,cancelable);
	this.shiftKey = shiftKey;
	this.altKey = altKey;
	this.ctrlKey = ctrlKey;
	this.bubbles = bubbles;
	this.relatedObject = relatedObject;
	this.delta = delta;
	this.localX = localX;
	this.localY = localY;
	this.buttonDown = buttonDown;
	this.commandKey = commandKey;
	this.clickCount = clickCount;
};
$hxClasses["browser.events.MouseEvent"] = browser.events.MouseEvent;
browser.events.MouseEvent.__name__ = ["browser","events","MouseEvent"];
browser.events.MouseEvent.nmeCreate = function(type,event,local,target) {
	var nmeMouseDown = false;
	var delta = 2;
	if(type == browser.events.MouseEvent.MOUSE_WHEEL) {
		var mouseEvent = event;
		if(mouseEvent.wheelDelta) delta = mouseEvent.wheelDelta / 120 | 0; else if(mouseEvent.detail) -mouseEvent.detail | 0;
	}
	if(type == browser.events.MouseEvent.MOUSE_DOWN) nmeMouseDown = event.which != null?event.which == 1:event.button != null?event.button == 0:false; else if(type == browser.events.MouseEvent.MOUSE_UP) {
		if(event.which != null) {
			if(event.which == 1) nmeMouseDown = false; else if(event.button != null) {
				if(event.button == 0) nmeMouseDown = false; else nmeMouseDown = false;
			}
		}
	}
	var pseudoEvent = new browser.events.MouseEvent(type,true,false,local.x,local.y,null,event.ctrlKey,event.altKey,event.shiftKey,nmeMouseDown,delta);
	pseudoEvent.stageX = browser.Lib.get_current().get_stage().get_mouseX();
	pseudoEvent.stageY = browser.Lib.get_current().get_stage().get_mouseY();
	pseudoEvent.target = target;
	return pseudoEvent;
}
browser.events.MouseEvent.__super__ = browser.events.Event;
browser.events.MouseEvent.prototype = $extend(browser.events.Event.prototype,{
	nmeCreateSimilar: function(type,related,targ) {
		var result = new browser.events.MouseEvent(type,this.bubbles,this.cancelable,this.localX,this.localY,related == null?this.relatedObject:related,this.ctrlKey,this.altKey,this.shiftKey,this.buttonDown,this.delta,this.commandKey,this.clickCount);
		if(targ != null) result.target = targ;
		return result;
	}
	,__class__: browser.events.MouseEvent
});
browser.display.Stage = function(width,height) {
	browser.display.DisplayObjectContainer.call(this);
	this.nmeFocusObject = null;
	this.nmeWindowWidth = width;
	this.nmeWindowHeight = height;
	this.stageFocusRect = false;
	this.scaleMode = browser.display.StageScaleMode.SHOW_ALL;
	this.nmeStageMatrix = new browser.geom.Matrix();
	this.tabEnabled = true;
	this.set_frameRate(0.0);
	this.set_backgroundColor(16777215);
	this.name = "Stage";
	this.loaderInfo = browser.display.LoaderInfo.create(null);
	this.loaderInfo.parameters.width = Std.string(this.nmeWindowWidth);
	this.loaderInfo.parameters.height = Std.string(this.nmeWindowHeight);
	this.nmePointInPathMode = browser.display.Graphics.nmeDetectIsPointInPathMode();
	this.nmeMouseOverObjects = [];
	this.set_showDefaultContextMenu(true);
	this.nmeTouchInfo = [];
	this.nmeFocusOverObjects = [];
	this.nmeUIEventsQueue = new Array(1000);
	this.nmeUIEventsQueueIndex = 0;
};
$hxClasses["browser.display.Stage"] = browser.display.Stage;
browser.display.Stage.__name__ = ["browser","display","Stage"];
browser.display.Stage.__super__ = browser.display.DisplayObjectContainer;
browser.display.Stage.prototype = $extend(browser.display.DisplayObjectContainer.prototype,{
	get_stageWidth: function() {
		return this.nmeWindowWidth;
	}
	,get_stageHeight: function() {
		return this.nmeWindowHeight;
	}
	,get_stage: function() {
		return browser.Lib.nmeGetStage();
	}
	,set_showDefaultContextMenu: function(showDefaultContextMenu) {
		if(showDefaultContextMenu != this.nmeShowDefaultContextMenu && this.nmeShowDefaultContextMenu != null) {
			if(!showDefaultContextMenu) browser.Lib.nmeDisableRightClick(); else browser.Lib.nmeEnableRightClick();
		}
		this.nmeShowDefaultContextMenu = showDefaultContextMenu;
		return showDefaultContextMenu;
	}
	,set_quality: function(inQuality) {
		return this.quality = inQuality;
	}
	,get_quality: function() {
		return this.quality != null?this.quality:browser.display.StageQuality.BEST;
	}
	,get_mouseY: function() {
		return this._mouseY;
	}
	,get_mouseX: function() {
		return this._mouseX;
	}
	,set_frameRate: function(speed) {
		if(speed == 0) {
			var window = js.Lib.window;
			var nmeRequestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame;
			if(nmeRequestAnimationFrame == null) speed = 60;
		}
		if(speed != 0) {
			var window = js.Lib.window;
			this.nmeInterval = 1000.0 / speed | 0;
		}
		this.nmeFrameRate = speed;
		this.nmeUpdateNextWake();
		return speed;
	}
	,get_frameRate: function() {
		return this.nmeFrameRate;
	}
	,set_focus: function(inObj) {
		return this.nmeFocusObject = inObj;
	}
	,get_focus: function() {
		return this.nmeFocusObject;
	}
	,set_displayState: function(displayState) {
		if(displayState != this.displayState && this.displayState != null) {
			switch( (displayState)[1] ) {
			case 1:
				browser.Lib.nmeDisableFullScreen();
				break;
			case 0:
				browser.Lib.nmeEnableFullScreen();
				break;
			}
		}
		this.displayState = displayState;
		return displayState;
	}
	,set_backgroundColor: function(col) {
		return this.nmeBackgroundColour = col;
	}
	,get_backgroundColor: function() {
		return this.nmeBackgroundColour;
	}
	,nmeOnTouch: function(event,touch,type,touchInfo,isPrimaryTouchPoint) {
		var point = new browser.geom.Point(touch.pageX - browser.Lib.mMe.__scr.offsetLeft + window.pageXOffset,touch.pageY - browser.Lib.mMe.__scr.offsetTop + window.pageYOffset);
		var obj = this.nmeGetObjectUnderPoint(point);
		this._mouseX = point.x;
		this._mouseY = point.y;
		var stack = new Array();
		if(obj != null) obj.nmeGetInteractiveObjectStack(stack);
		if(stack.length > 0) {
			stack.reverse();
			var local = obj.globalToLocal(point);
			var evt = browser.events.TouchEvent.nmeCreate(type,event,touch,local,obj);
			evt.touchPointID = touch.identifier;
			evt.isPrimaryTouchPoint = isPrimaryTouchPoint;
			this.nmeCheckInOuts(evt,stack,touchInfo);
			obj.nmeFireEvent(evt);
			var mouseType = (function($this) {
				var $r;
				switch(type) {
				case "touchBegin":
					$r = browser.events.MouseEvent.MOUSE_DOWN;
					break;
				case "touchEnd":
					$r = browser.events.MouseEvent.MOUSE_UP;
					break;
				default:
					$r = (function($this) {
						var $r;
						if($this.nmeDragObject != null) $this.nmeDrag(point);
						$r = browser.events.MouseEvent.MOUSE_MOVE;
						return $r;
					}($this));
				}
				return $r;
			}(this));
			obj.nmeFireEvent(browser.events.MouseEvent.nmeCreate(mouseType,evt,local,obj));
		} else {
			var evt = browser.events.TouchEvent.nmeCreate(type,event,touch,point,null);
			evt.touchPointID = touch.identifier;
			evt.isPrimaryTouchPoint = isPrimaryTouchPoint;
			this.nmeCheckInOuts(evt,stack,touchInfo);
		}
	}
	,nmeOnResize: function(inW,inH) {
		this.nmeWindowWidth = inW;
		this.nmeWindowHeight = inH;
		var event = new browser.events.Event(browser.events.Event.RESIZE);
		event.target = this;
		this.nmeBroadcast(event);
	}
	,nmeOnMouse: function(event,type) {
		var point = new browser.geom.Point(event.clientX - browser.Lib.mMe.__scr.offsetLeft + window.pageXOffset,event.clientY - browser.Lib.mMe.__scr.offsetTop + window.pageYOffset);
		if(this.nmeDragObject != null) this.nmeDrag(point);
		var obj = this.nmeGetObjectUnderPoint(point);
		this._mouseX = point.x;
		this._mouseY = point.y;
		var stack = new Array();
		if(obj != null) obj.nmeGetInteractiveObjectStack(stack);
		if(stack.length > 0) {
			stack.reverse();
			var local = obj.globalToLocal(point);
			var evt = browser.events.MouseEvent.nmeCreate(type,event,local,obj);
			this.nmeCheckInOuts(evt,stack);
			if(type == browser.events.MouseEvent.MOUSE_DOWN) this.nmeCheckFocusInOuts(evt,stack);
			obj.nmeFireEvent(evt);
		} else {
			var evt = browser.events.MouseEvent.nmeCreate(type,event,point,null);
			this.nmeCheckInOuts(evt,stack);
			if(type == browser.events.MouseEvent.MOUSE_DOWN) this.nmeCheckFocusInOuts(evt,stack);
		}
	}
	,nmeOnKey: function(code,pressed,inChar,ctrl,alt,shift,keyLocation) {
		var event = new browser.events.KeyboardEvent(pressed?browser.events.KeyboardEvent.KEY_DOWN:browser.events.KeyboardEvent.KEY_UP,true,false,inChar,code,keyLocation,ctrl,alt,shift);
		this.dispatchEvent(event);
	}
	,nmeHandleOrientationChange: function() {
	}
	,nmeHandleAccelerometer: function(evt) {
		browser.display.Stage.nmeAcceleration.x = evt.accelerationIncludingGravity.x;
		browser.display.Stage.nmeAcceleration.y = evt.accelerationIncludingGravity.y;
		browser.display.Stage.nmeAcceleration.z = evt.accelerationIncludingGravity.z;
	}
	,toString: function() {
		return "[Stage id=" + this._nmeId + "]";
	}
	,nmeUpdateNextWake: function() {
		if(this.nmeFrameRate == 0) {
			var window = js.Lib.window;
			var nmeRequestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame;
			nmeRequestAnimationFrame($bind(this,this.nmeUpdateNextWake));
			this.nmeStageRender();
		} else {
			var window = js.Lib.window;
			window.clearInterval(this.nmeTimer);
			this.nmeTimer = window.setInterval($bind(this,this.nmeStageRender),this.nmeInterval,[]);
		}
	}
	,nmeStageRender: function(_) {
		if(!this.nmeStageActive) {
			this.nmeOnResize(this.nmeWindowWidth,this.nmeWindowHeight);
			var event = new browser.events.Event(browser.events.Event.ACTIVATE);
			event.target = this;
			this.nmeBroadcast(event);
			this.nmeStageActive = true;
		}
		var _g1 = 0, _g = this.nmeUIEventsQueueIndex;
		while(_g1 < _g) {
			var i = _g1++;
			if(this.nmeUIEventsQueue[i] != null) this.nmeProcessStageEvent(this.nmeUIEventsQueue[i]);
		}
		this.nmeUIEventsQueueIndex = 0;
		var event = new browser.events.Event(browser.events.Event.ENTER_FRAME);
		this.nmeBroadcast(event);
		if(this.nmeInvalid) {
			var event1 = new browser.events.Event(browser.events.Event.RENDER);
			this.nmeBroadcast(event1);
		}
		this.nmeRenderAll();
	}
	,nmeRenderAll: function() {
		this.nmeRender(null,null);
	}
	,nmeQueueStageEvent: function(evt) {
		this.nmeUIEventsQueue[this.nmeUIEventsQueueIndex++] = evt;
	}
	,nmeProcessStageEvent: function(evt) {
		evt.stopPropagation();
		switch(evt.type) {
		case "resize":
			this.nmeOnResize(browser.Lib.nmeGetWidth(),browser.Lib.nmeGetHeight());
			break;
		case "mousemove":
			this.nmeOnMouse(evt,browser.events.MouseEvent.MOUSE_MOVE);
			break;
		case "mousedown":
			this.nmeOnMouse(evt,browser.events.MouseEvent.MOUSE_DOWN);
			break;
		case "mouseup":
			this.nmeOnMouse(evt,browser.events.MouseEvent.MOUSE_UP);
			break;
		case "click":
			this.nmeOnMouse(evt,browser.events.MouseEvent.CLICK);
			break;
		case "mousewheel":
			this.nmeOnMouse(evt,browser.events.MouseEvent.MOUSE_WHEEL);
			break;
		case "dblclick":
			this.nmeOnMouse(evt,browser.events.MouseEvent.DOUBLE_CLICK);
			break;
		case "keydown":
			var evt1 = evt;
			var keyCode = evt1.keyCode != null?evt1.keyCode:evt1.which;
			keyCode = browser.ui.Keyboard.nmeConvertMozillaCode(keyCode);
			this.nmeOnKey(keyCode,true,evt1.charCode,evt1.ctrlKey,evt1.altKey,evt1.shiftKey,evt1.keyLocation);
			break;
		case "keyup":
			var evt1 = evt;
			var keyCode = evt1.keyCode != null?evt1.keyCode:evt1.which;
			keyCode = browser.ui.Keyboard.nmeConvertMozillaCode(keyCode);
			this.nmeOnKey(keyCode,false,evt1.charCode,evt1.ctrlKey,evt1.altKey,evt1.shiftKey,evt1.keyLocation);
			break;
		case "touchstart":
			var evt1 = evt;
			evt1.preventDefault();
			var touchInfo = new browser.display._Stage.TouchInfo();
			this.nmeTouchInfo[evt1.changedTouches[0].identifier] = touchInfo;
			this.nmeOnTouch(evt1,evt1.changedTouches[0],"touchBegin",touchInfo,false);
			break;
		case "touchmove":
			var evt1 = evt;
			var touchInfo = this.nmeTouchInfo[evt1.changedTouches[0].identifier];
			this.nmeOnTouch(evt1,evt1.changedTouches[0],"touchMove",touchInfo,true);
			break;
		case "touchend":
			var evt1 = evt;
			var touchInfo = this.nmeTouchInfo[evt1.changedTouches[0].identifier];
			this.nmeOnTouch(evt1,evt1.changedTouches[0],"touchEnd",touchInfo,true);
			this.nmeTouchInfo[evt1.changedTouches[0].identifier] = null;
			break;
		case "devicemotion":
			var evt1 = evt;
			this.nmeHandleAccelerometer(evt1);
			break;
		case "orientationchange":
			this.nmeHandleOrientationChange();
			break;
		default:
		}
	}
	,nmeIsOnStage: function() {
		return true;
	}
	,nmeDrag: function(point) {
		var p = this.nmeDragObject.parent;
		if(p != null) point = p.globalToLocal(point);
		var x = point.x + this.nmeDragOffsetX;
		var y = point.y + this.nmeDragOffsetY;
		if(this.nmeDragBounds != null) {
			if(x < this.nmeDragBounds.x) x = this.nmeDragBounds.x; else if(x > this.nmeDragBounds.get_right()) x = this.nmeDragBounds.get_right();
			if(y < this.nmeDragBounds.y) y = this.nmeDragBounds.y; else if(y > this.nmeDragBounds.get_bottom()) y = this.nmeDragBounds.get_bottom();
		}
		this.nmeDragObject.set_x(x);
		this.nmeDragObject.set_y(y);
	}
	,nmeCheckInOuts: function(event,stack,touchInfo) {
		var prev = touchInfo == null?this.nmeMouseOverObjects:touchInfo.touchOverObjects;
		var changeEvents = touchInfo == null?browser.display.Stage.nmeMouseChanges:browser.display.Stage.nmeTouchChanges;
		var new_n = stack.length;
		var new_obj = new_n > 0?stack[new_n - 1]:null;
		var old_n = prev.length;
		var old_obj = old_n > 0?prev[old_n - 1]:null;
		if(new_obj != old_obj) {
			if(old_obj != null) old_obj.nmeFireEvent(event.nmeCreateSimilar(changeEvents[0],new_obj,old_obj));
			if(new_obj != null) new_obj.nmeFireEvent(event.nmeCreateSimilar(changeEvents[1],old_obj,new_obj));
			var common = 0;
			while(common < new_n && common < old_n && stack[common] == prev[common]) common++;
			var rollOut = event.nmeCreateSimilar(changeEvents[2],new_obj,old_obj);
			var i = old_n - 1;
			while(i >= common) {
				prev[i].dispatchEvent(rollOut);
				i--;
			}
			var rollOver = event.nmeCreateSimilar(changeEvents[3],old_obj);
			var i1 = new_n - 1;
			while(i1 >= common) {
				stack[i1].dispatchEvent(rollOver);
				i1--;
			}
			if(touchInfo == null) this.nmeMouseOverObjects = stack; else touchInfo.touchOverObjects = stack;
		}
	}
	,nmeCheckFocusInOuts: function(event,inStack) {
		var new_n = inStack.length;
		var new_obj = new_n > 0?inStack[new_n - 1]:null;
		var old_n = this.nmeFocusOverObjects.length;
		var old_obj = old_n > 0?this.nmeFocusOverObjects[old_n - 1]:null;
		if(new_obj != old_obj) {
			var common = 0;
			while(common < new_n && common < old_n && inStack[common] == this.nmeFocusOverObjects[common]) common++;
			var focusOut = new browser.events.FocusEvent(browser.events.FocusEvent.FOCUS_OUT,false,false,new_obj,false,0);
			var i = old_n - 1;
			while(i >= common) {
				this.nmeFocusOverObjects[i].dispatchEvent(focusOut);
				i--;
			}
			var focusIn = new browser.events.FocusEvent(browser.events.FocusEvent.FOCUS_IN,false,false,old_obj,false,0);
			var i1 = new_n - 1;
			while(i1 >= common) {
				inStack[i1].dispatchEvent(focusIn);
				i1--;
			}
			this.nmeFocusOverObjects = inStack;
			this.set_focus(new_obj);
		}
	}
	,__class__: browser.display.Stage
	,__properties__: $extend(browser.display.DisplayObjectContainer.prototype.__properties__,{set_backgroundColor:"set_backgroundColor",get_backgroundColor:"get_backgroundColor",set_displayState:"set_displayState",get_displayState:"get_displayState",set_focus:"set_focus",get_focus:"get_focus",set_frameRate:"set_frameRate",get_frameRate:"get_frameRate",set_quality:"set_quality",get_quality:"get_quality",set_showDefaultContextMenu:"set_showDefaultContextMenu",get_showDefaultContextMenu:"get_showDefaultContextMenu",get_stageHeight:"get_stageHeight",get_stageWidth:"get_stageWidth"})
});
browser.display._Stage = {}
browser.display._Stage.TouchInfo = function() {
	this.touchOverObjects = [];
};
$hxClasses["browser.display._Stage.TouchInfo"] = browser.display._Stage.TouchInfo;
browser.display._Stage.TouchInfo.__name__ = ["browser","display","_Stage","TouchInfo"];
browser.display._Stage.TouchInfo.prototype = {
	__class__: browser.display._Stage.TouchInfo
}
browser.display.StageAlign = $hxClasses["browser.display.StageAlign"] = { __ename__ : true, __constructs__ : ["TOP_RIGHT","TOP_LEFT","TOP","RIGHT","LEFT","BOTTOM_RIGHT","BOTTOM_LEFT","BOTTOM"] }
browser.display.StageAlign.TOP_RIGHT = ["TOP_RIGHT",0];
browser.display.StageAlign.TOP_RIGHT.toString = $estr;
browser.display.StageAlign.TOP_RIGHT.__enum__ = browser.display.StageAlign;
browser.display.StageAlign.TOP_LEFT = ["TOP_LEFT",1];
browser.display.StageAlign.TOP_LEFT.toString = $estr;
browser.display.StageAlign.TOP_LEFT.__enum__ = browser.display.StageAlign;
browser.display.StageAlign.TOP = ["TOP",2];
browser.display.StageAlign.TOP.toString = $estr;
browser.display.StageAlign.TOP.__enum__ = browser.display.StageAlign;
browser.display.StageAlign.RIGHT = ["RIGHT",3];
browser.display.StageAlign.RIGHT.toString = $estr;
browser.display.StageAlign.RIGHT.__enum__ = browser.display.StageAlign;
browser.display.StageAlign.LEFT = ["LEFT",4];
browser.display.StageAlign.LEFT.toString = $estr;
browser.display.StageAlign.LEFT.__enum__ = browser.display.StageAlign;
browser.display.StageAlign.BOTTOM_RIGHT = ["BOTTOM_RIGHT",5];
browser.display.StageAlign.BOTTOM_RIGHT.toString = $estr;
browser.display.StageAlign.BOTTOM_RIGHT.__enum__ = browser.display.StageAlign;
browser.display.StageAlign.BOTTOM_LEFT = ["BOTTOM_LEFT",6];
browser.display.StageAlign.BOTTOM_LEFT.toString = $estr;
browser.display.StageAlign.BOTTOM_LEFT.__enum__ = browser.display.StageAlign;
browser.display.StageAlign.BOTTOM = ["BOTTOM",7];
browser.display.StageAlign.BOTTOM.toString = $estr;
browser.display.StageAlign.BOTTOM.__enum__ = browser.display.StageAlign;
browser.display.StageDisplayState = $hxClasses["browser.display.StageDisplayState"] = { __ename__ : true, __constructs__ : ["FULL_SCREEN","NORMAL"] }
browser.display.StageDisplayState.FULL_SCREEN = ["FULL_SCREEN",0];
browser.display.StageDisplayState.FULL_SCREEN.toString = $estr;
browser.display.StageDisplayState.FULL_SCREEN.__enum__ = browser.display.StageDisplayState;
browser.display.StageDisplayState.NORMAL = ["NORMAL",1];
browser.display.StageDisplayState.NORMAL.toString = $estr;
browser.display.StageDisplayState.NORMAL.__enum__ = browser.display.StageDisplayState;
browser.display.StageQuality = function() { }
$hxClasses["browser.display.StageQuality"] = browser.display.StageQuality;
browser.display.StageQuality.__name__ = ["browser","display","StageQuality"];
browser.display.StageScaleMode = $hxClasses["browser.display.StageScaleMode"] = { __ename__ : true, __constructs__ : ["SHOW_ALL","NO_SCALE","NO_BORDER","EXACT_FIT"] }
browser.display.StageScaleMode.SHOW_ALL = ["SHOW_ALL",0];
browser.display.StageScaleMode.SHOW_ALL.toString = $estr;
browser.display.StageScaleMode.SHOW_ALL.__enum__ = browser.display.StageScaleMode;
browser.display.StageScaleMode.NO_SCALE = ["NO_SCALE",1];
browser.display.StageScaleMode.NO_SCALE.toString = $estr;
browser.display.StageScaleMode.NO_SCALE.__enum__ = browser.display.StageScaleMode;
browser.display.StageScaleMode.NO_BORDER = ["NO_BORDER",2];
browser.display.StageScaleMode.NO_BORDER.toString = $estr;
browser.display.StageScaleMode.NO_BORDER.__enum__ = browser.display.StageScaleMode;
browser.display.StageScaleMode.EXACT_FIT = ["EXACT_FIT",3];
browser.display.StageScaleMode.EXACT_FIT.toString = $estr;
browser.display.StageScaleMode.EXACT_FIT.__enum__ = browser.display.StageScaleMode;
browser.display.Tilesheet = function(image) {
	this.nmeBitmap = image;
	this.nmeCenterPoints = new Array();
	this.nmeTileRects = new Array();
};
$hxClasses["browser.display.Tilesheet"] = browser.display.Tilesheet;
browser.display.Tilesheet.__name__ = ["browser","display","Tilesheet"];
browser.display.Tilesheet.prototype = {
	addTileRect: function(rectangle,centerPoint) {
		this.nmeTileRects.push(rectangle);
		if(centerPoint == null) centerPoint = new browser.geom.Point();
		this.nmeCenterPoints.push(centerPoint);
	}
	,__class__: browser.display.Tilesheet
}
browser.events.Listener = function(inListener,inUseCapture,inPriority) {
	this.mListner = inListener;
	this.mUseCapture = inUseCapture;
	this.mPriority = inPriority;
	this.mID = browser.events.Listener.sIDs++;
};
$hxClasses["browser.events.Listener"] = browser.events.Listener;
browser.events.Listener.__name__ = ["browser","events","Listener"];
browser.events.Listener.prototype = {
	Is: function(inListener,inCapture) {
		return Reflect.compareMethods(this.mListner,inListener) && this.mUseCapture == inCapture;
	}
	,dispatchEvent: function(event) {
		this.mListner(event);
	}
	,__class__: browser.events.Listener
}
browser.events.EventPhase = function() { }
$hxClasses["browser.events.EventPhase"] = browser.events.EventPhase;
browser.events.EventPhase.__name__ = ["browser","events","EventPhase"];
browser.events.FocusEvent = function(type,bubbles,cancelable,inObject,inShiftKey,inKeyCode) {
	if(inKeyCode == null) inKeyCode = 0;
	if(inShiftKey == null) inShiftKey = false;
	if(cancelable == null) cancelable = false;
	if(bubbles == null) bubbles = false;
	browser.events.Event.call(this,type,bubbles,cancelable);
	this.keyCode = inKeyCode;
	this.shiftKey = inShiftKey == null?false:inShiftKey;
	this.target = inObject;
};
$hxClasses["browser.events.FocusEvent"] = browser.events.FocusEvent;
browser.events.FocusEvent.__name__ = ["browser","events","FocusEvent"];
browser.events.FocusEvent.__super__ = browser.events.Event;
browser.events.FocusEvent.prototype = $extend(browser.events.Event.prototype,{
	__class__: browser.events.FocusEvent
});
browser.events.HTTPStatusEvent = function(type,bubbles,cancelable,status) {
	if(status == null) status = 0;
	if(cancelable == null) cancelable = false;
	if(bubbles == null) bubbles = false;
	this.status = status;
	browser.events.Event.call(this,type,bubbles,cancelable);
};
$hxClasses["browser.events.HTTPStatusEvent"] = browser.events.HTTPStatusEvent;
browser.events.HTTPStatusEvent.__name__ = ["browser","events","HTTPStatusEvent"];
browser.events.HTTPStatusEvent.__super__ = browser.events.Event;
browser.events.HTTPStatusEvent.prototype = $extend(browser.events.Event.prototype,{
	__class__: browser.events.HTTPStatusEvent
});
browser.events.IOErrorEvent = function(type,bubbles,cancelable,inText) {
	if(inText == null) inText = "";
	if(cancelable == null) cancelable = false;
	if(bubbles == null) bubbles = false;
	browser.events.Event.call(this,type,bubbles,cancelable);
	this.text = inText;
};
$hxClasses["browser.events.IOErrorEvent"] = browser.events.IOErrorEvent;
browser.events.IOErrorEvent.__name__ = ["browser","events","IOErrorEvent"];
browser.events.IOErrorEvent.__super__ = browser.events.Event;
browser.events.IOErrorEvent.prototype = $extend(browser.events.Event.prototype,{
	__class__: browser.events.IOErrorEvent
});
browser.events.KeyboardEvent = function(type,bubbles,cancelable,inCharCode,inKeyCode,inKeyLocation,inCtrlKey,inAltKey,inShiftKey) {
	if(inShiftKey == null) inShiftKey = false;
	if(inAltKey == null) inAltKey = false;
	if(inCtrlKey == null) inCtrlKey = false;
	if(inKeyLocation == null) inKeyLocation = 0;
	if(inKeyCode == null) inKeyCode = 0;
	if(inCharCode == null) inCharCode = 0;
	if(cancelable == null) cancelable = false;
	if(bubbles == null) bubbles = false;
	browser.events.Event.call(this,type,bubbles,cancelable);
	this.keyCode = inKeyCode;
	this.keyLocation = inKeyLocation == null?0:inKeyLocation;
	this.charCode = inCharCode == null?0:inCharCode;
	this.shiftKey = inShiftKey == null?false:inShiftKey;
	this.altKey = inAltKey == null?false:inAltKey;
	this.ctrlKey = inCtrlKey == null?false:inCtrlKey;
};
$hxClasses["browser.events.KeyboardEvent"] = browser.events.KeyboardEvent;
browser.events.KeyboardEvent.__name__ = ["browser","events","KeyboardEvent"];
browser.events.KeyboardEvent.__super__ = browser.events.Event;
browser.events.KeyboardEvent.prototype = $extend(browser.events.Event.prototype,{
	__class__: browser.events.KeyboardEvent
});
browser.events.ProgressEvent = function(type,bubbles,cancelable,bytesLoaded,bytesTotal) {
	if(bytesTotal == null) bytesTotal = 0;
	if(bytesLoaded == null) bytesLoaded = 0;
	if(cancelable == null) cancelable = false;
	if(bubbles == null) bubbles = false;
	browser.events.Event.call(this,type,bubbles,cancelable);
	this.bytesLoaded = bytesLoaded;
	this.bytesTotal = bytesTotal;
};
$hxClasses["browser.events.ProgressEvent"] = browser.events.ProgressEvent;
browser.events.ProgressEvent.__name__ = ["browser","events","ProgressEvent"];
browser.events.ProgressEvent.__super__ = browser.events.Event;
browser.events.ProgressEvent.prototype = $extend(browser.events.Event.prototype,{
	__class__: browser.events.ProgressEvent
});
browser.events.TouchEvent = function(type,bubbles,cancelable,localX,localY,relatedObject,ctrlKey,altKey,shiftKey,buttonDown,delta,commandKey,clickCount) {
	if(clickCount == null) clickCount = 0;
	if(commandKey == null) commandKey = false;
	if(delta == null) delta = 0;
	if(buttonDown == null) buttonDown = false;
	if(shiftKey == null) shiftKey = false;
	if(altKey == null) altKey = false;
	if(ctrlKey == null) ctrlKey = false;
	if(localY == null) localY = 0;
	if(localX == null) localX = 0;
	if(cancelable == null) cancelable = false;
	if(bubbles == null) bubbles = true;
	browser.events.Event.call(this,type,bubbles,cancelable);
	this.shiftKey = shiftKey;
	this.altKey = altKey;
	this.ctrlKey = ctrlKey;
	this.bubbles = bubbles;
	this.relatedObject = relatedObject;
	this.delta = delta;
	this.localX = localX;
	this.localY = localY;
	this.buttonDown = buttonDown;
	this.commandKey = commandKey;
	this.touchPointID = 0;
	this.isPrimaryTouchPoint = true;
};
$hxClasses["browser.events.TouchEvent"] = browser.events.TouchEvent;
browser.events.TouchEvent.__name__ = ["browser","events","TouchEvent"];
browser.events.TouchEvent.nmeCreate = function(type,event,touch,local,target) {
	var evt = new browser.events.TouchEvent(type,true,false,local.x,local.y,null,event.ctrlKey,event.altKey,event.shiftKey,false,0,null,0);
	evt.stageX = browser.Lib.get_current().get_stage().get_mouseX();
	evt.stageY = browser.Lib.get_current().get_stage().get_mouseY();
	evt.target = target;
	return evt;
}
browser.events.TouchEvent.__super__ = browser.events.Event;
browser.events.TouchEvent.prototype = $extend(browser.events.Event.prototype,{
	nmeCreateSimilar: function(type,related,targ) {
		var result = new browser.events.TouchEvent(type,this.bubbles,this.cancelable,this.localX,this.localY,related == null?this.relatedObject:related,this.ctrlKey,this.altKey,this.shiftKey,this.buttonDown,this.delta,this.commandKey);
		result.touchPointID = this.touchPointID;
		result.isPrimaryTouchPoint = this.isPrimaryTouchPoint;
		if(targ != null) result.target = targ;
		return result;
	}
	,__class__: browser.events.TouchEvent
});
browser.filters = {}
browser.filters.BitmapFilter = function(inType) {
	this._mType = inType;
};
$hxClasses["browser.filters.BitmapFilter"] = browser.filters.BitmapFilter;
browser.filters.BitmapFilter.__name__ = ["browser","filters","BitmapFilter"];
browser.filters.BitmapFilter.prototype = {
	nmeApplyFilter: function(surface,refreshCache) {
		if(refreshCache == null) refreshCache = false;
	}
	,clone: function() {
		throw "Implement in subclass. BitmapFilter::clone";
		return null;
	}
	,__class__: browser.filters.BitmapFilter
}
browser.filters.DropShadowFilter = function(in_distance,in_angle,in_color,in_alpha,in_blurX,in_blurY,in_strength,in_quality,in_inner,in_knockout,in_hideObject) {
	if(in_hideObject == null) in_hideObject = false;
	if(in_knockout == null) in_knockout = false;
	if(in_inner == null) in_inner = false;
	if(in_quality == null) in_quality = 1;
	if(in_strength == null) in_strength = 1.0;
	if(in_blurY == null) in_blurY = 4.0;
	if(in_blurX == null) in_blurX = 4.0;
	if(in_alpha == null) in_alpha = 1.0;
	if(in_color == null) in_color = 0;
	if(in_angle == null) in_angle = 45.0;
	if(in_distance == null) in_distance = 4.0;
	browser.filters.BitmapFilter.call(this,"DropShadowFilter");
	this.distance = in_distance;
	this.angle = in_angle;
	this.color = in_color;
	this.alpha = in_alpha;
	this.blurX = in_blurX;
	this.blurY = in_blurX;
	this.strength = in_strength;
	this.quality = in_quality;
	this.inner = in_inner;
	this.knockout = in_knockout;
	this.hideObject = in_hideObject;
	this._nmeCached = false;
};
$hxClasses["browser.filters.DropShadowFilter"] = browser.filters.DropShadowFilter;
browser.filters.DropShadowFilter.__name__ = ["browser","filters","DropShadowFilter"];
browser.filters.DropShadowFilter.__super__ = browser.filters.BitmapFilter;
browser.filters.DropShadowFilter.prototype = $extend(browser.filters.BitmapFilter.prototype,{
	nmeApplyFilter: function(surface,refreshCache) {
		if(refreshCache == null) refreshCache = false;
		if(!this._nmeCached || refreshCache) {
			var distanceX = this.distance * Math.sin(2 * Math.PI * this.angle / 360.0);
			var distanceY = this.distance * Math.cos(2 * Math.PI * this.angle / 360.0);
			var blurRadius = Math.max(this.blurX,this.blurY);
			var context = surface.getContext("2d");
			context.shadowOffsetX = distanceX;
			context.shadowOffsetY = distanceY;
			context.shadowBlur = blurRadius;
			context.shadowColor = "#" + StringTools.hex(this.color,6);
			this._nmeCached = true;
		}
	}
	,clone: function() {
		return new browser.filters.DropShadowFilter(this.distance,this.angle,this.color,this.alpha,this.blurX,this.blurY,this.strength,this.quality,this.inner,this.knockout,this.hideObject);
	}
	,__class__: browser.filters.DropShadowFilter
});
browser.geom = {}
browser.geom.ColorTransform = function(inRedMultiplier,inGreenMultiplier,inBlueMultiplier,inAlphaMultiplier,inRedOffset,inGreenOffset,inBlueOffset,inAlphaOffset) {
	if(inAlphaOffset == null) inAlphaOffset = 0;
	if(inBlueOffset == null) inBlueOffset = 0;
	if(inGreenOffset == null) inGreenOffset = 0;
	if(inRedOffset == null) inRedOffset = 0;
	if(inAlphaMultiplier == null) inAlphaMultiplier = 1;
	if(inBlueMultiplier == null) inBlueMultiplier = 1;
	if(inGreenMultiplier == null) inGreenMultiplier = 1;
	if(inRedMultiplier == null) inRedMultiplier = 1;
	this.redMultiplier = inRedMultiplier == null?1.0:inRedMultiplier;
	this.greenMultiplier = inGreenMultiplier == null?1.0:inGreenMultiplier;
	this.blueMultiplier = inBlueMultiplier == null?1.0:inBlueMultiplier;
	this.alphaMultiplier = inAlphaMultiplier == null?1.0:inAlphaMultiplier;
	this.redOffset = inRedOffset == null?0.0:inRedOffset;
	this.greenOffset = inGreenOffset == null?0.0:inGreenOffset;
	this.blueOffset = inBlueOffset == null?0.0:inBlueOffset;
	this.alphaOffset = inAlphaOffset == null?0.0:inAlphaOffset;
};
$hxClasses["browser.geom.ColorTransform"] = browser.geom.ColorTransform;
browser.geom.ColorTransform.__name__ = ["browser","geom","ColorTransform"];
browser.geom.ColorTransform.prototype = {
	set_color: function(value) {
		this.redOffset = value >> 16 & 255;
		this.greenOffset = value >> 8 & 255;
		this.blueOffset = value & 255;
		this.redMultiplier = 0;
		this.greenMultiplier = 0;
		this.blueMultiplier = 0;
		return this.get_color();
	}
	,get_color: function() {
		return (this.redOffset | 0) << 16 | (this.greenOffset | 0) << 8 | (this.blueOffset | 0);
	}
	,__class__: browser.geom.ColorTransform
	,__properties__: {set_color:"set_color",get_color:"get_color"}
}
browser.geom.Matrix = function(in_a,in_b,in_c,in_d,in_tx,in_ty) {
	if(in_ty == null) in_ty = 0;
	if(in_tx == null) in_tx = 0;
	if(in_d == null) in_d = 1;
	if(in_c == null) in_c = 0;
	if(in_b == null) in_b = 0;
	if(in_a == null) in_a = 1;
	this.a = in_a;
	this.b = in_b;
	this.c = in_c;
	this.d = in_d;
	this.set_tx(in_tx);
	this.set_ty(in_ty);
	this._sx = 1.0;
	this._sy = 1.0;
};
$hxClasses["browser.geom.Matrix"] = browser.geom.Matrix;
browser.geom.Matrix.__name__ = ["browser","geom","Matrix"];
browser.geom.Matrix.prototype = {
	set_ty: function(inValue) {
		this.ty = inValue;
		return this.ty;
	}
	,set_tx: function(inValue) {
		this.tx = inValue;
		return this.tx;
	}
	,translate: function(inDX,inDY) {
		var m = new browser.geom.Matrix();
		m.set_tx(inDX);
		m.set_ty(inDY);
		this.concat(m);
	}
	,transformPoint: function(inPos) {
		return new browser.geom.Point(inPos.x * this.a + inPos.y * this.c + this.tx,inPos.x * this.b + inPos.y * this.d + this.ty);
	}
	,scale: function(inSX,inSY) {
		this._sx = inSX;
		this._sy = inSY;
		this.a *= inSX;
		this.b *= inSY;
		this.c *= inSX;
		this.d *= inSY;
		var _g = this;
		_g.set_tx(_g.tx * inSX);
		var _g = this;
		_g.set_ty(_g.ty * inSY);
		this.a = Math.round(this.a * 1000) / 1000;
		this.b = Math.round(this.b * 1000) / 1000;
		this.c = Math.round(this.c * 1000) / 1000;
		this.d = Math.round(this.d * 1000) / 1000;
		this.set_tx(Math.round(this.tx * 10) / 10);
		this.set_ty(Math.round(this.ty * 10) / 10);
	}
	,rotate: function(inTheta) {
		var cos = Math.cos(inTheta);
		var sin = Math.sin(inTheta);
		var a1 = this.a * cos - this.b * sin;
		this.b = this.a * sin + this.b * cos;
		this.a = a1;
		var c1 = this.c * cos - this.d * sin;
		this.d = this.c * sin + this.d * cos;
		this.c = c1;
		var tx1 = this.tx * cos - this.ty * sin;
		this.set_ty(this.tx * sin + this.ty * cos);
		this.set_tx(tx1);
		this.a = Math.round(this.a * 1000) / 1000;
		this.b = Math.round(this.b * 1000) / 1000;
		this.c = Math.round(this.c * 1000) / 1000;
		this.d = Math.round(this.d * 1000) / 1000;
		this.set_tx(Math.round(this.tx * 10) / 10);
		this.set_ty(Math.round(this.ty * 10) / 10);
	}
	,nmeTranslateTransformed: function(inPos) {
		this.set_tx(inPos.x * this.a + inPos.y * this.c + this.tx);
		this.set_ty(inPos.x * this.b + inPos.y * this.d + this.ty);
		this.a = Math.round(this.a * 1000) / 1000;
		this.b = Math.round(this.b * 1000) / 1000;
		this.c = Math.round(this.c * 1000) / 1000;
		this.d = Math.round(this.d * 1000) / 1000;
		this.set_tx(Math.round(this.tx * 10) / 10);
		this.set_ty(Math.round(this.ty * 10) / 10);
	}
	,mult: function(m) {
		var result = this.clone();
		result.concat(m);
		return result;
	}
	,invert: function() {
		var norm = this.a * this.d - this.b * this.c;
		if(norm == 0) {
			this.a = this.b = this.c = this.d = 0;
			this.set_tx(-this.tx);
			this.set_ty(-this.ty);
		} else {
			norm = 1.0 / norm;
			var a1 = this.d * norm;
			this.d = this.a * norm;
			this.a = a1;
			this.b *= -norm;
			this.c *= -norm;
			var tx1 = -this.a * this.tx - this.c * this.ty;
			this.set_ty(-this.b * this.tx - this.d * this.ty);
			this.set_tx(tx1);
		}
		this._sx /= this._sx;
		this._sy /= this._sy;
		this.a = Math.round(this.a * 1000) / 1000;
		this.b = Math.round(this.b * 1000) / 1000;
		this.c = Math.round(this.c * 1000) / 1000;
		this.d = Math.round(this.d * 1000) / 1000;
		this.set_tx(Math.round(this.tx * 10) / 10);
		this.set_ty(Math.round(this.ty * 10) / 10);
		return this;
	}
	,identity: function() {
		this.a = 1;
		this.b = 0;
		this.c = 0;
		this.d = 1;
		this.set_tx(0);
		this.set_ty(0);
		this._sx = 1.0;
		this._sy = 1.0;
	}
	,copy: function(m) {
		this.a = m.a;
		this.b = m.b;
		this.c = m.c;
		this.d = m.d;
		this.set_tx(m.tx);
		this.set_ty(m.ty);
		this._sx = m._sx;
		this._sy = m._sy;
	}
	,concat: function(m) {
		var a1 = this.a * m.a + this.b * m.c;
		this.b = this.a * m.b + this.b * m.d;
		this.a = a1;
		var c1 = this.c * m.a + this.d * m.c;
		this.d = this.c * m.b + this.d * m.d;
		this.c = c1;
		var tx1 = this.tx * m.a + this.ty * m.c + m.tx;
		this.set_ty(this.tx * m.b + this.ty * m.d + m.ty);
		this.set_tx(tx1);
		this._sx *= m._sx;
		this._sy *= m._sy;
		this.a = Math.round(this.a * 1000) / 1000;
		this.b = Math.round(this.b * 1000) / 1000;
		this.c = Math.round(this.c * 1000) / 1000;
		this.d = Math.round(this.d * 1000) / 1000;
		this.set_tx(Math.round(this.tx * 10) / 10);
		this.set_ty(Math.round(this.ty * 10) / 10);
	}
	,clone: function() {
		var m = new browser.geom.Matrix(this.a,this.b,this.c,this.d,this.tx,this.ty);
		m._sx = this._sx;
		m._sy = this._sy;
		return m;
	}
	,__class__: browser.geom.Matrix
	,__properties__: {set_tx:"set_tx",set_ty:"set_ty"}
}
browser.geom.Point = function(inX,inY) {
	if(inY == null) inY = 0;
	if(inX == null) inX = 0;
	this.x = inX;
	this.y = inY;
};
$hxClasses["browser.geom.Point"] = browser.geom.Point;
browser.geom.Point.__name__ = ["browser","geom","Point"];
browser.geom.Point.prototype = {
	get_length: function() {
		return Math.sqrt(this.x * this.x + this.y * this.y);
	}
	,normalize: function(thickness) {
		if(this.x == 0 && this.y == 0) this.x = thickness; else {
			var norm = thickness / Math.sqrt(this.x * this.x + this.y * this.y);
			this.x *= norm;
			this.y *= norm;
		}
	}
	,clone: function() {
		return new browser.geom.Point(this.x,this.y);
	}
	,__class__: browser.geom.Point
}
browser.geom.Rectangle = function(inX,inY,inWidth,inHeight) {
	if(inHeight == null) inHeight = 0;
	if(inWidth == null) inWidth = 0;
	if(inY == null) inY = 0;
	if(inX == null) inX = 0;
	this.x = inX;
	this.y = inY;
	this.width = inWidth;
	this.height = inHeight;
};
$hxClasses["browser.geom.Rectangle"] = browser.geom.Rectangle;
browser.geom.Rectangle.__name__ = ["browser","geom","Rectangle"];
browser.geom.Rectangle.prototype = {
	set_topLeft: function(p) {
		this.x = p.x;
		this.y = p.y;
		return p.clone();
	}
	,get_topLeft: function() {
		return new browser.geom.Point(this.x,this.y);
	}
	,set_top: function(t) {
		this.height -= t - this.y;
		this.y = t;
		return t;
	}
	,get_top: function() {
		return this.y;
	}
	,set_size: function(p) {
		this.width = p.x;
		this.height = p.y;
		return p.clone();
	}
	,get_size: function() {
		return new browser.geom.Point(this.width,this.height);
	}
	,set_right: function(r) {
		this.width = r - this.x;
		return r;
	}
	,get_right: function() {
		return this.x + this.width;
	}
	,set_left: function(l) {
		this.width -= l - this.x;
		this.x = l;
		return l;
	}
	,get_left: function() {
		return this.x;
	}
	,set_bottomRight: function(p) {
		this.width = p.x - this.x;
		this.height = p.y - this.y;
		return p.clone();
	}
	,get_bottomRight: function() {
		return new browser.geom.Point(this.x + this.width,this.y + this.height);
	}
	,set_bottom: function(b) {
		this.height = b - this.y;
		return b;
	}
	,get_bottom: function() {
		return this.y + this.height;
	}
	,transform: function(m) {
		var tx0 = m.a * this.x + m.c * this.y;
		var tx1 = tx0;
		var ty0 = m.b * this.x + m.d * this.y;
		var ty1 = tx0;
		var tx = m.a * (this.x + this.width) + m.c * this.y;
		var ty = m.b * (this.x + this.width) + m.d * this.y;
		if(tx < tx0) tx0 = tx;
		if(ty < ty0) ty0 = ty;
		if(tx > tx1) tx1 = tx;
		if(ty > ty1) ty1 = ty;
		tx = m.a * (this.x + this.width) + m.c * (this.y + this.height);
		ty = m.b * (this.x + this.width) + m.d * (this.y + this.height);
		if(tx < tx0) tx0 = tx;
		if(ty < ty0) ty0 = ty;
		if(tx > tx1) tx1 = tx;
		if(ty > ty1) ty1 = ty;
		tx = m.a * this.x + m.c * (this.y + this.height);
		ty = m.b * this.x + m.d * (this.y + this.height);
		if(tx < tx0) tx0 = tx;
		if(ty < ty0) ty0 = ty;
		if(tx > tx1) tx1 = tx;
		if(ty > ty1) ty1 = ty;
		return new browser.geom.Rectangle(tx0 + m.tx,ty0 + m.ty,tx1 - tx0,ty1 - ty0);
	}
	,intersects: function(toIntersect) {
		var x0 = this.x < toIntersect.x?toIntersect.x:this.x;
		var x1 = this.get_right() > toIntersect.get_right()?toIntersect.get_right():this.get_right();
		if(x1 <= x0) return false;
		var y0 = this.y < toIntersect.y?toIntersect.y:this.y;
		var y1 = this.get_bottom() > toIntersect.get_bottom()?toIntersect.get_bottom():this.get_bottom();
		return y1 > y0;
	}
	,extendBounds: function(r) {
		var dx = this.x - r.x;
		if(dx > 0) {
			this.x -= dx;
			this.width += dx;
		}
		var dy = this.y - r.y;
		if(dy > 0) {
			this.y -= dy;
			this.height += dy;
		}
		if(r.get_right() > this.get_right()) this.set_right(r.get_right());
		if(r.get_bottom() > this.get_bottom()) this.set_bottom(r.get_bottom());
	}
	,contains: function(inX,inY) {
		return inX >= this.x && inY >= this.y && inX < this.get_right() && inY < this.get_bottom();
	}
	,clone: function() {
		return new browser.geom.Rectangle(this.x,this.y,this.width,this.height);
	}
	,__class__: browser.geom.Rectangle
	,__properties__: {set_bottom:"set_bottom",get_bottom:"get_bottom",set_right:"set_right",get_right:"get_right",set_topLeft:"set_topLeft",get_topLeft:"get_topLeft"}
}
browser.geom.Transform = function(displayObject) {
	if(displayObject == null) throw "Cannot create Transform with no DisplayObject.";
	this._displayObject = displayObject;
	this._matrix = new browser.geom.Matrix();
	this._fullMatrix = new browser.geom.Matrix();
	this.set_colorTransform(new browser.geom.ColorTransform());
};
$hxClasses["browser.geom.Transform"] = browser.geom.Transform;
browser.geom.Transform.__name__ = ["browser","geom","Transform"];
browser.geom.Transform.prototype = {
	get_pixelBounds: function() {
		return this._displayObject.getBounds(null);
	}
	,set_matrix: function(inValue) {
		this._matrix.copy(inValue);
		this._displayObject.nmeMatrixOverridden();
		return this._matrix;
	}
	,get_matrix: function() {
		return this._matrix.clone();
	}
	,set_colorTransform: function(inValue) {
		this.colorTransform = inValue;
		return inValue;
	}
	,nmeSetFullMatrix: function(inValue) {
		this._fullMatrix.copy(inValue);
		return this._fullMatrix;
	}
	,nmeGetFullMatrix: function(localMatrix) {
		var m;
		if(localMatrix != null) m = localMatrix.mult(this._fullMatrix); else m = this._fullMatrix.clone();
		return m;
	}
	,__class__: browser.geom.Transform
	,__properties__: {set_colorTransform:"set_colorTransform",set_matrix:"set_matrix",get_matrix:"get_matrix"}
}
browser.media = {}
browser.media.SoundChannel = function() { }
$hxClasses["browser.media.SoundChannel"] = browser.media.SoundChannel;
browser.media.SoundChannel.__name__ = ["browser","media","SoundChannel"];
browser.media.SoundChannel.__super__ = browser.events.EventDispatcher;
browser.media.SoundChannel.prototype = $extend(browser.events.EventDispatcher.prototype,{
	set_soundTransform: function(v) {
		this.nmeAudio.volume = v.volume;
		return this.soundTransform = v;
	}
	,__class__: browser.media.SoundChannel
	,__properties__: {set_soundTransform:"set_soundTransform"}
});
browser.media.SoundTransform = function(vol,panning) {
	if(panning == null) panning = 0;
	if(vol == null) vol = 1;
};
$hxClasses["browser.media.SoundTransform"] = browser.media.SoundTransform;
browser.media.SoundTransform.__name__ = ["browser","media","SoundTransform"];
browser.media.SoundTransform.prototype = {
	__class__: browser.media.SoundTransform
}
browser.net = {}
browser.net.URLLoader = function() { }
$hxClasses["browser.net.URLLoader"] = browser.net.URLLoader;
browser.net.URLLoader.__name__ = ["browser","net","URLLoader"];
browser.net.URLLoader.__super__ = browser.events.EventDispatcher;
browser.net.URLLoader.prototype = $extend(browser.events.EventDispatcher.prototype,{
	onStatus: function(status) {
		var evt = new browser.events.HTTPStatusEvent(browser.events.HTTPStatusEvent.HTTP_STATUS,false,false,status);
		evt.currentTarget = this;
		this.dispatchEvent(evt);
	}
	,onProgress: function(event) {
		var evt = new browser.events.ProgressEvent(browser.events.ProgressEvent.PROGRESS);
		evt.currentTarget = this;
		evt.bytesLoaded = event.loaded;
		evt.bytesTotal = event.total;
		this.dispatchEvent(evt);
	}
	,onOpen: function() {
		var evt = new browser.events.Event(browser.events.Event.OPEN);
		evt.currentTarget = this;
		this.dispatchEvent(evt);
	}
	,onError: function(msg) {
		var evt = new browser.events.IOErrorEvent(browser.events.IOErrorEvent.IO_ERROR);
		evt.text = msg;
		evt.currentTarget = this;
		this.dispatchEvent(evt);
	}
	,onData: function(_) {
		var content = this.getData();
		switch( (this.dataFormat)[1] ) {
		case 0:
			this.data = browser.utils.ByteArray.nmeOfBuffer(content);
			break;
		default:
			this.data = Std.string(content);
		}
		var evt = new browser.events.Event(browser.events.Event.COMPLETE);
		evt.currentTarget = this;
		this.dispatchEvent(evt);
	}
	,requestUrl: function(url,method,data,requestHeaders) {
		var xmlHttpRequest = new XMLHttpRequest();
		this.registerEvents(xmlHttpRequest);
		var uri = "";
		if(js.Boot.__instanceof(data,browser.utils.ByteArray)) {
			var data1 = data;
			switch( (this.dataFormat)[1] ) {
			case 0:
				uri = data1.data.buffer;
				break;
			default:
				uri = data1.readUTFBytes(data1.length);
			}
		} else if(js.Boot.__instanceof(data,browser.net.URLVariables)) {
			var data1 = data;
			var _g = 0, _g1 = Reflect.fields(data1);
			while(_g < _g1.length) {
				var p = _g1[_g];
				++_g;
				if(uri.length != 0) uri += "&";
				uri += StringTools.urlEncode(p) + "=" + StringTools.urlEncode(Reflect.field(data1,p));
			}
		} else if(data != null) uri = data.toString();
		try {
			if(method == "GET" && uri != null && uri != "") {
				var question = url.split("?").length <= 1;
				xmlHttpRequest.open(method,url + (question?"?":"&") + Std.string(uri),true);
				uri = "";
			} else xmlHttpRequest.open(method,url,true);
		} catch( e ) {
			this.onError(e.toString());
			return;
		}
		switch( (this.dataFormat)[1] ) {
		case 0:
			xmlHttpRequest.responseType = "arraybuffer";
			break;
		default:
		}
		var _g = 0;
		while(_g < requestHeaders.length) {
			var header = requestHeaders[_g];
			++_g;
			xmlHttpRequest.setRequestHeader(header.name,header.value);
		}
		xmlHttpRequest.send(uri);
		this.onOpen();
		this.getData = function() {
			if(xmlHttpRequest.response != null) return xmlHttpRequest.response; else return xmlHttpRequest.responseText;
		};
	}
	,registerEvents: function(subject) {
		var self = this;
		if(typeof XMLHttpRequestProgressEvent != "undefined") subject.addEventListener("progress",$bind(this,this.onProgress),false);
		subject.onreadystatechange = function() {
			if(subject.readyState != 4) return;
			var s = (function($this) {
				var $r;
				try {
					$r = subject.status;
				} catch( e ) {
					$r = null;
				}
				return $r;
			}(this));
			if(s == undefined) s = null;
			if(s != null) self.onStatus(s);
			if(s != null && s >= 200 && s < 400) self.onData(subject.response); else if(s == null) self.onError("Failed to connect or resolve host"); else if(s == 12029) self.onError("Failed to connect to host"); else if(s == 12007) self.onError("Unknown host"); else self.onError("Http Error #" + subject.status);
		};
	}
	,load: function(request) {
		switch( (this.dataFormat)[1] ) {
		case 0:
			request.requestHeaders.push(new browser.net.URLRequestHeader("Content-Type","application/octet-stream"));
			break;
		default:
			if(request.method != "GET") request.requestHeaders.push(new browser.net.URLRequestHeader("Content-Type","application/x-www-form-urlencoded"));
		}
		this.requestUrl(request.url,request.method,request.data,request.requestHeaders);
	}
	,getData: function() {
		return null;
	}
	,__class__: browser.net.URLLoader
});
browser.net.URLLoaderDataFormat = $hxClasses["browser.net.URLLoaderDataFormat"] = { __ename__ : true, __constructs__ : ["BINARY","TEXT","VARIABLES"] }
browser.net.URLLoaderDataFormat.BINARY = ["BINARY",0];
browser.net.URLLoaderDataFormat.BINARY.toString = $estr;
browser.net.URLLoaderDataFormat.BINARY.__enum__ = browser.net.URLLoaderDataFormat;
browser.net.URLLoaderDataFormat.TEXT = ["TEXT",1];
browser.net.URLLoaderDataFormat.TEXT.toString = $estr;
browser.net.URLLoaderDataFormat.TEXT.__enum__ = browser.net.URLLoaderDataFormat;
browser.net.URLLoaderDataFormat.VARIABLES = ["VARIABLES",2];
browser.net.URLLoaderDataFormat.VARIABLES.toString = $estr;
browser.net.URLLoaderDataFormat.VARIABLES.__enum__ = browser.net.URLLoaderDataFormat;
browser.net.URLRequest = function(inURL) {
	if(inURL != null) this.url = inURL;
	this.requestHeaders = [];
	this.method = browser.net.URLRequestMethod.GET;
	this.contentType = "application/x-www-form-urlencoded";
};
$hxClasses["browser.net.URLRequest"] = browser.net.URLRequest;
browser.net.URLRequest.__name__ = ["browser","net","URLRequest"];
browser.net.URLRequest.prototype = {
	__class__: browser.net.URLRequest
}
browser.net.URLRequestHeader = function(name,value) {
	if(value == null) value = "";
	if(name == null) name = "";
	this.name = name;
	this.value = value;
};
$hxClasses["browser.net.URLRequestHeader"] = browser.net.URLRequestHeader;
browser.net.URLRequestHeader.__name__ = ["browser","net","URLRequestHeader"];
browser.net.URLRequestHeader.prototype = {
	__class__: browser.net.URLRequestHeader
}
browser.net.URLRequestMethod = function() { }
$hxClasses["browser.net.URLRequestMethod"] = browser.net.URLRequestMethod;
browser.net.URLRequestMethod.__name__ = ["browser","net","URLRequestMethod"];
browser.net.URLVariables = function(inEncoded) {
	if(inEncoded != null) this.decode(inEncoded);
};
$hxClasses["browser.net.URLVariables"] = browser.net.URLVariables;
browser.net.URLVariables.__name__ = ["browser","net","URLVariables"];
browser.net.URLVariables.prototype = {
	decode: function(inVars) {
		var fields = Reflect.fields(this);
		var _g = 0;
		while(_g < fields.length) {
			var f = fields[_g];
			++_g;
			Reflect.deleteField(this,f);
		}
		var fields1 = inVars.split(";").join("&").split("&");
		var _g = 0;
		while(_g < fields1.length) {
			var f = fields1[_g];
			++_g;
			var eq = f.indexOf("=");
			if(eq > 0) this[StringTools.urlDecode(HxOverrides.substr(f,0,eq))] = StringTools.urlDecode(HxOverrides.substr(f,eq + 1,null)); else if(eq != 0) this[StringTools.urlDecode(f)] = "";
		}
	}
	,__class__: browser.net.URLVariables
}
browser.system = {}
browser.system.System = function() { }
$hxClasses["browser.system.System"] = browser.system.System;
browser.system.System.__name__ = ["browser","system","System"];
browser.system.System.__properties__ = {get_totalMemory:"get_totalMemory"}
browser.system.System.get_totalMemory = function() {
	return 0;
}
browser.system.System.get_vmVersion = function() {
	return "nme - tip";
}
browser.text.TextField = function() {
	browser.display.InteractiveObject.call(this);
	this.mWidth = 100;
	this.mHeight = 20;
	this.mHTMLMode = false;
	this.multiline = false;
	this.nmeGraphics = new browser.display.Graphics();
	this.mFace = browser.text.TextField.mDefaultFont;
	this.mAlign = browser.text.TextFormatAlign.LEFT;
	this.mParagraphs = new Array();
	this.mSelStart = -1;
	this.mSelEnd = -1;
	this.mScrollH = 0;
	this.mScrollV = 1;
	this.mType = browser.text.TextFieldType.DYNAMIC;
	this.set_autoSize("NONE");
	this.mTextHeight = 12;
	this.mMaxHeight = this.mTextHeight;
	this.mHTMLText = " ";
	this.mText = " ";
	this.mTextColour = 0;
	this.tabEnabled = false;
	this.mTryFreeType = true;
	this.selectable = true;
	this.mInsertPos = 0;
	this.nmeInputEnabled = false;
	this.mDownChar = 0;
	this.mSelectDrag = -1;
	this.mLineInfo = [];
	this.set_defaultTextFormat(new browser.text.TextFormat());
	this.set_borderColor(0);
	this.set_border(false);
	this.set_backgroundColor(16777215);
	this.set_background(false);
};
$hxClasses["browser.text.TextField"] = browser.text.TextField;
browser.text.TextField.__name__ = ["browser","text","TextField"];
browser.text.TextField.__super__ = browser.display.InteractiveObject;
browser.text.TextField.prototype = $extend(browser.display.InteractiveObject.prototype,{
	set_wordWrap: function(inWordWrap) {
		this.wordWrap = inWordWrap;
		this.Rebuild();
		return this.wordWrap;
	}
	,set_width: function(inValue) {
		if(this.parent != null) this.parent.nmeInvalidateBounds();
		if(this.get__boundsInvalid()) this.validateBounds();
		if(inValue != this.mWidth) {
			this.mWidth = inValue;
			this.Rebuild();
		}
		return this.mWidth;
	}
	,get_width: function() {
		return this.getBounds(this.get_stage()).width;
	}
	,set_type: function(inType) {
		this.mType = inType;
		this.nmeInputEnabled = this.mType == browser.text.TextFieldType.INPUT;
		if(this.mHTMLMode) {
			if(this.nmeInputEnabled) browser.Lib.nmeSetContentEditable(this.nmeGraphics.nmeSurface,true); else browser.Lib.nmeSetContentEditable(this.nmeGraphics.nmeSurface,false);
		} else if(this.nmeInputEnabled) {
			this.set_htmlText(StringTools.replace(this.mText,"\n","<BR />"));
			browser.Lib.nmeSetContentEditable(this.nmeGraphics.nmeSurface,true);
		}
		this.tabEnabled = this.get_type() == browser.text.TextFieldType.INPUT;
		this.Rebuild();
		return inType;
	}
	,get_type: function() {
		return this.mType;
	}
	,get_textHeight: function() {
		return this.mMaxHeight;
	}
	,get_textWidth: function() {
		return this.mMaxWidth;
	}
	,set_textColor: function(inCol) {
		this.mTextColour = inCol;
		this.RebuildText();
		return inCol;
	}
	,get_textColor: function() {
		return this.mTextColour;
	}
	,set_text: function(inText) {
		this.mText = inText;
		this.mHTMLMode = false;
		this.RebuildText();
		this._nmeRenderFlags |= 64;
		if(this.parent != null) this.parent._nmeRenderFlags |= 64;
		return this.mText;
	}
	,get_text: function() {
		if(this.mHTMLMode) this.ConvertHTMLToText(false);
		return this.mText;
	}
	,set_htmlText: function(inHTMLText) {
		this.mParagraphs = new Array();
		this.mHTMLText = inHTMLText;
		if(!this.mHTMLMode) {
			var wrapper = js.Lib.document.createElement("div");
			wrapper.innerHTML = inHTMLText;
			var destination = new browser.display.Graphics(wrapper);
			var nmeSurface = this.nmeGraphics.nmeSurface;
			if(browser.Lib.nmeIsOnStage(nmeSurface)) {
				browser.Lib.nmeAppendSurface(wrapper);
				browser.Lib.nmeCopyStyle(nmeSurface,wrapper);
				browser.Lib.nmeSwapSurface(nmeSurface,wrapper);
				browser.Lib.nmeRemoveSurface(nmeSurface);
			}
			this.nmeGraphics = destination;
			this.nmeGraphics.nmeExtent.width = wrapper.width;
			this.nmeGraphics.nmeExtent.height = wrapper.height;
		} else this.nmeGraphics.nmeSurface.innerHTML = inHTMLText;
		this.mHTMLMode = true;
		this.RebuildText();
		this._nmeRenderFlags |= 64;
		if(this.parent != null) this.parent._nmeRenderFlags |= 64;
		return this.mHTMLText;
	}
	,get_htmlText: function() {
		return this.mHTMLText;
	}
	,set_height: function(inValue) {
		if(this.parent != null) this.parent.nmeInvalidateBounds();
		if(this.get__boundsInvalid()) this.validateBounds();
		if(inValue != this.mHeight) {
			this.mHeight = inValue;
			this.Rebuild();
		}
		return this.mHeight;
	}
	,get_height: function() {
		return this.getBounds(this.get_stage()).height;
	}
	,set_defaultTextFormat: function(inFmt) {
		this.setTextFormat(inFmt);
		this._defaultTextFormat = inFmt;
		return inFmt;
	}
	,get_defaultTextFormat: function() {
		return this._defaultTextFormat;
	}
	,get_caretPos: function() {
		return this.mInsertPos;
	}
	,set_borderColor: function(inBorderCol) {
		this.borderColor = inBorderCol;
		this.Rebuild();
		return inBorderCol;
	}
	,set_border: function(inBorder) {
		this.border = inBorder;
		this.Rebuild();
		return inBorder;
	}
	,set_backgroundColor: function(inCol) {
		this.backgroundColor = inCol;
		this.Rebuild();
		return inCol;
	}
	,set_background: function(inBack) {
		this.background = inBack;
		this.Rebuild();
		return inBack;
	}
	,set_autoSize: function(inAutoSize) {
		this.autoSize = inAutoSize;
		this.Rebuild();
		return inAutoSize;
	}
	,toString: function() {
		return "[TextField name=" + this.name + " id=" + this._nmeId + "]";
	}
	,setTextFormat: function(inFmt,beginIndex,endIndex) {
		if(endIndex == null) endIndex = 0;
		if(beginIndex == null) beginIndex = 0;
		if(inFmt.font != null) this.mFace = inFmt.font;
		if(inFmt.size != null) this.mTextHeight = inFmt.size | 0;
		if(inFmt.align != null) this.mAlign = inFmt.align;
		if(inFmt.color != null) this.mTextColour = inFmt.color;
		this.RebuildText();
		this._nmeRenderFlags |= 64;
		if(this.parent != null) this.parent._nmeRenderFlags |= 64;
		return this.getTextFormat();
	}
	,RenderRow: function(inRow,inY,inCharIdx,inAlign,inInsert) {
		if(inInsert == null) inInsert = 0;
		var h = 0;
		var w = 0;
		var _g = 0;
		while(_g < inRow.length) {
			var chr = inRow[_g];
			++_g;
			if(chr.fh > h) h = chr.fh;
			w += chr.adv;
		}
		if(w > this.mMaxWidth) this.mMaxWidth = w;
		var full_height = h * 1.2 | 0;
		var align_x = 0;
		var insert_x = 0;
		if(inInsert != null) {
			if(this.autoSize != "NONE") {
				this.mScrollH = 0;
				insert_x = inInsert;
			} else {
				insert_x = inInsert - this.mScrollH;
				if(insert_x < 0) this.mScrollH -= (this.mLimitRenderX * 3 >> 2) - insert_x; else if(insert_x > this.mLimitRenderX) this.mScrollH += insert_x - (this.mLimitRenderX * 3 >> 2);
				if(this.mScrollH < 0) this.mScrollH = 0;
			}
		}
		if(this.autoSize == "NONE" && w <= this.mLimitRenderX) {
			if(inAlign == browser.text.TextFormatAlign.CENTER) align_x = this.mLimitRenderX - w >> 1; else if(inAlign == browser.text.TextFormatAlign.RIGHT) align_x = this.mLimitRenderX - w;
		}
		var x_list = new Array();
		this.mLineInfo.push({ mY0 : inY, mIndex : inCharIdx - 1, mX : x_list});
		var cache_sel_font = null;
		var cache_normal_font = null;
		var x = align_x - this.mScrollH;
		var x0 = x;
		var _g = 0;
		while(_g < inRow.length) {
			var chr = inRow[_g];
			++_g;
			var adv = chr.adv;
			if(x + adv > this.mLimitRenderX) break;
			x_list.push(x);
			if(x >= 0) {
				var font = chr.font;
				if(chr.sel) {
					this.nmeGraphics.lineStyle();
					this.nmeGraphics.beginFill(2105440);
					this.nmeGraphics.drawRect(x,inY,adv,full_height);
					this.nmeGraphics.endFill();
					if(cache_normal_font == chr.font) font = cache_sel_font; else {
						font = browser.text.FontInstance.CreateSolid(chr.font.GetFace(),chr.fh,16777215,1.0);
						cache_sel_font = font;
						cache_normal_font = chr.font;
					}
				}
				font.RenderChar(this.nmeGraphics,chr.chr,x,inY + (h - chr.fh) | 0);
			}
			x += adv;
		}
		x += this.mScrollH;
		return full_height;
	}
	,RebuildText: function() {
		this.mParagraphs = [];
		if(!this.mHTMLMode) {
			var font = browser.text.FontInstance.CreateSolid(this.mFace,this.mTextHeight,this.mTextColour,1.0);
			var paras = this.mText.split("\n");
			var _g = 0;
			while(_g < paras.length) {
				var paragraph = paras[_g];
				++_g;
				this.mParagraphs.push({ align : this.mAlign, spans : [{ font : font, text : paragraph + "\n"}]});
			}
		}
		this.Rebuild();
	}
	,Rebuild: function() {
		if(this.mHTMLMode) return;
		this.mLineInfo = [];
		this.nmeGraphics.clear();
		if(this.background) {
			this.nmeGraphics.beginFill(this.backgroundColor);
			this.nmeGraphics.drawRect(-2,-2,this.get_width() + 4,this.get_height() + 4);
			this.nmeGraphics.endFill();
		}
		this.nmeGraphics.lineStyle(this.mTextColour);
		var insert_x = null;
		this.mMaxWidth = 0;
		var wrap = this.mLimitRenderX = this.wordWrap && !this.nmeInputEnabled?this.mWidth | 0:999999;
		var char_idx = 0;
		var h = 0;
		var s0 = this.mSelStart;
		var s1 = this.mSelEnd;
		var _g = 0, _g1 = this.mParagraphs;
		while(_g < _g1.length) {
			var paragraph = _g1[_g];
			++_g;
			var row = [];
			var row_width = 0;
			var last_word_break = 0;
			var last_word_break_width = 0;
			var last_word_char_idx = 0;
			var start_idx = char_idx;
			var tx = 0;
			var _g2 = 0, _g3 = paragraph.spans;
			while(_g2 < _g3.length) {
				var span = _g3[_g2];
				++_g2;
				var text = span.text;
				var font = span.font;
				var fh = font.get_height();
				last_word_break = row.length;
				last_word_break_width = row_width;
				last_word_char_idx = char_idx;
				var _g5 = 0, _g4 = text.length;
				while(_g5 < _g4) {
					var ch = _g5++;
					var g = HxOverrides.cca(text,ch);
					var adv = font.nmeGetAdvance(g);
					if(g == 32) {
						last_word_break = row.length;
						last_word_break_width = tx;
						last_word_char_idx = char_idx;
					}
					if(tx + adv > wrap) {
						if(last_word_break > 0) {
							var row_end = row.splice(last_word_break,row.length - last_word_break);
							h += this.RenderRow(row,h,start_idx,paragraph.align);
							row = row_end;
							tx -= last_word_break_width;
							start_idx = last_word_char_idx;
							last_word_break = 0;
							last_word_break_width = 0;
							last_word_char_idx = 0;
							if(row_end.length > 0 && row_end[0].chr == 32) {
								row_end.shift();
								start_idx++;
							}
						} else {
							h += this.RenderRow(row,h,char_idx,paragraph.align);
							row = [];
							tx = 0;
							start_idx = char_idx;
						}
					}
					row.push({ font : font, chr : g, x : tx, fh : fh, sel : char_idx >= s0 && char_idx < s1, adv : adv});
					tx += adv;
					char_idx++;
				}
			}
			if(row.length > 0) {
				h += this.RenderRow(row,h,start_idx,paragraph.align,insert_x);
				insert_x = null;
			}
		}
		var w = this.mMaxWidth;
		if(h < this.mTextHeight) h = this.mTextHeight;
		this.mMaxHeight = h;
		switch(this.autoSize) {
		case "LEFT":
			break;
		case "RIGHT":
			var x0 = this.get_x() + this.get_width();
			this.set_x(this.mWidth - x0);
			break;
		case "CENTER":
			var x0 = this.get_x() + this.get_width() / 2;
			this.set_x(this.mWidth / 2 - x0);
			break;
		default:
			if(this.wordWrap) this.set_height(h);
		}
		if(this.border) {
			this.nmeGraphics.endFill();
			this.nmeGraphics.lineStyle(1,this.borderColor);
			this.nmeGraphics.drawRect(-2,-2,this.get_width() + 4,this.get_height() + 4);
		}
	}
	,nmeRender: function(inMask,clipRect) {
		if(!this.nmeCombinedVisible) return;
		if((this._nmeRenderFlags & 4) != 0 || (this._nmeRenderFlags & 8) != 0) this.nmeValidateMatrix();
		if(this.nmeGraphics.nmeRender(inMask,this.nmeFilters,1,1)) {
			this._nmeRenderFlags |= 64;
			if(this.parent != null) this.parent._nmeRenderFlags |= 64;
			this.nmeApplyFilters(this.nmeGraphics.nmeSurface);
			this._nmeRenderFlags |= 32;
		}
		if(!this.mHTMLMode && inMask != null) {
			var m = this.getSurfaceTransform(this.nmeGraphics);
			browser.Lib.nmeDrawToSurface(this.nmeGraphics.nmeSurface,inMask,m,(this.parent != null?this.parent.nmeCombinedAlpha:1) * this.alpha,clipRect);
		} else {
			if((this._nmeRenderFlags & 32) != 0) {
				var m = this.getSurfaceTransform(this.nmeGraphics);
				browser.Lib.nmeSetSurfaceTransform(this.nmeGraphics.nmeSurface,m);
				this._nmeRenderFlags &= -33;
			}
			browser.Lib.nmeSetSurfaceOpacity(this.nmeGraphics.nmeSurface,(this.parent != null?this.parent.nmeCombinedAlpha:1) * this.alpha);
		}
	}
	,nmeGetObjectUnderPoint: function(point) {
		if(!this.get_visible()) return null; else if(this.mText.length > 1) {
			var local = this.globalToLocal(point);
			if(local.x < 0 || local.y < 0 || local.x > this.mMaxWidth || local.y > this.mMaxHeight) return null; else return this;
		} else return browser.display.InteractiveObject.prototype.nmeGetObjectUnderPoint.call(this,point);
	}
	,nmeGetGraphics: function() {
		return this.nmeGraphics;
	}
	,getTextFormat: function(beginIndex,endIndex) {
		if(endIndex == null) endIndex = 0;
		if(beginIndex == null) beginIndex = 0;
		return new browser.text.TextFormat();
	}
	,ConvertHTMLToText: function(inUnSetHTML) {
		this.mText = "";
		var _g = 0, _g1 = this.mParagraphs;
		while(_g < _g1.length) {
			var paragraph = _g1[_g];
			++_g;
			var _g2 = 0, _g3 = paragraph.spans;
			while(_g2 < _g3.length) {
				var span = _g3[_g2];
				++_g2;
				this.mText += span.text;
			}
		}
		if(inUnSetHTML) {
			this.mHTMLMode = false;
			this.RebuildText();
		}
	}
	,__class__: browser.text.TextField
	,__properties__: $extend(browser.display.InteractiveObject.prototype.__properties__,{set_autoSize:"set_autoSize",set_background:"set_background",set_backgroundColor:"set_backgroundColor",set_border:"set_border",set_borderColor:"set_borderColor",set_defaultTextFormat:"set_defaultTextFormat",get_defaultTextFormat:"get_defaultTextFormat",set_text:"set_text",get_text:"get_text",get_textHeight:"get_textHeight",get_textWidth:"get_textWidth",set_type:"set_type",get_type:"get_type",set_wordWrap:"set_wordWrap"})
});
browser.text.FontInstanceMode = $hxClasses["browser.text.FontInstanceMode"] = { __ename__ : true, __constructs__ : ["fimSolid"] }
browser.text.FontInstanceMode.fimSolid = ["fimSolid",0];
browser.text.FontInstanceMode.fimSolid.toString = $estr;
browser.text.FontInstanceMode.fimSolid.__enum__ = browser.text.FontInstanceMode;
browser.text.FontInstance = function(inFont,inHeight) {
	this.mFont = inFont;
	this.mHeight = inHeight;
	this.mTryFreeType = true;
	this.mGlyphs = [];
	this.mCacheAsBitmap = false;
};
$hxClasses["browser.text.FontInstance"] = browser.text.FontInstance;
browser.text.FontInstance.__name__ = ["browser","text","FontInstance"];
browser.text.FontInstance.CreateSolid = function(inFace,inHeight,inColour,inAlpha) {
	var id = "SOLID:" + inFace + ":" + inHeight + ":" + inColour + ":" + inAlpha;
	var f = browser.text.FontInstance.mSolidFonts.get(id);
	if(f != null) return f;
	var font = new browser.text.Font();
	font.nmeSetScale(inHeight);
	font.set_fontName(inFace);
	if(font == null) return null;
	f = new browser.text.FontInstance(font,inHeight);
	f.SetSolid(inColour,inAlpha);
	browser.text.FontInstance.mSolidFonts.set(id,f);
	return f;
}
browser.text.FontInstance.prototype = {
	get_height: function() {
		return this.mHeight;
	}
	,RenderChar: function(inGraphics,inGlyph,inX,inY) {
		inGraphics.nmeClearLine();
		inGraphics.beginFill(this.mColour,this.mAlpha);
		this.mFont.nmeRender(inGraphics,inGlyph,inX,inY,this.mTryFreeType);
		inGraphics.endFill();
	}
	,SetSolid: function(inCol,inAlpha) {
		this.mColour = inCol;
		this.mAlpha = inAlpha;
		this.mMode = browser.text.FontInstanceMode.fimSolid;
	}
	,nmeGetAdvance: function(inChar) {
		if(this.mFont == null) return 0;
		return this.mFont.nmeGetAdvance(inChar,this.mHeight);
	}
	,GetFace: function() {
		return this.mFont.fontName;
	}
	,__class__: browser.text.FontInstance
	,__properties__: {get_height:"get_height"}
}
browser.text.TextFieldAutoSize = function() {
};
$hxClasses["browser.text.TextFieldAutoSize"] = browser.text.TextFieldAutoSize;
browser.text.TextFieldAutoSize.__name__ = ["browser","text","TextFieldAutoSize"];
browser.text.TextFieldAutoSize.prototype = {
	__class__: browser.text.TextFieldAutoSize
}
browser.text.TextFieldType = function() {
};
$hxClasses["browser.text.TextFieldType"] = browser.text.TextFieldType;
browser.text.TextFieldType.__name__ = ["browser","text","TextFieldType"];
browser.text.TextFieldType.prototype = {
	__class__: browser.text.TextFieldType
}
browser.text.TextFormat = function(in_font,in_size,in_color,in_bold,in_italic,in_underline,in_url,in_target,in_align,in_leftMargin,in_rightMargin,in_indent,in_leading) {
	this.font = in_font;
	this.size = in_size;
	this.color = in_color;
	this.bold = in_bold;
	this.italic = in_italic;
	this.underline = in_underline;
	this.url = in_url;
	this.target = in_target;
	this.align = in_align;
	this.leftMargin = in_leftMargin;
	this.rightMargin = in_rightMargin;
	this.indent = in_indent;
	this.leading = in_leading;
};
$hxClasses["browser.text.TextFormat"] = browser.text.TextFormat;
browser.text.TextFormat.__name__ = ["browser","text","TextFormat"];
browser.text.TextFormat.prototype = {
	__class__: browser.text.TextFormat
}
browser.text.TextFormatAlign = $hxClasses["browser.text.TextFormatAlign"] = { __ename__ : true, __constructs__ : ["LEFT","RIGHT","JUSTIFY","CENTER"] }
browser.text.TextFormatAlign.LEFT = ["LEFT",0];
browser.text.TextFormatAlign.LEFT.toString = $estr;
browser.text.TextFormatAlign.LEFT.__enum__ = browser.text.TextFormatAlign;
browser.text.TextFormatAlign.RIGHT = ["RIGHT",1];
browser.text.TextFormatAlign.RIGHT.toString = $estr;
browser.text.TextFormatAlign.RIGHT.__enum__ = browser.text.TextFormatAlign;
browser.text.TextFormatAlign.JUSTIFY = ["JUSTIFY",2];
browser.text.TextFormatAlign.JUSTIFY.toString = $estr;
browser.text.TextFormatAlign.JUSTIFY.__enum__ = browser.text.TextFormatAlign;
browser.text.TextFormatAlign.CENTER = ["CENTER",3];
browser.text.TextFormatAlign.CENTER.toString = $estr;
browser.text.TextFormatAlign.CENTER.__enum__ = browser.text.TextFormatAlign;
browser.ui = {}
browser.ui.Keyboard = function() { }
$hxClasses["browser.ui.Keyboard"] = browser.ui.Keyboard;
browser.ui.Keyboard.__name__ = ["browser","ui","Keyboard"];
browser.ui.Keyboard.nmeConvertMozillaCode = function(code) {
	switch(code) {
	case 8:
		return 8;
	case 9:
		return 9;
	case 13:
		return 13;
	case 14:
		return 13;
	case 16:
		return 16;
	case 17:
		return 17;
	case 20:
		return 18;
	case 27:
		return 27;
	case 32:
		return 32;
	case 33:
		return 33;
	case 34:
		return 34;
	case 35:
		return 35;
	case 36:
		return 36;
	case 37:
		return 37;
	case 39:
		return 39;
	case 38:
		return 38;
	case 40:
		return 40;
	case 45:
		return 45;
	case 46:
		return 46;
	case 144:
		return 144;
	default:
		return code;
	}
}
browser.utils = {}
browser.utils.ByteArray = function() {
	this.littleEndian = false;
	this.allocated = 0;
	this.position = 0;
	this.length = 0;
	this._nmeResizeBuffer(this.allocated);
};
$hxClasses["browser.utils.ByteArray"] = browser.utils.ByteArray;
browser.utils.ByteArray.__name__ = ["browser","utils","ByteArray"];
browser.utils.ByteArray.nmeOfBuffer = function(buffer) {
	var bytes = new browser.utils.ByteArray();
	bytes.set_length(bytes.allocated = buffer.byteLength);
	bytes.data = new DataView(buffer);
	bytes.byteView = new Uint8Array(buffer);
	return bytes;
}
browser.utils.ByteArray.prototype = {
	set_length: function(value) {
		if(this.allocated < value) this._nmeResizeBuffer(this.allocated = Math.max(value,this.allocated * 2) | 0); else if(this.allocated > value) this._nmeResizeBuffer(this.allocated = value);
		this.length = value;
		return value;
	}
	,readUTFBytes: function(len) {
		var value = "";
		var max = this.position + len;
		while(this.position < max) {
			var c = this.data.getUint8(this.position++);
			if(c < 128) {
				if(c == 0) break;
				value += String.fromCharCode(c);
			} else if(c < 224) value += String.fromCharCode((c & 63) << 6 | this.data.getUint8(this.position++) & 127); else if(c < 240) {
				var c2 = this.data.getUint8(this.position++);
				value += String.fromCharCode((c & 31) << 12 | (c2 & 127) << 6 | this.data.getUint8(this.position++) & 127);
			} else {
				var c2 = this.data.getUint8(this.position++);
				var c3 = this.data.getUint8(this.position++);
				value += String.fromCharCode((c & 15) << 18 | (c2 & 127) << 12 | c3 << 6 & 127 | this.data.getUint8(this.position++) & 127);
			}
		}
		return value;
	}
	,_nmeResizeBuffer: function(len) {
		var oldByteView = this.byteView;
		var newByteView = new Uint8Array(len);
		if(oldByteView != null) {
			if(oldByteView.length <= len) newByteView.set(oldByteView); else newByteView.set(oldByteView.subarray(0,len));
		}
		this.byteView = newByteView;
		this.data = new DataView(newByteView.buffer);
	}
	,__class__: browser.utils.ByteArray
	,__properties__: {set_length:"set_length"}
}
browser.utils.Endian = function() { }
$hxClasses["browser.utils.Endian"] = browser.utils.Endian;
browser.utils.Endian.__name__ = ["browser","utils","Endian"];
browser.utils.Uuid = function() { }
$hxClasses["browser.utils.Uuid"] = browser.utils.Uuid;
browser.utils.Uuid.__name__ = ["browser","utils","Uuid"];
browser.utils.Uuid.random = function(size) {
	if(size == null) size = 32;
	var nchars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ".length;
	var uid = new StringBuf();
	var _g = 0;
	while(_g < size) {
		var i = _g++;
		uid.b += Std.string("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ".charAt(Math.random() * nchars | 0));
	}
	return uid.b;
}
browser.utils.Uuid.uuid = function() {
	return browser.utils.Uuid.random(8) + "-" + browser.utils.Uuid.random(4) + "-" + browser.utils.Uuid.random(4) + "-" + browser.utils.Uuid.random(4) + "-" + browser.utils.Uuid.random(12);
}
com.haxepunk.Tweener = function() {
	this.active = true;
	this.autoClear = false;
};
$hxClasses["com.haxepunk.Tweener"] = com.haxepunk.Tweener;
com.haxepunk.Tweener.__name__ = ["com","haxepunk","Tweener"];
com.haxepunk.Tweener.prototype = {
	getTween: function() {
		return this._tween != null;
	}
	,updateTweens: function() {
		var t, ft = this._tween;
		while(ft != null) {
			t = js.Boot.__cast(ft , com.haxepunk.Tween);
			if(t.active) {
				t.update();
				if(ft._finish) ft.finish();
			}
			ft = ft._next;
		}
	}
	,clearTweens: function() {
		var t, ft = this._tween;
		var fn;
		while(ft != null) {
			fn = ft._next;
			this.removeTween(js.Boot.__cast(ft , com.haxepunk.Tween));
			ft = fn;
		}
	}
	,removeTween: function(t) {
		var ft = t;
		if(ft._parent != this) throw "Core object does not contain Tween.";
		if(ft._next != null) ft._next._prev = ft._prev;
		if(ft._prev != null) ft._prev._next = ft._next; else this._tween = ft._next == null?null:js.Boot.__cast(ft._next , com.haxepunk.Tween);
		ft._next = ft._prev = null;
		ft._parent = null;
		t.active = false;
		return t;
	}
	,update: function() {
	}
	,__class__: com.haxepunk.Tweener
	,__properties__: {get_hasTween:"getTween"}
}
com.haxepunk.Entity = function(x,y,graphic,mask) {
	if(y == null) y = 0;
	if(x == null) x = 0;
	com.haxepunk.Tweener.call(this);
	this.visible = true;
	this.collidable = true;
	this.x = x;
	this.y = y;
	this.originX = this.originY = 0;
	this.width = this.height = 0;
	this._moveX = this._moveY = 0;
	this._type = "";
	this._name = "";
	this.HITBOX = new com.haxepunk.Mask();
	this._point = com.haxepunk.HXP.point;
	this._camera = com.haxepunk.HXP.point2;
	if(graphic != null) this.setGraphic(graphic);
	if(mask != null) this.setMask(mask);
	this.HITBOX.assignTo(this);
	this._class = Type.getClassName(Type.getClass(this));
	this.setLayer(10);
};
$hxClasses["com.haxepunk.Entity"] = com.haxepunk.Entity;
com.haxepunk.Entity.__name__ = ["com","haxepunk","Entity"];
com.haxepunk.Entity.__super__ = com.haxepunk.Tweener;
com.haxepunk.Entity.prototype = $extend(com.haxepunk.Tweener.prototype,{
	setName: function(value) {
		if(this._name == value) return this._name;
		if(this._world == null) {
			this._name = value;
			return this._name;
		}
		if(this._name != "") this._world.unregisterName(this);
		this._name = value;
		if(value != "") this._world.registerName(this);
		return this._name;
	}
	,setGraphic: function(value) {
		if(this._graphic == value) return value;
		this._graphic = value;
		if(value != null && value.assign != null) value.assign();
		return this._graphic;
	}
	,setMask: function(value) {
		if(this._mask == value) return value;
		if(this._mask != null) this._mask.assignTo(null);
		this._mask = value;
		if(value != null) this._mask.assignTo(this);
		return this._mask;
	}
	,setType: function(value) {
		if(this._type == value) return this._type;
		if(this._world == null) {
			this._type = value;
			return this._type;
		}
		if(this._type != "") this._world.removeType(this);
		this._type = value;
		if(value != "") this._world.addType(this);
		return this._type;
	}
	,setLayer: function(value) {
		if(this._layer == value) return this._layer;
		if(value < 0) console.log("Negative layers may not work properly if you aren't using flash");
		if(this._world == null) {
			this._layer = value;
			return this._layer;
		}
		this._world.removeRender(this);
		this._layer = value;
		this._world.addRender(this);
		return this._layer;
	}
	,collideRect: function(x,y,rX,rY,rWidth,rHeight) {
		if(x - this.originX + this.width >= rX && y - this.originY + this.height >= rY && x - this.originX <= rX + rWidth && y - this.originY <= rY + rHeight) {
			if(this._mask == null) return true;
			this._x = this.x;
			this._y = this.y;
			this.x = x;
			this.y = y;
			com.haxepunk.HXP.entity.x = rX;
			com.haxepunk.HXP.entity.y = rY;
			com.haxepunk.HXP.entity.width = rWidth | 0;
			com.haxepunk.HXP.entity.height = rHeight | 0;
			if(this._mask.collide(com.haxepunk.HXP.entity.HITBOX)) {
				this.x = this._x;
				this.y = this._y;
				return true;
			}
			this.x = this._x;
			this.y = this._y;
			return false;
		}
		return false;
	}
	,collideTypes: function(types,x,y) {
		if(this._world == null) return null;
		if(js.Boot.__instanceof(types,String)) return this.collide(types,x,y); else {
			var a = types;
			if(a != null) {
				var e;
				var _g = 0;
				while(_g < a.length) {
					var type = a[_g];
					++_g;
					e = this.collide(type,x,y);
					if(e != null) return e;
				}
			}
		}
		return null;
	}
	,collide: function(type,x,y) {
		if(this._world == null) return null;
		var e, fe = this._world._typeFirst.get(type);
		if(!this.collidable || fe == null) return null;
		this._x = this.x;
		this._y = this.y;
		this.x = x;
		this.y = y;
		if(this._mask == null) {
			while(fe != null) {
				e = js.Boot.__cast(fe , com.haxepunk.Entity);
				if(e.collidable && e != this && x - this.originX + this.width > e.x - e.originX && y - this.originY + this.height > e.y - e.originY && x - this.originX < e.x - e.originX + e.width && y - this.originY < e.y - e.originY + e.height) {
					if(e._mask == null || e._mask.collide(this.HITBOX)) {
						this.x = this._x;
						this.y = this._y;
						return e;
					}
				}
				fe = fe._typeNext;
			}
			this.x = this._x;
			this.y = this._y;
			return null;
		}
		while(fe != null) {
			e = js.Boot.__cast(fe , com.haxepunk.Entity);
			if(e.collidable && e != this && x - this.originX + this.width > e.x - e.originX && y - this.originY + this.height > e.y - e.originY && x - this.originX < e.x - e.originX + e.width && y - this.originY < e.y - e.originY + e.height) {
				if(this._mask.collide(e._mask != null?e._mask:e.HITBOX)) {
					this.x = this._x;
					this.y = this._y;
					return e;
				}
			}
			fe = fe._typeNext;
		}
		this.x = this._x;
		this.y = this._y;
		return null;
	}
	,render: function() {
		if(this._graphic != null && this._graphic.visible) {
			if(this._graphic.relative) {
				this._point.x = this.x;
				this._point.y = this.y;
			} else this._point.x = this._point.y = 0;
			this._camera.x = this._world == null?com.haxepunk.HXP.camera.x:this._world.camera.x;
			this._camera.y = this._world == null?com.haxepunk.HXP.camera.y:this._world.camera.y;
			this._graphic.render(this.renderTarget != null?this.renderTarget:com.haxepunk.HXP.buffer,this._point,this._camera,this._layer);
		}
	}
	,update: function() {
	}
	,removed: function() {
	}
	,added: function() {
	}
	,__class__: com.haxepunk.Entity
	,__properties__: $extend(com.haxepunk.Tweener.prototype.__properties__,{set_layer:"setLayer",get_layer:"getLayer",set_type:"setType",get_type:"getType",set_mask:"setMask",get_mask:"getMask",set_graphic:"setGraphic",get_graphic:"getGraphic"})
});
com.haxepunk.Graphic = function() {
	this.active = false;
	this.visible = true;
	this.x = this.y = 0;
	this.scrollX = this.scrollY = 1;
	this.relative = true;
	this._scroll = true;
	this._point = new browser.geom.Point();
};
$hxClasses["com.haxepunk.Graphic"] = com.haxepunk.Graphic;
com.haxepunk.Graphic.__name__ = ["com","haxepunk","Graphic"];
com.haxepunk.Graphic.prototype = {
	render: function(target,point,camera,layer) {
		if(layer == null) layer = 10;
	}
	,update: function() {
	}
	,__class__: com.haxepunk.Graphic
}
com.haxepunk.World = function() {
	com.haxepunk.Tweener.call(this);
	this.visible = true;
	this.camera = new browser.geom.Point();
	this._count = 0;
	this._layerList = new Array();
	this._layerCount = new Array();
	this._renderFirst = new IntHash();
	this._renderLast = new IntHash();
	this._typeFirst = new Hash();
	this._add = new Array();
	this._remove = new Array();
	this._recycle = new Array();
	this._classCount = new Hash();
	this._typeCount = new Hash();
	this._recycled = new Hash();
	this._entityNames = new Hash();
};
$hxClasses["com.haxepunk.World"] = com.haxepunk.World;
com.haxepunk.World.__name__ = ["com","haxepunk","World"];
com.haxepunk.World.__super__ = com.haxepunk.Tweener;
com.haxepunk.World.prototype = $extend(com.haxepunk.Tweener.prototype,{
	unregisterName: function(e) {
		var fe = e;
		this._entityNames.remove(fe._name);
	}
	,registerName: function(e) {
		var fe = e;
		this._entityNames.set(fe._name,e);
	}
	,removeType: function(e) {
		var fe = e;
		if(this._typeFirst.get(fe._type) == e) this._typeFirst.set(fe._type,fe._typeNext);
		if(fe._typeNext != null) fe._typeNext._typePrev = fe._typePrev;
		if(fe._typePrev != null) fe._typePrev._typeNext = fe._typeNext;
		fe._typeNext = fe._typePrev = null;
		this._typeCount.set(fe._type,this._typeCount.get(fe._type) - 1);
	}
	,addType: function(e) {
		var fe = e;
		if(this._typeFirst.get(fe._type) != null) {
			this._typeFirst.get(fe._type)._typePrev = e;
			fe._typeNext = this._typeFirst.get(fe._type);
			this._typeCount.set(fe._type,this._typeCount.get(fe._type) + 1);
		} else {
			fe._typeNext = null;
			this._typeCount.set(fe._type,1);
		}
		fe._typePrev = null;
		this._typeFirst.set(fe._type,e);
	}
	,removeRender: function(e) {
		var fe = e;
		if(fe._renderNext != null) fe._renderNext._renderPrev = fe._renderPrev; else this._renderLast.set(fe._layer,fe._renderPrev);
		if(fe._renderPrev != null) fe._renderPrev._renderNext = fe._renderNext; else {
			this._renderFirst.set(fe._layer,fe._renderNext);
			if(fe._renderNext == null) {
				if(this._layerList.length > 1) {
					this._layerList[Lambda.indexOf(this._layerList,fe._layer)] = this._layerList[this._layerList.length - 1];
					this._layerSort = true;
				}
				this._layerList.pop();
			}
		}
		this._layerCount[fe._layer]--;
		fe._renderNext = fe._renderPrev = null;
	}
	,addRender: function(e) {
		var fe = e;
		var f = this._renderFirst.get(fe._layer);
		if(f != null) {
			fe._renderNext = f;
			f._renderPrev = e;
			this._layerCount[fe._layer]++;
		} else {
			this._renderLast.set(fe._layer,e);
			this._layerList[this._layerList.length] = fe._layer;
			this._layerSort = true;
			fe._renderNext = null;
			this._layerCount[fe._layer] = 1;
		}
		this._renderFirst.set(fe._layer,e);
		fe._renderPrev = null;
	}
	,removeUpdate: function(e) {
		var fe = e;
		if(this._updateFirst == e) this._updateFirst = fe._updateNext;
		if(fe._updateNext != null) fe._updateNext._updatePrev = fe._updatePrev;
		if(fe._updatePrev != null) fe._updatePrev._updateNext = fe._updateNext;
		fe._updateNext = fe._updatePrev = null;
		this._count--;
		this._classCount.set(fe._class,this._classCount.get(fe._class) - 1);
	}
	,addUpdate: function(e) {
		var fe = e;
		if(this._updateFirst != null) {
			this._updateFirst._updatePrev = e;
			fe._updateNext = this._updateFirst;
		} else fe._updateNext = null;
		fe._updatePrev = null;
		this._updateFirst = e;
		this._count++;
		if(this._classCount.get(fe._class) != 0) this._classCount.set(fe._class,0);
		this._classCount.set(fe._class,this._classCount.get(fe._class) + 1);
	}
	,layerSort: function(a,b) {
		if(a > b) return 1; else if(a < b) return -1;
		return 0;
	}
	,updateLists: function() {
		var e;
		var fe;
		if(this._remove.length > 0) {
			var _g = 0, _g1 = this._remove;
			while(_g < _g1.length) {
				var e1 = _g1[_g];
				++_g;
				fe = e1;
				if(fe._world == null) {
					var idx = Lambda.indexOf(this._add,e1);
					if(idx >= 0) this._add.splice(idx,1);
					continue;
				}
				if(fe._world != this) continue;
				e1.removed();
				fe._world = null;
				this.removeUpdate(e1);
				this.removeRender(e1);
				if(fe._type != "") this.removeType(e1);
				if(fe._name != "") this.unregisterName(e1);
				if(e1.autoClear && e1.getTween()) e1.clearTweens();
			}
			this._remove.length = 0;
		}
		if(this._add.length > 0) {
			var _g = 0, _g1 = this._add;
			while(_g < _g1.length) {
				var e1 = _g1[_g];
				++_g;
				fe = e1;
				if(fe._world != null) continue;
				fe._world = this;
				this.addUpdate(e1);
				this.addRender(e1);
				if(fe._type != "") this.addType(e1);
				if(fe._name != "") this.registerName(e1);
				e1.added();
			}
			this._add.length = 0;
		}
		if(this._recycle.length > 0) {
			var _g = 0, _g1 = this._recycle;
			while(_g < _g1.length) {
				var e1 = _g1[_g];
				++_g;
				fe = e1;
				if(fe._world != null || fe._recycleNext != null) continue;
				fe._recycleNext = this._recycled.get(fe._class);
				this._recycled.set(fe._class,e1);
			}
			this._recycle.length = 0;
		}
		if(this._layerSort) {
			if(this._layerList.length > 1) this._layerList.sort($bind(this,this.layerSort));
			this._layerSort = false;
		}
	}
	,getAll: function(into) {
		var e, fe = this._updateFirst, n = into.length;
		while(fe != null) {
			e = fe;
			into[n++] = e;
			fe = fe._updateNext;
		}
	}
	,getLayerNearest: function() {
		if(this._updateFirst == null) return 0;
		return this._layerList[0];
	}
	,getLayerFarthest: function() {
		if(this._updateFirst == null) return 0;
		return this._layerList[this._layerList.length - 1];
	}
	,getNearest: function() {
		if(this._updateFirst == null) return null;
		return js.Boot.__cast(this._renderFirst.get(this._layerList[0]) , com.haxepunk.Entity);
	}
	,getFarthest: function() {
		if(this._updateFirst == null) return null;
		return js.Boot.__cast(this._renderLast.get(this._layerList[this._layerList.length - 1]) , com.haxepunk.Entity);
	}
	,remove: function(e) {
		this._remove[this._remove.length] = e;
		return e;
	}
	,add: function(e) {
		this._add[this._add.length] = e;
		return e;
	}
	,render: function() {
		var e, fe, i = this._layerList.length;
		while(i-- > 0) {
			fe = this._renderLast.get(this._layerList[i]);
			while(fe != null) {
				e = js.Boot.__cast(fe , com.haxepunk.Entity);
				if(e.visible) e.render();
				fe = fe._renderPrev;
			}
		}
	}
	,update: function() {
		var e, fe = this._updateFirst;
		while(fe != null) {
			e = js.Boot.__cast(fe , com.haxepunk.Entity);
			if(e.active) {
				if(e.getTween()) e.updateTweens();
				e.update();
			}
			if(e._graphic != null && e._graphic.active) e._graphic.update();
			fe = fe._updateNext;
		}
	}
	,focusLost: function() {
	}
	,focusGained: function() {
	}
	,end: function() {
	}
	,begin: function() {
	}
	,__class__: com.haxepunk.World
	,__properties__: $extend(com.haxepunk.Tweener.prototype.__properties__,{get_mouseX:"getMouseX",get_mouseY:"getMouseY",get_count:"getCount"})
});
com.haxepunk.HXP = function() { }
$hxClasses["com.haxepunk.HXP"] = com.haxepunk.HXP;
com.haxepunk.HXP.__name__ = ["com","haxepunk","HXP"];
com.haxepunk.HXP.__properties__ = {set_time:"setTime",get_console:"getConsole",set_randomSeed:"setRandomSeed",set_world:"setWorld",get_world:"getWorld"}
com.haxepunk.HXP.setWorld = function(value) {
	if(com.haxepunk.HXP._world == value) return value;
	com.haxepunk.HXP._goto = value;
	return com.haxepunk.HXP._world;
}
com.haxepunk.HXP.resize = function(width,height) {
	com.haxepunk.HXP.windowWidth = width;
	com.haxepunk.HXP.windowHeight = height;
	width = width / com.haxepunk.HXP.screen.getFullScaleX() | 0;
	height = height / com.haxepunk.HXP.screen.getFullScaleY() | 0;
	com.haxepunk.HXP.width = width;
	com.haxepunk.HXP.height = height;
	com.haxepunk.HXP.halfWidth = width / 2;
	com.haxepunk.HXP.halfHeight = height / 2;
	com.haxepunk.HXP.bounds.width = width;
	com.haxepunk.HXP.bounds.height = height;
	com.haxepunk.HXP.screen.resize();
}
com.haxepunk.HXP.setVolume = function(value) {
	if(value < 0) value = 0;
	if(com.haxepunk.HXP._volume == value) return value;
	com.haxepunk.HXP._soundTransform.volume = com.haxepunk.HXP._volume = value;
	return com.haxepunk.HXP._volume;
}
com.haxepunk.HXP.setPan = function(value) {
	if(value < -1) value = -1;
	if(value > 1) value = 1;
	if(com.haxepunk.HXP._pan == value) return value;
	com.haxepunk.HXP._soundTransform.pan = com.haxepunk.HXP._pan = value;
	return com.haxepunk.HXP._pan;
}
com.haxepunk.HXP.round = function(num,precision) {
	var exp = Math.pow(10,precision);
	return Math.round(num * exp) / exp;
}
com.haxepunk.HXP.clamp = function(value,min,max) {
	if(max > min) {
		if(value < min) return min; else if(value > max) return max; else return value;
	} else if(value < max) return max; else if(value > min) return min; else return value;
}
com.haxepunk.HXP.scaleClamp = function(value,min,max,min2,max2) {
	value = min2 + (value - min) / (max - min) * (max2 - min2);
	if(max2 > min2) {
		value = value < max2?value:max2;
		return value > min2?value:min2;
	}
	value = value < min2?value:min2;
	return value > max2?value:max2;
}
com.haxepunk.HXP.getBitmap = function(source) {
	var name = Std.string(source);
	if(com.haxepunk.HXP._bitmap.exists(name)) return com.haxepunk.HXP._bitmap.get(name);
	var data = nme.installer.Assets.getBitmapData(source);
	if(data != null) com.haxepunk.HXP._bitmap.set(name,data);
	return data;
}
com.haxepunk.HXP.createBitmap = function(width,height,transparent,color) {
	if(color == null) color = 0;
	if(transparent == null) transparent = false;
	return new browser.display.BitmapData(width,height,transparent,color);
}
com.haxepunk.HXP.consoleEnabled = function() {
	return com.haxepunk.HXP._console != null;
}
com.haxepunk.Mask = function() {
	this._class = Type.getClassName(Type.getClass(this));
	this._check = new Hash();
	this._check.set(Type.getClassName(com.haxepunk.Mask),$bind(this,this.collideMask));
	this._check.set(Type.getClassName(com.haxepunk.masks.Masklist),$bind(this,this.collideMasklist));
};
$hxClasses["com.haxepunk.Mask"] = com.haxepunk.Mask;
com.haxepunk.Mask.__name__ = ["com","haxepunk","Mask"];
com.haxepunk.Mask.prototype = {
	project: function(axis,projection) {
		var cur, max = -9999999999.0, min = 9999999999.0;
		cur = -this.parent.originX * axis.x - this.parent.originY * axis.y;
		if(cur < min) min = cur;
		if(cur > max) max = cur;
		cur = (-this.parent.originX + this.parent.width) * axis.x - this.parent.originY * axis.y;
		if(cur < min) min = cur;
		if(cur > max) max = cur;
		cur = -this.parent.originX * axis.x + (-this.parent.originY + this.parent.height) * axis.y;
		if(cur < min) min = cur;
		if(cur > max) max = cur;
		cur = (-this.parent.originX + this.parent.width) * axis.x + (-this.parent.originY + this.parent.height) * axis.y;
		if(cur < min) min = cur;
		if(cur > max) max = cur;
		projection.min = min;
		projection.max = max;
	}
	,update: function() {
	}
	,debugDraw: function(graphics,scaleX,scaleY) {
	}
	,assignTo: function(parent) {
		this.parent = parent;
		if(parent != null) this.update();
	}
	,collideMasklist: function(other) {
		return other.collide(this);
	}
	,collideMask: function(other) {
		return this.parent.x - this.parent.originX + this.parent.width > other.parent.x - other.parent.originX && this.parent.y - this.parent.originY + this.parent.height > other.parent.y - other.parent.originY && this.parent.x - this.parent.originX < other.parent.x - other.parent.originX + other.parent.width && this.parent.y - this.parent.originY < other.parent.y - other.parent.originY + other.parent.height;
	}
	,collide: function(mask) {
		if(this.parent == null) throw "Mask must be attached to a parent Entity";
		var cbFunc = this._check.get(mask._class);
		if(cbFunc != null) return cbFunc(mask);
		cbFunc = mask._check.get(this._class);
		if(cbFunc != null) return cbFunc(this);
		return false;
	}
	,__class__: com.haxepunk.Mask
}
com.haxepunk.Preloader = function() {
	NMEPreloader.call(this);
};
$hxClasses["com.haxepunk.Preloader"] = com.haxepunk.Preloader;
com.haxepunk.Preloader.__name__ = ["com","haxepunk","Preloader"];
com.haxepunk.Preloader.__super__ = NMEPreloader;
com.haxepunk.Preloader.prototype = $extend(NMEPreloader.prototype,{
	__class__: com.haxepunk.Preloader
});
com.haxepunk.Screen = function() {
	this.init();
	com.haxepunk.HXP.engine.addChild(this._sprite);
};
$hxClasses["com.haxepunk.Screen"] = com.haxepunk.Screen;
com.haxepunk.Screen.__name__ = ["com","haxepunk","Screen"];
com.haxepunk.Screen.prototype = {
	getMouseY: function() {
		return this._sprite.get_mouseY() | 0;
	}
	,getMouseX: function() {
		return this._sprite.get_mouseX() | 0;
	}
	,setSmoothing: function(value) {
		this._bitmap[0].smoothing = this._bitmap[1].smoothing = value;
		return value;
	}
	,getSmoothing: function() {
		return this._bitmap[0].smoothing;
	}
	,setAngle: function(value) {
		if(this._angle == value * (Math.PI / -180)) return value;
		this._angle = value * (Math.PI / -180);
		this.update();
		return this._angle;
	}
	,getAngle: function() {
		return this._angle * (-180 / Math.PI);
	}
	,getFullScaleY: function() {
		return this.scaleY * this.scale;
	}
	,getFullScaleX: function() {
		return this.scaleX * this.scale;
	}
	,setScale: function(value) {
		if(this.scale == value) return value;
		this.scale = value;
		this.update();
		return this.scale;
	}
	,setScaleY: function(value) {
		if(this.scaleY == value) return value;
		this.scaleY = value;
		this.update();
		return this.scaleY;
	}
	,setScaleX: function(value) {
		if(this.scaleX == value) return value;
		this.scaleX = value;
		this.update();
		return this.scaleX;
	}
	,setOriginY: function(value) {
		if(this.originY == value) return value;
		this.originY = value;
		this.update();
		return this.originY;
	}
	,setOriginX: function(value) {
		if(this.originX == value) return value;
		this.originX = value;
		this.update();
		return this.originX;
	}
	,setY: function(value) {
		if(this.y == value) return value;
		this.y = value;
		this.update();
		return this.y;
	}
	,setX: function(value) {
		if(this.x == value) return value;
		this.x = value;
		this.update();
		return this.x;
	}
	,setColor: function(value) {
		this._color = -16777216 | value;
		return this._color;
	}
	,getColor: function() {
		return this._color;
	}
	,update: function() {
		if(this._matrix == null) return;
		this._matrix.b = this._matrix.c = 0;
		this._matrix.a = this.getFullScaleX();
		this._matrix.d = this.getFullScaleY();
		this._matrix.set_tx(-this.originX * this._matrix.a);
		this._matrix.set_ty(-this.originY * this._matrix.d);
		if(this._angle != 0) this._matrix.rotate(this._angle);
		var _g = this._matrix;
		_g.set_tx(_g.tx + (this.originX * this.getFullScaleX() + this.x));
		var _g = this._matrix;
		_g.set_ty(_g.ty + (this.originY * this.getFullScaleY() + this.y));
		this._sprite.transform.set_matrix(this._matrix);
	}
	,redraw: function() {
		this._bitmap[this._current].set_visible(true);
		this._bitmap[1 - this._current].set_visible(false);
	}
	,refresh: function() {
		com.haxepunk.HXP.buffer.fillRect(com.haxepunk.HXP.bounds,this._color);
	}
	,swap: function() {
		this._current = 1 - this._current;
		com.haxepunk.HXP.buffer = this._bitmap[this._current].bitmapData;
	}
	,resize: function() {
		this.disposeBitmap(this._bitmap[0]);
		this.disposeBitmap(this._bitmap[1]);
		this.width = com.haxepunk.HXP.width;
		this.height = com.haxepunk.HXP.height;
		this._bitmap[0] = new browser.display.Bitmap(com.haxepunk.HXP.createBitmap(this.width,this.height,true),browser.display.PixelSnapping.NEVER);
		this._bitmap[1] = new browser.display.Bitmap(com.haxepunk.HXP.createBitmap(this.width,this.height,true),browser.display.PixelSnapping.NEVER);
		this._sprite.addChild(this._bitmap[0]).set_visible(true);
		this._sprite.addChild(this._bitmap[1]).set_visible(false);
		com.haxepunk.HXP.buffer = this._bitmap[0].bitmapData;
		this._current = 0;
	}
	,disposeBitmap: function(bd) {
		if(bd != null) {
			this._sprite.removeChild(bd);
			bd.bitmapData.dispose();
		}
	}
	,init: function() {
		this._sprite = new browser.display.Sprite();
		this._bitmap = new Array();
		this.setX(this.setY(this.setOriginX(this.setOriginY(0))));
		this._angle = this._current = 0;
		this.setScale(this.setScaleX(this.setScaleY(1)));
		this._color = 0;
		this._matrix = new browser.geom.Matrix();
		this.update();
	}
	,__class__: com.haxepunk.Screen
	,__properties__: {set_color:"setColor",get_color:"getColor",set_x:"setX",set_y:"setY",set_originX:"setOriginX",set_originY:"setOriginY",set_scaleX:"setScaleX",set_scaleY:"setScaleY",set_scale:"setScale",get_fullScaleX:"getFullScaleX",get_fullScaleY:"getFullScaleY",get_mouseX:"getMouseX",get_mouseY:"getMouseY"}
}
com.haxepunk.TweenType = $hxClasses["com.haxepunk.TweenType"] = { __ename__ : true, __constructs__ : ["Persist","Looping","OneShot"] }
com.haxepunk.TweenType.Persist = ["Persist",0];
com.haxepunk.TweenType.Persist.toString = $estr;
com.haxepunk.TweenType.Persist.__enum__ = com.haxepunk.TweenType;
com.haxepunk.TweenType.Looping = ["Looping",1];
com.haxepunk.TweenType.Looping.toString = $estr;
com.haxepunk.TweenType.Looping.__enum__ = com.haxepunk.TweenType;
com.haxepunk.TweenType.OneShot = ["OneShot",2];
com.haxepunk.TweenType.OneShot.toString = $estr;
com.haxepunk.TweenType.OneShot.__enum__ = com.haxepunk.TweenType;
com.haxepunk.Tween = function() { }
$hxClasses["com.haxepunk.Tween"] = com.haxepunk.Tween;
com.haxepunk.Tween.__name__ = ["com","haxepunk","Tween"];
com.haxepunk.Tween.__super__ = browser.events.EventDispatcher;
com.haxepunk.Tween.prototype = $extend(browser.events.EventDispatcher.prototype,{
	getScale: function() {
		return this._t;
	}
	,setPercent: function(value) {
		this._time = this._target * value;
		return this._time;
	}
	,getPercent: function() {
		return this._time / this._target;
	}
	,finish: function() {
		switch( (this._type)[1] ) {
		case 0:
			this._time = this._target;
			this.active = false;
			break;
		case 1:
			this._time %= this._target;
			this._t = this._time / this._target;
			if(this._ease != null && this._t > 0 && this._t < 1) this._t = this._ease(this._t);
			this.start();
			break;
		case 2:
			this._time = this._target;
			this.active = false;
			this._parent.removeTween(this);
			break;
		}
		this._finish = false;
		this.dispatchEvent(new com.haxepunk.tweens.TweenEvent(com.haxepunk.tweens.TweenEvent.FINISH));
	}
	,start: function() {
		this._time = 0;
		if(this._target == 0) {
			this.active = false;
			this.dispatchEvent(new com.haxepunk.tweens.TweenEvent(com.haxepunk.tweens.TweenEvent.FINISH));
			return;
		}
		this.active = true;
		this.dispatchEvent(new com.haxepunk.tweens.TweenEvent(com.haxepunk.tweens.TweenEvent.START));
	}
	,update: function() {
		this._time += com.haxepunk.HXP.fixed?1:com.haxepunk.HXP.elapsed;
		this._t = this._time / this._target;
		if(this._ease != null && this._t > 0 && this._t < 1) this._t = this._ease(this._t);
		if(this._time >= this._target) {
			this._t = 1;
			this._finish = true;
		}
		this.dispatchEvent(new com.haxepunk.tweens.TweenEvent(com.haxepunk.tweens.TweenEvent.UPDATE));
	}
	,__class__: com.haxepunk.Tween
});
com.haxepunk.debug = {}
com.haxepunk.debug.Console = function() {
	this.init();
	com.haxepunk.utils.Input.define("_ARROWS",[39,37,40,38]);
};
$hxClasses["com.haxepunk.debug.Console"] = com.haxepunk.debug.Console;
com.haxepunk.debug.Console.__name__ = ["com","haxepunk","debug","Console"];
com.haxepunk.debug.Console.prototype = {
	getHeight: function() {
		return com.haxepunk.HXP.windowHeight;
	}
	,getWidth: function() {
		return com.haxepunk.HXP.windowWidth;
	}
	,format: function(size,color,align) {
		if(align == null) align = "left";
		if(color == null) color = 16777215;
		if(size == null) size = 16;
		this._format.size = size;
		this._format.color = color;
		switch(align) {
		case "left":
			this._format.align = browser.text.TextFormatAlign.LEFT;
			break;
		case "right":
			this._format.align = browser.text.TextFormatAlign.RIGHT;
			break;
		case "center":
			this._format.align = browser.text.TextFormatAlign.CENTER;
			break;
		case "justify":
			this._format.align = browser.text.TextFormatAlign.JUSTIFY;
			break;
		}
		return this._format;
	}
	,updateButtons: function() {
		this._butRead.set_x(this._fpsInfo.get_x() + this._fpsInfo.get_width() + ((this._entRead.get_x() - (this._fpsInfo.get_x() + this._fpsInfo.get_width())) / 2 | 0) - 30);
		this._butDebug.set_visible(!this._debug);
		this._butOutput.set_visible(this._debug);
		this._butPlay.set_visible(com.haxepunk.HXP.engine.paused);
		this._butPause.set_visible(!com.haxepunk.HXP.engine.paused);
		if(this._butDebug.bitmapData.rect.contains(this._butDebug.get_mouseX(),this._butDebug.get_mouseY())) {
			this._butDebug.alpha = this._butOutput.alpha = 1;
			if(com.haxepunk.utils.Input.mousePressed) this.setDebug(!this._debug);
		} else this._butDebug.alpha = this._butOutput.alpha = .5;
		if(this._butPlay.bitmapData.rect.contains(this._butPlay.get_mouseX(),this._butPlay.get_mouseY())) {
			this._butPlay.alpha = this._butPause.alpha = 1;
			if(com.haxepunk.utils.Input.mousePressed) {
				com.haxepunk.HXP.engine.paused = !com.haxepunk.HXP.engine.paused;
				this.renderEntities();
			}
		} else this._butPlay.alpha = this._butPause.alpha = .5;
		if(this._butStep.bitmapData.rect.contains(this._butStep.get_mouseX(),this._butStep.get_mouseY())) {
			this._butStep.alpha = 1;
			if(com.haxepunk.utils.Input.mousePressed) this.stepFrame();
		} else this._butStep.alpha = .5;
	}
	,updateEntityCount: function() {
		this._entReadText.set_text(Std.string(com.haxepunk.HXP._world._count) + " Entities");
	}
	,updateDebugRead: function() {
		var str;
		var big = this.getWidth() >= 480;
		var s = "Mouse: " + Std.string(com.haxepunk.HXP.screen.getMouseX() + com.haxepunk.HXP.camera.x | 0) + ", " + Std.string(com.haxepunk.HXP.screen.getMouseY() + com.haxepunk.HXP.camera.y | 0) + "\nCamera: " + Std.string(com.haxepunk.HXP.camera.x) + ", " + Std.string(com.haxepunk.HXP.camera.y);
		if(this.SELECT_LIST.length != 0) {
			if(this.SELECT_LIST.length > 1) s += "\n\nSelected: " + Std.string(this.SELECT_LIST.length); else {
				var e = this.SELECT_LIST.first();
				s += "\n\n- " + Type.getClassName(Type.getClass(e)) + " -\n";
				var $it0 = this.WATCH_LIST.iterator();
				while( $it0.hasNext() ) {
					var str1 = $it0.next();
					var field = Reflect.field(e,str1);
					if(field != null) s += "\n" + str1 + ": " + field.toString();
				}
			}
		}
		this._debReadText1.set_text(s);
		this._debReadText1.setTextFormat(this.format(big?16:8));
		this._debReadText1.set_width(Math.max(this._debReadText1.get_textWidth() + 4,this._debReadText0.get_width()));
		this._debReadText1.set_height(this._debReadText1.get_y() + this._debReadText1.get_textHeight() + 4);
		this._debRead.set_y(this.getHeight() - this._debReadText1.get_height() | 0);
		this._debRead.get_graphics().clear();
		this._debRead.get_graphics().beginFill(0,.75);
		this._debRead.get_graphics().drawRect(0,0,this._debReadText0.get_width(),20);
		this._debRead.get_graphics().drawRect(0,20,this._debReadText1.get_width() + 20,this.getHeight() - this._debRead.get_y() - 20);
	}
	,updateFPSRead: function() {
		this._fpsReadText.set_text("FPS: " + (com.haxepunk.HXP.frameRate | 0));
		this._fpsInfoText0.set_text("Update: " + Std.string(com.haxepunk.HXP._updateTime) + "ms\n" + "Render: " + Std.string(com.haxepunk.HXP._renderTime) + "ms");
		this._fpsInfoText1.set_text("Game: " + Std.string(com.haxepunk.HXP._gameTime) + "ms\n" + "Flash: " + Std.string(com.haxepunk.HXP._flashTime) + "ms");
		this._memReadText.set_text("Mem: " + com.haxepunk.HXP.round(browser.system.System.get_totalMemory() / 1024 / 1024,2) + "MB");
	}
	,updateLog: function() {
		this._logHeight = this.getHeight() - 60;
		this._logBar.height = this._logHeight - 8;
		if(this._paused) {
			this._logRead.set_y(40);
			this._logRead.get_graphics().clear();
			this._logRead.get_graphics().beginFill(0,.75);
			this._logRead.get_graphics().drawRect(0,0,this._logReadText0.get_width(),20);
			this._logRead.get_graphics().drawRect(0,20,this.getWidth(),this._logHeight);
			this._logRead.get_graphics().beginFill(2105376,1);
			this._logRead.get_graphics().drawRoundRect(this._logBar.x,this._logBar.y,this._logBar.width,this._logBar.height,8,8);
			if(this.LOG.length > this._logLines) {
				this._logRead.get_graphics().beginFill(16777215,1);
				var y = this._logBar.y + 2 + (this._logBar.height - 16) * this._logScroll | 0;
				this._logRead.get_graphics().drawRoundRect(this._logBar.x + 2,y,12,12,6,6);
			}
			if(this.LOG.length != 0) {
				var i = this.LOG.length > this._logLines?Math.round((this.LOG.length - this._logLines) * this._logScroll) | 0:0, n = i + Math.min(this._logLines,this.LOG.length) | 0, s = "";
				while(i < n) s += this.LOG[i++] + "\n";
				this._logReadText1.set_text(s);
			} else this._logReadText1.set_text("");
			this._logReadText1.set_height(this._logHeight);
			this._logReadText1.set_x(32);
			this._logReadText1.set_y(24);
			this._fpsReadText.selectable = true;
			this._fpsInfoText0.selectable = true;
			this._fpsInfoText1.selectable = true;
			this._memReadText.selectable = true;
			this._entReadText.selectable = true;
			this._debReadText1.selectable = true;
		} else {
			this._logRead.set_y(this.getHeight() - 40);
			this._logReadText1.set_height(20);
			this._logRead.get_graphics().clear();
			this._logRead.get_graphics().beginFill(0,.75);
			this._logRead.get_graphics().drawRect(0,0,this._logReadText0.get_width(),20);
			this._logRead.get_graphics().drawRect(0,20,this.getWidth(),20);
			this._logReadText1.set_text(this.LOG.length != 0?this.LOG[this.LOG.length - 1]:"");
			this._logReadText1.set_x(2);
			this._logReadText1.set_y(21);
			this._logReadText1.selectable = false;
			this._fpsReadText.selectable = false;
			this._fpsInfoText0.selectable = false;
			this._fpsInfoText1.selectable = false;
			this._memReadText.selectable = false;
			this._entReadText.selectable = false;
			this._debReadText0.selectable = false;
			this._debReadText1.selectable = false;
		}
	}
	,renderEntities: function() {
		var e;
		this._entScreen.set_visible(this._debug);
		if(this._debug) {
			var g = this._entScreen.get_graphics(), sx = com.haxepunk.HXP.screen.getFullScaleX(), sy = com.haxepunk.HXP.screen.getFullScaleY();
			g.clear();
			var $it0 = this.SCREEN_LIST.iterator();
			while( $it0.hasNext() ) {
				var e1 = $it0.next();
				if(Lambda.indexOf(this.SELECT_LIST,e1) < 0) {
					if(e1.width != 0 && e1.height != 0) {
						g.lineStyle(1,16711680);
						g.drawRect((e1.x - e1.originX - com.haxepunk.HXP.camera.x) * sx,(e1.y - e1.originY - com.haxepunk.HXP.camera.y) * sy,e1.width * sx,e1.height * sy);
						if(e1._mask != null) {
							g.lineStyle(1,255);
							e1._mask.debugDraw(g,sx,sy);
						}
					}
					g.lineStyle(1,65280);
					g.drawRect((e1.x - com.haxepunk.HXP.camera.x) * sx - 3,(e1.y - com.haxepunk.HXP.camera.y) * sy - 3,6,6);
				} else {
					if(e1.width != 0 && e1.height != 0) {
						g.lineStyle(1,16777215);
						g.drawRect((e1.x - e1.originX - com.haxepunk.HXP.camera.x) * sx,(e1.y - e1.originY - com.haxepunk.HXP.camera.y) * sy,e1.width * sx,e1.height * sy);
						if(e1._mask != null) {
							g.lineStyle(1,255);
							e1._mask.debugDraw(g,sx,sy);
						}
					}
					g.lineStyle(1,16777215);
					g.drawRect((e1.x - com.haxepunk.HXP.camera.x) * sx - 3,(e1.y - com.haxepunk.HXP.camera.y) * sy - 3,6,6);
				}
			}
		}
	}
	,updateEntityLists: function(fetchList) {
		if(fetchList == null) fetchList = true;
		if(fetchList) {
			this.ENTITY_LIST.length = 0;
			com.haxepunk.HXP._world.getAll(this.ENTITY_LIST);
		}
		this.SCREEN_LIST.clear();
		var _g = 0, _g1 = this.ENTITY_LIST;
		while(_g < _g1.length) {
			var e = _g1[_g];
			++_g;
			if(e.collideRect(e.x,e.y,com.haxepunk.HXP.camera.x,com.haxepunk.HXP.camera.y,com.haxepunk.HXP.width,com.haxepunk.HXP.height)) this.SCREEN_LIST.push(e);
		}
	}
	,updateKeyPanning: function() {
		com.haxepunk.HXP.point.x = (com.haxepunk.utils.Input.check(39)?1:0) - (com.haxepunk.utils.Input.check(37)?1:0);
		com.haxepunk.HXP.point.y = (com.haxepunk.utils.Input.check(40)?1:0) - (com.haxepunk.utils.Input.check(38)?1:0);
		if(com.haxepunk.HXP.point.x != 0 || com.haxepunk.HXP.point.y != 0) this.panCamera(com.haxepunk.HXP.point.x | 0,com.haxepunk.HXP.point.y | 0);
	}
	,updateKeyMoving: function() {
		com.haxepunk.HXP.point.x = (com.haxepunk.utils.Input.pressed(39)?1:0) - (com.haxepunk.utils.Input.pressed(37)?1:0);
		com.haxepunk.HXP.point.y = (com.haxepunk.utils.Input.pressed(40)?1:0) - (com.haxepunk.utils.Input.pressed(38)?1:0);
		if(com.haxepunk.HXP.point.x != 0 || com.haxepunk.HXP.point.y != 0) this.moveSelected(com.haxepunk.HXP.point.x | 0,com.haxepunk.HXP.point.y | 0);
	}
	,updateScrolling: function() {
		this._scrolling = com.haxepunk.utils.Input.mouseDown;
		this._logScroll = com.haxepunk.HXP.scaleClamp(com.haxepunk.utils.Input.getMouseFlashY(),this._logBarGlobal.y,this._logBarGlobal.get_bottom(),0,1);
		this.updateLog();
	}
	,startScrolling: function() {
		if(this.LOG.length > this._logLines) this._scrolling = this._logBarGlobal.contains(com.haxepunk.utils.Input.getMouseFlashX(),com.haxepunk.utils.Input.getMouseFlashY());
	}
	,selectAll: function() {
		var e;
		this.SELECT_LIST.clear();
		var $it0 = this.SCREEN_LIST.iterator();
		while( $it0.hasNext() ) {
			var e1 = $it0.next();
			this.SELECT_LIST.push(e1);
		}
		this.renderEntities();
	}
	,selectEntities: function(rect) {
		if(rect.width < 0) rect.x -= rect.width = -rect.width; else if(rect.width == 0) rect.width = 1;
		if(rect.height < 0) rect.y -= rect.height = -rect.height; else if(rect.height == 0) rect.height = 1;
		com.haxepunk.HXP.rect.width = com.haxepunk.HXP.rect.height = 6;
		var sx = com.haxepunk.HXP.screen.getFullScaleX(), sy = com.haxepunk.HXP.screen.getFullScaleY(), e;
		if(com.haxepunk.utils.Input.check(17)) {
			var $it0 = this.SCREEN_LIST.iterator();
			while( $it0.hasNext() ) {
				var e1 = $it0.next();
				if(Lambda.indexOf(this.SELECT_LIST,e1) < 0) {
					com.haxepunk.HXP.rect.x = (e1.x - com.haxepunk.HXP.camera.x) * sx - 3;
					com.haxepunk.HXP.rect.y = (e1.y - com.haxepunk.HXP.camera.y) * sy - 3;
					if(rect.intersects(com.haxepunk.HXP.rect)) this.SELECT_LIST.push(e1);
				}
			}
		} else {
			this.SELECT_LIST.clear();
			var $it1 = this.SCREEN_LIST.iterator();
			while( $it1.hasNext() ) {
				var e1 = $it1.next();
				com.haxepunk.HXP.rect.x = (e1.x - com.haxepunk.HXP.camera.x) * sx - 3;
				com.haxepunk.HXP.rect.y = (e1.y - com.haxepunk.HXP.camera.y) * sy - 3;
				if(rect.intersects(com.haxepunk.HXP.rect)) this.SELECT_LIST.push(e1);
			}
		}
	}
	,updateSelection: function() {
		this._entRect.width = com.haxepunk.utils.Input.getMouseFlashX() - this._entRect.x;
		this._entRect.height = com.haxepunk.utils.Input.getMouseFlashY() - this._entRect.y;
		if(com.haxepunk.utils.Input.mouseReleased) {
			this.selectEntities(this._entRect);
			this.renderEntities();
			this._selecting = false;
			this._entSelect.get_graphics().clear();
		} else {
			this._entSelect.get_graphics().clear();
			this._entSelect.get_graphics().lineStyle(1,16777215);
			this._entSelect.get_graphics().drawRect(this._entRect.x,this._entRect.y,this._entRect.width,this._entRect.height);
		}
	}
	,startSelection: function() {
		this._selecting = true;
		this._entRect.x = com.haxepunk.utils.Input.getMouseFlashX();
		this._entRect.y = com.haxepunk.utils.Input.getMouseFlashY();
		this._entRect.width = 0;
		this._entRect.height = 0;
	}
	,panCamera: function(xDelta,yDelta) {
		com.haxepunk.HXP.camera.x += xDelta;
		com.haxepunk.HXP.camera.y += yDelta;
		com.haxepunk.HXP.engine.render();
		this.updateEntityLists(true);
		this.renderEntities();
	}
	,updatePanning: function() {
		if(com.haxepunk.utils.Input.mouseReleased) this._panning = false;
		this.panCamera(this._entRect.x - com.haxepunk.utils.Input.getMouseX() | 0,this._entRect.y - com.haxepunk.utils.Input.getMouseY() | 0);
		this._entRect.x = com.haxepunk.utils.Input.getMouseX();
		this._entRect.y = com.haxepunk.utils.Input.getMouseY();
	}
	,startPanning: function() {
		this._panning = true;
		this._entRect.x = com.haxepunk.utils.Input.getMouseX();
		this._entRect.y = com.haxepunk.utils.Input.getMouseY();
	}
	,moveSelected: function(xDelta,yDelta) {
		var $it0 = this.SELECT_LIST.iterator();
		while( $it0.hasNext() ) {
			var e = $it0.next();
			e.x += xDelta;
			e.y += yDelta;
		}
		com.haxepunk.HXP.engine.render();
		this.renderEntities();
		this.updateEntityLists(true);
	}
	,updateDragging: function() {
		this.moveSelected(com.haxepunk.utils.Input.getMouseX() - this._entRect.x | 0,com.haxepunk.utils.Input.getMouseY() - this._entRect.y | 0);
		this._entRect.x = com.haxepunk.utils.Input.getMouseX();
		this._entRect.y = com.haxepunk.utils.Input.getMouseY();
		if(com.haxepunk.utils.Input.mouseReleased) this._dragging = false;
	}
	,startDragging: function() {
		this._dragging = true;
		this._entRect.x = com.haxepunk.utils.Input.getMouseX();
		this._entRect.y = com.haxepunk.utils.Input.getMouseY();
	}
	,stepFrame: function() {
		com.haxepunk.HXP.engine.update();
		com.haxepunk.HXP.engine.render();
		this.updateEntityCount();
		this.updateEntityLists();
		this.renderEntities();
	}
	,setDebug: function(value) {
		if(!this._enabled) return false;
		this._debug = value;
		this._debRead.set_visible(value);
		this._logRead.set_visible(!value);
		if(value) this.updateEntityLists(); else this.updateLog();
		this.renderEntities();
		return this._debug;
	}
	,getDebug: function() {
		return this._debug;
	}
	,setPaused: function(value) {
		if(!this._enabled) return false;
		this._paused = value;
		com.haxepunk.HXP.engine.paused = value;
		this._back.set_visible(value);
		this._entScreen.set_visible(value);
		this._butRead.set_visible(value);
		if(value) {
			if(this._debug) this.setDebug(true); else this.updateLog();
		} else {
			this._debRead.set_visible(false);
			this._logRead.set_visible(true);
			this.updateLog();
			this.ENTITY_LIST.length = 0;
			this.SCREEN_LIST.clear();
			this.SELECT_LIST.clear();
		}
		return this._paused;
	}
	,getPaused: function() {
		return this._paused;
	}
	,update: function() {
		if(!this._enabled) return;
		this._entRead.set_x(this.getWidth() - this._entReadText.get_width());
		if(this._paused) {
			this.updateButtons();
			if(this._debug) {
				if(com.haxepunk.HXP.engine.paused) {
					if(com.haxepunk.utils.Input.mousePressed) {
						if(com.haxepunk.utils.Input.getMouseFlashY() > 20 && (com.haxepunk.utils.Input.getMouseFlashX() > this._debReadText1.get_width() || com.haxepunk.utils.Input.getMouseFlashY() < this._debRead.get_y())) {
							if(com.haxepunk.utils.Input.check(16)) {
								if(this.SELECT_LIST.length != 0) this.startDragging(); else this.startPanning();
							} else this.startSelection();
						}
					} else {
						if(this._selecting) this.updateSelection();
						if(this._dragging) this.updateDragging();
						if(this._panning) this.updatePanning();
					}
					if(com.haxepunk.utils.Input.pressed(65)) this.selectAll();
					if(com.haxepunk.utils.Input.check(16)) {
						if(this.SELECT_LIST.length != 0) {
							if(com.haxepunk.utils.Input.pressed("_ARROWS")) this.updateKeyMoving();
						} else if(com.haxepunk.utils.Input.check("_ARROWS")) this.updateKeyPanning();
					}
				} else {
					this.updateEntityLists(com.haxepunk.HXP._world._count != this.ENTITY_LIST.length);
					this.renderEntities();
					this.updateFPSRead();
					this.updateEntityCount();
				}
				this.updateDebugRead();
			} else if(this._scrolling) this.updateScrolling(); else if(com.haxepunk.utils.Input.mousePressed) this.startScrolling();
		} else {
			this.updateFPSRead();
			this.updateEntityCount();
		}
		if(com.haxepunk.utils.Input.pressed(this.toggleKey)) this.setPaused(!this._paused);
	}
	,setVisible: function(value) {
		this._sprite.set_visible(value);
		if(this._enabled && value) this.updateLog();
		return this._sprite.get_visible();
	}
	,getVisible: function() {
		return this._sprite.get_visible();
	}
	,init: function() {
		this.toggleKey = 192;
		this._sprite = new browser.display.Sprite();
		var font = nme.installer.Assets.getFont("font/04B_03__.ttf");
		if(font == null) font = nme.installer.Assets.getFont(com.haxepunk.HXP.defaultFont);
		this._format = new browser.text.TextFormat(font.fontName,8,16777215);
		this._back = new browser.display.Bitmap();
		this._fpsRead = new browser.display.Sprite();
		this._fpsReadText = new browser.text.TextField();
		this._fpsInfo = new browser.display.Sprite();
		this._fpsInfoText0 = new browser.text.TextField();
		this._fpsInfoText1 = new browser.text.TextField();
		this._memReadText = new browser.text.TextField();
		this._logRead = new browser.display.Sprite();
		this._logReadText0 = new browser.text.TextField();
		this._logReadText1 = new browser.text.TextField();
		this._logScroll = 0;
		this._logLines = 33;
		this._entRead = new browser.display.Sprite();
		this._entReadText = new browser.text.TextField();
		this._debRead = new browser.display.Sprite();
		this._debReadText0 = new browser.text.TextField();
		this._debReadText1 = new browser.text.TextField();
		this._butRead = new browser.display.Sprite();
		this._entScreen = new browser.display.Sprite();
		this._entSelect = new browser.display.Sprite();
		this._entRect = new browser.geom.Rectangle();
		this.LOG = new Array();
		this.ENTITY_LIST = new Array();
		this.SCREEN_LIST = new List();
		this.SELECT_LIST = new List();
		this.WATCH_LIST = new List();
		this.WATCH_LIST.push("x");
		this.WATCH_LIST.push("y");
	}
	,__class__: com.haxepunk.debug.Console
	,__properties__: {set_paused:"setPaused",get_paused:"getPaused",set_debug:"setDebug",get_debug:"getDebug",get_width:"getWidth",get_height:"getHeight"}
}
com.haxepunk.graphics = {}
com.haxepunk.graphics.Animation = function(name,frames,frameRate,loop) {
	if(loop == null) loop = true;
	if(frameRate == null) frameRate = 0;
	this.name = name;
	this.frames = frames;
	this.frameRate = frameRate;
	this.loop = loop;
	this.frameCount = frames.length;
};
$hxClasses["com.haxepunk.graphics.Animation"] = com.haxepunk.graphics.Animation;
com.haxepunk.graphics.Animation.__name__ = ["com","haxepunk","graphics","Animation"];
com.haxepunk.graphics.Animation.prototype = {
	setParent: function(value) {
		this._parent = value;
		return this._parent;
	}
	,__class__: com.haxepunk.graphics.Animation
	,__properties__: {set_parent:"setParent"}
}
com.haxepunk.graphics.Graphiclist = function() { }
$hxClasses["com.haxepunk.graphics.Graphiclist"] = com.haxepunk.graphics.Graphiclist;
com.haxepunk.graphics.Graphiclist.__name__ = ["com","haxepunk","graphics","Graphiclist"];
com.haxepunk.graphics.Graphiclist.__super__ = com.haxepunk.Graphic;
com.haxepunk.graphics.Graphiclist.prototype = $extend(com.haxepunk.Graphic.prototype,{
	getCount: function() {
		return this._count;
	}
	,getChildren: function() {
		return this._graphics;
	}
	,render: function(target,point,camera,layer) {
		if(layer == null) layer = 10;
		point.x += this.x;
		point.y += this.y;
		camera.x *= this.scrollX;
		camera.y *= this.scrollY;
		var _g = 0, _g1 = this._graphics;
		while(_g < _g1.length) {
			var g = _g1[_g];
			++_g;
			if(g.visible) {
				if(g.relative) {
					this._point.x = point.x;
					this._point.y = point.y;
				} else this._point.x = this._point.y = 0;
				this._camera.x = camera.x;
				this._camera.y = camera.y;
				g.render(target,this._point,this._camera,layer);
			}
		}
	}
	,update: function() {
		var _g = 0, _g1 = this._graphics;
		while(_g < _g1.length) {
			var g = _g1[_g];
			++_g;
			if(g.active) g.update();
		}
	}
	,__class__: com.haxepunk.graphics.Graphiclist
});
com.haxepunk.graphics.Image = function(source,clipRect,name) {
	if(name == null) name = "";
	com.haxepunk.Graphic.call(this);
	{
		this.angle = 0;
		this.scale = this.scaleX = this.scaleY = 1;
		this.originX = this.originY = 0;
		this._alpha = 1;
		this._flipped = false;
		this._color = 16777215;
		this._matrix = com.haxepunk.HXP.matrix;
	}
	if(this._source == null && this._region == null) {
		this._class = name;
		if(js.Boot.__instanceof(source,browser.display.BitmapData)) {
			this._blit = true;
			this._sourceRect = source.rect;
			this._source = source;
		} else if(js.Boot.__instanceof(source,com.haxepunk.graphics.atlas.TextureAtlas)) {
			this._blit = false;
			this._region = (js.Boot.__cast(source , com.haxepunk.graphics.atlas.TextureAtlas)).getRegion(name);
			this._sourceRect = new browser.geom.Rectangle(0,0,this._region.width,this._region.height);
		} else if(js.Boot.__instanceof(source,com.haxepunk.graphics.atlas.AtlasRegion)) {
			this._blit = false;
			this._region = source;
			this._sourceRect = new browser.geom.Rectangle(0,0,this._region.width,this._region.height);
		} else {
			if(js.Boot.__instanceof(source,String)) this._class = source; else if(name == "") this._class = Type.getClassName(Type.getClass(source));
			this.setBitmapSource(com.haxepunk.HXP.getBitmap(source));
		}
		if(this._source == null && this._region == null) throw "Invalid source image.";
	}
	if(clipRect != null) {
		if(clipRect.width == 0) clipRect.width = this._sourceRect.width;
		if(clipRect.height == 0) clipRect.height = this._sourceRect.height;
		this._sourceRect = clipRect;
	}
	if(this._blit) {
		this._bitmap = new browser.display.Bitmap();
		this._colorTransform = new browser.geom.ColorTransform();
		this.createBuffer();
		this.updateBuffer();
	}
};
$hxClasses["com.haxepunk.graphics.Image"] = com.haxepunk.graphics.Image;
com.haxepunk.graphics.Image.__name__ = ["com","haxepunk","graphics","Image"];
com.haxepunk.graphics.Image.__super__ = com.haxepunk.Graphic;
com.haxepunk.graphics.Image.prototype = $extend(com.haxepunk.Graphic.prototype,{
	getClipRect: function() {
		return this._sourceRect;
	}
	,getScaledHeight: function() {
		return this.getHeight() * this.scaleY * this.scale | 0;
	}
	,getScaledWidth: function() {
		return this.getWidth() * this.scaleX * this.scale | 0;
	}
	,getHeight: function() {
		return (this._blit?this._source.get_height():this._region.height) | 0;
	}
	,getWidth: function() {
		return (this._blit?this._source.get_width():this._region.width) | 0;
	}
	,setFlipped: function(value) {
		if(this._flipped == value || this._class == "") return value;
		this._flipped = value;
		if(this._blit) {
			var temp = this._source;
			if(!value || this._flip != null) this._source = this._flip; else if(com.haxepunk.graphics.Image._flips.exists(this._class)) this._source = com.haxepunk.graphics.Image._flips.get(this._class); else {
				this._source = com.haxepunk.HXP.createBitmap(this._source.get_width(),this._source.get_height(),true);
				com.haxepunk.graphics.Image._flips.set(this._class,this._source);
				com.haxepunk.HXP.matrix.identity();
				com.haxepunk.HXP.matrix.a = -1;
				com.haxepunk.HXP.matrix.set_tx(this._source.get_width());
				this._source.draw(temp,com.haxepunk.HXP.matrix);
			}
			this._flip = temp;
			this.updateBuffer();
		}
		return this._flipped;
	}
	,getFlipped: function() {
		return this._flipped;
	}
	,setColor: function(value) {
		value &= 16777215;
		if(this._color == value) return value;
		this._color = value;
		if(this._blit) {
			if(this._alpha == 1 && this._color == 16777215) this._tint = null; else {
				this._tint = this._colorTransform;
				this._tint.redMultiplier = (this._color >> 16 & 255) / 255;
				this._tint.greenMultiplier = (this._color >> 8 & 255) / 255;
				this._tint.blueMultiplier = (this._color & 255) / 255;
				this._tint.alphaMultiplier = this._alpha;
			}
			this.updateBuffer();
		}
		return this._color;
	}
	,getColor: function() {
		return this._color;
	}
	,setAlpha: function(value) {
		value = value < 0?0:value > 1?1:value;
		if(this._alpha == value) return value;
		this._alpha = value;
		if(this._blit) {
			if(this._alpha == 1 && this._color == 16777215) this._tint = null; else {
				this._tint = this._colorTransform;
				this._tint.redMultiplier = (this._color >> 16 & 255) / 255;
				this._tint.greenMultiplier = (this._color >> 8 & 255) / 255;
				this._tint.blueMultiplier = (this._color & 255) / 255;
				this._tint.alphaMultiplier = this._alpha;
			}
			this.updateBuffer();
		}
		return this._alpha;
	}
	,getAlpha: function() {
		return this._alpha;
	}
	,updateBuffer: function(clearBefore) {
		if(clearBefore == null) clearBefore = false;
		if(this._source == null) return;
		if(clearBefore) this._buffer.fillRect(this._bufferRect,0);
		this._buffer.copyPixels(this._source,this._sourceRect,com.haxepunk.HXP.zero);
		if(this._tint != null) this._buffer.colorTransform(this._bufferRect,this._tint);
	}
	,render: function(target,point,camera,layer) {
		if(layer == null) layer = 10;
		this._point.x = point.x + this.x - this.originX - camera.x * this.scrollX;
		this._point.y = point.y + this.y - this.originY - camera.y * this.scrollY;
		if(this._blit) {
			if(this._buffer != null) {
				if(this.angle == 0 && this.scaleX * this.scale == 1 && this.scaleY * this.scale == 1 && this.blend == null) target.copyPixels(this._buffer,this._bufferRect,this._point,null,null,true); else {
					this._matrix.b = this._matrix.c = 0;
					this._matrix.a = this.scaleX * this.scale;
					this._matrix.d = this.scaleY * this.scale;
					this._matrix.set_tx(-this.originX * this._matrix.a);
					this._matrix.set_ty(-this.originY * this._matrix.d);
					if(this.angle != 0) this._matrix.rotate(this.angle * (Math.PI / -180));
					var _g = this._matrix;
					_g.set_tx(_g.tx + (this.originX + this._point.x));
					var _g = this._matrix;
					_g.set_ty(_g.ty + (this.originY + this._point.y));
					target.draw(this._bitmap,this._matrix,null,this.blend,null,this.smooth);
				}
			}
		} else {
			if(this._flipped) this._point.x += this._sourceRect.width;
			var sx = com.haxepunk.HXP.screen.getFullScaleX() * this.scale * this.scaleX, sy = com.haxepunk.HXP.screen.getFullScaleY() * this.scale * this.scaleY;
			this._region.draw(this._point.x * sx,this._point.y * sy,layer,sx * (this._flipped?-1:1),sy,this.angle,(this._color >> 16 & 255) / 255,(this._color >> 8 & 255) / 255,(this._color & 255) / 255,this._alpha);
		}
	}
	,createBuffer: function() {
		this._buffer = com.haxepunk.HXP.createBitmap(this._sourceRect.width | 0,this._sourceRect.height | 0,true);
		this._bufferRect = this._buffer.rect;
		this._bitmap.set_bitmapData(this._buffer);
	}
	,setBitmapSource: function(bitmap) {
		this._blit = true;
		this._sourceRect = bitmap.rect;
		this._source = bitmap;
	}
	,__class__: com.haxepunk.graphics.Image
	,__properties__: {get_width:"getWidth",get_height:"getHeight"}
});
com.haxepunk.graphics.Spritemap = function(source,frameWidth,frameHeight,cbFunc,name) {
	if(name == null) name = "";
	if(frameHeight == null) frameHeight = 0;
	if(frameWidth == null) frameWidth = 0;
	this.complete = true;
	this.rate = 1;
	this._anims = new Hash();
	this._timer = this._frame = 0;
	this._rect = new browser.geom.Rectangle(0,0,frameWidth,frameHeight);
	if(js.Boot.__instanceof(source,com.haxepunk.graphics.atlas.TileAtlas)) {
		this._blit = false;
		this._atlas = js.Boot.__cast(source , com.haxepunk.graphics.atlas.TileAtlas);
		this._region = this._atlas.getRegion(this._frame);
	} else {
		this._blit = false;
		this._atlas = new com.haxepunk.graphics.atlas.TileAtlas(source,frameWidth,frameHeight);
		this._region = this._atlas.getRegion(this._frame);
	}
	com.haxepunk.graphics.Image.call(this,source,this._rect,name);
	if(this._blit) {
		this._width = this._source.get_width();
		this._height = this._source.get_height();
	} else {
		this._width = this._atlas.width | 0;
		this._height = this._atlas.height | 0;
	}
	if(frameWidth == 0) this._rect.width = this._width;
	if(frameHeight == 0) this._rect.height = this._height;
	this._columns = Math.ceil(this._width / this._rect.width);
	this._rows = Math.ceil(this._height / this._rect.height);
	this._frameCount = this._columns * this._rows;
	this.callbackFunc = cbFunc;
	this.updateBuffer();
	this.active = true;
};
$hxClasses["com.haxepunk.graphics.Spritemap"] = com.haxepunk.graphics.Spritemap;
com.haxepunk.graphics.Spritemap.__name__ = ["com","haxepunk","graphics","Spritemap"];
com.haxepunk.graphics.Spritemap.__super__ = com.haxepunk.graphics.Image;
com.haxepunk.graphics.Spritemap.prototype = $extend(com.haxepunk.graphics.Image.prototype,{
	getCurrentAnim: function() {
		return this._anim != null?this._anim.name:"";
	}
	,getRows: function() {
		return this._rows;
	}
	,getColumns: function() {
		return this._columns;
	}
	,getFrameCount: function() {
		return this._frameCount;
	}
	,setIndex: function(value) {
		if(this._anim == null) return 0;
		value %= this._anim.frameCount;
		if(this._index == value) return this._index;
		this._index = value;
		this._frame = this._anim.frames[this._index];
		this.updateBuffer();
		return this._index;
	}
	,getIndex: function() {
		return this._anim != null?this._index:0;
	}
	,setFrameIndex: function(value) {
		this._anim = null;
		value %= this._frameCount;
		if(value < 0) value = this._frameCount + value;
		if(this._frame == value) return this._frame;
		this._frame = value;
		this.updateBuffer();
		return this._frame;
	}
	,getFrameIndex: function() {
		return this._frame;
	}
	,play: function(name,reset) {
		if(reset == null) reset = false;
		if(name == null) name = "";
		if(!reset && this._anim != null && this._anim.name == name) return this._anim;
		if(this._anims.exists(name)) {
			this._anim = this._anims.get(name);
			this._timer = this._index = 0;
			this._frame = this._anim.frames[0];
			this.complete = false;
		} else {
			this._anim = null;
			this._frame = this._index = 0;
			this.complete = true;
		}
		this.updateBuffer();
		return this._anim;
	}
	,add: function(name,frames,frameRate,loop) {
		if(loop == null) loop = true;
		if(frameRate == null) frameRate = 0;
		if(this._anims.get(name) != null) throw "Cannot have multiple animations with the same name";
		var _g1 = 0, _g = frames.length;
		while(_g1 < _g) {
			var i = _g1++;
			frames[i] %= this._frameCount;
			if(frames[i] < 0) frames[i] += this._frameCount;
		}
		var anim = new com.haxepunk.graphics.Animation(name,frames,frameRate,loop);
		this._anims.set(name,anim);
		anim.setParent(this);
		return anim;
	}
	,update: function() {
		if(this._anim != null && !this.complete) {
			this._timer += (com.haxepunk.HXP.fixed?this._anim.frameRate:this._anim.frameRate * com.haxepunk.HXP.elapsed) * this.rate;
			if(this._timer >= 1) {
				while(this._timer >= 1) {
					this._timer--;
					this._index++;
					if(this._index == this._anim.frameCount) {
						if(this._anim.loop) {
							this._index = 0;
							if(this.callbackFunc != null) this.callbackFunc();
						} else {
							this._index = this._anim.frameCount - 1;
							this.complete = true;
							if(this.callbackFunc != null) this.callbackFunc();
							break;
						}
					}
				}
				if(this._anim != null) this._frame = this._anim.frames[this._index] | 0;
				this.updateBuffer();
			}
		}
	}
	,updateBuffer: function(clearBefore) {
		if(clearBefore == null) clearBefore = false;
		if(this._blit) {
			this._rect.x = this._rect.width * this._frame;
			this._rect.y = (this._rect.x / this._width | 0) * this._rect.height;
			this._rect.x = this._rect.x % this._width;
			if(this._flipped) this._rect.x = this._width - this._rect.width - this._rect.x;
			com.haxepunk.graphics.Image.prototype.updateBuffer.call(this,clearBefore);
		} else this._region = this._atlas.getRegion(this._frame);
	}
	,__class__: com.haxepunk.graphics.Spritemap
});
com.haxepunk.graphics.Text = function() { }
$hxClasses["com.haxepunk.graphics.Text"] = com.haxepunk.graphics.Text;
com.haxepunk.graphics.Text.__name__ = ["com","haxepunk","graphics","Text"];
com.haxepunk.graphics.Text.__super__ = com.haxepunk.graphics.Image;
com.haxepunk.graphics.Text.prototype = $extend(com.haxepunk.graphics.Image.prototype,{
	setSize: function(value) {
		if(this.size == value) return value;
		this._form.size = this.size = value;
		this.updateBuffer();
		return value;
	}
	,setFont: function(value) {
		if(this.font == value) return value;
		value = nme.installer.Assets.getFont(value).fontName;
		this._form.font = this.font = value;
		this.updateBuffer();
		return this.font;
	}
	,setText: function(value) {
		if(this.text == value) return value;
		this._field.set_text(this.text = value);
		this.updateBuffer();
		return this.text;
	}
	,updateBuffer: function(clearBefore) {
		if(clearBefore == null) clearBefore = false;
		this._field.setTextFormat(this._form);
		this._field.set_width(this.getWidth());
		this._field.set_width(this.textWidth = Math.ceil(this._field.get_textWidth() + 4));
		this._field.set_height(this.textHeight = Math.ceil(this._field.get_textHeight() + 4));
		if(this.resizable) {
			this._bufferRect.width = this.textWidth;
			this._bufferRect.height = this.textHeight;
		}
		if(this.textWidth > this._source.get_width() || this.textHeight > this._source.get_height()) {
			this._source = com.haxepunk.HXP.createBitmap(Math.max(this.textWidth,this._source.get_width()) | 0,Math.max(this.textHeight,this._source.get_height()) | 0,true);
			this._sourceRect = this._source.rect;
			this.createBuffer();
		} else this._source.fillRect(this._sourceRect,0);
		if(this.resizable) {
			this._field.set_width(this.textWidth);
			this._field.set_height(this.textHeight);
		}
		(js.Boot.__cast(this._source , browser.display.BitmapData)).draw(this._field);
		com.haxepunk.graphics.Image.prototype.updateBuffer.call(this,clearBefore);
	}
	,__class__: com.haxepunk.graphics.Text
	,__properties__: $extend(com.haxepunk.graphics.Image.prototype.__properties__,{set_text:"setText",set_font:"setFont",set_size:"setSize"})
});
com.haxepunk.graphics.atlas = {}
com.haxepunk.graphics.atlas.Layer = function() {
	this.data = new Array();
	{
		if(this.index < this.data.length) this.data.splice(this.index,this.data.length - this.index);
		this.index = 0;
		this.dirty = false;
	}
};
$hxClasses["com.haxepunk.graphics.atlas.Layer"] = com.haxepunk.graphics.atlas.Layer;
com.haxepunk.graphics.atlas.Layer.__name__ = ["com","haxepunk","graphics","atlas","Layer"];
com.haxepunk.graphics.atlas.Layer.prototype = {
	__class__: com.haxepunk.graphics.atlas.Layer
}
com.haxepunk.graphics.atlas.Atlas = function(bd) {
	this._layers = new IntHash();
	this._tilesheet = new browser.display.Tilesheet(bd);
	this.width = bd._nmeTextureBuffer != null?bd._nmeTextureBuffer.width:0;
	this.height = bd._nmeTextureBuffer != null?bd._nmeTextureBuffer.height:0;
	this._renderFlags = 28;
	com.haxepunk.graphics.atlas.Atlas._atlases.push(this);
};
$hxClasses["com.haxepunk.graphics.atlas.Atlas"] = com.haxepunk.graphics.atlas.Atlas;
com.haxepunk.graphics.atlas.Atlas.__name__ = ["com","haxepunk","graphics","atlas","Atlas"];
com.haxepunk.graphics.atlas.Atlas.renderAll = function(smooth) {
	if(smooth == null) smooth = false;
	var $it0 = com.haxepunk.graphics.atlas.Atlas._sprites.iterator();
	while( $it0.hasNext() ) {
		var sprite = $it0.next();
		sprite.get_graphics().clear();
	}
	if(com.haxepunk.graphics.atlas.Atlas._atlases.length > 0) {
		var _g = 0, _g1 = com.haxepunk.graphics.atlas.Atlas._atlases;
		while(_g < _g1.length) {
			var atlas = _g1[_g];
			++_g;
			atlas.render(smooth);
		}
	}
}
com.haxepunk.graphics.atlas.Atlas.getSpriteByLayer = function(layer) {
	if(com.haxepunk.graphics.atlas.Atlas._sprites.exists(layer)) return com.haxepunk.graphics.atlas.Atlas._sprites.get(layer); else {
		var sprite = new browser.display.Sprite();
		var idx = 0;
		var $it0 = com.haxepunk.graphics.atlas.Atlas._sprites.keys();
		while( $it0.hasNext() ) {
			var l = $it0.next();
			if(l < layer) break;
			idx += 1;
		}
		com.haxepunk.graphics.atlas.Atlas._sprites.set(layer,sprite);
		com.haxepunk.HXP.engine.addChildAt(sprite,idx);
		return sprite;
	}
}
com.haxepunk.graphics.atlas.Atlas.prototype = {
	prepareTile: function(tile,x,y,layer,scaleX,scaleY,angle,red,green,blue,alpha) {
		if(this._layerIndex != layer) {
			if(this._layers.exists(layer)) this._layer = this._layers.get(layer); else {
				this._layer = new com.haxepunk.graphics.atlas.Layer();
				this._layers.set(layer,this._layer);
			}
			this._layerIndex = layer;
		}
		var d = this._layer.data;
		this._layer.dirty = true;
		d[this._layer.index++] = x;
		d[this._layer.index++] = y;
		d[this._layer.index++] = tile;
		if(angle == 0) {
			d[this._layer.index++] = scaleX;
			d[this._layer.index++] = 0;
			d[this._layer.index++] = 0;
			d[this._layer.index++] = scaleY;
		} else {
			var cos = Math.cos(angle * (Math.PI / -180));
			var sin = Math.sin(angle * (Math.PI / -180));
			d[this._layer.index++] = cos * scaleX;
			d[this._layer.index++] = sin * scaleX;
			d[this._layer.index++] = -sin * scaleY;
			d[this._layer.index++] = cos * scaleY;
		}
		d[this._layer.index++] = red;
		d[this._layer.index++] = green;
		d[this._layer.index++] = blue;
		d[this._layer.index++] = alpha;
	}
	,render: function(smooth) {
		if(smooth == null) smooth = false;
		var l;
		var $it0 = this._layers.keys();
		while( $it0.hasNext() ) {
			var layer = $it0.next();
			l = this._layers.get(layer);
			if(l.dirty) {
				{
					if(l.index < l.data.length) l.data.splice(l.index,l.data.length - l.index);
					l.index = 0;
					l.dirty = false;
				}
				com.haxepunk.graphics.atlas.Atlas.getSpriteByLayer(layer).get_graphics().drawTiles(this._tilesheet,l.data,smooth,this._renderFlags);
			}
		}
	}
	,__class__: com.haxepunk.graphics.atlas.Atlas
}
com.haxepunk.graphics.atlas.AtlasRegion = function(parent,tileIndex,width,height) {
	this.parent = parent;
	this.tileIndex = tileIndex;
	this.width = width;
	this.height = height;
};
$hxClasses["com.haxepunk.graphics.atlas.AtlasRegion"] = com.haxepunk.graphics.atlas.AtlasRegion;
com.haxepunk.graphics.atlas.AtlasRegion.__name__ = ["com","haxepunk","graphics","atlas","AtlasRegion"];
com.haxepunk.graphics.atlas.AtlasRegion.prototype = {
	draw: function(x,y,layer,scaleX,scaleY,angle,red,green,blue,alpha) {
		if(alpha == null) alpha = 1;
		if(blue == null) blue = 1;
		if(green == null) green = 1;
		if(red == null) red = 1;
		if(angle == null) angle = 0;
		if(scaleY == null) scaleY = 1;
		if(scaleX == null) scaleX = 1;
		if(this.rotated) angle = angle - 90;
		this.parent.prepareTile(this.tileIndex,x,y,layer,scaleX,scaleY,angle,red,green,blue,alpha);
	}
	,__class__: com.haxepunk.graphics.atlas.AtlasRegion
}
com.haxepunk.graphics.atlas.TextureAtlas = function(source) {
	var bd;
	if(js.Boot.__instanceof(source,browser.display.BitmapData)) bd = source; else bd = com.haxepunk.HXP.getBitmap(source);
	this._regions = new Hash();
	this._index = 0;
	com.haxepunk.graphics.atlas.Atlas.call(this,bd);
};
$hxClasses["com.haxepunk.graphics.atlas.TextureAtlas"] = com.haxepunk.graphics.atlas.TextureAtlas;
com.haxepunk.graphics.atlas.TextureAtlas.__name__ = ["com","haxepunk","graphics","atlas","TextureAtlas"];
com.haxepunk.graphics.atlas.TextureAtlas.__super__ = com.haxepunk.graphics.atlas.Atlas;
com.haxepunk.graphics.atlas.TextureAtlas.prototype = $extend(com.haxepunk.graphics.atlas.Atlas.prototype,{
	getRegion: function(name) {
		if(this._regions.exists(name)) return this._regions.get(name);
		throw "Region has not be defined yet: " + name;
	}
	,__class__: com.haxepunk.graphics.atlas.TextureAtlas
});
com.haxepunk.graphics.atlas.TileAtlas = function(source,tileWidth,tileHeight) {
	var bd;
	if(js.Boot.__instanceof(source,browser.display.BitmapData)) bd = source; else bd = com.haxepunk.HXP.getBitmap(source);
	this._regions = new IntHash();
	com.haxepunk.graphics.atlas.Atlas.call(this,bd);
	this.prepareTiles(bd._nmeTextureBuffer != null?bd._nmeTextureBuffer.width:0,bd._nmeTextureBuffer != null?bd._nmeTextureBuffer.height:0,tileWidth,tileHeight);
};
$hxClasses["com.haxepunk.graphics.atlas.TileAtlas"] = com.haxepunk.graphics.atlas.TileAtlas;
com.haxepunk.graphics.atlas.TileAtlas.__name__ = ["com","haxepunk","graphics","atlas","TileAtlas"];
com.haxepunk.graphics.atlas.TileAtlas.__super__ = com.haxepunk.graphics.atlas.Atlas;
com.haxepunk.graphics.atlas.TileAtlas.prototype = $extend(com.haxepunk.graphics.atlas.Atlas.prototype,{
	prepareTiles: function(width,height,tileWidth,tileHeight) {
		var tile = 0;
		var cols = Math.floor(width / tileWidth);
		var rows = Math.floor(height / tileHeight);
		com.haxepunk.HXP.rect.width = tileWidth;
		com.haxepunk.HXP.rect.height = tileHeight;
		com.haxepunk.HXP.point.x = com.haxepunk.HXP.point.y = 0;
		var _g = 0;
		while(_g < rows) {
			var y = _g++;
			com.haxepunk.HXP.rect.y = y * tileHeight;
			var _g1 = 0;
			while(_g1 < cols) {
				var x = _g1++;
				com.haxepunk.HXP.rect.x = x * tileWidth;
				this._tilesheet.addTileRect(com.haxepunk.HXP.rect,com.haxepunk.HXP.point);
				this._regions.set(tile,new com.haxepunk.graphics.atlas.AtlasRegion(this,tile,tileWidth,tileHeight));
				tile += 1;
			}
		}
	}
	,getRegion: function(index) {
		return this._regions.get(index);
	}
	,__class__: com.haxepunk.graphics.atlas.TileAtlas
});
com.haxepunk.masks = {}
com.haxepunk.masks.Hitbox = function(width,height,x,y) {
	if(y == null) y = 0;
	if(x == null) x = 0;
	if(height == null) height = 1;
	if(width == null) width = 1;
	com.haxepunk.Mask.call(this);
	this._width = width;
	this._height = height;
	this._x = x;
	this._y = y;
	this._check.set(Type.getClassName(com.haxepunk.masks.Hitbox),$bind(this,this.collideHitbox));
};
$hxClasses["com.haxepunk.masks.Hitbox"] = com.haxepunk.masks.Hitbox;
com.haxepunk.masks.Hitbox.__name__ = ["com","haxepunk","masks","Hitbox"];
com.haxepunk.masks.Hitbox.__super__ = com.haxepunk.Mask;
com.haxepunk.masks.Hitbox.prototype = $extend(com.haxepunk.Mask.prototype,{
	update: function() {
		if(this.parent != null) {
			this.parent.originX = -this._x;
			this.parent.originY = -this._y;
			this.parent.width = this._width;
			this.parent.height = this._height;
			if(this.list != null) this.list.update();
		}
	}
	,setHeight: function(value) {
		if(this._height == value) return value;
		this._height = value;
		if(this.list != null) this.list.update(); else if(this.parent != null) this.update();
		return this._height;
	}
	,getHeight: function() {
		return this._height;
	}
	,setWidth: function(value) {
		if(this._width == value) return value;
		this._width = value;
		if(this.list != null) this.list.update(); else if(this.parent != null) this.update();
		return this._width;
	}
	,getWidth: function() {
		return this._width;
	}
	,setY: function(value) {
		if(this._y == value) return value;
		this._y = value;
		if(this.list != null) this.list.update(); else if(this.parent != null) this.update();
		return this._y;
	}
	,getY: function() {
		return this._y;
	}
	,setX: function(value) {
		if(this._x == value) return value;
		this._x = value;
		if(this.list != null) this.list.update(); else if(this.parent != null) this.update();
		return this._x;
	}
	,getX: function() {
		return this._x;
	}
	,collideHitbox: function(other) {
		return this.parent.x + this._x + this._width > other.parent.x + other._x && this.parent.y + this._y + this._height > other.parent.y + other._y && this.parent.x + this._x < other.parent.x + other._x + other._width && this.parent.y + this._y < other.parent.y + other._y + other._height;
	}
	,collideMask: function(other) {
		return this.parent.x + this._x + this._width > other.parent.x - other.parent.originX && this.parent.y + this._y + this._height > other.parent.y - other.parent.originY && this.parent.x + this._x < other.parent.x - other.parent.originX + other.parent.width && this.parent.y + this._y < other.parent.y - other.parent.originY + other.parent.height;
	}
	,__class__: com.haxepunk.masks.Hitbox
	,__properties__: {set_x:"setX",get_x:"getX",set_y:"setY",get_y:"getY",set_width:"setWidth",get_width:"getWidth",set_height:"setHeight",get_height:"getHeight"}
});
com.haxepunk.masks.Circle = function(radius,x,y) {
	if(y == null) y = 0;
	if(x == null) x = 0;
	if(radius == null) radius = 1;
	com.haxepunk.masks.Hitbox.call(this);
	this.setRadius(radius);
	this._x = x + radius;
	this._y = y + radius;
	this._check.set(Type.getClassName(com.haxepunk.Mask),$bind(this,this.collideMask));
	this._check.set(Type.getClassName(com.haxepunk.masks.Circle),$bind(this,this.collideCircle));
	this._check.set(Type.getClassName(com.haxepunk.masks.Hitbox),$bind(this,this.collideHitbox));
	this._check.set(Type.getClassName(com.haxepunk.masks.Grid),$bind(this,this.collideGrid));
};
$hxClasses["com.haxepunk.masks.Circle"] = com.haxepunk.masks.Circle;
com.haxepunk.masks.Circle.__name__ = ["com","haxepunk","masks","Circle"];
com.haxepunk.masks.Circle.__super__ = com.haxepunk.masks.Hitbox;
com.haxepunk.masks.Circle.prototype = $extend(com.haxepunk.masks.Hitbox.prototype,{
	update: function() {
		if(this.parent != null) {
			this.parent.originX = -this._x + this._radius;
			this.parent.originY = -this._y + this._radius;
			this.parent.height = this.parent.width = this._radius + this._radius;
			if(this.list != null) this.list.update();
		}
	}
	,setRadius: function(value) {
		if(this._radius == value) return value;
		this._radius = value;
		this._squaredRadius = value * value;
		this.setHeight(this.setWidth(this._radius + this._radius));
		if(this.list != null) this.list.update(); else if(this.parent != null) this.update();
		return this._radius;
	}
	,getY: function() {
		return this._y - this._radius;
	}
	,getX: function() {
		return this._x - this._radius;
	}
	,debugDraw: function(graphics,scaleX,scaleY) {
		graphics.drawCircle((this.parent.x + this._x - com.haxepunk.HXP.camera.x) * scaleX,(this.parent.y + this._y - com.haxepunk.HXP.camera.y) * scaleY,this._radius * scaleX);
	}
	,project: function(axis,projection) {
		projection.min = -this._radius;
		projection.max = this._radius;
	}
	,collideHitbox: function(other) {
		var dx = Math.abs(this.parent.x + this._x - other.parent.x + other.getX()), dy = Math.abs(this.parent.y + this._y - other.parent.y + other.getY());
		if(dx <= other.getWidth() || dy <= other.getHeight()) return true;
		if(dx > other.getWidth() + this._radius || dy > other.getHeight() + this._radius) return false;
		return dx * dx + dy * dy <= this._squaredRadius;
	}
	,collideGrid: function(other) {
		var thisX = this.parent.x + this._x, thisY = this.parent.y + this._y, otherX = other.parent.x + other.getX(), otherY = other.parent.y + other.getY(), entityDistX = thisX - otherX, entityDistY = thisY - otherY;
		var minx = Math.floor((entityDistX - this._radius) / (other._tile.width | 0)), miny = Math.floor((entityDistY - this._radius) / (other._tile.height | 0)), maxx = Math.ceil((entityDistX + this._radius) / (other._tile.width | 0)), maxy = Math.ceil((entityDistY + this._radius) / (other._tile.height | 0));
		if(minx < 0) minx = 0;
		if(miny < 0) miny = 0;
		if(maxx > other.columns) maxx = other.columns;
		if(maxy > other.rows) maxy = other.rows;
		var midx = Math.floor((maxx + minx) / 2), midy = Math.floor((maxy + miny) / 2), dx, dy;
		var _g = minx;
		while(_g < maxx) {
			var xx = _g++;
			var _g1 = miny;
			while(_g1 < maxy) {
				var yy = _g1++;
				if(other.getTile(xx,yy)) {
					if(xx <= midx) {
						if(yy <= midy) {
							dx = entityDistX - (xx + 1) * (other._tile.width | 0);
							dy = entityDistX - (yy + 1) * (other._tile.height | 0);
							if(dx * dx + dy * dy < this._squaredRadius) return true;
						} else {
							dx = entityDistX - (xx + 1) * (other._tile.width | 0);
							dy = entityDistX - yy * (other._tile.height | 0);
							if(dx * dx + dy * dy < this._squaredRadius) return true;
						}
					} else if(yy <= midy) {
						dx = entityDistX - xx * (other._tile.width | 0);
						dy = entityDistX - (yy + 1) * (other._tile.height | 0);
						if(dx * dx + dy * dy < this._squaredRadius) return true;
					} else {
						dx = entityDistX - xx * (other._tile.width | 0);
						dy = entityDistX - yy * (other._tile.height | 0);
						if(dx * dx + dy * dy < this._squaredRadius) return true;
					}
					return true;
				}
			}
		}
		return false;
	}
	,collideCircle: function(other) {
		var dx = this.parent.x + this._x - (other.parent.x + other._x);
		var dy = this.parent.y + this._y - (other.parent.y + other._y);
		return dx * dx + dy * dy < Math.pow(this._radius + other._radius,2);
	}
	,collideMask: function(other) {
		var distanceX = Math.abs(this.parent.x + this._x - other.parent.x - other.parent.width * 0.5), distanceY = Math.abs(this.parent.y + this._y - other.parent.y - other.parent.height * 0.5);
		if(distanceX > other.parent.width * 0.5 + this._radius || distanceY > other.parent.height * 0.5 + this._radius) return false;
		if(distanceX <= other.parent.width * 0.5 || distanceY <= other.parent.height * 0.5) return true;
		var distanceToCorner = (distanceX - other.parent.width * 0.5) * (distanceX - other.parent.width * 0.5) + (distanceY - other.parent.height * 0.5) * (distanceY - other.parent.height * 0.5);
		return distanceToCorner <= this._squaredRadius;
	}
	,__class__: com.haxepunk.masks.Circle
	,__properties__: $extend(com.haxepunk.masks.Hitbox.prototype.__properties__,{set_radius:"setRadius",get_radius:"getRadius"})
});
com.haxepunk.masks.Grid = function(width,height,tileWidth,tileHeight,x,y) {
	if(y == null) y = 0;
	if(x == null) x = 0;
	com.haxepunk.masks.Hitbox.call(this);
	if(width == 0 || height == 0 || tileWidth == 0 || tileHeight == 0) throw "Illegal Grid, sizes cannot be 0.";
	this._rect = com.haxepunk.HXP.rect;
	this._point = com.haxepunk.HXP.point;
	this._point2 = com.haxepunk.HXP.point2;
	this.columns = width / tileWidth | 0;
	this.rows = height / tileHeight | 0;
	this._tile = new browser.geom.Rectangle(0,0,tileWidth,tileHeight);
	this._x = x;
	this._y = y;
	this._width = width;
	this._height = height;
	this.usePositions = false;
	this._check.set(Type.getClassName(com.haxepunk.Mask),$bind(this,this.collideMask));
	this._check.set(Type.getClassName(com.haxepunk.masks.Hitbox),$bind(this,this.collideHitbox));
	this._check.set(Type.getClassName(com.haxepunk.masks.Pixelmask),$bind(this,this.collidePixelmask));
	this.data = new Array();
	var _g1 = 0, _g = this.rows;
	while(_g1 < _g) {
		var x1 = _g1++;
		this.data.push(new Array());
	}
};
$hxClasses["com.haxepunk.masks.Grid"] = com.haxepunk.masks.Grid;
com.haxepunk.masks.Grid.__name__ = ["com","haxepunk","masks","Grid"];
com.haxepunk.masks.Grid.__super__ = com.haxepunk.masks.Hitbox;
com.haxepunk.masks.Grid.prototype = $extend(com.haxepunk.masks.Hitbox.prototype,{
	debugDraw: function(graphics,scaleX,scaleY) {
		com.haxepunk.HXP.point.x = this._x + this.parent.x - com.haxepunk.HXP.camera.x;
		com.haxepunk.HXP.point.y = this._y + this.parent.y - com.haxepunk.HXP.camera.y;
		var color = -16776961;
		com.haxepunk.HXP.buffer.lock();
		var _g1 = 1, _g = this.columns;
		while(_g1 < _g) {
			var i = _g1++;
			com.haxepunk.HXP.rect.x = com.haxepunk.HXP.point.x + i * (this._tile.width | 0);
			com.haxepunk.HXP.rect.y = com.haxepunk.HXP.point.y;
			com.haxepunk.HXP.rect.width = 1;
			com.haxepunk.HXP.rect.height = this._height;
			com.haxepunk.HXP.buffer.fillRect(com.haxepunk.HXP.rect,color);
		}
		var _g1 = 1, _g = this.rows;
		while(_g1 < _g) {
			var i = _g1++;
			com.haxepunk.HXP.rect.x = com.haxepunk.HXP.point.x;
			com.haxepunk.HXP.rect.y = com.haxepunk.HXP.point.y + i * (this._tile.height | 0);
			com.haxepunk.HXP.rect.width = this._width;
			com.haxepunk.HXP.rect.height = 1;
			com.haxepunk.HXP.buffer.fillRect(com.haxepunk.HXP.rect,color);
		}
		com.haxepunk.HXP.rect.width = this._tile.width | 0;
		com.haxepunk.HXP.rect.height = this._tile.height | 0;
		var _g1 = 0, _g = this.rows;
		while(_g1 < _g) {
			var y = _g1++;
			com.haxepunk.HXP.rect.y = com.haxepunk.HXP.point.y + y * (this._tile.height | 0);
			var _g3 = 0, _g2 = this.columns;
			while(_g3 < _g2) {
				var x = _g3++;
				com.haxepunk.HXP.rect.x = com.haxepunk.HXP.point.x + x * (this._tile.width | 0);
				if(this.data[y][x]) com.haxepunk.HXP.buffer.fillRect(com.haxepunk.HXP.rect,color);
			}
		}
		com.haxepunk.HXP.buffer.unlock();
	}
	,collidePixelmask: function(other) {
		console.log("Pixelmasks will not work in targets other than flash due to hittest not being implemented in NME.");
		return false;
	}
	,collideHitbox: function(other) {
		var rectX, rectY, pointX, pointY;
		this._rect.x = other.parent.x - other._x - this.parent.x + this._x;
		this._rect.y = other.parent.y - other._y - this.parent.y + this._y;
		pointX = ((this._rect.x + other._width - 1) / this._tile.width | 0) + 1;
		pointY = ((this._rect.y + other._height - 1) / this._tile.height | 0) + 1;
		rectX = this._rect.x / this._tile.width | 0;
		rectY = this._rect.y / this._tile.height | 0;
		var _g = rectY;
		while(_g < pointY) {
			var dy = _g++;
			var _g1 = rectX;
			while(_g1 < pointX) {
				var dx = _g1++;
				if(this.getTile(dx,dy)) return true;
			}
		}
		return false;
	}
	,collideMask: function(other) {
		var rectX, rectY, pointX, pointY;
		this._rect.x = other.parent.x - other.parent.originX - this.parent.x + this.parent.originX;
		this._rect.y = other.parent.y - other.parent.originY - this.parent.y + this.parent.originY;
		pointX = ((this._rect.x + other.parent.width - 1) / this._tile.width | 0) + 1;
		pointY = ((this._rect.y + other.parent.height - 1) / this._tile.height | 0) + 1;
		rectX = this._rect.x / this._tile.width | 0;
		rectY = this._rect.y / this._tile.height | 0;
		var _g = rectY;
		while(_g < pointY) {
			var dy = _g++;
			var _g1 = rectX;
			while(_g1 < pointX) {
				var dx = _g1++;
				if(this.getTile(dx,dy)) return true;
			}
		}
		return false;
	}
	,getTile: function(column,row) {
		if(row == null) row = 0;
		if(column == null) column = 0;
		if(!(column < 0 || column > this.columns - 1 || row < 0 || row > this.rows - 1?false:true)) return false;
		if(this.usePositions) {
			column = column / this._tile.width | 0;
			row = row / this._tile.height | 0;
		}
		return this.data[row][column];
	}
	,__class__: com.haxepunk.masks.Grid
	,__properties__: $extend(com.haxepunk.masks.Hitbox.prototype.__properties__,{get_tileWidth:"getTileWidth",get_tileHeight:"getTileHeight"})
});
com.haxepunk.masks.Masklist = function(masks) {
	com.haxepunk.masks.Hitbox.call(this);
	this._masks = new Array();
	this._temp = new Array();
	this._count = 0;
	var _g = 0;
	while(_g < masks.length) {
		var m = masks[_g];
		++_g;
		this.add(m);
	}
};
$hxClasses["com.haxepunk.masks.Masklist"] = com.haxepunk.masks.Masklist;
com.haxepunk.masks.Masklist.__name__ = ["com","haxepunk","masks","Masklist"];
com.haxepunk.masks.Masklist.__super__ = com.haxepunk.masks.Hitbox;
com.haxepunk.masks.Masklist.prototype = $extend(com.haxepunk.masks.Hitbox.prototype,{
	getCount: function() {
		return this._count;
	}
	,debugDraw: function(graphics,scaleX,scaleY) {
		var _g = 0, _g1 = this._masks;
		while(_g < _g1.length) {
			var m = _g1[_g];
			++_g;
			m.debugDraw(graphics,scaleX,scaleY);
		}
	}
	,update: function() {
		var t = 0, l = 0, r = 0, b = 0, h;
		var _g = 0, _g1 = this._masks;
		while(_g < _g1.length) {
			var m = _g1[_g];
			++_g;
			if((h = js.Boot.__cast(m , com.haxepunk.masks.Hitbox)) != null) {
				if(h.getX() < l) l = h.getX();
				if(h.getY() < t) t = h.getY();
				if(h.getX() + h.getWidth() > r) r = h.getX() + h.getWidth();
				if(h.getY() + h.getHeight() > b) b = h.getY() + h.getHeight();
			}
		}
		this._x = l;
		this._y = t;
		this._width = r - l;
		this._height = b - t;
		com.haxepunk.masks.Hitbox.prototype.update.call(this);
	}
	,assignTo: function(parent) {
		var _g = 0, _g1 = this._masks;
		while(_g < _g1.length) {
			var m = _g1[_g];
			++_g;
			m.parent = parent;
		}
		com.haxepunk.masks.Hitbox.prototype.assignTo.call(this,parent);
	}
	,add: function(mask) {
		this._masks[this._count++] = mask;
		mask.list = this;
		mask.parent = this.parent;
		this.update();
		return mask;
	}
	,collideMasklist: function(other) {
		var _g = 0, _g1 = this._masks;
		while(_g < _g1.length) {
			var a = _g1[_g];
			++_g;
			var _g2 = 0, _g3 = other._masks;
			while(_g2 < _g3.length) {
				var b = _g3[_g2];
				++_g2;
				if(a.collide(b)) return true;
			}
		}
		return true;
	}
	,collide: function(mask) {
		var _g = 0, _g1 = this._masks;
		while(_g < _g1.length) {
			var m = _g1[_g];
			++_g;
			if(m.collide(mask)) return true;
		}
		return false;
	}
	,__class__: com.haxepunk.masks.Masklist
});
com.haxepunk.masks.Pixelmask = function(source,x,y) {
	if(y == null) y = 0;
	if(x == null) x = 0;
	com.haxepunk.masks.Hitbox.call(this);
	if(js.Boot.__instanceof(source,browser.display.BitmapData)) this._data = source; else this._data = com.haxepunk.HXP.getBitmap(source);
	if(this._data == null) throw "Invalid Pixelmask source image.";
	this.threshold = 1;
	this._rect = com.haxepunk.HXP.rect;
	this._point = com.haxepunk.HXP.point;
	this._point2 = com.haxepunk.HXP.point2;
	this._width = this.getData().get_width();
	this._height = this.getData().get_height();
	this._x = x;
	this._y = y;
	this._check.set(Type.getClassName(com.haxepunk.Mask),$bind(this,this.collideMask));
	this._check.set(Type.getClassName(com.haxepunk.masks.Pixelmask),$bind(this,this.collidePixelmask));
	this._check.set(Type.getClassName(com.haxepunk.masks.Hitbox),$bind(this,this.collideHitbox));
};
$hxClasses["com.haxepunk.masks.Pixelmask"] = com.haxepunk.masks.Pixelmask;
com.haxepunk.masks.Pixelmask.__name__ = ["com","haxepunk","masks","Pixelmask"];
com.haxepunk.masks.Pixelmask.__super__ = com.haxepunk.masks.Hitbox;
com.haxepunk.masks.Pixelmask.prototype = $extend(com.haxepunk.masks.Hitbox.prototype,{
	setData: function(value) {
		this._data = value;
		this._width = value._nmeTextureBuffer != null?value._nmeTextureBuffer.width:0;
		this._height = value._nmeTextureBuffer != null?value._nmeTextureBuffer.height:0;
		this.update();
		return this._data;
	}
	,getData: function() {
		return this._data;
	}
	,collidePixelmask: function(other) {
		this._point.x = this.parent.x + this._x;
		this._point.y = this.parent.y + this._y;
		this._point2.x = other.parent.x + other._x;
		this._point2.y = other.parent.y + other._y;
		return false;
	}
	,collideHitbox: function(other) {
		this._point.x = this.parent.x + this._x;
		this._point.y = this.parent.y + this._y;
		this._rect.x = other.parent.x + other._x;
		this._rect.y = other.parent.y + other._y;
		this._rect.width = other._width;
		this._rect.height = other._height;
		return false;
	}
	,collideMask: function(other) {
		this._point.x = this.parent.x + this._x;
		this._point.y = this.parent.y + this._y;
		this._rect.x = other.parent.x - other.parent.originX;
		this._rect.y = other.parent.y - other.parent.originY;
		this._rect.width = other.parent.width;
		this._rect.height = other.parent.height;
		return false;
	}
	,__class__: com.haxepunk.masks.Pixelmask
	,__properties__: $extend(com.haxepunk.masks.Hitbox.prototype.__properties__,{set_data:"setData",get_data:"getData"})
});
com.haxepunk.math = {}
com.haxepunk.math.Vector = function(x,y) {
	if(y == null) y = 0;
	if(x == null) x = 0;
	browser.geom.Point.call(this,x,y);
};
$hxClasses["com.haxepunk.math.Vector"] = com.haxepunk.math.Vector;
com.haxepunk.math.Vector.__name__ = ["com","haxepunk","math","Vector"];
com.haxepunk.math.Vector.__super__ = browser.geom.Point;
com.haxepunk.math.Vector.prototype = $extend(browser.geom.Point.prototype,{
	dot: function(p) {
		return this.x * p.x + this.y * p.y;
	}
	,__class__: com.haxepunk.math.Vector
});
com.haxepunk.math.Projection = function() {
	this.max = this.min = 0;
};
$hxClasses["com.haxepunk.math.Projection"] = com.haxepunk.math.Projection;
com.haxepunk.math.Projection.__name__ = ["com","haxepunk","math","Projection"];
com.haxepunk.math.Projection.prototype = {
	overlaps: function(other) {
		return this.min > other.max || this.max < other.min;
	}
	,__class__: com.haxepunk.math.Projection
}
com.haxepunk.masks.Polygon = function(points,origin) {
	com.haxepunk.masks.Hitbox.call(this);
	this._points = points;
	this._check.set(Type.getClassName(com.haxepunk.masks.Hitbox),$bind(this,this.collideHitbox));
	this._check.set(Type.getClassName(com.haxepunk.masks.Circle),$bind(this,this.collideCircle));
	this._check.set(Type.getClassName(com.haxepunk.masks.Polygon),$bind(this,this.collidePolygon));
	this._check.set(Type.getClassName(com.haxepunk.masks.Grid),$bind(this,this.collideGrid));
	this.origin = origin != null?origin:new browser.geom.Point();
	this._angle = 0;
	this.generateAxes();
	this.removeDuplicateAxes();
	this.update();
};
$hxClasses["com.haxepunk.masks.Polygon"] = com.haxepunk.masks.Polygon;
com.haxepunk.masks.Polygon.__name__ = ["com","haxepunk","masks","Polygon"];
com.haxepunk.masks.Polygon.__super__ = com.haxepunk.masks.Hitbox;
com.haxepunk.masks.Polygon.prototype = $extend(com.haxepunk.masks.Hitbox.prototype,{
	update: function() {
		this.project(com.haxepunk.masks.Polygon.horizontal,com.haxepunk.masks.Polygon.firstProj);
		this._x = Math.ceil(com.haxepunk.masks.Polygon.firstProj.min);
		this._width = Math.ceil(com.haxepunk.masks.Polygon.firstProj.max - com.haxepunk.masks.Polygon.firstProj.min);
		this.project(com.haxepunk.masks.Polygon.vertical,com.haxepunk.masks.Polygon.secondProj);
		this._y = Math.ceil(com.haxepunk.masks.Polygon.secondProj.min);
		this._height = Math.ceil(com.haxepunk.masks.Polygon.secondProj.max - com.haxepunk.masks.Polygon.secondProj.min);
		if(this.parent != null) {
			this.parent.width = this._width;
			this.parent.height = this._height;
			this.parent.originX = (this._width - com.haxepunk.masks.Polygon.firstProj.max - com.haxepunk.masks.Polygon.firstProj.min) / 2 | 0;
			this.parent.originY = (this._height - com.haxepunk.masks.Polygon.secondProj.max - com.haxepunk.masks.Polygon.secondProj.min) / 2 | 0;
		}
		if(this.list != null) this.list.update();
	}
	,setPoints: function(value) {
		if(this._points == value) return value;
		this._points = value;
		if(this.list != null || this.parent != null) {
			this.generateAxes();
			this.removeDuplicateAxes();
			this.update();
		}
		return this._points;
	}
	,setAngle: function(value) {
		if(value == this._angle) return value;
		this.rotate(this._angle - value);
		if(this.list != null || this.parent != null) this.update();
		return this._angle = value;
	}
	,debugDraw: function(graphics,scaleX,scaleY) {
		if(this.parent != null) {
			var offsetX = this.parent.x - com.haxepunk.HXP.camera.x, offsetY = this.parent.y - com.haxepunk.HXP.camera.y;
			graphics.moveTo((this._points[this._points.length - 1].x + offsetX) * scaleX,(this._points[this._points.length - 1].y + offsetY) * scaleY);
			var _g1 = 0, _g = this._points.length;
			while(_g1 < _g) {
				var ii = _g1++;
				graphics.lineTo((this._points[ii].x + offsetX) * scaleX,(this._points[ii].y + offsetY) * scaleY);
			}
		}
	}
	,rotate: function(angle) {
		angle *= Math.PI / -180;
		var _g = 0, _g1 = this._points;
		while(_g < _g1.length) {
			var p = _g1[_g];
			++_g;
			var dx = p.x - this.origin.x;
			var dy = p.y - this.origin.y;
			var pointAngle = Math.atan2(dy,dx);
			var length = Math.sqrt(dx * dx + dy * dy);
			p.x = Math.cos(pointAngle + angle) * length + this.origin.x;
			p.y = Math.sin(pointAngle + angle) * length + this.origin.y;
		}
		var _g = 0, _g1 = this._axes;
		while(_g < _g1.length) {
			var ax = _g1[_g];
			++_g;
			var axisAngle = Math.atan2(ax.y,ax.x);
			ax.x = Math.cos(axisAngle + angle);
			ax.y = Math.sin(axisAngle + angle);
		}
		this._angle += angle;
	}
	,project: function(axis,projection) {
		var min = axis.dot(this._points[0]), max = min;
		var _g1 = 1, _g = this._points.length;
		while(_g1 < _g) {
			var i = _g1++;
			var cur = axis.dot(this._points[i]);
			if(cur < min) min = cur; else if(cur > max) max = cur;
		}
		projection.min = min;
		projection.max = max;
	}
	,collidePolygon: function(other) {
		var offsetX = this.parent.x - other.parent.x;
		var offsetY = this.parent.y - other.parent.y;
		var _g = 0, _g1 = this._axes;
		while(_g < _g1.length) {
			var a = _g1[_g];
			++_g;
			this.project(a,com.haxepunk.masks.Polygon.firstProj);
			other.project(a,com.haxepunk.masks.Polygon.secondProj);
			var offset = offsetX * a.x + offsetY * a.y;
			com.haxepunk.masks.Polygon.firstProj.min += offset;
			com.haxepunk.masks.Polygon.firstProj.max += offset;
			if(com.haxepunk.masks.Polygon.firstProj.overlaps(com.haxepunk.masks.Polygon.secondProj)) return false;
		}
		var _g = 0, _g1 = other._axes;
		while(_g < _g1.length) {
			var a = _g1[_g];
			++_g;
			this.project(a,com.haxepunk.masks.Polygon.firstProj);
			other.project(a,com.haxepunk.masks.Polygon.secondProj);
			var offset = offsetX * a.x + offsetY * a.y;
			com.haxepunk.masks.Polygon.firstProj.min += offset;
			com.haxepunk.masks.Polygon.firstProj.max += offset;
			if(com.haxepunk.masks.Polygon.firstProj.overlaps(com.haxepunk.masks.Polygon.secondProj)) return false;
		}
		return true;
	}
	,collideMask: function(other) {
		var offset, offsetX = this.parent.x - other.parent.x, offsetY = this.parent.y - other.parent.y;
		this.project(com.haxepunk.masks.Polygon.vertical,com.haxepunk.masks.Polygon.firstProj);
		other.project(com.haxepunk.masks.Polygon.vertical,com.haxepunk.masks.Polygon.secondProj);
		com.haxepunk.masks.Polygon.firstProj.min += offsetX;
		com.haxepunk.masks.Polygon.firstProj.max += offsetY;
		if(com.haxepunk.masks.Polygon.firstProj.overlaps(com.haxepunk.masks.Polygon.secondProj)) return false;
		this.project(com.haxepunk.masks.Polygon.horizontal,com.haxepunk.masks.Polygon.firstProj);
		other.project(com.haxepunk.masks.Polygon.horizontal,com.haxepunk.masks.Polygon.secondProj);
		com.haxepunk.masks.Polygon.firstProj.min += offsetX;
		com.haxepunk.masks.Polygon.firstProj.max += offsetX;
		if(com.haxepunk.masks.Polygon.firstProj.overlaps(com.haxepunk.masks.Polygon.secondProj)) return false;
		var _g = 0, _g1 = this._axes;
		while(_g < _g1.length) {
			var a = _g1[_g];
			++_g;
			this.project(a,com.haxepunk.masks.Polygon.firstProj);
			other.project(a,com.haxepunk.masks.Polygon.secondProj);
			var offset1 = offsetX * a.x + offsetY * a.y;
			com.haxepunk.masks.Polygon.firstProj.min += offset1;
			com.haxepunk.masks.Polygon.firstProj.max += offset1;
			if(com.haxepunk.masks.Polygon.firstProj.overlaps(com.haxepunk.masks.Polygon.secondProj)) return false;
		}
		return true;
	}
	,collideHitbox: function(hitbox) {
		var offset, offsetX = this.parent.x - hitbox.parent.x, offsetY = this.parent.y - hitbox.parent.y;
		this.project(com.haxepunk.masks.Polygon.vertical,com.haxepunk.masks.Polygon.firstProj);
		hitbox.project(com.haxepunk.masks.Polygon.vertical,com.haxepunk.masks.Polygon.secondProj);
		com.haxepunk.masks.Polygon.firstProj.min += offsetY;
		com.haxepunk.masks.Polygon.firstProj.max += offsetY;
		if(com.haxepunk.masks.Polygon.firstProj.overlaps(com.haxepunk.masks.Polygon.secondProj)) return false;
		this.project(com.haxepunk.masks.Polygon.horizontal,com.haxepunk.masks.Polygon.firstProj);
		hitbox.project(com.haxepunk.masks.Polygon.horizontal,com.haxepunk.masks.Polygon.secondProj);
		com.haxepunk.masks.Polygon.firstProj.min += offsetX;
		com.haxepunk.masks.Polygon.firstProj.max += offsetX;
		if(com.haxepunk.masks.Polygon.firstProj.overlaps(com.haxepunk.masks.Polygon.secondProj)) return false;
		var _g = 0, _g1 = this._axes;
		while(_g < _g1.length) {
			var a = _g1[_g];
			++_g;
			this.project(a,com.haxepunk.masks.Polygon.firstProj);
			hitbox.project(a,com.haxepunk.masks.Polygon.secondProj);
			offset = offsetX * a.x + offsetY * a.y;
			com.haxepunk.masks.Polygon.firstProj.min += offset;
			com.haxepunk.masks.Polygon.firstProj.max += offset;
			if(com.haxepunk.masks.Polygon.firstProj.overlaps(com.haxepunk.masks.Polygon.secondProj)) return false;
		}
		return true;
	}
	,collideCircle: function(circle) {
		var offset;
		var distanceSquared = 179 * Math.pow(10,306);
		var closestPoint = null;
		var _g = 0, _g1 = this._points;
		while(_g < _g1.length) {
			var p = _g1[_g];
			++_g;
			var dx = this.parent.x + p.x - circle.parent.x - circle._radius;
			var dy = this.parent.y + p.y - circle.parent.y - circle._radius;
			var tempDistance = dx * dx + dy * dy;
			if(tempDistance < distanceSquared) {
				distanceSquared = tempDistance;
				closestPoint = p;
			}
		}
		var offsetX = this.parent.x - circle.parent.x - circle._radius;
		var offsetY = this.parent.y - circle.parent.y - circle._radius;
		com.haxepunk.masks.Polygon._axis.x = circle.parent.y - this.parent.y + closestPoint.y;
		com.haxepunk.masks.Polygon._axis.y = this.parent.x + closestPoint.x - circle.parent.x;
		com.haxepunk.masks.Polygon._axis.normalize(1);
		this.project(com.haxepunk.masks.Polygon._axis,com.haxepunk.masks.Polygon.firstProj);
		circle.project(com.haxepunk.masks.Polygon._axis,com.haxepunk.masks.Polygon.secondProj);
		offset = offsetX * com.haxepunk.masks.Polygon._axis.x + offsetY * com.haxepunk.masks.Polygon._axis.y;
		com.haxepunk.masks.Polygon.firstProj.min += offset;
		com.haxepunk.masks.Polygon.firstProj.max += offset;
		if(com.haxepunk.masks.Polygon.firstProj.overlaps(com.haxepunk.masks.Polygon.secondProj)) return false;
		var _g = 0, _g1 = this._axes;
		while(_g < _g1.length) {
			var a = _g1[_g];
			++_g;
			this.project(a,com.haxepunk.masks.Polygon.firstProj);
			circle.project(a,com.haxepunk.masks.Polygon.secondProj);
			offset = offsetX * a.x + offsetY * a.y;
			com.haxepunk.masks.Polygon.firstProj.min += offset;
			com.haxepunk.masks.Polygon.firstProj.max += offset;
			if(com.haxepunk.masks.Polygon.firstProj.overlaps(com.haxepunk.masks.Polygon.secondProj)) return false;
		}
		return true;
	}
	,collideGrid: function(grid) {
		var _g1 = 0, _g = this._points.length - 1;
		while(_g1 < _g) {
			var ii = _g1++;
			var p1X = (this.parent.x + this._points[ii].x) / (grid._tile.width | 0);
			var p1Y = (this.parent.y + this._points[ii].y) / (grid._tile.height | 0);
			var p2X = (this.parent.x + this._points[ii + 1].x) / (grid._tile.width | 0);
			var p2Y = (this.parent.y + this._points[ii + 1].y) / (grid._tile.height | 0);
			var k = (p2Y - p1Y) / (p2X - p1X);
			var m = p1Y - k * p1X;
			var min;
			var max;
			if(p2X > p1X) {
				min = p1X;
				max = p2X;
			} else {
				max = p1X;
				min = p2X;
			}
			var x = min;
			while(x < max) {
				var y = k * x + m | 0;
				if(grid.getTile(x | 0,y)) return true;
				x++;
			}
		}
		var p1X = (this.parent.x + this._points[this._points.length - 1].x) / (grid._tile.width | 0);
		var p1Y = (this.parent.y + this._points[this._points.length - 1].y) / (grid._tile.height | 0);
		var p2X = (this.parent.x + this._points[0].x) / (grid._tile.width | 0);
		var p2Y = (this.parent.y + this._points[0].y) / (grid._tile.height | 0);
		var k = (p2Y - p1Y) / (p2X - p1X);
		var m = p1Y - k * p1X;
		var min;
		var max;
		if(p2X > p1X) {
			min = p1X;
			max = p2X;
		} else {
			max = p1X;
			min = p2X;
		}
		var x = min;
		while(x < max) {
			var y = k * x + m | 0;
			if(grid.getTile(x | 0,y)) return true;
			x++;
		}
		return false;
	}
	,removeDuplicateAxes: function() {
		var _g1 = 0, _g = this._axes.length;
		while(_g1 < _g) {
			var ii = _g1++;
			var _g3 = 0, _g2 = this._axes.length;
			while(_g3 < _g2) {
				var jj = _g3++;
				if(ii == jj || Math.max(ii,jj) >= this._axes.length) continue;
				if(this._axes[ii].x == this._axes[jj].x && this._axes[ii].y == this._axes[jj].y || -this._axes[ii].x == this._axes[jj].x && -this._axes[ii].y == this._axes[jj].y) this._axes.splice(jj,1);
			}
		}
	}
	,generateAxes: function() {
		this._axes = new Array();
		var store;
		var numberOfPoints = this._points.length - 1;
		var _g = 0;
		while(_g < numberOfPoints) {
			var i = _g++;
			var edge = new com.haxepunk.math.Vector();
			edge.x = this._points[i].x - this._points[i + 1].x;
			edge.y = this._points[i].y - this._points[i + 1].y;
			store = edge.y;
			edge.y = -edge.x;
			edge.x = store;
			edge.normalize(1);
			this._axes.push(edge);
		}
		var edge = new com.haxepunk.math.Vector();
		edge.x = this._points[numberOfPoints].x - this._points[0].x;
		edge.y = this._points[numberOfPoints].y - this._points[0].y;
		store = edge.y;
		edge.y = -edge.x;
		edge.x = store;
		edge.normalize(1);
		this._axes.push(edge);
	}
	,__class__: com.haxepunk.masks.Polygon
	,__properties__: $extend(com.haxepunk.masks.Hitbox.prototype.__properties__,{set_points:"setPoints",get_points:"getPoints"})
});
com.haxepunk.tweens = {}
com.haxepunk.tweens.TweenEvent = function(inType,inBubbles,inCancelable) {
	browser.events.Event.call(this,inType,inBubbles,inCancelable);
};
$hxClasses["com.haxepunk.tweens.TweenEvent"] = com.haxepunk.tweens.TweenEvent;
com.haxepunk.tweens.TweenEvent.__name__ = ["com","haxepunk","tweens","TweenEvent"];
com.haxepunk.tweens.TweenEvent.__super__ = browser.events.Event;
com.haxepunk.tweens.TweenEvent.prototype = $extend(browser.events.Event.prototype,{
	__class__: com.haxepunk.tweens.TweenEvent
});
com.haxepunk.tweens.misc = {}
com.haxepunk.tweens.misc.MultiVarTween = function() { }
$hxClasses["com.haxepunk.tweens.misc.MultiVarTween"] = com.haxepunk.tweens.misc.MultiVarTween;
com.haxepunk.tweens.misc.MultiVarTween.__name__ = ["com","haxepunk","tweens","misc","MultiVarTween"];
com.haxepunk.tweens.misc.MultiVarTween.__super__ = com.haxepunk.Tween;
com.haxepunk.tweens.misc.MultiVarTween.prototype = $extend(com.haxepunk.Tween.prototype,{
	update: function() {
		com.haxepunk.Tween.prototype.update.call(this);
		var i = this._vars.length;
		var setter;
		setter = Reflect.setProperty;
		while(i-- > 0) setter(this._object,this._vars[i],this._start[i] + this._range[i] * this._t);
	}
	,__class__: com.haxepunk.tweens.misc.MultiVarTween
});
com.haxepunk.utils = {}
com.haxepunk.utils.Draw = function() { }
$hxClasses["com.haxepunk.utils.Draw"] = com.haxepunk.utils.Draw;
com.haxepunk.utils.Draw.__name__ = ["com","haxepunk","utils","Draw"];
com.haxepunk.utils.Draw.resetTarget = function() {
	com.haxepunk.utils.Draw._target = com.haxepunk.HXP.buffer;
	com.haxepunk.utils.Draw._camera = com.haxepunk.HXP.camera;
	com.haxepunk.utils.Draw.blend = null;
}
com.haxepunk.utils.Input = function() { }
$hxClasses["com.haxepunk.utils.Input"] = com.haxepunk.utils.Input;
com.haxepunk.utils.Input.__name__ = ["com","haxepunk","utils","Input"];
com.haxepunk.utils.Input.__properties__ = {get_mouseFlashY:"getMouseFlashY",get_mouseFlashX:"getMouseFlashX",get_mouseY:"getMouseY",get_mouseX:"getMouseX"}
com.haxepunk.utils.Input.getMouseX = function() {
	return com.haxepunk.HXP.screen.getMouseX();
}
com.haxepunk.utils.Input.getMouseY = function() {
	return com.haxepunk.HXP.screen.getMouseY();
}
com.haxepunk.utils.Input.getMouseFlashX = function() {
	return com.haxepunk.HXP.stage.get_mouseX() | 0;
}
com.haxepunk.utils.Input.getMouseFlashY = function() {
	return com.haxepunk.HXP.stage.get_mouseY() | 0;
}
com.haxepunk.utils.Input.define = function(name,keys) {
	com.haxepunk.utils.Input._control.set(name,keys);
}
com.haxepunk.utils.Input.check = function(input) {
	if(js.Boot.__instanceof(input,String)) {
		var v = com.haxepunk.utils.Input._control.get(input), i = v.length;
		while(i-- > 0) {
			if(v[i] < 0) {
				if(com.haxepunk.utils.Input._keyNum > 0) return true;
				continue;
			}
			if(com.haxepunk.utils.Input._key[v[i]] == true) return true;
		}
		return false;
	}
	return input < 0?com.haxepunk.utils.Input._keyNum > 0:com.haxepunk.utils.Input._key[input];
}
com.haxepunk.utils.Input.pressed = function(input) {
	if(js.Boot.__instanceof(input,String)) {
		var v = com.haxepunk.utils.Input._control.get(input), i = v.length;
		while(i-- > 0) if(v[i] < 0?com.haxepunk.utils.Input._pressNum != 0:com.haxepunk.utils.Input.indexOf(com.haxepunk.utils.Input._press,v[i]) >= 0) return true;
		return false;
	}
	return input < 0?com.haxepunk.utils.Input._pressNum != 0:com.haxepunk.utils.Input.indexOf(com.haxepunk.utils.Input._press,input) >= 0;
}
com.haxepunk.utils.Input.indexOf = function(a,v) {
	var i = 0;
	var _g = 0;
	while(_g < a.length) {
		var v2 = a[_g];
		++_g;
		if(v == v2) return i;
		i++;
	}
	return -1;
}
com.haxepunk.utils.Input.getJoysticks = function() {
	var count = 0;
	var $it0 = com.haxepunk.utils.Input._joysticks.iterator();
	while( $it0.hasNext() ) {
		var joystick = $it0.next();
		if(joystick.get_connected()) count += 1;
	}
	return count;
}
com.haxepunk.utils.Input.enable = function() {
	if(!com.haxepunk.utils.Input._enabled && com.haxepunk.HXP.stage != null) {
		com.haxepunk.HXP.stage.addEventListener(browser.events.KeyboardEvent.KEY_DOWN,com.haxepunk.utils.Input.onKeyDown,false,2);
		com.haxepunk.HXP.stage.addEventListener(browser.events.KeyboardEvent.KEY_UP,com.haxepunk.utils.Input.onKeyUp,false,2);
		com.haxepunk.HXP.stage.addEventListener(browser.events.MouseEvent.MOUSE_DOWN,com.haxepunk.utils.Input.onMouseDown,false,2);
		com.haxepunk.HXP.stage.addEventListener(browser.events.MouseEvent.MOUSE_UP,com.haxepunk.utils.Input.onMouseUp,false,2);
		com.haxepunk.HXP.stage.addEventListener(browser.events.MouseEvent.MOUSE_WHEEL,com.haxepunk.utils.Input.onMouseWheel,false,2);
	}
}
com.haxepunk.utils.Input.update = function() {
	while(com.haxepunk.utils.Input._pressNum-- > -1) com.haxepunk.utils.Input._press[com.haxepunk.utils.Input._pressNum] = -1;
	com.haxepunk.utils.Input._pressNum = 0;
	while(com.haxepunk.utils.Input._releaseNum-- > -1) com.haxepunk.utils.Input._release[com.haxepunk.utils.Input._releaseNum] = -1;
	com.haxepunk.utils.Input._releaseNum = 0;
	if(com.haxepunk.utils.Input.mousePressed) com.haxepunk.utils.Input.mousePressed = false;
	if(com.haxepunk.utils.Input.mouseReleased) com.haxepunk.utils.Input.mouseReleased = false;
}
com.haxepunk.utils.Input.onKeyDown = function(e) {
	var code = com.haxepunk.utils.Input.lastKey = e.keyCode;
	if(code == 8) com.haxepunk.utils.Input.keyString = HxOverrides.substr(com.haxepunk.utils.Input.keyString,0,com.haxepunk.utils.Input.keyString.length - 1); else if(code > 47 && code < 58 || code > 64 && code < 91 || code == 32) {
		if(com.haxepunk.utils.Input.keyString.length > 100) com.haxepunk.utils.Input.keyString = HxOverrides.substr(com.haxepunk.utils.Input.keyString,1,null);
		var $char = String.fromCharCode(code);
		com.haxepunk.utils.Input.keyString += $char;
	}
	if(!com.haxepunk.utils.Input._key[code]) {
		com.haxepunk.utils.Input._key[code] = true;
		com.haxepunk.utils.Input._keyNum++;
		com.haxepunk.utils.Input._press[com.haxepunk.utils.Input._pressNum++] = code;
	}
}
com.haxepunk.utils.Input.onKeyUp = function(e) {
	var code = e.keyCode;
	if(com.haxepunk.utils.Input._key[code]) {
		com.haxepunk.utils.Input._key[code] = false;
		com.haxepunk.utils.Input._keyNum--;
		com.haxepunk.utils.Input._release[com.haxepunk.utils.Input._releaseNum++] = code;
	}
}
com.haxepunk.utils.Input.onMouseDown = function(e) {
	if(!com.haxepunk.utils.Input.mouseDown) {
		com.haxepunk.utils.Input.mouseDown = true;
		com.haxepunk.utils.Input.mouseUp = false;
		com.haxepunk.utils.Input.mousePressed = true;
	}
}
com.haxepunk.utils.Input.onMouseUp = function(e) {
	com.haxepunk.utils.Input.mouseDown = false;
	com.haxepunk.utils.Input.mouseUp = true;
	com.haxepunk.utils.Input.mouseReleased = true;
}
com.haxepunk.utils.Input.onMouseWheel = function(e) {
	com.haxepunk.utils.Input.mouseWheel = true;
	com.haxepunk.utils.Input._mouseWheelDelta = e.delta;
}
com.haxepunk.utils.Joystick = function() { }
$hxClasses["com.haxepunk.utils.Joystick"] = com.haxepunk.utils.Joystick;
com.haxepunk.utils.Joystick.__name__ = ["com","haxepunk","utils","Joystick"];
com.haxepunk.utils.Joystick.prototype = {
	set_connected: function(value) {
		if(value) this._timeout = 3; else this._timeout = 0;
		return value;
	}
	,get_connected: function() {
		return this._timeout > 0;
	}
	,__class__: com.haxepunk.utils.Joystick
	,__properties__: {set_connected:"set_connected",get_connected:"get_connected"}
}
com.haxepunk.utils.Key = function() { }
$hxClasses["com.haxepunk.utils.Key"] = com.haxepunk.utils.Key;
com.haxepunk.utils.Key.__name__ = ["com","haxepunk","utils","Key"];
var entities = {}
entities.Player = function(posX,posY) {
	this.health = 3;
	com.haxepunk.Entity.call(this);
	this.moveVec = new com.haxepunk.math.Vector();
	this.speedVec = new com.haxepunk.math.Vector(150,150);
	var tempSpriteMap = new com.haxepunk.graphics.Spritemap(Assets.walkingBaby,284,421);
	tempSpriteMap.add("walkDown",[3,5,4,3],3,true);
	tempSpriteMap.scale = .3;
	this.setGraphic(tempSpriteMap);
	tempSpriteMap.play("walkDown");
	this.x = posX;
	this.y = posY;
	this.setMask(new com.haxepunk.masks.Pixelmask(Assets.baby));
	this.setType("player");
	this.collidable = true;
};
$hxClasses["entities.Player"] = entities.Player;
entities.Player.__name__ = ["entities","Player"];
entities.Player.__super__ = com.haxepunk.Entity;
entities.Player.prototype = $extend(com.haxepunk.Entity.prototype,{
	update: function() {
		if(com.haxepunk.utils.Input.check("right")) {
			if(this.moveVec.x != 1) {
				this.moveVec.x += 0.03;
				if(this.moveVec.x > 1) this.moveVec.x = 1;
			}
		} else if(!(this.moveVec.x <= 0)) {
			this.moveVec.x -= 0.03;
			if(this.moveVec.x < 0) this.moveVec.x = 0;
		}
		if(com.haxepunk.utils.Input.check("left")) {
			if(this.moveVec.x != -1) {
				this.moveVec.x -= 0.03;
				if(this.moveVec.x < -1) this.moveVec.x = -1;
			}
		} else if(!(this.moveVec.x >= 0)) {
			this.moveVec.x += 0.03;
			if(this.moveVec.x > 0) this.moveVec.x = 0;
		}
		if(com.haxepunk.utils.Input.check("down")) {
			if(this.moveVec.y != 1) {
				this.moveVec.y += 0.03;
				if(this.moveVec.y > 1) this.moveVec.y = 1;
			}
		} else if(!(this.moveVec.y <= 0)) {
			this.moveVec.y -= 0.03;
			if(this.moveVec.y < 0) this.moveVec.y = 0;
		}
		if(com.haxepunk.utils.Input.check("up")) {
			if(this.moveVec.y != -1) {
				this.moveVec.y -= 0.03;
				if(this.moveVec.y < -1) this.moveVec.y = -1;
			}
		} else if(!(this.moveVec.y >= 0)) {
			this.moveVec.y += 0.03;
			if(this.moveVec.y > 0) this.moveVec.y = 0;
		}
		{
			this.x += this.speedVec.x * com.haxepunk.HXP.elapsed * this.moveVec.x;
			this.y += this.speedVec.y * com.haxepunk.HXP.elapsed * this.moveVec.y;
		}
		if(this.health <= 0) console.log("dead");
		com.haxepunk.Entity.prototype.update.call(this);
	}
	,__class__: entities.Player
});
entities.enemies = {}
entities.enemies.Bullet = function(x,y,directionVec) {
	this.inHit = true;
	this.speed = 125;
	com.haxepunk.Entity.call(this);
	this.x = x;
	this.y = y;
	this.directionVec = directionVec;
	this.setGraphic(new com.haxepunk.graphics.Image("graphics/baby.png"));
	this.setMask(new com.haxepunk.masks.Pixelmask(Assets.baby));
	this.collidable = true;
};
$hxClasses["entities.enemies.Bullet"] = entities.enemies.Bullet;
entities.enemies.Bullet.__name__ = ["entities","enemies","Bullet"];
entities.enemies.Bullet.__super__ = com.haxepunk.Entity;
entities.enemies.Bullet.prototype = $extend(com.haxepunk.Entity.prototype,{
	update: function() {
		this.x += this.speed * com.haxepunk.HXP.elapsed * this.directionVec.x;
		this.y += this.speed * com.haxepunk.HXP.elapsed * this.directionVec.y;
		var tempEnt = js.Boot.__cast(this.collideTypes("player",this.x,this.y) , entities.Player);
		if(tempEnt != null && this.inHit) {
			tempEnt.health -= 1;
			com.haxepunk.HXP._world.remove(this);
		}
		com.haxepunk.Entity.prototype.update.call(this);
	}
	,__class__: entities.enemies.Bullet
});
entities.enemies.Chaser = function(x,y) {
	this.speed = 100;
	com.haxepunk.Entity.call(this);
	this.x = x;
	this.y = y;
	this.setGraphic(new com.haxepunk.graphics.Image(Assets.baby));
	this.moveVec = new com.haxepunk.math.Vector(0,0);
};
$hxClasses["entities.enemies.Chaser"] = entities.enemies.Chaser;
entities.enemies.Chaser.__name__ = ["entities","enemies","Chaser"];
entities.enemies.Chaser.__super__ = com.haxepunk.Entity;
entities.enemies.Chaser.prototype = $extend(com.haxepunk.Entity.prototype,{
	update: function() {
		this.directionVec = new com.haxepunk.math.Vector((js.Boot.__cast(com.haxepunk.HXP._world , world.TestWorld)).player.x - this.x,(js.Boot.__cast(com.haxepunk.HXP._world , world.TestWorld)).player.y - this.y);
		this.directionVec.normalize(1);
		console.log(this.directionVec);
		this.moveVec.x += this.directionVec.x;
		this.moveVec.y += this.directionVec.y;
		if(this.moveVec.x >= 1) this.moveVec.x = 1; else if(this.moveVec.x <= -1) this.moveVec.x = -1;
		if(this.moveVec.y >= 1) this.moveVec.y = 1; else if(this.moveVec.y <= -1) this.moveVec.y = -1;
		{
			this.x += this.speed * com.haxepunk.HXP.elapsed * this.directionVec.x * this.moveVec.x;
			this.y += this.speed * com.haxepunk.HXP.elapsed * this.directionVec.y * this.moveVec.y;
		}
		com.haxepunk.Entity.prototype.update.call(this);
	}
	,__class__: entities.enemies.Chaser
});
entities.enemies.Turret = function() {
	this.coolDown = 3;
};
$hxClasses["entities.enemies.Turret"] = entities.enemies.Turret;
entities.enemies.Turret.__name__ = ["entities","enemies","Turret"];
entities.enemies.Turret.__super__ = com.haxepunk.Entity;
entities.enemies.Turret.prototype = $extend(com.haxepunk.Entity.prototype,{
	update: function() {
		if(this.coolDown <= 0) {
			this.makeDirectionVector();
			this.shoot();
			this.coolDown = 3;
		} else this.coolDown -= com.haxepunk.HXP.elapsed;
		com.haxepunk.Entity.prototype.update.call(this);
	}
	,makeDirectionVector: function() {
		this.bulletDirectionVec = new com.haxepunk.math.Vector((js.Boot.__cast(com.haxepunk.HXP._world , world.TestWorld)).player.x - this.x,(js.Boot.__cast(com.haxepunk.HXP._world , world.TestWorld)).player.y - this.y);
		this.bulletDirectionVec.normalize(1);
	}
	,shoot: function() {
		com.haxepunk.HXP._world.add(new entities.enemies.Bullet(this.x,this.y,this.bulletDirectionVec));
	}
	,__class__: entities.enemies.Turret
});
haxe.Resource = function() { }
$hxClasses["haxe.Resource"] = haxe.Resource;
haxe.Resource.__name__ = ["haxe","Resource"];
haxe.Resource.getString = function(name) {
	var _g = 0, _g1 = haxe.Resource.content;
	while(_g < _g1.length) {
		var x = _g1[_g];
		++_g;
		if(x.name == name) {
			if(x.str != null) return x.str;
			var b = haxe.Unserializer.run(x.data);
			return b.toString();
		}
	}
	return null;
}
haxe.Unserializer = function(buf) {
	this.buf = buf;
	this.length = buf.length;
	this.pos = 0;
	this.scache = new Array();
	this.cache = new Array();
	var r = haxe.Unserializer.DEFAULT_RESOLVER;
	if(r == null) {
		r = Type;
		haxe.Unserializer.DEFAULT_RESOLVER = r;
	}
	this.setResolver(r);
};
$hxClasses["haxe.Unserializer"] = haxe.Unserializer;
haxe.Unserializer.__name__ = ["haxe","Unserializer"];
haxe.Unserializer.initCodes = function() {
	var codes = new Array();
	var _g1 = 0, _g = haxe.Unserializer.BASE64.length;
	while(_g1 < _g) {
		var i = _g1++;
		codes[haxe.Unserializer.BASE64.charCodeAt(i)] = i;
	}
	return codes;
}
haxe.Unserializer.run = function(v) {
	return new haxe.Unserializer(v).unserialize();
}
haxe.Unserializer.prototype = {
	unserialize: function() {
		switch(this.buf.charCodeAt(this.pos++)) {
		case 110:
			return null;
		case 116:
			return true;
		case 102:
			return false;
		case 122:
			return 0;
		case 105:
			return this.readDigits();
		case 100:
			var p1 = this.pos;
			while(true) {
				var c = this.buf.charCodeAt(this.pos);
				if(c >= 43 && c < 58 || c == 101 || c == 69) this.pos++; else break;
			}
			return Std.parseFloat(HxOverrides.substr(this.buf,p1,this.pos - p1));
		case 121:
			var len = this.readDigits();
			if(this.buf.charCodeAt(this.pos++) != 58 || this.length - this.pos < len) throw "Invalid string length";
			var s = HxOverrides.substr(this.buf,this.pos,len);
			this.pos += len;
			s = StringTools.urlDecode(s);
			this.scache.push(s);
			return s;
		case 107:
			return Math.NaN;
		case 109:
			return Math.NEGATIVE_INFINITY;
		case 112:
			return Math.POSITIVE_INFINITY;
		case 97:
			var buf = this.buf;
			var a = new Array();
			this.cache.push(a);
			while(true) {
				var c = this.buf.charCodeAt(this.pos);
				if(c == 104) {
					this.pos++;
					break;
				}
				if(c == 117) {
					this.pos++;
					var n = this.readDigits();
					a[a.length + n - 1] = null;
				} else a.push(this.unserialize());
			}
			return a;
		case 111:
			var o = { };
			this.cache.push(o);
			this.unserializeObject(o);
			return o;
		case 114:
			var n = this.readDigits();
			if(n < 0 || n >= this.cache.length) throw "Invalid reference";
			return this.cache[n];
		case 82:
			var n = this.readDigits();
			if(n < 0 || n >= this.scache.length) throw "Invalid string reference";
			return this.scache[n];
		case 120:
			throw this.unserialize();
			break;
		case 99:
			var name = this.unserialize();
			var cl = this.resolver.resolveClass(name);
			if(cl == null) throw "Class not found " + name;
			var o = Type.createEmptyInstance(cl);
			this.cache.push(o);
			this.unserializeObject(o);
			return o;
		case 119:
			var name = this.unserialize();
			var edecl = this.resolver.resolveEnum(name);
			if(edecl == null) throw "Enum not found " + name;
			var e = this.unserializeEnum(edecl,this.unserialize());
			this.cache.push(e);
			return e;
		case 106:
			var name = this.unserialize();
			var edecl = this.resolver.resolveEnum(name);
			if(edecl == null) throw "Enum not found " + name;
			this.pos++;
			var index = this.readDigits();
			var tag = Type.getEnumConstructs(edecl)[index];
			if(tag == null) throw "Unknown enum index " + name + "@" + index;
			var e = this.unserializeEnum(edecl,tag);
			this.cache.push(e);
			return e;
		case 108:
			var l = new List();
			this.cache.push(l);
			var buf = this.buf;
			while(this.buf.charCodeAt(this.pos) != 104) l.add(this.unserialize());
			this.pos++;
			return l;
		case 98:
			var h = new Hash();
			this.cache.push(h);
			var buf = this.buf;
			while(this.buf.charCodeAt(this.pos) != 104) {
				var s = this.unserialize();
				h.set(s,this.unserialize());
			}
			this.pos++;
			return h;
		case 113:
			var h = new IntHash();
			this.cache.push(h);
			var buf = this.buf;
			var c = this.buf.charCodeAt(this.pos++);
			while(c == 58) {
				var i = this.readDigits();
				h.set(i,this.unserialize());
				c = this.buf.charCodeAt(this.pos++);
			}
			if(c != 104) throw "Invalid IntHash format";
			return h;
		case 118:
			var d = HxOverrides.strDate(HxOverrides.substr(this.buf,this.pos,19));
			this.cache.push(d);
			this.pos += 19;
			return d;
		case 115:
			var len = this.readDigits();
			var buf = this.buf;
			if(this.buf.charCodeAt(this.pos++) != 58 || this.length - this.pos < len) throw "Invalid bytes length";
			var codes = haxe.Unserializer.CODES;
			if(codes == null) {
				codes = haxe.Unserializer.initCodes();
				haxe.Unserializer.CODES = codes;
			}
			var i = this.pos;
			var rest = len & 3;
			var size = (len >> 2) * 3 + (rest >= 2?rest - 1:0);
			var max = i + (len - rest);
			var bytes = haxe.io.Bytes.alloc(size);
			var bpos = 0;
			while(i < max) {
				var c1 = codes[buf.charCodeAt(i++)];
				var c2 = codes[buf.charCodeAt(i++)];
				bytes.b[bpos++] = (c1 << 2 | c2 >> 4) & 255;
				var c3 = codes[buf.charCodeAt(i++)];
				bytes.b[bpos++] = (c2 << 4 | c3 >> 2) & 255;
				var c4 = codes[buf.charCodeAt(i++)];
				bytes.b[bpos++] = (c3 << 6 | c4) & 255;
			}
			if(rest >= 2) {
				var c1 = codes[buf.charCodeAt(i++)];
				var c2 = codes[buf.charCodeAt(i++)];
				bytes.b[bpos++] = (c1 << 2 | c2 >> 4) & 255;
				if(rest == 3) {
					var c3 = codes[buf.charCodeAt(i++)];
					bytes.b[bpos++] = (c2 << 4 | c3 >> 2) & 255;
				}
			}
			this.pos += len;
			this.cache.push(bytes);
			return bytes;
		case 67:
			var name = this.unserialize();
			var cl = this.resolver.resolveClass(name);
			if(cl == null) throw "Class not found " + name;
			var o = Type.createEmptyInstance(cl);
			this.cache.push(o);
			o.hxUnserialize(this);
			if(this.buf.charCodeAt(this.pos++) != 103) throw "Invalid custom data";
			return o;
		default:
		}
		this.pos--;
		throw "Invalid char " + this.buf.charAt(this.pos) + " at position " + this.pos;
	}
	,unserializeEnum: function(edecl,tag) {
		if(this.buf.charCodeAt(this.pos++) != 58) throw "Invalid enum format";
		var nargs = this.readDigits();
		if(nargs == 0) return Type.createEnum(edecl,tag);
		var args = new Array();
		while(nargs-- > 0) args.push(this.unserialize());
		return Type.createEnum(edecl,tag,args);
	}
	,unserializeObject: function(o) {
		while(true) {
			if(this.pos >= this.length) throw "Invalid object";
			if(this.buf.charCodeAt(this.pos) == 103) break;
			var k = this.unserialize();
			if(!js.Boot.__instanceof(k,String)) throw "Invalid object key";
			var v = this.unserialize();
			o[k] = v;
		}
		this.pos++;
	}
	,readDigits: function() {
		var k = 0;
		var s = false;
		var fpos = this.pos;
		while(true) {
			var c = this.buf.charCodeAt(this.pos);
			if(c != c) break;
			if(c == 45) {
				if(this.pos != fpos) break;
				s = true;
				this.pos++;
				continue;
			}
			if(c < 48 || c > 57) break;
			k = k * 10 + (c - 48);
			this.pos++;
		}
		if(s) k *= -1;
		return k;
	}
	,setResolver: function(r) {
		if(r == null) this.resolver = { resolveClass : function(_) {
			return null;
		}, resolveEnum : function(_) {
			return null;
		}}; else this.resolver = r;
	}
	,__class__: haxe.Unserializer
}
haxe.io = {}
haxe.io.Bytes = function(length,b) {
	this.length = length;
	this.b = b;
};
$hxClasses["haxe.io.Bytes"] = haxe.io.Bytes;
haxe.io.Bytes.__name__ = ["haxe","io","Bytes"];
haxe.io.Bytes.alloc = function(length) {
	var a = new Array();
	var _g = 0;
	while(_g < length) {
		var i = _g++;
		a.push(0);
	}
	return new haxe.io.Bytes(length,a);
}
haxe.io.Bytes.prototype = {
	toString: function() {
		return this.readString(0,this.length);
	}
	,readString: function(pos,len) {
		if(pos < 0 || len < 0 || pos + len > this.length) throw haxe.io.Error.OutsideBounds;
		var s = "";
		var b = this.b;
		var fcc = String.fromCharCode;
		var i = pos;
		var max = pos + len;
		while(i < max) {
			var c = b[i++];
			if(c < 128) {
				if(c == 0) break;
				s += fcc(c);
			} else if(c < 224) s += fcc((c & 63) << 6 | b[i++] & 127); else if(c < 240) {
				var c2 = b[i++];
				s += fcc((c & 31) << 12 | (c2 & 127) << 6 | b[i++] & 127);
			} else {
				var c2 = b[i++];
				var c3 = b[i++];
				s += fcc((c & 15) << 18 | (c2 & 127) << 12 | c3 << 6 & 127 | b[i++] & 127);
			}
		}
		return s;
	}
	,__class__: haxe.io.Bytes
}
haxe.io.Error = $hxClasses["haxe.io.Error"] = { __ename__ : true, __constructs__ : ["Blocked","Overflow","OutsideBounds","Custom"] }
haxe.io.Error.Blocked = ["Blocked",0];
haxe.io.Error.Blocked.toString = $estr;
haxe.io.Error.Blocked.__enum__ = haxe.io.Error;
haxe.io.Error.Overflow = ["Overflow",1];
haxe.io.Error.Overflow.toString = $estr;
haxe.io.Error.Overflow.__enum__ = haxe.io.Error;
haxe.io.Error.OutsideBounds = ["OutsideBounds",2];
haxe.io.Error.OutsideBounds.toString = $estr;
haxe.io.Error.OutsideBounds.__enum__ = haxe.io.Error;
haxe.io.Error.Custom = function(e) { var $x = ["Custom",3,e]; $x.__enum__ = haxe.io.Error; $x.toString = $estr; return $x; }
haxe.io.Input = function() { }
$hxClasses["haxe.io.Input"] = haxe.io.Input;
haxe.io.Input.__name__ = ["haxe","io","Input"];
haxe.io.Input.prototype = {
	setEndian: function(b) {
		this.bigEndian = b;
		return b;
	}
	,__class__: haxe.io.Input
	,__properties__: {set_bigEndian:"setEndian"}
}
var js = {}
js.Boot = function() { }
$hxClasses["js.Boot"] = js.Boot;
js.Boot.__name__ = ["js","Boot"];
js.Boot.__string_rec = function(o,s) {
	if(o == null) return "null";
	if(s.length >= 5) return "<...>";
	var t = typeof(o);
	if(t == "function" && (o.__name__ || o.__ename__)) t = "object";
	switch(t) {
	case "object":
		if(o instanceof Array) {
			if(o.__enum__) {
				if(o.length == 2) return o[0];
				var str = o[0] + "(";
				s += "\t";
				var _g1 = 2, _g = o.length;
				while(_g1 < _g) {
					var i = _g1++;
					if(i != 2) str += "," + js.Boot.__string_rec(o[i],s); else str += js.Boot.__string_rec(o[i],s);
				}
				return str + ")";
			}
			var l = o.length;
			var i;
			var str = "[";
			s += "\t";
			var _g = 0;
			while(_g < l) {
				var i1 = _g++;
				str += (i1 > 0?",":"") + js.Boot.__string_rec(o[i1],s);
			}
			str += "]";
			return str;
		}
		var tostr;
		try {
			tostr = o.toString;
		} catch( e ) {
			return "???";
		}
		if(tostr != null && tostr != Object.toString) {
			var s2 = o.toString();
			if(s2 != "[object Object]") return s2;
		}
		var k = null;
		var str = "{\n";
		s += "\t";
		var hasp = o.hasOwnProperty != null;
		for( var k in o ) { ;
		if(hasp && !o.hasOwnProperty(k)) {
			continue;
		}
		if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__" || k == "__properties__") {
			continue;
		}
		if(str.length != 2) str += ", \n";
		str += s + k + " : " + js.Boot.__string_rec(o[k],s);
		}
		s = s.substring(1);
		str += "\n" + s + "}";
		return str;
	case "function":
		return "<function>";
	case "string":
		return o;
	default:
		return String(o);
	}
}
js.Boot.__interfLoop = function(cc,cl) {
	if(cc == null) return false;
	if(cc == cl) return true;
	var intf = cc.__interfaces__;
	if(intf != null) {
		var _g1 = 0, _g = intf.length;
		while(_g1 < _g) {
			var i = _g1++;
			var i1 = intf[i];
			if(i1 == cl || js.Boot.__interfLoop(i1,cl)) return true;
		}
	}
	return js.Boot.__interfLoop(cc.__super__,cl);
}
js.Boot.__instanceof = function(o,cl) {
	try {
		if(o instanceof cl) {
			if(cl == Array) return o.__enum__ == null;
			return true;
		}
		if(js.Boot.__interfLoop(o.__class__,cl)) return true;
	} catch( e ) {
		if(cl == null) return false;
	}
	switch(cl) {
	case Int:
		return Math.ceil(o%2147483648.0) === o;
	case Float:
		return typeof(o) == "number";
	case Bool:
		return o === true || o === false;
	case String:
		return typeof(o) == "string";
	case Dynamic:
		return true;
	default:
		if(o == null) return false;
		if(cl == Class && o.__name__ != null) return true; else null;
		if(cl == Enum && o.__ename__ != null) return true; else null;
		return o.__enum__ == cl;
	}
}
js.Boot.__cast = function(o,t) {
	if(js.Boot.__instanceof(o,t)) return o; else throw "Cannot cast " + Std.string(o) + " to " + Std.string(t);
}
js.Lib = function() { }
$hxClasses["js.Lib"] = js.Lib;
js.Lib.__name__ = ["js","Lib"];
var nme = {}
nme.Lib = function() { }
$hxClasses["nme.Lib"] = nme.Lib;
nme.Lib.__name__ = ["nme","Lib"];
nme.Lib.__properties__ = {get_current:"get_current"}
nme.Lib.get_company = function() {
	return "";
}
nme.Lib.get_current = function() {
	return browser.Lib.get_current();
}
nme.Lib.get_file = function() {
	return "";
}
nme.Lib.get_initHeight = function() {
	return 0;
}
nme.Lib.get_initWidth = function() {
	return 0;
}
nme.Lib.get_packageName = function() {
	return "";
}
nme.Lib.get_stage = function() {
	return nme.Lib.get_current().get_stage();
}
nme.Lib.get_version = function() {
	return "";
}
nme.installer = {}
nme.installer.Assets = function() { }
$hxClasses["nme.installer.Assets"] = nme.installer.Assets;
nme.installer.Assets.__name__ = ["nme","installer","Assets"];
nme.installer.Assets.initialize = function() {
	if(!nme.installer.Assets.initialized) {
		nme.installer.Assets.resourceNames.set("graphics/baby.png","graphics/baby.png");
		nme.installer.Assets.resourceTypes.set("graphics/baby.png","image");
		nme.installer.Assets.resourceNames.set("graphics/walkBabyDown.png","graphics/walkBabyDown.png");
		nme.installer.Assets.resourceTypes.set("graphics/walkBabyDown.png","image");
		nme.installer.Assets.resourceNames.set("graphics/walkBabyUp.png","graphics/walkBabyUp.png");
		nme.installer.Assets.resourceTypes.set("graphics/walkBabyUp.png","image");
		nme.installer.Assets.resourceNames.set("graphics/walkingBaby.png","graphics/walkingBaby.png");
		nme.installer.Assets.resourceTypes.set("graphics/walkingBaby.png","image");
		nme.installer.Assets.resourceNames.set("gfx/debug/console_debug.png","gfx/debug/console_debug.png");
		nme.installer.Assets.resourceTypes.set("gfx/debug/console_debug.png","image");
		nme.installer.Assets.resourceNames.set("gfx/debug/console_logo.png","gfx/debug/console_logo.png");
		nme.installer.Assets.resourceTypes.set("gfx/debug/console_logo.png","image");
		nme.installer.Assets.resourceNames.set("gfx/debug/console_output.png","gfx/debug/console_output.png");
		nme.installer.Assets.resourceTypes.set("gfx/debug/console_output.png","image");
		nme.installer.Assets.resourceNames.set("gfx/debug/console_pause.png","gfx/debug/console_pause.png");
		nme.installer.Assets.resourceTypes.set("gfx/debug/console_pause.png","image");
		nme.installer.Assets.resourceNames.set("gfx/debug/console_play.png","gfx/debug/console_play.png");
		nme.installer.Assets.resourceTypes.set("gfx/debug/console_play.png","image");
		nme.installer.Assets.resourceNames.set("gfx/debug/console_step.png","gfx/debug/console_step.png");
		nme.installer.Assets.resourceTypes.set("gfx/debug/console_step.png","image");
		nme.installer.Assets.resourceNames.set("gfx/preloader/haxepunk.png","gfx/preloader/haxepunk.png");
		nme.installer.Assets.resourceTypes.set("gfx/preloader/haxepunk.png","image");
		nme.installer.Assets.resourceClasses.set("font/04B_03__.ttf",NME_font_04b_03___ttf);
		nme.installer.Assets.resourceNames.set("font/04B_03__.ttf","font/04B_03__.ttf");
		nme.installer.Assets.resourceTypes.set("font/04B_03__.ttf","font");
		nme.installer.Assets.initialized = true;
	}
}
nme.installer.Assets.getBitmapData = function(id,useCache) {
	if(useCache == null) useCache = true;
	nme.installer.Assets.initialize();
	if(nme.installer.Assets.resourceNames.exists(id) && nme.installer.Assets.resourceTypes.exists(id) && nme.installer.Assets.resourceTypes.get(id).toLowerCase() == "image") {
		if(useCache && nme.installer.Assets.cachedBitmapData.exists(id)) return nme.installer.Assets.cachedBitmapData.get(id); else {
			var data = (js.Boot.__cast(ApplicationMain.loaders.get(nme.installer.Assets.resourceNames.get(id)).contentLoaderInfo.content , browser.display.Bitmap)).bitmapData;
			if(useCache) nme.installer.Assets.cachedBitmapData.set(id,data);
			return data;
		}
	} else if(id.indexOf(":") > -1) {
		var libraryName = HxOverrides.substr(id,0,id.indexOf(":"));
		var symbolName = HxOverrides.substr(id,id.indexOf(":") + 1,null);
		if(nme.installer.Assets.libraryTypes.exists(libraryName)) {
		} else console.log("[nme.Assets] There is no asset library named \"" + libraryName + "\"");
	} else console.log("[nme.Assets] There is no BitmapData asset with an ID of \"" + id + "\"");
	return null;
}
nme.installer.Assets.getFont = function(id) {
	nme.installer.Assets.initialize();
	if(nme.installer.Assets.resourceNames.exists(id) && nme.installer.Assets.resourceTypes.exists(id)) {
		if(nme.installer.Assets.resourceTypes.get(id).toLowerCase() == "font") return js.Boot.__cast(Type.createInstance(nme.installer.Assets.resourceClasses.get(id),[]) , browser.text.Font);
	}
	console.log("[nme.Assets] There is no Font asset with an ID of \"" + id + "\"");
	return null;
}
var world = {}
world.TestWorld = function() {
	com.haxepunk.World.call(this);
	this.player = new entities.Player(400,300);
	this.add(this.player);
	this.add(new entities.enemies.Chaser(200,200));
};
$hxClasses["world.TestWorld"] = world.TestWorld;
world.TestWorld.__name__ = ["world","TestWorld"];
world.TestWorld.__super__ = com.haxepunk.World;
world.TestWorld.prototype = $extend(com.haxepunk.World.prototype,{
	__class__: world.TestWorld
});
function $iterator(o) { if( o instanceof Array ) return function() { return HxOverrides.iter(o); }; return typeof(o.iterator) == 'function' ? $bind(o,o.iterator) : o.iterator; };
var $_;
function $bind(o,m) { var f = function(){ return f.method.apply(f.scope, arguments); }; f.scope = o; f.method = m; return f; };
if(Array.prototype.indexOf) HxOverrides.remove = function(a,o) {
	var i = a.indexOf(o);
	if(i == -1) return false;
	a.splice(i,1);
	return true;
}; else null;
Math.__name__ = ["Math"];
Math.NaN = Number.NaN;
Math.NEGATIVE_INFINITY = Number.NEGATIVE_INFINITY;
Math.POSITIVE_INFINITY = Number.POSITIVE_INFINITY;
$hxClasses.Math = Math;
Math.isFinite = function(i) {
	return isFinite(i);
};
Math.isNaN = function(i) {
	return isNaN(i);
};
String.prototype.__class__ = $hxClasses.String = String;
String.__name__ = ["String"];
Array.prototype.__class__ = $hxClasses.Array = Array;
Array.__name__ = ["Array"];
Date.prototype.__class__ = $hxClasses.Date = Date;
Date.__name__ = ["Date"];
var Int = $hxClasses.Int = { __name__ : ["Int"]};
var Dynamic = $hxClasses.Dynamic = { __name__ : ["Dynamic"]};
var Float = $hxClasses.Float = Number;
Float.__name__ = ["Float"];
var Bool = $hxClasses.Bool = Boolean;
Bool.__ename__ = ["Bool"];
var Class = $hxClasses.Class = { __name__ : ["Class"]};
var Enum = { };
Xml.Element = "element";
Xml.PCData = "pcdata";
Xml.CData = "cdata";
Xml.Comment = "comment";
Xml.DocType = "doctype";
Xml.Prolog = "prolog";
Xml.Document = "document";
haxe.Resource.content = [{ name : "NME_font_04b_03___ttf", data : "s73299:cToxMTFveTY6YXNjZW50ZDc2OHk0OmRhdGFhZDM4NGQ4OTQuOTc2ZDM4NGQ2NDEuMDI0ZDEyOGQ2NDEuMDI0ZDEyOGQ4OTQuOTc2ZDM4NGQ4OTQuOTc2ZDEyOGQ4OTZkMGQ4OTZkMGQ2NDBkMTI4ZDY0MGQxMjhkNTEyZDM4NGQ1MTJkMzg0ZDY0MGQ1MTJkNjQwZDUxMmQ4OTZkMzg0ZDg5NmQzODRkMTAyNGQxMjhkMTAyNGQxMjhkODk2aHk2Ol93aWR0aGQ2NDB5NDp4TWF4ZDUxMnk0OnhNaW5kMHk0OnlNYXhkNTEyeTQ6eU1pbmQweTc6X2hlaWdodGQ1MTJ5NzpsZWFkaW5nZDB5NzpkZXNjZW50ZDI1Nnk4OmNoYXJDb2RlaTExMXkxNTpsZWZ0c2lkZUJlYXJpbmdkMHkxMjphZHZhbmNlV2lkdGhkNjQweTg6Y29tbWFuZHNhaTFpMmkyaTJpMmkxaTJpMmkyaTJpMmkyaTJpMmkyaTJpMmkyaGc6MjIzb1IwZDc2OFIxYWQ2NC41MTJkMTAyNGQ2NC41MTJkMjU2ZDQ0OC41MTJkMjU2ZDQ0OC41MTJkMTAyNGQ2NC41MTJkMTAyNGQxMjhkOTU5LjQ4OGQzODRkOTU5LjQ4OGQzODRkMzE5LjQ4N2QxMjhkMzE5LjQ4N2QxMjhkOTU5LjQ4OGhSMmQ1MTJSM2Q0NDguNTEyUjRkNjQuNTEyUjVkNzY4UjZkMFI3ZDcwMy40ODhSOGQwUjlkMjU2UjEwaTIyM1IxMWQ2NC41MTJSMTJkNTEyUjEzYWkxaTJpMmkyaTJpMWkyaTJpMmkyaGc6MTEwb1IwZDc2OFIxYWQzODRkMTAyNGQ1MTJkMTAyNGQ1MTJkNjQwZDM4NGQ2NDBkMzg0ZDEwMjRkMTI4ZDY0MGQzODRkNjQwZDM4NGQ1MTJkMGQ1MTJkMGQxMDI0ZDEyOGQxMDI0ZDEyOGQ2NDBoUjJkNjQwUjNkNTEyUjRkMFI1ZDUxMlI2ZDBSN2Q1MTJSOGQwUjlkMjU2UjEwaTExMFIxMWQwUjEyZDY0MFIxM2FpMWkyaTJpMmkyaTFpMmkyaTJpMmkyaTJoZzoyMjJvUjBkNzY4UjFhZDY0LjUxMmQxMDI0ZDY0LjUxMmQyNTZkNDQ4LjUxMmQyNTZkNDQ4LjUxMmQxMDI0ZDY0LjUxMmQxMDI0ZDEyOGQ5NTkuNDg4ZDM4NGQ5NTkuNDg4ZDM4NGQzMTkuNDg3ZDEyOGQzMTkuNDg3ZDEyOGQ5NTkuNDg4aFIyZDUxMlIzZDQ0OC41MTJSNGQ2NC41MTJSNWQ3NjhSNmQwUjdkNzAzLjQ4OFI4ZDBSOWQyNTZSMTBpMjIyUjExZDY0LjUxMlIxMmQ1MTJSMTNhaTFpMmkyaTJpMmkxaTJpMmkyaTJoZzoxMDlvUjBkNzY4UjFhZDBkNTEyZDBkMTAyNGQxMjhkMTAyNGQxMjhkNjQwZDI1NmQ2NDBkMjU2ZDEwMjRkMzg0ZDEwMjRkMzg0ZDY0MGQ1MTJkNjQwZDUxMmQ1MTJkMGQ1MTJkNTEyZDEwMjRkNjQwZDEwMjRkNjQwZDY0MGQ1MTJkNjQwZDUxMmQxMDI0aFIyZDc2OFIzZDY0MFI0ZDBSNWQ1MTJSNmQwUjdkNTEyUjhkMFI5ZDI1NlIxMGkxMDlSMTFkMFIxMmQ3NjhSMTNhaTFpMmkyaTJpMmkyaTJpMmkyaTJpMmkxaTJpMmkyaTJoZzoyMjFvUjBkNzY4UjFhZDY0LjUxMmQxMDI0ZDY0LjUxMmQyNTZkNDQ4LjUxMmQyNTZkNDQ4LjUxMmQxMDI0ZDY0LjUxMmQxMDI0ZDEyOGQ5NTkuNDg4ZDM4NGQ5NTkuNDg4ZDM4NGQzMTkuNDg3ZDEyOGQzMTkuNDg3ZDEyOGQ5NTkuNDg4aFIyZDUxMlIzZDQ0OC41MTJSNGQ2NC41MTJSNWQ3NjhSNmQwUjdkNzAzLjQ4OFI4ZDBSOWQyNTZSMTBpMjIxUjExZDY0LjUxMlIxMmQ1MTJSMTNhaTFpMmkyaTJpMmkxaTJpMmkyaTJoZzoxMDhvUjBkNzY4UjFhZDEyOGQzODRkMGQzODRkMGQxMDI0ZDEyOGQxMDI0ZDEyOGQzODRoUjJkMjU2UjNkMTI4UjRkMFI1ZDY0MFI2ZDBSN2Q2NDBSOGQwUjlkMjU2UjEwaTEwOFIxMWQwUjEyZDI1NlIxM2FpMWkyaTJpMmkyaGc6MjIwb1IwZDc2OFIxYWQ2NC41MTJkMTAyNGQ2NC41MTJkMjU2ZDQ0OC41MTJkMjU2ZDQ0OC41MTJkMTAyNGQ2NC41MTJkMTAyNGQxMjhkOTU5LjQ4OGQzODRkOTU5LjQ4OGQzODRkMzE5LjQ4N2QxMjhkMzE5LjQ4N2QxMjhkOTU5LjQ4OGhSMmQ1MTJSM2Q0NDguNTEyUjRkNjQuNTEyUjVkNzY4UjZkMFI3ZDcwMy40ODhSOGQwUjlkMjU2UjEwaTIyMFIxMWQ2NC41MTJSMTJkNTEyUjEzYWkxaTJpMmkyaTJpMWkyaTJpMmkyaGc6MTA3b1IwZDc2OFIxYWQzODRkNjQwZDI1NmQ2NDBkMjU2ZDc2OGQxMjhkNzY4ZDEyOGQzODRkMGQzODRkMGQxMDI0ZDEyOGQxMDI0ZDEyOGQ4OTZkMzg0ZDg5NmQzODRkNjQwZDUxMmQ1MTJkMzg0ZDUxMmQzODRkNjQwZDUxMmQ2NDBkNTEyZDUxMmQ1MTJkMTAyNGQ1MTJkODk2ZDM4NGQ4OTZkMzg0ZDEwMjRkNTEyZDEwMjRoUjJkNjQwUjNkNTEyUjRkMFI1ZDY0MFI2ZDBSN2Q2NDBSOGQwUjlkMjU2UjEwaTEwN1IxMWQwUjEyZDY0MFIxM2FpMWkyaTJpMmkyaTJpMmkyaTJpMmkyaTFpMmkyaTJpMmkxaTJpMmkyaTJoZzoyMTlvUjBkNzY4UjFhZDY0LjUxMmQxMDI0ZDY0LjUxMmQyNTZkNDQ4LjUxMmQyNTZkNDQ4LjUxMmQxMDI0ZDY0LjUxMmQxMDI0ZDEyOGQ5NTkuNDg4ZDM4NGQ5NTkuNDg4ZDM4NGQzMTkuNDg3ZDEyOGQzMTkuNDg3ZDEyOGQ5NTkuNDg4aFIyZDUxMlIzZDQ0OC41MTJSNGQ2NC41MTJSNWQ3NjhSNmQwUjdkNzAzLjQ4OFI4ZDBSOWQyNTZSMTBpMjE5UjExZDY0LjUxMlIxMmQ1MTJSMTNhaTFpMmkyaTJpMmkxaTJpMmkyaTJoZzoxMDZvUjBkNzY4UjFhZDI1NmQzODRkMTI4ZDM4NGQxMjhkNTEyZDI1NmQ1MTJkMjU2ZDM4NGQyNTZkNjQwZDEyOGQ2NDBkMTI4ZDExNTJkMjU2ZDExNTJkMjU2ZDY0MGQxMjhkMTE1MmQwZDExNTJkMGQxMjgwZDEyOGQxMjgwZDEyOGQxMTUyaFIyZDM4NFIzZDI1NlI0ZDBSNWQ2NDBSNmQtMjU2UjdkNjQwUjhkMFI5ZDI1NlIxMGkxMDZSMTFkMFIxMmQzODRSMTNhaTFpMmkyaTJpMmkxaTJpMmkyaTJpMWkyaTJpMmkyaGc6MjE4b1IwZDc2OFIxYWQ2NC41MTJkMTAyNGQ2NC41MTJkMjU2ZDQ0OC41MTJkMjU2ZDQ0OC41MTJkMTAyNGQ2NC41MTJkMTAyNGQxMjhkOTU5LjQ4OGQzODRkOTU5LjQ4OGQzODRkMzE5LjQ4N2QxMjhkMzE5LjQ4N2QxMjhkOTU5LjQ4OGhSMmQ1MTJSM2Q0NDguNTEyUjRkNjQuNTEyUjVkNzY4UjZkMFI3ZDcwMy40ODhSOGQwUjlkMjU2UjEwaTIxOFIxMWQ2NC41MTJSMTJkNTEyUjEzYWkxaTJpMmkyaTJpMWkyaTJpMmkyaGc6MTA1b1IwZDc2OFIxYWQxMjhkMzg0ZDBkMzg0ZDBkNTEyZDEyOGQ1MTJkMTI4ZDM4NGQxMjhkNjQwZDBkNjQwZDBkMTAyNGQxMjhkMTAyNGQxMjhkNjQwaFIyZDI1NlIzZDEyOFI0ZDBSNWQ2NDBSNmQwUjdkNjQwUjhkMFI5ZDI1NlIxMGkxMDVSMTFkMFIxMmQyNTZSMTNhaTFpMmkyaTJpMmkxaTJpMmkyaTJoZzoyMTdvUjBkNzY4UjFhZDY0LjUxMmQxMDI0ZDY0LjUxMmQyNTZkNDQ4LjUxMmQyNTZkNDQ4LjUxMmQxMDI0ZDY0LjUxMmQxMDI0ZDEyOGQ5NTkuNDg4ZDM4NGQ5NTkuNDg4ZDM4NGQzMTkuNDg3ZDEyOGQzMTkuNDg3ZDEyOGQ5NTkuNDg4aFIyZDUxMlIzZDQ0OC41MTJSNGQ2NC41MTJSNWQ3NjhSNmQwUjdkNzAzLjQ4OFI4ZDBSOWQyNTZSMTBpMjE3UjExZDY0LjUxMlIxMmQ1MTJSMTNhaTFpMmkyaTJpMmkxaTJpMmkyaTJoZzoxMDRvUjBkNzY4UjFhZDEyOGQ1MTJkMTI4ZDM4NGQwZDM4NGQwZDEwMjRkMTI4ZDEwMjRkMTI4ZDY0MGQzODRkNjQwZDM4NGQ1MTJkMTI4ZDUxMmQzODRkMTAyNGQ1MTJkMTAyNGQ1MTJkNjQwZDM4NGQ2NDBkMzg0ZDEwMjRoUjJkNjQwUjNkNTEyUjRkMFI1ZDY0MFI2ZDBSN2Q2NDBSOGQwUjlkMjU2UjEwaTEwNFIxMWQwUjEyZDY0MFIxM2FpMWkyaTJpMmkyaTJpMmkyaTJpMWkyaTJpMmkyaGc6MjE2b1IwZDc2OFIxYWQ2NC41MTJkMTAyNGQ2NC41MTJkMjU2ZDQ0OC41MTJkMjU2ZDQ0OC41MTJkMTAyNGQ2NC41MTJkMTAyNGQxMjhkOTU5LjQ4OGQzODRkOTU5LjQ4OGQzODRkMzE5LjQ4N2QxMjhkMzE5LjQ4N2QxMjhkOTU5LjQ4OGhSMmQ1MTJSM2Q0NDguNTEyUjRkNjQuNTEyUjVkNzY4UjZkMFI3ZDcwMy40ODhSOGQwUjlkMjU2UjEwaTIxNlIxMWQ2NC41MTJSMTJkNTEyUjEzYWkxaTJpMmkyaTJpMWkyaTJpMmkyaGc6MTAzb1IwZDc2OFIxYWQxMjhkODk0Ljk3NmQzODRkODk0Ljk3NmQzODRkNjQxLjAyNGQxMjhkNjQxLjAyNGQxMjhkODk0Ljk3NmQxMjhkMTE1MmQzODRkMTE1MmQzODRkMTAyNGQxMjhkMTAyNGQxMjhkODk2ZDBkODk2ZDBkNjQwZDEyOGQ2NDBkMTI4ZDUxMmQ1MTJkNTEyZDUxMmQxMTUyZDM4NGQxMTUyZDM4NGQxMjgwZDEyOGQxMjgwZDEyOGQxMTUyaFIyZDY0MFIzZDUxMlI0ZDBSNWQ1MTJSNmQtMjU2UjdkNTEyUjhkMFI5ZDI1NlIxMGkxMDNSMTFkMFIxMmQ2NDBSMTNhaTFpMmkyaTJpMmkxaTJpMmkyaTJpMmkyaTJpMmkyaTJpMmkyaTJpMmhnOjIxNW9SMGQ3NjhSMWFkNjQuNTEyZDEwMjRkNjQuNTEyZDI1NmQ0NDguNTEyZDI1NmQ0NDguNTEyZDEwMjRkNjQuNTEyZDEwMjRkMTI4ZDk1OS40ODhkMzg0ZDk1OS40ODhkMzg0ZDMxOS40ODdkMTI4ZDMxOS40ODdkMTI4ZDk1OS40ODhoUjJkNTEyUjNkNDQ4LjUxMlI0ZDY0LjUxMlI1ZDc2OFI2ZDBSN2Q3MDMuNDg4UjhkMFI5ZDI1NlIxMGkyMTVSMTFkNjQuNTEyUjEyZDUxMlIxM2FpMWkyaTJpMmkyaTFpMmkyaTJpMmhnOjEwMm9SMGQ3NjhSMWFkMzg0ZDM4NGQyNTZkMzg0ZDI1NmQ1MTJkMzg0ZDUxMmQzODRkMzg0ZDEyOGQ1MTJkMTI4ZDY0MGQwZDY0MGQwZDc2OGQxMjhkNzY4ZDEyOGQxMDI0ZDI1NmQxMDI0ZDI1NmQ3NjhkMzg0ZDc2OGQzODRkNjQwZDI1NmQ2NDBkMjU2ZDUxMmQxMjhkNTEyaFIyZDUxMlIzZDM4NFI0ZDBSNWQ2NDBSNmQwUjdkNjQwUjhkMFI5ZDI1NlIxMGkxMDJSMTFkMFIxMmQ1MTJSMTNhaTFpMmkyaTJpMmkxaTJpMmkyaTJpMmkyaTJpMmkyaTJpMmkyaGc6MjE0b1IwZDc2OFIxYWQ2NC41MTJkMTAyNGQ2NC41MTJkMjU2ZDQ0OC41MTJkMjU2ZDQ0OC41MTJkMTAyNGQ2NC41MTJkMTAyNGQxMjhkOTU5LjQ4OGQzODRkOTU5LjQ4OGQzODRkMzE5LjQ4N2QxMjhkMzE5LjQ4N2QxMjhkOTU5LjQ4OGhSMmQ1MTJSM2Q0NDguNTEyUjRkNjQuNTEyUjVkNzY4UjZkMFI3ZDcwMy40ODhSOGQwUjlkMjU2UjEwaTIxNFIxMWQ2NC41MTJSMTJkNTEyUjEzYWkxaTJpMmkyaTJpMWkyaTJpMmkyaGc6MTAxb1IwZDc2OFIxYWQyNTZkNzY2Ljk3NmQyNTZkNjQxLjAyNGQxMjhkNjQxLjAyNGQxMjhkNzY2Ljk3NmQyNTZkNzY2Ljk3NmQxMjhkMTAyNGQxMjhkODk2ZDBkODk2ZDBkNjQwZDEyOGQ2NDBkMTI4ZDUxMmQzODRkNTEyZDM4NGQ2NDBkNTEyZDY0MGQ1MTJkNzY4ZDI1NmQ3NjhkMjU2ZDg5NmQzODRkODk2ZDM4NGQxMDI0ZDEyOGQxMDI0aFIyZDY0MFIzZDUxMlI0ZDBSNWQ1MTJSNmQwUjdkNTEyUjhkMFI5ZDI1NlIxMGkxMDFSMTFkMFIxMmQ2NDBSMTNhaTFpMmkyaTJpMmkxaTJpMmkyaTJpMmkyaTJpMmkyaTJpMmkyaTJpMmhnOjIxM29SMGQ3NjhSMWFkNjQuNTEyZDEwMjRkNjQuNTEyZDI1NmQ0NDguNTEyZDI1NmQ0NDguNTEyZDEwMjRkNjQuNTEyZDEwMjRkMTI4ZDk1OS40ODhkMzg0ZDk1OS40ODhkMzg0ZDMxOS40ODdkMTI4ZDMxOS40ODdkMTI4ZDk1OS40ODhoUjJkNTEyUjNkNDQ4LjUxMlI0ZDY0LjUxMlI1ZDc2OFI2ZDBSN2Q3MDMuNDg4UjhkMFI5ZDI1NlIxMGkyMTNSMTFkNjQuNTEyUjEyZDUxMlIxM2FpMWkyaTJpMmkyaTFpMmkyaTJpMmhnOjEwMG9SMGQ3NjhSMWFkMTI4ZDg5NC45NzZkMzg0ZDg5NC45NzZkMzg0ZDY0MS4wMjRkMTI4ZDY0MS4wMjRkMTI4ZDg5NC45NzZkMTI4ZDY0MGQxMjhkNTEyZDM4NGQ1MTJkMzg0ZDM4NGQ1MTJkMzg0ZDUxMmQxMDI0ZDEyOGQxMDI0ZDEyOGQ4OTZkMGQ4OTZkMGQ2NDBkMTI4ZDY0MGhSMmQ2NDBSM2Q1MTJSNGQwUjVkNjQwUjZkMFI3ZDY0MFI4ZDBSOWQyNTZSMTBpMTAwUjExZDBSMTJkNjQwUjEzYWkxaTJpMmkyaTJpMWkyaTJpMmkyaTJpMmkyaTJpMmkyaGc6MjEyb1IwZDc2OFIxYWQ2NC41MTJkMTAyNGQ2NC41MTJkMjU2ZDQ0OC41MTJkMjU2ZDQ0OC41MTJkMTAyNGQ2NC41MTJkMTAyNGQxMjhkOTU5LjQ4OGQzODRkOTU5LjQ4OGQzODRkMzE5LjQ4N2QxMjhkMzE5LjQ4N2QxMjhkOTU5LjQ4OGhSMmQ1MTJSM2Q0NDguNTEyUjRkNjQuNTEyUjVkNzY4UjZkMFI3ZDcwMy40ODhSOGQwUjlkMjU2UjEwaTIxMlIxMWQ2NC41MTJSMTJkNTEyUjEzYWkxaTJpMmkyaTJpMWkyaTJpMmkyaGc6OTlvUjBkNzY4UjFhZDM4NGQ2NDBkMzg0ZDUxMmQxMjhkNTEyZDEyOGQ2NDBkMzg0ZDY0MGQxMjhkNjQwZDBkNjQwZDBkODk2ZDEyOGQ4OTZkMTI4ZDY0MGQzODRkMTAyNGQzODRkODk2ZDEyOGQ4OTZkMTI4ZDEwMjRkMzg0ZDEwMjRoUjJkNTEyUjNkMzg0UjRkMFI1ZDUxMlI2ZDBSN2Q1MTJSOGQwUjlkMjU2UjEwaTk5UjExZDBSMTJkNTEyUjEzYWkxaTJpMmkyaTJpMWkyaTJpMmkyaTFpMmkyaTJpMmhnOjIxMW9SMGQ3NjhSMWFkNjQuNTEyZDEwMjRkNjQuNTEyZDI1NmQ0NDguNTEyZDI1NmQ0NDguNTEyZDEwMjRkNjQuNTEyZDEwMjRkMTI4ZDk1OS40ODhkMzg0ZDk1OS40ODhkMzg0ZDMxOS40ODdkMTI4ZDMxOS40ODdkMTI4ZDk1OS40ODhoUjJkNTEyUjNkNDQ4LjUxMlI0ZDY0LjUxMlI1ZDc2OFI2ZDBSN2Q3MDMuNDg4UjhkMFI5ZDI1NlIxMGkyMTFSMTFkNjQuNTEyUjEyZDUxMlIxM2FpMWkyaTJpMmkyaTFpMmkyaTJpMmhnOjk4b1IwZDc2OFIxYWQzODRkNjQwZDUxMmQ2NDBkNTEyZDg5NmQzODRkODk2ZDM4NGQxMDI0ZDBkMTAyNGQwZDM4NGQxMjhkMzg0ZDEyOGQ1MTJkMzg0ZDUxMmQzODRkNjQwZDEyOGQ4OTQuOTc2ZDM4NGQ4OTQuOTc2ZDM4NGQ2NDEuMDI0ZDEyOGQ2NDEuMDI0ZDEyOGQ4OTQuOTc2aFIyZDY0MFIzZDUxMlI0ZDBSNWQ2NDBSNmQwUjdkNjQwUjhkMFI5ZDI1NlIxMGk5OFIxMWQwUjEyZDY0MFIxM2FpMWkyaTJpMmkyaTJpMmkyaTJpMmkyaTFpMmkyaTJpMmhnOjIxMG9SMGQ3NjhSMWFkNjQuNTEyZDEwMjRkNjQuNTEyZDI1NmQ0NDguNTEyZDI1NmQ0NDguNTEyZDEwMjRkNjQuNTEyZDEwMjRkMTI4ZDk1OS40ODhkMzg0ZDk1OS40ODhkMzg0ZDMxOS40ODdkMTI4ZDMxOS40ODdkMTI4ZDk1OS40ODhoUjJkNTEyUjNkNDQ4LjUxMlI0ZDY0LjUxMlI1ZDc2OFI2ZDBSN2Q3MDMuNDg4UjhkMFI5ZDI1NlIxMGkyMTBSMTFkNjQuNTEyUjEyZDUxMlIxM2FpMWkyaTJpMmkyaTFpMmkyaTJpMmhnOjk3b1IwZDc2OFIxYWQxMjhkODk0Ljk3NmQzODRkODk0Ljk3NmQzODRkNjQxLjAyNGQxMjhkNjQxLjAyNGQxMjhkODk0Ljk3NmQxMjhkNjQwZDEyOGQ1MTJkNTEyZDUxMmQ1MTJkMTAyNGQxMjhkMTAyNGQxMjhkODk2ZDBkODk2ZDBkNjQwZDEyOGQ2NDBoUjJkNjQwUjNkNTEyUjRkMFI1ZDUxMlI2ZDBSN2Q1MTJSOGQwUjlkMjU2UjEwaTk3UjExZDBSMTJkNjQwUjEzYWkxaTJpMmkyaTJpMWkyaTJpMmkyaTJpMmkyaTJoZzoyMDlvUjBkNzY4UjFhZDY0LjUxMmQxMDI0ZDY0LjUxMmQyNTZkNDQ4LjUxMmQyNTZkNDQ4LjUxMmQxMDI0ZDY0LjUxMmQxMDI0ZDEyOGQ5NTkuNDg4ZDM4NGQ5NTkuNDg4ZDM4NGQzMTkuNDg3ZDEyOGQzMTkuNDg3ZDEyOGQ5NTkuNDg4aFIyZDUxMlIzZDQ0OC41MTJSNGQ2NC41MTJSNWQ3NjhSNmQwUjdkNzAzLjQ4OFI4ZDBSOWQyNTZSMTBpMjA5UjExZDY0LjUxMlIxMmQ1MTJSMTNhaTFpMmkyaTJpMmkxaTJpMmkyaTJoZzo5Nm9SMGQ3NjhSMWFkMGQzODRkMGQ1MTJkMTI4ZDUxMmQxMjhkMzg0ZDBkMzg0ZDEyOGQ2NDBkMjU2ZDY0MGQyNTZkNTEyZDEyOGQ1MTJkMTI4ZDY0MGhSMmQzODRSM2QyNTZSNGQwUjVkNjQwUjZkMzg0UjdkNjQwUjhkMFI5ZDI1NlIxMGk5NlIxMWQwUjEyZDM4NFIxM2FpMWkyaTJpMmkyaTFpMmkyaTJpMmhnOjIwOG9SMGQ3NjhSMWFkNjQuNTEyZDEwMjRkNjQuNTEyZDI1NmQ0NDguNTEyZDI1NmQ0NDguNTEyZDEwMjRkNjQuNTEyZDEwMjRkMTI4ZDk1OS40ODhkMzg0ZDk1OS40ODhkMzg0ZDMxOS40ODdkMTI4ZDMxOS40ODdkMTI4ZDk1OS40ODhoUjJkNTEyUjNkNDQ4LjUxMlI0ZDY0LjUxMlI1ZDc2OFI2ZDBSN2Q3MDMuNDg4UjhkMFI5ZDI1NlIxMGkyMDhSMTFkNjQuNTEyUjEyZDUxMlIxM2FpMWkyaTJpMmkyaTFpMmkyaTJpMmhnOjk1b1IwZDc2OFIxYWQwZDg5NmQwZDEwMjRkNTEyZDEwMjRkNTEyZDg5NmQwZDg5NmhSMmQ2NDBSM2Q1MTJSNGQwUjVkMTI4UjZkMFI3ZDEyOFI4ZDBSOWQyNTZSMTBpOTVSMTFkMFIxMmQ2NDBSMTNhaTFpMmkyaTJpMmhnOjIwN29SMGQ3NjhSMWFkNjQuNTEyZDEwMjRkNjQuNTEyZDI1NmQ0NDguNTEyZDI1NmQ0NDguNTEyZDEwMjRkNjQuNTEyZDEwMjRkMTI4ZDk1OS40ODhkMzg0ZDk1OS40ODhkMzg0ZDMxOS40ODdkMTI4ZDMxOS40ODdkMTI4ZDk1OS40ODhoUjJkNTEyUjNkNDQ4LjUxMlI0ZDY0LjUxMlI1ZDc2OFI2ZDBSN2Q3MDMuNDg4UjhkMFI5ZDI1NlIxMGkyMDdSMTFkNjQuNTEyUjEyZDUxMlIxM2FpMWkyaTJpMmkyaTFpMmkyaTJpMmhnOjk0b1IwZDc2OFIxYWQxMjhkMzg0ZDEyOGQ1MTJkMjU2ZDUxMmQyNTZkMzg0ZDEyOGQzODRkMGQ2NDBkMTI4ZDY0MGQxMjhkNTEyZDBkNTEyZDBkNjQwZDI1NmQ2NDBkMzg0ZDY0MGQzODRkNTEyZDI1NmQ1MTJkMjU2ZDY0MGhSMmQ1MTJSM2QzODRSNGQwUjVkNjQwUjZkMzg0UjdkNjQwUjhkMFI5ZDI1NlIxMGk5NFIxMWQwUjEyZDUxMlIxM2FpMWkyaTJpMmkyaTFpMmkyaTJpMmkxaTJpMmkyaTJoZzoyMDZvUjBkNzY4UjFhZDY0LjUxMmQxMDI0ZDY0LjUxMmQyNTZkNDQ4LjUxMmQyNTZkNDQ4LjUxMmQxMDI0ZDY0LjUxMmQxMDI0ZDEyOGQ5NTkuNDg4ZDM4NGQ5NTkuNDg4ZDM4NGQzMTkuNDg3ZDEyOGQzMTkuNDg3ZDEyOGQ5NTkuNDg4aFIyZDUxMlIzZDQ0OC41MTJSNGQ2NC41MTJSNWQ3NjhSNmQwUjdkNzAzLjQ4OFI4ZDBSOWQyNTZSMTBpMjA2UjExZDY0LjUxMlIxMmQ1MTJSMTNhaTFpMmkyaTJpMmkxaTJpMmkyaTJoZzo5M29SMGQ3NjhSMWFkMjU2ZDEwMjRkMjU2ZDM4NGQwZDM4NGQwZDUxMmQxMjhkNTEyZDEyOGQ4OTZkMGQ4OTZkMGQxMDI0ZDI1NmQxMDI0aFIyZDM4NFIzZDI1NlI0ZDBSNWQ2NDBSNmQwUjdkNjQwUjhkMFI5ZDI1NlIxMGk5M1IxMWQwUjEyZDM4NFIxM2FpMWkyaTJpMmkyaTJpMmkyaTJoZzoyMDVvUjBkNzY4UjFhZDY0LjUxMmQxMDI0ZDY0LjUxMmQyNTZkNDQ4LjUxMmQyNTZkNDQ4LjUxMmQxMDI0ZDY0LjUxMmQxMDI0ZDEyOGQ5NTkuNDg4ZDM4NGQ5NTkuNDg4ZDM4NGQzMTkuNDg3ZDEyOGQzMTkuNDg3ZDEyOGQ5NTkuNDg4aFIyZDUxMlIzZDQ0OC41MTJSNGQ2NC41MTJSNWQ3NjhSNmQwUjdkNzAzLjQ4OFI4ZDBSOWQyNTZSMTBpMjA1UjExZDY0LjUxMlIxMmQ1MTJSMTNhaTFpMmkyaTJpMmkxaTJpMmkyaTJoZzo5Mm9SMGQ3NjhSMWFkMjU2ZDY0MGQxMjhkNjQwZDEyOGQ1MTJkMjU2ZDUxMmQyNTZkNjQwZDEyOGQzODRkMTI4ZDUxMmQwZDUxMmQwZDM4NGQxMjhkMzg0ZDUxMmQ4OTZkMzg0ZDg5NmQzODRkNzY4ZDUxMmQ3NjhkNTEyZDg5NmQzODRkNzY4ZDI1NmQ3NjhkMjU2ZDY0MGQzODRkNjQwZDM4NGQ3NjhkNjQwZDEwMjRkNTEyZDEwMjRkNTEyZDg5NmQ2NDBkODk2ZDY0MGQxMDI0aFIyZDc2OFIzZDY0MFI0ZDBSNWQ2NDBSNmQwUjdkNjQwUjhkMFI5ZDI1NlIxMGk5MlIxMWQwUjEyZDc2OFIxM2FpMWkyaTJpMmkyaTFpMmkyaTJpMmkxaTJpMmkyaTJpMWkyaTJpMmkyaTFpMmkyaTJpMmhnOjIwNG9SMGQ3NjhSMWFkNjQuNTEyZDEwMjRkNjQuNTEyZDI1NmQ0NDguNTEyZDI1NmQ0NDguNTEyZDEwMjRkNjQuNTEyZDEwMjRkMTI4ZDk1OS40ODhkMzg0ZDk1OS40ODhkMzg0ZDMxOS40ODdkMTI4ZDMxOS40ODdkMTI4ZDk1OS40ODhoUjJkNTEyUjNkNDQ4LjUxMlI0ZDY0LjUxMlI1ZDc2OFI2ZDBSN2Q3MDMuNDg4UjhkMFI5ZDI1NlIxMGkyMDRSMTFkNjQuNTEyUjEyZDUxMlIxM2FpMWkyaTJpMmkyaTFpMmkyaTJpMmhnOjkxb1IwZDc2OFIxYWQwZDM4NGQwZDEwMjRkMjU2ZDEwMjRkMjU2ZDg5NmQxMjhkODk2ZDEyOGQ1MTJkMjU2ZDUxMmQyNTZkMzg0ZDBkMzg0aFIyZDM4NFIzZDI1NlI0ZDBSNWQ2NDBSNmQwUjdkNjQwUjhkMFI5ZDI1NlIxMGk5MVIxMWQwUjEyZDM4NFIxM2FpMWkyaTJpMmkyaTJpMmkyaTJoZzoyMDNvUjBkNzY4UjFhZDY0LjUxMmQxMDI0ZDY0LjUxMmQyNTZkNDQ4LjUxMmQyNTZkNDQ4LjUxMmQxMDI0ZDY0LjUxMmQxMDI0ZDEyOGQ5NTkuNDg4ZDM4NGQ5NTkuNDg4ZDM4NGQzMTkuNDg3ZDEyOGQzMTkuNDg3ZDEyOGQ5NTkuNDg4aFIyZDUxMlIzZDQ0OC41MTJSNGQ2NC41MTJSNWQ3NjhSNmQwUjdkNzAzLjQ4OFI4ZDBSOWQyNTZSMTBpMjAzUjExZDY0LjUxMlIxMmQ1MTJSMTNhaTFpMmkyaTJpMmkxaTJpMmkyaTJoZzo5MG9SMGQ3NjhSMWFkMzg0ZDM4NGQwZDM4NGQwZDUxMmQyNTZkNTEyZDI1NmQ2NDBkMzg0ZDY0MGQzODRkMzg0ZDI1NmQ2NDBkMTI4ZDY0MGQxMjhkNzY4ZDI1NmQ3NjhkMjU2ZDY0MGQzODRkMTAyNGQzODRkODk2ZDEyOGQ4OTZkMTI4ZDc2OGQwZDc2OGQwZDEwMjRkMzg0ZDEwMjRoUjJkNTEyUjNkMzg0UjRkMFI1ZDY0MFI2ZDBSN2Q2NDBSOGQwUjlkMjU2UjEwaTkwUjExZDBSMTJkNTEyUjEzYWkxaTJpMmkyaTJpMmkyaTFpMmkyaTJpMmkxaTJpMmkyaTJpMmkyaGc6MjAyb1IwZDc2OFIxYWQ2NC41MTJkMTAyNGQ2NC41MTJkMjU2ZDQ0OC41MTJkMjU2ZDQ0OC41MTJkMTAyNGQ2NC41MTJkMTAyNGQxMjhkOTU5LjQ4OGQzODRkOTU5LjQ4OGQzODRkMzE5LjQ4N2QxMjhkMzE5LjQ4N2QxMjhkOTU5LjQ4OGhSMmQ1MTJSM2Q0NDguNTEyUjRkNjQuNTEyUjVkNzY4UjZkMFI3ZDcwMy40ODhSOGQwUjlkMjU2UjEwaTIwMlIxMWQ2NC41MTJSMTJkNTEyUjEzYWkxaTJpMmkyaTJpMWkyaTJpMmkyaGc6ODlvUjBkNzY4UjFhZDEyOGQzODRkMGQzODRkMGQ2NDBkMTI4ZDY0MGQxMjhkMzg0ZDM4NGQ2NDBkMTI4ZDY0MGQxMjhkNzY4ZDM4NGQ3NjhkMzg0ZDg5NmQ1MTJkODk2ZDUxMmQzODRkMzg0ZDM4NGQzODRkNjQwZDEyOGQ4OTZkMTI4ZDEwMjRkMzg0ZDEwMjRkMzg0ZDg5NmQxMjhkODk2aFIyZDY0MFIzZDUxMlI0ZDBSNWQ2NDBSNmQwUjdkNjQwUjhkMFI5ZDI1NlIxMGk4OVIxMWQwUjEyZDY0MFIxM2FpMWkyaTJpMmkyaTFpMmkyaTJpMmkyaTJpMmkyaTFpMmkyaTJpMmhnOjIwMW9SMGQ3NjhSMWFkNjQuNTEyZDEwMjRkNjQuNTEyZDI1NmQ0NDguNTEyZDI1NmQ0NDguNTEyZDEwMjRkNjQuNTEyZDEwMjRkMTI4ZDk1OS40ODhkMzg0ZDk1OS40ODhkMzg0ZDMxOS40ODdkMTI4ZDMxOS40ODdkMTI4ZDk1OS40ODhoUjJkNTEyUjNkNDQ4LjUxMlI0ZDY0LjUxMlI1ZDc2OFI2ZDBSN2Q3MDMuNDg4UjhkMFI5ZDI1NlIxMGkyMDFSMTFkNjQuNTEyUjEyZDUxMlIxM2FpMWkyaTJpMmkyaTFpMmkyaTJpMmhnOjg4b1IwZDc2OFIxYWQxMjhkMzg0ZDBkMzg0ZDBkNjQwZDEyOGQ2NDBkMTI4ZDM4NGQ1MTJkMzg0ZDM4NGQzODRkMzg0ZDY0MGQ1MTJkNjQwZDUxMmQzODRkMzg0ZDc2OGQzODRkNjQwZDEyOGQ2NDBkMTI4ZDc2OGQzODRkNzY4ZDEyOGQ3NjhkMGQ3NjhkMGQxMDI0ZDEyOGQxMDI0ZDEyOGQ3NjhkMzg0ZDEwMjRkNTEyZDEwMjRkNTEyZDc2OGQzODRkNzY4ZDM4NGQxMDI0aFIyZDY0MFIzZDUxMlI0ZDBSNWQ2NDBSNmQwUjdkNjQwUjhkMFI5ZDI1NlIxMGk4OFIxMWQwUjEyZDY0MFIxM2FpMWkyaTJpMmkyaTFpMmkyaTJpMmkxaTJpMmkyaTJpMWkyaTJpMmkyaTFpMmkyaTJpMmhnOjIwMG9SMGQ3NjhSMWFkNjQuNTEyZDEwMjRkNjQuNTEyZDI1NmQ0NDguNTEyZDI1NmQ0NDguNTEyZDEwMjRkNjQuNTEyZDEwMjRkMTI4ZDk1OS40ODhkMzg0ZDk1OS40ODhkMzg0ZDMxOS40ODdkMTI4ZDMxOS40ODdkMTI4ZDk1OS40ODhoUjJkNTEyUjNkNDQ4LjUxMlI0ZDY0LjUxMlI1ZDc2OFI2ZDBSN2Q3MDMuNDg4UjhkMFI5ZDI1NlIxMGkyMDBSMTFkNjQuNTEyUjEyZDUxMlIxM2FpMWkyaTJpMmkyaTFpMmkyaTJpMmhnOjg3b1IwZDc2OFIxYWQxMjhkMzg0ZDBkMzg0ZDBkODk2ZDEyOGQ4OTZkMTI4ZDM4NGQzODRkNTEyZDI1NmQ1MTJkMjU2ZDg5NmQzODRkODk2ZDM4NGQ1MTJkMTI4ZDEwMjRkMjU2ZDEwMjRkMjU2ZDg5NmQxMjhkODk2ZDEyOGQxMDI0ZDM4NGQxMDI0ZDUxMmQxMDI0ZDUxMmQ4OTZkMzg0ZDg5NmQzODRkMTAyNGQ1MTJkMzg0ZDUxMmQ4OTZkNjQwZDg5NmQ2NDBkMzg0ZDUxMmQzODRoUjJkNzY4UjNkNjQwUjRkMFI1ZDY0MFI2ZDBSN2Q2NDBSOGQwUjlkMjU2UjEwaTg3UjExZDBSMTJkNzY4UjEzYWkxaTJpMmkyaTJpMWkyaTJpMmkyaTFpMmkyaTJpMmkxaTJpMmkyaTJpMWkyaTJpMmkyaGc6MTk5b1IwZDc2OFIxYWQ2NC41MTJkMTAyNGQ2NC41MTJkMjU2ZDQ0OC41MTJkMjU2ZDQ0OC41MTJkMTAyNGQ2NC41MTJkMTAyNGQxMjhkOTU5LjQ4OGQzODRkOTU5LjQ4OGQzODRkMzE5LjQ4N2QxMjhkMzE5LjQ4N2QxMjhkOTU5LjQ4OGhSMmQ1MTJSM2Q0NDguNTEyUjRkNjQuNTEyUjVkNzY4UjZkMFI3ZDcwMy40ODhSOGQwUjlkMjU2UjEwaTE5OVIxMWQ2NC41MTJSMTJkNTEyUjEzYWkxaTJpMmkyaTJpMWkyaTJpMmkyaGc6ODZvUjBkNzY4UjFhZDBkODk2ZDEyOGQ4OTZkMTI4ZDM4NGQwZDM4NGQwZDg5NmQyNTZkODk2ZDM4NGQ4OTZkMzg0ZDY0MGQyNTZkNjQwZDI1NmQ4OTZkMzg0ZDM4NGQzODRkNjQwZDUxMmQ2NDBkNTEyZDM4NGQzODRkMzg0ZDEyOGQxMDI0ZDI1NmQxMDI0ZDI1NmQ4OTZkMTI4ZDg5NmQxMjhkMTAyNGhSMmQ2NDBSM2Q1MTJSNGQwUjVkNjQwUjZkMFI3ZDY0MFI4ZDBSOWQyNTZSMTBpODZSMTFkMFIxMmQ2NDBSMTNhaTFpMmkyaTJpMmkxaTJpMmkyaTJpMWkyaTJpMmkyaTFpMmkyaTJpMmhnOjE5OG9SMGQ3NjhSMWFkNjQuNTEyZDEwMjRkNjQuNTEyZDI1NmQ0NDguNTEyZDI1NmQ0NDguNTEyZDEwMjRkNjQuNTEyZDEwMjRkMTI4ZDk1OS40ODhkMzg0ZDk1OS40ODhkMzg0ZDMxOS40ODdkMTI4ZDMxOS40ODdkMTI4ZDk1OS40ODhoUjJkNTEyUjNkNDQ4LjUxMlI0ZDY0LjUxMlI1ZDc2OFI2ZDBSN2Q3MDMuNDg4UjhkMFI5ZDI1NlIxMGkxOThSMTFkNjQuNTEyUjEyZDUxMlIxM2FpMWkyaTJpMmkyaTFpMmkyaTJpMmhnOjg1b1IwZDc2OFIxYWQzODRkODk2ZDUxMmQ4OTZkNTEyZDM4NGQzODRkMzg0ZDM4NGQ4OTZkMTI4ZDM4NGQwZDM4NGQwZDg5NmQxMjhkODk2ZDEyOGQzODRkMTI4ZDg5NmQxMjhkMTAyNGQzODRkMTAyNGQzODRkODk2ZDEyOGQ4OTZoUjJkNjQwUjNkNTEyUjRkMFI1ZDY0MFI2ZDBSN2Q2NDBSOGQwUjlkMjU2UjEwaTg1UjExZDBSMTJkNjQwUjEzYWkxaTJpMmkyaTJpMWkyaTJpMmkyaTFpMmkyaTJpMmhnOjE5N29SMGQ3NjhSMWFkNjQuNTEyZDEwMjRkNjQuNTEyZDI1NmQ0NDguNTEyZDI1NmQ0NDguNTEyZDEwMjRkNjQuNTEyZDEwMjRkMTI4ZDk1OS40ODhkMzg0ZDk1OS40ODhkMzg0ZDMxOS40ODdkMTI4ZDMxOS40ODdkMTI4ZDk1OS40ODhoUjJkNTEyUjNkNDQ4LjUxMlI0ZDY0LjUxMlI1ZDc2OFI2ZDBSN2Q3MDMuNDg4UjhkMFI5ZDI1NlIxMGkxOTdSMTFkNjQuNTEyUjEyZDUxMlIxM2FpMWkyaTJpMmkyaTFpMmkyaTJpMmhnOjg0b1IwZDc2OFIxYWQxMjhkMTAyNGQyNTZkMTAyNGQyNTZkNTEyZDM4NGQ1MTJkMzg0ZDM4NGQwZDM4NGQwZDUxMmQxMjhkNTEyZDEyOGQxMDI0aFIyZDUxMlIzZDM4NFI0ZDBSNWQ2NDBSNmQwUjdkNjQwUjhkMFI5ZDI1NlIxMGk4NFIxMWQwUjEyZDUxMlIxM2FpMWkyaTJpMmkyaTJpMmkyaTJoZzoxOTZvUjBkNzY4UjFhZDY0LjUxMmQxMDI0ZDY0LjUxMmQyNTZkNDQ4LjUxMmQyNTZkNDQ4LjUxMmQxMDI0ZDY0LjUxMmQxMDI0ZDEyOGQ5NTkuNDg4ZDM4NGQ5NTkuNDg4ZDM4NGQzMTkuNDg3ZDEyOGQzMTkuNDg3ZDEyOGQ5NTkuNDg4aFIyZDUxMlIzZDQ0OC41MTJSNGQ2NC41MTJSNWQ3NjhSNmQwUjdkNzAzLjQ4OFI4ZDBSOWQyNTZSMTBpMTk2UjExZDY0LjUxMlIxMmQ1MTJSMTNhaTFpMmkyaTJpMmkxaTJpMmkyaTJoZzo4M29SMGQ3NjhSMWFkMGQ2NDBkMTI4ZDY0MGQxMjhkNTEyZDBkNTEyZDBkNjQwZDEyOGQzODRkMTI4ZDUxMmQ1MTJkNTEyZDUxMmQzODRkMTI4ZDM4NGQzODRkNzY4ZDM4NGQ2NDBkMTI4ZDY0MGQxMjhkNzY4ZDM4NGQ3NjhkNTEyZDg5NmQ1MTJkNzY4ZDM4NGQ3NjhkMzg0ZDg5NmQ1MTJkODk2ZDBkODk2ZDBkMTAyNGQzODRkMTAyNGQzODRkODk2ZDBkODk2aFIyZDY0MFIzZDUxMlI0ZDBSNWQ2NDBSNmQwUjdkNjQwUjhkMFI5ZDI1NlIxMGk4M1IxMWQwUjEyZDY0MFIxM2FpMWkyaTJpMmkyaTFpMmkyaTJpMmkxaTJpMmkyaTJpMWkyaTJpMmkyaTFpMmkyaTJpMmhnOjE5NW9SMGQ3NjhSMWFkNjQuNTEyZDEwMjRkNjQuNTEyZDI1NmQ0NDguNTEyZDI1NmQ0NDguNTEyZDEwMjRkNjQuNTEyZDEwMjRkMTI4ZDk1OS40ODhkMzg0ZDk1OS40ODhkMzg0ZDMxOS40ODdkMTI4ZDMxOS40ODdkMTI4ZDk1OS40ODhoUjJkNTEyUjNkNDQ4LjUxMlI0ZDY0LjUxMlI1ZDc2OFI2ZDBSN2Q3MDMuNDg4UjhkMFI5ZDI1NlIxMGkxOTVSMTFkNjQuNTEyUjEyZDUxMlIxM2FpMWkyaTJpMmkyaTFpMmkyaTJpMmhnOjgyb1IwZDc2OFIxYWQ1MTJkMTAyNGQzODRkMTAyNGQzODRkODk2ZDEyOGQ4OTZkMTI4ZDEwMjRkMGQxMDI0ZDBkMzg0ZDM4NGQzODRkMzg0ZDUxMC45NzZkMTI4ZDUxMC45NzZkMTI4ZDc2Ni45NzZkMzg0ZDc2Ni45NzZkMzg0ZDUxMmQ1MTJkNTEyZDUxMmQ3NjhkMzg0ZDc2OGQzODRkODk2ZDUxMmQ4OTZkNTEyZDEwMjRoUjJkNjQwUjNkNTEyUjRkMFI1ZDY0MFI2ZDBSN2Q2NDBSOGQwUjlkMjU2UjEwaTgyUjExZDBSMTJkNjQwUjEzYWkxaTJpMmkyaTJpMmkyaTJpMmkyaTJpMmkyaTJpMmkyaTJpMmkyaGc6MTk0b1IwZDc2OFIxYWQ2NC41MTJkMTAyNGQ2NC41MTJkMjU2ZDQ0OC41MTJkMjU2ZDQ0OC41MTJkMTAyNGQ2NC41MTJkMTAyNGQxMjhkOTU5LjQ4OGQzODRkOTU5LjQ4OGQzODRkMzE5LjQ4N2QxMjhkMzE5LjQ4N2QxMjhkOTU5LjQ4OGhSMmQ1MTJSM2Q0NDguNTEyUjRkNjQuNTEyUjVkNzY4UjZkMFI3ZDcwMy40ODhSOGQwUjlkMjU2UjEwaTE5NFIxMWQ2NC41MTJSMTJkNTEyUjEzYWkxaTJpMmkyaTJpMWkyaTJpMmkyaGc6ODFvUjBkNzY4UjFhZDM4NGQ4OTQuOTc2ZDM4NGQ1MTMuMDI0ZDEyOGQ1MTMuMDI0ZDEyOGQ4OTQuOTc2ZDM4NGQ4OTQuOTc2ZDEyOGQ4OTZkMGQ4OTZkMGQ1MTJkMTI4ZDUxMmQxMjhkMzg0ZDM4NGQzODRkMzg0ZDUxMmQ1MTJkNTEyZDUxMmQ4OTZkMzg0ZDg5NmQzODRkMTAyNGQ1MTJkMTAyNGQ1MTJkMTE1MmQzODRkMTE1MmQzODRkMTAyNGQxMjhkMTAyNGQxMjhkODk2aFIyZDY0MFIzZDUxMlI0ZDBSNWQ2NDBSNmQtMTI4UjdkNjQwUjhkMFI5ZDI1NlIxMGk4MVIxMWQwUjEyZDY0MFIxM2FpMWkyaTJpMmkyaTFpMmkyaTJpMmkyaTJpMmkyaTJpMmkyaTJpMmkyaTJpMmhnOjE5M29SMGQ3NjhSMWFkNjQuNTEyZDEwMjRkNjQuNTEyZDI1NmQ0NDguNTEyZDI1NmQ0NDguNTEyZDEwMjRkNjQuNTEyZDEwMjRkMTI4ZDk1OS40ODhkMzg0ZDk1OS40ODhkMzg0ZDMxOS40ODdkMTI4ZDMxOS40ODdkMTI4ZDk1OS40ODhoUjJkNTEyUjNkNDQ4LjUxMlI0ZDY0LjUxMlI1ZDc2OFI2ZDBSN2Q3MDMuNDg4UjhkMFI5ZDI1NlIxMGkxOTNSMTFkNjQuNTEyUjEyZDUxMlIxM2FpMWkyaTJpMmkyaTFpMmkyaTJpMmhnOjgwb1IwZDc2OFIxYWQzODRkNTEyZDUxMmQ1MTJkNTEyZDc2OGQzODRkNzY4ZDM4NGQ4OTZkMTI4ZDg5NmQxMjhkMTAyNGQwZDEwMjRkMGQzODRkMzg0ZDM4NGQzODRkNTEyZDEyOGQ3NjYuOTc2ZDM4NGQ3NjYuOTc2ZDM4NGQ1MTMuMDI0ZDEyOGQ1MTMuMDI0ZDEyOGQ3NjYuOTc2aFIyZDY0MFIzZDUxMlI0ZDBSNWQ2NDBSNmQwUjdkNjQwUjhkMFI5ZDI1NlIxMGk4MFIxMWQwUjEyZDY0MFIxM2FpMWkyaTJpMmkyaTJpMmkyaTJpMmkyaTFpMmkyaTJpMmhnOjE5Mm9SMGQ3NjhSMWFkNjQuNTEyZDEwMjRkNjQuNTEyZDI1NmQ0NDguNTEyZDI1NmQ0NDguNTEyZDEwMjRkNjQuNTEyZDEwMjRkMTI4ZDk1OS40ODhkMzg0ZDk1OS40ODhkMzg0ZDMxOS40ODdkMTI4ZDMxOS40ODdkMTI4ZDk1OS40ODhoUjJkNTEyUjNkNDQ4LjUxMlI0ZDY0LjUxMlI1ZDc2OFI2ZDBSN2Q3MDMuNDg4UjhkMFI5ZDI1NlIxMGkxOTJSMTFkNjQuNTEyUjEyZDUxMlIxM2FpMWkyaTJpMmkyaTFpMmkyaTJpMmhnOjc5b1IwZDc2OFIxYWQzODRkODk0Ljk3NmQzODRkNTEzLjAyNGQxMjhkNTEzLjAyNGQxMjhkODk0Ljk3NmQzODRkODk0Ljk3NmQxMjhkODk2ZDBkODk2ZDBkNTEyZDEyOGQ1MTJkMTI4ZDM4NGQzODRkMzg0ZDM4NGQ1MTJkNTEyZDUxMmQ1MTJkODk2ZDM4NGQ4OTZkMzg0ZDEwMjRkMTI4ZDEwMjRkMTI4ZDg5NmhSMmQ2NDBSM2Q1MTJSNGQwUjVkNjQwUjZkMFI3ZDY0MFI4ZDBSOWQyNTZSMTBpNzlSMTFkMFIxMmQ2NDBSMTNhaTFpMmkyaTJpMmkxaTJpMmkyaTJpMmkyaTJpMmkyaTJpMmkyaGc6MTkxb1IwZDc2OFIxYWQ2NC41MTJkMTAyNGQ2NC41MTJkMjU2ZDQ0OC41MTJkMjU2ZDQ0OC41MTJkMTAyNGQ2NC41MTJkMTAyNGQxMjhkOTU5LjQ4OGQzODRkOTU5LjQ4OGQzODRkMzE5LjQ4N2QxMjhkMzE5LjQ4N2QxMjhkOTU5LjQ4OGhSMmQ1MTJSM2Q0NDguNTEyUjRkNjQuNTEyUjVkNzY4UjZkMFI3ZDcwMy40ODhSOGQwUjlkMjU2UjEwaTE5MVIxMWQ2NC41MTJSMTJkNTEyUjEzYWkxaTJpMmkyaTJpMWkyaTJpMmkyaGc6NzhvUjBkNzY4UjFhZDM4NGQ3NjhkMzg0ZDEwMjRkNTEyZDEwMjRkNTEyZDM4NGQzODRkMzg0ZDM4NGQ2NDBkMjU2ZDY0MGQyNTZkNzY4ZDM4NGQ3NjhkMTI4ZDY0MGQyNTZkNjQwZDI1NmQ1MTJkMTI4ZDUxMmQxMjhkMzg0ZDBkMzg0ZDBkMTAyNGQxMjhkMTAyNGQxMjhkNjQwaFIyZDY0MFIzZDUxMlI0ZDBSNWQ2NDBSNmQwUjdkNjQwUjhkMFI5ZDI1NlIxMGk3OFIxMWQwUjEyZDY0MFIxM2FpMWkyaTJpMmkyaTJpMmkyaTJpMWkyaTJpMmkyaTJpMmkyaTJoZzoxOTBvUjBkNzY4UjFhZDY0LjUxMmQxMDI0ZDY0LjUxMmQyNTZkNDQ4LjUxMmQyNTZkNDQ4LjUxMmQxMDI0ZDY0LjUxMmQxMDI0ZDEyOGQ5NTkuNDg4ZDM4NGQ5NTkuNDg4ZDM4NGQzMTkuNDg3ZDEyOGQzMTkuNDg3ZDEyOGQ5NTkuNDg4aFIyZDUxMlIzZDQ0OC41MTJSNGQ2NC41MTJSNWQ3NjhSNmQwUjdkNzAzLjQ4OFI4ZDBSOWQyNTZSMTBpMTkwUjExZDY0LjUxMlIxMmQ1MTJSMTNhaTFpMmkyaTJpMmkxaTJpMmkyaTJoZzo3N29SMGQ3NjhSMWFkMTI4ZDUxMmQxMjhkMzg0ZDBkMzg0ZDBkMTAyNGQxMjhkMTAyNGQxMjhkNjQwZDI1NmQ2NDBkMjU2ZDUxMmQxMjhkNTEyZDI1NmQ3NjhkMzg0ZDc2OGQzODRkNjQwZDI1NmQ2NDBkMjU2ZDc2OGQ1MTJkNTEyZDM4NGQ1MTJkMzg0ZDY0MGQ1MTJkNjQwZDUxMmQxMDI0ZDY0MGQxMDI0ZDY0MGQzODRkNTEyZDM4NGQ1MTJkNTEyaFIyZDc2OFIzZDY0MFI0ZDBSNWQ2NDBSNmQwUjdkNjQwUjhkMFI5ZDI1NlIxMGk3N1IxMWQwUjEyZDc2OFIxM2FpMWkyaTJpMmkyaTJpMmkyaTJpMWkyaTJpMmkyaTFpMmkyaTJpMmkyaTJpMmkyaGc6MTg5b1IwZDc2OFIxYWQ2NC41MTJkMTAyNGQ2NC41MTJkMjU2ZDQ0OC41MTJkMjU2ZDQ0OC41MTJkMTAyNGQ2NC41MTJkMTAyNGQxMjhkOTU5LjQ4OGQzODRkOTU5LjQ4OGQzODRkMzE5LjQ4N2QxMjhkMzE5LjQ4N2QxMjhkOTU5LjQ4OGhSMmQ1MTJSM2Q0NDguNTEyUjRkNjQuNTEyUjVkNzY4UjZkMFI3ZDcwMy40ODhSOGQwUjlkMjU2UjEwaTE4OVIxMWQ2NC41MTJSMTJkNTEyUjEzYWkxaTJpMmkyaTJpMWkyaTJpMmkyaGc6NzZvUjBkNzY4UjFhZDM4NGQxMDI0ZDM4NGQ4OTZkMTI4ZDg5NmQxMjhkMzg0ZDBkMzg0ZDBkMTAyNGQzODRkMTAyNGhSMmQ1MTJSM2QzODRSNGQwUjVkNjQwUjZkMFI3ZDY0MFI4ZDBSOWQyNTZSMTBpNzZSMTFkMFIxMmQ1MTJSMTNhaTFpMmkyaTJpMmkyaTJoZzoxODhvUjBkNzY4UjFhZDY0LjUxMmQxMDI0ZDY0LjUxMmQyNTZkNDQ4LjUxMmQyNTZkNDQ4LjUxMmQxMDI0ZDY0LjUxMmQxMDI0ZDEyOGQ5NTkuNDg4ZDM4NGQ5NTkuNDg4ZDM4NGQzMTkuNDg3ZDEyOGQzMTkuNDg3ZDEyOGQ5NTkuNDg4aFIyZDUxMlIzZDQ0OC41MTJSNGQ2NC41MTJSNWQ3NjhSNmQwUjdkNzAzLjQ4OFI4ZDBSOWQyNTZSMTBpMTg4UjExZDY0LjUxMlIxMmQ1MTJSMTNhaTFpMmkyaTJpMmkxaTJpMmkyaTJoZzo3NW9SMGQ3NjhSMWFkMTI4ZDM4NGQwZDM4NGQwZDEwMjRkMTI4ZDEwMjRkMTI4ZDc2OGQyNTZkNzY4ZDI1NmQ2NDBkMTI4ZDY0MGQxMjhkMzg0ZDM4NGQ1MTJkNTEyZDUxMmQ1MTJkMzg0ZDM4NGQzODRkMzg0ZDUxMmQyNTZkNjQwZDM4NGQ2NDBkMzg0ZDUxMmQyNTZkNTEyZDI1NmQ2NDBkMzg0ZDg5NmQzODRkNzY4ZDI1NmQ3NjhkMjU2ZDg5NmQzODRkODk2ZDUxMmQxMDI0ZDUxMmQ4OTZkMzg0ZDg5NmQzODRkMTAyNGQ1MTJkMTAyNGhSMmQ2NDBSM2Q1MTJSNGQwUjVkNjQwUjZkMFI3ZDY0MFI4ZDBSOWQyNTZSMTBpNzVSMTFkMFIxMmQ2NDBSMTNhaTFpMmkyaTJpMmkyaTJpMmkyaTFpMmkyaTJpMmkxaTJpMmkyaTJpMWkyaTJpMmkyaTFpMmkyaTJpMmhnOjE4N29SMGQ3NjhSMWFkNjQuNTEyZDEwMjRkNjQuNTEyZDI1NmQ0NDguNTEyZDI1NmQ0NDguNTEyZDEwMjRkNjQuNTEyZDEwMjRkMTI4ZDk1OS40ODhkMzg0ZDk1OS40ODhkMzg0ZDMxOS40ODdkMTI4ZDMxOS40ODdkMTI4ZDk1OS40ODhoUjJkNTEyUjNkNDQ4LjUxMlI0ZDY0LjUxMlI1ZDc2OFI2ZDBSN2Q3MDMuNDg4UjhkMFI5ZDI1NlIxMGkxODdSMTFkNjQuNTEyUjEyZDUxMlIxM2FpMWkyaTJpMmkyaTFpMmkyaTJpMmhnOjc0b1IwZDc2OFIxYWQyNTZkMzg0ZDI1NmQ1MTJkMzg0ZDUxMmQzODRkODk2ZDUxMmQ4OTZkNTEyZDM4NGQyNTZkMzg0ZDBkNzY4ZDBkODk2ZDEyOGQ4OTZkMTI4ZDc2OGQwZDc2OGQxMjhkODk2ZDEyOGQxMDI0ZDM4NGQxMDI0ZDM4NGQ4OTZkMTI4ZDg5NmhSMmQ2NDBSM2Q1MTJSNGQwUjVkNjQwUjZkMFI3ZDY0MFI4ZDBSOWQyNTZSMTBpNzRSMTFkMFIxMmQ2NDBSMTNhaTFpMmkyaTJpMmkyaTJpMWkyaTJpMmkyaTFpMmkyaTJpMmhnOjE4Nm9SMGQ3NjhSMWFkNjQuNTEyZDEwMjRkNjQuNTEyZDI1NmQ0NDguNTEyZDI1NmQ0NDguNTEyZDEwMjRkNjQuNTEyZDEwMjRkMTI4ZDk1OS40ODhkMzg0ZDk1OS40ODhkMzg0ZDMxOS40ODdkMTI4ZDMxOS40ODdkMTI4ZDk1OS40ODhoUjJkNTEyUjNkNDQ4LjUxMlI0ZDY0LjUxMlI1ZDc2OFI2ZDBSN2Q3MDMuNDg4UjhkMFI5ZDI1NlIxMGkxODZSMTFkNjQuNTEyUjEyZDUxMlIxM2FpMWkyaTJpMmkyaTFpMmkyaTJpMmhnOjczb1IwZDc2OFIxYWQyNTZkNTEyZDM4NGQ1MTJkMzg0ZDM4NGQwZDM4NGQwZDUxMmQxMjhkNTEyZDEyOGQ4OTZkMGQ4OTZkMGQxMDI0ZDM4NGQxMDI0ZDM4NGQ4OTZkMjU2ZDg5NmQyNTZkNTEyaFIyZDUxMlIzZDM4NFI0ZDBSNWQ2NDBSNmQwUjdkNjQwUjhkMFI5ZDI1NlIxMGk3M1IxMWQwUjEyZDUxMlIxM2FpMWkyaTJpMmkyaTJpMmkyaTJpMmkyaTJpMmhnOjE4NW9SMGQ3NjhSMWFkNjQuNTEyZDEwMjRkNjQuNTEyZDI1NmQ0NDguNTEyZDI1NmQ0NDguNTEyZDEwMjRkNjQuNTEyZDEwMjRkMTI4ZDk1OS40ODhkMzg0ZDk1OS40ODhkMzg0ZDMxOS40ODdkMTI4ZDMxOS40ODdkMTI4ZDk1OS40ODhoUjJkNTEyUjNkNDQ4LjUxMlI0ZDY0LjUxMlI1ZDc2OFI2ZDBSN2Q3MDMuNDg4UjhkMFI5ZDI1NlIxMGkxODVSMTFkNjQuNTEyUjEyZDUxMlIxM2FpMWkyaTJpMmkyaTFpMmkyaTJpMmhnOjcyb1IwZDc2OFIxYWQzODRkNjQwZDEyOGQ2NDBkMTI4ZDM4NGQwZDM4NGQwZDEwMjRkMTI4ZDEwMjRkMTI4ZDc2OGQzODRkNzY4ZDM4NGQxMDI0ZDUxMmQxMDI0ZDUxMmQzODRkMzg0ZDM4NGQzODRkNjQwaFIyZDY0MFIzZDUxMlI0ZDBSNWQ2NDBSNmQwUjdkNjQwUjhkMFI5ZDI1NlIxMGk3MlIxMWQwUjEyZDY0MFIxM2FpMWkyaTJpMmkyaTJpMmkyaTJpMmkyaTJpMmhnOjE4NG9SMGQ3NjhSMWFkNjQuNTEyZDEwMjRkNjQuNTEyZDI1NmQ0NDguNTEyZDI1NmQ0NDguNTEyZDEwMjRkNjQuNTEyZDEwMjRkMTI4ZDk1OS40ODhkMzg0ZDk1OS40ODhkMzg0ZDMxOS40ODdkMTI4ZDMxOS40ODdkMTI4ZDk1OS40ODhoUjJkNTEyUjNkNDQ4LjUxMlI0ZDY0LjUxMlI1ZDc2OFI2ZDBSN2Q3MDMuNDg4UjhkMFI5ZDI1NlIxMGkxODRSMTFkNjQuNTEyUjEyZDUxMlIxM2FpMWkyaTJpMmkyaTFpMmkyaTJpMmhnOjcxb1IwZDc2OFIxYWQ1MTJkNTEyZDUxMmQzODRkMTI4ZDM4NGQxMjhkNTEyZDUxMmQ1MTJkMTI4ZDUxMmQwZDUxMmQwZDg5NmQxMjhkODk2ZDEyOGQ1MTJkNTEyZDEwMjRkMTI4ZDEwMjRkMTI4ZDg5NmQzODRkODk2ZDM4NGQ3NjhkMjU2ZDc2OGQyNTZkNjQwZDUxMmQ2NDBkNTEyZDEwMjRoUjJkNjQwUjNkNTEyUjRkMFI1ZDY0MFI2ZDBSN2Q2NDBSOGQwUjlkMjU2UjEwaTcxUjExZDBSMTJkNjQwUjEzYWkxaTJpMmkyaTJpMWkyaTJpMmkyaTFpMmkyaTJpMmkyaTJpMmkyaGc6MTgzb1IwZDc2OFIxYWQ2NC41MTJkMTAyNGQ2NC41MTJkMjU2ZDQ0OC41MTJkMjU2ZDQ0OC41MTJkMTAyNGQ2NC41MTJkMTAyNGQxMjhkOTU5LjQ4OGQzODRkOTU5LjQ4OGQzODRkMzE5LjQ4N2QxMjhkMzE5LjQ4N2QxMjhkOTU5LjQ4OGhSMmQ1MTJSM2Q0NDguNTEyUjRkNjQuNTEyUjVkNzY4UjZkMFI3ZDcwMy40ODhSOGQwUjlkMjU2UjEwaTE4M1IxMWQ2NC41MTJSMTJkNTEyUjEzYWkxaTJpMmkyaTJpMWkyaTJpMmkyaGc6NzBvUjBkNzY4UjFhZDEyOGQ3NjhkMzg0ZDc2OGQzODRkNjQwZDEyOGQ2NDBkMTI4ZDUxMmQzODRkNTEyZDM4NGQzODRkMGQzODRkMGQxMDI0ZDEyOGQxMDI0ZDEyOGQ3NjhoUjJkNTEyUjNkMzg0UjRkMFI1ZDY0MFI2ZDBSN2Q2NDBSOGQwUjlkMjU2UjEwaTcwUjExZDBSMTJkNTEyUjEzYWkxaTJpMmkyaTJpMmkyaTJpMmkyaTJoZzoxODJvUjBkNzY4UjFhZDY0LjUxMmQxMDI0ZDY0LjUxMmQyNTZkNDQ4LjUxMmQyNTZkNDQ4LjUxMmQxMDI0ZDY0LjUxMmQxMDI0ZDEyOGQ5NTkuNDg4ZDM4NGQ5NTkuNDg4ZDM4NGQzMTkuNDg3ZDEyOGQzMTkuNDg3ZDEyOGQ5NTkuNDg4aFIyZDUxMlIzZDQ0OC41MTJSNGQ2NC41MTJSNWQ3NjhSNmQwUjdkNzAzLjQ4OFI4ZDBSOWQyNTZSMTBpMTgyUjExZDY0LjUxMlIxMmQ1MTJSMTNhaTFpMmkyaTJpMmkxaTJpMmkyaTJoZzo2OW9SMGQ3NjhSMWFkMzg0ZDEwMjRkMzg0ZDg5NmQxMjhkODk2ZDEyOGQ3NjhkMzg0ZDc2OGQzODRkNjQwZDEyOGQ2NDBkMTI4ZDUxMmQzODRkNTEyZDM4NGQzODRkMGQzODRkMGQxMDI0ZDM4NGQxMDI0aFIyZDUxMlIzZDM4NFI0ZDBSNWQ2NDBSNmQwUjdkNjQwUjhkMFI5ZDI1NlIxMGk2OVIxMWQwUjEyZDUxMlIxM2FpMWkyaTJpMmkyaTJpMmkyaTJpMmkyaTJpMmhnOjE4MW9SMGQ3NjhSMWFkNjQuNTEyZDEwMjRkNjQuNTEyZDI1NmQ0NDguNTEyZDI1NmQ0NDguNTEyZDEwMjRkNjQuNTEyZDEwMjRkMTI4ZDk1OS40ODhkMzg0ZDk1OS40ODhkMzg0ZDMxOS40ODdkMTI4ZDMxOS40ODdkMTI4ZDk1OS40ODhoUjJkNTEyUjNkNDQ4LjUxMlI0ZDY0LjUxMlI1ZDc2OFI2ZDBSN2Q3MDMuNDg4UjhkMFI5ZDI1NlIxMGkxODFSMTFkNjQuNTEyUjEyZDUxMlIxM2FpMWkyaTJpMmkyaTFpMmkyaTJpMmhnOjY4b1IwZDc2OFIxYWQzODRkODk0Ljk3NmQzODRkNTEzLjAyNGQxMjhkNTEzLjAyNGQxMjhkODk0Ljk3NmQzODRkODk0Ljk3NmQzODRkMTAyNGQwZDEwMjRkMGQzODRkMzg0ZDM4NGQzODRkNTEyZDUxMmQ1MTJkNTEyZDg5NmQzODRkODk2ZDM4NGQxMDI0aFIyZDY0MFIzZDUxMlI0ZDBSNWQ2NDBSNmQwUjdkNjQwUjhkMFI5ZDI1NlIxMGk2OFIxMWQwUjEyZDY0MFIxM2FpMWkyaTJpMmkyaTFpMmkyaTJpMmkyaTJpMmkyaGc6MTgwb1IwZDc2OFIxYWQ2NC41MTJkMTAyNGQ2NC41MTJkMjU2ZDQ0OC41MTJkMjU2ZDQ0OC41MTJkMTAyNGQ2NC41MTJkMTAyNGQxMjhkOTU5LjQ4OGQzODRkOTU5LjQ4OGQzODRkMzE5LjQ4N2QxMjhkMzE5LjQ4N2QxMjhkOTU5LjQ4OGhSMmQ1MTJSM2Q0NDguNTEyUjRkNjQuNTEyUjVkNzY4UjZkMFI3ZDcwMy40ODhSOGQwUjlkMjU2UjEwaTE4MFIxMWQ2NC41MTJSMTJkNTEyUjEzYWkxaTJpMmkyaTJpMWkyaTJpMmkyaGc6NjdvUjBkNzY4UjFhZDM4NGQ1MTJkMzg0ZDM4NGQxMjhkMzg0ZDEyOGQ1MTJkMzg0ZDUxMmQxMjhkNTEyZDBkNTEyZDBkODk2ZDEyOGQ4OTZkMTI4ZDUxMmQzODRkMTAyNGQzODRkODk2ZDEyOGQ4OTZkMTI4ZDEwMjRkMzg0ZDEwMjRoUjJkNTEyUjNkMzg0UjRkMFI1ZDY0MFI2ZDBSN2Q2NDBSOGQwUjlkMjU2UjEwaTY3UjExZDBSMTJkNTEyUjEzYWkxaTJpMmkyaTJpMWkyaTJpMmkyaTFpMmkyaTJpMmhnOjE3OW9SMGQ3NjhSMWFkNjQuNTEyZDEwMjRkNjQuNTEyZDI1NmQ0NDguNTEyZDI1NmQ0NDguNTEyZDEwMjRkNjQuNTEyZDEwMjRkMTI4ZDk1OS40ODhkMzg0ZDk1OS40ODhkMzg0ZDMxOS40ODdkMTI4ZDMxOS40ODdkMTI4ZDk1OS40ODhoUjJkNTEyUjNkNDQ4LjUxMlI0ZDY0LjUxMlI1ZDc2OFI2ZDBSN2Q3MDMuNDg4UjhkMFI5ZDI1NlIxMGkxNzlSMTFkNjQuNTEyUjEyZDUxMlIxM2FpMWkyaTJpMmkyaTFpMmkyaTJpMmhnOjY2b1IwZDc2OFIxYWQxMjhkNjM4Ljk3NmQzODRkNjM4Ljk3NmQzODRkNTEzLjAyNGQxMjhkNTEzLjAyNGQxMjhkNjM4Ljk3NmQzODRkNzY5LjAyNGQxMjhkNzY5LjAyNGQxMjhkODk0Ljk3NmQzODRkODk0Ljk3NmQzODRkNzY5LjAyNGQ1MTJkODk2ZDM4NGQ4OTZkMzg0ZDEwMjRkMGQxMDI0ZDBkMzg0ZDM4NGQzODRkMzg0ZDUxMmQ1MTJkNTEyZDUxMmQ2NDBkMzg0ZDY0MGQzODRkNzY4ZDUxMmQ3NjhkNTEyZDg5NmhSMmQ2NDBSM2Q1MTJSNGQwUjVkNjQwUjZkMFI3ZDY0MFI4ZDBSOWQyNTZSMTBpNjZSMTFkMFIxMmQ2NDBSMTNhaTFpMmkyaTJpMmkxaTJpMmkyaTJpMWkyaTJpMmkyaTJpMmkyaTJpMmkyaTJpMmhnOjE3OG9SMGQ3NjhSMWFkNjQuNTEyZDEwMjRkNjQuNTEyZDI1NmQ0NDguNTEyZDI1NmQ0NDguNTEyZDEwMjRkNjQuNTEyZDEwMjRkMTI4ZDk1OS40ODhkMzg0ZDk1OS40ODhkMzg0ZDMxOS40ODdkMTI4ZDMxOS40ODdkMTI4ZDk1OS40ODhoUjJkNTEyUjNkNDQ4LjUxMlI0ZDY0LjUxMlI1ZDc2OFI2ZDBSN2Q3MDMuNDg4UjhkMFI5ZDI1NlIxMGkxNzhSMTFkNjQuNTEyUjEyZDUxMlIxM2FpMWkyaTJpMmkyaTFpMmkyaTJpMmhnOjY1b1IwZDc2OFIxYWQxMjhkNTEyZDEyOGQzODRkMzg0ZDM4NGQzODRkNTEyZDUxMmQ1MTJkNTEyZDEwMjRkMzg0ZDEwMjRkMzg0ZDg5NmQxMjhkODk2ZDEyOGQxMDI0ZDBkMTAyNGQwZDUxMmQxMjhkNTEyZDM4NGQ3NjhkMzg0ZDUxMy4wMjRkMTI4ZDUxMy4wMjRkMTI4ZDc2OGQzODRkNzY4aFIyZDY0MFIzZDUxMlI0ZDBSNWQ2NDBSNmQwUjdkNjQwUjhkMFI5ZDI1NlIxMGk2NVIxMWQwUjEyZDY0MFIxM2FpMWkyaTJpMmkyaTJpMmkyaTJpMmkyaTJpMmkxaTJpMmkyaTJoZzoxNzdvUjBkNzY4UjFhZDY0LjUxMmQxMDI0ZDY0LjUxMmQyNTZkNDQ4LjUxMmQyNTZkNDQ4LjUxMmQxMDI0ZDY0LjUxMmQxMDI0ZDEyOGQ5NTkuNDg4ZDM4NGQ5NTkuNDg4ZDM4NGQzMTkuNDg3ZDEyOGQzMTkuNDg3ZDEyOGQ5NTkuNDg4aFIyZDUxMlIzZDQ0OC41MTJSNGQ2NC41MTJSNWQ3NjhSNmQwUjdkNzAzLjQ4OFI4ZDBSOWQyNTZSMTBpMTc3UjExZDY0LjUxMlIxMmQ1MTJSMTNhaTFpMmkyaTJpMmkxaTJpMmkyaTJoZzo2NG9SMGQ3NjhSMWFkNTEyZDg5NC45NzZkNTEyZDc2OGQzODRkNzY4ZDM4NGQ4OTQuOTc2ZDUxMmQ4OTQuOTc2ZDUxMmQ1MTMuMDI0ZDEyOGQ1MTMuMDI0ZDEyOGQ4OTQuOTc2ZDI1NmQ4OTQuOTc2ZDI1NmQ2NDBkNTEyZDY0MGQ1MTJkNTEzLjAyNGQ2NDBkNTEyZDY0MGQ4OTZkNTEyZDg5NmQ1MTJkMTAyNGQxMjhkMTAyNGQxMjhkODk2ZDBkODk2ZDBkNTEyZDEyOGQ1MTJkMTI4ZDM4NGQ1MTJkMzg0ZDUxMmQ1MTJkNjQwZDUxMmhSMmQ3NjhSM2Q2NDBSNGQwUjVkNjQwUjZkMFI3ZDY0MFI4ZDBSOWQyNTZSMTBpNjRSMTFkMFIxMmQ3NjhSMTNhaTFpMmkyaTJpMmkxaTJpMmkyaTJpMmkyaTFpMmkyaTJpMmkyaTJpMmkyaTJpMmkyaTJoZzoxNzZvUjBkNzY4UjFhZDY0LjUxMmQxMDI0ZDY0LjUxMmQyNTZkNDQ4LjUxMmQyNTZkNDQ4LjUxMmQxMDI0ZDY0LjUxMmQxMDI0ZDEyOGQ5NTkuNDg4ZDM4NGQ5NTkuNDg4ZDM4NGQzMTkuNDg3ZDEyOGQzMTkuNDg3ZDEyOGQ5NTkuNDg4aFIyZDUxMlIzZDQ0OC41MTJSNGQ2NC41MTJSNWQ3NjhSNmQwUjdkNzAzLjQ4OFI4ZDBSOWQyNTZSMTBpMTc2UjExZDY0LjUxMlIxMmQ1MTJSMTNhaTFpMmkyaTJpMmkxaTJpMmkyaTJoZzo2M29SMGQ3NjhSMWFkMGQzODRkMGQ1MTJkMzg0ZDUxMmQzODRkMzg0ZDBkMzg0ZDM4NGQ2NDBkNTEyZDY0MGQ1MTJkNTEyZDM4NGQ1MTJkMzg0ZDY0MGQxMjhkNjQwZDEyOGQ3NjhkMzg0ZDc2OGQzODRkNjQwZDEyOGQ2NDBkMTI4ZDEwMjRkMjU2ZDEwMjRkMjU2ZDg5NmQxMjhkODk2ZDEyOGQxMDI0aFIyZDY0MFIzZDUxMlI0ZDBSNWQ2NDBSNmQwUjdkNjQwUjhkMFI5ZDI1NlIxMGk2M1IxMWQwUjEyZDY0MFIxM2FpMWkyaTJpMmkyaTFpMmkyaTJpMmkxaTJpMmkyaTJpMWkyaTJpMmkyaGc6MTc1b1IwZDc2OFIxYWQ2NC41MTJkMTAyNGQ2NC41MTJkMjU2ZDQ0OC41MTJkMjU2ZDQ0OC41MTJkMTAyNGQ2NC41MTJkMTAyNGQxMjhkOTU5LjQ4OGQzODRkOTU5LjQ4OGQzODRkMzE5LjQ4N2QxMjhkMzE5LjQ4N2QxMjhkOTU5LjQ4OGhSMmQ1MTJSM2Q0NDguNTEyUjRkNjQuNTEyUjVkNzY4UjZkMFI3ZDcwMy40ODhSOGQwUjlkMjU2UjEwaTE3NVIxMWQ2NC41MTJSMTJkNTEyUjEzYWkxaTJpMmkyaTJpMWkyaTJpMmkyaGc6NjJvUjBkNzY4UjFhZDBkMzg0ZDBkNTEyZDEyOGQ1MTJkMTI4ZDM4NGQwZDM4NGQxMjhkNTEyZDEyOGQ2NDBkMjU2ZDY0MGQyNTZkNTEyZDEyOGQ1MTJkMTI4ZDg5NmQyNTZkODk2ZDI1NmQ3NjhkMTI4ZDc2OGQxMjhkODk2ZDI1NmQ3NjhkMzg0ZDc2OGQzODRkNjQwZDI1NmQ2NDBkMjU2ZDc2OGQwZDEwMjRkMTI4ZDEwMjRkMTI4ZDg5NmQwZDg5NmQwZDEwMjRoUjJkNTEyUjNkMzg0UjRkMFI1ZDY0MFI2ZDBSN2Q2NDBSOGQwUjlkMjU2UjEwaTYyUjExZDBSMTJkNTEyUjEzYWkxaTJpMmkyaTJpMWkyaTJpMmkyaTFpMmkyaTJpMmkxaTJpMmkyaTJpMWkyaTJpMmkyaGc6MTc0b1IwZDc2OFIxYWQ2NC41MTJkMTAyNGQ2NC41MTJkMjU2ZDQ0OC41MTJkMjU2ZDQ0OC41MTJkMTAyNGQ2NC41MTJkMTAyNGQxMjhkOTU5LjQ4OGQzODRkOTU5LjQ4OGQzODRkMzE5LjQ4N2QxMjhkMzE5LjQ4N2QxMjhkOTU5LjQ4OGhSMmQ1MTJSM2Q0NDguNTEyUjRkNjQuNTEyUjVkNzY4UjZkMFI3ZDcwMy40ODhSOGQwUjlkMjU2UjEwaTE3NFIxMWQ2NC41MTJSMTJkNTEyUjEzYWkxaTJpMmkyaTJpMWkyaTJpMmkyaGc6NjFvUjBkNzY4UjFhZDBkNTEyZDBkNjQwZDM4NGQ2NDBkMzg0ZDUxMmQwZDUxMmQwZDc2OGQwZDg5NmQzODRkODk2ZDM4NGQ3NjhkMGQ3NjhoUjJkNTEyUjNkMzg0UjRkMFI1ZDUxMlI2ZDEyOFI3ZDUxMlI4ZDBSOWQyNTZSMTBpNjFSMTFkMFIxMmQ1MTJSMTNhaTFpMmkyaTJpMmkxaTJpMmkyaTJoZzoxNzNvUjBkNzY4UjFhZDY0LjUxMmQxMDI0ZDY0LjUxMmQyNTZkNDQ4LjUxMmQyNTZkNDQ4LjUxMmQxMDI0ZDY0LjUxMmQxMDI0ZDEyOGQ5NTkuNDg4ZDM4NGQ5NTkuNDg4ZDM4NGQzMTkuNDg3ZDEyOGQzMTkuNDg3ZDEyOGQ5NTkuNDg4aFIyZDUxMlIzZDQ0OC41MTJSNGQ2NC41MTJSNWQ3NjhSNmQwUjdkNzAzLjQ4OFI4ZDBSOWQyNTZSMTBpMTczUjExZDY0LjUxMlIxMmQ1MTJSMTNhaTFpMmkyaTJpMmkxaTJpMmkyaTJoZzo2MG9SMGQ3NjhSMWFkMTI4ZDY0MGQyNTZkNjQwZDI1NmQ1MTJkMTI4ZDUxMmQxMjhkNjQwZDI1NmQ1MTJkMzg0ZDUxMmQzODRkMzg0ZDI1NmQzODRkMjU2ZDUxMmQwZDc2OGQxMjhkNzY4ZDEyOGQ2NDBkMGQ2NDBkMGQ3NjhkMjU2ZDg5NmQyNTZkNzY4ZDEyOGQ3NjhkMTI4ZDg5NmQyNTZkODk2ZDM4NGQxMDI0ZDM4NGQ4OTZkMjU2ZDg5NmQyNTZkMTAyNGQzODRkMTAyNGhSMmQ1MTJSM2QzODRSNGQwUjVkNjQwUjZkMFI3ZDY0MFI4ZDBSOWQyNTZSMTBpNjBSMTFkMFIxMmQ1MTJSMTNhaTFpMmkyaTJpMmkxaTJpMmkyaTJpMWkyaTJpMmkyaTFpMmkyaTJpMmkxaTJpMmkyaTJoZzoxNzJvUjBkNzY4UjFhZDY0LjUxMmQxMDI0ZDY0LjUxMmQyNTZkNDQ4LjUxMmQyNTZkNDQ4LjUxMmQxMDI0ZDY0LjUxMmQxMDI0ZDEyOGQ5NTkuNDg4ZDM4NGQ5NTkuNDg4ZDM4NGQzMTkuNDg3ZDEyOGQzMTkuNDg3ZDEyOGQ5NTkuNDg4aFIyZDUxMlIzZDQ0OC41MTJSNGQ2NC41MTJSNWQ3NjhSNmQwUjdkNzAzLjQ4OFI4ZDBSOWQyNTZSMTBpMTcyUjExZDY0LjUxMlIxMmQ1MTJSMTNhaTFpMmkyaTJpMmkxaTJpMmkyaTJoZzo1OW9SMGQ3NjhSMWFkMTI4ZDUxMmQwZDUxMmQwZDY0MGQxMjhkNjQwZDEyOGQ1MTJkMTI4ZDc2OGQwZDc2OGQwZDEwMjRkMTI4ZDEwMjRkMTI4ZDc2OGhSMmQyNTZSM2QxMjhSNGQwUjVkNTEyUjZkMFI3ZDUxMlI4ZDBSOWQyNTZSMTBpNTlSMTFkMFIxMmQyNTZSMTNhaTFpMmkyaTJpMmkxaTJpMmkyaTJoZzoxNzFvUjBkNzY4UjFhZDY0LjUxMmQxMDI0ZDY0LjUxMmQyNTZkNDQ4LjUxMmQyNTZkNDQ4LjUxMmQxMDI0ZDY0LjUxMmQxMDI0ZDEyOGQ5NTkuNDg4ZDM4NGQ5NTkuNDg4ZDM4NGQzMTkuNDg3ZDEyOGQzMTkuNDg3ZDEyOGQ5NTkuNDg4aFIyZDUxMlIzZDQ0OC41MTJSNGQ2NC41MTJSNWQ3NjhSNmQwUjdkNzAzLjQ4OFI4ZDBSOWQyNTZSMTBpMTcxUjExZDY0LjUxMlIxMmQ1MTJSMTNhaTFpMmkyaTJpMmkxaTJpMmkyaTJoZzo1OG9SMGQ3NjhSMWFkMGQ2NDBkMTI4ZDY0MGQxMjhkNTEyZDBkNTEyZDBkNjQwZDBkODk2ZDEyOGQ4OTZkMTI4ZDc2OGQwZDc2OGQwZDg5NmhSMmQyNTZSM2QxMjhSNGQwUjVkNTEyUjZkMTI4UjdkNTEyUjhkMFI5ZDI1NlIxMGk1OFIxMWQwUjEyZDI1NlIxM2FpMWkyaTJpMmkyaTFpMmkyaTJpMmhnOjE3MG9SMGQ3NjhSMWFkNjQuNTEyZDEwMjRkNjQuNTEyZDI1NmQ0NDguNTEyZDI1NmQ0NDguNTEyZDEwMjRkNjQuNTEyZDEwMjRkMTI4ZDk1OS40ODhkMzg0ZDk1OS40ODhkMzg0ZDMxOS40ODdkMTI4ZDMxOS40ODdkMTI4ZDk1OS40ODhoUjJkNTEyUjNkNDQ4LjUxMlI0ZDY0LjUxMlI1ZDc2OFI2ZDBSN2Q3MDMuNDg4UjhkMFI5ZDI1NlIxMGkxNzBSMTFkNjQuNTEyUjEyZDUxMlIxM2FpMWkyaTJpMmkyaTFpMmkyaTJpMmhnOjU3b1IwZDc2OFIxYWQxMjhkNTEzLjAyNGQxMjhkNjM4Ljk3NmQzODRkNjM4Ljk3NmQzODRkNTEzLjAyNGQxMjhkNTEzLjAyNGQxMjhkODk2ZDM4NGQ4OTZkMzg0ZDc2OGQxMjhkNzY4ZDEyOGQ2NDBkMGQ2NDBkMGQ1MTJkMTI4ZDUxMmQxMjhkMzg0ZDM4NGQzODRkMzg0ZDUxMmQ1MTJkNTEyZDUxMmQ4OTZkMzg0ZDg5NmQzODRkMTAyNGQxMjhkMTAyNGQxMjhkODk2aFIyZDY0MFIzZDUxMlI0ZDBSNWQ2NDBSNmQwUjdkNjQwUjhkMFI5ZDI1NlIxMGk1N1IxMWQwUjEyZDY0MFIxM2FpMWkyaTJpMmkyaTFpMmkyaTJpMmkyaTJpMmkyaTJpMmkyaTJpMmkyaTJpMmhnOjE2OW9SMGQ3NjhSMWFkNjQuNTEyZDEwMjRkNjQuNTEyZDI1NmQ0NDguNTEyZDI1NmQ0NDguNTEyZDEwMjRkNjQuNTEyZDEwMjRkMTI4ZDk1OS40ODhkMzg0ZDk1OS40ODhkMzg0ZDMxOS40ODdkMTI4ZDMxOS40ODdkMTI4ZDk1OS40ODhoUjJkNTEyUjNkNDQ4LjUxMlI0ZDY0LjUxMlI1ZDc2OFI2ZDBSN2Q3MDMuNDg4UjhkMFI5ZDI1NlIxMGkxNjlSMTFkNjQuNTEyUjEyZDUxMlIxM2FpMWkyaTJpMmkyaTFpMmkyaTJpMmhnOjU2b1IwZDc2OFIxYWQzODRkNjM4Ljk3NmQzODRkNTEzLjAyNGQxMjhkNTEzLjAyNGQxMjhkNjM4Ljk3NmQzODRkNjM4Ljk3NmQzODRkODk0Ljk3NmQzODRkNzY5LjAyNGQxMjhkNzY5LjAyNGQxMjhkODk0Ljk3NmQzODRkODk0Ljk3NmQxMjhkODk2ZDBkODk2ZDBkNzY4ZDEyOGQ3NjhkMTI4ZDY0MGQwZDY0MGQwZDUxMmQxMjhkNTEyZDEyOGQzODRkMzg0ZDM4NGQzODRkNTEyZDUxMmQ1MTJkNTEyZDY0MGQzODRkNjQwZDM4NGQ3NjhkNTEyZDc2OGQ1MTJkODk2ZDM4NGQ4OTZkMzg0ZDEwMjRkMTI4ZDEwMjRkMTI4ZDg5NmhSMmQ2NDBSM2Q1MTJSNGQwUjVkNjQwUjZkMFI3ZDY0MFI4ZDBSOWQyNTZSMTBpNTZSMTFkMFIxMmQ2NDBSMTNhaTFpMmkyaTJpMmkxaTJpMmkyaTJpMWkyaTJpMmkyaTJpMmkyaTJpMmkyaTJpMmkyaTJpMmkyaTJpMmkyaTJoZzoxNjhvUjBkNzY4UjFhZDY0LjUxMmQxMDI0ZDY0LjUxMmQyNTZkNDQ4LjUxMmQyNTZkNDQ4LjUxMmQxMDI0ZDY0LjUxMmQxMDI0ZDEyOGQ5NTkuNDg4ZDM4NGQ5NTkuNDg4ZDM4NGQzMTkuNDg3ZDEyOGQzMTkuNDg3ZDEyOGQ5NTkuNDg4aFIyZDUxMlIzZDQ0OC41MTJSNGQ2NC41MTJSNWQ3NjhSNmQwUjdkNzAzLjQ4OFI4ZDBSOWQyNTZSMTBpMTY4UjExZDY0LjUxMlIxMmQ1MTJSMTNhaTFpMmkyaTJpMmkxaTJpMmkyaTJoZzo1NW9SMGQ3NjhSMWFkMGQzODRkMGQ1MTJkMzg0ZDUxMmQzODRkNjQwZDUxMmQ2NDBkNTEyZDM4NGQwZDM4NGQxMjhkMTAyNGQyNTZkMTAyNGQyNTZkNzY4ZDEyOGQ3NjhkMTI4ZDEwMjRkMjU2ZDc2OGQzODRkNzY4ZDM4NGQ2NDBkMjU2ZDY0MGQyNTZkNzY4aFIyZDY0MFIzZDUxMlI0ZDBSNWQ2NDBSNmQwUjdkNjQwUjhkMFI5ZDI1NlIxMGk1NVIxMWQwUjEyZDY0MFIxM2FpMWkyaTJpMmkyaTJpMmkxaTJpMmkyaTJpMWkyaTJpMmkyaGc6MTY3b1IwZDc2OFIxYWQ2NC41MTJkMTAyNGQ2NC41MTJkMjU2ZDQ0OC41MTJkMjU2ZDQ0OC41MTJkMTAyNGQ2NC41MTJkMTAyNGQxMjhkOTU5LjQ4OGQzODRkOTU5LjQ4OGQzODRkMzE5LjQ4N2QxMjhkMzE5LjQ4N2QxMjhkOTU5LjQ4OGhSMmQ1MTJSM2Q0NDguNTEyUjRkNjQuNTEyUjVkNzY4UjZkMFI3ZDcwMy40ODhSOGQwUjlkMjU2UjEwaTE2N1IxMWQ2NC41MTJSMTJkNTEyUjEzYWkxaTJpMmkyaTJpMWkyaTJpMmkyaGc6NTRvUjBkNzY4UjFhZDM4NGQ4OTQuOTc2ZDM4NGQ3NjkuMDI0ZDEyOGQ3NjkuMDI0ZDEyOGQ4OTQuOTc2ZDM4NGQ4OTQuOTc2ZDEyOGQ4OTZkMGQ4OTZkMGQ1MTJkMTI4ZDUxMmQxMjhkMzg0ZDM4NGQzODRkMzg0ZDUxMmQxMjhkNTEyZDEyOGQ2NDBkMzg0ZDY0MGQzODRkNzY4ZDUxMmQ3NjhkNTEyZDg5NmQzODRkODk2ZDM4NGQxMDI0ZDEyOGQxMDI0ZDEyOGQ4OTZoUjJkNjQwUjNkNTEyUjRkMFI1ZDY0MFI2ZDBSN2Q2NDBSOGQwUjlkMjU2UjEwaTU0UjExZDBSMTJkNjQwUjEzYWkxaTJpMmkyaTJpMWkyaTJpMmkyaTJpMmkyaTJpMmkyaTJpMmkyaTJpMmkyaGc6MTY2b1IwZDc2OFIxYWQ2NC41MTJkMTAyNGQ2NC41MTJkMjU2ZDQ0OC41MTJkMjU2ZDQ0OC41MTJkMTAyNGQ2NC41MTJkMTAyNGQxMjhkOTU5LjQ4OGQzODRkOTU5LjQ4OGQzODRkMzE5LjQ4N2QxMjhkMzE5LjQ4N2QxMjhkOTU5LjQ4OGhSMmQ1MTJSM2Q0NDguNTEyUjRkNjQuNTEyUjVkNzY4UjZkMFI3ZDcwMy40ODhSOGQwUjlkMjU2UjEwaTE2NlIxMWQ2NC41MTJSMTJkNTEyUjEzYWkxaTJpMmkyaTJpMWkyaTJpMmkyaGc6NTNvUjBkNzY4UjFhZDEyOGQ2NDBkMTI4ZDUxMmQ1MTJkNTEyZDUxMmQzODRkMGQzODRkMGQ3NjhkMzg0ZDc2OGQzODRkNjQwZDEyOGQ2NDBkNTEyZDc2OGQzODRkNzY4ZDM4NGQ4OTZkNTEyZDg5NmQ1MTJkNzY4ZDM4NGQxMDI0ZDM4NGQ4OTZkMGQ4OTZkMGQxMDI0ZDM4NGQxMDI0aFIyZDY0MFIzZDUxMlI0ZDBSNWQ2NDBSNmQwUjdkNjQwUjhkMFI5ZDI1NlIxMGk1M1IxMWQwUjEyZDY0MFIxM2FpMWkyaTJpMmkyaTJpMmkyaTJpMWkyaTJpMmkyaTFpMmkyaTJpMmhnOjE2NW9SMGQ3NjhSMWFkNjQuNTEyZDEwMjRkNjQuNTEyZDI1NmQ0NDguNTEyZDI1NmQ0NDguNTEyZDEwMjRkNjQuNTEyZDEwMjRkMTI4ZDk1OS40ODhkMzg0ZDk1OS40ODhkMzg0ZDMxOS40ODdkMTI4ZDMxOS40ODdkMTI4ZDk1OS40ODhoUjJkNTEyUjNkNDQ4LjUxMlI0ZDY0LjUxMlI1ZDc2OFI2ZDBSN2Q3MDMuNDg4UjhkMFI5ZDI1NlIxMGkxNjVSMTFkNjQuNTEyUjEyZDUxMlIxM2FpMWkyaTJpMmkyaTFpMmkyaTJpMmhnOjUyb1IwZDc2OFIxYWQxMjhkNjQxLjAyNGQxMjhkNzY4ZDI1NmQ3NjhkMjU2ZDY0MS4wMjRkMTI4ZDY0MS4wMjRkMzg0ZDM4NGQzODRkNzY4ZDUxMmQ3NjhkNTEyZDg5NmQzODRkODk2ZDM4NGQxMDI0ZDI1NmQxMDI0ZDI1NmQ4OTZkMGQ4OTZkMGQ2NDBkMTI4ZDY0MGQxMjhkNTEyZDI1NmQ1MTJkMjU2ZDM4NGQzODRkMzg0aFIyZDY0MFIzZDUxMlI0ZDBSNWQ2NDBSNmQwUjdkNjQwUjhkMFI5ZDI1NlIxMGk1MlIxMWQwUjEyZDY0MFIxM2FpMWkyaTJpMmkyaTFpMmkyaTJpMmkyaTJpMmkyaTJpMmkyaTJpMmkyaGc6MTY0b1IwZDc2OFIxYWQ2NC41MTJkMTAyNGQ2NC41MTJkMjU2ZDQ0OC41MTJkMjU2ZDQ0OC41MTJkMTAyNGQ2NC41MTJkMTAyNGQxMjhkOTU5LjQ4OGQzODRkOTU5LjQ4OGQzODRkMzE5LjQ4N2QxMjhkMzE5LjQ4N2QxMjhkOTU5LjQ4OGhSMmQ1MTJSM2Q0NDguNTEyUjRkNjQuNTEyUjVkNzY4UjZkMFI3ZDcwMy40ODhSOGQwUjlkMjU2UjEwaTE2NFIxMWQ2NC41MTJSMTJkNTEyUjEzYWkxaTJpMmkyaTJpMWkyaTJpMmkyaGc6NTFvUjBkNzY4UjFhZDBkMzg0ZDBkNTEyZDM4NGQ1MTJkMzg0ZDM4NGQwZDM4NGQzODRkNjQwZDUxMmQ2NDBkNTEyZDUxMmQzODRkNTEyZDM4NGQ2NDBkMTI4ZDY0MGQxMjhkNzY4ZDM4NGQ3NjhkMzg0ZDY0MGQxMjhkNjQwZDUxMmQ4OTZkNTEyZDc2OGQzODRkNzY4ZDM4NGQ4OTZkNTEyZDg5NmQwZDg5NmQwZDEwMjRkMzg0ZDEwMjRkMzg0ZDg5NmQwZDg5NmhSMmQ2NDBSM2Q1MTJSNGQwUjVkNjQwUjZkMFI3ZDY0MFI4ZDBSOWQyNTZSMTBpNTFSMTFkMFIxMmQ2NDBSMTNhaTFpMmkyaTJpMmkxaTJpMmkyaTJpMWkyaTJpMmkyaTFpMmkyaTJpMmkxaTJpMmkyaTJoZzoxNjNvUjBkNzY4UjFhZDY0LjUxMmQxMDI0ZDY0LjUxMmQyNTZkNDQ4LjUxMmQyNTZkNDQ4LjUxMmQxMDI0ZDY0LjUxMmQxMDI0ZDEyOGQ5NTkuNDg4ZDM4NGQ5NTkuNDg4ZDM4NGQzMTkuNDg3ZDEyOGQzMTkuNDg3ZDEyOGQ5NTkuNDg4aFIyZDUxMlIzZDQ0OC41MTJSNGQ2NC41MTJSNWQ3NjhSNmQwUjdkNzAzLjQ4OFI4ZDBSOWQyNTZSMTBpMTYzUjExZDY0LjUxMlIxMmQ1MTJSMTNhaTFpMmkyaTJpMmkxaTJpMmkyaTJoZzo1MG9SMGQ3NjhSMWFkMGQzODRkMGQ1MTJkMzg0ZDUxMmQzODRkMzg0ZDBkMzg0ZDM4NGQ2NDBkNTEyZDY0MGQ1MTJkNTEyZDM4NGQ1MTJkMzg0ZDY0MGQxMjhkNjQwZDEyOGQ3NjhkMzg0ZDc2OGQzODRkNjQwZDEyOGQ2NDBkMGQxMDI0ZDUxMmQxMDI0ZDUxMmQ4OTZkMTI4ZDg5NmQxMjhkNzY4ZDBkNzY4ZDBkMTAyNGhSMmQ2NDBSM2Q1MTJSNGQwUjVkNjQwUjZkMFI3ZDY0MFI4ZDBSOWQyNTZSMTBpNTBSMTFkMFIxMmQ2NDBSMTNhaTFpMmkyaTJpMmkxaTJpMmkyaTJpMWkyaTJpMmkyaTFpMmkyaTJpMmkyaTJoZzoxNjJvUjBkNzY4UjFhZDY0LjUxMmQxMDI0ZDY0LjUxMmQyNTZkNDQ4LjUxMmQyNTZkNDQ4LjUxMmQxMDI0ZDY0LjUxMmQxMDI0ZDEyOGQ5NTkuNDg4ZDM4NGQ5NTkuNDg4ZDM4NGQzMTkuNDg3ZDEyOGQzMTkuNDg3ZDEyOGQ5NTkuNDg4aFIyZDUxMlIzZDQ0OC41MTJSNGQ2NC41MTJSNWQ3NjhSNmQwUjdkNzAzLjQ4OFI4ZDBSOWQyNTZSMTBpMTYyUjExZDY0LjUxMlIxMmQ1MTJSMTNhaTFpMmkyaTJpMmkxaTJpMmkyaTJoZzo0OW9SMGQ3NjhSMWFkMTI4ZDEwMjRkMjU2ZDEwMjRkMjU2ZDM4NGQwZDM4NGQwZDUxMmQxMjhkNTEyZDEyOGQxMDI0aFIyZDM4NFIzZDI1NlI0ZDBSNWQ2NDBSNmQwUjdkNjQwUjhkMFI5ZDI1NlIxMGk0OVIxMWQwUjEyZDM4NFIxM2FpMWkyaTJpMmkyaTJpMmhnOjE2MW9SMGQ3NjhSMWFkNjQuNTEyZDEwMjRkNjQuNTEyZDI1NmQ0NDguNTEyZDI1NmQ0NDguNTEyZDEwMjRkNjQuNTEyZDEwMjRkMTI4ZDk1OS40ODhkMzg0ZDk1OS40ODhkMzg0ZDMxOS40ODdkMTI4ZDMxOS40ODdkMTI4ZDk1OS40ODhoUjJkNTEyUjNkNDQ4LjUxMlI0ZDY0LjUxMlI1ZDc2OFI2ZDBSN2Q3MDMuNDg4UjhkMFI5ZDI1NlIxMGkxNjFSMTFkNjQuNTEyUjEyZDUxMlIxM2FpMWkyaTJpMmkyaTFpMmkyaTJpMmhnOjQ4b1IwZDc2OFIxYWQzODRkODk0Ljk3NmQzODRkNTEzLjAyNGQxMjhkNTEzLjAyNGQxMjhkODk0Ljk3NmQzODRkODk0Ljk3NmQxMjhkODk2ZDBkODk2ZDBkNTEyZDEyOGQ1MTJkMTI4ZDM4NGQzODRkMzg0ZDM4NGQ1MTJkNTEyZDUxMmQ1MTJkODk2ZDM4NGQ4OTZkMzg0ZDEwMjRkMTI4ZDEwMjRkMTI4ZDg5NmhSMmQ2NDBSM2Q1MTJSNGQwUjVkNjQwUjZkMFI3ZDY0MFI4ZDBSOWQyNTZSMTBpNDhSMTFkMFIxMmQ2NDBSMTNhaTFpMmkyaTJpMmkxaTJpMmkyaTJpMmkyaTJpMmkyaTJpMmkyaGc6MTYwb1IwZDc2OFIxYWhSMmQ1MTJSM2QwUjRkMFI1ZDBSNmQwUjdkMFI4ZDBSOWQyNTZSMTBpMTYwUjExZDBSMTJkNTEyUjEzYWhnOjQ3b1IwZDc2OFIxYWQzODRkNjQwZDUxMmQ2NDBkNTEyZDUxMmQzODRkNTEyZDM4NGQ2NDBkNTEyZDM4NGQ1MTJkNTEyZDY0MGQ1MTJkNjQwZDM4NGQ1MTJkMzg0ZDEyOGQ4OTZkMjU2ZDg5NmQyNTZkNzY4ZDEyOGQ3NjhkMTI4ZDg5NmQyNTZkNzY4ZDM4NGQ3NjhkMzg0ZDY0MGQyNTZkNjQwZDI1NmQ3NjhkMGQxMDI0ZDEyOGQxMDI0ZDEyOGQ4OTZkMGQ4OTZkMGQxMDI0aFIyZDc2OFIzZDY0MFI0ZDBSNWQ2NDBSNmQwUjdkNjQwUjhkMFI5ZDI1NlIxMGk0N1IxMWQwUjEyZDc2OFIxM2FpMWkyaTJpMmkyaTFpMmkyaTJpMmkxaTJpMmkyaTJpMWkyaTJpMmkyaTFpMmkyaTJpMmhnOjE1OW9SMGQ3NjhSMWFkNjQuNTEyZDEwMjRkNjQuNTEyZDI1NmQ0NDguNTEyZDI1NmQ0NDguNTEyZDEwMjRkNjQuNTEyZDEwMjRkMTI4ZDk1OS40ODhkMzg0ZDk1OS40ODhkMzg0ZDMxOS40ODdkMTI4ZDMxOS40ODdkMTI4ZDk1OS40ODhoUjJkNTEyUjNkNDQ4LjUxMlI0ZDY0LjUxMlI1ZDc2OFI2ZDBSN2Q3MDMuNDg4UjhkMFI5ZDI1NlIxMGkxNTlSMTFkNjQuNTEyUjEyZDUxMlIxM2FpMWkyaTJpMmkyaTFpMmkyaTJpMmhnOjQ2b1IwZDc2OFIxYWQwZDEwMjRkMTI4ZDEwMjRkMTI4ZDg5NmQwZDg5NmQwZDEwMjRoUjJkMjU2UjNkMTI4UjRkMFI1ZDEyOFI2ZDBSN2QxMjhSOGQwUjlkMjU2UjEwaTQ2UjExZDBSMTJkMjU2UjEzYWkxaTJpMmkyaTJoZzoxNThvUjBkNzY4UjFhZDY0LjUxMmQxMDI0ZDY0LjUxMmQyNTZkNDQ4LjUxMmQyNTZkNDQ4LjUxMmQxMDI0ZDY0LjUxMmQxMDI0ZDEyOGQ5NTkuNDg4ZDM4NGQ5NTkuNDg4ZDM4NGQzMTkuNDg3ZDEyOGQzMTkuNDg3ZDEyOGQ5NTkuNDg4aFIyZDUxMlIzZDQ0OC41MTJSNGQ2NC41MTJSNWQ3NjhSNmQwUjdkNzAzLjQ4OFI4ZDBSOWQyNTZSMTBpMTU4UjExZDY0LjUxMlIxMmQ1MTJSMTNhaTFpMmkyaTJpMmkxaTJpMmkyaTJoZzo0NW9SMGQ3NjhSMWFkMGQ2NDBkMGQ3NjhkMzg0ZDc2OGQzODRkNjQwZDBkNjQwaFIyZDUxMlIzZDM4NFI0ZDBSNWQzODRSNmQyNTZSN2QzODRSOGQwUjlkMjU2UjEwaTQ1UjExZDBSMTJkNTEyUjEzYWkxaTJpMmkyaTJoZzoxNTdvUjBkNzY4UjFhZDY0LjUxMmQxMDI0ZDY0LjUxMmQyNTZkNDQ4LjUxMmQyNTZkNDQ4LjUxMmQxMDI0ZDY0LjUxMmQxMDI0ZDEyOGQ5NTkuNDg4ZDM4NGQ5NTkuNDg4ZDM4NGQzMTkuNDg3ZDEyOGQzMTkuNDg3ZDEyOGQ5NTkuNDg4aFIyZDUxMlIzZDQ0OC41MTJSNGQ2NC41MTJSNWQ3NjhSNmQwUjdkNzAzLjQ4OFI4ZDBSOWQyNTZSMTBpMTU3UjExZDY0LjUxMlIxMmQ1MTJSMTNhaTFpMmkyaTJpMmkxaTJpMmkyaTJoZzo0NG9SMGQ3NjhSMWFkMTI4ZDEwMjRkMjU2ZDEwMjRkMjU2ZDg5NmQxMjhkODk2ZDEyOGQxMDI0ZDBkMTE1MmQxMjhkMTE1MmQxMjhkMTAyNGQwZDEwMjRkMGQxMTUyaFIyZDM4NFIzZDI1NlI0ZDBSNWQxMjhSNmQtMTI4UjdkMTI4UjhkMFI5ZDI1NlIxMGk0NFIxMWQwUjEyZDM4NFIxM2FpMWkyaTJpMmkyaTFpMmkyaTJpMmhnOjE1Nm9SMGQ3NjhSMWFkNjQuNTEyZDEwMjRkNjQuNTEyZDI1NmQ0NDguNTEyZDI1NmQ0NDguNTEyZDEwMjRkNjQuNTEyZDEwMjRkMTI4ZDk1OS40ODhkMzg0ZDk1OS40ODhkMzg0ZDMxOS40ODdkMTI4ZDMxOS40ODdkMTI4ZDk1OS40ODhoUjJkNTEyUjNkNDQ4LjUxMlI0ZDY0LjUxMlI1ZDc2OFI2ZDBSN2Q3MDMuNDg4UjhkMFI5ZDI1NlIxMGkxNTZSMTFkNjQuNTEyUjEyZDUxMlIxM2FpMWkyaTJpMmkyaTFpMmkyaTJpMmhnOjQzb1IwZDc2OFIxYWQxMjhkODk2ZDI1NmQ4OTZkMjU2ZDc2OGQzODRkNzY4ZDM4NGQ2NDBkMjU2ZDY0MGQyNTZkNTEyZDEyOGQ1MTJkMTI4ZDY0MGQwZDY0MGQwZDc2OGQxMjhkNzY4ZDEyOGQ4OTZoUjJkNTEyUjNkMzg0UjRkMFI1ZDUxMlI2ZDEyOFI3ZDUxMlI4ZDBSOWQyNTZSMTBpNDNSMTFkMFIxMmQ1MTJSMTNhaTFpMmkyaTJpMmkyaTJpMmkyaTJpMmkyaTJoZzoxNTVvUjBkNzY4UjFhZDY0LjUxMmQxMDI0ZDY0LjUxMmQyNTZkNDQ4LjUxMmQyNTZkNDQ4LjUxMmQxMDI0ZDY0LjUxMmQxMDI0ZDEyOGQ5NTkuNDg4ZDM4NGQ5NTkuNDg4ZDM4NGQzMTkuNDg3ZDEyOGQzMTkuNDg3ZDEyOGQ5NTkuNDg4aFIyZDUxMlIzZDQ0OC41MTJSNGQ2NC41MTJSNWQ3NjhSNmQwUjdkNzAzLjQ4OFI4ZDBSOWQyNTZSMTBpMTU1UjExZDY0LjUxMlIxMmQ1MTJSMTNhaTFpMmkyaTJpMmkxaTJpMmkyaTJoZzo0Mm9SMGQ3NjhSMWFkMTI4ZDUxMmQxMjhkMzg0ZDBkMzg0ZDBkNTEyZDEyOGQ1MTJkMjU2ZDY0MGQyNTZkNTEyZDEyOGQ1MTJkMTI4ZDY0MGQyNTZkNjQwZDM4NGQ1MTJkMzg0ZDM4NGQyNTZkMzg0ZDI1NmQ1MTJkMzg0ZDUxMmQxMjhkNzY4ZDEyOGQ2NDBkMGQ2NDBkMGQ3NjhkMTI4ZDc2OGQzODRkNzY4ZDM4NGQ2NDBkMjU2ZDY0MGQyNTZkNzY4ZDM4NGQ3NjhoUjJkNTEyUjNkMzg0UjRkMFI1ZDY0MFI2ZDI1NlI3ZDY0MFI4ZDBSOWQyNTZSMTBpNDJSMTFkMFIxMmQ1MTJSMTNhaTFpMmkyaTJpMmkxaTJpMmkyaTJpMWkyaTJpMmkyaTFpMmkyaTJpMmkxaTJpMmkyaTJoZzoxNTRvUjBkNzY4UjFhZDY0LjUxMmQxMDI0ZDY0LjUxMmQyNTZkNDQ4LjUxMmQyNTZkNDQ4LjUxMmQxMDI0ZDY0LjUxMmQxMDI0ZDEyOGQ5NTkuNDg4ZDM4NGQ5NTkuNDg4ZDM4NGQzMTkuNDg3ZDEyOGQzMTkuNDg3ZDEyOGQ5NTkuNDg4aFIyZDUxMlIzZDQ0OC41MTJSNGQ2NC41MTJSNWQ3NjhSNmQwUjdkNzAzLjQ4OFI4ZDBSOWQyNTZSMTBpMTU0UjExZDY0LjUxMlIxMmQ1MTJSMTNhaTFpMmkyaTJpMmkxaTJpMmkyaTJoZzo0MW9SMGQ3NjhSMWFkMGQzODRkMGQ1MTJkMTI4ZDUxMmQxMjhkMzg0ZDBkMzg0ZDI1NmQ1MTJkMTI4ZDUxMmQxMjhkODk2ZDI1NmQ4OTZkMjU2ZDUxMmQxMjhkODk2ZDBkODk2ZDBkMTAyNGQxMjhkMTAyNGQxMjhkODk2aFIyZDM4NFIzZDI1NlI0ZDBSNWQ2NDBSNmQwUjdkNjQwUjhkMFI5ZDI1NlIxMGk0MVIxMWQwUjEyZDM4NFIxM2FpMWkyaTJpMmkyaTFpMmkyaTJpMmkxaTJpMmkyaTJoZzoxNTNvUjBkNzY4UjFhZDY0LjUxMmQxMDI0ZDY0LjUxMmQyNTZkNDQ4LjUxMmQyNTZkNDQ4LjUxMmQxMDI0ZDY0LjUxMmQxMDI0ZDEyOGQ5NTkuNDg4ZDM4NGQ5NTkuNDg4ZDM4NGQzMTkuNDg3ZDEyOGQzMTkuNDg3ZDEyOGQ5NTkuNDg4aFIyZDUxMlIzZDQ0OC41MTJSNGQ2NC41MTJSNWQ3NjhSNmQwUjdkNzAzLjQ4OFI4ZDBSOWQyNTZSMTBpMTUzUjExZDY0LjUxMlIxMmQ1MTJSMTNhaTFpMmkyaTJpMmkxaTJpMmkyaTJoZzo0MG9SMGQ3NjhSMWFkMjU2ZDM4NGQxMjhkMzg0ZDEyOGQ1MTJkMjU2ZDUxMmQyNTZkMzg0ZDEyOGQ1MTJkMGQ1MTJkMGQ4OTZkMTI4ZDg5NmQxMjhkNTEyZDI1NmQxMDI0ZDI1NmQ4OTZkMTI4ZDg5NmQxMjhkMTAyNGQyNTZkMTAyNGhSMmQzODRSM2QyNTZSNGQwUjVkNjQwUjZkMFI3ZDY0MFI4ZDBSOWQyNTZSMTBpNDBSMTFkMFIxMmQzODRSMTNhaTFpMmkyaTJpMmkxaTJpMmkyaTJpMWkyaTJpMmkyaGc6MTUyb1IwZDc2OFIxYWQ2NC41MTJkMTAyNGQ2NC41MTJkMjU2ZDQ0OC41MTJkMjU2ZDQ0OC41MTJkMTAyNGQ2NC41MTJkMTAyNGQxMjhkOTU5LjQ4OGQzODRkOTU5LjQ4OGQzODRkMzE5LjQ4N2QxMjhkMzE5LjQ4N2QxMjhkOTU5LjQ4OGhSMmQ1MTJSM2Q0NDguNTEyUjRkNjQuNTEyUjVkNzY4UjZkMFI3ZDcwMy40ODhSOGQwUjlkMjU2UjEwaTE1MlIxMWQ2NC41MTJSMTJkNTEyUjEzYWkxaTJpMmkyaTJpMWkyaTJpMmkyaGc6MzlvUjBkNzY4UjFhZDEyOGQzODRkMGQzODRkMGQ2NDBkMTI4ZDY0MGQxMjhkMzg0aFIyZDI1NlIzZDEyOFI0ZDBSNWQ2NDBSNmQzODRSN2Q2NDBSOGQwUjlkMjU2UjEwaTM5UjExZDBSMTJkMjU2UjEzYWkxaTJpMmkyaTJoZzoxNTFvUjBkNzY4UjFhZDY0LjUxMmQxMDI0ZDY0LjUxMmQyNTZkNDQ4LjUxMmQyNTZkNDQ4LjUxMmQxMDI0ZDY0LjUxMmQxMDI0ZDEyOGQ5NTkuNDg4ZDM4NGQ5NTkuNDg4ZDM4NGQzMTkuNDg3ZDEyOGQzMTkuNDg3ZDEyOGQ5NTkuNDg4aFIyZDUxMlIzZDQ0OC41MTJSNGQ2NC41MTJSNWQ3NjhSNmQwUjdkNzAzLjQ4OFI4ZDBSOWQyNTZSMTBpMTUxUjExZDY0LjUxMlIxMmQ1MTJSMTNhaTFpMmkyaTJpMmkxaTJpMmkyaTJoZzozOG9SMGQ3NjhSMWFkMzg0ZDc2OS4wMjRkMTI4ZDc2OS4wMjRkMTI4ZDg5NC45NzZkMzg0ZDg5NC45NzZkMzg0ZDc2OS4wMjRkNjQwZDEwMjRkNTEyZDEwMjRkNTEyZDg5NmQzODRkODk2ZDM4NGQxMDI0ZDEyOGQxMDI0ZDEyOGQ4OTZkMGQ4OTZkMGQ3NjhkMTI4ZDc2OGQxMjhkNjQwZDBkNjQwZDBkNTEyZDEyOGQ1MTJkMTI4ZDM4NGQzODRkMzg0ZDM4NGQ1MTJkMTI4ZDUxMmQxMjhkNjQwZDM4NGQ2NDBkMzg0ZDc2OGQ1MTJkNzY4ZDUxMmQ2NDBkNjQwZDY0MGQ2NDBkNzY4ZDUxMmQ3NjhkNTEyZDg5NmQ2NDBkODk2ZDY0MGQxMDI0aFIyZDc2OFIzZDY0MFI0ZDBSNWQ2NDBSNmQwUjdkNjQwUjhkMFI5ZDI1NlIxMGkzOFIxMWQwUjEyZDc2OFIxM2FpMWkyaTJpMmkyaTFpMmkyaTJpMmkyaTJpMmkyaTJpMmkyaTJpMmkyaTJpMmkyaTJpMmkyaTJpMmkyaTJpMmkyaTJpMmhnOjE1MG9SMGQ3NjhSMWFkNjQuNTEyZDEwMjRkNjQuNTEyZDI1NmQ0NDguNTEyZDI1NmQ0NDguNTEyZDEwMjRkNjQuNTEyZDEwMjRkMTI4ZDk1OS40ODhkMzg0ZDk1OS40ODhkMzg0ZDMxOS40ODdkMTI4ZDMxOS40ODdkMTI4ZDk1OS40ODhoUjJkNTEyUjNkNDQ4LjUxMlI0ZDY0LjUxMlI1ZDc2OFI2ZDBSN2Q3MDMuNDg4UjhkMFI5ZDI1NlIxMGkxNTBSMTFkNjQuNTEyUjEyZDUxMlIxM2FpMWkyaTJpMmkyaTFpMmkyaTJpMmhnOjM3b1IwZDc2OFIxYWQxMjhkMzg0ZDBkMzg0ZDBkNTEyZDEyOGQ1MTJkMTI4ZDM4NGQ1MTJkMzg0ZDM4NGQzODRkMzg0ZDY0MGQ1MTJkNjQwZDUxMmQzODRkMTI4ZDEwMjRkMjU2ZDEwMjRkMjU2ZDc2OGQxMjhkNzY4ZDEyOGQxMDI0ZDI1NmQ3NjhkMzg0ZDc2OGQzODRkNjQwZDI1NmQ2NDBkMjU2ZDc2OGQ1MTJkODk2ZDUxMmQxMDI0ZDY0MGQxMDI0ZDY0MGQ4OTZkNTEyZDg5NmhSMmQ3NjhSM2Q2NDBSNGQwUjVkNjQwUjZkMFI3ZDY0MFI4ZDBSOWQyNTZSMTBpMzdSMTFkMFIxMmQ3NjhSMTNhaTFpMmkyaTJpMmkxaTJpMmkyaTJpMWkyaTJpMmkyaTFpMmkyaTJpMmkxaTJpMmkyaTJoZzoxNDlvUjBkNzY4UjFhZDY0LjUxMmQxMDI0ZDY0LjUxMmQyNTZkNDQ4LjUxMmQyNTZkNDQ4LjUxMmQxMDI0ZDY0LjUxMmQxMDI0ZDEyOGQ5NTkuNDg4ZDM4NGQ5NTkuNDg4ZDM4NGQzMTkuNDg3ZDEyOGQzMTkuNDg3ZDEyOGQ5NTkuNDg4aFIyZDUxMlIzZDQ0OC41MTJSNGQ2NC41MTJSNWQ3NjhSNmQwUjdkNzAzLjQ4OFI4ZDBSOWQyNTZSMTBpMTQ5UjExZDY0LjUxMlIxMmQ1MTJSMTNhaTFpMmkyaTJpMmkxaTJpMmkyaTJoZzozNm9SMGQ3NjhSMWFkMzg0ZDM4NGQyNTZkMzg0ZDI1NmQ1MTJkMTI4ZDUxMmQxMjhkNjQwZDBkNjQwZDBkNzY4ZDI1NmQ3NjhkMjU2ZDY0MGQ1MTJkNjQwZDUxMmQ1MTJkMzg0ZDUxMmQzODRkMzg0ZDBkODk2ZDBkMTAyNGQyNTZkMTAyNGQyNTZkMTE1MmQzODRkMTE1MmQzODRkODk2ZDUxMmQ4OTZkNTEyZDc2OGQyNTZkNzY4ZDI1NmQ4OTZkMGQ4OTZoUjJkNjQwUjNkNTEyUjRkMFI1ZDY0MFI2ZC0xMjhSN2Q2NDBSOGQwUjlkMjU2UjEwaTM2UjExZDBSMTJkNjQwUjEzYWkxaTJpMmkyaTJpMmkyaTJpMmkyaTJpMmkyaTFpMmkyaTJpMmkyaTJpMmkyaTJpMmhnOjE0OG9SMGQ3NjhSMWFkNjQuNTEyZDEwMjRkNjQuNTEyZDI1NmQ0NDguNTEyZDI1NmQ0NDguNTEyZDEwMjRkNjQuNTEyZDEwMjRkMTI4ZDk1OS40ODhkMzg0ZDk1OS40ODhkMzg0ZDMxOS40ODdkMTI4ZDMxOS40ODdkMTI4ZDk1OS40ODhoUjJkNTEyUjNkNDQ4LjUxMlI0ZDY0LjUxMlI1ZDc2OFI2ZDBSN2Q3MDMuNDg4UjhkMFI5ZDI1NlIxMGkxNDhSMTFkNjQuNTEyUjEyZDUxMlIxM2FpMWkyaTJpMmkyaTFpMmkyaTJpMmhnOjM1b1IwZDc2OFIxYWQ2NDBkNjQwZDY0MGQ1MTJkNTEyZDUxMmQ1MTJkMzg0ZDM4NGQzODRkMzg0ZDUxMmQyNTZkNTEyZDI1NmQzODRkMTI4ZDM4NGQxMjhkNTEyZDBkNTEyZDBkNjQwZDEyOGQ2NDBkMTI4ZDc2OGQwZDc2OGQwZDg5NmQxMjhkODk2ZDEyOGQxMDI0ZDI1NmQxMDI0ZDI1NmQ4OTZkMzg0ZDg5NmQzODRkMTAyNGQ1MTJkMTAyNGQ1MTJkODk2ZDY0MGQ4OTZkNjQwZDc2OGQ1MTJkNzY4ZDUxMmQ2NDBkNjQwZDY0MGQzODRkNzY4ZDI1NmQ3NjhkMjU2ZDY0MGQzODRkNjQwZDM4NGQ3NjhoUjJkNzY4UjNkNjQwUjRkMFI1ZDY0MFI2ZDBSN2Q2NDBSOGQwUjlkMjU2UjEwaTM1UjExZDBSMTJkNzY4UjEzYWkxaTJpMmkyaTJpMmkyaTJpMmkyaTJpMmkyaTJpMmkyaTJpMmkyaTJpMmkyaTJpMmkyaTJpMmkyaTJpMWkyaTJpMmkyaGc6MTQ3b1IwZDc2OFIxYWQ2NC41MTJkMTAyNGQ2NC41MTJkMjU2ZDQ0OC41MTJkMjU2ZDQ0OC41MTJkMTAyNGQ2NC41MTJkMTAyNGQxMjhkOTU5LjQ4OGQzODRkOTU5LjQ4OGQzODRkMzE5LjQ4N2QxMjhkMzE5LjQ4N2QxMjhkOTU5LjQ4OGhSMmQ1MTJSM2Q0NDguNTEyUjRkNjQuNTEyUjVkNzY4UjZkMFI3ZDcwMy40ODhSOGQwUjlkMjU2UjEwaTE0N1IxMWQ2NC41MTJSMTJkNTEyUjEzYWkxaTJpMmkyaTJpMWkyaTJpMmkyaGc6MzRvUjBkNzY4UjFhZDBkNjQwZDEyOGQ2NDBkMTI4ZDM4NGQwZDM4NGQwZDY0MGQyNTZkNjQwZDM4NGQ2NDBkMzg0ZDM4NGQyNTZkMzg0ZDI1NmQ2NDBoUjJkNTEyUjNkMzg0UjRkMFI1ZDY0MFI2ZDM4NFI3ZDY0MFI4ZDBSOWQyNTZSMTBpMzRSMTFkMFIxMmQ1MTJSMTNhaTFpMmkyaTJpMmkxaTJpMmkyaTJoZzoxNDZvUjBkNzY4UjFhZDY0LjUxMmQxMDI0ZDY0LjUxMmQyNTZkNDQ4LjUxMmQyNTZkNDQ4LjUxMmQxMDI0ZDY0LjUxMmQxMDI0ZDEyOGQ5NTkuNDg4ZDM4NGQ5NTkuNDg4ZDM4NGQzMTkuNDg3ZDEyOGQzMTkuNDg3ZDEyOGQ5NTkuNDg4aFIyZDUxMlIzZDQ0OC41MTJSNGQ2NC41MTJSNWQ3NjhSNmQwUjdkNzAzLjQ4OFI4ZDBSOWQyNTZSMTBpMTQ2UjExZDY0LjUxMlIxMmQ1MTJSMTNhaTFpMmkyaTJpMmkxaTJpMmkyaTJoZzozM29SMGQ3NjhSMWFkMTI4ZDM4NGQwZDM4NGQwZDc2OGQxMjhkNzY4ZDEyOGQzODRkMTI4ZDg5NmQwZDg5NmQwZDEwMjRkMTI4ZDEwMjRkMTI4ZDg5NmhSMmQyNTZSM2QxMjhSNGQwUjVkNjQwUjZkMFI3ZDY0MFI4ZDBSOWQyNTZSMTBpMzNSMTFkMFIxMmQyNTZSMTNhaTFpMmkyaTJpMmkxaTJpMmkyaTJoZzoxNDVvUjBkNzY4UjFhZDY0LjUxMmQxMDI0ZDY0LjUxMmQyNTZkNDQ4LjUxMmQyNTZkNDQ4LjUxMmQxMDI0ZDY0LjUxMmQxMDI0ZDEyOGQ5NTkuNDg4ZDM4NGQ5NTkuNDg4ZDM4NGQzMTkuNDg3ZDEyOGQzMTkuNDg3ZDEyOGQ5NTkuNDg4aFIyZDUxMlIzZDQ0OC41MTJSNGQ2NC41MTJSNWQ3NjhSNmQwUjdkNzAzLjQ4OFI4ZDBSOWQyNTZSMTBpMTQ1UjExZDY0LjUxMlIxMmQ1MTJSMTNhaTFpMmkyaTJpMmkxaTJpMmkyaTJoZzozMm9SMGQ3NjhSMWFoUjJkNTEyUjNkMFI0ZDBSNWQwUjZkMFI3ZDBSOGQwUjlkMjU2UjEwaTMyUjExZDBSMTJkNTEyUjEzYWhnOjE0NG9SMGQ3NjhSMWFkNjQuNTEyZDEwMjRkNjQuNTEyZDI1NmQ0NDguNTEyZDI1NmQ0NDguNTEyZDEwMjRkNjQuNTEyZDEwMjRkMTI4ZDk1OS40ODhkMzg0ZDk1OS40ODhkMzg0ZDMxOS40ODdkMTI4ZDMxOS40ODdkMTI4ZDk1OS40ODhoUjJkNTEyUjNkNDQ4LjUxMlI0ZDY0LjUxMlI1ZDc2OFI2ZDBSN2Q3MDMuNDg4UjhkMFI5ZDI1NlIxMGkxNDRSMTFkNjQuNTEyUjEyZDUxMlIxM2FpMWkyaTJpMmkyaTFpMmkyaTJpMmhnOjE0M29SMGQ3NjhSMWFkNjQuNTEyZDEwMjRkNjQuNTEyZDI1NmQ0NDguNTEyZDI1NmQ0NDguNTEyZDEwMjRkNjQuNTEyZDEwMjRkMTI4ZDk1OS40ODhkMzg0ZDk1OS40ODhkMzg0ZDMxOS40ODdkMTI4ZDMxOS40ODdkMTI4ZDk1OS40ODhoUjJkNTEyUjNkNDQ4LjUxMlI0ZDY0LjUxMlI1ZDc2OFI2ZDBSN2Q3MDMuNDg4UjhkMFI5ZDI1NlIxMGkxNDNSMTFkNjQuNTEyUjEyZDUxMlIxM2FpMWkyaTJpMmkyaTFpMmkyaTJpMmhnOjI1NW9SMGQ3NjhSMWFkNjQuNTEyZDEwMjRkNjQuNTEyZDI1NmQ0NDguNTEyZDI1NmQ0NDguNTEyZDEwMjRkNjQuNTEyZDEwMjRkMTI4ZDk1OS40ODhkMzg0ZDk1OS40ODhkMzg0ZDMxOS40ODdkMTI4ZDMxOS40ODdkMTI4ZDk1OS40ODhoUjJkNTEyUjNkNDQ4LjUxMlI0ZDY0LjUxMlI1ZDc2OFI2ZDBSN2Q3MDMuNDg4UjhkMFI5ZDI1NlIxMGkyNTVSMTFkNjQuNTEyUjEyZDUxMlIxM2FpMWkyaTJpMmkyaTFpMmkyaTJpMmhnOjE0Mm9SMGQ3NjhSMWFkNjQuNTEyZDEwMjRkNjQuNTEyZDI1NmQ0NDguNTEyZDI1NmQ0NDguNTEyZDEwMjRkNjQuNTEyZDEwMjRkMTI4ZDk1OS40ODhkMzg0ZDk1OS40ODhkMzg0ZDMxOS40ODdkMTI4ZDMxOS40ODdkMTI4ZDk1OS40ODhoUjJkNTEyUjNkNDQ4LjUxMlI0ZDY0LjUxMlI1ZDc2OFI2ZDBSN2Q3MDMuNDg4UjhkMFI5ZDI1NlIxMGkxNDJSMTFkNjQuNTEyUjEyZDUxMlIxM2FpMWkyaTJpMmkyaTFpMmkyaTJpMmhnOjI1NG9SMGQ3NjhSMWFkNjQuNTEyZDEwMjRkNjQuNTEyZDI1NmQ0NDguNTEyZDI1NmQ0NDguNTEyZDEwMjRkNjQuNTEyZDEwMjRkMTI4ZDk1OS40ODhkMzg0ZDk1OS40ODhkMzg0ZDMxOS40ODdkMTI4ZDMxOS40ODdkMTI4ZDk1OS40ODhoUjJkNTEyUjNkNDQ4LjUxMlI0ZDY0LjUxMlI1ZDc2OFI2ZDBSN2Q3MDMuNDg4UjhkMFI5ZDI1NlIxMGkyNTRSMTFkNjQuNTEyUjEyZDUxMlIxM2FpMWkyaTJpMmkyaTFpMmkyaTJpMmhnOjE0MW9SMGQ3NjhSMWFkNjQuNTEyZDEwMjRkNjQuNTEyZDI1NmQ0NDguNTEyZDI1NmQ0NDguNTEyZDEwMjRkNjQuNTEyZDEwMjRkMTI4ZDk1OS40ODhkMzg0ZDk1OS40ODhkMzg0ZDMxOS40ODdkMTI4ZDMxOS40ODdkMTI4ZDk1OS40ODhoUjJkNTEyUjNkNDQ4LjUxMlI0ZDY0LjUxMlI1ZDc2OFI2ZDBSN2Q3MDMuNDg4UjhkMFI5ZDI1NlIxMGkxNDFSMTFkNjQuNTEyUjEyZDUxMlIxM2FpMWkyaTJpMmkyaTFpMmkyaTJpMmhnOjI1M29SMGQ3NjhSMWFkNjQuNTEyZDEwMjRkNjQuNTEyZDI1NmQ0NDguNTEyZDI1NmQ0NDguNTEyZDEwMjRkNjQuNTEyZDEwMjRkMTI4ZDk1OS40ODhkMzg0ZDk1OS40ODhkMzg0ZDMxOS40ODdkMTI4ZDMxOS40ODdkMTI4ZDk1OS40ODhoUjJkNTEyUjNkNDQ4LjUxMlI0ZDY0LjUxMlI1ZDc2OFI2ZDBSN2Q3MDMuNDg4UjhkMFI5ZDI1NlIxMGkyNTNSMTFkNjQuNTEyUjEyZDUxMlIxM2FpMWkyaTJpMmkyaTFpMmkyaTJpMmhnOjE0MG9SMGQ3NjhSMWFkNjQuNTEyZDEwMjRkNjQuNTEyZDI1NmQ0NDguNTEyZDI1NmQ0NDguNTEyZDEwMjRkNjQuNTEyZDEwMjRkMTI4ZDk1OS40ODhkMzg0ZDk1OS40ODhkMzg0ZDMxOS40ODdkMTI4ZDMxOS40ODdkMTI4ZDk1OS40ODhoUjJkNTEyUjNkNDQ4LjUxMlI0ZDY0LjUxMlI1ZDc2OFI2ZDBSN2Q3MDMuNDg4UjhkMFI5ZDI1NlIxMGkxNDBSMTFkNjQuNTEyUjEyZDUxMlIxM2FpMWkyaTJpMmkyaTFpMmkyaTJpMmhnOjI1Mm9SMGQ3NjhSMWFkNjQuNTEyZDEwMjRkNjQuNTEyZDI1NmQ0NDguNTEyZDI1NmQ0NDguNTEyZDEwMjRkNjQuNTEyZDEwMjRkMTI4ZDk1OS40ODhkMzg0ZDk1OS40ODhkMzg0ZDMxOS40ODdkMTI4ZDMxOS40ODdkMTI4ZDk1OS40ODhoUjJkNTEyUjNkNDQ4LjUxMlI0ZDY0LjUxMlI1ZDc2OFI2ZDBSN2Q3MDMuNDg4UjhkMFI5ZDI1NlIxMGkyNTJSMTFkNjQuNTEyUjEyZDUxMlIxM2FpMWkyaTJpMmkyaTFpMmkyaTJpMmhnOjEzOW9SMGQ3NjhSMWFkNjQuNTEyZDEwMjRkNjQuNTEyZDI1NmQ0NDguNTEyZDI1NmQ0NDguNTEyZDEwMjRkNjQuNTEyZDEwMjRkMTI4ZDk1OS40ODhkMzg0ZDk1OS40ODhkMzg0ZDMxOS40ODdkMTI4ZDMxOS40ODdkMTI4ZDk1OS40ODhoUjJkNTEyUjNkNDQ4LjUxMlI0ZDY0LjUxMlI1ZDc2OFI2ZDBSN2Q3MDMuNDg4UjhkMFI5ZDI1NlIxMGkxMzlSMTFkNjQuNTEyUjEyZDUxMlIxM2FpMWkyaTJpMmkyaTFpMmkyaTJpMmhnOjI1MW9SMGQ3NjhSMWFkNjQuNTEyZDEwMjRkNjQuNTEyZDI1NmQ0NDguNTEyZDI1NmQ0NDguNTEyZDEwMjRkNjQuNTEyZDEwMjRkMTI4ZDk1OS40ODhkMzg0ZDk1OS40ODhkMzg0ZDMxOS40ODdkMTI4ZDMxOS40ODdkMTI4ZDk1OS40ODhoUjJkNTEyUjNkNDQ4LjUxMlI0ZDY0LjUxMlI1ZDc2OFI2ZDBSN2Q3MDMuNDg4UjhkMFI5ZDI1NlIxMGkyNTFSMTFkNjQuNTEyUjEyZDUxMlIxM2FpMWkyaTJpMmkyaTFpMmkyaTJpMmhnOjEzOG9SMGQ3NjhSMWFkNjQuNTEyZDEwMjRkNjQuNTEyZDI1NmQ0NDguNTEyZDI1NmQ0NDguNTEyZDEwMjRkNjQuNTEyZDEwMjRkMTI4ZDk1OS40ODhkMzg0ZDk1OS40ODhkMzg0ZDMxOS40ODdkMTI4ZDMxOS40ODdkMTI4ZDk1OS40ODhoUjJkNTEyUjNkNDQ4LjUxMlI0ZDY0LjUxMlI1ZDc2OFI2ZDBSN2Q3MDMuNDg4UjhkMFI5ZDI1NlIxMGkxMzhSMTFkNjQuNTEyUjEyZDUxMlIxM2FpMWkyaTJpMmkyaTFpMmkyaTJpMmhnOjI1MG9SMGQ3NjhSMWFkNjQuNTEyZDEwMjRkNjQuNTEyZDI1NmQ0NDguNTEyZDI1NmQ0NDguNTEyZDEwMjRkNjQuNTEyZDEwMjRkMTI4ZDk1OS40ODhkMzg0ZDk1OS40ODhkMzg0ZDMxOS40ODdkMTI4ZDMxOS40ODdkMTI4ZDk1OS40ODhoUjJkNTEyUjNkNDQ4LjUxMlI0ZDY0LjUxMlI1ZDc2OFI2ZDBSN2Q3MDMuNDg4UjhkMFI5ZDI1NlIxMGkyNTBSMTFkNjQuNTEyUjEyZDUxMlIxM2FpMWkyaTJpMmkyaTFpMmkyaTJpMmhnOjEzN29SMGQ3NjhSMWFkNjQuNTEyZDEwMjRkNjQuNTEyZDI1NmQ0NDguNTEyZDI1NmQ0NDguNTEyZDEwMjRkNjQuNTEyZDEwMjRkMTI4ZDk1OS40ODhkMzg0ZDk1OS40ODhkMzg0ZDMxOS40ODdkMTI4ZDMxOS40ODdkMTI4ZDk1OS40ODhoUjJkNTEyUjNkNDQ4LjUxMlI0ZDY0LjUxMlI1ZDc2OFI2ZDBSN2Q3MDMuNDg4UjhkMFI5ZDI1NlIxMGkxMzdSMTFkNjQuNTEyUjEyZDUxMlIxM2FpMWkyaTJpMmkyaTFpMmkyaTJpMmhnOjI0OW9SMGQ3NjhSMWFkNjQuNTEyZDEwMjRkNjQuNTEyZDI1NmQ0NDguNTEyZDI1NmQ0NDguNTEyZDEwMjRkNjQuNTEyZDEwMjRkMTI4ZDk1OS40ODhkMzg0ZDk1OS40ODhkMzg0ZDMxOS40ODdkMTI4ZDMxOS40ODdkMTI4ZDk1OS40ODhoUjJkNTEyUjNkNDQ4LjUxMlI0ZDY0LjUxMlI1ZDc2OFI2ZDBSN2Q3MDMuNDg4UjhkMFI5ZDI1NlIxMGkyNDlSMTFkNjQuNTEyUjEyZDUxMlIxM2FpMWkyaTJpMmkyaTFpMmkyaTJpMmhnOjEzNm9SMGQ3NjhSMWFkNjQuNTEyZDEwMjRkNjQuNTEyZDI1NmQ0NDguNTEyZDI1NmQ0NDguNTEyZDEwMjRkNjQuNTEyZDEwMjRkMTI4ZDk1OS40ODhkMzg0ZDk1OS40ODhkMzg0ZDMxOS40ODdkMTI4ZDMxOS40ODdkMTI4ZDk1OS40ODhoUjJkNTEyUjNkNDQ4LjUxMlI0ZDY0LjUxMlI1ZDc2OFI2ZDBSN2Q3MDMuNDg4UjhkMFI5ZDI1NlIxMGkxMzZSMTFkNjQuNTEyUjEyZDUxMlIxM2FpMWkyaTJpMmkyaTFpMmkyaTJpMmhnOjI0OG9SMGQ3NjhSMWFkNjQuNTEyZDEwMjRkNjQuNTEyZDI1NmQ0NDguNTEyZDI1NmQ0NDguNTEyZDEwMjRkNjQuNTEyZDEwMjRkMTI4ZDk1OS40ODhkMzg0ZDk1OS40ODhkMzg0ZDMxOS40ODdkMTI4ZDMxOS40ODdkMTI4ZDk1OS40ODhoUjJkNTEyUjNkNDQ4LjUxMlI0ZDY0LjUxMlI1ZDc2OFI2ZDBSN2Q3MDMuNDg4UjhkMFI5ZDI1NlIxMGkyNDhSMTFkNjQuNTEyUjEyZDUxMlIxM2FpMWkyaTJpMmkyaTFpMmkyaTJpMmhnOjEzNW9SMGQ3NjhSMWFkNjQuNTEyZDEwMjRkNjQuNTEyZDI1NmQ0NDguNTEyZDI1NmQ0NDguNTEyZDEwMjRkNjQuNTEyZDEwMjRkMTI4ZDk1OS40ODhkMzg0ZDk1OS40ODhkMzg0ZDMxOS40ODdkMTI4ZDMxOS40ODdkMTI4ZDk1OS40ODhoUjJkNTEyUjNkNDQ4LjUxMlI0ZDY0LjUxMlI1ZDc2OFI2ZDBSN2Q3MDMuNDg4UjhkMFI5ZDI1NlIxMGkxMzVSMTFkNjQuNTEyUjEyZDUxMlIxM2FpMWkyaTJpMmkyaTFpMmkyaTJpMmhnOjI0N29SMGQ3NjhSMWFkNjQuNTEyZDEwMjRkNjQuNTEyZDI1NmQ0NDguNTEyZDI1NmQ0NDguNTEyZDEwMjRkNjQuNTEyZDEwMjRkMTI4ZDk1OS40ODhkMzg0ZDk1OS40ODhkMzg0ZDMxOS40ODdkMTI4ZDMxOS40ODdkMTI4ZDk1OS40ODhoUjJkNTEyUjNkNDQ4LjUxMlI0ZDY0LjUxMlI1ZDc2OFI2ZDBSN2Q3MDMuNDg4UjhkMFI5ZDI1NlIxMGkyNDdSMTFkNjQuNTEyUjEyZDUxMlIxM2FpMWkyaTJpMmkyaTFpMmkyaTJpMmhnOjEzNG9SMGQ3NjhSMWFkNjQuNTEyZDEwMjRkNjQuNTEyZDI1NmQ0NDguNTEyZDI1NmQ0NDguNTEyZDEwMjRkNjQuNTEyZDEwMjRkMTI4ZDk1OS40ODhkMzg0ZDk1OS40ODhkMzg0ZDMxOS40ODdkMTI4ZDMxOS40ODdkMTI4ZDk1OS40ODhoUjJkNTEyUjNkNDQ4LjUxMlI0ZDY0LjUxMlI1ZDc2OFI2ZDBSN2Q3MDMuNDg4UjhkMFI5ZDI1NlIxMGkxMzRSMTFkNjQuNTEyUjEyZDUxMlIxM2FpMWkyaTJpMmkyaTFpMmkyaTJpMmhnOjI0Nm9SMGQ3NjhSMWFkNjQuNTEyZDEwMjRkNjQuNTEyZDI1NmQ0NDguNTEyZDI1NmQ0NDguNTEyZDEwMjRkNjQuNTEyZDEwMjRkMTI4ZDk1OS40ODhkMzg0ZDk1OS40ODhkMzg0ZDMxOS40ODdkMTI4ZDMxOS40ODdkMTI4ZDk1OS40ODhoUjJkNTEyUjNkNDQ4LjUxMlI0ZDY0LjUxMlI1ZDc2OFI2ZDBSN2Q3MDMuNDg4UjhkMFI5ZDI1NlIxMGkyNDZSMTFkNjQuNTEyUjEyZDUxMlIxM2FpMWkyaTJpMmkyaTFpMmkyaTJpMmhnOjEzM29SMGQ3NjhSMWFkNjQuNTEyZDEwMjRkNjQuNTEyZDI1NmQ0NDguNTEyZDI1NmQ0NDguNTEyZDEwMjRkNjQuNTEyZDEwMjRkMTI4ZDk1OS40ODhkMzg0ZDk1OS40ODhkMzg0ZDMxOS40ODdkMTI4ZDMxOS40ODdkMTI4ZDk1OS40ODhoUjJkNTEyUjNkNDQ4LjUxMlI0ZDY0LjUxMlI1ZDc2OFI2ZDBSN2Q3MDMuNDg4UjhkMFI5ZDI1NlIxMGkxMzNSMTFkNjQuNTEyUjEyZDUxMlIxM2FpMWkyaTJpMmkyaTFpMmkyaTJpMmhnOjI0NW9SMGQ3NjhSMWFkNjQuNTEyZDEwMjRkNjQuNTEyZDI1NmQ0NDguNTEyZDI1NmQ0NDguNTEyZDEwMjRkNjQuNTEyZDEwMjRkMTI4ZDk1OS40ODhkMzg0ZDk1OS40ODhkMzg0ZDMxOS40ODdkMTI4ZDMxOS40ODdkMTI4ZDk1OS40ODhoUjJkNTEyUjNkNDQ4LjUxMlI0ZDY0LjUxMlI1ZDc2OFI2ZDBSN2Q3MDMuNDg4UjhkMFI5ZDI1NlIxMGkyNDVSMTFkNjQuNTEyUjEyZDUxMlIxM2FpMWkyaTJpMmkyaTFpMmkyaTJpMmhnOjEzMm9SMGQ3NjhSMWFkNjQuNTEyZDEwMjRkNjQuNTEyZDI1NmQ0NDguNTEyZDI1NmQ0NDguNTEyZDEwMjRkNjQuNTEyZDEwMjRkMTI4ZDk1OS40ODhkMzg0ZDk1OS40ODhkMzg0ZDMxOS40ODdkMTI4ZDMxOS40ODdkMTI4ZDk1OS40ODhoUjJkNTEyUjNkNDQ4LjUxMlI0ZDY0LjUxMlI1ZDc2OFI2ZDBSN2Q3MDMuNDg4UjhkMFI5ZDI1NlIxMGkxMzJSMTFkNjQuNTEyUjEyZDUxMlIxM2FpMWkyaTJpMmkyaTFpMmkyaTJpMmhnOjI0NG9SMGQ3NjhSMWFkNjQuNTEyZDEwMjRkNjQuNTEyZDI1NmQ0NDguNTEyZDI1NmQ0NDguNTEyZDEwMjRkNjQuNTEyZDEwMjRkMTI4ZDk1OS40ODhkMzg0ZDk1OS40ODhkMzg0ZDMxOS40ODdkMTI4ZDMxOS40ODdkMTI4ZDk1OS40ODhoUjJkNTEyUjNkNDQ4LjUxMlI0ZDY0LjUxMlI1ZDc2OFI2ZDBSN2Q3MDMuNDg4UjhkMFI5ZDI1NlIxMGkyNDRSMTFkNjQuNTEyUjEyZDUxMlIxM2FpMWkyaTJpMmkyaTFpMmkyaTJpMmhnOjEzMW9SMGQ3NjhSMWFkNjQuNTEyZDEwMjRkNjQuNTEyZDI1NmQ0NDguNTEyZDI1NmQ0NDguNTEyZDEwMjRkNjQuNTEyZDEwMjRkMTI4ZDk1OS40ODhkMzg0ZDk1OS40ODhkMzg0ZDMxOS40ODdkMTI4ZDMxOS40ODdkMTI4ZDk1OS40ODhoUjJkNTEyUjNkNDQ4LjUxMlI0ZDY0LjUxMlI1ZDc2OFI2ZDBSN2Q3MDMuNDg4UjhkMFI5ZDI1NlIxMGkxMzFSMTFkNjQuNTEyUjEyZDUxMlIxM2FpMWkyaTJpMmkyaTFpMmkyaTJpMmhnOjI0M29SMGQ3NjhSMWFkNjQuNTEyZDEwMjRkNjQuNTEyZDI1NmQ0NDguNTEyZDI1NmQ0NDguNTEyZDEwMjRkNjQuNTEyZDEwMjRkMTI4ZDk1OS40ODhkMzg0ZDk1OS40ODhkMzg0ZDMxOS40ODdkMTI4ZDMxOS40ODdkMTI4ZDk1OS40ODhoUjJkNTEyUjNkNDQ4LjUxMlI0ZDY0LjUxMlI1ZDc2OFI2ZDBSN2Q3MDMuNDg4UjhkMFI5ZDI1NlIxMGkyNDNSMTFkNjQuNTEyUjEyZDUxMlIxM2FpMWkyaTJpMmkyaTFpMmkyaTJpMmhnOjEzMG9SMGQ3NjhSMWFkNjQuNTEyZDEwMjRkNjQuNTEyZDI1NmQ0NDguNTEyZDI1NmQ0NDguNTEyZDEwMjRkNjQuNTEyZDEwMjRkMTI4ZDk1OS40ODhkMzg0ZDk1OS40ODhkMzg0ZDMxOS40ODdkMTI4ZDMxOS40ODdkMTI4ZDk1OS40ODhoUjJkNTEyUjNkNDQ4LjUxMlI0ZDY0LjUxMlI1ZDc2OFI2ZDBSN2Q3MDMuNDg4UjhkMFI5ZDI1NlIxMGkxMzBSMTFkNjQuNTEyUjEyZDUxMlIxM2FpMWkyaTJpMmkyaTFpMmkyaTJpMmhnOjI0Mm9SMGQ3NjhSMWFkNjQuNTEyZDEwMjRkNjQuNTEyZDI1NmQ0NDguNTEyZDI1NmQ0NDguNTEyZDEwMjRkNjQuNTEyZDEwMjRkMTI4ZDk1OS40ODhkMzg0ZDk1OS40ODhkMzg0ZDMxOS40ODdkMTI4ZDMxOS40ODdkMTI4ZDk1OS40ODhoUjJkNTEyUjNkNDQ4LjUxMlI0ZDY0LjUxMlI1ZDc2OFI2ZDBSN2Q3MDMuNDg4UjhkMFI5ZDI1NlIxMGkyNDJSMTFkNjQuNTEyUjEyZDUxMlIxM2FpMWkyaTJpMmkyaTFpMmkyaTJpMmhnOjEyOW9SMGQ3NjhSMWFkNjQuNTEyZDEwMjRkNjQuNTEyZDI1NmQ0NDguNTEyZDI1NmQ0NDguNTEyZDEwMjRkNjQuNTEyZDEwMjRkMTI4ZDk1OS40ODhkMzg0ZDk1OS40ODhkMzg0ZDMxOS40ODdkMTI4ZDMxOS40ODdkMTI4ZDk1OS40ODhoUjJkNTEyUjNkNDQ4LjUxMlI0ZDY0LjUxMlI1ZDc2OFI2ZDBSN2Q3MDMuNDg4UjhkMFI5ZDI1NlIxMGkxMjlSMTFkNjQuNTEyUjEyZDUxMlIxM2FpMWkyaTJpMmkyaTFpMmkyaTJpMmhnOjI0MW9SMGQ3NjhSMWFkNjQuNTEyZDEwMjRkNjQuNTEyZDI1NmQ0NDguNTEyZDI1NmQ0NDguNTEyZDEwMjRkNjQuNTEyZDEwMjRkMTI4ZDk1OS40ODhkMzg0ZDk1OS40ODhkMzg0ZDMxOS40ODdkMTI4ZDMxOS40ODdkMTI4ZDk1OS40ODhoUjJkNTEyUjNkNDQ4LjUxMlI0ZDY0LjUxMlI1ZDc2OFI2ZDBSN2Q3MDMuNDg4UjhkMFI5ZDI1NlIxMGkyNDFSMTFkNjQuNTEyUjEyZDUxMlIxM2FpMWkyaTJpMmkyaTFpMmkyaTJpMmhnOjEyOG9SMGQ3NjhSMWFkNjQuNTEyZDEwMjRkNjQuNTEyZDI1NmQ0NDguNTEyZDI1NmQ0NDguNTEyZDEwMjRkNjQuNTEyZDEwMjRkMTI4ZDk1OS40ODhkMzg0ZDk1OS40ODhkMzg0ZDMxOS40ODdkMTI4ZDMxOS40ODdkMTI4ZDk1OS40ODhoUjJkNTEyUjNkNDQ4LjUxMlI0ZDY0LjUxMlI1ZDc2OFI2ZDBSN2Q3MDMuNDg4UjhkMFI5ZDI1NlIxMGkxMjhSMTFkNjQuNTEyUjEyZDUxMlIxM2FpMWkyaTJpMmkyaTFpMmkyaTJpMmhnOjI0MG9SMGQ3NjhSMWFkNjQuNTEyZDEwMjRkNjQuNTEyZDI1NmQ0NDguNTEyZDI1NmQ0NDguNTEyZDEwMjRkNjQuNTEyZDEwMjRkMTI4ZDk1OS40ODhkMzg0ZDk1OS40ODhkMzg0ZDMxOS40ODdkMTI4ZDMxOS40ODdkMTI4ZDk1OS40ODhoUjJkNTEyUjNkNDQ4LjUxMlI0ZDY0LjUxMlI1ZDc2OFI2ZDBSN2Q3MDMuNDg4UjhkMFI5ZDI1NlIxMGkyNDBSMTFkNjQuNTEyUjEyZDUxMlIxM2FpMWkyaTJpMmkyaTFpMmkyaTJpMmhnOjEyN29SMGQ3NjhSMWFkNjQuNTEyZDEwMjRkNjQuNTEyZDI1NmQ0NDguNTEyZDI1NmQ0NDguNTEyZDEwMjRkNjQuNTEyZDEwMjRkMTI4ZDk1OS40ODhkMzg0ZDk1OS40ODhkMzg0ZDMxOS40ODdkMTI4ZDMxOS40ODdkMTI4ZDk1OS40ODhoUjJkNTEyUjNkNDQ4LjUxMlI0ZDY0LjUxMlI1ZDc2OFI2ZDBSN2Q3MDMuNDg4UjhkMFI5ZDI1NlIxMGkxMjdSMTFkNjQuNTEyUjEyZDUxMlIxM2FpMWkyaTJpMmkyaTFpMmkyaTJpMmhnOjIzOW9SMGQ3NjhSMWFkNjQuNTEyZDEwMjRkNjQuNTEyZDI1NmQ0NDguNTEyZDI1NmQ0NDguNTEyZDEwMjRkNjQuNTEyZDEwMjRkMTI4ZDk1OS40ODhkMzg0ZDk1OS40ODhkMzg0ZDMxOS40ODdkMTI4ZDMxOS40ODdkMTI4ZDk1OS40ODhoUjJkNTEyUjNkNDQ4LjUxMlI0ZDY0LjUxMlI1ZDc2OFI2ZDBSN2Q3MDMuNDg4UjhkMFI5ZDI1NlIxMGkyMzlSMTFkNjQuNTEyUjEyZDUxMlIxM2FpMWkyaTJpMmkyaTFpMmkyaTJpMmhnOjEyNm9SMGQ3NjhSMWFkMTI4ZDM4NGQxMjhkNTEyZDI1NmQ1MTJkMjU2ZDM4NGQxMjhkMzg0ZDBkNjQwZDEyOGQ2NDBkMTI4ZDUxMmQwZDUxMmQwZDY0MGQzODRkNTEyZDUxMmQ1MTJkNTEyZDM4NGQzODRkMzg0ZDM4NGQ1MTJkMjU2ZDY0MGQzODRkNjQwZDM4NGQ1MTJkMjU2ZDUxMmQyNTZkNjQwaFIyZDY0MFIzZDUxMlI0ZDBSNWQ2NDBSNmQzODRSN2Q2NDBSOGQwUjlkMjU2UjEwaTEyNlIxMWQwUjEyZDY0MFIxM2FpMWkyaTJpMmkyaTFpMmkyaTJpMmkxaTJpMmkyaTJpMWkyaTJpMmkyaGc6MjM4b1IwZDc2OFIxYWQ2NC41MTJkMTAyNGQ2NC41MTJkMjU2ZDQ0OC41MTJkMjU2ZDQ0OC41MTJkMTAyNGQ2NC41MTJkMTAyNGQxMjhkOTU5LjQ4OGQzODRkOTU5LjQ4OGQzODRkMzE5LjQ4N2QxMjhkMzE5LjQ4N2QxMjhkOTU5LjQ4OGhSMmQ1MTJSM2Q0NDguNTEyUjRkNjQuNTEyUjVkNzY4UjZkMFI3ZDcwMy40ODhSOGQwUjlkMjU2UjEwaTIzOFIxMWQ2NC41MTJSMTJkNTEyUjEzYWkxaTJpMmkyaTJpMWkyaTJpMmkyaGc6MTI1b1IwZDc2OFIxYWQyNTZkMzg0ZDBkMzg0ZDBkNTEyZDEyOGQ1MTJkMTI4ZDY0MGQyNTZkNjQwZDI1NmQzODRkMTI4ZDg5NmQwZDg5NmQwZDEwMjRkMjU2ZDEwMjRkMjU2ZDc2OGQxMjhkNzY4ZDEyOGQ4OTZkMjU2ZDc2OGQzODRkNzY4ZDM4NGQ2NDBkMjU2ZDY0MGQyNTZkNzY4aFIyZDUxMlIzZDM4NFI0ZDBSNWQ2NDBSNmQwUjdkNjQwUjhkMFI5ZDI1NlIxMGkxMjVSMTFkMFIxMmQ1MTJSMTNhaTFpMmkyaTJpMmkyaTJpMWkyaTJpMmkyaTJpMmkxaTJpMmkyaTJoZzoyMzdvUjBkNzY4UjFhZDY0LjUxMmQxMDI0ZDY0LjUxMmQyNTZkNDQ4LjUxMmQyNTZkNDQ4LjUxMmQxMDI0ZDY0LjUxMmQxMDI0ZDEyOGQ5NTkuNDg4ZDM4NGQ5NTkuNDg4ZDM4NGQzMTkuNDg3ZDEyOGQzMTkuNDg3ZDEyOGQ5NTkuNDg4aFIyZDUxMlIzZDQ0OC41MTJSNGQ2NC41MTJSNWQ3NjhSNmQwUjdkNzAzLjQ4OFI4ZDBSOWQyNTZSMTBpMjM3UjExZDY0LjUxMlIxMmQ1MTJSMTNhaTFpMmkyaTJpMmkxaTJpMmkyaTJoZzoxMjRvUjBkNzY4UjFhZDBkMTAyNGQxMjhkMTAyNGQxMjhkMzg0ZDBkMzg0ZDBkMTAyNGhSMmQyNTZSM2QxMjhSNGQwUjVkNjQwUjZkMFI3ZDY0MFI4ZDBSOWQyNTZSMTBpMTI0UjExZDBSMTJkMjU2UjEzYWkxaTJpMmkyaTJoZzoyMzZvUjBkNzY4UjFhZDY0LjUxMmQxMDI0ZDY0LjUxMmQyNTZkNDQ4LjUxMmQyNTZkNDQ4LjUxMmQxMDI0ZDY0LjUxMmQxMDI0ZDEyOGQ5NTkuNDg4ZDM4NGQ5NTkuNDg4ZDM4NGQzMTkuNDg3ZDEyOGQzMTkuNDg3ZDEyOGQ5NTkuNDg4aFIyZDUxMlIzZDQ0OC41MTJSNGQ2NC41MTJSNWQ3NjhSNmQwUjdkNzAzLjQ4OFI4ZDBSOWQyNTZSMTBpMjM2UjExZDY0LjUxMlIxMmQ1MTJSMTNhaTFpMmkyaTJpMmkxaTJpMmkyaTJoZzoxMjNvUjBkNzY4UjFhZDEyOGQzODRkMTI4ZDY0MGQyNTZkNjQwZDI1NmQ1MTJkMzg0ZDUxMmQzODRkMzg0ZDEyOGQzODRkMGQ3NjhkMTI4ZDc2OGQxMjhkNjQwZDBkNjQwZDBkNzY4ZDEyOGQxMDI0ZDM4NGQxMDI0ZDM4NGQ4OTZkMjU2ZDg5NmQyNTZkNzY4ZDEyOGQ3NjhkMTI4ZDEwMjRoUjJkNTEyUjNkMzg0UjRkMFI1ZDY0MFI2ZDBSN2Q2NDBSOGQwUjlkMjU2UjEwaTEyM1IxMWQwUjEyZDUxMlIxM2FpMWkyaTJpMmkyaTJpMmkxaTJpMmkyaTJpMWkyaTJpMmkyaTJpMmhnOjIzNW9SMGQ3NjhSMWFkNjQuNTEyZDEwMjRkNjQuNTEyZDI1NmQ0NDguNTEyZDI1NmQ0NDguNTEyZDEwMjRkNjQuNTEyZDEwMjRkMTI4ZDk1OS40ODhkMzg0ZDk1OS40ODhkMzg0ZDMxOS40ODdkMTI4ZDMxOS40ODdkMTI4ZDk1OS40ODhoUjJkNTEyUjNkNDQ4LjUxMlI0ZDY0LjUxMlI1ZDc2OFI2ZDBSN2Q3MDMuNDg4UjhkMFI5ZDI1NlIxMGkyMzVSMTFkNjQuNTEyUjEyZDUxMlIxM2FpMWkyaTJpMmkyaTFpMmkyaTJpMmhnOjEyMm9SMGQ3NjhSMWFkMGQ1MTJkMGQ2NDBkMjU2ZDY0MGQyNTZkNzY4ZDM4NGQ3NjhkMzg0ZDY0MGQ1MTJkNjQwZDUxMmQ1MTJkMGQ1MTJkMTI4ZDg5NmQwZDg5NmQwZDEwMjRkNTEyZDEwMjRkNTEyZDg5NmQyNTZkODk2ZDI1NmQ3NjhkMTI4ZDc2OGQxMjhkODk2aFIyZDY0MFIzZDUxMlI0ZDBSNWQ1MTJSNmQwUjdkNTEyUjhkMFI5ZDI1NlIxMGkxMjJSMTFkMFIxMmQ2NDBSMTNhaTFpMmkyaTJpMmkyaTJpMmkyaTFpMmkyaTJpMmkyaTJpMmkyaGc6MjM0b1IwZDc2OFIxYWQ2NC41MTJkMTAyNGQ2NC41MTJkMjU2ZDQ0OC41MTJkMjU2ZDQ0OC41MTJkMTAyNGQ2NC41MTJkMTAyNGQxMjhkOTU5LjQ4OGQzODRkOTU5LjQ4OGQzODRkMzE5LjQ4N2QxMjhkMzE5LjQ4N2QxMjhkOTU5LjQ4OGhSMmQ1MTJSM2Q0NDguNTEyUjRkNjQuNTEyUjVkNzY4UjZkMFI3ZDcwMy40ODhSOGQwUjlkMjU2UjEwaTIzNFIxMWQ2NC41MTJSMTJkNTEyUjEzYWkxaTJpMmkyaTJpMWkyaTJpMmkyaGc6MTIxb1IwZDc2OFIxYWQxMjhkNTEyZDBkNTEyZDBkODk2ZDEyOGQ4OTZkMTI4ZDUxMmQzODRkMTAyNGQzODRkMTE1MmQ1MTJkMTE1MmQ1MTJkNTEyZDM4NGQ1MTJkMzg0ZDg5NmQxMjhkODk2ZDEyOGQxMDI0ZDM4NGQxMDI0ZDEyOGQxMTUyZDEyOGQxMjgwZDM4NGQxMjgwZDM4NGQxMTUyZDEyOGQxMTUyaFIyZDY0MFIzZDUxMlI0ZDBSNWQ1MTJSNmQtMjU2UjdkNTEyUjhkMFI5ZDI1NlIxMGkxMjFSMTFkMFIxMmQ2NDBSMTNhaTFpMmkyaTJpMmkxaTJpMmkyaTJpMmkyaTJpMmkxaTJpMmkyaTJoZzoyMzNvUjBkNzY4UjFhZDY0LjUxMmQxMDI0ZDY0LjUxMmQyNTZkNDQ4LjUxMmQyNTZkNDQ4LjUxMmQxMDI0ZDY0LjUxMmQxMDI0ZDEyOGQ5NTkuNDg4ZDM4NGQ5NTkuNDg4ZDM4NGQzMTkuNDg3ZDEyOGQzMTkuNDg3ZDEyOGQ5NTkuNDg4aFIyZDUxMlIzZDQ0OC41MTJSNGQ2NC41MTJSNWQ3NjhSNmQwUjdkNzAzLjQ4OFI4ZDBSOWQyNTZSMTBpMjMzUjExZDY0LjUxMlIxMmQ1MTJSMTNhaTFpMmkyaTJpMmkxaTJpMmkyaTJoZzoxMjBvUjBkNzY4UjFhZDBkNTEyZDBkNjQwZDEyOGQ2NDBkMTI4ZDUxMmQwZDUxMmQzODRkNTEyZDI1NmQ1MTJkMjU2ZDY0MGQzODRkNjQwZDM4NGQ1MTJkMjU2ZDY0MGQxMjhkNjQwZDEyOGQ4OTZkMjU2ZDg5NmQyNTZkNjQwZDEyOGQ4OTZkMGQ4OTZkMGQxMDI0ZDEyOGQxMDI0ZDEyOGQ4OTZkMzg0ZDEwMjRkMzg0ZDg5NmQyNTZkODk2ZDI1NmQxMDI0ZDM4NGQxMDI0aFIyZDUxMlIzZDM4NFI0ZDBSNWQ1MTJSNmQwUjdkNTEyUjhkMFI5ZDI1NlIxMGkxMjBSMTFkMFIxMmQ1MTJSMTNhaTFpMmkyaTJpMmkxaTJpMmkyaTJpMWkyaTJpMmkyaTFpMmkyaTJpMmkxaTJpMmkyaTJoZzoyMzJvUjBkNzY4UjFhZDY0LjUxMmQxMDI0ZDY0LjUxMmQyNTZkNDQ4LjUxMmQyNTZkNDQ4LjUxMmQxMDI0ZDY0LjUxMmQxMDI0ZDEyOGQ5NTkuNDg4ZDM4NGQ5NTkuNDg4ZDM4NGQzMTkuNDg3ZDEyOGQzMTkuNDg3ZDEyOGQ5NTkuNDg4aFIyZDUxMlIzZDQ0OC41MTJSNGQ2NC41MTJSNWQ3NjhSNmQwUjdkNzAzLjQ4OFI4ZDBSOWQyNTZSMTBpMjMyUjExZDY0LjUxMlIxMmQ1MTJSMTNhaTFpMmkyaTJpMmkxaTJpMmkyaTJoZzoxMTlvUjBkNzY4UjFhZDEyOGQ1MTJkMGQ1MTJkMGQ3NjhkMTI4ZDc2OGQxMjhkNTEyZDUxMmQ3NjhkNjQwZDc2OGQ2NDBkNTEyZDUxMmQ1MTJkNTEyZDc2OGQzODRkNTEyZDI1NmQ1MTJkMjU2ZDc2OGQzODRkNzY4ZDM4NGQ1MTJkMTI4ZDEwMjRkMjU2ZDEwMjRkMjU2ZDc2OGQxMjhkNzY4ZDEyOGQxMDI0ZDM4NGQxMDI0ZDUxMmQxMDI0ZDUxMmQ3NjhkMzg0ZDc2OGQzODRkMTAyNGhSMmQ3NjhSM2Q2NDBSNGQwUjVkNTEyUjZkMFI3ZDUxMlI4ZDBSOWQyNTZSMTBpMTE5UjExZDBSMTJkNzY4UjEzYWkxaTJpMmkyaTJpMWkyaTJpMmkyaTFpMmkyaTJpMmkxaTJpMmkyaTJpMWkyaTJpMmkyaGc6MjMxb1IwZDc2OFIxYWQ2NC41MTJkMTAyNGQ2NC41MTJkMjU2ZDQ0OC41MTJkMjU2ZDQ0OC41MTJkMTAyNGQ2NC41MTJkMTAyNGQxMjhkOTU5LjQ4OGQzODRkOTU5LjQ4OGQzODRkMzE5LjQ4N2QxMjhkMzE5LjQ4N2QxMjhkOTU5LjQ4OGhSMmQ1MTJSM2Q0NDguNTEyUjRkNjQuNTEyUjVkNzY4UjZkMFI3ZDcwMy40ODhSOGQwUjlkMjU2UjEwaTIzMVIxMWQ2NC41MTJSMTJkNTEyUjEzYWkxaTJpMmkyaTJpMWkyaTJpMmkyaGc6MTE4b1IwZDc2OFIxYWQzODRkNzY4ZDUxMmQ3NjhkNTEyZDUxMmQzODRkNTEyZDM4NGQ3NjhkMTI4ZDc2OGQxMjhkNTEyZDBkNTEyZDBkODk2ZDEyOGQ4OTZkMTI4ZDc2OGQxMjhkNzY4ZDI1NmQ4OTZkMzg0ZDg5NmQzODRkNzY4ZDI1NmQ3NjhkMjU2ZDg5NmQxMjhkMTAyNGQyNTZkMTAyNGQyNTZkODk2ZDEyOGQ4OTZkMTI4ZDEwMjRoUjJkNjQwUjNkNTEyUjRkMFI1ZDUxMlI2ZDBSN2Q1MTJSOGQwUjlkMjU2UjEwaTExOFIxMWQwUjEyZDY0MFIxM2FpMWkyaTJpMmkyaTFpMmkyaTJpMmkyaTJpMWkyaTJpMmkyaTFpMmkyaTJpMmhnOjIzMG9SMGQ3NjhSMWFkNjQuNTEyZDEwMjRkNjQuNTEyZDI1NmQ0NDguNTEyZDI1NmQ0NDguNTEyZDEwMjRkNjQuNTEyZDEwMjRkMTI4ZDk1OS40ODhkMzg0ZDk1OS40ODhkMzg0ZDMxOS40ODdkMTI4ZDMxOS40ODdkMTI4ZDk1OS40ODhoUjJkNTEyUjNkNDQ4LjUxMlI0ZDY0LjUxMlI1ZDc2OFI2ZDBSN2Q3MDMuNDg4UjhkMFI5ZDI1NlIxMGkyMzBSMTFkNjQuNTEyUjEyZDUxMlIxM2FpMWkyaTJpMmkyaTFpMmkyaTJpMmhnOjExN29SMGQ3NjhSMWFkMzg0ZDg5NmQxMjhkODk2ZDEyOGQxMDI0ZDUxMmQxMDI0ZDUxMmQ1MTJkMzg0ZDUxMmQzODRkODk2ZDEyOGQ1MTJkMGQ1MTJkMGQ4OTZkMTI4ZDg5NmQxMjhkNTEyaFIyZDY0MFIzZDUxMlI0ZDBSNWQ1MTJSNmQwUjdkNTEyUjhkMFI5ZDI1NlIxMGkxMTdSMTFkMFIxMmQ2NDBSMTNhaTFpMmkyaTJpMmkyaTJpMWkyaTJpMmkyaGc6MjI5b1IwZDc2OFIxYWQ2NC41MTJkMTAyNGQ2NC41MTJkMjU2ZDQ0OC41MTJkMjU2ZDQ0OC41MTJkMTAyNGQ2NC41MTJkMTAyNGQxMjhkOTU5LjQ4OGQzODRkOTU5LjQ4OGQzODRkMzE5LjQ4N2QxMjhkMzE5LjQ4N2QxMjhkOTU5LjQ4OGhSMmQ1MTJSM2Q0NDguNTEyUjRkNjQuNTEyUjVkNzY4UjZkMFI3ZDcwMy40ODhSOGQwUjlkMjU2UjEwaTIyOVIxMWQ2NC41MTJSMTJkNTEyUjEzYWkxaTJpMmkyaTJpMWkyaTJpMmkyaGc6MTE2b1IwZDc2OFIxYWQyNTZkMzg0ZDEyOGQzODRkMTI4ZDUxMmQwZDUxMmQwZDY0MGQxMjhkNjQwZDEyOGQ4OTZkMjU2ZDg5NmQyNTZkNjQwZDM4NGQ2NDBkMzg0ZDUxMmQyNTZkNTEyZDI1NmQzODRkMzg0ZDEwMjRkMzg0ZDg5NmQyNTZkODk2ZDI1NmQxMDI0ZDM4NGQxMDI0aFIyZDUxMlIzZDM4NFI0ZDBSNWQ2NDBSNmQwUjdkNjQwUjhkMFI5ZDI1NlIxMGkxMTZSMTFkMFIxMmQ1MTJSMTNhaTFpMmkyaTJpMmkyaTJpMmkyaTJpMmkyaTJpMWkyaTJpMmkyaGc6MjI4b1IwZDc2OFIxYWQ2NC41MTJkMTAyNGQ2NC41MTJkMjU2ZDQ0OC41MTJkMjU2ZDQ0OC41MTJkMTAyNGQ2NC41MTJkMTAyNGQxMjhkOTU5LjQ4OGQzODRkOTU5LjQ4OGQzODRkMzE5LjQ4N2QxMjhkMzE5LjQ4N2QxMjhkOTU5LjQ4OGhSMmQ1MTJSM2Q0NDguNTEyUjRkNjQuNTEyUjVkNzY4UjZkMFI3ZDcwMy40ODhSOGQwUjlkMjU2UjEwaTIyOFIxMWQ2NC41MTJSMTJkNTEyUjEzYWkxaTJpMmkyaTJpMWkyaTJpMmkyaGc6MTE1b1IwZDc2OFIxYWQxMjhkNTEyZDEyOGQ2NDBkMGQ2NDBkMGQ3NjhkMjU2ZDc2OGQyNTZkNjQwZDUxMmQ2NDBkNTEyZDUxMmQxMjhkNTEyZDBkODk2ZDBkMTAyNGQzODRkMTAyNGQzODRkODk2ZDUxMmQ4OTZkNTEyZDc2OGQyNTZkNzY4ZDI1NmQ4OTZkMGQ4OTZoUjJkNjQwUjNkNTEyUjRkMFI1ZDUxMlI2ZDBSN2Q1MTJSOGQwUjlkMjU2UjEwaTExNVIxMWQwUjEyZDY0MFIxM2FpMWkyaTJpMmkyaTJpMmkyaTJpMWkyaTJpMmkyaTJpMmkyaTJoZzoyMjdvUjBkNzY4UjFhZDY0LjUxMmQxMDI0ZDY0LjUxMmQyNTZkNDQ4LjUxMmQyNTZkNDQ4LjUxMmQxMDI0ZDY0LjUxMmQxMDI0ZDEyOGQ5NTkuNDg4ZDM4NGQ5NTkuNDg4ZDM4NGQzMTkuNDg3ZDEyOGQzMTkuNDg3ZDEyOGQ5NTkuNDg4aFIyZDUxMlIzZDQ0OC41MTJSNGQ2NC41MTJSNWQ3NjhSNmQwUjdkNzAzLjQ4OFI4ZDBSOWQyNTZSMTBpMjI3UjExZDY0LjUxMlIxMmQ1MTJSMTNhaTFpMmkyaTJpMmkxaTJpMmkyaTJoZzoxMTRvUjBkNzY4UjFhZDM4NGQ1MTJkMjU2ZDUxMmQyNTZkNjQwZDM4NGQ2NDBkMzg0ZDUxMmQxMjhkNzY4ZDI1NmQ3NjhkMjU2ZDY0MGQxMjhkNjQwZDEyOGQ1MTJkMGQ1MTJkMGQxMDI0ZDEyOGQxMDI0ZDEyOGQ3NjhoUjJkNTEyUjNkMzg0UjRkMFI1ZDUxMlI2ZDBSN2Q1MTJSOGQwUjlkMjU2UjEwaTExNFIxMWQwUjEyZDUxMlIxM2FpMWkyaTJpMmkyaTFpMmkyaTJpMmkyaTJpMmkyaGc6MjI2b1IwZDc2OFIxYWQ2NC41MTJkMTAyNGQ2NC41MTJkMjU2ZDQ0OC41MTJkMjU2ZDQ0OC41MTJkMTAyNGQ2NC41MTJkMTAyNGQxMjhkOTU5LjQ4OGQzODRkOTU5LjQ4OGQzODRkMzE5LjQ4N2QxMjhkMzE5LjQ4N2QxMjhkOTU5LjQ4OGhSMmQ1MTJSM2Q0NDguNTEyUjRkNjQuNTEyUjVkNzY4UjZkMFI3ZDcwMy40ODhSOGQwUjlkMjU2UjEwaTIyNlIxMWQ2NC41MTJSMTJkNTEyUjEzYWkxaTJpMmkyaTJpMWkyaTJpMmkyaGc6MTEzb1IwZDc2OFIxYWQxMjhkODk0Ljk3NmQzODRkODk0Ljk3NmQzODRkNjQxLjAyNGQxMjhkNjQxLjAyNGQxMjhkODk0Ljk3NmQxMjhkNjQwZDEyOGQ1MTJkNTEyZDUxMmQ1MTJkMTI4MGQzODRkMTI4MGQzODRkMTAyNGQxMjhkMTAyNGQxMjhkODk2ZDBkODk2ZDBkNjQwZDEyOGQ2NDBoUjJkNjQwUjNkNTEyUjRkMFI1ZDUxMlI2ZC0yNTZSN2Q1MTJSOGQwUjlkMjU2UjEwaTExM1IxMWQwUjEyZDY0MFIxM2FpMWkyaTJpMmkyaTFpMmkyaTJpMmkyaTJpMmkyaTJpMmhnOjIyNW9SMGQ3NjhSMWFkNjQuNTEyZDEwMjRkNjQuNTEyZDI1NmQ0NDguNTEyZDI1NmQ0NDguNTEyZDEwMjRkNjQuNTEyZDEwMjRkMTI4ZDk1OS40ODhkMzg0ZDk1OS40ODhkMzg0ZDMxOS40ODdkMTI4ZDMxOS40ODdkMTI4ZDk1OS40ODhoUjJkNTEyUjNkNDQ4LjUxMlI0ZDY0LjUxMlI1ZDc2OFI2ZDBSN2Q3MDMuNDg4UjhkMFI5ZDI1NlIxMGkyMjVSMTFkNjQuNTEyUjEyZDUxMlIxM2FpMWkyaTJpMmkyaTFpMmkyaTJpMmhnOjExMm9SMGQ3NjhSMWFkMzg0ZDY0MGQ1MTJkNjQwZDUxMmQ4OTZkMzg0ZDg5NmQzODRkMTAyNGQxMjhkMTAyNGQxMjhkMTI4MGQwZDEyODBkMGQ1MTJkMzg0ZDUxMmQzODRkNjQwZDEyOGQ4OTQuOTc2ZDM4NGQ4OTQuOTc2ZDM4NGQ2NDEuMDI0ZDEyOGQ2NDEuMDI0ZDEyOGQ4OTQuOTc2aFIyZDY0MFIzZDUxMlI0ZDBSNWQ1MTJSNmQtMjU2UjdkNTEyUjhkMFI5ZDI1NlIxMGkxMTJSMTFkMFIxMmQ2NDBSMTNhaTFpMmkyaTJpMmkyaTJpMmkyaTJpMmkxaTJpMmkyaTJoZzoyMjRvUjBkNzY4UjFhZDY0LjUxMmQxMDI0ZDY0LjUxMmQyNTZkNDQ4LjUxMmQyNTZkNDQ4LjUxMmQxMDI0ZDY0LjUxMmQxMDI0ZDEyOGQ5NTkuNDg4ZDM4NGQ5NTkuNDg4ZDM4NGQzMTkuNDg3ZDEyOGQzMTkuNDg3ZDEyOGQ5NTkuNDg4aFIyZDUxMlIzZDQ0OC41MTJSNGQ2NC41MTJSNWQ3NjhSNmQwUjdkNzAzLjQ4OFI4ZDBSOWQyNTZSMTBpMjI0UjExZDY0LjUxMlIxMmQ1MTJSMTNhaTFpMmkyaTJpMmkxaTJpMmkyaTJoZ2g"}];
if(typeof document != "undefined") js.Lib.document = document;
if(typeof window != "undefined") {
	js.Lib.window = window;
	js.Lib.window.onerror = function(msg,url,line) {
		var f = js.Lib.onerror;
		if(f == null) return false;
		return f(msg,[url + ":" + line]);
	};
}
browser.text.Font.DEFAULT_FONT_DATA = "q:55oy6:ascentd950.5y4:dataad84d277.5d564d277.5d564d320.5d293d1024d187.5d1024d442.5d362.5d84d362.5d84d277.5hy6:_widthd651.5y4:xMaxd564y4:xMind84y4:yMaxd746.5y4:yMind0y7:_heightd662.5y7:leadingd168y7:descentd241.5y8:charCodei55y15:leftsideBearingd84y12:advanceWidthd651.5y8:commandsai1i2i2i2i2i2i2i2hg:111oR0d950.5R1ad313.5d528.5d239.5d528.5d196.5d586.25d153.5d644d153.5d744.5d153.5d845d196.25d902.75d239d960.5d313.5d960.5d387d960.5d430d902.5d473d844.5d473d744.5d473d645d430d586.75d387d528.5d313.5d528.5d313.5d450.5d433.5d450.5d502d528.5d570.5d606.5d570.5d744.5d570.5d882d502d960.25d433.5d1038.5d313.5d1038.5d193d1038.5d124.75d960.25d56.5d882d56.5d744.5d56.5d606.5d124.75d528.5d193d450.5d313.5d450.5hR2d626.5R3d570.5R4d56.5R5d573.5R6d-14.5R7d517R8d168R9d241.5R10i111R11d56.5R12d626.5R13ai1i3i3i3i3i3i3i3i3i1i3i3i3i3i3i3i3i3hg:54oR0d950.5R1ad338d610.5d270d610.5d230.25d657d190.5d703.5d190.5d784.5d190.5d865d230.25d911.75d270d958.5d338d958.5d406d958.5d445.75d911.75d485.5d865d485.5d784.5d485.5d703.5d445.75d657d406d610.5d338d610.5d538.5d294d538.5d386d500.5d368d461.75d358.5d423d349d385d349d285d349d232.25d416.5d179.5d484d172d620.5d201.5d577d246d553.75d290.5d530.5d344d530.5d456.5d530.5d521.75d598.75d587d667d587d784.5d587d899.5d519d969d451d1038.5d338d1038.5d208.5d1038.5d140d939.25d71.5d840d71.5d651.5d71.5d474.5d155.5d369.25d239.5d264d381d264d419d264d457.75d271.5d496.5d279d538.5d294hR2d651.5R3d587R4d71.5R5d760R6d-14.5R7d688.5R8d168R9d241.5R10i54R11d71.5R12d651.5R13ai1i3i3i3i3i3i3i3i3i1i2i3i3i3i3i3i3i3i3i3i3i3i3i3i3i3i3hg:110oR0d950.5R1ad562d686d562d1024d470d1024d470d689d470d609.5d439d570d408d530.5d346d530.5d271.5d530.5d228.5d578d185.5d625.5d185.5d707.5d185.5d1024d93d1024d93d464d185.5d464d185.5d551d218.5d500.5d263.25d475.5d308d450.5d366.5d450.5d463d450.5d512.5d510.25d562d570d562d686hR2d649R3d562R4d93R5d573.5R6d0R7d480.5R8d168R9d241.5R10i110R11d93R12d649R13ai1i2i2i2i3i3i3i3i2i2i2i2i2i3i3i3i3hg:53oR0d950.5R1ad110.5d277.5d507d277.5d507d362.5d203d362.5d203d545.5d225d538d247d534.25d269d530.5d291d530.5d416d530.5d489d599d562d667.5d562d784.5d562d905d487d971.75d412d1038.5d275.5d1038.5d228.5d1038.5d179.75d1030.5d131d1022.5d79d1006.5d79d905d124d929.5d172d941.5d220d953.5d273.5d953.5d360d953.5d410.5d908d461d862.5d461d784.5d461d706.5d410.5d661d360d615.5d273.5d615.5d233d615.5d192.75d624.5d152.5d633.5d110.5d652.5d110.5d277.5hR2d651.5R3d562R4d79R5d746.5R6d-14.5R7d667.5R8d168R9d241.5R10i53R11d79R12d651.5R13ai1i2i2i2i2i3i3i3i3i3i3i3i3i2i3i3i3i3i3i3i3i3i2hg:109oR0d950.5R1ad532.5d571.5d567d509.5d615d480d663d450.5d728d450.5d815.5d450.5d863d511.75d910.5d573d910.5d686d910.5d1024d818d1024d818d689d818d608.5d789.5d569.5d761d530.5d702.5d530.5d631d530.5d589.5d578d548d625.5d548d707.5d548d1024d455.5d1024d455.5d689d455.5d608d427d569.25d398.5d530.5d339d530.5d268.5d530.5d227d578.25d185.5d626d185.5d707.5d185.5d1024d93d1024d93d464d185.5d464d185.5d551d217d499.5d261d475d305d450.5d365.5d450.5d426.5d450.5d469.25d481.5d512d512.5d532.5d571.5hR2d997.5R3d910.5R4d93R5d573.5R6d0R7d480.5R8d168R9d241.5R10i109R11d93R12d997.5R13ai1i3i3i3i3i2i2i2i3i3i3i3i2i2i2i3i3i3i3i2i2i2i2i2i3i3i3i3hg:52oR0d950.5R1ad387d365.5d132d764d387d764d387d365.5d360.5d277.5d487.5d277.5d487.5d764d594d764d594d848d487.5d848d487.5d1024d387d1024d387d848d50d848d50d750.5d360.5d277.5hR2d651.5R3d594R4d50R5d746.5R6d0R7d696.5R8d168R9d241.5R10i52R11d50R12d651.5R13ai1i2i2i2i1i2i2i2i2i2i2i2i2i2i2i2hg:108oR0d950.5R1ad96.5d246d188.5d246d188.5d1024d96.5d1024d96.5d246hR2d284.5R3d188.5R4d96.5R5d778R6d0R7d681.5R8d168R9d241.5R10i108R11d96.5R12d284.5R13ai1i2i2i2i2hg:51oR0d950.5R1ad415.5d621.5d488d637d528.75d686d569.5d735d569.5d807d569.5d917.5d493.5d978d417.5d1038.5d277.5d1038.5d230.5d1038.5d180.75d1029.25d131d1020d78d1001.5d78d904d120d928.5d170d941d220d953.5d274.5d953.5d369.5d953.5d419.25d916d469d878.5d469d807d469d741d422.75d703.75d376.5d666.5d294d666.5d207d666.5d207d583.5d298d583.5d372.5d583.5d412d553.75d451.5d524d451.5d468d451.5d410.5d410.75d379.75d370d349d294d349d252.5d349d205d358d157.5d367d100.5d386d100.5d296d158d280d208.25d272d258.5d264d303d264d418d264d485d316.25d552d368.5d552d457.5d552d519.5d516.5d562.25d481d605d415.5d621.5hR2d651.5R3d569.5R4d78R5d760R6d-14.5R7d682R8d168R9d241.5R10i51R11d78R12d651.5R13ai1i3i3i3i3i3i3i2i3i3i3i3i3i3i2i2i2i3i3i3i3i3i3i2i3i3i3i3i3i3hg:107oR0d950.5R1ad93d246d185.5d246d185.5d705.5d460d464d577.5d464d280.5d726d590d1024d470d1024d185.5d750.5d185.5d1024d93d1024d93d246hR2d593R3d590R4d93R5d778R6d0R7d685R8d168R9d241.5R10i107R11d93R12d593R13ai1i2i2i2i2i2i2i2i2i2i2i2hg:50oR0d950.5R1ad196.5d939d549d939d549d1024d75d1024d75d939d132.5d879.5d231.75d779.25d331d679d356.5d650d405d595.5d424.25d557.75d443.5d520d443.5d483.5d443.5d424d401.75d386.5d360d349d293d349d245.5d349d192.75d365.5d140d382d80d415.5d80d313.5d141d289d194d276.5d247d264d291d264d407d264d476d322d545d380d545d477d545d523d527.75d564.25d510.5d605.5d465d661.5d452.5d676d385.5d745.25d318.5d814.5d196.5d939hR2d651.5R3d549R4d75R5d760R6d0R7d685R8d168R9d241.5R10i50R11d75R12d651.5R13ai1i2i2i2i2i3i3i3i3i3i3i3i3i2i3i3i3i3i3i3i3i3hg:106oR0d950.5R1ad96.5d464d188.5d464d188.5d1034d188.5d1141d147.75d1189d107d1237d16.5d1237d-18.5d1237d-18.5d1159d6d1159d58.5d1159d77.5d1134.75d96.5d1110.5d96.5d1034d96.5d464d96.5d246d188.5d246d188.5d362.5d96.5d362.5d96.5d246hR2d284.5R3d188.5R4d-18.5R5d778R6d-213R7d796.5R8d168R9d241.5R10i106R11d-18.5R12d284.5R13ai1i2i2i3i3i2i2i2i3i3i2i1i2i2i2i2hg:49oR0d950.5R1ad127d939d292d939d292d369.5d112.5d405.5d112.5d313.5d291d277.5d392d277.5d392d939d557d939d557d1024d127d1024d127d939hR2d651.5R3d557R4d112.5R5d746.5R6d0R7d634R8d168R9d241.5R10i49R11d112.5R12d651.5R13ai1i2i2i2i2i2i2i2i2i2i2i2hg:105oR0d950.5R1ad96.5d464d188.5d464d188.5d1024d96.5d1024d96.5d464d96.5d246d188.5d246d188.5d362.5d96.5d362.5d96.5d246hR2d284.5R3d188.5R4d96.5R5d778R6d0R7d681.5R8d168R9d241.5R10i105R11d96.5R12d284.5R13ai1i2i2i2i2i1i2i2i2i2hg:48oR0d950.5R1ad325.5d344d247.5d344d208.25d420.75d169d497.5d169d651.5d169d805d208.25d881.75d247.5d958.5d325.5d958.5d404d958.5d443.25d881.75d482.5d805d482.5d651.5d482.5d497.5d443.25d420.75d404d344d325.5d344d325.5d264d451d264d517.25d363.25d583.5d462.5d583.5d651.5d583.5d840d517.25d939.25d451d1038.5d325.5d1038.5d200d1038.5d133.75d939.25d67.5d840d67.5d651.5d67.5d462.5d133.75d363.25d200d264d325.5d264hR2d651.5R3d583.5R4d67.5R5d760R6d-14.5R7d692.5R8d168R9d241.5R10i48R11d67.5R12d651.5R13ai1i3i3i3i3i3i3i3i3i1i3i3i3i3i3i3i3i3hg:104oR0d950.5R1ad562d686d562d1024d470d1024d470d689d470d609.5d439d570d408d530.5d346d530.5d271.5d530.5d228.5d578d185.5d625.5d185.5d707.5d185.5d1024d93d1024d93d246d185.5d246d185.5d551d218.5d500.5d263.25d475.5d308d450.5d366.5d450.5d463d450.5d512.5d510.25d562d570d562d686hR2d649R3d562R4d93R5d778R6d0R7d685R8d168R9d241.5R10i104R11d93R12d649R13ai1i2i2i2i3i3i3i3i2i2i2i2i2i3i3i3i3hg:47oR0d950.5R1ad260d277.5d345d277.5d85d1119d0d1119d260d277.5hR2d345R3d345R4d0R5d746.5R6d-95R7d746.5R8d168R9d241.5R10i47R11d0R12d345R13ai1i2i2i2i2hg:103oR0d950.5R1ad465d737.5d465d637.5d423.75d582.5d382.5d527.5d308d527.5d234d527.5d192.75d582.5d151.5d637.5d151.5d737.5d151.5d837d192.75d892d234d947d308d947d382.5d947d423.75d892d465d837d465d737.5d557d954.5d557d1097.5d493.5d1167.25d430d1237d299d1237d250.5d1237d207.5d1229.75d164.5d1222.5d124d1207.5d124d1118d164.5d1140d204d1150.5d243.5d1161d284.5d1161d375d1161d420d1113.75d465d1066.5d465d971d465d925.5d436.5d975d392d999.5d347.5d1024d285.5d1024d182.5d1024d119.5d945.5d56.5d867d56.5d737.5d56.5d607.5d119.5d529d182.5d450.5d285.5d450.5d347.5d450.5d392d475d436.5d499.5d465d549d465d464d557d464d557d954.5hR2d650R3d557R4d56.5R5d573.5R6d-213R7d517R8d168R9d241.5R10i103R11d56.5R12d650R13ai1i3i3i3i3i3i3i3i3i1i3i3i3i3i2i3i3i3i3i2i3i3i3i3i3i3i3i3i2i2i2hg:46oR0d950.5R1ad109.5d897d215d897d215d1024d109.5d1024d109.5d897hR2d325.5R3d215R4d109.5R5d127R6d0R7d17.5R8d168R9d241.5R10i46R11d109.5R12d325.5R13ai1i2i2i2i2hg:102oR0d950.5R1ad380d246d380d322.5d292d322.5d242.5d322.5d223.25d342.5d204d362.5d204d414.5d204d464d355.5d464d355.5d535.5d204d535.5d204d1024d111.5d1024d111.5d535.5d23.5d535.5d23.5d464d111.5d464d111.5d425d111.5d331.5d155d288.75d198.5d246d293d246d380d246hR2d360.5R3d380R4d23.5R5d778R6d0R7d754.5R8d168R9d241.5R10i102R11d23.5R12d360.5R13ai1i2i2i3i3i2i2i2i2i2i2i2i2i2i2i2i3i3i2hg:45oR0d950.5R1ad50d702.5d319.5d702.5d319.5d784.5d50d784.5d50d702.5hR2d369.5R3d319.5R4d50R5d321.5R6d239.5R7d271.5R8d168R9d241.5R10i45R11d50R12d369.5R13ai1i2i2i2i2hg:101oR0d950.5R1ad575.5d721d575.5d766d152.5d766d158.5d861d209.75d910.75d261d960.5d352.5d960.5d405.5d960.5d455.25d947.5d505d934.5d554d908.5d554d995.5d504.5d1016.5d452.5d1027.5d400.5d1038.5d347d1038.5d213d1038.5d134.75d960.5d56.5d882.5d56.5d749.5d56.5d612d130.75d531.25d205d450.5d331d450.5d444d450.5d509.75d523.25d575.5d596d575.5d721d483.5d694d482.5d618.5d441.25d573.5d400d528.5d332d528.5d255d528.5d208.75d572d162.5d615.5d155.5d694.5d483.5d694hR2d630R3d575.5R4d56.5R5d573.5R6d-14.5R7d517R8d168R9d241.5R10i101R11d56.5R12d630R13ai1i2i2i3i3i3i3i2i3i3i3i3i3i3i3i3i1i3i3i3i3i2hg:44oR0d950.5R1ad120d897d225.5d897d225.5d983d143.5d1143d79d1143d120d983d120d897hR2d325.5R3d225.5R4d79R5d127R6d-119R7d48R8d168R9d241.5R10i44R11d79R12d325.5R13ai1i2i2i2i2i2i2hg:100oR0d950.5R1ad465d549d465d246d557d246d557d1024d465d1024d465d940d436d990d391.75d1014.25d347.5d1038.5d285.5d1038.5d184d1038.5d120.25d957.5d56.5d876.5d56.5d744.5d56.5d612.5d120.25d531.5d184d450.5d285.5d450.5d347.5d450.5d391.75d474.75d436d499d465d549d151.5d744.5d151.5d846d193.25d903.75d235d961.5d308d961.5d381d961.5d423d903.75d465d846d465d744.5d465d643d423d585.25d381d527.5d308d527.5d235d527.5d193.25d585.25d151.5d643d151.5d744.5hR2d650R3d557R4d56.5R5d778R6d-14.5R7d721.5R8d168R9d241.5R10i100R11d56.5R12d650R13ai1i2i2i2i2i2i3i3i3i3i3i3i3i3i1i3i3i3i3i3i3i3i3hg:43oR0d950.5R1ad471d382d471d660.5d749.5d660.5d749.5d745.5d471d745.5d471d1024d387d1024d387d745.5d108.5d745.5d108.5d660.5d387d660.5d387d382d471d382hR2d858R3d749.5R4d108.5R5d642R6d0R7d533.5R8d168R9d241.5R10i43R11d108.5R12d858R13ai1i2i2i2i2i2i2i2i2i2i2i2i2hg:99oR0d950.5R1ad499.5d485.5d499.5d571.5d460.5d550d421.25d539.25d382d528.5d342d528.5d252.5d528.5d203d585.25d153.5d642d153.5d744.5d153.5d847d203d903.75d252.5d960.5d342d960.5d382d960.5d421.25d949.75d460.5d939d499.5d917.5d499.5d1002.5d461d1020.5d419.75d1029.5d378.5d1038.5d332d1038.5d205.5d1038.5d131d959d56.5d879.5d56.5d744.5d56.5d607.5d131.75d529d207d450.5d338d450.5d380.5d450.5d421d459.25d461.5d468d499.5d485.5hR2d563R3d499.5R4d56.5R5d573.5R6d-14.5R7d517R8d168R9d241.5R10i99R11d56.5R12d563R13ai1i2i3i3i3i3i3i3i3i3i2i3i3i3i3i3i3i3i3hg:42oR0d950.5R1ad481.5d400.5d302d497.5d481.5d595d452.5d644d284.5d542.5d284.5d731d227.5d731d227.5d542.5d59.5d644d30.5d595d210d497.5d30.5d400.5d59.5d351d227.5d452.5d227.5d264d284.5d264d284.5d452.5d452.5d351d481.5d400.5hR2d512R3d481.5R4d30.5R5d760R6d293R7d729.5R8d168R9d241.5R10i42R11d30.5R12d512R13ai1i2i2i2i2i2i2i2i2i2i2i2i2i2i2i2i2i2i2hg:98oR0d950.5R1ad498.5d744.5d498.5d643d456.75d585.25d415d527.5d342d527.5d269d527.5d227.25d585.25d185.5d643d185.5d744.5d185.5d846d227.25d903.75d269d961.5d342d961.5d415d961.5d456.75d903.75d498.5d846d498.5d744.5d185.5d549d214.5d499d258.75d474.75d303d450.5d364.5d450.5d466.5d450.5d530.25d531.5d594d612.5d594d744.5d594d876.5d530.25d957.5d466.5d1038.5d364.5d1038.5d303d1038.5d258.75d1014.25d214.5d990d185.5d940d185.5d1024d93d1024d93d246d185.5d246d185.5d549hR2d650R3d594R4d93R5d778R6d-14.5R7d685R8d168R9d241.5R10i98R11d93R12d650R13ai1i3i3i3i3i3i3i3i3i1i3i3i3i3i3i3i3i3i2i2i2i2i2hg:41oR0d950.5R1ad82d247d162d247d237d365d274.25d478d311.5d591d311.5d702.5d311.5d814.5d274.25d928d237d1041.5d162d1159d82d1159d148.5d1044.5d181.25d931.25d214d818d214d702.5d214d587d181.25d474.5d148.5d362d82d247hR2d399.5R3d311.5R4d82R5d777R6d-135R7d695R8d168R9d241.5R10i41R11d82R12d399.5R13ai1i2i3i3i3i3i2i3i3i3i3hg:97oR0d950.5R1ad351d742.5d239.5d742.5d196.5d768d153.5d793.5d153.5d855d153.5d904d185.75d932.75d218d961.5d273.5d961.5d350d961.5d396.25d907.25d442.5d853d442.5d763d442.5d742.5d351d742.5d534.5d704.5d534.5d1024d442.5d1024d442.5d939d411d990d364d1014.25d317d1038.5d249d1038.5d163d1038.5d112.25d990.25d61.5d942d61.5d861d61.5d766.5d124.75d718.5d188d670.5d313.5d670.5d442.5d670.5d442.5d661.5d442.5d598d400.75d563.25d359d528.5d283.5d528.5d235.5d528.5d190d540d144.5d551.5d102.5d574.5d102.5d489.5d153d470d200.5d460.25d248d450.5d293d450.5d414.5d450.5d474.5d513.5d534.5d576.5d534.5d704.5hR2d627.5R3d534.5R4d61.5R5d573.5R6d-14.5R7d512R8d168R9d241.5R10i97R11d61.5R12d627.5R13ai1i3i3i3i3i3i3i2i2i1i2i2i2i3i3i3i3i3i3i2i2i3i3i3i3i2i3i3i3i3hg:40oR0d950.5R1ad317.5d247d250.5d362d218d474.5d185.5d587d185.5d702.5d185.5d818d218.25d931.25d251d1044.5d317.5d1159d237.5d1159d162.5d1041.5d125.25d928d88d814.5d88d702.5d88d591d125d478d162d365d237.5d247d317.5d247hR2d399.5R3d317.5R4d88R5d777R6d-135R7d689R8d168R9d241.5R10i40R11d88R12d399.5R13ai1i3i3i3i3i2i3i3i3i3i2hg:96oR0d950.5R1ad183.5d205d324.5d392d248d392d85d205d183.5d205hR2d512R3d324.5R4d85R5d819R6d632R7d734R8d168R9d241.5R10i96R11d85R12d512R13ai1i2i2i2i2hg:39oR0d950.5R1ad183.5d277.5d183.5d555d98.5d555d98.5d277.5d183.5d277.5hR2d281.5R3d183.5R4d98.5R5d746.5R6d469R7d648R8d168R9d241.5R10i39R11d98.5R12d281.5R13ai1i2i2i2i2hg:95oR0d950.5R1ad522d1194d522d1265.5d-10d1265.5d-10d1194d522d1194hR2d512R3d522R4d-10R5d-170R6d-241.5R7d-160R8d168R9d241.5R10i95R11d-10R12d512R13ai1i2i2i2i2hg:38oR0d950.5R1ad249d622.5d203.5d663d182.25d703.25d161d743.5d161d787.5d161d860.5d214d909d267d957.5d347d957.5d394.5d957.5d436d941.75d477.5d926d514d894d249d622.5d319.5d566.5d573.5d826.5d603d782d619.5d731.25d636d680.5d639d623.5d732d623.5d726d689.5d700d754d674d818.5d627.5d881.5d767d1024d641d1024d569.5d950.5d517.5d995d460.5d1016.75d403.5d1038.5d338d1038.5d217.5d1038.5d141d969.75d64.5d901d64.5d793.5d64.5d729.5d98d673.25d131.5d617d198.5d567.5d174.5d536d162d504.75d149.5d473.5d149.5d443.5d149.5d362.5d205d313.25d260.5d264d352.5d264d394d264d435.25d273d476.5d282d519d300d519d391d475.5d367.5d436d355.25d396.5d343d362.5d343d310d343d277.25d370.75d244.5d398.5d244.5d442.5d244.5d468d259.25d493.75d274d519.5d319.5d566.5hR2d798.5R3d767R4d64.5R5d760R6d-14.5R7d695.5R8d168R9d241.5R10i38R11d64.5R12d798.5R13ai1i3i3i3i3i3i3i2i1i2i3i3i2i3i3i2i2i2i3i3i3i3i3i3i3i3i3i3i3i3i2i3i3i3i3i3i3hg:94oR0d950.5R1ad478d277.5d749.5d556d649d556d429d358.5d209d556d108.5d556d380d277.5d478d277.5hR2d858R3d749.5R4d108.5R5d746.5R6d468R7d638R8d168R9d241.5R10i94R11d108.5R12d858R13ai1i2i2i2i2i2i2i2hg:37oR0d950.5R1ad744.5d695.5d701d695.5d676.25d732.5d651.5d769.5d651.5d835.5d651.5d900.5d676.25d937.75d701d975d744.5d975d787d975d811.75d937.75d836.5d900.5d836.5d835.5d836.5d770d811.75d732.75d787d695.5d744.5d695.5d744.5d632d823.5d632d870d687d916.5d742d916.5d835.5d916.5d929d869.75d983.75d823d1038.5d744.5d1038.5d664.5d1038.5d618d983.75d571.5d929d571.5d835.5d571.5d741.5d618.25d686.75d665d632d744.5d632d228.5d327.5d185.5d327.5d160.75d364.75d136d402d136d467d136d533d160.5d570d185d607d228.5d607d272d607d296.75d570d321.5d533d321.5d467d321.5d402.5d296.5d365d271.5d327.5d228.5d327.5d680d264d760d264d293d1038.5d213d1038.5d680d264d228.5d264d307.5d264d354.5d318.75d401.5d373.5d401.5d467d401.5d561.5d354.75d616d308d670.5d228.5d670.5d149d670.5d102.75d615.75d56.5d561d56.5d467d56.5d374d103d319d149.5d264d228.5d264hR2d973R3d916.5R4d56.5R5d760R6d-14.5R7d703.5R8d168R9d241.5R10i37R11d56.5R12d973R13ai1i3i3i3i3i3i3i3i3i1i3i3i3i3i3i3i3i3i1i3i3i3i3i3i3i3i3i1i2i2i2i2i1i3i3i3i3i3i3i3i3hg:93oR0d950.5R1ad311.5d246d311.5d1159d99.5d1159d99.5d1087.5d219d1087.5d219d317.5d99.5d317.5d99.5d246d311.5d246hR2d399.5R3d311.5R4d99.5R5d778R6d-135R7d678.5R8d168R9d241.5R10i93R11d99.5R12d399.5R13ai1i2i2i2i2i2i2i2i2hg:36oR0d950.5R1ad346d1174.5d296d1174.5d295.5d1024d243d1023d190.5d1011.75d138d1000.5d85d978d85d888d136d920d188.25d936.25d240.5d952.5d296d953d296d725d185.5d707d135.25d664d85d621d85d546d85d464.5d139.5d417.5d194d370.5d296d363.5d296d246d346d246d346d362d392.5d364d436d371.75d479.5d379.5d521d393d521d480.5d479.5d459.5d435.75d448d392d436.5d346d434.5d346d648d459.5d665.5d513d710.5d566.5d755.5d566.5d833.5d566.5d918d509.75d966.75d453d1015.5d346d1023d346d1174.5d296d639d296d434d238d440.5d207.5d467d177d493.5d177d537.5d177d580.5d205.25d604.5d233.5d628.5d296d639d346d735d346d951.5d409.5d943d441.75d915.5d474d888d474d843d474d799d443.25d773d412.5d747d346d735hR2d651.5R3d566.5R4d85R5d778R6d-150.5R7d693R8d168R9d241.5R10i36R11d85R12d651.5R13ai1i2i2i3i3i2i3i3i2i3i3i3i3i2i2i2i3i3i2i3i3i2i3i3i3i3i2i1i2i3i3i3i3i1i2i3i3i3i3hg:92oR0d950.5R1ad85d277.5d345d1119d260d1119d0d277.5d85d277.5hR2d345R3d345R4d0R5d746.5R6d-95R7d746.5R8d168R9d241.5R10i92R11d0R12d345R13ai1i2i2i2i2hg:35oR0d950.5R1ad523.5d573.5d378d573.5d336d740.5d482.5d740.5d523.5d573.5d448.5d289d396.5d496.5d542.5d496.5d595d289d675d289d623.5d496.5d779.5d496.5d779.5d573.5d604d573.5d563d740.5d722d740.5d722d817d543.5d817d491.5d1024d411.5d1024d463d817d316.5d817d265d1024d184.5d1024d236.5d817d79d817d79d740.5d255d740.5d297d573.5d136d573.5d136d496.5d316.5d496.5d367.5d289d448.5d289hR2d858R3d779.5R4d79R5d735R6d0R7d656R8d168R9d241.5R10i35R11d79R12d858R13ai1i2i2i2i2i1i2i2i2i2i2i2i2i2i2i2i2i2i2i2i2i2i2i2i2i2i2i2i2i2i2i2i2i2hg:91oR0d950.5R1ad88d246d300d246d300d317.5d180d317.5d180d1087.5d300d1087.5d300d1159d88d1159d88d246hR2d399.5R3d300R4d88R5d778R6d-135R7d690R8d168R9d241.5R10i91R11d88R12d399.5R13ai1i2i2i2i2i2i2i2i2hg:34oR0d950.5R1ad183.5d277.5d183.5d555d98.5d555d98.5d277.5d183.5d277.5d372.5d277.5d372.5d555d287.5d555d287.5d277.5d372.5d277.5hR2d471R3d372.5R4d98.5R5d746.5R6d469R7d648R8d168R9d241.5R10i34R11d98.5R12d471R13ai1i2i2i2i2i1i2i2i2i2hg:90oR0d950.5R1ad57.5d277.5d644d277.5d644d354.5d172d939d655.5d939d655.5d1024d46d1024d46d947d518d362.5d57.5d362.5d57.5d277.5hR2d701.5R3d655.5R4d46R5d746.5R6d0R7d700.5R8d168R9d241.5R10i90R11d46R12d701.5R13ai1i2i2i2i2i2i2i2i2i2i2hg:33oR0d950.5R1ad154.5d897d256d897d256d1024d154.5d1024d154.5d897d154.5d277.5d256d277.5d256d605d246d783.5d165d783.5d154.5d605d154.5d277.5hR2d410.5R3d256R4d154.5R5d746.5R6d0R7d592R8d168R9d241.5R10i33R11d154.5R12d410.5R13ai1i2i2i2i2i1i2i2i2i2i2i2hg:89oR0d950.5R1ad-2d277.5d106.5d277.5d313.5d584.5d519d277.5d627.5d277.5d363.5d668.5d363.5d1024d262d1024d262d668.5d-2d277.5hR2d625.5R3d627.5R4d-2R5d746.5R6d0R7d748.5R8d168R9d241.5R10i89R11d-2R12d625.5R13ai1i2i2i2i2i2i2i2i2i2hg:32oR0d950.5R1ahR2d325.5R3d0R4d0R5d0R6d0R7d0R8d168R9d241.5R10i32R11d0R12d325.5R13ahg:88oR0d950.5R1ad64.5d277.5d173d277.5d358.5d555d545d277.5d653.5d277.5d413.5d636d669.5d1024d561d1024d351d706.5d139.5d1024d30.5d1024d297d625.5d64.5d277.5hR2d701.5R3d669.5R4d30.5R5d746.5R6d0R7d716R8d168R9d241.5R10i88R11d30.5R12d701.5R13ai1i2i2i2i2i2i2i2i2i2i2i2i2hg:87oR0d950.5R1ad34d277.5d136d277.5d293d908.5d449.5d277.5d563d277.5d720d908.5d876.5d277.5d979d277.5d791.5d1024d664.5d1024d507d376d348d1024d221d1024d34d277.5hR2d1012.5R3d979R4d34R5d746.5R6d0R7d712.5R8d168R9d241.5R10i87R11d34R12d1012.5R13ai1i2i2i2i2i2i2i2i2i2i2i2i2i2hg:86oR0d950.5R1ad293d1024d8d277.5d113.5d277.5d350d906d587d277.5d692d277.5d407.5d1024d293d1024hR2d700.5R3d692R4d8R5d746.5R6d0R7d738.5R8d168R9d241.5R10i86R11d8R12d700.5R13ai1i2i2i2i2i2i2i2hg:85oR0d950.5R1ad89d277.5d190.5d277.5d190.5d731d190.5d851d234d903.75d277.5d956.5d375d956.5d472d956.5d515.5d903.75d559d851d559d731d559d277.5d660.5d277.5d660.5d743.5d660.5d889.5d588.25d964d516d1038.5d375d1038.5d233.5d1038.5d161.25d964d89d889.5d89d743.5d89d277.5hR2d749.5R3d660.5R4d89R5d746.5R6d-14.5R7d657.5R8d168R9d241.5R10i85R11d89R12d749.5R13ai1i2i2i3i3i3i3i2i2i2i3i3i3i3i2hg:84oR0d950.5R1ad-3d277.5d628.5d277.5d628.5d362.5d363.5d362.5d363.5d1024d262d1024d262d362.5d-3d362.5d-3d277.5hR2d625.5R3d628.5R4d-3R5d746.5R6d0R7d749.5R8d168R9d241.5R10i84R11d-3R12d625.5R13ai1i2i2i2i2i2i2i2i2hg:83oR0d950.5R1ad548d302d548d400.5d490.5d373d439.5d359.5d388.5d346d341d346d258.5d346d213.75d378d169d410d169d469d169d518.5d198.75d543.75d228.5d569d311.5d584.5d372.5d597d485.5d618.5d539.25d672.75d593d727d593d818d593d926.5d520.25d982.5d447.5d1038.5d307d1038.5d254d1038.5d194.25d1026.5d134.5d1014.5d70.5d991d70.5d887d132d921.5d191d939d250d956.5d307d956.5d393.5d956.5d440.5d922.5d487.5d888.5d487.5d825.5d487.5d770.5d453.75d739.5d420d708.5d343d693d281.5d681d168.5d658.5d118d610.5d67.5d562.5d67.5d477d67.5d378d137.25d321d207d264d329.5d264d382d264d436.5d273.5d491d283d548d302hR2d650R3d593R4d67.5R5d760R6d-14.5R7d692.5R8d168R9d241.5R10i83R11d67.5R12d650R13ai1i2i3i3i3i3i3i3i2i3i3i3i3i3i3i2i3i3i3i3i3i3i2i3i3i3i3i3i3hg:82oR0d950.5R1ad454.5d674d487d685d517.75d721d548.5d757d579.5d820d682d1024d573.5d1024d478d832.5d441d757.5d406.25d733d371.5d708.5d311.5d708.5d201.5d708.5d201.5d1024d100.5d1024d100.5d277.5d328.5d277.5d456.5d277.5d519.5d331d582.5d384.5d582.5d492.5d582.5d563d549.75d609.5d517d656d454.5d674d201.5d360.5d201.5d625.5d328.5d625.5d401.5d625.5d438.75d591.75d476d558d476d492.5d476d427d438.75d393.75d401.5d360.5d328.5d360.5d201.5d360.5hR2d711.5R3d682R4d100.5R5d746.5R6d0R7d646R8d168R9d241.5R10i82R11d100.5R12d711.5R13ai1i3i3i2i2i2i3i3i2i2i2i2i2i3i3i3i3i1i2i2i3i3i3i3i2hg:81oR0d950.5R1ad403.5d346d293.5d346d228.75d428d164d510d164d651.5d164d792.5d228.75d874.5d293.5d956.5d403.5d956.5d513.5d956.5d577.75d874.5d642d792.5d642d651.5d642d510d577.75d428d513.5d346d403.5d346d545d1010.5d678d1156d556d1156d445.5d1036.5d429d1037.5d420.25d1038d411.5d1038.5d403.5d1038.5d246d1038.5d151.75d933.25d57.5d828d57.5d651.5d57.5d474.5d151.75d369.25d246d264d403.5d264d560.5d264d654.5d369.25d748.5d474.5d748.5d651.5d748.5d781.5d696.25d874d644d966.5d545d1010.5hR2d806R3d748.5R4d57.5R5d760R6d-132R7d702.5R8d168R9d241.5R10i81R11d57.5R12d806R13ai1i3i3i3i3i3i3i3i3i1i2i2i2i3i3i3i3i3i3i3i3i3i3hg:80oR0d950.5R1ad201.5d360.5d201.5d641d328.5d641d399d641d437.5d604.5d476d568d476d500.5d476d433.5d437.5d397d399d360.5d328.5d360.5d201.5d360.5d100.5d277.5d328.5d277.5d454d277.5d518.25d334.25d582.5d391d582.5d500.5d582.5d611d518.25d667.5d454d724d328.5d724d201.5d724d201.5d1024d100.5d1024d100.5d277.5hR2d617.5R3d582.5R4d100.5R5d746.5R6d0R7d646R8d168R9d241.5R10i80R11d100.5R12d617.5R13ai1i2i2i3i3i3i3i2i1i2i3i3i3i3i2i2i2i2hg:79oR0d950.5R1ad403.5d346d293.5d346d228.75d428d164d510d164d651.5d164d792.5d228.75d874.5d293.5d956.5d403.5d956.5d513.5d956.5d577.75d874.5d642d792.5d642d651.5d642d510d577.75d428d513.5d346d403.5d346d403.5d264d560.5d264d654.5d369.25d748.5d474.5d748.5d651.5d748.5d828d654.5d933.25d560.5d1038.5d403.5d1038.5d246d1038.5d151.75d933.5d57.5d828.5d57.5d651.5d57.5d474.5d151.75d369.25d246d264d403.5d264hR2d806R3d748.5R4d57.5R5d760R6d-14.5R7d702.5R8d168R9d241.5R10i79R11d57.5R12d806R13ai1i3i3i3i3i3i3i3i3i1i3i3i3i3i3i3i3i3hg:78oR0d950.5R1ad100.5d277.5d236.5d277.5d567.5d902d567.5d277.5d665.5d277.5d665.5d1024d529.5d1024d198.5d399.5d198.5d1024d100.5d1024d100.5d277.5hR2d766R3d665.5R4d100.5R5d746.5R6d0R7d646R8d168R9d241.5R10i78R11d100.5R12d766R13ai1i2i2i2i2i2i2i2i2i2i2hg:77oR0d950.5R1ad100.5d277.5d251d277.5d441.5d785.5d633d277.5d783.5d277.5d783.5d1024d685d1024d685d368.5d492.5d880.5d391d880.5d198.5d368.5d198.5d1024d100.5d1024d100.5d277.5hR2d883.5R3d783.5R4d100.5R5d746.5R6d0R7d646R8d168R9d241.5R10i77R11d100.5R12d883.5R13ai1i2i2i2i2i2i2i2i2i2i2i2i2i2hg:76oR0d950.5R1ad100.5d277.5d201.5d277.5d201.5d939d565d939d565d1024d100.5d1024d100.5d277.5hR2d570.5R3d565R4d100.5R5d746.5R6d0R7d646R8d168R9d241.5R10i76R11d100.5R12d570.5R13ai1i2i2i2i2i2i2hg:75oR0d950.5R1ad100.5d277.5d201.5d277.5d201.5d593d536.5d277.5d666.5d277.5d296d625.5d693d1024d560d1024d201.5d664.5d201.5d1024d100.5d1024d100.5d277.5hR2d671.5R3d693R4d100.5R5d746.5R6d0R7d646R8d168R9d241.5R10i75R11d100.5R12d671.5R13ai1i2i2i2i2i2i2i2i2i2i2i2hg:74oR0d950.5R1ad100.5d277.5d201.5d277.5d201.5d972d201.5d1107d150.25d1168d99d1229d-14.5d1229d-53d1229d-53d1144d-21.5d1144d45.5d1144d73d1106.5d100.5d1069d100.5d972d100.5d277.5hR2d302R3d201.5R4d-53R5d746.5R6d-205R7d799.5R8d168R9d241.5R10i74R11d-53R12d302R13ai1i2i2i3i3i2i2i2i3i3i2hg:73oR0d950.5R1ad100.5d277.5d201.5d277.5d201.5d1024d100.5d1024d100.5d277.5hR2d302R3d201.5R4d100.5R5d746.5R6d0R7d646R8d168R9d241.5R10i73R11d100.5R12d302R13ai1i2i2i2i2hg:72oR0d950.5R1ad100.5d277.5d201.5d277.5d201.5d583.5d568.5d583.5d568.5d277.5d669.5d277.5d669.5d1024d568.5d1024d568.5d668.5d201.5d668.5d201.5d1024d100.5d1024d100.5d277.5hR2d770R3d669.5R4d100.5R5d746.5R6d0R7d646R8d168R9d241.5R10i72R11d100.5R12d770R13ai1i2i2i2i2i2i2i2i2i2i2i2i2hg:71oR0d950.5R1ad609.5d917.5d609.5d717d444.5d717d444.5d634d709.5d634d709.5d954.5d651d996d580.5d1017.25d510d1038.5d430d1038.5d255d1038.5d156.25d936.25d57.5d834d57.5d651.5d57.5d468.5d156.25d366.25d255d264d430d264d503d264d568.75d282d634.5d300d690d335d690d442.5d634d395d571d371d508d347d438.5d347d301.5d347d232.75d423.5d164d500d164d651.5d164d802.5d232.75d879d301.5d955.5d438.5d955.5d492d955.5d534d946.25d576d937d609.5d917.5hR2d793.5R3d709.5R4d57.5R5d760R6d-14.5R7d702.5R8d168R9d241.5R10i71R11d57.5R12d793.5R13ai1i2i2i2i2i2i3i3i3i3i3i3i3i3i2i3i3i3i3i3i3i3i3hg:70oR0d950.5R1ad100.5d277.5d529.5d277.5d529.5d362.5d201.5d362.5d201.5d582.5d497.5d582.5d497.5d667.5d201.5d667.5d201.5d1024d100.5d1024d100.5d277.5hR2d589R3d529.5R4d100.5R5d746.5R6d0R7d646R8d168R9d241.5R10i70R11d100.5R12d589R13ai1i2i2i2i2i2i2i2i2i2i2hg:126oR0d950.5R1ad749.5d615.5d749.5d704.5d697d744d652.25d761d607.5d778d559d778d504d778d431d748.5d425.5d746.5d423d745.5d419.5d744d412d741.5d334.5d710.5d287.5d710.5d243.5d710.5d200.5d729.75d157.5d749d108.5d790.5d108.5d701.5d161d662d205.75d644.75d250.5d627.5d299d627.5d354d627.5d427.5d657.5d432.5d659.5d435d660.5d439d662d446d664.5d523.5d695.5d570.5d695.5d613.5d695.5d655.75d676.5d698d657.5d749.5d615.5hR2d858R3d749.5R4d108.5R5d408.5R6d233.5R7d300R8d168R9d241.5R10i126R11d108.5R12d858R13ai1i2i3i3i3i3i3i3i3i3i2i3i3i3i3i3i3i3i3hg:69oR0d950.5R1ad100.5d277.5d572.5d277.5d572.5d362.5d201.5d362.5d201.5d583.5d557d583.5d557d668.5d201.5d668.5d201.5d939d581.5d939d581.5d1024d100.5d1024d100.5d277.5hR2d647R3d581.5R4d100.5R5d746.5R6d0R7d646R8d168R9d241.5R10i69R11d100.5R12d647R13ai1i2i2i2i2i2i2i2i2i2i2i2i2hg:125oR0d950.5R1ad128d1119d163d1119d233d1119d254.25d1097.5d275.5d1076d275.5d1004.5d275.5d880.5d275.5d802.5d298d767d320.5d731.5d376d718d320.5d705.5d298d670d275.5d634.5d275.5d556d275.5d432d275.5d361d254.25d339.25d233d317.5d163d317.5d128d317.5d128d246d159.5d246d284d246d325.75d282.75d367.5d319.5d367.5d430d367.5d550d367.5d624.5d394.5d653.25d421.5d682d492.5d682d523.5d682d523.5d753.5d492.5d753.5d421.5d753.5d394.5d782.5d367.5d811.5d367.5d887d367.5d1006.5d367.5d1117d325.75d1154d284d1191d159.5d1191d128d1191d128d1119hR2d651.5R3d523.5R4d128R5d778R6d-167R7d650R8d168R9d241.5R10i125R11d128R12d651.5R13ai1i2i3i3i2i3i3i3i3i2i3i3i2i2i2i3i3i2i3i3i2i2i2i3i3i2i3i3i2i2hg:68oR0d950.5R1ad201.5d360.5d201.5d941d323.5d941d478d941d549.75d871d621.5d801d621.5d650d621.5d500d549.75d430.25d478d360.5d323.5d360.5d201.5d360.5d100.5d277.5d308d277.5d525d277.5d626.5d367.75d728d458d728d650d728d843d626d933.5d524d1024d308d1024d100.5d1024d100.5d277.5hR2d788.5R3d728R4d100.5R5d746.5R6d0R7d646R8d168R9d241.5R10i68R11d100.5R12d788.5R13ai1i2i2i3i3i3i3i2i1i2i3i3i3i3i2i2hg:124oR0d950.5R1ad215d241.5d215d1265.5d130d1265.5d130d241.5d215d241.5hR2d345R3d215R4d130R5d782.5R6d-241.5R7d652.5R8d168R9d241.5R10i124R11d130R12d345R13ai1i2i2i2i2hg:67oR0d950.5R1ad659.5d335d659.5d441.5d608.5d394d550.75d370.5d493d347d428d347d300d347d232d425.25d164d503.5d164d651.5d164d799d232d877.25d300d955.5d428d955.5d493d955.5d550.75d932d608.5d908.5d659.5d861d659.5d966.5d606.5d1002.5d547.25d1020.5d488d1038.5d422d1038.5d252.5d1038.5d155d934.75d57.5d831d57.5d651.5d57.5d471.5d155d367.75d252.5d264d422d264d489d264d548.25d281.75d607.5d299.5d659.5d335hR2d715R3d659.5R4d57.5R5d760R6d-14.5R7d702.5R8d168R9d241.5R10i67R11d57.5R12d715R13ai1i2i3i3i3i3i3i3i3i3i2i3i3i3i3i3i3i3i3hg:123oR0d950.5R1ad523.5d1119d523.5d1191d492.5d1191d368d1191d325.75d1154d283.5d1117d283.5d1006.5d283.5d887d283.5d811.5d256.5d782.5d229.5d753.5d158.5d753.5d128d753.5d128d682d158.5d682d230d682d256.75d653.25d283.5d624.5d283.5d550d283.5d430d283.5d319.5d325.75d282.75d368d246d492.5d246d523.5d246d523.5d317.5d489.5d317.5d419d317.5d397.5d339.5d376d361.5d376d432d376d556d376d634.5d353.25d670d330.5d705.5d275.5d718d331d731.5d353.5d767d376d802.5d376d880.5d376d1004.5d376d1075d397.5d1097d419d1119d489.5d1119d523.5d1119hR2d651.5R3d523.5R4d128R5d778R6d-167R7d650R8d168R9d241.5R10i123R11d128R12d651.5R13ai1i2i2i3i3i2i3i3i2i2i2i3i3i2i3i3i2i2i2i3i3i2i3i3i3i3i2i3i3i2hg:66oR0d950.5R1ad201.5d667.5d201.5d941d363.5d941d445d941d484.25d907.25d523.5d873.5d523.5d804d523.5d734d484.25d700.75d445d667.5d363.5d667.5d201.5d667.5d201.5d360.5d201.5d585.5d351d585.5d425d585.5d461.25d557.75d497.5d530d497.5d473d497.5d416.5d461.25d388.5d425d360.5d351d360.5d201.5d360.5d100.5d277.5d358.5d277.5d474d277.5d536.5d325.5d599d373.5d599d462d599d530.5d567d571d535d611.5d473d621.5d547.5d637.5d588.75d688.25d630d739d630d815d630d915d562d969.5d494d1024d368.5d1024d100.5d1024d100.5d277.5hR2d702.5R3d630R4d100.5R5d746.5R6d0R7d646R8d168R9d241.5R10i66R11d100.5R12d702.5R13ai1i2i2i3i3i3i3i2i1i2i2i3i3i3i3i2i1i2i3i3i3i3i3i3i3i3i2i2hg:122oR0d950.5R1ad56.5d464d493.5d464d493.5d548d147.5d950.5d493.5d950.5d493.5d1024d44d1024d44d940d390d537.5d56.5d537.5d56.5d464hR2d537.5R3d493.5R4d44R5d560R6d0R7d516R8d168R9d241.5R10i122R11d44R12d537.5R13ai1i2i2i2i2i2i2i2i2i2i2hg:65oR0d950.5R1ad350d377d213d748.5d487.5d748.5d350d377d293d277.5d407.5d277.5d692d1024d587d1024d519d832.5d182.5d832.5d114.5d1024d8d1024d293d277.5hR2d700.5R3d692R4d8R5d746.5R6d0R7d738.5R8d168R9d241.5R10i65R11d8R12d700.5R13ai1i2i2i2i1i2i2i2i2i2i2i2i2hg:121oR0d950.5R1ad329.5d1076d290.5d1176d253.5d1206.5d216.5d1237d154.5d1237d81d1237d81d1160d135d1160d173d1160d194d1142d215d1124d240.5d1057d257d1015d30.5d464d128d464d303d902d478d464d575.5d464d329.5d1076hR2d606R3d575.5R4d30.5R5d560R6d-213R7d529.5R8d168R9d241.5R10i121R11d30.5R12d606R13ai1i3i3i2i2i2i3i3i2i2i2i2i2i2i2hg:64oR0d950.5R1ad381d755.5d381d827d416.5d867.75d452d908.5d514d908.5d575.5d908.5d610.75d867.5d646d826.5d646d755.5d646d685.5d610d644.25d574d603d513d603d452.5d603d416.75d644d381d685d381d755.5d653.5d905d623.5d943.5d584.75d961.75d546d980d494.5d980d408.5d980d354.75d917.75d301d855.5d301d755.5d301d655.5d355d593d409d530.5d494.5d530.5d546d530.5d585d549.25d624d568d653.5d606d653.5d540.5d725d540.5d725d908.5d798d897.5d839.25d841.75d880.5d786d880.5d697.5d880.5d644d864.75d597d849d550d817d510d765d444.5d690.25d409.75d615.5d375d527.5d375d466d375d409.5d391.25d353d407.5d305d439.5d226.5d490.5d182.25d573.25d138d656d138d752.5d138d832d166.75d901.5d195.5d971d250d1024d302.5d1076d371.5d1103.25d440.5d1130.5d519d1130.5d583.5d1130.5d645.75d1108.75d708d1087d760d1046.5d805d1102d742.5d1150.5d668.75d1176.25d595d1202d519d1202d426.5d1202d344.5d1169.25d262.5d1136.5d198.5d1074d134.5d1011.5d101d929.25d67.5d847d67.5d752.5d67.5d661.5d101.5d579d135.5d496.5d198.5d434d263d370.5d347.5d336.75d432d303d526.5d303d632.5d303d723.25d346.5d814d390d875.5d470d913d519d932.75d576.5d952.5d634d952.5d695.5d952.5d827d873d903d793.5d979d653.5d982d653.5d905hR2d1024R3d952.5R4d67.5R5d721R6d-178R7d653.5R8d168R9d241.5R10i64R11d67.5R12d1024R13ai1i3i3i3i3i3i3i3i3i1i3i3i3i3i3i3i3i3i2i2i2i3i3i3i3i3i3i3i3i3i3i3i3i3i3i3i3i2i3i3i3i3i3i3i3i3i3i3i3i3i3i3i3i3i2hg:120oR0d950.5R1ad562d464d359.5d736.5d572.5d1024d464d1024d301d804d138d1024d29.5d1024d247d731d48d464d156.5d464d305d663.5d453.5d464d562d464hR2d606R3d572.5R4d29.5R5d560R6d0R7d530.5R8d168R9d241.5R10i120R11d29.5R12d606R13ai1i2i2i2i2i2i2i2i2i2i2i2i2hg:63oR0d950.5R1ad195.5d897d297d897d297d1024d195.5d1024d195.5d897d294d823.5d198.5d823.5d198.5d746.5d198.5d696d212.5d663.5d226.5d631d271.5d588d316.5d543.5d345d517d357.75d493.5d370.5d470d370.5d445.5d370.5d401d337.75d373.5d305d346d251d346d211.5d346d166.75d363.5d122d381d73.5d414.5d73.5d320.5d120.5d292d168.75d278d217d264d268.5d264d360.5d264d416.25d312.5d472d361d472d440.5d472d478.5d454d512.75d436d547d391d590d347d633d323.5d656.5d313.75d669.75d304d683d300d695.5d297d706d295.5d721d294d736d294d762d294d823.5hR2d543.5R3d472R4d73.5R5d760R6d0R7d686.5R8d168R9d241.5R10i63R11d73.5R12d543.5R13ai1i2i2i2i2i1i2i2i3i3i2i3i3i3i3i3i3i2i3i3i3i3i3i3i2i3i3i3i3i2hg:119oR0d950.5R1ad43d464d135d464d250d901d364.5d464d473d464d588d901d702.5d464d794.5d464d648d1024d539.5d1024d419d565d298d1024d189.5d1024d43d464hR2d837.5R3d794.5R4d43R5d560R6d0R7d517R8d168R9d241.5R10i119R11d43R12d837.5R13ai1i2i2i2i2i2i2i2i2i2i2i2i2i2hg:62oR0d950.5R1ad108.5d520d108.5d429d749.5d661.5d749.5d744.5d108.5d977d108.5d886d623.5d703.5d108.5d520hR2d858R3d749.5R4d108.5R5d595R6d47R7d486.5R8d168R9d241.5R10i62R11d108.5R12d858R13ai1i2i2i2i2i2i2i2hg:118oR0d950.5R1ad30.5d464d128d464d303d934d478d464d575.5d464d365.5d1024d240.5d1024d30.5d464hR2d606R3d575.5R4d30.5R5d560R6d0R7d529.5R8d168R9d241.5R10i118R11d30.5R12d606R13ai1i2i2i2i2i2i2i2hg:61oR0d950.5R1ad108.5d559d749.5d559d749.5d643d108.5d643d108.5d559d108.5d763d749.5d763d749.5d848d108.5d848d108.5d763hR2d858R3d749.5R4d108.5R5d465R6d176R7d356.5R8d168R9d241.5R10i61R11d108.5R12d858R13ai1i2i2i2i2i1i2i2i2i2hg:117oR0d950.5R1ad87d803d87d464d179d464d179d799.5d179d879d210d918.75d241d958.5d303d958.5d377.5d958.5d420.75d911d464d863.5d464d781.5d464d464d556d464d556d1024d464d1024d464d938d430.5d989d386.25d1013.75d342d1038.5d283.5d1038.5d187d1038.5d137d978.5d87d918.5d87d803hR2d649R3d556R4d87R5d560R6d-14.5R7d473R8d168R9d241.5R10i117R11d87R12d649R13ai1i2i2i2i3i3i3i3i2i2i2i2i2i3i3i3i3hg:60oR0d950.5R1ad749.5d520d233.5d703.5d749.5d886d749.5d977d108.5d744.5d108.5d661.5d749.5d429d749.5d520hR2d858R3d749.5R4d108.5R5d595R6d47R7d486.5R8d168R9d241.5R10i60R11d108.5R12d858R13ai1i2i2i2i2i2i2i2hg:116oR0d950.5R1ad187.5d305d187.5d464d377d464d377d535.5d187.5d535.5d187.5d839.5d187.5d908d206.25d927.5d225d947d282.5d947d377d947d377d1024d282.5d1024d176d1024d135.5d984.25d95d944.5d95d839.5d95d535.5d27.5d535.5d27.5d464d95d464d95d305d187.5d305hR2d401.5R3d377R4d27.5R5d719R6d0R7d691.5R8d168R9d241.5R10i116R11d27.5R12d401.5R13ai1i2i2i2i2i2i3i3i2i2i2i3i3i2i2i2i2i2i2hg:59oR0d950.5R1ad120d494.5d225.5d494.5d225.5d621.5d120d621.5d120d494.5d120d897d225.5d897d225.5d983d143.5d1143d79d1143d120d983d120d897hR2d345R3d225.5R4d79R5d529.5R6d-119R7d450.5R8d168R9d241.5R10i59R11d79R12d345R13ai1i2i2i2i2i1i2i2i2i2i2i2hg:115oR0d950.5R1ad453.5d480.5d453.5d567.5d414.5d547.5d372.5d537.5d330.5d527.5d285.5d527.5d217d527.5d182.75d548.5d148.5d569.5d148.5d611.5d148.5d643.5d173d661.75d197.5d680d271.5d696.5d303d703.5d401d724.5d442.25d762.75d483.5d801d483.5d869.5d483.5d947.5d421.75d993d360d1038.5d252d1038.5d207d1038.5d158.25d1029.75d109.5d1021d55.5d1003.5d55.5d908.5d106.5d935d156d948.25d205.5d961.5d254d961.5d319d961.5d354d939.25d389d917d389d876.5d389d839d363.75d819d338.5d799d253d780.5d221d773d135.5d755d97.5d717.75d59.5d680.5d59.5d615.5d59.5d536.5d115.5d493.5d171.5d450.5d274.5d450.5d325.5d450.5d370.5d458d415.5d465.5d453.5d480.5hR2d533.5R3d483.5R4d55.5R5d573.5R6d-14.5R7d518R8d168R9d241.5R10i115R11d55.5R12d533.5R13ai1i2i3i3i3i3i3i3i2i3i3i3i3i3i3i2i3i3i3i3i3i3i2i3i3i3i3i3i3hg:58oR0d950.5R1ad120d897d225.5d897d225.5d1024d120d1024d120d897d120d494.5d225.5d494.5d225.5d621.5d120d621.5d120d494.5hR2d345R3d225.5R4d120R5d529.5R6d0R7d409.5R8d168R9d241.5R10i58R11d120R12d345R13ai1i2i2i2i2i1i2i2i2i2hg:114oR0d950.5R1ad421d550d405.5d541d387.25d536.75d369d532.5d347d532.5d269d532.5d227.25d583.25d185.5d634d185.5d729d185.5d1024d93d1024d93d464d185.5d464d185.5d551d214.5d500d261d475.25d307.5d450.5d374d450.5d383.5d450.5d395d451.75d406.5d453d420.5d455.5d421d550hR2d421R3d421R4d93R5d573.5R6d0R7d480.5R8d168R9d241.5R10i114R11d93R12d421R13ai1i3i3i3i3i2i2i2i2i2i3i3i3i3i2hg:57oR0d950.5R1ad112.5d1008.5d112.5d916.5d150.5d934.5d189.5d944d228.5d953.5d266d953.5d366d953.5d418.75d886.25d471.5d819d479d682d450d725d405.5d748d361d771d307d771d195d771d129.75d703.25d64.5d635.5d64.5d518d64.5d403d132.5d333.5d200.5d264d313.5d264d443d264d511.25d363.25d579.5d462.5d579.5d651.5d579.5d828d495.75d933.25d412d1038.5d270.5d1038.5d232.5d1038.5d193.5d1031d154.5d1023.5d112.5d1008.5d313.5d692d381.5d692d421.25d645.5d461d599d461d518d461d437.5d421.25d390.75d381.5d344d313.5d344d245.5d344d205.75d390.75d166d437.5d166d518d166d599d205.75d645.5d245.5d692d313.5d692hR2d651.5R3d579.5R4d64.5R5d760R6d-14.5R7d695.5R8d168R9d241.5R10i57R11d64.5R12d651.5R13ai1i2i3i3i3i3i3i3i3i3i3i3i3i3i3i3i3i3i1i3i3i3i3i3i3i3i3hg:113oR0d950.5R1ad151.5d744.5d151.5d846d193.25d903.75d235d961.5d308d961.5d381d961.5d423d903.75d465d846d465d744.5d465d643d423d585.25d381d527.5d308d527.5d235d527.5d193.25d585.25d151.5d643d151.5d744.5d465d940d436d990d391.75d1014.25d347.5d1038.5d285.5d1038.5d184d1038.5d120.25d957.5d56.5d876.5d56.5d744.5d56.5d612.5d120.25d531.5d184d450.5d285.5d450.5d347.5d450.5d391.75d474.75d436d499d465d549d465d464d557d464d557d1237d465d1237d465d940hR2d650R3d557R4d56.5R5d573.5R6d-213R7d517R8d168R9d241.5R10i113R11d56.5R12d650R13ai1i3i3i3i3i3i3i3i3i1i3i3i3i3i3i3i3i3i2i2i2i2i2hg:56oR0d950.5R1ad325.5d669.5d253.5d669.5d212.25d708d171d746.5d171d814d171d881.5d212.25d920d253.5d958.5d325.5d958.5d397.5d958.5d439d919.75d480.5d881d480.5d814d480.5d746.5d439.25d708d398d669.5d325.5d669.5d224.5d626.5d159.5d610.5d123.25d566d87d521.5d87d457.5d87d368d150.75d316d214.5d264d325.5d264d437d264d500.5d316d564d368d564d457.5d564d521.5d527.75d566d491.5d610.5d427d626.5d500d643.5d540.75d693d581.5d742.5d581.5d814d581.5d922.5d515.25d980.5d449d1038.5d325.5d1038.5d202d1038.5d135.75d980.5d69.5d922.5d69.5d814d69.5d742.5d110.5d693d151.5d643.5d224.5d626.5d187.5d467d187.5d525d223.75d557.5d260d590d325.5d590d390.5d590d427.25d557.5d464d525d464d467d464d409d427.25d376.5d390.5d344d325.5d344d260d344d223.75d376.5d187.5d409d187.5d467hR2d651.5R3d581.5R4d69.5R5d760R6d-14.5R7d690.5R8d168R9d241.5R10i56R11d69.5R12d651.5R13ai1i3i3i3i3i3i3i3i3i1i3i3i3i3i3i3i3i3i3i3i3i3i3i3i3i3i1i3i3i3i3i3i3i3i3hg:112oR0d950.5R1ad185.5d940d185.5d1237d93d1237d93d464d185.5d464d185.5d549d214.5d499d258.75d474.75d303d450.5d364.5d450.5d466.5d450.5d530.25d531.5d594d612.5d594d744.5d594d876.5d530.25d957.5d466.5d1038.5d364.5d1038.5d303d1038.5d258.75d1014.25d214.5d990d185.5d940d498.5d744.5d498.5d643d456.75d585.25d415d527.5d342d527.5d269d527.5d227.25d585.25d185.5d643d185.5d744.5d185.5d846d227.25d903.75d269d961.5d342d961.5d415d961.5d456.75d903.75d498.5d846d498.5d744.5hR2d650R3d594R4d93R5d573.5R6d-213R7d480.5R8d168R9d241.5R10i112R11d93R12d650R13ai1i2i2i2i2i2i3i3i3i3i3i3i3i3i1i3i3i3i3i3i3i3i3hgh";
Assets.baby = "graphics/baby.png";
Assets.walkingBaby = "graphics/walkingBaby.png";
browser.Lib.HTML_DIV_EVENT_TYPES = ["resize","mouseup","mouseover","mouseout","mousemove","mousedown","mousewheel","dblclick","click"];
browser.Lib.HTML_TOUCH_EVENT_TYPES = ["touchstart","touchmove","touchend"];
browser.Lib.HTML_WINDOW_EVENT_TYPES = ["keyup","keypress","keydown","resize"];
browser.Lib.starttime = haxe.Timer.stamp();
browser.events.Event.ACTIVATE = "activate";
browser.events.Event.ADDED = "added";
browser.events.Event.ADDED_TO_STAGE = "addedToStage";
browser.events.Event.COMPLETE = "complete";
browser.events.Event.DEACTIVATE = "deactivate";
browser.events.Event.ENTER_FRAME = "enterFrame";
browser.events.Event.OPEN = "open";
browser.events.Event.REMOVED = "removed";
browser.events.Event.REMOVED_FROM_STAGE = "removedFromStage";
browser.events.Event.RENDER = "render";
browser.events.Event.RESIZE = "resize";
browser.events.MouseEvent.CLICK = "click";
browser.events.MouseEvent.DOUBLE_CLICK = "doubleClick";
browser.events.MouseEvent.MOUSE_DOWN = "mouseDown";
browser.events.MouseEvent.MOUSE_MOVE = "mouseMove";
browser.events.MouseEvent.MOUSE_OUT = "mouseOut";
browser.events.MouseEvent.MOUSE_OVER = "mouseOver";
browser.events.MouseEvent.MOUSE_UP = "mouseUp";
browser.events.MouseEvent.MOUSE_WHEEL = "mouseWheel";
browser.events.MouseEvent.ROLL_OUT = "rollOut";
browser.events.MouseEvent.ROLL_OVER = "rollOver";
browser.display.Stage.nmeAcceleration = { x : 0.0, y : 1.0, z : 0.0};
browser.display.Stage.nmeMouseChanges = [browser.events.MouseEvent.MOUSE_OUT,browser.events.MouseEvent.MOUSE_OVER,browser.events.MouseEvent.ROLL_OUT,browser.events.MouseEvent.ROLL_OVER];
browser.display.Stage.nmeTouchChanges = ["touchOut","touchOver","touchRollOut","touchRollOver"];
browser.display.StageQuality.BEST = "best";
browser.display.StageQuality.HIGH = "high";
browser.events.Listener.sIDs = 1;
browser.events.EventPhase.CAPTURING_PHASE = 0;
browser.events.EventPhase.AT_TARGET = 1;
browser.events.EventPhase.BUBBLING_PHASE = 2;
browser.events.FocusEvent.FOCUS_IN = "focusIn";
browser.events.FocusEvent.FOCUS_OUT = "focusOut";
browser.events.HTTPStatusEvent.HTTP_STATUS = "httpStatus";
browser.events.IOErrorEvent.IO_ERROR = "ioError";
browser.events.KeyboardEvent.KEY_DOWN = "keyDown";
browser.events.KeyboardEvent.KEY_UP = "keyUp";
browser.events.ProgressEvent.PROGRESS = "progress";
browser.geom.Transform.DEG_TO_RAD = Math.PI / 180.0;
browser.net.URLRequestMethod.GET = "GET";
browser.text.TextField.mDefaultFont = "Bitstream_Vera_Sans";
browser.text.FontInstance.mSolidFonts = new Hash();
browser.text.TextFieldType.DYNAMIC = "DYNAMIC";
browser.text.TextFieldType.INPUT = "INPUT";
com.haxepunk.HXP.frameRate = 0;
com.haxepunk.HXP.rate = 1;
com.haxepunk.HXP.defaultFont = "font/04B_03__.ttf";
com.haxepunk.HXP.camera = new browser.geom.Point();
com.haxepunk.HXP.tweener = new com.haxepunk.Tweener();
com.haxepunk.HXP.focused = false;
com.haxepunk.HXP._world = new com.haxepunk.World();
com.haxepunk.HXP._bitmap = new Hash();
com.haxepunk.HXP._seed = 0;
com.haxepunk.HXP._volume = 1;
com.haxepunk.HXP._pan = 0;
com.haxepunk.HXP._soundTransform = new browser.media.SoundTransform();
com.haxepunk.HXP.point = new browser.geom.Point();
com.haxepunk.HXP.point2 = new browser.geom.Point();
com.haxepunk.HXP.zero = new browser.geom.Point();
com.haxepunk.HXP.rect = new browser.geom.Rectangle();
com.haxepunk.HXP.matrix = new browser.geom.Matrix();
com.haxepunk.graphics.Image._flips = new Hash();
com.haxepunk.graphics.atlas.Atlas._atlases = new Array();
com.haxepunk.graphics.atlas.Atlas._sprites = new IntHash();
com.haxepunk.masks.Polygon._axis = new com.haxepunk.math.Vector();
com.haxepunk.masks.Polygon.firstProj = new com.haxepunk.math.Projection();
com.haxepunk.masks.Polygon.secondProj = new com.haxepunk.math.Projection();
com.haxepunk.masks.Polygon.vertical = new com.haxepunk.math.Vector(0,1);
com.haxepunk.masks.Polygon.horizontal = new com.haxepunk.math.Vector(1,0);
com.haxepunk.tweens.TweenEvent.START = "start";
com.haxepunk.tweens.TweenEvent.UPDATE = "update";
com.haxepunk.tweens.TweenEvent.FINISH = "finish";
com.haxepunk.utils.Input.keyString = "";
com.haxepunk.utils.Input._enabled = false;
com.haxepunk.utils.Input._joysticks = new IntHash();
com.haxepunk.utils.Input._key = new Array();
com.haxepunk.utils.Input._keyNum = 0;
com.haxepunk.utils.Input._press = new Array();
com.haxepunk.utils.Input._pressNum = 0;
com.haxepunk.utils.Input._release = new Array();
com.haxepunk.utils.Input._releaseNum = 0;
com.haxepunk.utils.Input._control = new Hash();
com.haxepunk.utils.Input._mouseWheelDelta = 0;
haxe.Unserializer.DEFAULT_RESOLVER = Type;
haxe.Unserializer.BASE64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789%:";
nme.installer.Assets.cachedBitmapData = new Hash();
nme.installer.Assets.initialized = false;
nme.installer.Assets.libraryTypes = new Hash();
nme.installer.Assets.resourceClasses = new Hash();
nme.installer.Assets.resourceNames = new Hash();
nme.installer.Assets.resourceTypes = new Hash();
ApplicationMain.main();
})();

//@ sourceMappingURL=InsideYourMom.js.map