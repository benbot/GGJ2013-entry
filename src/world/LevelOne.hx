package world;

import com.haxepunk.World;
import entities.enemies.Turret;
import entities.Player;
import util.Level;

/**
 * ...
 * @author Benjamin Botwin
 */

class LevelOne extends World
{	
	var go:Level;
	public var player:Player;
	
	public function new(mapName:String) 
	{
		super();
		
		go = new Level(Assets.lvl, Assets.tileSet1, this);
		add(go);
		
	}
}