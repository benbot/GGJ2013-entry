#if (nme && !flambe)


import Main;
import nme.display.Bitmap;
import nme.display.Loader;
import nme.events.Event;
import nme.media.Sound;
import nme.net.URLLoader;
import nme.net.URLRequest;
import nme.net.URLLoaderDataFormat;
import nme.Assets;
import nme.Lib;


class ApplicationMain {
	
	
	private static var completed:Int;
	private static var preloader:NMEPreloader;
	private static var total:Int;
	
	public static var loaders:Hash <Loader>;
	public static var urlLoaders:Hash <URLLoader>;
	
	
	public static function main () {
		
		completed = 0;
		loaders = new Hash <Loader> ();
		urlLoaders = new Hash <URLLoader> ();
		total = 0;
		
		
		
		
		preloader = new com.haxepunk.Preloader ();
		
		Lib.current.addChild (preloader);
		preloader.onInit ();
		
		
		
		var loader:Loader = new Loader ();
		loaders.set ("graphics/baby.png", loader);
		total ++;
		
		
		var loader:Loader = new Loader ();
		loaders.set ("graphics/walkingBaby.png", loader);
		total ++;
		
		
		var loader:Loader = new Loader ();
		loaders.set ("gfx/debug/console_debug.png", loader);
		total ++;
		
		
		var loader:Loader = new Loader ();
		loaders.set ("gfx/debug/console_logo.png", loader);
		total ++;
		
		
		var loader:Loader = new Loader ();
		loaders.set ("gfx/debug/console_output.png", loader);
		total ++;
		
		
		var loader:Loader = new Loader ();
		loaders.set ("gfx/debug/console_pause.png", loader);
		total ++;
		
		
		var loader:Loader = new Loader ();
		loaders.set ("gfx/debug/console_play.png", loader);
		total ++;
		
		
		var loader:Loader = new Loader ();
		loaders.set ("gfx/debug/console_step.png", loader);
		total ++;
		
		
		var loader:Loader = new Loader ();
		loaders.set ("gfx/preloader/haxepunk.png", loader);
		total ++;
		
		
		
		if (total == 0) {
			
			begin ();
			
		} else {
			
			for (path in loaders.keys ()) {
				
				var loader:Loader = loaders.get (path);
				loader.contentLoaderInfo.addEventListener ("complete", loader_onComplete);
				loader.load (new URLRequest (path));
				
			}
			
			for (path in urlLoaders.keys ()) {
				
				var urlLoader:URLLoader = urlLoaders.get (path);
				urlLoader.addEventListener ("complete", loader_onComplete);
				urlLoader.load (new URLRequest (path));
				
			}
			
		}
		
	}
	
	
	private static function begin ():Void {
		
		preloader.addEventListener (Event.COMPLETE, preloader_onComplete);
		preloader.onLoaded ();
		
	}
	

   public static function getAsset(inName:String):Dynamic {
	   
		
		if (inName=="graphics/baby.png") {
			
			return Assets.getBitmapData ("graphics/baby.png");
			
		}
		
		if (inName=="graphics/walkingBaby.png") {
			
			return Assets.getBitmapData ("graphics/walkingBaby.png");
			
		}
		
		if (inName=="gfx/debug/console_debug.png") {
			
			return Assets.getBitmapData ("gfx/debug/console_debug.png");
			
		}
		
		if (inName=="gfx/debug/console_logo.png") {
			
			return Assets.getBitmapData ("gfx/debug/console_logo.png");
			
		}
		
		if (inName=="gfx/debug/console_output.png") {
			
			return Assets.getBitmapData ("gfx/debug/console_output.png");
			
		}
		
		if (inName=="gfx/debug/console_pause.png") {
			
			return Assets.getBitmapData ("gfx/debug/console_pause.png");
			
		}
		
		if (inName=="gfx/debug/console_play.png") {
			
			return Assets.getBitmapData ("gfx/debug/console_play.png");
			
		}
		
		if (inName=="gfx/debug/console_step.png") {
			
			return Assets.getBitmapData ("gfx/debug/console_step.png");
			
		}
		
		if (inName=="gfx/preloader/haxepunk.png") {
			
			return Assets.getBitmapData ("gfx/preloader/haxepunk.png");
			
		}
		
		if (inName=="font/04B_03__.ttf") {
			
			return Assets.getFont ("font/04B_03__.ttf");
			
		}
		
		return null;
		
   }
   
   
   
   
   // Event Handlers
   
   
   
   
	private static function loader_onComplete (event:Event):Void {
		
		completed ++;
		
		preloader.onUpdate (completed, total);
		
		if (completed == total) {
			
			begin ();
			
		}
	   
	}
	
	
	private static function preloader_onComplete (event:Event):Void {
		
		preloader.removeEventListener (Event.COMPLETE, preloader_onComplete);
		
		Lib.current.removeChild(preloader);
		preloader = null;
		
		if (Reflect.field(Main, "main") == null)
		{
			var mainDisplayObj = new Main();
			if (Std.is(mainDisplayObj, browser.display.DisplayObject))
				nme.Lib.current.addChild(cast mainDisplayObj);
		}
		else
		{
			Reflect.callMethod (Main, Reflect.field (Main, "main"), []);
		}
		
	}
   
   
}



	

	

	

	

	

	

	

	

	

	
		class NME_font_04b_03___ttf extends nme.text.Font { }
	



#else


import Main;


class ApplicationMain {
	
	
	public static function main () {
		
		if (Reflect.field(Main, "main") == null) {
			
			Type.createInstance (Main, []);
			
		} else {
			
			Reflect.callMethod (Main, Reflect.field (Main, "main"), []);
			
		}
		
	}
	
	
}


#end