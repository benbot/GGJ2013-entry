package util;

import com.haxepunk.Entity;
import com.haxepunk.graphics.Image;
import haxe.xml.Fast;
import com.haxepunk.graphics.Tilemap;
import com.haxepunk.masks.Grid;

/**
 * ...
 * @author Benjamin Botwin
 */

class Level extends Entity
{
	var fast:Fast;
	var map:Tilemap;
	var grid:Grid;
	
	public function new(xml:Dynamic, filePath:String) 
	{
		super();
		
		map = new Tilemap(Assets.tileSet1, 389, 389, 64, 64);
		
		graphic = new Image(Assets.baby);
		
		if (Std.is(xml, String))
		{
			fast = new Fast(Xml.parse(nme.Assets.getBytes(xml).toString()));
		}
		
		loadLevel();
	}
	
	public function loadLevel()
	{
		grid = new Grid(Std.parseInt(fast.node.level.att.width), Std.parseInt(fast.node.level.att.height), 64, 64);
		
		var tileX:Int = 0;
		var tileY:Int = 0;
		x = y = 0;
		for (node in fast.nodes.graphic)
		{
			map.setTile(Std.parseInt(node.att.x), Std.parseInt(node.att.y), Std.parseInt(node.att.id));
		}
		graphic = map;
	}
	
}