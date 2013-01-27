package entities.enemies;

import com.haxepunk.Entity;
import com.haxepunk.math.Vector;

/**
 * ...
 * @author Benjamin Botwin
 */

class AcidPopper extends Entity
{
	
	private var moveVec:Vector;
	private var playerVec:Vector;
	private var cooldown:Float = 3;
	private var speed = 100;
	
	public function new(x:Float, y:Float) 
	{
		super();
		
		moveVec = new Vector();
		playerVec = new Vector();
	}
	
	private function makePlayerVec()
	{
		playerVec = new Vector(cast(HXP.world, LevelOne).player.x, cast(HXP.world, LevelOne).player.y);
		playerVec.normalize(1);
	}
	
	private function shoot()
	{
		HXP.world.add(new Bullet(x, y, playerVec, Assets.baby));
	}
	
	private function move()
	{
		x += speed * moveVec.x;
		y += speed * moveVec.y;
	}
	
	override public function update():Void 
	{
		if (cooldown <= 0)
		{
			makePlayerVec();
			shoot();
			cooldown = 3;
		}
		else
		{
			cooldown -= HXP.elapsed;
		}
		
		
		super.update();
	}
}