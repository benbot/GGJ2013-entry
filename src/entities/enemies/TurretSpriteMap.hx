package entities.enemies;

import com.haxepunk.graphics.Spritemap;

/**
 * ...
 * @author Benjamin Botwin
 */

class TurretSpriteMap extends Spritemap
{
	private var turret:Turret;
	private var buffer:Bool = true;
	
	public function new(string:String, x:Int, y:Int, turret:Turret) 
	{
		super(string, x, y, null, "");
		
		this.turret = turret;
	}
	
	override public function update():Dynamic 
	{
		if (frame == 0 && this.getCurrentAnim() == "throw" && buffer)
		{
			turret.shoot();
			buffer = false;
		}
		else if(frame != 0)
		{
			buffer = true;
		}
		
		super.update();
	}
}