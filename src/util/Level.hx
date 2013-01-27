package util;

import com.haxepunk.Entity;
import com.haxepunk.graphics.Image;
import haxe.xml.Fast;
import com.haxepunk.graphics.Tilemap;
import com.haxepunk.graphics.TiledSpritemap;
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
		
		map = new Tilemap(Assets.tileSet1, 1024, 1024, 64, 64);
		
		graphic = new Image(Assets.baby);
		
		if (Std.is(xml, String))
		{
			fast = new Fast(Xml.parse(nme.Assets.getBytes(xml).toString()));
		}
		
		type = "level";
		layer = 1;
		
		loadLevel();
	}
	
	public function loadLevel()
	{
		grid = new Grid(Std.parseInt(fast.node.level.att.width), Std.parseInt(fast.node.level.att.height), 64, 64);
		
		for (node in fast.node.level.node.graphic.nodes.tile)
		{
			map.setTile(Std.parseInt(node.att.x), Std.parseInt(node.att.y), Std.parseInt(node.att.id));
		}
		
		for (node in fast.node.level.node.collision.nodes.rect)
		{
			grid.setRect(Std.parseInt(node.att.x), Std.parseInt(node.att.y), Std.parseInt(node.att.w), Std.parseInt(node.att.h));
		}
		graphic = map;
		mask = grid;
	}
	
}