package entities;

import com.haxepunk.Entity;
import com.haxepunk.graphics.Image;
import com.haxepunk.graphics.Spritemap;
import com.haxepunk.math.Vector;
import com.haxepunk.HXP;
import com.haxepunk.Mask;
import com.haxepunk.masks.Pixelmask;
import com.haxepunk.utils.Input;

/**
 * ...
 * @author Benjamin Botwin
 */

class Player extends Entity
{
	public var health = 3;
	
	private var moveVec:Vector;
	private var speedVec:Vector;
	private static inline var incrament:Float = 0.03;
	private var sprite:Spritemap;
	
	public function new(posX:Int, posY:Int) 
	{
		super();
		
		moveVec = new Vector();
		speedVec = new Vector(150, 150);
		
		sprite = new Spritemap(Assets.walkingBaby, 284, 421);
		sprite.add("walkDown", [3, 5, 4, 5], 4, true);
		sprite.add ("walkUp", [0, 2, 1, 2], 4, true);
		sprite.add("stand", [5], 0, false);
		sprite.scale = .3;
		graphic = sprite;
		sprite.play("stand");
		
		x = posX;
		y = posY;
		
		setMask(new Pixelmask(Assets.baby));
		
		type = "player";
		
		collidable = true;
	}
	
	private inline function move(x:Float, y:Float)
	{
		this.x += (speedVec.x * HXP.elapsed) * x;
		this.y += (speedVec.y * HXP.elapsed) * y;
	}
	
	private inline function handleInput()
	{
		if (Input.check("right"))
		{	
			if (moveVec.x != 1)
			{
				moveVec.x += incrament;
				if (moveVec.x > 1)
				{
					moveVec.x = 1;
				}
			}
			
		}
		else if(!(moveVec.x <= 0))
		{
			moveVec.x -= incrament;
			
			if (moveVec.x < 0)
			{
				moveVec.x = 0;
			}
		}
		
		if (Input.check("left"))
		{
			if (moveVec.x != -1)
			{
				moveVec.x -= incrament;
				
				if (moveVec.x < -1)
				{
					moveVec.x = -1;
				}
			}
		}
		else if(!(moveVec.x >= 0))
		{
			moveVec.x += incrament;
			
			if ( moveVec.x > 0)
			{
				moveVec.x = 0;
			}
		}
		
		if (Input.check("down"))
		{	
			if (moveVec.y != 1)
			{
				moveVec.y += incrament;
				if (moveVec.y > 1)
				{
					moveVec.y = 1;
				}
				sprite.play("walkDown");
			}
		}
		else if(!(moveVec.y <= 0))
		{
			moveVec.y -= incrament;
			
			if (moveVec.y < 0)
			{
				moveVec.y = 0;
			}
		}
		
		if (Input.check("up"))
		{
			if (moveVec.y != -1)
			{
				moveVec.y -= incrament;
				
				if (moveVec.y < -1)
				{
					moveVec.y = -1;
				}
				sprite.play("walkUp");
			}
		}
		else if(!(moveVec.y >= 0))
		{
			moveVec.y += incrament;
			
			if (moveVec.y > 0)
			{
				moveVec.y = 0;
			}
		}
		
		if (moveVec.x == 0 && moveVec.y == 0)
		{
			sprite.play("stand");
		}
		
	}
	
	override public function update():Void
	{	
		handleInput();
		move(moveVec.x, moveVec.y);
		
		if (health <= 0)
		{
			trace("dead");
			//TODO HXP.world = new GameOver();
		}
		
		super.update();
	}
}