package entities.enemies;

import com.haxepunk.Entity;
import com.haxepunk.graphics.Image;
import com.haxepunk.graphics.Spritemap;
import com.haxepunk.math.Vector;
import com.haxepunk.HXP;
import world.TestWorld;

/**
 * ...
 * @author Benjamin Botwin
 */

class Turret extends Entity
{
	private var bulletDirectionVec:Vector;
	private var coolDown:Float = 1.475;
	private var sprite:TurretSpriteMap;
	
	public function new(x:Int, y:Int) 
	{
		super();
		
		this.x = x;
		this.y = y;
		
		sprite = new TurretSpriteMap(Assets.turret, 620, 558, this);
		sprite.scale = .3;
		sprite.add("throw", [8, 5, 4, 3, 7, 2, 6, 1, 0, 5, 8], 7, false);
		sprite.add("stand", [8], 0, false);
		graphic = sprite;
		sprite.play("stand");
	}
	
	public function shoot()
	{
		//SHXP.world.add(new Bullet(x, y, bulletDirectionVec));
	}
	
	private function makeDirectionVector()
	{
		bulletDirectionVec = new Vector(cast(HXP.world, TestWorld).player.x - x, cast(HXP.world, TestWorld).player.y - y);
		bulletDirectionVec.normalize(1);
	}
	
	public override function update()
	{
		if (coolDown <= 0)
		{
			makeDirectionVector();
			sprite.play("throw");
			coolDown = 2;
		}
		else
		{
			if (sprite.complete)
			{
				sprite.play("stand");
			}
			coolDown -= HXP.elapsed;
		}
		
		super.update();
	}
}