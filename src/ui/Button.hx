package ui;

import com.haxepunk.Entity;
import com.haxepunk.graphics.Image;
import com.haxepunk.HXP;
import com.haxepunk.Sfx;

/**
 * ...
 * @author Benjamin Botwin
 */

class Button extends Entity;
{
	private var click:Sfx;
	
	public function new(x:Float, Y:Float, asset:String) 
	{
		this.x = x;
		this.y = y;
		graphic = new Image(asset);
	}
	
	public function onMouseOver()
	{
		
	}
	
	public function clicked()
	{
		
	}
}