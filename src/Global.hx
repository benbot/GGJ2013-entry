package ;
import com.haxepunk.World;

/**
 * ...
 * @author Benjamin Botwin
 */

class Global 
{
	public static var worldHash:Hash<World>;
	
	public function new() 
	{
		worldHash = new Hash<World>();
	}
}