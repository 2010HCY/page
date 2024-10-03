(function (console, $hx_exports, $global) { "use strict";
var $hxClasses = {},$estr = function() { return js_Boot.__string_rec(this,''); };
function $extend(from, fields) {
	function Inherit() {} Inherit.prototype = from; var proto = new Inherit();
	for (var name in fields) proto[name] = fields[name];
	if( fields.toString !== Object.prototype.toString ) proto.toString = fields.toString;
	return proto;
}
var ApplicationMain = function() { };
$hxClasses["ApplicationMain"] = ApplicationMain;
ApplicationMain.__name__ = ["ApplicationMain"];
ApplicationMain.main = function() {
	if(ApplicationMain.embeds == null || ApplicationMain.embeds == 0) ApplicationMain.preload();
};
ApplicationMain.preload = function() {
	ApplicationMain.bytesLoaded = ApplicationMain.totalBytes = 0;
	var _g = 0;
	var _g1 = ApplicationMain.AssetBytes;
	while(_g < _g1.length) {
		var bytes = _g1[_g];
		++_g;
		ApplicationMain.totalBytes += bytes;
	}
	ApplicationMain.completed = 0;
	ApplicationMain.loaders = new haxe_ds_StringMap();
	ApplicationMain.urlLoaders = new haxe_ds_StringMap();
	ApplicationMain.total = 0;
	openfl_Lib.get_current().loaderInfo = openfl_display_LoaderInfo.create(null);
	openfl_Lib.get_stage().set_frameRate(60);
	openfl_Lib.get_current().addChild(ApplicationMain.preloader = new NMEPreloader());
	ApplicationMain.preloader.onInit();
	ApplicationMain.loadFile("img/overlay.png");
	ApplicationMain.loadFile("img/buffs.png");
	ApplicationMain.loadFile("img/color.png");
	ApplicationMain.loadFile("img/nitems.png");
	ApplicationMain.loadFile("img/og.png");
	ApplicationMain.loadFile("img/shadow.png");
	ApplicationMain.loadFile("img/side.png");
	ApplicationMain.loadFile("img/visual.png");
	var resourcePrefix = "NME_:bitmap_";
	var _g2 = 0;
	var _g11 = haxe_Resource.listNames();
	while(_g2 < _g11.length) {
		var resourceName = _g11[_g2];
		++_g2;
		if(StringTools.startsWith(resourceName,resourcePrefix)) {
			var type = Type.resolveClass(StringTools.replace(resourceName.substring(resourcePrefix.length),"_","."));
			if(type != null) {
				ApplicationMain.total++;
				var instance = Type.createInstance(type,[0,0,true,16777215,ApplicationMain.bitmapClass_onComplete]);
			}
		}
	}
	if(ApplicationMain.total != 0) {
		ApplicationMain.loaderStack = [];
		var $it0 = ApplicationMain.loaders.keys();
		while( $it0.hasNext() ) {
			var p = $it0.next();
			ApplicationMain.loaderStack.push(p);
		}
		ApplicationMain.urlLoaderStack = [];
		var $it1 = ApplicationMain.urlLoaders.keys();
		while( $it1.hasNext() ) {
			var p1 = $it1.next();
			ApplicationMain.urlLoaderStack.push(p1);
		}
		var _g3 = 0;
		while(_g3 < 8) {
			var i = _g3++;
			ApplicationMain.nextLoader();
		}
	} else ApplicationMain.begin();
};
ApplicationMain.nextLoader = function() {
	if(ApplicationMain.loaderStack.length != 0) {
		var p = ApplicationMain.loaderStack.shift();
		var o = ApplicationMain.loaders.get(p);
		o.contentLoaderInfo.addEventListener("complete",ApplicationMain.loader_onComplete);
		o.load(new openfl_net_URLRequest(p));
	} else if(ApplicationMain.urlLoaderStack.length != 0) {
		var p1 = ApplicationMain.urlLoaderStack.shift();
		var o1 = ApplicationMain.urlLoaders.get(p1);
		o1.addEventListener("complete",ApplicationMain.loader_onComplete);
		o1.load(new openfl_net_URLRequest(p1));
	}
};
ApplicationMain.loadFile = function(p) {
	var value = new openfl_display_Loader();
	ApplicationMain.loaders.set(p,value);
	ApplicationMain.total++;
};
ApplicationMain.begin = function() {
	ApplicationMain.preloader.addEventListener("complete",ApplicationMain.preloader_onComplete);
	ApplicationMain.preloader.onLoaded();
};
ApplicationMain.bitmapClass_onComplete = function(instance) {
	ApplicationMain.completed++;
	var classType;
	if(instance == null) classType = null; else classType = js_Boot.getClass(instance);
	classType.preload = instance;
	if(ApplicationMain.completed == ApplicationMain.total) ApplicationMain.begin();
};
ApplicationMain.loader_onComplete = function(event) {
	ApplicationMain.completed++;
	ApplicationMain.bytesLoaded += ApplicationMain.AssetBytes[HxOverrides.indexOf(ApplicationMain.AssetNames,event._target.url,0)];
	ApplicationMain.preloader.onUpdate(ApplicationMain.bytesLoaded,ApplicationMain.totalBytes);
	if(ApplicationMain.completed == ApplicationMain.total) ApplicationMain.begin(); else ApplicationMain.nextLoader();
};
ApplicationMain.preloader_onComplete = function(event) {
	ApplicationMain.preloader.removeEventListener("complete",ApplicationMain.preloader_onComplete);
	openfl_Lib.get_current().removeChild(ApplicationMain.preloader);
	ApplicationMain.preloader = null;
	if(Main.main == null) {
		var o = new DocumentClass();
		if(js_Boot.__instanceof(o,openfl_display_DisplayObject)) openfl_Lib.get_current().addChild(o);
	} else Main.main();
};
var openfl_events_IEventDispatcher = function() { };
$hxClasses["openfl.events.IEventDispatcher"] = openfl_events_IEventDispatcher;
openfl_events_IEventDispatcher.__name__ = ["openfl","events","IEventDispatcher"];
openfl_events_IEventDispatcher.prototype = {
	__class__: openfl_events_IEventDispatcher
};
var openfl_events_EventDispatcher = function() {
	this.eventList = new haxe_ds_StringMap();
};
$hxClasses["openfl.events.EventDispatcher"] = openfl_events_EventDispatcher;
openfl_events_EventDispatcher.__name__ = ["openfl","events","EventDispatcher"];
openfl_events_EventDispatcher.__interfaces__ = [openfl_events_IEventDispatcher];
openfl_events_EventDispatcher.prototype = {
	addEventListener: function(type,listener,useCapture,priority,weak) {
		if(weak == null) weak = false;
		if(priority == null) priority = 0;
		if(useCapture == null) useCapture = false;
		var o;
		if(!this.eventList.exists(type)) {
			var value = o = [];
			this.eventList.set(type,value);
		} else o = this.eventList.get(type);
		o.push(listener);
	}
	,removeEventListener: function(type,listener,useCapture) {
		if(useCapture == null) useCapture = false;
		if(this.eventList.exists(type)) {
			var r = this.eventList.get(type);
			var _g = 0;
			while(_g < r.length) {
				var o = r[_g];
				++_g;
				if(Reflect.compareMethods(o,listener)) {
					HxOverrides.remove(r,o);
					break;
				}
			}
			if(r.length == 0) this.eventList.remove(type);
		}
	}
	,dispatchEvent: function(event) {
		if(event.get_target() == null) event.set_target(this);
		event.set_currentTarget(this);
		var t = event.type;
		if(this.eventList.exists(t)) {
			var list = this.eventList.get(t);
			var i = 0;
			while(i < list.length) {
				var func = list[i];
				func(event);
				if(list[i] == func) i++;
			}
		}
		return true;
	}
	,__class__: openfl_events_EventDispatcher
};
var openfl_events_EventWrapper = function() {
	openfl_events_EventDispatcher.call(this);
	this.eventMap = new haxe_ds_ObjectMap();
};
$hxClasses["openfl.events.EventWrapper"] = openfl_events_EventWrapper;
openfl_events_EventWrapper.__name__ = ["openfl","events","EventWrapper"];
openfl_events_EventWrapper.__super__ = openfl_events_EventDispatcher;
openfl_events_EventWrapper.prototype = $extend(openfl_events_EventDispatcher.prototype,{
	addEventListener: function(type,listener,useCapture,priority,weak) {
		if(weak == null) weak = false;
		if(priority == null) priority = 0;
		if(useCapture == null) useCapture = false;
		var _g = this;
		openfl_events_EventDispatcher.prototype.addEventListener.call(this,type,listener,useCapture,priority,weak);
		var f;
		var wrapper = function(e) {
			if(e.get_target() == _g.component) e.set_target(_g);
			e.set_currentTarget(_g);
			listener(e);
		};
		f = wrapper;
		if(!(this.eventMap.h.__keys__[listener.__id__] != null)) this.eventMap.set(listener,f);
		this.component.addEventListener(type,f,useCapture);
	}
	,removeEventListener: function(type,listener,useCapture) {
		if(useCapture == null) useCapture = false;
		openfl_events_EventDispatcher.prototype.removeEventListener.call(this,type,listener,useCapture);
		if(this.eventMap.h.__keys__[listener.__id__] != null) {
			this.component.removeEventListener(type,this.eventMap.h[listener.__id__],useCapture);
			this.eventMap.remove(listener);
		}
	}
	,__class__: openfl_events_EventWrapper
});
var openfl_display_DisplayObject = function() {
	this.y = 0;
	this.x = 0;
	this.rotation = 0;
	this.scaleY = 1;
	this.scaleX = 1;
	this.visible = true;
	openfl_events_EventWrapper.call(this);
	this.eventRemap = new haxe_ds_StringMap();
	if(this.component == null) this.component = openfl_Lib.jsNode("div");
	this.component.node = this;
	this.component.setAttribute("node",Type.getClassName(js_Boot.getClass(this)));
	this.transform = new openfl_geom_Transform(this);
};
$hxClasses["openfl.display.DisplayObject"] = openfl_display_DisplayObject;
openfl_display_DisplayObject.__name__ = ["openfl","display","DisplayObject"];
openfl_display_DisplayObject.__super__ = openfl_events_EventWrapper;
openfl_display_DisplayObject.prototype = $extend(openfl_events_EventWrapper.prototype,{
	broadcastEvent: function(e) {
		this.dispatchEvent(e);
	}
	,syncMtx: function() {
		var s = this.component.style;
		var v;
		var n;
		if(this._syncMtx_set != true) {
			this._syncMtx_set = true;
			openfl_Lib.setCSSProperties(s,"transform-origin","0% 0%",31);
		}
		v = "";
		if(this.x != 0 || this.y != 0) v += "translate(" + this.x + "px, " + this.y + "px) ";
		if(this.scaleX != 1 || this.scaleY != 1) v += "scale(" + this.scaleX + ", " + this.scaleY + ") ";
		if(this.rotation != 0) v += "rotate(" + this.rotation + "deg) ";
		if(this.transform != null) {
			var m = this.transform.get_matrix();
			if(m != null && !m.isIdentity()) v += "matrix(" + m.a + ", " + m.b + ", " + m.c + ", " + m.d + ", " + m.tx + ", " + m.ty + ")" + " ";
		}
		this.component.setAttribute("transform",v);
		n = "transform";
		s.setProperty(n,v,null);
		s.setProperty("-o-" + n,v,null);
		s.setProperty("-ms-" + n,v,null);
		s.setProperty("-moz-" + n,v,null);
		s.setProperty("-webkit-" + n,v,null);
	}
	,set_x: function(v) {
		if(this.x != v) {
			this.x = v;
			this.syncMtx();
		}
		return v;
	}
	,set_y: function(v) {
		if(this.y != v) {
			this.y = v;
			this.syncMtx();
		}
		return v;
	}
	,set_scaleX: function(v) {
		if(this.scaleX != v) {
			this.scaleX = v;
			this.syncMtx();
		}
		return v;
	}
	,get_width: function() {
		return this.__width || 0;
	}
	,get_height: function() {
		return this.__height || 0;
	}
	,get_stage: function() {
		return this.__stage;
	}
	,set_stage: function(v) {
		if(this.__stage != v) {
			var z = this.__stage != null != (v != null);
			this.__stage = v;
			if(z) this.dispatchEvent(new openfl_events_Event(v != null?"addedToStage":"removedFromStage"));
		}
		return v;
	}
	,concatTransform: function(m) {
		if(!this.transform.get_matrix().isIdentity()) m.concat(this.transform.get_matrix());
		if(this.rotation != 0) m.rotate(this.rotation * Math.PI / 180);
		if(this.scaleX != 1 || this.scaleY != 1) m.scale(this.scaleX,this.scaleY);
		if(this.x != 0 || this.y != 0) m.translate(this.x,this.y);
	}
	,getGlobalMatrix: function(m) {
		if(m == null) m = new openfl_geom_Matrix();
		var o = this;
		while(o != null) {
			o.concatTransform(m);
			o = o.parent;
		}
		return m;
	}
	,globalToLocal: function(q,r) {
		if(r == null) r = new openfl_geom_Point();
		var m = openfl_display_DisplayObject.convMatrix;
		var u = q.x;
		var v = q.y;
		if(m == null) m = openfl_display_DisplayObject.convMatrix = new openfl_geom_Matrix();
		m.identity();
		m = this.getGlobalMatrix(m);
		m.invert();
		r.x = u * m.a + v * m.c + m.tx;
		r.y = u * m.b + v * m.d + m.ty;
		return r;
	}
	,get_mouseX: function() {
		return (openfl_display_DisplayObject.convPoint = this.globalToLocal(openfl_Lib.get_current().get_stage().mousePos,openfl_display_DisplayObject.convPoint)).x;
	}
	,get_mouseY: function() {
		return (openfl_display_DisplayObject.convPoint = this.globalToLocal(openfl_Lib.get_current().get_stage().mousePos,openfl_display_DisplayObject.convPoint)).y;
	}
	,hitTestLocal: function(x,y,p,v) {
		return (!v || this.visible) && x >= 0 && y >= 0 && x <= this.get_width() && y <= this.get_height();
	}
	,addEventListener: function(type,listener,useCapture,priority,weak) {
		if(weak == null) weak = false;
		if(priority == null) priority = 0;
		if(useCapture == null) useCapture = false;
		openfl_events_EventWrapper.prototype.addEventListener.call(this,type,listener,useCapture,priority,weak);
	}
	,broadcastMouse: function(h,e,ms,mc) {
		if(!this.visible) return false;
		var o;
		var t = e.type;
		var m;
		var m2;
		var d = h.length;
		var l;
		var x;
		var y;
		h.push(this);
		if(mc.length > 0) m = mc.pop(); else m = new openfl_geom_Matrix();
		l = ms.length;
		while(l <= d) {
			o = h[l];
			m.identity();
			o.concatTransform(m);
			m.invert();
			if(mc.length > 0) m2 = mc.pop(); else m2 = new openfl_geom_Matrix();
			if(l > 0) m2.copy(ms[l - 1]); else m2.identity();
			m2.concat(m);
			ms.push(m2);
			l++;
		}
		m.copy(ms[d]);
		x = e.stageX * m.a + e.stageY * m.c + m.tx;
		y = e.stageX * m.b + e.stageY * m.d + m.ty;
		mc.push(m);
		h.pop();
		if(this.hitTestLocal(x,y,true,true)) {
			if(e.relatedObject == null) {
				e.localX = x;
				e.localY = y;
				e.relatedObject = this;
			}
			this.dispatchEvent(e);
			return true;
		}
		return false;
	}
	,dispatchEvent: function(event) {
		var r = openfl_events_EventWrapper.prototype.dispatchEvent.call(this,event);
		if(r && event.bubbles) {
			var _g = event.type;
			switch(_g) {
			case "mouseMove":case "mouseOver":case "mouseOut":case "mouseClick":case "mouseDown":case "mouseUp":case "rightClick":case "rightMouseDown":case "rightMouseUp":case "middleClick":case "middleMouseDown":case "middleMouseUp":case "mouseWheel":case "touchMove":case "touchBegin":case "touchEnd":
				var parent = this.parent;
				if(parent != null) parent.dispatchEvent(event);
				break;
			}
		}
		return r;
	}
	,__class__: openfl_display_DisplayObject
});
var openfl_display_InteractiveObject = function() {
	openfl_display_DisplayObject.call(this);
	this.tabEnabled = false;
	this.tabIndex = 0;
	this.mouseEnabled = this.doubleClickEnabled = true;
};
$hxClasses["openfl.display.InteractiveObject"] = openfl_display_InteractiveObject;
openfl_display_InteractiveObject.__name__ = ["openfl","display","InteractiveObject"];
openfl_display_InteractiveObject.__super__ = openfl_display_DisplayObject;
openfl_display_InteractiveObject.prototype = $extend(openfl_display_DisplayObject.prototype,{
	giveFocus: function() {
		this.component.focus();
	}
	,__class__: openfl_display_InteractiveObject
});
var openfl_display_DisplayObjectContainer = function() {
	openfl_display_InteractiveObject.call(this);
	this.children = [];
	this.mouseChildren = true;
};
$hxClasses["openfl.display.DisplayObjectContainer"] = openfl_display_DisplayObjectContainer;
openfl_display_DisplayObjectContainer.__name__ = ["openfl","display","DisplayObjectContainer"];
openfl_display_DisplayObjectContainer.__super__ = openfl_display_InteractiveObject;
openfl_display_DisplayObjectContainer.prototype = $extend(openfl_display_InteractiveObject.prototype,{
	addChild: function(o) {
		if(o.parent != null) o.parent.removeChild(o);
		o.parent = this;
		o.set_stage(this.get_stage());
		this.children.push(o);
		this.component.appendChild(o.component);
		var e = new openfl_events_Event("added");
		o.dispatchEvent(e);
		this.dispatchEvent(e);
		return o;
	}
	,removeChild: function(o) {
		if(o.parent == this) {
			o.parent = null;
			o.set_stage(null);
			HxOverrides.remove(this.children,o);
			this.component.removeChild(o.component);
			var e = new openfl_events_Event("removed");
			o.dispatchEvent(e);
			this.dispatchEvent(e);
		}
		return o;
	}
	,broadcastEvent: function(e) {
		this.dispatchEvent(e);
		var _g = 0;
		var _g1 = this.children;
		while(_g < _g1.length) {
			var o = _g1[_g];
			++_g;
			o.broadcastEvent(e);
		}
	}
	,broadcastMouse: function(h,e,ms,mc) {
		if(!this.visible) return false;
		var r = false;
		if(this.mouseChildren) {
			var i = this.children.length;
			if(i > 0) {
				h.push(this);
				while(--i >= 0) if(this.children[i].broadcastMouse(h,e,ms,mc)) {
					r = true;
					break;
				}
				h.pop();
			}
		}
		while(ms.length > h.length) mc.push(ms.pop());
		r = r || openfl_display_InteractiveObject.prototype.broadcastMouse.call(this,h,e,ms,mc);
		while(ms.length > h.length) mc.push(ms.pop());
		return r;
	}
	,hitTestLocal: function(x,y,p,v) {
		if(!v || this.visible) {
			var i = this.children.length;
			var m;
			var o;
			if(i > 0) {
				m = openfl_geom_Matrix.create();
				while(--i >= 0) {
					m.identity();
					o = this.children[i];
					o.concatTransform(m);
					m.invert();
					if(o.hitTestLocal(x * m.a + y * m.c + m.tx,x * m.b + y * m.d + m.ty,p,v)) return true;
				}
				openfl_geom_Matrix.pool.push(m);
			}
		}
		return false;
	}
	,set_stage: function(v) {
		openfl_display_InteractiveObject.prototype.set_stage.call(this,v);
		var _g = 0;
		var _g1 = this.children;
		while(_g < _g1.length) {
			var o = _g1[_g];
			++_g;
			o.set_stage(v);
		}
		return v;
	}
	,__class__: openfl_display_DisplayObjectContainer
});
var openfl_display_IBitmapDrawable = function() { };
$hxClasses["openfl.display.IBitmapDrawable"] = openfl_display_IBitmapDrawable;
openfl_display_IBitmapDrawable.__name__ = ["openfl","display","IBitmapDrawable"];
openfl_display_IBitmapDrawable.prototype = {
	__class__: openfl_display_IBitmapDrawable
};
var openfl_display_Sprite = function() {
	openfl_display_DisplayObjectContainer.call(this);
};
$hxClasses["openfl.display.Sprite"] = openfl_display_Sprite;
openfl_display_Sprite.__name__ = ["openfl","display","Sprite"];
openfl_display_Sprite.__interfaces__ = [openfl_display_IBitmapDrawable];
openfl_display_Sprite.__super__ = openfl_display_DisplayObjectContainer;
openfl_display_Sprite.prototype = $extend(openfl_display_DisplayObjectContainer.prototype,{
	get_graphics: function() {
		if(this._graphics == null) {
			var o = new openfl_display_Graphics();
			var q = o.component;
			o.set_displayObject(this);
			if(this.children.length == 0) this.component.appendChild(q); else this.component.insertBefore(q,this.children[0].component);
			this._graphics = o;
		}
		return this._graphics;
	}
	,set_stage: function(v) {
		var z = this.get_stage() == null && v != null;
		var r = openfl_display_DisplayObjectContainer.prototype.set_stage.call(this,v);
		if(z && this._graphics != null) this._graphics.invalidate();
		return r;
	}
	,drawToSurface: function(cnv,ctx,mtx,ctr,blendMode,clipRect,smoothing) {
		this.get_graphics().drawToSurface(cnv,ctx,mtx,ctr,blendMode,clipRect,smoothing);
	}
	,hitTestLocal: function(x,y,p,v) {
		if(openfl_display_DisplayObjectContainer.prototype.hitTestLocal.call(this,x,y,p,v)) return true;
		if(!v || this.visible) {
			var g = this._graphics;
			if(g != null) return g.hitTestLocal(x,y,p);
		}
		return false;
	}
	,__class__: openfl_display_Sprite
});
var openfl_display_BitmapData = function(w,h,t,c) {
	if(t == null) t = true;
	this.__sync = 1;
	this.__transparent = t;
	this.__revision = 0;
	this.__rect = new openfl_geom_Rectangle(0,0,w,h);
	this.component = openfl_bitfive_NodeTools.createCanvasElement();
	this.component.setAttribute("node",Type.getClassName(js_Boot.getClass(this)));
	this.component.width = w;
	this.component.height = h;
	this.context = this.component.getContext("2d");
	openfl_display_BitmapData.setSmoothing(this.context,true);
	this.__pixelData = this.context.createImageData(1,1);
	if(c == null) c = -1;
	if(!t) c |= -16777216;
	if((c & -16777216) != 0) this.fillRect(this.__rect,c);
};
$hxClasses["openfl.display.BitmapData"] = openfl_display_BitmapData;
openfl_display_BitmapData.__name__ = ["openfl","display","BitmapData"];
openfl_display_BitmapData.__interfaces__ = [openfl_display_IBitmapDrawable];
openfl_display_BitmapData.setSmoothing = function(o,v) {
	o.imageSmoothingEnabled = o.oImageSmoothingEnabled = o.msImageSmoothingEnabled = o.webkitImageSmoothingEnabled = o.mozImageSmoothingEnabled = v;
};
openfl_display_BitmapData.makeColor = function(color) {
	return "rgba(" + (color >> 16 & 255) + "," + (color >> 8 & 255) + "," + (color & 255) + "," + ((color >> 24 & 255) / 255).toFixed(4) + ")";
};
openfl_display_BitmapData.prototype = {
	fillRect: function(area,color) {
		if(area == null || area.width <= 0 || area.height <= 0) return;
		if(area.equals(this.__rect) && this.__transparent && (color & -16777216) == 0) {
			this.component.width = this.component.width;
			return;
		}
		if(!this.__transparent) color |= -16777216; else if((color & -16777216) != -16777216) this.context.clearRect(area.x,area.y,area.width,area.height);
		if((color & -16777216) != 0) {
			this.context.fillStyle = openfl_display_BitmapData.makeColor(color);
			this.context.fillRect(area.x,area.y,area.width,area.height);
		}
		this.__sync |= 5;
	}
	,clone: function() {
		this.syncCanvas();
		var r = new openfl_display_BitmapData(this.component.width,this.component.height,this.__transparent,0);
		r.context.drawImage(this.component,0,0);
		r.__sync |= 5;
		return r;
	}
	,dispose: function() {
		this.component.width = this.component.height = 1;
		this.__imageData = null;
		this.__sync = 5;
	}
	,handle: function() {
		this.syncCanvas();
		if((this.__sync & 4) != 0) {
			this.__revision++;
			this.__sync &= -5;
		}
		return this.component;
	}
	,drawToSurface: function(cnv,ctx,matrix,ctr,blendMode,clipRect,smoothing) {
		ctx.save();
		if(smoothing != null && ctx.imageSmoothingEnabled != smoothing) openfl_display_BitmapData.setSmoothing(ctx,smoothing);
		if(matrix != null) {
			if(matrix.a == 1 && matrix.b == 0 && matrix.c == 0 && matrix.d == 1) ctx.translate(matrix.tx,matrix.ty); else ctx.setTransform(matrix.a,matrix.b,matrix.c,matrix.d,matrix.tx,matrix.ty);
		}
		ctx.drawImage(this.handle(),0,0);
		ctx.restore();
	}
	,copyPixels: function(sourceBitmapData,sourceRect,destPoint,alphaBitmapData,alphaPoint,mergeAlpha) {
		if(mergeAlpha == null) mergeAlpha = false;
		this.syncCanvas();
		if(alphaBitmapData != null) throw new js__$Boot_HaxeError("alphaBitmapData is not supported yet.");
		var bit = sourceBitmapData.handle();
		var bw;
		var bh;
		var tw = this.component.width;
		var th = this.component.height;
		if(bit == null || (bw = bit.width) <= 0 || (bh = bit.height) <= 0) return;
		var dx = ~(~destPoint.x);
		var dy = ~(~destPoint.y);
		var sx;
		var sy;
		var sw;
		var sh;
		if(sourceRect != null) {
			sx = sourceRect.x;
			sy = sourceRect.y;
			sw = sourceRect.width;
			sh = sourceRect.height;
			if(sx < 0) {
				sw += sx;
				sx = 0;
			}
			if(sy < 0) {
				sh += sy;
				sy = 0;
			}
			if(sx + sw > bw) sw = bw - sx;
			if(sy + sh > bh) sh = bh - sy;
		} else {
			sx = sy = 0;
			sw = bw;
			sh = bh;
		}
		if(dx < 0) {
			sw += dx;
			sx -= dx;
			dx = 0;
		}
		if(dy < 0) {
			sh += dy;
			sy -= dy;
			dy = 0;
		}
		if(dx + sw > tw) sw = tw - dx;
		if(dy + sh > th) sh = th - dy;
		if(sw <= 0 || sh <= 0) return;
		if(this.__transparent && !mergeAlpha) this.context.clearRect(dx,dy,sw,sh);
		this.context.drawImage(bit,sx,sy,sw,sh,dx,dy,sw,sh);
		this.__sync |= 5;
	}
	,draw: function(source,matrix,colorTransform,blendMode,clipRect,smoothing) {
		this.syncCanvas();
		var a = 0;
		this.context.save();
		if(colorTransform != null) {
			a = colorTransform.alphaMultiplier;
			colorTransform.alphaMultiplier = 1;
			this.context.globalAlpha *= a;
		}
		if(clipRect != null) {
			this.context.beginPath();
			this.context.rect(clipRect.x,clipRect.y,clipRect.width,clipRect.height);
			this.context.clip();
			this.context.beginPath();
		}
		if(smoothing != null) openfl_display_BitmapData.setSmoothing(this.context,smoothing);
		source.drawToSurface(this.handle(),this.context,matrix,colorTransform,blendMode,clipRect,null);
		this.context.restore();
		if(colorTransform != null) colorTransform.alphaMultiplier = a;
		this.__sync |= 5;
	}
	,lock: function() {
		this.syncData();
	}
	,unlock: function() {
		this.syncCanvas();
	}
	,colorTransform: function(q,o) {
		var x = ~(~q.x);
		var y = ~(~q.y);
		var w = ~(~q.width);
		var h = ~(~q.height);
		var tw = this.component.width;
		var th = this.component.height;
		var f = this.context.globalCompositeOperation;
		var a = this.context.globalAlpha;
		if(x < 0) {
			w += x;
			x = 0;
		}
		if(y < 0) {
			h += y;
			y = 0;
		}
		if(x + w > tw) w = tw - x;
		if(y + h > th) h = th - y;
		if(w <= 0 || h <= 0) return;
		if(o.isAlphaMultiplier()) {
			this.syncCanvas();
			this.context.globalCompositeOperation = "copy";
			this.context.globalAlpha *= o.alphaMultiplier;
			this.context.drawImage(this.component,x,y,w,h,x,y,w,h);
			this.__sync |= 5;
		} else if(o.isColorSetter()) {
			var s = this.context.fillStyle;
			if(o.alphaMultiplier != 0) {
				this.context.globalCompositeOperation = "source-in";
				this.context.fillStyle = "rgb(" + ~(~o.redOffset) + "," + ~(~o.greenOffset) + "," + ~(~o.blueOffset) + ")";
				this.context.fillRect(x,y,w,h);
				this.context.globalCompositeOperation = "copy";
				this.context.globalAlpha = o.alphaMultiplier;
				this.context.drawImage(this.component,x,y,w,h,x,y,w,h);
			} else {
				this.context.globalCompositeOperation = "copy";
				this.context.fillStyle = "rgba(" + ~(~o.redOffset) + "," + ~(~o.greenOffset) + "," + ~(~o.blueOffset) + "," + ~(~o.alphaOffset) + ")";
				this.context.fillRect(x,y,w,h);
			}
			this.context.fillStyle = s;
		} else {
			var wasCanvas = (this.__sync & 3) != 2;
			this.lock();
			var d = this.__imageData.data;
			var c = tw * th * 4;
			var i = c;
			var v;
			var rm = o.redMultiplier;
			var gm = o.greenMultiplier;
			var bm = o.blueMultiplier;
			var am = o.alphaMultiplier;
			var ro = o.redOffset;
			var go = o.greenOffset;
			var bo = o.blueOffset;
			var ao = o.alphaOffset;
			if(x == 0 && y == 0 && w == tw && h == th) while((i -= 4) >= 0) {
				if((v = d[i + 3]) > 0) if((v = v * am + ao) < 0) d[i + 3] = 0; else if(v > 255) d[i + 3] = 255; else d[i + 3] = ~(~v);
				if((v = d[i + 2] * bm + bo) < 0) d[i + 2] = 0; else if(v > 255) d[i + 2] = 255; else d[i + 2] = ~(~v);
				if((v = d[i + 1] * gm + go) < 0) d[i + 1] = 0; else if(v > 255) d[i + 1] = 255; else d[i + 1] = ~(~v);
				if((v = d[i] * rm + ro) < 0) d[i] = 0; else if(v > 255) d[i] = 255; else d[i] = ~(~v);
			} else {
				var px;
				var py = y - 1;
				var pb = y + h;
				var pr;
				while(++py < pb) {
					i = tw * py + x - 1 << 2;
					pr = i + w * 4;
					while((i += 4) < pr) {
						if((v = d[i + 3]) > 0) if((v = v * am + ao) < 0) d[i + 3] = 0; else if(v > 255) d[i + 3] = 255; else d[i + 3] = ~(~v);
						if((v = d[i + 2] * bm + bo) < 0) d[i + 2] = 0; else if(v > 255) d[i + 2] = 255; else d[i + 2] = ~(~v);
						if((v = d[i + 1] * gm + go) < 0) d[i + 1] = 0; else if(v > 255) d[i + 1] = 255; else d[i + 1] = ~(~v);
						if((v = d[i] * rm + ro) < 0) d[i] = 0; else if(v > 255) d[i] = 255; else d[i] = ~(~v);
					}
				}
			}
			this.__sync |= 6;
			if(wasCanvas) this.unlock();
		}
		this.context.globalCompositeOperation = f;
		this.context.globalAlpha = a;
	}
	,jeashOnLoad: function(data,e) {
		var canvas = data.texture;
		var width = data.image.width;
		var height = data.image.height;
		canvas.width = width;
		canvas.height = height;
		var ctx = canvas.getContext("2d");
		ctx.drawImage(data.image,0,0,width,height);
		data.bitmapData.width = width;
		data.bitmapData.height = height;
		data.bitmapData.__rect = new openfl_geom_Rectangle(0,0,width,height);
		if(data.inLoader != null) {
			var e1 = new openfl_events_Event("complete");
			e1.set_target(data.inLoader);
			data.inLoader.dispatchEvent(e1);
		}
	}
	,nmeLoadFromFile: function(inFilename,inLoader) {
		var _g = this;
		var image = window.document.createElement("img");
		if(inLoader != null) {
			var data = { image : image, texture : this.component, inLoader : inLoader, bitmapData : this};
			image.addEventListener("load",(function(f,a1) {
				return function(e) {
					f(a1,e);
				};
			})($bind(this,this.jeashOnLoad),data),false);
			image.addEventListener("error",function(e1) {
				if(!image.complete) _g.jeashOnLoad(data,e1);
			},false);
		}
		image.src = inFilename;
	}
	,syncCanvas: function() {
		if(!((this.__sync & 3) != 2)) {
			this.context.putImageData(this.__imageData,0,0);
			this.__sync = this.__sync & -4;
		}
	}
	,syncData: function() {
		if(!((this.__sync & 3) != 1)) {
			this.__imageData = this.context.getImageData(0,0,this.component.width,this.component.height);
			this.__sync = this.__sync & -4;
		}
	}
	,__class__: openfl_display_BitmapData
};
var Main = function() {
	this.ignoreMouseEventsUntil = 0;
	this.isPressed = false;
	this.fontFillColors = ["#ffffff"];
	this.fontColors = null;
	this.tsavrOn = false;
	this.tsavrPos = 1;
	this.imgItems = (function($this) {
		var $r;
		var _this = window.document;
		$r = _this.createElement("img");
		return $r;
	}(this));
	this.tapi = false;
	Main._main = this;
	openfl_display_Sprite.call(this);
	this._point = new openfl_geom_Point();
	this._rect = new openfl_geom_Rectangle();
	this._offset = new openfl_geom_Matrix();
	this._alpha = new openfl_geom_ColorTransform();
	this._shape = new openfl_display_Shape();
	this._gfx = this._shape.graphics;
	this.addEventListener("addedToStage",$bind(this,this.onAdded));
	window.document.body.setAttribute("nolive","");
};
$hxClasses["Main"] = Main;
Main.__name__ = ["Main"];
Main.main = function() {
	openfl_Lib.get_current().get_stage().align = "TOP_LEFT";
	openfl_Lib.get_current().get_stage().scaleMode = "NO_SCALE";
	openfl_Lib.get_current().addChild(new Main());
};
Main.__super__ = openfl_display_Sprite;
Main.prototype = $extend(openfl_display_Sprite.prototype,{
	getStageWidth: function() {
		var wrapper = window.document.querySelector(".wrapper");
		return wrapper.scrollWidth;
	}
	,getStageHeight: function() {
		var wrapper = window.document.querySelector(".wrapper");
		return wrapper.scrollHeight;
	}
	,createScreen: function(sw,sh) {
		this.screen = new openfl_display_BitmapData(sw,sh,true,0);
		this.context = this.screen.context;
		return this.screen;
	}
	,onResize: function(_) {
		if(!this.inited) this.init();
		var sw = this.getStageWidth();
		var sh = this.getStageHeight();
		if(this.screen.component.width != sw || this.screen.component.height != sh) {
			if(this.screen != null) {
				this.screen.dispose();
				this.tsavrBit.dispose();
			}
			this.display.set_bitmapData(this.createScreen(sw,sh));
			this.createBz();
			this.onRender();
		}
	}
	,createBz: function() {
		var b = openfl_Assets.getBitmapData("img/overlay.png");
		var s = Std["int"](Math.max(this.screen.component.height / 2,200));
		var z = s / b.component.width;
		this.tsavrBit = new openfl_display_BitmapData(s,s,true,0);
		this._offset.identity();
		this._offset.scale(z,z);
		this.tsavrBit.draw(b,this._offset,null,null,null,true);
		this._offset.identity();
	}
	,initFontStyles: function() {
		var colors = [16744576,16772736,11206528,8449791,8432383,13402367,16744686];
		this.fontColors = colors;
		var _g = 0;
		while(_g < colors.length) {
			var color = colors[_g];
			++_g;
			this.fontFillColors.push("#" + StringTools.hex(color,6));
			var list = [];
			var _g1 = 0;
			var _g2 = this.font.pages[1];
			while(_g1 < _g2.length) {
				var page = _g2[_g1];
				++_g1;
				var bit = page.clone();
				bit.colorTransform(bit.__rect.clone(),new openfl_geom_ColorTransform(0,0,0,1,color >> 16 & 255,color >> 8 & 255,color & 255));
				list.push(bit);
			}
			this.font.pages.push(list);
		}
	}
	,initFont: function() {
		this.font = new utils_BMFont(24,24,17,1,[["img/shadow.png"],["img/color.png"]],[32,506,64,5,5,-2,21,7,33,98,68,7,20,-1,-1,5,34,129,161,12,9,-2,-1,6,35,117,128,13,16,-1,3,10,36,93,0,16,23,-2,-1,11,37,17,91,16,19,-1,0,14,38,313,66,18,19,-2,2,12,39,164,158,8,9,-2,-1,3,40,44,0,12,24,-1,-1,7,41,57,0,12,24,-3,-1,7,42,472,139,12,11,-1,1,10,43,417,139,12,12,-1,5,11,44,325,155,8,8,-2,13,5,45,410,152,12,7,0,7,12,46,446,152,7,7,-1,12,5,47,297,86,13,19,-2,0,8,48,145,126,13,16,-2,3,10,49,155,143,8,15,-1,3,5,50,424,105,15,17,-2,2,10,51,456,105,14,17,-2,2,10,52,381,44,14,20,-2,-1,10,53,336,45,14,20,-2,1,9,54,34,90,15,19,-2,1,11,55,240,106,13,18,-3,1,8,56,225,107,14,18,-2,1,9,57,0,70,12,20,-1,1,9,58,504,121,7,14,-1,5,5,59,172,126,8,16,-2,5,5,60,391,141,11,13,0,4,12,61,485,139,12,11,0,6,12,62,379,141,11,13,0,4,12,63,455,44,13,20,-2,-1,9,64,41,129,15,16,-2,3,12,65,368,65,17,19,-2,0,11,66,20,111,18,18,-2,1,14,67,160,107,16,18,-2,1,12,68,440,105,15,17,-1,2,12,69,472,64,16,19,-2,0,12,70,98,89,14,19,-1,0,11,71,19,48,18,20,-2,-1,14,72,366,44,14,20,-1,-1,12,73,369,106,8,18,-1,1,5,74,38,47,17,20,-2,-1,11,75,223,0,16,22,-1,-1,12,76,109,109,16,18,-2,1,11,77,387,105,19,17,-1,2,16,78,57,109,17,18,-1,1,14,79,50,89,15,19,-2,0,12,80,92,109,16,18,-3,1,10,81,110,0,16,23,-2,1,13,82,0,49,18,20,-2,1,12,83,144,46,16,20,-2,0,11,84,143,107,16,18,-2,1,10,85,193,107,15,18,-1,1,12,86,177,107,15,18,-2,1,11,87,493,22,18,20,-2,0,15,88,127,46,16,20,-2,0,11,89,306,45,14,20,-2,0,9,90,39,110,17,18,-2,1,11,91,181,0,10,23,-1,-1,7,92,325,86,13,19,-2,0,9,93,192,0,10,23,-2,-1,7,94,248,157,11,8,-2,0,6,95,352,155,27,7,-2,18,20,96,316,155,8,8,-2,0,5,97,105,145,12,15,-2,4,8,98,411,44,14,20,-2,-1,10,99,268,141,12,14,-2,5,8,100,396,44,14,20,-2,-1,10,101,406,123,13,15,-2,4,8,102,39,68,12,20,-2,-1,6,103,303,0,13,22,-2,4,9,104,441,44,13,20,-2,-1,10,105,500,103,8,17,-2,2,4,106,143,0,13,23,-5,1,5,107,0,130,13,17,-2,2,8,108,88,68,9,20,-2,-1,4,109,200,126,17,15,-2,4,14,110,199,142,13,14,-2,5,10,111,490,122,13,15,-2,4,9,112,401,22,13,21,-2,4,9,113,351,45,14,20,-2,5,10,114,281,141,12,14,-2,5,8,115,476,123,13,15,-2,4,8,116,347,106,10,18,-2,1,5,117,241,142,13,14,-2,5,10,118,213,142,13,14,-2,5,8,119,184,142,14,14,-2,5,10,120,103,128,13,16,-2,4,8,121,52,68,12,20,-2,5,7,122,349,125,14,15,-2,4,9,123,169,0,11,23,-1,-1,7,124,106,68,7,20,0,0,7,125,157,0,11,23,-2,-1,7,126,88,161,14,9,-2,5,10,160,478,151,5,5,-2,21,11,161,114,67,7,20,-1,4,5,162,323,106,12,18,-2,-1,8,163,471,105,14,17,-2,2,10,164,366,141,12,13,-2,5,8,165,426,44,14,20,-2,0,9,166,122,67,7,20,0,0,7,167,127,0,15,23,-1,0,12,168,435,152,10,7,-1,1,7,169,492,0,17,21,-1,-1,14,170,23,164,10,11,-1,0,8,171,498,138,11,11,-1,5,10,172,74,161,13,10,-2,7,9,173,397,155,12,7,-1,7,11,174,108,24,17,21,-1,-1,14,175,423,152,11,7,-1,1,7,176,45,164,10,11,-1,-1,8,177,255,141,12,14,-1,5,11,178,453,139,10,12,-1,-1,9,179,442,139,10,12,-1,-1,9,180,343,155,8,8,-2,0,5,181,199,87,13,19,-2,5,9,182,213,87,13,19,-2,0,10,183,454,152,7,7,-1,6,5,184,334,155,8,8,0,14,8,185,464,139,7,12,-1,-1,5,186,34,164,10,11,-1,0,8,187,0,164,11,11,-1,5,10,188,160,24,16,21,0,-1,14,189,92,47,17,20,0,-1,14,190,383,0,18,21,-2,-1,14,191,469,43,13,20,0,6,9,192,54,25,17,21,-2,-2,11,193,36,25,17,21,-2,-2,11,194,18,26,17,21,-2,-2,11,195,474,0,17,21,-2,-2,11,196,420,0,17,21,-2,-2,11,197,402,0,17,21,-2,-2,11,198,176,67,21,19,-2,0,16,199,178,46,16,20,-2,1,12,200,177,24,16,21,-2,-2,12,201,194,24,16,21,-2,-2,12,202,126,24,16,21,-2,-2,12,203,143,24,16,21,-2,-2,12,204,449,22,9,21,-2,-2,5,205,459,22,8,21,-1,-2,5,206,415,22,11,21,-2,-2,5,207,427,22,10,21,-2,-2,5,208,407,105,16,17,-2,2,12,209,72,25,17,21,-1,-2,14,210,339,23,15,21,-2,-2,12,211,275,23,15,21,-2,-2,12,212,259,23,15,21,-2,-2,12,213,243,23,15,21,-2,-2,12,214,371,22,15,21,-2,-2,12,215,430,139,11,12,-1,5,10,216,275,45,15,20,-1,-1,12,217,355,22,15,21,-1,-2,12,218,323,23,15,21,-1,-2,12,219,307,23,15,21,-1,-2,12,220,291,23,15,21,-1,-2,12,221,288,0,14,22,-2,-2,9,222,321,45,14,20,-2,-1,10,223,128,88,14,19,-2,0,10,224,395,85,12,19,-2,0,8,225,434,85,12,19,-2,0,8,226,408,85,12,19,-2,0,8,227,421,85,12,19,-2,0,8,228,310,106,12,18,-2,1,8,229,26,69,12,20,-2,-1,8,230,218,126,17,15,-2,4,13,231,28,130,12,17,-2,5,8,232,241,86,13,19,-2,0,8,233,185,87,13,19,-2,0,8,234,171,87,13,19,-2,0,8,235,254,106,13,18,-2,1,8,236,459,85,9,19,-2,0,4,237,479,84,8,19,-2,0,4,238,447,85,11,19,-2,0,4,239,336,106,10,18,-2,1,4,240,483,43,13,20,-2,-1,9,241,143,87,13,19,-2,0,10,242,367,86,13,19,-2,0,9,243,353,86,13,19,-2,0,9,244,339,86,13,19,-2,0,9,245,157,87,13,19,-2,0,9,246,268,106,13,18,-2,1,9,247,403,139,13,12,-1,5,11,248,131,128,13,16,-2,4,9,249,255,86,13,19,-2,0,10,250,269,86,13,19,-2,0,10,251,283,86,13,19,-2,0,10,252,282,106,13,18,-2,1,10,253,14,0,12,25,-2,0,7,254,0,0,13,26,-2,-1,9,255,70,0,12,24,-2,1,7,305,307,141,7,14,-1,5,4,321,126,109,16,18,-2,1,11,322,77,68,10,20,-2,-1,4,338,468,22,24,20,-1,-1,21,339,181,126,18,15,-2,4,13,352,240,0,16,22,-2,-2,11,353,381,85,13,19,-2,0,8,376,273,0,14,22,-2,-2,9,381,90,25,17,21,-2,-2,10,382,113,89,14,19,-2,0,8,402,27,0,16,24,-3,0,8,698,235,157,12,8,-2,0,8,710,272,156,11,8,-2,0,7,711,284,156,11,8,-2,0,7,728,296,156,10,8,-1,0,7,729,462,152,7,7,-2,1,5,730,154,161,9,9,-1,-1,8,731,307,156,8,8,0,14,8,732,260,156,11,8,-2,0,8,931,257,0,15,22,-1,0,11,937,350,66,17,19,-1,0,15,960,352,141,13,13,-1,6,11,1025,456,0,17,21,-2,-2,12,1028,161,46,16,20,-2,-1,11,1030,469,85,9,19,-2,0,5,1031,438,22,10,21,-2,-2,5,1040,332,66,17,19,-2,0,12,1041,237,66,18,19,-2,0,13,1042,256,66,18,19,-2,0,14,1043,66,89,15,19,-2,0,10,1044,218,66,18,19,-2,0,13,1045,438,65,16,19,-2,0,11,1046,130,67,22,19,-2,0,17,1047,82,89,15,19,-2,0,11,1048,209,107,15,18,-2,1,10,1049,211,23,15,21,-2,-2,10,1050,404,65,16,19,-2,0,11,1051,56,47,17,20,-2,0,12,1052,0,111,19,18,-2,1,14,1053,243,45,15,20,-2,-1,10,1054,421,65,16,19,-2,0,12,1055,455,65,16,19,-2,0,12,1056,75,109,16,18,-2,1,11,1057,275,66,18,19,-2,0,13,1058,489,64,16,19,-2,0,11,1059,259,45,15,20,-2,0,10,1060,488,84,21,18,-2,1,17,1061,110,46,16,20,-2,0,11,1062,438,0,17,21,-2,0,12,1063,291,45,14,20,-2,-1,9,1064,74,47,17,20,-2,-1,12,1065,203,0,19,22,-2,-1,14,1066,0,27,17,21,-2,-1,12,1067,344,0,19,21,-2,-1,15,1068,227,45,15,20,-2,-1,10,1069,386,65,17,19,-2,0,12,1070,198,67,19,19,-2,0,14,1071,294,66,18,19,-2,0,13,1072,118,145,12,15,-2,4,8,1073,311,86,13,19,-2,0,8,1074,14,148,12,15,-2,4,9,1075,40,148,12,15,-2,4,7,1076,331,0,12,22,-2,4,8,1077,462,123,13,15,-2,4,8,1078,286,125,15,15,-2,4,11,1079,92,145,12,15,-2,4,8,1080,0,148,13,15,-2,4,9,1081,486,104,13,17,-2,2,9,1082,364,125,13,15,-2,4,8,1083,448,123,13,15,-2,4,8,1084,253,125,16,15,-2,4,11,1085,27,148,12,15,-2,4,7,1086,434,123,13,15,-2,4,8,1087,334,125,14,15,-2,4,9,1088,387,22,13,21,-2,4,8,1089,392,123,13,15,-2,4,8,1090,236,126,16,15,-2,4,11,1091,317,0,13,22,-2,4,8,1092,364,0,18,21,-2,4,13,1093,73,128,14,16,-2,4,10,1094,88,128,14,16,-2,4,10,1095,143,145,11,15,-2,4,6,1096,302,125,15,15,-2,4,10,1097,57,128,15,16,-2,4,10,1098,420,123,13,15,-2,4,8,1099,318,125,15,15,-2,4,10,1100,131,145,11,15,-2,4,7,1101,378,125,13,15,-2,4,8,1102,270,125,15,15,-2,4,10,1103,227,142,13,14,-2,5,9,1105,14,130,13,17,-2,2,8,1108,53,146,12,15,-2,4,7,1110,378,106,8,18,-2,1,3,1111,358,106,10,18,-2,1,5,1168,211,45,15,20,-2,-1,10,1169,79,145,12,15,-2,4,7,8211,221,157,13,8,-1,7,10,8212,200,157,20,8,0,7,20,8216,173,158,8,9,-2,-1,5,8217,182,158,8,9,-2,-1,3,8218,191,157,8,9,-2,13,3,8220,142,161,11,9,-2,-1,8,8221,103,161,12,9,-2,-1,6,8222,116,161,12,9,-2,13,6,8224,65,68,11,20,-2,0,7,8225,497,43,12,20,-2,0,7,8226,12,164,10,11,-1,4,7,8230,380,155,16,7,-2,12,13,8240,153,67,22,19,0,0,20,8249,65,162,8,11,-1,5,7,8250,56,162,8,11,-1,5,7,8482,315,141,21,13,-3,0,16,8706,13,70,12,20,-2,-1,8,8710,0,91,16,19,-1,0,12,8719,227,23,15,21,-2,0,11,8725,195,46,15,20,-3,0,7,8729,470,152,7,7,-1,6,5,8730,296,106,13,18,-2,1,9,8734,164,143,19,14,-2,3,16,8747,83,0,9,24,-2,0,6,8776,337,141,14,13,-2,5,9,8800,294,141,12,14,0,4,11,8804,159,126,12,16,0,4,11,8805,66,145,12,15,0,4,11,9674,227,86,13,19,-1,0,11],[1040,1058,-1,1168,1169,-2,1043,1072,-2,1043,1075,-2,1043,1076,-2,1043,1077,-2,1043,1078,-2,1043,1079,-3,1043,1080,-2,1043,1082,-2,1043,1083,-2,1043,1084,-2,1043,1085,-2,1043,1086,-2,1043,1087,-3,1043,1088,-3,1043,1089,-2,1043,1090,-3,1043,1091,-3,1043,1092,-2,1043,1093,-3,1043,1094,-2,1043,1095,-3,1043,1096,-2,1043,1097,-2,1043,1098,-3,1043,1099,-2,1043,1100,-2,1043,1101,-2,1043,1102,-2,1043,1103,-2,1043,1108,-2,1043,1169,-2,1044,1058,-1,1168,1108,-2,1168,1103,-1,1046,1090,-1,1168,1102,-2,1168,1101,-2,1057,1060,-2,1168,1100,-2,1168,1099,-2,1168,1098,-3,1168,1097,-2,1168,1096,-2,1168,1095,-3,1168,1094,-2,1058,1087,-1,1168,1093,-3,1168,1092,-2,1058,1093,-1,1168,1091,-3,1168,1090,-3,1058,1098,-1,1168,1089,-2,1168,1088,-2,1168,1087,-3,1168,1086,-2,1168,1085,-2,1066,1058,-1,1168,1084,-2,1068,1058,-1,1168,1083,-1,1072,1058,-1,1076,1058,-1,1077,1058,-1,1078,1058,-1,1079,1058,-1,1080,1058,-1,1082,1058,-1,1083,1058,-1,1084,1058,-1,1085,1058,-1,1086,1058,-1,1088,1058,-1,1168,1082,-2,1090,1047,-1,1090,1058,-1,1168,1080,-2,1092,1058,-1,1093,1058,-1,1168,1079,-2,1094,1058,-1,1095,1058,-1,1096,1058,-1,1097,1058,-2,1098,1058,-1,1168,1078,-1,1168,1077,-2,1168,1076,-2,1099,1058,-1,1100,1058,-1,1168,1075,-2,1168,1072,-1,1101,1058,-1,1102,1058,-1,1168,1044,-1,1108,1058,-1]);
		this.font.unknown = 63;
		var underscore = this.font.glyphs.h[95];
		underscore.w -= 16;
		underscore.y -= 4;
		underscore.s -= 12;
		var sp = this.font.glyphs.h[32];
		var x = this.font.glyphs.h[120];
		var v = new utils_BMGlyph(sp.u,sp.v,sp.w,sp.h,sp.x,sp.y,x.s,sp.p);
		this.font.glyphs.h[8196] = v;
		v;
		this.initFontStyles();
	}
	,init: function() {
		var _g = this;
		if(this.inited) return;
		this.inited = true;
		utils_WebArgs.init();
		window.setTimeout(function() {
			_g.imgItems.src = "img/items.png";
		},250);
		this.bitPlayer = openfl_Assets.getBitmapData("img/visual.png");
		this.bitBuffs = openfl_Assets.getBitmapData("img/buffs.png");
		terra_Item.init();
		terra_Buff.setup();
		this.initFont();
		this.createScreen(this.getStageWidth(),this.getStageHeight());
		this.createBz();
		this.addChild(this.display = new openfl_display_Bitmap(this.screen));
		this.nodes = new dom_Container();
		this.player = new terra_Player();
		this.player.name = "Player";
		this.nodes.add(new app_TopPane());
		this.addEventListener("enterFrame",$bind(this,this.onFrame));
		this.addEventListener("rightMouseDown",$bind(this,this.onRightPressed));
		this.addEventListener("rightMouseUp",$bind(this,this.onRightReleased));
		this.addEventListener("middleMouseDown",$bind(this,this.onMiddlePressed));
		this.addEventListener("middleMouseUp",$bind(this,this.onMiddleReleased));
		this.addEventListener("mouseDown",$bind(this,this.onLeftPressed));
		this.addEventListener("mouseUp",$bind(this,this.onLeftReleased));
		this.addEventListener("mouseMove",$bind(this,this.onHover));
		this.addEventListener("mouseWheel",$bind(this,this.onWheel));
		window.addEventListener("contextmenu",function(e) {
			if(e.pageX < window.innerWidth - 168 && e.pageY < window.innerHeight - 98) e.preventDefault();
		});
		this.time = openfl_Lib.getTimer() / 1000;
		Lang.init();
		this.updateLang();
	}
	,updateLang: function() {
		dom_ButtonConfirm.confirmText = Lang.loc("misc","confirmText",dom_ButtonConfirm.confirmTextEn);
		app_TabLibrary.get_inst().updateLang();
		app_TabEdit.get_inst().updateLang();
		this.nodes.updateLang();
	}
	,updateBMF: function() {
		app_TabLibrary.get_inst().updateBMF();
		app_TabEdit.get_inst().updateBMF();
		if(Main.onRender_lbTooltip != null) Main.onRender_lbTooltip.updateBMF();
		this.nodes.updateBMF();
	}
	,onRender: function() {
		this.clear(this.screen,-12562320);
		var x;
		var y;
		var t = this.tsavrPos;
		if(this.tapi) {
			x = 1 - t * t;
			y = -4 - Math.cos(t * 40) * 4 * t;
		} else {
			x = 1 - t * t;
			y = -4 - Math.cos(t * 40) * 4;
		}
		this.draw(this.tsavrBit,this.screen.component.width - (this.tsavrBit.component.width * x | 0),this.screen.component.height - (this.tsavrBit.component.height + y | 0));
		this.nodes.render(0,0);
		var tb = this.mouseOver;
		if(tb != null && tb.tooltipText != null && tb.tooltipText != "") {
			var lbHoverText = Main.onRender_lbTooltip;
			if(lbHoverText == null) {
				lbHoverText = new dom_Label();
				lbHoverText.x = 16;
				lbHoverText.y = -8;
				lbHoverText.set_style(1);
				Main.onRender_lbTooltip = lbHoverText;
			}
			var ttText = tb.tooltipText;
			var ttIcon = tb.tooltipIcon;
			lbHoverText.set_text(ttText);
			var mx = this.posX;
			var my = this.posY;
			this.xrect(mx + 14,my - 10,lbHoverText.width + 5 + (ttIcon != 0?23:0),lbHoverText.height + 3,0,0.6);
			if(ttIcon != 0) {
				var dx = mx + lbHoverText.x;
				var dy = my + lbHoverText.y;
				this.context.drawImage(this.imgItems,(ttIcon & 31) * 40,(ttIcon >> 5) * 40,40,40,dx,dy,20,20);
				mx += 23;
			}
			lbHoverText.render(mx,my);
		}
	}
	,onFrame: function(_) {
		var i;
		var l;
		var now = openfl_Lib.getTimer() / 1000;
		this.delta = now - this.time;
		this.time = now;
		if(this.tsavrOn) this.tsavrPos = Math.max(this.tsavrPos - this.delta / 3.7,0);
		if(this.holdNode != null) {
			if(this.nodes.hitTest(this.posX,this.posY) == this.holdNode) {
				this.holdTime = (openfl_Lib.getTimer() - this.holdSince) / 1000;
				this.holdNode.hold(this.holdTime);
			} else {
				this.holdNode.released();
				this.holdNode = null;
			}
		}
		this.nodes.update(this.delta);
		this.onRender();
		this.nodes.system();
	}
	,onHover: function(_) {
		var x = this.posX = Std["int"](this.get_mouseX());
		var y = this.posY = Std["int"](this.get_mouseY());
		this.nodes.hover(x,y);
		this.mouseOver = this.nodes.hitTest(x,y);
	}
	,onWheel: function(_) {
		if(this.mouseOver != null) this.mouseOver.wheel(_.delta > 0?1:_.delta < 0?-1:0);
	}
	,doPressed: function(_) {
		if(this.isPressed) return;
		if(openfl_Lib.getTimer() < this.ignoreMouseEventsUntil) return;
		this.isPressed = true;
		var o;
		var x = this.posX = Std["int"](this.get_mouseX());
		var y = this.posY = Std["int"](this.get_mouseY());
		this.holdNode = this.nodes.hitTest(x,y);
		this.holdSince = openfl_Lib.getTimer();
	}
	,onLeftPressed: function(_) {
		this.shiftDown = _.shiftKey;
		this.ctrlDown = _.ctrlKey;
		this.altDown = _.altKey;
		this.doPressed(_);
	}
	,onRightPressed: function(_) {
		this.shiftDown = !_.shiftKey;
		this.ctrlDown = _.ctrlKey;
		this.doPressed(_);
	}
	,onMiddlePressed: function(_) {
		this.shiftDown = _.shiftKey;
		this.ctrlDown = !_.ctrlKey;
		this.doPressed(_);
	}
	,doReleased: function(_) {
		if(!this.isPressed) return;
		this.isPressed = false;
		var o;
		if(this.holdNode != null) {
			this.holdNode.released();
			this.holdNode = null;
		}
		o = this.nodes.hitTest(Std["int"](this.get_mouseX()),Std["int"](this.get_mouseY()));
		if(o != null) o.click();
	}
	,onLeftReleased: function(_) {
		this.shiftDown = _.shiftKey;
		this.ctrlDown = _.ctrlKey;
		this.doReleased(_);
	}
	,onRightReleased: function(_) {
		this.shiftDown = !_.shiftKey;
		this.ctrlDown = _.ctrlKey;
		this.doReleased(_);
	}
	,onMiddleReleased: function(_) {
		this.shiftDown = _.shiftKey;
		this.ctrlDown = !_.ctrlKey;
		this.doReleased(_);
	}
	,imax: function(a,b) {
		if(a > b) return a; else return b;
	}
	,textWidth: function(s) {
		this.context.font = dom_Label.canvasFont;
		return Math.ceil(this.context.measureText(s).width);
	}
	,blitText: function(lines,x,y,halign,valign,style,a) {
		var ctx = this.context;
		ctx.save();
		ctx.font = dom_Label.canvasFont;
		if(halign == 2) ctx.textAlign = "right"; else if(halign == 1) ctx.textAlign = "center"; else ctx.textAlign = "left";
		if(valign == 2) ctx.textBaseline = "bottom"; else if(valign == 1) ctx.textBaseline = "middle"; else ctx.textBaseline = "top";
		var _shadowColor = ctx.shadowColor;
		ctx.shadowColor = "black";
		ctx.fillStyle = this.fontFillColors[style - 1];
		ctx.strokeStyle = "black";
		ctx.lineWidth = 1;
		if(a != null) ctx.globalAlpha = a;
		var _g = 0;
		while(_g < lines.length) {
			var line = lines[_g];
			++_g;
			ctx.shadowBlur = 4;
			ctx.strokeText(line,x,y + 2 * (1 - valign));
			ctx.shadowBlur = 0;
			ctx.fillText(line,x,y + 2 * (1 - valign));
			y += dom_Label.canvasLineHeight;
		}
		ctx.restore();
	}
	,blit: function(bit,x,y) {
		this._point.x = x;
		this._point.y = y;
		this._rect.x = this._rect.y = 0;
		this._rect.width = bit.component.width;
		this._rect.height = bit.component.height;
		this.screen.copyPixels(bit,this._rect,this._point,null,null,true);
	}
	,draw: function(bit,x,y,a) {
		if(a == null) a = 1;
		this._offset.tx = x;
		this._offset.ty = y;
		this._alpha.alphaMultiplier = a;
		this.screen.draw(bit,this._offset,a < 1?this._alpha:null);
	}
	,drawPart: function(bit,l,t,w,h,x,y,a) {
		if(a == null) a = 1;
		var ctx = this.screen.context;
		var a0 = ctx.globalAlpha;
		ctx.globalAlpha *= a;
		ctx.drawImage(bit.component,l,t,w,h,x,y,w,h);
		ctx.globalAlpha = a0;
	}
	,clear: function(bit,c) {
		if(c == null) c = 0;
		if(c >>> 24 == 255) {
			var g = this._gfx;
			g.clear();
			g.beginFill(c & 16777215);
			g.drawRect(0,0,bit.component.width,bit.component.height);
			g.endFill();
			bit.draw(this._shape);
			return;
		}
		this._rect.x = this._rect.y = 0;
		this._rect.width = bit.component.width;
		this._rect.height = bit.component.height;
		bit.fillRect(this._rect,c);
	}
	,rect: function(x,y,w,h,c) {
		this._rect.x = x;
		this._rect.y = y;
		this._rect.width = w;
		this._rect.height = h;
		this.screen.fillRect(this._rect,c | -16777216);
	}
	,xrect: function(x,y,w,h,c,a) {
		if(a == null) a = 1;
		this._gfx.clear();
		this._gfx.beginFill(c,a);
		this._gfx.drawRect(x,y,w,h);
		this._gfx.endFill();
		this.screen.draw(this._shape);
	}
	,onAdded: function(e) {
		this.removeEventListener("addedToStage",$bind(this,this.onAdded));
		this.get_stage().addEventListener("resize",$bind(this,this.onResize));
		this.init();
	}
	,__class__: Main
});
var DocumentClass = function() {
	Main.call(this);
};
$hxClasses["DocumentClass"] = DocumentClass;
DocumentClass.__name__ = ["DocumentClass"];
DocumentClass.__super__ = Main;
DocumentClass.prototype = $extend(Main.prototype,{
	get_stage: function() {
		return openfl_Lib.get_current().get_stage();
	}
	,__class__: DocumentClass
});
var openfl_AssetLibrary = function() {
};
$hxClasses["openfl.AssetLibrary"] = openfl_AssetLibrary;
openfl_AssetLibrary.__name__ = ["openfl","AssetLibrary"];
openfl_AssetLibrary.prototype = {
	exists: function(id,type) {
		return false;
	}
	,getBitmapData: function(id) {
		return null;
	}
	,__class__: openfl_AssetLibrary
};
var DefaultAssetLibrary = function() {
	this.type = new haxe_ds_StringMap();
	this.path = new haxe_ds_StringMap();
	openfl_AssetLibrary.call(this);
	this.add("img/overlay.png",openfl_AssetType.IMAGE);
	this.add("img/buffs.png",openfl_AssetType.IMAGE);
	this.add("img/color.png",openfl_AssetType.IMAGE);
	this.add("img/nitems.png",openfl_AssetType.IMAGE);
	this.add("img/og.png",openfl_AssetType.IMAGE);
	this.add("img/shadow.png",openfl_AssetType.IMAGE);
	this.add("img/side.png",openfl_AssetType.IMAGE);
	this.add("img/visual.png",openfl_AssetType.IMAGE);
};
$hxClasses["DefaultAssetLibrary"] = DefaultAssetLibrary;
DefaultAssetLibrary.__name__ = ["DefaultAssetLibrary"];
DefaultAssetLibrary.__super__ = openfl_AssetLibrary;
DefaultAssetLibrary.prototype = $extend(openfl_AssetLibrary.prototype,{
	add: function(id,t,p) {
		this.type.set(id,t);
		this.path.set(id,p != null?p:id);
	}
	,exists: function(id,t) {
		var r = this.type.get(id);
		if(r != null) {
			if(r == t || t == null) return true;
			switch(t[1]) {
			case 5:
				return r == openfl_AssetType.MUSIC;
			case 4:
				return r == openfl_AssetType.SOUND;
			case 0:
				return true;
			default:
				return false;
			}
		}
		return false;
	}
	,getBitmapData: function(id) {
		var q;
		var key = this.path.get(id);
		q = ApplicationMain.loaders.get(key);
		var b = q.contentLoaderInfo.content;
		return b.bitmapData;
	}
	,__class__: DefaultAssetLibrary
});
var EReg = function(r,opt) {
	opt = opt.split("u").join("");
	this.r = new RegExp(r,opt);
};
$hxClasses["EReg"] = EReg;
EReg.__name__ = ["EReg"];
EReg.prototype = {
	match: function(s) {
		if(this.r.global) this.r.lastIndex = 0;
		this.r.m = this.r.exec(s);
		this.r.s = s;
		return this.r.m != null;
	}
	,matched: function(n) {
		if(this.r.m != null && n >= 0 && n < this.r.m.length) return this.r.m[n]; else throw new js__$Boot_HaxeError("EReg::matched");
	}
	,matchedPos: function() {
		if(this.r.m == null) throw new js__$Boot_HaxeError("No string matched");
		return { pos : this.r.m.index, len : this.r.m[0].length};
	}
	,matchSub: function(s,pos,len) {
		if(len == null) len = -1;
		if(this.r.global) {
			this.r.lastIndex = pos;
			this.r.m = this.r.exec(len < 0?s:HxOverrides.substr(s,0,pos + len));
			var b = this.r.m != null;
			if(b) this.r.s = s;
			return b;
		} else {
			var b1 = this.match(len < 0?HxOverrides.substr(s,pos,null):HxOverrides.substr(s,pos,len));
			if(b1) {
				this.r.s = s;
				this.r.m.index += pos;
			}
			return b1;
		}
	}
	,replace: function(s,by) {
		return s.replace(this.r,by);
	}
	,map: function(s,f) {
		var offset = 0;
		var buf = new StringBuf();
		do {
			if(offset >= s.length) break; else if(!this.matchSub(s,offset)) {
				buf.add(HxOverrides.substr(s,offset,null));
				break;
			}
			var p = this.matchedPos();
			buf.add(HxOverrides.substr(s,offset,p.pos - offset));
			buf.add(f(this));
			if(p.len == 0) {
				buf.add(HxOverrides.substr(s,p.pos,1));
				offset = p.pos + 1;
			} else offset = p.pos + p.len;
		} while(this.r.global);
		if(!this.r.global && offset > 0 && offset < s.length) buf.add(HxOverrides.substr(s,offset,null));
		return buf.b;
	}
	,__class__: EReg
};
var HxOverrides = function() { };
$hxClasses["HxOverrides"] = HxOverrides;
HxOverrides.__name__ = ["HxOverrides"];
HxOverrides.cca = function(s,index) {
	var x = s.charCodeAt(index);
	if(x != x) return undefined;
	return x;
};
HxOverrides.substr = function(s,pos,len) {
	if(pos != null && pos != 0 && len != null && len < 0) return "";
	if(len == null) len = s.length;
	if(pos < 0) {
		pos = s.length + pos;
		if(pos < 0) pos = 0;
	} else if(len < 0) len = s.length + len - pos;
	return s.substr(pos,len);
};
HxOverrides.indexOf = function(a,obj,i) {
	var len = a.length;
	if(i < 0) {
		i += len;
		if(i < 0) i = 0;
	}
	while(i < len) {
		if(a[i] === obj) return i;
		i++;
	}
	return -1;
};
HxOverrides.remove = function(a,obj) {
	var i = HxOverrides.indexOf(a,obj,0);
	if(i == -1) return false;
	a.splice(i,1);
	return true;
};
HxOverrides.iter = function(a) {
	return { cur : 0, arr : a, hasNext : function() {
		return this.cur < this.arr.length;
	}, next : function() {
		return this.arr[this.cur++];
	}};
};
var terra_ItemMeta = function(item) {
	this.lines = [];
	this.item = item;
};
$hxClasses["terra.ItemMeta"] = terra_ItemMeta;
terra_ItemMeta.__name__ = ["terra","ItemMeta"];
terra_ItemMeta.parse = function(item,source,wiki) {
	var pairs = source.split("|");
	var m = new terra_ItemMeta(item);
	var t = pairs.shift();
	if(t.indexOf("t") >= 0) m.add(terra_ItemMetaLine.Tile);
	if(t.indexOf("w") >= 0) m.add(terra_ItemMetaLine.Wall);
	if(t.indexOf("4") >= 0) m.add(terra_ItemMetaLine.Helmet);
	if(t.indexOf("5") >= 0) m.add(terra_ItemMetaLine.Shirt);
	if(t.indexOf("6") >= 0) m.add(terra_ItemMetaLine.Pants);
	if(t.indexOf("a") >= 0) m.add(terra_ItemMetaLine.Accessory);
	if(t.indexOf("1") >= 0) m.stack = 1;
	if(t.indexOf("H") >= 0) m.stack = 99;
	if(t.indexOf("K") >= 0) m.stack = 999;
	var tip = null;
	var crit = 4;
	var value = 0;
	var _g = 0;
	while(_g < pairs.length) {
		var pair = pairs[_g];
		++_g;
		var p = pair.indexOf("=");
		var v = HxOverrides.substr(pair,p + 1,null);
		var _g1 = HxOverrides.substr(pair,0,p);
		switch(_g1) {
		case "d":
			var dmg = Std.parseInt(v);
			var dps = null;
			if(source.indexOf("|t=") >= 0) {
				var _g2 = 0;
				while(_g2 < pairs.length) {
					var pair2 = pairs[_g2];
					++_g2;
					if(StringTools.startsWith(pair2,"t=")) {
						var t1 = Std.parseInt(pair2.substring(2));
						if(t1 != null && t1 > 0) dps = Math.round(dmg * 60 / t1);
						break;
					}
				}
			}
			if(t.indexOf("d") >= 0) m.add(terra_ItemMetaLine.MeleeDamage(dmg,dps));
			if(t.indexOf("r") >= 0) m.add(terra_ItemMetaLine.RangedDamage(dmg,dps));
			if(t.indexOf("m") >= 0) m.add(terra_ItemMetaLine.MagicDamage(dmg,dps));
			if(t.indexOf("s") >= 0) m.add(terra_ItemMetaLine.SummonDamage(dmg,dps)); else m.add(terra_ItemMetaLine.Crit(crit));
			break;
		case "s":
			m.stack = Std.parseInt(v);
			break;
		case "z":
			value = Std.parseInt(v);
			break;
		case "c":
			crit += Std.parseInt(v);
			break;
		case "D":
			m.add(terra_ItemMetaLine.Defense(Std.parseInt(v)));
			break;
		case "tp":
			m.add(terra_ItemMetaLine.PickaxePower(Std.parseInt(v)));
			break;
		case "tx":
			m.add(terra_ItemMetaLine.AxePower(Std.parseInt(v) * 5));
			break;
		case "th":
			m.add(terra_ItemMetaLine.HammerPower(Std.parseInt(v)));
			break;
		case "tf":
			m.add(terra_ItemMetaLine.FishingPower(Std.parseInt(v)));
			break;
		case "tr":
			m.add(terra_ItemMetaLine.RangeDelta(Std.parseInt(v)));
			break;
		case "hl":
			m.add(terra_ItemMetaLine.RestoresLife(Std.parseInt(v)));
			break;
		case "hm":
			m.add(terra_ItemMetaLine.RestoresMana(Std.parseInt(v)));
			break;
		case "rg":
			var v1 = Std.parseInt(v);
			app_TabResearch.goalPerItem.h[item.id] = v1;
			v1;
			break;
		case "t":
			var t2 = Std.parseInt(v);
			var ps;
			if(t2 > 0) ps = "" + (6000 / t2 | 0) / 100; else ps = null;
			m.add(terra_ItemMetaLine.UseTime(t2,ps));
			break;
		case "k":
			m.add(terra_ItemMetaLine.Knockback(parseFloat(v)));
			break;
		case "m":
			m.add(terra_ItemMetaLine.ManaCost(Std.parseInt(v)));
			break;
		case "1":case "2":case "3":case "4":case "5":
			if(tip != null) tip += "\n" + v; else tip = v;
			break;
		}
	}
	if(t.indexOf("c") >= 0) m.add(terra_ItemMetaLine.Consumable);
	if(t.indexOf("v") >= 0) m.add(terra_ItemMetaLine.Vanity);
	if(t.indexOf("b") >= 0) m.add(terra_ItemMetaLine.Ammo);
	if(t.indexOf("x") >= 0) m.add(terra_ItemMetaLine.Material);
	if(tip != null) m.add(terra_ItemMetaLine.EnText(tip));
	if(m.stack > 1 && wiki) m.add(terra_ItemMetaLine.MaxStack(m.stack));
	if(wiki && value > 0) {
		var v2 = "";
		var i = value / 5 | 0;
		if(i > 0) {
			if(i % 100 != 0) v2 = "[$c]" + i % 100 + " " + v2;
			i = i / 100 | 0;
			if(i > 0) {
				if(i % 100 != 0) v2 = "[$s]" + i % 100 + " " + v2;
				i = i / 100 | 0;
				if(i > 0) {
					if(i % 100 != 0) v2 = "[$g]" + i % 100 + " " + v2;
					i = i / 100 | 0;
					if(i > 0) v2 = "[$p]" + i + " " + v2;
				}
			}
		}
		m.add(terra_ItemMetaLine.Worth(HxOverrides.substr(v2,0,v2.length - 1)));
	}
	return m;
};
terra_ItemMeta.initLang = function() {
	var m = new terra_ItemMeta(null);
	m.lines = [terra_ItemMetaLine.Tile,terra_ItemMetaLine.Wall,terra_ItemMetaLine.Helmet,terra_ItemMetaLine.Shirt,terra_ItemMetaLine.Pants,terra_ItemMetaLine.Accessory,terra_ItemMetaLine.MeleeDamage(1,1),terra_ItemMetaLine.RangedDamage(1,1),terra_ItemMetaLine.MagicDamage(1,1),terra_ItemMetaLine.SummonDamage(1,1),terra_ItemMetaLine.Crit(1),terra_ItemMetaLine.Defense(1),terra_ItemMetaLine.PickaxePower(1),terra_ItemMetaLine.AxePower(1),terra_ItemMetaLine.HammerPower(1),terra_ItemMetaLine.RangeDelta(1),terra_ItemMetaLine.FishingPower(1),terra_ItemMetaLine.RestoresLife(1),terra_ItemMetaLine.RestoresMana(1),terra_ItemMetaLine.UseTime(8,"?"),terra_ItemMetaLine.UseTime(20,"?"),terra_ItemMetaLine.UseTime(25,"?"),terra_ItemMetaLine.UseTime(30,"?"),terra_ItemMetaLine.UseTime(35,"?"),terra_ItemMetaLine.UseTime(45,"?"),terra_ItemMetaLine.UseTime(55,"?"),terra_ItemMetaLine.UseTime(65,"?"),terra_ItemMetaLine.Knockback(1),terra_ItemMetaLine.Knockback(3),terra_ItemMetaLine.Knockback(4),terra_ItemMetaLine.Knockback(6),terra_ItemMetaLine.Knockback(7),terra_ItemMetaLine.Knockback(9),terra_ItemMetaLine.Knockback(11),terra_ItemMetaLine.Knockback(12),terra_ItemMetaLine.ManaCost(1),terra_ItemMetaLine.Consumable,terra_ItemMetaLine.Vanity,terra_ItemMetaLine.Ammo,terra_ItemMetaLine.Material,terra_ItemMetaLine.MaxStack(1)];
	m.toString();
};
terra_ItemMeta.prototype = {
	toString: function(lineFilter) {
		var r = [];
		var cat = "meta.item";
		var add = function(key,en) {
			r.push(Lang.loc(cat,key,en));
		};
		var add1 = function(key1,en1,v1) {
			var v = StringTools.replace(Lang.loc(cat,key1,en1),"$1",Std.string(v1));
			r.push(v);
		};
		var add2 = function(key2,en2,v11,v2) {
			var v3 = Lang.loc(cat,key2,en2);
			v3 = StringTools.replace(v3,"$1",Std.string(v11));
			v3 = StringTools.replace(v3,"$2",Std.string(v2));
			r.push(v3);
		};
		var addDmg = function(key3,en3,dmg,dps) {
			var v4 = StringTools.replace(Lang.loc(cat,key3,en3),"$1","" + dmg);
			if(dps != null) v4 += StringTools.replace(Lang.loc(cat,"damagePerSecond"," (~$1 DPS)"),"$1","" + dps);
			r.push(v4);
		};
		var _g = 0;
		var _g1 = this.lines;
		while(_g < _g1.length) {
			var m = _g1[_g];
			++_g;
			if(lineFilter == null || lineFilter(m)) switch(m[1]) {
			case 0:
				add("isTile","Can be placed (tile)");
				break;
			case 1:
				add("isWall","Can be placed (wall)");
				break;
			case 2:
				add("isHelmet","Equipable (head slot)");
				break;
			case 3:
				add("isShirt","Equipable (body slot)");
				break;
			case 4:
				add("isPants","Equipable (legs slot)");
				break;
			case 5:
				add("isAccessory","Equipable (accessory)");
				break;
			case 10:
				var c = m[2];
				add1("critChance","$1% critical strike chance","" + c);
				break;
			case 6:
				var dps1 = m[3];
				var amt = m[2];
				addDmg("meleeDamage","$1 melee damage",amt,dps1);
				break;
			case 7:
				var dps2 = m[3];
				var amt1 = m[2];
				addDmg("rangedDamage","$1 ranged damage",amt1,dps2);
				break;
			case 8:
				var dps3 = m[3];
				var amt2 = m[2];
				addDmg("magicDamage","$1 magic damage",amt2,dps3);
				break;
			case 9:
				var dps4 = m[3];
				var amt3 = m[2];
				addDmg("summonDamage","$1 summon damage",amt3,dps4);
				break;
			case 11:
				var v5 = m[2];
				add1("defense","$1 defense",v5);
				break;
			case 12:
				var v6 = m[2];
				add1("pickaxePower","$1% pickaxe power",v6);
				break;
			case 13:
				var v7 = m[2];
				add1("axePower","$1% axe power",v7);
				break;
			case 14:
				var v8 = m[2];
				add1("hammerPower","$1% hammer power",v8);
				break;
			case 16:
				var v9 = m[2];
				add1("fishingPower","$1% fishing power",v9);
				break;
			case 15:
				var v10 = m[2];
				add1("rangeDelta","$1 range",v10 < 0?"" + v10:"+" + v10);
				break;
			case 17:
				var v12 = m[2];
				add1("restoresLife","Restores $1 life",v12);
				break;
			case 18:
				var v13 = m[2];
				add1("restoresMana","Restores $1 mana",v13);
				break;
			case 19:
				var ps = m[3];
				var t = m[2];
				var s = StringTools.replace(Lang.loc(cat,"useTime","Use time $1"),"$1","" + t);
				if(ps != null) {
					var s1 = Lang.loc(cat,"useTimeClass"," ($1/s, $2)");
					var c1;
					if(t <= 8) c1 = Lang.loc(cat,"useTime.insanelyFast","insanely fast"); else if(t <= 20) c1 = Lang.loc(cat,"useTime.veryFast","very fast"); else if(t <= 25) c1 = Lang.loc(cat,"useTime.fast","fast"); else if(t <= 30) c1 = Lang.loc(cat,"useTime.average","average"); else if(t <= 35) c1 = Lang.loc(cat,"useTime.slow","slow"); else if(t <= 45) c1 = Lang.loc(cat,"useTime.verySlow","very slow"); else if(t <= 55) c1 = Lang.loc(cat,"useTime.extremelySlow","extremely slow"); else c1 = Lang.loc(cat,"useTime.insanelySlow","insanely slow");
					s += StringTools.replace(StringTools.replace(s1,"$1",ps),"$2",c1);
				}
				r.push(s);
				break;
			case 20:
				var k = m[2];
				var s2 = Lang.loc(cat,"knockback","Knockback $1 ($2)");
				var c2;
				if(k <= 1.5) c2 = Lang.loc(cat,"knockback.extremelyWeak","extremely weak"); else if(k <= 3) c2 = Lang.loc(cat,"knockback.veryWeak","very weak"); else if(k <= 4) c2 = Lang.loc(cat,"knockback.weak","weak"); else if(k <= 6) c2 = Lang.loc(cat,"knockback.average","average"); else if(k <= 7) c2 = Lang.loc(cat,"knockback.strong","strong"); else if(k <= 9) c2 = Lang.loc(cat,"knockback.veryStrong","very strong"); else if(k <= 11) c2 = Lang.loc(cat,"knockback.extremelyStrong","extremely strong"); else c2 = Lang.loc(cat,"knockback.insane","insane");
				r.push(StringTools.replace(StringTools.replace(s2,"$1","" + k),"$2",c2));
				break;
			case 22:
				add("isConsumable","Consumable");
				break;
			case 23:
				add("isVanity","Vanity item");
				break;
			case 24:
				add("isAmmo","Ammo");
				break;
			case 25:
				add("isMaterial","Material");
				break;
			case 27:
				var n = m[2];
				add1("maxStack","Max stack $1",n);
				break;
			case 28:
				var s3 = m[2];
				add1("worth","Worth $1",s3);
				break;
			case 21:
				var n1 = m[2];
				add1("manaCost","Uses $1 mana",n1);
				break;
			case 29:
				var n2 = m[2];
				add1("researchGoal","Takes $1 to research in Journey Mode",n2);
				break;
			case 26:
				var en4 = m[2];
				var s4 = en4;
				if(this.item.pid != null) s4 = Lang.iloc("ItemTooltip",this.item.pid,en4);
				r.push(s4);
				break;
			}
		}
		return r.join("\n");
	}
	,add: function(ml) {
		this.lines.push(ml);
	}
	,__class__: terra_ItemMeta
};
var terra_ItemMetaLine = $hxClasses["terra.ItemMetaLine"] = { __ename__ : true, __constructs__ : ["Tile","Wall","Helmet","Shirt","Pants","Accessory","MeleeDamage","RangedDamage","MagicDamage","SummonDamage","Crit","Defense","PickaxePower","AxePower","HammerPower","RangeDelta","FishingPower","RestoresLife","RestoresMana","UseTime","Knockback","ManaCost","Consumable","Vanity","Ammo","Material","EnText","MaxStack","Worth","ResearchGoal"] };
terra_ItemMetaLine.Tile = ["Tile",0];
terra_ItemMetaLine.Tile.toString = $estr;
terra_ItemMetaLine.Tile.__enum__ = terra_ItemMetaLine;
terra_ItemMetaLine.Wall = ["Wall",1];
terra_ItemMetaLine.Wall.toString = $estr;
terra_ItemMetaLine.Wall.__enum__ = terra_ItemMetaLine;
terra_ItemMetaLine.Helmet = ["Helmet",2];
terra_ItemMetaLine.Helmet.toString = $estr;
terra_ItemMetaLine.Helmet.__enum__ = terra_ItemMetaLine;
terra_ItemMetaLine.Shirt = ["Shirt",3];
terra_ItemMetaLine.Shirt.toString = $estr;
terra_ItemMetaLine.Shirt.__enum__ = terra_ItemMetaLine;
terra_ItemMetaLine.Pants = ["Pants",4];
terra_ItemMetaLine.Pants.toString = $estr;
terra_ItemMetaLine.Pants.__enum__ = terra_ItemMetaLine;
terra_ItemMetaLine.Accessory = ["Accessory",5];
terra_ItemMetaLine.Accessory.toString = $estr;
terra_ItemMetaLine.Accessory.__enum__ = terra_ItemMetaLine;
terra_ItemMetaLine.MeleeDamage = function(amt,dps) { var $x = ["MeleeDamage",6,amt,dps]; $x.__enum__ = terra_ItemMetaLine; $x.toString = $estr; return $x; };
terra_ItemMetaLine.RangedDamage = function(amt,dps) { var $x = ["RangedDamage",7,amt,dps]; $x.__enum__ = terra_ItemMetaLine; $x.toString = $estr; return $x; };
terra_ItemMetaLine.MagicDamage = function(amt,dps) { var $x = ["MagicDamage",8,amt,dps]; $x.__enum__ = terra_ItemMetaLine; $x.toString = $estr; return $x; };
terra_ItemMetaLine.SummonDamage = function(amt,dps) { var $x = ["SummonDamage",9,amt,dps]; $x.__enum__ = terra_ItemMetaLine; $x.toString = $estr; return $x; };
terra_ItemMetaLine.Crit = function(chance) { var $x = ["Crit",10,chance]; $x.__enum__ = terra_ItemMetaLine; $x.toString = $estr; return $x; };
terra_ItemMetaLine.Defense = function(def) { var $x = ["Defense",11,def]; $x.__enum__ = terra_ItemMetaLine; $x.toString = $estr; return $x; };
terra_ItemMetaLine.PickaxePower = function(v) { var $x = ["PickaxePower",12,v]; $x.__enum__ = terra_ItemMetaLine; $x.toString = $estr; return $x; };
terra_ItemMetaLine.AxePower = function(v) { var $x = ["AxePower",13,v]; $x.__enum__ = terra_ItemMetaLine; $x.toString = $estr; return $x; };
terra_ItemMetaLine.HammerPower = function(v) { var $x = ["HammerPower",14,v]; $x.__enum__ = terra_ItemMetaLine; $x.toString = $estr; return $x; };
terra_ItemMetaLine.RangeDelta = function(v) { var $x = ["RangeDelta",15,v]; $x.__enum__ = terra_ItemMetaLine; $x.toString = $estr; return $x; };
terra_ItemMetaLine.FishingPower = function(v) { var $x = ["FishingPower",16,v]; $x.__enum__ = terra_ItemMetaLine; $x.toString = $estr; return $x; };
terra_ItemMetaLine.RestoresLife = function(amt) { var $x = ["RestoresLife",17,amt]; $x.__enum__ = terra_ItemMetaLine; $x.toString = $estr; return $x; };
terra_ItemMetaLine.RestoresMana = function(amt) { var $x = ["RestoresMana",18,amt]; $x.__enum__ = terra_ItemMetaLine; $x.toString = $estr; return $x; };
terra_ItemMetaLine.UseTime = function(t,perSecond) { var $x = ["UseTime",19,t,perSecond]; $x.__enum__ = terra_ItemMetaLine; $x.toString = $estr; return $x; };
terra_ItemMetaLine.Knockback = function(amt) { var $x = ["Knockback",20,amt]; $x.__enum__ = terra_ItemMetaLine; $x.toString = $estr; return $x; };
terra_ItemMetaLine.ManaCost = function(amt) { var $x = ["ManaCost",21,amt]; $x.__enum__ = terra_ItemMetaLine; $x.toString = $estr; return $x; };
terra_ItemMetaLine.Consumable = ["Consumable",22];
terra_ItemMetaLine.Consumable.toString = $estr;
terra_ItemMetaLine.Consumable.__enum__ = terra_ItemMetaLine;
terra_ItemMetaLine.Vanity = ["Vanity",23];
terra_ItemMetaLine.Vanity.toString = $estr;
terra_ItemMetaLine.Vanity.__enum__ = terra_ItemMetaLine;
terra_ItemMetaLine.Ammo = ["Ammo",24];
terra_ItemMetaLine.Ammo.toString = $estr;
terra_ItemMetaLine.Ammo.__enum__ = terra_ItemMetaLine;
terra_ItemMetaLine.Material = ["Material",25];
terra_ItemMetaLine.Material.toString = $estr;
terra_ItemMetaLine.Material.__enum__ = terra_ItemMetaLine;
terra_ItemMetaLine.EnText = function(s) { var $x = ["EnText",26,s]; $x.__enum__ = terra_ItemMetaLine; $x.toString = $estr; return $x; };
terra_ItemMetaLine.MaxStack = function(n) { var $x = ["MaxStack",27,n]; $x.__enum__ = terra_ItemMetaLine; $x.toString = $estr; return $x; };
terra_ItemMetaLine.Worth = function(s) { var $x = ["Worth",28,s]; $x.__enum__ = terra_ItemMetaLine; $x.toString = $estr; return $x; };
terra_ItemMetaLine.ResearchGoal = function(n) { var $x = ["ResearchGoal",29,n]; $x.__enum__ = terra_ItemMetaLine; $x.toString = $estr; return $x; };
var Lang = function() { };
$hxClasses["Lang"] = Lang;
Lang.__name__ = ["Lang"];
Lang.initDefLang = function() {
	var map = { };
	Lang.defLang = map;
	terra_ItemMeta.initLang();
	var dfm = { };
	dfm.name = "English";
	dfm.useBitmapFont = true;
	dfm.itemLocale = "en-US";
	map.misc = dfm;
	return map;
};
Lang.capitalize = function(s) {
	return s.charAt(0).toUpperCase() + HxOverrides.substr(s,1,null);
};
Lang.makeID = function(s) {
	s = new EReg("[^\\w]+","g").replace(s,"");
	return s.charAt(0).toLowerCase() + HxOverrides.substr(s,1,null);
};
Lang.loc = function(cat,key,en) {
	if(Lang.isDebug) return "" + cat + "/" + key;
	var cl = Lang.curLang;
	if(cl != null) {
		var cato = cl[cat];
		if(cato != null) {
			var catv = cato[key];
			if(catv != null) return catv;
		}
	} else if(en != null) {
		var cato1 = Lang.defLang[cat];
		if(cato1 == null) {
			var value = cato1 = { };
			Lang.defLang[cat] = value;
		}
		cato1[key] = en;
	}
	return en;
};
Lang.loc1 = function(cat,key,en,v1) {
	var s = Lang.loc(cat,key,en);
	if(Lang.isDebug) return "" + s + "(" + v1 + ")"; else return StringTools.replace(s,"$1",v1);
};
Lang.iloc = function(cat,key,en) {
	if(Lang.isDebug) return "@" + cat + "/" + key;
	var ij = Lang.itemsJSON;
	var result = null;
	if(ij != null) {
		var cato = ij[cat];
		if(cato != null) result = cato[key];
	}
	if(result == null) result = en;
	if(result != null) {
		var _g = 0;
		while(_g < 8) {
			var iter = _g++;
			var more = [false];
			result = Lang.rxIVar.map(result,(function(more) {
				return function(rx) {
					var k1 = rx.matched(1);
					var k2 = rx.matched(2);
					var c1 = ij[k1];
					var v1;
					if(c1 != null) {
						v1 = c1[k2];
						if(v1 != null) {
							if(v1.indexOf("{$") >= 0) more[0] = true;
							return v1;
						}
					}
					var ije = Lang.itemsJSONen;
					if(ije == null) {
						ije = Lang.zip.getJSON("Terraria.Localization.Content.en-US.Items.json");
						Lang.itemsJSONen = ije;
					}
					c1 = ije[k1];
					if(c1 != null) {
						v1 = c1[k2];
						if(v1 != null) {
							if(v1.indexOf("{$") >= 0) more[0] = true;
							return v1;
						}
					}
					return k2;
				};
			})(more));
			if(!more[0]) break;
		}
	}
	return result;
};
Lang.ttip = function(cat,key,en) {
	if(Lang.isDebug) return "" + cat + "/" + key + ".ttip";
	return Lang.loc(cat,key + ".ttip",en);
};
Lang.getDefLang = $hx_exports.getLang = function() {
	return Lang.defLang;
};
Lang.detectBMFont = function() {
	if(Lang.noBMFont) return false;
	if(Lang.curLang == null) return true;
	var misc = Lang.curLang.misc;
	if(misc != null) return !(!misc.useBitmapFont); else return false;
};
Lang.setLang = function(_lang,useBMFont) {
	var lang;
	var custom;
	if(_lang == null || typeof(_lang) == "string") {
		lang = _lang;
		custom = null;
	} else {
		lang = "custom";
		custom = _lang;
	}
	Lang.langCode = lang;
	if(lang == "debug") {
		lang = null;
		Lang.isDebug = true;
	} else Lang.isDebug = false;
	if(lang != null) {
		if(custom != null) Lang.curLang = custom; else Lang.curLang = Lang.zip.getJSON("Terrasavr." + lang + ".json");
		var il = Lang.loc("misc","itemLocale","en-US");
		Lang.itemsJSON = Lang.zip.getJSON("Terraria.Localization.Content." + il + ".Items.json");
		if(il == "en-EN") Lang.itemsJSONen = Lang.itemsJSON;
	} else {
		Lang.itemsJSON = null;
		Lang.curLang = null;
	}
	var _g = 0;
	var _g1 = terra_Item.list;
	while(_g < _g1.length) {
		var item = _g1[_g];
		++_g;
		item.updateLang();
	}
	var _g2 = 0;
	var _g11 = terra_ItemPrefix.pairDefs;
	while(_g2 < _g11.length) {
		var def = _g11[_g2];
		++_g2;
		def.updateLang();
	}
	var _g3 = 0;
	var _g12 = terra_ItemPrefix.list;
	while(_g3 < _g12.length) {
		var p = _g12[_g3];
		++_g3;
		p.updateLang();
	}
	if(useBMFont == null) useBMFont = Lang.detectBMFont();
	if(Lang.noBMFont) useBMFont = false;
	if(useBMFont != dom_Label.useBMFont) {
		dom_Label.useBMFont = useBMFont;
		Main._main.updateBMF();
	}
	Main._main.updateLang();
	app_TopPane.inst.btLang.set_text(Lang.loc("misc","langName","English"));
};
Lang.init = function() {
	var ls = window.localStorage;
	if(ls != null) {
		Lang.noBMFont = ls.getItem("terrasavr.useSystemFont") == "true";
		Lang.useCustomFont = ls.getItem("terrasavr.useCustomFont") == "true";
		var cf = window.localStorage.getItem("terrasavr.customFont");
		if(cf != null && cf != "") {
			app_TabLang.inst.fdCustomFont.set_value(cf);
			dom_Label.canvasFont = dom_Label.canvasFontPre + cf;
		}
	}
	Lang.zip = new utils_PakoZip("lang/lang.zip?v=21-06-16",function(pz) {
		if(pz.ready) {
			app_TopPane.inst.add(app_TopPane.inst.btLang);
			var v = utils_WebArgs.map.get("lang");
			if(v != null) Lang.setLang(v); else if(ls != null) {
				var id = ls.getItem("terrasavr.lang");
				Lang.setLang(id);
			}
		}
	});
};
var List = function() {
	this.length = 0;
};
$hxClasses["List"] = List;
List.__name__ = ["List"];
List.prototype = {
	add: function(item) {
		var x = [item];
		if(this.h == null) this.h = x; else this.q[1] = x;
		this.q = x;
		this.length++;
	}
	,push: function(item) {
		var x = [item,this.h];
		this.h = x;
		if(this.q == null) this.q = x;
		this.length++;
	}
	,__class__: List
};
Math.__name__ = ["Math"];
var NMEPreloader = function() {
	openfl_display_Sprite.call(this);
	var backgroundColor = this.getBackgroundColor();
	var r = backgroundColor >> 16 & 255;
	var g = backgroundColor >> 8 & 255;
	var b = backgroundColor & 255;
	var perceivedLuminosity = 0.299 * r + 0.587 * g + 0.114 * b;
	var color = 0;
	if(perceivedLuminosity < 70) color = 16777215;
	var x = 30;
	var height = 7;
	var y = this.getHeight() / 2 - height / 2;
	var width = this.getWidth() - x * 2;
	var padding = 2;
	this.outline = new openfl_display_Sprite();
	this.outline.get_graphics().beginFill(color,0.07);
	this.outline.get_graphics().drawRect(0,0,width,height);
	this.outline.set_x(x);
	this.outline.set_y(y);
	this.addChild(this.outline);
	this.progress = new openfl_display_Sprite();
	this.progress.get_graphics().beginFill(color,0.35);
	this.progress.get_graphics().drawRect(0,0,width - padding * 2,height - padding * 2);
	this.progress.set_x(x + padding);
	this.progress.set_y(y + padding);
	this.progress.set_scaleX(0);
	this.addChild(this.progress);
};
$hxClasses["NMEPreloader"] = NMEPreloader;
NMEPreloader.__name__ = ["NMEPreloader"];
NMEPreloader.__super__ = openfl_display_Sprite;
NMEPreloader.prototype = $extend(openfl_display_Sprite.prototype,{
	getBackgroundColor: function() {
		return 4214896;
	}
	,getHeight: function() {
		var height = 0;
		if(height > 0) return height; else return openfl_Lib.get_current().get_stage().get_stageHeight();
	}
	,getWidth: function() {
		var width = 0;
		if(width > 0) return width; else return openfl_Lib.get_current().get_stage().get_stageWidth();
	}
	,onInit: function() {
	}
	,onLoaded: function() {
		this.dispatchEvent(new openfl_events_Event("complete"));
	}
	,onUpdate: function(bytesLoaded,bytesTotal) {
		var percentLoaded = bytesLoaded / bytesTotal;
		if(percentLoaded > 1) percentLoaded = 1;
		this.progress.set_scaleX(percentLoaded);
	}
	,__class__: NMEPreloader
});
var Reflect = function() { };
$hxClasses["Reflect"] = Reflect;
Reflect.__name__ = ["Reflect"];
Reflect.field = function(o,field) {
	try {
		return o[field];
	} catch( e ) {
		if (e instanceof js__$Boot_HaxeError) e = e.val;
		return null;
	}
};
Reflect.fields = function(o) {
	var a = [];
	if(o != null) {
		var hasOwnProperty = Object.prototype.hasOwnProperty;
		for( var f in o ) {
		if(f != "__id__" && f != "hx__closures__" && hasOwnProperty.call(o,f)) a.push(f);
		}
	}
	return a;
};
Reflect.isFunction = function(f) {
	return typeof(f) == "function" && !(f.__name__ || f.__ename__);
};
Reflect.compareMethods = function(f1,f2) {
	if(f1 == f2) return true;
	if(!Reflect.isFunction(f1) || !Reflect.isFunction(f2)) return false;
	return f1.scope == f2.scope && f1.method == f2.method && f1.method != null;
};
var Std = function() { };
$hxClasses["Std"] = Std;
Std.__name__ = ["Std"];
Std.string = function(s) {
	return js_Boot.__string_rec(s,"");
};
Std["int"] = function(x) {
	return x | 0;
};
Std.parseInt = function(x) {
	var v = parseInt(x,10);
	if(v == 0 && (HxOverrides.cca(x,1) == 120 || HxOverrides.cca(x,1) == 88)) v = parseInt(x);
	if(isNaN(v)) return null;
	return v;
};
var StringBuf = function() {
	this.b = "";
};
$hxClasses["StringBuf"] = StringBuf;
StringBuf.__name__ = ["StringBuf"];
StringBuf.prototype = {
	add: function(x) {
		this.b += Std.string(x);
	}
	,__class__: StringBuf
};
var StringTools = function() { };
$hxClasses["StringTools"] = StringTools;
StringTools.__name__ = ["StringTools"];
StringTools.htmlEscape = function(s,quotes) {
	s = s.split("&").join("&amp;").split("<").join("&lt;").split(">").join("&gt;");
	if(quotes) return s.split("\"").join("&quot;").split("'").join("&#039;"); else return s;
};
StringTools.startsWith = function(s,start) {
	return s.length >= start.length && HxOverrides.substr(s,0,start.length) == start;
};
StringTools.endsWith = function(s,end) {
	var elen = end.length;
	var slen = s.length;
	return slen >= elen && HxOverrides.substr(s,slen - elen,elen) == end;
};
StringTools.isSpace = function(s,pos) {
	var c = HxOverrides.cca(s,pos);
	return c > 8 && c < 14 || c == 32;
};
StringTools.ltrim = function(s) {
	var l = s.length;
	var r = 0;
	while(r < l && StringTools.isSpace(s,r)) r++;
	if(r > 0) return HxOverrides.substr(s,r,l - r); else return s;
};
StringTools.rtrim = function(s) {
	var l = s.length;
	var r = 0;
	while(r < l && StringTools.isSpace(s,l - r - 1)) r++;
	if(r > 0) return HxOverrides.substr(s,0,l - r); else return s;
};
StringTools.trim = function(s) {
	return StringTools.ltrim(StringTools.rtrim(s));
};
StringTools.lpad = function(s,c,l) {
	if(c.length <= 0) return s;
	while(s.length < l) s = c + s;
	return s;
};
StringTools.rpad = function(s,c,l) {
	if(c.length <= 0) return s;
	while(s.length < l) s = s + c;
	return s;
};
StringTools.replace = function(s,sub,by) {
	return s.split(sub).join(by);
};
StringTools.hex = function(n,digits) {
	var s = "";
	var hexChars = "0123456789ABCDEF";
	do {
		s = hexChars.charAt(n & 15) + s;
		n >>>= 4;
	} while(n > 0);
	if(digits != null) while(s.length < digits) s = "0" + s;
	return s;
};
var Type = function() { };
$hxClasses["Type"] = Type;
Type.__name__ = ["Type"];
Type.getClassName = function(c) {
	var a = c.__name__;
	if(a == null) return null;
	return a.join(".");
};
Type.resolveClass = function(name) {
	var cl = $hxClasses[name];
	if(cl == null || !cl.__name__) return null;
	return cl;
};
Type.resolveEnum = function(name) {
	var e = $hxClasses[name];
	if(e == null || !e.__ename__) return null;
	return e;
};
Type.createInstance = function(cl,args) {
	var _g = args.length;
	switch(_g) {
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
		throw new js__$Boot_HaxeError("Too many arguments");
	}
	return null;
};
var dom_Node = function() {
	this.tooltipIcon = 0;
	this.tooltipEnText = null;
	this.tooltipText = null;
	this.y = 0;
	this.x = 0;
	this.m = Main._main;
};
$hxClasses["dom.Node"] = dom_Node;
dom_Node.__name__ = ["dom","Node"];
dom_Node.prototype = {
	update: function(dt) {
	}
	,render: function(u,v) {
	}
	,hitTest: function(u,v) {
		return null;
	}
	,click: function() {
	}
	,hold: function(t) {
	}
	,released: function() {
	}
	,hover: function(u,v) {
	}
	,wheel: function(d) {
	}
	,system: function() {
	}
	,updateLang: function() {
	}
	,updateBMF: function() {
	}
	,__class__: dom_Node
};
var dom_Container = function() {
	dom_Node.call(this);
	this.nodes = [];
	this.waitAdd = [];
	this.waitRem = [];
};
$hxClasses["dom.Container"] = dom_Container;
dom_Container.__name__ = ["dom","Container"];
dom_Container.__super__ = dom_Node;
dom_Container.prototype = $extend(dom_Node.prototype,{
	add: function(o) {
		if(o == null) throw new js__$Boot_HaxeError("Trying to add null");
		this.waitAdd.push(o);
	}
	,remove: function(o) {
		this.waitRem.push(o);
	}
	,system: function() {
		var i;
		var l;
		var j;
		var n;
		var o;
		l = this.waitAdd.length;
		n = this.waitRem.length;
		i = l;
		while(--i >= 0) {
			o = this.waitAdd[i];
			j = n;
			while(--j >= 0) if(this.waitRem[j] == o) {
				HxOverrides.remove(this.waitRem,this.waitRem[j]);
				HxOverrides.remove(this.waitAdd,o);
			}
		}
		l = this.waitRem.length;
		i = 0;
		while(i < l) {
			HxOverrides.remove(this.nodes,this.waitRem[i]);
			i++;
		}
		while(--l >= 0) this.waitRem.pop();
		l = this.waitAdd.length;
		i = 0;
		while(i < l) {
			this.nodes.push(this.waitAdd[i]);
			i++;
		}
		while(--l >= 0) this.waitAdd.pop();
		l = this.nodes.length;
		i = 0;
		while(i < l) {
			this.nodes[i].system();
			i++;
		}
	}
	,hitTest: function(u,v) {
		var i = this.nodes.length;
		var o;
		while(--i >= 0) if((o = this.nodes[i].hitTest(u - this.x,v - this.y)) != null) return o;
		return null;
	}
	,update: function(dt) {
		var i = -1;
		var l = this.nodes.length;
		while(++i < l) this.nodes[i].update(dt);
	}
	,render: function(u,v) {
		var i = -1;
		var l = this.nodes.length;
		while(++i < l) this.nodes[i].render(this.x + u,this.y + v);
	}
	,hover: function(u,v) {
		var i = -1;
		var l = this.nodes.length;
		while(++i < l) this.nodes[i].hover(u - this.x,v - this.y);
	}
	,updateLang: function() {
		var i = -1;
		var l = this.nodes.length;
		while(++i < l) this.nodes[i].updateLang();
		l = this.waitAdd.length;
		i = -1;
		while(++i < l) this.waitAdd[i].updateLang();
	}
	,updateBMF: function() {
		var i = -1;
		var l = this.nodes.length;
		while(++i < l) this.nodes[i].updateBMF();
		l = this.waitAdd.length;
		i = -1;
		while(++i < l) this.waitAdd[i].updateBMF();
	}
	,__class__: dom_Container
});
var app_BuffNode = function(idx,f) {
	this.cachedTime = -1;
	dom_Container.call(this);
	this.fixed = f;
	this.slot = idx;
	this.label = new dom_Label();
	this.label.set_halign(this.label.set_valign(2));
	this.label.x = 37;
	this.label.y = 50;
	if(f) this.set_buff(new terra_Buff());
	this.add(this.label);
};
$hxClasses["app.BuffNode"] = app_BuffNode;
app_BuffNode.__name__ = ["app","BuffNode"];
app_BuffNode.__super__ = dom_Container;
app_BuffNode.prototype = $extend(dom_Container.prototype,{
	clear: function() {
		this.set_id(this.set_time(0));
	}
	,copy: function(o) {
		this.set_id(o.get_id());
		this.set_time(o.get_time());
	}
	,swap: function(b) {
		var a = this;
		var t;
		t = a.get_id();
		a.set_id(b.get_id());
		b.set_id(t);
		t = a.get_time();
		a.set_time(b.get_time());
		b.set_time(t);
	}
	,hitTest: function(u,v) {
		if(u >= this.x && v >= this.y && u < this.x + 36 && v < this.y + 36) return this; else return null;
	}
	,click: function() {
		if(this.m.ctrlDown) {
			this.buff.time = terra_Buff.getMaxTime();
			return;
		}
		var hand = app_BuffNode.inHand;
		if(hand != null) {
			app_BuffNode.inHand = null;
			hand.inter(this);
		} else if(this.get_id() != 0) app_BuffNode.inHand = this;
		app_TabEffects.buff = this;
	}
	,inter: function(b) {
		var a = this;
		var t = app_TabEffects.temp;
		if(a != b) {
			if(!a.fixed && !b.fixed) {
				if(b.get_id() != 0) {
					t.copy(b);
					b.copy(a);
					t.click();
					a.clear();
				} else b.swap(a);
			} else if(a.fixed && !b.fixed) {
				if(b.get_id() != 0) {
					if(a != t) {
						t.copy(b);
						b.copy(a);
					} else t.swap(b);
					t.click();
				} else b.copy(a);
			} else if(!a.fixed && b.fixed) a.clear();
		}
	}
	,drawBuff: function(x,y,a) {
		var i = this.get_id();
		if(i < 0 || i >= terra_Buff.COUNT) i = 0;
		this.m.drawPart(this.m.bitBuffs,(i & 31) * 40,(i >> 5) * 40,40,40,x - 2,y - 2,a);
	}
	,render: function(u,v) {
		var i = this.get_id();
		var a;
		if(app_BuffNode.inHand == this) a = 0.6; else if(i != 0) a = 1; else a = 0.6;
		if(this.slot >= 10 && this.m.player.version < 77) a *= 0.5; else if(this.slot >= 22 && this.m.player.version < 269) a *= 0.5;
		if(this.get_id() > app_BuffNode.maxId) a *= 0.7;
		this.drawBuff(u + this.x,v + this.y,a);
		if(this.cachedTime != this.get_time()) {
			this.cachedTime = this.get_time();
			this.label.set_text(this.buff.getTime());
		}
		if(i > 0 && !this.fixed) dom_Container.prototype.render.call(this,u,v);
	}
	,set_buff: function(v) {
		if(this.buff != v) {
			this.buff = v;
			this.label.set_text(v.getTime());
		}
		return v;
	}
	,get_id: function() {
		return this.buff.id;
	}
	,set_id: function(v) {
		return this.buff.id = v;
	}
	,get_time: function() {
		return this.buff.time | 0;
	}
	,set_time: function(v) {
		if(this.buff.time != v) {
			this.buff.time = v;
			this.label.set_text(this.buff.getTime());
		}
		return v;
	}
	,__class__: app_BuffNode
});
var app_Libraries = function() { };
$hxClasses["app.Libraries"] = app_Libraries;
app_Libraries.__name__ = ["app","Libraries"];
app_Libraries.deploy = function() {
	var range = function(id1,id2) {
		var r = [];
		while(id1 <= id2) r.push(id1++);
		return r;
	};
	var add = function(arr,id) {
		arr.push(id);
		return arr;
	};
	var cat = function(arr1,arr2) {
		return arr1.concat(arr2);
	};
	var dir = function(name,items,icon) {
		if(icon == null) icon = 0;
		return new app_ShDir(icon,name,items);
	};
	var set = function(name1,items1,icon1) {
		if(icon1 == null) icon1 = 0;
		if(icon1 == 0) {
			if(items1[0] != 0) icon1 = items1[0]; else if(items1[10] != 0) icon1 = items1[10];
		}
		return new app_ShItems(icon1,name1,items1);
	};
	var filter = function(name2,icon2,f) {
		var items2 = [];
		var _g = 0;
		var _g1 = terra_Item.list;
		while(_g < _g1.length) {
			var item = _g1[_g];
			++_g;
			if(f(item)) items2.push(item.id);
		}
		var num = items2.length;
		if(HxOverrides.cca(name2,name2.length - 1) == 42) name2 = name2.substring(0,name2.length - 1); else name2 += " (" + num + ")";
		if(num <= 40) return set(name2,items2,icon2);
		if(num <= 480) {
			var pages = [];
			var page = null;
			var pageItems = null;
			var _g2 = 0;
			while(_g2 < num) {
				var i = _g2++;
				if(i % 40 == 0) {
					pageItems = [];
					page = set("Page " + ((i / 40 | 0) + 1),pageItems,items2[i]);
					pages.push(page);
				}
				pageItems.push(items2[i]);
			}
			return dir(name2,pages,icon2);
		}
		if(num <= 4800) {
			var sections = [];
			var section = null;
			var pages1 = null;
			var page1 = null;
			var pageItems1 = null;
			var _g3 = 0;
			while(_g3 < num) {
				var i1 = _g3++;
				var id3 = items2[i1];
				if(i1 % 40 == 0) {
					var k = i1 / 40 | 0;
					if(k % 10 == 0) {
						pages1 = [];
						section = dir("Pages " + (k + 1) + "+",pages1,id3);
						sections.push(section);
					}
					pageItems1 = [];
					page1 = set("Page " + (k + 1),pageItems1,id3);
					pages1.push(page1);
				}
				pageItems1.push(id3);
			}
			return dir(name2,sections,icon2);
		}
		throw new js__$Boot_HaxeError("Too many items (" + num + ")");
	};
	var index = function() {
		var n = [];
		var r1 = dir("Items by ID",n,149);
		var m;
		var i2;
		var j;
		var positiveOffset = 0;
		if(positiveOffset > 0) n.push(dir("(< 0)",[],0));
		i2 = 1;
		while(i2 < Main.ITEMS) {
			n.push(dir(i2 + "-" + (i2 + 399),[],i2));
			i2 += 400;
		}
		i2 = 1;
		while(i2 < Main.ITEMS) {
			m = [];
			j = -1;
			while(++j < 40) if(i2 + j < Main.ITEMS) m.push(i2 + j);
			n[positiveOffset + (i2 / 400 | 0)].nodes.push(set("" + i2 + "-" + (i2 + 39),m,i2));
			i2 += 40;
		}
		if(positiveOffset > 0) {
			i2 = 1;
			while(i2 < -Main.NITEMS) {
				m = [];
				j = -1;
				while(++j < 40) if(i2 + j < -Main.NITEMS) m.push(-(i2 + j));
				n[0].nodes.push(set("" + i2 + "-" + (i2 + 39),m,-i2));
				i2 += 40;
			}
		}
		return r1;
	};
	var cur;
	var lib;
	var shi;
	lib = dir("",[]);
	lib.nodes.push(dir("Materials",[dir("Pre-Hardmode",[set("Copper & Tin",[12,3507,3509,89,0,699,3501,3503,687,0,20,3508,3505,80,0,703,3502,3499,688,0,145,3504,3506,76,0,717,3498,3500,689,0,146,106,15,0,0,720,710,707,0,0],20),set("Iron & Lead",[11,6,1,90,0,700,3495,3497,690,0,22,4,7,81,0,704,3496,3493,691,0,3951,99,10,77,1140,3953,3492,3494,692,1139,3952,0,35,954,4424,3954,0,716,0,1448],22),set("Silver & Tungsten",[14,3513,3515,91,0,701,3489,3491,693,0,21,3514,3511,82,0,705,3490,3487,694,0,143,3510,3512,78,0,718,3486,3488,695,0,144,107,16,278,0,721,711,708,4915,0],21),set("Gold & Platinum",[13,3519,3521,92,264,702,3483,3485,696,715,19,3520,3517,83,349,706,3484,3481,697,714,141,3516,3518,79,105,719,3480,3482,698,713,142,108,17,955,0,722,712,709,0,0],19),set("Demonite & Crimtane",[56,46,103,102,956,880,795,798,792,0,57,0,104,101,957,1257,801,797,793,0,86,44,45,100,958,1329,796,799,794,0,0,0,0,0,0,0,0,0,0,0],57),set("Hellstone & Obsidian",[174,3697,231,122,4536,0,1458,2642,2657,0,175,2618,232,217,4535,1460,2600,2651,2667,2662,192,173,233,120,4534,1461,2406,2644,2380,2840,330,1457,3067,214,4533,1459,1473,2390,1463,4110],175),set("Meteorite",[116,3702,123,204,197,0,3129,3138,3177,0,117,3180,124,234,127,3153,3126,3171,3168,3159,3100,0,125,0,0,3156,3150,3135,3141,3147,3101,3144,0,0,0,3174,3162,3132,3165,4141],117),set("Other",[331,190,228,3347,3374,3266,960,956,0,0,209,0,229,3348,3375,3267,961,957,0,0,210,191,230,3380,3376,3268,962,958,0,0,1310,0,185,4059,0,0,0,0,0,0],331)],20),dir("Hardmode",[set("Cobalt & Palladium",[364,483,776,373,371,1104,1185,1188,1207,1206,381,537,385,372,960,1184,1186,1189,1205,0,415,435,991,374,961,1589,1187,1222,1208,0,420,0,383,375,962,1590,0,1190,1209,0],381),set("Mythril & Orichalcum",[365,484,777,378,376,1105,1192,1195,1211,1212,382,390,386,377,0,1191,1193,1196,1210,0,416,436,992,379,0,0,1194,1223,1213,0,421,525,384,380,0,0,1220,1197,1214,0],382),set("Adamantite & Titanium",[366,482,778,401,400,1106,1199,1202,1216,1217,391,406,388,402,0,1198,1200,1203,1215,0,604,481,993,403,0,1593,1201,1224,1218,0,605,524,387,404,0,1594,1221,1204,1219,0],391),set("Hallowed & Chlorophyte",[1225,368,990,553,558,947,1227,1230,1002,1003,4896,550,579,559,4897,1006,1228,1231,1001,2792,4900,578,367,551,4898,1235,1229,1233,1004,1234,4901,4790,4873,552,4899,1179,1226,1232,1005,1262],1225),set("Shroomite & Ectoplasm",[183,2176,1547,1546,0,1508,1506,1543,1503,2189,1552,0,1548,1549,0,3261,1507,1544,1504,0,2791,0,0,1550,0,0,0,1545,1505,0,2794,0,0,1866,0,0,0,0,823,0],1552),set("Frost, Turtle & Beetle",[724,725,496,684,1253,0,1316,0,2199,0,1306,670,1572,685,0,0,1317,0,2200,2201,676,0,1264,686,2161,0,1318,0,2202,2280,0,0,726,822,1519,0,1328,0,2218,0],2218),set("Luminite & Martian",[2860,3701,2806,2803,3460,0,2815,2820,2813,0,2861,2814,2807,2804,3467,2824,2809,2818,2825,2810,0,0,2808,2805,3461,2826,2823,2819,2821,2855,0,2822,3567,3568,3472,2812,2811,2816,2817,4121],3467),set("Solar",[3458,4164,2763,2786,3543,0,4155,4157,4152,3539,0,4153,2764,2784,3473,4162,4154,4150,4149,4145,3573,4229,2765,3522,2856,4163,4161,4156,4158,4160,4233,4159,3468,0,2858,4151,4146,4148,4147,4165]),set("Vortex",[3456,4185,2757,2776,3475,0,4176,4178,4173,3536,0,4174,2758,2774,0,4183,4175,4171,4170,4166,3574,4230,2759,3523,0,4184,4182,4177,4179,4181,4234,4180,3469,0,0,4172,4167,4169,4168,4186]),set("Stardust",[3459,4227,3381,3466,3474,0,4218,4220,4215,3538,0,4216,3382,3464,3531,4225,4217,4213,4212,4208,3576,4232,3383,3462,3465,4226,4224,4219,4221,4223,4236,4222,3471,3463,3525,4214,4209,4211,4210,4228],3459),set("Nebula",[3457,4206,2760,2781,0,0,4197,4199,4194,3537,0,4195,2761,2779,0,4204,4196,4192,4191,4187,3575,4231,2762,3524,3476,4205,4203,4198,4200,4202,4235,4201,3470,0,3542,4193,4188,4190,4189,4207],3457)],1191),dir("Non-ore",[set("Granite",[3086,3703,0,0,0,0,3131,3140,3179,0,3088,3125,0,0,0,3155,3128,3173,3170,3161,3087,4719,0,0,0,3158,3152,3137,3143,3149,3089,3146,0,0,0,3176,3164,3134,3167,4122],3087),set("Marble",[3081,3704,0,0,0,0,3130,3139,3178,0,3082,3181,0,0,0,3154,3127,3172,3169,3160,3066,4554,0,0,0,3157,3151,3136,3142,3148,3083,3145,0,0,0,3175,3163,3133,3166,4123],3066),set("Crystal",[502,3886,4982,3283,3051,0,3888,3891,3894,0,0,3884,4983,518,495,3920,3898,3890,3893,3895,3234,0,4984,494,0,3909,3918,3892,3915,3896,3238,3903,0,515,3009,3889,3897,3911,3917,4124],502),set("Sandstone",[3271,4268,607,3339,0,2120,4307,4309,4305,0,3273,4267,608,3346,0,4314,4306,4303,4302,4298,4051,4720,3276,3277,0,4315,4313,4308,4310,4312,4053,4311,3344,3345,0,4304,4299,4301,4300,4316],607),set("Lesion",[61,3976,0,0,0,0,3967,3970,3964,0,4486,3965,0,0,0,3974,3966,3962,3961,3958,3955,996,609,0,0,3975,3973,3969,3971,3972,3956,3957,610,0,0,3963,3959,3968,3960,4126],3965),set("Ice",[664,3672,684,676,974,3048,2044,2040,2059,0,2009,681,685,4911,0,2248,2594,2049,2100,2076,883,593,686,594,0,2252,2635,2086,2247,2848,884,3908,822,595,2198,2288,2068,3913,2031,4111]),set("Glass",[170,3700,2862,1272,2244,2243,1709,2037,2065,0,392,2748,1271,4260,0,1713,2239,2048,2097,2075,0,2194,1268,1270,0,2632,2414,2085,2254,2842,0,1702,1269,1267,0,1703,1719,2639,2025,4112],170),set("Skyware",[824,3674,0,0,0,0,837,2042,2063,0,825,838,0,0,0,830,2606,2053,2102,2080,751,765,0,0,0,2631,2410,2090,2384,2834,752,2628,0,0,0,826,2070,2394,2029,4104],824),set("Lihzahrd",[1101,3677,1148,1152,0,0,1137,2041,2062,0,1102,1142,1149,1153,0,1144,2595,2052,2101,2079,0,2195,1147,1154,0,1145,2416,2089,2385,2836,0,3906,1146,0,0,1143,2069,2396,2030,4106]),set("Golden",[141,3887,0,0,0,0,1710,2147,2143,0,142,3885,0,0,0,1716,2238,2155,2151,2663,0,0,0,0,0,3910,2405,2133,2379,2843,0,3904,0,0,0,1704,1720,2389,2137,1705]),set("Steampunk",[1344,3686,839,1742,0,0,1712,2036,2655,0,3751,2250,840,0,0,1718,2241,2649,2096,2125,0,2203,841,0,0,2253,2412,2130,2256,2845,0,2627,948,4472,0,1708,1722,2638,2024,4114]),set("Blue dungeon",[134,3693,0,0,0,0,1411,1408,2652,0,135,2614,0,0,0,1397,3900,1405,2664,2658,0,1384,0,0,0,1398,2402,2645,2376,2837,0,4238,0,0,0,1396,1470,2386,1414,4107]),set("Green dungeon",[137,3691,0,0,0,0,1412,1409,2653,0,138,2612,0,0,0,1400,3901,1406,2665,2659,0,1386,0,0,0,1401,2403,2646,2377,2838,0,4239,0,0,0,1399,1471,2387,1415,4108]),set("Pink dungeon",[139,3692,0,0,0,0,1413,1410,2654,0,140,2613,0,0,0,1403,3902,1407,2666,2660,0,1385,0,0,0,1404,2404,2647,2378,2839,0,4240,0,0,0,1402,1472,2388,1416,4109])],1344),dir("Wood",[set("Forest wood",[9,3665,727,24,0,335,25,136,108,0,93,48,728,196,0,32,359,105,349,336,480,1447,729,39,0,36,2397,341,333,2827,0,94,0,0,0,34,224,334,354,358],9),set("Mahogany",[620,3669,733,656,0,0,651,2038,2060,0,623,626,734,657,0,639,2597,2050,2098,2077,4718,2211,735,658,0,636,2399,2087,642,2829,0,632,3360,3361,0,629,645,648,2026,4097]),set("Pearlwood",[621,3670,736,659,0,0,652,2039,2061,0,624,627,737,660,0,640,2602,2051,2099,2078,0,2212,738,661,0,637,2400,2088,643,2830,0,633,0,0,0,630,646,649,2027,4098]),set("Ebonwood",[619,3668,730,653,0,0,650,2033,2056,0,622,625,731,654,0,638,2593,2046,2093,2073,0,2210,732,655,0,635,2398,2083,641,2828,0,631,0,0,0,628,644,647,2021,4096]),set("Shadewood",[911,3675,924,921,0,0,912,2146,2142,0,927,914,925,922,0,917,2604,2154,2150,2127,0,2213,926,923,0,916,2401,2132,919,2835,0,913,0,0,0,915,920,918,2136,4105]),set("Boreal wood",[2503,3689,2509,2745,0,0,2561,2564,2558,0,2505,2559,2510,2746,0,677,2560,2556,2555,2552,4717,2507,2511,2747,0,673,858,2563,2565,2852,0,2566,0,0,0,2557,2553,2562,2554,4119],2503),set("Palm wood",[2504,3687,2512,2517,0,2521,2528,2530,2525,0,2506,2526,2513,2516,0,2532,2601,2523,2522,2519,0,2508,2514,2515,0,2534,2527,2533,2531,2850,0,2518,0,0,0,2524,2520,2529,2536,4118],2504),set("Living wood",[832,3673,0,0,0,0,819,2145,2141,0,1723,831,0,0,0,829,2596,2153,2149,2126,0,2196,0,0,0,2633,2636,2131,2245,2833,0,2629,0,0,0,806,2139,3914,2135,4099],832),set("Dynasty",[2260,3684,0,0,2235,0,2265,2226,2224,0,2263,2230,0,0,2234,2259,2237,2236,2227,2232,2264,0,0,0,2261,2229,3919,2225,3916,2849,0,3905,0,0,2262,2228,2231,3912,2233,4117],2260),set("Spooky wood",[1729,3699,1832,0,0,0,1815,2043,2064,0,1730,2620,1833,0,0,1816,2605,2650,2103,2081,0,0,1834,0,0,1817,2409,2091,2383,2847,0,1818,0,0,0,1814,2071,2393,2028,4116],1729)],9),dir("Plants & Organic",[set("Bamboo",[4564,4585,0,0,0,0,4576,4578,4573,0,4565,4574,0,0,0,4583,4575,4571,4570,4566,4547,4667,0,0,0,4584,4582,4577,4579,4581,4548,4580,0,0,0,4572,4567,4569,4568,4586],4564),set("Cactus",[276,3695,894,882,0,0,816,2032,2055,0,750,2616,895,881,0,2743,2592,2045,2092,2072,0,4390,896,0,0,812,2408,2082,2382,2854,0,2744,0,0,0,807,2066,2392,2020,4100],276),set("Pumpkin",[1725,3698,1731,1754,0,0,1793,2641,2656,0,1726,2619,1732,1755,0,1794,2603,2054,2668,2661,0,0,1733,1756,0,1795,2415,2643,2671,2846,0,1796,0,0,0,1792,2669,2637,2670,4115],1725),set("Mushroom",[183,3688,756,0,4779,2539,818,2546,2543,4921,194,2544,787,0,4780,2550,2599,2542,2541,2537,0,4721,0,0,4781,814,2413,2547,2548,2851,764,2549,1181,0,0,810,2538,2545,2540,4103],183),set("Bone",[154,3694,151,959,0,3724,820,2148,2144,0,932,2615,152,1166,0,827,2591,3004,2152,2128,766,0,153,1320,0,811,2407,2134,2381,2831,768,634,0,3003,786,808,2140,2391,2138,4101],766),set("Honey",[1125,3685,2361,1123,1121,2257,1711,2035,2058,0,1127,2249,2362,2364,1132,1717,2240,2648,2095,2124,1128,2204,2363,2888,2787,2251,2411,2129,2255,2844,1134,2630,2502,1130,2788,1707,1721,2395,2023,4113],1125),set("Slime",[23,3690,1309,2585,0,1683,2576,2579,2573,0,3111,2574,2610,2493,4959,2583,2575,2571,2570,2567,762,767,3113,3090,0,815,2582,2578,2580,2853,769,2581,0,0,0,2572,2568,2577,2569,4120],762),set("Flesh",[836,3696,996,0,0,0,817,2034,2057,0,4509,2617,2193,0,0,828,2598,2047,2094,2074,763,0,4050,0,0,813,2634,2084,2246,2832,770,3907,4052,0,0,809,2067,2640,2022,4102],763),set("Spider",[2607,3950,2370,2551,0,0,3941,3943,3938,0,4503,3939,2371,2366,0,3948,3940,3936,3935,3931,4139,0,2372,0,0,3949,3947,3942,3944,3946,4140,3945,1798,0,0,3937,3932,3934,3933,4125],2607)],1125)],21));
	lib.nodes.push(dir("Decorative",[dir("Furniture",[set("Chair",[34,628,629,630,806,807,808,809,810,826,915,1143,1396,1399,1402,1459,1509,1703,1704,1707,1708,1792,1814,1925,2228,2288,2524,2557,2572,2812,3174,4572,3176,3889,3937,3963,4151,4172,4193,4214]),set("Workbench",[36,635,636,637,673,811,812,4584,814,815,916,1145,1398,1401,1404,1461,1511,1795,1817,2172,2229,2251,2252,2253,2534,2631,2632,2633,2826,3156,3157,3158,3909,3910,3949,3975,4163,4184,4205,4226]),set("Table",[32,638,639,640,677,827,3974,829,830,917,1144,1397,1400,1403,1460,1510,1713,1714,1716,1717,1718,1794,1816,4583,2248,2259,2532,4314,2583,2743,2824,3153,3154,3155,3920,3948,4162,4183,4204,4225]),set("Bed",[224,644,645,646,920,1470,1471,1472,1473,1719,1720,1721,1722,2066,2067,2068,2069,2070,2071,2139,2140,2231,2520,2538,2553,2568,2669,2811,3162,3163,3164,3897,3932,3959,4146,4167,4188,4209,4299,4567]),set("Lantern",[136,344,347,1390,1391,1392,1393,1808,2032,2033,2034,2035,2036,2037,2038,2039,2040,2041,2042,2043,2145,2146,2147,2148,2226,2530,2546,2564,2579,2641,2642,2820,3138,3139,3140,3891,4157,4178,4199,4220]),set("Lamp",[341,1394,2082,2083,2084,2085,2086,2087,2088,2089,2090,2091,2129,2130,2131,2132,2133,2134,2225,2533,2547,2563,2578,2643,2644,2645,2646,2647,2819,4577,3135,3136,3137,3969,4156,4177,4198,4219,3892,3942],341),set("Torch",[8,342,427,428,429,430,431,432,433,523,974,1245,1333,2274,3004,3045,3114,4383,4384,4385,4386,4387,4388,966,3046,3047,3048,3049,3050,3723,3724,4689,4690,4691,4692,4693,4694,0,0,0],8),set("Candle",[105,713,1405,1406,1407,2045,2046,2047,2048,2049,2050,2051,2052,2053,2054,2153,2154,2155,2236,2523,2542,2556,2571,2648,2649,2650,2651,2818,3171,3172,3173,3890,3936,3962,4150,4171,4192,4213,4303,4571]),set("Candelabra",[349,714,2092,2093,2094,2095,2096,2097,2098,2099,2100,2101,2102,2103,2149,2150,2151,2152,2522,2541,2555,2570,2664,2665,2666,2667,2668,3168,3169,3170,3893,3935,3961,4149,4170,4191,4212,4302,4570,2825]),set("Chandelier",[106,107,108,712,2055,2056,2057,2058,2059,2060,2656,2573,2061,2062,2063,2064,2065,2141,2142,2143,2144,2525,2543,2558,2652,2653,2654,2655,2657,2813,3178,3177,3179,3894,3938,3964,4152,4173,4215,4194]),set("Door",[25,650,651,652,816,4307,818,819,820,837,912,1137,1138,1139,1140,1411,1412,1413,1458,1709,1710,1711,1712,1793,1815,1924,2044,2265,2528,2561,2576,2815,3129,3130,3131,4415,3888,3941,3967,4576])],34),dir("Furniture (cont.)",[set("Bookcase",[354,1414,1415,1416,1463,1512,4568,2021,2022,2023,2024,2025,2026,2027,2028,2029,2030,2031,2135,2136,2137,2138,2233,2536,2540,2554,2569,2670,2817,3165,3166,3167,3917,3933,3960,4147,4168,4189,4210,4300]),set("Sofa",[858,2397,2398,2399,2400,2401,2402,2403,2404,2405,2406,2407,2408,2409,2410,2411,2412,2413,2414,2415,2416,2527,2582,2634,2635,2636,2823,3150,3151,3152,3918,3919,3947,3973,4161,4182,4203,4224,4313,4582]),set("Dresser",[334,647,648,649,918,2386,2387,2388,2389,2390,2391,2392,2393,2394,2395,2396,2529,2545,2562,2577,2637,2638,2639,2640,2816,3132,3133,3134,3911,3912,3913,3914,3934,3968,4148,4169,4190,4211,4301,4569]),set("Piano",[333,641,642,643,919,2245,2246,2247,2254,2255,2256,2376,2377,2378,2379,2380,2381,2382,2383,2384,2385,2531,2548,2565,2580,2671,2821,3141,3142,3143,3915,3916,3944,3971,4158,4179,4200,4221,4310,4579]),set("Bathtub",[336,2072,2073,2074,2075,2076,2077,2078,2079,2080,2081,2124,2125,2126,2127,2128,2232,2519,2537,2552,2567,2658,2659,2660,2661,2662,2663,2810,3159,3160,3161,3895,3931,3958,4145,4166,4187,4208,4298,4566]),set("Sink",[2827,2828,2829,2830,2831,2832,2833,2834,2835,2836,2837,2838,2839,2840,2841,2842,2843,2844,2845,2846,2847,2848,2849,2850,2851,2852,2853,2854,2855,3147,3148,3149,3896,3946,3972,4160,4181,4202,4223,4581]),set("Toilet",[358,1705,4096,4097,4098,4099,4100,4101,4102,4103,4104,4105,4106,4107,4108,4109,4110,4111,4112,4113,4114,4115,4116,4117,4118,4119,4120,4121,4122,4123,4124,4125,4126,4586,4141,4165,4186,4207,4228,4316])],354),set("Paintings 1",[1372,1373,1374,1375,1419,1420,1421,1422,1423,1424,1425,1426,1427,1428,1433,1434,1435,1436,1437,1438,1439,1440,1441,1442,1443,1476,1477,1478,1479,1480,1481,1482,1483,1484,1485,1486,1487,1488,1489,1490],1427),set("Paintings 2",[1491,1492,1493,1494,1495,1496,1497,1498,1499,1500,1501,1502,1538,1539,1540,1541,1542,1573,1574,1575,1576,1577,1846,1847,1848,1849,1850,0,0,0,0,0,0,0,0,0,0,0,0,0],1496)],354));
	lib.nodes.push(dir("Pets, mounts, tools",[set("Pets",[1242,4551,669,4550,4736,1810,603,3628,4735,4365,1311,4604,4605,4603,1172,2587,1180,4701,1927,4737,4425,1799,4366,1171,2420,2338,1312,0,0,0,1181,4777,0,0,0,115,3062,3043,425,1183],603),set("Boss pets",[994,3060,1959,1170,1169,4799,3857,3855,1182,1798,4815,4816,4803,4813,4802,4814,4817,4805,4810,4809,4806,4804,4801,4797,4960,4800,4798,4808,0,0,1837,0,0,0,0,4811,4807,4812,3856,3577],1170),filter("Mounts*",2430,function(q) {
		if(q.id == 4444) return true;
		var qt = q.textLq;
		return qt.indexOf("summons") >= 0 && (qt.indexOf("rideable") >= 0 || qt.indexOf("mount") >= 0);
	}),set("Hooks",[84,437,1236,1237,1238,1239,1240,1241,1800,1829,1915,1916,2360,2585,2800,3020,3021,3022,3023,3572,3623,4257,4759,4980,939,1273,0,0,0,0,0,0,0,0,0,0,0,0,0,0]),set("Minecarts",[2343,4066,4067,4426,4427,4428,4429,4450,4451,4452,4453,4454,4455,4456,4467,4468,4469,4472,4745,4470,4471,4763,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0])],603));
	lib.nodes.push(shi = filter("Potions (regeneration)*",499,function(q1) {
		var qs = q1.nameLq;
		return StringTools.endsWith(qs,"potion") && (qs.indexOf("regeneration") >= 0 || qs.indexOf("healing") >= 0 || qs.indexOf("mana") >= 0 || qs.indexOf("restoration") >= 0);
	}));
	lib.nodes.push(filter("Potions (effects)*",296,function(q2) {
		var qs1 = q2.nameLq;
		var qi = q2.id;
		return qi != 678 && StringTools.endsWith(qs1,"potion") && HxOverrides.indexOf(shi.nodes,qi,0) < 0;
	}));
	lib.nodes.push(set("Bosses & events",[43,1133,560,602,0,557,556,544,1315,3828,70,1331,1307,361,0,1293,1844,2767,1958,3816,267,0,0,0,0,2673,4988,4961,3601,0,0,0,0,0,0,0,0,0,0,0],43));
	lib.nodes.push(set("Quest fish",[2475,2476,2450,2477,2478,2451,2479,2480,2452,2453,2481,2454,2482,2483,2455,2456,2457,2458,2459,2460,2484,2472,2461,2462,2463,2485,2464,2465,2486,2466,2467,2468,2487,2469,2488,2470,2471,2473,2474,4393],2487));
	lib.nodes.push(dir("Categories",[dir("Weapons",[filter("Melee damage",3514,function(q3) {
		return q3.metatype.indexOf("d") >= 0;
	}),filter("Ranged damage",3510,function(q4) {
		return q4.metatype.indexOf("r") >= 0;
	}),filter("Magic damage",113,function(q5) {
		return q5.metatype.indexOf("m") >= 0;
	}),filter("Summon damage",1309,function(q6) {
		return q6.metatype.indexOf("s") >= 0 && !(q6.metatype.indexOf("S") >= 0) && !(q6.pid.indexOf("Whip") >= 0);
	}),filter("Summoner whips",4672,function(q7) {
		return q7.metatype.indexOf("s") >= 0 && q7.pid.indexOf("Whip") >= 0;
	}),filter("Sentry damage",1572,function(q8) {
		return q8.metatype.indexOf("S") >= 0;
	})],204),dir("Equipable",[filter("Armor",81,function(q9) {
		var mt = q9.metatype;
		return !(mt.indexOf("v") >= 0) && (mt.indexOf("4") >= 0 || mt.indexOf("5") >= 0 || mt.indexOf("6") >= 0);
	}),filter("Accessories",158,function(q10) {
		var mt1 = q10.metatype;
		return mt1.indexOf("a") >= 0 && !(mt1.indexOf("v") >= 0);
	}),filter("Vanity",239,function(q11) {
		return q11.metatype.indexOf("v") >= 0;
	}),filter("Head slot",92,function(q12) {
		return q12.metatype.indexOf("4") >= 0;
	}),filter("Body slot",83,function(q13) {
		return q13.metatype.indexOf("5") >= 0;
	}),filter("Leg slot",79,function(q14) {
		return q14.metatype.indexOf("6") >= 0;
	}),filter("Dyes",1009,function(q15) {
		return StringTools.endsWith(q15.name,"Dye");
	}),filter("Wings",823,function(q16) {
		return q16.textLq.indexOf("allows flight") >= 0;
	})],90),dir("Tools",[filter("Pickaxes",3515,function(q17) {
		return q17.metadata.indexOf("tp=") >= 0;
	}),filter("Axes",3512,function(q18) {
		return q18.metadata.indexOf("tx=") >= 0;
	}),filter("Hammers",3511,function(q19) {
		return q19.metadata.indexOf("th=") >= 0;
	}),filter("Fishing poles",2295,function(q20) {
		return q20.metadata.indexOf("tf=") >= 0;
	})],1),filter("Placeable",2,function(q21) {
		return q21.metatype.indexOf("t") >= 0;
	}),filter("Walls",30,function(q22) {
		return q22.metatype.indexOf("w") >= 0;
	})],531));
	lib.nodes.push(index());
	return lib;
};
var app_SlotNode = function(finder,kin,md) {
	if(kin == null) kin = 0;
	this.color = -1;
	this.kind = 0;
	this.finder = finder;
	this.kind = kin;
	this.meta = "";
	dom_Container.call(this);
	this._count = -1;
	this.fdCount = new dom_Label();
	this.fdCount.x = 38;
	this.fdCount.y = 42;
	this.fdCount.set_halign(2);
	this.fdCount.set_valign(2);
	this.fdCount.set_text("0");
	this.add(this.fdCount);
};
$hxClasses["app.SlotNode"] = app_SlotNode;
app_SlotNode.__name__ = ["app","SlotNode"];
app_SlotNode.__super__ = dom_Container;
app_SlotNode.prototype = $extend(dom_Container.prototype,{
	hitTest: function(u,v) {
		var r = null;
		u -= this.x;
		v -= this.y;
		if(r == null && u >= 0 && v >= 0 && u < 40 && v < 40) r = this;
		return r;
	}
	,released: function() {
		var hand = app_SlotNode.inHand;
		if(hand != null) {
			app_SlotNode.inHand = null;
			hand.inter(this);
		} else if(!terra_Item.isEmpty(this.slot.item)) {
			if(this.m.altDown) {
				var cur = app_TopPane.inst.tabNow;
				if(js_Boot.__instanceof(cur,app_TabItems)) {
					var ti = cur;
					var _g = 0;
					var _g1 = ti.items;
					while(_g < _g1.length) {
						var slot = _g1[_g];
						++_g;
						if(!terra_Item.isEmpty(slot.slot.item)) continue;
						slot.set_id(this.slot.item);
						slot.set_count(1);
						slot.set_prefix(0);
						break;
					}
				}
			} else if(this.m.ctrlDown) this.set_count(this.slot.item.stack); else if(this.m.shiftDown && this.get_count() > 1) {
				var t = app_TabEdit.tempItem;
				t.copy(this);
				t.set_count(this.get_count() >> 1);
				var _g2 = this;
				_g2.set_count(_g2.get_count() - t.get_count());
				app_SlotNode.inHand = t;
			} else app_SlotNode.inHand = this;
		}
		app_TabEdit.set_item(this);
	}
	,hold: function(t) {
		if(this.kind == 1) this.set_count(t < 0.17?this.get_count():t < 0.27?1:t < 1.07?Math.floor((t - 0.27) / 0.08) + 1:t < 2.07?Math.floor((t - 1.07) / 0.04) + 10:t < 3.57?Math.floor((t - 2.07) / 0.02) + 25:(function($this) {
			var $r;
			var a = Math.floor((t - 3.57) / 0.01) + 100;
			$r = a < 999?a:999;
			return $r;
		}(this)));
	}
	,wheel: function(d) {
		var c = this.get_count();
		c += d;
		if(c < 1) c = 1;
		this.set_count(c);
	}
	,drawItem: function(x,y,a) {
		var v = this.slot.item;
		if(v != null && (v.id != 0 || v.name != "")) {
			var ctx = this.m.context;
			var _a = ctx.globalAlpha;
			ctx.globalAlpha = a;
			ctx.drawImage(this.m.imgItems,v.iconX,v.iconY,40,40,x,y,40,40);
			ctx.globalAlpha = _a;
		}
	}
	,render: function(u,v) {
		if(app_SlotNode.current == this) this.m.rect(u + this.x + 1,v + this.y + 1,38,38,this.kind == 1?14467228:10272988);
		if(!(this.kind == 1)) do {
			var it = this.slot.item;
			if(it == null) break;
			if((function($this) {
				var $r;
				var _this = app_TabLibrary.get_inst().searchResults;
				$r = HxOverrides.indexOf(_this,it.id,0);
				return $r;
			}(this)) < 0) break;
			this.m.xrect(u + this.x + 1,v + this.y + 1,38,38,13693183,0.8 + Math.sin(this.m.time * 5) * 0.2);
		} while(false);
		var z = true;
		var q;
		var p;
		if(this.kind == 0) {
			q = this.m.player.invVersion;
			z = this.slot.visAvail(this.m.player);
		} else if(this.kind == 2) z = this.m.player.invVersion >= 200; else if(this.kind == 1) {
			var mid = this.slot.item;
			if(app_TabInventory.fdDebug == null) {
			} else if(terra_Item.isEmpty(this.slot.item)) z = false; else {
				var _g = 0;
				var _g1 = this.m.player.bankItems;
				while(_g < _g1.length) {
					var slot = _g1[_g];
					++_g;
					if(slot.item == this.slot.item) {
						z = false;
						break;
					}
				}
			}
		}
		if(this.kind == 1) q = 10518624; else if(this.color != -1) q = this.color; else q = 6324384;
		this.m.xrect(u + this.x + 2,v + this.y + 2,36,36,q,z?1:0.5);
		var alpha;
		if(this == app_SlotNode.inHand) alpha = 0.7; else alpha = 1;
		if(this.slot.item != null && this.slot.item.id > app_SlotNode.maxId) alpha *= 0.5;
		this.drawItem(this.x + u,this.y + v,alpha);
		if(terra_Item.isItem(this.slot.item) && !(this.kind == 1 && this.get_count() <= 1)) {
			q = this.get_count();
			if(this._count != q) this.fdCount.set_text(terra_Item.count(this._count = q));
			dom_Container.prototype.render.call(this,u,v);
		}
	}
	,set_id: function(v) {
		if(this.slot.item != v) {
			this.slot.item = v;
			if(app_SlotNode.current == this) app_TabEdit.get_inst().sync_id(v);
		}
		return v;
	}
	,get_count: function() {
		return this.slot.count;
	}
	,set_count: function(v) {
		if(this.slot.count != v) {
			this.slot.count = v;
			if(app_SlotNode.current == this) app_TabEdit.get_inst().fdCount.set_value(v);
		}
		return v;
	}
	,get_prefix: function() {
		return this.slot.prefix;
	}
	,set_prefix: function(v) {
		if(this.slot.prefix != v) {
			this.slot.prefix = v;
			if(app_SlotNode.current == this) app_TabEdit.get_inst().set_prefix(v);
		}
		return v;
	}
	,clear: function() {
		this.set_id(terra_Item.fromId(0));
		this.set_count(this.set_prefix(0));
	}
	,copy: function(b) {
		var a = this;
		a.set_id(b.slot.item);
		a.set_count(b.get_count());
		a.set_prefix(b.get_prefix());
	}
	,swap: function(b) {
		var i;
		var a = this;
		var k;
		k = a.slot.item;
		a.set_id(b.slot.item);
		b.set_id(k);
		i = a.get_count();
		a.set_count(b.get_count());
		b.set_count(i);
		i = a.get_prefix();
		a.set_prefix(b.get_prefix());
		b.set_prefix(i);
	}
	,inter: function(b) {
		var a = this;
		var t = app_TabEdit.tempItem;
		if(a != b) {
			if(!(a.kind == 1) && !(b.kind == 1)) {
				if(!terra_Item.isEmpty(b.slot.item)) {
					if(b.slot.item == a.slot.item && b.get_prefix() == a.get_prefix()) {
						var _g = b;
						_g.set_count(_g.get_count() + a.get_count());
						a.clear();
					} else {
						t.copy(b);
						b.copy(a);
						t.released();
						a.clear();
					}
				} else b.swap(a);
			} else if(a.kind == 1 && !(b.kind == 1)) {
				if(!terra_Item.isEmpty(b.slot.item)) {
					if(b.slot.item == a.slot.item && b.get_prefix() == a.get_prefix()) {
						var _g1 = b;
						_g1.set_count(_g1.get_count() + a.get_count());
						a.clear();
					} else {
						if(a != t) {
							t.copy(b);
							b.copy(a);
						} else t.swap(b);
						t.released();
					}
				} else b.copy(a);
			} else if(!(a.kind == 1) && b.kind == 1) a.clear();
		}
	}
	,set_slot: function(v) {
		if(this.slot != v) this.slot = v;
		return v;
	}
	,__class__: app_SlotNode
});
var app_TabBase = function() {
	this.style = 1;
	this.title = "???";
	dom_Container.call(this);
};
$hxClasses["app.TabBase"] = app_TabBase;
app_TabBase.__name__ = ["app","TabBase"];
app_TabBase.__super__ = dom_Container;
app_TabBase.prototype = $extend(dom_Container.prototype,{
	start: function() {
	}
	,end: function() {
	}
	,sync: function(p) {
	}
	,addContainer: function(x,y) {
		var r = new dom_Container();
		r.x = x;
		r.y = y;
		this.add(r);
		return r;
	}
	,addLabel: function(x,y,text,style,hx,vx) {
		if(vx == null) vx = 0;
		if(hx == null) hx = 0;
		if(style == null) style = 1;
		var r = new dom_Label();
		r.x = x;
		r.y = y;
		r.set_halign(hx);
		r.set_valign(vx);
		r.set_style(style);
		r.set_text(r.enText = text);
		this.add(r);
		return r;
	}
	,addButton: function(x,y,text,style,click) {
		if(style == null) style = 1;
		var r = new dom_Button();
		r.x = x;
		r.y = y;
		r.set_style(style);
		r.set_text(r.enText = text);
		r.onClick = click;
		this.add(r);
		return r;
	}
	,addConfirm: function(x,y,text,style,click) {
		if(style == null) style = 1;
		var r = new dom_ButtonConfirm();
		r.x = x;
		r.y = y;
		r.set_style(style);
		r.set_text(r.enText = text);
		r.onClick = click;
		this.add(r);
		return r;
	}
	,addCheckbox: function(x,y,text,style,change) {
		if(style == null) style = 1;
		var r = new dom_Checkbox();
		r.x = x;
		r.y = y;
		r.set_style(style);
		r.set_format(r.enText = text);
		r.onChange = change;
		this.add(r);
		return r;
	}
	,addInt: function(x,y,fmt,style,finish) {
		if(style == null) style = 1;
		if(fmt == null) fmt = "$";
		var r = new dom_IntField();
		r.x = x;
		r.y = y;
		r.set_format(fmt);
		r.set_style(style);
		r.onFinish = finish;
		this.add(r);
		return r;
	}
	,addFloat: function(x,y,fmt,style,finish) {
		if(style == null) style = 1;
		if(fmt == null) fmt = "$";
		var r = new dom_FloatField();
		r.x = x;
		r.y = y;
		r.set_format(fmt);
		r.set_style(style);
		r.onFinish = finish;
		this.add(r);
		return r;
	}
	,addStr: function(x,y,fmt,style,finish) {
		if(style == null) style = 1;
		if(fmt == null) fmt = "$";
		var r = new dom_StringField();
		r.x = x;
		r.y = y;
		r.set_format(fmt);
		r.set_style(style);
		r.onFinish = finish;
		this.add(r);
		return r;
	}
	,addColor: function(x,y,style,finish) {
		if(style == null) style = 1;
		var r = new dom_ColorField();
		r.x = x;
		r.y = y;
		r.set_format("#$");
		r.set_style(style);
		r.onFinish = finish;
		this.add(r);
		return r;
	}
	,__class__: app_TabBase
});
var app_TabBuffs = function() {
	app_TabBase.call(this);
	this.buffs = [];
};
$hxClasses["app.TabBuffs"] = app_TabBuffs;
app_TabBuffs.__name__ = ["app","TabBuffs"];
app_TabBuffs.__super__ = app_TabBase;
app_TabBuffs.prototype = $extend(app_TabBase.prototype,{
	addBuff: function(x,y,i,f) {
		if(f == null) f = false;
		var r = new app_BuffNode(i,f);
		r.x = x;
		r.y = y;
		this.buffs.push(r);
		this.add(r);
		return r;
	}
	,sync: function(p) {
		var i;
		i = -1;
		while(++i < this.buffs.length) if(this.buffs[i].slot >= 0) this.buffs[i].set_buff(p.buffs[i]);
	}
	,__class__: app_TabBuffs
});
var app_TabEdit = function() {
	this.lxPrefixId = -1;
	var _g = this;
	app_TabBase.call(this);
	app_TabEdit._inst = this;
	var i;
	var h = this.m.font.size;
	var p;
	var self = this;
	app_TabEdit.tempItem = new app_SlotNode(function(_) {
		return null;
	},1,"temp");
	app_TabEdit.tempItem.set_slot(new terra_Slot());
	this.lbName = this.addLabel(0,0,"Name: ",4);
	this.fdName = this.addLabel(this.lbName.width,this.lbName.y,"",1);
	this.lbIndex = this.addLabel(0,h,"Index: ",4);
	this.fdIndex = this.addInt(this.lbIndex.width,h);
	this.fdIndex.onFinish = function(v) {
		app_SlotNode.current.set_id(terra_Item.fromId(v));
	};
	this.lbCode = this.addLabel(0,h,"Code: ",4);
	this.fdCode = this.addStr(this.lbCode.width,h,"\"$\"",1);
	this.fdCode.onFinish = function(v1) {
		app_SlotNode.current.set_id(terra_Item.fromCode(v1));
	};
	if(this.m.tapi) {
		this.remove(this.lbIndex);
		this.remove(this.fdIndex);
	} else {
		this.remove(this.lbCode);
		this.remove(this.fdCode);
	}
	this.lbCount = this.addLabel(0,h * 2,"Count: ",4);
	this.fdCount = this.addInt(this.lbCount.width,h * 2);
	this.fdCount.onFinish = function(v2) {
		app_SlotNode.current.set_count(v2);
	};
	this.lbPrefix = this.addLabel(0,h * 3,"Prefix: ",4);
	this.fdPrefix = this.addInt(this.lbPrefix.width,h * 3);
	this.fdPrefix.onFinish = function(v3) {
		_g.set_prefix(v3);
	};
	this.fdPrefix.onChange = function(v4) {
		_g.lxPrefix.x = _g.fdPrefix.x + _g.fdPrefix.width;
	};
	this.lxPrefix = this.addButton(this.fdPrefix.x + this.fdPrefix.width,h * 3,"?");
	this.lxInfo = this.addLabel(20,h * 4,"");
	this.pfxMeta = [[{ name : "Best", nodes : [60,59,82,83,81]},{ name : "Damage", nodes : [20,57,59,5,81,25,82,35,83]},{ name : "Critical", nodes : [61,60,59,44,46,3,81,16,82,83]}],[{ name : "Accessory", nodes : [62,63,67,69,70,73,74,77,78,66]},{ name : "Accessory+", nodes : [64,65,68,71,72,75,76,79,80]},{ name : "Universal+", nodes : [36,37,38,53,54,55,57,59,61]},{ name : "Common+", nodes : [42,43,44,45,46,51]},{ name : "Melee+", nodes : [1,2,3,4,5,6,12,14,15,81]},{ name : "Ranged+", nodes : [16,17,18,19,20,21,25,58,82]},{ name : "Magic+", nodes : [26,27,28,32,33,34,35,82,83]}],[{ name : "Universal-", nodes : [39,40,41,56]},{ name : "Common-", nodes : [47,48,49,50]},{ name : "Melee-", nodes : [7,8,9,10,11,13]},{ name : "Ranged-", nodes : [22,23,24]},{ name : "Magic-", nodes : [29,30,31]}]];
	this.prefixes = this.pfxMeta[0];
	this.btMeta = [];
	p = 10;
	i = -1;
	while(++i < 3) {
		this.btMeta.push(this.addButton(p,h * 4 + 8,i < 1?"Library":i < 2?"Positive":"Negative",i < 1?6:i < 2?4:2,this.getMetaClick(i)));
		p += this.btMeta[i].width + 8;
		var _g1 = 0;
		var _g11 = this.pfxMeta[i];
		while(_g1 < _g11.length) {
			var cat = _g11[_g1];
			++_g1;
			cat.enName = cat.name;
		}
	}
	this.btPrefix = [];
	this.btGroups = [];
	this.pfxGroup = 0;
	this.btMeta[0].click();
	app_TabEdit.set_item(app_TabEdit.tempItem);
};
$hxClasses["app.TabEdit"] = app_TabEdit;
app_TabEdit.__name__ = ["app","TabEdit"];
app_TabEdit.get_inst = function() {
	if(app_TabEdit._inst == null) new app_TabEdit();
	return app_TabEdit._inst;
};
app_TabEdit.set_item = function(v) {
	if(app_SlotNode.current != v) {
		app_SlotNode.current = v;
		var o = app_TabEdit.get_inst();
		o.sync_id(v.slot.item);
		o.fdCount.set_value(v.get_count());
		o.fdPrefix.set_value(v.get_prefix());
		o.lxPrefixSync(v.get_prefix());
		o.pfxPick(o.pfxGroup);
	}
	return v;
};
app_TabEdit.__super__ = app_TabBase;
app_TabEdit.prototype = $extend(app_TabBase.prototype,{
	updateLang: function() {
		var cat = "tab.edit";
		this.lbName.locTextTooltip(cat,"name").chainX(this.fdName);
		this.lbIndex.locTextTooltip(cat,"index").chainX(this.fdIndex);
		this.lbCount.locTextTooltip(cat,"count").chainX(this.fdCount);
		this.lbPrefix.locTextTooltip(cat,"prefix").chainX(this.fdPrefix).chainX(this.lxPrefix);
		this.lxPrefixSync(this.lxPrefixId);
		var _g = 0;
		var _g1 = this.btMeta;
		while(_g < _g1.length) {
			var bt = _g1[_g];
			++_g;
			bt.locTextTooltip("lib.prefix",bt.enText);
		}
		var _g2 = 0;
		var _g11 = this.pfxMeta;
		while(_g2 < _g11.length) {
			var cat1 = _g11[_g2];
			++_g2;
			var _g21 = 0;
			while(_g21 < cat1.length) {
				var cat2 = cat1[_g21];
				++_g21;
				cat2.name = Lang.loc("lib.prefix",cat2.enName,cat2.enName);
			}
		}
		this.btMeta[0].chainX(this.btMeta[1],8).chainX(this.btMeta[2],8);
		var metaCur = HxOverrides.indexOf(this.pfxMeta,this.prefixes,0);
		if(metaCur >= 0) this.btMeta[metaCur].click();
		app_TabBase.prototype.updateLang.call(this);
	}
	,update: function(dt) {
		app_TabBase.prototype.update.call(this,dt);
	}
	,getMetaClick: function(q) {
		var _g = this;
		return function(_) {
			_g.prefixes = _g.pfxMeta[q];
			_g.pfxGroup = 0;
			var j = -1;
			while(++j < _g.prefixes.length) {
				if(_g.btGroups.length <= j) _g.btGroups.push(_g.addButton(0,8 + _g.m.font.lineHeight * (5 + j),"",1,_g.getPfxPick(j)));
				_g.btGroups[j].set_text(_g.prefixes[j].name);
			}
			while(j < _g.btGroups.length) _g.btGroups[j++].set_text("");
			_g.pfxPick(0);
		};
	}
	,lxPrefixSync: function(v) {
		this.lxPrefixId = v;
		var p = terra_Item.prefixes.h[v];
		if(p != null) {
			this.lxPrefix.set_text(" \"" + p.name + "\"");
			var i = p.tier;
			this.lxPrefix.set_style(i < -1?8:i < 0?6:i < 1?3:i < 2?4:5);
			this.lxPrefix.tooltipText = p.text;
		} else {
			this.lxPrefix.set_text("\"?\"");
			this.lxPrefix.tooltipText = null;
			this.lxPrefix.set_style(1);
		}
	}
	,sync_id: function(v) {
		if(v != null && (v.id != 0 || v.name != "")) {
			this.fdIndex.set_value(v.id);
			this.fdName.set_text(v.name);
			this.fdCode.set_value(v.code);
		} else {
			this.fdIndex.set_value(0);
			this.fdName.set_text("");
			this.fdCode.set_value("");
		}
		return v;
	}
	,set_prefix: function(v) {
		if(app_SlotNode.current.get_prefix() != v) {
			app_SlotNode.current.set_prefix(v);
			this.fdPrefix.set_value(v);
			this.lxPrefixSync(v);
			this.pfxPick(this.pfxGroup);
		}
		return v;
	}
	,getPfxClick: function(q) {
		var _g = this;
		return function(_) {
			var m = _g.prefixes[_g.pfxGroup].nodes;
			if(q < m.length) _g.set_prefix(m[q]);
		};
	}
	,getPfxPick: function(q) {
		var _g = this;
		return function(_) {
			_g.pfxPick(q);
		};
	}
	,pfxPick: function(q) {
		var i = -1;
		var g = this.prefixes[q].nodes;
		var l;
		this.pfxGroup = q;
		i = -1;
		l = this.btGroups.length;
		while(++i < l) this.btGroups[i].set_style(i == q?3:1);
		var btp;
		i = -1;
		l = g.length;
		while(++i < l) {
			btp = this.btPrefix[i];
			if(btp == null) {
				btp = this.addButton(120,8 + (i + 5) * this.m.font.lineHeight,"",1,this.getPfxClick(i));
				this.btPrefix[i] = btp;
			}
			var pi = g[i];
			var p = terra_Item.prefixes.h[pi];
			btp.set_text(p.name);
			btp.set_style(app_SlotNode.current != null && app_SlotNode.current.get_prefix() == pi?3:1);
			btp.tooltipText = p.text;
		}
		l = this.btPrefix.length;
		while(i < l) {
			btp = this.btPrefix[i++];
			btp.set_text("");
			btp.tooltipText = null;
		}
	}
	,__class__: app_TabEdit
});
var app_TabEffects = function() {
	app_TabEffects.inst = this;
	var i;
	app_TabBase.call(this);
	this.lbHoverTitle = new dom_Label();
	this.lbHoverTitle.x = 16;
	this.lbHoverTitle.y = -8;
	this.lbHoverTitle.set_style(4);
	this.lbHoverDesc = new dom_Label();
	this.lbHoverDesc.x = this.lbHoverTitle.x;
	this.lbHoverDesc.y = this.lbHoverTitle.y + this.lbHoverTitle.font.lineHeight;
	this.add(this.current = new app_TabBuffs());
	this.current.x = this.current.y = 2;
	i = -1;
	while(++i < 44) this.current.addBuff(i % 11 * 36,(i / 11 | 0) * 42,i);
	this.current.sync(this.m.player);
	this.add(this.side = new app_BuffSide());
	this.side.x = 410;
	this.add(this.lib = new app_BuffLib());
	this.lib.y = 180;
	app_TabEffects.temp = new app_BuffNode(-1,true);
	app_TabEffects.buff = this.current.buffs[0];
	this.lbIo = this.addLabel(4,300,"Current buffs: ",1);
	this.btSave = this.addButton((function($this) {
		var $r;
		var _this = $this.lbIo;
		$r = _this.x + _this.width;
		return $r;
	}(this)),this.lbIo.y,"Save",4,$bind(this,this.onSave));
	this.btLoad = this.addButton((function($this) {
		var $r;
		var _this1 = $this.btSave;
		$r = _this1.x + _this1.width;
		return $r;
	}(this)) + 8,this.lbIo.y,"Load",3,$bind(this,this.onLoad));
	this.btAppend = this.addButton((function($this) {
		var $r;
		var _this2 = $this.btLoad;
		$r = _this2.x + _this2.width;
		return $r;
	}(this)) + 8,this.lbIo.y,"Append",5,$bind(this,this.onAppend));
	if(app_TabEffects.frLoad == null) {
		app_TabEffects.frLoad = new openfl_net_FileReference();
		app_TabEffects.fxLoad = [new openfl_net_FileFilter("Terrasavr buff files (*.json;*.tsb)","*.json;*.tsb"),new openfl_net_FileFilter("All files (*.*)","*.*")];
		app_TabEffects.frLoad.addEventListener("select",function(_) {
			app_TabEffects.frLoad.load();
		});
		app_TabEffects.frLoad.addEventListener("complete",function(_1) {
			app_TabEffects.fhLoad(_1.get_target().data);
		});
	}
};
$hxClasses["app.TabEffects"] = app_TabEffects;
app_TabEffects.__name__ = ["app","TabEffects"];
app_TabEffects.tpad = function(v) {
	if(v < 10) return "0" + v; else return "" + v;
};
app_TabEffects.toTime = function(ticks) {
	var f = ticks % 60;
	var s = ticks / 60 | 0;
	var sfx;
	if(f != 0) sfx = "." + app_TabEffects.tpad(f * 1.6666666666666667 | 0); else sfx = "";
	if(s < 60) return app_TabEffects.tpad(s) + sfx;
	var m = s / 60 | 0;
	s %= 60;
	if(m < 60) return m + ":" + app_TabEffects.tpad(s) + sfx;
	var h = m / 60 | 0;
	m %= 60;
	return h + ":" + app_TabEffects.tpad(m) + ":" + app_TabEffects.tpad(s) + sfx;
};
app_TabEffects.__super__ = app_TabBase;
app_TabEffects.prototype = $extend(app_TabBase.prototype,{
	updateLang: function() {
		var cat = "tab.buffs";
		this.lbIo.locTextTooltip(cat,"menu.label");
		this.btSave.locTextTooltip(cat,"menu.save");
		this.btLoad.locTextTooltip(cat,"menu.load");
		this.btAppend.locTextTooltip(cat,"menu.append");
		this.lbIo.chainX(this.btSave,8).chainX(this.btLoad,8).chainX(this.btAppend,8);
		this.side.updateLang();
	}
	,onSave: function(_) {
		var d = new openfl_utils_ByteArray();
		var obj = { };
		obj.resourceType = "TerrasavrBuffs";
		obj.resourceVersion = "1.0";
		obj.gameVersion = this.m.player.invVersion;
		var buffs = [];
		var _g = 0;
		var _g1 = this.m.player.buffs;
		while(_g < _g1.length) {
			var b = _g1[_g];
			++_g;
			var bo = { };
			bo.id = b.id;
			bo.time = b.time;
			buffs.push(bo);
		}
		obj.buffs = buffs;
		d.writeUTFBytes(JSON.stringify(obj,null,"\t"));
		d.set_length(d.position);
		app_TopPane.inst.frSave.save(d,"buffs.tsb");
	}
	,onLoadData: function(d) {
		var _g = 0;
		var _g1 = this.m.player.buffs;
		while(_g < _g1.length) {
			var b = _g1[_g];
			++_g;
			b.reset();
		}
		this.onAppendData(d);
	}
	,onLoad: function(_) {
		app_TabEffects.fhLoad = $bind(this,this.onLoadData);
		app_TabEffects.frLoad.browse(app_TabEffects.fxLoad);
	}
	,reject: function() {
		app_TopPane.inst.print("Specified file isn't a Terrasavr buffs file.",3);
	}
	,onAppendData: function(d) {
		var v;
		var i;
		var p;
		var r;
		var id;
		var dur;
		var q = this.current.buffs;
		var n = q.length;
		d.position = 0;
		var _g = d.data.getUint8(d.position++);
		switch(_g) {
		case 123:
			d.position = 0;
			var obj;
			try {
				obj = JSON.parse(d.readUTFBytes(d.length));
			} catch( e ) {
				if (e instanceof js__$Boot_HaxeError) e = e.val;
				this.reject();
				return;
			}
			this.appendJson(obj);
			break;
		case 47:
			d.position = 0;
			this.appendBinary(d);
			break;
		case 239:
			if(d.data.getUint8(d.position++) == 187) {
				if(d.data.getUint8(d.position++) == 191) try {
					var obj1 = JSON.parse(d.readUTFBytes(d.length));
					this.appendJson(obj1);
				} catch( e1 ) {
					if (e1 instanceof js__$Boot_HaxeError) e1 = e1.val;
					this.reject();
				} else this.reject();
			} else this.reject();
			break;
		default:
			this.reject();
		}
	}
	,appendJson: function(obj) {
		if(obj.resourceType != "TerrasavrBuffs") {
			this.reject();
			return;
		}
		var buffs = obj.buffs;
		var pb = this.m.player.buffs;
		var _g1 = 0;
		var _g = pb.length;
		while(_g1 < _g) {
			var i = _g1++;
			var b = buffs[i];
			if(b != null) pb[i].set(b.id,b.time); else pb[i].reset();
		}
	}
	,appendBinary: function(d) {
		if(d.length < 12 || d.readUTFBytes(12) != "/terrasavr/b") {
			app_TopPane.inst.print("Specified file isn't a Terrasavr buff file.",3);
			return;
		}
		var v;
		var i;
		var p;
		var r;
		var id;
		var dur;
		var q = this.current.buffs;
		var n = q.length;
		v = d.readInt();
		i = -1;
		p = -1;
		while(++i < n && d.length - d.position >= 4) try {
			id = d.readInt();
			dur = d.readInt();
			if(id == 0) continue;
			while(++p < n && q[p].get_id() != 0) {
			}
			if(p >= n) break;
			q[p].set_id(id);
			q[p].set_time(dur);
		} catch( _ ) {
			if (_ instanceof js__$Boot_HaxeError) _ = _.val;
			break;
		}
	}
	,onAppend: function(_) {
		app_TabEffects.fhLoad = $bind(this,this.onAppendData);
		app_TabEffects.frLoad.browse(app_TabEffects.fxLoad);
	}
	,sync: function(p) {
		this.current.sync(p);
		this.side.sync(p);
		this.lib.sync(p);
	}
	,render: function(u,v) {
		app_TabBase.prototype.render.call(this,u,v);
		if(app_BuffNode.inHand != null) app_BuffNode.inHand.drawBuff(this.m.posX,this.m.posY + 4,0.6);
		if(this.m.mouseOver != null && js_Boot.__instanceof(this.m.mouseOver,app_BuffNode)) {
			var o = this.m.mouseOver;
			var i = o.get_id();
			var t = app_TabEffects.toTime(o.get_time());
			var d;
			if(i != 0) {
				var name;
				var ttip;
				name = terra_Buff.$name(i) + (" (#" + i + ")");
				ttip = terra_Buff.ttip(i);
				if(!o.fixed) ttip += "\n" + t;
				if(o.get_id() > app_BuffNode.maxId) ttip += "\n(incompatible)";
				this.lbHoverTitle.set_text(name);
				this.lbHoverDesc.set_text(ttip);
				this.m.xrect(this.m.posX + 14,this.m.posY - 10,this.m.imax(this.lbHoverTitle.width,this.lbHoverDesc.width) + 5,(name.length > 0?this.lbHoverDesc.height:0) + (ttip.length > 0?this.lbHoverTitle.height:0) + 3,0,0.6);
				this.lbHoverTitle.render(this.m.posX,this.m.posY);
				this.lbHoverDesc.render(this.m.posX,this.m.posY);
			}
		}
	}
	,__class__: app_TabEffects
});
var app_BuffSide = function() {
	this.libButtons = [];
	this.tab = app_TabEffects.inst;
	app_TabBase.call(this);
	this.lbName = this.addLabel(0,0,"Name: ",4);
	this.fdName = this.addLabel((function($this) {
		var $r;
		var _this = $this.lbName;
		$r = _this.x + _this.width;
		return $r;
	}(this)),0,"");
	this.lbIndex = this.addLabel(0,(function($this) {
		var $r;
		var _this1 = $this.lbName;
		$r = _this1.y + _this1.height;
		return $r;
	}(this)),"Index: ",4);
	this.fdIndex = this.addInt((function($this) {
		var $r;
		var _this2 = $this.lbIndex;
		$r = _this2.x + _this2.width;
		return $r;
	}(this)),this.lbIndex.y,"$",1,function(_) {
		app_TabEffects.buff.set_id(_);
	});
	this.lbTime = this.addLabel(0,(function($this) {
		var $r;
		var _this3 = $this.lbIndex;
		$r = _this3.y + _this3.height;
		return $r;
	}(this)),"Duration: ",4);
	this.fdTime = this.addFloat((function($this) {
		var $r;
		var _this4 = $this.lbTime;
		$r = _this4.x + _this4.width;
		return $r;
	}(this)),this.lbTime.y,"$s",1,function(v) {
		app_TabEffects.buff.set_time(v * 60 | 0);
	});
	this.fdTime.precision = 2;
	this.initLibs();
};
$hxClasses["app.BuffSide"] = app_BuffSide;
app_BuffSide.__name__ = ["app","BuffSide"];
app_BuffSide.__super__ = app_TabBase;
app_BuffSide.prototype = $extend(app_TabBase.prototype,{
	addLib: function(target,text,style,d) {
		var _g = this;
		var r = this.addButton(8,this.ofsLib,text,style,function(_) {
			var b = _g.tab.lib.buffs;
			var i;
			var l = b.length;
			var c = d.length;
			i = -1;
			while(++i < l) {
				b[i].set_id(i < c?d[i]:0);
				b[i].set_time(terra_Buff.getMaxTime());
			}
		});
		this.remove(r);
		target.add(r);
		this.libButtons.push(r);
		this.ofsLib = r.y + r.height;
	}
	,initLibs: function() {
		var _g = this;
		var i;
		var a = null;
		var q;
		this.libMain = q = this.addContainer(0,(function($this) {
			var $r;
			var _this = $this.lbTime;
			$r = _this.y + _this.height;
			return $r;
		}(this)));
		this.btLib = [];
		this.ofsLib = 0;
		this.addLib(q,"Utility",7,[1,4,8,9,10,11,12,15,18,19,27,34,57,3,63,101,102]);
		this.addLib(q,"Offensive",3,[7,13,86,16,25,17,71,73,74,75,76,77,78,79,93,98,99,100]);
		this.addLib(q,"Defensive",4,[5,14,26,43,48,58,59,62,87,89,95,96,97]);
		this.addLib(q,"Special",5,[3,6,26,28,29,60,64,49,83,90]);
		this.addLib(q,"Pets",6,a = [40,41,42,45,50,51,52,53,54,55,56,61,65,66,81,82,84,85,91,92]);
		this.isPet = new haxe_ds_IntMap();
		i = a.length;
		while(--i >= 0) this.isPet.h[a[i]] = true;
		this.addLib(q,"Negative",2,[21,20,22,23,24,30,31,32,33,35,36,37,38,44,46,47,67,68,69,70,72,80,86,88,94,103]);
		var toIndex = this.addButton(8,this.ofsLib,"Index",1,function(b) {
			b.onHover = false;
			_g.remove(_g.libMain);
			_g.add(_g.libIndex);
		});
		this.libButtons.push(toIndex);
		this.remove(toIndex);
		this.libMain.add(toIndex);
		this.libIndex = q = this.addContainer(0,(function($this) {
			var $r;
			var _this1 = $this.lbTime;
			$r = _this1.y + _this1.height;
			return $r;
		}(this)));
		this.remove(this.libIndex);
		var back = this.addButton(8,0,"../Index",1,function(b1) {
			b1.onHover = false;
			_g.remove(_g.libIndex);
			_g.add(_g.libMain);
		});
		this.libButtons.push(back);
		this.remove(back);
		this.libIndex.add(back);
		this.ofsLib = back.y + back.height;
		i = 0;
		while(++i < terra_Buff.COUNT) {
			if(i % 33 == 1) {
				a = [];
				this.addLib(q,"Index (" + i + "-" + (i + 32) + ")",1,a);
			}
			a.push(i);
		}
	}
	,updateLang: function() {
		var cat = "tab.buffs";
		this.lbName.locTextTooltip(cat,"name").chainX(this.fdName);
		this.lbIndex.locTextTooltip(cat,"index").chainX(this.fdIndex);
		this.lbTime.locTextTooltip(cat,"duration").chainX(this.fdTime);
		var lc = "lib.buffs";
		var _g = 0;
		var _g1 = this.libButtons;
		while(_g < _g1.length) {
			var bt = _g1[_g];
			++_g;
			if(bt.enText == "../Index") bt.set_text("../" + Lang.loc(lc,"Index","Index")); else if(StringTools.startsWith(bt.enText,"Index ")) bt.set_text(Lang.loc(lc,"Index","Index") + HxOverrides.substr(bt.enText,5,null)); else bt.locTextTooltip(lc,bt.enText);
		}
	}
	,render: function(u,v) {
		var i = app_TabEffects.buff.get_id();
		this.fdName.set_text(terra_Buff.$name(i));
		this.fdIndex.set_value(i);
		this.fdTime.set_value(app_TabEffects.buff.get_time() / 60);
		app_TabBase.prototype.render.call(this,u,v);
	}
	,sync: function(p) {
	}
	,__class__: app_BuffSide
});
var app_BuffLib = function() {
	var i;
	app_TabBuffs.call(this);
	i = -1;
	while(++i < 33) this.addBuff(i % 11 * 36,(i / 11 | 0) * 42,-1,true);
};
$hxClasses["app.BuffLib"] = app_BuffLib;
app_BuffLib.__name__ = ["app","BuffLib"];
app_BuffLib.__super__ = app_TabBuffs;
app_BuffLib.prototype = $extend(app_TabBuffs.prototype,{
	__class__: app_BuffLib
});
var app_TabEquips = function() {
	this.currentLoadout = -1;
	this.buttons = [];
	this.loadouts = [];
	var _g1 = this;
	app_TabBase.call(this);
	this.loadoutsLabel = this.addLabel(200,0,"Loadouts:",1,1);
	var offset = 0;
	var _g = 0;
	while(_g < 3) {
		var i = [_g++];
		this.loadouts.push(new app_TabEquipsLoadout(this,1 + i[0]));
		var bt = this.addButton(offset,(function($this) {
			var $r;
			var _this = $this.loadoutsLabel;
			$r = _this.y + _this.height;
			return $r;
		}(this)),"" + (1 + i[0]),1,(function(i) {
			return function(_) {
				_g1.setLoadout(i[0]);
			};
		})(i));
		offset = bt.x + bt.width + 6;
		this.buttons.push(bt);
	}
	offset = 400 - (offset - 6) >> 1;
	var _g2 = 0;
	var _g11 = this.buttons;
	while(_g2 < _g11.length) {
		var bt1 = _g11[_g2];
		++_g2;
		bt1.x += offset;
	}
	this.setLoadout(0);
};
$hxClasses["app.TabEquips"] = app_TabEquips;
app_TabEquips.__name__ = ["app","TabEquips"];
app_TabEquips.__super__ = app_TabBase;
app_TabEquips.prototype = $extend(app_TabBase.prototype,{
	setLoadout: function(i) {
		if(this.currentLoadout >= 0) {
			this.remove(this.loadouts[this.currentLoadout]);
			this.buttons[this.currentLoadout].set_style(1);
		}
		this.currentLoadout = i;
		this.add(this.loadouts[i]);
		this.buttons[i].set_style(4);
	}
	,sync: function(p) {
		app_TabBase.prototype.sync.call(this,p);
		var _g = 0;
		var _g1 = this.loadouts;
		while(_g < _g1.length) {
			var loadout = _g1[_g];
			++_g;
			loadout.sync(p);
		}
	}
	,updateLang: function() {
		var cat = "tab.equips";
		this.loadoutsLabel.locText(cat,"loadouts");
		var offset = 0;
		var _g = 0;
		var _g1 = this.buttons;
		while(_g < _g1.length) {
			var bt = _g1[_g];
			++_g;
			bt.x = offset;
			offset = bt.x + bt.width + 6;
		}
		offset = 400 - (offset - 6) >> 1;
		var _g2 = 0;
		var _g11 = this.buttons;
		while(_g2 < _g11.length) {
			var bt1 = _g11[_g2];
			++_g2;
			bt1.x += offset;
		}
		app_TabBase.prototype.updateLang.call(this);
		var _g3 = 0;
		var _g12 = this.loadouts;
		while(_g3 < _g12.length) {
			var loadout = _g12[_g3];
			++_g3;
			loadout.updateLang();
		}
	}
	,render: function(u,v) {
		var a;
		if(this.m.player.version >= 269) a = 1; else a = 0.5;
		app_TabBase.prototype.render.call(this,u,v);
	}
	,__class__: app_TabEquips
});
var app_TabItems = function() {
	app_TabBase.call(this);
	this.items = [];
};
$hxClasses["app.TabItems"] = app_TabItems;
app_TabItems.__name__ = ["app","TabItems"];
app_TabItems.__super__ = app_TabBase;
app_TabItems.prototype = $extend(app_TabBase.prototype,{
	addSlot: function(finder,x,y,kind) {
		if(kind == null) kind = 0;
		var r = new app_SlotNode(finder,kind);
		r.x = x;
		r.y = y;
		this.add(r);
		this.items.push(r);
		return r;
	}
	,sync: function(p) {
		var i = -1;
		var l = this.items.length;
		var o;
		while(++i < l) {
			o = this.items[i];
			o.set_slot(o.finder(p));
		}
	}
	,render: function(u,v) {
		app_TabBase.prototype.render.call(this,u,v);
	}
	,__class__: app_TabItems
});
var app_TabInventory = function(finderGen,length,title,offsetTop,slotKind) {
	if(slotKind == null) slotKind = 0;
	if(offsetTop == null) offsetTop = 0;
	this.bottomNodes = [];
	var i;
	var p;
	app_TabItems.call(this);
	if(app_TabInventory.lbHoverTitle == null) {
		app_TabInventory.lbHoverTitle = new dom_Label();
		app_TabInventory.lbHoverTitle.set_text("Item");
		app_TabInventory.lbHoverTitle.x = 16;
		app_TabInventory.lbHoverTitle.y = -8;
		app_TabInventory.lbHoverTitle.set_style(4);
		app_TabInventory.lbHoverDesc = new dom_Label();
		app_TabInventory.lbHoverDesc.y = app_TabInventory.lbHoverTitle.y + app_TabInventory.lbHoverTitle.height;
		app_TabInventory.lbHoverDesc.x = app_TabInventory.lbHoverTitle.x;
	}
	this.title = title;
	var _g = 0;
	while(_g < length) {
		var i1 = _g++;
		this.addSlot(finderGen(i1),i1 % 10 * 40,offsetTop + (i1 / 10 | 0) * 40,slotKind);
	}
	if(app_TabInventory.sideCtr == null) app_TabInventory.initSide();
	this.add(app_TabInventory.sideCtr);
	i = -1;
	while(++i < app_TabInventory.sideBtns.length) this.add(app_TabInventory.sideBtns[i]);
	this.add(this.shelfCtr = new dom_Container());
	this.shelfCtr.y = offsetTop + 40 * Math.ceil(length / 10);
	this.shelfCtr.add(app_TabShelf.get_inst());
	this.extraNodes();
};
$hxClasses["app.TabInventory"] = app_TabInventory;
app_TabInventory.__name__ = ["app","TabInventory"];
app_TabInventory.pickTab = function(v) {
	if(app_TabInventory.sideNow != null) app_TabInventory.sideCtr.remove(app_TabInventory.sideNow);
	app_TabInventory.sideNow = app_TabInventory.sideTabs[v];
	var i = -1;
	while(++i < app_TabInventory.sideBtns.length) app_TabInventory.sideBtns[i].set_style(i == v?4:1);
	app_TabInventory.sideCtr.add(app_TabInventory.sideNow);
};
app_TabInventory.getPickTab = function(i) {
	return function(_) {
		app_TabInventory.pickTab(i);
	};
};
app_TabInventory.initSide = function() {
	var i;
	var n;
	var p;
	var bt;
	var m;
	app_TabInventory.sideCtr = new dom_Container();
	app_TabInventory.sideCtr.x = 420;
	app_TabInventory.sideCtr.y = 28;
	app_TabInventory.sideTabs = [app_TabEdit.get_inst(),app_TabLibrary.get_inst()];
	app_TabInventory.sideBtns = [];
	m = ["Edit","Library"];
	m.push("Debug");
	n = m.length;
	i = -1;
	p = 410;
	while(++i < n) {
		var bt1 = new dom_Button();
		bt1.x = p;
		bt1.y = 0;
		bt1.set_text(bt1.enText = m[i]);
		if(i == 2) {
			bt1.onClick = app_TabInventory.onDebugTab;
			bt1.tooltipText = "Click: get code\nCtrl+Click: assign items\nCtrl+Shift+Click: clear";
		} else bt1.onClick = app_TabInventory.getPickTab(i);
		p += bt1.width + 8;
		app_TabInventory.sideBtns.push(bt1);
	}
	app_TabInventory.sideBtns[0].click();
};
app_TabInventory.onDebugTab = function(_) {
	var m = Main._main;
	if(!m.ctrlDown) {
		if(app_TabInventory.fdDebug == null) {
			app_TabInventory.fdDebug = new dom_StringField();
			app_TabInventory.fdDebug.set_format("=$");
			app_TabInventory.fdDebug.x = 200;
			app_TabInventory.fdDebug.y = 0;
			app_TabInventory.sideCtr.add(app_TabInventory.fdDebug);
		}
		var r = "[";
		var i = 0;
		var tabs = 4;
		while(i < 40) {
			if(i % 10 == 0) r += StringTools.rpad("\n","\t",tabs + 2); else r += " ";
			var slot = m.player.bankItems[i];
			var item = slot.item;
			var id;
			if(item != null) id = item.id; else id = 0;
			r += StringTools.lpad(id == null?"null":"" + id," ",4) + ",";
			i++;
		}
		r += StringTools.rpad("\n","\t",tabs + 1) + "]";
		app_TabInventory.fdDebug.set_value(r);
		dom_VoidField.setup();
		dom_VoidField.field.set_multiline(true);
		app_TabInventory.fdDebug.click();
	} else if(m.altDown) {
		var i1 = -1;
		var si = app_TabShelf.get_inst().items;
		var v;
		while(++i1 < 40) {
			v = si[i1].slot.item;
			if(v == null || v.id == 0 && v.name == "") continue;
			var s = v.nameLq;
			var k = -1;
			if(s.indexOf("platform") >= 0) k = 31; else if(s.indexOf(" bar") >= 0) k = 10; else if(s.indexOf(" brick wall") >= 0) k = 30; else if(s.indexOf(" brick") >= 0) k = 20; else if(s.indexOf(" block wall") >= 0) k = 30; else if(s.indexOf(" block") >= 0) k = 20; else if(s.indexOf("trapped ") >= 0) k = 1; else if(s.indexOf(" chest") >= 0) k = 11; else if(s.indexOf("door") >= 0) k = 6; else if(s.indexOf("lantern") >= 0) k = 7; else if(s.indexOf("chandeli") >= 0) k = 8; else if(s.indexOf(" table") >= 0) k = 15; else if(s.indexOf("clock") >= 0) k = 16; else if(s.indexOf("candela") >= 0) k = 18; else if(s.indexOf("candle") >= 0) k = 17; else if(s.indexOf("bathtub") >= 0) k = 19; else if(s.indexOf("work b") >= 0) k = 25; else if(s.indexOf("sofa") >= 0) k = 26; else if(s.indexOf("lamp") >= 0) k = 27; else if(s.indexOf("piano") >= 0) k = 28; else if(s.indexOf("sink") >= 0) k = 29; else if(s.indexOf("chair") >= 0) k = 35; else if(s.indexOf("bed") >= 0) k = 36; else if(s.indexOf("dresser") >= 0) k = 37; else if(s.indexOf("bookcase") >= 0) k = 38; else if(s.indexOf("toilet") >= 0) k = 39;
			if(k >= 0) {
				var slot1 = m.player.bankItems[k];
				if(slot1.isEmpty()) {
					slot1.item = v;
					slot1.count = 1;
				}
			}
		}
	} else if(!m.shiftDown) {
		var i2 = -1;
		var s1 = app_TabShelf.get_inst().items;
		var v1;
		while(++i2 < 40) {
			v1 = s1[i2].slot.item;
			var slot2 = m.player.bankItems[i2];
			slot2.item = v1;
			if(!(v1 == null || v1.id == 0 && v1.name == "")) slot2.count = 1; else slot2.count = 0;
		}
	} else {
		var i3 = -1;
		while(++i3 < 40) {
			var slot3 = m.player.bankItems[i3];
			slot3.item = null;
			slot3.count = 0;
		}
	}
};
app_TabInventory.__super__ = app_TabItems;
app_TabInventory.prototype = $extend(app_TabItems.prototype,{
	extraNodes: function() {
		if(this.title == "Search") return;
		var i;
		var n;
		var btb = this.bottomNodes;
		btb.push(this.addLabel(0,this.shelfCtr.y + 160,"Items:",1));
		btb.push(new app_io_IoSave(this.title));
		btb.push(new app_io_IoLoad(this.title,false));
		btb.push(new app_io_IoLoad(this.title,true));
		btb.push(new app_io_IoLib());
		i = 0;
		while(i < this.items.length) {
			var finder = this.items[i].finder;
			var _g = 0;
			while(_g < btb.length) {
				var io = btb[_g];
				++_g;
				if(js_Boot.__instanceof(io,app_io_IoButton)) {
					var iob = io;
					iob.addGetter(finder);
				}
			}
			i++;
		}
		var at = btb[0];
		var _g1 = 0;
		while(_g1 < btb.length) {
			var bt = btb[_g1];
			++_g1;
			bt.y = at.y;
			if(bt != at) {
				at = at.chainX(bt,8);
				this.add(bt);
			}
		}
	}
	,updateLang: function() {
		app_TabInventory.sideBtns[0].locTextTooltip("tab.edit","title");
		app_TabInventory.sideBtns[1].locTextTooltip("tab.library","title");
		app_TabInventory.sideBtns[0].chainX(app_TabInventory.sideBtns[1],8);
		app_TabInventory.sideBtns[1].chainX(app_TabInventory.sideBtns[2],8);
		var at = this.bottomNodes[0];
		if(at != null) {
			var _g = 0;
			var _g1 = this.bottomNodes;
			while(_g < _g1.length) {
				var bt = _g1[_g];
				++_g;
				var id = Lang.makeID(bt.enText);
				var verb = null;
				if(js_Boot.__instanceof(bt,app_io_IoButton)) verb = bt.verb; else if(!js_Boot.__instanceof(bt,dom_Button)) id = "label" + Lang.capitalize(id);
				if(verb != null) id += Lang.capitalize(verb);
				bt.locTextTooltip("tab.items",id);
				if(bt != at) {
					if(bt.y != at.y) {
						bt.x = this.bottomNodes[0].x;
						at = bt;
					} else at = at.chainX(bt,8);
				}
			}
		}
	}
	,render: function(u,v) {
		app_TabItems.prototype.render.call(this,u,v);
		if(app_SlotNode.inHand != null) app_SlotNode.inHand.drawItem(this.m.posX,this.m.posY - 4,0.5);
		if(this.m.holdNode == null && this.m.mouseOver != null && js_Boot.__instanceof(this.m.mouseOver,app_SlotNode)) {
			var overNode = this.m.mouseOver;
			var slot = overNode.slot;
			var item = slot.item;
			if(item != null && (item.id != 0 || item.name != "")) {
				var name = item.name;
				if(slot.prefix != 0) {
					var pfx = terra_Item.prefixes.h[slot.prefix];
					if(pfx != null) name = pfx.name + " " + name;
				}
				if(this.m.tapi) name += " (" + item.code + ")"; else name += " (#" + item.id + ")";
				var ttip = item.text;
				if(slot.item.id > app_SlotNode.maxId) ttip += "\n(incompatible)";
				app_TabInventory.lbHoverTitle.set_text(name);
				app_TabInventory.lbHoverDesc.set_text(ttip);
				this.m.xrect(this.m.posX + 14,this.m.posY - 10,this.m.imax(app_TabInventory.lbHoverTitle.width,app_TabInventory.lbHoverDesc.width) + 5,(name.length > 0?app_TabInventory.lbHoverTitle.height:0) + (ttip.length > 0?app_TabInventory.lbHoverDesc.height:0) + 3,0,0.6);
				app_TabInventory.lbHoverTitle.render(this.m.posX,this.m.posY);
				app_TabInventory.lbHoverDesc.render(this.m.posX,this.m.posY);
			}
		}
	}
	,__class__: app_TabInventory
});
var app_TabEquipsLoadout = function(parent,loadoutIndex) {
	this.parent = parent;
	this.loadoutIndex = loadoutIndex;
	var i;
	var x;
	var y;
	app_TabInventory.call(this,null,0,"Loadout");
	this.lbHint = this.addLabel(10,84,"",1,0,2);
	this.lbCoins = this.addLabel(80,36,"Coins",1,1,0);
	this.lbAmmo = this.addLabel(320,36,"Ammo",1,1,0);
	var clSocial = 6332544;
	var clDye = 11104400;
	var _g = 0;
	while(_g < 10) {
		var i1 = [_g++];
		this.addSlot((function(i1) {
			return function(p) {
				return p.loadouts[loadoutIndex].items[i1[0]];
			};
		})(i1),i1[0] * 40,80);
		this.addSlot((function(i1) {
			return function(p1) {
				return p1.loadouts[loadoutIndex].social[i1[0]];
			};
		})(i1),i1[0] * 40,120).color = clSocial;
		this.addSlot((function(i1) {
			return function(p2) {
				return p2.loadouts[loadoutIndex].dyes[i1[0]];
			};
		})(i1),i1[0] * 40,160).color = clDye;
	}
	var _g1 = 0;
	while(_g1 < 4) {
		var i2 = [_g1++];
		this.addSlot((function(i2) {
			return function(p3) {
				return p3.coins[i2[0]];
			};
		})(i2),i2[0] * 40,0);
		this.addSlot((function(i2) {
			return function(p4) {
				return p4.ammo[i2[0]];
			};
		})(i2),240 + i2[0] * 40,0);
	}
};
$hxClasses["app.TabEquipsLoadout"] = app_TabEquipsLoadout;
app_TabEquipsLoadout.__name__ = ["app","TabEquipsLoadout"];
app_TabEquipsLoadout.__super__ = app_TabInventory;
app_TabEquipsLoadout.prototype = $extend(app_TabInventory.prototype,{
	extraNodes: function() {
		var _g1 = this;
		var ni;
		var ns = null;
		var nl = null;
		var i;
		var n;
		var p;
		this.shelfCtr.y = 200;
		p = this.shelfCtr.y + 160;
		var addGetter = function(f) {
			ns.addGetter(f);
			nl.addGetter(f);
		};
		var addCatGetter = function(key,f1) {
			ns.addGetter(f1,key);
			nl.addGetter(f1,key);
		};
		this.bottomNodes.push(ni = this.addLabel(0,p,"Equips:",1));
		this.bottomNodes.push(ns = new app_io_IoSave(this.title,"equips"));
		this.bottomNodes.push(nl = new app_io_IoLoad(this.title,false,"equips"));
		var _g = 0;
		while(_g < 10) {
			var i1 = [_g++];
			addGetter((function(i1) {
				return function(p1) {
					return p1.loadouts[_g1.loadoutIndex].items[i1[0]];
				};
			})(i1));
		}
		var _g2 = 0;
		while(_g2 < 4) {
			var i2 = [_g2++];
			addCatGetter("ammo",(function(i2) {
				return function(p2) {
					return p2.ammo[i2[0]];
				};
			})(i2));
		}
		ns.y = nl.y = p;
		nl.x = ni.x + ni.width;
		ns.x = nl.x + nl.width + 8;
		this.add(ns);
		this.add(nl);
		this.bottomNodes.push(ni = this.addLabel(0,p = ni.y + ni.height,"Vanity:",1));
		this.bottomNodes.push(ns = new app_io_IoSave("Vanity","cosmetics"));
		this.bottomNodes.push(nl = new app_io_IoLoad("Vanity",false,"cosmetics"));
		i = -1;
		n = this.items.length;
		var _g3 = 0;
		while(_g3 < 10) {
			var i3 = [_g3++];
			addGetter((function(i3) {
				return function(p3) {
					return p3.loadouts[_g1.loadoutIndex].social[i3[0]];
				};
			})(i3));
		}
		var _g4 = 0;
		while(_g4 < 10) {
			var i4 = [_g4++];
			addCatGetter("dyes",(function(i4) {
				return function(p4) {
					return p4.loadouts[_g1.loadoutIndex].dyes[i4[0]];
				};
			})(i4));
		}
		ns.y = nl.y = p;
		nl.x = ni.x + ni.width;
		ns.x = nl.x + nl.width + 8;
		this.add(ns);
		this.add(nl);
	}
	,updateLang: function() {
		var cat = "tab.equips";
		this.lbCoins.locTextTooltip(cat,"coins");
		this.lbAmmo.locTextTooltip(cat,"ammo");
		this.locMouseOver = Lang.loc(cat,"mouseoverSlots","(mouseover slots for info)");
		this.locLoadoutNote = Lang.loc(cat,"loadoutNote","Loadout $1");
		var cc = ["Helmet","Shirt","Pants","Accessory"];
		this.locClass = [];
		var _g = 0;
		while(_g < 3) {
			var clKind = _g++;
			this.locClass[clKind] = [];
			var _g1 = 0;
			while(_g1 < 4) {
				var slotKind = _g1++;
				var key = cc[slotKind].toLowerCase();
				var val = cc[slotKind];
				if(slotKind == 3) val += " $1";
				if(clKind == 1) {
					key += ".social";
					val = "Social " + val;
				} else if(clKind == 2) {
					key += ".dye";
					val = "Dye for " + val;
				}
				this.locClass[clKind][slotKind] = Lang.loc(cat,key,val);
			}
		}
		this.locExpertNote = Lang.loc(cat,"expertAccNote","$1 (for Expert/Master mode)");
		this.locMasterNote = Lang.loc(cat,"masterAccNote","$1 (for Master mode)");
		app_TabInventory.prototype.updateLang.call(this);
	}
	,render: function(u,v) {
		var el = this.m.mouseOver;
		var hint = this.locMouseOver;
		if(el == null) {
		} else if(js_Boot.__instanceof(el,dom_Button)) {
			var i = HxOverrides.indexOf(this.parent.buttons,el,0);
			if(i >= 0) hint = StringTools.replace(this.locLoadoutNote,"$1","" + (i + 1));
		} else if(js_Boot.__instanceof(el,app_SlotNode)) do {
			var sn = el;
			var player = this.m.player;
			var loadout = this.m.player.loadouts[this.loadoutIndex];
			var slot = sn.finder(player);
			var ind;
			var kind;
			if((ind = HxOverrides.indexOf(loadout.items,slot,0)) >= 0) kind = 0; else if((ind = HxOverrides.indexOf(loadout.social,slot,0)) >= 0) kind = 1; else if((ind = HxOverrides.indexOf(loadout.dyes,slot,0)) >= 0) kind = 2; else continue;
			hint = this.locClass[kind][ind < 3?ind:3];
			if(ind >= 3) hint = StringTools.replace(hint,"$1","" + (ind - 2));
			if(ind == 8) hint = StringTools.replace(this.locExpertNote,"$1",hint);
			if(ind == 9) hint = StringTools.replace(this.locMasterNote,"$1",hint);
		} while(false);
		this.lbHint.set_text(hint);
		app_TabInventory.prototype.render.call(this,u,v);
	}
	,__class__: app_TabEquipsLoadout
});
var app_TabFlags = function(tabMain) {
	this.cbLast = null;
	this.syncLangArr = [];
	this.syncArr = [];
	this.cbAll = [];
	var _g = this;
	app_TabBase.call(this);
	this.tabMain = tabMain;
	var X = function(enText,locKey,style,get,set,source) {
		var cb = _g.addCheckbox(24,_g.cbLast != null?(function($this) {
			var $r;
			var _this = _g.cbLast;
			$r = _this.y + _this.height;
			return $r;
		}(this)):0,enText,style,function(val) {
			set(_g.m.player,val);
		});
		if(source != null) {
			var srcName;
			var srcIcon;
			if(((source | 0) === source)) {
				var icon = new dom_TinyIcon(source);
				icon.x = 0;
				icon.y = cb.y + (cb.height >> 1) - 12;
				_g.add(icon);
				srcName = terra_Item.fromId(source).enName;
				srcIcon = source;
			} else {
				srcName = source;
				srcIcon = 0;
			}
			dom_NodeTools.setTooltip(cb,"Unlocked via " + srcName,srcIcon);
		}
		_g.cbLast = cb;
		_g.cbAll.push(cb);
		_g.syncArr.push(function(p) {
			cb.set_value(get(p));
		});
		_g.syncLangArr.push(function() {
			cb.set_format(Lang.loc("tab.char.flags",locKey,cb.enText));
			if(source != null) {
				var tt = Lang.ttip("tab.char.flags",locKey,null);
				if(tt == null) {
					var srcName1;
					if(((source | 0) === source)) srcName1 = terra_Item.fromId(source).name; else srcName1 = Lang.loc("tab.char.flags",locKey + ".via",source);
					tt = Lang.loc1("tab.char.flags","unlockedVia","Unlocked via $1",srcName1);
				}
				cb.tooltipText = tt;
			} else cb.tooltipText = Lang.ttip("tab.char.flags",locKey,cb.tooltipEnText);
		});
		return cb;
	};
	var cb1;
	var rx = 0;
	X("Extra accessory (expert/master mode)","extraAccessory",7,function(p1) {
		return p1.extraAccessory;
	},function(p2,b) {
		p2.extraAccessory = b;
	},3335);
	X("Unlocked biome torch swap","unlockedBiomeTorches",3,function(p3) {
		return p3.unlockedBiomeTorches;
	},function(p4,b1) {
		p4.unlockedBiomeTorches = b1;
	},"The Torch God event");
	X("Biome torch swap enabled","usingBiomeTorches",5,function(p5) {
		return p5.usingBiomeTorches;
	},function(p6,b2) {
		p6.usingBiomeTorches = b2;
	});
	X("Increased workstation range","artisanBread",3,function(p7) {
		return p7.extraUsingFlags[0];
	},function(p8,b3) {
		p8.extraUsingFlags[0] = b3;
	},5326);
	X("Increased health regeneration","vitalCrystal",8,function(p9) {
		return p9.extraUsingFlags[1];
	},function(p10,b4) {
		p10.extraUsingFlags[1] = b4;
	},5337);
	X("Increased defense","aegisFruit",4,function(p11) {
		return p11.extraUsingFlags[2];
	},function(p12,b5) {
		p12.extraUsingFlags[2] = b5;
	},5338);
	X("Increased mana regeneration","arcaneCrystal",5,function(p13) {
		return p13.extraUsingFlags[3];
	},function(p14,b6) {
		p14.extraUsingFlags[3] = b6;
	},5339);
	X("Increased luck","galaxyPearl",7,function(p15) {
		return p15.extraUsingFlags[4];
	},function(p16,b7) {
		p16.extraUsingFlags[4] = b7;
	},5340);
	X("Increased fishing power","gummyWorm",5,function(p17) {
		return p17.extraUsingFlags[5];
	},function(p18,b8) {
		p18.extraUsingFlags[5] = b8;
	},5341);
	X("Increased mining and placement speed","ambrosia",2,function(p19) {
		return p19.extraUsingFlags[6];
	},function(p20,b9) {
		p20.extraUsingFlags[6] = b9;
	},5342);
	X("Finished DD2 event (can use summons)","dd2",3,function(p21) {
		return p21.finishedDD2Event;
	},function(p22,b10) {
		p22.finishedDD2Event = b10;
	},3828);
	X("Unlocked boosted minecart","unlockedSuperMinecart",4,function(p23) {
		return (p23.superCartByte & 1) != 0;
	},function(p24,b11) {
		p24.superCartByte = p24.superCartByte & -2 | (b11?1:0);
	},5289);
	X("Enabled boosted minecart","usingSuperMinecart",5,function(p25) {
		return (p25.superCartByte & 1) != 0;
	},function(p26,b12) {
		p26.superCartByte = p26.superCartByte & -2 | (b12?1:0);
	});
};
$hxClasses["app.TabFlags"] = app_TabFlags;
app_TabFlags.__name__ = ["app","TabFlags"];
app_TabFlags.__super__ = app_TabBase;
app_TabFlags.prototype = $extend(app_TabBase.prototype,{
	sync: function(p) {
		var _g = 0;
		var _g1 = this.syncArr;
		while(_g < _g1.length) {
			var fn = _g1[_g];
			++_g;
			fn(p);
		}
	}
	,updateLang: function() {
		app_TabBase.prototype.updateLang.call(this);
		var _g = 0;
		var _g1 = this.syncLangArr;
		while(_g < _g1.length) {
			var fn = _g1[_g];
			++_g;
			fn();
		}
	}
	,__class__: app_TabFlags
});
var app_TabLang = function() {
	this.buttons = [];
	var _g = this;
	app_TabBase.call(this);
	app_TabLang.inst = this;
	this.cbForceNonBMF = this.addCheckbox(0,0,"Force system font",4,function(z) {
		Lang.noBMFont = z;
		if(z) {
			if(dom_Label.useBMFont) {
				dom_Label.useBMFont = false;
				Main._main.updateBMF();
				Main._main.updateLang();
			}
		} else {
			var bmf = Lang.detectBMFont();
			if(bmf && !dom_Label.useBMFont) {
				dom_Label.useBMFont = true;
				Main._main.updateBMF();
				Main._main.updateLang();
			}
		}
		window.localStorage.setItem("terrasavr.useSystemFont","" + (z == null?"null":"" + z));
	});
	dom_NodeTools.setTooltip(this.cbForceNonBMF,"Use a system font even if the bitmap\nfont is available for the language");
	this.cbForceNonBMF.set_forceBMFont(false);
	this.cbUseCustomFont = this.addCheckbox((function($this) {
		var $r;
		var _this = $this.cbForceNonBMF;
		$r = _this.x + _this.width;
		return $r;
	}(this)) + 12,0,"Use a custom font",5,function(z1) {
		Lang.useCustomFont = z1;
		if(z1) {
			_g.fdCustomFont.x = (function($this) {
				var $r;
				var _this1 = _g.cbUseCustomFont;
				$r = _this1.x + _this1.width;
				return $r;
			}(this)) + 12;
			dom_Label.canvasFont = dom_Label.canvasFontPre + _g.fdCustomFont.get_value();
		} else dom_Label.canvasFont = "17px sans-serif";
		window.localStorage.setItem("terrasavr.useCustomFont","" + (z1 == null?"null":"" + z1));
	});
	this.cbUseCustomFont.set_forceBMFont(false);
	this.fdCustomFont = this.addStr((function($this) {
		var $r;
		var _this2 = $this.cbUseCustomFont;
		$r = _this2.x + _this2.width;
		return $r;
	}(this)) + 12,0,"Custom font: \"$\"",8,function(s) {
		if(StringTools.trim(s) == "") s = dom_Label.canvasFontSerif;
		dom_Label.canvasFont = dom_Label.canvasFontPre + s;
		Main._main.updateBMF();
		Main._main.updateLang();
		window.localStorage.setItem("terrasavr.customFont",s);
	});
	this.fdCustomFont.set_value("sans-serif");
	this.fdCustomFont.set_forceBMFont(false);
	var items = [new app_LangItem("Debug","debug",false),new app_LangItem("English",null,true),new app_LangItem("Español","es-ES",true),new app_LangItem("Português (BR)","pt-BR",true,"Luckas24"),new app_LangItem("Polski","pl-PL",false,"Russell"),new app_LangItem("Русский","ru-RU",true),new app_LangItem("中文","zh-CN",false,"∞INF"),new app_LangItem("한국어","ko-KR",false,"Alanimdeo"),new app_LangItem("Tiếng Việt","vn-VN",false,"Paul Pham")];
	var ny;
	var _this3 = this.cbForceNonBMF;
	ny = _this3.y + _this3.height;
	var _g1 = 0;
	while(_g1 < items.length) {
		var item = items[_g1];
		++_g1;
		var bt = new app_LangButton(item);
		bt.y = ny;
		this.add(bt);
		this.buttons.push(bt);
		if(item.extra != null) {
			var lb = this.addLabel(bt.x + bt.width,ny," (by " + item.extra + ")");
			lb.set_forceBMFont(bt.forceBMFont);
		}
		ny = bt.y + bt.height;
	}
	this.btDebug = this.buttons[0];
	this.btSave = this.addButton((function($this) {
		var $r;
		var _this4 = $this.btDebug;
		$r = _this4.x + _this4.width;
		return $r;
	}(this)) + 8,this.btDebug.y,"Save sample",1,function(_) {
		var b = new openfl_utils_ByteArray();
		b.writeByte(239);
		b.writeByte(187);
		b.writeByte(191);
		b.writeUTFBytes(JSON.stringify(Lang.getDefLang(),null,"\t"));
		b.set_length(b.position);
		app_TopPane.inst.frSave.save(b,"Terrasavr.en-US.json");
	});
	this.btSave.set_forceBMFont(false);
	dom_NodeTools.setTooltip(this.btSave,"Saves an example translation JSON file for editing");
	var frLoad = new openfl_net_FileReference();
	var fxLoad = [new openfl_net_FileFilter("Terrasavr translations (*.json)","*.json"),new openfl_net_FileFilter("All files (*.*)","*.*")];
	frLoad.addEventListener("select",function(_1) {
		frLoad.load();
	});
	frLoad.addEventListener("complete",function(e) {
		var data = e.get_target().data;
		if(data.data.getUint8(data.position++) == 239) {
			if(data.data.getUint8(data.position++) == 187) {
				if(data.data.getUint8(data.position++) == 191) {
				} else data.position = 0;
			} else data.position = 0;
		} else data.position = 0;
		var text = data.readUTFBytes(data.length - data.position);
		try {
			var json = JSON.parse(text);
			Lang.setLang(json);
		} catch( x ) {
			if (x instanceof js__$Boot_HaxeError) x = x.val;
			app_TopPane.inst.print("Error loading the file: " + Std.string(x),3);
		}
	});
	this.btLoad = this.addButton((function($this) {
		var $r;
		var _this5 = $this.btSave;
		$r = _this5.x + _this5.width;
		return $r;
	}(this)) + 8,this.btDebug.y,"Load/preview",1,function(_2) {
		frLoad.browse(fxLoad);
	});
	dom_NodeTools.setTooltip(this.btLoad,"Loads a translation from a JSON file for preview");
	this.btLoad.set_forceBMFont(false);
	this.btHelp = new dom_Link("Help","//yal.cc/r/terrasavr/doc/?q=loc");
	this.btHelp.x = (function($this) {
		var $r;
		var _this6 = $this.btLoad;
		$r = _this6.x + _this6.width;
		return $r;
	}(this)) + 8;
	this.btHelp.y = this.btLoad.y;
	this.add(this.btHelp);
	this.btHelp.set_forceBMFont(false);
};
$hxClasses["app.TabLang"] = app_TabLang;
app_TabLang.__name__ = ["app","TabLang"];
app_TabLang.__super__ = app_TabBase;
app_TabLang.prototype = $extend(app_TabBase.prototype,{
	start: function() {
		this.btHelp.set_enabled(true);
		this.cbForceNonBMF.set_value(Lang.noBMFont);
		this.cbUseCustomFont.set_value(Lang.useCustomFont);
	}
	,end: function() {
		this.btHelp.set_enabled(false);
	}
	,update: function(dt) {
		this.cbUseCustomFont.active = !dom_Label.useBMFont;
		this.fdCustomFont.active = this.cbUseCustomFont.active && this.cbUseCustomFont.value;
		app_TabBase.prototype.update.call(this,dt);
	}
	,updateLang: function() {
		var canvasFont = dom_Label.canvasFont;
		dom_Label.canvasFont = "17px sans-serif";
		var cat = "tab.lang";
		this.cbForceNonBMF.locFormatTooltip(cat,"forceSystemFont");
		this.cbUseCustomFont.locFormatTooltip(cat,"useCustomFont");
		this.fdCustomFont.set_format(Lang.loc(cat,"customFontName","Custom font: ") + "\"$\"");
		this.fdCustomFont.tooltipText = Lang.ttip(cat,"customFontName","System names - such as\nArial, Comic Sans MS, Open Sans, etc.");
		this.cbForceNonBMF.chainX(this.cbUseCustomFont,12).chainX(this.fdCustomFont,12);
		app_TabBase.prototype.updateLang.call(this);
		dom_Label.canvasFont = canvasFont;
		var lc = Lang.langCode;
		var _g = 0;
		var _g1 = this.buttons;
		while(_g < _g1.length) {
			var bt = _g1[_g];
			++_g;
			bt.set_style(bt.lang.code == lc?5:3);
		}
	}
	,updateBMF: function() {
		var canvasFont = dom_Label.canvasFont;
		dom_Label.canvasFont = "17px sans-serif";
		app_TabBase.prototype.updateBMF.call(this);
		dom_Label.canvasFont = canvasFont;
	}
	,render: function(u,v) {
		var canvasFont = dom_Label.canvasFont;
		dom_Label.canvasFont = "17px sans-serif";
		app_TabBase.prototype.render.call(this,u,v);
		dom_Label.canvasFont = canvasFont;
	}
	,__class__: app_TabLang
});
var app_LangItem = function(name,code,bmf,extra) {
	this.name = name;
	this.code = code;
	this.useBMFont = bmf;
	this.extra = extra;
};
$hxClasses["app.LangItem"] = app_LangItem;
app_LangItem.__name__ = ["app","LangItem"];
app_LangItem.prototype = {
	__class__: app_LangItem
};
var dom_Label = function() {
	this.forceBMFont = null;
	this.height = 0;
	this.width = 0;
	this.ofs_y = 0;
	this.ofs_x = 0;
	this.enText = null;
	this.pad = 2;
	this.style = 1;
	this.valign = 0;
	this.halign = 0;
	this.textLines = [];
	this.text = "";
	dom_Node.call(this);
	this.font = this.m.font;
	this.cache = new openfl_display_BitmapData(32,32,true,0);
	this.info = new utils_BMInfo();
};
$hxClasses["dom.Label"] = dom_Label;
dom_Label.__name__ = ["dom","Label"];
dom_Label.__super__ = dom_Node;
dom_Label.prototype = $extend(dom_Node.prototype,{
	locText: function(cat,key) {
		this.set_text(Lang.loc(cat,key,this.enText));
	}
	,locTextTooltip: function(cat,key) {
		this.set_text(Lang.loc(cat,key,this.enText));
		this.tooltipText = Lang.ttip(cat,key,this.tooltipEnText);
		return this;
	}
	,set_forceBMFont: function(z) {
		this.forceBMFont = z;
		this.redraw();
		return z;
	}
	,chainX: function(el,pad) {
		if(pad == null) pad = 0;
		el.x = this.x + this.width + pad;
		return el;
	}
	,checkBMFont: function() {
		var z = this.forceBMFont;
		if(z != null) return z; else return dom_Label.useBMFont;
	}
	,redraw: function() {
		if(this.checkBMFont()) {
			this.font.measure(this.text,this.x,this.y,this.halign,this.valign,this.info);
			this.ofs_x = this.info.x - this.info.left;
			this.ofs_y = this.info.y - this.info.top;
			this.width = this.info.width;
			this.height = this.info.height;
			var pw = this.width + this.pad * 2;
			var ph = this.height * this.pad * 2;
			if(pw > this.cache.component.width || ph > this.cache.component.height) {
				var w = Std["int"](Math.max(this.cache.component.width,Math.ceil(pw / 32) * 32));
				var h = Std["int"](Math.max(this.cache.component.height,Math.ceil(ph / 32) * 32));
				this.cache.dispose();
				this.cache = new openfl_display_BitmapData(w,h,true,0);
			} else this.m.clear(this.cache);
			var i = -1;
			while(++i < 2) this.font.draw(this.cache,this.text,this.ofs_x + this.pad,this.ofs_y + this.pad,this.halign,this.valign,i * this.style);
		} else {
			this.ofs_x = 0;
			this.ofs_y = 0;
			var ctx = this.m.context;
			ctx.font = dom_Label.canvasFont;
			ctx.textBaseline = "top";
			var maxw = 0;
			var lines = this.text.split("\n");
			this.textLines = lines;
			var _g = 0;
			while(_g < lines.length) {
				var line = lines[_g];
				++_g;
				var mst = ctx.measureText(line);
				var mstw = mst.width | 0;
				if(mstw > maxw) maxw = mstw;
			}
			this.width = maxw;
			this.height = lines.length * dom_Label.canvasLineHeight;
			this.ofs_x = this.halign / 2 * this.width | 0;
		}
	}
	,updateBMF: function() {
		this.redraw();
	}
	,hitTest: function(u,v) {
		var lx = u - (this.x - this.ofs_x);
		var ly = v - (this.y - this.ofs_y);
		if(lx >= 0 && ly >= 0 && lx < this.width && ly < this.height) return this; else return null;
	}
	,render: function(u,v) {
		if(this.checkBMFont()) this.m.blit(this.cache,u + this.x - this.ofs_x - this.pad,v + this.y - this.ofs_y - this.pad); else this.m.blitText(this.textLines,u + this.x,v + this.y,this.halign,this.valign,this.style,1);
	}
	,set_text: function(v) {
		if(this.text != v) {
			this.text = v;
			this.redraw();
		}
		return v;
	}
	,set_halign: function(v) {
		if(this.halign != v) {
			this.halign = v;
			if(this.text != "") this.redraw();
		}
		return v;
	}
	,set_valign: function(v) {
		if(this.valign != v) {
			this.valign = v;
			if(this.text != "") this.redraw();
		}
		return v;
	}
	,set_style: function(v) {
		if(this.style != v) {
			this.style = v;
			if(this.text != "") this.redraw();
		}
		return v;
	}
	,__class__: dom_Label
});
var dom_Button = function() {
	this.onClick = null;
	dom_Label.call(this);
};
$hxClasses["dom.Button"] = dom_Button;
dom_Button.__name__ = ["dom","Button"];
dom_Button.__super__ = dom_Label;
dom_Button.prototype = $extend(dom_Label.prototype,{
	hover: function(u,v) {
		this.onHover = this.hitTest(u,v) == this;
	}
	,render: function(u,v) {
		var a;
		if(this.onHover) a = 0.7; else a = 1.0;
		if(this.checkBMFont()) this.m.draw(this.cache,u + this.x - this.ofs_x - this.pad,v + this.y - this.ofs_y - this.pad,a); else this.m.blitText(this.textLines,u + this.x,v + this.y,this.halign,this.valign,this.style,a);
	}
	,click: function() {
		if(this.onClick != null) this.onClick(this);
	}
	,__class__: dom_Button
});
var app_LangButton = function(l) {
	var _g = this;
	dom_Button.call(this);
	this.set_forceBMFont(l.useBMFont);
	this.lang = l;
	this.set_text(l.name);
	this.set_style(3);
	this.onClick = function(_) {
		Lang.setLang(_g.lang.code,_g.lang.useBMFont);
		window.localStorage.setItem("terrasavr.lang",_g.lang.code);
	};
};
$hxClasses["app.LangButton"] = app_LangButton;
app_LangButton.__name__ = ["app","LangButton"];
app_LangButton.__super__ = dom_Button;
app_LangButton.prototype = $extend(dom_Button.prototype,{
	__class__: app_LangButton
});
var app_TabLibrary = function() {
	this.searchResults = [];
	app_TabBase.call(this);
	var i;
	var ifrom = function(i1,l) {
		var r = [];
		while(--l >= 0) r.push(i1++);
		return r;
	};
	var icat = function(a,b) {
		a.push(b);
		return a;
	};
	var imix = function(a1,b1) {
		return a1.concat(b1);
	};
	var dir = function(o,z,v) {
		return new app_ShDir(z,o,v);
	};
	var val = function(o1,z1,v1) {
		return new app_ShItems(z1,o1,v1);
	};
	this.rootDir = this.lib = app_Libraries.deploy();
	this.stack = [this.lib];
	this.dirSearch = new app_ShDir(0,"Search",[]);
	this.shcSearch = [];
	this.lbSearch = this.addLabel(0,0,"Search: ");
	this.fdSearch = new dom_StringField();
	this.fdSearch.x = this.lbSearch.width;
	this.fdSearch.set_style(3);
	this.fdSearch.set_format("\"$\"");
	this.add(this.fdSearch);
	this.fdSearch.onChange = this.fdSearch.onFinish = $bind(this,this.search);
	this.lines = [];
	this.icons = [];
	i = -1;
	while(++i < 20) {
		this.lines.push(this.addButton(0,(i + 1) * this.m.font.lineHeight,".",1,this.getNav(i)));
		this.icons.push(0);
	}
	this.nav(-1);
};
$hxClasses["app.TabLibrary"] = app_TabLibrary;
app_TabLibrary.__name__ = ["app","TabLibrary"];
app_TabLibrary.get_inst = function() {
	if(app_TabLibrary._inst == null) app_TabLibrary._inst = new app_TabLibrary();
	return app_TabLibrary._inst;
};
app_TabLibrary.__super__ = app_TabBase;
app_TabLibrary.prototype = $extend(app_TabBase.prototype,{
	updateLang: function() {
		var cat = "tab.library";
		this.lbSearch.locTextTooltip(cat,"search");
		this.lbSearch.chainX(this.fdSearch);
		this.rootDir.updateLang();
		this.navSync();
		app_TabBase.prototype.updateLang.call(this);
	}
	,search: function(_) {
		var _g = this;
		var addPage = function(index,title) {
			var r;
			if(_g.dirSearch.nodes[index] == null) {
				if(_g.shcSearch.length > 0) r = _g.shcSearch.pop(); else r = new app_ShItems(0,"",[]);
				_g.dirSearch.nodes.push(r);
			} else r = _g.dirSearch.nodes[index];
			r.name = title;
			return r;
		};
		var n;
		n = this.searchResults.length;
		while(n > 0) {
			this.searchResults.pop();
			n--;
		}
		var rn = 0;
		if(_.length > 0) {
			var i;
			var j;
			var s;
			var m = null;
			var z;
			var w;
			var k;
			var ti;
			var tw = _.split(",");
			ti = 0;
			var items = terra_Item.list;
			var id;
			var k1;
			var _g1 = 0;
			var _g11 = _.split(",");
			while(_g1 < _g11.length) {
				var term = _g11[_g1];
				++_g1;
				term = StringTools.trim(term).toLowerCase();
				if(term.length < 2) continue;
				var pfc = HxOverrides.cca(term,0);
				if(pfc == 35) {
					term = term.substring(1);
					var dash = term.indexOf("-");
					var idn;
					if(dash != -1) {
						idn = Std.parseInt(term.substring(0,dash));
						if(idn == null) continue;
						id = idn;
						idn = Std.parseInt(term.substring(dash + 1));
						if(idn != null) {
							k1 = id;
							while(k1 <= idn) {
								this.searchResults.push(k1);
								k1++;
							}
						}
					} else {
						idn = Std.parseInt(term);
						if(idn != null) this.searchResults.push(idn);
					}
				} else {
					if(pfc == 46) term = term.substring(1);
					var words = term.split(" ");
					k1 = words.length;
					while(--k1 >= 0) if(words[k1].length == 0) words.splice(k1,1);
					var item;
					var item_lq;
					if(pfc == 46) {
						id = 0;
						while(id < items.length) {
							item = items[id];
							item_lq = item.textLq;
							k1 = words.length;
							while(--k1 >= 0) if(item_lq.indexOf(words[k1]) < 0) break;
							if(k1 < 0) _g.searchResults.push(item.id);
							id++;
						}
					} else {
						id = 0;
						while(id < items.length) {
							item = items[id];
							item_lq = item.nameLq;
							k1 = words.length;
							while(--k1 >= 0) if(item_lq.indexOf(words[k1]) < 0) break;
							if(k1 < 0) _g.searchResults.push(item.id);
							id++;
						}
					}
				}
			}
			n = this.searchResults.length;
			k1 = 0;
			while(k1 < this.searchResults.length) {
				if(k1 % 40 == 0) {
					id = k1 / 40 | 0;
					if(k1 < n - 40) m = addPage(id,k1 + 1 + "-" + (k1 + 40)); else m = addPage(id,k1 + 1 + "-" + n);
				}
				m.nodes[k1 % 40] = this.searchResults[k1];
				k1++;
			}
			rn = n;
			if(n == 0) {
				if(this.dirSearch.nodes[0] == null) {
					if(this.shcSearch.length > 0) m = this.shcSearch.pop(); else m = new app_ShItems(0,"",[]);
					this.dirSearch.nodes.push(m);
				} else m = this.dirSearch.nodes[0];
				m.name = "No results";
				m.nodes[0] = 0;
				n++;
			}
			while(n % 40 != 0) m.nodes[n++ % 40] = 0;
			i = this.dirSearch.nodes.length - (n / 40 | 0);
			while(--i >= 0) this.shcSearch.push(this.dirSearch.nodes.pop());
			if(this.lib != this.dirSearch) {
				this.stack.push(this.lib);
				this.lib = this.dirSearch;
			}
			this.dirSearch.name = "Search (" + rn + ")";
			this.nav(1,this);
		} else {
			this.dirSearch.name = "Search";
			if(this.lib == this.dirSearch) {
				this.lib = this.stack.pop();
				this.nav(-1,this);
			}
		}
		var tp = app_TopPane.inst;
		if(tp.tabNow == tp.tabSearch) {
			tp.lbSearch[0].set_text("" + rn + " search results for \"");
			tp.lbSearch[1].set_text(_);
			var _this = tp.lbSearch[0];
			tp.lbSearch[1].x = _this.x + _this.width;
			var _this1 = tp.lbSearch[1];
			tp.lbSearch[2].x = _this1.x + _this1.width;
		}
		return rn;
	}
	,drawItem: function(x,y,v) {
		if(v != 0) {
			if(v > 0 && v < Main.ITEMS) this.m.context.drawImage(this.m.imgItems,(v & 31) * 40,(v >> 5) * 40,40,40,x,y,20,20); else if(v < 0 && v > Main.NITEMS) v = -v; else this.m.xrect(x + 3,y + 3,14,14,4933764,1);
		}
	}
	,getNav: function(v) {
		var _g = this;
		return function(_) {
			_g.nav(v,null,_g.m.shiftDown);
		};
	}
	,nav: function(v0,r,shift) {
		var i;
		var j;
		var l;
		var o;
		var v = v0;
		if(this.stack.length > 1) v -= 1;
		if(v < 0) {
			if(this.stack.length > 1) this.lib = this.stack.pop();
		} else if(v < this.lib.nodes.length) {
			o = this.lib.nodes[v];
			var _g = o.type;
			switch(_g) {
			case 1:
				this.stack.push(this.lib);
				this.lib = o;
				break;
			case 2:
				this.selected = o;
				app_TabShelf.get_inst().load(this.selected.nodes);
				i = -1;
				l = this.lines.length;
				while(++i < l) this.lines[i].set_style(v0 == i?4:1);
				if(shift) {
					var cur = app_TopPane.inst.tabNow;
					if(js_Boot.__instanceof(cur,app_TabItems)) {
						var inv = cur;
						var shl = app_TabShelf.get_inst();
						var n = inv.items.length;
						if(n > shl.items.length) n = shl.items.length;
						var _g1 = 0;
						while(_g1 < n) {
							var i1 = _g1++;
							inv.items[i1].set_id(shl.items[i1].slot.item);
							inv.items[i1].set_count(shl.items[i1].get_count());
							inv.items[i1].set_prefix(shl.items[i1].get_prefix());
						}
					}
				}
				if(r == null) return;
				break;
			}
		} else if(r == null) return;
		this.navSync();
	}
	,navSync: function() {
		var j = 0;
		if(this.stack.length > 1) {
			this.icons[j] = 0;
			this.lines[j++].set_text("../" + this.lib.name);
		}
		var i = -1;
		var l = this.lib.nodes.length;
		while(++i < l) {
			this.icons[j] = this.lib.nodes[i].icon;
			this.lines[j].set_style(this.lib.nodes[i] == this.selected?4:1);
			this.lines[j++].set_text("  " + this.lib.nodes[i].name);
			if(j >= this.lines.length) break;
		}
		while(j < this.lines.length) {
			this.icons[j] = 0;
			this.lines[j].set_style(1);
			this.lines[j++].set_text("");
		}
	}
	,render: function(u,v) {
		var j;
		var l = this.lines.length;
		j = -1;
		while(++j < l) this.drawItem(u + this.lines[j].x - 8,v + this.lines[j].y,this.icons[j]);
		app_TabBase.prototype.render.call(this,u,v);
	}
	,__class__: app_TabLibrary
});
var app_Shelf = function() {
};
$hxClasses["app.Shelf"] = app_Shelf;
app_Shelf.__name__ = ["app","Shelf"];
app_Shelf.prototype = {
	updateLang: function() {
		if(this.enName == "" || this.enName == "(< 0)") return;
		if(app_Shelf.rxNum.match(this.enName)) return;
		if(app_Shelf.rxPage.match(this.enName)) {
			var s = "Page $1";
			s = Lang.loc("lib.item",s,s);
			this.name = StringTools.replace(s,"$1",app_Shelf.rxPage.matched(1));
		} else if(app_Shelf.rxPages.match(this.enName)) {
			var s1 = "Pages $1+";
			s1 = Lang.loc("lib.item",s1,s1);
			this.name = StringTools.replace(s1,"$1",app_Shelf.rxPages.matched(1));
		} else if(app_Shelf.rxAuto.match(this.enName)) {
			var s2 = app_Shelf.rxAuto.matched(1) + "($1)";
			var s3 = Lang.loc("lib.item",s2,s2);
			s3 = StringTools.replace(s3,"$1",app_Shelf.rxAuto.matched(2));
			this.name = s3;
		} else this.name = Lang.loc("lib.item",this.enName,this.enName);
	}
	,__class__: app_Shelf
};
var app_ShDir = function(z,n,v) {
	app_Shelf.call(this);
	this.icon = z;
	this.type = 1;
	this.name = this.enName = n;
	this.nodes = v;
};
$hxClasses["app.ShDir"] = app_ShDir;
app_ShDir.__name__ = ["app","ShDir"];
app_ShDir.__super__ = app_Shelf;
app_ShDir.prototype = $extend(app_Shelf.prototype,{
	updateLang: function() {
		app_Shelf.prototype.updateLang.call(this);
		var _g = 0;
		var _g1 = this.nodes;
		while(_g < _g1.length) {
			var node = _g1[_g];
			++_g;
			node.updateLang();
		}
	}
	,__class__: app_ShDir
});
var app_ShItems = function(z,n,v) {
	app_Shelf.call(this);
	this.icon = z;
	this.type = 2;
	this.name = this.enName = n;
	this.nodes = v;
};
$hxClasses["app.ShItems"] = app_ShItems;
app_ShItems.__name__ = ["app","ShItems"];
app_ShItems.__super__ = app_Shelf;
app_ShItems.prototype = $extend(app_Shelf.prototype,{
	__class__: app_ShItems
});
var app_TabMain = function() {
	this.btHardcoreTimeout = 0;
	var _g = this;
	app_TabBase.call(this);
	var i;
	var n;
	var p;
	var z;
	var y;
	this.parts = [];
	this.parts[0] = new app_BitPart(40,56,[new openfl_geom_Point(80,0)]);
	this.parts[1] = new app_BitPart(40,56,[new openfl_geom_Point(0,0)]);
	this.parts[2] = new app_BitPart(40,56,[new openfl_geom_Point(40,0)]);
	this.parts[3] = new app_BitPart(40,56,[new openfl_geom_Point(480,0),new openfl_geom_Point(120,0)]);
	this.parts[4] = new app_BitPart(40,56,[new openfl_geom_Point(320,0),new openfl_geom_Point(160,0)]);
	this.parts[5] = new app_BitPart(40,56,[new openfl_geom_Point(360,0),new openfl_geom_Point(200,0)]);
	this.parts[6] = new app_BitPart(40,56,[new openfl_geom_Point(400,0),new openfl_geom_Point(240,0)]);
	this.parts[7] = new app_BitPart(40,56,[new openfl_geom_Point(440,0),new openfl_geom_Point(280,0)]);
	var points = [];
	i = -1;
	while(++i < 134) points.push(new openfl_geom_Point((i & 15) * 40,56 + (i >> 4) * 40));
	this.parts[8] = new app_BitPart(40,40,points);
	this.tabVersion = new app_TabVersion(this);
	this.tabFlags = new app_TabFlags(this);
	this.lbVersion = [];
	this.lbVersion[0] = this.addLabel(0,0,"Format: ",7);
	this.lbVersion[1] = this.addLabel((function($this) {
		var $r;
		var _this = $this.lbVersion[0];
		$r = _this.x + _this.width;
		return $r;
	}(this)),0,"1.0.0",1);
	this.lbVersion[2] = this.addLabel((function($this) {
		var $r;
		var _this1 = $this.lbVersion[1];
		$r = _this1.x + _this1.width;
		return $r;
	}(this)),0," (",1);
	this.btChangeVer = this.addButton((function($this) {
		var $r;
		var _this2 = $this.lbVersion[2];
		$r = _this2.x + _this2.width;
		return $r;
	}(this)),0,"Change",4,function(_) {
		app_TopPane.inst.setTab(_g.tabVersion);
	});
	this.lbVersion[3] = this.addLabel((function($this) {
		var $r;
		var _this3 = $this.btChangeVer;
		$r = _this3.x + _this3.width;
		return $r;
	}(this)),0,")",1);
	var rx = 240;
	var _this4 = this.lbVersion[2];
	y = _this4.y + _this4.height;
	this.lbDiff = this.addLabel(0,y,"Mode: ",3);
	p = this.lbDiff.x + this.lbDiff.width;
	this.btDiff = [];
	this.btDiff[3] = this.addButton(p,y,"Journey",1,function(_1) {
		if(_g.m.player.difficulty != 3) {
			_g.m.player.difficulty = 3;
			var k = 0;
			while(k < _g.btDiff.length) {
				_g.btDiff[k].set_style(k == 3?4:1);
				k++;
			}
			_g.btHardcore.set_text("");
		}
	});
	p = (function($this) {
		var $r;
		var _this5 = $this.btDiff[3];
		$r = _this5.x + _this5.width;
		return $r;
	}(this)) + 8;
	this.btDiff[0] = this.addButton(p,y,"Softcore",1,function(_2) {
		if(_g.m.player.difficulty != 0) {
			_g.m.player.difficulty = 0;
			var k1 = 0;
			while(k1 < _g.btDiff.length) {
				_g.btDiff[k1].set_style(k1 == 0?4:1);
				k1++;
			}
			_g.btHardcore.set_text("");
		}
	});
	p = (function($this) {
		var $r;
		var _this6 = $this.btDiff[0];
		$r = _this6.x + _this6.width;
		return $r;
	}(this)) + 8;
	this.btDiff[1] = this.addButton(p,y,"Mediumcore",1,function(_3) {
		if(_g.m.player.difficulty != 1) {
			_g.m.player.difficulty = 1;
			var k2 = 0;
			while(k2 < _g.btDiff.length) {
				_g.btDiff[k2].set_style(k2 == 1?4:1);
				k2++;
			}
			_g.btHardcore.set_text("");
		}
	});
	p = (function($this) {
		var $r;
		var _this7 = $this.btDiff[1];
		$r = _this7.x + _this7.width;
		return $r;
	}(this)) + 8;
	this.btDiff[2] = this.addButton(p,y,"Hardcore",1,function(_4) {
		if(_g.m.player.difficulty == 2) return;
		_g.btHardcore.x = (function($this) {
			var $r;
			var _this8 = _g.btDiff[2];
			$r = _this8.x + _this8.width;
			return $r;
		}(this)) + 8;
		_g.btHardcore.set_text(dom_ButtonConfirm.confirmText);
		_g.btHardcoreTimeout = _g.m.time + 7;
	});
	p = (function($this) {
		var $r;
		var _this9 = $this.btDiff[2];
		$r = _this9.x + _this9.width;
		return $r;
	}(this)) + 8;
	this.btHardcore = this.addButton(p,y,"",2,function(_5) {
		if(_g.m.player.difficulty != 2) {
			_g.m.player.difficulty = 2;
			var k3 = 0;
			while(k3 < _g.btDiff.length) {
				_g.btDiff[k3].set_style(k3 == 2?4:1);
				k3++;
			}
			_g.btHardcore.set_text("");
		}
	});
	this.lbHp1 = this.addLabel(0,(function($this) {
		var $r;
		var _this10 = $this.lbDiff;
		$r = _this10.y + _this10.height;
		return $r;
	}(this)),"Health: ",4);
	this.lbHp2 = this.addLabel(0,this.lbHp1.y,"/",1);
	(this.fdHpMax = this.addInt(0,this.lbHp1.y)).onFinish = function(_6) {
		_g.m.player.healthMax = _6;
	};
	(this.fdHpNow = this.addInt(this.lbHp1.x + this.lbHp1.width,this.lbHp1.y)).onChange = function(_7) {
		_g.lbHp2.x = _g.fdHpNow.x + _g.fdHpNow.width;
		_g.fdHpMax.x = _g.lbHp2.x + _g.lbHp2.width;
	};
	this.fdHpNow.onFinish = function(v) {
		_g.m.player.healthNow = v;
	};
	this.lbMp1 = this.addLabel(rx,this.lbHp1.y,"Mana: ",5);
	this.lbMp2 = this.addLabel(0,this.lbMp1.y,"/");
	(this.fdMpMax = this.addInt(0,this.lbMp1.y)).onFinish = function(_8) {
		_g.m.player.manaMax = _8;
	};
	(this.fdMpNow = this.addInt(this.lbMp1.x + this.lbMp1.width,this.lbMp1.y)).onChange = function(_9) {
		_g.lbMp2.x = _g.fdMpNow.x + _g.fdMpNow.width;
		_g.fdMpMax.x = _g.lbMp2.x + _g.lbMp2.width;
	};
	this.fdMpNow.onFinish = function(v1) {
		_g.m.player.manaNow = v1;
	};
	this.lbHair = this.addLabel(0,(function($this) {
		var $r;
		var _this11 = $this.lbHp1;
		$r = _this11.y + _this11.height;
		return $r;
	}(this)) + 8,"Hair style: ",1);
	this.btHairPrev = this.addButton((function($this) {
		var $r;
		var _this12 = $this.lbHair;
		$r = _this12.x + _this12.width;
		return $r;
	}(this)),this.lbHair.y,"<",4,function(_10) {
		var i1 = (_g.m.player.hairStyle - 1) % 134;
		if(i1 < 0) i1 += 134;
		_g.parts[8].set_style(_g.m.player.hairStyle = _g.fdHair.set_value(i1));
	});
	this.fdHair = this.addInt((function($this) {
		var $r;
		var _this13 = $this.btHairPrev;
		$r = _this13.x + _this13.width;
		return $r;
	}(this)) + 20,this.lbHair.y);
	this.fdHair.set_halign(1);
	this.fdHair.onFinish = function(v2) {
		_g.parts[8].set_style(_g.m.player.hairStyle = v2);
	};
	this.fdHair.onChange = function(s) {
		_g.parts[8].set_style(Std.parseInt(s));
	};
	this.btHairNext = this.addButton((function($this) {
		var $r;
		var _this14 = $this.btHairPrev;
		$r = _this14.x + _this14.width;
		return $r;
	}(this)) + 40,this.lbHair.y,">",4,function(_11) {
		var i2 = (_g.m.player.hairStyle + 1) % 134;
		if(i2 < 0) i2 += 134;
		_g.parts[8].set_style(_g.m.player.hairStyle = _g.fdHair.set_value(i2));
	});
	this.lbStyle = this.addLabel(0,(function($this) {
		var $r;
		var _this15 = $this.lbHair;
		$r = _this15.y + _this15.height;
		return $r;
	}(this)),"Gender+Clothes: ",3);
	this.fdStyle = this.addInt((function($this) {
		var $r;
		var _this16 = $this.lbStyle;
		$r = _this16.x + _this16.width;
		return $r;
	}(this)),this.lbStyle.y,"$",1,function(v3) {
		_g.m.player.gender = v3;
	});
	this.lbStyleNote = this.addLabel(0,(function($this) {
		var $r;
		var _this17 = $this.lbStyle;
		$r = _this17.y + _this17.height;
		return $r;
	}(this)),"(preview is broken atm)");
	var _this18 = this.lbStyleNote;
	p = _this18.y + _this18.height;
	this.lbColor = [];
	this.fdColor = [];
	z = app_TabMain.ftColor;
	i = -1;
	while(++i < 7) {
		this.lbColor[i] = this.addLabel(0,p,z[i] + ": ");
		this.fdColor[i] = this.addColor(this.lbColor[i].width,p);
		p += this.lbColor[i].height;
	}
	this.fdColor[0].onFinish = function(v4) {
		_g.parts[8].set_color(_g.m.player.hairColor = v4);
	};
	this.fdColor[1].onFinish = function(v5) {
		_g.parts[3].set_color(_g.parts[1].set_color(_g.m.player.skinColor = v5));
	};
	this.fdColor[2].onFinish = function(v6) {
		_g.parts[2].set_color(_g.m.player.eyeColor = v6);
	};
	this.fdColor[3].onFinish = function(v7) {
		_g.parts[4].set_color(_g.m.player.shirtColor = v7);
	};
	this.fdColor[4].onFinish = function(v8) {
		_g.parts[5].set_color(_g.m.player.underColor = v8);
	};
	this.fdColor[5].onFinish = function(v9) {
		_g.parts[6].set_color(_g.m.player.pantsColor = v9);
	};
	this.fdColor[6].onFinish = function(v10) {
		_g.parts[7].set_color(_g.m.player.shoesColor = v10);
	};
	this.lbQuests = this.addLabel(rx,(function($this) {
		var $r;
		var _this19 = $this.lbHp1;
		$r = _this19.y + _this19.height;
		return $r;
	}(this)) + 8,"Fishing quests complete: ",5);
	this.fdQuests = this.addInt((function($this) {
		var $r;
		var _this20 = $this.lbQuests;
		$r = _this20.x + _this20.width;
		return $r;
	}(this)),this.lbQuests.y,"$",1,function(v11) {
		_g.m.player.fishingQuestsCompleted = v11;
	});
	this.lbGolfScore = this.addLabel(rx,(function($this) {
		var $r;
		var _this21 = $this.lbQuests;
		$r = _this21.y + _this21.height;
		return $r;
	}(this)),"Golf score: ",8);
	this.fdGolfScore = this.addInt((function($this) {
		var $r;
		var _this22 = $this.lbGolfScore;
		$r = _this22.x + _this22.width;
		return $r;
	}(this)),this.lbGolfScore.y,"$",1,function(v12) {
		_g.m.player.golferScore = v12;
	});
	this.btFlags = this.addButton(rx,(function($this) {
		var $r;
		var _this23 = $this.lbGolfScore;
		$r = _this23.y + _this23.height;
		return $r;
	}(this)),"Edit permanent buffs",4,function(_12) {
		app_TopPane.inst.setTab(_g.tabFlags);
	});
	this.lbBarQuests = this.addLabel(rx,(function($this) {
		var $r;
		var _this24 = $this.btFlags;
		$r = _this24.y + _this24.height;
		return $r;
	}(this)),"Bartender quests: ",3);
	this.fdBarQuests = this.addInt((function($this) {
		var $r;
		var _this25 = $this.lbBarQuests;
		$r = _this25.x + _this25.width;
		return $r;
	}(this)),this.lbBarQuests.y,"$",1,function(v13) {
		_g.m.player.bartenderQuests = v13;
	});
	this.remove(this.lbBarQuests);
	this.remove(this.fdBarQuests);
	this.lbPlayTimeSeconds = this.addLabel(rx,(function($this) {
		var $r;
		var _this26 = $this.btFlags;
		$r = _this26.y + _this26.height;
		return $r;
	}(this)),"Playtime Seconds: ",2);
	this.fdPlayTimeSeconds = this.addInt((function($this) {
		var $r;
		var _this27 = $this.lbPlayTimeSeconds;
		$r = _this27.x + _this27.width;
		return $r;
	}(this)),this.lbPlayTimeSeconds.y,"$",1,function(v14) {
		_g.m.player.playTimeSeconds = v14;
		_g.m.player.playTimeChanged = true;
	});
	this.lbPlayTimeTicks = this.addLabel(rx,(function($this) {
		var $r;
		var _this28 = $this.lbPlayTimeSeconds;
		$r = _this28.y + _this28.height;
		return $r;
	}(this)),"Playtime Ticks: ",2);
	this.lbPlayTimeTicks.tooltipEnText = "There are 10 million 'ticks' in one second.";
	this.fdPlayTimeTicks = this.addInt((function($this) {
		var $r;
		var _this29 = $this.lbPlayTimeTicks;
		$r = _this29.x + _this29.width;
		return $r;
	}(this)),this.lbPlayTimeTicks.y,"$",1,function(v15) {
		_g.m.player.playTimeTicks = v15;
		_g.m.player.playTimeChanged = true;
	});
};
$hxClasses["app.TabMain"] = app_TabMain;
app_TabMain.__name__ = ["app","TabMain"];
app_TabMain.__super__ = app_TabBase;
app_TabMain.prototype = $extend(app_TabBase.prototype,{
	syncVersionLabels: function() {
		var _this = this.lbVersion[0];
		this.lbVersion[1].x = _this.x + _this.width;
		var _this1 = this.lbVersion[1];
		this.lbVersion[2].x = _this1.x + _this1.width;
		var _this2 = this.lbVersion[2];
		this.btChangeVer.x = _this2.x + _this2.width;
		var _this3 = this.btChangeVer;
		this.lbVersion[3].x = _this3.x + _this3.width;
	}
	,updateBMF: function() {
		app_TabBase.prototype.updateBMF.call(this);
		this.tabVersion.updateBMF();
		this.tabFlags.updateBMF();
	}
	,updateLang: function() {
		this.tabVersion.updateLang();
		this.tabFlags.updateLang();
		var cat = "tab.char";
		var pad = 8;
		this.lbVersion[0].locTextTooltip(cat,"version");
		this.btChangeVer.locTextTooltip(cat,"changeVersion");
		this.syncVersionLabels();
		this.lbDiff.locTextTooltip(cat,"mode");
		var btd = this.btDiff;
		var _g1 = 0;
		var _g = btd.length;
		while(_g1 < _g) {
			var i = _g1++;
			btd[i].locTextTooltip(cat,"mode" + i);
		}
		this.lbDiff.chainX(btd[3],pad).chainX(btd[0],pad).chainX(btd[1],pad).chainX(btd[2],pad);
		this.lbHp1.locTextTooltip(cat,"health");
		this.lbHp1.chainX(this.fdHpNow).chainX(this.lbHp2).chainX(this.fdHpMax);
		this.lbMp1.locTextTooltip(cat,"mana");
		this.lbMp1.chainX(this.fdMpNow).chainX(this.lbMp2).chainX(this.fdMpMax);
		this.lbHair.locTextTooltip(cat,"hairStyle");
		this.lbHair.chainX(this.btHairPrev).chainX(this.fdHair,20);
		this.btHairPrev.chainX(this.btHairNext,40);
		this.lbStyle.locTextTooltip(cat,"bodyStyle");
		this.lbStyle.chainX(this.fdStyle);
		this.lbStyleNote.locTextTooltip(cat,"bodyStyleNote");
		var _g11 = 0;
		var _g2 = this.lbColor.length;
		while(_g11 < _g2) {
			var i1 = _g11++;
			this.lbColor[i1].locTextTooltip(cat,app_TabMain.ftColor[i1].toLowerCase() + "Color");
			this.lbColor[i1].chainX(this.fdColor[i1]);
		}
		this.lbQuests.locTextTooltip(cat,"fishingQuests");
		this.lbQuests.chainX(this.fdQuests);
		this.btFlags.locTextTooltip(cat,"editFlags");
		this.lbBarQuests.locTextTooltip(cat,"bartenderQuests");
		this.lbBarQuests.chainX(this.fdBarQuests);
		this.lbGolfScore.locTextTooltip(cat,"golfScore");
		this.lbGolfScore.chainX(this.fdGolfScore);
		this.lbPlayTimeSeconds.locTextTooltip(cat,"playTimeSeconds");
		this.lbPlayTimeSeconds.chainX(this.fdPlayTimeSeconds);
		this.lbPlayTimeTicks.locTextTooltip(cat,"playTimeTicks");
		this.lbPlayTimeTicks.chainX(this.fdPlayTimeTicks);
		app_TabBase.prototype.updateLang.call(this);
	}
	,render: function(u,v) {
		if(this.btHardcore.text != "" && this.m.time > this.btHardcoreTimeout) this.btHardcore.set_text("");
		app_TabBase.prototype.render.call(this,u,v);
	}
	,sync: function(p) {
		var i;
		var k;
		this.tabVersion.fdRaw.set_value(p.version);
		this.tabVersion.syncVersion(p.version);
		this.tabFlags.sync(p);
		this.fdHpNow.set_value(p.healthNow);
		this.fdHpMax.set_value(p.healthMax);
		this.fdMpNow.set_value(p.manaNow);
		this.fdMpMax.set_value(p.manaMax);
		i = p.difficulty;
		k = 0;
		while(k < this.btDiff.length) {
			this.btDiff[k].set_style(i == k?4:1);
			k++;
		}
		this.fdStyle.set_value(p.gender);
		var _g = 0;
		var _g1 = app_TabMain.PART_GENDER;
		while(_g < _g1.length) {
			var v = _g1[_g];
			++_g;
			this.parts[v].set_style(p.gender >= 4?0:1);
		}
		this.fdColor[0].set_value(i = p.hairColor);
		this.parts[8].set_color(i);
		this.fdColor[1].set_value(i = p.skinColor);
		this.parts[3].set_color(this.parts[1].set_color(i));
		this.fdColor[2].set_value(i = p.eyeColor);
		this.parts[2].set_color(i);
		this.fdColor[3].set_value(i = p.shirtColor);
		this.parts[4].set_color(i);
		this.fdColor[4].set_value(i = p.underColor);
		this.parts[5].set_color(i);
		this.fdColor[5].set_value(i = p.pantsColor);
		this.parts[6].set_color(i);
		this.fdColor[6].set_value(i = p.shoesColor);
		this.parts[7].set_color(i);
		this.fdHair.set_value(p.hairStyle);
		this.parts[8].set_style(p.hairStyle);
		this.fdQuests.set_value(p.fishingQuestsCompleted);
		this.fdBarQuests.set_value(p.bartenderQuests);
		this.fdGolfScore.set_value(p.golferScore);
		this.fdPlayTimeSeconds.set_value(p.playTimeSeconds);
		this.fdPlayTimeTicks.set_value(p.playTimeTicks);
		if((function($this) {
			var $r;
			var this1 = p.difficulty;
			$r = this1 >= 0 && this1 < 4;
			return $r;
		}(this))) this.btDiff[p.difficulty].click();
	}
	,__class__: app_TabMain
});
var openfl_geom_Point = function(u,v) {
	this.x = u != null?u:0;
	this.y = v != null?v:0;
};
$hxClasses["openfl.geom.Point"] = openfl_geom_Point;
openfl_geom_Point.__name__ = ["openfl","geom","Point"];
openfl_geom_Point.prototype = {
	setTo: function(u,v) {
		this.x = u;
		this.y = v;
	}
	,__class__: openfl_geom_Point
};
var app_BitPart = function(width,height,ofs) {
	this.style = 0;
	this.color = 16777215;
	openfl_display_BitmapData.call(this,width,height,true,0);
	this.source = Main._main.bitPlayer;
	this._rect = new openfl_geom_Rectangle(0,0,width,height);
	this.styles = [];
	this.ctf = new openfl_geom_ColorTransform();
	var _g = 0;
	while(_g < ofs.length) {
		var p = ofs[_g];
		++_g;
		this.styles.push(new openfl_geom_Rectangle(p.x,p.y,width,height));
	}
	this.update();
};
$hxClasses["app.BitPart"] = app_BitPart;
app_BitPart.__name__ = ["app","BitPart"];
app_BitPart.__super__ = openfl_display_BitmapData;
app_BitPart.prototype = $extend(openfl_display_BitmapData.prototype,{
	set_color: function(c) {
		if(this.color != c) {
			this.color = c;
			this.ctf.redMultiplier = (c >> 16 & 255) / 255;
			this.ctf.greenMultiplier = (c >> 8 & 255) / 255;
			this.ctf.blueMultiplier = (c & 255) / 255;
			this.update();
		}
		return c;
	}
	,set_style: function(s) {
		if(this.style != s) {
			this.style = s;
			this.update();
		}
		return s;
	}
	,update: function() {
		var s = this.style;
		if(s < 0 || s >= this.styles.length) s = 0;
		this.copyPixels(this.source,this.styles[s],app_BitPart.nullPoint,null,null,false);
		this.colorTransform(this._rect,this.ctf);
	}
	,__class__: app_BitPart
});
var app_TabMiscEquips = function() {
	this.slotLabels = [];
	app_TabInventory.call(this,null,0,"Misc");
	var names = ["Pet","Light pet","Minecart","Mount","Hook"];
	var _g = 0;
	while(_g < 5) {
		var i = [_g++];
		this.addSlot((function(i) {
			return function(p) {
				return p.equipmentDyes[i[0]];
			};
		})(i),40,40 * i[0]).color = 11104400;
		this.addSlot((function(i) {
			return function(p1) {
				return p1.equipmentItems[i[0]];
			};
		})(i),80,40 * i[0]);
		this.slotLabels[i[0]] = this.addLabel(120,40 * i[0] + 20,names[i[0]],1,0,1);
	}
};
$hxClasses["app.TabMiscEquips"] = app_TabMiscEquips;
app_TabMiscEquips.__name__ = ["app","TabMiscEquips"];
app_TabMiscEquips.__super__ = app_TabInventory;
app_TabMiscEquips.prototype = $extend(app_TabInventory.prototype,{
	updateLang: function() {
		var cat = "tab.tools";
		this.slotLabels[0].locTextTooltip(cat,"pet");
		this.slotLabels[1].locTextTooltip(cat,"lightPet");
		this.slotLabels[2].locTextTooltip(cat,"minecart");
		this.slotLabels[3].locTextTooltip(cat,"mount");
		this.slotLabels[4].locTextTooltip(cat,"hook");
	}
	,extraNodes: function() {
		this.shelfCtr.y = 200;
	}
	,__class__: app_TabMiscEquips
});
var app_TabResearch = function() {
	this.itemIndexOffset = 0;
	var _g = this;
	app_TabInventory.call(this,function(k) {
		return function(p) {
			return p.researchDummies[k];
		};
	},40,"",20,2);
	var _g1 = 0;
	var _g11 = this.items;
	while(_g1 < _g11.length) {
		var slot = _g11[_g1];
		++_g1;
		slot.color = 6332544;
	}
	var ny = 0;
	this.lbPage = this.addLabel(4,ny,"Page: ",1);
	this.btFirst = this.addButton((function($this) {
		var $r;
		var _this = $this.lbPage;
		$r = _this.x + _this.width;
		return $r;
	}(this)),ny,"[<",4,function(_) {
		_g.setPage(1);
	});
	this.btPrev = this.addButton((function($this) {
		var $r;
		var _this1 = $this.btFirst;
		$r = _this1.x + _this1.width;
		return $r;
	}(this)) + 4,ny," < ",4,function(_1) {
		if(_g.fdPage.get_value() <= 1) return;
		_g.setPage(_g.fdPage.get_value() - 1);
	});
	this.fdPage = this.addInt((function($this) {
		var $r;
		var _this2 = $this.btPrev;
		$r = _this2.x + _this2.width;
		return $r;
	}(this)) + 20,ny,"$",1,function(i) {
		if(i < 1) i = 1;
		_g.itemIndexOffset = (i - 1) * _g.items.length;
		_g.syncPage();
	});
	this.fdPage.set_halign(1);
	this.btNext = this.addButton((function($this) {
		var $r;
		var _this3 = $this.btPrev;
		$r = _this3.x + _this3.width;
		return $r;
	}(this)) + 40,ny," > ",4,function(_2) {
		_g.setPage(_g.fdPage.get_value() + 1);
	});
	this.btLast = dom_NodeTools.setTooltip(this.addButton((function($this) {
		var $r;
		var _this4 = $this.btNext;
		$r = _this4.x + _this4.width;
		return $r;
	}(this)) + 4,ny,">]",4,function(_3) {
		var rs = _g.m.player.researchSlots;
		var i1 = rs.length;
		while(--i1 >= 0) if(rs[i1].get_isValid()) {
			_g.setPage(1 + (i1 / _g.items.length | 0));
			return;
		}
		_g.setPage(1);
	}),"Note: You can scroll past the last page");
	this.btUnlockAll = dom_NodeTools.setTooltip(this.addConfirm(396,ny,"Unlock All",5,function(_4) {
		var rs1 = _g.m.player.researchSlots = [];
		var _g12 = 0;
		var _g2 = terra_Item.list;
		while(_g12 < _g2.length) {
			var item = _g2[_g12];
			++_g12;
			if(item.id == 0) continue;
			var n = app_TabResearch.goalPerItem.h[item.id];
			if(n == null || n < 0) continue;
			var slot1 = new terra_Slot();
			slot1.favFlagMinVersion = 0;
			slot1.multi = true;
			slot1.item = item;
			slot1.count = n;
			rs1.push(slot1);
		}
		_g.setPage(1);
	}),"ATTENTION:" + "\nThis will add 5000 items to your research");
	this.btUnlockAll.set_halign(2);
	this.btRemoveAll = this.addConfirm(this.btUnlockAll.x - this.btUnlockAll.width - 8,ny,"Remove All",2,function(_5) {
		_g.m.player.researchSlots = [];
		_g.setPage(1);
	});
	this.btRemoveAll.set_halign(2);
};
$hxClasses["app.TabResearch"] = app_TabResearch;
app_TabResearch.__name__ = ["app","TabResearch"];
app_TabResearch.__super__ = app_TabInventory;
app_TabResearch.prototype = $extend(app_TabInventory.prototype,{
	extraNodes: function() {
		var btb = this.bottomNodes;
		btb.push(this.addLabel(0,this.shelfCtr.y + 160,"Progress:",1));
		btb.push(new app_io_IoSaveResearch(this.title));
		btb.push(new app_io_IoLoadResearch(this.title,false));
		var at = btb[0];
		var _g = 0;
		while(_g < btb.length) {
			var bt = btb[_g];
			++_g;
			bt.y = at.y;
			if(bt != at) {
				at = at.chainX(bt,8);
				this.add(bt);
			}
		}
	}
	,updateLang: function() {
		var cat = "tab.research";
		this.lbPage.locTextTooltip(cat,"page");
		this.lbPage.chainX(this.btFirst,0).chainX(this.btPrev,4).chainX(this.fdPage,20);
		this.btPrev.chainX(this.btNext,40).chainX(this.btLast,4);
		this.btUnlockAll.locTextTooltip(cat,"unlockAll");
		this.btRemoveAll.locTextTooltip(cat,"removeAll");
		this.btRemoveAll.x = this.btUnlockAll.x - this.btUnlockAll.width - 8;
		app_TabInventory.prototype.updateLang.call(this);
	}
	,setPage: function(i,p) {
		this.fdPage.set_value(i);
		this.itemIndexOffset = (i - 1) * this.items.length;
		this.syncPage(p);
	}
	,syncPage: function(p) {
		if(p == null) p = this.m.player;
		var _g1 = 0;
		var _g = this.items.length;
		while(_g1 < _g) {
			var i = _g1++;
			var item = this.items[i];
			var slot = p.researchSlots[this.itemIndexOffset + i];
			if(slot == null) {
				slot = new terra_Slot();
				p.researchSlots[this.itemIndexOffset + i] = slot;
			}
			item.set_slot(slot);
		}
	}
	,sync: function(p) {
		this.setPage(1,p);
	}
	,__class__: app_TabResearch
});
var app_TabServers = function() {
	app_TabBase.call(this);
	this.servers = [];
	this.btAdd = this.addButton(0,0,"[+]",4,$bind(this,this.addServer));
	dom_NodeTools.setTooltip(this.btAdd,"You need to know world name+ID for this." + "\nUnless you are copying spawn points from an" + "\nexisting character, there's not much use.");
};
$hxClasses["app.TabServers"] = app_TabServers;
app_TabServers.__name__ = ["app","TabServers"];
app_TabServers.__super__ = app_TabBase;
app_TabServers.prototype = $extend(app_TabBase.prototype,{
	updateLang: function() {
		var cat = "tab.spawnpoints";
		this.btAdd.tooltipText = Lang.ttip(cat,"add",this.btAdd.tooltipEnText);
		app_TabServers.removeTooltip = Lang.ttip(cat,"remove",app_TabServers.removeTooltipEn);
		var _g = 0;
		var _g1 = this.servers;
		while(_g < _g1.length) {
			var server = _g1[_g];
			++_g;
			server.btRemove.tooltipText = app_TabServers.removeTooltip;
		}
	}
	,sync: function(p) {
		var _g = 0;
		var _g1 = this.servers;
		while(_g < _g1.length) {
			var sv1 = _g1[_g];
			++_g;
			sv1.dispose();
		}
		this.servers = [];
		var i = -1;
		var l = p.servers.length;
		var sv;
		while(++i < l) {
			var sp = p.servers[i];
			sv = new app__$TabServers_ServerNode(this,sp);
			this.servers.push(sv);
		}
		this.alignServers();
	}
	,addServer: function(_) {
		var sx = new terra_ServerEntry();
		var sv = new app__$TabServers_ServerNode(this,sx);
		this.servers.push(sv);
		this.m.player.servers.push(sx);
		this.alignServers();
	}
	,alignServers: function() {
		var i = -1;
		var l = this.servers.length;
		var p = 0;
		while(++i < l) {
			this.servers[i].snap(p);
			p += this.servers[i].btRemove.height;
		}
		this.btAdd.y = p;
	}
	,__class__: app_TabServers
});
var app__$TabServers_ServerNode = function(tab,sv) {
	var _g = this;
	var i;
	this.tab = tab;
	this.server = sv;
	this.btRemove = tab.addButton(0,0,"[x] ",2);
	dom_NodeTools.setTooltip(this.btRemove,app_TabServers.removeTooltip);
	this.btRemove.onClick = function(_) {
		_g.dispose();
		HxOverrides.remove(tab.servers,_g);
		HxOverrides.remove(tab.m.player.servers,_g.server);
		tab.alignServers();
	};
	tab.add(this.fdName = new dom_StringField());
	this.fdName.set_format("\"$\"");
	this.fdName.set_value(sv.name);
	this.fdName.onChange = $bind(this,this.resync);
	this.fdName.onFinish = function(v) {
		sv.name;
	};
	tab.add(this.fdAddr = new dom_IntField());
	this.fdAddr.set_style(3);
	this.fdAddr.onVerify = $bind(this,this.verifyAddr);
	this.fdAddr.set_value(sv.address);
	this.fdAddr.onChange = $bind(this,this.resync);
	this.fdAddr.onFinish = function(v1) {
		sv.address = v1;
	};
	this.lbPos = [];
	i = -1;
	while(++i < 4) tab.add(this.lbPos[i] = new dom_Label());
	this.lbPos[0].set_text(" [");
	this.lbPos[1].set_text("] (");
	this.lbPos[2].set_text(", ");
	this.lbPos[3].set_text(")");
	this.fdX = tab.addInt(0,0,"$",1,function(v2) {
		_g.server.spawnX = v2;
	});
	this.fdX.set_value(this.server.spawnX);
	this.fdX.onChange = $bind(this,this.resync);
	this.fdX.onFinish = function(v3) {
		_g.server.spawnX = v3;
	};
	this.fdY = tab.addInt(0,0,"$",1,function(v4) {
		_g.server.spawnX = v4;
	});
	this.fdY.set_value(this.server.spawnY);
	this.fdY.onChange = $bind(this,this.resync);
	this.fdY.onFinish = function(v5) {
		_g.server.spawnY = v5;
	};
	this.resync(null);
};
$hxClasses["app._TabServers.ServerNode"] = app__$TabServers_ServerNode;
app__$TabServers_ServerNode.__name__ = ["app","_TabServers","ServerNode"];
app__$TabServers_ServerNode.prototype = {
	snap: function(y) {
		var i;
		this.fdAddr.y = this.btRemove.y = this.fdName.y = this.fdX.y = this.fdY.y = y;
		i = -1;
		while(++i < 4) this.lbPos[i].y = y;
	}
	,dispose: function() {
		var i;
		this.tab.remove(this.btRemove);
		this.tab.remove(this.fdName);
		this.tab.remove(this.fdAddr);
		i = -1;
		while(++i < 4) this.tab.remove(this.lbPos[i]);
		this.tab.remove(this.fdX);
		this.tab.remove(this.fdY);
	}
	,verifyAddr: function(v) {
		return v >= 0 && v <= -1;
	}
	,resync: function(_) {
		var o = this.btRemove;
		this.fdName.x = o.x + o.width;
		o = this.fdName;
		this.lbPos[0].x = o.x + o.width;
		o = this.lbPos[0];
		this.fdAddr.x = o.x + o.width;
		o = this.fdAddr;
		this.lbPos[1].x = o.x + o.width;
		o = this.lbPos[1];
		this.fdX.x = o.x + o.width;
		o = this.fdX;
		this.lbPos[2].x = o.x + o.width;
		o = this.lbPos[2];
		this.fdY.x = o.x + o.width;
		o = this.fdY;
		this.lbPos[3].x = o.x + o.width;
	}
	,__class__: app__$TabServers_ServerNode
};
var app_TabShelf = function() {
	app_TabItems.call(this);
	var i;
	i = -1;
	while(++i < 40) {
		var slot = [new terra_Slot()];
		var o = new app_SlotNode((function(slot) {
			return function(_) {
				return slot[0];
			};
		})(slot),1);
		o.x = i % 10 * 40;
		o.y = (i / 10 | 0) * 40;
		o.set_slot(slot[0]);
		this.add(o);
		this.items.push(o);
	}
};
$hxClasses["app.TabShelf"] = app_TabShelf;
app_TabShelf.__name__ = ["app","TabShelf"];
app_TabShelf.get_inst = function() {
	if(app_TabShelf._inst == null) app_TabShelf._inst = new app_TabShelf();
	return app_TabShelf._inst;
};
app_TabShelf.__super__ = app_TabItems;
app_TabShelf.prototype = $extend(app_TabItems.prototype,{
	sync: function(p) {
	}
	,load: function(v) {
		var i;
		var l = v.length;
		var n = this.items.length;
		var z = terra_Item.fromId(0);
		i = -1;
		while(++i < n) {
			this.items[i].set_id(i < l?terra_Item.fromId(v[i]):z);
			this.items[i].set_count(1);
		}
	}
	,__class__: app_TabShelf
});
var app_TabStart = function() {
	this.links = [];
	this.heyListenTime = 0;
	this.heyListen = null;
	var _g = this;
	app_TabBase.call(this);
	var x;
	var q;
	var ql;
	var s;
	var addLink = function(x1,y,text,url,style) {
		var r = new app_TabStartLink(url);
		r.x = x1;
		r.y = y;
		r.set_style(style);
		r.set_text(r.enText = text);
		_g.add(r);
		return r;
	};
	var qr = [];
	this.labels = qr;
	var qh = [];
	this.links = qh;
	qh.push(ql = addLink(0,0,"Terrasavr+ is now available!","https://yal.cc/r/terrasavr/plus",8));
	q = this.addLabel(0,ql.y + ql.height,"Faster, nicer, mobile-friendly.");
	qr[0] = q = this.addLabel(0,q.y + q.height + 10,"Click \"Load player\" to load a PLR file.",4);
	qr[1] = q = this.addLabel(0,q.y + q.height,"These are most commonly found in:");
	qr[2] = q = this.addLabel(0,q.y + q.height,"Windows",4);
	qr[3] = q = this.addLabel(q.x + q.width,q.y,": \"My Documents/My Games/Terraria/Players\"");
	qr[4] = q = this.addLabel(0,q.y + q.height,"Mac",4);
	qr[5] = q = this.addLabel(q.x + q.width,q.y,": \"~/Library/Application Support/Terraria/Players\" (user home)");
	qr[6] = q = this.addLabel(0,q.y + q.height,"Linux",4);
	qr[7] = q = this.addLabel(q.x + q.width,q.y,": \"~/.local/share/Terraria/Players\" (or \"" + "$XDG_DATA_HOME" + "/Terraria/Players\")");
	qr[8] = q = this.addLabel(0,q.y + q.height + 10,"Terrasavr is made by ");
	qh.push(this.linkYAL = ql = addLink(q.x + q.width,q.y,"YellowAfterlife","https://yal.cc",3));
	qr[9] = q = this.addLabel(ql.x + ql.width,q.y,"!");
	this.langCredit = q = this.addLabel(0,q.y + q.height,"");
	qr[10] = q = this.addLabel(0,q.y + q.height + 10,"Last updated on ");
	this.labelDate = q = this.addLabel(q.x + q.width,q.y,"Dec 03, 2023",4);
	qr[11] = q = this.addLabel(q.x + q.width,q.y," (for Terraria ");
	this.labelVersion = q = this.addLabel(q.x + q.width,q.y,"1.4.4.x",4);
	qr[12] = q = this.addLabel(q.x + q.width,q.y,"):");
	this.labelChanges = q = this.addLabel(0,q.y + q.height,["- Added the Vietnamese translation by Paul Pham"].join("\n"),1);
};
$hxClasses["app.TabStart"] = app_TabStart;
app_TabStart.__name__ = ["app","TabStart"];
app_TabStart.__super__ = app_TabBase;
app_TabStart.prototype = $extend(app_TabBase.prototype,{
	update: function(dt) {
		app_TabBase.prototype.update.call(this,dt);
		if(this.heyListen != null) {
			this.heyListenTime += dt / 1.7;
			this.heyListen.y = Std["int"](this.heyListenY + Math.sin(this.heyListenTime * Math.PI * 2) * 3);
		}
	}
	,end: function() {
		app_TabBase.prototype.end.call(this);
		var _g = 0;
		var _g1 = this.links;
		while(_g < _g1.length) {
			var link = _g1[_g];
			++_g;
			link.set_enabled(false);
		}
	}
	,updateLang: function() {
		var qr = this.labels;
		var y;
		var cat = "tab.intro";
		var _g1 = 0;
		var _g = qr.length;
		while(_g1 < _g) {
			var i = _g1++;
			qr[i].locTextTooltip(cat,"label" + i);
		}
		var _this = qr[0];
		qr[1].y = _this.y + _this.height;
		qr[2].y = (function($this) {
			var $r;
			var _this1 = qr[1];
			$r = qr[3].y = _this1.y + _this1.height;
			return $r;
		}(this));
		qr[2].chainX(qr[3]);
		qr[4].y = (function($this) {
			var $r;
			var _this2 = qr[2];
			$r = qr[5].y = _this2.y + _this2.height;
			return $r;
		}(this));
		qr[4].chainX(qr[5]);
		qr[6].y = (function($this) {
			var $r;
			var _this3 = qr[4];
			$r = qr[7].y = _this3.y + _this3.height;
			return $r;
		}(this));
		qr[6].chainX(qr[7]);
		y = (function($this) {
			var $r;
			var _this4 = qr[6];
			$r = _this4.y + _this4.height;
			return $r;
		}(this)) + 10;
		qr[8].y = this.linkYAL.y = qr[9].y = y;
		qr[8].chainX(this.linkYAL).chainX(qr[9]);
		var _this5 = qr[8];
		this.langCredit.y = _this5.y + _this5.height;
		this.langCredit.set_text(Lang.loc(cat,"aboutTranslator",this.langCredit.enText));
		y = (function($this) {
			var $r;
			var _this6 = $this.langCredit;
			$r = _this6.y + _this6.height;
			return $r;
		}(this)) + 10;
		qr[10].y = qr[11].y = qr[12].y = this.labelDate.y = this.labelVersion.y = y;
		qr[10].chainX(this.labelDate).chainX(qr[11]).chainX(this.labelVersion).chainX(qr[12]);
		var _this7 = qr[10];
		this.labelChanges.y = _this7.y + _this7.height;
		if(this.terranionPre != null) {
			this.terranionPre.y = this.linkTerranion.y = (function($this) {
				var $r;
				var _this8 = $this.labelChanges;
				$r = $this.terranionPost.y = _this8.y + _this8.height;
				return $r;
			}(this));
			this.terranionPre.set_text(Lang.loc(cat,"terranion0",this.terranionPre.enText));
			this.linkTerranion.set_text(Lang.loc(cat,"terranion1",this.linkTerranion.enText));
			this.terranionPost.set_text(Lang.loc(cat,"terranion2",this.terranionPost.enText));
			this.terranionPre.chainX(this.linkTerranion).chainX(this.terranionPost);
		}
		if(this.researchLink != null) {
			this.researchAlso.y = this.researchPre.y = this.researchLink.y = (function($this) {
				var $r;
				var _this9 = $this.terranionPre;
				$r = $this.researchPost.y = _this9.y + _this9.height;
				return $r;
			}(this));
			this.researchAlso.set_text(Lang.loc(cat,"research0",this.researchAlso.enText));
			this.researchPre.set_text(Lang.loc(cat,"research1",this.researchPre.enText));
			this.researchLink.set_text(Lang.loc(cat,"research2",this.researchLink.enText));
			this.researchPost.set_text(Lang.loc(cat,"research3",this.researchPost.enText));
			this.researchAlso.chainX(this.researchPre).chainX(this.researchLink).chainX(this.researchPost);
		}
		app_TabBase.prototype.updateLang.call(this);
	}
	,__class__: app_TabStart
});
var app_TabStartLink = function(href) {
	this.enabled = true;
	dom_Button.call(this);
	this.anchor = new openfl_display_Anchor(href,"_blank");
	this.anchor.component.style.zIndex = "100";
	this.block = new openfl_display_RoundRect(10,10,0);
	this.anchor.addChild(this.block);
};
$hxClasses["app.TabStartLink"] = app_TabStartLink;
app_TabStartLink.__name__ = ["app","TabStartLink"];
app_TabStartLink.__super__ = dom_Button;
app_TabStartLink.prototype = $extend(dom_Button.prototype,{
	set_enabled: function(b) {
		if(this.enabled != b) {
			this.enabled = b;
			if(!b && this.anchor.parent != null) this.anchor.parent.removeChild(this.anchor);
		}
		return b;
	}
	,render: function(u,v) {
		dom_Button.prototype.render.call(this,u,v);
		if(this.enabled && this.anchor.parent == null) Main._main.addChild(this.anchor);
		this.anchor.set_x(u + this.x - this.ofs_x);
		this.anchor.set_y(v + this.y - this.ofs_y);
		this.block.set_width(this.width);
		this.block.set_height(this.height);
	}
	,__class__: app_TabStartLink
});
var app_TabVersion = function(tabMain) {
	this.current = null;
	this.versionButtonArr = [];
	this.versionButtonMap = new haxe_ds_IntMap();
	var _g = this;
	app_TabBase.call(this);
	this.tabMain = tabMain;
	app_TabVersion.pcVersions = app_TabVersion.initPC();
	this.lbRaw = this.addLabel(0,0,"Release number: ",4);
	this.fdRaw = this.addInt((function($this) {
		var $r;
		var _this = $this.lbRaw;
		$r = _this.x + _this.width;
		return $r;
	}(this)),this.lbRaw.y,"$",1,function(v) {
		_g.m.player.set_version(v);
		_g.syncVersion(v);
	});
	var y;
	var _this1 = this.lbRaw;
	y = _this1.y + _this1.height;
	var _g1 = 0;
	var _g11 = app_TabVersion.versionGroups;
	while(_g1 < _g11.length) {
		var group = _g11[_g1];
		++_g1;
		var lb = this.addLabel(0,y,group.text + ":",4);
		var x = lb.x + lb.width;
		var _g2 = 0;
		var _g3 = group.versions;
		while(_g2 < _g3.length) {
			var ver = _g3[_g2];
			++_g2;
			var bt = this.addButton(x + 10,y,ver.text,1,this.getVersionSetter(ver.num));
			{
				this.versionButtonMap.h[ver.num] = bt;
				bt;
			}
			this.versionButtonArr.push(bt);
			x = bt.x + bt.width;
		}
		y = lb.y + lb.height;
	}
};
$hxClasses["app.TabVersion"] = app_TabVersion;
app_TabVersion.__name__ = ["app","TabVersion"];
app_TabVersion.initPC = function() {
	var arr = [];
	var groups = [];
	var def = function(title,versions) {
		var group = new app_VersionGroup(title);
		var _g = 0;
		while(_g < versions.length) {
			var bit = versions[_g];
			++_g;
			var sep = bit.indexOf("=");
			var num = Std.parseInt(bit.substring(sep + 1));
			var ver = new app_VersionPair(bit.substring(0,sep),num);
			{
				app_TabVersion.versionNameMap.set(ver.text,ver);
				ver;
			}
			arr.push(ver);
			group.versions.push(ver);
		}
		groups.push(group);
	};
	def("1.1.x",["1.1.2=" + 39]);
	def("1.2.x",["1.2.0=69","1.2.1=73","1.2.2=" + 77,"1.2.3=" + 93,"1.2.4=" + 98]);
	def("1.3.x",["1.3.0=" + 145,"1.3.1=" + 168,"1.3.3=" + 175,"1.3.4=" + 184,"1.3.5=" + 190]);
	def("1.4.x",["1.4.0=" + 225,"1.4.0.5=" + 230,"1.4.1.2=" + 237,"1.4.3.0=" + 248,"1.4.4.0=" + 269]);
	app_TabVersion.versionGroups = groups;
	return arr;
};
app_TabVersion.__super__ = app_TabBase;
app_TabVersion.prototype = $extend(app_TabBase.prototype,{
	updateLang: function() {
		app_TabBase.prototype.updateLang.call(this);
		var cat = "tab.version";
		this.lbRaw.locTextTooltip(cat,"rawVersion");
		var _this = this.lbRaw;
		this.fdRaw.x = _this.x + _this.width;
	}
	,getVersionSetter: function(v) {
		var _g = this;
		return function(_) {
			_g.fdRaw.set_value(v);
			_g.fdRaw.onFinish(v);
		};
	}
	,syncVersion: function(v) {
		if(v == null) v = this.m.player.version;
		var bt = this.findBestMatch(v);
		this.tabMain.lbVersion[1].set_text(this.getBestText(v,bt));
		if(this.current != null) this.current.set_style(1);
		bt.set_style(4);
		this.current = bt;
		this.tabMain.syncVersionLabels();
	}
	,findBestMatch: function(v) {
		var i = this.versionButtonArr.length;
		while(--i >= 0) {
			var bt = this.versionButtonArr[i];
			var ver = app_TabVersion.versionNameMap.get(bt.text);
			if(v >= ver.num) return bt;
		}
		return this.versionButtonArr[0];
	}
	,getBestText: function(v,bt) {
		var txt = bt.text;
		if(v > app_TabVersion.versionNameMap.get(bt.text).num) txt += "+";
		return txt;
	}
	,__class__: app_TabVersion
});
var app_VersionPair = function(text,num) {
	this.text = text;
	this.num = num;
};
$hxClasses["app.VersionPair"] = app_VersionPair;
app_VersionPair.__name__ = ["app","VersionPair"];
app_VersionPair.prototype = {
	__class__: app_VersionPair
};
var app_VersionGroup = function(text) {
	this.versions = [];
	this.text = text;
};
$hxClasses["app.VersionGroup"] = app_VersionGroup;
app_VersionGroup.__name__ = ["app","VersionGroup"];
app_VersionGroup.prototype = {
	__class__: app_VersionGroup
};
var app_TopPane = function() {
	this.tsLoad = 0;
	var _g = this;
	app_TopPane.inst = this;
	dom_Container.call(this);
	this.x = this.y = 8;
	this.fxLoad = [new openfl_net_FileFilter("Terraria player files (*.plr)","*.plr"),new openfl_net_FileFilter("All files (*.*)","*.*")];
	this.frLoad = new openfl_net_FileReference();
	this.frLoad.addEventListener("select",function(_) {
		_g.frLoad.load();
	});
	this.frLoad.addEventListener("complete",$bind(this,this.onLoad));
	this.frSave = new openfl_net_FileReference();
	this.btLoad = new dom_Button();
	this.btLoad.set_style(3);
	this.btLoad.set_text(this.btLoad.enText = "Load player");
	this.btLoad.onClick = function(_1) {
		var now = openfl_Lib.getTimer();
		if(_g.tsLoad < now) {
			_g.tsLoad = now + 500;
			_g.frLoad.browse(_g.fxLoad);
		}
	};
	this.add(this.btLoad);
	this.btSave = new dom_Button();
	this.btSave.set_style(4);
	this.btSave.set_text(this.btSave.enText = "Save player");
	this.btSave.x = (function($this) {
		var $r;
		var _this = $this.btLoad;
		$r = _this.x + _this.width;
		return $r;
	}(this)) + 8;
	dom_NodeTools.setTooltip(this.btSave,"Gives you an updated PLR file." + "\nDon't forget to replace your PLR in" + "\nthe Players directory by the new one!");
	this.btSave.onClick = $bind(this,this.onSave);
	this.add(this.btSave);
	this.fdName = new dom_StringField();
	this.fdName.set_format("[$]");
	this.fdName.set_value("Someone");
	this.fdName.x = this.btSave.x + this.btSave.width + 8;
	this.add(this.fdName);
	this.initTabs();
	this.onSync();
};
$hxClasses["app.TopPane"] = app_TopPane;
app_TopPane.__name__ = ["app","TopPane"];
app_TopPane.__super__ = dom_Container;
app_TopPane.prototype = $extend(dom_Container.prototype,{
	updateLang: function() {
		var cat = "tab.top";
		this.btLoad.locTextTooltip(cat,"load");
		this.btSave.locTextTooltip(cat,"save");
		this.btStart.chainX(this.btLoad,8).chainX(this.btSave,8).chainX(this.fdName,8);
		var set = function(tab,key,title,ttip) {
			tab.title = Lang.loc(cat,key,title);
			tab.tooltipText = Lang.ttip(cat,key,ttip);
		};
		set(this.tabMain,"char","Char.","General values");
		set(this.tabEquips,"equips","Equips","Armor and accessories");
		set(this.tabMiscEquips,"tools","Tools","Tools");
		set(this.tabInvMain,"inventory","Inv.","Main inventory");
		set(this.tabPiggy,"bank","Bank","Piggy Bank");
		set(this.tabSafe,"safe","Safe","The bank one");
		set(this.tabForge,"forge","Forge","Defender's Forge");
		set(this.tabVoid,"void","Void","Void vault/bag");
		set(this.tabEffects,"buffs","Buffs","Status effects");
		set(this.tabResearch,"research","Research","1.4 Journey Mode research");
		set(this.tabSpawnPoints,"spawnpoints","SPs","Per-world spawn points");
		var tbx = this.tabButtons[0].x;
		var _g = 0;
		var _g1 = this.tabButtons;
		while(_g < _g1.length) {
			var tb = _g1[_g];
			++_g;
			if(tb == this.btLang || tb == this.btStart) continue;
			var tbt = tb.tab;
			tb.set_text(tbt.title);
			tb.tooltipText = tbt.tooltipText;
			tbt.tooltipText = null;
			tb.x = tbx;
			tbx += tb.width + 8;
		}
		this.btHelp.x = tbx;
		this.btHelp.set_text(Lang.loc(cat,"help","Help"));
		this.btHelp.tooltipText = Lang.ttip(cat,"help","FAQs and such");
		var _g2 = 0;
		var _g11 = this.tabs;
		while(_g2 < _g11.length) {
			var tab1 = _g11[_g2];
			++_g2;
			tab1.updateLang();
		}
		this.tabStart.updateLang();
	}
	,updateBMF: function() {
		var _g = 0;
		var _g1 = this.tabs;
		while(_g < _g1.length) {
			var tab = _g1[_g];
			++_g;
			if(tab != this.tabNow) tab.updateBMF();
		}
		this.tabStart.updateBMF();
		dom_Container.prototype.updateBMF.call(this);
	}
	,setTab: function(o,tb) {
		var _g = 0;
		var _g1 = this.tabButtons;
		while(_g < _g1.length) {
			var b = _g1[_g];
			++_g;
			b.set_style(b == tb?5:1);
		}
		if(this.tabNow != o) {
			if(this.tabNow != null) {
				this.tabNow.end();
				this.tabContainer.remove(this.tabNow);
			}
			this.tabContainer.add(this.tabNow = o);
			this.tabNow.start();
		}
	}
	,initTabs: function() {
		var _g = this;
		this.tabContainer = new dom_Container();
		this.tabContainer.x = 8;
		this.tabContainer.y = 52;
		this.add(this.tabContainer);
		this.tabText = new app_TabBase();
		this.tabText.add(this.lbText = new dom_Label());
		this.lbText.set_style(4);
		this.tabSearch = new app_TabInventory(null,0,"Search");
		this.lbSearch = [this.tabSearch.addLabel(8,0,"",1),this.tabSearch.addLabel(8,0,"",3),this.tabSearch.addLabel(8,0,"\":",1)];
		var lbSearchHeight = this.lbSearch[2].height;
		this.tabSearch.y = lbSearchHeight;
		var _g1 = 0;
		var _g11 = this.lbSearch;
		while(_g1 < _g11.length) {
			var lb = _g11[_g1];
			++_g1;
			lb.y = -lbSearchHeight;
		}
		this.tabSearch.addLabel(8,this.tabSearch.shelfCtr.y + 160,this.lbText.text,4);
		this.tabInvMain = new app_TabInventory(function(k) {
			return function(p) {
				return p.inventory[k];
			};
		},50,"Inv.");
		var _g2 = 0;
		while(_g2 < 10) {
			var i = _g2++;
			this.tabInvMain.items[i].color = 6525881;
		}
		this.tabs = [dom_NodeTools.setTtIcon(this.tabMain = new app_TabMain(),58),dom_NodeTools.setTtIcon(this.tabEquips = new app_TabEquips(),92),dom_NodeTools.setTtIcon(this.tabMiscEquips = new app_TabMiscEquips(),1183),dom_NodeTools.setTtIcon(this.tabInvMain,50),this.tabPiggy = dom_NodeTools.setTtIcon(new app_TabInventory(function(k1) {
			return function(p1) {
				return p1.bankItems[k1];
			};
		},40,""),87),this.tabSafe = dom_NodeTools.setTtIcon(new app_TabInventory(function(k2) {
			return function(p2) {
				return p2.safeItems[k2];
			};
		},40,""),346),this.tabForge = dom_NodeTools.setTtIcon(new app_TabInventory(function(k3) {
			return function(p3) {
				return p3.forgeItems[k3];
			};
		},40,""),3813),this.tabVoid = dom_NodeTools.setTtIcon(new app_TabInventory(function(k4) {
			return function(p4) {
				return p4.voidItems[k4];
			};
		},40,""),4076),this.tabEffects = dom_NodeTools.setTtIcon(new app_TabEffects(),289),this.tabResearch = dom_NodeTools.setTtIcon(new app_TabResearch(),1344),this.tabSpawnPoints = dom_NodeTools.setTtIcon(new app_TabServers(),224)];
		var nextTabLeft = 4;
		this.tabButtons = [];
		var getTabFunc = function(o,tb) {
			return function(_) {
				_g.setTab(o,tb);
			};
		};
		var _g3 = 0;
		var _g12 = this.tabs;
		while(_g3 < _g12.length) {
			var t = _g12[_g3];
			++_g3;
			var bt = new app_TabButton(t);
			this.tabButtons.push(bt);
			bt.x = nextTabLeft;
			bt.y = 24;
			bt.set_style(t.style);
			bt.set_text(t.title);
			bt.tooltipText = t.tooltipText;
			t.tooltipText = null;
			bt.tooltipIcon = t.tooltipIcon;
			t.tooltipIcon = 0;
			bt.onClick = getTabFunc(t,bt);
			nextTabLeft += bt.width + 8;
			this.add(bt);
		}
		this.tabLang = new app_TabLang();
		this.tabs.push(this.tabLang);
		this.btLang = new app_TabButton(this.tabLang);
		this.btLang.set_text(this.btLang.enText = "English");
		this.btLang.x = 420;
		this.btLang.onClick = getTabFunc(this.tabLang,this.btLang);
		this.tabButtons.push(this.btLang);
		var url = "//yal.cc/r/terrasavr/doc/";
		url = window.location.protocol + url;
		this.btHelp = new dom_Link("Help",url);
		this.btHelp.x = nextTabLeft;
		this.btHelp.y = 24;
		dom_NodeTools.setTtIcon(this.btHelp,149);
		this.add(this.btHelp);
		this.tabStart = new app_TabStart();
		this.btStart = new app_TabButton(this.tabStart);
		this.btStart.set_text(this.btStart.enText = "[>]");
		this.btStart.onClick = getTabFunc(this.tabStart,this.btStart);
		this.btStart.set_style(5);
		this.tabButtons.push(this.btStart);
		this.add(this.btStart);
		this.tabContainer.add(this.tabNow = this.tabStart);
		var v = utils_WebArgs.map.get("q");
		if(v != null) this.showSearch(v);
	}
	,render: function(u,v) {
		var maxIds = terra_PlayerTools.getMaxIds(this.m.player.version);
		app_BuffNode.maxId = maxIds.buff;
		app_SlotNode.maxId = maxIds.item;
		var ico = terra_Item.idMap.h[4766];
		if(ico != null) {
			var lx = u + this.x + this.btLang.x - 22;
			var ly = v + this.y + this.btLang.y;
			this.m.context.drawImage(this.m.imgItems,ico.iconX,ico.iconY,40,40,lx,ly,20,20);
		}
		dom_Container.prototype.render.call(this,u,v);
	}
	,markTab: function(n) {
		var i = -1;
		var l = this.tabButtons.length;
		while(++i < l) this.tabButtons[i].set_style(n == i?4:1);
	}
	,showSearch: function(t) {
		app_TabInventory.sideBtns[1].click();
		app_TabLibrary.get_inst().fdSearch.set_value(t);
		if(this.tabNow != this.tabSearch) {
			this.markTab(-1);
			this.setTab(this.tabSearch);
		}
		app_TabLibrary.get_inst().search(t);
	}
	,print: function(t,s) {
		this.lbText.set_text("");
		this.lbText.set_style(s);
		this.lbText.set_text(t);
		if(this.tabNow != this.tabText) {
			this.markTab(-1);
			this.setTab(this.tabText);
		}
	}
	,onSync: function() {
		var p = this.m.player;
		this.fdName.set_value(p.name);
		var _g = 0;
		var _g1 = this.tabs;
		while(_g < _g1.length) {
			var t = _g1[_g];
			++_g;
			t.sync(p);
		}
	}
	,loadVanilla: function(d) {
		var _g = this;
		if(d.length % 16 != 0) this.print("That doesn't look like a valid character file.\n" + "Either that or it's damaged.",2); else if(d.length == 0) this.print("The file is empty. Perhaps it was corrupt before." + "\nYou can try re-creating the character manually.",2); else if(d.length < 800) this.print("The file is too small to be a valid character file.\n" + "Perhaps a part is missing.",2); else {
			var step = -1;
			step = 0;
			var p = new terra_Player();
			var x = utils_ByteArrayTools.decrypt(d);
			console.log(utils_ByteArrayTools.toPages(x));
			step = 1;
			p.load(x);
			if(_g.tabNow == _g.tabText || _g.tabNow == _g.tabSearch || _g.tabNow == _g.tabStart) _g.tabButtons[0].click();
			_g.m.player = p;
			_g.m.tsavrOn = true;
		}
	}
	,onLoad: function(_) {
		this.lastFile = this.frLoad.get_name();
		var d = _.get_target().data;
		this.loadVanilla(d);
		this.onSync();
		this.m.ignoreMouseEventsUntil = openfl_Lib.getTimer() + 500;
	}
	,onSave: function(_) {
		var p = this.m.player;
		p.name = this.fdName.get_value();
		var by;
		p.save(by = new openfl_utils_ByteArray());
		console.log(utils_ByteArrayTools.toPages(by));
		by = utils_ByteArrayTools.encrypt(by);
		this.frSave.save(by,this.lastFile != null?this.lastFile:"" + p.name + ".plr");
	}
	,__class__: app_TopPane
});
var app_TabButton = function(tab) {
	dom_Button.call(this);
	this.tab = tab;
};
$hxClasses["app.TabButton"] = app_TabButton;
app_TabButton.__name__ = ["app","TabButton"];
app_TabButton.__super__ = dom_Button;
app_TabButton.prototype = $extend(dom_Button.prototype,{
	__class__: app_TabButton
});
var app_io_IoButton = function() {
	this.catGetters = { };
	this.allGetters = [];
	dom_Button.call(this);
};
$hxClasses["app.io.IoButton"] = app_io_IoButton;
app_io_IoButton.__name__ = ["app","io","IoButton"];
app_io_IoButton.__super__ = dom_Button;
app_io_IoButton.prototype = $extend(dom_Button.prototype,{
	addGetter: function(f,cat) {
		if(cat == null) cat = "items";
		this.allGetters.push(f);
		var arr = this.catGetters[cat];
		if(arr == null) {
			arr = [];
			this.catGetters[cat] = arr;
		}
		arr.push(f);
	}
	,getAllSlots: function(p) {
		return this.allGetters.map(function(f) {
			return f(p);
		});
	}
	,getCatSlots: function(p) {
		var out = { };
		var _g = 0;
		var _g1 = Reflect.fields(this.catGetters);
		while(_g < _g1.length) {
			var key = _g1[_g];
			++_g;
			var value = this.catGetters[key].map(function(f) {
				return f(p);
			});
			out[key] = value;
		}
		return out;
	}
	,__class__: app_io_IoButton
});
var app_io_IoLoad = function(_name,_append,verb) {
	if(verb == null) verb = "items";
	app_io_IoButton.call(this);
	this.verb = verb;
	this.name = _name;
	this.append = _append;
	this.set_style(_append?5:3);
	this.set_text(_append?this.enText = "Append":this.enText = "Load");
	dom_NodeTools.setTooltip(this,_append?"Appends " + verb + " from a previously\nsaved Terrasavr file to ones here.":"Replaces " + verb + " by ones from\na previously saved Terrasavr file.");
	this.onClick = $bind(this,this.onLoad);
	if(app_io_IoLoad.frLoad == null) {
		app_io_IoLoad.frLoad = new openfl_net_FileReference();
		app_io_IoLoad.fxLoad = [new openfl_net_FileFilter("Terrasavr item files (*.json;*.tsr)","*.json;*.tsr"),new openfl_net_FileFilter("All files (*.*)","*.*")];
		app_io_IoLoad.frLoad.addEventListener("select",function(_) {
			app_io_IoLoad.frLoad.load();
		});
		app_io_IoLoad.frLoad.addEventListener("complete",function(e) {
			var data = e.get_target().data;
			app_io_IoLoad.foLoad.onData(data);
		});
	}
};
$hxClasses["app.io.IoLoad"] = app_io_IoLoad;
app_io_IoLoad.__name__ = ["app","io","IoLoad"];
app_io_IoLoad.__super__ = app_io_IoButton;
app_io_IoLoad.prototype = $extend(app_io_IoButton.prototype,{
	onLoad: function(_) {
		app_io_IoLoad.foLoad = this;
		app_io_IoLoad.frLoad.browse(app_io_IoLoad.fxLoad);
	}
	,reject: function() {
		app_TopPane.inst.print("Specified file isn't a Terrasavr items file.",3);
	}
	,onBinaryData: function(d) {
		if(d.length < 12 || d.readUTFBytes(12) != "/terrasavr/i") {
			this.reject();
			return;
		}
		var v = d.readInt();
		var slots = this.getAllSlots(this.m.player);
		if(!this.append) {
			var _g = 0;
			while(_g < slots.length) {
				var slot = slots[_g];
				++_g;
				slot.clear();
			}
		}
		var _g1 = 0;
		var _g2 = slots.length;
		while(_g1 < _g2) {
			var i = _g1++;
			try {
				if(d.length - d.position < 4) break;
				var quantity;
				var prefix;
				var code = null;
				var id = d.readInt();
				if(id != 0) {
					if(id == 2147483647) code = d.readUTF();
					quantity = d.readInt();
					prefix = d.data.getUint8(d.position++);
				} else quantity = prefix = 0;
				var target;
				if(this.append) {
					target = null;
					var _g21 = 0;
					while(_g21 < slots.length) {
						var slot1 = slots[_g21];
						++_g21;
						if(slot1.isEmpty()) {
							target = slot1;
							break;
						}
					}
				} else target = slots[i];
				if(target == null) break;
				var item;
				if(code != null) item = terra_Item.fromCode(code); else item = terra_Item.fromId(id);
				target.item = item;
				if(target.multi) target.count = quantity; else if(item != null) target.count = 1; else target.count = 0;
				target.prefix = prefix;
			} catch( x ) {
				if (x instanceof js__$Boot_HaxeError) x = x.val;
				break;
			}
		}
	}
	,onJsonData: function(obj) {
		if(obj.resourceType != "TerrasavrItems") {
			this.reject();
			return;
		}
		var cats = this.getCatSlots(this.m.player);
		var _g = 0;
		var _g1 = Reflect.fields(cats);
		while(_g < _g1.length) {
			var key = _g1[_g];
			++_g;
			var slots = cats[key];
			app_io_JsonHelper.procItems(slots,false,obj[key]);
		}
	}
	,onData: function(d) {
		d.position = 0;
		try {
			var _g = d.data.getUint8(d.position++);
			switch(_g) {
			case 123:
				d.position = 0;
				try {
					var obj = JSON.parse(d.readUTFBytes(d.length));
					this.onJsonData(obj);
				} catch( e ) {
					if (e instanceof js__$Boot_HaxeError) e = e.val;
					this.reject();
				}
				break;
			case 47:
				d.position = 0;
				this.onBinaryData(d);
				break;
			case 239:
				if(d.data.getUint8(d.position++) == 187) {
					if(d.data.getUint8(d.position++) == 191) {
						var obj1 = JSON.parse(d.readUTFBytes(d.length - d.position));
						this.onJsonData(obj1);
					} else this.reject();
				} else this.reject();
				break;
			default:
				this.reject();
			}
		} catch( x ) {
			if (x instanceof js__$Boot_HaxeError) x = x.val;
			app_TopPane.inst.print("Error loading the file: " + Std.string(x),3);
		}
	}
	,__class__: app_io_IoLoad
});
var app_io_IoLib = function() {
	app_io_IoLoad.call(this,"Lib",false);
	this.set_style(8);
	this.set_text(this.enText = "Library");
	this.tooltipText = "Allows to load a previously\nsaved set of items as a 'library'";
};
$hxClasses["app.io.IoLib"] = app_io_IoLib;
app_io_IoLib.__name__ = ["app","io","IoLib"];
app_io_IoLib.__super__ = app_io_IoLoad;
app_io_IoLib.prototype = $extend(app_io_IoLoad.prototype,{
	onData: function(d) {
		app_io_IoLoad.prototype.onData.call(this,d);
		var shelf = app_TabShelf.get_inst();
		d.position = 0;
		if(d.length < 12 || d.readUTFBytes(12) != "/terrasavr/i") {
			app_TopPane.inst.print("Specified file isn't a Terrasavr item file.",3);
			return;
		}
		var ver = d.readInt();
		var items = shelf.items;
		var i;
		var n = items.length;
		i = -1;
		while(++i < n) {
			var id;
			var qt;
			var db;
			var code = null;
			if(d.length - d.position >= 4) try {
				id = d.readInt();
				if(id != 0) {
					if(id == 2147483647) code = d.readUTF();
					qt = d.readInt();
					db = d.data.getUint8(d.position++);
				} else qt = db = 0;
			} catch( e ) {
				if (e instanceof js__$Boot_HaxeError) e = e.val;
				id = qt = db = 0;
			} else id = qt = db = 0;
			var item = items[i];
			item.set_id(code != null?terra_Item.fromCode(code):terra_Item.fromId(id));
			item.set_count(qt);
			item.set_prefix(db);
		}
	}
	,__class__: app_io_IoLib
});
var app_io_IoLoadResearch = function(_name,_append,verb) {
	app_io_IoLoad.call(this,_name,_append,verb);
};
$hxClasses["app.io.IoLoadResearch"] = app_io_IoLoadResearch;
app_io_IoLoadResearch.__name__ = ["app","io","IoLoadResearch"];
app_io_IoLoadResearch.__super__ = app_io_IoLoad;
app_io_IoLoadResearch.prototype = $extend(app_io_IoLoad.prototype,{
	reject: function() {
		app_io_IoLoad.prototype.reject.call(this);
	}
	,onBinaryData: function(d) {
		if(d.length < app_io_IoLoadResearch.prefixLen + 8 || d.readUTFBytes(app_io_IoLoadResearch.prefixLen) != app_io_IoLoadResearch.prefix) {
			app_TopPane.inst.print("Specified file isn't a Terrasavr item file.",3);
			return;
		}
		var ver = d.readInt();
		var resCount = d.readInt();
		var research = this.m.player.researchSlots;
		research.splice(0,research.length);
		var pid;
		var found;
		var _g = 0;
		while(_g < resCount) {
			var i = _g++;
			pid = utils_ByteArrayTools.readSharpString(d);
			found = d.readInt();
			var id = terra_Item.pid2id.get(pid);
			if(id != null) {
				var slot = new terra_Slot();
				slot.item = terra_Item.idMap.h[id];
				slot.count = found;
				research.push(slot);
			}
		}
		app_TopPane.inst.tabResearch.syncPage();
	}
	,onJsonData: function(obj) {
		if(obj.resourceType != "TerrasavrResearch") {
			this.reject();
			return;
		}
		var arr = obj.research;
		var research = this.m.player.researchSlots;
		research.splice(0,research.length);
		var _g = 0;
		while(_g < arr.length) {
			var pair = arr[_g];
			++_g;
			var slot = new terra_Slot();
			var key = pair.id;
			slot.item = terra_Item.idMap.h[key];
			slot.count = pair.count;
			research.push(slot);
		}
		app_TopPane.inst.tabResearch.syncPage();
	}
	,__class__: app_io_IoLoadResearch
});
var app_io_IoSave = function(_name,verb) {
	if(verb == null) verb = "items";
	app_io_IoButton.call(this);
	this.verb = verb;
	this.set_text(this.enText = "Save");
	this.set_style(4);
	this.name = _name;
	this.onClick = $bind(this,this.onSave);
	this.tooltipText = this.tooltipEnText = "Saves a set of items for later use." + "\nThis is for Terrasavr, not Terraria!";
};
$hxClasses["app.io.IoSave"] = app_io_IoSave;
app_io_IoSave.__name__ = ["app","io","IoSave"];
app_io_IoSave.__super__ = app_io_IoButton;
app_io_IoSave.prototype = $extend(app_io_IoButton.prototype,{
	onSave: function(_) {
		var d = new openfl_utils_ByteArray();
		var cats = this.getCatSlots(this.m.player);
		var obj = { };
		obj.resourceType = "TerrasavrItems";
		obj.resourceVersion = "1.0";
		obj.gameVersion = this.m.player.invVersion;
		var _g = 0;
		var _g1 = Reflect.fields(cats);
		while(_g < _g1.length) {
			var key = _g1[_g];
			++_g;
			var value = app_io_JsonHelper.procItems(cats[key],true,null);
			obj[key] = value;
		}
		d.writeUTFBytes(JSON.stringify(obj,null,"\t"));
		d.set_length(d.position);
		app_TopPane.inst.frSave.save(d,"" + this.name + ".json");
	}
	,__class__: app_io_IoSave
});
var app_io_IoSaveResearch = function(_name,verb) {
	app_io_IoSave.call(this,_name,verb);
};
$hxClasses["app.io.IoSaveResearch"] = app_io_IoSaveResearch;
app_io_IoSaveResearch.__name__ = ["app","io","IoSaveResearch"];
app_io_IoSaveResearch.__super__ = app_io_IoSave;
app_io_IoSaveResearch.prototype = $extend(app_io_IoSave.prototype,{
	onSave: function(_) {
		var slots = this.m.player.researchSlots;
		var d = new openfl_utils_ByteArray();
		var obj = { };
		obj.resourceType = "TerrasavrResearch";
		obj.resourceVersion = "1.0";
		var resArr = [];
		obj.research = resArr;
		var _g = 0;
		while(_g < slots.length) {
			var slot = slots[_g];
			++_g;
			if(slot.item == null || slot.item.id == 0) continue;
			var res = { };
			res.id = slot.item.id;
			res.count = slot.count;
			resArr.push(res);
		}
		d.writeUTFBytes(JSON.stringify(obj,null,"\t"));
		d.set_length(d.position);
		app_TopPane.inst.frSave.save(d,"research.json");
	}
	,__class__: app_io_IoSaveResearch
});
var app_io_JsonHelper = function() { };
$hxClasses["app.io.JsonHelper"] = app_io_JsonHelper;
app_io_JsonHelper.__name__ = ["app","io","JsonHelper"];
app_io_JsonHelper.procItem = function(slot,out,item) {
	if(out) {
		if(slot.isEmpty()) return null;
		item = { };
		item.id = slot.item.id;
		if(slot.multi) item.count = slot.count;
		item.prefix = slot.prefix;
		if(slot.favFlagMinVersion > 0) item.isFavorited = slot.isFavorited;
		return item;
	}
	if(item == null) {
		slot.clear();
		return null;
	}
	slot.item = terra_Item.fromId(item.id);
	if(slot.multi) slot.count = item.count;
	slot.prefix = item.prefix;
	if(slot.favFlagMinVersion > 0) slot.isFavorited = item.isFavorited;
	return item;
};
app_io_JsonHelper.procItems = function(slots,out,items) {
	if(items == null) items = [];
	if(out) return slots.map(function(slot) {
		return app_io_JsonHelper.procItem(slot,true,null);
	}); else {
		var _g1 = 0;
		var _g = slots.length;
		while(_g1 < _g) {
			var i = _g1++;
			app_io_JsonHelper.procItem(slots[i],false,items[i]);
		}
		return items;
	}
};
var dom_ButtonConfirm = function() {
	this.isWaiting = false;
	dom_Button.call(this);
};
$hxClasses["dom.ButtonConfirm"] = dom_ButtonConfirm;
dom_ButtonConfirm.__name__ = ["dom","ButtonConfirm"];
dom_ButtonConfirm.__super__ = dom_Button;
dom_ButtonConfirm.prototype = $extend(dom_Button.prototype,{
	click: function() {
		var _g = this;
		if(this.isWaiting) {
			if(this.onClick != null) this.onClick(this);
			_g.set_text(_g.oldText);
			_g.set_style(_g.oldStyle);
			_g.isWaiting = false;
		} else {
			this.oldText = this.text;
			this.oldStyle = this.style;
			this.set_text(dom_ButtonConfirm.confirmText);
			this.set_style(1);
			this.isWaiting = true;
			haxe_Timer.delay(function() {
				_g.set_text(_g.oldText);
				_g.set_style(_g.oldStyle);
				_g.isWaiting = false;
			},3000);
		}
	}
	,__class__: dom_ButtonConfirm
});
var dom_Checkbox = function() {
	this.hovering = false;
	this.active = true;
	this.format = "";
	this.value = false;
	dom_Label.call(this);
	this.set_text("[ ]");
};
$hxClasses["dom.Checkbox"] = dom_Checkbox;
dom_Checkbox.__name__ = ["dom","Checkbox"];
dom_Checkbox.__super__ = dom_Label;
dom_Checkbox.prototype = $extend(dom_Label.prototype,{
	locFormatTooltip: function(cat,key) {
		this.set_format(Lang.loc(cat,key,this.enText));
		this.tooltipText = Lang.ttip(cat,key,this.tooltipEnText);
	}
	,change: function() {
		this.set_text("[" + (this.value?"x":String.fromCharCode(8196)) + "] " + this.format);
	}
	,hover: function(u,v) {
		this.hovering = this.active && this.hitTest(u,v) == this;
	}
	,render: function(u,v) {
		var a;
		if(this.active) {
			if(this.hovering) a = 0.7; else a = 1.0;
		} else a = 0.3;
		if(this.checkBMFont()) this.m.draw(this.cache,u + this.x - this.ofs_x - this.pad,v + this.y - this.ofs_y - this.pad,a); else {
			var _x = u + this.x;
			var _y = v + this.y;
			var ctx = this.m.context;
			ctx.save();
			ctx.font = dom_Label.canvasFont;
			if(this.halign == 2) ctx.textAlign = "right"; else if(this.halign == 1) ctx.textAlign = "center"; else ctx.textAlign = "left";
			if(this.valign == 2) ctx.textBaseline = "bottom"; else if(this.valign == 1) ctx.textBaseline = "middle"; else ctx.textBaseline = "top";
			var _shadowColor = ctx.shadowColor;
			ctx.shadowColor = "black";
			ctx.fillStyle = this.m.fontFillColors[this.style - 1];
			ctx.strokeStyle = "black";
			ctx.lineWidth = 1;
			if(a != null) ctx.globalAlpha = a;
			var first = true;
			var _g = 0;
			var _g1 = this.textLines;
			while(_g < _g1.length) {
				var line = _g1[_g];
				++_g;
				var dx = 0.;
				if(first) {
					if(StringTools.startsWith(line,"[" + " ")) {
						line = line.substring(2);
						ctx.shadowBlur = 4;
						ctx.strokeText("[",_x + dx,_y + 2 * (1 - this.valign));
						ctx.shadowBlur = 0;
						ctx.fillText("[",_x + dx,_y + 2 * (1 - this.valign));
						dx = ctx.measureText("[x").width;
					}
					first = false;
				}
				ctx.shadowBlur = 4;
				ctx.strokeText(line,_x + dx,_y + 2 * (1 - this.valign));
				ctx.shadowBlur = 0;
				ctx.fillText(line,_x + dx,_y + 2 * (1 - this.valign));
				_y += dom_Label.canvasLineHeight;
			}
			ctx.restore();
		}
	}
	,click: function() {
		if(this.active) this.set_value(!this.value);
	}
	,set_value: function(v) {
		if(this.value != v) {
			this.value = v;
			if(this.onChange != null) this.onChange(v);
			this.change();
		}
		return v;
	}
	,set_format: function(v) {
		if(this.format != v) {
			this.format = v;
			this.change();
		}
		return v;
	}
	,__class__: dom_Checkbox
});
var dom_VoidField = function() {
	this.active = true;
	this.hovering = false;
	this.editing = false;
	this._value = "";
	this.format = "$";
	dom_Label.call(this);
};
$hxClasses["dom.VoidField"] = dom_VoidField;
dom_VoidField.__name__ = ["dom","VoidField"];
dom_VoidField.setup = function() {
	dom_VoidField.field = new openfl_text_TextField();
	dom_VoidField.field.set_x(dom_VoidField.field.set_y(-9001));
	dom_VoidField.field.get_defaultTextFormat().color = 16777215;
	dom_VoidField.field.set_height(20);
	dom_VoidField.field.set_multiline(false);
	dom_VoidField.field.set_type("INPUT");
	openfl_Lib.get_current().addChild(dom_VoidField.field);
};
dom_VoidField.__super__ = dom_Label;
dom_VoidField.prototype = $extend(dom_Label.prototype,{
	update: function(dt) {
		if(this.editing) this.set__value(dom_VoidField.field.get_text());
	}
	,hover: function(u,v) {
		this.hovering = this.active && this.hitTest(u,v) == this;
	}
	,change: function() {
		if(this.onChange != null) this.onChange(this._value);
	}
	,finish: function() {
	}
	,render: function(u,v) {
		var _g = this;
		var so;
		var s0 = 0;
		var s1 = 0;
		var bmf = this.checkBMFont();
		if(this.editing) {
			so = this.format.indexOf("$");
			s0 = dom_VoidField.field.get_selectionBeginIndex() + so;
			s1 = dom_VoidField.field.get_selectionEndIndex() + so;
			if(s0 != s1) {
				if(bmf) this.font.select(this.text,s0,s1,u + this.x,v + this.y,this.halign,this.valign,function(l,r,t) {
					_g.m.xrect(l,t,r - l,_g.font.lineHeight,4247807,0.5);
				}); else {
					var l1 = u + this.x + this.m.textWidth(this.text.substring(0,s0));
					var w = this.m.textWidth(this.text.substring(s0,s1));
					this.m.xrect(l1,v + this.y - 2,w,dom_Label.canvasLineHeight,4247807,0.5);
				}
			}
		}
		var a;
		if(this.active) {
			if(this.hovering) a = 0.7; else a = 1.0;
		} else a = 0.3;
		if(bmf) this.m.draw(this.cache,u + this.x - this.ofs_x - this.pad,v + this.y - this.ofs_y - this.pad,a); else this.m.blitText(this.textLines,u + this.x,v + this.y,this.halign,this.valign,this.style,a);
		if(this.editing && this.m.time % 1.4 > 0.7) {
			if(bmf) this.font.select(this.text,s1,s1,u + this.x,v + this.y,this.halign,this.valign,function(l2,r1,t1) {
				_g.m.rect(r1,t1,1,_g.font.lineHeight,16777215);
			}); else {
				var r2 = u + this.x + this.m.textWidth(this.text.substring(0,s1));
				this.m.rect(r2,v + this.y - 2,1,this.font.lineHeight,16777215);
			}
		}
	}
	,onBlur: function(_) {
		dom_VoidField.field.removeEventListener("blur",$bind(this,this.onBlur));
		dom_VoidField.field.removeEventListener("keydown",$bind(this,this.onEditKey));
		this.finish();
		this.editing = false;
	}
	,onEditKey: function(_) {
		if(_.keyCode == 13) this.onBlur(null);
	}
	,click: function() {
		if(!this.editing) {
			this.editing = true;
			if(dom_VoidField.field == null) dom_VoidField.setup();
			dom_VoidField.field.addEventListener("keydown",$bind(this,this.onEditKey));
			dom_VoidField.field.addEventListener("blur",$bind(this,this.onBlur));
			dom_VoidField.field.set_text(this._value);
			dom_VoidField.field.setSelection(0,this._value.length);
			openfl_Lib.get_current().get_stage().set_focus(dom_VoidField.field);
		}
	}
	,set_format: function(v) {
		if(this.format != v) {
			this.format = v;
			this.set_text(StringTools.replace(this.format,"$",this._value));
			this.change();
		}
		return v;
	}
	,set__value: function(v) {
		if(this._value != v) {
			this._value = v;
			this.set_text(StringTools.replace(this.format,"$",this._value));
			this.change();
		}
		return v;
	}
	,__class__: dom_VoidField
});
var dom_HexField = function() {
	dom_VoidField.call(this);
	this._ivalue = -1;
	this.set_value(0);
};
$hxClasses["dom.HexField"] = dom_HexField;
dom_HexField.__name__ = ["dom","HexField"];
dom_HexField.__super__ = dom_VoidField;
dom_HexField.prototype = $extend(dom_VoidField.prototype,{
	get_value: function() {
		return this._ivalue;
	}
	,set_value: function(v) {
		if(this._ivalue != v) {
			this._ivalue = v;
			this.set__value(StringTools.hex(this._ivalue,6));
		}
		return v;
	}
	,finish: function() {
		var q = Std.parseInt("0x" + this._value);
		if(q != null && (this.onVerify == null || this.onVerify(q))) this._ivalue = q;
		this.set__value(StringTools.hex(this._ivalue,6));
		if(this.onFinish != null) this.onFinish(this._ivalue);
	}
	,__class__: dom_HexField
});
var dom_ColorField = function() {
	dom_HexField.call(this);
};
$hxClasses["dom.ColorField"] = dom_ColorField;
dom_ColorField.__name__ = ["dom","ColorField"];
dom_ColorField.__super__ = dom_HexField;
dom_ColorField.prototype = $extend(dom_HexField.prototype,{
	hitTest: function(u,v) {
		return dom_HexField.prototype.hitTest.call(this,u - 20,v);
	}
	,render: function(u,v) {
		this.m.rect(u + this.x + 2,v + this.y + 2,16,16,3355443);
		this.m.rect(u + this.x + 2,v + this.y + 2,16,16,this.get_value());
		dom_HexField.prototype.render.call(this,u + 20,v);
	}
	,__class__: dom_ColorField
});
var dom_FloatField = function() {
	this.precision = 0;
	dom_VoidField.call(this);
	this._ivalue = -1;
	this.set_value(0);
};
$hxClasses["dom.FloatField"] = dom_FloatField;
dom_FloatField.__name__ = ["dom","FloatField"];
dom_FloatField.__super__ = dom_VoidField;
dom_FloatField.prototype = $extend(dom_VoidField.prototype,{
	set_value: function(v) {
		if(this._ivalue != v) {
			this._ivalue = v;
			if(this.precision > 0) {
				if(this._ivalue % 1 >= Math.pow(10,-this.precision)) this.set__value(this._ivalue.toFixed(this.precision)); else this.set__value("" + (this._ivalue | 0));
			} else this.set__value("" + this._ivalue);
		}
		return v;
	}
	,finish: function() {
		var q = parseFloat(this._value);
		if(!isNaN(q) && (this.onVerify == null || this.onVerify(q))) this._ivalue = q;
		this.set__value("" + this._ivalue);
		if(this.onFinish != null) this.onFinish(this._ivalue);
	}
	,__class__: dom_FloatField
});
var dom_IntField = function() {
	dom_VoidField.call(this);
	this._ivalue = -1;
	this.set_value(0);
};
$hxClasses["dom.IntField"] = dom_IntField;
dom_IntField.__name__ = ["dom","IntField"];
dom_IntField.__super__ = dom_VoidField;
dom_IntField.prototype = $extend(dom_VoidField.prototype,{
	get_value: function() {
		return this._ivalue;
	}
	,set_value: function(v) {
		if(this._ivalue != v) {
			this._ivalue = v;
			this.set__value("" + this._ivalue);
		}
		return v;
	}
	,finish: function() {
		var q = Std.parseInt(this._value);
		if(q != null && (this.onVerify == null || this.onVerify(q))) this._ivalue = q;
		this.set__value("" + this._ivalue);
		if(this.onFinish != null) this.onFinish(this._ivalue);
	}
	,__class__: dom_IntField
});
var dom_Link = function(text,href) {
	this.enabled = true;
	dom_Button.call(this);
	this.anchor = new openfl_display_Anchor(href,"_blank");
	this.anchor.component.style.zIndex = "100";
	this.set_text(text);
	this.block = new openfl_display_RoundRect(this.width,this.height,0);
	this.anchor.addChild(this.block);
};
$hxClasses["dom.Link"] = dom_Link;
dom_Link.__name__ = ["dom","Link"];
dom_Link.__super__ = dom_Button;
dom_Link.prototype = $extend(dom_Button.prototype,{
	set_enabled: function(b) {
		if(this.enabled != b) {
			this.enabled = b;
			if(!b && this.anchor.parent != null) this.anchor.parent.removeChild(this.anchor);
		}
		return b;
	}
	,render: function(u,v) {
		dom_Button.prototype.render.call(this,u,v);
		if(this.enabled && this.anchor.parent == null) Main._main.addChild(this.anchor);
		this.anchor.set_x(u + this.x - this.ofs_x);
		this.anchor.set_y(v + this.y - this.ofs_y);
		this.block.set_width(this.width);
		this.block.set_height(this.height);
	}
	,__class__: dom_Link
});
var dom_NodeTools = function() { };
$hxClasses["dom.NodeTools"] = dom_NodeTools;
dom_NodeTools.__name__ = ["dom","NodeTools"];
dom_NodeTools.setTooltip = function(self,text,icon) {
	if(icon == null) icon = 0;
	self.tooltipText = text;
	self.tooltipEnText = text;
	self.tooltipIcon = icon;
	return self;
};
dom_NodeTools.setTtIcon = function(self,icon) {
	self.tooltipText = "";
	self.tooltipIcon = icon;
	return self;
};
var dom_StringField = function() {
	dom_VoidField.call(this);
};
$hxClasses["dom.StringField"] = dom_StringField;
dom_StringField.__name__ = ["dom","StringField"];
dom_StringField.__super__ = dom_VoidField;
dom_StringField.prototype = $extend(dom_VoidField.prototype,{
	finish: function() {
		if(this.onFinish != null) this.onFinish(this._value);
	}
	,get_value: function() {
		return this._value;
	}
	,set_value: function(v) {
		return this.set__value(v);
	}
	,__class__: dom_StringField
});
var dom_TinyIcon = function(item) {
	dom_Node.call(this);
	this.item = item;
};
$hxClasses["dom.TinyIcon"] = dom_TinyIcon;
dom_TinyIcon.__name__ = ["dom","TinyIcon"];
dom_TinyIcon.__super__ = dom_Node;
dom_TinyIcon.prototype = $extend(dom_Node.prototype,{
	render: function(u,v) {
		this.m.context.drawImage(this.m.imgItems,(this.item & 31) * 40,(this.item >> 5) * 40,40,40,u + this.x,v + this.y,20,20);
	}
	,__class__: dom_TinyIcon
});
var haxe_IMap = function() { };
$hxClasses["haxe.IMap"] = haxe_IMap;
haxe_IMap.__name__ = ["haxe","IMap"];
var haxe__$Int64__$_$_$Int64 = function(high,low) {
	this.high = high;
	this.low = low;
};
$hxClasses["haxe._Int64.___Int64"] = haxe__$Int64__$_$_$Int64;
haxe__$Int64__$_$_$Int64.__name__ = ["haxe","_Int64","___Int64"];
haxe__$Int64__$_$_$Int64.prototype = {
	__class__: haxe__$Int64__$_$_$Int64
};
var haxe_Resource = function() { };
$hxClasses["haxe.Resource"] = haxe_Resource;
haxe_Resource.__name__ = ["haxe","Resource"];
haxe_Resource.listNames = function() {
	var _g = [];
	var _g1 = 0;
	var _g2 = haxe_Resource.content;
	while(_g1 < _g2.length) {
		var x = _g2[_g1];
		++_g1;
		_g.push(x.name);
	}
	return _g;
};
var haxe_Timer = function(time_ms) {
	var me = this;
	this.id = setInterval(function() {
		me.run();
	},time_ms);
};
$hxClasses["haxe.Timer"] = haxe_Timer;
haxe_Timer.__name__ = ["haxe","Timer"];
haxe_Timer.delay = function(f,time_ms) {
	var t = new haxe_Timer(time_ms);
	t.run = function() {
		t.stop();
		f();
	};
	return t;
};
haxe_Timer.prototype = {
	stop: function() {
		if(this.id == null) return;
		clearInterval(this.id);
		this.id = null;
	}
	,run: function() {
	}
	,__class__: haxe_Timer
};
var haxe_crypto_Adler32 = function() {
	this.a1 = 1;
	this.a2 = 0;
};
$hxClasses["haxe.crypto.Adler32"] = haxe_crypto_Adler32;
haxe_crypto_Adler32.__name__ = ["haxe","crypto","Adler32"];
haxe_crypto_Adler32.read = function(i) {
	var a = new haxe_crypto_Adler32();
	var a2a = i.readByte();
	var a2b = i.readByte();
	var a1a = i.readByte();
	var a1b = i.readByte();
	a.a1 = a1a << 8 | a1b;
	a.a2 = a2a << 8 | a2b;
	return a;
};
haxe_crypto_Adler32.prototype = {
	update: function(b,pos,len) {
		var a1 = this.a1;
		var a2 = this.a2;
		var _g1 = pos;
		var _g = pos + len;
		while(_g1 < _g) {
			var p = _g1++;
			var c = b.b[p];
			a1 = (a1 + c) % 65521;
			a2 = (a2 + a1) % 65521;
		}
		this.a1 = a1;
		this.a2 = a2;
	}
	,equals: function(a) {
		return a.a1 == this.a1 && a.a2 == this.a2;
	}
	,__class__: haxe_crypto_Adler32
};
var haxe_io_Bytes = function(data) {
	this.length = data.byteLength;
	this.b = new Uint8Array(data);
	this.b.bufferValue = data;
	data.hxBytes = this;
	data.bytes = this.b;
};
$hxClasses["haxe.io.Bytes"] = haxe_io_Bytes;
haxe_io_Bytes.__name__ = ["haxe","io","Bytes"];
haxe_io_Bytes.alloc = function(length) {
	return new haxe_io_Bytes(new ArrayBuffer(length));
};
haxe_io_Bytes.ofData = function(b) {
	var hb = b.hxBytes;
	if(hb != null) return hb;
	return new haxe_io_Bytes(b);
};
haxe_io_Bytes.prototype = {
	blit: function(pos,src,srcpos,len) {
		if(pos < 0 || srcpos < 0 || len < 0 || pos + len > this.length || srcpos + len > src.length) throw new js__$Boot_HaxeError(haxe_io_Error.OutsideBounds);
		if(srcpos == 0 && len == src.length) this.b.set(src.b,pos); else this.b.set(src.b.subarray(srcpos,srcpos + len),pos);
	}
	,getString: function(pos,len) {
		if(pos < 0 || len < 0 || pos + len > this.length) throw new js__$Boot_HaxeError(haxe_io_Error.OutsideBounds);
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
				var c21 = b[i++];
				var c3 = b[i++];
				var u = (c & 15) << 18 | (c21 & 127) << 12 | (c3 & 127) << 6 | b[i++] & 127;
				s += fcc((u >> 10) + 55232);
				s += fcc(u & 1023 | 56320);
			}
		}
		return s;
	}
	,toString: function() {
		return this.getString(0,this.length);
	}
	,__class__: haxe_io_Bytes
};
var haxe_ds_IntMap = function() {
	this.h = { };
};
$hxClasses["haxe.ds.IntMap"] = haxe_ds_IntMap;
haxe_ds_IntMap.__name__ = ["haxe","ds","IntMap"];
haxe_ds_IntMap.__interfaces__ = [haxe_IMap];
haxe_ds_IntMap.prototype = {
	__class__: haxe_ds_IntMap
};
var haxe_ds_ObjectMap = function() {
	this.h = { };
	this.h.__keys__ = { };
};
$hxClasses["haxe.ds.ObjectMap"] = haxe_ds_ObjectMap;
haxe_ds_ObjectMap.__name__ = ["haxe","ds","ObjectMap"];
haxe_ds_ObjectMap.__interfaces__ = [haxe_IMap];
haxe_ds_ObjectMap.prototype = {
	set: function(key,value) {
		var id = key.__id__ || (key.__id__ = ++haxe_ds_ObjectMap.count);
		this.h[id] = value;
		this.h.__keys__[id] = key;
	}
	,remove: function(key) {
		var id = key.__id__;
		if(this.h.__keys__[id] == null) return false;
		delete(this.h[id]);
		delete(this.h.__keys__[id]);
		return true;
	}
	,__class__: haxe_ds_ObjectMap
};
var haxe_ds_StringMap = function() {
	this.h = { };
};
$hxClasses["haxe.ds.StringMap"] = haxe_ds_StringMap;
haxe_ds_StringMap.__name__ = ["haxe","ds","StringMap"];
haxe_ds_StringMap.__interfaces__ = [haxe_IMap];
haxe_ds_StringMap.prototype = {
	set: function(key,value) {
		if(__map_reserved[key] != null) this.setReserved(key,value); else this.h[key] = value;
	}
	,get: function(key) {
		if(__map_reserved[key] != null) return this.getReserved(key);
		return this.h[key];
	}
	,exists: function(key) {
		if(__map_reserved[key] != null) return this.existsReserved(key);
		return this.h.hasOwnProperty(key);
	}
	,setReserved: function(key,value) {
		if(this.rh == null) this.rh = { };
		this.rh["$" + key] = value;
	}
	,getReserved: function(key) {
		if(this.rh == null) return null; else return this.rh["$" + key];
	}
	,existsReserved: function(key) {
		if(this.rh == null) return false;
		return this.rh.hasOwnProperty("$" + key);
	}
	,remove: function(key) {
		if(__map_reserved[key] != null) {
			key = "$" + key;
			if(this.rh == null || !this.rh.hasOwnProperty(key)) return false;
			delete(this.rh[key]);
			return true;
		} else {
			if(!this.h.hasOwnProperty(key)) return false;
			delete(this.h[key]);
			return true;
		}
	}
	,keys: function() {
		var _this = this.arrayKeys();
		return HxOverrides.iter(_this);
	}
	,arrayKeys: function() {
		var out = [];
		for( var key in this.h ) {
		if(this.h.hasOwnProperty(key)) out.push(key);
		}
		if(this.rh != null) {
			for( var key in this.rh ) {
			if(key.charCodeAt(0) == 36) out.push(key.substr(1));
			}
		}
		return out;
	}
	,__class__: haxe_ds_StringMap
};
var haxe_io_BytesBuffer = function() {
	this.b = [];
};
$hxClasses["haxe.io.BytesBuffer"] = haxe_io_BytesBuffer;
haxe_io_BytesBuffer.__name__ = ["haxe","io","BytesBuffer"];
haxe_io_BytesBuffer.prototype = {
	add: function(src) {
		var b1 = this.b;
		var b2 = src.b;
		var _g1 = 0;
		var _g = src.length;
		while(_g1 < _g) {
			var i = _g1++;
			this.b.push(b2[i]);
		}
	}
	,addBytes: function(src,pos,len) {
		if(pos < 0 || len < 0 || pos + len > src.length) throw new js__$Boot_HaxeError(haxe_io_Error.OutsideBounds);
		var b1 = this.b;
		var b2 = src.b;
		var _g1 = pos;
		var _g = pos + len;
		while(_g1 < _g) {
			var i = _g1++;
			this.b.push(b2[i]);
		}
	}
	,getBytes: function() {
		var bytes = new haxe_io_Bytes(new Uint8Array(this.b).buffer);
		this.b = null;
		return bytes;
	}
	,__class__: haxe_io_BytesBuffer
};
var haxe_io_Input = function() { };
$hxClasses["haxe.io.Input"] = haxe_io_Input;
haxe_io_Input.__name__ = ["haxe","io","Input"];
haxe_io_Input.prototype = {
	readByte: function() {
		throw new js__$Boot_HaxeError("Not implemented");
	}
	,readBytes: function(s,pos,len) {
		var k = len;
		var b = s.b;
		if(pos < 0 || len < 0 || pos + len > s.length) throw new js__$Boot_HaxeError(haxe_io_Error.OutsideBounds);
		while(k > 0) {
			b[pos] = this.readByte();
			pos++;
			k--;
		}
		return len;
	}
	,readFullBytes: function(s,pos,len) {
		while(len > 0) {
			var k = this.readBytes(s,pos,len);
			pos += k;
			len -= k;
		}
	}
	,read: function(nbytes) {
		var s = haxe_io_Bytes.alloc(nbytes);
		var p = 0;
		while(nbytes > 0) {
			var k = this.readBytes(s,p,nbytes);
			if(k == 0) throw new js__$Boot_HaxeError(haxe_io_Error.Blocked);
			p += k;
			nbytes -= k;
		}
		return s;
	}
	,readInt16: function() {
		var ch1 = this.readByte();
		var ch2 = this.readByte();
		var n;
		if(this.bigEndian) n = ch2 | ch1 << 8; else n = ch1 | ch2 << 8;
		if((n & 32768) != 0) return n - 65536;
		return n;
	}
	,readUInt16: function() {
		var ch1 = this.readByte();
		var ch2 = this.readByte();
		if(this.bigEndian) return ch2 | ch1 << 8; else return ch1 | ch2 << 8;
	}
	,readInt32: function() {
		var ch1 = this.readByte();
		var ch2 = this.readByte();
		var ch3 = this.readByte();
		var ch4 = this.readByte();
		if(this.bigEndian) return ch4 | ch3 << 8 | ch2 << 16 | ch1 << 24; else return ch1 | ch2 << 8 | ch3 << 16 | ch4 << 24;
	}
	,readString: function(len) {
		var b = haxe_io_Bytes.alloc(len);
		this.readFullBytes(b,0,len);
		return b.toString();
	}
	,__class__: haxe_io_Input
};
var haxe_io_BytesInput = function(b,pos,len) {
	if(pos == null) pos = 0;
	if(len == null) len = b.length - pos;
	if(pos < 0 || len < 0 || pos + len > b.length) throw new js__$Boot_HaxeError(haxe_io_Error.OutsideBounds);
	this.b = b.b;
	this.pos = pos;
	this.len = len;
	this.totlen = len;
};
$hxClasses["haxe.io.BytesInput"] = haxe_io_BytesInput;
haxe_io_BytesInput.__name__ = ["haxe","io","BytesInput"];
haxe_io_BytesInput.__super__ = haxe_io_Input;
haxe_io_BytesInput.prototype = $extend(haxe_io_Input.prototype,{
	readByte: function() {
		if(this.len == 0) throw new js__$Boot_HaxeError(new haxe_io_Eof());
		this.len--;
		return this.b[this.pos++];
	}
	,readBytes: function(buf,pos,len) {
		if(pos < 0 || len < 0 || pos + len > buf.length) throw new js__$Boot_HaxeError(haxe_io_Error.OutsideBounds);
		if(this.len == 0 && len > 0) throw new js__$Boot_HaxeError(new haxe_io_Eof());
		if(this.len < len) len = this.len;
		var b1 = this.b;
		var b2 = buf.b;
		var _g = 0;
		while(_g < len) {
			var i = _g++;
			b2[pos + i] = b1[this.pos + i];
		}
		this.pos += len;
		this.len -= len;
		return len;
	}
	,__class__: haxe_io_BytesInput
});
var haxe_io_Eof = function() {
};
$hxClasses["haxe.io.Eof"] = haxe_io_Eof;
haxe_io_Eof.__name__ = ["haxe","io","Eof"];
haxe_io_Eof.prototype = {
	toString: function() {
		return "Eof";
	}
	,__class__: haxe_io_Eof
};
var haxe_io_Error = $hxClasses["haxe.io.Error"] = { __ename__ : true, __constructs__ : ["Blocked","Overflow","OutsideBounds","Custom"] };
haxe_io_Error.Blocked = ["Blocked",0];
haxe_io_Error.Blocked.toString = $estr;
haxe_io_Error.Blocked.__enum__ = haxe_io_Error;
haxe_io_Error.Overflow = ["Overflow",1];
haxe_io_Error.Overflow.toString = $estr;
haxe_io_Error.Overflow.__enum__ = haxe_io_Error;
haxe_io_Error.OutsideBounds = ["OutsideBounds",2];
haxe_io_Error.OutsideBounds.toString = $estr;
haxe_io_Error.OutsideBounds.__enum__ = haxe_io_Error;
haxe_io_Error.Custom = function(e) { var $x = ["Custom",3,e]; $x.__enum__ = haxe_io_Error; $x.toString = $estr; return $x; };
var haxe_io_FPHelper = function() { };
$hxClasses["haxe.io.FPHelper"] = haxe_io_FPHelper;
haxe_io_FPHelper.__name__ = ["haxe","io","FPHelper"];
haxe_io_FPHelper.i32ToFloat = function(i) {
	var sign = 1 - (i >>> 31 << 1);
	var exp = i >>> 23 & 255;
	var sig = i & 8388607;
	if(sig == 0 && exp == 0) return 0.0;
	return sign * (1 + Math.pow(2,-23) * sig) * Math.pow(2,exp - 127);
};
haxe_io_FPHelper.floatToI32 = function(f) {
	if(f == 0) return 0;
	var af;
	if(f < 0) af = -f; else af = f;
	var exp = Math.floor(Math.log(af) / 0.6931471805599453);
	if(exp < -127) exp = -127; else if(exp > 128) exp = 128;
	var sig = Math.round((af / Math.pow(2,exp) - 1) * 8388608) & 8388607;
	return (f < 0?-2147483648:0) | exp + 127 << 23 | sig;
};
haxe_io_FPHelper.i64ToDouble = function(low,high) {
	var sign = 1 - (high >>> 31 << 1);
	var exp = (high >> 20 & 2047) - 1023;
	var sig = (high & 1048575) * 4294967296. + (low >>> 31) * 2147483648. + (low & 2147483647);
	if(sig == 0 && exp == -1023) return 0.0;
	return sign * (1.0 + Math.pow(2,-52) * sig) * Math.pow(2,exp);
};
haxe_io_FPHelper.doubleToI64 = function(v) {
	var i64 = haxe_io_FPHelper.i64tmp;
	if(v == 0) {
		i64.low = 0;
		i64.high = 0;
	} else {
		var av;
		if(v < 0) av = -v; else av = v;
		var exp = Math.floor(Math.log(av) / 0.6931471805599453);
		var sig;
		var v1 = (av / Math.pow(2,exp) - 1) * 4503599627370496.;
		sig = Math.round(v1);
		var sig_l = sig | 0;
		var sig_h = sig / 4294967296.0 | 0;
		i64.low = sig_l;
		i64.high = (v < 0?-2147483648:0) | exp + 1023 << 20 | sig_h;
	}
	return i64;
};
var haxe_zip_ExtraField = $hxClasses["haxe.zip.ExtraField"] = { __ename__ : true, __constructs__ : ["FUnknown","FInfoZipUnicodePath","FUtf8"] };
haxe_zip_ExtraField.FUnknown = function(tag,bytes) { var $x = ["FUnknown",0,tag,bytes]; $x.__enum__ = haxe_zip_ExtraField; $x.toString = $estr; return $x; };
haxe_zip_ExtraField.FInfoZipUnicodePath = function(name,crc) { var $x = ["FInfoZipUnicodePath",1,name,crc]; $x.__enum__ = haxe_zip_ExtraField; $x.toString = $estr; return $x; };
haxe_zip_ExtraField.FUtf8 = ["FUtf8",2];
haxe_zip_ExtraField.FUtf8.toString = $estr;
haxe_zip_ExtraField.FUtf8.__enum__ = haxe_zip_ExtraField;
var haxe_zip_Huffman = $hxClasses["haxe.zip.Huffman"] = { __ename__ : true, __constructs__ : ["Found","NeedBit","NeedBits"] };
haxe_zip_Huffman.Found = function(i) { var $x = ["Found",0,i]; $x.__enum__ = haxe_zip_Huffman; $x.toString = $estr; return $x; };
haxe_zip_Huffman.NeedBit = function(left,right) { var $x = ["NeedBit",1,left,right]; $x.__enum__ = haxe_zip_Huffman; $x.toString = $estr; return $x; };
haxe_zip_Huffman.NeedBits = function(n,table) { var $x = ["NeedBits",2,n,table]; $x.__enum__ = haxe_zip_Huffman; $x.toString = $estr; return $x; };
var haxe_zip_HuffTools = function() {
};
$hxClasses["haxe.zip.HuffTools"] = haxe_zip_HuffTools;
haxe_zip_HuffTools.__name__ = ["haxe","zip","HuffTools"];
haxe_zip_HuffTools.prototype = {
	treeDepth: function(t) {
		switch(t[1]) {
		case 0:
			return 0;
		case 2:
			throw new js__$Boot_HaxeError("assert");
			break;
		case 1:
			var b = t[3];
			var a = t[2];
			var da = this.treeDepth(a);
			var db = this.treeDepth(b);
			return 1 + (da < db?da:db);
		}
	}
	,treeCompress: function(t) {
		var d = this.treeDepth(t);
		if(d == 0) return t;
		if(d == 1) switch(t[1]) {
		case 1:
			var b = t[3];
			var a = t[2];
			return haxe_zip_Huffman.NeedBit(this.treeCompress(a),this.treeCompress(b));
		default:
			throw new js__$Boot_HaxeError("assert");
		}
		var size = 1 << d;
		var table = [];
		var _g = 0;
		while(_g < size) {
			var i = _g++;
			table.push(haxe_zip_Huffman.Found(-1));
		}
		this.treeWalk(table,0,0,d,t);
		return haxe_zip_Huffman.NeedBits(d,table);
	}
	,treeWalk: function(table,p,cd,d,t) {
		switch(t[1]) {
		case 1:
			var b = t[3];
			var a = t[2];
			if(d > 0) {
				this.treeWalk(table,p,cd + 1,d - 1,a);
				this.treeWalk(table,p | 1 << cd,cd + 1,d - 1,b);
			} else table[p] = this.treeCompress(t);
			break;
		default:
			table[p] = this.treeCompress(t);
		}
	}
	,treeMake: function(bits,maxbits,v,len) {
		if(len > maxbits) throw new js__$Boot_HaxeError("Invalid huffman");
		var idx = v << 5 | len;
		if(bits.h.hasOwnProperty(idx)) return haxe_zip_Huffman.Found(bits.h[idx]);
		v <<= 1;
		len += 1;
		return haxe_zip_Huffman.NeedBit(this.treeMake(bits,maxbits,v,len),this.treeMake(bits,maxbits,v | 1,len));
	}
	,make: function(lengths,pos,nlengths,maxbits) {
		var counts = [];
		var tmp = [];
		if(maxbits > 32) throw new js__$Boot_HaxeError("Invalid huffman");
		var _g = 0;
		while(_g < maxbits) {
			var i = _g++;
			counts.push(0);
			tmp.push(0);
		}
		var _g1 = 0;
		while(_g1 < nlengths) {
			var i1 = _g1++;
			var p = lengths[i1 + pos];
			if(p >= maxbits) throw new js__$Boot_HaxeError("Invalid huffman");
			counts[p]++;
		}
		var code = 0;
		var _g11 = 1;
		var _g2 = maxbits - 1;
		while(_g11 < _g2) {
			var i2 = _g11++;
			code = code + counts[i2] << 1;
			tmp[i2] = code;
		}
		var bits = new haxe_ds_IntMap();
		var _g3 = 0;
		while(_g3 < nlengths) {
			var i3 = _g3++;
			var l = lengths[i3 + pos];
			if(l != 0) {
				var n = tmp[l - 1];
				tmp[l - 1] = n + 1;
				bits.h[n << 5 | l] = i3;
			}
		}
		return this.treeCompress(haxe_zip_Huffman.NeedBit(this.treeMake(bits,maxbits,0,1),this.treeMake(bits,maxbits,1,1)));
	}
	,__class__: haxe_zip_HuffTools
};
var haxe_zip__$InflateImpl_Window = function(hasCrc) {
	this.buffer = haxe_io_Bytes.alloc(65536);
	this.pos = 0;
	if(hasCrc) this.crc = new haxe_crypto_Adler32();
};
$hxClasses["haxe.zip._InflateImpl.Window"] = haxe_zip__$InflateImpl_Window;
haxe_zip__$InflateImpl_Window.__name__ = ["haxe","zip","_InflateImpl","Window"];
haxe_zip__$InflateImpl_Window.prototype = {
	slide: function() {
		if(this.crc != null) this.crc.update(this.buffer,0,32768);
		var b = haxe_io_Bytes.alloc(65536);
		this.pos -= 32768;
		b.blit(0,this.buffer,32768,this.pos);
		this.buffer = b;
	}
	,addBytes: function(b,p,len) {
		if(this.pos + len > 65536) this.slide();
		this.buffer.blit(this.pos,b,p,len);
		this.pos += len;
	}
	,addByte: function(c) {
		if(this.pos == 65536) this.slide();
		this.buffer.b[this.pos] = c & 255;
		this.pos++;
	}
	,getLastChar: function() {
		return this.buffer.b[this.pos - 1];
	}
	,available: function() {
		return this.pos;
	}
	,checksum: function() {
		if(this.crc != null) this.crc.update(this.buffer,0,this.pos);
		return this.crc;
	}
	,__class__: haxe_zip__$InflateImpl_Window
};
var haxe_zip__$InflateImpl_State = $hxClasses["haxe.zip._InflateImpl.State"] = { __ename__ : true, __constructs__ : ["Head","Block","CData","Flat","Crc","Dist","DistOne","Done"] };
haxe_zip__$InflateImpl_State.Head = ["Head",0];
haxe_zip__$InflateImpl_State.Head.toString = $estr;
haxe_zip__$InflateImpl_State.Head.__enum__ = haxe_zip__$InflateImpl_State;
haxe_zip__$InflateImpl_State.Block = ["Block",1];
haxe_zip__$InflateImpl_State.Block.toString = $estr;
haxe_zip__$InflateImpl_State.Block.__enum__ = haxe_zip__$InflateImpl_State;
haxe_zip__$InflateImpl_State.CData = ["CData",2];
haxe_zip__$InflateImpl_State.CData.toString = $estr;
haxe_zip__$InflateImpl_State.CData.__enum__ = haxe_zip__$InflateImpl_State;
haxe_zip__$InflateImpl_State.Flat = ["Flat",3];
haxe_zip__$InflateImpl_State.Flat.toString = $estr;
haxe_zip__$InflateImpl_State.Flat.__enum__ = haxe_zip__$InflateImpl_State;
haxe_zip__$InflateImpl_State.Crc = ["Crc",4];
haxe_zip__$InflateImpl_State.Crc.toString = $estr;
haxe_zip__$InflateImpl_State.Crc.__enum__ = haxe_zip__$InflateImpl_State;
haxe_zip__$InflateImpl_State.Dist = ["Dist",5];
haxe_zip__$InflateImpl_State.Dist.toString = $estr;
haxe_zip__$InflateImpl_State.Dist.__enum__ = haxe_zip__$InflateImpl_State;
haxe_zip__$InflateImpl_State.DistOne = ["DistOne",6];
haxe_zip__$InflateImpl_State.DistOne.toString = $estr;
haxe_zip__$InflateImpl_State.DistOne.__enum__ = haxe_zip__$InflateImpl_State;
haxe_zip__$InflateImpl_State.Done = ["Done",7];
haxe_zip__$InflateImpl_State.Done.toString = $estr;
haxe_zip__$InflateImpl_State.Done.__enum__ = haxe_zip__$InflateImpl_State;
var haxe_zip_InflateImpl = function(i,header,crc) {
	if(crc == null) crc = true;
	if(header == null) header = true;
	this["final"] = false;
	this.htools = new haxe_zip_HuffTools();
	this.huffman = this.buildFixedHuffman();
	this.huffdist = null;
	this.len = 0;
	this.dist = 0;
	if(header) this.state = haxe_zip__$InflateImpl_State.Head; else this.state = haxe_zip__$InflateImpl_State.Block;
	this.input = i;
	this.bits = 0;
	this.nbits = 0;
	this.needed = 0;
	this.output = null;
	this.outpos = 0;
	this.lengths = [];
	var _g = 0;
	while(_g < 19) {
		var i1 = _g++;
		this.lengths.push(-1);
	}
	this.window = new haxe_zip__$InflateImpl_Window(crc);
};
$hxClasses["haxe.zip.InflateImpl"] = haxe_zip_InflateImpl;
haxe_zip_InflateImpl.__name__ = ["haxe","zip","InflateImpl"];
haxe_zip_InflateImpl.prototype = {
	buildFixedHuffman: function() {
		if(haxe_zip_InflateImpl.FIXED_HUFFMAN != null) return haxe_zip_InflateImpl.FIXED_HUFFMAN;
		var a = [];
		var _g = 0;
		while(_g < 288) {
			var n = _g++;
			a.push(n <= 143?8:n <= 255?9:n <= 279?7:8);
		}
		haxe_zip_InflateImpl.FIXED_HUFFMAN = this.htools.make(a,0,288,10);
		return haxe_zip_InflateImpl.FIXED_HUFFMAN;
	}
	,readBytes: function(b,pos,len) {
		this.needed = len;
		this.outpos = pos;
		this.output = b;
		if(len > 0) while(this.inflateLoop()) {
		}
		return len - this.needed;
	}
	,getBits: function(n) {
		while(this.nbits < n) {
			this.bits |= this.input.readByte() << this.nbits;
			this.nbits += 8;
		}
		var b = this.bits & (1 << n) - 1;
		this.nbits -= n;
		this.bits >>= n;
		return b;
	}
	,getBit: function() {
		if(this.nbits == 0) {
			this.nbits = 8;
			this.bits = this.input.readByte();
		}
		var b = (this.bits & 1) == 1;
		this.nbits--;
		this.bits >>= 1;
		return b;
	}
	,getRevBits: function(n) {
		if(n == 0) return 0; else if(this.getBit()) return 1 << n - 1 | this.getRevBits(n - 1); else return this.getRevBits(n - 1);
	}
	,resetBits: function() {
		this.bits = 0;
		this.nbits = 0;
	}
	,addBytes: function(b,p,len) {
		this.window.addBytes(b,p,len);
		this.output.blit(this.outpos,b,p,len);
		this.needed -= len;
		this.outpos += len;
	}
	,addByte: function(b) {
		this.window.addByte(b);
		this.output.b[this.outpos] = b & 255;
		this.needed--;
		this.outpos++;
	}
	,addDistOne: function(n) {
		var c = this.window.getLastChar();
		var _g = 0;
		while(_g < n) {
			var i = _g++;
			this.addByte(c);
		}
	}
	,addDist: function(d,len) {
		this.addBytes(this.window.buffer,this.window.pos - d,len);
	}
	,applyHuffman: function(h) {
		switch(h[1]) {
		case 0:
			var n = h[2];
			return n;
		case 1:
			var b = h[3];
			var a = h[2];
			return this.applyHuffman(this.getBit()?b:a);
		case 2:
			var tbl = h[3];
			var n1 = h[2];
			return this.applyHuffman(tbl[this.getBits(n1)]);
		}
	}
	,inflateLengths: function(a,max) {
		var i = 0;
		var prev = 0;
		while(i < max) {
			var n = this.applyHuffman(this.huffman);
			switch(n) {
			case 0:case 1:case 2:case 3:case 4:case 5:case 6:case 7:case 8:case 9:case 10:case 11:case 12:case 13:case 14:case 15:
				prev = n;
				a[i] = n;
				i++;
				break;
			case 16:
				var end = i + 3 + this.getBits(2);
				if(end > max) throw new js__$Boot_HaxeError("Invalid data");
				while(i < end) {
					a[i] = prev;
					i++;
				}
				break;
			case 17:
				i += 3 + this.getBits(3);
				if(i > max) throw new js__$Boot_HaxeError("Invalid data");
				break;
			case 18:
				i += 11 + this.getBits(7);
				if(i > max) throw new js__$Boot_HaxeError("Invalid data");
				break;
			default:
				throw new js__$Boot_HaxeError("Invalid data");
			}
		}
	}
	,inflateLoop: function() {
		var _g = this.state;
		switch(_g[1]) {
		case 0:
			var cmf = this.input.readByte();
			var cm = cmf & 15;
			var cinfo = cmf >> 4;
			if(cm != 8) throw new js__$Boot_HaxeError("Invalid data");
			var flg = this.input.readByte();
			var fdict = (flg & 32) != 0;
			if(((cmf << 8) + flg) % 31 != 0) throw new js__$Boot_HaxeError("Invalid data");
			if(fdict) throw new js__$Boot_HaxeError("Unsupported dictionary");
			this.state = haxe_zip__$InflateImpl_State.Block;
			return true;
		case 4:
			var calc = this.window.checksum();
			if(calc == null) {
				this.state = haxe_zip__$InflateImpl_State.Done;
				return true;
			}
			var crc = haxe_crypto_Adler32.read(this.input);
			if(!calc.equals(crc)) throw new js__$Boot_HaxeError("Invalid CRC");
			this.state = haxe_zip__$InflateImpl_State.Done;
			return true;
		case 7:
			return false;
		case 1:
			this["final"] = this.getBit();
			var _g1 = this.getBits(2);
			switch(_g1) {
			case 0:
				this.len = this.input.readUInt16();
				var nlen = this.input.readUInt16();
				if(nlen != 65535 - this.len) throw new js__$Boot_HaxeError("Invalid data");
				this.state = haxe_zip__$InflateImpl_State.Flat;
				var r = this.inflateLoop();
				this.resetBits();
				return r;
			case 1:
				this.huffman = this.buildFixedHuffman();
				this.huffdist = null;
				this.state = haxe_zip__$InflateImpl_State.CData;
				return true;
			case 2:
				var hlit = this.getBits(5) + 257;
				var hdist = this.getBits(5) + 1;
				var hclen = this.getBits(4) + 4;
				var _g2 = 0;
				while(_g2 < hclen) {
					var i = _g2++;
					this.lengths[haxe_zip_InflateImpl.CODE_LENGTHS_POS[i]] = this.getBits(3);
				}
				var _g21 = hclen;
				while(_g21 < 19) {
					var i1 = _g21++;
					this.lengths[haxe_zip_InflateImpl.CODE_LENGTHS_POS[i1]] = 0;
				}
				this.huffman = this.htools.make(this.lengths,0,19,8);
				var lengths = [];
				var _g3 = 0;
				var _g22 = hlit + hdist;
				while(_g3 < _g22) {
					var i2 = _g3++;
					lengths.push(0);
				}
				this.inflateLengths(lengths,hlit + hdist);
				this.huffdist = this.htools.make(lengths,hlit,hdist,16);
				this.huffman = this.htools.make(lengths,0,hlit,16);
				this.state = haxe_zip__$InflateImpl_State.CData;
				return true;
			default:
				throw new js__$Boot_HaxeError("Invalid data");
			}
			break;
		case 3:
			var rlen;
			if(this.len < this.needed) rlen = this.len; else rlen = this.needed;
			var bytes = this.input.read(rlen);
			this.len -= rlen;
			this.addBytes(bytes,0,rlen);
			if(this.len == 0) if(this["final"]) this.state = haxe_zip__$InflateImpl_State.Crc; else this.state = haxe_zip__$InflateImpl_State.Block;
			return this.needed > 0;
		case 6:
			var rlen1;
			if(this.len < this.needed) rlen1 = this.len; else rlen1 = this.needed;
			this.addDistOne(rlen1);
			this.len -= rlen1;
			if(this.len == 0) this.state = haxe_zip__$InflateImpl_State.CData;
			return this.needed > 0;
		case 5:
			while(this.len > 0 && this.needed > 0) {
				var rdist;
				if(this.len < this.dist) rdist = this.len; else rdist = this.dist;
				var rlen2;
				if(this.needed < rdist) rlen2 = this.needed; else rlen2 = rdist;
				this.addDist(this.dist,rlen2);
				this.len -= rlen2;
			}
			if(this.len == 0) this.state = haxe_zip__$InflateImpl_State.CData;
			return this.needed > 0;
		case 2:
			var n = this.applyHuffman(this.huffman);
			if(n < 256) {
				this.addByte(n);
				return this.needed > 0;
			} else if(n == 256) {
				if(this["final"]) this.state = haxe_zip__$InflateImpl_State.Crc; else this.state = haxe_zip__$InflateImpl_State.Block;
				return true;
			} else {
				n -= 257;
				var extra_bits = haxe_zip_InflateImpl.LEN_EXTRA_BITS_TBL[n];
				if(extra_bits == -1) throw new js__$Boot_HaxeError("Invalid data");
				this.len = haxe_zip_InflateImpl.LEN_BASE_VAL_TBL[n] + this.getBits(extra_bits);
				var dist_code;
				if(this.huffdist == null) dist_code = this.getRevBits(5); else dist_code = this.applyHuffman(this.huffdist);
				extra_bits = haxe_zip_InflateImpl.DIST_EXTRA_BITS_TBL[dist_code];
				if(extra_bits == -1) throw new js__$Boot_HaxeError("Invalid data");
				this.dist = haxe_zip_InflateImpl.DIST_BASE_VAL_TBL[dist_code] + this.getBits(extra_bits);
				if(this.dist > this.window.available()) throw new js__$Boot_HaxeError("Invalid data");
				if(this.dist == 1) this.state = haxe_zip__$InflateImpl_State.DistOne; else this.state = haxe_zip__$InflateImpl_State.Dist;
				return true;
			}
			break;
		}
	}
	,__class__: haxe_zip_InflateImpl
};
var haxe_zip_Reader = function(i) {
	this.i = i;
};
$hxClasses["haxe.zip.Reader"] = haxe_zip_Reader;
haxe_zip_Reader.__name__ = ["haxe","zip","Reader"];
haxe_zip_Reader.readZip = function(i) {
	var r = new haxe_zip_Reader(i);
	return r.read();
};
haxe_zip_Reader.prototype = {
	readZipDate: function() {
		var t = this.i.readUInt16();
		var hour = t >> 11 & 31;
		var min = t >> 5 & 63;
		var sec = t & 31;
		var d = this.i.readUInt16();
		var year = d >> 9;
		var month = d >> 5 & 15;
		var day = d & 31;
		return new Date(year + 1980,month - 1,day,hour,min,sec << 1);
	}
	,readExtraFields: function(length) {
		var fields = new List();
		while(length > 0) {
			if(length < 4) throw new js__$Boot_HaxeError("Invalid extra fields data");
			var tag = this.i.readUInt16();
			var len = this.i.readUInt16();
			if(length < len) throw new js__$Boot_HaxeError("Invalid extra fields data");
			switch(tag) {
			case 28789:
				var version = this.i.readByte();
				if(version != 1) {
					var data = new haxe_io_BytesBuffer();
					data.b.push(version);
					data.add(this.i.read(len - 1));
					fields.add(haxe_zip_ExtraField.FUnknown(tag,data.getBytes()));
				} else {
					var crc = this.i.readInt32();
					var name = this.i.read(len - 5).toString();
					fields.add(haxe_zip_ExtraField.FInfoZipUnicodePath(name,crc));
				}
				break;
			default:
				fields.add(haxe_zip_ExtraField.FUnknown(tag,this.i.read(len)));
			}
			length -= 4 + len;
		}
		return fields;
	}
	,readEntryHeader: function() {
		var i = this.i;
		var h = i.readInt32();
		if(h == 33639248 || h == 101010256) return null;
		if(h != 67324752) throw new js__$Boot_HaxeError("Invalid Zip Data");
		var version = i.readUInt16();
		var flags = i.readUInt16();
		var utf8 = (flags & 2048) != 0;
		if((flags & 63473) != 0) throw new js__$Boot_HaxeError("Unsupported flags " + flags);
		var compression = i.readUInt16();
		var compressed = compression != 0;
		if(compressed && compression != 8) throw new js__$Boot_HaxeError("Unsupported compression " + compression);
		var mtime = this.readZipDate();
		var crc32 = i.readInt32();
		var csize = i.readInt32();
		var usize = i.readInt32();
		var fnamelen = i.readInt16();
		var elen = i.readInt16();
		var fname = i.readString(fnamelen);
		var fields = this.readExtraFields(elen);
		if(utf8) fields.push(haxe_zip_ExtraField.FUtf8);
		var data = null;
		if((flags & 8) != 0) crc32 = null;
		return { fileName : fname, fileSize : usize, fileTime : mtime, compressed : compressed, dataSize : csize, data : data, crc32 : crc32, extraFields : fields};
	}
	,read: function() {
		var l = new List();
		var buf = null;
		var tmp = null;
		while(true) {
			var e = this.readEntryHeader();
			if(e == null) break;
			if(e.crc32 == null) {
				if(e.compressed) {
					var bufSize = 65536;
					if(tmp == null) tmp = haxe_io_Bytes.alloc(bufSize);
					var out = new haxe_io_BytesBuffer();
					var z = new haxe_zip_InflateImpl(this.i,false,false);
					while(true) {
						var n = z.readBytes(tmp,0,bufSize);
						out.addBytes(tmp,0,n);
						if(n < bufSize) break;
					}
					e.data = out.getBytes();
				} else e.data = this.i.read(e.dataSize);
				e.crc32 = this.i.readInt32();
				if(e.crc32 == 134695760) e.crc32 = this.i.readInt32();
				e.dataSize = this.i.readInt32();
				e.fileSize = this.i.readInt32();
				e.dataSize = e.fileSize;
				e.compressed = false;
			} else e.data = this.i.read(e.dataSize);
			l.add(e);
		}
		return l;
	}
	,__class__: haxe_zip_Reader
};
var js__$Boot_HaxeError = function(val) {
	Error.call(this);
	this.val = val;
	if(Object.prototype.hasOwnProperty.call(val,"name")) this.name = Reflect.field(val,"name"); else this.name = "Error";
	if(Object.prototype.hasOwnProperty.call(val,"message")) this.message = Reflect.field(val,"message"); else this.message = Std.string(val);
	if(Error.captureStackTrace) Error.captureStackTrace(this,js__$Boot_HaxeError);
};
$hxClasses["js._Boot.HaxeError"] = js__$Boot_HaxeError;
js__$Boot_HaxeError.__name__ = ["js","_Boot","HaxeError"];
js__$Boot_HaxeError.__super__ = Error;
js__$Boot_HaxeError.prototype = $extend(Error.prototype,{
	__class__: js__$Boot_HaxeError
});
var js_Boot = function() { };
$hxClasses["js.Boot"] = js_Boot;
js_Boot.__name__ = ["js","Boot"];
js_Boot.getClass = function(o) {
	if((o instanceof Array) && o.__enum__ == null) return Array; else {
		var cl = o.__class__;
		if(cl != null) return cl;
		var name = js_Boot.__nativeClassName(o);
		if(name != null) return js_Boot.__resolveNativeClass(name);
		return null;
	}
};
js_Boot.__string_rec = function(o,s) {
	if(o == null) return "null";
	if(s.length >= 5) return "<...>";
	var t = typeof(o);
	if(t == "function" && (o.__name__ || o.__ename__)) t = "object";
	switch(t) {
	case "object":
		if(o instanceof Array) {
			if(o.__enum__) {
				if(o.length == 2) return o[0];
				var str2 = o[0] + "(";
				s += "\t";
				var _g1 = 2;
				var _g = o.length;
				while(_g1 < _g) {
					var i1 = _g1++;
					if(i1 != 2) str2 += "," + js_Boot.__string_rec(o[i1],s); else str2 += js_Boot.__string_rec(o[i1],s);
				}
				return str2 + ")";
			}
			var l = o.length;
			var i;
			var str1 = "[";
			s += "\t";
			var _g2 = 0;
			while(_g2 < l) {
				var i2 = _g2++;
				str1 += (i2 > 0?",":"") + js_Boot.__string_rec(o[i2],s);
			}
			str1 += "]";
			return str1;
		}
		var tostr;
		try {
			tostr = o.toString;
		} catch( e ) {
			if (e instanceof js__$Boot_HaxeError) e = e.val;
			return "???";
		}
		if(tostr != null && tostr != Object.toString && typeof(tostr) == "function") {
			var s2 = o.toString();
			if(s2 != "[object Object]") return s2;
		}
		var k = null;
		var str = "{\n";
		s += "\t";
		var hasp = o.hasOwnProperty != null;
		for( var k in o ) {
		if(hasp && !o.hasOwnProperty(k)) {
			continue;
		}
		if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__" || k == "__properties__") {
			continue;
		}
		if(str.length != 2) str += ", \n";
		str += s + k + " : " + js_Boot.__string_rec(o[k],s);
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
};
js_Boot.__interfLoop = function(cc,cl) {
	if(cc == null) return false;
	if(cc == cl) return true;
	var intf = cc.__interfaces__;
	if(intf != null) {
		var _g1 = 0;
		var _g = intf.length;
		while(_g1 < _g) {
			var i = _g1++;
			var i1 = intf[i];
			if(i1 == cl || js_Boot.__interfLoop(i1,cl)) return true;
		}
	}
	return js_Boot.__interfLoop(cc.__super__,cl);
};
js_Boot.__instanceof = function(o,cl) {
	if(cl == null) return false;
	switch(cl) {
	case Int:
		return (o|0) === o;
	case Float:
		return typeof(o) == "number";
	case Bool:
		return typeof(o) == "boolean";
	case String:
		return typeof(o) == "string";
	case Array:
		return (o instanceof Array) && o.__enum__ == null;
	case Dynamic:
		return true;
	default:
		if(o != null) {
			if(typeof(cl) == "function") {
				if(o instanceof cl) return true;
				if(js_Boot.__interfLoop(js_Boot.getClass(o),cl)) return true;
			} else if(typeof(cl) == "object" && js_Boot.__isNativeObj(cl)) {
				if(o instanceof cl) return true;
			}
		} else return false;
		if(cl == Class && o.__name__ != null) return true;
		if(cl == Enum && o.__ename__ != null) return true;
		return o.__enum__ == cl;
	}
};
js_Boot.__nativeClassName = function(o) {
	var name = js_Boot.__toStr.call(o).slice(8,-1);
	if(name == "Object" || name == "Function" || name == "Math" || name == "JSON") return null;
	return name;
};
js_Boot.__isNativeObj = function(o) {
	return js_Boot.__nativeClassName(o) != null;
};
js_Boot.__resolveNativeClass = function(name) {
	return (Function("return typeof " + name + " != \"undefined\" ? " + name + " : null"))();
};
var js_html_compat_ArrayBuffer = function(a) {
	if((a instanceof Array) && a.__enum__ == null) {
		this.a = a;
		this.byteLength = a.length;
	} else {
		var len = a;
		this.a = [];
		var _g = 0;
		while(_g < len) {
			var i = _g++;
			this.a[i] = 0;
		}
		this.byteLength = len;
	}
};
$hxClasses["js.html.compat.ArrayBuffer"] = js_html_compat_ArrayBuffer;
js_html_compat_ArrayBuffer.__name__ = ["js","html","compat","ArrayBuffer"];
js_html_compat_ArrayBuffer.sliceImpl = function(begin,end) {
	var u = new Uint8Array(this,begin,end == null?null:end - begin);
	var result = new ArrayBuffer(u.byteLength);
	var resultArray = new Uint8Array(result);
	resultArray.set(u);
	return result;
};
js_html_compat_ArrayBuffer.prototype = {
	slice: function(begin,end) {
		return new js_html_compat_ArrayBuffer(this.a.slice(begin,end));
	}
	,__class__: js_html_compat_ArrayBuffer
};
var js_html_compat_DataView = function(buffer,byteOffset,byteLength) {
	this.buf = buffer;
	if(byteOffset == null) this.offset = 0; else this.offset = byteOffset;
	if(byteLength == null) this.length = buffer.byteLength - this.offset; else this.length = byteLength;
	if(this.offset < 0 || this.length < 0 || this.offset + this.length > buffer.byteLength) throw new js__$Boot_HaxeError(haxe_io_Error.OutsideBounds);
};
$hxClasses["js.html.compat.DataView"] = js_html_compat_DataView;
js_html_compat_DataView.__name__ = ["js","html","compat","DataView"];
js_html_compat_DataView.prototype = {
	getInt8: function(byteOffset) {
		var v = this.buf.a[this.offset + byteOffset];
		if(v >= 128) return v - 256; else return v;
	}
	,getUint8: function(byteOffset) {
		return this.buf.a[this.offset + byteOffset];
	}
	,getInt16: function(byteOffset,littleEndian) {
		var v = this.getUint16(byteOffset,littleEndian);
		if(v >= 32768) return v - 65536; else return v;
	}
	,getUint16: function(byteOffset,littleEndian) {
		if(littleEndian) return this.buf.a[this.offset + byteOffset] | this.buf.a[this.offset + byteOffset + 1] << 8; else return this.buf.a[this.offset + byteOffset] << 8 | this.buf.a[this.offset + byteOffset + 1];
	}
	,getInt32: function(byteOffset,littleEndian) {
		var p = this.offset + byteOffset;
		var a = this.buf.a[p++];
		var b = this.buf.a[p++];
		var c = this.buf.a[p++];
		var d = this.buf.a[p++];
		if(littleEndian) return a | b << 8 | c << 16 | d << 24; else return d | c << 8 | b << 16 | a << 24;
	}
	,getUint32: function(byteOffset,littleEndian) {
		var v = this.getInt32(byteOffset,littleEndian);
		if(v < 0) return v + 4294967296.; else return v;
	}
	,getFloat32: function(byteOffset,littleEndian) {
		return haxe_io_FPHelper.i32ToFloat(this.getInt32(byteOffset,littleEndian));
	}
	,getFloat64: function(byteOffset,littleEndian) {
		var a = this.getInt32(byteOffset,littleEndian);
		var b = this.getInt32(byteOffset + 4,littleEndian);
		return haxe_io_FPHelper.i64ToDouble(littleEndian?a:b,littleEndian?b:a);
	}
	,setInt8: function(byteOffset,value) {
		if(value < 0) this.buf.a[byteOffset + this.offset] = value + 128 & 255; else this.buf.a[byteOffset + this.offset] = value & 255;
	}
	,setUint8: function(byteOffset,value) {
		this.buf.a[byteOffset + this.offset] = value & 255;
	}
	,setInt16: function(byteOffset,value,littleEndian) {
		this.setUint16(byteOffset,value < 0?value + 65536:value,littleEndian);
	}
	,setUint16: function(byteOffset,value,littleEndian) {
		var p = byteOffset + this.offset;
		if(littleEndian) {
			this.buf.a[p] = value & 255;
			this.buf.a[p++] = value >> 8 & 255;
		} else {
			this.buf.a[p++] = value >> 8 & 255;
			this.buf.a[p] = value & 255;
		}
	}
	,setInt32: function(byteOffset,value,littleEndian) {
		this.setUint32(byteOffset,value,littleEndian);
	}
	,setUint32: function(byteOffset,value,littleEndian) {
		var p = byteOffset + this.offset;
		if(littleEndian) {
			this.buf.a[p++] = value & 255;
			this.buf.a[p++] = value >> 8 & 255;
			this.buf.a[p++] = value >> 16 & 255;
			this.buf.a[p++] = value >>> 24;
		} else {
			this.buf.a[p++] = value >>> 24;
			this.buf.a[p++] = value >> 16 & 255;
			this.buf.a[p++] = value >> 8 & 255;
			this.buf.a[p++] = value & 255;
		}
	}
	,setFloat32: function(byteOffset,value,littleEndian) {
		this.setUint32(byteOffset,haxe_io_FPHelper.floatToI32(value),littleEndian);
	}
	,setFloat64: function(byteOffset,value,littleEndian) {
		var i64 = haxe_io_FPHelper.doubleToI64(value);
		if(littleEndian) {
			this.setUint32(byteOffset,i64.low);
			this.setUint32(byteOffset,i64.high);
		} else {
			this.setUint32(byteOffset,i64.high);
			this.setUint32(byteOffset,i64.low);
		}
	}
	,__class__: js_html_compat_DataView
};
var js_html_compat_Uint8Array = function() { };
$hxClasses["js.html.compat.Uint8Array"] = js_html_compat_Uint8Array;
js_html_compat_Uint8Array.__name__ = ["js","html","compat","Uint8Array"];
js_html_compat_Uint8Array._new = function(arg1,offset,length) {
	var arr;
	if(typeof(arg1) == "number") {
		arr = [];
		var _g = 0;
		while(_g < arg1) {
			var i = _g++;
			arr[i] = 0;
		}
		arr.byteLength = arr.length;
		arr.byteOffset = 0;
		arr.buffer = new js_html_compat_ArrayBuffer(arr);
	} else if(js_Boot.__instanceof(arg1,js_html_compat_ArrayBuffer)) {
		var buffer = arg1;
		if(offset == null) offset = 0;
		if(length == null) length = buffer.byteLength - offset;
		if(offset == 0) arr = buffer.a; else arr = buffer.a.slice(offset,offset + length);
		arr.byteLength = arr.length;
		arr.byteOffset = offset;
		arr.buffer = buffer;
	} else if((arg1 instanceof Array) && arg1.__enum__ == null) {
		arr = arg1.slice();
		arr.byteLength = arr.length;
		arr.byteOffset = 0;
		arr.buffer = new js_html_compat_ArrayBuffer(arr);
	} else throw new js__$Boot_HaxeError("TODO " + Std.string(arg1));
	arr.subarray = js_html_compat_Uint8Array._subarray;
	arr.set = js_html_compat_Uint8Array._set;
	return arr;
};
js_html_compat_Uint8Array._set = function(arg,offset) {
	var t = this;
	if(js_Boot.__instanceof(arg.buffer,js_html_compat_ArrayBuffer)) {
		var a = arg;
		if(arg.byteLength + offset > t.byteLength) throw new js__$Boot_HaxeError("set() outside of range");
		var _g1 = 0;
		var _g = arg.byteLength;
		while(_g1 < _g) {
			var i = _g1++;
			t[i + offset] = a[i];
		}
	} else if((arg instanceof Array) && arg.__enum__ == null) {
		var a1 = arg;
		if(a1.length + offset > t.byteLength) throw new js__$Boot_HaxeError("set() outside of range");
		var _g11 = 0;
		var _g2 = a1.length;
		while(_g11 < _g2) {
			var i1 = _g11++;
			t[i1 + offset] = a1[i1];
		}
	} else throw new js__$Boot_HaxeError("TODO");
};
js_html_compat_Uint8Array._subarray = function(start,end) {
	var t = this;
	var a = js_html_compat_Uint8Array._new(t.slice(start,end));
	a.byteOffset = start;
	return a;
};
var openfl_AssetCache = function() {
	this.__enabled = true;
	this.bitmapData = new haxe_ds_StringMap();
	this.font = new haxe_ds_StringMap();
	this.sound = new haxe_ds_StringMap();
};
$hxClasses["openfl.AssetCache"] = openfl_AssetCache;
openfl_AssetCache.__name__ = ["openfl","AssetCache"];
openfl_AssetCache.prototype = {
	get_enabled: function() {
		return this.__enabled;
	}
	,__class__: openfl_AssetCache
};
var openfl_Assets = function() { };
$hxClasses["openfl.Assets"] = openfl_Assets;
openfl_Assets.__name__ = ["openfl","Assets"];
openfl_Assets.getBitmapData = function(id,useCache) {
	if(useCache == null) useCache = true;
	openfl_Assets.initialize();
	var r = null;
	var c;
	var b;
	if(useCache && (c = openfl_Assets.cache).get_enabled() && c.bitmapData.exists(id) && openfl_Assets.isValidBitmapData(b = openfl_Assets.cache.bitmapData.get(id))) return b;
	var i = id.indexOf(":");
	var ln = id.substring(0,i);
	var sn = id.substring(i + 1);
	var lr = openfl_Assets.getLibrary(ln);
	if(lr != null) {
		if(lr.exists(sn,openfl_AssetType.IMAGE)) {
			r = lr.getBitmapData(sn);
			if(useCache) {
				if(c.get_enabled()) c.bitmapData.set(id,r);
			} else r = r.clone();
		} else if(console) console.log("[openfl.Assets] There is no BitmapData asset with an ID of \"" + sn + "\"");
	} else if(console) console.log("[openfl.Assets] There is no asset library named \"" + ln + "\"");
	return r;
};
openfl_Assets.getLibrary = function(name) {
	return openfl_Assets.libraries.get(name == null || name == ""?"default":name);
};
openfl_Assets.initialize = function() {
	if(!openfl_Assets.initialized) {
		openfl_Assets.registerLibrary("default",new DefaultAssetLibrary());
		openfl_Assets.initialized = true;
	}
};
openfl_Assets.isValidBitmapData = function(bitmapData) {
	return true;
};
openfl_Assets.registerLibrary = function(name,library) {
	if(openfl_Assets.libraries.exists(name)) openfl_Assets.unloadLibrary(name);
	openfl_Assets.libraries.set(name,library);
};
openfl_Assets.unloadLibrary = function(name) {
	openfl_Assets.initialize();
	var $it0 = openfl_Assets.cache.bitmapData.keys();
	while( $it0.hasNext() ) {
		var key = $it0.next();
		if(key.substring(0,key.indexOf(":")) == name) openfl_Assets.cache.bitmapData.remove(key);
	}
	openfl_Assets.libraries.remove(name);
};
var openfl_AssetType = $hxClasses["openfl.AssetType"] = { __ename__ : true, __constructs__ : ["BINARY","FONT","IMAGE","MOVIE_CLIP","MUSIC","SOUND","TEMPLATE","TEXT"] };
openfl_AssetType.BINARY = ["BINARY",0];
openfl_AssetType.BINARY.toString = $estr;
openfl_AssetType.BINARY.__enum__ = openfl_AssetType;
openfl_AssetType.FONT = ["FONT",1];
openfl_AssetType.FONT.toString = $estr;
openfl_AssetType.FONT.__enum__ = openfl_AssetType;
openfl_AssetType.IMAGE = ["IMAGE",2];
openfl_AssetType.IMAGE.toString = $estr;
openfl_AssetType.IMAGE.__enum__ = openfl_AssetType;
openfl_AssetType.MOVIE_CLIP = ["MOVIE_CLIP",3];
openfl_AssetType.MOVIE_CLIP.toString = $estr;
openfl_AssetType.MOVIE_CLIP.__enum__ = openfl_AssetType;
openfl_AssetType.MUSIC = ["MUSIC",4];
openfl_AssetType.MUSIC.toString = $estr;
openfl_AssetType.MUSIC.__enum__ = openfl_AssetType;
openfl_AssetType.SOUND = ["SOUND",5];
openfl_AssetType.SOUND.toString = $estr;
openfl_AssetType.SOUND.__enum__ = openfl_AssetType;
openfl_AssetType.TEMPLATE = ["TEMPLATE",6];
openfl_AssetType.TEMPLATE.toString = $estr;
openfl_AssetType.TEMPLATE.__enum__ = openfl_AssetType;
openfl_AssetType.TEXT = ["TEXT",7];
openfl_AssetType.TEXT.toString = $estr;
openfl_AssetType.TEXT.__enum__ = openfl_AssetType;
var openfl_display_Stage = function() {
	this.intervalHandle = null;
	this.isTouchScreen = false;
	this.frameRate = null;
	openfl_display_DisplayObjectContainer.call(this);
	var s = this.component.style;
	var o = window;
	var i;
	s.position = "absolute";
	s.overflow = "hidden";
	s.left = s.top = "0";
	s.width = s.height = "100%";
	this.mousePos = new openfl_geom_Point();
	o.addEventListener("click",$bind(this,this.onMouse));
	o.addEventListener("mousedown",$bind(this,this.onMouse));
	o.addEventListener("mouseup",$bind(this,this.onMouse));
	o.addEventListener("mousemove",$bind(this,this.onMouse));
	o.addEventListener("mousewheel",$bind(this,this.onWheel));
	o.addEventListener("DOMMouseScroll",$bind(this,this.onWheel));
	o.addEventListener("touchmove",this.getOnTouch(0));
	o.addEventListener("touchstart",this.getOnTouch(1));
	o.addEventListener("touchend",this.getOnTouch(2));
	o.addEventListener("touchcancel",this.getOnTouch(2));
	this.mouseMtxDepth = [];
	this.mouseMtxStack = [];
	this.mouseMtxCache = [];
	this.mouseTriggered = [];
	this.mouseUntrigger = [];
	i = -1;
	while(++i < 3) {
		this.mouseTriggered[i] = false;
		this.mouseUntrigger[i] = this.getMouseUntrigger(i);
	}
};
$hxClasses["openfl.display.Stage"] = openfl_display_Stage;
openfl_display_Stage.__name__ = ["openfl","display","Stage"];
openfl_display_Stage.__super__ = openfl_display_DisplayObjectContainer;
openfl_display_Stage.prototype = $extend(openfl_display_DisplayObjectContainer.prototype,{
	_broadcastMouseEvent: function(f) {
		var o = this.mouseOver;
		var q;
		f.stageX = this.mousePos.x;
		f.stageY = this.mousePos.y;
		this.broadcastMouse(this.mouseMtxDepth,f,this.mouseMtxStack,this.mouseMtxCache);
		this.mouseOver = q = f.relatedObject;
		if(o != q) {
			if(o != null) o.dispatchEvent(this._alterMouseEvent(f,"mouseOut"));
			if(q != null) q.dispatchEvent(this._alterMouseEvent(f,"mouseOver"));
		}
	}
	,_broadcastTouchEvent: function(f,x,y) {
		f.stageX = x;
		f.stageY = y;
		this.broadcastMouse(this.mouseMtxDepth,f,this.mouseMtxStack,this.mouseMtxCache);
	}
	,getMouseUntrigger: function(i) {
		var _g = this;
		return function() {
			_g.mouseTriggered[i] = false;
		};
	}
	,_alterMouseEvent: function(e,type) {
		var r = new openfl_events_MouseEvent(type,e.bubbles,e.cancelable,e.localX,e.localY,e.relatedObject,e.ctrlKey,e.altKey,e.shiftKey,e.buttonDown,e.delta);
		r.stageX = e.stageX;
		r.stageY = e.stageY;
		return r;
	}
	,_translateMouseEvent: function(e,type) {
		return new openfl_events_MouseEvent(type,true,false,null,null,null,e.ctrlKey,e.altKey,e.shiftKey);
	}
	,_translateTouchEvent: function(e,o,type) {
		var r = new openfl_events_TouchEvent(type,true,false,o.identifier,false,null,null,o.radiusX,o.radiusY,o.force,null,e.ctrlKey,e.altKey,e.shiftKey);
		r.__jsEvent = e;
		return r;
	}
	,mouseEventPrevent: function(o,x,y) {
		var mp = this.mousePos;
		var q = mp.x == x && mp.y == y;
		if(o >= 0 && q && this.mouseTriggered[o]) return true;
		if(!q) this.mousePos.setTo(x,y);
		if(o >= 0 && !this.mouseTriggered[o]) {
			this.mouseTriggered[o] = true;
			window.setTimeout(this.mouseUntrigger[o],0);
		}
		if(o == 1) {
			if(this.mouseDown) this._broadcastMouseEvent(this._alterMouseEvent(this.mouseLastEvent,"mouseUp")); else this.mouseDown = true;
		} else if(o == 2) {
			if(!this.mouseDown) this._broadcastMouseEvent(new openfl_events_MouseEvent("mouseDown")); else this.mouseDown = false;
		}
		return false;
	}
	,getOnTouch: function(i) {
		var _g = this;
		return function(e) {
			_g.onTouch(e,i);
		};
	}
	,onTouch: function(e,m) {
		var lt = e.targetTouches;
		var nt = lt.length;
		var lc = e.changedTouches;
		var nc = lc.length;
		var qt;
		if(nt > 0) qt = lt[0]; else if(nc > 0) qt = lc[0]; else qt = null;
		var i;
		var t;
		var o;
		e.preventDefault();
		this.isTouchScreen = true;
		if(qt != null && (m == 0 || m == 1 && nt == nc || m == 2 && nt == 0 && nc > 0) && !this.mouseEventPrevent(m,qt.pageX,qt.pageY)) {
			this.mouseLastEvent = new openfl_events_MouseEvent(m == 1?"mouseDown":m == 2?"mouseUp":"mouseMove");
			this.mouseLastEvent.__jsEvent = e;
			this._broadcastMouseEvent(this.mouseLastEvent);
			if(m == 2) {
				var ec = new openfl_events_MouseEvent("mouseClick");
				ec.__jsEvent = e;
				this._broadcastMouseEvent(ec);
			}
		}
		if(nc > 0) {
			switch(m) {
			case 1:
				t = "touchBegin";
				break;
			case 2:
				t = "touchEnd";
				break;
			default:
				t = "touchMove";
			}
			i = -1;
			while(++i < nc) {
				o = lc[i];
				this._broadcastTouchEvent(this._translateTouchEvent(e,o,t),o.pageX,o.pageY);
			}
		}
	}
	,onWheel: function(e) {
		var f = this._translateMouseEvent(e,"mouseWheel");
		var d = e.wheelDelta;
		if(d != null) {
			if(Math.abs(d) > 40) d = Math.round(d / 40); else if(d < 0) d = -1; else if(d > 0) d = 1; else d = 0;
		} else d = -e.detail;
		f.delta = d;
		this.mousePos.setTo(e.pageX,e.pageY);
		this._broadcastMouseEvent(f);
	}
	,onMouse: function(e) {
		var t = null;
		var o = -1;
		var b;
		if(e.type == "mousemove") {
			t = "mouseMove";
			o = 0;
		} else {
			b = e.button;
			var _g = e.type;
			switch(_g) {
			case "click":
				if(b == 0) t = "mouseClick"; else if(b == 1) t = "rightClick"; else if(b == 2) t = "middleClick"; else t = t;
				break;
			case "mousedown":
				if(b == 0) t = "mouseDown"; else if(b == 1) t = "middleMouseDown"; else if(b == 2) t = "rightMouseDown"; else t = t;
				o = 1;
				break;
			case "mouseup":
				if(b == 0) t = "mouseUp"; else if(b == 1) t = "middleMouseUp"; else if(b == 2) t = "rightMouseUp"; else t = t;
				o = 2;
				break;
			default:
				return;
			}
		}
		if(!this.mouseEventPrevent(o,e.pageX,e.pageY)) {
			this.mouseLastEvent = new openfl_events_MouseEvent(t,null,null,null,null,null,e.ctrlKey,e.altKey,e.shiftKey);
			this.mouseLastEvent.__jsEvent = e;
			this._broadcastMouseEvent(this.mouseLastEvent);
		}
	}
	,hitTestLocal: function(x,y,p,v) {
		return !v || this.visible;
	}
	,addEventListener: function(type,listener,useCapture,priority,useWeakReference) {
		if(useWeakReference == null) useWeakReference = false;
		if(priority == null) priority = 0;
		if(useCapture == null) useCapture = false;
		var o = this.component;
		this.component = window;
		openfl_display_DisplayObjectContainer.prototype.addEventListener.call(this,type,listener,useCapture,priority,useWeakReference);
		this.component = o;
	}
	,removeEventListener: function(type,listener,useCapture) {
		if(useCapture == null) useCapture = false;
		var o = this.component;
		this.component = window;
		openfl_display_DisplayObjectContainer.prototype.removeEventListener.call(this,type,listener,useCapture);
		this.component = o;
	}
	,set_focus: function(v) {
		if(v != null) v.giveFocus(); else this.component.blur();
		return v;
	}
	,get_stageWidth: function() {
		return window.innerWidth;
	}
	,get_stageHeight: function() {
		return window.innerHeight;
	}
	,get_stage: function() {
		return this;
	}
	,set_frameRate: function(v) {
		if(this.frameRate != v) {
			if(this.intervalHandle != null) {
				if(this.frameRate <= 0) window._cancelAnimationFrame(this.intervalHandle); else window.clearInterval(this.intervalHandle);
			}
			if((this.frameRate = v) <= 0) this.intervalHandle = window._requestAnimationFrame($bind(this,this.onTimer)); else this.intervalHandle = window.setInterval($bind(this,this.onTimer),Std["int"](Math.max(0,1000 / v)));
		}
		return v;
	}
	,onTimer: function() {
		var t = openfl_Lib.getTimer();
		var f;
		var i = -1;
		while(++i < openfl_Lib.schLength) {
			openfl_Lib.schList[i]();
			openfl_Lib.schList[i] = null;
		}
		openfl_Lib.schLength = 0;
		this.broadcastEvent(new openfl_events_Event("enterFrame"));
		f = this.frameRate;
		if(f <= 0) this.intervalHandle = window._requestAnimationFrame($bind(this,this.onTimer));
	}
	,__class__: openfl_display_Stage
});
var openfl_geom_Transform = function(displayObject) {
	if(displayObject == null) throw new js__$Boot_HaxeError("Cannot create Transform with no DisplayObject.");
	this._displayObject = displayObject;
	this._matrix = new openfl_geom_Matrix();
	this._fullMatrix = new openfl_geom_Matrix();
	this.set_colorTransform(new openfl_geom_ColorTransform());
};
$hxClasses["openfl.geom.Transform"] = openfl_geom_Transform;
openfl_geom_Transform.__name__ = ["openfl","geom","Transform"];
openfl_geom_Transform.prototype = {
	set_colorTransform: function(inValue) {
		this.colorTransform = inValue;
		return inValue;
	}
	,get_matrix: function() {
		return this._matrix.clone();
	}
	,__class__: openfl_geom_Transform
};
var openfl_geom_Matrix = function(a,b,c,d,tx,ty) {
	if(a == null) this.a = 1; else this.a = a;
	if(b == null) this.b = 0; else this.b = b;
	if(c == null) this.c = 0; else this.c = c;
	if(d == null) this.d = 1; else this.d = d;
	if(tx == null) this.tx = 0; else this.tx = tx;
	if(ty == null) this.ty = 0; else this.ty = ty;
};
$hxClasses["openfl.geom.Matrix"] = openfl_geom_Matrix;
openfl_geom_Matrix.__name__ = ["openfl","geom","Matrix"];
openfl_geom_Matrix.create = function() {
	var m = openfl_geom_Matrix.pool;
	if(m.length > 0) return m.pop(); else return new openfl_geom_Matrix();
};
openfl_geom_Matrix.prototype = {
	clone: function() {
		return new openfl_geom_Matrix(this.a,this.b,this.c,this.d,this.tx,this.ty);
	}
	,identity: function() {
		this.a = this.d = 1;
		this.b = this.c = this.tx = this.ty = 0;
	}
	,isIdentity: function() {
		return this.a == 1 && this.d == 1 && this.tx == 0 && this.ty == 0 && this.b == 0 && this.c == 0;
	}
	,copy: function(s) {
		this.a = s.a;
		this.b = s.b;
		this.c = s.c;
		this.d = s.d;
		this.tx = s.tx;
		this.ty = s.ty;
	}
	,invert: function() {
		var t;
		var n = this.a * this.d - this.b * this.c;
		if(n == 0) {
			this.a = this.b = this.c = this.d = 0;
			this.tx = -this.tx;
			this.ty = -this.ty;
		} else {
			n = 1 / n;
			t = this.d * n;
			this.d = this.a * n;
			this.a = t;
			this.b *= -n;
			this.c *= -n;
			t = -this.a * this.tx - this.c * this.ty;
			this.ty = -this.b * this.tx - this.d * this.ty;
			this.tx = t;
		}
	}
	,translate: function(x,y) {
		this.tx += x;
		this.ty += y;
	}
	,rotate: function(o) {
		var ox = Math.cos(o);
		var oy = Math.sin(o);
		var t;
		t = this.a * ox - this.b * oy;
		this.b = this.a * oy + this.b * ox;
		this.a = t;
		t = this.c * ox - this.d * oy;
		this.d = this.c * oy + this.d * ox;
		this.c = t;
		t = this.tx * ox - this.ty * oy;
		this.ty = this.tx * oy + this.ty * ox;
		this.tx = t;
	}
	,scale: function(x,y) {
		this.a *= x;
		this.b *= y;
		this.c *= x;
		this.d *= y;
		this.tx *= x;
		this.ty *= y;
	}
	,concat: function(o) {
		var t;
		t = this.a * o.a + this.b * o.c;
		this.b = this.a * o.b + this.b * o.d;
		this.a = t;
		t = this.c * o.a + this.d * o.c;
		this.d = this.c * o.b + this.d * o.d;
		this.c = t;
		t = this.tx * o.a + this.ty * o.c + o.tx;
		this.ty = this.tx * o.b + this.ty * o.d + o.ty;
		this.tx = t;
	}
	,__class__: openfl_geom_Matrix
};
var openfl_geom_ColorTransform = function(r,g,b,a,ro,go,bo,ao) {
	this.redMultiplier = r != null?r:1;
	this.greenMultiplier = g != null?g:1;
	this.blueMultiplier = b != null?b:1;
	this.alphaMultiplier = a != null?a:1;
	this.redOffset = ro != null?ro:0;
	this.greenOffset = go != null?go:0;
	this.blueOffset = bo != null?bo:0;
	this.alphaOffset = ao != null?ao:0;
};
$hxClasses["openfl.geom.ColorTransform"] = openfl_geom_ColorTransform;
openfl_geom_ColorTransform.__name__ = ["openfl","geom","ColorTransform"];
openfl_geom_ColorTransform.prototype = {
	isColorSetter: function() {
		return this.redMultiplier == 0 && this.greenMultiplier == 0 && this.blueMultiplier == 0 && (this.alphaMultiplier == 0 || this.alphaOffset == 0);
	}
	,isAlphaMultiplier: function() {
		return this.redMultiplier == 1 && this.greenMultiplier == 1 && this.blueMultiplier == 1 && this.redOffset == 0 && this.greenOffset == 0 && this.blueOffset == 0 && this.alphaOffset == 0;
	}
	,__class__: openfl_geom_ColorTransform
};
var openfl_Lib = function() { };
$hxClasses["openfl.Lib"] = openfl_Lib;
openfl_Lib.__name__ = ["openfl","Lib"];
openfl_Lib.__init = function() {
	var o;
	openfl_Lib.schList = [];
	openfl_Lib.schLength = 0;
	var wnd = window;
	var n = "equestAnimationFrame";
	var lrq = openfl_Lib.getTimer();
	wnd._requestAnimationFrame = wnd["r" + n] || wnd["webkitR" + n] || wnd["mozR" + n] || wnd["oR" + n] || wnd["msR" + n] || function(o1) {
		return wnd.setTimeout(o1,Std["int"](700 / openfl_Lib.get_stage().frameRate));
	};
	n = "ancelAnimationFrame";
	wnd._cancelAnimationFrame = wnd["c" + n] || wnd["webkitC" + n] || wnd["mozC" + n] || wnd["oC" + n] || wnd["msC" + n] || function(o2) {
		wnd.clearTimeout(o2);
		return;
	};
};
openfl_Lib.getTimer = function() {
	return Std["int"](new Date() - openfl_Lib.qTimeStamp);
};
openfl_Lib.jsNode = function(o) {
	var r = document.createElement(o);
	var s = r.style;
	s.position = "absolute";
	switch(o) {
	case "canvas":
		s.setProperty("-webkit-touch-callout","none",null);
		openfl_Lib.setCSSProperties(s,"user-select","none",47);
		break;
	case "input":case "textarea":
		s.outline = "none";
		break;
	}
	return r;
};
openfl_Lib.jsHelper = function() {
	if(openfl_Lib.qHelper == null) {
		var o = openfl_Lib.jsNode("div");
		openfl_Lib.get_stage().component.appendChild(o);
		o.style.visibility = "hidden";
		o.setAttribute("node","openfl.Lib.jsHelper");
		o.appendChild(openfl_Lib.qHelper = openfl_Lib.jsNode("div"));
	}
	return openfl_Lib.qHelper;
};
openfl_Lib.get_current = function() {
	if(openfl_Lib.qCurrent == null) openfl_Lib.get_stage().addChild(openfl_Lib.qCurrent = new openfl_display_MovieClip());
	return openfl_Lib.qCurrent;
};
openfl_Lib.get_stage = function() {
	if(openfl_Lib.qStage == null) document.body.appendChild((openfl_Lib.qStage = new openfl_display_Stage()).component);
	return openfl_Lib.qStage;
};
openfl_Lib.schedule = function(m) {
	openfl_Lib.schList[openfl_Lib.schLength++] = m;
};
openfl_Lib.rgba = function(color) {
	return "rgba(" + (color >> 16 & 255) + "," + (color >> 8 & 255) + "," + (color & 255) + "," + ((color >> 24 & 255) / 255).toFixed(4) + ")";
};
openfl_Lib.rgbf = function(color,alpha) {
	return "rgba(" + (color >> 16 & 255) + "," + (color >> 8 & 255) + "," + (color & 255) + "," + alpha.toFixed(4) + ")";
};
openfl_Lib.setCSSProperties = function(o,k,v,f) {
	if(!f) f = 31;
	if(f & 1) o.setProperty(k,v,null);
	if(f & 2) o.setProperty("-webkit-" + k,v,null);
	if(f & 4) o.setProperty("-moz-" + k,v,null);
	if(f & 8) o.setProperty("-ms-" + k,v,null);
	if(f & 16) o.setProperty("-o-" + k,v,null);
	if(f & 32) o.setProperty("-khtml-" + k,v,null);
};
var openfl_bitfive_NodeTools = function() { };
$hxClasses["openfl.bitfive.NodeTools"] = openfl_bitfive_NodeTools;
openfl_bitfive_NodeTools.__name__ = ["openfl","bitfive","NodeTools"];
openfl_bitfive_NodeTools.createCanvasElement = function() {
	var r;
	var _this = window.document;
	r = _this.createElement("canvas");
	var r_style = r.style;
	r_style.position = "absolute";
	r_style.setProperty("-webkit-touch-callout","none",null);
	openfl_bitfive_StyleTools.setProperties(r_style,"user-select","none",63);
	return r;
};
var openfl_bitfive_StyleTools = function() { };
$hxClasses["openfl.bitfive.StyleTools"] = openfl_bitfive_StyleTools;
openfl_bitfive_StyleTools.__name__ = ["openfl","bitfive","StyleTools"];
openfl_bitfive_StyleTools.setProperties = function(self,name,value,flags) {
	if(flags == null) flags = 31;
	if(flags & 1) self.setProperty("" + name,value,null);
	if(flags & 2) self.setProperty("-webkit-" + name,value,null);
	if(flags & 4) self.setProperty("-moz-" + name,value,null);
	if(flags & 8) self.setProperty("-ms-" + name,value,null);
	if(flags & 16) self.setProperty("-o-" + name,value,null);
	if(flags & 32) self.setProperty("-khtml-" + name,value,null);
};
var openfl_display_Anchor = function(href,target) {
	this.component = openfl_Lib.jsNode("a");
	openfl_display_Sprite.call(this);
	this.set_href(href);
	this.set_target(target);
};
$hxClasses["openfl.display.Anchor"] = openfl_display_Anchor;
openfl_display_Anchor.__name__ = ["openfl","display","Anchor"];
openfl_display_Anchor.__super__ = openfl_display_Sprite;
openfl_display_Anchor.prototype = $extend(openfl_display_Sprite.prototype,{
	set_href: function(s) {
		if(this.href != s) {
			var o = this.component;
			o.href = this.href = s;
		}
		return s;
	}
	,set_target: function(s) {
		if(this.target != s) {
			var o = this.component;
			o.target = this.target = s;
		}
		return s;
	}
	,__class__: openfl_display_Anchor
});
var openfl_display_Bitmap = function(bitmapData,pixelSnapping,smoothing) {
	if(smoothing == null) smoothing = false;
	openfl_display_DisplayObject.call(this);
	this.set_bitmapData(bitmapData);
};
$hxClasses["openfl.display.Bitmap"] = openfl_display_Bitmap;
openfl_display_Bitmap.__name__ = ["openfl","display","Bitmap"];
openfl_display_Bitmap.__interfaces__ = [openfl_display_IBitmapDrawable];
openfl_display_Bitmap.__super__ = openfl_display_DisplayObject;
openfl_display_Bitmap.prototype = $extend(openfl_display_DisplayObject.prototype,{
	set_bitmapData: function(v) {
		if(this.bitmapData != null) this.component.removeChild(this.bitmapData.component);
		if(v != null) this.component.appendChild(v.handle());
		return this.bitmapData = v;
	}
	,get_width: function() {
		if(this.__width != null) return this.__width; else if(this.bitmapData != null) return this.bitmapData.component.width; else return 0;
	}
	,get_height: function() {
		if(this.__height != null) return this.__height; else if(this.bitmapData != null) return this.bitmapData.component.height; else return 0;
	}
	,drawToSurface: function(cnv,ctx,matrix,ctr,blendMode,clipRect,smoothing) {
		this.bitmapData.drawToSurface(cnv,ctx,matrix,ctr,blendMode,clipRect,smoothing);
	}
	,hitTestLocal: function(x,y,p,v) {
		return (!v || this.visible) && this.bitmapData != null && x >= 0 && y >= 0 && x < this.bitmapData.component.width && y < this.bitmapData.component.height;
	}
	,__class__: openfl_display_Bitmap
});
var openfl_display_IGraphics = function() { };
$hxClasses["openfl.display.IGraphics"] = openfl_display_IGraphics;
openfl_display_IGraphics.__name__ = ["openfl","display","IGraphics"];
openfl_display_IGraphics.__interfaces__ = [openfl_display_IBitmapDrawable];
var openfl_display_Graphics = function() {
	this.rgPending = false;
	this.synced = true;
	this.component = openfl_Lib.jsNode("canvas");
	this.component.setAttribute("node",Type.getClassName(js_Boot.getClass(this)));
	this.context = this.component.getContext("2d",null);
	this.context.save();
	this.bounds = new openfl_geom_Rectangle();
	this.resetBounds();
	this.irec = [];
	this.frec = [];
	this.arec = [];
	this.lineWidth = this.ilen = this.flen = this.alen = 0;
};
$hxClasses["openfl.display.Graphics"] = openfl_display_Graphics;
openfl_display_Graphics.__name__ = ["openfl","display","Graphics"];
openfl_display_Graphics.__interfaces__ = [openfl_display_IGraphics,openfl_display_IBitmapDrawable];
openfl_display_Graphics.prototype = {
	regenerate: function() {
		var o = this.component;
		var s = this.component.style;
		var q = this.context;
		var b = this.bounds;
		var bx = ~(~(b.x - 2));
		var by = ~(~(b.y - 2));
		var bw = Math.ceil(b.width + 4);
		var bh = Math.ceil(b.height + 4);
		this.synced = true;
		this.rgPending = false;
		if(b.width <= 0 || b.height <= 0) {
			o.width = o.height = 1;
			s.top = s.left = "0";
			return;
		}
		if(this.offsetX != bx || this.offsetY != by) {
			s.left = (this.offsetX = bx) + "px";
			s.top = (this.offsetY = by) + "px";
		}
		if(bw != o.width || bh != o.height) {
			o.width = bw;
			o.height = bh;
		} else q.clearRect(0,0,bw,bh);
		q.save();
		q.translate(-bx,-by);
		this.render(o,q);
		q.restore();
	}
	,regenerateTask: function() {
		if(this.rgPending) this.regenerate();
	}
	,requestRegeneration: function() {
		openfl_Lib.schedule($bind(this,this.regenerateTask));
		this.rgPending = true;
	}
	,set_displayObject: function(v) {
		if(this.displayObject != v) {
			this.displayObject = v;
			if(!this.synced) this.requestRegeneration();
		}
		return v;
	}
	,resetBounds: function() {
		this.bounds.setVoid();
		this.invalidate();
	}
	,grab: function(x,y,r,b) {
		var i;
		if(x < (i = this.bounds.x)) {
			i = i - x;
			this.bounds.x -= i;
			this.bounds.width += i;
		}
		if(y < (i = this.bounds.y)) {
			i = i - y;
			this.bounds.y -= i;
			this.bounds.height += i;
		}
		if(r > (i = this.bounds.get_right())) this.bounds.width += r - i;
		if(b > (i = this.bounds.get_bottom())) this.bounds.height += b - i;
		this.invalidate();
	}
	,invalidate: function() {
		if(this.synced) {
			this.synced = false;
			if(!this.rgPending && this.displayObject != null && this.displayObject.get_stage() != null) this.requestRegeneration();
		}
	}
	,clear: function() {
		var i = 0;
		while(i < this.alen) this.arec[i++] = null;
		this.lineWidth = this.ilen = this.flen = this.alen = 0;
		this.resetBounds();
		this.invalidate();
	}
	,beginFill: function(c,a) {
		this.irec[this.ilen++] = 2;
		var v = openfl_Lib.rgbf(c != null?c:0,a != null?a:1);
		this.arec[this.alen++] = v;
	}
	,endFill: function() {
		this.irec[this.ilen++] = 9;
		this.invalidate();
	}
	,drawRect: function(x,y,w,h) {
		this.irec[this.ilen++] = 13;
		var r = this.frec;
		var l = this.flen;
		r[l++] = x;
		r[l++] = y;
		r[l++] = w;
		r[l++] = h;
		this.flen = l;
		var r1 = this.lineWidth / 2;
		this.grab(x - r1,y - r1,x + w + r1,y + h + r1);
	}
	,drawCircle: function(x,y,q) {
		this.irec[this.ilen++] = 14;
		var r = this.frec;
		var l = this.flen;
		r[l++] = x;
		r[l++] = y;
		r[l++] = q;
		this.flen = l;
		var r1 = q;
		r1 += this.lineWidth / 2;
		this.grab(x - r1,y - r1,x + r1,y + r1);
	}
	,drawToSurface: function(cnv,ctx,mtx,ctr,blendMode,clipRect,smoothing) {
		ctx.save();
		if(mtx != null) ctx.transform(mtx.a,mtx.b,mtx.c,mtx.d,mtx.tx,mtx.ty);
		this.render(cnv,ctx);
		ctx.restore();
	}
	,hitTestLocal: function(x,y,p) {
		if(this.bounds.contains(x,y)) {
			if(p) {
				if(!this.synced) this.regenerate();
				try {
					return this.context.getImageData(x - this.offsetX,y - this.offsetY,1,1).data[3] != 0;
				} catch( _ ) {
					if (_ instanceof js__$Boot_HaxeError) _ = _.val;
				}
			}
			return true;
		}
		return false;
	}
	,_closePath: function(cnv,ctx,f,m,texture) {
		if(f & 1) {
			ctx.closePath();
			if(f & 4) {
				ctx.save();
				ctx.transform(m.a,m.b,m.c,m.d,m.tx,m.ty);
				ctx.fillStyle = ctx.createPattern(texture,f & 8?"repeat":"no-repeat");
				ctx.fill();
				ctx.restore();
			} else ctx.fill();
		}
		if(f & 2) ctx.stroke();
		ctx.beginPath();
		return f;
	}
	,render: function(cnv,ctx) {
		var f = 0;
		var p = -1;
		var m = this._drawMatrix;
		var v;
		var i;
		var d;
		var n = 0;
		var tex = null;
		var ir = this.irec;
		var ip = -1;
		var il = ir.length - 1;
		var ar = this.arec;
		var ap = -1;
		var nr = this.frec;
		var np = -1;
		if(m == null) this._drawMatrix = m = new openfl_geom_Matrix();
		ctx.save();
		while(ip < il) {
			var _g = i = ir[++ip];
			switch(_g) {
			case 1:
				if(n > 0) f = this._closePath(cnv,ctx,f,m,tex);
				ctx.lineWidth = d = nr[++np];
				if(d > 0) {
					f |= 2;
					ctx.strokeStyle = ar[++ap];
					if((i = ir[++ip]) == 2) ctx.lineCap = "butt"; else if(i == 1) ctx.lineCap = "square"; else ctx.lineCap = "round";
					if((i = ir[++ip]) == 2) ctx.lineJoin = "bevel"; else if(i == 1) ctx.lineJoin = "miter"; else ctx.lineJoin = "round";
				} else {
					f &= -3;
					ctx.strokeStyle = null;
				}
				break;
			case 2:case 3:case 4:
				if(n > 0) f = this._closePath(cnv,ctx,f,m,tex);
				f |= 1;
				if(i == 3) {
					tex = ar[++ap].handle();
					i = ir[++ip];
					if(ir[++ip] != 0) {
						if(i != 0) f |= 8; else f &= -9;
						m.a = nr[++np];
						m.b = nr[++np];
						m.c = nr[++np];
						m.d = nr[++np];
						m.tx = nr[++np];
						m.ty = nr[++np];
						f |= 4;
					} else {
						ctx.fillStyle = ctx.createPattern(tex,i != 0?"repeat":"no-repeat");
						f &= -5;
					}
				} else {
					ctx.fillStyle = ar[++ap];
					f &= -5;
				}
				n = 0;
				break;
			case 9:
				if(n > 0) {
					f = this._closePath(cnv,ctx,f,m,tex);
					n = 0;
				}
				f &= -2;
				break;
			case 10:
				ctx.moveTo(nr[++np],nr[++np]);
				n++;
				break;
			case 11:
				ctx.lineTo(nr[++np],nr[++np]);
				n++;
				break;
			case 12:
				ctx.quadraticCurveTo(nr[++np],nr[++np],nr[++np],nr[++np]);
				n++;
				break;
			case 13:
				ctx.rect(nr[++np],nr[++np],nr[++np],nr[++np]);
				n++;
				break;
			case 14:
				var x = nr[++np];
				var y = nr[++np];
				var r = nr[++np];
				if(r < 0) r = -r;
				ctx.moveTo(x + r,y);
				if(r != 0) ctx.arc(x,y,r,0,Math.PI * 2,true);
				n++;
				break;
			case 17:
				var x1 = nr[++np];
				var y1 = nr[++np];
				var w = nr[++np];
				var h = nr[++np];
				var x11 = x1 + w / 2;
				var y11 = y1 + h / 2;
				var x2 = x1 + w;
				var y2 = y1 + h;
				var m1 = 0.275892;
				var xm = w * m1;
				var ym = h * m1;
				ctx.moveTo(x11,y1);
				ctx.bezierCurveTo(x11 + xm,y1,x2,y11 - ym,x2,y11);
				ctx.bezierCurveTo(x2,y11 + ym,x11 + xm,y2,x11,y2);
				ctx.bezierCurveTo(x11 - xm,y2,x1,y11 + ym,x1,y11);
				ctx.bezierCurveTo(x1,y11 - ym,x11 - xm,y1,x11,y1);
				n++;
				break;
			case 15:
				var x3 = nr[++np];
				var y3 = nr[++np];
				var w1 = nr[++np];
				var h1 = nr[++np];
				var u = nr[++np];
				var q = nr[++np];
				if(q == null) {
					ctx.moveTo(x3 + u,y3 + h1);
					ctx.arcTo(x3 + w1 - u,y3 + h1 - u,x3 + w1,y3 + h1 - u,u);
					ctx.arcTo(x3 + w1,y3 + u,x3 + w1 - u,y3,u);
					ctx.arcTo(x3 + u,y3,x3,y3 + u,u);
					ctx.arcTo(x3 + u,y3 + h1 - u,x3 + u,y3 + h1,u);
				} else {
					ctx.moveTo(x3 + u,y3 + h1);
					ctx.lineTo(x3 + w1 - u,y3 + h1);
					ctx.quadraticCurveTo(x3 + w1,y3 + h1,x3 + w1,y3 + h1 - q);
					ctx.lineTo(x3 + w1,y3 + q);
					ctx.quadraticCurveTo(x3 + w1,y3,x3 + w1 - u,y3);
					ctx.lineTo(x3 + u,y3);
					ctx.quadraticCurveTo(x3,y3,x3,y3 + q);
					ctx.lineTo(x3,y3 + h1 - q);
					ctx.quadraticCurveTo(x3,y3 + h1,x3 + u,y3 + h1);
				}
				n++;
				break;
			case 16:
				var tex1 = ar[++ap];
				var d1 = tex1.handle();
				var fx = ir[++ip];
				var fs = (fx & 1) != 0;
				var fr = (fx & 2) != 0;
				var fc = (fx & 4) != 0;
				var fa = (fx & 8) != 0;
				var fm = (fx & 16) != 0;
				var c = ir[++ip];
				var tx;
				var ty;
				var ox;
				var oy;
				var rx;
				var ry;
				var rw;
				var rh;
				ctx.save();
				if((fx & 65536) != 0) ctx.globalCompositeOperation = "lighter"; else ctx.globalCompositeOperation = "source-over";
				while(--c >= 0) {
					tx = nr[++np];
					ty = nr[++np];
					ox = nr[++np];
					oy = nr[++np];
					rx = nr[++np];
					ry = nr[++np];
					rw = nr[++np];
					rh = nr[++np];
					ctx.save();
					if(fm) ctx.transform(nr[++np],nr[++np],nr[++np],nr[++np],tx,ty); else {
						ctx.translate(tx,ty);
						if(fs) ctx.scale(v = nr[++np],v);
						if(fr) ctx.rotate(nr[++np]);
					}
					if(fc) p += 3;
					if(fa) ctx.globalAlpha = nr[++np];
					ctx.drawImage(d1,rx,ry,rw,rh,-ox,-oy,rw,rh);
					ctx.restore();
				}
				ctx.restore();
				break;
			default:
				throw new js__$Boot_HaxeError(new openfl_errors_Error("Unknown operation " + i,4000 + i));
			}
		}
		if(n > 0) f = this._closePath(cnv,ctx,f,m,tex);
		ctx.restore();
	}
	,__class__: openfl_display_Graphics
};
var openfl_display_ILoader = function() { };
$hxClasses["openfl.display.ILoader"] = openfl_display_ILoader;
openfl_display_ILoader.__name__ = ["openfl","display","ILoader"];
openfl_display_ILoader.prototype = {
	__class__: openfl_display_ILoader
};
var openfl_display_Loader = function() {
	openfl_display_Sprite.call(this);
	this.contentLoaderInfo = openfl_display_LoaderInfo.create(this);
};
$hxClasses["openfl.display.Loader"] = openfl_display_Loader;
openfl_display_Loader.__name__ = ["openfl","display","Loader"];
openfl_display_Loader.__interfaces__ = [openfl_display_ILoader];
openfl_display_Loader.__super__ = openfl_display_Sprite;
openfl_display_Loader.prototype = $extend(openfl_display_Sprite.prototype,{
	load: function(request,context) {
		var extension = "";
		var i;
		var parts = request.url.split(".");
		if(parts.length > 0) extension = parts[parts.length - 1].toLowerCase();
		var url = request.url;
		var p = url.lastIndexOf(".");
		if(p < 0) throw new js__$Boot_HaxeError("Extension must be specified, got \"" + url + "\"");
		var ct;
		var bt = true;
		var ext = url.substring(p + 1);
		switch(ext) {
		case "swf":
			ct = "application/x-shockwave-flash";
			break;
		case "png":
			ct = "image/png";
			break;
		case "gif":
			ct = "image/gif";
			break;
		case "jpg":case "jpeg":
			bt = false;
			ct = "image/jpeg";
			break;
		default:
			throw new js__$Boot_HaxeError("Unrecognized extension \"" + ext + "\" in \"" + url + "\"");
		}
		this.contentLoaderInfo.url = url;
		this.contentLoaderInfo.contentType = ct;
		this.mImage = new openfl_display_BitmapData(0,0,bt);
		try {
			this.contentLoaderInfo.addEventListener("complete",$bind(this,this.handleLoad),false);
			this.mImage.nmeLoadFromFile(request.url,this.contentLoaderInfo);
			this.content = new openfl_display_Bitmap(this.mImage);
			this.contentLoaderInfo.content = this.content;
			this.addChild(this.content);
		} catch( e ) {
			if (e instanceof js__$Boot_HaxeError) e = e.val;
			console.log("Error " + Std.string(e));
			var evt = new openfl_events_IOErrorEvent("ioError");
			evt.set_currentTarget(this);
			this.contentLoaderInfo.dispatchEvent(evt);
			return;
		}
		if(this.mShape == null) {
			this.mShape = new openfl_display_Shape();
			this.addChild(this.mShape);
		}
	}
	,handleLoad: function(e) {
		e.set_currentTarget(this);
		this.contentLoaderInfo.removeEventListener("complete",$bind(this,this.handleLoad));
	}
	,__class__: openfl_display_Loader
});
var openfl_display_LoaderInfo = function() {
	openfl_events_EventDispatcher.call(this);
	this.bytesLoaded = this.bytesTotal = 0;
	this.childAllowsParent = true;
	this.parameters = { };
};
$hxClasses["openfl.display.LoaderInfo"] = openfl_display_LoaderInfo;
openfl_display_LoaderInfo.__name__ = ["openfl","display","LoaderInfo"];
openfl_display_LoaderInfo.create = function(o) {
	var r = new openfl_display_LoaderInfo();
	if(o != null) r.loader = o; else r.url = "";
	return r;
};
openfl_display_LoaderInfo.__super__ = openfl_events_EventDispatcher;
openfl_display_LoaderInfo.prototype = $extend(openfl_events_EventDispatcher.prototype,{
	__class__: openfl_display_LoaderInfo
});
var openfl_display_MovieClip = function() {
	openfl_display_Sprite.call(this);
	this.enabled = true;
	this.qIndex = this.qTotal = 0;
	this.loaderInfo = openfl_display_LoaderInfo.create();
};
$hxClasses["openfl.display.MovieClip"] = openfl_display_MovieClip;
openfl_display_MovieClip.__name__ = ["openfl","display","MovieClip"];
openfl_display_MovieClip.__super__ = openfl_display_Sprite;
openfl_display_MovieClip.prototype = $extend(openfl_display_Sprite.prototype,{
	__class__: openfl_display_MovieClip
});
var openfl_display_RoundRect = function(w,h,c,r) {
	if(r == null) r = 0;
	if(c == null) c = 0;
	if(h == null) h = 0;
	if(w == null) w = 0;
	openfl_display_Sprite.call(this);
	this.set_width(w);
	this.set_height(h);
	this.set_color(c);
	this.set_radius(r);
};
$hxClasses["openfl.display.RoundRect"] = openfl_display_RoundRect;
openfl_display_RoundRect.__name__ = ["openfl","display","RoundRect"];
openfl_display_RoundRect.__super__ = openfl_display_Sprite;
openfl_display_RoundRect.prototype = $extend(openfl_display_Sprite.prototype,{
	get_width: function() {
		return this.__width;
	}
	,get_height: function() {
		return this.__height;
	}
	,set_width: function(f) {
		if(this.__width != f) {
			this.__width = f;
			this.component.style.width = f + "px";
		}
		return f;
	}
	,set_height: function(f) {
		if(this.__height != f) {
			this.__height = f;
			this.component.style.height = f + "px";
		}
		return f;
	}
	,set_color: function(c) {
		if(this.__color != c) {
			this.__color = c;
			this.component.style.backgroundColor = openfl_Lib.rgba(c);
		}
		return c;
	}
	,set_radius: function(f) {
		if(this.__radius != f) {
			this.__radius = f;
			if(f > 0) this.component.style.borderRadius = f + "px"; else this.component.style.borderRadius = "";
		}
		return f;
	}
	,hitTestLocal: function(x,y,p,v) {
		if(openfl_display_Sprite.prototype.hitTestLocal.call(this,x,y,p,v)) return true;
		return (!v || this.visible) && x >= 0 && y >= 0 && x < this.__width && y < this.__height;
	}
	,__class__: openfl_display_RoundRect
});
var openfl_display_Shape = function() {
	(this.graphics = new openfl_display_Graphics()).set_displayObject(this);
	this.component = this.graphics.component;
	openfl_display_DisplayObject.call(this);
};
$hxClasses["openfl.display.Shape"] = openfl_display_Shape;
openfl_display_Shape.__name__ = ["openfl","display","Shape"];
openfl_display_Shape.__interfaces__ = [openfl_display_IBitmapDrawable];
openfl_display_Shape.__super__ = openfl_display_DisplayObject;
openfl_display_Shape.prototype = $extend(openfl_display_DisplayObject.prototype,{
	drawToSurface: function(cnv,ctx,mtx,ctr,blendMode,clipRect,smoothing) {
		this.graphics.drawToSurface(cnv,ctx,mtx,ctr,blendMode,clipRect,smoothing);
	}
	,set_stage: function(v) {
		var z = this.get_stage() == null && v != null;
		var r = openfl_display_DisplayObject.prototype.set_stage.call(this,v);
		if(z) this.graphics.invalidate();
		return r;
	}
	,hitTestLocal: function(x,y,p,v) {
		return (!v || this.visible) && this.graphics.hitTestLocal(x,y,p);
	}
	,__class__: openfl_display_Shape
});
var openfl_errors_Error = function(message,id) {
	if(id == null) id = 0;
	if(message == null) message = "";
	this.message = message;
	this.errorID = id;
};
$hxClasses["openfl.errors.Error"] = openfl_errors_Error;
openfl_errors_Error.__name__ = ["openfl","errors","Error"];
openfl_errors_Error.prototype = {
	toString: function() {
		if(this.message != null) return this.message; else return "Error";
	}
	,__class__: openfl_errors_Error
};
var openfl_events_Event = function(type,bubbles,cancelable) {
	if(cancelable == null) cancelable = false;
	if(bubbles == null) bubbles = false;
	this.type = type;
	this.bubbles = bubbles;
	this.cancelable = cancelable;
};
$hxClasses["openfl.events.Event"] = openfl_events_Event;
openfl_events_Event.__name__ = ["openfl","events","Event"];
openfl_events_Event.prototype = {
	get_target: function() {
		return this._target || this.target;
	}
	,set_target: function(v) {
		return this._target = v;
	}
	,set_currentTarget: function(v) {
		return this._current = v;
	}
	,__class__: openfl_events_Event
};
var openfl_events_IOErrorEvent = function(type,bubbles,cancelable,inText) {
	if(inText == null) inText = "";
	if(cancelable == null) cancelable = false;
	if(bubbles == null) bubbles = false;
	openfl_events_Event.call(this,type,bubbles,cancelable);
	this.text = inText;
};
$hxClasses["openfl.events.IOErrorEvent"] = openfl_events_IOErrorEvent;
openfl_events_IOErrorEvent.__name__ = ["openfl","events","IOErrorEvent"];
openfl_events_IOErrorEvent.__super__ = openfl_events_Event;
openfl_events_IOErrorEvent.prototype = $extend(openfl_events_Event.prototype,{
	__class__: openfl_events_IOErrorEvent
});
var openfl_events_KeyboardEvent = function() { };
$hxClasses["openfl.events.KeyboardEvent"] = openfl_events_KeyboardEvent;
openfl_events_KeyboardEvent.__name__ = ["openfl","events","KeyboardEvent"];
openfl_events_KeyboardEvent.__super__ = openfl_events_Event;
openfl_events_KeyboardEvent.prototype = $extend(openfl_events_Event.prototype,{
	__class__: openfl_events_KeyboardEvent
});
var openfl_events_UIEvent = function(type,bubbles,cancelable) {
	openfl_events_Event.call(this,type,bubbles,cancelable);
};
$hxClasses["openfl.events.UIEvent"] = openfl_events_UIEvent;
openfl_events_UIEvent.__name__ = ["openfl","events","UIEvent"];
openfl_events_UIEvent.__super__ = openfl_events_Event;
openfl_events_UIEvent.prototype = $extend(openfl_events_Event.prototype,{
	__class__: openfl_events_UIEvent
});
var openfl_events_MouseEvent = function(type,bubbles,cancelable,lx,ly,obj,ctrlKey,altKey,shiftKey,bt,delta) {
	openfl_events_UIEvent.call(this,type,bubbles != null?bubbles:true,cancelable != null?cancelable:false);
	this.ctrlKey = ctrlKey != null?ctrlKey:false;
	this.altKey = altKey != null?altKey:false;
	this.shiftKey = shiftKey != null?shiftKey:false;
	this.relatedObject = obj;
	this.buttonDown = bt != null?bt:false;
	this.delta = delta != null?delta:0;
};
$hxClasses["openfl.events.MouseEvent"] = openfl_events_MouseEvent;
openfl_events_MouseEvent.__name__ = ["openfl","events","MouseEvent"];
openfl_events_MouseEvent.__super__ = openfl_events_UIEvent;
openfl_events_MouseEvent.prototype = $extend(openfl_events_UIEvent.prototype,{
	__class__: openfl_events_MouseEvent
});
var openfl_events_TouchEvent = function(type,bubbles,cancelable,id,primary,lx,ly,sx,sy,ps,obj,ctrl,alt,shift) {
	openfl_events_UIEvent.call(this,type,bubbles,cancelable);
	this.altKey = alt;
	this.shiftKey = shift;
	this.ctrlKey = ctrl;
	this.touchPointID = id;
	this.sizeX = sx;
	this.sizeY = sy;
	this.pressure = ps;
};
$hxClasses["openfl.events.TouchEvent"] = openfl_events_TouchEvent;
openfl_events_TouchEvent.__name__ = ["openfl","events","TouchEvent"];
openfl_events_TouchEvent.__super__ = openfl_events_UIEvent;
openfl_events_TouchEvent.prototype = $extend(openfl_events_UIEvent.prototype,{
	__class__: openfl_events_TouchEvent
});
var openfl_filters_BitmapFilter = function() { };
$hxClasses["openfl.filters.BitmapFilter"] = openfl_filters_BitmapFilter;
openfl_filters_BitmapFilter.__name__ = ["openfl","filters","BitmapFilter"];
var openfl_geom_Rectangle = function(a,b,c,d) {
	if(d == null) d = 0;
	if(c == null) c = 0;
	if(b == null) b = 0;
	if(a == null) a = 0;
	this.x = a;
	this.y = b;
	this.width = c;
	this.height = d;
};
$hxClasses["openfl.geom.Rectangle"] = openfl_geom_Rectangle;
openfl_geom_Rectangle.__name__ = ["openfl","geom","Rectangle"];
openfl_geom_Rectangle.prototype = {
	clone: function() {
		return new openfl_geom_Rectangle(this.x,this.y,this.width,this.height);
	}
	,equals: function(o) {
		return this.x == o.x && this.y == o.y && this.width == o.width && this.height == o.height;
	}
	,setVoid: function() {
		this.width -= 2147483647 - this.x;
		this.x = 2147483647;
		this.width = -2147483648 - this.x;
		-2147483648;
		this.height -= 2147483647 - this.y;
		this.y = 2147483647;
		this.height = -2147483648 - this.y;
		-2147483648;
	}
	,get_right: function() {
		return this.x + this.width;
	}
	,get_bottom: function() {
		return this.y + this.height;
	}
	,contains: function(u,v) {
		return (u -= this.x) >= 0 && (v -= this.y) >= 0 && u < this.width && v < this.height;
	}
	,__class__: openfl_geom_Rectangle
};
var openfl_media_Sound = function() { };
$hxClasses["openfl.media.Sound"] = openfl_media_Sound;
openfl_media_Sound.__name__ = ["openfl","media","Sound"];
openfl_media_Sound.__super__ = openfl_events_EventDispatcher;
openfl_media_Sound.prototype = $extend(openfl_events_EventDispatcher.prototype,{
	__class__: openfl_media_Sound
});
var openfl_net_FileFilter = function(d,x,m) {
	this.description = d;
	this.extension = x;
	this.macType = m;
};
$hxClasses["openfl.net.FileFilter"] = openfl_net_FileFilter;
openfl_net_FileFilter.__name__ = ["openfl","net","FileFilter"];
openfl_net_FileFilter.prototype = {
	__class__: openfl_net_FileFilter
};
var openfl_net_FileReference = function() {
	openfl_events_EventDispatcher.call(this);
};
$hxClasses["openfl.net.FileReference"] = openfl_net_FileReference;
openfl_net_FileReference.__name__ = ["openfl","net","FileReference"];
openfl_net_FileReference.__super__ = openfl_events_EventDispatcher;
openfl_net_FileReference.prototype = $extend(openfl_events_EventDispatcher.prototype,{
	browse: function(f) {
		var h = openfl_Lib.jsHelper();
		var o;
		var q = this.fileForm;
		var s;
		var i;
		var l;
		var p;
		var fs;
		var x;
		if(q == null) {
			this.fileInput = o = document.createElement("input");
			this.fileForm = q = document.createElement("form");
			this.fileForm.appendChild(o);
			o.type = "file";
			o.onchange = $bind(this,this.onFileChange);
		} else {
			o = this.fileInput;
			q.reset();
		}
		s = "";
		if(f != null) {
			i = -1;
			l = f.length;
			while(++i < l) {
				if(s != "") s += ";";
				s += f[i].extension;
			}
			fs = s.split(";");
			s = "";
			i = -1;
			l = fs.length;
			while(++i < l) if((p = fs[i].lastIndexOf(".")) != -1) {
				if((x = HxOverrides.substr(fs[i],p,null)) != ".*") {
					if(s != "") s += ",";
					s += x;
				}
			}
		}
		o.accept = s;
		h.appendChild(q);
		o.click();
		h.removeChild(q);
		return true;
	}
	,save: function(d,n) {
		if(n == null) n = "";
		var q = this.fileLink;
		var h = openfl_Lib.jsHelper();
		var b;
		var t = "application/octet-stream";
		if(q == null) this.fileLink = q = document.createElement("a");
		try {
			b = new Blob([d.byteView],{ type : t});
			var nav = window.navigator;
			if(nav.msSaveBlob != null) {
				nav.msSaveBlob(b,n);
				return;
			}
			if(window.saveAs != null) try {
				window.saveAs(b,n);
				return;
			} catch( _ ) {
				if (_ instanceof js__$Boot_HaxeError) _ = _.val;
			}
			q.href = URL.createObjectURL(b);
		} catch( _1 ) {
			if (_1 instanceof js__$Boot_HaxeError) _1 = _1.val;
			q.href = "data:" + t + ";base64," + d.toBase64();
		}
		q.target = "_blank";
		q.download = n;
		q.setAttribute("download",n);
		h.appendChild(q);
		q.click();
		h.removeChild(q);
	}
	,load: function() {
		var _g = this;
		if(this.file != null) try {
			var r = new FileReader();
			r.readAsArrayBuffer(this.file);
			this.data = null;
			this.dispatchEvent(new openfl_events_Event("open"));
			r.onload = function(_) {
				_g.data = openfl_utils_ByteArray.nmeOfBuffer(r.result);
				_g.dispatchEvent(new openfl_events_Event("complete"));
			};
			r.onerror = function(_1) {
				_g.dispatchEvent(new openfl_events_IOErrorEvent("ioError",false,false,"Failed to load the file."));
			};
		} catch( _2 ) {
			if (_2 instanceof js__$Boot_HaxeError) _2 = _2.val;
			throw new js__$Boot_HaxeError("Failed to dispatch FileReader.");
		}
	}
	,onFileChange: function(_) {
		this.file = this.fileInput.files[0];
		if(this.file != null) this.dispatchEvent(new openfl_events_Event("select"));
	}
	,get_name: function() {
		return this.file.name;
	}
	,__class__: openfl_net_FileReference
});
var openfl_net_IURLLoader = function() { };
$hxClasses["openfl.net.IURLLoader"] = openfl_net_IURLLoader;
openfl_net_IURLLoader.__name__ = ["openfl","net","IURLLoader"];
openfl_net_IURLLoader.__interfaces__ = [openfl_events_IEventDispatcher];
openfl_net_IURLLoader.prototype = {
	__class__: openfl_net_IURLLoader
};
var openfl_net_URLRequest = function(inURL) {
	if(inURL != null) this.url = inURL;
	this.requestHeaders = [];
	this.method = "GET";
	this.contentType = null;
};
$hxClasses["openfl.net.URLRequest"] = openfl_net_URLRequest;
openfl_net_URLRequest.__name__ = ["openfl","net","URLRequest"];
openfl_net_URLRequest.prototype = {
	__class__: openfl_net_URLRequest
};
var openfl_net_URLRequestHeader = function() { };
$hxClasses["openfl.net.URLRequestHeader"] = openfl_net_URLRequestHeader;
openfl_net_URLRequestHeader.__name__ = ["openfl","net","URLRequestHeader"];
var openfl_text_Font = function() { };
$hxClasses["openfl.text.Font"] = openfl_text_Font;
openfl_text_Font.__name__ = ["openfl","text","Font"];
var openfl_text_TextField = function() {
	this.__editable = false;
	this.__text = "";
	this.__autoSize = -1;
	this.wordWrap = false;
	this.multiline = false;
	this.maxChars = 0;
	this.border = false;
	openfl_display_InteractiveObject.call(this);
	var s = this.component.style;
	s.whiteSpace = "nowrap";
	s.overflow = "hidden";
	s.padding = 1.5 + "px";
	this.__textFormat = new openfl_text_TextFormat("Times New Roman",12,0,false,false,false,"","","LEFT",0,0,0,0);
	this.__width = 100;
	this.__height = 100;
	this.__applySize(3);
	this.__applyTextFormat();
};
$hxClasses["openfl.text.TextField"] = openfl_text_TextField;
openfl_text_TextField.__name__ = ["openfl","text","TextField"];
openfl_text_TextField.__interfaces__ = [openfl_display_IBitmapDrawable];
openfl_text_TextField.__super__ = openfl_display_InteractiveObject;
openfl_text_TextField.prototype = $extend(openfl_display_InteractiveObject.prototype,{
	get_defaultTextFormat: function() {
		return this.__textFormat.clone();
	}
	,__applyType: function(v) {
		var c = this.component;
		var s = this.get_text();
		if(this.__editable = v) {
			var e = openfl_Lib.jsNode(this.multiline?"textarea":"input");
			e.value = s;
			if(this.maxChars > 0) e.maxLength = this.maxChars; else e.maxLength = 2147483647;
			var s1 = e.style;
			s1.border = "0";
			s1.padding = "0";
			s1.background = "transparent";
			c.appendChild(this.__field = e);
		} else {
			c.removeChild(this.__field);
			this.__field = null;
		}
	}
	,__applyTextFormat: function() {
		this.__textFormatSync = true;
		var f = this.__textFormat;
		var s;
		s = (this.__editable?this.__field:this.component).style;
		this.__fontStyle = s.font = f.get_fontStyle();
		s.lineHeight = "1.25";
		s.textAlign = f.align;
		if(f.bold) s.fontWeight = "bold"; else s.fontWeight = "";
		if(f.italic) s.fontStyle = "italic"; else s.fontStyle = "";
		if(f.underline) s.textDecoration = "underline"; else s.textDecoration = "";
		s.color = openfl_Lib.rgbf(f.color,1);
	}
	,__applyText: function(s) {
		this.__text = s;
		if(this.__editable) this.__field.value = s; else if(this.component.innerText == null) this.component.innerHTML = StringTools.replace(StringTools.htmlEscape(s),"\n","<br>"); else this.component.innerText = s;
		this.__applyAutoSize();
	}
	,__applySize: function(m) {
		var s = this.component.style;
		var e = this.__editable;
		var fs;
		if(e) fs = this.__field.style; else fs = null;
		var n = 1;
		while(n < 4) {
			if((m & n) != 0) {
				var f;
				if(n == 1) f = this.__width; else f = this.__height;
				if(n == 1 && this.__autoSize >= 0 && !this.wordWrap) f = null;
				var v;
				if(f != null) {
					if(this.border) f -= 1;
					f -= 3.0;
					v = f + "px";
				} else v = "";
				if(n == 1) {
					s.width = v;
					if(e) fs.width = v;
				} else {
					s.height = v;
					if(e) fs.height = v;
				}
			}
			n <<= 1;
		}
	}
	,get_text: function() {
		if(this.__editable) return this.__field.value; else return this.__text;
	}
	,set_text: function(s) {
		if(this.get_text() != s) this.__applyText(s);
		if(!this.__textFormatSync) this.__applyTextFormat();
		return s;
	}
	,setSelection: function(v,o) {
		if(this.__editable) this.__field.setSelectionRange(v,o);
	}
	,drawToSurface: function(cnv,ctx,mtx,ctr,blendMode,clipRect,smoothing) {
		ctx.save();
		ctx.fillStyle = this.component.style.color;
		ctx.font = this.__fontStyle;
		ctx.textBaseline = "top";
		ctx.textAlign = this.__textFormat.align;
		ctx.fillText(this.get_text(),0,0);
		ctx.restore();
	}
	,get_width: function() {
		if(this.__autoSize < 0) return this.__width; else return this.get_textWidth();
	}
	,get_height: function() {
		if(this.__autoSize < 0) return this.__height; else return this.get_textHeight();
	}
	,set_height: function(v) {
		if(this.__height != v) {
			this.__height = v;
			this.__applySize(2);
		}
		return v;
	}
	,__measurePre: function() {
		var o = openfl_Lib.jsHelper();
		o.setAttribute("style",this.component.getAttribute("style"));
		var s = o.style;
		if(!this.wordWrap) s.width = "";
		s.height = "";
		s.paddingTop = "";
		s.paddingBottom = "";
		s.borderTop = "";
		s.borderBottom = "";
		o.innerHTML = this.component.innerHTML;
		return o;
	}
	,__measurePost: function(o) {
		o.setAttribute("style","");
		o.innerHTML = "";
	}
	,get_textWidth: function() {
		if(this.get_stage() == null) {
			var o = this.__measurePre();
			var r = o.clientWidth;
			this.__measurePost(o);
			return r;
		}
		return this.component.clientWidth;
	}
	,get_textHeight: function() {
		if(this.get_stage() == null) {
			var o = this.__measurePre();
			var r = o.clientHeight;
			this.__measurePost(o);
			return r;
		}
		return this.component.clientHeight;
	}
	,__applyAutoSize: function() {
		var f = this.__autoSize;
		var s = this.component.style;
		if(f >= 0 && !this.__editable) {
			if(f > 0) s.left = (this.__width - this.get_textWidth()) * f / 2 + "px"; else s.left = "";
			if(!this.wordWrap) s.width = "";
			s.height = "";
		} else {
			s.left = "";
			this.__applySize(3);
		}
	}
	,set_type: function(s) {
		var v = s == "INPUT";
		if(v != this.__editable) this.__applyType(v);
		return s;
	}
	,set_multiline: function(v) {
		if(this.multiline != v) {
			this.multiline = v;
			if(this.__editable) this.__applyType(true);
		}
		return v;
	}
	,giveFocus: function() {
		(this.__editable?this.__field:this.component).focus();
	}
	,get_selectionBeginIndex: function() {
		if(this.__editable) return this.__field.selectionStart; else return 0;
	}
	,get_selectionEndIndex: function() {
		if(this.__editable) return this.__field.selectionEnd; else return 0;
	}
	,hitTestLocal: function(x,y,p,v) {
		return (!v || this.visible) && x >= 0 && y >= 0 && x < this.get_width() && y < this.get_height();
	}
	,addEventListener: function(type,listener,useCapture,priority,weak) {
		if(weak == null) weak = false;
		if(priority == null) priority = 0;
		if(useCapture == null) useCapture = false;
		var o = this.component;
		if(this.__editable) this.component = this.__field;
		openfl_display_InteractiveObject.prototype.addEventListener.call(this,type,listener,useCapture,priority,weak);
		if(this.__editable) this.component = o;
	}
	,removeEventListener: function(type,listener,useCapture) {
		if(useCapture == null) useCapture = false;
		var o = this.component;
		if(this.__editable) this.component = this.__field;
		openfl_display_InteractiveObject.prototype.removeEventListener.call(this,type,listener,useCapture);
		if(this.__editable) this.component = o;
	}
	,__class__: openfl_text_TextField
});
var openfl_text_TextFormat = function(font,size,color,bold,italic,underline,url,target,align,leftMargin,rightMargin,indent,leading) {
	this.font = font;
	this.size = size;
	this.color = color;
	this.bold = bold;
	this.italic = italic;
	this.underline = underline;
	this.url = url;
	this.target = target;
	this.align = align;
	this.leftMargin = leftMargin;
	this.rightMargin = rightMargin;
	this.indent = indent;
	this.leading = leading;
	this.tabStops = [];
};
$hxClasses["openfl.text.TextFormat"] = openfl_text_TextFormat;
openfl_text_TextFormat.__name__ = ["openfl","text","TextFormat"];
openfl_text_TextFormat.translateFont = function(n) {
	switch(n) {
	case "_sans":
		return "sans-serif";
	case "_serif":
		return "serif";
	case "_typewriter":
		return "monospace";
	default:
		if(n == null) return "sans-serif";
		return n;
	}
};
openfl_text_TextFormat.prototype = {
	clone: function() {
		var r = new openfl_text_TextFormat(this.font,this.size,this.color,this.bold,this.italic,this.underline,this.url,this.target,this.align,this.leftMargin,this.rightMargin,this.indent,this.leading);
		r.blockIndent = this.blockIndent;
		r.bullet = this.bullet;
		r.indent = this.indent;
		r.kerning = this.kerning;
		r.letterSpacing = this.letterSpacing;
		r.tabStops = this.tabStops.slice(0);
		return r;
	}
	,get_fontStyle: function() {
		return (this.bold?"bold ":"") + (this.italic?"italic ":"") + this.size + "px " + openfl_text_TextFormat.translateFont(this.font);
	}
	,__class__: openfl_text_TextFormat
};
var openfl_utils_ByteArray = function() {
	this.littleEndian = false;
	this.length = 0;
	this._nmeResizeBuffer(this.allocated = this.position = 0);
};
$hxClasses["openfl.utils.ByteArray"] = openfl_utils_ByteArray;
openfl_utils_ByteArray.__name__ = ["openfl","utils","ByteArray"];
openfl_utils_ByteArray.nmeOfBuffer = function(buffer) {
	var r = new openfl_utils_ByteArray();
	r.set_length(r.allocated = buffer.byteLength);
	r.data = new DataView(buffer);
	r.byteView = new Uint8Array(buffer);
	return r;
};
openfl_utils_ByteArray.prototype = {
	_nmeResizeBuffer: function(len) {
		var oldByteView = this.byteView;
		var newByteView = new Uint8Array(len);
		if(oldByteView != null) {
			if(oldByteView.length <= len) newByteView.set(oldByteView); else newByteView.set(oldByteView.subarray(0,len));
		}
		this.byteView = newByteView;
		this.data = new DataView(newByteView.buffer);
	}
	,clear: function() {
		this.set_length(this.position = 0);
	}
	,readByte: function() {
		return this.data.getUint8(this.position++);
	}
	,readFloat: function() {
		var r = this.data.getFloat32(this.position,this.littleEndian);
		this.position += 4;
		return r;
	}
	,readInt: function() {
		var r = this.data.getInt32(this.position,this.littleEndian);
		this.position += 4;
		return r;
	}
	,readShort: function() {
		var r = this.data.getInt16(this.position,this.littleEndian);
		this.position += 2;
		return r;
	}
	,readUnsignedInt: function() {
		var uInt = this.data.getUint32(this.position,this.littleEndian);
		this.position += 4;
		return uInt;
	}
	,readUnsignedShort: function() {
		var r = this.data.getUint16(this.position,this.littleEndian);
		this.position += 2;
		return r;
	}
	,readUTF: function() {
		return this.readUTFBytes(this.readUnsignedShort());
	}
	,readUTFBytes: function(len) {
		var r = "";
		var max = this.position + len;
		while(this.position < max) {
			var c = this.data.getUint8(this.position++);
			if(c < 128) {
				if(c == 0) break;
				r += String.fromCharCode(c);
			} else if(c < 224) r += String.fromCharCode((c & 63) << 6 | this.data.getUint8(this.position++) & 127); else if(c < 240) {
				var c2 = this.data.getUint8(this.position++);
				r += String.fromCharCode((c & 31) << 12 | (c2 & 127) << 6 | this.data.getUint8(this.position++) & 127);
			} else {
				var c21 = this.data.getUint8(this.position++);
				var c3 = this.data.getUint8(this.position++);
				r += String.fromCharCode((c & 15) << 18 | (c21 & 127) << 12 | c3 << 6 & 127 | this.data.getUint8(this.position++) & 127);
			}
		}
		return r;
	}
	,toBase64: function() {
		var o = this;
		var q = o.position;
		var l = o.length;
		var p = -1;
		var v = o.data;
		var r = "";
		var m = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
		var a;
		var b;
		var c;
		while(++p < l) {
			a = v.getUint8(p);
			if(++p < l) b = v.getUint8(p); else b = 0;
			if(++p < l) c = v.getUint8(p); else c = 0;
			r += m.charAt(a >> 2) + m.charAt((a & 3) << 4 | b >> 4) + (p - 1 < l?m.charAt((b & 15) << 2 | c >> 6):"=") + (p < l?m.charAt(c & 63):"=");
		}
		return r;
	}
	,writeByte: function(v) {
		var l = this.position + 1;
		if(this.length < l) this.set_length(l);
		var data = this.data;
		data.setInt8(this.position,v);
		this.position += 1;
	}
	,writeFloat: function(x) {
		var l = this.position + 4;
		if(this.length < l) this.set_length(l);
		this.data.setFloat32(this.position,x,this.littleEndian);
		this.position += 4;
	}
	,writeInt: function(value) {
		var l = this.position + 4;
		if(this.length < l) this.set_length(l);
		this.data.setInt32(this.position,value,this.littleEndian);
		this.position += 4;
	}
	,writeShort: function(value) {
		var l = this.position + 2;
		if(this.length < l) this.set_length(l);
		this.data.setInt16(this.position,value,this.littleEndian);
		this.position += 2;
	}
	,writeUnsignedInt: function(value) {
		var l = this.position + 4;
		if(this.length < l) this.set_length(l);
		this.data.setUint32(this.position,value,this.littleEndian);
		this.position += 4;
	}
	,writeUTFBytes: function(value) {
		var i = -1;
		var l = value.length;
		var c;
		while(++i < l) {
			c = value.charCodeAt(i);
			if(c <= 127) this.writeByte(c); else if(c <= 2047) {
				this.writeByte(192 | c >> 6);
				this.writeByte(128 | c & 63);
			} else if(c <= 65535) {
				this.writeByte(224 | c >> 12);
				this.writeByte(128 | c >> 6 & 63);
				this.writeByte(128 | c & 63);
			} else {
				this.writeByte(240 | c >> 18);
				this.writeByte(128 | c >> 12 & 63);
				this.writeByte(128 | c >> 6 & 63);
				this.writeByte(128 | c & 63);
			}
		}
	}
	,set_length: function(value) {
		if(this.allocated < value) this._nmeResizeBuffer(this.allocated = Std["int"](Math.max(value,this.allocated * 2))); else if(this.allocated > value) this._nmeResizeBuffer(this.allocated = value);
		return this.length = value;
	}
	,__class__: openfl_utils_ByteArray
};
var org_ascrypt_AES = function() { };
$hxClasses["org.ascrypt.AES"] = org_ascrypt_AES;
org_ascrypt_AES.__name__ = ["org","ascrypt","AES"];
org_ascrypt_AES.encrypt = function(key,bytes,mode,iv) {
	if(mode == null) mode = "ecb";
	org_ascrypt_AES.check(key,bytes);
	var k = key.slice();
	var b = bytes.slice();
	org_ascrypt_AES.init();
	org_ascrypt_AES.ek(k);
	var _g = mode.toLowerCase();
	switch(_g) {
	case "ecb":
		return org_ascrypt_utilities_ECB.core(k,b,16,org_ascrypt_AES.ie);
	case "cbc":
		return org_ascrypt_utilities_CBC.encrypt(k,b,16,org_ascrypt_AES.ie,iv.slice());
	case "ctr":
		return org_ascrypt_utilities_CTR.encrypt(k,b,16,org_ascrypt_AES.ie,iv.slice());
	case "none":
		return org_ascrypt_AES.ie(k,b);
	default:
		throw new js__$Boot_HaxeError(org_ascrypt_AES.ERROR_MODE);
	}
};
org_ascrypt_AES.decrypt = function(key,bytes,mode,iv) {
	if(mode == null) mode = "ecb";
	org_ascrypt_AES.check(key,bytes);
	var k = key.slice();
	var b = bytes.slice();
	org_ascrypt_AES.init();
	org_ascrypt_AES.ek(k);
	var _g = mode.toLowerCase();
	switch(_g) {
	case "ecb":
		return org_ascrypt_utilities_ECB.core(k,b,16,org_ascrypt_AES.id);
	case "cbc":
		return org_ascrypt_utilities_CBC.decrypt(k,b,16,org_ascrypt_AES.id,iv.slice());
	case "ctr":
		return org_ascrypt_utilities_CTR.decrypt(k,b,16,org_ascrypt_AES.ie,iv.slice());
	case "none":
		return org_ascrypt_AES.id(k,b);
	default:
		throw new js__$Boot_HaxeError(org_ascrypt_AES.ERROR_MODE);
	}
};
org_ascrypt_AES.init = function() {
	org_ascrypt_AES.isrtab = [];
	org_ascrypt_AES.isbox = [];
	org_ascrypt_AES.xtime = [];
	var _g = 0;
	while(_g < 256) {
		var i = _g++;
		org_ascrypt_AES.isbox[org_ascrypt_AES.sbox[i]] = i;
	}
	var _g1 = 0;
	while(_g1 < 16) {
		var j = _g1++;
		org_ascrypt_AES.isrtab[org_ascrypt_AES.srtab[j]] = j;
	}
	var _g2 = 0;
	while(_g2 < 128) {
		var k = _g2++;
		org_ascrypt_AES.xtime[k] = k << 1;
		org_ascrypt_AES.xtime[128 + k] = k << 1 ^ 27;
	}
};
org_ascrypt_AES.sb = function(s,b) {
	var _g = 0;
	while(_g < 16) {
		var i = _g++;
		s[i] = b[s[i]];
	}
};
org_ascrypt_AES.ark = function(s,r) {
	var _g = 0;
	while(_g < 16) {
		var i = _g++;
		s[i] ^= r[i];
	}
};
org_ascrypt_AES.sr = function(s,t) {
	var h = s.slice();
	var _g = 0;
	while(_g < 16) {
		var i = _g++;
		s[i] = h[t[i]];
	}
};
org_ascrypt_AES.ek = function(k) {
	var kl = k.length;
	var ks = 0;
	var rcon = 1;
	switch(kl) {
	case 16:
		ks = 176;
		break;
	case 24:
		ks = 208;
		break;
	case 32:
		ks = 240;
		break;
	}
	var i = kl;
	while(i < ks) {
		var t = k.slice(i - 4,i);
		if(i % kl == 0) {
			t = [org_ascrypt_AES.sbox[t[1]] ^ rcon,org_ascrypt_AES.sbox[t[2]],org_ascrypt_AES.sbox[t[3]],org_ascrypt_AES.sbox[t[0]]];
			if((rcon <<= 1) >= 256) rcon ^= 283;
		} else if(kl > 24 && i % kl == 16) t = [org_ascrypt_AES.sbox[t[0]],org_ascrypt_AES.sbox[t[1]],org_ascrypt_AES.sbox[t[2]],org_ascrypt_AES.sbox[t[3]]];
		var j = 0;
		while(j < 4) {
			k[i + j] = k[i + j - kl] ^ t[j];
			j++;
		}
		i += 4;
	}
};
org_ascrypt_AES.ie = function(k,ob) {
	var b = ob.slice();
	var i = 16;
	var l = k.length;
	org_ascrypt_AES.ark(b,k.slice(0,16));
	while(i < l - 16) {
		org_ascrypt_AES.sb(b,org_ascrypt_AES.sbox);
		org_ascrypt_AES.sr(b,org_ascrypt_AES.srtab);
		org_ascrypt_AES.mc(b);
		org_ascrypt_AES.ark(b,k.slice(i,i + 16));
		i += 16;
	}
	org_ascrypt_AES.sb(b,org_ascrypt_AES.sbox);
	org_ascrypt_AES.sr(b,org_ascrypt_AES.srtab);
	org_ascrypt_AES.ark(b,k.slice(i,i + 16));
	return b;
};
org_ascrypt_AES.id = function(k,ob) {
	var b = ob.slice();
	var l = k.length;
	var i = l - 32;
	org_ascrypt_AES.ark(b,k.slice(l - 16,l));
	org_ascrypt_AES.sr(b,org_ascrypt_AES.isrtab);
	org_ascrypt_AES.sb(b,org_ascrypt_AES.isbox);
	while(i >= 16) {
		org_ascrypt_AES.ark(b,k.slice(i,i + 16));
		org_ascrypt_AES.mci(b);
		org_ascrypt_AES.sr(b,org_ascrypt_AES.isrtab);
		org_ascrypt_AES.sb(b,org_ascrypt_AES.isbox);
		i -= 16;
	}
	org_ascrypt_AES.ark(b,k.slice(0,16));
	return b;
};
org_ascrypt_AES.mc = function(s) {
	var i = 0;
	while(i < 16) {
		var s0 = s[i];
		var s1 = s[i + 1];
		var s2 = s[i + 2];
		var s3 = s[i + 3];
		var h = s0 ^ s1 ^ s2 ^ s3;
		s[i] ^= h ^ org_ascrypt_AES.xtime[s0 ^ s1];
		s[i + 1] ^= h ^ org_ascrypt_AES.xtime[s1 ^ s2];
		s[i + 2] ^= h ^ org_ascrypt_AES.xtime[s2 ^ s3];
		s[i + 3] ^= h ^ org_ascrypt_AES.xtime[s3 ^ s0];
		i += 4;
	}
};
org_ascrypt_AES.mci = function(s) {
	var i = 0;
	while(i < 16) {
		var s0 = s[i];
		var s1 = s[i + 1];
		var s2 = s[i + 2];
		var s3 = s[i + 3];
		var h = s0 ^ s1 ^ s2 ^ s3;
		var xh = org_ascrypt_AES.xtime[h];
		var h1 = org_ascrypt_AES.xtime[org_ascrypt_AES.xtime[xh ^ s0 ^ s2]] ^ h;
		var h2 = org_ascrypt_AES.xtime[org_ascrypt_AES.xtime[xh ^ s1 ^ s3]] ^ h;
		s[i] ^= h1 ^ org_ascrypt_AES.xtime[s0 ^ s1];
		s[i + 1] ^= h2 ^ org_ascrypt_AES.xtime[s1 ^ s2];
		s[i + 2] ^= h1 ^ org_ascrypt_AES.xtime[s2 ^ s3];
		s[i + 3] ^= h2 ^ org_ascrypt_AES.xtime[s3 ^ s0];
		i += 4;
	}
};
org_ascrypt_AES.check = function(k,b) {
	var kl = k.length;
	if(kl != 16 && kl != 24 && kl != 32) throw new js__$Boot_HaxeError(org_ascrypt_AES.ERROR_KEY);
	if(b.length % 16 != 0) throw new js__$Boot_HaxeError(org_ascrypt_AES.ERROR_BLOCK);
};
var org_ascrypt_utilities_CBC = function() { };
$hxClasses["org.ascrypt.utilities.CBC"] = org_ascrypt_utilities_CBC;
org_ascrypt_utilities_CBC.__name__ = ["org","ascrypt","utilities","CBC"];
org_ascrypt_utilities_CBC.encrypt = function(key,bytes,size,encrypt,iv) {
	var r = [];
	var l = bytes.length;
	var i = 0;
	while(i < l) {
		var _g = 0;
		while(_g < size) {
			var j = _g++;
			bytes[i + j] ^= iv[j];
		}
		r = r.concat(encrypt(key,bytes.slice(i,i + size)));
		iv = r.slice(i,i + size);
		i += size;
	}
	return r;
};
org_ascrypt_utilities_CBC.decrypt = function(key,bytes,size,decrypt,iv) {
	var l = bytes.length;
	var t;
	var r = [];
	var i = 0;
	while(i < l) {
		t = bytes.slice(i,i + size);
		r = r.concat(decrypt(key,t));
		var _g = 0;
		while(_g < size) {
			var j = _g++;
			r[i + j] ^= iv[j];
		}
		iv = t.slice(0,size);
		i += size;
	}
	return r;
};
var org_ascrypt_utilities_CTR = function() { };
$hxClasses["org.ascrypt.utilities.CTR"] = org_ascrypt_utilities_CTR;
org_ascrypt_utilities_CTR.__name__ = ["org","ascrypt","utilities","CTR"];
org_ascrypt_utilities_CTR.encrypt = function(key,bytes,size,encrypt,iv) {
	return org_ascrypt_utilities_CTR.core(key,bytes,size,encrypt,iv);
};
org_ascrypt_utilities_CTR.decrypt = function(key,bytes,size,encrypt,iv) {
	return org_ascrypt_utilities_CTR.core(key,bytes,size,encrypt,iv);
};
org_ascrypt_utilities_CTR.core = function(k,b,s,c,v) {
	var bl = b.length;
	var e = [];
	var x = v.slice();
	var i = 0;
	while(i < bl) {
		e = c(k,x);
		var _g = 0;
		while(_g < s) {
			var j = _g++;
			b[i + j] ^= e[j];
		}
		var l = s - 1;
		while(l >= 0) {
			--l;
			x[l]++;
			if(x[l] != 0) break;
		}
		i += s;
	}
	return b;
};
var org_ascrypt_utilities_ECB = function() { };
$hxClasses["org.ascrypt.utilities.ECB"] = org_ascrypt_utilities_ECB;
org_ascrypt_utilities_ECB.__name__ = ["org","ascrypt","utilities","ECB"];
org_ascrypt_utilities_ECB.core = function(k,b,s,c) {
	var r = [];
	var l = b.length;
	var i = 0;
	while(i < l) {
		r = r.concat(c(k,b.slice(i,i + s)));
		i += s;
	}
	return r;
};
var terra_Buff = function() {
	this.reset();
};
$hxClasses["terra.Buff"] = terra_Buff;
terra_Buff.__name__ = ["terra","Buff"];
terra_Buff.getMaxTime = function() {
	if(Main._main.player.invVersion >= 269) return 1999999980; else return 1080000;
};
terra_Buff.setup = function() {
	var i;
	var p;
	var v;
	terra_Buff.buffName = terra_data_TdBuff.$name;
	terra_Buff.buffTip = terra_data_TdBuff.tip;
	terra_Buff.COUNT = terra_Buff.buffName.length;
	Main.BUFFS = terra_Buff.COUNT;
};
terra_Buff.$name = function(i) {
	if(i >= 0 && i < terra_Buff.COUNT) return terra_Buff.buffName[i]; else return "?";
};
terra_Buff.ttip = function(i) {
	if(i >= 0 && i < terra_Buff.COUNT) return terra_Buff.buffTip[i]; else return "?";
};
terra_Buff.prototype = {
	set: function(i,t) {
		this.id = i;
		this.time = t;
	}
	,reset: function() {
		this.id = 0;
		this.time = 0;
	}
	,getTime: function() {
		var fm = function(t) {
			return "" + (t | 0);
		};
		var t1 = this.time / 60;
		if(t1 < 0) return "?";
		if(t1 < 100) return fm(t1) + "s";
		t1 = t1 / 60;
		if(t1 < 100) return fm(t1) + "m";
		t1 = t1 / 60;
		if(t1 > 999) return "*";
		return fm(t1) + "h";
	}
	,__class__: terra_Buff
};
var terra_Item = function() {
	this.iconY = 0;
	this.iconX = 0;
	this.text = "";
	this.stack = 0;
	this.code = "";
	this.id = 0;
	this.enName = "";
	this.name = "";
};
$hxClasses["terra.Item"] = terra_Item;
terra_Item.__name__ = ["terra","Item"];
terra_Item.fromId = function(id) {
	var r = terra_Item.idMap.h[id];
	if(r == null) {
		r = new terra_Item();
		r.name = "Unknown";
		r.id = id;
		terra_Item.idMap.h[id] = r;
	}
	return r;
};
terra_Item.fromCode = function(code) {
	var r = terra_Item.codeMap.get(code);
	if(r == null) {
		r = new terra_Item();
		r.name = code;
		r.code = code;
		terra_Item.codeMap.set(code,r);
	}
	return r;
};
terra_Item.isEmpty = function(item) {
	return item == null || item.id == 0 && item.name == "";
};
terra_Item.isItem = function(item) {
	return item != null && (item.id != 0 || item.name != "");
};
terra_Item.init = function() {
	terra_Item.unknownIcon = new openfl_display_BitmapData(40,40,true,0);
	var sh = new openfl_display_Shape();
	var g = sh.graphics;
	g.beginFill(10088055);
	g.drawCircle(20,20,11.7);
	terra_Item.unknownIcon.draw(sh);
	terra_ItemParser.run();
	terra_Item.prefixes = terra_ItemPrefix.init();
	var _g = 0;
	var _g1 = terra_Item.list;
	while(_g < _g1.length) {
		var item = _g1[_g];
		++_g;
		item.nameLq = item.name.toLowerCase();
		item.textLq = item.text.toLowerCase();
	}
};
terra_Item.count = function(v) {
	if(v > 99999) return "+?"; else if(v < 0) return "-?"; else return "" + v;
};
terra_Item.prototype = {
	cropFrom: function(source,x,y) {
		this.iconX = x;
		this.iconY = y;
	}
	,loadMeta: function(source) {
		this.metadata = source;
		var pos = source.indexOf("|");
		if(pos >= 0) this.metatype = source.substring(0,pos); else this.metatype = source;
		this.meta = terra_ItemMeta.parse(this,source);
		this.stack = this.meta.stack;
		this.text = this.meta.toString();
	}
	,updateLang: function() {
		this.name = Lang.iloc("ItemName",this.pid,this.enName);
		this.nameLq = this.name.toLowerCase();
		this.text = this.meta.toString();
	}
	,__class__: terra_Item
};
var terra_ItemParser = function() { };
$hxClasses["terra.ItemParser"] = terra_ItemParser;
terra_ItemParser.__name__ = ["terra","ItemParser"];
terra_ItemParser.run = function() {
	var id = terra_data_TdItem.minId;
	var n = terra_data_TdItem.count;
	var main = Main._main;
	var k = 0;
	while(k < n) {
		var item = new terra_Item();
		var item_name = terra_data_TdItem.$name[k];
		var item_id = id++;
		if(item_id != 0 && item_name == "") item_name = "Unknown";
		var item_code;
		if(item_id != 0) item_code = "Vanilla:" + item_name; else item_code = "";
		var item_pid = terra_data_TdItem.pid[k];
		if(item_pid == "") item_pid = StringTools.replace(item_name," ","");
		item.pid = item_pid;
		{
			terra_Item.id2pid.h[item_id] = item_pid;
			item_pid;
		}
		{
			terra_Item.pid2id.set(item_pid,item_id);
			item_id;
		}
		item.id = item_id;
		item.name = item_name;
		item.enName = item_name;
		item.code = item_code;
		item.loadMeta(terra_data_TdItem.meta[k]);
		if(item_id < 0) item.cropFrom(null,0,-40); else item.cropFrom(null,(item_id & 31) * 40,(item_id >> 5) * 40);
		terra_Item.idMap.h[item_id] = item;
		terra_Item.codeMap.set(item_code,item);
		terra_Item.list.push(item);
		k++;
	}
	Main.NITEMS = terra_data_TdItem.minId - 1;
	Main.ITEMS = terra_data_TdItem.maxId + 1;
};
var terra_ItemPrefixPairDef = function(kind,key,en) {
	this.kind = kind;
	this.key = key;
	this.text = this.enText = en;
};
$hxClasses["terra.ItemPrefixPairDef"] = terra_ItemPrefixPairDef;
terra_ItemPrefixPairDef.__name__ = ["terra","ItemPrefixPairDef"];
terra_ItemPrefixPairDef.prototype = {
	updateLang: function() {
		this.text = Lang.loc("meta.prefix",this.key,this.enText);
	}
	,__class__: terra_ItemPrefixPairDef
};
var terra_ItemPrefix = function() {
	this.pairs = [];
};
$hxClasses["terra.ItemPrefix"] = terra_ItemPrefix;
terra_ItemPrefix.__name__ = ["terra","ItemPrefix"];
terra_ItemPrefix.init = function() {
	var prefixes = ["None|0|","Large|1|Z+12","Massive|1|Z+18","Dangerous|1|D+6|C+2|Z+5","Savage|2|D+9|Z+10|K+10","Sharp|1|D+16","Pointy|1|D+9","Tiny|-1|Z-18","Terrible|-2|D-16|Z-13|K-15","Small|-1|Z-10","Dull|-1|D-16","Unhappy|-2|S-8|Z-10|K-10","Bulky|1|D-6|S-17|Z+10|K+10","Shameful|-2|D-9|Z+10|K-20","Heavy|0|S-8|K+15","Light|0|S+17|K-10","Sighted|1|D+9|C+3","Rapid|2|S+17","Hasty|2|S+8","Intimidating|2|K+15","Deadly|2|D+9|S+3|C+2|K+5","Staunch|2|D+9|K+15","Awful|-2|D-16|K-10","Lethargic|-2|S-16|K-10","Awkward|-2|S-8|K-20","Powerful|1|D+16|S-8|C+1","Mystic|2|D+10|M-14","Adept|1|M-14","Masterful|2|D+15|M-14|K+5","Inept|-1|M+7","Ignorant|-2|D-10|M+21","Deranged|-1|D-10|K-10","Intense|-1|D+10|M+15","Taboo|1|S+10|M+10|K+10","Celestial|1|D+10|S-10|M-10|K+10","Furious|1|D+15|M+20|K+15","Keen|1|C+3","Superior|2|D+11|C+3|K+10","Forceful|1|K+15","Broken|-2|D-31|K-20","Damaged|-1|D-14","Shoddy|-2|D-9|K-15","Quick|1|S+8","Deadly|2|D+9|S+8","Agile|1|S+8|C+3","Nimble|1|S+4","Murderous|2|D+6|S+4|C+3","Slow|-1|S-17","Sluggish|-2|S-21","Lazy|-1|S-8","Annoying|-2|D-19|S-17","Nasty|1|D+6|S+8|C+2|K-10","Manic|1|D-10|S+10|M-10","Hurtful|1|D+9","Strong|1|K+15","Unpleasant|2|D+6|K+15","Weak|-1|K-20","Ruthless|1|D+19|K-10","Frenzying|0|D-16|S+17","Godly|2|D+16|C+5|K+15","Demonic|2|D+16|C+5","Zealous|1|C+5","Hard|2|d+1","Guarding|2|d+2","Armored|2|d+3","Warding|null|d+4","Arcane|null|m+20","Precise|null|C+2","Lucky|null|C+4","Jagged|null|D+1","Spiked|null|D+2","Angry|null|D+3","Menacing|null|D+4","Brisk|null|s+1","Fleeting|null|s+2","Hasty|null|s+3","Quick|null|s+4","Wild|null|Q+1","Rash|null|Q+2","Intrepid|null|Q+3","Violent|null|Q+4","Legendary|null|D+16|S+8|C+5|K+15|Z+10","Unreal|null|D+16|S+8|C+5|K+15","Mythical|null|D+15|S+14|C+5|M-20|K+15"];
	var r = new haxe_ds_IntMap();
	var _g1 = 0;
	var _g = prefixes.length;
	while(_g1 < _g) {
		var i = _g1++;
		var values = prefixes[i].split("|");
		var prefix = new terra_ItemPrefix();
		prefix.name = values.shift();
		prefix.enName = prefix.name;
		prefix.tier = Std.parseInt(values.shift());
		var _g2 = 0;
		while(_g2 < values.length) {
			var prop = values[_g2];
			++_g2;
			prefix.pairs.push({ kind : prop.charAt(0), val : HxOverrides.substr(prop,1,null)});
		}
		prefix.updateText();
		terra_ItemPrefix.list.push(prefix);
		r.h[i] = prefix;
	}
	return r;
};
terra_ItemPrefix.prototype = {
	updateText: function() {
		var lines = [];
		var _g = 0;
		var _g1 = this.pairs;
		while(_g < _g1.length) {
			var pair = _g1[_g];
			++_g;
			var def = terra_ItemPrefix.pairMap.get(pair.kind);
			if(def != null) {
				if(Lang.isDebug) lines.push(def.text + ("(" + pair.val + ")")); else lines.push(StringTools.replace(def.text,"$1",pair.val));
			}
		}
		this.text = lines.join("\n");
	}
	,updateLang: function() {
		if(this.enName == "None") this.name = Lang.loc("meta.prefix","noPrefix","None"); else this.name = Lang.iloc("Prefix",this.enName,this.enName);
		this.updateText();
	}
	,__class__: terra_ItemPrefix
};
var terra_Player = function() {
	this.creativePowersOrder = [];
	this.creativePowers = terra_Player.creativePowers_init();
	this.trail = null;
	this.superCartByte = 0;
	this.researchSlots = [];
	this.researchByItemPID = [];
	this.golferScore = 0;
	this.lastTimeSaved_2 = 0;
	this.lastTimeSaved_1 = 0;
	this.respawnTimer = 0;
	this.isDead = false;
	this.voidVaultByte = 0;
	this.bartenderQuests = 0;
	this.builderAccStatus = [];
	this.dpadBindings = [0,0,0,0];
	this.playTimeChanged = false;
	this.playTimeTicks = 0;
	this.playTimeSeconds = 0;
	this.playTimeH = 0;
	this.playTimeL = 0;
	this.metaFlags2 = 0;
	this.metaFlags1 = 0;
	this.metaVersion = 0;
	this.pvpDeaths = 0;
	this.pveDeaths = 0;
	this.taxMoney = 0;
	this.finishedDD2Event = false;
	this.extraUsingFlags = (function($this) {
		var $r;
		var _g = [];
		{
			var _g1 = 0;
			while(_g1 < 7) {
				var _ = _g1++;
				_g.push(false);
			}
		}
		$r = _g;
		return $r;
	}(this));
	this.usingBiomeTorches = false;
	this.unlockedBiomeTorches = false;
	this.extraAccessory = false;
	this.hideMisc = 0;
	this.hideVisual = 0;
	this.fishingQuestsCompleted = 0;
	this.hotbarLocked = false;
	this.servers = [];
	this.buffs = (function($this) {
		var $r;
		var _g = [];
		{
			var _g1 = 0;
			while(_g1 < 44) {
				var i = _g1++;
				_g.push(new terra_Buff());
			}
		}
		$r = _g;
		return $r;
	}(this));
	this.researchDummies = terra_PlayerTools.createSlots(40,function(i,slot) {
		slot.multi = true;
		slot.avail = function(p) {
			return p.invVersion >= 200;
		};
	});
	this.tempItems = terra_PlayerTools.createSlots(4,function(i,slot) {
		slot.multi = true;
		slot.avail = function(p) {
			return p.invVersion >= 200;
		};
	});
	this.voidItems = terra_PlayerTools.createSlots(40,function(i,slot) {
		slot.multi = true;
		slot.favFlagMinVersion = 269;
		slot.avail = function(p) {
			return p.invVersion >= 200;
		};
	});
	this.forgeItems = terra_PlayerTools.createSlots(40,function(i,slot) {
		slot.multi = true;
		slot.avail = function(p) {
			return p.invVersion >= 184;
		};
	});
	this.safeItems = terra_PlayerTools.createSlots(40,terra_Player.__bankOrSafe_iter);
	this.bankItems = terra_PlayerTools.createSlots(40,terra_Player.__bankOrSafe_iter);
	this.equipmentDyes = terra_PlayerTools.createSlots(5,terra_Player.__equipment_iter);
	this.equipmentItems = terra_PlayerTools.createSlots(5,terra_Player.__equipment_iter);
	this.ammo = terra_PlayerTools.createSlots(4,terra_Player.__coinOrAmmo_iter);
	this.coins = terra_PlayerTools.createSlots(4,terra_Player.__coinOrAmmo_iter);
	this.inventory = terra_PlayerTools.createSlots(50,function(i,slot) {
		slot.multi = true;
		if(i >= 40) slot.avail = function(p) {
			return p.invVersion >= 58;
		};
		slot.favFlagMinVersion = 145;
	});
	this.currentLoadout = 0;
	this.loadouts = (function($this) {
		var $r;
		var _g = [];
		{
			var _g1 = 0;
			while(_g1 < 4) {
				var i = _g1++;
				_g.push(new terra_PlayerLoadout(i));
			}
		}
		$r = _g;
		return $r;
	}(this));
	this.shoesColor = 10512700;
	this.pantsColor = 16770735;
	this.underColor = 10532055;
	this.shirtColor = 11511180;
	this.eyeColor = 6904395;
	this.skinColor = 16743770;
	this.hairDye = 0;
	this.hairColor = 14113335;
	this.hairStyle = 0;
	this.manaMax = 20;
	this.manaNow = 20;
	this.healthMax = 100;
	this.healthNow = 100;
	this.gender = 1;
	this.difficulty = 0;
	this.guid = "f2a63086-cfb5-41c8-bae4-712777bbf934";
	this.name = "Player";
	this.invVersion = 269;
	this.isSwitch = false;
	this.version = 269;
	var i;
	this.hideInfo = [];
	i = 0;
	while(i < 13) {
		this.hideInfo[i] = false;
		i++;
	}
	i = 0;
	while(i < 11) {
		this.builderAccStatus.push(0);
		i++;
	}
	this.builderAccStatus[0] = 1;
};
$hxClasses["terra.Player"] = terra_Player;
terra_Player.__name__ = ["terra","Player"];
terra_Player.__coinOrAmmo_iter = function(i,slot) {
	slot.multi = true;
	slot.favFlagMinVersion = 145;
};
terra_Player.__equipment_iter = function(i,slot) {
	slot.avail = function(p) {
		return p.invVersion >= 145;
	};
};
terra_Player.__bankOrSafe_iter = function(i,slot) {
	slot.multi = true;
	if(i >= 20) slot.avail = function(p) {
		return p.invVersion >= 58;
	};
};
terra_Player.creativePowers_init = function() {
	var arr = [];
	var freezeTime = false;
	arr.push(function(d,out) {
		if(out) d.writeByte(freezeTime?1:0); else freezeTime = d.data.getUint8(d.position++) != 0;
	});
	arr.push((function($this) {
		var $r;
		var startDayImmediately = function(d1,out1) {
		};
		$r = startDayImmediately;
		return $r;
	}(this)));
	arr.push((function($this) {
		var $r;
		var startNoonImmediately = function(d2,out2) {
		};
		$r = startNoonImmediately;
		return $r;
	}(this)));
	arr.push((function($this) {
		var $r;
		var startNightImmediately = function(d3,out3) {
		};
		$r = startNightImmediately;
		return $r;
	}(this)));
	arr.push((function($this) {
		var $r;
		var startMidnightImmediately = function(d4,out4) {
		};
		$r = startMidnightImmediately;
		return $r;
	}(this)));
	var godmodeEnabled = false;
	arr.push(function(d5,out5) {
		if(out5) d5.writeByte(godmodeEnabled?1:0); else godmodeEnabled = d5.data.getUint8(d5.position++) != 0;
	});
	arr.push((function($this) {
		var $r;
		var windTweaks = function(d6,out6) {
		};
		$r = windTweaks;
		return $r;
	}(this)));
	arr.push((function($this) {
		var $r;
		var rainPower = function(d7,out7) {
		};
		$r = rainPower;
		return $r;
	}(this)));
	var timeRate = 1.;
	arr.push(function(d8,out8) {
		if(out8) d8.writeFloat(timeRate); else timeRate = d8.readFloat();
	});
	var freezeRain = false;
	arr.push(function(d9,out9) {
		if(out9) d9.writeByte(freezeRain?1:0); else freezeRain = d9.data.getUint8(d9.position++) != 0;
	});
	var freezeWind = false;
	arr.push(function(d10,out10) {
		if(out10) d10.writeByte(freezeWind?1:0); else freezeWind = d10.data.getUint8(d10.position++) != 0;
	});
	var farRange = false;
	arr.push(function(d11,out11) {
		if(out11) d11.writeByte(farRange?1:0); else farRange = d11.data.getUint8(d11.position++) != 0;
	});
	var diffScale = 1.;
	arr.push(function(d12,out12) {
		if(out12) d12.writeFloat(diffScale); else diffScale = d12.readFloat();
	});
	var stopSpread = false;
	arr.push(function(d13,out13) {
		if(out13) d13.writeByte(stopSpread?1:0); else stopSpread = d13.data.getUint8(d13.position++) != 0;
	});
	var spawnRate = 1.;
	arr.push(function(d14,out14) {
		if(out14) d14.writeFloat(spawnRate); else spawnRate = d14.readFloat();
	});
	return arr;
};
terra_Player.prototype = {
	set_version: function(v) {
		this.version = v;
		this.isSwitch = v >= 1000;
		if(this.isSwitch) {
			if(v >= 1003) this.invVersion = 190; else this.invVersion = 145;
		} else this.invVersion = v;
		return v;
	}
	,handle: function(d,out) {
		var _g = this;
		if(out) {
			var loadout = this.loadouts[1 + this.currentLoadout];
			this.loadouts[0].setTo(loadout);
			loadout.clear();
		}
		d.littleEndian = true;
		"littleEndian";
		var v;
		if(out) {
			var i1 = v = this.version;
			d.writeInt(i1);
		} else this.set_version(v = d.readInt());
		var isSwitch = this.isSwitch;
		v = this.invVersion;
		var maxIds = terra_PlayerTools.getMaxIds(v);
		var maxBuff = maxIds.buff;
		terra_Slot.maxId = maxIds.item;
		var i;
		var k;
		var n;
		var z;
		if(v >= 145) {
			if(out) {
				d.writeUnsignedInt(1869374834);
				d.writeUnsignedInt(56846695);
				d.writeUnsignedInt(this.metaVersion);
				d.writeUnsignedInt(this.metaFlags1);
				d.writeUnsignedInt(this.metaFlags2);
				if(isSwitch) utils_ByteArrayTools.writeSharpString(d,this.guid);
			} else {
				i = d.readUnsignedInt();
				k = d.readUnsignedInt();
				if(i != 1869374834 || k != 56846695) throw new js__$Boot_HaxeError("That doesn't seem to be a valid profile.");
				this.metaVersion = d.readUnsignedInt();
				this.metaFlags1 = d.readUnsignedInt();
				this.metaFlags2 = d.readUnsignedInt();
				if(isSwitch) this.guid = utils_ByteArrayTools.readSharpString(d);
			}
		}
		if(out) utils_ByteArrayTools.writeSharpString(d,this.name); else this.name = utils_ByteArrayTools.readSharpString(d);
		if(out) d.writeByte(this.difficulty); else this.difficulty = d.data.getUint8(d.position++);
		if(v >= 145) {
			if(out) {
				if(this.playTimeChanged) {
					var s = this.playTimeSeconds;
					this.playTimeH = s / 429.4967295 | 0;
					this.playTimeL = this.playTimeTicks + (s % 429.4967295 * 10000000 | 0);
				}
				d.writeUnsignedInt(this.playTimeL);
				d.writeUnsignedInt(this.playTimeH);
			} else {
				this.playTimeL = d.readUnsignedInt();
				this.playTimeH = d.readUnsignedInt();
				this.playTimeTicks = this.playTimeL % 10000000;
				this.playTimeSeconds = (this.playTimeL / 10000000 | 0) + this.playTimeH * 429.4967295 | 0;
				this.playTimeChanged = false;
			}
		}
		if(out) d.writeInt(this.hairStyle); else this.hairStyle = d.readInt();
		if(v >= 82) {
			if(out) d.writeByte(this.hairDye); else this.hairDye = d.data.getUint8(d.position++);
		}
		if(v >= 83) {
			if(out) {
				d.writeByte(this.hideVisual & 255);
				if(v >= 145) d.writeByte(this.hideVisual >> 8 & 255);
			} else {
				this.hideVisual = d.data.getUint8(d.position++);
				if(v >= 145) this.hideVisual |= d.data.getUint8(d.position++) << 8;
			}
		}
		if(v >= 145) {
			if(out) d.writeByte(this.hideMisc); else this.hideMisc = d.data.getUint8(d.position++);
		}
		if(v >= 145) {
			if(out) d.writeByte(this.gender); else this.gender = d.data.getUint8(d.position++);
		} else if(out) d.writeByte(this.gender < 4?1:0); else if(d.data.getUint8(d.position++) != 0) this.gender = 0; else this.gender = 4;
		if(out) d.writeInt(this.healthNow); else this.healthNow = d.readInt();
		if(out) d.writeInt(this.healthMax); else this.healthMax = d.readInt();
		if(out) d.writeInt(this.manaNow); else this.manaNow = d.readInt();
		if(out) d.writeInt(this.manaMax); else this.manaMax = d.readInt();
		if(v >= 145) {
			if(out) d.writeByte(this.extraAccessory?1:0); else this.extraAccessory = d.data.getUint8(d.position++) != 0;
			if(v >= 230) {
				if(out) d.writeByte(this.unlockedBiomeTorches?1:0); else this.unlockedBiomeTorches = d.data.getUint8(d.position++) != 0;
				if(out) d.writeByte(this.usingBiomeTorches?1:0); else this.usingBiomeTorches = d.data.getUint8(d.position++) != 0;
			}
			if(v >= 269) {
				if(out) {
					var _g2 = 0;
					while(_g2 < 7) {
						var i2 = _g2++;
						d.writeByte(this.extraUsingFlags[i2]?1:0);
					}
				} else {
					var _g3 = 0;
					while(_g3 < 7) {
						var i3 = _g3++;
						this.extraUsingFlags[i3] = d.data.getUint8(d.position++) != 0;
					}
				}
			}
			if(isSwitch?v > 190:v >= 184) {
				if(out) d.writeByte(this.finishedDD2Event?1:0); else this.finishedDD2Event = d.data.getUint8(d.position++) != 0;
			}
			if(out) d.writeInt(this.taxMoney); else this.taxMoney = d.readInt();
			if(v >= 269) {
				if(out) {
					d.writeInt(this.pveDeaths);
					d.writeInt(this.pvpDeaths);
				} else {
					this.pveDeaths = d.readInt();
					this.pvpDeaths = d.readInt();
				}
			}
		}
		if(out) utils_ByteArrayTools.writeColor(d,this.hairColor); else this.hairColor = d.data.getUint8(d.position++) << 16 | d.data.getUint8(d.position++) << 8 | d.data.getUint8(d.position++);
		if(out) utils_ByteArrayTools.writeColor(d,this.skinColor); else this.skinColor = d.data.getUint8(d.position++) << 16 | d.data.getUint8(d.position++) << 8 | d.data.getUint8(d.position++);
		if(out) utils_ByteArrayTools.writeColor(d,this.eyeColor); else this.eyeColor = d.data.getUint8(d.position++) << 16 | d.data.getUint8(d.position++) << 8 | d.data.getUint8(d.position++);
		if(out) utils_ByteArrayTools.writeColor(d,this.shirtColor); else this.shirtColor = d.data.getUint8(d.position++) << 16 | d.data.getUint8(d.position++) << 8 | d.data.getUint8(d.position++);
		if(out) utils_ByteArrayTools.writeColor(d,this.underColor); else this.underColor = d.data.getUint8(d.position++) << 16 | d.data.getUint8(d.position++) << 8 | d.data.getUint8(d.position++);
		if(out) utils_ByteArrayTools.writeColor(d,this.pantsColor); else this.pantsColor = d.data.getUint8(d.position++) << 16 | d.data.getUint8(d.position++) << 8 | d.data.getUint8(d.position++);
		if(out) utils_ByteArrayTools.writeColor(d,this.shoesColor); else this.shoesColor = d.data.getUint8(d.position++) << 16 | d.data.getUint8(d.position++) << 8 | d.data.getUint8(d.position++);
		var handleSlot = function(slot) {
			slot.handle(_g,d,v,out);
		};
		var handleSlots = function(arr) {
			var _g1 = 0;
			while(_g1 < arr.length) {
				var slot1 = arr[_g1];
				++_g1;
				handleSlot(slot1);
			}
		};
		this.loadouts[0].handle(this,d,v,out);
		handleSlots(this.inventory);
		handleSlots(this.coins);
		handleSlots(this.ammo);
		var _g4 = 0;
		while(_g4 < 5) {
			var i4 = _g4++;
			handleSlot(this.equipmentItems[i4]);
			handleSlot(this.equipmentDyes[i4]);
		}
		if(v >= 168 || isSwitch) {
			handleSlots(this.bankItems);
			handleSlots(this.safeItems);
		} else {
			var _g11 = 0;
			var _g5 = this.bankItems.length;
			while(_g11 < _g5) {
				var i5 = _g11++;
				handleSlot(this.bankItems[i5]);
				handleSlot(this.safeItems[i5]);
			}
		}
		handleSlots(this.forgeItems);
		handleSlots(this.voidItems);
		if(v >= 200) {
			if(out) d.writeByte(this.voidVaultByte); else this.voidVaultByte = d.data.getUint8(d.position++);
		}
		if(v >= 269) n = 44; else if(v >= 77) n = 22; else n = 10;
		i = 0;
		while(i < n) {
			if(out) {
				d.writeInt(this.buffs[i].id);
				d.writeInt(this.buffs[i].time | 0);
			} else {
				k = d.readInt();
				this.buffs[i].set(k,d.readInt());
			}
			i++;
		}
		var sv;
		if(out) {
			n = this.servers.length;
			i = 0;
			while(i < n) {
				sv = this.servers[i];
				if(sv.spawnX != 0 || sv.spawnY != 0 || sv.address != 0) {
					d.writeInt(sv.spawnX);
					d.writeInt(sv.spawnY);
					d.writeInt(sv.address);
					utils_ByteArrayTools.writeSharpString(d,sv.name);
				}
				i++;
			}
			d.writeInt(-1);
		} else {
			i = 0;
			while(i < 200) {
				k = d.readInt();
				if(k == -1) break;
				sv = new terra_ServerEntry();
				sv.spawnX = k;
				sv.spawnY = d.readInt();
				sv.address = d.readInt();
				sv.name = utils_ByteArrayTools.readSharpString(d);
				if(sv.spawnX != 0 || sv.spawnY != 0 || sv.address != 0) this.servers.push(sv);
				i++;
			}
		}
		if(out) d.writeByte(this.hotbarLocked?1:0); else this.hotbarLocked = d.data.getUint8(d.position++) != 0;
		if(v >= 145) {
			n = 13;
			i = 0;
			while(i < n) {
				if(out) d.writeByte(this.hideInfo[i]?1:0); else this.hideInfo[i] = d.data.getUint8(d.position++) != 0;
				i++;
			}
		}
		if(v >= 98) {
			if(out) d.writeInt(this.fishingQuestsCompleted); else this.fishingQuestsCompleted = d.readInt();
		}
		if(v >= 168) {
			if(!isSwitch || v > 190) {
				n = 4;
				i = 0;
				while(i < n) {
					if(out) d.writeInt(this.dpadBindings[i]); else this.dpadBindings[i] = d.readInt();
					i++;
				}
			}
			n = 10;
			if(v >= 200) n = 11;
			if(v >= 230) n = 12;
			i = 0;
			while(i < n) {
				if(out) d.writeInt(this.builderAccStatus[i]); else this.builderAccStatus[i] = d.readInt();
				i++;
			}
		}
		if(v >= 184) {
			if(out) d.writeInt(this.bartenderQuests); else this.bartenderQuests = d.readInt();
		}
		if(v >= 200) {
			if(out) {
				d.writeByte(this.isDead?1:0);
				if(this.isDead) d.writeInt(this.respawnTimer);
			} else {
				this.isDead = d.data.getUint8(d.position++) != 0;
				if(this.isDead) this.respawnTimer = d.readInt();
			}
			if(out) {
				d.writeInt(this.lastTimeSaved_1);
				d.writeInt(this.lastTimeSaved_2);
				d.writeInt(this.golferScore);
			} else {
				this.lastTimeSaved_1 = d.readInt();
				this.lastTimeSaved_2 = d.readInt();
				this.golferScore = d.readInt();
			}
			if(out) {
				this.researchByItemPID = [];
				var _g6 = 0;
				var _g12 = this.researchSlots;
				while(_g6 < _g12.length) {
					var slot2 = _g12[_g6];
					++_g6;
					if(slot2.item == null || slot2.item.id == 0) continue;
					var pid = terra_Item.id2pid.h[slot2.item.id];
					if(pid == null) continue;
					this.researchByItemPID.push(new terra_PlayerResearch(pid,slot2.count));
				}
				d.writeInt(this.researchByItemPID.length);
				var _g7 = 0;
				var _g13 = this.researchByItemPID;
				while(_g7 < _g13.length) {
					var kv = _g13[_g7];
					++_g7;
					utils_ByteArrayTools.writeSharpString(d,kv.pid);
					d.writeInt(kv.count);
				}
			} else {
				var n1 = d.readInt();
				this.researchByItemPID = [];
				this.researchSlots = [];
				i = 0;
				while(i < n1) {
					var kvs = utils_ByteArrayTools.readSharpString(d);
					k = d.readInt();
					this.researchByItemPID.push(new terra_PlayerResearch(kvs,k));
					var nid = terra_Item.pid2id.get(kvs);
					if(nid != null) {
						var slot3 = new terra_Slot();
						slot3.item = terra_Item.idMap.h[nid];
						slot3.count = k;
						slot3.multi = true;
						slot3.favFlagMinVersion = 0;
						this.researchSlots.push(slot3);
					}
					i++;
				}
			}
			var flags;
			if(out) {
				flags = 0;
				var _g14 = 0;
				var _g8 = this.tempItems.length;
				while(_g14 < _g8) {
					var i6 = _g14++;
					if(this.tempItems[i6].get_isValid()) flags |= 1 << i6;
				}
				d.writeByte(flags);
				var _g15 = 0;
				var _g9 = this.tempItems.length;
				while(_g15 < _g9) {
					var i7 = _g15++;
					if((flags & 1 << i7) != 0) this.tempItems[i7].save(d);
				}
			} else {
				flags = d.data.getUint8(d.position++);
				var _g16 = 0;
				var _g10 = this.tempItems.length;
				while(_g16 < _g10) {
					var i8 = _g16++;
					if((flags & 1 << i8) != 0) this.tempItems[i8].load(d);
				}
			}
		} else if(!out) {
			this.researchByItemPID = [];
			var _g17 = 0;
			var _g18 = this.tempItems;
			while(_g17 < _g18.length) {
				var slot4 = _g18[_g17];
				++_g17;
				slot4.clear();
			}
			this.researchSlots = [];
		}
		if(v >= 220) {
			if(out) {
				var _g19 = 0;
				var _g110 = this.creativePowersOrder;
				while(_g19 < _g110.length) {
					var id = _g110[_g19];
					++_g19;
					d.writeByte(1);
					d.writeShort(id);
					this.creativePowers[id](d,out);
				}
				d.writeByte(0);
			} else {
				this.creativePowersOrder = [];
				while(d.data.getUint8(d.position++) != 0) {
					var id1 = d.readShort();
					this.creativePowersOrder.push(id1);
					this.creativePowers[id1](d,out);
				}
			}
		}
		if(v >= 253) {
			if(out) d.writeByte(this.superCartByte); else this.superCartByte = d.data.getUint8(d.position++);
		} else if(!out) this.superCartByte = 0;
		if(v >= 269) {
			if(out) d.writeInt(this.currentLoadout); else this.currentLoadout = d.readInt();
			var _g111 = 1;
			var _g20 = this.loadouts.length;
			while(_g111 < _g20) {
				var i9 = _g111++;
				this.loadouts[i9].handle(this,d,v,out);
			}
		} else if(!out) this.currentLoadout = 0;
		var len = d.length;
		if(!out) {
			var prev = d.position;
			d.position = len - 1;
			n = d.data.getUint8(d.position++);
			if(n > 0 && n < 16) {
				d.position = len - n;
				i = 0;
				while(i < n) {
					if(d.data.getUint8(d.position++) != n) break;
					i++;
				}
				if(i >= n) len -= n;
			}
			d.position = prev;
		}
		if(out) {
			if(this.trail != null) {
				this.trail.position = 0;
				n = this.trail.length;
				while(--n >= 0) {
					var b = this.trail.readByte();
					d.writeByte(b);
				}
			}
		} else {
			n = len - d.position;
			console.log("" + n + " trailing bytes");
			if(n > 0) {
				this.trail = new openfl_utils_ByteArray();
				while(--n >= 0) this.trail.writeByte(d.data.getUint8(d.position++));
			} else this.trail = null;
		}
		if(out) {
			i = n = 16 - (d.length & 15);
			while(--n >= 0) d.writeByte(i);
		}
		this.loadouts[1 + this.currentLoadout].setTo(this.loadouts[0]);
		if(!out) console.log("ready");
	}
	,load: function(d) {
		this.handle(d,false);
	}
	,save: function(d) {
		this.handle(d,true);
	}
	,__class__: terra_Player
};
var terra_PlayerLoadout = function(index) {
	this.hide = (function($this) {
		var $r;
		var _g = [];
		{
			var _g1 = 0;
			while(_g1 < 10) {
				var i = _g1++;
				_g.push(false);
			}
		}
		$r = _g;
		return $r;
	}(this));
	var _g = this;
	this.primary = index == 0;
	var alt = index > 1;
	this.items = terra_PlayerTools.createSlots(10,function(i,slot) {
		slot.multi = !_g.primary;
		if(alt) slot.visAvail = terra_PlayerLoadout.altLoadoutAvail;
		if(i == 8) if(alt) slot.visAvail = terra_PlayerLoadout.extraAccessoryAvailAlt; else slot.visAvail = terra_PlayerLoadout.extraAccessoryAvail;
		if(i == 9) if(alt) slot.visAvail = terra_PlayerLoadout.masterAcessoryOrDyeAvailAlt; else slot.visAvail = terra_PlayerLoadout.masterAcessoryOrDyeAvail;
	});
	this.social = terra_PlayerTools.createSlots(10,function(i1,slot1) {
		slot1.multi = !_g.primary;
		if(alt) slot1.visAvail = terra_PlayerLoadout.altLoadoutAvail;
		if(i1 >= 3 && i1 < 8) if(alt) slot1.visAvail = terra_PlayerLoadout.socialAccessoryOrDyeAvailAlt; else slot1.visAvail = terra_PlayerLoadout.socialAccessoryOrDyeAvail;
		if(i1 == 8) if(alt) slot1.visAvail = terra_PlayerLoadout.extraAccessoryAvailAlt; else slot1.visAvail = terra_PlayerLoadout.extraAccessoryAvail;
		if(i1 == 9) if(alt) slot1.visAvail = terra_PlayerLoadout.masterAcessoryOrDyeAvailAlt; else slot1.visAvail = terra_PlayerLoadout.masterAcessoryOrDyeAvail;
	});
	this.dyes = terra_PlayerTools.createSlots(10,function(i2,slot2) {
		slot2.multi = !_g.primary;
		if(alt) slot2.visAvail = terra_PlayerLoadout.altLoadoutAvail;
		if(i2 >= 3 && i2 < 8) if(alt) slot2.visAvail = terra_PlayerLoadout.socialAccessoryOrDyeAvailAlt; else slot2.visAvail = terra_PlayerLoadout.socialAccessoryOrDyeAvail;
		if(i2 == 8) if(alt) slot2.visAvail = terra_PlayerLoadout.extraAccessoryAvailAlt; else slot2.visAvail = terra_PlayerLoadout.extraAccessoryAvail;
		if(i2 == 9) if(alt) slot2.visAvail = terra_PlayerLoadout.masterAcessoryOrDyeAvailAlt; else slot2.visAvail = terra_PlayerLoadout.masterAcessoryOrDyeAvail;
	});
};
$hxClasses["terra.PlayerLoadout"] = terra_PlayerLoadout;
terra_PlayerLoadout.__name__ = ["terra","PlayerLoadout"];
terra_PlayerLoadout.extraAccessoryAvail = function(p) {
	return p.invVersion >= 145 && p.extraAccessory || p.difficulty == 3;
};
terra_PlayerLoadout.socialAccessoryOrDyeAvail = function(p) {
	return p.invVersion >= 81;
};
terra_PlayerLoadout.masterAcessoryOrDyeAvail = function(p) {
	return p.invVersion >= 200 && p.difficulty != 3;
};
terra_PlayerLoadout.extraAccessoryAvailAlt = function(p) {
	return p.invVersion >= 269 && terra_PlayerLoadout.extraAccessoryAvail(p);
};
terra_PlayerLoadout.socialAccessoryOrDyeAvailAlt = function(p) {
	return p.invVersion >= 269 && terra_PlayerLoadout.socialAccessoryOrDyeAvail(p);
};
terra_PlayerLoadout.masterAcessoryOrDyeAvailAlt = function(p) {
	return p.invVersion >= 269 && terra_PlayerLoadout.masterAcessoryOrDyeAvail(p);
};
terra_PlayerLoadout.altLoadoutAvail = function(p) {
	return p.invVersion >= 269;
};
terra_PlayerLoadout.prototype = {
	handle: function(p,d,v,out) {
		if(this.primary) {
			if(v >= 145) {
				var _g = 0;
				while(_g < 10) {
					var i = _g++;
					this.items[i].handle(p,d,v,out);
				}
				var _g1 = 0;
				while(_g1 < 10) {
					var i1 = _g1++;
					this.social[i1].handle(p,d,v,out);
				}
				var _g2 = 0;
				while(_g2 < 10) {
					var i2 = _g2++;
					this.dyes[i2].handle(p,d,v,out);
				}
			} else if(v >= 81) {
				var _g3 = 0;
				while(_g3 < 8) {
					var i3 = _g3++;
					this.items[i3].handle(p,d,v,out);
				}
				var _g4 = 0;
				while(_g4 < 8) {
					var i4 = _g4++;
					this.social[i4].handle(p,d,v,out);
				}
				var _g5 = 0;
				while(_g5 < 8) {
					var i5 = _g5++;
					this.dyes[i5].handle(p,d,v,out);
				}
			} else {
				var _g6 = 0;
				while(_g6 < 8) {
					var i6 = _g6++;
					this.items[i6].handle(p,d,v,out);
				}
				var _g7 = 0;
				while(_g7 < 3) {
					var i7 = _g7++;
					this.social[i7].handle(p,d,v,out);
				}
				if(v > 39) {
					var _g8 = 0;
					while(_g8 < 3) {
						var i8 = _g8++;
						this.dyes[i8].handle(p,d,v,out);
					}
				}
			}
		} else {
			var _g9 = 0;
			while(_g9 < 10) {
				var i9 = _g9++;
				this.items[i9].handle(p,d,v,out);
			}
			var _g10 = 0;
			while(_g10 < 10) {
				var i10 = _g10++;
				this.social[i10].handle(p,d,v,out);
			}
			var _g11 = 0;
			while(_g11 < 10) {
				var i11 = _g11++;
				this.dyes[i11].handle(p,d,v,out);
			}
			var _g12 = 0;
			while(_g12 < 10) {
				var i12 = _g12++;
				if(out) d.writeByte(this.hide[i12]?1:0); else this.hide[i12] = d.data.getUint8(d.position++) != 0;
			}
		}
	}
	,clear: function() {
		var _g = 0;
		while(_g < 10) {
			var i = _g++;
			this.items[i].clear();
			this.social[i].clear();
			this.dyes[i].clear();
		}
	}
	,setTo: function(q) {
		var _g = 0;
		while(_g < 10) {
			var i = _g++;
			this.items[i].setTo(q.items[i]);
			this.social[i].setTo(q.social[i]);
			this.dyes[i].setTo(q.dyes[i]);
		}
	}
	,__class__: terra_PlayerLoadout
};
var terra_PlayerResearch = function(pid,count) {
	this.pid = pid;
	this.count = count;
};
$hxClasses["terra.PlayerResearch"] = terra_PlayerResearch;
terra_PlayerResearch.__name__ = ["terra","PlayerResearch"];
terra_PlayerResearch.prototype = {
	__class__: terra_PlayerResearch
};
var terra_PlayerTools = function() { };
$hxClasses["terra.PlayerTools"] = terra_PlayerTools;
terra_PlayerTools.__name__ = ["terra","PlayerTools"];
terra_PlayerTools.createSlots = function(count,iter) {
	var slots = [];
	var _g = 0;
	while(_g < count) {
		var i = _g++;
		var slot = new terra_Slot();
		slots[i] = slot;
		if(iter != null) iter(i,slot);
	}
	return slots;
};
terra_PlayerTools.getMaxIds = function(v) {
	var i;
	var b;
	if(v > 200) {
		i = 16384;
		b = 1024;
	} else if(v >= 190) {
		i = 3929;
		b = 205;
	} else if(v >= 184) {
		i = 3883;
		b = 205;
	} else if(v >= 175) {
		i = 3796;
		b = 190;
	} else if(v >= 168) {
		i = 3729;
		b = 190;
	} else if(v >= 145) {
		i = 3601;
		b = 190;
	} else if(v >= 98) {
		i = 2748;
		b = 139;
	} else if(v >= 93) {
		i = 2288;
		b = 103;
	} else if(v >= 77) {
		i = 1965;
		b = 93;
	} else if(v >= 70) {
		i = 1725;
		b = 80;
	} else if(v >= 69) {
		i = 1614;
		b = 80;
	} else if(v >= 39) {
		i = 603;
		b = 40;
	} else {
		i = 603;
		b = 40;
	}
	return { item : i, buff : b};
};
var terra_ServerEntry = function() {
	this.name = "";
	this.address = 0;
	this.spawnY = 0;
	this.spawnX = 0;
};
$hxClasses["terra.ServerEntry"] = terra_ServerEntry;
terra_ServerEntry.__name__ = ["terra","ServerEntry"];
terra_ServerEntry.prototype = {
	__class__: terra_ServerEntry
};
var terra_Slot = function() {
	this.isFavorited = false;
	this.favFlagMinVersion = 0;
	this.avail = terra_Slot._default_avail;
	this.multi = false;
	this.prefix = 0;
	this.count = 0;
	this.item = null;
	var _g = this;
	this.visAvail = function(p) {
		return _g.avail(p);
	};
};
$hxClasses["terra.Slot"] = terra_Slot;
terra_Slot.__name__ = ["terra","Slot"];
terra_Slot._default_avail = function(p) {
	return true;
};
terra_Slot.prototype = {
	setTo: function(q) {
		this.item = q.item;
		if(this.multi) this.count = q.count; else if(q.count > 0) this.count = 1; else this.count = 0;
		this.prefix = q.prefix;
	}
	,get_isValid: function() {
		return this.item != null && this.item.id != 0;
	}
	,clear: function() {
		this.item = null;
		this.count = this.prefix = 0;
	}
	,isEmpty: function() {
		return terra_Item.isEmpty(this.item);
	}
	,handle: function(p,d,v,out) {
		if(!this.avail(p)) {
			if(!out) this.clear();
			return;
		}
		var id;
		if(out) if(this.item != null) id = this.item.id; else id = 0; else id = d.readInt();
		if(id > terra_Slot.maxId) {
			console.log("Invalid id " + id);
			id = 0;
		}
		if(out) d.writeInt(id); else this.item = terra_Item.fromId(id);
		if(out) {
			if(this.multi) d.writeInt(this.count);
		} else if(this.multi) this.count = d.readInt(); else this.count = 1;
		if(out) d.writeByte(this.prefix); else this.prefix = d.data.getUint8(d.position++);
		if(this.favFlagMinVersion > 0 && v >= this.favFlagMinVersion) {
			if(out) d.writeByte(this.isFavorited?1:0); else this.isFavorited = d.data.getUint8(d.position++) != 0;
		}
	}
	,load: function(d) {
		this.item = terra_Item.fromId(d.readInt());
		if(this.multi) this.count = d.readInt(); else this.count = 1;
		this.prefix = d.data.getUint8(d.position++);
	}
	,save: function(d) {
		d.writeInt(this.item != null?this.item.id:0);
		if(this.multi) d.writeInt(this.count);
		d.writeByte(this.prefix);
	}
	,__class__: terra_Slot
};
var terra_data_TdBuff = function() { };
$hxClasses["terra.data.TdBuff"] = terra_data_TdBuff;
terra_data_TdBuff.__name__ = ["terra","data","TdBuff"];
var terra_data_TdItem = function() { };
$hxClasses["terra.data.TdItem"] = terra_data_TdItem;
terra_data_TdItem.__name__ = ["terra","data","TdItem"];
var utils_BMFont = function(size,lineHeight,base,perStyle,_pages,chars,kernings) {
	this.unknown = 0;
	var m = perStyle > 1;
	var i;
	var l;
	var j;
	var s;
	var p;
	var n;
	this.size = size;
	this.base = base;
	this.perStyle = perStyle;
	this.lineHeight = lineHeight;
	this.pages = [];
	l = _pages.length;
	i = -1;
	while(++i < l) {
		n = _pages[i];
		this.pages[i] = p = [];
		j = -1;
		while(++j < perStyle) p.push(openfl_Assets.getBitmapData(n[j]));
	}
	this.glyphs = new haxe_ds_IntMap();
	if(m) s = 9; else s = 8;
	i = 0;
	l = chars.length;
	while(i < l) {
		var value = new utils_BMGlyph(chars[i + 1],chars[i + 2],chars[i + 3],chars[i + 4],chars[i + 5],chars[i + 6],chars[i + 7],m?chars[i + 8]:0);
		this.glyphs.h[chars[i]] = value;
		i += s;
	}
	i = 0;
	l = kernings.length;
	while(i < l) {
		var g = this.glyphs.h[kernings[i]];
		if(g != null) {
			if(g.k == null) g.k = new haxe_ds_IntMap();
			g.k.h[kernings[i + 1]] = kernings[i + 2];
		}
		i += 3;
	}
};
$hxClasses["utils.BMFont"] = utils_BMFont;
utils_BMFont.__name__ = ["utils","BMFont"];
utils_BMFont.prototype = {
	measure: function(text,x,y,hx,vx,r) {
		if(vx == null) vx = 0;
		if(hx == null) hx = 0;
		if(r == null) r = new utils_BMInfo();
		r.text = text;
		text += "\n";
		r.x = x;
		r.halign = hx;
		r.y = y;
		r.valign = vx;
		var i = -1;
		var n = 0;
		var l = text.length;
		var c;
		var u;
		var v;
		var m = this.glyphs;
		var k = null;
		var g;
		var s = this.lineHeight;
		var z = this.unknown;
		r.width = r.height = u = v = 0;
		while(++i < l) if((c = text.charCodeAt(i)) == 10) {
			r.sizes[n++] = u;
			if(u > r.width) r.width = u;
			u = 0;
			v += s;
			k = null;
		} else if((g = m.h[c]) != null || z > 0 && ((function($this) {
			var $r;
			var key = c = z;
			$r = g = m.h[key];
			return $r;
		}(this))) != null) {
			if(k != null && k.h.hasOwnProperty(c)) u += k.h[c];
			u += g.s;
			k = g.k;
		}
		r.height = v;
		r.left = x - (r.width * hx >> 1);
		r.top = y - (r.height * vx >> 1);
		r.right = r.left + r.width;
		r.bottom = r.top + r.height;
		return r;
	}
	,draw: function(o,text,x,y,hx,vx,j,r) {
		if(j == null) j = 0;
		if(vx == null) vx = 0;
		if(hx == null) hx = 0;
		if(r == null) r = utils_BMFont._inf = this.measure(text,x,y,hx,vx,utils_BMFont._inf);
		var i = -1;
		var n = 0;
		var l = text.length;
		var c;
		var u;
		var v;
		var rx;
		var ry;
		var m = this.glyphs;
		var g;
		var k = null;
		var s = this.lineHeight;
		var t = this.pages[j];
		var z = this.unknown;
		var q = utils_BMFont._rect;
		var ofs = utils_BMFont._offset;
		u = x - (r.sizes[0] * hx >> 1);
		v = y - (r.height * vx >> 1);
		while(++i < l) if((c = text.charCodeAt(i)) == 10) {
			u = x - (r.sizes[++n] * hx >> 1);
			v += s;
			k = null;
		} else if((g = m.h[c]) != null || z > 0 && ((function($this) {
			var $r;
			var key = c = z;
			$r = g = m.h[key];
			return $r;
		}(this))) != null) {
			if(k != null && k.h.hasOwnProperty(c)) u += k.h[c];
			q.width = g.w;
			q.height = g.h;
			rx = u + g.x;
			ry = v + g.y;
			q.x = rx;
			ofs.tx = rx - g.u;
			q.y = ry;
			ofs.ty = ry - g.v;
			o.draw(t[g.p],ofs,null,null,q,false);
			u += g.s;
		}
	}
	,select: function(text,i0,i1,x,y,hx,vx,h,r) {
		if(vx == null) vx = 0;
		if(hx == null) hx = 0;
		if(r == null) r = utils_BMFont._inf = this.measure(text,x,y,hx,vx,utils_BMFont._inf);
		var i;
		var n = 0;
		var l = text.length;
		var c;
		var u;
		var v;
		var m = this.glyphs;
		var g;
		var s = this.lineHeight;
		var f;
		var z = this.unknown;
		if(i0 > i1) {
			i = i0;
			i0 = i1;
			i1 = i;
		}
		if(i0 < 0) i0 = 0;
		if(i1 > l) i1 = l;
		f = u = x - (r.sizes[0] * hx >> 1);
		v = y - (r.height * vx >> 1);
		if(i1 == 0) {
			h(f,u,v);
			return;
		}
		i = -1;
		while(++i < l) if((c = text.charCodeAt(i)) == 10) {
			h(f,u,v);
			f = u = x - (r.sizes[++n] * hx >> 1);
			v += s;
		} else if((g = m.h[c]) != null || z > 0 && ((function($this) {
			var $r;
			var key = c = z;
			$r = g = m.h[key];
			return $r;
		}(this))) != null) {
			if(i == i0) f = u;
			u += g.s;
			if(i + 1 == i1) {
				h(i0 == i1?u:f,u,v);
				break;
			}
		}
	}
	,__class__: utils_BMFont
};
var utils_BMGlyph = function(u,v,w,h,x,y,s,p) {
	this.u = u;
	this.v = v;
	this.w = w;
	this.h = h;
	this.x = x;
	this.y = y;
	this.s = s;
	this.p = p;
	this.k = null;
};
$hxClasses["utils.BMGlyph"] = utils_BMGlyph;
utils_BMGlyph.__name__ = ["utils","BMGlyph"];
utils_BMGlyph.prototype = {
	__class__: utils_BMGlyph
};
var utils_BMInfo = function() {
	this.sizes = [];
};
$hxClasses["utils.BMInfo"] = utils_BMInfo;
utils_BMInfo.__name__ = ["utils","BMInfo"];
utils_BMInfo.prototype = {
	__class__: utils_BMInfo
};
var utils_ByteArrayTools = function() { };
$hxClasses["utils.ByteArrayTools"] = utils_ByteArrayTools;
utils_ByteArrayTools.__name__ = ["utils","ByteArrayTools"];
utils_ByteArrayTools.readSharpString = function(o) {
	var l = o.data.getUint8(o.position++);
	if(l != 0) return o.readUTFBytes(l); else return "";
};
utils_ByteArrayTools._getUTFBytesCount = function(value) {
	var r = 0;
	var i = -1;
	var l = value.length;
	var c;
	while(++i < l) {
		c = value.charCodeAt(i);
		if(c <= 127) r += 1; else if(c <= 2047) r += 2; else if(c <= 65535) r += 3; else r += 4;
	}
	return r;
};
utils_ByteArrayTools.writeSharpString = function(o,v) {
	o.writeByte(utils_ByteArrayTools._getUTFBytesCount(v));
	o.writeUTFBytes(v);
};
utils_ByteArrayTools.writeColor = function(o,v) {
	o.writeByte(v >> 16 & 255);
	o.writeByte(v >> 8 & 255);
	o.writeByte(v & 255);
};
utils_ByteArrayTools.getStringSliceDump = function(o,start,len) {
	var p = o.position;
	o.position = start;
	var r = "";
	var _g = 0;
	while(_g < len) {
		var _ = _g++;
		var b = o.data.getUint8(o.position++);
		if(b < 32) r += "?"; else r += String.fromCharCode(b);
	}
	o.position = p;
	return r;
};
utils_ByteArrayTools.toPages = function(o) {
	var p = -1;
	var l = o.length;
	var q = o.position;
	var r = "";
	o.position = 0;
	while(++p < l) {
		if((p & 15) == 0) r += StringTools.hex(p,3) + " |";
		r += (q == p?">":" ") + StringTools.hex(o.data.getUint8(o.position++),2);
		if((p & 15) == 15) {
			r += " | " + utils_ByteArrayTools.getStringSliceDump(o,p - 15,16);
			r += "\n";
		}
	}
	var c = p & 15;
	if(c != 0) {
		r += StringTools.lpad(""," ..",(16 - c) * 3);
		r += " | " + utils_ByteArrayTools.getStringSliceDump(o,l - c,c);
	}
	o.position = q;
	return r;
};
utils_ByteArrayTools.__init_crypto = function() {
	utils_ByteArrayTools.aesKey = utils_Convert.utf2ints("h3y_gUyZ");
};
utils_ByteArrayTools.encrypt = function(by) {
	if(utils_ByteArrayTools.aesKey == null) utils_ByteArrayTools.__init_crypto();
	utils_ByteArrayTools._ints = utils_Convert.byteArray2ints(by,utils_ByteArrayTools._ints);
	utils_Convert.ints2byteArray(org_ascrypt_AES.encrypt(utils_ByteArrayTools.aesKey,utils_ByteArrayTools._ints,"cbc",utils_ByteArrayTools.aesKey),by);
	return by;
};
utils_ByteArrayTools.decrypt = function(by) {
	if(utils_ByteArrayTools.aesKey == null) utils_ByteArrayTools.__init_crypto();
	utils_ByteArrayTools._ints = utils_Convert.byteArray2ints(by,utils_ByteArrayTools._ints);
	utils_Convert.ints2byteArray(org_ascrypt_AES.decrypt(utils_ByteArrayTools.aesKey,utils_ByteArrayTools._ints,"cbc",utils_ByteArrayTools.aesKey),by);
	return by;
};
var utils_Convert = function() { };
$hxClasses["utils.Convert"] = utils_Convert;
utils_Convert.__name__ = ["utils","Convert"];
utils_Convert.utf2ints = function(v,r) {
	if(r == null) r = []; else r.splice(0,r.length);
	var i = -1;
	var l = v.length;
	var c;
	while(++i < l) {
		c = HxOverrides.cca(v,i);
		r.push(c & 255);
		r.push(c >> 8 & 255);
	}
	return r;
};
utils_Convert.byteArray2ints = function(v,r) {
	if(r == null) r = []; else r.splice(0,r.length);
	var q = v.position;
	var n = v.length;
	v.position = 0;
	while(n-- > 0) r.push(v.data.getUint8(v.position++));
	v.position = q;
	return r;
};
utils_Convert.ints2byteArray = function(v,r) {
	if(r == null) r = new openfl_utils_ByteArray(); else r.clear();
	var i = -1;
	var l = v.length;
	while(++i < l) r.writeByte(v[i]);
	r.position = 0;
	return r;
};
var utils_Mix = function() { };
$hxClasses["utils.Mix"] = utils_Mix;
utils_Mix.__name__ = ["utils","Mix"];
utils_Mix.__js_init__ = function() {
	var k = function(i) {
		return (10 + i).toString(36);
	};
	var l = function(i1) {
		return k(i1).toLowerCase();
	};
	var u = function(i2) {
		return k(i2).toUpperCase();
	};
	var d = [5,17,14,12,-2,7,0,17,-2,14,3,4];
	var a = "";
	var i3 = 0;
	var v;
	while((v = d[i3++]) != null) if(v < 0) a += u(-v); else a += l(v);
	stringCharCode = js_Boot.getClass("")[a];
};
var utils_PakoZip = function(url,fn) {
	this.ready = null;
	this.entryMap = new haxe_ds_StringMap();
	this.entries = [];
	var _g = this;
	var req = new XMLHttpRequest();
	req.open("GET",url,true);
	req.responseType = "arraybuffer";
	req.onload = function(e) {
		var reqbuf = req.response;
		if(reqbuf != null) {
			var reqBytes = haxe_io_Bytes.ofData(reqbuf);
			var input = new haxe_io_BytesInput(reqBytes);
			var zipEntries = haxe_zip_Reader.readZip(input);
			var content = haxe_Resource.content;
			var _g_head = zipEntries.h;
			var _g_val = null;
			while(_g_head != null) {
				var e1;
				e1 = (function($this) {
					var $r;
					_g_val = _g_head[0];
					_g_head = _g_head[1];
					$r = _g_val;
					return $r;
				}(this));
				var p = new utils_PakoEntry(e1);
				_g.entries.push(p);
				{
					_g.entryMap.set(e1.fileName,p);
					p;
				}
			}
			_g.ready = true;
			if(fn != null) fn(_g);
		} else {
			_g.ready = false;
			if(fn != null) fn(_g);
		}
	};
	req.onerror = function(e2) {
		_g.ready = false;
		if(fn != null) fn(_g);
	};
	req.send();
};
$hxClasses["utils.PakoZip"] = utils_PakoZip;
utils_PakoZip.__name__ = ["utils","PakoZip"];
utils_PakoZip.prototype = {
	getText: function(path) {
		var p = this.entryMap.get(path);
		if(p != null) return p.getText(); else return null;
	}
	,getJSON: function(path) {
		var text = this.getText(path);
		if(text != null) return JSON.parse(text); else return null;
	}
	,__class__: utils_PakoZip
};
var utils_PakoEntry = function(e) {
	this.text = null;
	this.hasText = false;
	this.bytes = null;
	this.hasBytes = false;
	this.entry = e;
};
$hxClasses["utils.PakoEntry"] = utils_PakoEntry;
utils_PakoEntry.__name__ = ["utils","PakoEntry"];
utils_PakoEntry.prototype = {
	getBytes: function() {
		if(!this.hasBytes) {
			this.hasBytes = true;
			if(this.entry.compressed) {
				var bytes0 = this.entry.data.b.bufferValue;
				var pako = Reflect.field(window,"pako");
				var bytes1 = (Reflect.field(pako,"inflateRaw"))(bytes0);
				this.bytes = haxe_io_Bytes.ofData(bytes1);
			} else this.bytes = this.entry.data;
		}
		return this.bytes;
	}
	,getText: function() {
		if(!this.hasText) {
			this.hasText = true;
			var b = this.getBytes();
			if(b != null) this.text = b.toString(); else this.text = null;
		}
		return this.text;
	}
	,__class__: utils_PakoEntry
};
var utils_WebArgs = function() { };
$hxClasses["utils.WebArgs"] = utils_WebArgs;
utils_WebArgs.__name__ = ["utils","WebArgs"];
utils_WebArgs.init = function() {
	var url = document.location.href;
	var i;
	var j;
	var k;
	var v;
	var p;
	if((i = url.indexOf("?")) >= 0) {
		url = HxOverrides.substr(url,i + 1,null);
		p = url.split("&");
		i = p.length;
		while(--i >= 0) {
			k = p[i];
			j = k.indexOf("=");
			if(j >= 0) {
				v = HxOverrides.substr(k,j + 1,null);
				k = HxOverrides.substr(k,0,j);
				v = unescape(v);
				{
					utils_WebArgs.map.set(k,v);
					v;
				}
			} else {
				utils_WebArgs.map.set(k,"");
				"";
			}
		}
	}
};
var $_, $fid = 0;
function $bind(o,m) { if( m == null ) return null; if( m.__id__ == null ) m.__id__ = $fid++; var f; if( o.hx__closures__ == null ) o.hx__closures__ = {}; else f = o.hx__closures__[m.__id__]; if( f == null ) { f = function(){ return f.method.apply(f.scope, arguments); }; f.scope = o; f.method = m; o.hx__closures__[m.__id__] = f; } return f; }
if(Array.prototype.indexOf) HxOverrides.indexOf = function(a,o,i) {
	return Array.prototype.indexOf.call(a,o,i);
};
$hxClasses.Math = Math;
String.prototype.__class__ = $hxClasses.String = String;
String.__name__ = ["String"];
$hxClasses.Array = Array;
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
if(Array.prototype.map == null) Array.prototype.map = function(f) {
	var a = [];
	var _g1 = 0;
	var _g = this.length;
	while(_g1 < _g) {
		var i = _g1++;
		a[i] = f(this[i]);
	}
	return a;
};
haxe_Resource.content = [];
var __map_reserved = {}
var ArrayBuffer = $global.ArrayBuffer || js_html_compat_ArrayBuffer;
if(ArrayBuffer.prototype.slice == null) ArrayBuffer.prototype.slice = js_html_compat_ArrayBuffer.sliceImpl;
var DataView = $global.DataView || js_html_compat_DataView;
var Uint8Array = $global.Uint8Array || js_html_compat_Uint8Array._new;
openfl_Lib.__init();
(function() {
	var a = Event.prototype;
	var b = openfl_events_Event.prototype;
	a.clone = b.clone;
	a.isDefaultPrevented = b.isDefaultPrevented;
	a.get_target = b.get_target;
	a.set_target = b.set_target;
	a.get_currentTarget = b.get_currentTarget;
	a.set_currentTarget = b.set_currentTarget;
})();
var stringCharCode;
utils_Mix.__js_init__();
ApplicationMain.AssetNames = ["img/overlay.png","img/buffs.png","img/color.png","img/nitems.png","img/og.png","img/shadow.png","img/side.png","img/visual.png"];
ApplicationMain.AssetBytes = [5647,156459,48411,12147,142332,120777,18384,21898];
Main.NITEMS = -49;
Main.hack = (function() {
	var bmd = openfl_display_BitmapData.prototype;
	var bmd_nmeLoadFromFile = bmd.nmeLoadFromFile;
	bmd.nmeLoadFromFile = function(url,loader) {
		switch(url) {
		case "img/color.png":case "img/shadow.png":
			url += "?v=2020-06-24";
			break;
		}
		console.log(url);
		bmd_nmeLoadFromFile.call(this,url,loader);
	};
	return true;
})();
Lang.defLang = Lang.initDefLang();
Lang.isDebug = false;
Lang.noBMFont = false;
Lang.useCustomFont = false;
Lang.rxIVar = new EReg("\\{\\$(\\w+)\\.(\\w+)\\}","g");
app_BuffNode.maxId = 16384;
app_SlotNode.maxId = 16384;
dom_Label.useBMFont = true;
dom_Label.canvasFont = "17px sans-serif";
dom_Label.canvasFontPre = "17px ";
dom_Label.canvasFontSerif = "sans-serif";
dom_Label.canvasLineHeight = 23;
app_Shelf.rxPage = new EReg("^Page (\\d+)$","");
app_Shelf.rxPages = new EReg("^Pages (\\d+)\\+$","");
app_Shelf.rxAuto = new EReg("^(.+?)\\((\\d+)\\)$","");
app_Shelf.rxNum = new EReg("^\\d+\\-\\d+$","");
app_TabMain.PART_GENDER = [3,4,5,6,7];
app_TabMain.ftColor = ["Hair","Skin","Eyes","Shirt","Undershirt","Pants","Shoes"];
app_BitPart.nullPoint = new openfl_geom_Point(0,0);
app_TabResearch.goalPerItem = new haxe_ds_IntMap();
app_TabServers.removeTooltipEn = "Removes the spawn point for the world." + "\nYou'll spawn on the default location afterwards.";
app_TabServers.removeTooltip = app_TabServers.removeTooltipEn;
app_TabVersion.versionNameMap = new haxe_ds_StringMap();
app_io_IoLoadResearch.prefix = "/terrasavr/research";
app_io_IoLoadResearch.prefixLen = app_io_IoLoadResearch.prefix.length;
dom_ButtonConfirm.confirmText = "Confirm?";
dom_ButtonConfirm.confirmTextEn = "Confirm?";
haxe_ds_ObjectMap.count = 0;
haxe_io_FPHelper.i64tmp = (function($this) {
	var $r;
	var x = new haxe__$Int64__$_$_$Int64(0,0);
	$r = x;
	return $r;
}(this));
haxe_zip_InflateImpl.LEN_EXTRA_BITS_TBL = [0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,-1,-1];
haxe_zip_InflateImpl.LEN_BASE_VAL_TBL = [3,4,5,6,7,8,9,10,11,13,15,17,19,23,27,31,35,43,51,59,67,83,99,115,131,163,195,227,258];
haxe_zip_InflateImpl.DIST_EXTRA_BITS_TBL = [0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,-1,-1];
haxe_zip_InflateImpl.DIST_BASE_VAL_TBL = [1,2,3,4,5,7,9,13,17,25,33,49,65,97,129,193,257,385,513,769,1025,1537,2049,3073,4097,6145,8193,12289,16385,24577];
haxe_zip_InflateImpl.CODE_LENGTHS_POS = [16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15];
js_Boot.__toStr = {}.toString;
js_html_compat_Uint8Array.BYTES_PER_ELEMENT = 1;
openfl_Assets.cache = new openfl_AssetCache();
openfl_Assets.libraries = new haxe_ds_StringMap();
openfl_Assets.initialized = false;
openfl_geom_Matrix.pool = [];
openfl_Lib.qTimeStamp = Date.now() + 0;
org_ascrypt_AES.ERROR_KEY = "Invalid key size. Key size needs to be either 128, 192 or 256 bits.\n";
org_ascrypt_AES.ERROR_MODE = "Invalid mode of operation. Supported modes are ECB, CBC, CTR or NONE.\n";
org_ascrypt_AES.ERROR_BLOCK = "Invalid block size. Block size is fixed at 128 bits.\n";
org_ascrypt_AES.srtab = [0,5,10,15,4,9,14,3,8,13,2,7,12,1,6,11];
org_ascrypt_AES.sbox = [99,124,119,123,242,107,111,197,48,1,103,43,254,215,171,118,202,130,201,125,250,89,71,240,173,212,162,175,156,164,114,192,183,253,147,38,54,63,247,204,52,165,229,241,113,216,49,21,4,199,35,195,24,150,5,154,7,18,128,226,235,39,178,117,9,131,44,26,27,110,90,160,82,59,214,179,41,227,47,132,83,209,0,237,32,252,177,91,106,203,190,57,74,76,88,207,208,239,170,251,67,77,51,133,69,249,2,127,80,60,159,168,81,163,64,143,146,157,56,245,188,182,218,33,16,255,243,210,205,12,19,236,95,151,68,23,196,167,126,61,100,93,25,115,96,129,79,220,34,42,144,136,70,238,184,20,222,94,11,219,224,50,58,10,73,6,36,92,194,211,172,98,145,149,228,121,231,200,55,109,141,213,78,169,108,86,244,234,101,122,174,8,186,120,37,46,28,166,180,198,232,221,116,31,75,189,139,138,112,62,181,102,72,3,246,14,97,53,87,185,134,193,29,158,225,248,152,17,105,217,142,148,155,30,135,233,206,85,40,223,140,161,137,13,191,230,66,104,65,153,45,15,176,84,187,22];
terra_Item.idMap = new haxe_ds_IntMap();
terra_Item.id2pid = new haxe_ds_IntMap();
terra_Item.pid2id = new haxe_ds_StringMap();
terra_Item.codeMap = new haxe_ds_StringMap();
terra_Item.list = [];
terra_ItemPrefix.pairDefs = [new terra_ItemPrefixPairDef("D","damage","$1% Damage"),new terra_ItemPrefixPairDef("d","defense","$1 Defense"),new terra_ItemPrefixPairDef("M","manaCost","$1% Mana Cost"),new terra_ItemPrefixPairDef("m","mana","$1 Max Mana"),new terra_ItemPrefixPairDef("C","critChance","$1% Critical strike chance"),new terra_ItemPrefixPairDef("K","knockback","$1% Knockback"),new terra_ItemPrefixPairDef("S","speed","$1% Speed"),new terra_ItemPrefixPairDef("Q","meleeSpeed","$1% Melee Speed"),new terra_ItemPrefixPairDef("s","moveSpeed","$1% Movement Speed"),new terra_ItemPrefixPairDef("Z","size","$1% Size")];
terra_ItemPrefix.pairMap = (function($this) {
	var $r;
	var m = new haxe_ds_StringMap();
	{
		var _g = 0;
		var _g1 = terra_ItemPrefix.pairDefs;
		while(_g < _g1.length) {
			var d = _g1[_g];
			++_g;
			{
				m.set(d.kind,d);
				d;
			}
		}
	}
	$r = m;
	return $r;
}(this));
terra_ItemPrefix.list = [];
terra_Slot.maxId = 16384;
terra_data_TdBuff.$name = ";Obsidian Skin;Regeneration;Swiftness;Gills;Ironskin;Mana Regeneration;Magic Power;Featherfall;Spelunker;Invisibility;Shine;Night Owl;Battle;Thorns;Water Walking;Archery;Hunter;Gravitation;Shadow Orb;Poisoned;Potion Sickness;Darkness;Cursed;On Fire!;Tipsy;Well Fed;Fairy;Werewolf;Clairvoyance;Bleeding;Confused;Slow;Weak;Merfolk;Silenced;Broken Armor;Horrified;The Tongue;Cursed Inferno;Pet Bunny;Baby Penguin;Pet Turtle;Paladins Shield;Frostburn;Baby Eater;Chilled;Frozen;Honey;Pygmies;Baby Skeletron Head;Baby Hornet;Tiki Spirit;Pet Lizard;Pet Parrot;Baby Truffle;Pet Sapling;Wisp;Rapid Healing;Holy Protection;Leaf Crystal;Baby Dinosaur;Ice Barrier;Panic!;Baby Slime;Eyeball Spring;Baby Snowman;Burning;Suffocation;Ichor;Acid Venom;Weapon Imbue: Acid Venom;Midas;Weapon Imbue: Cursed Flames;Weapon Imbue: Fire;Weapon Imbue: Gold;Weapon Imbue: Ichor;Weapon Imbue: Nanites;Weapon Imbue: Confetti;Weapon Imbue: Poison;Blackout;Pet Spider;Squashling;Ravens;Black Cat;Cursed Sapling;Water Candle;Cozy Fire;Chaos State;Heart Lamp;Rudolph;Puppy;Baby Grinch;Ammo Box;Mana Sickness;Beetle Endurance;Beetle Endurance;Beetle Endurance;Beetle Might;Beetle Might;Beetle Might;Fairy;Fairy;Wet;Mining;Heartreach;Calm;Builder;Titan;Flipper;Summoning;Dangersense;Ammo Reservation;Lifeforce;Endurance;Rage;Inferno;Wrath;Minecart;Lovestruck;Stinky;Fishing;Sonar;Crate;Warmth;Hornet;Imp;Zephyr Fish;Bunny Mount;Pigron Mount;Slime Mount;Turtle Mount;Bee Mount;Spider;Twins;Pirate;Mini Minotaur;Slime;Minecart;Sharknado;UFO;UFO Mount;Drill Mount;Scutlix Mount;Electrified;Moon Bite;Happy!;Banner;Feral Bite;Webbed;Bewitched;Life Drain;Magic Lantern;Shadowflame;Baby Face Monster;Crimson Heart;Stoned;Peace Candle;Star in a Bottle;Sharpened;Dazed;Deadly Sphere;Unicorn Mount;Obstructed;Distorted;Dryads Blessing;Minecart;Minecart;Cute Fishron Mount;Penetrated;Solar Blaze;Solar Blaze;Solar Blaze;Life Nebula;Life Nebula;Life Nebula;Mana Nebula;Mana Nebula;Mana Nebula;Damage Nebula;Damage Nebula;Damage Nebula;Stardust Cell;Celled;Minecart;Minecart;Dryads Bane;Stardust Guardian;Stardust Dragon;Daybroken;Suspicious Looking Eye;Companion Cube;Sugar Rush;Basilisk Mount;Mighty Wind;Withered Armor;Withered Weapon;Oozed;Striking Moment;Creative Shock;Propeller Gato;Flickerwick;Hoardagron;Betsys Curse;Oiled;Ballista Panic!;Plenty Satisfied;Exquisitely Stuffed;Minecart;Minecart;Minecart;Minecart;Golf Cart;Sanguine Bat;Vampire Frog;The Bast Defense;Baby Finch;Estee;Sugar Glider;Shark Pup;Minecart;Minecart;Minecart;Minecart;Minecart;Minecart;Minecart;Minecart;Minecart;Minecart;Witchs Broom;Minecart;Minecart;Minecart;Minecart;Minecart;Minecart;Minecart;Minecart;Minecart;Minecart;Minecart;Minecart;Minecart;Minecart;Minecart;Minecart;Minecart;Minecart;Minecart;Minecart;Minecart;Minecart;Minecart;Minecart;Minecart;Minecart;Lucky;Lil Harpy;Fennec Fox;Glittery Butterfly;Baby Imp;Baby Red Panda;Desert Tiger;Plantero;Flamingo;Dynamite Kitten;Baby Werewolf;Shadow Mimic;Minecart;Minecart;Enchanted Daggers;Digging Molecart;Digging Molecart;Volt Bunny;Painted Horse Mount;Majestic Horse Mount;Dark Horse Mount;Pogo Stick Mount;Pirate Ship Mount;Tree Mount;Santank Mount;Goat Mount;Book Mount;Slime Prince;Suspicious Eye;Eater of Worms;Spider Brain;Skeletron Jr.;Honey Bee;Destroyer-Lite;Rez and Spaz;Mini Prime;Plantera Seedling;Toy Golem;Tiny Fishron;Phantasmal Dragon;Moonling;Fairy Princess;Jack O Lantern;Everscream Sapling;Ice Queen;Alien Skater;Baby Ogre;Itsy Betsy;Lava Shark Mount;Titanium Barrier;BuffName.BlandWhipEnemyDebuff;Durendals Blessing;BuffName.SwordWhipNPCDebuff;BuffName.ScytheWhipEnemyDebuff;Harvest Time;A Nice Buff;BuffName.FlameWhipEnemyDebuff;Jungles Fury;BuffName.ThornWhipNPCDebuff;BuffName.RainbowWhipNPCDebuff;Slime Princess;Winged Slime Mount;BuffName.MaceWhipNPCDebuff;Sparkle Slime;Cerebral Mindtrick;Terraprisma;Hellfire;Frostbite;Flinx;BuffName.BoneWhipNPCDebuff;Bernie;Glommer;Tiny Deerclops;Pig;Chester;Peckish;Hungry;Starving;Abigail;Hearty Meal;BuffName.TentacleSpike;Fart Kart;Fart Kart;BuffName.CoolWhipNPCDebuff;Slime Royals;Blessing of the Moon;Biome Sight;Blood Butchered;Junimo;Terra Fart Kart;Terra Fart Kart;Strategist;Blue Chicken;Shadow Candle;Spiffo;Caveling Gardener;Shimmering;The Dirtiest Block".split(";");
terra_data_TdBuff.tip = ";Immune to lava;Provides life regeneration;25% increased movement speed;Breathe water instead of air;Increase defense by 8;Increased mana regeneration;20% increased magic damage;Press UP or DOWN to control speed of descent;Shows the location of treasure and ore;Grants invisibility;Emitting light;Increased night vision;Increased enemy spawn rate;Attackers also take damage;Press DOWN to enter water;10% increased bow damage and 20% increased arrow speed;Shows the location of enemies;Press UP to reverse gravity;A magical orb that provides light;Slowly losing life;Cannot consume anymore healing items;Decreased light vision;Cannot use any items;Slowly losing life;Increased melee abilities, lowered defense;Minor improvements to all stats;A fairy is following you;Physical abilities are increased;Magic powers are increased;Cannot regenerate life;Movement is reversed;Movement speed is reduced;Physical abilities are decreased;Can breathe and move easily underwater;Cannot use items that require mana;Defense is cut in half;You have seen something nasty, there is no escape.;You are being sucked into the mouth;Losing life;I think it wants your carrot;I think it wants your fish;Happy turtle time!;25% of damage taken will be redirected to another player;Its either really hot or really cold. Either way it REALLY hurts;A baby Eater of Souls is following you;Your movement speed has been reduced;You cant move!;Life regeneration is increased;The pygmies will fight for you;Dont even ask...;It thinks you are its mother;A friendly spirit is following you;Chillin like a reptilian;Polly wants the cracker;Isnt this just soooo cute?;A little sapling is following you;A wisp is following you;Life regeneration is greatly increased;You will dodge the next attack;Shoots crystal leaves at nearby enemies;A baby dinosaur is following you;Damage taken is reduced by 25%;Movement speed is increased;The baby slime will fight for you;An eyeball spring is following you;A baby snowman is following you;Losing life and slowed movement;Losing life;Reduced defense;Losing life;Melee attacks inflict acid venom on your targets;Drop more money on death;Melee attacks inflict enemies with cursed flames;Melee attacks set enemies on fire;Melee attacks make enemies drop more gold;Melee attacks decrease enemies defense;Melee attacks confuse enemies;Melee attacks cause confetti to appear;Melee attacks poison enemies;Light vision severely reduced;A spider is following you;A squashling is following you;The ravens will attack your enemies;A black kitty is following you;A cursed sapling is following you;Increased monster spawn rate;Life regen is slightly increased;Using the Rod of Discord will take life;Life regen is increased;Riding the red nosed reindeer;A puppy is following you;A baby grinch is following you;20% chance to not consume ammo;Magic damage reduced by ;Damage taken reduced by 15%;Damage taken reduced by 30%;Damage taken reduced by 45%;Melee damage and speed increase by 10%;Melee damage and speed increase by 20%;Melee damage and speed increase by 30%;A fairy is following you;A fairy is following you;You are dripping water;25% increased mining speed;Increased heart pickup range;Decreased enemy spawn rate;Increased placement speed and range;Increased knockback;Move like normal in water;Increased max number of minions;You can see nearby hazards;20% chance to not consume ammo;20% increased max life;10% reduced damage;10% increased critical chance;Nearby enemies are ignited;10% increased damage;Riding in a minecart;You are in love!;You smell terrible;Increased fishing power;You can see whats biting your hook;Greater chance of fishing up a crate;Reduced damage from cold sources;The hornet will fight for you;The imp will fight for you;It likes swimming around you;You are craving carrots;Now you see me...;BOOOIIINNNG!;Slow if by land, zoom if by sea;BzzzBzzBZZZZBzzz;The spider will fight for you;The twins will fight for you;The pirate will fight for you;How do you defeat a mini Minotaur?;You are slimy and sticky;Riding in a minecart;The sharknado will fight for you;The UFO will fight for you;Its a good thing you had a MAC;Riding in a flying drill;Pew Pew;Moving hurts!;You are unable to absorb healing effects;Movement speed increased and monster spawns reduced;Increased damage and defense from the following:;Increased damage, Decreased life regen, Causes status effects;You are stuck;Increased max number of minions;Increased life regeneration;An enchanted lantern is lighting your way;Losing life;A baby face monster is following you;A magical heart that provides light;You are completely petrified!;Decreased monster spawn rate;Increased mana regeneration;Melee weapons have armor penetration;Movement is greatly slowed;The Deadly Sphere will fight for you;Charge ahead... fabulously!;You cant see!;Gravity around you is distorted;The power of nature protects you;Riding in a minecart;Riding in a minecart;Just dont make it crawl.;Bleeding Out;Damage taken reduced by 30%, repel enemies when taking damage;Damage taken reduced by 30%, repel enemies when taking damage;Damage taken reduced by 30%, repel enemies when taking damage;Increased life regeneration;Increased life regeneration;Increased life regeneration;Increased mana regeneration;Increased mana regeneration;Increased mana regeneration;15% increased damage;30% increased damage;45% increased damage;The stardust cell will fight for you;being eaten by cells;Riding in a minecart;Riding in a minecart;The power of nature compells you;The stardust guardian will protect you;The stardust dragon will protect you;Incinerated by solar rays;A suspicious looking eye that provides light;Will never threaten to stab you and, in fact, cannot speak;20% increased movement and mining speed;Crash into anyone... and EVERYONE!;The wind moves you around!;Your armor is lowered!;Your attacks are weaker!;Movement is significantly reduced;400% increased damage for next melee strike;You have lost the power of creation!;A propeller gato is following you;A flickerwick is following you;A hoardagron is following you;Defense is lowered;Taking more damage from being on fire;Your ballistas rapidly shoot in panic!;Medium improvements to all stats;Major improvements to all stats;Riding in a minecart;Riding in a minecart;Riding in a minecart;Riding in a minecart;A fair way to cross the fairway;The sanguine bat will fight for you;The vampire frog will fight for you;Defense is increased by 5;The baby finch will fight for you;Estee is following you;A sugar glider is following you;Doo doo doo doo doo doo;Riding in a minecart;Riding in a minecart;Riding in a minecart;Riding in a minecart;Riding in a minecart;Riding in a minecart;Riding in a minecart;Riding in a minecart;Riding in a minecart;Riding in a minecart;It flies! WITCHCRAFT!;Riding in a minecart;Riding in a minecart;Riding in a minecart;Riding in a minecart;Riding in a minecart;Riding in a minecart;Riding in a minecart;Riding in a minecart;Riding in a minecart;Riding in a minecart;Riding in a minecart;Riding in a minecart;Riding in a minecart;Riding in a minecart;Riding in a minecart;Riding in a minecart;Riding in a minecart;Riding in a minecart;Riding in a minecart;Riding in a minecart;Riding in a minecart;Riding in a minecart;Riding in a minecart;Riding in a minecart;Riding in a minecart;Riding in a minecart;You are feeling pretty lucky;Cuteness from above;What does the fox say? Better yet, what does the fox HEAR?!;Truly, truly outrageous;Just wait till his terrible twos!;A baby red panda is following you;The desert tiger will fight beside you;Little Plantero is following you;Flamingogogo;Not for use in cannons;A baby werewolf is following you;A shadow mimic is following you;Riding in a minecart;Riding in a minecart;Death by a thousand cuts;The Molecart will dig for you;The Molecart will dig for you;A volt bunny is ecstatic about you;Riding a Painted Horse;Riding a Majestic Horse;Riding a Dark Horse;Kss-shik! Kss-shik! Kss-shik!;Youre the captain now;Run, forest, run!;Crossing off the naughty list...;This ride is totally metal!;The Book is now helping in your guidance;He answers to a higher authority;Just keepin an eye out...;May ruin several backyards;Its crawling around... icky;Skeletron Jr. Is following you;A honey bee is following you;For destruction on the go;You have special eyes!;Each tool can commit murder;What exactly does it eat, anyway?;Got myself a crying, talking, sleeping, walking, living idol!;A sea-green marquess of the abyss;It keeps looking at the Moon;A friend from beyond;The light of the fair folk illuminates all;A small Jack O Lantern is fiendishly lighting the way;Taking the tree for a walk!;Ice Queen has been reborn as your companion;How do you do, fellow humans?;Hes got a big stick and he doesnt know how to use it;Itsy Betsy is following you;Surfing the molten seas!;Defensive shards surround you;BuffDescription.BlandWhipEnemyDebuff;Whip speed is increased;BuffDescription.SwordWhipNPCDebuff;BuffDescription.ScytheWhipEnemyDebuff;Whip speed is increased;Summons a snowflake to fight for you;BuffDescription.FlameWhipEnemyDebuff;Whip speed is increased;BuffDescription.ThornWhipNPCDebuff;BuffDescription.RainbowWhipNPCDebuff;She is the higher authority;BOING FLAP BOING!;BuffDescription.MaceWhipNPCDebuff;You are slimy and sparkly;Increased critical chance;The Blades of the Empress will fight for you;Slowly losing life;Its either really hot or really cold. Either way it REALLY hurts;The snow flinx will fight for you;BuffDescription.BoneWhipNPCDebuff;Youre always there for me, Bernie;Its fuzzy! And slimy...;Holy crap!;Walking back bacon!;Otto von Chesterfield, Esquire;You could eat, but its not so bad.;You are quite hungry and feeling weak.;You are starving to death! Eat immediately!;Abigail will fight to protect you;Increased Life Regeneration;BuffDescription.TentacleSpike;Riding in a minecart;Riding in a minecart;BuffDescription.CoolWhipNPCDebuff;The final authority, they will unite the kingdoms!;You turned into a wolf!;Shows the location of infected blocks;Bleeding out rapidly;Keeper of the Forest;Riding in a minecart;Riding in a minecart;Increased max number of sentries;The nametag says Shane;Dispels the peace of towns;This is how you died;Huk arrr gruk tu!;Youve gone insubstantial!;You can tell by all the extra dirt".split(";");
terra_data_TdItem.minId = 0;
terra_data_TdItem.maxId = 5452;
terra_data_TdItem.count = 5453;
terra_data_TdItem.$name = ";Iron Pickaxe;Dirt Block;Stone Block;Iron Broadsword;Mushroom;Iron Shortsword;Iron Hammer;Torch;Wood;Iron Axe;Iron Ore;Copper Ore;Gold Ore;Silver Ore;Copper Watch;Silver Watch;Gold Watch;Depth Meter;Gold Bar;Copper Bar;Silver Bar;Iron Bar;Gel;Wooden Sword;Wooden Door;Stone Wall;Acorn;Lesser Healing Potion;Life Crystal;Dirt Wall;Bottle;Wooden Table;Furnace;Wooden Chair;Iron Anvil;Work Bench;Goggles;Lens;Wooden Bow;Wooden Arrow;Flaming Arrow;Shuriken;Suspicious Looking Eye;Demon Bow;War Axe of the Night;Lights Bane;Unholy Arrow;Chest;Band of Regeneration;Magic Mirror;Jesters Arrow;Angel Statue;Cloud in a Bottle;Hermes Boots;Enchanted Boomerang;Demonite Ore;Demonite Bar;Heart;Corrupt Seeds;Vile Mushroom;Ebonstone Block;Grass Seeds;Sunflower;Vilethorn;Starfury;Purification Powder;Vile Powder;Rotten Chunk;Worm Tooth;Worm Food;Copper Coin;Silver Coin;Gold Coin;Platinum Coin;Fallen Star;Copper Greaves;Iron Greaves;Silver Greaves;Gold Greaves;Copper Chainmail;Iron Chainmail;Silver Chainmail;Gold Chainmail;Grappling Hook;Chain;Shadow Scale;Piggy Bank;Mining Helmet;Copper Helmet;Iron Helmet;Silver Helmet;Gold Helmet;Wood Wall;Wood Platform;Flintlock Pistol;Musket;Musket Ball;Minishark;Iron Bow;Shadow Greaves;Shadow Scalemail;Shadow Helmet;Nightmare Pickaxe;The Breaker;Candle;Copper Chandelier;Silver Chandelier;Gold Chandelier;Mana Crystal;Lesser Mana Potion;Band of Starpower;Flower of Fire;Magic Missile;Dirt Rod;Shadow Orb;Meteorite;Meteorite Bar;Hook;Flamarang;Molten Fury;Volcano;Molten Pickaxe;Meteor Helmet;Meteor Suit;Meteor Leggings;Bottled Water;Space Gun;Rocket Boots;Gray Brick;Gray Brick Wall;Red Brick;Red Brick Wall;Clay Block;Blue Brick;Blue Brick Wall;Chain Lantern;Green Brick;Green Brick Wall;Pink Brick;Pink Brick Wall;Gold Brick;Gold Brick Wall;Silver Brick;Silver Brick Wall;Copper Brick;Copper Brick Wall;Spike;Water Candle;Book;Cobweb;Necro Helmet;Necro Breastplate;Necro Greaves;Bone;Muramasa;Cobalt Shield;Aqua Scepter;Lucky Horseshoe;Shiny Red Balloon;Harpoon;Spiky Ball;Ball O Hurt;Blue Moon;Handgun;Water Bolt;Bomb;Dynamite;Grenade;Sand Block;Glass;Sign;Ash Block;Obsidian;Hellstone;Hellstone Bar;Mud Block;Sapphire;Ruby;Emerald;Topaz;Amethyst;Diamond;Glowing Mushroom;Star;Ivy Whip;Breathing Reed;Flipper;Healing Potion;Mana Potion;Blade of Grass;Thorn Chakram;Obsidian Brick;Obsidian Skull;Mushroom Grass Seeds;Jungle Grass Seeds;Wooden Hammer;Star Cannon;Blue Phaseblade;Red Phaseblade;Green Phaseblade;Purple Phaseblade;White Phaseblade;Yellow Phaseblade;Meteor Hamaxe;Empty Bucket;Water Bucket;Lava Bucket;Jungle Rose;Stinger;Vine;Feral Claws;Anklet of the Wind;Staff of Regrowth;Hellstone Brick;Whoopie Cushion;Shackle;Molten Hamaxe;Flamelash;Phoenix Blaster;Sunfury;Hellforge;Clay Pot;Natures Gift;Bed;Silk;Restoration Potion;Restoration Potion;Jungle Hat;Jungle Shirt;Jungle Pants;Molten Helmet;Molten Breastplate;Molten Greaves;Meteor Shot;Sticky Bomb;Black Lens;Sunglasses;Wizard Hat;Top Hat;Tuxedo Shirt;Tuxedo Pants;Summer Hat;Bunny Hood;Plumbers Hat;Plumbers Shirt;Plumbers Pants;Heros Hat;Heros Shirt;Heros Pants;Fish Bowl;Archaeologists Hat;Archaeologists Jacket;Archaeologists Pants;Black Thread;Green Thread;Ninja Hood;Ninja Shirt;Ninja Pants;Leather;Red Hat;Goldfish;Robe;Robot Hat;Gold Crown;Hellfire Arrow;Sandgun;Guide Voodoo Doll;Diving Helmet;Familiar Shirt;Familiar Pants;Familiar Wig;Demon Scythe;Nights Edge;Dark Lance;Coral;Cactus;Trident;Silver Bullet;Throwing Knife;Spear;Blowpipe;Glowstick;Seed;Wooden Boomerang;Aglet;Sticky Glowstick;Poisoned Knife;Obsidian Skin Potion;Regeneration Potion;Swiftness Potion;Gills Potion;Ironskin Potion;Mana Regeneration Potion;Magic Power Potion;Featherfall Potion;Spelunker Potion;Invisibility Potion;Shine Potion;Night Owl Potion;Battle Potion;Thorns Potion;Water Walking Potion;Archery Potion;Hunter Potion;Gravitation Potion;Gold Chest;Daybloom Seeds;Moonglow Seeds;Blinkroot Seeds;Deathweed Seeds;Waterleaf Seeds;Fireblossom Seeds;Daybloom;Moonglow;Blinkroot;Deathweed;Waterleaf;Fireblossom;Shark Fin;Feather;Tombstone;Mime Mask;Antlion Mandible;Illegal Gun Parts;The Doctors Shirt;The Doctors Pants;Golden Key;Shadow Chest;Shadow Key;Obsidian Brick Wall;Jungle Spores;Loom;Piano;Dresser;Bench;Bathtub;Red Banner;Green Banner;Blue Banner;Yellow Banner;Lamp Post;Tiki Torch;Barrel;Chinese Lantern;Cooking Pot;Safe;Skull Lantern;Trash Can;Candelabra;Pink Vase;Mug;Keg;Ale;Bookcase;Throne;Bowl;Bowl of Soup;Toilet;Grandfather Clock;Armor Statue;Goblin Battle Standard;Tattered Cloth;Sawmill;Cobalt Ore;Mythril Ore;Adamantite Ore;Pwnhammer;Excalibur;Hallowed Seeds;Ebonsand Block;Cobalt Hat;Cobalt Helmet;Cobalt Mask;Cobalt Breastplate;Cobalt Leggings;Mythril Hood;Mythril Helmet;Mythril Hat;Mythril Chainmail;Mythril Greaves;Cobalt Bar;Mythril Bar;Cobalt Chainsaw;Mythril Chainsaw;Cobalt Drill;Mythril Drill;Adamantite Chainsaw;Adamantite Drill;Dao of Pow;Mythril Halberd;Adamantite Bar;Glass Wall;Compass;Diving Gear;GPS;Obsidian Horseshoe;Obsidian Shield;Tinkerers Workshop;Cloud in a Balloon;Adamantite Headgear;Adamantite Helmet;Adamantite Mask;Adamantite Breastplate;Adamantite Leggings;Spectre Boots;Adamantite Glaive;Toolbelt;Pearlsand Block;Pearlstone Block;Mining Shirt;Mining Pants;Pearlstone Brick;Iridescent Brick;Mudstone Brick;Cobalt Brick;Mythril Brick;Pearlstone Brick Wall;Iridescent Brick Wall;Mudstone Brick Wall;Cobalt Brick Wall;Mythril Brick Wall;Holy Water;Unholy Water;Silt Block;Fairy Bell;Breaker Blade;Blue Torch;Red Torch;Green Torch;Purple Torch;White Torch;Yellow Torch;Demon Torch;Clockwork Assault Rifle;Cobalt Repeater;Mythril Repeater;Dual Hook;Star Statue;Sword Statue;Slime Statue;Goblin Statue;Shield Statue;Bat Statue;Fish Statue;Bunny Statue;Skeleton Statue;Reaper Statue;Woman Statue;Imp Statue;Gargoyle Statue;Gloom Statue;Hornet Statue;Bomb Statue;Crab Statue;Hammer Statue;Potion Statue;Spear Statue;Cross Statue;Jellyfish Statue;Bow Statue;Boomerang Statue;Boot Statue;Chest Statue;Bird Statue;Axe Statue;Corrupt Statue;Tree Statue;Anvil Statue;Pickaxe Statue;Mushroom Statue;Eyeball Statue;Pillar Statue;Heart Statue;Pot Statue;Sunflower Statue;King Statue;Queen Statue;Piranha Statue;Planked Wall;Wooden Beam;Adamantite Repeater;Adamantite Sword;Cobalt Sword;Mythril Sword;Moon Charm;Ruler;Crystal Ball;Disco Ball;Sorcerer Emblem;Warrior Emblem;Ranger Emblem;Demon Wings;Angel Wings;Magical Harp;Rainbow Rod;Ice Rod;Neptunes Shell;Mannequin;Greater Healing Potion;Greater Mana Potion;Pixie Dust;Crystal Shard;Clown Hat;Clown Shirt;Clown Pants;Flamethrower;Bell;Harp;Red Wrench;Wire Cutter;Active Stone Block;Inactive Stone Block;Lever;Laser Rifle;Crystal Bullet;Holy Arrow;Magic Dagger;Crystal Storm;Cursed Flames;Soul of Light;Soul of Night;Cursed Flame;Cursed Torch;Adamantite Forge;Mythril Anvil;Unicorn Horn;Dark Shard;Light Shard;Red Pressure Plate;Wire;Spell Tome;Star Cloak;Megashark;Shotgun;Philosophers Stone;Titan Glove;Cobalt Naginata;Switch;Dart Trap;Boulder;Green Pressure Plate;Gray Pressure Plate;Brown Pressure Plate;Mechanical Eye;Cursed Arrow;Cursed Bullet;Soul of Fright;Soul of Might;Soul of Sight;Gungnir;Hallowed Plate Mail;Hallowed Greaves;Hallowed Helmet;Cross Necklace;Mana Flower;Mechanical Worm;Mechanical Skull;Hallowed Headgear;Hallowed Mask;Slime Crown;Light Disc;Music Box (Overworld Day);Music Box (Eerie);Music Box (Night);Music Box (Title);Music Box (Underground);Music Box (Boss 1);Music Box (Jungle);Music Box (Corruption);Music Box (Underground Corruption);Music Box (The Hallow);Music Box (Boss 2);Music Box (Underground Hallow);Music Box (Boss 3);Soul of Flight;Music Box;Demonite Brick;Hallowed Repeater;Drax;Explosives;Inlet Pump;Outlet Pump;1 Second Timer;3 Second Timer;5 Second Timer;Candy Cane Block;Candy Cane Wall;Santa Hat;Santa Shirt;Santa Pants;Green Candy Cane Block;Green Candy Cane Wall;Snow Block;Snow Brick;Snow Brick Wall;Blue Light;Red Light;Green Light;Blue Present;Green Present;Yellow Present;Snow Globe;Carrot;Adamantite Beam;Adamantite Beam Wall;Demonite Brick Wall;Sandstone Brick;Sandstone Brick Wall;Ebonstone Brick;Ebonstone Brick Wall;Red Stucco;Yellow Stucco;Green Stucco;Gray Stucco;Red Stucco Wall;Yellow Stucco Wall;Green Stucco Wall;Gray Stucco Wall;Ebonwood;Rich Mahogany;Pearlwood;Ebonwood Wall;Rich Mahogany Wall;Pearlwood Wall;Ebonwood Chest;Rich Mahogany Chest;Pearlwood Chest;Ebonwood Chair;Rich Mahogany Chair;Pearlwood Chair;Ebonwood Platform;Rich Mahogany Platform;Pearlwood Platform;Bone Platform;Ebonwood Work Bench;Rich Mahogany Work Bench;Pearlwood Work Bench;Ebonwood Table;Rich Mahogany Table;Pearlwood Table;Ebonwood Piano;Rich Mahogany Piano;Pearlwood Piano;Ebonwood Bed;Rich Mahogany Bed;Pearlwood Bed;Ebonwood Dresser;Rich Mahogany Dresser;Pearlwood Dresser;Ebonwood Door;Rich Mahogany Door;Pearlwood Door;Ebonwood Sword;Ebonwood Hammer;Ebonwood Bow;Rich Mahogany Sword;Rich Mahogany Hammer;Rich Mahogany Bow;Pearlwood Sword;Pearlwood Hammer;Pearlwood Bow;Rainbow Brick;Rainbow Brick Wall;Ice Block;Reds Wings;Reds Helmet;Reds Breastplate;Reds Leggings;Fish;Ice Boomerang;Keybrand;Cutlass;Boreal Wood Work Bench;True Excalibur;True Nights Edge;Frostbrand;Boreal Wood Table;Red Potion;Tactical Shotgun;Ivy Chest;Frozen Chest;Marrow;Unholy Trident;Frost Helmet;Frost Breastplate;Frost Leggings;Tin Helmet;Tin Chainmail;Tin Greaves;Lead Helmet;Lead Chainmail;Lead Greaves;Tungsten Helmet;Tungsten Chainmail;Tungsten Greaves;Platinum Helmet;Platinum Chainmail;Platinum Greaves;Tin Ore;Lead Ore;Tungsten Ore;Platinum Ore;Tin Bar;Lead Bar;Tungsten Bar;Platinum Bar;Tin Watch;Tungsten Watch;Platinum Watch;Tin Chandelier;Tungsten Chandelier;Platinum Chandelier;Platinum Candle;Platinum Candelabra;Platinum Crown;Lead Anvil;Tin Brick;Tungsten Brick;Platinum Brick;Tin Brick Wall;Tungsten Brick Wall;Platinum Brick Wall;Beam Sword;Ice Blade;Ice Bow;Frost Staff;Wood Helmet;Wood Breastplate;Wood Greaves;Ebonwood Helmet;Ebonwood Breastplate;Ebonwood Greaves;Rich Mahogany Helmet;Rich Mahogany Breastplate;Rich Mahogany Greaves;Pearlwood Helmet;Pearlwood Breastplate;Pearlwood Greaves;Amethyst Staff;Topaz Staff;Sapphire Staff;Emerald Staff;Ruby Staff;Diamond Staff;Grass Wall;Jungle Wall;Flower Wall;Jetpack;Butterfly Wings;Cactus Wall;Cloud;Cloud Wall;Seaweed;Rune Hat;Rune Robe;Mushroom Spear;Terra Blade;Grenade Launcher;Rocket Launcher;Proximity Mine Launcher;Fairy Wings;Slime Block;Flesh Block;Mushroom Wall;Rain Cloud;Bone Block;Frozen Slime Block;Bone Block Wall;Slime Block Wall;Flesh Block Wall;Rocket I;Rocket II;Rocket III;Rocket IV;Asphalt Block;Cobalt Pickaxe;Mythril Pickaxe;Adamantite Pickaxe;Clentaminator;Green Solution;Blue Solution;Purple Solution;Dark Blue Solution;Red Solution;Harpy Wings;Bone Wings;Hammush;Nettle Burst;Ankh Banner;Snake Banner;Omega Banner;Crimson Helmet;Crimson Scalemail;Crimson Greaves;Blood Butcherer;Tendon Bow;Flesh Grinder;Deathbringer Pickaxe;Blood Lust Cluster;The Undertaker;The Meatball;The Rotted Fork;Snow Hood;Snow Coat;Snow Pants;Living Wood Chair;Cactus Chair;Bone Chair;Flesh Chair;Mushroom Chair;Bone Work Bench;Cactus Work Bench;Flesh Work Bench;Mushroom Work Bench;Slime Work Bench;Cactus Door;Flesh Door;Mushroom Door;Living Wood Door;Bone Door;Flame Wings;Frozen Wings;Spectre Wings;Sunplate Block;Disc Wall;Skyware Chair;Bone Table;Flesh Table;Living Wood Table;Skyware Table;Living Wood Chest;Living Wood Wand;Purple Ice Block;Pink Ice Block;Red Ice Block;Crimstone Block;Skyware Door;Skyware Chest;Steampunk Hat;Steampunk Shirt;Steampunk Pants;Bee Hat;Bee Shirt;Bee Pants;World Banner;Sun Banner;Gravity Banner;Pharaohs Mask;Actuator;Blue Wrench;Green Wrench;Blue Pressure Plate;Yellow Pressure Plate;Discount Card;Lucky Coin;Unicorn on a Stick;Sandstorm in a Bottle;Boreal Wood Sofa;Beach Ball;Charm of Myths;Moon Shell;Star Veil;Water Walking Boots;Tiara;Princess Dress;Pharaohs Robe;Green Cap;Mushroom Cap;Tam O Shanter;Mummy Mask;Mummy Shirt;Mummy Pants;Cowboy Hat;Cowboy Jacket;Cowboy Pants;Pirate Hat;Pirate Shirt;Pirate Pants;Viking Helmet;Crimtane Ore;Cactus Sword;Cactus Pickaxe;Ice Brick;Ice Brick Wall;Adhesive Bandage;Armor Polish;Bezoar;Blindfold;Fast Clock;Megaphone;Nazar;Vitamins;Trifold Map;Cactus Helmet;Cactus Breastplate;Cactus Leggings;Power Glove;Lightning Boots;Sun Stone;Moon Stone;Armor Bracing;Medicated Bandage;The Plan;Countercurse Mantra;Coin Gun;Lava Charm;Obsidian Water Walking Boots;Lava Waders;Pure Water Fountain;Desert Water Fountain;Shadewood;Shadewood Door;Shadewood Platform;Shadewood Chest;Shadewood Chair;Shadewood Work Bench;Shadewood Table;Shadewood Dresser;Shadewood Piano;Shadewood Bed;Shadewood Sword;Shadewood Hammer;Shadewood Bow;Shadewood Helmet;Shadewood Breastplate;Shadewood Greaves;Shadewood Wall;Cannon;Cannonball;Flare Gun;Flare;Bone Wand;Leaf Wand;Flying Carpet;Avenger Emblem;Mechanical Glove;Land Mine;Paladins Shield;Web Slinger;Jungle Water Fountain;Icy Water Fountain;Corrupt Water Fountain;Crimson Water Fountain;Hallowed Water Fountain;Blood Water Fountain;Umbrella;Chlorophyte Ore;Steampunk Wings;Snowball;Ice Skates;Snowball Launcher;Web Covered Chest;Climbing Claws;Ancient Iron Helmet;Ancient Gold Helmet;Ancient Shadow Helmet;Ancient Shadow Scalemail;Ancient Shadow Greaves;Ancient Necro Helmet;Ancient Cobalt Helmet;Ancient Cobalt Breastplate;Ancient Cobalt Leggings;Black Belt;Boomstick;Rope;Campfire;Marshmallow;Marshmallow on a Stick;Cooked Marshmallow;Red Rocket;Green Rocket;Blue Rocket;Yellow Rocket;Ice Torch;Shoe Spikes;Tiger Climbing Gear;Tabi;Pink Snow Hood;Pink Snow Coat;Pink Snow Pants;Pink Thread;Mana Regeneration Band;Sandstorm in a Balloon;Master Ninja Gear;Rope Coil;Blowgun;Blizzard in a Bottle;Frostburn Arrow;Enchanted Sword;Pickaxe Axe;Cobalt Waraxe;Mythril Waraxe;Adamantite Waraxe;Eaters Bone;Blend-O-Matic;Meat Grinder;Extractinator;Solidifier;Amber;Confetti Gun;Chlorophyte Mask;Chlorophyte Helmet;Chlorophyte Headgear;Chlorophyte Plate Mail;Chlorophyte Greaves;Chlorophyte Bar;Red Dye;Orange Dye;Yellow Dye;Lime Dye;Green Dye;Teal Dye;Cyan Dye;Sky Blue Dye;Blue Dye;Purple Dye;Violet Dye;Pink Dye;Red and Black Dye;Orange and Black Dye;Yellow and Black Dye;Lime and Black Dye;Green and Black Dye;Teal and Black Dye;Cyan and Black Dye;Sky Blue and Black Dye;Blue and Black Dye;Purple and Black Dye;Violet and Black Dye;Pink and Black Dye;Flame Dye;Flame and Black Dye;Green Flame Dye;Green Flame and Black Dye;Blue Flame Dye;Blue Flame and Black Dye;Silver Dye;Bright Red Dye;Bright Orange Dye;Bright Yellow Dye;Bright Lime Dye;Bright Green Dye;Bright Teal Dye;Bright Cyan Dye;Bright Sky Blue Dye;Bright Blue Dye;Bright Purple Dye;Bright Violet Dye;Bright Pink Dye;Black Dye;Red and Silver Dye;Orange and Silver Dye;Yellow and Silver Dye;Lime and Silver Dye;Green and Silver Dye;Teal and Silver Dye;Cyan and Silver Dye;Sky Blue and Silver Dye;Blue and Silver Dye;Purple and Silver Dye;Violet and Silver Dye;Pink and Silver Dye;Intense Flame Dye;Intense Green Flame Dye;Intense Blue Flame Dye;Rainbow Dye;Intense Rainbow Dye;Yellow Gradient Dye;Cyan Gradient Dye;Violet Gradient Dye;Paintbrush;Paint Roller;Red Paint;Orange Paint;Yellow Paint;Lime Paint;Green Paint;Teal Paint;Cyan Paint;Sky Blue Paint;Blue Paint;Purple Paint;Violet Paint;Pink Paint;Deep Red Paint;Deep Orange Paint;Deep Yellow Paint;Deep Lime Paint;Deep Green Paint;Deep Teal Paint;Deep Cyan Paint;Deep Sky Blue Paint;Deep Blue Paint;Deep Purple Paint;Deep Violet Paint;Deep Pink Paint;Black Paint;White Paint;Gray Paint;Paint Scraper;Lihzahrd Brick;Lihzahrd Brick Wall;Slush Block;Palladium Ore;Orichalcum Ore;Titanium Ore;Teal Mushroom;Green Mushroom;Sky Blue Flower;Yellow Marigold;Blue Berries;Lime Kelp;Pink Prickly Pear;Orange Bloodroot;Red Husk;Cyan Husk;Violet Husk;Purple Mucus;Black Ink;Dye Vat;Bee Gun;Possessed Hatchet;Bee Keeper;Hive;Honey Block;Hive Wall;Crispy Honey Block;Honey Bucket;Hive Wand;Beenade;Gravity Globe;Honey Comb;Abeemination;Bottled Honey;Rain Hat;Rain Coat;Lihzahrd Door;Dungeon Door;Lead Door;Iron Door;Temple Key;Lihzahrd Chest;Lihzahrd Chair;Lihzahrd Table;Lihzahrd Work Bench;Super Dart Trap;Flame Trap;Spiky Ball Trap;Spear Trap;Wooden Spike;Lihzahrd Pressure Plate;Lihzahrd Statue;Lihzahrd Watcher Statue;Lihzahrd Guardian Statue;Wasp Gun;Piranha Gun;Pygmy Staff;Pygmy Necklace;Tiki Mask;Tiki Shirt;Tiki Pants;Leaf Wings;Blizzard in a Balloon;Bundle of Balloons;Bat Wings;Bone Sword;Hercules Beetle;Smoke Bomb;Bone Key;Nectar;Tiki Totem;Lizard Egg;Grave Marker;Cross Grave Marker;Headstone;Gravestone;Obelisk;Leaf Blower;Chlorophyte Bullet;Parrot Cracker;Strange Glowing Mushroom;Seedling;Wisp in a Bottle;Palladium Bar;Palladium Sword;Palladium Pike;Palladium Repeater;Palladium Pickaxe;Palladium Drill;Palladium Chainsaw;Orichalcum Bar;Orichalcum Sword;Orichalcum Halberd;Orichalcum Repeater;Orichalcum Pickaxe;Orichalcum Drill;Orichalcum Chainsaw;Titanium Bar;Titanium Sword;Titanium Trident;Titanium Repeater;Titanium Pickaxe;Titanium Drill;Titanium Chainsaw;Palladium Mask;Palladium Helmet;Palladium Headgear;Palladium Breastplate;Palladium Leggings;Orichalcum Mask;Orichalcum Helmet;Orichalcum Headgear;Orichalcum Breastplate;Orichalcum Leggings;Titanium Mask;Titanium Helmet;Titanium Headgear;Titanium Breastplate;Titanium Leggings;Orichalcum Anvil;Titanium Forge;Palladium Waraxe;Orichalcum Waraxe;Titanium Waraxe;Hallowed Bar;Chlorophyte Claymore;Chlorophyte Saber;Chlorophyte Partisan;Chlorophyte Shotbow;Chlorophyte Pickaxe;Chlorophyte Drill;Chlorophyte Chainsaw;Chlorophyte Greataxe;Chlorophyte Warhammer;Chlorophyte Arrow;Amethyst Hook;Topaz Hook;Sapphire Hook;Emerald Hook;Ruby Hook;Diamond Hook;Amber Mosquito;Umbrella Hat;Nimbus Rod;Orange Torch;Crimsand Block;Bee Cloak;Eye of the Golem;Honey Balloon;Blue Horseshoe Balloon;White Horseshoe Balloon;Yellow Horseshoe Balloon;Frozen Turtle Shell;Sniper Rifle;Venus Magnum;Crimson Rod;Crimtane Bar;Stynger;Flower Pow;Rainbow Gun;Stynger Bolt;Chlorophyte Jackhammer;Teleporter;Flower of Frost;Uzi;Magnet Sphere;Purple Stained Glass;Yellow Stained Glass;Blue Stained Glass;Green Stained Glass;Red Stained Glass;Multicolored Stained Glass;Skeletron Hand;Skull;Balla Hat;Gangsta Hat;Sailor Hat;Eye Patch;Sailor Shirt;Sailor Pants;Skeletron Mask;Amethyst Robe;Topaz Robe;Sapphire Robe;Emerald Robe;Ruby Robe;Diamond Robe;White Tuxedo Shirt;White Tuxedo Pants;Panic Necklace;Life Fruit;Lihzahrd Altar;Lihzahrd Power Cell;Picksaw;Heat Ray;Staff of Earth;Golem Fist;Water Chest;Binoculars;Rifle Scope;Destroyer Emblem;High Velocity Bullet;Jellyfish Necklace;Zombie Arm;The Axe;Ice Sickle;Clothier Voodoo Doll;Poison Staff;Slime Staff;Poison Dart;Eye Spring;Toy Sled;Book of Skulls;KO Cannon;Pirate Map;Turtle Helmet;Turtle Scale Mail;Turtle Leggings;Snowball Cannon;Bone Pickaxe;Magic Quiver;Magma Stone;Obsidian Rose;Bananarang;Chain Knife;Rod of Discord;Death Sickle;Turtle Shell;Tissue Sample;Vertebra;Bloody Spine;Ichor;Ichor Torch;Ichor Arrow;Ichor Bullet;Golden Shower;Bunny Cannon;Explosive Bunny;Vial of Venom;Flask of Venom;Venom Arrow;Venom Bullet;Fire Gauntlet;Cog;Confetti;Nanites;Explosive Powder;Gold Dust;Party Bullet;Nano Bullet;Exploding Bullet;Golden Bullet;Flask of Cursed Flames;Flask of Fire;Flask of Gold;Flask of Ichor;Flask of Nanites;Flask of Party;Flask of Poison;Eye of Cthulhu Trophy;Eater of Worlds Trophy;Brain of Cthulhu Trophy;Skeletron Trophy;Queen Bee Trophy;Wall of Flesh Trophy;Destroyer Trophy;Skeletron Prime Trophy;Retinazer Trophy;Spazmatism Trophy;Plantera Trophy;Golem Trophy;Blood Moon Rising;The Hanged Man;Glory of the Fire;Bone Warp;Wall Skeleton;Hanging Skeleton;Blue Slab Wall;Blue Tiled Wall;Pink Slab Wall;Pink Tiled Wall;Green Slab Wall;Green Tiled Wall;Blue Brick Platform;Pink Brick Platform;Green Brick Platform;Metal Shelf;Brass Shelf;Wood Shelf;Brass Lantern;Caged Lantern;Carriage Lantern;Alchemy Lantern;Diabolist Lamp;Oil Rag Sconce;Blue Dungeon Chair;Blue Dungeon Table;Blue Dungeon Work Bench;Green Dungeon Chair;Green Dungeon Table;Green Dungeon Work Bench;Pink Dungeon Chair;Pink Dungeon Table;Pink Dungeon Work Bench;Blue Dungeon Candle;Green Dungeon Candle;Pink Dungeon Candle;Blue Dungeon Vase;Green Dungeon Vase;Pink Dungeon Vase;Blue Dungeon Door;Green Dungeon Door;Pink Dungeon Door;Blue Dungeon Bookcase;Green Dungeon Bookcase;Pink Dungeon Bookcase;Catacomb;Dungeon Shelf;Skellington J Skellingsworth;The Cursed Man;The Eye Sees the End;Something Evil is Watching You;The Twins Have Awoken;The Screamer;Goblins Playing Poker;Dryadisque;Sunflowers;Terrarian Gothic;Beanie;Imbuing Station;Star in a Bottle;Empty Bullet;Impact;Powered by Birds;The Destroyer;The Persistency of Eyes;Unicorn Crossing the Hallows;Great Wave;Starry Night;Guide Picasso;The Guardians Gaze;Father of Someone;Nurse Lisa;Shadowbeam Staff;Inferno Fork;Spectre Staff;Wooden Fence;Lead Fence;Bubble Machine;Bubble Wand;Marching Bones Banner;Necromantic Sign;Rusted Company Standard;Ragged Brotherhood Sigil;Molten Legion Flag;Diabolic Sigil;Obsidian Platform;Obsidian Door;Obsidian Chair;Obsidian Table;Obsidian Work Bench;Obsidian Vase;Obsidian Bookcase;Hellbound Banner;Hell Hammer Banner;Helltower Banner;Lost Hopes of Man Banner;Obsidian Watcher Banner;Lava Erupts Banner;Blue Dungeon Bed;Green Dungeon Bed;Pink Dungeon Bed;Obsidian Bed;Waldo;Darkness;Dark Soul Reaper;Land;Trapped Ghost;Demons Eye;Finding Gold;First Encounter;Good Morning;Underground Reward;Through the Window;Place Above the Clouds;Do Not Step on the Grass;Cold Waters in the White Land;Lightless Chasms;The Land of Deceiving Looks;Daylight;Secret of the Sands;Deadland Comes Alive;Evil Presence;Sky Guardian;American Explosive;Discover;Hand Earth;Old Miner;Skelehead;Facing the Cerebral Mastermind;Lake of Fire;Trio Super Heroes;Spectre Hood;Spectre Robe;Spectre Pants;Spectre Pickaxe;Spectre Hamaxe;Ectoplasm;Gothic Chair;Gothic Table;Gothic Work Bench;Gothic Bookcase;Paladins Hammer;SWAT Helmet;Bee Wings;Giant Harpy Feather;Bone Feather;Fire Feather;Ice Feather;Broken Bat Wing;Tattered Bee Wing;Large Amethyst;Large Topaz;Large Sapphire;Large Emerald;Large Ruby;Large Diamond;Jungle Chest;Corruption Chest;Crimson Chest;Hallowed Chest;Ice Chest;Jungle Key;Corruption Key;Crimson Key;Hallowed Key;Frozen Key;Imp Face;Ominous Presence;Shining Moon;Living Gore;Flowing Magma;Spectre Paintbrush;Spectre Paint Roller;Spectre Paint Scraper;Shroomite Headgear;Shroomite Mask;Shroomite Helmet;Shroomite Breastplate;Shroomite Leggings;Autohammer;Shroomite Bar;S.D.M.G.;Cenxs Tiara;Cenxs Breastplate;Cenxs Leggings;Crownos Mask;Crownos Breastplate;Crownos Leggings;Wills Helmet;Wills Breastplate;Wills Leggings;Jims Helmet;Jims Breastplate;Jims Leggings;Aarons Helmet;Aarons Breastplate;Aarons Leggings;Vampire Knives;Broken Hero Sword;Scourge of the Corruptor;Staff of the Frost Hydra;The Creation of the Guide;The Merchant;Crowno Devours His Lunch;Rare Enchantment;Glorious Night;Sweetheart Necklace;Flurry Boots;D-Towns Helmet;D-Towns Breastplate;D-Towns Leggings;D-Towns Wings;Wills Wings;Crownos Wings;Cenxs Wings;Cenxs Dress;Cenxs Dress Pants;Palladium Column;Palladium Column Wall;Bubblegum Block;Bubblegum Block Wall;Titanstone Block;Titanstone Block Wall;Magic Cuffs;Music Box (Snow);Music Box (Space Night);Music Box (Crimson);Music Box (Boss 4);Music Box (Alt Overworld Day);Music Box (Rain);Music Box (Ice);Music Box (Desert);Music Box (Ocean Day);Music Box (Dungeon);Music Box (Plantera);Music Box (Boss 5);Music Box (Temple);Music Box (Eclipse);Music Box (Mushrooms);Butterfly Dust;Ankh Charm;Ankh Shield;Blue Flare;Angler Fish Banner;Angry Nimbus Banner;Anomura Fungus Banner;Antlion Banner;Arapaima Banner;Armored Skeleton Banner;Cave Bat Banner;Bird Banner;Black Recluse Banner;Blood Feeder Banner;Blood Jelly Banner;Blood Crawler Banner;Bone Serpent Banner;Bunny Banner;Chaos Elemental Banner;Mimic Banner;Clown Banner;Corrupt Bunny Banner;Corrupt Goldfish Banner;Crab Banner;Crimera Banner;Crimson Axe Banner;Cursed Hammer Banner;Demon Banner;Demon Eye Banner;Derpling Banner;Eater of Souls Banner;Enchanted Sword Banner;Frozen Zombie Banner;Face Monster Banner;Floaty Gross Banner;Flying Fish Banner;Flying Snake Banner;Frankenstein Banner;Fungi Bulb Banner;Fungo Fish Banner;Gastropod Banner;Goblin Thief Banner;Goblin Sorcerer Banner;Goblin Peon Banner;Goblin Scout Banner;Goblin Warrior Banner;Goldfish Banner;Harpy Banner;Hellbat Banner;Herpling Banner;Hornet Banner;Ice Elemental Banner;Icy Merman Banner;Fire Imp Banner;Blue Jellyfish Banner;Jungle Creeper Banner;Lihzahrd Banner;Man Eater Banner;Meteor Head Banner;Moth Banner;Mummy Banner;Mushi Ladybug Banner;Parrot Banner;Pigron Banner;Piranha Banner;Pirate Deckhand Banner;Pixie Banner;Raincoat Zombie Banner;Reaper Banner;Shark Banner;Skeleton Banner;Dark Caster Banner;Blue Slime Banner;Snow Flinx Banner;Wall Creeper Banner;Spore Zombie Banner;Swamp Thing Banner;Giant Tortoise Banner;Toxic Sludge Banner;Umbrella Slime Banner;Unicorn Banner;Vampire Banner;Vulture Banner;Nymph Banner;Werewolf Banner;Wolf Banner;World Feeder Banner;Worm Banner;Wraith Banner;Wyvern Banner;Zombie Banner;Glass Platform;Glass Chair;Golden Chair;Golden Toilet;Bar Stool;Honey Chair;Steampunk Chair;Glass Door;Golden Door;Honey Door;Steampunk Door;Glass Table;Banquet Table;Bar;Golden Table;Honey Table;Steampunk Table;Glass Bed;Golden Bed;Honey Bed;Steampunk Bed;Living Wood Wall;Fart in a Jar;Pumpkin;Pumpkin Wall;Hay;Hay Wall;Spooky Wood;Spooky Wood Wall;Pumpkin Helmet;Pumpkin Breastplate;Pumpkin Leggings;Candy Apple;Soul Cake;Nurse Hat;Nurse Shirt;Nurse Pants;Wizards Hat;Guy Fawkes Mask;Dye Trader Robe;Steampunk Goggles;Cyborg Helmet;Cyborg Shirt;Cyborg Pants;Creeper Mask;Creeper Shirt;Creeper Pants;Cat Mask;Cat Shirt;Cat Pants;Ghost Mask;Ghost Shirt;Pumpkin Mask;Pumpkin Shirt;Pumpkin Pants;Robot Mask;Robot Shirt;Robot Pants;Unicorn Mask;Unicorn Shirt;Unicorn Pants;Vampire Mask;Vampire Shirt;Vampire Pants;Witch Hat;Leprechaun Hat;Leprechaun Shirt;Leprechaun Pants;Pixie Shirt;Pixie Pants;Princess Hat;Princess Dress;Goodie Bag;Witch Dress;Witch Boots;Bride of Frankenstein Mask;Bride of Frankenstein Dress;Karate Tortoise Mask;Karate Tortoise Shirt;Karate Tortoise Pants;Candy Corn Rifle;Candy Corn;Jack O Lantern Launcher;Explosive Jack O Lantern;Sickle;Pumpkin Pie;Scarecrow Hat;Scarecrow Shirt;Scarecrow Pants;Cauldron;Pumpkin Chair;Pumpkin Door;Pumpkin Table;Pumpkin Work Bench;Pumpkin Platform;Tattered Fairy Wings;Spider Egg;Magical Pumpkin Seed;Bat Hook;Bat Scepter;Raven Staff;Jungle Key;Corruption Key;Crimson Key;Hallowed Key;Frozen Key;Hanging Jack O Lantern;Rotten Egg;Unlucky Yarn;Black Fairy Dust;Jackelier;Jack O Lantern;Spooky Chair;Spooky Door;Spooky Table;Spooky Work Bench;Spooky Wood Platform;Reaper Hood;Reaper Robe;Fox Mask;Fox Shirt;Fox Pants;Cat Ears;Bloody Machete;The Horsemans Blade;Bladed Glove;Pumpkin Seed;Spooky Hook;Spooky Wings;Spooky Twig;Spooky Helmet;Spooky Breastplate;Spooky Leggings;Stake Launcher;Stake;Cursed Sapling;Space Creature Mask;Space Creature Shirt;Space Creature Pants;Wolf Mask;Wolf Shirt;Wolf Pants;Pumpkin Moon Medallion;Necromantic Scroll;Jacking Skeletron;Bitter Harvest;Blood Moon Countess;Hallows Eve;Morbid Curiosity;Treasure Hunter Shirt;Treasure Hunter Pants;Dryad Coverings;Dryad Loincloth;Mourning Wood Trophy;Pumpking Trophy;Jack O Lantern Mask;Sniper Scope;Heart Lantern;Jellyfish Diving Gear;Arctic Diving Gear;Frostspark Boots;Fart in a Balloon;Papyrus Scarab;Celestial Stone;Hoverboard;Candy Cane;Sugar Plum;Present;Red Ryder;Festive Wings;Pine Tree Block;Christmas Tree;Star Topper 1;Star Topper 2;Star Topper 3;Bow Topper;White Garland;White and Red Garland;Red Garland;Red and Green Garland;Green Garland;Green and White Garland;Multicolored Bulb;Red Bulb;Yellow Bulb;Green Bulb;Red and Green Bulb;Yellow and Green Bulb;Red and Yellow Bulb;White Bulb;White and Red Bulb;White and Yellow Bulb;White and Green Bulb;Multicolored Lights;Red Lights;Green Lights;Blue Lights;Yellow Lights;Red and Yellow Lights;Red and Green Lights;Yellow and Green Lights;Blue and Green Lights;Red and Blue Lights;Blue and Yellow Lights;Giant Bow;Reindeer Antlers;Holly;Candy Cane Sword;Elf Melter;Christmas Pudding;Eggnog;Star Anise;Reindeer Bells;Candy Cane Hook;Christmas Hook;Candy Cane Pickaxe;Fruitcake Chakram;Sugar Cookie;Gingerbread Cookie;Hand Warmer;Coal;Toolbox;Pine Door;Pine Chair;Pine Table;Dog Whistle;Christmas Tree Sword;Chain Gun;Razorpine;Blizzard Staff;Mrs. Claus Hat;Mrs. Claus Shirt;Mrs. Claus Heels;Parka Hood;Parka Coat;Parka Pants;Snow Hat;Ugly Sweater;Tree Mask;Tree Shirt;Tree Trunks;Elf Hat;Elf Shirt;Elf Pants;Snowman Cannon;North Pole;Christmas Tree Wallpaper;Ornament Wallpaper;Candy Cane Wallpaper;Festive Wallpaper;Stars Wallpaper;Squiggles Wallpaper;Snowflake Wallpaper;Krampus Horn Wallpaper;Bluegreen Wallpaper;Grinch Finger Wallpaper;Naughty Present;Baby Grinchs Mischief Whistle;Ice Queen Trophy;Santa-NK1 Trophy;Everscream Trophy;Music Box (Pumpkin Moon);Music Box (Alt Underground);Music Box (Frost Moon);Brown Paint;Shadow Paint;Negative Paint;Team Dye;Amethyst Gemspark Block;Topaz Gemspark Block;Sapphire Gemspark Block;Emerald Gemspark Block;Ruby Gemspark Block;Diamond Gemspark Block;Amber Gemspark Block;Life Hair Dye;Mana Hair Dye;Depth Hair Dye;Money Hair Dye;Time Hair Dye;Team Hair Dye;Biome Hair Dye;Party Hair Dye;Rainbow Hair Dye;Speed Hair Dye;Angel Halo;Fez;Womannequin;Hair Dye Remover;Bug Net;Firefly;Firefly in a Bottle;Monarch Butterfly;Purple Emperor Butterfly;Red Admiral Butterfly;Ulysses Butterfly;Sulphur Butterfly;Tree Nymph Butterfly;Zebra Swallowtail Butterfly;Julia Butterfly;Worm;Mouse;Lightning Bug;Lightning Bug in a Bottle;Snail;Glowing Snail;Fancy Gray Wallpaper;Ice Floe Wallpaper;Music Wallpaper;Purple Rain Wallpaper;Rainbow Wallpaper;Sparkle Stone Wallpaper;Starlit Heaven Wallpaper;Bird;Blue Jay;Cardinal;Squirrel;Bunny;Cactus Bookcase;Ebonwood Bookcase;Flesh Bookcase;Honey Bookcase;Steampunk Bookcase;Glass Bookcase;Rich Mahogany Bookcase;Pearlwood Bookcase;Spooky Bookcase;Skyware Bookcase;Lihzahrd Bookcase;Frozen Bookcase;Cactus Lantern;Ebonwood Lantern;Flesh Lantern;Honey Lantern;Steampunk Lantern;Glass Lantern;Rich Mahogany Lantern;Pearlwood Lantern;Frozen Lantern;Lihzahrd Lantern;Skyware Lantern;Spooky Lantern;Frozen Door;Cactus Candle;Ebonwood Candle;Flesh Candle;Glass Candle;Frozen Candle;Rich Mahogany Candle;Pearlwood Candle;Lihzahrd Candle;Skyware Candle;Pumpkin Candle;Cactus Chandelier;Ebonwood Chandelier;Flesh Chandelier;Honey Chandelier;Frozen Chandelier;Rich Mahogany Chandelier;Pearlwood Chandelier;Lihzahrd Chandelier;Skyware Chandelier;Spooky Chandelier;Glass Chandelier;Cactus Bed;Flesh Bed;Frozen Bed;Lihzahrd Bed;Skyware Bed;Spooky Bed;Cactus Bathtub;Ebonwood Bathtub;Flesh Bathtub;Glass Bathtub;Frozen Bathtub;Rich Mahogany Bathtub;Pearlwood Bathtub;Lihzahrd Bathtub;Skyware Bathtub;Spooky Bathtub;Cactus Lamp;Ebonwood Lamp;Flesh Lamp;Glass Lamp;Frozen Lamp;Rich Mahogany Lamp;Pearlwood Lamp;Lihzahrd Lamp;Skyware Lamp;Spooky Lamp;Cactus Candelabra;Ebonwood Candelabra;Flesh Candelabra;Honey Candelabra;Steampunk Candelabra;Glass Candelabra;Rich Mahogany Candelabra;Pearlwood Candelabra;Frozen Candelabra;Lihzahrd Candelabra;Skyware Candelabra;Spooky Candelabra;Brain of Cthulhu Mask;Wall of Flesh Mask;Twin Mask;Skeletron Prime Mask;Queen Bee Mask;Plantera Mask;Golem Mask;Eater of Worlds Mask;Eye of Cthulhu Mask;Destroyer Mask;Blacksmith Rack;Carpentry Rack;Helmet Rack;Spear Rack;Sword Rack;Stone Slab;Sandstone Slab;Frog;Mallard Duck;Duck;Honey Bathtub;Steampunk Bathtub;Living Wood Bathtub;Shadewood Bathtub;Bone Bathtub;Honey Lamp;Steampunk Lamp;Living Wood Lamp;Shadewood Lamp;Golden Lamp;Bone Lamp;Living Wood Bookcase;Shadewood Bookcase;Golden Bookcase;Bone Bookcase;Living Wood Bed;Bone Bed;Living Wood Chandelier;Shadewood Chandelier;Golden Chandelier;Bone Chandelier;Living Wood Lantern;Shadewood Lantern;Golden Lantern;Bone Lantern;Living Wood Candelabra;Shadewood Candelabra;Golden Candelabra;Bone Candelabra;Living Wood Candle;Shadewood Candle;Golden Candle;Black Scorpion;Scorpion;Bubble Wallpaper;Copper Pipe Wallpaper;Ducky Wallpaper;Frost Core;Bunny Cage;Squirrel Cage;Mallard Duck Cage;Duck Cage;Bird Cage;Blue Jay Cage;Cardinal Cage;Waterfall Wall;Lavafall Wall;Crimson Seeds;Heavy Work Bench;Copper Plating;Snail Cage;Glowing Snail Cage;Shroomite Digging Claw;Ammo Box;Monarch Butterfly Jar;Purple Emperor Butterfly Jar;Red Admiral Butterfly Jar;Ulysses Butterfly Jar;Sulphur Butterfly Jar;Tree Nymph Butterfly Jar;Zebra Swallowtail Butterfly Jar;Julia Butterfly Jar;Scorpion Cage;Black Scorpion Cage;Venom Staff;Spectre Mask;Frog Cage;Mouse Cage;Bone Welder;Flesh Cloning Vat;Glass Kiln;Lihzahrd Furnace;Living Loom;Sky Mill;Ice Machine;Beetle Helmet;Beetle Scale Mail;Beetle Shell;Beetle Leggings;Steampunk Boiler;Honey Dispenser;Penguin;Penguin Cage;Worm Cage;Terrarium;Super Mana Potion;Ebonwood Fence;Rich Mahogany Fence;Pearlwood Fence;Shadewood Fence;Brick Layer;Extendo Grip;Paint Sprayer;Portable Cement Mixer;Beetle Husk;Celestial Magnet;Celestial Emblem;Celestial Cuffs;Peddlers Hat;Pulse Bow;Large Dynasty Lantern;Dynasty Lamp;Dynasty Lantern;Large Dynasty Candle;Dynasty Chair;Dynasty Work Bench;Dynasty Chest;Dynasty Bed;Dynasty Bathtub;Dynasty Bookcase;Dynasty Cup;Dynasty Bowl;Dynasty Candle;Dynasty Clock;Golden Clock;Glass Clock;Honey Clock;Steampunk Clock;Fancy Dishes;Glass Bowl;Wine Glass;Living Wood Piano;Flesh Piano;Frozen Piano;Frozen Table;Honey Chest;Steampunk Chest;Honey Work Bench;Frozen Work Bench;Steampunk Work Bench;Glass Piano;Honey Piano;Steampunk Piano;Honey Cup;Chalice;Dynasty Table;Dynasty Wood;Red Dynasty Shingles;Blue Dynasty Shingles;White Dynasty Wall;Blue Dynasty Wall;Dynasty Door;Sake;Pad Thai;Pho;Revolver;Gatligator;Arcane Rune Wall;Water Gun;Katana;Ultrabright Torch;Magic Hat;Diamond Ring;Gi;Kimono;Mystic Robe;Beetle Wings;Tiger Skin;Leopard Skin;Zebra Skin;Crimson Cloak;Mysterious Cape;Red Cape;Winter Cape;Frozen Chair;Wood Fishing Pole;Bass;Reinforced Fishing Pole;Fiberglass Fishing Pole;Fisher of Souls;Golden Fishing Rod;Mechanics Rod;Sitting Ducks Fishing Pole;Trout;Salmon;Atlantic Cod;Tuna;Red Snapper;Neon Tetra;Armored Cavefish;Damselfish;Crimson Tigerfish;Frost Minnow;Princess Fish;Golden Carp;Specular Fish;Prismite;Variegated Lardfish;Flarefin Koi;Double Cod;Honeyfin;Obsidifish;Shrimp;Chaos Fish;Ebonkoi;Hemopiranha;Rockfish;Stinkfish;Mining Potion;Heartreach Potion;Calming Potion;Builder Potion;Titan Potion;Flipper Potion;Summoning Potion;Dangersense Potion;Purple Clubberfish;Obsidian Swordfish;Swordfish;Iron Fence;Wooden Crate;Iron Crate;Golden Crate;Old Shoe;Seaweed;Tin Can;Minecart Track;Reaver Shark;Sawtooth Shark;Minecart;Ammo Reservation Potion;Lifeforce Potion;Endurance Potion;Rage Potion;Inferno Potion;Wrath Potion;Recall Potion;Teleportation Potion;Love Potion;Stink Potion;Fishing Potion;Sonar Potion;Crate Potion;Shiverthorn Seeds;Shiverthorn;Warmth Potion;Fish Hook;Bee Headgear;Bee Breastplate;Bee Greaves;Hornet Staff;Imp Staff;Queen Spider Staff;Angler Hat;Angler Vest;Angler Pants;Spider Mask;Spider Breastplate;Spider Greaves;High Test Fishing Line;Angler Earring;Tackle Box;Blue Dungeon Piano;Green Dungeon Piano;Pink Dungeon Piano;Golden Piano;Obsidian Piano;Bone Piano;Cactus Piano;Spooky Piano;Skyware Piano;Lihzahrd Piano;Blue Dungeon Dresser;Green Dungeon Dresser;Pink Dungeon Dresser;Golden Dresser;Obsidian Dresser;Bone Dresser;Cactus Dresser;Spooky Dresser;Skyware Dresser;Honey Dresser;Lihzahrd Dresser;Sofa;Ebonwood Sofa;Rich Mahogany Sofa;Pearlwood Sofa;Shadewood Sofa;Blue Dungeon Sofa;Green Dungeon Sofa;Pink Dungeon Sofa;Golden Sofa;Obsidian Sofa;Bone Sofa;Cactus Sofa;Spooky Sofa;Skyware Sofa;Honey Sofa;Steampunk Sofa;Mushroom Sofa;Glass Sofa;Pumpkin Sofa;Lihzahrd Sofa;Seashell Hairpin;Mermaid Adornment;Mermaid Tail;Zephyr Fish;Fleshcatcher;Hotline Fishing Hook;Frog Leg;Anchor;Cooked Fish;Cooked Shrimp;Sashimi;Fuzzy Carrot;Scaly Truffle;Slimy Saddle;Bee Wax;Copper Plating Wall;Stone Slab Wall;Sail;Coralstone Block;Blue Jellyfish;Green Jellyfish;Pink Jellyfish;Blue Jellyfish Jar;Green Jellyfish Jar;Pink Jellyfish Jar;Life Preserver;Ships Wheel;Compass Rose;Wall Anchor;Goldfish Trophy;Bunnyfish Trophy;Swordfish Trophy;Sharkteeth Trophy;Batfish;Bumblebee Tuna;Catfish;Cloudfish;Cursedfish;Dirtfish;Dynamite Fish;Eater of Plankton;Fallen Starfish;The Fish of Cthulhu;Fishotron;Harpyfish;Hungerfish;Ichorfish;Jewelfish;Mirage Fish;Mutant Flinxfin;Pengfish;Pixiefish;Spiderfish;Tundra Trout;Unicorn Fish;Guide Voodoo Fish;Wyverntail;Zombie Fish;Amanita Fungifin;Angelfish;Bloody Manowar;Bonefish;Bunnyfish;Capn Tunabeard;Clownfish;Demonic Hellfish;Derpfish;Fishron;Infected Scabbardfish;Mudfish;Slimefish;Tropical Barracuda;King Slime Trophy;Ship in a Bottle;Hardy Saddle;Pressure Plate Track;King Slime Mask;Fin Wings;Treasure Map;Seaweed Planter;Pillagin Me Pixels;Fish Costume Mask;Fish Costume Shirt;Fish Costume Finskirt;Ginger Beard;Honeyed Goggles;Boreal Wood;Palm Wood;Boreal Wood Wall;Palm Wood Wall;Boreal Wood Fence;Palm Wood Fence;Boreal Wood Helmet;Boreal Wood Breastplate;Boreal Wood Greaves;Palm Wood Helmet;Palm Wood Breastplate;Palm Wood Greaves;Palm Wood Bow;Palm Wood Hammer;Palm Wood Sword;Palm Wood Platform;Palm Wood Bathtub;Palm Wood Bed;Palm Wood Bench;Palm Wood Candelabra;Palm Wood Candle;Palm Wood Chair;Palm Wood Chandelier;Palm Wood Chest;Palm Wood Sofa;Palm Wood Door;Palm Wood Dresser;Palm Wood Lantern;Palm Wood Piano;Palm Wood Table;Palm Wood Lamp;Palm Wood Work Bench;Optic Staff;Palm Wood Bookcase;Mushroom Bathtub;Mushroom Bed;Mushroom Bench;Mushroom Bookcase;Mushroom Candelabra;Mushroom Candle;Mushroom Chandelier;Mushroom Chest;Mushroom Dresser;Mushroom Lantern;Mushroom Lamp;Mushroom Piano;Mushroom Platform;Mushroom Table;Spider Staff;Boreal Wood Bathtub;Boreal Wood Bed;Boreal Wood Bookcase;Boreal Wood Candelabra;Boreal Wood Candle;Boreal Wood Chair;Boreal Wood Chandelier;Boreal Wood Chest;Boreal Wood Clock;Boreal Wood Door;Boreal Wood Dresser;Boreal Wood Lamp;Boreal Wood Lantern;Boreal Wood Piano;Boreal Wood Platform;Slime Bathtub;Slime Bed;Slime Bookcase;Slime Candelabra;Slime Candle;Slime Chair;Slime Chandelier;Slime Chest;Slime Clock;Slime Door;Slime Dresser;Slime Lamp;Slime Lantern;Slime Piano;Slime Platform;Slime Sofa;Slime Table;Pirate Staff;Slime Hook;Sticky Grenade;Tartar Sauce;Duke Fishron Mask;Duke Fishron Trophy;Molotov Cocktail;Bone Clock;Cactus Clock;Ebonwood Clock;Frozen Clock;Lihzahrd Clock;Living Wood Clock;Rich Mahogany Clock;Flesh Clock;Mushroom Clock;Obsidian Clock;Palm Wood Clock;Pearlwood Clock;Pumpkin Clock;Shadewood Clock;Spooky Clock;Skyware Clock;Spider Fang;Falcon Blade;Fishron Wings;Slime Gun;Flairon;Green Dungeon Chest;Pink Dungeon Chest;Blue Dungeon Chest;Bone Chest;Cactus Chest;Flesh Chest;Obsidian Chest;Pumpkin Chest;Spooky Chest;Tempest Staff;Razorblade Typhoon;Bubble Gun;Tsunami;Seashell;Starfish;Steampunk Platform;Skyware Platform;Living Wood Platform;Honey Platform;Skyware Work Bench;Glass Work Bench;Living Wood Work Bench;Flesh Sofa;Frozen Sofa;Living Wood Sofa;Pumpkin Dresser;Steampunk Dresser;Glass Dresser;Flesh Dresser;Pumpkin Lantern;Obsidian Lantern;Pumpkin Lamp;Obsidian Lamp;Blue Dungeon Lamp;Green Dungeon Lamp;Pink Dungeon Lamp;Honey Candle;Steampunk Candle;Spooky Candle;Obsidian Candle;Blue Dungeon Chandelier;Green Dungeon Chandelier;Pink Dungeon Chandelier;Steampunk Chandelier;Pumpkin Chandelier;Obsidian Chandelier;Blue Dungeon Bathtub;Green Dungeon Bathtub;Pink Dungeon Bathtub;Pumpkin Bathtub;Obsidian Bathtub;Golden Bathtub;Blue Dungeon Candelabra;Green Dungeon Candelabra;Pink Dungeon Candelabra;Obsidian Candelabra;Pumpkin Candelabra;Pumpkin Bed;Pumpkin Bookcase;Pumpkin Piano;Shark Statue;Truffle Worm;Apprentice Bait;Journeyman Bait;Master Bait;Amber Gemspark Wall;Offline Amber Gemspark Wall;Amethyst Gemspark Wall;Offline Amethyst Gemspark Wall;Diamond Gemspark Wall;Offline Diamond Gemspark Wall;Emerald Gemspark Wall;Offline Emerald Gemspark Wall;Ruby Gemspark Wall;Offline Ruby Gemspark Wall;Sapphire Gemspark Wall;Offline Sapphire Gemspark Wall;Topaz Gemspark Wall;Offline Topaz Gemspark Wall;Tin Plating Wall;Tin Plating;Waterfall Block;Lavafall Block;Confetti Block;Confetti Wall;Midnight Confetti Block;Midnight Confetti Wall;Weapon Rack;Fireworks Box;Living Fire Block;0 Statue;1 Statue;2 Statue;3 Statue;4 Statue;5 Statue;6 Statue;7 Statue;8 Statue;9 Statue;A Statue;B Statue;C Statue;D Statue;E Statue;F Statue;G Statue;H Statue;I Statue;J Statue;K Statue;L Statue;M Statue;N Statue;O Statue;P Statue;Q Statue;R Statue;S Statue;T Statue;U Statue;V Statue;W Statue;X Statue;Y Statue;Z Statue;Firework Fountain;Booster Track;Grasshopper;Grasshopper Cage;Music Box (Underground Crimson);Cactus Table;Cactus Platform;Boreal Wood Sword;Boreal Wood Hammer;Boreal Wood Bow;Glass Chest;Xeno Staff;Meteor Staff;Living Cursed Fire Block;Living Demon Fire Block;Living Frost Fire Block;Living Ichor Block;Living Ultrabright Fire Block;Gender Change Potion;Vortex Helmet;Vortex Breastplate;Vortex Leggings;Nebula Helmet;Nebula Breastplate;Nebula Leggings;Solar Flare Helmet;Solar Flare Breastplate;Solar Flare Leggings;Solar Tablet Fragment;Solar Tablet;Drill Containment Unit;Cosmic Car Key;Mothron Wings;Brain Scrambler;;;Vortex Drill;;Vortex Pickaxe;;;Nebula Drill;;Nebula Pickaxe;;;Solar Flare Drill;;Solar Flare Pickaxe;Honeyfall Block;Honeyfall Wall;Chlorophyte Brick Wall;Crimtane Brick Wall;Shroomite Plating Wall;Chlorophyte Brick;Crimtane Brick;Shroomite Plating;Laser Machinegun;Electrosphere Launcher;Xenopopper;Laser Drill;Mechanical Ruler;Anti-Gravity Hook;Moon Mask;Sun Mask;Martian Costume Mask;Martian Costume Shirt;Martian Costume Pants;Martian Uniform Helmet;Martian Uniform Torso;Martian Uniform Pants;Martian Astro Clock;Martian Bathtub;Martian Bed;Martian Hover Chair;Martian Chandelier;Martian Chest;Martian Door;Martian Dresser;Martian Holobookcase;Martian Hover Candle;Martian Lamppost;Martian Lantern;Martian Piano;Martian Platform;Martian Sofa;Martian Table;Martian Table Lamp;Martian Work Bench;Wooden Sink;Ebonwood Sink;Rich Mahogany Sink;Pearlwood Sink;Bone Sink;Flesh Sink;Living Wood Sink;Skyware Sink;Shadewood Sink;Lihzahrd Sink;Blue Dungeon Sink;Green Dungeon Sink;Pink Dungeon Sink;Obsidian Sink;Metal Sink;Glass Sink;Golden Sink;Honey Sink;Steampunk Sink;Pumpkin Sink;Spooky Sink;Frozen Sink;Dynasty Sink;Palm Wood Sink;Mushroom Sink;Boreal Wood Sink;Slime Sink;Cactus Sink;Martian Sink;Solar Cultist Hood;Lunar Cultist Hood;Solar Cultist Robe;Lunar Cultist Robe;Martian Conduit Plating;Martian Conduit Wall;HiTek Sunglasses;Martian Hair Dye;Martian Dye;Castle Marsberg;Martia Lisa;The Truth Is Up There;Smoke Block;Living Flame Dye;Living Rainbow Dye;Shadow Dye;Negative Dye;Living Ocean Dye;Brown Dye;Brown and Black Dye;Bright Brown Dye;Brown and Silver Dye;Wisp Dye;Pixie Dye;Influx Waver;;Charged Blaster Cannon;Chlorophyte Dye;Unicorn Wisp Dye;Infernal Wisp Dye;Vicious Powder;Vicious Mushroom;The Bees Knees;Gold Bird;Gold Bunny;Gold Butterfly;Gold Frog;Gold Grasshopper;Gold Mouse;Gold Worm;Sticky Dynamite;Angry Trapper Banner;Armored Viking Banner;Black Slime Banner;Blue Armored Bones Banner;Blue Cultist Archer Banner;Lunatic Devotee Banner;Blue Cultist Fighter Banner;Bone Lee Banner;Clinger Banner;Cochineal Beetle Banner;Corrupt Penguin Banner;Corrupt Slime Banner;Corruptor Banner;Crimslime Banner;Cursed Skull Banner;Cyan Beetle Banner;Devourer Banner;Diabolist Banner;Doctor Bones Banner;Dungeon Slime Banner;Dungeon Spirit Banner;Elf Archer Banner;Elf Copter Banner;Eyezor Banner;Flocko Banner;Ghost Banner;Giant Bat Banner;Giant Cursed Skull Banner;Giant Flying Fox Banner;Gingerbread Man Banner;Goblin Archer Banner;Green Slime Banner;Headless Horseman Banner;Hell Armored Bones Banner;Hellhound Banner;Hoppin Jack Banner;Ice Bat Banner;Ice Golem Banner;Ice Slime Banner;Ichor Sticker Banner;Illuminant Bat Banner;Illuminant Slime Banner;Jungle Bat Banner;Jungle Slime Banner;Krampus Banner;Lac Beetle Banner;Lava Bat Banner;Lava Slime Banner;Martian Brainscrambler Banner;Martian Drone Banner;Martian Engineer Banner;Martian Gigazapper Banner;Martian Gray Grunt Banner;Martian Officer Banner;Martian Ray Gunner Banner;Martian Scutlix Gunner Banner;Martian Tesla Turret Banner;Mister Stabby Banner;Mother Slime Banner;Necromancer Banner;Nutcracker Banner;Paladin Banner;Penguin Banner;Pinky Banner;Poltergeist Banner;Possessed Armor Banner;Present Mimic Banner;Purple Slime Banner;Ragged Caster Banner;Rainbow Slime Banner;Raven Banner;Red Slime Banner;Rune Wizard Banner;Rusty Armored Bones Banner;Scarecrow Banner;Scutlix Banner;Skeleton Archer Banner;Skeleton Commando Banner;Skeleton Sniper Banner;Slimer Banner;Snatcher Banner;Snow Balla Banner;Snowman Gangsta Banner;Spiked Ice Slime Banner;Spiked Jungle Slime Banner;Splinterling Banner;Squid Banner;Tactical Skeleton Banner;The Groom Banner;Tim Banner;Undead Miner Banner;Undead Viking Banner;White Cultist Archer Banner;White Cultist Caster Banner;White Cultist Fighter Banner;Yellow Slime Banner;Yeti Banner;Zombie Elf Banner;Sparky;Vine Rope;Wormhole Potion;Summoner Emblem;Bewitching Table;Alchemy Table;Strange Brew;Spelunker Glowstick;Bone Arrow;Bone Torch;Vine Rope Coil;Life Drain;Dart Pistol;Dart Rifle;Crystal Dart;Cursed Dart;Ichor Dart;Chain Guillotines;Fetid Baghnakhs;Clinger Staff;Putrid Scent;Flesh Knuckles;Flower Boots;Seedler;Hellwing Bow;Tendon Hook;Thorn Hook;Illuminant Hook;Worm Hook;Skiphs Blood;Purple Ooze Dye;Reflective Silver Dye;Reflective Gold Dye;Blue Acid Dye;Daedalus Stormbow;Flying Knife;Bottomless Water Bucket;Super Absorbant Sponge;Gold Ring;Coin Ring;Greedy Ring;Fish Finder;Weather Radio;Hades Dye;Twilight Dye;Acid Dye;Glowing Mushroom Dye;Phase Dye;Magic Lantern;Music Box (Lunar Boss);Rainbow Torch;Cursed Campfire;Demon Campfire;Frozen Campfire;Ichor Campfire;Rainbow Campfire;Crystal Vile Shard;Shadowflame Bow;Shadowflame Hex Doll;Shadowflame Knife;Acorns;Cold Snap;Cursed Saint;Snowfellas;The Season;Bone Rattle;Architect Gizmo Pack;Crimson Heart;Meowmere;Enchanted Sundial;Star Wrath;Smooth Marble Block;Hellstone Brick Wall;Guide to Plant Fiber Cordage;Wand of Sparking;Gold Bird Cage;Gold Bunny Cage;Gold Butterfly Jar;Gold Frog Cage;Gold Grasshopper Cage;Gold Mouse Cage;Gold Worm Cage;Silk Rope;Web Rope;Silk Rope Coil;Web Rope Coil;Marble Block;Marble Wall;Smooth Marble Wall;Radar;Golden Lock Box;Granite Block;Smooth Granite Block;Granite Wall;Smooth Granite Wall;Royal Gel;Key of Night;Key of Light;Herb Bag;Javelin;Tally Counter;Sextant;Shield of Cthulhu;Butchers Chainsaw;Stopwatch;Meteorite Brick;Meteorite Brick Wall;Metal Detector;Endless Quiver;Endless Musket Pouch;Toxic Flask;Psycho Knife;Nail Gun;Nail;Night Vision Helmet;Celestial Shell;Pink Gel;Bouncy Glowstick;Pink Slime Block;Pink Torch;Bouncy Bomb;Bouncy Grenade;Peace Candle;Lifeform Analyzer;DPS Meter;Fishermans Pocket Guide;Goblin Tech;R.E.K. 3000;PDA;Cell Phone;Granite Chest;Meteorite Clock;Marble Clock;Granite Clock;Meteorite Door;Marble Door;Granite Door;Meteorite Dresser;Marble Dresser;Granite Dresser;Meteorite Lamp;Marble Lamp;Granite Lamp;Meteorite Lantern;Marble Lantern;Granite Lantern;Meteorite Piano;Marble Piano;Granite Piano;Meteorite Platform;Marble Platform;Granite Platform;Meteorite Sink;Marble Sink;Granite Sink;Meteorite Sofa;Marble Sofa;Granite Sofa;Meteorite Table;Marble Table;Granite Table;Meteorite Work Bench;Marble Work Bench;Granite Work Bench;Meteorite Bathtub;Marble Bathtub;Granite Bathtub;Meteorite Bed;Marble Bed;Granite Bed;Meteorite Bookcase;Marble Bookcase;Granite Bookcase;Meteorite Candelabra;Marble Candelabra;Granite Candelabra;Meteorite Candle;Marble Candle;Granite Candle;Meteorite Chair;Marble Chair;Granite Chair;Meteorite Chandelier;Marble Chandelier;Granite Chandelier;Meteorite Chest;Marble Chest;Magic Water Dropper;Golden Bug Net;Magic Lava Dropper;Magic Honey Dropper;Empty Dropper;Gladiator Helmet;Gladiator Breastplate;Gladiator Leggings;Reflective Dye;Enchanted Nightcrawler;Grubby;Sluggy;Buggy;Grub Soup;Bomb Fish;Frost Daggerfish;Sharpening Station;Ice Mirror;Sailfish Boots;Tsunami in a Bottle;Target Dummy;Corrupt Crate;Crimson Crate;Dungeon Crate;Sky Crate;Hallowed Crate;Jungle Crate;Crystal Serpent;Toxikarp;Bladetongue;Shark Tooth Necklace;Money Trough;Bubble;Daybloom Planter Box;Moonglow Planter Box;Deathweed Planter Box;Deathweed Planter Box;Blinkroot Planter Box;Waterleaf Planter Box;Shiverthorn Planter Box;Fireblossom Planter Box;Brain of Confusion;Worm Scarf;Balloon Pufferfish;Lazures Valkyrie Circlet;Lazures Valkyrie Cloak;Lazures Barrier Platform;Golden Cross Grave Marker;Golden Tombstone;Golden Grave Marker;Golden Gravestone;Golden Headstone;Crystal Block;Music Box (Martian Madness);Music Box (Pirate Invasion);Music Box (Hell);Crystal Block Wall;Trap Door;Tall Gate;Sharkron Balloon;Tax Collectors Hat;Tax Collectors Suit;Tax Collectors Pants;Bone Glove;Clothiers Jacket;Clothiers Pants;Dye Traders Turban;Deadly Sphere Staff;Green Horseshoe Balloon;Amber Horseshoe Balloon;Pink Horseshoe Balloon;Lava Lamp;Enchanted Nightcrawler Cage;Buggy Cage;Grubby Cage;Sluggy Cage;Slap Hand;Twilight Hair Dye;Blessed Apple;Spectre Bar;Code 1;Buccaneer Bandana;Buccaneer Tunic;Buccaneer Pantaloons;Obsidian Outlaw Hat;Obsidian Longcoat;Obsidian Pants;Medusa Head;Item Frame;Sandstone Block;Hardened Sand Block;Sandstone Wall;Hardened Ebonsand Block;Hardened Crimsand Block;Ebonsandstone Block;Crimsandstone Block;Wooden Yoyo;Malaise;Artery;Amazon;Cascade;Chik;Code 2;Rally;Yelets;Reds Throw;Valkyrie Yoyo;Amarok;Hel-Fire;Kraken;The Eye of Cthulhu;Red String;Orange String;Yellow String;Lime String;Green String;Teal String;Cyan String;Sky Blue String;Blue String;Purple String;Violet String;Pink String;Brown String;White String;Rainbow String;Black String;Black Counterweight;Blue Counterweight;Green Counterweight;Purple Counterweight;Red Counterweight;Yellow Counterweight;Format:C;Gradient;Valor;Treasure Bag (King Slime) (King Slime);Treasure Bag (Eye of Cthulhu) (Eye of Cthulhu);Treasure Bag (Eater of Worlds) (Eater of Worlds Head);Treasure Bag (Brain of Cthulhu) (Brain of Cthulhu);Treasure Bag (Queen Bee) (Queen Bee);Treasure Bag (Skeletron) (Skeletron Head);Treasure Bag (Wall of Flesh) (Wall of Flesh);Treasure Bag (The Destroyer) (The Destroyer Head);Treasure Bag (The Twins) (The Twins);Treasure Bag (Skeletron Prime) (Skeletron Prime);Treasure Bag (Plantera) (Plantera);Treasure Bag (Golem) (Golem);Treasure Bag (Duke Fishron) (Duke Fishron);Treasure Bag (Lunatic Cultist) (Lunatic Cultist);Treasure Bag (Moon Lord) (Moon Lord);Hive Pack;Yoyo Glove;Demon Heart;Spore Sac;Shiny Stone;Hardened Pearlsand Block;Pearlsandstone Block;Hardened Sand Wall;Hardened Ebonsand Wall;Hardened Crimsand Wall;Hardened Pearlsand Wall;Ebonsandstone Wall;Crimsandstone Wall;Pearlsandstone Wall;Desert Fossil;Desert Fossil Wall;Exotic Scimitar;Paintball Gun;Classy Cane;Stylish Scissors;Mechanical Cart;Mechanical Wheel Piece;Mechanical Wagon Piece;Mechanical Battery Piece;Lunatic Cultist Trophy;Martian Saucer Trophy;Flying Dutchman Trophy;Living Mahogany Wand;Rich Mahogany Leaf Wand;Fallen Tuxedo Shirt;Fallen Tuxedo Pants;Fireplace;Chimney;Yoyo Bag;Shrimpy Truffle;Arkhalis;Confetti Cannon;Music Box (The Towers);Music Box (Goblin Invasion);Lunatic Cultist Mask;Moon Lord Mask;Fossil Helmet;Fossil Plate;Fossil Greaves;Amber Staff;Bone Javelin;Bone Throwing Knife;Sturdy Fossil;Stardust Helmet;Stardust Plate;Stardust Leggings;Portal Gun;Strange Plant;Strange Plant;Strange Plant;Strange Plant;Terrarian;Goblin Summoner Banner;Salamander Banner;Giant Shelly Banner;Crawdad Banner;Fritz Banner;Creature From The Deep Banner;Dr. Man Fly Banner;Mothron Banner;Severed Hand Banner;The Possessed Banner;Butcher Banner;Psycho Banner;Deadly Sphere Banner;Nailhead Banner;Poisonous Spore Banner;Medusa Banner;Hoplite Banner;Granite Elemental Banner;Granite Golem Banner;Blood Zombie Banner;Drippler Banner;Tomb Crawler Banner;Dune Splicer Banner;Antlion Swarmer Banner;Antlion Charger Banner;Ghoul Banner;Lamia Banner;Desert Spirit Banner;Basilisk Banner;Sand Poacher Banner;Stargazer Banner;Milkyway Weaver Banner;Flow Invader Banner;Twinkle Popper Banner;Mini Star Cell Banner;Star Cell Banner;Corite Banner;Sroller Banner;Crawltipede Banner;Drakomire Rider Banner;Drakomire Banner;Selenian Banner;Predictor Banner;Brain Suckler Banner;Nebula Floater Banner;Evolution Beast Banner;Alien Larva Banner;Alien Queen Banner;Alien Hornet Banner;Vortexian Banner;Storm Diver Banner;Pirate Captain Banner;Pirate Deadeye Banner;Pirate Corsair Banner;Pirate Crossbower Banner;Martian Walker Banner;Red Devil Banner;Pink Jellyfish Banner;Green Jellyfish Banner;Dark Mummy Banner;Light Mummy Banner;Angry Bones Banner;Ice Tortoise Banner;Damage Booster;Life Booster;Mana Booster;Vortex Fragment;Nebula Fragment;Solar Fragment;Stardust Fragment;Luminite;Luminite Brick;Stardust Axe;Stardust Saw;Stardust Drill;Stardust Hammer;Stardust Pickaxe;Luminite Bar;Solar Wings;Vortex Booster;Nebula Mantle;Stardust Wings;Luminite Brick Wall;Solar Eruption;Stardust Cell Staff;Vortex Beater;Nebula Arcanum;Blood Water;Wedding Veil;Wedding Dress;Platinum Bow;Platinum Hammer;Platinum Axe;Platinum Shortsword;Platinum Broadsword;Platinum Pickaxe;Tungsten Bow;Tungsten Hammer;Tungsten Axe;Tungsten Shortsword;Tungsten Broadsword;Tungsten Pickaxe;Lead Bow;Lead Hammer;Lead Axe;Lead Shortsword;Lead Broadsword;Lead Pickaxe;Tin Bow;Tin Hammer;Tin Axe;Tin Shortsword;Tin Broadsword;Tin Pickaxe;Copper Bow;Copper Hammer;Copper Axe;Copper Shortsword;Copper Broadsword;Copper Pickaxe;Silver Bow;Silver Hammer;Silver Axe;Silver Shortsword;Silver Broadsword;Silver Pickaxe;Gold Bow;Gold Hammer;Gold Axe;Gold Shortsword;Gold Broadsword;Gold Pickaxe;Solar Flare Hamaxe;Vortex Hamaxe;Nebula Hamaxe;Stardust Hamaxe;Solar Dye;Nebula Dye;Vortex Dye;Stardust Dye;Void Dye;Stardust Dragon Staff;Bacon;Shifting Sands Dye;Mirage Dye;Shifting Pearlsands Dye;Vortex Monolith;Nebula Monolith;Stardust Monolith;Solar Monolith;Phantasm;Last Prism;Nebula Blaze;Daybreak;Super Healing Potion;Detonator;Celebration;Bouncy Dynamite;Happy Grenade;Ancient Manipulator;Flame and Silver Dye;Green Flame and Silver Dye;Blue Flame and Silver Dye;Reflective Copper Dye;Reflective Obsidian Dye;Reflective Metal Dye;Midnight Rainbow Dye;Black and White Dye;Bright Silver Dye;Silver and Black Dye;Red Acid Dye;Gel Dye;Pink Gel Dye;Red Squirrel;Gold Squirrel;Red Squirrel Cage;Gold Squirrel Cage;Luminite Bullet;Luminite Arrow;Lunar Portal Staff;Lunar Flare;Rainbow Crystal Staff;Lunar Hook;Solar Fragment Block;Vortex Fragment Block;Nebula Fragment Block;Stardust Fragment Block;Suspicious Looking Tentacle;Yoraiz0rs Uniform;Yoraiz0rs Skirt;Yoraiz0rs Spell;Yoraiz0rs Scowl;Jims Wings;Yoraiz0rs Recolored Goggles;Living Leaf Wall;Skiphs Mask;Skiphs Skin;Skiphs Bear Butt;Skiphs Paws;Lokis Helmet;Lokis Breastplate;Lokis Greaves;Lokis Wings;Sand Slime Banner;Sea Snail Banner;Moon Lord Trophy;Not a Kid, nor a Squid;Burning Hades Dye;Grim Dye;Lokis Dye;Shadowflame Hades Dye;Celestial Sigil;Logic Gate Lamp (Off);Logic Gate (AND);Logic Gate (OR);Logic Gate (NAND);Logic Gate (NOR);Logic Gate (XOR);Logic Gate (XNOR);Conveyor Belt (Clockwise);Conveyor Belt (Counter Clockwise);The Grand Design;Yellow Wrench;Logic Sensor (Day);Logic Sensor (Night);Logic Sensor (Player Above);Junction Box;Announcement Box;Logic Gate Lamp (On);Mechanical Lens;Actuation Rod;Red Team Block;Red Team Platform;Static Hook;Presserator;Multicolor Wrench;Pink Weighted Pressure Plate;Engineering Helmet;Companion Cube;Wire Bulb;Orange Weighted Pressure Plate;Purple Weighted Pressure Plate;Cyan Weighted Pressure Plate;Green Team Block;Blue Team Block;Yellow Team Block;Pink Team Block;White Team Block;Green Team Platform;Blue Team Platform;Yellow Team Platform;Pink Team Platform;White Team Platform;Large Amber;Ruby Gem Lock;Sapphire Gem Lock;Emerald Gem Lock;Topaz Gem Lock;Amethyst Gem Lock;Diamond Gem Lock;Amber Gem Lock;Squirrel Statue;Butterfly Statue;Worm Statue;Firefly Statue;Scorpion Statue;Snail Statue;Grasshopper Statue;Mouse Statue;Duck Statue;Penguin Statue;Frog Statue;Buggy Statue;Logic Gate Lamp (Faulty);Portal Gun Station;Trapped Chest;Trapped Gold Chest;Trapped Shadow Chest;Trapped Ebonwood Chest;Trapped Rich Mahogany Chest;Trapped Pearlwood Chest;Trapped Ivy Chest;Trapped Frozen Chest;Trapped Living Wood Chest;Trapped Skyware Chest;Trapped Shadewood Chest;Trapped Web Covered Chest;Trapped Lihzahrd Chest;Trapped Water Chest;Trapped Jungle Chest;Trapped Corruption Chest;Trapped Crimson Chest;Trapped Hallowed Chest;Trapped Ice Chest;Trapped Dynasty Chest;Trapped Honey Chest;Trapped Steampunk Chest;Trapped Palm Wood Chest;Trapped Mushroom Chest;Trapped Boreal Wood Chest;Trapped Slime Chest;Trapped Green Dungeon Chest;Trapped Pink Dungeon Chest;Trapped Blue Dungeon Chest;Trapped Bone Chest;Trapped Cactus Chest;Trapped Flesh Chest;Trapped Obsidian Chest;Trapped Pumpkin Chest;Trapped Spooky Chest;Trapped Glass Chest;Trapped Martian Chest;Trapped Meteorite Chest;Trapped Granite Chest;Trapped Marble Chest;ItemName.Fake_newchest1;ItemName.Fake_newchest2;Teal Pressure Pad;Wall Creeper Statue;Unicorn Statue;Drippler Statue;Wraith Statue;Bone Skeleton Statue;Undead Viking Statue;Medusa Statue;Harpy Statue;Pigron Statue;Hoplite Statue;Granite Golem Statue;Armed Zombie Statue;Blood Zombie Statue;Angler Tackle Bag;Geyser;Ultrabright Campfire;Bone Campfire;Pixel Box;Liquid Sensor (Water);Liquid Sensor (Lava);Liquid Sensor (Honey);Liquid Sensor (Any);Bundled Party Balloons;Balloon Animal;Party Hat;Silly Sunflower Petals;Silly Sunflower Tops;Silly Sunflower Bottoms;Silly Pink Balloon;Silly Purple Balloon;Silly Green Balloon;Blue Streamer;Green Streamer;Pink Streamer;Silly Balloon Machine;Silly Tied Balloon (Pink);Silly Tied Balloon (Purple);Silly Tied Balloon (Green);Pigronata;Party Center;Silly Tied Bundle of Balloons;Party Present;Slice of Cake;Cog Wall;Sandfall Wall;Snowfall Wall;Sandfall Block;Snowfall Block;Snow Cloud;Pedguins Hood;Pedguins Jacket;Pedguins Trousers;Silly Pink Balloon Wall;Silly Purple Balloon Wall;Silly Green Balloon Wall;0x33s Aviators;Blue Phasesaber;Red Phasesaber;Green Phasesaber;Purple Phasesaber;White Phasesaber;Yellow Phasesaber;Djinns Curse;Ancient Horn;Mandible Blade;Ancient Headdress;Ancient Garments;Ancient Slacks;Forbidden Mask;Forbidden Robes;Forbidden Treads;Spirit Flame;Sand Elemental Banner;Pocket Mirror;Magic Sand Dropper;Forbidden Fragment;Lamia Tail;Lamia Wraps;Lamia Mask;Sky Fracture;Onyx Blaster;Sand Shark Banner;Bone Biter Banner;Flesh Reaver Banner;Crystal Thresher Banner;Angry Tumbler Banner;Ancient Cloth;Desert Spirit Lamp;Music Box (Sandstorm);Apprentices Hat;Apprentices Robe;Apprentices Trousers;Squires Great Helm;Squires Plating;Squires Greaves;Huntresss Wig;Huntresss Jerkin;Huntresss Pants;Monks Bushy Brow Bald Cap;Monks Shirt;Monks Pants;Apprentices Scarf;Squires Shield;Huntresss Buckler;Monks Belt;Defenders Forge;War Table;War Table Banner;Eternia Crystal Stand;Defender Medal;Flameburst Rod;Flameburst Cane;Flameburst Staff;Ale Tosser;Etherian Mana;Brand of the Inferno;Ballista Rod;Ballista Cane;Ballista Staff;Flying Dragon;Eternia Crystal;Lightning Aura Rod;Lightning Aura Cane;Lightning Aura Staff;Explosive Trap Rod;Explosive Trap Cane;Explosive Trap Staff;Sleepy Octopod;Ghastly Glaive;Etherian Goblin Bomber Banner;Etherian Goblin Banner;Old Ones Skeleton Banner;Drakin Banner;Kobold Glider Banner;Kobold Banner;Wither Beast Banner;Etherian Wyvern Banner;Etherian Javelin Thrower Banner;Etherian Lightning Bug Banner;;;;;;Tome of Infinite Wisdom;ItemName.BoringBow;Phantom Phoenix;Gato Egg;Creeper Egg;Dragon Egg;Sky Dragons Fury;Aerial Bane;Treasure Bag (Betsy);;;Betsy Mask;Dark Mage Mask;Ogre Mask;Betsy Trophy;Dark Mage Trophy;Ogre Trophy;Music Box (Old Ones Army);Betsys Wrath;Valhalla Knights Helm;Valhalla Knights Breastplate;Valhalla Knights Greaves;Dark Artists Hat;Dark Artists Robes;Dark Artists Leggings;Red Riding Hood;Red Riding Dress;Red Riding Leggings;Shinobi Infiltrators Helmet;Shinobi Infiltrators Torso;Shinobi Infiltrators Pants;Betsys Wings;Crystal Chest;Golden Chest;Trapped Crystal Chest;Trapped Golden Chest;Crystal Door;Crystal Chair;Crystal Candle;Crystal Lantern;Crystal Lamp;Crystal Candelabra;Crystal Chandelier;Crystal Bathtub;Crystal Sink;Crystal Bed;Crystal Clock;Sunplate Clock;Blue Dungeon Clock;Green Dungeon Clock;Pink Dungeon Clock;Crystal Platform;Golden Platform;Dynasty Wood Platform;Lihzahrd Platform;Flesh Platform;Frozen Platform;Crystal Work Bench;Golden Work Bench;Crystal Dresser;Dynasty Dresser;Frozen Dresser;Living Wood Dresser;Crystal Piano;Dynasty Piano;Crystal Bookcase;Crystal Sofa;Dynasty Sofa;Crystal Table;Arkhalis Hood;Arkhalis Bodice;Arkhalis Tights;Arkhalis Lightwings;Leinfors Hair Protector;Leinfors Excessive Style;Leinfors Fancypants;Leinfors Prehensile Cloak;Leinfors Luxury Shampoo;Celebration Mk2;Spider Bathtub;Spider Bed;Spider Bookcase;Spider Dresser;Spider Candelabra;Spider Candle;Spider Chair;Spider Chandelier;Spider Chest;Spider Clock;Spider Door;Spider Lamp;Spider Lantern;Spider Piano;Spider Platform;Spider Sink;Spider Sofa;Spider Table;Spider Work Bench;Trapped Spider Chest;Iron Brick;Iron Brick Wall;Lead Brick;Lead Brick Wall;Lesion Block;Lesion Block Wall;Lesion Platform;Lesion Bathtub;Lesion Bed;Lesion Bookcase;Lesion Candelabra;Lesion Candle;Lesion Chair;Lesion Chandelier;Lesion Chest;Lesion Clock;Lesion Door;Lesion Dresser;Lesion Lamp;Lesion Lantern;Lesion Piano;Lesion Sink;Lesion Sofa;Lesion Table;Lesion Work Bench;Trapped Lesion Chest;Hat Rack;;Pearlwood Crate;Mythril Crate;Titanium Crate;Defiled Crate;Hematic Crate;Stockade Crate;Azure Crate;Divine Crate;Bramble Crate;Dead Mans Chest;Golf Ball;Amphibian Boots;Arcane Flower;Berserkers Glove;Fairy Boots;Frog Flipper;Frog Gear;Frog Webbing;Frozen Shield;Hero Shield;Magma Skull;Magnet Flower;Mana Cloak;Molten Quiver;Molten Skull Rose;Obsidian Skull Rose;Recon Scope;Stalkers Quiver;Stinger Necklace;Ultrabright Helmet;Apple;;Apple Pie;Banana Split;BBQ Ribs;Bunny Stew;Burger;Chicken Nugget;Chocolate Chip Cookie;Cream Soda;Escargot;Fried Egg;Fries;Golden Delight;Grapes;Grilled Squirrel;Hotdog;Ice Cream;Milkshake;Nachos;Pizza;Potato Chips;Roasted Bird;Roasted Duck;Sauteed Frog Legs;Seafood Dinner;Shrimp Po Boy;Spaghetti;Steak;Molten Charm;Golf Club (Iron);Golf Cup;Blue Flower Seeds;Magenta Flower Seeds;Pink Flower Seeds;Red Flower Seeds;Yellow Flower Seeds;Violet Flower Seeds;White Flower Seeds;Tall Grass Seeds;Lawn Mower;Crimstone Brick;Smooth Sandstone;Crimstone Brick Wall;Smooth Sandstone Wall;Blood Moon Monolith;Dunerider Boots;Ancient Chisel;Rain Song;;Fossil Pickaxe;Super Star Shooter;Storm Spear;Thunder Zapper;Drum Set;Picnic Table;Fancy Picnic Table;Desert Minecart;Minecarp;Pink Fairy;Green Fairy;Blue Fairy;Junonia Shell;Lightning Whelk Shell;Tulip Shell;Pin Wheel;Weather Vane;Void Vault;Music Box (Ocean Night);Music Box (Slime Rain);Music Box (Space Day);Music Box (Town Day);Music Box (Town Night);Music Box (Windy Day);White Pin Flag;Red Pin Flag;Green Pin Flag;Blue Pin Flag;Yellow Pin Flag;Purple Pin Flag;Golf Tee;Shell Pile;Anti-Portal Block;Golf Club (Putter);Golf Club (Wedge);Golf Club (Driver);Golf Whistle;Ebonwood Toilet;Rich Mahogany Toilet;Pearlwood Toilet;Living Wood Toilet;Cactus Toilet;Bone Toilet;Flesh Toilet;Mushroom Toilet;Skyware Toilet;Shadewood Toilet;Lihzahrd Toilet;Blue Dungeon Toilet;Green Dungeon Toilet;Pink Dungeon Toilet;Obsidian Toilet;Frozen Toilet;Glass Toilet;Honey Toilet;Steampunk Toilet;Pumpkin Toilet;Spooky Toilet;Dynasty Toilet;Palm Wood Toilet;Boreal Wood Toilet;Slime Toilet;Martian Toilet;Granite Toilet;Marble Toilet;Crystal Toilet;Spider Toilet;Lesion Toilet;Diamond Toilet;Maid Bonnet;Maid Dress;Maid Shoes;Void Bag;Pink Maid Bonnet;Pink Maid Dress;Pink Maid Shoes;Country Club Cap;Country Club Vest;Country Club Trousers;Country Club Visor;Spider Nest Block;Spider Nest Wall;Meteor Toilet;Decay Chamber;ManaCloakStar;Terragrim;Solar Bathtub;Solar Bed;Solar Bookcase;Solar Dresser;Solar Candelabra;Solar Candle;Solar Chair;Solar Chandelier;Solar Chest;Solar Clock;Solar Door;Solar Lamp;Solar Lantern;Solar Piano;Solar Platform;Solar Sink;Solar Sofa;Solar Table;Solar Work Bench;Trapped Solar Chest;Solar Toilet;Vortex Bathtub;Vortex Bed;Vortex Bookcase;Vortex Dresser;Vortex Candelabra;Vortex Candle;Vortex Chair;Vortex Chandelier;Vortex Chest;Vortex Clock;Vortex Door;Vortex Lamp;Vortex Lantern;Vortex Piano;Vortex Platform;Vortex Sink;Vortex Sofa;Vortex Table;Vortex Work Bench;Trapped Vortex Chest;Vortex Toilet;Nebula Bathtub;Nebula Bed;Nebula Bookcase;Nebula Dresser;Nebula Candelabra;Nebula Candle;Nebula Chair;Nebula Chandelier;Nebula Chest;Nebula Clock;Nebula Door;Nebula Lamp;Nebula Lantern;Nebula Piano;Nebula Platform;Nebula Sink;Nebula Sofa;Nebula Table;Nebula Work Bench;Trapped Nebula Chest;Nebula Toilet;Stardust Bathtub;Stardust Bed;Stardust Bookcase;Stardust Dresser;Stardust Candelabra;Stardust Candle;Stardust Chair;Stardust Chandelier;Stardust Chest;Stardust Clock;Stardust Door;Stardust Lamp;Stardust Lantern;Stardust Piano;Stardust Platform;Stardust Sink;Stardust Sofa;Stardust Table;Stardust Work Bench;Trapped Stardust Chest;Stardust Toilet;Solar Brick;Vortex Brick;Nebula Brick;Stardust Brick;Solar Brick Wall;Vortex Brick Wall;Nebula Brick Wall;Stardust Brick Wall;Music Box (Day Remix);Cracked Blue Brick;Cracked Green Brick;Cracked Pink Brick;Wild Flower Seeds;Black Golf Ball;Blue Golf Ball;Brown Golf Ball;Cyan Golf Ball;Green Golf Ball;Lime Golf Ball;Orange Golf Ball;Pink Golf Ball;Purple Golf Ball;Red Golf Ball;Sky Blue Golf Ball;Teal Golf Ball;Violet Golf Ball;Yellow Golf Ball;Amber Robe;Amber Hook;Orange Phaseblade;Orange Phasesaber;Orange Stained Glass;Orange Pressure Plate;Snake Charmers Flute;Magic Conch;Golf Cart Keys;Golf Chest;Trapped Golf Chest;Sandstone Chest;Trapped Sandstone Chest;Sanguine Staff;Blood Thorn;Bloody Tear;Drippler Crippler;Vampire Frog Staff;Gold Goldfish;Gold Fish Bowl;Bast Statue;Gold Starry Block;Blue Starry Block;Gold Starry Wall;Blue Starry Wall;Finch Staff;Apricot;Banana;Blackcurrant;Blood Orange;Cherry;Coconut;Dragon Fruit;Elderberry;Grapefruit;Lemon;Mango;Peach;Pineapple;Plum;Rambutan;Star Fruit;Sandstone Bathtub;Sandstone Bed;Sandstone Bookcase;Sandstone Dresser;Sandstone Candelabra;Sandstone Candle;Sandstone Chair;Sandstone Chandelier;Sandstone Clock;Sandstone Door;Sandstone Lamp;Sandstone Lantern;Sandstone Piano;Sandstone Platform;Sandstone Sink;Sandstone Sofa;Sandstone Table;Sandstone Work Bench;Sandstone Toilet;Haemorrhaxe;Void Monolith;Arrow Sign;Painted Arrow Sign;Master Gamers Jacket;Master Gamers Pants;Star Princess Crown;Star Princess Dress;Chum Caster;Plate;Black Dragonfly Jar;Blue Dragonfly Jar;Green Dragonfly Jar;Orange Dragonfly Jar;Red Dragonfly Jar;Yellow Dragonfly Jar;Gold Dragonfly Jar;Black Dragonfly;Blue Dragonfly;Green Dragonfly;Orange Dragonfly;Red Dragonfly;Yellow Dragonfly;Gold Dragonfly;Step Stool;Dragonfly Statue;Paper Airplane;White Paper Airplane;Can Of Worms;Encumbering Stone;Gray Zapinator;Orange Zapinator;Green Moss;Brown Moss;Red Moss;Blue Moss;Purple Moss;Lava Moss;Boulder Statue;Music Box (Journeys Beginning);Music Box (Storm);Music Box (Graveyard);Seagull;Seagull Statue;Ladybug;Gold Ladybug;Maggot;Maggot Cage;Celestial Wand;Eucalyptus Sap;Blue Kite;Blue and Yellow Kite;Red Kite;Red and Yellow Kite;Yellow Kite;Ivy;Pupfish;Grebe;Rat;Rat Cage;Krypton Moss;Xenon Moss;Wyvern Kite;Ladybug Cage;Blood Rain Bow;Advanced Combat Techniques;Desert Torch;Coral Torch;Corrupt Torch;Crimson Torch;Hallowed Torch;Jungle Torch;Argon Moss;Rolling Cactus;Thin Ice;Echo Block;Scarab Fish;Scorpio Fish;Owl;Owl Cage;Owl Statue;Pupfish Bowl;Gold Ladybug Cage;Geode;Flounder;Rock Lobster;Lobster Tail;Inner Tube;Frozen Crate;Boreal Crate;Oasis Crate;Mirage Crate;Spectre Goggles;Oyster;Shucked Oyster;White Pearl;Black Pearl;Pink Pearl;Stone Door;Stone Platform;Oasis Water Fountain;Water Strider;Gold Water Strider;Lawn Flamingo;Music Box (Underground Jungle);Grate;Scarab Bomb;Wrought Iron Fence;Shark Bait;Bee Minecart;Ladybug Minecart;Pigron Minecart;Sunflower Minecart;Potted Forest Cedar;Potted Jungle Cedar;Potted Hallow Cedar;Potted Forest Tree;Potted Jungle Tree;Potted Hallow Tree;Potted Forest Palm;Potted Jungle Palm;Potted Hallow Palm;Potted Forest Bamboo;Potted Jungle Bamboo;Potted Hallow Bamboo;Scarab Fishing Rod;Demonic Hellcart;Witchs Broom;Cluster Rocket I;Cluster Rocket II;Wet Rocket;Lava Rocket;Honey Rocket;Shroom Minecart;Amethyst Minecart;Topaz Minecart;Sapphire Minecart;Emerald Minecart;Ruby Minecart;Diamond Minecart;Mini Nuke I;Mini Nuke II;Dry Rocket;Sandcastle Bucket;Turtle Cage;Jungle Turtle Cage;Gladius;Turtle;Jungle Turtle;Turtle Statue;Amber Minecart;Beetle Minecart;Meowmere Minecart;Party Wagon;The Dutchman;Steampunk Minecart;Grebe Cage;Seagull Cage;Water Strider Cage;Gold Water Strider Cage;Lesser Luck Potion;Luck Potion;Greater Luck Potion;Seahorse;Seahorse Cage;Gold Seahorse;Gold Seahorse Cage;1/2 Second Timer;1/4 Second Timer;Ebonstone Wall;Mud Wall;Pearlstone Wall;Snow Wall;Amethyst Stone Wall;Topaz Stone Wall;Sapphire Stone Wall;Emerald Stone Wall;Ruby Stone Wall;Diamond Stone Wall;Green Mossy Wall;Brown Mossy Wall;Red Mossy Wall;Blue Mossy Wall;Purple Mossy Wall;Rocky Dirt Wall;Old Stone Wall;Spider Wall;Corrupt Grass Wall;Hallowed Grass Wall;Ice Wall;Obsidian Wall;Crimson Grass Wall;Crimstone Wall;Cave Dirt Wall;Rough Dirt Wall;Craggy Stone Wall;Corrupt Growth Wall;Corrupt Mass Wall;Corrupt Pustule Wall;Corrupt Tendril Wall;Crimson Crust Wall;Crimson Scab Wall;Crimson Teeth Wall;Crimson Blister Wall;Layered Dirt Wall;Crumbling Dirt Wall;Cracked Dirt Wall;Wavy Dirt Wall;Hallowed Prism Wall;Hallowed Cavern Wall;Hallowed Shard Wall;Hallowed Crystalline Wall;Lichen Stone Wall;Leafy Jungle Wall;Ivy Stone Wall;Jungle Vine Wall;Ember Wall;Cinder Wall;Magma Wall;Smouldering Stone Wall;Worn Stone Wall;Stalactite Stone Wall;Mottled Stone Wall;Fractured Stone Wall;The Bride Banner;Zombie Merman Banner;Wandering Eye Fish Banner;Blood Squid Banner;Blood Eel Banner;Hemogoblin Shark Banner;Large Bamboo;Large Bamboo Wall;Demon Horns;Bamboo Leaf;Slice of Hell Cake;Fog Machine;Plasma Lamp;Marble Column;Chef Hat;Chef Uniform;Chef Pants;Star Hairpin;Heart Hairpin;Bunny Ears;Devil Horns;Fedora;Fake Unicorn Horn;Bamboo;Bamboo Wall;Bamboo Bathtub;Bamboo Bed;Bamboo Bookcase;Bamboo Dresser;Bamboo Candelabra;Bamboo Candle;Bamboo Chair;Bamboo Chandelier;Bamboo Chest;Bamboo Clock;Bamboo Door;Bamboo Lamp;Bamboo Lantern;Bamboo Piano;Bamboo Platform;Bamboo Sink;Bamboo Sofa;Bamboo Table;Bamboo Work Bench;Trapped Bamboo Chest;Bamboo Toilet;Worn Golf Club (Iron);Worn Golf Club (Putter);Worn Golf Club (Wedge);Worn Golf Club (Driver);Fancy Golf Club (Iron);Fancy Golf Club (Putter);Fancy Golf Club (Wedge);Fancy Golf Club (Driver);Premium Golf Club (Iron);Premium Golf Club (Putter);Premium Golf Club (Wedge);Premium Golf Club (Driver);Bronze Golf Trophy;Silver Golf Trophy;Gold Golf Trophy;Dreadnautilus Banner;Birdie Rattle;Exotic Chew Toy;Bedazzled Nectar;Music Box (Jungle Night);Desert Tiger Staff;Chum Bucket;Garden Gnome;Bone Serpent Kite;World Feeder Kite;Bunny Kite;Pigron Kite;Apple Juice;Grape Juice;Lemonade;Frozen Banana Daiquiri;Peach Sangria;Piña Colada;Tropical Smoothie;Bloody Moscato;Smoothie of Darkness;Prismatic Punch;Fruit Juice;Fruit Salad;Andrew Sphinx;Watchful Antlion;Burning Spirit;Jaws of Death;The Sands of Slime;Snakes, I Hate Snakes;Life Above the Sand;Oasis;Prehistory Preserved;Ancient Tablet;Uluru;Visiting the Pyramids;Bandage Boy;Divine Eye;Amethyst Stone Block;Topaz Stone Block;Sapphire Stone Block;Emerald Stone Block;Ruby Stone Block;Diamond Stone Block;Amber Stone Block;Amber Stone Wall;Man Eater Kite;Blue Jellyfish Kite;Pink Jellyfish Kite;Shark Kite;Superhero Mask;Superhero Costume;Superhero Tights;Pink Fairy Jar;Green Fairy Jar;Blue Fairy Jar;The Rolling Greens;Study of a Ball at Rest;Fore!;The Duplicity of Reflections;Fogbound Dye;Bloodbath Dye;Pretty Pink Dress;Pretty Pink Stockings;Pretty Pink Ribbon;Bamboo Fence;Illuminant Coating;Sand Shark Kite;Corrupt Bunny Kite;Crimson Bunny Kite;Leather Whip;Drumstick;Goldfish Kite;Angry Trapper Kite;Koi Kite;Crawltipede Kite;Durendal;Morning Star;Dark Harvest;Spectrum Kite;Release Doves;Wandering Eye Kite;Unicorn Kite;Gravedigger Hat;Gravedigger Coat;Angry Dandelion Banner;Gnome Banner;Desert Campfire;Coral Campfire;Corrupt Campfire;Crimson Campfire;Hallowed Campfire;Jungle Campfire;Soul of Light in a Bottle;Soul of Night in a Bottle;Soul of Flight in a Bottle;Soul of Sight in a Bottle;Soul of Might in a Bottle;Soul of Fright in a Bottle;Mud Bud;Release Lantern;Quad-Barrel Shotgun;Funeral Hat;Funeral Coat;Funeral Pants;Tragic Umbrella;Victorian Goth Hat;Victorian Goth Dress;Tattered Wood Sign;Gravediggers Shovel;Desert Chest;Trapped Desert Chest;Desert Key;Stellar Tune;Mollusk Whistle;Boreal Beam;Rich Mahogany Beam;Granite Column;Sandstone Column;Mushroom Beam;;Nevermore;Reborn;Graveyard;Ghost Manifestation;Wicked Undead;Bloody Goblet;Still Life;Ghostars Infinity Eight;Terra Toilet;Ghostars Soul Jar;Ghostars Garb;Ghostars Tights;Ball O Fuse Wire;Full Moon Squeaky Toy;Ornate Shadow Key;Dr. Man Fly Mask;Dr. Man Flys Lab Coat;Butcher Mask;Butchers Bloodstained Apron;Butchers Bloodstained Pants;Football;Hunter Cloak;Coffin Minecart;Safemans Blanket Cape;Safemans Sunny Day;Safemans Sun Dress;Safemans Pink Leggings;FoodBarbarians Tattered Dragon Wings;FoodBarbarians Horned Helm;FoodBarbarians Wild Wolf Spaulders;FoodBarbarians Savage Greaves;Grox The Greats Wings;Grox The Greats Horned Cowl;Grox The Greats Chestplate;Grox The Greats Greaves;Blade Staff;Squirrel Hook;Sergeant United Shield;Rock Golem Head;Critter Shampoo;Digging Molecart;Shroomerang;Tree Globe;World Globe;Guide to Critter Companionship;Dog Ears;Dog Tail;Fox Ears;Fox Tail;Lizard Ears;Lizard Tail;Panda Ears;Bunny Tail;Fairy Glowstick;Lightning Carrot;Prismatic Dye;Mushroom Hat;Mushroom Vest;Mushroom Pants;Treasure Bag (Empress of Light);Empress of Light Trophy;Empress of Light Mask;Dusty Rawhide Saddle;Royal Gilded Saddle;Black Studded Saddle;Jousting Lance;Shadow Jousting Lance;Hallowed Jousting Lance;Pogo Stick;The Black Spot;Hexxed Branch;Toy Tank;Goat Skull;Dark Mages Tome;Royal Delight;Suspicious Grinning Eye;Writhing Remains;Brain in a Jar;Possessed Skull;Sparkling Honey;Deactivated Probe;Pair of Eyeballs;Robotic Skull;Plantera Seedling;Guardian Golem;Pork of the Sea;Tablet Fragment;Piece of Moon Squid;Jewel of Light;Pumpkin Scented Candle;Shrub Star;Frozen Crown;Cosmic Skateboard;Ogres Club;Betsys Egg;Combat Wrench;Demon Conch;Bottomless Lava Bucket;Lavaproof Bug Net;Flame Waker Boots;Empress Wings;Wet Bomb;Lava Bomb;Honey Bomb;Dry Bomb;Superheated Blood;Cat License;Dog License;Amethyst Squirrel;Topaz Squirrel;Sapphire Squirrel;Emerald Squirrel;Ruby Squirrel;Diamond Squirrel;Amber Squirrel;Amethyst Bunny;Topaz Bunny;Sapphire Bunny;Emerald Bunny;Ruby Bunny;Diamond Bunny;Amber Bunny;Hell Butterfly;Hell Butterfly Jar;Lavafly;Lavafly in a Bottle;Magma Snail;Magma Snail Cage;Topaz Gemcorn;Amethyst Gemcorn;Sapphire Gemcorn;Emerald Gemcorn;Ruby Gemcorn;Diamond Gemcorn;Amber Gemcorn;Hanging Pot;Hanging Daybloom;Hanging Moonglow;Hanging Waterleaf;Hanging Shiverthorn;Hanging Blinkroot;Hanging Corrupt Deathweed;Hanging Crimson Deathweed;Hanging Fireblossom;Hanging Brazier;Mini Volcano;Large Volcano;Potion of Return;Sakura Sapling;Lava Absorbant Sponge;Hallowed Hood;Hellfire Treads;Jungle Pylon;Forest Pylon;Obsidian Crate;Hellstone Crate;Obsidian Lock Box;Lava Serpent Bowl;Lavaproof Fishing Hook;Amethyst Bunny Cage;Topaz Bunny Cage;Sapphire Bunny Cage;Emerald Bunny Cage;Ruby Bunny Cage;Diamond Bunny Cage;Amber Bunny Cage;Amethyst Squirrel Cage;Topaz Squirrel Cage;Sapphire Squirrel Cage;Emerald Squirrel Cage;Ruby Squirrel Cage;Diamond Squirrel Cage;Amber Squirrel Cage;Ancient Hallowed Mask;Ancient Hallowed Helmet;Ancient Hallowed Headgear;Ancient Hallowed Hood;Ancient Hallowed Plate Mail;Ancient Hallowed Greaves;Potted Magma Palm;Potted Brimstone Bush;Potted Fire Brambles;Potted Lava Bulb;Potted Ember Tendrils;Yellow Willow Sapling;Dirt Bomb;Sticky Dirt Bomb;Bunny License;Cool Whip;Firecracker;Snapthorn;Kaleidoscope;Tungsten Bullet;Hallow Pylon;Cavern Pylon;Ocean Pylon;Desert Pylon;Snow Pylon;Mushroom Pylon;Cavern Water Fountain;Starlight;Eye of Cthulhu Relic;Eater of Worlds Relic;Brain of Cthulhu Relic;Skeletron Relic;Queen Bee Relic;King Slime Relic;Wall of Flesh Relic;Twins Relic;Destroyer Relic;Skeletron Prime Relic;Plantera Relic;Golem Relic;Duke Fishron Relic;Lunatic Cultist Relic;Moon Lord Relic;Martian Saucer Relic;Flying Dutchman Relic;Mourning Wood Relic;Pumpking Relic;Ice Queen Relic;Everscream Relic;Santa-NK1 Relic;Dark Mage Relic;Ogre Relic;Betsy Relic;Empress of Light Relic;Queen Slime Relic;Universal Pylon;Nightglow;Eventide;Celestial Starboard;Rabbit Perch;Zenith;Treasure Bag (Queen Slime);Queen Slime Trophy;Queen Slime Mask;Regal Delicacy;Prismatic Lacewing;Stone Accent Slab;Truffle Worm Cage;Prismatic Lacewing Jar;Rock Golem Banner;Blood Mummy Banner;Spore Skeleton Banner;Spore Bat Banner;Antlion Larva Banner;Vicious Bunny Banner;Vicious Goldfish Banner;Vicious Penguin Banner;Corrupt Mimic Banner;Crimson Mimic Banner;Hallowed Mimic Banner;Moss Hornet Banner;Wandering Eye Banner;Fledgling Wings;Music Box (Queen Slime);Hook of Dissonance;Gelatinous Pillion;Crystal Assassin Hood;Crystal Assassin Shirt;Crystal Assassin Pants;Music Box (Empress Of Light);Sparkle Slime Balloon;Volatile Gelatin;Gelatin Crystal;Soaring Insignia;Music Box (Duke Fishron);Music Box (Morning Rain);Music Box (Alt Title);Chippys Couch;Blue Graduation Cap;Maroon Graduation Cap;Black Graduation Cap;Blue Graduation Gown;Maroon Graduation Gown;Black Graduation Gown;Terraspark Boots;Moon Lord Legs;Ocean Crate;Seaside Crate;Badgers Hat;Terraprisma;Music Box (Underground Desert);Dead Mans Sweater;Teapot;Teacup;Treasure Magnet;Mace;Flaming Mace;;Otherworldly Music Box (Rain);Otherworldly Music Box (Overworld Day);Otherworldly Music Box (Night);Otherworldly Music Box (Underground);Otherworldly Music Box (Desert);Otherworldly Music Box (Ocean);Otherworldly Music Box (Mushrooms);Otherworldly Music Box (Dungeon);Otherworldly Music Box (Space);Otherworldly Music Box (Underworld);Otherworldly Music Box (Snow);Otherworldly Music Box (Corruption);Otherworldly Music Box (Underground Corruption);Otherworldly Music Box (Crimson);Otherworldly Music Box (Underground Crimson);Otherworldly Music Box (Ice);Otherworldly Music Box (Underground Hallow);Otherworldly Music Box (Eerie);Otherworldly Music Box (Boss 2);Otherworldly Music Box (Boss 1);Otherworldly Music Box (Invasion);Otherworldly Music Box (The Towers);Otherworldly Music Box (Lunar Boss);Otherworldly Music Box (Plantera);Otherworldly Music Box (Jungle);Otherworldly Music Box (Wall of Flesh);Otherworldly Music Box (Hallow);Carton of Milk;Coffee;Torch Gods Favor;Music Box (Journeys End);Plaguebringers Skull;Plaguebringers Cloak;Plaguebringers Treads;Wandering Jingasa;Wandering Yukata;Wandering Geta;Timeless Travelers Hood;Timeless Travelers Cloak;Timeless Travelers Footwear;Floret Protector Helmet;Floret Protector Shirt;Floret Protector Pants;Capricorn Helmet;Capricorn Chestplate;Capricorn Hooves;Capricorn Tail;Video Visage;Lazer Blazer;Pinstripe Pants;Lavaproof Tackle Bag;Resonance Scepter;Bee Hive;Antlion Eggs;Flinx Fur Coat;Flinx Staff;Flinx Fur;Royal Tiara;Royal Blouse;Royal Dress;Spinal Tap;Rainbow Cursor;Royal Scepter;Glass Slipper;Prince Uniform;Prince Pants;Prince Cape;Potted Crystal Fern;Potted Crystal Spiral;Potted Crystal Teardrop;Potted Crystal Tree;Princess 64;Painting of a Lass;Dark Side of the Hallow;Bernies Button;Glommers Flower;Deerclops Eyeball;Monster Meat;Monster Lasagna;Froggle Bunwich;Tentacle Spike;Lucy the Axe;Ham Bat;Bat Bat;Eye Bone;Garland;Bone Helm;Eyebrella;Gentlemans Vest;Gentlemans Trousers;Gentlemans Beard;Gentlemans Long Beard;Gentlemans Magnificent Beard;Magiluminescence;Deerclops Trophy;Deerclops Mask;Deerclops Relic;Treasure Bag (Deerclops);Music Box (Deerclops);Radio Thing;Abigails Flower;Firestarters Sweater;Firestarters Skirt;Pew-matic Horn;Weather Pain;Houndius Shootius;Deer Thing;The Gentleman Scientist;The Firestarter;The Bereaved;The Strongman;Fart Kart;Hand Of Creation;Neon Moss;Helium Moss;Flymeal;Liliths Necklace;Resplendent Dessert;Stinkbug;Stinkbug Cage;Terraformer;Venom Dart Trap;Vulkelf Ears;Stinkbug Blocker;Ghostly Stinkbug Blocker;Fishing Bobber;Glowing Fishing Bobber;Lava Moss Fishing Bobber;Krypton Moss Fishing Bobber;Xenon Moss Fishing Bobber;Argon Moss Fishing Bobber;Neon Moss Fishing Bobber;Helium Moss Fishing Bobber;Wand of Frosting;Reef Bathtub;Reef Bed;Reef Bookcase;Reef Dresser;Reef Candelabra;Reef Candle;Reef Chair;Reef Chandelier;Reef Chest;Reef Clock;Reef Door;Reef Lamp;Reef Lantern;Reef Piano;Reef Platform;Reef Sink;Reef Sofa;Reef Table;Reef Work Bench;Trapped Reef Chest;Reef Toilet;Balloon Bathtub;Balloon Bed;Balloon Bookcase;Balloon Dresser;Balloon Candelabra;Balloon Candle;Balloon Chair;Balloon Chandelier;Balloon Chest;Balloon Clock;Balloon Door;Balloon Lamp;Balloon Lantern;Balloon Piano;Balloon Platform;Balloon Sink;Balloon Sofa;Balloon Table;Balloon Work Bench;Trapped Balloon Chest;Balloon Toilet;Ash Wood Bathtub;Ash Wood Bed;Ash Wood Bookcase;Ash Wood Dresser;Ash Wood Candelabra;Ash Wood Candle;Ash Wood Chair;Ash Wood Chandelier;Ash Wood Chest;Ash Wood Clock;Ash Wood Door;Ash Wood Lamp;Ash Wood Lantern;Ash Wood Piano;Ash Wood Platform;Ash Wood Sink;Ash Wood Sofa;Ash Wood Table;Ash Wood Work Bench;Trapped Ash Wood Chest;Ash Wood Toilet;Biome Sight Potion;Scarlet Macaw;Scarlet Macaw Cage;Ash Grass Seeds;Ash Wood;Ash Wood Wall;Ash Wood Fence;Outcast;Fairy Guides;A Horrible Night for Alchemy;Morning Hunt;Suspiciously Sparkly;Requiem;Cat Sword;Kargohs Summon;High Pitch;A Machine for Terrarians;Terra Blade Chronicles;Benny Warhol;Lizard King;My Son;Duality;Parsec Pals;Remnants of Devotion;Not So Lost In Paradise;Ocular Resonance;Wings of Evil;Constellation;Eyezorhead;Dread of the Red Sea;Do Not Eat the Vile Mushroom!;Yuuma, The Blue Tiger;Moonman & Company;Sunshine of Israpony;Purity;Sufficiently Advanced;Strange Growth;Happy Little Tree;Strange Dead Fellows;Secrets;Thunderbolt;Crustography;The Werewolf;Blessing from the Heavens;Love is in the Trash Slot;Fangs;Hail to the King;See The World For What It Is;What Lurks Below;This Is Getting Out Of Hand;Buddies;Midnight Sun;Couch Gag;Silent Fish;The Duke;Royal Romance;Bioluminescence;Wildflowers;Viking Voyage;Bifrost;Heartlands;Forest Troll;Aurora Borealis;Lady Of The Lake;Joja Cola;Stardrop;Spicy Pepper;Pomegranate;Ash Wood Helmet;Ash Wood Breastplate;Ash Wood Greaves;Ash Wood Bow;Ash Wood Hammer;Ash Wood Sword;Moon Globe;Repaired Life Crystal;Repaired Mana Crystal;Terra Fart Kart;Minecart Upgrade Kit;Jims Cap;Echo Wall;Echo Platform;Mushroom Torch;Hive-Five;Axe of Regrowth;Chlorophyte Extractinator;Blue Chicken Egg;Trimarang;Mushroom Campfire;Blue Macaw;Blue Macaw Cage;Bottomless Honey Bucket;Honey Absorbant Sponge;Ultra Absorbant Sponge;Goblorc Ears;Reef Block;Reef Wall;r/Terraria;Guide to Environmental Preservation;Princess Style;Toucan;Yellow Cockatiel;Gray Cockatiel;Toucan Cage;Yellow Cockatiel Cage;Gray Cockatiel Cage;Macaw Statue;Toucan Statue;Cockatiel Statue;Decorative Healing Potion;Decorative Mana Potion;Shadow Candle;Guide to Peaceful Coexistence;Rubblemaker (Small);Closed Void Bag;Artisan Loaf;TNT Barrel;Chest Lock;Rubblemaker (Medium);Rubblemaker (Large);Bundle of Horseshoe Balloons;Spiffo Plush;Glow Tulip;Ocrams Razor;Rod of Harmony;Advanced Combat Techniques: Volume Two;Vital Crystal;Aegis Fruit;Arcane Crystal;Galaxy Pearl;Gummy Worm;Ambrosia;Peddlers Satchel;Echo Coating;Echo Chamber;Gas Trap;Aether Monolith;Shimmer Arrow;Aetherium Block;Faeling;Faeling in a Bottle;Shimmer Slime Banner;Aether Torch;Reflective Shades;Chromatic Cloak;Used Gas Trap;Aether Campfire;Shellphone (Home);Shellphone (Spawn);Shellphone (Ocean);Shellphone (Underworld);Music Box (Aether);Infested Spider Wall;Bottomless Shimmer Bucket;Cursed Blue Brick Wall;Cursed Blue Slab Wall;Cursed Blue Tiled Wall;Cursed Pink Brick Wall;Cursed Pink Slab Wall;Cursed Pink Tiled Wall;Cursed Green Brick Wall;Cursed Green Slab Wall;Cursed Green Tiled Wall;Treacherous Sandstone Wall;Treacherous Hardened Sand Wall;Forbidden Lihzahrd Brick Wall;Spelunker Flare;Cursed Flare;Rainbow Flare;Shimmer Flare;Enchanted Moondial;Waffles Iron;Bouncy Boulder;Life Crystal Boulder;Dizzys Rare Gecko Chester;Raynebros Hoodie;Raynebros Pants;Eye of the Sun;Cheesy Pizza Poster;Raynebros Hood;Uncumbering Stone;Yellow Solution;White Solution;Brown Solution;Poo;Poo Wall;Aetherium Wall;Aetherium Brick;Aetherium Brick Wall;The Dirtiest Block;Lunar Rust Brick;Dark Celestial Brick;Astra Brick;Cosmic Ember Brick;Cryocore Brick;Mercury Brick;Star Royale Brick;Heavenforge Brick;Lunar Rust Brick Wall;Dark Celestial Brick Wall;Astra Brick Wall;Cosmic Ember Brick Wall;Cryocore Brick Wall;Mercury Brick Wall;Star Royale Brick Wall;Heavenforge Brick Wall;Ancient Blue Brick;Ancient Blue Brick Wall;Ancient Green Brick;Ancient Green Brick Wall;Ancient Pink Brick;Ancient Pink Brick Wall;Ancient Gold Brick;Ancient Gold Brick Wall;Ancient Silver Brick;Ancient Silver Brick Wall;Ancient Copper Brick;Ancient Copper Brick Wall;Ancient Cobalt Brick;Ancient Cobalt Brick Wall;Ancient Mythril Brick;Ancient Mythril Brick Wall;Ancient Obsidian Brick;Ancient Obsidian Brick Wall;Ancient Hellstone Brick;Ancient Hellstone Brick Wall;Shellphone;Fertilizer;Lava Moss Brick;Argon Moss Brick;Krypton Moss Brick;Xenon Moss Brick;Neon Moss Brick;Helium Moss Brick;Lava Moss Brick Wall;Argon Moss Brick Wall;Krypton Moss Brick Wall;Xenon Moss Brick Wall;Neon Moss Brick Wall;Helium Moss Brick Wall;Kwad Racer Drone;FPV Goggles".split(";");
terra_data_TdItem.pid = "None;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;FieryGreatsword;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;MudstoneBlock;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;Wrench;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;MusicBoxOverworldDay;MusicBoxEerie;MusicBoxNight;MusicBoxTitle;MusicBoxUnderground;MusicBoxBoss1;MusicBoxJungle;MusicBoxCorruption;MusicBoxUndergroundCorruption;MusicBoxTheHallow;MusicBoxBoss2;MusicBoxUndergroundHallow;MusicBoxBoss3;;;;;;;;;Timer1Second;Timer3Second;Timer5Second;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;IceChest;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;EskimoHood;EskimoCoat;EskimoPants;;;;;;;;;;;;;;;;;;GhostWings;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;PinkEskimoHood;PinkEskimoCoat;PinkEskimoPants;;;;;;;;;;;;;;;BlendOMatic;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;FlameAndBlackDye;;GreenFlameAndBlackDye;;BlueFlameAndBlackDye;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;PurpleMucos;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;Vertebrae;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;DiablostLamp;OilRagSconse;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;FrozenChest;;;;;;;;;;;;;;;;;;;;;SDMG;;;;;;;;;;;;;;;;;;;;;;;;;;;DTownsHelmet;DTownsBreastplate;DTownsLeggings;DTownsWings;;;;;;;;;;;;;MusicBoxSnow;MusicBoxSpace;MusicBoxCrimson;MusicBoxBoss4;MusicBoxAltOverworldDay;MusicBoxRain;MusicBoxIce;MusicBoxDesert;MusicBoxOcean;MusicBoxDungeon;MusicBoxPlantera;MusicBoxBoss5;MusicBoxTemple;MusicBoxEclipse;MusicBoxMushrooms;;;;;;;;;;;BatBanner;;;;;;;;;;;;;;;;;;;;;;ZombieEskimoBanner;;;;;;;;;;;;;;;;;;;;;;JellyfishBanner;;;;;;;;;;;PirateBanner;;;;;;SkeletonMageBanner;SlimeBanner;;SpiderBanner;;;TortoiseBanner;;;;;;NypmhBanner;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;PrincessDressNew;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;SpookyPlatform;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;FartInABalloon;;;;;;;;;;;;;;;;WhiteAndRedGarland;RedGardland;RedAndGreenGardland;GreenGardland;GreenAndWhiteGarland;;;;;RedAndGreenBulb;YellowAndGreenBulb;RedAndYellowBulb;;WhiteAndRedBulb;WhiteAndYellowBulb;WhiteAndGreenBulb;;;;;;RedAndYellowLights;RedAndGreenLights;YellowAndGreenLights;BlueAndGreenLights;RedAndBlueLights;BlueAndYellowLights;;;;;;;;;;;;CnadyCanePickaxe;;;;;;;;;;;;;;;MrsClauseHat;MrsClauseShirt;MrsClauseHeels;;;;;;;;;;;;;;;;;;;;;;;;;BabyGrinchMischiefWhistle;;SantaNK1Trophy;;MusicBoxPumpkinMoon;MusicBoxAltUnderground;MusicBoxFrostMoon;;;;;;;;;;;;;;;;;;;;;;;;Womannquin;;;;;;;;;;;;;;;;;;;FancyGreyWallpaper;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;BrainMask;FleshMask;;;BeeMask;;;EaterMask;EyeMask;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;FleshCloningVaat;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;DynastyChandelier;;;DynastyCandelabra;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;SteampunkCup;;;;;;;;;;;;;;;;;;;;;GypsyRobe;;;;;;;;;;;;;;;;;SittingDucksFishingRod;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;TrapsightPotion;;;;;;;;;FishingSeaweed;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;TheFishofCthulu;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;ShipInABottle;;PressureTrack;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;SkywareWorkbench;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;AmberGemsparkWallOff;;AmethystGemsparkWallOff;;DiamondGemsparkWallOff;;EmeraldGemsparkWallOff;;RubyGemsparkWallOff;;SapphireGemsparkWallOff;;TopazGemsparkWallOff;;;;;;;ConfettiBlockBlack;ConfettiWallBlack;;;;AlphabetStatue0;AlphabetStatue1;AlphabetStatue2;AlphabetStatue3;AlphabetStatue4;AlphabetStatue5;AlphabetStatue6;AlphabetStatue7;AlphabetStatue8;AlphabetStatue9;AlphabetStatueA;AlphabetStatueB;AlphabetStatueC;AlphabetStatueD;AlphabetStatueE;AlphabetStatueF;AlphabetStatueG;AlphabetStatueH;AlphabetStatueI;AlphabetStatueJ;AlphabetStatueK;AlphabetStatueL;AlphabetStatueM;AlphabetStatueN;AlphabetStatueO;AlphabetStatueP;AlphabetStatueQ;AlphabetStatueR;AlphabetStatueS;AlphabetStatueT;AlphabetStatueU;AlphabetStatueV;AlphabetStatueW;AlphabetStatueX;AlphabetStatueY;AlphabetStatueZ;;;;;MusicBoxUndergroundCrimson;;;;;;;;;;;;;;;;;;;;;;;;LunarTabletFragment;;;;;;None;None;;None;;None;None;;None;;None;None;;None;;;;;;;;;;;;;;LaserRuler;AntiGravityHook;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;WhiteLunaticHood;BlueLunaticHood;WhiteLunaticRobe;BlueLunaticRobe;;;;;MartianArmorDye;PaintingCastleMarsberg;PaintingMartiaLisa;PaintingTheTruthIsUpThere;;;;;;;;BrownAndBlackDye;;BrownAndSilverDye;;;;None;;;;;;;BeesKnees;;;;;;;;;;;;;;BlueCultistCasterBanner;;;;;;;;;;;;DiablolistBanner;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;MartianGreyGruntBanner;;MartianRaygunnerBanner;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;SparkyPainting;;;;;;;;;;;SoulDrain;;;;;;;;;;;;;;;;;;DevDye;;;;;;;BottomlessBucket;;;;;;;;;;MushroomDye;;;MusicBoxLunarBoss;;;;;;;;ShadowFlameBow;ShadowFlameHexDoll;ShadowFlameKnife;PaintingAcorns;PaintingColdSnap;PaintingCursedSaint;PaintingSnowfellas;PaintingTheSeason;;;;;Sundial;;MarbleBlock;;CordageGuide;;;;GoldButterflyCage;;;;;;;;;Marble;;MarbleBlockWall;;LockBox;Granite;GraniteBlock;;GraniteBlockWall;;NightKey;LightKey;;;;;EoCShield;;;;;;;;;;;;;;;;;;;;;;;FishermansGuide;;REK;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;TsunamiInABottle;;CorruptFishingCrate;CrimsonFishingCrate;DungeonFishingCrate;FloatingIslandFishingCrate;HallowedFishingCrate;JungleFishingCrate;;;;;;;DayBloomPlanterBox;;CorruptPlanterBox;CrimsonPlanterBox;;;;FireBlossomPlanterBox;BrainOfConfusion;;;BejeweledValkyrieHead;BejeweledValkyrieBody;BejeweledValkyrieWing;RichGravestone1;RichGravestone2;RichGravestone3;RichGravestone4;RichGravestone5;;MusicBoxMartians;MusicBoxPirates;MusicBoxHell;;Trapdoor;;;TaxCollectorHat;TaxCollectorSuit;TaxCollectorPants;;ClothierJacket;ClothierPants;DyeTraderTurban;;BalloonHorseshoeFart;BalloonHorseshoeHoney;BalloonHorseshoeSharkron;;CageEnchantedNightcrawler;CageBuggy;CageGrubby;CageSluggy;;;;;;;BuccaneerShirt;BuccaneerPants;ObsidianHelm;ObsidianShirt;;;;Sandstone;HardenedSand;;CorruptHardenedSand;CrimsonHardenedSand;CorruptSandstone;CrimsonSandstone;WoodYoyo;CorruptYoyo;CrimsonYoyo;JungleYoyo;;;;;;RedsYoyo;;;HelFire;;TheEyeOfCthulhu;;;;;;;;;;;;;;;;;;;;;;;FormatC;;;KingSlimeBossBag;EyeOfCthulhuBossBag;EaterOfWorldsBossBag;BrainOfCthulhuBossBag;QueenBeeBossBag;SkeletronBossBag;WallOfFleshBossBag;DestroyerBossBag;TwinsBossBag;SkeletronPrimeBossBag;PlanteraBossBag;GolemBossBag;FishronBossBag;CultistBossBag;MoonLordBossBag;HiveBackpack;YoYoGlove;;;;HallowHardenedSand;HallowSandstone;;CorruptHardenedSandWall;CrimsonHardenedSandWall;HallowHardenedSandWall;CorruptSandstoneWall;CrimsonSandstoneWall;HallowSandstoneWall;;;DyeTradersScimitar;PainterPaintballGun;TaxCollectorsStickOfDoom;StylistKilLaKillScissorsIWish;MinecartMech;;;;AncientCultistTrophy;;;;LivingMahoganyLeafWand;;;;;;;;;MusicBoxTowers;MusicBoxGoblins;BossMaskCultist;BossMaskMoonlord;FossilHelm;FossilShirt;FossilPants;;;BoneDagger;FossilOre;;StardustBreastplate;;;StrangePlant1;StrangePlant2;StrangePlant3;StrangePlant4;;;;;;;;DrManFlyBanner;;;;;;;;;;GreekSkeletonBanner;GraniteFlyerBanner;;;;;;FlyingAntlionBanner;WalkingAntlionBanner;DesertGhoulBanner;DesertLamiaBanner;DesertDjinnBanner;DesertBasiliskBanner;RavagerScorpionBanner;StardustSoldierBanner;StardustWormBanner;StardustJellyfishBanner;StardustSpiderBanner;StardustSmallCellBanner;StardustLargeCellBanner;SolarCoriteBanner;SolarSrollerBanner;SolarCrawltipedeBanner;SolarDrakomireRiderBanner;SolarDrakomireBanner;SolarSolenianBanner;NebulaSoldierBanner;NebulaHeadcrabBanner;NebulaBrainBanner;NebulaBeastBanner;VortexLarvaBanner;VortexHornetQueenBanner;VortexHornetBanner;VortexSoldierBanner;VortexRiflemanBanner;;;;;;;;;;;;;NebulaPickup1;NebulaPickup2;NebulaPickup3;FragmentVortex;FragmentNebula;FragmentSolar;FragmentStardust;LunarOre;LunarBrick;None;None;;None;;LunarBar;WingsSolar;WingsVortex;WingsNebula;WingsStardust;LunarBrickWall;;;;;;TheBrideHat;TheBrideDress;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;LunarHamaxeSolar;LunarHamaxeVortex;LunarHamaxeNebula;LunarHamaxeStardust;;;;;;;;;;ShiftingPearlSandsDye;;;;;;;;DayBreak;;;FireworksLauncher;;PartyGirlGrenade;LunarCraftingStation;FlameAndSilverDye;GreenFlameAndSilverDye;BlueFlameAndSilverDye;;;;;BlackAndWhiteDye;;SilverAndBlackDye;;;;SquirrelRed;SquirrelGold;SquirrelOrangeCage;SquirrelGoldCage;MoonlordBullet;MoonlordArrow;MoonlordTurretStaff;LunarFlareBook;;;LunarBlockSolar;LunarBlockVortex;LunarBlockNebula;LunarBlockStardust;;Yoraiz0rShirt;Yoraiz0rPants;Yoraiz0rWings;Yoraiz0rDarkness;;Yoraiz0rHead;;SkiphsHelm;SkiphsShirt;SkiphsPants;SkiphsWings;LokisHelm;LokisShirt;LokisPants;;;;;MoonLordPainting;;;;;;LogicGateLamp_Off;LogicGate_AND;LogicGate_OR;LogicGate_NAND;LogicGate_NOR;LogicGate_XOR;LogicGate_NXOR;ConveyorBeltLeft;ConveyorBeltRight;WireKite;;LogicSensor_Sun;LogicSensor_Moon;LogicSensor_Above;WirePipe;;LogicGateLamp_On;;;TeamBlockRed;TeamBlockRedPlatform;;ActuationAccessory;;WeightedPressurePlatePink;;;;WeightedPressurePlateOrange;WeightedPressurePlatePurple;WeightedPressurePlateCyan;TeamBlockGreen;TeamBlockBlue;TeamBlockYellow;TeamBlockPink;TeamBlockWhite;TeamBlockGreenPlatform;TeamBlockBluePlatform;TeamBlockYellowPlatform;TeamBlockPinkPlatform;TeamBlockWhitePlatform;;GemLockRuby;GemLockSapphire;GemLockEmerald;GemLockTopaz;GemLockAmethyst;GemLockDiamond;GemLockAmber;;;;;;;;;;;;;LogicGateLamp_Faulty;;Fake_Chest;Fake_GoldChest;Fake_ShadowChest;Fake_EbonwoodChest;Fake_RichMahoganyChest;Fake_PearlwoodChest;Fake_IvyChest;Fake_IceChest;Fake_LivingWoodChest;Fake_SkywareChest;Fake_ShadewoodChest;Fake_WebCoveredChest;Fake_LihzahrdChest;Fake_WaterChest;Fake_JungleChest;Fake_CorruptionChest;Fake_CrimsonChest;Fake_HallowedChest;Fake_FrozenChest;Fake_DynastyChest;Fake_HoneyChest;Fake_SteampunkChest;Fake_PalmWoodChest;Fake_MushroomChest;Fake_BorealWoodChest;Fake_SlimeChest;Fake_GreenDungeonChest;Fake_PinkDungeonChest;Fake_BlueDungeonChest;Fake_BoneChest;Fake_CactusChest;Fake_FleshChest;Fake_ObsidianChest;Fake_PumpkinChest;Fake_SpookyChest;Fake_GlassChest;Fake_MartianChest;Fake_MeteoriteChest;Fake_GraniteChest;Fake_MarbleChest;Fake_newchest1;Fake_newchest2;ProjectilePressurePad;;;;;;;;;;;;ZombieArmStatue;;;GeyserTrap;UltraBrightCampfire;;;LogicSensor_Water;LogicSensor_Lava;LogicSensor_Honey;LogicSensor_Liquid;PartyBundleOfBalloonsAccessory;PartyBalloonAnimal;;FlowerBoyHat;FlowerBoyShirt;FlowerBoyPants;SillyBalloonPink;SillyBalloonPurple;SillyBalloonGreen;SillyStreamerBlue;SillyStreamerGreen;SillyStreamerPink;;SillyBalloonTiedPink;SillyBalloonTiedPurple;SillyBalloonTiedGreen;;PartyMonolith;PartyBundleOfBalloonTile;;SliceOfCake;;SandFallWall;SnowFallWall;SandFallBlock;SnowFallBlock;SnowCloudBlock;PedguinHat;PedguinShirt;PedguinPants;SillyBalloonPinkWall;SillyBalloonPurpleWall;SillyBalloonGreenWall;AviatorSunglasses;;;;;;;;;AntlionClaw;AncientArmorHat;AncientArmorShirt;AncientArmorPants;AncientBattleArmorHat;AncientBattleArmorShirt;AncientBattleArmorPants;;;;;AncientBattleArmorMaterial;LamiaPants;LamiaShirt;LamiaHat;;;SandsharkBanner;SandsharkCorruptBanner;SandsharkCrimsonBanner;SandsharkHallowedBanner;TumbleweedBanner;;DjinnLamp;MusicBoxSandstorm;ApprenticeHat;ApprenticeRobe;ApprenticeTrousers;SquireGreatHelm;SquirePlating;SquireGreaves;HuntressWig;HuntressJerkin;HuntressPants;MonkBrows;MonkShirt;MonkPants;ApprenticeScarf;SquireShield;HuntressBuckler;MonkBelt;;;;DD2ElderCrystalStand;;DD2FlameburstTowerT1Popper;DD2FlameburstTowerT2Popper;DD2FlameburstTowerT3Popper;AleThrowingGlove;DD2EnergyCrystal;DD2SquireDemonSword;DD2BallistraTowerT1Popper;DD2BallistraTowerT2Popper;DD2BallistraTowerT3Popper;DD2SquireBetsySword;DD2ElderCrystal;DD2LightningAuraT1Popper;DD2LightningAuraT2Popper;DD2LightningAuraT3Popper;DD2ExplosiveTrapT1Popper;DD2ExplosiveTrapT2Popper;DD2ExplosiveTrapT3Popper;MonkStaffT1;MonkStaffT2;DD2GoblinBomberBanner;DD2GoblinBanner;DD2SkeletonBanner;DD2DrakinBanner;DD2KoboldFlyerBanner;DD2KoboldBanner;DD2WitherBeastBanner;DD2WyvernBanner;DD2JavelinThrowerBanner;DD2LightningBugBanner;None;None;None;None;None;BookStaff;BoringBow;DD2PhoenixBow;DD2PetGato;DD2PetGhost;DD2PetDragon;MonkStaffT3;DD2BetsyBow;BossBagBetsy;None;None;BossMaskBetsy;BossMaskDarkMage;BossMaskOgre;BossTrophyBetsy;BossTrophyDarkmage;BossTrophyOgre;MusicBoxDD2;ApprenticeStaffT3;SquireAltHead;SquireAltShirt;SquireAltPants;ApprenticeAltHead;ApprenticeAltShirt;ApprenticeAltPants;HuntressAltHead;HuntressAltShirt;HuntressAltPants;MonkAltHead;MonkAltShirt;MonkAltPants;BetsyWings;;;Fake_CrystalChest;Fake_GoldenChest;;;;;;;;;;;;SkywareClock2;DungeonClockBlue;DungeonClockGreen;DungeonClockPink;;;DynastyPlatform;;;;CrystalWorkbench;GoldenWorkbench;;;;;;;CrystalBookCase;CrystalSofaHowDoesThatEvenWork;;;ArkhalisHat;ArkhalisShirt;ArkhalisPants;ArkhalisWings;LeinforsHat;LeinforsShirt;LeinforsPants;LeinforsWings;LeinforsAccessory;Celeb2;;;;;;;;;;;;;;;;SpiderSinkSpiderSinkDoesWhateverASpiderSinkDoes;;;SpiderWorkbench;Fake_SpiderChest;;;;;;;;;;;;;;;;;;;;;;;;;LesionWorkbench;Fake_LesionChest;;None;WoodenCrateHard;IronCrateHard;GoldenCrateHard;CorruptFishingCrateHard;CrimsonFishingCrateHard;DungeonFishingCrateHard;FloatingIslandFishingCrateHard;HallowedFishingCrateHard;JungleFishingCrateHard;;;;;BerserkerGlove;;;;;;;LavaSkull;;;;;;;;;;;None;;;;;;;;;;;;;;;;;;;;;;;;;;;;;GolfClubIron;;FlowerPacketBlue;FlowerPacketMagenta;FlowerPacketPink;FlowerPacketRed;FlowerPacketYellow;FlowerPacketViolet;FlowerPacketWhite;FlowerPacketTallGrass;;;;;;;SandBoots;;CarbonGuitar;None;;SuperStarCannon;ThunderSpear;ThunderStaff;;;PicnicTableWithCloth;;FishMinecart;FairyCritterPink;FairyCritterGreen;FairyCritterBlue;;;;;;;MusicBoxOceanAlt;MusicBoxSlimeRain;MusicBoxSpaceAlt;MusicBoxTownDay;MusicBoxTownNight;MusicBoxWindyDay;GolfCupFlagWhite;GolfCupFlagRed;GolfCupFlagGreen;GolfCupFlagBlue;GolfCupFlagYellow;GolfCupFlagPurple;;ShellPileBlock;AntiPortalBlock;GolfClubPutter;GolfClubWedge;GolfClubDriver;;ToiletEbonyWood;ToiletRichMahogany;ToiletPearlwood;ToiletLivingWood;ToiletCactus;ToiletBone;ToiletFlesh;ToiletMushroom;ToiletSunplate;ToiletShadewood;ToiletLihzhard;ToiletDungeonBlue;ToiletDungeonGreen;ToiletDungeonPink;ToiletObsidian;ToiletFrozen;ToiletGlass;ToiletHoney;ToiletSteampunk;ToiletPumpkin;ToiletSpooky;ToiletDynasty;ToiletPalm;ToiletBoreal;ToiletSlime;ToiletMartian;ToiletGranite;ToiletMarble;ToiletCrystal;ToiletSpider;ToiletLesion;ToiletDiamond;MaidHead;MaidShirt;MaidPants;VoidLens;MaidHead2;MaidShirt2;MaidPants2;GolfHat;GolfShirt;GolfPants;GolfVisor;SpiderBlock;SpiderWall;ToiletMeteor;LesionStation;;;;;;;;;;;;;;;;;;;;;SolarWorkbench;Fake_SolarChest;;;;;;;;;;;;;;;;;;;;VortexWorkbench;Fake_VortexChest;;;;;;;;;;;;;;;;;;;;NebulaWorkbench;Fake_NebulaChest;;;;;;;;;;;;;;;;;;;;StardustWorkbench;Fake_StardustChest;;;;;;;;;;MusicBoxDayRemix;;;;FlowerPacketWild;GolfBallDyedBlack;GolfBallDyedBlue;GolfBallDyedBrown;GolfBallDyedCyan;GolfBallDyedGreen;GolfBallDyedLimeGreen;GolfBallDyedOrange;GolfBallDyedPink;GolfBallDyedPurple;GolfBallDyedRed;GolfBallDyedSkyBlue;GolfBallDyedTeal;GolfBallDyedViolet;GolfBallDyedYellow;;;;;;;MysticCoilSnake;;GolfCart;;Fake_GolfChest;DesertChest;Fake_DesertChest;;SharpTears;BloodMoonStarter;DripplerFlail;;;GoldGoldfishBowl;CatBast;GoldStarryGlassBlock;BlueStarryGlassBlock;GoldStarryGlassWall;BlueStarryGlassWall;BabyBirdStaff;;;BlackCurrant;;;;Dragonfruit;;;;;;;;;Starfruit;;;;;;;;;;;;;;;;;;SandstoneWorkbench;;BloodHamaxe;;;;GameMasterShirt;GameMasterPants;;;BloodFishingRod;FoodPlatter;;;;;;;;;;;;;;;PortableStool;;PaperAirplaneA;PaperAirplaneB;;;ZapinatorGray;ZapinatorOrange;;;;;;;;MusicBoxTitleAlt;MusicBoxStorm;MusicBoxGraveyard;;;LadyBug;GoldLadyBug;;;;EucaluptusSap;KiteBlue;KiteBlueAndYellow;KiteRed;KiteRedAndYellow;KiteYellow;IvyGuitar;;;;;;;KiteWyvern;;;CombatBook;;;;;;;;;;;;;;;;;;;;;;FloatingTube;;FrozenCrateHard;;OasisCrateHard;;;;;;;;;OasisFountain;;;;MusicBoxUndergroundJungle;;;;;;;;;;;;;;;;;;;;;;HellMinecart;WitchBroom;;;;;;;;;;;;;;;;;;TurtleJungleCage;;;TurtleJungle;;;;;PartyMinecart;PirateMinecart;;;;;;LuckPotionLesser;;LuckPotionGreater;;;;;TimerOneHalfSecond;TimerOneFourthSecond;EbonstoneEcho;MudWallEcho;PearlstoneEcho;SnowWallEcho;AmethystEcho;TopazEcho;SapphireEcho;EmeraldEcho;RubyEcho;DiamondEcho;Cave1Echo;Cave2Echo;Cave3Echo;Cave4Echo;Cave5Echo;Cave6Echo;Cave7Echo;SpiderEcho;CorruptGrassEcho;HallowedGrassEcho;IceEcho;ObsidianBackEcho;CrimsonGrassEcho;CrimstoneEcho;CaveWall1Echo;CaveWall2Echo;Cave8Echo;Corruption1Echo;Corruption2Echo;Corruption3Echo;Corruption4Echo;Crimson1Echo;Crimson2Echo;Crimson3Echo;Crimson4Echo;Dirt1Echo;Dirt2Echo;Dirt3Echo;Dirt4Echo;Hallow1Echo;Hallow2Echo;Hallow3Echo;Hallow4Echo;Jungle1Echo;Jungle2Echo;Jungle3Echo;Jungle4Echo;Lava1Echo;Lava2Echo;Lava3Echo;Lava4Echo;Rocks1Echo;Rocks2Echo;Rocks3Echo;Rocks4Echo;;;EyeballFlyingFishBanner;;;GoblinSharkBanner;LargeBambooBlock;LargeBambooBlockWall;;;HellCake;;;;;ChefShirt;;;;;;;UnicornHornHat;BambooBlock;BambooBlockWall;;;;;;;;;;;;;;;;;;;BambooWorkbench;Fake_BambooChest;;GolfClubStoneIron;GolfClubRustyPutter;GolfClubBronzeWedge;GolfClubWoodDriver;GolfClubMythrilIron;GolfClubLeadPutter;GolfClubGoldWedge;GolfClubPearlwoodDriver;GolfClubTitaniumIron;GolfClubShroomitePutter;GolfClubDiamondWedge;GolfClubChlorophyteDriver;GolfTrophyBronze;GolfTrophySilver;GolfTrophyGold;BloodNautilusBanner;;ExoticEasternChewToy;;MusicBoxJungleNight;StormTigerStaff;;;KiteBoneSerpent;KiteWorldFeeder;KiteBunny;KitePigron;;;;BananaDaiquiri;;PinaColada;;;;;;;;;;JawsOfDeath;TheSandsOfSlime;SnakesIHateSnakes;LifeAboveTheSand;;;;;VisitingThePyramids;;;;;;;;;;AmberStoneWallEcho;KiteManEater;KiteJellyfishBlue;KiteJellyfishPink;KiteShark;SuperHeroMask;SuperHeroCostume;SuperHeroTights;;;;GolfPainting1;GolfPainting2;GolfPainting3;GolfPainting4;;;PrettyPinkDressSkirt;PrettyPinkDressPants;;;GlowPaint;KiteSandShark;KiteBunnyCorrupt;KiteBunnyCrimson;BlandWhip;DrumStick;KiteGoldfish;KiteAngryTrapper;KiteKoi;KiteCrawltipede;SwordWhip;MaceWhip;ScytheWhip;KiteSpectrum;;KiteWanderingEye;KiteUnicorn;UndertakerHat;UndertakerCoat;DandelionBanner;;;;;;;;SoulBottleLight;SoulBottleNight;SoulBottleFlight;SoulBottleSight;SoulBottleMight;SoulBottleFright;;;QuadBarrelShotgun;;;;;;;;GravediggerShovel;DungeonDesertChest;Fake_DungeonDesertChest;DungeonDesertKey;SparkleGuitar;;;;;;;None;;;;;;;;GhostarsWings;;GhostarSkullPin;GhostarShirt;GhostarPants;BallOfFuseWire;;;DrManFlyMask;DrManFlyLabCoat;;ButcherApron;ButcherPants;;;;SafemanWings;SafemanSunHair;SafemanSunDress;SafemanDressLeggings;FoodBarbarianWings;FoodBarbarianHelm;FoodBarbarianArmor;FoodBarbarianGreaves;GroxTheGreatWings;GroxTheGreatHelm;GroxTheGreatArmor;GroxTheGreatGreaves;Smolstar;;BouncingShield;;;DiggingMoleMinecart;;;;DontHurtCrittersBook;;;;;;;;;;;HallowBossDye;;;;FairyQueenBossBag;FairyQueenTrophy;FairyQueenMask;PaintedHorseSaddle;MajesticHorseSaddle;DarkHorseSaddle;;;HallowJoustingLance;;PirateShipMountItem;SpookyWoodMountItem;SantankMountItem;WallOfFleshGoatMountItem;DarkMageBookMountItem;KingSlimePetItem;EyeOfCthulhuPetItem;EaterOfWorldsPetItem;BrainOfCthulhuPetItem;SkeletronPetItem;QueenBeePetItem;DestroyerPetItem;TwinsPetItem;SkeletronPrimePetItem;PlanteraPetItem;GolemPetItem;DukeFishronPetItem;LunaticCultistPetItem;MoonLordPetItem;FairyQueenPetItem;PumpkingPetItem;EverscreamPetItem;IceQueenPetItem;MartianPetItem;DD2OgrePetItem;DD2BetsyPetItem;;;;FireproofBugNet;;RainbowWings;;;;;;LicenseCat;LicenseDog;GemSquirrelAmethyst;GemSquirrelTopaz;GemSquirrelSapphire;GemSquirrelEmerald;GemSquirrelRuby;GemSquirrelDiamond;GemSquirrelAmber;GemBunnyAmethyst;GemBunnyTopaz;GemBunnySapphire;GemBunnyEmerald;GemBunnyRuby;GemBunnyDiamond;GemBunnyAmber;;;;;;;GemTreeTopazSeed;GemTreeAmethystSeed;GemTreeSapphireSeed;GemTreeEmeraldSeed;GemTreeRubySeed;GemTreeDiamondSeed;GemTreeAmberSeed;PotSuspended;PotSuspendedDaybloom;PotSuspendedMoonglow;PotSuspendedWaterleaf;PotSuspendedShiverthorn;PotSuspendedBlinkroot;PotSuspendedDeathweedCorrupt;PotSuspendedDeathweedCrimson;PotSuspendedFireblossom;BrazierSuspended;VolcanoSmall;VolcanoLarge;PotionOfReturn;VanityTreeSakuraSeed;;;;TeleportationPylonJungle;TeleportationPylonPurity;LavaCrate;LavaCrateHard;ObsidianLockbox;LavaFishbowl;LavaFishingHook;;;;;;;;;;;;;;;;;;;;;PottedLavaPlantPalm;PottedLavaPlantBush;PottedLavaPlantBramble;PottedLavaPlantBulb;PottedLavaPlantTendrils;VanityTreeYellowWillowSeed;;DirtStickyBomb;LicenseBunny;;FireWhip;ThornWhip;RainbowWhip;;TeleportationPylonHallow;TeleportationPylonUnderground;TeleportationPylonOcean;TeleportationPylonDesert;TeleportationPylonSnow;TeleportationPylonMushroom;CavernFountain;PiercingStarlight;EyeofCthulhuMasterTrophy;EaterofWorldsMasterTrophy;BrainofCthulhuMasterTrophy;SkeletronMasterTrophy;QueenBeeMasterTrophy;KingSlimeMasterTrophy;WallofFleshMasterTrophy;TwinsMasterTrophy;DestroyerMasterTrophy;SkeletronPrimeMasterTrophy;PlanteraMasterTrophy;GolemMasterTrophy;DukeFishronMasterTrophy;LunaticCultistMasterTrophy;MoonLordMasterTrophy;UFOMasterTrophy;FlyingDutchmanMasterTrophy;MourningWoodMasterTrophy;PumpkingMasterTrophy;IceQueenMasterTrophy;EverscreamMasterTrophy;SantankMasterTrophy;DarkMageMasterTrophy;OgreMasterTrophy;BetsyMasterTrophy;FairyQueenMasterTrophy;QueenSlimeMasterTrophy;TeleportationPylonVictory;FairyQueenMagicItem;FairyQueenRangedItem;LongRainbowTrailWings;RabbitOrder;;QueenSlimeBossBag;;;QueenSlimePetItem;EmpressButterfly;AccentSlab;;EmpressButterflyJar;;;;;LarvaeAntlionBanner;CrimsonBunnyBanner;CrimsonGoldfishBanner;CrimsonPenguinBanner;BigMimicCorruptionBanner;BigMimicCrimsonBanner;BigMimicHallowBanner;;;CreativeWings;MusicBoxQueenSlime;QueenSlimeHook;QueenSlimeMountSaddle;CrystalNinjaHelmet;CrystalNinjaChestplate;CrystalNinjaLeggings;MusicBoxEmpressOfLight;GelBalloon;;QueenSlimeCrystal;EmpressFlightBooster;MusicBoxDukeFishron;MusicBoxMorningRain;MusicBoxConsoleTitle;;GraduationCapBlue;GraduationCapMaroon;GraduationCapBlack;GraduationGownBlue;GraduationGownMaroon;GraduationGownBlack;;;;OceanCrateHard;;EmpressBlade;MusicBoxUndergroundDesert;;TeaKettle;;;;;None;MusicBoxOWRain;MusicBoxOWDay;MusicBoxOWNight;MusicBoxOWUnderground;MusicBoxOWDesert;MusicBoxOWOcean;MusicBoxOWMushroom;MusicBoxOWDungeon;MusicBoxOWSpace;MusicBoxOWUnderworld;MusicBoxOWSnow;MusicBoxOWCorruption;MusicBoxOWUndergroundCorruption;MusicBoxOWCrimson;MusicBoxOWUndergroundCrimson;MusicBoxOWUndergroundSnow;MusicBoxOWUndergroundHallow;MusicBoxOWBloodMoon;MusicBoxOWBoss2;MusicBoxOWBoss1;MusicBoxOWInvasion;MusicBoxOWTowers;MusicBoxOWMoonLord;MusicBoxOWPlantera;MusicBoxOWJungle;MusicBoxOWWallOfFlesh;MusicBoxOWHallow;MilkCarton;CoffeeCup;;MusicBoxCredits;PlaguebringerHelmet;PlaguebringerChestplate;PlaguebringerGreaves;RoninHat;RoninShirt;RoninPants;TimelessTravelerHood;TimelessTravelerRobe;TimelessTravelerBottom;;FloretProtectorChestplate;FloretProtectorLegs;CapricornMask;;CapricornLegs;;TVHeadMask;TVHeadSuit;TVHeadPants;;PrincessWeapon;;;;;;;RoyalDressTop;RoyalDressBottom;BoneWhip;;;;;;;PottedCrystalPlantFern;PottedCrystalPlantSpiral;PottedCrystalPlantTeardrop;PottedCrystalPlantTree;;PaintingOfALass;DarkSideHallow;BerniePetItem;GlommerPetItem;DeerclopsPetItem;PigPetItem;;;;LucyTheAxe;;;ChesterPetItem;GarlandHat;;;WilsonShirt;WilsonPants;WilsonBeardShort;WilsonBeardLong;WilsonBeardMagnificent;;;;DeerclopsMasterTrophy;DeerclopsBossBag;MusicBoxDeerclops;DontStarveShaderItem;;WillowShirt;WillowSkirt;PewMaticHorn;;;;PaintingWilson;PaintingWillow;PaintingWendy;PaintingWolfgang;FartMinecart;;VioletMoss;RainbowMoss;;WolfMountItem;;;;Clentaminator2;;VulkelfEar;StinkbugHousingBlocker;StinkbugHousingBlockerEcho;;FishingBobberGlowingStar;FishingBobberGlowingLava;FishingBobberGlowingKrypton;FishingBobberGlowingXenon;FishingBobberGlowingArgon;FishingBobberGlowingViolet;FishingBobberGlowingRainbow;;CoralBathtub;CoralBed;CoralBookcase;CoralDresser;CoralCandelabra;CoralCandle;CoralChair;CoralChandelier;CoralChest;CoralClock;CoralDoor;CoralLamp;CoralLantern;CoralPiano;CoralPlatform;CoralSink;CoralSofa;CoralTable;CoralWorkbench;Fake_CoralChest;CoralToilet;;;;;;;;;;;;;;;;;;;BalloonWorkbench;Fake_BalloonChest;;;;;;;;;;;;;;;;;;;;AshWoodWorkbench;Fake_AshWoodChest;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;DoNotEattheVileMushroom;YuumaTheBlueTiger;MoonmanandCompany;;;;;;;;;;;BlessingfromTheHeavens;;;;;;;;;;;;;;;;;;;;;;JunimoPetItem;;;;;;;;;;;;TerraFartMinecart;MinecartPowerup;;;;;HiveFive;AcornAxe;;BlueEgg;;;;;;;;GoblorcEar;;;PlacePainting;DontHurtNatureBook;;;;;;;;;;;PlaceableHealingPotion;PlaceableManaPotion;;DontHurtComboBook;RubblemakerSmall;;;;;RubblemakerMedium;RubblemakerLarge;HorseshoeBundle;;;MechdusaSummon;RodOfHarmony;CombatBookVolumeTwo;AegisCrystal;;;;;;;;EchoMonolith;;ShimmerMonolith;;ShimmerBlock;Shimmerfly;ShimmerflyinaBottle;;ShimmerTorch;;ShimmerCloak;;ShimmerCampfire;Shellphone;ShellphoneSpawn;ShellphoneOcean;ShellphoneHell;MusicBoxShimmer;SpiderWallUnsafe;;BlueBrickWallUnsafe;BlueSlabWallUnsafe;BlueTiledWallUnsafe;PinkBrickWallUnsafe;PinkSlabWallUnsafe;PinkTiledWallUnsafe;GreenBrickWallUnsafe;GreenSlabWallUnsafe;GreenTiledWallUnsafe;SandstoneWallUnsafe;HardenedSandWallUnsafe;LihzahrdWallUnsafe;;;;;Moondial;WaffleIron;;;DizzyHat;LincolnsHoodie;LincolnsPants;SunOrnament;HoplitePizza;LincolnsHood;;SandSolution;SnowSolution;DirtSolution;PoopBlock;PoopWall;ShimmerWall;ShimmerBrick;ShimmerBrickWall;DirtiestBlock;;;;;;;;;;;;;;;;;AncientBlueDungeonBrick;AncientBlueDungeonBrickWall;AncientGreenDungeonBrick;AncientGreenDungeonBrickWall;AncientPinkDungeonBrick;AncientPinkDungeonBrickWall;;;;;;;;;;;;;;;ShellphoneDummy;;LavaMossBlock;ArgonMossBlock;KryptonMossBlock;XenonMossBlock;VioletMossBlock;RainbowMossBlock;LavaMossBlockWall;ArgonMossBlockWall;KryptonMossBlockWall;XenonMossBlockWall;VioletMossBlockWall;RainbowMossBlockWall;JimsDrone;JimsDroneVisor".split(";");
terra_data_TdItem.meta = "1;d1|d=5|t=20|k=2|tp=40|rg=1|z=2000;t|s=9999|rg=100;t|s=9999|rg=100;d1|d=12|t=20|k=5.5|rg=1|z=1800;c|s=9999|hl=15|t=17|rg=30|z=1250;d1|d=8|t=12|k=4|rg=1|z=1400;d1|d=7|t=30|k=5.5|th=40|rg=1|z=1600;t|s=9999|rg=100|1=Provides light|z=50;t|s=9999|rg=100;d1|d=5|t=27|k=4.5|tx=9|rg=1|z=1600;t|s=9999|rg=100|z=500;t|s=9999|rg=100|z=250;t|s=9999|rg=100|z=1500;t|s=9999|rg=100|z=750;a1|rg=1|1=Tells the time|z=1000;a1|rg=1|1=Tells the time|z=5000;a1|rg=1|1=Tells the time|z=10000;a1|rg=1|1=Displays depth|z=12500;t|s=9999|rg=25|z=6000;t|s=9999|rg=25|z=750;t|s=9999|rg=25|z=3000;t|s=9999|rg=25|z=1500;b|s=9999|rg=99|1=Both tasty and flammable|z=5;d1|d=7|t=20|k=5|rg=1|z=100;t|s=9999|rg=1|z=200;w|s=9999|rg=400;t|s=9999|rg=50|z=10;c|s=9999|hl=50|t=17|rg=30|z=300;c|s=9999|r=2|t=30|rg=10|1=Permanently increases maximum life by 20|z=75000;w|s=9999|rg=400;t|s=9999|rg=25|z=20;t|s=9999|rg=1|z=300;t|s=9999|rg=1|1=Used for smelting ore|z=300;t|s=9999|rg=1|z=150;t|s=9999|rg=1|1=Used to craft items from metal bars|z=5000;t|s=9999|rg=1|1=Used for basic crafting|z=150;41|D=1|rg=1|z=1000;|s=9999|rg=25|z=500;r1|d=4|t=30|rg=1|z=100;rb|s=9999|d=5|k=2|rg=99|z=5;rb|s=9999|d=7|k=2|rg=99|z=10;rc|s=9999|d=10|t=15|rg=99|z=15;c|s=9999|t=45|rg=3|1=Summons the Eye of Cthulhu;r1|d=14|t=25|k=1|rg=1|z=18000;d1|d=20|t=30|k=6|tx=15|rg=1|z=13500;d1|d=16|t=20|k=5|rg=1|z=13500;rb|s=9999|d=12|k=3|rg=99|z=40;t|s=9999|rg=1|z=500;a1|rg=1|1=Slowly regenerates life|z=50000;1|t=90|rg=1|1=Gaze in the mirror to return home|z=50000;rb|s=9999|d=10|k=4|rg=99|z=100;t|s=9999|rg=1|z=300;a1|rg=1|1=Allows the holder to double jump|z=50000;a1|rg=1|1=The wearer can run super fast|z=50000;d1|d=17|t=20|k=8|rg=1|z=50000;t|s=9999|rg=100|1=Pulsing with dark energy|z=5000;t|s=9999|rg=25|1=Pulsing with dark energy|z=15000;1;t|s=9999|rg=25|z=500;|s=9999|rg=25|z=50;t|s=9999|rg=100;t|s=9999|rg=25|z=20;t|s=9999|rg=5|z=5000;m1|d=10|t=28|k=1|m=10|rg=1|1=Summons a vile thorn|z=75000;d1|r=2|d=22|t=20|k=5|rg=1|1=Causes stars to rain from the sky|2=Forged with the fury of heaven|z=50000;c|s=9999|t=15|rg=99|1=Cleanses the evil|z=75;c|s=9999|t=15|rg=99|1=Spreads the Corruption|z=100;|s=9999|rg=25|1=Looks tasty!|z=10;|s=9999|rg=25|z=100;c|s=9999|t=45|rg=3|1=Summons the Eater of Worlds;rb|s=100|d=25|rg=100|z=5;rb|s=100|d=50|rg=100|z=500;rb|s=100|d=100|rg=100|z=50000;rb|s=9999|d=200|rg=100|z=5000000;b|s=9999|rg=50|1=Disappears after the sunrise|z=2500;61|D=1|rg=1|z=1000;61|D=2|rg=1|z=4000;61|D=3|rg=1|z=10000;61|D=4|rg=1|z=20000;51|D=2|rg=1|z=1250;51|D=3|rg=1|z=5000;51|D=4|rg=1|z=12500;51|D=5|rg=1|z=25000;1|t=20|k=7|rg=1|1=Get over here!|z=20000;t|s=9999|tr=3|rg=100|1=Can be climbed on|z=200;|s=9999|rg=25|z=500;t|s=9999|rg=1|1=Can be used to store your items|2=Stored items can only be accessed by you|z=10000;41|D=2|rg=1|1=Provides light when worn|z=40000;41|D=1|rg=1|z=750;41|D=2|rg=1|z=3000;41|D=3|rg=1|z=7500;41|D=4|rg=1|z=15000;w|s=9999|rg=400;t|s=9999|rg=200;r1|d=13|t=16|k=1|rg=1|z=50000;r1|c=7|d=31|t=32|k=5.25|rg=1|1=I have to be ready, said the minuteman|z=75000;rb|s=9999|d=7|k=2|rg=99|z=7;r1|r=2|d=6|t=8|rg=1|1=33% chance to not consume ammo|2=Half shark, half gun, completely awesome.|z=350000;r1|d=8|t=28|rg=1|z=1400;61|D=6|rg=1|1=5% increased critical strike chance|z=22500;51|D=7|rg=1|1=5% increased critical strike chance|z=30000;41|D=6|rg=1|1=5% increased critical strike chance|z=37500;d1|d=9|t=20|k=3|tp=65|rg=1|1=Able to mine Hellstone|z=18000;d1|d=24|t=45|k=6|th=55|rg=1|z=15000;t|s=9999|rg=1|z=1500;t|s=9999|rg=1|z=3000;t|s=9999|rg=1|z=12000;t|s=9999|rg=1|z=24000;c|s=9999|r=2|t=30|rg=10|1=Permanently increases maximum mana by 20|z=12500;c|s=9999|hm=50|t=17|rg=30|z=100;a1|rg=1|1=Increases maximum mana by 20|z=75000;m1|r=3|d=48|t=16|k=5.5|m=12|rg=1|1=Throws balls of fire|z=125000;m1|r=2|d=35|t=22|k=7.5|m=14|rg=1|1=Casts a controllable missile|z=87500;1|t=20|k=5|rg=1|1=Magically moves dirt|z=50000;1|t=20|rg=1|1=Creates a magical shadow orb|z=75000;t|s=9999|rg=100|z=1000;t|s=9999|rg=25|1=Warm to the touch|z=7000;|s=9999|rg=1|1=Sometimes dropped by Skeletons and Piranha|z=1000;d1|r=3|d=49|t=20|k=8|rg=1|z=100000;r1|r=3|d=31|t=22|k=2|rg=1|1=Lights wooden arrows ablaze|z=27000;d1|r=3|d=40|t=40|k=6.5|rg=1|1=Its made out of fire!|z=27000;d1|r=3|d=12|t=23|k=2|tp=100|rg=1|z=27000;41|D=5|rg=1|1=9% increased magic damage|z=45000;51|D=6|rg=1|1=9% increased magic damage|z=30000;61|D=5|rg=1|1=9% increased magic damage|z=30000;c|s=9999|hl=20|t=17|rg=30|z=20;m1|d=17|t=17|k=0.75|m=6|rg=1|z=20000;a1|r=3|rg=1|1=Allows flight|z=50000;t|s=9999|rg=100;w|s=9999|rg=400;t|s=9999|rg=100;w|s=9999|rg=400;t|s=9999|rg=100;t|s=9999|rg=100;w|s=9999|rg=400;t|s=9999|rg=1|z=150;t|s=9999|rg=100;w|s=9999|rg=400;t|s=9999|rg=100;w|s=9999|rg=400;t|s=9999|rg=100;w|s=9999|rg=400;t|s=9999|rg=100;w|s=9999|rg=400;t|s=9999|rg=100;w|s=9999|rg=400;t|s=9999|rg=100;t|s=9999|rg=1|1=Holding this may attract unwanted attention|z=500;t|s=9999|rg=25|1=It contains strange symbols|z=1500;t|s=9999|rg=50;41|r=2|D=6|rg=1|1=5% increased ranged damage|z=45000;51|r=2|D=7|rg=1|1=5% increased ranged damage|z=30000;61|r=2|D=6|rg=1|1=5% increased ranged damage|z=30000;rc|s=9999|d=20|t=12|k=2.3|rg=99|z=50;d1|r=2|d=24|t=18|k=3|rg=1|z=87500;a1|r=2|D=1|rg=1|1=Grants immunity to knockback|z=87500;m1|r=2|d=27|t=16|k=7|m=7|rg=1|1=Sprays out a shower of water|z=87500;a1|rg=1|1=Negates fall damage|2=Said to bring good fortune and keep evil spirits at bay|z=27000;a1|rg=1|1=Increases jump height|z=75000;r1|r=2|d=25|t=30|k=6|rg=1|z=27000;rc|s=9999|d=16|t=15|k=1|rg=99|z=80;d1|d=15|t=45|k=5.5|rg=1|z=75000;d1|r=2|d=27|t=45|k=6|rg=1|z=87500;r1|r=2|d=26|t=15|k=3|rg=1|z=87500;m1|r=2|d=19|t=17|k=5|m=10|rg=1|1=Casts a slow moving bolt of water|z=75000;c|s=9999|t=25|rg=99|1=A small explosion that will destroy most tiles|z=300;c|s=9999|t=40|rg=99|1=A large explosion that will destroy most tiles|z=2000;rc|s=9999|d=60|t=45|k=8|rg=99|1=A small explosion that will not destroy tiles|z=75;b|s=9999|rg=100;t|s=9999|rg=100;t|s=9999|rg=1;t|s=9999|rg=100;t|s=9999|rg=100;t|s=9999|r=2|rg=100|z=1250;t|s=9999|r=2|rg=25|1=Hot to the touch|z=20000;t|s=9999|rg=100;t|s=9999|rg=15|z=5625;t|s=9999|rg=15|z=11250;t|s=9999|rg=15|z=7500;t|s=9999|rg=15|z=3750;t|s=9999|rg=15|z=1875;t|s=9999|rg=15|z=15000;t|s=9999|rg=100|z=50;1;1|r=3|t=20|k=7|rg=1|z=20000;d1|d=10|t=27|k=4|rg=1|1=Increases breath time and allows breathing in water|z=10000;a1|rg=1|1=Grants the ability to swim|z=10000;c|s=9999|hl=100|t=17|rg=30|z=1000;c|s=9999|hm=100|t=17|rg=30|z=250;d1|r=3|d=18|t=20|k=4.5|rg=1|1=Has a chance to poison enemies|z=27000;d1|r=3|d=25|t=15|k=8|rg=1|z=50000;t|s=9999|rg=100;a1|r=2|D=1|rg=1|1=Grants immunity to fire blocks|z=27000;t|s=9999|rg=25|z=150;t|s=9999|rg=25|z=150;d1|d=2|t=37|k=5.5|th=25|rg=1|z=50;r1|r=2|d=55|t=12|k=3|rg=1|1=Shoots fallen stars|z=500000;d1|d=26|t=18|k=3|rg=1|z=27000;d1|d=26|t=18|k=3|rg=1|z=27000;d1|d=26|t=18|k=3|rg=1|z=27000;d1|d=26|t=18|k=3|rg=1|z=27000;d1|d=26|t=18|k=3|rg=1|z=27000;d1|d=26|t=18|k=3|rg=1|z=27000;d1|d=20|t=30|k=7|tx=20|th=60|rg=1|z=15000;4|s=9999|D=1|rg=1|1=Can be used to scoop up a small amount of liquid;|s=9999|t=15|rg=1|1=Contains a small amount of water|2=Can be poured out;|s=9999|t=15|rg=1|1=Contains a small amount of lava|2=Can be poured out;av1|rg=1|1=Its pretty, oh so pretty|z=100;|s=9999|rg=25|z=200;|s=9999|rg=5|z=1000;a1|r=3|rg=1|1=12% increased melee speed|2=Enables auto swing for melee weapons|z=50000;a1|r=3|rg=1|1=10% increased movement speed|z=50000;dt1|r=3|d=7|k=3|rg=1|1=Creates grass on dirt|2=Increases alchemy plant collection when used to gather|z=25000;t|s=9999|rg=100;1|r=2|t=30|rg=1|1=May annoy others|z=100;a1|D=1|rg=1|z=10000;d1|r=3|d=20|t=27|k=7|tx=30|th=70|rg=1|z=27000;m1|r=3|d=32|t=30|k=6.5|m=21|rg=1|1=Summons a controllable ball of fire|z=125000;r1|r=3|d=33|t=17|k=2|rg=1|z=175000;d1|r=3|c=7|d=32|t=45|k=6.75|rg=1|z=125000;t|s=9999|rg=1|z=3000;t|s=9999|rg=1|1=Grows plants|z=100;a1|r=3|rg=1|1=6% reduced mana usage|z=27000;t|s=9999|rg=1|z=2000;|s=9999|rg=25|z=1000;c|s=9999|hl=90|t=17|rg=30|1=Reduced potion cooldown|z=1500;c|s=9999|hl=90|t=17|rg=30|1=Reduced potion cooldown|z=1500;41|r=3|D=5|rg=1|1=Increases maximum mana by 40|2=6% increased magic critical strike chance|z=45000;51|r=3|D=6|rg=1|1=Increases maximum mana by 20|2=6% increased magic damage|z=30000;61|r=3|D=6|rg=1|1=Increases maximum mana by 20|2=6% increased magic critical strike chance|z=30000;41|r=3|D=8|rg=1|1=7% increased melee critical strike chance|z=45000;51|r=3|D=9|rg=1|1=7% increased melee damage|z=30000;61|r=3|D=8|rg=1|1=7% increased melee speed|z=30000;rb|s=9999|d=8|k=1|rg=99|z=8;c|s=9999|t=25|rg=99|1=A small explosion that will destroy most tiles|2=Tossing may be difficult.|z=500;|s=9999|rg=1|z=5000;4v1|r=2|rg=1|1=Makes you look cool!|z=10000;41|r=2|D=4|rg=1|1=5% increased magic damage|z=10000;4v1|rg=1|z=10000;5v1|rg=1|z=5000;6v1|rg=1|z=5000;4v1|rg=1|z=10000;4v1|rg=1|z=20000;4v1|rg=1|z=10000;5v1|rg=1|z=250000;6v1|rg=1|z=250000;4v1|rg=1|z=10000;5v1|rg=1|z=5000;6v1|rg=1|z=5000;4vt|s=9999|rg=1|z=10000;4v1|rg=1|z=10000;5v1|rg=1|z=5000;6v1|rg=1|z=5000;|s=9999|rg=5|z=10000;|s=9999|rg=5|z=2000;41|D=2|rg=1|1=3% increased critical strike chance|z=10000;51|D=4|rg=1|1=3% increased critical strike chance|z=5000;61|D=3|rg=1|1=3% increased critical strike chance|z=5000;|s=9999|rg=5|z=50;4v1|rg=1|1=It smells funny...|z=1000;c|s=9999|t=15|rg=5|1=Its smiling, might be a good snack|z=3750;5v1|rg=1|z=2000;4v1|rg=1|z=10000;4v1|rg=1|z=10000;rb|s=9999|r=2|d=13|k=8|rg=99|z=100;r1|r=2|d=30|t=16|k=5|rg=1|1=This is a good idea!|z=10000;a|s=9999|rg=1|1=You are a terrible person|z=1000;41|r=2|D=2|rg=1|1=Greatly extends underwater breathing|z=1000;v1|rg=1|z=10000;v1|rg=1|z=10000;v1|rg=1|z=10000;m1|r=3|d=35|t=20|k=5|m=14|rg=1|1=Casts a demon scythe|z=75000;d1|r=3|d=42|t=21|k=4.5|rg=1|z=200000;d1|r=3|d=34|t=22|k=5|rg=1|z=125000;t|s=9999|rg=25|z=1000;t|s=9999|rg=100|z=10;d1|d=14|t=31|k=6|rg=1|1=Increases mobility in water when held|2=Hold Up to descend slower|z=10000;rb|s=9999|d=9|k=3|rg=99|z=15;rc|s=9999|d=12|t=15|k=2|rg=99|z=50;d1|d=8|t=31|k=6.5|rg=1|z=1000;r1|d=9|t=25|k=3.5|rg=1|1=Allows the collection of seeds for ammo|z=10000;c|s=9999|t=15|rg=100|1=Works when wet|z=10;rb|s=9999|d=4|rg=99|1=For use with Blowpipe;d1|d=10|t=20|k=5|rg=1|z=10000;a1|rg=1|1=5% increased movement speed|z=25000;c|s=9999|t=15|rg=100|z=20;rc|s=9999|c=4|d=14|t=15|k=2.4|rg=99|z=60;c|s=9999|t=17|rg=20|1=Provides immunity to lava|z=1000;c|s=9999|t=17|rg=20|1=Provides life regeneration|z=1000;c|s=9999|t=17|rg=20|1=25% increased movement speed|z=1000;c|s=9999|t=17|rg=20|1=Breathe water instead of air|z=1000;c|s=9999|t=17|rg=20|1=Increase defense by 8|z=1000;c|s=9999|t=17|rg=20|1=Increased mana regeneration|z=1000;c|s=9999|t=17|rg=20|1=20% increased magic damage|z=1000;c|s=9999|t=17|rg=20|1=Slows falling speed|z=1000;c|s=9999|t=17|rg=20|1=Shows the location of treasure and ore|z=1000;c|s=9999|t=17|rg=20|1=Grants invisibility and lowers the spawn rate of enemies|z=1000;c|s=9999|t=17|rg=20|1=Emits an aura of light|z=1000;c|s=9999|t=17|rg=20|1=Increases night vision|z=1000;c|s=9999|t=17|rg=20|1=Increases enemy spawn rate|z=1000;c|s=9999|t=17|rg=20|1=Attackers also take damage|z=1000;c|s=9999|t=17|rg=20|1=Allows the ability to walk on water|z=1000;c|s=9999|t=17|rg=20|1=10% increased bow damage and 20% increased arrow speed|z=1000;c|s=9999|t=17|rg=20|1=Shows the location of enemies|z=1000;c|s=9999|t=17|rg=20|1=Allows the control of gravity|z=1000;t|s=9999|rg=1|z=5000;t|s=9999|rg=25|z=80;t|s=9999|rg=25|z=80;t|s=9999|rg=25|z=80;t|s=9999|rg=25|z=80;t|s=9999|rg=25|z=80;t|s=9999|rg=25|z=80;|s=9999|rg=25|z=100;|s=9999|rg=25|z=100;|s=9999|rg=25|z=100;|s=9999|rg=25|z=100;|s=9999|rg=25|z=100;|s=9999|rg=25|z=100;|s=9999|rg=25|z=200;|s=9999|rg=25|z=50;t|s=9999|rg=2;4v1|rg=1|z=20000;|s=9999|rg=5|z=50;|s=9999|rg=1|1=Banned in most places|z=200000;5v1|rg=1|z=200000;6v1|rg=1|z=200000;|s=9999|rg=3|1=Opens one locked Gold Chest or Lock Box;t|s=9999|rg=1|z=5000;1|rg=1|1=Opens all Shadow Chests and Obsidian Lock Boxes|z=87500;w|s=9999|rg=400;|s=9999|rg=25|z=100;t|s=9999|rg=1|1=Used for crafting cloth|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=500;t|s=9999|rg=1|z=500;t|s=9999|rg=1|z=500;t|s=9999|rg=1|z=500;t|s=9999|rg=1|z=500;t|s=9999|rg=1|z=500;t|s=9999|rg=1|z=500;t|s=9999|rg=1|z=500;t|s=9999|rg=1|z=500;t|s=9999|rg=1|1=Can be used to store your items|2=Stored items can only be accessed by you|z=200000;t|s=9999|rg=1|z=500;t|s=9999|rg=1|z=1000;t|s=9999|rg=1|z=1500;t|s=9999|rg=1|z=70;t|s=9999|rg=1|z=20;t|s=9999|rg=1|1=Used for brewing ale|z=600;b|s=9999|rg=20|1=Minor improvements to melee stats & lowered defense|2=Down the hatch!|z=100;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=20;c|s=9999|r=2|t=17|rg=5|1=Medium improvements to all stats|2=Simple, yet refreshing.|z=10000;t|s=9999|rg=1|z=150;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;c|s=9999|t=45|rg=3|1=Summons a Goblin Army;|s=9999|rg=25|z=30;t|s=9999|rg=1|1=Used for advanced wood crafting|z=300;t|s=9999|r=3|rg=100|z=3500;t|s=9999|r=3|rg=100|z=5500;t|s=9999|r=3|rg=100|z=7500;d1|r=4|d=26|t=27|k=7.5|th=80|rg=1|1=Strong enough to destroy Demon Altars|z=39000;d1|r=5|d=72|t=20|k=4.5|rg=1|z=230000;t|s=9999|r=3|rg=25|z=2000;b|s=9999|rg=100;41|r=4|D=3|rg=1|1=Increases maximum mana by 40|2=10% increased magic damage|3=9% increased magic critical strike chance|z=75000;41|r=4|D=14|rg=1|1=10% increased movement speed|2=15% increased melee damage|z=75000;41|r=4|D=5|rg=1|1=10% increased ranged damage|2=10% increased ranged critical strike chance|z=75000;51|r=4|D=10|rg=1|1=5% increased critical strike chance|z=60000;61|r=4|D=8|rg=1|1=10% increased movement speed and 3% increased damage|z=45000;41|r=4|D=3|rg=1|1=Increases maximum mana by 60|2=15% increased magic damage|z=112500;41|r=4|D=16|rg=1|1=8% increased melee critical strike chance|2=10% increased melee damage|z=112500;41|r=4|D=6|rg=1|1=12% increased ranged damage|2=7% increased ranged critical strike chance|z=112500;51|r=4|D=12|rg=1|1=7% increased damage|z=90000;61|r=4|D=9|rg=1|1=10% increased critical strike chance|z=67500;t|s=9999|r=3|rg=25|z=10500;t|s=9999|r=3|rg=25|z=22000;d1|r=4|d=23|t=15|k=2.75|tx=14|rg=1|z=54000;d1|r=4|d=29|t=15|k=3|tx=17|rg=1|z=81000;d1|r=4|d=10|t=15|k=0.5|tp=110|rg=1|1=Can mine Mythril and Orichalcum|z=54000;d1|r=4|d=15|t=15|k=0.5|tp=150|rg=1|1=Can mine Adamantite and Titanium|z=81000;d1|r=4|d=33|t=15|k=4.5|tx=20|rg=1|z=108000;d1|r=4|d=20|t=15|k=0.5|tp=180|rg=1|z=108000;d1|r=5|d=50|t=45|k=6|rg=1|1=Has a chance to confuse|2=Find your inner pieces|z=144000;d1|r=4|d=45|t=26|k=5|rg=1|z=67500;t|s=9999|r=3|rg=25|z=30000;w|s=9999|rg=400;a1|rg=1|1=Displays horizontal position|z=12500;a1|r=4|rg=1|1=Grants the ability to swim|2=Greatly extends underwater breathing|z=100000;a1|r=3|rg=1|1=Shows position|2=Tells the time|z=150000;a1|r=4|rg=1|1=Negates fall damage|2=Grants immunity to fire blocks|z=60000;a1|r=4|D=2|rg=1|1=Grants immunity to knockback|2=Grants immunity to fire blocks|z=100000;t|s=9999|rg=1|1=Allows the combining of some accessories|z=100000;a1|r=4|rg=1|1=Allows the holder to double jump|2=Increases jump height|z=150000;41|r=4|D=4|rg=1|1=Increases maximum mana by 80|2=12% increased magic damage and critical strike chance|z=150000;41|r=4|D=22|rg=1|1=7% increased melee critical strike chance|2=14% increased melee damage|z=150000;41|r=4|D=8|rg=1|1=14% increased ranged damage|2=10% increased ranged critical strike chance|z=150000;51|r=4|D=16|rg=1|1=8% increased damage|z=120000;61|r=4|D=12|rg=1|1=7% increased critical strike chance|2=5% increased movement speed|z=90000;a1|r=4|rg=1|1=Allows flight|2=The wearer can run super fast|z=100000;d1|r=4|d=49|t=25|k=6|rg=1|z=90000;a1|r=3|rg=1|1=Increases block placement range by 1|z=100000;b|s=9999|rg=100;t|s=9999|rg=100;51|D=1|rg=1|1=10% increased mining speed|z=5000;61|D=1|rg=1|1=10% increased mining speed|z=5000;t|s=9999|rg=100;t|s=9999|rg=100;t|s=9999|rg=100;t|s=9999|rg=100;t|s=9999|rg=100;w|s=9999|rg=400;w|s=9999|rg=400;w|s=9999|rg=400;w|s=9999|rg=400;w|s=9999|rg=400;c|s=9999|r=3|d=20|t=15|k=3|rg=99|1=Spreads the Hallow to some blocks|z=200;c|s=9999|r=3|d=20|t=15|k=3|rg=99|1=Spreads the Corruption to some blocks|z=100;t|s=9999|rg=200;1|r=5|t=20|rg=1|1=Summons a magical fairy|z=250000;d1|r=4|d=70|t=35|k=8|rg=1|1=Deals more damage to unhurt enemies|z=150000;t|s=9999|rg=100|z=200;t|s=9999|rg=100|z=200;t|s=9999|rg=100|z=200;t|s=9999|rg=100|z=200;t|s=9999|rg=100|z=500;t|s=9999|rg=100|z=200;t|s=9999|rg=100|z=300;r1|r=4|d=17|t=12|rg=1|1=Three round burst|2=Only the first shot consumes ammo|z=150000;r1|r=4|d=35|t=23|k=1.5|rg=1|z=60000;r1|r=4|d=39|t=20|k=2|rg=1|z=90000;1|r=4|t=20|k=7|rg=1|z=150000;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;w|s=9999|rg=400;t|s=9999|rg=50;r1|r=4|d=42|t=18|k=2.5|rg=1|z=120000;d1|r=4|d=61|t=21|k=6|rg=1|z=138000;d1|r=4|d=40|t=19|k=5|rg=1|z=69000;d1|r=4|d=50|t=20|k=6|rg=1|z=103500;a1|r=4|rg=1|1=Turns the holder into a werewolf at night|z=150000;d1|d=12|t=20|k=0.5|rg=1|z=1000;t|s=9999|r=3|rg=1|z=100000;t|s=9999|rg=1|z=10000;a1|r=4|rg=1|1=15% increased magic damage|z=100000;a1|r=4|rg=1|1=15% increased melee damage|z=100000;a1|r=4|rg=1|1=15% increased ranged damage|z=100000;a1|r=5|rg=1|1=Allows flight and slow fall|z=400000;a1|r=5|rg=1|1=Allows flight and slow fall|z=400000;m1|r=5|d=42|t=12|k=2|m=5|rg=1|z=200000;m1|r=5|d=50|t=25|k=6|m=21|rg=1|1=Casts a controllable rainbow|z=200000;m1|r=4|d=28|t=9|k=2|m=6|rg=1|1=Summons a block of ice|z=500000;a1|r=5|rg=1|1=Transforms the holder into merfolk when entering water|z=375000;t|s=9999|rg=1|1=Right Click to customize attire;c|s=9999|r=3|hl=150|t=17|rg=30|z=5000;c|s=9999|r=3|hm=200|t=17|rg=30|z=500;|s=9999|rg=25|z=500;t|s=9999|rg=25|z=8000;4v1|r=2|rg=1|z=20000;5v1|r=2|rg=1|z=10000;6v1|r=2|rg=1|z=10000;r1|r=5|d=35|t=30|k=0.3|rg=1|1=Uses gel for ammo|2=Ignores 15 points of enemy Defense|z=500000;1|r=3|t=12|rg=1|z=10000;1|r=3|t=12|rg=1|z=10000;1|t=15|tr=20|rg=1|1=Places red wire|z=20000;1|t=15|tr=20|rg=1|1=Removes wire|z=20000;t|s=9999|rg=100|z=1000;t|s=9999|rg=100|z=1000;t|s=9999|rg=5|z=3000;m1|r=4|d=29|t=12|k=2.5|m=8|rg=1|z=150000;rb|s=9999|r=3|d=9|k=1|rg=99|1=Creates crystal shards on impact|z=30;rb|s=9999|r=3|d=13|k=2|rg=99|1=Summons falling stars on impact|z=80;m1|r=4|d=35|t=8|k=3.75|m=6|rg=1|1=A magical returning dagger|z=250000;m1|r=4|d=32|t=7|k=5|m=5|rg=1|1=Summons rapid fire crystal shards|z=200000;m1|r=4|d=55|t=15|k=6.5|m=9|rg=1|1=Summons unholy fire balls|z=200000;|s=9999|r=3|rg=25|1=The essence of light creatures|z=1000;|s=9999|r=3|rg=25|1=The essence of dark creatures|z=1000;|s=9999|r=3|rg=25|1=Not even water can put the flame out|z=4000;t|s=9999|rg=100|1=Can be placed in water|z=150;t|s=9999|r=3|rg=1|1=Used to smelt adamantite and titanium ore|z=50000;t|s=9999|r=3|rg=1|1=Used to craft items from mythril, orichalcum, adamantite, and titanium bars|z=25000;|s=9999|rg=5|1=Sharp and magical!|z=15000;|s=9999|r=2|rg=1|1=Sometimes carried by creatures in dark deserts|z=4500;|s=9999|r=2|rg=1|1=Sometimes carried by creatures in light deserts|z=4500;t|s=9999|rg=5|1=Activates when stepped on|z=5000;|s=9999|rg=100|z=500;|s=9999|rg=1|1=Can be enchanted|z=50000;a1|r=4|rg=1|1=Causes stars to fall after taking damage|z=100000;r1|r=5|d=25|t=7|k=1|rg=1|1=50% chance to not consume ammo|2=Minisharks older brother|z=350000;r1|r=4|d=24|t=45|k=6.5|rg=1|1=Fires a spread of bullets|z=250000;a1|r=4|rg=1|1=Reduces the cooldown of healing potions by 25%|z=100000;a1|r=4|rg=1|1=Increases melee knockback|2=Increases the size of melee weapons|z=100000;d1|r=4|d=44|t=28|k=4|rg=1|z=45000;t|s=9999|rg=5|z=2000;t|s=9999|rg=5|z=10000;t|s=9999|rg=5;t|s=9999|rg=5|1=Activates when stepped on|z=5000;t|s=9999|rg=5|1=Activates when a player steps on it|z=5000;t|s=9999|rg=5|1=Activates when a player steps on it|z=5000;c|s=9999|r=3|t=45|rg=3|1=Summons The Twins;rb|s=9999|r=3|d=17|k=3|rg=99|z=40;rb|s=9999|r=3|d=12|k=4|rg=99|z=30;|s=9999|r=5|rg=25|1=The essence of pure terror|z=40000;|s=9999|r=5|rg=25|1=The essence of the destroyer|z=40000;|s=9999|r=5|rg=25|1=The essence of omniscient watchers|z=40000;d1|r=5|d=61|t=22|k=6.4|rg=1|z=230000;51|r=5|D=15|rg=1|1=7% increased critical strike chance|z=200000;61|r=5|D=11|rg=1|1=7% increased damage|2=8% increased movement speed|z=150000;41|r=5|D=9|rg=1|1=15% increased ranged damage|2=8% increased ranged critical strike chance|z=250000;a1|r=4|rg=1|1=Increases length of invincibility after taking damage|z=100000;a1|r=4|rg=1|1=8% reduced mana usage|2=Automatically use mana potions when needed|z=50000;c|s=9999|r=3|t=45|rg=3|1=Summons The Destroyer;c|s=9999|r=3|t=45|rg=3|1=Summons Skeletron Prime;41|r=5|D=5|rg=1|1=Increases maximum mana by 100|2=12% increased magic damage and critical strike chance|z=250000;41|r=5|D=24|rg=1|1=10% increased melee damage and critical strike chance|2=10% increased melee speed|z=250000;c|s=9999|t=45|rg=3|1=Summons King Slime;d1|r=5|d=60|t=14|k=8|rg=1|1=Greetings, programs!|z=750000;at1|r=4|rg=1|z=100000;at1|r=4|rg=1|z=100000;at1|r=4|rg=1|z=100000;at1|r=4|rg=1|z=100000;at1|r=4|rg=1|z=100000;at1|r=4|rg=1|z=100000;at1|r=4|rg=1|z=100000;at1|r=4|rg=1|z=100000;at1|r=4|rg=1|z=100000;at1|r=4|rg=1|z=100000;at1|r=4|rg=1|z=100000;at1|r=4|rg=1|z=100000;at1|r=4|rg=1|z=100000;|s=9999|r=3|rg=25|1=The essence of powerful flying creatures|z=1000;a1|r=3|rg=1|1=Has a chance to record songs|z=100000;t|s=9999|rg=100;r1|r=4|d=50|t=17|k=2.5|rg=1|z=200000;d1|r=4|d=35|t=15|k=4.75|tp=200|tx=22|rg=1|1=Not to be confused with a picksaw|z=220000;t|s=9999|rg=5|1=Explodes when activated|z=5000;t|s=9999|rg=1|1=Sends water to outlet pumps;t|s=9999|rg=1|1=Receives water from inlet pumps;t|s=9999|rg=1|1=Activates every second|z=10000;t|s=9999|rg=1|1=Activates every 3 seconds|z=10000;t|s=9999|rg=1|1=Activates every 5 seconds|z=10000;t|s=9999|rg=100;w|s=9999|rg=400;4v1|rg=1|z=150000;5v1|rg=1|z=150000;6v1|rg=1|z=150000;t|s=9999|rg=100;w|s=9999|rg=400;t|s=9999|rg=100;t|s=9999|rg=100;w|s=9999|rg=400;t|s=9999|rg=25|z=500;t|s=9999|rg=25|z=500;t|s=9999|rg=25|z=500;1|1=Right Click to open;1|1=Right Click to open;1|1=Right Click to open;c|s=9999|r=2|t=45|rg=3|1=Summons the Frost Legion;1|r=3|t=20|rg=1|1=Summons a pet bunny;t|s=9999|rg=100;w|s=9999|rg=400;w|s=9999|rg=400;t|s=9999|rg=100;w|s=9999|rg=400;t|s=9999|rg=100;w|s=9999|rg=400;t|s=9999|rg=100;t|s=9999|rg=100;t|s=9999|rg=100;t|s=9999|rg=100;w|s=9999|rg=400;w|s=9999|rg=400;w|s=9999|rg=400;w|s=9999|rg=400;t|s=9999|rg=100;t|s=9999|rg=100;t|s=9999|rg=100;w|s=9999|rg=400;w|s=9999|rg=400;w|s=9999|rg=400;t|s=9999|rg=1|z=500;t|s=9999|rg=1|z=500;t|s=9999|rg=1|z=500;t|s=9999|rg=1|z=150;t|s=9999|rg=1|z=150;t|s=9999|rg=1|z=150;t|s=9999|rg=200;t|s=9999|rg=200;t|s=9999|rg=200;t|s=9999|rg=200;t|s=9999|rg=1|z=150;t|s=9999|rg=1|z=150;t|s=9999|rg=1|z=150;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=2000;t|s=9999|rg=1|z=2000;t|s=9999|rg=1|z=2000;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=200;t|s=9999|rg=1|z=200;t|s=9999|rg=1|z=200;d1|d=11|t=19|k=6|rg=1|z=100;d1|d=7|t=30|k=5.5|th=40|rg=1|z=50;r1|d=8|t=28|rg=1|z=100;d1|d=8|t=19|k=6|rg=1|z=100;d1|d=4|t=33|k=5.5|th=35|rg=1|z=50;r1|d=6|t=29|rg=1|z=100;d1|d=30|t=15|k=7|rg=1|z=100;d1|d=10|t=29|k=5.5|th=55|rg=1|z=50;r1|d=12|t=20|rg=1|z=100;t|s=9999|rg=100;w|s=9999|rg=400;t|s=9999|rg=100;a1|r=9|rg=1|1=Great for impersonating devs!|2=Allows flight and slow fall|z=400000;4v1|r=9|rg=1|1=Great for impersonating devs!|z=250000;5v1|r=9|rg=1|1=Great for impersonating devs!|z=250000;6v1|r=9|rg=1|1=Great for impersonating devs!|z=250000;1|r=3|t=20|rg=1|1=Summons a baby penguin|z=100000;d1|c=2|d=21|t=20|k=8.5|rg=1|z=50000;d1|r=8|c=16|d=105|t=20|k=6.5|rg=1|1=Deals more damage to injured foes|z=200000;d1|r=4|d=53|t=16|k=4|rg=1|z=180000;t|s=9999|rg=1|z=150;d1|r=8|d=72|t=18|k=4.5|rg=1|z=500000;d1|r=8|d=70|t=32|k=4.75|rg=1|z=500000;d1|r=5|d=49|t=23|k=4.5|rg=1|1=Shoots an icy bolt|z=250000;t|s=9999|rg=1|z=300;c|s=9999|r=4|t=17|rg=3|1=Only for those who are worthy;r1|r=8|d=29|t=34|k=7|rg=1|z=400000;t|s=9999|rg=1|z=5000;t|s=9999|rg=1|z=5000;r1|r=5|c=5|d=53|t=19|k=4.7|rg=1|z=27000;m1|r=6|d=88|t=17|k=6.5|m=19|rg=1|1=Summons the Devils trident|z=500000;41|r=5|D=10|rg=1|1=16% increased melee and ranged damage|z=250000;51|r=5|D=20|rg=1|1=11% increased melee and ranged critical strike chance|z=200000;61|r=5|D=13|rg=1|1=8% increased movement speed|2=10% increased melee speed|z=150000;41|D=2|rg=1|z=1125;51|D=2|rg=1|z=1875;61|D=1|rg=1|z=1500;41|D=3|rg=1|z=4500;51|D=3|rg=1|z=7500;61|D=2|rg=1|z=6000;41|D=4|rg=1|z=11250;51|D=5|rg=1|z=18750;61|D=3|rg=1|z=15000;41|D=5|rg=1|z=22500;51|D=6|rg=1|z=37500;61|D=5|rg=1|z=30000;t|s=9999|rg=100|z=375;t|s=9999|rg=100|z=750;t|s=9999|rg=100|z=1125;t|s=9999|rg=100|z=2250;t|s=9999|rg=25|z=1125;t|s=9999|rg=25|z=2250;t|s=9999|rg=25|z=4500;t|s=9999|rg=25|z=9000;a1|rg=1|1=Tells the time|z=1500;a1|rg=1|1=Tells the time|z=7500;a1|rg=1|1=Tells the time|z=15000;t|s=9999|rg=1|z=4500;t|s=9999|rg=1|z=18000;t|s=9999|rg=1|z=36000;t|s=9999|rg=1|z=1500;t|s=9999|rg=1|z=1500;4v1|rg=1|z=15000;t|s=9999|rg=1|1=Used to craft items from metal bars|z=7500;t|s=9999|rg=100;t|s=9999|rg=100;t|s=9999|rg=100;w|s=9999|rg=400;w|s=9999|rg=400;w|s=9999|rg=400;d1|r=4|d=52|t=20|k=6.5|rg=1|1=Shoots a beam of light|z=150000;d1|c=2|d=17|t=20|k=4.75|rg=1|1=Shoots an icy bolt|z=20000;r1|r=5|d=39|t=14|k=4.5|rg=1|1=Shoots frost arrows|z=250000;m1|r=5|d=46|t=12|k=5|m=12|rg=1|1=Shoots a stream of frost|z=200000;41|D=1|rg=1;51|D=1|rg=1;61|rg=1;41|D=1|rg=1;51|D=2|rg=1;61|D=1|rg=1;41|D=1|rg=1;51|D=1|rg=1;61|D=1|rg=1;41|D=2|rg=1;51|D=3|rg=1;61|D=2|rg=1;m1|d=15|t=37|k=3.25|m=5|rg=1|z=2000;m1|d=16|t=36|k=3.5|m=5|rg=1|z=3000;m1|d=18|t=34|k=4|m=6|rg=1|z=10000;m1|d=19|t=32|k=4.25|m=6|rg=1|z=15000;m1|d=21|t=28|k=4.75|m=7|rg=1|z=20000;m1|r=2|d=23|t=26|k=5.5|m=8|rg=1|z=30000;w|s=9999|rg=400|z=10;w|s=9999|rg=400|z=10;w|s=9999|rg=400|z=10;a1|r=5|rg=1|1=Allows flight and slow fall|2=Hold Up to boost faster!|z=400000;a1|r=5|rg=1|1=Allows flight and slow fall|z=400000;w|s=9999|rg=400;t|s=9999|rg=100|1=Prevents fall damage;w|s=9999|rg=400;1|r=3|t=20|rg=1|1=Summons a pet turtle|z=100000;4v1|r=5|rg=1|z=50000;5v1|r=5|rg=1|z=50000;d1|r=7|d=60|t=40|k=6.2|rg=1|z=700000;d1|r=8|d=85|t=18|k=6.5|rg=1|z=1000000;r1|r=8|d=60|t=20|k=4|rg=1|z=350000;r1|r=8|d=55|t=30|k=4|rg=1|1=Does extra damage on a direct hit|z=400000;r1|r=8|d=80|t=50|k=4|rg=1|1=Mines deal triple damage when armed|z=350000;a1|r=5|rg=1|1=Allows flight and slow fall|z=400000;t|s=9999|rg=100;t|s=9999|rg=100;w|s=9999|rg=400;t|s=9999|rg=100|1=Prevents fall damage;t|s=9999|rg=100;t|s=9999|rg=100;w|s=9999|rg=400;w|s=9999|rg=400;w|s=9999|rg=400;rb|s=9999|d=40|k=4|rg=99|1=Small blast radius. Will not destroy tiles|z=50;rb|s=9999|d=40|k=4|rg=99|1=Small blast radius. Will destroy tiles|z=250;rb|s=9999|d=65|k=6|rg=99|1=Large blast radius. Will not destroy tiles|z=100;rb|s=9999|r=2|d=65|k=6|rg=99|1=Large blast radius. Will destroy tiles|z=500;t|s=9999|rg=100|1=Increases running speed;d1|r=4|d=10|t=25|k=5|tp=110|rg=1|1=Can mine Mythril and Orichalcum|z=54000;d1|r=4|d=15|t=25|k=5|tp=150|rg=1|1=Can mine Adamantite and Titanium|z=81000;d1|r=4|d=20|t=25|k=5|tp=180|rg=1|z=108000;1|r=5|t=30|k=0.3|rg=1|1=Creates and destroys biomes when sprayed|2=Uses colored solution|z=2000000;b|s=9999|r=3|rg=99|1=Used by the Clentaminator|2=Spreads the Purity|z=1500;b|s=9999|r=3|rg=99|1=Used by the Clentaminator|2=Spreads the Hallow|z=1500;b|s=9999|r=3|rg=99|1=Used by the Clentaminator|2=Spreads the Corruption|z=1500;b|s=9999|r=3|rg=99|1=Used by the Clentaminator|2=Spreads Glowing Mushrooms|z=1500;b|s=9999|r=3|rg=99|1=Used by the Clentaminator|2=Spreads the Crimson|z=1500;a1|r=5|rg=1|1=Allows flight and slow fall|z=400000;a1|r=5|rg=1|1=Allows flight and slow fall|z=400000;d1|r=7|d=26|t=27|k=7.5|th=85|rg=1|1=Strong enough to destroy Demon Altars|z=400000;m1|r=7|d=35|t=25|k=1|m=12|rg=1|1=Ignores 10 points of enemy Defense|z=200000;t|s=9999|rg=1|z=5000;t|s=9999|rg=1|z=5000;t|s=9999|rg=1|z=5000;41|D=6|rg=1|1=3% increased damage|z=50000;51|D=7|rg=1|1=3% increased damage|z=40000;61|D=6|rg=1|1=3% increased damage|z=30000;d1|d=22|t=25|k=5|rg=1|z=13500;r1|d=19|t=30|k=1|rg=1|z=18000;d1|d=23|t=40|k=6|th=55|rg=1|z=15000;d1|d=12|t=22|k=3.5|tp=70|rg=1|1=Able to mine Hellstone|z=18000;d1|d=22|t=32|k=6|tx=15|rg=1|z=13500;r1|d=22|t=20|k=2|rg=1|z=75000;d1|d=17|t=45|k=5.5|rg=1|z=27000;d1|d=17|t=31|k=5|rg=1|z=75000;41|D=3|rg=1|z=50000;51|D=3|rg=1|z=40000;61|D=3|rg=1|z=30000;t|s=9999|rg=1|z=150;t|s=9999|rg=1|z=150;t|s=9999|rg=1|z=150;t|s=9999|rg=1|z=150;t|s=9999|rg=1|z=150;t|s=9999|rg=1|z=150;t|s=9999|rg=1|z=150;t|s=9999|rg=1|z=150;t|s=9999|rg=1|z=150;t|s=9999|rg=1|z=150;t|s=9999|rg=1|z=200;t|s=9999|rg=1|z=200;t|s=9999|rg=1|z=200;t|s=9999|rg=1|z=200;t|s=9999|rg=1|z=200;a1|r=5|rg=1|1=Allows flight and slow fall|z=400000;a1|r=5|rg=1|1=Allows flight and slow fall|z=400000;a1|r=8|rg=1|1=Allows flight and slow fall|z=400000;t|s=9999|rg=100;w|s=9999|rg=400;t|s=9999|rg=1|z=150;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=5000;t1|rg=1|1=Places living wood|z=12500;t|s=9999|rg=100;t|s=9999|rg=100;t|s=9999|rg=100;t|s=9999|rg=100;t|s=9999|rg=1|z=200;t|s=9999|rg=1|z=5000;4v1|r=2|rg=1|z=15000;5v1|r=2|rg=1|z=15000;6v1|r=2|rg=1|z=15000;4v1|rg=1|z=25000;5v1|rg=1|z=25000;6v1|rg=1|z=25000;t|s=9999|rg=1|z=5000;t|s=9999|rg=1|z=5000;t|s=9999|rg=1|z=5000;4v1|rg=1|z=20000;|s=9999|t=15|rg=50|1=Enables solid blocks to be toggled on and off|z=1000;1|t=15|tr=20|rg=1|1=Places blue wire|z=20000;1|t=15|tr=20|rg=1|1=Places green wire|z=20000;t|s=9999|rg=5|1=Activates when a player steps on it|z=5000;t|s=9999|rg=5|1=Activates when anything but a player steps on it|z=5000;a1|r=5|rg=1|1=Shops prices lowered by 20%|z=50000;a1|r=5|rg=1|1=Hitting enemies will sometimes drop extra coins|2=I found a coin! Its my lucky day!|z=50000;v1|r=2|rg=1|1=Having a wonderful time!|z=500;a1|r=2|rg=1|1=Allows the holder to do an improved double jump|z=50000;t|s=9999|rg=1|z=300;c1|t=20|rg=1|z=20;a1|r=6|rg=1|1=Provides life regeneration and reduces the cooldown of healing potions by 25%|z=200000;a1|r=6|rg=1|1=Turns the holder into a werewolf at night and a merfolk when entering water|z=400000;a1|r=6|rg=1|1=Causes stars to fall and increases length of invincibility after taking damage|z=100000;a1|r=4|rg=1|1=Provides the ability to walk on water & honey|z=200000;4v1|rg=1|z=250000;5v1|rg=1|z=100000;5v1|rg=1|z=20000;41|D=2|rg=1|z=25000;4v1|rg=1|z=20000;4v1|rg=1|z=25000;4v1|rg=1|z=20000;5v1|rg=1|z=20000;6v1|rg=1|z=20000;4v1|rg=1|z=50000;5v1|rg=1|z=50000;6v1|rg=1|z=50000;4v1|rg=1|z=50000;5v1|rg=1|z=50000;6v1|rg=1|z=50000;41|D=4|rg=1|z=25000;t|s=9999|rg=100|z=6500;d1|d=10|t=30|k=4.5|rg=1|z=1800;d1|d=4|t=25|k=2|tp=35|rg=1|z=2000;t|s=9999|rg=100;w|s=9999|rg=400;a1|r=4|rg=1|1=Immunity to Bleeding|z=100000;a1|r=4|rg=1|1=Immunity to Broken Armor|z=100000;a1|r=4|rg=1|1=Immunity to Poison|z=100000;a1|r=4|rg=1|1=Immunity to Darkness|z=100000;a1|r=4|rg=1|1=Immunity to Slow|z=100000;a1|r=4|rg=1|1=Immunity to Silence|z=100000;a1|r=2|rg=1|1=Immunity to Curse|z=100000;a1|r=4|rg=1|1=Immunity to Weakness|z=100000;a1|r=4|rg=1|1=Immunity to Confusion|z=100000;41|D=1|rg=1|z=200;51|D=1|rg=1|z=300;61|D=1|rg=1|z=250;a1|r=5|rg=1|1=Increases melee knockback|2=12% increased melee speed|3=Enables auto swing for melee weapons|4=Increases the size of melee weapons|z=200000;a1|r=5|rg=1|1=Allows flight, super fast running|2=8% increased movement speed|z=300000;a1|r=7|rg=1|1=If worn during the day, grants minor increase to damage, melee speed, critical strike chance,|2=life regeneration, defense, mining speed, and minion knockback|z=300000;a1|r=5|rg=1|1=If worn during the night, grants minor increase to damage, melee speed, critical strike chance,|2=life regeneration, defense, mining speed, and minion knockback|z=375000;a1|r=5|rg=1|1=Immunity to Weakness and Broken Armor|z=100000;a1|r=5|rg=1|1=Immunity to Poison and Bleeding|z=100000;a1|r=5|rg=1|1=Immunity to Slow and Confusion|z=100000;a1|r=5|rg=1|1=Immunity to Silence and Curse|z=100000;r1|r=6|t=8|k=2|rg=1|1=Uses coins for ammo|2=Higher valued coins do more damage|z=300000;a1|r=3|rg=1|1=Provides 7 seconds of immunity to lava|z=300000;a1|r=4|rg=1|1=Provides the ability to walk on water & honey|2=Grants immunity to fire blocks|z=300000;a1|r=7|rg=1|1=Provides the ability to walk on water, honey & lava|2=Grants immunity to fire blocks and 7 seconds of immunity to lava|3=Reduces damage from touching lava|z=500000;t|s=9999|rg=1|z=40000;t|s=9999|rg=1|z=40000;t|s=9999|rg=100;t|s=9999|rg=1|z=200;t|s=9999|rg=200;t|s=9999|rg=1|z=500;t|s=9999|rg=1|z=150;t|s=9999|rg=1|z=150;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=2000;d1|d=11|t=19|k=6|rg=1|z=100;d1|d=7|t=30|k=5.5|th=40|rg=1|z=50;r1|d=8|t=28|rg=1|z=100;41|D=1|rg=1;51|D=2|rg=1;61|D=1|rg=1;w|s=9999|rg=400;t|s=9999|r=3|rg=1|z=250000;c|s=9999|d=300|t=20|rg=25|1=For use with cannon|z=1500;1|d=2|t=18|rg=1|z=50000;rb|s=9999|d=1|k=1.5|rg=99|z=7;t1|rg=1|1=Places bone|z=25000;t1|rg=1|1=Places leaves|z=12500;a1|r=2|rg=1|1=Allows the owner to float for a few seconds|z=50000;a1|r=5|rg=1|1=12% increased damage|z=300000;a1|r=6|rg=1|1=Increases melee knockback|2=12% increased melee damage and speed|3=Enables auto swing for melee weapons|4=Increases the size of melee weapons|z=250000;t|s=9999|rg=5|1=Explodes when stepped on|z=50000;a1|r=8|D=6|rg=1|1=Absorbs 25% of damage done to players on your team when above 25% life|2=Grants immunity to knockback|z=300000;1|r=2|t=20|k=7|rg=1|z=20000;t|s=9999|rg=1|z=40000;t|s=9999|rg=1|z=40000;t|s=9999|rg=1|z=40000;t|s=9999|rg=1|z=40000;t|s=9999|rg=1|z=40000;t|s=9999|rg=1|z=40000;d1|d=10|t=22|k=5|rg=1|1=You will fall slower while holding this|z=10000;t|s=9999|r=7|rg=100|1=Reacts to the light|z=7500;a1|r=8|rg=1|1=Allows flight and slow fall|z=3000000;rb|s=9999|d=8|k=5.75|rg=99;a1|rg=1|1=Provides extra mobility on ice|2=Ice will not break when you fall on it|z=50000;t|s=9999|r=2|rg=1|1=Rapidly launches snowballs|z=50000;t|s=9999|rg=1|z=500;a1|rg=1|1=Allows the ability to slide down walls|2=Improved ability if combined with Shoe Spikes|z=25000;41|D=2|rg=1|z=5000;41|D=4|rg=1|z=25000;41|D=6|rg=1|1=5% increased critical strike chance|z=37500;51|D=7|rg=1|1=5% increased critical strike chance|z=30000;61|D=6|rg=1|1=5% increased critical strike chance|z=22500;41|r=2|D=6|rg=1|1=5% increased ranged damage|z=45000;41|r=3|D=5|rg=1|1=Increases maximum mana by 40|2=6% increased magic critical strike chance|z=45000;51|r=3|D=6|rg=1|1=Increases maximum mana by 20|2=6% increased magic damage|z=30000;61|r=3|D=6|rg=1|1=Increases maximum mana by 20|2=6% increased magic critical strike chance|z=30000;a1|r=7|rg=1|1=Gives a chance to dodge attacks|z=150000;r1|r=2|d=14|t=40|k=5.75|rg=1|1=Fires a spread of bullets|z=100000;t|s=9999|tr=3|rg=100|1=Can be climbed on|z=10;t|s=9999|rg=1|1=Life regen is increased when near a campfire;c|s=9999|t=17|rg=5|1=Put it on a stick and roast over a campfire|2=Minor improvements to all stats|3=How many can you fit in your mouth?|z=100;1|rg=5|1=Roast it over a campfire!|z=200;c|s=9999|t=17|rg=5|1=Minor improvements to all stats|2=How can I have some more of nothing?|z=200;t|s=9999|rg=5|z=1500;t|s=9999|rg=5|z=1500;t|s=9999|rg=5|z=1500;t|s=9999|rg=5|z=1500;t|s=9999|rg=100|z=60;a1|rg=1|1=Allows the ability to slide down walls|2=Improved ability if combined with Climbing Claws|z=50000;a1|r=2|rg=1|1=Allows the ability to climb walls|z=50000;a1|r=7|rg=1|1=Allows the ability to dash|2=Double tap a direction|z=150000;41|D=3|rg=1|z=50000;51|D=3|rg=1|z=40000;61|D=3|rg=1|z=30000;|s=9999|rg=5|z=10000;a1|rg=1|1=Increases maximum mana by 20|2=Increases mana regeneration rate|z=50000;a1|r=4|rg=1|1=Allows the holder to double jump|2=Increases jump height|z=150000;a1|r=8|rg=1|1=Allows the ability to climb walls and dash|2=Gives a chance to dodge attacks|z=500000;c|s=9999|t=20|rg=10|1=Throw to create a climbable line of rope|z=100;r1|r=3|d=27|t=35|k=4|rg=1|1=Allows the collection of seeds for ammo|z=50000;a1|rg=1|1=Allows the holder to double jump|z=50000;rb|s=9999|d=7|k=2.2|rg=99|z=15;d1|r=2|d=23|t=21|k=4.25|rg=1|1=Shoots an enchanted sword beam|z=150000;d1|r=4|d=35|t=25|k=4.75|tp=200|tx=22|rg=1|1=Not to be confused with a hamdrill|z=220000;d1|r=4|d=33|t=35|k=5|tx=14|rg=1|z=54000;d1|r=4|d=39|t=35|k=6|tx=17|rg=1|z=81000;d1|r=4|d=43|t=35|k=7|tx=20|rg=1|z=108000;1|r=3|t=20|rg=1|1=Summons a Baby Eater of Souls|z=375000;t|s=9999|rg=1|1=Used to craft objects|z=100000;t|s=9999|rg=1|1=Used to craft objects|z=100000;t|s=9999|rg=1|1=Placing silt/slush/fossil piles into the extractinator turns them into something more useful|z=100000;t|s=9999|rg=1|1=Used to craft objects|z=100000;t|s=9999|rg=15|z=15000;rc|s=9999|t=15|rg=5|1=Shoots confetti everywhere!|z=100;41|r=7|D=20|rg=1|1=16% increased melee damage|2=6% increased melee critical strike chance|z=300000;41|r=7|D=13|rg=1|1=16% increased ranged damage|2=20% chance to not consume ammo|z=300000;41|r=7|D=7|rg=1|1=Increases maximum mana by 80 and reduces mana usage by 17%|2=16% increased magic damage|z=300000;51|r=7|D=18|rg=1|1=5% increased damage|2=7% increased critical strike chance|z=240000;61|r=7|D=13|rg=1|1=8% increased critical strike chance|2=5% increased movement speed|z=180000;t|s=9999|r=7|rg=25|1=Reacts to the light|z=45000;|s=9999|rg=3|z=10000;|s=9999|rg=3|z=10000;|s=9999|rg=3|z=10000;|s=9999|rg=3|z=10000;|s=9999|rg=3|z=10000;|s=9999|rg=3|z=10000;|s=9999|rg=3|z=10000;|s=9999|rg=3|z=10000;|s=9999|rg=3|z=10000;|s=9999|rg=3|z=10000;|s=9999|rg=3|z=10000;|s=9999|rg=3|z=10000;|s=9999|rg=3|z=10000;|s=9999|rg=3|z=10000;|s=9999|rg=3|z=10000;|s=9999|rg=3|z=10000;|s=9999|rg=3|z=10000;|s=9999|rg=3|z=10000;|s=9999|rg=3|z=10000;|s=9999|rg=3|z=10000;|s=9999|rg=3|z=10000;|s=9999|rg=3|z=10000;|s=9999|rg=3|z=10000;|s=9999|rg=3|z=10000;|s=9999|rg=3|z=10000;|s=9999|rg=3|z=10000;|s=9999|rg=3|z=10000;|s=9999|rg=3|z=10000;|s=9999|rg=3|z=10000;|s=9999|rg=3|z=10000;|s=9999|rg=3|z=10000;|s=9999|rg=3|z=10000;|s=9999|rg=3|z=10000;|s=9999|rg=3|z=10000;|s=9999|rg=3|z=10000;|s=9999|rg=3|z=10000;|s=9999|rg=3|z=10000;|s=9999|rg=3|z=10000;|s=9999|rg=3|z=10000;|s=9999|rg=3|z=10000;|s=9999|rg=3|z=10000;|s=9999|rg=3|z=10000;|s=9999|rg=3|z=10000;|s=9999|rg=3|z=10000;|s=9999|rg=3|z=10000;|s=9999|rg=3|z=10000;|s=9999|rg=3|z=10000;|s=9999|rg=3|z=10000;|s=9999|rg=3|z=10000;|s=9999|rg=3|z=10000;|s=9999|rg=3|z=10000;|s=9999|rg=3|z=10000;|s=9999|rg=3|z=10000;|s=9999|rg=3|z=10000;|s=9999|rg=3|z=10000;|s=9999|rg=3|z=10000;|s=9999|rg=3|z=10000;|s=9999|rg=3|z=10000;|s=9999|rg=3|z=10000;|s=9999|rg=3|z=10000;|s=9999|rg=3|z=10000;|s=9999|rg=3|z=10000;|s=9999|rg=3|z=10000;|s=9999|rg=3|z=10000;1|t=15|rg=1|1=Used with paint to color blocks|2=Can also apply coatings|z=10000;1|t=15|rg=1|1=Used with paint to color walls|2=Can also apply coatings|z=10000;|s=9999|rg=100|z=25;|s=9999|rg=100|z=25;|s=9999|rg=100|z=25;|s=9999|rg=100|z=25;|s=9999|rg=100|z=25;|s=9999|rg=100|z=25;|s=9999|rg=100|z=25;|s=9999|rg=100|z=25;|s=9999|rg=100|z=25;|s=9999|rg=100|z=25;|s=9999|rg=100|z=25;|s=9999|rg=100|z=25;|s=9999|rg=100|z=25;|s=9999|rg=100|z=25;|s=9999|rg=100|z=25;|s=9999|rg=100|z=25;|s=9999|rg=100|z=25;|s=9999|rg=100|z=25;|s=9999|rg=100|z=25;|s=9999|rg=100|z=25;|s=9999|rg=100|z=25;|s=9999|rg=100|z=25;|s=9999|rg=100|z=25;|s=9999|rg=100|z=25;|s=9999|rg=100|z=25;|s=9999|rg=100|z=25;|s=9999|rg=100|z=25;1|t=15|rg=1|1=Used to remove paint or coatings|2=Can sometimes collect moss|z=10000;t|s=9999|rg=100;w|s=9999|rg=400;t|s=9999|rg=200;t|s=9999|r=3|rg=100|z=4500;t|s=9999|r=3|rg=100|z=6500;t|s=9999|r=3|rg=100|z=8500;t|s=9999|rg=3|1=Used to make Teal Dye|z=10000;t|s=9999|rg=3|1=Used to make Green Dye|z=10000;t|s=9999|rg=3|1=Used to make Sky Blue Dye|z=10000;t|s=9999|rg=3|1=Used to make Yellow Dye|z=10000;t|s=9999|rg=3|1=Used to make Blue Dye|z=10000;t|s=9999|rg=3|1=Used to make Lime Dye|z=10000;|s=9999|rg=3|1=Used to make Pink Dye|z=10000;t|s=9999|rg=3|1=Used to make Orange Dye|z=10000;|s=9999|rg=3|1=Used to make Red Dye|z=10000;|s=9999|rg=3|1=Used to make Cyan Dye|z=10000;|s=9999|rg=3|1=Used to make Violet Dye|z=10000;|s=9999|rg=3|1=Used to make Purple Dye|z=10000;|s=9999|rg=3|1=Used to make Black Dye|z=10000;t|s=9999|rg=1|1=Used to Craft Dyes|z=50000;m1|r=2|d=9|t=12|k=0.25|m=5|rg=1|1=Shoots bees that will chase your enemy|z=100000;d1|r=7|d=80|t=14|k=5|rg=1|1=Chases after your enemy|z=350000;d1|r=3|d=30|t=20|k=5.3|rg=1|1=Summons killer bees after striking your foe|2=Small chance to cause confusion|z=100000;|s=9999|rg=100;t|s=9999|rg=100;w|s=9999|rg=400;t|s=9999|rg=100;|s=9999|t=15|rg=1|1=Contains a small amount of honey|2=Can be poured out;t1|rg=1|1=Places Hives|z=25000;rc|s=9999|d=12|t=15|k=1|rg=99|1=Explodes into a swarm of bees|z=200;a1|r=8|rg=1|1=Allows the holder to reverse gravity|2=Press Up to change gravity|z=2000000;a1|r=2|rg=1|1=Releases bees and douses the user in honey when damaged|z=100000;c|s=9999|t=45|rg=3|1=Summons the Queen Bee;c|s=9999|hl=80|t=17|rg=30|1=Improves natural healing for a short time|z=40;41|D=1|rg=1|z=1000;51|D=2|rg=1|z=1000;t|s=9999|rg=1|z=200;t|s=9999|rg=1|z=200;t|s=9999|rg=1|z=200;t|s=9999|rg=1|z=200;|s=9999|r=7|rg=1|1=Opens the jungle temple door;t|s=9999|rg=1|z=500;t|s=9999|rg=1|z=150;t|s=9999|rg=1|z=300;t|s=9999|rg=1|1=Used for basic crafting|z=150;t|s=9999|rg=5|z=10000;t|s=9999|rg=5|z=10000;t|s=9999|rg=5|z=10000;t|s=9999|rg=5|z=10000;t|s=9999|rg=100;t|s=9999|rg=5|1=Activates when a player steps on it|z=5000;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;m1|r=8|d=31|t=18|k=0.25|m=10|rg=1|1=Ignores 10 points of enemy Defense|z=500000;r1|r=8|d=38|t=30|k=1|rg=1|1=Latches on to enemies for continuous damage|z=1000000;s1|r=7|d=40|t=28|k=3|m=10|rg=1|1=Summons a Pygmy to fight for you|z=350000;a1|r=7|rg=1|1=Increases your max number of minions by 1|z=200000;41|r=7|D=6|rg=1|1=Increases your max number of minions by 1|2=Increases summon damage by 10%|3=Increases whip range by 10%|z=500000;51|r=7|D=17|rg=1|1=Increases your max number of minions by 1|2=Increases summon damage by 10%|z=500000;61|r=7|D=12|rg=1|1=Increases your max number of minions by 1|2=Increases summon damage by 10%|z=500000;a1|r=5|rg=1|1=Allows flight and slow fall|z=1500000;a1|r=4|rg=1|1=Allows the holder to double jump|2=Increases jump height|z=150000;a1|r=8|rg=1|1=Allows the holder to quadruple jump|2=Increases jump height|z=150000;a1|r=5|rg=1|1=Allows flight and slow fall|z=400000;d1|r=3|d=19|t=22|k=5.5|rg=1|z=9000;a1|r=7|rg=1|1=Increases summon damage by 15%|2=Increases the knockback of your minions|z=400000;c|s=9999|t=15|rg=25|z=20;1|r=3|t=20|rg=1|1=Summons a Baby Skeletron Head|z=250000;1|r=3|t=20|rg=1|1=Summons a Baby Hornet|z=150000;1|r=3|t=20|rg=1|1=Summons a Tiki Spirit|z=2000000;1|r=3|t=20|rg=1|1=Summons a Pet Lizard|z=100000;t|s=9999|rg=2;t|s=9999|rg=2;t|s=9999|rg=2;t|s=9999|rg=2;t|s=9999|rg=2;m1|r=7|d=48|t=7|k=4|m=5|rg=1|1=Rapidly shoots razor sharp leaves|z=300000;rb|s=9999|r=7|d=9|k=4.5|rg=99|1=Chases after your enemy|z=50;1|r=3|t=20|rg=1|1=Summons a Pet Parrot|z=3750000;1|r=3|t=20|rg=1|1=Summons a Baby Truffle|z=450000;1|r=3|t=20|rg=1|1=Summons a Pet Sapling|z=100000;1|r=8|t=20|rg=1|1=Summons a Wisp to provide light|z=275000;t|s=9999|r=3|rg=25|z=13500;d1|r=4|d=49|t=22|k=5.5|rg=1|z=92000;d1|r=4|d=44|t=27|k=4.5|rg=1|z=60000;r1|r=4|d=37|t=22|k=1.75|rg=1|z=80000;d1|r=4|d=12|t=25|k=5|tp=130|rg=1|1=Can mine Mythril and Orichalcum|z=72000;d1|r=4|d=12|t=15|k=0.5|tp=130|rg=1|1=Can mine Mythril and Orichalcum|z=72000;d1|r=4|d=26|t=15|k=2.9|tx=15|rg=1|z=72000;t|s=9999|r=3|rg=25|z=26000;d1|r=4|d=59|t=22|k=6|rg=1|z=126500;d1|r=4|d=46|t=25|k=5.5|rg=1|z=82500;r1|r=4|d=40|t=19|k=2|rg=1|z=110000;d1|r=4|d=17|t=25|k=5|tp=165|rg=1|1=Can mine Adamantite and Titanium|z=99000;d1|r=4|d=17|t=15|k=0.5|tp=165|rg=1|1=Can mine Adamantite and Titanium|z=99000;d1|r=4|d=31|t=15|k=3.75|tx=18|rg=1|z=99000;t|s=9999|r=3|rg=25|z=34000;d1|r=4|d=61|t=20|k=6|rg=1|z=161000;d1|r=4|d=48|t=23|k=6.2|rg=1|z=105000;r1|r=4|d=43|t=17|k=2.5|rg=1|z=140000;d1|r=4|d=27|t=25|k=5|tp=190|rg=1|z=126000;d1|r=4|d=27|t=15|k=0.5|tp=190|rg=1|z=126000;d1|r=4|d=34|t=15|k=4.6|tx=21|rg=1|z=126000;41|r=4|D=14|rg=1|1=12% increased melee damage|2=12% increased melee speed|z=75000;41|r=4|D=5|rg=1|1=9% increased ranged damage|2=9% increased ranged critical strike chance|z=75000;41|r=4|D=3|rg=1|1=9% increased magic damage and critical strike chance|2=Increases maximum mana by 60|z=75000;51|r=4|D=10|rg=1|1=3% increased damage|2=2% increased critical strike chance|z=60000;61|r=4|D=8|rg=1|1=2% increased damage|2=1% increased critical strike chance|z=45000;41|r=4|D=19|rg=1|1=11% increased melee damage and melee speed|2=7% increased movement speed|z=112500;41|r=4|D=7|rg=1|1=15% increased ranged critical strike chance|2=8% increased movement speed|z=112500;41|r=4|D=4|rg=1|1=18% increased magic critical strike chance|2=Increases maximum mana by 80|z=112500;51|r=4|D=13|rg=1|1=6% increased critical strike chance|z=90000;61|r=4|D=10|rg=1|1=8% increased damage and 11% increased movement speed|z=67500;41|r=4|D=23|rg=1|1=9% increased melee damage and critical strike chance|2=9% increased melee speed|z=150000;41|r=4|D=8|rg=1|1=16% increased ranged damage|2=7% increased ranged critical strike chance|z=150000;41|r=4|D=4|rg=1|1=16% increased magic damage and 7% increased magic critical strike chance|2=Increases maximum mana by 100|z=150000;51|r=4|D=15|rg=1|1=4% increased damage|2=3% increased critical strike chance|z=120000;61|r=4|D=11|rg=1|1=3% increased damage and critical strike chance|2=6% increased movement speed|z=90000;t|s=9999|r=3|rg=1|1=Used to craft items from mythril, orichalcum, adamantite, and titanium bars|z=25000;t|s=9999|r=3|rg=1|1=Used to smelt adamantite and titanium ore|z=50000;d1|r=4|d=36|t=35|k=5.5|tx=15|rg=1|z=72000;d1|r=4|d=41|t=35|k=6.5|tx=18|rg=1|z=99000;d1|r=4|d=44|t=35|k=7.5|tx=21|rg=1|z=126000;t|s=9999|r=4|rg=25|z=20000;d1|r=7|d=95|t=26|k=6|rg=1|1=Shoots a powerful orb|z=276000;d1|r=7|d=57|t=16|k=4|rg=1|1=Shoots a spore cloud|z=276000;d1|r=7|d=49|t=23|k=6.2|rg=1|1=Shoots a spore cloud|z=180000;r1|r=7|d=34|t=19|k=2.75|rg=1|z=240000;d1|r=7|d=40|t=25|k=5|tp=200|tr=1|rg=1|z=216000;d1|r=7|d=35|t=15|k=1|tp=200|rg=1|z=216000;d1|r=7|d=50|t=15|k=4.6|tx=23|rg=1|z=216000;d1|r=7|d=70|t=30|k=7|tx=23|tr=1|rg=1|z=216000;d1|r=7|d=80|t=35|k=8|th=90|tr=1|rg=1|z=216000;rb|s=9999|r=7|d=16|k=3.5|rg=99|1=Bounces back after hitting a wall|z=100;1|t=20|k=7|rg=1|z=20000;1|t=20|k=7|rg=1|z=20000;1|t=20|k=7|rg=1|z=20000;1|t=20|k=7|rg=1|z=20000;1|t=20|k=7|rg=1|z=20000;1|t=20|k=7|rg=1|z=20000;1|r=3|t=20|rg=1|1=Summons a Baby Dinosaur|z=375000;4v1|rg=1;m1|r=6|d=30|t=22|m=30|rg=1|1=Summons a cloud to rain down on your foes|z=175000;t|s=9999|rg=100|z=60;b|s=9999|rg=100;a1|r=4|rg=1|1=Causes stars to fall, releases bees and douses the user in honey when damaged|z=150000;a1|r=7|rg=1|1=10% increased critical strike chance|z=250000;a1|r=2|rg=1|1=Increases jump height|2=Releases bees and douses the user in honey when damaged|z=100000;a1|r=4|rg=1|1=Allows the holder to double jump|2=Increases jump height and negates fall damage|z=150000;a1|r=4|rg=1|1=Allows the holder to double jump|2=Increases jump height and negates fall damage|z=150000;a1|r=4|rg=1|1=Allows the holder to double jump|2=Increases jump height and negates fall damage|z=150000;a1|r=5|rg=1|1=Puts a shell around the owner when below 50% life that reduces damage by 25%|z=225000;r1|r=8|c=25|d=185|t=36|k=8|rg=1|1=Shoots a powerful, high velocity bullet|2=Right Click to zoom out|z=400000;r1|r=7|d=50|t=9|k=5.5|rg=1|1=Shoots a powerful, high velocity bullet|z=250000;m1|d=12|t=24|m=30|rg=1|1=Summons a cloud to rain blood on your foes|z=75000;t|s=9999|rg=25|z=19500;r1|r=7|d=45|t=22|k=5|rg=1|1=Shoots an explosive bolt|2=Does extra damage on a direct hit|z=350000;d1|r=7|d=65|t=40|k=6.5|rg=1|1=Shoots razor sharp flower petals at nearby enemies|z=300000;m1|r=8|d=45|t=40|k=2.5|m=20|rg=1|1=Shoots a rainbow that does continuous damage|z=1000000;rb|s=9999|r=5|d=17|k=1|rg=99|1=Explodes into deadly shrapnel|z=75;d1|r=7|d=45|t=15|k=5.2|th=90|rg=1|z=216000;t|s=9999|rg=1|z=25000;m1|r=5|d=60|t=12|k=6.5|m=11|rg=1|1=Shoots a ball of frost|z=250000;r1|r=7|d=30|t=9|k=3.5|rg=1|1=Shoots a powerful, high velocity bullet|z=350000;m1|r=8|d=48|t=20|k=6|m=14|rg=1|z=500000;w|s=9999|rg=400|z=100;w|s=9999|rg=400|z=200;w|s=9999|rg=400|z=300;w|s=9999|rg=400|z=400;w|s=9999|rg=400|z=600;w|s=9999|rg=400|z=500;1|r=2|t=25|rg=1|z=45000;4v1|rg=1;4v1|rg=1|z=10000;4v1|rg=1|z=10000;4v1|rg=1|z=30000;4v1|rg=1|z=30000;5v1|rg=1|z=30000;6v1|rg=1|z=30000;4v1|rg=1|z=37500;51|rg=1|1=Increases maximum mana by 20|2=Reduces mana usage by 5%|z=25000;51|D=1|rg=1|1=Increases maximum mana by 40|2=Reduces mana usage by 7%|z=50000;51|D=1|rg=1|1=Increases maximum mana by 40|2=Reduces mana usage by 9%|z=75000;51|D=2|rg=1|1=Increases maximum mana by 60|2=Reduces mana usage by 11%|z=100000;51|D=2|rg=1|1=Increases maximum mana by 60|2=Reduces mana usage by 13%|z=125000;51|r=2|D=3|rg=1|1=Increases maximum mana by 80|2=Reduces mana usage by 15%|z=150000;5v1|rg=1|z=250000;6v1|rg=1|z=250000;a1|rg=1|1=Increases movement speed after taking damage|z=75000;c|s=9999|r=7|t=30|rg=10|1=Permanently increases maximum life by 5|z=100000;t|s=9999|rg=1|z=300;c|s=9999|rg=3|1=Used at the Lihzahrd Altar|z=50000;d1|r=7|d=34|t=16|k=5.5|tp=210|tx=25|tr=1|rg=1|1=Capable of mining Lihzahrd Bricks|z=216000;m1|r=7|d=90|k=3|m=8|rg=1|1=Shoots a scorching ray of heat|2=Oolaa!!|z=350000;m1|r=7|c=20|d=125|t=24|k=7.5|m=18|rg=1|1=Summons a powerful boulder|z=350000;d1|r=7|d=90|t=24|k=12|rg=1|1=Punches with the force of a golem|z=350000;t|s=9999|rg=1|z=500;1|r=4|rg=1|1=Increases view range when held|z=150000;a1|r=4|rg=1|1=Increases view range for guns|2=Right Click to zoom out|z=150000;a1|r=7|rg=1|1=10% increased damage|2=8% increased critical strike chance|z=300000;rb|s=9999|r=3|d=11|k=4|rg=99|z=40;a1|r=2|rg=1|1=Generates a very subtle glow which becomes more vibrant underwater|z=50000;d1|d=15|t=22|k=5.5|rg=1|z=2000;d1|r=8|d=72|t=23|k=7.25|tx=35|th=100|tr=1|rg=1|z=500000;d1|r=5|d=50|t=25|k=5.5|rg=1|1=Shoots an icy sickle|z=250000;a1|rg=1|1=You are a terrible person|z=1000;m1|r=6|d=43|t=36|k=5.6|m=22|rg=1|1=Shoots a poison fang that pierces multiple enemies|z=200000;s1|r=4|d=8|t=28|k=2|m=10|rg=1|1=Summons a baby slime to fight for you|z=100000;rb|s=9999|r=2|d=10|k=2|rg=99|1=Inflicts poison on enemies;1|r=6|t=20|rg=1|1=Summons an eyeball spring|z=150000;1|r=6|t=20|rg=1|1=Summons a baby snowman|z=125000;m1|r=2|d=29|t=26|k=3.5|m=18|rg=1|1=Shoots a skull|z=75000;d1|r=4|d=40|t=28|k=6.5|rg=1|1=Shoots a boxing glove|z=175000;c|s=9999|t=45|rg=3|1=Summons a pirate invasion;41|r=8|D=21|rg=1|1=6% increased melee damage|2=Enemies are more likely to target you|z=300000;51|r=8|D=27|rg=1|1=8% increased melee damage and critical strike chance|2=Enemies are more likely to target you|z=240000;61|r=8|D=17|rg=1|1=4% increased melee critical strike chance|2=Enemies are more likely to target you|z=180000;r1|d=10|t=19|k=1|rg=1|z=100000;d1|d=8|t=19|k=3|tp=55|rg=1|z=15000;a1|r=4|rg=1|1=Increases arrow damage by 10% and greatly increases arrow speed|2=20% chance to not consume arrows|z=250000;a1|r=3|rg=1|1=Melee attacks inflict fire damage|z=100000;a1|r=3|rg=1|1=Reduces damage from touching lava|z=100000;d1|r=5|d=45|t=11|k=6.5|rg=1|z=600000;d1|d=12|t=20|k=3.5|rg=1|z=12500;1|r=7|t=20|rg=1|1=Teleports you to the position of the mouse|2=Causes the chaos state|z=500000;d1|r=6|d=57|t=25|k=5|rg=1|1=Shoots a deathly sickle|z=375000;|s=9999|r=7|rg=3|z=5000;|s=9999|rg=25|z=750;|s=9999|rg=25|z=12;c|s=9999|t=45|rg=3|1=Summons the Brain of Cthulhu;|s=9999|r=3|rg=25|1=The blood of gods|z=4500;t|s=9999|rg=100|1=Can be placed in water|z=160;rb|s=9999|r=3|d=16|k=3|rg=99|1=Decreases targets defense|z=40;rb|s=9999|r=3|d=13|k=4|rg=99|1=Decreases targets defense|z=30;m1|r=4|d=30|t=18|k=4|m=7|rg=1|1=Sprays a shower of ichor|2=Decreases targets defense|z=200000;t|s=9999|rg=1|z=500000;c|s=9999|d=350|t=20|rg=25|1=For use with bunny cannon|z=3500;|s=9999|rg=25|1=Extremely toxic|z=1500;c|s=9999|r=4|t=17|rg=20|1=Melee and Whip attacks inflict Acid Venom on enemies|z=2500;rb|s=9999|r=3|d=19|k=4.2|rg=99|1=Inflicts target with Acid Venom|z=90;rb|s=9999|r=3|d=15|k=4.1|rg=99|1=Inflicts target with Acid Venom|z=40;a1|r=7|rg=1|1=Increases melee knockback and melee attacks inflict fire damage|2=12% increased melee damage and speed|3=Enables auto swing for melee weapons|4=Increases the size of melee weapons|z=300000;t|s=9999|rg=100|z=700;c|s=9999|t=20|rg=25|z=200;|s=9999|rg=25|z=1500;|s=9999|rg=25|z=1200;|s=9999|rg=25|z=1700;rb|s=9999|r=3|d=10|k=5|rg=99|1=Explodes into confetti on impact|z=10;rb|s=9999|r=3|d=15|k=3.6|rg=99|1=Causes confusion and bounces back after hitting a wall|z=40;rb|s=9999|r=3|d=10|k=6.6|rg=99|1=Explodes on impact|z=40;rb|s=9999|r=3|d=10|k=3.6|rg=99|1=Enemies killed will drop more money|z=40;c|s=9999|r=4|t=17|rg=20|1=Melee and Whip attacks inflict enemies with cursed flames|z=2500;c|s=9999|r=4|t=17|rg=20|1=Melee and Whip attacks set enemies on fire|z=2500;c|s=9999|r=4|t=17|rg=20|1=Melee and Whip attacks make enemies drop more gold|z=2500;c|s=9999|r=4|t=17|rg=20|1=Melee and Whip attacks decrease enemies defense|z=2500;c|s=9999|r=4|t=17|rg=20|1=Melee and Whip attacks confuse enemies|z=2500;c|s=9999|r=4|t=17|rg=20|1=Melee and Whip attacks cause confetti to appear|z=1500;c|s=9999|r=4|t=17|rg=20|1=Melee and Whip attacks poison enemies|z=2500;t|s=9999|rg=1|z=50000;t|s=9999|rg=1|z=50000;t|s=9999|rg=1|z=50000;t|s=9999|rg=1|z=50000;t|s=9999|rg=1|z=50000;t|s=9999|rg=1|z=50000;t|s=9999|rg=1|z=50000;t|s=9999|rg=1|z=50000;t|s=9999|rg=1|z=50000;t|s=9999|rg=1|z=50000;t|s=9999|rg=1|z=50000;t|s=9999|rg=1|z=50000;t|s=9999|rg=1|1=W. Garner|z=5000;t|s=9999|rg=1|1=W. Garner|z=5000;t|s=9999|rg=1|1=W. Garner|z=5000;t|s=9999|rg=1|1=W. Garner|z=5000;t|s=9999|rg=1;t|s=9999|rg=1;w|s=9999|rg=400;w|s=9999|rg=400;w|s=9999|rg=400;w|s=9999|rg=400;w|s=9999|rg=400;w|s=9999|rg=400;t|s=9999|rg=25;t|s=9999|rg=25;t|s=9999|rg=25;t|s=9999|rg=25;t|s=9999|rg=25;t|s=9999|rg=25;t|s=9999|rg=1|z=150;t|s=9999|rg=1|z=150;t|s=9999|rg=1|z=150;t|s=9999|rg=1|z=150;t|s=9999|rg=1|z=150;t|s=9999|rg=1|z=150;t|s=9999|rg=1|z=150;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=150;t|s=9999|rg=1|z=150;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=150;t|s=9999|rg=1|z=150;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=150;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=200;t|s=9999|rg=1|z=200;t|s=9999|rg=1|z=200;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1;t|s=9999|rg=25;t|s=9999|rg=1|1=W. Garner|z=5000;t|s=9999|rg=1|1=W. Garner|z=5000;t|s=9999|rg=1|1=W. Garner|z=5000;t|s=9999|rg=1|1=R. Moosdijk|z=5000;t|s=9999|rg=1|1=R. Moosdijk|z=5000;t|s=9999|rg=1|1=V. Costa Moura|z=5000;t|s=9999|rg=1|1=W. Garner|z=5000;t|s=9999|rg=1|1=W. Garner|z=5000;t|s=9999|rg=1|1=W. Garner|z=5000;t|s=9999|rg=1|1=W. Garner|z=5000;4v1|rg=1|z=10000;t|s=9999|r=2|rg=1|1=Used to craft weapon imbuement flasks|z=70000;t|s=9999|rg=1|1=Increases mana regeneration when placed nearby|z=2500;|s=9999|rg=100|1=Used to craft various types of ammo|z=5;t|s=9999|rg=1|1=K. Wright|z=5000;t|s=9999|rg=1|1=C. J. Ness|z=5000;t|s=9999|rg=1|1=R. Moosdijk|z=5000;t|s=9999|rg=1|1=V. Costa Moura|z=5000;t|s=9999|rg=1|1=V. Costa Moura|z=5000;t|s=9999|rg=1|1=V. Costa Moura|z=5000;t|s=9999|rg=1|1=V. Costa Moura|z=5000;t|s=9999|rg=1|1=V. Costa Moura|z=5000;t|s=9999|rg=1|1=A. G. Kolf|z=5000;t|s=9999|rg=1|1=V. Costa Moura|z=5000;t|s=9999|rg=1|1=W. Garner|z=5000;m1|r=8|d=80|t=15|k=3.25|m=7|rg=1|1=Creates a shadow beam that bounces off walls|z=300000;m1|r=8|d=70|t=30|k=5|m=18|rg=1|1=Launches a ball of fire that explodes into a raging inferno|z=300000;m1|r=8|d=65|t=24|k=6|m=15|rg=1|1=Summons a lost soul to chase your foes|z=300000;w|s=9999|rg=400;w|s=9999|rg=400;t|s=9999|rg=1|1=Blows bubbles|z=40000;1|t=25|rg=1|1=Blows bubbles|z=50000;t|s=9999|rg=1|z=1000;t|s=9999|rg=1|z=1000;t|s=9999|rg=1|z=1000;t|s=9999|rg=1|z=1000;t|s=9999|rg=1|z=1000;t|s=9999|rg=1|z=1000;t|s=9999|rg=200;t|s=9999|rg=1|z=200;t|s=9999|rg=1|z=150;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=150;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=1000;t|s=9999|rg=1|z=1000;t|s=9999|rg=1|z=1000;t|s=9999|rg=1|z=1000;t|s=9999|rg=1|z=1000;t|s=9999|rg=1|z=1000;t|s=9999|rg=1|z=2000;t|s=9999|rg=1|z=2000;t|s=9999|rg=1|z=2000;t|s=9999|rg=1|z=2000;t|s=9999|rg=1|z=5000;t|s=9999|rg=1|z=5000;t|s=9999|rg=1|1=J. T. Kjexrud|z=5000;t|s=9999|rg=1|1=J. T. Kjexrud|z=5000;t|s=9999|rg=1|1=J. T. Kjexrud|z=5000;t|s=9999|rg=1|1=J. T. Kjexrud|z=5000;t|s=9999|rg=1|1=J. T. Kjexrud|z=5000;t|s=9999|rg=1|1=V. Costa Moura|z=10000;t|s=9999|rg=1|1=V. Costa Moura|z=10000;t|s=9999|rg=1|1=V. Costa Moura|z=10000;t|s=9999|rg=1|1=V. Costa Moura|z=10000;t|s=9999|rg=1|1=V. Costa Moura|z=10000;t|s=9999|rg=1|1=V. Costa Moura|z=10000;t|s=9999|rg=1|1=V. Costa Moura|z=10000;t|s=9999|rg=1|1=V. Costa Moura|z=10000;t|s=9999|rg=1|1=V. Costa Moura|z=10000;t|s=9999|rg=1|1=V. Costa Moura|z=10000;t|s=9999|rg=1|1=V. Costa Moura|z=10000;t|s=9999|rg=1|1=V. Costa Moura|z=10000;t|s=9999|rg=1|1=V. Costa Moura|z=10000;t|s=9999|rg=1|1=V. Costa Moura|z=10000;t|s=9999|rg=1|1=A. G. Kolf|z=5000;t|s=9999|rg=1|1=J. T. Kjexrud|z=5000;t|s=9999|rg=1|1=J. T. Kjexrud|z=5000;t|s=9999|rg=1|1=J. T. Kjexrud|z=5000;t|s=9999|rg=1|1=J. T. Kjexrud|z=5000;t|s=9999|rg=1|1=A. G. Kolf|z=5000;t|s=9999|rg=1|1=W. Garner|z=5000;t|s=9999|rg=1|1=C. Burczyk|z=5000;41|r=8|D=6|rg=1|z=375000;51|r=8|D=14|rg=1|1=7% increased magic damage and critical strike chance|z=300000;61|r=8|D=10|rg=1|1=8% increased magic damage|2=8% increased movement speed|z=225000;d1|r=8|d=32|t=24|k=5.25|tp=200|tr=3|rg=1|z=216000;d1|r=8|d=60|t=28|k=7|tx=30|th=90|tr=3|rg=1|z=216000;|s=9999|r=8|rg=25|z=25000;t|s=9999|rg=1|z=150;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=150;t|s=9999|rg=1|z=300;d1|r=8|d=90|t=15|k=9|rg=1|1=A powerful returning hammer|z=500000;4v1|rg=1|z=50000;a1|r=5|rg=1|1=Allows flight and slow fall|z=400000;|s=9999|r=5|rg=1|z=125000;|s=9999|r=5|rg=1|z=125000;|s=9999|r=5|rg=1|z=125000;|s=9999|r=5|rg=1|z=125000;|s=9999|r=5|rg=1|z=125000;|s=9999|r=5|rg=1|z=125000;1|rg=1|1=For Capture the Gem. It drops when you die;1|rg=1|1=For Capture the Gem. It drops when you die;1|rg=1|1=For Capture the Gem. It drops when you die;1|rg=1|1=For Capture the Gem. It drops when you die;1|rg=1|1=For Capture the Gem. It drops when you die;1|rg=1|1=For Capture the Gem. It drops when you die;t|s=9999|rg=1|z=2500;t|s=9999|rg=1|z=2500;t|s=9999|rg=1|z=2500;t|s=9999|rg=1|z=2500;t|s=9999|rg=1|z=2500;|s=9999|r=8|rg=1|1=Unlocks a Jungle Chest in the dungeon;|s=9999|r=8|rg=1|1=Unlocks a Corruption Chest in the dungeon;|s=9999|r=8|rg=1|1=Unlocks a Crimson Chest in the dungeon;|s=9999|r=8|rg=1|1=Unlocks a Hallowed Chest in the dungeon;|s=9999|r=8|rg=1|1=Unlocks an Ice Chest in the dungeon;t|s=9999|rg=1|1=J. T. Kjexrud|z=5000;t|s=9999|rg=1|1=A. Craig|z=5000;t|s=9999|rg=1|1=A. Craig|z=5000;t|s=9999|rg=1|1=A. Craig|z=5000;t|s=9999|rg=1|1=A. Craig|z=5000;1|t=15|tr=3|rg=1|1=Used with paint to color blocks|2=Can also apply coatings|z=300000;1|t=15|tr=3|rg=1|1=Used with paint to color walls|2=Can also apply coatings|z=300000;1|t=15|tr=3|rg=1|1=Used to remove paint or coatings|2=Can sometimes collect moss|z=300000;41|r=8|D=11|rg=1|1=15% increased damage from bows|2=5% increased ranged critical strike chance|z=375000;41|r=8|D=11|rg=1|1=15% increased damage from guns|2=5% increased ranged critical strike chance|z=375000;41|r=8|D=11|rg=1|1=15% increased damage from specialist ranged weapons|2=These are launchers, dartguns, or anything else that doesnt shoot arrows/bullets|3=5% increased ranged critical strike chance|z=375000;51|r=8|D=24|rg=1|1=13% increased ranged damage & critical strike chance|2=20% chance to not consume ammo|z=300000;61|r=8|D=16|rg=1|1=7% increased ranged critical strike chance|2=12% increased movement speed|z=225000;t|s=9999|rg=1|1=Converts Chlorophyte Bars into Shroomite Bars|z=1000000;t|s=9999|r=7|rg=25|z=50000;r1|r=10|c=10|d=85|t=5|k=2.5|rg=1|1=66% chance to not consume ammo|2=It came from the edge of space|z=750000;4v1|r=9|rg=1|1=Great for impersonating devs!|z=250000;5v1|r=9|rg=1|1=Great for impersonating devs!|z=250000;6v1|r=9|rg=1|1=Great for impersonating devs!|z=250000;4v1|r=9|rg=1|1=Great for impersonating devs!|z=250000;5v1|r=9|rg=1|1=Great for impersonating devs!|z=250000;6v1|r=9|rg=1|1=Great for impersonating devs!|z=250000;4v1|r=9|rg=1|1=Great for impersonating devs!|z=250000;5v1|r=9|rg=1|1=Great for impersonating devs!|z=250000;6v1|r=9|rg=1|1=Great for impersonating devs!|z=250000;4v1|r=9|rg=1|1=Great for impersonating devs!|z=250000;5v1|r=9|rg=1|1=Great for impersonating devs!|z=250000;6v1|r=9|rg=1|1=Great for impersonating devs!|z=250000;4v1|r=9|rg=1|1=Great for impersonating devs!|z=250000;5v1|r=9|rg=1|1=Great for impersonating devs!|z=250000;6v1|r=9|rg=1|1=Great for impersonating devs!|z=250000;d1|r=8|d=29|t=16|k=2.75|rg=1|1=Rapidly throw life stealing daggers|z=1000000;|s=9999|r=8|rg=1|z=375000;d1|r=8|d=70|t=20|k=5|rg=1|1=A powerful javelin that unleashes tiny eaters|z=1000000;sS1|r=8|d=100|t=30|k=7.5|m=20|rg=1|1=Summons a sentry|2=Summons a powerful frost hydra to spit ice at your enemies|z=1000000;t|s=9999|rg=1|1=W. Garner|z=5000;t|s=9999|rg=1|1=W. Garner|z=5000;t|s=9999|rg=1|1=W. Garner|z=5000;t|s=9999|rg=1|1=D. Phelps|z=5000;t|s=9999|rg=1|1=M. J. Duncan|z=5000;a1|r=3|rg=1|1=Releases bees, douses the user in honey and increases movement speed when damaged|z=100000;a1|rg=1|1=The wearer can run super fast|z=50000;4v1|r=9|rg=1|1=Great for impersonating devs!|z=250000;5v1|r=9|rg=1|1=Great for impersonating devs!|z=250000;6v1|r=9|rg=1|1=Great for impersonating devs!|z=250000;a1|r=9|rg=1|1=Great for impersonating devs!|2=Allows flight and slow fall|z=400000;a1|r=9|rg=1|1=Great for impersonating devs!|2=Allows flight and slow fall|z=400000;a1|r=9|rg=1|1=Great for impersonating devs!|2=Allows flight and slow fall|z=400000;a1|r=9|rg=1|1=Great for impersonating devs!|2=Allows flight and slow fall|z=400000;5v1|r=9|rg=1|1=Great for impersonating devs!|z=250000;6v1|r=9|rg=1|1=Great for impersonating devs!|z=250000;t|s=9999|rg=100;w|s=9999|rg=400;t|s=9999|rg=100;w|s=9999|rg=400;t|s=9999|rg=100;w|s=9999|rg=400;a1|r=2|rg=1|1=Increases maximum mana by 20|2=Restores mana when damaged|z=100000;at1|r=4|rg=1|z=100000;at1|r=4|rg=1|z=100000;at1|r=4|rg=1|z=100000;at1|r=4|rg=1|z=100000;at1|r=4|rg=1|z=100000;at1|r=4|rg=1|z=100000;at1|r=4|rg=1|z=100000;at1|r=4|rg=1|z=100000;at1|r=4|rg=1|z=100000;at1|r=4|rg=1|z=100000;at1|r=4|rg=1|z=100000;at1|r=4|rg=1|z=100000;at1|r=4|rg=1|z=100000;at1|r=4|rg=1|z=100000;at1|r=4|rg=1|z=100000;|s=9999|r=5|rg=1|z=125000;a1|r=6|rg=1|1=Grants immunity to most debuffs|z=150000;a1|r=7|D=4|rg=1|1=Grants immunity to knockback and fire blocks|2=Grants immunity to most debuffs|z=250000;rb|s=9999|d=1|k=1.5|rg=99|z=7;t|s=9999|rg=1|1=Nearby players get a bonus against: Angler Fish|z=1000;t|s=9999|rg=1|1=Nearby players get a bonus against: Angry Nimbus|z=1000;t|s=9999|rg=1|1=Nearby players get a bonus against: Anomura Fungus|z=1000;t|s=9999|rg=1|1=Nearby players get a bonus against: Antlion|z=1000;t|s=9999|rg=1|1=Nearby players get a bonus against: Arapaima|z=1000;t|s=9999|rg=1|1=Nearby players get a bonus against: Armored Skeleton|z=1000;t|s=9999|rg=1|1=Nearby players get a bonus against: Cave Bat|z=1000;t|s=9999|rg=1|1=Nearby players get a bonus against: Bird|z=1000;t|s=9999|rg=1|1=Nearby players get a bonus against: Black Recluse|z=1000;t|s=9999|rg=1|1=Nearby players get a bonus against: Blood Feeder|z=1000;t|s=9999|rg=1|1=Nearby players get a bonus against: Blood Jelly|z=1000;t|s=9999|rg=1|1=Nearby players get a bonus against: Blood Crawler|z=1000;t|s=9999|rg=1|1=Nearby players get a bonus against: Bone Serpent|z=1000;t|s=9999|rg=1|1=Nearby players get a bonus against: Bunny|z=1000;t|s=9999|rg=1|1=Nearby players get a bonus against: Chaos Elemental|z=1000;t|s=9999|rg=1|1=Nearby players get a bonus against: Mimic|z=1000;t|s=9999|rg=1|1=Nearby players get a bonus against: Clown|z=1000;t|s=9999|rg=1|1=Nearby players get a bonus against: Corrupt Bunny|z=1000;t|s=9999|rg=1|1=Nearby players get a bonus against: Corrupt Goldfish|z=1000;t|s=9999|rg=1|1=Nearby players get a bonus against: Crab|z=1000;t|s=9999|rg=1|1=Nearby players get a bonus against: Crimera|z=1000;t|s=9999|rg=1|1=Nearby players get a bonus against: Crimson Axe|z=1000;t|s=9999|rg=1|1=Nearby players get a bonus against: Cursed Hammer|z=1000;t|s=9999|rg=1|1=Nearby players get a bonus against: Demon|z=1000;t|s=9999|rg=1|1=Nearby players get a bonus against: Demon Eye|z=1000;t|s=9999|rg=1|1=Nearby players get a bonus against: Derpling|z=1000;t|s=9999|rg=1|1=Nearby players get a bonus against: Eater of Souls|z=1000;t|s=9999|rg=1|1=Nearby players get a bonus against: Enchanted Sword|z=1000;t|s=9999|rg=1|1=Nearby players get a bonus against: Frozen Zombie|z=1000;t|s=9999|rg=1|1=Nearby players get a bonus against: Face Monster|z=1000;t|s=9999|rg=1|1=Nearby players get a bonus against: Floaty Gross|z=1000;t|s=9999|rg=1|1=Nearby players get a bonus against: Flying Fish|z=1000;t|s=9999|rg=1|1=Nearby players get a bonus against: Flying Snake|z=1000;t|s=9999|rg=1|1=Nearby players get a bonus against: Frankenstein|z=1000;t|s=9999|rg=1|1=Nearby players get a bonus against: Fungi Bulb|z=1000;t|s=9999|rg=1|1=Nearby players get a bonus against: Fungo Fish|z=1000;t|s=9999|rg=1|1=Nearby players get a bonus against: Gastropod|z=1000;t|s=9999|rg=1|1=Nearby players get a bonus against: Goblin Thief|z=1000;t|s=9999|rg=1|1=Nearby players get a bonus against: Goblin Sorcerer|z=1000;t|s=9999|rg=1|1=Nearby players get a bonus against: Goblin Peon|z=1000;t|s=9999|rg=1|1=Nearby players get a bonus against: Goblin Scout|z=1000;t|s=9999|rg=1|1=Nearby players get a bonus against: Goblin Warrior|z=1000;t|s=9999|rg=1|1=Nearby players get a bonus against: Goldfish|z=1000;t|s=9999|rg=1|1=Nearby players get a bonus against: Harpy|z=1000;t|s=9999|rg=1|1=Nearby players get a bonus against: Hellbat|z=1000;t|s=9999|rg=1|1=Nearby players get a bonus against: Herpling|z=1000;t|s=9999|rg=1|1=Nearby players get a bonus against: Hornet|z=1000;t|s=9999|rg=1|1=Nearby players get a bonus against: Ice Elemental|z=1000;t|s=9999|rg=1|1=Nearby players get a bonus against: Icy Merman|z=1000;t|s=9999|rg=1|1=Nearby players get a bonus against: Fire Imp|z=1000;t|s=9999|rg=1|1=Nearby players get a bonus against: Blue Jellyfish|z=1000;t|s=9999|rg=1|1=Nearby players get a bonus against: Jungle Creeper|z=1000;t|s=9999|rg=1|1=Nearby players get a bonus against: Lihzahrd|z=1000;t|s=9999|rg=1|1=Nearby players get a bonus against: Man Eater|z=1000;t|s=9999|rg=1|1=Nearby players get a bonus against: Meteor Head|z=1000;t|s=9999|rg=1|1=Nearby players get a bonus against: Moth|z=1000;t|s=9999|rg=1|1=Nearby players get a bonus against: Mummy|z=1000;t|s=9999|rg=1|1=Nearby players get a bonus against: Mushi Ladybug|z=1000;t|s=9999|rg=1|1=Nearby players get a bonus against: Parrot|z=1000;t|s=9999|rg=1|1=Nearby players get a bonus against: Pigron|z=1000;t|s=9999|rg=1|1=Nearby players get a bonus against: Piranha|z=1000;t|s=9999|rg=1|1=Nearby players get a bonus against: Pirate Deckhand|z=1000;t|s=9999|rg=1|1=Nearby players get a bonus against: Pixie|z=1000;t|s=9999|rg=1|1=Nearby players get a bonus against: Raincoat Zombie|z=1000;t|s=9999|rg=1|1=Nearby players get a bonus against: Reaper|z=1000;t|s=9999|rg=1|1=Nearby players get a bonus against: Shark|z=1000;t|s=9999|rg=1|1=Nearby players get a bonus against: Skeleton|z=1000;t|s=9999|rg=1|1=Nearby players get a bonus against: Dark Caster|z=1000;t|s=9999|rg=1|1=Nearby players get a bonus against: Blue Slime|z=1000;t|s=9999|rg=1|1=Nearby players get a bonus against: Snow Flinx|z=1000;t|s=9999|rg=1|1=Nearby players get a bonus against: Wall Creeper|z=1000;t|s=9999|rg=1|1=Nearby players get a bonus against: Spore Zombie|z=1000;t|s=9999|rg=1|1=Nearby players get a bonus against: Swamp Thing|z=1000;t|s=9999|rg=1|1=Nearby players get a bonus against: Giant Tortoise|z=1000;t|s=9999|rg=1|1=Nearby players get a bonus against: Toxic Sludge|z=1000;t|s=9999|rg=1|1=Nearby players get a bonus against: Umbrella Slime|z=1000;t|s=9999|rg=1|1=Nearby players get a bonus against: Unicorn|z=1000;t|s=9999|rg=1|1=Nearby players get a bonus against: Vampire|z=1000;t|s=9999|rg=1|1=Nearby players get a bonus against: Vulture|z=1000;t|s=9999|rg=1|1=Nearby players get a bonus against: Nymph|z=1000;t|s=9999|rg=1|1=Nearby players get a bonus against: Werewolf|z=1000;t|s=9999|rg=1|1=Nearby players get a bonus against: Wolf|z=1000;t|s=9999|rg=1|1=Nearby players get a bonus against: World Feeder|z=1000;t|s=9999|rg=1|1=Nearby players get a bonus against: Giant Worm|z=1000;t|s=9999|rg=1|1=Nearby players get a bonus against: Wraith|z=1000;t|s=9999|rg=1|1=Nearby players get a bonus against: Wyvern|z=1000;t|s=9999|rg=1|1=Nearby players get a bonus against: Zombie|z=1000;t|s=9999|rg=200;t|s=9999|rg=1|z=150;t|s=9999|rg=1|z=100000;t|s=9999|rg=1|z=100000;t|s=9999|rg=1|z=150;t|s=9999|rg=1|z=150;t|s=9999|rg=1|z=150;t|s=9999|rg=1|z=200;t|s=9999|rg=1|z=100000;t|s=9999|rg=1|z=200;t|s=9999|rg=1|z=200;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=100000;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=2000;t|s=9999|rg=1|z=100000;t|s=9999|rg=1|z=2000;t|s=9999|rg=1|z=2000;w|s=9999|rg=400;a1|r=2|rg=1|1=Allows the holder to double jump|z=50000;t|s=9999|rg=100|z=125;w|s=9999|rg=400;t|s=9999|rg=100;w|s=9999|rg=400;t|s=9999|rg=100;w|s=9999|rg=400;41|D=2|rg=1;51|D=3|rg=1;61|D=2|rg=1;1;1;4v1|rg=1|z=30000;5v1|rg=1|z=30000;6v1|rg=1|z=30000;4v1|rg=1|z=30000;4v1|rg=1|z=30000;5v1|rg=1|z=30000;4v1|rg=1|z=30000;4v1|rg=1|z=30000;5v1|rg=1|z=30000;6v1|rg=1|z=30000;4v1|rg=1|z=30000;5v1|rg=1|z=30000;6v1|rg=1|z=30000;4v1|rg=1|z=30000;5v1|rg=1|z=30000;6v1|rg=1|z=30000;4v1|rg=1|z=30000;5v1|rg=1|z=30000;4v1|rg=1|z=30000;5v1|rg=1|z=30000;6v1|rg=1|z=30000;4v1|rg=1|z=30000;5v1|rg=1|z=30000;6v1|rg=1|z=30000;4v1|rg=1|z=30000;5v1|rg=1|z=30000;6v1|rg=1|z=30000;4v1|rg=1|z=30000;5v1|rg=1|z=30000;6v1|rg=1|z=30000;4v1|rg=1|z=30000;4v1|rg=1|1=To me it look like a leprechaun to me|z=30000;5v1|rg=1|1=I just wanna know where the gold at!|z=30000;6v1|rg=1|1=I want the gold. I want the gold. I want the gold. Gimme the gold!|z=30000;5v1|rg=1|z=30000;6v1|rg=1|z=30000;4v1|rg=1|z=30000;5v1|rg=1|z=30000;|s=9999|r=3|rg=10|1=Right Click to open|z=50000;5v1|rg=1|z=30000;6v1|rg=1|z=30000;4v1|rg=1|z=30000;5v1|rg=1|z=30000;4v1|rg=1|z=30000;5v1|rg=1|z=30000;6v1|rg=1|z=30000;r1|r=8|c=6|d=44|t=9|k=2|rg=1|1=33% chance to not consume ammo|z=500000;rb|s=9999|d=9|k=1.5|rg=99|z=5;r1|r=8|c=6|d=65|t=25|k=5|rg=1|z=500000;rb|s=9999|d=60|k=3|rg=99|z=15;d1|d=9|t=24|k=2.25|rg=1|1=Allows the collection of hay from grass|z=6000;c|s=9999|r=2|t=17|rg=5|1=Medium improvements to all stats|2=Stuff it all up in one bite!|z=1000;4v1|rg=1|z=30000;5v1|rg=1|z=30000;6v1|rg=1|z=30000;t|s=9999|rg=1|z=15000;t|s=9999|rg=1|z=150;t|s=9999|rg=1|z=200;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=150;t|s=9999|rg=200;a1|r=7|rg=1|1=Allows flight and slow fall|z=400000;1|r=3|t=20|rg=1|1=Summons a pet spider|z=100000;1|r=3|t=20|rg=1|1=Summons a pet squashling|z=100000;1|r=3|t=20|k=7|rg=1|z=75000;m1|r=8|d=45|t=12|k=3|m=6|rg=1|1=Summons bats to attack your enemies|z=500000;s1|r=8|d=55|t=28|k=3|m=10|rg=1|1=Summons a raven to fight for you|z=500000;|s=9999|r=8|rg=1|1=Unlocks a Jungle Chest in the dungeon;|s=9999|r=8|rg=1|1=Unlocks a Corruption Chest in the dungeon;|s=9999|r=8|rg=1|1=Unlocks a Crimson Chest in the dungeon;|s=9999|r=8|rg=1|1=Unlocks a Hallowed Chest in the dungeon;|s=9999|r=8|rg=1|1=Unlocks an Ice Chest in the dungeon;t|s=9999|rg=1;rc|s=9999|d=13|t=19|k=6.5|rg=99|1=Best used for pranking townsfolk;1|r=3|t=20|rg=1|1=Summons a black kitty|z=100000;|s=9999|r=5|rg=1|z=125000;t|s=9999|rg=1;t|s=9999|rg=1;t|s=9999|rg=1|z=150;t|s=9999|rg=1|z=200;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=150;t|s=9999|rg=200;4v1|rg=1|z=30000;5v1|rg=1|z=30000;4v1|rg=1|z=30000;5v1|rg=1|z=30000;6v1|rg=1|z=30000;4v1|rg=1|z=30000;d1|r=2|d=20|t=15|k=5|rg=1|z=50000;d1|r=8|d=150|t=26|k=7.5|rg=1|1=Summons Pumpkin heads to attack your enemies|z=500000;d1|r=2|d=14|t=8|k=4|rg=1|z=50000;t|s=9999|rg=25|z=250;1|r=7|t=20|k=7|rg=1|z=200000;a1|r=7|rg=1|1=Allows flight and slow fall|z=400000;|s=9999|r=5|rg=1|z=125000;41|r=8|D=9|rg=1|1=Increases your max number of minions by 1|2=Increases summon damage by 11%|z=50000;51|r=8|D=11|rg=1|1=Increases your max number of minions by 2|2=Increases summon damage by 11%|z=50000;61|r=8|D=10|rg=1|1=Increases your max number of minions by 1|2=Increases summon damage by 11%|3=20% increased movement speed|z=50000;r1|r=8|c=10|d=75|t=12|k=6.5|rg=1|z=500000;rb|s=9999|d=25|k=4.5|rg=99|z=15;1|r=3|t=20|rg=1|1=Summons a cursed sapling to follow you|z=100000;4v1|rg=1|z=30000;5v1|rg=1|z=30000;6v1|rg=1|z=30000;4v1|rg=1|z=30000;5v1|rg=1|z=30000;6v1|rg=1|z=30000;c|s=9999|r=8|t=45|rg=3|1=Summons the Pumpkin Moon;a1|r=8|rg=1|1=Increases your max number of minions by 1|2=Increases summon damage by 10%|z=200000;t|s=9999|rg=1|1=V. Costa Moura|z=5000;t|s=9999|rg=1|1=J. Hayes|z=5000;t|s=9999|rg=1|1=J. Hayes|z=5000;t|s=9999|rg=1|1=J. Hayes|z=5000;t|s=9999|rg=1|1=J. Hayes|z=5000;5v1|rg=1|z=30000;6v1|rg=1|z=30000;5v1|rg=1|z=30000;6v1|rg=1|z=30000;t|s=9999|rg=1|z=50000;t|s=9999|rg=1|z=50000;4v1|r=3|rg=1|z=250000;a1|r=7|rg=1|1=Increases view range for guns (Right Click to zoom out)|2=10% increased ranged damage and critical strike chance|z=300000;t|s=9999|r=2|rg=1|1=Increases life regeneration when placed nearby|z=75000;a1|r=5|rg=1|1=Grants the ability to swim and greatly extends underwater breathing|2=Generates a very subtle glow which becomes more vibrant underwater|z=150000;a1|r=6|rg=1|1=Grants the ability to swim and greatly extends underwater breathing|2=Provides extra mobility on ice|3=Generates a very subtle glow which becomes more vibrant underwater|z=250000;a1|r=7|rg=1|1=Allows flight, super fast running, and extra mobility on ice|2=8% increased movement speed|z=350000;a1|r=4|rg=1|1=Allows the holder to double jump|2=Increases jump height|z=150000;a1|r=8|rg=1|1=Increases your max number of minions by 1|2=Increases your summon damage by 15% and the knockback of your minions|z=250000;a1|r=7|rg=1|1=Minor increase to damage, melee speed, critical strike chance,|2=life regeneration, defense, mining speed, and minion knockback|z=400000;a1|r=5|rg=1|1=Allows flight and slow fall|2=Press Down to toggle hover|3=Press Up to deactivate hover|z=400000;1;1;t|s=9999|rg=10|1=Right Click to open;r1|d=20|t=38|k=3.75|rg=1|1=Dont shoot your eye out!|z=100000;a1|r=5|rg=1|1=Allows flight and slow fall|z=400000;t|s=9999|rg=100;t|s=9999|rg=1|z=2500;c|s=9999|t=15|rg=1|1=Placeable on a christmas tree|z=500;c|s=9999|t=15|rg=1|1=Placeable on a christmas tree|z=500;c|s=9999|t=15|rg=1|1=Placeable on a christmas tree|z=500;c|s=9999|t=15|rg=1|1=Placeable on a christmas tree|z=500;c|s=9999|t=15|rg=1|1=Placeable on a christmas tree|z=500;c|s=9999|t=15|rg=1|1=Placeable on a christmas tree|z=500;c|s=9999|t=15|rg=1|1=Placeable on a christmas tree|z=500;c|s=9999|t=15|rg=1|1=Placeable on a christmas tree|z=500;c|s=9999|t=15|rg=1|1=Placeable on a christmas tree|z=500;c|s=9999|t=15|rg=1|1=Placeable on a christmas tree|z=500;c|s=9999|t=15|rg=1|1=Placeable on a christmas tree|z=500;c|s=9999|t=15|rg=1|1=Placeable on a christmas tree|z=500;c|s=9999|t=15|rg=1|1=Placeable on a christmas tree|z=500;c|s=9999|t=15|rg=1|1=Placeable on a christmas tree|z=500;c|s=9999|t=15|rg=1|1=Placeable on a christmas tree|z=500;c|s=9999|t=15|rg=1|1=Placeable on a christmas tree|z=500;c|s=9999|t=15|rg=1|1=Placeable on a christmas tree|z=500;c|s=9999|t=15|rg=1|1=Placeable on a christmas tree|z=500;c|s=9999|t=15|rg=1|1=Placeable on a christmas tree|z=500;c|s=9999|t=15|rg=1|1=Placeable on a christmas tree|z=500;c|s=9999|t=15|rg=1|1=Placeable on a christmas tree|z=500;c|s=9999|t=15|rg=1|1=Placeable on a christmas tree|z=500;c|s=9999|t=15|rg=1|1=Placeable on a christmas tree|z=500;c|s=9999|t=15|rg=1|1=Placeable on a christmas tree|z=500;c|s=9999|t=15|rg=1|1=Placeable on a christmas tree|z=500;c|s=9999|t=15|rg=1|1=Placeable on a christmas tree|z=500;c|s=9999|t=15|rg=1|1=Placeable on a christmas tree|z=500;c|s=9999|t=15|rg=1|1=Placeable on a christmas tree|z=500;c|s=9999|t=15|rg=1|1=Placeable on a christmas tree|z=500;c|s=9999|t=15|rg=1|1=Placeable on a christmas tree|z=500;c|s=9999|t=15|rg=1|1=Placeable on a christmas tree|z=500;c|s=9999|t=15|rg=1|1=Placeable on a christmas tree|z=500;4v1|rg=1|z=10000;4v1|rg=1|z=10000;t|s=9999|rg=1|z=5000;d1|d=19|t=27|k=5.3|rg=1|z=13500;r1|r=8|d=53|t=30|k=0.425|rg=1|1=Uses gel for ammo|2=Ignores 15 points of enemy Defense|z=500000;c|s=9999|r=3|t=17|rg=5|1=Major improvements to all stats|2=A cozy treat by the fireplace.|z=1000;c|s=9999|hl=80|t=17|rg=30|z=40;rc|s=9999|d=14|t=15|rg=99|z=25;1|r=8|t=20|rg=1|1=Summons a rideable reindeer|z=250000;1|r=7|t=20|k=7|rg=1|z=100000;1|r=7|t=20|k=7|rg=1|z=200000;d1|d=7|t=20|k=2.5|tp=55|rg=1|1=Can mine Meteorite|z=10000;d1|d=19|t=15|k=8|rg=1|z=50000;c|s=9999|r=3|t=17|rg=5|1=Major improvements to all stats|2=Youll bounce off the walls!|z=2500;c|s=9999|r=3|t=17|rg=5|1=Major improvements to all stats|2=Not the gumdrop buttons!|z=2500;a1|r=2|rg=1|1=Provides immunity to chill and freezing effects|z=50000;1|rg=1|1=Youve been naughty this year;a1|r=2|rg=1|1=Increases block placement & tool range by 1|z=50000;t|s=9999|rg=1|z=200;t|s=9999|rg=1|z=150;t|s=9999|rg=1|z=300;1|r=3|t=20|rg=1|1=Summons a Puppy;d1|r=8|d=86|t=23|k=7|rg=1|1=Shoots Christmas ornaments|z=500000;r1|r=8|d=31|t=4|k=1.75|rg=1|1=50% chance to not consume ammo|z=450000;m1|r=8|d=48|t=8|k=3.25|m=5|rg=1|1=Shoots razor sharp pine needles|z=450000;m1|r=8|d=58|k=4.5|m=9|rg=1|1=Showers an area with icicles|z=450000;4v1|rg=1|z=30000;5v1|rg=1|z=30000;6v1|rg=1|z=30000;4v1|rg=1|z=30000;5v1|rg=1|z=30000;6v1|rg=1|z=30000;4v1|rg=1|z=30000;5v1|rg=1|z=30000;4v1|rg=1|z=30000;5v1|rg=1|z=30000;6v1|rg=1|z=30000;4v1|rg=1|z=30000;5v1|rg=1|z=30000;6v1|rg=1|z=30000;r1|r=8|d=67|t=15|k=4|rg=1|1=Launches homing missiles|z=450000;d1|r=7|d=73|t=30|k=6.7|rg=1|1=Shoots an icy spear that rains snowflakes|z=450000;w|s=9999|rg=400|z=75;w|s=9999|rg=400|z=75;w|s=9999|rg=400|z=75;w|s=9999|rg=400|z=75;w|s=9999|rg=400|z=75;w|s=9999|rg=400|z=75;w|s=9999|rg=400|z=75;w|s=9999|rg=400|z=75;w|s=9999|rg=400|z=75;w|s=9999|rg=400|z=75;c|s=9999|r=8|t=45|rg=3|1=Summons the Frost Moon;1|r=3|t=20|rg=1|1=Summons a Baby Grinch|z=100000;t|s=9999|rg=1|z=50000;t|s=9999|rg=1|z=50000;t|s=9999|rg=1|z=50000;at1|r=4|rg=1|z=100000;at1|r=4|rg=1|z=100000;at1|r=4|rg=1|z=100000;|s=9999|rg=100|z=25;|s=9999|rg=100|z=50;|s=9999|rg=100|z=75;|s=9999|rg=3|z=10000;t|s=9999|rg=100;t|s=9999|rg=100;t|s=9999|rg=100;t|s=9999|rg=100;t|s=9999|rg=100;t|s=9999|rg=100;t|s=9999|rg=100;c|s=9999|r=2|t=17|rg=1|z=50000;c|s=9999|r=2|t=17|rg=1|z=50000;c|s=9999|r=2|t=17|rg=1|z=50000;c|s=9999|r=2|t=17|rg=1|z=100000;c|s=9999|r=2|t=17|rg=1|z=50000;c|s=9999|r=2|t=17|rg=1|z=50000;c|s=9999|r=2|t=17|rg=1|z=50000;c|s=9999|r=2|t=17|rg=1|z=75000;c|s=9999|r=2|t=17|rg=1|z=150000;c|s=9999|r=2|t=17|rg=1|z=50000;av1|r=5|rg=1|z=400000;4v1|rg=1|1=Fezzes are cool|z=35000;t|s=9999|rg=1|1=Right Click to customize attire;c|s=9999|r=2|t=17|rg=1|z=20000;1|t=25|rg=1|1=Used to catch critters|z=2500;c|s=9999|t=15|rg=5|z=1500;t|s=9999|rg=1;c|s=9999|t=15|rg=5|z=2500;c|s=9999|r=2|t=15|rg=5|z=37500;c|s=9999|r=2|t=15|rg=5|z=20000;c|s=9999|t=15|rg=5|z=10000;c|s=9999|t=15|rg=5|z=5000;c|s=9999|r=3|t=15|rg=5|z=50000;c|s=9999|t=15|rg=5|z=7500;c|s=9999|t=15|rg=5|z=15000;c|s=9999|t=15|rg=5|z=2500;c|s=9999|t=15|rg=5|z=5000;c|s=9999|r=2|t=15|rg=5|z=2500;t|s=9999|rg=1;c|s=9999|t=15|rg=5|z=5000;c|s=9999|t=15|rg=5|z=25000;w|s=9999|rg=400|z=75;w|s=9999|rg=400|z=75;w|s=9999|rg=400|z=75;w|s=9999|rg=400|z=75;w|s=9999|rg=400|z=75;w|s=9999|rg=400|z=75;w|s=9999|rg=400|z=75;c|s=9999|t=15|rg=5|z=2500;c|s=9999|t=15|rg=5|z=3750;c|s=9999|t=15|rg=5|z=3750;c|s=9999|t=15|rg=5|z=2500;c|s=9999|t=15|rg=5|z=2500;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=150;t|s=9999|rg=1|z=150;t|s=9999|rg=1|z=150;t|s=9999|rg=1|z=150;t|s=9999|rg=1|z=150;t|s=9999|rg=1|z=150;t|s=9999|rg=1|z=150;t|s=9999|rg=1|z=150;t|s=9999|rg=1|z=150;t|s=9999|rg=1|z=150;t|s=9999|rg=1|z=150;t|s=9999|rg=1|z=150;t|s=9999|rg=1|z=200;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=3000;t|s=9999|rg=1|z=3000;t|s=9999|rg=1|z=3000;t|s=9999|rg=1|z=3000;t|s=9999|rg=1|z=3000;t|s=9999|rg=1|z=3000;t|s=9999|rg=1|z=3000;t|s=9999|rg=1|z=3000;t|s=9999|rg=1|z=3000;t|s=9999|rg=1|z=3000;t|s=9999|rg=1|z=3000;t|s=9999|rg=1|z=2000;t|s=9999|rg=1|z=2000;t|s=9999|rg=1|z=2000;t|s=9999|rg=1|z=2000;t|s=9999|rg=1|z=2000;t|s=9999|rg=1|z=2000;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=500;t|s=9999|rg=1|z=500;t|s=9999|rg=1|z=500;t|s=9999|rg=1|z=500;t|s=9999|rg=1|z=500;t|s=9999|rg=1|z=500;t|s=9999|rg=1|z=500;t|s=9999|rg=1|z=500;t|s=9999|rg=1|z=500;t|s=9999|rg=1|z=500;t|s=9999|rg=1|z=1500;t|s=9999|rg=1|z=1500;t|s=9999|rg=1|z=1500;t|s=9999|rg=1|z=1500;t|s=9999|rg=1|z=1500;t|s=9999|rg=1|z=1500;t|s=9999|rg=1|z=1500;t|s=9999|rg=1|z=1500;t|s=9999|rg=1|z=1500;t|s=9999|rg=1|z=1500;t|s=9999|rg=1|z=1500;t|s=9999|rg=1|z=1500;4v1|rg=1|z=37500;4v1|rg=1|z=37500;4v1|rg=1|z=37500;4v1|rg=1|z=37500;4v1|rg=1|z=37500;4v1|rg=1|z=37500;4v1|rg=1|z=37500;4v1|rg=1|z=37500;4v1|rg=1|z=37500;4v1|rg=1|z=37500;t|s=9999|rg=1|z=2500;t|s=9999|rg=1|z=2500;t|s=9999|rg=1|z=2500;t|s=9999|rg=1|z=2500;t|s=9999|rg=1|z=2500;t|s=9999|rg=100;t|s=9999|rg=100;c|s=9999|t=15|rg=5|z=5000;c|s=9999|t=15|rg=5|z=3750;c|s=9999|t=15|rg=5|z=3750;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=500;t|s=9999|rg=1|z=500;t|s=9999|rg=1|z=500;t|s=9999|rg=1|z=500;t|s=9999|rg=1|z=100000;t|s=9999|rg=1|z=500;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=100000;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=2000;t|s=9999|rg=1|z=2000;t|s=9999|rg=1|z=3000;t|s=9999|rg=1|z=3000;t|s=9999|rg=1|z=100000;t|s=9999|rg=1|z=3000;t|s=9999|rg=1|z=150;t|s=9999|rg=1|z=150;t|s=9999|rg=1|z=100000;t|s=9999|rg=1|z=150;t|s=9999|rg=1|z=1500;t|s=9999|rg=1|z=1500;t|s=9999|rg=1|z=100000;t|s=9999|rg=1|z=1500;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=100000;c|s=9999|t=15|rg=5|z=7500;c|s=9999|t=15|rg=5|z=7500;w|s=9999|rg=400|z=75;w|s=9999|rg=400|z=75;w|s=9999|rg=400|z=75;|s=9999|r=5|rg=3|z=50000;t|s=9999|rg=1;t|s=9999|rg=1;t|s=9999|rg=1;t|s=9999|rg=1;t|s=9999|rg=1;t|s=9999|rg=1;t|s=9999|rg=1;w|s=9999|rg=400;w|s=9999|rg=400;t|s=9999|rg=25|z=500;t|s=9999|rg=1|1=Used for advanced crafting|z=500;t|s=9999|rg=100;t|s=9999|rg=1;t|s=9999|rg=1;d1|r=8|d=45|t=12|k=6|tp=200|tx=25|rg=1|z=200000;t|s=9999|r=6|rg=1|1=Reduces ammo usage by 20%|z=100000;t|s=9999|rg=1;t|s=9999|rg=1;t|s=9999|rg=1;t|s=9999|rg=1;t|s=9999|rg=1;t|s=9999|rg=1;t|s=9999|rg=1;t|s=9999|rg=1;t|s=9999|rg=1;t|s=9999|rg=1;m1|r=7|d=44|t=30|k=7|m=25|rg=1|1=Shoots a venom fang that pierces multiple enemies|z=350000;41|r=8|D=18|rg=1|1=Increases maximum mana by 60 and reduces mana usage by 13%|2=10% increased magic damage and critical strike chance|z=375000;t|s=9999|rg=1;t|s=9999|rg=1;t|s=9999|rg=1|1=Used for special crafting|z=100000;t|s=9999|rg=1|1=Used for special crafting|z=100000;t|s=9999|rg=1|1=Used for special crafting|z=100000;t|s=9999|rg=1|1=Used for special crafting|z=100000;t|s=9999|rg=1|1=Used for special crafting|z=100000;t|s=9999|rg=1|1=Used for special crafting|z=100000;t|s=9999|rg=1|1=Used for special crafting|z=100000;41|r=8|D=23|rg=1|1=6% increased melee damage|2=Enemies are more likely to target you|z=300000;51|r=8|D=20|rg=1|1=8% increased melee damage and critical strike chance|2=6% increased movement and melee speed|z=240000;51|r=8|D=32|rg=1|1=5% increased melee damage and critical strike chance|2=Enemies are more likely to target you|z=240000;61|r=8|D=18|rg=1|1=6% increased movement and melee speed|2=Enemies are more likely to target you|z=180000;t|s=9999|rg=1|1=Used for special crafting|z=100000;t|s=9999|rg=1|1=Used for special crafting|z=100000;c|s=9999|t=15|rg=5|z=6250;t|s=9999|rg=1;t|s=9999|rg=1;|s=9999|rg=1;c|s=9999|r=4|hm=300|t=17|rg=30|z=1500;w|s=9999|rg=400;w|s=9999|rg=400;w|s=9999|rg=400;w|s=9999|rg=400;a1|r=3|rg=1|1=Increases tile placement speed|z=100000;a1|r=3|rg=1|1=Increases block placement & tool range by 3|z=100000;a1|r=3|rg=1|1=Automatically paints or coats placed objects|z=100000;a1|r=3|rg=1|1=Increases wall placement speed|z=100000;|s=9999|r=8|rg=25|z=25000;a1|r=4|rg=1|1=Increases pickup range for mana stars|z=150000;a1|r=5|rg=1|1=Increases pickup range for mana stars|2=15% increased magic damage|z=160000;a1|r=5|rg=1|1=Increases pickup range for mana stars|2=Restores mana when damaged|3=Increases maximum mana by 20|z=160000;4v1|rg=1|z=12500;r1|r=8|c=7|d=80|t=20|k=3|rg=1|1=Shoots a charged arrow|z=450000;t|s=9999|rg=1|z=160;t|s=9999|rg=1|z=120;t|s=9999|rg=1|z=200;t|s=9999|rg=1|z=120;t|s=9999|rg=1|z=150;t|s=9999|rg=1|z=150;t|s=9999|rg=1|z=320;t|s=9999|rg=1|z=600;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=20;t|s=9999|rg=1|z=20;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=100000;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=2000;t|s=9999|rg=1|z=20;t|s=9999|rg=1|z=20;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=2500;t|s=9999|rg=1|z=2500;t|s=9999|rg=1|z=150;t|s=9999|rg=1|z=150;t|s=9999|rg=1|z=150;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=20;t|s=9999|rg=1|z=5000;t|s=9999|rg=1|z=300;t|s=9999|rg=100|z=50;t|s=9999|rg=100|z=50;t|s=9999|rg=100|z=50;w|s=9999|rg=400;w|s=9999|rg=400;t|s=9999|rg=1|z=200;c|s=9999|t=17|rg=20|1=Minor improvements to melee stats & lowered defense|2=Drink too much of this, and you become karate master.|z=500;c|s=9999|r=2|t=17|rg=5|1=Medium improvements to all stats|2=Spicy level 5!|z=5500;c|s=9999|r=2|t=17|rg=5|1=Medium improvements to all stats|2=Pho sho...|z=7500;r1|r=2|c=5|d=20|t=22|k=4|rg=1|z=100000;r1|r=4|d=21|t=7|k=1.5|rg=1|1=50% chance to not consume ammo|2=Highly inaccurate|z=350000;w|s=9999|rg=400|z=250;1|t=20|rg=1|1=Squirts a harmless stream of water|z=15000;d1|c=15|d=18|t=20|k=3.5|rg=1|z=100000;t|s=9999|rg=100|z=300;41|r=2|D=2|rg=1|1=6% increased magic damage and critical strike chance|z=30000;av1|r=8|rg=1|z=2000000;51|D=4|rg=1|1=5% increased damage and critical strike chance|2=10% increased melee and movement speed|z=20000;5v1|rg=1|z=10000;51|D=2|rg=1|1=6% increased magic damage and critical strike chance|2=Reduces mana usage by 10%|z=35000;a1|r=7|rg=1|1=Allows flight and slow fall|z=400000;t|s=9999|rg=1|z=10000;t|s=9999|rg=1|z=10000;t|s=9999|rg=1|z=10000;av1|r=5|rg=1|z=50000;av1|r=5|rg=1|z=50000;av1|r=5|rg=1|z=50000;av1|r=5|rg=1|z=50000;t|s=9999|rg=1|z=150;1|t=8|tf=5|rg=1|z=300;|s=9999|rg=3|z=2500;1|t=8|tf=15|rg=1|z=12000;1|r=2|t=8|tf=30|rg=1|z=50000;1|t=8|tf=20|rg=1|z=120000;1|r=3|t=8|tf=50|rg=1|z=1000000;1|r=2|t=8|tf=35|rg=1|z=200000;1|r=2|t=8|tf=40|rg=1|z=350000;|s=9999|rg=3|z=2500;|s=9999|rg=3|z=3750;|s=9999|rg=3|z=3750;|s=9999|rg=3|z=3750;|s=9999|rg=3|z=3750;|s=9999|rg=3|1=Its colorful scales could sell well.|z=7500;|s=9999|rg=3|z=7500;|s=9999|rg=3|z=15000;|s=9999|rg=3|z=3750;|s=9999|rg=3|z=7500;|s=9999|r=2|rg=3|z=12500;|s=9999|r=4|rg=3|1=Quite shiny. This will probably sell well.|z=500000;|s=9999|rg=3|z=3750;|s=9999|r=3|rg=3|z=50000;|s=9999|rg=3|z=7500;|s=9999|r=2|rg=3|z=25000;|s=9999|rg=3|z=7500;c|s=9999|hl=120|t=17|rg=30|z=7500;|s=9999|r=2|rg=3|z=7500;|s=9999|rg=3|z=7500;|s=9999|r=4|rg=3|z=150000;|s=9999|rg=3|z=7500;|s=9999|rg=3|z=7500;d1|r=3|d=24|t=24|k=6|th=70|rg=1|z=75000;|s=9999|rg=3|z=12500;c|s=9999|t=17|rg=20|1=Increases mining speed by 25%|z=1000;c|s=9999|t=17|rg=20|1=Increases pickup range for life hearts|z=1000;c|s=9999|t=17|rg=20|1=Decreases enemy spawn rate|z=1000;c|s=9999|t=17|rg=20|1=Increases placement speed and range|z=1000;c|s=9999|t=17|rg=20|1=Increases knockback|z=1000;c|s=9999|t=17|rg=20|1=Lets you move swiftly in liquids|z=1000;c|s=9999|t=17|rg=20|1=Increases your max number of minions by 1|z=1000;c|s=9999|t=17|rg=20|1=Allows you to see nearby danger sources|z=1000;d1|d=35|t=35|k=8|rg=1|z=50000;d1|r=7|c=20|d=70|t=20|k=6.5|rg=1|z=50000;d1|r=2|d=19|t=20|k=4.25|rg=1|z=25000;w|s=9999|rg=400;t|s=9999|rg=10|1=Right Click to open|z=5000;t|s=9999|r=2|rg=10|1=Right Click to open|z=25000;t|s=9999|r=3|rg=10|1=Right Click to open|z=100000;c|s=9999|t=15|rg=1;c|s=9999|t=15|rg=1;c|s=9999|t=15|rg=1;t|s=9999|tr=5|rg=100|1=Hammer end piece to change bumper style|2=Hammer intersections to change direction;d1|r=3|d=16|t=22|k=3|tp=59|rg=1|z=75000;d1|r=3|d=13|t=15|k=2.25|tx=14|rg=1|z=75000;1|rg=1|1=Lets ride the rails|z=1000;c|s=9999|t=17|rg=20|1=20% chance to not consume ammo|z=1000;c|s=9999|t=17|rg=20|1=Increases max life by 20%|z=1000;c|s=9999|t=17|rg=20|1=Reduces damage taken by 10%|z=1000;c|s=9999|t=17|rg=20|1=Increases critical chance by 10%|z=1000;c|s=9999|t=17|rg=20|1=Ignites nearby enemies|z=1000;c|s=9999|t=17|rg=20|1=Increases damage by 10%|z=1000;c|s=9999|t=30|rg=20|1=Teleports you home|z=1000;c|s=9999|t=17|rg=20|1=Teleports you to a random location|z=1000;c|s=9999|t=15|rg=20|1=Throw this to make someone fall in love|z=200;c|s=9999|t=15|rg=20|1=Throw this to make someone smell terrible|z=200;c|s=9999|t=17|rg=20|1=Increases fishing power by 15|z=1000;c|s=9999|t=17|rg=20|1=Detects hooked fish|z=1000;c|s=9999|t=17|rg=20|1=Increases chance to get a crate|z=1000;t|s=9999|rg=25|z=80;|s=9999|rg=25|z=100;c|s=9999|t=17|rg=20|1=Reduces damage from cold sources|z=1000;1|r=3|t=20|rg=1|z=20000;41|r=3|D=4|rg=1|1=Increases summon damage by 4%|2=Increases your max number of minions by 1|z=45000;51|r=3|D=5|rg=1|1=Increases summon damage by 4%|2=Increases your max number of minions by 1|z=30000;61|r=3|D=4|rg=1|1=Increases summon damage by 5%|z=30000;s1|r=3|d=12|t=22|k=2|m=10|rg=1|1=Summons a hornet to fight for you|z=10000;s1|r=3|d=17|t=36|k=2|m=10|rg=1|1=Summons an imp to fight for you|z=10000;sS1|r=4|d=26|t=30|k=7.5|m=10|rg=1|1=Summons a sentry|2=Summons a spider queen to spit eggs at your enemies|z=250000;41|D=1|rg=1|1=Increases fishing power by 5|z=50000;51|D=2|rg=1|1=Increases fishing power by 5|z=50000;61|D=1|rg=1|1=Increases fishing power by 5|z=50000;41|r=4|D=5|rg=1|1=Increases your max number of minions by 1|2=Increases summon damage by 5%|z=37500;51|r=4|D=8|rg=1|1=Increases your max number of minions by 1|2=Increases summon damage by 5%|z=37500;61|r=4|D=7|rg=1|1=Increases your max number of minions by 1|2=Increases summon damage by 6%|z=37500;a1|rg=1|1=Fishing line will never break|z=50000;a1|rg=1|1=Increases fishing power by 10|z=50000;a1|rg=1|1=Decreases chance of bait consumption|z=50000;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=100000;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=100000;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=100000;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;4v1|rg=1|z=50000;5v1|rg=1|z=50000;6v1|rg=1|z=50000;1|r=3|t=20|rg=1|1=Summons a pet Zephyr Fish|z=150000;1|t=8|tf=22|rg=1|z=156000;1|r=3|t=8|tf=45|rg=1|1=Allows fishing in lava|z=500000;a1|rg=1|1=Increases jump speed and allows auto-jump|2=Increases fall resistance|z=50000;d1|r=3|d=70|t=20|k=8|rg=1|z=50000;c|s=9999|t=17|rg=5|1=Minor improvements to all stats|2=Wheres the chips!?|z=2500;c|s=9999|r=2|t=17|rg=5|1=Medium improvements to all stats|2=Barbecue it, boil it, broil it, bake it...|z=7500;c|s=9999|r=2|t=17|rg=5|1=Medium improvements to all stats|2=Its raw! Its exotic!|z=2500;1|r=8|t=20|rg=1|1=Summons a rideable Bunny mount|z=250000;1|r=8|t=20|rg=1|1=Summons a rideable Pigron mount|z=250000;1|r=8|t=20|rg=1|1=Summons a rideable Slime mount|z=250000;|s=9999|rg=25|z=100;w|s=9999|rg=400;w|s=9999|rg=400;w|s=9999|rg=400|z=50;t|s=9999|rg=100|z=50;c|s=9999|t=15|rg=3|z=175000;c|s=9999|t=15|rg=3|z=175000;c|s=9999|t=15|rg=3|z=175000;t|s=9999|rg=1;t|s=9999|rg=1;t|s=9999|rg=1;t|s=9999|rg=1|z=25000;t|s=9999|rg=1|z=25000;t|s=9999|rg=1|z=25000;t|s=9999|rg=1|z=25000;t|s=9999|rg=1|z=25000;t|s=9999|rg=1|z=25000;t|s=9999|rg=1|z=25000;t|s=9999|rg=1|z=25000;1|rg=2|1=Caught in Underground & Caverns;1|rg=2|1=Caught in Honey;1|rg=2|1=Caught in Jungle Surface;1|rg=2|1=Caught in Sky Lakes;1|rg=2|1=Caught in Corruption;1|rg=2|1=Caught in Surface & Underground;1|rg=2|1=Caught in Surface;1|rg=2|1=Caught in Corruption;1|rg=2|1=Caught in Sky Lakes & Surface;1|rg=2|1=Caught in Sky Lakes & Surface;1|rg=2|1=Caught in Caverns;1|rg=2|1=Caught in Sky Lakes & Surface;1|rg=2|1=Caught in Caverns;1|rg=2|1=Caught in Crimson;1|rg=2|1=Caught in Underground & Caverns;1|rg=2|1=Caught in Underground Hallow;1|rg=2|1=Caught in Underground Tundra;1|rg=2|1=Caught in Surface Tundra;1|rg=2|1=Caught in Surface Hallow;1|rg=2|1=Caught in Underground & Caverns;1|rg=2|1=Caught in Surface Tundra;1|rg=2|1=Caught in Hallow;1|rg=2|1=Caught in Caverns;1|rg=2|1=Caught in Sky Lakes;1|rg=2|1=Caught in Surface;1|rg=2|1=Caught in Glowing Mushroom Fields;1|rg=2|1=Caught in Sky Lakes;1|rg=2|1=Caught in Crimson;1|rg=2|1=Caught in Underground & Caverns;1|rg=2|1=Caught in Surface;1|rg=2|1=Caught in Ocean;1|rg=2|1=Caught in Ocean;1|rg=2|1=Caught in Caverns;1|rg=2|1=Caught in Jungle Surface;1|rg=2|1=Caught in Underground Tundra;1|rg=2|1=Caught in Corruption;1|rg=2|1=Caught in Jungle;1|rg=2|1=Caught in Surface Forest;1|rg=2|1=Caught in Jungle Surface;t|s=9999|rg=1|z=50000;t|s=9999|rg=1|z=150000;1|r=8|t=20|rg=1|1=Summons a rideable Turtle mount|z=250000;t|s=9999|tr=2|rg=5|1=Not for use on slopes|z=5000;4v1|rg=1|z=37500;a1|r=4|rg=1|1=Allows flight and slow fall|z=400000;t|s=9999|rg=1|z=50000;t|s=9999|rg=1|z=50000;t|s=9999|rg=1|1=J. Hayes|z=25000;4v1|rg=1|z=50000;5v1|rg=1|z=50000;6v1|rg=1|z=50000;av1|r=5|rg=1|z=50000;1|r=8|t=20|rg=1|1=Summons a rideable Bee mount|z=250000;t|s=9999|rg=100;t|s=9999|rg=100;w|s=9999|rg=400;w|s=9999|rg=400;w|s=9999|rg=400;w|s=9999|rg=400;41|D=1|rg=1;51|D=1|rg=1;61|D=1|rg=1;41|D=1|rg=1;51|D=1|rg=1;61|D=1|rg=1;r1|d=6|t=29|rg=1|z=100;d1|d=4|t=33|k=5.5|th=35|rg=1|z=50;d1|d=8|t=19|k=6|rg=1|z=100;t|s=9999|rg=200;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=2000;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=1500;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=150;t|s=9999|rg=1|z=3000;t|s=9999|rg=1|z=500;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=200;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=150;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=500;t|s=9999|rg=1|z=150;s1|r=5|d=21|t=36|k=2|m=10|rg=1|1=Summons twins to fight for you|z=100000;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=2000;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=1500;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=3000;t|s=9999|rg=1|z=500;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=150;t|s=9999|rg=1|z=500;t|s=9999|rg=1|z=300;t|s=9999|rg=200;t|s=9999|rg=1|z=300;s1|r=4|d=26|t=36|k=3|m=10|rg=1|1=Summons spiders to fight for you|z=50000;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=2000;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=1500;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=150;t|s=9999|rg=1|z=3000;t|s=9999|rg=1|z=500;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=200;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=500;t|s=9999|rg=1|z=150;t|s=9999|rg=1|z=300;t|s=9999|rg=200;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=2000;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=1500;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=150;t|s=9999|rg=1|z=3000;t|s=9999|rg=1|z=500;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=200;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=500;t|s=9999|rg=1|z=150;t|s=9999|rg=1|z=300;t|s=9999|rg=200;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;s1|r=5|d=40|t=36|k=6|m=10|rg=1|1=Summons pirates to fight for you|z=50000;1|r=3|t=20|rg=1|z=20000;rc|s=9999|d=60|t=45|k=8|rg=99|1=A small explosion that will not destroy tiles|2=Tossing may be difficult.|z=75;1|r=3|t=20|rg=1|1=Summons a mini minotaur|z=100000;4v1|rg=1|z=37500;t|s=9999|rg=1|z=50000;rc|s=9999|d=23|t=40|k=7|rg=99|1=A small explosion that puts enemies on fire|2=Lights nearby area on fire for a while|z=500;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;|s=9999|r=4|rg=25|z=2500;d1|r=4|d=25|t=20|k=6|rg=1|z=10000;a1|r=8|rg=1|1=Allows flight and slow fall|2=Allows quick travel in water|z=400000;1|t=12|rg=1|1=Squirts a harmless stream of slime|z=15000;d1|r=8|d=66|t=20|k=4.5|rg=1|1=Spews homing bubbles|z=250000;t|s=9999|rg=1|z=500;t|s=9999|rg=1|z=500;t|s=9999|rg=1|z=500;t|s=9999|rg=1|z=500;t|s=9999|rg=1|z=500;t|s=9999|rg=1|z=500;t|s=9999|rg=1|z=500;t|s=9999|rg=1|z=500;t|s=9999|rg=1|z=500;s1|r=8|d=50|t=36|k=2|m=10|rg=1|1=Summons sharknados to fight for you|z=250000;m1|r=8|d=85|t=40|k=5|m=20|rg=1|1=Casts fast moving razorwheels|z=250000;m1|r=8|d=70|t=9|k=3|m=5|rg=1|1=Rapidly shoots forceful bubbles|z=250000;r1|r=8|d=53|t=24|k=2|rg=1|1=Shoots 5 arrows at a time|z=250000;t|s=9999|rg=5|z=2500;t|s=9999|rg=5|z=5000;t|s=9999|rg=200;t|s=9999|rg=200;t|s=9999|rg=200;t|s=9999|rg=200;t|s=9999|rg=1|z=150;t|s=9999|rg=1|z=150;t|s=9999|rg=1|z=150;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=150;t|s=9999|rg=1|z=150;t|s=9999|rg=1|z=500;t|s=9999|rg=1|z=500;t|s=9999|rg=1|z=500;t|s=9999|rg=1|z=500;t|s=9999|rg=1|z=500;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=3000;t|s=9999|rg=1|z=3000;t|s=9999|rg=1|z=3000;t|s=9999|rg=1|z=3000;t|s=9999|rg=1|z=3000;t|s=9999|rg=1|z=3000;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=100000;t|s=9999|rg=1|z=1500;t|s=9999|rg=1|z=1500;t|s=9999|rg=1|z=1500;t|s=9999|rg=1|z=1500;t|s=9999|rg=1|z=1500;t|s=9999|rg=1|z=2000;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;c|s=9999|r=3|t=15|rg=3|z=500000;c|s=9999|rg=5|z=500;c|s=9999|r=2|rg=5|z=1500;c|s=9999|r=3|rg=5|z=5000;w|s=9999|rg=400;w|s=9999|rg=400;w|s=9999|rg=400;w|s=9999|rg=400;w|s=9999|rg=400;w|s=9999|rg=400;w|s=9999|rg=400;w|s=9999|rg=400;w|s=9999|rg=400;w|s=9999|rg=400;w|s=9999|rg=400;w|s=9999|rg=400;w|s=9999|rg=400;w|s=9999|rg=400;w|s=9999|rg=400;t|s=9999|rg=100;t|s=9999|rg=100;t|s=9999|rg=100;t|s=9999|rg=100;w|s=9999|rg=400;t|s=9999|rg=100;w|s=9999|rg=400;t|s=9999|rg=1|1=Right Click to place item on weapon rack|z=250;t|s=9999|rg=1|z=50000;t|s=9999|rg=100;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=30000;t|s=9999|tr=2|rg=5|1=Hammer to change direction|z=5000;c|s=9999|t=15|rg=5|z=1250;t|s=9999|rg=1;at1|r=4|rg=1|z=100000;t|s=9999|rg=1|z=300;t|s=9999|rg=200;d1|d=8|t=20|k=6|rg=1|z=100;d1|d=4|t=33|k=5.5|th=35|rg=1|z=50;r1|d=6|t=29|rg=1|z=100;t|s=9999|rg=1|z=500;s1|r=8|d=36|t=36|k=2|m=10|rg=1|1=Summons a UFO to fight for you|z=500000;m1|r=5|d=50|k=4.5|m=9|rg=1|1=Showers meteors|z=100000;t|s=9999|rg=100;t|s=9999|rg=100;t|s=9999|rg=100;t|s=9999|rg=100;t|s=9999|rg=100;c|s=9999|t=17|rg=20|z=1000;41|r=10|D=14|rg=1|1=16% increased ranged damage|2=7% increased ranged critical strike chance|z=350000;51|r=10|D=28|rg=1|1=12% increased ranged damage and critical strike chance|2=25% chance not to consume ammo|z=700000;61|r=10|D=20|rg=1|1=8% increased ranged damage and critical strike chance|2=10% increased movement speed|z=525000;41|r=10|D=14|rg=1|1=Increases maximum mana by 60 and reduces mana usage by 15% |2=7% increased magic damage and critical strike chance|z=350000;51|r=10|D=18|rg=1|1=9% increased magic damage and critical strike chance|z=700000;61|r=10|D=14|rg=1|1=10% increased magic damage|2=10% increased movement speed|z=525000;41|r=10|D=24|rg=1|1=26% increased melee critical strike chance|2=Grants minor life regeneration|3=Enemies are more likely to target you|z=350000;51|r=10|D=34|rg=1|1=29% increased melee damage|2=Grants minor life regeneration|3=Enemies are more likely to target you|z=700000;61|r=10|D=20|rg=1|1=15% increased movement and melee speed|2=Grants minor life regeneration|3=Enemies are more likely to target you|z=525000;|s=9999|r=8|rg=10;c|s=9999|r=8|t=45|rg=3|1=Summons the Eclipse;1|r=8|t=20|rg=1|1=Summons a rideable Drill mount|2=Left Click to mine blocks, Right Click to mine walls|z=250000;1|r=8|t=20|rg=1|1=Summons a rideable UFO mount|z=250000;a1|r=8|rg=1|1=Allows flight and slow fall|z=625000;1|r=8|t=20|rg=1|1=Summons a rideable Scutlix mount|z=250000;d1|r=10|d=100|t=25|k=6|tx=27|tr=8|z=300000;d1|r=10|d=80|t=25|k=4|tx=27|tr=7|z=300000;d1|r=10|d=50|t=15|k=0.5|tp=225|tr=2|rg=1|z=350000;d1|r=10|d=110|t=30|k=7|th=100|tr=8|z=400000;d1|r=10|d=80|t=12|k=5.5|tp=225|tr=4|rg=1|z=350000;d1|r=10|d=100|t=25|k=6|tx=27|tr=8|z=300000;d1|r=10|d=80|t=25|k=4|tx=27|tr=7|z=300000;d1|r=10|d=50|t=15|k=0.5|tp=225|tr=2|rg=1|z=350000;d1|r=10|d=110|t=30|k=7|th=100|tr=8|z=400000;d1|r=10|d=80|t=12|k=5.5|tp=225|tr=4|rg=1|z=350000;d1|r=10|d=100|t=25|k=6|tx=27|tr=8|z=300000;d1|r=10|d=80|t=25|k=4|tx=27|tr=7|z=300000;d1|r=10|d=50|t=15|k=0.5|tp=225|tr=2|rg=1|z=350000;d1|r=10|d=110|t=30|k=7|th=100|tr=8|z=400000;d1|r=10|d=80|t=12|k=5.5|tp=225|tr=4|rg=1|z=350000;t|s=9999|rg=100;w|s=9999|rg=400;w|s=9999|rg=400;w|s=9999|rg=400;w|s=9999|rg=400;t|s=9999|rg=100;t|s=9999|rg=100;t|s=9999|rg=100;m1|r=8|d=60|t=20|k=2|m=6|rg=1|z=500000;r1|r=8|d=40|t=12|k=2|rg=1|z=500000;r1|r=8|d=45|t=21|k=3|rg=1|z=500000;d1|r=8|d=35|t=25|k=4.75|tp=230|tr=11|rg=1|z=500000;a1|rg=1|1=Creates measurement lines on screen for block placement|z=10000;1|r=7|t=20|k=7|rg=1|z=125000;4v1|rg=1;4v1|rg=1;4v1|rg=1|z=50000;5v1|rg=1|z=50000;6v1|rg=1|z=50000;4v1|rg=1|z=50000;5v1|rg=1|z=50000;6v1|rg=1|z=50000;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=2000;t|s=9999|rg=1|z=150;t|s=9999|rg=1|z=3000;t|s=9999|rg=1|z=500;t|s=9999|rg=1|z=200;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=500;t|s=9999|rg=1|z=150;t|s=9999|rg=1|z=300;t|s=9999|rg=200;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=1500;t|s=9999|rg=1|z=150;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=100000;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;4v1|rg=1|z=100000;4v1|rg=1|z=100000;5v1|rg=1|z=100000;5v1|rg=1|z=100000;t|s=9999|rg=100;w|s=9999|rg=400;4v1|r=3|rg=1|z=50000;c|s=9999|r=3|t=17|rg=1|z=300000;|s=9999|r=3|rg=3|z=75000;t|s=9999|rg=1|1=J. Hayes|z=20000;t|s=9999|rg=1|1=J. Hayes|z=20000;t|s=9999|rg=1|1=J. Hayes|z=20000;t|s=9999|rg=100|z=100;|s=9999|r=3|rg=3|z=75000;|s=9999|r=3|rg=3|z=75000;|s=9999|r=2|rg=3|z=37500;|s=9999|r=2|rg=3|z=37500;|s=9999|r=3|rg=3|z=75000;|s=9999|rg=3|z=10000;|s=9999|rg=3|z=10000;|s=9999|rg=3|z=10000;|s=9999|rg=3|z=10000;|s=9999|r=3|rg=3|z=75000;|s=9999|r=3|rg=3|z=75000;d1|r=8|d=100|t=20|k=4.5|rg=1|z=500000;1;m1|r=8|d=100|t=20|k=2|m=14|rg=1|z=500000;|s=9999|r=3|rg=3|z=75000;|s=9999|r=3|rg=3|z=75000;|s=9999|r=3|rg=3|z=75000;c|s=9999|t=15|rg=99|1=Spreads the Crimson|z=100;|s=9999|rg=25|z=50;r1|r=3|d=23|t=23|k=3|rg=1|1=Wooden arrows turn into a column of bees|z=100000;c|s=9999|r=3|t=15|rg=3|z=500000;c|s=9999|r=3|t=15|rg=3|z=500000;c|s=9999|r=3|t=15|rg=3|z=500000;c|s=9999|r=3|t=15|rg=3|z=500000;c|s=9999|r=3|t=15|rg=3|z=500000;c|s=9999|r=3|t=15|rg=3|z=500000;c|s=9999|r=3|t=15|rg=3|z=500000;c|s=9999|t=40|rg=99|1=A large explosion that will destroy most tiles|2=Tossing may be difficult.|z=2000;t|s=9999|rg=1|1=Nearby players get a bonus against: Angry Trapper|z=1000;t|s=9999|rg=1|1=Nearby players get a bonus against: Armored Viking|z=1000;t|s=9999|rg=1|1=Nearby players get a bonus against: Black Slime|z=1000;t|s=9999|rg=1|1=Nearby players get a bonus against: Blue Armored Bones|z=1000;t|s=9999|rg=1|1=Nearby players get a bonus against: Cultist Archer|z=1000;t|s=9999|rg=1|1=Nearby players get a bonus against: Lunatic Devotee|z=1000;t|s=9999|1=Nearby players get a bonus against: NPCName.None|z=1000;t|s=9999|rg=1|1=Nearby players get a bonus against: Bone Lee|z=1000;t|s=9999|rg=1|1=Nearby players get a bonus against: Clinger|z=1000;t|s=9999|rg=1|1=Nearby players get a bonus against: Cochineal Beetle|z=1000;t|s=9999|rg=1|1=Nearby players get a bonus against: Corrupt Penguin|z=1000;t|s=9999|rg=1|1=Nearby players get a bonus against: Corrupt Slime|z=1000;t|s=9999|rg=1|1=Nearby players get a bonus against: Corruptor|z=1000;t|s=9999|rg=1|1=Nearby players get a bonus against: Crimslime|z=1000;t|s=9999|rg=1|1=Nearby players get a bonus against: Cursed Skull|z=1000;t|s=9999|rg=1|1=Nearby players get a bonus against: Cyan Beetle|z=1000;t|s=9999|rg=1|1=Nearby players get a bonus against: Devourer|z=1000;t|s=9999|rg=1|1=Nearby players get a bonus against: Diabolist|z=1000;t|s=9999|rg=1|1=Nearby players get a bonus against: Doctor Bones|z=1000;t|s=9999|rg=1|1=Nearby players get a bonus against: Dungeon Slime|z=1000;t|s=9999|rg=1|1=Nearby players get a bonus against: Dungeon Spirit|z=1000;t|s=9999|rg=1|1=Nearby players get a bonus against: Elf Archer|z=1000;t|s=9999|rg=1|1=Nearby players get a bonus against: Elf Copter|z=1000;t|s=9999|rg=1|1=Nearby players get a bonus against: Eyezor|z=1000;t|s=9999|rg=1|1=Nearby players get a bonus against: Flocko|z=1000;t|s=9999|rg=1|1=Nearby players get a bonus against: Ghost|z=1000;t|s=9999|rg=1|1=Nearby players get a bonus against: Giant Bat|z=1000;t|s=9999|rg=1|1=Nearby players get a bonus against: Giant Cursed Skull|z=1000;t|s=9999|rg=1|1=Nearby players get a bonus against: Giant Flying Fox|z=1000;t|s=9999|rg=1|1=Nearby players get a bonus against: Gingerbread Man|z=1000;t|s=9999|rg=1|1=Nearby players get a bonus against: Goblin Archer|z=1000;t|s=9999|rg=1|1=Nearby players get a bonus against: Green Slime|z=1000;t|s=9999|rg=1|1=Nearby players get a bonus against: Headless Horseman|z=1000;t|s=9999|rg=1|1=Nearby players get a bonus against: Hell Armored Bones|z=1000;t|s=9999|rg=1|1=Nearby players get a bonus against: Hellhound|z=1000;t|s=9999|rg=1|1=Nearby players get a bonus against: Hoppin Jack|z=1000;t|s=9999|rg=1|1=Nearby players get a bonus against: Ice Bat|z=1000;t|s=9999|rg=1|1=Nearby players get a bonus against: Ice Golem|z=1000;t|s=9999|rg=1|1=Nearby players get a bonus against: Ice Slime|z=1000;t|s=9999|rg=1|1=Nearby players get a bonus against: Ichor Sticker|z=1000;t|s=9999|rg=1|1=Nearby players get a bonus against: Illuminant Bat|z=1000;t|s=9999|rg=1|1=Nearby players get a bonus against: Illuminant Slime|z=1000;t|s=9999|rg=1|1=Nearby players get a bonus against: Jungle Bat|z=1000;t|s=9999|rg=1|1=Nearby players get a bonus against: Jungle Slime|z=1000;t|s=9999|rg=1|1=Nearby players get a bonus against: Krampus|z=1000;t|s=9999|rg=1|1=Nearby players get a bonus against: Lac Beetle|z=1000;t|s=9999|rg=1|1=Nearby players get a bonus against: Lava Bat|z=1000;t|s=9999|rg=1|1=Nearby players get a bonus against: Lava Slime|z=1000;t|s=9999|rg=1|1=Nearby players get a bonus against: Brain Scrambler|z=1000;t|s=9999|rg=1|1=Nearby players get a bonus against: Martian Drone|z=1000;t|s=9999|rg=1|1=Nearby players get a bonus against: Martian Engineer|z=1000;t|s=9999|rg=1|1=Nearby players get a bonus against: Gigazapper|z=1000;t|s=9999|rg=1|1=Nearby players get a bonus against: Gray Grunt|z=1000;t|s=9999|rg=1|1=Nearby players get a bonus against: Martian Officer|z=1000;t|s=9999|rg=1|1=Nearby players get a bonus against: Ray Gunner|z=1000;t|s=9999|rg=1|1=Nearby players get a bonus against: Scutlix Gunner|z=1000;t|s=9999|rg=1|1=Nearby players get a bonus against: Tesla Turret|z=1000;t|s=9999|rg=1|1=Nearby players get a bonus against: Mister Stabby|z=1000;t|s=9999|rg=1|1=Nearby players get a bonus against: Mother Slime|z=1000;t|s=9999|rg=1|1=Nearby players get a bonus against: Necromancer|z=1000;t|s=9999|rg=1|1=Nearby players get a bonus against: Nutcracker|z=1000;t|s=9999|rg=1|1=Nearby players get a bonus against: Paladin|z=1000;t|s=9999|rg=1|1=Nearby players get a bonus against: Penguin|z=1000;t|s=9999|rg=1|1=Nearby players get a bonus against: Pinky|z=1000;t|s=9999|rg=1|1=Nearby players get a bonus against: Poltergeist|z=1000;t|s=9999|rg=1|1=Nearby players get a bonus against: Possessed Armor|z=1000;t|s=9999|rg=1|1=Nearby players get a bonus against: Present Mimic|z=1000;t|s=9999|rg=1|1=Nearby players get a bonus against: Purple Slime|z=1000;t|s=9999|rg=1|1=Nearby players get a bonus against: Ragged Caster|z=1000;t|s=9999|rg=1|1=Nearby players get a bonus against: Rainbow Slime|z=1000;t|s=9999|rg=1|1=Nearby players get a bonus against: Raven|z=1000;t|s=9999|rg=1|1=Nearby players get a bonus against: Red Slime|z=1000;t|s=9999|rg=1|1=Nearby players get a bonus against: Rune Wizard|z=1000;t|s=9999|rg=1|1=Nearby players get a bonus against: Rusty Armored Bones|z=1000;t|s=9999|rg=1|1=Nearby players get a bonus against: Scarecrow|z=1000;t|s=9999|rg=1|1=Nearby players get a bonus against: Scutlix|z=1000;t|s=9999|rg=1|1=Nearby players get a bonus against: Skeleton Archer|z=1000;t|s=9999|rg=1|1=Nearby players get a bonus against: Skeleton Commando|z=1000;t|s=9999|rg=1|1=Nearby players get a bonus against: Skeleton Sniper|z=1000;t|s=9999|rg=1|1=Nearby players get a bonus against: Slimer|z=1000;t|s=9999|rg=1|1=Nearby players get a bonus against: Snatcher|z=1000;t|s=9999|rg=1|1=Nearby players get a bonus against: Snow Balla|z=1000;t|s=9999|rg=1|1=Nearby players get a bonus against: Snowman Gangsta|z=1000;t|s=9999|rg=1|1=Nearby players get a bonus against: Spiked Ice Slime|z=1000;t|s=9999|rg=1|1=Nearby players get a bonus against: Spiked Jungle Slime|z=1000;t|s=9999|rg=1|1=Nearby players get a bonus against: Splinterling|z=1000;t|s=9999|rg=1|1=Nearby players get a bonus against: Squid|z=1000;t|s=9999|rg=1|1=Nearby players get a bonus against: Tactical Skeleton|z=1000;t|s=9999|rg=1|1=Nearby players get a bonus against: The Groom|z=1000;t|s=9999|rg=1|1=Nearby players get a bonus against: Tim|z=1000;t|s=9999|rg=1|1=Nearby players get a bonus against: Undead Miner|z=1000;t|s=9999|rg=1|1=Nearby players get a bonus against: Undead Viking|z=1000;t|s=9999|1=Nearby players get a bonus against: Cultist Archer|z=1000;t|s=9999|1=Nearby players get a bonus against: NPCName.None|z=1000;t|s=9999|1=Nearby players get a bonus against: NPCName.None|z=1000;t|s=9999|rg=1|1=Nearby players get a bonus against: Yellow Slime|z=1000;t|s=9999|rg=1|1=Nearby players get a bonus against: Yeti|z=1000;t|s=9999|rg=1|1=Nearby players get a bonus against: Zombie Elf|z=1000;t|s=9999|rg=1|1=V. Costa Moura|2=In loving memory|z=5000;t|s=9999|tr=3|rg=100|1=Can be climbed on;c|s=9999|rg=20|1=Teleports you to a party member|2=Click their head on the fullscreen map|z=1000;a1|r=4|rg=1|1=15% increased summon damage|z=100000;t|s=9999|rg=1|1=Right Click to have more minions|z=100000;t|s=9999|rg=1|1=33% chance to not consume potion crafting ingredients|z=100000;c|s=9999|hl=70|t=17|rg=30|1=Side Effects May Include:|2=-Unpredictable Healing|3=-Inconsistent Potion Sickness|4=-Brief Periods of Inexplicable Invulnerability|5=It looks and smells terrible|z=500;c|s=9999|t=15|rg=100|1=Exposes nearby treasure|z=150;rb|s=9999|d=8|k=2.5|rg=99|z=15;t|s=9999|rg=100|1=Emits a deathly glow|z=100;c|s=9999|t=20|rg=10|1=Throw to create a climbable line of vine rope;m1|r=5|d=35|t=12|k=2.5|m=10|rg=1|1=Drains life from enemies|z=400000;r1|r=5|d=28|t=22|k=3.5|rg=1|z=400000;r1|r=5|d=52|t=38|k=5.5|rg=1|z=400000;rb|s=9999|r=3|d=14|k=3.5|rg=99|1=Bounces between enemies|z=30;rb|s=9999|r=3|d=9|k=2.2|rg=99|1=Drops cursed flames on the ground|z=30;rb|s=9999|r=3|d=10|k=2.5|rg=99|1=Bursts into multiple darts|z=30;d1|r=5|d=59|t=14|k=3.25|rg=1|z=400000;d1|r=5|d=60|t=8|k=6|rg=1|z=400000;m1|r=5|d=43|t=24|k=8|m=40|rg=1|1=Summons a wall of cursed flames|z=400000;a1|r=6|rg=1|1=Enemies are less likely to target you|2=5% increased damage and critical strike chance|z=400000;a1|r=5|D=8|rg=1|1=Enemies are more likely to target you|z=400000;a1|r=7|rg=1|1=Flowers grow on the grass you walk on|z=300000;d1|r=5|d=50|t=23|k=6|rg=1|z=500000;r1|r=3|d=22|t=13|k=5.5|rg=1|1=Wooden arrows turn into flaming bats|z=125000;1|r=6|t=20|rg=1|z=300000;1|r=6|t=20|rg=1|z=300000;1|r=6|t=20|rg=1|z=300000;1|r=6|t=20|rg=1|z=300000;|s=9999|r=9|rg=3|1=Great for impersonating devs!|z=150000;|s=9999|r=2|rg=3|z=37500;|s=9999|r=2|rg=3|z=37500;|s=9999|r=2|rg=3|z=37500;|s=9999|r=2|rg=3|z=37500;r1|r=6|d=38|t=19|k=2.25|rg=1|1=Shoots arrows from the sky|z=400000;d1|r=6|d=40|t=15|k=4.5|rg=1|1=Throws a controllable flying knife|z=400000;1|r=7|t=12|tr=2|rg=1|1=Contains an endless amount of water|2=Can be poured out|z=500000;1|r=7|t=12|tr=2|rg=1|1=Capable of soaking up an endless amount of water|z=500000;a1|r=5|rg=1|1=Increases coin pickup range|z=50000;a1|r=5|rg=1|1=Increases coin pickup range|2=Hitting enemies will sometimes drop extra coins|z=100000;a1|r=6|rg=1|1=Increases coin pickup range and shops prices lowered by 20%|2=Hitting enemies will sometimes drop extra coins|z=150000;a1|r=3|rg=1|1=Displays weather, moon phase, and fishing information|z=150000;a1|rg=1|1=Displays the weather|z=50000;|s=9999|r=3|rg=3|z=75000;|s=9999|r=3|rg=3|z=75000;|s=9999|r=2|rg=3|z=37500;|s=9999|r=2|rg=3|z=37500;|s=9999|r=3|rg=3|z=75000;1|r=3|t=20|rg=1|1=Summons a magic lantern that exposes nearby treasure|z=100000;at1|r=4|rg=1|z=100000;t|s=9999|rg=100|z=250;t|s=9999|rg=1|1=Life regen is increased when near a campfire;t|s=9999|rg=1|1=Life regen is increased when near a campfire;t|s=9999|rg=1|1=Life regen is increased when near a campfire;t|s=9999|rg=1|1=Life regen is increased when near a campfire;t|s=9999|rg=1|1=Life regen is increased when near a campfire;m1|r=5|d=25|t=33|k=3|m=13|rg=1|1=Summons a massive crystal spike|2=Ignores 10 points of enemy Defense|z=400000;r1|r=5|c=3|d=47|t=20|k=4.5|rg=1|1=Shoots Shadowflame Arrows|z=100000;m1|r=5|c=3|d=32|t=21|k=3.75|m=6|rg=1|1=Summons Shadowflame tentacles to strike your foes|z=100000;d1|r=5|c=3|d=38|t=12|k=5.75|rg=1|1=Inflicts Shadowflame on hit|z=100000;t|s=9999|rg=1|1=J. Hayes|z=5000;t|s=9999|rg=1|1=J. Hayes|z=5000;t|s=9999|rg=1|1=J. Hayes|z=5000;t|s=9999|rg=1|1=J. Hayes|z=5000;t|s=9999|rg=1|1=J. Hayes|z=5000;1|r=3|t=20|rg=1|1=Summons a Baby Face Monster|z=375000;a1|r=5|rg=1|1=Increases block & wall placement speed|2=Increases block placement & tool range by 3|3=Automatically paints or coats placed objects|z=200000;1|t=20|rg=1|1=Summons a heart to provide light|z=75000;d1|r=10|d=200|t=14|k=6.5|rg=1|z=1000000;t|s=9999|r=7|rg=1|1=Allows time to fast forward to dawn one day per week|z=150000;d1|r=10|d=170|t=16|k=6.5|rg=1|1=Causes stars to rain from the sky|z=1000000;t|s=9999|rg=100;w|s=9999|rg=400;a1|rg=1|1=Allows the collection of Vine Rope from vines|z=25000;m1|c=10|d=14|t=26|m=2|rg=1|1=Shoots a small spark|z=10000;t|s=9999|r=3|rg=1|z=500000;t|s=9999|r=3|rg=1|z=500000;t|s=9999|r=3|rg=1|z=500000;t|s=9999|r=3|rg=1|z=500000;t|s=9999|r=3|rg=1|z=500000;t|s=9999|r=3|rg=1|z=500000;t|s=9999|r=3|rg=1|z=500000;t|s=9999|tr=3|rg=100|1=Can be climbed on|z=10;t|s=9999|tr=3|rg=100|1=Can be climbed on|z=10;c|s=9999|t=20|rg=10|1=Throw to create a climbable line of silk rope|z=100;c|s=9999|t=20|rg=10|1=Throw to create a climbable line of web rope|z=100;t|s=9999|rg=100;w|s=9999|rg=400;w|s=9999|rg=400;a1|rg=1|1=Detects enemies around you|z=25000;|s=9999|r=2|rg=5|1=Right Click to open|2=Requires a Golden Key|z=20000;t|s=9999|rg=100;t|s=9999|rg=100;w|s=9999|rg=400;w|s=9999|rg=400;a1|r=2|rg=1|1=Slimes become friendly|z=100000;|s=9999|rg=1|1=Charged with the essence of many souls;|s=9999|rg=1|1=Charged with the essence of many souls;|s=9999|rg=2|1=Right Click to open|z=5000;rc|s=9999|d=17|t=24|k=4.75|rg=99|z=25;a1|rg=1|1=Displays how many monsters have been killed|z=50000;a1|rg=1|1=Displays the phase of the moon|z=50000;da1|d=30|D=2|k=9|rg=1|1=Allows the player to dash into the enemy|2=Double tap a direction|z=100000;d1|r=8|d=120|t=15|k=8|tx=30|rg=1|1=Sparks emit from struck enemies|z=500000;a1|rg=1|1=Displays how fast the player is moving|z=50000;t|s=9999|rg=100;w|s=9999|rg=400;a1|rg=1|1=Displays the most valuable ore around you|z=50000;rb1|r=2|d=5|k=2|rg=1|z=50000;rb1|r=2|d=7|k=2|rg=1|z=50000;m1|r=8|d=52|t=45|k=4|m=30|rg=1|z=500000;d1|r=8|d=85|t=8|k=3.5|rg=1|1=Allows you to go into stealth mode|z=500000;r1|r=8|d=85|t=15|rg=1|z=500000;rb|s=9999|r=8|d=30|k=3|rg=99|z=100;41|r=2|D=4|rg=1|1=Improves vision|z=50000;a1|r=8|rg=1|1=Turns the holder into a werewolf at night and a merfolk when entering water|2=Minor increase to damage, melee speed, critical strike chance,|3=life regeneration, defense, mining speed, and minion knockback|z=700000;|s=9999|rg=5|1=Bouncy and sweet!|z=15;c|s=9999|t=15|rg=100|1=Works when wet|z=10;t|s=9999|rg=100|1=Very bouncy;t|s=9999|rg=100|z=80;c|s=9999|t=25|rg=99|1=A small explosion that will destroy most tiles|2=Very bouncy|z=400;rc|s=9999|d=65|t=40|k=8|rg=99|1=A small explosion that will not destroy tiles|2=Very bouncy|z=100;t|s=9999|rg=1|1=Makes surrounding creatures less hostile|z=500;a1|rg=1|1=Displays the name of rare creatures around you|z=50000;a1|rg=1|1=Displays your damage per second|z=50000;a1|rg=1|1=Displays fishing information|z=50000;a1|r=3|rg=1|1=Displays movement speed, damage per second, and valuable ore|z=150000;a1|r=3|rg=1|1=Displays number of monsters, kill count, and rare creatures|z=150000;a1|r=5|rg=1|1=Displays everything|z=250000;1|r=7|t=90|rg=1|1=Displays everything|2=Allows you to return home at will|z=400000;t|s=9999|rg=1|z=500;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=200;t|s=9999|rg=1|z=200;t|s=9999|rg=1|z=200;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=500;t|s=9999|rg=1|z=500;t|s=9999|rg=1|z=500;t|s=9999|rg=1|z=150;t|s=9999|rg=1|z=150;t|s=9999|rg=1|z=150;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=200;t|s=9999|rg=200;t|s=9999|rg=200;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=150;t|s=9999|rg=1|z=150;t|s=9999|rg=1|z=150;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=2000;t|s=9999|rg=1|z=2000;t|s=9999|rg=1|z=2000;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=1500;t|s=9999|rg=1|z=1500;t|s=9999|rg=1|z=1500;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=150;t|s=9999|rg=1|z=150;t|s=9999|rg=1|z=150;t|s=9999|rg=1|z=3000;t|s=9999|rg=1|z=3000;t|s=9999|rg=1|z=3000;t|s=9999|rg=1|z=500;t|s=9999|rg=1|z=500;t|s=9999|rg=1|z=200;1|r=4|t=18|rg=1|1=Used to catch critters|2=Can catch lava critters too!|z=250000;t|s=9999|rg=1|z=200;t|s=9999|rg=1|z=200;|s=9999|rg=1|z=100;41|D=5|rg=1|z=17500;51|D=6|rg=1|z=14000;61|D=5|rg=1|z=10500;|s=9999|r=2|rg=3|z=37500;c|s=9999|r=2|t=15|rg=5|z=10000;c|s=9999|t=15|rg=5|z=1250;c|s=9999|t=15|rg=5|z=2500;c|s=9999|r=2|t=15|rg=5|z=5000;c|s=9999|r=2|t=17|rg=5|1=Medium improvements to all stats|2=Grubs up!|z=10000;c|s=9999|t=25|rg=99|1=A small explosion that will destroy most tiles|z=1000;rc|s=9999|d=17|t=13|k=3.5|rg=99|z=80;t|s=9999|rg=1|1=Increases armor penetration for melee weapons|z=100000;1|t=90|rg=1|1=Gaze in the mirror to return home|z=50000;a1|rg=1|1=The wearer can run super fast|z=50000;a1|rg=1|1=Allows the holder to double jump|z=50000;t|s=9999|rg=1|z=500;t|s=9999|r=2|rg=5|1=Right Click to open|z=50000;t|s=9999|r=2|rg=5|1=Right Click to open|z=50000;t|s=9999|r=2|rg=5|1=Right Click to open|z=50000;t|s=9999|r=2|rg=5|1=Right Click to open|z=50000;t|s=9999|r=2|rg=5|1=Right Click to open|z=50000;t|s=9999|r=2|rg=5|1=Right Click to open|z=50000;m1|r=5|d=40|t=29|k=4.4|m=9|rg=1|1=Shoots an explosive crystal charge|z=200000;r1|r=5|d=43|k=3|rg=1|1=Spits toxic bubbles|z=200000;d1|r=5|d=55|t=28|k=5.75|rg=1|1=Spits an Ichor stream on contact|z=200000;a1|rg=1|1=Increases armor penetration by 5|z=50000;1|r=3|t=28|rg=1|1=Summons a flying piggy bank to store your items|z=100000;t|s=9999|rg=100|z=200;t|s=9999|rg=25|z=100;t|s=9999|rg=25|z=100;t|s=9999|rg=25|z=100;t|s=9999|rg=25|z=100;t|s=9999|rg=25|z=100;t|s=9999|rg=25|z=100;t|s=9999|rg=25|z=100;t|s=9999|rg=25|z=100;a1|rg=1|1=Has a chance to create illusions and dodge an attack|2=Temporarily increase critical chance after dodge|3=May confuse nearby enemies after being struck|z=100000;a1|rg=1|1=Reduces damage taken by 17%|z=100000;a1|rg=1|1=Increases jump height|z=125000;4v1|r=9|rg=1|1=Great for impersonating devs!|2=Become the wind, ride the lightning.|z=250000;5v1|r=9|rg=1|1=Great for impersonating devs!|2=Bejeweled and elegant for soaring through the thundering skies|z=250000;a1|r=9|rg=1|1=Great for impersonating devs!|2=Allows flight and slow fall|3=The Valkyrie Satellite Barrier Platform is totally safe. Most of the time.|z=400000;t|s=9999|rg=2;t|s=9999|rg=2;t|s=9999|rg=2;t|s=9999|rg=2;t|s=9999|rg=2;t|s=9999|rg=100;at1|r=4|rg=1|z=100000;at1|r=4|rg=1|z=100000;at1|r=4|rg=1|z=100000;w|s=9999|rg=400;t|s=9999|rg=1;t|s=9999|rg=1;a1|rg=1|1=Increases jump height|2=Allows the holder to double jump|z=150000;4v1|rg=1|z=30000;5v1|rg=1|z=30000;6v1|rg=1|z=30000;a1|r=2|rg=1|1=Shoots crossbones at enemies while you are attacking|z=100000;5v1|rg=1|z=30000;6v1|rg=1|z=30000;4v1|rg=1|z=30000;s1|r=8|d=40|t=36|k=2|m=10|rg=1|1=Summons a deadly sphere to fight for you|z=500000;a1|r=4|rg=1|1=Allows the holder to double jump|2=Increases jump height and negates fall damage|z=150000;a1|r=4|rg=1|1=Releases bees and douses the user in honey when damaged|2=Increases jump height and negates fall damage|z=150000;a1|r=4|rg=1|1=Allows the holder to double jump|2=Increases jump height and negates fall damage|z=150000;t|s=9999|rg=1|z=20000;t|s=9999|rg=1;t|s=9999|rg=1;t|s=9999|rg=1;t|s=9999|rg=1;d1|r=4|c=15|d=55|t=20|k=20|rg=1|z=250000;c|s=9999|r=3|t=17|rg=1|z=300000;1|r=8|t=20|rg=1|1=Summons a rideable unicorn mount|z=250000;t|s=9999|r=7|rg=25|z=50000;d1|r=2|d=21|t=25|k=3.25|rg=1|z=50000;4v1|rg=1|z=30000;5v1|rg=1|z=30000;6v1|rg=1|z=30000;41|D=4|rg=1|1=Increases summon damage by 8%|z=4500;51|D=6|rg=1|1=Increases your max number of minions by 1|z=4500;61|D=5|rg=1|1=Increases summon damage by 8%|z=4500;m1|r=4|d=40|t=20|k=2|m=15|rg=1|z=200000;t|s=9999|rg=1|1=Right Click to place item on item frame;t|s=9999|rg=100;t|s=9999|rg=100;w|s=9999|rg=400;t|s=9999|rg=100;t|s=9999|rg=100;t|s=9999|rg=100;t|s=9999|rg=100;d1|d=9|t=25|k=2.5|rg=1|z=500;d1|d=16|t=25|k=4.5|rg=1|z=50000;d1|d=17|t=25|k=4|rg=1|z=50000;d1|r=3|d=18|t=25|k=3.75|rg=1|z=65000;d1|r=3|d=27|t=25|k=4.3|rg=1|z=90000;d1|r=4|d=39|t=25|k=3.3|rg=1|z=200000;d1|r=5|d=54|t=25|k=3.8|rg=1|z=250000;d1|d=14|t=25|k=3.5|rg=1|z=25000;d1|r=7|d=60|t=25|k=3.1|rg=1|z=250000;d1|r=9|d=70|t=25|k=4.5|rg=1|1=Great for impersonating devs!|z=200000;d1|r=9|d=70|t=25|k=4.5|rg=1|1=Great for impersonating devs!|z=200000;d1|r=4|d=43|t=25|k=2.8|rg=1|z=200000;d1|r=4|d=41|t=25|k=4.5|rg=1|z=200000;d1|r=8|c=10|d=95|t=25|k=4.3|rg=1|z=550000;d1|r=8|d=115|t=25|k=3.5|rg=1|z=625000;a1|rg=1|1=Increases yoyo range|z=1500;a1|rg=1|1=Increases yoyo range|z=1500;a1|rg=1|1=Increases yoyo range|z=1500;a1|rg=1|1=Increases yoyo range|z=1500;a1|rg=1|1=Increases yoyo range|z=1500;a1|rg=1|1=Increases yoyo range|z=1500;a1|rg=1|1=Increases yoyo range|z=1500;a1|rg=1|1=Increases yoyo range|z=1500;a1|rg=1|1=Increases yoyo range|z=1500;a1|rg=1|1=Increases yoyo range|z=1500;a1|rg=1|1=Increases yoyo range|z=1500;a1|rg=1|1=Increases yoyo range|z=1500;a1|rg=1|1=Increases yoyo range|z=1500;a1|rg=1|1=Increases yoyo range|z=1500;a1|rg=1|1=Increases yoyo range|z=1500;a1|rg=1|1=Increases yoyo range|z=1500;a1|r=2|rg=1|1=Throws a counterweight after hitting an enemy with a yoyo|z=50000;a1|r=2|rg=1|1=Throws a counterweight after hitting an enemy with a yoyo|z=50000;a1|r=2|rg=1|1=Throws a counterweight after hitting an enemy with a yoyo|z=50000;a1|r=2|rg=1|1=Throws a counterweight after hitting an enemy with a yoyo|z=50000;a1|r=2|rg=1|1=Throws a counterweight after hitting an enemy with a yoyo|z=50000;a1|r=2|rg=1|1=Throws a counterweight after hitting an enemy with a yoyo|z=50000;d1|r=3|d=39|t=25|k=3.25|rg=1|z=200000;d1|r=3|d=49|t=25|k=3.8|rg=1|z=200000;d1|r=3|d=28|t=25|k=3.85|rg=1|z=87500;c|s=9999|rg=3|1=Right Click to open;c|s=9999|rg=3|1=Right Click to open;c|s=9999|r=2|rg=3|1=Right Click to open;c|s=9999|r=2|rg=3|1=Right Click to open;c|s=9999|r=3|rg=3|1=Right Click to open;c|s=9999|r=3|rg=3|1=Right Click to open;c|s=9999|r=4|rg=3|1=Right Click to open;c|s=9999|r=5|rg=3|1=Right Click to open;c|s=9999|r=5|rg=3|1=Right Click to open;c|s=9999|r=5|rg=3|1=Right Click to open;c|s=9999|r=6|rg=3|1=Right Click to open;c|s=9999|r=7|rg=3|1=Right Click to open;c|s=9999|r=7|rg=3|1=Right Click to open;c|s=9999|r=8|1=Right Click to open;c|s=9999|r=8|rg=3|1=Right Click to open;a1|r=3|rg=1|1=Increases the strength of friendly bees|z=100000;a1|r=4|rg=1|1=Allows the use of two yoyos at once|z=500000;c|s=9999|r=4|t=30|rg=1|1=Permanently increases the number of accessory slots|z=100000;a1|r=8|rg=1|1=Summons spores over time that will damage enemies|z=200000;a1|r=8|rg=1|1=Greatly increases life regen when not moving|z=250000;t|s=9999|rg=100;t|s=9999|rg=100;w|s=9999|rg=400;w|s=9999|rg=400;w|s=9999|rg=400;w|s=9999|rg=400;w|s=9999|rg=400;w|s=9999|rg=400;w|s=9999|rg=400;t|s=9999|rg=200;w|s=9999|rg=400;d1|r=2|d=20|t=18|k=4.25|rg=1|z=25000;r1|r=2|c=7|d=12|t=24|k=1.25|rg=1|z=25000;d1|r=2|d=16|t=15|k=3.5|rg=1|z=25000;d1|r=2|d=14|t=12|k=5|rg=1|z=25000;1|r=6|rg=1|z=50000;|s=9999|r=5|rg=1|z=25000;|s=9999|r=5|rg=1|z=25000;|s=9999|r=5|rg=1|z=25000;t|s=9999|rg=1|z=50000;t|s=9999|rg=1|z=50000;t|s=9999|rg=1|z=50000;t1|rg=1|1=Places living rich mahogany|z=12500;t1|rg=1|1=Places rich mahogany leaves|z=12500;5v1|rg=1|z=250000;6v1|rg=1|z=250000;t|s=9999|rg=1;t|s=9999|rg=1;a1|r=4|rg=1|1=Gives the user master yoyo skills|z=500000;1|r=8|t=20|rg=1|1=Attracts a legendary creature which flourishes in water & combat|z=250000;d1|r=9|d=25|t=25|k=4|rg=1|1=I didnt get this off of a Schmoo|z=250000;t|s=9999|r=3|rg=1|z=250000;at1|r=4|rg=1|z=100000;at1|r=4|rg=1|z=100000;4v1|rg=1|z=37500;4v1|rg=1|z=37500;41|D=4|rg=1|1=4% increased ranged critical strike chance|z=15000;51|D=5|rg=1|1=5% increased ranged damage|z=25000;61|D=4|rg=1|1=4% increased ranged critical strike chance|z=20000;m1|d=21|t=28|k=4.75|m=7|rg=1|z=20000;rc|s=9999|d=20|t=25|k=5|rg=99|z=50;rc|s=9999|d=14|t=14|k=1.5|rg=99|z=50;t|s=9999|rg=100;41|r=10|D=10|rg=1|1=Increases your max number of minions by 1|2=Increases summon damage by 22%|3=Increases your max number of sentries by 1|z=350000;51|r=10|D=16|rg=1|1=Increases your max number of minions by 2|2=Increases summon damage by 22%|3=Increases whip range by 15%|z=700000;61|r=10|D=12|rg=1|1=Increases your max number of minions by 2|2=Increases summon damage by 22%|3=Increases whip range by 15%|z=525000;1|r=8|t=20|k=2|rg=1|1=Creates a pair of portals that can be traveled through.|2=Use Left Click & Right Click to place portals.|3=Increases momentum and falling speed.|4=Speedy thing goes in, speedy thing comes out.|z=500000;t|s=9999|rg=3|1=Can be traded for rare dyes|z=10000;t|s=9999|rg=3|1=Can be traded for rare dyes|z=10000;t|s=9999|rg=3|1=Can be traded for rare dyes|z=10000;t|s=9999|rg=3|1=Can be traded for rare dyes|z=10000;d1|r=10|c=10|d=190|t=25|k=6.5|rg=1|z=500000;t|s=9999|rg=1|1=Nearby players get a bonus against: Goblin Summoner|z=1000;t|s=9999|rg=1|1=Nearby players get a bonus against: Salamander|z=1000;t|s=9999|rg=1|1=Nearby players get a bonus against: Giant Shelly|z=1000;t|s=9999|rg=1|1=Nearby players get a bonus against: Crawdad|z=1000;t|s=9999|rg=1|1=Nearby players get a bonus against: Fritz|z=1000;t|s=9999|rg=1|1=Nearby players get a bonus against: Creature from the Deep|z=1000;t|s=9999|rg=1|1=Nearby players get a bonus against: Dr. Man Fly|z=1000;t|s=9999|rg=1|1=Nearby players get a bonus against: Mothron|z=1000;t|s=9999|1=Nearby players get a bonus against: NPCName.None|z=1000;t|s=9999|rg=1|1=Nearby players get a bonus against: The Possessed|z=1000;t|s=9999|rg=1|1=Nearby players get a bonus against: Butcher|z=1000;t|s=9999|rg=1|1=Nearby players get a bonus against: Psycho|z=1000;t|s=9999|rg=1|1=Nearby players get a bonus against: Deadly Sphere|z=1000;t|s=9999|rg=1|1=Nearby players get a bonus against: Nailhead|z=1000;t|s=9999|1=Nearby players get a bonus against: NPCName.None|z=1000;t|s=9999|rg=1|1=Nearby players get a bonus against: Medusa|z=1000;t|s=9999|rg=1|1=Nearby players get a bonus against: Hoplite|z=1000;t|s=9999|rg=1|1=Nearby players get a bonus against: Granite Elemental|z=1000;t|s=9999|rg=1|1=Nearby players get a bonus against: Granite Golem|z=1000;t|s=9999|rg=1|1=Nearby players get a bonus against: Blood Zombie|z=1000;t|s=9999|rg=1|1=Nearby players get a bonus against: Drippler|z=1000;t|s=9999|rg=1|1=Nearby players get a bonus against: Tomb Crawler|z=1000;t|s=9999|rg=1|1=Nearby players get a bonus against: Dune Splicer|z=1000;t|s=9999|rg=1|1=Nearby players get a bonus against: Antlion Swarmer|z=1000;t|s=9999|rg=1|1=Nearby players get a bonus against: Antlion Charger|z=1000;t|s=9999|rg=1|1=Nearby players get a bonus against: Ghoul|z=1000;t|s=9999|rg=1|1=Nearby players get a bonus against: Lamia|z=1000;t|s=9999|rg=1|1=Nearby players get a bonus against: Desert Spirit|z=1000;t|s=9999|rg=1|1=Nearby players get a bonus against: Basilisk|z=1000;t|s=9999|rg=1|1=Nearby players get a bonus against: Sand Poacher|z=1000;t|s=9999|rg=1|1=Nearby players get a bonus against: Stargazer|z=1000;t|s=9999|rg=1|1=Nearby players get a bonus against: Milkyway Weaver|z=1000;t|s=9999|rg=1|1=Nearby players get a bonus against: Flow Invader|z=1000;t|s=9999|rg=1|1=Nearby players get a bonus against: Twinkle Popper|z=1000;t|s=9999|rg=1|1=Nearby players get a bonus against: Mini Star Cell|z=1000;t|s=9999|rg=1|1=Nearby players get a bonus against: Star Cell|z=1000;t|s=9999|rg=1|1=Nearby players get a bonus against: Corite|z=1000;t|s=9999|rg=1|1=Nearby players get a bonus against: Sroller|z=1000;t|s=9999|rg=1|1=Nearby players get a bonus against: Crawltipede|z=1000;t|s=9999|rg=1|1=Nearby players get a bonus against: Drakomire Rider|z=1000;t|s=9999|rg=1|1=Nearby players get a bonus against: Drakomire|z=1000;t|s=9999|rg=1|1=Nearby players get a bonus against: Selenian|z=1000;t|s=9999|rg=1|1=Nearby players get a bonus against: Predictor|z=1000;t|s=9999|rg=1|1=Nearby players get a bonus against: Brain Suckler|z=1000;t|s=9999|rg=1|1=Nearby players get a bonus against: Nebula Floater|z=1000;t|s=9999|rg=1|1=Nearby players get a bonus against: Evolution Beast|z=1000;t|s=9999|rg=1|1=Nearby players get a bonus against: Alien Larva|z=1000;t|s=9999|rg=1|1=Nearby players get a bonus against: Alien Queen|z=1000;t|s=9999|rg=1|1=Nearby players get a bonus against: Alien Hornet|z=1000;t|s=9999|rg=1|1=Nearby players get a bonus against: Vortexian|z=1000;t|s=9999|rg=1|1=Nearby players get a bonus against: Storm Diver|z=1000;t|s=9999|rg=1|1=Nearby players get a bonus against: Pirate Captain|z=1000;t|s=9999|rg=1|1=Nearby players get a bonus against: Pirate Deadeye|z=1000;t|s=9999|rg=1|1=Nearby players get a bonus against: Pirate Corsair|z=1000;t|s=9999|rg=1|1=Nearby players get a bonus against: Pirate Crossbower|z=1000;t|s=9999|rg=1|1=Nearby players get a bonus against: Martian Walker|z=1000;t|s=9999|rg=1|1=Nearby players get a bonus against: Red Devil|z=1000;t|s=9999|rg=1|1=Nearby players get a bonus against: Pink Jellyfish|z=1000;t|s=9999|rg=1|1=Nearby players get a bonus against: Green Jellyfish|z=1000;t|s=9999|rg=1|1=Nearby players get a bonus against: Dark Mummy|z=1000;t|s=9999|rg=1|1=Nearby players get a bonus against: Light Mummy|z=1000;t|s=9999|rg=1|1=Nearby players get a bonus against: Angry Bones|z=1000;t|s=9999|rg=1|1=Nearby players get a bonus against: Ice Tortoise|z=1000;1;1;1;|s=9999|r=9|rg=25|1=Swirling energies emanate from this fragment|z=10000;|s=9999|r=9|rg=25|1=The power of a galaxy resides within this fragment|z=10000;|s=9999|r=9|rg=25|1=The fury of the universe lies within this fragment|z=10000;|s=9999|r=9|rg=25|1=Entrancing particles revolve around this fragment|z=10000;t|s=9999|r=10|rg=100|1=A pebble of the heavens|z=15000;t|s=9999|r=9|rg=100;d1|r=10|d=100|t=25|k=6|tx=27|tr=4|z=300000;d1|r=10|d=80|t=15|k=4|tx=27|tr=3|z=300000;d1|r=10|d=50|t=15|k=0.5|tp=225|tr=2|rg=1|z=350000;d1|r=10|d=110|t=30|k=7|th=100|tr=4|z=400000;d1|r=10|d=80|t=12|k=5.5|tp=225|tr=4|rg=1|z=350000;t|s=9999|r=10|rg=25|1=It vibrates with luminous celestial energy|z=60000;a1|r=10|rg=1|1=Allows flight and slow fall|z=400000;a1|r=10|rg=1|1=Allows flight and slow fall|2=Press Down to toggle hover|3=Press Up to deactivate hover|z=400000;a1|r=10|rg=1|1=Allows flight and slow fall|2=Press Down to toggle hover|3=Press Up to deactivate hover|z=400000;a1|r=10|rg=1|1=Allows flight and slow fall|z=400000;w|s=9999|r=9|rg=400;d1|r=10|d=105|t=20|k=2|rg=1|1=Strike with the fury of the sun|z=500000;s1|r=10|d=60|t=36|k=2|m=10|rg=1|1=Summons a stardust cell to fight for you|2=Cultivate the most beautiful cellular infection|z=500000;r1|r=10|d=50|t=20|k=2|rg=1|1=66% chance to not consume ammo|2=The catastrophic mixture of pew pew and boom boom.|z=500000;m1|r=10|d=70|t=30|k=5|m=30|rg=1|1=Conjure masses of astral energy to chase down your foes|z=500000;c|s=9999|r=3|d=20|t=15|k=3|rg=99|1=Spreads the Crimson to some blocks|z=100;4v1|rg=1|1=Wuv... twue wuv...|z=5000;5v1|rg=1|1=Mawwiage...|z=5000;r1|d=13|t=25|rg=1|z=10500;d1|d=10|t=27|k=5.5|th=59|rg=1|z=12000;d1|d=8|t=25|k=4.5|tx=12|rg=1|z=12000;d1|d=13|k=5|rg=1|z=10500;d1|d=16|t=17|k=6.5|rg=1|z=13500;d1|d=7|t=19|k=2|tp=59|rg=1|1=Can mine Meteorite|z=15000;r1|d=10|t=26|rg=1|z=5250;d1|d=9|t=28|k=5.5|th=50|rg=1|z=6000;d1|d=7|t=26|k=4.5|tx=11|rg=1|z=6000;d1|d=10|t=11|k=4|rg=1|z=5250;d1|d=14|t=19|k=6|rg=1|z=6750;d1|d=6|t=21|k=2|tp=50|rg=1|1=Can mine Meteorite|z=7500;r1|d=9|t=27|rg=1|z=2100;d1|d=8|t=29|k=5.5|th=43|rg=1|z=2400;d1|d=6|t=28|k=4.5|tx=10|rg=1|z=2400;d1|d=9|t=12|k=4|rg=1|z=2100;d1|d=13|t=20|k=5.5|rg=1|z=2700;d1|d=6|t=19|k=2|tp=43|rg=1|z=3000;r1|d=7|t=28|rg=1|z=525;d1|d=6|t=31|k=5.5|th=38|rg=1|z=600;d1|d=4|t=28|k=4.5|tx=8|rg=1|z=600;d1|d=7|t=12|k=4|rg=1|z=525;d1|d=10|t=20|k=5.5|rg=1|z=675;d1|d=5|t=21|k=2|tp=35|rg=1|z=750;r1|d=6|t=29|rg=1|z=350;d1|d=4|t=33|k=5.5|th=35|rg=1|z=400;d1|d=3|t=30|k=4.5|tx=7|rg=1|z=400;d1|d=5|t=13|k=4|rg=1|z=350;d1|d=9|t=21|k=5.5|rg=1|z=450;d1|d=4|t=23|k=2|tp=35|rg=1|z=500;r1|d=9|t=27|rg=1|z=3500;d1|d=9|t=29|k=5.5|th=45|rg=1|z=4000;d1|d=6|t=26|k=4.5|tx=10|rg=1|z=4000;d1|d=9|t=12|k=4|rg=1|z=3500;d1|d=14|t=20|k=6|rg=1|z=4500;d1|d=6|t=19|k=2|tp=45|rg=1|z=5000;r1|d=11|t=26|rg=1|z=7000;d1|d=9|t=28|k=5.5|th=55|rg=1|z=8000;d1|d=7|t=26|k=4.5|tx=11|rg=1|z=8000;d1|d=12|t=11|k=5|rg=1|z=7000;d1|d=15|t=18|k=6.5|rg=1|z=9000;d1|d=6|t=20|k=2|tp=55|rg=1|1=Can mine Meteorite|z=10000;d1|r=10|d=60|t=28|k=7|tx=30|th=100|tr=4|rg=1|z=250000;d1|r=10|d=60|t=28|k=7|tx=30|th=100|tr=4|rg=1|z=250000;d1|r=10|d=60|t=28|k=7|tx=30|th=100|tr=4|rg=1|z=250000;d1|r=10|d=60|t=28|k=7|tx=30|th=100|tr=4|rg=1|z=250000;|s=9999|r=4|rg=3|z=125000;|s=9999|r=4|rg=3|z=125000;|s=9999|r=4|rg=3|z=125000;|s=9999|r=4|rg=3|z=125000;|s=9999|r=4|rg=3|z=125000;s1|r=10|d=40|t=36|k=2|m=10|rg=1|1=Summons a stardust dragon to fight for you|2=Who needs a horde of minions when you have a giant dragon?|z=500000;c|s=9999|r=4|t=17|rg=5|1=Major improvements to all stats|2=Bacon? Bacon.|z=50000;|s=9999|r=3|rg=3|z=75000;|s=9999|r=2|rg=3|z=37500;|s=9999|r=3|rg=3|z=75000;avt|s=9999|r=9|rg=1|1=Wield a small amount of power from the Vortex Tower|z=1000000;avt|s=9999|r=9|rg=1|1=Wield a small amount of power from the Nebula Tower|z=1000000;avt|s=9999|r=9|rg=1|1=Wield a small amount of power from the Stardust Tower|z=1000000;avt|s=9999|r=9|rg=1|1=Wield a small amount of power from the Solar Tower|z=1000000;r1|r=10|d=50|t=12|k=2|rg=1|1=66% chance to not consume ammo|z=500000;m1|r=10|d=100|k=0.25|m=12|rg=1|1=Fire a lifeform disintegration rainbow|z=500000;m1|r=10|d=130|t=12|k=3|m=12|rg=1|1=From Orions belt to the palm of your hand|z=500000;d1|r=10|d=150|t=16|k=5|rg=1|1=Rend your foes asunder with a spear of light!|z=500000;c|s=9999|r=7|hl=200|t=17|rg=30|z=15000;t|s=9999|rg=1|1=Guts... and Gory!|z=10000;r1|r=8|d=25|t=30|k=4|rg=1|z=800000;c|s=9999|t=40|rg=99|1=A large explosion that will destroy most tiles|2=This will prove to be a terrible idea|z=2000;rc|s=9999|r=2|d=30|t=20|k=6|rg=99|1=A small explosion that will not destroy tiles|z=250;t|s=9999|r=10|rg=1|1=Used to craft items from Lunar Fragments and Luminite|z=250000;|s=9999|rg=3|z=10000;|s=9999|rg=3|z=10000;|s=9999|rg=3|z=10000;|s=9999|r=2|rg=3|z=37500;|s=9999|r=2|rg=3|z=37500;|s=9999|r=2|rg=3|z=37500;|s=9999|r=3|rg=3|z=75000;|s=9999|rg=3|z=10000;|s=9999|rg=3|z=10000;|s=9999|rg=3|z=10000;|s=9999|r=2|rg=3|z=10000;|s=9999|r=3|rg=3|z=75000;|s=9999|r=3|rg=3|z=75000;c|s=9999|t=15|rg=5|z=2500;c|s=9999|r=3|t=15|rg=3|z=500000;t|s=9999|rg=1;t|s=9999|r=3|rg=1|z=500000;rb|s=9999|r=9|d=20|k=3|rg=99|1=Line em up and knock em down...|z=10;rb|s=9999|r=9|d=15|k=3.5|rg=99|1=Shooting them down at the speed of sound!|z=10;sS1|r=10|d=100|t=30|k=7.5|m=10|rg=1|1=Summons a sentry|2=Summons a lunar portal to shoot lasers at your enemies|z=500000;m1|r=10|d=100|k=4.5|m=9|rg=1|1=Rains down lunar flares|z=500000;sS1|r=10|d=130|t=30|k=7.5|m=10|rg=1|1=Summons a sentry|2=Summons a radiant crystal that banishes your enemies|3=The colors, Duke, the colors!|z=500000;1|r=10|t=20|rg=1|1=You want the moon? Just grapple it and pull it down!|z=500000;t|s=9999|rg=100;t|s=9999|rg=100;t|s=9999|rg=100;t|s=9999|rg=100;1|r=10|t=20|rg=1|1=Calls upon a suspicious looking eye to provide light|2=I know what youre thinking....|z=500000;5v1|r=9|rg=1|1=Great for impersonating devs!|z=250000;6v1|r=9|rg=1|1=Great for impersonating devs!|z=250000;a1|r=9|rg=1|1=Great for impersonating devs!|2=Allows flight and slow fall|3=Whatever this accessory does to you is not a bug!|z=400000;av1|r=9|rg=1|1=Great for impersonating devs!|2=If you see this you should probably run away...|z=250000;a1|r=9|rg=1|1=Great for impersonating devs!|2=Allows flight and slow fall|z=400000;4v1|r=9|rg=1|1=Great for impersonating devs!|z=250000;w|s=9999|rg=400;4v1|r=9|rg=1|1=Great for impersonating devs!|z=250000;5v1|r=9|rg=1|1=Great for impersonating devs!|z=250000;6v1|r=9|rg=1|1=Great for impersonating devs!|z=250000;a1|r=9|rg=1|1=Great for impersonating devs!|2=Allows flight and slow fall|z=400000;4v1|r=9|rg=1|1=Great for impersonating devs!|2=Disorder came from order, fear came from courage, weakness came from strength|z=250000;5v1|r=9|rg=1|1=Great for impersonating devs!|2=Know thy self, know thy enemy. A thousand battles, a thousand victories…|z=250000;6v1|r=9|rg=1|1=Great for impersonating devs!|2=Wheels of justice grind slow but grind fine.|z=250000;a1|r=9|rg=1|1=Great for impersonating devs!|2=Allows flight and slow fall|3=Let your plans be dark and impenetrable as night, and when you move, fall like a thunderbolt.|z=400000;t|s=9999|rg=1|1=Nearby players get a bonus against: Sand Slime|z=1000;t|s=9999|rg=1|1=Nearby players get a bonus against: Sea Snail|z=1000;t|s=9999|rg=1|z=50000;t|s=9999|rg=1|1=V. Costa Moura|z=30000;|s=9999|r=3|rg=3|z=75000;|s=9999|r=3|rg=3|z=75000;|s=9999|r=9|rg=3|1=Great for impersonating devs!|z=150000;|s=9999|r=3|rg=3|z=75000;c|s=9999|r=10|t=45|rg=3|1=Summons the Impending Doom;t|s=9999|rg=5|1=Place this on logic gates to add checks|z=1000;t|s=9999|rg=5|1=Activates when all lamps are on, deactivates otherwise|z=20000;t|s=9999|rg=5|1=Judges logic gate lamps above it|2=Activates when any lamp is on, deactivates otherwise|z=20000;t|s=9999|rg=5|1=Activates when not all lamps are on, deactivates otherwise|z=20000;t|s=9999|rg=5|1=Judges logic gate lamps above it|2=Activates when no lamp is on, deactivates otherwise|z=20000;t|s=9999|rg=5|1=Judges logic gate lamps above it|2=Activates when only one lamp is on, deactivates otherwise|z=20000;t|s=9999|rg=5|1=Judges logic gate lamps above it|2=Activates when the total on lamps is not one, deactivates otherwise|3=Also often called NXOR|z=20000;t|s=9999|rg=100|z=500;t|s=9999|rg=100|z=500;1|r=2|rg=1|1=Allows ultimate control over wires!|2=Right Click while holding to edit wire settings|z=200000;1|t=15|tr=20|rg=1|1=Places yellow wire|z=20000;t|s=9999|rg=5|1=Activates once day starts;t|s=9999|rg=5|1=Activates once night starts;t|s=9999|rg=5|1=Activates whenever players are over it, deactivates otherwise;t|s=9999|rg=25|1=Separates wire paths|2=Its also hammerable!|z=200;t|s=9999|rg=1;t|s=9999|rg=5|1=Place this on logic gates to add checks|z=1000;a1|r=3|rg=1|1=Grants improved wire vision|z=10000;1|t=15|tr=20|rg=1|1=Activates Actuators|z=20000;t|s=9999|rg=100|z=100;t|s=9999|rg=200|z=100;1|r=10|t=20|rg=1|z=500000;a1|r=3|rg=1|1=Automatically places actuators on placed objects|z=100000;1|t=15|tr=20|rg=1|1=Right Click while holding to edit wire settings|z=120000;t|s=9999|rg=5|1=Activates when a player steps on or off it;4v1|rg=1|z=10000;1|t=20|rg=1|1=Susceptible to lava!|z=5000000;t|s=9999|r=2|rg=5|1=Lights up bulbs for each wire color|z=50000;t|s=9999|rg=5|1=Activates when a player steps on or off it;t|s=9999|rg=5|1=Activates when a player steps on or off it;t|s=9999|rg=5|1=Activates when a player steps on or off it;t|s=9999|rg=100|z=100;t|s=9999|rg=100|z=100;t|s=9999|rg=100|z=100;t|s=9999|rg=100|z=100;t|s=9999|rg=100|z=100;t|s=9999|rg=200|z=100;t|s=9999|rg=200|z=100;t|s=9999|rg=200|z=100;t|s=9999|rg=200|z=100;t|s=9999|rg=200|z=100;1|rg=1|1=For Capture the Gem. It drops when you die;t|s=9999|rg=1|1=Right Click to place or remove Large Rubies|z=500;t|s=9999|rg=1|1=Right Click to place or remove Large Sapphires|z=500;t|s=9999|rg=1|1=Right Click to place or remove Large Emeralds|z=500;t|s=9999|rg=1|1=Right Click to place or remove Large Topazes|z=500;t|s=9999|rg=1|1=Right Click to place or remove Large Amethysts|z=500;t|s=9999|rg=1|1=Right Click to place or remove Large Diamonds|z=500;t|s=9999|rg=1|1=Right Click to place or remove Large Ambers|z=500;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=5|1=Place this on logic gate lamps to randomize the activation|z=20000;t|s=9999|r=3|rg=1|z=100000;t|s=9999|rg=1|z=500;t|s=9999|rg=1|z=500;t|s=9999|rg=1|z=500;t|s=9999|rg=1|z=500;t|s=9999|rg=1|z=500;t|s=9999|rg=1|z=500;t|s=9999|rg=1|z=500;t|s=9999|rg=1|z=500;t|s=9999|rg=1|z=500;t|s=9999|rg=1|z=500;t|s=9999|rg=1|z=500;t|s=9999|rg=1|z=500;t|s=9999|rg=1|z=500;t|s=9999|rg=1|z=500;t|s=9999|rg=1|z=500;t|s=9999|rg=1|z=500;t|s=9999|rg=1|z=500;t|s=9999|rg=1|z=500;t|s=9999|rg=1|z=500;t|s=9999|rg=1|z=500;t|s=9999|rg=1|z=500;t|s=9999|rg=1|z=500;t|s=9999|rg=1|z=500;t|s=9999|rg=1|z=500;t|s=9999|rg=1|z=500;t|s=9999|rg=1|z=500;t|s=9999|rg=1|z=500;t|s=9999|rg=1|z=500;t|s=9999|rg=1|z=500;t|s=9999|rg=1|z=500;t|s=9999|rg=1|z=500;t|s=9999|rg=1|z=500;t|s=9999|rg=1|z=500;t|s=9999|rg=1|z=500;t|s=9999|rg=1|z=500;t|s=9999|rg=1|z=500;t|s=9999|rg=1|z=500;t|s=9999|rg=1|z=500;t|s=9999|rg=1|z=500;t|s=9999|rg=1|z=500;t|s=9999|z=500;t|s=9999|z=500;t|s=9999|rg=5|1=Activates when a projectile touches it|z=20000;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;a1|r=3|rg=1|1=Fishing line will never break, decreases chance of bait consumption, increases fishing power by 10|z=150000;t|s=9999|rg=5|z=10000;t|s=9999|rg=1|1=Life regen is increased when near a campfire;t|s=9999|rg=1|1=Life regen is increased when near a campfire;t|s=9999|rg=25|1=Separates wire paths|2=Toggle lights with simultaneous crossed signals|z=200;t|s=9999|rg=5|1=Activates whenever occupied by water, deactivates otherwise;t|s=9999|rg=5|1=Activates whenever occupied by lava, deactivates otherwise;t|s=9999|rg=5|1=Activates whenever occupied by honey, deactivates otherwise;t|s=9999|rg=5|1=Activates whenever occupied by liquid, deactivates otherwise;av1|rg=1|z=20000;av1|rg=1|z=20000;4v1|rg=1|z=10000;4v1|rg=1|z=30000;5v1|rg=1|z=30000;6v1|rg=1|z=30000;t|s=9999|rg=100|1=Smells like bubblegum and happiness|z=100;t|s=9999|rg=100|1=Smells like lavender and enthusiasm|z=100;t|s=9999|rg=100|1=Smells like mint and glee|z=100;t|s=9999|tr=3|rg=100|1=Oddly durable enough to climb!|z=50;t|s=9999|tr=3|rg=100|1=Oddly durable enough to climb!|z=50;t|s=9999|tr=3|rg=100|1=Oddly durable enough to climb!|z=50;t|s=9999|rg=1|1=It never stops celebrating!|z=50000;t|s=9999|rg=1|z=1000;t|s=9999|rg=1|z=1000;t|s=9999|rg=1|z=1000;t|s=9999|rg=1|1=Beat the shindig out of it!|2=May contain a suprise!|z=10000;t|s=9999|r=3|rg=1|1=Balloons shall rain from the sky|z=200000;t|s=9999|rg=1|1=Tied down for everyones pleasure|z=2000;t|s=9999|rg=1|1=Wonder whats inside?|z=2000;t|s=9999|r=3|rg=3|1=Stuff your face. Stuff someone elses face. Whatever.|z=25000;w|s=9999|rg=400|1=Productivity up 200%;w|s=9999|rg=400|1=Falling sand you can safely watch;w|s=9999|rg=400|1=A lot cooler than a snow globe;t|s=9999|rg=100|1=Falling sand you can safely watch|z=5;t|s=9999|rg=100|1=A lot cooler than a snow globe;t|s=9999|rg=100|1=Prevents fall damage;4v1|r=9|rg=1|1=Become the Pedguin|2=Great for impersonating streamers!|z=15000;5v1|r=9|rg=1|1=Become the Pedguin|2=Great for impersonating streamers!|z=15000;6v1|r=9|rg=1|1=Become the Pedguin|2=Great for impersonating streamers!|z=15000;w|s=9999|rg=400|1=Smells like bubblegum and happiness;w|s=9999|rg=400|1=Smells like lavender and enthusiasm;w|s=9999|rg=400|1=Smells like mint and glee;4v1|r=9|rg=1|1=Enables your inner wingman|2=Great for impersonating streamers!|z=50000;d1|r=4|d=48|t=16|k=3|rg=1|z=50000;d1|r=4|d=48|t=16|k=3|rg=1|z=50000;d1|r=4|d=48|t=16|k=3|rg=1|z=50000;d1|r=4|d=48|t=16|k=3|rg=1|z=50000;d1|r=4|d=48|t=16|k=3|rg=1|z=50000;d1|r=4|d=48|t=16|k=3|rg=1|z=50000;61|r=4|rg=1|1=Grants slow fall in exchange for your feet|z=50000;1|r=8|t=20|rg=1|1=Summons a rideable basilisk mount|z=250000;d1|r=2|d=16|t=18|k=4.5|rg=1|z=5000;4v1|r=3|rg=1|z=25000;5v1|r=3|rg=1|z=25000;6v1|r=3|rg=1|z=25000;41|r=5|D=6|rg=1|1=15% increased magic and summon damage|z=250000;51|r=5|D=12|rg=1|1=Increases maximum mana by 40|2=10% increased summon damage|3=Increases your max number of minions by 1|z=200000;61|r=5|D=8|rg=1|1=Increases maximum mana by 40|2=10% increased magic damage|3=Increases your max number of minions by 1|z=150000;m1|r=4|d=85|t=22|k=5|m=14|rg=1|z=50000;t|s=9999|rg=1|1=Nearby players get a bonus against: Sand Elemental|z=1000;a1|r=3|rg=1|1=Immunity to Petrification|z=100000;t|s=9999|rg=1|z=200;|s=9999|r=5|rg=3|z=50000;6v1|r=3|rg=1|z=25000;5v1|r=3|rg=1|z=25000;4v1|r=3|rg=1|z=25000;m1|r=4|c=20|d=38|t=12|k=6|m=17|rg=1|z=300000;r1|r=4|d=24|t=48|k=6.5|rg=1|z=250000;t|s=9999|rg=1|1=Nearby players get a bonus against: Sand Shark|z=1000;t|s=9999|rg=1|1=Nearby players get a bonus against: Bone Biter|z=1000;t|s=9999|rg=1|1=Nearby players get a bonus against: Flesh Reaver|z=1000;t|s=9999|rg=1|1=Nearby players get a bonus against: Crystal Thresher|z=1000;t|s=9999|rg=1|1=Nearby players get a bonus against: Angry Tumbler|z=1000;|s=9999|rg=5|z=500;t|s=9999|r=3|rg=1|z=25000;at1|r=4|rg=1|z=100000;41|r=8|D=7|rg=1|1=Increases your max number of sentries by 1, 10% increased magic damage and reduces mana costs by 10%|z=150000;51|r=8|D=15|rg=1|1=20% increased summon damage and 10% increased magic damage|z=150000;61|r=8|D=10|rg=1|1=10% increased summon damage, 20% increased magic critical strike chance and movement speed|z=150000;41|r=8|D=13|rg=1|1=Increases your max number of sentries by 1 and increases your life regeneration|z=150000;51|r=8|D=27|rg=1|1=15% increased summon and melee damage|z=150000;61|r=8|D=18|rg=1|1=15% increased summon damage, 15% increased melee critical strike chance and movement speed|z=150000;41|r=8|D=7|rg=1|1=Increases your max number of sentries by 1 and increases ranged critical strike chance by 10%|z=150000;51|r=8|D=17|rg=1|1=20% increased summon and ranged damage and 10% chance to not consume ammo|z=150000;61|r=8|D=12|rg=1|1=10% increased summon damage and 20% increased movement speed|z=150000;41|r=8|D=8|rg=1|1=Increases your max number of sentries by 1 and increases melee speed by 20%|z=150000;51|r=8|D=22|rg=1|1=20% increased summon and melee damage|z=150000;61|r=8|D=16|rg=1|1=10% increased summon damage,|2=15% increased melee critical strike chance and 20% increased movement speed|z=150000;a1|r=5|rg=1|1=Increase your max number of sentries by 1|2=Increases summon damage by 10%|z=150000;a1|r=5|rg=1|1=Increase your max number of sentries by 1|2=Increases summon damage by 10%|z=150000;a1|r=5|rg=1|1=Increase your max number of sentries by 1|2=Increases summon damage by 10%|z=150000;a1|r=5|rg=1|1=Increase your max number of sentries by 1|2=Increases summon damage by 10%|z=150000;t|s=9999|r=3|rg=1|1=Can be used to store your items|2=Stored items can only be accessed by you|z=100000;t|s=9999|rg=1|1=Right Click to have more sentries|z=100000;t|s=9999|rg=1|z=100000;t|s=9999|r=3|rg=1|1=Holds the Eternia Crystal|2=Interact while carrying an Eternia Crystal to summon Etherias portals|3=Interact with the crystal to skip extra time between waves|z=10000;|s=9999|r=3|rg=50|1=Currency for trading with the Tavernkeep;sS1|r=3|d=17|t=30|k=3|m=5|rg=1|1=Summons a sentry|2=An average speed tower that shoots exploding fireballs|3=Costs 10 Etherian Mana per use while defending an Eternia Crystal|z=50000;sS1|r=5|d=42|t=30|k=3|m=10|rg=1|1=Summons a sentry|2=An average speed tower that shoots exploding fireballs|3=Costs 10 Etherian Mana per use while defending an Eternia Crystal|z=250000;sS1|r=8|d=88|t=30|k=3|m=15|rg=1|1=Summons a sentry|2=An average speed tower that shoots exploding fireballs|3=Costs 10 Etherian Mana per use while defending an Eternia Crystal|z=750000;r1|d=20|t=40|k=7|rg=1|z=500;|s=9999|1=Often used to manifest ones will as a physical form of defense;d1|r=5|d=95|t=20|k=6.5|rg=1|1=Right Click to guard with a shield|z=50000;sS1|r=3|d=30|t=30|k=4.7|m=5|rg=1|1=Summons a sentry|2=A slow but high damage tower that shoots piercing bolts|3=Costs 10 Etherian Mana per use while defending an Eternia Crystal|z=50000;sS1|r=5|d=74|t=30|k=4.7|m=10|rg=1|1=Summons a sentry|2=A slow but high damage tower that shoots piercing bolts|3=Costs 10 Etherian Mana per use while defending an Eternia Crystal|z=250000;sS1|r=8|d=156|t=30|k=4.7|m=15|rg=1|1=Summons a sentry|2=A slow but high damage tower that shoots piercing bolts|3=Costs 10 Etherian Mana per use while defending an Eternia Crystal|z=750000;d1|r=8|d=180|t=20|k=5.5|rg=1|1=Unleashes the hearts energy forward|z=250000;c|s=9999|r=3|rg=3|1=Place in the Eternia Crystal Stand to summon Etherias portals|z=2500;sS1|r=3|d=4|t=30|k=0.25|m=5|rg=1|1=Summons a sentry|2=An aura that repeatedly zaps enemies that go inside|3=Aura damage penetrates enemy defense|4=Hits quickly at the expense of 50% tag damage|5=Costs 10 Etherian Mana per use while defending an Eternia Crystal|z=50000;sS1|r=5|d=11|t=30|k=0.25|m=10|rg=1|1=Summons a sentry|2=An aura that repeatedly zaps enemies that go inside|3=Aura damage penetrates enemy defense|4=Hits quickly at the expense of 50% tag damage|5=Costs 10 Etherian Mana per use while defending an Eternia Crystal|z=250000;sS1|r=8|d=34|t=30|k=0.25|m=15|rg=1|1=Summons a sentry|2=An aura that repeatedly zaps enemies that go inside|3=Aura damage penetrates enemy defense|4=Hits quickly at the expense of 50% tag damage|5=Costs 10 Etherian Mana per use while defending an Eternia Crystal|z=750000;sS1|r=3|d=24|t=30|k=0.5|m=5|rg=1|1=Summons a sentry|2=A trap that explodes when enemies come near|3=Costs 10 Etherian Mana per use while defending an Eternia Crystal|z=50000;sS1|r=5|d=59|t=30|k=0.5|m=10|rg=1|1=Summons a sentry|2=A trap that explodes when enemies come near|3=Costs 10 Etherian Mana per use while defending an Eternia Crystal|z=250000;sS1|r=8|d=126|t=30|k=0.5|m=15|rg=1|1=Summons a sentry|2=A trap that explodes when enemies come near|3=Costs 10 Etherian Mana per use while defending an Eternia Crystal|z=750000;d1|r=5|d=50|t=30|k=7|rg=1|1=Charges power as it is swung to smash enemies|z=50000;d1|r=5|d=45|t=27|k=7|rg=1|1=Summons ghosts as it hits enemies|z=50000;t|s=9999|rg=1|1=Nearby players get a small bonus against: Etherian Goblin Bomber|z=1000;t|s=9999|rg=1|1=Nearby players get a small bonus against: Etherian Goblin|z=1000;t|s=9999|rg=1|1=Nearby players get a small bonus against: Old Ones Skeleton|z=1000;t|s=9999|rg=1|1=Nearby players get a small bonus against: Drakin|z=1000;t|s=9999|rg=1|1=Nearby players get a small bonus against: Kobold Glider|z=1000;t|s=9999|rg=1|1=Nearby players get a small bonus against: Kobold|z=1000;t|s=9999|rg=1|1=Nearby players get a small bonus against: Wither Beast|z=1000;t|s=9999|rg=1|1=Nearby players get a small bonus against: Etherian Wyvern|z=1000;t|s=9999|rg=1|1=Nearby players get a small bonus against: Etherian Javelin Thrower|z=1000;t|s=9999|rg=1|1=Nearby players get a small bonus against: Etherian Lightning Bug|z=1000;1;1;1;1;1;m1|r=5|d=36|t=25|k=9|m=20|rg=1|1=Gotta wonder who stuck a tome of infinite wisdom on a stick...|2=Right Click to cast a powerful tornado|z=50000;1;r1|r=5|d=32|t=18|k=2|rg=1|1=Harnesses the power of undying flames|z=50000;1|r=3|t=20|rg=1|1=Summons a pet gato|z=100000;1|r=3|t=20|rg=1|1=Summons a pet flickerwick to provide light|z=100000;1|r=3|t=20|rg=1|1=Summons a pet dragon|z=100000;d1|r=8|d=140|t=30|k=5|rg=1|1=Right Click while holding for an alternate attack!|z=250000;r1|r=8|c=3|d=39|t=30|k=4.5|rg=1|1=Shoots splitting arrows, deals more damage to airborne enemies|z=250000;c|s=9999|r=8|rg=3|1=Right Click to open;c|s=9999|r=5|1=Right Click to open;c|s=9999|r=3|1=Right Click to open;4v1|rg=1|z=37500;4v1|rg=1|z=37500;4v1|rg=1|z=37500;t|s=9999|rg=1|z=50000;t|s=9999|rg=1|z=50000;t|s=9999|rg=1|z=50000;at1|r=4|rg=1|z=100000;m1|r=8|d=100|t=20|k=7|m=14|rg=1|1=Splashes defense reducing miasma!|z=250000;41|r=8|D=20|rg=1|1=Increases your max number of sentries by 2 and increases summon and melee damage by 10%|z=150000;51|r=8|D=24|rg=1|1=30% increased summon damage and massively increased life regeneration|z=150000;61|r=8|D=24|rg=1|1=20% increased summon damage and melee critical strike chance and movement speed|z=150000;41|r=8|D=7|rg=1|1=Increases your max number of sentries by 2|2=15% increased summon & magic damage|z=150000;51|r=8|D=21|rg=1|1=25% increased summon damage and 10% increased magic damage|2=Reduces mana costs by 15%|z=150000;61|r=8|D=14|rg=1|1=20% increased summon damage and 25% increased magic critical strike chance|2=20% increased movement speed|z=150000;41|r=8|D=8|rg=1|1=Increases your max number of sentries by 2|2=10% increased summon damage and ranged critical strike chance|z=150000;51|r=8|D=24|rg=1|1=25% increased summon & ranged damage and 20% chance to not consume ammo|z=150000;61|r=8|D=16|rg=1|1=25% increased summon damage and 10% increased ranged critical strike chance|2=20% increased movement speed|z=150000;41|r=8|D=10|rg=1|1=Increases your max number of sentries by 2 and increases 20% melee & summon damage|z=150000;51|r=8|D=26|rg=1|1=20% increased summon damage and melee speed|2=5% increased melee critical strike chance|z=150000;61|r=8|D=18|rg=1|1=20% increased summon damage and melee critical strike chance|2=30% increased movement speed|z=150000;a1|r=8|rg=1|1=Allows flight and slow fall|2=Press Down to toggle hover|3=Press Up to deactivate hover|z=400000;t|s=9999|rg=1|z=500;t|s=9999|rg=1|z=100000;t|s=9999|rg=1|z=500;t|s=9999|rg=1|z=500;t|s=9999|rg=1|z=200;t|s=9999|rg=1|z=150;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=150;t|s=9999|rg=1|z=500;t|s=9999|rg=1|z=1500;t|s=9999|rg=1|z=3000;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=2000;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=200;t|s=9999|rg=200;t|s=9999|rg=200;t|s=9999|rg=200;t|s=9999|rg=200;t|s=9999|rg=200;t|s=9999|rg=1|z=150;t|s=9999|rg=1|z=100000;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;4v1|r=9|rg=1|1=Great for impersonating devs!|2=I didnt get this from the Grid|z=250000;5v1|r=9|rg=1|1=Great for impersonating devs!|2=I didnt get this from the Grid|z=250000;6v1|r=9|rg=1|1=Great for impersonating devs!|2=I didnt get this from the Grid|z=250000;a1|r=9|rg=1|1=Great for impersonating devs!|2=I didnt get this from the Grid|3=Allows flight and slow fall|z=400000;4v1|r=9|rg=1|1=Great for impersonating devs!|2=To keep those luscious locks as gorgeous as ever|z=250000;5v1|r=9|rg=1|1=Great for impersonating devs!|2=Bringing sexy back|z=250000;6v1|r=9|rg=1|1=Great for impersonating devs!|2=There might be pasta in the pockets|z=250000;a1|r=9|rg=1|1=Great for impersonating devs!|2=Allows flight and slow fall|3=Its full on! What does it mean?!|z=400000;av1|r=9|rg=1|1=Great for impersonating devs!|2=Brought to you by LeinCorp|z=250000;r1|r=10|d=50|t=6|k=10|rg=1|1=50% chance to not consume ammo|2=All good things end with a bang... or many!|z=500000;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=2000;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=1500;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=150;t|s=9999|rg=1|z=3000;t|s=9999|rg=1|z=500;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=200;t|s=9999|rg=1|z=500;t|s=9999|rg=1|z=150;t|s=9999|rg=1|z=300;t|s=9999|rg=200;t|s=9999|rg=1|1=Spider-sink, Spider-sink, does whatever a spider can...|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=150;t|s=9999|rg=1|z=500;t|s=9999|rg=100;w|s=9999|rg=400;t|s=9999|rg=100;w|s=9999|rg=400;t|s=9999|rg=100;w|s=9999|rg=400;t|s=9999|rg=200;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=2000;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=1500;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=150;t|s=9999|rg=1|z=3000;t|s=9999|rg=1|z=500;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=200;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=500;t|s=9999|rg=1|z=150;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=150;t|s=9999|rg=1|z=500;t|s=9999|rg=1|1=Right Click when placed to display hats and helmets;|s=9999|r=3|z=75000;t|s=9999|rg=10|1=Right Click to open|z=5000;t|s=9999|r=2|rg=10|1=Right Click to open|z=25000;t|s=9999|r=3|rg=10|1=Right Click to open|z=100000;t|s=9999|r=2|rg=5|1=Right Click to open|z=50000;t|s=9999|r=2|rg=5|1=Right Click to open|z=50000;t|s=9999|r=2|rg=5|1=Right Click to open|z=50000;t|s=9999|r=2|rg=5|1=Right Click to open|z=50000;t|s=9999|r=2|rg=5|1=Right Click to open|z=50000;t|s=9999|r=2|rg=5|1=Right Click to open|z=50000;t|s=9999|rg=1|1=Activates when opened|z=500;a1|r=2|rg=1|1=Can be hit with a golf club|z=10000;a1|r=5|rg=1|1=The wearer can run super fast|2=Increases jump speed and allows auto-jump|3=Increases fall resistance|z=100000;a1|r=5|rg=1|1=8% reduced mana usage|2=Automatically use mana potions when needed|3=Enemies are less likely to target you|z=500000;a1|r=5|D=8|rg=1|1=Increases melee knockback|2=12% increased melee speed|3=Enables auto swing for melee weapons|4=Increases the size of melee weapons|5=Enemies are more likely to target you|z=500000;a1|r=5|rg=1|1=Allows flight|2=The wearer can run super fast|3=Flowers grow on the grass you walk on|z=400000;a1|r=5|rg=1|1=Grants the ability to swim|2=Increases jump speed and allows auto-jump|3=Increases fall resistance|z=100000;a1|r=5|rg=1|1=Grants the ability to swim|2=Allows the ability to climb walls|3=Increases jump speed and allows auto-jump|4=Increases fall resistance|5=It aint easy being green|z=250000;a1|r=5|rg=1|1=Allows the ability to climb walls|2=Increases jump speed and allows auto-jump|3=Increases fall resistance|z=100000;a1|r=5|D=6|rg=1|1=Grants immunity to knockback|2=Puts a shell around the owner when below 50% life that reduces damage by 25%|3=Absorbs 25% of damage done to players on your team when above 25% life|z=400000;a1|r=5|D=10|rg=1|1=Grants immunity to knockback|2=Absorbs 25% of damage done to players on your team when above 25% life|3=Enemies are more likely to target you|z=500000;a1|r=5|rg=1|1=Provides 7 seconds of immunity to lava|2=Grants immunity to fire blocks|z=125000;a1|r=5|rg=1|1=8% reduced mana usage|2=Automatically use mana potions when needed|3=Increases pickup range for mana stars|z=200000;a1|r=5|rg=1|1=8% reduced mana usage|2=Automatically use mana potions when needed|3=Causes stars to fall after taking damage|4=Stars restore mana when collected|z=150000;a1|r=5|rg=1|1=Increases arrow damage by 10% and greatly increases arrow speed|2=20% chance not to consume arrows|3=Lights wooden arrows ablaze|4=Quiver in fear!|z=375000;a1|r=6|rg=1|1=Provides 7 seconds of immunity to lava|2=Grants immunity to fire blocks|3=Reduces damage from touching lava|z=250000;a1|r=5|rg=1|1=Grants immunity to fire blocks|2=Reduces damage from touching lava|z=150000;a1|r=5|rg=1|1=Increases view range for guns (Right Click to zoom out)|2=10% increased ranged damage and critical strike chance|3=Enemies are less likely to target you|4=Enemy spotted|z=500000;a1|r=5|rg=1|1=Increases arrow damage by 10% and greatly increases arrow speed|2=20% chance not to consume arrows|3=Enemies are less likely to target you|z=500000;a1|r=5|rg=1|1=Increases armor penetration by 5|2=Releases bees and douses the user in honey when damaged|z=150000;41|r=5|D=4|rg=1|1=Improves vision and provides light when worn|2=The darkness holds no secrets for you|z=100000;c|s=9999|t=17|rg=5|1=Minor improvements to all stats|2=An apple a day keeps Doctor Bones away!|z=10000;1|1=Medium improvements to all stats|2=Mmmm... pie.;c|s=9999|r=4|t=17|rg=5|1=Major improvements to all stats|2=Nothing is as Terrarian as apple pie.|z=30000;c|s=9999|r=2|t=17|rg=5|1=Medium improvements to all stats|2=Make like a banana and split!|z=10000;c|s=9999|r=4|t=17|rg=5|1=Major improvements to all stats|2=Grilled to perfection!|z=50000;c|s=9999|t=17|rg=5|1=Minor improvements to all stats|2=This ones luck has run out.|z=10000;c|s=9999|r=3|t=17|rg=5|1=Major improvements to all stats|2=...but wait! It was 99 cents.|z=20000;c|s=9999|r=2|t=17|rg=5|1=Medium improvements to all stats|2=Caution: may contain harpy.|z=20000;c|s=9999|r=3|t=17|rg=5|1=Medium improvements to all stats|2=Fresh from the oven|z=30000;c|s=9999|r=3|t=17|rg=5|1=Medium improvements to all stats|2=Its so fizzy!|z=20000;c|s=9999|r=2|t=17|rg=5|1=Medium improvements to all stats|2=Look at that S Car Go!|z=10000;c|s=9999|r=2|t=17|rg=5|1=Medium improvements to all stats|2=Sunny side up!|z=20000;c|s=9999|r=2|t=17|rg=5|1=Medium improvements to all stats|2=Wheres the Ketchup!?|z=10000;c|s=9999|r=6|t=17|rg=5|1=Major improvements to all stats|2=(Au)some!|z=500000;c|s=9999|r=3|t=17|rg=5|1=Medium improvements to all stats|2=Wrath not included.|z=20000;c|s=9999|t=17|rg=5|1=Minor improvements to all stats|2=Thatll keep you out of my birdfeeders...|z=10000;c|s=9999|r=3|t=17|rg=5|1=Major improvements to all stats|2=Hot diggity!|z=30000;c|s=9999|r=2|t=17|rg=5|1=Medium improvements to all stats|2=Eat it before it melts!|z=20000;c|s=9999|r=4|t=17|rg=5|1=Major improvements to all stats|2=It brings the boys to the yard!|z=30000;c|s=9999|r=3|t=17|rg=5|1=Medium improvements to all stats|2=Its nach-yos, its mine!|z=20000;c|s=9999|r=3|t=17|rg=5|1=Major improvements to all stats|2=With pepperoni and extra cheese.|z=20000;c|s=9999|r=2|t=17|rg=5|1=Minor improvements to all stats|2=Betcha cant eat just one!|z=15000;c|s=9999|t=17|rg=5|1=Minor improvements to all stats|2=Serving Size: 1 child.|z=10000;c|s=9999|r=2|t=17|rg=5|1=Medium improvements to all stats|2=Better than chicken from a wall.|z=10000;c|s=9999|t=17|rg=5|1=Minor improvements to all stats|2=The other, other white meat.|z=5000;c|s=9999|r=2|t=17|rg=5|1=Medium improvements to all stats|2=I sea food, I eat it.|z=5000;c|s=9999|r=3|t=17|rg=5|1=Medium improvements to all stats|2=Po Boy are you in for a treat!|z=25000;c|s=9999|r=3|t=17|rg=5|1=Major improvements to all stats|2=Al dente!|z=20000;c|s=9999|r=4|t=17|rg=5|1=Major improvements to all stats|2=Well done with ketchup!|z=30000;a1|r=5|rg=1|1=Grants immunity to fire blocks|2=Provides 7 seconds of immunity to lava|z=375000;1|r=2|t=12|rg=1|1=A well-rounded club best for mid-range distances|2=Golf balls will carry a good distance with decent vertical loft|z=10000;t|s=9999|r=2|rg=1|1=Aim to sink your golf ball in the cup|2=Lets everyone know how well you did|z=10000;t|s=9999|rg=25|z=500;t|s=9999|rg=25|z=500;t|s=9999|rg=25|z=500;t|s=9999|rg=25|z=500;t|s=9999|rg=25|z=500;t|s=9999|rg=25|z=500;t|s=9999|rg=25|z=500;t|s=9999|rg=25|z=500;1|t=30|rg=1|1=Mows Pure and Hallowed grass|2=Mowed grass reduces enemy spawn chance|z=10000;t|s=9999|rg=100;t|s=9999|rg=100;w|s=9999|rg=400;w|s=9999|rg=400;avt|s=9999|r=3|rg=1|1=Sustain a bloody fraction of the Moon|z=50000;a1|rg=1|1=The wearer can run super fast, and even faster on sand|2=Walk without rhythm and you wont attract the worm|z=50000;a1|rg=1|1=Increases mining speed by 25%|2=Ancient problems require ancient solutions|z=50000;1|r=3|t=12|rg=1|1=Playable Instrument|2=These licks are spicy|z=10000;r1|r=3|d=8|t=17|k=5|z=100000;d1|d=8|t=18|k=4|tp=55|rg=1|z=15000;r1|r=3|d=60|t=18|k=5|rg=1|1=Sure, Brain, but where are you going to get enough stars for this?|z=500000;d1|d=14|t=28|k=6|rg=1|z=15000;m1|d=20|t=17|k=3|m=7|rg=1|z=15000;t|s=9999|rg=1|1=Badum, psh|z=100000;t|s=9999|rg=1|z=400;t|s=9999|rg=1|z=500;1|rg=1|z=25000;1|rg=1|1=Allows quick travel in water|2=Deal with it|z=50000;c|s=9999|t=15|rg=3|1=Hey! Listen!|z=50000;c|s=9999|t=15|rg=3|1=Hey! Listen!|z=50000;c|s=9999|t=15|rg=3|1=Hey! Listen!|z=50000;t|s=9999|rg=1|z=50000;t|s=9999|rg=1|z=10000;t|s=9999|rg=1|z=10000;t|s=9999|rg=1|z=2000;t|s=9999|rg=1|z=5000;t|s=9999|r=3|rg=1|1=Can be used to store your items|2=Stored items can only be accessed by you|3=Will contain items picked up by a void bag|z=100000;at1|r=4|rg=1|z=100000;at1|r=4|rg=1|z=100000;at1|r=4|rg=1|z=100000;at1|r=4|rg=1|z=100000;at1|r=4|rg=1|z=100000;at1|r=4|rg=1|z=100000;t|s=9999|rg=1|z=2000;t|s=9999|rg=1|z=2000;t|s=9999|rg=1|z=2000;t|s=9999|rg=1|z=2000;t|s=9999|rg=1|z=2000;t|s=9999|rg=1|z=2000;t|s=9999|r=2|rg=1|1=Right Click to place a golf ball on it|z=10000;t|s=9999|rg=100|z=500;t|s=9999|rg=100|1=Portals cannot be created on the surface of these blocks|z=100;1|r=2|t=12|rg=1|1=A specialized club for finishing holes|2=Golf balls will stay close to the ground over short distances for precision shots|z=10000;1|r=2|t=12|rg=1|1=A specialized club for sand pits or tall obstacles|2=Golf balls will gain tons of vertical loft but will not carry very far|z=10000;1|r=2|t=12|rg=1|1=A powerful club for long distances|2=Golf balls will carry very far, with little vertical loft|z=10000;1|r=4|rg=1|1=Returns your last hit Golf Ball to its previous position|2=Has a one stroke penalty|z=100000;t|s=9999|rg=1|z=150;t|s=9999|rg=1|z=150;t|s=9999|rg=1|z=150;t|s=9999|rg=1|z=150;t|s=9999|rg=1|1=How desperate are you?|z=150;t|s=9999|rg=1|z=150;t|s=9999|rg=1|z=150;t|s=9999|rg=1|z=150;t|s=9999|rg=1|z=150;t|s=9999|rg=1|z=150;t|s=9999|rg=1|z=150;t|s=9999|rg=1|z=150;t|s=9999|rg=1|z=150;t|s=9999|rg=1|z=150;t|s=9999|rg=1|z=150;t|s=9999|rg=1|z=150;t|s=9999|rg=1|z=150;t|s=9999|rg=1|z=150;t|s=9999|rg=1|z=150;t|s=9999|rg=1|z=150;t|s=9999|rg=1|z=150;t|s=9999|rg=1|z=150;t|s=9999|rg=1|z=150;t|s=9999|rg=1|z=150;t|s=9999|rg=1|z=150;t|s=9999|rg=1|z=150;t|s=9999|rg=1|z=150;t|s=9999|rg=1|z=150;t|s=9999|rg=1|z=150;t|s=9999|rg=1|z=150;t|s=9999|rg=1|z=150;t|s=9999|rg=1|z=100000;4v1|r=3|rg=1|z=25000;5v1|r=3|rg=1|z=25000;6v1|r=3|rg=1|z=25000;1|r=3|t=28|rg=1|1=Summons the void vault|2=Functions as an extended inventory when open|3=May pick up overflowing items when open|4=Right Click to close|5=This pocket dimension is out of this world!|z=100000;4v1|r=3|rg=1|z=25000;5v1|r=3|rg=1|z=25000;6v1|r=3|rg=1|z=25000;4v1|r=3|rg=1|z=25000;5v1|r=3|rg=1|z=25000;6v1|r=3|rg=1|z=25000;4v1|r=3|rg=1|z=25000;t|s=9999|rg=100;w|s=9999|rg=400;t|s=9999|rg=1|z=150;t|s=9999|rg=1|1=Used for special crafting|z=100000;1;d1|r=2|d=17|t=25|k=3|rg=1|1=Unleashes a dicing flurry|z=250000;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=2000;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=1500;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=150;t|s=9999|rg=1|z=3000;t|s=9999|rg=1|z=500;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=200;t|s=9999|rg=1|z=500;t|s=9999|rg=1|z=150;t|s=9999|rg=1|z=300;t|s=9999|rg=200;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=150;t|s=9999|rg=1|z=500;t|s=9999|rg=1|z=150;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=2000;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=1500;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=150;t|s=9999|rg=1|z=3000;t|s=9999|rg=1|z=500;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=200;t|s=9999|rg=1|z=500;t|s=9999|rg=1|z=150;t|s=9999|rg=1|z=300;t|s=9999|rg=200;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=150;t|s=9999|rg=1|z=500;t|s=9999|rg=1|z=150;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=2000;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=1500;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=150;t|s=9999|rg=1|z=3000;t|s=9999|rg=1|z=500;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=200;t|s=9999|rg=1|z=500;t|s=9999|rg=1|z=150;t|s=9999|rg=1|z=300;t|s=9999|rg=200;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=150;t|s=9999|rg=1|z=500;t|s=9999|rg=1|z=150;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=2000;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=1500;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=150;t|s=9999|rg=1|z=3000;t|s=9999|rg=1|z=500;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=200;t|s=9999|rg=1|z=500;t|s=9999|rg=1|z=150;t|s=9999|rg=1|z=300;t|s=9999|rg=200;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=150;t|s=9999|rg=1|z=500;t|s=9999|rg=1|z=150;t|s=9999|rg=100;t|s=9999|rg=100;t|s=9999|rg=100;t|s=9999|rg=100;w|s=9999|rg=400;w|s=9999|rg=400;w|s=9999|rg=400;w|s=9999|rg=400;at1|r=4|rg=1|1=Brought to you by Xenon and DJ Sniper|z=100000;t|s=9999|rg=100|1=May break when stepped on;t|s=9999|rg=100|1=May break when stepped on;t|s=9999|rg=100|1=May break when stepped on;t|s=9999|rg=25|z=500;a1|r=2|rg=1|1=Can be hit with a golf club|z=10000;a1|r=2|rg=1|1=Can be hit with a golf club|z=10000;a1|r=2|rg=1|1=Can be hit with a golf club|z=10000;a1|r=2|rg=1|1=Can be hit with a golf club|z=10000;a1|r=2|rg=1|1=Can be hit with a golf club|z=10000;a1|r=2|rg=1|1=Can be hit with a golf club|z=10000;a1|r=2|rg=1|1=Can be hit with a golf club|z=10000;a1|r=2|rg=1|1=Can be hit with a golf club|z=10000;a1|r=2|rg=1|1=Can be hit with a golf club|z=10000;a1|r=2|rg=1|1=Can be hit with a golf club|z=10000;a1|r=2|rg=1|1=Can be hit with a golf club|z=10000;a1|r=2|rg=1|1=Can be hit with a golf club|z=10000;a1|r=2|rg=1|1=Can be hit with a golf club|z=10000;a1|r=2|rg=1|1=Can be hit with a golf club|z=10000;51|r=2|D=3|rg=1|1=Increases maximum mana by 60|2=Reduces mana usage by 13%|z=150000;1|t=20|k=7|rg=1|z=20000;d1|d=26|t=18|k=3|rg=1|z=27000;d1|r=4|d=48|t=16|k=3|rg=1|z=50000;w|s=9999|rg=400|z=800;t|s=9999|rg=5|1=Activates and breaks when a player steps on it|z=5000;1|t=90|rg=1|1=Summons rope snakes|z=50000;1|t=90|rg=1|1=If you listen closely, you can hear the ocean|z=50000;1|r=8|t=20|rg=1|1=Summons a rideable Golf Cart mount|z=500000;t|s=9999|rg=1|z=30000;t|s=9999|rg=1|z=500;t|s=9999|rg=1|z=500;t|s=9999|rg=1|z=500;s1|r=4|d=35|t=36|k=3|m=10|rg=1|1=Summons a sanguine bat to fight for you|z=250000;m1|r=4|d=34|t=33|k=1|m=20|rg=1|1=Summons blood thorns from the ground|z=200000;c|s=9999|r=2|t=45|rg=3|1=Summons the Blood Moon|2=What a horrible night to have a curse.;d1|r=4|d=55|t=40|k=6.5|rg=1|z=200000;s1|r=3|d=11|t=36|k=5|m=10|rg=1|1=Summons a vampire frog to fight for you|z=50000;c|s=9999|r=3|t=15|rg=3|1=Not to be confused with the elusive Gold Gold Goldfish|z=500000;4vt|s=9999|r=3|rg=1|1=Is it a gold bowl? Or a gold fish?|z=500000;t|s=9999|rg=1|1=Increases defense by 5 when placed nearby|z=100000;t|s=9999|rg=100;t|s=9999|rg=100;w|s=9999|rg=400;w|s=9999|rg=400;s1|d=7|t=36|k=4|m=10|rg=1|1=Summons a baby finch to fight for you|z=50000;c|s=9999|t=17|rg=5|1=Minor improvements to all stats|2=Youll apricate this!|z=10000;c|s=9999|t=17|rg=5|1=Minor improvements to all stats|2=Good source of potassium!|z=10000;c|s=9999|t=17|rg=5|1=Minor improvements to all stats|z=10000;c|s=9999|t=17|rg=5|1=Minor improvements to all stats|2=A vegan option for vampires|z=10000;c|s=9999|t=17|rg=5|1=Minor improvements to all stats|z=10000;c|s=9999|t=17|rg=5|1=Minor improvements to all stats|2=Are you suggesting that coconuts can migrate?|z=10000;c|s=9999|r=2|t=17|rg=5|1=Medium improvements to all stats|z=10000;c|s=9999|t=17|rg=5|1=Minor improvements to all stats|2=Smells like your father|z=10000;c|s=9999|t=17|rg=5|1=Minor improvements to all stats|z=10000;c|s=9999|t=17|rg=5|1=Minor improvements to all stats|2=When life gives you lemons...|z=10000;c|s=9999|t=17|rg=5|1=Minor improvements to all stats|z=10000;c|s=9999|t=17|rg=5|1=Minor improvements to all stats|z=10000;c|s=9999|t=17|rg=5|1=Minor improvements to all stats|2=Goes great with pizza|z=10000;c|s=9999|t=17|rg=5|1=Minor improvements to all stats|z=10000;c|s=9999|t=17|rg=5|1=Minor improvements to all stats|z=10000;c|s=9999|r=2|t=17|rg=5|1=Medium improvements to all stats|z=10000;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=2000;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=1500;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=150;t|s=9999|rg=1|z=3000;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=200;t|s=9999|rg=1|z=500;t|s=9999|rg=1|z=150;t|s=9999|rg=1|z=300;t|s=9999|rg=200;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=150;t|s=9999|rg=1|z=150;d1|r=4|d=30|t=27|k=7|tx=30|th=80|rg=1|z=100000;avt|s=9999|r=9|rg=1|1=Harness a small amount of power from the Void|z=1250000;t|s=9999|rg=1|1=Right Click to change directions|z=2000;t|s=9999|rg=1|1=Right Click to change directions|z=2000;5v1|r=3|rg=1|1=I thought I told you to clean up your room!|z=50000;6v1|r=3|rg=1|1=I thought I told you to clean up your room!|z=50000;4v1|r=3|rg=1|z=500000;5v1|r=3|rg=1|z=500000;1|r=2|t=8|tf=25|rg=1|1=Increased chance to fish up enemies during a Blood Moon|z=100000;t|s=9999|rg=1|1=Right Click to place item on plate|z=150;t|s=9999|rg=1;t|s=9999|rg=1;t|s=9999|rg=1;t|s=9999|rg=1;t|s=9999|rg=1;t|s=9999|rg=1;t|s=9999|r=3|rg=1|z=500000;c|s=9999|t=15|rg=5|z=5000;c|s=9999|t=15|rg=5|z=5000;c|s=9999|t=15|rg=5|z=5000;c|s=9999|t=15|rg=5|z=5000;c|s=9999|t=15|rg=5|z=5000;c|s=9999|t=15|rg=5|z=5000;c|s=9999|r=3|t=15|rg=3|z=500000;a1|rg=1|1=Hold Up to reach higher|z=25000;t|s=9999|rg=1|z=300;rc|s=9999|d=4|t=17|k=2|rg=1|z=5000;rc|s=9999|d=4|t=17|k=2|rg=1|z=5000;|s=9999|rg=2|1=Right Click to open|z=2500;1|rg=1|1=Prevents item pickups while locked|2=Right Click to unlock|3=You are over-encumbered|z=50000;m1|r=2|d=42|t=36|k=6|m=16|rg=1|1=It might be broken|z=170000;m1|r=5|d=100|t=36|k=6|m=16|rg=1|1=It might be broken|z=500000;t|s=9999|rg=25;t|s=9999|rg=25;t|s=9999|rg=25;t|s=9999|rg=25;t|s=9999|rg=25;t|s=9999|rg=25|1=A sight to dwell upon and never forget;t|s=9999|rg=1|z=300;at1|r=4|rg=1|z=100000;at1|r=4|rg=1|z=100000;at1|r=4|rg=1|z=100000;c|s=9999|t=15|rg=5|z=3750;t|s=9999|rg=1|z=300;c|s=9999|t=15|rg=5|z=5000;c|s=9999|r=3|t=15|rg=3|z=500000;c|s=9999|t=15|rg=5|z=2500;t|s=9999|rg=1;1|r=5|t=20|rg=1|1=Summons Estee|z=1000000;1|r=3|t=20|rg=1|1=Summons a Pet Sugar Glider|z=100000;1|t=30|rg=1|1=Kites can be flown on windy days|2=Reel it in with Right Click|z=20000;1|t=30|rg=1|1=Kites can be flown on windy days|2=Reel it in with Right Click|z=20000;1|t=30|rg=1|1=Kites can be flown on windy days|2=Reel it in with Right Click|z=20000;1|t=30|rg=1|1=Kites can be flown on windy days|2=Reel it in with Right Click|z=20000;1|t=30|rg=1|1=Kites can be flown on windy days|2=Reel it in with Right Click|z=20000;1|r=3|t=12|rg=1|1=Playable Instrument|2=Property of Dead Mans Sweater|z=10000;c|s=9999|t=15|rg=5|z=3750;c|s=9999|t=15|rg=5|z=3750;c|s=9999|t=15|rg=5|z=5000;t|s=9999|rg=1;t|s=9999|rg=25|1=A sight to dwell upon and never forget;t|s=9999|rg=25|1=A sight to dwell upon and never forget;1|t=30|rg=1|1=Kites can be flown on windy days|2=Reel it in with Right Click|z=20000;t|s=9999|rg=1;r1|r=3|d=14|t=19|k=3|rg=1|1=Rains blood from the sky|2=Reign in Blood|z=50000;c|s=9999|r=2|t=45|rg=1|1=Increases the defense and strength of all villagers|2=Contains offensive and defensive fighting techniques;t|s=9999|rg=100|z=60;t|s=9999|rg=100|1=Can be placed in water|z=60;t|s=9999|rg=100|z=60;t|s=9999|rg=100|z=60;t|s=9999|rg=100|z=60;t|s=9999|rg=100|z=60;t|s=9999|rg=25|1=A sight to dwell upon and never forget;t|s=9999|rg=5|1=They hatin...;t|s=9999|rg=100|1=Breaks when fallen on|2=Watch your step;t|s=9999|rg=100|1=Only visible with Echo Sight|z=1000;1|rg=2|1=Caught in Desert;1|rg=2|1=Caught in Desert;c|s=9999|t=15|rg=5|z=5000;t|s=9999|rg=1;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=10000;t|s=9999|r=3|rg=1|z=500000;c|s=9999|r=2|t=15|rg=5|1=May drop valuable shinies when smashed!|z=2500;|s=9999|rg=3|z=750;|s=9999|rg=3|1=But it wasnt a rock!|z=5000;c|s=9999|r=2|t=17|rg=5|1=Medium improvements to all stats|2=Delicious with a bit of butter|z=10000;a1|rg=1|1=Grants the ability to float in water|z=10000;t|s=9999|r=2|rg=5|1=Right Click to open|z=50000;t|s=9999|r=2|rg=5|1=Right Click to open|z=50000;t|s=9999|r=2|rg=5|1=Right Click to open|z=50000;t|s=9999|r=2|rg=5|1=Right Click to open|z=50000;a1|r=5|rg=1|1=Enables Echo Sight, showing hidden blocks|z=100000;|s=9999|rg=5|1=Right Click to open|z=500;c|s=9999|t=17|rg=5|1=Minor improvements to all stats|2=Aw, shucks!|z=10000;|s=9999|rg=5|z=50000;|s=9999|rg=5|z=150000;|s=9999|rg=5|z=750000;t|s=9999|rg=1|z=200;t|s=9999|rg=200;t|s=9999|rg=1|z=40000;c|s=9999|t=15|rg=5|z=5000;c|s=9999|r=3|t=15|rg=3|z=500000;t|s=9999|rg=1|z=50000;at1|r=4|rg=1|z=100000;t|s=9999|rg=100|1=Allows only liquids through|2=Can be toggled open or closed|3=Theyrrrre great!;c|s=9999|t=25|rg=99|1=A narrow explosion that will destroy most tiles|2=Explosion aims away from your position|z=1500;w|s=9999|rg=400;1|r=5|t=20|rg=1|1=Summons a Shark Pup|2=Doo, doo, doo, doo, doo, doo|z=50000;1|rg=1|z=50000;1|rg=1|z=25000;1|rg=1|1=Powered by Bacon!|z=50000;1|rg=1|z=25000;t|s=9999|rg=1|z=30000;t|s=9999|rg=1|z=30000;t|s=9999|rg=1|z=30000;t|s=9999|rg=1|z=30000;t|s=9999|rg=1|z=30000;t|s=9999|rg=1|z=30000;t|s=9999|rg=1|z=30000;t|s=9999|rg=1|z=30000;t|s=9999|rg=1|z=30000;t|s=9999|rg=1|z=30000;t|s=9999|rg=1|z=30000;t|s=9999|rg=1|z=30000;1|t=8|tf=30|rg=1|z=100000;1|rg=1|1=Provides 7 seconds of immunity to lava|z=50000;1|r=8|t=20|rg=1|1=Grants a witching spark of inspiration!|z=250000;rb|s=9999|d=50|k=4|rg=99|1=Will not destroy tiles|z=750;rb|s=9999|d=50|k=4|rg=99|1=Will destroy tiles|z=1500;rb|s=9999|d=40|k=4|rg=99|1=Spreads water on impact|z=5000;rb|s=9999|d=40|k=4|rg=99|1=Spreads lava on impact|z=5000;rb|s=9999|d=40|k=4|rg=99|1=Spreads honey on impact|z=5000;1|rg=1|1=The shroom goes vroom|z=50000;1|rg=1|z=50000;1|rg=1|z=50000;1|rg=1|z=50000;1|rg=1|z=50000;1|rg=1|z=50000;1|rg=1|z=50000;rb|s=9999|d=75|k=4|rg=99|1=Huge blast radius. Will not destroy tiles|z=500;rb|s=9999|d=75|k=4|rg=99|1=Huge blast radius. Will destroy tiles|z=1000;rb|s=9999|d=40|k=4|rg=99|1=Absorbs liquid on impact|z=5000;t1|rg=1|1=Places sandcastles|z=50000;t|s=9999|rg=1;t|s=9999|rg=1;d1|d=15|t=21|k=3|rg=1|1=Are you not entertained?!|z=15000;c|s=9999|t=15|rg=5|z=5000;c|s=9999|t=15|rg=5|z=5000;t|s=9999|rg=1|z=300;1|rg=1|z=50000;1|rg=1|z=200000;1|r=10|rg=1|1=brrrrrow|z=500000;1|rg=1|1=All aboard the party wagon!|z=100000;1|rg=1|z=50000;1|rg=1|1=Steam powered!|z=100000;t|s=9999|rg=1;t|s=9999|rg=1;t|s=9999|rg=1;t|s=9999|r=3|rg=1|z=500000;c|s=9999|t=17|rg=20|1=Increases the Luck of the user|z=50000;c|s=9999|t=17|rg=20|1=Increases the Luck of the user|z=250000;c|s=9999|t=17|rg=20|1=Increases the Luck of the user|z=1250000;c|s=9999|t=15|rg=5|z=7500;t|s=9999|rg=1;c|s=9999|r=3|t=15|rg=3|z=500000;t|s=9999|r=3|rg=1|z=500000;t|s=9999|rg=1|1=Activates every half of a second|z=20000;t|s=9999|rg=1|1=Activates every fourth of a second|z=20000;w|s=9999|rg=400;w|s=9999|rg=400;w|s=9999|rg=400;w|s=9999|rg=400;w|s=9999|rg=400;w|s=9999|rg=400;w|s=9999|rg=400;w|s=9999|rg=400;w|s=9999|rg=400;w|s=9999|rg=400;w|s=9999|rg=400;w|s=9999|rg=400;w|s=9999|rg=400;w|s=9999|rg=400;w|s=9999|rg=400;w|s=9999|rg=400;w|s=9999|rg=400;w|s=9999|rg=400;w|s=9999|rg=400|z=250;w|s=9999|rg=400|z=250;w|s=9999|rg=400;w|s=9999|rg=400;w|s=9999|rg=400|z=250;w|s=9999|rg=400;w|s=9999|rg=400;w|s=9999|rg=400;w|s=9999|rg=400;w|s=9999|rg=400;w|s=9999|rg=400;w|s=9999|rg=400;w|s=9999|rg=400;w|s=9999|rg=400;w|s=9999|rg=400;w|s=9999|rg=400;w|s=9999|rg=400;w|s=9999|rg=400;w|s=9999|rg=400;w|s=9999|rg=400;w|s=9999|rg=400;w|s=9999|rg=400;w|s=9999|rg=400;w|s=9999|rg=400;w|s=9999|rg=400;w|s=9999|rg=400;w|s=9999|rg=400;w|s=9999|rg=400;w|s=9999|rg=400;w|s=9999|rg=400;w|s=9999|rg=400;w|s=9999|rg=400;w|s=9999|rg=400;w|s=9999|rg=400;w|s=9999|rg=400;w|s=9999|rg=400;w|s=9999|rg=400;t|s=9999|rg=1|1=Nearby players get a bonus against: The Bride|z=1000;t|s=9999|rg=1|1=Nearby players get a bonus against: Zombie Merman|z=1000;t|s=9999|rg=1|1=Nearby players get a bonus against: Wandering Eye Fish|z=1000;t|s=9999|rg=1|1=Nearby players get a bonus against: Blood Squid|z=1000;t|s=9999|rg=1|1=Nearby players get a bonus against: Blood Eel|z=1000;t|s=9999|rg=1|1=Nearby players get a bonus against: Hemogoblin Shark|z=1000;t|s=9999|rg=100|z=100;w|s=9999|rg=400;4v1|r=3|rg=1|z=25000;1|r=3|t=20|rg=1|1=Summons a baby red panda|z=1000000;1|r=3|t=20|rg=1|1=Summons a baby imp|2=He hasnt learned how to teleport yet!|z=100000;t|s=9999|rg=1|1=Billows out fog|z=40000;t|s=9999|rg=1|z=20000;t|s=9999|rg=50;4v1|rg=1|1=This chicken is raw!|z=25000;5v1|rg=1|z=25000;6v1|rg=1|z=25000;4v1|r=3|rg=1|z=20000;4v1|r=3|rg=1|z=20000;4v1|rg=1|z=30000;4v1|r=3|rg=1|z=25000;4v1|r=3|rg=1|1=*tips* Mlady|z=25000;av1|r=3|rg=1|1=Its a new day, yes it is!|z=25000;t|s=9999|rg=100|z=100;w|s=9999|rg=400;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=2000;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=1500;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=150;t|s=9999|rg=1|z=3000;t|s=9999|rg=1|z=500;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=200;t|s=9999|rg=1|z=500;t|s=9999|rg=1|z=150;t|s=9999|rg=1|z=300;t|s=9999|rg=200;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=150;t|s=9999|rg=1|z=500;t|s=9999|rg=1|z=150;1|t=12|rg=1|1=A well-rounded club best for mid-range distances|2=Golf balls will carry a good distance with decent vertical loft|z=1000;1|t=12|rg=1|1=A specialized club for finishing holes|2=Golf balls will stay close to the ground over short distances for precision shots|z=1000;1|t=12|rg=1|1=A specialized club for sand pits or tall obstacles|2=Golf balls will gain tons of vertical loft but will not carry very far|z=1000;1|t=12|rg=1|1=A powerful club for long distances|2=Golf balls will carry very far, with little vertical loft|z=1000;1|r=3|t=12|rg=1|1=A well-rounded club best for mid-range distances|2=Golf balls will carry a good distance with decent vertical loft|z=100000;1|r=3|t=12|rg=1|1=A specialized club for finishing holes|2=Golf balls will stay close to the ground over short distances for precision shots|z=100000;1|r=3|t=12|rg=1|1=A specialized club for sand pits or tall obstacles|2=Golf balls will gain tons of vertical loft but will not carry very far|z=100000;1|r=3|t=12|rg=1|1=A powerful club for long distances|2=Golf balls will carry very far, with little vertical loft|z=100000;1|r=4|t=12|rg=1|1=A well-rounded club best for mid-range distances|2=Golf balls will carry a good distance with decent vertical loft|z=250000;1|r=4|t=12|rg=1|1=A specialized club for finishing holes|2=Golf balls will stay close to the ground over short distances for precision shots|z=250000;1|r=4|t=12|rg=1|1=A specialized club for sand pits or tall obstacles|2=Golf balls will gain tons of vertical loft but will not carry very far|z=250000;1|r=4|t=12|rg=1|1=A powerful club for long distances|2=Golf balls will carry very far, with little vertical loft|z=250000;t|s=9999|r=3|rg=1|z=10000;t|s=9999|r=3|rg=1|z=10000;t|s=9999|r=3|rg=1|z=10000;t|s=9999|rg=1|1=Nearby players get a bonus against: Dreadnautilus|z=1000;1|r=3|t=20|rg=1|1=Summons a baby harpy|2=Not for your everyday cockatiel|z=1000000;1|r=3|t=20|rg=1|1=Summons a fennec fox|2=It squeaks at a glorious 96kHz!|z=1000000;1|r=3|t=20|rg=1|1=Summons a pet butterfly|2=Only the best, most exquisite flower excrement!|z=1000000;at1|r=4|rg=1|z=100000;s1|r=8|d=41|t=36|k=4|m=10|rg=1|1=Summons a white tiger to fight for you|z=1000000;c|s=9999|t=19|rg=25|1=Toss in water up to 3 times to increase fishing power|2=Plankton!|z=2500;t|s=9999|rg=1|1=Said to bring good fortune and keep evil spirits at bay|z=50000;1|t=30|rg=1|1=Kites can be flown on windy days|2=Reel it in with Right Click|z=20000;1|t=30|rg=1|1=Kites can be flown on windy days|2=Reel it in with Right Click|z=20000;1|t=30|rg=1|1=Kites can be flown on windy days|2=Reel it in with Right Click|z=20000;1|t=30|rg=1|1=Kites can be flown on windy days|2=Reel it in with Right Click|z=20000;c|s=9999|t=17|rg=5|1=Minor improvements to all stats|2=Hungry for Apples?|z=10000;c|s=9999|r=4|t=17|rg=5|1=Major improvements to all stats|2=Sugar. Water. Purple.|z=40000;c|s=9999|t=17|rg=5|1=Minor improvements to all stats|2=...make lemonade!|z=10000;c|s=9999|t=17|rg=5|1=Minor improvements to all stats|2=Yellow and mellow|z=10000;c|s=9999|t=17|rg=5|1=Minor improvements to all stats|2=Lifes a peach|z=10000;c|s=9999|r=2|t=17|rg=5|1=Minor improvements to all stats|2=If you like piña coladas and getting caught in the rain|z=20000;c|s=9999|r=2|t=17|rg=5|1=Minor improvements to all stats|2=Real smooth|z=20000;c|s=9999|r=2|t=17|rg=5|1=Minor improvements to all stats|2=Not really blood... or is it?|z=20000;c|s=9999|r=2|t=17|rg=5|1=Minor improvements to all stats|2=Come to the dark side, we have smoothies|z=20000;c|s=9999|r=3|t=17|rg=5|1=Medium improvements to all stats|2=Feel the rainbow, taste the crystal!|z=20000;c|s=9999|t=17|rg=5|1=Minor improvements to all stats|2=With 5% real fruit juice!|z=20000;c|s=9999|r=2|t=17|rg=5|1=Minor improvements to all stats|z=30000;t|s=9999|rg=1|1=U. One (Restored)|z=5000;t|s=9999|rg=1|1=J. Witzig (Restored)|z=5000;t|s=9999|rg=1|1=A. Dale|z=5000;t|s=9999|rg=1|1=C. Schneider|z=5000;t|s=9999|rg=1|1=C. Rohde|z=5000;t|s=9999|rg=1|1=X. Calder|z=5000;t|s=9999|rg=1|1=A. Dale|z=5000;t|s=9999|rg=1|1=J. Sterling|z=5000;t|s=9999|rg=1|1=Unearthed by C. Schneider|z=5000;t|s=9999|rg=1|1=Unearthed by C. Schneider|z=5000;t|s=9999|rg=1|1=S. Poirier|z=5000;t|s=9999|rg=1|1=J. Parker III|z=5000;t|s=9999|rg=1|1=C. Schneider|z=5000;t|s=9999|rg=1|1=C. Schneider|z=5000;t|s=9999|rg=100|z=500;t|s=9999|rg=100|z=500;t|s=9999|rg=100|z=500;t|s=9999|rg=100|z=500;t|s=9999|rg=100|z=500;t|s=9999|rg=100|z=500;t|s=9999|rg=100|z=500;w|s=9999|rg=400;1|t=30|rg=1|1=Kites can be flown on windy days|2=Reel it in with Right Click|z=20000;1|t=30|rg=1|1=Kites can be flown on windy days|2=Reel it in with Right Click|z=20000;1|t=30|rg=1|1=Kites can be flown on windy days|2=Reel it in with Right Click|z=20000;1|t=30|rg=1|1=Kites can be flown on windy days|2=Reel it in with Right Click|z=20000;4v1|r=3|rg=1|z=25000;5v1|r=3|rg=1|z=25000;6v1|r=3|rg=1|z=25000;t|s=9999|rg=1;t|s=9999|rg=1;t|s=9999|rg=1;t|s=9999|rg=1|1=V. Costa Moura|z=10000;t|s=9999|rg=1|1=V. Costa Moura|z=10000;t|s=9999|rg=1|1=V. Costa Moura|z=10000;t|s=9999|rg=1|1=Ceci nest pas un club de golf.|2=V. Costa Moura|z=10000;|s=9999|r=3|rg=3|z=75000;|s=9999|r=3|rg=3|z=75000;5v1|r=3|rg=1|z=200000;6v1|r=3|rg=1|z=200000;4v1|r=3|rg=1|z=150000;w|s=9999|rg=400;|s=9999|rg=100|1=Fully illuminates the coated object|2=Can be combined with any other paint or coating|3=What a bright idea!|z=200;1|t=30|rg=1|1=Kites can be flown on windy days|2=Reel it in with Right Click|z=20000;1|t=30|rg=1|1=Kites can be flown on windy days|2=Reel it in with Right Click|z=20000;1|t=30|rg=1|1=Kites can be flown on windy days|2=Reel it in with Right Click|z=20000;s1|d=14|t=30|k=1|rg=1|1=4 summon tag damage|2=Your summons will focus struck enemies|3=Die monster!|z=100000;1|t=12|rg=1|1=Playable next to Drum Set|2=The coffee is strong...and vulgar|z=5000;1|t=30|rg=1|1=Kites can be flown on windy days|2=Reel it in with Right Click|z=20000;1|t=30|rg=1|1=Kites can be flown on windy days|2=Reel it in with Right Click|z=20000;1|t=30|rg=1|1=Kites can be flown on windy days|2=Reel it in with Right Click|z=20000;1|t=30|rg=1|1=Kites can be flown on windy days|2=Reel it in with Right Click|z=20000;s1|r=5|d=55|t=28|k=2|rg=1|1=9 summon tag damage|2=Your summons will focus struck enemies|3=Strike enemies to gain whip attack speed|z=230000;s1|r=8|c=10|d=180|t=35|k=11|rg=1|1=8 summon tag damage|2=12% summon tag critical strike chance|3=Your summons will focus struck enemies|z=300000;s1|r=8|d=100|t=27|k=3|rg=1|1=Your summons will focus struck enemies|2=Strike enemies with dark energy to gain whip attack speed|3=Dark energy jumps from enemies hit by summons|z=500000;1|t=30|rg=1|1=Kites can be flown on windy days|2=Reel it in with Right Click|z=20000;c|s=9999|t=25|rg=5|1=Released during certain ceremonies|z=100;1|t=30|rg=1|1=Kites can be flown on windy days|2=Reel it in with Right Click|3=This one cant wander too far|z=20000;1|t=30|rg=1|1=Kites can be flown on windy days|2=Reel it in with Right Click|z=20000;4v1|rg=1|z=100000;5v1|rg=1|z=100000;t|s=9999|rg=1|1=Nearby players get a bonus against: Angry Dandelion|z=1000;t|s=9999|rg=1|1=Nearby players get a bonus against: Gnome|z=1000;t|s=9999|rg=1|1=Life regen is increased when near a campfire;t|s=9999|rg=1|1=Life regen is increased when near a campfire;t|s=9999|rg=1|1=Life regen is increased when near a campfire;t|s=9999|rg=1|1=Life regen is increased when near a campfire;t|s=9999|rg=1|1=Life regen is increased when near a campfire;t|s=9999|rg=1|1=Life regen is increased when near a campfire;t|s=9999|rg=1|z=1000;t|s=9999|rg=1|z=1000;t|s=9999|rg=1|z=1000;t|s=9999|rg=1|z=40000;t|s=9999|rg=1|z=40000;t|s=9999|rg=1|z=40000;1|r=3|t=20|rg=1|1=Summons little Plantero|z=500000;c|s=9999|t=25|rg=5|z=100;r1|r=3|d=14|t=55|k=6.5|rg=1|1=When 2 or 3 just doesnt cut it|z=350000;4v1|rg=1|z=100000;5v1|rg=1|z=100000;6v1|rg=1|z=100000;d1|r=2|d=15|t=22|k=5|rg=1|1=You will fall slower while holding this|z=100000;4v1|rg=1|z=100000;5v1|rg=1|z=100000;t|s=9999|rg=1;d1|d=12|t=22|k=3.5|rg=1|1=Digs in a bigger area than a pickaxe|2=Only digs up soft tiles|3=Can you dig it?|z=5000;t|s=9999|rg=1|z=2500;t|s=9999|rg=1|z=500;|s=9999|r=8|rg=1|1=Unlocks a Desert Chest in the dungeon;m1|r=5|c=20|d=85|t=12|k=1.5|m=12|rg=1|1=These chords are out of this world|z=500000;1|r=8|t=20|rg=1|1=Summons a rideable flamingo mount|z=200000;t|s=9999|rg=50;t|s=9999|rg=50;t|s=9999|rg=50;t|s=9999|rg=50;t|s=9999|rg=50;d1|r=10|c=10|d=190|t=35|k=6.5|z=1000000;t|s=9999|rg=1|1=V. Costa Moura|z=10000;t|s=9999|rg=1|1=V. Costa Moura|z=10000;t|s=9999|rg=1|1=V. Costa Moura|z=10000;t|s=9999|rg=1|1=V. Costa Moura|z=10000;t|s=9999|rg=1|1=V. Costa Moura|z=10000;t|s=9999|rg=1|1=V. Costa Moura|z=10000;t|s=9999|rg=1|1=V. Costa Moura|z=10000;a1|r=9|rg=1|1=Great for impersonating devs!|2=Allows flight and slow fall|3=I am right here|z=400000;t|s=9999|r=8|rg=1|1=Seriously? THIS is what you used the Broken Hero Sword for?|z=150;4v1|r=9|rg=1|1=Great for impersonating devs!|2=Could this be the real Ghostar?|z=250000;5v1|r=9|rg=1|1=Great for impersonating devs!|2=A fine dress handmade by a dragon|z=250000;6v1|r=9|rg=1|1=Great for impersonating devs!|2=The journey of a thousand miles begins with one step|z=250000;1|r=3|t=20|rg=1|1=Summons a dynamite kitten|2=Its like yarn, but more exciting!|z=500000;1|r=3|t=20|rg=1|1=Summons a baby werewolf|z=300000;1|r=3|t=20|rg=1|1=Summons a pet shadow mimic|z=100000;4v1|r=2|rg=1|z=25000;5v1|r=2|rg=1|z=25000;4v1|r=2|rg=1|z=25000;5v1|r=2|rg=1|z=25000;6v1|r=2|rg=1|z=25000;c1|t=15|rg=1|1=Try to catch it!|z=20;av1|r=5|rg=1|z=150000;1|rg=1|z=10000;a1|r=9|rg=1|1=Great for impersonating devs!|2=Allows flight and slow fall|3=Can you help me tie this on?|z=400000;4v1|r=9|rg=1|1=Great for impersonating devs!|2=Bright idea|z=250000;5v1|r=9|rg=1|1=Great for impersonating devs!|2=Fashionable and functional|z=250000;6v1|r=9|rg=1|1=Great for impersonating devs!|2=Almost like pants|z=250000;a1|r=9|rg=1|1=Great for impersonating devs!|2=Allows flight and slow fall|3=The holes cut down on weight.|z=400000;4v1|r=9|rg=1|1=Great for impersonating devs!|2=Safety First|z=250000;5v1|r=9|rg=1|1=Great for impersonating devs!|2=Max was a good boy.|z=250000;6v1|r=9|rg=1|1=Great for impersonating devs!|2=They dont let me wear a loincloth anymore.|z=250000;a1|r=9|rg=1|1=Great for impersonating devs!|2=Allows flight and slow fall|z=400000;4v1|r=9|rg=1|1=Great for impersonating devs!|z=250000;5v1|r=9|rg=1|1=Great for impersonating devs!|z=250000;6v1|r=9|rg=1|1=Great for impersonating devs!|z=250000;s1|r=5|d=6|t=36|m=10|rg=1|1=Summons an Enchanted Dagger to fight for you|2=Ignores a substantial amount of enemy defense|3=Hits quickly at the expense of 25% tag damage|4=Dont let their small size fool you|z=50000;1|t=20|k=7|rg=1|1=Grapple onto trees like a real squirrel!|2=In the tree, part of the tree|z=20000;d1|r=5|d=80|t=36|k=2|rg=1|1=I can do this all day|z=350000;4vt|s=9999|r=3|rg=1;av1|rg=1|1=Applies dye to minions|z=100000;1|rg=1|1=Will dig through blocks and lay new track if carrying minecart tracks|2=Only digs when underground|z=500000;d1|d=23|t=20|k=7|rg=1|z=30000;rc|s=9999|r=2|t=20|rg=1|1=Toss it to change how trees look!|2=Time for a change of scenery|z=30000;rc|s=9999|r=2|t=20|rg=1|1=Toss it to change how the world looks!|2=Time for a change of scenery|z=30000;1|rg=1|1=Prevents you from hurting critters while in the inventory|z=50000;4v1|rg=1|z=30000;av1|rg=1|z=30000;4v1|rg=1|z=30000;av1|rg=1|z=30000;4v1|rg=1|z=30000;av1|rg=1|z=30000;4v1|rg=1|z=25000;av1|rg=1|1=Thats why they call me Thumper|z=30000;c|s=9999|t=15|rg=100|1=Hovers when thrown|2=Works when wet|z=75;1|r=3|t=20|rg=1|1=Summons a volt bunny|z=500000;|s=9999|r=3|rg=3|z=75000;4v1|rg=1;5v1|rg=1;6v1|rg=1;c|s=9999|r=6|rg=3|1=Right Click to open;t|s=9999|rg=1|z=50000;4v1|rg=1|z=37500;1|r=8|t=20|rg=1|1=Summons a rideable painted horse mount|z=250000;1|r=8|t=20|rg=1|1=Summons a rideable white horse mount|z=250000;1|r=8|t=20|rg=1|1=Summons a rideable dark horse mount|z=250000;d1|r=4|d=60|t=24|k=12|rg=1|1=Build momentum to increase attack power|2=Have at thee!|z=60000;d1|r=8|d=130|t=24|k=14|rg=1|1=Build momentum to increase attack power|z=500000;d1|r=5|d=90|t=24|k=13|rg=1|1=Build momentum to increase attack power|z=230000;1|r=8|t=20|rg=1|1=Summons a rideable pogo stick mount|2=Press Jump again in mid-air to do tricks!|z=250000;1|t=20|rg=1|1=Summons the Black Spot mount|2=Arrr! This be mutiny!|z=250000;1|t=20|rg=1|1=Summons a rideable tree mount|2=A wand crafted from the branch of a cursed tree.|z=250000;1|t=20|rg=1|1=Summons a rideable Santank mount|2=For the REALLY naughty ones.|z=250000;1|t=20|rg=1|1=Summons a rideable death goat mount|2=Brutal!|z=250000;1|t=20|rg=1|1=Summons a magic tome mount|2=A book said to be at its holders behest.|z=250000;1|t=20|rg=1|1=Summons a Slime Prince|2=A dessert fit for a king!|z=250000;1|t=20|rg=1|1=Summons a suspicious eye|2=Seems to have lost its look.|z=250000;1|t=20|rg=1|1=Summons the Eater of Worms|2=Itll give you worms!|z=250000;1|t=20|rg=1|1=Summons a spider brain|2=Pickled and shrunken, this brain can no longer hurt you.|z=250000;1|t=20|rg=1|1=Summons a small Skeletron|2=A skull with unimaginable power dulled.|z=250000;1|t=20|rg=1|1=Summons a honey bee|2=The secret ingredient for royal bees.|z=250000;1|t=20|rg=1|1=Summons a miniature tool of destruction|2=Its safe to operate this, right?|z=250000;1|t=20|rg=1|1=Summons miniature mechanical eyes|2=Two are better than one.|z=250000;1|t=20|rg=1|1=Summons a miniature Skeletron Prime|2=We can rebuild it.|z=250000;1|t=20|rg=1|1=Summons a newly sprouted Plantera|2=Get to the root of the problem.|z=250000;1|t=20|rg=1|1=Summons a toy golem to light your way|2=Power cells not included.|z=250000;1|t=20|rg=1|1=Summons a tiny Fishron|2=Brined to perfection.|z=250000;1|t=20|rg=1|1=Summons a baby phantasmal dragon|2=Contains a fragment of Phantasm energy.|z=250000;1|t=20|rg=1|1=Summons a Moonling|2=The forbidden calamari.|z=250000;1|t=20|rg=1|1=Summons a fairy princess to provide light|2=A glowing gemstone that houses a powerful fairy.|z=250000;1|t=20|rg=1|1=Summons a possessed Jack O Lantern|2=The flame cannot be put out!|z=250000;1|t=20|rg=1|1=Summons an Everscream sapling|2=Twinkle, Twinkle!|z=250000;1|t=20|rg=1|1=Summons a tiny Ice Queen|2=Fit for a queen!|z=250000;1|t=20|rg=1|1=Summons an alien skater|2=Kickflips are a lot easier in Zero-G!|z=250000;1|t=20|rg=1|1=Summons a baby ogre|2=No other uses besides smashing.|z=250000;1|t=20|rg=1|1=Summons Itsy Betsy|2=No fire sacrifices required!|z=250000;d1|r=2|d=25|t=15|k=3.5|rg=1|1=For fixing things, and breaking them|z=25000;1|r=4|t=90|rg=1|1=If you listen closely, you can hear screams|2=Watch your toes|z=50000;1|r=7|t=12|tr=2|rg=1|1=Contains an endless amount of lava|2=Can be poured out|z=500000;1|r=3|t=21|rg=1|1=For when things get too hot to handle|z=250000;av1|r=3|rg=1|1=Never get cold feet again|z=100000;a1|r=9|rg=1|1=Allows flight and slow fall|2=Hold Up to boost faster!|z=400000;c|s=9999|t=25|rg=99|1=A small explosion that will spread water|z=2500;c|s=9999|t=25|rg=99|1=A small explosion that will spread lava|z=2500;c|s=9999|t=25|rg=99|1=A small explosion that will spread honey|z=2500;c|s=9999|t=25|rg=99|1=A small explosion that will absorb liquid|z=2500;1|r=8|t=20|rg=1|1=Summons a rideable lava shark mount|2=Bloody hell!|z=250000;c|s=9999|r=2|t=45|rg=5|1=Use to adopt a cat for your town|2=Already have a cat?|3=Use additional licenses to activate the Pet Exchange Program!|4=Find the perfect fit for you and your cat!|z=50000;c|s=9999|r=2|t=45|rg=5|1=Use to adopt a dog for your town|2=Already have a dog?|3=Use additional licenses to activate the Pet Exchange Program!|4=Find the perfect fit for you and your dog!|z=50000;c|s=9999|t=15|rg=5|z=5000;c|s=9999|t=15|rg=5|z=5000;c|s=9999|t=15|rg=5|z=5000;c|s=9999|t=15|rg=5|z=5000;c|s=9999|t=15|rg=5|z=5000;c|s=9999|t=15|rg=5|z=5000;c|s=9999|t=15|rg=5|z=5000;c|s=9999|t=15|rg=5|z=5000;c|s=9999|t=15|rg=5|z=5000;c|s=9999|t=15|rg=5|z=5000;c|s=9999|t=15|rg=5|z=5000;c|s=9999|t=15|rg=5|z=5000;c|s=9999|t=15|rg=5|z=5000;c|s=9999|t=15|rg=5|z=5000;c|s=9999|t=15|rg=5|z=10000;t|s=9999|rg=1;c|s=9999|t=15|rg=5|z=10000;t|s=9999|rg=1;c|s=9999|r=2|t=15|rg=5|z=25000;t|s=9999|rg=1;t|s=9999|rg=5|z=3750;t|s=9999|rg=5|z=1875;t|s=9999|rg=5|z=5625;t|s=9999|rg=5|z=7500;t|s=9999|rg=5|z=11250;t|s=9999|rg=5|z=15000;t|s=9999|rg=5|z=15000;t|s=9999|rg=1|z=12500;t|s=9999|rg=1|z=12500;t|s=9999|rg=1|z=12500;t|s=9999|rg=1|z=12500;t|s=9999|rg=1|z=12500;t|s=9999|rg=1|z=12500;t|s=9999|rg=1|z=12500;t|s=9999|rg=1|z=12500;t|s=9999|rg=1|z=12500;t|s=9999|rg=1|z=12500;t|s=9999|rg=1|z=20000;t|s=9999|rg=1|z=20000;c|s=9999|t=30|rg=20|1=Teleports you home and creates a portal|2=Use portal to return when you are done|3=Good for one round trip!|z=1000;t|s=9999|rg=25|z=10000;1|r=7|t=12|tr=2|rg=1|1=Capable of soaking up an endless amount of lava|z=500000;41|r=5|D=1|rg=1|1=Increases your max number of minions by 1|2=Increases summon damage by 10%|z=250000;a1|r=7|rg=1|1=Allows flight|2=The wearer can run super fast|3=Leaves a trail of flames in your wake|z=200000;t|s=9999|rg=1|1=Teleport to another pylon when 2 villagers are nearby|2=You can only place one per type and in the matching biome|z=100000;t|s=9999|rg=1|1=Teleport to another pylon when 2 villagers are nearby|2=You can only place one per type and in the matching biome|z=100000;t|s=9999|r=2|rg=5|1=Right Click to open|z=50000;t|s=9999|r=2|rg=5|1=Right Click to open|z=50000;|s=9999|r=2|rg=5|1=Right Click to open|2=Requires a Shadow Key|z=20000;t|s=9999|rg=1|1=No, you cant wear it on your head|z=10000;a1|r=7|rg=1|1=Allows fishing in lava|z=100000;t|s=9999|rg=1;t|s=9999|rg=1;t|s=9999|rg=1;t|s=9999|rg=1;t|s=9999|rg=1;t|s=9999|rg=1;t|s=9999|rg=1;t|s=9999|rg=1;t|s=9999|rg=1;t|s=9999|rg=1;t|s=9999|rg=1;t|s=9999|rg=1;t|s=9999|rg=1;t|s=9999|rg=1;41|r=5|D=24|rg=1|1=10% increased melee damage and critical strike chance|2=10% increased melee speed|z=250000;41|r=5|D=9|rg=1|1=15% increased ranged damage|2=8% increased ranged critical strike chance|z=250000;41|r=5|D=5|rg=1|1=Increases maximum mana by 100|2=12% increased magic damage and critical strike chance|z=250000;41|r=5|D=1|rg=1|1=Increases your max number of minions by 1|2=Increases summon damage by 10%|z=250000;51|r=5|D=15|rg=1|1=7% increased critical strike chance|z=200000;61|r=5|D=11|rg=1|1=7% increased damage|2=8% increased movement speed|z=150000;t|s=9999|r=3|rg=1|z=30000;t|s=9999|r=3|rg=1|z=30000;t|s=9999|r=3|rg=1|z=30000;t|s=9999|r=3|rg=1|z=30000;t|s=9999|r=3|rg=1|z=30000;t|s=9999|rg=25|z=10000;c|s=9999|t=25|rg=99|1=A small explosion that will spread dirt|z=500;c|s=9999|t=25|rg=99|1=A small explosion that will spread dirt|z=500;c|s=9999|r=2|t=45|rg=5|1=Use to adopt a bunny for your town|2=Already have a bunny?|3=Use additional licenses to activate the Pet Exchange Program!|4=Find the perfect fit for you and your bunny!|z=50000;s1|r=4|d=45|t=30|k=1.5|rg=1|1=6 summon tag damage|2=Your summons will focus struck enemies|3=Strike enemies to summon a friendly snowflake|4=Let me have some of that cool whip|z=200000;s1|r=4|d=37|t=30|k=2|rg=1|1=Your summons will focus struck enemies|2=Strike enemies with blazing energy|3=Blazing energy explodes from enemies hit by summons|z=150000;s1|r=3|d=18|t=30|k=1.5|rg=1|1=6 summon tag damage|2=Your summons will focus struck enemies|3=Strike enemies to gain whip attack speed|z=50000;s1|r=8|d=180|t=30|k=4|rg=1|1=20 summon tag damage|2=10% summon tag critical strike chance|3=Your summons will focus struck enemies|z=250000;rb|s=9999|d=9|k=4|rg=99|z=18;t|s=9999|rg=1|1=Teleport to another pylon when 2 villagers are nearby|2=You can only place one per type and in the matching biome|z=100000;t|s=9999|rg=1|1=Teleport to another pylon when 2 villagers are nearby|2=You can only place one per type and in the matching biome|z=100000;t|s=9999|rg=1|1=Teleport to another pylon when 2 villagers are nearby|2=You can only place one per type and in the matching biome|z=100000;t|s=9999|rg=1|1=Teleport to another pylon when 2 villagers are nearby|2=You can only place one per type and in the matching biome|z=100000;t|s=9999|rg=1|1=Teleport to another pylon when 2 villagers are nearby|2=You can only place one per type and in the matching biome|z=100000;t|s=9999|rg=1|1=Teleport to another pylon when 2 villagers are nearby|2=You can only place one per type and in the matching biome|z=100000;t|s=9999|rg=1|z=40000;d1|r=8|c=10|d=80|t=18|k=4|rg=1|z=250000;t|s=9999|rg=1|z=50000;t|s=9999|rg=1|z=50000;t|s=9999|rg=1|z=50000;t|s=9999|rg=1|z=50000;t|s=9999|rg=1|z=50000;t|s=9999|rg=1|z=50000;t|s=9999|rg=1|z=50000;t|s=9999|rg=1|z=50000;t|s=9999|rg=1|z=50000;t|s=9999|rg=1|z=50000;t|s=9999|rg=1|z=50000;t|s=9999|rg=1|z=50000;t|s=9999|rg=1|z=50000;t|s=9999|rg=1|z=50000;t|s=9999|rg=1|z=50000;t|s=9999|rg=1|z=50000;t|s=9999|rg=1|z=50000;t|s=9999|rg=1|z=50000;t|s=9999|rg=1|z=50000;t|s=9999|rg=1|z=50000;t|s=9999|rg=1|z=50000;t|s=9999|rg=1|z=50000;t|s=9999|rg=1|z=50000;t|s=9999|rg=1|z=50000;t|s=9999|rg=1|z=50000;t|s=9999|rg=1|z=50000;t|s=9999|rg=1|z=50000;t|s=9999|r=9|rg=1|1=Teleport to another pylon|2=Can function anywhere|3=You must construct additional pylons|z=1000000;m1|r=8|d=50|t=36|k=2.5|m=23|rg=1|z=250000;r1|r=8|d=50|t=30|k=2|rg=1|z=250000;a1|r=9|rg=1|1=Allows flight and slow fall|2=Press Down to toggle hover|3=Press Up to deactivate hover|4=Hold Up to boost faster!|5=The more you know|z=500000;4v1|r=5|rg=1|1=It looks like a bunny, but its actually a bunny|z=150000;d1|r=10|c=10|d=190|t=30|k=6.5|rg=1|z=1000000;c|s=9999|r=6|rg=3|1=Right Click to open;t|s=9999|rg=1|z=50000;4v1|rg=1|z=37500;1|t=20|rg=1|1=Summons a Slime Princess|2=A dessert fit for a queen!|z=250000;c|s=9999|r=3|t=15|rg=3|1=Its wings are so delicate, you must be careful not to damage it...|z=250000;t|s=9999|rg=100|1=A Stone Slab variant that merges differently with nearby blocks|2=Favored by advanced builders;t|s=9999|rg=1|1=Wont be running away now...;t|s=9999|rg=1;t|s=9999|rg=1|1=Nearby players get a bonus against: Rock Golem|z=1000;t|s=9999|rg=1|1=Nearby players get a bonus against: Blood Mummy|z=1000;t|s=9999|rg=1|1=Nearby players get a bonus against: Spore Skeleton|z=1000;t|s=9999|rg=1|1=Nearby players get a bonus against: Spore Bat|z=1000;t|s=9999|rg=1|1=Nearby players get a bonus against: Antlion Larva|z=1000;t|s=9999|rg=1|1=Nearby players get a bonus against: Vicious Bunny|z=1000;t|s=9999|rg=1|1=Nearby players get a bonus against: Vicious Goldfish|z=1000;t|s=9999|rg=1|1=Nearby players get a bonus against: Vicious Penguin|z=1000;t|s=9999|rg=1|1=Nearby players get a bonus against: Corrupt Mimic|z=1000;t|s=9999|rg=1|1=Nearby players get a bonus against: Crimson Mimic|z=1000;t|s=9999|rg=1|1=Nearby players get a bonus against: Hallowed Mimic|z=1000;t|s=9999|rg=1|1=Nearby players get a bonus against: Moss Hornet|z=1000;t|s=9999|rg=1|1=Nearby players get a bonus against: Wandering Eye|z=1000;a1|rg=1|1=Allows flight and slow fall|z=2000;at1|r=4|rg=1|z=100000;1|r=5|t=20|k=7|rg=1|1=Teleports you to the location of the hook|z=250000;1|r=8|t=20|rg=1|1=Summons a rideable Winged Slime mount|z=250000;41|r=5|D=12|rg=1|1=5% increased critical strike chance|2=Reduces mana usage by 10%|z=100000;51|r=5|D=14|rg=1|1=5% increased damage|2=Reduces ammo usage by 10%|z=100000;61|r=5|D=10|rg=1|1=20% increased movement speed|2=10% increased melee speed|z=100000;at1|r=4|rg=1|z=100000;c|s=9999|t=15|rg=50|1=Filled with Party Girl bathwater|z=200;a1|r=6|rg=1|1=Releases volatile gelatin periodically that damages enemies|z=250000;c|s=9999|r=6|t=45|rg=3|1=Summons Queen Slime|z=50000;a1|rg=1|1=Grants infinite wing and rocket boot flight|2=Increases flight and jump mobility|z=500000;at1|r=4|rg=1|z=100000;at1|r=4|rg=1|z=100000;at1|r=4|rg=1|z=100000;t|s=9999|r=9|rg=1|1=Heeellllllo Terraria enthusiasts!|2=Great for chilling like a streamer!|z=25000;4v1|r=2|rg=1|z=100000;4v1|r=2|rg=1|z=100000;4v1|r=2|rg=1|z=100000;5v1|r=2|rg=1|z=100000;5v1|r=2|rg=1|z=100000;5v1|r=2|rg=1|z=100000;a1|r=7|rg=1|1=Allows flight, super fast running, and extra mobility on ice|2=8% increased movement speed|3=Provides the ability to walk on water, honey & lava|4=Grants immunity to fire blocks and 7 seconds of immunity to lava|5=Reduces damage from touching lava|z=750000;61|r=2|D=3|rg=1|1=Slightly increases mobility|2=These might be Steves|z=100000;t|s=9999|r=2|rg=5|1=Right Click to open|z=50000;t|s=9999|r=2|rg=5|1=Right Click to open|z=50000;4v1|r=9|rg=1|1=You seem to have a problem with your green screen|2=Great for impersonating streamers!|z=15000;s1|r=5|d=90|t=36|k=4|m=10|rg=1|1=Summons an Enchanted Sword to fight for you|z=1000000;at1|r=4|rg=1|z=100000;5v1|r=2|rg=1|z=10000;t|s=9999|rg=1|z=1000;c|s=9999|t=17|rg=5|1=Minor improvements to all stats|2=A must-have for tea parties|z=20;a1|rg=1|1=Increases pickup range for items|z=150000;d1|d=9|t=45|k=4.6|rg=1|1=Can be upgraded with torches|z=100000;d1|d=9|t=45|k=4.6|rg=1|1=May the fire light your way|z=100000;1;at1|r=4|rg=1|z=100000;at1|r=4|rg=1|z=100000;at1|r=4|rg=1|z=100000;at1|r=4|rg=1|z=100000;at1|r=4|rg=1|z=100000;at1|r=4|rg=1|z=100000;at1|r=4|rg=1|z=100000;at1|r=4|rg=1|z=100000;at1|r=4|rg=1|z=100000;at1|r=4|rg=1|z=100000;at1|r=4|rg=1|z=100000;at1|r=4|rg=1|z=100000;at1|r=4|rg=1|z=100000;at1|r=4|rg=1|z=100000;at1|r=4|rg=1|z=100000;at1|r=4|rg=1|z=100000;at1|r=4|rg=1|z=100000;at1|r=4|rg=1|z=100000;at1|r=4|rg=1|z=100000;at1|r=4|rg=1|z=100000;at1|r=4|rg=1|z=100000;at1|r=4|rg=1|z=100000;at1|r=4|rg=1|z=100000;at1|r=4|rg=1|z=100000;at1|r=4|rg=1|z=100000;at1|r=4|rg=1|z=100000;at1|r=4|rg=1|z=100000;c|s=9999|r=2|t=17|rg=5|1=Minor improvements to all stats|2=For strong, healthy bones|z=10000;c|s=9999|r=2|t=17|rg=5|1=Medium improvements to all stats|2=Hello darkness my old friend|z=10000;c|s=9999|r=4|t=30|rg=1|1=Unlocks an ability toggle to the left of the inventory|2=When enabled normal torches change according to your biome|z=100000;at1|r=4|rg=1|z=100000;4v1|r=2|rg=1|1=That right there is 100% genuine Ahamkara, trust!|2=Concept by SodaHunter|z=500;5v1|r=2|rg=1|1=Who knew a blight-weaving world-ender would have such good taste in fashion?|2=Concept by SodaHunter|z=500;6v1|r=2|rg=1|1=The horrors these boots have seen, or should I say, stepped on.|2=Concept by SodaHunter|z=500;4v1|r=2|rg=1|1=Your most loyal travel companion. The glowing orb is soft and welcoming.|2=Concept by crowflux|z=500;5v1|r=2|rg=1|1=Incredibly old, yet unnaturally durable. Who knows how long it traveled just to find you.|2=Concept by crowflux|z=500;6v1|r=2|rg=1|1=It constantly reminds you that there is more than one path to the top of the mountain.|2=Concept by crowflux|z=500;4v1|r=2|rg=1|1=May time itself with gentle hands|2=Guide you, who travel on...|3=Concept by DisRicardo|z=500;5v1|r=2|rg=1|1=...Despite the journeys bygone end...|2=Concept by DisRicardo|z=500;6v1|r=2|rg=1|1=...And passing of aeons!|2=Concept by DisRicardo|z=500;4v1|r=2|rg=1|1=When a cosmic ray penetrates a star cloud, that fantastic light...|2=Concept by yikescloud|z=500;5v1|r=2|rg=1|1=ID.170122 - RSS ZEPHYRUS III|2=Concept by yikescloud|z=500;6v1|r=2|rg=1|1=I am a duck QUACK-QUACK-QUACK|2=Concept by yikescloud|z=500;4v1|r=2|rg=1|1=Embodiment of the stars majesty, shiny!|2=Concept by R-MK|z=500;5v1|r=2|rg=1|1=As protective as glass!|2=Concept by R-MK|z=500;6v1|r=2|rg=1|1=Now you can wear shoes! Maybe!|2=Right Click to transform|3=Concept by R-MK|z=500;6v1|r=2|rg=1|1=Sadly, does not provide the ability to swim.|2=Right Click to transform|3=Concept by R-MK|z=500;4v1|r=2|rg=1|1=You cant see me behind the screen, Im half human and half machine...|2=Concept by Dr.Zootsuit|z=500;5v1|r=2|rg=1|1=How bad could business possibly be?|2=Concept by Dr.Zootsuit|z=500;6v1|r=2|rg=1|1=I cant decide... leather or suede?|2=Concept by Dr.Zootsuit|z=500;a1|r=8|rg=1|1=Fishing line will never break, decreases chance of bait consumption, increases fishing power by 10|2=Allows fishing in lava|z=200000;m1|r=5|d=70|t=25|k=5|m=18|rg=1|z=500000;t|s=9999|rg=5|z=250;t|s=9999|rg=5|z=250;51|r=2|D=1|rg=1|1=Increases summon damage by 5%|2=Increases your max number of minions by 1|z=125000;s1|r=3|d=8|t=36|k=2|m=5|rg=1|1=Summons a snow flinx to fight for you|z=25000;|s=9999|rg=15|1=Its so FLUFFY!|z=500;4v1|r=5|rg=1|z=500000;5v1|r=5|rg=1|z=500000;6v1|r=5|rg=1|z=500000;s1|r=2|d=27|t=30|k=2|rg=1|1=7 summon tag damage|2=Your summons will focus struck enemies|3=Performs better against multiple targets than most whips|4=This goes to eleven|z=75000;av1|r=5|rg=1|1=Causes your mouse cursor to have shifting rainbow colors|z=50000;av1|r=5|rg=1|z=1000000;av1|r=5|rg=1|z=1000000;5v1|r=5|rg=1|z=500000;6v1|r=5|rg=1|z=500000;av1|r=5|rg=1|z=500000;t|s=9999|r=5|rg=1|z=100000;t|s=9999|r=5|rg=1|z=100000;t|s=9999|r=5|rg=1|z=100000;t|s=9999|r=5|rg=1|z=100000;t|s=9999|rg=1|1=J. Hayes|z=100000;t|s=9999|rg=1|1=J. Hayes|z=100000;t|s=9999|rg=1|1=J. Hayes|z=100000;1|r=3|t=20|rg=1|1=Summons a cherished teddy bear|2=My childhood buddy - Bernie!|z=250000;1|r=3|t=20|rg=1|1=Summons a Glommer|2=The petals shimmer in the light|z=250000;1|t=20|rg=1|1=Summons a tiny Deerclops|2=You lookin at me? Are YOU lookin at ME?|z=250000;1|r=3|t=20|rg=1|1=Summons a small Pig Man|2=Gross. Its full of hairs.|z=50000;c|s=9999|r=2|t=17|rg=5|1=Medium improvements to all stats|2=Tastes like hairs and meats with noodle.|z=5000;c|s=9999|r=2|t=17|rg=5|1=Medium improvements to all stats|2=Has a bit of a kick to it.|z=10000;d1|r=2|d=20|t=21|k=5.5|rg=1|1=Embeds damaging spikes in enemies|2=Never grab the pointy end.|z=25000;d1|r=2|c=10|d=27|t=15|k=5|tx=30|rg=1|1=I love Lucy!|z=75000;d1|r=4|d=57|t=20|k=6.5|rg=1|1=Grows more powerful the better fed you are|2=Defeating enemies temporarily improves healing|3=TIS A WEAPON O PIG BUTT!|z=50000;d1|r=2|d=36|t=45|k=5.5|rg=1|1=May heal user on hit|2=Maybe I could bat some bats with this.|z=12500;1|r=3|t=20|rg=1|1=Summons a living chest to store your items|2=Its looking into my soul.|z=100000;4v1|rg=1|1=It smells like prettiness.|z=500;a1|rg=1|1=Summons shadow hands to attack your foes|2=Ive got a headache just looking at it.|z=100000;4v1|rg=1|1=Dont get rain in your eye!|z=25000;5v1|rg=1|z=20000;6v1|rg=1|z=20000;av1|rg=1|1=This is human facial hair.|z=50000;av1|rg=1|1=This is human facial hair.|z=50000;av1|rg=1|1=This is human facial hair.|z=50000;a1|rg=1|1=Increases movement speed and acceleration|2=Provides light when worn|3=A brief light in my dark life.|z=50000;t|s=9999|rg=1|z=50000;4v1|rg=1|z=37500;t|s=9999|rg=1|z=50000;c|s=9999|r=3|rg=3|1=Right Click to open;at1|r=4|rg=1|z=100000;av1|rg=1|1=Allows the user to see the world differently|2=Forbidden Knowledge echoes from the radio...|z=50000;s1|r=3|d=6|t=36|k=2|m=10|rg=1|1=Summons a friendly ghost to fight for you|2=Its hauntingly beautiful.|z=25000;5v1|rg=1|z=20000;6v1|rg=1|z=20000;r1|r=2|d=20|t=15|k=1|rg=1|1=Converts bullets into random stuff|2=ALLOWS WIRELESS TRANSFER OF INJURY!|z=75000;m1|r=2|d=13|t=45|k=1|m=30|rg=1|1=Ignores 10 points of enemy Defense|2=What a pane... heh|z=75000;sS1|r=2|d=24|t=30|k=7.5|m=20|rg=1|1=Summons a sentry|2=Summons an arcane construct to shoot optic blasts at your enemies|3=Oh me oh my, look at that eye!|z=75000;c|s=9999|t=45|rg=3|1=Summons Deerclops;t|s=9999|rg=1|1=C.J. Lee|2=Adapted by J. T. Kjexrud|z=10000;t|s=9999|rg=1|1=C.J. Lee|2=Adapted by J. T. Kjexrud|z=10000;t|s=9999|rg=1|1=C.J. Lee|2=Adapted by J. T. Kjexrud|z=10000;t|s=9999|rg=1|1=C.J. Lee|2=Adapted by J. T. Kjexrud|z=10000;1|r=2|rg=1|z=25000;a1|rg=1|1=Increases mining speed by 25%|2=Increases block & wall placement speed|3=Increases block placement & tool range by 3|4=Increases pickup range for items|5=Automatically paints or coats placed objects|6=Hold Up to reach higher|z=400000;t|s=9999|rg=25|1=A sight to dwell upon and never forget;t|s=9999|rg=25|1=A sight to dwell upon and never forget;d1|r=2|d=15|t=17|k=5|rg=1|1=Best used for pranking townsfolk|2=Makes others smell like cilantro|z=17500;1|r=8|t=20|rg=1|1=Grants the wearer the power of the wolf|z=250000;1|t=20|rg=1|1=Summons both Slime Royals|2=A dessert to celebrate love|z=250000;c|s=9999|t=15|rg=5|z=5000;t|s=9999|rg=1;1|r=10|t=30|k=0.3|rg=1|1=Creates and destroys biomes when sprayed|2=Uses colored solution|3=33% chance to not consume ammo|z=2000000;t|s=9999|r=4|rg=5|z=30000;4v1|rg=1|z=25000;t|s=9999|r=2|rg=1|1=When placed in a home, prevents villagers from moving in|2=Smells like cilantro|z=5000;t|s=9999|r=2|rg=1|1=When placed in a home, prevents villagers from moving in|2=Only visible with Echo Sight|3=Smells like expired cilantro|z=5000;a1|rg=1|1=Increases fishing power by 10|z=25000;a1|rg=1|1=Increases fishing power by 10|2=Your bobber now glows|z=50000;a1|rg=1|1=Increases fishing power by 10|2=Your bobber now glows|z=50000;a1|rg=1|1=Increases fishing power by 10|2=Your bobber now glows|z=50000;a1|rg=1|1=Increases fishing power by 10|2=Your bobber now glows|z=50000;a1|rg=1|1=Increases fishing power by 10|2=Your bobber now glows|z=50000;a1|rg=1|1=Increases fishing power by 10|2=Your bobber now glows|z=50000;a1|rg=1|1=Increases fishing power by 10|2=Your bobber now glows|z=50000;m1|c=10|d=15|t=26|m=2|rg=1|1=Shoots a little frost|z=7500;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=2000;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=1500;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=150;t|s=9999|rg=1|z=3000;t|s=9999|rg=1|z=500;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=200;t|s=9999|rg=1|z=500;t|s=9999|rg=1|z=150;t|s=9999|rg=1|z=300;t|s=9999|rg=200;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=150;t|s=9999|rg=1|z=500;t|s=9999|rg=1|z=150;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=2000;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=1500;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=150;t|s=9999|rg=1|z=3000;t|s=9999|rg=1|z=500;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=200;t|s=9999|rg=1|z=500;t|s=9999|rg=1|z=150;t|s=9999|rg=1|z=300;t|s=9999|rg=200;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=150;t|s=9999|rg=1|z=500;t|s=9999|rg=1|z=150;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=2000;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=1500;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=150;t|s=9999|rg=1|z=3000;t|s=9999|rg=1|z=500;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=200;t|s=9999|rg=1|z=500;t|s=9999|rg=1|z=150;t|s=9999|rg=1|z=300;t|s=9999|rg=200;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=150;t|s=9999|rg=1|z=500;t|s=9999|rg=1|z=150;c|s=9999|r=5|t=17|rg=20|1=Shows the location of infected blocks|z=1000;c|s=9999|t=15|rg=5|z=3750;t|s=9999|rg=1;t|s=9999|rg=25|z=150;t|s=9999|rg=100;w|s=9999|rg=400;w|s=9999|rg=400;t|s=9999|rg=1|1=S. Poirier|z=5000;t|s=9999|rg=1|1=C. Germaine|z=5000;t|s=9999|rg=1|1=W. Black|z=5000;t|s=9999|rg=1|1=J. T. Kjexrud|z=5000;t|s=9999|rg=1|1=B. Hook|z=100000;t|s=9999|rg=1|1=C. Rohde|z=5000;t|s=9999|rg=1|1=A. Spinks|z=5000;t|s=9999|rg=1|1=J. Doppler|z=5000;t|s=9999|rg=1|1=T.T. Shabbick|z=5000;t|s=9999|rg=1|1=J. Witzig|z=5000;t|s=9999|rg=1|1=C. Germaine|z=100000;t|s=9999|rg=1|1=U. One|z=5000;t|s=9999|rg=1|1=T. Murphy|2=Im such a lizard, you dont even know my real name...|z=5000;t|s=9999|rg=1|1=J. Parker III|z=10000;t|s=9999|rg=1|1=T.T. Shabbick|z=5000;t|s=9999|rg=1|1=B. Witch|z=5000;t|s=9999|rg=1|1=C. Rohde|z=5000;t|s=9999|rg=1|1=B. Hook|z=25000;t|s=9999|rg=1|1=C. Rohde|z=5000;t|s=9999|rg=1|1=G. Groviar|z=5000;t|s=9999|rg=1|1=S. Grimson-Smith|z=5000;t|s=9999|rg=1|1=J. Parker III|z=5000;t|s=9999|rg=1|1=J. Witzig|z=5000;t|s=9999|rg=1|1=S. Gutierrez|z=5000;t|s=9999|rg=1|1=M. Koller|z=5000;t|s=9999|rg=1|1=A. Dale|z=30000;t|s=9999|rg=1|1=B. Witch|z=5000;t|s=9999|rg=1|1=J. T. Kjexrud|z=10000;t|s=9999|rg=1|1=M. User|z=5000;t|s=9999|rg=1|1=S. Grimson-Smith|z=5000;t|s=9999|rg=1|1=J. Parker III|2=In memory of R. N. Ross|z=5000;t|s=9999|rg=1|1=J. Parker III|z=5000;t|s=9999|rg=1|1=J. T. Kjexrud|z=5000;t|s=9999|rg=1|1=C. Germaine|z=10000;t|s=9999|rg=1|1=C. Rohde|z=25000;t|s=9999|rg=1|1=B. Hook|z=10000;t|s=9999|rg=1|1=S. Grimson-Smith|z=5000;t|s=9999|rg=1|1=K. Tollenaar|z=5000;t|s=9999|rg=1|1=K. Tollenaar|z=25000;t|s=9999|rg=1|1=V. Costa Moura|z=10000;t|s=9999|rg=1|1=C. Rohde|z=5000;t|s=9999|rg=1|1=C. Rohde|z=25000;t|s=9999|rg=1|1=C. Rohde|z=5000;t|s=9999|rg=1|1=T.T. Shabbick|z=5000;t|s=9999|rg=1|1=X. Calder|z=5000;t|s=9999|rg=1|1=W. Spinks|z=25000;t|s=9999|rg=1|1=J. Parker III|2=Legends say the batteries died ages ago.|z=25000;t|s=9999|rg=1|1=J. T. Kjexrud|z=25000;t|s=9999|rg=1|1=V. Costa Moura|z=100000;t|s=9999|rg=1|1=J. Witzig|z=5000;t|s=9999|rg=1|1=C. Germaine|z=5000;t|s=9999|rg=1|1=J. T. Kjexrud|z=5000;t|s=9999|rg=1|1=J. T. Kjexrud|z=5000;t|s=9999|rg=1|1=J. T. Kjexrud|z=5000;t|s=9999|rg=1|1=J. T. Kjexrud|z=5000;t|s=9999|rg=1|1=J. T. Kjexrud|z=5000;t|s=9999|rg=1|1=J. T. Kjexrud|z=5000;c|s=9999|t=17|rg=5|1=Minor improvements to all stats|2=Please Recycle|z=125;1|r=3|t=20|rg=1|1=Summons a Junimo|2=A mysterious fruit from another world. The flavor is like a dream...|z=10000;c|s=9999|t=17|rg=5|1=Minor improvements to all stats|z=10000;c|s=9999|t=17|rg=5|1=Minor improvements to all stats|z=10000;41|D=2|rg=1;51|D=3|rg=1;61|D=2|rg=1;r1|d=10|t=25|rg=1|z=100;d1|d=9|t=30|k=5.5|th=45|rg=1|z=50;d1|d=13|t=17|k=5|rg=1|z=100;rc|s=9999|r=2|t=20|rg=1|1=Toss it to change how the moon looks!|2=Time for a change of scenery|z=30000;t|s=9999|r=2|rg=10|z=75000;t|s=9999|r=2|rg=10|z=12500;1|r=8|rg=1|z=50000;c|s=9999|r=5|t=30|rg=1|1=Permanently grants boosted speed and a defensive probe for minecarts|2=Free Mechanical Cart included!|z=100000;4v1|rg=1|z=25000;w|s=9999|rg=400|1=Only visible with Echo Sight|z=250;t|s=9999|rg=200|1=Only visible with Echo Sight|z=500;t|s=9999|rg=100|z=60;d1|r=3|d=24|t=25|k=3.75|rg=1|1=Summons killer bees after striking your foe|z=90000;dt1|r=4|d=20|k=5|tx=30|rg=1|1=Creates grass on dirt|2=Increases alchemy plant collection when used to gather|3=Plants acorns when cutting down trees|z=75000;t|s=9999|r=7|rg=1|1=Placing silt/slush/fossil piles into the extractinator turns them into something more useful|2=Place contaminated blocks into the extractinator to purify them|3=Other items placed inside may have interesting effects|z=100000;1|r=3|t=20|rg=1|1=Summons a blue chicken|2=A regular blue chicken egg|z=250000;d1|r=3|d=21|t=22|k=3|rg=1|1=Three Boomerangs are better than one|z=100000;t|s=9999|rg=1|1=Life regen is increased when near a campfire;c|s=9999|t=15|rg=5|z=3750;t|s=9999|rg=1;1|r=7|t=12|tr=2|rg=1|1=Contains an endless amount of honey|2=Can be poured out|z=500000;1|r=7|t=12|tr=2|rg=1|1=Capable of soaking up an endless amount of honey|z=500000;1|r=8|t=8|tr=3|rg=1|1=Capable of soaking up an endless amount of liquid|z=1500000;4v1|rg=1|z=25000;t|s=9999|rg=100|z=100;w|s=9999|rg=400;t|s=9999|rg=1|1=The Terraria Community|z=10000;1|rg=1|1=Prevents you from accidentally destroying the environment while in the inventory|z=50000;t|s=9999|rg=1|1=Yorai Omer|z=100000;c|s=9999|t=15|rg=5|z=3750;c|s=9999|t=15|rg=5|z=3750;c|s=9999|t=15|rg=5|z=3750;t|s=9999|rg=1;t|s=9999|rg=1;t|s=9999|rg=1;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=1|z=300;t|s=9999|rg=30|z=300;t|s=9999|rg=30|z=100;t|s=9999|rg=1|1=Nullifies the peaceful benefits of towns|z=500;1|r=2|rg=1|1=Prevents you from hurting critters while in the inventory|2=Prevents you from accidentally destroying the environment while in the inventory|z=100000;t1|r=10|tr=3|rg=1|1=Used with materials to place matching rubble|2=Right Click to toggle placement size|3=Press Up/Down to cycle through styles|4=Not a piledriver nor a placeinator: Its a Rubblemaker|z=250000;1|r=3|t=28|rg=1|1=Summons the void vault|2=Functions as an extended inventory when open|3=May pick up overflowing items when open|4=Right Click to open|5=This pocket dimension is out of this world!|z=100000;c1|r=3|t=17|rg=1|1=Consume to permanently increase crafting station range|2=Legendary Bread that once reminded Teddy of home|z=100000;t|s=9999|rg=5|1=Highly volatile;c|s=9999|t=15|rg=5|1=Can be used to lock some chests;t1|r=10|tr=3|rg=1|1=Used with materials to place matching rubble|2=Right Click to toggle placement size|3=Press Up/Down to cycle through styles|4=Not a piledriver nor a placeinator: Its a Rubblemaker|z=250000;t1|r=10|tr=3|rg=1|1=Used with materials to place matching rubble|2=Right Click to toggle placement size|3=Press Up/Down to cycle through styles|4=Not a piledriver nor a placeinator: Its a Rubblemaker|z=250000;a1|r=8|rg=1|1=Allows the holder to quadruple jump|2=Increases jump height and negates fall damage|z=200000;1|r=3|t=20|rg=1|1=Summons Spiffo the Raccoon!|z=100000;1|r=3|t=20|rg=1|1=Summons a Caveling Gardener|2=Ancient energy in full bloom.|z=100000;|s=9999|r=3|rg=3|1=Summons ???|2=You really shouldnt;1|r=10|t=20|rg=1|1=Teleports you to the position of the mouse|z=500000;c|s=9999|r=6|t=45|rg=1|1=Increases the defense and strength of all villagers|2=Contains offensive and defensive fighting techniques, volume two!;c|s=9999|r=6|t=45|rg=1|1=Permanently boosts life regeneration|z=75000;c|s=9999|r=6|t=45|rg=1|1=Permanently increases defense|z=100000;c|s=9999|r=6|t=45|rg=1|1=Permanently increases mana regeneration|z=12500;c|s=9999|r=6|t=45|rg=1|1=Permanently increases luck|z=750000;c|s=9999|r=6|t=45|rg=1|1=Permanently increases fishing skill|z=500000;c|s=9999|r=6|t=45|rg=1|1=Permanently increases mining and building speed|z=25000;c|s=9999|r=6|t=45|rg=1|1=Permanently increases items sold by the Traveling Merchant|z=12500;|s=9999|rg=100|1=Renders coated objects visible only with Echo Sight|2=Can be combined with any other paint or coating|3=Its all clear to me now.|z=200;avt|s=9999|r=9|rg=1|1=Enables Echo Sight, showing hidden blocks|z=50000;1|r=2|rg=1|1=Releases poisonous gas when a container it is in is opened|z=15000;avt|s=9999|r=9|rg=1|1=Witness a glimpse of the Aethers power.|2=Can be used to manifest or suppress the Aether|z=50000;rb|s=9999|r=2|d=12|k=2|rg=99|1=Falls upwards|z=10;t|s=9999|rg=50;c|s=9999|r=5|t=15|rg=5|z=1250;t|s=9999|rg=1;t|s=9999|rg=1|1=Nearby players get a bonus against: Shimmer Slime|z=1000;t|s=9999|rg=100|z=60;a1|r=5|rg=1|1=Immunity to Darkness and Petrification|z=100000;a1|r=5|rg=1|1=Immunity to Shimmer Phasing|2=Hold Down to Phase while submerged in Shimmer|z=100000;1|rg=1;t|s=9999|rg=1|1=Life regen is increased when near a campfire;1|r=8|t=90|rg=1|1=Displays everything|2=Allows you to return home at will|3=Right Click to toggle destination|4=If you listen closely, you can hear something about your cars warranty|z=500000;1|r=8|t=90|rg=1|1=Displays everything|2=Allows you to return to spawn at will|3=Right Click to toggle destination|4=If you listen closely, you can hear something about your cars warranty|z=500000;1|r=8|t=90|rg=1|1=Displays everything|2=Allows you to travel to the ocean at will|3=Right Click to toggle destination|4=If you listen closely, you can hear something about your cars warranty|z=500000;1|r=8|t=90|rg=1|1=Displays everything|2=Allows you to travel to the underworld at will|3=Right Click to toggle destination|4=If you listen closely, you can hear something about your cars warranty|z=500000;at1|r=4|rg=1|z=100000;w|s=9999|rg=400|1=An egg-infested chunk of Spider wall that will spawn spiders;1|r=10|t=12|tr=2|rg=1|1=Contains an endless amount of Shimmer|2=Can be poured out|z=500000;w|s=9999|rg=400|1=A cursed segment of Dungeon wall that will spawn monsters;w|s=9999|rg=400|1=A cursed segment of Dungeon wall that will spawn monsters;w|s=9999|rg=400|1=A cursed segment of Dungeon wall that will spawn monsters;w|s=9999|rg=400|1=A cursed segment of Dungeon wall that will spawn monsters;w|s=9999|rg=400|1=A cursed segment of Dungeon wall that will spawn monsters;w|s=9999|rg=400|1=A cursed segment of Dungeon wall that will spawn monsters;w|s=9999|rg=400|1=A cursed segment of Dungeon wall that will spawn monsters;w|s=9999|rg=400|1=A cursed segment of Dungeon wall that will spawn monsters;w|s=9999|rg=400|1=A cursed segment of Dungeon wall that will spawn monsters;w|s=9999|rg=400|1=A dangerous slab of sand wall that will spawn monsters;w|s=9999|rg=400|1=A dangerous slab of sand wall that will spawn monsters;w|s=9999|rg=400|1=An ancient segment of Temple wall that will spawn Lihzahrds;rb|s=9999|d=1|k=1.5|rg=99|1=Exposes nearby treasure|z=150;rb|s=9999|d=1|k=1.5|rg=99|z=7;rb|s=9999|d=1|k=1.5|rg=99|z=7;rb|s=9999|d=1|k=1.5|rg=99|z=7;t|s=9999|r=7|rg=1|1=Allows time to fast forward to dusk one day per week|z=150000;d1|r=5|d=50|t=23|k=4.75|rg=1|1=Its Waffle Time!|z=150000;t|s=9999|r=5|rg=5|z=75;t|s=9999|r=2|rg=5|z=75000;4v1|rg=1|1=The Blue Traktor is coming|2=Great for impersonating streamers!|z=25000;5v1|r=3|rg=1|1=Property of Raynebro|z=10000;6v1|r=3|rg=1|1=Property of Raynebro|z=10000;t|s=9999|rg=1|1=C. Paninie|z=5000;t|s=9999|rg=1|1=C. Paninie|z=5000;4v1|r=3|rg=1|1=Property of Raynebro|z=10000;1|rg=1|1=Prevents item pickups while locked|2=Right Click to lock|3=You are over-encumbered|z=50000;b|s=9999|r=3|rg=99|1=Used by the Clentaminator|2=Spreads the Desert|z=1500;b|s=9999|r=3|rg=99|1=Used by the Clentaminator|2=Spreads the Snow|z=1500;b|s=9999|r=3|rg=99|1=Used by the Clentaminator|2=Spreads the Forest|z=1500;t|s=9999|rg=100;w|s=9999|rg=400;w|s=9999|rg=200;t|s=9999|rg=50;w|s=9999|rg=200;1|t=20|rg=1|1=Now with 20% more dirt!|z=1000;t|s=9999|r=9|rg=100|1=A forbidden building material from beyond;t|s=9999|r=9|rg=100|1=A forbidden building material from beyond;t|s=9999|r=9|rg=100|1=A forbidden building material from beyond;t|s=9999|r=9|rg=100|1=A forbidden building material from beyond;t|s=9999|r=9|rg=100|1=A forbidden building material from beyond;t|s=9999|r=9|rg=100|1=A forbidden building material from beyond;t|s=9999|r=9|rg=100|1=A forbidden building material from beyond;t|s=9999|r=9|rg=100|1=A forbidden building material from beyond;w|s=9999|r=9|rg=400|1=A forbidden building material from beyond;w|s=9999|r=9|rg=400|1=A forbidden building material from beyond;w|s=9999|r=9|rg=400|1=A forbidden building material from beyond;w|s=9999|r=9|rg=400|1=A forbidden building material from beyond;w|s=9999|r=9|rg=400|1=A forbidden building material from beyond;w|s=9999|r=9|rg=400|1=A forbidden building material from beyond;w|s=9999|r=9|rg=400|1=A forbidden building material from beyond;w|s=9999|r=9|rg=400|1=A forbidden building material from beyond;t|s=9999|rg=100;w|s=9999|rg=400;t|s=9999|rg=100;w|s=9999|rg=400;t|s=9999|rg=100;w|s=9999|rg=400;t|s=9999|rg=100;w|s=9999|rg=400;t|s=9999|rg=100;w|s=9999|rg=400;t|s=9999|rg=100;w|s=9999|rg=400;t|s=9999|rg=100;w|s=9999|rg=400;t|s=9999|rg=100;w|s=9999|rg=400;t|s=9999|rg=100;w|s=9999|rg=400;t|s=9999|rg=100;w|s=9999|rg=400;1|r=8|t=90|rg=1|1=Displays everything|2=Right Click to toggle destination|3=If you listen closely, you can hear something about your cars warranty|z=500000;c|s=9999|t=15|rg=30|1=Causes saplings to instantly grow into trees|z=50;t|s=9999|rg=100;t|s=9999|rg=100;t|s=9999|rg=100;t|s=9999|rg=100;t|s=9999|rg=100;t|s=9999|rg=100;w|s=9999|rg=400;w|s=9999|rg=400;w|s=9999|rg=400;w|s=9999|rg=400;w|s=9999|rg=400;w|s=9999|rg=400;1|r=3|t=32|rg=1|1=Rotate Left/Right to steer & Press Up to accelerate|2=First rule of Flight Club, we dont talk about Flight Club|z=100000;a1|r=3|rg=1|1=Allows wearer to see through their drone camera|2=Chonky Fishron RC Systems|z=100000".split(";");
utils_BMFont._rect = new openfl_geom_Rectangle();
utils_BMFont._offset = new openfl_geom_Matrix();
utils_WebArgs.map = new haxe_ds_StringMap();
ApplicationMain.main();
})(typeof console != "undefined" ? console : {log:function(){}}, typeof window != "undefined" ? window : exports, typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this);

//# sourceMappingURL=script.js.map