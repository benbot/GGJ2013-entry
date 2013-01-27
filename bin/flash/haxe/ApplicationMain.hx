#if nme

import Main;
import nme.Assets;
import nme.events.Event;


class ApplicationMain {
	
	static var mPreloader:NMEPreloader;

	public static function main () {
		
		var call_real = true;
		
		
		var loaded:Int = nme.Lib.current.loaderInfo.bytesLoaded;
		var total:Int = nme.Lib.current.loaderInfo.bytesTotal;
		
		nme.Lib.current.stage.align = nme.display.StageAlign.TOP_LEFT;
		nme.Lib.current.stage.scaleMode = nme.display.StageScaleMode.NO_SCALE;
		
		if (loaded < total || true) /* Always wait for event */ {
			
			call_real = false;
			mPreloader = new com.haxepunk.Preloader();
			nme.Lib.current.addChild(mPreloader);
			mPreloader.onInit();
			mPreloader.onUpdate(loaded,total);
			nme.Lib.current.addEventListener (nme.events.Event.ENTER_FRAME, onEnter);
			
		}
		
		
		
		
		
		

		if (call_real)
			begin ();
	}

	
	
	private static function begin () {
		
		var hasMain = false;
		
		for (methodName in Type.getClassFields(Main))
		{
			if (methodName == "main")
			{
				hasMain = true;
				break;
			}
		}
		
		if (hasMain)
		{
			Reflect.callMethod (Main, Reflect.field (Main, "main"), []);
		}
		else
		{
			var instance = Type.createInstance(Main, []);
			if (Std.is (instance, nme.display.DisplayObject)) {
				nme.Lib.current.addChild(cast instance);
			}	
		}
		
	}

	static function onEnter (_) {
		
		var loaded = nme.Lib.current.loaderInfo.bytesLoaded;
		var total = nme.Lib.current.loaderInfo.bytesTotal;
		mPreloader.onUpdate(loaded,total);
		
		if (loaded >= total) {
			
			nme.Lib.current.removeEventListener(nme.events.Event.ENTER_FRAME, onEnter);
			mPreloader.addEventListener (Event.COMPLETE, preloader_onComplete);
			mPreloader.onLoaded();
			
		}
		
	}

	public static function getAsset (inName:String):Dynamic {
		
		
		if (inName=="graphics/baby.png")
			 
            return Assets.getBitmapData ("graphics/baby.png");
         
		
		if (inName=="graphics/PUKEsprite.png")
			 
            return Assets.getBitmapData ("graphics/PUKEsprite.png");
         
		
		if (inName=="graphics/rock.png")
			 
            return Assets.getBitmapData ("graphics/rock.png");
         
		
		if (inName=="graphics/sideBaby.png")
			 
            return Assets.getBitmapData ("graphics/sideBaby.png");
         
		
		if (inName=="graphics/TileSet1.png")
			 
            return Assets.getBitmapData ("graphics/TileSet1.png");
         
		
		if (inName=="graphics/tilesprite.png")
			 
            return Assets.getBitmapData ("graphics/tilesprite.png");
         
		
		if (inName=="graphics/TurretSheet.png")
			 
            return Assets.getBitmapData ("graphics/TurretSheet.png");
         
		
		if (inName=="graphics/walkingBaby.png")
			 
            return Assets.getBitmapData ("graphics/walkingBaby.png");
         
		
		if (inName=="graphics/Wall2.png")
			 
            return Assets.getBitmapData ("graphics/Wall2.png");
         
		
		if (inName=="graphics/Wall4.png")
			 
            return Assets.getBitmapData ("graphics/Wall4.png");
         
		
		if (inName=="sound/button.wav")
			 
            return Assets.getSound ("sound/button.wav");
         
		
		if (inName=="sound/hurglurgl-throw.wav")
			 
            return Assets.getSound ("sound/hurglurgl-throw.wav");
         
		
		if (inName=="maps/lvl1.oel")
			 
			 return Assets.getText ("maps/lvl1.oel");
         
		
		if (inName=="gfx/debug/console_debug.png")
			 
            return Assets.getBitmapData ("gfx/debug/console_debug.png");
         
		
		if (inName=="gfx/debug/console_logo.png")
			 
            return Assets.getBitmapData ("gfx/debug/console_logo.png");
         
		
		if (inName=="gfx/debug/console_output.png")
			 
            return Assets.getBitmapData ("gfx/debug/console_output.png");
         
		
		if (inName=="gfx/debug/console_pause.png")
			 
            return Assets.getBitmapData ("gfx/debug/console_pause.png");
         
		
		if (inName=="gfx/debug/console_play.png")
			 
            return Assets.getBitmapData ("gfx/debug/console_play.png");
         
		
		if (inName=="gfx/debug/console_step.png")
			 
            return Assets.getBitmapData ("gfx/debug/console_step.png");
         
		
		if (inName=="gfx/preloader/haxepunk.png")
			 
            return Assets.getBitmapData ("gfx/preloader/haxepunk.png");
         
		
		if (inName=="font/04B_03__.ttf")
			 
			 return Assets.getFont ("font/04B_03__.ttf");
		 
		
		
		return null;
		
	}
	
	
	private static function preloader_onComplete (event:Event):Void {
		
		mPreloader.removeEventListener (Event.COMPLETE, preloader_onComplete);
		
		nme.Lib.current.removeChild(mPreloader);
		mPreloader = null;
		
		begin ();
		
	}
	
}

