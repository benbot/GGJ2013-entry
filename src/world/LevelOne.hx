package world;

import com.haxepunk.World;
import com.haxepunk.tmx.TmxEntity;

/**
 * ...
 * @author Benjamin Botwin
 */

class LevelOne extends World
{
	private var level:TmxEntity;
	
	public function new(mapName:String) 
	{
		super();
		
		level = new TmxEntity(mapName);
	}
	
	private function createMap()
	{
		level.loadGraphic(Assets.tileSet1, ["graphics"]);
		
		level.loadMask();
	}
}