package ;
import com.haxepunk.Engine;
import com.haxepunk.HXP;
import com.haxepunk.utils.Input;
import com.haxepunk.utils.Key;
import world.LevelOne;
import world.TestWorld;
import com.haxepunk.Sfx;

/**
 * ...
 * @author Benjamin Botwin
 */

class Main extends Engine 
{
	public static inline var screenX = 800;
	public static inline var screenY = 600;
	public static inline var clearColor = 0x200220;
	public static var song:Sfx;
	
	public function new()
	{
		super(screenX, screenY, 61);
		
		song = new Sfx("music/music.wav");
		
		Input.define("up", [Key.W, Key.UP]);
		Input.define("down", [Key.S, Key.DOWN]);
		Input.define("left", [Key.A, Key.LEFT]);
		Input.define("right", [Key.D, Key.RIGHT]);
	}
	
	private function loadAllAssets()
	{
		//TODO: Add asset loading
	}
	
	private function loadAllWorlds()
	{
		//TODO: Add asset loading
	}
	
	public override function init() 
	{
#if debug
		//HXP.console.enable();
#end
		HXP.screen.color = clearColor;
		HXP.screen.scale = 1;
		HXP.world = new LevelOne(Assets.lvl); //TODO: Add a world... derp
		song.volume = 50;
		song.loop();
	}
}