class NME_graphics_baby_png extends nme.display.BitmapData { public function new () { super (0, 0); } }
class NME_graphics_pukesprite_png extends nme.display.BitmapData { public function new () { super (0, 0); } }
class NME_graphics_rock_png extends nme.display.BitmapData { public function new () { super (0, 0); } }
class NME_graphics_sidebaby_png extends nme.display.BitmapData { public function new () { super (0, 0); } }
class NME_graphics_tileset1_png extends nme.display.BitmapData { public function new () { super (0, 0); } }
class NME_graphics_tilesprite_png extends nme.display.BitmapData { public function new () { super (0, 0); } }
class NME_graphics_turretsheet_png extends nme.display.BitmapData { public function new () { super (0, 0); } }
class NME_graphics_walkingbaby_png extends nme.display.BitmapData { public function new () { super (0, 0); } }
class NME_graphics_wall2_png extends nme.display.BitmapData { public function new () { super (0, 0); } }
class NME_graphics_wall4_png extends nme.display.BitmapData { public function new () { super (0, 0); } }
class NME_sound_button_wav extends nme.media.Sound { }
class NME_sound_hurglurgl_throw_wav extends nme.media.Sound { }
class NME_maps_lvl1_oel extends nme.utils.ByteArray { }
class NME_gfx_debug_console_debug_png extends nme.display.BitmapData { public function new () { super (0, 0); } }
class NME_gfx_debug_console_logo_png extends nme.display.BitmapData { public function new () { super (0, 0); } }
class NME_gfx_debug_console_output_png extends nme.display.BitmapData { public function new () { super (0, 0); } }
class NME_gfx_debug_console_pause_png extends nme.display.BitmapData { public function new () { super (0, 0); } }
class NME_gfx_debug_console_play_png extends nme.display.BitmapData { public function new () { super (0, 0); } }
class NME_gfx_debug_console_step_png extends nme.display.BitmapData { public function new () { super (0, 0); } }
class NME_gfx_preloader_haxepunk_png extends nme.display.BitmapData { public function new () { super (0, 0); } }
class NME_font_04b_03___ttf extends nme.text.Font { }


#else

import Main;

class ApplicationMain {
	
	public static function main () {
		
		var hasMain = false;
		
		for (methodName in Type.getClassFields(Main))
		{
			if (methodName == "main")
			{
				hasMain = true;
				break;
			}
		}
		
		if (hasMain)
		{
			Reflect.callMethod (Main, Reflect.field (Main, "main"), []);
		}
		else
		{
			var instance = Type.createInstance(Main, []);
			if (Std.is (instance, flash.display.DisplayObject)) {
				flash.Lib.current.addChild(cast instance);
			}
		}
		
	}

}

#end
