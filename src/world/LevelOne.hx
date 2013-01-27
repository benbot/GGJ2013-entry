package world;

import com.haxepunk.World;
import com.haxepunk.tmx.TmxEntity;
import entities.Player;
import util.Level;

/**
 * ...
 * @author Benjamin Botwin
 */

class LevelOne extends World
{	
	var go:Level;
	
	public function new(mapName:String) 
	{
		super();
		
		go = new Level(Assets.lvl, Assets.tileSet1);
		add(go);
	}
}