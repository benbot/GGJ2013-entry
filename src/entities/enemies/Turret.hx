package entities.enemies;

import com.haxepunk.Entity;
import com.haxepunk.graphics.Image;
import com.haxepunk.graphics.Spritemap;
import com.haxepunk.math.Vector;
import com.haxepunk.HXP;
import com.haxepunk.Sfx;
import world.LevelOne;

/**
 * ...
 * @author Benjamin Botwin
 */

class Turret extends Entity
{
	private var bulletDirectionVec:Vector;
	private var coolDown:Float = 1.475;
	private var sprite:TurretSpriteMap;
	private var toss:Sfx;
	
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
		layer = 1;
		toss = new Sfx(Assets.turretToss);
		toss.volume = 50;
	}
	
	public function shoot()
	{
		HXP.world.add(new Bullet(x, y, bulletDirectionVec, Assets.rock));
	}
	
	private function makeDirectionVector()
	{
		bulletDirectionVec = new Vector(cast(HXP.world, LevelOne).player.x - x, cast(HXP.world, LevelOne).player.y - y);
		bulletDirectionVec.normalize(1);
	}
	
	public override function update()
	{
		if (coolDown <= 0)
		{
			makeDirectionVector();
			sprite.play("throw");
			toss.play();
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