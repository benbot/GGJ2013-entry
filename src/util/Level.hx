package util;

import com.haxepunk.Entity;
import com.haxepunk.graphics.Image;
import entities.enemies.Turret;
import entities.Player;
import haxe.xml.Fast;
import com.haxepunk.graphics.Tilemap;
import com.haxepunk.graphics.TiledSpritemap;
import com.haxepunk.masks.Grid;
import com.haxepunk.HXP;
import world.LevelOne;
import world.TestWorld;

/**
 * ...
 * @author Benjamin Botwin
 */

class Level extends Entity
{
	var fast:Fast;
	var map:Tilemap;
	var grid:Grid;
	var level:LevelOne;
	
	public function new(xml:Dynamic, filePath:String, level:LevelOne) 
	{
		super();
		
		this.level = level;
		
		map = new Tilemap(Assets.tileSet1, 1024, 1024, 64, 64);
		
		graphic = new Image(Assets.baby);
		
		if (Std.is(xml, String))
		{
			fast = new Fast(Xml.parse(nme.Assets.getBytes(xml).toString()));
		}
		
		type = "level";
		layer = 5;
		
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
		
		level.player = new Player(Std.parseInt(fast.node.level.node.entities.node.Player.att.x), Std.parseInt(fast.node.level.node.entities.node.Player.att.x));
		level.add(level.player);
		
		for (node in fast.node.level.node.entities.nodes.Turret)
		{
			level.add(new Turret(Std.parseInt(node.att.x), Std.parseInt(node.att.y)));
		}
		
		
		graphic = map;
		mask = grid;
	}
	
}