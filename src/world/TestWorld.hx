package world;

import com.haxepunk.Entity;
import com.haxepunk.World;
import entities.enemies.Turret;
import entities.enemies.Chaser;
import entities.Player;

/**
 * ...
 * @author Benjamin Botwin
 */

class TestWorld extends World
{
	public var player:Player;
	
	public function new() 
	{
		super();
		player = new Player(400, 300);
		add(player);
		add(new Turret(100, 100));
	}
}