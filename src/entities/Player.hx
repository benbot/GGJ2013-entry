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
	private var sprite2:Spritemap;
	
	public function new(posX:Int, posY:Int) 
	{
		super();
		
		moveVec = new Vector();
		speedVec = new Vector(150, 150);
		
		sprite = new Spritemap(Assets.walkingBaby, 284, 421);
		sprite2 = new Spritemap(Assets.sideBaby, 193, 421);
		sprite2.scale = .2;
		sprite2.add("walk", [0, 1, 2, 1], 4, true);
		sprite.add("walkDown", [3, 5, 4, 5], 4, true);
		sprite.add ("walkUp", [0, 2, 1, 2], 4, true);
		sprite.add("stand", [5], 0, false);
		sprite.scale = .2;
		sprite.smooth = true;
		sprite2.smooth = true;
		graphic = sprite;
		sprite.play("stand");
		
		x = posX;
		y = posY;
		
		
		type = "player";
		
		layer = 0;
		
		setHitbox(30, 30);
		
		collidable = true;
		
		HXP.camera.x = this.halfWidth;
		HXP.camera.y = this.halfHeight;
	}
	
	private inline function move(x:Float, y:Float)
	{
		var tempX = this.x;
		var tempY = this.y;
		
		this.x += (speedVec.x * HXP.elapsed) * x;
		this.y += (speedVec.y * HXP.elapsed) * y;
		
		if (collideTypes("level", x, y) != null)
		{
			this.x = tempX; 
			this.y = tempY;
		}
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
				graphic = sprite2;
				sprite2.flipped = false;
				sprite2.play("walk");
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
			graphic = sprite2;
			sprite2.flipped = true;
			sprite2.play("walk");
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
			graphic = sprite;
			sprite.play("stand");
		}
		
	}
	
	override public function update():Void
	{	
		handleInput();
		move(moveVec.x, moveVec.y);
		
		if (health <= 0)
		{
			//TODO HXP.world = new GameOver();
		}
		
		HXP.camera.x = (x + halfWidth) - HXP.screen.width / 2;
		HXP.camera.y = (y + halfHeight) - HXP.screen.height / 2 ;
		
		super.update();
	}
}