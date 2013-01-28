package ;
import com.haxepunk.graphics.Image;
import com.haxepunk.graphics.Tilemap;

/**
 * ...
 * @author Benjamin Botwin
 */

class Assets 
{
	public static var baby:String = "graphics/baby.png";
	public static var walkingBaby:String = "graphics/walkingBaby.png";
	public static var turret:String = "graphics/TurretSheet.png";
	public static var tileSet1:String = "graphics/tilesprite.png";
	public static var rock:String = "graphics/rock.png";
	public static var lvl:String = "maps/startingarea.oel";
	public static var turretToss:String = "sound/hurglurgl-throw.wav";
	public static var sideBaby:String = "graphics/sideBaby.png";
	public static var map:Tilemap = new Tilemap(new Image("graphics/tilesprite.png"), 1024, 1024, 64, 64);
	
	public function new() 
	{
		
	}	
}