package util;

import com.haxepunk.Entity;

/**
 * ...
 * @author Benjamin Botwin
 */

class Path extends Entity
{
	private var isMaster:Bool;
	private var parent:Path;
	private var child:Path;
	
	public function new(x:Int, y:Int, parent:Path = null) 
	{
		super();
		
		this.x = x;
		this.y = y;
		
		if (parent == null)
		{
			isMaster = true;
		}
	}
	
}