package world;

import com.haxepunk.World;
import com.haxepunk.tmx.TmxEntity;
import entities.Player;

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
		
		createMap();
	}
	
	private function createMap()
	{
		level.loadGraphic(Assets.tileSet1, ["graphic"]);
		
		level.loadMask();
		
		add(level);
		add(new Player(100, 100));
	}
}