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
	private var speed = 100;
	
	public function new(x:Float, y:Float) 
	{
		super();
		
		moveVec = new Vector();
	}
	
	private function shoot()
	{
		
	}
	
	private function move()
	{
		x += speed * moveVec.x;
		y += speed * moveVec.y;
	}
	
	override public function update():Void 
	{
		
		
		super.update();
	}
}