package nme.installer;


import format.display.MovieClip;
import haxe.Unserializer;
import nme.display.BitmapData;
import nme.media.Sound;
import nme.net.URLRequest;
import nme.text.Font;
import nme.utils.ByteArray;
import ApplicationMain;

#if swf
import format.SWF;
#end

#if xfl
import format.XFL;
#end


/**
 * ...
 * @author Joshua Granick
 */

class Assets {

	
	public static var cachedBitmapData:Hash<BitmapData> = new Hash<BitmapData>();
	#if swf private static var cachedSWFLibraries:Hash <SWF> = new Hash <SWF> (); #end
	#if xfl private static var cachedXFLLibraries:Hash <XFL> = new Hash <XFL> (); #end
	
	private static var initialized:Bool = false;
	private static var libraryTypes:Hash <String> = new Hash <String> ();
	private static var resourceClasses:Hash <Dynamic> = new Hash <Dynamic> ();
	private static var resourceTypes:Hash <String> = new Hash <String> ();
	
	
	private static function initialize ():Void {
		
		if (!initialized) {
			
			resourceClasses.set ("graphics/baby.png", NME_graphics_baby_png);
			resourceTypes.set ("graphics/baby.png", "image");
			resourceClasses.set ("graphics/Door/doorsprite.png", NME_graphics_door_doorsprite_png);
			resourceTypes.set ("graphics/Door/doorsprite.png", "image");
			resourceClasses.set ("graphics/Door/doorsprite2.png", NME_graphics_door_doorsprite2_png);
			resourceTypes.set ("graphics/Door/doorsprite2.png", "image");
			resourceClasses.set ("graphics/Door/doorsprite3.png", NME_graphics_door_doorsprite3_png);
			resourceTypes.set ("graphics/Door/doorsprite3.png", "image");
			resourceClasses.set ("graphics/Door/doorsprite4.png", NME_graphics_door_doorsprite4_png);
			resourceTypes.set ("graphics/Door/doorsprite4.png", "image");
			resourceClasses.set ("graphics/PUKEsprite.png", NME_graphics_pukesprite_png);
			resourceTypes.set ("graphics/PUKEsprite.png", "image");
			resourceClasses.set ("graphics/rock.png", NME_graphics_rock_png);
			resourceTypes.set ("graphics/rock.png", "image");
			resourceClasses.set ("graphics/sideBaby.png", NME_graphics_sidebaby_png);
			resourceTypes.set ("graphics/sideBaby.png", "image");
			resourceClasses.set ("graphics/TileSet1.png", NME_graphics_tileset1_png);
			resourceTypes.set ("graphics/TileSet1.png", "image");
			resourceClasses.set ("graphics/tilesprite.png", NME_graphics_tilesprite_png);
			resourceTypes.set ("graphics/tilesprite.png", "image");
			resourceClasses.set ("graphics/TurretSheet.png", NME_graphics_turretsheet_png);
			resourceTypes.set ("graphics/TurretSheet.png", "image");
			resourceClasses.set ("graphics/walkingBaby.png", NME_graphics_walkingbaby_png);
			resourceTypes.set ("graphics/walkingBaby.png", "image");
			resourceClasses.set ("graphics/Wall2.png", NME_graphics_wall2_png);
			resourceTypes.set ("graphics/Wall2.png", "image");
			resourceClasses.set ("graphics/Wall4.png", NME_graphics_wall4_png);
			resourceTypes.set ("graphics/Wall4.png", "image");
			resourceClasses.set ("sound/button.wav", NME_sound_button_wav);
			resourceTypes.set ("sound/button.wav", "sound");
			resourceClasses.set ("sound/hurglurgl-throw.wav", NME_sound_hurglurgl_throw_wav);
			resourceTypes.set ("sound/hurglurgl-throw.wav", "sound");
			resourceClasses.set ("maps/lvl1.oel", NME_maps_lvl1_oel);
			resourceTypes.set ("maps/lvl1.oel", "text");
			resourceClasses.set ("gfx/debug/console_debug.png", NME_gfx_debug_console_debug_png);
			resourceTypes.set ("gfx/debug/console_debug.png", "image");
			resourceClasses.set ("gfx/debug/console_logo.png", NME_gfx_debug_console_logo_png);
			resourceTypes.set ("gfx/debug/console_logo.png", "image");
			resourceClasses.set ("gfx/debug/console_output.png", NME_gfx_debug_console_output_png);
			resourceTypes.set ("gfx/debug/console_output.png", "image");
			resourceClasses.set ("gfx/debug/console_pause.png", NME_gfx_debug_console_pause_png);
			resourceTypes.set ("gfx/debug/console_pause.png", "image");
			resourceClasses.set ("gfx/debug/console_play.png", NME_gfx_debug_console_play_png);
			resourceTypes.set ("gfx/debug/console_play.png", "image");
			resourceClasses.set ("gfx/debug/console_step.png", NME_gfx_debug_console_step_png);
			resourceTypes.set ("gfx/debug/console_step.png", "image");
			resourceClasses.set ("gfx/preloader/haxepunk.png", NME_gfx_preloader_haxepunk_png);
			resourceTypes.set ("gfx/preloader/haxepunk.png", "image");
			resourceClasses.set ("font/04B_03__.ttf", NME_font_04b_03___ttf);
			resourceTypes.set ("font/04B_03__.ttf", "font");
			
			
			initialized = true;
			
		}
		
	}
	
	
	public static function getBitmapData (id:String, useCache:Bool = true):BitmapData {
		
		initialize ();
		
		if (resourceTypes.exists (id) && resourceTypes.get (id).toLowerCase () == "image") {
			
			if (useCache && cachedBitmapData.exists (id)) {
				
				return cachedBitmapData.get (id);
				
			} else {
				
				var data = cast (Type.createInstance (resourceClasses.get (id), []), BitmapData);
				
				if (useCache) {
					
					cachedBitmapData.set (id, data);
					
				}
				
				return data;
				
			}
			
		} else if (id.indexOf (":") > -1) {
			
			var libraryName = id.substr (0, id.indexOf (":"));
			var symbolName = id.substr (id.indexOf (":") + 1);
			
			if (libraryTypes.exists (libraryName)) {
				
				#if swf
				
				if (libraryTypes.get (libraryName) == "swf") {
					
					if (!cachedSWFLibraries.exists (libraryName)) {
						
						cachedSWFLibraries.set (libraryName, new SWF (getBytes ("libraries/" + libraryName + ".swf")));
						
					}
					
					return cachedSWFLibraries.get (libraryName).getBitmapData (symbolName);
					
				}
				
				#end
				
				#if xfl
				
				if (libraryTypes.get (libraryName) == "xfl") {
					
					if (!cachedXFLLibraries.exists (libraryName)) {
						
						cachedXFLLibraries.set (libraryName, Unserializer.run (getText ("libraries/" + libraryName + "/" + libraryName + ".dat")));
						
					}
					
					return cachedXFLLibraries.get (libraryName).getBitmapData (symbolName);
					
				}
				
				#end
				
			} else {
				
				trace ("[nme.Assets] There is no asset library named \"" + libraryName + "\"");
				
			}
			
		} else {
			
			trace ("[nme.Assets] There is no BitmapData asset with an ID of \"" + id + "\"");
			
		}
		
		return null;
		
	}
	
	
	public static function getBytes (id:String):ByteArray {
		
		initialize ();
		
		if (resourceClasses.exists (id)) {
			
			return Type.createInstance (resourceClasses.get (id), []);
			
		} else {
			
			trace ("[nme.Assets] There is no ByteArray asset with an ID of \"" + id + "\"");
			
			return null;
			
		}
		
	}
	
	
	public static function getFont (id:String):Font {
		
		initialize ();
		
		if (resourceTypes.exists (id) && resourceTypes.get (id).toLowerCase () == "font") {
			
			return cast (Type.createInstance (resourceClasses.get (id), []), Font);
			
		} else {
			
			trace ("[nme.Assets] There is no Font asset with an ID of \"" + id + "\"");
			
			return null;
			
		}
		
	}
	
	
	public static function getMovieClip (id:String):MovieClip {
		
		initialize ();
		
		var libraryName = id.substr (0, id.indexOf (":"));
		var symbolName = id.substr (id.indexOf (":") + 1);
		
		if (libraryTypes.exists (libraryName)) {
			
			#if swf
			
			if (libraryTypes.get (libraryName) == "swf") {
				
				if (!cachedSWFLibraries.exists (libraryName)) {
					
					cachedSWFLibraries.set (libraryName, new SWF (getBytes ("libraries/" + libraryName + ".swf")));
					
				}
				
				return cachedSWFLibraries.get (libraryName).createMovieClip (symbolName);
				
			}
			
			#end
			
			#if xfl
			
			if (libraryTypes.get (libraryName) == "xfl") {
				
				if (!cachedXFLLibraries.exists (libraryName)) {
					
					cachedXFLLibraries.set (libraryName, Unserializer.run (getText ("libraries/" + libraryName + "/" + libraryName + ".dat")));
					
				}
				
				return cachedXFLLibraries.get (libraryName).createMovieClip (symbolName);
				
			}
			
			#end
			
		} else {
			
			trace ("[nme.Assets] There is no asset library named \"" + libraryName + "\"");
			
		}
		
		return null;
		
	}
	
	
	public static function getSound (id:String):Sound {
		
		initialize ();
		
		if (resourceTypes.exists (id)) {
			
			if (resourceTypes.get (id).toLowerCase () == "sound" || resourceTypes.get (id).toLowerCase () == "music") {
				
				return cast (Type.createInstance (resourceClasses.get (id), []), Sound);
				
			}
			
		}
		
		trace ("[nme.Assets] There is no Sound asset with an ID of \"" + id + "\"");
		
		return null;
		
	}
	
	
	public static function getText (id:String):String {
		
		var bytes = getBytes (id);
		
		if (bytes == null) {
			
			return null;
			
		} else {
			
			return bytes.readUTFBytes (bytes.length);
			
		}
		
	}
	
	
	//public static function loadBitmapData(id:String, handler:BitmapData -> Void, useCache:Bool = true):BitmapData
	//{
		//return null;
	//}
	//
	//
	//public static function loadBytes(id:String, handler:ByteArray -> Void):ByteArray
	//{	
		//return null;
	//}
	//
	//
	//public static function loadText(id:String, handler:String -> Void):String
	//{
		//return null;
	//}
	
	
}