package entities.enemies;

import com.haxepunk.Entity;
import com.haxepunk.graphics.Image;
import com.haxepunk.HXP;
import com.haxepunk.Mask;
import com.haxepunk.math.Vector;
import com.haxepunk.masks.Pixelmask;
import entities.Player;
/**
 * ...
 * @author Benjamin Botwin
 */

class Bullet extends Entity
{
	private var speed = 125;
	private var directionVec:Vector;
	
	public function new(x:Float, y:Float, directionVec:Vector, asset:String) 
	{
		super();
		
		this.x = x;
		this.y = y;
		
		this.directionVec = directionVec;
		
		var tempImage = new Image(asset);
		
		tempImage.scale = .3;
		
		graphic = tempImage;
		
		layer = 1;
		
		setHitbox(tempImage.scaledWidth, tempImage.scaledHeight);
		
		collidable = true;
	}
	
	override public function update():Void 
	{
		x += speed * HXP.elapsed * directionVec.x;
		y += speed * HXP.elapsed * directionVec.y;
		
		var tempEnt:Player = cast(collideTypes("player", x, y), Player);
		
		if (tempEnt != null)
		{
			tempEnt.health -= 1;
			HXP.world.remove(this);
		}
		
		super.update();
	}
}