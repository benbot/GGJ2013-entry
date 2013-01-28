package util;

import com.haxepunk.Entity;
import com.haxepunk.graphics.Image;
import entities.Collide;
import entities.enemies.Turret;
import entities.Player;
import haxe.xml.Fast;
import com.haxepunk.graphics.Tilemap;
import com.haxepunk.graphics.TiledSpritemap;
import com.haxepunk.masks.Grid;
import com.haxepunk.HXP;
import world.LevelOne;
import world.TestWorld;
import entities.Door;

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
	
	public function new(xml:Dynamic, level:LevelOne) 
	{
		super();
		
		this.level = level;
		
		map = Assets.map;
		
		graphic = new Image(Assets.baby);
		
		if (Std.is(xml, String))
		{
			fast = new Fast(Xml.parse(nme.Assets.getBytes(xml).toString()));
		}
		
		layer = 5;
		
		collidable = false;
		
		loadLevel();
		
	}
	
	public function loadLevel()
	{
		grid = new Grid(1024, 1024, 64, 64);
		
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
		
		for (node in fast.node.level.node.entities.nodes.topDoor)
		{
			level.add(new Door(Std.parseInt(node.att.x), Std.parseInt(node.att.y), new LevelOne(node.att.toLevel), 0));
		}
		
		for (node in fast.node.level.node.entities.nodes.botDoor)
		{
			level.add(new Door(Std.parseInt(node.att.x), Std.parseInt(node.att.y), new LevelOne(node.att.toLevel), 1));
		}
		
		for (node in fast.node.level.node.entities.nodes.topDoor)
		{
			level.add(new Door(Std.parseInt(node.att.x), Std.parseInt(node.att.y), new LevelOne(node.att.toLevel), 2));
		}
		
		for (node in fast.node.level.node.entities.nodes.collide)
		{
			level.add(new Collide(Std.parseInt(node.att.x), Std.parseInt(node.att.y)));
		}
		
		graphic = map;
	}
	
}